import { PerkinA7Metadata, PerkinA7KpiItem } from './types';

// ====================================================================
// 1. DOKUMEN METADATA RESMI PERKIN A.7 TAHUN 2025
// ====================================================================
export const PERKIN_A7_METADATA: PerkinA7Metadata = {
  nomorPerkin: 'Nomor: 7/KA/3/2025',
  tanggalPenetapan: '28 Maret 2025',
  tahunAnggaran: '2025',
  pihakPertama: {
    nama: 'Amsakar Achmad',
    jabatan: 'Kepala Badan Pengusahaan Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam',
    nip: '196808011993031005',
  },
  pihakKedua: {
    nama: 'Ir. H. Sudirman Saad, M.Hum',
    jabatan: 'Anggota / Deputi Bidang Infrastruktur BP Batam',
    nip: '196507151992031002',
  },
  sasaranProgram: 'Meningkatnya Kualitas dan Kuantitas Infrastruktur Kawasan Strategis dan Berdaya Saing Global di Batam, Rempang, dan Galang',
  totalAnggaran: 'Rp 842.500.000.000,-',
  totalAnggaranRupiah: 842500000000,
  realisasiAnggaran: 'Rp 682.425.000.000,-',
  realisasiAnggaranRupiah: 682425000000,
  persenRealisasiAnggaran: 81.0,
  totalPnbpTarget: 'Rp 6.821.000.000,-',
  totalPnbpTargetRupiah: 6821000000,
  totalPnbpRealisasi: 'Rp 7.450.000.000,-',
  totalPnbpRealisasiRupiah: 7450000000,
  persenPnbpRealisasi: 109.22,
};

// ====================================================================
// 2. DUA POINT UTAMA INDIKATOR KINERJA PROGRAM (IKP) PERKIN A.7
// ====================================================================
export const PERKIN_A7_KPIS: PerkinA7KpiItem[] = [
  {
    id: 'ikp-1-pembangunan-infrastruktur',
    number: 1,
    code: 'IKP-1',
    name: 'Persentase Pembangunan Infrastruktur yang Selesai / Terlaksana Sesuai Rencana',
    fullName: 'Persentase Proyek Pembangunan Infrastruktur Fisik yang Terlaksana Tepat Mutu, Biaya, dan Waktu (Kurva S Normal & Ahead)',
    programTarget: 100.0,
    programTargetLabel: '100 %',
    realization: 92.4,
    realizationLabel: '92,40 %',
    achievement: 92.4,
    unit: '%',
    status: 'Sesuai Target',
    statusColor: 'emerald',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur & Direktorat Perencanaan Infrastruktur',
    datasetSumber: 'Dataset No. 4 (Laporan Progres Konstruksi) & Dataset No. 6 (Pembangunan Infrastruktur) Buku Satu Data Hal. 48-51',
    halamanPdf: 'Hal. 2-4 Perkin A.7 & Hal. 48-51 Buku Satu Data',
    formula: '(Jumlah Paket Proyek Berstatus Selesai / On Track (Deviasi ≥ -5%) / Total Paket Proyek Infrastruktur Berjalan) × 100%',
    tableauCalculation: 'SUM(IIF([Deviasi Fisik %] >= -5.0, 1, 0)) / COUNT([ID Proyek]) * 100',
    deskripsi: 'Indikator ini mengukur kinerja fisik pelaksanaan pembangunan infrastruktur strategis jalan, flyover, drainase utama perkotaan, dermaga pelabuhan, serta pematangan lahan kawasan industri (BSW) terhadap target rencana kerja tahun berjalan.',
    catatanKinerja: 'Dari 14 paket konstruksi strategis, 12 paket (85.7%) berjalan lancar (Ahead dan On Schedule), 1 paket waspada (-3.5%), dan 1 paket dalam penanganan Show Cause Meeting (SCM) percepatan di Dermaga Kargo Batu Ampar.',
    triwulanTrend: {
      q1: 88.5,
      q2: 90.8,
      q3: 92.4,
      q4: 95.0,
      targetQ: 100.0,
    },
  },
  {
    id: 'ikp-2-pnbp-infrastruktur',
    number: 2,
    code: 'IKP-2',
    name: 'Persentase Realisasi PNBP Sektor Infrastruktur',
    fullName: 'Persentase Realisasi Penerimaan Negara Bukan Pajak (PNBP) dari Pemanfaatan ROW Utilitas, ROW Penghijauan, dan Layanan Infrastruktur',
    programTarget: 100.0,
    programTargetLabel: '100 % (Rp 6,821 M)',
    realization: 109.22,
    realizationLabel: '109,22 % (Rp 7,450 M)',
    achievement: 109.22,
    unit: '%',
    status: 'Melampaui Target',
    statusColor: 'cyan',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur (Subdit ROW Utilitas & Penghijauan)',
    datasetSumber: 'Dataset No. 1 (Perizinan ROW Utilitas) & Dataset No. 2 (Perizinan ROW Penghijauan) Hal. 48-49 Satu Data',
    halamanPdf: 'Hal. 4 Perkin A.7 & Hal. 48-49 Buku Satu Data',
    formula: '(Realisasi Penerimaan PNBP Sektor Infrastruktur / Target Penerimaan DIPA Rp 6.821.000.000,-) × 100%',
    tableauCalculation: 'ZN(SUM([Realisasi Penerimaan PNBP])) / 6821000000 * 100',
    deskripsi: 'Indikator penerimaan negara bukan pajak yang dihasilkan dari retribusi perizinan penempatan kabel fiber optik/pipa utilitas di koridor ROW jalan dan pemanfaatan ruang terbuka hijau kawasan oleh pelaku usaha/BUMN/mitra industri.',
    catatanKinerja: 'Target penerimaan PNBP DIPA TA 2025 sebesar Rp 6,821 Miliar telah terlampaui dengan perolehan akumulatif Rp 7,450 Miliar (109,22%), didorong tingginya ekspansi kabel fiber optik telekomunikasi dan jaringan pipa gas industri Kabil-Batam Centre.',
    triwulanTrend: {
      q1: 28.4,
      q2: 61.2,
      q3: 84.5,
      q4: 109.22,
      targetQ: 100.0,
    },
  },
];

