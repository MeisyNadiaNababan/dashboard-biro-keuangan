import React, { useState, useMemo } from 'react';
import {
  Compass,
  Info,
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
import { SWP_LAHAN_TERSEDIA_DATA } from './lahanData';

interface SwpLahanTersediaCardProps {
  selectedSwpFilter?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
}

const SWP_COLORS = [
  '#0284C7', // Batam Centre
  '#10B981', // Nongsa
  '#6366F1', // Sekupang
  '#F59E0B', // Batu Ampar
  '#EC4899', // Muka Kuning
  '#14B8A6', // Kabil
  '#8B5CF6', // Tanjung Uncang
  '#F97316', // Tembesi
  '#06B6D4', // Rempang & Galang
];

export const SwpLahanTersediaCard: React.FC<SwpLahanTersediaCardProps> = ({
  selectedSwpFilter = 'ALL',
  onOpenFormulaModal,
}) => {
  const [metricView, setMetricView] = useState<'luas' | 'persil'>('luas');

  // Filter if global SWP filter is chosen
  const swpList = useMemo(() => {
    if (selectedSwpFilter === 'ALL') return SWP_LAHAN_TERSEDIA_DATA;
    return SWP_LAHAN_TERSEDIA_DATA.filter((s) => s.swp === selectedSwpFilter);
  }, [selectedSwpFilter]);

  const totalHa = useMemo(() => swpList.reduce((acc, s) => acc + s.luasHa, 0), [swpList]);
  const totalPersil = useMemo(() => swpList.reduce((acc, s) => acc + s.jumlahPersil, 0), [swpList]);
  const totalSiapPakai = useMemo(() => swpList.reduce((acc, s) => acc + s.persilSiapPakai, 0), [swpList]);

  // Chart data
  const chartData = useMemo(() => {
    return swpList.map((s, idx) => ({
      name: s.swp.replace('SWP ', ''),
      fullName: s.swp,
      luasHa: s.luasHa,
      jumlahPersil: s.jumlahPersil,
      siapPakai: s.persilSiapPakai,
      color: SWP_COLORS[idx % SWP_COLORS.length],
      id: s.id,
    }));
  }, [swpList]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-3.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Lahan Tersedia Area Sub Wilayah Pengembangan (SWP)
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                DATASET #15
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Sebaran luasan lahan kosong siap dialokasikan &amp; jumlah persil per zona tata ruang BP Batam
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
            <button
              onClick={() => setMetricView('luas')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                metricView === 'luas' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Luas Lahan (Ha)
            </button>
            <button
              onClick={() => setMetricView('persil')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                metricView === 'persil' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Jumlah Persil
            </button>
          </div>

          <button
            onClick={() => onOpenFormulaModal && onOpenFormulaModal('lahan_swp_tersedia')}
            className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            title="Penjelasan Formula & Tata Ruang SWP"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-200 text-xs">
        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Total Luas Tersedia</div>
          <div className="text-base font-bold text-sky-700">{totalHa.toLocaleString('id-ID')} Ha</div>
          <div className="text-[10px] text-slate-500 font-mono">{(totalHa * 10000).toLocaleString('id-ID')} m²</div>
        </div>
        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Total Persil Siap Alokasi</div>
          <div className="text-base font-bold text-emerald-700">{totalPersil.toLocaleString('id-ID')} Persil</div>
          <div className="text-[10px] text-emerald-700">Siap Pakai: {totalSiapPakai} Persil</div>
        </div>
        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Sub Wilayah (SWP)</div>
          <div className="text-base font-bold text-slate-900">{swpList.length} Zona Wilayah</div>
          <div className="text-[10px] text-slate-500">RTRW &amp; RDTR Kota Batam</div>
        </div>
        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Zona Investasi Terbesar</div>
          <div className="text-base font-bold text-slate-900 truncate">Rempang &amp; Kabil</div>
          <div className="text-[10px] text-amber-700">Industri Hijau &amp; KEK</div>
        </div>
      </div>

      {/* Main Visual Section */}
      <div className="p-3.5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-700 font-medium">
            Distribusi {metricView === 'luas' ? 'Luas Lahan Cadangan (Hektar)' : 'Jumlah Persil Siap Bangun'} per SWP
          </span>
          <span className="text-[11px] text-slate-500">Perbandingan 9 Sub Wilayah Pengembangan Kota Batam</span>
        </div>

        <div className="h-[230px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#64748b', fontSize: 10 }}
                interval={0}
                angle={-15}
                textAnchor="end"
              />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E2E8F0',
                  borderRadius: '8px',
                  color: '#0F172A',
                  fontSize: '11px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: any) => [
                  metricView === 'luas' ? `${value} Hektar` : `${value} Persil`,
                  metricView === 'luas' ? 'Luas Lahan' : 'Jumlah Persil',
                ]}
              />
              <Bar
                dataKey={metricView === 'luas' ? 'luasHa' : 'jumlahPersil'}
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="transition-all hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Integrasi GIS Pertanahan:</strong> Data bersumber dari Buku Rencana Tata Ruang &amp; Basis Spasial Sub Wilayah Pengembangan Batam.
        </span>
        <span className="text-slate-600 font-medium">Satu Data Hal. 7-8 Item 15</span>
      </div>
    </div>
  );
};
