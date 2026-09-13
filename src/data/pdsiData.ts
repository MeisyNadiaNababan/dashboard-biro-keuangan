export interface PdsiKpiMetric {
  id: string;
  title: string;
  value: string;
  target: string;
  percentage: string;
  trend: {
    direction: 'up' | 'down';
    value: string;
    period: string;
    isPositive: boolean;
  };
  sparkline: number[];
  badge?: {
    text: string;
    variant: 'success' | 'warning' | 'danger' | 'info';
  };
  colorTheme: 'emerald' | 'blue' | 'purple' | 'amber' | 'teal' | 'rose';
  formulaRef: string;
}

export const PDSI_KPI_METRICS: PdsiKpiMetric[] = [
  {
    id: 'total_rak',
    title: 'Total Rak Data Center',
    value: '42 Unit Rak',
    target: 'Standar Rak 42U Server',
    percentage: 'Fasilitas DC BIDA & DRC Sekupang',
    trend: {
      direction: 'up',
      value: '+0 Unit',
      period: '(Kapasitas Tetap)',
      isPositive: true,
    },
    sparkline: [42, 42, 42, 42, 42, 42, 42],
    badge: {
      text: 'Tier III Ready',
      variant: 'success',
    },
    colorTheme: 'blue',
    formulaRef: 'Item #8: Total Rak = SUM([TOTAL RAK]) di Seluruh Fasilitas DC Tier III',
  },
  {
    id: 'rak_terisi',
    title: 'Jumlah Rak Data Terisi',
    value: '33 Rak',
    target: 'Tingkat Okupansi: 78,6%',
    percentage: '33 Terisi • 9 Rak Kosong',
    trend: {
      direction: 'up',
      value: '+2 Rak',
      period: '(QoQ)',
      isPositive: true,
    },
    sparkline: [28, 29, 30, 31, 32, 32, 33],
    badge: {
      text: '78,6% Okupansi',
      variant: 'success',
    },
    colorTheme: 'emerald',
    formulaRef: 'Item #8: Rak Data Terisi = SUM([RAK TERISI]) • Slot Kosong = Total Rak - Rak Terisi',
  },
  {
    id: 'total_serangan',
    title: 'Total Serangan Keamanan IT',
    value: '14.820',
    target: '14.627 Termitigasi (98,7%)',
    percentage: 'Threat Activity Terdeteksi YTD',
    trend: {
      direction: 'up',
      value: '+1.420',
      period: '(MoM)',
      isPositive: false,
    },
    sparkline: [11200, 11800, 12400, 13100, 13750, 14200, 14820],
    badge: {
      text: 'SOC Protected',
      variant: 'info',
    },
    colorTheme: 'teal',
    formulaRef: 'Item #12: Total Serangan IT = SUM([JML SERANGAN]) • Mitigasi = SUM([TERMITIGASI])',
  },
  {
    id: 'kepuasan_dc',
    title: 'Tingkat Kepuasan Pelanggan Data Center',
    value: '94,2%',
    target: 'Target Kepuasan: ≥ 90,0%',
    percentage: 'Kategori "Sangat Puas" (Indeks 4,71/5)',
    trend: {
      direction: 'up',
      value: '+1,8%',
      period: '(YoY)',
      isPositive: true,
    },
    sparkline: [88.5, 89.2, 90.4, 91.8, 92.6, 93.5, 94.2],
    badge: {
      text: 'Sangat Puas',
      variant: 'success',
    },
    colorTheme: 'amber',
    formulaRef: 'Item #11: CSAT Data Center = (Total Skor Responden / Skor Maksimal) * 100%',
  },
  {
    id: 'kapasitas_core_fo',
    title: 'Kapasitas Core FO',
    value: '1.152 Core',
    target: 'Utilisasi: 81,4% (938 Core Aktif)',
    percentage: 'Cakupan Koridor Backbone Pulau Batam',
    trend: {
      direction: 'up',
      value: '+48 Core',
      period: '(YTD 2026)',
      isPositive: true,
    },
    sparkline: [1000, 1024, 1056, 1080, 1104, 1128, 1152],
    badge: {
      text: 'Core Backbone',
      variant: 'info',
    },
    colorTheme: 'blue',
    formulaRef: 'Item #5: Total Kapasitas Core FO = SUM([JMLHCORE]) Core',
  },
  {
    id: 'jumlah_server',
    title: 'Jumlah Server & Storage',
    value: '58 Server',
    target: 'Fisik, Blade & Node HCI',
    percentage: '48 Server Aktif • 10 Node Standby',
    trend: {
      direction: 'up',
      value: '+4 Unit',
      period: '(TA 2026)',
      isPositive: true,
    },
    sparkline: [46, 48, 50, 52, 54, 56, 58],
    badge: {
      text: '58 Unit',
      variant: 'info',
    },
    colorTheme: 'emerald',
    formulaRef: 'Item #13: Total Server = SUM([JUMLAH]) Unit Server dan Node Storage',
  },
];

// Data Center Racks (Item #8 di PDF)
export interface DcRackItem {
  id: string;
  ruangan: string;
  jenisRak: string;
  totalRak: number;
  rakTerisi: number;
  rakKosong: number;
  okupansiPersen: number;
  suhuRataRata: string;
  pueScore: number;
}

export const DC_RACKS_DATA: DcRackItem[] = [
  {
    id: 'rack-01',
    ruangan: 'Main Data Center - Gedung BIDA Lt. 3',
    jenisRak: 'Rak 42U Server Blade & High Density Storage',
    totalRak: 26,
    rakTerisi: 22,
    rakKosong: 4,
    okupansiPersen: 84.6,
    suhuRataRata: '19.4°C',
    pueScore: 1.42,
  },
  {
    id: 'rack-02',
    ruangan: 'Disaster Recovery Center (DRC) - Sekupang',
    jenisRak: 'Rak 42U Replica & Offsite Backup Appliance',
    totalRak: 12,
    rakTerisi: 8,
    rakKosong: 4,
    okupansiPersen: 66.7,
    suhuRataRata: '20.1°C',
    pueScore: 1.48,
  },
  {
    id: 'rack-03',
    ruangan: 'Network Meet-Me Room (MMR) & ISP Interconnect',
    jenisRak: 'Rak Jaringan Patching Fiber Optik & Core Switch',
    totalRak: 4,
    rakTerisi: 3,
    rakKosong: 1,
    okupansiPersen: 75.0,
    suhuRataRata: '20.5°C',
    pueScore: 1.45,
  },
];

