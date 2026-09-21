import React, { useState, useMemo } from 'react';
import {
  PieChart as PieChartIcon,
  BarChart3,
  Table as TableIcon,
  Search,
  CheckCircle2,
  Clock,
  Building,
  ArrowUpRight,
  TrendingUp,
  FileText,
  DollarSign,
  HelpCircle,
  Sparkles,
  Lightbulb,
  Maximize2,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  KOMPOSISI_PERIZINAN_DATA,
  TREN_VOLUME_BULANAN,
  REKAP_PENERBITAN_DETAIL_DATA,
  LLB_PNBP_SUMMARY,
  PenerbitanPerizinanLlbItem,
} from '../../data/laluLintasBarangData';
import { LlbDatasetSourceBadge } from './LlbDatasetSourceBadge';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface LlbPerizinanConsolidatedCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const LlbPerizinanConsolidatedCard: React.FC<LlbPerizinanConsolidatedCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [displayMode, setDisplayMode] = useState<'dual-axis' | 'donut' | 'table'>('dual-axis');
  const [dualAxisMetric, setDualAxisMetric] = useState<'pnbp' | 'devisa'>('pnbp');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  const totalPenerbitan = useMemo(
    () => KOMPOSISI_PERIZINAN_DATA.reduce((acc, curr) => acc + curr.volume, 0),
    []
  );

  // Filtered detail table data
  const filteredTableData = useMemo(() => {
    return REKAP_PENERBITAN_DETAIL_DATA.filter((item) => {
      const matchSearch =
        searchQuery === '' ||
        item.namaPerusahaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.namaLayanan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.noIzin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nib.includes(searchQuery);

      const matchCategory =
        !selectedCategory ||
        item.kategoriLayanan === selectedCategory ||
        (selectedCategory.includes('Pemasukan') && item.kategoriLayanan === 'Pemasukan') ||
        (selectedCategory.includes('Pengeluaran') && item.kategoriLayanan === 'Pengeluaran') ||
        (selectedCategory.includes('Kawasan') && item.kategoriLayanan === 'Izin Usaha Kawasan') ||
        (selectedCategory.includes('Perdagangan') && item.kategoriLayanan === 'Perdagangan');

      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Dual-Axis SVG Calculations (Compact, Clean & Responsive)
  const chartHeight = 230;
  const chartWidth = 660;
  const paddingLeft = 55;
  const paddingRight = 55;
  const paddingTop = 28;
  const paddingBottom = 34;
  const plotWidth = chartWidth - paddingLeft - paddingRight; // 550px
  const plotHeight = chartHeight - paddingTop - paddingBottom; // 168px

  // Maximum scales
  const maxVolume = 600; // Left scale (0 - 600 SK)
  const maxSecondary = dualAxisMetric === 'pnbp' ? 14 : 600; // Right scale (PNBP: 0 - 14 Miliar, Devisa: 0 - 600 Miliar)

  const colWidth = plotWidth / TREN_VOLUME_BULANAN.length;
  const barWidth = 26;

  const dualPoints = useMemo(() => {
    return TREN_VOLUME_BULANAN.map((item, idx) => {
      const x = paddingLeft + idx * colWidth + colWidth / 2;
      const barHeight = (item.total / maxVolume) * plotHeight;
      const barY = paddingTop + (plotHeight - barHeight);

      const secondaryVal = dualAxisMetric === 'pnbp' ? item.nilaiPnbpMiliar : item.nilaiDevisaMiliar;
      const lineY = paddingTop + (1 - secondaryVal / maxSecondary) * plotHeight;

      return {
        ...item,
        x,
        barY,
        barHeight,
        lineY,
        secondaryVal,
      };
    });
  }, [dualAxisMetric, plotHeight, colWidth, maxSecondary]);

  const linePathD = useMemo(() => {
    return dualPoints.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x} ${pt.lineY}` : `${acc} L ${pt.x} ${pt.lineY}`;
    }, '');
  }, [dualPoints]);

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 mb-4 shadow-2xs">
      {/* 1. Header Bar with View Switcher & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F4E79]" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>Komposisi &amp; Tren Penerbitan Layanan Perizinan LLB</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                Dual Axis Enabled
              </span>
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Konsolidasi Izin Usaha Kawasan, Izin Pemasukan &amp; Pengeluaran Industri, serta Alokasi Perdagangan KPBPBB
          </p>
        </div>

        {/* View Switcher: Dual Axis vs Donut vs Tabel */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
            <button
              onClick={() => setDisplayMode('dual-axis')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                displayMode === 'dual-axis'
                  ? 'bg-[#1F4E79] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grafik Sumbu Ganda (Dual Axis) Volume vs Nilai"
            >
              <BarChart3 className="w-3 h-3" />
              <span>Dual Axis</span>
            </button>
            <button
              onClick={() => setDisplayMode('donut')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                displayMode === 'donut'
                  ? 'bg-[#1F4E79] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grafik Donut Komposisi Perizinan"
            >
              <PieChartIcon className="w-3 h-3" />
              <span>Komposisi</span>
            </button>
            <button
              onClick={() => setDisplayMode('table')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                displayMode === 'table'
                  ? 'bg-[#1F4E79] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tabel Detail Sampel Dokumen SK"
            >
              <TableIcon className="w-3 h-3" />
              <span>Tabel</span>
            </button>
          </div>

          <button
            onClick={() => setShowFormulaDetails(!showFormulaDetails)}
            className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
              showFormulaDetails
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Tampilkan Rumus & Calculated Field Tableau"
          >
            <HelpCircle className="w-3 h-3 text-amber-600" />
            <span>Formula</span>
            {showFormulaDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* 2. Tableau Shelves Badge (Compact) */}
      <div className="my-1.5">
        <TableauShelvesBadge
          showMe="Show Me #3 (Bars Sumbu Kiri) + Dual Axis Show Me #10 (Line Sumbu Kanan)"
          columns="[Bulan (Tahun 2026)], SUM([Volume Penerbitan SK]), SUM([Nilai PNBP Miliar])"
          rows="[Kategori Layanan Perizinan], [Status Dokumen]"
          filters="[Tahun]=2026, [Status]='Disetujui', [Kode Satker]='DLLB'"
          detail="Visualisasi Dual Axis Pengawasan Volume Pelayanan & Dampak PNBP/Devisa Satu Data BP Batam (Hal 8-9)"
        />
      </div>

      {/* 3. Collapsible Formula & Mathematical Logic Box */}
      {showFormulaDetails && (
        <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-lg my-2 text-xs text-slate-800 animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-amber-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              Rumus &amp; Calculated Field Tableau (Volume &amp; PNBP Dual Axis)
            </span>
            {onOpenFormulaModal && (
              <button
                onClick={() => onOpenFormulaModal('llb-pnbp')}
                className="text-[#1F4E79] hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <span>Buka Modal Kamus Lengkap</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[10.5px]">
            <div className="bg-white p-2 rounded border border-amber-200">
              <span className="text-slate-500 block mb-0.5">// 1. Volume Perizinan Total (Sumbu Kiri)</span>
              <code className="text-[#1F4E79] font-bold">
                SUM([Izin Pemasukan]) + SUM([Izin Pengeluaran]) + SUM([IUK]) + SUM([Dagang])
              </code>
            </div>
            <div className="bg-white p-2 rounded border border-amber-200">
              <span className="text-slate-500 block mb-0.5">// 2. Penerimaan PNBP Jasa Layanan (Sumbu Kanan)</span>
              <code className="text-emerald-700 font-bold">
                SUM([Tarif Pelayanan SK] * [Volume Dokumen]) / 1.000.000.000
              </code>
            </div>
          </div>
        </div>
      )}

      {/* 4. CONTENT VIEW MODES */}
      {displayMode === 'dual-axis' && (
        <div className="space-y-3 mt-2">
          {/* Sub-toolbar Dual Axis: Metric Switcher & Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-600">Sumbu Kanan:</span>
              <div className="inline-flex bg-white rounded-md border border-slate-200 p-0.5 text-[10.5px]">
                <button
                  onClick={() => setDualAxisMetric('pnbp')}
                  className={`px-2 py-0.5 rounded font-bold cursor-pointer transition-all ${
                    dualAxisMetric === 'pnbp'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Nilai PNBP (Rp Miliar)
                </button>
                <button
                  onClick={() => setDualAxisMetric('devisa')}
                  className={`px-2 py-0.5 rounded font-bold cursor-pointer transition-all ${
                    dualAxisMetric === 'devisa'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Devisa Transaksi (Rp Miliar)
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[10.5px]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#1F4E79]" />
                <span className="text-slate-700 font-semibold">Volume SK (Batang)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-3 h-1.5 rounded-full ${
                    dualAxisMetric === 'pnbp' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}
                />
                <span className="text-slate-700 font-semibold">
                  {dualAxisMetric === 'pnbp' ? 'PNBP Terhimpun (Garis)' : 'Devisa Transaksi (Garis)'}
                </span>
              </div>
            </div>
          </div>

          {/* DUAL-AXIS SVG CHART (Persis Gaya Investasi, Ramping & Proporsional) */}
          <div className="bg-slate-50/60 rounded-xl border border-slate-200/80 p-2 relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto max-h-[230px] overflow-visible select-none"
            >
              {/* Horizontal Gridlines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingTop + plotHeight * (1 - ratio);
                const leftLabel = Math.round(maxVolume * ratio);
                const rightLabel =
                  dualAxisMetric === 'pnbp'
                    ? (maxSecondary * ratio).toFixed(1)
                    : Math.round(maxSecondary * ratio);

                return (
                  <g key={i}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={chartWidth - paddingRight}
                      y2={y}
                      stroke="#E2E8F0"
                      strokeDasharray={ratio === 0 ? undefined : '3 3'}
                      strokeWidth={ratio === 0 ? 1.5 : 1}
                    />
                    {/* Left Axis Label (Volume SK) */}
                    <text
                      x={paddingLeft - 8}
                      y={y + 3.5}
                      textAnchor="end"
                      className="text-[9.5px] fill-slate-500 font-mono font-medium"
                    >
                      {leftLabel}
                    </text>
                    {/* Right Axis Label (PNBP / Devisa) */}
                    <text
                      x={chartWidth - paddingRight + 8}
                      y={y + 3.5}
                      textAnchor="start"
                      className={`text-[9.5px] font-mono font-medium ${
                        dualAxisMetric === 'pnbp' ? 'fill-emerald-600' : 'fill-blue-600'
                      }`}
                    >
                      {dualAxisMetric === 'pnbp' ? `${rightLabel}M` : rightLabel}
                    </text>
                  </g>
                );
              })}

              {/* Sumbu X Categories & Bar Batang */}
              {dualPoints.map((pt, idx) => {
                const isHovered = hoveredIndex === idx;
                const barX = pt.x - barWidth / 2;

                return (
                  <g
                    key={pt.bulan}
                    className="cursor-pointer transition-opacity"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Bar Background Glow on Hover */}
                    {isHovered && (
                      <rect
                        x={barX - 4}
                        y={paddingTop}
                        width={barWidth + 8}
                        height={plotHeight}
                        fill="#F1F5F9"
                        rx={4}
                      />
                    )}

                    {/* Bar Batang Volume */}
                    <rect
                      x={barX}
                      y={pt.barY}
                      width={barWidth}
                      height={pt.barHeight}
                      rx={3}
                      fill={isHovered ? '#123354' : '#1F4E79'}
                      className="transition-colors"
                    />

                    {/* Nilai di atas Bar Batang */}
                    <text
                      x={pt.x}
                      y={pt.barY - 4}
                      textAnchor="middle"
                      className="text-[9.5px] font-mono font-bold fill-slate-800"
                    >
                      {pt.total}
                    </text>

                    {/* Label Bulan (Sumbu X) */}
                    <text
                      x={pt.x}
                      y={chartHeight - 12}
                      textAnchor="middle"
                      className="text-[10px] font-mono font-semibold fill-slate-600"
                    >
                      {pt.bulanSingkat}
                    </text>
                  </g>
                );
              })}

              {/* Line Garis Sumbu Kanan (Nilai PNBP / Devisa) */}
              <path
                d={linePathD}
                fill="none"
                stroke={dualAxisMetric === 'pnbp' ? '#10B981' : '#3B82F6'}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dots pada Line */}
              {dualPoints.map((pt, idx) => {
                const isHovered = hoveredIndex === idx;
                const strokeColor = dualAxisMetric === 'pnbp' ? '#10B981' : '#3B82F6';

                return (
                  <g
                    key={`dot-${idx}`}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.lineY}
                      r={isHovered ? 6 : 4}
                      fill="#FFFFFF"
                      stroke={strokeColor}
                      strokeWidth={2.5}
                      className="transition-all"
                    />
                    {isHovered && (
                      <circle
                        cx={pt.x}
                        cy={pt.lineY}
                        r={9}
                        fill={strokeColor}
                        fillOpacity={0.2}
                      />
                    )}
                  </g>
                );
              })}

              {/* Axis Titles */}
              <text
                x={paddingLeft - 8}
                y={paddingTop - 12}
                textAnchor="end"
                className="text-[9px] font-bold fill-slate-600 uppercase tracking-wider font-mono"
              >
                Vol (SK)
              </text>
              <text
                x={chartWidth - paddingRight + 8}
                y={paddingTop - 12}
                textAnchor="start"
                className={`text-[9px] font-bold uppercase tracking-wider font-mono ${
                  dualAxisMetric === 'pnbp' ? 'fill-emerald-700' : 'fill-blue-700'
                }`}
              >
                {dualAxisMetric === 'pnbp' ? 'PNBP (Rp M)' : 'Devisa (Rp M)'}
              </text>
            </svg>

            {/* Hover Tooltip Card (Positioned neatly) */}
            {hoveredIndex !== null && (
              <div
                className="absolute top-2 right-4 bg-slate-900/95 text-white p-2.5 rounded-lg shadow-xl border border-slate-700 text-xs z-20 pointer-events-none w-56 animate-fadeIn"
              >
                <div className="flex items-center justify-between border-b border-slate-700 pb-1 mb-1.5 font-bold">
                  <span className="text-sky-300 font-mono">
                    {dualPoints[hoveredIndex].bulan}
                  </span>
                  <span className="text-[10px] text-slate-400">Tahunan 2026</span>
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Izin:</span>
                    <span className="font-mono font-bold text-white">
                      {dualPoints[hoveredIndex].total} SK
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pl-2">
                    <span>- Pemasukan Bahan Baku:</span>
                    <span className="font-mono text-slate-200">
                      {dualPoints[hoveredIndex].izinPemasukan}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pl-2">
                    <span>- Pengeluaran Produk:</span>
                    <span className="font-mono text-slate-200">
                      {dualPoints[hoveredIndex].izinPengeluaran}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pl-2">
                    <span>- Izin Usaha Kawasan:</span>
                    <span className="font-mono text-slate-200">
                      {dualPoints[hoveredIndex].izinUsahaKawasan}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pl-2">
                    <span>- Perdagangan &amp; Kuota:</span>
                    <span className="font-mono text-slate-200">
                      {dualPoints[hoveredIndex].izinPerdagangan}
                    </span>
                  </div>

                  <div className="pt-1.5 mt-1 border-t border-slate-700/80 flex justify-between font-bold">
                    <span className="text-emerald-400">Realisasi PNBP:</span>
                    <span className="font-mono text-emerald-300">
                      Rp {dualPoints[hoveredIndex].nilaiPnbpMiliar.toFixed(2)} M
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-[10.5px]">
                    <span className="text-blue-300">Nilai Devisa:</span>
                    <span className="font-mono text-blue-200">
                      Rp {dualPoints[hoveredIndex].nilaiDevisaMiliar.toFixed(1)} M
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DONUT MODE: KOMPOSISI KATEGORI PERIZINAN */}
      {displayMode === 'donut' && (
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            {/* SVG Donut Chart */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-3 bg-slate-50/60 rounded-xl border border-slate-200/80">
              <div className="relative w-44 h-44">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#1F4E79"
                    strokeWidth="12"
                    strokeDasharray={`${(45.9 / 100) * 238.7} 238.7`}
                    strokeDashoffset="0"
                    className="cursor-pointer transition-all hover:opacity-90"
                    onClick={() =>
                      setSelectedCategory(selectedCategory === 'Pemasukan' ? null : 'Pemasukan')
                    }
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#2E75B6"
                    strokeWidth="12"
                    strokeDasharray={`${(28.2 / 100) * 238.7} 238.7`}
                    strokeDashoffset={`-${(45.9 / 100) * 238.7}`}
                    className="cursor-pointer transition-all hover:opacity-90"
                    onClick={() =>
                      setSelectedCategory(selectedCategory === 'Pengeluaran' ? null : 'Pengeluaran')
                    }
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#0D9488"
                    strokeWidth="12"
                    strokeDasharray={`${(14.4 / 100) * 238.7} 238.7`}
                    strokeDashoffset={`-${((45.9 + 28.2) / 100) * 238.7}`}
                    className="cursor-pointer transition-all hover:opacity-90"
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === 'Izin Usaha Kawasan' ? null : 'Izin Usaha Kawasan'
                      )
                    }
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="12"
                    strokeDasharray={`${(11.5 / 100) * 238.7} 238.7`}
                    strokeDashoffset={`-${((45.9 + 28.2 + 14.4) / 100) * 238.7}`}
                    className="cursor-pointer transition-all hover:opacity-90"
                    onClick={() =>
                      setSelectedCategory(selectedCategory === 'Perdagangan' ? null : 'Perdagangan')
                    }
                  />
                </svg>

                {/* Center Callout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    Total
                  </span>
                  <span className="text-xl font-black font-mono text-[#1F4E79]">
                    {totalPenerbitan.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[9.5px] text-slate-500 font-mono">Surat / SK</span>
                </div>
              </div>

              <span className="text-[10px] text-slate-500 font-mono mt-2 text-center">
                Klik busur donat untuk memfilter kategori
              </span>
            </div>

            {/* Category Breakdown Progress Cards */}
            <div className="lg:col-span-7 space-y-2">
              {KOMPOSISI_PERIZINAN_DATA.map((item) => {
                const isSelected = selectedCategory === item.kategori;
                return (
                  <div
                    key={item.kategori}
                    onClick={() => setSelectedCategory(isSelected ? null : item.kategori)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1F4E79] bg-blue-50/50 shadow-2xs ring-1 ring-[#1F4E79]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-xs shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs font-bold text-slate-900">{item.kategori}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-black text-slate-900">
                          {item.volume} SK
                        </span>
                        <span className="text-[10.5px] font-mono text-slate-500 ml-1">
                          ({item.persentase}%)
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.persentase}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{item.subLabel}</span>
                      <span className="font-mono text-[9px] text-blue-700 font-semibold">
                        {item.datasetItemRef}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TABEL DETAIL MODE */}
      {displayMode === 'table' && (
        <div className="mt-2 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari perusahaan, NIB, no izin..."
                className="w-full pl-8 pr-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-[#1F4E79]"
              />
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Menampilkan {filteredTableData.length} dari {REKAP_PENERBITAN_DETAIL_DATA.length} sampel
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
            <div className="overflow-x-auto max-h-[260px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#0B1728] text-white text-[10.5px] font-semibold sticky top-0 z-10">
                  <tr>
                    <th className="py-2 px-2.5">No. Izin &amp; Tanggal</th>
                    <th className="py-2 px-2.5">Nama Perusahaan</th>
                    <th className="py-2 px-2.5">NIB / NPWP</th>
                    <th className="py-2 px-2.5">Nama Layanan</th>
                    <th className="py-2 px-2.5">Bagian</th>
                    <th className="py-2 px-2.5 text-center">Durasi</th>
                    <th className="py-2 px-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                  {filteredTableData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2 px-2.5">
                        <span className="font-mono font-bold text-blue-900 block">{row.noIzin}</span>
                        <span className="text-[10px] text-slate-500 block">{row.tglDaftar}</span>
                      </td>
                      <td className="py-2 px-2.5 max-w-[180px]">
                        <span className="font-bold text-slate-900 block truncate" title={row.namaPerusahaan}>
                          {row.namaPerusahaan}
                        </span>
                      </td>
                      <td className="py-2 px-2.5 font-mono text-[10px]">
                        <span className="text-slate-900 block">NIB: {row.nib}</span>
                      </td>
                      <td className="py-2 px-2.5 max-w-[170px]">
                        <span className="font-semibold text-slate-800 block truncate" title={row.namaLayanan}>
                          {row.namaLayanan}
                        </span>
                      </td>
                      <td className="py-2 px-2.5 whitespace-nowrap">
                        <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {row.bagian}
                        </span>
                      </td>
                      <td className="py-2 px-2.5 text-center font-mono font-bold text-slate-800 whitespace-nowrap">
                        {row.durasiJam} Jam
                      </td>
                      <td className="py-2 px-2.5 text-center whitespace-nowrap">
                        <span className="px-1.5 py-0.5 rounded-full text-[9.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. STRATEGIC EXECUTIVE INSIGHT & REKOMENDASI BOX (Sesuai Permintaan Poin 4) */}
      <div className="mt-3 p-3 bg-blue-50/60 border-l-4 border-[#1F4E79] rounded-r-lg text-xs text-slate-800 flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 text-[#1F4E79] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1F4E79] uppercase tracking-wider text-[11px]">
              Wawasan &amp; Rekomendasi Eksekutif (Dual Axis Analysis)
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 font-mono">
              Kinerja Positif
            </span>
          </div>
          <p className="text-slate-700 text-[11.5px] leading-relaxed">
            Korelasi volume izin masuk bahan baku industri elektronika dan maritim menunjukkan tren peningkatan rata-rata <strong>+6,8% per bulan</strong>, yang berbanding lurus dengan peningkatan pendapatan PNBP jasa verifikasi dokumen dari <strong>Rp 7,85 Miliar</strong> pada Januari menjadi <strong>Rp 11,10 Miliar</strong> pada Juni 2026.
          </p>
          <div className="flex items-center gap-4 text-[10.5px] font-mono text-slate-600 pt-0.5">
            <span>&bull; Kontributor Utama: <strong>Pemasukan Industri (45,9%)</strong></span>
            <span>&bull; Rata-rata Durasi: <strong>3,5 Jam / Izin</strong></span>
            <span>&bull; Status PNBP: <strong>85,0% Capaian YTD</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
