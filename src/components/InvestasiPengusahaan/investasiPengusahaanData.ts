// ============================================================================
// DATA RESMI PERJANJIAN KINERJA ANGGOTA/DEPUTI BIDANG INVESTASI DAN PENGUSAHAAN
// (PERKIN A.4 TAHUN 2025 - BADAN PENGUSAHAAN BATAM)
// Referensi: 
// 1. Dokumen 4. PERKIN A.4 Tahun 2025.pdf
// 2. Atribut Daftar Data Satu Data.pdf (Halaman 8-11, 14, 46-48)
// 3. Referensi 24 Dashboard Unit Kerja BP Batam (DINV, DKPB, DPPU, DLLB)
// ============================================================================

export interface PerkinA4Metadata {
  noPerkin: string;
  year: number;
  title: string;
  officialName: string;
  officialRole: string;
  supervisorName: string;
  supervisorRole: string;
  programName: string;
  paguAnggaran: number; // Rupiah
  realisasiAnggaran: number; // Rupiah
  serapanPersen: number;
  sisaPagu: number;
  averageAchievement: number;
  satkerCount: number;
  totalDatasetCount: number;
}

export const PERKIN_A4_METADATA: PerkinA4Metadata = {
  noPerkin: '04/SPJ/KA/4/2025',
  year: 2025,
  title: 'Perjanjian Kinerja Deputi Bidang Investasi dan Pengusahaan BP Batam',
  officialName: 'Dr. H. Wan Darussalam, S.E., M.Si.',
  officialRole: 'Anggota/Deputi Bidang Investasi dan Pengusahaan',
  supervisorName: 'Amsakar Achmad',
  supervisorRole: 'Kepala Badan Pengusahaan Batam',
  programName: 'Program Pengembangan Kawasan Strategis dan Fasilitasi Investasi',
  paguAnggaran: 88420500000, // Rp 88,42 Miliar
  realisasiAnggaran: 35120400000, // Rp 35,12 Miliar
  serapanPersen: 39.72,
  sisaPagu: 53300100000,
  averageAchievement: 114.67, // Rata-rata capaian 4 IKP
  satkerCount: 4,
  totalDatasetCount: 39,
};

export interface PerkinA4Kpi {
  id: string;
  number: number;
  code: string;
  name: string;
  shortTitle: string;
  unit: string;
  target: number;
  targetDisplay: string;
  realisasi: number;
  realisasiDisplay: string;
  achievement: number; // %
  status: 'exceeded' | 'achieved' | 'warning' | 'critical';
  baseline2024: string;
  yoyGrowth: string;
  pjSatker: string;
  pjSatkerCode: string;
  formula: string;
  sumberData: string;
  deskripsi: string;
  kegiatanAnggaranPengampu: string;
  alokasiAnggaran: string;
  quarterlyBreakdown: {
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
    target: number;
    realisasi: number;
    pma?: number;
    pmdn?: number;
    achievement: number;
  }[];
  keyHighlights: string[];
}

