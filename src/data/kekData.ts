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

// ============================================================================
// 4. DAFTAR PERENCANAAN / PENGUSULAN KAWASAN EKONOMI KHUSUS (KEK) [DATASET NO. 5]
// Sesuai Daftar Data PDF: Halaman 10, Baris 5
// Sifat Data: TERTUTUP | Jenis: DATA STATISTIK | Periode: JIKA UPDATE
// Atribut Data: NAMA KEK, LOKASI, LUAS, KEGIATAN, PENGUSUL, REMARK
// ============================================================================

export type TahapanUsulanKek =
  | 'Kajian Kelayakan & AMDAL'
  | 'Verifikasi Usulan BP Batam'
  | 'Rekomendasi Dewan Nasional KEK'
  | 'Harmonisasi RPP / Menunggu Keppres';

export interface KekPerencanaanItem {
  id: number;
  namaKek: string;
  lokasi: string;
  luas: number; // Dalam Hektar (Ha)
  kegiatan: string;
  pengusul: string;
  remark: string;
  // Field analitis untuk pimpinan & implementasi Tableau:
  statusTahapan: TahapanUsulanKek;
  progressPercent: number; // 0 - 100%
  estimasiInvestasi: number; // Dalam Rupiah
  targetTenagaKerja: number; // Orang
  tahunUsulan: number;
  targetOperasional: string;
  sektorUtama: string;
  delineasiWilayah: string;
  kodeUsulan: string;
}

