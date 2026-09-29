import React, { useState } from 'react';
import { PdsiSatuDataVisualSuite } from './PdsiSatuDataVisualSuite';
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

      {/* 2. Main Content Area */}
      {activeSubMenu === 'kpi_word_doc' ? (
        <KpiWordDocumentView activeUnitId="pdsi" onBackToDashboard={() => onSelectSubMenu('ikhtisar')} />
      ) : activeSubMenu === 'kamus_rumus' ? (
        <PdsiKamusRumusView />
      ) : (
        /* Sesuai Permintaan User: Menampilkan 8 Visualisasi Resmi Satu Data PDSI */
        <div className="space-y-5">
          <section id="pdsi-satu-data-visualisasi-suite">
            <PdsiSatuDataVisualSuite />
          </section>
        </div>
      )}
    </div>
  );
};

