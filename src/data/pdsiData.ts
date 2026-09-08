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
    id: 'uptime_dc',
    title: 'Uptime & Ketersediaan Data Center',
    value: '99,94%',
    target: 'SLA: 99,90% (Tier 3 Standard)',
    percentage: 'High Availability',
    trend: {
      direction: 'up',
      value: '+0,04%',
      period: '(MoM)',
      isPositive: true,
    },
    sparkline: [99.85, 99.88, 99.91, 99.92, 99.90, 99.93, 99.94],
    badge: {
      text: 'Tier III Ready',
      variant: 'success',
    },
    colorTheme: 'emerald',
    formulaRef: 'Item #10: SLA Uptime = ((Total Menit - Menit Downtime) / Total Menit) * 100',
  },
  {
    id: 'sla_helpdesk',
    title: 'SLA Penyelesaian Layanan TI (Helpdesk)',
    value: '94,2%',
    target: 'Target Norma: ≥ 90,0%',
    percentage: '418 dari 444 Tiket Selesai Tepat Waktu',
    trend: {
      direction: 'up',
      value: '+2,8%',
      period: '(MoM)',
      isPositive: true,
    },
    sparkline: [88.5, 89.2, 91.0, 91.8, 92.5, 93.4, 94.2],
    badge: {
      text: 'Prima',
      variant: 'success',
    },
    colorTheme: 'blue',
    formulaRef: 'Item #21: SLA Tepat Waktu = (Tiket Selesai ≤ Norma / Total Tiket) * 100',
  },
  {
    id: 'indeks_spbe',
    title: 'Indeks SPBE BP Batam (Evaluasi KemenPAN-RB)',
    value: '3,68',
    target: 'Skala 1 - 5 (Target: 3,50)',
    percentage: 'Predikat "Sangat Baik"',
    trend: {
      direction: 'up',
      value: '+0,24',
      period: '(YoY)',
      isPositive: true,
    },
    sparkline: [3.12, 3.25, 3.38, 3.44, 3.52, 3.60, 3.68],
    badge: {
      text: 'Sangat Baik',
      variant: 'success',
    },
    colorTheme: 'purple',
    formulaRef: 'Item #18: Indeks SPBE = Evaluasi 47 Indikator SPBE Terbobot',
  },
  {
    id: 'cyber_mitigation',
    title: 'Tingkat Mitigasi Ancaman Siber (SOC)',
    value: '98,7%',
    target: '14.820 Serangan Terdeteksi',
    percentage: '14.627 Serangan Berhasil Dinetralkan',
    trend: {
      direction: 'up',
      value: '+1,2%',
      period: '(MoM)',
      isPositive: true,
    },
    sparkline: [96.2, 96.8, 97.4, 97.9, 98.1, 98.5, 98.7],
    badge: {
      text: 'SOC Protected',
      variant: 'info',
    },
    colorTheme: 'teal',
    formulaRef: 'Item #12: Threat Mitigation Rate = (Serangan Termitigasi / Total Serangan) * 100',
  },
  {
    id: 'rack_occupancy',
    title: 'Okupansi Rak Server Data Center',
    value: '78,6%',
    target: 'Kapasitas 42 Rak (DC + DRC)',
    percentage: '33 Rak Terisi • 9 Rak Tersedia',
    trend: {
      direction: 'up',
      value: '+4,8%',
      period: '(QoQ)',
      isPositive: true,
    },
    sparkline: [68, 70, 72, 74, 75, 76, 78.6],
    colorTheme: 'amber',
    formulaRef: 'Item #8: Rack Occupancy Rate = (Rak Terisi / Total Rak) * 100',
  },
  {
    id: 'fiber_backbone',
    title: 'Jaringan Fiber Optik (FO) Aktif',
    value: '284,5 KM',
    target: 'Cakupan: 8 Wilayah BP Batam',
    percentage: '81,4% Rata-rata Utilitas Core',
    trend: {
      direction: 'up',
      value: '+12,5 km',
      period: '(YTD 2026)',
      isPositive: true,
    },
    sparkline: [240, 252, 265, 270, 275, 280, 284.5],
    colorTheme: 'blue',
    formulaRef: 'Item #2 & #5: Total Panjang FO = SUM([PANJANG]) km',
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

// Infrastruktur Server & Storage (Item #13 di PDF)
export interface ServerStorageItem {
  id: string;
  namaServer: string;
  brand: string;
  tipe: 'Hyperconverged HCI' | 'Storage SAN/NAS' | 'Database Appliance' | 'Blade Compute';
  jumlahUnit: number;
  statusGaransi: 'Aktif' | 'Masa Perpanjangan' | 'Habis Garansi';
  eosStatus: 'Aman (Supported)' | 'Mendekati EOS (<6 Bln)' | 'EOS (End of Support)';
  penggunaan: string;
}

export const SERVER_STORAGE_DATA: ServerStorageItem[] = [
  {
    id: 'srv-01',
    namaServer: 'Cluster Nutanix Enterprise Cloud',
    brand: 'Nutanix / Supermicro',
    tipe: 'Hyperconverged HCI',
    jumlahUnit: 8,
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'Virtualisasi Utama Aplikasi SIMKEU & Portal BP Batam',
  },
  {
    id: 'srv-02',
    namaServer: 'SAN Storage All-Flash OceanStor',
    brand: 'Huawei OceanStor',
    tipe: 'Storage SAN/NAS',
    jumlahUnit: 2,
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'High IOPS Database Oracle SIMKEU & PostgreSQL GIS',
  },
  {
    id: 'srv-03',
    namaServer: 'Database Server Cluster (Exadata X8M)',
    brand: 'Oracle',
    tipe: 'Database Appliance',
    jumlahUnit: 2,
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'Core SIMKEU, PNBP, Billing Kas & Bank',
  },
  {
    id: 'srv-04',
    namaServer: 'HPE ProLiant DL380 Gen9 (Legacy Node)',
    brand: 'HPE',
    tipe: 'Blade Compute',
    jumlahUnit: 4,
    statusGaransi: 'Habis Garansi',
    eosStatus: 'Mendekati EOS (<6 Bln)',
    penggunaan: 'Archive File Server & Dev Environment (Rencana Migrasi TA 2026)',
  },
];

// Data Serangan Keamanan IT (Item #12 di PDF)
export interface CyberThreatItem {
  id: string;
  threatActivity: string;
  kategori: 'Volumetric Attack' | 'Application Layer' | 'Credential Abuse' | 'Social Engineering';
  jmlSerangan: number;
  statusKeamanan: 'Termitigasi (Blocked)' | 'Investigasi / Deep Inspection';
  mitigasiPersen: number;
  vektorUtama: string;
}

export const CYBER_THREATS_DATA: CyberThreatItem[] = [
  {
    id: 'th-01',
    threatActivity: 'DDoS & SYN Flood ke Portal Publik',
    kategori: 'Volumetric Attack',
    jmlSerangan: 6420,
    statusKeamanan: 'Termitigasi (Blocked)',
    mitigasiPersen: 99.8,
    vektorUtama: 'Cloudflare WAF & Edge Anti-DDoS Scrubbing',
  },
  {
    id: 'th-02',
    threatActivity: 'Brute Force Attack ke VPN & SSH Gateway',
    kategori: 'Credential Abuse',
    jmlSerangan: 4210,
    statusKeamanan: 'Termitigasi (Blocked)',
    mitigasiPersen: 99.1,
    vektorUtama: 'Fail2ban, GeoIP Blocking & FortiGate IPS Rule',
  },
  {
    id: 'th-03',
    threatActivity: 'SQL Injection & XSS pada Web Form',
    kategori: 'Application Layer',
    jmlSerangan: 2380,
    statusKeamanan: 'Termitigasi (Blocked)',
    mitigasiPersen: 98.4,
    vektorUtama: 'ModSecurity WAF & OWASP Top 10 Rule Set',
  },
  {
    id: 'th-04',
    threatActivity: 'Malware & Ransomware Attachment (Email Gate)',
    kategori: 'Social Engineering',
    jmlSerangan: 1250,
    statusKeamanan: 'Termitigasi (Blocked)',
    mitigasiPersen: 97.2,
    vektorUtama: 'Email Sandboxing & Antivirus Gateway',
  },
  {
    id: 'th-05',
    threatActivity: 'Suspicious Lateral Movement / Port Scanning',
    kategori: 'Credential Abuse',
    jmlSerangan: 560,
    statusKeamanan: 'Investigasi / Deep Inspection',
    mitigasiPersen: 94.6,
    vektorUtama: 'EDR Wazuh & BSSN CSIRT Threat Intelligence',
  },
];

// Data Permintaan Layanan IT / Helpdesk (Item #21 & #17 di PDF)
export interface HelpdeskTicketItem {
  id: string;
  namaLayanan: string;
  kategori: 'Infrastruktur Jaringan' | 'Aplikasi Bisnis' | 'Perangkat Keras' | 'Akses & Akun' | 'Keamanan';
  jumlahTiket: number;
  selesaiTepatWaktu: number;
  normaWaktuRespon: string;
  normaWaktuSelesai: string;
  realisasiAvgJam: number;
  slaPercent: number;
}

export const HELPDESK_TICKETS_DATA: HelpdeskTicketItem[] = [
  {
    id: 'hd-01',
    namaLayanan: 'Gangguan Akses Jaringan LAN & WiFi Kantor',
    kategori: 'Infrastruktur Jaringan',
    jumlahTiket: 124,
    selesaiTepatWaktu: 119,
    normaWaktuRespon: '15 Menit',
    normaWaktuSelesai: '2 Jam',
    realisasiAvgJam: 1.2,
    slaPercent: 96.0,
  },
  {
    id: 'hd-02',
    namaLayanan: 'Troubleshooting Aplikasi SIMKEU & PNBP',
    kategori: 'Aplikasi Bisnis',
    jumlahTiket: 98,
    selesaiTepatWaktu: 92,
    normaWaktuRespon: '10 Menit',
    normaWaktuSelesai: '4 Jam',
    realisasiAvgJam: 2.8,
    slaPercent: 93.9,
  },
  {
    id: 'hd-03',
    namaLayanan: 'Reset Akun, Email Dinas & Hak Akses SPBE',
    kategori: 'Akses & Akun',
    jumlahTiket: 86,
    selesaiTepatWaktu: 84,
    normaWaktuRespon: '5 Menit',
    normaWaktuSelesai: '1 Jam',
    realisasiAvgJam: 0.4,
    slaPercent: 97.7,
  },
  {
    id: 'hd-04',
    namaLayanan: 'Perbaikan PC/Laptop, Printer & Perangkat Kerja',
    kategori: 'Perangkat Keras',
    jumlahTiket: 74,
    selesaiTepatWaktu: 67,
    normaWaktuRespon: '30 Menit',
    normaWaktuSelesai: '8 Jam',
    realisasiAvgJam: 5.6,
    slaPercent: 90.5,
  },
  {
    id: 'hd-05',
    namaLayanan: 'Permintaan Penerbitan Sertifikat TTE BSrE',
    kategori: 'Keamanan',
    jumlahTiket: 62,
    selesaiTepatWaktu: 56,
    normaWaktuRespon: '20 Menit',
    normaWaktuSelesai: '24 Jam',
    realisasiAvgJam: 14.2,
    slaPercent: 90.3,
  },
];

// Jaringan Fiber Optik BP Batam (Item #2 & #5 di PDF)
export interface FiberOpticRoute {
  id: string;
  jalur: string;
  ruasJalan: string;
  panjangKm: number;
  jmlCore: number;
  coreAktif: number;
  utilitasPersen: number;
  brandFo: string;
  startPoint: string;
  endPoint: string;
  statusKabel: 'Normal Operasional' | 'Pemeliharaan Rutin';
}

export const FIBER_OPTIC_ROUTES: FiberOpticRoute[] = [
  {
    id: 'fo-01',
    jalur: 'Ring Backbone Batam Centre - Sei Panas - Nagoya',
    ruasJalan: 'Jl. Engku Putri - Jl. Sudirman - Jl. Imam Bonjol',
    panjangKm: 34.2,
    jmlCore: 96,
    coreAktif: 82,
    utilitasPersen: 85.4,
    brandFo: 'Corning SM 96C G.652D',
    startPoint: 'Gedung BIDA Batam Centre',
    endPoint: 'Kantor Perwakilan Nagoya',
    statusKabel: 'Normal Operasional',
  },
  {
    id: 'fo-02',
    jalur: 'Interkoneksi Batam Centre - Pelabuhan Batu Ampar',
    ruasJalan: 'Jl. Ahmad Yani - Jl. Yos Sudarso - Dermaga Batu Ampar',
    panjangKm: 28.6,
    jmlCore: 72,
    coreAktif: 64,
    utilitasPersen: 88.9,
    brandFo: 'Prysmian SM 72C Armored',
    startPoint: 'Gedung BIDA Batam Centre',
    endPoint: 'Dermaga Kontainer Batu Ampar',
    statusKabel: 'Normal Operasional',
  },
  {
    id: 'fo-03',
    jalur: 'Backbone Batam Centre - DRC Sekupang & RSBP',
    ruasJalan: 'Jl. Gajah Mada - Jl. Dr. Cipto Mangunkusumo',
    panjangKm: 42.8,
    jmlCore: 96,
    coreAktif: 78,
    utilitasPersen: 81.3,
    brandFo: 'Furukawa SM 96C Aerial/Duct',
    startPoint: 'Data Center BIDA',
    endPoint: 'DRC Sekupang & RSBP Batam',
    statusKabel: 'Normal Operasional',
  },
  {
    id: 'fo-04',
    jalur: 'Spur Link Bandara Hang Nadim & KEK BAT',
    ruasJalan: 'Jl. Hang Tuah - Bandara Internasional Hang Nadim',
    panjangKm: 31.5,
    jmlCore: 48,
    coreAktif: 36,
    utilitasPersen: 75.0,
    brandFo: 'Corning SM 48C Armored',
    startPoint: 'Batam Centre Node',
    endPoint: 'Terminal Bandara Hang Nadim',
    statusKabel: 'Normal Operasional',
  },
  {
    id: 'fo-05',
    jalur: 'Link Kawasan Industri Kabil & KPLI B3',
    ruasJalan: 'Jl. Hang Kesturi Kabil',
    panjangKm: 24.1,
    jmlCore: 48,
    coreAktif: 34,
    utilitasPersen: 70.8,
    brandFo: 'Prysmian SM 48C Duct',
    startPoint: 'Simpang Kabil Sub-node',
    endPoint: 'KPLI B3 Kabil',
    statusKabel: 'Normal Operasional',
  },
];

// Data Aplikasi BP Batam (Item #14 di PDF)
export interface BpBatamAppItem {
  id: string;
  namaAplikasi: string;
  uraianAplikasi: string;
  basisAplikasi: 'Web' | 'Mobile' | 'Hybrid';
  tandaTanganElektronik: 'Sudah TTE (BSrE)' | 'Dalam Proses' | 'Belum';
  kategoriAplikasi: 'Pelayanan Publik' | 'Administrasi Pemerintahan' | 'Keuangan & Aset' | 'Spasial GIS';
  status: 'Aktif Operasional' | 'Pemeliharaan' | 'Pengembangan';
  unitOperasional: string;
  bahasaPemrograman: string;
  devYear: number;
}

export const BP_BATAM_APPS_DATA: BpBatamAppItem[] = [
  {
    id: 'app-01',
    namaAplikasi: 'SIMKEU BP Batam (Sistem Informasi Manajemen Keuangan)',
    uraianAplikasi: 'Pengelolaan anggaran DIPA, realisasi belanja, penerimaan kas, billing kasir dan laporan keuangan BLU',
    basisAplikasi: 'Web',
    tandaTanganElektronik: 'Sudah TTE (BSrE)',
    kategoriAplikasi: 'Keuangan & Aset',
    status: 'Aktif Operasional',
    unitOperasional: 'Biro Keuangan',
    bahasaPemrograman: 'TypeScript / Node / Java Oracle',
    devYear: 2021,
  },
  {
    id: 'app-02',
    namaAplikasi: 'Sistem Informasi Pengelolaan Lahan (LandMS / SIPRAJA)',
    uraianAplikasi: 'Penerbitan SKPT, alokasi lahan, revisi PL, faktur perubahan peruntukan, dan integrasi peta spasial',
    basisAplikasi: 'Web',
    tandaTanganElektronik: 'Sudah TTE (BSrE)',
    kategoriAplikasi: 'Spasial GIS',
    status: 'Aktif Operasional',
    unitOperasional: 'Direktorat Pengelolaan Lahan',
    bahasaPemrograman: 'Python Django / PostGIS',
    devYear: 2020,
  },
  {
    id: 'app-03',
    namaAplikasi: 'E-Office & Tata Naskah Dinas Elektronik (TNDE)',
    uraianAplikasi: 'Distribusi surat masuk/keluar, disposisi pimpinan, nota dinas, dan pengarsipan digital',
    basisAplikasi: 'Hybrid',
    tandaTanganElektronik: 'Sudah TTE (BSrE)',
    kategoriAplikasi: 'Administrasi Pemerintahan',
    status: 'Aktif Operasional',
    unitOperasional: 'Biro Umum',
    bahasaPemrograman: 'React Native / PHP Laravel',
    devYear: 2022,
  },
  {
    id: 'app-04',
    namaAplikasi: 'Batam Online Single Submission (IBOSS / MPP Digital)',
    uraianAplikasi: 'Portal layanan perizinan terpadu investasi, izin usaha kawasan, lalu lintas barang, dan perizinan non-OSS',
    basisAplikasi: 'Web',
    tandaTanganElektronik: 'Sudah TTE (BSrE)',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    unitOperasional: 'PTSP BP Batam',
    bahasaPemrograman: 'Vue.js / Go microservices',
    devYear: 2023,
  },
  {
    id: 'app-05',
    namaAplikasi: 'Sistem Informasi Manajemen Pelabuhan (SIM-Pelabuhan)',
    uraianAplikasi: 'Manajemen pergerakan kapal (BMS), bongkar muat kargo peti kemas Batu Ampar, dan billing pass penumpang',
    basisAplikasi: 'Web',
    tandaTanganElektronik: 'Sudah TTE (BSrE)',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    unitOperasional: 'Direktorat Pengelolaan Kepelabuhanan',
    bahasaPemrograman: 'Java Spring Boot / PostgreSQL',
    devYear: 2021,
  },
  {
    id: 'app-06',
    namaAplikasi: 'SIMRS Gos v2 (Sistem Informasi Rumah Sakit BP Batam)',
    uraianAplikasi: 'Rekam medis elektronik (RME), registrasi rawat inap/jalan IGD, resep obat farmasi, dan billing klaim BPJS',
    basisAplikasi: 'Web',
    tandaTanganElektronik: 'Sudah TTE (BSrE)',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    unitOperasional: 'Badan Usaha Rumah Sakit (RSBP)',
    bahasaPemrograman: 'Node.js / React / MySQL',
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
    namaData: 'Jaringan Fiber Optic (FO)',
    jenisData: 'DATA SPASIAL / TEKNIS',
    periodeData: 'PERSEMESTER',
    sifatData: 'TERBATAS',
    atributData: ['JALUR', 'RUAS JALAN', 'PANJANG KM', 'JUMLAH CORE', 'CORE AKTIF', 'BRAND FO', 'START POINT', 'END POINT', 'STATUS'],
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
    namaData: 'Log Traffic Akses Data Center & Firewall',
    jenisData: 'DATA KEAMANAN',
    periodeData: 'REAL-TIME',
    sifatData: 'TERTUTUP',
    atributData: ['TIMESTAMP', 'SRC IP', 'DEST IP', 'PORT', 'ACTION', 'PROTOCOL', 'POLICY RULE'],
    tabelDatabase: 'pdsi_log_traffic_firewall',
    keterangan: 'Aliran lalu lintas data masuk dan keluar perimeter keamanan Next-Generation Firewall BP Batam.',
  },
  {
    no: 12,
    namaData: 'Data Serangan Keamanan IT',
    jenisData: 'DATA KEAMANAN',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['PERIODE', 'THREAT ACTIVITY', 'STATUS KEAMANAN', 'JML SERANGAN', 'TANGGAL REKAP'],
    tabelDatabase: 'pdsi_data_serangan_keamanan_it',
    keterangan: 'Rekapitulasi serangan siber (DDoS, Ransomware, Web Defacement, Phishing) yang ditindaklanjuti SOC.',
  },
  {
    no: 13,
    namaData: 'Rekap Infrastruktur Server dan Storage',
    jenisData: 'DATA ASET TI',
    periodeData: 'PERSEMESTER',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA SERVER', 'JUMLAH', 'TIPE', 'BRAND', 'TGL GARANSI', 'STATUS GARANSI', 'EOS'],
    tabelDatabase: 'pdsi_infrastruktur_server_storage',
    keterangan: 'Daftar server rackmount, blade chassis, dan storage area network (SAN) beserta status siklus hidupnya.',
  },
  {
    no: 14,
    namaData: 'Data Aplikasi BP Batam',
    jenisData: 'DATA SISTEM',
    periodeData: 'PERSEMESTER',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA APLIKASI', 'URAIAN APLIKASI', 'BASIS APLIKASI', 'TIPE LISENSI', 'BAHASA PEMOGRAMAN', 'TANDA TANGAN ELEKTRONIK', 'STATUS'],
    tabelDatabase: 'pdsi_data_aplikasi_bp_batam',
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
    namaData: 'Data Utilisasi Core Switch dan Router Jaringan',
    jenisData: 'DATA TEKNIS',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA PERANGKAT', 'LOKASI DISTRIBUSI', 'JUMLAH PORT', 'PORT AKTIF', 'LOAD CPU %', 'MEMORY %'],
    tabelDatabase: 'pdsi_core_network_devices',
    keterangan: 'Performa perangkat switch distribusi dan router agregasi backbone LAN BP Batam.',
  },
  {
    no: 18,
    namaData: 'Laporan Pemantauan dan Evaluasi SPBE',
    jenisData: 'DATA EVALUASI',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['TAHUN', 'DOMAIN', 'ASPEK', 'INDIKATOR', 'BOBOT', 'NILAI'],
    tabelDatabase: 'pdsi_evaluasi_spbe',
    keterangan: 'Hasil audit dan penilaian mandiri indeks SPBE BP Batam berdasarkan instrumen KemenPAN-RB.',
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
    namaData: 'Data Indeks KAMI (Keamanan Informasi BSSN)',
    jenisData: 'DATA EVALUASI',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['AREA KEAMANAN', 'JUMLAH PERTANYAAN', 'SKOR CAPAIAN', 'TINGKAT KEMATANGAN', 'STATUS KELAYAKAN'],
    tabelDatabase: 'pdsi_indeks_kami',
    keterangan: 'Evaluasi tingkat kesiapan dan kepatuhan sistem keamanan siber BP Batam terhadap standar BSSN.',
  },
  {
    no: 21,
    namaData: 'Data Permintaan Layanan IT (Helpdesk)',
    jenisData: 'DATA OPERASIONAL',
    periodeData: 'PERBULAN',
    sifatData: 'TERBUKA',
    atributData: ['TAHUN', 'BULAN', 'NAMA LAYANAN', 'JUMLAH', 'NORMA WAKTU RESPON', 'NORMA WAKTU SELESAI'],
    tabelDatabase: 'pdsi_permintaan_layanan_it',
    keterangan: 'Statistik tiket aduan dan permohonan layanan teknologi informasi yang masuk melalui portal Helpdesk.',
  },
];

