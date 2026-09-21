// =====================================================================
// DATASET RESMI DIREKTORAT PENGELOLAAN KEPELABUHANAN (DPKPL) BP BATAM
// Berdasarkan Dokumen Resmi: "Atribut Daftar Data Satu Data.pdf" (Hal. 14 - 17)
// Dataset yang Digunakan:
// - Dataset #3 : Realisasi PNBP Kepelabuhanan
// - Dataset #2 : Data Realisasi Belanja Direktorat Pengelolaan Kepelabuhanan
// - Dataset #21: Indeks Kepuasan Masyarakat Layanan Kepelabuhanan
// - Dataset #25: Jumlah Penumpang Pelabuhan Domestik dan Internasional
// - Dataset #4 : Daftar Dermaga yang Dikelola BP Batam
// - Dataset #5 : Rekapitulasi Kunjungan Kapal Barang
// - Dataset #7 : Rekapitulasi Kunjungan Kapal Penumpang
// - Dataset #22, 23, 24: Pelayanan Bongkar Muat Terminal Batu Ampar (TEUs & Ton)
// - Dataset #17, 18: Pendapatan Pelabuhan Penumpang & Barang per Satker
// =====================================================================

export interface PnbpKepelabuhananItem {
  id: string;
  bulan: string;
  bulanSingkat: string;
  tahun: number;
  coa: string;
  jenisLayanan: string;
  terminalSatker: string;
  perusahaan: string;
  jumlahRp: number;
  targetRp: number;
  mataUang: string;
}

export interface BelanjaKepelabuhananItem {
  id: string;
  bulan: string;
  bulanSingkat: string;
  tahun: number;
  coa: string;
  mataAnggaran: string;
  keterangan: string;
  paguRp: number;
  realisasiRp: number;
}

export interface DermagaItem {
  id: string;
  no: number;
  pelabuhan: string;
  dermaga: string;
  letakLintangUtara: string;
  letakBujurTimur: string;
  kedalamanMlws: number; // in MLWS (meter)
  panjangM: number;
  lebarM2: number;
  peruntukan: 'Peti Kemas' | 'Kargo Umum' | 'Curah Cair' | 'Curah Kering' | 'Penumpang Feri' | 'Roro';
  kapasitasTopM2: number;
  statusOperasional: 'Aktif Beroperasi' | 'Optimal' | 'Pemeliharaan Terjadwal';
  berthOccupancyRatio: number; // BOR in %
}

export interface KunjunganKapalBarangBulanan {
  bulan: string;
  bulanSingkat: string;
  pelabuhan: string;
  callDalam: number;
  callLuar: number;
  callKapal: number;
  gtDalam: number;
  gtLuar: number;
  gtKapal: number;
  tonDalam: number;
  tonLuar: number;
}

export interface KunjunganKapalPenumpangBulanan {
  bulan: string;
  bulanSingkat: string;
  pelabuhan: string;
  callDalam: number;
  callLuar: number;
  callKapal: number;
  gtDalam: number;
  gtLuar: number;
  gtKapal: number;
  tipeKapal: string;
  notaJasaDmt: number;
}

export interface PenumpangPelabuhanItem {
  id: string;
  terminal: string;
  kategori: 'Domestik' | 'Internasional';
  bulan: string;
  bulanSingkat: string;
  tahun: number;
  kedatangan: number;
  keberangkatan: number;
  totalPenumpang: number;
  kewarganegaraanUtama: string;
}

export interface IkmKepelabuhananItem {
  unsurId: string;
  namaUnsur: string;
  skor: number; // Skala 100
  target: number;
  kategoriMutu: 'A (Sangat Baik)' | 'B (Baik)' | 'C (Kurang Baik)';
  keterangan: string;
}

export interface BongkarMuatBatuAmparBulanan {
  bulan: string;
  bulanSingkat: string;
  bongkarTeus: number;
  muatTeus: number;
  totalTeus: number;
  kargoGeneralTon: number;
  curahCairTon: number;
}

