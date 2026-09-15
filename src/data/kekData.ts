// Data resmi Direktorat Pengembangan KPBPBB dan KEK BP Batam
// Berdasarkan:
// 1. nilairealisasiinvestasi-kek-dp — Nilai Realisasi Investasi Kawasan Ekonomi Khusus Di KPBPB Batam.pdf
// 2. profil-kek — Data Profil Kawasan Ekonomi Khusus.pdf
// 3. Atribut Daftar Data Satu Data.pdf (Halaman 9 - 11, Dataset 1 s/d 12)

export interface KekRealisasiInvestasi {
  id: number;
  tahun: number;
  triwulan: number; // 1, 2, 3, 4
  namaKek: string;
  jenisInvestasi: 'PMA' | 'PMDN';
  targetInvestasi: number;
  realisasiInvestasi: number;
  idDpp: string;
}

export interface KekProfil {
  id: number;
  kawasan: string;
  shortName: string;
  lokasi: string;
  luasArea: number; // Hektar (Ha)
  kegiatan: string;
  statusOperasional: string;
  nilaiInvestasiKomitmen: number; // Rupiah
  dasarHukum: string;
  targetPenyerapanTenagaKerja: number;
  pengusul: string;
  bupp: string;
  themeColor: string;
}

export interface KekPerizinanBerusaha {
  id: number;
  namaPerizinan: string;
  tanggalPerizinan: string;
  kek: string;
  sektor: string;
  pemohon: string;
  status: 'Disetujui' | 'Terbit Otomatis' | 'Dalam Pemenuhan Komitmen';
}

export interface KekNonPerizinan {
  id: number;
  namaNonPerizinan: string;
  tanggal: string;
  keterangan: string;
  kek: string;
  kategori: string;
}

export interface KekPerizinanLainnya {
  id: number;
  namaPerizinan: string;
  tanggalPerizinan: string;
  kek: string;
  jenis: string;
  masaBerlaku: string;
}

export interface KekKajianPerkin {
  id: number;
  judulKajian: string;
  tahun: number;
  status: 'Ditindaklanjuti' | 'Dalam Pembahasan' | 'Tahap Finalisasi';
  bidang: 'Pengembangan' | 'Kerja Sama' | 'Daya Saing Sumber Daya' | 'Berkelanjutan';
  nomorDokumen: string;
  tanggalDokumen: string;
}

