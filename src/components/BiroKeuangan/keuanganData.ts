// Data source grounded in:
// 1. LRA-BLU-per-30-Juni-2026.pdf (Official LRA BLU BP Batam Semester I 2026)
// 2. Buku Satu Data BP Batam - Biro Keuangan (Hal. 2-5)

// ==========================================
// 1. DATASET NO. 3 (Hal. 3): LAPORAN REALISASI ANGGARAN BLU (LRA-BLU-per-30-Juni-2026.pdf)
// ==========================================
export interface LraItem {
  id: string;
  kode: string;
  uraian: string;
  kategori: 'PENDAPATAN' | 'BELANJA';
  anggaran2026: number;
  realisasi2026: number;
  selisih2026: number;
  persentase2026: number;
  anggaran2025: number;
  realisasi2025: number;
  selisih2025: number;
  persentase2025: number;
  subItems?: {
    nama: string;
    anggaran2026: number;
    realisasi2026: number;
    persentase2026: number;
  }[];
}

export const LRA_BLU_OFFICIAL_DATA: LraItem[] = [
  {
    id: 'pnbp-blu',
    kode: 'A.II.3',
    uraian: 'Pendapatan BLU (Jasa Layanan, Pengelolaan Aset & Jasa Lembaga)',
    kategori: 'PENDAPATAN',
    anggaran2026: 2447948530000,
    realisasi2026: 826017200034,
    selisih2026: -1621931329966,
    persentase2026: 34,
    anggaran2025: 1978098000000,
    realisasi2025: 751629571845,
    selisih2025: -1226468428155,
    persentase2025: 38,
    subItems: [
      { nama: 'Jasa Kepelabuhanan', anggaran2026: 780500000000, realisasi2026: 295420000000, persentase2026: 37.8 },
      { nama: 'Jasa Pengelolaan Lahan', anggaran2026: 620000000000, realisasi2026: 218750000000, persentase2026: 35.3 },
      { nama: 'Jasa Kebandarudaraan (Hang Nadim)', anggaran2026: 410200000000, realisasi2026: 139460000000, persentase2026: 34.0 },
      { nama: 'Jasa Layanan RSBP Batam', anggaran2026: 345000000000, realisasi2026: 108340000000, persentase2026: 31.4 },
      { nama: 'Jasa SPAM & Fasilitas Lingkungan', anggaran2026: 185000000000, realisasi2026: 42800000000, persentase2026: 23.1 },
      { nama: 'Jasa Jasa Giro & Deposito Kas BLU', anggaran2026: 107248530000, realisasi2026: 21247200034, persentase2026: 19.8 },
    ],
  },
  {
    id: 'belanja-barang',
    kode: 'B.I.2',
    uraian: 'Belanja Barang (Operasional, Pemeliharaan & Jasa)',
    kategori: 'BELANJA',
    anggaran2026: 1673924064000,
    realisasi2026: 389535835159,
    selisih2026: -1284388228841,
    persentase2026: 23,
    anggaran2025: 1412273964000,
    realisasi2025: 356713746777,
    selisih2025: -1055560217223,
    persentase2025: 25,
    subItems: [
      { nama: 'Belanja Barang Operasional Kantor', anggaran2026: 620400000000, realisasi2026: 172310000000, persentase2026: 27.8 },
      { nama: 'Belanja Pemeliharaan Sarana & Prasarana', anggaran2026: 512300000000, realisasi2026: 118420000000, persentase2026: 23.1 },
      { nama: 'Belanja Jasa Konsultan & Pihak Ketiga', anggaran2026: 384500000000, realisasi2026: 76900000000, persentase2026: 20.0 },
      { nama: 'Belanja Perjalanan Dinas & Umum', anggaran2026: 156724064000, realisasi2026: 21905835159, persentase2026: 14.0 },
    ],
  },
  {
    id: 'belanja-modal',
    kode: 'B.I.3',
    uraian: 'Belanja Modal (Tanah, Gedung, Peralatan Mesin & Jalan/Jaringan)',
    kategori: 'BELANJA',
    anggaran2026: 1364249812000,
    realisasi2026: 66945264621,
    selisih2026: -1297304547379,
    persentase2026: 5,
    anggaran2025: 659123101000,
    realisasi2025: 44816510190,
    selisih2025: -614306590810,
    persentase2025: 7,
    subItems: [
      { nama: 'Modal Jalan, Irigasi & Jaringan ROW', anggaran2026: 650000000000, realisasi2026: 32500000000, persentase2026: 5.0 },
      { nama: 'Modal Gedung & Bangunan', anggaran2026: 410000000000, realisasi2026: 21400000000, persentase2026: 5.2 },
      { nama: 'Modal Peralatan & Mesin TI / Medis', anggaran2026: 210249812000, realisasi2026: 9800000000, persentase2026: 4.7 },
      { nama: 'Modal Aset Tetap Lainnya', anggaran2026: 94000000000, realisasi2026: 3245264621, persentase2026: 3.5 },
    ],
  },
];

