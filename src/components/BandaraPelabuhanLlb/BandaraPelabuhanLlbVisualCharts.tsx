import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  LineChart as LineIcon,
  Table as TableIcon,
  Activity,
  Layers,
  Sparkles,
  Plane,
  Anchor,
  Truck,
  Users,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  Maximize2,
  DollarSign,
  Download,
  Calendar,
  ExternalLink,
  ChevronRight,
  Package,
  Smile,
  FileCheck2,
  Award,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
} from 'recharts';
import {
  MONTHLY_OPERATIONAL_DATA,
  IKM_UNSUR_DETAILS,
  OPERATIONAL_ALERTS_A5,
} from './bandaraPelabuhanLlbData';

interface BandaraPelabuhanLlbVisualChartsProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const BandaraPelabuhanLlbVisualCharts: React.FC<
  BandaraPelabuhanLlbVisualChartsProps
> = ({ onOpenFormulaModal, onNavigateToUnit }) => {
  const [activeTab, setActiveTab] = useState<'ikm_konsolidasi' | 'pnbp_konsolidasi'>('ikm_konsolidasi');

  const [selectedLokusNo, setSelectedLokusNo] = useState<number>(1);

  // DATA KONSOLIDASI 3 LOKUS IKM (HANYA BANDARA, PELABUHAN, LALU LINTAS BARANG SESUAI INSTRUKSI USER)
  const LOKUS_IKM_A5 = [
    {
      no: 1,
      id: 'dit-bandara',
      namaLokus: 'Kawasan Bandar Udara Internasional Hang Nadim',
      satker: 'Direktorat Pengelolaan Kawasan Bandara',
      skorIkm: 88.50,
      target: 86.30,
      mutuPelayanan: 'A',
      predikat: 'Sangat Baik',
      jumlahResponden: 1250,
      layananUnggulan: 'Terminal Penumpang, Aviobridge & Fasilitas Sisi Udara',
      unsurTertinggi: 'Kualitas Sarana & Prasarana (92,4)',
      unsurPrioritas: 'Kecepatan Penanganan Bagasi (85,2)',
      icon: <Plane className="w-5 h-5 text-emerald-600" />,
      color: '#059669',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      no: 2,
      id: 'dit-pelabuhan',
      namaLokus: 'Kawasan Kepelabuhanan Domestik & Internasional Batam',
      satker: 'Direktorat Pengelolaan Kepelabuhanan',
      skorIkm: 88.40,
      target: 86.30,
      mutuPelayanan: 'A',
      predikat: 'Sangat Baik',
      jumlahResponden: 1480,
      layananUnggulan: 'Terminal Penumpang Internasional, Dermaga Peti Kemas & Kargo',
      unsurTertinggi: 'Kemudahan Prosedur Sandar & Bongkar Muat (90,1)',
      unsurPrioritas: 'Fasilitas Ruang Tunggu Dermaga (86,0)',
      icon: <Anchor className="w-5 h-5 text-blue-600" />,
      color: '#2563EB',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      no: 3,
      id: 'dit-lalu-lintas-barang',
      namaLokus: 'Pelayanan Perizinan Lalu Lintas Barang & Logistik',
      satker: 'Direktorat Lalu Lintas Barang',
      skorIkm: 88.45,
      target: 86.30,
      mutuPelayanan: 'A',
      predikat: 'Sangat Baik',
      jumlahResponden: 860,
      layananUnggulan: 'Pemasukan/Pengeluaran Barang, Kuota Konsumsi & SLA 96,8%',
      unsurTertinggi: 'Kesesuaian Persyaratan & Keterbukaan Tarif (91,5)',
      unsurPrioritas: 'Waktu Verifikasi Dokumen Masuk (87,0)',
      icon: <Truck className="w-5 h-5 text-amber-600" />,
      color: '#D97706',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  ];

  const selectedLokus = LOKUS_IKM_A5.find((l) => l.no === selectedLokusNo) || LOKUS_IKM_A5[0];

  // DATA TABEL & DONUT PNBP KONSOLIDASI (3 SATKER)
  const PNBP_SATKER_DETAIL = [
    {
      no: 1,
      id: 'dit-bandara',
      namaSatker: 'Dit. Pengelolaan Kawasan Bandara (Hang Nadim)',
      kategori: 'Bandara',
      targetMiliar: 285.00,
      realisasiMiliar: 312.45,
      capaianPersen: 109.63,
      kontribusiPersen: 55.27,
      color: '#059669', // Emerald
      layananUtama: 'PJP4U, Aviobridge, Pas Bandara, Konsesi & Sewa Ruang Komersial',
      status: 'Melampaui Target (+Rp 27,45 M)',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      no: 2,
      id: 'dit-pelabuhan',
      namaSatker: 'Dit. Pengelolaan Kepelabuhanan',
      kategori: 'Pelabuhan',
      targetMiliar: 233.21,
      realisasiMiliar: 250.40,
      capaianPersen: 107.37,
      kontribusiPersen: 44.29,
      color: '#2563EB', // Blue
      layananUtama: 'Jasa Labuh Tambat, Dermaga Peti Kemas Batu Ampar, Pass Pelabuhan',
      status: 'Melampaui Target (+Rp 17,19 M)',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      no: 3,
      id: 'dit-lalu-lintas-barang',
      namaSatker: 'Dit. Lalu Lintas Barang',
      kategori: 'Lalu Lintas Barang',
      targetMiliar: 2.20,
      realisasiMiliar: 2.48,
      capaianPersen: 112.73,
      kontribusiPersen: 0.44,
      color: '#F59E0B', // Amber
      layananUtama: 'Izin Usaha Kawasan, Izin Pemasukan & Pengeluaran Barang Konsumsi',
      status: 'Melampaui Target (+Rp 0,28 M)',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  ];

  const totalTargetPnbp = PNBP_SATKER_DETAIL.reduce((acc, cur) => acc + cur.targetMiliar, 0);
  const totalRealisasiPnbp = PNBP_SATKER_DETAIL.reduce((acc, cur) => acc + cur.realisasiMiliar, 0);
  const totalCapaianPnbp = ((totalRealisasiPnbp / totalTargetPnbp) * 100).toFixed(2);
  const totalSurplusPnbp = (totalRealisasiPnbp - totalTargetPnbp).toFixed(2);

  // Donut chart data
  const pnbpDonutData = PNBP_SATKER_DETAIL.map((item) => ({
    name: item.kategori,
    fullName: item.namaSatker,
    value: item.realisasiMiliar,
    percentage: item.kontribusiPersen,
    color: item.color,
  }));

  const handleExportCsv = () => {
    let csv = 'CAPAIAN EVALUASI 3 INDIKATOR KINERJA PROGRAM PERKIN A5\n';
    if (activeTab === 'ikm_konsolidasi') {
      csv += 'KONSOLIDASI IKM 3 LOKUS LAYANAN (BANDARA, PELABUHAN, LALU LINTAS BARANG)\n';
      csv += 'No,Nama Lokus,Satker Pengampu,Target,Skor Realisasi,Mutu,Responden\n';
      LOKUS_IKM_A5.forEach((l) => {
        csv += `${l.no},"${l.namaLokus}","${l.satker}",${l.target},${l.skorIkm},"${l.mutuPelayanan}",${l.jumlahResponden}\n`;
      });
    } else {
      csv += 'REALISASI & KONTRIBUSI PNBP PER SATKER PENGAMPU PERKIN A5\n';
      csv += 'No,Nama Satker,Target (Rp M),Realisasi (Rp M),Capaian (%),Kontribusi (%)\n';
      PNBP_SATKER_DETAIL.forEach((p) => {
        csv += `${p.no},"${p.namaSatker}",${p.targetMiliar},${p.realisasiMiliar},${p.capaianPersen}%,${p.kontribusiPersen}%\n`;
      });
    }
    const encoded = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `evaluasi_3_ikp_${activeTab}_perkin_a5.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden font-sans">
      {/* 1. TOP METRICS HEADER BAR - Diubah Menjadi "Capaian Evaluasi 3 Indikator Kinerja Program (IKP)" */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-[#0B2545] to-[#13315C] text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-700/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 text-cyan-300 flex items-center justify-center shrink-0 shadow-xs">
              <Award className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 uppercase">
                  EVALUASI PROGRAM TERPADU
                </span>
                <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                  DEP-A5 BP Batam &bull; Perkin TA 2025
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight">
                Capaian Evaluasi 3 Indikator Kinerja Program (IKP)
              </h2>
            </div>
          </div>

          {/* Action Tabs & Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center p-1 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs">
              <button
                onClick={() => setActiveTab('ikm_konsolidasi')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ikm_konsolidasi'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Smile className="w-3.5 h-3.5 text-emerald-400" />
                <span>Konsolidasi IKM</span>
              </button>

              <button
                onClick={() => setActiveTab('pnbp_konsolidasi')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'pnbp_konsolidasi'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-amber-300" />
                <span>PNBP</span>
              </button>
            </div>

            <button
              onClick={handleExportCsv}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
              title="Unduh Data CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. BODY CONTENT SESUAI TAB YANG DIPILIH */}
      <div className="p-4 sm:p-5 space-y-5">
        {/* ==================================================================== */}
        {/* SHEET 1: KONSOLIDASI IKM (BANDARA, PELABUHAN, LALU LINTAS BARANG)    */}
        {/* MODEL TAMPILAN SEPERTI KONSOLIDASI IKM DI DASHBOARD KEPALA BP        */}
        {/* ==================================================================== */}
        {activeTab === 'ikm_konsolidasi' && (
          <div className="space-y-5">
            {/* Header Callout IKM */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50/70 via-white to-emerald-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <Smile className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                      IKP-1 PERKIN A.5 &bull; IKM KONSOLIDASI
                    </span>
                    <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                      Mempedomani PermenPAN-RB No. 14 Tahun 2017
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                    Indeks Kepuasan Masyarakat (IKM) 3 Lokus Layanan Utama DEP-A5
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono">
                    Target: 86,30 | Realisasi Rata-Rata
                  </span>
                  <div className="flex items-baseline justify-end gap-1.5">
                    <span className="text-2xl font-black font-mono text-emerald-800">
                      88,45
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                      Mutu A (Sangat Baik)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenFormulaModal('ikp-1-ikm-gabungan')}
                  className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Formula PermenPAN-RB"
                >
                  <Info className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Manual Rumus</span>
                </button>
              </div>
            </div>

            {/* 3 Lokus Survey Cards (Grid 3 Kolom) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>Skor IKM 3 Lokus Pelayanan Publik (Klik kartu untuk melihat 9 unsur detail):</span>
                </h4>
                <span className="text-slate-500 font-mono text-[11px]">
                  Target Seluruh Lokus: <strong>86,30</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {LOKUS_IKM_A5.map((lokus) => {
                  const isSelected = lokus.no === selectedLokusNo;
                  return (
                    <div
                      key={lokus.no}
                      onClick={() => setSelectedLokusNo(lokus.no)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-400/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white shadow-2xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-bold text-slate-500 font-mono flex items-center gap-1">
                            {lokus.icon}
                            <span>LOKUS #{lokus.no}</span>
                          </span>
                          <span
                            className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                              lokus.mutuPelayanan === 'A'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            Mutu {lokus.mutuPelayanan} ({lokus.predikat})
                          </span>
                        </div>

                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 min-h-[38px]">
                          {lokus.namaLokus}
                        </h5>
                        <p className="text-[10.5px] text-slate-500 mt-0.5">
                          {lokus.satker}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between mb-1.5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black font-mono text-slate-900">
                              {lokus.skorIkm.toFixed(2)}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">/ 100</span>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-emerald-700">
                            +{(lokus.skorIkm - lokus.target).toFixed(2)} di atas target
                          </span>
                        </div>

                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${(lokus.skorIkm / 100) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px]">
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Responden:</span>
                          <span className="font-mono font-bold text-slate-800">
                            {lokus.jumlahResponden.toLocaleString('id-ID')} Pengguna Jasa
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate" title={lokus.unsurTertinggi}>
                          ⭐ Tertinggi: <strong className="text-slate-800">{lokus.unsurTertinggi}</strong>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Klik untuk unsur detail</span>
                        <span className="text-emerald-700 font-bold">
                          {isSelected ? '✓ Terpilih' : 'Pilih Lokus →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Drilldown 9 Unsur Pelayanan PermenPAN-RB untuk Lokus Terpilih */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Rincian 9 Unsur Penilaian IKM: {selectedLokus.namaLokus}
                  </h4>
                </div>
                <span className="text-[10.5px] font-mono text-slate-500">
                  Responden: <strong>{selectedLokus.jumlahResponden} Pengguna</strong> &bull; Rata-rata Skor: <strong>{selectedLokus.skorIkm}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {IKM_UNSUR_DETAILS.map((unsur, idx) => {
                  const nilai =
                    selectedLokus.no === 1
                      ? unsur.nilaiBandara
                      : selectedLokus.no === 2
                      ? unsur.nilaiPelabuhan
                      : unsur.nilaiLlb;

                  const isHigh = nilai >= 88.0;

                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white border border-slate-200/90 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10.5px] font-bold text-slate-800 line-clamp-1" title={unsur.unsur}>
                          {idx + 1}. {unsur.unsur}
                        </span>
                        <span className={`text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isHigh ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-blue-800'
                        }`}>
                          {isHigh ? 'Mutu A' : 'Mutu B'}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span className="text-base font-black font-mono text-slate-900">
                          {nilai.toFixed(2)}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Bobot: {(unsur.bobot * 100).toFixed(0)}%
                        </span>
                      </div>

                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${(nilai / 100) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* SHEET 2: REALISASI & KONTRIBUSI PNBP (3 SATKER GABUNGAN)             */}
        {/* KIRI: KONTRIBUSI PNBP PER SATKER | KANAN: TABEL DETAIL SEPERTI KEPALA BP */}
        {/* ==================================================================== */}
        {activeTab === 'pnbp_konsolidasi' && (
          <div className="space-y-4">
            {/* Header Ringkasan Keuangan PNBP */}
            <div className="p-4 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50/70 via-white to-blue-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-200 uppercase">
                      IKP-2 PERKIN A.5 &bull; PNBP KONSOLIDASI
                    </span>
                    <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                      Penggabungan Bandara, Pelabuhan &amp; Lalu Lintas Barang
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                    Realisasi &amp; Kontribusi PNBP 3 Satker Pengampu (Target Rp 520,41 M)
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono">
                    Target: Rp 520,41 M | Realisasi YTD
                  </span>
                  <div className="flex items-baseline justify-end gap-1.5">
                    <span className="text-2xl font-black font-mono text-emerald-800">
                      Rp {totalRealisasiPnbp.toFixed(2)} M
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                      {totalCapaianPnbp}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
                  className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-lg text-xs font-semibold border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Formula PNBP"
                >
                  <Info className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Manual Rumus</span>
                </button>
              </div>
            </div>

            {/* GRID SIDE-BY-SIDE: KIRI (DONUT KONTRIBUSI) & KANAN (TABEL DETAIL SEPERTI KEPALA BP) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* SISI KIRI (5 KOLOM): KONTRIBUSI PNBP PER SATKER PENGAMPU */}
              <div className="lg:col-span-5 p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <PieIcon className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Kontribusi PNBP per Satker Pengampu
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      3 Satker
                    </span>
                  </div>

                  {/* Donut Chart */}
                  <div className="h-56 relative flex items-center justify-center mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pnbpDonutData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pnbpDonutData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(val: any, name: any, item: any) => [
                            `Rp ${val} Miliar (${item.payload.percentage.toFixed(1)}%)`,
                            item.payload.fullName,
                          ]}
                          contentStyle={{
                            backgroundColor: '#0F1E36',
                            border: '1px solid #1E293B',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '11px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Donut Center Display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[9.5px] text-slate-500 font-bold uppercase font-mono">
                        TOTAL PNBP
                      </span>
                      <span className="text-xl font-black font-mono text-slate-900 leading-tight">
                        Rp {totalRealisasiPnbp.toFixed(1)}M
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 font-mono">
                        {totalCapaianPnbp}%
                      </span>
                    </div>
                  </div>

                  {/* Legend breakdown list */}
                  <div className="space-y-1.5 text-xs pt-2 border-t border-slate-200">
                    {pnbpDonutData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-slate-700 font-medium truncate max-w-[170px]" title={item.fullName}>
                            {item.fullName}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-slate-900 shrink-0">
                          Rp {item.value.toFixed(2)} M ({item.percentage.toFixed(1)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Surplus Badge Box */}
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-900 font-bold">Surplus Realisasi PNBP:</span>
                  <span className="font-black text-emerald-800 text-sm">
                    +Rp {totalSurplusPnbp} Miliar
                  </span>
                </div>
              </div>

              {/* SISI KANAN (7 KOLOM): TABEL DETAIL SEPERTI RINGKASAN KEUANGAN KEPALA BP */}
              <div className="lg:col-span-7 p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <TableIcon className="w-4 h-4 text-blue-600" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Tabel Rincian Realisasi PNBP 3 Satker (Model Ringkasan Keuangan)
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    Buku Satu Data &amp; SIMP BP Batam
                  </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200 font-mono">
                        <th className="py-2 px-2.5 text-center">No</th>
                        <th className="py-2 px-3">Satker &amp; Layanan PNBP</th>
                        <th className="py-2 px-2 text-right">Target (Rp M)</th>
                        <th className="py-2 px-2 text-right">Realisasi (Rp M)</th>
                        <th className="py-2 px-2 text-right">Capaian</th>
                        <th className="py-2 px-2 text-right">Porsi</th>
                        <th className="py-2 px-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {PNBP_SATKER_DETAIL.map((row) => (
                        <tr key={row.no} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-2.5 text-center font-mono font-bold text-slate-500">{row.no}</td>
                          <td className="py-2.5 px-3">
                            <div className="font-bold text-slate-900">{row.namaSatker}</div>
                            <div className="text-[10px] text-slate-500 line-clamp-1 font-sans">{row.layananUtama}</div>
                          </td>
                          <td className="py-2.5 px-2 text-right font-mono text-slate-600">{row.targetMiliar.toFixed(2)}</td>
                          <td className="py-2.5 px-2 text-right font-mono font-black text-slate-900">{row.realisasiMiliar.toFixed(2)}</td>
                          <td className="py-2.5 px-2 text-right font-mono font-bold text-emerald-700">
                            {row.capaianPersen.toFixed(1)}%
                          </td>
                          <td className="py-2.5 px-2 text-right font-mono text-slate-600">
                            {row.kontribusiPersen.toFixed(1)}%
                          </td>
                          <td className="py-2.5 px-2.5 text-center font-mono">
                            <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded border ${row.badgeColor}`}>
                              Melampaui
                            </span>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-200">
                        <td colSpan={2} className="py-2.5 px-3 font-bold text-slate-950 text-right uppercase font-mono text-[10.5px]">
                          Total Konsolidasi DEP-A5:
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-700">{totalTargetPnbp.toFixed(2)}</td>
                        <td className="py-2.5 px-2 text-right font-mono font-black text-emerald-800 text-sm">{totalRealisasiPnbp.toFixed(2)}</td>
                        <td className="py-2.5 px-2 text-right font-mono font-black text-emerald-800">{totalCapaianPnbp}%</td>
                        <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-700">100.0%</td>
                        <td className="py-2.5 px-2.5 text-center">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white font-mono">
                            Surplus
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 3 Mini Summary Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-xs">
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 space-y-0.5">
                    <span className="text-[9.5px] text-emerald-900 font-bold uppercase">1. PNBP Bandara</span>
                    <div className="text-sm font-black text-emerald-950">Rp 312,45 M</div>
                    <div className="text-[9.5px] text-emerald-700 font-semibold">+Rp 27,45 M dari target</div>
                  </div>

                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 space-y-0.5">
                    <span className="text-[9.5px] text-blue-900 font-bold uppercase">2. PNBP Pelabuhan</span>
                    <div className="text-sm font-black text-blue-950">Rp 250,40 M</div>
                    <div className="text-[9.5px] text-blue-700 font-semibold">+Rp 17,19 M dari target</div>
                  </div>

                  <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 space-y-0.5">
                    <span className="text-[9.5px] text-amber-900 font-bold uppercase">3. PNBP Lalu Lintas Barang</span>
                    <div className="text-sm font-black text-amber-950">Rp 2,48 M</div>
                    <div className="text-[9.5px] text-amber-700 font-semibold">+Rp 0,28 M dari target</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