// 1. DATA REALISASI INVESTASI KEK (Sesuai 16 baris resmi PDF nilairealisasiinvestasi-kek-dp)
export const KEK_INVESTASI_RAW: KekRealisasiInvestasi[] = [
  {
    id: 101,
    tahun: 2025,
    triwulan: 4,
    namaKek: 'KEK Batam Teknik',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 700000000000,
    realisasiInvestasi: 44778665679,
    idDpp: '02.08.0009',
  },
  {
    id: 102,
    tahun: 2025,
    triwulan: 4,
    namaKek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 817000000000,
    realisasiInvestasi: 868132287,
    idDpp: '02.08.0009',
  },
  {
    id: 103,
    tahun: 2025,
    triwulan: 4,
    namaKek: 'KEK Nongsa',
    jenisInvestasi: 'PMA',
    targetInvestasi: 2835000000000,
    realisasiInvestasi: 3373747884615,
    idDpp: '02.08.0009',
  },
  {
    id: 104,
    tahun: 2025,
    triwulan: 4,
    namaKek: 'KEK Nongsa',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 2835000000000,
    realisasiInvestasi: 6900296771,
    idDpp: '02.08.0009',
  },
  {
    id: 105,
    tahun: 2025,
    triwulan: 1,
    namaKek: 'KEK Batam Teknik',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 700000000000,
    realisasiInvestasi: 0,
    idDpp: '02.08.0009',
  },
  {
    id: 106,
    tahun: 2025,
    triwulan: 2,
    namaKek: 'KEK Batam Teknik',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 700000000000,
    realisasiInvestasi: 70624531196,
    idDpp: '02.08.0009',
  },
  {
    id: 107,
    tahun: 2025,
    triwulan: 1,
    namaKek: 'KEK Nongsa',
    jenisInvestasi: 'PMA',
    targetInvestasi: 2835000000000,
    realisasiInvestasi: 1542491942413,
    idDpp: '02.08.0009',
  },
  {
    id: 108,
    tahun: 2025,
    triwulan: 3,
    namaKek: 'KEK Batam Teknik',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 700000000000,
    realisasiInvestasi: 68959549857,
    idDpp: '02.08.0009',
  },
  {
    id: 109,
    tahun: 2025,
    triwulan: 3,
    namaKek: 'KEK Nongsa',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 2835000000000,
    realisasiInvestasi: 0,
    idDpp: '02.08.0009',
  },
  {
    id: 110,
    tahun: 2025,
    triwulan: 1,
    namaKek: 'KEK Nongsa',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 2835000000000,
    realisasiInvestasi: 0,
    idDpp: '02.08.0009',
  },
  {
    id: 111,
    tahun: 2025,
    triwulan: 3,
    namaKek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 817000000000,
    realisasiInvestasi: 39100063155,
    idDpp: '02.08.0009',
  },
  {
    id: 112,
    tahun: 2025,
    triwulan: 2,
    namaKek: 'KEK Nongsa',
    jenisInvestasi: 'PMA',
    targetInvestasi: 2835000000000,
    realisasiInvestasi: 1382045524265,
    idDpp: '02.08.0009',
  },
  {
    id: 113,
    tahun: 2025,
    triwulan: 3,
    namaKek: 'KEK Nongsa',
    jenisInvestasi: 'PMA',
    targetInvestasi: 2835000000000,
    realisasiInvestasi: 2559648478055,
    idDpp: '02.08.0009',
  },
  {
    id: 114,
    tahun: 2025,
    triwulan: 2,
    namaKek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 817000000000,
    realisasiInvestasi: 2284800000,
    idDpp: '02.08.0009',
  },
  {
    id: 115,
    tahun: 2025,
    triwulan: 2,
    namaKek: 'KEK Nongsa',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 2835000000000,
    realisasiInvestasi: 0,
    idDpp: '02.08.0009',
  },
  {
    id: 116,
    tahun: 2025,
    triwulan: 1,
    namaKek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    jenisInvestasi: 'PMDN',
    targetInvestasi: 817000000000,
    realisasiInvestasi: 0,
    idDpp: '02.08.0009',
  },
];

// 2. PROFIL RESMI 3 KAWASAN EKONOMI KHUSUS (Sesuai PDF profil-kek)
export const KEK_PROFIL_DATA: KekProfil[] = [
  {
    id: 14,
    kawasan: 'KEK Nongsa (Nongsa Digital Park)',
    shortName: 'KEK Nongsa',
    lokasi: 'Kota Batam, Provinsi Kepulauan Riau (Kecamatan Nongsa)',
    luasArea: 166.45,
    kegiatan: 'Riset, Ekonomi Digital, Pengembangan Teknologi, Data Center Nasional & Internasional, Animasi Film, Pariwisata',
    statusOperasional: 'Beroperasi Penuh (Tahap Pengembangan Ekspansi)',
    nilaiInvestasiKomitmen: 39800000000000, // Rp 39,8 T
    dasarHukum: 'PP No. 68 Tahun 2021 tentang KEK Nongsa',
    targetPenyerapanTenagaKerja: 16500,
    pengusul: 'PT Taman Resor Internet (Nongsa Digital Park)',
    bupp: 'PT Taman Resor Internet',
    themeColor: '#0284C7', // Sky blue
  },
  {
    id: 15,
    kawasan: 'KEK Batam Teknik (Batam Aero Technic)',
    shortName: 'KEK Batam Teknik',
    lokasi: 'Kota Batam, Provinsi Kepulauan Riau (Bandara Hang Nadim)',
    luasArea: 30.0,
    kegiatan: 'Produksi dan Pemeliharaan Pesawat Terbang (Maintenance, Repair, and Overhaul - MRO), Logistik Komponen Aviasi',
    statusOperasional: 'Beroperasi Penuh (Ekspansi Hangar 5 & 6)',
    nilaiInvestasiKomitmen: 7290000000000, // Rp 7,29 T
    dasarHukum: 'PP No. 67 Tahun 2021 tentang KEK Batam Teknik',
    targetPenyerapanTenagaKerja: 9976,
    pengusul: 'PT Batam Teknik (Lion Air Group)',
    bupp: 'PT Batam Teknik',
    themeColor: '#4F46E5', // Indigo
  },
  {
    id: 16,
    kawasan: 'Kawasan Ekonomi Khusus Pariwisata dan Kesehatan Internasional Batam',
    shortName: 'KEK Pariwisata & Kesehatan',
    lokasi: 'Sekupang dan Nongsa, Kota Batam, Kepulauan Riau',
    luasArea: 47.17,
    kegiatan: 'Pariwisata Terpadu, Layanan Kesehatan Internasional (Hospital & Wellness Clinic), Riset Farmasi & Medis, Pendidikan Vokasi Kesehatan',
    statusOperasional: 'Tahap Pembangunan Infrastruktur & Fasilitas Medis',
    nilaiInvestasiKomitmen: 6910000000000, // Rp 6,91 T
    dasarHukum: 'PP No. 39 Tahun 2024 tentang KEK Pariwisata dan Kesehatan Internasional Batam',
    targetPenyerapanTenagaKerja: 10540,
    pengusul: 'PT Mayapada Batam Propertindo & PT Karang Kurita',
    bupp: 'PT Karang Kurita Healthcare International',
    themeColor: '#059669', // Emerald
  },
];

