import React, { useState } from 'react';
import {
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
  TableProperties,
  Filter,
  Check,
  Calendar,
  Server,
  Layers,
  Activity,
  RefreshCw,
  Download,
} from 'lucide-react';

export interface PdsiFiltersProps {
  selectedYear: string;
  onChangeYear: (val: string) => void;
  selectedMonth: string;
  onChangeMonth: (val: string) => void;
  selectedCycle: string;
  onChangeCycle: (val: string) => void;
  selectedDomain: string;
  onChangeDomain: (val: string) => void;
  selectedStatus: string;
  onChangeStatus: (val: string) => void;
  basis: 'ytd' | 'monthly';
  onChangeBasis: (val: 'ytd' | 'monthly') => void;
  onResetFilters: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenExportModal?: () => void;
}

export const PdsiFilters: React.FC<PdsiFiltersProps> = ({
  selectedYear,
  onChangeYear,
  selectedMonth,
  onChangeMonth,
  selectedCycle,
  onChangeCycle,
  selectedDomain,
  onChangeDomain,
  selectedStatus,
  onChangeStatus,
  basis,
  onChangeBasis,
  onResetFilters,
  onRefresh,
  isRefreshing,
  onOpenExportModal,
}) => {
  const [showFilterShelf, setShowFilterShelf] = useState(true);

  const yearOptions = [
    { value: '2026', label: '2026 (Tahun Berjalan / Operasional)' },
    { value: '2025', label: '2025 (Arsip Laporan SPBE)' },
    { value: '2024', label: '2024 (Arsip Laporan SPBE)' },
  ];

  const monthOptions = [
    { value: 'April', label: 'April (Cut-Off Berjalan)' },
    { value: 'Semua Bulan', label: 'Semua Bulan (YTD Kumulatif)' },
    { value: 'Januari', label: 'Januari' },
    { value: 'Februari', label: 'Februari' },
    { value: 'Maret', label: 'Maret' },
    { value: 'Mei', label: 'Mei' },
    { value: 'Juni', label: 'Juni' },
    { value: 'Juli', label: 'Juli' },
    { value: 'Agustus', label: 'Agustus' },
    { value: 'September', label: 'September' },
    { value: 'Oktober', label: 'Oktober' },
    { value: 'November', label: 'November' },
    { value: 'Desember', label: 'Desember' },
  ];

  // Domain-specific IT Cycles instead of financial quarters (Triwulan)
  const cycleOptions = [
    { value: 'ALL', label: 'Semua Siklus Pengukuran TI' },
    { value: 'Real-Time', label: 'Monitoring Real-Time (24/7 Uptime & SOC)' },
    { value: 'Bulanan', label: 'Evaluasi Bulanan (SLA Helpdesk & Bandwidth)' },
    { value: 'Semesteran', label: 'Audit Semesteran (Keamanan & ISO 27001)' },
    { value: 'Tahunan', label: 'Evaluasi Tahunan (Indeks SPBE & KAMI BSSN)' },
  ];

  const domainOptions = [
    { value: 'ALL', label: 'Semua Domain Layanan TI (Konsolidasi PDSI)' },
    { value: 'datacenter', label: 'Data Center Tier III & Infrastruktur Server' },
    { value: 'helpdesk', label: 'Layanan IT Helpdesk & Dukungan Pengguna' },
    { value: 'cyber', label: 'Keamanan Siber & CSIRT / SOC BP Batam' },
    { value: 'fiber', label: 'Jaringan Fiber Optik & Portofolio SPBE' },
  ];

  const statusOptions = [
    { value: 'ALL', label: 'Semua Status Operasional' },
    { value: 'normal', label: 'Memenuhi Target / Normal (SLA ≥ 95%)' },
    { value: 'warning', label: 'Perhatian / Mendekati Ambang Batas' },
    { value: 'incident', label: 'Insiden / Memerlukan Tindakan' },
  ];

  const activeFilterCount = [
    selectedYear !== '2026',
    selectedMonth !== 'April',
    selectedCycle !== 'ALL',
    selectedDomain !== 'ALL',
    selectedStatus !== 'ALL',
    basis !== 'ytd',
  ].filter(Boolean).length;

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-2xs font-sans select-none overflow-hidden">
      {/* Tableau Parameters Top Toolbar Bar */}
      <div className="px-3.5 py-2 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#1F4E79] flex items-center justify-center text-white text-[10px] font-bold shadow-2xs">
            <TableProperties className="w-3 h-3 text-sky-200" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            Tableau Parameters &amp; Filters — PDSI
          </span>
          <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
            Cut-Off: {selectedMonth} {selectedYear}
          </span>
          {activeFilterCount > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
              {activeFilterCount} Filter Aktif
            </span>
          )}
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* YTD / Monthly View Mode Toggle */}
          <div className="flex items-center bg-slate-200/80 p-0.5 rounded-md border border-slate-300 text-[11px]">
            <button
              onClick={() => onChangeBasis('ytd')}
              className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                basis === 'ytd'
                  ? 'bg-white text-[#0B2545] shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilkan Data Kumulatif Berjalan"
            >
              YTD Kumulatif
            </button>
            <button
              onClick={() => onChangeBasis('monthly')}
              className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                basis === 'monthly'
                  ? 'bg-white text-[#0B2545] shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilkan Data Periode Bulan Terpilih Saja"
            >
              Per Bulan
            </button>
          </div>

          {/* Reset Filters */}
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 hover:border-slate-400 rounded-md transition-all cursor-pointer shadow-2xs"
            title="Reset Seluruh Parameter ke Default"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Refresh Data */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:border-slate-400 rounded-md transition-all cursor-pointer shadow-2xs disabled:opacity-50"
            title="Muat Ulang Sumber Data Eksekutif"
          >
            <RefreshCw className={`w-3 h-3 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Export Modal Trigger */}
          {onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#1F4E79] hover:bg-[#123966] rounded-md transition-all cursor-pointer shadow-2xs"
              title="Ekspor Laporan Tableau"
            >
              <Download className="w-3 h-3" />
              <span>Export</span>
            </button>
          )}

          {/* Collapse/Expand Toggle */}
          <button
            onClick={() => setShowFilterShelf(!showFilterShelf)}
            className="p-1 rounded text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer ml-1"
            title={showFilterShelf ? 'Sembunyikan Panel Filter' : 'Tampilkan Panel Filter'}
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilterShelf ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tableau Filter Shelves Cards */}
      {showFilterShelf && (
        <div className="p-3 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Filter 1: Tahun Anggaran / Operasional */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#475569] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#1F4E79]" />
                Tahun
              </span>
              <span className="text-[10px] font-mono text-slate-400">Parameter</span>
            </div>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => onChangeYear(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#1F4E79] focus:bg-white appearance-none cursor-pointer pr-7"
              >
                {yearOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Filter 2: Bulan Cut-Off */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#475569] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#1F4E79]" />
                Bulan Cut-Off
              </span>
              <span className="text-[10px] font-mono text-slate-400">Periode</span>
            </div>
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => onChangeMonth(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#1F4E79] focus:bg-white appearance-none cursor-pointer pr-7"
              >
                {monthOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Filter 3: Siklus Pengukuran TI (Sesuai Karakteristik PDSI) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#475569] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#1F4E79]" />
                Siklus Pengukuran
              </span>
              <span className="text-[10px] font-mono text-slate-400">Dimensi</span>
            </div>
            <div className="relative">
              <select
                value={selectedCycle}
                onChange={(e) => onChangeCycle(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#1F4E79] focus:bg-white appearance-none cursor-pointer pr-7"
              >
                {cycleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Filter 4: Domain Layanan TI */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#475569] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Server className="w-3 h-3 text-[#1F4E79]" />
                Domain Layanan TI
              </span>
              <span className="text-[10px] font-mono text-slate-400">Kategori</span>
            </div>
            <div className="relative">
              <select
                value={selectedDomain}
                onChange={(e) => onChangeDomain(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#1F4E79] focus:bg-white appearance-none cursor-pointer pr-7"
              >
                {domainOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Filter 5: Status Operasional / Kepatuhan SLA */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#475569] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#1F4E79]" />
                Status Operasional
              </span>
              <span className="text-[10px] font-mono text-slate-400">Threshold</span>
            </div>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => onChangeStatus(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#1F4E79] focus:bg-white appearance-none cursor-pointer pr-7"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
