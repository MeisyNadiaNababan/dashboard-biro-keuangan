import {
  SakipComponent,
  SpipMaturitasItem,
  PengaduanBadanUsaha,
  SkmHasilSurvey,
  PenyelesaianBluItem,
  ModernisasiBluItem,
  PiagamRisikoItem,
  PekpppItem,
  BokmrFilterState,
} from './types';

// 1. KPI UTAMA SUMMARY
export const BOKMR_SUMMARY = {
  indeksReformasiKebijakan: {
    nilai: 84.75,
    skala: 100,
    kategori: 'A (Sangat Baik)',
    statusDataset: 'Belum Ada di Satu Data (Estimasi Internal BOKMR)',
    catatan: 'Indikator Kebijakan Publik & Kualitas Regulasi Perka/Kepka',
  },
  indeksMaturitasSpip: {
    nilai: 3.42,
    skala: 5.0,
    kategori: 'Level 3 - Terdefinisi (Matur)',
    datasetNo: 'Dataset #17',
    target: 3.20,
    deviasi: '+0.22',
  },
  indeksKepuasanMasyarakat: {
    nilai: 88.62,
    konversi4: 3.54,
    kategori: 'Mutu A (Sangat Baik)',
    datasetNo: 'Dataset #10 & #11',
    totalResponden: 4850,
    surveiEntries: 1325, // Sesuai file PDF screenshot hasil-skm
  },
  nilaiSakip: {
    nilai: 82.68,
    skala: 100,
    tingkatAkuntabilitas: 'A (Memuaskan)',
    datasetNo: 'Dataset #2',
    predikat: 'Sangat Akuntabel',
    tahunEvaluasi: '2025/2026',
  },
  indeksPelayananPublik: {
    nilai: 4.38,
    skala: 5.0,
    target: 4.0,
    capaianPersen: 109.5,
    kategori: 'A (Pelayanan Prima)',
    datasetNo: 'Dataset #15 & #16 (PEKPPP)',
  },
  indeksManajemenRisiko: {
    nilai: 3.65,
    skala: 5.0,
    target: 3.25,
    kategori: 'Tingkat 3 (Managed / Terkelola)',
    datasetNo: 'Dataset #18',
    persentaseMitigasi: 94.2,
  },
  pengaduanMasyarakat: {
    totalDiterima: 468,
    totalDiproses: 18,
    totalSelesai: 450,
    persentaseSelesai: 96.15,
    datasetNo: 'Dataset #10 (Monitoring Pengaduan BU)',
    waktuRataRata: '1.4 Hari Kerja',
  },
};

