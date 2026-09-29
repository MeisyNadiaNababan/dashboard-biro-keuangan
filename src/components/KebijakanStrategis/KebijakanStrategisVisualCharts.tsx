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
  Clock,
  Briefcase,
  Network,
  Calculator,
  HelpCircle,
  Info,
  ChevronDown,
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
  IPPN_KOMPONEN_DATA,
  PTSP_SEKTOR_PERFORMANCES,
  PTSP_MONTHLY_TREND,
  PTSP_IKM_9_UNSUR,
  PTSP_IKM_PER_LAYANAN,
  SPBE_DOMAINS_DATA,
  PDSI_INFRASTRUCTURE_DATA,
  IKK_DIMENSI_DATA,
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
    'ikp_anggaran' | 'perizinan_ptsp' | 'spbe_pdsi'
  >('ikp_anggaran');

  // Selected Sector for interactive highlight
  const [selectedSektorCode, setSelectedSektorCode] = useState<string | null>(null);

  // State for IKM Card toggle view: 9 Unsur vs Nilai per Layanan
  const [ikmActiveView, setIkmActiveView] = useState<'unsur' | 'layanan'>('unsur');

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
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: IKP RADAR & RINGKASAN CAPAIAN 4 IKP UTAMA                    */}
      {/* =================================================================== */}
      {activeTab === 'ikp_anggaran' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            {/* Left: Radar Chart 4 IKP Capaian vs Target */}
            <div className="xl:col-span-4 bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3 flex flex-col justify-between">
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
                  <span className="font-bold text-emerald-700 font-mono">105.18% (Melampaui Target)</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  *Indeks SPBE diskalakan ke 100 untuk keseragaman visual radar (Realisasi: 4.12 dari target 3.90).
                </div>
              </div>
            </div>

            {/* Right: 4 Detailed IKP Performance Cards (2 Cards Sebaris, 2 Lagi Dibawahnya) */}
            <div className="xl:col-span-8 bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                      Capaian Evaluasi 4 Indikator Kinerja Program (IKP)
                    </h4>
                    <p className="text-[10px] sm:text-[10.5px] text-slate-500">
                      Tabel rincian komponen IPPN, 4 tahap IKK, 6 domain SPBE, serta 9 unsur &amp; nilai per layanan IKM
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 shrink-0 self-start sm:self-auto">
                  Perkin A2 BP Batam
                </span>
              </div>

              {/* Grid 2 Sebaris, 2 Dibawahnya seperti Konsolidasi IKM Kepala BP Batam */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* ----------------------------------------------------------- */}
                {/* CARD 1: IKP-1 INDEKS PERENCANAAN PEMBANGUNAN (IPPN)        */}
                {/* ----------------------------------------------------------- */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded text-[10px] border border-sky-200">
                      IKP-1 &bull; PUSREN P3S
                    </span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                      102.39% Tercapai
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      Indeks Perencanaan Pembangunan (IPPN)
                    </h5>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Unit: Pusat Perencanaan Program Strategis BP Batam
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black font-mono text-slate-900">94.20</span>
                        <span className="text-[10.5px] font-bold text-slate-500">Indeks</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        Target: <strong className="text-slate-800">92.00</strong> (Sangat Baik)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div style={{ width: '100%' }} className="bg-sky-600 h-full rounded-full" />
                    </div>
                  </div>

                  {/* Tabel Komponen IPPN dan Nilainya */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-700">Tabel Komponen Penilaian IPPN (SE Bappenas):</span>
                      <span className="text-[9px] font-mono text-slate-500">4 Komponen</span>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
                      <table className="w-full text-left text-[9.5px]">
                        <thead>
                          <tr className="bg-slate-100/90 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                            <th className="py-1 px-1.5">Komponen Perencanaan</th>
                            <th className="py-1 px-1 text-center">Bobot</th>
                            <th className="py-1 px-1 text-right">Nilai</th>
                            <th className="py-1 px-1.5 text-right">Poin</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                          {IPPN_KOMPONEN_DATA.map((item) => (
                            <tr key={item.no} className="hover:bg-white transition-colors">
                              <td className="py-1 px-1.5 font-sans truncate max-w-[135px]" title={item.komponen}>
                                {item.komponen}
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-slate-500">
                                {item.bobotPersen}%
                              </td>
                              <td className="py-1 px-1 text-right font-mono font-bold text-slate-800">
                                {item.nilai.toFixed(1)}
                              </td>
                              <td className="py-1 px-1.5 text-right font-mono font-black text-sky-700">
                                {item.poin.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-sky-50/70 font-bold text-slate-900 border-t border-sky-200 text-[9.5px]">
                            <td className="py-1 px-1.5 font-bold text-sky-950">
                              Total Indeks IPPN:
                            </td>
                            <td className="py-1 px-1 text-center font-mono text-sky-900">100%</td>
                            <td className="py-1 px-1 text-right font-mono text-sky-800">Capaian</td>
                            <td className="py-1 px-1.5 text-right font-mono font-black text-sky-900">
                              94.20
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal?.('ikp-1-perencanaan')}
                    className="w-full text-center text-[10px] text-sky-700 hover:text-sky-900 font-bold py-1 bg-white hover:bg-sky-50 rounded-lg border border-sky-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Calculator className="w-3 h-3 text-sky-600" />
                    <span>Lihat Panduan &amp; Formula IPPN</span>
                  </button>
                </div>

                {/* ----------------------------------------------------------- */}
                {/* CARD 2: IKP-2 INDEKS KUALITAS KEBIJAKAN (IKK)               */}
                {/* ----------------------------------------------------------- */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded text-[10px] border border-sky-200">
                      IKP-2 &bull; PHKS
                    </span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                      110.46% Tercapai
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      Indeks Kualitas Kebijakan (IKK)
                    </h5>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Unit: Pusat Harmonisasi Kebijakan Strategis BP Batam
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black font-mono text-slate-900">71.80</span>
                        <span className="text-[10.5px] font-bold text-slate-500">Indeks</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        Target: <strong className="text-slate-800">65.00</strong> (Cukup Baik)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div style={{ width: '100%' }} className="bg-sky-600 h-full rounded-full" />
                    </div>
                  </div>

                  {/* Tabel 4 Tahap IKK dan Nilainya */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-700">Tabel 4 Tahap Kebijakan (Standar LAN-RI):</span>
                      <span className="text-[9px] font-mono text-slate-500">4 Tahapan</span>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
                      <table className="w-full text-left text-[9.5px]">
                        <thead>
                          <tr className="bg-slate-100/90 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                            <th className="py-1 px-1.5">Tahapan Kebijakan</th>
                            <th className="py-1 px-1 text-center">Bobot</th>
                            <th className="py-1 px-1 text-right">Skor</th>
                            <th className="py-1 px-1.5 text-right">Poin</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                          {IKK_DIMENSI_DATA.map((dim, idx) => (
                            <tr key={idx} className="hover:bg-white transition-colors">
                              <td className="py-1 px-1.5 font-sans truncate max-w-[135px]" title={dim.dimensi}>
                                {dim.dimensi}
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-slate-500">
                                {dim.bobot}%
                              </td>
                              <td className="py-1 px-1 text-right font-mono font-bold text-slate-800">
                                {dim.skor.toFixed(1)}
                              </td>
                              <td className="py-1 px-1.5 text-right font-mono font-black text-sky-700">
                                {dim.poinTerbobot?.toFixed(2) || ((dim.skor * dim.bobot) / 100).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-sky-50/70 font-bold text-slate-900 border-t border-sky-200 text-[9.5px]">
                            <td className="py-1 px-1.5 font-bold text-sky-950">
                              Total Akumulasi IKK:
                            </td>
                            <td className="py-1 px-1 text-center font-mono text-sky-900">100%</td>
                            <td className="py-1 px-1 text-right font-mono text-sky-800">Capaian</td>
                            <td className="py-1 px-1.5 text-right font-mono font-black text-sky-900">
                              71.80
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal?.('ikp-2-kebijakan')}
                    className="w-full text-center text-[10px] text-sky-700 hover:text-sky-900 font-bold py-1 bg-white hover:bg-sky-50 rounded-lg border border-sky-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Calculator className="w-3 h-3 text-sky-600" />
                    <span>Lihat Panduan &amp; Formula IKK</span>
                  </button>
                </div>

                {/* ----------------------------------------------------------- */}
                {/* CARD 3: IKP-3 TINGKAT KEMATANGAN SPBE                       */}
                {/* ----------------------------------------------------------- */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded text-[10px] border border-indigo-200">
                      IKP-3 &bull; PDSI
                    </span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                      105.64% Tercapai
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      Tingkat Kematangan SPBE
                    </h5>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Unit: Pusat Data dan Sistem Informasi BP Batam
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black font-mono text-slate-900">4.12</span>
                        <span className="text-[10.5px] font-bold text-slate-500">Skala 0-5</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        Target: <strong className="text-slate-800">3.90</strong> (Level 4 Terpadu)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        style={{ width: `${(4.12 / 5) * 100}%` }}
                        className="bg-indigo-600 h-full rounded-full"
                      />
                    </div>
                  </div>

                  {/* Tabel Nilai Masing-Masing Penilaian SPBE (6 Domain) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-700">Tabel Nilai 6 Domain Penilaian SPBE:</span>
                      <span className="text-[9px] font-mono text-slate-500">PermenPAN 59/2020</span>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
                      <table className="w-full text-left text-[9.5px]">
                        <thead>
                          <tr className="bg-slate-100/90 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                            <th className="py-1 px-1.5">Domain Arsitektur SPBE</th>
                            <th className="py-1 px-1 text-center">Bobot</th>
                            <th className="py-1 px-1 text-center">Target</th>
                            <th className="py-1 px-1.5 text-right">Skor (0-5)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                          {SPBE_DOMAINS_DATA.map((dom, idx) => (
                            <tr key={idx} className="hover:bg-white transition-colors">
                              <td className="py-1 px-1.5 font-sans truncate max-w-[135px]" title={dom.domain}>
                                {dom.domain}
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-slate-500">
                                {dom.bobot}%
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-slate-500">
                                {dom.target.toFixed(2)}
                              </td>
                              <td className="py-1 px-1.5 text-right font-mono font-black text-indigo-700">
                                {dom.skor.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-indigo-50/70 font-bold text-slate-900 border-t border-indigo-200 text-[9.5px]">
                            <td className="py-1 px-1.5 font-bold text-indigo-950">
                              Indeks Akhir SPBE:
                            </td>
                            <td className="py-1 px-1 text-center font-mono text-indigo-900">100%</td>
                            <td className="py-1 px-1 text-center font-mono text-indigo-800">3.90</td>
                            <td className="py-1 px-1.5 text-right font-mono font-black text-indigo-900">
                              4.12
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal?.('ikp-3-spbe')}
                    className="w-full text-center text-[10px] text-indigo-700 hover:text-indigo-900 font-bold py-1 bg-white hover:bg-indigo-50 rounded-lg border border-indigo-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Calculator className="w-3 h-3 text-indigo-600" />
                    <span>Lihat Panduan &amp; Formula SPBE</span>
                  </button>
                </div>

                {/* ----------------------------------------------------------- */}
                {/* CARD 4: IKP-4 IKM PENGGUNA LAYANAN PTSP                    */}
                {/* ----------------------------------------------------------- */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                      IKP-4 &bull; PTSP
                    </span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                      102.22% Tercapai
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      IKM Pengguna Layanan PTSP
                    </h5>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Pusat Pelayanan Terpadu Satu Pintu BP Batam
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black font-mono text-slate-900">88.42</span>
                        <span className="text-[10.5px] font-bold text-slate-500">Indeks</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        Target: <strong className="text-slate-800">86.50</strong> (Mutu A)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        style={{ width: `${(88.42 / 100) * 100}%` }}
                        className="bg-emerald-600 h-full rounded-full"
                      />
                    </div>
                  </div>

                  {/* Tabel Unsur Pelayanan & Nilai Per Layanan dengan Toggle */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-700">Tabel Unsur &amp; Nilai per Layanan:</span>
                      <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded border border-slate-200 font-bold text-[9px]">
                        <button
                          type="button"
                          onClick={() => setIkmActiveView('unsur')}
                          className={`px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                            ikmActiveView === 'unsur'
                              ? 'bg-white text-emerald-800 shadow-2xs font-extrabold'
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          9 Unsur
                        </button>
                        <button
                          type="button"
                          onClick={() => setIkmActiveView('layanan')}
                          className={`px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                            ikmActiveView === 'layanan'
                              ? 'bg-white text-emerald-800 shadow-2xs font-extrabold'
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          Per Layanan
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60 max-h-[135px] overflow-y-auto">
                      {ikmActiveView === 'unsur' ? (
                        <table className="w-full text-left text-[9.5px]">
                          <thead className="sticky top-0 bg-slate-100 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                            <tr>
                              <th className="py-1 px-1.5">9 Unsur PermenPAN-RB</th>
                              <th className="py-1 px-1 text-right">Skor</th>
                              <th className="py-1 px-1.5 text-center">Mutu</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                            {PTSP_IKM_9_UNSUR.map((u) => (
                              <tr key={u.no} className="hover:bg-white transition-colors">
                                <td className="py-1 px-1.5 font-sans truncate max-w-[135px]" title={u.unsur}>
                                  {u.no}. {u.unsur}
                                </td>
                                <td className="py-1 px-1 text-right font-mono font-bold text-slate-800">
                                  {u.skor.toFixed(1)}
                                </td>
                                <td className="py-1 px-1.5 text-center font-mono">
                                  <span
                                    className={`px-1 py-0.2 rounded text-[8.5px] font-bold ${
                                      u.mutu.startsWith('A')
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}
                                  >
                                    {u.mutu.split(' ')[0]}
                                  </span>
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-emerald-50/70 font-bold text-slate-900 border-t border-emerald-200 text-[9.5px] sticky bottom-0">
                              <td className="py-1 px-1.5 font-bold text-emerald-950">
                                Rerata 9 Unsur:
                              </td>
                              <td className="py-1 px-1 text-right font-mono font-black text-emerald-900">
                                88.42
                              </td>
                              <td className="py-1 px-1.5 text-center font-mono font-bold text-emerald-800">
                                Mutu A
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <table className="w-full text-left text-[9.5px]">
                          <thead className="sticky top-0 bg-slate-100 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                            <tr>
                              <th className="py-1 px-1.5">Layanan PTSP</th>
                              <th className="py-1 px-1 text-center">Vol</th>
                              <th className="py-1 px-1 text-right">Skor</th>
                              <th className="py-1 px-1.5 text-center">Mutu</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                            {PTSP_IKM_PER_LAYANAN.map((lay) => (
                              <tr key={lay.no} className="hover:bg-white transition-colors">
                                <td className="py-1 px-1.5 font-sans truncate max-w-[125px]" title={lay.layanan}>
                                  {lay.layanan}
                                </td>
                                <td className="py-1 px-1 text-center font-mono text-slate-500">
                                  {lay.volume}
                                </td>
                                <td className="py-1 px-1 text-right font-mono font-black text-emerald-700">
                                  {lay.skor.toFixed(2)}
                                </td>
                                <td className="py-1 px-1.5 text-center font-mono">
                                  <span
                                    className={`px-1 py-0.2 rounded text-[8.5px] font-bold ${
                                      lay.mutu === 'A'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}
                                  >
                                    Mutu {lay.mutu}
                                  </span>
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-emerald-50/70 font-bold text-slate-900 border-t border-emerald-200 text-[9.5px] sticky bottom-0">
                              <td className="py-1 px-1.5 font-bold text-emerald-950">
                                Total Layanan PTSP:
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-emerald-900">
                                1.842
                              </td>
                              <td className="py-1 px-1 text-right font-mono font-black text-emerald-900">
                                88.42
                              </td>
                              <td className="py-1 px-1.5 text-center font-mono font-bold text-emerald-800">
                                Mutu A
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal?.('ikp-4-ikm-ptsp')}
                    className="w-full text-center text-[10px] text-emerald-700 hover:text-emerald-900 font-bold py-1 bg-white hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Calculator className="w-3 h-3 text-emerald-600" />
                    <span>Lihat Panduan &amp; Formula IKM</span>
                  </button>
                </div>
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
                {/* Rak Data Center #8 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-800 font-extrabold flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-indigo-600" />
                      Okupansi Rak Server #8
                    </span>
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
                  <div className="flex items-center justify-between text-[10.5px] text-slate-500 font-medium">
                    <span>{PDSI_INFRASTRUCTURE_DATA.dataCenter.okupansiPersen}% Terisi</span>
                    <span>{PDSI_INFRASTRUCTURE_DATA.dataCenter.rakKosong} Rak Kosong</span>
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-50/90 border border-indigo-200/80 text-[9.5px] font-mono space-y-0.5">
                    <div className="font-extrabold text-indigo-950">
                      Hal. 41 Data No. 8 &bull; Tabel &quot;Data Rak Data Center&quot;
                    </div>
                    <div className="text-slate-600 text-[9px]">
                      Atribut: <code>Total Rak</code>, <code>Terisi</code>, <code>Kosong</code>, <code>Jenis Rak</code>, <code>Ruangan</code>
                    </div>
                  </div>
                </div>

                {/* Fiber Optic Backbone #2 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-800 font-extrabold flex items-center gap-1.5">
                      <Network className="w-3.5 h-3.5 text-teal-600" />
                      Jalur Fiber Optik #2
                    </span>
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
                  <div className="flex items-center justify-between text-[10.5px] text-slate-500 font-medium">
                    <span>{PDSI_INFRASTRUCTURE_DATA.fiberOptic.utilisasiPersen}% Utilisasi</span>
                    <span>{PDSI_INFRASTRUCTURE_DATA.fiberOptic.coreAktif} Core Aktif</span>
                  </div>
                  <div className="p-2 rounded-lg bg-teal-50/90 border border-teal-200/80 text-[9.5px] font-mono space-y-0.5">
                    <div className="font-extrabold text-teal-950">
                      Hal. 40 Data No. 2 &bull; Tabel &quot;Data Jaringan Fiber Optic&quot;
                    </div>
                    <div className="text-slate-600 text-[9px]">
                      Atribut: <code>Jalur</code>, <code>JLN</code>, <code>Panjang</code>, <code>JmlhCore</code>, <code>BrandFO</code>
                    </div>
                  </div>
                </div>

                {/* SOC Cyber Threat Mitigation #12 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-800 font-extrabold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Mitigasi Siber (SOC) #12
                    </span>
                    <span className="text-base font-black font-mono text-emerald-600">
                      {PDSI_INFRASTRUCTURE_DATA.cyberSecurity.threatMitigatedPersen}%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    {PDSI_INFRASTRUCTURE_DATA.cyberSecurity.totalThreatYtd.toLocaleString()} anomali/threat dimitigasi aktif.
                  </p>
                  <div className="p-2 rounded-lg bg-emerald-50/90 border border-emerald-200/80 text-[9.5px] font-mono space-y-0.5">
                    <div className="font-extrabold text-emerald-950">
                      Hal. 42 Data No. 12 &bull; Tabel &quot;Data Serangan Siber&quot;
                    </div>
                    <div className="text-slate-600 text-[9px]">
                      Atribut: <code>Threat Activity</code>, <code>Status Keamanan</code>, <code>Jumlah Serangan</code>
                    </div>
                  </div>
                </div>

                {/* Status Server & Storage #14 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-800 font-extrabold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-sky-600" />
                      Katalog Aplikasi Resmi #14
                    </span>
                    <span className="text-base font-black font-mono text-indigo-700">
                      {PDSI_INFRASTRUCTURE_DATA.aplikasi.totalAplikasiAktif} Sistem
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    100% terhubung ke platform Satu Data &amp; TTE BSrE.
                  </p>
                  <div className="p-2 rounded-lg bg-sky-50/90 border border-sky-200/80 text-[9.5px] font-mono space-y-0.5">
                    <div className="font-extrabold text-sky-950">
                      Hal. 42 Data No. 14 &bull; Tabel &quot;Data Aplikasi BP Batam&quot;
                    </div>
                    <div className="text-slate-600 text-[9px]">
                      Atribut: <code>Nama Aplikasi</code>, <code>Basis Web/Mobile</code>, <code>Tipe Lisensi</code>, <code>Integrasi TTE</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