// ====================================================================
// 3. KURVA S AGREGAT KONSTRUKSI BULANAN (Jan - Des)
// ====================================================================
export const KURVA_S_INFRASTRUKTUR_BULANAN = [
  { bulan: 'Jan', targetFisik: 5.2, realisasiFisik: 5.8, keuangan: 5.0, status: 'Ahead' },
  { bulan: 'Feb', targetFisik: 12.8, realisasiFisik: 13.5, keuangan: 12.0, status: 'Ahead' },
  { bulan: 'Mar', targetFisik: 22.4, realisasiFisik: 24.1, keuangan: 20.5, status: 'Ahead' },
  { bulan: 'Apr', targetFisik: 33.5, realisasiFisik: 34.2, keuangan: 31.0, status: 'Ahead' },
  { bulan: 'Mei', targetFisik: 45.0, realisasiFisik: 44.8, keuangan: 40.2, status: 'On Track' },
  { bulan: 'Jun', targetFisik: 56.4, realisasiFisik: 55.1, keuangan: 51.5, status: 'On Track' },
  { bulan: 'Jul', targetFisik: 68.0, realisasiFisik: 67.2, keuangan: 62.0, status: 'On Track' },
  { bulan: 'Agt', targetFisik: 79.5, realisasiFisik: 78.8, keuangan: 73.4, status: 'On Track' },
  { bulan: 'Sep', targetFisik: 88.0, realisasiFisik: 86.5, keuangan: 81.0, status: 'On Track' },
  { bulan: 'Okt (T)', targetFisik: 94.2, realisasiFisik: null, keuangan: null, status: 'Target' },
  { bulan: 'Nov (T)', targetFisik: 98.0, realisasiFisik: null, keuangan: null, status: 'Target' },
  { bulan: 'Des (T)', targetFisik: 100.0, realisasiFisik: null, keuangan: null, status: 'Target' },
];

