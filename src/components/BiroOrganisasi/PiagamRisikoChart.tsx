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
    name: item.unitKerja.replace('Badan Usaha ', 'BU ').replace('Pusat Pelayanan Terpadu Satu Pintu', 'PTSP'),
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold text-rose-300">{data.unitKerja}</div>
          <div className="text-[10.5px] text-slate-300">Kejadian: {data.kejadianRisiko}</div>
          <div className="pt-1.5 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-rose-400">Besaran Risiko Awal Tahun:</span>
              <span className="font-mono font-bold text-rose-300">{data.besaranAwal} (Skala 1 - 25)</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-emerald-400">Besaran Risiko Akhir Tahun:</span>
              <span className="font-mono font-bold text-emerald-300">{data.besaranAkhir} (Skala 1 - 25)</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-slate-800 text-sky-300 font-semibold">
              <span>Penurunan Risiko:</span>
              <span className="font-mono text-emerald-400">-{data.penurunan} Poin ({data.penurunanPersen}%)</span>
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
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200 shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono">
                DATASET NO. 14 (Hal. 40)
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Piagam Risiko Unit Kerja (Evaluasi Mitigasi Awal vs Akhir Tahun)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-mono">
                🏷️ Visualisasi: Grafik Batang Ganda Komparasi Risiko (Dual-Bar Comparison Chart)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Atribut yang Ditampilkan: <strong>Kejadian Risiko</strong>, <strong>Unit Kerja</strong>, <strong>Besaran Risiko Awal Tahun</strong>, <strong>Besaran Risiko Akhir Tahun</strong> (Hal. 40)
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
                  ? 'bg-white text-rose-700 shadow-2xs border border-slate-200/80'
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
                  ? 'bg-white text-rose-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          <div className="text-right px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200">
            <span className="text-[9.5px] font-bold text-rose-800 block">Efektivitas Mitigasi</span>
            <span className="font-mono font-black text-xs text-rose-950">
              100% Risiko Terkendali
            </span>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(14)}
              className="text-[10.5px] text-rose-700 hover:text-rose-900 font-semibold px-2 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1 transition-colors"
              title="Kamus & Matriks Risiko"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kamus</span>
            </button>
          )}
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kejadian risiko / unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10.5px] text-slate-500 font-medium">Unit:</span>
            <select
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
            >
              {unitList.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-semibold">
            ● Awal Tahun (Risk Exposure)
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
            ● Akhir Tahun (Residual Risk)
          </span>
        </div>
      </div>

      {/* SHEET SWAP VIEW 1: GRAFIS */}
      {viewMode === 'chart' ? (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10.5, fill: '#475569', fontWeight: 600 }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#64748b' }}
                domain={[0, 25]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }}
                iconType="circle"
              />
              <Bar
                dataKey="besaranAwal"
                name="Besaran Risiko Awal Tahun"
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
                barSize={18}
              />
              <Bar
                dataKey="besaranAkhir"
                name="Besaran Risiko Akhir Tahun"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        /* SHEET SWAP VIEW 2: TABEL (HANYA NO, UNIT KERJA, KEJADIAN RISIKO, BESARAN RISIKO AWAL TAHUN, BESARAN RISIKO AKHIR TAHUN) */
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-2.5 px-3 text-center w-12">No</th>
                <th className="py-2.5 px-3">Unit Kerja</th>
                <th className="py-2.5 px-3">Kejadian Risiko</th>
                <th className="py-2.5 px-3 text-center">Besaran Risiko Awal Tahun</th>
                <th className="py-2.5 px-3 text-center">Besaran Risiko Akhir Tahun</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, idx) => (
                <tr key={item.nomorPiagam} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-500 font-semibold">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 whitespace-nowrap">
                    {item.unitKerja}
                  </td>
                  <td className="py-2.5 px-3 text-slate-800 font-medium">
                    {item.kejadianRisiko}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-black text-rose-700">
                    <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200">
                      {item.besaranRisikoAwalTahun} ({item.levelAwal})
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-black text-emerald-700">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                      {item.besaranRisikoAkhirTahun} ({item.levelAkhir})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
