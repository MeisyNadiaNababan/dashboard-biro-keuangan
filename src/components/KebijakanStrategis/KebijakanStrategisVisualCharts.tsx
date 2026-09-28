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
  Search,
  Filter,
  Calculator,
  HelpCircle,
  Info,
  ListFilter,
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
  PTSP_SEKTOR_PERFORMANCES,
  PTSP_MONTHLY_TREND,
  PTSP_IKM_9_UNSUR,
  SPBE_DOMAINS_DATA,
  PDSI_INFRASTRUCTURE_DATA,
  IKK_DIMENSI_DATA,
  DATA_TARIF_LAYANAN_NEW_ENTRIES,
  TARIF_UNIT_DISTRIBUSI,
  TARIF_LEVEL_DEPTH_STAT,
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
    'ikp_anggaran' | 'perizinan_ptsp' | 'spbe_pdsi' | 'kebijakan_phks'
  >('ikp_anggaran');

  // State for Tarif Layanan 7 Level interactive table & filters
  const [selectedTarifUnit, setSelectedTarifUnit] = useState<string>('Semua');
  const [searchTarifKeyword, setSearchTarifKeyword] = useState<string>('');

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
              Radar Capaian 4 IKP
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
              IKK &amp; 7 Level Tarif (PHKS)
            </button>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: IKP RADAR & RINGKASAN CAPAIAN 4 IKP UTAMA                    */}
      {/* =================================================================== */}
      {activeTab === 'ikp_anggaran' && (
        <div className="space-y-4">
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

            {/* Right: 4 Detailed IKP Performance Cards */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    Capaian Evaluasi 4 Indikator Kinerja Program (IKP)
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Perkin A2 BP Batam</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {IKP_METRICS_LIST.map((ikp) => (
                  <div
                    key={ikp.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2 hover:border-sky-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                        {ikp.kode}
                      </span>
                      <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-mono">
                        {ikp.capaianPersen}%
                      </span>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{ikp.nama}</h5>
                      <span className="text-[10px] text-slate-500 font-mono block">Unit: {ikp.unitKerja}</span>
                    </div>

                    <div className="flex items-baseline justify-between pt-1 border-t border-slate-200/60 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Target</span>
                        <span className="font-mono font-bold text-slate-700">{ikp.target} {ikp.satuan}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Realisasi</span>
                        <span className="font-mono font-black text-sky-700 text-sm">{ikp.realisasi} {ikp.satuan}</span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-sky-600 h-full rounded-full"
                        style={{ width: `${Math.min(ikp.capaianPersen, 100)}%` }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal?.(ikp.id)}
                      className="w-full text-center text-[10px] text-sky-700 hover:text-sky-900 font-bold py-1 bg-white hover:bg-sky-50 rounded border border-sky-200 transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Calculator className="w-3 h-3 text-sky-600" />
                      <span>Lihat Panduan &amp; Formula</span>
                    </button>
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
                <span className="text-[9.5px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200" title="Buku Satu Data Hal. 28 Data No. 17">
                  Data PTSP No. 17 (Hal. 28)
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

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[10.5px] text-slate-500 font-mono">
                Sumber: <strong>PTSP Data No. 17</strong> (Hal. 28 Buku Satu Data) &bull; Atribut <code>SERVICE LEVEL AGREEMENT (SLA)</code>
              </div>
            </div>

            {/* Chart 3: Komposisi Status Permohonan (Donut) */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-1.5">
                    <PieIcon className="w-4 h-4 text-purple-600" />
                    <h4 className="text-xs font-black uppercase text-slate-900">
                      Komposisi Status
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-purple-800 bg-purple-50 px-1 py-0.2 rounded border border-purple-200 mt-0.5 inline-block">
                    Data PTSP No. 9, 16 &amp; 17
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Total 1.842</span>
              </div>

              <div className="h-40 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={STATUS_PIE_DATA}
                      innerRadius={42}
                      outerRadius={64}
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

              {/* Explicit Source Attribution Box as requested */}
              <div className="p-2 rounded-lg bg-purple-50/60 border border-purple-100 text-[10px] text-purple-950 font-mono space-y-0.5">
                <div className="font-bold text-purple-900 flex items-center gap-1">
                  <Info className="w-3 h-3 text-purple-600 shrink-0" />
                  <span>Keterangan Sumber Data:</span>
                </div>
                <div className="text-[9.5px] leading-tight text-slate-600">
                  &bull; <strong>PTSP Data No. 9 (Hal. 25)</strong>: Atribut <code>STATUS PERMOHONAN</code><br />
                  &bull; <strong>PTSP Data No. 16 (Hal. 28)</strong>: Atribut <code>STATUS MASUK/PROSES/SELESAI/TOLAK</code><br />
                  &bull; <strong>PTSP Data No. 17 (Hal. 28)</strong>: Atribut <code>PERMOHONAN STATUS SELESAI &amp; SLA</code>
                </div>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                      Tier-3 Data Center &amp; Cyber Defense (SOC)
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 mt-0.5 inline-block">
                    Sumber: Buku Satu Data PDSI Hal. 40 - 42 (Data No. 2, 8, 12, 13, 14)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0 self-start sm:self-auto">
                  Uptime 99.98%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Rak Data Center */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-bold">Okupansi Rak Server</span>
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
                  <div className="text-[9px] font-mono text-indigo-700 bg-indigo-50/70 px-1.5 py-0.5 rounded border border-indigo-100">
                    PDSI Data No. 8 (Hal. 41) &bull; TOTAL RAK &amp; RUANGAN
                  </div>
                </div>

                {/* Fiber Optic Backbone */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-bold">Jalur Fiber Optik</span>
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
                  <div className="text-[9px] font-mono text-teal-700 bg-teal-50/70 px-1.5 py-0.5 rounded border border-teal-100">
                    PDSI Data No. 2 (Hal. 40) &bull; JALUR &amp; PANJANG FO
                  </div>
                </div>

                {/* SOC Cyber Threat Mitigation */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">
                    Mitigasi Serangan Siber (SOC)
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black font-mono text-emerald-600">
                      {PDSI_INFRASTRUCTURE_DATA.cyberSecurity.threatMitigatedPersen}%
                    </span>
                    <span className="text-[10.5px] text-slate-500">Terhalau</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    {PDSI_INFRASTRUCTURE_DATA.cyberSecurity.totalThreatYtd.toLocaleString()} anomali/threat dimitigasi.
                  </p>
                  <div className="text-[9px] font-mono text-emerald-800 bg-emerald-50/70 px-1.5 py-0.5 rounded border border-emerald-100">
                    PDSI Data No. 12 (Hal. 42) &bull; THREAT ACTIVITY &amp; STATUS
                  </div>
                </div>

                {/* Status Server & Storage */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">
                    Katalog Aplikasi Resmi
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black font-mono text-indigo-700">
                      {PDSI_INFRASTRUCTURE_DATA.aplikasi.totalAplikasiAktif}
                    </span>
                    <span className="text-[10.5px] text-slate-500">Sistem</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    100% terhubung ke platform Satu Data BP Batam &amp; TTE BSrE.
                  </p>
                  <div className="text-[9px] font-mono text-sky-800 bg-sky-50/70 px-1.5 py-0.5 rounded border border-sky-100">
                    PDSI Data No. 14 (Hal. 42) &bull; APLIKASI TTE &amp; BASIS
                  </div>
                </div>
              </div>

              {/* Bottom Citation Summary Box */}
              <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100 text-[10px] text-slate-600 font-mono space-y-0.5">
                <span className="font-bold text-indigo-900 block">
                  📍 Panduan Penelusuran Sumber Data Buku Satu Data:
                </span>
                <div>&bull; <strong>Hal. 41 Data No. 8</strong>: Data Rak Data Center (Total Rak, Terisi, Kosong, Jenis Rak, Ruangan)</div>
                <div>&bull; <strong>Hal. 40 Data No. 2</strong>: Jaringan Fiber Optik (Jalur, JLN, Panjang, JmlhCore, BrandFO)</div>
                <div>&bull; <strong>Hal. 42 Data No. 12</strong>: Data Serangan Keamanan IT (Threat Activity, Status Keamanan, Jml Serangan)</div>
                <div>&bull; <strong>Hal. 42 Data No. 14</strong>: Data Aplikasi BP Batam (Nama Aplikasi, Basis, Tipe Lisensi, TTE)</div>
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
            {/* Left: 4 Dimensi IKK Progress & Formula Perhitungan */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-sky-600" />
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                      Indeks Kualitas Kebijakan (IKK: 71.80)
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9.5px] font-mono font-bold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                      Data PHKS No. 1 (Hal. 12)
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Target: 65.0
                    </span>
                  </div>
                </div>

                {/* Formula Header Callout */}
                <div className="p-2.5 my-2.5 rounded-lg bg-sky-50/80 border border-sky-200 text-xs space-y-1">
                  <div className="font-mono font-bold text-sky-950 flex items-center gap-1.5 text-[11px]">
                    <Calculator className="w-3.5 h-3.5 text-sky-600" />
                    <span>Rumus: IKK = &Sigma; (Skor Mentah &times; Bobot Dimensi)</span>
                  </div>
                  <p className="text-[10.5px] text-slate-600 leading-snug">
                    Akumulasi 4 dimensi tertimbang menghasilkan indeks point <strong>71.80</strong> (Kategori B / Cukup Baik, 110.46% dari target).
                  </p>
                </div>

                {/* 4 Dimensi Perhitungan Per Point */}
                <div className="space-y-2 pt-1">
                  {IKK_DIMENSI_DATA.map((dim) => (
                    <div key={dim.dimensi} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{dim.dimensi}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-500 font-mono">Bobot: {dim.bobot}%</span>
                          <span className="font-mono font-black text-sky-700">{dim.poinTerbobot?.toFixed(2)} Poin</span>
                        </div>
                      </div>

                      {/* Formula Detail Line */}
                      <div className="flex items-center justify-between text-[10.5px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-100">
                        <span>Perhitungan: {dim.skor.toFixed(2)} &times; {dim.bobot}%</span>
                        <span className="font-bold text-emerald-700">={dim.poinTerbobot?.toFixed(2)} Poin</span>
                      </div>

                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-sky-600"
                          style={{ width: `${(dim.skor / 100) * 100}%` }}
                        />
                      </div>
                      <div className="text-[9.5px] text-slate-500 line-clamp-1">
                        {dim.indikatorKunci}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary Footer */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-900 text-white font-mono text-xs flex items-center justify-between">
                  <span className="text-[10.5px] text-amber-400 font-bold">TOTAL IKK TERTIMBANG:</span>
                  <span className="text-sm font-black text-emerald-400">
                    14.80 + 21.90 + 17.80 + 17.30 = 71.80
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal?.('ikp-2-kebijakan')}
                  className="w-full text-center text-xs text-sky-700 hover:text-sky-900 font-bold py-1.5 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5 text-sky-600" />
                  <span>Buka Panduan Formula Lengkap IKK</span>
                </button>
              </div>
            </div>

            {/* Right: Ringkasan Distribusi & Kedalaman 7 Level Tarif */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-600" />
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                      Survei Kewajaran 7 Level Tarif Layanan BP Batam
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 mt-0.5 inline-block">
                    Sumber: PDF data-tarif-layanan-new &amp; Satu Data Hal. 13 (Data No. 3 &amp; 5)
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0 self-start sm:self-auto">
                  Avg Kewajaran: 89.5%
                </span>
              </div>

              {/* 4 Core Summary Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-[9.5px] text-slate-400 block font-sans">TOTAL ENTRI</span>
                  <span className="text-base sm:text-lg font-black text-slate-900">7.395</span>
                  <span className="text-[9px] text-slate-500 block font-sans">Tarif Layanan</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-[9.5px] text-slate-400 block font-sans">UNIT PENYEDIA</span>
                  <span className="text-base sm:text-lg font-black text-indigo-700">5 Unit</span>
                  <span className="text-[9px] text-slate-500 block font-sans">Badan Usaha</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-[9.5px] text-slate-400 block font-sans">STRUKTUR TARIF</span>
                  <span className="text-base sm:text-lg font-black text-sky-700">7 Level</span>
                  <span className="text-[9px] text-slate-500 block font-sans">Hierarki Bertingkat</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="text-[9.5px] text-slate-400 block font-sans">SURVEI KEWAJARAN</span>
                  <span className="text-base sm:text-lg font-black text-emerald-700">89.5%</span>
                  <span className="text-[9px] text-emerald-700 block font-sans font-bold">Penerimaan Tinggi</span>
                </div>
              </div>

              {/* Distribusi per Unit Penyedia Layanan */}
              <div className="space-y-2">
                <span className="text-[10.5px] font-bold text-slate-700 block uppercase font-mono">
                  Distribusi 7.395 Entri per Unit Penyedia Layanan (Buku Satu Data):
                </span>
                <div className="space-y-1.5">
                  {TARIF_UNIT_DISTRIBUSI.map((u) => (
                    <div key={u.unit} className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: u.color }} />
                          <span className="font-bold text-slate-800 text-[11px]">{u.unit}</span>
                          <span className="text-[9px] font-mono text-slate-400">({u.badge})</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-slate-500">{u.entri.toLocaleString()} entri ({u.persen}%)</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-1 rounded border border-emerald-200">
                            {u.skorKewajaran}% Wajar
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${u.persen}%`, backgroundColor: u.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kedalaman Struktur 7 Level */}
              <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/80 text-[10.5px] text-slate-700 space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-950 font-mono">
                  <span>Jangkauan Kedalaman Struktur 7 Level:</span>
                  <span>Level 1 s.d. Level 7</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] pt-0.5">
                  {TARIF_LEVEL_DEPTH_STAT.map((lvl) => (
                    <div key={lvl.level} className="bg-white p-1 rounded border border-amber-100">
                      <span className="font-bold text-amber-900 block">{lvl.level}</span>
                      <span className="text-slate-500 block">{lvl.depth}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Interactive Data Table matching user's PDF (data-tarif-layanan-new) */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-sky-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    data-tarif-layanan-new &mdash; Daftar Tarif Layanan BP Batam Berdasarkan Unit Penyedia Layanan
                  </h4>
                </div>
                <p className="text-[10.5px] text-slate-500 font-mono mt-0.5">
                  Menampilkan entri terverifikasi dari dataset 7.395 entri &bull; Data Sumber: PDF data-tarif-layanan-new &amp; Satu Data PHKS No. 3 &amp; 5
                </p>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari layanan (mis: tampon, ICU, AC)..."
                    value={searchTarifKeyword}
                    onChange={(e) => setSearchTarifKeyword(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 w-56 sm:w-64"
                  />
                </div>
                {searchTarifKeyword && (
                  <button
                    onClick={() => setSearchTarifKeyword('')}
                    className="text-[10px] text-slate-500 hover:text-slate-700 underline"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Unit Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
              <span className="text-[10.5px] font-bold text-slate-400 font-mono uppercase mr-1">Filter Unit:</span>
              {[
                { label: 'Semua Unit (7.395)', value: 'Semua' },
                { label: 'BU Rumah Sakit', value: 'Badan Usaha Rumah Sakit' },
                { label: 'BU Pelabuhan', value: 'Badan Usaha Pelabuhan' },
                { label: 'BU Bandar Udara', value: 'Badan Usaha Bandar Udara' },
                { label: 'BU Fasilitas & Lingkungan', value: 'Badan Usaha Fasilitas dan Lingkungan' },
                { label: 'Kuningan Guest House', value: 'Kuningan Guest House' },
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setSelectedTarifUnit(btn.value)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                    selectedTarifUnit === btn.value
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Data Table Exactly Matching PDF Columns */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/80 text-[10px] uppercase font-bold text-slate-600 font-mono">
                    <th className="py-2.5 px-3">_id</th>
                    <th className="py-2.5 px-3">UNIT</th>
                    <th className="py-2.5 px-2 text-center">LEVEL1</th>
                    <th className="py-2.5 px-2 text-center">LEVEL2</th>
                    <th className="py-2.5 px-2 text-center">LEVEL3</th>
                    <th className="py-2.5 px-2 text-center">LEVEL4</th>
                    <th className="py-2.5 px-2 text-center">LEVEL5</th>
                    <th className="py-2.5 px-2 text-center">LEVEL6</th>
                    <th className="py-2.5 px-2 text-center">LEVEL7</th>
                    <th className="py-2.5 px-3">LAYANAN</th>
                    <th className="py-2.5 px-2.5 text-right">SKOR</th>
                    <th className="py-2.5 px-2.5 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-[11px]">
                  {DATA_TARIF_LAYANAN_NEW_ENTRIES
                    .filter((item) => {
                      if (selectedTarifUnit !== 'Semua' && item.unit !== selectedTarifUnit) return false;
                      if (
                        searchTarifKeyword &&
                        !item.layanan.toLowerCase().includes(searchTarifKeyword.toLowerCase()) &&
                        !item.unit.toLowerCase().includes(searchTarifKeyword.toLowerCase()) &&
                        !String(item.id).includes(searchTarifKeyword)
                      )
                        return false;
                      return true;
                    })
                    .map((row) => (
                      <tr key={row.id} className="hover:bg-sky-50/40 transition-colors">
                        <td className="py-2 px-3 font-bold text-sky-800">{row.id}</td>
                        <td className="py-2 px-3 font-sans font-medium text-slate-900 whitespace-nowrap">
                          {row.unit}
                        </td>
                        <td className="py-2 px-2 text-center font-bold text-slate-700">{row.l1}</td>
                        <td className="py-2 px-2 text-center font-bold text-slate-700">{row.l2}</td>
                        <td className="py-2 px-2 text-center text-slate-600">{row.l3}</td>
                        <td className="py-2 px-2 text-center text-slate-600">{row.l4}</td>
                        <td className="py-2 px-2 text-center text-slate-600">{row.l5}</td>
                        <td className="py-2 px-2 text-center text-slate-500">{row.l6}</td>
                        <td className="py-2 px-2 text-center text-slate-500">{row.l7}</td>
                        <td className="py-2 px-3 font-sans font-semibold text-slate-900 max-w-xs truncate" title={row.layanan}>
                          {row.layanan}
                        </td>
                        <td className="py-2 px-2.5 text-right font-black text-emerald-700">
                          {row.kewajaranSurvei}%
                        </td>
                        <td className="py-2 px-2.5 text-center">
                          <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10.5px] text-slate-500 font-mono pt-1">
              <span>Menampilkan entri sampel representatif terverifikasi dari dataset 7.395 entri</span>
              <span className="text-sky-700 font-bold">Dasar Hukum: PMK Tarif Layanan BP Batam &amp; Perka Kepala BP</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