// Infrastruktur Server & Storage (Item #13 di PDF: REKAP INFRASTRUKTUR SERVER DAN STORAGE)
export interface ServerStorageItem {
  id: string;
  tanggalRekap: string;
  namaServer: string;
  brand: string;
  tipe: 'Hyperconverged HCI' | 'Storage SAN/NAS' | 'Database Appliance' | 'Blade Compute';
  jumlahUnit: number;
  tanggalGaransi: string;
  statusGaransi: 'Aktif' | 'Masa Perpanjangan' | 'Habis Garansi';
  eosStatus: 'Aman (Supported)' | 'Mendekati EOS (<6 Bln)' | 'EOS (End of Support)';
  penggunaan: string;
}

export const SERVER_STORAGE_DATA: ServerStorageItem[] = [
  {
    id: 'srv-01',
    tanggalRekap: '01/04/2026',
    namaServer: 'Cluster Nutanix Enterprise Cloud',
    brand: 'Nutanix / Supermicro',
    tipe: 'Hyperconverged HCI',
    jumlahUnit: 8,
    tanggalGaransi: '31/12/2027',
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'Virtualisasi Utama Aplikasi SIMKEU & Portal BP Batam',
  },
  {
    id: 'srv-02',
    tanggalRekap: '01/04/2026',
    namaServer: 'SAN Storage All-Flash OceanStor',
    brand: 'Huawei OceanStor',
    tipe: 'Storage SAN/NAS',
    jumlahUnit: 2,
    tanggalGaransi: '15/09/2028',
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'High IOPS Database Oracle SIMKEU & PostgreSQL GIS',
  },
  {
    id: 'srv-03',
    tanggalRekap: '01/04/2026',
    namaServer: 'Database Server Cluster (Exadata X8M)',
    brand: 'Oracle',
    tipe: 'Database Appliance',
    jumlahUnit: 2,
    tanggalGaransi: '30/06/2027',
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'Core SIMKEU, PNBP, Billing Kas & Bank',
  },
  {
    id: 'srv-04',
    tanggalRekap: '01/04/2026',
    namaServer: 'HPE ProLiant DL380 Gen9 (Legacy Node)',
    brand: 'HPE',
    tipe: 'Blade Compute',
    jumlahUnit: 4,
    tanggalGaransi: '31/03/2024',
    statusGaransi: 'Habis Garansi',
    eosStatus: 'Mendekati EOS (<6 Bln)',
    penggunaan: 'Archive File Server & Dev Environment (Rencana Migrasi TA 2026)',
  },
];

// Data Serangan Keamanan IT (Item #12 di PDF: DATA SERANGAN KEAMANAN IT)
export interface CyberThreatItem {
  id: string;
  periode: string;
  threatActivity: string;
  statusKeamanan: string;
  jmlSerangan: number;
}

export const CYBER_THREATS_DATA: CyberThreatItem[] = [
  {
    id: 'th-01',
    periode: 'April 2026',
    threatActivity: 'DDoS Volumetric & HTTP Flood ke Portal BP Batam',
    statusKeamanan: 'Termitigasi (Blocked by WAF)',
    jmlSerangan: 6420,
  },
  {
    id: 'th-02',
    periode: 'April 2026',
    threatActivity: 'Brute Force Authentication ke VPN & SSH Gateway',
    statusKeamanan: 'Termitigasi (Blocked by IPS)',
    jmlSerangan: 4210,
  },
  {
    id: 'th-03',
    periode: 'April 2026',
    threatActivity: 'SQL Injection (SQLi) & XSS pada Web Form Perizinan',
    statusKeamanan: 'Termitigasi (Blocked by OWASP Rule)',
    jmlSerangan: 2380,
  },
  {
    id: 'th-04',
    periode: 'Maret 2026',
    threatActivity: 'Malware & Phishing Attachment di Mail Gateway',
    statusKeamanan: 'Termitigasi (Quarantined)',
    jmlSerangan: 1250,
  },
  {
    id: 'th-05',
    periode: 'Maret 2026',
    threatActivity: 'Port Scanning & Reconnaissance Network Perimeter',
    statusKeamanan: 'Termitigasi (Filtered)',
    jmlSerangan: 560,
  },
];

// Data Permintaan Layanan IT / Helpdesk (Item #17 & #21 di PDF: DAFTAR LAYANAN TI)
export interface HelpdeskTicketItem {
  id: string;
  kode: string;
  namaLayanan: string;
  namaSubLayanan: string;
  kategoriPrioritas: 'Kritis (P1)' | 'Tinggi (P2)' | 'Sedang (P3)' | 'Rendah (P4)';
  normaWaktuRespon: string;
  normaWaktuSelesai: string;
  pengelolaLayanan: string;
  tiketMasuk: number;
  tiketTepatWaktu: number;
  capaianSla: number;
}

