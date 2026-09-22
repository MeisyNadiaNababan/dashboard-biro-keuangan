// DATA RESMI & MOCK DIREKTORAT INVESTASI BP BATAM
// Berdasarkan "Atribut Daftar Data Satu Data.pdf"
// Dataset No. 13: Realisasi Investasi
// Dataset No. 10: Jumlah Kunjungan Website Invest In-Batam
// Dataset No. 14: Minat Investasi Hasil Kunjungan dan Pameran Dalam dan Luar Negeri
// Dataset No. 6:  Infrastruktur yang Akan Dibangun
// Serta data Tentatif Kegiatan Promosi

// 1. DATASET NO. 13: REALISASI INVESTASI
export interface RealisasiInvestasiItem {
  id: number;
  tahun: number;
  triwulan: number; // 1, 2, 3, 4
  jenis: 'PMA' | 'PMDN';
  sektor: string;
  negaraAsal: string;
  targetInvestasi: number; // Rupiah
  realisasiInvestasi: number; // Rupiah
  jumlahProyek: number;
  penyerapanNaker: number;
}

export const REALISASI_INVESTASI_DATA: RealisasiInvestasiItem[] = [
  // 2025 - Q4
  {
    id: 1,
    tahun: 2025,
    triwulan: 4,
    jenis: 'PMA',
    sektor: 'Industri Elektronik & Semikonduktor',
    negaraAsal: 'Singapura & Taiwan',
    targetInvestasi: 3500000000000,
    realisasiInvestasi: 4210500000000,
    jumlahProyek: 18,
    penyerapanNaker: 3450,
  },
  {
    id: 2,
    tahun: 2025,
    triwulan: 4,
    jenis: 'PMA',
    sektor: 'Pusat Data & Infrastruktur Digital',
    negaraAsal: 'Amerika Serikat',
    targetInvestasi: 2800000000000,
    realisasiInvestasi: 3373750000000,
    jumlahProyek: 4,
    penyerapanNaker: 820,
  },
  {
    id: 3,
    tahun: 2025,
    triwulan: 4,
    jenis: 'PMDN',
    sektor: 'Galangan Kapal & Maritim Offshore',
    negaraAsal: 'Indonesia',
    targetInvestasi: 1200000000000,
    realisasiInvestasi: 1380200000000,
    jumlahProyek: 9,
    penyerapanNaker: 2100,
  },
  {
    id: 4,
    tahun: 2025,
    triwulan: 4,
    jenis: 'PMDN',
    sektor: 'Pariwisata, Hospitality & Layanan Medis',
    negaraAsal: 'Indonesia',
    targetInvestasi: 950000000000,
    realisasiInvestasi: 1045800000000,
    jumlahProyek: 7,
    penyerapanNaker: 1250,
  },
  // 2025 - Q3
  {
    id: 5,
    tahun: 2025,
    triwulan: 3,
    jenis: 'PMA',
    sektor: 'Industri Mesin & Fabrikasi Presisi',
    negaraAsal: 'Jepang & Jerman',
    targetInvestasi: 2400000000000,
    realisasiInvestasi: 2715000000000,
    jumlahProyek: 12,
    penyerapanNaker: 1980,
  },
  {
    id: 6,
    tahun: 2025,
    triwulan: 3,
    jenis: 'PMA',
    sektor: 'Industri Kimia, Farmasi & Alkes',
    negaraAsal: 'Tiongkok',
    targetInvestasi: 1850000000000,
    realisasiInvestasi: 2140000000000,
    jumlahProyek: 8,
    penyerapanNaker: 1420,
  },
  {
    id: 7,
    tahun: 2025,
    triwulan: 3,
    jenis: 'PMDN',
    sektor: 'Logistik, Pergudangan & Cold Storage',
    negaraAsal: 'Indonesia',
    targetInvestasi: 800000000000,
    realisasiInvestasi: 890500000000,
    jumlahProyek: 6,
    penyerapanNaker: 650,
  },
  // 2025 - Q2
  {
    id: 8,
    tahun: 2025,
    triwulan: 2,
    jenis: 'PMA',
    sektor: 'Industri Energi Terbarukan & PLTS',
    negaraAsal: 'Korea Selatan',
    targetInvestasi: 1900000000000,
    realisasiInvestasi: 2050000000000,
    jumlahProyek: 3,
    penyerapanNaker: 780,
  },
  {
    id: 9,
    tahun: 2025,
    triwulan: 2,
    jenis: 'PMA',
    sektor: 'Industri Elektronik & Otomotif EV',
    negaraAsal: 'Taiwan & Jepang',
    targetInvestasi: 1600000000000,
    realisasiInvestasi: 1780000000000,
    jumlahProyek: 7,
    penyerapanNaker: 1640,
  },
  {
    id: 10,
    tahun: 2025,
    triwulan: 2,
    jenis: 'PMDN',
    sektor: 'Kawasan Industri & Real Estate Bisnis',
    negaraAsal: 'Indonesia',
    targetInvestasi: 750000000000,
    realisasiInvestasi: 815000000000,
    jumlahProyek: 5,
    penyerapanNaker: 520,
  },
  // 2025 - Q1
  {
    id: 11,
    tahun: 2025,
    triwulan: 1,
    jenis: 'PMA',
    sektor: 'Aviasi MRO & Komponen Pesawat',
    negaraAsal: 'Singapura',
    targetInvestasi: 1100000000000,
    realisasiInvestasi: 1240000000000,
    jumlahProyek: 4,
    penyerapanNaker: 890,
  },
  {
    id: 12,
    tahun: 2025,
    triwulan: 1,
    jenis: 'PMDN',
    sektor: 'Industri Makanan & Minuman Ekspor',
    negaraAsal: 'Indonesia',
    targetInvestasi: 550000000000,
    realisasiInvestasi: 630000000000,
    jumlahProyek: 8,
    penyerapanNaker: 710,
  },
];

