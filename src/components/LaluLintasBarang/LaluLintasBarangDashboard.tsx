import React, { useState, useMemo } from 'react';
import { LlbKpiRow } from './LlbKpiRow';
import { LlbFilters, LlbFilterState } from './LlbFilters';
import { LlbPerizinanConsolidatedCard } from './LlbPerizinanConsolidatedCard';
import { LlbKuotaBarangKonsumsiCard } from './LlbKuotaBarangKonsumsiCard';
import { LlbSlaLayananCard } from './LlbSlaLayananCard';
import { LlbKbliKawasanCard } from './LlbKbliKawasanCard';
import { LlbKamusRumusView } from './LlbKamusRumusView';
import {
  KOMPOSISI_PERIZINAN_DATA,
  KUOTA_BARANG_KONSUMSI_DATA,
  SLA_LAYANAN_DATA,
} from '../../data/laluLintasBarangData';

interface LaluLintasBarangDashboardProps {
  activeSubMenu?: string;
  onSelectSubMenu?: (menuId: string) => void;
  onOpenExportModal?: () => void;
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const LaluLintasBarangDashboard: React.FC<LaluLintasBarangDashboardProps> = ({
  activeSubMenu = 'ikhtisar',
  onSelectSubMenu,
  onOpenExportModal,
  onOpenFormulaModal,
}) => {
  // Global Filter State
  const [filters, setFilters] = useState<LlbFilterState>({
    tahun: 2026,
    bulan: 'ALL',
    kategoriLayanan: 'ALL',
    sektor: 'ALL',
    sifatData: 'ALL',
  });

  const handleFilterChange = (newFilters: Partial<LlbFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 2026,
      bulan: 'ALL',
      kategoriLayanan: 'ALL',
      sektor: 'ALL',
      sifatData: 'ALL',
    });
  };

  // KPI Calculations
  const totalPerizinan = useMemo(
    () => KOMPOSISI_PERIZINAN_DATA.reduce((acc, curr) => acc + curr.volume, 0),
    []
  );

  const totalRealisasiTon = useMemo(
    () => KUOTA_BARANG_KONSUMSI_DATA.reduce((acc, curr) => acc + curr.realisasi, 0),
    []
  );

  const totalNilaiEkonomiMiliar = useMemo(
    () =>
      KUOTA_BARANG_KONSUMSI_DATA.reduce((acc, curr) => acc + curr.nilaiEkonomiRp, 0) /
      1000000000,
    []
  );

  const persenSlaTepatWaktu = useMemo(
    () =>
      Math.round(
        (SLA_LAYANAN_DATA.reduce((acc, curr) => acc + curr.persentaseTepatWaktu, 0) /
          SLA_LAYANAN_DATA.length) *
          10
      ) / 10,
    []
  );

  const rataRataWaktuJam = useMemo(
    () =>
      Math.round(
        (SLA_LAYANAN_DATA.reduce((acc, curr) => acc + curr.rataRataWaktuJam, 0) /
          SLA_LAYANAN_DATA.length) *
          10
      ) / 10,
    []
  );

  const effectiveTab = activeSubMenu;

  return (
    <div id="llb-dashboard-container" className="space-y-4">
      {/* 1. EXECUTIVE FILTERS BAR */}
      <LlbFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* 2. EXECUTIVE KPI ROW */}
      <LlbKpiRow
        totalPerizinan={totalPerizinan}
        totalRealisasiKuotaTon={totalRealisasiTon}
        nilaiEkonomiMiliar={totalNilaiEkonomiMiliar}
        persenSlaTepatWaktu={persenSlaTepatWaktu}
        rataRataWaktuJam={rataRataWaktuJam}
        onExplainKpi={onOpenFormulaModal}
      />

      {/* 3. ACTIVE SUB-MENU / SHEET SWAP CONTENT */}
      {effectiveTab === 'ikhtisar' && (
        <div className="space-y-4">
          {/* Consolidated Pie & Monthly Trend Card */}
          <LlbPerizinanConsolidatedCard onOpenFormulaModal={onOpenFormulaModal} />

          {/* Quick Insights Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LlbKuotaBarangKonsumsiCard onOpenFormulaModal={onOpenFormulaModal} />
            <LlbSlaLayananCard onOpenFormulaModal={onOpenFormulaModal} />
          </div>
        </div>
      )}

      {effectiveTab === 'kuota' && <LlbKuotaBarangKonsumsiCard onOpenFormulaModal={onOpenFormulaModal} />}

      {effectiveTab === 'sla' && <LlbSlaLayananCard onOpenFormulaModal={onOpenFormulaModal} />}

      {effectiveTab === 'kbli' && <LlbKbliKawasanCard onOpenFormulaModal={onOpenFormulaModal} />}

      {(effectiveTab === 'kamus' || effectiveTab === 'kamus_rumus') && <LlbKamusRumusView />}
    </div>
  );
};
