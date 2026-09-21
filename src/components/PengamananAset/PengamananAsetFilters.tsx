import React from 'react';
import { Filter, RotateCcw, Search, Calendar, MapPin, ShieldAlert, Layers } from 'lucide-react';
import { PengamananFilterState } from './types';

interface PengamananAsetFiltersProps {
  filters: PengamananFilterState;
  onFilterChange: (newFilters: Partial<PengamananFilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount?: number;
}

export const PengamananAsetFilters: React.FC<PengamananAsetFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Filter Operasional Pengamanan &amp; Penertiban Terpadu</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                Ditpam BP Batam
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Filter data dinamis untuk 12 Dataset Satu Data (Dataset #1, #3, #6, #7, #9, #10, #12).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {totalFilteredCount !== undefined && (
            <span className="text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 font-mono">
              Terfilter: <strong className="text-slate-900">{totalFilteredCount}</strong> entri
            </span>
          )}
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
            title="Reset semua filter ke kondisi awal"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Filter</span>
          </button>
        </div>
      </div>

      {/* Grid of Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {/* Filter 1: Tahun */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Tahun Dokumen</span>
          </label>
          <select
            value={filters.tahun}
            onChange={(e) => onFilterChange({ tahun: e.target.value })}
            className="w-full h-8.5 px-2.5 text-xs font-medium bg-slate-50 hover:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all text-slate-800"
          >
            <option value="ALL">Semua Tahun (2022 - 2024)</option>
            <option value="2024">Tahun 2024 (Tahun Berjalan)</option>
            <option value="2023">Tahun 2023</option>
            <option value="2022">Tahun 2022</option>
          </select>
        </div>

        {/* Filter 2: Semester */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" />
            <span>Periode Semester</span>
          </label>
          <select
            value={filters.semester}
            onChange={(e) => onFilterChange({ semester: e.target.value })}
            className="w-full h-8.5 px-2.5 text-xs font-medium bg-slate-50 hover:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all text-slate-800"
          >
            <option value="ALL">Semua Semester (1 &amp; 2)</option>
            <option value="1">Semester 1 (Jan - Jun)</option>
            <option value="2">Semester 2 (Jul - Des)</option>
          </select>
        </div>

        {/* Filter 3: Sektor / Wilayah */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>Sektor Operasional</span>
          </label>
          <select
            value={filters.lokasiSektor}
            onChange={(e) => onFilterChange({ lokasiSektor: e.target.value })}
            className="w-full h-8.5 px-2.5 text-xs font-medium bg-slate-50 hover:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all text-slate-800"
          >
            <option value="ALL">Semua Sektor Wilayah</option>
            <option value="Batam Centre">Batam Centre (Kantor BIFZA)</option>
            <option value="Sei Ladi">Sekupang &amp; Waduk Sei Ladi</option>
            <option value="Duriangkang">Duriangkang &amp; Sei Beduk</option>
            <option value="Hang Nadim">Nongsa &amp; Bandara Hang Nadim</option>
            <option value="Batu Ampar">Batu Ampar &amp; Pelabuhan</option>
            <option value="Tembesi">Sagulung, Tembesi &amp; Rempang</option>
          </select>
        </div>

        {/* Filter 4: Kategori Objek Pengamanan */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-slate-400" />
            <span>Kategori Pengamanan</span>
          </label>
          <select
            value={filters.jenisObjek}
            onChange={(e) => onFilterChange({ jenisObjek: e.target.value })}
            className="w-full h-8.5 px-2.5 text-xs font-medium bg-slate-50 hover:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all text-slate-800"
          >
            <option value="ALL">Semua Kategori</option>
            <option value="Bangunan Liar">Bangunan Liar (Dataset #1)</option>
            <option value="Unjuk Rasa">Unjuk Rasa (Dataset #7)</option>
            <option value="Bencana Alam">Bencana Alam / Karhutla (Dataset #6)</option>
            <option value="Penertiban">Penertiban Rutin (Dataset #9)</option>
            <option value="Objek Vital">Objek Vital &amp; Waduk (Dataset #10 &amp; #12)</option>
          </select>
        </div>

        {/* Filter 5: Search Query */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Search className="w-3 h-3 text-slate-400" />
            <span>Pencarian Kata Kunci</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari lokasi, aliansi, objek..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full h-8.5 pl-8 pr-2.5 text-xs bg-slate-50 hover:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all text-slate-800"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
