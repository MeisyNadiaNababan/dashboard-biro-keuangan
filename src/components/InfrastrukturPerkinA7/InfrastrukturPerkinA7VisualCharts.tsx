import React, { useState } from 'react';
import {
  TrendingUp,
  HardHat,
  Route,
  Coins,
  ShieldAlert,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HelpCircle,
  BarChart3,
  PieChart as PieIcon,
  Filter,
  Maximize2,
  Trees,
  Droplets,
  Mountain,
  Compass,
  Ship,
  DollarSign,
  ArrowUpRight,
  Database,
  FileText,
  Info,
  ChevronDown,
  ChevronUp,
  Tag,
  BookOpen,
  ShieldCheck,
  Flame,
  Users,
  Search,
  Activity,
  AlertCircle,
  Table,
  BarChart2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
} from 'recharts';
import {
  KURVA_S_INFRASTRUKTUR_BULANAN,
  KURVA_S_METADATA_ATRIBUT,
  SEKTOR_INFRASTRUKTUR_ALOKASI,
  PNBP_INFRASTRUKTUR_DETAIL,
  PNBP_ROW_METADATA,
} from './perkinA7Data';
import {
  DATASET_4_PROGRES_KONSTRUKSI,
  DATASET_6_PEMBANGUNAN_INFRASTRUKTUR,
} from '../PembangunanInfrastruktur/infrastrukturData';
import { InfrastrukturProgresKonstruksiVisualizer } from './InfrastrukturProgresKonstruksiVisualizer';
import {
  TREND_BULANAN_OPERASI_DITPAM,
  PENERTIBAN_BY_JENIS_KEGIATAN,
  BANGUNAN_LIAR_SUMMARY,
  BANGUNAN_LIAR_SAMPLES,
  UNJUK_RASA_DATA,
  TOTAL_PERSONIL_DITPAM,
  TOTAL_LUAS_PENINDAKAN_HA,
} from '../PengamananAset/pengamananAsetData';

