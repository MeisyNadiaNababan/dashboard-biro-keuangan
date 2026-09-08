import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Server,
  Users,
  MapPin,
  Ship,
  Plane,
  Stethoscope,
  Droplets,
  Layers,
  BookOpen,
  FileCode2,
  ChevronRight,
  Sparkles,
  Database,
  Search,
  FileText
} from 'lucide-react';
import { BP_BATAM_24_UNITS } from '../data/bpBatamUnits';

interface NavigationRailProps {
  activeUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onOpenUnitsDrawer: () => void;
  onOpenKamusRumus: () => void;
  activeSubMenu: string;
  onSelectSubMenu: (menu: string) => void;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  activeUnitId,
  onSelectUnit,
  onOpenUnitsDrawer,
  onOpenKamusRumus,
  activeSubMenu,
  onSelectSubMenu,
}) => {
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  // Key quick units on the rail (matching the icons circled in the user's screenshot)
  const quickRailItems = [
    {
      id: 'biro-keuangan',
      label: 'Biro Keuangan',
      shortLabel: 'Keuangan',
      icon: Building2,
      isReady: true,
      code: 'BK',
    },
    {
      id: 'pdsi',
      label: 'Pusat Data dan Sistem Informasi (PDSI)',
      shortLabel: 'PDSI',
      icon: Server,
      isReady: true,
      code: 'PDSI',
    },
    {
      id: 'biro-sdm',
      label: 'Biro Sumber Daya Manusia (SDM)',
      shortLabel: 'SDM',
      icon: Users,
      isReady: false,
      code: 'BSDM',
    },
    {
      id: 'dit-lahan',
      label: 'Direktorat Pengelolaan Lahan',
      shortLabel: 'Lahan',
      icon: MapPin,
      isReady: false,
      code: 'DPL',
    },
    {
      id: 'dit-pelabuhan',
      label: 'Direktorat Pengelolaan Kepelabuhanan',
      shortLabel: 'Pelabuhan',
      icon: Ship,
      isReady: false,
      code: 'DPKPL',
    },
    {
      id: 'dit-bandara',
      label: 'Direktorat Pengelolaan Kawasan Bandara',
      shortLabel: 'Bandara',
      icon: Plane,
      isReady: false,
      code: 'DPKB',
    },
    {
      id: 'bu-rumah-sakit',
      label: 'Badan Usaha Rumah Sakit (RSBP)',
      shortLabel: 'RSBP',
      icon: Stethoscope,
      isReady: false,
      code: 'BURS',
    },
    {
      id: 'bu-spam-fasling',
      label: 'BU SPAM, Fasilitas dan Lingkungan',
      shortLabel: 'SPAM',
      icon: Droplets,
      isReady: false,
      code: 'BUSPAM',
    },
  ];

  return (
    <nav
      id="bp-batam-left-rail"
      aria-label="Navigasi 24 Unit Kerja BP Batam"
      className="w-16 bg-[#0B1728] border-r border-[#152744] flex flex-col items-center py-2.5 z-40 shrink-0 select-none transition-all"
    >
      {/* 1. BP BATAM LOGO EMBLEM (Just like top left in user screenshot) */}
      <button
        onClick={onOpenUnitsDrawer}
        title="Buka Direktori 24 Unit Kerja BP Batam"
        className="w-11 h-11 mb-3 rounded-xl bg-[#091526] hover:bg-[#132742] border border-[#1f3864] flex flex-col items-center justify-center cursor-pointer transition-all shadow-md group relative"
      >
        {/* Authentic BP Batam Shield / Emblem SVG */}
        <div className="w-5 h-5 flex items-center justify-center">
          <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
            {/* Outer Shield */}
            <path
              d="M16 2L5 6V14C5 21.5 9.8 28.2 16 30C22.2 28.2 27 21.5 27 14V6L16 2Z"
              fill="#002B49"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />
            {/* Inner Emblem Core */}
            <path
              d="M16 6L9 9V14C9 19 12.1 23.6 16 25C19.9 23.6 23 19 23 14V9L16 6Z"
              fill="#1F3864"
            />
            {/* Gear / Lighthouse Center */}
            <circle cx="16" cy="14" r="3.5" fill="#38BDF8" />
            <path d="M16 8V10M16 18V20M10 14H12M20 14H22" stroke="#FFFFFF" strokeWidth="1.2" />
          </svg>
        </div>
        <span className="text-[7.5px] font-bold tracking-wider text-sky-200 mt-0.5 uppercase">
          BP BATAM
        </span>

        {/* Hover Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0F1E36] text-white text-xs font-semibold whitespace-nowrap rounded-md border border-slate-700 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Direktori 24 Unit Kerja BP Batam</span>
          </div>
          <span className="text-[10px] text-slate-400 font-normal block">Klik untuk memilih unit kerja</span>
        </div>
      </button>

      <div className="w-8 h-px bg-[#1a3052] mb-2" />

      {/* 2. 24 UNITS DIRECTORY BUTTON */}
      <button
        onClick={onOpenUnitsDrawer}
        className="w-11 h-11 mb-2 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all relative group bg-[#132742] hover:bg-[#1a3559] border border-[#2a4d7d] text-sky-300"
        title="Lihat Semua 24 Unit Kerja BP Batam"
      >
        <Layers className="w-4 h-4 text-sky-300" />
        <span className="text-[8px] font-bold text-sky-200 mt-0.5">24 UNIT</span>

        {/* Notification / Ready badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white font-mono text-[9px] font-extrabold flex items-center justify-center shadow-xs">
          24
        </span>

        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0F1E36] text-white text-xs font-semibold whitespace-nowrap rounded-md border border-slate-700 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          <div className="font-bold text-sky-300">Direktori 24 Unit BP Batam</div>
          <div className="text-[10px] text-slate-300">Biro, Direktorat, Pusat, &amp; Badan Usaha</div>
        </div>
      </button>

      {/* 3. SCROLLABLE UNIT ICONS */}
      <div className="flex-1 w-full flex flex-col items-center space-y-1.5 overflow-y-auto px-1 py-1 no-scrollbar">
        {quickRailItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeUnitId === item.id;

          return (
            <div key={item.id} className="relative group flex items-center">
              <button
                onClick={() => onSelectUnit(item.id)}
                className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all relative ${
                  isActive
                    ? 'bg-[#1E40AF] text-white shadow-md ring-2 ring-sky-400/50'
                    : 'text-slate-400 hover:text-white hover:bg-[#132742]'
                }`}
                title={item.label}
              >
                {/* Active Indicator Bar on Left */}
                {isActive && (
                  <span className="absolute -left-1 top-2 bottom-2 w-1 rounded-r-full bg-sky-400 shadow-xs" />
                )}

                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} />
                <span className="text-[8px] font-semibold truncate max-w-[40px] mt-0.5">
                  {item.shortLabel}
                </span>

                {/* Status Dot for Active Dashboard */}
                {item.isReady && !isActive && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-[#0B1728]" />
                )}
              </button>

              {/* Tooltip on Hover */}
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0F1E36] text-white text-xs whitespace-nowrap rounded-md border border-slate-700 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold">{item.label}</span>
                  {item.isReady ? (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Aktif
                    </span>
                  ) : (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-700 text-slate-300">
                      Siap Rancang
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Kode: {item.code} • BP Batam
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-8 h-px bg-[#1a3052] my-2" />

      {/* 4. KAMUS RUMUS & CALCULATED FIELDS SHORTCUT */}
      <button
        onClick={onOpenKamusRumus}
        className="w-11 h-11 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all relative group bg-[#11233D] hover:bg-[#1a3559] border border-sky-600/30 text-sky-300"
        title="Kamus Rumus & Formula Calculated Fields"
      >
        <FileCode2 className="w-4 h-4 text-sky-400" />
        <span className="text-[7.5px] font-bold text-sky-200 mt-0.5 uppercase">RUMUS</span>

        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0F1E36] text-white text-xs whitespace-nowrap rounded-md border border-slate-700 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          <div className="font-bold text-sky-300">Kamus Rumus &amp; Data Dictionary</div>
          <div className="text-[10px] text-slate-300">Sesuai file BP_Batam_KPI_Dictionary_Updated.pdf</div>
        </div>
      </button>

      {/* 4.5 FILE WORD KAMUS KPI SHORTCUT */}
      <button
        onClick={() => onSelectSubMenu('kpi_word_doc')}
        className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all relative group ${
          activeSubMenu === 'kpi_word_doc'
            ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400'
            : 'bg-[#0E2922] hover:bg-[#153D33] border border-emerald-500/40 text-emerald-300'
        }`}
        title="Tabel Kamus KPI & File Word (.docx)"
      >
        <FileText className="w-4 h-4 text-emerald-400" />
        <span className="text-[7px] font-bold text-emerald-200 mt-0.5 uppercase">WORD</span>

        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0F1E36] text-white text-xs whitespace-nowrap rounded-md border border-slate-700 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          <div className="font-bold text-emerald-300">File Word (.docx) &amp; Tabel Kamus KPI</div>
          <div className="text-[10px] text-slate-300">Format tabel acuan Biro Keuangan &amp; PDSI</div>
        </div>
      </button>

      {/* 5. DATABASE EXTRACT STATUS */}
      <div className="mt-2 text-center" title="PostgreSQL SIMKEU BP Batam • Data Terkini">
        <div className="w-3 h-3 mx-auto rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <span className="text-[7px] text-slate-400 font-mono mt-0.5 block">LIVE</span>
      </div>
    </nav>
  );
};
