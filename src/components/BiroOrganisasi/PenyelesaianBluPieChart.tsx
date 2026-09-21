import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  PieChart as PieIcon,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Layers,
  Sparkles,
  TrendingUp,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { PENYELESAIAN_REKOMENDASI_BLU, MODERNISASI_BLU_DATA } from './bokmrData';

export const PenyelesaianBluPieChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rekomendasi' | 'modernisasi'>('rekomendasi');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Data for Dataset #6 Pie Chart
  const pieDataRekomendasi = PENYELESAIAN_REKOMENDASI_BLU.map((item) => ({
    name: item.entitasPengawas,
    value: item.persentasePenyelesaian,
    total: item.rekomendasiTotal,
    selesai: item.rekomendasiSelesai,
    proses: item.rekomendasiProses,
    color: item.color,
    kategori: item.kategori,
  }));

  // Data for Dataset #7 Modernisasi
  const barDataModernisasi = MODERNISASI_BLU_DATA.map((item) => ({
    name: item.inisiatif.length > 28 ? item.inisiatif.slice(0, 28) + '...' : item.inisiatif,
    fullName: item.inisiatif,
    capaian: item.capaian,
    target: item.target,
    semester: item.semester,
    status: item.status,
    detail: item.detail,
  }));

  const COLORS_BLU = ['#0284c7', '#10b981', '#f59e0b', '#6366f1'];

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold text-sky-300">{data.name}</div>
          <div className="text-slate-300 text-[11px]">{data.kategori}</div>
          <div className="pt-1 border-t border-slate-800 flex items-center justify-between gap-4">
            <span className="text-slate-400">Persentase Selesai:</span>
            <span className="font-bold text-emerald-400 font-mono text-sm">{data.value}%</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Rekomendasi:</span>
            <span>{data.selesai} selesai dari {data.total} ({data.proses} proses)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* HEADER WITH TOGGLE */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-sky-50 text-sky-700 rounded-xl">
            <PieIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Persentase Penyelesaian Pengawasan & Modernisasi BLU
              </h3>
              <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded font-bold text-[10px] font-mono">
                DATASET NO. 6 & NO. 7
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Monitoring Tindak Lanjut Rekomendasi Dewas, SPI, Komite Audit & Roadmap Modernisasi BLU
            </p>
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('rekomendasi')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'rekomendasi'
                ? 'bg-white text-sky-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Penyelesaian Rekomendasi (DS #6)
          </button>
          <button
            onClick={() => setActiveTab('modernisasi')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'modernisasi'
                ? 'bg-white text-sky-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Modernisasi BLU (DS #7)
          </button>
        </div>
      </div>

      {activeTab === 'rekomendasi' ? (
        /* TAB 1: DATASET #6 - PIE CHART PENYELESAIAN REKOMENDASI */
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* PIE / DONUT CHART */}
            <div className="lg:col-span-5 h-[260px] flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Pie
                    data={pieDataRekomendasi}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {pieDataRekomendasi.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={activeIndex === index ? '#0f172a' : '#ffffff'}
                        strokeWidth={activeIndex === index ? 2 : 1}
                        style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* CENTER TEXT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400">Rata-rata</span>
                <span className="text-xl font-black text-slate-800 font-mono">95.26%</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Terselesaikan</span>
              </div>
            </div>

            {/* 4 CARDS OF PENYELESAIAN */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PENYELESAIAN_REKOMENDASI_BLU.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100/80 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs font-bold text-slate-800 line-clamp-1">
                        {item.entitasPengawas.replace('Penyelesaian ', '')}
                      </span>
                    </div>
                    <span className="text-xs font-black font-mono text-slate-900">
                      {item.persentasePenyelesaian.toFixed(1)}%
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 line-clamp-1 mb-2">
                    {item.kategori}
                  </p>

                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.persentasePenyelesaian}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="text-emerald-700 font-medium">
                      ✓ {item.rekomendasiSelesai} Selesai
                    </span>
                    <span>{item.rekomendasiProses} Proses</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: DATASET #7 - MODERNISASI PENGELOLAAN BLU */
        <div className="space-y-3">
          <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl text-xs flex items-center justify-between">
            <span className="text-sky-900 font-semibold">
              Progres Rencana Aksi Modernisasi Pengelolaan BLU (Dataset #7)
            </span>
            <span className="font-mono font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
              Rata-rata: 93.18%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MODERNISASI_BLU_DATA.map((mod) => (
              <div
                key={mod.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800 leading-snug">
                    {mod.inisiatif}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      mod.status === 'Tuntas'
                        ? 'bg-emerald-100 text-emerald-800'
                        : mod.status === 'Sesuai Target'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {mod.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {mod.detail}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">{mod.semester} {mod.tahun}</span>
                  <span className="font-mono font-bold text-slate-900">{mod.capaian}%</span>
                </div>

                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-600 h-full rounded-full transition-all"
                    style={{ width: `${mod.capaian}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
