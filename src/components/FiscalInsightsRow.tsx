import React, { useState } from 'react';
import {
  Download,
  BarChart3,
  Table as TableIcon,
  HelpCircle,
  Maximize2,
  Info
} from 'lucide-react';
import { FUNDING_SOURCES } from '../data/mockData';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface FiscalInsightsRowProps {
  onOpenExportModal: () => void;
  onOpenTableauGuide?: () => void;
  lastUpdated: string;
}

// Authentic Tableau Diverging Bar Chart Data (Surplus / Deficit per Unit Kerja)
const SURPLUS_DEFISIT_DATA = [
  {
    unit: 'Dit. Pengelolaan Lahan & Kawasan',
    singkatan: 'Dit. Lahan',
    pendapatan: 428.0,
    belanja: 61.0,
    net: 367.0, // Surplus (+367 M)
    keterangan: 'Sewa lahan industri Batam Center, Kabil & Batu Ampar',
  },
  {
    unit: 'Kantor Bandara Hang Nadim',
    singkatan: 'Bandara HN',
    pendapatan: 315.0,
    belanja: 142.0,
    net: 173.0, // Surplus (+173 M)
    keterangan: 'Penerimaan jasa kebandarudaraan & konsesi kargo',
  },
  {
    unit: 'Dit. Pelabuhan & Terminal',
    singkatan: 'Dit. Pelabuhan',
    pendapatan: 226.2,
    belanja: 159.0,
    net: 67.2, // Surplus (+67.2 M)
    keterangan: 'Jasa labuh, tambat & terminal kargo curah/peti kemas',
  },
  {
    unit: 'Dit. Fasilitas Usaha & Promosi',
    singkatan: 'Dit. Fasilitas',
    pendapatan: 28.0,
    belanja: 68.0,
    net: -40.0, // Defisit (-40 M)
    keterangan: 'Subsidi promosi investasi asing & pemeliharaan aset umum',
  },
  {
    unit: 'Dit. Pembangunan Infrastruktur',
    singkatan: 'Dit. Infrastruktur',
    pendapatan: 12.0,
    belanja: 183.0,
    net: -171.0, // Defisit (-171 M)
    keterangan: 'Belanja modal jalan arteri, drainase & fasilitas umum',
  },
];

