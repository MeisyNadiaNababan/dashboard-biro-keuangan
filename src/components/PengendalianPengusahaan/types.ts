export interface PengendalianFilterState {
  tahun: string;
  sektor: string;
  skemaKerjasama: string;
  statusKepatuhan: string;
  statusTindakLanjut: string;
  searchQuery: string;
}

export type SkemaKerjasama = 'KSO' | 'BTO / BOT' | 'Sewa Aset' | 'Kontrak Manajemen' | 'Konsesi';

export type StatusKepatuhan = 'Sangat Patuh' | 'Patuh Bersyarat' | 'Pengawasan Khusus';

export type StatusTindakLanjut = 'Selesai Ditindaklanjuti' | 'Dalam Proses Amandemen' | 'Menunggu Verifikasi Mitra' | 'Keterlambatan Komitmen';

export interface MitraKerjasama {
  id: string;
  nomorPks: string;
  judulPerjanjian: string;
  namaMitra: string;
  badanUsahaTerkait: string; // BU Pelabuhan, BU Bandara, BU SPAM, BU Fasilitas/Komersial, dll
  skemaKerjasama: SkemaKerjasama;
  tahunMulai: string;
  tahunBerakhir: string;
  nilaiInvestasiMitra: number; // Miliar Rupiah
  targetSharingRevenueTahunan: number; // Miliar Rupiah
  realisasiSharingRevenueTahunan: number; // Miliar Rupiah
  
  // Indikator Dataset #3: Pelaksanaan & Pengendalian Pengusahaan
  statusPengendalian: 'Terlaksana Penuh' | 'Terlaksana Sebagian' | 'Jadwal Ulang';
  skorKepatuhanOperasional: number; // 0 - 100%
  statusKepatuhan: StatusKepatuhan;
  jadwalInspeksiTerakhir: string;
  jumlahAuditEvaluasi: number;

  // Indikator Dataset #4: Hasil Perbaikan & Perubahan yang Ditindaklanjuti
  jumlahRekomendasiPerbaikan: number;
  jumlahRekomendasiSelesai: number;
  persentaseTindakLanjut: number; // % (dataset 4)
  statusTindakLanjut: StatusTindakLanjut;
  statusAddendum: 'Tidak Ada Revisi' | 'Addendum Selesai Diterbitkan' | 'Legal Drafting' | 'Negosiasi Syarat Fiskal';
  catatanStrategis: string;
}

export interface KpiPengendalianDataset {
  nomorDataset: number;
  namaDataset: string;
  label: string;
  capaian: number; // Nilai persentase atau jumlah
  target: number;
  satuan: string;
  trend: string;
  status: 'optimal' | 'waspada' | 'kritis';
  deskripsi: string;
  formula: string;
  sumberData: string;
}
