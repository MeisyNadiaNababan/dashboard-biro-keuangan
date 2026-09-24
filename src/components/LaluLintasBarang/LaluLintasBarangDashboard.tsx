import React, { useState, useMemo } from 'react';
import { LlbKpiRow } from './LlbKpiRow';
import { LlbFilters, LlbFilterState } from './LlbFilters';
import { LlbPerizinanLlbCard } from './LlbPerizinanLlbCard';
import { LlbPenerbitanBulananSheetSwap } from './LlbPenerbitanBulananSheetSwap';
import { LlbSlaLayananCard } from './LlbSlaLayananCard';
import { LlbKuotaBarangKonsumsiCard } from './LlbKuotaBarangKonsumsiCard';
import { LlbKbliKawasanCard } from './LlbKbliKawasanCard';
import { LlbKamusRumusView } from './LlbKamusRumusView';
import {
  REKAP_LAYANAN_INDUSTRI_PERDAGANGAN,
  KUOTA_BARANG_KONSUMSI_DATA,
  DATA_SLA_PERDAGANGAN,
  DATA_SLA_INDUSTRI,
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
    () => REKAP_LAYANAN_INDUSTRI_PERDAGANGAN.reduce((acc, curr) => acc + curr.jumlah, 0),
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

  const avgSlaIndustri = useMemo(
    () =>
      Math.round(
        (DATA_SLA_INDUSTRI.reduce((a, b) => a + b.persentaseLayananTepatWaktu, 0) /
          DATA_SLA_INDUSTRI.length) *
          10
      ) / 10,
    []
  );

  const avgJamIndustri = useMemo(
    () =>
      Math.round(
        (DATA_SLA_INDUSTRI.reduce((a, b) => a + b.rataRataWaktuPenyelesaianDokumenJam, 0) /
          DATA_SLA_INDUSTRI.length) *
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

      {/* 2. EXECUTIVE KPI ROW (Dataset No. 3, 4, 6, 7, 8, 9) */}
      <LlbKpiRow
        totalPerizinan={totalPerizinan}
        totalRealisasiKuotaTon={totalRealisasiTon}
        nilaiEkonomiMiliar={totalNilaiEkonomiMiliar}
        persenSlaTepatWaktu={avgSlaIndustri}
        rataRataWaktuJam={avgJamIndustri}
        onExplainKpi={onOpenFormulaModal}
      />

      {/* 3. ACTIVE SUB-MENU CONTENT */}

      {/* View 1: IKHTISAR EKSEKUTIF (Semua Visualisasi Utama Ditampilkan Bersama) */}
      {effectiveTab === 'ikhtisar' && (
        <div className="space-y-4">
          {/* Req 1: Rekapitulasi Penerbitan Layanan Perizinan LLB Industri & Perdagangan (Nama Layanan & Jumlah) */}
          <LlbPerizinanLlbCard onOpenFormulaModal={onOpenFormulaModal} />

          {/* Req 2, 3, 4, 6: Sheet Swap Bulanan IUK, Pemasukan Barang & Pengeluaran Barang */}
          <LlbPenerbitanBulananSheetSwap onOpenFormulaModal={onOpenFormulaModal} />

          {/* Req 5: SLA Ketepatan Waktu Pelayanan Perdagangan & Industri */}
          <LlbSlaLayananCard onOpenFormulaModal={onOpenFormulaModal} />

          {/* Additional Datasets from Buku Satu Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LlbKuotaBarangKonsumsiCard onOpenFormulaModal={onOpenFormulaModal} />
            <LlbKbliKawasanCard onOpenFormulaModal={onOpenFormulaModal} />
          </div>
        </div>
      )}

      {/* View 2: REKAP PERIZINAN LLB INDUSTRI & PERDAGANGAN (Dataset No. 3) */}
      {effectiveTab === 'perizinan' && (
        <div className="space-y-4">
          <LlbPerizinanLlbCard onOpenFormulaModal={onOpenFormulaModal} />
        </div>
      )}

      {/* View 3: SHEET SWAP BULANAN (IUK, Pemasukan, Pengeluaran - Dataset No. 4, 6, 7) */}
      {(effectiveTab === 'bulanan_swap' || effectiveTab === 'swap' || effectiveTab === 'bulanan') && (
        <div className="space-y-4">
          <LlbPenerbitanBulananSheetSwap onOpenFormulaModal={onOpenFormulaModal} />
        </div>
      )}

      {/* View 4: KINERJA SLA WAKTU SELESAI TEPAT WAKTU (Dataset No. 8 & 9) */}
      {effectiveTab === 'sla' && (
        <div className="space-y-4">
          <LlbSlaLayananCard onOpenFormulaModal={onOpenFormulaModal} />
        </div>
      )}

      {/* View 5: REALISASI KUOTA INDUK KONSUMSI (Dataset No. 2) */}
      {effectiveTab === 'kuota' && (
        <div className="space-y-4">
          <LlbKuotaBarangKonsumsiCard onOpenFormulaModal={onOpenFormulaModal} />
        </div>
      )}

      {/* View 6: KBLI PERUSAHAAN KAWASAN & ALUR IZIN (Dataset No. 1 & 5) */}
      {effectiveTab === 'kbli' && (
        <div className="space-y-4">
          <LlbKbliKawasanCard onOpenFormulaModal={onOpenFormulaModal} />
        </div>
      )}

      {/* View 7: KAMUS DATA & RUMUS */}
      {(effectiveTab === 'kamus' || effectiveTab === 'kamus_rumus') && (
        <LlbKamusRumusView />
      )}
    </div>
  );
};