// Summary LRA
export const LRA_SUMMARY = {
  pendapatan: {
    anggaran2026: 2447948530000,
    realisasi2026: 826017200034,
    persentase2026: 34,
    anggaran2025: 1978098000000,
    realisasi2025: 751690418222,
    persentase2025: 38,
  },
  belanja: {
    anggaran2026: 3038173876000,
    realisasi2026: 456481099780,
    persentase2026: 15,
    anggaran2025: 2071397065000,
    realisasi2025: 401530256967,
    persentase2025: 19,
  },
  surplusDefisitLra: {
    realisasi2026: 369536100254, // Rp 826.017.200.034 - Rp 456.481.099.780
    realisasi2025: 350160161255, // Rp 751.690.418.222 - Rp 401.530.256.967
    pertumbuhanPersen: 5.5,
  },
  meta: {
    entitas: 'BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM',
    kodeSatker: '568717',
    kodeKL: '112',
    kodeEselon: '01',
    periode: 'Semester I (s.d. 30 Juni 2026)',
    tanggalData: '23/07/26 6:44 AM',
    penanggungJawab: 'HADJAD WIDAGDO (NIP 196909162005021001)',
  },
};

// ==========================================
// 2–5. 4 LAPORAN POKOK FINANSIAL BLU (LO, LPE, LAK, NERACA) & SHEET SWAP GABUNGAN
// Grounded in Satu Data:
// - Hal. 2-3 No. 2: LAPORAN OPERASIONAL (LO)
// - Hal. 3 No. 4: LAPORAN PERUBAHAN EKUITAS (LPE)
// - Hal. 3 No. 5: LAPORAN ARUS KAS (LAK)
// - Hal. 3 No. 6: LAPORAN NERACA
// ==========================================

export interface FinansialItem {
  uraian: string;
  periodeBaru: string;
  periodeSebelum: string;
  nilaiPeriodeBaru: number;
  nilaiPeriodeSebelum: number;
  nilaiKenaikanPenurunan: number;
  persentase: number; // % pertumbuhan
  kategori?: string;
  isTotal?: boolean;
}

// 2. LAPORAN OPERASIONAL (LO)
export const LO_BLU_DATA: FinansialItem[] = [
  {
    uraian: 'Pendapatan Jasa Layanan BLU',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 804769999990,
    nilaiPeriodeSebelum: 730382218222,
    nilaiKenaikanPenurunan: 74387781768,
    persentase: 10.2,
    kategori: 'PENDAPATAN OPERASIONAL',
  },
  {
    uraian: 'Pendapatan Bunga Kas BLU / Jasa Giro',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 21247200044,
    nilaiPeriodeSebelum: 21308200000,
    nilaiKenaikanPenurunan: -60999956,
    persentase: -0.3,
    kategori: 'PENDAPATAN OPERASIONAL',
  },
  {
    uraian: 'TOTAL PENDAPATAN OPERASIONAL (LO)',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 826017200034,
    nilaiPeriodeSebelum: 751690418222,
    nilaiKenaikanPenurunan: 74326781812,
    persentase: 9.9,
    kategori: 'PENDAPATAN OPERASIONAL',
    isTotal: true,
  },
  {
    uraian: 'Beban Barang & Jasa Operasional',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 249115835159,
    nilaiPeriodeSebelum: 228300000000,
    nilaiKenaikanPenurunan: 20815835159,
    persentase: 9.1,
    kategori: 'BEBAN OPERASIONAL',
  },
  {
    uraian: 'Beban Pemeliharaan & Fasilitas',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 140420000000,
    nilaiPeriodeSebelum: 128413746777,
    nilaiKenaikanPenurunan: 12006253223,
    persentase: 9.4,
    kategori: 'BEBAN OPERASIONAL',
  },
  {
    uraian: 'Beban Penyusutan Aset Tetap & Amortisasi',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 86540000000,
    nilaiPeriodeSebelum: 81200000000,
    nilaiKenaikanPenurunan: 5340000000,
    persentase: 6.6,
    kategori: 'BEBAN OPERASIONAL',
  },
  {
    uraian: 'Beban Penyisihan Piutang Tak Tertagih',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 12450000000,
    nilaiPeriodeSebelum: 14200000000,
    nilaiKenaikanPenurunan: -1750000000,
    persentase: -12.3,
    kategori: 'BEBAN OPERASIONAL',
  },
  {
    uraian: 'TOTAL BEBAN OPERASIONAL (LO)',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 488525835159,
    nilaiPeriodeSebelum: 452113746777,
    nilaiKenaikanPenurunan: 36412088382,
    persentase: 8.1,
    kategori: 'BEBAN OPERASIONAL',
    isTotal: true,
  },
  {
    uraian: 'SURPLUS / (DEFISIT) DARI OPERASI',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 337491364875,
    nilaiPeriodeSebelum: 299576671445,
    nilaiKenaikanPenurunan: 37914693430,
    persentase: 12.7,
    kategori: 'HASIL OPERASI',
    isTotal: true,
  },
  {
    uraian: 'Kegiatan Non Operasional Bersih',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 8645000000,
    nilaiPeriodeSebelum: 6420000000,
    nilaiKenaikanPenurunan: 2225000000,
    persentase: 34.7,
    kategori: 'NON OPERASIONAL',
  },
  {
    uraian: 'SURPLUS / (DEFISIT) AKHIR - LO',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 346136364875,
    nilaiPeriodeSebelum: 305996671445,
    nilaiKenaikanPenurunan: 40139693430,
    persentase: 13.1,
    kategori: 'HASIL OPERASI',
    isTotal: true,
  },
];