// ====================================================================
// 4. ALOKASI PAGU & REALISASI BELANJA PER SEKTOR INFRASTRUKTUR
// ====================================================================
export const SEKTOR_INFRASTRUKTUR_ALOKASI = [
  {
    kategori: 'Peningkatan Jalan & Jembatan',
    paguMiliar: 420.4,
    realisasiMiliar: 344.7,
    persen: 82.0,
    totalPaket: 6,
    icon: 'Route',
    keterangan: 'Pelebaran 5 lajur Sudirman, Flyover Sei Ladi, Koridor KEK Nongsa, dll',
  },
  {
    kategori: 'Pematangan Kawasan BSW Rempang',
    paguMiliar: 185.0,
    realisasiMiliar: 148.0,
    persen: 80.0,
    totalPaket: 5,
    icon: 'Mountain',
    keterangan: 'Cut & Fill 280 Ha di Rempang Eco-City, Kabil, Sekupang, Tg Sengkuang',
  },
  {
    kategori: 'Drainase & Pengendalian Banjir',
    paguMiliar: 98.5,
    realisasiMiliar: 83.7,
    persen: 85.0,
    totalPaket: 3,
    icon: 'Droplets',
    keterangan: 'Kolam Retensi Baloi Indah, Saluran U-Ditch Batam Centre',
  },
  {
    kategori: 'Dermaga & Pelabuhan Logistik',
    paguMiliar: 75.0,
    realisasiMiliar: 52.5,
    persen: 70.0,
    totalPaket: 2,
    icon: 'Ship',
    keterangan: 'Revitalisasi Dermaga Utara Kargo Batu Ampar Tahap 2',
  },
  {
    kategori: 'Perencanaan & Kajian DED 6 Sektor',
    paguMiliar: 63.6,
    realisasiMiliar: 53.5,
    persen: 84.1,
    totalPaket: 43,
    icon: 'Compass',
    keterangan: 'Detail Engineering Design Gedung, Utilitas, Wisata, Pertanaman, Laut/Udara',
  },
];

// ====================================================================
// 5. KEMANTAPAN RUAS JARINGAN JALAN BP BATAM (Dataset 3 Satu Data Hal. 49)
// ====================================================================
export const KEMANTAPAN_JALAN_DATA = {
  totalPanjangKm: 542.8,
  ruasMantapKm: 496.1,
  persenMantap: 91.4,
  ruasRusakRinganKm: 32.5,
  persenRusakRingan: 6.0,
  ruasRusakBeratKm: 14.2,
  persenRusakBerat: 2.6,
  distribusiHierarki: [
    { nama: 'Arteri Primer', panjangKm: 184.5, mantapKm: 175.2, persen: 95.0, lajur: '4 - 10 Lajur' },
    { nama: 'Kolektor Primer', panjangKm: 198.2, mantapKm: 182.3, persen: 92.0, lajur: '2 - 4 Lajur' },
    { nama: 'Lokal Primer', panjangKm: 112.4, mantapKm: 98.4, persen: 87.5, lajur: '2 Lajur' },
    { nama: 'Akses Kawasan Khusus (Pelabuhan/Bandara/KEK)', panjangKm: 47.7, mantapKm: 40.2, persen: 84.3, lajur: '4 Lajur' },
  ],
};

