import React from 'react';
import { Filter, RotateCcw, Calendar, Building2, Briefcase, RefreshCw } from 'lucide-react';
import { KebijakanStrategisFilterState } from './types';

interface KebijakanStrategisFiltersProps {
  filterState: KebijakanStrategisFilterState;
  onFilterChange: (updates: Partial<KebijakanStrategisFilterState>) => void;
  onResetFilters: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const KebijakanStrategisFilters: React.FC<KebijakanStrategisFiltersProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-2.5 sm:p-3 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Filter Controls Group (Inline & Compact) */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Label Icon */}
          <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase text-[10.5px] tracking-wider pr-1">
            <Filter className="w-3.5 h-3.5 text-sky-600" />
            <span>Filter:</span>
          </div>

          {/* 1. Tahun Anggaran */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] text-slate-500 font-medium">TA:</span>
            <select
              value={filterState.selectedYear}
              onChange={(e) => onFilterChange({ selectedYear: e.target.value })}
              className="bg-transparent text-slate-800 font-bold focus:outline-hidden cursor-pointer"
            >
              <option value="2025">2025 (Perkin Resmi)</option>
              <option value="2026">2026 (Prognosa Berjalan)</option>
            </select>
          </div>

          {/* 2. Periode Laporan */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
            <span className="text-[11px] text-slate-500 font-medium">Periode:</span>
            <select
              value={filterState.selectedPeriod}
              onChange={(e) => onFilterChange({ selectedPeriod: e.target.value })}
              className="bg-transparent text-slate-800 font-bold focus:outline-hidden cursor-pointer"
            >
              <option value="YTD 2025">Kumulatif Jan - Des 2025</option>
              <option value="April 2026">April 2026 (Bulan Ini)</option>
              <option value="Triwulan I">Triwulan I (Q1)</option>
              <option value="Triwulan II">Triwulan II (Q2)</option>
              <option value="Triwulan III">Triwulan III (Q3)</option>
              <option value="Triwulan IV">Triwulan IV (Q4)</option>
            </select>
          </div>

          {/* 3. Fokus Unit Kerja */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
            <Building2 className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] text-slate-500 font-medium">Unit:</span>
            <select
              value={filterState.selectedUnit}
              onChange={(e) => onFilterChange({ selectedUnit: e.target.value })}
              className="bg-transparent text-slate-800 font-bold focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua 4 Unit Pelaksana</option>
              <option value="pusat-perencanaan-program">Pusren (Perencanaan Strategis)</option>
              <option value="pusat-harmonisasi">PHKS (Harmonisasi Kebijakan)</option>
              <option value="pdsi">PDSI (Data Center &amp; SPBE)</option>
              <option value="ptsp">PTSP (Pelayanan Perizinan)</option>
            </select>
          </div>

          {/* 4. Sektor Perizinan */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
            <Briefcase className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] text-slate-500 font-medium">Sektor:</span>
            <select
              value={filterState.selectedSektor}
              onChange={(e) => onFilterChange({ selectedSektor: e.target.value })}
              className="bg-transparent text-slate-800 font-bold focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Sektor Usaha</option>
              <option value="LOG">Logistik &amp; Transportasi Laut</option>
              <option value="DAG">Perdagangan &amp; Jasa</option>
              <option value="KON">Konstruksi &amp; Properti</option>
              <option value="LAU">Kelautan &amp; Perikanan</option>
              <option value="IND">Industri Manufaktur</option>
            </select>
          </div>
        </div>

        {/* Right: Quick Reset & Refresh */}
        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 text-xs transition-all cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`} />
            </button>
          )}

          <button
            onClick={onResetFilters}
            className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
            title="Reset ke pengaturan default"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
