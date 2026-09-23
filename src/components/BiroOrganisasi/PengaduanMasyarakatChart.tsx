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
  MessageSquare,
  CheckCircle2,
  Clock,
  HelpCircle,
  Building2,
  Search,
  BarChart3,
  Table as TableIcon,
} from 'lucide-react';
import { PENGADUAN_BADAN_USAHA_DATA } from './bokmrData';
import { BokmrFilterState } from './types';

interface PengaduanMasyarakatChartProps {
  filters?: BokmrFilterState;
  onOpenFormula?: (datasetIndex: number) => void;
}

export const PengaduanMasyarakatChart: React.FC<PengaduanMasyarakatChartProps> = ({
  filters,
  onOpenFormula,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pengaduan
  const filteredData = PENGADUAN_BADAN_USAHA_DATA.filter((item) => {
    if (filters?.unitKerja && filters.unitKerja !== 'Semua' && item.unitPelayanan !== filters.unitKerja) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.unitPelayanan.toLowerCase().includes(q) ||
        item.topIsu.toLowerCase().includes(q) ||
        item.kodeUnit.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const chartData = filteredData.map((item) => ({
    name: item.kodeUnit,
    unitPelayanan: item.unitPelayanan,
    diterima: item.jmlPengaduanDiterima,
    diproses: item.jmlPengaduanDiproses,
    selesai: item.jmlPengaduanSelesai,
    persentaseSelesai: item.persentaseSelesai,
    waktu: item.waktuRataRataPenyelesaian,
    topIsu: item.topIsu,
  }));

  const totalDiterima = filteredData.reduce((acc, curr) => acc + curr.jmlPengaduanDiterima, 0);
  const totalDiproses = filteredData.reduce((acc, curr) => acc + curr.jmlPengaduanDiproses, 0);
  const totalSelesai = filteredData.reduce((acc, curr) => acc + curr.jmlPengaduanSelesai, 0);
  const avgSelesai = totalDiterima > 0 ? ((totalSelesai / totalDiterima) * 100).toFixed(1) : '0';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold text-sky-300">{data.unitPelayanan}</div>
          <div className="text-[10.5px] text-slate-400">Top Isu: {data.topIsu}</div>
          <div className="pt-1.5 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Pengaduan Diterima:</span>
              <span className="font-mono font-bold text-sky-300">{data.diterima} Kasus</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Pengaduan Diproses:</span>
              <span className="font-mono font-bold text-amber-400">{data.diproses} Kasus</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Pengaduan Selesai:</span>
              <span className="font-mono font-bold text-emerald-400">{data.selesai} Kasus ({data.persentaseSelesai}%)</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-slate-800 text-[10px]">
              <span className="text-slate-400">Rata-rata Waktu SLA:</span>
              <span className="font-mono text-slate-200">{data.waktu}</span>
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
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono">
                DATASET NO. 10 (Hal. 39)
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Monitoring dan Evaluasi Pengelolaan Pengaduan Masyarakat terhadap Layanan Badan Usaha
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                🏷️ Visualisasi: Grafik Batang Multi-Metrik (Multi-Bar Chart)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Atribut yang Ditampilkan: <strong>Unit Pelayanan</strong>, <strong>Jumlah Pengaduan Diterima</strong>, <strong>Jumlah Pengaduan Diproses</strong>, <strong>Jumlah Pengaduan Selesai</strong> (Hal. 39)
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
                  ? 'bg-white text-blue-700 shadow-2xs border border-slate-200/80'
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
                  ? 'bg-white text-blue-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          <div className="text-right px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100">
            <span className="text-[9.5px] font-bold text-blue-700 block">Total Resolusi</span>
            <span className="font-mono font-black text-xs text-blue-950">
              {totalSelesai} dari {totalDiterima} ({avgSelesai}%)
            </span>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(10)}
              className="text-[10.5px] text-blue-700 hover:text-blue-900 font-semibold px-2 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center gap-1 transition-colors"
              title="Kamus & Rumus Pengaduan"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kamus</span>
            </button>
          )}
        </div>
      </div>

      {/* FILTER & STATS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari unit pelayanan / isu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
            Diterima: <strong className="text-slate-900">{totalDiterima}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium border border-amber-200">
            Diproses: <strong className="text-amber-950">{totalDiproses}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
            Selesai: <strong className="text-emerald-950">{totalSelesai} ({avgSelesai}%)</strong>
          </span>
        </div>
      </div>

      {/* SHEET SWAP VIEW 1: GRAFIS */}
      {viewMode === 'chart' ? (
        <div className="h-[230px] w-full">
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
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }}
                iconType="circle"
              />
              <Bar
                dataKey="diterima"
                name="Jumlah Pengaduan Diterima"
                fill="#0284c7"
                radius={[4, 4, 0, 0]}
                barSize={16}
              />
              <Bar
                dataKey="diproses"
                name="Jumlah Pengaduan Diproses"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
                barSize={16}
              />
              <Bar
                dataKey="selesai"
                name="Jumlah Pengaduan Selesai"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                barSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        /* SHEET SWAP VIEW 2: TABEL (HANYA NO, UNIT PELAYANAN, JUMLAH DITERIMA, DIPROSES, SELESAI) */
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-2.5 px-3 text-center w-12">No</th>
                <th className="py-2.5 px-3">Unit Pelayanan</th>
                <th className="py-2.5 px-3 text-right">Jumlah Diterima</th>
                <th className="py-2.5 px-3 text-right">Jumlah Diproses</th>
                <th className="py-2.5 px-3 text-right">Jumlah Selesai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-500 font-semibold">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {item.unitPelayanan}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-sky-700">
                    {item.jmlPengaduanDiterima}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-700">
                    {item.jmlPengaduanDiproses}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-black text-emerald-700">
                    {item.jmlPengaduanSelesai}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50/70 border-t-2 border-blue-200 font-black text-slate-900">
                <td colSpan={2} className="py-2.5 px-3 text-blue-950 uppercase text-[10.5px]">
                  Total Pengelolaan Pengaduan Layanan
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-sky-800">
                  {totalDiterima}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-amber-800">
                  {totalDiproses}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-800">
                  {totalSelesai}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