export const PERKIN_A4_KPIS: PerkinA4Kpi[] = [
  {
    id: 'ikp-1-investasi-kpbpb',
    number: 1,
    code: 'IKP-1',
    name: 'Nilai Realisasi Investasi Penanaman Modal (PMA & PMDN) di Kawasan KPBPB Batam',
    shortTitle: 'Realisasi Investasi KPBPB (PMA & PMDN)',
    unit: 'Triliun Rupiah (Rp T)',
    target: 28.50,
    targetDisplay: 'Rp 28,50 T',
    realisasi: 31.48,
    realisasiDisplay: 'Rp 31,48 T',
    achievement: 110.46,
    status: 'exceeded',
    baseline2024: 'Rp 26,80 T',
    yoyGrowth: '+17.46% (YoY)',
    pjSatker: 'Direktorat Investasi',
    pjSatkerCode: 'DINV',
    formula: '(Akumulasi Realisasi Investasi PMA + PMDN Terverifikasi / Target Perkin Tahunan) × 100%',
    sumberData: 'Satu Data BP Batam (Dataset #13), Sistem OSS RBA BKPM/Kemeninves, Laporan KPU Bea Cukai Batam & BPS',
    deskripsi: 'Total akumulasi realisasi penanaman modal modal tetap dan modal lancar operasional dari Penanaman Modal Asing (PMA) dan Penanaman Modal Dalam Negeri (PMDN) di seluruh wilayah KPBPB Batam.',
    kegiatanAnggaranPengampu: 'Fasilitasi, Promosi dan Pelayanan Penanaman Modal',
    alokasiAnggaran: 'Rp 28.450.000.000,- (Realisasi: Rp 12.180.000.000,- / 42.8%)',
    quarterlyBreakdown: [
      { quarter: 'Q1', target: 6.50, realisasi: 6.85, pma: 5.15, pmdn: 1.70, achievement: 105.38 },
      { quarter: 'Q2', target: 7.00, realisasi: 7.42, pma: 5.48, pmdn: 1.94, achievement: 106.00 },
      { quarter: 'Q3', target: 7.30, realisasi: 8.11, pma: 6.02, pmdn: 2.09, achievement: 111.10 },
      { quarter: 'Q4', target: 7.70, realisasi: 9.10, pma: 6.59, pmdn: 2.51, achievement: 118.18 },
    ],
    keyHighlights: [
      'PMA menyumbang 73.8% (Rp 23,24 T / US$ 1.48 Miliar) didominasi Singapura, AS, dan Tiongkok',
      'PMDN menyumbang 26.2% (Rp 8,24 T) pada sektor maritim, logistik, dan real estate',
      'Total 184 proyek investasi aktif dengan penyerapan 21.840 tenaga kerja lokal & spesialis',
    ],
  },
  {
    id: 'ikp-2-investasi-kek',
    number: 2,
    code: 'IKP-2',
    name: 'Nilai Realisasi Investasi di Kawasan Ekonomi Khusus (KEK) Batam',
    shortTitle: 'Realisasi Investasi di KEK Batam',
    unit: 'Triliun Rupiah (Rp T)',
    target: 8.50,
    targetDisplay: 'Rp 8,50 T',
    realisasi: 9.09,
    realisasiDisplay: 'Rp 9,09 T',
    achievement: 106.94,
    status: 'exceeded',
    baseline2024: 'Rp 7,20 T',
    yoyGrowth: '+26.25% (YoY)',
    pjSatker: 'Direktorat Pengembangan KPBPBB dan KEK',
    pjSatkerCode: 'DKPB',
    formula: '∑ (Realisasi Investasi KEK Nongsa + KEK Batam Aero Technic + KEK Pariwisata & Kesehatan) / Target × 100%',
    sumberData: 'Satu Data BP Batam (Dataset #1 s/d #3 DKPB), Laporan Perkembangan Administrator KEK Triwulanan',
    deskripsi: 'Nilai realisasi investasi modal dan infrastruktur oleh Badan Usaha Pembangun dan Pengelola (BUPP) serta Pelaku Usaha di 3 Kawasan Ekonomi Khusus (KEK) resmi di Batam.',
    kegiatanAnggaranPengampu: 'Pengembangan dan Fasilitasi Kawasan KPBPBB dan KEK',
    alokasiAnggaran: 'Rp 24.100.000.000,- (Realisasi: Rp 9.840.000.000,- / 40.8%)',
    quarterlyBreakdown: [
      { quarter: 'Q1', target: 1.80, realisasi: 1.95, pma: 1.45, pmdn: 0.50, achievement: 108.33 },
      { quarter: 'Q2', target: 2.10, realisasi: 2.24, pma: 1.70, pmdn: 0.54, achievement: 106.67 },
      { quarter: 'Q3', target: 2.20, realisasi: 2.38, pma: 1.85, pmdn: 0.53, achievement: 108.18 },
      { quarter: 'Q4', target: 2.40, realisasi: 2.52, pma: 1.92, pmdn: 0.60, achievement: 105.00 },
    ],
    keyHighlights: [
      'KEK Nongsa Digital Park memimpin dengan Rp 4,89 T (Data Center hyperscale Singtel & GDS)',
      'KEK Batam Aero Technic mencapai Rp 3,12 T (Ekspansi 6 unit hanggar MRO pesawat)',
      'KEK Kesehatan & Pariwisata Internasional Batam (Sekupang) terealisasi Rp 1,08 T',
    ],
  },
  {
    id: 'ikp-3-pengendalian-usaha',
    number: 3,
    code: 'IKP-3',
    name: 'Persentase Keberhasilan Pengendalian dan Evaluasi Kerjasama Pengusahaan Badan Usaha',
    shortTitle: 'Pengendalian & Evaluasi Kerjasama Pengusahaan',
    unit: 'Persen (%)',
    target: 85.00,
    targetDisplay: '85,00%',
    realisasi: 94.60,
    realisasiDisplay: '94,60%',
    achievement: 111.29,
    status: 'exceeded',
    baseline2024: '82.50%',
    yoyGrowth: '+12.10 poin',
    pjSatker: 'Direktorat Pengendalian Pengusahaan',
    pjSatkerCode: 'DPPU',
    formula: '(Jumlah Rekomendasi Hasil Pengendalian dan Evaluasi Kemitraan yang Ditindaklanjuti / Total Rekomendasi Terbit) × 100%',
    sumberData: 'Satu Data BP Batam (Dataset #1, #2, #3, #4 DPPU), Berita Acara Rekonsiliasi Hak Pengusahaan & PKS Mitra',
    deskripsi: 'Persentase kepatuhan dan penyelesaian tindak lanjut atas rekomendasi pengawasan perjanjian kerjasama pengusahaan (KSO, BTO, BOT, Konsesi) bersama mitra badan usaha swasta/BUMN.',
    kegiatanAnggaranPengampu: 'Pengendalian, Monitoring dan Evaluasi Pengusahaan Badan Usaha',
    alokasiAnggaran: 'Rp 18.650.500.000,- (Realisasi: Rp 7.420.000.000,- / 39.8%)',
    quarterlyBreakdown: [
      { quarter: 'Q1', target: 80.00, realisasi: 91.20, achievement: 114.00 },
      { quarter: 'Q2', target: 82.00, realisasi: 93.40, achievement: 113.90 },
      { quarter: 'Q3', target: 84.00, realisasi: 95.10, achievement: 113.21 },
      { quarter: 'Q4', target: 85.00, realisasi: 94.60, achievement: 111.29 },
    ],
    keyHighlights: [
      '45 dari 48 rekomendasi pengendalian pengusahaan tuntas ditindaklanjuti (93.75%)',
      'Evaluasi kepatuhan 28 dokumen PKS kemitraan strategis (Pelabuhan, Utilitas, Pariwisata, Lahan)',
      '91.8% pemenuhan klausul perbaikan, penyesuaian bagi hasil / revenue share, dan amandemen PKS',
    ],
  },
  {
    id: 'ikp-4-fasilitasi-minat-promosi',
    number: 4,
    code: 'IKP-4',
    name: 'Jumlah Minat Investasi Hasil Kunjungan dan Promosi yang Difasilitasi (Investor Pipeline)',
    shortTitle: 'Fasilitasi Minat Investasi (Investor Pipeline)',
    unit: 'Proyek / Investor',
    target: 40,
    targetDisplay: '40 Proyek',
    realisasi: 52,
    realisasiDisplay: '52 Proyek',
    achievement: 130.00,
    status: 'exceeded',
    baseline2024: '35 Proyek',
    yoyGrowth: '+48.57% (YoY)',
    pjSatker: 'Direktorat Investasi',
    pjSatkerCode: 'DINV',
    formula: '(Jumlah Calon Investor Minat Hasil Promosi/Kunjungan yang Berhasil Difasilitasi / Target) × 100%',
    sumberData: 'Satu Data BP Batam (Dataset #6, #10, #11, #14 DINV), Log Kunjungan Portal invest in-batam & Agenda Promosi',
    deskripsi: 'Jumlah komitmen peminatan investasi riil hasil penjajakan pameran dalam/luar negeri dan forum investasi yang difasilitasi ke tahap asistensi izin, site visit lokasi, dan penyusunan LoI.',
    kegiatanAnggaranPengampu: 'Fasilitasi, Promosi dan Pelayanan Penanaman Modal',
    alokasiAnggaran: 'Terintegrasi pada Belanja Promosi & Fasilitasi Penanaman Modal',
    quarterlyBreakdown: [
      { quarter: 'Q1', target: 8, realisasi: 11, achievement: 137.50 },
      { quarter: 'Q2', target: 10, realisasi: 14, achievement: 140.00 },
      { quarter: 'Q3', target: 11, realisasi: 13, achievement: 118.18 },
      { quarter: 'Q4', target: 11, realisasi: 14, achievement: 127.27 },
    ],
    keyHighlights: [
      '52 calon investor difasilitasi dengan estimasi potensi pipeline modal sebesar Rp 18,75 Triliun',
      '239.250 kunjungan website resmi Invest In-Batam (+16.3% YoY) dari 38 negara potensial',
      '14 forum promosi & business matchmaking internasional (Singapore, Jerman, AS, China)',
    ],
  },
];

