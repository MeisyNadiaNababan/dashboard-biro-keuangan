import React, { useState } from 'react';
import {
  Stethoscope,
  DollarSign,
  TrendingUp,
  Activity,
  Users,
  Building2,
  FileText,
  FileCode2,
  Pill,
} from 'lucide-react';
import { RumahSakitFilters } from './RumahSakitFilters';
import { RumahSakitKpiRow } from './RumahSakitKpiRow';
import { RumahSakitPnbpBelanjaCard } from './RumahSakitPnbpBelanjaCard';
import { RumahSakitKunjunganLayananCard } from './RumahSakitKunjunganLayananCard';
import { RumahSakitEfisiensiCard } from './RumahSakitEfisiensiCard';
import { RumahSakitSewaTenantCard } from './RumahSakitSewaTenantCard';
import { RumahSakitMorbiditasObatCard } from './RumahSakitMorbiditasObatCard';
import { RumahSakitKamusRumusView } from './RumahSakitKamusRumusView';
import { RumahSakitKpiWordDocView } from './RumahSakitKpiWordDocView';
import {
  RumahSakitFilterState,
  RS_KEUANGAN_SUMMARY,
  RS_IKM_TOTAL,
  RS_KUNJUNGAN_TOTAL,
  RS_TENANT_SEWA,
} from '../../data/rumahSakitData';

interface RumahSakitDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const RumahSakitDashboard: React.FC<RumahSakitDashboardProps> = ({
  activeSubTab = 'ikhtisar',
  onOpenFormulaModal,
}) => {
  const [filters, setFilters] = useState<RumahSakitFilterState>({
    tahun: 2026,
    periodeBulan: 'ALL',
    bagianLayanan: 'ALL',
    caraBayar: 'ALL',
    statusTenant: 'ALL',
  });

  const handleFilterChange = (newFilters: Partial<RumahSakitFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 2026,
      periodeBulan: 'ALL',
      bagianLayanan: 'ALL',
      caraBayar: 'ALL',
      statusTenant: 'ALL',
    });
  };

  // 1. SUBTAB: DOKUMEN KPI WORD (.DOC)
  if (activeSubTab === 'kpi_word_doc') {
    return <RumahSakitKpiWordDocView />;
  }

  // 2. SUBTAB: KAMUS RUMUS & 18 DATASET KATALOG
  if (activeSubTab === 'kamus_rumus') {
    return <RumahSakitKamusRumusView />;
  }

  // 3. SUBTAB: KEUANGAN (PNBP & BELANJA)
  if (activeSubTab === 'keuangan') {
    return (
      <div className="space-y-3.5">
        <RumahSakitFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <RumahSakitPnbpBelanjaCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  // 4. SUBTAB: KUNJUNGAN & LAYANAN UNGGULAN
  if (activeSubTab === 'kunjungan') {
    return (
      <div className="space-y-3.5">
        <RumahSakitFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <RumahSakitKunjunganLayananCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  // 5. SUBTAB: INDIKATOR EFISIENSI (BARBER JOHNSON)
  if (activeSubTab === 'efisiensi') {
    return (
      <div className="space-y-3.5">
        <RumahSakitFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <RumahSakitEfisiensiCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  // 6. SUBTAB: SEWA RUANGAN TENANT
  if (activeSubTab === 'sewa') {
    return (
      <div className="space-y-3.5">
        <RumahSakitFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <RumahSakitSewaTenantCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  // 7. SUBTAB: MORBIDITAS & OBAT
  if (activeSubTab === 'penyakit_obat') {
    return (
      <div className="space-y-3.5">
        <RumahSakitFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <RumahSakitMorbiditasObatCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  // DEFAULT VIEW: IKHTISAR EKSEKUTIF BADAN USAHA RUMAH SAKIT
  return (
    <div id="rsbp-dashboard" className="space-y-3.5 font-sans">
      {/* 1. Filter Panel */}
      <RumahSakitFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* 2. Top Executive 4 Core KPI Row */}
      <RumahSakitKpiRow
        realisasiPnbpMiliar={RS_KEUANGAN_SUMMARY.totalRealisasiPnbpMiliar}
        targetPnbpMiliar={RS_KEUANGAN_SUMMARY.totalTargetPnbpMiliar}
        realisasiBelanjaMiliar={RS_KEUANGAN_SUMMARY.totalRealisasiBelanjaMiliar}
        paguBelanjaMiliar={RS_KEUANGAN_SUMMARY.totalPaguBelanjaMiliar}
        nilaiIkm={RS_IKM_TOTAL}
        totalKunjunganPasien={RS_KUNJUNGAN_TOTAL}
        nilaiBor={74.2}
        jumlahTenant={RS_TENANT_SEWA.length}
        onExplainKpi={onOpenFormulaModal}
      />

      {/* 3. Primary Analytical Grid (Kunjungan & Efisiensi Barber Johnson Berdampingan) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {/* Visual 1: Rekap Kunjungan Pasien per Bagian Layanan (DS 5) & Unggulan (DS 6) */}
        <RumahSakitKunjunganLayananCard onOpenFormulaModal={onOpenFormulaModal} />

        {/* Visual 2: Nilai Indikator Efisiensi Barber Johnson (DS 9) */}
        <RumahSakitEfisiensiCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>

      {/* 4. Secondary Analytical Grid (Sewa Ruangan Tenant Komersial) */}
      <div className="grid grid-cols-1 gap-3.5">
        {/* Visual 3: Rekap Sewa Ruangan Rumah Sakit (DS 14) */}
        <RumahSakitSewaTenantCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    </div>
  );
};
