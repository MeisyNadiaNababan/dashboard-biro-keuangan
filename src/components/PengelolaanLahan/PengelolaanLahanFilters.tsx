import React from 'react';
import { Filter, RotateCcw, Search, Calendar, Users, CheckCircle } from 'lucide-react';
import { LahanFilterState } from './types';

interface PengelolaanLahanFiltersProps {
  filters: LahanFilterState;
  onFilterChange: (newFilters: Partial<LahanFilterState>) => void;
  onResetFilters: () => void;
}

const JENIS_PEMOHON_OPTIONS = [
  { value: 'ALL', label: 'Semua Pemohon' },
  { value: 'Individual Person', label: 'Individual Person' },
  { value: 'Perseroan Terbatas (PT)', label: 'Perseroan Terbatas (PT)' },
  { value: 'Yayasan', label: 'Yayasan' },
  { value: 'Pemerintahan', label: 'Instansi Pemerintah' },
  { value: 'Koperasi', label: 'Koperasi' },
  { value: 'Gereja', label: 'Badan Keagamaan / Gereja' },
  { value: 'Lain-Lain', label: 'Lain-Lain' },
];

export const PengelolaanLahanFilters: React.FC<PengelolaanLahanFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 mb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Filter Interaktif Pengelolaan Lahan BP Batam
            </h3>
            <p className="text-[11px] text-slate-500">
              Menyaring data perizinan, penerbitan PL/SKPT/SPPT, dan lahan tersedia per sub-wilayah (SWP)
            </p>
          </div>
        </div>

        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-medium transition-colors cursor-pointer"
          title="Reset semua filter ke default"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
        {/* 1. Filter Tahun */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Periode Tahun</span>
          </label>
          <select
            value={filters.tahun}
            onChange={(e) => onFilterChange({ tahun: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 focus:border-slate-400 outline-hidden cursor-pointer"
          >
            <option value="ALL">Semua Periode (2023 - 2024)</option>
            <option value="2024">Tahun 2024 (Berjalan)</option>
            <option value="2023">Tahun 2023 (Tahunan Penuh)</option>
          </select>
        </div>

        {/* 2. Filter Jenis Pemohon */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Users className="w-3 h-3 text-slate-400" />
            <span>Jenis Pemohon</span>
          </label>
          <select
            value={filters.jenisPemohon}
            onChange={(e) => onFilterChange({ jenisPemohon: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 focus:border-slate-400 outline-hidden cursor-pointer"
          >
            {JENIS_PEMOHON_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Filter Status Permohonan */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-slate-400" />
            <span>Status Permohonan</span>
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value as any })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 focus:border-slate-400 outline-hidden cursor-pointer"
          >
            <option value="ALL">Semua Status (Disetujui &amp; Ditolak)</option>
            <option value="DISETUJUI">Hanya Disetujui</option>
            <option value="DITOLAK">Hanya Ditolak</option>
          </select>
        </div>

        {/* 4. Quick Search Box */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Search className="w-3 h-3 text-slate-400" />
            <span>Cari Layanan / Pemohon</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Cari PT, nama, id entri..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg pl-8 pr-2.5 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 focus:border-slate-400 outline-hidden"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
