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
  OPERATIONAL_STRATEGY_INSIGHTS,
  SATKER_A5_LIST,
} from './bandaraPelabuhanLlbData';

interface BandaraPelabuhanLlbVisualChartsProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const BandaraPelabuhanLlbVisualCharts: React.FC<
  BandaraPelabuhanLlbVisualChartsProps
> = ({ onOpenFormulaModal, onNavigateToUnit }) => {
  const [activeTab, setActiveTab] = useState<
    'throughput' | 'revenue' | 'ikm_unsur' | 'monitoring'
  >('throughput');

  const [viewMode, setViewMode] = useState<'chart' | 'detail'>('chart');
  const [cargoFilter, setCargoFilter] = useState<'ALL' | 'teus' | 'kargo_udara' | 'penumpang'>('ALL');

  // Colors
  const COLORS_PNBP = ['#0284C7', '#0D9488', '#F59E0B'];

  const pnbpDonutData = [
    { name: 'Dit. Pengelolaan Kepelabuhanan', value: 438.35, target: 401.89, pct: '77.5%', color: '#0284C7' },
    { name: 'Dit. Pengelolaan Kawasan Bandara', value: 124.50, target: 116.32, pct: '22.0%', color: '#0D9488' },
    { name: 'Dit. Lalu Lintas Barang', value: 2.48, target: 2.20, pct: '0.5%', color: '#F59E0B' },
  ];

  // Quarterly aggregated PNBP
  const quarterlyPnbpData = [
    {
      quarter: 'Q1 (Jan-Mar)',
      bandara: 29.7,
      pelabuhan: 105.1,
      llb: 0.58,
      total: 135.38,
      target: 125.0,
    },
    {
      quarter: 'Q2 (Apr-Jun)',
      bandara: 32.6,
      pelabuhan: 112.3,
      llb: 0.65,
      total: 145.55,
      target: 130.0,
    },
    {
      quarter: 'Q3 (Jul-Sep)',
      bandara: 31.7,
      pelabuhan: 113.1,
      llb: 0.63,
      total: 145.43,
      target: 130.0,
    },
    {
      quarter: 'Q4 (Okt-Des)',
      bandara: 34.5,
      pelabuhan: 122.6,
      llb: 0.75,
      total: 157.85,
      target: 133.21,
    },
  ];

  // Export CSV Helper
  const handleExportCsv = () => {
    let csv = 'data:text/csv;charset=utf-8,';
    if (activeTab === 'throughput') {
      csv += 'Bulan,Kuartal,Peti Kemas (TEUs),Kargo Udara (Ton),Penumpang Bandara (Pax),Penumpang Pelabuhan (Pax),Kunjungan Kapal (Call)\n';
      MONTHLY_OPERATIONAL_DATA.forEach((r) => {
        csv += `${r.bulan},${r.kuartal},${r.petiKemasTeus},${r.kargoUdaraTon},${r.penumpangBandaraPax},${r.penumpangPelabuhanPax},${r.kapalCall}\n`;
      });
    } else if (activeTab === 'revenue') {
      csv += 'Kuartal,PNBP Bandara (M),PNBP Pelabuhan (M),PNBP Lalu Lintas Barang (M),Total Realisasi (M),Target Perkin (M)\n';
      quarterlyPnbpData.forEach((r) => {
        csv += `${r.quarter},${r.bandara},${r.pelabuhan},${r.llb},${r.total},${r.target}\n`;
      });
    } else {
      csv += 'Unsur Layanan,Deskripsi,Bobot,Nilai Bandara,Nilai Pelabuhan,Nilai LLB,Nilai Rata-rata,Predikat\n';
      IKM_UNSUR_DETAILS.forEach((r) => {
        csv += `"${r.unsur}","${r.deskripsi}",${r.bobot},${r.nilaiBandara},${r.nilaiPelabuhan},${r.nilaiLlb},${r.nilaiRataRata},"${r.predikat}"\n`;
      });
    }
    const encoded = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `data_visual_${activeTab}_perkin_a5.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden font-sans">
      {/* 1. TOP METRICS HEADER BAR (Terinspirasi layout gambar namun diperkaya standar BP Batam) */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-[#0B2545] to-[#13315C] text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-700/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 text-cyan-300 flex items-center justify-center shrink-0 shadow-xs">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 uppercase">
                  OPERATIONAL &amp; REVENUE ANALYTICS
                </span>
                <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                  Perkin A.5 Deputi Bandara, Pelabuhan &amp; LLB
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight">
                Detail Operasional, Throughput &amp; Layanan Strategis
              </h2>
            </div>
          </div>

          {/* Action Tabs & Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center p-1 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs">
              <button
                onClick={() => setActiveTab('throughput')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'throughput'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Throughput &amp; Cargo</span>
              </button>
              <button
                onClick={() => setActiveTab('revenue')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'revenue'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>PNBP &amp; Revenue</span>
              </button>
              <button
                onClick={() => setActiveTab('ikm_unsur')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ikm_unsur'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>9 Unsur IKM</span>
              </button>
              <button
                onClick={() => setActiveTab('monitoring')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'monitoring'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Monitoring &amp; Alert</span>
              </button>
            </div>

            <button
              onClick={handleExportCsv}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
              title="Unduh Data CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* 6 KEY EXECUTIVE STATS ROW (Sesuai Konsep Banner Gambar Referensi) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-3">
          <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
            <div className="text-[10px] font-mono text-slate-400 uppercase">TOTAL PNBP SERVICES</div>
            <div className="text-base sm:text-lg font-black font-mono text-cyan-300 mt-0.5">
              Rp 565,33 M
            </div>
            <div className="text-[10px] text-emerald-400 font-mono font-bold">108,63% dari Target</div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
            <div className="text-[10px] font-mono text-slate-400 uppercase">RATA-RATA IKM</div>
            <div className="text-base sm:text-lg font-black font-mono text-amber-300 mt-0.5">
              88,45
            </div>
            <div className="text-[10px] text-emerald-400 font-mono font-bold">Mutu A (Sangat Baik)</div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
            <div className="text-[10px] font-mono text-slate-400 uppercase">AVG UTILISASI</div>
            <div className="text-base sm:text-lg font-black font-mono text-white mt-0.5">
              85,57%
            </div>
            <div className="text-[10px] text-cyan-300 font-mono font-bold">Dermaga &amp; Runway</div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
            <div className="text-[10px] font-mono text-slate-400 uppercase">TOP PERFORMER</div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5 truncate">
              Pelabuhan
            </div>
            <div className="text-[10px] text-slate-300 font-mono">Rp 438,35 M (109%)</div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
            <div className="text-[10px] font-mono text-slate-400 uppercase">HIGHEST SLA</div>
            <div className="text-base sm:text-lg font-black text-sky-400 mt-0.5 truncate">
              Lalu Lintas Brg
            </div>
            <div className="text-[10px] text-emerald-400 font-mono font-bold">96,8% Tepat Waktu</div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
            <div className="text-[10px] font-mono text-slate-400 uppercase">OVERALL STATUS</div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">
              Melampaui
            </div>
            <div className="text-[10px] text-emerald-400 font-mono font-bold">100% HIJAU</div>
          </div>
        </div>
      </div>

      {/* 2. SUB-BAR TOGGLE (RINGKASAN GRAFIK VS RINCIAN TABEL) */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Tampilan Data:</span>
          <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'chart'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Grafik Analitik</span>
            </button>
            <button
              onClick={() => setViewMode('detail')}
              className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'detail'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Matriks Rincian</span>
            </button>
          </div>
        </div>

        {activeTab === 'throughput' && (
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-slate-500 font-mono">Fokus Metrik:</span>
            {(['ALL', 'teus', 'kargo_udara', 'penumpang'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setCargoFilter(f)}
                className={`px-2 py-0.5 rounded font-mono font-bold transition-colors cursor-pointer ${
                  cargoFilter === f
                    ? 'bg-slate-800 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f === 'ALL'
                  ? 'Semua'
                  : f === 'teus'
                  ? 'Peti Kemas'
                  : f === 'kargo_udara'
                  ? 'Kargo Udara'
                  : 'Penumpang'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. TAB CONTENT */}
      <div className="p-4 sm:p-5">
        {/* ============================================================== */}
        {/* TAB 1: THROUGHPUT & CARGO FLOW                                 */}
        {/* ============================================================== */}
        {activeTab === 'throughput' && (
          <div className="space-y-4">
            {viewMode === 'chart' ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left 2 Cols: Main Flow Composed Chart */}
                <div className="lg:col-span-2 bg-slate-50/50 rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span>Tren Throughput Peti Kemas (TEUs) &amp; Penumpang (Pax) Per Bulan</span>
                      </h4>
                      <p className="text-xs text-slate-500">
                        Konsolidasi Arus Logistik Batu Ampar &amp; Trafik Bandara Hang Nadim
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
                      TA 2025 BULANAN
                    </span>
                  </div>

                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={MONTHLY_OPERATIONAL_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="bulanShort" tick={{ fontSize: 11 }} />
                        <YAxis
                          yAxisId="left"
                          tick={{ fontSize: 11 }}
                          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                          label={{ value: 'Peti Kemas (TEUs)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748B' }}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          tick={{ fontSize: 11 }}
                          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                          label={{ value: 'Pax Penumpang', angle: 90, position: 'insideRight', fontSize: 10, fill: '#64748B' }}
                        />
                        <Tooltip
                          formatter={(value: any, name: any) => [
                            Number(value).toLocaleString('id-ID'),
                            name === 'petiKemasTeus'
                              ? 'Throughput Peti Kemas (TEUs)'
                              : name === 'penumpangBandaraPax'
                              ? 'Penumpang Bandara (Pax)'
                              : name === 'penumpangPelabuhanPax'
                              ? 'Penumpang Pelabuhan (Pax)'
                              : name === 'kargoUdaraTon'
                              ? 'Kargo Udara (Ton)'
                              : name,
                          ]}
                        />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        {(cargoFilter === 'ALL' || cargoFilter === 'teus') && (
                          <Bar
                            yAxisId="left"
                            dataKey="petiKemasTeus"
                            name="Peti Kemas (TEUs)"
                            fill="#0284C7"
                            radius={[4, 4, 0, 0]}
                          />
                        )}
                        {(cargoFilter === 'ALL' || cargoFilter === 'penumpang') && (
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="penumpangBandaraPax"
                            name="Pax Bandara"
                            stroke="#10B981"
                            strokeWidth={2.5}
                            dot={{ r: 3 }}
                          />
                        )}
                        {(cargoFilter === 'ALL' || cargoFilter === 'penumpang') && (
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="penumpangPelabuhanPax"
                            name="Pax Pelabuhan"
                            stroke="#8B5CF6"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                          />
                        )}
                        {(cargoFilter === 'ALL' || cargoFilter === 'kargo_udara') && (
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="kargoUdaraTon"
                            name="Kargo Udara (Ton)"
                            stroke="#F59E0B"
                            strokeWidth={2}
                          />
                        )}
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right 1 Col: Highlights Summary & Capacity Utilization */}
                <div className="bg-slate-50/50 rounded-2xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-emerald-600" />
                      <span>Kapasitas &amp; Utilisasi Strategis</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Rasio Keterpakaian Aset Logistik &amp; Transportasi
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Pelabuhan Container Yard */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Anchor className="w-3.5 h-3.5 text-blue-600" />
                          <span>Berth &amp; Yard Batu Ampar</span>
                        </span>
                        <span className="font-mono font-bold text-blue-700">86,4%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '86.4%' }} />
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                        <span>Total 612.400 TEUs</span>
                        <span>Dwell: 2,1 Hari</span>
                      </div>
                    </div>

                    {/* Bandara Runway & Apron */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Plane className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Runway &amp; Slot Hang Nadim</span>
                        </span>
                        <span className="font-mono font-bold text-emerald-700">79,1%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: '79.1%' }} />
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                        <span>34.250 Pergerakan</span>
                        <span>4,12 Juta Pax</span>
                      </div>
                    </div>

                    {/* LLB SLA Perizinan */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-amber-600" />
                          <span>SLA Ketepatan Waktu LLB</span>
                        </span>
                        <span className="font-mono font-bold text-amber-700">96,8%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '96.8%' }} />
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                        <span>14.850 SK Terbit</span>
                        <span>&lt; 24 Jam Kerja</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 text-[11px] text-blue-900 leading-relaxed">
                    <span className="font-bold">Catatan Pimpinan:</span> Seluruh aset transportasi utama beroperasi di zona sehat tanpa terjadi bottleneck kritis, didukung sistem STS crane dan otomasi IBOSS.
                  </div>
                </div>
              </div>
            ) : (
              /* Detail Table View */
              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Bulan</th>
                      <th className="p-2.5">Kuartal</th>
                      <th className="p-2.5 text-right">Peti Kemas (TEUs)</th>
                      <th className="p-2.5 text-right">Kargo Udara (Ton)</th>
                      <th className="p-2.5 text-right">Penumpang Bandara (Pax)</th>
                      <th className="p-2.5 text-right">Penumpang Laut (Pax)</th>
                      <th className="p-2.5 text-right">Kunjungan Kapal (Call)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {MONTHLY_OPERATIONAL_DATA.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-sans font-bold text-slate-800">{row.bulan}</td>
                        <td className="p-2.5 text-slate-500">{row.kuartal}</td>
                        <td className="p-2.5 text-right font-bold text-blue-700">
                          {row.petiKemasTeus.toLocaleString('id-ID')}
                        </td>
                        <td className="p-2.5 text-right text-amber-700">
                          {row.kargoUdaraTon.toLocaleString('id-ID')}
                        </td>
                        <td className="p-2.5 text-right text-emerald-700">
                          {row.penumpangBandaraPax.toLocaleString('id-ID')}
                        </td>
                        <td className="p-2.5 text-right text-purple-700">
                          {row.penumpangPelabuhanPax.toLocaleString('id-ID')}
                        </td>
                        <td className="p-2.5 text-right font-bold text-slate-800">
                          {row.kapalCall.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PNBP & REVENUE CONTRIBUTION                             */}
        {/* ============================================================== */}
        {activeTab === 'revenue' && (
          <div className="space-y-4">
            {viewMode === 'chart' ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Donut Chart: Komposisi PNBP per Satker */}
                <div className="bg-slate-50/50 rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <PieIcon className="w-4 h-4 text-sky-600" />
                      <span>Kontribusi PNBP per Satker Pengampu</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Total Realisasi: Rp 565,33 Miliar (108,63%)
                    </p>
                  </div>

                  <div className="h-56 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pnbpDonutData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                        >
                          {pnbpDonutData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(v: any) => [`Rp ${Number(v).toFixed(2)} Miliar`, 'Realisasi PNBP']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-2 text-xs">
                    {pnbpDonutData.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-bold text-slate-800 truncate">{item.name}</span>
                        </div>
                        <div className="text-right shrink-0 font-mono">
                          <span className="font-bold text-slate-900">Rp {item.value.toFixed(1)} M</span>
                          <span className="text-[10px] text-slate-400 ml-1">({item.pct})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bar Chart: Target vs Realisasi Kuartalan */}
                <div className="lg:col-span-2 bg-slate-50/50 rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <span>Kinerja Realisasi vs Target PNBP Kuartalan (Q1 - Q4)</span>
                      </h4>
                      <p className="text-xs text-slate-500">
                        Perbandingan Akumulasi Penerimaan terhadap Target Perkin
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      100% DI ATAS TARGET
                    </span>
                  </div>

                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={quarterlyPnbpData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
                        <YAxis
                          tick={{ fontSize: 11 }}
                          tickFormatter={(v) => `Rp ${v} M`}
                          label={{ value: 'Nilai (Miliar IDR)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748B' }}
                        />
                        <Tooltip
                          formatter={(v: any, name: any) => [
                            `Rp ${Number(v).toFixed(2)} Miliar`,
                            name === 'target'
                              ? 'Target Kuartal'
                              : name === 'total'
                              ? 'Total Realisasi'
                              : name === 'pelabuhan'
                              ? 'Dit. Kepelabuhanan'
                              : name === 'bandara'
                              ? 'Dit. Kawasan Bandara'
                              : 'Dit. Lalu Lintas Barang',
                          ]}
                        />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        <Bar dataKey="pelabuhan" name="Pelabuhan (Rp M)" stackId="a" fill="#0284C7" />
                        <Bar dataKey="bandara" name="Bandara (Rp M)" stackId="a" fill="#0D9488" />
                        <Bar dataKey="llb" name="LLB (Rp M)" stackId="a" fill="#F59E0B" />
                        <Line type="monotone" dataKey="target" name="Target Perkin (Rp M)" stroke="#EF4444" strokeWidth={2.5} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Kuartal</th>
                      <th className="p-2.5 text-right">Dit. Bandara (M)</th>
                      <th className="p-2.5 text-right">Dit. Pelabuhan (M)</th>
                      <th className="p-2.5 text-right">Dit. LLB (M)</th>
                      <th className="p-2.5 text-right">Total Realisasi (M)</th>
                      <th className="p-2.5 text-right">Target Kuartal (M)</th>
                      <th className="p-2.5 text-right">Capaian (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {quarterlyPnbpData.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-sans font-bold text-slate-800">{r.quarter}</td>
                        <td className="p-2.5 text-right text-teal-700">Rp {r.bandara.toFixed(2)} M</td>
                        <td className="p-2.5 text-right text-blue-700">Rp {r.pelabuhan.toFixed(2)} M</td>
                        <td className="p-2.5 text-right text-amber-700">Rp {r.llb.toFixed(2)} M</td>
                        <td className="p-2.5 text-right font-bold text-slate-900">Rp {r.total.toFixed(2)} M</td>
                        <td className="p-2.5 text-right text-slate-500">Rp {r.target.toFixed(2)} M</td>
                        <td className="p-2.5 text-right font-bold text-emerald-600">
                          {((r.total / r.target) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: 9 UNSUR INDEKS KEPUASAN MASYARAKAT (IKM)               */}
        {/* ============================================================== */}
        {activeTab === 'ikm_unsur' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-blue-50/70 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-blue-900 font-mono">
                  IKP-1: Rata-rata IKM Pengguna Layanan = 88,45 (Target: 86,30)
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  MUTU A &bull; SANGAT BAIK
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                Regulasi: PermenPAN-RB No. 14 Tahun 2017 (9 Unsur Standar)
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Unsur Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Unsur Pelayanan</th>
                      <th className="p-2.5 text-right">Bandara</th>
                      <th className="p-2.5 text-right">Pelabuhan</th>
                      <th className="p-2.5 text-right">LLB</th>
                      <th className="p-2.5 text-right">Rata-rata</th>
                      <th className="p-2.5">Predikat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                    {IKM_UNSUR_DETAILS.map((u, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2 font-sans font-bold text-slate-800">
                          {u.unsur}
                          <div className="text-[10px] text-slate-400 font-normal">{u.deskripsi}</div>
                        </td>
                        <td className="p-2 text-right text-slate-700">{u.nilaiBandara.toFixed(1)}</td>
                        <td className="p-2 text-right text-slate-700">{u.nilaiPelabuhan.toFixed(1)}</td>
                        <td className="p-2 text-right text-slate-700">{u.nilaiLlb.toFixed(1)}</td>
                        <td className="p-2 text-right font-bold text-blue-700">{u.nilaiRataRata.toFixed(2)}</td>
                        <td className="p-2 font-sans">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            u.predikat.includes('A') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {u.predikat}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Horizontal Bar Chart for IKM Unsur */}
              <div className="bg-slate-50/50 rounded-2xl border border-slate-200 p-4 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Komparasi Skor 9 Unsur IKM antar Satker</span>
                </h4>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={IKM_UNSUR_DETAILS}
                      layout="vertical"
                      margin={{ top: 5, right: 10, left: 70, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis type="number" domain={[80, 95]} tick={{ fontSize: 10 }} />
                      <YAxis
                        type="category"
                        dataKey="unsur"
                        tick={{ fontSize: 9 }}
                        tickFormatter={(v) => v.split('.')[0]}
                      />
                      <Tooltip
                        formatter={(val: any, name: any) => [
                          `${Number(val).toFixed(1)} / 100`,
                          name === 'nilaiBandara'
                            ? 'Bandara Hang Nadim'
                            : name === 'nilaiPelabuhan'
                            ? 'Pelabuhan Batu Ampar'
                            : 'Lalu Lintas Barang',
                        ]}
                      />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="nilaiPelabuhan" name="Pelabuhan" fill="#0284C7" radius={[0, 3, 3, 0]} />
                      <Bar dataKey="nilaiBandara" name="Bandara" fill="#10B981" radius={[0, 3, 3, 0]} />
                      <Bar dataKey="nilaiLlb" name="LLB" fill="#F59E0B" radius={[0, 3, 3, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: OPERATIONAL MONITORING & STRATEGY (GAMBAR ACUAN)        */}
        {/* ============================================================== */}
        {activeTab === 'monitoring' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left 2 Cols: Operational Monitoring Alerts */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-rose-600" />
                    <span>Operational Monitoring &amp; Status Mitigasi</span>
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">
                    {OPERATIONAL_ALERTS_A5.length} Catatan Operasional
                  </span>
                </div>

                <div className="space-y-2.5">
                  {OPERATIONAL_ALERTS_A5.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        alert.severity === 'high'
                          ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                          : alert.severity === 'medium'
                          ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                          : 'bg-blue-50/70 border-blue-200 text-blue-950'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                alert.severity === 'high'
                                  ? 'bg-rose-600 text-white'
                                  : alert.severity === 'medium'
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-blue-600 text-white'
                              }`}
                            >
                              {alert.category}
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              {alert.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 font-mono">
                            Lokasi: {alert.location} &bull; Metrik: {alert.metric}
                          </p>
                        </div>

                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            alert.severity === 'high'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : alert.severity === 'medium'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-blue-100 text-blue-800 border border-blue-300'
                          }`}
                        >
                          {alert.status}
                        </span>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs text-slate-700 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900">Tindakan Mitigasi:</strong> {alert.actionRequired}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 1 Col: Operational Strategy Insights */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-600" />
                    <span>Operational Strategy Insights</span>
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">3 Pilar A.5</span>
                </div>

                <div className="space-y-3">
                  {OPERATIONAL_STRATEGY_INSIGHTS.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 space-y-1.5 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                        <span className="w-4 h-4 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center text-[10px]">
                          {item.id}
                        </span>
                        <span>{item.unit}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        &ldquo;{item.insight}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>

                {/* Executive Linkage Buttons */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-[11px] font-mono font-bold text-slate-700 uppercase">
                    Executive Quick Linkage:
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => onNavigateToUnit && onNavigateToUnit('dit-bandara')}
                      className="p-2 rounded-lg bg-white border border-slate-200 text-center hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer text-xs"
                    >
                      <Plane className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                      <span className="font-bold text-[10px] text-slate-800 block">Bandara</span>
                    </button>
                    <button
                      onClick={() => onNavigateToUnit && onNavigateToUnit('dit-pelabuhan')}
                      className="p-2 rounded-lg bg-white border border-slate-200 text-center hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer text-xs"
                    >
                      <Anchor className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <span className="font-bold text-[10px] text-slate-800 block">Pelabuhan</span>
                    </button>
                    <button
                      onClick={() => onNavigateToUnit && onNavigateToUnit('dit-lalu-lintas-barang')}
                      className="p-2 rounded-lg bg-white border border-slate-200 text-center hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer text-xs"
                    >
                      <Truck className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                      <span className="font-bold text-[10px] text-slate-800 block">LLB</span>
                    </button>
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