// 2. DATASET NO. 10: JUMLAH KUNJUNGAN WEBSITE INVEST IN-BATAM
export interface WebsiteVisitItem {
  id: number;
  bulan: string;
  tahun: number;
  kunjunganTotal: number;
  pengunjungUnik: number;
  tampilanHalaman: number;
  asalNegaraTerbanyak: string;
  halamanTerpopuler: string;
}

export interface WebsiteVisitYearlyItem {
  tahun: number;
  totalKunjungan: number;
  pengunjungUnik: number;
  tampilanHalaman: number;
  pertumbuhanYoYPersen: number; // e.g. 58.9
  status: 'Realisasi' | 'Estimasi / Target';
  asalNegaraDominan: string;
  halamanPalingDiminati: string;
  sumberTrafficUtama: string;
}

export const WEBSITE_VISIT_YEARLY_DATA: WebsiteVisitYearlyItem[] = [
  {
    tahun: 2021,
    totalKunjungan: 78400,
    pengunjungUnik: 51200,
    tampilanHalaman: 235200,
    pertumbuhanYoYPersen: 0,
    status: 'Realisasi',
    asalNegaraDominan: 'Singapura (42%)',
    halamanPalingDiminati: '/batam-free-trade-zone-overview',
    sumberTrafficUtama: 'Direct & Organic Search',
  },
  {
    tahun: 2022,
    totalKunjungan: 124600,
    pengunjungUnik: 82500,
    tampilanHalaman: 386260,
    pertumbuhanYoYPersen: 58.9,
    status: 'Realisasi',
    asalNegaraDominan: 'Singapura (39%), Indonesia (25%)',
    halamanPalingDiminati: '/industrial-estates-directory',
    sumberTrafficUtama: 'Google Search & Pameran Bisnis',
  },
  {
    tahun: 2023,
    totalKunjungan: 168300,
    pengunjungUnik: 114200,
    tampilanHalaman: 521730,
    pertumbuhanYoYPersen: 35.1,
    status: 'Realisasi',
    asalNegaraDominan: 'Singapura (36%), Tiongkok (20%)',
    halamanPalingDiminati: '/incentives-and-tax-holiday',
    sumberTrafficUtama: 'Event Roadshow & Partner Portals',
  },
  {
    tahun: 2024,
    totalKunjungan: 205800,
    pengunjungUnik: 141600,
    tampilanHalaman: 637980,
    pertumbuhanYoYPersen: 22.3,
    status: 'Realisasi',
    asalNegaraDominan: 'Singapura (35%), Tiongkok (24%)',
    halamanPalingDiminati: '/kek-nongsa-digital-park',
    sumberTrafficUtama: 'Global Investment Forums & SEO',
  },
  {
    tahun: 2025,
    totalKunjungan: 239250,
    pengunjungUnik: 164200,
    tampilanHalaman: 706700,
    pertumbuhanYoYPersen: 16.3,
    status: 'Realisasi',
    asalNegaraDominan: 'Singapura (34%), AS (21%), Tiongkok (20%)',
    halamanPalingDiminati: '/how-to-invest-oss-guide',
    sumberTrafficUtama: 'Portal Terpadu OSS & Campaign Internasional',
  },
  {
    tahun: 2026,
    totalKunjungan: 285000,
    pengunjungUnik: 195000,
    tampilanHalaman: 855000,
    pertumbuhanYoYPersen: 19.1,
    status: 'Estimasi / Target',
    asalNegaraDominan: 'Singapura, AS, Jepang, Korsel',
    halamanPalingDiminati: '/renewable-energy-investment',
    sumberTrafficUtama: 'Digital FDI Campaigns & Diplomatic Outreach',
  },
];

