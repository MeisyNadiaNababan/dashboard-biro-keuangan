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
} from 'lucide-react';
import { PEKPPP_DATA, BOKMR_SUMMARY } from './bokmrData';

interface PekpppChartProps {
  onOpenFormula?: (datasetIndex: number) => void;
}

export const PekpppChart: React.FC<PekpppChartProps> = ({ onOpenFormula }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const chartData = PEKPPP_DATA.map((item) => ({
    name: item.unitKerja.replace('BP Batam', '').replace('Terminal Penumpang ', '').trim(),
    unitKerja: item.unitKerja,
    capaianIndeks: item.capaianIndeks,
    kategori: item.kategori,
    predikat: item.predikat,
    tahun: item.tahun,
  }));

  const avgIndeks = (
    PEKPPP_DATA.reduce((acc, curr) => acc + curr.capaianIndeks, 0) / PEKPPP_DATA.length
  ).toFixed(2);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold text-teal-300">{data.unitKerja}</div>
          <div className="pt-1.5 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Capaian Indeks PEKPPP:</span>
              <span className="font-mono font-bold text-teal-300 text-sm">
                {data.capaianIndeks.toFixed(2)} / 5.00
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Kategori Evaluasi:</span>
              <span className="font-bold text-amber-400">{data.kategori}</span>
            </div>
            <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-300">
              Predikat: {data.predikat} (Evaluasi KemenPAN-RB {data.tahun})
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs font-sans space-y-3.5">
      {/* HEADER STANDAR PEMBANGUNAN INFRASTRUKTUR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shrink-0">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono">
                DATASET NO. 16 (Hal. 40)
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Pemantauan dan Evaluasi Kinerja Penyelenggaraan Pelayanan Publik (PEKPPP)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                🏷️ Visualisasi: Grafik Batang Berperingkat (Ranked Bar Chart with Target Line)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Atribut yang Ditampilkan: <strong>Unit Kerja</strong> &amp; <strong>Capaian Indeks (Skala 5.00)</strong> (Hal. 40)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* SHEET SWAP TOGGLE */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-teal-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Grafis</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-teal-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          <div className="text-right px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200">
            <span className="text-[9.5px] font-bold text-teal-800 block">Rata-rata Indeks</span>
            <span className="font-mono font-black text-xs text-teal-950">
              {avgIndeks} / 5.00 (Pelayanan Prima)
            </span>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(16)}
              className="text-[10.5px] text-teal-700 hover:text-teal-900 font-semibold px-2 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 flex items-center gap-1 transition-colors"
              title="Kamus & Formula PEKPPP"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kamus</span>
            </button>
          )}
        </div>
      </div>

      {/* SHEET SWAP VIEW 1: GRAFIS */}
      {viewMode === 'chart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* BAR CHART WITH BENCHMARK LINE */}
          <div className="lg:col-span-7 h-[230px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  domain={[3.5, 5.0]}
                  tick={{ fontSize: 10, fill: '#64748b' }}
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
                    position: 'right',
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
                    position: 'right',
                  }}
                />
                <Bar
                  dataKey="capaianIndeks"
                  name="Capaian Indeks"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.capaianIndeks >= 4.5 ? '#0d9488' : '#14b8a6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* SUMMARY CARDS OF UNIT KERJA & CAPAIAN INDEKS */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2">
            {PEKPPP_DATA.map((item, idx) => (
              <div
                key={item.id}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    UNIT #{idx + 1}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                    {item.predikat}
                  </span>
                </div>
                <h4 className="text-[11px] font-bold text-slate-900 mt-1 line-clamp-1" title={item.unitKerja}>
                  {item.unitKerja}
                </h4>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-black text-teal-900 font-mono">
                    {item.capaianIndeks.toFixed(2)}
                  </span>
                  <span className="text-[10.5px] text-slate-400 font-medium">/ 5.00</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="bg-teal-600 h-full rounded-full"
                    style={{ width: `${(item.capaianIndeks / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SHEET SWAP VIEW 2: TABEL (HAPUS PREDIKAT, PERSENTASE, STATUS) */
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-2.5 px-3 text-center w-12">No</th>
                <th className="py-2.5 px-3">Unit Kerja Evaluasi</th>
                <th className="py-2.5 px-3 text-center">Capaian Indeks (Skala 5.00)</th>
                <th className="py-2.5 px-3">Kategori Evaluasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PEKPPP_DATA.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-500 font-semibold">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {item.unitKerja}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-black text-teal-700 text-xs">
                    <span className="px-2 py-0.5 rounded bg-teal-50 border border-teal-200">
                      {item.capaianIndeks.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 font-medium">
                    {item.kategori}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-teal-50/70 border-t-2 border-teal-200 font-black text-slate-900">
                <td colSpan={2} className="py-2.5 px-3 text-teal-950 uppercase text-[10.5px]">
                  Rata-rata Indeks Pelayanan Publik (PEKPPP) BP Batam
                </td>
                <td className="py-2.5 px-3 text-center font-mono text-teal-950 text-xs">
                  {avgIndeks} / 5.00
                </td>
                <td className="py-2.5 px-3 text-teal-950">
                  A (Pelayanan Prima)
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