// 3. DAFTAR PERIZINAN BERUSAHA ADMINISTRATOR KEK (Dataset No 3)
// Atribut: NAMA PERIZINAN BERUSAHA, TANGGAL PERIZINAN BERUSAHA
export const KEK_PERIZINAN_BERUSAHA: KekPerizinanBerusaha[] = [
  {
    id: 1,
    namaPerizinan: 'Persetujuan Bangunan Gedung (PBG) Fasilitas Data Center Tier-4 Tahap II',
    tanggalPerizinan: '2025-11-28',
    kek: 'KEK Nongsa',
    sektor: 'Teknologi Informasi & Data Center',
    pemohon: 'PT GDS Data Data Hub Batam',
    status: 'Disetujui',
  },
  {
    id: 2,
    namaPerizinan: 'Izin Usaha Kawasan Pariwisata & Resort Kesehatan Terpadu',
    tanggalPerizinan: '2025-11-15',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    sektor: 'Pariwisata & Hospitaliti',
    pemohon: 'PT Mayapada Batam Hospitality',
    status: 'Disetujui',
  },
  {
    id: 3,
    namaPerizinan: 'Perizinan Berusaha Berbasis Risiko UMKU: Sertifikat Kelayakan Operasi Hangar MRO 4',
    tanggalPerizinan: '2025-10-30',
    kek: 'KEK Batam Teknik',
    sektor: 'Industri Kedirgantaraan (MRO)',
    pemohon: 'PT Batam Teknik',
    status: 'Disetujui',
  },
  {
    id: 4,
    namaPerizinan: 'Persetujuan Lingkungan (AMDAL) Kawasan Pariwisata dan Fasilitas Medis Sekupang',
    tanggalPerizinan: '2025-10-18',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    sektor: 'Kesehatan Internasional',
    pemohon: 'PT Karang Kurita Healthcare',
    status: 'Disetujui',
  },
  {
    id: 5,
    namaPerizinan: 'Izin Operasional Jaringan Distribusi Fiber Optik Bawah Laut Landing Point KEK',
    tanggalPerizinan: '2025-09-22',
    kek: 'KEK Nongsa',
    sektor: 'Telekomunikasi Internasional',
    pemohon: 'PT Super Sistem Data Internasional',
    status: 'Disetujui',
  },
  {
    id: 6,
    namaPerizinan: 'Perizinan Berusaha PB-UMKU: Bengkel Pemeliharaan Turbofan Engine CFM56-7B',
    tanggalPerizinan: '2025-09-08',
    kek: 'KEK Batam Teknik',
    sektor: 'Industri Kedirgantaraan (MRO)',
    pemohon: 'PT Lion Technic Batam',
    status: 'Disetujui',
  },
  {
    id: 7,
    namaPerizinan: 'PBG Gedung Rumah Sakit Spesialis Jantung & Onkologi Internasional',
    tanggalPerizinan: '2025-08-25',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    sektor: 'Kesehatan Internasional',
    pemohon: 'PT Apollo Mayapada Hospital Batam',
    status: 'Disetujui',
  },
  {
    id: 8,
    namaPerizinan: 'Izin Usaha Fasilitas Edukasi & Pusat Pelatihan Animasi Studio Internasional',
    tanggalPerizinan: '2025-08-11',
    kek: 'KEK Nongsa',
    sektor: 'Ekonomi Digital & Animasi',
    pemohon: 'PT Kinema Systrans Multimedia (Infinite Studios)',
    status: 'Disetujui',
  },
  {
    id: 9,
    namaPerizinan: 'Izin Pengoperasian Gardu Induk Sub-Stasiun Listrik KEK 150/20 kV',
    tanggalPerizinan: '2025-07-29',
    kek: 'KEK Nongsa',
    sektor: 'Infrastruktur Utilitas KEK',
    pemohon: 'PT Medco Power Batam KEK',
    status: 'Disetujui',
  },
  {
    id: 10,
    namaPerizinan: 'Izin Penyimpanan Limbah B3 Komponen Aviasi Berbahaya Hangar 3',
    tanggalPerizinan: '2025-07-14',
    kek: 'KEK Batam Teknik',
    sektor: 'Lingkungan & Aviasi',
    pemohon: 'PT Batam Teknik MRO',
    status: 'Disetujui',
  },
  {
    id: 11,
    namaPerizinan: 'Persetujuan Teknis Pemanfaatan Air Limbah Medis Rumah Sakit KEK',
    tanggalPerizinan: '2025-06-20',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    sektor: 'Kesehatan & Sanitasi',
    pemohon: 'PT Mayapada Healthcare Internasional',
    status: 'Disetujui',
  },
  {
    id: 12,
    namaPerizinan: 'Sertifikat Standar Pengoperasian Data Center Hyperscale Green Energy 60MW',
    tanggalPerizinan: '2025-06-03',
    kek: 'KEK Nongsa',
    sektor: 'Data Center Hyperscale',
    pemohon: 'PT Princeton Digital Group Batam',
    status: 'Disetujui',
  },
  {
    id: 13,
    namaPerizinan: 'PB-UMKU Kalibrasi Instrumen Aviasi dan Avionik Pesawat Komersial',
    tanggalPerizinan: '2025-05-19',
    kek: 'KEK Batam Teknik',
    sektor: 'Kedirgantaraan',
    pemohon: 'PT Batam Aero Instrumentasi',
    status: 'Disetujui',
  },
  {
    id: 14,
    namaPerizinan: 'Izin Pembangunan Dermaga Marina Wisata Terpadu Sekupang',
    tanggalPerizinan: '2025-05-02',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    sektor: 'Pariwisata Bahari',
    pemohon: 'PT Karang Kurita Marina Wisata',
    status: 'Disetujui',
  },
  {
    id: 15,
    namaPerizinan: 'Persetujuan Bangunan Gedung (PBG) Laboratorium Rekayasa Perangkat Lunak AI',
    tanggalPerizinan: '2025-04-18',
    kek: 'KEK Nongsa',
    sektor: 'Riset & Pengembangan AI',
    pemohon: 'PT Tech Innovation Batam',
    status: 'Disetujui',
  },
  {
    id: 16,
    namaPerizinan: 'Izin Gudang Logistik Komponen Pesawat Suku Cadang Bebas Bea',
    tanggalPerizinan: '2025-04-05',
    kek: 'KEK Batam Teknik',
    sektor: 'Logistik Aviasi',
    pemohon: 'PT Batam Logistik Aero',
    status: 'Disetujui',
  },
  {
    id: 17,
    namaPerizinan: 'Izin Operasi Klinik Estetika & Kebugaran Terpadu Wisatawan Mancanegara',
    tanggalPerizinan: '2025-03-24',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    sektor: 'Wellness & Medical Tourism',
    pemohon: 'PT Sehat Bugar Nusantara',
    status: 'Disetujui',
  },
  {
    id: 18,
    namaPerizinan: 'Sertifikat Kelayakan Bangunan Gedung (SLF) Gedung Data Center Modul 1',
    tanggalPerizinan: '2025-03-12',
    kek: 'KEK Nongsa',
    sektor: 'Infrastruktur Digital',
    pemohon: 'PT Singtel Data Center Batam',
    status: 'Disetujui',
  },
  {
    id: 19,
    namaPerizinan: 'Izin Pengoperasian Pembangkit Listrik Surya Rooftop Hangar 1-3 (2,4 MWp)',
    tanggalPerizinan: '2025-02-27',
    kek: 'KEK Batam Teknik',
    sektor: 'Energi Baru Terbarukan',
    pemohon: 'PT Solar Batam Aero',
    status: 'Disetujui',
  },
  {
    id: 20,
    namaPerizinan: 'Izin Usaha Pusat Rehabilitasi Medis & Wellness Pasca Operasi',
    tanggalPerizinan: '2025-02-14',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    sektor: 'Kesehatan Internasional',
    pemohon: 'PT Nongsa Wellness Center',
    status: 'Disetujui',
  },
  {
    id: 21,
    namaPerizinan: 'PBG Pusat Inkubasi Startup Digital & Co-Working Space KEK',
    tanggalPerizinan: '2025-01-30',
    kek: 'KEK Nongsa',
    sektor: 'Ekonomi Kreatif & Digital',
    pemohon: 'PT Nongsa Digital Hub',
    status: 'Disetujui',
  },
  {
    id: 22,
    namaPerizinan: 'PB-UMKU Bengkel Pengecatan (Painting Hangar) Pesawat Komersial Lorong Ganda',
    tanggalPerizinan: '2025-01-16',
    kek: 'KEK Batam Teknik',
    sektor: 'Industri Kedirgantaraan',
    pemohon: 'PT Batam Teknik Coating',
    status: 'Disetujui',
  },
];