export const KEK_PERENCANAAN_DATA: KekPerencanaanItem[] = [
  {
    id: 501,
    kodeUsulan: 'USL-KEK-2024-001',
    namaKek: 'KEK Tanjung Sauh',
    lokasi: 'Pulau Tanjung Sauh, Kecamatan Nongsa, Kota Batam',
    luas: 840.67,
    kegiatan: 'Industri Manufaktur Berat, Logistik Terpadu & Port Terminal, Energi Hijau (Solar Farm & LNG Hub), Perakitan Komponen Transportasi Maritim',
    pengusul: 'PT Batam Shell Terminal & Konsorsium Panbil Industrial Group',
    remark: 'Telah disetujui Sidang Dewan Nasional KEK. Tahap harmonisasi substansi Rancangan Peraturan Pemerintah (RPP) bersama Kemenko Perekonomian dan Setneg RI.',
    statusTahapan: 'Harmonisasi RPP / Menunggu Keppres',
    progressPercent: 92,
    estimasiInvestasi: 199600000000000, // Rp 199,6 T
    targetTenagaKerja: 45000,
    tahunUsulan: 2024,
    targetOperasional: '2026 - Q3',
    sektorUtama: 'Industri Energi & Logistik Maritim',
    delineasiWilayah: 'Pulau Tanjung Sauh Delineasi Penuh 840,67 Ha',
  },
  {
    id: 502,
    kodeUsulan: 'USL-KEK-2024-002',
    namaKek: 'KEK Rempang Eco-City (Tahap I)',
    lokasi: 'Kawasan Sembulang & Pasir Panjang, Pulau Rempang, Kecamatan Galang',
    luas: 1200.0,
    kegiatan: 'Industri Photovoltaic Solar Glass & Kaca Terintegrasi Skala Global (Xinyi), Pusat Riset Energi Baru Terbarukan (EBT), Kawasan Ekowisata Bahari',
    pengusul: 'PT Makmur Elok Graha (MEG) bekerjasama dengan Konsorsium Xinyi Glass International',
    remark: 'Dokumen AMDAL dan Studi Kelayakan Teknis telah diserahkan. Dalam proses verifikasi kesiapan tapak infrastruktur dasar dan konsolidasi alokasi ruang BP Batam.',
    statusTahapan: 'Verifikasi Usulan BP Batam',
    progressPercent: 68,
    estimasiInvestasi: 175000000000000, // Rp 175,0 T
    targetTenagaKerja: 35000,
    tahunUsulan: 2024,
    targetOperasional: '2027 - Q1',
    sektorUtama: 'Manufaktur Kaca & Solar Panel Hijau',
    delineasiWilayah: 'Kawasan Industri Terpadu Rempang Sektor A & B',
  },
  {
    id: 503,
    kodeUsulan: 'USL-KEK-2025-003',
    namaKek: 'KEK Tembesi High-Tech & Clean Industry',
    lokasi: 'Kelurahan Tembesi, Kecamatan Sagulung, Kota Batam',
    luas: 380.5,
    kegiatan: 'Fabrikasi Semikonduktor & Advanced Packaging, Ekosistem Perakitan Baterai EV, Hardware Artificial Intelligence, Laboratorium Uji Bersama Industri 4.0',
    pengusul: 'PT Batamindo Investment Cakrawala & Asosiasi Industri Elektronika Batam',
    remark: 'Proposal usulan telah masuk ke Direktorat Pengembangan KPBPBB & KEK. Dalam tahap penyusunan Kajian Analisis Dampak Lalu Lintas (Andalalin) dan ketersediaan pasokan daya 150 MVA PLN.',
    statusTahapan: 'Kajian Kelayakan & AMDAL',
    progressPercent: 42,
    estimasiInvestasi: 28400000000000, // Rp 28,4 T
    targetTenagaKerja: 18500,
    tahunUsulan: 2025,
    targetOperasional: '2027 - Q4',
    sektorUtama: 'Semikonduktor & Perangkat AI',
    delineasiWilayah: 'Koridor Industri Sagulung-Tembesi Selatan',
  },
  {
    id: 504,
    kodeUsulan: 'USL-KEK-2025-004',
    namaKek: 'KEK Galang Maritim & Offshore Engineering Hub',
    lokasi: 'Kelurahan Sijantung & Rempang Cate, Pulau Galang, Kota Batam',
    luas: 520.0,
    kegiatan: 'Fabrikasi Platform Anjungan Lepas Pantai (Offshore Rig), Konversi Kapal Ramah Lingkungan (Dual-Fuel Retrofit), Galangan Terpadu Kapal Khusus, Pangkalan Logistik Migas',
    pengusul: 'PT Bandar Abadi Maritim Shipyard & Konsorsium Galang Offshore Marine',
    remark: 'Penyusunan dokumen masterplan zonasi dermaga basah (wet berth) dan permohonan rekomendasi tata ruang laut (PKKPRL) kepada KKP dan BP Batam.',
    statusTahapan: 'Kajian Kelayakan & AMDAL',
    progressPercent: 35,
    estimasiInvestasi: 15200000000000, // Rp 15,2 T
    targetTenagaKerja: 12000,
    tahunUsulan: 2025,
    targetOperasional: '2028 - Q2',
    sektorUtama: 'Galangan Kapal & Offshore Rig',
    delineasiWilayah: 'Pesisir Barat Pulau Galang Utara',
  },
  {
    id: 505,
    kodeUsulan: 'USL-KEK-2025-005',
    namaKek: 'KEK Marine Eco-Tourism Pulau Abang & Petong',
    lokasi: 'Gugusan Pulau Abang & Pulau Petong, Kecamatan Galang, Kota Batam',
    luas: 115.0,
    kegiatan: 'Kawasan Wisata Bahari Konservasi Karang, Luxury Diving & Marina Yacht Resort, Pusat Penelitian Terumbu Karang Segitiga Karang (Coral Triangle Station)',
    pengusul: 'PT Pesona Bahari Nusantara & Konsorsium Investasi Ekowisata Kepri',
    remark: 'Survei batimetri kelautan dan studi daya dukung ekosistem rampung. Menunggu konsultasi publik dengan masyarakat nelayan lokal dan penetapan zona penyangga konservasi.',
    statusTahapan: 'Verifikasi Usulan BP Batam',
    progressPercent: 55,
    estimasiInvestasi: 4500000000000, // Rp 4,5 T
    targetTenagaKerja: 4800,
    tahunUsulan: 2025,
    targetOperasional: '2028 - Q1',
    sektorUtama: 'Pariwisata Bahari & Konservasi',
    delineasiWilayah: 'Kepulauan Abang Sub-Zona Pariwisata',
  },
];

