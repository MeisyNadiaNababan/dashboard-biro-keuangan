import React, { useState, useMemo } from 'react';
import { X, Copy, Check, FileSpreadsheet, Code2, Layers, Palette, Calculator, Info, Search, Filter, Database, Table, ArrowUpRight } from 'lucide-react';
import { SIMKEU_DATA_DICTIONARY, BIRO_KEUANGAN_DATA_CATALOG } from '../../data/mockData';

interface TableauGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CalculatedFieldItem {
  id: string;
  name: string;
  tag: string;
  formula: string;
  description: string;
  format: string;
  primaryTable: string;
  category: 'Pendapatan & PNBP' | 'Belanja & Anggaran' | 'Likuiditas & Piutang' | 'Tata Kelola & Evaluasi';
}

const CALCULATED_FIELDS_DATA: CalculatedFieldItem[] = [
  {
    id: 'calc_iks_03',
    name: 'Persentase Capaian Target PNBP BP Batam (IKS-03)',
    tag: 'IKS-03',
    category: 'Pendapatan & PNBP',
    formula: 'SUM([keu_target_pnbp_rekap].[realisasi]) / SUM([keu_target_pnbp_rekap].[jumlah]) * 100',
    description: 'Rasio akumulasi realisasi kas masuk PNBP terhadap target DIPA/Renstra BP Batam (Target: Rp 2.447,46 M).',
    format: 'Percentage (0.0%)',
    primaryTable: 'keu_target_pnbp_rekap (Item #8)',
  },
  {
    id: 'calc_pos_05',
    name: 'Capaian Target PNBP Biro Keuangan (POS-05)',
    tag: 'POS-05',
    category: 'Pendapatan & PNBP',
    formula: 'SUM(IIF([keu_target_pnbp_rekap].[nama_unit] = "Biro Keuangan", [keu_target_pnbp_rekap].[realisasi], 0)) / 46720870000 * 100',
    description: 'Penerimaan jasa perbankan, jasa giro rekening penampungan BLU, dan yield treasury Biro Keuangan terhadap target Rp 46,72 M.',
    format: 'Percentage (0.0%)',
    primaryTable: 'keu_target_pnbp_rekap (Item #8)',
  },
  {
    id: 'calc_ikp_02',
    name: 'Rasio PNBP Badan Usaha terhadap Target PNBP BP Batam (IKP-02)',
    tag: 'IKP-02',
    category: 'Pendapatan & PNBP',
    formula: 'SUM(IIF([keu_target_pnbp_rekap].[nama_unit] IN ("Badan Usaha Pelabuhan", "Badan Usaha Bandar Udara", "Badan Usaha Fasilitas dan Lingkungan", "Badan Usaha Rumah Sakit"), [keu_target_pnbp_rekap].[realisasi], 0)) / 2447464960000',
    description: 'Rasio kontribusi 4 unit bisnis operasional komersial BLU terhadap target total penerimaan BP Batam (Target Perkin: 0,68).',
    format: 'Decimal Ratio (0.00)',
    primaryTable: 'keu_target_pnbp_rekap (Item #8)',
  },
  {
    id: 'calc_ikp_01',
    name: 'Pertumbuhan Kinerja Badan Usaha YoY (IKP-01)',
    tag: 'IKP-01',
    category: 'Pendapatan & PNBP',
    formula: '(ZN(SUM([Realisasi_BU_2026])) - ZN(SUM([Realisasi_BU_2025]))) / ZN(SUM([Realisasi_BU_2025])) * 100',
    description: 'Persentase kenaikan tahunan penerimaan operasional gabungan 4 unit bisnis komersial BLU (Target Perkin: 1,1%).',
    format: 'Percentage (0.0%)',
    primaryTable: 'keu_target_pnbp_rekap (Item #8)',
  },
  {
    id: 'calc_surplus_defisit',
    name: 'Net Surplus / Defisit per Satker (Diverging Bar)',
    tag: 'OPERASIONAL',
    category: 'Tata Kelola & Evaluasi',
    formula: 'SUM([keu_target_pnbp_rekap].[realisasi]) - SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    description: 'Selisih surplus (+) atau defisit (-) antara penerimaan PNBP dan realisasi belanja per unit kerja.',
    format: 'Currency IDR (Miliar)',
    primaryTable: 'keu_target_pnbp_rekap & keu_laporan_realisasi_anggaran_blu',
  },
  {
    id: 'calc_serapan_belanja',
    name: 'Persentase Serapan Belanja BLU',
    tag: 'DIPA BLU',
    category: 'Belanja & Anggaran',
    formula: 'SUM([keu_laporan_realisasi_anggaran_blu].[realisasi]) / SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) * 100',
    description: 'Tingkat serapan SP2D belanja operasional & belanja modal terhadap pagu DIPA berjalan.',
    format: 'Percentage (0.0%)',
    primaryTable: 'keu_laporan_realisasi_anggaran_blu (Item #3)',
  },
  {
    id: 'calc_kemandirian_fiskal',
    name: 'Rasio Kemandirian Fiskal BLU (IKS-07)',
    tag: 'IKS-07',
    category: 'Tata Kelola & Evaluasi',
    formula: 'SUM([keu_rekap_pagu_anggaran].[sumber_dana_pnbp]) / SUM(IIF([keu_laporan_realisasi_anggaran_blu].[kategori] != "Belanja Modal", [keu_laporan_realisasi_anggaran_blu].[realisasi], 0))',
    description: 'Kemampuan pendapatan mandiri BLU menutup belanja operasional rutin (Ambang batas Kemenkeu: ≥ 0,80).',
    format: 'Decimal (0.00)',
    primaryTable: 'keu_rekap_pagu_anggaran & keu_laporan_realisasi_anggaran_blu',
  },
  {
    id: 'calc_prog_dukman',
    name: 'Serapan Program Dukungan Manajemen DIPA Biro Keuangan (PROG-02)',
    tag: 'PROG-02',
    category: 'Belanja & Anggaran',
    formula: 'SUM(IIF([keu_laporan_realisasi_anggaran_blu].[uraian] = "Program Dukungan Manajemen", [keu_laporan_realisasi_anggaran_blu].[realisasi], 0)) / 1099028050000 * 100',
    description: 'Realisasi penyerapan anggaran program dukungan manajemen Biro Keuangan terhadap pagu Rp 1.099,03 M.',
    format: 'Percentage (0.0%)',
    primaryTable: 'keu_laporan_realisasi_anggaran_blu (Item #3)',
  },
  {
    id: 'calc_cash_coverage',
    name: 'Cash Coverage Ratio Likuiditas Kas Bank',
    tag: 'TREASURY',
    category: 'Likuiditas & Piutang',
    formula: 'SUM([keu_saldo_bank_realtime].[nilai]) / (SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) / 12)',
    description: 'Daya tahan kas dan setara kas bank operasional terhadap rata-rata kebutuhan pengeluaran bulanan.',
    format: 'Decimal (Bulan)',
    primaryTable: 'keu_saldo_bank_realtime (Item #13)',
  },
  {
    id: 'calc_aging_piutang',
    name: 'Kategori Aging Piutang (Bucket Kolektibilitas)',
    tag: 'PIUTANG',
    category: 'Likuiditas & Piutang',
    formula: `IF [keu_mutasi_piutang_faktur].[umur_piutang] <= 30 THEN "0 - 30 Hari (Lancar)"
ELSEIF [keu_mutasi_piutang_faktur].[umur_piutang] <= 60 THEN "31 - 60 Hari (Kurang Lancar)"
ELSEIF [keu_mutasi_piutang_faktur].[umur_piutang] <= 90 THEN "61 - 90 Hari (Diragukan)"
ELSE "> 90 Hari (Macet / Pelimpahan KPKNL)"
END`,
    description: 'Klasifikasi kolektibilitas saldo piutang berdasarkan selisih tanggal jatuh tempo faktur tagihan.',
    format: 'Dimension (Text)',
    primaryTable: 'keu_mutasi_piutang_faktur (Item #18)',
  },
  {
    id: 'calc_piutang_macet',
    name: 'Total Piutang Macet PUPN / KPKNL',
    tag: 'PIUTANG',
    category: 'Likuiditas & Piutang',
    formula: 'SUM([keu_piutang_tak_tertagih].[jumlah_piutang_koreksi_kpknl]) + SUM([keu_piutang_tak_tertagih].[perhitungan_denda]) - SUM([keu_piutang_tak_tertagih].[bayar_faktur])',
    description: 'Akumulasi saldo piutang macet yang dilimpahkan penagihannya ke Panitia Urusan Piutang Negara (KPKNL).',
    format: 'Currency IDR (Miliar)',
    primaryTable: 'keu_piutang_tak_tertagih (Item #20)',
  },
  {
    id: 'calc_status_serapan',
    name: 'Status Kinerja Serapan Belanja',
    tag: 'EVALUASI',
    category: 'Tata Kelola & Evaluasi',
    formula: `IF [keu_laporan_realisasi_anggaran_blu].[persentase] >= 35.0 THEN "Baik (On Track)"
ELSEIF [keu_laporan_realisasi_anggaran_blu].[persentase] >= 25.0 THEN "Cukup"
ELSE "Rendah (Perlu Akselerasi)"
END`,
    description: 'Kondisi KPI penyerapan anggaran unit kerja untuk triwulan berjalan.',
    format: 'Dimension (Text)',
    primaryTable: 'keu_laporan_realisasi_anggaran_blu (Item #3)',
  },
];

