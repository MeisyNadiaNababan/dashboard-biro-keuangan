import React, { useState } from 'react';
import {
  TrendingUp,
  AlertOctagon,
  ShieldCheck,
  Zap,
  Activity,
  Award,
  Layers,
  HelpCircle,
  Clock,
  ArrowRight,
  Route,
  Network,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';
import {
  KURVA_S_AGREGAT_TAHUN_BERJALAN,
  SUMMARY_RUAS_JARINGAN_JALAN,
  SUMMARY_ROW_UTILITAS,
  SUMMARY_ROW_PENGHIJAUAN,
} from './infrastrukturData';

export const MonitoringInfrastrukturAtasan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kurva-s' | 'kemantapan-jalan' | 'sinkronisasi-row'>('kurva-s');

  const { kondisiJalan, klasifikasiFungsi, distribusiWilayah } = SUMMARY_RUAS_JARINGAN_JALAN;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 text-base">
                  Monitoring Strategis Pimpinan (Executive Overview)
                </h3>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                  Decision Support System
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Visualisasi terpadu Kurva S agregat, indeks kemantapan jalan, dan pengendalian izin galian utilitas
              </p>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('kurva-s')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'kurva-s'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kurva-S & Burn Rate
          </button>
          <button
            onClick={() => setActiveTab('kemantapan-jalan')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'kemantapan-jalan'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Indeks Kemantapan Jalan (542 Km)
          </button>
          <button
            onClick={() => setActiveTab('sinkronisasi-row')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'sinkronisasi-row'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sinkronisasi Galian ROW
          </button>
        </div>
      </div>

      {/* VIEW 1: KURVA S AGREGAT & FISCAL BURN RATE */}
      {activeTab === 'kurva-s' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            {/* S-Curve Trajectory Chart Area */}
            <div className="lg:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">
                    Kurva S Agregat Seluruh Proyek Fisik TA 2025
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Perbandingan Rencana Kumulatif (Target), Realisasi Fisik (Lapangan), dan Realisasi Keuangan (SP2D)
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  Deviasi Kumulatif: -1.5% (On Track)
                </span>
              </div>

              {/* Kurva S Graphical SVG */}
              <div className="h-56 relative w-full pt-4">
                <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line
                      key={y}
                      x1="40"
                      y1={y}
                      x2="490"
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray="3,3"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y Axis Labels */}
                  <text x="32" y="204" fill="#94a3b8" fontSize="10" textAnchor="end">0%</text>
                  <text x="32" y="154" fill="#94a3b8" fontSize="10" textAnchor="end">25%</text>
                  <text x="32" y="104" fill="#94a3b8" fontSize="10" textAnchor="end">50%</text>
                  <text x="32" y="54" fill="#94a3b8" fontSize="10" textAnchor="end">75%</text>
                  <text x="32" y="8" fill="#94a3b8" fontSize="10" textAnchor="end">100%</text>

                  {/* Target Line (Dotted Gray/Navy) */}
                  <path
                    d="M 50 190 Q 200 160, 280 80 T 480 5"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2.5"
                    strokeDasharray="4,4"
                  />

                  {/* Realisasi Fisik Curve (Solid Sky Blue) */}
                  <path
                    d="M 50 188 Q 190 155, 275 83 T 360 32"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="3.5"
                  />

                  {/* Realisasi Keuangan Curve (Solid Emerald) */}
                  <path
                    d="M 50 192 Q 195 162, 278 92 T 360 42"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                  />

                  {/* Milestone Dots */}
                  {KURVA_S_AGREGAT_TAHUN_BERJALAN.slice(0, 9).map((pt, idx) => {
                    const x = 50 + idx * 38.5;
                    const yFisik = 200 - (pt.realisasi! / 100) * 195;
                    return (
                      <g key={pt.bulan}>
                        <circle cx={x} cy={yFisik} r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                        <text x={x} y="215" fill="#64748b" fontSize="9" textAnchor="middle">
                          {pt.bulan}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-3 border-t border-slate-200 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-slate-400 border-b border-dashed" />
                  <span className="text-slate-600">Rencana Target Kumulatif</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-sky-600 rounded" />
                  <span className="text-slate-800 font-semibold">Realisasi Fisik Lapangan (86.5%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-emerald-600 rounded" />
                  <span className="text-slate-800 font-semibold">Realisasi Keuangan / SP2D (81.0%)</span>
                </div>
              </div>
            </div>

            {/* Early Warning SCM Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                    <AlertOctagon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">
                      Peringatan Kontrak Kritis (SCM)
                    </h5>
                    <span className="text-[10px] text-slate-500">
                      Standar Ditjen Bina Marga / LKPP
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Proyek dengan deviasi minus melebihi ambang batas kritis memerlukan intervensi langsung Direktur:
                </p>

                <div className="space-y-2.5 mb-3">
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs">
                    <div className="flex items-center justify-between font-semibold text-rose-800 mb-0.5">
                      <span>Dermaga Batu Ampar</span>
                      <span className="text-rose-600 font-bold">Deviasi -11.5%</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Tahap: <strong>SCM 1</strong> • Solusi: Tambah rig pemancang batuan keras.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs">
                    <div className="flex items-center justify-between font-semibold text-rose-800 mb-0.5">
                      <span>Akses Kabil - Punggur</span>
                      <span className="text-rose-600 font-bold">Deviasi -13.0%</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Tahap: <strong>SCM 2</strong> • Solusi: Wajib tambah shift malam &amp; batching plant.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-xs text-sky-800">
                <strong className="block font-semibold mb-0.5">💡 Rekomendasi Direktur:</strong>
                Fisik (86,5%) mendahului Keuangan (81,0%) sebesar 5,5%. Segera proses termin kontraktor agar cashflow proyek tetap terjaga stabil menjelang PHO.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INDEKS KEMANTAPAN JALAN (DATASET NO. 3) */}
      {activeTab === 'kemantapan-jalan' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <span className="text-[11px] font-semibold text-emerald-800 block">
                Kondisi Mantap (Baik)
              </span>
              <span className="text-2xl font-bold text-emerald-700">
                {kondisiJalan.baikKm} Km
              </span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">
                70.4% dari total jaringan jalan
              </span>
            </div>

            <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-200">
              <span className="text-[11px] font-semibold text-sky-800 block">
                Kondisi Mantap (Sedang)
              </span>
              <span className="text-2xl font-bold text-sky-700">
                {kondisiJalan.sedangKm} Km
              </span>
              <span className="text-[10px] text-sky-600 block mt-0.5">
                19.0% dari total jaringan jalan
              </span>
            </div>

            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200">
              <span className="text-[11px] font-semibold text-amber-800 block">
                Rusak Ringan (Perlu Preservasi)
              </span>
              <span className="text-2xl font-bold text-amber-700">
                {kondisiJalan.rusakRinganKm} Km
              </span>
              <span className="text-[10px] text-amber-600 block mt-0.5">
                7.6% (Overlay berkala TA 2026)
              </span>
            </div>

            <div className="p-3.5 bg-rose-50/70 rounded-xl border border-rose-200">
              <span className="text-[11px] font-semibold text-rose-800 block">
                Rusak Berat (Rekonstruksi)
              </span>
              <span className="text-2xl font-bold text-rose-700">
                {kondisiJalan.rusakBeratKm} Km
              </span>
              <span className="text-[10px] text-rose-600 block mt-0.5">
                3.0% (Jalur industri trailer kontainer)
              </span>
            </div>
          </div>

          {/* Koridor Kemantapan Breakdown */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[10px]">
                <tr>
                  <th className="px-3 py-2.5">Wilayah Koridor Jaringan Jalan</th>
                  <th className="px-3 py-2.5 text-center">Jumlah Ruas</th>
                  <th className="px-3 py-2.5 text-right">Panjang Total (Km)</th>
                  <th className="px-3 py-2.5 text-center">Tingkat Kemantapan</th>
                  <th className="px-3 py-2.5">Status Prioritas Pemeliharaan TA 2026</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {distribusiWilayah.map((w) => (
                  <tr key={w.wilayah} className="hover:bg-slate-50/80">
                    <td className="px-3 py-2.5 font-semibold text-slate-800">
                      {w.wilayah}
                    </td>
                    <td className="px-3 py-2.5 text-center">{w.ruas} Ruas</td>
                    <td className="px-3 py-2.5 text-right font-medium text-slate-700">
                      {w.panjangKm} Km
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {w.kemantapan}%
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-600">
                      {w.kemantapan > 90 ? (
                        <span className="text-slate-500">Pemeliharaan Rutin Tambal Lubang</span>
                      ) : (
                        <span className="text-amber-700 font-medium">Prioritas Rekonstruksi &amp; Overlay</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: SINKRONISASI ROW UTILITAS & PENGHIJAUAN (DATASET NO. 1 & 2) */}
      {activeTab === 'sinkronisasi-row' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* ROW Utilitas Panel */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Network className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    Pengendalian Galian Utilitas (142 Izin)
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  Dataset No. 1
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-3">
                Aturan &quot;Zero Open Trench&quot; pada koridor jalan baru: Kontraktor utilitas (FO Telkom, SPAM, PGN, PLN) wajib menempatkan kabel dalam manhole terpadu atau ducting bersama.
              </p>

              <div className="space-y-2 text-xs">
                {SUMMARY_ROW_UTILITAS.kategori.map((k) => (
                  <div key={k.nama} className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-slate-800 block">{k.nama}</span>
                      <span className="text-[10px] text-slate-400">Total Panjang: {k.panjangTotalKm} Km</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-indigo-700">{k.jumlah} Izin</span>
                      <span className="text-[10px] text-slate-500 block">({k.persentase}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW Penghijauan Panel */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    Adopsi Ruang Hijau & CSR (86 Izin)
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Dataset No. 2
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-3">
                Kemitraan bersama tenant industri (Batamindo, Panbil, KEK Nongsa) untuk pemeliharaan median jalan bernilai estetika tinggi tanpa membebani APBN/PNBP.
              </p>

              <div className="space-y-2 text-xs">
                {SUMMARY_ROW_PENGHIJAUAN.kategori.map((k) => (
                  <div key={k.nama} className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-slate-800 block">{k.nama}</span>
                      <span className="text-[10px] text-slate-400">Cakupan Area: {(k.luasM2 / 10000).toFixed(1)} Hektar</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-700">{k.jumlah} Izin</span>
                      <span className="text-[10px] text-slate-500 block">({k.persentase}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