// ============================================================================
// 5. PETA KAWASAN EKONOMI KHUSUS (KEK) [DATASET NO. 6]
// Sesuai Daftar Data PDF: Halaman 10, Baris 6
// Sifat Data: TERBUKA | Jenis: DATA SPASIAL | Periode: JIKA UPDATE
// Atribut Data Lengkap (16 Atribut):
// FCODE, METADATA, SHAPE_Leng, SHAPE_Area, SRS_ID, OBJECTID, NAMOBJ, KUTKEK,
// NOMOR_PL, TANGGAL_PL, PEMILIK, LUAS_PENGU, DSRHKMKEK, LUASKEK, PENGUSULKE, BUPP
// ============================================================================

export interface KekPetaSpasialItem {
  id: number;
  objectId: number; // OBJECTID
  namobj: string; // NAMOBJ (Nama Objek)
  kutkek: 'Eksisting Beroperasi' | 'Tahap Konstruksi' | 'Perencanaan / Diusulkan'; // KUTKEK (Kategori Unsur KEK)
  nomorPl: string; // NOMOR_PL (Nomor Penetapan Lokasi)
  tanggalPl: string; // TANGGAL_PL (Tanggal Penetapan Lokasi)
  pemilik: string; // PEMILIK
  luasPengu: number; // LUAS_PENGU (Luas Penguasaan dalam Ha)
  dsrhkmkek: string; // DSRHKMKEK (Dasar Hukum Penetapan KEK)
  luaskek: number; // LUASKEK (Luas Resmi KEK dalam Ha)
  pengusulke: string; // PENGUSULKE (Pengusul KEK)
  bupp: string; // BUPP (Badan Usaha Pembangun & Pengelola)
  shapeLeng: number; // SHAPE_Leng (Keliling Perimeter Poligon dalam Meter)
  shapeArea: number; // SHAPE_Area (Luas Poligon Spasial dalam m²)
  srsId: string; // SRS_ID (Sistem Referensi Spasial Geodetik)
  fcode: string; // FCODE (Feature Code Geospasial Standar BIG)
  metadata: string; // METADATA
  // Parameter visual spasial untuk render SVG & interaktivitas map:
  polygonSvg: string; // SVG path atau polygon point
  centroid: { x: number; y: number }; // Titik koordinat persentase peta (0-100)
  themeColor: string;
  fillOpacity: number;
  kecamatan: string;
  statusKawasan: string;
  zonaSpasial: string[];
}

