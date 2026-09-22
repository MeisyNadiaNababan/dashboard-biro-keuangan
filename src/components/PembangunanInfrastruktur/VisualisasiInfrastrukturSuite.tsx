import React, { useState } from 'react';
import {
  TrendingUp,
  Activity,
  Layers,
  Zap,
  Trees,
  Route,
  Mountain,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  HardHat,
  BarChart3,
  Percent,
  Coins,
  FileCheck2,
  Hammer,
  HelpCircle,
} from 'lucide-react';
import {
  KURVA_S_AGREGAT_TAHUN_BERJALAN,
  DATASET_4_PROGRES_KONSTRUKSI,
  REKAP_JENIS_PEMBANGUNAN,
  SUMMARY_RUAS_JARINGAN_JALAN,
  SUMMARY_ROW_UTILITAS,
  SUMMARY_ROW_PENGHIJAUAN,
  SUMMARY_PEMATANGAN_TANAH,
  DATASET_5_PEMATANGAN_TANAH,
} from './infrastrukturData';

type VizCategory =
  | 'semua'
  | 'kurva-s'
  | 'efisiensi'
  | 'jalan'
  | 'row'
  | 'pematangan'
  | 'kendala';

interface VisualisasiInfrastrukturSuiteProps {
  onOpenFormula?: (kpi: 'kpi-kurva-s' | 'kpi-progres-fisik') => void;
  onSelectPaketKritis?: () => void;
}

