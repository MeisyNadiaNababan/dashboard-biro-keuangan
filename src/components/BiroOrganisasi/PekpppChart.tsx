import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  Building,
  CheckCircle2,
  HelpCircle,
  Award,
  Star,
  BarChart3,
  Table as TableIcon,
  ShieldCheck,
} from 'lucide-react';
import { PEKPPP_DATA } from './bokmrData';

interface PekpppChartProps {
  onOpenFormula?: (datasetIndex: number) => void;
}

export const PekpppChart: React.FC<PekpppChartProps> = ({ onOpenFormula }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  // Sorted by score descending for executive ranking
  const sortedData = [...PEKPPP_DATA].sort((a, b) => b.capaianIndeks - a.capaianIndeks);

  const chartData = sortedData.map((item, idx) => ({
    rank: idx + 1,
    name: item.unitKerja.replace('BP Batam', '').replace('Terminal Penumpang ', '').trim(),
    unitKerja: item.unitKerja,
    capaianIndeks: item.capaianIndeks,
    kategori: item.kategori,
    predikat: item.predikat,
    tahun: item.tahun,
    isPrima: item.capaianIndeks >= 4.5,
  }));

  const avgIndeks = (
    PEKPPP_DATA.reduce((acc, curr) => acc + curr.capaianIndeks, 0) / PEKPPP_DATA.length
  ).toFixed(2);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[200px]">
          <div className="font-bold text-teal-300 flex items-center justify-between gap-2">
            <span>{data.unitKerja}</span>
            <span className="text-[10px] font-mono text-slate-400">Peringkat #{data.rank}</span>
          </div>
          <div className="pt-1.5 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Indeks Capaian:</span>
              <span className="font-mono font-bold text-teal-300 text-sm">
                {data.capaianIndeks.toFixed(2)} / 5.00
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Kategori Mutu:</span>
              <span className="font-semibold text-amber-300">{data.kategori}</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-slate-800 text-[10.5px]">
              <span className="text-slate-400">Status Target (4.00):</span>
              <span className="font-bold text-emerald-400 font-mono">
                +{(data.capaianIndeks - 4.0).toFixed(2)} Melampaui
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs font-sans space-y-4">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Pemantauan dan Evaluasi Kinerja Penyelenggaraan Pelayanan Publik (PEKPPP)
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                A- (Sangat Baik)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluasi kepatuhan standar pelayanan pada 4 unit lokus pelayanan publik BP Batam
            </p>
          </div>
        </div>

        {/* Right Stats & View Mode Toggle */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Summary Scorecard */}
          <div className="px-3 py-1.5 rounded-lg bg-teal-50/80 border border-teal-200/80 text-right">
            <div className="text-[10px] font-semibold text-teal-800 uppercase tracking-wide">
              Rata-rata Skor PEKPPP
            </div>
            <div className="flex items-baseline justify-end gap-1">
              <span className="font-mono font-black text-base sm:text-lg text-teal-950">
                {avgIndeks}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">/ 5.00</span>
              <span className="text-[10px] font-bold text-teal-700 font-mono ml-1">
                (Target 4.00)
              </span>
            </div>
          </div>

          {/* Toggle Grafis / Tabel */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-teal-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Grafis</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-teal-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(16)}
              className="text-xs text-teal-700 hover:text-teal-900 font-bold px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 flex items-center gap-1 transition-colors"
              title="Kamus & Formula PEKPPP"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kamus</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. MAIN CONTENT (CHART OR TABLE) */}
      {viewMode === 'chart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* BAR CHART WITH BENCHMARK LINE */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Peringkat Capaian Indeks per Lokus Pelayanan</span>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
                  Prima (&ge; 4.50)
                </span>
                <span className="flex items-center gap-1 text-teal-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-teal-600" />
                  Sangat Baik (&ge; 4.00)
                </span>
              </div>
            </div>

            <div className="h-[210px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10.5, fill: '#334155', fontWeight: 600 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis
                    domain={[3.5, 5.0]}
                    tick={{ fontSize: 10.5, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine
                    y={4.5}
                    stroke="#10b981"
                    strokeDasharray="3 3"
                    label={{
                      value: 'Prima (4.50)',
                      fill: '#059669',
                      fontSize: 10,
                      position: 'top',
                    }}
                  />
                  <ReferenceLine
                    y={4.0}
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                    label={{
                      value: 'Target (4.00)',
                      fill: '#d97706',
                      fontSize: 10,
                      position: 'top',
                    }}
                  />
                  <Bar
                    dataKey="capaianIndeks"
                    name="Capaian Indeks"
                    radius={[4, 4, 0, 0]}
                    barSize={26}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.capaianIndeks >= 4.5 ? '#059669' : '#0d9488'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* UNIT SUMMARY CARDS */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5">
            {sortedData.map((item, idx) => {
              const isPrima = item.capaianIndeks >= 4.5;
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      RANK #{idx + 1}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold font-mono border ${
                        isPrima
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-teal-50 text-teal-800 border-teal-200'
                      }`}
                    >
                      {item.kategori.split('(')[0].trim()}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mt-1 truncate" title={item.unitKerja}>
                    {item.unitKerja.replace('BP Batam', '').trim()}
                  </h4>

                  <div className="flex items-baseline gap-1 mt-1.5">
                    <span className="text-xl font-black text-slate-900 font-mono">
                      {item.capaianIndeks.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold font-mono">/ 5.00</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isPrima ? 'bg-emerald-600' : 'bg-teal-600'
                      }`}
                      style={{ width: `${(item.capaianIndeks / 5) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-2.5 px-3 text-center w-12">No</th>
                <th className="py-2.5 px-3">Unit Pelayanan Evaluasi</th>
                <th className="py-2.5 px-3 text-center">Capaian Indeks (Skala 5.00)</th>
                <th className="py-2.5 px-3 text-center">Deviasi Target (4.00)</th>
                <th className="py-2.5 px-3">Kategori Evaluasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-500 font-semibold">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {item.unitKerja}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-black text-teal-700 text-sm">
                    {item.capaianIndeks.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700">
                    +{(item.capaianIndeks - 4.0).toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 font-medium">
                    <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">
                      {item.kategori}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-teal-50/70 border-t-2 border-teal-200 font-black text-slate-900">
                <td colSpan={2} className="py-2.5 px-3 text-teal-950 uppercase text-xs">
                  Rata-rata Indeks Pelayanan Publik (PEKPPP)
                </td>
                <td className="py-2.5 px-3 text-center font-mono text-teal-950 text-base">
                  {avgIndeks} / 5.00
                </td>
                <td className="py-2.5 px-3 text-center font-mono text-emerald-800">
                  +{(Number(avgIndeks) - 4.0).toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-teal-950">
                  A- (Pelayanan Sangat Baik)
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
