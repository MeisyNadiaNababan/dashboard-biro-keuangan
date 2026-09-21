import React from 'react';
import { Filter, RotateCcw, Search, Calendar, MapPin, Layers, AlertTriangle } from 'lucide-react';
import { PengendalianFilterState } from './types';

interface PengendalianLahanFiltersProps {
  filters: PengendalianFilterState;
  onFilterChange: (filters: Partial<PengendalianFilterState>) => void;
  onResetFilters: () => void;
}

export const PengendalianLahanFilters: React.FC<PengendalianLahanFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const activeFilterCount =
    (filters.tahun !== 'ALL' ? 1 : 0) +
    (filters.swp !== 'ALL' ? 1 : 0) +
    (filters.objekPengawasan !== 'ALL' ? 1 : 0) +
    (filters.tahapPenindakan !== 'ALL' ? 1 : 0) +
    (filters.searchQuery.trim() !== '' ? 1 : 0);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Filter Pengawasan &amp; Pengendalian Lahan, Pesisir &amp; Reklamasi</span>
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                  {activeFilterCount} Aktif
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-500">
              Sesuaikan dimensi tahun, zona spasial SWP, objek pengawasan, dan status penertiban
            </p>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
        {/* Filter 1: Tahun */}
        <div>
          <label className="text-[10.5px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Tahun Anggaran</span>
          </label>
          <select
            value={filters.tahun}
            onChange={(e) => onFilterChange({ tahun: e.target.value })}
            className="w-full h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-2xs"
          >
            <option value="ALL">Semua Tahun (Multi-Years)</option>
            <option value="2026">TA 2026 (Tahun Berjalan)</option>
            <option value="2025">TA 2025</option>
            <option value="2024">TA 2024</option>
          </select>
        </div>

        {/* Filter 2: SWP (Sub Wilayah Pengembangan) */}
        <div>
          <label className="text-[10.5px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>Sub Wilayah (SWP)</span>
          </label>
          <select
            value={filters.swp}
            onChange={(e) => onFilterChange({ swp: e.target.value })}
            className="w-full h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-2xs"
          >
            <option value="ALL">Semua Wilayah (Kota Batam)</option>
            <option value="Batam Kota">SWP I Batam Kota</option>
            <option value="Nongsa & Kabil">SWP II Nongsa &amp; Kabil</option>
            <option value="Batu Aji & Sagulung">SWP III Batu Aji &amp; Sagulung</option>
            <option value="Sekupang & Tg. Uncang">SWP IV Sekupang &amp; Tg. Uncang</option>
            <option value="Rempang & Galang">SWP V Rempang &amp; Galang</option>
          </select>
        </div>

        {/* Filter 3: Objek Pengawasan */}
        <div>
          <label className="text-[10.5px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" />
            <span>Objek Pengawasan</span>
          </label>
          <select
            value={filters.objekPengawasan}
            onChange={(e) => onFilterChange({ objekPengawasan: e.target.value })}
            className="w-full h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-2xs"
          >
            <option value="ALL">Semua Objek (Lahan, Pesisir, Reklamasi)</option>
            <option value="Lahan Darat">Lahan Daratan (Industri/Komersial)</option>
            <option value="Wilayah Pesisir">Wilayah Pesisir (Sempadan/Mangrove)</option>
            <option value="Area Reklamasi">Area Reklamasi (Maritim/Jetty)</option>
          </select>
        </div>

        {/* Filter 4: Tahap Penindakan */}
        <div>
          <label className="text-[10.5px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-slate-400" />
            <span>Tahap Penindakan</span>
          </label>
          <select
            value={filters.tahapPenindakan}
            onChange={(e) => onFilterChange({ tahapPenindakan: e.target.value })}
            className="w-full h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-2xs"
          >
            <option value="ALL">Semua Status Tindakan</option>
            <option value="Rutin Terkendali">Rutin Terkendali</option>
            <option value="SP-1">Surat Peringatan 1 (SP-1)</option>
            <option value="SP-2">Surat Peringatan 2 (SP-2)</option>
            <option value="SP-3">Surat Peringatan 3 (SP-3)</option>
            <option value="Pembatalan SK">Pembatalan SK (Lahan Diselamatkan)</option>
            <option value="Pemulihan Komitmen">Pemulihan Komitmen Investasi</option>
          </select>
        </div>

        {/* Filter 5: Pencarian Cepat */}
        <div>
          <label className="text-[10.5px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Search className="w-3 h-3 text-slate-400" />
            <span>Pencarian Kata Kunci</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari alokasi, perusahaan..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full h-8 pl-8 pr-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