export const HELPDESK_TICKETS_DATA: HelpdeskTicketItem[] = [
  {
    id: 'hd-01',
    kode: 'LYN-TI-01',
    namaLayanan: 'Layanan Infrastruktur & Konektivitas',
    namaSubLayanan: 'Penanganan Gangguan Jaringan LAN, WiFi & FO Kantor',
    kategoriPrioritas: 'Tinggi (P2)',
    normaWaktuRespon: '15 Menit',
    normaWaktuSelesai: '2 Jam',
    pengelolaLayanan: 'Subdit Infrastruktur TI',
    tiketMasuk: 120,
    tiketTepatWaktu: 118,
    capaianSla: 98.3,
  },
  {
    id: 'hd-02',
    kode: 'LYN-TI-02',
    namaLayanan: 'Layanan Sistem Informasi & Aplikasi',
    namaSubLayanan: 'Troubleshooting Modul Transaksi SIMKEU, PNBP & Billing',
    kategoriPrioritas: 'Kritis (P1)',
    normaWaktuRespon: '10 Menit',
    normaWaktuSelesai: '4 Jam',
    pengelolaLayanan: 'Subdit Aplikasi & SI',
    tiketMasuk: 145,
    tiketTepatWaktu: 142,
    capaianSla: 97.9,
  },
  {
    id: 'hd-03',
    kode: 'LYN-TI-03',
    namaLayanan: 'Layanan Identitas & Hak Akses',
    namaSubLayanan: 'Reset Akun Single Sign-On (SSO), Email Dinas & Hak Akses SPBE',
    kategoriPrioritas: 'Sedang (P3)',
    normaWaktuRespon: '5 Menit',
    normaWaktuSelesai: '1 Jam',
    pengelolaLayanan: 'Subdit Tata Kelola TI',
    tiketMasuk: 85,
    tiketTepatWaktu: 85,
    capaianSla: 100.0,
  },
  {
    id: 'hd-04',
    kode: 'LYN-TI-04',
    namaLayanan: 'Layanan Perangkat Keras Pengguna',
    namaSubLayanan: 'Perbaikan PC/Laptop, Printer Dinas & Perangkat End-Point',
    kategoriPrioritas: 'Rendah (P4)',
    normaWaktuRespon: '30 Menit',
    normaWaktuSelesai: '8 Jam',
    pengelolaLayanan: 'Subdit Infrastruktur TI',
    tiketMasuk: 54,
    tiketTepatWaktu: 53,
    capaianSla: 98.1,
  },
  {
    id: 'hd-05',
    kode: 'LYN-TI-05',
    namaLayanan: 'Layanan Keamanan Informasi & TTE',
    namaSubLayanan: 'Penerbitan & Konfigurasi Sertifikat Digital TTE BSrE',
    kategoriPrioritas: 'Sedang (P3)',
    normaWaktuRespon: '20 Menit',
    normaWaktuSelesai: '24 Jam',
    pengelolaLayanan: 'Subdit Keamanan TI & CSIRT',
    tiketMasuk: 35,
    tiketTepatWaktu: 34,
    capaianSla: 97.1,
  },
];

// Jaringan Fiber Optik BP Batam (Item #2 di PDF: JARINGAN FIBER OPTIK)
export interface FiberOpticRoute {
  id: string;
  ruas: string;
  jalur: string;
  jln: string;
  namobj: string;
  jmlhcore: number;
  panjang: number; // KM
  brandfo: string;
  startpoint: string;
  endpoint: string;
  klasifikasi: string;
  remark: string;
}

export const FIBER_OPTIC_ROUTES: FiberOpticRoute[] = [
  {
    id: 'fo-01',
    ruas: 'RUAS-BC-NGY-01',
    jalur: 'Ring 1 Utama Batam Centre - Nagoya',
    jln: 'Jl. Engku Putri - Jl. Sudirman - Jl. Imam Bonjol',
    namobj: 'Koridor Pusat Pemerintahan & Bisnis Utama',
    jmlhcore: 96,
    panjang: 34.2,
    brandfo: 'Corning Single Mode 96C G.652D',
    startpoint: 'Data Center BIDA Batam Centre',
    endpoint: 'Kantor Perwakilan Nagoya',
    klasifikasi: 'Backbone Utama',
    remark: 'Normal Operasional (Redundan 2 Arah)',
  },
  {
    id: 'fo-02',
    ruas: 'RUAS-BC-BTA-02',
    jalur: 'Interkoneksi Pelabuhan Batu Ampar',
    jln: 'Jl. Ahmad Yani - Jl. Yos Sudarso - Dermaga Batu Ampar',
    namobj: 'Jalur Logistik & Gateway Maritim',
    jmlhcore: 72,
    panjang: 28.6,
    brandfo: 'Prysmian Armored SM 72C',
    startpoint: 'Data Center BIDA Batam Centre',
    endpoint: 'Dermaga Peti Kemas Batu Ampar',
    klasifikasi: 'Interkoneksi Kawasan',
    remark: 'Normal Operasional (Koneksi TOS)',
  },
  {
    id: 'fo-03',
    ruas: 'RUAS-BC-SKP-03',
    jalur: 'Backbone Batam Centre - Sekupang (DRC & RSBP)',
    jln: 'Jl. Gajah Mada - Jl. Dr. Cipto Mangunkusumo',
    namobj: 'Jalur Replikasi Disaster Recovery Center',
    jmlhcore: 96,
    panjang: 42.8,
    brandfo: 'Furukawa SM 96C Aerial & Duct',
    startpoint: 'Data Center BIDA Batam Centre',
    endpoint: 'DRC Sekupang & RSBP Batam',
    klasifikasi: 'Backbone Utama',
    remark: 'Normal Operasional (Replikasi Data 10 Gbps)',
  },
  {
    id: 'fo-04',
    ruas: 'RUAS-BC-BND-04',
    jalur: 'Spur Link Bandara Hang Nadim & KEK BAT',
    jln: 'Jl. Hang Tuah - Bandara Internasional Hang Nadim',
    namobj: 'Jalur Konektivitas Bandara & KEK Kedirgantaraan',
    jmlhcore: 48,
    panjang: 31.5,
    brandfo: 'Corning Armored SM 48C',
    startpoint: 'Batam Centre Sub-Node',
    endpoint: 'Terminal Bandara Hang Nadim',
    klasifikasi: 'Spur Link Distribusi',
    remark: 'Normal Operasional',
  },
  {
    id: 'fo-05',
    ruas: 'RUAS-BC-KBL-05',
    jalur: 'Kawasan Industri Kabil & Pelabuhan CPO',
    jln: 'Jl. Hang Kesturi Kabil',
    namobj: 'Jalur Pelayanan Industri Berat Kabil',
    jmlhcore: 48,
    panjang: 24.1,
    brandfo: 'Prysmian Duct SM 48C',
    startpoint: 'Simpang Kabil Sub-Node',
    endpoint: 'KPLI B3 & Dermaga CPO Kabil',
    klasifikasi: 'Spur Link Distribusi',
    remark: 'Normal Operasional',
  },
];

// Data Aplikasi BP Batam (Item #14 di PDF: DAFTAR APLIKASI)
export interface BpBatamAppItem {
  id: string;
  namaAplikasi: string;
  uraianAplikasi: string;
  unitOperasional: string;
  unitPengembang: string;
  basisAplikasi: 'Web' | 'Mobile' | 'Hybrid';
  kategoriAplikasi: 'Pelayanan Publik' | 'Administrasi Pemerintahan' | 'Keuangan & Aset' | 'Spasial GIS';
  status: 'Aktif Operasional' | 'Pemeliharaan' | 'Pengembangan';
  devYear: number;
}

