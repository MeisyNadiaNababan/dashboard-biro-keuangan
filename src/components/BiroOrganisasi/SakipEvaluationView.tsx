import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  HelpCircle,
  Award,
  BarChart3,
  Table as TableIcon,
  TrendingUp,
  Target,
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
  ReferenceLine,
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
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  // Clean formatted data for chart
  const chartData = SAKIP_COMPONENTS_DATA.map((item, idx) => ({
    id: item.id,
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
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[200px]">
          <div className="font-bold text-sky-300">{data.komponen}</div>
          <div className="pt-1.5 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Realisasi Nilai:</span>
              <span className="font-mono font-bold text-emerald-400">{data.nilai.toFixed(2)} Poin</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Bobot Maksimal:</span>
              <span className="font-mono font-semibold text-slate-300">{data.bobot.toFixed(2)} Poin</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-slate-800">
              <span className="text-slate-400">Efektivitas Capaian:</span>
              <span className="font-mono font-bold text-sky-300">{data.capaianPersen.toFixed(1)}% (Predikat {data.tingkat})</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs font-sans space-y-4">
      {/* 1. COMPACT EXECUTIVE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Nilai Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP)
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Predikat {PREDIKAT_SAKIP}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluasi akuntabilitas 4 komponen strategis BP Batam berdasar standar KemenPAN-RB
            </p>
          </div>
        </div>

        {/* Right Scorecard & View Mode Toggle */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Big Scorecard */}
          <div className="px-3 py-1.5 rounded-lg bg-indigo-50/80 border border-indigo-200/80 text-right">
            <div className="text-[10px] font-semibold text-indigo-700 uppercase tracking-wide">
              Skor SAKIP Institusi
            </div>
            <div className="flex items-baseline justify-end gap-1">
              <span className="font-mono font-black text-base sm:text-lg text-indigo-950">
                {TOTAL_NILAI_SAKIP.toFixed(2)}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">/ 100</span>
              <span className="text-[10px] font-bold text-emerald-700 font-mono ml-1">
                (+2.68 dari target 80.0)
              </span>
            </div>
          </div>

          {/* Toggle Grafis / Tabel */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-indigo-700 shadow-2xs'
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
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(2)}
              className="text-xs text-indigo-700 hover:text-indigo-900 font-bold px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1 transition-colors"
              title="Kamus & Formula SAKIP"
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
          {/* LEFT: VISUAL GROUPED BAR CHART */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Perbandingan Bobot vs Realisasi per Komponen</span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">Semua Komponen &gt; 80% (Predikat A)</span>
            </div>

            <div className="h-[210px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="shortName"
                    tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis
                    tick={{ fontSize: 10.5, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 35]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="bobot"
                    name="Bobot Komponen"
                    fill="#94a3b8"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    dataKey="nilai"
                    name="Realisasi Nilai"
                    fill="#4f46e5"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT: 4 CLEAN METRIC CARDS WITH PROGRESS */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5">
            {SAKIP_COMPONENTS_DATA.map((item, idx) => {
              const isSelected = selectedComponentId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedComponentId(isSelected ? null : item.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-200'
                      : 'bg-slate-50/80 border-slate-200/90 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 truncate" title={item.komponen}>
                      {idx + 1}. {item.komponen}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                      {item.capaianPersen.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-xl font-black text-slate-900 font-mono">
                      {item.nilai.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold font-mono">
                      / {item.bobot.toFixed(1)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${item.capaianPersen}%` }}
                    />
                  </div>

                  {/* Subcomponents Preview when clicked */}
                  {isSelected && item.subKomponen && (
                    <div className="mt-2.5 pt-2 border-t border-indigo-200/60 space-y-1 text-[10px] font-mono text-slate-600">
                      {item.subKomponen.map((sub, sIdx) => (
                        <div key={sIdx} className="flex justify-between">
                          <span className="truncate pr-1">{sub.nama.split('(')[0]}</span>
                          <span className="font-bold text-indigo-950">{sub.nilai.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
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
                <th className="py-2.5 px-3">Komponen yang Dinilai</th>
                <th className="py-2.5 px-3 text-right">Bobot</th>
                <th className="py-2.5 px-3 text-right">Nilai Realisasi</th>
                <th className="py-2.5 px-3 text-center">% Capaian</th>
                <th className="py-2.5 px-3 text-center">Tingkat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {SAKIP_COMPONENTS_DATA.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center text-slate-500 font-semibold">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    {item.komponen}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-600">
                    {item.bobot.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-black text-indigo-700 text-sm">
                    {item.nilai.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-emerald-700">
                    {item.capaianPersen.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      {item.tingkatAkuntabilitas}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-indigo-50/70 border-t-2 border-indigo-200 font-black text-slate-900">
                <td colSpan={2} className="py-2.5 px-3 text-indigo-950 uppercase text-xs font-sans">
                  Total Nilai SAKIP BP Batam
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-indigo-950">
                  {TOTAL_BOBOT_SAKIP.toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-indigo-700 text-base">
                  {TOTAL_NILAI_SAKIP.toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-center font-mono text-emerald-700">
                  {((TOTAL_NILAI_SAKIP / TOTAL_BOBOT_SAKIP) * 100).toFixed(1)}%
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-bold font-mono">
                    {PREDIKAT_SAKIP}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
