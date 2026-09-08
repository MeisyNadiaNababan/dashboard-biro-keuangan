import React, { useState } from 'react';
import {
  ChevronDown,
  Download,
  RotateCcw,
  SlidersHorizontal,
  TableProperties,
  Filter,
  Check,
  Calendar,
  Building2,
  Coins,
  Layers,
  Sparkles
} from 'lucide-react';

export interface ExecutiveFiltersProps {
  selectedYear: string;
  onChangeYear: (val: string) => void;
  selectedMonth: string;
  onChangeMonth: (val: string) => void;
  selectedQuarter: string;
  onChangeQuarter: (val: string) => void;
  selectedUnit: string;
  onChangeUnit: (val: string) => void;
  selectedFunding: string;
  onChangeFunding: (val: string) => void;
  basis?: 'ytd' | 'monthly';
  onChangeBasis?: (val: 'ytd' | 'monthly') => void;
  onResetFilters: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenExportModal?: () => void;
  onOpenDataExploration?: () => void;
  // Legacy / fallback props
  selectedPeriod?: string;
  onChangePeriod?: (val: string) => void;
}

export const ExecutiveFilters: React.FC<ExecutiveFiltersProps> = ({
  selectedYear,
  onChangeYear,
  selectedMonth,
  onChangeMonth,
  selectedQuarter,
  onChangeQuarter,
  selectedUnit,
  onChangeUnit,
  selectedFunding,
  onChangeFunding,
  basis = 'ytd',
  onChangeBasis,
  onResetFilters,
  onRefresh,
  isRefreshing,
  onOpenExportModal,
  onOpenDataExploration,
}) => {
  // Always keep filters shelf expanded by default for full Tableau control, with toggle available
  const [showFilterShelf, setShowFilterShelf] = useState(true);

  const yearOptions = [
    { value: '2026', label: '2026 (Tahun Berjalan / DIPA Induk)' },
    { value: '2025', label: '2025 (Audited BPK RI)' },
    { value: '2024', label: '2024 (Audited BPK RI)' },
  ];

  const monthOptions = [
    { value: 'April', label: 'April (Cut-Off Berjalan)' },
    { value: 'Semua Bulan', label: 'Semua Bulan (YTD Kumulatif)' },
    { value: 'Januari', label: 'Januari' },
    { value: 'Februari', label: 'Februari' },
    { value: 'Maret', label: 'Maret (Akhir Q1)' },
    { value: 'Mei', label: 'Mei' },
    { value: 'Juni', label: 'Juni (Akhir Q2)' },
    { value: 'Juli', label: 'Juli' },
    { value: 'Agustus', label: 'Agustus' },
    { value: 'September', label: 'September (Akhir Q3)' },
    { value: 'Oktober', label: 'Oktober' },
    { value: 'November', label: 'November' },
    { value: 'Desember', label: 'Desember (Akhir TA)' },
  ];

  const quarterOptions = [
    { value: 'Q2', label: 'Triwulan II (Q2: Apr - Jun)' },
    { value: 'Semua Triwulan', label: 'Semua Triwulan (YTD Kumulatif)' },
    { value: 'Q1', label: 'Triwulan I (Q1: Jan - Mar)' },
    { value: 'Q3', label: 'Triwulan III (Q3: Jul - Sep)' },
    { value: 'Q4', label: 'Triwulan IV (Q4: Okt - Des)' },
  ];

  const unitOptions = [
    { value: 'ALL', label: 'Semua Satuan Kerja (Konsolidasi BP Batam)' },
    { value: 'Biro Keuangan', label: 'Biro Keuangan (Kantor Pusat / Jasa Giro)' },
    { value: 'Dit. Pengelolaan Pertanahan', label: 'Dit. Pengelolaan Pertanahan' },
    { value: 'BU SPAM, Fasilitas dan Lingkungan', label: 'BU SPAM, Fasilitas dan Lingkungan' },
    { value: 'Dit. Pengelolaan Kepelabuhanan', label: 'Dit. Pengelolaan Kepelabuhanan (BU Pelabuhan)' },
    { value: 'Dit. Pengelolaan Kawasan Bandara', label: 'Dit. Pengelolaan Bandara (BU Bandara)' },
    { value: 'BU Rumah Sakit BP Batam', label: 'BU Rumah Sakit BP Batam' },
    { value: 'Pusat Data dan Sistem Informasi (PDSI)', label: 'Pusat Data & Sistem Informasi (PDSI)' },
    { value: 'Dit. Pembangunan Infrastruktur', label: 'Dit. Pembangunan Infrastruktur' },
  ];

  const fundingOptions = [
    { value: 'ALL', label: 'Semua Sumber Dana (All Funds)' },
    { value: 'PNBP BLU', label: 'PNBP BLU (Pendapatan Mandiri Otonom)' },
    { value: 'RM APBN', label: 'Rupiah Murni (RM APBN Kemenkeu)' },
    { value: 'PHLN', label: 'Pinjaman / Hibah Luar Negeri (PHLN)' },
    { value: 'SBSN', label: 'Surat Berharga Syariah Negara (SBSN Proyek)' },
  ];

  // Count active non-default filters
  const activeFilterCount = [
    selectedYear !== '2026',
    selectedMonth !== 'April',
    selectedQuarter !== 'Q2',
    selectedUnit !== 'ALL',
    selectedFunding !== 'ALL',
    basis !== 'ytd',
  ].filter(Boolean).length;

  const handleQuarterChange = (q: string) => {
    onChangeQuarter(q);
    if (q === 'Q1') onChangeMonth('Maret');
    else if (q === 'Q2') onChangeMonth('April');
    else if (q === 'Q3') onChangeMonth('September');
    else if (q === 'Q4') onChangeMonth('Desember');
    else if (q === 'Semua Triwulan') onChangeMonth('Semua Bulan');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 lg:p-6 font-sans select-none transition-all space-y-4">
      {/* 1. TOP MAIN BANNER BAR (Exact Match to Executive Reference) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Side: Breadcrumb & Title */}
        <div className="space-y-0.5">
          <div className="flex items-center text-xs sm:text-sm">
            <span className="text-slate-400 font-semibold">Dashboard Eksekutif</span>
            <span className="text-slate-400 mx-2 text-base leading-none font-normal">›</span>
            <span className="text-[#002B49] font-black tracking-wider uppercase text-xs sm:text-sm">
              PERENCANAAN &amp; KINERJA KEUANGAN
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-black text-[#002B49] tracking-tight leading-tight">
            DETAIL PERFORMA KEUANGAN BP BATAM
          </h1>
          <p className="text-xs text-slate-500 font-medium pt-0.5">
            Tahun Anggaran <strong className="text-slate-800">{selectedYear}</strong> • Periode Cut-Off:{' '}
            <strong className="text-slate-800">{selectedMonth}</strong> ({selectedQuarter}) • Satker:{' '}
            <span className="text-[#002B49] font-semibold">
              {selectedUnit === 'ALL' ? 'Konsolidasi Seluruh Unit' : selectedUnit}
            </span>
          </p>
        </div>

        {/* Right Side: Quick Parameters & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Quick Year Selector */}
          <div className="relative">
            <select
              aria-label="Pilih Tahun Anggaran"
              value={selectedYear}
              onChange={(e) => onChangeYear(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-bold pl-3 pr-8 py-2 rounded-lg border border-slate-200 shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#002B49]/20 transition-colors"
            >
              {yearOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  TA {opt.value}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Quick Month Selector */}
          <div className="relative">
            <select
              aria-label="Pilih Bulan Cut-Off Laporan"
              value={selectedMonth}
              onChange={(e) => onChangeMonth(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-bold pl-3 pr-8 py-2 rounded-lg border border-slate-200 shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#002B49]/20 transition-colors"
            >
              {monthOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Data Exploration Button */}
          <button
            type="button"
            onClick={onOpenDataExploration}
            className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-2xs cursor-pointer transition-colors active:scale-[0.99]"
            title="Buka Kamus Data, Formula Calculated Fields & Worksheets Tableau"
          >
            <TableProperties className="w-4 h-4 text-slate-700" />
            <span className="hidden sm:inline">DATA EXPLORATION</span>
            <span className="sm:hidden">DATA</span>
          </button>

          {/* Ekspor Laporan Button (Navy Pill) */}
          <button
            type="button"
            onClick={onOpenExportModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#001D3D] hover:bg-[#072a54] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-sm cursor-pointer transition-all active:scale-[0.98]"
            title="Ekspor Laporan Eksekutif (PDF / Excel / PPT)"
          >
            <Download className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">EKSPOR LAPORAN</span>
            <span className="sm:hidden">EKSPOR</span>
          </button>

          {/* Toggle Full Tableau Parameter Shelf */}
          <button
            type="button"
            onClick={() => setShowFilterShelf(!showFilterShelf)}
            className={`p-2 rounded-lg border transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 ${
              showFilterShelf
                ? 'bg-slate-100 text-[#002B49] border-slate-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Tampilkan / Sembunyikan Rak Filter Konteks Tableau Lengkap"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-[#002B49] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. TABLEAU CONTEXT FILTER SHELF (Authentic Tableau Executive Filter Shelf) */}
      {showFilterShelf && (
        <div className="pt-3.5 border-t border-slate-100 space-y-3.5 animate-in fade-in duration-200">
          {/* Header of Filter Shelf */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#002B49] text-white flex items-center justify-center shadow-2xs">
                <Filter className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 tracking-tight text-xs uppercase">
                  Panel Filter Global Dashboard (Tableau Context Filters)
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Filter interaktif terhubung ke seluruh worksheet analitik pendapatan, belanja, kas, dan piutang
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={onResetFilters}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                title="Kembalikan semua filter ke posisi default"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Filter</span>
              </button>
            </div>
          </div>

          {/* 5-Column Filter Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {/* 1. Tahun Anggaran */}
            <div className="space-y-1 bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/80">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                1. Tahun Anggaran (DIPA)
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => onChangeYear(e.target.value)}
                  className="w-full appearance-none bg-white text-slate-900 text-xs font-bold pl-2.5 pr-7 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002B49] cursor-pointer"
                >
                  {yearOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 2. Bulan Cut-Off Laporan */}
            <div className="space-y-1 bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/80">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                2. Bulan / Periode Cut-Off
              </label>
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => onChangeMonth(e.target.value)}
                  className="w-full appearance-none bg-white text-slate-900 text-xs font-bold pl-2.5 pr-7 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002B49] cursor-pointer"
                >
                  {monthOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3. Triwulan / Kuartal Evaluasi */}
            <div className="space-y-1 bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/80">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                3. Triwulan (Quarter)
              </label>
              <div className="relative">
                <select
                  value={selectedQuarter}
                  onChange={(e) => handleQuarterChange(e.target.value)}
                  className="w-full appearance-none bg-white text-slate-900 text-xs font-bold pl-2.5 pr-7 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002B49] cursor-pointer"
                >
                  {quarterOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 4. Unit Kerja / Satuan Kerja */}
            <div className="space-y-1 bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/80">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                4. Unit Kerja / Satker
              </label>
              <div className="relative">
                <select
                  value={selectedUnit}
                  onChange={(e) => onChangeUnit(e.target.value)}
                  className="w-full appearance-none bg-white text-slate-900 text-xs font-bold pl-2.5 pr-7 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002B49] cursor-pointer truncate"
                >
                  {unitOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 5. Sumber Pendanaan */}
            <div className="space-y-1 bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/80">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                5. Sumber Pendanaan
              </label>
              <div className="relative">
                <select
                  value={selectedFunding}
                  onChange={(e) => onChangeFunding(e.target.value)}
                  className="w-full appearance-none bg-white text-slate-900 text-xs font-bold pl-2.5 pr-7 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002B49] cursor-pointer truncate"
                >
                  {fundingOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Pills Bar & Tableau Context Shelves Spec */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            {/* Active Badges */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Filter Aktif:
              </span>
              <span className="px-2 py-0.5 bg-blue-50 text-[#002B49] border border-blue-200 rounded-md text-[11px] font-bold font-mono">
                TA: {selectedYear}
              </span>
              <span className="px-2 py-0.5 bg-blue-50 text-[#002B49] border border-blue-200 rounded-md text-[11px] font-bold font-mono">
                Bulan: {selectedMonth}
              </span>
              <span className="px-2 py-0.5 bg-blue-50 text-[#002B49] border border-blue-200 rounded-md text-[11px] font-bold font-mono">
                Triwulan: {selectedQuarter}
              </span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-[11px] font-bold">
                Satker: {selectedUnit === 'ALL' ? 'Konsolidasi Semua Unit' : selectedUnit}
              </span>
              {selectedFunding !== 'ALL' && (
                <span className="px-2 py-0.5 bg-purple-50 text-purple-800 border border-purple-200 rounded-md text-[11px] font-bold">
                  Dana: {selectedFunding}
                </span>
              )}
            </div>

            {/* Tableau Context Filter Indicator */}
            <div className="text-[10px] font-mono text-slate-500 bg-slate-100/90 px-2.5 py-1 rounded-md border border-slate-200 self-start sm:self-auto">
              <span>Tableau Context: </span>
              <strong className="text-slate-700 font-bold">[tahun], [bulan], [nama_unit]</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
