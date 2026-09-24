// Data Resmi Perjanjian Kinerja Tahun 2026
// Nomor: 1/SPJ/KA/1/2026
// Pejabat: Amsakar Achmad - Kepala Badan Pengusahaan Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam
// Batam, 30 Januari 2026

export interface ProgramAnggaranPerkin {
  id: number;
  namaProgram: string;
  paguAnggaran: number; // Rupiah
  realisasiAnggaran: number; // Rupiah
  persenSerapan: number;
  penanggungJawab: string;
}

export interface IksPerkinItem {
  id: string;
  nomor: number;
  sasaranStrategis: string;
  indikatorKinerjaStrategis: string;
  target: string;
  targetNumeric: number;
  satuan: string;
  realisasiYtd: number;
  persenCapaian: number;
  statusCapaian: 'Tercapai' | 'On Track' | 'Perlu Perhatian';
  predikat: string;
  formulaRingkas: string;
  sumberData: string;
  periodePelaporan: 'Triwulan/Tahunan' | 'Tahunan' | 'Triwulan';
  polarisasi: 'Maximize';
  jenisKonsolidasi: 'Take Last Known (Akumulasi Jan s.d Des)';
  deskripsi: string;
}

export interface TrenInvestasiTahunan {
  tahun: number;
  target: number; // Triliun Rupiah
  realisasiTotal: number; // Triliun Rupiah
  modalTetap: number; // Triliun Rupiah (KPU Bea Cukai)
  modalLancar: number; // Triliun Rupiah (KPU BC & BPS)
  pma: number; // Triliun Rupiah
  pmdn: number; // Triliun Rupiah
  jumlahProyek: number;
  tenagaKerja: number; // Jiwa
}

export interface KontribusiInvestasiKek {
  kawasan: string;
  tipe: 'KEK' | 'Non-KEK (KPBPB)';
  target2026: number; // Miliar Rupiah
  realisasi2026: number; // Miliar Rupiah
  persen: number;
  proyek: number;
  bidang: string;
  status: string;
}

export interface LokusIkmItem {
  no: number;
  lokus: string;
  namaLokus: string;
  target: number;
  skorIkm: number;
  mutuPelayanan: 'A' | 'B' | 'C' | 'D';
  predikat: 'Sangat Baik' | 'Baik' | 'Kurang Baik' | 'Tidak Baik';
  jumlahResponden: number;
  persenResponSangatPuas: number;
  unsurTerlemah: string;
  unsurTerkuat: string;
}

export interface PnbpSatkerPenghasil {
  no: number;
  namaSatker: string;
  kategori: 'Unit Kerja Penghasil' | 'Badan Usaha';
  targetPnbpJuta: number; // Juta Rupiah (Sesuai Tabel Halaman 5 PDF)
  targetPersen: number; // % terhadap total 2,447 T
  realisasiPnbpJuta: number; // Juta Rupiah YTD
  persenCapaian: number; // %
  keterangan: string;
}

export interface ReformasiBirokrasiArea {
  kode: string;
  aspek: string;
  bobot: number;
  targetNilai: number;
  capaianNilai: number;
  predikat: string;
  fokusImplementasi: string;
}

// 1. DOKUMEN PERJANJIAN KINERJA KEPALA BP 2026
export const DOKUMEN_PERKIN_KEPALA = {
  nomor: '1/SPJ/KA/1/2026',
  tahun: 2026,
  namaKepala: 'Amsakar Achmad',
  jabatan: 'Kepala Badan Pengusahaan Kawasan Perdagangan Bebas Dan Pelabuhan Bebas Batam',
  tanggalPenetapan: '30 Januari 2026',
  tempat: 'Batam',
  pernyataan:
    'Dalam rangka mewujudkan manajemen pemerintahan yang efektif, transparan dan akuntabel serta berorientasi pada hasil, kami berjanji akan mewujudkan target kinerja yang seharusnya sesuai lampiran perjanjian ini, dalam rangka mencapai target kinerja jangka menengah seperti yang telah ditetapkan dalam dokumen perencanaan.',
};

