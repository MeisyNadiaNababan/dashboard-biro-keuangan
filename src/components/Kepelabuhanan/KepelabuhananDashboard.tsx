import React, { useState } from 'react';
import {
  Ship,
  Anchor,
  DollarSign,
  Users,
  Box,
  Layers,
  FileText,
  BookOpen,
  Sparkles,
  Download,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { PelabuhanFilters, PelabuhanFilterState } from './PelabuhanFilters';
import { PelabuhanKpiRow } from './PelabuhanKpiRow';
import { PelabuhanPnbpBelanjaCard } from './PelabuhanPnbpBelanjaCard';
import { PelabuhanKunjunganKapalCard } from './PelabuhanKunjunganKapalCard';
import { PelabuhanPenumpangCard } from './PelabuhanPenumpangCard';
import { PelabuhanDermagaLogistikCard } from './PelabuhanDermagaLogistikCard';
import { PelabuhanKamusRumusView } from './PelabuhanKamusRumusView';
import { PelabuhanKpiWordDocView } from './PelabuhanKpiWordDocView';

interface KepelabuhananDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const KepelabuhananDashboard: React.FC<KepelabuhananDashboardProps> = ({
  activeSubTab = 'ikhtisar',
  onOpenFormulaModal,
}) => {
  const [filters, setFilters] = useState<PelabuhanFilterState>({
    tahun: 2026,
    bulan: 'ALL',
    pelabuhan: 'ALL',
    jenisPelayaran: 'ALL',
    kategoriOperasional: 'ALL',
  });

  const handleFilterChange = (newFilters: Partial<PelabuhanFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 2026,
      bulan: 'ALL',
      pelabuhan: 'ALL',
      jenisPelayaran: 'ALL',
      kategoriOperasional: 'ALL',
    });
  };

  // Render specific subtab views if requested via sub-tab navigation
  if (activeSubTab === 'kpi_word_doc') {
    return <PelabuhanKpiWordDocView />;
  }

  if (activeSubTab === 'kamus_rumus') {
    return <PelabuhanKamusRumusView />;
  }

  if (activeSubTab === 'keuangan') {
    return (
      <div className="space-y-3.5">
        <PelabuhanFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <PelabuhanPnbpBelanjaCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  if (activeSubTab === 'kunjungan') {
    return (
      <div className="space-y-3.5">
        <PelabuhanFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <PelabuhanKunjunganKapalCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  if (activeSubTab === 'penumpang') {
    return (
      <div className="space-y-3.5">
        <PelabuhanFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <PelabuhanPenumpangCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  if (activeSubTab === 'dermaga') {
    return (
      <div className="space-y-3.5">
        <PelabuhanFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <PelabuhanDermagaLogistikCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  // DEFAULT VIEW: IKHTISAR EKSEKUTIF KEPELABUHANAN
  return (
    <div id="kepelabuhanan-dashboard" className="space-y-3.5">
      {/* 1. Executive Filter Panel */}
      <PelabuhanFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* 2. Executive 6 Mandated KPI Row */}
      <PelabuhanKpiRow
        realisasiPnbpMiliar={428.5}
        targetPnbpMiliar={480.0}
        realisasiBelanjaMiliar={184.25}
        paguBelanjaMiliar={215.0}
        nilaiIkm={88.4}
        totalPenumpangJuta={7.43}
        totalPenumpangDatangJuta={3.68}
        totalPenumpangBerangkatJuta={3.75}
        jumlahDermaga={24}
        borPersen={64.8}
        totalCallKapal={48650}
        callBarang={16240}
        callPenumpang={32410}
        onExplainKpi={onOpenFormulaModal}
      />

      {/* 3. 2x2 Dense Grid of Analytical Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {/* Visual 1: PNBP vs Belanja (DS-3 & DS-2) */}
        <PelabuhanPnbpBelanjaCard onOpenFormulaModal={onOpenFormulaModal} />

        {/* Visual 2: Kunjungan Kapal Barang vs Penumpang (DS-5 & DS-7) */}
        <PelabuhanKunjunganKapalCard onOpenFormulaModal={onOpenFormulaModal} />

        {/* Visual 3: Arus Penumpang Domestik & Internasional + IKM (DS-25 & DS-21) */}
        <PelabuhanPenumpangCard onOpenFormulaModal={onOpenFormulaModal} />

        {/* Visual 4: Dermaga & Throughput Peti Kemas Batu Ampar (DS-4, DS-22-24) */}
        <PelabuhanDermagaLogistikCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    </div>
  );
};