interface InfrastrukturPerkinA7VisualChartsProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const InfrastrukturPerkinA7VisualCharts: React.FC<InfrastrukturPerkinA7VisualChartsProps> = ({
  onOpenFormulaModal,
  onNavigateToUnit,
}) => {
  // Pilihan tab visualisasi:
  // 1. 'progres-konstruksi' (Laporan Progres Pekerjaan Kontruksi & Pembangunan Infras Data No. 4 & 6)
  // 2. 'anggaran-kepala-bp' (Ringkasan Keuangan 5 Realisasi Belanja Gaya Kepala BP Batam)
  // 3. 'pengamanan-aset' (Visualisasi Inti Pengamanan Aset & Kawasan - Ditpam)
  // 4. 'pnbp-row' (PNBP ROW Utilitas & Penghijauan)
  // (Sheet Kemantapan Jalan Spasial dihapus sesuai instruksi user)
  const [activeVisualTab, setActiveVisualTab] = useState<
    'progres-konstruksi' | 'anggaran-kepala-bp' | 'pengamanan-aset' | 'pnbp-row'
  >('progres-konstruksi');

  const getSektorIcon = (icon: string) => {
    switch (icon) {
      case 'Route':
        return <Route className="w-4 h-4 text-blue-600" />;
      case 'Mountain':
        return <Mountain className="w-4 h-4 text-amber-600" />;
      case 'Droplets':
        return <Droplets className="w-4 h-4 text-cyan-600" />;
      case 'Ship':
        return <Ship className="w-4 h-4 text-indigo-600" />;
      default:
        return <Compass className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4 font-sans">
      {/* Visual Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h3 className="text-sm font-black tracking-wider uppercase text-slate-800">
              PUSAT VISUALISASI ANALITIK INFRASTRUKTUR
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              Buku Satu Data Terintegrasi
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Eksplorasi Progres Konstruksi (Data No. 4 &amp; 6), Ringkasan Keuangan 5 Belanja (Gaya Kepala BP), Pengamanan Aset &amp; Kawasan (Ditpam), dan PNBP ROW Utilitas.
          </p>
        </div>

        {/* Tab Switcher - 4 Tab Pilihan (Sheet Kemantapan Jalan Spasial Dihapus) */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveVisualTab('progres-konstruksi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeVisualTab === 'progres-konstruksi'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>Progres Konstruksi (Data 4 &amp; 6)</span>
          </button>
          <button
            onClick={() => setActiveVisualTab('anggaran-kepala-bp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeVisualTab === 'anggaran-kepala-bp'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Ringkasan Keuangan 5 Belanja</span>
          </button>
          <button
            onClick={() => setActiveVisualTab('pengamanan-aset')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeVisualTab === 'pengamanan-aset'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Pengamanan Aset &amp; Kawasan</span>
          </button>
          <button
            onClick={() => setActiveVisualTab('pnbp-row')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeVisualTab === 'pnbp-row'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>PNBP ROW Utilitas</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SHEET 1: LAPORAN PROGRES PEKERJAAN KONTRUKSI TAHUN BERJALAN    */}
      {/* DATA NO. 4 & DATA NO. 6 DIT. PEMBANGUNAN INFRASTRUKTUR         */}
      {/* ============================================================== */}
      {activeVisualTab === 'progres-konstruksi' && (
        <InfrastrukturProgresKonstruksiVisualizer
          onOpenFormulaModal={onOpenFormulaModal}
          onNavigateToUnit={onNavigateToUnit}
        />
      )}

      {/* ============================================================== */}
      {/* SHEET 2: RINGKASAN KEUANGAN 5 BELANJA (GAYA KEPALA BP BATAM)   */}
      {/* ============================================================== */}
      {activeVisualTab === 'anggaran-kepala-bp' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3.5 font-sans">
          {/* Header bergaya Ringkasan Keuangan Dashboard Kepala BP Batam */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 font-mono">
                  RINGKASAN KEUANGAN
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                  KONSOLIDASI DEP-A7
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Alokasi Pagu &amp; Serapan Belanja Modal Terintegrasi (Buku Satu Data Hal. 4-5 &amp; Hal. 48-53)
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                REALISASI YTD
              </span>
              <span className="text-sm sm:text-base font-black font-mono text-emerald-700">
                Rp 682,43 M <span className="text-xs text-emerald-600 font-bold">(81,00%)</span>
              </span>
            </div>
          </div>

          {/* Strip Dua Kotak: TOTAL PAGU vs BELANJA (Persis Gaya Kepala BP Batam) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">TOTAL PAGU PROGRAM (5 SEKTOR)</span>
                <span className="text-[9.5px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                  DIPA BP BATAM
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Rp 842,50 M
              </div>
              <div className="text-[10.5px] text-slate-500 mt-1 flex items-center justify-between">
                <span>14 Paket Konstruksi + 43 Paket DED</span>
                <span className="font-bold text-slate-700">Sisa: Rp 160,07 M</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">REALISASI BELANJA</span>
                <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  81,00% SERAPAN
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-1">
                Rp 682,43 M
              </div>
              <div className="text-[10.5px] text-slate-500 mt-1 flex items-center justify-between">
                <span>On-Track Capaian Tahunan</span>
                <span className="font-bold text-emerald-700">Target Akhir: 85,0%</span>
              </div>
            </div>
          </div>

          {/* 5 REALISASI BELANJA INFRASTRUKTUR (VISUALISASI LANGSUNG PENUH GAYA KEPALA BP BATAM) */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100 font-sans">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500 font-mono block">
                5 REALISASI BELANJA INFRASTRUKTUR (KONSOLIDASI PROGRAM)
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Data Statistik Terverifikasi Buku Satu Data
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 font-mono">
              {SEKTOR_INFRASTRUKTUR_ALOKASI.map((sektor) => (
                <div
                  key={sektor.kategori}
                  className="p-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 transition-all space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                        {getSektorIcon(sektor.icon)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{sektor.kategori}</div>
                        <div className="text-[10.5px] text-slate-500 flex items-center gap-1.5 font-sans">
                          <span>{sektor.totalPaket} Paket Terintegrasi</span>
                          <span>&bull;</span>
                          <span className="text-slate-400 truncate max-w-xs">{sektor.keterangan}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="font-black text-slate-900 text-xs sm:text-sm">
                        {sektor.persen}% <span className="text-emerald-700 font-bold">(Rp {sektor.realisasiMiliar} M)</span>
                      </div>
                      <div className="text-[10.5px] text-slate-500 font-normal">
                        Pagu: Rp {sektor.paguMiliar} M | <span className="text-slate-400">Sisa: Rp {(sektor.paguMiliar - sektor.realisasiMiliar).toFixed(1)} M</span>
                      </div>
                    </div>
                  </div>

                  {/* Multi-stop Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 rounded-full transition-all"
                      style={{ width: `${sektor.persen}%` }}
                    />
                  </div>

                  {/* Embedded Attribute & Dataset Citations directly in the card */}
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] pt-0.5 text-slate-500 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400 font-sans">Sumber:</span>
                      <span className="font-semibold text-slate-700 truncate max-w-[280px] sm:max-w-md">
                        {sektor.unitPengampu} ({sektor.dataNoSatuData.split('|')[0].trim()})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[9.5px]">
                      <span className="text-slate-400 font-sans">Atribut:</span>
                      <span className="bg-white px-1.5 py-0.2 rounded border border-slate-200 text-slate-700 font-mono">
                        {sektor.atributTerpakai.slice(0, 4).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Status Bergaya Kepala BP Batam */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-600">
            <div className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Status: Serapan belanja modal infrastruktur on-track (81,0% dari target akhir tahun 85,0%).</span>
            </div>
            <button
              onClick={() => onNavigateToUnit && onNavigateToUnit('dit-pembangunan-infrastruktur')}
              className="font-bold text-blue-700 hover:underline shrink-0 text-left sm:text-right cursor-pointer"
            >
              Lihat Rincian Sektor &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SHEET 3: PENGAMANAN ASET & KAWASAN (DITPAM BP BATAM)           */}
      {/* ============================================================== */}
      {activeVisualTab === 'pengamanan-aset' && (
        <div className="space-y-4 font-sans">
          {/* Header Metadata Attribution Box for Ditpam */}
          <div className="p-3 bg-slate-900 text-white rounded-xl border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-blue-500 text-white">
                  DIREKTORAT PENGAMANAN ASET DAN KAWASAN (DITPAM)
                </span>
                <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  DATA NO. 1, 6, 7 &amp; 9 (Buku Satu Data Hal. 17-19)
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Kinerja Operasi Pengamanan Aset Vital, Penertiban Bangunan Liar, Pengamanan Unjuk Rasa, dan Penanggulangan Bencana Alam di Batam.
              </p>
            </div>

            <button
              onClick={() => onOpenFormulaModal('kpi_bangunan_liar')}
              className="text-xs text-cyan-300 hover:text-white font-bold flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 shadow-2xs shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Formula Ditpam</span>
            </button>
          </div>

          {/* 4 Summary Metric Cards (Inti Informasi Ditpam) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] uppercase font-mono font-bold text-rose-800">PENERTIBAN BANGUNAN LIAR</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white text-rose-800 font-bold border border-rose-300">
                  Data No. 1
                </span>
              </div>
              <div className="text-xl font-black font-mono text-rose-950 mt-1">
                {BANGUNAN_LIAR_SUMMARY.totalBangunanDitertibkan} Unit
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                Dari {BANGUNAN_LIAR_SUMMARY.totalEntriTerdata} entri terdata ({BANGUNAN_LIAR_SUMMARY.luasTotalTerdataHa} Ha)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] uppercase font-mono font-bold text-blue-800">PERSONIL SIAGA DITPAM</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white text-blue-800 font-bold border border-blue-300">
                  Data No. 2 &amp; 3
                </span>
              </div>
              <div className="text-xl font-black font-mono text-blue-950 mt-1">
                {TOTAL_PERSONIL_DITPAM} Personil
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                Tersebar di 6 Subdit &amp; Obvitnas Batam
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] uppercase font-mono font-bold text-amber-800">PENGAMANAN UNJUK RASA</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white text-amber-800 font-bold border border-amber-300">
                  Data No. 7
                </span>
              </div>
              <div className="text-xl font-black font-mono text-amber-950 mt-1">
                {UNJUK_RASA_DATA.length} Aksi Terkawal
              </div>
              <div className="text-[10px] text-emerald-700 font-mono font-bold mt-0.5">
                100% Zero Incident &amp; Tertib Kondusif
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] uppercase font-mono font-bold text-emerald-800">PENANGANAN BENCANA &amp; RESCUE</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white text-emerald-800 font-bold border border-emerald-300">
                  Data No. 6
                </span>
              </div>
              <div className="text-xl font-black font-mono text-emerald-950 mt-1">
                142 Kejadian
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                Karhutla, Longsor, dan Pohon Tumbang
              </div>
            </div>
          </div>

          {/* Interactive Chart: Tren Operasi Bulanan Ditpam (Penertiban, Unjuk Rasa, Bencana Alam) */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-200">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Tren Bulanan Beban Operasi Lapangan Ditpam BP Batam
                </h4>
                <p className="text-[11px] text-slate-500">
                  Frekuensi penertiban rutin, unjuk rasa, kejadian bencana alam, dan kekuatan personil yang diterjunkan
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                Data Statistik Perbulan
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={TREND_BULANAN_OPERASI_DITPAM} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis yAxisId="right" orientation="right" unit=" org" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar yAxisId="left" dataKey="penertiban" name="Penertiban Lapangan (Kegiatan)" fill="#ef4444" />
                  <Bar yAxisId="left" dataKey="bencanaAlam" name="Bencana & Rescue (Kasus)" fill="#f59e0b" />
                  <Bar yAxisId="left" dataKey="unjukRasa" name="Unjuk Rasa (Giat)" fill="#3b82f6" />
                  <Line yAxisId="right" type="monotone" dataKey="personilTerjun" name="Personil Diterjunkan (Org)" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown 6 Kategori Objek Penertiban & Sampel Giat Penertiban Terkini */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* 6 Kategori Objek Penertiban (5 Cols) */}
            <div className="lg:col-span-5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 font-mono block">
                REKAPITULASI OBJEK PENERTIBAN (DATASET NO. 9)
              </span>

              <div className="space-y-1.5 text-xs font-mono">
                {PENERTIBAN_BY_JENIS_KEGIATAN.map((keg) => (
                  <div key={keg.jenisKegiatan} className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800 text-[11px] truncate max-w-[210px]" title={keg.jenisKegiatan}>
                        {keg.jenisKegiatan}
                      </div>
                      <div className="text-[9.5px] text-slate-500 font-normal">
                        Kategori: {keg.kategori}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-black text-rose-700 text-xs">
                        {keg.jumlahKegiatan} Giat
                      </div>
                      <div className="text-[9.5px] text-slate-400">
                        {keg.totalObjekDitertibkan} Objek
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sampel Entri Penertiban Terdata Buku Satu Data Hal. 17 (7 Cols) */}
            <div className="lg:col-span-7 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 font-mono block">
                  ENTRI DATA PENERTIBAN TERDAFTAR (DATA NO. 1 HAL. 17)
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Atribut: LOKASI, JENISBANGUNAN, LUAS
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase font-mono">
                      <th className="py-2 px-2.5">Lokasi &amp; SWP</th>
                      <th className="py-2 px-2.5">Jenis Bangunan</th>
                      <th className="py-2 px-2.5">Lama Menghuni</th>
                      <th className="py-2 px-2.5 text-right">Luas (M2)</th>
                      <th className="py-2 px-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {BANGUNAN_LIAR_SAMPLES.slice(0, 5).map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80">
                        <td className="py-1.5 px-2.5">
                          <span className="font-bold text-slate-800 block text-xs">{row.lokasi}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{row.swp}</span>
                        </td>
                        <td className="py-1.5 px-2.5 text-slate-700 text-[11px]">{row.jenisBangunan}</td>
                        <td className="py-1.5 px-2.5 font-mono text-slate-600 text-[10.5px]">{row.lamaMenghuni}</td>
                        <td className="py-1.5 px-2.5 text-right font-mono font-bold text-slate-900">{row.luasM2} m²</td>
                        <td className="py-1.5 px-2.5 text-center">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[9.5px] font-bold font-mono bg-emerald-100 text-emerald-800">
                            {row.statusPenertiban}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2 text-[10.5px] text-slate-500 flex items-center justify-between">
                <span>Total 1.030 data penertiban bangunan liar terdata resmi di Buku Satu Data Hal. 17.</span>
                <button
                  onClick={() => onNavigateToUnit && onNavigateToUnit('dit-pam-aset')}
                  className="font-bold text-blue-700 hover:underline shrink-0 cursor-pointer"
                >
                  Detail Ditpam &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SHEET 4: PNBP ROW UTILITAS & PENGHIJAUAN (DATA NO. 1 & 2)      */}
      {/* ============================================================== */}
      {activeVisualTab === 'pnbp-row' && (
        <div className="space-y-4 font-sans">
          {/* Header Metadata Attribution Banner */}
          <div className="p-3 bg-cyan-50/70 rounded-xl border border-cyan-200/80 text-xs text-cyan-950 space-y-1">
            <div className="flex items-center gap-2 font-bold text-cyan-900">
              <Database className="w-3.5 h-3.5 text-cyan-700" />
              <span>PEMETAAN SUMBER DATASET RESMI PENERIMAAN PNBP INFRASTRUKTUR (PDF Hal. 48 &amp; Hal. 4):</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="bg-white p-2 rounded-lg border border-cyan-200">
                <div className="font-bold text-slate-800">Dit. Pembangunan Infrastruktur (Hal. 48):</div>
                <div className="text-slate-600">
                  &bull; Data No. 1: <em>Pemanfaatan ROW Utilitas</em> (<code>TOTAL GALIAN</code>, <code>GALIAN TERBUKA</code>, <code>KODE TRANSAKSI</code>)
                  <br />
                  &bull; Data No. 2: <em>Pemanfaatan ROW Penghijauan</em> (<code>LUAS PENGHIJAUAN</code>, <code>JENIS PENGHIJAUAN</code>, <code>KODE TRANSAKSI</code>)
                </div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-cyan-200">
                <div className="font-bold text-slate-800">Biro Keuangan (Hal. 4):</div>
                <div className="text-slate-600">
                  &bull; Data No. 7 &amp; 8: <em>Rincian &amp; Rekapitulasi Target PNBP</em> (<code>KODE</code>, <code>PENGGUNA</code>, <code>TARIF</code>, <code>VOLUME</code>, <code>JUMLAH</code>, <code>NAMA UNIT</code>)
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {PNBP_INFRASTRUKTUR_DETAIL.komponen.map((komp) => (
              <div key={komp.sumber} className="bg-slate-50/80 rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 border border-cyan-200">
                      {komp.kodeDataset}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600">
                      +{ (komp.persen - 100).toFixed(1) }% Surplus
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 leading-snug">
                    {komp.sumber}
                  </h5>

                  <div className="my-2 p-2 rounded-lg bg-white border border-slate-200 flex items-baseline justify-between">
                    <div>
                      <div className="text-[9.5px] uppercase font-mono text-slate-400">Realisasi Penerimaan</div>
                      <div className="text-base font-black font-mono text-slate-900">
                        Rp {(komp.realisasiRupiah / 1000000000).toFixed(2)} M
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9.5px] uppercase font-mono text-slate-400">Target DIPA</div>
                      <div className="text-xs font-mono font-bold text-slate-600">
                        Rp {(komp.targetRupiah / 1000000000).toFixed(2)} M
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-600">
                    <div><strong>Volume:</strong> {komp.volume}</div>
                    <div><strong>Izin Terbit:</strong> {komp.skTerbit} SK (SLA: {komp.slaHari})</div>
                    <div className="text-slate-500 truncate"><strong>Mitra:</strong> {komp.mitraUtama}</div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[10.5px]">
                  <span className="text-emerald-700 font-bold">Capaian: {komp.persen.toFixed(1)}%</span>
                  <span
                    className="text-blue-600 font-semibold cursor-pointer hover:underline"
                    onClick={() => onOpenFormulaModal('ikp-2-pnbp-infrastruktur')}
                  >
                    Rumus PNBP &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
