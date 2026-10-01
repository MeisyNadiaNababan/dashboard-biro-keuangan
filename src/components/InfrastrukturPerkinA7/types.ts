export interface PerkinA7Metadata {
  nomorPerkin: string;
  tanggalPenetapan: string;
  tahunAnggaran: string;
  pihakPertama: {
    nama: string;
    jabatan: string;
    nip: string;
  };
  pihakKedua: {
    nama: string;
    jabatan: string;
    nip: string;
  };
  sasaranProgram: string;
  totalAnggaran: string;
  totalAnggaranRupiah: number;
  realisasiAnggaran: string;
  realisasiAnggaranRupiah: number;
  persenRealisasiAnggaran: number;
  totalPnbpTarget: string;
  totalPnbpTargetRupiah: number;
  totalPnbpRealisasi: string;
  totalPnbpRealisasiRupiah: number;
  persenPnbpRealisasi: number;
}

export interface PerkinA7KpiItem {
  id: string;
  number: number;
  code: string;
  name: string;
  fullName: string;
  sasaranProgram?: string;
  statusKinerja?: string;
  satkerShort?: string;
  programTarget: number;
  programTargetLabel: string;
  realization: number;
  realizationLabel: string;
  achievement: number; // Persentase capaian (%)
  unit: string;
  status: 'Melampaui Target' | 'Sesuai Target' | 'Perlu Perhatian' | 'Kritis';
  statusColor: string;
  unitPengampu: string;
  datasetSumber: string;
  halamanPdf: string;
  formula: string;
  tableauCalculation: string;
  deskripsi: string;
  catatanKinerja: string;
  triwulanTrend?: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    targetQ: number;
  };
}

export interface FilterPerkinA7State {
  selectedYear: '2025' | '2026';
  selectedQuarter: 'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4';
  selectedSatker: 'ALL' | 'dit-perencanaan-infrastruktur' | 'dit-pembangunan-infrastruktur' | 'dit-pam-aset';
  selectedStatus: 'ALL' | 'ahead' | 'on_schedule' | 'critical';
  viewMode: 'ikhtisar' | 'visual' | 'units' | 'deep-dive' | 'word-doc';
}
