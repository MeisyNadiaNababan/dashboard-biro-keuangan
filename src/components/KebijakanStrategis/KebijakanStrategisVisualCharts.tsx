import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  ShieldCheck,
  Server,
  Award,
  Layers,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  BookOpen,
  Scale,
  Clock,
  Briefcase,
  Network,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  IKP_METRICS_LIST,
  PROGRAM_ACTIVITIES_BUDGET,
  PTSP_SEKTOR_PERFORMANCES,
  PTSP_MONTHLY_TREND,
  PTSP_IKM_9_UNSUR,
  SPBE_DOMAINS_DATA,
  PDSI_INFRASTRUCTURE_DATA,
  IKK_DIMENSI_DATA,
  PHKS_TARIF_EVALUASI_DATA,
  PUSREN_MASTERPLAN_PROGRESS,
} from './kebijakanStrategisData';

interface KebijakanStrategisVisualChartsProps {
  onOpenFormulaModal?: (kpiId: string) => void;
  onAnalyzeUnit?: (unitId: string) => void;
}

export const KebijakanStrategisVisualCharts: React.FC<KebijakanStrategisVisualChartsProps> = ({
  onOpenFormulaModal,
  onAnalyzeUnit,
}) => {
  const [activeTab, setActiveTab] = useState<
    'ikp_anggaran' | 'perizinan_ptsp' | 'spbe_pdsi' | 'kebijakan_phks' | 'perencanaan_pusren'
  >('ikp_anggaran');

  // Selected Sector for interactive highlight
  const [selectedSektorCode, setSelectedSektorCode] = useState<string | null>(null);

  // Radar Data for 4 IKP (Normalized to 100 for visual symmetry)
  const radarIkpData = [
    {
      subject: 'IKP-1: Perencanaan (IPPN)',
      target: 92,
      realisasi: 94.2,
      fullMark: 100,
    },
    {
      subject: 'IKP-2: Kualitas Kebijakan',
      target: 65,
      realisasi: 71.8,
      fullMark: 100,
    },
    {
      subject: 'IKP-3: Kematangan SPBE (x20)',
      target: 3.9 * 20, // 78
      realisasi: 4.12 * 20, // 82.4
      fullMark: 100,
      labelAsli: 'Target 3.90 / Realisasi 4.12',
    },
    {
      subject: 'IKP-4: IKM Layanan PTSP',
      target: 86.5,
      realisasi: 88.42,
      fullMark: 100,
    },
  ];

  // Colors
  const SEKTOR_COLORS: Record<string, string> = {
    LOG: '#0D9488',
    DAG: '#0284C7',
    KON: '#D97706',
    LAU: '#DC2626',
    IND: '#6366F1',
  };

  const STATUS_PIE_DATA = [
    { name: 'Izin Terbit Resmi', value: 1486, color: '#10B981' },
    { name: 'Dalam Proses Verifikasi', value: 219, color: '#0284C7' },
    { name: 'Menunggu Revisi Pemohon', value: 104, color: '#F59E0B' },
    { name: 'Berkas Ditolak', value: 33, color: '#EF4444' },
  ];

  return (
    <div className="space-y-4">
      {/* Visual Navigation Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-sky-700" />
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                PUSAT VISUALISASI KINERJA &amp; TATA KELOLA PERKIN A2 (DEP A2)
              </h3>
              <p className="text-[10.5px] text-slate-500">
                Pilih perspektif visualisasi untuk menganalisis detail data dari 4 unit kerja
              </p>
            </div>
          </div>

          {/* Perspective Switcher */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('ikp_anggaran')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                activeTab === 'ikp_anggaran'
                  ? 'bg-white text-[#002B49] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              IKP &amp; Pagu Anggaran
            </button>
            <button
              onClick={() => setActiveTab('perizinan_ptsp')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                activeTab === 'perizinan_ptsp'
                  ? 'bg-white text-emerald-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Perizinan &amp; SLA (PTSP)
            </button>
            <button
              onClick={() => setActiveTab('spbe_pdsi')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                activeTab === 'spbe_pdsi'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SPBE &amp; TI (PDSI)
            </button>
            <button
              onClick={() => setActiveTab('kebijakan_phks')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                activeTab === 'kebijakan_phks'
                  ? 'bg-white text-sky-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              IKK &amp; Tarif (PHKS)
            </button>
            <button
              onClick={() => setActiveTab('perencanaan_pusren')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                activeTab === 'perencanaan_pusren'
                  ? 'bg-white text-teal-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Renstra &amp; Masterplan (Pusren)
            </button>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: IKP RADAR & ALOKASI ANGGARAN 4 KEGIATAN PROGRAM               */}
      {/* =================================================================== */}
      {activeTab === 'ikp_anggaran' && (
        <div className="space-y-4">
          {/* Charts Row: Radar 4 IKP & Pagu Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Radar Chart 4 IKP Capaian vs Target */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-sky-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    Radar Capaian 4 IKP vs Target
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  100% On-Target
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarIkpData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" fontSize={9} />
                    <Radar
                      name="Target 2025"
                      dataKey="target"
                      stroke="#94A3B8"
                      fill="#94A3B8"
                      fillOpacity={0.2}
                      strokeDasharray="4 4"
                    />
                    <Radar
                      name="Realisasi Kinerja"
                      dataKey="realisasi"
                      stroke="#0284C7"
                      fill="#0284C7"
                      fillOpacity={0.45}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Tooltip
                      formatter={(val: any, name: any) => [
                        `${Number(val).toFixed(1)} Poin`,
                        name,
                      ]}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Rata-rata Capaian IKP:</span>
                  <span className="font-bold text-emerald-700">105.18% (Melampaui Target)</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  *Indeks SPBE diskalakan ke 100 untuk keseragaman visual radar (Realisasi: 4.12 dari target 3.90).
                </div>
              </div>
            </div>

            {/* Right: Bar Chart Pagu & Realisasi 4 Kegiatan Program */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    Alokasi Anggaran 4 Kegiatan Program A2 (Total: Rp 75,87 M)
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Sumber: DIPA Perkin 2025</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={PROGRAM_ACTIVITIES_BUDGET.map((act) => ({
                      unit: act.unit,
                      paguM: Number((act.pagu / 1e9).toFixed(2)),
                      realisasiM: Number((act.realisasi / 1e9).toFixed(2)),
                      serapan: act.serapanPersen,
                    }))}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="unit" tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                    <Tooltip
                      formatter={(val: any, name: any) => [
                        `Rp ${Number(val).toFixed(2)} Miliar`,
                        name === 'paguM' ? 'Pagu Alokasi' : 'Realisasi Belanja',
                      ]}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar dataKey="paguM" fill="#94A3B8" name="Pagu Anggaran (DIPA)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="realisasiM" fill="#0D9488" name="Realisasi Belanja YTD" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Activities Table Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {PROGRAM_ACTIVITIES_BUDGET.map((act) => (
                  <div
                    key={act.id}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div className="truncate pr-2">
                      <span className="font-bold text-slate-800 block truncate">{act.nama}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Unit: {act.unit} · DIPA: {act.kodeDipa}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-extrabold text-slate-900 block">
                        Rp {(act.pagu / 1e9).toFixed(2)} M
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700">
                        {act.serapanPersen.toFixed(1)}% Serapan
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: KINERJA PERIZINAN PTSP & SLA SEKTORAL */}
      {/* =================================================================== */}
      {activeTab === 'perizinan_ptsp' && (
        <div className="space-y-4">
          {/* Top Metric Cards Row with Satu Data Source Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                  Total Permohonan YTD
                </span>
                <span className="text-[9px] font-mono text-sky-800 bg-sky-50 px-1 py-0.2 rounded font-bold">
                  Data PTSP No. 2
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-slate-900">1.842</span>
                <span className="text-xs text-slate-500 font-medium">berkas</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold">+14.2% vs 2024</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                  Izin Terbit Resmi
                </span>
                <span className="text-[9px] font-mono text-sky-800 bg-sky-50 px-1 py-0.2 rounded font-bold">
                  Data PTSP No. 2
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-emerald-600">1.486</span>
                <span className="text-xs text-slate-500 font-medium">izin</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">80.7% Success Rate</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                  Backlog Aktif
                </span>
                <span className="text-[9px] font-mono text-amber-800 bg-amber-50 px-1 py-0.2 rounded font-bold">
                  Data PTSP No. 3
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-amber-600">214</span>
                <span className="text-xs text-slate-500 font-medium">berkas</span>
              </div>
              <span className="text-[10px] text-amber-700 font-bold">11.6% dari total</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                  Kepatuhan SLA Rata-rata
                </span>
                <span className="text-[9px] font-mono text-sky-800 bg-sky-50 px-1 py-0.2 rounded font-bold">
                  Data PTSP No. 14
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-sky-700">82.4%</span>
                <span className="text-xs text-slate-500 font-medium">SLA</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Target Operasional ≥85%</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-1 col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                  IKM Layanan (IKP-4)
                </span>
                <span className="text-[9px] font-mono text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded font-bold">
                  Data PTSP No. 4
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-emerald-700">88.42</span>
                <span className="text-xs text-emerald-600 font-bold">Mutu A</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold">Sangat Baik (PermenPAN-RB)</span>
            </div>
          </div>

          {/* Charts Row: Trend Line (WITH EXPLICIT BLUE VS GREEN LEGEND) + Sektor SLA Bars + Status Donut */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Chart 1: Tren Volume Permohonan Bulanan */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5 pb-2 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-sky-600" />
                    <h4 className="text-xs font-black uppercase text-slate-900">
                      Tren Volume Permohonan &amp; Izin Terbit
                    </h4>
                  </div>
                  <span className="text-[9.5px] font-mono font-bold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                    Data PTSP No. 2 (Satu Data)
                  </span>
                </div>

                {/* Explicit Color-Coded Distinction Badges (Addresses User Point 2) */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold text-blue-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] inline-block" />
                    <span>🔵 Garis Biru: Permohonan Masuk (Diajukan)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold text-emerald-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] inline-block" />
                    <span>🟢 Garis Hijau: Izin Terbit (Disetujui)</span>
                  </div>
                </div>
              </div>

              {/* Chart with Legend */}
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={PTSP_MONTHLY_TREND} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="bulan" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                    <Tooltip
                      formatter={(val: any, name: any) => [
                        `${val} Berkas`,
                        name === 'permohonan' ? '🔵 Total Permohonan Masuk' : '🟢 Izin Resmi Terbit',
                      ]}
                    />
                    <Legend
                      verticalAlign="top"
                      height={30}
                      wrapperStyle={{ fontSize: '11px', fontWeight: 600 }}
                      formatter={(value) =>
                        value === 'permohonan' ? 'Permohonan Masuk (Biru)' : 'Izin Terbit (Hijau)'
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="permohonan"
                      stroke="#0284C7"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#0284C7' }}
                      name="permohonan"
                    />
                    <Line
                      type="monotone"
                      dataKey="terbit"
                      stroke="#10B981"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#10B981' }}
                      name="terbit"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Explanatory callout for crystal clarity */}
              <div className="text-[10.5px] text-slate-600 bg-sky-50/70 p-2.5 rounded-lg border border-sky-100 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>💡 Penjelasan Makna Garis:</span>
                  <span className="text-emerald-700">Rasio Penyelesaian: 95.4%</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-relaxed">
                  <strong>Garis Biru</strong> = total berkas yang diajukan pemohon. <strong>Garis Hijau</strong> = jumlah izin yang telah selesai diverifikasi &amp; diterbitkan. Selisih merupakan berkas yang sedang dalam proses verifikasi teknis/lapangan.
                </p>
              </div>
            </div>

            {/* Chart 2: SLA per Sektor (Direct comparison with targets) */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-black uppercase text-slate-900">
                    Kepatuhan SLA per Sektor Usaha
                  </h4>
                </div>
                <span className="text-[9.5px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  Data PTSP No. 14
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {PTSP_SEKTOR_PERFORMANCES.map((s) => (
                  <div
                    key={s.kode}
                    onClick={() => setSelectedSektorCode(selectedSektorCode === s.kode ? null : s.kode)}
                    className={`p-2 rounded-lg border transition-all cursor-pointer ${
                      selectedSektorCode === s.kode
                        ? 'border-sky-500 bg-sky-50/30'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-900">{s.sektor}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-mono">
                          Vol: {s.volume}
                        </span>
                        <span
                          className={`font-mono font-black ${
                            s.slaPercent >= 85
                              ? 'text-emerald-700'
                              : s.slaPercent >= 75
                              ? 'text-amber-700'
                              : 'text-red-600'
                          }`}
                        >
                          SLA: {s.slaPercent}%
                        </span>
                      </div>
                    </div>
                    {/* SLA Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          s.slaPercent >= 85
                            ? 'bg-emerald-500'
                            : s.slaPercent >= 75
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${s.slaPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 3: Komposisi Status Permohonan (Donut) */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <PieIcon className="w-4 h-4 text-purple-600" />
                  <h4 className="text-xs font-black uppercase text-slate-900">
                    Komposisi Status
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Total 1.842</span>
              </div>

              <div className="h-44 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={STATUS_PIE_DATA}
                      innerRadius={45}
                      outerRadius={68}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {STATUS_PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val: any) => [`${val} Berkas`, 'Jumlah']} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-base font-black font-mono text-slate-900">1.842</span>
                  <span className="text-[9px] text-slate-400 font-bold">TOTAL</span>
                </div>
              </div>

              <div className="space-y-1 text-[10px] text-slate-600">
                {STATUS_PIE_DATA.map((st) => (
                  <div key={st.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: st.color }} />
                      <span className="truncate">{st.name}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-800">{st.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: SPBE & INFRASTRUKTUR TIK (PDSI) */}
      {/* =================================================================== */}
      {activeTab === 'spbe_pdsi' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Radar 6 Domain SPBE */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    Evaluasi 6 Domain Arsitektur SPBE (Skor: 4.12 / 5.0)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-mono font-bold text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                    Data PDSI No. 1 (Satu Data)
                  </span>
                  <span className="text-[10px] font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    Target: 3.90
                  </span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={SPBE_DOMAINS_DATA.map((d) => ({
                      domain: d.domain.split(' ')[0] + ' ' + (d.domain.split(' ')[1] || ''),
                      skor: d.skor,
                      target: d.target,
                      fullMark: 5.0,
                    }))}
                  >
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis
                      dataKey="domain"
                      tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="#94A3B8" fontSize={9} />
                    <Radar
                      name="Target 2025"
                      dataKey="target"
                      stroke="#94A3B8"
                      fill="#94A3B8"
                      fillOpacity={0.2}
                      strokeDasharray="4 4"
                    />
                    <Radar
                      name="Realisasi Kematangan"
                      dataKey="skor"
                      stroke="#6366F1"
                      fill="#6366F1"
                      fillOpacity={0.45}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Tooltip formatter={(val: any) => [`${val} / 5.0`, 'Skor']} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-indigo-50/60 border border-indigo-100 text-indigo-900">
                  <span className="text-[10px] text-indigo-600 font-bold block">Domain Tertinggi:</span>
                  <span className="font-extrabold">Kebijakan Internal SPBE (4.45)</span>
                </div>
                <div className="p-2 rounded-lg bg-sky-50/60 border border-sky-100 text-sky-900">
                  <span className="text-[10px] text-sky-600 font-bold block">Integrasi TTE BSrE:</span>
                  <span className="font-extrabold">42 dari 48 Aplikasi (87.5%)</span>
                </div>
              </div>
            </div>

            {/* Right: Data Center & Cyber Security Control Tower */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    Tier-3 Data Center &amp; Cyber Defense (SOC)
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Uptime 99.98%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Rak Data Center */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold">Okupansi Rak Server</span>
                    <span className="font-mono font-extrabold text-slate-900">
                      {PDSI_INFRASTRUCTURE_DATA.dataCenter.rakTerisi} /{' '}
                      {PDSI_INFRASTRUCTURE_DATA.dataCenter.totalRak}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{ width: `${PDSI_INFRASTRUCTURE_DATA.dataCenter.okupansiPersen}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] text-slate-500">
                    <span>{PDSI_INFRASTRUCTURE_DATA.dataCenter.okupansiPersen}% Terisi</span>
                    <span>{PDSI_INFRASTRUCTURE_DATA.dataCenter.rakKosong} Rak Kosong</span>
                  </div>
                </div>

                {/* Fiber Optic Backbone */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold">Jalur Fiber Optik</span>
                    <span className="font-mono font-extrabold text-slate-900">
                      {PDSI_INFRASTRUCTURE_DATA.fiberOptic.totalPanjangKm} Km
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-600"
                      style={{ width: `${PDSI_INFRASTRUCTURE_DATA.fiberOptic.utilisasiPersen}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] text-slate-500">
                    <span>{PDSI_INFRASTRUCTURE_DATA.fiberOptic.utilisasiPersen}% Utilisasi</span>
                    <span>{PDSI_INFRASTRUCTURE_DATA.fiberOptic.coreAktif} Core Aktif</span>
                  </div>
                </div>

                {/* SOC Cyber Threat Mitigation */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Mitigasi Serangan Siber (SOC)
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black font-mono text-emerald-600">
                      {PDSI_INFRASTRUCTURE_DATA.cyberSecurity.threatMitigatedPersen}%
                    </span>
                    <span className="text-[10.5px] text-slate-500">Terhalau</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    {PDSI_INFRASTRUCTURE_DATA.cyberSecurity.totalThreatYtd.toLocaleString()} anomali/threat dimitigasi. Response time {PDSI_INFRASTRUCTURE_DATA.cyberSecurity.avgResponseMinutes} menit.
                  </p>
                </div>

                {/* Status Server & Storage */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Katalog Aplikasi Resmi
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black font-mono text-indigo-700">
                      {PDSI_INFRASTRUCTURE_DATA.aplikasi.totalAplikasiAktif}
                    </span>
                    <span className="text-[10.5px] text-slate-500">Sistem</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    100% terhubung ke platform Satu Data BP Batam dan diproteksi sertifikasi digital BSrE.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 4: IKK & TARIF LAYANAN (PHKS) */}
      {/* =================================================================== */}
      {activeTab === 'kebijakan_phks' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: 4 Dimensi IKK Progress */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-sky-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    Indeks Kualitas Kebijakan (IKK: 71.80 / Target: 65.0)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-mono font-bold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                    Data PHKS No. 1 (Satu Data)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    +10.46%
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                {IKK_DIMENSI_DATA.map((dim) => (
                  <div key={dim.dimensi} className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{dim.dimensi}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-mono">Bobot: {dim.bobot}%</span>
                        <span className="font-mono font-black text-sky-700">{dim.skor} Poin</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-sky-600"
                        style={{ width: `${(dim.skor / 100) * 100}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 flex flex-wrap gap-1 pt-0.5">
                      {dim.tahapan.map((t, idx) => (
                        <span key={idx} className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">
                          ✓ {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Evaluasi & Survei Kewajaran 7 Level Tarif */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    Survei Kewajaran 7 Level Tarif Layanan BP Batam
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Dasar: PMK &amp; Perka Tarif</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold text-slate-500">
                      <th className="py-2 px-2.5">Level Tarif Layanan</th>
                      <th className="py-2 px-2 text-center">Jumlah Layanan</th>
                      <th className="py-2 px-2 text-right">Skor Kewajaran</th>
                      <th className="py-2 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {PHKS_TARIF_EVALUASI_DATA.map((trf) => (
                      <tr key={trf.level} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2 px-2.5 font-bold text-slate-900">{trf.level}</td>
                        <td className="py-2 px-2 text-center font-mono">{trf.totalLayanan}</td>
                        <td className="py-2 px-2 text-right font-mono font-bold text-slate-800">
                          {trf.kewajaranSurvei}%
                        </td>
                        <td className="py-2 px-2 text-center">
                          <span
                            className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded border ${
                              trf.status === 'Valid'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            {trf.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                <span>Rata-rata Skor Kewajaran Tarif:</span>
                <span className="font-mono font-bold text-emerald-700">89.5% (Tingkat Penerimaan Tinggi)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 5: PERENCANAAN PEMBANGUNAN & MASTERPLAN (PUSREN) */}
      {/* =================================================================== */}
      {activeTab === 'perencanaan_pusren' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: 5 Masterplan Utama BP Batam Progress */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    Progres 5 Masterplan Strategis Pembangunan
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-mono font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                    Data P3S No. 6 (Satu Data)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Avg 91.9%
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                {PUSREN_MASTERPLAN_PROGRESS.map((mp) => (
                  <div key={mp.kode} className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{mp.nama}</span>
                        <span className="text-[10px] text-slate-500 block">{mp.kategori}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-black text-teal-700 block">
                          {mp.progresPersen}%
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Rp {(mp.anggaran / 1e9).toFixed(2)} M
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-teal-500 to-sky-600"
                        style={{ width: `${mp.progresPersen}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Evaluasi Capaian Renstra & Rencana Kerja BP Batam (Data P3S No. 3, 4, 17) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    Capaian Sasaran Renstra &amp; Target RO
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Data P3S No. 3 &amp; 17
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    <span>Indeks Capaian Program Strategis</span>
                    <span className="font-mono text-emerald-400 font-black text-xs">96.10% (On-Target)</span>
                  </div>
                  <div className="text-xl font-black font-mono text-white">
                    28 dari 29 Rincian Output Selesai
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Berdasarkan Rekapitulasi Rencana Strategis (Dataset No. 3) &amp; Pemantauan Capaian (Dataset No. 17), pelaksanaan program strategis BP Batam mencapai tingkat ketercapaian 96.10%.
                  </p>
                </div>

                {/* 4 Pilar Sasaran Program Renstra */}
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-800">1. Konektivitas &amp; Logistik Terpadu</span>
                      <span className="font-mono font-bold text-emerald-700">96.5%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: '96.5%' }} />
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-800">2. Iklim Investasi &amp; KEK Digital</span>
                      <span className="font-mono font-bold text-emerald-700">98.2%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: '98.2%' }} />
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-800">3. Penataan Ruang &amp; Utilitas Kawasan</span>
                      <span className="font-mono font-bold text-sky-700">94.8%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-600 h-full rounded-full" style={{ width: '94.8%' }} />
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-800">4. Tata Kelola &amp; Pemanfaatan FS</span>
                      <span className="font-mono font-bold text-sky-700">95.0%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-600 h-full rounded-full" style={{ width: '95.0%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Pemanfaatan Dokumen FS: 100%</span>
                <span className="text-emerald-700 font-bold">Data P3S No. 1 &amp; 4</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
