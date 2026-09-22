export interface PesisirReklamasiFilterState {
  tahun: string;
  swp: string;
  jenisIzin: string; // ALL | Pesisir | Reklamasi
  statusPenyelesaian: string; // ALL | Tepat Waktu | Terlambat | Selesai | Proses
  searchQuery: string;
}

// DATASET NO. 1: Persentase Penyelesaian Permasalahan Pesisir dan Reklamasi
// Atribut PDF (Hal 13-14): DOKUMEN PENDUKUNG, WILAYAH, LUAS YANG DITERBITKAN, TRIWULAN, TAHUN
export interface PermasalahanPesisirItem {
  id: string;
  noPengaduan: string;
  judulKasus: string;
  lokasi: string;
  wilayah: string;
  swp: string;
  kategori: 'Pemanfaatan Tanpa Izin' | 'Pelanggaran Sempadan Pantai' | 'Pencemaran / Sedimentasi' | 'Sengketa Batas Laut' | 'Deviasi Amdal Reklamasi';
  namaPihakTerkait: string;
  luasDiterbitkanHa: number; // Luas yang Diterbitkan / Terdampak (Ha)
  luasTerdampakHa?: number; // Alias untuk visualisasi monitoring
  dokumenPendukung: string; // Atribut PDF: BAP Verifikasi Lapangan, SK Penghentian, Rekomendasi Teknis, dll.
  triwulan: 'Triwulan I' | 'Triwulan II' | 'Triwulan III' | 'Triwulan IV';
  tahun: number;
  tanggalLapor: string;
  status: 'Selesai' | 'Dalam Proses' | 'Investigasi Lapangan';
  solusiTindakan: string;
  lamaPenyelesaianHari: number;
}

// DATASET NO. 2: Rencana Pemanfaatan Wilayah Pesisir dan Reklamasi (Data Spasial)
// Atribut PDF (Hal 14): NAMA PERUSAHAAN, NOMOR IZIN PKKPRL, KOORDINAT, WILAYAH, STATUS KEGIATAN, LUAS, TAHUN PENERBITAN
export interface RencanaPemanfaatanPesisirItem {
  id: string;
  namaPerusahaan: string;
  nomorIzinPkkprl: string;
  koordinat: string;
  wilayah: string;
  swp: string;
  statusKegiatan: 'Rencana Reklamasi Timbunan' | 'Pembangunan Dermaga & Jetty' | 'Pengembangan Wisata Bahari' | 'Kawasan Industri Maritim Lepas Pantai' | 'Terminal Logistik Pelabuhan';
  zonaRencana?: string; // Alias kompatibilitas
  luasHa: number;
  luasM2: number;
  tahunPenerbitan: number;
  lokasiSpesifik: string;
  statusRencana: 'Terbit Rekomendasi Teknis' | 'Tahap Amdal & PKKPRL' | 'Konfirmasi Kesesuaian Ruang Laut';
}

// DATASET NO. 3: Persentase Perizinan Pesisir dan Reklamasi yang Selesai Tepat Waktu
// Atribut PDF (Hal 14): JUMLAH PERMOHONAN, TOTAL LUASAN, TAHUN
export interface RekapTahunanPerizinanItem {
  tahun: number;
  jumlahPermohonan: number;
  jumlahTepatWaktu: number;
  persentaseTepatWaktu: number;
  totalLuasanHa: number;
  totalLuasanDisetujuiHa: number;
}

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
  wilayah: string;
  swp: string;
  luasHa: number;
}

// DATASET NO. 4: Luas Izin Pemanfaatan Kawasan Pesisir dan Izin Reklamasi untuk Investasi
// Atribut PDF (Hal 14): NAMA PERUSAHAAN, NOMOR IZIN PKKPRL, KOORDINAT, WILAYAH, LUAS, TAHUN PENERBITAN
// CATATAN: Murni fokus pada LUAS (Ha / m²), TIDAK ADA NILAI INVESTASI sesuai mandat Satu Data PDF
export interface PemanfaatanInvestasiItem {
  id: string;
  namaPerusahaan: string;
  nomorIzinPkkprl: string;
  koordinat: string;
  wilayah: string;
  swp: string;
  luasHa: number;
  luasM2: number;
  tahun?: number; // Alias kompatibilitas tahun
  tahunPenerbitan: number;
  lokasiSpesifik: string;
  jenisIzin: 'Izin Reklamasi' | 'Izin Pemanfaatan Kawasan Pesisir' | 'Izin Terpadu Pesisir & Reklamasi';
  sektorIndustri: 'Galangan Kapal (Shipyard)' | 'Terminal Logistik / Pelabuhan' | 'Pariwisata & Resort Bahari' | 'Industri Manufaktur Lepas Pantai' | 'Energi & Pembangkit Listrik Pesisir';
  statusProgresFisik: 'Operasional Penuh' | 'Konstruksi / Reklamasi Berjalan' | 'Pematangan Lahan Reklamasi';
  progresPersen: number;
}

// KPI Executive Data (Fokus Luas & Kinerja Tanpa Nilai Investasi)
export interface KpiPesisirReklamasiSummary {
  kpi1_luasIzinInvestasiHa: number; // Dataset #4: Total Luas (Ha)
  kpi1_targetLuasHa: number;
  kpi1_totalIzinTerbit: number;
  kpi1_rataRataLuasHa: number;

  kpi2_persenTepatWaktu: number; // Dataset #3: % Selesai Tepat Waktu
  kpi2_totalPerizinanSelesai: number;
  kpi2_totalTepatWaktu: number;
  kpi2_totalTerlambat: number;
  kpi2_totalLuasanHa: number;
  kpi2_rataRataSlaHari: number;

  kpi3_persenPenyelesaianMasalah: number; // Dataset #1: % Penyelesaian Masalah
  kpi3_totalKasus: number;
  kpi3_kasusSelesai: number;
  kpi3_kasusProses: number;
  kpi3_totalLuasTerdampakHa: number;
  kpi3_rataRataWaktuSelesaiHari: number;

  // Dataset #2 Spasial Rencana
  kpi4_totalRencanaLuasHa: number;
  kpi4_totalRencanaTitik: number;

  reklamasiVsPesisirHa: {
    reklamasiHa: number;
    pesisirHa: number;
    reklamasiPersen: number;
    pesisirPersen: number;
  };
}
