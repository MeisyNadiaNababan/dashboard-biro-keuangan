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
    id: 'indeks_spbe',
    title: 'Indeks SPBE BP Batam',
    value: '3,68',
    target: 'Target Perkin: ≥ 3,50 (Terlampaui)',
    percentage: 'Predikat "Sangat Baik" (Skala 0-5)',
    trend: {
      direction: 'up',
      value: '+0,24',
      period: '(Evaluasi KemenPAN-RB)',
      isPositive: true,
    },
    sparkline: [2.95, 3.12, 3.28, 3.42, 3.55, 3.62, 3.68],
    badge: {
      text: 'Sangat Baik',
      variant: 'success',
    },
    colorTheme: 'purple',
    formulaRef: 'Poin #1: Indeks SPBE = Komposit 4 Domain (Kebijakan, Tata Kelola, Manajemen, Layanan) Sesuai PermenPAN-RB No. 59/2020',
  },
  {
    id: 'total_rak',
    title: 'Total Rak Data DC',
    value: '42 Unit Rak',
    target: 'Standar Rak 42U Server Blade & Storage',
    percentage: 'Main DC BIDA & DRC Sekupang',
    trend: {
      direction: 'up',
      value: '+0 Unit',
      period: '(Kapasitas Tetap)',
      isPositive: true,
    },
    sparkline: [42, 42, 42, 42, 42, 42, 42],
    badge: {
      text: 'Tier III Ready',
      variant: 'info',
    },
    colorTheme: 'blue',
    formulaRef: 'Poin #2: Total Rak = SUM([TOTAL RAK]) di Fasilitas Main Data Center & DRC Sekupang',
  },
  {
    id: 'kepuasan_dc',
    title: 'SLA Kepuasan Pelanggan Data Center',
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
    formulaRef: 'Poin #4: CSAT Data Center = (Total Skor Responden / Skor Maksimal) * 100% (Standar SLA ISO 20000)',
  },
  {
    id: 'jumlah_server',
    title: 'Jumlah Server & Storage',
    value: '58 Unit',
    target: 'HCI, SAN/NAS, Appliance & Blade',
    percentage: '48 Server Aktif • 10 Node Standby/DRC',
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
    colorTheme: 'teal',
    formulaRef: 'Poin #5: Total Server & Storage = SUM([JUMLAH]) Unit Hardware di Ruang Server BIDA & DRC',
  },
  {
    id: 'jumlah_core_fo',
    title: 'Jumlah Core FO',
    value: '3.456 Core',
    target: '2.880 Core Aktif (83,3% Utilisasi)',
    percentage: 'Kapasitas Total 8 Koridor Backbone Batam',
    trend: {
      direction: 'up',
      value: '+288 Core',
      period: '(Ekspansi Ruas)',
      isPositive: true,
    },
    sparkline: [2880, 2976, 3072, 3168, 3264, 3360, 3456],
    badge: {
      text: '83,3% Utilisasi',
      variant: 'info',
    },
    colorTheme: 'blue',
    formulaRef: 'Poin #6: Jumlah Core FO = SUM([JMLHCORE]) di Seluruh Bentang Kabel Serat Optik BP Batam',
  },
  {
    id: 'jumlah_aplikasi',
    title: 'Jumlah Aplikasi',
    value: '114 Aplikasi',
    target: 'Mandat Arsitektur SPBE Nasional',
    percentage: '84 Publik & Internal Aktif • 30 Integrasi',
    trend: {
      direction: 'up',
      value: '+3 App',
      period: '(YTD)',
      isPositive: true,
    },
    sparkline: [98, 102, 105, 108, 110, 112, 114],
    badge: {
      text: '100% Terkatalog',
      variant: 'success',
    },
    colorTheme: 'purple',
    formulaRef: 'Poin #8: Total Aplikasi = COUNT([NAMA APLIKASI]) di Katalog Data SPBE BP Batam',
  },
];

// Data Center Racks (Item #8 di PDF: DATA RAK DATA CENTER)
export interface DcRackItem {
  id: string;
  ruangan: string;
  jenisRak: string;
  totalRak: number;
  rakTerisi: number;
  rakKosong: number;
  jumlahRakTerisi: number;
  jumlahRakKosong: number;
  tanggalRekapAwal: string;
  tanggalRekapAkhir: string;
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
    jumlahRakTerisi: 22,
    jumlahRakKosong: 4,
    tanggalRekapAwal: '01/01/2026',
    tanggalRekapAkhir: '31/03/2026',
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
    jumlahRakTerisi: 8,
    jumlahRakKosong: 4,
    tanggalRekapAwal: '01/01/2026',
    tanggalRekapAkhir: '31/03/2026',
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
    jumlahRakTerisi: 3,
    jumlahRakKosong: 1,
    tanggalRekapAwal: '01/01/2026',
    tanggalRekapAkhir: '31/03/2026',
    okupansiPersen: 75.0,
    suhuRataRata: '20.5°C',
    pueScore: 1.45,
  },
];

// Data Tenant Data Center (Poin #9 Rekap Data Tenant)
export interface DcTenantItem {
  id: string;
  kategori: string;
  jumlah: number;
  persentase: number;
  contohTenant: string;
  tipeLayanan: string;
  kapasitasRak: string;
}

export const DC_TENANTS_DATA: DcTenantItem[] = [
  {
    id: 'tnt-01',
    kategori: 'Instansi Pemerintah Pusat & K/L',
    jumlah: 8,
    persentase: 10.3,
    contohTenant: 'Kemenkeu (DJP/BC Batam), BSSN CSIRT, BKPM RI, Kemenhub Hubla',
    tipeLayanan: 'Colocation 42U Dedicated & Interkoneksi Fiber Optic',
    kapasitasRak: '6 Rak Dedicated',
  },
  {
    id: 'tnt-02',
    kategori: 'Organisasi Perangkat Daerah (OPD) Pemko Batam',
    jumlah: 12,
    persentase: 15.4,
    contohTenant: 'Diskominfo Kota Batam, Bapenda Kota Batam, PTSP Kota Batam, RSUD Embung Fatimah',
    tipeLayanan: 'Virtual Data Center (VDC), Cloud Hosting & Replikasi DRC',
    kapasitasRak: '5 Rak Bersama',
  },
  {
    id: 'tnt-03',
    kategori: 'BUMN, BUMD & Lembaga Keuangan / Bank Mitra',
    jumlah: 15,
    persentase: 19.2,
    contohTenant: 'Bank Mandiri, BRI, BNI, Bank Riau Kepri Syariah, Telkom Indonesia, PLN Batam',
    tipeLayanan: 'Secure Colocation Gateway Payment, Host-to-Host Host Billing',
    kapasitasRak: '7 Rak Dedicated',
  },
  {
    id: 'tnt-04',
    kategori: 'Unit Usaha & Satker Internal BP Batam',
    jumlah: 24,
    persentase: 30.8,
    contohTenant: 'Biro Keuangan (SIMKEU), PTSP BP Batam, BU Fasling, BU Pelabuhan, RSBP Batam, Bandara Hang Nadim',
    tipeLayanan: 'Core Mission-Critical Datacenter Hosting, Database Cluster & Backup',
    kapasitasRak: '11 Rak Primary',
  },
  {
    id: 'tnt-05',
    kategori: 'Perusahaan Swasta, Kawasan Industri & KEK',
    jumlah: 19,
    persentase: 24.3,
    contohTenant: 'Pengelola KEK Batam Aero Technic, Nongsa Digital Park, Kawasan Industri Batamindo, Mitra Logistik',
    tipeLayanan: 'Disaster Recovery As A Service (DRaaS) & Edge Meet-Me-Room',
    kapasitasRak: '4 Rak Colocation',
  },
];

