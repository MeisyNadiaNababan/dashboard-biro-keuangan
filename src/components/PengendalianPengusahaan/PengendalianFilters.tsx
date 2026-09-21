import React from 'react';
import { Filter, Search, RotateCcw, Building2, Briefcase, ShieldCheck, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { PengendalianFilterState } from './types';
import { SEKTOR_BADAN_USAHA_LIST } from './pengendalianData';

interface PengendalianFiltersProps {
  filters: PengendalianFilterState;
  onFilterChange: (newFilters: Partial<PengendalianFilterState>) => void;
  onResetFilters: () => void;
  totalFiltered: number;
  totalAll: number;
}

export const PengendalianFilters: React.FC<PengendalianFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFiltered,
  totalAll,
}) => {
  const isFiltered =
    filters.tahun !== 'Semua' ||
    filters.sektor !== 'Semua Sektor BU' ||
    filters.skemaKerjasama !== 'Semua' ||
    filters.statusKepatuhan !== 'Semua' ||
    filters.statusTindakLanjut !== 'Semua' ||
    filters.searchQuery.trim() !== '';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-xs mb-5">
      {/* Header Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200/60 flex items-center justify-center text-sky-700">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Filter Parameter Pengawasan &amp; Kemitraan Badan Usaha
            </h3>
            <p className="text-[11px] text-slate-500">
              Saring evaluasi perjanjian kerja sama, kepatuhan mitra, dan progres tindak lanjut
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-mono">
            Menampilkan: <strong className="text-slate-900">{totalFiltered}</strong> dari {totalAll} Kontrak Kemitraan
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/70 border border-rose-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer font-medium"
              title="Reset Semua Filter"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-3">
        {/* 1. Filter Tahun */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tahun Anggaran</label>
          <select
            value={filters.tahun}
            onChange={(e) => onFilterChange({ tahun: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-hidden transition-all"
          >
            <option value="Semua">Semua Tahun</option>
            <option value="2026">2026 (Tahun Berjalan)</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* 2. Filter Sektor / Badan Usaha */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Sektor Badan Usaha</label>
          <select
            value={filters.sektor}
            onChange={(e) => onFilterChange({ sektor: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-hidden transition-all"
          >
            {SEKTOR_BADAN_USAHA_LIST.map((sektor) => (
              <option key={sektor} value={sektor}>
                {sektor}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Filter Skema Kerjasama */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Skema Kemitraan</label>
          <select
            value={filters.skemaKerjasama}
            onChange={(e) => onFilterChange({ skemaKerjasama: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-hidden transition-all"
          >
            <option value="Semua">Semua Skema (KSO, BTO, Sewa, dll)</option>
            <option value="KSO">KSO (Kerjasama Operasi)</option>
            <option value="BTO / BOT">BTO / BOT (Bangun-Guna-Serah)</option>
            <option value="Sewa Aset">Sewa Aset Komersial</option>
            <option value="Konsesi">Konsesi Pengoperasian</option>
            <option value="Kontrak Manajemen">Kontrak Manajemen</option>
          </select>
        </div>

        {/* 4. Filter Status Kepatuhan (Dataset 1 & 3) */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Status Kepatuhan Mitra</label>
          <select
            value={filters.statusKepatuhan}
            onChange={(e) => onFilterChange({ statusKepatuhan: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-hidden transition-all"
          >
            <option value="Semua">Semua Kepatuhan</option>
            <option value="Sangat Patuh">Sangat Patuh (Skor ≥ 90%)</option>
            <option value="Patuh Bersyarat">Patuh Bersyarat (80 - 89%)</option>
            <option value="Pengawasan Khusus">Pengawasan Khusus (&lt; 80%)</option>
          </select>
        </div>

        {/* 5. Filter Tindak Lanjut Perbaikan (Dataset 4) */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Status Tindak Lanjut</label>
          <select
            value={filters.statusTindakLanjut}
            onChange={(e) => onFilterChange({ statusTindakLanjut: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-hidden transition-all"
          >
            <option value="Semua">Semua Tindak Lanjut</option>
            <option value="Selesai Ditindaklanjuti">Selesai Ditindaklanjuti</option>
            <option value="Dalam Proses Amandemen">Dalam Proses Amandemen</option>
            <option value="Menunggu Verifikasi Mitra">Menunggu Verifikasi Mitra</option>
            <option value="Keterlambatan Komitmen">Keterlambatan Komitmen</option>
          </select>
        </div>
      </div>

      {/* Quick Search Row */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama mitra, nomor PKS, atau nama proyek kerjasama (cth: Hang Nadim, SPAM Moya, Batu Ampar, Kabil)..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full text-xs bg-slate-50 pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-hidden transition-all placeholder:text-slate-400"
          />
        </div>
      </div>
    </div>
  );
};