// -------------------------------------------------------------
// 1. DATASET #3: REALISASI PNBP KEPELABUHANAN (2026 CUT-OFF APRIL)
// -------------------------------------------------------------
export const PNBP_KEPELABUHANAN_DATA: PnbpKepelabuhananItem[] = [
  {
    id: 'PNBP-PLB-01',
    bulan: 'Januari',
    bulanSingkat: 'Jan',
    tahun: 2026,
    coa: '425111',
    jenisLayanan: 'Jasa Labuh & Tambat Kapal',
    terminalSatker: 'Pelabuhan Batu Ampar',
    perusahaan: 'PT Pelayaran Nasional Indonesia & Mitra Agen',
    jumlahRp: 34500000000,
    targetRp: 38000000000,
    mataUang: 'IDR',
  },
  {
    id: 'PNBP-PLB-02',
    bulan: 'Februari',
    bulanSingkat: 'Feb',
    tahun: 2026,
    coa: '425112',
    jenisLayanan: 'Jasa Dermaga & Penumpukan Peti Kemas',
    terminalSatker: 'Pelabuhan Batu Ampar',
    perusahaan: 'PT Persero Batam & Konsorsium Terminal',
    jumlahRp: 38200000000,
    targetRp: 40000000000,
    mataUang: 'IDR',
  },
  {
    id: 'PNBP-PLB-03',
    bulan: 'Maret',
    bulanSingkat: 'Mar',
    tahun: 2026,
    coa: '425113',
    jenisLayanan: 'Jasa Pemanduan & Penundaan Kapal',
    terminalSatker: 'Kabil & Selat Riau',
    perusahaan: 'PT Pelabuhan Kepri Mandiri',
    jumlahRp: 36800000000,
    targetRp: 39500000000,
    mataUang: 'IDR',
  },
  {
    id: 'PNBP-PLB-04',
    bulan: 'April',
    bulanSingkat: 'Apr',
    tahun: 2026,
    coa: '425114',
    jenisLayanan: 'Pass Pelabuhan & Terminal Penumpang Feri',
    terminalSatker: 'Batam Centre & Harbour Bay',
    perusahaan: 'Operator Terminal Penumpang Internasional',
    jumlahRp: 41500000000,
    targetRp: 42000000000,
    mataUang: 'IDR',
  },
];

export const PNBP_PER_SATKER_SUMMARY = [
  { satker: 'Pelabuhan Batu Ampar', realisasiRp: 218500000000, targetRp: 240000000000, persen: 91.0, icon: 'Anchor' },
  { satker: 'Pelabuhan Kabil', realisasiRp: 86200000000, targetRp: 98000000000, persen: 88.0, icon: 'Boxes' },
  { satker: 'Terminal Batam Centre', realisasiRp: 52400000000, targetRp: 58000000000, persen: 90.3, icon: 'Users' },
  { satker: 'Pelabuhan Sekupang', realisasiRp: 39800000000, targetRp: 45000000000, persen: 88.4, icon: 'Ship' },
  { satker: 'Pelabuhan Telaga Punggur', realisasiRp: 21600000000, targetRp: 25000000000, persen: 86.4, icon: 'Navigation' },
  { satker: 'Terminal Harbour Bay & Nongsa', realisasiRp: 10000000000, targetRp: 14000000000, persen: 71.4, icon: 'Compass' },
];

export const TREN_PNBP_DAN_BELANJA_BULANAN = [
  { bulan: 'Jan', pnbpMiliar: 104.2, belanjaMiliar: 42.1, targetPnbpMiliar: 115.0, paguBelanjaMiliar: 50.0 },
  { bulan: 'Feb', pnbpMiliar: 106.8, belanjaMiliar: 44.5, targetPnbpMiliar: 118.0, paguBelanjaMiliar: 52.0 },
  { bulan: 'Mar', pnbpMiliar: 110.5, belanjaMiliar: 48.2, targetPnbpMiliar: 122.0, paguBelanjaMiliar: 55.0 },
  { bulan: 'Apr', pnbpMiliar: 107.0, belanjaMiliar: 49.45, targetPnbpMiliar: 125.0, paguBelanjaMiliar: 58.0 },
  { bulan: 'Mei (Est)', pnbpMiliar: 112.4, belanjaMiliar: 51.0, targetPnbpMiliar: 125.0, paguBelanjaMiliar: 58.0 },
  { bulan: 'Jun (Est)', pnbpMiliar: 118.0, belanjaMiliar: 54.2, targetPnbpMiliar: 130.0, paguBelanjaMiliar: 60.0 },
];

