// Data source for Pusat Perencanaan Program Strategis (P3S)
// Sesuai Dokumen Standarisasi Atribut Satu Data BP Batam (Halaman 51 - 53: 19 Dataset)

export interface PusrenMasterplanItem {
  id: string;
  kode: string;
  nama: string;
  tahunAnggaran: string;
  kategori: string;
  babRujukan: string;
  detail: string;
  rincian: string;
  progresPersen: number;
  status: 'Selesai Ditetapkan' | 'Revisi & Legalisasi' | 'Tahap Penyusunan';
  anggaran: number;
  unitTerkait: string[];
}

export interface PusrenRenstraTarget {
  tahun: string;
  program: string;
  sasaranProgram: string;
  indikatorKinerja: string;
  satuan: string;
  target: number;
  realisasi: number;
  kroRo: string;
  alokasiDana: number;
  unitPelaksana: string;
}

export interface PusrenMonevPaket {
  triwulan: string;
  tahun: string;
  kodeMa: string;
  kegiatanOutput: string;
  paguDipa: number;
  realisasi: number;
  progresPaket: number;
  sisaPagu: number;
  status: 'On-Track' | 'Atensi' | 'Selesai';
}

export interface PusrenRoadMasterplan {
  klasifikasiJalan: string;
  wilayah: string;
  subWilayah: string;
  panjangKm: number;
  lebarMeter: number;
  statusKonstruksi: string;
}

export interface PusrenDokumenKajian {
  namaKegiatan: string;
  lokasi: string;
  tahun: string;
  sumberDana: string;
  progres: number;
  status: string;
}

// 1. Data 5 Masterplan Utama (Dataset #6, #7, #10, #11, #12)
export const PUSREN_MASTERPLANS: PusrenMasterplanItem[] = [
  {
    id: 'mp-drainase',
    kode: 'MP-DRN-2025',
    nama: 'Masterplan Sistem Drainase & Pengendalian Banjir Kota Batam',
    tahunAnggaran: '2024-2025',
    kategori: 'Infrastruktur Sumber Daya Air',
    babRujukan: 'Bab IV: Rencana Induk Drainase Primer, Sekunder & Retensi',
    detail: 'Pengembangan 7 catchment area utama, 18 kolam retensi, dan normalisasi 42 saluran primer di Batam Center, Batu Ampar, dan Sei Beduk.',
    rincian: 'DED 7 titik kritis selesai, integrasi sensor elevasi air real-time dengan PDSI Command Center.',
    progresPersen: 88.5,
    status: 'Revisi & Legalisasi',
    anggaran: 2850000000,
    unitTerkait: ['Dit. Pembangunan Infrastruktur', 'Dit. Perencanaan Infrastruktur', 'Dit. Pam Aset'],
  },
  {
    id: 'mp-utilitas',
    kode: 'MP-UTL-2025',
    nama: 'Masterplan Koridor Utilitas Terpadu (Multi-Utility Duct / Box)',
    tahunAnggaran: '2024-2025',
    kategori: 'Infrastruktur Jaringan Terpadu',
    babRujukan: 'Bab III: Standarisasi Underground Utility Tunnel Kota Batam',
    detail: 'Penataan kabel FO, listrik PLN, pipa air SPAM, dan gas PGN di koridor arteri Nagoya - Batam Center sepanjang 48 km.',
    rincian: 'Regulasi Perka kewajiban relokasi utilitas udara ke bawah tanah selesai harmonisasi.',
    progresPersen: 92.0,
    status: 'Revisi & Legalisasi',
    anggaran: 1950000000,
    unitTerkait: ['PDSI', 'Dit. Pembangunan Infrastruktur', 'BU SPAM Fasling'],
  },
  {
    id: 'mp-jalan',
    kode: 'MP-JLN-2025',
    nama: 'Masterplan Jaringan Jalan Arteri & Kolektor KPBPB Batam',
    tahunAnggaran: '2023-2025',
    kategori: 'Konektivitas & Transportasi Darat',
    babRujukan: 'Bab V: Peningkatan Kapasitas Koridor Logistik 5 Lajur',
    detail: 'Pengembangan 14 ruas jalan arteri primer menghubungkan Pelabuhan Batu Ampar - Bandara Hang Nadim - KEK Nongsa.',
    rincian: 'Panjang total 215,8 km dengan pelebaran hingga 5 lajur per jalur dan pedestrian ramah disabilitas.',
    progresPersen: 95.0,
    status: 'Selesai Ditetapkan',
    anggaran: 3400000000,
    unitTerkait: ['Dit. Pembangunan Infrastruktur', 'Dit. Lahan'],
  },
  {
    id: 'mp-bandara',
    kode: 'MP-BND-2025',
    nama: 'Rencana Induk Bandara Internasional Hang Nadim (Aerotropolis)',
    tahunAnggaran: '2024-2026',
    kategori: 'Transportasi Udara & Logistik Multimoda',
    babRujukan: 'Bab II: Masterplan Kemitraan KPBU PT BIB (Konsorsium Incheon)',
    detail: 'Pembangunan Terminal 2 kapasitas 10 juta penumpang/tahun, modernisasi kargo udara, dan zona aerotropolis 1.763 Ha.',
    rincian: 'Ditetapkan melalui Kepmenhub No. KM 47 Tahun 2022 & Kepka BP Batam.',
    progresPersen: 100.0,
    status: 'Selesai Ditetapkan',
    anggaran: 4200000000,
    unitTerkait: ['Dit. Pengelolaan Bandara', 'Dit. Investasi'],
  },
  {
    id: 'mp-pelabuhan',
    kode: 'MP-PLB-2025',
    nama: 'Rencana Induk Pelabuhan Modern Batu Ampar & Terminal Curah Kabil',
    tahunAnggaran: '2024-2026',
    kategori: 'Kemaritiman & Logistik Peti Kemas',
    babRujukan: 'Bab VI: Transformasi Green & Smart Port Transhipment Selat Malaka',
    detail: 'Modernisasi STS Crane bertenaga listrik, pendalaman kolam dermaga utara -13 m LWS, perluasan container yard 12 Ha.',
    rincian: 'Tahap 1 pengadaan 2 unit QCC (Quayside Container Crane) operasional penuh.',
    progresPersen: 84.0,
    status: 'Tahap Penyusunan',
    anggaran: 3100000000,
    unitTerkait: ['Dit. Pengelolaan Kepelabuhanan', 'Dit. Pesisir Reklamasi'],
  },
];