// 2. DATASET NO. 2: NILAI SAKIP (KOMPONEN, BOBOT, NILAI, TINGKAT AKUNTABILITAS)
export const SAKIP_COMPONENTS_DATA: SakipComponent[] = [
  {
    id: 'perencanaan_kinerja',
    komponen: 'Perencanaan Kinerja',
    bobot: 30.0,
    nilai: 25.10,
    capaianPersen: 83.67,
    tingkatAkuntabilitas: 'A',
    keterangan: 'Kualitas Renstra, RKT/PK, cascading sasaran strategis hingga eselon/individu, target indikator SMART.',
    subKomponen: [
      { nama: 'Rencana Strategis (Renstra 5 Tahun)', bobot: 10.0, nilai: 8.50 },
      { nama: 'Rencana Kinerja Tahunan (RKT)', bobot: 10.0, nilai: 8.35 },
      { nama: 'Perjanjian Kinerja (PK) & Cascading', bobot: 10.0, nilai: 8.25 },
    ],
  },
  {
    id: 'pengukuran_kinerja',
    komponen: 'Pengukuran Kinerja',
    bobot: 30.0,
    nilai: 24.60,
    capaianPersen: 82.00,
    tingkatAkuntabilitas: 'A',
    keterangan: 'Pemenuhan indikator IKU, sistem otomasi pengukuran berbasis e-Kinerja, validitas berkala data capaian.',
    subKomponen: [
      { nama: 'Kualitas Indikator Kinerja Utama (IKU)', bobot: 12.0, nilai: 9.90 },
      { nama: 'Pengukuran Berkala (Triwulanan)', bobot: 10.0, nilai: 8.20 },
      { nama: 'Pemanfaatan Data Kinerja Digital', bobot: 8.0, nilai: 6.50 },
    ],
  },
  {
    id: 'pelaporan_kinerja',
    komponen: 'Pelaporan Kinerja',
    bobot: 15.0,
    nilai: 12.75,
    capaianPersen: 85.00,
    tingkatAkuntabilitas: 'A',
    keterangan: 'Penyusunan Laporan Kinerja Instansi Pemerintah (LKjIP), analisis efisiensi sumber daya dan keberhasilan.',
    subKomponen: [
      { nama: 'Kualitas Dokumen LAKIP/LKjIP', bobot: 7.5, nilai: 6.45 },
      { nama: 'Ketepatan Waktu Penyampaian', bobot: 4.5, nilai: 3.90 },
      { nama: 'Transparansi Publikasi Publik', bobot: 3.0, nilai: 2.40 },
    ],
  },
  {
    id: 'evaluasi_akuntabilitas',
    komponen: 'Evaluasi Akuntabilitas Kinerja',
    bobot: 25.0,
    nilai: 20.23,
    capaianPersen: 80.92,
    tingkatAkuntabilitas: 'A',
    keterangan: 'Evaluasi internal akuntabilitas oleh SPI/BOKMR, pemantauan kemajuan rekomendasi MenPAN-RB/BPK.',
    subKomponen: [
      { nama: 'Evaluasi Kinerja Internal SPI/BOKMR', bobot: 10.0, nilai: 8.15 },
      { nama: 'Tindak Lanjut Rekomendasi Evaluasi', bobot: 10.0, nilai: 8.05 },
      { nama: 'Pemanfaatan Hasil Evaluasi Kebijakan', bobot: 5.0, nilai: 4.03 },
    ],
  },
];

// TOTAL NILAI SAKIP: 25.10 + 24.60 + 12.75 + 20.23 = 82.68 (Predikat A / Memuaskan)
export const TOTAL_BOBOT_SAKIP = 100.0;
export const TOTAL_NILAI_SAKIP = 82.68;
export const PREDIKAT_SAKIP = 'A (Memuaskan)';

// 3. DATASET NO. 17: DATA PENILAIAN MATURITAS SPIP
export const SPIP_MATURITAS_ITEMS: SpipMaturitasItem[] = [
  {
    no: 1,
    komponenPenilaian: 'Lingkungan Pengendalian',
    bobot: 30.0,
    skor: 3.48,
    targetSkor: 3.20,
    levelMaturitas: 'Level 3 (Terdefinisi)',
    periodePenilaian: 'Tahun 2025/2026',
    fokusArea: 'Penegakan integritas, kode etik pegawai, komitmen kompetensi, dan struktur organisasi akuntabel.',
  },
  {
    no: 2,
    komponenPenilaian: 'Penilaian Risiko',
    bobot: 20.0,
    skor: 3.35,
    targetSkor: 3.20,
    levelMaturitas: 'Level 3 (Terdefinisi)',
    periodePenilaian: 'Tahun 2025/2026',
    fokusArea: 'Identifikasi risiko strategis & operasional unit kerja, piagam risiko, analisis mitigasi risiko korupsi.',
  },
  {
    no: 3,
    komponenPenilaian: 'Kegiatan Pengendalian',
    bobot: 25.0,
    skor: 3.44,
    targetSkor: 3.20,
    levelMaturitas: 'Level 3 (Terdefinisi)',
    periodePenilaian: 'Tahun 2025/2026',
    fokusArea: 'Review kinerja pimpinan, pengendalian sistem informasi, pemisahan fungsi tugas, dan verifikasi otorisasi.',
  },
  {
    no: 4,
    komponenPenilaian: 'Informasi dan Komunikasi',
    bobot: 10.0,
    skor: 3.38,
    targetSkor: 3.20,
    levelMaturitas: 'Level 3 (Terdefinisi)',
    periodePenilaian: 'Tahun 2025/2026',
    fokusArea: 'Ketersediaan saluran komunikasi whistleblowing, keterbukaan informasi publik, koordinasi lintas biro.',
  },
  {
    no: 5,
    komponenPenilaian: 'Pemantauan Pengendalian Intern',
    bobot: 15.0,
    skor: 3.46,
    targetSkor: 3.20,
    levelMaturitas: 'Level 3 (Terdefinisi)',
    periodePenilaian: 'Tahun 2025/2026',
    fokusArea: 'Pemantauan berkelanjutan, evaluasi terpisah oleh Satuan Pengawas Intern (SPI), tindak lanjut audit BPK.',
  },
];

