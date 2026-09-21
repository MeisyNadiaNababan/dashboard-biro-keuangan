import React from 'react';
import { Filter, RotateCcw, Search, Building2, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { BokmrFilterState } from './types';

interface BokmrFiltersProps {
  filters: BokmrFilterState;
  onFilterChange: (newFilters: Partial<BokmrFilterState>) => void;
  onReset: () => void;
  activeCountInfo?: string;
}

export const BokmrFilters: React.FC<BokmrFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  activeCountInfo,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
      {/* HEADER FILTER */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-sky-100 text-sky-700 rounded-lg">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase">
              Filter Parameter Tata Kelola & Pengawasan BOKMR
            </h3>
            <p className="text-[11px] text-slate-500">
              Saring Indikator SAKIP, SPIP, Risiko, SKM Layanan, dan Rekomendasi BLU
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeCountInfo && (
            <span className="text-[11px] px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full font-semibold border border-sky-200">
              {activeCountInfo}
            </span>
          )}
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filter</span>
          </button>
        </div>
      </div>

      {/* FILTER CONTROLS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* 1. TAHUN ANGGARAN */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Tahun Evaluasi
          </label>
          <select
            value={filters.tahun}
            onChange={(e) => onFilterChange({ tahun: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          >
            <option value="2026">2026 (Tahun Berjalan)</option>
            <option value="2025">2025 (Evaluasi Akhir)</option>
            <option value="2024">2024 (Historis)</option>
            <option value="Semua">Semua Periode</option>
          </select>
        </div>

        {/* 2. KLASTER PENGAWASAN */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Pilar Tata Kelola
          </label>
          <select
            value={filters.klaster}
            onChange={(e) => onFilterChange({ klaster: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          >
            <option value="Semua">Semua Pilar Tata Kelola</option>
            <option value="SAKIP & Akuntabilitas">SAKIP & Akuntabilitas (DS #2)</option>
            <option value="Manajemen Risiko & SPIP">Manajemen Risiko & SPIP (DS #17, #18)</option>
            <option value="Pelayanan Publik & SKM">Pelayanan Publik & SKM (DS #10, #11, #15)</option>
            <option value="Pengawasan BLU & Modernisasi">Pengawasan BLU (DS #6, #7)</option>
          </select>
        </div>

        {/* 3. UNIT KERJA / BADAN USAHA */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Unit Kerja / Badan Usaha
          </label>
          <select
            value={filters.unitKerja}
            onChange={(e) => onFilterChange({ unitKerja: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          >
            <option value="Semua">Semua Unit Layanan</option>
            <option value="Badan Usaha Rumah Sakit BP Batam">BU Rumah Sakit (RSBP)</option>
            <option value="Badan Usaha Pelabuhan Batam">BU Pelabuhan Batam</option>
            <option value="Badan Usaha Bandar Udara Hang Nadim">BU Bandara Hang Nadim</option>
            <option value="Badan Usaha Fasilitas dan Lingkungan / SPAM">BU Fasling (SPAM Air)</option>
            <option value="Pelayanan Terpadu Satu Pintu (PTSP / MPP)">PTSP / MPP Batam</option>
            <option value="Direktorat Pelayanan Lalu Lintas Barang & Penanaman Modal">Dit. Lalu Lintas Barang</option>
          </select>
        </div>

        {/* 4. TINGKAT AKUNTABILITAS */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Predikat Kinerja / Mutu
          </label>
          <select
            value={filters.kategoriAkuntabilitas}
            onChange={(e) => onFilterChange({ kategoriAkuntabilitas: e.target.value })}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          >
            <option value="Semua">Semua Predikat</option>
            <option value="A (Memuaskan)">Predikat A (Memuaskan / Prima)</option>
            <option value="A- (Sangat Baik)">Predikat A- (Sangat Baik)</option>
            <option value="B (Baik)">Predikat B (Baik)</option>
          </select>
        </div>

        {/* 5. SEARCH PENCARIAN */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Cari Isu / Indikator
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari SAKIP, SPIP, RSBP..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
