import React, { useState } from 'react';
import { InfrastrukturSatuDataDashboard } from './InfrastrukturSatuDataDashboard';
import { InfrastrukturFormulaModal } from './InfrastrukturFormulaModal';
import { InfrastrukturWordDocView } from './InfrastrukturWordDocView';
import { KatalogVisualisasiDashboardModal } from '../Modals/KatalogVisualisasiDashboardModal';

export const PembangunanInfrastrukturDashboard: React.FC = () => {
  // Navigation & View State
  const [activeView, setActiveView] = useState<'dashboard' | 'word-doc'>('dashboard');

  // Modal State
  const [formulaKpiType, setFormulaKpiType] = useState<
    | 'kpi-pembangunan'
    | 'kpi-progres-fisik'
    | 'kpi-progres-keuangan'
    | 'kpi-kurva-s'
    | 'kpi-row-utilitas'
    | 'kpi-row-penghijauan'
    | 'kpi-ruas-jalan'
    | 'kpi-pematangan'
    | null
  >(null);
  const [isFormulaOpen, setIsFormulaOpen] = useState<boolean>(false);
  const [isVisualCatalogOpen, setIsVisualCatalogOpen] = useState<boolean>(false);

  const handleOpenFormula = (
    kpiType:
      | 'kpi-pembangunan'
      | 'kpi-progres-fisik'
      | 'kpi-progres-keuangan'
      | 'kpi-kurva-s'
      | 'kpi-row-utilitas'
      | 'kpi-row-penghijauan'
      | 'kpi-ruas-jalan'
      | 'kpi-pematangan'
  ) => {
    setFormulaKpiType(kpiType);
    setIsFormulaOpen(true);
  };

  // If in Word Document view
  if (activeView === 'word-doc') {
    return <InfrastrukturWordDocView onBack={() => setActiveView('dashboard')} />;
  }

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* AUTHORITATIVE, CLEAR, UNCLUTTERED SATU DATA DASHBOARD (HAL. 48 - 51) */}
      <InfrastrukturSatuDataDashboard
        onOpenFormula={handleOpenFormula}
        onOpenWordDoc={() => setActiveView('word-doc')}
        onOpenVisualCatalog={() => setIsVisualCatalogOpen(true)}
      />

      {/* Kamus Atribut & Formula Explanation Modal */}
      <InfrastrukturFormulaModal
        isOpen={isFormulaOpen}
        onClose={() => setIsFormulaOpen(false)}
        kpiType={formulaKpiType}
      />

      {/* Katalog Nama Visualisasi Seluruh Dashboard Modal */}
      <KatalogVisualisasiDashboardModal
        isOpen={isVisualCatalogOpen}
        onClose={() => setIsVisualCatalogOpen(false)}
        initialFilterUnit="dit-pembangunan-infrastruktur"
      />
    </div>
  );
};