// 2. DUA PROGRAM UTAMA & ANGGARAN (HALAMAN 2 PDF)
export const PROGRAM_ANGGARAN_PERKIN: ProgramAnggaranPerkin[] = [
  {
    id: 1,
    namaProgram: 'Program Pengembangan Kawasan Strategis',
    paguAnggaran: 1428920480000, // Rp 1.428.920.480.000,-
    realisasiAnggaran: 1091695246720,
    persenSerapan: 76.4,
    penanggungJawab: 'Dit. Pembangunan Infrastruktur, Dit. Pelabuhan, Dit. Bandara, Dit. KEK & Lahan',
  },
  {
    id: 2,
    namaProgram: 'Program Dukungan Manajemen',
    paguAnggaran: 1099028050000, // Rp 1.099.028.050.000,-
    realisasiAnggaran: 870430215600,
    persenSerapan: 79.2,
    penanggungJawab: 'Biro Keuangan, Biro SDM, Biro Umum, BOKMR, Biro Hukum, dan PDSI',
  },
];

export const TOTAL_PAGU_ANGGARAN_PERKIN = 2527948530000; // Rp 2.527.948.530.000,-

// 3. EMPAT INDIKATOR KINERJA STRATEGIS (IKS) - SESUAI MANUAL HALAMAN 2 - 6
export const EMPAT_IKS_KEPALA_BP: IksPerkinItem[] = [
  {
    id: 'iks-1',
    nomor: 1,
    sasaranStrategis: 'Meningkatnya Realisasi Investasi di KPBPB Batam',
    indikatorKinerjaStrategis: 'Nilai Realisasi Investasi di KPBPB Batam',
    target: 'Rp. 70 T',
    targetNumeric: 70.0, // Triliun
    satuan: 'Triliun Rupiah',
    realisasiYtd: 54.68, // Triliun
    persenCapaian: 78.11,
    statusCapaian: 'On Track',
    predikat: 'Sangat Baik (Proyeksi Akhir Tahun 72.4 T / 103.4%)',
    formulaRingkas: 'Modal Tetap (KPU Bea Cukai) + Modal Lancar (KPU Bea Cukai + BPS Kota Batam)',
    sumberData:
      'Direktorat Pengembangan KPBPB Batam dan KEK, Kantor Pelayanan Utama Bea dan Cukai Batam, dan Badan Pusat Statistik Kota Batam',
    periodePelaporan: 'Triwulan/Tahunan',
    polarisasi: 'Maximize',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Jan s.d Des)',
    deskripsi:
      'Jumlah keseluruhan investasi yang masuk ke KPBPB Batam berupa Modal Tetap dan Modal Lancar dari PMA dan PMDN dalam periode satu tahun dibandingkan target Rp 70 T.',
  },
  {
    id: 'iks-2',
    nomor: 2,
    sasaranStrategis: 'Meningkatnya Kualitas Pengelolaan Kawasan dan Pelayanan Umum BP Batam',
    indikatorKinerjaStrategis: 'Indeks Kepuasan Masyarakat Pengguna Layanan Umum dan Kawasan',
    target: '88,00',
    targetNumeric: 88.0,
    satuan: 'Skala 1 - 100',
    realisasiYtd: 88.42,
    persenCapaian: 100.48,
    statusCapaian: 'Tercapai',
    predikat: 'Sangat Baik (Mutu Pelayanan A / Mempedomani PermenPAN-RB No. 14/2017)',
    formulaRingkas: 'Rerata Tertimbang 9 Unsur SKM pada 5 Lokus Layanan Utama BP Batam',
    sumberData: 'Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)',
    periodePelaporan: 'Tahunan',
    polarisasi: 'Maximize',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Jan s.d Des)',
    deskripsi:
      'Hasil pengukuran survei kepuasan masyarakat skala 1-100 pada 5 lokus: PTSP, BUP Pelabuhan, Pengelolaan Pertanahan, BURS RSBP, dan BU SPAM/Fasling/Rusun.',
  },
  {
    id: 'iks-3',
    nomor: 3,
    sasaranStrategis: 'Meningkatnya Kualitas Pengelolaan Kawasan dan Pelayanan Umum BP Batam',
    indikatorKinerjaStrategis: 'Nilai Realisasi PNBP BP Batam',
    target: '2,447 T',
    targetNumeric: 2447.788, // Miliar (2.447.788 Juta Rp)
    satuan: 'Triliun Rupiah',
    realisasiYtd: 1892.45, // Miliar (Rp 1,892 T)
    persenCapaian: 77.31,
    statusCapaian: 'On Track',
    predikat: 'Sangat Baik (Proyeksi 2,510 T / 102.5%)',
    formulaRingkas: 'Σ(Realisasi PNBP 2026 10 Unit Kerja) / Σ(Target PNBP 2026 Rp 2,447 T) × 100%',
    sumberData: 'Biro Keuangan BP Batam',
    periodePelaporan: 'Triwulan',
    polarisasi: 'Maximize',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Jan s.d Des)',
    deskripsi:
      'Pendapatan imbalan layanan masyarakat BLU (jasa pelabuhan, bandara, sewa tanah UWT, air SPAM, rusun, RSBP, dsb) tidak termasuk RM APBN. Target Renstra Rp 2,447 T.',
  },
  {
    id: 'iks-4',
    nomor: 4,
    sasaranStrategis: 'Terwujudnya Pengelolaan Organisasi BP Batam yang Efektif, Efisien dan Akuntabel',
    indikatorKinerjaStrategis: 'Indeks Reformasi Birokrasi',
    target: '80 (BB / Sangat Baik)',
    targetNumeric: 80.0,
    satuan: 'Skor Indeks (Skala 100)',
    realisasiYtd: 81.35,
    persenCapaian: 101.69,
    statusCapaian: 'Tercapai',
    predikat: 'Memuaskan (Predikat A / Mengacu SE MenPAN-RB No. 6/2025)',
    formulaRingkas: 'Penilaian Mandiri & Verifikasi KemenPAN-RB atas RB General & RB Tematik BP Batam',
    sumberData: 'Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)',
    periodePelaporan: 'Triwulan',
    polarisasi: 'Maximize',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Jan s.d Des)',
    deskripsi:
      'Tingkat keberhasilan reformasi tata kelola institusi, transparansi, akuntabilitas SAKIP, maturitas SPIP, digitalisasi SPBE, dan dampak kemiskinan/investasi.',
  },
];

