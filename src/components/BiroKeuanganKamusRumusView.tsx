import React, { useState, useMemo } from 'react';
import { BIRO_KEUANGAN_DATA_CATALOG, SIMKEU_DATA_DICTIONARY } from '../data/mockData';
import { Search, Copy, Check, Calculator, BookOpen, Layers, Filter, FileCode2, Database, Table } from 'lucide-react';

export interface KeuanganFormulaItem {
  id: string;
  itemNo: number;
  catalogName: string;
  name: string;
  tag: string;
  category: 'Pendapatan & PNBP' | 'Belanja & Anggaran' | 'Likuiditas & Piutang' | 'Tata Kelola & Evaluasi';
  formula: string;
  description: string;
  format: string;
  primaryTable: string;
  pdfPage: string;
  sifatData: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  attributes: string[];
}

export const BIRO_KEUANGAN_FORMULAS: KeuanganFormulaItem[] = [
  {
    id: 'keu_calc_01',
    itemNo: 8,
    catalogName: 'Rekapitulasi Target dan Realisasi PNBP',
    name: 'Persentase Capaian Target PNBP BP Batam (IKS-03)',
    tag: 'IKS-03',
    category: 'Pendapatan & PNBP',
    formula: 'SUM([keu_target_pnbp_rekap].[realisasi]) / SUM([keu_target_pnbp_rekap].[jumlah]) * 100',
    description: 'Rasio akumulasi realisasi kas masuk PNBP terhadap target DIPA/Renstra BP Batam (Target: Rp 2.447,46 Miliar).',
    format: 'Percentage (0.0%)',
    primaryTable: 'keu_target_pnbp_rekap (Item #8)',
    pdfPage: 'Halaman 3',
    sifatData: 'TERTUTUP',
    attributes: ['TAHUN', 'KODE UNIT', 'NAMA UNIT', 'TARGET PNBP', 'REALISASI', 'PERSENTASE', 'SISA TARGET'],
  },
  {
    id: 'keu_calc_02',
    itemNo: 8,
    catalogName: 'Rekapitulasi Target dan Realisasi PNBP',
    name: 'Capaian Target PNBP Biro Keuangan (POS-05)',
    tag: 'POS-05',
    category: 'Pendapatan & PNBP',
    formula: 'SUM(IIF([keu_target_pnbp_rekap].[nama_unit] = "Biro Keuangan", [keu_target_pnbp_rekap].[realisasi], 0)) / 46720870000 * 100',
    description: 'Penerimaan jasa perbankan, jasa giro rekening penampungan BLU, dan yield treasury Biro Keuangan terhadap target Rp 46,72 Miliar.',
    format: 'Percentage (0.0%)',
    primaryTable: 'keu_target_pnbp_rekap (Item #8)',
    pdfPage: 'Halaman 3',
    sifatData: 'TERTUTUP',
    attributes: ['TAHUN', 'NAMA UNIT', 'REALISASI', 'PERSENTASE CAPAIAN'],
  },
  {
    id: 'keu_calc_03',
    itemNo: 8,
    catalogName: 'Rekapitulasi Target dan Realisasi PNBP',
    name: 'Rasio PNBP Badan Usaha terhadap Target BP Batam (IKP-02)',
    tag: 'IKP-02',
    category: 'Pendapatan & PNBP',
    formula: 'SUM(IIF([keu_target_pnbp_rekap].[nama_unit] IN ("Badan Usaha Pelabuhan", "Badan Usaha Bandar Udara", "Badan Usaha Fasilitas dan Lingkungan", "Badan Usaha Rumah Sakit"), [keu_target_pnbp_rekap].[realisasi], 0)) / 2447464960000',
    description: 'Rasio kontribusi 4 unit bisnis operasional komersial BLU terhadap target total penerimaan BP Batam (Target Perkin: 0,68).',
    format: 'Decimal Ratio (0.00)',
    primaryTable: 'keu_target_pnbp_rekap (Item #8)',
    pdfPage: 'Halaman 3',
    sifatData: 'TERTUTUP',
    attributes: ['NAMA UNIT', 'SUMBER DANA', 'REALISASI BU', 'TARGET TOTAL'],
  },
  {
    id: 'keu_calc_04',
    itemNo: 3,
    catalogName: 'Laporan Realisasi Anggaran BLU',
    name: 'Persentase Serapan Belanja Pagu DIPA BLU',
    tag: 'SERAPAN-DIPA',
    category: 'Belanja & Anggaran',
    formula: 'SUM([keu_laporan_realisasi_anggaran_blu].[realisasi]) / SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) * 100',
    description: 'Tingkat serapan SP2D belanja operasional, belanja pegawai, belanja barang, dan belanja modal terhadap pagu DIPA berjalan.',
    format: 'Percentage (0.0%)',
    primaryTable: 'keu_laporan_realisasi_anggaran_blu (Item #3)',
    pdfPage: 'Halaman 2',
    sifatData: 'TERTUTUP',
    attributes: ['TAHUN', 'KODE UNIT', 'URAIAN BELANJA', 'PAGU ANGGARAN', 'REALISASI', 'PERSENTASE'],
  },
  {
    id: 'keu_calc_05',
    itemNo: 13,
    catalogName: 'Laporan Saldo Bank Real-time',
    name: 'Cash Coverage Ratio & Ketahanan Likuiditas Kas Bank (Bulan)',
    tag: 'LIKUIDITAS-CCR',
    category: 'Likuiditas & Piutang',
    formula: 'SUM([keu_saldo_bank_realtime].[saldo_akhir]) / (SUM([keu_laporan_realisasi_anggaran_blu].[anggaran_belanja]) / 12)',
    description: 'Daya tahan kas dan setara kas likuid di rekening perbankan mitra (Rp 1.077,8 Miliar) untuk mendanai rata-rata pengeluaran operasional bulanan tanpa adanya penerimaan baru sama sekali. Standar Threshold Kemenkeu/BLU: Minimal ≥ 3,00 Bulan. Capaian saat ini 3,89 Bulan (Kategori: Prima & Solven). Pimpinan dapat menjelaskan bahwa cadangan kas mampu menopang seluruh operasional BP Batam selama hampir 4 bulan penuh.',
    format: 'Decimal (Bulan)',
    primaryTable: 'keu_saldo_bank_realtime (Item #13)',
    pdfPage: 'Halaman 4',
    sifatData: 'TERTUTUP',
    attributes: ['TANGGAL', 'NAMA BANK', 'NOMOR REKENING', 'SALDO AWAL', 'DEBET', 'KREDIT', 'SALDO AKHIR'],
  },
  {
    id: 'keu_calc_rata_kas',
    itemNo: 14,
    catalogName: 'Laporan Penerimaan Sumber Dana',
    name: 'Rata-rata Penerimaan Kas Bulanan (Monthly Cash Inflow)',
    tag: 'AVG-CASH-INFLOW',
    category: 'Likuiditas & Piutang',
    formula: 'SUM([keu_penerimaan_sumber_dana].[nilai]) / COUNTD([keu_penerimaan_sumber_dana].[tanggal_rekap_akhir])',
    description: 'Rata-rata arus kas masuk riil per bulan dari penerimaan PNBP fungsional, APBN Rupiah Murni, dan hibah yang masuk ke rekening kas BLU (Rata-rata: Rp 265,1 Miliar/bulan). Indikator ini digunakan pimpinan untuk cash flow forecasting, mitigasi likuiditas, dan perencanaan komitmen belanja modal periode berikutnya.',
    format: 'Currency IDR (Miliar/Bulan)',
    primaryTable: 'keu_penerimaan_sumber_dana (Item #14)',
    pdfPage: 'Halaman 4',
    sifatData: 'TERTUTUP',
    attributes: ['SUMBER DANA', 'UNIT KERJA', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'NILAI'],
  },
  {
    id: 'keu_calc_fin_cover',
    itemNo: 8,
    catalogName: 'Rekapitulasi Target dan Realisasi PNBP',
    name: 'Coverage Ratio Pendapatan vs Belanja (FIN_COVER)',
    tag: 'FIN_COVER',
    category: 'Pendapatan & PNBP',
    formula: 'SUM([keu_target_pnbp_rekap].[realisasi]) / SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    description: 'Rasio kecukupan pendapatan riil PNBP dalam menutup seluruh realisasi belanja berjalan (Target Benchmark: ≥ 1,00x). Nilai saat ini 1,04x mencerminkan posisi surplus fiskal operasional sebesar +4% di mana pendapatan melampaui pengeluaran belanja.',
    format: 'Ratio Index (1.00x)',
    primaryTable: 'keu_target_pnbp_rekap (Item #8) & keu_laporan_realisasi_anggaran_blu (Item #3)',
    pdfPage: 'Halaman 3 & 2',
    sifatData: 'TERTUTUP',
    attributes: ['REALISASI PENDAPATAN', 'REALISASI BELANJA', 'SURPLUS/DEFISIT FISKAL'],
  },
  {
    id: 'keu_calc_06',
    itemNo: 17,
    catalogName: 'Rekapitulasi Umur Piutang (Aging)',
    name: 'Bucket Aging Kolektibilitas Piutang (Kemenkeu Standard)',
    tag: 'AGING-PIUTANG',
    category: 'Likuiditas & Piutang',
    formula: `IF [keu_mutasi_piutang_faktur].[umur_piutang] <= 30 THEN "0 - 30 Hari (Lancar)"
ELSEIF [keu_mutasi_piutang_faktur].[umur_piutang] <= 60 THEN "31 - 60 Hari (Kurang Lancar)"
ELSEIF [keu_mutasi_piutang_faktur].[umur_piutang] <= 90 THEN "61 - 90 Hari (Diragukan)"
ELSE "> 90 Hari (Macet / Pelimpahan KPKNL)"
END`,
    description: 'Klasifikasi kolektibilitas saldo tagihan faktur PNBP berdasarkan selisih tanggal jatuh tempo faktur.',
    format: 'Dimension (Text)',
    primaryTable: 'keu_rekap_umur_piutang (Item #17)',
    pdfPage: 'Halaman 4',
    sifatData: 'TERBATAS',
    attributes: ['KATEGORI PIUTANG', 'JUMLAH DEBITUR', 'NILAI PIUTANG', 'AGING TREND'],
  },
  {
    id: 'keu_calc_07',
    itemNo: 20,
    catalogName: 'Rekapitulasi Piutang Tak Tertagih (PUPN/KPKNL)',
    name: 'Saldo Piutang Tak Tertagih PUPN / KPKNL',
    tag: 'PIUTANG-MACET',
    category: 'Likuiditas & Piutang',
    formula: 'SUM([keu_piutang_tak_tertagih].[jumlah_piutang_koreksi_kpknl]) + SUM([keu_piutang_tak_tertagih].[perhitungan_denda]) - SUM([keu_piutang_tak_tertagih].[bayar_faktur])',
    description: 'Akumulasi saldo piutang macet yang dilimpahkan penagihannya ke Panitia Urusan Piutang Negara / KPKNL sesuai PMK.',
    format: 'Currency IDR (Miliar)',
    primaryTable: 'keu_piutang_tak_tertagih (Item #20)',
    pdfPage: 'Halaman 5',
    sifatData: 'TERTUTUP',
    attributes: ['NOMOR KASUS', 'NAMA DEBITUR', 'POKOK PIUTANG', 'DENDA', 'SALDO AKHIR'],
  },
  {
    id: 'keu_calc_08',
    itemNo: 14,
    catalogName: 'Rekapitulasi Pagu Anggaran dan Sumber Dana',
    name: 'Rasio Kemandirian Fiskal BLU (IKS-07)',
    tag: 'IKS-07',
    category: 'Tata Kelola & Evaluasi',
    formula: 'SUM([keu_rekap_pagu_anggaran].[sumber_dana_pnbp]) / SUM(IIF([keu_laporan_realisasi_anggaran_blu].[kategori] != "Belanja Modal", [keu_laporan_realisasi_anggaran_blu].[realisasi], 0))',
    description: 'Kemampuan pendapatan mandiri BLU BP Batam dalam menutup seluruh belanja operasional rutin non-modal.',
    format: 'Decimal (0.00)',
    primaryTable: 'keu_rekap_pagu_anggaran & keu_laporan_realisasi_anggaran_blu',
    pdfPage: 'Halaman 4',
    sifatData: 'TERTUTUP',
    attributes: ['TAHUN', 'SUMBER DANA', 'PAGU PNBP', 'PAGU RM', 'REALISASI OPERASIONAL'],
  },
  {
    id: 'keu_calc_09',
    itemNo: 25,
    catalogName: 'Indeks Pelaksanaan Anggaran (IKPA)',
    name: 'Nilai Komposit IKPA Ditjen Perbendaharaan (Kemenkeu)',
    tag: 'IKPA',
    category: 'Tata Kelola & Evaluasi',
    formula: 'SUM([keu_indeks_pelaksanaan_anggaran].[nilai_komponen_terbobot])',
    description: 'Evaluasi 8 indikator pelaksanaan anggaran Kemenkeu (Deviasi Hal III DIPA, Penyerapan, LPJ Bendahara, SPM Dispensasi).',
    format: 'Decimal (0 - 100)',
    primaryTable: 'keu_indeks_pelaksanaan_anggaran (Item #25)',
    pdfPage: 'Halaman 6',
    sifatData: 'TERTUTUP',
    attributes: ['INDIKATOR EVALUASI', 'BOBOT', 'NILAI CAPAIAN', 'NILAI AKHIR'],
  },
  {
    id: 'keu_calc_10',
    itemNo: 18,
    catalogName: 'Rekapitulasi Mutasi Piutang Faktur',
    name: 'Saldo Akhir Mutasi Piutang PNBP',
    tag: 'MUTASI-PIUTANG',
    category: 'Likuiditas & Piutang',
    formula: 'SUM([keu_mutasi_piutang].[saldo_awal]) + SUM([keu_mutasi_piutang].[faktur_terbit]) - SUM([keu_mutasi_piutang].[bayar_faktur])',
    description: 'Pergerakan neto saldo piutang faktur periode berjalan berdasarkan transaksi penerbitan tagihan baru dan pembayaran.',
    format: 'Currency IDR (Miliar)',
    primaryTable: 'keu_mutasi_piutang_faktur (Item #18)',
    pdfPage: 'Halaman 5',
    sifatData: 'TERBATAS',
    attributes: ['BULAN', 'SALDO AWAL', 'TAGIHAN TERBIT', 'PEMBAYARAN', 'SALDO AKHIR'],
  },
  {
    id: 'keu_calc_11',
    itemNo: 1,
    catalogName: 'Rincian Target Pendapatan Negara Bukan Pajak (PNBP)',
    name: 'Perhitungan Nilai Tarif Layanan PNBP Terbit',
    tag: 'TARIF-PNBP',
    category: 'Pendapatan & PNBP',
    formula: '[keu_rincian_target_pnbp].[volume] * [keu_rincian_target_pnbp].[tarif]',
    description: 'Perkalian antara volume satuan pemakaian jasa/lahan dengan besaran tarif resmi PP Tarif BP Batam.',
    format: 'Currency IDR',
    primaryTable: 'keu_rincian_target_pnbp (Item #1)',
    pdfPage: 'Halaman 2',
    sifatData: 'TERBUKA',
    attributes: ['KODE AKUN', 'URAIAN PNBP', 'TARIF', 'VOLUME', 'SATUAN', 'TARGET JUMLAH'],
  },
];

