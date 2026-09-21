import React from 'react';
import { Filter, Calendar, Layers, RefreshCw, Globe2, Building } from 'lucide-react';

export interface LlbFilterState {
  tahun: number | 'ALL';
  bulan: string;
  kategoriLayanan: 'ALL' | 'Pemasukan' | 'Pengeluaran' | 'Izin Usaha Kawasan' | 'Perdagangan';
  sektor: 'ALL' | 'Industri' | 'Perdagangan' | 'Kawasan';
  sifatData: 'ALL' | 'TERBUKA' | 'TERTUTUP' | 'TERBATAS';
}

interface LlbFiltersProps {
  filters: LlbFilterState;
  onFilterChange: (newFilters: Partial<LlbFilterState>) => void;
  onResetFilters: () => void;
}

export const LlbFilters: React.FC<LlbFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 mb-5 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Title & Filter Icon */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1F4E79] flex items-center justify-center shrink-0">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Filter Konteks Pelayanan &amp; Dataset Lalu Lintas Barang
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              Parameter Dimensi Tableau: [Tahun], [Bulan], [Kategori Layanan], [Sektor]
            </span>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Tahun */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 text-[11px] font-medium">Tahun:</span>
            <select
              value={filters.tahun}
              onChange={(e) =>
                onFilterChange({
                  tahun: e.target.value === 'ALL' ? 'ALL' : Number(e.target.value),
                })
              }
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer text-xs"
            >
              <option value="2026">2026 (Berjalan)</option>
              <option value="2025">2025</option>
              <option value="ALL">Semua Tahun</option>
            </select>
          </div>

          {/* Bulan */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Bulan:</span>
            <select
              value={filters.bulan}
              onChange={(e) => onFilterChange({ bulan: e.target.value })}
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer text-xs"
            >
              <option value="ALL">Semua Bulan (YTD)</option>
              <option value="April">April 2026</option>
              <option value="Maret">Maret 2026</option>
              <option value="Februari">Februari 2026</option>
              <option value="Januari">Januari 2026</option>
            </select>
          </div>

          {/* Sektor */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg text-xs">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 text-[11px] font-medium">Sektor:</span>
            <select
              value={filters.sektor}
              onChange={(e) =>
                onFilterChange({
                  sektor: e.target.value as LlbFilterState['sektor'],
                })
              }
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer text-xs"
            >
              <option value="ALL">Semua Sektor</option>
              <option value="Industri">Industri Manufaktur</option>
              <option value="Perdagangan">Perdagangan / Sembako</option>
              <option value="Kawasan">Kawasan Industri</option>
            </select>
          </div>

          {/* Kategori Layanan */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg text-xs">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 text-[11px] font-medium">Jenis Izin:</span>
            <select
              value={filters.kategoriLayanan}
              onChange={(e) =>
                onFilterChange({
                  kategoriLayanan: e.target.value as LlbFilterState['kategoriLayanan'],
                })
              }
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer text-xs"
            >
              <option value="ALL">Semua Jenis Layanan</option>
              <option value="Pemasukan">Izin Pemasukan</option>
              <option value="Pengeluaran">Izin Pengeluaran</option>
              <option value="Izin Usaha Kawasan">Izin Usaha Kawasan</option>
              <option value="Perdagangan">Izin Kuota / Dagang</option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors text-xs font-semibold cursor-pointer"
            title="Reset Filter"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
