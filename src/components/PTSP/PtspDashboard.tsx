import React, { useState } from 'react';
import {
  Layers,
  ArrowRightLeft,
  Briefcase,
  MessageSquare,
  FileCode2,
} from 'lucide-react';
import { PtspFilters } from './PtspFilters';
import { PtspJenisLayananSection } from './PtspJenisLayananSection';
import { PtspPerizinanSheetSwapSection } from './PtspPerizinanSheetSwapSection';
import { PtspSektorBerusahaSection } from './PtspSektorBerusahaSection';
import { PtspPengaduanLayananSection } from './PtspPengaduanLayananSection';
import { PtspKamusRumusView } from './PtspKamusRumusView';

interface PtspDashboardProps {
  activeSubMenu: string;
  onSelectSubMenu: (menu: string) => void;
  onOpenExportModal?: () => void;
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PtspDashboard: React.FC<PtspDashboardProps> = ({
  activeSubMenu,
  onSelectSubMenu,
  onOpenExportModal,
  onOpenFormulaModal,
}) => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [basis, setBasis] = useState<'ytd' | 'monthly'>('ytd');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleResetFilters = () => {
    setSelectedYear('2026');
    setSelectedMonth('April');
    setSelectedSector('ALL');
    setSelectedRisk('ALL');
    setSelectedStatus('ALL');
    setBasis('ytd');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleKpiCardClick = (kpiId: string) => {
    if (onOpenFormulaModal) {
      onOpenFormulaModal(kpiId);
    }
  };

  const navTabs = [
    { id: 'jenis_layanan', label: 'Poin 7: Jenis Layanan (Dataset 14)', icon: Layers },
    { id: 'sheet_swap', label: 'Poin 8-10: Sheet Swap Perizinan & Non-Perizinan', icon: ArrowRightLeft },
    { id: 'sektor', label: 'Poin 11: Sektor Usaha (Dataset 9)', icon: Briefcase },
    { id: 'pengaduan', label: 'Poin 12: Pengaduan (Dataset 6)', icon: MessageSquare },
    { id: 'kamus_rumus', label: 'Kamus Rumus Calculated', icon: FileCode2 },
  ];

  const currentSubMenu =
    activeSubMenu === 'ikhtisar' || !activeSubMenu ? 'jenis_layanan' : activeSubMenu;

  return (
    <div className="space-y-4 font-sans select-none pb-8">
      {/* 1. Tableau Parameters & Context Filters Shelf */}
      <PtspFilters
        selectedYear={selectedYear}
        onChangeYear={setSelectedYear}
        selectedMonth={selectedMonth}
        onChangeMonth={setSelectedMonth}
        selectedSector={selectedSector}
        onChangeSector={setSelectedSector}
        selectedRisk={selectedRisk}
        onChangeRisk={setSelectedRisk}
        selectedStatus={selectedStatus}
        onChangeStatus={setSelectedStatus}
        basis={basis}
        onChangeBasis={setBasis}
        onResetFilters={handleResetFilters}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onOpenExportModal={onOpenExportModal}
      />

      {/* 2. In-Dashboard View Navigation Pills */}
      <div className="bg-white rounded-xl border border-slate-200 p-1.5 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentSubMenu === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectSubMenu(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-300' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Submenu View Rendering */}
      {currentSubMenu === 'kamus_rumus' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-[#002B49]">Kamus Rumus &amp; Calculated Fields PTSP</span>
            <span className="text-xs text-slate-500 font-medium">Standarisasi Formula Layanan</span>
          </div>
          <PtspKamusRumusView />
        </div>
      ) : currentSubMenu === 'sheet_swap' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-[#002B49]">Poin #8, 9, 10 Sheet Swap Perizinan &amp; Non-Perizinan</span>
            <span className="text-xs text-slate-500 font-medium">Dataset 7 &amp; 16 Buku Satu Data</span>
          </div>
          <PtspPerizinanSheetSwapSection onExplainKpi={handleKpiCardClick} />
        </div>
      ) : currentSubMenu === 'sektor' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-[#002B49]">Poin #11 Perizinan Sektor Berusaha</span>
            <span className="text-xs text-slate-500 font-medium">Dataset 9 OSS-RBA</span>
          </div>
          <PtspSektorBerusahaSection onExplainKpi={handleKpiCardClick} />
        </div>
      ) : currentSubMenu === 'pengaduan' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-[#002B49]">Poin #12 Pengaduan Pelayanan PTSP</span>
            <span className="text-xs text-slate-500 font-medium">Dataset 6 Buku Satu Data</span>
          </div>
          <PtspPengaduanLayananSection onExplainKpi={handleKpiCardClick} />
        </div>
      ) : (
        /* Default: Poin 7 Jenis Layanan BP Batam (Dataset 14) */
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-[#002B49]">Poin #7 Jenis Layanan BP Batam</span>
            <span className="text-xs text-slate-500 font-medium">Dataset 14 Buku Satu Data</span>
          </div>
          <PtspJenisLayananSection onExplainKpi={handleKpiCardClick} />
        </div>
      )}
    </div>
  );
};

