import React from 'react';
import {
  Calendar,
  Filter,
  RotateCcw,
  RefreshCw,
  Download,
  Building2,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';

interface PtspFiltersProps {
  selectedYear: string;
  onChangeYear: (year: string) => void;
  selectedMonth: string;
  onChangeMonth: (month: string) => void;
  selectedSector: string;
  onChangeSector: (sector: string) => void;
  selectedRisk: string;
  onChangeRisk: (risk: string) => void;
  selectedStatus: string;
  onChangeStatus: (status: string) => void;
  basis: 'ytd' | 'monthly';
  onChangeBasis: (basis: 'ytd' | 'monthly') => void;
  onResetFilters: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenExportModal?: () => void;
}

export const PtspFilters: React.FC<PtspFiltersProps> = ({
  selectedYear,
  onChangeYear,
  selectedMonth,
  onChangeMonth,
  selectedSector,
  onChangeSector,
  selectedRisk,
  onChangeRisk,
  selectedStatus,
  onChangeStatus,
  basis,
  onChangeBasis,
  onResetFilters,
  onRefresh,
  isRefreshing,
  onOpenExportModal,
}) => {
  return (
    <div
      id="ptsp-tableau-parameters-shelf"
      aria-label="Tableau Parameters & Context Filters Shelf PTSP"
      className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 space-y-3"
    >
      {/* Top Row: Context Title & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#002B49] text-white flex items-center justify-center shadow-xs">
            <SlidersHorizontal className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-slate-900 tracking-tight">
                Tableau Parameters &amp; Context Filters Shelf
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
                Unit PTSP BP Batam
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Filter dinamis dimensi perizinan, survei IKM Permenpan RB, dan SLA operasional
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Basis Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => onChangeBasis('ytd')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                basis === 'ytd'
                  ? 'bg-white text-[#002B49] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kumulatif (YTD)
            </button>
            <button
              onClick={() => onChangeBasis('monthly')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                basis === 'monthly'
                  ? 'bg-white text-[#002B49] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Per Bulan
            </button>
          </div>

          {/* Reset Filters */}
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer transition-all"
            title="Reset ke Nilai Default"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Refresh Extract */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer transition-all disabled:opacity-50"
            title="Perbarui Data Extract"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Export Extract */}
          {onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-[#002B49] text-white hover:bg-[#003B66] rounded-lg font-semibold cursor-pointer transition-all shadow-xs"
              title="Ekspor Laporan & Kamus KPI"
            >
              <Download className="w-3.5 h-3.5 text-sky-300" />
              <span>Ekspor</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Tableau Dimension Filter Selects */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {/* Filter 1: Tahun Anggaran */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Tahun Anggaran
          </label>
          <select
            value={selectedYear}
            onChange={(e) => onChangeYear(e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="2026">TA 2026 (Berjalan)</option>
            <option value="2025">TA 2025 (Audit)</option>
            <option value="2024">TA 2024 (Historis)</option>
          </select>
        </div>

        {/* Filter 2: Bulan Cut-off */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Bulan Cut-Off
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => onChangeMonth(e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="Januari">Januari</option>
            <option value="Februari">Februari</option>
            <option value="Maret">Maret</option>
            <option value="April">April (Aktif)</option>
            <option value="Mei">Mei</option>
            <option value="Juni">Juni</option>
            <option value="Juli">Juli</option>
            <option value="Agustus">Agustus</option>
            <option value="September">September</option>
            <option value="Oktober">Oktober</option>
            <option value="November">November</option>
            <option value="Desember">Desember</option>
          </select>
        </div>

        {/* Filter 3: Sektor Usaha */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Kluster Sektor Usaha
          </label>
          <select
            value={selectedSector}
            onChange={(e) => onChangeSector(e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="ALL">Semua Sektor (Konsolidasi)</option>
            <option value="manufaktur">Industri Manufaktur</option>
            <option value="maritim">Maritim &amp; Galangan Kapal</option>
            <option value="logistik">Logistik &amp; Pergudangan</option>
            <option value="ti_kek">Teknologi Informasi &amp; KEK</option>
            <option value="ebt">Energi Terbarukan (EBT)</option>
          </select>
        </div>

        {/* Filter 4: Tingkat Risiko KBLI */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Tingkat Risiko OSS
          </label>
          <select
            value={selectedRisk}
            onChange={(e) => onChangeRisk(e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="ALL">Semua Tingkat Risiko</option>
            <option value="rendah">Risiko Rendah (Terbit Otomatis)</option>
            <option value="menengah_rendah">Menengah Rendah</option>
            <option value="menengah_tinggi">Menengah Tinggi</option>
            <option value="tinggi">Risiko Tinggi (Verifikasi Penuh)</option>
          </select>
        </div>

        {/* Filter 5: Status Izin / Permohonan */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Status Permohonan
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onChangeStatus(e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="ALL">Semua Status Permohonan</option>
            <option value="terbit">Izin Selesai / Terbit</option>
            <option value="proses">Dalam Proses Verifikasi</option>
            <option value="overdue">Overdue / Melewati SLA</option>
            <option value="revisi">Menunggu Perbaikan Dokumen</option>
          </select>
        </div>
      </div>
    </div>
  );
};