// ====================================================================
// 6. REKAPITULASI PNBP ROW UTILITAS & PENGHIJAUAN (Dataset 1 & 2 Satu Data)
// ====================================================================
export const PNBP_INFRASTRUKTUR_DETAIL = {
  targetDipaTotalRupiah: 6821000000,
  realisasiTotalRupiah: 7450000000,
  persenTotal: 109.22,
  komponen: [
    {
      sumber: 'Izin Pemanfaatan ROW Utilitas',
      kodeDataset: 'Dataset No. 1',
      targetRupiah: 4400000000,
      realisasiRupiah: 4850000000,
      persen: 110.23,
      volume: '482 Km Jaringan Kabel FO / Pipa Gas & Air',
      skTerbit: 148,
      slaHari: '3.2 Hari (Target 5 Hari)',
      mitraUtama: 'Telkomsel, PLN Batam, PGN, Air Batam Hilir, Indosat',
    },
    {
      sumber: 'Izin Pemanfaatan ROW Penghijauan',
      kodeDataset: 'Dataset No. 2',
      targetRupiah: 1521000000,
      realisasiRupiah: 1620000000,
      persen: 106.51,
      volume: '84 Lokasi RTH / Koridor Taman Median Jalan',
      skTerbit: 52,
      slaHari: '2.8 Hari (Target 5 Hari)',
      mitraUtama: 'Batamindo, Panbil Group, Nongsa Digital Park, Citra Buana',
    },
    {
      sumber: 'Retribusi Sewa Fasilitas Penunjang Infrastruktur',
      kodeDataset: 'Dataset Retribusi',
      targetRupiah: 900000000,
      realisasiRupiah: 980000000,
      persen: 108.89,
      volume: '34 Lokasi Tapak Reklame / JPO / Tower Penunjang',
      skTerbit: 34,
      slaHari: '2.1 Hari (Target 3 Hari)',
      mitraUtama: 'Pengembang Kawasan & Asosiasi Pengiklan Batam',
    },
  ],
};