// 3. LAPORAN PERUBAHAN EKUITAS (LPE)
export const LPE_BLU_DATA: FinansialItem[] = [
  {
    uraian: 'Ekuitas Awal Periode',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 21458920450000,
    nilaiPeriodeSebelum: 19890450000000,
    nilaiKenaikanPenurunan: 1568470450000,
    persentase: 7.9,
    kategori: 'EKUITAS AWAL',
  },
  {
    uraian: 'Surplus / (Defisit) Laporan Operasional (LO)',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 346136364875,
    nilaiPeriodeSebelum: 305996671445,
    nilaiKenaikanPenurunan: 40139693430,
    persentase: 13.1,
    kategori: 'MUTASI LO',
  },
  {
    uraian: 'Dampak Kumulatif Perubahan Kebijakan / Koreksi Kesalahan',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 14250000000,
    nilaiPeriodeSebelum: -8420000000,
    nilaiKenaikanPenurunan: 22670000000,
    persentase: 269.2,
    kategori: 'PENYESUAIAN EKUITAS',
  },
  {
    uraian: 'Koreksi Nilai Persediaan & Revaluasi Aset BMN',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 28400000000,
    nilaiPeriodeSebelum: 15600000000,
    nilaiKenaikanPenurunan: 12800000000,
    persentase: 82.1,
    kategori: 'PENYESUAIAN EKUITAS',
  },
  {
    uraian: 'Transaksi Antar Entitas (Transfer Masuk Modal APBN)',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 66945264621,
    nilaiPeriodeSebelum: 44816510190,
    nilaiKenaikanPenurunan: 22128754431,
    persentase: 49.4,
    kategori: 'TRANSFER ENTITAS',
  },
  {
    uraian: 'EKUITAS AKHIR PERIODE',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 21914652079496,
    nilaiPeriodeSebelum: 20248443181635,
    nilaiKenaikanPenurunan: 1666208897861,
    persentase: 8.2,
    kategori: 'EKUITAS AKHIR',
    isTotal: true,
  },
];

// 4. LAPORAN ARUS KAS (LAK)
export const LAK_BLU_DATA: FinansialItem[] = [
  {
    uraian: 'Arus Kas Bersih dari Aktivitas Operasi',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 436481364875,
    nilaiPeriodeSebelum: 394976671445,
    nilaiKenaikanPenurunan: 41504693430,
    persentase: 10.5,
    kategori: 'AKTIVITAS OPERASI',
  },
  {
    uraian: 'Arus Kas Keluar untuk Perolehan Aset Tetap (Investasi)',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: -66945264621,
    nilaiPeriodeSebelum: -44816510190,
    nilaiKenaikanPenurunan: -22128754431,
    persentase: 49.4,
    kategori: 'AKTIVITAS INVESTASI',
  },
  {
    uraian: 'Arus Kas Bersih dari Aktivitas Pendanaan & Transitoris',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: -12450000000,
    nilaiPeriodeSebelum: -8200000000,
    nilaiKenaikanPenurunan: -4250000000,
    persentase: 51.8,
    kategori: 'AKTIVITAS PENDANAAN',
  },
  {
    uraian: 'KENAIKAN / (PENURUNAN) KAS BERSIH',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 357086100254,
    nilaiPeriodeSebelum: 341960161255,
    nilaiKenaikanPenurunan: 15125938999,
    persentase: 4.4,
    kategori: 'KENAIKAN KAS',
    isTotal: true,
  },
  {
    uraian: 'Saldo Awal Kas & Setara Kas (1 Januari)',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 1495820000000,
    nilaiPeriodeSebelum: 1284500000000,
    nilaiKenaikanPenurunan: 211320000000,
    persentase: 16.5,
    kategori: 'SALDO KAS AWAL',
  },
  {
    uraian: 'SALDO AKHIR KAS & SETARA KAS (30 JUNI)',
    periodeBaru: 'Semester I 2026',
    periodeSebelum: 'Semester I 2025',
    nilaiPeriodeBaru: 1852906100254,
    nilaiPeriodeSebelum: 1626460161255,
    nilaiKenaikanPenurunan: 226445938999,
    persentase: 13.9,
    kategori: 'SALDO KAS AKHIR',
    isTotal: true,
  },
];