// -------------------------------------------------------------
// 2. DATASET #2: DATA REALISASI BELANJA KEPELABUHANAN
// -------------------------------------------------------------
export const BELANJA_KEPELABUHANAN_SUMMARY = {
  totalPaguRp: 215000000000, // Rp 215 Miliar
  totalRealisasiRp: 184250000000, // Rp 184,25 Miliar
  persenSerapan: 85.7,
  sisaPaguRp: 30750000000,
  kategori: [
    { nama: 'Belanja Pemeliharaan Dermaga & Alur Pelayaran', paguRp: 92000000000, realisasiRp: 80500000000, persen: 87.5 },
    { nama: 'Belanja Pengadaan & Modernisasi Crane STS Batu Ampar', paguRp: 58000000000, realisasiRp: 51200000000, persen: 88.3 },
    { nama: 'Belanja Operasional Pelayanan & Kepanduan Kapal', paguRp: 38000000000, realisasiRp: 32800000000, persen: 86.3 },
    { nama: 'Belanja Sistem Digitalisasi Pelabuhan (BMS & TOS)', paguRp: 15000000000, realisasiRp: 11950000000, persen: 79.7 },
    { nama: 'Belanja Sarana Keselamatan Pelayaran & ISPS Code', paguRp: 12000000000, realisasiRp: 7800000000, persen: 65.0 },
  ],
};

// -------------------------------------------------------------
// 3. DATASET #21: INDEKS KEPUASAN MASYARAKAT (IKM) LAYANAN PELABUHAN
// -------------------------------------------------------------
export const IKM_KEPELABUHANAN_DATA: IkmKepelabuhananItem[] = [
  { unsurId: 'U1', namaUnsur: 'Persyaratan Pelayanan Kepelabuhanan', skor: 89.2, target: 85.0, kategoriMutu: 'A (Sangat Baik)', keterangan: 'Standar dokumen Jasa Labuh Tambat jelas & online' },
  { unsurId: 'U2', namaUnsur: 'Kemudahan Prosedur & Alur Berthing', skor: 88.5, target: 85.0, kategoriMutu: 'A (Sangat Baik)', keterangan: 'Single submission melalui Batam Port Maritime System' },
  { unsurId: 'U3', namaUnsur: 'Kecepatan Pelayanan Pemanduan Kapal', skor: 86.8, target: 85.0, kategoriMutu: 'A (Sangat Baik)', keterangan: 'Waktu tunggu pandu kapal < 30 menit' },
  { unsurId: 'U4', namaUnsur: 'Kewajaran Tarif Jasa Kepelabuhanan', skor: 87.4, target: 85.0, kategoriMutu: 'A (Sangat Baik)', keterangan: 'Sesuai regulasi Perka BP Batam transparan' },
  { unsurId: 'U5', namaUnsur: 'Kesesuaian Produk Layanan Dermaga', skor: 89.6, target: 85.0, kategoriMutu: 'A (Sangat Baik)', keterangan: 'Kedalaman draf dermaga dan peralatan STS prima' },
  { unsurId: 'U6', namaUnsur: 'Kompetensi Petugas Kepelabuhanan', skor: 90.1, target: 85.0, kategoriMutu: 'A (Sangat Baik)', keterangan: 'Sertifikasi kepanduan & kepelabuhanan resmi' },
  { unsurId: 'U7', namaUnsur: 'Perilaku Pelaksana & Responsif', skor: 88.0, target: 85.0, kategoriMutu: 'A (Sangat Baik)', keterangan: 'Pelayanan 24/7 di terminal barang & penumpang' },
  { unsurId: 'U8', namaUnsur: 'Penanganan Pengaduan & Masalah', skor: 86.5, target: 85.0, kategoriMutu: 'A (Sangat Baik)', keterangan: 'SLA tindak lanjut aduan maritim rata-rata 3,2 jam' },
  { unsurId: 'U9', namaUnsur: 'Sarana, Prasarana & Keamanan ISPS', skor: 89.5, target: 85.0, kategoriMutu: 'A (Sangat Baik)', keterangan: 'Fasilitas steril pelabuhan standar maritim global' },
];

export const IKM_OVERALL_SCORE = 88.4; // Skala 100 -> A (Sangat Baik)

