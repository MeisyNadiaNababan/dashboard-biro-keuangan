import {
  PengawasanItem,
  EvaluasiPembatalanItem,
  DokumenLahanPesisirItem,
  RekomendasiPembaruanItem,
  SwpPengendalianSummary,
} from './types';

// ============================================================================
// DATASET #1: PENGAWASAN DAN PENGENDALIAN LAHAN, PESISIR DAN REKLAMASI
// ============================================================================
export const KPI_PENGAWASAN_DATA = {
  datasetNo: 1,
  namaKpi: 'Persentase Keberhasilan Pengawasan dan Pengendalian Lahan, Pesisir dan Reklamasi',
  formula: '(Jumlah Lokasi/Objek yang Berhasil Diawasi & Dikendalikan / Total Target Pengawasan) x 100%',
  tahun: 2026,
  targetObjek: 450,
  realisasiObjek: 422,
  persentase: 93.8, // 422 / 450 * 100%
  breakdownKategori: [
    {
      kategori: 'Lahan Darat (Alokasi Komersial/Industri/Perumahan)',
      singkat: 'Lahan Darat',
      target: 240,
      realisasi: 228,
      persen: 95.0,
      luasHa: 890.4,
      patuh: 204,
      teguran: 18,
      pelanggaran: 6,
    },
    {
      kategori: 'Wilayah Pesisir (Sempadan Pantai, Konservasi Mangrove)',
      singkat: 'Wilayah Pesisir',
      target: 120,
      realisasi: 111,
      persen: 92.5,
      luasHa: 412.8,
      patuh: 96,
      teguran: 11,
      pelanggaran: 4,
    },
    {
      kategori: 'Area Reklamasi (Kawasan Maritim, Jetty, Terminal Khusus)',
      singkat: 'Area Reklamasi',
      target: 90,
      realisasi: 83,
      persen: 92.2,
      luasHa: 345.2,
      patuh: 71,
      teguran: 9,
      pelanggaran: 3,
    },
  ],
};

