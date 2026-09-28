import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import {
  ShieldAlert,
  HelpCircle,
  TrendingDown,
  CheckCircle2,
  Filter,
  Search,
  BarChart3,
  Table as TableIcon,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { PIAGAM_RISIKO_DATA } from './bokmrData';

interface PiagamRisikoChartProps {
  onOpenFormula?: (datasetIndex: number) => void;
}

export const PiagamRisikoChart: React.FC<PiagamRisikoChartProps> = ({ onOpenFormula }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [filterUnit, setFilterUnit] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const unitList = ['Semua', ...Array.from(new Set(PIAGAM_RISIKO_DATA.map((r) => r.unitKerja)))];

  const filteredData = PIAGAM_RISIKO_DATA.filter((item) => {
    const matchUnit = filterUnit === 'Semua' || item.unitKerja === filterUnit;
    const matchSearch =
      searchQuery === '' ||
      item.kejadianRisiko.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unitKerja.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nomorPiagam.toLowerCase().includes(searchQuery.toLowerCase());
    return matchUnit && matchSearch;
  });

  const chartData = filteredData.map((item) => ({
    name: item.unitKerja.replace('Badan Usaha ', 'BU ').replace('Pusat Pelayanan Terpadu Satu Pintu', 'PTSP').replace('Fasilitas & Lingkungan (SPAM)', 'SPAM'),
    unitKerja: item.unitKerja,
    nomorPiagam: item.nomorPiagam,
    kejadianRisiko: item.kejadianRisiko,
    besaranAwal: item.besaranRisikoAwalTahun,
    besaranAkhir: item.besaranRisikoAkhirTahun,
    penurunan: item.besaranRisikoAwalTahun - item.besaranRisikoAkhirTahun,
    penurunanPersen: (
      ((item.besaranRisikoAwalTahun - item.besaranRisikoAkhirTahun) / item.besaranRisikoAwalTahun) *
      100
    ).toFixed(1),
    statusMitigasi: item.statusMitigasi,
  }));

  const totalAwal = filteredData.reduce((acc, curr) => acc + curr.besaranRisikoAwalTahun, 0);
  const totalAkhir = filteredData.reduce((acc, curr) => acc + curr.besaranRisikoAkhirTahun, 0);
  const totalPenurunan = totalAwal - totalAkhir;
  const avgPenurunanPersen = totalAwal > 0 ? ((totalPenurunan / totalAwal) * 100).toFixed(1) : '0';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[220px]">
          <div className="font-bold text-rose-300">{data.unitKerja}</div>
          <div className="text-[10.5px] text-slate-300 leading-snug">Kejadian: {data.kejadianRisiko}</div>
          <div className="pt-1.5 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Risiko Awal Tahun:</span>
              <span className="font-mono font-bold text-rose-400">{data.besaranAwal} Poin (Skala 1-25)</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Risiko Akhir Tahun:</span>
              <span className="font-mono font-bold text-emerald-400">{data.besaranAkhir} Poin</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-slate-800 text-[10.5px]">
              <span className="text-slate-400">Tingkat Penurunan:</span>
              <span className="font-mono font-bold text-emerald-300">
                -{data.penurunan} Poin ({data.penurunanPersen}%)
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
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Piagam Risiko Unit Kerja: Evaluasi Mitigasi Awal vs Akhir Tahun
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                100% Terkendali
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Komparasi efektivitas reduksi paparan risiko (inherent risk vs residual risk) per unit kerja
            </p>
          </div>
        </div>

        {/* Right Stats & View Mode Toggle */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Executive Metric */}
          <div className="px-3 py-1.5 rounded-lg bg-rose-50/80 border border-rose-200/80 text-right">
            <div className="text-[10px] font-semibold text-rose-800 uppercase tracking-wide">
              Reduksi Risiko Institusi
            </div>
            <div className="flex items-baseline justify-end gap-1 font-mono">
              <span className="font-black text-base sm:text-lg text-emerald-700">
                -{totalPenurunan} Poin
              </span>
              <span className="text-[10px] font-bold text-emerald-700 ml-1">
                ({avgPenurunanPersen}% Turun)
              </span>
            </div>
          </div>

          {/* Toggle Grafis / Tabel */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-rose-700 shadow-2xs'
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
                  ? 'bg-white text-rose-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(14)}
              className="text-xs text-rose-700 hover:text-rose-900 font-bold px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1 transition-colors"
              title="Kamus & Matriks Risiko"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kamus</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. FILTER & LEGEND */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari risiko / unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500 bg-slate-50/70"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Unit:</span>
            <select
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500 font-medium"
            >
              {unitList.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-rose-700 font-bold">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
            Awal Tahun (Paparan Risiko)
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            Akhir Tahun (Risiko Sisa)
          </span>
        </div>
      </div>

      {/* 3. MAIN CONTENT (CHART OR TABLE) */}
      {viewMode === 'chart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* DUAL BAR COMPARISON CHART */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Komparasi Besaran Risiko Awal vs Akhir (Skala 1 - 25)</span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">Semua Unit Berhasil Menurunkan Risiko &gt; 40%</span>
            </div>

            <div className="h-[210px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis
                    tick={{ fontSize: 10.5, fill: '#64748b' }}
                    domain={[0, 25]}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="besaranAwal"
                    name="Awal Tahun"
                    fill="#f43f5e"
                    radius={[4, 4, 0, 0]}
                    barSize={18}
                  />
                  <Bar
                    dataKey="besaranAkhir"
                    name="Akhir Tahun"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    barSize={18}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* UNIT MITIGATION CARDS */}
          <div className="lg:col-span-5 space-y-2">
            {filteredData.map((item) => {
              const penurunan = item.besaranRisikoAwalTahun - item.besaranRisikoAkhirTahun;
              const penurunanPersen = (
                (penurunan / item.besaranRisikoAwalTahun) *
                100
              ).toFixed(1);

              return (
                <div
                  key={item.nomorPiagam}
                  className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-slate-300 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 truncate" title={item.unitKerja}>
                      {item.unitKerja.replace('Badan Usaha ', 'BU ')}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      -{penurunanPersen}% Reduksi
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-1" title={item.kejadianRisiko}>
                    {item.kejadianRisiko}
                  </p>

                  <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-slate-200/60">
                    <div className="flex items-center gap-1.5">
                      <span className="text-rose-700 font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 text-[10px]">
                        Awal: {item.besaranRisikoAwalTahun}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                        Akhir: {item.besaranRisikoAkhirTahun}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold text-slate-500 font-sans">
                      Status: <strong className="text-emerald-700">{item.statusMitigasi}</strong>
                    </span>
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
                <th className="py-2.5 px-3">Unit Kerja</th>
                <th className="py-2.5 px-3">Kejadian Risiko</th>
                <th className="py-2.5 px-3 text-center">Risiko Awal</th>
                <th className="py-2.5 px-3 text-center">Risiko Akhir</th>
                <th className="py-2.5 px-3 text-center">Penurunan</th>
                <th className="py-2.5 px-3">Status Mitigasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredData.map((item, idx) => {
                const drop = item.besaranRisikoAwalTahun - item.besaranRisikoAkhirTahun;
                const dropPersen = ((drop / item.besaranRisikoAwalTahun) * 100).toFixed(1);

                return (
                  <tr key={item.nomorPiagam} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 text-center text-slate-500 font-semibold">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-900 whitespace-nowrap">
                      {item.unitKerja}
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-700 text-[11px]">
                      {item.kejadianRisiko}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-rose-700">
                      {item.besaranRisikoAwalTahun} ({item.levelAwal})
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-emerald-700">
                      {item.besaranRisikoAkhirTahun} ({item.levelAkhir})
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-emerald-700">
                      -{drop} (-{dropPersen}%)
                    </td>
                    <td className="py-2.5 px-3 font-sans text-emerald-700 font-bold">
                      {item.statusMitigasi}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-rose-50/70 border-t-2 border-rose-200 font-black text-slate-900 font-mono">
                <td colSpan={3} className="py-2.5 px-3 text-rose-950 uppercase text-xs font-sans">
                  Total Reduksi Risiko Organisasi
                </td>
                <td className="py-2.5 px-3 text-center text-rose-900">
                  {totalAwal} Poin
                </td>
                <td className="py-2.5 px-3 text-center text-emerald-800">
                  {totalAkhir} Poin
                </td>
                <td className="py-2.5 px-3 text-center text-emerald-800 text-sm">
                  -{totalPenurunan} (-{avgPenurunanPersen}%)
                </td>
                <td className="py-2.5 px-3 font-sans text-emerald-800 text-[11px]">
                  100% Terkendali
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