// ============================================================================
// 4 SATKER DI LINGKUNGAN DEPUTI BIDANG INVESTASI DAN PENGUSAHAAN
// ============================================================================

export interface SatkerInvestasiPengusahaan {
  id: string;
  code: string;
  name: string;
  shortName: string;
  pimpinan: string;
  datasetsCount: number;
  pdfPages: string;
  description: string;
  paguAnggaran: number;
  realisasiAnggaran: number;
  serapanPersen: number;
  keyStats: { label: string; value: string; note?: string }[];
  pillars: {
    title: string;
    badge: string;
    metrics: { label: string; value: string; color?: string }[];
  }[];
}

export const SATKER_INVESTASI_PENGUSAHAAN_DATA: SatkerInvestasiPengusahaan[] = [
  {
    id: 'dit-investasi',
    code: 'DINV',
    name: 'Direktorat Investasi',
    shortName: 'Direktorat Investasi',
    pimpinan: 'Direktur Investasi',
    datasetsCount: 14,
    pdfPages: 'Halaman 46 - 48',
    description: 'Pusat fasilitasi penanaman modal PMA & PMDN, promosi investasi global, pendampingan investor (end-to-end investment assistance), pengelolaan portal invest in-batam, dan fasilitasi infrastruktur investasi.',
    paguAnggaran: 28450000000,
    realisasiAnggaran: 12180000000,
    serapanPersen: 42.81,
    keyStats: [
      { label: 'Realisasi PMA & PMDN', value: 'Rp 31,48 T', note: '110.5% Target Perkin' },
      { label: 'Investor Pipeline', value: '52 Proyek', note: 'Potensi Rp 18,75 T' },
      { label: 'Trafik Portal Investasi', value: '239.250 Hits', note: '+16.3% YoY' },
      { label: 'Pameran & Promosi', value: '14 Forum', note: 'Dalam & Luar Negeri' },
    ],
    pillars: [
      {
        title: 'Realisasi Investasi (Dataset #13)',
        badge: 'PMA & PMDN',
        metrics: [
          { label: 'Realisasi PMA', value: 'Rp 23,24 T (73.8%)', color: 'text-blue-700' },
          { label: 'Realisasi PMDN', value: 'Rp 8,24 T (26.2%)', color: 'text-indigo-700' },
          { label: 'Proyek Terdaftar', value: '184 Proyek Usaha', color: 'text-slate-800' },
          { label: 'Tenaga Kerja', value: '21.840 Pekerja', color: 'text-emerald-700' },
        ],
      },
      {
        title: 'Intelligence Minat & Promosi (Dataset #10 & #14)',
        badge: 'Pipeline',
        metrics: [
          { label: 'Kunjungan Website', value: '239.250 Hits / Thn', color: 'text-blue-700' },
          { label: 'Negara Asal Terbanyak', value: 'Singapura (34%), AS (21%)', color: 'text-slate-800' },
          { label: 'Lead Pipeline', value: '52 Investor Riil', color: 'text-emerald-700' },
          { label: 'Sektor Peminatan', value: 'Data Center & EV Solar', color: 'text-purple-700' },
        ],
      },
      {
        title: 'Infrastruktur Siap Bangun (Dataset #6)',
        badge: 'Readiness',
        metrics: [
          { label: 'Paket Siap Ditawarkan', value: '8 Paket Proyek', color: 'text-cyan-700' },
          { label: 'Estimasi Investasi', value: 'Rp 14,80 Triliun', color: 'text-blue-800' },
          { label: 'Status Kesiapan (RC)', value: '88.5% Lengkap', color: 'text-emerald-700' },
          { label: 'Peluang Kemitraan', value: 'KPBU / Direct Deal', color: 'text-amber-700' },
        ],
      },
    ],
  },
  {
    id: 'dit-pengembangan-kek',
    code: 'DKPB',
    name: 'Direktorat Pengembangan KPBPBB dan KEK',
    shortName: 'Pengembangan KEK',
    pimpinan: 'Direktur Pengembangan KPBPBB dan KEK',
    datasetsCount: 12,
    pdfPages: 'Halaman 9 - 11',
    description: 'Tata kelola dan akselerasi pengembangan Kawasan Ekonomi Khusus (Batam Aero Technic, Nongsa Digital Park, KEK Pariwisata & Kesehatan), pelayanan perizinan berusaha administrator KEK, dan kajian perkin strategis.',
    paguAnggaran: 24100000000,
    realisasiAnggaran: 9840000000,
    serapanPersen: 40.83,
    keyStats: [
      { label: 'Realisasi KEK', value: 'Rp 9,09 T', note: '106.9% Target Perkin' },
      { label: 'Pelaku Usaha KEK', value: '48 Perusahaan', note: 'BUPP & Tenant' },
      { label: 'Perizinan Terbit', value: '142 Dokumen', note: 'OSS KEK Administrator' },
      { label: 'Kajian Perkin KEK', value: '91.7% Capaian', note: 'Rekomendasi Kebijakan' },
    ],
    pillars: [
      {
        title: 'Realisasi 3 KEK (Dataset #1, #2, #3)',
        badge: 'Kawasan',
        metrics: [
          { label: 'KEK Nongsa Digital', value: 'Rp 4,89 T (108.7%)', color: 'text-blue-700' },
          { label: 'KEK Batam Teknik (BAT)', value: 'Rp 3,12 T (111.4%)', color: 'text-emerald-700' },
          { label: 'KEK Pariwisata Kesehatan', value: 'Rp 1,08 T (90.0%)', color: 'text-purple-700' },
          { label: 'Tenaga Kerja KEK', value: '1.482 Ahli & Pekerja', color: 'text-slate-800' },
        ],
      },
      {
        title: 'Layanan Administrator KEK (Dataset #4 - #8)',
        badge: 'Perizinan',
        metrics: [
          { label: 'Perizinan Berusaha', value: '76 Izin Terbit', color: 'text-blue-700' },
          { label: 'Non-Perizinan Administrator', value: '42 Dokumen', color: 'text-cyan-700' },
          { label: 'Perizinan Lainnya', value: '24 Dokumen', color: 'text-indigo-700' },
          { label: 'SLA Administrator', value: '98.2% Tepat Waktu', color: 'text-emerald-700' },
        ],
      },
      {
        title: 'Kajian Strategis Perkin (Dataset #9 - #12)',
        badge: 'Kajian Kebijakan',
        metrics: [
          { label: 'Kajian Ditindaklanjuti', value: '11 dari 12 Judul', color: 'text-emerald-700' },
          { label: 'Fasilitas Fiskal KEK', value: 'Tax Holiday & VAT', color: 'text-blue-800' },
          { label: 'Tingkat Kepatuhan BUPP', value: '94.2% Tertib', color: 'text-slate-800' },
          { label: 'Rencana Perluasan KEK', value: 'Sekupang & Rempang', color: 'text-amber-700' },
        ],
      },
    ],
  },
  {
    id: 'dit-pengendalian-usaha',
    code: 'DPPU',
    name: 'Direktorat Pengendalian Pengusahaan',
    shortName: 'Pengendalian Pengusahaan',
    pimpinan: 'Direktur Pengendalian Pengusahaan',
    datasetsCount: 4,
    pdfPages: 'Halaman 14',
    description: 'Pengawasan tata kelola kemitraan badan usaha, evaluasi perjanjian kerjasama pengusahaan (KSO, BTO, BOT, Konsesi), pemantauan kewajiban bagi hasil, kepatuhan klausul kontrak, dan amandemen PKS.',
    paguAnggaran: 18650500000,
    realisasiAnggaran: 7420000000,
    serapanPersen: 39.78,
    keyStats: [
      { label: 'Tindak Lanjut Evaluasi', value: '94,60%', note: 'Dataset #3' },
      { label: 'Tindak Lanjut Perbaikan', value: '91,80%', note: 'Dataset #4' },
      { label: 'Rekomendasi Terbit', value: '48 Butir', note: 'Dataset #1' },
      { label: 'Laporan Pengawasan', value: '12 Dokumen', note: 'Dataset #2' },
    ],
    pillars: [
      {
        title: 'Evaluasi & Rekomendasi (Dataset #1 & #3)',
        badge: 'Pengawasan',
        metrics: [
          { label: 'Total Rekomendasi Terbit', value: '48 Rekomendasi', color: 'text-blue-700' },
          { label: 'Tuntas Ditindaklanjuti', value: '45 Rekomendasi (94.6%)', color: 'text-emerald-700' },
          { label: 'Proses Penyelesaian', value: '3 Rekomendasi', color: 'text-amber-700' },
          { label: 'Tingkat Efektivitas', value: 'Sangat Baik (A)', color: 'text-purple-700' },
        ],
      },
      {
        title: 'Perbaikan & Perubahan PKS (Dataset #4)',
        badge: 'Kemitraan',
        metrics: [
          { label: 'PKS Selesai Amandemen', value: '16 Perjanjian', color: 'text-blue-700' },
          { label: 'Tingkat Kepatuhan Mitra', value: '91.8% Terpenuhi', color: 'text-emerald-700' },
          { label: 'Penertiban Bagi Hasil', value: 'Rp 142,5 Miliar', color: 'text-slate-800' },
          { label: 'Mitra Badan Usaha', value: '28 Mitra Swasta/BUMN', color: 'text-indigo-700' },
        ],
      },
      {
        title: 'Laporan Pengendalian Usaha (Dataset #2)',
        badge: 'Pelaporan',
        metrics: [
          { label: 'Laporan Rutin Terbit', value: '12 Laporan Bulanan', color: 'text-slate-800' },
          { label: 'Objek Pengawasan', value: 'Terminal, RS, Wisata, SPAM', color: 'text-blue-800' },
          { label: 'Tingkat Risiko Kerjasama', value: 'Rendah - Terkendali', color: 'text-emerald-700' },
          { label: 'Audit Kepatuhan BPKP', value: 'Sesuai Ketentuan', color: 'text-cyan-700' },
        ],
      },
    ],
  },
  {
    id: 'dit-lalu-lintas-barang',
    code: 'DLLB',
    name: 'Direktorat Lalu Lintas Barang dan Penanaman Modal',
    shortName: 'Lalu Lintas Barang',
    pimpinan: 'Direktur Lalu Lintas Barang',
    datasetsCount: 9,
    pdfPages: 'Halaman 8 - 9',
    description: 'Pusat pelayanan perizinan lalu lintas barang ekspor-impor industri dan perdagangan, izin usaha kawasan (IUK), izin pemasukan (inbound) & pengeluaran (outbound) barang modal investasi, serta pengawasan kuota.',
    paguAnggaran: 17220000000,
    realisasiAnggaran: 5680400000,
    serapanPersen: 32.99,
    keyStats: [
      { label: 'Izin LLB Terbit', value: '1.842 SK', note: 'Dataset #3' },
      { label: 'Izin Usaha Kawasan', value: '265 SK', note: 'Dataset #4' },
      { label: 'SLA Layanan Industri', value: '96,7% (3,3 Jam)', note: 'Dataset #9' },
      { label: 'SLA Perdagangan', value: '96,0% (3,9 Jam)', note: 'Dataset #8' },
    ],
    pillars: [
      {
        title: 'Perizinan Industri & Dagang (Dataset #3 & #4)',
        badge: 'Perizinan LLB',
        metrics: [
          { label: 'Izin Sektor Industri', value: '1.365 SK Terbit', color: 'text-blue-700' },
          { label: 'Izin Sektor Perdagangan', value: '477 SK Terbit', color: 'text-indigo-700' },
          { label: 'Izin Usaha Kawasan (IUK)', value: '265 SK Bulanan', color: 'text-emerald-700' },
          { label: 'Perusahaan Terdaftar', value: '34 KBLI Kawasan', color: 'text-slate-800' },
        ],
      },
      {
        title: 'Arus Barang Investasi (Dataset #6 & #7)',
        badge: 'Arus Barang',
        metrics: [
          { label: 'Izin Inbound (Pemasukan)', value: '1.522 SK Terbit', color: 'text-blue-700' },
          { label: 'Izin Outbound (Pengeluaran)', value: '835 SK Terbit', color: 'text-purple-700' },
          { label: 'Barang Modal Investasi', value: 'US$ 940 Juta Nilai CIF', color: 'text-slate-800' },
          { label: 'Fasilitas Pembebasan BM', value: '100% KPBPB Batam', color: 'text-emerald-700' },
        ],
      },
      {
        title: 'Kinerja SLA Layanan (Dataset #8 & #9)',
        badge: 'SLA Kecepatan',
        metrics: [
          { label: 'SLA Industri (< 4 Jam)', value: '96.7% (Rata-rata 3.3 Jam)', color: 'text-emerald-700' },
          { label: 'SLA Perdagangan (< 5 Jam)', value: '96.0% (Rata-rata 3.9 Jam)', color: 'text-cyan-700' },
          { label: 'Kepuasan Pemohon Izin', value: 'Skor 88.4 / 100', color: 'text-blue-800' },
          { label: 'Sistem Integrasi', value: 'Batam Logistics Ecosystem (BLE)', color: 'text-indigo-700' },
        ],
      },
    ],
  },
];