// 5. LAPORAN NERACA BLU
export const NERACA_BLU_DATA: FinansialItem[] = [
  {
    uraian: 'Kas dan Setara Kas di Bank Operasional BLU',
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '31 Des 2025',
    nilaiPeriodeBaru: 1852906100254,
    nilaiPeriodeSebelum: 1495820000000,
    nilaiKenaikanPenurunan: 357086100254,
    persentase: 23.9,
    kategori: 'ASET LANCAR',
  },
  {
    uraian: 'Piutang Pelayanan & PNBP (Neto Penyisihan)',
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '31 Des 2025',
    nilaiPeriodeBaru: 412580000000,
    nilaiPeriodeSebelum: 398420000000,
    nilaiKenaikanPenurunan: 14160000000,
    persentase: 3.6,
    kategori: 'ASET LANCAR',
  },
  {
    uraian: 'Persediaan Barang Konsumsi, Obat & Suku Cadang',
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '31 Des 2025',
    nilaiPeriodeBaru: 88450000000,
    nilaiPeriodeSebelum: 82140000000,
    nilaiKenaikanPenurunan: 6310000000,
    persentase: 7.7,
    kategori: 'ASET LANCAR',
  },
  {
    uraian: 'JUMLAH ASET LANCAR',
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '31 Des 2025',
    nilaiPeriodeBaru: 2353936100254,
    nilaiPeriodeSebelum: 1976380000000,
    nilaiKenaikanPenurunan: 377556100254,
    persentase: 19.1,
    kategori: 'ASET LANCAR',
    isTotal: true,
  },
  {
    uraian: 'Aset Tetap (Tanah, Bangunan, Jaringan & Mesin)',
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '31 Des 2025',
    nilaiPeriodeBaru: 19842500000000,
    nilaiPeriodeSebelum: 19775554735379,
    nilaiKenaikanPenurunan: 66945264621,
    persentase: 0.3,
    kategori: 'ASET TETAP',
  },
  {
    uraian: 'Akumulasi Penyusutan Aset Tetap',
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '31 Des 2025',
    nilaiPeriodeBaru: -218540000000,
    nilaiPeriodeSebelum: -132000000000,
    nilaiKenaikanPenurunan: -86540000000,
    persentase: 65.6,
    kategori: 'ASET TETAP',
  },
  {
    uraian: 'Aset Lainnya (Kemitraan, Konstruksi Dlm Pengerjaan)',
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '31 Des 2025',
    nilaiPeriodeBaru: 215400000000,
    nilaiPeriodeSebelum: 204200000000,
    nilaiKenaikanPenurunan: 11200000000,
    persentase: 5.5,
    kategori: 'ASET LAINNYA',
  },
  {
    uraian: 'TOTAL JUMLAH ASET (NERACA)',
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '31 Des 2025',
    nilaiPeriodeBaru: 22197296100254,
    nilaiPeriodeSebelum: 21824134735379,
    nilaiKenaikanPenurunan: 373161364875,
    persentase: 1.7,
    kategori: 'TOTAL ASET',
    isTotal: true,
  },
  {
    uraian: 'Kewajiban Jangka Pendek (Utang Belanja & Titipan)',
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '31 Des 2025',
    nilaiPeriodeBaru: 182644020758,
    nilaiPeriodeSebelum: 265214285379,
    nilaiKenaikanPenurunan: -82570264621,
    persentase: -31.1,
    kategori: 'KEWAJIBAN',
  },
  {
    uraian: 'Kewajiban Jangka Panjang',
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '31 Des 2025',
    nilaiPeriodeBaru: 100000000000,
    nilaiPeriodeSebelum: 100000000000,
    nilaiKenaikanPenurunan: 0,
    persentase: 0.0,
    kategori: 'KEWAJIBAN',
  },
  {
    uraian: 'EKUITAS BERSIH BLU BP BATAM',
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '31 Des 2025',
    nilaiPeriodeBaru: 21914652079496,
    nilaiPeriodeSebelum: 21458920450000,
    nilaiKenaikanPenurunan: 455731629496,
    persentase: 2.1,
    kategori: 'EKUITAS',
    isTotal: true,
  },
];