export const WEBSITE_VISIT_DATA: WebsiteVisitItem[] = [
  { id: 1, bulan: 'Januari', tahun: 2025, kunjunganTotal: 14250, pengunjungUnik: 9800, tampilanHalaman: 42100, asalNegaraTerbanyak: 'Singapura (38%)', halamanTerpopuler: '/incentives-and-tax-holiday' },
  { id: 2, bulan: 'Februari', tahun: 2025, kunjunganTotal: 15600, pengunjungUnik: 10400, tampilanHalaman: 46800, asalNegaraTerbanyak: 'Indonesia (28%)', halamanTerpopuler: '/industrial-estates-directory' },
  { id: 3, bulan: 'Maret', tahun: 2025, kunjunganTotal: 16800, pengunjungUnik: 11200, tampilanHalaman: 50400, asalNegaraTerbanyak: 'Singapura (35%)', halamanTerpopuler: '/how-to-invest-oss-guide' },
  { id: 4, bulan: 'April', tahun: 2025, kunjunganTotal: 18100, pengunjungUnik: 12300, tampilanHalaman: 54300, asalNegaraTerbanyak: 'Tiongkok (22%)', halamanTerpopuler: '/kek-nongsa-digital-park' },
  { id: 5, bulan: 'Mei', tahun: 2025, kunjunganTotal: 17400, pengunjungUnik: 11900, tampilanHalaman: 52200, asalNegaraTerbanyak: 'Singapura (32%)', halamanTerpopuler: '/batam-infrastructure-projects' },
  { id: 6, bulan: 'Juni', tahun: 2025, kunjunganTotal: 19500, pengunjungUnik: 13500, tampilanHalaman: 58500, asalNegaraTerbanyak: 'Jepang (20%)', halamanTerpopuler: '/incentives-and-tax-holiday' },
  { id: 7, bulan: 'Juli', tahun: 2025, kunjunganTotal: 21300, pengunjungUnik: 14800, tampilanHalaman: 63900, asalNegaraTerbanyak: 'Singapura (36%)', halamanTerpopuler: '/industrial-estates-directory' },
  { id: 8, bulan: 'Agustus', tahun: 2025, kunjunganTotal: 20800, pengunjungUnik: 14200, tampilanHalaman: 62400, asalNegaraTerbanyak: 'Korea Selatan (18%)', halamanTerpopuler: '/renewable-energy-investment' },
  { id: 9, bulan: 'September', tahun: 2025, kunjunganTotal: 22400, pengunjungUnik: 15600, tampilanHalaman: 67200, asalNegaraTerbanyak: 'Amerika Serikat (24%)', halamanTerpopuler: '/data-center-hub-batam' },
  { id: 10, bulan: 'Oktober', tahun: 2025, kunjunganTotal: 24100, pengunjungUnik: 16700, tampilanHalaman: 72300, asalNegaraTerbanyak: 'Tiongkok (26%)', halamanTerpopuler: '/how-to-invest-oss-guide' },
  { id: 11, bulan: 'November', tahun: 2025, kunjunganTotal: 23200, pengunjungUnik: 15900, tampilanHalaman: 69600, asalNegaraTerbanyak: 'Singapura (34%)', halamanTerpopuler: '/kek-batam-aero-technic' },
  { id: 12, bulan: 'Desember', tahun: 2025, kunjunganTotal: 25800, pengunjungUnik: 17800, tampilanHalaman: 77400, asalNegaraTerbanyak: 'Singapura (35%)', halamanTerpopuler: '/annual-investment-report' },
];

// 3. DATASET NO. 14: MINAT INVESTASI HASIL KUNJUNGAN DAN PAMERAN DALAM DAN LUAR NEGERI
export interface MinatInvestasiItem {
  id: number;
  namaPerusahaan: string;
  asalNegara: string;
  kategoriAsal: 'Luar Negeri' | 'Dalam Negeri';
  sektor: string;
  nilaiMinatInvestasi: number; // Rupiah
  namaPameranKegiatan: string;
  lokasiKegiatan: string;
  tahun: number;
  statusMinat: 'Letter of Intent (LoI)' | 'Studi Kelayakan (FS)' | 'Kunjungan Lapangan (Site Visit)' | 'Pemenuhan Komitmen';
}

