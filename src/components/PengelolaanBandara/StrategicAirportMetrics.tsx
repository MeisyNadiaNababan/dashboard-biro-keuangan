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
  Compass as CompassIcon,
  DollarSign as DollarIcon,
  Info as InfoIcon,
  CheckCircle2,
  Plane,
  ArrowRight,
} from 'lucide-react';
import {
  AIRPORT_TOP_ROUTES,
} from './bandaraData';
import { BandaraFilterState } from './types';

interface StrategicAirportMetricsProps {
  filters: BandaraFilterState;
  onOpenFormulaModal: (metricKeyOrDataset: string | number) => void;
}

// Data tren bulanan realisasi PNBP kebandarudaraan (Dataset #1)
const MONTHLY_PNBP_TREND = [
  { bulan: 'Jan', targetM: 23.5, realisasiM: 25.1, pjp2u: 14.2, pjp4u: 7.8, konsesi: 3.1 },
  { bulan: 'Feb', targetM: 22.0, realisasiM: 23.4, pjp2u: 13.5, pjp4u: 7.2, konsesi: 2.7 },
  { bulan: 'Mar', targetM: 24.0, realisasiM: 26.8, pjp2u: 15.1, pjp4u: 8.3, konsesi: 3.4 },
  { bulan: 'Apr', targetM: 24.5, realisasiM: 27.2, pjp2u: 15.6, pjp4u: 8.1, konsesi: 3.5 },
  { bulan: 'Mei', targetM: 23.0, realisasiM: 25.6, pjp2u: 14.8, pjp4u: 7.9, konsesi: 2.9 },
  { bulan: 'Jun', targetM: 25.0, realisasiM: 28.5, pjp2u: 16.4, pjp4u: 8.7, konsesi: 3.4 },
  { bulan: 'Jul', targetM: 24.5, realisasiM: 27.8, pjp2u: 15.9, pjp4u: 8.4, konsesi: 3.5 },
  { bulan: 'Agu', targetM: 23.5, realisasiM: 26.2, pjp2u: 15.2, pjp4u: 7.8, konsesi: 3.2 },
  { bulan: 'Sep', targetM: 23.0, realisasiM: 25.0, pjp2u: 14.5, pjp4u: 7.6, konsesi: 2.9 },
  { bulan: 'Okt', targetM: 23.5, realisasiM: 25.4, pjp2u: 14.7, pjp4u: 7.7, konsesi: 3.0 },
  { bulan: 'Nov', targetM: 23.5, realisasiM: 25.2, pjp2u: 14.6, pjp4u: 7.6, konsesi: 3.0 },
  { bulan: 'Des', targetM: 25.0, realisasiM: 26.25, pjp2u: 15.3, pjp4u: 7.8, konsesi: 3.15 },
];

