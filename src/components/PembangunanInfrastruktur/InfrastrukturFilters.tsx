import React from 'react';
import { Filter, Search, RotateCcw, Calendar, Layers, MapPin, Activity } from 'lucide-react';
import { InfrastrukturFilterState } from './types';

interface InfrastrukturFiltersProps {
  filters: InfrastrukturFilterState;
  onFilterChange: (newFilters: Partial<InfrastrukturFilterState>) => void;
  onResetFilters: () => void;
}

export const InfrastrukturFilters: React.FC<InfrastrukturFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3 mb-3.5 font-sans">
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-sky-600" />
          <h3 className="font-bold text-slate-800 text-xs">
            Filter &amp; Parameter Pengendalian Infrastruktur BP Batam
          </h3>
          <span className="text-[10px] bg-sky-50 text-sky-700 px-1.5 py-0.2 rounded font-medium border border-sky-200 font-mono">
            Satu Data 6 Dataset
          </span>
        </div>

        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 text-[10.5px] text-slate-500 hover:text-slate-800 font-medium px-2 py-1 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
          title="Reset semua filter ke default"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {/* Search */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5 flex items-center gap-1">
            <Search className="w-3 h-3 text-slate-400" />
            Cari Proyek / Ruas
          </label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Ketik kata kunci..."
            className="w-full text-xs px-2.5 py-1 border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 bg-slate-50/50"
          />
        </div>

        {/* Tahun Anggaran */}
        <div>
          <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            Tahun Anggaran
          </label>
          <select
            value={filters.tahun}
            onChange={(e) => onFilterChange({ tahun: e.target.value })}
            className="w-full text-xs px-2 py-1 border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 bg-white"
          >
            <option value="Semua">Semua Tahun</option>
            <option value="2026">2026 (Proyeksi)</option>
            <option value="2025">2025 (Berjalan)</option>
            <option value="2024">2024 (PHO)</option>
          </select>
        </div>

        {/* Jenis Pekerjaan (JNS_PEK - Dataset No. 6) */}
        <div>
          <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" />
            Jenis Pekerjaan
          </label>
          <select
            value={filters.jenisPekerjaan}
            onChange={(e) => onFilterChange({ jenisPekerjaan: e.target.value })}
            className="w-full text-xs px-2 py-1 border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 bg-white truncate"
          >
            <option value="Semua">Semua Jenis Pekerjaan</option>
            <option value="Peningkatan Jalan & Jembatan">Peningkatan Jalan &amp; Jembatan</option>
            <option value="Pembangunan Drainase Utama & Pengendalian Banjir">Drainase &amp; Banjir</option>
            <option value="Pembangunan Gedung & Fasilitas Kawasan">Gedung &amp; Fasilitas</option>
            <option value="Pematangan Lahan & Cut/Fill Kawasan BSW">Pematangan Lahan BSW</option>
            <option value="Pembangunan Dermaga & Ponton Pelabuhan">Dermaga Pelabuhan</option>
            <option value="Pemasangan PJU & Utilitas Terpadu">PJU &amp; Utilitas</option>
          </select>
        </div>

        {/* Wilayah / Koridor */}
        <div>
          <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            Wilayah / Sektor
          </label>
          <select
            value={filters.wilayah}
            onChange={(e) => onFilterChange({ wilayah: e.target.value })}
            className="w-full text-xs px-2 py-1 border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 bg-white truncate"
          >
            <option value="Semua">Semua Wilayah</option>
            <option value="Batam Centre">Batam Centre</option>
            <option value="Batu Ampar">Batu Ampar</option>
            <option value="Sekupang">Sekupang</option>
            <option value="Nongsa">Nongsa &amp; KEK</option>
            <option value="Mukakuning">Mukakuning</option>
            <option value="Rempang">Rempang &amp; Barelang</option>
          </select>
        </div>

        {/* Status Progres Kurva S */}
        <div>
          <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5 flex items-center gap-1">
            <Activity className="w-3 h-3 text-slate-400" />
            Status Kurva S
          </label>
          <select
            value={filters.statusProgres}
            onChange={(e) => onFilterChange({ statusProgres: e.target.value })}
            className="w-full text-xs px-2 py-1 border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 bg-white truncate"
          >
            <option value="Semua">Semua Status</option>
            <option value="Ahead">Ahead (&gt; +2%)</option>
            <option value="On Schedule">On Schedule</option>
            <option value="Waspada">Waspada (-2% s/d -10%)</option>
            <option value="Kritis (SCM)">Kritis SCM (&lt; -10%)</option>
            <option value="Selesai">Selesai (PHO)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