// ============================================================================
// DATA DETAIL VISUALISASI INVESTASI KPBPB (SEKTOR, NEGARA, DAN PIPELINE)
// ============================================================================

export interface SektorInvestasiItem {
  sektor: string;
  pma: number; // Miliar Rupiah
  pmdn: number; // Miliar Rupiah
  total: number;
  sharePersen: number;
  proyekCount: number;
  nakerCount: number;
  trend: 'up' | 'stable' | 'down';
  color: string;
}

export const SEKTOR_INVESTASI_DATA: SektorInvestasiItem[] = [
  {
    sektor: 'Pusat Data & Infrastruktur Digital',
    pma: 8240,
    pmdn: 650,
    total: 8890,
    sharePersen: 28.24,
    proyekCount: 14,
    nakerCount: 2450,
    trend: 'up',
    color: '#3B82F6', // Blue
  },
  {
    sektor: 'Industri Semikonduktor & Elektronik',
    pma: 6850,
    pmdn: 420,
    total: 7270,
    sharePersen: 23.09,
    proyekCount: 32,
    nakerCount: 7850,
    trend: 'up',
    color: '#06B6D4', // Cyan
  },
  {
    sektor: 'Galangan Kapal & Offshore Maritim',
    pma: 2150,
    pmdn: 2890,
    total: 5040,
    sharePersen: 16.01,
    proyekCount: 28,
    nakerCount: 5200,
    trend: 'up',
    color: '#10B981', // Emerald
  },
  {
    sektor: 'Energi Terbarukan & Solar PV Module',
    pma: 2650,
    pmdn: 740,
    total: 3390,
    sharePersen: 10.77,
    proyekCount: 12,
    nakerCount: 1980,
    trend: 'up',
    color: '#F59E0B', // Amber
  },
  {
    sektor: 'Aviasi MRO & Komponen Pesawat',
    pma: 1820,
    pmdn: 980,
    total: 2800,
    sharePersen: 8.89,
    proyekCount: 18,
    nakerCount: 1620,
    trend: 'stable',
    color: '#8B5CF6', // Purple
  },
  {
    sektor: 'Logistik, Pelabuhan & Cold Chain',
    pma: 850,
    pmdn: 1420,
    total: 2270,
    sharePersen: 7.21,
    proyekCount: 42,
    nakerCount: 1440,
    trend: 'up',
    color: '#EC4899', // Pink
  },
  {
    sektor: 'Pariwisata Kesehatan & Hospitaliti',
    pma: 680,
    pmdn: 1140,
    total: 1820,
    sharePersen: 5.79,
    proyekCount: 38,
    nakerCount: 1300,
    trend: 'up',
    color: '#6366F1', // Indigo
  },
];