// Infrastruktur Server & Storage (Item #13 di PDF: REKAP INFRASTRUKTUR SERVER DAN STORAGE)
export interface ServerStorageItem {
  id: string;
  tanggalRekap: string;
  namaServer: string;
  brand: string;
  tipe: 'Hyperconverged HCI' | 'Storage SAN/NAS' | 'Database Appliance' | 'Blade Compute' | 'Rackmount Server' | 'Storage Backup/NAS';
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
    jumlahUnit: 16,
    tanggalGaransi: '31/12/2027',
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'Virtualisasi Utama Aplikasi SIMKEU & Portal BP Batam',
  },
  {
    id: 'srv-02',
    tanggalRekap: '01/04/2026',
    namaServer: 'Cisco UCS Blade B200 Compute Cluster',
    brand: 'Cisco Systems',
    tipe: 'Blade Compute',
    jumlahUnit: 12,
    tanggalGaransi: '30/11/2027',
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'Node Pemrosesan Mikroservis & Kubernetes Container',
  },
  {
    id: 'srv-03',
    tanggalRekap: '01/04/2026',
    namaServer: 'Dell PowerEdge R750 Enterprise Server',
    brand: 'Dell Technologies',
    tipe: 'Rackmount Server',
    jumlahUnit: 10,
    tanggalGaransi: '31/08/2028',
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'Server Core Routing, AD, DNS & Security Monitoring',
  },
  {
    id: 'srv-04',
    tanggalRekap: '01/04/2026',
    namaServer: 'SAN Storage All-Flash OceanStor',
    brand: 'Huawei OceanStor',
    tipe: 'Storage SAN/NAS',
    jumlahUnit: 6,
    tanggalGaransi: '15/09/2028',
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'High IOPS Database Oracle SIMKEU & PostgreSQL GIS',
  },
  {
    id: 'srv-05',
    tanggalRekap: '01/04/2026',
    namaServer: 'Database Server Cluster (Exadata X8M)',
    brand: 'Oracle',
    tipe: 'Database Appliance',
    jumlahUnit: 4,
    tanggalGaransi: '30/06/2027',
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'Core SIMKEU, PNBP, Billing Kas & Bank',
  },
  {
    id: 'srv-06',
    tanggalRekap: '01/04/2026',
    namaServer: 'NetApp FAS8300 Enterprise Hybrid Storage',
    brand: 'NetApp',
    tipe: 'Storage SAN/NAS',
    jumlahUnit: 4,
    tanggalGaransi: '31/01/2025',
    statusGaransi: 'Masa Perpanjangan',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'Storage Repository Dokumen Digital & Arsip TIK',
  },
  {
    id: 'srv-07',
    tanggalRekap: '01/04/2026',
    namaServer: 'HPE ProLiant DL380 Gen9 (Legacy Node)',
    brand: 'HPE',
    tipe: 'Rackmount Server',
    jumlahUnit: 4,
    tanggalGaransi: '31/03/2024',
    statusGaransi: 'Habis Garansi',
    eosStatus: 'EOS (End of Support)',
    penggunaan: 'Archive File Server & Dev Environment (Rencana Refresh TA 2026)',
  },
  {
    id: 'srv-08',
    tanggalRekap: '01/04/2026',
    namaServer: 'Synology Enterprise Backup Appliance',
    brand: 'Synology Inc',
    tipe: 'Storage Backup/NAS',
    jumlahUnit: 2,
    tanggalGaransi: '15/10/2027',
    statusGaransi: 'Aktif',
    eosStatus: 'Aman (Supported)',
    penggunaan: 'Off-site Replikasi Backup DRC Sekupang',
  },
];

// Data Layanan TI & Permintaan Layanan TI pada Bcare (Poin #10 & Lampiran PDF Bcare)
export interface PdsiDataLayananItem {
  id: string;
  kode: string;
  namaLayanan: string;
  jumlah: number;
  kategori: string;
  subLayananContoh: string;
  subditPengelola: string;
}

export interface PdsiBcareSubLayananRecord {
  id: number;
  kode: string;
  namaLayanan: string;
  namaSubLayanan: string;
  kategoriTingkat: 'Tinggi' | 'Menengah' | 'Rendah';
}