// 4. DATASET IKS-1: TREN REALISASI INVESTASI TAHUN KE TAHUN (2020 - 2026)
export const TREN_INVESTASI_TAHUNAN: TrenInvestasiTahunan[] = [
  {
    tahun: 2020,
    target: 35.0,
    realisasiTotal: 34.2,
    modalTetap: 22.4,
    modalLancar: 11.8,
    pma: 24.6,
    pmdn: 9.6,
    jumlahProyek: 1120,
    tenagaKerja: 14200,
  },
  {
    tahun: 2021,
    target: 40.0,
    realisasiTotal: 41.5,
    modalTetap: 27.8,
    modalLancar: 13.7,
    pma: 29.8,
    pmdn: 11.7,
    jumlahProyek: 1285,
    tenagaKerja: 16800,
  },
  {
    tahun: 2022,
    target: 48.0,
    realisasiTotal: 50.4,
    modalTetap: 33.6,
    modalLancar: 16.8,
    pma: 36.2,
    pmdn: 14.2,
    jumlahProyek: 1490,
    tenagaKerja: 19400,
  },
  {
    tahun: 2023,
    target: 56.0,
    realisasiTotal: 58.7,
    modalTetap: 38.9,
    modalLancar: 19.8,
    pma: 42.1,
    pmdn: 16.6,
    jumlahProyek: 1640,
    tenagaKerja: 22800,
  },
  {
    tahun: 2024,
    target: 63.0,
    realisasiTotal: 65.2,
    modalTetap: 43.1,
    modalLancar: 22.1,
    pma: 46.8,
    pmdn: 18.4,
    jumlahProyek: 1810,
    tenagaKerja: 26300,
  },
  {
    tahun: 2025,
    target: 67.0,
    realisasiTotal: 68.8,
    modalTetap: 45.4,
    modalLancar: 23.4,
    pma: 49.3,
    pmdn: 19.5,
    jumlahProyek: 1950,
    tenagaKerja: 28900,
  },
  {
    tahun: 2026,
    target: 70.0, // TARGET RESMI PERKIN
    realisasiTotal: 54.68, // Realisasi Berjalan Q1-Q3
    modalTetap: 36.25,
    modalLancar: 18.43,
    pma: 39.42,
    pmdn: 15.26,
    jumlahProyek: 1620,
    tenagaKerja: 24150,
  },
];