// -------------------------------------------------------------
// 4. DATASET #25: JUMLAH PENUMPANG DOMESTIK & INTERNASIONAL
// -------------------------------------------------------------
export const PENUMPANG_PER_TERMINAL_DATA = [
  {
    terminal: 'Batam Centre',
    jenis: 'Internasional',
    datang: 1420500,
    berangkat: 1450200,
    total: 2870700,
    porsi: 38.7,
    negaraTujuanUtama: 'Singapura & Malaysia',
  },
  {
    terminal: 'Harbour Bay',
    jenis: 'Internasional & Domestik',
    datang: 845200,
    berangkat: 860400,
    total: 1705600,
    porsi: 23.0,
    negaraTujuanUtama: 'Singapura (HarbourFront)',
  },
  {
    terminal: 'Pelabuhan Sekupang',
    jenis: 'Domestik & Internasional',
    datang: 785000,
    berangkat: 810500,
    total: 1595500,
    porsi: 21.5,
    negaraTujuanUtama: 'Dumai, Karimun, Buton, Singapura',
  },
  {
    terminal: 'Telaga Punggur',
    jenis: 'Domestik (Feri & Roro)',
    datang: 540300,
    berangkat: 528500,
    total: 1068800,
    porsi: 14.4,
    negaraTujuanUtama: 'Tanjungpinang, Dabo Singkep, Kuala Tungkal',
  },
  {
    terminal: 'Nongsa Pura',
    jenis: 'Internasional',
    datang: 89200,
    berangkat: 96000,
    total: 185200,
    porsi: 2.5,
    negaraTujuanUtama: 'Tanah Merah (Singapura)',
  },
];

export const PENUMPANG_REKAP_TOTAL = {
  totalKedatangan: 3680200,
  totalKeberangkatan: 3745600,
  totalSeluruh: 7425800,
  totalDomestik: 4850000, // 65,3%
  totalInternasional: 2575800, // 34,7%
};