// Rata-rata Terbobot SPIP: 3.42 (Level 3 - Terdefinisi)
export const SKOR_AGREGAT_SPIP = 3.42;

// 4. DATASET NO. 10: PENGELOLAAN PENGADUAN MASYARAKAT TERHADAP LAYANAN BADAN USAHA
export const PENGADUAN_BADAN_USAHA_DATA: PengaduanBadanUsaha[] = [
  {
    id: 'bu_rsbp',
    periode: 'Triwulan I - IV',
    tahun: '2026',
    unitPelayanan: 'Badan Usaha Rumah Sakit BP Batam',
    kodeUnit: 'BURSBP',
    jmlPengaduanDiterima: 142,
    jmlPengaduanDiproses: 4,
    jmlPengaduanSelesai: 138,
    persentaseSelesai: 97.18,
    kanalUtama: 'SP4N LAPOR!, Loket Pengaduan RSBP, WhatsApp Hotline',
    waktuRataRataPenyelesaian: '1.2 Hari',
    topIsu: 'Waktu tunggu farmasi & jadwal dokter poli spesialis',
  },
  {
    id: 'bu_pelabuhan',
    periode: 'Triwulan I - IV',
    tahun: '2026',
    unitPelayanan: 'Badan Usaha Pelabuhan Batam',
    kodeUnit: 'BUP',
    jmlPengaduanDiterima: 126,
    jmlPengaduanDiproses: 5,
    jmlPengaduanSelesai: 121,
    persentaseSelesai: 96.03,
    kanalUtama: 'Portal BUP, Email Pengaduan, Kios Terminal Penumpang',
    waktuRataRataPenyelesaian: '1.5 Hari',
    topIsu: 'Kelancaran gate autogate & antrean dermaga ponton Sekupang',
  },
  {
    id: 'bu_bandara',
    periode: 'Triwulan I - IV',
    tahun: '2026',
    unitPelayanan: 'Badan Usaha Bandar Udara Hang Nadim',
    kodeUnit: 'BUBU',
    jmlPengaduanDiterima: 98,
    jmlPengaduanDiproses: 4,
    jmlPengaduanSelesai: 94,
    persentaseSelesai: 95.92,
    kanalUtama: 'Customer Care Hang Nadim, SP4N LAPOR!, Meja Informasi T1',
    waktuRataRataPenyelesaian: '1.1 Hari',
    topIsu: 'Kenyamanan pendingin ruang tunggu & troli bagasi',
  },
  {
    id: 'bu_fasling_spam',
    periode: 'Triwulan I - IV',
    tahun: '2026',
    unitPelayanan: 'Badan Usaha Fasilitas dan Lingkungan / SPAM',
    kodeUnit: 'BUFASLING',
    jmlPengaduanDiterima: 74,
    jmlPengaduanDiproses: 4,
    jmlPengaduanSelesai: 70,
    persentaseSelesai: 94.59,
    kanalUtama: 'Call Center SPAM, Media Sosial Resmi, Aplikasi Mobile',
    waktuRataRataPenyelesaian: '1.8 Hari',
    topIsu: 'Tekanan aliran air pipa distribusi & perbaikan kebocoran',
  },
  {
    id: 'ptsp_layanan',
    periode: 'Triwulan I - IV',
    tahun: '2026',
    unitPelayanan: 'Pelayanan Terpadu Satu Pintu (PTSP / MPP)',
    kodeUnit: 'PTSP',
    jmlPengaduanDiterima: 28,
    jmlPengaduanDiproses: 1,
    jmlPengaduanSelesai: 27,
    persentaseSelesai: 96.43,
    kanalUtama: 'Helpdesk MPP Batam Centre, Online Chat IBOSS',
    waktuRataRataPenyelesaian: '0.8 Hari',
    topIsu: 'Panduan upload dokumen verifikasi izin berusaha OSS',
  },
];