export const KEK_PETA_SPASIAL_DATA: KekPetaSpasialItem[] = [
  {
    id: 601,
    objectId: 1,
    namobj: 'KEK Nongsa (Nongsa Digital Park)',
    kutkek: 'Eksisting Beroperasi',
    nomorPl: 'PL-02.08/KEK-NDP/2021/BP',
    tanggalPl: '2021-06-12',
    pemilik: 'Badan Pengusahaan Batam (HPL) / PT Taman Resor Internet (HGB)',
    luasPengu: 166.45,
    dsrhkmkek: 'PP Republik Indonesia No. 68 Tahun 2021 tentang KEK Nongsa',
    luaskek: 166.45,
    pengusulke: 'PT Taman Resor Internet',
    bupp: 'PT Taman Resor Internet (Nongsa Digital Park Management)',
    shapeLeng: 7642.85,
    shapeArea: 1664500.0,
    srsId: 'EPSG:32648 (WGS 84 / UTM Zone 48N)',
    fcode: 'BA0020040 (Kawasan Ekonomi Khusus Teknologi & Pariwisata)',
    metadata: 'Satu Data BP Batam - Geoportal Spasial SIMPERUM (Dit. Pengelolaan Lahan & PDSI)',
    // Koordinat SVG Nongsa (ujung timur laut Batam Island)
    polygonSvg: 'M 72 26 L 79 24 L 83 29 L 77 34 L 71 31 Z',
    centroid: { x: 76, y: 28 },
    themeColor: '#0284c7', // Sky blue
    fillOpacity: 0.75,
    kecamatan: 'Nongsa',
    statusKawasan: 'Operasional Penuh (Data Center Hyperscale, Digital Hub, Film Studio)',
    zonaSpasial: ['Zona Ekonomi Digital (NDP Tech Hub)', 'Zona Data Center Tier-4 Nasional & Global', 'Zona Studio Animasi Infinite', 'Zona Resort Nongsa Point Marina'],
  },
  {
    id: 602,
    objectId: 2,
    namobj: 'KEK Batam Teknik (Batam Aero Technic)',
    kutkek: 'Eksisting Beroperasi',
    nomorPl: 'PL-02.08/KEK-BAT/2021/BP',
    tanggalPl: '2021-06-12',
    pemilik: 'Badan Pengusahaan Batam (HPL Bandara) / PT Batam Teknik',
    luasPengu: 30.0,
    dsrhkmkek: 'PP Republik Indonesia No. 67 Tahun 2021 tentang KEK Batam Teknik',
    luaskek: 30.0,
    pengusulke: 'PT Batam Teknik (Lion Air Group)',
    bupp: 'PT Batam Teknik',
    shapeLeng: 2894.4,
    shapeArea: 300000.0,
    srsId: 'EPSG:32648 (WGS 84 / UTM Zone 48N)',
    fcode: 'BA0020040 (Kawasan Ekonomi Khusus Industri Aviasi MRO)',
    metadata: 'Satu Data BP Batam - Geoportal Spasial SIMPERUM (Dit. Pengelolaan Kawasan Bandara)',
    // Koordinat SVG Hang Nadim (tengah-timur Batam dekat runway Bandara)
    polygonSvg: 'M 62 39 L 68 38 L 69 44 L 63 45 Z',
    centroid: { x: 65, y: 41 },
    themeColor: '#4f46e5', // Indigo
    fillOpacity: 0.8,
    kecamatan: 'Nongsa / Bandara Hang Nadim',
    statusKawasan: 'Operasional Penuh (Hangar 1-6 Maintenance, Repair & Overhaul Pesawat)',
    zonaSpasial: ['Zona Hangar Overhaul Narrow & Wide Body', 'Zona Bengkel Turbofan Engine Workshop', 'Zona Pergudangan Suku Cadang Bea Cukai Mandiri'],
  },
  {
    id: 603,
    objectId: 3,
    namobj: 'KEK Pariwisata & Kesehatan Internasional Batam',
    kutkek: 'Tahap Konstruksi',
    nomorPl: 'PL-02.08/KEK-PKIB/2024/BP',
    tanggalPl: '2024-10-08',
    pemilik: 'Badan Pengusahaan Batam / Konsorsium PT Mayapada & PT Karang Kurita',
    luasPengu: 47.17,
    dsrhkmkek: 'PP Republik Indonesia No. 39 Tahun 2024 tentang KEK Pariwisata & Kesehatan Internasional Batam',
    luaskek: 47.17,
    pengusulke: 'PT Mayapada Batam Propertindo & PT Karang Kurita',
    bupp: 'PT Karang Kurita Healthcare International',
    shapeLeng: 4120.15,
    shapeArea: 471700.0,
    srsId: 'EPSG:32648 (WGS 84 / UTM Zone 48N)',
    fcode: 'BA0020040 (Kawasan Ekonomi Khusus Medis & Hospitality)',
    metadata: 'Satu Data BP Batam - Geoportal Spasial SIMPERUM (Dit. KEK & Biro Keuangan)',
    // Terdiri dari dua klaster: Sekupang (Barat) dan Nongsa (Timur)
    polygonSvg: 'M 25 41 L 30 40 L 32 46 L 27 47 Z',
    centroid: { x: 28, y: 43 },
    themeColor: '#059669', // Emerald
    fillOpacity: 0.8,
    kecamatan: 'Sekupang & Nongsa',
    statusKawasan: 'Tahap Pembangunan Konstruksi (Hospital Internasional & Wellness Resort)',
    zonaSpasial: ['Klaster Sekupang: RS Internasional Spesialis, Fakultas Kedokteran & Riset Medis', 'Klaster Nongsa: Wellness & Aesthetic Center, Eco-Health Resort Terpadu'],
  },
  {
    id: 604,
    objectId: 4,
    namobj: 'KEK Usulan: Tanjung Sauh (Green Energy & Port)',
    kutkek: 'Perencanaan / Diusulkan',
    nomorPl: 'USL-PL-02.08/KEK-TS/2024/DELIN',
    tanggalPl: '2024-04-15',
    pemilik: 'Pencadangan Lahan Alokasi Strategis BP Batam / Konsorsium Panbil',
    luasPengu: 840.67,
    dsrhkmkek: 'Rekomendasi Dewan Nasional KEK No. T-04/DN-KEK/2024 (Menunggu Penetapan RPP)',
    luaskek: 840.67,
    pengusulke: 'PT Batam Shell Terminal & Panbil Group',
    bupp: 'PT Kawasan Industri Tanjung Sauh',
    shapeLeng: 14250.6,
    shapeArea: 8406700.0,
    srsId: 'EPSG:32648 (WGS 84 / UTM Zone 48N)',
    fcode: 'BA0020040 (Usulan KEK Pelabuhan Laut & Energi Hijau)',
    metadata: 'Delineasi Rencana Spasial RTRW Batam 2020-2040 & Dit. Perencanaan Infrastruktur',
    // Lokasi di Pulau Tanjung Sauh (sebelah timur Batam)
    polygonSvg: 'M 83 46 L 89 44 L 92 50 L 86 53 Z',
    centroid: { x: 87, y: 48 },
    themeColor: '#d97706', // Amber
    fillOpacity: 0.75,
    kecamatan: 'Nongsa (Pulau Tanjung Sauh)',
    statusKawasan: 'Tahap Harmonisasi RPP Menko Perekonomian & Legal Drafting Setneg',
    zonaSpasial: ['Zona Deep Sea Port Container Hub', 'Zona Solar PV 500 MW & LNG Transshipment', 'Zona Heavy Industry Assembly'],
  },
  {
    id: 605,
    objectId: 5,
    namobj: 'KEK Usulan: Rempang Eco-City (Tahap I)',
    kutkek: 'Perencanaan / Diusulkan',
    nomorPl: 'USL-PL-02.08/KEK-RMP/2024/DELIN',
    tanggalPl: '2024-08-20',
    pemilik: 'Hak Pengelolaan (HPL) BP Batam / PT Makmur Elok Graha',
    luasPengu: 1200.0,
    dsrhkmkek: 'Pencanangan Proyek Strategis Nasional (PSN) & Dokumen Usulan Dewan KEK',
    luaskek: 1200.0,
    pengusulke: 'PT Makmur Elok Graha & Xinyi Group Global',
    bupp: 'PT Rempang Eco-City Mandiri',
    shapeLeng: 21800.0,
    shapeArea: 12000000.0,
    srsId: 'EPSG:32648 (WGS 84 / UTM Zone 48N)',
    fcode: 'BA0020040 (Usulan KEK Manufaktur & Solar Glass Terpadu)',
    metadata: 'Geoportal Spasial BP Batam Kawasan Barelang Pulau Rempang',
    // Lokasi di Pulau Rempang (Selatan Batam via jembatan Barelang)
    polygonSvg: 'M 71 72 L 80 70 L 83 80 L 73 82 Z',
    centroid: { x: 77, y: 76 },
    themeColor: '#ea580c', // Orange
    fillOpacity: 0.75,
    kecamatan: 'Galang (Pulau Rempang)',
    statusKawasan: 'Proses Verifikasi Kelayakan AMDAL & Infrastruktur Dasar BP Batam',
    zonaSpasial: ['Zona Industri Solar Glass & Kaca Terapung', 'Zona Logistik & Pelabuhan Ekspor Rempang', 'Zona Pusat Riset EBT & RTH'],
  },
  {
    id: 606,
    objectId: 6,
    namobj: 'KEK Usulan: Tembesi High-Tech Industrial Park',
    kutkek: 'Perencanaan / Diusulkan',
    nomorPl: 'USL-PL-02.08/KEK-TMB/2025/DELIN',
    tanggalPl: '2025-01-14',
    pemilik: 'Pencadangan Kawasan Industri BP Batam / Batamindo Group',
    luasPengu: 380.5,
    dsrhkmkek: 'Pengajuan Dokumen Usulan Baru Dit. Pengembangan KPBPBB & KEK',
    luaskek: 380.5,
    pengusulke: 'PT Batamindo Investment Cakrawala',
    bupp: 'PT Batamindo High-Tech Park',
    shapeLeng: 9400.0,
    shapeArea: 3805000.0,
    srsId: 'EPSG:32648 (WGS 84 / UTM Zone 48N)',
    fcode: 'BA0020040 (Usulan KEK Semikonduktor & Riset AI)',
    metadata: 'Masterplan Tata Ruang Wilayah Sagulung & Tembesi BP Batam',
    // Lokasi di Tembesi / Sagulung tengah-selatan Batam
    polygonSvg: 'M 47 57 L 54 55 L 56 62 L 49 63 Z',
    centroid: { x: 51, y: 59 },
    themeColor: '#8b5cf6', // Violet
    fillOpacity: 0.75,
    kecamatan: 'Sagulung (Tembesi)',
    statusKawasan: 'Penyusunan Studi Kelayakan Finansial & Andalalin Lalu Lintas',
    zonaSpasial: ['Zona Fabrikasi Semikonduktor & Testing Chip', 'Zona Perakitan Baterai Kendaraan Listrik (EV)', 'Zona Kampus Riset Kecerdasan Artifisial (AI)'],
  },
  {
    id: 607,
    objectId: 7,
    namobj: 'KEK Usulan: Galang Maritim & Offshore Engineering',
    kutkek: 'Perencanaan / Diusulkan',
    nomorPl: 'USL-PL-02.08/KEK-GLG/2025/DELIN',
    tanggalPl: '2025-02-18',
    pemilik: 'Alokasi Pesisir BP Batam / Konsorsium Galangan Kapal Batam',
    luasPengu: 520.0,
    dsrhkmkek: 'Pengajuan Proposal Awal Kawasan Industri Maritim Khusus',
    luaskek: 520.0,
    pengusulke: 'PT Bandar Abadi Maritim & Konsorsium Galang',
    bupp: 'PT Galang Maritim Ekosistem',
    shapeLeng: 11200.0,
    shapeArea: 5200000.0,
    srsId: 'EPSG:32648 (WGS 84 / UTM Zone 48N)',
    fcode: 'BA0020040 (Usulan KEK Industri Maritim & Offshore)',
    metadata: 'Geoportal Spasial Wilayah Barelang Galang Pesisir Barat',
    // Lokasi di Pulau Galang (paling selatan)
    polygonSvg: 'M 74 88 L 82 86 L 84 94 L 75 95 Z',
    centroid: { x: 79, y: 91 },
    themeColor: '#06b6d4', // Cyan
    fillOpacity: 0.75,
    kecamatan: 'Galang (Sijantung)',
    statusKawasan: 'Tahap Kajian Kelayakan Lingkungan Pesisir & Rekomendasi PKKPRL KKP',
    zonaSpasial: ['Zona Yard Fabrikasi Anjungan Lepas Pantai (Offshore Rig)', 'Zona Drydock Konversi Kapal Ramah Lingkungan', 'Zona Dermaga Logistik Heavy Lift'],
  },
];

