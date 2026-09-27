import {
  PerkinA6KpiItem,
  FinancialTowerRow,
  OperationalUnitSummary,
  ActiveAlertItem,
  DeputyAiControlBrief,
  DeepDiveUnitProfile,
} from './types';

// ============================================================================
// METADATA DOKUMEN PERJANJIAN KINERJA (PERKIN A6) PELAYANAN UMUM RESMI
// Sesuai Perjanjian Kinerja No: 6 /KA/ 3 /2025 Antara Kepala BP Batam & Deputi PU
// ============================================================================
export const PERKIN_A6_METADATA = {
  nomorPerkin: 'Nomor: 6 /KA/ 3 /2025',
  tahun: 2025,
  tahunAnggaran: 2025,
  periodeCutOff: 'Akumulasi Berjalan (Januari s.d Desember)',
  judul: 'Perjanjian Kinerja Antara Kepala BP Batam dengan Anggota/Deputi Bidang Pelayanan Umum',
  namaPejabatPihakPertama: 'Ariastuty Sirait',
  jabatanPihakPertama: 'Anggota/Deputi Bidang Pelayanan Umum',
  namaPejabatPihakKedua: 'Amsakar Achmad',
  jabatanPihakKedua: 'Kepala Badan Pengusahaan Perdagangan Bebas dan Pelabuhan Bebas Batam',
  tanggalPenetapan: '13 Maret 2025',
  instansi: 'Badan Pengusahaan Batam (BP Batam)',
  sasaranProgram: 'Meningkatnya Kinerja dan Kualitas Badan Usaha Pelayanan Umum BP Batam',
  totalUnitBawahan: 3,
  daftarUnit: [
    'Badan Usaha Rumah Sakit (RSBP Batam)',
    'Direktorat Pengamanan Aset dan Kawasan (Ditpam)',
    'Badan Usaha SPAM, Fasilitas dan Lingkungan (BU SPAM Fasling)',
  ],
  totalDatasetSatuData: 121, // 18 RSBP + 12 Ditpam + 91 BU SPAM Fasling
  deskripsi:
    'Rancangan Command Center Eksekutif Perkin A6 (Deputi Bidang Pelayanan Umum) berbasis Penetapan Indikator Kinerja Program resmi: 1. Persentase Peningkatan Kinerja Badan Usaha (Target 1,1%), 2. Rasio PNBP BU terhadap PNBP BP Batam (Target 0,68), dan 3. Rata-rata IKM pengguna layanan Badan Usaha (Target 88,31 Mutu A).',
};

// ============================================================================
// 1. TIGA INDIKATOR KINERJA PROGRAM (IKP) RESMI PERKIN A6 - 3 POINT UTAMA
// Sesuai Lampiran I Penetapan Indikator Kinerja Program & Penjelasan Uraian IKP
// ============================================================================
export const PERKIN_A6_KPIS: PerkinA6KpiItem[] = [
  {
    id: 'ikp-1',
    nomor: 1,
    kode: 'IKP-A6.01',
    indikator: 'Persentase Peningkatan Kinerja Badan Usaha',
    program: 'Meningkatnya kinerja Badan Usaha Pelayanan Umum BP Batam',
    sasaranProgram: 'Meningkatnya kinerja Badan Usaha Pelayanan Umum BP Batam',
    targetDisplay: '1,1%',
    targetNumeric: 1.1,
    realisasiDisplay: '1,24%',
    realisasiNumeric: 1.24,
    satuan: '%',
    persenCapaian: 112.73,
    status: 'healthy',
    statusLabel: '112.7% Melampaui Target (1,1%)',
    formula: '% Peningkatan Kinerja BU = (Realisasi Pendapatan BU Tahun Ini / Realisasi Pendapatan BU Tahun Lalu) × 100%',
    penjelasanOperasional:
      'Peningkatan kinerja adalah hasil atau output yang dicapai Badan Usaha/Unit Usaha dalam kurun waktu tertentu, dibandingkan dengan capaian tahun sebelumnya.',
    tujuan:
      'IKP ini bertujuan untuk memacu Pemimpin BU agar meningkatkan kreatifitas dan inovasi dalam mengoptimalkan dan menggali sumber-sumber pendapatan BU.',
    polarisasi: 'Maximize (semakin tinggi capaian semakin baik)',
    periodePelaporan: 'Kuartal / Tahunan',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Januari s.d Desember)',
    sumberData: 'Laporan Keuangan',
    deskripsi:
      'Mengukur pertumbuhan dan peningkatan pendapatan fungsional Badan Usaha Pelayanan Umum (BU Rumah Sakit dan BU SPAM Fasling) dibandingkan periode tahun lalu. Capaian YTD sebesar 1,24% melampaui target perjanjian kinerja (1,1%).',
    komponenUnit: [
      {
        unit: 'BU Rumah Sakit (RSBP)',
        target: 1.1,
        realisasi: 4.55,
        persen: 413.6,
        satuan: '%',
        subLabel: 'Realisasi Rp 121,8M vs Rp 116,5M',
      },
      {
        unit: 'BU SPAM, Fasilitas & Lingkungan',
        target: 1.1,
        realisasi: 2.37,
        persen: 215.5,
        satuan: '%',
        subLabel: 'Realisasi Rp 142,5M vs Rp 139,2M',
      },
      {
        unit: 'Konsolidasi Pertumbuhan BU',
        target: 1.1,
        realisasi: 1.24,
        persen: 112.7,
        satuan: '%',
        subLabel: 'Pertumbuhan gabungan di atas target',
      },
    ],
  },
  {
    id: 'ikp-2',
    nomor: 2,
    kode: 'IKP-A6.02',
    indikator: 'Rasio PNBP BU terhadap PNBP BP Batam',
    program: 'Meningkatnya kinerja Badan Usaha Pelayanan Umum BP Batam',
    sasaranProgram: 'Meningkatnya kinerja Badan Usaha Pelayanan Umum BP Batam',
    targetDisplay: '0,68',
    targetNumeric: 0.68,
    realisasiDisplay: '0,71',
    realisasiNumeric: 0.71,
    satuan: 'Rasio',
    persenCapaian: 104.41,
    status: 'healthy',
    statusLabel: 'Rasio 0.71 (Target 0.68 Tercapai)',
    formula: 'Rasio = (Realisasi Pendapatan Badan Usaha/Unit Usaha) / (Target PNBP BP Batam)',
    penjelasanOperasional:
      'Rasio PNBP BU terhadap PNBP BP Batam adalah perbandingan antara PNBP Badan Usaha dengan PNBP BP Batam. Rasio ini menunjukan kinerja PNBP.',
    polarisasi: 'Maximize (semakin tinggi capaian semakin baik)',
    periodePelaporan: 'Tahunan',
    jenisKonsolidasi: 'Januari s.d Desember',
    sumberData: 'RKKL Tahun 2025/POK & Laporan Keuangan Tahun 2025',
    deskripsi:
      'Indikator strategis kontribusi finansial Badan Usaha Pelayanan Umum terhadap total target PNBP BP Batam secara keseluruhan. Rasio realisasi saat ini mencapai 0,71 melampaui target penetapan 0,68.',
    komponenUnit: [
      {
        unit: 'BU Rumah Sakit (RSBP)',
        target: 0.31,
        realisasi: 0.33,
        persen: 106.5,
        satuan: 'Rasio',
        subLabel: 'PNBP Rp 121,8M terhadap BP Batam',
      },
      {
        unit: 'BU SPAM, Fasilitas & Lingkungan',
        target: 0.37,
        realisasi: 0.38,
        persen: 102.7,
        satuan: 'Rasio',
        subLabel: 'PNBP Rp 142,5M terhadap BP Batam',
      },
      {
        unit: 'Total Rasio Kontribusi BU',
        target: 0.68,
        realisasi: 0.71,
        persen: 104.4,
        satuan: 'Rasio',
        subLabel: 'Target 0.68 berhasil dipenuhi',
      },
    ],
  },
  {
    id: 'ikp-3',
    nomor: 3,
    kode: 'IKP-A6.03',
    indikator: 'Rata-rata IKM pengguna layanan Badan Usaha',
    program: 'Meningkatnya Kualitas Badan Usaha Pelayanan Umum BP Batam',
    sasaranProgram: 'Meningkatnya Kualitas Badan Usaha Pelayanan Umum BP Batam',
    targetDisplay: '88,31 (Mutu A)',
    targetNumeric: 88.31,
    realisasiDisplay: '88,66',
    realisasiNumeric: 88.66,
    satuan: 'Indeks (Skala 1 - 100)',
    persenCapaian: 100.40,
    status: 'healthy',
    statusLabel: '88.66 • Mutu A (Sangat Baik)',
    formula: 'Hasil Pengukuran IKM (Skala 1 - 100) sesuai PermenPAN-RB No. 14 Tahun 2017: 88,31 - 100,00: Mutu A (Sangat Baik)',
    penjelasanOperasional:
      'Indeks Kepuasan Masyarakat Terhadap Pelayanan Publik adalah hasil pengukuran dari kegiatan survei kepuasan masyarakat berupa angka. Angka ditetapkan dengan skala 1 (satu) sampai dengan 100 (seratus) memedomani PermenPAN-RB No. 14 Tahun 2017. Survei dilaksanakan terhadap 2 (dua) Badan Usaha BP Batam: 1. Badan Usaha Rumah Sakit; 2. Badan Usaha SPAM, Fasilitas dan Lingkungan.',
    tujuan: 'IKP ini bertujuan untuk meningkatkan kualitas pelayanan publik secara berkelanjutan.',
    polarisasi: 'Maximize (semakin tinggi capaian semakin baik)',
    periodePelaporan: 'Semester / Tahunan',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Januari s.d Desember)',
    sumberData: 'Hasil Survei Kepuasan Masyarakat',
    deskripsi:
      'Capaian kepuasan masyarakat atas layanan publik BLU. Berdasarkan PermenPAN-RB No. 14/2017, skor 88,66 masuk dalam kategori Mutu A (Sangat Baik) dengan rentang standar 88,31 - 100,00.',
    komponenUnit: [
      {
        unit: 'BU Rumah Sakit (RSBP)',
        target: 88.31,
        realisasi: 88.92,
        persen: 100.69,
        satuan: 'Skor',
        subLabel: 'Mutu A (Sangat Baik)',
      },
      {
        unit: 'BU SPAM, Fasilitas & Lingkungan',
        target: 88.31,
        realisasi: 88.40,
        persen: 100.10,
        satuan: 'Skor',
        subLabel: 'Mutu A (Sangat Baik)',
      },
      {
        unit: 'Rata-rata Gabungan 2 BU',
        target: 88.31,
        realisasi: 88.66,
        persen: 100.40,
        satuan: 'Skor',
        subLabel: 'Target 88.31 (Mutu A) Tercapai',
      },
    ],
  },
];