// 44 Entri Katalog Layanan Resmi pada Bcare (PDF: layanan — Data Layanan TI pada Bcare)
export const BCARE_44_SUB_LAYANAN: PdsiBcareSubLayananRecord[] = [
  { id: 1, kode: 'ITSM.3', namaLayanan: 'Layanan PDSI - Akses Sistem BP Batam', namaSubLayanan: '3.6 Layanan Akses Aplikasi Sistem Informasi', kategoriTingkat: 'Tinggi' },
  { id: 2, kode: 'ITSM.4', namaLayanan: 'Layanan PDSI - Penanganan Insiden TIK BP Batam', namaSubLayanan: '4.1 Layanan Penanganan Insiden Aplikasi Sistem Informasi TIK', kategoriTingkat: 'Menengah' },
  { id: 3, kode: 'ITSM.2', namaLayanan: 'Layanan PDSI - Infrastruktur Jaringan', namaSubLayanan: '2.3 Layanan Pengembangan Netware', kategoriTingkat: 'Menengah' },
  { id: 4, kode: 'ITSM.2', namaLayanan: 'Layanan PDSI - Infrastruktur Jaringan', namaSubLayanan: '2.5 Layanan Interkoneksi Jaringan', kategoriTingkat: 'Menengah' },
  { id: 5, kode: 'ITSM.1', namaLayanan: 'Layanan PDSI - Pengembangan Sistem informasi', namaSubLayanan: '1.1 Pembangunan Aplikasi Baru', kategoriTingkat: 'Menengah' },
  { id: 6, kode: 'ITSM.8', namaLayanan: 'Layanan PDSI - Data dan Informasi', namaSubLayanan: '8.4 Layanan Performance Tuning Basis Data', kategoriTingkat: 'Tinggi' },
  { id: 7, kode: 'ITSM.4', namaLayanan: 'Layanan PDSI - Penanganan Insiden TIK BP Batam', namaSubLayanan: '4.6 Layanan Penanganan Insiden Keamanan TIK', kategoriTingkat: 'Menengah' },
  { id: 8, kode: 'ITSM.8', namaLayanan: 'Layanan PDSI - Data dan Informasi', namaSubLayanan: '8.3 Layanan Permintaan Replikasi/Backup/Restore Basis Data', kategoriTingkat: 'Tinggi' },
  { id: 9, kode: 'ITSM.5', namaLayanan: 'Layanan PDSI - Keamanan Siber', namaSubLayanan: '5.3 Layanan Penanganan Insiden Keamanan Siber (CSIRT)', kategoriTingkat: 'Tinggi' },
  { id: 10, kode: 'ITSM.8', namaLayanan: 'Layanan PDSI - Data dan Informasi', namaSubLayanan: '8.5 Layanan Permintaan Penyajian Informasi Dashboard', kategoriTingkat: 'Tinggi' },
  { id: 11, kode: 'ITSM.9', namaLayanan: 'Layanan PDSI - Kebijakan Tata Kelola TI', namaSubLayanan: '9.1 Layanan PDSI - Layanan Penyusunan Kebijakan TI', kategoriTingkat: 'Tinggi' },
  { id: 12, kode: 'ITSM.3', namaLayanan: 'Layanan PDSI - Akses Sistem BP Batam', namaSubLayanan: '3.7 Layanan Akses Basis Data', kategoriTingkat: 'Tinggi' },
  { id: 13, kode: 'ITSM.4', namaLayanan: 'Layanan PDSI - Penanganan Insiden TIK BP Batam', namaSubLayanan: '4.2 Layanan Penanganan Insiden Basis Data TIK', kategoriTingkat: 'Menengah' },
  { id: 14, kode: 'ITSM.5', namaLayanan: 'Layanan PDSI - Keamanan Siber', namaSubLayanan: '5.2 Layanan Uji Kerentanan Sistem Informasi', kategoriTingkat: 'Tinggi' },
  { id: 15, kode: 'ITSM.9', namaLayanan: 'Layanan PDSI - Kebijakan Tata Kelola TI', namaSubLayanan: '9.2 Layanan PDSI - Layanan Evaluasi Sistem dan Kebijakan TI', kategoriTingkat: 'Tinggi' },
  { id: 16, kode: 'ITSM.10', namaLayanan: 'Layanan PDSI - Layanan Pengelolaan Data dan Tata Usaha TI', namaSubLayanan: '10.1 Layanan Pengelolaan Persuratan dan Keperluan sehari-hari', kategoriTingkat: 'Menengah' },
  { id: 17, kode: 'ITSM.1', namaLayanan: 'Layanan PDSI - Pengembangan Sistem informasi', namaSubLayanan: '1.2 Pengembangan Modul Aplikasi', kategoriTingkat: 'Menengah' },
  { id: 18, kode: 'ITSM.2', namaLayanan: 'Layanan PDSI - Infrastruktur Jaringan', namaSubLayanan: '2.1 Layanan Penambahan Domain dan Subdomain', kategoriTingkat: 'Menengah' },
  { id: 19, kode: 'ITSM.4', namaLayanan: 'Layanan PDSI - Penanganan Insiden TIK BP Batam', namaSubLayanan: '4.3 Layanan Penanganan Insiden Integrasi', kategoriTingkat: 'Menengah' },
  { id: 20, kode: 'ITSM.8', namaLayanan: 'Layanan PDSI - Data dan Informasi', namaSubLayanan: '8.1 Layanan Permintaan Data Kebutuhan Eksternal', kategoriTingkat: 'Menengah' },
  { id: 21, kode: 'ITSM.4', namaLayanan: 'Layanan PDSI - Penanganan Insiden TIK BP Batam', namaSubLayanan: '4.4 Layanan Penanganan Insiden Koneksi Jaringan & Internet', kategoriTingkat: 'Menengah' },
  { id: 22, kode: 'ITSM.4', namaLayanan: 'Layanan PDSI - Penanganan Insiden TIK BP Batam', namaSubLayanan: '4.5 Layanan Penanganan Insiden Perangkat Server & Storage', kategoriTingkat: 'Tinggi' },
  { id: 23, kode: 'ITSM.4', namaLayanan: 'Layanan PDSI - Penanganan Insiden TIK BP Batam', namaSubLayanan: '4.7 Layanan Penanganan Insiden Akun Email & SSO Portal', kategoriTingkat: 'Menengah' },
  { id: 24, kode: 'ITSM.4', namaLayanan: 'Layanan PDSI - Penanganan Insiden TIK BP Batam', namaSubLayanan: '4.8 Layanan Penanganan Insiden Sistem Monitoring Data Center', kategoriTingkat: 'Tinggi' },
  { id: 25, kode: 'ITSM.8', namaLayanan: 'Layanan PDSI - Data dan Informasi', namaSubLayanan: '8.2 Layanan Permintaan Integrasi Data Internal Antar Satker', kategoriTingkat: 'Tinggi' },
  { id: 26, kode: 'ITSM.8', namaLayanan: 'Layanan PDSI - Data dan Informasi', namaSubLayanan: '8.6 Layanan Ekstraksi & Migrasi Basis Data Sistem Lama', kategoriTingkat: 'Tinggi' },
  { id: 27, kode: 'ITSM.8', namaLayanan: 'Layanan PDSI - Data dan Informasi', namaSubLayanan: '8.7 Layanan Verifikasi Kualitas & Validasi Data Transaksional', kategoriTingkat: 'Menengah' },
  { id: 28, kode: 'ITSM.2', namaLayanan: 'Layanan PDSI - Infrastruktur Jaringan', namaSubLayanan: '2.2 Layanan Alokasi IP Publik / Load Balance', kategoriTingkat: 'Menengah' },
  { id: 29, kode: 'ITSM.2', namaLayanan: 'Layanan PDSI - Infrastruktur Jaringan', namaSubLayanan: '2.4 Layanan Konfigurasi VPN & Akses Jarak Jauh', kategoriTingkat: 'Menengah' },
  { id: 30, kode: 'ITSM.2', namaLayanan: 'Layanan PDSI - Infrastruktur Jaringan', namaSubLayanan: '2.6 Layanan Penyambungan Core Fiber Optic Antar Gedung', kategoriTingkat: 'Tinggi' },
  { id: 31, kode: 'ITSM.5', namaLayanan: 'Layanan PDSI - Keamanan Siber', namaSubLayanan: '5.1 Layanan Penerbitan & Asistensi Sertifikat Elektronik TTE BSrE', kategoriTingkat: 'Tinggi' },
  { id: 32, kode: 'ITSM.5', namaLayanan: 'Layanan PDSI - Keamanan Siber', namaSubLayanan: '5.4 Layanan Audit Kepatuhan Keamanan Sistem Informasi (ISO 27001)', kategoriTingkat: 'Tinggi' },
  { id: 33, kode: 'ITSM.5', namaLayanan: 'Layanan PDSI - Keamanan Siber', namaSubLayanan: '5.5 Layanan Monitoring SOC & Log Forensik Siber 24/7', kategoriTingkat: 'Tinggi' },
  { id: 34, kode: 'ITSM.3', namaLayanan: 'Layanan PDSI - Akses Sistem BP Batam', namaSubLayanan: '3.1 Layanan Pembuatan Akun SSO Pegawai Baru BP Batam', kategoriTingkat: 'Menengah' },
  { id: 35, kode: 'ITSM.3', namaLayanan: 'Layanan PDSI - Akses Sistem BP Batam', namaSubLayanan: '3.2 Layanan Hak Akses Server Virtual / VM Colocation DC', kategoriTingkat: 'Tinggi' },
  { id: 36, kode: 'ITSM.3', namaLayanan: 'Layanan PDSI - Akses Sistem BP Batam', namaSubLayanan: '3.3 Layanan Reset Kredensial & Autentikasi MFA Pengguna', kategoriTingkat: 'Menengah' },
  { id: 37, kode: 'ITSM.1', namaLayanan: 'Layanan PDSI - Pengembangan Sistem informasi', namaSubLayanan: '1.3 Layanan Pengembangan Integrasi / Pertukaran Data (API Web Service)', kategoriTingkat: 'Menengah' },
  { id: 38, kode: 'ITSM.1', namaLayanan: 'Layanan PDSI - Pengembangan Sistem informasi', namaSubLayanan: '1.4 Layanan Uji Coba (UAT) & Deployment Sistem ke Production', kategoriTingkat: 'Menengah' },
  { id: 39, kode: 'ITSM.1', namaLayanan: 'Layanan PDSI - Pengembangan Sistem informasi', namaSubLayanan: '1.5 Layanan Pemeliharaan & Bug Fixing Aplikasi Berjalan', kategoriTingkat: 'Menengah' },
  { id: 40, kode: 'ITSM.9', namaLayanan: 'Layanan PDSI - Kebijakan Tata Kelola TI', namaSubLayanan: '9.3 Layanan Pengukuran Indeks Kematangan SPBE BP Batam', kategoriTingkat: 'Tinggi' },
  { id: 41, kode: 'ITSM.9', namaLayanan: 'Layanan PDSI - Kebijakan Tata Kelola TI', namaSubLayanan: '9.4 Layanan Standardisasi SOP & Arsitektur SPBE', kategoriTingkat: 'Tinggi' },
  { id: 42, kode: 'ITSM.10', namaLayanan: 'Layanan PDSI - Layanan Pengelolaan Data dan Tata Usaha TI', namaSubLayanan: '10.2 Layanan Administrasi Perizinan TIK & Lisensi Software', kategoriTingkat: 'Menengah' },
  { id: 43, kode: 'ITSM.10', namaLayanan: 'Layanan PDSI - Layanan Pengelolaan Data dan Tata Usaha TI', namaSubLayanan: '10.3 Layanan Pelaporan Monitoring Kinerja Bulanan PDSI', kategoriTingkat: 'Menengah' },
  { id: 44, kode: 'ITSM.10', namaLayanan: 'Layanan PDSI - Layanan Pengelolaan Data dan Tata Usaha TI', namaSubLayanan: '10.4 Layanan Pengarsipan Dokumen Teknis & Manual Operasi TIK', kategoriTingkat: 'Menengah' },
];

