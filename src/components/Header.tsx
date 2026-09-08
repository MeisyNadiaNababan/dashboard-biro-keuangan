import React, { useState } from 'react';
import {
  RefreshCw,
  Download,
  Maximize2,
  Minimize2,
  RotateCcw,
  Pause,
  Play,
  Share2,
  FileSpreadsheet,
  CheckCircle2,
  ChevronDown,
  FileCode2,
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  Receipt,
  Building2,
  Scale
} from 'lucide-react';

interface HeaderProps {
  onOpenExportModal?: () => void;
  onOpenTableauGuide?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  activeSheet: string;
  onSelectSheet: (sheetId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenExportModal,
  onOpenTableauGuide,
  onRefresh,
  isRefreshing = false,
  activeSheet,
  onSelectSheet,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const sheets = [
    { id: 'overview', label: 'Ringkasan Eksekutif (Dashboard)', icon: LayoutDashboard },
    { id: 'pendapatan', label: 'Kinerja Pendapatan', icon: TrendingUp },
    { id: 'belanja', label: 'Serapan Belanja', icon: CreditCard },
    { id: 'piutang', label: 'Aging & Piutang', icon: Receipt },
    { id: 'kas_bank', label: 'Arus Kas & Bank', icon: Building2 },
    { id: 'fiskal', label: 'Surplus/Defisit & Fiskal', icon: Scale },
  ];

  return (
    <header className="shrink-0 z-30 font-sans select-none shadow-xs">
      {/* 1. TABLEAU SERVER / CLOUD TOP BLUE BANNER */}
      <div className="bg-[#1F3864] text-white border-b border-[#16294a] px-4 py-2 flex items-center justify-between gap-4">
        {/* Left: Tableau Logo + Breadcrumb Path */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Authentic Tableau Multi-Color Plus Cross Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <rect x="10.5" y="1" width="3" height="5" fill="#E8762D" rx="0.5" />
              <rect x="10.5" y="18" width="3" height="5" fill="#E8762D" rx="0.5" />
              <rect x="1" y="10.5" width="5" height="3" fill="#E8762D" rx="0.5" />
              <rect x="18" y="10.5" width="5" height="3" fill="#E8762D" rx="0.5" />
              <rect x="5.5" y="5.5" width="2.5" height="2.5" fill="#2E75B6" rx="0.3" />
              <rect x="16" y="5.5" width="2.5" height="2.5" fill="#2E75B6" rx="0.3" />
              <rect x="5.5" y="16" width="2.5" height="2.5" fill="#2E75B6" rx="0.3" />
              <rect x="16" y="16" width="2.5" height="2.5" fill="#2E75B6" rx="0.3" />
              <rect x="9.5" y="7" width="5" height="10" fill="#E15759" rx="0.5" />
              <rect x="7" y="9.5" width="10" height="5" fill="#E15759" rx="0.5" />
            </svg>
            <span className="font-bold text-xs tracking-wider text-slate-100 uppercase hidden sm:inline">
              Tableau Server
            </span>
          </div>

          <span className="text-slate-400 text-xs hidden sm:inline">|</span>

          {/* Breadcrumb Hierarchy */}
          <div className="flex items-center gap-1.5 text-xs text-slate-200 truncate">
            <span className="text-slate-300 font-medium">Biro Keuangan BP Batam</span>
            <span className="text-slate-400">/</span>
            <span className="font-bold text-white truncate">
              Dashboard Eksekutif Kinerja Anggaran 2026
            </span>
          </div>
        </div>

        {/* Right: Tableau Quick Status */}
        <div className="flex items-center gap-3 shrink-0 text-xs">
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-300 bg-[#16294a] px-2.5 py-1 border border-slate-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Data SIMKEU</span>
          </div>

          {/* Panduan Rumus Tableau */}
          <button
            onClick={onOpenTableauGuide}
            className="flex items-center gap-1.5 text-xs bg-[#002B49] hover:bg-[#003860] text-white px-3 py-1.5 rounded-lg border border-sky-400/30 font-semibold cursor-pointer transition-all shadow-2xs"
          >
            <FileCode2 className="w-3.5 h-3.5 text-sky-300" />
            <span className="hidden sm:inline">Calculated Fields &amp; Guide</span>
          </button>
        </div>
      </div>

      {/* 2. TABLEAU WEB PLAYER TOOLBAR */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-1.5 flex items-center justify-between gap-3 text-xs text-slate-700">
        <div className="flex items-center gap-1 overflow-x-auto">
          {/* Revert Button */}
          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-3 py-1 hover:bg-slate-200/80 text-slate-700 border border-transparent hover:border-slate-300 rounded-lg cursor-pointer text-xs font-semibold transition-all shadow-2xs"
            title="Kembalikan Tampilan Awal (Revert)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">Revert</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1 hover:bg-slate-200/80 text-slate-700 border border-transparent hover:border-slate-300 rounded-lg cursor-pointer text-xs font-semibold transition-all shadow-2xs"
            title="Perbarui Sumber Data (Refresh Data)"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          {/* Pause / Resume Updates */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1 px-2.5 py-1 hover:bg-slate-200/80 text-slate-700 border border-transparent hover:border-slate-300 cursor-pointer text-[11px] font-medium transition-all"
            title={isPaused ? 'Lanjutkan Pembaruan Otomatis' : 'Jeda Pembaruan'}
          >
            {isPaused ? <Play className="w-3 h-3 text-emerald-600" /> : <Pause className="w-3 h-3 text-slate-600" />}
            <span className="hidden lg:inline">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block" />

          {/* View Original Dropdown */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-300">
            <span>View: Original</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        {/* Right Toolbar Action: Download / Fullscreen */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Download Dialog */}
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 bg-[#002B49] hover:bg-[#003d66] text-white px-3.5 py-1.5 font-bold text-xs rounded-lg shadow-2xs cursor-pointer border border-[#001D3D] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>

          {/* Full Screen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-300 rounded-lg cursor-pointer transition-colors"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh Tableau'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3. TABLEAU WORKBOOK SHEET TABS (Clean Modern Pill Tabs) */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto">
        <span className="text-[10px] font-bold uppercase text-slate-500 px-2 tracking-wider shrink-0 hidden md:inline font-mono">
          Sheets:
        </span>
        {sheets.map((sheet) => {
          const isActive = activeSheet === sheet.id;
          const Icon = sheet.icon;

          return (
            <button
              key={sheet.id}
              onClick={() => onSelectSheet(sheet.id)}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold whitespace-nowrap rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-[#002B49] shadow-xs border border-slate-200/90 font-bold'
                  : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#002B49]' : 'text-slate-400'}`} />
              <span>{sheet.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