// 4. DAFTAR NON PERIZINAN ADMINISTRATOR KEK (Dataset No 4)
// Atribut: NAMA NON PERIZINAN, TANGGAL, KETERANGAN
export const KEK_NON_PERIZINAN: KekNonPerizinan[] = [
  {
    id: 1,
    namaNonPerizinan: 'Rekomendasi Fasilitas Pengurangan Pajak Penghasilan Badan (Tax Holiday 100%)',
    tanggal: '2025-11-20',
    keterangan: 'Pemberian fasilitas Tax Holiday 20 tahun untuk investasi Hyperscale Data Center',
    kek: 'KEK Nongsa',
    kategori: 'Fasilitas Fiskal Perpajakan',
  },
  {
    id: 2,
    namaNonPerizinan: 'Rekomendasi Pembebasan Bea Masuk Impor Mesin & Peralatan Medis Canggih',
    tanggal: '2025-11-05',
    keterangan: 'Fasilitas pembebasan bea masuk mesin MRI 3 Tesla & CT Scan Rumah Sakit Internasional',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    kategori: 'Fasilitas Kepabeanan',
  },
  {
    id: 3,
    namaNonPerizinan: 'Surat Keterangan Hak Akses Kepabeanan Sistem IT Inventory KEK Terhubung BC',
    tanggal: '2025-10-24',
    keterangan: 'Integrasi sistem IT Inventory MRO pesawat dengan portal Bea Cukai Batam',
    kek: 'KEK Batam Teknik',
    kategori: 'Integrasi Sistem Kepabeanan',
  },
  {
    id: 4,
    namaNonPerizinan: 'Rekomendasi Rencana Penggunaan Tenaga Kerja Asing (RPTKA) Spesialis IT AI',
    tanggal: '2025-10-10',
    keterangan: 'Perekrutan 12 Senior Cloud Architect & AI Engineer asal Singapura dan India',
    kek: 'KEK Nongsa',
    kategori: 'Ketenagakerjaan',
  },
  {
    id: 5,
    namaNonPerizinan: 'Surat Keterangan Domisili Usaha Kawasan Ekonomi Khusus (SKDU-KEK)',
    tanggal: '2025-09-17',
    keterangan: 'Penerbitan domisili resmi tenant baru klaster digital studio',
    kek: 'KEK Nongsa',
    kategori: 'Administrasi Kawasan',
  },
  {
    id: 6,
    namaNonPerizinan: 'Rekomendasi Masterlist Pembebasan PPN atas Perolehan BKP/JKP Lokal',
    tanggal: '2025-09-02',
    keterangan: 'Pembebasan PPN 11% pengadaan material konstruksi Hangar 5',
    kek: 'KEK Batam Teknik',
    kategori: 'Fasilitas Fiskal Perpajakan',
  },
  {
    id: 7,
    namaNonPerizinan: 'Rekomendasi Fasilitas Golden Visa bagi Investor Strategis Bidang Kesehatan',
    tanggal: '2025-08-19',
    keterangan: 'Rekomendasi visa tinggal terbatas 10 tahun untuk Direksi Konsorsium Medis',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    kategori: 'Keimigrasian',
  },
  {
    id: 8,
    namaNonPerizinan: 'Surat Keterangan Pemenuhan Standar Pembangunan Berkelanjutan (Green KEK)',
    tanggal: '2025-08-04',
    keterangan: 'Verifikasi efisiensi energi PUE 1.3 pada modul Data Center Nongsa',
    kek: 'KEK Nongsa',
    kategori: 'Lingkungan & Keberlanjutan',
  },
  {
    id: 9,
    namaNonPerizinan: 'Rekomendasi Pengeluaran Sementara Peralatan Uji Mesin Pesawat ke Luar Daerah Pabean',
    tanggal: '2025-07-21',
    keterangan: 'Sertifikasi ulang alat tes getaran turbin di fasilitas pabrikan Singapura',
    kek: 'KEK Batam Teknik',
    kategori: 'Layanan Kepabeanan',
  },
  {
    id: 10,
    namaNonPerizinan: 'Penerbitan Kartu Tanda Masuk Kawasan (Pass Elektronik Administrator KEK)',
    tanggal: '2025-07-08',
    keterangan: 'Penerbitan 350 smart card akses zona terbatas KEK Pariwisata & Kesehatan',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    kategori: 'Keamanan & Akses Kawasan',
  },
  {
    id: 11,
    namaNonPerizinan: 'Rekomendasi Impor Barang Contoh Uji Klinis Farmasi Tanpa Izin Edar',
    tanggal: '2025-06-15',
    keterangan: 'Fasilitas jalur khusus sampel uji laboratorium riset kesehatan',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    kategori: 'Fasilitas Riset & Medis',
  },
  {
    id: 12,
    namaNonPerizinan: 'Surat Konfirmasi Fasilitas Penangguhan Bea Masuk Barang Modal KEK',
    tanggal: '2025-05-29',
    keterangan: 'Penangguhan bea masuk 8 kontainer server rack & genset cadangan',
    kek: 'KEK Nongsa',
    kategori: 'Fasilitas Kepabeanan',
  },
];