// DATASET IKS-1: KONTRIBUSI KAWASAN KEK & NON-KEK DI KPBPB BATAM (SUMBER DIT. KEK)
export const KONTRIBUSI_KEK_KPBPB: KontribusiInvestasiKek[] = [
  {
    kawasan: 'KEK Batam Aero Technic (BAT)',
    tipe: 'KEK',
    target2026: 2800,
    realisasi2026: 2240,
    persen: 80.0,
    proyek: 14,
    bidang: 'MRO Pesawat, Komponen Turbin, & Hanggar Aviasi',
    status: 'Beroperasi Komersial',
  },
  {
    kawasan: 'KEK Nongsa Digital Park (NDP)',
    tipe: 'KEK',
    target2026: 4200,
    realisasi2026: 3580,
    persen: 85.2,
    proyek: 26,
    bidang: 'Data Center Tier III/IV, Animasi, Software & AI Hub',
    status: 'Beroperasi Komersial',
  },
  {
    kawasan: 'KEK Pariwisata & Kesehatan Internasional Batam (Sekupang)',
    tipe: 'KEK',
    target2026: 1800,
    realisasi2026: 1390,
    persen: 77.2,
    proyek: 8,
    bidang: 'Hospitality Medis, Spesialisasi Jantung & Wisata Kesehatan',
    status: 'Tahap Konstruksi & Operasional Sebagian',
  },
  {
    kawasan: 'KEK Tanjung Sauh (Pelepasan Gas & Logistik Energi)',
    tipe: 'KEK',
    target2026: 2200,
    realisasi2026: 1880,
    persen: 85.5,
    proyek: 5,
    bidang: 'Pelabuhan Transhipment, Industri Hilirisasi & Pembangkit Listrik',
    status: 'Tahap Penetapan & Pembangunan Kawasan',
  },
  {
    kawasan: 'Kawasan Industri Mukakuning & Batamindo',
    tipe: 'Non-KEK (KPBPB)',
    target2026: 18500,
    realisasi2026: 15120,
    persen: 81.7,
    proyek: 112,
    bidang: 'Semikonduktor, Komponen Elektronik & Otomasi',
    status: 'Kawasan Industri Terpadu KPBPB',
  },
  {
    kawasan: 'Kawasan Maritim Galangan Kapal Batu Ampar & Tanjung Uncang',
    tipe: 'Non-KEK (KPBPB)',
    target2026: 16500,
    realisasi2026: 12840,
    persen: 77.8,
    proyek: 84,
    bidang: 'Galangan Kapal, Offshore Rig, & Konstruksi Fabrikasi Baja',
    status: 'Kawasan Industri Maritim KPBPB',
  },
  {
    kawasan: 'Kawasan Kabil Integrated Industrial Estate & Citra Buana',
    tipe: 'Non-KEK (KPBPB)',
    target2026: 14000,
    realisasi2026: 10980,
    persen: 78.4,
    proyek: 76,
    bidang: 'Pipa Migas, Logistik Alat Berat, Kimia & Pergudangan Modern',
    status: 'Kawasan Industri Terpadu KPBPB',
  },
  {
    kawasan: 'Zona Perdagangan Bebas, Pariwisata & Jasa Komersial Kota',
    tipe: 'Non-KEK (KPBPB)',
    target2026: 10000,
    realisasi2026: 6650,
    persen: 66.5,
    proyek: 142,
    bidang: 'Perhotelan, Mall, Residensial, & Layanan Perdagangan Bebas',
    status: 'Zona Jasa & Komersial KPBPB',
  },
];

// DATASET SEKTOR INVESTASI UNGGULAN
export const SEKTOR_INVESTASI_DATA = [
  { nama: 'Elektronik & Semikonduktor', nilaiT: 19.8, persen: 36.2, warna: '#2563EB', naker: 9800 },
  { nama: 'Pusat Data & Infrastruktur Digital', nilaiT: 10.4, persen: 19.0, warna: '#7C3AED', naker: 2450 },
  { nama: 'Galangan Kapal & Offshore Maritim', nilaiT: 8.9, persen: 16.3, warna: '#059669', naker: 6100 },
  { nama: 'Mesin Presisi & Alat Berat', nilaiT: 6.2, persen: 11.3, warna: '#D97706', naker: 2850 },
  { nama: 'Pariwisata & Hospitaliti Medis', nilaiT: 5.1, persen: 9.3, warna: '#DB2777', naker: 1750 },
  { nama: 'Industri Kimia, Farmasi & Logistik', nilaiT: 4.28, persen: 7.9, warna: '#0284C7', naker: 1200 },
];

