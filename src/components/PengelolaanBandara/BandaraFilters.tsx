import React from 'react';
import { Filter, RotateCcw, Search, Plane, Compass, Building, DollarSign } from 'lucide-react';
import { BandaraFilterState } from './types';

interface BandaraFiltersProps {
  filters: BandaraFilterState;
  onFilterChange: (newFilters: Partial<BandaraFilterState>) => void;
  onReset: () => void;
  totalFilteredCount: number;
}

export const BandaraFilters: React.FC<BandaraFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalFilteredCount,
}) => {
  const isFiltered =
    filters.tahun !== '2026' ||
    filters.jenisPenerbangan !== 'Semua' ||
    filters.arahPergerakan !== 'Semua' ||
    filters.kategoriOperator !== 'Semua' ||
    filters.jenisPnbp !== 'Semua' ||
    filters.searchQuery.trim() !== '';

  return (
    <div id="bandara-filter-panel" className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-sky-50 text-sky-700 rounded-lg border border-sky-100">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Filter Parameter Operasional Bandara Hang Nadim</h3>
            <p className="text-xs text-slate-500">Satu Data Hal 11-12 & Daftar Operator Penerbangan (Dataset #1, #2, #10)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-medium">
            Tersaring: <span className="text-sky-700 font-bold">{totalFilteredCount}</span> Data Maskapai/Rute
          </span>
          {isFiltered && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs px-2.5 py-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors font-medium"
              title="Reset semua filter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filter
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Filter 1: Tahun Operasional */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Tahun Anggaran
          </label>
          <select
            value={filters.tahun}
            onChange={(e) => onFilterChange({ tahun: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
          >
            <option value="2026">2026 (Tahun Berjalan)</option>
            <option value="2025">2025 (Audited)</option>
            <option value="2024">2024</option>
            <option value="Semua">Semua Periode</option>
          </select>
        </div>

        {/* Filter 2: Jenis Penerbangan */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Jenis Penerbangan
          </label>
          <select
            value={filters.jenisPenerbangan}
            onChange={(e) => onFilterChange({ jenisPenerbangan: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
          >
            <option value="Semua">Semua (Domestik + Intl)</option>
            <option value="Domestik">Domestik (Antar Pulau)</option>
            <option value="Internasional">Internasional (KUL/SIN/Haji)</option>
          </select>
        </div>

        {/* Filter 3: Arah Pergerakan (A/D/Transit) */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Arah Arus Lalu Lintas
          </label>
          <select
            value={filters.arahPergerakan}
            onChange={(e) => onFilterChange({ arahPergerakan: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
          >
            <option value="Semua">Semua Arah (A + D + T)</option>
            <option value="Arrival">Kedatangan (Arrival)</option>
            <option value="Departure">Keberangkatan (Departure)</option>
            <option value="Transit">Penumpang Transit</option>
          </select>
        </div>

        {/* Filter 4: Kelompok Maskapai / Operator */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Operator / Maskapai
          </label>
          <select
            value={filters.kategoriOperator}
            onChange={(e) => onFilterChange({ kategoriOperator: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
          >
            <option value="Semua">Semua Operator (149 SIUP)</option>
            <option value="Lion Group">Lion Air Group (JT, ID, IU, IW)</option>
            <option value="Garuda Group">Garuda Indonesia Group (GA, QG)</option>
            <option value="AirAsia">AirAsia Group (AK, QZ)</option>
            <option value="Perintis/Lainnya">Perintis (Susi Air, Pelita)</option>
            <option value="Kargo">Kargo Udara Khusus</option>
          </select>
        </div>

        {/* Filter 5: Sektor PNBP Bandara */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Sektor PNBP (DS #1)
          </label>
          <select
            value={filters.jenisPnbp}
            onChange={(e) => onFilterChange({ jenisPnbp: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
          >
            <option value="Semua">Semua Sektor PNBP</option>
            <option value="PJP2U">PJP2U (PSC Penumpang)</option>
            <option value="PJP4U">PJP4U (Landing & Parking)</option>
            <option value="Kargo">Kargo & Pos (EMPU)</option>
            <option value="Konsesi Aset">Garbarata & Konsesi Lahan</option>
          </select>
        </div>

        {/* Filter 6: Quick Search */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Pencarian Cepat
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Maskapai / Rute / Kode..."
              className="w-full text-xs bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-8 pr-2.5 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400 font-medium"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
