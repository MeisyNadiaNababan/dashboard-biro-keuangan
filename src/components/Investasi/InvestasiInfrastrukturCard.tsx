import React, { useState, useMemo } from 'react';
import {
  Building2,
  TrendingUp,
  BarChart3,
  Table as TableIcon,
  ExternalLink,
  Download,
  DollarSign,
  Maximize2,
  MapPin,
  Search,
} from 'lucide-react';
import { INFRASTRUKTUR_DATA } from '../../data/investasiData';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface InvestasiInfrastrukturCardProps {
  onOpenFormulaModal: (formulaId: string) => void;
  filterYear?: number | 'ALL';
}

export const InvestasiInfrastrukturCard: React.FC<InvestasiInfrastrukturCardProps> = ({
  onOpenFormulaModal,
  filterYear = 'ALL',
}) => {
  const [viewMode, setViewMode] = useState<'dual-axis' | 'detail'>('dual-axis');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Daftar tahun unik
  const availableYears = [2024, 2025, 2026, 2027];

  // Agregasi tahunan (Nilai Investasi & Luas Area)
  const yearlyMetrics = useMemo(() => {
    return availableYears.map((year) => {
      const projects = INFRASTRUKTUR_DATA.filter((p) => p.tahun === year);
      const totalNilai = projects.reduce((sum, p) => sum + p.nilaiInvestasi, 0);
      const totalLuas = projects.reduce((sum, p) => sum + p.luasAreaHa, 0);
      return {
        year,
        count: projects.length,
        totalNilai,
        totalNilaiT: totalNilai / 1e12,
        totalLuas,
        projects,
      };
    });
  }, []);

  const grandTotalNilai = useMemo(() => {
    return INFRASTRUKTUR_DATA.reduce((sum, p) => sum + p.nilaiInvestasi, 0);
  }, []);

  const grandTotalLuas = useMemo(() => {
    return INFRASTRUKTUR_DATA.reduce((sum, p) => sum + p.luasAreaHa, 0);
  }, []);

  const maxYearlyNilaiT = useMemo(() => {
    return Math.max(...yearlyMetrics.map((y) => y.totalNilaiT), 1);
  }, [yearlyMetrics]);

  const maxYearlyLuas = useMemo(() => {
    return Math.max(...yearlyMetrics.map((y) => y.totalLuas), 1);
  }, [yearlyMetrics]);

  // Format Rupiah
  const formatRupiah = (val: number): string => {
    if (val >= 1e12) {
      return `Rp ${(val / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;
    }
    return `Rp ${(val / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
  };

  // Filtered Projects (menghormati filterYear dari filter atas dashboard)
  const filteredProjects = useMemo(() => {
    return INFRASTRUKTUR_DATA.filter((p) => {
      const matchYear = String(filterYear) === 'ALL' || p.tahun === Number(filterYear);
      const matchSector = selectedSector === 'ALL' || p.sektor === selectedSector;
      const matchSearch =
        p.namaProyek.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sektor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchYear && matchSearch && matchSector;
    });
  }, [filterYear, selectedSector, searchQuery]);

  // Export CSV
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'No,Tahun,Nama Proyek,Nilai Investasi (Rp),Luas Area (Ha),Lokasi,Sektor,Status,Sumber Pendanaan\n';
    filteredProjects.forEach((r, idx) => {
      csvContent += `${idx + 1},${r.tahun},"${r.namaProyek}",${r.nilaiInvestasi},${r.luasAreaHa},"${r.lokasi}","${r.sektor}","${r.status}","${r.sumberPendanaan}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `infrastruktur_yang_akan_dibangun_dataset6.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Kalkulasi koordinat SVG untuk Dual-Axis Chart (Optimal & Jelas, Bebas Tabrakan)
  const chartHeight = 280;
  const chartWidth = 700;
  const paddingLeft = 75;
  const paddingRight = 75;
  const paddingTop = 44;
  const paddingBottom = 48;
  const plotWidth = chartWidth - paddingLeft - paddingRight; // 550px
  const plotHeight = chartHeight - paddingTop - paddingBottom; // 188px

  // Skala Y maksimum
  const yAxisNilaiMax = Math.ceil(maxYearlyNilaiT / 5) * 5; // e.g. 15 T
  const yAxisLuasMax = Math.ceil(maxYearlyLuas / 100) * 100; // e.g. 500 Ha

  const colWidth = plotWidth / yearlyMetrics.length; // 137.5px per tahun
  // BAR proporsional (20px) - ramping, elegan, dan tidak memakan ruang
  const barWidth = 20;

  const points = yearlyMetrics.map((item, idx) => {
    const x = paddingLeft + idx * colWidth + colWidth / 2;
    // Y untuk Nilai Investasi (Bar)
    const barHeight = (item.totalNilaiT / yAxisNilaiMax) * plotHeight;
    const barY = paddingTop + (plotHeight - barHeight);
    // Y untuk Luas Lahan (Line point)
    const lineY = paddingTop + (1 - item.totalLuas / yAxisLuasMax) * plotHeight;
    return {
      ...item,
      x,
      barY,
      barHeight,
      lineY,
    };
  });

  const linePathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.lineY}` : `${acc} L ${pt.x} ${pt.lineY}`;
  }, '');

  return (
    <div
      id="investasi-infrastruktur-card"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
    >
      {/* 1. Header Visualisasi & Sheet Swap Switcher */}
      <div className="p-3 sm:p-3.5 border-b border-slate-200/80 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 border border-emerald-300/60 flex items-center justify-center text-emerald-800 shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                INFRASTRUKTUR YANG AKAN DIBANGUN
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono">
                Dataset No. 6 • Satu Data
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {viewMode === 'dual-axis'
                ? 'Visualisasi komparasi multi-tahun: Nilai Investasi (Rp Triliun) vs Luas Area (Hektar)'
                : 'Detail data proyek infrastruktur strategis yang akan dibangun (2024–2027)'}
            </p>
          </div>
        </div>

        {/* View Mode Switcher: Dual-Axis Chart vs. Tabel Detail Proyek */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="bg-slate-200/70 p-0.5 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('dual-axis')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                viewMode === 'dual-axis'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dual-Axis Chart</span>
            </button>
            <button
              onClick={() => setViewMode('detail')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                viewMode === 'detail'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tabel Detail Proyek</span>
            </button>
          </div>

          <button
            onClick={() => onOpenFormulaModal('kpi_investasi_infrastruktur')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Lihat Metadata Dataset 6"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>Katalog</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Ekspor data infrastruktur ke CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor</span>
          </button>
        </div>
      </div>

      {/* 2. Tableau Shelves Guide Badge */}
      <div className="px-4 py-1.5 bg-emerald-50/20 border-b border-slate-200">
        <TableauShelvesBadge
          showMe={
            viewMode === 'dual-axis'
              ? 'Dual-Axis Combo Chart (Slim Bars: Nilai Investasi, Line: Luas Lahan)'
              : 'Tabel Detail Proyek Infrastruktur (Dataset 6 Raw Cross-Tab)'
          }
          columns="[Tahun] (2024, 2025, 2026, 2027)"
          rows={
            viewMode === 'dual-axis'
              ? 'Dual Axes: SUM([Nilai Investasi (Rp T)]) & SUM([Luas Area (Ha)])'
              : '[No], [Tahun], [Nama Proyek], [Nilai], [Luas], [Lokasi], [Status]'
          }
          marks={
            viewMode === 'dual-axis'
              ? 'Axis 1: Slim Bar (Emerald, Rp T) | Axis 2: Line with Points (Sky Blue, Ha)'
              : 'Text Table (Formatted Currency & Metrics)'
          }
          filters={filterYear !== 'ALL' ? `[Tahun] = ${filterYear}` : '[Tahun] = Semua'}
        />
      </div>

      {/* 3. Strip Info Multi-Tahun (Compact) */}
      <div className="px-4 py-2 bg-emerald-50/30 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <span className="text-[10px] font-medium text-slate-500 block">Total Nilai Pipeline</span>
          <span className="text-sm font-black font-mono text-emerald-900">{formatRupiah(grandTotalNilai)}</span>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-500 block">Total Luas Lahan Terintegrasi</span>
          <span className="text-sm font-black font-mono text-sky-900">{grandTotalLuas.toFixed(1)} Hektar</span>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-500 block">Jumlah Proyek Strategis</span>
          <span className="text-xs font-bold text-slate-800 font-mono">
            {INFRASTRUKTUR_DATA.length} Proyek {filterYear !== 'ALL' ? `(Tahun ${filterYear}: ${filteredProjects.length} Proyek)` : '(2024–2027)'}
          </span>
        </div>
      </div>

      {/* 4. SHEET SWAP CONTAINER: DUAL-AXIS CHART vs. TABEL DETAIL PROYEK */}
      <div className="p-3 sm:p-4">
        {viewMode === 'dual-axis' ? (
          /* OPSI 1: TABLEAU DUAL-AXIS COMBO CHART DENGAN UKURAN LEGA & BEBAS TABRAKAN */
          <div className="space-y-3">
            {/* Chart Legend (Tableau Dual Axes) */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Dual-Axis: Nilai Investasi (Sumbu Kiri) vs Luas Area (Sumbu Kanan)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                  <span className="w-3 h-3 rounded-xs bg-emerald-600 shrink-0" />
                  <span className="font-bold text-emerald-900 text-[11px]">Nilai (Rp T) - Bar Kiri</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-50 border border-sky-200">
                  <span className="w-3.5 h-1 bg-sky-600 inline-block shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600 -ml-2 mr-0.5 shrink-0" />
                  <span className="font-bold text-sky-900 text-[11px]">Luas (Ha) - Garis Kanan</span>
                </div>
              </div>
            </div>

            {/* SVG Dual-Axis Chart Container (LEGA, TINGGI, JELAS) */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[620px] flex justify-center py-1">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full max-w-3xl h-auto select-none"
                  style={{ maxHeight: '340px' }}
                >
                  {/* Grid Lines Horizontal */}
                  {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => {
                    const y = paddingTop + (1 - tick) * plotHeight;
                    const nilaiVal = (tick * yAxisNilaiMax).toFixed(1);
                    const luasVal = (tick * yAxisLuasMax).toFixed(0);

                    return (
                      <g key={i}>
                        <line
                          x1={paddingLeft}
                          y1={y}
                          x2={chartWidth - paddingRight}
                          y2={y}
                          stroke="#E2E8F0"
                          strokeDasharray={i === 0 ? 'none' : '3 3'}
                          strokeWidth={i === 0 ? 1.5 : 0.8}
                        />
                        {/* Ticks Sumbu Kiri (Rp T) */}
                        <text
                          x={paddingLeft - 8}
                          y={y + 3.5}
                          textAnchor="end"
                          fontSize="10"
                          fontFamily="monospace"
                          fill="#047857"
                          fontWeight="bold"
                        >
                          {nilaiVal} T
                        </text>
                        {/* Ticks Sumbu Kanan (Ha) */}
                        <text
                          x={chartWidth - paddingRight + 8}
                          y={y + 3.5}
                          textAnchor="start"
                          fontSize="10"
                          fontFamily="monospace"
                          fill="#0284C7"
                          fontWeight="bold"
                        >
                          {luasVal} Ha
                        </text>
                      </g>
                    );
                  })}

                  {/* Axis Unit Labels */}
                  <text
                    x={paddingLeft - 8}
                    y={paddingTop - 12}
                    textAnchor="end"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#047857"
                  >
                    (Rp Triliun)
                  </text>
                  <text
                    x={chartWidth - paddingRight + 8}
                    y={paddingTop - 12}
                    textAnchor="start"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#0284C7"
                  >
                    (Hektar)
                  </text>

                  {/* Columns Interactive Highlights & Bars */}
                  {points.map((pt) => {
                    const isYearFiltered = Number(filterYear) === pt.year;
                    const isHovered = hoveredYear === pt.year;

                    return (
                      <g
                        key={`col-${pt.year}`}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredYear(pt.year)}
                        onMouseLeave={() => setHoveredYear(null)}
                      >
                        {/* Interactive Highlight Column */}
                        <rect
                          x={pt.x - colWidth / 2 + 6}
                          y={paddingTop - 6}
                          width={colWidth - 12}
                          height={plotHeight + 10}
                          rx={6}
                          fill={isHovered ? '#F0FDF4' : isYearFiltered ? '#ECFDF5' : 'transparent'}
                          stroke={isHovered ? '#86EFAC' : isYearFiltered ? '#A7F3D0' : 'transparent'}
                          strokeWidth={1}
                          className="transition-colors duration-200"
                        />

                        {/* BAR NILAI INVESTASI (20px width) */}
                        <rect
                          x={pt.x - barWidth / 2}
                          y={pt.barY}
                          width={barWidth}
                          height={pt.barHeight}
                          rx={4}
                          fill={isHovered ? '#047857' : isYearFiltered ? '#059669' : '#10B981'}
                          className="transition-all duration-300"
                        />

                        {/* Sumbu X: Label Tahun */}
                        <text
                          x={pt.x}
                          y={chartHeight - 20}
                          textAnchor="middle"
                          fontSize="13"
                          fontFamily="monospace"
                          fontWeight="bold"
                          fill={isHovered || isYearFiltered ? '#047857' : '#0F172A'}
                        >
                          {pt.year}
                        </text>

                        {/* Sumbu X: Jumlah Proyek */}
                        <text
                          x={pt.x}
                          y={chartHeight - 6}
                          textAnchor="middle"
                          fontSize="10"
                          fontFamily="sans-serif"
                          fontWeight="600"
                          fill="#64748B"
                        >
                          {pt.count} Proyek
                        </text>
                      </g>
                    );
                  })}

                  {/* Garis: Luas Area (Hektar) */}
                  <path
                    d={linePathD}
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Points Data Luas Area (Line Dots) */}
                  {points.map((pt) => {
                    const isHovered = hoveredYear === pt.year;
                    return (
                      <g key={`point-${pt.year}`}>
                        <circle
                          cx={pt.x}
                          cy={pt.lineY}
                          r={isHovered ? 6.5 : 5}
                          fill="#FFFFFF"
                          stroke="#0284C7"
                          strokeWidth={2.5}
                          className="transition-all duration-200"
                        />
                        <circle cx={pt.x} cy={pt.lineY} r={2.5} fill="#0284C7" />
                      </g>
                    );
                  })}

                  {/* ANTI-COLLISION DATA BADGES (DIJAMIN 100% TIDAK SALING TABRAK) */}
                  {points.map((pt) => {
                    const isHovered = hoveredYear === pt.year;

                    // 1. Badge Kiri: Nilai Investasi (Bar)
                    // Diposisikan di sebelah KIRI sumbu tengah kolom (pt.x - 62 sampai pt.x - 6)
                    const barBadgeWidth = 56;
                    const barBadgeHeight = 22;
                    const barBadgeX = pt.x - 62;
                    const barBadgeY = Math.max(
                      paddingTop - 14,
                      Math.min(paddingTop + plotHeight - 24, pt.barY - 11)
                    );

                    // 2. Badge Kanan: Luas Area (Line)
                    // Diposisikan di sebelah KANAN sumbu tengah kolom (pt.x + 12 sampai pt.x + 62)
                    const lineBadgeWidth = 50;
                    const lineBadgeHeight = 22;
                    const lineBadgeX = pt.x + 12;
                    const lineBadgeY = Math.max(
                      paddingTop - 14,
                      Math.min(paddingTop + plotHeight - 24, pt.lineY - 11)
                    );

                    return (
                      <g key={`badges-${pt.year}`}>
                        {/* Connector Line untuk Nilai Investasi */}
                        <line
                          x1={barBadgeX + barBadgeWidth}
                          y1={barBadgeY + 11}
                          x2={pt.x - barWidth / 2}
                          y2={Math.max(pt.barY, barBadgeY + 11)}
                          stroke="#059669"
                          strokeWidth={1}
                          strokeDasharray="2 2"
                          opacity={0.6}
                        />

                        {/* Badge Kiri: Nilai Investasi (Rp T) */}
                        <g
                          className="cursor-pointer"
                          onClick={() => onOpenFormulaModal('formula-nilai-investasi-dataset6')}
                        >
                          <rect
                            x={barBadgeX}
                            y={barBadgeY}
                            width={barBadgeWidth}
                            height={barBadgeHeight}
                            rx={4}
                            fill={isHovered ? '#047857' : '#ECFDF5'}
                            stroke="#059669"
                            strokeWidth={isHovered ? 1.5 : 1.2}
                            className="transition-colors duration-200"
                          />
                          <text
                            x={barBadgeX + barBadgeWidth / 2}
                            y={barBadgeY + 15}
                            textAnchor="middle"
                            fontSize="9.5"
                            fontFamily="monospace"
                            fontWeight="bold"
                            fill={isHovered ? '#FFFFFF' : '#065F46'}
                          >
                            Rp {pt.totalNilaiT.toFixed(2)}T
                          </text>
                        </g>

                        {/* Connector Line untuk Luas Area */}
                        <line
                          x1={pt.x + 5}
                          y1={pt.lineY}
                          x2={lineBadgeX}
                          y2={lineBadgeY + 11}
                          stroke="#0284C7"
                          strokeWidth={1}
                          strokeDasharray="2 2"
                          opacity={0.6}
                        />

                        {/* Badge Kanan: Luas Area (Ha) */}
                        <g
                          className="cursor-pointer"
                          onClick={() => onOpenFormulaModal('formula-luas-lahan-dataset6')}
                        >
                          <rect
                            x={lineBadgeX}
                            y={lineBadgeY}
                            width={lineBadgeWidth}
                            height={lineBadgeHeight}
                            rx={4}
                            fill={isHovered ? '#0284C7' : '#F0F9FF'}
                            stroke="#0284C7"
                            strokeWidth={isHovered ? 1.5 : 1.2}
                            className="transition-colors duration-200"
                          />
                          <text
                            x={lineBadgeX + lineBadgeWidth / 2}
                            y={lineBadgeY + 15}
                            textAnchor="middle"
                            fontSize="9.5"
                            fontFamily="monospace"
                            fontWeight="bold"
                            fill={isHovered ? '#FFFFFF' : '#0369A1'}
                          >
                            {pt.totalLuas.toFixed(1)}Ha
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Interactive Detail Ribbon on Year Hover */}
            <div className="p-2.5 bg-slate-50 border border-slate-200/90 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">
                  {hoveredYear
                    ? `Highlight Tahun ${hoveredYear}:`
                    : filterYear !== 'ALL'
                    ? `Filter Aktif Tahun ${filterYear}:`
                    : 'Ringkasan Tahunan (Arahkan kursor ke grafik untuk detail per tahun):'}
                </span>
              </div>
              {(() => {
                const activeY = hoveredYear || (filterYear !== 'ALL' ? Number(filterYear) : null);
                const activeData = activeY ? yearlyMetrics.find((m) => m.year === activeY) : null;
                if (activeData) {
                  return (
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                      <span className="text-emerald-700 font-bold">
                        Nilai: {formatRupiah(activeData.totalNilai)}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-sky-700 font-bold">
                        Luas: {activeData.totalLuas.toFixed(1)} Hektar
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-700 font-bold">
                        {activeData.count} Proyek Strategis
                      </span>
                    </div>
                  );
                }
                return (
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-600">
                    <span>Pipeline Total: <strong className="text-emerald-800">{formatRupiah(grandTotalNilai)}</strong></span>
                    <span>•</span>
                    <span>Luas Total: <strong className="text-sky-800">{grandTotalLuas.toFixed(1)} Ha</strong></span>
                    <span>•</span>
                    <span>Total: <strong>15 Proyek</strong></span>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          /* OPSI 2: DETAIL DATA INFRASTRUKTUR YANG AKAN DIBANGUN (SHEET SWAP TABEL) */
          <div className="space-y-2.5">
            {/* Toolbar: Filter Sektor & Search (Filter Tahun sudah ada di filter bar atas) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-slate-700">Filter Sektor:</span>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 cursor-pointer focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="ALL">Semua Sektor</option>
                  <option value="Transportasi & Konektivitas">Transportasi &amp; Konektivitas</option>
                  <option value="Energi & Utilitas">Energi &amp; Utilitas</option>
                  <option value="Kawasan Industri & Hub">Kawasan Industri &amp; Hub</option>
                  <option value="Kesehatan & Pariwisata">Kesehatan &amp; Pariwisata</option>
                </select>
                {filterYear !== 'ALL' && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Tahun {filterYear}
                  </span>
                )}
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama proyek / lokasi..."
                  className="w-full pl-7 pr-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Tabel Detail Proyek Infrastruktur */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-xs font-sans text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 text-[10.5px] uppercase tracking-wider font-semibold">
                    <th className="py-2 px-3 w-10 text-center">No</th>
                    <th className="py-2 px-3 w-16 text-center">Tahun</th>
                    <th className="py-2 px-3">Nama Proyek Infrastruktur</th>
                    <th className="py-2 px-3 text-right">Nilai Investasi</th>
                    <th className="py-2 px-3 text-right">Luas Area</th>
                    <th className="py-2 px-3">Lokasi</th>
                    <th className="py-2 px-3">Sektor</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        Tidak ada proyek infrastruktur yang sesuai filter
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((row, idx) => (
                      <tr key={row.id} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="py-2 px-3 text-center font-mono font-bold text-slate-400">
                          {idx + 1}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                            {row.tahun}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <div className="font-bold text-slate-900 leading-snug">{row.namaProyek}</div>
                          <div className="text-[10px] text-slate-400 font-sans">
                            Sumber: {row.sumberPendanaan}
                          </div>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-black text-slate-900 whitespace-nowrap">
                          {formatRupiah(row.nilaiInvestasi)}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-sky-800 whitespace-nowrap">
                          {row.luasAreaHa.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Ha
                        </td>
                        <td className="py-2 px-3 text-slate-700 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{row.lokasi}</span>
                          </div>
                        </td>
                        <td className="py-2 px-3 text-slate-700 text-[11px]">
                          {row.sektor}
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              row.status === 'Operasional Awal'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : row.status === 'Tahap Konstruksi Fisik'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : row.status === 'Tender Konstruksi'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 5. Footer Info */}
      <div className="p-2.5 sm:p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 font-mono gap-1">
        <span>
          Menampilkan {filteredProjects.length} dari {INFRASTRUKTUR_DATA.length} proyek infrastruktur strategis
        </span>
        <span className="text-[11px] text-slate-400 font-sans">
          Atribut Dataset 6: [Nilai Investasi], [Luas Area], dan [Tahun Pelaksanaan]
        </span>
      </div>
    </div>
  );
};