// 5. DATASET IKS-2: INDEKS KEPUASAN MASYARAKAT (IKM) 5 LOKUS SURVEI (HALAMAN 4 PDF)
export const LOKUS_IKM_DATA: LokusIkmItem[] = [
  {
    no: 1,
    lokus: 'PTSP',
    namaLokus: 'Pusat Pelayanan Terpadu Satu Pintu (PTSP)',
    target: 88.0,
    skorIkm: 89.42,
    mutuPelayanan: 'A',
    predikat: 'Sangat Baik',
    jumlahResponden: 1420,
    persenResponSangatPuas: 91.5,
    unsurTerlemah: 'Kecepatan Waktu Layanan Izin Kompleks',
    unsurTerkuat: 'Sikap Ramah & Integritas Petugas Frontliner',
  },
  {
    no: 2,
    lokus: 'BUP',
    namaLokus: 'Direktorat Pengelolaan Kepelabuhanan (BUP)',
    target: 88.0,
    skorIkm: 88.65,
    mutuPelayanan: 'A',
    predikat: 'Sangat Baik',
    jumlahResponden: 980,
    persenResponSangatPuas: 89.2,
    unsurTerlemah: 'Kemudahan Sandar Kapal Peak Season',
    unsurTerkuat: 'Kejelasan Tarif Jasa Labuh Tambat',
  },
  {
    no: 3,
    lokus: 'DPL',
    namaLokus: 'Direktorat Pengelolaan Pertanahan (Lahan)',
    target: 88.0,
    skorIkm: 87.24,
    mutuPelayanan: 'B',
    predikat: 'Baik',
    jumlahResponden: 1650,
    persenResponSangatPuas: 85.8,
    unsurTerlemah: 'SLA Penerbitan Revisi PL & Hak Atas Tanah',
    unsurTerkuat: 'Transparansi Layanan Loket Land Management System',
  },
  {
    no: 4,
    lokus: 'BURS',
    namaLokus: 'Badan Usaha Rumah Sakit (RSBP Batam)',
    target: 88.0,
    skorIkm: 88.92,
    mutuPelayanan: 'A',
    predikat: 'Sangat Baik',
    jumlahResponden: 2100,
    persenResponSangatPuas: 90.4,
    unsurTerlemah: 'Waktu Tunggu Antrian Farmasi Poliklinik',
    unsurTerkuat: 'Fasilitas Kamar Inap & Penanganan Dokter Spesialis',
  },
  {
    no: 5,
    lokus: 'BUSPAM',
    namaLokus: 'Badan Usaha SPAM, Fasilitas dan Lingkungan (Rusun)',
    target: 88.0,
    skorIkm: 87.88,
    mutuPelayanan: 'B',
    predikat: 'Baik',
    jumlahResponden: 1240,
    persenResponSangatPuas: 86.7,
    unsurTerlemah: 'Respon Cepat Keluhan Gangguan Air Pipa Tertentu',
    unsurTerkuat: 'Kemudahan Pembayaran Tagihan Online & Sewa Rusun',
  },
];

// STANDAR KUALITATIF IKM SESUAI PERMENPAN-RB 14/2017 (HALAMAN 4 PDF)
export const STANDAR_IKM_PERMENPAN = [
  { rentang: '88,31 – 100,00', mutu: 'A', predikat: 'Sangat Baik', warna: '#059669', bg: 'bg-emerald-50 text-emerald-800' },
  { rentang: '76,61 – 88,30', mutu: 'B', predikat: 'Baik', warna: '#2563EB', bg: 'bg-blue-50 text-blue-800' },
  { rentang: '65,00 – 76,60', mutu: 'C', predikat: 'Kurang Baik', warna: '#D97706', bg: 'bg-amber-50 text-amber-800' },
  { rentang: '25,00 – 64,99', mutu: 'D', predikat: 'Tidak Baik', warna: '#DC2626', bg: 'bg-rose-50 text-rose-800' },
];