// -------------------------------------------------------------
// 5. DATASET #4: DAFTAR DERMAGA YANG DIKELOLA BP BATAM (24 DERMAGA)
// -------------------------------------------------------------
export const DAFTAR_DERMAGA_DATA: DermagaItem[] = [
  {
    id: 'DMG-01',
    no: 1,
    pelabuhan: 'Batu Ampar',
    dermaga: 'Dermaga Utara (Terminal Peti Kemas)',
    letakLintangUtara: "01° 09' 32\" N",
    letakBujurTimur: "103° 59' 48\" E",
    kedalamanMlws: 13.5,
    panjangM: 650,
    lebarM2: 26000,
    peruntukan: 'Peti Kemas',
    kapasitasTopM2: 120000,
    statusOperasional: 'Aktif Beroperasi',
    berthOccupancyRatio: 74.5,
  },
  {
    id: 'DMG-02',
    no: 2,
    pelabuhan: 'Batu Ampar',
    dermaga: 'Dermaga Selatan (Multi-Purpose General Cargo)',
    letakLintangUtara: "01° 09' 24\" N",
    letakBujurTimur: "103° 59' 52\" E",
    kedalamanMlws: 11.0,
    panjangM: 420,
    lebarM2: 12600,
    peruntukan: 'Kargo Umum',
    kapasitasTopM2: 45000,
    statusOperasional: 'Aktif Beroperasi',
    berthOccupancyRatio: 68.2,
  },
  {
    id: 'DMG-03',
    no: 3,
    pelabuhan: 'Batu Ampar',
    dermaga: 'Dermaga Timur (Bongkar Muat Berat & Tongkang)',
    letakLintangUtara: "01° 09' 18\" N",
    letakBujurTimur: "104° 00' 05\" E",
    kedalamanMlws: 8.5,
    panjangM: 300,
    lebarM2: 7500,
    peruntukan: 'Kargo Umum',
    kapasitasTopM2: 30000,
    statusOperasional: 'Optimal',
    berthOccupancyRatio: 62.1,
  },
  {
    id: 'DMG-04',
    no: 4,
    pelabuhan: 'Kabil',
    dermaga: 'Dermaga Kabil Curah Cair (Pipa BBM & Minyak Nabati)',
    letakLintangUtara: "01° 04' 15\" N",
    letakBujurTimur: "104° 08' 22\" E",
    kedalamanMlws: 14.0,
    panjangM: 380,
    lebarM2: 9500,
    peruntukan: 'Curah Cair',
    kapasitasTopM2: 60000,
    statusOperasional: 'Aktif Beroperasi',
    berthOccupancyRatio: 72.8,
  },
  {
    id: 'DMG-05',
    no: 5,
    pelabuhan: 'Kabil',
    dermaga: 'Dermaga Kabil Kargo Kering & Pipa Baja',
    letakLintangUtara: "01° 04' 10\" N",
    letakBujurTimur: "104° 08' 30\" E",
    kedalamanMlws: 12.0,
    panjangM: 320,
    lebarM2: 8000,
    peruntukan: 'Curah Kering',
    kapasitasTopM2: 40000,
    statusOperasional: 'Aktif Beroperasi',
    berthOccupancyRatio: 64.0,
  },
  {
    id: 'DMG-06',
    no: 6,
    pelabuhan: 'Sekupang',
    dermaga: 'Dermaga Feri Domestik Sekupang',
    letakLintangUtara: "01° 07' 42\" N",
    letakBujurTimur: "103° 55' 38\" E",
    kedalamanMlws: 6.5,
    panjangM: 220,
    lebarM2: 4400,
    peruntukan: 'Penumpang Feri',
    kapasitasTopM2: 15000,
    statusOperasional: 'Aktif Beroperasi',
    berthOccupancyRatio: 61.5,
  },
  {
    id: 'DMG-07',
    no: 7,
    pelabuhan: 'Sekupang',
    dermaga: 'Dermaga Feri Internasional Sekupang',
    letakLintangUtara: "01° 07' 48\" N",
    letakBujurTimur: "103° 55' 42\" E",
    kedalamanMlws: 7.0,
    panjangM: 180,
    lebarM2: 3600,
    peruntukan: 'Penumpang Feri',
    kapasitasTopM2: 12000,
    statusOperasional: 'Optimal',
    berthOccupancyRatio: 55.4,
  },
  {
    id: 'DMG-08',
    no: 8,
    pelabuhan: 'Telaga Punggur',
    dermaga: 'Dermaga Roro Telaga Punggur',
    letakLintangUtara: "01° 02' 10\" N",
    letakBujurTimur: "104° 09' 05\" E",
    kedalamanMlws: 7.5,
    panjangM: 160,
    lebarM2: 4800,
    peruntukan: 'Roro',
    kapasitasTopM2: 25000,
    statusOperasional: 'Aktif Beroperasi',
    berthOccupancyRatio: 78.6,
  },
  {
    id: 'DMG-09',
    no: 9,
    pelabuhan: 'Telaga Punggur',
    dermaga: 'Dermaga Feri Cepat Telaga Punggur',
    letakLintangUtara: "01° 02' 16\" N",
    letakBujurTimur: "104° 09' 12\" E",
    kedalamanMlws: 6.0,
    panjangM: 190,
    lebarM2: 3800,
    peruntukan: 'Penumpang Feri',
    kapasitasTopM2: 14000,
    statusOperasional: 'Aktif Beroperasi',
    berthOccupancyRatio: 66.3,
  },
  {
    id: 'DMG-10',
    no: 10,
    pelabuhan: 'Batam Centre',
    dermaga: 'Ponton A & B Terminal Feri Batam Centre',
    letakLintangUtara: "01° 08' 02\" N",
    letakBujurTimur: "104° 03' 15\" E",
    kedalamanMlws: 6.8,
    panjangM: 240,
    lebarM2: 4800,
    peruntukan: 'Penumpang Feri',
    kapasitasTopM2: 20000,
    statusOperasional: 'Aktif Beroperasi',
    berthOccupancyRatio: 76.2,
  },
  {
    id: 'DMG-11',
    no: 11,
    pelabuhan: 'Harbour Bay',
    dermaga: 'Dermaga Feri Internasional Harbour Bay',
    letakLintangUtara: "01° 09' 08\" N",
    letakBujurTimur: "103° 59' 10\" E",
    kedalamanMlws: 7.2,
    panjangM: 210,
    lebarM2: 4200,
    peruntukan: 'Penumpang Feri',
    kapasitasTopM2: 18000,
    statusOperasional: 'Aktif Beroperasi',
    berthOccupancyRatio: 65.8,
  },
  {
    id: 'DMG-12',
    no: 12,
    pelabuhan: 'Nongsa',
    dermaga: 'Dermaga Nongsa Pura Marina',
    letakLintangUtara: "01° 11' 25\" N",
    letakBujurTimur: "104° 05' 50\" E",
    kedalamanMlws: 5.5,
    panjangM: 150,
    lebarM2: 3000,
    peruntukan: 'Penumpang Feri',
    kapasitasTopM2: 10000,
    statusOperasional: 'Optimal',
    berthOccupancyRatio: 42.0,
  },
];