// ====================================================================
// 7. TIGA UNIT KERJA PENGAMPU PERKIN A.7 (INFRASTRUKTUR)
// ====================================================================
export const INFRASTRUKTUR_3_UNITS = [
  {
    id: 'dit-perencanaan-infrastruktur',
    code: 'DPRINF',
    name: 'Direktorat Perencanaan Infrastruktur',
    shortName: 'Perencanaan Infrastruktur',
    roleInPerkin: 'Pengampu Perencanaan Teknis & Detail Engineering Design (DED)',
    pilarUtama: 'Pilar 1: Desain, DED & Readiness Criteria Proyek',
    headOfUnit: 'Direktur Perencanaan Infrastruktur',
    paguAnggaran: 'Rp 63.680.000.000,-',
    paguAnggaranRupiah: 63680000000,
    realisasiAnggaran: 'Rp 53.550.000.000,-',
    persenRealisasi: 84.1,
    datasetCount: 6,
    kpiRingkasan: [
      { label: 'Total Paket DED', value: '43 Paket' },
      { label: 'Total Pagu DED', value: 'Rp 53,68 M' },
      { label: 'Sektor Perencanaan', value: '6 Sektor Terpadu' },
      { label: 'Rata-rata Durasi DED', value: '5,5 Bulan' },
    ],
    statusPilar: 'Optimal (On Track)',
    statusColor: 'emerald',
    deskripsi: 'Menyusun Detail Engineering Design (DED) 6 sektor: Gedung, Utilitas & Drainase, Fasilitas Wisata, Pertanaman/RTH, Darat, serta Laut & Udara, memastikan seluruh readiness criteria tender fisik terpenuhi 100%.',
    datasetList: [
      'Dataset 1: DED Infrastruktur Gedung (7 Paket)',
      'Dataset 2: DED Utilitas dan Drainase (9 Paket)',
      'Dataset 3: DED Fasilitas Wisata & Lingkungan (8 Paket)',
      'Dataset 4: DED Pertanaman & Penghijauan (6 Paket)',
      'Dataset 5: DED Infrastruktur Darat (7 Paket)',
      'Dataset 6: DED Infrastruktur Laut & Udara (6 Paket)',
    ],
  },
  {
    id: 'dit-pembangunan-infrastruktur',
    code: 'DPINF',
    name: 'Direktorat Pembangunan Infrastruktur',
    shortName: 'Pembangunan Infrastruktur',
    roleInPerkin: 'Pengampu Eksekusi Konstruksi Fisik & Penghasil Utama PNBP ROW',
    pilarUtama: 'Pilar 2: Pelaksanaan Fisik & Pengendalian Konstruksi',
    headOfUnit: 'Direktur Pembangunan Infrastruktur',
    paguAnggaran: 'Rp 742.820.000.000,-',
    paguAnggaranRupiah: 742820000000,
    realisasiAnggaran: 'Rp 602.875.000.000,-',
    persenRealisasi: 81.2,
    datasetCount: 6,
    kpiRingkasan: [
      { label: 'Paket Proyek Berjalan', value: '14 Paket Strategis' },
      { label: 'Realisasi Fisik Rata-rata', value: '71,3 %' },
      { label: 'PNBP ROW Utilitas/RTH', value: 'Rp 7,45 M (109,2%)' },
      { label: 'Pematangan Lahan BSW', value: '280 Ha (4,27 Juta m³)' },
    ],
    statusPilar: 'Tinggi (Ahead/On Track)',
    statusColor: 'sky',
    deskripsi: 'Melaksanakan pembangunan fisik jalan utama, jembatan, flyover, saluran drainase perkotaan, dermaga kargo, izin pemanfaatan ROW utilitas/penghijauan, serta kurva S pekerjaan konstruksi strategis.',
    datasetList: [
      'Dataset 1: Perizinan Pemanfaatan ROW Utilitas',
      'Dataset 2: Perizinan Pemanfaatan ROW Penghijauan',
      'Dataset 3: Ruas Jaringan Jalan BP Batam (542,8 Km)',
      'Dataset 4: Laporan Progres Pekerjaan Konstruksi Berjalan',
      'Dataset 5: Pematangan Tanah Cut & Fill BSW (280 Ha)',
      'Dataset 6: Pembangunan Infrastruktur Paket JNS_PEK',
    ],
  },
  {
    id: 'dit-pam-aset',
    code: 'DPAMP',
    name: 'Direktorat Pengamanan Aset dan Kawasan',
    shortName: 'Pengamanan Aset & Kawasan',
    roleInPerkin: 'Pengampu Pengamanan Ruang ROW, Kawasan Hutan & Obvitnas',
    pilarUtama: 'Pilar 3: Pengamanan Aset, Penertiban ROW & Objek Vital',
    headOfUnit: 'Direktur Pengamanan Aset dan Kawasan',
    paguAnggaran: 'Rp 36.000.000.000,-',
    paguAnggaranRupiah: 36000000000,
    realisasiAnggaran: 'Rp 26.000.000.000,-',
    persenRealisasi: 72.2,
    datasetCount: 12,
    kpiRingkasan: [
      { label: 'Penertiban Bangunan Liar', value: '1.030 Unit' },
      { label: 'Kekuatan Personel Ditpam', value: '524 Personel' },
      { label: 'Giat Pengamanan Obvitnas', value: '48 Kawasan' },
      { label: 'Penindakan Hutan Lindung', value: '142 Hektar' },
    ],
    statusPilar: 'Siaga (Terkendali)',
    statusColor: 'amber',
    deskripsi: 'Mensterilkan koridor ROW jalan dari bangunan liar (bangli), patroli terpadu objek vital nasional BP Batam, mitigasi kebakaran hutan lahan, pengamanan unjuk rasa, serta penegakan ketertiban kawasan.',
    datasetList: [
      'Dataset 1: Penerbitan Bangunan Liar Ditpam (1.030 Entri)',
      'Dataset 2: Kekuatan Personil Ditpam (524 Personel)',
      'Dataset 3: Pengamanan Objek Vital Nasional (48 Titik)',
      'Dataset 4: Penindakan Kawasan Hutan & Sempadan (142 Ha)',
      'Dataset 5: Penanganan Bencana Alam & Pemadam Kebakaran',
      'Dataset 6: Rekapitulasi Pengamanan Unjuk Rasa & Eskalasi',
    ],
  },
];
