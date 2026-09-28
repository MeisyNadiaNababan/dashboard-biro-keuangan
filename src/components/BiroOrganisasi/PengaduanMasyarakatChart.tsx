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
  CheckCheck,
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
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[220px]">
          <div className="font-bold text-sky-300">{data.unitPelayanan}</div>
          <div className="text-[10.5px] text-slate-400 truncate">Fokus: {data.topIsu}</div>
          <div className="pt-1.5 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Diterima:</span>
              <span className="font-mono font-bold text-sky-300">{data.diterima} Aduan</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Tuntas Selesai:</span>
              <span className="font-mono font-bold text-emerald-400">
                {data.selesai} ({data.persentaseSelesai}%)
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Sedang Diproses:</span>
              <span className="font-mono font-bold text-amber-400">{data.diproses} Aduan</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-slate-800 text-[10.5px]">
              <span className="text-slate-400">Rata-rata Waktu SLA:</span>
              <span className="font-mono font-bold text-slate-200">{data.waktu}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs font-sans space-y-4">
      {/* 1. COMPACT HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Monitoring Pengelolaan Pengaduan Masyarakat Layanan Badan Usaha
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {avgSelesai}% Tuntas
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tingkat penyelesaian dan kecepatan SLA penanganan keluhan pada 5 unit operasional BP Batam
            </p>
          </div>
        </div>

        {/* Right Stats & View Mode Toggle */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Quick Metrics Capsule */}
          <div className="px-3 py-1.5 rounded-lg bg-blue-50/80 border border-blue-200/80 text-right">
            <div className="text-[10px] font-semibold text-blue-700 uppercase tracking-wide">
              Total Resolusi Aduan
            </div>
            <div className="flex items-baseline justify-end gap-1 font-mono">
              <span className="font-black text-base sm:text-lg text-blue-950">
                {totalSelesai}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ {totalDiterima}</span>
              <span className="text-[10px] font-bold text-emerald-700 ml-1">
                ({avgSelesai}%)
              </span>
            </div>
          </div>

          {/* Toggle Grafis / Tabel */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-blue-700 shadow-2xs'
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
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(10)}
              className="text-xs text-blue-700 hover:text-blue-900 font-bold px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center gap-1 transition-colors"
              title="Kamus & Rumus Pengaduan"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kamus</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. STATS BAN & SEARCH ROW */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari unit atau isu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/70"
          />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold border border-slate-200">
            Diterima: <strong className="text-slate-900">{totalDiterima}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
            Selesai: <strong className="text-emerald-950">{totalSelesai}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 font-bold border border-amber-200">
            Diproses: <strong className="text-amber-950">{totalDiproses}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 font-bold border border-sky-200">
            Avg SLA: <strong>1.3 Hari</strong>
          </span>
        </div>
      </div>

      {/* 3. MAIN CONTENT (CHART OR TABLE) */}
      {viewMode === 'chart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* MULTI-BAR CHART */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Volume Pengaduan per Unit Pelayanan</span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">Rasio Penyelesaian &gt; 94% di Seluruh Unit</span>
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
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="diterima"
                    name="Diterima"
                    fill="#0284c7"
                    radius={[4, 4, 0, 0]}
                    barSize={16}
                  />
                  <Bar
                    dataKey="selesai"
                    name="Selesai"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    barSize={16}
                  />
                  <Bar
                    dataKey="diproses"
                    name="Diproses"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                    barSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* UNIT BREAKDOWN CARDS */}
          <div className="lg:col-span-5 space-y-2">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-slate-300 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 truncate" title={item.unitPelayanan}>
                    {item.unitPelayanan.replace('Badan Usaha ', 'BU ')}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-[10px] text-slate-500 font-bold flex items-center gap-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {item.waktuRataRataPenyelesaian}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {item.persentaseSelesai}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${item.persentaseSelesai}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Selesai: <strong className="text-slate-800">{item.jmlPengaduanSelesai}</strong> / {item.jmlPengaduanDiterima}</span>
                  <span className="truncate max-w-[170px] text-slate-400" title={item.topIsu}>
                    Isu: {item.topIsu}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-2.5 px-3 text-center w-12">No</th>
                <th className="py-2.5 px-3">Unit Pelayanan</th>
                <th className="py-2.5 px-3 text-right">Diterima</th>
                <th className="py-2.5 px-3 text-right">Diproses</th>
                <th className="py-2.5 px-3 text-right">Selesai</th>
                <th className="py-2.5 px-3 text-center">% Tuntas</th>
                <th className="py-2.5 px-3 text-center">Rata-rata SLA</th>
                <th className="py-2.5 px-3">Isu Terbanyak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center text-slate-500 font-semibold">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    {item.unitPelayanan}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-sky-700">
                    {item.jmlPengaduanDiterima}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-amber-700">
                    {item.jmlPengaduanDiproses}
                  </td>
                  <td className="py-2.5 px-3 text-right font-black text-emerald-700">
                    {item.jmlPengaduanSelesai}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-emerald-700">
                    {item.persentaseSelesai}%
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600">
                    {item.waktuRataRataPenyelesaian}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-600 text-[11px]">
                    {item.topIsu}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50/70 border-t-2 border-blue-200 font-black text-slate-900 font-mono">
                <td colSpan={2} className="py-2.5 px-3 text-blue-950 uppercase text-xs font-sans">
                  Total Pengelolaan Pengaduan Layanan
                </td>
                <td className="py-2.5 px-3 text-right text-sky-800 font-bold">
                  {totalDiterima}
                </td>
                <td className="py-2.5 px-3 text-right text-amber-800 font-bold">
                  {totalDiproses}
                </td>
                <td className="py-2.5 px-3 text-right text-emerald-800 text-sm">
                  {totalSelesai}
                </td>
                <td className="py-2.5 px-3 text-center text-emerald-800">
                  {avgSelesai}%
                </td>
                <td className="py-2.5 px-3 text-center text-slate-700">
                  1.3 Hari
                </td>
                <td className="py-2.5 px-3 text-slate-500 font-sans text-[11px]">
                  5 Unit Terpantau
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
