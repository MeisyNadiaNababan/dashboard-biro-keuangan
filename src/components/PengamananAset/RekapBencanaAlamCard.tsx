import React from 'react';
import {
  Flame,
  TreePine,
  AlertTriangle,
  LifeBuoy,
  ShieldCheck,
  Calendar,
  CloudRain,
  ExternalLink,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BENCANA_ALAM_SUMMARY, TOTAL_BENCANA_ALAM_KEJADIAN } from './pengamananAsetData';
import { PengamananFilterState } from './types';

interface RekapBencanaAlamCardProps {
  filters: PengamananFilterState;
}

const COLORS = ['#002B49', '#D97706', '#EA580C', '#2563EB', '#0D9488'];

export const RekapBencanaAlamCard: React.FC<RekapBencanaAlamCardProps> = ({ filters }) => {
  const chartData = BENCANA_ALAM_SUMMARY.map((item) => ({
    name: item.kategoriBencana,
    value: item.jumlah,
    kegiatan: item.jenisKegiatan,
    personil: item.totalPersonilRescue,
  }));

  const totalPersonilRescue = BENCANA_ALAM_SUMMARY.reduce(
    (acc, curr) => acc + curr.totalPersonilRescue,
    0
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-rose-50 text-rose-800 border border-rose-200 font-mono">
              DATASET NO. 6 • SATU DATA
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Hal. 18 Ditpam BP Batam</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
            <span>Rekap Kejadian Bencana Alam &amp; Penanggulangan Tim Rescue Ditpam</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Menampilkan rekapitulasi resmi <strong>Jenis Kegiatan</strong> dan <strong>Jumlah</strong> kejadian bencana alam yang ditangani cepat oleh Tim Damkar &amp; Rescue Ditpam BP Batam.
          </p>
        </div>

        {/* Metric Badges */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-left">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Total Kejadian</div>
            <div className="text-sm font-black text-rose-900 font-mono">
              {TOTAL_BENCANA_ALAM_KEJADIAN} Kejadian
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-left">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Personil Rescue Dikerahkan</div>
            <div className="text-sm font-black text-slate-900 font-mono">
              {totalPersonilRescue} Penugasan
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-left">
            <div className="text-[10px] text-emerald-700 font-semibold uppercase">Tingkat Penanganan</div>
            <div className="text-sm font-black text-emerald-800 font-mono">100% Tuntas</div>
          </div>
        </div>
      </div>

      {/* Grid: Visual Donut + Table Required (Jenis Kegiatan dan Jumlah) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Visual Donut Chart */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-1">
            <h4 className="text-xs font-bold text-slate-800">Komposisi Bencana Alam Ditangani</h4>
            <span className="text-[10.5px] text-slate-500 font-mono">158 Kejadian</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={68}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number, name: string) => [
                    `${val} Kejadian (${Math.round((val / TOTAL_BENCANA_ALAM_KEJADIAN) * 100)}%)`,
                    name,
                  ]}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 w-full text-[10.5px] text-slate-600 mt-1">
            {chartData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="truncate">{item.name}</span>
                <span className="font-bold font-mono ml-auto text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Table: REQUIRED BY USER (Jenis Kegiatan dan Jumlah) */}
        <div className="lg:col-span-8 border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">No</th>
                <th className="py-2.5 px-3 font-bold text-slate-900">Jenis Kegiatan Penanggulangan Bencana</th>
                <th className="py-2.5 px-3 font-bold text-slate-900 text-center">Jumlah Kejadian</th>
                <th className="py-2.5 px-3 text-right">Personil Rescue</th>
                <th className="py-2.5 px-3">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {BENCANA_ALAM_SUMMARY.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px] font-bold">
                    {index + 1}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">
                    <div className="flex items-center gap-2">
                      {index === 0 && <TreePine className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {index === 1 && <Flame className="w-4 h-4 text-amber-600 shrink-0" />}
                      {index === 2 && <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
                      {index === 3 && <CloudRain className="w-4 h-4 text-blue-600 shrink-0" />}
                      {index === 4 && <LifeBuoy className="w-4 h-4 text-teal-600 shrink-0" />}
                      <span>{row.jenisKegiatan}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 font-mono font-black text-rose-900 text-xs">
                      {row.jumlah} Kejadian
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap font-mono text-slate-700 font-bold">
                    {row.totalPersonilRescue} Org
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 text-xs leading-snug">
                    {row.keterangan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-slate-50 px-3 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 font-medium">
            <span>Total 5 Kategori Bencana Alam Ditangani Tim Rescue Ditpam BP Batam</span>
            <span className="font-bold text-slate-900">Total Akumulasi: {TOTAL_BENCANA_ALAM_KEJADIAN} Kejadian Bencana</span>
          </div>
        </div>
      </div>
    </div>
  );
};
