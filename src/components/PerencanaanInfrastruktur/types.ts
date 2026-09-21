export type SektorPerencanaan =
  | 'Gedung'
  | 'Utilitas dan Drainase'
  | 'Fasilitas Wisata dan Lingkungan'
  | 'Pertanaman dan Penghijauan'
  | 'Darat'
  | 'Laut dan Udara';

export type StatusKesiapanDED =
  | 'Studi Kelayakan / FS'
  | 'Penyusunan DED & RAB'
  | 'Review & Asistensi Teknis'
  | 'Selesai (Siap Lelang Fisik)';

export type StatusUtilisasiFisik =
  | 'Telah Masuk Lelang Fisik TA 2025'
  | 'Dianggarkan Renja TA 2026'
  | 'Tahap Review Kelayakan Lahan'
  | 'Antrean Alokasi Anggaran';

export interface PaketPerencanaan {
  id: string;
  kodePaket: string;
  namaKegiatan: string;
  sektor: SektorPerencanaan;
  datasetNo: 1 | 2 | 3 | 4 | 5 | 6;
  datasetName: string;
  tahunAnggaran: string;
  lokasiKawasan: string;
  sumberDana: 'PNBP BP Batam' | 'APBN' | 'KPBU / Mitra';
  paguKonsultansi: number; // in Rupiah
  estimasiCapexFisik: number; // in Rupiah (proyeksi biaya konstruksi hasil DED)
  konsultanPerencana: string;
  waktuPelaksanaanBulan: number;
  progresPenyusunanPersen: number;
  statusKesiapan: StatusKesiapanDED;
  statusUtilisasi: StatusUtilisasiFisik;
  readinessScore: number; // 0 - 100
  ringkasanTeknis: string;
  outputDokumen: string[];
  kendalaDanCatatan: string;
  rekomendasiAtasan: string;
}

export interface PerencanaanFilterState {
  tahun: string;
  sektor: string;
  statusKesiapan: string;
  statusUtilisasi: string;
  wilayah: string;
  searchQuery: string;
}

export interface KpiSektorSummary {
  sektor: SektorPerencanaan;
  datasetNo: number;
  datasetTitle: string;
  iconName: string;
  totalPaket: number;
  totalPaguDED: number;
  totalEstimasiCapexFisik: number;
  waktuPelaksanaanAvgBulan: number; // Rata-rata Waktu Pelaksanaan Penyusunan DED (Bulan)
  persenSelesaiSiapLelang: number;
  paketSiapLelangCount: number;
  paketDalamProsesCount: number;
  readinessAvg: number;
  deskripsi: string;
}

export interface StageGateFunnelItem {
  stage: StatusKesiapanDED;
  count: number;
  percentage: number;
  totalCapexMiliar: number;
  description: string;
  color: string;
}

export interface PemanfaatanDokumenItem {
  datasetNo: 7 | 8 | 9;
  kategori: 'Bangunan' | 'Infrastruktur Perhubungan' | 'Lingkungan';
  namaDataset: string;
  persentasePemanfaatan: number; // Persentase Pemanfaatan (%)
  nilaiDedDimanfaatkan: number; // Nilai DED yang Dimanfaatkan (Rp)
  totalNilaiDed: number; // Total Nilai DED (Rp)
  tahunPembuatanDed: string; // Tahun Pembuatan DED
  jumlahUnitPengguna: number; // Jumlah Unit Pengguna DED
  daftarUnitPengguna: string[]; // Rincian nama unit/instansi pengguna
  sifatData: 'TERBUKA';
  keterangan: string;
}
