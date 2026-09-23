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
  Smile,
  CheckCircle2,
  HelpCircle,
  Award,
  Search,
  BarChart3,
  Table as TableIcon,
} from 'lucide-react';
import { SKM_KATEGORI_DATA, BOKMR_SUMMARY } from './bokmrData';

interface SkmSurveyChartProps {
  onOpenFormula?: (datasetIndex: number) => void;
}

export const SkmSurveyChart: React.FC<SkmSurveyChartProps> = ({ onOpenFormula }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = SKM_KATEGORI_DATA.filter((item) => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.unitUsaha.toLowerCase().includes(q) ||
        item.kategori.toLowerCase().includes(q) ||
        item.keterangan.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const chartData = filteredData.map((item) => ({
    name: item.kategori.replace('Indeks Unsur ', '').replace('Indeks Kepuasan ', ''),
    fullName: item.kategori,
    unitUsaha: item.unitUsaha,
    nilai: item.nilai,
    persentase: item.persentase,
    keterangan: item.keterangan,
  }));

  const avgNilai = (
    filteredData.reduce((acc, curr) => acc + curr.nilai, 0) / (filteredData.length || 1)
  ).toFixed(2);
  const avgPersen = (
    filteredData.reduce((acc, curr) => acc + curr.persentase, 0) / (filteredData.length || 1)
  ).toFixed(2);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold text-amber-300">{data.fullName}</div>
          <div className="text-[10.5px] text-slate-300">{data.unitUsaha}</div>
          <div className="pt-1.5 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Nilai SKM (Skala 1 - 4):</span>
              <span className="font-mono font-bold text-amber-400">{data.nilai.toFixed(2)} / 4.00</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Persentase Kepuasan:</span>
              <span className="font-mono font-bold text-emerald-400">{data.persentase.toFixed(2)}%</span>
            </div>
            <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-300">
              {data.keterangan}
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
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 shrink-0">
            <Smile className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
                DATASET NO. 11 (Hal. 39)
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Rekapitulasi Hasil Survei Kepuasan Masyarakat (SKM)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono">
                🏷️ Visualisasi: Grafik Batang Horizontal (Horizontal Bar Chart)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Atribut yang Ditampilkan: <strong>Unit Usaha</strong>, <strong>Kategori Unsur Layanan</strong>, <strong>Nilai (Skala 4.00)</strong>, <strong>Persentase (%)</strong> (Hal. 39)
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
                  ? 'bg-white text-amber-700 shadow-2xs border border-slate-200/80'
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
                  ? 'bg-white text-amber-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          <div className="text-right px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200">
            <span className="text-[9.5px] font-bold text-amber-800 block">Indeks Rata-Rata</span>
            <span className="font-mono font-black text-xs text-amber-950">
              {BOKMR_SUMMARY.indeksKepuasanMasyarakat.nilai} / 100 ({BOKMR_SUMMARY.indeksKepuasanMasyarakat.kategori})
            </span>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(11)}
              className="text-[10.5px] text-amber-700 hover:text-amber-900 font-semibold px-2 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 flex items-center gap-1 transition-colors"
              title="Kamus & Rumus SKM"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kamus</span>
            </button>
          )}
        </div>
      </div>

      {/* FILTER SEARCH & RESPONDENT SUMMARY */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari unit usaha / unsur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
            Responden: <strong className="text-slate-900">4.850 Pengguna</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-medium border border-amber-200">
            Rata-rata Nilai: <strong className="font-mono">{avgNilai} / 4.00</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
            Rata-rata %: <strong className="font-mono">{avgPersen}%</strong>
          </span>
        </div>
      </div>

      {/* SHEET SWAP VIEW 1: GRAFIS */}
      {viewMode === 'chart' ? (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 25, left: 30, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis
                type="number"
                domain={[75, 100]}
                tick={{ fontSize: 10, fill: '#64748b' }}
                unit="%"
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
                width={140}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }}
                iconType="circle"
              />
              <Bar
                dataKey="persentase"
                name="Persentase Kepuasan (%)"
                fill="#d97706"
                radius={[0, 4, 4, 0]}
                barSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        /* SHEET SWAP VIEW 2: TABEL (HANYA NO, UNIT USAHA, KATEGORI UNSUR, NILAI, PERSENTASE) */
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-2.5 px-3 text-center w-12">No</th>
                <th className="py-2.5 px-3">Unit Usaha</th>
                <th className="py-2.5 px-3">Kategori Unsur Pelayanan</th>
                <th className="py-2.5 px-3 text-right">Nilai (Skor / 4.00)</th>
                <th className="py-2.5 px-3 text-right">Persentase (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-500 font-semibold">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {item.unitUsaha}
                  </td>
                  <td className="py-2.5 px-3 text-slate-800">
                    {item.kategori}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-700">
                    {item.nilai.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px]">
                      {item.persentase.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-amber-50/70 border-t-2 border-amber-200 font-black text-slate-900">
                <td colSpan={3} className="py-2.5 px-3 text-amber-950 uppercase text-[10.5px]">
                  Rata-rata Hasil Survei Kepuasan Masyarakat (SKM)
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-amber-900">
                  {avgNilai}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-amber-900 text-xs">
                  {avgPersen}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