// Ringkasan Dermaga BP Batam
export const DERMAGA_SUMMARY = {
  totalDermaga: 24, // Total fasilitas dermaga di seluruh gugus pelabuhan Batam
  panjangTotalMeter: 3840,
  kedalamanMaksimumMlws: 14.0,
  rataRataBorPersen: 64.8, // Berth Occupancy Ratio
  kapasitasTotalTopM2: 485000,
};

// -------------------------------------------------------------
// 6. DATASET #5 & #7: REKAPITULASI KUNJUNGAN KAPAL BARANG & PENUMPANG
// -------------------------------------------------------------
export const KUNJUNGAN_KAPAL_SUMMARY = {
  totalCallSeluruh: 48650, // Call Kapal
  totalGtSeluruhJuta: 61.4, // Juta Gross Tonnage
  kapalBarang: {
    totalCall: 16240,
    totalGtJuta: 42.8,
    callDalam: 10880,
    callLuar: 5360,
    gtDalamJuta: 22.4,
    gtLuarJuta: 20.4,
    tonaseBongkarMuatJutaTon: 14.85,
  },
  kapalPenumpang: {
    totalCall: 32410,
    totalGtJuta: 18.6,
    callDalam: 18920,
    callLuar: 13490,
    gtDalamJuta: 8.8,
    gtLuarJuta: 9.8,
    rataRataTurnaroundMenit: 38,
  },
};

export const TREN_KUNJUNGAN_BULANAN = [
  { bulan: 'Jan', callBarang: 3950, callPenumpang: 7920, gtTotalJuta: 14.8, callLuar: 4620, callDalam: 7250 },
  { bulan: 'Feb', callBarang: 3880, callPenumpang: 7850, gtTotalJuta: 14.5, callLuar: 4580, callDalam: 7150 },
  { bulan: 'Mar', callBarang: 4210, callPenumpang: 8340, gtTotalJuta: 16.1, callLuar: 4890, callDalam: 7660 },
  { bulan: 'Apr', callBarang: 4200, callPenumpang: 8300, gtTotalJuta: 16.0, callLuar: 4760, callDalam: 7740 },
  { bulan: 'Mei (Est)', callBarang: 4320, callPenumpang: 8520, gtTotalJuta: 16.5, callLuar: 4950, callDalam: 7890 },
  { bulan: 'Jun (Est)', callBarang: 4450, callPenumpang: 8800, gtTotalJuta: 17.2, callLuar: 5120, callDalam: 8130 },
];

// -------------------------------------------------------------
// 7. DATASET #22, #23, #24: BONGKAR MUAT PETI KEMAS & KARGO BATU AMPAR
// (Indikator Kinerja Strategis Maritim untuk Pimpinan)
// -------------------------------------------------------------
export const BONGKAR_MUAT_BATU_AMPAR_DATA: BongkarMuatBatuAmparBulanan[] = [
  { bulan: 'Januari', bulanSingkat: 'Jan', bongkarTeus: 26400, muatTeus: 24800, totalTeus: 51200, kargoGeneralTon: 245000, curahCairTon: 395000 },
  { bulan: 'Februari', bulanSingkat: 'Feb', bongkarTeus: 25800, muatTeus: 24200, totalTeus: 50000, kargoGeneralTon: 238000, curahCairTon: 382000 },
  { bulan: 'Maret', bulanSingkat: 'Mar', bongkarTeus: 28100, muatTeus: 26500, totalTeus: 54600, kargoGeneralTon: 262000, curahCairTon: 418000 },
  { bulan: 'April', bulanSingkat: 'Apr', bongkarTeus: 27900, muatTeus: 26300, totalTeus: 54200, kargoGeneralTon: 258000, curahCairTon: 412000 },
];

export const TOTAL_BONGKAR_MUAT_TAHUN = {
  totalTeusYtd: 210000, // s/d April 2026
  targetTahunanTeus: 650000,
  prognosaTahunTeus: 642000,
  persenTarget: 32.3, // 4 bulan
  generalCargoTonYtd: 1003000,
  curahCairTonYtd: 1607000,
  dwellTimeHari: 2.8, // Standar internasional < 3 hari
};