// 5. DATASET NO. 11 & REF PDF HASIL-SKM: REKAP SURVEI KEPUASAN MASYARAKAT
export const SKM_KATEGORI_DATA: SkmHasilSurvey[] = [
  {
    id: 1,
    tahun: '2026',
    unitUsaha: 'Direktorat Pelayanan Lalu Lintas Barang & Penanaman Modal',
    kategori: 'Indeks Unsur Sistem, Mekanisme Dan Prosedur',
    nilai: 3.57,
    persentase: 89.25,
    keterangan: 'Kemudahan alur birokrasi, transparansi persyaratan online',
  },
  {
    id: 2,
    tahun: '2026',
    unitUsaha: 'Direktorat Pelayanan Lalu Lintas Barang & Penanaman Modal',
    kategori: 'Indeks Unsur Pelayanan Waktu Penyelesaian',
    nilai: 3.46,
    persentase: 86.50,
    keterangan: 'Kesesuaian SLA penerbitan dokumen izin impor/ekspor',
  },
  {
    id: 3,
    tahun: '2026',
    unitUsaha: 'Direktorat Pelayanan Lalu Lintas Barang & Penanaman Modal',
    kategori: 'Biaya/Tarif Layanan',
    nilai: 3.72,
    persentase: 93.00,
    keterangan: 'Kepastian tarif PNBP resmi sesuai PP/Perka tanpa pungli',
  },
  {
    id: 4,
    tahun: '2026',
    unitUsaha: 'Direktorat Pelayanan Lalu Lintas Barang & Penanaman Modal',
    kategori: 'Indeks Pelayanan Produk, Spesifikasi Dan Jenis Layanan',
    nilai: 3.54,
    persentase: 88.50,
    keterangan: 'Kejelasan output izin, legalitas tanda tangan digital QR code',
  },
  {
    id: 5,
    tahun: '2026',
    unitUsaha: 'Badan Usaha Rumah Sakit BP Batam',
    kategori: 'Indeks Kepuasan Responden Saranan Dan Prasarana',
    nilai: 3.52,
    persentase: 88.00,
    keterangan: 'Kebersihan kamar rawat inap, kenyamanan ruang tunggu & parkir',
  },
  {
    id: 6,
    tahun: '2026',
    unitUsaha: 'Badan Usaha Rumah Sakit BP Batam',
    kategori: 'Indeks Kepuasan Layanan & Medis',
    nilai: 3.56,
    persentase: 89.00,
    keterangan: 'Keramahan perawat, kejelasan edukasi dokter spesialis',
  },
];

// 6. DATASET NO. 6: PERSENTASE PENYELESAIAN REKOMENDASI MONITORING & EVALUASI
// (PENGELOLA BLU, DEWAN PENGAWAS BLU, KOMITE AUDIT BLU, SPI BLU)
export const PENYELESAIAN_REKOMENDASI_BLU: PenyelesaianBluItem[] = [
  {
    id: 'pengelola_blu',
    entitasPengawas: 'Penyelesaian Pengelola BLU',
    datasetNo: 'Dataset #6',
    rekomendasiTotal: 125,
    rekomendasiSelesai: 118,
    rekomendasiProses: 7,
    persentasePenyelesaian: 94.40,
    kategori: 'Pengelolaan Operasional & Pagu DIPA BLU',
    color: '#0284c7', // Sky-600
  },
  {
    id: 'dewan_pengawas',
    entitasPengawas: 'Penyelesaian Dewan Pengawas BLU',
    datasetNo: 'Dataset #6',
    rekomendasiTotal: 86,
    rekomendasiSelesai: 83,
    rekomendasiProses: 3,
    persentasePenyelesaian: 96.51,
    kategori: 'Tata Kelola Pengawasan Triwulanan Dewas',
    color: '#10b981', // Emerald-500
  },
  {
    id: 'komite_audit',
    entitasPengawas: 'Penyelesaian Komite Audit BLU',
    datasetNo: 'Dataset #6',
    rekomendasiTotal: 64,
    rekomendasiSelesai: 59,
    rekomendasiProses: 5,
    persentasePenyelesaian: 92.19,
    kategori: 'Audit Kepatuhan Keuangan & Pengendalian Fraud',
    color: '#f59e0b', // Amber-500
  },
  {
    id: 'spi_blu',
    entitasPengawas: 'Penyelesaian Satuan Pengawas Intern (SPI) BLU',
    datasetNo: 'Dataset #6',
    rekomendasiTotal: 192,
    rekomendasiSelesai: 188,
    rekomendasiProses: 4,
    persentasePenyelesaian: 97.92,
    kategori: 'Tindak Lanjut Rekomendasi Audit Internal',
    color: '#6366f1', // Indigo-500
  },
];

