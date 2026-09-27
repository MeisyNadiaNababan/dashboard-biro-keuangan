import React, { useState } from 'react';
import {
  TrendingUp,
  PieChart as PieIcon,
  Globe,
  Layers,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  FileCheck2,
  Users,
  Compass,
  Briefcase,
  ChevronRight,
  Filter,
  DollarSign,
  BarChart3,
  Calendar,
  ExternalLink,
  Info,
  CheckCircle2,
  Activity,
  Maximize2,
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
} from 'recharts';
import {
  SEKTOR_INVESTASI_DATA,
  NEGARA_INVESTOR_DATA,
  INVESTOR_PIPELINE_STAGES,
  INVESTOR_PIPELINE_TABLE,
  KERJASAMA_PENGUSAHAAN_DATA,
  PERKIN_A4_KPIS,
} from './investasiPengusahaanData';

interface InvestasiPengusahaanVisualChartsProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const InvestasiPengusahaanVisualCharts: React.FC<
  InvestasiPengusahaanVisualChartsProps
> = ({ onOpenFormulaModal, onNavigateToUnit }) => {
  const [activeVisualTab, setActiveVisualTab] = useState<
    'realisasi_kpbpb' | 'kek_matrix' | 'pengendalian_kerjasama' | 'investor_pipeline'
  >('realisasi_kpbpb');

  const [realisasiViewMode, setRealisasiViewMode] = useState<'sektor' | 'negara' | 'tren_kuartal'>('sektor');
  const [pipelineFilterTahap, setPipelineFilterTahap] = useState<string>('ALL');

  // Chart Data: Quarterly Target vs Realization
  const quarterlyChartData = [
    { name: 'Q1 (Jan-Mar)', target: 6.50, realisasi: 6.85, pma: 5.15, pmdn: 1.70, naker: 4520 },
    { name: 'Q2 (Apr-Jun)', target: 7.00, realisasi: 7.42, pma: 5.48, pmdn: 1.94, naker: 5120 },
    { name: 'Q3 (Jul-Sep)', target: 7.30, realisasi: 8.11, pma: 6.02, pmdn: 2.09, naker: 5850 },
    { name: 'Q4 (Okt-Des)', target: 7.70, realisasi: 9.10, pma: 6.59, pmdn: 2.51, naker: 6350 },
  ];

  // KEK Comparison Data
  const kekComparisonData = [
    { name: 'KEK Nongsa Digital', target: 4.50, realisasi: 4.89, naker: 680, proyek: 22, color: '#3B82F6' },
    { name: 'KEK Batam Aero Technic', target: 2.80, realisasi: 3.12, naker: 610, proyek: 16, color: '#10B981' },
    { name: 'KEK Kesehatan & Pariwisata', target: 1.20, realisasi: 1.08, naker: 192, proyek: 10, color: '#8B5CF6' },
  ];

  // Pipeline Filtered
  const filteredPipelineTable =
    pipelineFilterTahap === 'ALL'
      ? INVESTOR_PIPELINE_TABLE
      : INVESTOR_PIPELINE_TABLE.filter((item) => item.tahap === pipelineFilterTahap);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* 1. SECTION TOP BAR & TAB SELECTOR */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-[#002B49] text-white flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 text-cyan-300 flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 uppercase">
                EXECUTIVE ANALYTICS
              </span>
              <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                Perkin A.4 Tahun 2025
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
              Visualisasi Analitik Investasi &amp; Pengusahaan BP Batam
            </h2>
          </div>
        </div>

        {/* 4 Interactive Visual Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-700/60 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveVisualTab('realisasi_kpbpb')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeVisualTab === 'realisasi_kpbpb'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-cyan-300" />
            <span>Realisasi KPBPB</span>
          </button>

          <button
            onClick={() => setActiveVisualTab('kek_matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeVisualTab === 'kek_matrix'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Kawasan KEK (3 KEK)</span>
          </button>

          <button
            onClick={() => setActiveVisualTab('pengendalian_kerjasama')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeVisualTab === 'pengendalian_kerjasama'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
            <span>Pengendalian Pengusahaan</span>
          </button>

          <button
            onClick={() => setActiveVisualTab('investor_pipeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeVisualTab === 'investor_pipeline'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Investor Pipeline &amp; Web</span>
          </button>
        </div>
      </div>

      {/* 2. TAB BODY CONTENT */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* ============================================================== */}
        {/* TAB 1: REALISASI INVESTASI KPBPB (SEKTOR, NEGARA, DAN KUARTAL) */}
        {/* ============================================================== */}
        {activeVisualTab === 'realisasi_kpbpb' && (
          <div className="space-y-4">
            {/* View Sub-Filter Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  onClick={() => setRealisasiViewMode('sektor')}
                  className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    realisasiViewMode === 'sektor'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Distribusi 7 Sektor Unggulan
                </button>
                <button
                  onClick={() => setRealisasiViewMode('negara')}
                  className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    realisasiViewMode === 'negara'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Asal Negara Investor
                </button>
                <button
                  onClick={() => setRealisasiViewMode('tren_kuartal')}
                  className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    realisasiViewMode === 'tren_kuartal'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tren Kuartalan Q1 - Q4
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>Total Realisasi: <strong className="text-slate-900 font-black">Rp 31,48 Triliun</strong></span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-700 font-bold">110,46% Target</span>
              </div>
            </div>

            {/* View Mode 1: Sektor Unggulan */}
            {realisasiViewMode === 'sektor' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Horizontal Bar Breakdown */}
                <div className="lg:col-span-7 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <PieIcon className="w-3.5 h-3.5 text-blue-600" />
                      <span>7 SEKTOR INVESTASI UNGGULAN KPBPB BATAM (2025)</span>
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">Nilai &amp; Pangsa Pasar</span>
                  </div>

                  <div className="space-y-2.5">
                    {SEKTOR_INVESTASI_DATA.map((item) => (
                      <div key={item.sektor} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.sektor}</span>
                          </span>
                          <span className="font-mono text-slate-900 font-bold">
                            Rp {(item.total / 1000).toFixed(2)} T ({item.sharePersen.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-blue-600"
                            style={{ width: `${(item.pma / item.total) * item.sharePersen * 3.5}%` }}
                            title={`PMA: Rp ${(item.pma / 1000).toFixed(2)} T`}
                          />
                          <div
                            className="h-full bg-indigo-500"
                            style={{ width: `${(item.pmdn / item.total) * item.sharePersen * 3.5}%` }}
                            title={`PMDN: Rp ${(item.pmdn / 1000).toFixed(2)} T`}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                          <span>PMA: Rp {(item.pma / 1000).toFixed(2)} T | PMDN: Rp {(item.pmdn / 1000).toFixed(2)} T</span>
                          <span>{item.proyekCount} Proyek • {item.nakerCount.toLocaleString()} Tenaga Kerja</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 font-mono"><span className="w-2 h-2 rounded-xs bg-blue-600" /> PMA (73.8%)</span>
                      <span className="flex items-center gap-1 font-mono"><span className="w-2 h-2 rounded-xs bg-indigo-500" /> PMDN (26.2%)</span>
                    </div>
                    <span>Data: Direktorat Investasi (Dataset #13)</span>
                  </div>
                </div>

                {/* Sektor Highlights & Insight Cards */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-900 to-[#002B49] text-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 font-bold">
                        SEKTOR LEADERSHIP
                      </span>
                      <span className="text-[10px] text-slate-300 font-mono">Tahun 2025</span>
                    </div>
                    <h4 className="text-base font-black tracking-tight text-white">
                      Pusat Data Hyperscale &amp; Semikonduktor
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Sektor Digital &amp; High-Tech kini menguasai <strong>51,33%</strong> total investasi Batam, dipicu peresmian Data Center KEK Nongsa dan fasilitas manufaktur sirkuit elektronik di Batamindo dan Kabil.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-800/80 text-xs font-mono">
                      <div>
                        <div className="text-slate-400 text-[10px]">Data Center &amp; Digital:</div>
                        <div className="font-extrabold text-cyan-300">Rp 8,89 Triliun</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px]">Semikonduktor &amp; Mikro:</div>
                        <div className="font-extrabold text-cyan-300">Rp 7,27 Triliun</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="text-xs font-bold font-mono text-slate-800 uppercase">
                      Penyerapan Tenaga Kerja per Sektor
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Industri Elektronik / Semi</span>
                        <span className="font-mono font-bold text-slate-900">7.850 orang (35,9%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Galangan Maritim &amp; Offshore</span>
                        <span className="font-mono font-bold text-slate-900">5.200 orang (23,8%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Pusat Data &amp; IT Spesialis</span>
                        <span className="font-mono font-bold text-slate-900">2.450 orang (11,2%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Energi Terbarukan Solar PV</span>
                        <span className="font-mono font-bold text-slate-900">1.980 orang (9,1%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View Mode 2: Negara Investor */}
            {realisasiViewMode === 'negara' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      <span>PERINGKAT ASAL NEGARA INVESTOR DI KPBPB BATAM</span>
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">PMA &amp; PMDN Domestik</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-left text-[11px] font-mono text-slate-500">
                          <th className="pb-2 font-bold">Negara / Asal Modal</th>
                          <th className="pb-2 font-bold text-right">Nilai Realisasi</th>
                          <th className="pb-2 font-bold text-right">Pangsa (%)</th>
                          <th className="pb-2 font-bold text-center">Jumlah Proyek</th>
                          <th className="pb-2 font-bold">Sektor Utama</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {NEGARA_INVESTOR_DATA.map((item, idx) => (
                          <tr key={item.negara} className="hover:bg-white/80 transition-colors">
                            <td className="py-2.5 font-bold text-slate-800 flex items-center gap-2">
                              <span className="text-base">{item.bendera}</span>
                              <span>{item.negara}</span>
                              {idx === 0 && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                                  Top 1
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 font-mono font-bold text-slate-900 text-right">
                              Rp {(item.realisasiMiliar / 1000).toFixed(2)} T
                            </td>
                            <td className="py-2.5 font-mono text-right">
                              <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">
                                {item.sharePersen.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-2.5 font-mono text-center text-slate-700">
                              {item.proyekCount} Proyek
                            </td>
                            <td className="py-2.5 text-slate-600 text-[11px] truncate max-w-xs">
                              {item.sektorUtama}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-3">
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                    <h4 className="text-xs font-mono font-bold text-blue-900 uppercase">
                      Kemitraan Strategis Koridor Singapura - Batam
                    </h4>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Singapura tetap menjadi mitra investasi PMA terbesar dengan nilai <strong>Rp 10,45 Triliun (33,2%)</strong>, didorong oleh inisiatif <em>Twin City Digital Hub</em> dan relokasi rantai pasok industri berteknologi tinggi ke KPBPB Batam.
                    </p>
                    <div className="pt-2 border-t border-blue-200 text-[11px] text-blue-900 font-mono">
                      <span>Proyek Strategis: Nongsa D-Park, Kabil Port, Singtel Hub</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="text-xs font-mono font-bold text-slate-800 uppercase">
                      Kekuatan Modal Domestik (PMDN)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      PMDN menyumbang <strong>Rp 8,24 Triliun (26,17%)</strong> terutama menggerakkan industri galangan kapal, docking reparasi tanker migas di Tanjung Uncang, serta pembangunan kawasan industri baru.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* View Mode 3: Tren Kuartalan */}
            {realisasiViewMode === 'tren_kuartal' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                      <span>PERBANDINGAN TARGET VS REALISASI PER KUARTAL (Q1 - Q4)</span>
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">Satuan: Triliun Rupiah (Rp T)</span>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={quarterlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#475569' }} domain={[0, 10]} />
                        <Tooltip
                          formatter={(value: any) => [`Rp ${Number(value).toFixed(2)} Triliun`]}
                          contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                        <Bar dataKey="target" name="Target Perkin" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="realisasi" name="Realisasi Akumulasi" fill="#2563EB" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="pma" name="Komponen PMA" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="pmdn" name="Komponen PMDN" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-3">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-mono text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>AKSELERASI KUARTER AKHIR (Q4)</span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      Realisasi Q4 mencatat lonjakan tertinggi sebesar <strong>Rp 9,10 Triliun</strong> (118,18% dari target kuartal) berkat finalisasi pencatatan modal tetap data center dan fasilitas energi terbarukan.
                    </p>
                    <div className="pt-2 border-t border-emerald-200 text-[10px] text-emerald-800 font-mono">
                      <span>Rata-rata pertumbuhan triwulanan: +10.2% per kuartal</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="text-xs font-mono font-bold text-slate-800 uppercase">
                      Statistik Proyek &amp; Tenaga Kerja 2025
                    </h4>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-slate-600">
                        <span>Total Proyek Usaha:</span>
                        <strong className="text-slate-900">184 Proyek</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Penyerapan Tenaga Kerja:</span>
                        <strong className="text-emerald-700">21.840 Orang</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Rata-rata Nilai / Proyek:</span>
                        <strong className="text-slate-900">Rp 171,1 Miliar</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: MATRIKS KAWASAN EKONOMI KHUSUS (KEK) BATAM */}
        {/* ============================================================== */}
        {activeVisualTab === 'kek_matrix' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3 KAWASAN EKONOMI KHUSUS (KEK) RESMI DI KPBPB BATAM (IKP-2)</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-sans">
                  Target Perkin: Rp 8,50 T • Realisasi: Rp 9,09 T (106,94% Tercapai)
                </span>
              </div>

              <button
                onClick={() => onNavigateToUnit && onNavigateToUnit('dit-pengembangan-kek')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Buka Dashboard Unit KEK</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 KEK Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* KEK Nongsa */}
              <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-xl border border-blue-200 p-4 space-y-3 shadow-2xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                      NDP
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">KEK Nongsa Digital Park</h4>
                      <span className="text-[10px] text-slate-500 font-mono">Luas: 166,45 Ha</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    108,7%
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-slate-500">Realisasi Investasi:</div>
                  <div className="text-xl font-black text-slate-900 font-mono">
                    Rp 4,89 Triliun
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Target: Rp 4,50 T | Komitmen: Rp 16,0 T
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Fokus Kawasan:</span>
                    <strong className="text-slate-800">Hyperscale Data Center &amp; AI Studio</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Pelaku Usaha:</span>
                    <strong className="text-slate-800">22 Tenant Aktif</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tenaga Kerja:</span>
                    <strong className="text-blue-700">680 Talenta Digital</strong>
                  </div>
                </div>
              </div>

              {/* KEK Batam Aero Technic */}
              <div className="bg-gradient-to-b from-emerald-50/50 to-white rounded-xl border border-emerald-200 p-4 space-y-3 shadow-2xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                      BAT
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">KEK Batam Aero Technic</h4>
                      <span className="text-[10px] text-slate-500 font-mono">Luas: 30,00 Ha (Bandara Hang Nadim)</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    111,4%
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-slate-500">Realisasi Investasi:</div>
                  <div className="text-xl font-black text-slate-900 font-mono">
                    Rp 3,12 Triliun
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Target: Rp 2,80 T | Komitmen: Rp 7,2 T
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Fokus Kawasan:</span>
                    <strong className="text-slate-800">MRO Pesawat Terbang &amp; Hanggar</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Pelaku Usaha:</span>
                    <strong className="text-slate-800">16 Tenant / Unit Maintenance</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tenaga Kerja:</span>
                    <strong className="text-emerald-700">610 Teknisi &amp; Aviasi</strong>
                  </div>
                </div>
              </div>

              {/* KEK Pariwisata & Kesehatan */}
              <div className="bg-gradient-to-b from-purple-50/50 to-white rounded-xl border border-purple-200 p-4 space-y-3 shadow-2xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                      PKI
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">KEK Pariwisata &amp; Kesehatan</h4>
                      <span className="text-[10px] text-slate-500 font-mono">Luas: 44,23 Ha (Sekupang)</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                    90,0%
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-slate-500">Realisasi Investasi:</div>
                  <div className="text-xl font-black text-slate-900 font-mono">
                    Rp 1,08 Triliun
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Target: Rp 1,20 T | Komitmen: Rp 6,9 T
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Fokus Kawasan:</span>
                    <strong className="text-slate-800">Medical Tourism &amp; Wellness Resort</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Pelaku Usaha:</span>
                    <strong className="text-slate-800">10 Tenant (Apollo, RSBP Health)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tenaga Kerja:</span>
                    <strong className="text-purple-700">192 Tenaga Medis &amp; Layanan</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Administrator KEK Stats & Kajian */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-800 uppercase flex items-center justify-between">
                  <span>Layanan Administrator KEK (Dataset #4 s/d #8)</span>
                  <span className="text-[10px] text-emerald-700 font-bold">142 Dokumen Terbit</span>
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <div className="text-slate-500 text-[10px]">Perizinan Berusaha</div>
                    <div className="font-mono font-bold text-blue-700 text-base">76 Izin</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <div className="text-slate-500 text-[10px]">Non-Perizinan</div>
                    <div className="font-mono font-bold text-cyan-700 text-base">42 Dok</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <div className="text-slate-500 text-[10px]">Perizinan Lainnya</div>
                    <div className="font-mono font-bold text-indigo-700 text-base">24 Dok</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-800 uppercase flex items-center justify-between">
                  <span>Kajian Strategis Perkin KEK (Dataset #9 s/d #12)</span>
                  <span className="text-[10px] text-blue-700 font-bold">91,7% Capaian</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  11 dari 12 kajian perkin telah ditindaklanjuti untuk harmonisasi insentif fiskal (Tax Holiday/Allowance KEK) dan masterplan kesiapan utilitas gardu induk serta transmisi fiber optik tier-4.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: PENGENDALIAN PENGUSAHAAN & KERJASAMA KEMITRAAN */}
        {/* ============================================================== */}
        {activeVisualTab === 'pengendalian_kerjasama' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>EVALUASI PENGENDALIAN KERJASAMA PENGUSAHAAN BADAN USAHA (IKP-3)</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-sans">
                  Target: 85,00% • Realisasi: 94,60% (Dataset #1, #2, #3, #4 Dit. Pengendalian Pengusahaan)
                </span>
              </div>

              <button
                onClick={() => onNavigateToUnit && onNavigateToUnit('dit-pengendalian-usaha')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Buka Dashboard Pengendalian Usaha</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Stat Counters Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-200">
                <div className="text-[10px] text-indigo-700 font-mono font-bold">REKOMENDASI TERBIT</div>
                <div className="text-2xl font-black text-indigo-950 font-mono">48</div>
                <div className="text-[10px] text-indigo-600">Dataset #1 Pengendalian</div>
              </div>
              <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                <div className="text-[10px] text-emerald-700 font-mono font-bold">TUNTAS DITINDAKLANJUTI</div>
                <div className="text-2xl font-black text-emerald-950 font-mono">45 (94,6%)</div>
                <div className="text-[10px] text-emerald-600">Dataset #3 Hasil Evaluasi</div>
              </div>
              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200">
                <div className="text-[10px] text-blue-700 font-mono font-bold">PERBAIKAN / AMANDEMEN</div>
                <div className="text-2xl font-black text-blue-950 font-mono">91,80%</div>
                <div className="text-[10px] text-blue-600">Dataset #4 Perubahan PKS</div>
              </div>
              <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-700 font-mono font-bold">LAPORAN PENGAWASAN</div>
                <div className="text-2xl font-black text-slate-900 font-mono">12 Laporan</div>
                <div className="text-[10px] text-slate-600">Dataset #2 Monitoring Bulanan</div>
              </div>
            </div>

            {/* Daftar Kerjasama Pengusahaan Table */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold text-slate-800 uppercase">
                  Daftar Evaluasi Perjanjian Kerjasama Pengusahaan (KSO, BTO, BOT &amp; Konsesi)
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">6 Sampel Mitra Strategis Aktif</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-[11px] font-mono text-slate-500">
                      <th className="pb-2 font-bold">Mitra Pengusahaan</th>
                      <th className="pb-2 font-bold">Skema PKS</th>
                      <th className="pb-2 font-bold">Bidang Kerjasama</th>
                      <th className="pb-2 font-bold text-right">Nilai Investasi</th>
                      <th className="pb-2 font-bold text-center">Status Kepatuhan</th>
                      <th className="pb-2 font-bold">Tindak Lanjut Rekomendasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {KERJASAMA_PENGUSAHAAN_DATA.map((row) => (
                      <tr key={row.id} className="hover:bg-white/80 transition-colors">
                        <td className="py-2.5 font-bold text-slate-900">
                          <div>{row.namaMitra}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{row.nomorPks} • {row.periodeKerjasama}</div>
                        </td>
                        <td className="py-2.5 font-mono text-slate-700">
                          <span className="px-2 py-0.5 rounded bg-slate-200/70 text-[10px] font-bold">
                            {row.skemaKerjasama.split(' ')[0]}
                          </span>
                        </td>
                        <td className="py-2.5 text-slate-700 max-w-xs truncate">
                          {row.bidangKerjasama}
                        </td>
                        <td className="py-2.5 font-mono font-bold text-slate-900 text-right">
                          Rp {(row.nilaiInvestasiMitra / 1000).toFixed(2)} T
                        </td>
                        <td className="py-2.5 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              row.statusKepatuhan.includes('(A)')
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {row.statusKepatuhan}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>{row.rekomendasiStatus}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: INVESTOR PIPELINE INTELLIGENCE & DIGITAL PROMOTION */}
        {/* ============================================================== */}
        {activeVisualTab === 'investor_pipeline' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>INVESTOR PIPELINE INTELLIGENCE &amp; PROMOSI PENANAMAN MODAL (IKP-4)</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-sans">
                  52 Investor Minat Terfasilitasi • Potensi Nilai Pipeline: Rp 18,75 Triliun (US$ 1,21 Miliar)
                </span>
              </div>

              {/* Filter Pipeline Stage */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                {(['ALL', 'Inquiry', 'Site Visit', 'LoI Minat', 'Perizinan', 'Konstruksi'] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setPipelineFilterTahap(stage)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                      pipelineFilterTahap === stage
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Funnel 5 Stages Visual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {INVESTOR_PIPELINE_STAGES.map((stg) => (
                <div
                  key={stg.stageId}
                  className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5 hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                      Step {stg.stageId}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      {stg.persenKonversi.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 truncate" title={stg.stageTitle}>
                    {stg.stageTitle}
                  </div>
                  <div className="text-xl font-mono font-black text-slate-900">
                    {stg.investorCount} <span className="text-[11px] font-sans font-normal text-slate-500">Investor</span>
                  </div>
                  <div className="text-[10px] font-mono text-blue-700 font-bold">
                    Est: Rp {stg.nilaiEstimasiTriliun.toFixed(2)} T
                  </div>
                  <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${stg.persenKonversi}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Investor Pipeline Table & Website Visit Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
              <div className="lg:col-span-8 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-slate-800 uppercase">
                    Pipeline Calon Investor Riil Terfasilitasi (Dataset #14 &amp; #6)
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Menampilkan {filteredPipelineTable.length} dari {INVESTOR_PIPELINE_TABLE.length} Proyek
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-left text-[11px] font-mono text-slate-500">
                        <th className="pb-2 font-bold">Nama Perusahaan</th>
                        <th className="pb-2 font-bold">Sektor &amp; Lokasi</th>
                        <th className="pb-2 font-bold text-right">Estimasi Modal</th>
                        <th className="pb-2 font-bold text-center">Tahapan</th>
                        <th className="pb-2 font-bold">Status Kesiapan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPipelineTable.map((p) => (
                        <tr key={p.id} className="hover:bg-white/80 transition-colors">
                          <td className="py-2.5 font-bold text-slate-900">
                            <div className="flex items-center gap-1.5">
                              <span>{p.bendera}</span>
                              <span>{p.namaPerusahaan}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">{p.asalNegara} • Fasilitasi: {p.tanggalFasilitasi}</div>
                          </td>
                          <td className="py-2.5 text-slate-700">
                            <div>{p.sektor}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{p.lokasiTujuan}</div>
                          </td>
                          <td className="py-2.5 font-mono font-bold text-slate-900 text-right">
                            Rp {(p.nilaiEstimasiMiliar / 1000).toFixed(2)} T
                          </td>
                          <td className="py-2.5 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                              {p.tahap}
                            </span>
                          </td>
                          <td className="py-2.5 text-[11px] font-medium text-slate-800">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{p.statusKesiapan}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Website Telemetry & Pameran Insights */}
              <div className="lg:col-span-4 space-y-3">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-[#1F3864] text-white space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 font-bold">
                      PORTAL RESMI INVEST IN-BATAM
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">+16,3% YoY</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-white font-mono">239.250 Hits</div>
                    <div className="text-xs text-slate-300">164.200 Pengunjung Unik dari 38 Negara</div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/80 space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>Singapura:</span>
                      <strong className="text-white font-mono">34% (81.345 hits)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Amerika Serikat:</span>
                      <strong className="text-white font-mono">21% (50.240 hits)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Tiongkok:</span>
                      <strong className="text-white font-mono">20% (47.850 hits)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Halaman Terpopuler:</span>
                      <strong className="text-cyan-300 font-mono">/kek-nongsa-digital-park</strong>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-mono font-bold text-slate-800 uppercase flex items-center justify-between">
                    <span>Pameran &amp; Roadshow Investasi</span>
                    <span className="text-emerald-700 font-bold">14 Event</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Partisipasi aktif BP Batam dalam 14 forum investasi internasional meliputi Singapore Fintech Festival, Hannover Messe Jerman, Global Investment Forum Dubai, dan IIGF Jakarta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
