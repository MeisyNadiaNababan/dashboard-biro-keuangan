import React, { useState } from 'react';
import { PdsiKpiRow } from './PdsiKpiRow';
import { PdsiDataCenterConsolidatedSwap } from './PdsiDataCenterConsolidatedSwap';
import { PdsiItServicesConsolidatedSwap } from './PdsiItServicesConsolidatedSwap';
import { PdsiKamusRumusView } from './PdsiKamusRumusView';
import { KpiWordDocumentView } from '../KpiWordDocumentView';
import { PdsiFilters } from './PdsiFilters';

interface PdsiDashboardProps {
  activeSubMenu: string;
  onSelectSubMenu: (menu: string) => void;
  onOpenExportModal?: () => void;
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PdsiDashboard: React.FC<PdsiDashboardProps> = ({
  activeSubMenu,
  onSelectSubMenu,
  onOpenExportModal,
  onOpenFormulaModal,
}) => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedCycle, setSelectedCycle] = useState('ALL');
  const [selectedDomain, setSelectedDomain] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [basis, setBasis] = useState<'ytd' | 'monthly'>('ytd');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleResetFilters = () => {
    setSelectedYear('2026');
    setSelectedMonth('April');
    setSelectedCycle('ALL');
    setSelectedDomain('ALL');
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

  return (
    <div className="space-y-4 font-sans select-none pb-8">
      {/* 1. Tableau Parameters & Filters Shelf */}
      <PdsiFilters
        selectedYear={selectedYear}
        onChangeYear={setSelectedYear}
        selectedMonth={selectedMonth}
        onChangeMonth={setSelectedMonth}
        selectedCycle={selectedCycle}
        onChangeCycle={setSelectedCycle}
        selectedDomain={selectedDomain}
        onChangeDomain={setSelectedDomain}
        selectedStatus={selectedStatus}
        onChangeStatus={setSelectedStatus}
        basis={basis}
        onChangeBasis={setBasis}
        onResetFilters={handleResetFilters}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onOpenExportModal={onOpenExportModal}
      />

      {/* 2. Main Content Area: Strictly adhering to Points 1 - 10, all other views removed (Point 11) */}
      {activeSubMenu === 'kpi_word_doc' ? (
        <KpiWordDocumentView activeUnitId="pdsi" onBackToDashboard={() => onSelectSubMenu('ikhtisar')} />
      ) : activeSubMenu === 'kamus_rumus' ? (
        <PdsiKamusRumusView />
      ) : activeSubMenu === 'datacenter' || selectedDomain === 'datacenter' ? (
        <div className="space-y-4">
          <PdsiDataCenterConsolidatedSwap onOpenFormulaModal={handleKpiCardClick} />
        </div>
      ) : activeSubMenu === 'layanan_ti' || activeSubMenu === 'helpdesk' || selectedDomain === 'layanan_ti' ? (
        <div className="space-y-4">
          <PdsiItServicesConsolidatedSwap onOpenFormulaModal={handleKpiCardClick} />
        </div>
      ) : (
        /* Default Overview: Strictly 10 Points Requested by User */
        <div className="space-y-5">
          {/* Poin 1 s/d 8: 8 KPI BANS */}
          <section id="pdsi-kpi-bans">
            <PdsiKpiRow
              onOpenKamusRumus={() => onSelectSubMenu('kamus_rumus')}
              onSelectMetric={handleKpiCardClick}
            />
          </section>

          {/* Poin 9: Sheet Swap Rekap Data Center, Data Tenant dan Server & Storage */}
          <section id="pdsi-sheet-swap-datacenter">
            <PdsiDataCenterConsolidatedSwap onOpenFormulaModal={handleKpiCardClick} />
          </section>

          {/* Poin 10: Sheet Swap Data Layanan TI & Permintaan Layanan TI */}
          <section id="pdsi-sheet-swap-layanan-ti">
            <PdsiItServicesConsolidatedSwap onOpenFormulaModal={handleKpiCardClick} />
          </section>
        </div>
      )}
    </div>
  );
};
