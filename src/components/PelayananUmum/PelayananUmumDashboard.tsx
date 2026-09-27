import React, { useState } from 'react';
import { PelayananUmumVisualHeader } from './PelayananUmumVisualHeader';
import { PelayananUmumFilters } from './PelayananUmumFilters';
import { PelayananUmumKpiRow } from './PelayananUmumKpiRow';
import { FinancialControlTowerCard } from './FinancialControlTowerCard';
import { OperationalUnitPerformanceCards } from './OperationalUnitPerformanceCards';
import { DeputyAiControlCard } from './DeputyAiControlCard';
import { UnitDeepDiveCenter } from './UnitDeepDiveCenter';
import { PelayananUmumVisualCharts } from './PelayananUmumVisualCharts';
import { PelayananUmumSatuDataCatalog } from './PelayananUmumSatuDataCatalog';
import { PelayananUmumFormulaModal } from './PelayananUmumFormulaModal';
import { PelayananUmumFilterState } from './types';

interface PelayananUmumDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId?: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const PelayananUmumDashboard: React.FC<PelayananUmumDashboardProps> = ({
  activeSubTab = 'ikhtisar',
  onOpenFormulaModal,
  onOpenExportModal,
  onSwitchUnit,
}) => {
  // Filter State
  const [filterState, setFilterState] = useState<PelayananUmumFilterState>({
    selectedYear: '2026',
    selectedMonth: 'April',
    selectedQuarter: 'Q2',
    selectedUnit: 'ALL',
    selectedStatus: 'ALL',
    viewMode: (activeSubTab as any) || 'ikhtisar',
  });

  // Deep Dive selected unit ('bu-rumah-sakit' | 'dit-pam-aset' | 'bu-spam-fasling')
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>('bu-rumah-sakit');

  // Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [selectedKpiFormulaId, setSelectedKpiFormulaId] = useState<string>('ikp-1');

  const handleOpenFormula = (kpiId?: string) => {
    setSelectedKpiFormulaId(kpiId || 'ikp-1');
    setIsFormulaModalOpen(true);
    if (onOpenFormulaModal) {
      onOpenFormulaModal(kpiId);
    }
  };

  const handleFilterChange = (updates: Partial<PelayananUmumFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({
      selectedYear: '2026',
      selectedMonth: 'April',
      selectedQuarter: 'Q2',
      selectedUnit: 'ALL',
      selectedStatus: 'ALL',
      viewMode: 'ikhtisar',
    });
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    // Smooth scroll down to the full-width Unit Deep-Dive Center
    setTimeout(() => {
      const el = document.getElementById('unit-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. Header Banner */}
      <PelayananUmumVisualHeader
        onOpenFormulaModal={() => handleOpenFormula('ikp-1')}
        onOpenExportModal={onOpenExportModal}
        onSelectSubView={(view) => handleFilterChange({ viewMode: view })}
        currentSubView={filterState.viewMode}
      />

      {/* 2. Compact Filter Toolbar */}
      <PelayananUmumFilters
        filterState={filterState}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* 3. The 3 Primary KPI Cards (IKP-1, IKP-2, IKP-3) */}
      <PelayananUmumKpiRow
        onOpenFormulaModal={handleOpenFormula}
        selectedUnit={filterState.selectedUnit}
      />

      {/* 4. Dynamic Views Based on Filter ViewMode */}
      {filterState.viewMode === 'ikhtisar' && (
        <div className="space-y-5">
          {/* A. Financial Control Tower (Full-Width Executive Fiscal Matrix) */}
          <FinancialControlTowerCard
            onSelectUnit={(unitId) => handleSelectDeepDive(unitId)}
          />

          {/* B. Operational Unit Performance (3 Pilar Pelayanan Umum - Full Width 3 Columns, Spacious & No Truncation) */}
          <OperationalUnitPerformanceCards
            onAnalyzeUnit={(unitId) => handleSelectDeepDive(unitId)}
            onNavigateToUnit={onSwitchUnit}
          />

          {/* C. Unit Deep-Dive Center (Full Width directly below Operational Unit Performance, No More Cramped Side Card!) */}
          <div id="unit-deep-dive-section" className="pt-1 scroll-mt-6">
            <UnitDeepDiveCenter
              selectedUnitId={selectedDeepDiveUnit}
              onSelectUnit={(unitId) => setSelectedDeepDiveUnit(unitId)}
              onNavigateToFullDashboard={onSwitchUnit}
              onOpenFormulaModal={handleOpenFormula}
            />
          </div>

          {/* D. Interactive Visual Charts (IKM Gabungan 2 BU, Realisasi Anggaran, Distribusi PNBP) */}
          <PelayananUmumVisualCharts
            onOpenFormulaModal={() => handleOpenFormula('ikp-2')}
          />

          {/* E. Deputy Strategic Control & Advisory (Perkin A6 Guidelines & Recommendations) */}
          <DeputyAiControlCard
            onSelectDeepDiveUnit={handleSelectDeepDive}
            selectedDeepDiveUnit={selectedDeepDiveUnit}
          />
        </div>
      )}

      {filterState.viewMode === 'finansial' && (
        <div className="space-y-4">
          <FinancialControlTowerCard
            onSelectUnit={(unitId) => handleSelectDeepDive(unitId)}
          />
          <PelayananUmumVisualCharts
            onOpenFormulaModal={() => handleOpenFormula('ikp-1')}
          />
        </div>
      )}

      {filterState.viewMode === 'operasional' && (
        <div className="space-y-4">
          <OperationalUnitPerformanceCards
            onAnalyzeUnit={(unitId) => handleSelectDeepDive(unitId)}
            onNavigateToUnit={onSwitchUnit}
          />
          <PelayananUmumVisualCharts
            onOpenFormulaModal={() => handleOpenFormula('ikp-3')}
          />
        </div>
      )}

      {filterState.viewMode === 'deep_dive' && (
        <div className="space-y-4">
          <UnitDeepDiveCenter
            selectedUnitId={selectedDeepDiveUnit}
            onSelectUnit={(unitId) => setSelectedDeepDiveUnit(unitId)}
            onNavigateToFullDashboard={onSwitchUnit}
            onOpenFormulaModal={handleOpenFormula}
          />
        </div>
      )}

      {filterState.viewMode === 'satu_data' && (
        <div className="space-y-4">
          <PelayananUmumSatuDataCatalog />
        </div>
      )}

      {/* Formula Modal */}
      <PelayananUmumFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialKpiId={selectedKpiFormulaId}
      />
    </div>
  );
};