export const MINAT_INVESTASI_DATA: MinatInvestasiItem[] = [
  {
    id: 1,
    namaPerusahaan: 'Singtel Data Services Pte Ltd',
    asalNegara: 'Singapura',
    kategoriAsal: 'Luar Negeri',
    sektor: 'Pusat Data & Ekonomi Digital',
    nilaiMinatInvestasi: 4200000000000,
    namaPameranKegiatan: 'Singapore FinTech & Data Center Expo',
    lokasiKegiatan: 'Marina Bay Sands, Singapura',
    tahun: 2025,
    statusMinat: 'Pemenuhan Komitmen',
  },
  {
    id: 2,
    namaPerusahaan: 'Pegatron Technology Corp',
    asalNegara: 'Taiwan',
    kategoriAsal: 'Luar Negeri',
    sektor: 'Elektronik & Semikonduktor',
    nilaiMinatInvestasi: 3850000000000,
    namaPameranKegiatan: 'Computex Taipei & Taiwan Trade Mission',
    lokasiKegiatan: 'Taipei, Taiwan',
    tahun: 2025,
    statusMinat: 'Studi Kelayakan (FS)',
  },
  {
    id: 3,
    namaPerusahaan: 'Gotion High-Tech Energy Co.',
    asalNegara: 'Tiongkok',
    kategoriAsal: 'Luar Negeri',
    sektor: 'Energi Terbarukan & Baterai EV',
    nilaiMinatInvestasi: 3100000000000,
    namaPameranKegiatan: 'China International Fair for Investment & Trade (CIFIT)',
    lokasiKegiatan: 'Xiamen, Tiongkok',
    tahun: 2025,
    statusMinat: 'Kunjungan Lapangan (Site Visit)',
  },
  {
    id: 4,
    namaPerusahaan: 'PT Medco Solar Batam',
    asalNegara: 'Indonesia',
    kategoriAsal: 'Dalam Negeri',
    sektor: 'Energi Terbarukan & Baterai EV',
    nilaiMinatInvestasi: 2400000000000,
    namaPameranKegiatan: 'Indonesia EBTKE ConEx Jakarta',
    lokasiKegiatan: 'ICE BSD, Tangerang',
    tahun: 2025,
    statusMinat: 'Letter of Intent (LoI)',
  },
  {
    id: 5,
    namaPerusahaan: 'Mitsubishi Heavy Industries Marine',
    asalNegara: 'Jepang',
    kategoriAsal: 'Luar Negeri',
    sektor: 'Galangan Kapal & Maritim Offshore',
    nilaiMinatInvestasi: 2150000000000,
    namaPameranKegiatan: 'Sea Japan Maritime Exhibition',
    lokasiKegiatan: 'Tokyo Big Sight, Jepang',
    tahun: 2025,
    statusMinat: 'Studi Kelayakan (FS)',
  },
  {
    id: 6,
    namaPerusahaan: 'PT Mayapada Healthcare Pratama',
    asalNegara: 'Indonesia',
    kategoriAsal: 'Dalam Negeri',
    sektor: 'Kesehatan & Pariwisata Medis',
    nilaiMinatInvestasi: 1950000000000,
    namaPameranKegiatan: 'Temu Bisnis Peluang KEK Kesehatan Jakarta',
    lokasiKegiatan: 'Jakarta Pusat',
    tahun: 2025,
    statusMinat: 'Pemenuhan Komitmen',
  },
  {
    id: 7,
    namaPerusahaan: 'Hanwha Aerospace Co Ltd',
    asalNegara: 'Korea Selatan',
    kategoriAsal: 'Luar Negeri',
    sektor: 'Aviasi MRO & Komponen Pesawat',
    nilaiMinatInvestasi: 1800000000000,
    namaPameranKegiatan: 'Seoul International Aerospace & Defense Exhibition (ADEX)',
    lokasiKegiatan: 'Seoul, Korea Selatan',
    tahun: 2025,
    statusMinat: 'Kunjungan Lapangan (Site Visit)',
  },
  {
    id: 8,
    namaPerusahaan: 'Wistron InfoComm Corp',
    asalNegara: 'Taiwan',
    kategoriAsal: 'Luar Negeri',
    sektor: 'Elektronik & Semikonduktor',
    nilaiMinatInvestasi: 1650000000000,
    namaPameranKegiatan: 'Computex Taipei Trade Mission',
    lokasiKegiatan: 'Taipei, Taiwan',
    tahun: 2025,
    statusMinat: 'Letter of Intent (LoI)',
  },
  {
    id: 9,
    namaPerusahaan: 'PT Duta Palma Agro Industry',
    asalNegara: 'Indonesia',
    kategoriAsal: 'Dalam Negeri',
    sektor: 'Industri Kimia & Oleokimia',
    nilaiMinatInvestasi: 1450000000000,
    namaPameranKegiatan: 'Pameran Trade Expo Indonesia (TEI)',
    lokasiKegiatan: 'BSD City, Indonesia',
    tahun: 2025,
    statusMinat: 'Studi Kelayakan (FS)',
  },
  {
    id: 10,
    namaPerusahaan: 'DHL Global Forwarding Logistics',
    asalNegara: 'Jerman',
    kategoriAsal: 'Luar Negeri',
    sektor: 'Logistik & Pergudangan Modern',
    nilaiMinatInvestasi: 1300000000000,
    namaPameranKegiatan: 'Transport Logistic Munich',
    lokasiKegiatan: 'Munich, Jerman',
    tahun: 2025,
    statusMinat: 'Letter of Intent (LoI)',
  },
  {
    id: 11,
    namaPerusahaan: 'ST Telemedia Global Data Centres',
    asalNegara: 'Singapura',
    kategoriAsal: 'Luar Negeri',
    sektor: 'Pusat Data & Ekonomi Digital',
    nilaiMinatInvestasi: 1250000000000,
    namaPameranKegiatan: 'Cloud & Datacenter Convention Singapore',
    lokasiKegiatan: 'Suntec City, Singapura',
    tahun: 2025,
    statusMinat: 'Pemenuhan Komitmen',
  },
  {
    id: 12,
    namaPerusahaan: 'PT Batamindo Industrial Park Expansion',
    asalNegara: 'Indonesia',
    kategoriAsal: 'Dalam Negeri',
    sektor: 'Kawasan Industri & Properti',
    nilaiMinatInvestasi: 1100000000000,
    namaPameranKegiatan: 'Batam Business Forum Jakarta',
    lokasiKegiatan: 'Grand Hyatt, Jakarta',
    tahun: 2025,
    statusMinat: 'Pemenuhan Komitmen',
  },
  {
    id: 13,
    namaPerusahaan: 'Hyosung Chemical Corp',
    asalNegara: 'Korea Selatan',
    kategoriAsal: 'Luar Negeri',
    sektor: 'Industri Kimia & Oleokimia',
    nilaiMinatInvestasi: 980000000000,
    namaPameranKegiatan: 'K-Chemical Industrial Showcase',
    lokasiKegiatan: 'Busan, Korea Selatan',
    tahun: 2025,
    statusMinat: 'Letter of Intent (LoI)',
  },
  {
    id: 14,
    namaPerusahaan: 'Austal Ships Ltd',
    asalNegara: 'Australia',
    kategoriAsal: 'Luar Negeri',
    sektor: 'Galangan Kapal & Maritim Offshore',
    nilaiMinatInvestasi: 920000000000,
    namaPameranKegiatan: 'Indo Pacific International Maritime Exposition',
    lokasiKegiatan: 'Sydney, Australia',
    tahun: 2025,
    statusMinat: 'Studi Kelayakan (FS)',
  },
  {
    id: 15,
    namaPerusahaan: 'PT Ciputra Hospital Batam',
    asalNegara: 'Indonesia',
    kategoriAsal: 'Dalam Negeri',
    sektor: 'Kesehatan & Pariwisata Medis',
    nilaiMinatInvestasi: 850000000000,
    namaPameranKegiatan: 'Hospital Expo Indonesia',
    lokasiKegiatan: 'JCC Senayan, Jakarta',
    tahun: 2025,
    statusMinat: 'Studi Kelayakan (FS)',
  },
  {
    id: 16,
    namaPerusahaan: 'Bolloré Logistics Singapore',
    asalNegara: 'Singapura',
    kategoriAsal: 'Luar Negeri',
    sektor: 'Logistik & Pergudangan Modern',
    nilaiMinatInvestasi: 720000000000,
    namaPameranKegiatan: 'LogiSYM Asia Pacific Conference',
    lokasiKegiatan: 'Singapura',
    tahun: 2025,
    statusMinat: 'Kunjungan Lapangan (Site Visit)',
  },
];