// 5. DAFTAR PERIZINAN LAINNYA ADMINISTRATOR KEK (Dataset No 7)
// Atribut: NAMAPERIZINAN, TANGGALPERIZINAN
export const KEK_PERIZINAN_LAINNYA: KekPerizinanLainnya[] = [
  {
    id: 1,
    namaPerizinan: 'Persetujuan Pemasukan Bahan Berbahaya dan Beracun (B3) Pelarut Komponen Aviasi',
    tanggalPerizinan: '2025-11-26',
    kek: 'KEK Batam Teknik',
    jenis: 'Izin Pemasukan Bahan Khusus',
    masaBerlaku: '1 Tahun (s.d. Nov 2026)',
  },
  {
    id: 2,
    namaPerizinan: 'Izin Operasional Genset Darurat Kapasitas 2.500 kVA Data Center Modul B',
    tanggalPerizinan: '2025-11-12',
    kek: 'KEK Nongsa',
    jenis: 'Izin Ketenagalistrikan Mandiri',
    masaBerlaku: '3 Tahun (s.d. Nov 2028)',
  },
  {
    id: 3,
    namaPerizinan: 'Persetujuan Kerja Lembur Malam Pelaksanaan Pemeliharaan Darurat Pesawat (AOG)',
    tanggalPerizinan: '2025-10-28',
    kek: 'KEK Batam Teknik',
    jenis: 'Dispensasi Operasional Jam Kerja',
    masaBerlaku: 'Insidental (30 Hari)',
  },
  {
    id: 4,
    namaPerizinan: 'Izin Pemasukan Alat Kesehatan Radiologi Terbatas dari Pelabuhan Bebas Batam ke KEK',
    tanggalPerizinan: '2025-10-15',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    jenis: 'Pergerakan Barang Antar Kawasan',
    masaBerlaku: '6 Bulan',
  },
  {
    id: 5,
    namaPerizinan: 'Persetujuan Rekayasa Lalu Lintas Pengangkutan Muatan Berat Turbin Trafo Listrik KEK',
    tanggalPerizinan: '2025-09-29',
    kek: 'KEK Nongsa',
    jenis: 'Izin Transportasi Khusus',
    masaBerlaku: '14 Hari Kerja',
  },
  {
    id: 6,
    namaPerizinan: 'Izin Pemanfaatan Spektrum Frekuensi Radio Komunikasi Private Hangar MRO',
    tanggalPerizinan: '2025-09-11',
    kek: 'KEK Batam Teknik',
    jenis: 'Izin Frekuensi Radio Khusus',
    masaBerlaku: '2 Tahun (s.d. Sep 2027)',
  },
  {
    id: 7,
    namaPerizinan: 'Persetujuan Pemasangan Jaringan Pipa Air Bersih Khusus Fasilitas Rumah Sakit KEK',
    tanggalPerizinan: '2025-08-27',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    jenis: 'Izin Pemanfaatan ROW Utilitas',
    masaBerlaku: '5 Tahun',
  },
  {
    id: 8,
    namaPerizinan: 'Izin Uji Coba Penerbangan Drone Pemetaan Lidar Kawasan Konservasi Hijau KEK',
    tanggalPerizinan: '2025-08-08',
    kek: 'KEK Nongsa',
    jenis: 'Izin Ruang Udara Terbatas',
    masaBerlaku: '30 Hari',
  },
  {
    id: 9,
    namaPerizinan: 'Persetujuan Pembuangan Air Limbah yang Telah Memenuhi Baku Mutu ke Saluran Umum',
    tanggalPerizinan: '2025-07-25',
    kek: 'KEK Pariwisata dan Kesehatan Internasional Batam',
    jenis: 'Izin Pengelolaan Lingkungan Cair',
    masaBerlaku: '3 Tahun',
  },
  {
    id: 10,
    namaPerizinan: 'Izin Pemasukan Kendaraan Khusus Penarik Pesawat (Aircraft Towing Tractor) Bebas PPnBM',
    tanggalPerizinan: '2025-07-02',
    kek: 'KEK Batam Teknik',
    jenis: 'Izin Pemasukan Kendaraan Operasional',
    masaBerlaku: 'Tetap Selama Beroperasi',
  },
];