export const BiroKeuanganKamusRumusView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculated_fields' | 'data_catalog'>('calculated_fields');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['ALL', 'Pendapatan & PNBP', 'Belanja & Anggaran', 'Likuiditas & Piutang', 'Tata Kelola & Evaluasi'];

  const filteredFormulas = useMemo(() => {
    return BIRO_KEUANGAN_FORMULAS.filter((field) => {
      const matchSearch =
        !searchTerm ||
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.primaryTable.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'ALL' || field.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  const filteredCatalog = useMemo(() => {
    return BIRO_KEUANGAN_DATA_CATALOG.filter((item) => {
      return (
        !searchTerm ||
        item.namaData.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tabelDatabase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.jenisData.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4 font-sans select-none pb-8">
      {/* Top Banner */}
      <div className="p-4 bg-[#0B2545] text-white rounded-xl border border-blue-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight">
                Kamus Rumus &amp; Calculated Fields Biro Keuangan
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900 border border-blue-400 text-blue-200">
                PDF Halaman 2 - 6
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Standar 28 item data katalog resmi, formula analitis Tableau &amp; SQL SIMKEU BP Batam
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-slate-900/80 p-0.5 rounded-lg border border-slate-700 text-xs">
          <button
            onClick={() => setActiveTab('calculated_fields')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'calculated_fields'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Calculated Fields ({BIRO_KEUANGAN_FORMULAS.length})
          </button>
          <button
            onClick={() => setActiveTab('data_catalog')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'data_catalog'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            28 Katalog Data PDF
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari rumus calculated field, tag, atau tabel Biro Keuangan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ×
            </button>
          )}
        </div>

        {activeTab === 'calculated_fields' && (
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1F3864] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab 1: Calculated Fields */}
      {activeTab === 'calculated_fields' && (
        <div className="space-y-3">
          {filteredFormulas.map((field) => (
            <div
              key={field.id}
              className="p-4 bg-white border border-slate-200 hover:border-blue-300 rounded-xl shadow-2xs transition-all space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                      {field.tag}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      Item #{field.itemNo} • {field.catalogName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {field.category}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                        field.sifatData === 'TERBUKA'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : field.sifatData === 'TERBATAS'
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-rose-50 text-rose-700 border-rose-300'
                      }`}
                    >
                      SIFAT: {field.sifatData}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{field.name}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {field.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono block">Lokasi PDF</span>
                  <span className="text-xs font-semibold text-slate-700">{field.pdfPage}</span>
                  <span className="text-[10px] text-blue-600 font-mono block mt-0.5">
                    Format: {field.format}
                  </span>
                </div>
              </div>

              {/* Formula Snippet Box */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
                <div className="overflow-x-auto text-sky-300">
                  <code>{field.formula}</code>
                </div>
                <button
                  onClick={() => handleCopy(field.id, field.formula)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors text-[11px]"
                  title="Salin Formula ke Clipboard"
                >
                  {copiedId === field.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* Attributes in Data Catalog */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="font-semibold text-slate-500 mr-1">Field Attributes:</span>
                {field.attributes.map((attr) => (
                  <span
                    key={attr}
                    className="px-1.5 py-0.5 bg-slate-100 text-slate-700 font-mono rounded border border-slate-200"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: 28 Katalog Data PDF */}
      {activeTab === 'data_catalog' && (
        <div className="space-y-3">
          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center w-12">No</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">Nama Tabel Data Katalog</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">Kategori</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center">Sifat Data</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center">Jumlah Field</th>
                  <th className="py-2.5 px-3">Deskripsi &amp; Penggunaan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                {filteredCatalog.map((item) => (
                  <tr key={item.no} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 border-r border-slate-200 text-center font-mono font-bold text-slate-600">
                      {item.no}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200">
                      <div className="font-bold text-slate-900">{item.namaData}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{item.tabelDatabase}</div>
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200">
                      <span className="font-medium text-slate-700">{item.jenisData}</span>
                      <div className="text-[10px] text-slate-400 font-mono">{item.periodeData}</div>
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          item.sifatData === 'TERBUKA'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                            : item.sifatData === 'TERBATAS'
                            ? 'bg-amber-50 text-amber-700 border border-amber-300'
                            : 'bg-rose-50 text-rose-700 border border-rose-300'
                        }`}
                      >
                        {item.sifatData}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 text-center font-mono font-bold text-slate-700">
                      {item.atributData.length} Kolom
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {item.keterangan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
