import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  HelpCircle,
  Award,
  BarChart3,
  Table as TableIcon,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  SAKIP_COMPONENTS_DATA,
  TOTAL_BOBOT_SAKIP,
  TOTAL_NILAI_SAKIP,
  PREDIKAT_SAKIP,
} from './bokmrData';

interface SakipEvaluationViewProps {
  onOpenFormula?: (datasetIndex: number) => void;
}

export const SakipEvaluationView: React.FC<SakipEvaluationViewProps> = ({ onOpenFormula }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  // Chart data focusing strictly on Komponen yang Dinilai, Bobot, and Nilai
  const chartData = SAKIP_COMPONENTS_DATA.map((item, idx) => ({
    no: idx + 1,
    komponen: item.komponen,
    shortName: item.komponen.replace(' Kinerja', '').replace(' Akuntabilitas', ''),
    bobot: item.bobot,
    nilai: item.nilai,
    capaianPersen: item.capaianPersen,
    tingkat: item.tingkatAkuntabilitas,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold text-sky-300">{data.komponen}</div>
          <div className="pt-1 border-t border-slate-800 space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Bobot Komponen:</span>
              <span className="font-mono font-bold text-amber-400">{data.bobot.toFixed(2)} Poin</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Nilai Realisasi:</span>
              <span className="font-mono font-bold text-emerald-400">{data.nilai.toFixed(2)} Poin</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-slate-800">
              <span className="text-slate-400">Tingkat Capaian:</span>
              <span className="font-mono font-bold text-sky-300">{data.capaianPersen.toFixed(1)}% (Predikat {data.tingkat})</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs font-sans space-y-3.5">
      {/* HEADER STANDAR PEMBANGUNAN INFRASTRUKTUR & SHEET SWAP TOGGLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200 shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono">
                DATASET NO. 2 (Hal. 38)
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Nilai Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 font-mono">
                🏷️ Visualisasi: Grafik Batang Komparasi Bobot &amp; Nilai Realisasi (Grouped Bar Chart)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Atribut yang Ditampilkan: <strong>Komponen yang Dinilai</strong>, <strong>Bobot</strong>, <strong>Nilai</strong> (Hal. 38)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* SHEET SWAP TOGGLE: GRAFIS VS TABEL */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200/80'
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
                  ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          <div className="text-right px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100">
            <span className="text-[9.5px] font-bold text-indigo-700 block">Total Nilai SAKIP</span>
            <span className="font-mono font-black text-xs text-indigo-950">
              {TOTAL_NILAI_SAKIP.toFixed(2)} / {TOTAL_BOBOT_SAKIP} ({PREDIKAT_SAKIP})
            </span>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(2)}
              className="text-[10.5px] text-indigo-700 hover:text-indigo-900 font-semibold px-2 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1 transition-colors"
              title="Kamus & Formula SAKIP"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kamus</span>
            </button>
          )}
        </div>
      </div>

      {/* SHEET SWAP VIEW 1: GRAFIS (CHART COMPARISON & SUMMARY CARDS) */}
      {viewMode === 'chart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
          <div className="lg:col-span-7 h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="shortName"
                  tick={{ fontSize: 10.5, fill: '#475569', fontWeight: 600 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 35]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }}
                  iconType="circle"
                />
                <Bar
                  dataKey="bobot"
                  name="Bobot Komponen"
                  fill="#94a3b8"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
                <Bar
                  dataKey="nilai"
                  name="Nilai Komponen"
                  fill="#4f46e5"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* SUMMARY CARDS BY COMPONENT */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2">
            {SAKIP_COMPONENTS_DATA.map((item, idx) => (
              <div
                key={item.id}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100/70 transition-colors"
              >
                <span className="text-[10px] font-bold text-slate-500 block truncate" title={item.komponen}>
                  {idx + 1}. {item.komponen}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <div>
                    <span className="text-base font-black text-slate-900 font-mono">
                      {item.nilai.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold ml-1">
                      / {item.bobot.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                    {item.capaianPersen.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all"
                    style={{ width: `${item.capaianPersen}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SHEET SWAP VIEW 2: TABULAR VIEW (HANYA NO, KOMPONEN YANG DINILAI, BOBOT, NILAI) */
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-2.5 px-3 text-center w-12">No</th>
                <th className="py-2.5 px-3">Komponen yang Dinilai</th>
                <th className="py-2.5 px-3 text-right">Bobot</th>
                <th className="py-2.5 px-3 text-right">Nilai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SAKIP_COMPONENTS_DATA.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-500 font-semibold">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {item.komponen}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-700">
                    {item.bobot.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-black text-indigo-700 text-xs">
                    {item.nilai.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-indigo-50/70 border-t-2 border-indigo-200 font-black text-slate-900">
                <td colSpan={2} className="py-2.5 px-3 text-indigo-950 uppercase text-[10.5px]">
                  Total Nilai SAKIP BP Batam
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-indigo-950">
                  {TOTAL_BOBOT_SAKIP.toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-indigo-700 text-xs">
                  {TOTAL_NILAI_SAKIP.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