// 7. DATASET NO. 7: PERSENTASE PENYELESAIAN MODERNISASI PENGELOLAAN BLU
export const MODERNISASI_BLU_DATA: ModernisasiBluItem[] = [
  {
    id: 'mod_1',
    semester: 'Semester I',
    tahun: '2026',
    inisiatif: 'Integrasi Sistem Informasi Keuangan BLU dengan BIOS Kemenkeu',
    target: 100,
    capaian: 98.5,
    persentase: 98.5,
    status: 'Tuntas',
    detail: 'Pengiriman data realtime transaksi kas dan piutang ke Kemenkeu',
  },
  {
    id: 'mod_2',
    semester: 'Semester I',
    tahun: '2026',
    inisiatif: 'Digitalisasi Tarif Layanan & Billing Terpadu Single Cash Hub',
    target: 100,
    capaian: 95.0,
    persentase: 95.0,
    status: 'Sesuai Target',
    detail: 'Implementasi e-billing QRIS/Virtual Account terintegrasi bank persepsi',
  },
  {
    id: 'mod_3',
    semester: 'Semester II',
    tahun: '2026',
    inisiatif: 'Otomasi Pengawasan Kepatuhan SOP & Risk Dashboard Unit Kerja',
    target: 100,
    capaian: 91.2,
    persentase: 91.2,
    status: 'Sesuai Target',
    detail: 'Early warning system kepatuhan regulasi dan deviasi target IKU',
  },
  {
    id: 'mod_4',
    semester: 'Semester II',
    tahun: '2026',
    inisiatif: 'Standarisasi Tata Kelola Remunerasi Berbasis Indeks Kinerja',
    target: 100,
    capaian: 88.0,
    persentase: 88.0,
    status: 'Dalam Perbaikan',
    detail: 'Penyelarasan formula capaian IKK eselon terhadap poin remunerasi',
  },
];