// ============================================================================
// DATASET #2: TINDAKAN EVALUASI DAN PEMBATALAN ALOKASI LAHAN, PESISIR DAN REKLAMASI
// ============================================================================
export const KPI_EVALUASI_PEMBATALAN_DATA = {
  datasetNo: 2,
  namaKpi: 'Persentase Keberhasilan Tindakan Evaluasi dan Pembatalan Alokasi Lahan, Pesisir dan Reklamasi',
  formula: '(Jumlah Tindakan Evaluasi & Pembatalan Terlaksana / Total Usulan Kasus Lahan Bermasalah) x 100%',
  tahun: 2026,
  targetKasus: 185,
  realisasiKasus: 162,
  persentase: 87.6, // 162 / 185 * 100%
  totalLuasTereksposeHa: 642.7,
  luasLahanDiselamatkanHa: 94.6, // Lahan resmi dicabut & kembali ke BP Batam untuk re-alokasi
  luasLahanReKomitmenHa: 221.8, // Investor berkomitmen melanjutkan bangun
  pipelineEskalasi: [
    {
      tahap: 'Surat Peringatan I (SP-1)',
      kode: 'SP-1',
      jumlahKasus: 74,
      luasHa: 312.4,
      deskripsi: 'Peringatan pertama atas keterlambatan pembangunan fisik < 20% dalam 2 tahun pertama',
      color: '#3B82F6', // Blue
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      tahap: 'Surat Peringatan II (SP-2)',
      kode: 'SP-2',
      jumlahKasus: 46,
      luasHa: 188.7,
      deskripsi: 'Peringatan kedua jika belum ada klarifikasi/progress 30 hari pasca SP-1',
      color: '#F59E0B', // Amber
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      tahap: 'Surat Peringatan III (SP-3)',
      kode: 'SP-3',
      jumlahKasus: 28,
      luasHa: 115.2,
      deskripsi: 'Peringatan terakhir batas akhir pembelaan hak sebelum usulan Kepka Pembatalan',
      color: '#EF4444', // Red
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      tahap: 'Kepka Pembatalan Resmi',
      kode: 'BATAL',
      jumlahKasus: 32,
      luasHa: 94.6,
      deskripsi: 'Alokasi dicabut resmi & dikembalikan menjadi aset cadangan lahan BP Batam siap investasi',
      color: '#8B5CF6', // Purple
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      tahap: 'Pemulihan Komitmen Investasi',
      kode: 'RE-KOMIT',
      jumlahKasus: 58,
      luasHa: 221.8,
      deskripsi: 'Penyewa/investor menandatangani pakta integritas, melunasi kewajiban & melanjutkan konstruksi',
      color: '#10B981', // Emerald
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ],
};

// ============================================================================
// DATASET #3: PELAKSANAAN KEGIATAN DOKUMEN LAHAN, PESISIR DAN REKLAMASI
// ============================================================================
export const KPI_PELAKSANAAN_DOKUMEN_DATA = {
  datasetNo: 3,
  namaKpi: 'Persentase Pelaksanaan Kegiatan Dokumen Lahan, Pesisir dan Reklamasi',
  formula: '(Jumlah Dokumen yang Disahkan & Diterbitkan / Target Dokumen yang Direncanakan) x 100%',
  tahun: 2026,
  targetDokumen: 360,
  realisasiDokumen: 342,
  persentase: 95.0, // 342 / 360 * 100%
  rataRataSlaHari: 2.4,
  targetSlaHari: 4.0,
  breakdownDokumen: [
    {
      jenis: 'Berita Acara Pemeriksaan Lapangan (BAPL)',
      target: 180,
      realisasi: 174,
      persen: 96.7,
      slaHari: 2.1,
    },
    {
      jenis: 'Dokumen Teknis & Verifikasi Reklamasi',
      target: 70,
      realisasi: 65,
      persen: 92.9,
      slaHari: 2.9,
    },
    {
      jenis: 'Kajian Pengendalian Sempadan Pesisir',
      target: 60,
      realisasi: 57,
      persen: 95.0,
      slaHari: 2.6,
    },
    {
      jenis: 'Surat Rekomendasi Pengendalian Lahan',
      target: 50,
      realisasi: 46,
      persen: 92.0,
      slaHari: 2.2,
    },
  ],
};

// ============================================================================
// DATASET #4: PEMBERIAN REKOMENDASI PERPANJANGAN PEMBARUAN ALOKASI & IZIN PERALIHAN HAK
// ============================================================================
export const KPI_REKOMENDASI_PEMBARUAN_DATA = {
  datasetNo: 4,
  namaKpi: 'Persentase Pemberian Rekomendasi Perpanjangan Pembaruan Alokasi Lahan dan Izin Peralihan Hak',
  formula: '(Jumlah Rekomendasi Selesai Diproses / Total Permohonan Masuk) x 100%',
  tahun: 2026,
  totalPermohonanMasuk: 520,
  totalRekomendasiSelesai: 494,
  persentase: 95.0, // 494 / 520 * 100%
  rataRataSlaHari: 3.1,
  targetSlaHari: 5.0,
  breakdownLayanan: [
    {
      jenis: 'Rekomendasi Perpanjangan Pembaruan Alokasi Lahan (UWT)',
      permohonanMasuk: 310,
      selesai: 296,
      persen: 95.5,
      disetujui: 272,
      bersyarat: 14,
      ditolakMangkrak: 10,
      slaHari: 3.0,
    },
    {
      jenis: 'Rekomendasi Izin Peralihan Hak (Peralihan Hak Tanah)',
      permohonanMasuk: 210,
      selesai: 198,
      persen: 94.3,
      disetujui: 185,
      bersyarat: 8,
      ditolakMangkrak: 5,
      slaHari: 3.2,
    },
  ],
};

// ============================================================================
// DATA EKSEKUTIF PIMPINAN: SPASIAL & PENGAWASAN PER SUB WILAYAH PENGEMBANGAN (SWP)
// ============================================================================
export const SWP_PENGAWASAN_DATA: SwpPengendalianSummary[] = [
  {
    swp: 'Batam Kota',
    namaWilayah: 'SWP I Batam Kota (Pusat Bisnis & Pemerintahan)',
    totalObjek: 132,
    patuh: 121,
    teguran: 8,
    pelanggaran: 3,
    persentaseKepatuhan: 91.7,
    luasPengawasanHa: 412.5,
  },
  {
    swp: 'Nongsa & Kabil',
    namaWilayah: 'SWP II Nongsa - Kabil (KEK Pariwisata & Kawasan Industri)',
    totalObjek: 108,
    patuh: 99,
    teguran: 7,
    pelanggaran: 2,
    persentaseKepatuhan: 91.7,
    luasPengawasanHa: 530.2,
  },
  {
    swp: 'Batu Aji & Sagulung',
    namaWilayah: 'SWP III Batu Aji & Sagulung (Pemukiman & Industri Maritim)',
    totalObjek: 88,
    patuh: 81,
    teguran: 5,
    pelanggaran: 2,
    persentaseKepatuhan: 92.0,
    luasPengawasanHa: 295.4,
  },
  {
    swp: 'Sekupang & Tg. Uncang',
    namaWilayah: 'SWP IV Sekupang & Tg. Uncang (Shipyard & Terminal Khusus)',
    totalObjek: 78,
    patuh: 68,
    teguran: 7,
    pelanggaran: 3,
    persentaseKepatuhan: 87.2,
    luasPengawasanHa: 388.0,
  },
  {
    swp: 'Rempang & Galang',
    namaWilayah: 'SWP V Rempang & Galang (Eco-City & Wilayah Pesisir Terbuka)',
    totalObjek: 44,
    patuh: 41,
    teguran: 2,
    pelanggaran: 1,
    persentaseKepatuhan: 93.2,
    luasPengawasanHa: 622.3,
  },
];

// ============================================================================
// DAFTAR KASUS PENERTIBAN LAHAN AKTIF (EVALUASI & PENGAWASAN LAPANGAN)
// ============================================================================
export const KASUS_PENERTIBAN_DATA: EvaluasiPembatalanItem[] = [
  {
    id: 'k-01',
    noKasus: 'KAS-PL-2026-081',
    pemegangAlokasi: 'PT Batam Sentra Megah',
    peruntukan: 'Pergudangan & Logistic Center',
    luasM2: 45000,
    luasHa: 4.5,
    swp: 'Nongsa & Kabil',
    tahapPeringatan: 'Pembatalan SK',
    tanggalTerbit: '12 Jan 2026',
    alasanEvaluasi: 'Lahan dibiarkan tidur > 4 tahun tanpa pembangunan fisik',
    statusPenyelesaian: 'Selesai',
    potensiLahanKembaliHa: 4.5,
  },
  {
    id: 'k-02',
    noKasus: 'KAS-PL-2026-082',
    pemegangAlokasi: 'PT Indo Sukses Pasifik',
    peruntukan: 'Industri Manufaktur Ringan',
    luasM2: 28000,
    luasHa: 2.8,
    swp: 'Batam Kota',
    tahapPeringatan: 'SP-3',
    tanggalTerbit: '05 Feb 2026',
    alasanEvaluasi: 'Hanya dibangun pagar keliling, fatwa plan kadaluarsa',
    statusPenyelesaian: 'Dalam Proses',
    potensiLahanKembaliHa: 2.8,
  },
  {
    id: 'k-03',
    noKasus: 'KAS-PL-2026-083',
    pemegangAlokasi: 'PT Galang Maritime Marine',
    peruntukan: 'Shipyard & Jetty Reklamasi',
    luasM2: 82000,
    luasHa: 8.2,
    swp: 'Sekupang & Tg. Uncang',
    tahapPeringatan: 'SP-2',
    tanggalTerbit: '18 Feb 2026',
    alasanEvaluasi: 'Pelaksanaan reklamasi melampaui koordinat batas persetujuan teknis',
    statusPenyelesaian: 'Dalam Proses',
    potensiLahanKembaliHa: 8.2,
  },
  {
    id: 'k-04',
    noKasus: 'KAS-PL-2026-084',
    pemegangAlokasi: 'PT Batam Grand Residence',
    peruntukan: 'Komersial & Ruko',
    luasM2: 32000,
    luasHa: 3.2,
    swp: 'Batu Aji & Sagulung',
    tahapPeringatan: 'Pemulihan Komitmen',
    tanggalTerbit: '02 Mar 2026',
    alasanEvaluasi: 'Penyewa melunasi denda keterlambatan & memulai pemancangan tiang',
    statusPenyelesaian: 'Selesai',
    potensiLahanKembaliHa: 0,
  },
  {
    id: 'k-05',
    noKasus: 'KAS-PL-2026-085',
    pemegangAlokasi: 'PT Rempang Hijau Abadi',
    peruntukan: 'Ekowisata & Agro Resort',
    luasM2: 120000,
    luasHa: 12.0,
    swp: 'Rempang & Galang',
    tahapPeringatan: 'Pembatalan SK',
    tanggalTerbit: '15 Mar 2026',
    alasanEvaluasi: 'Wanprestasi pembayaran UWT 30 tahun & penelantaran lahan',
    statusPenyelesaian: 'Selesai',
    potensiLahanKembaliHa: 12.0,
  },
  {
    id: 'k-06',
    noKasus: 'KAS-PL-2026-086',
    pemegangAlokasi: 'PT Kabil Perkasa Terminal',
    peruntukan: 'Penyimpanan Tangki Timbun',
    luasM2: 55000,
    luasHa: 5.5,
    swp: 'Nongsa & Kabil',
    tahapPeringatan: 'SP-1',
    tanggalTerbit: '28 Mar 2026',
    alasanEvaluasi: 'Pematangan lahan belum dimulai sesuai batas waktu 6 bulan',
    statusPenyelesaian: 'Dalam Proses',
    potensiLahanKembaliHa: 5.5,
  },
];

// ============================================================================
// DAFTAR REKOMENDASI TERBARU (DATASET #4)
// ============================================================================
export const DAFTAR_REKOMENDASI_TERBARU: RekomendasiPembaruanItem[] = [
  {
    id: 'rek-01',
    noPermohonan: 'REK-DP2LPR-2026-001',
    jenis: 'Perpanjangan Pembaruan Alokasi',
    pemohon: 'PT Schneider Electric Manufacturing',
    peruntukan: 'Industri Elektronik',
    luasM2: 34500,
    swp: 'Batam Kota',
    tanggalMasuk: '10 Apr 2026',
    tanggalSelesai: '13 Apr 2026',
    status: 'Disetujui',
    slaHari: 3,
    alasanKeputusan: 'Lahan terbangun 100% dan operasional produktif',
  },
  {
    id: 'rek-02',
    noPermohonan: 'REK-DP2LPR-2026-002',
    jenis: 'Izin Peralihan Hak',
    pemohon: 'PT Tunas Industri Batam ➔ PT Data Center Asia',
    peruntukan: 'Pusat Komputasi Data Center',
    luasM2: 50000,
    swp: 'Nongsa & Kabil',
    tanggalMasuk: '12 Apr 2026',
    tanggalSelesai: '15 Apr 2026',
    status: 'Disetujui',
    slaHari: 3,
    alasanKeputusan: 'Syarat terbangun terpenuhi dan peruntukan KEK sesuai',
  },
  {
    id: 'rek-03',
    noPermohonan: 'REK-DP2LPR-2026-003',
    jenis: 'Perpanjangan Pembaruan Alokasi',
    pemohon: 'PT Graha Pratama Sukses',
    peruntukan: 'Pusat Perbelanjaan',
    luasM2: 18000,
    swp: 'Batu Aji & Sagulung',
    tanggalMasuk: '14 Apr 2026',
    tanggalSelesai: '18 Apr 2026',
    status: 'Ditolak (Mangkrak)',
    slaHari: 4,
    alasanKeputusan: 'Ditolak: Lahan terlantar > 3 tahun dan sedang dalam proses SP-2',
  },
  {
    id: 'rek-04',
    noPermohonan: 'REK-DP2LPR-2026-004',
    jenis: 'Izin Peralihan Hak',
    pemohon: 'PT Maritim Galangan Perkasa',
    peruntukan: 'Bengkel Docking Kapal',
    luasM2: 24000,
    swp: 'Sekupang & Tg. Uncang',
    tanggalMasuk: '15 Apr 2026',
    tanggalSelesai: '17 Apr 2026',
    status: 'Disetujui Bersyarat',
    slaHari: 2,
    alasanKeputusan: 'Disetujui bersyarat: Wajib menyelesaikan perapihan sempadan pesisir',
  },
];