// ============================================================================
// 2. FINANCIAL CONTROL TOWER (ANALISIS ANGGARAN & PENDAPATAN 3 UNIT KERJA)
// Realisasi Pendapatan (PNBP), Realisasi Belanja, dan Analisis Surplus/Defisit
// ============================================================================
export const FINANCIAL_CONTROL_TOWER_DATA: FinancialTowerRow[] = [
  {
    unitId: 'bu-rumah-sakit',
    namaUnit: 'Badan Usaha Rumah Sakit (RSBP)',
    singkatan: 'BU RUMAH SAKIT',
    kategori: 'Pelayanan Kesehatan BLU',
    jenisUnit: 'Badan Usaha (BLU)',
    budgetCapClass: 'BLU FULL COST RECOVERY',
    paguBelanjaMiliar: 120.0,
    realisasiBelanjaMiliar: 108.4,
    serapanPersen: 90.3,
    sisaBelanjaMiliar: 11.6,
    targetPnbpMiliar: 115.0,
    realisasiPnbpMiliar: 121.8,
    capaianPnbpPersen: 105.9,
    surplusDefisitMiliar: 13.4, // Realisasi PNBP (121.8) - Realisasi Belanja (108.4) = +13.4 M (SURPLUS)
    costRecoveryRate: 112.4, // (121.8 / 108.4) * 100%
    status: 'healthy',
    statusLabel: 'Surplus Operasional +Rp 13.4M (CRR 112.4%)',
    catatanFiskal: 'Mandiri secara fiskal BLU dengan Cost Recovery Rate 112.4% dan surplus disalurkan untuk reinvestasi sarana medis.',
  },
  {
    unitId: 'bu-spam-fasling',
    namaUnit: 'Badan Usaha SPAM, Fasilitas dan Lingkungan',
    singkatan: 'BU SPAM & FASLING',
    kategori: 'Air Minum, Limbah B3, Rusun & Fasilitas',
    jenisUnit: 'Badan Usaha (BLU)',
    budgetCapClass: 'BLU REVENUE & ASSET HUB',
    paguBelanjaMiliar: 135.0,
    realisasiBelanjaMiliar: 124.2,
    serapanPersen: 92.0,
    sisaBelanjaMiliar: 10.8,
    targetPnbpMiliar: 130.0,
    realisasiPnbpMiliar: 142.5,
    capaianPnbpPersen: 109.6,
    surplusDefisitMiliar: 18.3, // Realisasi PNBP (142.5) - Realisasi Belanja (124.2) = +18.3 M (SURPLUS)
    costRecoveryRate: 114.7, // (142.5 / 124.2) * 100%
    status: 'healthy',
    statusLabel: 'Surplus Operasional +Rp 18.3M (CRR 114.7%)',
    catatanFiskal: 'Surplus fungsional kuat dari penjualan air curah industri, pengelolaan limbah B3 KPLI, dan sewa rusunawa.',
  },
  {
    unitId: 'dit-pam-aset',
    namaUnit: 'Direktorat Pengamanan Aset dan Kawasan',
    singkatan: 'DIR. PENGAMANAN ASET',
    kategori: 'Pengamanan Objek Vital & Kawasan Hutan Lindung (Public Safety)',
    jenisUnit: 'Direktorat (Cost Center)',
    budgetCapClass: 'PUBLIC SAFETY & ASSET DEFENSE',
    paguBelanjaMiliar: 45.0,
    realisasiBelanjaMiliar: 41.6,
    serapanPersen: 92.4,
    sisaBelanjaMiliar: 3.4,
    targetPnbpMiliar: 3.5,
    realisasiPnbpMiliar: 3.8,
    capaianPnbpPersen: 108.6,
    surplusDefisitMiliar: -37.8, // Realisasi PNBP (3.8) - Realisasi Belanja (41.6) = -37.8 M (NET COST CENTER)
    costRecoveryRate: 9.1, // (3.8 / 41.6) * 100%
    status: 'monitor',
    statusLabel: 'Cost Center Operasional (-Rp 37.8M)',
    catatanFiskal: 'Aparat penegakan hukum dan pelindung aset negara senilai Rp 3,2 T; belanja operasional didanai penuh oleh DIPA BP Batam.',
  },
];

