export interface PelayananUmumFilterState {
  selectedYear: string;
  selectedMonth: string;
  selectedQuarter: string;
  selectedUnit: string; // 'ALL' | 'bu-rumah-sakit' | 'dit-pam-aset' | 'bu-spam-fasling'
  selectedStatus: string; // 'ALL' | 'healthy' | 'monitor' | 'attention'
  viewMode: 'ikhtisar' | 'finansial' | 'operasional' | 'deep_dive' | 'satu_data';
}

export interface PerkinA6KpiItem {
  id: string;
  nomor: number;
  kode: string;
  indikator: string;
  program: string;
  sasaranProgram?: string;
  penjelasanOperasional?: string;
  tujuan?: string;
  polarisasi?: string;
  periodePelaporan?: string;
  jenisKonsolidasi?: string;
  targetDisplay: string;
  targetNumeric: number;
  realisasiDisplay: string;
  realisasiNumeric: number;
  satuan: string;
  persenCapaian: number;
  status: 'healthy' | 'monitor' | 'attention' | 'critical';
  statusLabel: string;
  formula: string;
  sumberData: string;
  deskripsi: string;
  komponenUnit: {
    unit: string;
    target: number;
    realisasi: number;
    persen: number;
    satuan: string;
    subLabel?: string;
  }[];
}

export interface FinancialTowerRow {
  unitId: string;
  namaUnit: string;
  singkatan: string;
  kategori: string;
  jenisUnit: 'Badan Usaha (BLU)' | 'Direktorat (Cost Center)';
  budgetCapClass: string;
  paguBelanjaMiliar: number;
  realisasiBelanjaMiliar: number;
  serapanPersen: number;
  sisaBelanjaMiliar: number;
  targetPnbpMiliar: number;
  realisasiPnbpMiliar: number;
  capaianPnbpPersen: number;
  surplusDefisitMiliar: number; // Realisasi PNBP - Realisasi Belanja
  costRecoveryRate: number; // Realisasi PNBP / Realisasi Belanja * 100%
  status: 'healthy' | 'monitor' | 'attention';
  statusLabel?: string;
  catatanFiskal?: string;
}

export interface OperationalUnitPillar {
  title: string;
  badge?: string;
  metrics: { label: string; value: string; sub?: string }[];
}

export interface OperationalUnitSummary {
  unitId: string;
  namaUnit: string;
  singkatan: string;
  iconName: string;
  tipeEntitas: string;
  status: 'healthy' | 'monitor' | 'attention';
  statusLabel: string;
  coreRole: string;
  quickStats: {
    label: string;
    value: string;
    subLabel: string;
    trend: string;
  }[];
  pillars: OperationalUnitPillar[];
  operationalHighlights: string[];
  pdfPages: string;
  totalDatasetSatuData: number;
}

export interface ActiveAlertItem {
  id: string;
  unit: string;
  level: 'critical' | 'warning' | 'info';
  judul: string;
  deskripsi: string;
  waktu: string;
  actionRequired: string;
}

export interface DeputyAiControlBrief {
  id: number;
  unit: string;
  analisis: string;
  rekomendasi: string;
  dampakStrategis: string;
}

export interface DeepDiveUnitProfile {
  unitId: string;
  code: string;
  name: string;
  pejabatPimpinan: string;
  peranStrategis: string;
  paguBelanja: string;
  realisasiBelanja: string;
  serapanBelanja: string;
  targetPnbp: string;
  realisasiPnbp: string;
  capaianPnbp: string;
  ikmSkor: number;
  ikmMutu: string;
  topMetrics: {
    label: string;
    value: string;
    desc: string;
    trend: string;
  }[];
  highlightOperasional: string[];
  isuKritis: string[];
  rencanaAksiStrategis: string[];
  datasetAtributSatuData: {
    no: number;
    namaData: string;
    periode: string;
    sifatData: string;
    kunciAtribut: string[];
  }[];
}