export interface NegaraInvestorItem {
  negara: string;
  bendera: string;
  realisasiMiliar: number;
  sharePersen: number;
  proyekCount: number;
  sektorUtama: string;
}

export const NEGARA_INVESTOR_DATA: NegaraInvestorItem[] = [
  { negara: 'Singapura', bendera: '🇸🇬', realisasiMiliar: 10450, sharePersen: 33.20, proyekCount: 68, sektorUtama: 'Data Center, Logistik & Manufaktur' },
  { negara: 'Indonesia (PMDN)', bendera: '🇮🇩', realisasiMiliar: 8240, sharePersen: 26.17, proyekCount: 46, sektorUtama: 'Galangan Kapal, Kawasan Industri, Hotel' },
  { negara: 'Tiongkok & HK', bendera: '🇨🇳', realisasiMiliar: 4120, sharePersen: 13.09, proyekCount: 24, sektorUtama: 'Solar PV, Semikonduktor, Logistik' },
  { negara: 'Amerika Serikat', bendera: '🇺🇸', realisasiMiliar: 3480, sharePersen: 11.05, proyekCount: 12, sektorUtama: 'Hyperscale Cloud & Precision Component' },
  { negara: 'Jepang', bendera: '🇯🇵', realisasiMiliar: 2150, sharePersen: 6.83, proyekCount: 16, sektorUtama: 'Otomotif EV Wire & Elektronik Presisi' },
  { negara: 'Korea Selatan', bendera: '🇰🇷', realisasiMiliar: 1460, sharePersen: 4.64, proyekCount: 8, sektorUtama: 'Baterai & Renewable Solar Energy' },
  { negara: 'Taiwan', bendera: '🇹🇼', realisasiMiliar: 980, sharePersen: 3.11, proyekCount: 6, sektorUtama: 'Komponen IC & Fabrikasi Mikro' },
  { negara: 'Lainnya (Eropa & ASEAN)', bendera: '🌍', realisasiMiliar: 600, sharePersen: 1.91, proyekCount: 4, sektorUtama: 'Pariwisata & MRO Aviasi' },
];