// 4. DATASET NO. 6: INFRASTRUKTUR YANG AKAN DIBANGUN (MULTI-YEAR DENGAN NILAI INVESTASI & LUAS)
export interface InfrastrukturItem {
  id: number;
  namaProyek: string;
  tahun: number; // 2024, 2025, 2026, 2027
  nilaiInvestasi: number; // Rupiah
  luasAreaHa: number; // Hektar
  lokasi: string;
  sektor: 'Transportasi & Konektivitas' | 'Energi & Utilitas' | 'Kawasan Industri & Hub' | 'Kesehatan & Pariwisata';
  status: 'Perencanaan / DED' | 'Tender Konstruksi' | 'Tahap Konstruksi Fisik' | 'Operasional Awal';
  sumberPendanaan: 'KPBU / Konsorsium Swasta' | 'PNBP BP Batam' | 'DIPA APBN' | 'PMA Foreign Direct Investment';
}

export const INFRASTRUKTUR_DATA: InfrastrukturItem[] = [
  // TAHUN 2024
  {
    id: 101,
    namaProyek: 'Pembangunan Flyover Sei Ladi & Penataan Simpang U-Turn',
    tahun: 2024,
    nilaiInvestasi: 132000000000,
    luasAreaHa: 4.8,
    lokasi: 'Sei Ladi - Sekupang',
    sektor: 'Transportasi & Konektivitas',
    status: 'Operasional Awal',
    sumberPendanaan: 'PNBP BP Batam',
  },
  {
    id: 102,
    namaProyek: 'Revitalisasi & Modernisasi Dermaga Utara Pelabuhan Batu Ampar',
    tahun: 2024,
    nilaiInvestasi: 850000000000,
    luasAreaHa: 22.5,
    lokasi: 'Kecamatan Batu Ampar',
    sektor: 'Transportasi & Konektivitas',
    status: 'Tahap Konstruksi Fisik',
    sumberPendanaan: 'KPBU / Konsorsium Swasta',
  },
  {
    id: 103,
    namaProyek: 'Upgrading Instalasi Pengolahan Air (IPA / WTP) Muka Kuning 350 lpd',
    tahun: 2024,
    nilaiInvestasi: 245000000000,
    luasAreaHa: 8.2,
    lokasi: 'Waduk Muka Kuning',
    sektor: 'Energi & Utilitas',
    status: 'Operasional Awal',
    sumberPendanaan: 'PNBP BP Batam',
  },
  {
    id: 104,
    namaProyek: 'Pelebaran Jalan Arteri Gajah Mada Koridor Tiban - Southlinks',
    tahun: 2024,
    nilaiInvestasi: 198000000000,
    luasAreaHa: 10.3,
    lokasi: 'Sekupang - Lubuk Baja',
    sektor: 'Transportasi & Konektivitas',
    status: 'Tahap Konstruksi Fisik',
    sumberPendanaan: 'PNBP BP Batam',
  },

  // TAHUN 2025
  {
    id: 201,
    namaProyek: 'Pengembangan Terminal Kargo & Logistik Bandara Internasional Hang Nadim',
    tahun: 2025,
    nilaiInvestasi: 1450000000000,
    luasAreaHa: 38.4,
    lokasi: 'Bandara Hang Nadim Batam',
    sektor: 'Transportasi & Konektivitas',
    status: 'Tahap Konstruksi Fisik',
    sumberPendanaan: 'KPBU / Konsorsium Swasta',
  },
  {
    id: 202,
    namaProyek: 'Pembangunan Pembangkit Listrik Tenaga Surya (PLTS) Terapung Waduk Tembesi',
    tahun: 2025,
    nilaiInvestasi: 2150000000000,
    luasAreaHa: 86.0,
    lokasi: 'Waduk Tembesi, Batu Aji',
    sektor: 'Energi & Utilitas',
    status: 'Tahap Konstruksi Fisik',
    sumberPendanaan: 'PMA Foreign Direct Investment',
  },
  {
    id: 203,
    namaProyek: 'Pelebaran Koridor Jalan Yos Sudarso 5 Lajur Pelabuhan Batu Ampar - Bandara',
    tahun: 2025,
    nilaiInvestasi: 380000000000,
    luasAreaHa: 24.7,
    lokasi: 'Batu Ampar - Batam Centre',
    sektor: 'Transportasi & Konektivitas',
    status: 'Tahap Konstruksi Fisik',
    sumberPendanaan: 'DIPA APBN',
  },
  {
    id: 204,
    namaProyek: 'Pembangunan Gedung Pelayanan Onkologi Terpadu & Radioterapi RSBP Batam',
    tahun: 2025,
    nilaiInvestasi: 420000000000,
    luasAreaHa: 6.5,
    lokasi: 'Sekupang, KEK Kesehatan',
    sektor: 'Kesehatan & Pariwisata',
    status: 'Tender Konstruksi',
    sumberPendanaan: 'PNBP BP Batam',
  },
  {
    id: 205,
    namaProyek: 'Kawasan Pengolahan Limbah Terpadu B3 Fase 2 KPLI Kabil',
    tahun: 2025,
    nilaiInvestasi: 560000000000,
    luasAreaHa: 28.0,
    lokasi: 'Kabil, Nongsa',
    sektor: 'Energi & Utilitas',
    status: 'Perencanaan / DED',
    sumberPendanaan: 'KPBU / Konsorsium Swasta',
  },

  // TAHUN 2026
  {
    id: 301,
    namaProyek: 'Pembangunan Batam Light Rail Transit (LRT) Fase 1A (Bandara - Batam Centre)',
    tahun: 2026,
    nilaiInvestasi: 3850000000000,
    luasAreaHa: 42.0,
    lokasi: 'Koridor Hang Nadim - Batam Centre (10.8 km)',
    sektor: 'Transportasi & Konektivitas',
    status: 'Perencanaan / DED',
    sumberPendanaan: 'KPBU / Konsorsium Swasta',
  },
  {
    id: 302,
    namaProyek: 'Pengembangan Eco-Industrial Hub & Data Center Hyperscale Kabil',
    tahun: 2026,
    nilaiInvestasi: 4200000000000,
    luasAreaHa: 110.5,
    lokasi: 'Kawasan Industri Kabil',
    sektor: 'Kawasan Industri & Hub',
    status: 'Perencanaan / DED',
    sumberPendanaan: 'PMA Foreign Direct Investment',
  },
  {
    id: 303,
    namaProyek: 'Desalinasi Air Laut (SWRO) & Interkoneksi Pipa Air Baku Waduk Duriangkang',
    tahun: 2026,
    nilaiInvestasi: 1250000000000,
    luasAreaHa: 18.5,
    lokasi: 'Duriangkang - Tanjung Piayu',
    sektor: 'Energi & Utilitas',
    status: 'Perencanaan / DED',
    sumberPendanaan: 'KPBU / Konsorsium Swasta',
  },
  {
    id: 304,
    namaProyek: 'International Cruise & Yacht Terminal Sekupang Waterfront Marina',
    tahun: 2026,
    nilaiInvestasi: 890000000000,
    luasAreaHa: 25.0,
    lokasi: 'Sekupang Waterfront',
    sektor: 'Kesehatan & Pariwisata',
    status: 'Perencanaan / DED',
    sumberPendanaan: 'PMA Foreign Direct Investment',
  },

  // TAHUN 2027 (JANGKA PANJANG)
  {
    id: 401,
    namaProyek: 'Pelabuhan Transshipment Hub Peti Kemas Pulau Tanjung Sauh',
    tahun: 2027,
    nilaiInvestasi: 8500000000000,
    luasAreaHa: 240.0,
    lokasi: 'Pulau Tanjung Sauh',
    sektor: 'Transportasi & Konektivitas',
    status: 'Perencanaan / DED',
    sumberPendanaan: 'KPBU / Konsorsium Swasta',
  },
  {
    id: 402,
    namaProyek: 'Kawasan Hang Nadim Aeropolis & Smart Logistics City',
    tahun: 2027,
    nilaiInvestasi: 6200000000000,
    luasAreaHa: 180.0,
    lokasi: 'Hang Nadim Aeropolis',
    sektor: 'Kawasan Industri & Hub',
    status: 'Perencanaan / DED',
    sumberPendanaan: 'PMA Foreign Direct Investment',
  },
];

