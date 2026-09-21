import React from 'react';
import {
  Filter,
  Calendar,
  Anchor,
  Ship,
  Globe2,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown,
} from 'lucide-react';

export interface PelabuhanFilterState {
  tahun: number;
  bulan: string;
  pelabuhan: string;
  jenisPelayaran: string; // 'ALL' | 'Domestik' | 'Internasional'
  kategoriOperasional: string; // 'ALL' | 'barang' | 'penumpang' | 'logistik'
}

interface PelabuhanFiltersProps {
  filters: PelabuhanFilterState;
  onFilterChange: (newFilters: Partial<PelabuhanFilterState>) => void;
  onResetFilters: () => void;
}

export const PelabuhanFilters: React.FC<PelabuhanFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const isFiltered =
    filters.tahun !== 2026 ||
    filters.bulan !== 'ALL' ||
    filters.pelabuhan !== 'ALL' ||
    filters.jenisPelayaran !== 'ALL' ||
    filters.kategoriOperasional !== 'ALL';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1F4E79]">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Filter Eksekutif Kepelabuhanan Batam</span>
              <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-[#1F4E79] font-mono text-[9.5px]">
                Satu Data BP Batam
              </span>
            </h4>
            <p className="text-[10.5px] text-slate-500">
              Konfigurasi dimensi data pelabuhan, terminal ferry, dermaga, dan pergerakan kapal/penumpang
            </p>
          </div>
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {/* 1. Tahun */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar className="w-2.5 h-2.5 text-slate-400" />
            <span>Tahun Anggaran</span>
          </label>
          <div className="relative">
            <select
              value={filters.tahun}
              onChange={(e) => onFilterChange({ tahun: Number(e.target.value) })}
              className="w-full text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 appearance-none focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value={2026}>2026 (Tahun Berjalan)</option>
              <option value={2025}>2025 (Audited BPK)</option>
              <option value={2024}>2024 (Historis)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 2. Bulan Cut-off */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar className="w-2.5 h-2.5 text-slate-400" />
            <span>Periode Bulan</span>
          </label>
          <div className="relative">
            <select
              value={filters.bulan}
              onChange={(e) => onFilterChange({ bulan: e.target.value })}
              className="w-full text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 appearance-none focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ALL">Semua Bulan (YTD s/d Apr)</option>
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April (Cut-Off Terakhir)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. Pelabuhan / Satker Terminal */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Anchor className="w-2.5 h-2.5 text-slate-400" />
            <span>Gugus Pelabuhan / Satker</span>
          </label>
          <div className="relative">
            <select
              value={filters.pelabuhan}
              onChange={(e) => onFilterChange({ pelabuhan: e.target.value })}
              className="w-full text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 appearance-none focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ALL">Seluruh Pelabuhan BP Batam (6 Gugus)</option>
              <option value="Batu Ampar">Pelabuhan Batu Ampar (Kargo/Peti Kemas)</option>
              <option value="Kabil">Pelabuhan Kabil (Curah Cair/Baja)</option>
              <option value="Batam Centre">Terminal Batam Centre (Feri Int.)</option>
              <option value="Sekupang">Pelabuhan Sekupang (Domestik/Feri)</option>
              <option value="Telaga Punggur">Pelabuhan Telaga Punggur (Roro/Feri)</option>
              <option value="Harbour Bay">Terminal Harbour Bay & Nongsa</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 4. Trayek / Jenis Pelayaran */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Globe2 className="w-2.5 h-2.5 text-slate-400" />
            <span>Trayek / Pelayaran</span>
          </label>
          <div className="relative">
            <select
              value={filters.jenisPelayaran}
              onChange={(e) => onFilterChange({ jenisPelayaran: e.target.value })}
              className="w-full text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 appearance-none focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ALL">Semua Trayek (Domestik &amp; Internasional)</option>
              <option value="Domestik">Domestik (Antar Pulau &amp; Provinsi)</option>
              <option value="Internasional">Internasional (Singapura &amp; Malaysia)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 5. Kategori Operasional */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Ship className="w-2.5 h-2.5 text-slate-400" />
            <span>Kategori Operasional</span>
          </label>
          <div className="relative">
            <select
              value={filters.kategoriOperasional}
              onChange={(e) => onFilterChange({ kategoriOperasional: e.target.value })}
              className="w-full text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 appearance-none focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ALL">Semua Layanan Operasional</option>
              <option value="barang">Kapal Barang &amp; Logistik Maritim</option>
              <option value="penumpang">Kapal &amp; Penumpang Terminal Feri</option>
              <option value="dermaga">Utilisasi Dermaga &amp; Alur Pelayaran</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
