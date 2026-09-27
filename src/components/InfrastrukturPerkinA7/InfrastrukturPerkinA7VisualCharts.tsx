import React, { useState } from 'react';
import {
  TrendingUp,
  HardHat,
  Route,
  Coins,
  ShieldAlert,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HelpCircle,
  BarChart3,
  PieChart as PieIcon,
  Filter,
  Maximize2,
  Trees,
  Droplets,
  Mountain,
  Compass,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
} from 'recharts';
import {
  KURVA_S_INFRASTRUKTUR_BULANAN,
  SEKTOR_INFRASTRUKTUR_ALOKASI,
  KEMANTAPAN_JALAN_DATA,
  PNBP_INFRASTRUKTUR_DETAIL,
} from './perkinA7Data';

interface InfrastrukturPerkinA7VisualChartsProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const InfrastrukturPerkinA7VisualCharts: React.FC<InfrastrukturPerkinA7VisualChartsProps> = ({
  onOpenFormulaModal,
  onNavigateToUnit,
}) => {
  const [activeVisualTab, setActiveVisualTab] = useState<
    'ringkasan' | 'kurva-s' | 'anggaran' | 'jalan' | 'pnbp-row'
  >('ringkasan');

  // Colors
  const COLORS_JALAN = ['#10B981', '#F59E0B', '#EF4444'];

  const dataKemantapanPie = [
    { name: 'Kondisi Mantap (91.4%)', value: KEMANTAPAN_JALAN_DATA.ruasMantapKm, color: '#10B981' },
    { name: 'Rusak Ringan (6.0%)', value: KEMANTAPAN_JALAN_DATA.ruasRusakRinganKm, color: '#F59E0B' },
    { name: 'Rusak Berat (2.6%)', value: KEMANTAPAN_JALAN_DATA.ruasRusakBeratKm, color: '#EF4444' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4 font-sans">
      {/* Visual Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <h3 className="text-sm font-black tracking-wider uppercase text-slate-800">
              PUSAT VISUALISASI ANALITIK INFRASTRUKTUR (RINGKASAN &amp; DETAIL)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              Interaktif Recharts
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Eksplorasi Kurva S konstruksi, realisasi pagu belanja, kemantapan 542,8 km jalan, dan penerimaan PNBP ROW.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveVisualTab('ringkasan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeVisualTab === 'ringkasan'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ringkasan Eksekutif
          </button>
          <button
            onClick={() => setActiveVisualTab('kurva-s')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeVisualTab === 'kurva-s'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kurva S Konstruksi
          </button>
          <button
            onClick={() => setActiveVisualTab('anggaran')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeVisualTab === 'anggaran'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pagu &amp; Serapan Belanja
          </button>
          <button
            onClick={() => setActiveVisualTab('jalan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeVisualTab === 'jalan'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kemantapan Jalan
          </button>
          <button
            onClick={() => setActiveVisualTab('pnbp-row')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeVisualTab === 'pnbp-row'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            PNBP ROW Utilitas
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: RINGKASAN EKSEKUTIF (KOMBINASI 2 GRID BESAR)             */}
      {/* ============================================================== */}
      {(activeVisualTab === 'ringkasan' || activeVisualTab === 'kurva-s') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Chart: Kurva S Agregat Konstruksi Bulanan (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                    DATASET #4
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Kurva S Agregat Pelaksanaan Konstruksi TA 2025
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500">
                  Target Fisik Rencana vs Realisasi Fisik Lapangan vs Realisasi Keuangan Kumulatif (%)
                </p>
              </div>

              <button
                onClick={() => onOpenFormulaModal('ikp-1-pembangunan-infrastruktur')}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                title="Rumus Kurva S"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Rumus</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 my-2 py-1.5 px-2 bg-white rounded-lg border border-slate-200/80 text-center">
              <div>
                <div className="text-[9.5px] font-mono uppercase text-slate-500">Rencana Fisik (Sep)</div>
                <div className="text-sm font-black font-mono text-blue-600">88,0 %</div>
              </div>
              <div className="border-x border-slate-100">
                <div className="text-[9.5px] font-mono uppercase text-slate-500">Realisasi Fisik (Sep)</div>
                <div className="text-sm font-black font-mono text-emerald-600">86,5 %</div>
              </div>
              <div>
                <div className="text-[9.5px] font-mono uppercase text-slate-500">Realisasi Keuangan</div>
                <div className="text-sm font-black font-mono text-purple-600">81,0 %</div>
              </div>
            </div>

            {/* Recharts ComposedChart */}
            <div className="h-64 sm:h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={KURVA_S_INFRASTRUKTUR_BULANAN} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis unit="%" tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any, name: any) => [`${val}%`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area
                    type="monotone"
                    dataKey="targetFisik"
                    name="Target Rencana Fisik (%)"
                    fill="#93c5fd"
                    stroke="#3b82f6"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="realisasiFisik"
                    name="Realisasi Fisik Lapangan (%)"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#10b981' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="keuangan"
                    name="Realisasi Keuangan DIPA (%)"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3, fill: '#8b5cf6' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Chart: Alokasi Pagu & Realisasi per Sektor (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    PAGU RP 842,5 M
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Distribusi Pagu Belanja 5 Sektor
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500">
                  Realisasi Belanja Modal TA 2025 (Total Realisasi: Rp 682,4 M / 81,0%)
                </p>
              </div>
            </div>

            {/* List of Sektor Progress Bars */}
            <div className="space-y-2.5 my-2">
              {SEKTOR_INFRASTRUKTUR_ALOKASI.map((sektor) => (
                <div key={sektor.kategori} className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-800 truncate">{sektor.kategori}</span>
                    <span className="font-mono font-bold text-emerald-600 shrink-0">
                      {sektor.persen}% (Rp {sektor.realisasiMiliar} M / {sektor.paguMiliar} M)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${sektor.persen}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span className="truncate">{sektor.keterangan}</span>
                    <span className="font-mono font-semibold shrink-0">{sektor.totalPaket} Paket</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center justify-between">
              <span className="font-medium">Total 14 Paket Konstruksi Fisik + 43 Paket DED Perencanaan</span>
              <button
                onClick={() => onNavigateToUnit && onNavigateToUnit('dit-pembangunan-infrastruktur')}
                className="font-bold text-blue-700 hover:underline shrink-0"
              >
                Lihat Semua &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: KEMANTAPAN RUAS JARINGAN JALAN (542,8 KM)                */}
      {/* ============================================================== */}
      {(activeVisualTab === 'ringkasan' || activeVisualTab === 'jalan') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
          {/* Donut Chart: Kemantapan Jalan (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                  DATASET #3
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  Tingkat Kemantapan Jalan BP Batam
                </h4>
              </div>
              <p className="text-[11px] text-slate-500">
                Total Panjang Ruas Jalan Terdaftar: <strong>{KEMANTAPAN_JALAN_DATA.totalPanjangKm} Km</strong>
              </p>
            </div>

            <div className="h-44 sm:h-52 w-full my-2 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataKemantapanPie}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {dataKemantapanPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`${val} Km`, 'Panjang']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600">
                  {KEMANTAPAN_JALAN_DATA.persenMantap}%
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Mantap</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center text-[10.5px]">
              <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                <div className="font-bold">{KEMANTAPAN_JALAN_DATA.ruasMantapKm} Km</div>
                <div className="text-[9px]">Mantap (91.4%)</div>
              </div>
              <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                <div className="font-bold">{KEMANTAPAN_JALAN_DATA.ruasRusakRinganKm} Km</div>
                <div className="text-[9px]">Ringan (6.0%)</div>
              </div>
              <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800">
                <div className="font-bold">{KEMANTAPAN_JALAN_DATA.ruasRusakBeratKm} Km</div>
                <div className="text-[9px]">Berat (2.6%)</div>
              </div>
            </div>
          </div>

          {/* Table: Breakdown Hierarki Jalan (8 Cols) */}
          <div className="lg:col-span-8 bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  Sebaran Ruas Jalan Berdasarkan Fungsi &amp; Kapasitas Lajur
                </h4>
                <p className="text-[11px] text-slate-500">
                  Klasifikasi arteri primer, kolektor, lokal, dan akses strategis pelabuhan/bandara
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                Satu Data Hal. 49
              </span>
            </div>

            <div className="overflow-x-auto my-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-200/70 text-slate-700 border-b border-slate-300 font-semibold">
                    <th className="py-2 px-2.5">Fungsi Jaringan Jalan</th>
                    <th className="py-2 px-2.5">Kapasitas Lajur</th>
                    <th className="py-2 px-2.5 text-right">Total Panjang</th>
                    <th className="py-2 px-2.5 text-right">Kondisi Mantap</th>
                    <th className="py-2 px-2.5 text-right">Indeks Kemantapan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {KEMANTAPAN_JALAN_DATA.distribusiHierarki.map((row) => (
                    <tr key={row.nama} className="hover:bg-slate-50/80">
                      <td className="py-2 px-2.5 font-bold text-slate-800">{row.nama}</td>
                      <td className="py-2 px-2.5 font-mono text-slate-600">{row.lajur}</td>
                      <td className="py-2 px-2.5 text-right font-mono font-bold text-slate-900">{row.panjangKm} Km</td>
                      <td className="py-2 px-2.5 text-right font-mono text-emerald-600 font-bold">{row.mantapKm} Km</td>
                      <td className="py-2 px-2.5 text-right">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                          {row.persen}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-2.5 bg-slate-100 rounded-lg text-xs text-slate-600 flex items-center justify-between">
              <span>Jalan Sudirman, Flyover Sei Ladi, dan Koridor Nongsa menopang mobilitas 95,0% logistik kontainer Batam.</span>
              <button
                onClick={() => onNavigateToUnit && onNavigateToUnit('dit-pembangunan-infrastruktur')}
                className="font-bold text-blue-700 hover:underline shrink-0 ml-2"
              >
                Detail Ruas &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: PNBP ROW UTILITAS & PENGHIJAUAN                         */}
      {/* ============================================================== */}
      {(activeVisualTab === 'ringkasan' || activeVisualTab === 'pnbp-row') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          {PNBP_INFRASTRUKTUR_DETAIL.komponen.map((komp, idx) => (
            <div key={komp.sumber} className="bg-slate-50/80 rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800">
                    {komp.kodeDataset}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600">
                    +{ (komp.persen - 100).toFixed(1) }% Surplus
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 leading-snug">
                  {komp.sumber}
                </h5>
                <div className="my-2 p-2 rounded-lg bg-white border border-slate-200 flex items-baseline justify-between">
                  <div>
                    <div className="text-[9.5px] uppercase font-mono text-slate-400">Realisasi Penerimaan</div>
                    <div className="text-base font-black font-mono text-slate-900">
                      Rp {(komp.realisasiRupiah / 1000000000).toFixed(2)} M
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9.5px] uppercase font-mono text-slate-400">Target DIPA</div>
                    <div className="text-xs font-mono font-bold text-slate-600">
                      Rp {(komp.targetRupiah / 1000000000).toFixed(2)} M
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600">
                  <div><strong>Volume:</strong> {komp.volume}</div>
                  <div><strong>Izin Terbit:</strong> {komp.skTerbit} SK (SLA: {komp.slaHari})</div>
                  <div className="text-slate-500 truncate"><strong>Mitra:</strong> {komp.mitraUtama}</div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10.5px]">
                <span className="text-emerald-700 font-bold">Capaian: {komp.persen.toFixed(1)}%</span>
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => onOpenFormulaModal('ikp-2-pnbp-infrastruktur')}>
                  Rumus PNBP &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