export const BP_BATAM_APPS_DATA: BpBatamAppItem[] = [
  {
    id: 'app-01',
    namaAplikasi: 'SIMKEU BP Batam (Sistem Informasi Manajemen Keuangan)',
    uraianAplikasi: 'Pengelolaan anggaran DIPA, realisasi belanja, penerimaan kas, billing kasir dan laporan keuangan BLU',
    unitOperasional: 'Biro Keuangan',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Keuangan & Aset',
    status: 'Aktif Operasional',
    devYear: 2021,
  },
  {
    id: 'app-02',
    namaAplikasi: 'Sistem Informasi Pengelolaan Lahan (LandMS / SIPRAJA)',
    uraianAplikasi: 'Penerbitan SKPT, alokasi lahan, revisi PL, faktur perubahan peruntukan, dan integrasi peta spasial',
    unitOperasional: 'Direktorat Pengelolaan Lahan',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Spasial GIS',
    status: 'Aktif Operasional',
    devYear: 2020,
  },
  {
    id: 'app-03',
    namaAplikasi: 'E-Office & Tata Naskah Dinas Elektronik (TNDE)',
    uraianAplikasi: 'Distribusi surat masuk/keluar, disposisi pimpinan, nota dinas, dan pengarsipan digital',
    unitOperasional: 'Biro Umum',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Hybrid',
    kategoriAplikasi: 'Administrasi Pemerintahan',
    status: 'Aktif Operasional',
    devYear: 2022,
  },
  {
    id: 'app-04',
    namaAplikasi: 'Batam Online Single Submission (IBOSS / MPP Digital)',
    uraianAplikasi: 'Portal layanan perizinan terpadu investasi, izin usaha kawasan, lalu lintas barang, dan perizinan non-OSS',
    unitOperasional: 'PTSP BP Batam',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    devYear: 2023,
  },
  {
    id: 'app-05',
    namaAplikasi: 'Sistem Informasi Manajemen Pelabuhan (SIM-Pelabuhan)',
    uraianAplikasi: 'Manajemen pergerakan kapal (BMS), bongkar muat kargo peti kemas Batu Ampar, dan billing pass penumpang',
    unitOperasional: 'Direktorat Pengelolaan Kepelabuhanan',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    devYear: 2021,
  },
  {
    id: 'app-06',
    namaAplikasi: 'SIMRS Gos v2 (Sistem Informasi Rumah Sakit BP Batam)',
    uraianAplikasi: 'Rekam medis elektronik (RME), registrasi rawat inap/jalan IGD, resep obat farmasi, dan billing klaim BPJS',
    unitOperasional: 'Badan Usaha Rumah Sakit (RSBP)',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    devYear: 2023,
  },
];

// Arsitektur SIA (Item #19 di PDF) - 6 Domain SPBE
export interface SpbeDomainItem {
  domain: string;
  skor: number; // skala 1 - 5
  target: number;
  predikat: string;
  status: 'Memenuhi' | 'Sangat Baik' | 'Perlu Optimalisasi';
  keterangan: string;
}

export const SPBE_DOMAINS_DATA: SpbeDomainItem[] = [
  {
    domain: '1. Arsitektur Proses Bisnis',
    skor: 3.75,
    target: 3.50,
    predikat: 'Sangat Baik',
    status: 'Sangat Baik',
    keterangan: 'Peta proses bisnis level 0 s/d level 3 telah selaras PermenPAN-RB No. 19/2018',
  },
  {
    domain: '2. Arsitektur Layanan TI',
    skor: 3.80,
    target: 3.50,
    predikat: 'Sangat Baik',
    status: 'Sangat Baik',
    keterangan: 'Katalog layanan TI terpadu di portal Mal Pelayanan Publik (MPP) & Helpdesk',
  },
  {
    domain: '3. Arsitektur Data & Informasi',
    skor: 3.55,
    target: 3.50,
    predikat: 'Baik',
    status: 'Memenuhi',
    keterangan: 'Penerapan Satu Data BP Batam dan metadata statistik sektoral sesuai standar BPS',
  },
  {
    domain: '4. Arsitektur Aplikasi',
    skor: 3.70,
    target: 3.50,
    predikat: 'Sangat Baik',
    status: 'Sangat Baik',
    keterangan: 'Konsolidasi sistem informasi ke microservices & single sign-on (SSO) BP Batam',
  },
  {
    domain: '5. Arsitektur Infrastruktur',
    skor: 3.85,
    target: 3.50,
    predikat: 'Sangat Baik',
    status: 'Sangat Baik',
    keterangan: 'Data Center tersertifikasi Tier III, DRC Sekupang, dan 284 km jaringan FO mandiri',
  },
  {
    domain: '6. Arsitektur Keamanan Siber',
    skor: 3.45,
    target: 3.50,
    predikat: 'Baik',
    status: 'Perlu Optimalisasi',
    keterangan: 'Penerapan ISO 27001 dan penguatan SOC (Security Operations Center) bersama BSSN CSIRT',
  },
];

// PDSI Kamus Rumus & Calculated Fields (Berdasarkan PDF Halaman 40-43)
export interface PdsiCalculatedField {
  id: string;
  itemNo: number;
  catalogName: string;
  name: string;
  tag: string;
  category: 'Infrastruktur & DC' | 'Keamanan Siber' | 'Layanan & Helpdesk' | 'Tata Kelola SPBE & Data';
  formula: string;
  description: string;
  format: string;
  primaryTable: string;
  pdfPage: string;
  sifatData: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  attributes: string[];
}