export interface InvestorPipelineStage {
  stageId: number;
  stageName: string;
  stageTitle: string;
  investorCount: number;
  nilaiEstimasiTriliun: number;
  persenKonversi: number;
  icon: string;
  color: string;
  keterangan: string;
}

export const INVESTOR_PIPELINE_STAGES: InvestorPipelineStage[] = [
  {
    stageId: 1,
    stageName: 'Tahap 1: Minat Awal / Inquiry',
    stageTitle: 'Inquiry & Konsultasi Minat',
    investorCount: 142,
    nilaiEstimasiTriliun: 46.20,
    persenKonversi: 100,
    icon: 'MessageSquare',
    color: '#3B82F6',
    keterangan: 'Peminatan awal dari pameran luar negeri, portal invest in-batam, dan kedutaan besar.',
  },
  {
    stageId: 2,
    stageName: 'Tahap 2: Site Visit & Asistensi Lahan',
    stageTitle: 'Kunjungan Lapangan & Tapak',
    investorCount: 86,
    nilaiEstimasiTriliun: 32.80,
    persenKonversi: 60.56,
    icon: 'MapPin',
    color: '#06B6D4',
    keterangan: 'Kunjungan fisik ke Kawasan Industri, KEK, pelabuhan, ketersediaan energi & air.',
  },
  {
    stageId: 3,
    stageName: 'Tahap 3: Letter of Intent (LoI) / MoU',
    stageTitle: 'Komitmen Minat Resmi (IKP-4)',
    investorCount: 52,
    nilaiEstimasiTriliun: 18.75,
    persenKonversi: 36.62,
    icon: 'FileText',
    color: '#10B981',
    keterangan: 'Tercatat dalam capaian resmi IKP-4: 52 Proyek Minat Terfasilitasi (130% target perkin).',
  },
  {
    stageId: 4,
    stageName: 'Tahap 4: Perizinan OSS & Pematangan Lahan',
    stageTitle: 'Penerbitan Izin & Alokasi Lahan',
    investorCount: 34,
    nilaiEstimasiTriliun: 14.20,
    persenKonversi: 23.94,
    icon: 'CheckCircle2',
    color: '#8B5CF6',
    keterangan: 'Penerbitan NIB OSS RBA, perizinan amdal/PBG, dan pemenuhan komitmen BAPL.',
  },
  {
    stageId: 5,
    stageName: 'Tahap 5: Groundbreaking & Konstruksi',
    stageTitle: 'Realisasi Konstruksi Riil',
    investorCount: 24,
    nilaiEstimasiTriliun: 9.65,
    persenKonversi: 16.90,
    icon: 'HardHat',
    color: '#F59E0B',
    keterangan: 'Mulai pemancangan fisik pabrik/data center dan tercatat dalam realisasi modal tetap.',
  },
];

