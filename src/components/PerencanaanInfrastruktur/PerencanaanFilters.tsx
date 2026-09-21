import React from 'react';
import { Filter, Search, RotateCcw, Calendar, Layers, CheckCircle2, MapPin, Compass } from 'lucide-react';
import { PerencanaanFilterState } from './types';

interface PerencanaanFiltersProps {
  filters: PerencanaanFilterState;
  onFilterChange: (newFilters: Partial<PerencanaanFilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
  totalOriginalCount: number;
}

export const PerencanaanFilters: React.FC<PerencanaanFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
  totalOriginalCount,
}) => {
  const isFiltered =
    filters.tahun !== 'Semua' ||
    filters.sektor !== 'Semua' ||
    filters.statusKesiapan !== 'Semua' ||
    filters.statusUtilisasi !== 'Semua' ||
    filters.wilayah !== 'Semua' ||
    filters.searchQuery.trim() !== '';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
              Filter Parameter Perencanaan Infrastruktur
            </h4>
            <p className="text-[11px] text-slate-500">
              Menampilkan <span className="font-semibold text-slate-800">{totalFilteredCount}</span> dari{' '}
              <span className="font-semibold text-slate-800">{totalOriginalCount}</span> paket DED &amp; kajian teknis
            </p>
          </div>
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 rounded-md border border-rose-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>

      {/* Filter Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
        {/* Filter 1: Tahun Anggaran */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Tahun Anggaran</span>
          </label>
          <select
            value={filters.tahun}
            onChange={(e) => onFilterChange({ tahun: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
          >
            <option value="Semua">Semua Tahun Anggaran</option>
            <option value="2025">TA 2025 (Tahun Berjalan)</option>
            <option value="2024">TA 2024 (Lanjutan/Carry Over)</option>
            <option value="2026">TA 2026 (Prospektif Renja)</option>
          </select>
        </div>

        {/* Filter 2: Sektor Infrastruktur (6 Sektor User Request) */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Sektor (6 Dataset)</span>
          </label>
          <select
            value={filters.sektor}
            onChange={(e) => onFilterChange({ sektor: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
          >
            <option value="Semua">Semua Sektor (Dataset 1-6)</option>
            <option value="Gedung">Dataset 1: Gedung</option>
            <option value="Utilitas dan Drainase">Dataset 2: Utilitas &amp; Drainase</option>
            <option value="Fasilitas Wisata dan Lingkungan">Dataset 3: Fasilitas Wisata &amp; LH</option>
            <option value="Pertanaman dan Penghijauan">Dataset 4: Pertanaman &amp; RTH</option>
            <option value="Darat">Dataset 5: Darat (Jalan/Jembatan)</option>
            <option value="Laut dan Udara">Dataset 6: Laut &amp; Udara</option>
          </select>
        </div>

        {/* Filter 3: Status Kesiapan Dokumen DED */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Kesiapan DED</span>
          </label>
          <select
            value={filters.statusKesiapan}
            onChange={(e) => onFilterChange({ statusKesiapan: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
          >
            <option value="Semua">Semua Tahap Kesiapan</option>
            <option value="Selesai (Siap Lelang Fisik)">Selesai (Siap Lelang Fisik)</option>
            <option value="Review & Asistensi Teknis">Review &amp; Asistensi Teknis</option>
            <option value="Penyusunan DED & RAB">Penyusunan DED &amp; RAB</option>
            <option value="Studi Kelayakan / FS">Studi Kelayakan / FS</option>
          </select>
        </div>

        {/* Filter 4: Status Utilisasi Pelaksanaan Fisik */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            <span>Utilisasi Hasil DED</span>
          </label>
          <select
            value={filters.statusUtilisasi}
            onChange={(e) => onFilterChange({ statusUtilisasi: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
          >
            <option value="Semua">Semua Status Utilisasi</option>
            <option value="Telah Masuk Lelang Fisik TA 2025">Telah Masuk Lelang Fisik TA 2025</option>
            <option value="Dianggarkan Renja TA 2026">Dianggarkan Renja TA 2026</option>
            <option value="Tahap Review Kelayakan Lahan">Tahap Review Lahan / Amdal</option>
            <option value="Antrean Alokasi Anggaran">Antrean Alokasi Anggaran</option>
          </select>
        </div>

        {/* Filter 5: Wilayah / Kawasan */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Kawasan / Lokasi</span>
          </label>
          <select
            value={filters.wilayah}
            onChange={(e) => onFilterChange({ wilayah: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
          >
            <option value="Semua">Semua Kawasan</option>
            <option value="Batam Centre">Batam Centre</option>
            <option value="Batu Ampar & Bengkong">Batu Ampar &amp; Bengkong</option>
            <option value="Sekupang">Sekupang</option>
            <option value="Nongsa & KEK">Nongsa &amp; KEK</option>
            <option value="Kabil">Kabil</option>
            <option value="Barelang & Rempang">Barelang &amp; Rempang</option>
            <option value="Sagulung & Batu Aji">Sagulung &amp; Batu Aji</option>
          </select>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Cari nama paket perencanaan, konsultan arsitek/engineering, atau nomor registrasi..."
            className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
