import React from 'react';
import {
  Filter,
  RotateCcw,
  Calendar,
  Layers,
  Globe2,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

export interface InvestasiFilterState {
  tahun: number | 'ALL';
  triwulan: number | 'ALL';
  jenisInvestasi: 'ALL' | 'PMA' | 'PMDN';
  sektor: string;
}

interface InvestasiFiltersProps {
  filters: InvestasiFilterState;
  onFilterChange: (newFilters: InvestasiFilterState) => void;
  onReset: () => void;
  totalFilteredRecords: number;
}

export const InvestasiFilters: React.FC<InvestasiFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalFilteredRecords,
}) => {
  const isFiltered =
    filters.tahun !== 'ALL' ||
    filters.triwulan !== 'ALL' ||
    filters.jenisInvestasi !== 'ALL' ||
    filters.sektor !== 'ALL';

  return (
    <div
      id="investasi-filters-bar"
      className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-4 shadow-2xs space-y-3 font-sans"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Filter Data Direktorat Investasi
            </h3>
            <p className="text-[11px] text-slate-500">
              Sesuaikan periode tahun, triwulan, jenis modal (PMA/PMDN), dan klaster sektor investasi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {totalFilteredRecords} Data Terkait
          </span>
          {isFiltered && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-md transition-colors cursor-pointer"
              title="Reset semua filter ke default"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 text-xs">
        {/* 1. Filter Tahun */}
        <div>
          <label className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Tahun Realisasi</span>
          </label>
          <select
            value={filters.tahun}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                tahun: e.target.value === 'ALL' ? 'ALL' : Number(e.target.value),
              })
            }
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">Semua Tahun</option>
            <option value="2025">Tahun 2025 (Berjalan)</option>
            <option value="2024">Tahun 2024 (Historis)</option>
            <option value="2026">Tahun 2026 (Proyeksi)</option>
          </select>
        </div>

        {/* 2. Filter Triwulan */}
        <div>
          <label className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" />
            <span>Triwulan (Kuartal)</span>
          </label>
          <select
            value={filters.triwulan}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                triwulan: e.target.value === 'ALL' ? 'ALL' : Number(e.target.value),
              })
            }
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">Semua Triwulan (Q1 - Q4)</option>
            <option value="4">Triwulan 4 (Q4)</option>
            <option value="3">Triwulan 3 (Q3)</option>
            <option value="2">Triwulan 2 (Q2)</option>
            <option value="1">Triwulan 1 (Q1)</option>
          </select>
        </div>

        {/* 3. Filter Jenis Investasi (PMA / PMDN) */}
        <div>
          <label className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Globe2 className="w-3 h-3 text-slate-400" />
            <span>Jenis Investasi</span>
          </label>
          <select
            value={filters.jenisInvestasi}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                jenisInvestasi: e.target.value as 'ALL' | 'PMA' | 'PMDN',
              })
            }
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">Semua Jenis (PMA &amp; PMDN)</option>
            <option value="PMA">PMA (Penanaman Modal Asing)</option>
            <option value="PMDN">PMDN (Penanaman Modal Dalam Negeri)</option>
          </select>
        </div>

        {/* 4. Filter Sektor Prioritas */}
        <div>
          <label className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-slate-400" />
            <span>Klaster Sektor</span>
          </label>
          <select
            value={filters.sektor}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                sektor: e.target.value,
              })
            }
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-500 cursor-pointer truncate"
          >
            <option value="ALL">Semua Klaster Sektor</option>
            <option value="Pusat Data & Infrastruktur Digital">Pusat Data &amp; Digital</option>
            <option value="Industri Elektronik & Semikonduktor">Elektronik &amp; Semikonduktor</option>
            <option value="Galangan Kapal & Maritim Offshore">Galangan Kapal &amp; Maritim</option>
            <option value="Industri Energi Terbarukan & PLTS">Energi Terbarukan / Solar</option>
            <option value="Kesehatan & Pariwisata Medis">Kesehatan &amp; Pariwisata</option>
            <option value="Aviasi MRO & Komponen Pesawat">Aviasi MRO</option>
            <option value="Logistik, Pergudangan & Cold Storage">Logistik &amp; Pergudangan</option>
          </select>
        </div>
      </div>
    </div>
  );
};