export const FiscalInsightsRow: React.FC<FiscalInsightsRowProps> = ({
  onOpenExportModal,
  onOpenTableauGuide,
  lastUpdated,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  // Diverging Bar Calculations
  // Range from -200 to +400 M
  const minVal = -200;
  const maxVal = 400;
  const totalRange = maxVal - minVal; // 600
  const zeroPosPercent = ((0 - minVal) / totalRange) * 100; // ~33.33%

  return (
    <div id="fiskal-section" className="space-y-4 font-sans select-none">
      {/* 1. TOP ROW: KESEIMBANGAN SURPLUS & DEFISIT (TABLEAU DIVERGING BAR CHART) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4">
        {/* Modern Executive Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#4E79A7]" />
              <span>ANALISIS SURPLUS &amp; DEFISIT OPERASIONAL</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#002B49] tracking-tight">
              Keseimbangan Surplus &amp; Defisit per Unit Kerja
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Surplus sewa lahan &amp; kepelabuhanan mensubsidi silang belanja infrastruktur publik
            </p>
          </div>

          {/* Action Controls: Color Legend & View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Legend Shelf */}
            <div className="hidden sm:flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl text-xs text-slate-700 shadow-2xs">
              <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Marks:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#59A14F] inline-block rounded-full" />
                <span className="font-medium text-xs">Surplus (+Rp M)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#E15759] inline-block rounded-full" />
                <span className="font-medium text-xs">Defisit (-Rp M)</span>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center border border-slate-200 bg-slate-100/80 p-1 rounded-xl shadow-2xs">
              <button
                onClick={() => setViewMode('chart')}
                className={`px-3 py-1 text-xs font-semibold flex items-center gap-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'chart'
                    ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tampilkan Diagram Batang"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Visual Bar</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-xs font-semibold flex items-center gap-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tampilkan Tabel Crosstab"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Crosstab</span>
              </button>
            </div>

            {/* Net Total KPI Badge */}
            <div className="bg-[#EBF3E8] border border-[#59A14F]/40 px-3 py-1.5 rounded-xl text-xs font-mono text-[#2B542C] font-bold shadow-2xs">
              Netto: +Rp 196,0 M
            </div>
          </div>
        </div>

        {/* Tableau Shelves Mapping Badge */}
        <TableauShelvesBadge
          showMe="Show Me #6 (Diverging Bar) / #1 (Crosstab)"
          rows="[unit] (Unit Kerja Pengampu)"
          columns="[Net Variance] = SUM([pendapatan]) - SUM([belanja])"
          color="IF [Net Variance] >= 0 THEN 'Surplus' ELSE 'Defisit' END"
          referenceLine="Zero Constant Line (Rp 0 M)"
          detail="[keterangan], [pendapatan], [belanja]"
        />

        {/* Worksheet Content Body */}
        <div>
          {viewMode === 'chart' ? (
            <div className="space-y-4">
              {/* Diverging Bar Chart Canvas */}
              <div className="relative border border-slate-200/80 bg-slate-50/50 rounded-xl p-4">
                {/* Axis Scale Top */}
                <div className="relative h-6 border-b border-slate-300 mb-3 text-[10px] font-mono text-slate-500">
                  <span className="absolute left-[33.33%] -translate-x-1/2 font-bold text-slate-700">Rp 0 M</span>
                  <span className="absolute left-0 text-slate-400">-Rp 200 M</span>
                  <span className="absolute left-[16.66%] -translate-x-1/2 text-slate-400">-Rp 100 M</span>
                  <span className="absolute left-[50%] -translate-x-1/2 text-slate-400">+Rp 100 M</span>
                  <span className="absolute left-[66.66%] -translate-x-1/2 text-slate-400">+Rp 200 M</span>
                  <span className="absolute left-[83.33%] -translate-x-1/2 text-slate-400">+Rp 300 M</span>
                  <span className="absolute right-0 text-slate-400">+Rp 400 M</span>
                </div>

                {/* Center Zero Gridline */}
                <div
                  className="absolute top-10 bottom-10 w-px bg-slate-400 z-10"
                  style={{ left: `calc(${zeroPosPercent}% + 16px)` }}
                />

                {/* Rows of Diverging Bars */}
                <div className="space-y-3 relative z-20">
                  {SURPLUS_DEFISIT_DATA.map((item) => {
                    const isPositive = item.net >= 0;
                    const barWidthPct = (Math.abs(item.net) / totalRange) * 100;
                    const isHovered = hoveredUnit === item.unit;

                    return (
                      <div
                        key={item.unit}
                        onMouseEnter={() => setHoveredUnit(item.unit)}
                        onMouseLeave={() => setHoveredUnit(null)}
                        className={`p-2 transition-colors border ${
                          isHovered ? 'bg-slate-50 border-slate-300 shadow-2xs' : 'border-transparent'
                        }`}
                      >
                        {/* Unit Label and details */}
                        <div className="flex items-center justify-between text-xs mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">{item.unit}</span>
                            <span className="text-[11px] text-slate-400 font-normal">
                              ({item.keterangan})
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] font-mono">
                            <span className="text-slate-500">
                              Pendapatan: <strong className="text-slate-800">Rp {item.pendapatan.toFixed(1)} M</strong>
                            </span>
                            <span className="text-slate-300">|</span>
                            <span className="text-slate-500">
                              Belanja: <strong className="text-slate-800">Rp {item.belanja.toFixed(1)} M</strong>
                            </span>
                            <span className="text-slate-300">|</span>
                            <span
                              className={`font-bold px-1.5 py-0.5 ${
                                isPositive
                                  ? 'bg-[#EBF3E8] text-[#2B542C]'
                                  : 'bg-[#FDEDEC] text-[#922B21]'
                              }`}
                            >
                              {isPositive ? `+Rp ${item.net.toFixed(1)} M` : `-Rp ${Math.abs(item.net).toFixed(1)} M`}
                            </span>
                          </div>
                        </div>

                        {/* Bar Track */}
                        <div className="relative h-6 bg-slate-100 border border-slate-200">
                          {/* Zero Line Marker inside bar */}
                          <div
                            className="absolute top-0 bottom-0 w-px bg-slate-400 z-10"
                            style={{ left: `${zeroPosPercent}%` }}
                          />

                          {/* Colored Tableau Bar */}
                          {isPositive ? (
                            <div
                              className="absolute top-0 bottom-0 bg-[#59A14F] hover:bg-[#4E8F45] transition-all flex items-center pl-2 text-[10px] font-mono font-bold text-white shadow-2xs"
                              style={{
                                left: `${zeroPosPercent}%`,
                                width: `${barWidthPct}%`,
                              }}
                            >
                              +{item.net.toFixed(1)} M
                            </div>
                          ) : (
                            <div
                              className="absolute top-0 bottom-0 bg-[#E15759] hover:bg-[#C94749] transition-all flex items-center justify-end pr-2 text-[10px] font-mono font-bold text-white shadow-2xs"
                              style={{
                                right: `${100 - zeroPosPercent}%`,
                                width: `${barWidthPct}%`,
                              }}
                            >
                              -{Math.abs(item.net).toFixed(1)} M
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Reference Note */}
                <div className="mt-4 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
                  <span>
                    Tableau Calculation: <code>[Net Surplus / Defisit] = SUM([Realisasi Pendapatan]) - SUM([Realisasi Belanja])</code>
                  </span>
                  <span className="font-semibold text-slate-700">
                    Kaidah Penganggaran BLU: Surplus sewa lahan & kepelabuhanan mensubsidi silang belanja infrastruktur publik.
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Crosstab View */
            <div className="overflow-x-auto rounded-xl border border-slate-200/80">
              <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                <thead className="bg-slate-50/80 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3.5">Unit Kerja Pengampu</th>
                    <th className="py-3 px-3.5 text-right">Realisasi Pendapatan</th>
                    <th className="py-3 px-3.5 text-right">Realisasi Belanja</th>
                    <th className="py-3 px-3.5 text-right">Net Variance (Surplus/Defisit)</th>
                    <th className="py-3 px-3.5 text-center">Klasifikasi Fiskal</th>
                    <th className="py-3 px-3.5">Catatan Tata Kelola</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {SURPLUS_DEFISIT_DATA.map((item) => (
                    <tr key={item.unit} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3.5 font-sans font-semibold text-slate-900">
                        {item.unit}
                      </td>
                      <td className="py-2.5 px-3.5 text-right text-slate-700">
                        Rp {item.pendapatan.toFixed(1)} M
                      </td>
                      <td className="py-2.5 px-3.5 text-right text-slate-700">
                        Rp {item.belanja.toFixed(1)} M
                      </td>
                      <td
                        className={`py-2.5 px-3.5 text-right font-bold ${
                          item.net >= 0 ? 'text-[#2B542C]' : 'text-[#922B21]'
                        }`}
                      >
                        {item.net >= 0 ? `+Rp ${item.net.toFixed(1)} M` : `-Rp ${Math.abs(item.net).toFixed(1)} M`}
                      </td>
                      <td className="py-2.5 px-3.5 text-center font-sans">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                            item.net >= 0
                              ? 'bg-[#EBF3E8] text-[#2B542C] border border-[#59A14F]/40'
                              : 'bg-[#FDEDEC] text-[#922B21] border border-[#E15759]/40'
                          }`}
                        >
                          {item.net >= 0 ? 'Surplus (Donor)' : 'Defisit (Penerima Subsidi)'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 font-sans text-slate-600 text-xs">
                        {item.keterangan}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50/90 font-bold border-t-2 border-slate-200 font-mono text-xs">
                  <tr>
                    <td className="py-3 px-3.5 font-sans text-slate-900">
                      TOTAL KONSOLIDASI (NETTO)
                    </td>
                    <td className="py-3 px-3.5 text-right text-slate-900">
                      Rp 999,2 M
                    </td>
                    <td className="py-3 px-3.5 text-right text-slate-900">
                      Rp 803,0 M
                    </td>
                    <td className="py-3 px-3.5 text-right text-[#2B542C]">
                      +Rp 196,2 M
                    </td>
                    <td className="py-3 px-3.5 text-center font-sans">
                      <span className="bg-[#EBF3E8] text-[#2B542C] px-2.5 py-0.5 text-[10px] uppercase font-bold rounded-full">
                        Surplus Bersih
                      </span>
                    </td>
                    <td className="py-3 px-3.5 font-sans text-slate-600 text-xs">
                      Kondisi likuiditas anggaran BP Batam terkonsolidasi sehat
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Worksheet Caption / Footnote */}
        <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Tableau Server BI • Data Source: SIMKEU BP Batam • Extracted: {lastUpdated}</span>
          <button
            onClick={onOpenExportModal}
            className="text-[#002B49] hover:underline font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Crosstab ke Excel / CSV</span>
          </button>
        </div>
      </div>

      {/* 2. LOWER ROW: RASIO KEMANDIRIAN FISKAL & SUMBER PENDANAAN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Worksheet: Rasio Kemandirian Fiskal (Bullet Graph / Metric) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#59A14F]" />
                  <span>ANALISIS KEMANDIRIAN FISKAL</span>
                </div>
                <h3 className="text-lg font-black text-[#002B49] tracking-tight">
                  Rasio Kemandirian Fiskal BLU
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Formula: Realisasi PNBP berbanding Belanja Operasional Rutin
                </p>
              </div>
              <span className="px-3 py-1 bg-[#EBF3E8] text-[#2B542C] border border-[#59A14F]/40 text-xs font-bold uppercase font-mono rounded-full self-start sm:self-auto shadow-2xs">
                Mandiri Fiskal
              </span>
            </div>

            {/* Tableau Shelves Mapping Badge */}
            <TableauShelvesBadge
              showMe="Show Me #23 (Bullet Graph)"
              columns="AGG([Rasio Kemandirian]) = SUM([PNBP]) / SUM([Belanja Operasional])"
              referenceLine="Distribution Band / Line: 0.80 (Standar Kemenkeu)"
              color="IF [Rasio] >= 0.80 THEN 'Mandiri' ELSE 'Defisit' END"
              detail="[Realisasi PNBP], [Belanja Operasional Rutin]"
            />

            <div className="space-y-4">
              {/* Primary Measure Big Display */}
              <div className="flex items-baseline justify-between p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-xl">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nilai Rasio Berjalan</span>
                  <div className="text-3xl font-black text-[#002B49] font-mono tracking-tight mt-0.5">
                    0,86
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Ambang Batas (BLU)</span>
                  <div className="text-sm font-bold text-[#2B542C] font-mono mt-0.5">
                    ≥ 0,80 (Tercapai)
                  </div>
                </div>
              </div>

              {/* Bullet Bar */}
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-mono">
                  <span>Realisasi PNBP menutup Operasional</span>
                  <span className="font-bold text-[#4E79A7]">86,0%</span>
                </div>
                <div className="relative h-6 bg-slate-100 rounded-full border border-slate-200/80 overflow-hidden">
                  {/* Actual Value Bar */}
                  <div
                    className="absolute top-0 bottom-0 bg-[#4E79A7] flex items-center justify-end pr-2.5 text-white font-mono text-[10px] font-bold rounded-full"
                    style={{ width: '86%' }}
                  >
                    0,86
                  </div>

                  {/* Benchmark Reference Line (0.80) */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-[#E15759] z-10"
                    style={{ left: '80%' }}
                    title="Standar Otonomi BLU: 0,80"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5">
                  <span>0.0</span>
                  <span className="text-[#E15759] font-bold">▲ Reference Line: 0.80 (Standar Kemenkeu)</span>
                  <span>1.0</span>
                </div>
              </div>

              {/* Context Summary Table */}
              <div className="border border-slate-200/80 rounded-xl overflow-hidden text-xs divide-y divide-slate-100">
                <div className="p-2.5 flex justify-between bg-slate-50/50">
                  <span className="text-slate-600">Penerimaan PNBP Berjalan:</span>
                  <span className="font-mono font-bold text-slate-900">Rp 681,0 M</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-600">Belanja Operasional Rutin:</span>
                  <span className="font-mono font-bold text-slate-900">Rp 791,8 M</span>
                </div>
                <div className="p-2.5 flex justify-between bg-slate-50/50">
                  <span className="text-slate-600">Kesimpulan Eksekutif:</span>
                  <span className="font-semibold text-slate-800 text-xs">
                    86% operasional mandiri, risiko fiskal rendah
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
            Kategori Otonomi: <strong className="text-slate-800">Sangat Kuat (Kemandirian Fiskal Teruji)</strong>
          </div>
        </div>

        {/* Worksheet: Struktur Komposisi Sumber Pendanaan */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#F28E2B]" />
                  <span>SUMBER PENDANAAN</span>
                </div>
                <h3 className="text-lg font-black text-[#002B49] tracking-tight">
                  Struktur Komposisi Sumber Pendanaan
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Proporsi kas masuk per kategori pendanaan BLU
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl shadow-2xs self-start sm:self-auto">
                <span>Total:</span>
                <strong className="text-slate-900">Rp 1.062,2 M</strong>
              </div>
            </div>

            {/* Tableau Shelves Mapping Badge */}
            <TableauShelvesBadge
              showMe="Show Me #13 (Stacked Bar) / #12 (Treemap)"
              rows="[sumber_dana]"
              columns="SUM([realisasi]), % of Total SUM([realisasi])"
              color="[sumber_dana] (Kategori Pendanaan)"
              text="SUM([realisasi]), % of Total"
            />

            <div className="space-y-3">
              {/* Stacked 100% Horizontal Bar */}
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  100% Stacked Bar Composition
                </div>
                <div className="h-7 w-full flex rounded-xl border border-slate-200/80 overflow-hidden font-mono text-[10px] text-white font-bold">
                  <div
                    style={{ width: '64.1%', backgroundColor: '#4E79A7' }}
                    className="h-full flex items-center justify-center truncate px-1 hover:brightness-110 transition-all"
                    title="PNBP: 64,1% (Rp 681,0 M)"
                  >
                    PNBP 64,1%
                  </div>
                  <div
                    style={{ width: '21.1%', backgroundColor: '#F28E2B' }}
                    className="h-full flex items-center justify-center truncate px-1 hover:brightness-110 transition-all"
                    title="APBN: 21,1% (Rp 224,0 M)"
                  >
                    APBN 21,1%
                  </div>
                  <div
                    style={{ width: '14.8%', backgroundColor: '#59A14F' }}
                    className="h-full flex items-center justify-center truncate px-1 hover:brightness-110 transition-all"
                    title="Lainnya & Hibah: 14,8% (Rp 157,2 M)"
                  >
                    14,8%
                  </div>
                </div>
              </div>

              {/* Legend & Breakdown Table */}
              <div className="border border-slate-200/80 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                <div className="bg-slate-50/80 px-3 py-2 font-semibold text-slate-700 grid grid-cols-12">
                  <div className="col-span-6">Sumber Dana</div>
                  <div className="col-span-3 text-right">Realisasi (Rp M)</div>
                  <div className="col-span-3 text-center">Status</div>
                </div>

                <div className="px-3 py-2.5 grid grid-cols-12 items-center hover:bg-slate-50/70">
                  <div className="col-span-6 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#4E79A7] inline-block rounded-full" />
                    <span className="font-semibold text-slate-900">PNBP Layanan BLU</span>
                  </div>
                  <div className="col-span-3 text-right font-mono font-bold text-slate-900">
                    Rp 681,0 M
                  </div>
                  <div className="col-span-3 text-center">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-800 text-[10px] font-bold rounded-full">
                      Utama
                    </span>
                  </div>
                </div>

                <div className="px-3 py-2.5 grid grid-cols-12 items-center hover:bg-slate-50/70">
                  <div className="col-span-6 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#F28E2B] inline-block rounded-full" />
                    <span className="font-semibold text-slate-900">APBN (Rupiah Murni)</span>
                  </div>
                  <div className="col-span-3 text-right font-mono font-bold text-slate-900">
                    Rp 224,0 M
                  </div>
                  <div className="col-span-3 text-center">
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold rounded-full">
                      Proyek
                    </span>
                  </div>
                </div>

                <div className="px-3 py-2.5 grid grid-cols-12 items-center hover:bg-slate-50/70">
                  <div className="col-span-6 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#59A14F] inline-block rounded-full" />
                    <span className="font-semibold text-slate-900">Hibah, BLU Lain &amp; Bunga</span>
                  </div>
                  <div className="col-span-3 text-right font-mono font-bold text-slate-900">
                    Rp 157,2 M
                  </div>
                  <div className="col-span-3 text-center">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full">
                      Optimal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
            Keterangan: PNBP menyumbang 64,1% dari total kas masuk eksekutif BP Batam.
          </div>
        </div>
      </div>
    </div>
  );
};
