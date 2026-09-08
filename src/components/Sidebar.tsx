import React from 'react';
import {
  LayoutDashboard,
  Coins,
  Receipt,
  Building2,
  FileSpreadsheet,
  Package,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  FileCode2,
  Database,
  Layers,
  Scale
} from 'lucide-react';

export type SidebarTab =
  | 'dashboard'
  | 'pendapatan'
  | 'belanja'
  | 'piutang'
  | 'kas_bank'
  | 'laporan'
  | 'aset'
  | 'pengaturan'
  | 'tableau_guide';

interface SidebarProps {
  activeTab: SidebarTab;
  onSelectTab: (tab: SidebarTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenTableauGuide?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  onOpenTableauGuide,
}) => {
  const navItems = [
    {
      id: 'dashboard' as SidebarTab,
      label: 'Ikhtisar Eksekutif',
      icon: LayoutDashboard,
      badge: 'Utama',
    },
    {
      id: 'pendapatan' as SidebarTab,
      label: 'Kinerja Pendapatan',
      icon: Coins,
      badge: 'Rp 981,2M',
    },
    {
      id: 'belanja' as SidebarTab,
      label: 'Serapan Belanja',
      icon: CreditCard,
      badge: '28,5%',
    },
    {
      id: 'piutang' as SidebarTab,
      label: 'Manajemen Piutang',
      icon: Receipt,
      badge: 'Rp 312,4M',
    },
    {
      id: 'kas_bank' as SidebarTab,
      label: 'Arus Kas & Bank',
      icon: Building2,
      badge: 'Rp 1,52T',
    },
    {
      id: 'aset' as SidebarTab,
      label: 'Pemanfaatan Aset',
      icon: Package,
    },
    {
      id: 'laporan' as SidebarTab,
      label: 'Ekspor Crosstab',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <aside
      className={`bg-[#16294a] border-r border-[#0e1d35] text-slate-300 transition-all duration-200 flex flex-col h-full shrink-0 relative select-none font-sans ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div className="p-3 bg-[#11213b] border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {/* Tableau Plus Mark */}
            <div className="w-7 h-7 bg-[#2E75B6] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                <rect x="10" y="2" width="4" height="6" fill="#FFFFFF" rx="0.5" />
                <rect x="10" y="16" width="4" height="6" fill="#FFFFFF" rx="0.5" />
                <rect x="2" y="10" width="6" height="4" fill="#FFFFFF" rx="0.5" />
                <rect x="16" y="10" width="6" height="4" fill="#FFFFFF" rx="0.5" />
                <rect x="8.5" y="8.5" width="7" height="7" fill="#E15759" rx="0.5" />
              </svg>
            </div>

            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-white font-bold text-xs tracking-tight uppercase truncate">
                  Biro Keuangan
                </span>
                <span className="text-slate-400 text-[10px] truncate">
                  BP Batam • Tableau BI
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            id="toggle-sidebar-btn"
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            title={collapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Navigation Links (Worksheets / Dashboards) */}
      <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
        {!collapsed && (
          <div className="px-2 py-1 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Layers className="w-3 h-3 text-slate-500" />
            <span>Dashboards &amp; Views</span>
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold transition-all cursor-pointer group relative border-l-3 ${
                isActive
                  ? 'bg-[#1F3864] text-white border-l-[#4E79A7]'
                  : 'text-slate-300 hover:text-white hover:bg-[#1a3055] border-l-transparent'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-[#76B7B2]' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 font-mono font-bold ${
                        isActive
                          ? 'bg-[#2E75B6] text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Tooltip on collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-slate-700 shadow-md">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}

        {/* Calculated Fields & Rumus Tableau Guide */}
        <div className="pt-3 mt-2 border-t border-slate-800">
          {!collapsed && (
            <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Data Dictionary
            </div>
          )}
          <div
            onClick={onOpenTableauGuide}
            className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-sky-200 bg-[#14325a] hover:bg-[#1b4072] border border-sky-500/30 cursor-pointer transition-all"
            title="Kamus Rumus Calculated Fields Tableau"
          >
            <FileCode2 className="w-4 h-4 text-sky-400 shrink-0" />
            {!collapsed && <span className="truncate">Kamus Rumus Calculated</span>}
          </div>
        </div>
      </nav>

      {/* Bottom Status Section */}
      <div className="mt-auto border-t border-slate-800 p-2.5 bg-[#11213b] text-xs">
        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          {!collapsed && (
            <div className="truncate">
              <span className="text-slate-200 font-bold block truncate">PostgreSQL SIMKEU</span>
              <span className="text-[10px] text-slate-500">Extract Refresh: Today</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
