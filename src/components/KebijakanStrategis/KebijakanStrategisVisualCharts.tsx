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
  ChevronDown,
  Sliders,
  SlidersHorizontal,
  Sparkles,
  FileText,
  ExternalLink,
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
  SURVEI_KEWAJARAN_PILARS,
} from './kebijakanStrategisData';
import { TarifLayananPdfEntry } from './types';

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
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('ALL');
  const [selectedTarifRow, setSelectedTarifRow] = useState<TarifLayananPdfEntry | null>(null);
  const [tarifPage, setTarifPage] = useState<number>(1);
  const [tarifRowsPerPage, setTarifRowsPerPage] = useState<number>(10);

  // State for IKK Per-Point Calculation Simulator
  const [showIkkSimulator, setShowIkkSimulator] = useState(false);
  const [expandedIkkDimensi, setExpandedIkkDimensi] = useState<string | null>('Agenda Setting Kebijakan');
  const [simScores, setSimScores] = useState({
    agenda: 74.0,
    formulasi: 73.0,
    implementasi: 71.2,
    evaluasi: 69.2,
  });

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
                Pilih perspektif visualisasi untuk menganalisis detail data dari 3 unit kerja pelaksana (PTSP, PDSI, PHKS)
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
                        {ikp.code}
                      </span>
                      <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-mono">
                        {ikp.capaianPersen}%
                      </span>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{ikp.title}</h5>
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
                  <span className="text-[9.5px] font-mono font-extrabold text-purple-900 bg-purple-100 px-2 py-0.5 rounded border border-purple-300 mt-1 inline-block">
                    SUMBER: PTSP No. 16 &amp; 17 (Hal. 27-28)
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
              <div className="p-2.5 rounded-lg bg-purple-50/80 border border-purple-200 text-[10px] text-purple-950 font-mono space-y-1.5">
                <div className="font-bold text-purple-900 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Keterangan Sumber Data (Buku Satu Data):</span>
                </div>
                <div className="text-[9.5px] leading-relaxed text-slate-700 bg-white p-2 rounded border border-purple-100 space-y-1">
                  <div>
                    &bull; <strong className="text-purple-900">PTSP Data No. 16 (Hal. 27-28)</strong>: Tabel <em>&quot;Jumlah Layanan Non Perizinan&quot;</em> &rarr; Atribut: <code>Status Masuk</code>, <code>Status Tolak</code>, <code>Status Proses</code>, <code>Status Selesai</code>
                  </div>
                  <div>
                    &bull; <strong className="text-purple-900">PTSP Data No. 17 (Hal. 28)</strong>: Tabel <em>&quot;Penyelesaian Perizinan Tepat Waktu (SLA)&quot;</em> &rarr; Atribut: <code>Status Masuk/Proses/Selesai &amp; SLA</code>
                  </div>
                  <div>
                    &bull; <strong className="text-purple-900">PTSP Data No. 9 (Hal. 25)</strong>: Tabel <em>&quot;Permohonan Perizinan Berusaha OSS&quot;</em> &rarr; Atribut: <code>Status Izin</code>
                  </div>
                  <div className="pt-1 text-[9px] text-purple-700 font-bold border-t border-slate-100">
                    &bull; Cara Cari: Buka PDF Satu Data BP Batam, ketik/buka Hal. 27-28 pada tabel No. 16 dan No. 17.
                  </div>
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
                  <span className="text-[9.5px] font-mono font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 mt-1 inline-block">
                    SUMBER: BUKU SATU DATA PDSI HAL. 40 - 42 (DATA NO. 2, 8, 12, 14)
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
                  <div className="text-[9px] font-mono font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">
                    Sumber: PDSI Data No. 8 (Hal. 41) &bull; Data Rak Server
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
                  <div className="text-[9px] font-mono font-bold text-teal-900 bg-teal-100 px-2 py-0.5 rounded border border-teal-200">
                    Sumber: PDSI Data No. 2 (Hal. 40) &bull; Jaringan Fiber Optic
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
                  <div className="text-[9px] font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                    Sumber: PDSI Data No. 12 (Hal. 42) &bull; Data Serangan Siber
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
                  <div className="text-[9px] font-mono font-bold text-sky-900 bg-sky-100 px-2 py-0.5 rounded border border-sky-200">
                    Sumber: PDSI Data No. 14 (Hal. 42) &bull; Aplikasi &amp; TTE
                  </div>
                </div>
              </div>

              {/* Bottom Citation Summary Box */}
              <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200 text-[10.5px] text-slate-700 font-mono space-y-1.5">
                <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Panduan Penelusuran Sumber Data Buku Satu Data PDSI:</span>
                </span>
                <div className="bg-white p-2.5 rounded-lg border border-indigo-100 space-y-1.5 text-[10px] text-slate-600">
                  <div>&bull; <strong className="text-indigo-900">Hal. 41 Data No. 8</strong>: Tabel <em>&quot;Data Rak Data Center&quot;</em> &rarr; Atribut: <code>Total Rak</code>, <code>Terisi</code>, <code>Kosong</code>, <code>Jenis Rak</code>, <code>Ruangan</code></div>
                  <div>&bull; <strong className="text-indigo-900">Hal. 40 Data No. 2</strong>: Tabel <em>&quot;Data Jaringan Fiber Optic BP Batam&quot;</em> &rarr; Atribut: <code>Jalur</code>, <code>JLN</code>, <code>Panjang</code>, <code>JmlhCore</code>, <code>BrandFO</code></div>
                  <div>&bull; <strong className="text-indigo-900">Hal. 42 Data No. 12</strong>: Tabel <em>&quot;Data Serangan Keamanan IT / SOC&quot;</em> &rarr; Atribut: <code>Threat Activity</code>, <code>Status Keamanan</code>, <code>Jumlah Serangan</code></div>
                  <div>&bull; <strong className="text-indigo-900">Hal. 42 Data No. 14</strong>: Tabel <em>&quot;Data Aplikasi BP Batam&quot;</em> &rarr; Atribut: <code>Nama Aplikasi</code>, <code>Basis Web/Mobile</code>, <code>Tipe Lisensi</code>, <code>Integrasi TTE</code></div>
                  <div className="pt-1.5 text-[9.5px] text-indigo-800 font-bold border-t border-slate-100">
                    &bull; Cara Cari: Buka PDF Buku Satu Data BP Batam, ketik/buka Halaman 40, 41, dan 42 untuk mengakses tabel-tabel di atas.
                  </div>
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
        <div className="space-y-6">
          {/* =================================================================== */}
          {/* BAGIAN 1: FORMULA PERHITUNGAN INDEKS KUALITAS KEBIJAKAN (IKK) PER POINT */}
          {/* =================================================================== */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5">
            {/* Header with Title and LAN RI Standard */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200">
                    <Award className="w-4 h-4 text-sky-600" />
                  </span>
                  <h3 className="text-sm sm:text-base font-black uppercase text-slate-900 tracking-tight">
                    Formula &amp; Perhitungan Indeks Kualitas Kebijakan (IKK) Per Point
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  Berdasarkan <strong>Peraturan LAN RI No. 6 Tahun 2020</strong> &bull; Sumber Data: PHKS Dataset No. 1 (Hal. 12 Buku Satu Data)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Target: 65.00 Poin | Realisasi: 71.80 Poin (110.46% - Kategori B: Baik)
                </span>
                <button
                  type="button"
                  onClick={() => setShowIkkSimulator(!showIkkSimulator)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    showIkkSimulator
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{showIkkSimulator ? 'Tutup Simulator' : 'Uji Simulator IKK'}</span>
                </button>
              </div>
            </div>

            {/* Formula Banner Explanation */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#002B49] via-[#0F3B60] to-[#1E4D7A] text-white space-y-2 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <Calculator className="w-4 h-4 text-amber-300" />
                  <span className="font-extrabold text-amber-300">RUMUS MATEMATIS INDEKS KUALITAS KEBIJAKAN (IKK):</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-200">Skala Penilaian: 0 - 100 Poin</span>
              </div>

              <div className="font-mono text-xs sm:text-sm font-black text-white/95 leading-relaxed overflow-x-auto py-1">
                IKK = (Skor Dimensi 1 &times; 20%) + (Skor Dimensi 2 &times; 30%) + (Skor Dimensi 3 &times; 25%) + (Skor Dimensi 4 &times; 25%)
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs text-sky-200">
                <span>Perhitungan Realisasi:</span>
                <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                  (74.00 &times; 0.20) + (73.00 &times; 0.30) + (71.20 &times; 0.25) + (69.20 &times; 0.25)
                </span>
                <span>=</span>
                <span className="font-black text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded border border-amber-400/40 text-sm">
                  14.80 + 21.90 + 17.80 + 17.30 = 71.80 Poin
                </span>
              </div>
            </div>

            {/* Step-by-Step Point Calculation Walkthrough as requested */}
            <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-sky-950 font-mono text-[11.5px]">
                <Calculator className="w-4 h-4 text-sky-700" />
                <span>PANDUAN PERHITUNGAN INDEKS POIN (CONTOH: AGENDA SETTING KEBIJAKAN BOBOT 20%):</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px] pt-1">
                <div className="p-2.5 rounded-lg bg-white border border-sky-100 space-y-1">
                  <span className="font-extrabold text-sky-900 block font-mono text-[11px]">
                    1. Skor Mentah Sub-Indikator
                  </span>
                  <p className="text-slate-600 leading-snug">
                    Tiga sub-indikator dinilai dengan instrumen LAN RI (0 - 100):<br />
                    &bull; Sub 1.1: 76.0 &times; 35% = 26.60<br />
                    &bull; Sub 1.2: 72.0 &times; 35% = 25.20<br />
                    &bull; Sub 1.3: 74.0 &times; 30% = 22.20<br />
                    <strong className="text-slate-900">Total Skor Mentah Dimensi 1 = 74.00</strong>
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-sky-100 space-y-1">
                  <span className="font-extrabold text-sky-900 block font-mono text-[11px]">
                    2. Perkalian Bobot Dimensi (20%)
                  </span>
                  <p className="text-slate-600 leading-snug">
                    Skor mentah dikalikan bobot regulasi LAN RI (20% atau 0.20):<br />
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200 block my-1">
                      74.00 &times; 20% = 14.80 Poin Indeks
                    </span>
                    Dimensi 1 berkontribusi <strong>14.80 Poin</strong> ke nilai akhir IKK.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-sky-100 space-y-1">
                  <span className="font-extrabold text-sky-900 block font-mono text-[11px]">
                    3. Agregasi 4 Dimensi Jadi Total IKK
                  </span>
                  <p className="text-slate-600 leading-snug">
                    Poin terbobot dari 4 dimensi dijumlahkan:<br />
                    &bull; D1 Agenda Setting (20%): <strong>14.80 Poin</strong><br />
                    &bull; D2 Formulasi (30%): <strong>21.90 Poin</strong><br />
                    &bull; D3 Implementasi (25%): <strong>17.80 Poin</strong><br />
                    &bull; D4 Evaluasi (25%): <strong>17.30 Poin</strong><br />
                    <span className="font-mono font-black text-sky-900">
                      Total IKK = 71.80 Poin (Predikat B: Baik)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Simulator (if active) */}
            {showIkkSimulator && (
              <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-3 font-sans">
                <div className="flex items-center justify-between border-b border-sky-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-sky-700" />
                    <h4 className="text-xs font-black uppercase text-sky-950">
                      Simulator Perhitungan Nilai IKK Interaktif
                    </h4>
                  </div>
                  <button
                    onClick={() =>
                      setSimScores({
                        agenda: 74.0,
                        formulasi: 73.0,
                        implementasi: 71.2,
                        evaluasi: 69.2,
                      })
                    }
                    className="text-[10.5px] font-bold text-sky-700 hover:text-sky-900 underline"
                  >
                    Reset Nilai Aktual
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  {/* Slider 1: Agenda Setting */}
                  <div className="p-2.5 rounded-lg bg-white border border-sky-100 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-800">1. Agenda Setting (20%)</span>
                      <span className="font-mono font-black text-sky-700">{simScores.agenda.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      step="0.5"
                      value={simScores.agenda}
                      onChange={(e) => setSimScores({ ...simScores, agenda: parseFloat(e.target.value) })}
                      className="w-full accent-sky-600 cursor-pointer"
                    />
                    <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                      <span>Poin Hasil:</span>
                      <span className="font-bold text-sky-800">{(simScores.agenda * 0.2).toFixed(2)} Poin</span>
                    </div>
                  </div>

                  {/* Slider 2: Formulasi */}
                  <div className="p-2.5 rounded-lg bg-white border border-sky-100 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-800">2. Formulasi (30%)</span>
                      <span className="font-mono font-black text-sky-700">{simScores.formulasi.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      step="0.5"
                      value={simScores.formulasi}
                      onChange={(e) => setSimScores({ ...simScores, formulasi: parseFloat(e.target.value) })}
                      className="w-full accent-sky-600 cursor-pointer"
                    />
                    <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                      <span>Poin Hasil:</span>
                      <span className="font-bold text-sky-800">{(simScores.formulasi * 0.3).toFixed(2)} Poin</span>
                    </div>
                  </div>

                  {/* Slider 3: Implementasi */}
                  <div className="p-2.5 rounded-lg bg-white border border-sky-100 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-800">3. Implementasi (25%)</span>
                      <span className="font-mono font-black text-sky-700">{simScores.implementasi.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      step="0.5"
                      value={simScores.implementasi}
                      onChange={(e) => setSimScores({ ...simScores, implementasi: parseFloat(e.target.value) })}
                      className="w-full accent-sky-600 cursor-pointer"
                    />
                    <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                      <span>Poin Hasil:</span>
                      <span className="font-bold text-sky-800">{(simScores.implementasi * 0.25).toFixed(2)} Poin</span>
                    </div>
                  </div>

                  {/* Slider 4: Evaluasi */}
                  <div className="p-2.5 rounded-lg bg-white border border-sky-100 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-800">4. Evaluasi (25%)</span>
                      <span className="font-mono font-black text-sky-700">{simScores.evaluasi.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      step="0.5"
                      value={simScores.evaluasi}
                      onChange={(e) => setSimScores({ ...simScores, evaluasi: parseFloat(e.target.value) })}
                      className="w-full accent-sky-600 cursor-pointer"
                    />
                    <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                      <span>Poin Hasil:</span>
                      <span className="font-bold text-sky-800">{(simScores.evaluasi * 0.25).toFixed(2)} Poin</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Result Summary */}
                <div className="p-3 rounded-lg bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <div>
                    <span className="text-slate-400">Total IKK Hasil Simulasi: </span>
                    <span className="font-extrabold text-amber-300">
                      {(
                        simScores.agenda * 0.2 +
                        simScores.formulasi * 0.3 +
                        simScores.implementasi * 0.25 +
                        simScores.evaluasi * 0.25
                      ).toFixed(2)}{' '}
                      Poin
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400">
                    Kategori Predikat:{' '}
                    {(simScores.agenda * 0.2 +
                      simScores.formulasi * 0.3 +
                      simScores.implementasi * 0.25 +
                      simScores.evaluasi * 0.25) >= 75
                      ? 'A (Sangat Baik)'
                      : (simScores.agenda * 0.2 +
                          simScores.formulasi * 0.3 +
                          simScores.implementasi * 0.25 +
                          simScores.evaluasi * 0.25) >= 65
                      ? 'B (Baik / Terpenuhi Target)'
                      : 'C (Cukup / Di Bawah Target)'}
                  </div>
                </div>
              </div>
            )}

            {/* 4 Dimension Detail Cards Grid (Showing Formula Breakdown Per Point) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {IKK_DIMENSI_DATA.map((dim, idx) => {
                const isExpanded = expandedIkkDimensi === dim.dimensi;

                return (
                  <div
                    key={dim.dimensi}
                    className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:border-sky-300 transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      {/* Top Header of Card */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-mono font-bold text-xs flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <div>
                            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                              {dim.dimensi}
                            </h4>
                            <span className="text-[10px] text-slate-500 font-mono">
                              Bobot Regulasi LAN RI: <strong>{dim.bobot}%</strong> (Faktor: {dim.bobot / 100})
                            </span>
                          </div>
                        </div>

                        <span className="font-mono text-xs font-black text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 shrink-0">
                          {dim.poinTerbobot?.toFixed(2)} Poin
                        </span>
                      </div>

                      {/* Formula Box Callout */}
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-mono space-y-1">
                        <div className="text-[10.5px] text-slate-500 font-bold uppercase">
                          Cara Perhitungan Poin Dimensi:
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-700">
                            Skor Mentah ({dim.skor.toFixed(2)}) &times; Bobot ({dim.bobot}%)
                          </span>
                          <span className="font-extrabold text-emerald-700 text-sm">
                            = {dim.poinTerbobot?.toFixed(2)} Poin
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                          <div
                            className="h-full rounded-full bg-sky-600"
                            style={{ width: `${dim.skor}%` }}
                          />
                        </div>
                      </div>

                      {/* Sub-Indicators Table / Breakdown */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10.5px] font-bold text-slate-700 uppercase font-mono">
                            Rincian Sub-Indikator Penentu Skor:
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedIkkDimensi(isExpanded ? null : dim.dimensi)
                            }
                            className="text-[10.5px] font-bold text-sky-700 hover:text-sky-900 flex items-center gap-0.5"
                          >
                            <span>{isExpanded ? 'Sembunyikan' : 'Lihat Rubrik'}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* List of 3 Sub-Indicators */}
                        <div className="space-y-1">
                          {dim.subIndikator?.map((sub) => (
                            <div
                              key={sub.nomor}
                              className="p-2 rounded-lg bg-white border border-slate-100 text-[11px] space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-slate-800">
                                  {sub.nomor} {sub.nama}
                                </span>
                                <span className="font-mono font-bold text-slate-700 shrink-0 ml-2">
                                  {sub.skor} &times; {sub.bobotSub}% ={' '}
                                  <strong className="text-sky-800">{sub.poinSub.toFixed(2)}</strong>
                                </span>
                              </div>
                              {isExpanded && (
                                <p className="text-[9.5px] text-slate-500 leading-tight">
                                  {sub.keterangan}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <span>Capaian Target (65.0):</span>
                      <span className="font-bold text-emerald-700">{dim.capaian}% (Melampaui Target)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =================================================================== */}
          {/* BAGIAN 2: SURVEI KEWAJARAN 7 LEVEL TARIF LAYANAN BP BATAM (NEW PDF) */}
          {/* =================================================================== */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5 font-sans">
            {/* Header with Title and PDF Citation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                    <Scale className="w-4 h-4 text-amber-600" />
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-black uppercase text-slate-900 tracking-tight">
                      Survei Kewajaran 7 Level Tarif Layanan BP Batam
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Sumber Data: PDF <strong>data-tarif-layanan-new</strong> &bull; Buku Satu Data PHKS Hal. 13 (Dataset No. 3 &amp; 5)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Rata-rata Penerimaan Kewajaran: 89.5% (Wajar)
                </span>
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  Total Terverifikasi: 7.395 Entri
                </span>
              </div>
            </div>

            {/* 4 Core Summary Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">
                  Total Entri Tarif
                </span>
                <span className="text-2xl font-black text-slate-900">7.395</span>
                <span className="text-[10px] text-slate-500 block font-sans">
                  Tersebar di 5 Badan Usaha
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">
                  Struktur Hierarki
                </span>
                <span className="text-2xl font-black text-indigo-700">7 Tingkat</span>
                <span className="text-[10px] text-slate-500 block font-sans">
                  Level 1 s.d. Level 7 Klasifikasi
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">
                  Hasil Uji Kewajaran
                </span>
                <span className="text-2xl font-black text-emerald-700">89.5%</span>
                <span className="text-[10px] text-emerald-700 font-bold block font-sans">
                  Kategori Wajar &amp; Diterima Publik
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">
                  Rekomendasi Harmonisasi
                </span>
                <span className="text-2xl font-black text-amber-700">95.8%</span>
                <span className="text-[10px] text-slate-600 block font-sans">
                  Pertahankan Tarif (4.2% Revisi)
                </span>
              </div>
            </div>

            {/* Visual 1: Level 1 to Level 7 Hierarchical Funnel Progress Cards */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase font-mono flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  <span>Jangkauan Kedalaman Struktur 7 Level Tarif (Klik untuk Filter):</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Filter Aktif: <strong>{selectedLevelFilter === 'ALL' ? 'Semua Tingkat' : selectedLevelFilter}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 font-mono">
                {TARIF_LEVEL_DEPTH_STAT.map((lvl) => {
                  const isSelected = selectedLevelFilter === lvl.level;

                  return (
                    <button
                      key={lvl.level}
                      type="button"
                      onClick={() =>
                        setSelectedLevelFilter(isSelected ? 'ALL' : lvl.level)
                      }
                      className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-200 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-slate-900">{lvl.level}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                          {lvl.depth}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1">
                        <div
                          className="h-full rounded-full bg-sky-600"
                          style={{ width: `${lvl.depth}%` }}
                        />
                      </div>
                      <span className="text-[9.5px] font-bold text-slate-700 block truncate font-sans">
                        {lvl.nama}
                      </span>
                      <span className="text-[9px] text-slate-500 block">
                        {lvl.jangkauan}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual 2 & 3: Two-Column Distribution & Survey Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left (7 cols): Portofolio Entri 5 Badan Usaha with Visual Recharts BarChart */}
              <div className="lg:col-span-7 p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-tight text-slate-900 font-mono flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-sky-700" />
                    <span>Distribusi 7.395 Entri Menurut Unit Penyedia Layanan:</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">PDF data-tarif-layanan-new</span>
                </div>

                {/* Compact Recharts Bar Chart Comparing 5 Units */}
                <div className="h-44 w-full bg-white p-2 rounded-lg border border-slate-200/80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={TARIF_UNIT_DISTRIBUSI.map((u) => ({
                        name: u.badge,
                        entri: u.entri,
                        skor: u.skorKewajaran,
                        color: u.color,
                        fullName: u.unit,
                        maxLevel: u.maxLevel,
                      }))}
                      margin={{ top: 8, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="name" tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }} />
                      <YAxis domain={[0, 5000]} tick={{ fill: '#64748B', fontSize: 10 }} />
                      <Tooltip
                        formatter={(val: any) => [`${val.toLocaleString()} Entri`, 'Total Entri Tarif']}
                        labelFormatter={(label) => {
                          const it = TARIF_UNIT_DISTRIBUSI.find((x) => x.badge === label);
                          return it ? `${it.unit} (${it.maxLevel})` : label;
                        }}
                      />
                      <Bar dataKey="entri" name="Total Entri Tarif" radius={[4, 4, 0, 0]}>
                        {TARIF_UNIT_DISTRIBUSI.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Interactive Unit Click Cards */}
                <div className="space-y-2">
                  {TARIF_UNIT_DISTRIBUSI.map((u) => (
                    <div
                      key={u.unit}
                      onClick={() => {
                        setSelectedTarifUnit(
                          selectedTarifUnit === u.unit ? 'Semua' : u.unit
                        );
                        setTarifPage(1);
                      }}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                        selectedTarifUnit === u.unit
                          ? 'bg-white border-sky-400 shadow-xs ring-1 ring-sky-300'
                          : 'bg-white hover:bg-slate-100/80 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: u.color }}
                          />
                          <span className="font-extrabold text-slate-900 text-xs">
                            {u.unit}
                          </span>
                          <span className="text-[9.5px] font-mono text-slate-400">
                            ({u.badge} &bull; {u.maxLevel})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className="text-slate-600">
                            {u.entri.toLocaleString()} entri ({u.persen}%)
                          </span>
                          <span className="font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                            {u.skorKewajaran}% Wajar
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${u.persen}%`, backgroundColor: u.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right (5 cols): 4 Pilar Uji Kewajaran Tarif */}
              <div className="lg:col-span-5 p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3 flex flex-col justify-between">
                <div className="space-y-1 pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-tight text-slate-900 font-mono block">
                    4 Pilar Survei Kewajaran Tarif:
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Hasil Uji Empiris &amp; Konsultasi Pelaku Usaha Kawasan (Buku Satu Data PHKS Hal. 13)
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  {SURVEI_KEWAJARAN_PILARS.map((p) => (
                    <div key={p.pilar} className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block font-sans text-xs">
                          {p.pilar}
                        </span>
                        <p className="text-[10px] text-slate-500 font-sans leading-tight">
                          {p.keterangan}
                        </p>
                      </div>
                      <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0 text-xs">
                        {p.skor}%
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[10.5px] text-emerald-950 font-mono space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kesimpulan Hasil Evaluasi Harmonisasi Tarif:</span>
                  </div>
                  <p className="text-[10px] text-emerald-800 leading-relaxed font-sans">
                    Rata-rata penerimaan kewajaran adalah <strong>89.5%</strong>. Sebanyak <strong>95.8%</strong> kelompok tarif direkomendasikan <strong>tetap dipertahankan</strong> sesuai PMK tanpa menimbulkan distorsi iklim investasi di KPBPB Batam.
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Breadcrumb Drilldown (if row selected) */}
            {selectedTarifRow && (
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-300 text-xs space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-sky-200 pb-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-sky-950 font-mono text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>Hierarki 7 Level Tarif &bull; ID #{selectedTarifRow.id} &bull; Unit: {selectedTarifRow.unit}</span>
                  </div>
                  <button
                    onClick={() => setSelectedTarifRow(null)}
                    className="text-[10px] font-bold text-sky-700 hover:text-sky-900 underline"
                  >
                    Tutup Rincian
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-white text-slate-800 font-bold border border-sky-200">
                    {selectedTarifRow.unit}
                  </span>
                  <span className="text-sky-400">&rarr;</span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-sky-900 font-bold border border-sky-200">
                    L1 [{selectedTarifRow.l1}]
                  </span>
                  <span className="text-sky-400">&rarr;</span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-sky-900 font-bold border border-sky-200">
                    L2 [{selectedTarifRow.l2}]
                  </span>
                  <span className="text-sky-400">&rarr;</span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-sky-900 font-bold border border-sky-200">
                    L3 [{selectedTarifRow.l3}]
                  </span>
                  <span className="text-sky-400">&rarr;</span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-sky-900 font-bold border border-sky-200">
                    L4 [{selectedTarifRow.l4}]
                  </span>
                  <span className="text-sky-400">&rarr;</span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-sky-900 font-bold border border-sky-200">
                    L5 [{selectedTarifRow.l5}]
                  </span>
                  <span className="text-sky-400">&rarr;</span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-sky-900 font-bold border border-sky-200">
                    L6 [{selectedTarifRow.l6}]
                  </span>
                  <span className="text-sky-400">&rarr;</span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-sky-900 font-bold border border-sky-200">
                    L7 [{selectedTarifRow.l7}]
                  </span>
                  <span className="text-sky-400">&rarr;</span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-600 text-white font-black">
                    {selectedTarifRow.layanan}
                  </span>
                </div>
              </div>
            )}

            {/* Interactive Data Table matching user's PDF (data-tarif-layanan-new) */}
            {(() => {
              const filteredTarifRows = DATA_TARIF_LAYANAN_NEW_ENTRIES.filter((item) => {
                if (selectedTarifUnit !== 'Semua' && item.unit !== selectedTarifUnit) return false;
                if (selectedLevelFilter !== 'ALL') {
                  if (selectedLevelFilter === 'LEVEL 3' && item.l3 === 'N/A') return false;
                  if (selectedLevelFilter === 'LEVEL 4' && item.l4 === 'N/A') return false;
                  if (selectedLevelFilter === 'LEVEL 5' && item.l5 === 'N/A') return false;
                  if (selectedLevelFilter === 'LEVEL 6' && item.l6 === 'N/A') return false;
                  if (selectedLevelFilter === 'LEVEL 7' && item.l7 === 'N/A') return false;
                }
                if (
                  searchTarifKeyword &&
                  !item.layanan.toLowerCase().includes(searchTarifKeyword.toLowerCase()) &&
                  !item.unit.toLowerCase().includes(searchTarifKeyword.toLowerCase()) &&
                  !String(item.id).includes(searchTarifKeyword)
                )
                  return false;
                return true;
              });

              const totalFilteredTarif = filteredTarifRows.length;
              const totalTarifPages = Math.ceil(totalFilteredTarif / tarifRowsPerPage) || 1;
              const safeTarifPage = Math.min(tarifPage, totalTarifPages);
              const paginatedTarifRows = filteredTarifRows.slice(
                (safeTarifPage - 1) * tarifRowsPerPage,
                safeTarifPage * tarifRowsPerPage
              );

              return (
                <div className="space-y-3 font-sans">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                        data-tarif-layanan-new &mdash; Daftar Tarif Layanan BP Batam Berdasarkan Unit Penyedia Layanan
                      </h4>
                      <p className="text-[10.5px] text-slate-500 font-mono mt-0.5">
                        Menampilkan {totalFilteredTarif > 0 ? (safeTarifPage - 1) * tarifRowsPerPage + 1 : 0} sampai{' '}
                        {Math.min(safeTarifPage * tarifRowsPerPage, totalFilteredTarif)} dari {totalFilteredTarif} entri tersaring &bull; Total 7&apos;395 entri PDF
                      </p>
                    </div>

                    {/* Search & Filter Controls */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Cari layanan, ID, unit..."
                          value={searchTarifKeyword}
                          onChange={(e) => {
                            setSearchTarifKeyword(e.target.value);
                            setTarifPage(1);
                          }}
                          className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 w-56 sm:w-64 font-sans"
                        />
                      </div>
                      {searchTarifKeyword && (
                        <button
                          onClick={() => {
                            setSearchTarifKeyword('');
                            setTarifPage(1);
                          }}
                          className="text-[10px] text-slate-500 hover:text-slate-700 underline font-mono"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Unit Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                    <span className="text-[10.5px] font-bold text-slate-400 font-mono uppercase mr-1">
                      Filter Unit:
                    </span>
                    {[
                      { label: 'Semua Unit (7.395)', value: 'Semua' },
                      { label: 'BU Rumah Sakit (4.862)', value: 'Badan Usaha Rumah Sakit' },
                      { label: 'BU Pelabuhan (1.240)', value: 'Badan Usaha Pelabuhan' },
                      { label: 'BU Bandar Udara (685)', value: 'Badan Usaha Bandar Udara' },
                      { label: 'BU Fasilitas & Lingkungan (468)', value: 'Badan Usaha Fasilitas dan Lingkungan' },
                      { label: 'Kuningan Guest House (140)', value: 'Kuningan Guest House' },
                    ].map((btn) => (
                      <button
                        key={btn.value}
                        onClick={() => {
                          setSelectedTarifUnit(btn.value);
                          setTarifPage(1);
                        }}
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
                  <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-100/90 text-[10px] uppercase font-bold text-slate-700 font-mono">
                          <th className="py-2.5 px-3">_id</th>
                          <th className="py-2.5 px-3">UNIT</th>
                          <th className="py-2.5 px-2 text-center bg-slate-200/50">LEVEL1</th>
                          <th className="py-2.5 px-2 text-center bg-slate-200/50">LEVEL2</th>
                          <th className="py-2.5 px-2 text-center bg-slate-200/50">LEVEL3</th>
                          <th className="py-2.5 px-2 text-center bg-slate-200/50">LEVEL4</th>
                          <th className="py-2.5 px-2 text-center bg-slate-200/50">LEVEL5</th>
                          <th className="py-2.5 px-2 text-center bg-slate-200/50">LEVEL6</th>
                          <th className="py-2.5 px-2 text-center bg-slate-200/50">LEVEL7</th>
                          <th className="py-2.5 px-3">LAYANAN</th>
                          <th className="py-2.5 px-2.5 text-right">KEWAJARAN</th>
                          <th className="py-2.5 px-2.5 text-center">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-[11px]">
                        {paginatedTarifRows.map((row) => (
                          <tr
                            key={row.id}
                            onClick={() => setSelectedTarifRow(row)}
                            className={`hover:bg-sky-50/70 transition-colors cursor-pointer ${
                              selectedTarifRow?.id === row.id ? 'bg-sky-50 font-bold' : ''
                            }`}
                          >
                            <td className="py-2 px-3 font-bold text-sky-800">{row.id}</td>
                            <td className="py-2 px-3 font-sans font-medium text-slate-900 whitespace-nowrap">
                              {row.unit}
                            </td>
                            <td className="py-2 px-2 text-center font-bold text-slate-800 bg-slate-50/50">{row.l1}</td>
                            <td className="py-2 px-2 text-center font-bold text-slate-800 bg-slate-50/50">{row.l2}</td>
                            <td className="py-2 px-2 text-center text-slate-700 bg-slate-50/50">{row.l3}</td>
                            <td className="py-2 px-2 text-center text-slate-700 bg-slate-50/50">{row.l4}</td>
                            <td className="py-2 px-2 text-center text-slate-700 bg-slate-50/50">{row.l5}</td>
                            <td className="py-2 px-2 text-center text-slate-500 bg-slate-50/50">{row.l6}</td>
                            <td className="py-2 px-2 text-center text-slate-500 bg-slate-50/50">{row.l7}</td>
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

                  {/* Pagination Controls & Table Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-600 font-mono pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500">Tampilkan per halaman:</span>
                      <select
                        value={tarifRowsPerPage}
                        onChange={(e) => {
                          setTarifRowsPerPage(Number(e.target.value));
                          setTarifPage(1);
                        }}
                        className="p-1 rounded bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden"
                      >
                        <option value={10}>10 Baris</option>
                        <option value={20}>20 Baris</option>
                        <option value={30}>30 Baris</option>
                      </select>
                      <span className="text-[10.5px] text-slate-400">
                        (Halaman {safeTarifPage} dari {totalTarifPages})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setTarifPage((p) => Math.max(1, p - 1))}
                        disabled={safeTarifPage <= 1}
                        className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 font-bold transition-all text-[11px]"
                      >
                        &larr; Sebelumnya
                      </button>

                      {Array.from({ length: totalTarifPages }, (_, i) => i + 1).map((pg) => (
                        <button
                          key={pg}
                          onClick={() => setTarifPage(pg)}
                          className={`w-7 h-7 rounded font-bold text-xs transition-all ${
                            safeTarifPage === pg
                              ? 'bg-sky-700 text-white'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {pg}
                        </button>
                      ))}

                      <button
                        onClick={() => setTarifPage((p) => Math.min(totalTarifPages, p + 1))}
                        disabled={safeTarifPage >= totalTarifPages}
                        className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 font-bold transition-all text-[11px]"
                      >
                        Selanjutnya &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Footnote on PMK */}
                  <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100 flex flex-wrap items-center justify-between">
                    <span>Format data sesuai struktur PDF: <code>data-tarif-layanan-new</code> &bull; Sort: _id ASC</span>
                    <span className="text-sky-800 font-semibold">Dasar Hukum: PMK No. 148/PMK.05/2016 jo. PMK Tarif Layanan BLU BP Batam</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
