import React from 'react';
import {
  Calendar,
  Filter,
  RefreshCw,
  Layers,
  CreditCard,
  Building2,
  Stethoscope,
  Info,
} from 'lucide-react';
import { RumahSakitFilterState } from '../../data/rumahSakitData';

interface RumahSakitFiltersProps {
  filters: RumahSakitFilterState;
  onFilterChange: (newFilters: Partial<RumahSakitFilterState>) => void;
  onResetFilters: () => void;
}

export const RumahSakitFilters: React.FC<RumahSakitFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3 font-sans">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        {/* Title & Metadata Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
                Filter Eksekutif RSBP Batam
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 font-semibold">
                Satu Data #1 - #18
              </span>
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              Parameter kendali kinerja operasional klinis, keuangan BLU, efisiensi ranjang, dan tenant komersial.
            </p>
          </div>
        </div>

        {/* Filters Controls Grid */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter 1: Tahun */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[11px] text-slate-500 font-medium">Tahun:</span>
            <select
              value={filters.tahun}
              onChange={(e) => onFilterChange({ tahun: Number(e.target.value) })}
              className="bg-transparent font-semibold text-slate-800 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value={2026}>2026 (Berjalan)</option>
              <option value={2025}>2025 (Audited)</option>
              <option value={2024}>2024 (Historis)</option>
            </select>
          </div>

          {/* Filter 2: Periode Bulan / Semester */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <span className="text-[11px] text-slate-500 font-medium">Periode:</span>
            <select
              value={filters.periodeBulan}
              onChange={(e) => onFilterChange({ periodeBulan: e.target.value })}
              className="bg-transparent font-semibold text-slate-800 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Bulan (YTD April)</option>
              <option value="Q1">Triwulan I (Jan - Mar)</option>
              <option value="APR">Bulan April 2026</option>
              <option value="MAR">Bulan Maret 2026</option>
              <option value="FEB">Bulan Februari 2026</option>
              <option value="JAN">Bulan Januari 2026</option>
            </select>
          </div>

          {/* Filter 3: Bagian Layanan (Dataset No. 5) */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[11px] text-slate-500 font-medium">Layanan:</span>
            <select
              value={filters.bagianLayanan}
              onChange={(e) => onFilterChange({ bagianLayanan: e.target.value })}
              className="bg-transparent font-semibold text-slate-800 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Bagian Layanan</option>
              <option value="rawat-jalan">Rawat Jalan (Poliklinik)</option>
              <option value="igd">IGD 24 Jam</option>
              <option value="rawat-inap">Rawat Inap (Bangsal & ICU)</option>
              <option value="hemodialisa">Hemodialisa</option>
              <option value="mcu">Medical Check Up (MCU)</option>
            </select>
          </div>

          {/* Filter 4: Cara Bayar (Dataset No. 5) */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[11px] text-slate-500 font-medium">Bayar:</span>
            <select
              value={filters.caraBayar}
              onChange={(e) => onFilterChange({ caraBayar: e.target.value })}
              className="bg-transparent font-semibold text-slate-800 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Cara Bayar</option>
              <option value="bpjs">BPJS Kesehatan (JKN-KIS)</option>
              <option value="asuransi">Asuransi Swasta & Perusahaan</option>
              <option value="umum">Umum / Mandiri</option>
            </select>
          </div>

          {/* Filter 5: Status Tenant Sewa (Dataset No. 14) */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[11px] text-slate-500 font-medium">Tenant:</span>
            <select
              value={filters.statusTenant}
              onChange={(e) => onFilterChange({ statusTenant: e.target.value })}
              className="bg-transparent font-semibold text-slate-800 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Status Sewa</option>
              <option value="aktif">Aktif Beroperasi</option>
              <option value="jatuh-tempo">Mendekati Jatuh Tempo</option>
              <option value="perpanjangan">Proses Perpanjangan</option>
            </select>
          </div>

          {/* Reset Filter Button */}
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
            title="Kembalikan filter ke nilai standar"
          >
            <RefreshCw className="w-3 h-3 text-slate-500" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