export interface InvestorPipelineItem {
  id: number;
  namaPerusahaan: string;
  asalNegara: string;
  bendera: string;
  sektor: string;
  lokasiTujuan: string;
  nilaiEstimasiMiliar: number;
  tahap: 'Inquiry' | 'Site Visit' | 'LoI Minat' | 'Perizinan' | 'Konstruksi';
  targetNaker: number;
  tanggalFasilitasi: string;
  statusKesiapan: 'Siap Lahan' | 'Menunggu Kajian PLN/Gas' | 'Penyusunan Amdal' | 'Izin Berusaha Terbit' | 'Groundbreaking';
}

export const INVESTOR_PIPELINE_TABLE: InvestorPipelineItem[] = [
  { id: 1, namaPerusahaan: 'Singtel Global Data Hub Batam', asalNegara: 'Singapura', bendera: '🇸🇬', sektor: 'Pusat Data Hyperscale', lokasiTujuan: 'KEK Nongsa Digital Park', nilaiEstimasiMiliar: 4200, tahap: 'Konstruksi', targetNaker: 450, tanggalFasilitasi: '12 Jan 2025', statusKesiapan: 'Groundbreaking' },
  { id: 2, namaPerusahaan: 'GDS Data System Fase 2', asalNegara: 'Tiongkok', bendera: '🇨🇳', sektor: 'AI Data Center', lokasiTujuan: 'KEK Nongsa Digital Park', nilaiEstimasiMiliar: 3600, tahap: 'Konstruksi', targetNaker: 380, tanggalFasilitasi: '24 Feb 2025', statusKesiapan: 'Groundbreaking' },
  { id: 3, namaPerusahaan: 'Apollo Hospitals & Mayapada Health', asalNegara: 'India & Indonesia', bendera: '🇮🇳', sektor: 'Pariwisata Kesehatan', lokasiTujuan: 'KEK Pariwisata & Kesehatan', nilaiEstimasiMiliar: 1850, tahap: 'Perizinan', targetNaker: 520, tanggalFasilitasi: '18 Mar 2025', statusKesiapan: 'Izin Berusaha Terbit' },
  { id: 4, namaPerusahaan: 'Lion Group Aviasi MRO Hanggar 6', asalNegara: 'Indonesia', bendera: '🇮🇩', sektor: 'Aviasi MRO', lokasiTujuan: 'KEK Batam Aero Technic', nilaiEstimasiMiliar: 1450, tahap: 'Konstruksi', targetNaker: 320, tanggalFasilitasi: '05 Apr 2025', statusKesiapan: 'Groundbreaking' },
  { id: 5, namaPerusahaan: 'Sunseap Solar Farm & BESS Energy', asalNegara: 'Singapura & Perancis', bendera: '🇸🇬', sektor: 'Energi PLTS Terapung', lokasiTujuan: 'Waduk Duriangkang', nilaiEstimasiMiliar: 2800, tahap: 'Perizinan', targetNaker: 650, tanggalFasilitasi: '14 Mei 2025', statusKesiapan: 'Menunggu Kajian PLN/Gas' },
  { id: 6, namaPerusahaan: 'Taiwan Micro Semiconductor Assembly', asalNegara: 'Taiwan', bendera: '🇹🇼', sektor: 'Komponen Semikonduktor', lokasiTujuan: 'Kawasan Industri Batamindo', nilaiEstimasiMiliar: 1200, tahap: 'LoI Minat', targetNaker: 850, tanggalFasilitasi: '02 Jun 2025', statusKesiapan: 'Siap Lahan' },
  { id: 7, namaPerusahaan: 'Sembcorp Green Hydrogen Logistics', asalNegara: 'Singapura', bendera: '🇸🇬', sektor: 'Energi Hijau & Logistik', lokasiTujuan: 'Kabil Integrated Industrial Estate', nilaiEstimasiMiliar: 2100, tahap: 'LoI Minat', targetNaker: 420, tanggalFasilitasi: '20 Jul 2025', statusKesiapan: 'Penyusunan Amdal' },
  { id: 8, namaPerusahaan: 'Batam Maritime Heavy Engineering', asalNegara: 'Indonesia & Jepang', bendera: '🇮🇩', sektor: 'Galangan Kapal Offshore', lokasiTujuan: 'Tanjung Uncang', nilaiEstimasiMiliar: 1550, tahap: 'Site Visit', targetNaker: 780, tanggalFasilitasi: '08 Agu 2025', statusKesiapan: 'Siap Lahan' },
];

