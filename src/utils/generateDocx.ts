import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  AlignmentType,
  WidthType,
  HeadingLevel,
  BorderStyle,
  ShadingType,
  PageOrientation,
} from 'docx';

export interface KpiTableItem {
  domain: string;
  kpiCode: string;
  kpiName: string;
  strategicLevel: 'Financial' | 'Executive' | 'Program Driver' | 'Operational Driver';
  definition: string;
  formula: string;
}

// =========================================================================
// 1. BIRO KEUANGAN KPI DICTIONARY (TEPAT 13 ITEM SESUAI BP_Batam_KPI_Dictionary_Updated.pdf)
// Cakupan resmi: Revenue / PNBP, Budget / Spending Control, dan Financial Linkage
// =========================================================================
export const BIRO_KEUANGAN_KPI_DATA: KpiTableItem[] = [
  // --- DOMAIN: REVENUE / PNBP ---
  {
    domain: 'Revenue / PNBP',
    kpiCode: 'REV_TOTAL',
    kpiName: 'Total PNBP',
    strategicLevel: 'Financial',
    definition: 'Total realisasi PNBP lintas seluruh layanan',
    formula: 'Jumlah seluruh actual revenue pada periode.',
  },
  {
    domain: 'Revenue / PNBP',
    kpiCode: 'REV_ACH',
    kpiName: 'Achievement Revenue',
    strategicLevel: 'Financial',
    definition: 'Persentase capaian pendapatan terhadap target.',
    formula: 'Actual revenue ÷ target revenue × 100%.',
  },
  {
    domain: 'Revenue / PNBP',
    kpiCode: 'REV_GROWTH',
    kpiName: 'Revenue Growth',
    strategicLevel: 'Financial',
    definition: 'Pertumbuhan pendapatan dibanding periode lalu.',
    formula: '(Actual periode ini - actual periode lalu) ÷ actual periode lalu × 100%.',
  },
  {
    domain: 'Revenue / PNBP',
    kpiCode: 'REV_SHARE',
    kpiName: 'Contribution Share by Service',
    strategicLevel: 'Financial',
    definition: 'Kontribusi masing-masing layanan terhadap total PNBP.',
    formula: 'Pendapatan layanan ÷ total PNBP × 100%.',
  },
  {
    domain: 'Revenue / PNBP',
    kpiCode: 'REV_GAP',
    kpiName: 'Revenue Gap',
    strategicLevel: 'Financial',
    definition: 'Selisih actual pendapatan terhadap target.',
    formula: 'Actual revenue - target revenue.',
  },

  // --- DOMAIN: BUDGET / SPENDING CONTROL ---
  {
    domain: 'Budget / Spending Control',
    kpiCode: 'BUDG_BURN',
    kpiName: 'Burn Rate',
    strategicLevel: 'Financial',
    definition: 'Kecepatan realisasi belanja pada periode berjalan.',
    formula: 'Realisasi bulan ini ÷ pagu atau terhadap profil target kumulatif.',
  },
  {
    domain: 'Budget / Spending Control',
    kpiCode: 'BUDG_FCST',
    kpiName: 'Forecast Year-End Absorption',
    strategicLevel: 'Financial',
    definition: 'Proyeksi serapan belanja sampai akhir tahun anggaran.',
    formula: 'Forecast berbasis tren realisasi, kontrak, dan sisa hari kerja.',
  },
  {
    domain: 'Budget / Spending Control',
    kpiCode: 'BUDG_LOW_UNIT',
    kpiName: 'Jumlah Unit Serapan Rendah',
    strategicLevel: 'Financial',
    definition: 'Jumlah unit di bawah threshold serapan belanja target.',
    formula: 'Count unit dengan absorption di bawah batas minimum.',
  },
  {
    domain: 'Budget / Spending Control',
    kpiCode: 'BUDG_CONTRACT',
    kpiName: 'Nilai Kontrak Berjalan',
    strategicLevel: 'Financial',
    definition: 'Nilai kontrak aktif/committed terhadap pagu belanja modal.',
    formula: 'Contract committed ÷ pagu × 100%.',
  },

  // --- DOMAIN: FINANCIAL LINKAGE ---
  {
    domain: 'Financial Linkage',
    kpiCode: 'FIN_GAP',
    kpiName: 'Revenue vs Spending Gap',
    strategicLevel: 'Financial',
    definition: 'Selisih pendapatan terhadap belanja.',
    formula: 'Actual revenue - actual spending.',
  },
  {
    domain: 'Financial Linkage',
    kpiCode: 'FIN_UNLINKED',
    kpiName: 'Belanja tanpa Sumber Dana Jelas',
    strategicLevel: 'Financial',
    definition: 'Belanja/program yang belum memiliki alokasi sumber dana pasti.',
    formula: 'Count / value belanja dengan sumber dana unlinked.',
  },
  {
    domain: 'Financial Linkage',
    kpiCode: 'FIN_CTR',
    kpiName: 'Cost to Revenue Ratio',
    strategicLevel: 'Financial',
    definition: 'Rasio biaya terhadap pendapatan untuk unit revenue center.',
    formula: 'Actual cost ÷ actual revenue.',
  },
  {
    domain: 'Financial Linkage',
    kpiCode: 'FIN_UNIT_BAL',
    kpiName: 'Unit Surplus/Defisit',
    strategicLevel: 'Financial',
    definition: 'Selisih pendapatan dan belanja per unit kerja.',
    formula: 'Actual revenue unit - actual spending unit.',
  },
];

