import React from 'react';
import { Search, RotateCcw, Filter, Calendar, MapPin, Layers } from 'lucide-react';
import { PesisirReklamasiFilterState } from './types';

interface PesisirReklamasiFiltersProps {
  filters: PesisirReklamasiFilterState;
  onFilterChange: (newFilters: Partial<PesisirReklamasiFilterState>) => void;
  onResetFilters: () => void;
}

export const PesisirReklamasiFilters: React.FC<PesisirReklamasiFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-900">
            Filter Parameter Pengelolaan Kawasan Pesisir &amp; Reklamasi:
          </span>
        </div>

        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mt-3 pt-3 border-t border-slate-100 text-xs">
        {/* Filter 1: Tahun Anggaran / Penerbitan */}
        <div>
          <label className="text-[10.5px] font-semibold text-slate-500 block mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Tahun Penerbitan</span>
          </label>
          <select
            value={filters.tahun}
            onChange={(e) => onFilterChange({ tahun: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-hidden"
          >
            <option value="ALL">Semua Tahun (2023 - 2026)</option>
            <option value="2026">Tahun 2026 (Berjalan)</option>
            <option value="2025">Tahun 2025</option>
            <option value="2024">Tahun 2024</option>
            <option value="2023">Tahun 2023</option>
          </select>
        </div>

        {/* Filter 2: Sub Wilayah Pengembangan (SWP) */}
        <div>
          <label className="text-[10.5px] font-semibold text-slate-500 block mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>Sub Wilayah (SWP)</span>
          </label>
          <select
            value={filters.swp}
            onChange={(e) => onFilterChange({ swp: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-hidden"
          >
            <option value="ALL">Semua Wilayah Pesisir Batam</option>
            <option value="Sekupang & Tg. Uncang">Sekupang &amp; Tg. Uncang</option>
            <option value="Rempang & Galang">Rempang &amp; Galang</option>
            <option value="Nongsa & Kabil">Nongsa &amp; Kabil</option>
            <option value="Batu Ampar & Bengkong">Batu Ampar &amp; Bengkong</option>
            <option value="Batam Kota">Batam Kota</option>
            <option value="Batu Aji & Sagulung">Batu Aji &amp; Sagulung</option>
          </select>
        </div>

        {/* Filter 3: Jenis Izin */}
        <div>
          <label className="text-[10.5px] font-semibold text-slate-500 block mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" />
            <span>Jenis Izin Wilayah</span>
          </label>
          <select
            value={filters.jenisIzin}
            onChange={(e) => onFilterChange({ jenisIzin: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-hidden"
          >
            <option value="ALL">Semua Jenis (Pesisir &amp; Reklamasi)</option>
            <option value="Izin Reklamasi">Izin Reklamasi</option>
            <option value="Izin Pemanfaatan Kawasan Pesisir">Izin Pemanfaatan Kawasan Pesisir</option>
            <option value="Izin Terpadu Pesisir & Reklamasi">Izin Terpadu Pesisir &amp; Reklamasi</option>
          </select>
        </div>

        {/* Filter 4: Status Penyelesaian / Kepatuhan */}
        <div>
          <label className="text-[10.5px] font-semibold text-slate-500 block mb-1">
            Status Layanan / Masalah
          </label>
          <select
            value={filters.statusPenyelesaian}
            onChange={(e) => onFilterChange({ statusPenyelesaian: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-hidden"
          >
            <option value="ALL">Semua Status</option>
            <option value="Tepat Waktu">Selesai Tepat Waktu (SLA)</option>
            <option value="Selesai">Masalah Selesai Ditangani</option>
            <option value="Proses">Dalam Proses Penanganan</option>
          </select>
        </div>

        {/* Filter 5: Search Query Nama Perusahaan / Objek */}
        <div>
          <label className="text-[10.5px] font-semibold text-slate-500 block mb-1">
            Cari Nama Perusahaan / Berkas
          </label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Contoh: Shipyard, Marina..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-hidden placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