export interface KerjasamaPengusahaanItem {
  id: number;
  namaMitra: string;
  jenisBadanUsaha: 'Swasta Nasional' | 'BUMN / BUMD' | 'Konsorsium Asing';
  bidangKerjasama: string;
  skemaKerjasama: 'KSO (Kerjasama Operasi)' | 'BTO (Build Transfer Operate)' | 'BOT (Build Operate Transfer)' | 'Konsesi Pengusahaan';
  nomorPks: string;
  periodeKerjasama: string;
  nilaiInvestasiMitra: number; // Miliar Rp
  kewajibanBagiHasil: string;
  statusKepatuhan: 'Sangat Patuh (A)' | 'Patuh Bersyarat (B)' | 'Perlu Perbaikan (C)';
  rekomendasiStatus: 'Selesai Ditindaklanjuti' | 'Dalam Proses Tindak Lanjut' | 'Evaluasi Amandemen';
  terakhirDievaluasi: string;
}

export const KERJASAMA_PENGUSAHAAN_DATA: KerjasamaPengusahaanItem[] = [
  {
    id: 1,
    namaMitra: 'PT Bandara Internasional Batam (BIB)',
    jenisBadanUsaha: 'Konsorsium Asing',
    bidangKerjasama: 'Pengembangan & Pengoperasian Bandara Hang Nadim',
    skemaKerjasama: 'Konsesi Pengusahaan',
    nomorPks: 'PKS/01/BIB/KA/2022',
    periodeKerjasama: '2022 - 2047 (25 Tahun)',
    nilaiInvestasiMitra: 6890,
    kewajibanBagiHasil: 'Royalti Konsesi Tahunan + Profit Sharing',
    statusKepatuhan: 'Sangat Patuh (A)',
    rekomendasiStatus: 'Selesai Ditindaklanjuti',
    terakhirDievaluasi: '15 Jan 2025',
  },
  {
    id: 2,
    namaMitra: 'PT Air Minum Batam (Konsorsium Moya)',
    jenisBadanUsaha: 'Swasta Nasional',
    bidangKerjasama: 'Operasional & Pemeliharaan SPAM Hulu-Hilir',
    skemaKerjasama: 'KSO (Kerjasama Operasi)',
    nomorPks: 'PKS/12/SPAM/KA/2023',
    periodeKerjasama: '2023 - 2038 (15 Tahun)',
    nilaiInvestasiMitra: 2150,
    kewajibanBagiHasil: 'Biaya Layanan m3 & Penurunan NRW',
    statusKepatuhan: 'Sangat Patuh (A)',
    rekomendasiStatus: 'Selesai Ditindaklanjuti',
    terakhirDievaluasi: '22 Feb 2025',
  },
  {
    id: 3,
    namaMitra: 'PT Terminal Petikemas Batu Ampar (Konsorsium Persero)',
    jenisBadanUsaha: 'BUMN / BUMD',
    bidangKerjasama: 'Modernisasi STS Crane & Dermaga Utara Batu Ampar',
    skemaKerjasama: 'KSO (Kerjasama Operasi)',
    nomorPks: 'PKS/08/BUP/KA/2023',
    periodeKerjasama: '2023 - 2043 (20 Tahun)',
    nilaiInvestasiMitra: 3400,
    kewajibanBagiHasil: 'Bagi Hasil Tarif Bongkar Muat TEUs',
    statusKepatuhan: 'Sangat Patuh (A)',
    rekomendasiStatus: 'Selesai Ditindaklanjuti',
    terakhirDievaluasi: '05 Mar 2025',
  },
  {
    id: 4,
    namaMitra: 'PT RSBP Health Specialist Diagnostic',
    jenisBadanUsaha: 'Swasta Nasional',
    bidangKerjasama: 'Pengoperasian MRI 3T & Fasilitas Kedokteran Nuklir',
    skemaKerjasama: 'KSO (Kerjasama Operasi)',
    nomorPks: 'PKS/04/RSBP/2021',
    periodeKerjasama: '2021 - 2031 (10 Tahun)',
    nilaiInvestasiMitra: 180,
    kewajibanBagiHasil: 'Fee Sharing Pasien 35:65',
    statusKepatuhan: 'Patuh Bersyarat (B)',
    rekomendasiStatus: 'Dalam Proses Tindak Lanjut',
    terakhirDievaluasi: '12 Apr 2025',
  },
  {
    id: 5,
    namaMitra: 'PT Batam Marina Tourism Resort Sekupang',
    jenisBadanUsaha: 'Swasta Nasional',
    bidangKerjasama: 'Pembangunan Hotel & Dermaga Kapal Pesiar Mini',
    skemaKerjasama: 'BOT (Build Operate Transfer)',
    nomorPks: 'PKS/19/LHN/KA/2018',
    periodeKerjasama: '2018 - 2048 (30 Tahun)',
    nilaiInvestasiMitra: 950,
    kewajibanBagiHasil: 'UWT Komersial + Revenue Share 8%',
    statusKepatuhan: 'Patuh Bersyarat (B)',
    rekomendasiStatus: 'Evaluasi Amandemen',
    terakhirDievaluasi: '19 Mei 2025',
  },
  {
    id: 6,
    namaMitra: 'PT Pengolahan Limbah Industri B3 KPLI',
    jenisBadanUsaha: 'Swasta Nasional',
    bidangKerjasama: 'Pengelolaan Insinerator & Landfill Limbah B3 Kabil',
    skemaKerjasama: 'BTO (Build Transfer Operate)',
    nomorPks: 'PKS/02/KPLI/2020',
    periodeKerjasama: '2020 - 2035 (15 Tahun)',
    nilaiInvestasiMitra: 420,
    kewajibanBagiHasil: 'Bagi Hasil Tonnage Pengolahan Limbah',
    statusKepatuhan: 'Sangat Patuh (A)',
    rekomendasiStatus: 'Selesai Ditindaklanjuti',
    terakhirDievaluasi: '28 Jun 2025',
  },
];
