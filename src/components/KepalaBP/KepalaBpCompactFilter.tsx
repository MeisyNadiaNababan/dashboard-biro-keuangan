import React from 'react';
import {
  Filter,
  Search,
  RotateCcw,
  Download,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileSpreadsheet
} from 'lucide-react';

export interface KepalaBpFilterState {
  periode: 'YTD 2026' | 'Q1 2026' | 'Q2 2026' | 'Q3 2026' | 'Proyeksi 2026';
  klaster: 'ALL' | 'Pimpinan' | 'Badan Usaha' | 'Direktorat' | 'Biro' | 'Pusat' | 'Satuan';
  statusCapaian: 'ALL' | 'Tercapai' | 'On Track' | 'Perlu Perhatian';
  searchQuery: string;
}

interface KepalaBpCompactFilterProps {
  filterState: KepalaBpFilterState;
  onFilterChange: (newFilter: Partial<KepalaBpFilterState>) => void;
  onResetFilter: () => void;
  onExportCsv?: () => void;
  activeView: string;
  onSelectView: (view: string) => void;
}

export const KepalaBpCompactFilter: React.FC<KepalaBpCompactFilterProps> = ({
  filterState,
  onFilterChange,
  onResetFilter,
  onExportCsv,
  activeView,
  onSelectView,
}) => {
  const isFiltered =
    filterState.periode !== 'YTD 2026' ||
    filterState.klaster !== 'ALL' ||
    filterState.statusCapaian !== 'ALL' ||
    filterState.searchQuery.trim() !== '';

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-2 sm:p-2.5 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Left Side: Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Badge Label */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#002B49] text-white font-mono font-bold shrink-0">
            <Filter className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">FILTER KONSOLIDASI</span>
            <span className="sm:hidden">FILTER</span>
          </div>

          {/* Periode Dropdown / Toggle */}
          <div className="relative">
            <select
              value={filterState.periode}
              onChange={(e) => onFilterChange({ periode: e.target.value as KepalaBpFilterState['periode'] })}
              aria-label="Filter Periode Evaluasi"
              className="bg-slate-100 hover:bg-slate-200/80 border border-slate-200 font-bold text-slate-700 rounded-lg px-2.5 py-1 text-xs outline-none cursor-pointer pr-7 transition-colors"
            >
              <option value="YTD 2026">Periode: YTD 2026 (Berjalan)</option>
              <option value="Q1 2026">Periode: Triwulan I 2026</option>
              <option value="Q2 2026">Periode: Triwulan II 2026</option>
              <option value="Q3 2026">Periode: Triwulan III 2026</option>
              <option value="Proyeksi 2026">Periode: Proyeksi Akhir 2026</option>
            </select>
          </div>

          {/* Klaster Satker Dropdown */}
          <div className="relative">
            <select
              value={filterState.klaster}
              onChange={(e) => onFilterChange({ klaster: e.target.value as KepalaBpFilterState['klaster'] })}
              aria-label="Filter Klaster Unit Kerja"
              className="bg-slate-100 hover:bg-slate-200/80 border border-slate-200 font-medium text-slate-700 rounded-lg px-2.5 py-1 text-xs outline-none cursor-pointer pr-7 transition-colors"
            >
              <option value="ALL">Semua Klaster Satker (24 Unit)</option>
              <option value="Pimpinan">Pimpinan &amp; 7 Deputi (DEP-A1 s.d A7)</option>
              <option value="Badan Usaha">Badan Usaha (RSBP, BUP, SPAM/Fasling)</option>
              <option value="Direktorat">Direktorat Teknis (Lahan, Infras, dll)</option>
              <option value="Biro">Biro Pendukung (Keuangan, SDM, OKMR)</option>
              <option value="Pusat">Pusat Layanan (PTSP, PDSI, P3S, PHKS)</option>
            </select>
          </div>

          {/* Status Capaian Filter */}
          <div className="relative">
            <select
              value={filterState.statusCapaian}
              onChange={(e) => onFilterChange({ statusCapaian: e.target.value as KepalaBpFilterState['statusCapaian'] })}
              aria-label="Filter Status Capaian Kinerja"
              className="bg-slate-100 hover:bg-slate-200/80 border border-slate-200 font-medium text-slate-700 rounded-lg px-2.5 py-1 text-xs outline-none cursor-pointer pr-7 transition-colors"
            >
              <option value="ALL">Status Kinerja: Semua</option>
              <option value="Tercapai">🟢 Tercapai (&gt;100%)</option>
              <option value="On Track">🔵 On Track (75% - 99%)</option>
              <option value="Perlu Perhatian">🟠 Perlu Perhatian (&lt;75%)</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="relative w-44 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari indikator / satker..."
              value={filterState.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full pl-8 pr-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          {/* Reset Filter Button */}
          {isFiltered && (
            <button
              onClick={onResetFilter}
              className="flex items-center gap-1 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-semibold transition-colors cursor-pointer"
              title="Reset semua filter ke kondisi awal"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right Side: Quick Action & Export */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onExportCsv && (
            <button
              onClick={onExportCsv}
              className="px-2.5 py-1 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ekspor Data</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