// 8. DATASET NO. 14: PIAGAM RISIKO UNIT KERJA (PETA PANAS & MITIGASI AWAL VS AKHIR TAHUN)
export const PIAGAM_RISIKO_DATA: PiagamRisikoItem[] = [
  {
    nomorPiagam: 'PR/BUP/2026/001',
    unitKerja: 'Badan Usaha Pelabuhan',
    sasaranOrganisasi: 'Kelancaran Arus Logistik Petikemas Batu Ampar',
    kejadianRisiko: 'Downtime Crane STS & Kongesti Lapangan Penumpukan',
    besaranRisikoAwalTahun: 20, // Sangat Tinggi (5x4)
    besaranRisikoAkhirTahun: 8,  // Rendah-Sedang (2x4)
    levelAwal: 'Sangat Tinggi',
    levelAkhir: 'Sedang',
    mitigasiUtama: 'Preventive maintenance berkala STS, rekayasa layout CY, dan integrasi B-TOS digital.',
    statusMitigasi: 'Efektif',
  },
  {
    nomorPiagam: 'PR/BUBU/2026/002',
    unitKerja: 'Badan Usaha Bandar Udara',
    sasaranOrganisasi: 'Keselamatan Operasional Runway 04/22 Hang Nadim',
    kejadianRisiko: 'Foreign Object Debris (FOD) & Genangan saat Cuaca Ekstrem',
    besaranRisikoAwalTahun: 16, // Tinggi (4x4)
    besaranRisikoAkhirTahun: 6,  // Rendah (2x3)
    levelAwal: 'Tinggi',
    levelAkhir: 'Rendah',
    mitigasiUtama: 'Sweeper otomatis runway harian, normalisasi box culvert drainase sisi udara.',
    statusMitigasi: 'Efektif',
  },
  {
    nomorPiagam: 'PR/BURSBP/2026/003',
    unitKerja: 'Badan Usaha Rumah Sakit BP Batam',
    sasaranOrganisasi: 'Ketersediaan Logistik Obat Esensial & Reagen KEK',
    kejadianRisiko: 'Keterlambatan Rantai Pasok Obat Impor Farmasi',
    besaranRisikoAwalTahun: 15, // Tinggi (3x5)
    besaranRisikoAkhirTahun: 9,  // Sedang (3x3)
    levelAwal: 'Tinggi',
    levelAkhir: 'Sedang',
    mitigasiUtama: 'Buffer stock 3 bulan, e-katalog farmasi multi-distributor, fast-track impor KEK Kesehatan.',
    statusMitigasi: 'Terkendali',
  },
  {
    nomorPiagam: 'PR/PTSP/2026/004',
    unitKerja: 'Pusat Pelayanan Terpadu Satu Pintu',
    sasaranOrganisasi: 'Ketepatan SLA Penerbitan Izin Berusaha OSS',
    kejadianRisiko: 'Gangguan Interkoneksi Server Pusat OSS RBA & IBOSS',
    besaranRisikoAwalTahun: 18, // Sangat Tinggi (4x4.5)
    besaranRisikoAkhirTahun: 7,  // Rendah (2x3.5)
    levelAwal: 'Sangat Tinggi',
    levelAkhir: 'Rendah',
    mitigasiUtama: 'Redundant leased line 1 Gbps, offline queue caching, SLA eskalasi teknis Keminvest.',
    statusMitigasi: 'Efektif',
  },
  {
    nomorPiagam: 'PR/BUFAS/2026/005',
    unitKerja: 'Badan Usaha Fasilitas & Lingkungan (SPAM)',
    sasaranOrganisasi: 'Kontinuitas Suplai Air Bersih Waduk Duriangkang',
    kejadianRisiko: 'Pipa Transmisi Utama Pecah & Penurunan Level Air Waduk',
    besaranRisikoAwalTahun: 22, // Sangat Tinggi (4.5x5)
    besaranRisikoAkhirTahun: 10, // Sedang (2.5x4)
    levelAwal: 'Sangat Tinggi',
    levelAkhir: 'Sedang',
    mitigasiUtama: 'Pemasangan pressure relief valve, revitalisasi instalasi WTP, pengawasan sedimentasi waduk.',
    statusMitigasi: 'Terkendali',
  },
];

// 9. DATASET NO. 16: PEMANTAUAN DAN EVALUASI KINERJA PENYELENGGARAAN PELAYANAN PUBLIK (PEKPPP)
export const PEKPPP_DATA: PekpppItem[] = [
  {
    id: 'pek_ptsp',
    tahun: '2026',
    unitKerja: 'Mal Pelayanan Publik (PTSP BP Batam)',
    capaianIndeks: 4.62,
    kategori: 'A (Pelayanan Prima)',
    predikat: 'Sangat Memuaskan',
  },
  {
    id: 'pek_rsbp',
    tahun: '2026',
    unitKerja: 'RSBP Batam (Poliklinik & IGD)',
    capaianIndeks: 4.45,
    kategori: 'A- (Sangat Baik)',
    predikat: 'Memuaskan',
  },
  {
    id: 'pek_bup',
    tahun: '2026',
    unitKerja: 'Terminal Penumpang Pelabuhan Batam',
    capaianIndeks: 4.28,
    kategori: 'A- (Sangat Baik)',
    predikat: 'Memuaskan',
  },
  {
    id: 'pek_bubu',
    tahun: '2026',
    unitKerja: 'Terminal Penumpang Bandara Hang Nadim',
    capaianIndeks: 4.35,
    kategori: 'A- (Sangat Baik)',
    predikat: 'Memuaskan',
  },
];

// 10. DATASET NO. 1: DAFTAR PROSES BISNIS DAN SOP DI BP BATAM
export const SOP_BOKMR_SUMMARY = {
  totalSopTerdaftar: 512,
  sopTerverifikasiAktif: 486,
  sopProsesRevisi: 26,
  persentaseKepatuhanSop: 94.92,
  petaProsesBisnisLevel: 'Level 0 s.d Level 3 (Terstandarisasi SPBE)',
};

// 11. DEFAULT FILTER STATE
export const DEFAULT_BOKMR_FILTERS: BokmrFilterState = {
  tahun: '2026',
  klaster: 'Semua',
  unitKerja: 'Semua',
  kategoriAkuntabilitas: 'Semua',
  statusPengaduan: 'Semua',
  searchQuery: '',
};