// Ringkasan Gabungan 4 Laporan Finansial (Point 6)
export const KONSOLIDASI_4_LAPORAN_DATA = [
  {
    id: 'lo',
    laporan: 'Laporan Operasional (LO)',
    indikatorUtama: 'Surplus Akhir Operasional LO',
    periodeBaru: 'Semester I 2026',
    nilaiTahunBaru: 346136364875,
    nilaiTahunSebelum: 305996671445,
    kenaikan: 40139693430,
    persentase: 13.1,
    color: '#0284C7',
    iconName: 'Activity',
  },
  {
    id: 'lpe',
    laporan: 'Laporan Perubahan Ekuitas (LPE)',
    indikatorUtama: 'Ekuitas Akhir Satker BLU',
    periodeBaru: 'Semester I 2026',
    nilaiTahunBaru: 21914652079496,
    nilaiTahunSebelum: 20248443181635,
    kenaikan: 1666208897861,
    persentase: 8.2,
    color: '#10B981',
    iconName: 'TrendingUp',
  },
  {
    id: 'lak',
    laporan: 'Laporan Arus Kas (LAK)',
    indikatorUtama: 'Saldo Kas & Setara Kas Akhir',
    periodeBaru: 'Semester I 2026',
    nilaiTahunBaru: 1852906100254,
    nilaiTahunSebelum: 1626460161255,
    kenaikan: 226445938999,
    persentase: 13.9,
    color: '#F59E0B',
    iconName: 'Coins',
  },
  {
    id: 'neraca',
    laporan: 'Laporan Neraca BLU',
    indikatorUtama: 'Total Posisi Aset Satker BLU',
    periodeBaru: '30 Juni 2026',
    nilaiTahunBaru: 22197296100254,
    nilaiTahunSebelum: 21824134735379,
    kenaikan: 373161364875,
    persentase: 1.7,
    color: '#6366F1',
    iconName: 'Scale',
  },
];

// ==========================================
// 7. DATASET NO. 13 (Hal. 4): LAPORAN SALDO BANK REAL TIME
// Aturan #12: CUKUP NAMA BANK, NOMOR REKENING, NILAI SALDO
// ==========================================
export interface SaldoBankItem {
  id: string;
  namaBank: string;
  nomorRekening: string;
  nilaiSaldo: number;
  kegunaan: string;
  kategoriRekening: 'OPERASIONAL' | 'PENAMPUNG' | 'DEPOSITO / DPLK';
  terakhirUpdate: string;
}

export const SALDO_BANK_REALTIME_DATA: SaldoBankItem[] = [
  {
    id: 'bank-1',
    namaBank: 'Bank Mandiri (Persero) Tbk',
    nomorRekening: '109-00-1887265-4',
    nilaiSaldo: 624500120450,
    kegunaan: 'Rekening Operasional BLU BP Batam & Transaksi Layanan',
    kategoriRekening: 'OPERASIONAL',
    terakhirUpdate: 'Real-time (2 Menit yang lalu)',
  },
  {
    id: 'bank-2',
    namaBank: 'Bank Rakyat Indonesia (BRI) Tbk',
    nomorRekening: '0065-01-002488-30-7',
    nilaiSaldo: 418250000000,
    kegunaan: 'Rekening Penampung Penerimaan PNBP Pelabuhan & Lahan',
    kategoriRekening: 'PENAMPUNG',
    terakhirUpdate: 'Real-time (Live Sync)',
  },
  {
    id: 'bank-3',
    namaBank: 'Bank Negara Indonesia (BNI) 1946 Tbk',
    nomorRekening: '028-119-4820-001',
    nilaiSaldo: 352140800000,
    kegunaan: 'Rekening Penerimaan Layanan Bandara & Rumah Sakit BP',
    kategoriRekening: 'PENAMPUNG',
    terakhirUpdate: 'Real-time (Live Sync)',
  },
  {
    id: 'bank-4',
    namaBank: 'Bank Riau Kepri (BRK) Syariah',
    nomorRekening: '101-08-00543-9',
    nilaiSaldo: 215400000000,
    kegunaan: 'Rekening Penempatan Dana Likuiditas Kas Daerah/BLU',
    kategoriRekening: 'OPERASIONAL',
    terakhirUpdate: 'Real-time (Live Sync)',
  },
  {
    id: 'bank-5',
    namaBank: 'Bank Tabungan Negara (BTN) Tbk',
    nomorRekening: '00045-01-50-002891-2',
    nilaiSaldo: 142615179804,
    kegunaan: 'Rekening Dana Cadangan Pemeliharaan Fasilitas & SPAM',
    kategoriRekening: 'DEPOSITO / DPLK',
    terakhirUpdate: 'Real-time (5 Menit yang lalu)',
  },
  {
    id: 'bank-6',
    namaBank: 'Bank Central Asia (BCA) Tbk',
    nomorRekening: '061-889-2241',
    nilaiSaldo: 100000000000,
    kegunaan: 'Rekening Gateway Pembayaran Elektronik / Payment Host',
    kategoriRekening: 'PENAMPUNG',
    terakhirUpdate: 'Real-time (Live Sync)',
  },
];