export const PDSI_CALCULATED_FIELDS: PdsiCalculatedField[] = [
  {
    id: 'pdsi_calc_01',
    itemNo: 10,
    catalogName: 'Data Layanan Data Centre',
    name: 'SLA Uptime Ketersediaan Data Center (%)',
    tag: 'SLA-DC',
    category: 'Infrastruktur & DC',
    formula: '((SUM([total_menit_periode]) - SUM([menit_downtime])) / SUM([total_menit_periode])) * 100',
    description: 'Rasio ketersediaan layanan colocation, server blade, dan virtual machine Data Center BP Batam terhadap total jam operasional bulanan (Target: ≥ 99,90%).',
    format: 'Percentage (0.00%)',
    primaryTable: 'pdsi_layanan_data_centre (Item #10)',
    pdfPage: 'Halaman 42',
    sifatData: 'TERBUKA',
    attributes: ['TAHUN', 'KELOMPOK LAYANAN', 'KATEGORI LAYANAN', 'JENIS LAYANAN', 'DETAIL LAYANAN', 'SATUAN', 'TARIF LAYANAN', 'KETERANGAN'],
  },
  {
    id: 'pdsi_calc_02',
    itemNo: 8,
    catalogName: 'Data Rak Data Center',
    name: 'Persentase Okupansi Rak Data Center (Rack Occupancy Rate)',
    tag: 'DC-RACK',
    category: 'Infrastruktur & DC',
    formula: 'SUM([pdsi_rak_data_center].[jumlah_rak_terisi]) / SUM([pdsi_rak_data_center].[total_rak]) * 100',
    description: 'Tingkat utilisasi rak server 42U di Main DC BIDA dan DRC Sekupang terhadap total kapasitas rak yang tersedia.',
    format: 'Percentage (0.0%)',
    primaryTable: 'pdsi_data_rak_data_center (Item #8)',
    pdfPage: 'Halaman 41',
    sifatData: 'TERBUKA',
    attributes: ['RUANGAN', 'JENIS RAK', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'TOTAL RAK', 'JUMLAH RAK TERISI', 'JUMLAH RAK KOSONG'],
  },
  {
    id: 'pdsi_calc_03',
    itemNo: 12,
    catalogName: 'Data Serangan Keamanan IT',
    name: 'Tingkat Mitigasi Ancaman Siber (Threat Mitigation Rate)',
    tag: 'CYBER-SEC',
    category: 'Keamanan Siber',
    formula: 'SUM(IIF([pdsi_serangan_keamanan_it].[status_keamanan] = "Termitigasi", [pdsi_serangan_keamanan_it].[jml_serangan], 0)) / SUM([pdsi_serangan_keamanan_it].[jml_serangan]) * 100',
    description: 'Persentase serangan siber (DDoS, Malware, Brute Force, Web Defacement) yang berhasil dinetralkan otomatis oleh WAF, IPS, dan SOC BP Batam.',
    format: 'Percentage (0.0%)',
    primaryTable: 'pdsi_data_serangan_keamanan_it (Item #12)',
    pdfPage: 'Halaman 42',
    sifatData: 'TERTUTUP',
    attributes: ['PERIODE', 'THREAT ACTIVITY', 'STATUS KEAMANAN', 'JML SERANGAN', 'TANGGAL REKAP'],
  },
  {
    id: 'pdsi_calc_04',
    itemNo: 21,
    catalogName: 'Data Permintaan Layanan IT (Helpdesk)',
    name: 'SLA Penyelesaian Layanan Helpdesk Tepat Waktu',
    tag: 'SLA-HD',
    category: 'Layanan & Helpdesk',
    formula: 'SUM(IIF([durasi_penyelesaian_jam] <= [norma_waktu_penanganan], 1, 0)) / COUNT([id_tiket]) * 100',
    description: 'Kesesuaian durasi waktu penanganan tiket helpdesk oleh tim teknis PDSI terhadap norma waktu standar yang ditetapkan dalam SOP Layanan TI.',
    format: 'Percentage (0.0%)',
    primaryTable: 'pdsi_permintaan_layanan_it (Item #21)',
    pdfPage: 'Halaman 43',
    sifatData: 'TERBUKA',
    attributes: ['TAHUN', 'BULAN', 'NAMA LAYANAN', 'JUMLAH', 'NORMA WAKTU RESPON', 'NORMA WAKTU SELESAI'],
  },
  {
    id: 'pdsi_calc_05',
    itemNo: 2,
    catalogName: 'Jaringan Fiber Optik (FO)',
    name: 'Rasio Utilisasi Core Kabel Fiber Optik BP Batam',
    tag: 'NET-FO',
    category: 'Infrastruktur & DC',
    formula: 'SUM([pdsi_jaringan_fiber_optik].[core_aktif]) / SUM([pdsi_jaringan_fiber_optik].[jmlhcore]) * 100',
    description: 'Persentase serat optik (core) yang sedang aktif mentransmisikan traffic data antar unit satker dari total core yang digelar di sepanjang 284,5 km ruas jalan Batam.',
    format: 'Percentage (0.0%)',
    primaryTable: 'pdsi_jaringan_fiber_optik (Item #2)',
    pdfPage: 'Halaman 40',
    sifatData: 'TERBATAS',
    attributes: ['JALUR', 'JLN', 'JMLHCORE', 'PANJANG', 'BRANDFO', 'STARTPOINT', 'ENDPOINT', 'STATUS'],
  },
  {
    id: 'pdsi_calc_06',
    itemNo: 14,
    catalogName: 'Data Aplikasi BP Batam',
    name: 'Persentase Aplikasi BP Batam Terintegrasi TTE (BSrE)',
    tag: 'APP-TTE',
    category: 'Tata Kelola SPBE & Data',
    formula: 'COUNT(IIF([pdsi_aplikasi].[tanda_tangan_elektronik] = "Sudah TTE", [pdsi_aplikasi].[id], NULL)) / COUNT([pdsi_aplikasi].[id]) * 100',
    description: 'Tingkat adopsi Tanda Tangan Elektronik tersertifikasi Balai Sertifikasi Elektronik (BSrE BSSN) pada seluruh modul aplikasi operasional BP Batam.',
    format: 'Percentage (0.0%)',
    primaryTable: 'pdsi_data_aplikasi_bp_batam (Item #14)',
    pdfPage: 'Halaman 42',
    sifatData: 'TERTUTUP',
    attributes: ['NAMA APLIKASI', 'URAIAN APLIKASI', 'BASIS APLIKASI', 'TIPE LISENSI', 'BAHASA PEMOGRAMAN', 'TANDA TANGAN ELEKTRONIK', 'STATUS'],
  },
  {
    id: 'pdsi_calc_07',
    itemNo: 4,
    catalogName: 'Daftar Data System Penghubung dan Integrasi Data',
    name: 'Tingkat Keberhasilan Interkoneksi API Antar Sistem',
    tag: 'API-INT',
    category: 'Tata Kelola SPBE & Data',
    formula: 'COUNT(IIF([pdsi_integrasi].[status] = "Aktif Terhubung", [pdsi_integrasi].[id], NULL)) / COUNT([pdsi_integrasi].[id]) * 100',
    description: 'Ketersediaan layanan REST API / Web Services penghubung Satu Data BP Batam dengan instansi eksternal (Kemenkeu, BSSN, Pemko Batam, INSW).',
    format: 'Percentage (0.0%)',
    primaryTable: 'pdsi_integrasi_data (Item #4)',
    pdfPage: 'Halaman 41',
    sifatData: 'TERTUTUP',
    attributes: ['TAHUN', 'ORGANISASI PENYEDIA', 'SISTEM TERHUBUNG', 'TIPE KOMUNIKASI', 'APLIKASI TERHUBUNG', 'DATA', 'STATUS'],
  },
  {
    id: 'pdsi_calc_08',
    itemNo: 13,
    catalogName: 'Rekap Infrastruktur Server dan Storage',
    name: 'Rasio Server End of Support (EOS Risk Index)',
    tag: 'EOS-SRV',
    category: 'Infrastruktur & DC',
    formula: 'COUNT(IIF([pdsi_infrastruktur_server].[eos] = "Ya", [pdsi_infrastruktur_server].[id], NULL)) / COUNT([pdsi_infrastruktur_server].[id]) * 100',
    description: 'Proporsi server fisik yang telah melewati masa dukungan resmi pabrikan (EOS) dan membutuhkan rencana penyegaran perangkat pada RBA/DIPA tahun berjalan.',
    format: 'Percentage (0.0%)',
    primaryTable: 'pdsi_infrastruktur_server_storage (Item #13)',
    pdfPage: 'Halaman 42',
    sifatData: 'TERTUTUP',
    attributes: ['NAMA SERVER', 'JUMLAH', 'TIPE', 'BRAND', 'TGL GARANSI', 'STATUS GARANSI', 'EOS'],
  },
  {
    id: 'pdsi_calc_09',
    itemNo: 18,
    catalogName: 'Laporan Pemantauan dan Evaluasi SPBE',
    name: 'Indeks Kematangan SPBE BP Batam (Skala 1 - 5)',
    tag: 'SPBE-IDX',
    category: 'Tata Kelola SPBE & Data',
    formula: 'SUM([pdsi_evaluasi_spbe].[nilai_terbobot]) / 100',
    description: 'Nilai indeks komposit kematangan penyelenggaraan SPBE di 4 domain (Kebijakan, Tata Kelola, Manajemen, dan Layanan SPBE).',
    format: 'Decimal (0.00)',
    primaryTable: 'pdsi_evaluasi_spbe (Item #18)',
    pdfPage: 'Halaman 43',
    sifatData: 'TERTUTUP',
    attributes: ['TAHUN', 'DOMAIN', 'ASPEK', 'INDIKATOR', 'BOBOT', 'NILAI'],
  },
  {
    id: 'pdsi_calc_10',
    itemNo: 7,
    catalogName: 'Rekap Kerusakan dan Perbaikan Perangkat TI',
    name: 'Mean Time To Repair (MTTR) Gangguan Perangkat TI',
    tag: 'MTTR-TI',
    category: 'Layanan & Helpdesk',
    formula: 'SUM([pdsi_kerusakan_ti].[durasi_perbaikan_jam]) / COUNT([pdsi_kerusakan_ti].[id_kerusakan])',
    description: 'Rata-rata jam kerja yang dibutuhkan untuk menyelesaikan perbaikan perangkat keras atau server sejak tiket dilaporkan hingga berfungsi kembali.',
    format: 'Decimal (Jam)',
    primaryTable: 'pdsi_rekap_kerusakan_ti (Item #7)',
    pdfPage: 'Halaman 41',
    sifatData: 'TERTUTUP',
    attributes: ['TANGGAL', 'SEMESTER', 'TAHUN', 'KERUSAKAN KEGIATAN', 'LOKASI', 'JUMLAH', 'RUANGAN'],
  },
  {
    id: 'pdsi_calc_11',
    itemNo: 1,
    catalogName: 'Informasi Business Intelegent BP Batam',
    name: 'Tingkat Keterbaruan Ekstrak Data BI (Refresh Freshness)',
    tag: 'BI-REFRESH',
    category: 'Tata Kelola SPBE & Data',
    formula: 'DATEDIFF("day", MAX([pdsi_bi].[pembaharuan_terakhir]), TODAY())',
    description: 'Selisih hari antara pembaruan data extract terakhir dari database SIMKEU/OLTP ke repositori dashboard Business Intelligence.',
    format: 'Integer (Hari)',
    primaryTable: 'pdsi_business_intelligence (Item #1)',
    pdfPage: 'Halaman 40',
    sifatData: 'TERBUKA',
    attributes: ['UNIT KERJA', 'NAMA DASHBOARD', 'JUMLAH WORKSHEET', 'PEMBAHARUAN TERAKHIR'],
  },
];