// 2. Monitoring & Evaluasi Program Kerja BP Batam (Dataset #2, #4, #5)
export const PUSREN_MONEV_PROGRAMS: PusrenMonevPaket[] = [
  {
    triwulan: 'Q1-2026',
    tahun: '2026',
    kodeMa: 'WA.001.002.A',
    kegiatanOutput: 'Penyusunan Rencana Strategis & Kajian Prioritas Wilayah',
    paguDipa: 4250000000,
    realisasi: 1820000000,
    progresPaket: 42.8,
    sisaPagu: 2430000000,
    status: 'On-Track',
  },
  {
    triwulan: 'Q1-2026',
    tahun: '2026',
    kodeMa: 'WA.001.002.B',
    kegiatanOutput: 'Penyusunan Masterplan Terpadu Drainase & Mitigasi Banjir',
    paguDipa: 2850000000,
    realisasi: 1450000000,
    progresPaket: 50.9,
    sisaPagu: 1400000000,
    status: 'On-Track',
  },
  {
    triwulan: 'Q1-2026',
    tahun: '2026',
    kodeMa: 'WA.001.002.C',
    kegiatanOutput: 'Kajian Kelayakan Koridor Utilitas Multi-Box Nagoya-Batam Center',
    paguDipa: 1950000000,
    realisasi: 780000000,
    progresPaket: 40.0,
    sisaPagu: 1170000000,
    status: 'On-Track',
  },
  {
    triwulan: 'Q1-2026',
    tahun: '2026',
    kodeMa: 'WA.001.002.D',
    kegiatanOutput: 'Evaluasi & e-Monev KRO/RO Bappenas (SE MenPPN 3/2023)',
    paguDipa: 1480000000,
    realisasi: 890000000,
    progresPaket: 60.1,
    sisaPagu: 590000000,
    status: 'Selesai',
  },
  {
    triwulan: 'Q1-2026',
    tahun: '2026',
    kodeMa: 'WA.001.002.E',
    kegiatanOutput: 'Survei Analisis Kepuasan Stakeholder terhadap Kebijakan Perencanaan',
    paguDipa: 850000000,
    realisasi: 280000000,
    progresPaket: 32.9,
    sisaPagu: 570000000,
    status: 'Atensi',
  },
];