// ==========================================
// 8. DATASET NO. 14 (Hal. 4-5): LAPORAN PENERIMAAN SUMBER DANA
// Aturan #12: SUMBER DANA, UNIT KERJA, NILAI, PANGSA (%)
// ==========================================
export interface PenerimaanSumberDanaItem {
  id: string;
  sumberDana: string;
  unitKerja: string;
  nilai: number;
  pangsaPersen: number;
  periode: string;
  keterangan: string;
}

export const PENERIMAAN_SUMBER_DANA_DATA: PenerimaanSumberDanaItem[] = [
  {
    id: 'sd-1',
    sumberDana: 'PNBP Jasa Pelabuhan & Terminal',
    unitKerja: 'Direktorat Pengelolaan Kepelabuhanan',
    nilai: 295420000000,
    pangsaPersen: 35.8,
    periode: 'Semester I 2026',
    keterangan: 'Tarif jasa labuh, tambat, dermaga, pass penumpang & peti kemas Batu Ampar',
  },
  {
    id: 'sd-2',
    sumberDana: 'PNBP Alokasi & Hak Atas Lahan',
    unitKerja: 'Direktorat Pengelolaan Lahan',
    nilai: 218750000000,
    pangsaPersen: 26.5,
    periode: 'Semester I 2026',
    keterangan: 'UWT alokasi baru, perpanjangan hak, faktur perubahan peruntukan & PL',
  },
  {
    id: 'sd-3',
    sumberDana: 'PNBP Jasa Kebandarudaraan',
    unitKerja: 'Direktorat Pengelolaan Bandara (Hang Nadim)',
    nilai: 139460000000,
    pangsaPersen: 16.9,
    periode: 'Semester I 2026',
    keterangan: 'Bagi hasil konsesi mitra bandara, PJP2U & pendaratan pesawat',
  },
  {
    id: 'sd-4',
    sumberDana: 'PNBP Jasa Medis & RSBP',
    unitKerja: 'Badan Usaha Rumah Sakit BP Batam',
    nilai: 108340000000,
    pangsaPersen: 13.1,
    periode: 'Semester I 2026',
    keterangan: 'Pelayanan rawat inap, bedah jantung, radiologi & laboratorium terpadu',
  },
  {
    id: 'sd-5',
    sumberDana: 'PNBP SPAM & Fasilitas Lingkungan',
    unitKerja: 'Badan Usaha SPAM & Fasilitas Lingkungan',
    nilai: 42800000000,
    pangsaPersen: 5.2,
    periode: 'Semester I 2026',
    keterangan: 'Distribusi air curah industri, KPLI limbah B3 & sewa fasilitas komersial',
  },
  {
    id: 'sd-6',
    sumberDana: 'Pendapatan Bunga Kas BLU / Jasa Giro',
    unitKerja: 'Biro Keuangan (Perbendaharaan Kas)',
    nilai: 21247200034,
    pangsaPersen: 2.5,
    periode: 'Semester I 2026',
    keterangan: 'Hasil pengelolaan kas rekening operasional pada perbankan Himbara',
  },
];

// ==========================================
// 9. DATASET NO. 20 (Hal. 5): REKAPITULASI PIUTANG TAK TERTAGIH
// Aturan #12: NAMA DEBITUR, NOMOR FAKTUR, TANGGAL JATUH TEMPO, SALDO PIUTANG, STATUS KPKNL
// ==========================================
export interface PiutangTakTertagihItem {
  id: string;
  nomorFaktur: string;
  namaPelanggan: string;
  tanggalJatuhTempo: string;
  saldoPiutangTakTertagih: number;
  statusKpknl: 'PROSES KPKNL / PUPN' | 'SURAT PAKSA TERBIT' | 'VERIFIKASI PENGHAPUSAN' | 'RESTRUKTURISASI';
  umurPiutangHari: number;
  unitLayanan: string;
}

