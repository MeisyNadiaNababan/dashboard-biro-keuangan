export interface PesisirReklamasiFilterState {
  tahun: string;
  swp: string;
  jenisIzin: string; // ALL | Pesisir | Reklamasi
  statusPenyelesaian: string; // ALL | Tepat Waktu | Terlambat | Selesai | Proses
  searchQuery: string;
}

// DATASET NO. 1: Permasalahan Pesisir dan Reklamasi
export interface PermasalahanPesisirItem {
  id: string;
  noPengaduan: string;
  judulKasus: string;
  lokasi: string;
  swp: string;
  kategori: 'Pemanfaatan Tanpa Izin' | 'Pelanggaran Sempadan Pantai' | 'Pencemaran / Sedimentasi' | 'Sengketa Batas Laut' | 'Deviasi Amdal Reklamasi';
  namaPihakTerkait: string;
  luasTerdampakHa: number;
  tanggalLapor: string;
  status: 'Selesai' | 'Dalam Proses' | 'Investigasi Lapangan';
  solusiTindakan: string;
  lamaPenyelesaianHari: number;
}

// DATASET NO. 2: Rencana Pemanfaatan Wilayah Pesisir dan Reklamasi (Perusahaan, Luas, Tahun Penerbitan)
export interface RencanaPemanfaatanPesisirItem {
  id: string;
  namaPerusahaan: string;
  luasHa: number;
  luasM2: number;
  tahunPenerbitan: number;
  swp: string;
  lokasiSpesifik: string;
  zonaRencana: 'Zona Pelabuhan & Industri Maritim' | 'Zona Pariwisata Bahari' | 'Zona Logistik & Pergudangan Pesisir' | 'Zona KEK & Hub Maritim' | 'Zona Jasa & Komersial Maritim';
  statusRencana: 'Terbit Rekomendasi Teknis' | 'Tahap Amdal & PKKPRL' | 'Konfirmasi Kesesuaian Ruang Laut';
  targetRealisasiInvestasiRp: number; // Miliar Rupiah
}

// DATASET NO. 3: Perizinan Pesisir dan Reklamasi (Selesai Tepat Waktu)
export interface PerizinanPesisirWaktuItem {
  id: string;
  noIzin: string;
  namaPemohon: string;
  jenisIzin: 'Izin Pemanfaatan Ruang Pesisir' | 'Izin Pelaksanaan Reklamasi' | 'Persetujuan Kesesuaian PKKPRL' | 'Izin Pembangunan Dermaga / Jetty';
  tanggalPengajuan: string;
  tanggalPenyelesaian: string;
  targetSlaHari: number;
  realisasiHari: number;
  statusWaktu: 'Tepat Waktu' | 'Terlambat';
  statusIzin: 'Diterbitkan' | 'Revisi Pemohon' | 'Ditolak';
  swp: string;
}

// DATASET NO. 4: Pemanfaatan Kawasan Pesisir dan Izin Reklamasi untuk Investasi (Perusahaan, Luas, Tahun Penerbitan)
export interface PemanfaatanInvestasiItem {
  id: string;
  namaPerusahaan: string;
  luasHa: number;
  luasM2: number;
  tahun: number; // Tahun berjalan/operasional
  tahunPenerbitan: number; // Tahun izin diterbitkan
  jenisIzin: 'Izin Reklamasi' | 'Izin Pemanfaatan Kawasan Pesisir' | 'Izin Terpadu Pesisir & Reklamasi';
  swp: string;
  lokasiSpesifik: string;
  nilaiInvestasiMiliar: number;
  sektorIndustri: 'Galangan Kapal (Shipyard)' | 'Terminal Logistik / Pelabuhan' | 'Pariwisata & Resort Bahari' | 'Industri Manufaktur Lepas Pantai' | 'Energi & Pembangkit Listrik Pesisir';
  statusProgresFisik: 'Operasional Penuh' | 'Konstruksi / Reklamasi Berjalan' | 'Pematangan Lahan Reklamasi';
  progresPersen: number;
}

// KPI Executive Data
export interface KpiPesisirReklamasiSummary {
  kpi1_luasIzinInvestasiHa: number; // Dataset #4: Total Luas (Ha)
  kpi1_targetLuasHa: number;
  kpi1_totalIzinTerbit: number;
  kpi1_totalNilaiInvestasiT: number;

  kpi2_persenTepatWaktu: number; // Dataset #3: % Selesai Tepat Waktu
  kpi2_totalPerizinanSelesai: number;
  kpi2_totalTepatWaktu: number;
  kpi2_totalTerlambat: number;
  kpi2_rataRataSlaHari: number;

  kpi3_persenPenyelesaianMasalah: number; // Dataset #1: % Penyelesaian Masalah
  kpi3_totalKasus: number;
  kpi3_kasusSelesai: number;
  kpi3_kasusProses: number;
  kpi3_rataRataWaktuSelesaiHari: number;

  // Analitik & Monitoring Tambahan untuk Atasan (Poin 7)
  reklamasiVsPesisirHa: {
    reklamasiHa: number;
    pesisirHa: number;
    reklamasiPersen: number;
    pesisirPersen: number;
  };
}