// =========================================================================
// 21 TABEL DATA KATALOG RESMI PUSAT DATA DAN SISTEM INFORMASI (PDSI) BP BATAM
// (Disinkronkan langsung dari Dokumen Master Katalog Data BP Batam, Hal 40 s.d 43)
// =========================================================================
export interface PdsiDataCatalogItem {
  no: number;
  namaData: string;
  jenisData: string;
  periodeData: string;
  sifatData: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  atributData: string[];
  tabelDatabase: string;
  keterangan: string;
}

export const PDSI_DATA_CATALOG: PdsiDataCatalogItem[] = [
  {
    no: 1,
    namaData: 'Informasi Business Intelegent BP Batam',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERBUKA',
    atributData: ['UNIT KERJA', 'NAMA DASHBOARD', 'JUMLAH WORKSHEET', 'PEMBAHARUAN TERAKHIR'],
    tabelDatabase: 'pdsi_business_intelligence',
    keterangan: 'Metadata dashboard analitik BI dan status pembaruan data extract dari database transaksional.',
  },
  {
    no: 2,
    namaData: 'Jaringan Fiber Optik',
    jenisData: 'DATA SPASIAL / TEKNIS',
    periodeData: 'PERSEMESTER',
    sifatData: 'TERBATAS',
    atributData: ['METADATA', 'REMARK', 'SHAPE_Leng', 'NAMOBJ', 'SRS_ID', 'FCODE', 'OBJECTID', 'JALUR', 'JLN', 'JMLHCORE', 'PANJANG', 'BRANDFO', 'STARTPOINT', 'ENDPOINT', 'RUAS', 'KLASIFIKASI'],
    tabelDatabase: 'pdsi_jaringan_fiber_optik',
    keterangan: 'Inventarisasi bentang kabel serat optik bawah tanah dan tiang udara 284,5 KM interkoneksi gedung BP Batam.',
  },
  {
    no: 3,
    namaData: 'Data Bandwidth Internet BP Batam',
    jenisData: 'DATA OPERASIONAL',
    periodeData: 'PERBULAN',
    sifatData: 'TERBATAS',
    atributData: ['BULAN', 'KAPASITAS BANDWIDTH', 'TRAFIK RATA-RATA', 'PEAK TRAFFIC', 'UTILISASI PERSEN'],
    tabelDatabase: 'pdsi_bandwidth_internet',
    keterangan: 'Pemantauan utilisasi kapasitas pipa bandwidth internet gateway kantor BP Batam Batam Centre.',
  },
  {
    no: 4,
    namaData: 'Daftar Data System Penghubung dan Integrasi Data',
    jenisData: 'DATA SISTEM',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['TAHUN', 'ORGANISASI PENYEDIA', 'SISTEM TERHUBUNG', 'TIPE KOMUNIKASI', 'APLIKASI TERHUBUNG', 'DATA', 'STATUS'],
    tabelDatabase: 'pdsi_integrasi_data',
    keterangan: 'Katalog interkoneksi REST API / Web Services Satu Data BP Batam dengan K/L eksternal (Kemenkeu, BSSN, INSW).',
  },
  {
    no: 5,
    namaData: 'Data Layanan Colocation & Virtual Machine',
    jenisData: 'DATA LAYANAN',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['KLIEN / SATKER', 'NAMA VM', 'ALOKASI VCPU', 'ALOKASI RAM GB', 'STORAGE TIER', 'STATUS HOSTING'],
    tabelDatabase: 'pdsi_colocation_vm',
    keterangan: 'Distribusi penyewaan dan alokasi mesin virtual server aplikasi internal maupun eksternal tenant.',
  },
  {
    no: 6,
    namaData: 'Data Pengelolaan Domain & Subdomain BP Batam',
    jenisData: 'DATA SISTEM',
    periodeData: 'PERTAHUN',
    sifatData: 'TERBUKA',
    atributData: ['SUBDOMAIN', 'NAMA SISTEM', 'IP ADDRESS', 'STATUS AKTIF', 'SSL EXPIRY', 'UNIT PENGELOLA'],
    tabelDatabase: 'pdsi_domain_bpbatam',
    keterangan: 'Daftar domain bpbatam.go.id, konfigurasi DNS server, dan sertifikat enkripsi SSL/TLS publik.',
  },
  {
    no: 7,
    namaData: 'Rekap Kerusakan dan Perbaikan Perangkat TI',
    jenisData: 'DATA LOGISTIK TI',
    periodeData: 'PERSEMESTER',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL', 'SEMESTER', 'TAHUN', 'KERUSAKAN KEGIATAN', 'LOKASI', 'JUMLAH', 'RUANGAN'],
    tabelDatabase: 'pdsi_rekap_kerusakan_ti',
    keterangan: 'Riwayat penanganan kerusakan hardware PC, printer, switch, dan modul server operasional.',
  },
  {
    no: 8,
    namaData: 'Data Rak Data Center',
    jenisData: 'DATA FASILITAS',
    periodeData: 'PERBULAN',
    sifatData: 'TERBUKA',
    atributData: ['RUANGAN', 'JENIS RAK', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'TOTAL RAK', 'JUMLAH RAK TERISI', 'JUMLAH RAK KOSONG'],
    tabelDatabase: 'pdsi_data_rak_data_center',
    keterangan: 'Tingkat kepadatan rak kabinet server (42U) pada Main Data Center BIDA dan DRC Sekupang.',
  },
  {
    no: 9,
    namaData: 'Data Suhu dan Kelembapan Ruang Server',
    jenisData: 'DATA SENSOR TELEMETRI',
    periodeData: 'PERHARI',
    sifatData: 'TERTUTUP',
    atributData: ['SENSOR ID', 'RUANG DC', 'SUHU CELCIUS', 'KELEMBABAN RH', 'AMBANG BATAS', 'STATUS ALARM'],
    tabelDatabase: 'pdsi_suhu_kelembaban_dc',
    keterangan: 'Log lingkungan pendingin PAC (Precision Air Conditioning) ruang server sesuai standar ASHRAE.',
  },
  {
    no: 10,
    namaData: 'Data Layanan Data Centre',
    jenisData: 'DATA LAYANAN / TARIF',
    periodeData: 'PERTAHUN',
    sifatData: 'TERBUKA',
    atributData: ['TAHUN', 'KELOMPOK LAYANAN', 'KATEGORI LAYANAN', 'JENIS LAYANAN', 'DETAIL LAYANAN', 'SATUAN', 'TARIF LAYANAN', 'KETERANGAN'],
    tabelDatabase: 'pdsi_layanan_data_centre',
    keterangan: 'Katalog tarif resmi layanan fasilitas Data Center Tier III BP Batam berdasarkan Perka BP Batam.',
  },
  {
    no: 11,
    namaData: 'Data Kepuasan Pelanggan Data Centre',
    jenisData: 'DATA EVALUASI',
    periodeData: 'PERTAHUN',
    sifatData: 'TERBUKA',
    atributData: ['TAHUN', 'KATEGORI', 'TINGKAT KEPUASAN', 'PERSENTASE'],
    tabelDatabase: 'pdsi_kepuasan_pelanggan_dc',
    keterangan: 'Survei indeks kepuasan pengguna layanan fasilitas Colocation dan Data Center Tier III BP Batam.',
  },
  {
    no: 12,
    namaData: 'Data Serangan Keamanan IT',
    jenisData: 'DATA KEAMANAN',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['PERIODE', 'THREAT ACTIVITY', 'STATUS KEAMANAN', 'JML SERANGAN'],
    tabelDatabase: 'pdsi_serangan_keamanan_it',
    keterangan: 'Rekapitulasi serangan siber (DDoS, Ransomware, Web Defacement, Phishing) yang ditindaklanjuti SOC.',
  },
  {
    no: 13,
    namaData: 'Rekap Infrastruktur Server dan Storage',
    jenisData: 'DATA ASET TI',
    periodeData: 'PERSEMESTER',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL REKAP', 'NAMA SERVER', 'JUMLAH', 'TIPE', 'BRAND', 'TGL GARANSI', 'STATUS GARANSI', 'EOS'],
    tabelDatabase: 'pdsi_infrastruktur_server_storage',
    keterangan: 'Daftar server rackmount, blade chassis, dan storage area network (SAN) beserta status siklus hidupnya.',
  },
  {
    no: 14,
    namaData: 'Data Aplikasi BP Batam',
    jenisData: 'DATA SISTEM',
    periodeData: 'PERSEMESTER',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA APLIKASI', 'URAIAN APLIKASI', 'BASIS APLIKASI', 'TIPE LISENSI APLIKASI', 'BAHASA PEMOGRAMAN', 'KERANGKA PENGEMBANG', 'UNIT PENGEMBANG', 'UNIT OPERASIONAL', 'INSTANSI', 'KATEGORI APLIKASI', 'TANDA TANGAN ELEKTRONIK', 'KLASIFIKASI APLIKASI', 'DOMAIN', 'STATUS', 'DEV YEAR'],
    tabelDatabase: 'pdsi_data_aplikasi',
    keterangan: 'Inventarisasi seluruh aplikasi operasional pelayanan publik dan administrasi internal BP Batam.',
  },
  {
    no: 15,
    namaData: 'Rekapitulasi Backup Data & Snapshot System',
    jenisData: 'DATA OPERASIONAL',
    periodeData: 'PERMINGGU',
    sifatData: 'TERTUTUP',
    atributData: ['DATABASE / VM', 'JENIS BACKUP', 'UKURAN GB', 'LOKASI TAPE / DRC', 'STATUS RESTORE TEST', 'VERIFIKASI'],
    tabelDatabase: 'pdsi_backup_snapshot',
    keterangan: 'Pemantauan eksekusi pencadangan data basis data primer dan replikasi data ke DRC Sekupang.',
  },
  {
    no: 16,
    namaData: 'Data Lisensi Software dan Sistem Operasi',
    jenisData: 'DATA LISENSI',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA SOFTWARE', 'PRODUSEN', 'JUMLAH LISENSI', 'KATEGORI LISENSI', 'MASA BERLAKU', 'STATUS KEPATUHAN'],
    tabelDatabase: 'pdsi_lisensi_software',
    keterangan: 'Manajemen kepatuhan lisensi perangkat lunak server (VMware, Windows Server, RedHat, Oracle DB).',
  },
  {
    no: 17,
    namaData: 'Daftar Layanan TI',
    jenisData: 'DATA LAYANAN',
    periodeData: 'PERTAHUN',
    sifatData: 'TERBUKA',
    atributData: ['KODE', 'NAMA LAYANAN', 'NAMA SUB LAYANAN', 'KATEGORI PRIORITAS PENANGANAN LAYANAN', 'NORMA WAKTU RESPON', 'NORMA WAKTU PENYELESAIAN PENANGANAN', 'PENGELOLA LAYANAN'],
    tabelDatabase: 'pdsi_daftar_layanan_ti',
    keterangan: 'Katalog SLA standar norma waktu respon dan penyelesaian layanan Helpdesk TI BP Batam.',
  },
  {
    no: 18,
    namaData: 'Laporan Pemantauan dan Evaluasi EPSS',
    jenisData: 'DATA EVALUASI',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['TAHUN', 'DOMAIN', 'ASPEK', 'INDIKATOR', 'BOBOT', 'NILAI'],
    tabelDatabase: 'pdsi_evaluasi_epss',
    keterangan: 'Hasil audit dan penilaian mandiri indeks SPBE / EPSS BP Batam berdasarkan instrumen KemenPAN-RB.',
  },
  {
    no: 19,
    namaData: 'Data Peta Rencana Arsitektur SPBE',
    jenisData: 'DOKUMEN STRATEGIS',
    periodeData: '5 TAHUNAN',
    sifatData: 'TERBUKA',
    atributData: ['DOMAIN ARSITEKTUR', 'INISIASI STRATEGIS', 'TARGET TAHUN', 'UNIT PENANGGUNG JAWAB', 'STATUS CAPAIAN'],
    tabelDatabase: 'pdsi_arsitektur_spbe',
    keterangan: 'Peta rencana arsitektur 6 domain SPBE BP Batam (Bisnis, Layanan, Data, Aplikasi, Infra, Keamanan).',
  },
  {
    no: 20,
    namaData: 'Laporan Pemantauan dan Evaluasi EPSS',
    jenisData: 'DATA EVALUASI',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['TAHUN', 'DOMAIN', 'ASPEK', 'INDIKATOR', 'BOBOT', 'NILAI'],
    tabelDatabase: 'pdsi_evaluasi_epss',
    keterangan: 'Evaluasi Penyelenggaraan Statistik Sektoral dan Kematangan SPBE BP Batam.',
  },
  {
    no: 21,
    namaData: 'Data Permintaan Layanan IT (Helpdesk)',
    jenisData: 'DATA OPERASIONAL',
    periodeData: 'PERBULAN',
    sifatData: 'TERBUKA',
    atributData: ['TAHUN', 'BULAN', 'NAMA LAYANAN', 'JUMLAH'],
    tabelDatabase: 'pdsi_permintaan_layanan_it_helpdesk',
    keterangan: 'Statistik tiket aduan dan permohonan layanan teknologi informasi yang masuk melalui portal Helpdesk.',
  },
];