export const PIUTANG_TAK_TERTAGIH_DATA: PiutangTakTertagihItem[] = [
  {
    id: 'piut-1',
    nomorFaktur: 'FAK/LHN/2021/0892',
    namaPelanggan: 'PT Batam Bahari Graha Mandiri',
    tanggalJatuhTempo: '15 Maret 2022',
    saldoPiutangTakTertagih: 14250000000,
    statusKpknl: 'PROSES KPKNL / PUPN',
    umurPiutangHari: 1560,
    unitLayanan: 'UWT Lahan Industri Muka Kuning',
  },
  {
    id: 'piut-2',
    nomorFaktur: 'FAK/PEL/2022/1043',
    namaPelanggan: 'PT Marina Nusantara Lines',
    tanggalJatuhTempo: '22 Agustus 2022',
    saldoPiutangTakTertagih: 9800000000,
    statusKpknl: 'SURAT PAKSA TERBIT',
    umurPiutangHari: 1400,
    unitLayanan: 'Jasa Tambat & Labuh Kapal Pelabuhan',
  },
  {
    id: 'piut-3',
    nomorFaktur: 'FAK/LHN/2021/1402',
    namaPelanggan: 'PT Citra Kabil Megatama',
    tanggalJatuhTempo: '10 November 2022',
    saldoPiutangTakTertagih: 7650000000,
    statusKpknl: 'PROSES KPKNL / PUPN',
    umurPiutangHari: 1320,
    unitLayanan: 'UWT Lahan Industri Kabil',
  },
  {
    id: 'piut-4',
    nomorFaktur: 'FAK/AIR/2023/0411',
    namaPelanggan: 'PT Sumber Tirta Anugerah',
    tanggalJatuhTempo: '05 Mei 2023',
    saldoPiutangTakTertagih: 5200000000,
    statusKpknl: 'RESTRUKTURISASI',
    umurPiutangHari: 1145,
    unitLayanan: 'Tagihan Air Curah Kawasan Industri',
  },
  {
    id: 'piut-5',
    nomorFaktur: 'FAK/RSB/2023/0789',
    namaPelanggan: 'PT Asuransi Sehat Utama (Klaim Tertunda)',
    tanggalJatuhTempo: '14 Juli 2023',
    saldoPiutangTakTertagih: 3450000000,
    statusKpknl: 'VERIFIKASI PENGHAPUSAN',
    umurPiutangHari: 1075,
    unitLayanan: 'Pelayanan Pasien Rujukan RSBP',
  },
  {
    id: 'piut-6',
    nomorFaktur: 'FAK/BND/2023/0950',
    namaPelanggan: 'PT Aero Pacific Logistics',
    tanggalJatuhTempo: '30 Oktober 2023',
    saldoPiutangTakTertagih: 2850000000,
    statusKpknl: 'SURAT PAKSA TERBIT',
    umurPiutangHari: 967,
    unitLayanan: 'Sewa Area Kargo Bandara Hang Nadim',
  },
  {
    id: 'piut-7',
    nomorFaktur: 'FAK/LHN/2023/1205',
    namaPelanggan: 'PT Tunas Galang Perkasa',
    tanggalJatuhTempo: '18 Desember 2023',
    saldoPiutangTakTertagih: 2200000000,
    statusKpknl: 'RESTRUKTURISASI',
    umurPiutangHari: 918,
    unitLayanan: 'Perpanjangan Hak Lahan Galang',
  },
  {
    id: 'piut-8',
    nomorFaktur: 'FAK/PEL/2024/0112',
    namaPelanggan: 'PT Pelayaran Bintang Selat',
    tanggalJatuhTempo: '20 Februari 2024',
    saldoPiutangTakTertagih: 1750000000,
    statusKpknl: 'PROSES KPKNL / PUPN',
    umurPiutangHari: 855,
    unitLayanan: 'Jasa Dermaga Curah Cair',
  },
];

// ==========================================
// 8. DATA SURPLUS DAN DEFISIT SETIAP UNIT
// ==========================================
export interface SurplusDefisitUnitItem {
  id: string;
  unit: string;
  namaLengkap: string;
  kategori: 'Badan Usaha' | 'Direktorat Teknis' | 'Pusat Layanan' | 'Biro Pendukung';
  pendapatan: number;
  belanja: number;
  surplusDefisit: number;
  status: 'SURPLUS' | 'DEFISIT';
  coverageRatio: number; // rasio pendapatan / belanja (%)
  uraianKinerja: string;
}