// Rekapitulasi Data Layanan TI per Kategori (Menampilkan: Nama Layanan dan Jumlah Sub-Layanan, Total 44)
export const PDSI_DATA_LAYANAN_TI: PdsiDataLayananItem[] = [
  {
    id: 'lyn-01',
    kode: 'ITSM.4',
    namaLayanan: 'Layanan PDSI - Penanganan Insiden TIK BP Batam',
    jumlah: 8,
    kategori: 'Penanganan Insiden TIK',
    subLayananContoh: '4.1 Insiden Aplikasi, 4.2 Basis Data, 4.3 Integrasi, 4.6 Keamanan TIK',
    subditPengelola: 'Subdit Infrastruktur & Operasional TIK',
  },
  {
    id: 'lyn-02',
    kode: 'ITSM.8',
    namaLayanan: 'Layanan PDSI - Data dan Informasi',
    jumlah: 7,
    kategori: 'Data & Informasi',
    subLayananContoh: '8.4 Performance Tuning DB, 8.3 Backup/Restore DB, 8.5 Dashboard, 8.1 Data Eksternal',
    subditPengelola: 'Subdit Pengelolaan Data & Informasi',
  },
  {
    id: 'lyn-03',
    kode: 'ITSM.2',
    namaLayanan: 'Layanan PDSI - Infrastruktur Jaringan',
    jumlah: 6,
    kategori: 'Infrastruktur Jaringan',
    subLayananContoh: '2.3 Pengembangan Netware, 2.5 Interkoneksi, 2.1 Domain/Subdomain, 2.2 IP Publik',
    subditPengelola: 'Subdit Jaringan & Telekomunikasi',
  },
  {
    id: 'lyn-04',
    kode: 'ITSM.5',
    namaLayanan: 'Layanan PDSI - Keamanan Siber',
    jumlah: 5,
    kategori: 'Keamanan Siber & CSIRT',
    subLayananContoh: '5.3 Penanganan Insiden Siber (CSIRT), 5.2 Uji Kerentanan SI, 5.1 Asistensi TTE',
    subditPengelola: 'Subdit Keamanan Informasi (CSIRT BP Batam)',
  },
  {
    id: 'lyn-05',
    kode: 'ITSM.3',
    namaLayanan: 'Layanan PDSI - Akses Sistem BP Batam',
    jumlah: 5,
    kategori: 'Akses Sistem & Otentikasi',
    subLayananContoh: '3.6 Akses Aplikasi SI, 3.7 Akses Basis Data, 3.1 Akun SSO, 3.2 Akses Server/VM',
    subditPengelola: 'Subdit Sistem Informasi & Portal Layanan',
  },
  {
    id: 'lyn-06',
    kode: 'ITSM.1',
    namaLayanan: 'Layanan PDSI - Pengembangan Sistem informasi',
    jumlah: 5,
    kategori: 'Pengembangan Aplikasi SI',
    subLayananContoh: '1.1 Pembangunan Aplikasi Baru, 1.2 Modul Aplikasi, 1.3 Integrasi API',
    subditPengelola: 'Subdit Pengembangan Aplikasi & SI',
  },
  {
    id: 'lyn-07',
    kode: 'ITSM.9',
    namaLayanan: 'Layanan PDSI - Kebijakan Tata Kelola TI',
    jumlah: 4,
    kategori: 'Tata Kelola & Kebijakan SPBE',
    subLayananContoh: '9.1 Penyusunan Kebijakan TI, 9.2 Evaluasi Sistem, 9.3 Evaluasi SPBE',
    subditPengelola: 'Subdit Tata Kelola TI & Kepatuhan SPBE',
  },
  {
    id: 'lyn-08',
    kode: 'ITSM.10',
    namaLayanan: 'Layanan PDSI - Layanan Pengelolaan Data dan Tata Usaha TI',
    jumlah: 4,
    kategori: 'Tata Usaha & Administrasi TIK',
    subLayananContoh: '10.1 Persuratan & Keperluan Sehari-hari, 10.2 Administrasi Lisensi TIK',
    subditPengelola: 'Subbagian Tata Usaha PDSI',
  },
];