export const StrategicAirportMetrics: React.FC<StrategicAirportMetricsProps> = ({
  filters,
  onOpenFormulaModal,
}) => {
  const [activeView, setActiveView] = useState<'routes' | 'pnbp_trend'>('routes');

  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  // Filter routes if search query is typed
  const filteredRoutes = AIRPORT_TOP_ROUTES.filter((r) => {
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      return (
        r.kotaTujuan.toLowerCase().includes(q) ||
        r.kodeRute.toLowerCase().includes(q) ||
        r.namaBandara.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div id="strategic-airport-metrics" className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs mb-6 font-sans">
      {/* HEADER WITH SIMPLE DIRECT TOGGLE */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-5 bg-sky-600 rounded-full inline-block" />
            <h3 className="text-sm font-bold text-slate-900">
              Konektivitas Jaringan Rute &amp; Realisasi PNBP
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoring frekuensi penerbangan rute langsung (Dataset #9) dan tren penerimaan kas PNBP bulanan (Dataset #1)
          </p>
        </div>

        {/* VIEW SELECTOR */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveView('routes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeView === 'routes'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CompassIcon className="w-3.5 h-3.5" />
            <span>Top Rute Langsung (DS #9)</span>
          </button>

          <button
            onClick={() => setActiveView('pnbp_trend')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeView === 'pnbp_trend'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarIcon className="w-3.5 h-3.5" />
            <span>Tren Realisasi PNBP (DS #1)</span>
          </button>
        </div>
      </div>

      {/* 1. VISUALISASI RUTE PENERBANGAN LANGSUNG (TABLEAU HORIZONTAL RANKING BAR CHART) */}
      {activeView === 'routes' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span>Menampilkan <strong>{filteredRoutes.length} Rute Langsung</strong> dari Bandara Hang Nadim (BTH).</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Terhubung Terjadwal
              </span>
            </div>
            <button
              onClick={() => onOpenFormulaModal('routes')}
              className="inline-flex items-center gap-1 text-[11px] text-sky-700 hover:text-sky-900 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 cursor-pointer font-medium"
            >
              <InfoIcon className="w-3.5 h-3.5" />
              <span>Formula Rute Langsung</span>
            </button>
          </div>

          {/* TABLEAU-STYLE HORIZONTAL RANKED BAR CHART */}
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={filteredRoutes}
                margin={{ top: 10, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis
                  type="number"
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  unit=" Fl/Mg"
                />
                <YAxis
                  dataKey="kotaTujuan"
                  type="category"
                  tick={{ fill: '#1E293B', fontSize: 11, fontWeight: 600 }}
                  width={90}
                />
                <Tooltip
                  formatter={(value: any, name: any) => {
                    if (name === 'frekuensiMingguan') return [`${value} Penerbangan / Minggu`, 'Frekuensi Mingguan'];
                    return [value, name];
                  }}
                  labelFormatter={(label: any) => `Rute Langsung: Batam (BTH) ➔ ${label}`}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="frekuensiMingguan" radius={[0, 6, 6, 0]}>
                  {filteredRoutes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? '#0284C7' // Jakarta (Top)
                          : index === 1
                          ? '#0369A1' // Surabaya
                          : index === 2
                          ? '#0EA5E9' // Medan
                          : index === 3
                          ? '#38BDF8' // Pekanbaru
                          : '#60A5FA'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* KARTU KONEKTIVITAS RUTE LANGSUNG & JUMLAH FLIGHT KESELURUHAN (HANYA RUTE & TOTAL FLIGHT) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
            {filteredRoutes.map((route) => {
              const destCode = route.kodeRute.replace('BTH-', '');
              const annualFlights = route.frekuensiMingguan * 52;
              return (
                <div
                  key={route.kodeRute}
                  className="bg-white rounded-xl p-3.5 border border-slate-200 hover:border-sky-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Konektivitas Rute Langsung */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-bold text-xs font-mono">
                          BTH
                        </span>
                        <div className="flex items-center text-sky-600">
                          <Plane className="w-3.5 h-3.5 rotate-90 text-sky-600" />
                          <ArrowRight className="w-3.5 h-3.5 -ml-1 text-sky-600" />
                        </div>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold text-xs font-mono">
                          {destCode}
                        </span>
                      </div>
                      <span className="text-[9.5px] font-bold tracking-wide uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                        Rute Langsung
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-900 mb-0.5 line-clamp-1" title={route.kotaTujuan}>
                      {route.kotaTujuan}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      {route.namaBandara}
                    </div>
                  </div>

                  {/* Jumlah Flight Keseluruhan (Tahunan & Mingguan) */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                        Jumlah Flight
                      </span>
                      <span className="text-xs font-semibold text-sky-700">
                        {route.frekuensiMingguan} Flight / Minggu
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900 font-mono tracking-tight">
                        {formatNumber(annualFlights)}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-600">
                        Total Flight / Thn
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. VISUALISASI TREN REALISASI PNBP (TABLEAU DUAL AXIS BAR + LINE CHART) */}
      {activeView === 'pnbp_trend' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span>Target Tahunan: <strong>Rp 285,00 M</strong> | Realisasi Kumulatif: <strong className="text-emerald-700">Rp 312,45 M (109,63%)</strong></span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-700 font-semibold">Surplus +Rp 27,45 Miliar</span>
            </div>
            <button
              onClick={() => onOpenFormulaModal('pnbp')}
              className="inline-flex items-center gap-1 text-[11px] text-amber-800 hover:text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 cursor-pointer font-medium"
            >
              <InfoIcon className="w-3.5 h-3.5" />
              <span>Formula PNBP</span>
            </button>
          </div>

          {/* TABLEAU-STYLE MONTHLY PNBP TARGET VS REALISASI BAR CHART */}
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MONTHLY_PNBP_TREND}
                margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="bulan" tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  unit=" M"
                  domain={[0, 32]}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    if (name === 'realisasiM') return [`Rp ${val} Miliar`, 'Realisasi PNBP'];
                    if (name === 'targetM') return [`Rp ${val} Miliar`, 'Target Anggaran'];
                    return [`Rp ${val} Miliar`, name];
                  }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '11px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  formatter={(value) => {
                    if (value === 'realisasiM') return 'Realisasi Kas IDR (Miliar)';
                    if (value === 'targetM') return 'Target Anggaran DIPA (Miliar)';
                    return value;
                  }}
                />
                <Bar dataKey="realisasiM" fill="#0284C7" radius={[4, 4, 0, 0]} name="realisasiM" />
                <Bar dataKey="targetM" fill="#CBD5E1" radius={[4, 4, 0, 0]} name="targetM" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 3 PILAR PENERIMAAN RESMI SATU DATA (DATASET #1) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="bg-sky-50 rounded-xl p-3 border border-sky-200">
              <span className="text-[10px] font-bold text-sky-800 uppercase">1. PJP2U (Pelayanan Jasa Penumpang)</span>
              <div className="text-base font-black text-sky-950 mt-1">Rp 178,50 M (57,1%)</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Passenger Service Charge (PSC) terminal domestik &amp; internasional.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
              <span className="text-[10px] font-bold text-blue-800 uppercase">2. PJP4U (Jasa Pendaratan Pesawat)</span>
              <div className="text-base font-black text-blue-950 mt-1">Rp 94,80 M (30,3%)</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Landing fee, parking fee, aviobridge/garbarata &amp; navigasi.</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">3. Konsesi &amp; EMPU Kargo</span>
              <div className="text-base font-black text-emerald-950 mt-1">Rp 39,15 M (12,5%)</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Sewa tenant komersial bandara, EMPU ekspedisi kargo &amp; parkir.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