// 6. DATASET IKS-3: TARGET & REALISASI PNBP 10 SATKER PENGHASIL (HALAMAN 5 PDF)
// Diurutkan sesuai tabel resmi Perkin Halaman 5
export const TABEL_TARGET_PNBP_PERKIN: PnbpSatkerPenghasil[] = [
  // Unit Kerja Penghasil
  {
    no: 1,
    namaSatker: 'Biro Keuangan',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 46720.87,
    targetPersen: 1.9,
    realisasiPnbpJuta: 38450.2,
    persenCapaian: 82.3,
    keterangan: 'Jasa giro perbankan, bunga deposito kas BLU, dan denda keterlambatan.',
  },
  {
    no: 2,
    namaSatker: 'Direktorat Pengelolaan Pertanahan',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 964304.32,
    targetPersen: 39.52,
    realisasiPnbpJuta: 748210.4,
    persenCapaian: 77.59,
    keterangan: 'Pemberian Uang Wajib Tahunan (UWT) Baru, Perpanjangan, Peralihan, dan Pecah PL.',
  },
  {
    no: 3,
    namaSatker: 'Direktorat Pembangunan Infrastruktur',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 8854.66,
    targetPersen: 0.37,
    realisasiPnbpJuta: 7120.15,
    persenCapaian: 80.41,
    keterangan: 'Izin pemanfaatan ROW utilitas pipa/kabel dan izin ROW penghijauan tanaman.',
  },
  {
    no: 4,
    namaSatker: 'Direktorat Lalu Lintas Barang',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 2371.25,
    targetPersen: 0.1,
    realisasiPnbpJuta: 1940.8,
    persenCapaian: 81.85,
    keterangan: 'Pemberian rekomendasi dan izin lalu lintas barang industri & perdagangan.',
  },
  {
    no: 5,
    namaSatker: 'Pusat Data dan Sistem Informasi (PDSI)',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 13494.63,
    targetPersen: 0.6,
    realisasiPnbpJuta: 10850.5,
    persenCapaian: 80.41,
    keterangan: 'Sewa rak co-location data center, link FO, dan layanan komputasi cloud.',
  },
  {
    no: 6,
    namaSatker: 'Kantor Penghubung Jakarta',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 925.97,
    targetPersen: 0.04,
    realisasiPnbpJuta: 745.2,
    persenCapaian: 80.48,
    keterangan: 'Pemanfaatan ruang pertemuan dan fasilitas kantor perwakilan BP Batam.',
  },
  // Badan Usaha
  {
    no: 7,
    namaSatker: 'Direktorat Pengelolaan Kepelabuhanan',
    kategori: 'Badan Usaha',
    targetPnbpJuta: 490154.13,
    targetPersen: 20.0,
    realisasiPnbpJuta: 382400.1,
    persenCapaian: 78.02,
    keterangan: 'Jasa labuh kapal, tambat, dermaga Batu Ampar/Sekupang/Nongsa, dan pass penumpang.',
  },
  {
    no: 8,
    namaSatker: 'Direktorat Pengelolaan Kawasan Bandara',
    kategori: 'Badan Usaha',
    targetPnbpJuta: 130482.43,
    targetPersen: 5.3,
    realisasiPnbpJuta: 106820.7,
    persenCapaian: 81.87,
    keterangan: 'PJP2U pass penumpang, pendaratan pesawat PJP4U Bandara Hang Nadim, dan kargo EMPU.',
  },
  {
    no: 9,
    namaSatker: 'Badan Usaha Rumah Sakit (RSBP)',
    kategori: 'Badan Usaha',
    targetPnbpJuta: 4098.98,
    targetPersen: 0.17,
    realisasiPnbpJuta: 3290.45,
    persenCapaian: 80.27,
    keterangan: 'Pendapatan jasa rawat inap, MCU eksekutif, laboratorium kateterisasi jantung, dan farmasi.',
  },
  {
    no: 10,
    namaSatker: 'Badan Usaha Sistem Pengelolaan Air Minum (SPAM), Fasilitas dan Lingkungan',
    kategori: 'Badan Usaha',
    targetPnbpJuta: 786541.31,
    targetPersen: 32.0,
    realisasiPnbpJuta: 592616.5,
    persenCapaian: 75.34,
    keterangan: 'Penerimaan air curah WTP waduk, sewa rusunawa pekerja, limbah B3 KPLI, dan aset gedung.',
  },
];

export const TOTAL_TARGET_PNBP_JUTA = 2447948.55; // ~2.447 T (Sesuai Renstra 2,447 T)
export const TOTAL_REALISASI_PNBP_JUTA = 1892450.1; // ~1.892 T