export interface PdsiPermintaanLayananItem {
  id: string;
  namaLayanan: string;
  jumlah: number;
  selesai: number;
  dalamProses: number;
  tingkatPenyelesaian: number;
  kategoriPrioritas: string;
  durasiRataRata: string;
}

// Rekapitulasi Permintaan Layanan TI melalui Bcare (Total 544 Entri, sesuai PDF)
export const PDSI_PERMINTAAN_LAYANAN_TI: PdsiPermintaanLayananItem[] = [
  {
    id: 'req-01',
    namaLayanan: 'Layanan Pengembangan Modul Aplikasi',
    jumlah: 146,
    selesai: 142,
    dalamProses: 4,
    tingkatPenyelesaian: 97.3,
    kategoriPrioritas: 'Tinggi',
    durasiRataRata: '3,2 Hari',
  },
  {
    id: 'req-02',
    namaLayanan: 'Layanan Pengembangan Integrasi / Pertukaran Data',
    jumlah: 98,
    selesai: 96,
    dalamProses: 2,
    tingkatPenyelesaian: 98.0,
    kategoriPrioritas: 'Tinggi',
    durasiRataRata: '2,5 Hari',
  },
  {
    id: 'req-03',
    namaLayanan: 'Layanan Akses Aplikasi Sistem Informasi',
    jumlah: 86,
    selesai: 85,
    dalamProses: 1,
    tingkatPenyelesaian: 98.8,
    kategoriPrioritas: 'Tinggi',
    durasiRataRata: '45 Menit',
  },
  {
    id: 'req-04',
    namaLayanan: 'Layanan Penanganan Insiden Aplikasi Sistem Informasi TIK',
    jumlah: 64,
    selesai: 63,
    dalamProses: 1,
    tingkatPenyelesaian: 98.4,
    kategoriPrioritas: 'Menengah',
    durasiRataRata: '1,8 Jam',
  },
  {
    id: 'req-05',
    namaLayanan: 'Layanan Permintaan Penyajian Informasi Dashboard',
    jumlah: 48,
    selesai: 46,
    dalamProses: 2,
    tingkatPenyelesaian: 95.8,
    kategoriPrioritas: 'Tinggi',
    durasiRataRata: '2,0 Hari',
  },
  {
    id: 'req-06',
    namaLayanan: 'Layanan Pengembangan IP Publik / Load Balance',
    jumlah: 38,
    selesai: 37,
    dalamProses: 1,
    tingkatPenyelesaian: 97.4,
    kategoriPrioritas: 'Menengah',
    durasiRataRata: '1,2 Hari',
  },
  {
    id: 'req-07',
    namaLayanan: 'Layanan Penanganan Insiden Keamanan Siber (CSIRT)',
    jumlah: 34,
    selesai: 33,
    dalamProses: 1,
    tingkatPenyelesaian: 97.1,
    kategoriPrioritas: 'Tinggi',
    durasiRataRata: '1,5 Jam',
  },
  {
    id: 'req-08',
    namaLayanan: 'Layanan Permintaan Replikasi/Backup/Restore Basis Data',
    jumlah: 30,
    selesai: 29,
    dalamProses: 1,
    tingkatPenyelesaian: 96.7,
    kategoriPrioritas: 'Tinggi',
    durasiRataRata: '2,8 Jam',
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

// =========================================================================
// DATASET NO. 5 (Hal. 41): DATA JALUR FIBER OPTIC (FO)
// Atribut Resmi: TAHUN, BAGIAN WILAYAH, LOKASI
// =========================================================================
export interface PdsiJalurFoItem {
  id: string;
  tahun: string;
  bagianWilayah: string;
  lokasi: string;
  panjangKm?: number;
  kapasitasCore?: number;
  statusKoneksi?: 'Aktif Normal' | 'Optimal' | 'Siaga Redundan';
  tipeJalur?: string;
}

export const DATA_JALUR_FIBER_OPTIC: PdsiJalurFoItem[] = [
  {
    id: 'fo-jlr-01',
    tahun: '2026',
    bagianWilayah: 'Batam Kota',
    lokasi: 'Koridor Pusat Pemerintahan Gedung BIDA Batam Centre - Kantor Walikota & DPRD',
    panjangKm: 14.8,
    kapasitasCore: 96,
    statusKoneksi: 'Aktif Normal',
    tipeJalur: 'Backbone Ring 1',
  },
  {
    id: 'fo-jlr-02',
    tahun: '2026',
    bagianWilayah: 'Batu Ampar',
    lokasi: 'Trunk Dermaga Peti Kemas Batu Ampar - Kantor Bea Cukai & Hub Terminal Logistik',
    panjangKm: 18.5,
    kapasitasCore: 72,
    statusKoneksi: 'Aktif Normal',
    tipeJalur: 'Interkoneksi Maritim',
  },
  {
    id: 'fo-jlr-03',
    tahun: '2026',
    bagianWilayah: 'Sekupang',
    lokasi: 'Jalur Replikasi Disaster Recovery Center (DRC) Sekupang - RSBP Batam & Pelabuhan Domestik',
    panjangKm: 26.4,
    kapasitasCore: 96,
    statusKoneksi: 'Optimal',
    tipeJalur: 'Backbone Replikasi DRC',
  },
  {
    id: 'fo-jlr-04',
    tahun: '2026',
    bagianWilayah: 'Nongsa',
    lokasi: 'Kawasan Ekonomi Khusus (KEK) Nongsa Digital Park - Hub Data Center & Kabel Laut',
    panjangKm: 22.1,
    kapasitasCore: 96,
    statusKoneksi: 'Optimal',
    tipeJalur: 'Konektivitas KEK Digital',
  },
  {
    id: 'fo-jlr-05',
    tahun: '2026',
    bagianWilayah: 'Kabil / Nongsa Selatan',
    lokasi: 'Kawasan Industri Terpadu Kabil - Pelabuhan Curah CPO & Fasilitas KPLI B3',
    panjangKm: 19.3,
    kapasitasCore: 48,
    statusKoneksi: 'Aktif Normal',
    tipeJalur: 'Distribusi Industri',
  },
  {
    id: 'fo-jlr-06',
    tahun: '2026',
    bagianWilayah: 'Batam Kota / Hang Nadim',
    lokasi: 'Spur Link Terminal Bandara Hang Nadim - KEK Kedirgantaraan Batam Aero Technic (BAT)',
    panjangKm: 16.7,
    kapasitasCore: 48,
    statusKoneksi: 'Aktif Normal',
    tipeJalur: 'Spur Link Bandara',
  },
  {
    id: 'fo-jlr-07',
    tahun: '2026',
    bagianWilayah: 'Lubuk Baja / Nagoya',
    lokasi: 'Sentra Finansial Nagoya - Perkantoran Perbankan Mitra & Pelayanan Terpadu',
    panjangKm: 12.4,
    kapasitasCore: 72,
    statusKoneksi: 'Siaga Redundan',
    tipeJalur: 'Distribusi Komersial',
  },
  {
    id: 'fo-jlr-08',
    tahun: '2026',
    bagianWilayah: 'Batu Aji / Sagulung',
    lokasi: 'Kawasan Pelayanan Publik Terpadu Selatan - Koridor Mukakuning Industri & Simpang Barelang',
    panjangKm: 21.0,
    kapasitasCore: 48,
    statusKoneksi: 'Aktif Normal',
    tipeJalur: 'Distribusi Pelayanan',
  },
];

// =========================================================================
// DATASET NO. 9 (Hal. 41-42): DAFTAR SOFTWARE BP BATAM
// Atribut Resmi: ID, NAMA SOFTWARE, DESKRIPSI, TIPE PERANGKAT LUNAK, JENIS SISTEM OPERASI,
// JENIS SISTEM UTILITAS, JENIS SISTEM DATABASE, JENIS LISENSI, PEMILIK LISENSI, VALIDASI LISENSI
// =========================================================================
export interface PdsiSoftwareItem {
  id: string;
  namaSoftware: string;
  deskripsi: string;
  tipePerangkatLunak: string;
  jenisSistemOperasi: string;
  jenisSistemUtilitas: string;
  jenisSistemDatabase: string;
  jenisLisensi: string;
  pemilikLisensi: string;
  validasiLisensi: string;
  kategori: string;
}

export const DAFTAR_SOFTWARE_BP_BATAM: PdsiSoftwareItem[] = [
  {
    id: 'SW-01',
    namaSoftware: 'VMware vSphere Enterprise Plus',
    deskripsi: 'Platform virtualisasi server bare-metal hypervisor untuk konsolidasi node komputasi Data Center',
    tipePerangkatLunak: 'Sistem Virtualisasi Server Hypervisor',
    jenisSistemOperasi: 'VMware ESXi / Linux Core',
    jenisSistemUtilitas: 'vCenter Server High Availability & DRS',
    jenisSistemDatabase: 'Embedded PostgreSQL Database',
    jenisLisensi: 'Perpetual Enterprise License with SnS',
    pemilikLisensi: 'BP Batam (PDSI)',
    validasiLisensi: 'Aktif (Valid s.d. 2027)',
    kategori: 'Virtualisasi & Cloud',
  },
  {
    id: 'SW-02',
    namaSoftware: 'Oracle Database Enterprise Edition 19c',
    deskripsi: 'Sistem manajemen basis data relasional enterprise mission-critical transaksi SIMKEU & Lahan',
    tipePerangkatLunak: 'RDBMS (Relational Database Management System)',
    jenisSistemOperasi: 'Oracle Linux / Red Hat Enterprise Linux 8/9',
    jenisSistemUtilitas: 'Oracle Data Guard & Real Application Clusters (RAC)',
    jenisSistemDatabase: 'Oracle Database 19c Multi-Tenant',
    jenisLisensi: 'Processor License Enterprise',
    pemilikLisensi: 'BP Batam',
    validasiLisensi: 'Aktif (Support Contract Valid)',
    kategori: 'Database Server',
  },
  {
    id: 'SW-03',
    namaSoftware: 'Red Hat Enterprise Linux (RHEL 9)',
    deskripsi: 'Sistem operasi server standar enterprise untuk container microservices dan database production',
    tipePerangkatLunak: 'Sistem Operasi Server Enterprise',
    jenisSistemOperasi: 'Red Hat Enterprise Linux Server',
    jenisSistemUtilitas: 'Red Hat Insights & SELinux Security Enforcing',
    jenisSistemDatabase: 'Native PostgreSQL / MariaDB Support',
    jenisLisensi: 'Enterprise Standard Subscription',
    pemilikLisensi: 'BP Batam (PDSI)',
    validasiLisensi: 'Aktif (Annual Subscription)',
    kategori: 'Sistem Operasi',
  },
  {
    id: 'SW-04',
    namaSoftware: 'Microsoft Windows Server 2022 Datacenter',
    deskripsi: 'Sistem operasi server manajemen Active Directory, Domain Controller, DNS, dan File Services',
    tipePerangkatLunak: 'Sistem Operasi Server & Direktori Pengguna',
    jenisSistemOperasi: 'Windows Server 2022 Datacenter 64-bit',
    jenisSistemUtilitas: 'Active Directory Domain Services (AD DS) & Hyper-V',
    jenisSistemDatabase: 'Microsoft SQL Server Express Built-in',
    jenisLisensi: 'Core-based License Datacenter Edition',
    pemilikLisensi: 'BP Batam',
    validasiLisensi: 'Aktif (Volume Licensing Agreement)',
    kategori: 'Sistem Operasi',
  },
  {
    id: 'SW-05',
    namaSoftware: 'FortiGate FortiOS Enterprise Security Suite',
    deskripsi: 'Sistem operasi jaringan dan keamanan Next-Generation Firewall (NGFW) perlindungan border Data Center',
    tipePerangkatLunak: 'Sistem Utilitas Keamanan Jaringan & UTM',
    jenisSistemOperasi: 'FortiOS v7.4 Hardened Kernel',
    jenisSistemUtilitas: 'Intrusion Prevention System (IPS), Anti-Botnet & SSL Inspection',
    jenisSistemDatabase: 'FortiAnalyzer Internal Log Database',
    jenisLisensi: 'Appliance Security Subscription',
    pemilikLisensi: 'BP Batam (PDSI CSIRT)',
    validasiLisensi: 'Aktif (Perpanjangan Tahunan)',
    kategori: 'Keamanan / Cyber',
  },
  {
    id: 'SW-06',
    namaSoftware: 'Veeam Backup & Replication Enterprise Plus',
    deskripsi: 'Perangkat lunak cadangan data otomatis, snapshot replikasi virtual machine dan Disaster Recovery ke DRC',
    tipePerangkatLunak: 'Sistem Utilitas Pencadangan & Pemulihan Data',
    jenisSistemOperasi: 'Windows Server / Linux Agent',
    jenisSistemUtilitas: 'Instant VM Recovery & Deduplication Engine',
    jenisSistemDatabase: 'PostgreSQL Dedicated Configuration DB',
    jenisLisensi: 'Veeam Universal License (VUL)',
    pemilikLisensi: 'BP Batam (PDSI)',
    validasiLisensi: 'Aktif (Supported)',
    kategori: 'Utilitas & Backup',
  },
  {
    id: 'SW-07',
    namaSoftware: 'Microsoft 365 Enterprise E3 Suite',
    deskripsi: 'Platform kolaborasi email kedinasan, perkantoran cloud, SharePoint intranet, dan perlindungan identitas',
    tipePerangkatLunak: 'Perangkat Lunak Produktivitas & Kolaborasi',
    jenisSistemOperasi: 'Cross-platform (Windows, Mac, Web, Mobile)',
    jenisSistemUtilitas: 'Microsoft Defender for Office 365 & Exchange Online',
    jenisSistemDatabase: 'Azure Cosmos & Exchange Data Store',
    jenisLisensi: 'User Subscription License (USL)',
    pemilikLisensi: 'BP Batam',
    validasiLisensi: 'Aktif (Enterprise Agreement)',
    kategori: 'Produktivitas & Office',
  },
  {
    id: 'SW-08',
    namaSoftware: 'PostgreSQL Enterprise Open Source Edition',
    deskripsi: 'Basis data open-source dengan ekstensi PostGIS untuk sistem informasi geografis pertanahan',
    tipePerangkatLunak: 'Open Source Relational Database Management',
    jenisSistemOperasi: 'Linux RHEL / Ubuntu Server',
    jenisSistemUtilitas: 'pgAdmin Management & PostGIS Spatial Extension',
    jenisSistemDatabase: 'PostgreSQL v16',
    jenisLisensi: 'PostgreSQL License (Open Source Permissive)',
    pemilikLisensi: 'BP Batam (Community / Supported)',
    validasiLisensi: 'Valid (Verified Open Source)',
    kategori: 'Database Server',
  },
  {
    id: 'SW-09',
    namaSoftware: 'CrowdStrike Falcon Endpoint Protection',
    deskripsi: 'Platform EDR (Endpoint Detection and Response) pendeteksi ancaman malware dan ransomware real-time',
    tipePerangkatLunak: 'Sistem Utilitas Keamanan Endpoint',
    jenisSistemOperasi: 'Windows, Linux, macOS',
    jenisSistemUtilitas: 'Falcon Threat Graph & Behavioral AI Prevention',
    jenisSistemDatabase: 'Cloud-native Graph Database',
    jenisLisensi: 'Cloud SaaS Subscription Per-Endpoint',
    pemilikLisensi: 'BP Batam (CSIRT)',
    validasiLisensi: 'Aktif (Validasi BSSN Compliance)',
    kategori: 'Keamanan / Cyber',
  },
  {
    id: 'SW-10',
    namaSoftware: 'ArcGIS Enterprise Geodatabase Server',
    deskripsi: 'Sistem pemetaan spasial dan manajemen data geospasial pertanahan perkotaan Batam',
    tipePerangkatLunak: 'Sistem Informasi Geografis Enterprise',
    jenisSistemOperasi: 'Windows Server 64-bit / Linux',
    jenisSistemUtilitas: 'ArcGIS Server Manager & Portal for ArcGIS',
    jenisSistemDatabase: 'Oracle Spatial / PostgreSQL PostGIS',
    jenisLisensi: 'Esri Enterprise Agreement (Core License)',
    pemilikLisensi: 'BP Batam (Direktorat Lahan & PDSI)',
    validasiLisensi: 'Aktif (Maintenance Valid)',
    kategori: 'Spasial & Pemetaan',
  },
];

// =========================================================================
// DATASET NO. 11 (Hal. 42): DATA KEPUASAN PELANGGAN DATA CENTRE
// Atribut Resmi: TAHUN, KATEGORI, TINGKAT KEPUASAN, PERSENTASE
// =========================================================================
export interface PdsiKepuasanDcItem {
  id: string;
  tahun: string;
  kategori: string;
  tingkatKepuasan: string;
  persentase: number;
  skorSkala5: number;
  jumlahResponden: number;
}

export const DATA_KEPUASAN_PELANGGAN_DC: PdsiKepuasanDcItem[] = [
  {
    id: 'csat-01',
    tahun: '2026',
    kategori: 'Keandalan Daya Listrik & Redundansi UPS',
    tingkatKepuasan: 'Sangat Puas',
    persentase: 96.5,
    skorSkala5: 4.83,
    jumlahResponden: 52,
  },
  {
    id: 'csat-02',
    tahun: '2026',
    kategori: 'Keamanan Fisik 24/7 & Sistem Akses Biometrik',
    tingkatKepuasan: 'Sangat Puas',
    persentase: 95.8,
    skorSkala5: 4.79,
    jumlahResponden: 52,
  },
  {
    id: 'csat-03',
    tahun: '2026',
    kategori: 'Kecepatan Respons Dukungan Teknis (SLA Helpdesk)',
    tingkatKepuasan: 'Sangat Puas',
    persentase: 94.2,
    skorSkala5: 4.71,
    jumlahResponden: 52,
  },
  {
    id: 'csat-04',
    tahun: '2026',
    kategori: 'Stabilitas Suhu Ruang & Sistem Pendingin Presisi PAC',
    tingkatKepuasan: 'Sangat Puas',
    persentase: 93.6,
    skorSkala5: 4.68,
    jumlahResponden: 52,
  },
  {
    id: 'csat-05',
    tahun: '2026',
    kategori: 'Kecepatan Bandwidth & Konektivitas Fiber Optic',
    tingkatKepuasan: 'Sangat Puas',
    persentase: 92.4,
    skorSkala5: 4.62,
    jumlahResponden: 52,
  },
  {
    id: 'csat-06',
    tahun: '2026',
    kategori: 'Kemudahan Administrasi Izin Kunjungan Teknis',
    tingkatKepuasan: 'Puas',
    persentase: 90.5,
    skorSkala5: 4.52,
    jumlahResponden: 52,
  },
];

// Data Aplikasi BP Batam (Item #14 di PDF: DATA APLIKASI BP BATAM)
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
    namaAplikasi: 'SIM-Billing & Kasir Penerimaan Kas Daerah',
    uraianAplikasi: 'Penerbitan faktur tagihan retribusi, validasi pembayaran host-to-host bank dan cetak kuitansi digital',
    unitOperasional: 'Biro Keuangan',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Keuangan & Aset',
    status: 'Aktif Operasional',
    devYear: 2022,
  },
  {
    id: 'app-03',
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
    id: 'app-04',
    namaAplikasi: 'WebGIS Peta Alokasi & Tematik Lahan Batam',
    uraianAplikasi: 'Visualisasi spasial batas persil, status hak pengelolaan, zona BSW dan overlay tata ruang',
    unitOperasional: 'Direktorat Pengelolaan Lahan',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Spasial GIS',
    status: 'Aktif Operasional',
    devYear: 2021,
  },
  {
    id: 'app-05',
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
    id: 'app-06',
    namaAplikasi: 'SIM-Aset & Inventarisasi BMN BP Batam',
    uraianAplikasi: 'Pencatatan aset tetap, inventaris peralatan kantor, kendaraan dinas dan pelaporan SIMAK BMN',
    unitOperasional: 'Biro Umum',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Keuangan & Aset',
    status: 'Aktif Operasional',
    devYear: 2020,
  },
  {
    id: 'app-07',
    namaAplikasi: 'Batam Online Single Submission (IBOSS / MPP Digital)',
    uraianAplikasi: 'Portal layanan perizinan terpadu investasi, izin usaha kawasan, lalu lintas barang, dan perizinan non-OSS',
    unitOperasional: 'Pusat Pelayanan Terpadu Satu Pintu (PTSP)',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    devYear: 2023,
  },
  {
    id: 'app-08',
    namaAplikasi: 'Sistem Perizinan Usaha Kawasan & LKPM Online',
    uraianAplikasi: 'Verifikasi kepatuhan investasi industri kawasan, tracking dokumen perizinan dan asistensi investor',
    unitOperasional: 'Pusat Pelayanan Terpadu Satu Pintu (PTSP)',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    devYear: 2023,
  },
  {
    id: 'app-09',
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
    id: 'app-10',
    namaAplikasi: 'Vessel Traffic Management & Billing Pass Pelabuhan',
    uraianAplikasi: 'Monitoring real-time kedatangan kapal, pergerakan peti kemas TOS dan tiket pass penumpang pelabuhan',
    unitOperasional: 'Direktorat Pengelolaan Kepelabuhanan',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    devYear: 2022,
  },
  {
    id: 'app-11',
    namaAplikasi: 'SIMRS Gos v2 (Sistem Informasi Rumah Sakit BP Batam)',
    uraianAplikasi: 'Rekam medis elektronik (RME), registrasi rawat inap/jalan IGD, resep obat farmasi, dan billing klaim BPJS',
    unitOperasional: 'Badan Usaha Rumah Sakit (RSBP)',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    devYear: 2023,
  },
  {
    id: 'app-12',
    namaAplikasi: 'Portal Registrasi Pasien & RME RSBP Batam',
    uraianAplikasi: 'Antrean daring mobile pasien poliklinik, rekam medis terpadu dan hasil laboratorium digital',
    unitOperasional: 'Badan Usaha Rumah Sakit (RSBP)',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Hybrid',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    devYear: 2024,
  },
  {
    id: 'app-13',
    namaAplikasi: 'Sistem Informasi Distribusi Air & Billing SPAM Batam',
    uraianAplikasi: 'Pencatatan meter air pelanggan, pemantauan tekanan pipa DMZ dan integrasi pembayaran air bersih',
    unitOperasional: 'Badan Usaha SPAM, Fasilitas dan Lingkungan',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    devYear: 2022,
  },
  {
    id: 'app-14',
    namaAplikasi: 'Sistem Monitoring Limbah B3 KPLI Kabil',
    uraianAplikasi: 'Pencatatan pass masuk limbah B3 industri, manifes pengolahan limbah dan timbangan digital truk',
    unitOperasional: 'Badan Usaha SPAM, Fasilitas dan Lingkungan',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Pelayanan Publik',
    status: 'Aktif Operasional',
    devYear: 2021,
  },
  {
    id: 'app-15',
    namaAplikasi: 'Bcare Helpdesk & Tiket Layanan TI BP Batam',
    uraianAplikasi: 'Penerimaan aduan insiden TIK, permohonan modul, hak akses sistem dan monitoring SLA tim helpdesk',
    unitOperasional: 'Pusat Data dan Sistem Informasi (PDSI)',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Administrasi Pemerintahan',
    status: 'Aktif Operasional',
    devYear: 2023,
  },
  {
    id: 'app-16',
    namaAplikasi: 'Portal Satu Data & Business Intelligence BP Batam',
    uraianAplikasi: 'Repositori metadata data sektoral, visualisasi dashboard analitik kinerja dan pertukaran data API',
    unitOperasional: 'Pusat Data dan Sistem Informasi (PDSI)',
    unitPengembang: 'Pusat Data dan Sistem Informasi (PDSI)',
    basisAplikasi: 'Web',
    kategoriAplikasi: 'Administrasi Pemerintahan',
    status: 'Aktif Operasional',
    devYear: 2024,
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

// Tabel Informasi Indeks SPBE (Atribut: Level/Nilai per domain 0-5, Tahun, Evidence, Status Pemenuhan kriteria 1-5 sesuai formula Perkin)
export interface SpbeIndexInfoItem {
  id: string;
  domain: string;
  aspek: string;
  levelNilai: number; // 0 - 5
  bobot: string;
  tahun: number;
  evidence: string;
  statusPemenuhan: string; // Kriteria 1-5
  levelKriteria: number; // 1 - 5
  predikat: string;
}

export const SPBE_INDEX_INFO_DATA: SpbeIndexInfoItem[] = [
  {
    id: 'spbe-dom-01',
    domain: 'Domain 1: Kebijakan Internal SPBE',
    aspek: 'Tata Kelola SPBE & Layanan Administrasi',
    levelNilai: 3.85,
    bobot: '13,0%',
    tahun: 2026,
    evidence: 'Perka BP Batam No. 12/2023 tentang Tata Kelola SPBE & Pedoman Arsitektur SPBE BP Batam',
    statusPemenuhan: 'Level 4: Terpadu / Terintegrasi (Kriteria Perkin 4)',
    levelKriteria: 4,
    predikat: 'Sangat Baik',
  },
  {
    id: 'spbe-dom-02',
    domain: 'Domain 2: Tata Kelola SPBE',
    aspek: 'Kelembagaan, Strategi & Perencanaan TIK',
    levelNilai: 3.65,
    bobot: '25,0%',
    tahun: 2026,
    evidence: 'Dokumen Arsitektur & Peta Rencana SPBE 2025-2029, SK Tim Koordinasi SPBE BP Batam',
    statusPemenuhan: 'Level 4: Terpadu / Kolaboratif (Kriteria Perkin 4)',
    levelKriteria: 4,
    predikat: 'Sangat Baik',
  },
  {
    id: 'spbe-dom-03',
    domain: 'Domain 3: Manajemen SPBE',
    aspek: 'Manajemen Risiko, Keamanan Info & Data',
    levelNilai: 3.45,
    bobot: '17,0%',
    tahun: 2026,
    evidence: 'Piagam Manajemen Risiko TIK, Sertifikasi ISO 27001 CSIRT, Audit Keamanan BSSN & SOP CSIRT',
    statusPemenuhan: 'Level 3: Terstandarisasi / Diterapkan (Kriteria Perkin 3)',
    levelKriteria: 3,
    predikat: 'Baik',
  },
  {
    id: 'spbe-dom-04',
    domain: 'Domain 4: Layanan SPBE',
    aspek: 'Layanan Administrasi & Layanan Publik Terpadu',
    levelNilai: 3.78,
    bobot: '45,0%',
    tahun: 2026,
    evidence: 'Portal IBOSS, SIMKEU Keuangan, Portal Satu Data Batam, Integrasi TTE BSrE, Helpdesk Mobile',
    statusPemenuhan: 'Level 4: Terpadu Antar-Unit & Terhubung Pusat (Kriteria Perkin 4)',
    levelKriteria: 4,
    predikat: 'Sangat Baik',
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

