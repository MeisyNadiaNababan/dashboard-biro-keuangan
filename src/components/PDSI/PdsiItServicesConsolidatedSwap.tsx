import React, { useState, useMemo } from 'react';
import {
  PDSI_PERMINTAAN_LAYANAN_TI,
  PdsiPermintaanLayananItem,
} from '../../data/pdsiData';
import {
  Headphones,
  BarChart3,
  Table as TableIcon,
  HelpCircle,
  Search,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PdsiItServicesConsolidatedSwapProps {
  onOpenFormulaModal?: (metricId: string) => void;
}

export const PdsiItServicesConsolidatedSwap: React.FC<PdsiItServicesConsolidatedSwapProps> = ({
  onOpenFormulaModal,
}) => {
  const [displayMode, setDisplayMode] = useState<'chart' | 'table'>('chart');
  const [searchQuery, setSearchQuery] = useState('');

  // Total Permintaan
  const totalPermintaan = useMemo(
    () => PDSI_PERMINTAAN_LAYANAN_TI.reduce((acc, p) => acc + p.jumlah, 0),
    []
  );

  // Filtered Permintaan Layanan (Hanya Nama Layanan & Jumlah)
  const filteredPermintaan = useMemo(() => {
    if (!searchQuery.trim()) return PDSI_PERMINTAAN_LAYANAN_TI;
    const q = searchQuery.toLowerCase();
    return PDSI_PERMINTAAN_LAYANAN_TI.filter((p) =>
      p.namaLayanan.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Chart Data: Hanya Nama Layanan & Jumlah Permintaan
  const chartData = useMemo(() => {
    return filteredPermintaan.map((item) => ({
      id: item.id,
      namaLayanan: item.namaLayanan,
      jumlah: item.jumlah,
    }));
  }, [filteredPermintaan]);

  // Custom Tooltip (Hanya Nama Layanan & Jumlah Permintaan)
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 max-w-xs select-none">
          <div className="font-bold text-sky-300 border-b border-slate-800 pb-1">
            {data.namaLayanan}
          </div>
          <div className="flex justify-between items-center gap-4 text-slate-300 pt-0.5">
            <span>Jumlah Permintaan:</span>
            <span className="font-bold font-mono text-sky-300 text-sm">
              {data.jumlah} Permintaan
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* 1. Header Bar: Permintaan Layanan TI */}
      <div className="bg-slate-50/90 border-b border-slate-200 px-4 py-3.5 sm:px-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#1F4E79] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Headphones className="w-5 h-5 text-sky-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                POIN #10
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                Permintaan Layanan TI
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Rekapitulasi Nama Layanan dan Jumlah Permintaan Layanan TI melalui Helpdesk Bcare BP Batam
            </p>
          </div>
        </div>

        {/* Action Controls: Search & View Switcher (Grafis vs Tabel) */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari layanan..."
              className="text-xs pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1F4E79] w-36 sm:w-44 shadow-2xs"
            />
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs text-xs font-medium">
            <button
              onClick={() => setDisplayMode('chart')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                displayMode === 'chart'
                  ? 'bg-[#1F4E79] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Grafis</span>
            </button>
            <button
              onClick={() => setDisplayMode('table')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                displayMode === 'table'
                  ? 'bg-[#1F4E79] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          {onOpenFormulaModal && (
            <button
              onClick={() => onOpenFormulaModal('pdsi_permintaan_layanan')}
              className="text-xs font-semibold text-[#1F4E79] bg-white hover:bg-blue-50 border border-slate-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
              title="Lihat Formula & Insight"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Rumus</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area: Tanpa Card Kotak-Kotak Sesuai Permintaan */}
      <div className="p-4 sm:p-5 space-y-4">
        <TableauShelvesBadge
          showMe="Show Me #2 (Horizontal Bar Chart) — Standar Visualisasi Tableau"
          columns="SUM([Jumlah Permintaan])"
          rows="[Nama Layanan]"
          filters="[Kategori]='Permintaan Layanan Bcare'"
          detail="Visualisasi Nama Layanan dan Jumlah Permintaan Layanan TI"
        />

        {/* MODE GRAFIS: Recharts Horizontal Bar Chart (Hanya Nama Layanan & Jumlah Permintaan) */}
        {displayMode === 'chart' && (
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1F4E79]" />
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Grafik Jumlah Permintaan per Nama Layanan TI
                </h4>
              </div>
              <span className="text-xs text-slate-600 font-mono">
                Total: <strong className="text-[#1F4E79] font-bold">{totalPermintaan} Permintaan</strong>
              </span>
            </div>

            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={chartData}
                  margin={{ top: 10, right: 35, left: 15, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    label={{
                      value: 'Jumlah Permintaan (Columns: SUM([Jumlah Permintaan]))',
                      position: 'insideBottom',
                      offset: -10,
                      fontSize: 11,
                      fill: '#64748b',
                    }}
                  />
                  <YAxis
                    type="category"
                    dataKey="namaLayanan"
                    tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 600 }}
                    width={240}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="jumlah"
                    name="Jumlah Permintaan"
                    fill="#1F4E79"
                    radius={[0, 6, 6, 0]}
                    barSize={24}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? '#1F4E79' : index < 3 ? '#2563eb' : '#0284c7'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-2 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
              <span>Rows: [Nama Layanan] • Columns: SUM([Jumlah Permintaan])</span>
              <span>Visualisasi Tableau: Horizontal Bar Chart (Show Me #2)</span>
            </div>
          </div>
        )}

        {/* MODE TABEL: HANYA MENAMPILKAN NAMA LAYANAN DAN JUMLAH PERMINTAAN */}
        {displayMode === 'table' && (
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <TableIcon className="w-3.5 h-3.5 text-[#1F4E79]" />
                Tabel Rekapitulasi Permintaan Layanan TI
              </h4>
              <span className="text-[11px] text-slate-500 font-mono">
                Menampilkan: No, Nama Layanan, dan Jumlah Permintaan
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#1F4E79] text-white font-bold text-[11px] uppercase tracking-wider">
                    <th className="px-4 py-3 text-center w-14 border-r border-blue-800">No</th>
                    <th className="px-4 py-3 border-r border-blue-800">Nama Layanan</th>
                    <th className="px-4 py-3 text-center w-48">Jumlah Permintaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredPermintaan.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-slate-50/60 hover:bg-blue-50/40'}
                    >
                      <td className="px-4 py-3 text-center font-mono font-bold text-slate-600 border-r border-slate-200">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900 border-r border-slate-200">
                        {item.namaLayanan}
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-black text-[#1F4E79] bg-blue-50/30">
                        {item.jumlah} Permintaan
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                    <td className="px-4 py-3 text-center font-mono border-r border-slate-200" colSpan={2}>
                      Total Keseluruhan Permintaan Layanan TI
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-[#1F4E79] text-sm">
                      {totalPermintaan} Permintaan
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
