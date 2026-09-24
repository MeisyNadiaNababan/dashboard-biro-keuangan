import React, { useState, useMemo } from 'react';
import {
  FileText,
  Compass,
  Handshake,
  Zap,
  Leaf,
  CheckCircle2,
  Clock,
  Search,
  Download,
  Filter,
  Layers,
  BarChart3,
  Scale,
  Award,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { KEK_KAJIAN_DATA, KekKajianPerkin } from '../../data/kekData';
import { KekVisualHeader } from './KekVisualHeader';

interface KekKajianCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

type SheetKajianMode = 'visual_pilar' | 'portofolio_dokumen' | 'daya_saing_kpbpb';

interface DayaSaingItem {
  id: number;
  tahunRekap: number;
  kategori: string;
  uraian: string;
  wilayah: string;
  nilaiDanKeterangan: string;
  keunggulan: 'KEK' | 'KPBPB' | 'Sinergi Keduanya';
}

const DATA_DAYA_SAING_KPBPB_KEK: DayaSaingItem[] = [
  {
    id: 1,
    tahunRekap: 2025,
    kategori: 'Fasilitas Perpajakan & Fiskal',
    uraian: 'Tax Holiday (PPh Badan hingga 100% s/d 20 tahun) & Tax Allowance untuk Investasi Utama',
    wilayah: 'KEK Nongsa, KEK Batam Teknik, KEK Pariwisata',
    nilaiDanKeterangan: 'Tax Holiday 100% (investasi > Rp 500 M) & Pembebasan Bea Masuk/PPN Impor Barang Modal',
    keunggulan: 'KEK',
  },
  {
    id: 2,
    tahunRekap: 2025,
    kategori: 'Perizinan Berusaha & Kecepatan Layanan',
    uraian: 'Pendelegasian Kewenangan Administrator KEK Terintegrasi Single Submission OSS RBA',
    wilayah: 'Administrator KEK Batam',
    nilaiDanKeterangan: 'SLA Perizinan PBG & Izin Operasional rata-rata 3–5 hari kerja dengan zero backlog',
    keunggulan: 'KEK',
  },
  {
    id: 3,
    tahunRekap: 2025,
    kategori: 'Lalu Lintas Barang & Logistik Kepabeanan',
    uraian: 'Pembebasan Bea Masuk, PPN, dan PPnBM untuk Bahan Baku & Barang Modal Impor',
    wilayah: 'Seluruh Kawasan KPBPB Batam (Pelabuhan & Bandara)',
    nilaiDanKeterangan: 'Non-kuota impor barang industri & fasilitasi masterlist kepabeanan terintegrasi Bea Cukai Batam',
    keunggulan: 'KPBPB',
  },
  {
    id: 4,
    tahunRekap: 2025,
    kategori: 'Sumber Daya Strategis & Energi Hijau',
    uraian: 'Penyediaan Pasokan Tenaga Listrik Hijau (Renewable Energy) Berkapasitas 100 MW & Dual Feed PLN',
    wilayah: 'KEK Nongsa (Data Center Hub) & Tanjung Sauh',
    nilaiDanKeterangan: 'PPA Listrik Hijau 100 MW terhubung kabel laut tegangan tinggi & solar farm terintegrasi',
    keunggulan: 'Sinergi Keduanya',
  },
  {
    id: 5,
    tahunRekap: 2025,
    kategori: 'Keimigrasian & Kemudahan Tenaga Ahli Asing',
    uraian: 'Pemberian Fasilitas Golden Visa, Multiple Entry Business Visa, dan Izin Tinggal Terbatas (ITAS)',
    wilayah: 'Administrator KEK & Imigrasi Batam',
    nilaiDanKeterangan: 'Izin tinggal investor s/d 10 tahun dan percepatan rekomendasi RPTKA tenaga ahli asing spesialis',
    keunggulan: 'KEK',
  },
  {
    id: 6,
    tahunRekap: 2025,
    kategori: 'Pengembangan Berkelanjutan (Green Economy)',
    uraian: 'Standarisasi Kawasan Industri Ramah Lingkungan (Eco-Industrial Park) dan Pengolahan Air Terpadu',
    wilayah: 'KPBPB Batam & KEK Pariwisata/Kesehatan',
    nilaiDanKeterangan: 'Penerapan standar Net-Zero Carbon 2030, instalasi WTP daur ulang, dan pengawasan sempadan pantai',
    keunggulan: 'Sinergi Keduanya',
  },
];

export const KekKajianCard: React.FC<KekKajianCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<SheetKajianMode>('visual_pilar');
  const [selectedBidang, setSelectedBidang] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Pillars Definition
  const pillars = [
    {
      id: 'Pengembangan',
      label: 'Pengembangan KPBPB & KEK',
      icon: Compass,
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      barColor: '#1D4ED8',
      desc: 'Kajian harmonisasi regulasi OSS RBA, Medical Tourism Hub, dan evaluasi capaian target tahunan bisnis KEK.',
    },
    {
      id: 'Kerja Sama',
      label: 'Kerja Sama di KPBPB & KEK',
      icon: Handshake,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      barColor: '#059669',
      desc: 'Kemitraan strategis maskapai MRO internasional, Green Channel logistik pelabuhan, dan fasilitas non-fiskal.',
    },
    {
      id: 'Daya Saing Sumber Daya',
      label: 'Daya Saing & Sumber Daya Strategis',
      icon: Zap,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      barColor: '#D97706',
      desc: 'Pasokan listrik hijau 100 MW untuk data center hyperscale dan pemetaan kualifikasi SDM aviasi EASA/FAA.',
    },
    {
      id: 'Berkelanjutan',
      label: 'Pengembangan KEK Berkelanjutan',
      icon: Leaf,
      color: 'text-teal-700',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      barColor: '#0D9488',
      desc: 'Penerapan standar Eco-Industrial Park, net-zero carbon, mitigasi AMDAL, dan daya dukung air baku.',
    },
  ];

  // Calculations
  const totalKajian = KEK_KAJIAN_DATA.length;
  const totalDitindaklanjuti = KEK_KAJIAN_DATA.filter((k) => k.status === 'Ditindaklanjuti').length;
  const totalDalamPembahasan = KEK_KAJIAN_DATA.filter((k) => k.status === 'Dalam Pembahasan').length;
  const persenTindakLanjut = totalKajian > 0 ? (totalDitindaklanjuti / totalKajian) * 100 : 0;

  // Filtered documents
  const filteredDocs = useMemo(() => {
    return KEK_KAJIAN_DATA.filter((item) => {
      const matchBidang = selectedBidang === 'ALL' || item.bidang === selectedBidang;
      const matchSearch =
        !searchQuery.trim() ||
        item.judulKajian.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nomorDokumen.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBidang && matchSearch;
    });
  }, [selectedBidang, searchQuery]);

  const handleExportCsv = () => {
    const headers = [
      'ID_DOKUMEN',
      'NOMOR_DOKUMEN',
      'JUDUL_LAPORAN_KAJIAN',
      'PILAR_BIDANG',
      'TAHUN',
      'STATUS_TINDAK_LANJUT',
      'TANGGAL_DOKUMEN',
    ];

    const rows = filteredDocs.map((item) => [
      item.id,
      `"${item.nomorDokumen}"`,
      `"${item.judulKajian}"`,
      `"${item.bidang}"`,
      item.tahun,
      `"${item.status}"`,
      item.tanggalDokumen,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Laporan_Kajian_Pengembangan_Kerja_Sama_KEK_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getVisualMeta = () => {
    switch (activeSheet) {
      case 'visual_pilar':
        return {
          name: 'Visual Sebaran 4 Pilar Kajian Strategis & Tingkat Capaian Tindak Lanjut Rekomendasi',
          attrs: [
            'LAPORAN KAJIAN',
            'PILAR BIDANG (Pengembangan, Kerja Sama, Daya Saing, Berkelanjutan)',
            'TAHUN',
            'STATUS TINDAK LANJUT',
          ],
        };
      case 'portofolio_dokumen':
        return {
          name: 'Portofolio Dokumen Digital Kajian Strategis (12 Dokumen Digital Perkin)',
          attrs: [
            'LAPORAN KAJIAN',
            'NOMOR DOKUMEN',
            'JUDUL KAJIAN',
            'BIDANG',
            'STATUS',
            'TANGGAL DOKUMEN',
          ],
        };
      case 'daya_saing_kpbpb':
        return {
          name: 'Matriks Perbandingan Daya Saing Wilayah KPBPB & KEK (Dataset No. 9 Hal. 10)',
          attrs: [
            'TAHUN REKAP',
            'KATEGORI',
            'URAIAN',
            'WILAYAH',
            'NILAI DAN KETERANGAN',
          ],
        };
    }
  };

  const visualMeta = getVisualMeta();

  return (
    <div
      id="kek-kajian-section"
      className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5"
    >
      {/* Official Visual Header (Memenuhi Poin 5) */}
      <KekVisualHeader
        datasetNumber={12}
        pdfPages="Hal. 11"
        title="LAPORAN KAJIAN PENGEMBANGAN, KERJA SAMA DI KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS (KPBPB), DAYA SAING, SUMBER DAYA STRATEGIS, DAN PENGEMBANGAN KEK YANG BERKELANJUTAN"
        visualName={visualMeta.name}
        visualIcon={<BookOpen className="w-3.5 h-3.5 text-blue-600" />}
        attributes={visualMeta.attrs}
        classification="TERTUTUP"
        periode="PERTAHUN"
        rightControls={
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setActiveSheet('visual_pilar')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSheet === 'visual_pilar'
                  ? 'bg-white text-blue-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sheet 1: 4 Pilar Kajian"
            >
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              <span>4 Pilar Kajian</span>
            </button>

            <button
              onClick={() => setActiveSheet('portofolio_dokumen')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSheet === 'portofolio_dokumen'
                  ? 'bg-white text-blue-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sheet 2: Portofolio Dokumen Digital"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Dokumen Digital</span>
            </button>

            <button
              onClick={() => setActiveSheet('daya_saing_kpbpb')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSheet === 'daya_saing_kpbpb'
                  ? 'bg-white text-blue-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sheet 3: Daya Saing KPBPB & KEK"
            >
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span>Daya Saing (Hal. 10)</span>
            </button>
          </div>
        }
        onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('kpi_kek_kajian_perkin')}
      />

      {/* TOP KPI STATUS STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-blue-800 uppercase tracking-wider mb-1">
            <span>Total Dokumen Kajian</span>
            <span className="font-mono bg-blue-200/80 px-1.5 py-0.2 rounded text-blue-900">Perkin 2025</span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            {totalKajian} <span className="text-xs font-normal text-slate-500 font-sans">Kajian</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            Target 100% tersusun sesuai Renstra KEK
          </div>
        </div>

        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <span>Telah Ditindaklanjuti</span>
            <span className="font-mono bg-emerald-200/80 px-1.5 py-0.2 rounded text-emerald-900">91,7%</span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-900">
            {totalDitindaklanjuti} <span className="text-xs font-normal text-emerald-700 font-sans">Dokumen</span>
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            <span>Rekomendasi diimplementasikan</span>
          </div>
        </div>

        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-amber-800 uppercase tracking-wider mb-1">
            <span>Dalam Pembahasan</span>
            <span className="font-mono bg-amber-200/80 px-1.5 py-0.2 rounded text-amber-900">8,3%</span>
          </div>
          <div className="text-2xl font-black font-mono text-amber-900">
            {totalDalamPembahasan} <span className="text-xs font-normal text-amber-700 font-sans">Dokumen</span>
          </div>
          <div className="text-[11px] text-amber-700 mt-1 flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3" />
            <span>Tahap harmonisasi BUPP & BC</span>
          </div>
        </div>

        <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl">
          <div className="flex items-center justify-between text-[10.5px] font-bold text-indigo-800 uppercase tracking-wider mb-1">
            <span>Pilar Kajian Terbanyak</span>
            <span className="font-mono bg-indigo-200/80 px-1.5 py-0.2 rounded text-indigo-900">4 Pilar</span>
          </div>
          <div className="text-lg font-black text-indigo-950 truncate">
            Pengembangan &amp; Kerja Sama
          </div>
          <div className="text-[11px] text-indigo-700 mt-1 font-medium">
            Mendorong ekosistem investasi berdaya saing
          </div>
        </div>
      </div>

      {/* SHEET 1: VISUAL 4 PILAR KAJIAN STRATEGIS */}
      {activeSheet === 'visual_pilar' && (
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Sebaran Dokumen Kajian Strategis Berdasarkan 4 Pilar Utama
                </h3>
                <p className="text-[11px] text-slate-500">
                  Pemetaan kajian pengembangan, kemitraan kerja sama, daya saing sumber daya strategis, dan keberlanjutan KEK
                </p>
              </div>
              <div className="text-xs text-slate-600 font-semibold bg-white px-2.5 py-1 rounded-md border border-slate-200">
                Tingkat Penyelesaian: <strong className="text-emerald-700 font-mono font-bold">91,7%</strong>
              </div>
            </div>

            {/* 4 Pillars Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                const docsInPillar = KEK_KAJIAN_DATA.filter((k) => k.bidang === pillar.id);
                const doneCount = docsInPillar.filter((k) => k.status === 'Ditindaklanjuti').length;
                const pct = (docsInPillar.length / totalKajian) * 100;

                return (
                  <div
                    key={pillar.id}
                    onClick={() => {
                      setSelectedBidang(pillar.id);
                      setActiveSheet('portofolio_dokumen');
                    }}
                    className={`p-4 bg-white border ${pillar.border} rounded-xl shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg ${pillar.bg} ${pillar.color} flex items-center justify-center shrink-0`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              Pilar Strategis
                            </span>
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-700 transition-colors">
                              {pillar.label}
                            </h4>
                          </div>
                        </div>
                        <span className="font-mono text-base font-black text-slate-900 bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-200">
                          {docsInPillar.length} Dokumen
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span className="text-slate-500">
                          Tindak Lanjut: <strong>{doneCount}/{docsInPillar.length} Selesai</strong>
                        </span>
                        <span className="font-mono font-bold text-emerald-700">
                          {Math.round((doneCount / docsInPillar.length) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(doneCount / docsInPillar.length) * 100}%`,
                            backgroundColor: pillar.barColor,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SHEET 2: PORTOFOLIO DOKUMEN DIGITAL KAJIAN (12 DOKUMEN) */}
      {activeSheet === 'portofolio_dokumen' && (
        <div className="space-y-3">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-500 font-semibold flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" />
                Pilar:
              </span>
              <button
                onClick={() => setSelectedBidang('ALL')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                  selectedBidang === 'ALL'
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                Semua ({totalKajian})
              </button>
              {pillars.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedBidang(p.id)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                    selectedBidang === p.id
                      ? 'bg-blue-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {p.id} ({KEK_KAJIAN_DATA.filter((k) => k.bidang === p.id).length})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari dokumen kajian..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 bg-white border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 w-44"
                />
              </div>

              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded border border-slate-300 cursor-pointer shadow-2xs text-xs"
                title="Unduh Daftar Dokumen Kajian (.CSV)"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Documents Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#0F1E36] text-white text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3 w-10 text-center">No</th>
                  <th className="py-2.5 px-3 w-36">No Dokumen</th>
                  <th className="py-2.5 px-3">Judul Laporan Kajian</th>
                  <th className="py-2.5 px-3 w-40">Pilar Bidang</th>
                  <th className="py-2.5 px-3 w-28 text-center">Status</th>
                  <th className="py-2.5 px-3 w-28">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {filteredDocs.map((doc, idx) => {
                  const isDone = doc.status === 'Ditindaklanjuti';
                  return (
                    <tr
                      key={doc.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      }`}
                    >
                      <td className="py-2.5 px-3 text-center font-mono text-slate-400 font-bold">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700 whitespace-nowrap">
                        {doc.nomorDokumen}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-900 leading-snug">
                        {doc.judulKajian}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
                          {doc.bidang}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-bold ${
                            isDone
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                        {doc.tanggalDokumen}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SHEET 3: MATRIKS PERBANDINGAN DAYA SAING KPBPB VS KEK (DATASET 9 HAL. 10) */}
      {activeSheet === 'daya_saing_kpbpb' && (
        <div className="space-y-3">
          <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-700 shrink-0" />
              <p className="text-slate-700">
                <strong className="text-blue-950 font-bold">Dataset No. 9 (Hal. 10):</strong> Perbandingan Daya Saing Pengembangan Kawasan Perdagangan Bebas dan Pelabuhan Bebas (KPBPB) dan Kawasan Ekonomi Khusus (KEK) Batam.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100 text-blue-900 border border-blue-300 rounded font-bold shrink-0 hidden sm:inline-block">
              TERBUKA • PERTAHUN
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#0F1E36] text-white text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3 w-10 text-center">No</th>
                  <th className="py-2.5 px-3 w-20">Tahun Rekap</th>
                  <th className="py-2.5 px-3 w-48">Kategori</th>
                  <th className="py-2.5 px-3">Uraian Komparasi</th>
                  <th className="py-2.5 px-3 w-48">Wilayah</th>
                  <th className="py-2.5 px-3">Nilai dan Keterangan</th>
                  <th className="py-2.5 px-3 w-28 text-center">Keunggulan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {DATA_DAYA_SAING_KPBPB_KEK.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                      {row.tahunRekap}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {row.kategori}
                    </td>
                    <td className="py-2.5 px-3 text-slate-800 leading-snug">
                      {row.uraian}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-medium">
                      {row.wilayah}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 leading-snug">
                      {row.nilaiDanKeterangan}
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-[10.5px] ${
                          row.keunggulan === 'KEK'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : row.keunggulan === 'KPBPB'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                        }`}
                      >
                        {row.keunggulan}
                      </span>
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