export const SURPLUS_DEFISIT_UNIT_DATA: SurplusDefisitUnitItem[] = [
  {
    id: 'unit-1',
    unit: 'BU Pelabuhan (BUP)',
    namaLengkap: 'Badan Usaha Pelabuhan BP Batam',
    kategori: 'Badan Usaha',
    pendapatan: 295400000000,
    belanja: 142600000000,
    surplusDefisit: 152800000000,
    status: 'SURPLUS',
    coverageRatio: 207.2,
    uraianKinerja: 'Surplus tinggi dari jasa labuh tambat kapal, bongkar muat & konsesi kargo pelabuhan Batu Ampar.',
  },
  {
    id: 'unit-2',
    unit: 'Pengelolaan Lahan',
    namaLengkap: 'Direktorat Pengelolaan Pertanahan & Lahan',
    kategori: 'Direktorat Teknis',
    pendapatan: 218800000000,
    belanja: 64200000000,
    surplusDefisit: 154600000000,
    status: 'SURPLUS',
    coverageRatio: 340.8,
    uraianKinerja: 'Surplus optimal dari penerimaan Uang Wajib Tahunan Otorita (UWTO) dan alokasi pemanfaatan tanah.',
  },
  {
    id: 'unit-3',
    unit: 'BU Bandara Hang Nadim',
    namaLengkap: 'Badan Usaha Bandar Udara Hang Nadim',
    kategori: 'Badan Usaha',
    pendapatan: 139500000000,
    belanja: 98300000000,
    surplusDefisit: 41200000000,
    status: 'SURPLUS',
    coverageRatio: 141.9,
    uraianKinerja: 'Surplus operasional dari Pelayanan Jasa Penumpang Pesawat Udara (PJP2U), kargo & aeronautika.',
  },
  {
    id: 'unit-4',
    unit: 'RSBP Batam (Kesehatan)',
    namaLengkap: 'Badan Usaha Rumah Sakit BP Batam Sekupang',
    kategori: 'Badan Usaha',
    pendapatan: 108300000000,
    belanja: 94800000000,
    surplusDefisit: 13500000000,
    status: 'SURPLUS',
    coverageRatio: 114.2,
    uraianKinerja: 'Surplus mandiri BLU dari layanan poliklinik spesialis, rawat inap, bedah jantung & KEK Kesehatan.',
  },
  {
    id: 'unit-5',
    unit: 'BU SPAM & Fasilitas Air',
    namaLengkap: 'Badan Usaha Fasilitas & Distribusi Air Bersih',
    kategori: 'Badan Usaha',
    pendapatan: 42800000000,
    belanja: 38500000000,
    surplusDefisit: 4300000000,
    status: 'SURPLUS',
    coverageRatio: 111.2,
    uraianKinerja: 'Surplus marjinal dari retribusi air baku waduk dan pengelolaan fasilitas SPAM Batam.',
  },
  {
    id: 'unit-6',
    unit: 'Pengelolaan Lingkungan',
    namaLengkap: 'Direktorat Fasilitas & Pengelolaan Lingkungan Hidup',
    kategori: 'Direktorat Teknis',
    pendapatan: 18200000000,
    belanja: 24600000000,
    surplusDefisit: -6400000000,
    status: 'DEFISIT',
    coverageRatio: 74.0,
    uraianKinerja: 'Defisit belanja investasi & proteksi lingkungan hidup, pengelolaan limbah B3 KPLI Kabil & DAS waduk.',
  },
  {
    id: 'unit-7',
    unit: 'Balai Diklat & Pelatihan',
    namaLengkap: 'Pusat Pengembangan SDM & Diklat Industri',
    kategori: 'Pusat Layanan',
    pendapatan: 3200000000,
    belanja: 6500000000,
    surplusDefisit: -3300000000,
    status: 'DEFISIT',
    coverageRatio: 49.2,
    uraianKinerja: 'Defisit subsidi edukasi dan sertifikasi keahlian teknis maritim/industri masyarakat Batam.',
  },
  {
    id: 'unit-8',
    unit: 'PDSI (Teknologi Info)',
    namaLengkap: 'Pusat Data dan Sistem Informasi (PDSI)',
    kategori: 'Pusat Layanan',
    pendapatan: 2500000000,
    belanja: 14800000000,
    surplusDefisit: -12300000000,
    status: 'DEFISIT',
    coverageRatio: 16.9,
    uraianKinerja: 'Unit pendukung internal; belanja pemeliharaan server data center, bandwidth & lisensi digital instansi.',
  },
  {
    id: 'unit-9',
    unit: 'Sekretariat & Kantor Pusat',
    namaLengkap: 'Biro Umum, Keuangan & Administrasi Instansi',
    kategori: 'Biro Pendukung',
    pendapatan: 21200000000,
    belanja: 67200000000,
    surplusDefisit: -46000000000,
    status: 'DEFISIT',
    coverageRatio: 31.5,
    uraianKinerja: 'Belanja dukungan manajemen birokrasi, sarana prasarana perkantoran, hukum, pengawasan & protokol.',
  },
];

