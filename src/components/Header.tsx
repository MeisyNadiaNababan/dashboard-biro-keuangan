import React, { useState } from 'react';
import {
  RefreshCw,
  Download,
  Maximize2,
  Minimize2,
  RotateCcw,
  Pause,
  Play,
  FileSpreadsheet,
  CheckCircle2,
  ChevronDown,
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  Receipt,
  Building2,
  Scale,
  Server,
  Headphones,
  ShieldCheck,
  Network,
  Package,
  Layers,
  Sparkles,
  FileText,
  FileCode2,
} from 'lucide-react';
import { BP_BATAM_24_UNITS } from '../data/bpBatamUnits';

interface HeaderProps {
  onOpenExportModal?: () => void;
  onOpenTableauGuide?: () => void;
  onOpenUnitsDrawer?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  activeSheet: string;
  onSelectSheet: (sheetId: string) => void;
  activeUnitId: string;
  onSelectUnit: (unitId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenExportModal,
  onOpenTableauGuide,
  onOpenUnitsDrawer,
  onRefresh,
  isRefreshing = false,
  activeSheet,
  onSelectSheet,
  activeUnitId,
  onSelectUnit,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const currentUnit = BP_BATAM_24_UNITS.find((u) => u.id === activeUnitId) || BP_BATAM_24_UNITS[0];

  // Dynamic Sub-Menu tabs based on active unit
  const getSubMenus = () => {
    if (activeUnitId === 'biro-keuangan') {
      return [
        { id: 'overview', label: 'Ikhtisar Eksekutif', icon: LayoutDashboard },
        { id: 'pendapatan', label: 'Kinerja Pendapatan', icon: TrendingUp },
        { id: 'belanja', label: 'Serapan Belanja', icon: CreditCard },
        { id: 'piutang', label: 'Aging & Piutang', icon: Receipt },
        { id: 'kas_bank', label: 'Arus Kas & Bank', icon: Building2 },
        { id: 'fiskal', label: 'Surplus/Defisit & Fiskal', icon: Scale },
        { id: 'kpi_word_doc', label: 'Tabel Kamus KPI & Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'pdsi') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar PDSI', icon: LayoutDashboard },
        { id: 'helpdesk', label: 'Layanan TI & Helpdesk', icon: Headphones },
        { id: 'datacenter', label: 'Data Center & Server', icon: Server },
        { id: 'cyber', label: 'Keamanan Siber & SOC', icon: ShieldCheck },
        { id: 'fiber', label: 'Jaringan FO & Apps', icon: Network },
        { id: 'kpi_word_doc', label: 'Tabel Kamus KPI & Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus PDSI (PDF)', icon: FileCode2 },
      ];
    } else {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar Unit', icon: Layers },
        { id: 'kpi_word_doc', label: 'Tabel Kamus KPI & Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus & Katalog PDF', icon: FileCode2 },
        { id: 'designer', label: '+ Rancang Dashboard Unit Ini', icon: Sparkles, isSpecial: true },
      ];
    }
  };

  const subMenus = getSubMenus();

  return (
    <header className="shrink-0 z-30 font-sans select-none shadow-xs">
      {/* 1. TOP NAV BAR: EXECUTIVE COMMAND CENTER BP BATAM */}
      <div className="bg-[#0F1E36] text-white border-b border-[#16294a] px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
        {/* Left: Unit Selector & Command Center Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* BP Batam Command Center Emblem Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-md bg-[#1F3864] border border-blue-400/40 flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                <path d="M12 2L4 5V11C4 16.5 7.5 21.5 12 23C16.5 21.5 20 16.5 20 11V5L12 2Z" fill="#2E75B6" stroke="#60A5FA" strokeWidth="1" />
                <circle cx="12" cy="11" r="3" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-[11px] tracking-wider text-slate-100 uppercase block leading-tight">
                EXECUTIVE COMMAND CENTER
              </span>
              <span className="text-[9px] text-sky-300 font-mono block">
                BP BATAM • APRIL 2026
              </span>
            </div>
          </div>

          <span className="text-slate-500 text-xs hidden sm:inline">|</span>

          {/* Unit Switcher Dropdown Button */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenUnitsDrawer}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1A3358] hover:bg-[#234575] text-white rounded-lg border border-blue-400/40 text-xs font-bold cursor-pointer transition-all shadow-xs"
              title="Ganti Unit Kerja (24 Unit)"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-sky-200">[{currentUnit.code}]</span>
              <span className="truncate max-w-[130px] sm:max-w-[220px]">{currentUnit.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-sky-300" />
            </button>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 text-xs">
          {/* 24 Units Directory Button */}
          <button
            onClick={onOpenUnitsDrawer}
            className="flex items-center gap-1.5 text-xs bg-[#162D4D] hover:bg-[#203D68] text-sky-200 px-3 py-1.5 rounded-lg border border-sky-500/30 font-semibold cursor-pointer transition-all"
            title="Buka Direktori 24 Unit Kerja BP Batam"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>24 Unit Kerja</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg cursor-pointer transition-colors"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. SUB-TOOLBAR: REVERT, REFRESH, DOWNLOAD */}
      <div className="bg-slate-100/95 border-b border-slate-200 px-3 sm:px-4 py-1.5 flex items-center justify-between gap-3 text-xs text-slate-700">
        <div className="flex items-center gap-1 overflow-x-auto">
          {/* Revert Button */}
          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-2.5 py-1 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-md cursor-pointer text-xs font-semibold transition-all shadow-2xs"
            title="Kembalikan Tampilan Awal (Revert)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">Revert</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-2.5 py-1 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-md cursor-pointer text-xs font-semibold transition-all shadow-2xs"
            title="Perbarui Sumber Data (Refresh Data)"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block" />
        </div>

        {/* Right Action: Export / Download */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 bg-[#002B49] hover:bg-[#003d66] text-white px-3 py-1 font-bold text-xs rounded-md shadow-2xs cursor-pointer border border-[#001D3D] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>
        </div>
      </div>

      {/* 3. SUB-MENU SHEETS (Ikhtisar, Sub-Dashboard sheets, Kamus Rumus) */}
      <div className="bg-white border-b border-slate-200 px-3 py-1.5 flex items-center gap-1 overflow-x-auto">
        <span className="text-[10px] font-bold uppercase text-slate-500 px-1.5 tracking-wider shrink-0 hidden md:inline font-mono">
          Sub Menu:
        </span>
        {subMenus.map((menu) => {
          const isActive = activeSheet === menu.id;
          const Icon = menu.icon;

          return (
            <button
              key={menu.id}
              onClick={() => onSelectSheet(menu.id)}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold whitespace-nowrap rounded-lg transition-all cursor-pointer ${
                isActive
                  ? menu.isSpecial
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'bg-[#1F3864] text-white shadow-xs font-bold'
                  : menu.isSpecial
                  ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : menu.isSpecial ? 'text-blue-600' : 'text-slate-500'}`} />
              <span>{menu.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