// Konsolidasi Financial Control Tower
export const FINANCIAL_TOWER_CONSOLIDATED = {
  totalPaguBelanjaMiliar: 300.0,
  totalRealisasiBelanjaMiliar: 274.2,
  serapanKonsolidasiPersen: 91.4,
  totalSisaBelanjaMiliar: 25.8,
  totalTargetPnbpMiliar: 248.5,
  totalRealisasiPnbpMiliar: 268.1,
  capaianPnbpKonsolidasiPersen: 107.9,
  // Konsolidasi Khusus 2 Badan Usaha (RSBP + SPAM Fasling)
  buTotalPendapatanMiliar: 264.3,
  buTotalBelanjaMiliar: 232.6,
  buNetSurplusMiliar: 31.7, // 264.3 - 232.6 = +31.7 M
  buCostRecoveryRate: 113.6, // (264.3 / 232.6) * 100%
  // Konsolidasi Fiskal Deputi PU Keseluruhan (termasuk biaya pengamanan Ditpam)
  totalNetFiscalMiliar: -6.1, // 268.1 - 274.2 = -6.1 M (Didukung DIPA Pusat BP Batam)
  fiscalHealth: 'FISCAL HEALTH: MANDIRI & SURPLUS BADAN USAHA (+Rp 31.7M)',
};

