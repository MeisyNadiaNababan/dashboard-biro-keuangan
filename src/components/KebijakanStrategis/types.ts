export interface KebijakanStrategisFilterState {
  selectedYear: string;
  selectedMonth: string;
  selectedQuarter: string;
  selectedUnit: string;
  selectedSektor: string;
  viewMode: 'ikhtisar' | 'kpi_visual' | 'unit_kinerja' | 'deep_dive' | 'satu_data';
}

export interface IkpMetricItem {
  id: string;
  number: number;
  code: string;
  title: string;
  target: number;
  realisasi: number;
  satuan: string;
  polarisasi: 'Maximize' | 'Minimize';
  periodePelaporan: string;
  sumberData: string;
  unitKerja: string;
  unitId: string;
  paguKegiatan: number;
  kegiatanNama: string;
  predikat: string;
  predikatColor: 'emerald' | 'blue' | 'amber' | 'indigo';
  capaianPersen: number;
  statusKinerja: 'On Target' | 'Exceeded' | 'Watch' | 'Critical';
  keterangan: string;
  formulaRingkas: string;
}

export interface SektorPerizinanItem {
  sektor: string;
  kode: string;
  volume: number;
  terbit: number;
  proses: number;
  revisi: number;
  tolak: number;
  slaPercent: number;
  targetSla: number;
  avgLeadTimeHari: number;
  backlog: number;
  status: 'optimal' | 'warning' | 'critical';
}

export interface DomainSpbeItem {
  domain: string;
  skor: number;
  target: number;
  bobot: number;
  kategori: string;
  indikatorKunci: string[];
}

export interface DimensiIkkItem {
  dimensi: string;
  bobot: number;
  skor: number;
  target: number;
  capaian: number;
  tahapan: string[];
}

export interface MasterplanProgressItem {
  nama: string;
  kode: string;
  kategori: string;
  progresPersen: number;
  targetTahun: number;
  anggaran: number;
  status: 'Selesai' | 'On Track' | 'Review';
}

export interface SatuDatasetItem {
  no: number;
  unit: string;
  unitId: string;
  namaData: string;
  jenisData: string;
  periodeData: string;
  sifatData: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  atributUtama: string[];
  halamanPdf: string;
}