// 3. Renstra 2025-2029 Target vs Realisasi (Dataset #3, #15, #16, #17)
export const PUSREN_RENSTRA_TARGETS: PusrenRenstraTarget[] = [
  {
    tahun: '2025',
    program: 'Program Pengembangan Kawasan Strategis',
    sasaranProgram: 'Meningkatnya Pertumbuhan Ekonomi & Investasi KPBPB',
    indikatorKinerja: 'Nilai Realisasi Investasi Modal Tetap & Lancar',
    satuan: 'Triliun Rupiah',
    target: 70.0,
    realisasi: 72.4,
    kroRo: 'KRO 4812.QMA: Kawasan Industri & Logistik',
    alokasiDana: 48500000000,
    unitPelaksana: 'Dit. Investasi / Pusren',
  },
  {
    tahun: '2025',
    program: 'Program Kebijakan Strategis & Perizinan',
    sasaranProgram: 'Meningkatnya Kualitas Kebijakan dan Perizinan',
    indikatorKinerja: 'Indeks Perencanaan Pembangunan (IPPN)',
    satuan: 'Skala 100',
    target: 92.0,
    realisasi: 94.2,
    kroRo: 'KRO 4810.QMB: Perencanaan Strategis Terpadu',
    alokasiDana: 13660000000,
    unitPelaksana: 'Pusren Program Strategis',
  },
  {
    tahun: '2025',
    program: 'Program Kebijakan Strategis & Perizinan',
    sasaranProgram: 'Tata Kelola Transformasi Digital Kawasan',
    indikatorKinerja: 'Tingkat Kematangan Arsitektur SPBE',
    satuan: 'Skala 1 - 5',
    target: 3.9,
    realisasi: 4.12,
    kroRo: 'KRO 4810.QMD: Pengelolaan Sistem & Data TIK',
    alokasiDana: 53780000000,
    unitPelaksana: 'PDSI',
  },
  {
    tahun: '2025',
    program: 'Program Kebijakan Strategis & Perizinan',
    sasaranProgram: 'Pelayanan Publik Berbasis Kepuasan Pengguna',
    indikatorKinerja: 'Indeks Kepuasan Masyarakat (IKM) PTSP',
    satuan: 'Skala 100',
    target: 86.5,
    realisasi: 88.42,
    kroRo: 'KRO 4810.QME: Pelayanan Terpadu Satu Pintu',
    alokasiDana: 3880000000,
    unitPelaksana: 'PTSP',
  },
];

// 4. Data Masterplan Jalan (Dataset #12)
export const PUSREN_ROAD_DATA: PusrenRoadMasterplan[] = [
  { klasifikasiJalan: 'Arteri Primer', wilayah: 'Batam Center - Nongsa', subWilayah: 'Koridor Bandara - KEK Nongsa', panjangKm: 18.5, lebarMeter: 35.0, statusKonstruksi: 'Operasional 5 Lajur' },
  { klasifikasiJalan: 'Arteri Primer', wilayah: 'Batu Ampar - Muka Kuning', subWilayah: 'Koridor Industri Sei Panas', panjangKm: 14.2, lebarMeter: 35.0, statusKonstruksi: 'Pelebaran Tahap 2' },
  { klasifikasiJalan: 'Arteri Sekunder', wilayah: 'Batu Aji - Tanjung Uncang', subWilayah: 'Kawasan Galangan Kapal', panjangKm: 12.8, lebarMeter: 28.0, statusKonstruksi: 'Operasional' },
  { klasifikasiJalan: 'Kolektor Primer', wilayah: 'Sekupang - Marina City', subWilayah: 'Kawasan Wisata & Pemukiman', panjangKm: 16.4, lebarMeter: 24.0, statusKonstruksi: 'Perkerasan Aspal Baru' },
  { klasifikasiJalan: 'Kolektor Sekunder', wilayah: 'Kabil - Teluk Tering', subWilayah: 'Koridor Energi Pelabuhan Kabil', panjangKm: 9.6, lebarMeter: 22.0, statusKonstruksi: 'Operasional' },
];

// 5. Dokumen Kajian Kelayakan & DED (Dataset #1, #18)
export const PUSREN_STUDY_DOCS: PusrenDokumenKajian[] = [
  { namaKegiatan: 'FS LRT / MRT Lintas Batam Center - Bandara Hang Nadim', lokasi: 'Koridor Timur', tahun: '2025', sumberDana: 'PNBP BP Batam', progres: 85.0, status: 'Draft Akhir' },
  { namaKegiatan: 'Kajian Daya Dukung Lingkungan Pulau Rempang & Galang', lokasi: 'Kepulauan Rempang', tahun: '2024-2025', sumberDana: 'DIPA RM', progres: 100.0, status: 'Selesai' },
  { namaKegiatan: 'Kajian Penanganan Sedimentasi Waduk Duriangkang & Mukakuning', lokasi: 'Waduk Duriangkang', tahun: '2025', sumberDana: 'PNBP BP Batam', progres: 90.0, status: 'Final Review' },
  { namaKegiatan: 'DED Jembatan Batam-Bintan Sisi Sambungan Darat Kabil', lokasi: 'Kabil', tahun: '2025', sumberDana: 'DIPA RM Bappenas', progres: 75.0, status: 'On-Progress' },
];