// ============================================================================
// 3. OPERATIONAL UNIT PERFORMANCE (3 PILAR PELAYANAN UMUM)
// Disusun berdasarkan atribut resmi Satu Data (Hal 17-19, 19-21, 28-37)
// ============================================================================
export const OPERATIONAL_UNITS_DATA: OperationalUnitSummary[] = [
  {
    unitId: 'bu-rumah-sakit',
    namaUnit: 'Badan Usaha Rumah Sakit (RSBP Batam)',
    singkatan: 'BU RUMAH SAKIT',
    iconName: 'Stethoscope',
    tipeEntitas: 'Badan Usaha (BLU Penuh)',
    status: 'healthy',
    statusLabel: 'PRIMA (MUTU A)',
    coreRole: 'Layanan Medis Rujukan Spesialistik, KEK Pariwisata Kesehatan & Center of Excellence Kardiovaskular',
    quickStats: [
      { label: 'BOR (Bed Occupancy)', value: '78.4%', subLabel: 'Standar Kemenkes 60-85%', trend: '+2.8%' },
      { label: 'Kunjungan Pasien', value: '142.850', subLabel: 'Rawat Jalan, Inap & IGD', trend: '+6.2%' },
      { label: 'Cost Recovery (CRR)', value: '112.4%', subLabel: 'Pendapatan vs Belanja', trend: '+1.5%' },
      { label: 'Kepatuhan Obat Generik', value: '98.4%', subLabel: 'Standar Formularium', trend: '+0.6%' },
    ],
    pillars: [
      {
        title: 'Efisiensi Pelayanan Medis',
        badge: 'BOR 78.4%',
        metrics: [
          { label: 'Average Length of Stay (ALOS)', value: '4.2 Hari', sub: 'Standar efisiensi rawat' },
          { label: 'Turn Over Interval (TOI)', value: '1.6 Hari', sub: 'Waktu perputaran tempat tidur' },
          { label: 'Kapasitas Tempat Tidur Terpasang', value: '260 TT', sub: 'Kelas VIP, 1, 2, 3 & ICU' },
        ],
      },
      {
        title: 'Center of Excellence (Layanan Unggulan)',
        badge: 'KEK Kesehatan',
        metrics: [
          { label: 'Kateterisasi Jantung (Cath Lab)', value: '520 Prosedur', sub: 'Intervensi vaskular 24 jam' },
          { label: 'Radioterapi & Onkologi Terpadu', value: '1.240 Sesi', sub: 'Penanganan kanker modern' },
          { label: 'Trauma Center & Bedah Saraf', value: '380 Kasus', sub: 'Respons tanggap darurat' },
        ],
      },
      {
        title: 'Aktivitas Kunjungan & Akses Finansial',
        badge: '142.850 Pasien',
        metrics: [
          { label: 'Rawat Jalan Poliklinik', value: '118.420 Pasien', sub: '24 poliklinik spesialis' },
          { label: 'Instalasi Gawat Darurat (IGD)', value: '14.280 Pasien', sub: 'Layanan emergensi 24/7' },
          { label: 'Distribusi Penjamin Pasien', value: 'BPJS 72% | Asuransi 18% | Umum 10%', sub: 'Akses jaminan semesta' },
        ],
      },
    ],
    operationalHighlights: [
      'Pengoperasian 6 kamar operasi modular dan fasilitas Kateterisasi Jantung (Cath Lab) rujukan Kepulauan Riau.',
      'Kapasitas 260 tempat tidur terakreditasi Paripurna KARS dengan rata-rata waktu rawat inap (ALOS) 4.2 hari.',
      'Digitalisasi resep farmasi generik mencapai 98.4% kepatuhan formularium nasional dengan antrean elektronik.',
      'Realisasi PNBP fungsional medis mencapai Rp 121.8 Miliar (105.9% dari target penetapan).',
    ],
    pdfPages: 'Halaman 19 - 21 (18 Dataset Atribut)',
    totalDatasetSatuData: 18,
  },
  {
    unitId: 'dit-pam-aset',
    namaUnit: 'Direktorat Pengamanan Aset dan Kawasan (Ditpam)',
    singkatan: 'DIT. PENGAMANAN ASET & KAWASAN',
    iconName: 'Shield',
    tipeEntitas: 'Direktorat Penegakan & Pengamanan',
    status: 'healthy',
    statusLabel: 'SIAGA & KONDUSIF',
    coreRole: 'Pengamanan Objek Vital Nasional, Penertiban Bangunan Liar, Perlindungan DTA Waduk & Tanggap Darurat',
    quickStats: [
      { label: 'Personil Bersertifikasi', value: '480 / 642', subLabel: 'Gada Pratama/Madya/Utama', trend: '+12.5%' },
      { label: 'Bangunan Liar Ditertibkan', value: '874 Unit', subLabel: '84.9% dari 1.030 target', trend: '+8.4%' },
      { label: 'Sterilisasi Buffer DTA', value: '41.2 Ha', subLabel: 'Duriangkang & Mukakuning', trend: '+15.0%' },
      { label: 'Objek Vital Kritis 24/7', value: '7 Lokasi', subLabel: '100% Bebas Gangguan', trend: 'Stabil' },
    ],
    pillars: [
      {
        title: 'Kesiapsiagaan Pasukan & Sertifikasi',
        badge: '642 Personil',
        metrics: [
          { label: 'Total Kekuatan Personil Aktif', value: '642 Anggota', sub: 'Ditpam BP Batam' },
          { label: 'Personil Bersertifikasi Khusus', value: '480 Anggota', sub: 'Kualifikasi Gada & Damkar' },
          { label: 'Pos Jaga Strategis Kawasan', value: '32 Pos Aktif', sub: 'Patroli reaksi cepat 24 jam' },
        ],
      },
      {
        title: 'Operasi Penertiban & Perlindungan Hutan',
        badge: '874 Bangli Ditertibkan',
        metrics: [
          { label: 'Penertiban Bangunan Liar', value: '874 Unit Selesai', sub: 'Dari 1.030 verifikasi lapangan' },
          { label: 'Sterilisasi Daerah Tangkapan Air (DTA)', value: '41.2 Hektar', sub: 'Perlindungan resapan waduk' },
          { label: 'Penertiban Ruang Milik Jalan (ROW)', value: '62 Titik', sub: 'Kelancaran infrastruktur kota' },
        ],
      },
      {
        title: 'Proteksi Obvit & Tanggap Kebencanaan',
        badge: '7 Obvit Terlindungi',
        metrics: [
          { label: 'Objek Vital Kritis Terjaga', value: '7 Obvit 24/7', sub: 'Bandara, Pelabuhan, Kantor, Waduk' },
          { label: 'Pengamanan Aksi Unjuk Rasa', value: '38 Aksi Terkendali', sub: '100% dialog damai & kondusif' },
          { label: 'Mitigasi Karhutla & Bencana Alam', value: '62 Kejadian', sub: '41 Karhutla + 21 Evakuasi SAR' },
        ],
      },
    ],
    operationalHighlights: [
      'Pengamanan 24/7 tanpa henti pada 7 Objek Vital Kritis: Bandara Hang Nadim, Pelabuhan Batu Ampar, Pelabuhan Sekupang, Kantor BP Batam, Waduk Duriangkang, Waduk Mukakuning, dan KPLI B3.',
      'Penertiban humanis 874 bangunan liar dan sterilisasi perambahan pada 41.2 Ha Daerah Tangkapan Air (DTA) waduk utama.',
      'Peningkatan kompetensi 480 personil bersertifikasi khusus kualifikasi Gada Pratama/Madya/Utama dan proteksi pemadam kebakaran.',
      'Penanganan kondusif 38 aksi unjuk rasa serta pemadaman terkoordinasi 41 titik karhutla bersama Manggala Agni & Damkar.',
    ],
    pdfPages: 'Halaman 17 - 19 (12 Dataset Atribut)',
    totalDatasetSatuData: 12,
  },
  {
    unitId: 'bu-spam-fasling',
    namaUnit: 'Badan Usaha SPAM, Fasilitas dan Lingkungan',
    singkatan: 'BU SPAM, FASILITAS & LINGKUNGAN',
    iconName: 'Droplets',
    tipeEntitas: 'Badan Usaha (Pengelolaan Air, Limbah & Aset)',
    status: 'healthy',
    statusLabel: 'OPTIMAL (MUTU A)',
    coreRole: 'Penyediaan Air Bersih Perpipaan, Pengolahan Limbah Industri B3, Hunian Rusunawa & Pengelolaan Aset Komersial',
    quickStats: [
      { label: 'Kapasitas Produksi Air', value: '3.650 L/dtk', subLabel: '6 WTP Waduk Utama', trend: '+4.5%' },
      { label: 'Tingkat Kehilangan Air (NRW)', value: '24.2%', subLabel: 'Ditekan di 23 DMZ', trend: '-2.1%' },
      { label: 'Limbah B3 KPLI Diolah', value: '148.200 Ton', subLabel: 'Padat, Cair & Sludge', trend: '+7.4%' },
      { label: 'Tingkat Hunian Rusunawa', value: '92.5%', subLabel: '3.840 Unit Terisi', trend: '+3.2%' },
    ],
    pillars: [
      {
        title: 'Penyediaan Air Minum (SPAM)',
        badge: '3.650 L/dtk',
        metrics: [
          { label: 'Kapasitas 6 WTP / IPA Aktif', value: '3.650 L/Detik', sub: 'Duriangkang, Mukakuning, Ladi, dll' },
          { label: 'Daya Tampung 6 Waduk Strategis', value: '104 Juta m³', sub: 'Cadangan air baku Batam' },
          { label: 'Non-Revenue Water (NRW)', value: '24.2%', sub: 'Pemantauan 23 District Meter Area' },
        ],
      },
      {
        title: 'Pengelolaan Limbah Industri B3 (KPLI)',
        badge: '148.200 Ton B3',
        metrics: [
          { label: 'Total Limbah B3 Terolah', value: '148.200 Ton', sub: 'Limbah padat, cair & sludge minyak' },
          { label: 'Jumlah Tenant Industri KPLI', value: '42 Mitra Aktif', sub: 'Perusahaan manufaktur & galangan' },
          { label: 'Uji Laboratorium Air & Limbah', value: '1.450 Sampel', sub: 'Tersertifikasi akreditasi KAN' },
        ],
      },
      {
        title: 'Fasilitas Komersial, Rusun & Rekreasi',
        badge: '92.5% Okupansi',
        metrics: [
          { label: 'Okupansi Rusunawa Pekerja', value: '92.5% Terisi', sub: '3.840 unit di 4 kawasan industri' },
          { label: 'Kunjungan Wisata Taman Rusa', value: '185.000 Wisatawan', sub: 'Pariwisata alam Sekupang' },
          { label: 'Sport Hall & Gedung Komersial', value: 'Gedung BIDA & TJ', sub: 'Event olahraga, MICE & Asrama Haji' },
        ],
      },
    ],
    operationalHighlights: [
      'Operasional 6 Instalasi Pengolahan Air (IPA/WTP) Duriangkang, Mukakuning, Piayu, Harapan, Nongsa, Ladi berkapasitas 3.650 L/detik.',
      'Pengendalian kehilangan air (NRW) ditekan ke 24.2% melalui monitoring sensor debit dan tekanan pada 23 District Meter Zone (DMZ).',
      'Pengolahan terpadu 148.200 Ton limbah B3 industri di KPLI Sambau melayani 42 tenant industri fabrikasi dan manufaktur.',
      'Pengelolaan 3.840 unit hunian Rusunawa dengan okupansi 92.5% dan rekreasi Taman Rusa Sekupang yang dikunjungi 185.000 wisatawan.',
    ],
    pdfPages: 'Halaman 28 - 37 (91 Dataset Atribut)',
    totalDatasetSatuData: 91,
  },
];