// 5. TENTATIF KEGIATAN PROMOSI DIREKTORAT INVESTASI
export interface KegiatanPromosiItem {
  id: number;
  namaKegiatan: string;
  kategori: 'Pameran Luar Negeri' | 'Pameran Dalam Negeri' | 'Business Forum & Matchmaking' | 'Misi Diplomatik & Dagang' | 'Inbound Delegasi Investor';
  waktuPelaksanaan: string;
  tahun: number;
  lokasi: string;
  jumlahTamu: number; // Jumlah tamu / delegasi
  jumlahPelaksanaan: number; // Frekuensi kegiatan
  sektorFokus: string;
  status: 'Terlaksana' | 'Dalam Persiapan' | 'Terjadwal';
}

export const KEGIATAN_PROMOSI_DATA: KegiatanPromosiItem[] = [
  {
    id: 1,
    namaKegiatan: 'Singapore FinTech & Data Center Investment Forum',
    kategori: 'Business Forum & Matchmaking',
    waktuPelaksanaan: '22 - 24 Januari 2025',
    tahun: 2025,
    lokasi: 'Marina Bay Sands, Singapura',
    jumlahTamu: 380,
    jumlahPelaksanaan: 1,
    sektorFokus: 'Pusat Data & Infrastruktur Digital',
    status: 'Terlaksana',
  },
  {
    id: 2,
    namaKegiatan: 'Batam International Investment Gathering (BIIG) Jakarta',
    kategori: 'Business Forum & Matchmaking',
    waktuPelaksanaan: '18 - 19 Februari 2025',
    tahun: 2025,
    lokasi: 'Hotel Indonesia Kempinski, Jakarta',
    jumlahTamu: 450,
    jumlahPelaksanaan: 2,
    sektorFokus: 'Manufaktur Presisi & Kawasan Industri',
    status: 'Terlaksana',
  },
  {
    id: 3,
    namaKegiatan: 'Computex Taipei & Taiwan Electronics Roadshow',
    kategori: 'Pameran Luar Negeri',
    waktuPelaksanaan: '12 - 15 Maret 2025',
    tahun: 2025,
    lokasi: 'Taipei Nangang Exhibition Center, Taiwan',
    jumlahTamu: 620,
    jumlahPelaksanaan: 1,
    sektorFokus: 'Semikonduktor & Komponen Elektronik',
    status: 'Terlaksana',
  },
  {
    id: 4,
    namaKegiatan: 'Indonesia EBTKE ConEx & Clean Energy Expo',
    kategori: 'Pameran Dalam Negeri',
    waktuPelaksanaan: '24 - 26 April 2025',
    tahun: 2025,
    lokasi: 'ICE BSD, Tangerang Selatan',
    jumlahTamu: 290,
    jumlahPelaksanaan: 1,
    sektorFokus: 'Energi Terbarukan & Solar Farm',
    status: 'Terlaksana',
  },
  {
    id: 5,
    namaKegiatan: 'China International Fair for Investment & Trade (CIFIT)',
    kategori: 'Pameran Luar Negeri',
    waktuPelaksanaan: '10 - 13 Mei 2025',
    tahun: 2025,
    lokasi: 'Xiamen International Conference Center, Tiongkok',
    jumlahTamu: 780,
    jumlahPelaksanaan: 1,
    sektorFokus: 'Baterai EV, Kimia & Material Maju',
    status: 'Terlaksana',
  },
  {
    id: 6,
    namaKegiatan: 'Kunjungan Delegasi Kamar Dagang Jepang (JCCI Inbound Mission)',
    kategori: 'Inbound Delegasi Investor',
    waktuPelaksanaan: '16 - 17 Juni 2025',
    tahun: 2025,
    lokasi: 'Kantor BP Batam & KEK Batam Teknik',
    jumlahTamu: 140,
    jumlahPelaksanaan: 3,
    sektorFokus: 'Aviasi MRO & Industri Mesin',
    status: 'Terlaksana',
  },
  {
    id: 7,
    namaKegiatan: 'Sea Japan & International Maritime Business Matching',
    kategori: 'Misi Diplomatik & Dagang',
    waktuPelaksanaan: '20 - 22 Juli 2025',
    tahun: 2025,
    lokasi: 'Tokyo Big Sight, Jepang',
    jumlahTamu: 340,
    jumlahPelaksanaan: 1,
    sektorFokus: 'Shipyard & Galangan Kapal Modern',
    status: 'Terlaksana',
  },
  {
    id: 8,
    namaKegiatan: 'Trade Expo Indonesia (TEI) Paviliun Investasi Batam',
    kategori: 'Pameran Dalam Negeri',
    waktuPelaksanaan: '18 - 22 Agustus 2025',
    tahun: 2025,
    lokasi: 'ICE BSD, Tangerang',
    jumlahTamu: 510,
    jumlahPelaksanaan: 2,
    sektorFokus: 'Logistik, Ekspor Industri & Farmasi',
    status: 'Terlaksana',
  },
  {
    id: 9,
    namaKegiatan: 'Kunjungan Delegasi Kedutaan Besar & Investor Uni Eropa (EU-ABC)',
    kategori: 'Inbound Delegasi Investor',
    waktuPelaksanaan: '15 - 17 September 2025',
    tahun: 2025,
    lokasi: 'Batam Centre & Kawasan Industri Kabil',
    jumlahTamu: 185,
    jumlahPelaksanaan: 2,
    sektorFokus: 'Green Industry & Digital Hub',
    status: 'Terlaksana',
  },
  {
    id: 10,
    namaKegiatan: 'Transport Logistic Munich & European Supply Chain Summit',
    kategori: 'Pameran Luar Negeri',
    waktuPelaksanaan: '08 - 11 Oktober 2025',
    tahun: 2025,
    lokasi: 'Messe München, Jerman',
    jumlahTamu: 420,
    jumlahPelaksanaan: 1,
    sektorFokus: 'Pelabuhan Hub, Kargo & Logistik',
    status: 'Terlaksana',
  },
  {
    id: 11,
    namaKegiatan: 'Seoul Smart City & High-Tech Investment Mission',
    kategori: 'Misi Diplomatik & Dagang',
    waktuPelaksanaan: '12 - 14 November 2025',
    tahun: 2025,
    lokasi: 'COEX Convention Center, Seoul, Korea Selatan',
    jumlahTamu: 360,
    jumlahPelaksanaan: 1,
    sektorFokus: 'Elektronika Maju & Ekosistem AI',
    status: 'Terlaksana',
  },
  {
    id: 12,
    namaKegiatan: 'Batam Year-End Investment Appreciation Night & Outlook',
    kategori: 'Business Forum & Matchmaking',
    waktuPelaksanaan: '10 Desember 2025',
    tahun: 2025,
    lokasi: 'Batam Marriott Hotel Harbour Bay',
    jumlahTamu: 600,
    jumlahPelaksanaan: 1,
    sektorFokus: 'Semua Sektor Prioritas Batam',
    status: 'Terlaksana',
  },
];