// =========================================================================
// 2. PDSI KPI DICTIONARY (17 ITEM SESUAI DASHBOARD & KAMUS RESMI PDSI)
// Cakupan: Data Center Tier III, Layanan Helpdesk TI, Keamanan Siber SOC, Jaringan FO & Aplikasi
// =========================================================================
export const PDSI_KPI_DATA: KpiTableItem[] = [
  // --- DOMAIN: DATA CENTER & SERVER ---
  {
    domain: 'PDSI / Data Center & Server',
    kpiCode: 'PDSI_DC_UPTIME',
    kpiName: 'Uptime & Ketersediaan Data Center Tier III',
    strategicLevel: 'Executive',
    definition: 'Persentase waktu operasional fasilitas ruang Data Center & DRC tanpa unscheduled downtime (Standar Tier III ≥ 99,98%).',
    formula: '(Total Menit Periode - Menit Unscheduled Downtime) ÷ Total Menit Periode × 100%',
  },
  {
    domain: 'PDSI / Data Center & Server',
    kpiCode: 'PDSI_DC_PUE',
    kpiName: 'Power Usage Effectiveness (PUE Data Center)',
    strategicLevel: 'Program Driver',
    definition: 'Rasio efisiensi penggunaan energi listrik seluruh fasilitas data center (cooling + UPS) terhadap beban komputasi TI.',
    formula: 'Total Energi Masuk Fasilitas DC (kWh) ÷ Total Energi Beban Peralatan TI (kWh)',
  },
  {
    domain: 'PDSI / Data Center & Server',
    kpiCode: 'PDSI_DC_RACK_OCC',
    kpiName: 'Tingkat Okupansi Rak Server (Rack Occupancy)',
    strategicLevel: 'Program Driver',
    definition: 'Persentase jumlah rak server yang terpasang dan beroperasi terhadap total daya tampung rak di Data Center & DRC.',
    formula: 'Jumlah Rak Server Terisi Aktif ÷ Total Kapasitas Rak Ruang Server × 100%',
  },
  {
    domain: 'PDSI / Data Center & Server',
    kpiCode: 'PDSI_DC_STORAGE_UTIL',
    kpiName: 'Utilisasi Kapasitas Storage SAN/NAS Terpusat',
    strategicLevel: 'Operational Driver',
    definition: 'Persentase kapasitas penyimpanan storage jaringan yang terpakai oleh database, VM, dan file dokumen SPBE.',
    formula: 'Total Storage Terpakai (TB) ÷ Total Kapasitas Storage Terpasang (TB) × 100%',
  },
  {
    domain: 'PDSI / Data Center & Server',
    kpiCode: 'PDSI_DC_BACKUP_SUCCESS',
    kpiName: 'Tingkat Keberhasilan Backup Data & VM (RPO)',
    strategicLevel: 'Operational Driver',
    definition: 'Persentase keberhasilan eksekusi backup berkala database dan snapshot VM server sesuai jadwal Recovery Point Objective.',
    formula: 'Jumlah Jadwal Backup Berhasil ÷ Total Jadwal Backup yang Dijalankan × 100%',
  },

  // --- DOMAIN: LAYANAN TI & HELPDESK ---
  {
    domain: 'PDSI / Layanan TI & Helpdesk',
    kpiCode: 'PDSI_HD_SLA',
    kpiName: 'SLA Penyelesaian Layanan TI & Helpdesk',
    strategicLevel: 'Executive',
    definition: 'Persentase tiket permintaan dan perbaikan layanan TI yang berhasil diselesaikan tepat waktu sesuai standar Service Level Agreement.',
    formula: 'Jumlah Tiket Selesai ≤ Standar Waktu SLA ÷ Total Tiket Selesai × 100%',
  },
  {
    domain: 'PDSI / Layanan TI & Helpdesk',
    kpiCode: 'PDSI_HD_MTTR',
    kpiName: 'Mean Time to Resolve (MTTR Insiden Layanan)',
    strategicLevel: 'Program Driver',
    definition: 'Rata-rata durasi penanganan sejak tiket gangguan diterima helpdesk hingga insiden terselesaikan secara tuntas.',
    formula: 'Total Jam Penyelesaian Seluruh Tiket Insiden ÷ Total Tiket Insiden Terselesaikan',
  },
  {
    domain: 'PDSI / Layanan TI & Helpdesk',
    kpiCode: 'PDSI_HD_CSAT',
    kpiName: 'Indeks Kepuasan Pengguna Layanan TI (CSAT)',
    strategicLevel: 'Executive',
    definition: 'Skor kepuasan pegawai dan pengguna satker BP Batam terhadap layanan dukungan teknis PDSI (Skala 1 - 5).',
    formula: 'Rata-rata Skor Bintang dari Survei Kepuasan Responden Tiket Helpdesk',
  },
  {
    domain: 'PDSI / Layanan TI & Helpdesk',
    kpiCode: 'PDSI_HD_FCR',
    kpiName: 'First Contact Resolution Rate (FCR)',
    strategicLevel: 'Operational Driver',
    definition: 'Persentase tiket helpdesk yang terselesaikan tuntas pada kontak pertama tanpa eskalasi ke tim spesialis kedua.',
    formula: 'Jumlah Tiket Selesai pada Kontak Pertama ÷ Total Tiket Layanan Masuk × 100%',
  },
  {
    domain: 'PDSI / Layanan TI & Helpdesk',
    kpiCode: 'PDSI_HD_VOLUME',
    kpiName: 'Volume Tiket Layanan TI Bulanan',
    strategicLevel: 'Operational Driver',
    definition: 'Jumlah total tiket permohonan layanan, akun sistem, perbaikan perangkat, dan troubleshooting jaringan.',
    formula: 'COUNT([ID Tiket Layanan]) per Bulan Berjalan',
  },

  // --- DOMAIN: KEAMANAN SIBER & SOC ---
  {
    domain: 'PDSI / Keamanan Siber & SOC',
    kpiCode: 'PDSI_CYBER_MITIGATION',
    kpiName: 'Tingkat Mitigasi Ancaman Siber (Threat Mitigation)',
    strategicLevel: 'Executive',
    definition: 'Persentase serangan siber (DDoS, Malware, Brute Force, Web Defacement) yang berhasil diblokir oleh SOC PDSI BP Batam.',
    formula: 'Jumlah Percobaan Serangan Termitigasi ÷ Total Percobaan Serangan Terdeteksi × 100%',
  },
  {
    domain: 'PDSI / Keamanan Siber & SOC',
    kpiCode: 'PDSI_CYBER_MTTA',
    kpiName: 'Waktu Respons Insiden Keamanan Kritis (MTTA)',
    strategicLevel: 'Program Driver',
    definition: 'Rata-rata waktu tanggap tim CSIRT sejak notifikasi insiden keamanan berstatus critical terpicu hingga langkah isolasi dilakukan.',
    formula: 'Total Waktu Respons Insiden Critical (Menit) ÷ Total Insiden Critical Terdeteksi',
  },
  {
    domain: 'PDSI / Keamanan Siber & SOC',
    kpiCode: 'PDSI_CYBER_PATCH_RATE',
    kpiName: 'Rasio Penambalan Celah Keamanan (Patch Rate)',
    strategicLevel: 'Operational Driver',
    definition: 'Persentase kerentanan keamanan sistem/server (CVE) yang telah diaplikasikan security patch berdasarkan hasil vulnerability assessment.',
    formula: 'Jumlah Celah Keamanan Tertambal ÷ Total Celah Keamanan Terdeteksi × 100%',
  },
  {
    domain: 'PDSI / Keamanan Siber & SOC',
    kpiCode: 'PDSI_CYBER_KAMI_SCORE',
    kpiName: 'Skor Kematangan Keamanan Informasi (Indeks KAMI)',
    strategicLevel: 'Executive',
    definition: 'Tingkat kematangan tata kelola keamanan siber berdasarkan evaluasi standar ISO 27001 dan instrumen Indeks KAMI BSSN.',
    formula: 'Akumulasi Skor 5 Area Evaluasi Indeks KAMI BSSN (Skor Komposit Kesiapan)',
  },

  // --- DOMAIN: JARINGAN FO & APLIKASI ---
  {
    domain: 'PDSI / Jaringan FO & Aplikasi',
    kpiCode: 'PDSI_NET_FO_AVAIL',
    kpiName: 'Reliabilitas Jaringan Backbone Fiber Optic (142 KM)',
    strategicLevel: 'Executive',
    definition: 'Persentase ketersediaan sambungan kabel fiber optic intra-kantor BP Batam (Batam Centre, Batu Ampar, Sekupang, Nongsa).',
    formula: '(Total Jam Operasional Jaringan FO - Jam Gangguan Putus Link) ÷ Total Jam Operasional Jaringan FO × 100%',
  },
  {
    domain: 'PDSI / Jaringan FO & Aplikasi',
    kpiCode: 'PDSI_APP_CORE_UPTIME',
    kpiName: 'Ketersediaan Aplikasi Inti SPBE BP Batam',
    strategicLevel: 'Executive',
    definition: 'Rata-rata uptime operasional 32 sistem informasi prioritas (SIMKEU, SIHARKAT, Land System, Inaportnet, Portal Eksekutif).',
    formula: 'Rata-rata % Uptime Service HTTP/HTTPS Seluruh 32 Aplikasi Inti BP Batam',
  },
  {
    domain: 'PDSI / Jaringan FO & Aplikasi',
    kpiCode: 'PDSI_SPBE_INDEX',
    kpiName: 'Indeks Kematangan SPBE BP Batam (KemenPAN-RB)',
    strategicLevel: 'Executive',
    definition: 'Nilai evaluasi implementasi Sistem Pemerintahan Berbasis Elektronik yang ditetapkan oleh KemenPAN-RB (Target: ≥ 4,00).',
    formula: 'Nilai Komposit 47 Indikator SPBE (Domain Kebijakan, Tata Kelola, Manajemen, dan Layanan)',
  },
  {
    domain: 'PDSI / Jaringan FO & Aplikasi',
    kpiCode: 'PDSI_NET_BANDWIDTH_UTIL',
    kpiName: 'Utilisasi Bandwidth Internet & Metro-E Terpusat',
    strategicLevel: 'Operational Driver',
    definition: 'Persentase pemakaian kapasitas traffic pipa bandwidth internet dan interkoneksi WAN pada jam kerja puncak.',
    formula: 'Peak Bandwidth Terpakai (Gbps) ÷ Total Kapasitas Bandwidth Terpasang (Gbps) × 100%',
  },
];

