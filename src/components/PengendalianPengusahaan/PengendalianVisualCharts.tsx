import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
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
} from 'recharts';
import {
  TrendingUp,
  PieChart as PieIcon,
  ShieldCheck,
  AlertCircle,
  GitBranch,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  TREN_PENGENDALIAN_TRIWULAN,
  DISTRIBUSI_SKEMA_KERJASAMA,
  PIPELINE_TAHAPAN_TINDAK_LANJUT,
} from './pengendalianData';

export const PengendalianVisualCharts: React.FC = () => {
  const [activeChartTab, setActiveChartTab] = useState<'tren' | 'skema'>('tren');

  // Colors for Donut
  const COLORS = ['#1F3864', '#2E75B6', '#0284C7', '#0D9488', '#F59E0B'];

  return (
    <div className="space-y-5 mb-6">
      {/* 1. Main Visual Section: Tren Capaian Pengawasan vs Tindak Lanjut + Distribusi Skema */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (2 Cols): Interactive Composed Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <h3 className="text-sm font-bold text-slate-800">
                    Tren Kinerja Pengendalian &amp; Tindak Lanjut Perbaikan PKS
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Korelasi % Pelaksanaan Pengendalian (DS #3) vs % Tindak Lanjut (DS #4) serta Setoran PNBP Bagi Hasil
                </p>
              </div>

              {/* Toggle Chart Metric */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                <button
                  onClick={() => setActiveChartTab('tren')}
                  className={`px-3 py-1 rounded-md font-medium cursor-pointer transition-all ${
                    activeChartTab === 'tren'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tren Triwulanan
                </button>
                <button
                  onClick={() => setActiveChartTab('skema')}
                  className={`px-3 py-1 rounded-md font-medium cursor-pointer transition-all ${
                    activeChartTab === 'skema'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Kontribusi Bagi Hasil
                </button>
              </div>
            </div>

            {/* Recharts Chart Area */}
            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={TREN_PENGENDALIAN_TRIWULAN} margin={{ top: 10, right: 15, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="triwulan"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  {/* Left Y Axis: Percentage */}
                  <YAxis
                    yAxisId="left"
                    domain={[70, 100]}
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    unit="%"
                  />
                  {/* Right Y Axis: Setoran Miliar */}
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 150]}
                    tick={{ fill: '#0EA5E9', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    unit=" M"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F1E36',
                      borderColor: '#1E293B',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                    formatter={(value: any, name: any) => {
                      if (name === 'Setoran PNBP Bagi Hasil') return [`Rp ${value} Miliar`, name];
                      return [`${value}%`, name];
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '11px', color: '#475569' }}
                  />
                  {/* Bar: Setoran PNBP */}
                  <Bar
                    yAxisId="right"
                    dataKey="setoranMiliar"
                    name="Setoran PNBP Bagi Hasil"
                    fill="#93C5FD"
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                    opacity={0.65}
                  />
                  {/* Line 1: Realisasi Pengawasan (Dataset 3) */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="realisasiPengawasan"
                    name="% Pelaksanaan Pengendalian (DS #3)"
                    stroke="#1D4ED8"
                    strokeWidth={3}
                    dot={{ fill: '#1D4ED8', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  {/* Line 2: Realisasi Tindak Lanjut (Dataset 4) */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="realisasiTindakLanjut"
                    name="% Hasil Perbaikan Ditindaklanjuti (DS #4)"
                    stroke="#0D9488"
                    strokeWidth={2.5}
                    strokeDasharray="4 4"
                    dot={{ fill: '#0D9488', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stat Footer Bar */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-50 p-2 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Rata-rata Pengendalian</span>
              <strong className="text-blue-700 font-mono text-sm">93.9%</strong>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Rata-rata Tindak Lanjut</span>
              <strong className="text-teal-700 font-mono text-sm">90.3%</strong>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Total PNBP Bagi Hasil</span>
              <strong className="text-slate-900 font-mono text-sm">Rp 418.7 M</strong>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Distribusi Skema Kemitraan Usaha */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
              <div className="flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-800">
                  Struktur Skema Kemitraan
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-bold border border-sky-200">
                43 Kontrak
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-2">
              Distribusi 43 Kontrak Kemitraan Berjalan di BP Batam
            </p>

            {/* Donut Chart */}
            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DISTRIBUSI_SKEMA_KERJASAMA}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="jumlahMitra"
                  >
                    {DISTRIBUSI_SKEMA_KERJASAMA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F1E36',
                      borderColor: '#1E293B',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                    formatter={(value: any, name: any, props: any) => [
                      `${value} Kontrak (Inv: Rp ${props.payload.nilaiInvestasi} M)`,
                      props.payload.skema,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-black text-slate-800 font-mono">43</span>
                <span className="text-[9px] uppercase font-bold text-slate-400">Mitra PKS</span>
              </div>
            </div>

            {/* Legend List */}
            <div className="space-y-1.5 mt-2">
              {DISTRIBUSI_SKEMA_KERJASAMA.map((item, idx) => (
                <div key={item.skema} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-slate-600 truncate">{item.skema}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono shrink-0">
                    <span className="font-bold text-slate-800">{item.jumlahMitra}</span>
                    <span className="text-[10px] text-slate-400">({item.pnbpTahunan} M)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>Skema BTO dan KSO menyumbang 84% nilai investasi kemitraan.</span>
          </div>
        </div>
      </div>

      {/* 2. Executive Flow: Pipeline Tahapan Tindak Lanjut Perbaikan PKS (No Table, Clean Visual Flow) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Pipeline Tahapan Tindak Lanjut Rekomendasi &amp; Restrukturisasi PKS
            </h3>
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
            Tingkat Penyelesaian Keseluruhan: 91.8%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PIPELINE_TAHAPAN_TINDAK_LANJUT.map((item, idx) => (
            <div
              key={item.tahap}
              className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-sky-300 transition-all shadow-2xs relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${item.color}`}>
                  {item.tahap}
                </span>
                <span className="text-sm font-black font-mono text-slate-900">
                  {item.count}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                {item.desc}
              </p>
              {/* Progress Bar inside Card */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Konversi Tahap</span>
                  <span className="font-bold text-slate-700">{item.persentase}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${item.persentase}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