// 7. DATASET IKS-4: INDEKS REFORMASI BIROKRASI (HALAMAN 6 PDF)
export const STANDAR_REFORMASI_BIROKRASI = [
  { kategori: 'AA', nilai: '> 100', predikat: 'Sangat Memuaskan', warna: '#047857', bg: 'bg-emerald-100 text-emerald-800' },
  { kategori: 'A', nilai: '> 80 – 90', predikat: 'Memuaskan', warna: '#059669', bg: 'bg-emerald-50 text-emerald-700' },
  { kategori: 'A-', nilai: 'Memuaskan dgn Catatan', predikat: 'Memuaskan dengan Catatan', warna: '#0D9488', bg: 'bg-teal-50 text-teal-700' },
  { kategori: 'BB', nilai: '> 70 – 80', predikat: 'Sangat Baik (TARGET PERKIN: 80)', warna: '#2563EB', bg: 'bg-blue-100 text-blue-800 ring-2 ring-blue-500' },
  { kategori: 'B', nilai: '> 60 – 70', predikat: 'Baik', warna: '#3B82F6', bg: 'bg-blue-50 text-blue-700' },
  { kategori: 'CC', nilai: '> 50 – 60', predikat: 'Cukup', warna: '#D97706', bg: 'bg-amber-50 text-amber-700' },
  { kategori: 'C', nilai: '> 30 – 50', predikat: 'Buruk', warna: '#EA580C', bg: 'bg-orange-50 text-orange-700' },
  { kategori: 'D', nilai: '0 – 30', predikat: 'Sangat Kurang', warna: '#DC2626', bg: 'bg-rose-50 text-rose-700' },
];

export const AREA_REFORMASI_BIROKRASI_DATA: ReformasiBirokrasiArea[] = [
  {
    kode: 'RB-01',
    aspek: 'Manajemen Perubahan & Budaya Kerja BerAKHLAK',
    bobot: 10,
    targetNilai: 8.0,
    capaianNilai: 8.4,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Internalisasi Core Value ASN BerAKHLAK, agen perubahan satker, dan kepemimpinan adaptif.',
  },
  {
    kode: 'RB-02',
    aspek: 'Deregulasi & Penyederhanaan Regulasi (Perka/Kepka)',
    bobot: 10,
    targetNilai: 8.0,
    capaianNilai: 8.2,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Harmonisasi Perka investasi, kemudahan perizinan berusaha, dan deregulasi tarif BLU.',
  },
  {
    kode: 'RB-03',
    aspek: 'Penataan Struktur Organisasi yang Lincah & Agile',
    bobot: 10,
    targetNilai: 8.0,
    capaianNilai: 8.1,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Penyederhanaan birokrasi, penyesuaian kelas jabatan, dan fleksibilitas tim lintas unit.',
  },
  {
    kode: 'RB-04',
    aspek: 'Penataan Tata Laksana & Digitalisasi SPBE',
    bobot: 15,
    targetNilai: 12.0,
    capaianNilai: 12.6,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Integrasi Satu Data BP Batam, digital signature, e-office, dan interoperabilitas IBOSS.',
  },
  {
    kode: 'RB-05',
    aspek: 'Manajemen SDM Aparatur & Sistem Merit KASN',
    bobot: 15,
    targetNilai: 12.0,
    capaianNilai: 12.8,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Penerapan Sistem Merit Kategori IV (Skor 342,5), talent pool JPT, dan 20 JP diklat.',
  },
  {
    kode: 'RB-06',
    aspek: 'Penguatan Akuntabilitas Kinerja (SAKIP)',
    bobot: 15,
    targetNilai: 12.0,
    capaianNilai: 12.4,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Capaian Nilai SAKIP 82.68 (Predikat A), cascading kinerja pimpinan ke staf berorientasi hasil.',
  },
  {
    kode: 'RB-07',
    aspek: 'Penguatan Pengawasan & Maturitas SPIP',
    bobot: 15,
    targetNilai: 12.0,
    capaianNilai: 12.3,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Maturitas SPIP Level 3 Terdefinisi (Skor 3.42), Whistleblowing System, dan bebas gratifikasi.',
  },
  {
    kode: 'RB-08',
    aspek: 'Peningkatan Kualitas Pelayanan Publik (PEKPPP)',
    bobot: 10,
    targetNilai: 8.0,
    capaianNilai: 8.7,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Indeks Pelayanan Publik 4.38 (Sangat Baik), MPP terpadu, dan respon pengaduan 96.1%.',
  },
];