// 6. DOKUMEN KAJIAN PERKIN KEK & KPBPBB (Dataset No 12)
// Formula Perkin: Capaian = (Jumlah Analisis yang Ditindaklanjuti / Jumlah Dokumen Analisis) x 100%
export const KEK_KAJIAN_DATA: KekKajianPerkin[] = [
  {
    id: 1,
    judulKajian: 'Kajian Daya Saing Insentif Pajak (Tax Holiday & Allowance) KEK Batam terhadap Kawasan Sejenis di Kawasan ASEAN (Johor & Vietnam)',
    tahun: 2025,
    status: 'Ditindaklanjuti',
    bidang: 'Daya Saing Sumber Daya',
    nomorDokumen: 'KAJ-01/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-03-15',
  },
  {
    id: 2,
    judulKajian: 'Analisis Kelayakan Usulan Perluasan Wilayah Delineasi KEK Nongsa Digital Park untuk Klaster Artificial Intelligence Hub',
    tahun: 2025,
    status: 'Ditindaklanjuti',
    bidang: 'Pengembangan',
    nomorDokumen: 'KAJ-02/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-04-20',
  },
  {
    id: 3,
    judulKajian: 'Kajian Model Kemitraan Strategis BUPP KEK Batam Teknik dengan Maskapai Internasional untuk Peningkatan Okupansi Hangar MRO',
    tahun: 2025,
    status: 'Ditindaklanjuti',
    bidang: 'Kerja Sama',
    nomorDokumen: 'KAJ-03/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-05-18',
  },
  {
    id: 4,
    judulKajian: 'Rencana Aksi Penerapan Konsep Eco-Industrial Park dan Standar Net-Zero Carbon pada Kawasan Ekonomi Khusus di Batam',
    tahun: 2025,
    status: 'Ditindaklanjuti',
    bidang: 'Berkelanjutan',
    nomorDokumen: 'KAJ-04/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-06-25',
  },
  {
    id: 5,
    judulKajian: 'Analisis Kebutuhan Penyediaan Pasokan Listrik Hijau (Green Energy 100 MW) untuk Hyperscale Data Center di KEK Nongsa',
    tahun: 2025,
    status: 'Ditindaklanjuti',
    bidang: 'Daya Saing Sumber Daya',
    nomorDokumen: 'KAJ-05/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-07-30',
  },
  {
    id: 6,
    judulKajian: 'Kajian Harmonisasi Regulasi Pelayanan Perizinan Berusaha Administrator KEK dengan Sistem OSS RBA Kementerian Investasi/BKPM',
    tahun: 2025,
    status: 'Ditindaklanjuti',
    bidang: 'Pengembangan',
    nomorDokumen: 'KAJ-06/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-08-14',
  },
  {
    id: 7,
    judulKajian: 'Studi Potensi Pengembangan Wisata Medis Unggulan (Medical Tourism Hub) pada KEK Pariwisata dan Kesehatan Internasional Batam',
    tahun: 2025,
    status: 'Ditindaklanjuti',
    bidang: 'Pengembangan',
    nomorDokumen: 'KAJ-07/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-09-10',
  },
  {
    id: 8,
    judulKajian: 'Analisis Kebutuhan dan Pemetaan Kualifikasi SDM Bersertifikasi EASA/FAA untuk Mendukung Batam Aero Technic',
    tahun: 2025,
    status: 'Ditindaklanjuti',
    bidang: 'Daya Saing Sumber Daya',
    nomorDokumen: 'KAJ-08/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-10-05',
  },
  {
    id: 9,
    judulKajian: 'Kajian Efektivitas Fasilitas Non-Fiskal Keimigrasian (Golden Visa & Multiple Entry Business Visa) terhadap Realisasi Investasi KEK',
    tahun: 2025,
    status: 'Ditindaklanjuti',
    bidang: 'Kerja Sama',
    nomorDokumen: 'KAJ-09/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-10-22',
  },
  {
    id: 10,
    judulKajian: 'Kajian Mitigasi Dampak Lingkungan dan Daya Dukung Air Bersih Kawasan Pariwisata dan Kesehatan Internasional Batam',
    tahun: 2025,
    status: 'Ditindaklanjuti',
    bidang: 'Berkelanjutan',
    nomorDokumen: 'KAJ-10/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-11-18',
  },
  {
    id: 11,
    judulKajian: 'Evaluasi Capaian Rencana Bisnis dan Target Investasi Tahunan Pengelola KEK di Wilayah KPBPBB Batam',
    tahun: 2025,
    status: 'Ditindaklanjuti',
    bidang: 'Pengembangan',
    nomorDokumen: 'KAJ-11/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-12-05',
  },
  {
    id: 12,
    judulKajian: 'Kajian Pengembangan Koridor Logistik Khusus Jalur Cepat (Green Channel) Komponen Elektronika Antara KEK dan Pelabuhan Batu Ampar',
    tahun: 2025,
    status: 'Dalam Pembahasan',
    bidang: 'Kerja Sama',
    nomorDokumen: 'KAJ-12/DP.KPBPBB-KEK/2025',
    tanggalDokumen: '2025-12-20',
  },
];
