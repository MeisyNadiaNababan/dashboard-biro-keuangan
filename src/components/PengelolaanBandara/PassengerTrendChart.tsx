import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
  Bar,
} from 'recharts';
import {
  Users,
  Calendar,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Plane,
  Package,
  Layers,
} from 'lucide-react';
import { TREN_BULANAN_PENUMPANG } from './bandaraData';

interface PassengerTrendChartProps {
  onOpenFormulaModal?: (key: string | number) => void;
}

export const PassengerTrendChart: React.FC<PassengerTrendChartProps> = ({ onOpenFormulaModal }) => {
  const [metricMode, setMetricMode] = useState<'flow' | 'total' | 'cargo'>('flow');

  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  return (
    <div id="passenger-trend-section" className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-5 bg-emerald-600 rounded-full inline-block" />
            <h3 className="text-sm font-bold text-slate-900">
              Tren Jumlah Penumpang Berdasarkan Bulan (Januari - Desember)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Dataset Satu Data No. 2: Fluktuasi Arus Kedatangan, Keberangkatan &amp; Transit Bandara Hang Nadim
          </p>
        </div>

        {/* Metric Layer Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setMetricMode('flow')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              metricMode === 'flow'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Arrival vs Departure</span>
          </button>
          <button
            onClick={() => setMetricMode('total')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              metricMode === 'total'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Total Pax &amp; Flights</span>
          </button>
          <button
            onClick={() => setMetricMode('cargo')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              metricMode === 'cargo'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Kargo EMPU &amp; Bagasi</span>
          </button>
          {onOpenFormulaModal && (
            <button
              onClick={() => onOpenFormulaModal(metricMode === 'cargo' ? 'cargo' : 'passengers')}
              className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
              title="Lihat Formula Penumpang & Kargo di Tableau"
            >
              <Users className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* STRATEGIC SUMMARY STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">Puncak Arus Tertinggi (Peak Season)</span>
          <div className="text-base font-bold text-slate-900 flex items-center gap-1">
            <span>Desember</span>
            <span className="text-xs text-emerald-600 font-semibold">(531,4K Pax)</span>
          </div>
          <span className="text-[10px] text-slate-500">Peak Nataru & Libur Akhir Tahun</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">Puncak Arus Mudik (Hari Raya)</span>
          <div className="text-base font-bold text-slate-900 flex items-center gap-1">
            <span>April</span>
            <span className="text-xs text-sky-600 font-semibold">(516,3K Pax)</span>
          </div>
          <span className="text-[10px] text-slate-500">Seat Load Factor Mencapai 91,4%</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">Rata-rata Penumpang Bulanan</span>
          <div className="text-base font-bold text-emerald-700">405.191 Pax / Bulan</div>
          <span className="text-[10px] text-slate-500">~13.320 Penumpang / Hari</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">Rata-rata Pergerakan Pesawat</span>
          <div className="text-base font-bold text-sky-700">3.204 Flights / Bulan</div>
          <span className="text-[10px] text-slate-500">Kapasitas Runway Optimal</span>
        </div>
      </div>

      {/* CHART CONTAINER */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {metricMode === 'flow' ? (
            <AreaChart data={TREN_BULANAN_PENUMPANG} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorArrival" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorDeparture" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorTransit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="kodeBulan" stroke="#64748b" fontSize={11} />
              <YAxis
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                stroke="#64748b"
                fontSize={11}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '11px',
                }}
                formatter={(value: any, name: any) => [
                  `${formatNumber(Number(value))} Penumpang`,
                  name === 'penumpangDomestikArrival'
                    ? 'Kedatangan (Arrival)'
                    : name === 'penumpangDomestikDeparture'
                    ? 'Keberangkatan (Departure)'
                    : 'Penumpang Transit',
                ]}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length) {
                    const item = payload[0].payload;
                    return `${item.bulan} (Total: ${formatNumber(item.totalPenumpang)} Pax | SLF: ${item.seatLoadFactor}%)`;
                  }
                  return String(label);
                }}
              />
              <Legend
                formatter={(val) => (
                  <span className="text-xs text-slate-700 font-medium">
                    {val === 'penumpangDomestikArrival'
                      ? 'Kedatangan (Arrival)'
                      : val === 'penumpangDomestikDeparture'
                      ? 'Keberangkatan (Departure)'
                      : 'Penumpang Transit'}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="penumpangDomestikArrival"
                stackId="1"
                stroke="#0284c7"
                fillOpacity={1}
                fill="url(#colorArrival)"
              />
              <Area
                type="monotone"
                dataKey="penumpangDomestikDeparture"
                stackId="1"
                stroke="#059669"
                fillOpacity={1}
                fill="url(#colorDeparture)"
              />
              <Area
                type="monotone"
                dataKey="penumpangDomestikTransit"
                stackId="1"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorTransit)"
              />
            </AreaChart>
          ) : metricMode === 'total' ? (
            <ComposedChart data={TREN_BULANAN_PENUMPANG} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="kodeBulan" stroke="#64748b" fontSize={11} />
              <YAxis
                yAxisId="left"
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                stroke="#059669"
                fontSize={11}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(val) => `${val}`}
                stroke="#0284c7"
                fontSize={11}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '11px',
                }}
                formatter={(value: any, name: any) => [
                  name === 'totalPenumpang'
                    ? `${formatNumber(Number(value))} Penumpang`
                    : `${formatNumber(Number(value))} Pergerakan`,
                  name === 'totalPenumpang' ? 'Total Penumpang' : 'Total Penerbangan',
                ]}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="totalPenumpang"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                name="Total Penumpang (Pax)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalPenerbangan"
                stroke="#0284c7"
                strokeWidth={3}
                dot={{ r: 4, fill: '#0284c7' }}
                name="Total Pergerakan Pesawat"
              />
            </ComposedChart>
          ) : (
            <ComposedChart data={TREN_BULANAN_PENUMPANG} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="kodeBulan" stroke="#64748b" fontSize={11} />
              <YAxis
                yAxisId="left"
                tickFormatter={(val) => `${val} Ton`}
                stroke="#6366f1"
                fontSize={11}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M kg`}
                stroke="#f59e0b"
                fontSize={11}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '11px',
                }}
                formatter={(value: any, name: any) => [
                  name === 'kargoTon'
                    ? `${formatNumber(Number(value))} Ton`
                    : `${formatNumber(Number(value))} Kg`,
                  name === 'kargoTon' ? 'Volume Kargo Udara (EMPU)' : 'Bagasi Penumpang (Kg)',
                ]}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="kargoTon"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                name="Kargo Udara (Ton)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bagasiKg"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 4, fill: '#f59e0b' }}
                name="Bagasi Penumpang (Kg)"
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* FOOTER CALLOUT */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>
            Rata-rata pertumbuhan arus penumpang MoM stabil pada kisaran <strong>+3,4%</strong> di luar peak season.
          </span>
        </div>
        <span className="font-semibold text-slate-700">
          Total Akumulasi: {formatNumber(4862300)} Penumpang / Tahun
        </span>
      </div>
    </div>
  );
};