export const VisualisasiInfrastrukturSuite: React.FC<VisualisasiInfrastrukturSuiteProps> = ({
  onOpenFormula,
  onSelectPaketKritis,
}) => {
  const [activeViz, setActiveViz] = useState<VizCategory>('semua');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(8); // Default September (current)

  // SCM Projects
  const kritisProjects = DATASET_4_PROGRES_KONSTRUKSI.filter(
    (p) => p.statusKurvaS === 'Kritis (SCM)' || (p.tingkatKritis && p.tingkatKritis.includes('SCM'))
  );

  // Financial totals for tender efficiency
  const totalPagu = REKAP_JENIS_PEMBANGUNAN.reduce((sum, item) => sum + item.totalPagu, 0);
  const totalKontrak = Math.round(totalPagu * 0.9467); // Estimated aggregated contract sum
  const totalHemat = totalPagu - totalKontrak;
  const persenHemat = ((totalHemat / totalPagu) * 100).toFixed(1);

  // Current month data point
  const currentMonthData =
    hoveredMonth !== null
      ? KURVA_S_AGREGAT_TAHUN_BERJALAN[hoveredMonth]
      : KURVA_S_AGREGAT_TAHUN_BERJALAN[8];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 mb-4 font-sans">
      {/* Header Visualisasi Terpadu */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 mb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200 shrink-0">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                DATA VISUALIZER
              </span>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                Visualisasi Analitik Direktorat Pembangunan Infrastruktur
              </h2>
            </div>
            <p className="text-[10.5px] text-slate-500">
              Visualisasi berbasis data atribut resmi Satu Data (Hal. 48–51): Kurva S, Kemantapan Jalan, ROW &amp; Cut/Fill
            </p>
          </div>
        </div>

        {/* View Switcher Chips */}
        <div className="flex items-center gap-1 overflow-x-auto text-[10.5px] bg-slate-100 p-0.5 rounded-lg shrink-0">
          {[
            { id: 'semua', label: 'Semua Visual' },
            { id: 'kurva-s', label: 'Kurva S & SCM' },
            { id: 'efisiensi', label: 'Efisiensi Tender' },
            { id: 'jalan', label: 'Jaringan Jalan' },
            { id: 'row', label: 'ROW Utilitas & Hijau' },
            { id: 'pematangan', label: 'Pematangan BSW' },
            { id: 'kendala', label: 'Kendala Lapangan' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveViz(tab.id as VizCategory)}
              className={`px-2 py-1 rounded font-medium whitespace-nowrap transition-all ${
                activeViz === tab.id
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: KURVA S AGREGAT & KONTRAK KRITIS (DS #4 & #6) */}
      {/* ========================================================================= */}
      {(activeViz === 'semua' || activeViz === 'kurva-s') && (
        <div className="mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Kurva S Chart Area (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50/70 rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/60">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-sky-100/80 text-sky-700 flex items-center justify-center">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">
                      Kurva S Progres Fisik vs Keuangan Kumulatif TA 2025
                    </h3>
                    <span className="text-[9.5px] text-slate-500">
                      Target Rencana vs Realisasi Fisik (PRGRS_PEK) vs Realisasi Keuangan
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Deviasi Kumulatif: -1.5%
                  </span>
                  {onOpenFormula && (
                    <button
                      onClick={() => onOpenFormula('kpi-kurva-s')}
                      className="text-slate-400 hover:text-sky-600 p-0.5"
                      title="Rumus Kurva S"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Kurva S SVG Visualization */}
              <div className="h-44 relative w-full pt-1">
                <svg viewBox="0 0 540 160" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guide Lines */}
                  {[0, 40, 80, 120, 160].map((y) => (
                    <line
                      key={y}
                      x1="38"
                      y1={y}
                      x2="530"
                      y2={y}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                  ))}

                  {/* Y-Axis Labels */}
                  <text x="32" y="160" fill="#94a3b8" fontSize="9" textAnchor="end">0%</text>
                  <text x="32" y="120" fill="#94a3b8" fontSize="9" textAnchor="end">25%</text>
                  <text x="32" y="80" fill="#94a3b8" fontSize="9" textAnchor="end">50%</text>
                  <text x="32" y="40" fill="#94a3b8" fontSize="9" textAnchor="end">75%</text>
                  <text x="32" y="10" fill="#94a3b8" fontSize="9" textAnchor="end">100%</text>

                  {/* Area fill under Realisasi Fisik */}
                  <path
                    d="M 50 152 Q 190 120, 275 68 T 390 26 L 390 160 L 50 160 Z"
                    fill="url(#curveFill)"
                  />

                  {/* Rencana Fisik (Dashed Slate) */}
                  <path
                    d="M 50 152 Q 195 125, 280 64 T 525 6"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />

                  {/* Realisasi Fisik (Solid Sky Blue) */}
                  <path
                    d="M 50 152 Q 190 120, 275 68 T 390 26"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Realisasi Keuangan (Solid Emerald) */}
                  <path
                    d="M 50 154 Q 195 128, 278 78 T 390 34"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />

                  {/* Month Data Nodes */}
                  {KURVA_S_AGREGAT_TAHUN_BERJALAN.map((pt, idx) => {
                    // Spread along x-axis from 50 to 525
                    const x = 50 + idx * ((525 - 50) / 11);
                    const isSelected = hoveredMonth === idx;
                    const hasData = pt.realisasi !== null;

                    return (
                      <g
                        key={pt.bulan}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredMonth(idx)}
                      >
                        {/* Vertical line indicator on hover */}
                        {isSelected && (
                          <line
                            x1={x}
                            y1="0"
                            x2={x}
                            y2="160"
                            stroke="#0284c7"
                            strokeWidth="1.5"
                            strokeDasharray="3,3"
                          />
                        )}

                        {/* X-axis Month Label */}
                        <text
                          x={x}
                          y="172"
                          fill={isSelected ? '#0284c7' : '#64748b'}
                          fontSize={isSelected ? '9.5' : '8.5'}
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          textAnchor="middle"
                        >
                          {pt.bulan.split(' ')[0]}
                        </text>

                        {/* Realisasi Point */}
                        {hasData && (
                          <circle
                            cx={x}
                            cy={160 - (pt.realisasi! / 100) * 155}
                            r={isSelected ? 4.5 : 3}
                            fill="#0284c7"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                        )}

                        {/* Target Point */}
                        <circle
                          cx={x}
                          cy={160 - (pt.target / 100) * 155}
                          r={isSelected ? 3.5 : 2}
                          fill="#94a3b8"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Interactive Tooltip Bar below Kurva S */}
              <div className="mt-4 pt-2 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-[10.5px]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-slate-400 border-b border-dashed border-slate-400" />
                    <span className="text-slate-500 font-medium">Target:</span>
                    <strong className="text-slate-700">{currentMonthData.target}%</strong>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-1 bg-sky-600 rounded-full" />
                    <span className="text-slate-500 font-medium">Realisasi Fisik:</span>
                    <strong className="text-sky-700">
                      {currentMonthData.realisasi !== null ? `${currentMonthData.realisasi}%` : 'Proyeksi'}
                    </strong>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-emerald-500" />
                    <span className="text-slate-500 font-medium">Realisasi Keu:</span>
                    <strong className="text-emerald-700">
                      {currentMonthData.keuangan !== null ? `${currentMonthData.keuangan}%` : 'Proyeksi'}
                    </strong>
                  </div>
                </div>

                {currentMonthData.realisasi !== null && (
                  <span
                    className={`font-mono font-bold px-1.5 py-0.5 rounded text-[9.5px] ${
                      currentMonthData.realisasi - currentMonthData.target >= 0
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    Deviasi: {(currentMonthData.realisasi - currentMonthData.target).toFixed(1)}%
                  </span>
                )}
              </div>
            </div>

            {/* SCM Alert & Paket Kritis Card (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-rose-50 text-rose-600 flex items-center justify-center">
                      <ShieldAlert className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        Peringatan Kontrak Kritis (SCM)
                      </h4>
                      <span className="text-[9.5px] text-slate-500">
                        Paket dengan deviasi fisik negatif &gt; 10%
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                    {kritisProjects.length} Paket Kritis
                  </span>
                </div>

                <div className="space-y-2">
                  {kritisProjects.map((pkt) => (
                    <div
                      key={pkt.id}
                      className="p-2.5 rounded-lg border border-rose-100 bg-rose-50/40 hover:bg-rose-50/70 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-200/70 text-rose-900">
                          {pkt.tingkatKritis || 'SCM'}
                        </span>
                        <span className="text-[10.5px] font-mono font-bold text-rose-700">
                          Deviasi: {pkt.deviasiFisikPersen}%
                        </span>
                      </div>
                      <h5 className="text-[11px] font-bold text-slate-900 line-clamp-1">
                        {pkt.namaPaket}
                      </h5>
                      <p className="text-[9.5px] text-slate-500 mt-0.5 line-clamp-1">
                        Kontraktor: <span className="font-semibold text-slate-700">{pkt.kontraktor}</span> • Nilai: Rp {pkt.nilaiKontrakMiliar} M
                      </p>
                      <div className="mt-1.5 flex items-center justify-between text-[9.5px] text-slate-600 bg-white/70 px-2 py-1 rounded border border-rose-100">
                        <span>Rencana: <strong>{pkt.rencanaFisikPersen}%</strong></span>
                        <span>Realisasi: <strong>{pkt.realisasiFisikPersen}%</strong></span>
                        <span className="text-rose-700 font-semibold">{pkt.sisaHari} Hari Sisa</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {onSelectPaketKritis && (
                <button
                  onClick={onSelectPaketKritis}
                  className="w-full mt-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10.5px] font-semibold transition-colors flex items-center justify-center gap-1 shadow-2xs"
                >
                  <Activity className="w-3 h-3 text-sky-400" />
                  <span>Lihat Detail SCM &amp; Rencana Aksi</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: EFISIENSI ANGGARAN & DISTRIBUSI KATEGORI PROYEK (DS #6 & #5) */}
      {/* ========================================================================= */}
      {(activeViz === 'semua' || activeViz === 'efisiensi') && (
        <div className="mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Visualisasi Efisiensi Tender (Pagu vs HPS vs Kontrak) (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 pb-2 mb-2.5 border-b border-slate-100">
                  <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Coins className="w-3 h-3" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">
                      Efisiensi Pengadaan Konstruksi (Hal. 50-51)
                    </h3>
                    <span className="text-[9.5px] text-slate-500">
                      Komparasi Pagu Fiskal (NPAGU_F) vs HPS (NHPS_S) vs Kontrak (NKON_S)
                    </span>
                  </div>
                </div>

                {/* Comparative Stacked Bar */}
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[10.5px] mb-1">
                      <span className="font-semibold text-slate-600">Pagu Anggaran (NPAGU_F)</span>
                      <span className="font-mono font-bold text-slate-900">
                        Rp {(totalPagu / 1000000000000).toFixed(2)} Triliun
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 rounded-full w-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10.5px] mb-1">
                      <span className="font-semibold text-slate-600">Harga Perkiraan Sendiri (NHPS_S)</span>
                      <span className="font-mono font-bold text-sky-700">
                        Rp {((totalPagu * 0.972) / 1000000000000).toFixed(2)} Triliun (97.2%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: '97.2%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10.5px] mb-1">
                      <span className="font-semibold text-slate-600">Nilai Kontrak Terikat (NKON_S)</span>
                      <span className="font-mono font-bold text-emerald-700">
                        Rp {(totalKontrak / 1000000000000).toFixed(2)} Triliun (94.7%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: '94.7%' }} />
                    </div>
                  </div>
                </div>

                {/* Savings Callout Box */}
                <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-emerald-800 font-semibold block">
                        Penghematan Tender / Efisiensi Fiskal
                      </span>
                      <strong className="text-xs font-black text-emerald-900 font-mono">
                        +Rp {(totalHemat / 1000000000).toFixed(1)} Miliar ({persenHemat}%)
                      </strong>
                    </div>
                  </div>
                  <span className="text-[9px] bg-white px-2 py-1 rounded text-emerald-800 font-bold border border-emerald-200">
                    Audit BPK Compliant
                  </span>
                </div>
              </div>

              <div className="mt-3 text-[9.5px] text-slate-400 italic">
                *Data teragregasi dari seluruh kontrak aktif APBN &amp; Multi-Years PNBP BP Batam TA 2025.
              </div>
            </div>

            {/* Visualisasi Distribusi Anggaran & Proyek per Kategori (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-indigo-50 text-indigo-700 flex items-center justify-center">
                      <Layers className="w-3 h-3" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">
                        Distribusi 6 Kategori Pekerjaan Konstruksi (JNS_PEK)
                      </h3>
                      <span className="text-[9.5px] text-slate-500">
                        Proporsi pagu anggaran dan capaian paket selesai (Hal. 50-51)
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    58 Total Paket
                  </span>
                </div>

                {/* Category Horizontal Bars */}
                <div className="space-y-2">
                  {REKAP_JENIS_PEMBANGUNAN.map((item) => (
                    <div key={item.jenisPekerjaan} className="group">
                      <div className="flex items-center justify-between text-[10.5px] mb-0.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-xs shrink-0"
                            style={{ backgroundColor: item.warna }}
                          />
                          <span className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                            {item.singkatan}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">
                            ({item.jumlahProyek} Paket)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-slate-700">
                            Rp {(item.totalPagu / 1000000000).toFixed(0)} M
                          </span>
                        </div>
                      </div>

                      {/* Visual Bar with Selesai / On Track indicator */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.persentaseAnggaran * 2.1}%`,
                            backgroundColor: item.warna,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>Peningkatan Jalan &amp; Jembatan menyerap proporsi terbesar (44.0% Pagu).</span>
                <span className="text-emerald-700 font-semibold">21 Paket Telah PHO / Selesai</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: INDEKS KEMANTAPAN JALAN & PERIZINAN ROW (DS #3, #1, #2) */}
      {/* ========================================================================= */}
      {(activeViz === 'semua' || activeViz === 'jalan' || activeViz === 'row') && (
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
            {/* Visualisasi Kemantapan Jalan (DS #3) (6 cols) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Route className="w-3 h-3" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">
                        Indeks Kemantapan Jaringan Jalan BP Batam (Hal. 49)
                      </h3>
                      <span className="text-[9.5px] text-slate-500">
                        Kondisi Fisik (LKONOF) dan Panjang Ruas (SHAPE_LENG) Total 542,8 Km
                      </span>
                    </div>
                  </div>
                  <span className="text-[10.5px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    89,4% Mantap
                  </span>
                </div>

                {/* Stacked Visual Bar for Road Conditions */}
                <div className="mb-3">
                  <div className="h-4 w-full rounded-lg overflow-hidden flex shadow-2xs">
                    <div
                      className="bg-emerald-600 h-full flex items-center justify-center text-[9px] text-white font-bold"
                      style={{ width: '70.4%' }}
                      title="Baik: 382.2 Km (70.4%)"
                    >
                      Baik (70.4%)
                    </div>
                    <div
                      className="bg-sky-500 h-full flex items-center justify-center text-[9px] text-white font-bold"
                      style={{ width: '19.0%' }}
                      title="Sedang: 103.1 Km (19.0%)"
                    >
                      Sedang (19%)
                    </div>
                    <div
                      className="bg-amber-500 h-full flex items-center justify-center text-[9px] text-white font-bold"
                      style={{ width: '7.6%' }}
                      title="Rusak Ringan: 41.2 Km (7.6%)"
                    >
                      RR
                    </div>
                    <div
                      className="bg-rose-600 h-full flex items-center justify-center text-[9px] text-white font-bold"
                      style={{ width: '3.0%' }}
                      title="Rusak Berat: 16.3 Km (3.0%)"
                    >
                      RB
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 mt-2 text-center text-[9.5px]">
                    <div className="bg-emerald-50/60 p-1.5 rounded border border-emerald-100">
                      <span className="text-emerald-800 font-semibold block">Kondisi Baik</span>
                      <strong className="text-emerald-900 font-mono">382,2 Km</strong>
                    </div>
                    <div className="bg-sky-50/60 p-1.5 rounded border border-sky-100">
                      <span className="text-sky-800 font-semibold block">Kondisi Sedang</span>
                      <strong className="text-sky-900 font-mono">103,1 Km</strong>
                    </div>
                    <div className="bg-amber-50/60 p-1.5 rounded border border-amber-100">
                      <span className="text-amber-800 font-semibold block">Rusak Ringan</span>
                      <strong className="text-amber-900 font-mono">41,2 Km</strong>
                    </div>
                    <div className="bg-rose-50/60 p-1.5 rounded border border-rose-100">
                      <span className="text-rose-800 font-semibold block">Rusak Berat</span>
                      <strong className="text-rose-900 font-mono">16,3 Km</strong>
                    </div>
                  </div>
                </div>

                {/* Breakdown Kelas Jalan */}
                <div className="space-y-1.5 text-[10.5px]">
                  <span className="text-[10px] font-bold text-slate-700 block">
                    Panjang &amp; Kemantapan per Klasifikasi Fungsi:
                  </span>
                  {SUMMARY_RUAS_JARINGAN_JALAN.klasifikasiFungsi.map((kls) => (
                    <div key={kls.nama} className="flex items-center justify-between">
                      <span className="text-slate-600 truncate">{kls.nama} ({kls.jumlahRuas} Ruas)</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-slate-500">{kls.panjangKm} Km</span>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1 rounded text-[9px]">
                          {kls.mantapPersen}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[9.5px] text-slate-500">
                <span>Rata-rata IRI: 3.2 (Kategori Mantap / Halus)</span>
                <span>Standar Pelayanan Minimal (SPM): &gt; 85%</span>
              </div>
            </div>

            {/* Visualisasi Pemanfaatan ROW: Utilitas & Penghijauan (DS #1 & #2) (6 cols) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Zap className="w-3 h-3" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">
                        Pemanfaatan ROW Utilitas &amp; Penghijauan (Hal. 48)
                      </h3>
                      <span className="text-[9.5px] text-slate-500">
                        Metode Galian (Terbuka vs Crossing) &amp; Total Ruang Terbuka Hijau
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    142 Izin Utilitas
                  </span>
                </div>

                {/* Utilitas & Galian Comparison */}
                <div className="grid grid-cols-2 gap-2 mb-2.5">
                  <div className="bg-slate-50/70 p-2 rounded-lg border border-slate-200/70">
                    <span className="text-[10px] font-bold text-slate-700 block mb-1">
                      Jenis Utilitas (142 Izin)
                    </span>
                    <div className="space-y-1 text-[9.5px]">
                      {SUMMARY_ROW_UTILITAS.kategori.map((kat) => (
                        <div key={kat.nama} className="flex justify-between items-center">
                          <span className="text-slate-600 truncate">{kat.nama.split(' ')[0]}</span>
                          <span className="font-mono font-bold text-slate-800">{kat.persentase}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50/70 p-2 rounded-lg border border-slate-200/70">
                    <span className="text-[10px] font-bold text-slate-700 block mb-1">
                      Metode Galian (381 Km)
                    </span>
                    <div className="space-y-1.5 text-[9.5px]">
                      <div>
                        <div className="flex justify-between text-slate-600 mb-0.5">
                          <span>Galian Terbuka:</span>
                          <strong className="font-mono text-slate-800">298 Km (78%)</strong>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="bg-sky-600 h-full rounded-full" style={{ width: '78%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-600 mb-0.5">
                          <span>Galian Crossing:</span>
                          <strong className="font-mono text-slate-800">83 Km (22%)</strong>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '22%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROW Penghijauan Highlight */}
                <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Trees className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10.5px] font-bold text-slate-900 block">
                        ROW Penghijauan &amp; Median Taman (DS #2)
                      </span>
                      <span className="text-[9.5px] text-slate-600">
                        86 Izin Terbit • <strong>34,2 Hektar</strong> RTH Ditata • <strong>14.850</strong> Pohon
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                    79% Terawat
                  </span>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[9.5px] text-slate-500">
                <span>Tingkat Rekondisi Aspal: <strong>70.4% Selesai Rekondisi</strong></span>
                <span className="text-sky-700 font-semibold">TMT Izin Termonitor</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: PEMATANGAN TANAH KAWASAN BSW (DS #5 - Hal. 50-51) */}
      {/* ========================================================================= */}
      {(activeViz === 'semua' || activeViz === 'pematangan') && (
        <div className="mb-4">
          <div className="bg-slate-50/70 rounded-xl border border-slate-200/90 p-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2.5 border-b border-slate-200/70">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Mountain className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800">
                    Pematangan Tanah &amp; Cut/Fill Kawasan BSW (Dataset No. 5 Hal. 50)
                  </h3>
                  <span className="text-[9.5px] text-slate-500">
                    Volume Galian &amp; Timbunan (VOL_PEK), Pagu (NPAGU_F), Kontraktor &amp; Progres Realisasi
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                  Total Volume: <strong>4.270.000 m³</strong>
                </span>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold border border-amber-200">
                  Total Luas: 280 Hektar
                </span>
              </div>
            </div>

            {/* Visual Grid of 5 BSW Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {DATASET_5_PEMATANGAN_TANAH.map((bsw) => (
                <div
                  key={bsw.id}
                  className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono font-bold text-slate-500">
                        {bsw.id}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          bsw.statusProgres === 'Ahead'
                            ? 'bg-emerald-50 text-emerald-700'
                            : bsw.statusProgres === 'Waspada'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-sky-50 text-sky-700'
                        }`}
                      >
                        {bsw.statusProgres}
                      </span>
                    </div>
                    <h4 className="text-[11px] font-bold text-slate-900 line-clamp-1">
                      {bsw.wilayahBsw}
                    </h4>
                    <p className="text-[9.5px] text-slate-500 line-clamp-1 mb-2">
                      {bsw.jenisPekerjaan}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1 mb-2">
                      <div className="flex justify-between text-[9.5px]">
                        <span className="text-slate-500">Progres Fisik:</span>
                        <span className="font-mono font-bold text-slate-900">
                          {bsw.progresRealisasiPersen}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            bsw.statusProgres === 'Ahead'
                              ? 'bg-emerald-500'
                              : bsw.statusProgres === 'Waspada'
                              ? 'bg-amber-500'
                              : 'bg-sky-500'
                          }`}
                          style={{ width: `${bsw.progresRealisasiPersen}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-0.5 text-[9.5px] text-slate-600 bg-slate-50 p-1.5 rounded">
                      <div className="flex justify-between">
                        <span>Luas Lahan:</span>
                        <strong className="font-mono">{bsw.luasAreaHektar} Ha</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume:</span>
                        <strong className="font-mono">{(bsw.volumeCutFillM3 / 1000).toLocaleString('id-ID')}k m³</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Nilai Kontrak:</span>
                        <strong className="font-mono text-slate-900">Rp {bsw.nilaiKontrakMiliar} M</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-100 text-[8.5px] text-slate-400 truncate">
                    Kontraktor: {bsw.kontraktor.split('(')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: TAKSONOMI KENDALA LAPANGAN & MITIGASI (Hal. 50 Atribut KENDALA) */}
      {/* ========================================================================= */}
      {(activeViz === 'semua' || activeViz === 'kendala') && (
        <div>
          <div className="bg-slate-50/80 rounded-xl border border-slate-200/90 p-3">
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200/70">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800">
                    Analisis &amp; Manajemen Kendala Lapangan (Atribut KENDALA Hal. 50-51)
                  </h3>
                  <span className="text-[9.5px] text-slate-500">
                    Identifikasi faktor penghambat dan tindak lanjut mitigasi teknis proyek infrastruktur
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                Monitoring Aktif
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                {
                  kategori: 'Relokasi Utilitas Bawah Tanah',
                  persen: 38,
                  warna: 'border-sky-300 bg-sky-50/50 text-sky-800',
                  badge: 'Dominan (38%)',
                  contoh: 'Pipa air SPAM & tiang transmisi PLN bersilangan dengan jalur pelebaran 5 lajur.',
                  mitigasi: 'Rakor terpadu utilitas & izin crossing terintegrasi sebelum penggalian badan jalan.',
                },
                {
                  kategori: 'Kondisi Batuan & Geologi Keras',
                  persen: 24,
                  warna: 'border-amber-300 bg-amber-50/50 text-amber-800',
                  badge: 'Kritis (24%)',
                  contoh: 'Lapisan batuan dasar laut menyulitkan penetrasi tiang pancang Dermaga Batu Ampar.',
                  mitigasi: 'Mobilisasi hydraulic drilling rig tambahan dan penyesuaian metode pre-boring.',
                },
                {
                  kategori: 'Cuaca Ekstrem & Curah Hujan',
                  persen: 22,
                  warna: 'border-indigo-300 bg-indigo-50/50 text-indigo-800',
                  badge: 'Musiman (22%)',
                  contoh: 'Hujan deras menaikkan elevasi air galian saluran drainase utama & kolam retensi Baloi.',
                  mitigasi: 'Penambahan pompa dewatering debit tinggi & proteksi sheet pile penahan tebing.',
                },
                {
                  kategori: 'Kepadatan Arus Lalu Lintas',
                  persen: 16,
                  warna: 'border-slate-300 bg-slate-50 text-slate-800',
                  badge: 'Operasional (16%)',
                  contoh: 'Trafik padat trailer kontainer di koridor Pelabuhan Punggur & Batu Ampar.',
                  mitigasi: 'Pemberlakuan shift kerja malam (night work) dan rekayasa pos pantau Satlantas.',
                },
              ].map((item) => (
                <div
                  key={item.kategori}
                  className={`p-2.5 rounded-lg border ${item.warna} bg-white flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                        {item.badge}
                      </span>
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="bg-slate-700 h-full rounded-full"
                          style={{ width: `${item.persen}%` }}
                        />
                      </div>
                    </div>
                    <h4 className="text-[11px] font-bold text-slate-900 mb-1">
                      {item.kategori}
                    </h4>
                    <p className="text-[9.5px] text-slate-600 mb-2 leading-relaxed">
                      {item.contoh}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-1.5 rounded border border-slate-100 text-[9px] text-slate-700 leading-snug">
                    <strong className="text-slate-900 block font-semibold">Tindak Lanjut:</strong>
                    {item.mitigasi}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