// ============================================================================
// 4. DEPUTY AI CONTROL & STRATEGIC SYNTHESIS (EXECUTIVE ADVISORY)
// ============================================================================
export const DEPUTY_AI_CONTROL_BRIEFS: DeputyAiControlBrief[] = [
  {
    id: 1,
    unit: 'Badan Usaha Rumah Sakit (RSBP)',
    analisis:
      'Kinerja Rumah Sakit relatif stabil dan menjadi penopang utama pendapatan fungsional deputi, namun waktu tunggu layanan farmasi poliklinik perlu dijaga agar tidak menurunkan skor kepuasan pasien saat peak-hours.',
    rekomendasi:
      'Implementasikan loket digital self-check in dan otomasi dispensing obat generik untuk memotong antrian dari 48 menit menjadi di bawah 25 menit.',
    dampakStrategis: 'Menjaga mutu layanan kelas A dan mendongkrak retensi pasien umum/asuransi.',
  },
  {
    id: 2,
    unit: 'Direktorat Pengamanan Aset dan Kawasan',
    analisis:
      'Pengamanan aset dan kawasan masih dalam status terkendali, tetapi terdapat konsentrasi insiden pada beberapa area DTA Waduk Duriangkang dan Mukakuning yang memerlukan patroli presisi perimeter lebih intensif.',
    rekomendasi:
      'Tingkatkan intensitas patroli gabungan Ditpam bersama Tim Terpadu serta pasang drone surveillance pada 5 buffer zone berisiko perambahan hutan lindung.',
    dampakStrategis: 'Mencegah kerusakan daerah resapan air baku yang menjadi sumber hidup Kota Batam.',
  },
  {
    id: 3,
    unit: 'Badan Usaha SPAM, Fasilitas dan Lingkungan',
    analisis:
      'Pasokan air curah dari 6 waduk berjalan kontinu dengan kapasitas 3.420 L/dtk. Namun tingkat kehilangan air (NRW) pada DMZ perkotaan Batu Ampar dan Sekupang perlu intervensi peremajaan pipa transmisi.',
    rekomendasi:
      'Akselerasi penggantian 18 logger DMZ yang malfungsi dan percepat optimalisasi WTP Muka Kuning 350 L/dtk untuk menjamin pasokan industri KEK.',
    dampakStrategis: 'Meningkatkan realisasi PNBP air hingga target Rp 110.0 M di semester kedua.',
  },
];

// Active Alerts & Critical Priorities
export const ACTIVE_ALERTS: ActiveAlertItem[] = [
  {
    id: 'alt-01',
    unit: 'BU RUMAH SAKIT',
    level: 'warning',
    judul: 'Waktu Tunggu Antrian Farmasi Poliklinik',
    deskripsi: 'Rata-rata waktu tunggu penebusan obat pada jam 10:00-13:00 mencapai 48 menit di atas standar SLA (30 menit).',
    waktu: 'Terdeteksi 2 jam lalu',
    actionRequired: 'Aktivasi sistem fast-track resep kronis generik dan penambahan staf farmasi asisten.',
  },
  {
    id: 'alt-02',
    unit: 'DIR. PENGAMANAN',
    level: 'warning',
    judul: 'Aktivitas Perambahan Baru di Buffer DTA Duriangkang',
    deskripsi: 'Teridentifikasi 12 titik pemancangan gubuk liar baru seluas 2.400 m2 di perbatasan Tembesi Lama.',
    waktu: 'Laporan Patroli Pagi',
    actionRequired: 'Keluarkan SP-1 penertiban mandiri 7x24 jam dan siapkan tim terpadu Ditpam.',
  },
  {
    id: 'alt-03',
    unit: 'BU SPAM FASLING',
    level: 'info',
    judul: 'Fluktuasi Tekanan Air DMZ 04 (Batu Ampar)',
    deskripsi: 'Tekanan pipa distribusi turun ke 0.95 bar akibat lonjakan konsumsi dermaga logistik Batu Ampar.',
    waktu: 'Update Real-time SCADA',
    actionRequired: 'Tingkatkan rpm booster pump Sekupang-Batu Ampar untuk stabilisasi di 1.5 bar.',
  },
];

export const STRATEGIC_ACTION_PRIORITIES = [
  {
    id: 'act-1',
    category: 'HOSPITAL',
    priority: 'HIGH PRIORITY',
    title: 'OPTIMASI PENDAFTARAN & ANTRIAN RSBP',
    description: 'Implementasi e-queue responsif untuk mitigasi waktu tunggu pendaftaran dan farmasi rawat jalan.',
    unitTarget: 'Badan Usaha Rumah Sakit',
    pic: 'Direktur BURS',
    deadline: 'Mei 2026',
    status: 'In Progress (75%)',
  },
  {
    id: 'act-2',
    category: 'SECURITY',
    priority: 'HIGH PRIORITY',
    title: 'PATROLI PRESISI PERIMETER DTA WADUK',
    description: 'Peningkatan monitoring area perimeter timur kawasan aset dan kawasan hutan lindung tangkapan air.',
    unitTarget: 'Dit. Pengamanan Aset dan Kawasan',
    pic: 'Direktur Pam Aset',
    deadline: 'April 2026',
    status: 'Active (Daily Patrol)',
  },
  {
    id: 'act-3',
    category: 'SPAM & FASLING',
    priority: 'HIGH PRIORITY',
    title: 'REDUSI NRW & PEMELIHARAAN DMZ',
    description: 'Rehabilitasi pipa transmisi tua pada 4 DMZ kritis dan sertifikasi pengolahan limbah B3 KPLI.',
    unitTarget: 'BU SPAM, Fasilitas dan Lingkungan',
    pic: 'Direktur SPAM & Fasling',
    deadline: 'Juni 2026',
    status: 'Procurement Stage',
  },
];

// ============================================================================
// 5. TREN FINANSIAL (BELANJA VS PENDAPATAN PNBP PER UNIT) & KONSOLIDASI FISKAL
// ============================================================================
export const MONTHLY_FINANCIAL_PERFORMANCE = [
  { bulan: 'Januari', belanjaRs: 8.8, pnbpRs: 9.8, belanjaPam: 3.4, pnbpPam: 0.3, belanjaSpam: 10.1, pnbpSpam: 11.5, totalBelanja: 22.3, totalPnbp: 21.6 },
  { bulan: 'Februari', belanjaRs: 9.0, pnbpRs: 10.1, belanjaPam: 3.5, pnbpPam: 0.32, belanjaSpam: 10.3, pnbpSpam: 11.8, totalBelanja: 22.8, totalPnbp: 22.22 },
  { bulan: 'Maret', belanjaRs: 9.1, pnbpRs: 10.2, belanjaPam: 3.45, pnbpPam: 0.31, belanjaSpam: 10.4, pnbpSpam: 12.0, totalBelanja: 22.95, totalPnbp: 22.51 },
  { bulan: 'April', belanjaRs: 9.2, pnbpRs: 10.4, belanjaPam: 3.5, pnbpPam: 0.33, belanjaSpam: 10.5, pnbpSpam: 12.2, totalBelanja: 23.2, totalPnbp: 22.93 },
  { bulan: 'Mei', belanjaRs: 9.0, pnbpRs: 10.0, belanjaPam: 3.4, pnbpPam: 0.3, belanjaSpam: 10.2, pnbpSpam: 11.7, totalBelanja: 22.6, totalPnbp: 22.0 },
  { bulan: 'Juni', belanjaRs: 9.1, pnbpRs: 10.3, belanjaPam: 3.5, pnbpPam: 0.32, belanjaSpam: 10.4, pnbpSpam: 12.1, totalBelanja: 23.0, totalPnbp: 22.72 },
  { bulan: 'Juli', belanjaRs: 9.0, pnbpRs: 10.1, belanjaPam: 3.45, pnbpPam: 0.31, belanjaSpam: 10.3, pnbpSpam: 11.9, totalBelanja: 22.75, totalPnbp: 22.31 },
  { bulan: 'Agustus', belanjaRs: 9.2, pnbpRs: 10.2, belanjaPam: 3.5, pnbpPam: 0.32, belanjaSpam: 10.5, pnbpSpam: 12.0, totalBelanja: 23.2, totalPnbp: 22.52 },
  { bulan: 'September', belanjaRs: 8.9, pnbpRs: 10.0, belanjaPam: 3.4, pnbpPam: 0.31, belanjaSpam: 10.2, pnbpSpam: 11.8, totalBelanja: 22.5, totalPnbp: 22.11 },
  { bulan: 'Oktober', belanjaRs: 9.1, pnbpRs: 10.3, belanjaPam: 3.5, pnbpPam: 0.32, belanjaSpam: 10.4, pnbpSpam: 12.1, totalBelanja: 23.0, totalPnbp: 22.72 },
  { bulan: 'November', belanjaRs: 8.9, pnbpRs: 10.1, belanjaPam: 3.45, pnbpPam: 0.31, belanjaSpam: 10.3, pnbpSpam: 11.8, totalBelanja: 22.65, totalPnbp: 22.21 },
  { bulan: 'Desember', belanjaRs: 9.1, pnbpRs: 10.3, belanjaPam: 3.55, pnbpPam: 0.35, belanjaSpam: 10.6, pnbpSpam: 12.6, totalBelanja: 23.25, totalPnbp: 23.25 },
];