// Kombinasi seluruh KPI jika diperlukan
export const KPI_DICTIONARY_DATA: KpiTableItem[] = [
  ...BIRO_KEUANGAN_KPI_DATA,
  ...PDSI_KPI_DATA,
];

// Helper to build docx Table from dataset
function buildKpiDocxTable(items: KpiTableItem[]): Table {
  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
    left: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
    right: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
  };

  // Header Row matching the dark blue table in user screenshot
  const headerRow = new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: [
      new TableCell({
        width: { size: 1800, type: WidthType.DXA },
        shading: { fill: '0B2545', type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 140, right: 140 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Domain', bold: true, color: 'FFFFFF', size: 18, font: 'Calibri' })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 1800, type: WidthType.DXA },
        shading: { fill: '0B2545', type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 140, right: 140 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'KPI Code', bold: true, color: 'FFFFFF', size: 18, font: 'Calibri' })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 2800, type: WidthType.DXA },
        shading: { fill: '0B2545', type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 140, right: 140 },
        children: [
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [new TextRun({ text: 'KPI Name', bold: true, color: 'FFFFFF', size: 18, font: 'Calibri' })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 1600, type: WidthType.DXA },
        shading: { fill: '0B2545', type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 140, right: 140 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Strategic Level', bold: true, color: 'FFFFFF', size: 18, font: 'Calibri' })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 3600, type: WidthType.DXA },
        shading: { fill: '0B2545', type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 140, right: 140 },
        children: [
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({ text: 'Definition / What it measures', bold: true, color: 'FFFFFF', size: 18, font: 'Calibri' }),
            ],
          }),
        ],
      }),
      new TableCell({
        width: { size: 3800, type: WidthType.DXA },
        shading: { fill: '0B2545', type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 140, right: 140 },
        children: [
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [new TextRun({ text: 'Formula / Logic', bold: true, color: 'FFFFFF', size: 18, font: 'Calibri' })],
          }),
        ],
      }),
    ],
  });

  // Data rows with alternating background and clean styling
  const dataRows = items.map((item, idx) => {
    const isEven = idx % 2 === 1;
    const bgFill = isEven ? 'F8FAFC' : 'FFFFFF';

    return new TableRow({
      cantSplit: true,
      children: [
        // 1. Domain
        new TableCell({
          width: { size: 1800, type: WidthType.DXA },
          shading: { fill: bgFill, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: item.domain,
                  bold: true,
                  size: 16,
                  color: '0F172A',
                  font: 'Calibri',
                }),
              ],
            }),
          ],
        }),

        // 2. KPI Code
        new TableCell({
          width: { size: 1800, type: WidthType.DXA },
          shading: { fill: bgFill, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: item.kpiCode,
                  bold: true,
                  size: 16,
                  color: '0066CC',
                  font: 'Calibri',
                }),
              ],
            }),
          ],
        }),

        // 3. KPI Name
        new TableCell({
          width: { size: 2800, type: WidthType.DXA },
          shading: { fill: bgFill, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: item.kpiName,
                  bold: true,
                  size: 16,
                  color: '0F172A',
                  font: 'Calibri',
                }),
              ],
            }),
          ],
        }),

        // 4. Strategic Level
        new TableCell({
          width: { size: 1600, type: WidthType.DXA },
          shading: { fill: bgFill, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: item.strategicLevel,
                  bold: true,
                  size: 16,
                  color:
                    item.strategicLevel === 'Financial'
                      ? '0066CC'
                      : item.strategicLevel === 'Executive'
                      ? '15803D'
                      : item.strategicLevel === 'Program Driver'
                      ? 'B45309'
                      : '64748B',
                  font: 'Calibri',
                }),
              ],
            }),
          ],
        }),

        // 5. Definition / What it measures
        new TableCell({
          width: { size: 3600, type: WidthType.DXA },
          shading: { fill: bgFill, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: item.definition,
                  size: 16,
                  color: '334155',
                  font: 'Calibri',
                }),
              ],
            }),
          ],
        }),

        // 6. Formula / Logic
        new TableCell({
          width: { size: 3800, type: WidthType.DXA },
          shading: { fill: bgFill, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: item.formula,
                  size: 16,
                  color: '0F172A',
                  bold: true,
                  font: 'Calibri',
                }),
              ],
            }),
          ],
        }),
      ],
    });
  });

  return new Table({
    width: { size: 15400, type: WidthType.DXA },
    borders: tableBorder,
    rows: [headerRow, ...dataRows],
  });
}