export const TableauGuideModal: React.FC<TableauGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'calculated_fields' | 'data_dictionary' | 'worksheets' | 'color_palette'>('calculated_fields');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Filter state for Calculated Fields
  const [calcSearch, setCalcSearch] = useState('');
  const [calcCategory, setCalcCategory] = useState<string>('ALL');

  // Filter state for Data Dictionary
  const [dictSearch, setDictSearch] = useState('');
  const [selectedTable, setSelectedTable] = useState<string>('ALL');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedSifat, setSelectedSifat] = useState<string>('ALL');

  // Filtered calculated fields
  const filteredCalculatedFields = useMemo(() => {
    return CALCULATED_FIELDS_DATA.filter((field) => {
      const matchSearch =
        !calcSearch ||
        field.name.toLowerCase().includes(calcSearch.toLowerCase()) ||
        field.formula.toLowerCase().includes(calcSearch.toLowerCase()) ||
        field.description.toLowerCase().includes(calcSearch.toLowerCase()) ||
        field.primaryTable.toLowerCase().includes(calcSearch.toLowerCase()) ||
        field.tag.toLowerCase().includes(calcSearch.toLowerCase());

      const matchCategory = calcCategory === 'ALL' || field.category === calcCategory;

      return matchSearch && matchCategory;
    });
  }, [calcSearch, calcCategory]);

  // Unique tables in data dictionary
  const uniqueTables = useMemo(() => {
    const map = new Map<string, { tableName: string; tableLabel: string; count: number; itemNo: number }>();
    SIMKEU_DATA_DICTIONARY.forEach((field) => {
      if (!map.has(field.tableName)) {
        map.set(field.tableName, {
          tableName: field.tableName,
          tableLabel: field.tableLabel,
          count: 1,
          itemNo: field.tableItemNo,
        });
      } else {
        map.get(field.tableName)!.count += 1;
      }
    });
    return Array.from(map.values()).sort((a, b) => a.itemNo - b.itemNo);
  }, []);

  // Filtered dictionary
  const filteredDictionary = useMemo(() => {
    return SIMKEU_DATA_DICTIONARY.filter((field) => {
      const matchSearch =
        !dictSearch ||
        field.fieldName.toLowerCase().includes(dictSearch.toLowerCase()) ||
        field.sqlColumnName.toLowerCase().includes(dictSearch.toLowerCase()) ||
        field.tableName.toLowerCase().includes(dictSearch.toLowerCase()) ||
        field.description.toLowerCase().includes(dictSearch.toLowerCase()) ||
        field.tableLabel.toLowerCase().includes(dictSearch.toLowerCase());

      const matchTable = selectedTable === 'ALL' || field.tableName === selectedTable;
      const matchRole = selectedRole === 'ALL' || field.tableauRole === selectedRole;
      const matchSifat = selectedSifat === 'ALL' || field.sifatData === selectedSifat;

      return matchSearch && matchTable && matchRole && matchSifat;
    });
  }, [dictSearch, selectedTable, selectedRole, selectedSifat]);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const worksheetsGuide = [
    {
      sheet: 'Sheet 1: BANs KPI Ringkasan Eksekutif',
      chartType: 'Text Table / Big-Ass Number Card',
      shelves: 'Columns: [Measure Names], Text: SUM([keu_target_pnbp_rekap.realisasi]), SUM([keu_laporan_realisasi_anggaran_blu.realisasi]), SUM([keu_saldo_bank_realtime.nilai]), SUM([keu_mutasi_piutang_faktur.saldo_akhir])',
      marks: 'Text / Bullet Progress Indicator',
      tips: 'Tautkan filter tahun [keu_target_pnbp_rincian.tahun] dan triwulan sebagai Global Context Filter.',
      dbTable: 'keu_target_pnbp_rekap, keu_laporan_realisasi_anggaran_blu, keu_saldo_bank_realtime',
    },
    {
      sheet: 'Sheet 2: Realisasi PNBP per Satker & Layanan (Bullet Graph)',
      chartType: 'Bullet Graph & Crosstab',
      shelves: 'Rows: [keu_target_pnbp_rekap.nama_unit], [nama_layanan], Columns: SUM([realisasi]), Reference Line: SUM([jumlah]) (Target DIPA)',
      marks: 'Bar (Warna: #59A14F Tableau Green), Reference Line (Black Line Tick)',
      tips: 'Tampilkan tooltip rincian tarif dan volume dari tabel relasi keu_target_pnbp_rincian.',
      dbTable: 'keu_target_pnbp_rekap (Item 8) & keu_target_pnbp_rincian (Item 7)',
    },
    {
      sheet: 'Sheet 3: Serapan Belanja BLU (Data Bars)',
      chartType: 'Horizontal Bar Chart & Hierarchical Crosstab',
      shelves: 'Rows: [keu_laporan_realisasi_anggaran_blu.jenis_anggaran], [kategori], Columns: SUM([realisasi]), Reference Line: SUM([anggaran])',
      marks: 'Bar (Warna: #4E79A7 Tableau Blue), Color Encoding: [Status Kinerja Serapan]',
      tips: 'Tambahkan parameter line target triwulan berjalan (misal Q1 = 25%, Q2 = 50%).',
      dbTable: 'keu_laporan_realisasi_anggaran_blu (Item 3)',
    },
    {
      sheet: 'Sheet 4: Surplus / Defisit Operasional Satker (Diverging Bar)',
      chartType: 'Diverging Variance Bar Chart',
      shelves: 'Rows: [keu_target_pnbp_rekap.nama_unit], Columns: [Net Surplus / Defisit per Satker], Color: IF [Net] >= 0 THEN "Surplus" ELSE "Defisit"',
      marks: 'Bar (Warna: #59A14F Hijau & #E15759 Merah Coral)',
      tips: 'Tetapkan zero line center vertical pada nilai 0.00 Miliar.',
      dbTable: 'keu_target_pnbp_rekap & keu_laporan_realisasi_anggaran_blu',
    },
    {
      sheet: 'Sheet 5: Saldo Rekening Kas & Bank Real Time',
      chartType: 'Horizontal Stacked Bar & Progress Tracker',
      shelves: 'Rows: [keu_saldo_bank_realtime.nama_bank], [nomor_rekening], Columns: SUM([nilai]), Color: [kategori_rekening]',
      marks: 'Bar + Label Persentase Porsi (Warna: #76B7B2 Tableau Teal & #4E79A7)',
      tips: 'Tampilkan Header timestamp [tanggal_rekap] pada title kartu.',
      dbTable: 'keu_saldo_bank_realtime (Item 13)',
    },
    {
      sheet: 'Sheet 6: Aging & Mutasi Piutang Pelanggan',
      chartType: 'Aging Bucket Bar & Debitur Drill-down Table',
      shelves: 'Rows: [keu_mutasi_piutang_faktur.nama_pelanggan], Columns: SUM([saldo_akhir]), Color: [Kategori Aging Piutang (Bucket)]',
      marks: 'Bar + Detail: [bayar_faktur], [umur_piutang]',
      tips: 'Sediakan action URL/drill ke tabel keu_piutang_tak_tertagih untuk faktur macet PUPN.',
      dbTable: 'keu_mutasi_piutang_faktur (Item 18) & keu_rekap_umur_piutang (Item 17)',
    },
  ];

  const tableauColors = [
    { name: 'Tableau Blue', hex: '#4E79A7', role: 'Belanja, Header Toolbar, Primary Dimension' },
    { name: 'Tableau Orange', hex: '#F28E2B', role: 'APBN Proyek, Bandara, Atensi' },
    { name: 'Tableau Red / Coral', hex: '#E15759', role: 'Defisit Unit, Piutang Macet >90 Hari, Arus Keluar' },
    { name: 'Tableau Teal / Cyan', hex: '#76B7B2', role: 'Kas Bank, Likuiditas, Konsesi Maritim' },
    { name: 'Tableau Green', hex: '#59A14F', role: 'Pendapatan, Surplus Unit, PNBP, Arus Masuk' },
    { name: 'Tableau Purple', hex: '#B07AA1', role: 'Rasio Kemandirian Fiskal, Pemanfaatan Aset' },
    { name: 'Tableau Grey / Dark Slate', hex: '#79706E', role: 'Reference Lines, Target DIPA, Grid Border' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-900/60 font-sans select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white border border-slate-400 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header Bar */}
        <div className="bg-[#1F3864] text-white px-4 py-3 flex items-center justify-between border-b border-[#16294a]">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-4 h-4 text-blue-300" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Dokumentasi &amp; Rumus Calculated Fields Tableau Desktop
              </h3>
              <p className="text-[10px] text-slate-300">
                Spesifikasi Teknis BI untuk Biro Keuangan BP Batam
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#16294a] text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#EAECEF] border-b border-slate-300 px-3 flex items-center gap-1 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('calculated_fields')}
            className={`px-3 py-2 font-semibold flex items-center gap-1.5 cursor-pointer border-b-2 transition-all shrink-0 ${
              activeTab === 'calculated_fields'
                ? 'bg-white text-slate-900 border-b-[#1F3864] font-bold'
                : 'text-slate-600 hover:text-slate-900 border-b-transparent'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-[#1F3864]" />
            <span>Kamus Rumus Calculated</span>
          </button>

          <button
            onClick={() => setActiveTab('data_dictionary')}
            className={`px-3 py-2 font-semibold flex items-center gap-1.5 cursor-pointer border-b-2 transition-all shrink-0 ${
              activeTab === 'data_dictionary'
                ? 'bg-white text-slate-900 border-b-[#4E79A7]'
                : 'text-slate-600 hover:text-slate-900 border-b-transparent'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#59A14F]" />
            <span>Data Dictionary</span>
          </button>

          <button
            onClick={() => setActiveTab('worksheets')}
            className={`px-3 py-2 font-semibold flex items-center gap-1.5 cursor-pointer border-b-2 transition-all shrink-0 ${
              activeTab === 'worksheets'
                ? 'bg-white text-slate-900 border-b-[#4E79A7]'
                : 'text-slate-600 hover:text-slate-900 border-b-transparent'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#F28E2B]" />
            <span>Worksheets Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('color_palette')}
            className={`px-3 py-2 font-semibold flex items-center gap-1.5 cursor-pointer border-b-2 transition-all shrink-0 ${
              activeTab === 'color_palette'
                ? 'bg-white text-slate-900 border-b-[#4E79A7]'
                : 'text-slate-600 hover:text-slate-900 border-b-transparent'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#B07AA1]" />
            <span>Tableau 10 Palette</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-1 bg-white space-y-3">
          {activeTab === 'calculated_fields' && (
            <div className="space-y-3.5">
              {/* Top Banner */}
              <div className="bg-[#EBF3FB] border border-[#4E79A7]/30 p-3 text-xs text-slate-800 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#1F3864] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-[#1F3864]">
                    Kamus Rumus Calculated Fields Tableau Desktop (Biro Keuangan BP Batam)
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Daftar seluruh formula kalkulasi resmi (termasuk Indikator Kinerja Perkin IKS-03, POS-05, IKP-02, IKP-01, IKS-07, PROG-02, serta metrik operasional BLU) yang siap disalin langsung ke menu <strong>Analysis &gt; Create Calculated Field</strong> di Tableau Desktop.
                  </p>
                </div>
              </div>

              {/* Search & Category Filter Toolbar */}
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between bg-[#F8F9FA] p-2.5 border border-slate-300">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={calcSearch}
                    onChange={(e) => setCalcSearch(e.target.value)}
                    placeholder="Cari nama rumus, indikator (IKS, POS), tabel database, atau fungsi..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#1F3864]"
                  />
                  {calcSearch && (
                    <button
                      onClick={() => setCalcSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
                  {(['ALL', 'Pendapatan & PNBP', 'Belanja & Anggaran', 'Likuiditas & Piutang', 'Tata Kelola & Evaluasi'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCalcCategory(cat)}
                      className={`px-2 py-1 font-medium whitespace-nowrap cursor-pointer transition-colors border ${
                        calcCategory === cat
                          ? 'bg-[#1F3864] text-white border-[#1F3864]'
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {cat === 'ALL' ? 'Semua Kategori' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
                <span>
                  Menampilkan <strong>{filteredCalculatedFields.length}</strong> dari {CALCULATED_FIELDS_DATA.length} formula kalkulasi
                </span>
                {calcSearch && (
                  <span className="text-slate-400 italic">Filter pencarian: &quot;{calcSearch}&quot;</span>
                )}
              </div>

              {/* Calculated Fields List */}
              <div className="space-y-3">
                {filteredCalculatedFields.length === 0 ? (
                  <div className="p-8 text-center bg-[#F8F9FA] border border-dashed border-slate-300 text-xs text-slate-500">
                    Tidak ditemukan formula yang cocok dengan kata kunci &quot;{calcSearch}&quot;.
                  </div>
                ) : (
                  filteredCalculatedFields.map((item) => (
                    <div key={item.id} className="border border-slate-300 bg-[#F8F9FA] p-3.5 space-y-2.5">
                      {/* Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-[#1F3864] text-white font-mono text-xs font-bold">
                            {item.tag}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-600 bg-white border border-slate-200 px-2 py-0.5">
                            {item.format}
                          </span>
                          <span className="text-[10px] font-medium text-[#4E79A7] bg-blue-50 border border-blue-200 px-2 py-0.5">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Description & Primary Table */}
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-1">
                        <p className="flex-1">{item.description}</p>
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 shrink-0">
                          Tabel DB: {item.primaryTable}
                        </span>
                      </div>

                      {/* Formula Code Box with Copy Button */}
                      <div className="bg-white border border-slate-300 p-2.5 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                          <span>Tableau Calculated Field Formula:</span>
                          <span className="text-slate-400 font-normal">Siap Paste ke Tableau Desktop</span>
                        </div>
                        <div className="relative bg-slate-900 text-emerald-400 p-2.5 font-mono text-xs overflow-x-auto flex items-center justify-between gap-3">
                          <code className="whitespace-pre">{item.formula}</code>
                          <button
                            onClick={() => handleCopy(item.formula, item.id)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-[11px] flex items-center gap-1.5 cursor-pointer shrink-0 font-sans transition-colors"
                          >
                            {copiedIndex === item.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400 font-semibold">Tersalin!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Formula</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'data_dictionary' && (
            <div className="space-y-4">
              {/* Summary Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Total Atribut Database</span>
                  <span className="text-base font-bold text-[#1F3864]">{SIMKEU_DATA_DICTIONARY.length} Atribut</span>
                  <span className="text-[10px] text-slate-500 block">Terpetakan ke Tableau</span>
                </div>
                <div className="p-2.5 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Tabel Database Aktif</span>
                  <span className="text-base font-bold text-slate-800">{uniqueTables.length} Tabel</span>
                  <span className="text-[10px] text-slate-500 block">Dari 28 Katalog Biro Keuangan</span>
                </div>
                <div className="p-2.5 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Measures (Ukuran)</span>
                  <span className="text-base font-bold text-[#2B542C]">
                    {SIMKEU_DATA_DICTIONARY.filter(f => f.tableauRole === 'Measure').length} Measures
                  </span>
                  <span className="text-[10px] text-slate-500 block">Agregasi SUM, AVG</span>
                </div>
                <div className="p-2.5 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Dimensions (Dimensi)</span>
                  <span className="text-base font-bold text-blue-900">
                    {SIMKEU_DATA_DICTIONARY.filter(f => f.tableauRole === 'Dimension').length} Dimensions
                  </span>
                  <span className="text-[10px] text-slate-500 block">Kategori, Akun, Satker</span>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="p-3 bg-[#F8F9FA] border border-slate-300 space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari atribut, kolom SQL (contoh: realisasi), tabel, atau fungsi..."
                      value={dictSearch}
                      onChange={(e) => setDictSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 focus:outline-none focus:border-[#1F3864]"
                    />
                    {dictSearch && (
                      <button
                        onClick={() => setDictSearch('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <select
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                      className="text-xs bg-white border border-slate-300 px-2 py-1.5 text-slate-700 focus:outline-none focus:border-[#1F3864]"
                    >
                      <option value="ALL">Semua Tabel Database ({uniqueTables.length} Tabel)</option>
                      {uniqueTables.map((t) => (
                        <option key={t.tableName} value={t.tableName}>
                          #{t.itemNo} {t.tableName} ({t.count} atribut)
                        </option>
                      ))}
                    </select>

                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="text-xs bg-white border border-slate-300 px-2 py-1.5 text-slate-700 focus:outline-none focus:border-[#1F3864]"
                    >
                      <option value="ALL">Semua Role</option>
                      <option value="Dimension">Dimensions (Dimensi)</option>
                      <option value="Measure">Measures (Ukuran)</option>
                    </select>

                    <select
                      value={selectedSifat}
                      onChange={(e) => setSelectedSifat(e.target.value)}
                      className="text-xs bg-white border border-slate-300 px-2 py-1.5 text-slate-700 focus:outline-none focus:border-[#1F3864]"
                    >
                      <option value="ALL">Semua Sifat</option>
                      <option value="TERBUKA">TERBUKA (Publik)</option>
                      <option value="TERBATAS">TERBATAS (Internal Satker)</option>
                      <option value="TERTUTUP">TERTUTUP (Rahasia Keuangan)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>
                    Menampilkan <strong>{filteredDictionary.length}</strong> dari {SIMKEU_DATA_DICTIONARY.length} atribut database real SIMKEU.
                  </span>
                  {(dictSearch || selectedTable !== 'ALL' || selectedRole !== 'ALL' || selectedSifat !== 'ALL') && (
                    <button
                      onClick={() => {
                        setDictSearch('');
                        setSelectedTable('ALL');
                        setSelectedRole('ALL');
                        setSelectedSifat('ALL');
                      }}
                      className="text-[#1F3864] hover:underline font-semibold cursor-pointer"
                    >
                      Reset Filter
                    </button>
                  )}
                </div>
              </div>

              {/* Data Dictionary Table */}
              <div className="overflow-x-auto border border-slate-300 max-h-[52vh] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300 sticky top-0 z-10">
                    <tr>
                      <th className="py-2.5 px-3 border-r border-slate-300">Atribut Dokumen &amp; Kolom SQL</th>
                      <th className="py-2.5 px-3 border-r border-slate-300">Tabel Database SIMKEU</th>
                      <th className="py-2.5 px-3 border-r border-slate-300 text-center">Tableau Role</th>
                      <th className="py-2.5 px-3 border-r border-slate-300">Tipe Data &amp; Agregasi</th>
                      <th className="py-2.5 px-3 border-r border-slate-300 text-center">Sifat Data</th>
                      <th className="py-2.5 px-3 border-r border-slate-300">Contoh Nilai Real</th>
                      <th className="py-2.5 px-3">Deskripsi &amp; Worksheet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs bg-white">
                    {filteredDictionary.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500 font-sans">
                          Tidak ada atribut data yang cocok dengan kriteria filter atau pencarian.
                        </td>
                      </tr>
                    ) : (
                      filteredDictionary.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          {/* Atribut & Kolom SQL */}
                          <td className="py-2.5 px-3 border-r border-slate-200 align-top">
                            <div className="font-bold text-slate-900">{item.fieldName}</div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <code className="text-[11px] font-mono text-[#1F3864] bg-slate-100 px-1.5 py-0.5 border border-slate-200">
                                {item.sqlColumnName}
                              </code>
                              <button
                                onClick={() => handleCopy(item.sqlColumnName, item.id)}
                                title="Copy nama kolom SQL"
                                className="p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                              >
                                {copiedIndex === item.id ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>

                          {/* Tabel Database */}
                          <td className="py-2.5 px-3 border-r border-slate-200 align-top">
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] font-mono font-bold px-1 bg-slate-200 text-slate-700">
                                #{item.tableItemNo}
                              </span>
                              <span className="font-semibold text-slate-800 text-[11px]">{item.tableLabel}</span>
                            </div>
                            <code className="text-[10px] font-mono text-slate-500 block mt-0.5 truncate max-w-[150px]">
                              {item.tableName}
                            </code>
                          </td>

                          {/* Tableau Role */}
                          <td className="py-2.5 px-3 border-r border-slate-200 align-top text-center">
                            <span
                              className={`inline-block px-2 py-0.5 text-[10px] font-bold ${
                                item.tableauRole === 'Measure'
                                  ? 'bg-[#EBF3E8] text-[#2B542C] border border-[#59A14F]/40'
                                  : 'bg-[#EBF3FB] text-[#1F3864] border border-[#4E79A7]/40'
                              }`}
                            >
                              {item.tableauRole}
                            </span>
                          </td>

                          {/* Tipe Data & Agregasi */}
                          <td className="py-2.5 px-3 border-r border-slate-200 align-top">
                            <div className="text-[11px] text-slate-700 font-mono">{item.dataType}</div>
                            {item.defaultAggregation && item.defaultAggregation !== 'None' && (
                              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1 py-0.2 border border-emerald-200 mt-0.5 inline-block">
                                AGG: {item.defaultAggregation}
                              </span>
                            )}
                          </td>

                          {/* Sifat Data */}
                          <td className="py-2.5 px-3 border-r border-slate-200 align-top text-center">
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 border inline-block uppercase ${
                                item.sifatData === 'TERBUKA'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                  : item.sifatData === 'TERBATAS'
                                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                                  : 'bg-rose-50 text-rose-700 border-rose-300'
                              }`}
                            >
                              {item.sifatData}
                            </span>
                          </td>

                          {/* Contoh Nilai */}
                          <td className="py-2.5 px-3 border-r border-slate-200 align-top">
                            <span className="font-mono text-[11px] text-slate-800 bg-slate-50 px-1.5 py-0.5 border border-slate-200 block truncate max-w-[130px]">
                              {item.exampleValue}
                            </span>
                          </td>

                          {/* Deskripsi & Worksheets */}
                          <td className="py-2.5 px-3 align-top font-sans space-y-1">
                            <p className="text-[11px] text-slate-700 leading-snug">{item.description}</p>
                            {item.usedInWorksheets && item.usedInWorksheets.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-0.5">
                                {item.usedInWorksheets.map((ws, i) => (
                                  <span
                                    key={i}
                                    className="text-[9px] bg-slate-100 text-slate-600 px-1 py-0.2 border border-slate-200"
                                  >
                                    {ws}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'worksheets' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Panduan penataan Mark Cards &amp; Shelves pada masing-masing lembar kerja di Tableau Desktop:
              </p>
              <div className="space-y-2">
                {worksheetsGuide.map((ws) => (
                  <div key={ws.sheet} className="p-3 border border-slate-300 bg-[#F8F9FA]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{ws.sheet}</span>
                        {ws.dbTable && (
                          <span className="text-[10px] font-mono text-[#1F3864] bg-blue-50 border border-blue-200 px-1.5 py-0.5">
                            DB: {ws.dbTable}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold bg-white border border-slate-300 px-1.5 py-0.5 text-slate-700 w-fit">
                        {ws.chartType}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[#1F3864] bg-white border border-slate-200 p-2 my-1">
                      {ws.shelves}
                    </div>
                    <div className="text-[11px] text-slate-600 flex flex-col sm:flex-row sm:justify-between gap-1 mt-1">
                      <span><strong>Marks:</strong> {ws.marks}</span>
                      <span className="text-slate-500 italic">{ws.tips}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'color_palette' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Palet resmi <strong>Tableau Classic 10</strong> yang digunakan di dashboard ini:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tableauColors.map((color) => (
                  <div key={color.name} className="p-2.5 border border-slate-300 flex items-center gap-3 bg-white">
                    <div
                      className="w-8 h-8 border border-slate-300 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{color.name}</span>
                        <code className="text-[10px] font-mono bg-slate-100 px-1 py-0.2 border border-slate-200">
                          {color.hex}
                        </code>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{color.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[#F8F9FA] border-t border-slate-300 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">Biro Keuangan BP Batam • Tableau Implementation Standard</span>
          <button
            onClick={onClose}
            className="px-4 py-1 bg-white hover:bg-slate-100 border border-slate-300 font-semibold text-slate-700 cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