// Data Gabungan Visualisasi IKM Khusus 2 Badan Usaha (RSBP dan BU SPAM Fasling)
// Sesuai Surat Perjanjian Kinerja No: 6 /KA/ 3 /2025 & PermenPAN-RB No. 14/2017
export const IKM_BU_GABUNGAN_DATA = [
  { unsur: 'U1. Persyaratan Pelayanan', rs: 90.2, spam: 88.5, gabungan: 89.35, targetPerkin: 88.31 },
  { unsur: 'U2. Kemudahan Prosedur', rs: 88.6, spam: 87.8, gabungan: 88.20, targetPerkin: 88.31 },
  { unsur: 'U3. Kecepatan Waktu Pelayanan', rs: 85.8, spam: 86.4, gabungan: 86.10, targetPerkin: 88.31 },
  { unsur: 'U4. Kesesuaian Biaya / Tarif', rs: 91.2, spam: 89.6, gabungan: 90.40, targetPerkin: 88.31 },
  { unsur: 'U5. Spesifikasi Produk Layanan', rs: 89.4, spam: 88.8, gabungan: 89.10, targetPerkin: 88.31 },
  { unsur: 'U6. Kompetensi Petugas', rs: 92.5, spam: 88.2, gabungan: 90.35, targetPerkin: 88.31 },
  { unsur: 'U7. Perilaku & Kesopanan', rs: 91.8, spam: 89.1, gabungan: 90.45, targetPerkin: 88.31 },
  { unsur: 'U8. Kualitas Sarana & Prasarana', rs: 88.4, spam: 89.0, gabungan: 88.70, targetPerkin: 88.31 },
  { unsur: 'U9. Penanganan Keluhan & Saran', rs: 87.2, spam: 88.2, gabungan: 87.70, targetPerkin: 88.31 },
];

export const IKM_BU_RINGKASAN = {
  rataRataGabungan: 88.66,
  targetPerkin: 88.31,
  mutuGabungan: 'Mutu A (Sangat Baik)',
  statusCapaian: '100.4% Terlampaui',
  buRumahSakit: {
    skor: 88.92,
    mutu: 'Mutu A',
    predikat: 'Sangat Baik',
  },
  buSpamFasling: {
    skor: 88.40,
    mutu: 'Mutu A',
    predikat: 'Sangat Baik',
  },
};

export const PIE_PNBP_DATA = [
  { name: 'BU SPAM, Fasilitas & Lingkungan (Air, Limbah & Aset)', value: 142.5, persen: 53.2, color: '#06B6D4' },
  { name: 'BU Rumah Sakit (Pelayanan Medis & Spesialistik)', value: 121.8, persen: 45.4, color: '#F43F5E' },
  { name: 'Dit. Pengamanan Aset (Jasa Pemanfaatan/Pengamanan)', value: 3.8, persen: 1.4, color: '#F59E0B' },
];

// Data Radar / Komparasi Lama (dipertahankan untuk kompatibilitas jika dibutuhkan)
export const IKM_UNSUR_KOMPARASI = [
  { unsur: 'U1. Persyaratan', rs: 90.2, ditpam: 84.5, spam: 88.5, standar: 88.31 },
  { unsur: 'U2. Prosedur', rs: 88.6, ditpam: 83.2, spam: 87.8, standar: 88.31 },
  { unsur: 'U3. Waktu Pelayanan', rs: 85.8, ditpam: 80.1, spam: 86.4, standar: 88.31 },
  { unsur: 'U4. Biaya / Tarif', rs: 91.2, ditpam: 86.0, spam: 89.6, standar: 88.31 },
  { unsur: 'U5. Produk Spesifikasi', rs: 89.4, ditpam: 82.8, spam: 88.8, standar: 88.31 },
  { unsur: 'U6. Kompetensi Petugas', rs: 92.5, ditpam: 85.4, spam: 88.2, standar: 88.31 },
  { unsur: 'U7. Perilaku Pelaksana', rs: 91.8, ditpam: 83.0, spam: 89.1, standar: 88.31 },
  { unsur: 'U8. Maklumat Pelayanan', rs: 88.4, ditpam: 80.5, spam: 89.0, standar: 88.31 },
  { unsur: 'U9. Penanganan Keluhan', rs: 87.2, ditpam: 76.1, spam: 88.2, standar: 88.31 },
];