export function createDocxDocumentInstance(unit: 'keuangan' | 'pdsi' | 'all' = 'all'): Document {
  const isKeu = unit === 'keuangan';
  const isPdsi = unit === 'pdsi';

  const items = isKeu
    ? BIRO_KEUANGAN_KPI_DATA
    : isPdsi
    ? PDSI_KPI_DATA
    : KPI_DICTIONARY_DATA;

  const table = buildKpiDocxTable(items);

  const unitTitle = isKeu
    ? 'Unit Kerja: Biro Keuangan BP Batam | Standar: BP_Batam_KPI_Dictionary_Updated.pdf | Cut-Off: April 2026'
    : isPdsi
    ? 'Unit Kerja: Pusat Data dan Sistem Informasi (PDSI) BP Batam | Cut-Off: April 2026'
    : 'Unit Kerja: Biro Keuangan & Pusat Data dan Sistem Informasi (PDSI) BP Batam | Cut-Off: April 2026';

  const narrative = isKeu
    ? 'Dokumen ini menyajikan definisi operasional, strategic level, dan formula kalkulasi resmi untuk indikator kinerja Biro Keuangan BP Batam yang ditampilkan pada Dashboard Eksekutif. Mencakup domain Revenue / PNBP, Budget / Spending Control, serta Financial Linkage yang telah diselaraskan dengan dokumen resmi BP_Batam_KPI_Dictionary_Updated.pdf.'
    : isPdsi
    ? 'Dokumen ini menyajikan definisi operasional, strategic level, dan formula kalkulasi resmi untuk indikator kinerja Pusat Data dan Sistem Informasi (PDSI) BP Batam. Mencakup domain Data Center Tier III, Layanan Helpdesk TI, Keamanan Siber SOC/CSIRT, Jaringan Backbone Fiber Optic, dan Kesiapan Aplikasi SPBE.'
    : 'Dokumen ini menyajikan kamus indikator kinerja dan formula kalkulasi resmi untuk unit Biro Keuangan dan Pusat Data dan Sistem Informasi (PDSI) BP Batam yang selaras dengan dokumen BP_Batam_KPI_Dictionary_Updated.pdf.';

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 720, right: 720 },
            size: {
              orientation: PageOrientation.LANDSCAPE,
              width: 16838, // A4 Landscape DXA
              height: 11906,
            },
          },
        },
        children: [
          // Header Judul Dokumen
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'BADAN PENGUSAHAAN BATAM (BP BATAM)',
                bold: true,
                size: 26,
                color: '0B2545',
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: isKeu
                  ? 'KAMUS INDIKATOR KINERJA UTAMA (KPI DICTIONARY) - BIRO KEUANGAN'
                  : isPdsi
                  ? 'KAMUS INDIKATOR KINERJA UTAMA (KPI DICTIONARY) - PDSI'
                  : 'KAMUS INDIKATOR KINERJA UTAMA (KPI DICTIONARY) & FORMULA DASHBOARD EKSEKUTIF',
                bold: true,
                size: 22,
                color: '1F4E79',
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 220 },
            children: [
              new TextRun({
                text: unitTitle,
                size: 18,
                color: '475569',
                font: 'Calibri',
                italics: true,
              }),
            ],
          }),

          // Ringkasan Pengantar
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: narrative,
                size: 18,
                font: 'Calibri',
                color: '334155',
              }),
            ],
          }),

          // Tabel KPI
          table,

          // Catatan Penutup
          new Paragraph({
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({
                text: 'Catatan Teknis Implementasi Dashboard:',
                bold: true,
                size: 18,
                color: '0B2545',
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: '1. Formula kalkulasi di atas telah diselaraskan dengan Calculated Fields Tableau Server / Power BI dan query SQL SIMKEU/PDSI BP Batam.',
                size: 16,
                font: 'Calibri',
                color: '475569',
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: isKeu
                  ? '2. Klasifikasi Strategic Level: "Financial" (Tingkat Anggota Bidang / Kepala BP Batam & Pengendalian Anggaran).'
                  : '2. Klasifikasi Strategic Level: "Executive" (Pimpinan Tertinggi), "Program Driver" (Kepala Unit), "Operational Driver" (Operasional Teknis).',
                size: 16,
                font: 'Calibri',
                color: '475569',
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: '3. Data cut-off yang ditampilkan mengacu pada dokumen resmi BP_Batam_KPI_Dictionary_Updated.pdf.',
                size: 16,
                font: 'Calibri',
                color: '475569',
              }),
            ],
          }),
        ],
      },
    ],
  });
}

export async function buildDocxDocument(unit: 'keuangan' | 'pdsi' | 'all' = 'all'): Promise<Buffer> {
  const doc = createDocxDocumentInstance(unit);
  return await Packer.toBuffer(doc);
}

export async function downloadKpiDocxInBrowser(unit: 'keuangan' | 'pdsi' | 'all' = 'all'): Promise<void> {
  const isKeu = unit === 'keuangan';
  const isPdsi = unit === 'pdsi';

  const filename = isKeu
    ? 'Kamus_KPI_Dashboard_Biro_Keuangan_BP_Batam.docx'
    : isPdsi
    ? 'Kamus_KPI_Dashboard_PDSI_BP_Batam.docx'
    : 'Kamus_KPI_Dashboard_Biro_Keuangan_dan_PDSI_BP_Batam.docx';

  try {
    const doc = createDocxDocumentInstance(unit);
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.warn('Browser blob generation fallback', err);
  }
}
