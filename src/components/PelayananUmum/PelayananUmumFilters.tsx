import React from 'react';
import {
  Filter,
  Calendar,
  Building2,
  Activity,
  Layers,
  RotateCcw,
  Sparkles,
  Database,
  BarChart3,
  Search,
} from 'lucide-react';
import { PelayananUmumFilterState } from './types';

interface PelayananUmumFiltersProps {
  filterState: PelayananUmumFilterState;
  onFilterChange: (updates: Partial<PelayananUmumFilterState>) => void;
  onResetFilters: () => void;
  onOpenDataExploration?: () => void;
}

export const PelayananUmumFilters: React.FC<PelayananUmumFiltersProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  onOpenDataExploration,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-2.5 sm:p-3">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Left Side: Filter Dropdowns (Inline, Compact, Elegant) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
            <Filter className="w-3.5 h-3.5 text-[#002B49]" />
            <span className="uppercase tracking-wider">FILTERS</span>
          </div>

          {/* 1. Periode / Cut-Off Filter */}
          <div className="relative">
            <select
              value={filterState.selectedMonth}
              onChange={(e) => onFilterChange({ selectedMonth: e.target.value })}
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold pl-2.5 pr-7 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
            >
              <option value="April">April 2026 (YTD Cut-Off)</option>
              <option value="Maret">Maret 2026 (Q1 Akhir)</option>
              <option value="Februari">Februari 2026</option>
              <option value="Januari">Januari 2026</option>
              <option value="Q2">Triwulan II (Q2 2026)</option>
              <option value="Q1">Triwulan I (Q1 2026)</option>
              <option value="TA 2026">TA 2026 (Penuh)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-500">
              <span className="text-[10px]">&#9662;</span>
            </div>
          </div>

          {/* 2. Unit Kerja Filter */}
          <div className="relative">
            <select
              value={filterState.selectedUnit}
              onChange={(e) => onFilterChange({ selectedUnit: e.target.value })}
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold pl-2.5 pr-7 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
            >
              <option value="ALL">Semua Unit (Konsolidasi 3 Satker)</option>
              <option value="bu-rumah-sakit">Badan Usaha Rumah Sakit (RSBP)</option>
              <option value="dit-pam-aset">Dit. Pengamanan Aset dan Kawasan</option>
              <option value="bu-spam-fasling">BU SPAM, Fasilitas & Lingkungan</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-500">
              <span className="text-[10px]">&#9662;</span>
            </div>
          </div>

          {/* 3. Status Kinerja Filter */}
          <div className="relative">
            <select
              value={filterState.selectedStatus}
              onChange={(e) => onFilterChange({ selectedStatus: e.target.value })}
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold pl-2.5 pr-7 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
            >
              <option value="ALL">Status: Semua</option>
              <option value="healthy">Status: Healthy (On Track)</option>
              <option value="monitor">Status: Monitor</option>
              <option value="attention">Status: Attention (Perhatian)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-500">
              <span className="text-[10px]">&#9662;</span>
            </div>
          </div>

          {/* Reset Filter Button */}
          <button
            onClick={onResetFilters}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            title="Reset Semua Filter"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Side: View Mode Switcher (Tab pills) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => onFilterChange({ viewMode: 'ikhtisar' })}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              filterState.viewMode === 'ikhtisar'
                ? 'bg-white text-[#002B49] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ikhtisar Eksekutif
          </button>
          <button
            onClick={() => onFilterChange({ viewMode: 'finansial' })}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              filterState.viewMode === 'finansial'
                ? 'bg-white text-[#002B49] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Finansial & PNBP
          </button>
          <button
            onClick={() => onFilterChange({ viewMode: 'operasional' })}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              filterState.viewMode === 'operasional'
                ? 'bg-white text-[#002B49] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kinerja 3 Unit
          </button>
          <button
            onClick={() => onFilterChange({ viewMode: 'deep_dive' })}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              filterState.viewMode === 'deep_dive'
                ? 'bg-[#002B49] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Unit Deep-Dive</span>
          </button>
          <button
            onClick={() => onFilterChange({ viewMode: 'satu_data' })}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer hidden md:flex items-center gap-1 ${
              filterState.viewMode === 'satu_data'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3 h-3" />
            <span>Katalog 121 DS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