// ============================================================================
// 6. UNIT DEEP-DIVE CENTER PROFILES (LENGKAP 3 UNIT PELAYANAN UMUM)
// ============================================================================
export const DEEP_DIVE_PROFILES: Record<string, DeepDiveUnitProfile> = {
  'bu-rumah-sakit': {
    unitId: 'bu-rumah-sakit',
    code: 'BURS',
    name: 'Badan Usaha Rumah Sakit (RSBP Batam)',
    pejabatPimpinan: 'Direktur Badan Usaha Rumah Sakit BP Batam',
    peranStrategis:
      'Penyelenggara layanan kesehatan rujukan berstandar internasional di Sekupang, penunjang KEK Kesehatan & Pariwisata, dan pusat keunggulan kardiovaskular, onkologi, traumatologi & medical check up terpadu.',
    paguBelanja: 'Rp 135.0 Miliar',
    realisasiBelanja: 'Rp 48.5 Miliar',
    serapanBelanja: '35.9%',
    targetPnbp: 'Rp 85.0 Miliar',
    realisasiPnbp: 'Rp 44.8 Miliar',
    capaianPnbp: '52.7%',
    ikmSkor: 88.92,
    ikmMutu: 'A (Sangat Baik)',
    topMetrics: [
      { label: 'Bed Occupancy Rate (BOR)', value: '76.2%', desc: 'Standar Barber Johnson 70-85%', trend: '+3.4%' },
      { label: 'Kunjungan Pasien YTD', value: '82.620', desc: 'Rawat Jalan, Inap & IGD', trend: '+5.1%' },
      { label: 'Cost Recovery Ratio', value: '111.4%', desc: 'Pendapatan vs Belanja', trend: '+2.8%' },
      { label: 'Resep Obat Generik', value: '86.4%', desc: 'Standar Kemenkes >80%', trend: '+1.2%' },
    ],
    highlightOperasional: [
      'Cath Lab Jantung: Menangani 482 tindakan intervensi koroner perkutan (PCI) dengan tingkat keberhasilan 99.2%.',
      'Peningkatan Kapasitas Rawat Inap: 215 tempat tidur aktif dengan rasio perawat terhadap pasien 1:2 di ICU.',
      'Sewa Fasilitas Tenant (DS 14): 24 mitra komersial (ATM, mini market, kafetaria sehat, optik) menyumbang Rp 2.4M PNBP.',
      'Top Morbiditas (DS 4): Penyakit kardiovaskular, hipertensi esensial, dan diabetes mendominasi 42% kunjungan rawat jalan.',
    ],
    isuKritis: [
      'Waktu antrian farmasi saat jam sibuk (10.00 - 13.00) masih berada di kisaran 48 menit.',
      'Kebutuhan pembaruan alat medis MRI 3 Tesla untuk mendukung KEK Pariwisata Kesehatan Sekupang.',
    ],
    rencanaAksiStrategis: [
      'Integrasi resep elektronik (e-Prescription) langsung dari workstation dokter spesialis ke apotek farmasi.',
      'Pengembangan paviliun executive medical check up (MCU) untuk menyerap devisa pasien yang berobat ke Singapura/Malaysia.',
    ],
    datasetAtributSatuData: [
      { no: 1, namaData: 'Indeks Kepuasan Masyarakat (IKM) Layanan RSBP', periode: 'Pertahun', sifatData: 'Terbuka', kunciAtribut: ['Tahun', 'Indikator Mutu', 'Kategori Mutu', 'Pelayanan per Unsur'] },
      { no: 2, namaData: 'Realisasi Penerimaan PNBP Badan Usaha Rumah Sakit', periode: 'Pertahun', sifatData: 'Tertutup', kunciAtribut: ['Total Target PNBP', 'Total Realisasi PNBP'] },
      { no: 3, namaData: 'Rasio Penerimaan terhadap Pengeluaran (Cost Recovery)', periode: 'Pertahun', sifatData: 'Tertutup', kunciAtribut: ['Nilai Seluruh Belanja', 'Nilai Pendapatan', 'Total Rasio Pendapatan'] },
      { no: 4, namaData: 'Jumlah Kasus Penyakit Terbanyak (Top 10 ICD-10)', periode: 'Perbulan', sifatData: 'Terbuka', kunciAtribut: ['Jenis Rawat', 'Nama Penyakit', 'Kode ICD', 'Jumlah Kasus'] },
      { no: 5, namaData: 'Jumlah Kunjungan Pasien di RSBP Batam', periode: 'Perbulan', sifatData: 'Terbuka', kunciAtribut: ['Bagian Layanan', 'Jenis Kunjungan', 'Cara Bayar (BPJS/Umum/Asuransi)', 'Jumlah'] },
      { no: 9, namaData: 'Nilai Indikator Efisiensi Rumah Sakit (Barber Johnson)', periode: 'Perbulan', sifatData: 'Terbuka', kunciAtribut: ['BOR', 'ALOS', 'TOI', 'BTO', 'GDR', 'NDR'] },
      { no: 14, namaData: 'Daftar Penyewa Fasilitas & Tenant Rumah Sakit', periode: 'Pertahun', sifatData: 'Tertutup', kunciAtribut: ['Nama Tenant', 'Nomor Perjanjian', 'Masa Berlaku', 'Jatuh Tempo'] },
      { no: 17, namaData: 'Rekapitulasi Resep Dispens Obat Generik & Non Generik', periode: 'Perbulan', sifatData: 'Tertutup', kunciAtribut: ['Golongan Obat', 'Rawat Jalan', 'Rawat Inap', 'Gawat Darurat'] },
    ],
  },
  'dit-pam-aset': {
    unitId: 'dit-pam-aset',
    code: 'DPAMP',
    name: 'Direktorat Pengamanan Aset dan Kawasan (Ditpam)',
    pejabatPimpinan: 'Direktur Pengamanan Aset dan Kawasan BP Batam',
    peranStrategis:
      'Garda terdepan perlindungan aset BMN BP Batam, penertiban perambahan tanah/bangunan liar, pengamanan objek vital bandara, pelabuhan, kantor pemerintahan, serta penjagaan kelestarian hutan lindung dan DTA waduk air baku.',
    paguBelanja: 'Rp 65.0 Miliar',
    realisasiBelanja: 'Rp 20.2 Miliar',
    serapanBelanja: '31.1%',
    targetPnbp: 'Rp 15.0 Miliar',
    realisasiPnbp: 'Rp 3.8 Miliar',
    capaianPnbp: '25.3%',
    ikmSkor: 82.4,
    ikmMutu: 'B (Baik)',
    topMetrics: [
      { label: 'Penertiban Bangunan Liar', value: '874', desc: 'Dari 1.030 terdata (84.9%)', trend: '+12.4%' },
      { label: 'Average Response Time', value: '12.4 m', desc: 'Mitigasi aduan masyarakat', trend: '-1.8 m' },
      { label: 'Kekuatan Personel Aktif', value: '642', desc: '480 Personel Bersertifikasi', trend: 'Stabil' },
      { label: 'Luas Lahan Diamankan', value: '142.8 Ha', desc: 'Wilayah DTA & Hutan Lindung', trend: '+18.5 Ha' },
    ],
    highlightOperasional: [
      'Penertiban Bangunan Liar (DS 1): 874 bangunan semi permanen ditertibkan tanpa benturan fisik, 156 dalam proses SP.',
      'Distribusi Personil (DS 2 & 3): 642 personil tersebar pada Subdit Pengamanan Aset, Kawasan Hutan, dan Objek Vital.',
      'Mitigasi Rescue & Bencana Alam (DS 6): Menangani 18 insiden banjir lokal, longsor talud, dan pohon tumbang secepat <15 menit.',
      'Pengamanan Unjuk Rasa (DS 7): Mengawal 24 unjuk rasa aliansi serikat pekerja dan masyarakat dengan pendekatan persuasif kondusif.',
    ],
    isuKritis: [
      'Tingginya tekanan permukiman liar pada kawasan Daerah Tangkapan Air (DTA) waduk Duriangkang dan Mukakuning.',
      'Kebutuhan peremajaan armada patroli taktis lapangan dan alat pemadam kebakaran hutan ringan.',
    ],
    rencanaAksiStrategis: [
      'Pemasangan patok batas digital bersensor koordinat GIS pada titik rawan perambahan hutan lindung.',
      'Peningkatan patroli gabungan 24 jam bersama TNI/Polri dan Satpol PP pada jalur perimeter tangkapan air.',
    ],
    datasetAtributSatuData: [
      { no: 1, namaData: 'Data Penertiban Bangunan Liar (1.030 Entri Terdata)', periode: 'Persemester', sifatData: 'Tertutup', kunciAtribut: ['Nama Pemilik', 'Jenis Bangunan', 'Lokasi', 'Lama Menempati', 'Luas M2'] },
      { no: 2, namaData: 'Data Personil Bersertifikasi Khusus Ditpam', periode: 'Persemester', sifatData: 'Terbuka', kunciAtribut: ['Status Kepegawaian', 'Jenis Sertifikasi Khusus', 'Jumlah', 'Subdit/Seksi'] },
      { no: 3, namaData: 'Rekap Distribusi Personil Pengamanan Obvit & Kawasan', periode: 'Persemester', sifatData: 'Terbuka', kunciAtribut: ['Penempatan Pos', 'Kekuatan Personil', 'Status Pegawai'] },
      { no: 4, namaData: 'Rekap Pengecekan Proteksi Pemadam Kebakaran Gedung', periode: 'Persemester', sifatData: 'Tertutup', kunciAtribut: ['Lokasi', 'Jenis Bangunan', 'Jenis Alat APAR/Hydrant', 'Rekomendasi'] },
      { no: 6, namaData: 'Rekapitulasi Kejadian Bencana Alam & Tanggap Darurat', periode: 'Persemester', sifatData: 'Terbuka', kunciAtribut: ['Tanggal', 'Jenis Bencana', 'Uraian', 'Lokasi', 'Personil Dikerahkan'] },
      { no: 7, namaData: 'Rekap Pengamanan Unjuk Rasa & Kamtibmas', periode: 'Persemester', sifatData: 'Terbuka', kunciAtribut: ['Lokasi', 'Aliansi Masyarakat', 'Tuntutan Masalah', 'Keterangan Situasi'] },
      { no: 10, namaData: 'Data Penindakan Kawasan Aset dan Objek Vital', periode: 'Persemester', sifatData: 'Tertutup', kunciAtribut: ['Nama Pelanggar', 'Jenis Kegiatan Ilegal', 'Luas Terdampak', 'Sanksi'] },
      { no: 12, namaData: 'Kegiatan Pengamanan Lingkungan, Hutan, Aset & Obvit', periode: 'Persemester', sifatData: 'Tertutup', kunciAtribut: ['Subdit', 'Jenis Kegiatan Patroli', 'Lokasi', 'Hasil'] },
    ],
  },
  'bu-spam-fasling': {
    unitId: 'bu-spam-fasling',
    code: 'BUSPAM',
    name: 'Badan Usaha SPAM, Fasilitas dan Lingkungan',
    pejabatPimpinan: 'Direktur Badan Usaha SPAM, Fasilitas dan Lingkungan BP Batam',
    peranStrategis:
      'Penyelenggara pengelolaan air bersih curah & hilir dari 6 waduk utama Kota Batam, pengolahan limbah industri bahan berbahaya dan beracun (KPLI Kabil), pengelolaan limbah domestik perkotaan, hunian rusunawa pekerja, serta aset komersial Gedung BIDA & sarana olahraga.',
    paguBelanja: 'Rp 220.0 Miliar',
    realisasiBelanja: 'Rp 69.3 Miliar',
    serapanBelanja: '31.5%',
    targetPnbp: 'Rp 110.0 Miliar',
    realisasiPnbp: 'Rp 52.4 Miliar',
    capaianPnbp: '47.6%',
    ikmSkor: 82.8,
    ikmMutu: 'B (Baik)',
    topMetrics: [
      { label: 'Kapasitas Produksi WTP', value: '3.420 L/s', desc: 'Duriangkang, Mukakuning, dll', trend: '+150 L/s' },
      { label: 'Non-Revenue Water (NRW)', value: '26.8%', desc: 'Target penurunan ke <25%', trend: '-1.4%' },
      { label: 'Limbah B3 Terolah KPLI', value: '14.850 Ton', desc: 'Padat, Cair & Sludge', trend: '+8.2%' },
      { label: 'Okupansi Rusunawa', value: '91.5%', desc: '32 Twin Block Hunian', trend: '+3.1%' },
    ],
    highlightOperasional: [
      'Kapasitas Waduk (DS 37): Total daya tampung 101.4 Juta M3 air baku dengan ketersediaan cadangan aman 12 bulan.',
      'Sistem Distribusi DMZ (DS 41 & 72): 23 District Meter Zone melayani 312.450 pelanggan dengan rata-rata tekanan 1.42 bar.',
      'Kawasan Pengelolaan Limbah Industri B3 Kabil (DS 11-13, 52-56): Mengolah 14.850 ton limbah industri kimia & perkapalan.',
      'Pemanfaatan Fasilitas & Rusun (DS 23-26, 32): Hunian rusunawa pekerja, Guest House Kuningan, Asrama Haji, dan Sport Hall menyumbang Rp 18.2M.',
    ],
    isuKritis: [
      'Pipa transmisi tua pada wilayah Batu Ampar dan Tanjung Riau kerap mengalami micro-leakage yang memicu kenaikan NRW.',
      'Kebutuhan pengerukan sedimentasi pada Waduk Sei Ladi dan Mukakuning untuk mempertahankan elevasi muka air normal.',
    ],
    rencanaAksiStrategis: [
      'Pemasangan 120 smart acoustic leak detector pada jaringan pipa primer distribusi.',
      'Pembangunan WTP baru Muka Kuning 350 liter/detik untuk mendukung ekspansi industri semikonduktor KEK.',
    ],
    datasetAtributSatuData: [
      { no: 1, namaData: 'Persentase Pemakaian Air Baku di Batam', periode: 'Persemester', sifatData: 'Tertutup', kunciAtribut: ['Nama WTP', 'Volume M3', 'Periode Rekap'] },
      { no: 2, namaData: 'Kapasitas Produksi Instalasi Pengolahan Air Bersih (WTP)', periode: 'Perbulan', sifatData: 'Terbuka', kunciAtribut: ['Nama WTP', 'Kapasitas L/s', 'Teknologi Filtrasi'] },
      { no: 6, namaData: 'Peta Wilayah Demilitarized Zone (DMZ 1 s.d 23)', periode: 'Jika Update', sifatData: 'Terbatas', kunciAtribut: ['Nomor DMZ', 'Nama Lokasi', 'Titik Koordinat GIS'] },
      { no: 11, namaData: 'Pass Masuk Kawasan Pengelolaan Limbah Industri (KPLI) B3', periode: 'Perbulan', sifatData: 'Tertutup', kunciAtribut: ['Nama Perusahaan', 'Plat Kendaraan', 'Manifest Limbah'] },
      { no: 15, namaData: 'Kunjungan Wisata (Taman Rusa Sekupang & Taman Kolam)', periode: 'Pertahun', sifatData: 'Terbuka', kunciAtribut: ['Jumlah Pengunjung', 'Jumlah Kendaraan', 'Nominal Tiket'] },
      { no: 25, namaData: 'Data Penyewaan Kamar Rusun BP Batam (32 Twin Block)', periode: 'Perbulan', sifatData: 'Terbuka', kunciAtribut: ['Nama Penyewa', 'Blok/Nomor Kamar', 'Nominal Sewa', 'Status'] },
      { no: 37, namaData: 'Kapasitas Tampung Waduk & Luas Permukaan', periode: 'Jika Update', sifatData: 'Terbuka', kunciAtribut: ['Nama Waduk', 'Daya Tampung Juta M3', 'Luas Permukaan Ha'] },
      { no: 70, namaData: 'Rekapitulasi Non-Revenue Water (Tingkat Kehilangan Air)', periode: 'Pertriwulan', sifatData: 'Terbuka', kunciAtribut: ['Persentase NRW per DMZ', 'Volume Produksi', 'Volume Tagih'] },
    ],
  },
};
