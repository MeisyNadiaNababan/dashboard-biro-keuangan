import React, { useState } from 'react';
import {
  X,
  Calculator,
  Copy,
  Check,
  BarChart3,
  Database,
  ArrowRight,
  TrendingUp,
  FileCode,
  Layers,
  HelpCircle,
  Lightbulb,
  Target,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export interface KpiFormulaDetail {
  id: string;
  unit: 'biro-keuangan' | 'pdsi';
  title: string;
  codeTag: string;
  category: string;
  currentValue: string;
  targetValue: string;
  statusText: string;
  statusVariant: 'success' | 'warning' | 'info' | 'danger';
  summary: string;
  presentationPitch: string;
  formulaConceptual: string;
  numerator: {
    label: string;
    realValue: string;
    source: string;
  };
  denominator: {
    label: string;
    realValue: string;
    source: string;
  };
  calculationResult: string;
  tableauCalculatedField: string;
  tableauShelvesGuide: {
    showMe: string;
    rows: string;
    columns: string;
    marks: string;
    filters: string;
  };
  databaseSource: {
    catalogItem: string;
    tableName: string;
    attributes: string[];
    updateFrequency: string;
    dataClassification: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  };
  benchmarkThreshold: {
    target: string;
    warning: string;
    critical: string;
    standardOrigin: string;
  };
  executiveAction: string;
}

export const KPI_FORMULA_DETAILS: Record<string, KpiFormulaDetail> = {
  // BIRO KEUANGAN
  pendapatan: {
    id: 'pendapatan',
    unit: 'biro-keuangan',
    title: 'Persentase Capaian Target PNBP BP Batam (IKS-03)',
    codeTag: 'IKS-03',
    category: 'Pendapatan & PNBP',
    currentValue: 'Rp 981,2 M (40,1%)',
    targetValue: 'Target DIPA Perkin: Rp 2.447,46 M',
    statusText: 'On Track (Target Proporsional Q2: 50,0%)',
    statusVariant: 'success',
    summary: 'Rasio akumulasi kas masuk PNBP riil yang disetor ke rekening kas BLU BP Batam terhadap target tahunan pada DIPA/Penetapan Kinerja (Perkin) 2026.',
    presentationPitch: 'Bapak/Ibu Pimpinan, realisasi penerimaan PNBP BP Batam hingga cut-off April TA 2026 telah membukukan Rp 981,2 Miliar atau 40,1% dari target DIPA Perkin Rp 2,45 Triliun. Kontributor utama penerimaan ditopang oleh Pengelolaan Pertanahan (UWT) sebesar Rp 412,0 M dan BU SPAM Fasilitas & Lingkungan sebesar Rp 278,0 M. Laju pertumbuhan kas masuk menunjukkan akselerasi +12,3% (MoM).',
    formulaConceptual: '(Total Realisasi Kas Masuk PNBP Akumulasi YTD ÷ Target DIPA Perkin TA 2026) × 100%',
    numerator: {
      label: 'Pembilang (Realisasi PNBP YTD)',
      realValue: 'Rp 981.240.000.000 (Kas Masuk Rekening BLU)',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    denominator: {
      label: 'Penyebut (Target Perkin 2026)',
      realValue: 'Rp 2.447.464.960.000 (Target DIPA 10 Satker)',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[jumlah])',
    },
    calculationResult: '(981.240.000.000 ÷ 2.447.464.960.000) × 100% = 40,09% ≈ 40,1%',
    tableauCalculatedField: `// Calculated Field: [IKS-03 Capaian PNBP %]
SUM([keu_target_pnbp_rekap].[realisasi]) / SUM([keu_target_pnbp_rekap].[jumlah]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab & BAN Tile) & #6 (Horizontal Bar)',
      rows: '[sumber] (Unit Kerja Penghasil / Badan Usaha)',
      columns: 'SUM([realisasi]), SUM([target]), [IKS-03 Capaian PNBP %]',
      marks: 'Color: % Capaian (Diverging Green-Orange-Red), Label: Realisasi YTD',
      filters: "[tahun] = '2026', [bulan] = 'April'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #8: Rekapitulasi Target Penerimaan Negara Bukan Pajak (PNBP)',
      tableName: 'keu_target_pnbp_rekap',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH'],
      updateFrequency: 'Harian (Cut-Off Settlement Pukul 23:59 WIB)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 50,0% pada akhir Triwulan II (Juni)',
      warning: '35,0% - 49,9% (Monitoring mingguan satker)',
      critical: '< 35,0% (Perlu percepatan penagihan dan rekonsiliasi)',
      standardOrigin: 'Perkin Kepala BP Batam & Rencana Bisnis dan Anggaran (RBA) BLU 2026',
    },
    executiveAction: 'Fokuskan percepatan realisasi pada Dit. Pengelolaan Kawasan Bandara (saat ini 54,4%) dan lakukan monitoring intensif pada unit kepelabuhanan dan air curah menjelang penutupan semester I.',
  },

  belanja: {
    id: 'belanja',
    unit: 'biro-keuangan',
    title: 'Persentase Serapan Pagu Belanja DIPA BLU',
    codeTag: 'SERAPAN-DIPA',
    category: 'Belanja & Anggaran',
    currentValue: 'Rp 945,0 M (28,5%)',
    targetValue: 'Pagu DIPA: Rp 3.318,50 M',
    statusText: 'Sesuai Siklus Belanja Awal Tahun',
    statusVariant: 'info',
    summary: 'Tingkat penyerapan SP2D belanja operasional rutin, pegawai, barang, dan modal infrastruktur terhadap total pagu DIPA yang disahkan Ditjen Perbendaharaan.',
    presentationPitch: 'Serapan belanja hingga April terealisasi Rp 945,0 Miliar (28,5% dari pagu Rp 3,32 Triliun). Pola serapan ini wajar karena kuartal I dan awal kuartal II didominasi belanja operasional dan uang muka kontrak. Belanja modal infrastruktur strategis saat ini sedang dalam proses tender dan penandatanganan kontrak, sehingga kurva serapan akan naik tajam di Q3 dan Q4.',
    formulaConceptual: '(Akumulasi Realisasi Belanja SP2D Terbit YTD ÷ Total Pagu DIPA Anggaran) × 100%',
    numerator: {
      label: 'Pembilang (Realisasi Belanja YTD)',
      realValue: 'Rp 945.020.000.000 (SP2D Terbit & Cair)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    },
    denominator: {
      label: 'Penyebut (Pagu DIPA BLU)',
      realValue: 'Rp 3.318.500.000.000 (Pagu Resmi APBN 2026)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    },
    calculationResult: '(945.020.000.000 ÷ 3.318.500.000.000) × 100% = 28,48% ≈ 28,5%',
    tableauCalculatedField: `// Calculated Field: [Serapan Belanja Pagu %]
SUM([keu_laporan_realisasi_anggaran_blu].[realisasi]) / SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #6 (Horizontal Bar with Reference Line)',
      rows: '[program] / [jenis_belanja]',
      columns: 'SUM([pagu]), SUM([realisasi]), [Serapan Belanja Pagu %]',
      marks: 'Bullet Mark dengan Reference Line Target Q2 (35%)',
      filters: "[tahun] = '2026', [bulan] = 'April'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #3: Laporan Realisasi Anggaran BLU & Item #23: Rekapitulasi Pagu Anggaran',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'TRIWULAN', 'TAHUN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Harian (Berdasarkan Penerbitan SP2D & SP3B BLU)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 35,0% pada akhir Triwulan II',
      warning: '20,0% - 34,9% (Fase lelang dan penetapan PPK)',
      critical: '< 20,0% (Risiko deviasi Halaman III DIPA)',
      standardOrigin: 'Standar Evaluasi IKPA Kemenkeu & Rencana Penarikan Dana (RPD)',
    },
    executiveAction: 'Dorong Pejabat Pembuat Komitmen (PPK) pada satker infrastruktur untuk segera memproses termin uang muka dan pembayaran hasil MC (Monthly Certificate) kontraktor.',
  },

  kas_bank: {
    id: 'kas_bank',
    unit: 'biro-keuangan',
    title: 'Cash Coverage Ratio & Saldo Kas Bank BLU (Item 13)',
    codeTag: 'LIKUIDITAS-CCR',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 1,52 T (3,89 Bulan)',
    targetValue: 'Benchmark Kemenkeu: ≥ 3,00 Bulan',
    statusText: 'Likuiditas Sangat Prima & Solven',
    statusVariant: 'success',
    summary: 'Daya tahan saldo kas likuid di seluruh rekening giro dan deposito operasional perbankan mitra untuk membiayai seluruh pengeluaran bulanan BP Batam tanpa penerimaan kas baru.',
    presentationPitch: 'Likuiditas kas BP Batam berada dalam kondisi sangat sehat dengan total saldo Rp 1,52 Triliun tersebar di 7 bank mitra operasional. Angka ini memberikan Cash Coverage Ratio setara 3,89 bulan cadangan operasional (standar minimal BLU Kemenkeu adalah ≥ 3,0 bulan). Hal ini membuktikan BP Batam memiliki bantalan finansial (financial buffer) yang sangat kuat.',
    formulaConceptual: 'Total Saldo Kas Likuid Akhir Periode ÷ (Total Anggaran Belanja Tahunan ÷ 12 Bulan)',
    numerator: {
      label: 'Pembilang (Saldo Kas Likuid)',
      realValue: 'Rp 1.520.000.000.000 (Giro & Deposito Bank Mitra)',
      source: 'SIMKEU Item #13: SUM([keu_saldo_bank_realtime].[nilai])',
    },
    denominator: {
      label: 'Penyebut (Kebutuhan Kas Operasional Bulanan)',
      realValue: 'Rp 390.720.000.000 / bulan (Rata-rata Kebutuhan Kas Belanja)',
      source: 'SIMKEU Item #3: (SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) / 12)',
    },
    calculationResult: '1.520.000.000.000 ÷ (3.318.500.000.000 ÷ 12) = 1.520 M ÷ 276,5 M = 3,89 Bulan',
    tableauCalculatedField: `// Calculated Field: [Cash Coverage Ratio (Bulan)]
SUM([keu_saldo_bank_realtime].[nilai]) / (SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) / 12)`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #14 (Area / Treemap Kas Bank)',
      rows: '[nama_bank] (Bank Mandiri, BRI, BNI, BTN, Bank Riau Kepri)',
      columns: 'SUM([nilai]), [Cash Coverage Ratio (Bulan)]',
      marks: 'Color: [kategori_rekening] (Penerimaan, Pengeluaran, Operasional, Deposito)',
      filters: "[tanggal_rekap] = MAX([tanggal_rekap])",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #13: Laporan Saldo Bank Real-time & Item #14: Penerimaan Sumber Dana',
      tableName: 'keu_saldo_bank_realtime',
      attributes: ['NAMA BANK', 'UNIT', 'KATEGORI UNIT', 'NOMOR REKENING', 'KEGUNAAN REKENING', 'KATEGORI REKENING', 'TANGGAL REKAP', 'NILAI'],
      updateFrequency: 'Real-Time (Sinkronisasi Host-to-Host API Perbankan)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 3,00 Bulan Pengeluaran Operasional',
      warning: '1,50 - 2,99 Bulan (Perlu pembatasan belanja non-prioritas)',
      critical: '< 1,50 Bulan (Risiko gangguan likuiditas operasional)',
      standardOrigin: 'Peraturan Menteri Keuangan (PMK) Pengelolaan Kas Badan Layanan Umum',
    },
    executiveAction: 'Optimalkan penempatan dana idle cash pada instrumen deposito on call (DOC) bank BUMN untuk mendongkrak pendapatan bunga/jasa giro (treasury yield) tanpa mengurangi fleksibilitas pencairan.',
  },

  piutang: {
    id: 'piutang',
    unit: 'biro-keuangan',
    title: 'Outstanding Piutang PNBP & Tingkat Kolektibilitas',
    codeTag: 'AGING-PIUTANG',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 312,4 M (305 Debitur)',
    targetValue: 'Tingkat Kolektibilitas Lancar: ≥ 70%',
    statusText: 'Perlu Pengawasan Intensif',
    statusVariant: 'warning',
    summary: 'Total saldo piutang faktur PNBP yang belum terbayar oleh wajib bayar/debitur per tanggal cut-off, diklasifikasikan ke dalam 4 bucket umur piutang sesuai ketentuan PMK.',
    presentationPitch: 'Biro Keuangan memantau total saldo piutang PNBP sebesar Rp 312,4 Miliar dari 305 debitur. Dari total tersebut, 73,8% berada dalam kategori lancar hingga kurang lancar (0–60 hari). Sedangkan saldo piutang macet yang berumur di atas 90 hari sebesar Rp 43,6 M (14,0%) saat ini telah diproses pelimpahannya ke KPKNL / Panitia Urusan Piutang Negara (PUPN) untuk penagihan aktif dan penyitaan jaminan.',
    formulaConceptual: 'Saldo Awal Piutang + Penerbitan Faktur Baru - Pembayaran Diterima - Penyesuaian/Koreksi',
    numerator: {
      label: 'Komposisi Kolektibilitas',
      realValue: 'Lancar Rp 168,2 M (53,8%) • Macet Rp 43,6 M (14,0%)',
      source: 'SIMKEU Item #17: SUM([keu_rekap_umur_piutang].[nilai_piutang])',
    },
    denominator: {
      label: 'Basis Debitur Aktif',
      realValue: '305 Debitur Terdaftar (Mitra Usaha & Lahan)',
      source: 'SIMKEU Item #18: COUNTD([keu_mutasi_piutang].[kode_debitur])',
    },
    calculationResult: 'Total = Lancar (168,2 M) + Kurang Lancar (62,5 M) + Diragukan (38,1 M) + Macet (43,6 M) = Rp 312,4 M',
    tableauCalculatedField: `// Calculated Field: [Bucket Aging Piutang Kemenkeu]
IF [keu_mutasi_piutang_faktur].[umur_piutang] <= 30 THEN "0 - 30 Hari (Lancar)"
ELSEIF [keu_mutasi_piutang_faktur].[umur_piutang] <= 60 THEN "31 - 60 Hari (Kurang Lancar)"
ELSEIF [keu_mutasi_piutang_faktur].[umur_piutang] <= 90 THEN "61 - 90 Hari (Diragukan)"
ELSE "> 90 Hari (Macet / Pelimpahan KPKNL)"
END`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #13 (Stacked Bar Aging)',
      rows: '[kategori_piutang] (UWT, Kepelabuhanan, Bandara, SPAM)',
      columns: '[Bucket Aging Piutang Kemenkeu], SUM([nilai_piutang])',
      marks: 'Color: Bucket Aging (Green to Red), Tooltip: Jumlah Debitur',
      filters: "[status_faktur] = 'Outstanding'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #17: Rekapitulasi Umur Piutang, Item #18: Mutasi, Item #20: Piutang Tak Tertagih',
      tableName: 'keu_rekap_umur_piutang & keu_piutang_tak_tertagih',
      attributes: ['NOMOR FAKTUR', 'KODE DEBITUR', 'NAMA DEBITUR', 'TANGGAL TERBIT', 'JATUH TEMPO', 'UMUR PIUTANG', 'NILAI PIUTANG'],
      updateFrequency: 'Harian (Berdasarkan e-Billing dan Rekonsiliasi Bank)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'Rasio Piutang Macet ≤ 10,0% dari total piutang',
      warning: '10,1% - 15,0% (Surat Peringatan I, II, III terbit)',
      critical: '> 15,0% (Wajib pelimpahan berkas ke KPKNL Batam)',
      standardOrigin: 'PMK Pedoman Pengelolaan dan Penghapusan Piutang BLU & KPKNL',
    },
    executiveAction: 'Lakukan penagihan khusus (task force) bersama Direktorat Terkait dan terbitkan Surat Peringatan (SP) untuk 25 debitur terbesar yang jatuh tempo pada bulan berjalan.',
  },

  coverage_ratio: {
    id: 'coverage_ratio',
    unit: 'biro-keuangan',
    title: 'Financial Coverage Ratio (FIN_COVER)',
    codeTag: 'FIN_COVER',
    category: 'Tata Kelola & Evaluasi',
    currentValue: '0,86x (86,0% Mandiri)',
    targetValue: 'Benchmark Solvabilitas: ≥ 0,80x',
    statusText: 'Kemandirian Operasional Prima',
    statusVariant: 'success',
    summary: 'Rasio kemampuan pendapatan riil PNBP dalam menutup seluruh realisasi belanja operasional berjalan, mencerminkan tingkat kemandirian fiskal BLU BP Batam.',
    presentationPitch: 'Coverage ratio kemandirian fiskal berada pada level 0,86x (86,0%), melampaui ambang batas aman 0,80x. Ini membuktikan bahwa setiap Rp 1,00 belanja operasional yang direalisasikan telah ditopang oleh Rp 0,86 kas masuk PNBP riil (PNBP Rp 681,0 M dibanding Belanja Rp 791,8 M).',
    formulaConceptual: 'Total Realisasi Pendapatan PNBP YTD ÷ Total Realisasi Belanja Operasional YTD',
    numerator: {
      label: 'Pembilang (Realisasi PNBP YTD)',
      realValue: 'Rp 681.000.000.000 (Kas Masuk PNBP Layanan BLU)',
      source: 'SIMKEU Item #14: SUM([keu_rekap_penerimaan_sumber_dana].[pnbp])',
    },
    denominator: {
      label: 'Penyebut (Realisasi Belanja Operasional YTD)',
      realValue: 'Rp 791.800.000.000 (Belanja Operasional Berjalan)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[belanja_operasional])',
    },
    calculationResult: '681.000.000.000 ÷ 791.800.000.000 = 0,8600x ≈ 0,86x (86,0%)',
    tableauCalculatedField: `// Calculated Field: [FIN_COVER Coverage Ratio]
SUM([keu_rekap_penerimaan_sumber_dana].[pnbp]) / SUM([keu_laporan_realisasi_anggaran_blu].[belanja_operasional])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (KPI Card BAN) & #3 (Line Chart Tren Rasio)',
      rows: 'Rasio Kemandirian Bulanan',
      columns: '[bulan], [FIN_COVER Coverage Ratio]',
      marks: 'Reference Line: 0.80x (Ambang Batas Minimum Solvabilitas)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #14 (Penerimaan Sumber Dana) & Item #3 (Laporan Realisasi Belanja BLU)',
      tableName: 'keu_rekap_penerimaan_sumber_dana & keu_laporan_realisasi_anggaran_blu',
      attributes: ['REALISASI PENDAPATAN PNBP', 'REALISASI BELANJA OPERASIONAL', 'RASIO KEMANDIRIAN'],
      updateFrequency: 'Bulanan (Cut-Off Laporan Keuangan)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 0,80x (Kemandirian fiskal kuat)',
      warning: '0,70x - 0,79x (Cukup mandiri, pengawasan belanja)',
      critical: '< 0,70x (Defisit operasional perlu pengetatan belanja)',
      standardOrigin: 'Indikator Standar Kemandirian Keuangan BLU Kemenkeu',
    },
    executiveAction: 'Pertahankan disiplin penyerapan belanja operasional dan optimalkan akselerasi penerimaan PNBP layanan unggulan untuk menjaga rasio di atas ambang batas 0,80x.',
  },

  ipa: {
    id: 'ipa',
    unit: 'biro-keuangan',
    title: 'Opini BPK & Indeks Kinerja Pelaksanaan Anggaran (IKPA)',
    codeTag: 'IKPA-KEMENKEU',
    category: 'Tata Kelola & Evaluasi',
    currentValue: 'WTP / 92,4',
    targetValue: 'Target Perkin: WTP & Skor IKPA ≥ 90,0',
    statusText: 'Kategori Sangat Baik & Kepatuhan Penuh',
    statusVariant: 'success',
    summary: 'Nilai komposit evaluasi 8 indikator pelaksanaan anggaran dari Ditjen Perbendaharaan Kemenkeu serta status opini laporan keuangan dari Badan Pemeriksa Keuangan (BPK RI).',
    presentationPitch: 'BP Batam mempertahankan opini Wajar Tanpa Pengecualian (WTP) dari BPK RI dan meraih skor IKPA 92,4 dari Kementerian Keuangan (kategori "Sangat Baik", target nasional ≥ 90,0). Keunggulan utama ada pada indikator ketepatan LPJ Bendahara (100%), penyerapan anggaran (93,2%), dan nihil dispensasi SPM.',
    formulaConceptual: '∑ (Nilai Capaian Indikator ke-i × Bobot Indikator ke-i) untuk 8 Indikator Kemenkeu',
    numerator: {
      label: 'Komponen Utama IKPA',
      realValue: 'Kesesuaian RPD (15%), Penyerapan (20%), Efisiensi (20%), LPJ (10%), dll.',
      source: 'SIMKEU Item #25: SUM([keu_indeks_pelaksanaan_anggaran].[nilai_komponen_terbobot])',
    },
    denominator: {
      label: 'Skala Penilaian Maksimal',
      realValue: '100 Poin Indeks Ditjen Perbendaharaan',
      source: 'Perdirjen Perbendaharaan Standar IKPA Nasional',
    },
    calculationResult: 'Total Komposit = 18,6 + 14,2 + 19,4 + 10,0 + 9,8 + 5,0 + 8,5 + 6,9 = 92,40 Poin',
    tableauCalculatedField: `// Calculated Field: [Nilai Akhir IKPA Kemenkeu]
SUM([keu_indeks_pelaksanaan_anggaran].[nilai_komponen_terbobot])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Scorecard KPI) & #7 (Radial / Bullet Score)',
      rows: '[nama_indikator_ikpa]',
      columns: 'SUM([nilai_capaian]), SUM([bobot]), SUM([nilai_terbobot])',
      marks: 'Color: Kategori (Hijau ≥ 90, Biru 80-89, Merah < 80)',
      filters: "[tahun] = '2026', [triwulan] = 'Q1-Q2'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #25: Indeks Pelaksanaan Anggaran (IKPA)',
      tableName: 'keu_indeks_pelaksanaan_anggaran & Hasil Audit BPK RI',
      attributes: ['INDIKATOR', 'BOBOT', 'NILAI CAPAIAN', 'NILAI TERBOBOT', 'STATUS AUDIT BPK'],
      updateFrequency: 'Triwulanan (Sesuai Rilis Resmi Kemenkeu OMSPAN)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Skor ≥ 90,00 (Kategori: Sangat Baik)',
      warning: '80,00 - 89,99 (Kategori: Baik)',
      critical: '< 80,00 (Kategori: Cukup / Kurang)',
      standardOrigin: 'Peraturan Direktur Jenderal Perbendaharaan Kemenkeu RI',
    },
    executiveAction: 'Jaga akurasi deviasi Halaman III DIPA pada setiap revisi anggaran triwulanan agar skor tidak terdegradasi pada semester kedua.',
  },

  // PDSI KPIS
  total_rak: {
    id: 'total_rak',
    unit: 'pdsi',
    title: 'Total Kapasitas Rak Data Center Tier III',
    codeTag: 'DC-CAP-01',
    category: 'Infrastruktur & DC',
    currentValue: '42 Unit Rak',
    targetValue: 'Kapasitas Terpasang Tier III Ready',
    statusText: 'Kapasitas Fisik Penuh 42U Standar',
    statusVariant: 'info',
    summary: 'Total ketersediaan unit rak server standar 42U di fasilitas Data Center BIDA Batam Centre dan Disaster Recovery Center (DRC) Sekupang.',
    presentationPitch: 'Fasilitas Data Center BP Batam memiliki total 42 rak server bersertifikasi Tier III ready, terdiri atas 28 rak di DC Utama Kantor Pusat Batam Centre dan 14 rak di DRC Sekupang. Infrastruktur ini menjamin ketersediaan ruang komputasi aman dengan redundansi listrik 2N dan pendingin presisi N+1.',
    formulaConceptual: 'SUM([Jumlah Unit Rak Server 42U Terpasang di Seluruh Fasilitas Data Center])',
    numerator: {
      label: 'Lokasi DC Utama Batam Centre',
      realValue: '28 Rak Server 42U (Row A, B, C)',
      source: 'PDSI Data Catalog Item #8: Tabel pdsi_rak_datacenter',
    },
    denominator: {
      label: 'Lokasi DRC Sekupang',
      realValue: '14 Rak Server 42U (Row D, E - Disaster Recovery)',
      source: 'PDSI Data Catalog Item #8: Tabel pdsi_rak_datacenter',
    },
    calculationResult: 'Total Rak = 28 Rak (Batam Centre) + 14 Rak (DRC Sekupang) = 42 Unit Rak',
    tableauCalculatedField: `// Calculated Field: [Total Kapasitas Rak DC]
SUM([pdsi_rak_datacenter].[total_rak])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab & Tile) & #14 (Treemap Kapasitas)',
      rows: '[lokasi_dc], [ruang_server]',
      columns: 'SUM([total_rak]), SUM([rak_terisi]), SUM([rak_kosong])',
      marks: 'Color: Lokasi DC, Label: Total Rak',
      filters: "[status_fasilitas] = 'Aktif Operasional'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #8: Data Rak Data Center',
      tableName: 'pdsi_data_rak_data_center',
      attributes: ['RUANGAN', 'JENIS RAK', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'TOTAL RAK', 'JUMLAH RAK TERISI', 'JUMLAH RAK KOSONG'],
      updateFrequency: 'Harian (Sensor IoT & DCIM Live)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: '42 Unit Rak Operasional 100% Standar TIA-942',
      warning: 'SLA Daya Listrik < 99,98%',
      critical: 'Kegagalan Pendingin / Suhu > 24°C',
      standardOrigin: 'Standar Internasional TIA-942 Rated 3 & Uptime Institute',
    },
    executiveAction: 'Pastikan pemeliharaan berkala UPS dan genset backup di kedua lokasi untuk menjaga ketersediaan listrik 99,98% tanpa downtime.',
  },

  rak_terisi: {
    id: 'rak_terisi',
    unit: 'pdsi',
    title: 'Jumlah Rak Data Terisi & Tingkat Okupansi',
    codeTag: 'DC-OCCUPANCY',
    category: 'Infrastruktur & DC',
    currentValue: '33 Rak (78,6%)',
    targetValue: 'Target Okupansi: 75% - 85%',
    statusText: 'Okupansi Optimal (9 Rak Buffer Cadangan)',
    statusVariant: 'success',
    summary: 'Jumlah unit rak server yang telah terisi perangkat komputasi aktif, storage, dan network switch oleh unit internal maupun penyewa/kolokasi eksternal.',
    presentationPitch: 'Tingkat okupansi rak data center saat ini berada pada 78,6% (33 rak terisi dari 42 rak). Sebanyak 9 rak dialokasikan sebagai buffer ekspansi sistem informasi baru dan tenant komersial. Angka 78,6% merupakan sweet spot efisiensi pendinginan dan beban kelistrikan fasilitas Tier III.',
    formulaConceptual: '(SUM([Rak Terisi]) ÷ SUM([Total Rak])) × 100%',
    numerator: {
      label: 'Pembilang (Rak Terisi Aktif)',
      realValue: '33 Unit Rak (Internal BP Batam: 22 Rak, Kolokasi: 11 Rak)',
      source: 'PDSI Item #8: SUM([pdsi_data_rak_data_center].[jumlah_rak_terisi])',
    },
    denominator: {
      label: 'Penyebut (Total Rak Tersedia)',
      realValue: '42 Unit Rak Server 42U',
      source: 'PDSI Item #8: SUM([pdsi_data_rak_data_center].[total_rak])',
    },
    calculationResult: '(33 ÷ 42) × 100% = 78,57% ≈ 78,6%',
    tableauCalculatedField: `// Calculated Field: [Tingkat Okupansi Rak DC %]
SUM([pdsi_data_rak_data_center].[jumlah_rak_terisi]) / SUM([pdsi_data_rak_data_center].[total_rak]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #2 (Highlight Table) & #23 (Bullet Graph)',
      rows: '[ruangan], [jenis_rak]',
      columns: '[Tingkat Okupansi Rak DC %]',
      marks: 'Color: Okupansi (Hijau 70-85%, Kuning > 85%, Biru < 70%)',
      filters: "[status] = 'Aktif'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #8: Data Rak Data Center',
      tableName: 'pdsi_data_rak_data_center',
      attributes: ['RUANGAN', 'JENIS RAK', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'TOTAL RAK', 'JUMLAH RAK TERISI', 'JUMLAH RAK KOSONG'],
      updateFrequency: 'Mingguan (Asset Verification DCIM)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: '75,0% - 85,0% (Rentang optimal efisiensi PUE)',
      warning: '> 85,0% (Perlu rencana ekspansi modul baru)',
      critical: '> 95,0% (Risiko keterbatasan kapasitas darurat)',
      standardOrigin: 'Best Practice Data Center Facility Management & Standar ISO 27001',
    },
    executiveAction: 'Alokasikan 4 dari 9 rak tersisa untuk rencana sentralisasi server database Pertanahan dan Pelabuhan pada semester depan.',
  },

  indeks_spbe: {
    id: 'indeks_spbe',
    unit: 'pdsi',
    title: 'Indeks Sistem Pemerintahan Berbasis Elektronik (SPBE)',
    codeTag: 'SPBE-KEMENPAN',
    category: 'Tata Kelola SPBE & Data',
    currentValue: '3,68 (Predikat "Sangat Baik")',
    targetValue: 'Target Nasional: ≥ 3,50 (Skala 1,00 - 5,00)',
    statusText: 'Melampaui Target Perkin 2026',
    statusVariant: 'success',
    summary: 'Nilai evaluasi kematangan penerapan SPBE oleh Kementerian PAN-RB yang mencakup 4 domain: Kebijakan Internal, Tata Kelola, Manajemen, dan Layanan Digital.',
    presentationPitch: 'BP Batam meraih Indeks SPBE 3,68 dengan predikat "Sangat Baik" dari KemenPAN-RB (skala 1-5). Skor ini melampaui target tahunan 3,50. Nilai tertinggi diraih pada Domain Layanan SPBE (skor 3,85) berkat integrasi layanan perizinan terpadu IBOSS, e-Office, dan portal data center yang telah terhubung antarsistem.',
    formulaConceptual: '∑ (Nilai Kematangan Tiap Indikator × Bobot Indikator) ÷ Total Bobot (4 Domain & 47 Indikator Evaluasi)',
    numerator: {
      label: '4 Domain Penilaian SPBE',
      realValue: 'Kebijakan (3,55), Tata Kelola (3,60), Manajemen (3,65), Layanan (3,85)',
      source: 'PDSI Item #18: Tabel pdsi_evaluasi_spbe KemenPAN-RB',
    },
    denominator: {
      label: 'Skala Indeks KemenPAN-RB',
      realValue: 'Skala 1,00 (Perintisan) s.d. 5,00 (Optimum)',
      source: 'PermenPAN-RB No. 59 Tahun 2020 tentang Pedoman Evaluasi SPBE',
    },
    calculationResult: 'Indeks Komposit Terbobot = 3,68 (Kategori: Sangat Baik / Predikat Tertinggi Lembaga Non-Kementerian)',
    tableauCalculatedField: `// Calculated Field: [Indeks SPBE Komposit]
SUM([pdsi_evaluasi_spbe].[nilai_kematangan_terbobot])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #16 (Radar / Spider Domain Chart)',
      rows: '[domain_spbe], [aspek_spbe]',
      columns: '[Indeks SPBE Komposit], [Target Nasional]',
      marks: 'Color: Domain Predikat, Label: Nilai Kematangan (1-5)',
      filters: "[tahun_evaluasi] = '2025/2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #18: Dokumen Rencana SPBE BP Batam',
      tableName: 'pdsi_evaluasi_spbe & Portal Tauval SPBE KemenPAN-RB',
      attributes: ['DOMAIN', 'ASPEK', 'INDIKATOR KE-N', 'TINGKAT TINGKAT KEMATANGAN (1-5)', 'BUKTI DUKUNG DOKUMEN'],
      updateFrequency: 'Tahunan (Rilis Resmi Kementerian PAN-RB)',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 3,50 (Predikat Sangat Baik)',
      warning: '2,60 - 3,49 (Predikat Baik)',
      critical: '< 2,60 (Predikat Cukup / Perlu Audit Mendalam)',
      standardOrigin: 'Peraturan Presiden No. 95 Tahun 2018 tentang SPBE',
    },
    executiveAction: 'Tingkatkan Domain Manajemen SPBE (Audit TIK dan Manajemen Risiko Siber) agar pada evaluasi mendatang BP Batam dapat menembus predikat "Memuaskan" (skor ≥ 4,20).',
  },

  total_serangan: {
    id: 'total_serangan',
    unit: 'pdsi',
    title: 'Total Serangan Siber Terdeteksi & Termitigasi CSIRT',
    codeTag: 'SOC-CYBERSEC',
    category: 'Keamanan Siber',
    currentValue: '14.820 (98,7% Termitigasi)',
    targetValue: 'Tingkat Mitigasi Keamanan: ≥ 98,0%',
    statusText: 'Perlindungan SOC 24/7 Terjaga',
    statusVariant: 'success',
    summary: 'Jumlah anomali ancaman siber (DDoS, port scanning, malware, brute force, exploit) yang dideteksi SIEM NOC dan berhasil diblokir sebelum menembus perimeter sistem informasi.',
    presentationPitch: 'Security Operations Center (SOC) dan CSIRT BP Batam mendeteksi 14.820 aktivitas serangan siber sepanjang tahun 2026. Sebanyak 14.627 serangan (98,7%) berhasil dimitigasi dan diblokir secara otomatis oleh Next-Gen Firewall (NGFW) dan Web Application Firewall (WAF) tanpa ada kebocoran data (zero data breach).',
    formulaConceptual: '(Total Serangan Siber Termitigasi ÷ Total Serangan Siber Terdeteksi) × 100%',
    numerator: {
      label: 'Pembilang (Serangan Termitigasi)',
      realValue: '14.627 Insiden Sukses Diblokir (98,7%)',
      source: 'PDSI Item #12: SUM([pdsi_insiden_siber].[termitigasi])',
    },
    denominator: {
      label: 'Penyebut (Total Serangan Terdeteksi)',
      realValue: '14.820 Anomali / Event Ancaman Tervalidasi',
      source: 'PDSI Item #12: SUM([pdsi_insiden_siber].[total_serangan])',
    },
    calculationResult: '(14.627 ÷ 14.820) × 100% = 98,69% ≈ 98,7%',
    tableauCalculatedField: `// Calculated Field: [% Mitigasi Serangan Siber]
SUM([pdsi_insiden_siber].[termitigasi]) / SUM([pdsi_insiden_siber].[total_serangan]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #3 (Line Chart Tren Harian) & #12 (Pie/Donut Distribusi Vektor)',
      rows: '[vektor_serangan] (DDoS, Malware, Brute Force, Web Exploit)',
      columns: '[tanggal], SUM([total_serangan]), [% Mitigasi Serangan Siber]',
      marks: 'Color: Tingkat Keparahan (Critical, High, Medium, Low)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #12: Data Total Serangan Terhadap Keamanan IT',
      tableName: 'pdsi_serangan_keamanan_it',
      attributes: ['PERIODE', 'THREAT ACTIVITY', 'STATUS KEAMANAN', 'JML SERANGAN'],
      updateFrequency: 'Real-Time (Streaming Sensor SOC 24/7)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 98,0% Serangan Termitigasi Seketika',
      warning: '95,0% - 97,9% (Eskalasi ke tim tanggap darurat CSIRT)',
      critical: '< 95,0% / Ada sistem penting mengalami downtime',
      standardOrigin: 'Standar Keamanan Siber BSSN (Badan Siber dan Sandi Negara) & ISO 27001',
    },
    executiveAction: 'Lakukan penetration testing berkala setiap kuartal pada aplikasi perizinan publik dan perbarui rule WAF untuk mengantisipasi zero-day vulnerability.',
  },

  kepuasan_dc: {
    id: 'kepuasan_dc',
    unit: 'pdsi',
    title: 'Indeks Kepuasan Pelanggan Data Center (CSAT)',
    codeTag: 'CSAT-DC',
    category: 'Layanan & Helpdesk',
    currentValue: '94,2% (Indeks 4,71/5)',
    targetValue: 'Target Kepuasan: ≥ 90,0%',
    statusText: 'Kategori "Sangat Puas"',
    statusVariant: 'success',
    summary: 'Rasio kepuasan pengguna layanan fasilitas colocation data center, hosting aplikasi, jaringan interkoneksi, dan dukungan teknis 24/7.',
    presentationPitch: 'Indeks kepuasan pengguna data center mencapai 94,2% (skor rata-rata 4,71 dari 5,00) melampaui target perkin 90,0%. Responden mengapresiasi keandalan uptime kelistrikan tanpa gangguan, kecepatan respon helpdesk (SLA rata-rata 12 menit), dan keamanan fisik fasilitas biometrik.',
    formulaConceptual: '(Total Skor Responden ÷ (Jumlah Responden × Skor Maksimal 5)) × 100%',
    numerator: {
      label: 'Pembilang (Total Akumulasi Skor Survei)',
      realValue: '1.413 Poin (Dari 300 Responden Internal & Tenant)',
      source: 'PDSI Item #11: SUM([pdsi_kepuasan_pelanggan_dc].[persentase])',
    },
    denominator: {
      label: 'Penyebut (Skor Ideal Maksimum)',
      realValue: '1.500 Poin (300 Responden × Skor 5)',
      source: 'PDSI Item #11: (COUNT([pdsi_kepuasan_pelanggan_dc].[kategori]) * 5)',
    },
    calculationResult: '(1.413 ÷ 1.500) × 100% = 94,20%',
    tableauCalculatedField: `// Calculated Field: [CSAT Data Center %]
SUM([pdsi_kepuasan_pelanggan_dc].[persentase]) / (COUNT([pdsi_kepuasan_pelanggan_dc].[kategori]) * 5) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #6 (Horizontal Bar Kepuasan per Aspek)',
      rows: '[kategori], [tingkat_kepuasan]',
      columns: '[CSAT Data Center %]',
      marks: 'Color: Kategori (Hijau ≥ 90%, Kuning 80-89%, Merah < 80%)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #11: Tingkat Kepuasan Pelanggan Data Center',
      tableName: 'pdsi_kepuasan_pelanggan_dc',
      attributes: ['TAHUN', 'KATEGORI', 'TINGKAT KEPUASAN', 'PERSENTASE'],
      updateFrequency: 'Semesteran & Event-Based Survei',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 90,0% Kepuasan Pelanggan',
      warning: '80,0% - 89,9% (Evaluasi catatan perbaikan)',
      critical: '< 80,0% (Audit operasional tim helpdesk dan SLA)',
      standardOrigin: 'Standar Pelayanan Minimal (SPM) Kementerian PAN-RB & ISO 9001',
    },
    executiveAction: 'Tingkatkan otomasi ticketing helpdesk berbasis AI chatbot untuk mempertahankan respon time di bawah 10 menit.',
  },

  panjang_jalur_fo: {
    id: 'panjang_jalur_fo',
    unit: 'pdsi',
    title: 'Panjang Jalur Backbone Fiber Optik (FO)',
    codeTag: 'NET-FO-PANJANG',
    category: 'Infrastruktur & DC',
    currentValue: '284,5 KM',
    targetValue: '5 Koridor Utama Ring Pulau Batam',
    statusText: '100% Backbone Terhubung',
    statusVariant: 'info',
    summary: 'Total panjang rute fisik kabel serat optik bawah tanah dan udara yang membentang menghubungkan seluruh simpul strategis BP Batam.',
    presentationPitch: 'BP Batam mengoperasikan jalur kabel serat optik sepanjang 284,5 kilometer yang menjangkau seluruh aset vital di Pulau Batam, memastikan interkoneksi data center, gedung perkantoran satker, bandara, pelabuhan, dan rumah sakit beroperasi tanpa jeda.',
    formulaConceptual: 'SUM([PANJANG (KM)])',
    numerator: {
      label: 'Pembilang (Total Panjang Kabel Terpasang)',
      realValue: '284,5 KM (Akumulasi 5 Ruas Koridor)',
      source: 'PDSI Item #2: SUM([pdsi_jaringan_fiber_optik].[panjang])',
    },
    denominator: {
      label: 'Basis Pengukuran',
      realValue: 'Total Jarak Rute Fisik dalam Kilometer (KM)',
      source: 'PDSI Item #2: Jaringan Fiber Optik BP Batam (GIS Shapefile)',
    },
    calculationResult: 'Total Panjang = SUM(PANJANG) = 284,5 KM',
    tableauCalculatedField: `// Calculated Field: [Total Panjang Jalur FO (KM)]
SUM([pdsi_jaringan_fiber_optik].[panjang])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #10 (Geographic Maps) & #1 (Crosstab Segmen)',
      rows: '[ruas], [jalur]',
      columns: 'SUM([panjang])',
      marks: 'Map Line Path: Koordinat Rute, Color: Status Utilitas',
      filters: "[klasifikasi] = 'Backbone'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #2: Jaringan Fiber Optik BP Batam',
      tableName: 'pdsi_jaringan_fiber_optik',
      attributes: ['METADATA', 'REMARK', 'SHAPE_Leng', 'NAMOBJ', 'SRS_ID', 'FCODE', 'OBJECTID', 'JALUR', 'JLN', 'JMLHCORE', 'PANJANG', 'BRANDFO', 'STARTPOINT', 'ENDPOINT', 'RUAS', 'KLASIFIKASI'],
      updateFrequency: 'Bulanan (Hasil Patroli Jalur Kabel FO)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'Ketersediaan Jaringan (Network Uptime) ≥ 99,90%',
      warning: 'Waktu Perbaikan Putus Kabel > 4 Jam',
      critical: 'Putus Jalur Ring Utama (Penyebab blackout data)',
      standardOrigin: 'Service Level Agreement (SLA) Jaringan Telekomunikasi Nasional',
    },
    executiveAction: 'Lakukan koordinasi dengan Dinas Bina Marga dan kontraktor utilitas jalan untuk pencegahan insiden kabel putus akibat galian proyek pelebaran jalan.',
  },

  kapasitas_core_fo: {
    id: 'kapasitas_core_fo',
    unit: 'pdsi',
    title: 'Kapasitas Core Fiber Optik (Core FO)',
    codeTag: 'NET-CORE-FO',
    category: 'Infrastruktur & DC',
    currentValue: '288 Core',
    targetValue: '240 Core Aktif (83,3% Utilisasi)',
    statusText: 'Kapasitas Core Andal & Tersedia Cadangan',
    statusVariant: 'success',
    summary: 'Total jumlah core helaian serat optik (kapasitas kanal transmisi) yang tersedia di sepanjang ruas kabel backbone untuk transmisi multi-gigabit.',
    presentationPitch: 'Kapasitas serat optik BP Batam memiliki total 288 core yang terbagi dalam variasi kabel 96-core, 48-core, dan 24-core. Saat ini 240 core telah aktif mentransmisikan data sistem perizinan, CCTV analitik, dan VoIP, sementara 48 core (16,7%) disiapkan sebagai cadangan strategis (spare core).',
    formulaConceptual: 'SUM([JMLHCORE])',
    numerator: {
      label: 'Pembilang (Total Core Terpasang)',
      realValue: '288 Core (Akumulasi Jumlah Core per Ruas Jalur FO)',
      source: 'PDSI Item #2: SUM([pdsi_jaringan_fiber_optik].[jmlhcore])',
    },
    denominator: {
      label: 'Alokasi Penggunaan',
      realValue: '240 Core Aktif (83,3%) + 48 Core Spare/Cadangan (16,7%)',
      source: 'PDSI Item #2: Dokumentasi Core Assignment PDSI',
    },
    calculationResult: 'Total Core = SUM(JMLHCORE) = 288 Core',
    tableauCalculatedField: `// Calculated Field: [Total Kapasitas Core FO]
SUM([pdsi_jaringan_fiber_optik].[jmlhcore])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #23 (Bullet Graph)',
      rows: '[ruas], [brandfo]',
      columns: 'SUM([jmlhcore]), SUM([core_aktif])',
      marks: 'Color: Rasio Utilisasi Core, Label: Jml Core',
      filters: "[status] = 'Aktif'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #2: Jaringan Fiber Optik BP Batam',
      tableName: 'pdsi_jaringan_fiber_optik',
      attributes: ['METADATA', 'REMARK', 'SHAPE_Leng', 'NAMOBJ', 'SRS_ID', 'FCODE', 'OBJECTID', 'JALUR', 'JLN', 'JMLHCORE', 'PANJANG', 'BRANDFO', 'STARTPOINT', 'ENDPOINT', 'RUAS', 'KLASIFIKASI'],
      updateFrequency: 'Bulanan (Audit Core Splicing OTDR)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'Utilisasi Core 70% - 85% (Optimal dengan buffer spare)',
      warning: 'Utilisasi Core > 90% (Perlu penarikan kabel penambahan core)',
      critical: 'Kekurangan Core Cadangan (< 5% spare)',
      standardOrigin: 'Standar Infrastruktur Telekomunikasi ITU-T G.652 & TIA/EIA-568',
    },
    executiveAction: 'Pertahankan minimal 10% core kosong pada setiap ruas untuk jalur redundancy darurat jika terjadi pembelahan jalur (fiber cut).',
  },

  jaringan_fiber: {
    id: 'jaringan_fiber',
    unit: 'pdsi',
    title: 'Infrastruktur Jaringan Fiber Optik (FO) Backbone',
    codeTag: 'NET-FO-KM',
    category: 'Infrastruktur & DC',
    currentValue: '284,5 KM',
    targetValue: 'Menghubungkan 8 Wilayah Vital BP Batam',
    statusText: 'Backbone Aktif (Utilitas Core 81,4%)',
    statusVariant: 'info',
    summary: 'Total panjang jalur kabel serat optik bawah tanah yang menghubungkan kantor pusat BP Batam, bandara Hang Nadim, pelabuhan, rumah sakit, dan pos komando se-Pulau Batam.',
    presentationPitch: 'BP Batam mengoperasikan jaringan serat optik (Fiber Optic) sepanjang 284,5 kilometer yang menjangkau seluruh aset vital. Utilisasi core rata-rata berada pada 81,4% dengan ketersediaan koneksi 99,95%, memastikan pertukaran data CCTV, perizinan, dan sistem ERP berjalan tanpa latensi.',
    formulaConceptual: 'SUM([Panjang Kabel Fiber Optik per Ruas Segmen Jaringan (KM)])',
    numerator: {
      label: 'Segmen Utama Backbone',
      realValue: '198,2 KM (Jalur Ring Pusat Kota, Pelabuhan & Bandara)',
      source: 'PDSI Item #2: SUM([pdsi_jaringan_fiber_optik].[panjang])',
    },
    denominator: {
      label: 'Segmen Distribusi & Akses Gedung',
      realValue: '86,3 KM (Koneksi Gedung Satker & Pos Lapangan)',
      source: 'PDSI Item #2: SUM([pdsi_jaringan_fiber_optik].[panjang])',
    },
    calculationResult: 'Total FO = 198,2 KM + 86,3 KM = 284,5 KM',
    tableauCalculatedField: `// Calculated Field: [Total Panjang Jaringan FO (KM)]
SUM([pdsi_jaringan_fiber_optik].[panjang])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #10 (Geographic Maps) & #1 (Crosstab Segmen)',
      rows: '[ruas], [jalur]',
      columns: 'SUM([panjang]), AVG([jmlhcore])',
      marks: 'Map Line Path: Koordinat Rute, Color: Status Utilitas',
      filters: "[klasifikasi] = 'Backbone'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #2: Jaringan Fiber Optik BP Batam',
      tableName: 'pdsi_jaringan_fiber_optik',
      attributes: ['METADATA', 'REMARK', 'SHAPE_Leng', 'NAMOBJ', 'SRS_ID', 'FCODE', 'OBJECTID', 'JALUR', 'JLN', 'JMLHCORE', 'PANJANG', 'BRANDFO', 'STARTPOINT', 'ENDPOINT', 'RUAS', 'KLASIFIKASI'],
      updateFrequency: 'Bulanan (Hasil Patroli Jalur Kabel FO)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'Ketersediaan Jaringan (Network Uptime) ≥ 99,90%',
      warning: 'Waktu Perbaikan Putus Kabel > 4 Jam',
      critical: 'Putus Jalur Ring Utama (Penyebab blackout data)',
      standardOrigin: 'Service Level Agreement (SLA) Jaringan Telekomunikasi Nasional',
    },
    executiveAction: 'Lakukan koordinasi dengan Dinas Bina Marga dan kontraktor utilitas jalan untuk pencegahan insiden kabel putus akibat galian proyek pelebaran jalan.',
  },

  jumlah_server: {
    id: 'jumlah_server',
    unit: 'pdsi',
    title: 'Inventaris Server Fisik & Node Hyperconverged (HCI)',
    codeTag: 'INFRA-SRV',
    category: 'Infrastruktur & DC',
    currentValue: '58 Server',
    targetValue: '48 Server Aktif • 10 Node Standby/DRC',
    statusText: 'Infrastruktur Komputasi Andal',
    statusVariant: 'info',
    summary: 'Total mesin server fisik (rackmount & blade) serta klaster node Hyperconverged Infrastructure (HCI) yang menjalankan virtual machine private cloud BP Batam.',
    presentationPitch: 'Infrastruktur komputasi data center diperkuat oleh 58 server fisik dan node HCI, terdiri atas 48 unit beroperasi aktif melayani beban aplikasi 24 jam dan 10 unit node siaga di DRC Sekupang untuk failover otomatis saat terjadi kendala darurat.',
    formulaConceptual: 'COUNT([Daftar Seluruh Node Server Fisik dan Klaster Komputasi Aktif])',
    numerator: {
      label: 'Server Aktif Produksi',
      realValue: '48 Unit (HCI Nutanix/VMware Klaster Produksi)',
      source: "PDSI Item #13: SUM([pdsi_infrastruktur_server_storage].[jumlah])",
    },
    denominator: {
      label: 'Node Standby & DRC Sekupang',
      realValue: '10 Unit (Node Failover & Backup)',
      source: "PDSI Item #13: SUM([pdsi_infrastruktur_server_storage].[jumlah])",
    },
    calculationResult: 'Total Server = 48 (Produksi) + 10 (DRC) = 58 Server Fisik',
    tableauCalculatedField: `// Calculated Field: [Total Inventaris Server]
SUM([pdsi_infrastruktur_server_storage].[jumlah])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #14 (Treemap Pemanfaatan CPU/RAM)',
      rows: '[tipe], [brand]',
      columns: 'SUM([jumlah]), [status_garansi]',
      marks: 'Color: Status Garansi (Aktif, Extended, EOS)',
      filters: "[status_garansi] IN ('Aktif', 'Extended')",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #13: Jumlah Server BP Batam',
      tableName: 'pdsi_infrastruktur_server_storage',
      attributes: ['TANGGAL REKAP', 'NAMA SERVER', 'JUMLAH', 'TIPE', 'BRAND', 'TGL GARANSI', 'STATUS GARANSI', 'EOS'],
      updateFrequency: 'Harian (Integrasi SNMP Monitoring)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'Utilisasi CPU Rata-rata 40% - 70% (Beban Seimbang)',
      warning: 'Utilisasi CPU > 85% Berkelanjutan',
      critical: 'Kegagalan Node Klaster (High Availability Trigger)',
      standardOrigin: 'Enterprise Architecture & Cloud Computing Standards',
    },
    executiveAction: 'Lakukan peremajaan bertahap pada 6 server generasi lama yang telah mencapai usia pakai 5 tahun untuk efisiensi konsumsi daya listrik.',
  },

  jumlah_aplikasi: {
    id: 'jumlah_aplikasi',
    unit: 'pdsi',
    title: 'Portfolio Aplikasi Layanan Publik & Sistem Internal',
    codeTag: 'APP-PORTFOLIO',
    category: 'Tata Kelola SPBE & Data',
    currentValue: '114 Aplikasi',
    targetValue: '84 Aplikasi Aktif • 30 Tahap Konsolidasi',
    statusText: 'Rasionalisasi & Integrasi Single Sign-On',
    statusVariant: 'success',
    summary: 'Total sistem informasi berbasis web dan mobile yang terdaftar dalam katalog arsitektur aplikasi BP Batam untuk pelayanan perizinan investor maupun manajemen internal.',
    presentationPitch: 'PDSI mengelola portfolio 114 sistem informasi, di mana 84 aplikasi merupakan sistem inti layanan publik (IBOSS, e-Billing, SIMKEU, SIPRO, Pelabuhan) dan 30 aplikasi lainnya sedang dalam roadmap simplifikasi dan integrasi menuju portal tunggal terpadu BP Batam sesuai mandat SPBE nasional.',
    formulaConceptual: 'COUNTD([Kode Aplikasi Terdaftar dalam Katalog Sistem Informasi])',
    numerator: {
      label: 'Aplikasi Pelayanan Publik',
      realValue: '52 Aplikasi (Perizinan Usaha, UWT, Bandara, Pelabuhan, SPAM)',
      source: 'PDSI Item #14: COUNTD([pdsi_data_aplikasi].[nama_aplikasi])',
    },
    denominator: {
      label: 'Aplikasi Administrasi Internal',
      realValue: '62 Aplikasi (SIMKEU, e-Office, SDM, Aset, Kepegawaian)',
      source: 'PDSI Item #14: COUNTD([pdsi_data_aplikasi].[nama_aplikasi])',
    },
    calculationResult: 'Total Aplikasi = 52 (Publik) + 62 (Internal) = 114 Aplikasi Terdaftar',
    tableauCalculatedField: `// Calculated Field: [Jumlah Aplikasi Terkatalog]
COUNTD([pdsi_data_aplikasi].[nama_aplikasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab Matrix) & #12 (Donut Chart Kategori Layanan)',
      rows: '[kategori_aplikasi], [unit_operasional]',
      columns: 'COUNTD([nama_aplikasi])',
      marks: 'Color: [status] (Aktif, Migrasi, Pembaruan)',
      filters: "[status] = 'Aktif'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #14: Jumlah Aplikasi BP Batam',
      tableName: 'pdsi_data_aplikasi',
      attributes: ['NAMA APLIKASI', 'URAIAN APLIKASI', 'BASIS APLIKASI', 'TIPE LISENSI APLIKASI', 'BAHASA PEMOGRAMAN', 'KERANGKA PENGEMBANG', 'UNIT PENGEMBANG', 'UNIT OPERASIONAL', 'INSTANSI', 'KATEGORI APLIKASI', 'TANDA TANGAN ELEKTRONIK', 'KLASIFIKASI APLIKASI', 'DOMAIN', 'STATUS', 'DEV YEAR'],
      updateFrequency: 'Bulanan (Review Komite Tata Kelola TIK)',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '100% Aplikasi Inti Terhubung API Gateway & Single Sign-On',
      warning: 'Aplikasi standalone tanpa integrasi pertukaran data',
      critical: 'Aplikasi tanpa pembaruan keamanan (end-of-life framework)',
      standardOrigin: 'Arsitektur SPBE Nasional & Perpres Satu Data Indonesia',
    },
    executiveAction: 'Lanjutkan penggabungan aplikasi terfragmentasi ke dalam SuperApp Eksekutif BP Batam untuk mempermudah akses pimpinan dalam pengambilan keputusan berbasis data.',
  },

  // ==========================================
  // TABLE-LEVEL KPIS (BIRO KEUANGAN & PDSI)
  // ==========================================
  saldo_bank_realtime: {
    id: 'saldo_bank_realtime',
    unit: 'biro-keuangan',
    title: 'Laporan Saldo Bank Real Time & Ketahanan Kas Operasional (Item 13)',
    codeTag: 'KEU-ITEM-13',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 1.524,0 M (3,89 Bulan CCR)',
    targetValue: 'Standar PMK BLU: ≥ 3,00 Bulan Operasional',
    statusText: 'Likuiditas Sangat Prima',
    statusVariant: 'success',
    summary: 'Konsolidasi saldo kas harian dan real time dari seluruh rekening bank mitra BLU BP Batam (Giro Penerimaan, Pengeluaran, Operasional, dan Deposito Berjangka).',
    presentationPitch: 'Total likuiditas kas operasional BP Batam saat ini tercatat sebesar Rp 1,52 Triliun pada 7 bank mitra pemerintah. Nilai ini setara dengan 3,89 bulan ketahanan pengeluaran operasional (di atas benchmark aman Kemenkeu 3 bulan), memastikan seluruh agenda pembayaran proyek infrastruktur dan operasional rutin berjalan lancar tanpa kendala kas.',
    formulaConceptual: 'Total Saldo Kas Bank Riil ÷ (Rata-rata Realisasi Belanja Bulanan)',
    numerator: {
      label: 'Pembilang (Saldo Riil Bank Mitra)',
      realValue: 'Rp 1.524.000.000.000 (Konsolidasi 7 Bank)',
      source: 'SIMKEU Item #13: SUM([keu_saldo_bank_realtime].[nilai])',
    },
    denominator: {
      label: 'Penyebut (Belanja Bulanan Rata-rata)',
      realValue: 'Rp 390.720.000.000 / bulan',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) / 12',
    },
    calculationResult: '1.524,0 M ÷ 390,72 M = 3,89 Bulan (Rasio Sangat Sehat)',
    tableauCalculatedField: `// Calculated Field: [Ketahanan Kas Operasional (Bulan)]
SUM([keu_saldo_bank_realtime].[nilai]) / (SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) / 12)`,
    tableauShelvesGuide: {
      showMe: 'Show Me #6 (Horizontal Bar) & #1 (Crosstab Detail)',
      rows: '[nama_bank], [nomor_rekening]',
      columns: 'SUM([nilai]), [kategori_rekening]',
      marks: 'Color: [kategori_rekening], Label: SUM([nilai]) dalam Rp Miliar',
      filters: "[tanggal_rekap] = MAX([tanggal_rekap])",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #13: Laporan Saldo Bank Real-time',
      tableName: 'keu_saldo_bank_realtime',
      attributes: ['NAMA BANK', 'UNIT', 'KATEGORI UNIT', 'NOMOR REKENING', 'KEGUNAAN REKENING', 'KATEGORI REKENING', 'TANGGAL REKAP', 'NILAI'],
      updateFrequency: 'Perbulan & H2H Bank Real Time',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 3,00 Bulan Kebutuhan Operasional',
      warning: '1,50 - 2,99 Bulan (Monitoring harian arus kas)',
      critical: '< 1,50 Bulan (Intervensi pengetatan kas)',
      standardOrigin: 'Pedoman Pengelolaan Kas Badan Layanan Umum Kemenkeu RI',
    },
    executiveAction: 'Optimalkan penempatan dana idle pada instrumen Deposito On Call (DOC) bank mitra dengan suku bunga kompetitif guna memacu pendapatan jasa giro/bunga BLU.',
  },

  keseimbangan_surplus: {
    id: 'keseimbangan_surplus',
    unit: 'biro-keuangan',
    title: 'Keseimbangan Surplus & Defisit Operasional per Satuan Kerja',
    codeTag: 'KEU-SURPLUS-NET',
    category: 'Pendapatan & PNBP',
    currentValue: '+Rp 196,0 M (Surplus Bersih)',
    targetValue: 'Realisasi PNBP > Realisasi Belanja',
    statusText: 'Surplus Fiskal Solid',
    statusVariant: 'success',
    summary: 'Selisih bersih antara total pendapatan kas PNBP fungsional dengan realisasi belanja operasional dan modal per unit kerja pengampu di lingkungan BP Batam.',
    presentationPitch: 'Secara konsolidasian, BP Batam membukukan surplus operasional bersih sebesar +Rp 196,0 Miliar. Unit komersial strategis seperti Direktorat Pengelolaan Pertanahan (+Rp 367 M), Kantor Bandara Hang Nadim (+Rp 173 M), dan Direktorat Kepelabuhanan (+Rp 67,2 M) menjadi motor utama pencetak surplus yang menopang subsidi silang bagi satker pembangunan infrastruktur publik.',
    formulaConceptual: 'SUM([keu_target_pnbp_rekap].[realisasi]) - SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    numerator: {
      label: 'Total Realisasi Kas Masuk PNBP',
      realValue: 'Rp 981.240.000.000 (YTD 2026)',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    denominator: {
      label: 'Total Realisasi Belanja SP2D',
      realValue: 'Rp 785.240.000.000 (Unit Terkait)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    },
    calculationResult: '981,24 M - 785,24 M = +196,00 M (Net Surplus Fiskal Operasional)',
    tableauCalculatedField: `// Calculated Field: [Surplus Defisit Bersih]
ZN(SUM([keu_target_pnbp_rekap].[realisasi])) - ZN(SUM([keu_laporan_realisasi_anggaran_blu].[realisasi]))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #6 (Diverging Horizontal Bar) & #1 (Text Table)',
      rows: '[nama_unit]',
      columns: '[Surplus Defisit Bersih]',
      marks: 'Color: Diverging Palette (Hijau > 0, Merah < 0)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #8 (Target PNBP) & Item #3 (Laporan Realisasi Belanja BLU)',
      tableName: 'keu_target_pnbp_rekap & keu_laporan_realisasi_anggaran_blu',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Bulanan (Rekonsiliasi Akuntansi)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Surplus Kas Positif (> Rp 0)',
      warning: 'Break-even (Rp -10 M s.d. Rp 0)',
      critical: 'Defisit Melampaui Cadangan Silang',
      standardOrigin: 'Indikator Kinerja Kemandirian BLU Ditjen Anggaran Kemenkeu',
    },
    executiveAction: 'Akselerasikan penagihan piutang UWT dan tarif kepelabuhanan semester berjalan untuk menjaga surplus kas di atas Rp 200 Miliar.',
  },

  arus_kas: {
    id: 'arus_kas',
    unit: 'biro-keuangan',
    title: 'Laporan Penerimaan Sumber Dana & Arus Kas BLU (Item 14)',
    codeTag: 'KEU-ITEM-14',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 265,1 M / Bulan (Rata-rata Inflow)',
    targetValue: 'Net Cash Inflow Bulanan Positif',
    statusText: 'Cash Inflow Stabil',
    statusVariant: 'success',
    summary: 'Penerimaan kas masuk dari sumber pendanaan PNBP fungsional, Rupiah Murni APBN, dan hibah ke rekening kas BLU BP Batam per periode cut-off.',
    presentationPitch: 'Rata-rata penerimaan kas masuk (cash inflow) mencapai Rp 265,1 Miliar per bulan dengan tren positif. Puncak penerimaan terjadi pada kuartal II seiring siklus perpanjangan izin alokasi lahan industri dan volume bongkar muat kargo pelabuhan, memberikan jaminan kelancaran likuiditas belanja.',
    formulaConceptual: 'SUM([keu_penerimaan_sumber_dana].[nilai]) ÷ Jumlah Bulan Periode',
    numerator: {
      label: 'Akumulasi Kas Masuk Sumber Dana',
      realValue: 'Rp 1.060.400.000.000 (Januari - April)',
      source: 'SIMKEU Item #14: SUM([keu_penerimaan_sumber_dana].[nilai])',
    },
    denominator: {
      label: 'Periode Waktu Berjalan',
      realValue: '4 Bulan Berjalan (TA 2026)',
      source: 'Kalender Anggaran',
    },
    calculationResult: '1.060,4 M ÷ 4 = Rp 265,1 Miliar / bulan',
    tableauCalculatedField: `// Calculated Field: [Rata-rata Inflow Bulanan]
SUM([keu_penerimaan_sumber_dana].[nilai]) / COUNTD([keu_penerimaan_sumber_dana].[tanggal_rekap_akhir])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #3 (Line Chart Tren Kas Masuk) & #1 (Crosstab)',
      rows: '[sumber_dana], [unit_kerja]',
      columns: '[tanggal_rekap_akhir], SUM([nilai])',
      marks: 'Line with Data Markers, Color: Sumber Dana',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #14: Laporan Penerimaan Sumber Dana',
      tableName: 'keu_penerimaan_sumber_dana',
      attributes: ['SUMBER DANA', 'UNIT KERJA', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'NILAI'],
      updateFrequency: 'Perbulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Inflow Bulanan ≥ Rp 200,0 M',
      warning: 'Inflow Bulanan Rp 150,0 M - Rp 199,9 M',
      critical: 'Inflow Bulanan < Rp 150,0 M',
      standardOrigin: 'Manajemen Likuiditas Kas Korporasi BLU BP Batam',
    },
    executiveAction: 'Monitor integrasi e-billing pada loket penerimaan pelabuhan dan rumah sakit untuk mencegah keterlambatan penyetoran kas.',
  },

  rev_target: {
    id: 'rev_target',
    unit: 'biro-keuangan',
    title: 'Target PNBP Penetapan Kinerja (Perkin) 2026 (Item 8)',
    codeTag: 'KEU-TARGET-PNBP',
    category: 'Pendapatan & PNBP',
    currentValue: 'Rp 2.447,5 M',
    targetValue: 'Plafon Target Resmi DIPA 2026',
    statusText: 'Target Resmi Disahkan',
    statusVariant: 'info',
    summary: 'Plafon target PNBP yang ditetapkan dalam dokumen Perkin dan DIPA bagi 10 Satker Penghasil di lingkungan BP Batam.',
    presentationPitch: 'Target penerimaan PNBP tahun 2026 ditetapkan sebesar Rp 2,45 Triliun. Target ini ditopang oleh kontribusi UWT Pertanahan (38%), Pelabuhan (26%), Bandara Hang Nadim (18%), dan layanan utilitas kawasan lainnya yang telah disesuaikan dengan proyeksi pertumbuhan investasi Batam.',
    formulaConceptual: 'SUM([keu_target_pnbp_rekap].[jumlah])',
    numerator: {
      label: 'Target Kumulatif 10 Satker',
      realValue: 'Rp 2.447.464.960.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[jumlah])',
    },
    denominator: {
      label: 'Satker Pengampu',
      realValue: '10 Unit Kerja Penghasil Penerimaan',
      source: 'SIMKEU Item #8: COUNTD([keu_target_pnbp_rekap].[nama_unit])',
    },
    calculationResult: 'Total Target = Rp 2.447,46 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Target PNBP]
SUM([keu_target_pnbp_rekap].[jumlah])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #6 (Bar Target per Satker)',
      rows: '[nama_unit]',
      columns: 'SUM([jumlah])',
      marks: 'Bar Chart with Total Reference Line',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #8: Rekapitulasi Target PNBP',
      tableName: 'keu_target_pnbp_rekap',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH'],
      updateFrequency: 'Pertahun (Revisi DIPA jika ada)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '100% Target Perkin Disahkan Kemenkeu',
      warning: 'Deviasi Target > 10% saat Revisi',
      critical: 'Target Belum Terakomodir DIPA',
      standardOrigin: 'DIPA Penetapan Kinerja (Perkin) 2026 BP Batam',
    },
    executiveAction: 'Pastikan seluruh satker penghasil menyusun roadmap pemenuhan target bulanan berbasis potensi kontrak eksisting.',
  },

  rev_real: {
    id: 'rev_real',
    unit: 'biro-keuangan',
    title: 'Realisasi PNBP Year-to-Date (YTD) (Item 8)',
    codeTag: 'KEU-REAL-PNBP',
    category: 'Pendapatan & PNBP',
    currentValue: 'Rp 981,2 M',
    targetValue: 'Target Proporsional April: 33,3% - 40,0%',
    statusText: 'Kas Masuk Bersih Terkonfirmasi',
    statusVariant: 'success',
    summary: 'Kas masuk PNBP riil yang telah disetor oleh wajib bayar dan tervalidasi masuk rekening kas BLU BP Batam.',
    presentationPitch: 'Realisasi kas masuk PNBP YTD telah menembus Rp 981,2 Miliar (40,1% dari target). Tren penerimaan berada dalam lintasan sangat positif, tumbuh +12,3% dibandingkan periode yang sama tahun lalu.',
    formulaConceptual: 'SUM([keu_target_pnbp_rekap].[realisasi])',
    numerator: {
      label: 'Total Realisasi Kas Masuk',
      realValue: 'Rp 981.240.000.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    denominator: {
      label: 'Jumlah Transaksi Setoran',
      realValue: '18.420 Dokumen Billing Terbayar',
      source: 'SIMKEU e-Billing Host-to-Host',
    },
    calculationResult: 'Total Realisasi = Rp 981,24 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Realisasi PNBP]
SUM([keu_target_pnbp_rekap].[realisasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #3 (Line Trend Harian)',
      rows: '[nama_unit]',
      columns: 'SUM([realisasi])',
      marks: 'Bar with Green Palette',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #8: Rekapitulasi Target PNBP',
      tableName: 'keu_target_pnbp_rekap',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH'],
      updateFrequency: 'Harian (Cut-Off 23:59 WIB)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 40,0% pada April 2026',
      warning: '30,0% - 39,9%',
      critical: '< 30,0%',
      standardOrigin: 'Kurva S Penerimaan Perkin BLU BP Batam',
    },
    executiveAction: 'Pertahankan sistem insentif percepatan pembayaran billing UWT sebelum tanggal jatuh tempo.',
  },

  rev_capaian: {
    id: 'rev_capaian',
    unit: 'biro-keuangan',
    title: 'Persentase Capaian Target PNBP BP Batam',
    codeTag: 'KEU-PCT-CAPAIAN',
    category: 'Pendapatan & PNBP',
    currentValue: '40,1% (On Track)',
    targetValue: 'Target Proporsional Q2: 50,0%',
    statusText: 'Kinerja Prima',
    statusVariant: 'success',
    summary: 'Rasio persentase antara realisasi penerimaan kas riil terhadap target DIPA Perkin pada periode berjalan.',
    presentationPitch: 'Capaian 40,1% pada bulan keempat membuktikan efektivitas penagihan dan keandalan pendapatan berbasis kontrak jangka panjang BP Batam.',
    formulaConceptual: '(SUM([keu_target_pnbp_rekap].[realisasi]) ÷ SUM([keu_target_pnbp_rekap].[jumlah])) × 100%',
    numerator: {
      label: 'Realisasi PNBP',
      realValue: 'Rp 981.240.000.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    denominator: {
      label: 'Target DIPA',
      realValue: 'Rp 2.447.464.960.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[jumlah])',
    },
    calculationResult: '(981,24 ÷ 2.447,46) × 100% = 40,09% ≈ 40,1%',
    tableauCalculatedField: `// Calculated Field: [% Capaian PNBP]
SUM([keu_target_pnbp_rekap].[realisasi]) / SUM([keu_target_pnbp_rekap].[jumlah]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #7 (Bullet Graph with Reference Line)',
      rows: '[nama_unit]',
      columns: '[% Capaian PNBP]',
      marks: 'Bullet with Reference Line at 50%',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #8: Rekapitulasi Target PNBP',
      tableName: 'keu_target_pnbp_rekap',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH'],
      updateFrequency: 'Harian',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 40,0% di April',
      warning: '30,0% - 39,9%',
      critical: '< 30,0%',
      standardOrigin: 'Standar Monitoring Perkin BP Batam',
    },
    executiveAction: 'Jaga akselerasi satker di bawah 30% capaian dengan asistensi billing penagihan.',
  },

  rev_sisa: {
    id: 'rev_sisa',
    unit: 'biro-keuangan',
    title: 'Sisa Target Perkin PNBP TA 2026',
    codeTag: 'KEU-SISA-TARGET',
    category: 'Pendapatan & PNBP',
    currentValue: 'Rp 1.466,2 M',
    targetValue: 'Target Sisa Menuju 100%',
    statusText: 'Sisa Target Terkendali',
    statusVariant: 'info',
    summary: 'Sisa nominal penerimaan PNBP yang harus dihimpun hingga akhir tahun anggaran untuk mencapai 100% Perkin.',
    presentationPitch: 'Sisa target yang harus dipenuhi hingga akhir tahun adalah Rp 1,47 Triliun. Berdasarkan potensi piutang lancar dan tagihan rutin semester II, target ini sangat realistis tercapai bahkan berpotensi melampaui 105%.',
    formulaConceptual: 'SUM([keu_target_pnbp_rekap].[jumlah]) - SUM([keu_target_pnbp_rekap].[realisasi])',
    numerator: {
      label: 'Target DIPA',
      realValue: 'Rp 2.447.464.960.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[jumlah])',
    },
    denominator: {
      label: 'Realisasi Terkumpul',
      realValue: 'Rp 981.240.000.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    calculationResult: '2.447,46 M - 981,24 M = Rp 1.466,22 Miliar',
    tableauCalculatedField: `// Calculated Field: [Sisa Target PNBP]
SUM([keu_target_pnbp_rekap].[jumlah]) - SUM([keu_target_pnbp_rekap].[realisasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Text Table) & #13 (Stacked Bar Gap)',
      rows: '[nama_unit]',
      columns: '[Sisa Target PNBP]',
      marks: 'Color: Amber Palette',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #8: Rekapitulasi Target PNBP',
      tableName: 'keu_target_pnbp_rekap',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH'],
      updateFrequency: 'Harian',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Sisa < 60% di April',
      warning: '60% - 70%',
      critical: '> 70%',
      standardOrigin: 'Monitoring Progres DIPA BP Batam',
    },
    executiveAction: 'Susun rencana penagihan intensif pada satker pengelola pelabuhan dan pertanahan pada Q3.',
  },

  exp_pagu: {
    id: 'exp_pagu',
    unit: 'biro-keuangan',
    title: 'Pagu DIPA Alokasi Belanja BLU TA 2026 (Item 3)',
    codeTag: 'KEU-PAGU-DIPA',
    category: 'Belanja & Anggaran',
    currentValue: 'Rp 3.318,5 M',
    targetValue: 'Plafon Belanja Resmi DIPA',
    statusText: 'Alokasi Pagu APBN',
    statusVariant: 'info',
    summary: 'Plafon alokasi belanja operasional, belanja pegawai, barang/jasa, dan belanja modal yang disahkan Ditjen Perbendaharaan.',
    presentationPitch: 'Pagu DIPA Belanja 2026 tercatat sebesar Rp 3,32 Triliun. Alokasi terbesar diarahkan untuk belanja modal infrastruktur konektivitas Batam (56%) guna memperkuat daya saing kawasan perdagangan bebas.',
    formulaConceptual: 'SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    numerator: {
      label: 'Pagu Total DIPA',
      realValue: 'Rp 3.318.500.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    },
    denominator: {
      label: 'Komposisi Belanja',
      realValue: 'Belanja Pegawai, Barang, Modal, dan Operasional',
      source: 'SIMKEU Item #3: [kategori]',
    },
    calculationResult: 'Total Pagu = Rp 3.318,50 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Pagu Belanja]
SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #12 (Treemap Komposisi Belanja)',
      rows: '[kategori]',
      columns: 'SUM([anggaran])',
      marks: 'Color: [jenis_anggaran]',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #3: Laporan Realisasi Anggaran BLU',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'TRIWULAN', 'TAHUN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Pertriwulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'DIPA 100% Sinkron OMSPAN',
      warning: 'Revisi Halaman III DIPA',
      critical: 'Pagu Terblokir (Automatic Rollback)',
      standardOrigin: 'DIPA APBN BP Batam 2026',
    },
    executiveAction: 'Pastikan kelengkapan dokumen pendukung lelang agar tidak ada alokasi pagu belanja modal yang terblokir.',
  },

  exp_real: {
    id: 'exp_real',
    unit: 'biro-keuangan',
    title: 'Realisasi Belanja Riil BLU BP Batam (Item 3)',
    codeTag: 'KEU-REAL-BELANJA',
    category: 'Belanja & Anggaran',
    currentValue: 'Rp 945,0 M',
    targetValue: 'Penyerapan Sehat Sesuai RPD',
    statusText: 'SP2D Terbit & Cair',
    statusVariant: 'success',
    summary: 'Akumulasi pencairan dana belanja negara melalui penerbitan SP2D yang telah disahkan bendahara perbendaharaan.',
    presentationPitch: 'Realisasi belanja mencapai Rp 945,0 Miliar hingga April, berjalan tertib sesuai rencana penarikan dana tanpa dispensasi SPM dari Kemenkeu.',
    formulaConceptual: 'SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    numerator: {
      label: 'Realisasi Belanja SP2D',
      realValue: 'Rp 945.020.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    },
    denominator: {
      label: 'Pagu Anggaran',
      realValue: 'Rp 3.318.500.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    },
    calculationResult: 'Total Realisasi = Rp 945,02 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Realisasi Belanja]
SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #6 (Bar Realisasi per Kategori)',
      rows: '[kategori]',
      columns: 'SUM([realisasi])',
      marks: 'Color: Blue Palette',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #3: Laporan Realisasi Anggaran BLU',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'TRIWULAN', 'TAHUN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Pertriwulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 25,0% di April',
      warning: '18,0% - 24,9%',
      critical: '< 18,0%',
      standardOrigin: 'Indikator Kinerja Pelaksanaan Anggaran (IKPA)',
    },
    executiveAction: 'Dorong penagihan termin uang muka pekerjaan konstruksi oleh PPK.',
  },

  exp_serapan: {
    id: 'exp_serapan',
    unit: 'biro-keuangan',
    title: 'Tingkat Serapan Belanja Pagu DIPA BLU',
    codeTag: 'KEU-PCT-SERAPAN',
    category: 'Belanja & Anggaran',
    currentValue: '28,5% (On Track)',
    targetValue: 'Target Q2: ≥ 35,0%',
    statusText: 'Serapan Anggaran Sesuai Kurva',
    statusVariant: 'success',
    summary: 'Persentase rasio serapan belanja terhadap total pagu anggaran DIPA.',
    presentationPitch: 'Tingkat serapan belanja 28,5% berada dalam kurva normal pelaksanaan anggaran kuartal kedua, didominasi belanja rutin dan uang muka proyek strategis.',
    formulaConceptual: '(SUM([keu_laporan_realisasi_anggaran_blu].[realisasi]) ÷ SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])) × 100%',
    numerator: {
      label: 'Realisasi Belanja',
      realValue: 'Rp 945.020.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    },
    denominator: {
      label: 'Pagu Anggaran',
      realValue: 'Rp 3.318.500.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    },
    calculationResult: '(945,02 ÷ 3.318,50) × 100% = 28,48% ≈ 28,5%',
    tableauCalculatedField: `// Calculated Field: [% Serapan Belanja]
SUM([keu_laporan_realisasi_anggaran_blu].[realisasi]) / SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #7 (Bullet Graph with Reference Line)',
      rows: '[kategori]',
      columns: '[% Serapan Belanja]',
      marks: 'Bullet with Reference Line at 35%',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #3: Laporan Realisasi Anggaran BLU',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'TRIWULAN', 'TAHUN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Pertriwulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 35,0% pada akhir Q2',
      warning: '25,0% - 34,9%',
      critical: '< 25,0%',
      standardOrigin: 'Standar Evaluasi IKPA Ditjen Perbendaharaan',
    },
    executiveAction: 'Akselerasi lelang proyek fisik dan penyelesaian administrasi SPM.',
  },

  exp_sisa: {
    id: 'exp_sisa',
    unit: 'biro-keuangan',
    title: 'Sisa Pagu Belanja DIPA BLU TA 2026',
    codeTag: 'KEU-SISA-PAGU',
    category: 'Belanja & Anggaran',
    currentValue: 'Rp 2.373,5 M',
    targetValue: 'Terserap Optimal 95% - 98%',
    statusText: 'Pagu Tersedia Cukup',
    statusVariant: 'info',
    summary: 'Sisa pagu anggaran belanja yang belum diterbitkan SP2D-nya dan siap dieksekusi pada kuartal II, III, dan IV.',
    presentationPitch: 'Sisa pagu belanja sebesar Rp 2,37 Triliun telah dialokasikan secara terjadwal untuk termin pembayaran kontrak konstruksi multi-years dan belanja barang layanan operasional.',
    formulaConceptual: 'SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) - SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    numerator: {
      label: 'Pagu Total',
      realValue: 'Rp 3.318.500.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    },
    denominator: {
      label: 'Realisasi SP2D',
      realValue: 'Rp 945.020.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    },
    calculationResult: '3.318,50 M - 945,02 M = Rp 2.373,48 Miliar',
    tableauCalculatedField: `// Calculated Field: [Sisa Pagu Belanja]
SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) - SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab Detail) & #13 (Stacked Bar)',
      rows: '[kategori]',
      columns: '[Sisa Pagu Belanja]',
      marks: 'Color: Slate/Gray Palette',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #3: Laporan Realisasi Anggaran BLU',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'TRIWULAN', 'TAHUN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Pertriwulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Sisa Pagu Terencana 100%',
      warning: 'Potensi Sisa Anggaran Lebih (SILPA) Berlebih',
      critical: 'Gagal Lelang Konstruksi',
      standardOrigin: 'Monitoring Pelaksanaan Anggaran BP Batam',
    },
    executiveAction: 'Rapatkan koordinasi dengan satker infrastruktur untuk memastikan jadwal penyerapan sesuai rencana.',
  },

  rincian_pnbp_total: {
    id: 'rincian_pnbp_total',
    unit: 'biro-keuangan',
    title: 'Rincian Target Penerimaan Negara Bukan Pajak (PNBP) (Item 7)',
    codeTag: 'KEU-ITEM-07',
    category: 'Pendapatan & PNBP',
    currentValue: 'Rp 2.447,5 M (Detail Tarif)',
    targetValue: 'Kepatuhan PP Tarif Layanan',
    statusText: 'Rincian Akun Lengkap',
    statusVariant: 'info',
    summary: 'Struktur rincian penerimaan PNBP berdasarkan satuan, volume layanan, besaran tarif PP, dan mata uang transaksi per kode akun.',
    presentationPitch: 'Rincian target PNBP memetakan seluruh pos layanan komersial BP Batam sesuai PP Tarif, memastikan setiap penerimaan memiliki dasar hukum dan formula perhitungan volume x tarif yang transparan.',
    formulaConceptual: 'SUM([keu_target_pnbp_rincian].[volume] * [keu_target_pnbp_rincian].[tarif])',
    numerator: {
      label: 'Volume Satuan Layanan',
      realValue: 'Volume m2 lahan, GT kapal, pax penumpang, m3 air',
      source: 'SIMKEU Item #7: [volume]',
    },
    denominator: {
      label: 'Tarif Resmi PP',
      realValue: 'Besaran tarif PP Tarif Layanan BP Batam',
      source: 'SIMKEU Item #7: [tarif]',
    },
    calculationResult: 'Total Rincian = Rp 2.447,46 Miliar',
    tableauCalculatedField: `// Calculated Field: [Target PNBP Rincian]
SUM([keu_target_pnbp_rincian].[volume] * [keu_target_pnbp_rincian].[tarif])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab Detail)',
      rows: '[kode], [pengguna], [mata_uang]',
      columns: 'SUM([volume]), AVG([tarif]), SUM([jumlah])',
      marks: 'Text Table with Grand Totals',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #7: Rincian Target Penerimaan Negara Bukan Pajak (PNBP)',
      tableName: 'keu_target_pnbp_rincian',
      attributes: ['KODE', 'PENGGUNA', 'MATA UANG', 'SATUAN', 'TARIF', 'VOLUME', 'JUMLAH', 'TAHUN'],
      updateFrequency: 'Pertahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '100% Sesuai PP Tarif Resmi',
      warning: 'Selisih Pembulatan Kurs Valas',
      critical: 'Tarif Tidak Memiliki Dasar PP',
      standardOrigin: 'Peraturan Pemerintah tentang Jenis dan Tarif PNBP BP Batam',
    },
    executiveAction: 'Sosialisasikan pembaruan tarif penyesuaian kepada asosiasi pengguna jasa pelabuhan dan bandara.',
  },

  realisasi_blu_total: {
    id: 'realisasi_blu_total',
    unit: 'biro-keuangan',
    title: 'Laporan Realisasi Anggaran (LRA) BLU & Kinerja Dua Sisi (Item 3 SIMKEU)',
    codeTag: 'LRA-BLU-03',
    category: 'Pertanggungjawaban BLU',
    currentValue: 'Surplus +Rp 305,2 M (Serapan Belanja 27,7% vs Capaian Pendapatan 40,1%)',
    targetValue: 'Keseimbangan Anggaran Kas BLU (Surplus Operasional Layanan)',
    statusText: 'Surplus Kas Operasional Layanan',
    statusVariant: 'success',
    summary: 'Format resmi akuntansi Badan Layanan Umum (BLU) sesuai standar PMK/Ditjen Perbendaharaan Kementerian Keuangan RI yang menyandingkan seluruh realisasi belanja operasional dan belanja modal terhadap realisasi pendapatan layanan BLU untuk mengukur kinerja keuangan konsolidasi.',
    presentationPitch: 'Bapak/Ibu Pimpinan, Laporan Realisasi Anggaran BLU (Item 3 SIMKEU) menunjukkan kinerja kas yang sangat prima. Hingga cut-off April, total realisasi belanja tercatat Rp 676,0 Miliar (27,7% dari pagu Rp 2.440,5 Miliar), sedangkan realisasi pendapatan layanan BLU mencapai Rp 981,2 Miliar (40,1% dari target Rp 2.447,5 Miliar). Hasilnya, BP Batam membukukan Surplus Operasional Kas sebesar +Rp 305,2 Miliar. Ini membuktikan operasional layanan publik dan komersial BP Batam mampu membiayai dirinya sendiri secara mandiri tanpa defisit.',
    formulaConceptual: 'Surplus / (Defisit) BLU = Total Realisasi Pendapatan Layanan BLU - Total Realisasi Belanja BLU (Pegawai + Barang + Modal)',
    numerator: {
      label: 'Realisasi Pendapatan Layanan BLU YTD',
      realValue: 'Rp 981.240.000.000 (Target: Rp 2.447,5 M - Capaian 40,1%)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi] WHERE [jenis_anggaran]=\'PENDAPATAN\')',
    },
    denominator: {
      label: 'Realisasi Belanja BLU YTD (Pegawai, Barang, Modal)',
      realValue: 'Rp 676.000.000.000 (Pagu: Rp 2.440,5 M - Serapan 27,7%)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi] WHERE [jenis_anggaran]=\'BELANJA\')',
    },
    calculationResult: 'Surplus Operasional = Rp 981.240.000.000 - Rp 676.000.000.000 = +Rp 305.240.000.000 (+Rp 305,2 Miliar)',
    tableauCalculatedField: `// Calculated Field: [Surplus Defisit Operasional BLU]
SUM(IF [jenis_anggaran] = 'PENDAPATAN' THEN [realisasi] ELSE 0 END) -
SUM(IF [jenis_anggaran] = 'BELANJA' THEN [realisasi] ELSE 0 END)`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab LRA BLU) & #23 (Bullet Graph Dua Sisi)',
      rows: '[jenis_anggaran], [kategori], [uraian]',
      columns: 'SUM([anggaran]), SUM([realisasi]), [% Serapan/Capaian]',
      marks: 'Color by Jenis Anggaran (Pendapatan: Hijau, Belanja: Biru Navy)',
      filters: "[tahun] = '2026', [periode] = 'Cut-off April'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #3: Laporan Realisasi Anggaran BLU (LRA)',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Bulanan (Rekonsiliasi SAKTI Kemenkeu)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Surplus Kas Operasional (Pendapatan > Belanja)',
      warning: 'Impas / Surplus tipis < 5% dari pendapatan',
      critical: 'Defisit Kas Operasional (Belanja > Pendapatan)',
      standardOrigin: 'Standar Akuntansi Pemerintah (SAP) & PMK Pengelolaan Keuangan BLU',
    },
    executiveAction: 'Pertahankan surplus operasional untuk memperkuat alokasi belanja modal infrastruktur strategis pada semester kedua tanpa mengorbankan likuiditas darurat.',
  },

  piutang_lancar: {
    id: 'piutang_lancar',
    unit: 'biro-keuangan',
    title: 'Rekapitulasi Piutang Lancar 0 - 30 Hari (Item 17)',
    codeTag: 'KEU-PIUTANG-LANCAR',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 168,2 M (53,8%)',
    targetValue: 'Porsi Lancar ≥ 60%',
    statusText: 'Kolektibilitas Sangat Baik',
    statusVariant: 'success',
    summary: 'Saldo tagihan faktur PNBP berumur 0 s.d. 30 hari kalender dengan tingkat kepatuhan pelunasan tertinggi.',
    presentationPitch: 'Sebanyak 53,8% (Rp 168,2 Miliar) piutang PNBP BP Batam berada dalam kelompok lancar di bawah 30 hari. Faktur ini dalam masa tenggang wajar korporasi dan memiliki kepastian bayar di atas 95%.',
    formulaConceptual: 'SUM(IIF([keu_rekap_umur_piutang].[umur_piutang] <= 30, [keu_rekap_umur_piutang].[jumlah_piutang_tertagih], 0))',
    numerator: {
      label: 'Saldo Piutang 0-30 Hari',
      realValue: 'Rp 168.200.000.000',
      source: 'SIMKEU Item #17: [jumlah_piutang_tertagih]',
    },
    denominator: {
      label: 'Total Piutang Berjalan',
      realValue: 'Rp 312.400.000.000',
      source: 'SIMKEU Item #17: SUM([jumlah_piutang_tertagih])',
    },
    calculationResult: '(168,2 M ÷ 312,4 M) × 100% = 53,8%',
    tableauCalculatedField: `// Calculated Field: [Piutang Lancar 0-30 Hari]
SUM(IIF([keu_rekap_umur_piutang].[umur_piutang] <= 30, [keu_rekap_umur_piutang].[jumlah_piutang_tertagih], 0))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab Aging)',
      rows: '[nama_pelanggan]',
      columns: '[umur_piutang], SUM([jumlah_piutang_tertagih])',
      marks: 'Color: Green for 0-30 Days',
      filters: "[umur_piutang] <= 30",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #17: Rekapitulasi Umur Piutang',
      tableName: 'keu_rekap_umur_piutang',
      attributes: ['NAMA PELANGGAN', 'JUMLAH PIUTANG TERTAGIH', 'UMUR PIUTANG'],
      updateFrequency: 'Pertahun / Bulanan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Porsi Lancar ≥ 60%',
      warning: '45% - 59%',
      critical: '< 45%',
      standardOrigin: 'PMK Pengelolaan Piutang Instansi Pemerintah dan BLU',
    },
    executiveAction: 'Kirim notifikasi otomatis reminder tagihan H-7 sebelum jatuh tempo faktur.',
  },

  otonomi_fiskal: {
    id: 'otonomi_fiskal',
    unit: 'biro-keuangan',
    title: 'Rasio Kemandirian Fiskal BLU BP Batam',
    codeTag: 'KEMANDIRIAN-FISKAL',
    category: 'Kemandirian & Otonomi Fiskal',
    currentValue: '0,86 (86,0%)',
    targetValue: 'Standar Kemenkeu: ≥ 0,80',
    statusText: 'Mandiri Fiskal (Tercapai)',
    statusVariant: 'success',
    summary: 'Rasio kemampuan realisasi pendapatan PNBP operasional berjalan dalam menutup seluruh beban belanja operasional rutin tanpa ketergantungan utang.',
    presentationPitch: 'Bapak/Ibu Pimpinan, rasio kemandirian fiskal BLU BP Batam saat ini mencapai 0,86 (86,0%), melampaui standar ambang batas Kementerian Keuangan yaitu 0,80. Artinya, 86% beban operasional rutin dibiayai mandiri oleh penerimaan PNBP, membuktikan ketahanan kas dan otonomi fiskal BLU yang sangat sehat.',
    formulaConceptual: 'Total Realisasi Kas Masuk PNBP Berjalan ÷ Total Belanja Operasional Rutin',
    numerator: {
      label: 'Pembilang (Realisasi PNBP Berjalan)',
      realValue: 'Rp 681.000.000.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    denominator: {
      label: 'Penyebut (Belanja Operasional Rutin)',
      realValue: 'Rp 791.800.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran].[belanja_operasional])',
    },
    calculationResult: 'Rp 681,0 M ÷ Rp 791,8 M = 0,8601 ≈ 0,86 (86,0%)',
    tableauCalculatedField: `// Calculated Field: [Rasio Kemandirian Fiskal]
SUM([keu_target_pnbp_rekap].[realisasi]) / SUM([keu_belanja_rekap].[realisasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #23 (Bullet Graph) & Donut Chart',
      rows: 'None',
      columns: 'AGG([Rasio Kemandirian Fiskal])',
      marks: 'Bar Mark + Reference Line (0.80)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #8 (Target & Realisasi PNBP) & Item #3 (Laporan Realisasi BLU)',
      tableName: 'keu_target_pnbp_rekap & keu_realisasi_blu',
      attributes: ['NAMA UNIT', 'JUMLAH TARGET', 'REALISASI', 'BELANJA OPERASIONAL'],
      updateFrequency: 'Harian (Cut-Off Settlement 23:59 WIB)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 0,80 (Otonomi Finansial Sangat Kuat)',
      warning: '0,60 - 0,79 (Moderat, butuh pengawasan saldo kas)',
      critical: '< 0,60 (Rentan defisit likuiditas operasional)',
      standardOrigin: 'Standar Kinerja Keuangan Satker BLU Kementerian Keuangan RI',
    },
    executiveAction: 'Pertahankan disiplin belanja operasional rutin dan optimalkan penerimaan dari unit usaha pelabuhan & pemanfaatan aset lahan untuk menjaga rasio di atas 0,85 hingga akhir tahun anggaran.',
  },

  sumber_pendanaan: {
    id: 'sumber_pendanaan',
    unit: 'biro-keuangan',
    title: 'Struktur Komposisi Sumber Pendanaan Kas Masuk BLU',
    codeTag: 'SUMBER-DANA',
    category: 'Treasury & Likuiditas',
    currentValue: 'Rp 1.062,2 M (Total)',
    targetValue: 'PNBP Dominan ≥ 60,0%',
    statusText: 'PNBP Utama (64,1%)',
    statusVariant: 'success',
    summary: 'Proporsi komposisi kas masuk per kategori sumber pendanaan: PNBP Layanan BLU (64,1%), APBN Rupiah Murni (21,1%), dan Hibah/BLU Lain/Bunga (14,8%).',
    presentationPitch: 'Bapak/Ibu Pimpinan, total penerimaan kas masuk eksekutif tercatat Rp 1.062,2 Miliar, dengan dominasi kuat dari PNBP Layanan BLU sebesar Rp 681,0 M (64,1%), didukung alokasi APBN Rp 224,0 M (21,1%) untuk belanja modal/proyek strategis, serta Rp 157,2 M (14,8%) dari hibah dan optimalisasi kas perbankan.',
    formulaConceptual: '(Kas Masuk per Kategori Sumber Dana ÷ Total Kas Masuk Seluruh Kategori) × 100%',
    numerator: {
      label: 'Pembilang (Kas Masuk PNBP BLU)',
      realValue: 'Rp 681.000.000.000 (64,1% dari Total Kas)',
      source: 'SIMKEU Item #14: SUM([keu_penerimaan_sumber_dana].[realisasi]) WHERE [sumber] = PNBP',
    },
    denominator: {
      label: 'Penyebut (Total Penerimaan Seluruh Sumber)',
      realValue: 'Rp 1.062.200.000.000 (Akumulasi Kas Masuk)',
      source: 'SIMKEU Item #14: SUM([keu_penerimaan_sumber_dana].[realisasi])',
    },
    calculationResult: '(681,0 M ÷ 1.062,2 M) × 100% = 64,11% ≈ 64,1%',
    tableauCalculatedField: `// Calculated Field: [% of Total Kas Masuk]
SUM([realisasi]) / TOTAL(SUM([realisasi])) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #13 (Stacked Bar 100%) & Donut Chart',
      rows: 'None',
      columns: '[sumber_dana], SUM([realisasi])',
      marks: 'Pie/Donut & Stacked Bar by [sumber_dana]',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #14: Penerimaan Sumber Dana BP Batam',
      tableName: 'keu_penerimaan_sumber_dana',
      attributes: ['SUMBER DANA', 'DESKRIPSI', 'PAGU ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Mingguan',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'PNBP ≥ 60,0% (Kemandirian Satker BLU)',
      warning: 'PNBP 45,0% - 59,9% (Ketergantungan APBN sedang)',
      critical: 'PNBP < 45,0% (Risiko ketergantungan APBN tinggi)',
      standardOrigin: 'Pedoman Penganggaran BLU Kemenkeu RI',
    },
    executiveAction: 'Akselerasi penyerapan dana proyek APBN Rupiah Murni agar progres fisik infrastruktur selaras dengan target serapan triwulanan.',
  },

  kpi_dc_pue: {
    id: 'kpi_dc_pue',
    unit: 'pdsi',
    title: 'Power Usage Effectiveness (PUE) Data Center Tier III',
    codeTag: 'DC-PUE',
    category: 'Efisiensi Infrastruktur Data Center',
    currentValue: '1,48 PUE',
    targetValue: 'Standar Tier III Green: ≤ 1,50',
    statusText: 'Efisien (Tier III Green Standard)',
    statusVariant: 'success',
    summary: 'Rasio total daya listrik fasilitas data center (termasuk pendingin PAC dan UPS) berbanding total daya listrik yang dikonsumsi langsung oleh perangkat server IT.',
    presentationPitch: 'Bapak/Ibu Pimpinan, nilai efisiensi energi listrik (PUE) Data Center BP Batam berada di 1,48, lebih baik dari batas standar Tier III Green (1,50). Hal ini dicapai berkat optimalisasi sistem pendingin Precision Air Conditioning (PAC) inverter dan manajemen lorong dingin (cold aisle containment).',
    formulaConceptual: 'Total Konsumsi Daya Listrik Fasilitas DC (kW) ÷ Total Konsumsi Daya Perangkat IT Server (kW)',
    numerator: {
      label: 'Pembilang (Total Daya Listrik Fasilitas DC)',
      realValue: '185,0 kW (PLN + UPS + PAC Chiller)',
      source: 'Sensor BMS Data Center Tier III BP Batam',
    },
    denominator: {
      label: 'Penyebut (Total Daya Perangkat IT)',
      realValue: '125,0 kW (Server, Storage SAN, Core Switch)',
      source: 'Meteran PDU Rak Server Data Center',
    },
    calculationResult: '185,0 kW ÷ 125,0 kW = 1,48 PUE (Kategori Sangat Efisien)',
    tableauCalculatedField: `// Calculated Field: [PUE Data Center]
SUM([daya_total_fasilitas_kw]) / SUM([daya_perangkat_it_kw])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #4 (Continuous Line / Area Chart)',
      rows: 'AVG([PUE Data Center])',
      columns: '[timestamp_jam]',
      marks: 'Line Chart dengan Target Reference Line: 1.50',
      filters: "[ruang_dc] = 'Data Center Utama Gedung PDSI'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #2: Monitoring Daya & Lingkungan Data Center',
      tableName: 'pdsi_dc_environmental_telemetry',
      attributes: ['SENSOR ID', 'RACK ID', 'POWER KW', 'PUE VALUE', 'TEMPERATURE C', 'HUMIDITY'],
      updateFrequency: 'Real-Time (Setiap 5 Menit via IoT BMS)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'PUE ≤ 1,50 (Efisiensi Sangat Baik Tier III)',
      warning: 'PUE 1,51 - 1,80 (Perlu rekonfigurasi AC chiller)',
      critical: 'PUE > 1,80 (Pemborosan energi listrik signifikan)',
      standardOrigin: 'The Uptime Institute Tier III Standard & Green Grid Consortia',
    },
    executiveAction: 'Pertahankan suhu lorong dingin di 22°C - 24°C untuk menjaga kestabilan PUE di bawah 1,50.',
  },

  kpi_helpdesk_sla: {
    id: 'kpi_helpdesk_sla',
    unit: 'pdsi',
    title: 'Kepatuhan SLA Penyelesaian Tiket Layanan IT Helpdesk',
    codeTag: 'SLA-HELPDESK',
    category: 'Dukungan Pengguna & Service Desk',
    currentValue: '97,0% (1.210 Tiket)',
    targetValue: 'Target SLA Perjanjian: ≥ 95,0%',
    statusText: 'Memenuhi Standar Layanan',
    statusVariant: 'success',
    summary: 'Persentase tiket insiden, gangguan jaringan, email dinas, dan perbaikan perangkat yang diselesaikan tim helpdesk sesuai batas waktu (SLA 4 Jam).',
    presentationPitch: 'Bapak/Ibu Pimpinan, kinerja layanan IT Helpdesk PDSI mencatat kepatuhan SLA sebesar 97,0% dari 1.248 tiket layanan yang masuk bulan ini. Rata-rata waktu tanggap pertama (First Response) tercatat 18 menit, dan waktu resolusi rata-rata 2,4 jam.',
    formulaConceptual: '(Jumlah Tiket Diselesaikan Sesuai SLA Waktu ÷ Total Tiket Layanan Masuk) × 100%',
    numerator: {
      label: 'Pembilang (Tiket Selesai On-SLA)',
      realValue: '1.210 Tiket Berhasil Diselesaikan',
      source: 'PDSI Item #3: SUM([pdsi_tiket_helpdesk].[tiket_sla_terpenuhi])',
    },
    denominator: {
      label: 'Penyebut (Total Tiket Permintaan Masuk)',
      realValue: '1.248 Tiket Total Masuk',
      source: 'PDSI Item #3: COUNT([pdsi_tiket_helpdesk].[id_tiket])',
    },
    calculationResult: '(1.210 ÷ 1.248) × 100% = 96,95% ≈ 97,0%',
    tableauCalculatedField: `// Calculated Field: [% Kepatuhan SLA Helpdesk]
SUM([tiket_sla_terpenuhi]) / COUNT([id_tiket]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #6 (Horizontal Bar per Kategori)',
      rows: '[kategori_masalah]',
      columns: '[% Kepatuhan SLA Helpdesk]',
      marks: 'Color by Status SLA',
      filters: "[bulan] = 'April', [tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #3: Log Tiket IT Helpdesk & Service Desk',
      tableName: 'pdsi_tiket_helpdesk',
      attributes: ['ID TIKET', 'PEMOHON', 'UNIT KERJA', 'KATEGORI', 'WAKTU MASUK', 'WAKTU SELESAI', 'STATUS SLA'],
      updateFrequency: 'Real-Time (Event Driven Ticket Closure)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: '≥ 95,0% (Kualitas Layanan Prima)',
      warning: '90,0% - 94,9% (Eskalasi tiket menumpuk di jam sibuk)',
      critical: '< 90,0% (Kekurangan personel teknisi lapangan)',
      standardOrigin: 'Standar Operasional Prosedur (SOP) Layanan TIK PDSI BP Batam',
    },
    executiveAction: 'Optimalkan sistem self-service reset password dan panduan mandiri untuk menurunkan 20% beban tiket berulang.',
  },

  piutang_macet: {
    id: 'piutang_macet',
    unit: 'biro-keuangan',
    title: 'Rekapitulasi Piutang Tak Tertagih PUPN / KPKNL (Item 20)',
    codeTag: 'KEU-PIUTANG-MACET',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 43,6 M (14,0%)',
    targetValue: 'Rasio Macet ≤ 10,0%',
    statusText: 'Pelimpahan Panitia Piutang Negara',
    statusVariant: 'warning',
    summary: 'Saldo piutang macet > 90 hari yang telah melewati masa teguran SP-1, SP-2, SP-3 dan dilimpahkan pengurusannya ke Panitia Urusan Piutang Negara (PUPN) / KPKNL Batam.',
    presentationPitch: 'Piutang macet yang berumur di atas 90 hari tercatat sebesar Rp 43,6 Miliar dari 42 debitur. Seluruh berkas telah dilimpahkan ke PUPN/KPKNL untuk tindakan penagihan paksa, pemblokiran aset, dan lelang jaminan sesuai ketentuan perundang-undangan.',
    formulaConceptual: 'SUM([keu_piutang_tak_tertagih].[saldo_piutang_tak_tertagih])',
    numerator: {
      label: 'Saldo Piutang Tak Tertagih',
      realValue: 'Rp 43.600.000.000',
      source: 'SIMKEU Item #20: SUM([keu_piutang_tak_tertagih].[saldo_piutang_tak_tertagih])',
    },
    denominator: {
      label: 'Total Piutang PNBP',
      realValue: 'Rp 312.400.000.000',
      source: 'SIMKEU Item #17: SUM([jumlah_piutang_tertagih])',
    },
    calculationResult: 'Rasio Piutang Macet = 13,95% ≈ 14,0% dari Total Piutang',
    tableauCalculatedField: `// Calculated Field: [Saldo Piutang Macet KPKNL]
SUM([keu_piutang_tak_tertagih].[saldo_piutang_tak_tertagih])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab Debitur)',
      rows: '[nama_pelanggan], [nomor_faktur]',
      columns: '[tanggal_jatuh_tempo], SUM([saldo_piutang_tak_tertagih])',
      marks: 'Color: Red for PUPN Stage',
      filters: "[saldo_piutang_tak_tertagih] > 0",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #20: Rekapitulasi Piutang Tak Tertagih',
      tableName: 'keu_piutang_tak_tertagih',
      attributes: ['NOMOR FAKTUR', 'TANGGAL TERBIT FAKTUR', 'NAMA PELANGGAN', 'TANGGAL JATUH TEMPO', 'JUMLAH PIUTANG KOREKSI KPKNL', 'PERHITUNGAN DENDA', 'BAYAR FAKTUR', 'SALDO PIUTANG TAK TERTAGIH'],
      updateFrequency: 'Pertahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Rasio Macet ≤ 10,0%',
      warning: '10,1% - 15,0%',
      critical: '> 15,0%',
      standardOrigin: 'Pedoman PUPN & PMK No. 163/PMK.06/2020 tentang Pengelolaan Piutang Negara',
    },
    executiveAction: 'Koordinasi aktif dengan juru sita KPKNL Batam untuk percepatan penelusuran aset dan pemblokiran sertifikat lahan debitur.',
  },

  cash_inflow_total: {
    id: 'cash_inflow_total',
    unit: 'biro-keuangan',
    title: 'Total Kas Masuk Riil (Arus Kas Masuk - Item 9 SIMKEU)',
    codeTag: 'CASH-INFLOW',
    category: 'Arus Kas & Likuiditas',
    currentValue: 'Rp 981,24 M (Akumulasi YTD)',
    targetValue: 'Proyeksi Rencana Arus Kas (RAK): Rp 950,00 M',
    statusText: 'Kas Masuk Melampaui Proyeksi RAK (+3,3%)',
    statusVariant: 'success',
    summary: 'Akumulasi seluruh penerimaan kas riil yang telah tervalidasi dan masuk ke rekening giro bank operasional BLU BP Batam dari seluruh kanal pembayaran resmi (UWT Lahan, Pelabuhan, Bandara, SPAM, RSBP).',
    presentationPitch: 'Total kas masuk riil hingga bulan April membukukan Rp 981,24 Miliar, melampaui proyeksi Rencana Arus Kas (RAK) sebesar Rp 950,0 Miliar (+3,3%). Arus kas masuk didominasi oleh setoran UWT lahan investasi, tarif kepelabuhanan internasional, serta penerimaan pas bandara dan layanan air minum yang likuid.',
    formulaConceptual: 'SUM([keu_arus_kas].[arus_kas_masuk]) dari Januari hingga Bulan Berjalan',
    numerator: {
      label: 'Penerimaan Kas Operasional & Jasa',
      realValue: 'Rp 981.240.000.000 (Kas Riil Bank)',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_masuk])',
    },
    denominator: {
      label: 'Periode Akumulasi',
      realValue: '4 Bulan (Januari - April 2026)',
      source: 'Rekening Koran Konsolidasi Bank Mandiri, BNI, BRI, Bank Riau Kepri',
    },
    calculationResult: 'Total Kas Masuk = Rp 210,5 M (Jan) + Rp 245,2 M (Feb) + Rp 262,4 M (Mar) + Rp 263,1 M (Apr) = Rp 981,24 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Kas Masuk YTD]
RUNNING_SUM(SUM([keu_arus_kas].[arus_kas_masuk]))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #3 (Line Chart Tren Arus Kas)',
      rows: 'Measure Values ([arus_kas_masuk])',
      columns: '[bulan]',
      marks: 'Line Chart dengan Area Shading Hijau Toska',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #9: Informasi Tren Arus Kas',
      tableName: 'keu_arus_kas',
      attributes: ['BULAN', 'ARUS KAS MASUK', 'ARUS KAS KELUAR', 'NET ARUS KAS', 'SALDO AKHIR'],
      updateFrequency: 'Harian (EOD Bank Settlement & CMS)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 100% dari Rencana Penarikan/Penerimaan Kas (RAK)',
      warning: '85% - 99% dari target RAK bulanan',
      critical: '< 85% (Risiko terganggunya jadwal pembayaran kontrak)',
      standardOrigin: 'Rencana Bisnis dan Anggaran (RBA) BLU BP Batam',
    },
    executiveAction: 'Percepat integrasi payment gateway digital QRIS dan virtual account host-to-host untuk mempersingkat collection period piutang.',
  },

  cash_outflow_total: {
    id: 'cash_outflow_total',
    unit: 'biro-keuangan',
    title: 'Total Kas Keluar Riil (Pengeluaran Kas SP2D - Item 9 SIMKEU)',
    codeTag: 'CASH-OUTFLOW',
    category: 'Arus Kas & Likuiditas',
    currentValue: 'Rp 735,40 M (Akumulasi YTD)',
    targetValue: 'Batas Pagu Kas Belanja (RAK): Rp 820,00 M',
    statusText: 'Pengeluaran Terkendali dan Efisien (-10,3% vs Pagu)',
    statusVariant: 'info',
    summary: 'Total dana kas yang keluar dari rekening kas BLU untuk membayar SP2D belanja pegawai, operasional kantor, belanja pemeliharaan sarana, serta pembayaran termin proyek modal strategis.',
    presentationPitch: 'Arus kas keluar riil hingga bulan April tercatat sebesar Rp 735,40 Miliar, berada di bawah batas pagu kas belanja yang dialokasikan (Rp 820 Miliar). Efisiensi ini terjadi berkat verifikasi berlapis pada pengajuan SP2D dan penjadwalan termin pembayaran proyek yang tertib.',
    formulaConceptual: 'SUM([keu_arus_kas].[arus_kas_keluar]) dari Januari hingga Bulan Berjalan',
    numerator: {
      label: 'Pengeluaran Kas Operasional & Modal',
      realValue: 'Rp 735.400.000.000 (SP2D Terbayar)',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_keluar])',
    },
    denominator: {
      label: 'Periode Akumulasi',
      realValue: '4 Bulan (Januari - April 2026)',
      source: 'Modul Pembayaran SAKTI & CMS Perbankan',
    },
    calculationResult: 'Total Kas Keluar = Rp 165,2 M (Jan) + Rp 182,1 M (Feb) + Rp 193,6 M (Mar) + Rp 194,5 M (Apr) = Rp 735,40 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Kas Keluar YTD]
RUNNING_SUM(SUM([keu_arus_kas].[arus_kas_keluar]))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #3 (Line Chart Tren Arus Kas)',
      rows: 'Measure Values ([arus_kas_keluar])',
      columns: '[bulan]',
      marks: 'Line Chart dengan Garis Merah/Orange',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #9: Informasi Tren Arus Kas',
      tableName: 'keu_arus_kas',
      attributes: ['BULAN', 'ARUS KAS MASUK', 'ARUS KAS KELUAR', 'NET ARUS KAS', 'SALDO AKHIR'],
      updateFrequency: 'Harian (Buku Kas Umum Bendahara Pengeluaran)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≤ 100% dari alokasi kas bulanan',
      warning: '101% - 110% (Pencairan akseleratif perlu dipantau)',
      critical: '> 110% (Risiko defisit kas bulanan)',
      standardOrigin: 'Peraturan Pengelolaan Kas BLU Kemenkeu',
    },
    executiveAction: 'Pertahankan jadwal verifikasi SPM berkala agar tidak terjadi lonjakan tagihan tak terencana di akhir bulan.',
  },

  net_surplus: {
    id: 'net_surplus',
    unit: 'biro-keuangan',
    title: 'Net Surplus Arus Kas (Net Operating Cash Flow - Item 9 SIMKEU)',
    codeTag: 'NET-CASH-SURPLUS',
    category: 'Arus Kas & Likuiditas',
    currentValue: '+Rp 245,84 M (Surplus Bersih YTD)',
    targetValue: 'Target Solvabilitas: Kas Masuk > Kas Keluar (> Rp 0)',
    statusText: 'Likuiditas Mandiri & Sangat Sehat',
    statusVariant: 'success',
    summary: 'Selisih bersih antara total penerimaan kas masuk riil dengan total pengeluaran kas keluar riil selama periode berjalan, mencerminkan likuiditas organik yang dihasilkan organisasi.',
    presentationPitch: 'Net surplus arus kas akumulasi YTD berada pada posisi surplus bersih sebesar +Rp 245,84 Miliar. Ini membuktikan arus kas masuk melampaui seluruh kebutuhan kas keluar belanja operasional dan modal. Surplus kas ini dialokasikan pada instrumen deposito on-call bank BUMN untuk memaksimalkan pendapatan bunga BLU secara aman.',
    formulaConceptual: 'Total Kas Masuk YTD - Total Kas Keluar YTD',
    numerator: {
      label: 'Total Kas Masuk YTD',
      realValue: 'Rp 981.240.000.000',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_masuk])',
    },
    denominator: {
      label: 'Total Kas Keluar YTD',
      realValue: 'Rp 735.400.000.000',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_keluar])',
    },
    calculationResult: 'Rp 981.240.000.000 - Rp 735.400.000.000 = +Rp 245.840.000.000 (+Rp 245,84 Miliar)',
    tableauCalculatedField: `// Calculated Field: [Net Surplus Kas YTD]
SUM([keu_arus_kas].[arus_kas_masuk]) - SUM([keu_arus_kas].[arus_kas_keluar])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #6 (Bar Chart Net Surplus)',
      rows: '[Net Surplus Kas YTD]',
      columns: '[bulan]',
      marks: 'Color: Hijau jika > 0, Merah jika < 0',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #9: Informasi Tren Arus Kas',
      tableName: 'keu_arus_kas',
      attributes: ['BULAN', 'ARUS KAS MASUK', 'ARUS KAS KELUAR', 'NET ARUS KAS', 'SALDO AKHIR'],
      updateFrequency: 'Bulanan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '> Rp 0 (Surplus Kas Operasional Mandiri)',
      warning: 'Rp 0 s.d. Rp 20 Miliar (Bantalan kas menipis)',
      critical: '< Rp 0 (Defisit Kas Operasional)',
      standardOrigin: 'Pedoman Manajemen Likuiditas BLU Kemenkeu',
    },
    executiveAction: 'Optimalisasi penempatan kelebihan kas (idle cash) pada deposito jangka pendek suku bunga bersaing sesuai persetujuan Menteri Keuangan.',
  },

  avg_monthly_cash_inflow: {
    id: 'avg_monthly_cash_inflow',
    unit: 'biro-keuangan',
    title: 'Rata-rata Penerimaan Kas Bulanan (Monthly Cash Inflow Run-Rate)',
    codeTag: 'AVG-CASH-INFLOW',
    category: 'Arus Kas & Likuiditas',
    currentValue: 'Rp 245,31 M / Bulan',
    targetValue: 'Target Rata-rata Bulanan: Rp 203,95 M / Bulan',
    statusText: 'Melampaui Target Rata-rata Bulanan (+20,3%)',
    statusVariant: 'success',
    summary: 'Rata-rata laju penerimaan kas bersih per bulan yang dihitung dari total kas masuk dibagi jumlah bulan berjalan. Metrik ini mengukur kapasitas pengumpulan kas rutin BP Batam.',
    presentationPitch: 'Rata-rata penerimaan kas bulanan BP Batam mencapai Rp 245,31 Miliar per bulan, jauh di atas ambang target rata-rata bulanan yang dibutuhkan (Rp 203,95 M/bulan). Tingkat keteraturan arus kas masuk ini menjamin stabilitas likuiditas harian dan kepastian ketersediaan dana kas untuk belanja operasional.',
    formulaConceptual: 'Total Kas Masuk Akumulasi YTD ÷ Jumlah Bulan Berjalan (n Bulan)',
    numerator: {
      label: 'Total Kas Masuk YTD',
      realValue: 'Rp 981.240.000.000',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_masuk])',
    },
    denominator: {
      label: 'Jumlah Bulan Periode Berjalan',
      realValue: '4 Bulan (Januari - April)',
      source: 'COUNTD([keu_arus_kas].[bulan])',
    },
    calculationResult: 'Rp 981.240.000.000 ÷ 4 Bulan = Rp 245.310.000.000 / Bulan (Rp 245,31 M)',
    tableauCalculatedField: `// Calculated Field: [Rata-rata Kas Masuk Bulanan]
SUM([keu_arus_kas].[arus_kas_masuk]) / COUNTD([keu_arus_kas].[bulan])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #3 (Line Chart dengan Garis Referensi Rata-rata)',
      rows: '[Rata-rata Kas Masuk Bulanan]',
      columns: '[bulan]',
      marks: 'Reference Line Average Inflow (Rp 245,31 M)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #9: Informasi Tren Arus Kas',
      tableName: 'keu_arus_kas',
      attributes: ['BULAN', 'ARUS KAS MASUK', 'ARUS KAS KELUAR', 'NET ARUS KAS', 'SALDO AKHIR'],
      updateFrequency: 'Bulanan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ Rp 203,95 M/Bulan (1/12 Target Perkin Rp 2,45 T)',
      warning: 'Rp 175 M - Rp 203 M/Bulan',
      critical: '< Rp 175 M/Bulan (Kinerja kas melambat)',
      standardOrigin: 'Rencana Bisnis dan Anggaran (RBA) BLU BP Batam',
    },
    executiveAction: 'Pertahankan stabilitas penerimaan dari sektor kepelabuhanan dan air minum yang bersifat recurring (berulang setiap bulan).',
  },

  liquidity_runway: {
    id: 'liquidity_runway',
    unit: 'biro-keuangan',
    title: 'Standar Ketahanan Likuiditas Kas Operasional (Liquidity Runway 5,2 Bulan)',
    codeTag: 'LIQUIDITY-RUNWAY',
    category: 'Arus Kas & Likuiditas',
    currentValue: '5,2 Bulan Operasional Rutin',
    targetValue: 'Ambang Batas Aman Kemenkeu: ≥ 3,0 Bulan',
    statusText: 'Sangat Aman & Berdaya Tahan Tinggi',
    statusVariant: 'success',
    summary: 'Indikator ketahanan keuangan yang mengukur berapa lama kas riil yang tersimpan di bank sanggup terus membiayai seluruh kebutuhan operasional rutin BP Batam jika sewaktu-waktu terjadi kondisi krisis darurat dan penerimaan kas baru terhenti total.',
    presentationPitch: 'Bapak/Ibu Pimpinan, posisi kas BP Batam saat ini memiliki daya tahan 5,2 bulan operasional rutin, melampaui batas aman Kementerian Keuangan (≥ 3,0 bulan). Penjelasan bagi orang awam: jika besok pagi terjadi keadaan darurat luar biasa dan seluruh penerimaan kas terhenti total, saldo kas riil di bank sebesar Rp 956,4 Miliar sanggup menjamin pembayaran gaji pegawai, listrik, air, pemeliharaan pelabuhan, bandara, dan operasional rumah sakit selama 5 bulan 6 hari ke depan tanpa perlu meminjam uang sepeserpun.',
    formulaConceptual: 'Total Saldo Kas Riil di Bank (Giro & Deposito) ÷ Rata-rata Kas Keluar Belanja Rutin Bulanan',
    numerator: {
      label: 'Total Saldo Kas Riil di Bank',
      realValue: 'Rp 956.400.000.000 (Saldo Giro Operasional & Deposito Kas BLU)',
      source: 'SIMKEU Item #7: SUM([keu_saldo_bank_realtime].[saldo_akhir])',
    },
    denominator: {
      label: 'Rata-rata Kas Keluar Rutin per Bulan',
      realValue: 'Rp 183.850.000.000 / Bulan (Rata-rata Belanja Rutin Bulanan)',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_keluar]) ÷ 4 Bulan',
    },
    calculationResult: 'Rp 956.400.000.000 ÷ Rp 183.850.000.000 = 5,20 Bulan Operasional Rutin',
    tableauCalculatedField: `// Calculated Field: [Ketahanan Likuiditas Kas (Bulan)]
SUM([keu_saldo_bank_realtime].[saldo_akhir]) / (SUM([keu_arus_kas].[arus_kas_keluar]) / COUNTD([keu_arus_kas].[bulan]))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Tile Ketahanan Likuiditas) & #7 (Gauge Chart)',
      rows: 'Kategori Bank Operasional',
      columns: '[Ketahanan Likuiditas Kas (Bulan)]',
      marks: 'Reference Line pada 3,0 Bulan (Batas Minimal Standar Kemenkeu)',
      filters: "[status_rekening] = 'Aktif Operasional'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #7 (Saldo Bank) & Item #9 (Tren Arus Kas)',
      tableName: 'keu_saldo_bank_realtime & keu_arus_kas',
      attributes: ['NAMA BANK', 'JENIS REKENING', 'SALDO AKHIR', 'ARUS KAS KELUAR BULANAN'],
      updateFrequency: 'Harian (Integrasi CMS API Bank & EOD)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 3,0 Bulan (Sangat Aman / Green Zone Kemenkeu)',
      warning: '2,0 - 2,9 Bulan (Zona Waspada / Perlu percepatan penagihan)',
      critical: '< 2,0 Bulan (Zona Kritis / Risiko gagal bayar gaji/operasional)',
      standardOrigin: 'Pedoman Pengelolaan Kas dan Investasi Jangka Pendek BLU PMK Kemenkeu',
    },
    executiveAction: 'Pertahankan cadangan likuiditas 5,2 bulan ini dan alokasikan kelebihan kas di atas batas 3 bulan ke instrumen deposito bergulir (on-call) untuk meningkatkan yield PNBP jasa giro secara legal dan aman.',
  },
};

/**
 * Intelligent KPI resolver with comprehensive alias mapping for both Biro Keuangan and PDSI.
 * Guarantees that any clicked table/BAN opens the exact intended formula without wrong cross-unit fallbacks.
 */
export function resolveKpiFormulaDetail(kpiId: string | null): KpiFormulaDetail {
  if (!kpiId) return KPI_FORMULA_DETAILS.pendapatan;

  // 1. Direct match
  if (KPI_FORMULA_DETAILS[kpiId]) {
    return KPI_FORMULA_DETAILS[kpiId];
  }

  // 2. Explicit Alias Dictionary for both Biro Keuangan & PDSI
  const aliasMap: Record<string, string> = {
    // Keuangan Pendapatan & Belanja & Realisasi BLU
    rev_capaian: 'pendapatan',
    target_pnbp: 'pendapatan',
    pnbp: 'pendapatan',
    penerimaan_pnbp: 'pendapatan',
    exp_serapan: 'belanja',
    pagu_belanja: 'belanja',
    serapan_belanja: 'belanja',
    realisasi_blu: 'realisasi_blu_total',
    lra_blu: 'realisasi_blu_total',
    lra: 'realisasi_blu_total',
    laporan_realisasi_blu: 'realisasi_blu_total',

    // Keuangan Arus Kas & Likuiditas
    cash_flow: 'arus_kas',
    tren_arus_kas: 'arus_kas',
    cash_inflow: 'cash_inflow_total',
    cash_inflow_total: 'cash_inflow_total',
    total_kas_masuk: 'cash_inflow_total',
    kas_masuk: 'cash_inflow_total',
    cash_outflow: 'cash_outflow_total',
    cash_outflow_total: 'cash_outflow_total',
    total_kas_keluar: 'cash_outflow_total',
    kas_keluar: 'cash_outflow_total',
    net_surplus: 'net_surplus',
    net_cash_flow: 'net_surplus',
    net_kas: 'net_surplus',
    cash_avg_monthly: 'avg_monthly_cash_inflow',
    avg_monthly_cash_inflow: 'avg_monthly_cash_inflow',
    rata_rata_kas_masuk: 'avg_monthly_cash_inflow',
    rata_rata_penerimaan_kas: 'avg_monthly_cash_inflow',
    liquidity_runway: 'liquidity_runway',
    ketahanan_likuiditas: 'liquidity_runway',
    standar_likuiditas: 'liquidity_runway',
    saldo_kas: 'saldo_bank_realtime',
    kas_bank: 'saldo_bank_realtime',
    saldo_bank: 'saldo_bank_realtime',
    likuiditas: 'saldo_bank_realtime',
    kemandirian_fiskal: 'otonomi_fiskal',
    rasio_kemandirian: 'otonomi_fiskal',
    komposisi_pendanaan: 'sumber_pendanaan',
    struktur_pendanaan: 'sumber_pendanaan',
    aging_piutang: 'piutang',
    mutasi_piutang: 'piutang',
    rincian_pnbp_total: 'pendapatan',

    // PDSI Data Center & Keamanan Siber
    kpi_dc_rack: 'rak_terisi',
    dc_rack: 'rak_terisi',
    kapasitas_rak: 'total_rak',
    okupansi_rak: 'rak_terisi',
    kpi_dc_pue: 'kpi_dc_pue',
    dc_pue: 'kpi_dc_pue',
    pue: 'kpi_dc_pue',
    kpi_cyber_incident: 'total_serangan',
    kpi_cyber: 'total_serangan',
    cyber_threats: 'total_serangan',
    csirt: 'total_serangan',
    keamanan_siber: 'total_serangan',

    // PDSI Helpdesk & Jaringan & SPBE
    kpi_helpdesk_sla: 'kpi_helpdesk_sla',
    kpi_helpdesk: 'kpi_helpdesk_sla',
    helpdesk_sla: 'kpi_helpdesk_sla',
    tiket_helpdesk: 'kpi_helpdesk_sla',
    kpi_fo_availability: 'kapasitas_core_fo',
    kpi_fo: 'panjang_jalur_fo',
    panjang_fiber: 'jaringan_fiber',
    jaringan_fiber: 'jaringan_fiber',
    fo_availability: 'panjang_jalur_fo',
    backbone_fiber: 'panjang_jalur_fo',
    panjang_jalur_fo: 'panjang_jalur_fo',
    kapasitas_core_fo: 'kapasitas_core_fo',
    core_fo: 'kapasitas_core_fo',
    fo_core: 'kapasitas_core_fo',
    kpi_spbe: 'indeks_spbe',
    spbe: 'indeks_spbe',
    domain_spbe: 'indeks_spbe',
    kpi_tte: 'jumlah_aplikasi',
    kpi_apps_tte: 'jumlah_aplikasi',
    tte_bsre: 'jumlah_aplikasi',
    tte_readiness: 'jumlah_aplikasi',
    kpi_csat_dc: 'kepuasan_dc',
    csat_dc: 'kepuasan_dc',
    server_drc: 'jumlah_server',
  };

  const mappedKey = aliasMap[kpiId];
  if (mappedKey && KPI_FORMULA_DETAILS[mappedKey]) {
    return KPI_FORMULA_DETAILS[mappedKey];
  }

  // 3. Prefix & Domain-based Fallback (Ensures PDSI never falls back to Keuangan PNBP)
  const lowerId = kpiId.toLowerCase();
  if (
    lowerId.startsWith('kpi_dc') ||
    lowerId.startsWith('kpi_cyber') ||
    lowerId.startsWith('kpi_helpdesk') ||
    lowerId.startsWith('kpi_fo') ||
    lowerId.startsWith('kpi_tte') ||
    lowerId.startsWith('pdsi') ||
    lowerId.includes('spbe') ||
    lowerId.includes('rack') ||
    lowerId.includes('server')
  ) {
    return KPI_FORMULA_DETAILS.rak_terisi;
  }

  return KPI_FORMULA_DETAILS.pendapatan;
}

interface KpiFormulaExplanationModalProps {
  kpiId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAnotherKpi?: (id: string) => void;
}

export const KpiFormulaExplanationModal: React.FC<KpiFormulaExplanationModalProps> = ({
  kpiId,
  isOpen,
  onClose,
  onSelectAnotherKpi,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'formula' | 'presentation' | 'tableau' | 'data_source'>('formula');

  if (!isOpen || !kpiId) return null;

  const detail = resolveKpiFormulaDetail(kpiId);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Group all available KPIs for quick switcher at the top
  const availableKpis = Object.values(KPI_FORMULA_DETAILS);
  const biroKeuanganKpis = availableKpis.filter((k) => k.unit === 'biro-keuangan');
  const pdsiKpis = availableKpis.filter((k) => k.unit === 'pdsi');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-sans select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white shadow-2xl rounded-2xl border border-slate-200/90 max-w-4xl w-full max-h-[92vh] flex flex-col z-10 overflow-hidden text-slate-800">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-[#0A192F] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300 font-mono">
                  {detail.codeTag}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                  {detail.unit === 'biro-keuangan' ? 'Biro Keuangan' : 'Pusat Data & Sistem Informasi (PDSI)'}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
                  {detail.statusText}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white mt-0.5 line-clamp-1">
                {detail.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick KPI Navigation Switcher (Tabs for presentation) */}
        <div className="px-5 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 text-xs overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mr-1">
              Ganti KPI:
            </span>
            <div className="flex items-center gap-1">
              {(detail.unit === 'biro-keuangan' ? biroKeuanganKpis : pdsiKpis).map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectAnotherKpi && onSelectAnotherKpi(item.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                    item.id === detail.id
                      ? 'bg-[#1F4E79] text-white shadow-2xs font-bold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.codeTag}
                </button>
              ))}
            </div>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-1 text-[11px]">
            <button
              onClick={() => onSelectAnotherKpi && onSelectAnotherKpi('pendapatan')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                detail.unit === 'biro-keuangan' ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Biro Keuangan ({biroKeuanganKpis.length})
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onSelectAnotherKpi && onSelectAnotherKpi('rak_terisi')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                detail.unit === 'pdsi' ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              PDSI ({pdsiKpis.length})
            </button>
          </div>
        </div>

        {/* Big Numbers Overview Strip (Like e-commerce / CRMS card stats) */}
        <div className="p-4 bg-white border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Nilai Riil Saat Ini
            </span>
            <div className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-0.5">
              {detail.currentValue}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Cut-Off Data YTD</span>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Target / Tolok Ukur
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 font-mono mt-0.5">
              {detail.targetValue}
            </div>
            <span className="text-[10px] text-slate-500">Perkin TA 2026</span>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Klasifikasi Data
            </span>
            <div className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${
                detail.databaseSource.dataClassification === 'TERTUTUP'
                  ? 'bg-rose-500'
                  : detail.databaseSource.dataClassification === 'TERBATAS'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`} />
              <span>{detail.databaseSource.dataClassification}</span>
            </div>
            <span className="text-[10px] text-slate-500">SIMKEU / SAKTI</span>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Frekuensi Sinkronisasi
            </span>
            <div className="text-xs font-bold text-slate-800 mt-1">
              {detail.databaseSource.updateFrequency}
            </div>
            <span className="text-[10px] text-blue-700 font-medium">Auto Extract</span>
          </div>
        </div>

        {/* Section Tabs inside Modal */}
        <div className="px-5 border-b border-slate-200 bg-white flex items-center gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('formula')}
            className={`py-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'formula'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Rumus &amp; Angka Riil</span>
          </button>
          <button
            onClick={() => setActiveTab('presentation')}
            className={`py-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'presentation'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Informasi / Insight</span>
          </button>
          <button
            onClick={() => setActiveTab('tableau')}
            className={`py-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'tableau'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-500" />
            <span>Sintaks Tableau Desktop</span>
          </button>
          <button
            onClick={() => setActiveTab('data_source')}
            className={`py-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'data_source'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sumber Data &amp; Database</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs bg-[#F8FAFC]">
          {/* TAB 1: FORMULA & ANGKA RIIL */}
          {activeTab === 'formula' && (
            <div className="space-y-4">
              {/* Formula Card */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Formula Konseptual Matematis
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                    Definisi Standar
                  </span>
                </div>
                <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm rounded-lg border border-slate-800 overflow-x-auto font-bold tracking-wide">
                  {detail.formulaConceptual}
                </div>
              </div>

              {/* Real Numbers Breakdown: Pembilang & Penyebut */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  <span>Breakdown Angka Riil Perhitungan (Mengapa Bernilai {detail.currentValue}?)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Numerator Box */}
                  <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-200/80">
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wide block">
                      {detail.numerator.label}
                    </span>
                    <div className="text-sm font-bold text-slate-900 font-mono mt-1">
                      {detail.numerator.realValue}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Sumber: {detail.numerator.source}
                    </span>
                  </div>

                  {/* Denominator Box */}
                  <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/80">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide block">
                      {detail.denominator.label}
                    </span>
                    <div className="text-sm font-bold text-slate-900 font-mono mt-1">
                      {detail.denominator.realValue}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Sumber: {detail.denominator.source}
                    </span>
                  </div>
                </div>

                {/* Calculation Process */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Hasil Kalkulasi Riil
                  </span>
                  <div className="font-mono text-xs font-bold text-slate-800">
                    {detail.calculationResult}
                  </div>
                </div>
              </div>

              {/* Benchmark & Thresholds */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Tolok Ukur Evaluasi &amp; Standar Acuan
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
                    <div className="flex items-center gap-1 font-bold text-[11px] mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Target Ideal / Aman</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">{detail.benchmarkThreshold.target}</p>
                  </div>

                  <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
                    <div className="flex items-center gap-1 font-bold text-[11px] mb-0.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Rentang Waspada</span>
                    </div>
                    <p className="text-[11px] text-amber-800">{detail.benchmarkThreshold.warning}</p>
                  </div>

                  <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200 text-rose-900">
                    <div className="flex items-center gap-1 font-bold text-[11px] mb-0.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Status Kritis</span>
                    </div>
                    <p className="text-[11px] text-rose-800">{detail.benchmarkThreshold.critical}</p>
                  </div>
                </div>
                <p className="text-[10.5px] text-slate-500 pt-1">
                  Dasar Regulasi: <strong className="text-slate-700">{detail.benchmarkThreshold.standardOrigin}</strong>
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CARA MENJELASKAN KE ATASAN */}
          {activeTab === 'presentation' && (
            <div className="space-y-4">
              {/* Executive Script */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-amber-700">
                  <Lightbulb className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Narasi Paparan Langsung ke Pimpinan (Executive Speech / Script)
                  </h4>
                </div>
                <div className="p-4 bg-amber-50/70 border border-amber-200/90 rounded-xl text-xs sm:text-[13px] leading-relaxed text-slate-800 font-medium">
                  "{detail.presentationPitch}"
                </div>
              </div>

              {/* Strategic Action Recommendation */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Rekomendasi Tindak Lanjut Eksekutif (Bila Pimpinan Bertanya)</span>
                </h4>
                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs text-slate-800 leading-relaxed">
                  {detail.executiveAction}
                </div>
              </div>

              {/* 3 Key Presentation Talking Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-blue-700 uppercase block mb-1">
                    1. Posisi Terhadap Target
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Nilai saat ini <strong className="text-slate-900">{detail.currentValue}</strong> dengan status <strong className="text-slate-900">{detail.statusText}</strong>.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-blue-700 uppercase block mb-1">
                    2. Validitas Data
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Tersinkronisasi resmi dari tabel <strong className="text-slate-900">{detail.databaseSource.tableName}</strong>.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-blue-700 uppercase block mb-1">
                    3. Dampak ke Kinerja Organisasi
                  </span>
                  <p className="text-[11px] text-slate-600">
                    {detail.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SINTAKS TABLEAU DESKTOP */}
          {activeTab === 'tableau' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Tableau Calculated Field Formula</span>
                  </span>
                  <button
                    onClick={() => handleCopy(detail.tableauCalculatedField)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Kode Formula</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 bg-slate-900 text-sky-300 font-mono text-xs rounded-lg border border-slate-800 overflow-x-auto">
                  {detail.tableauCalculatedField}
                </pre>
                <p className="text-[11px] text-slate-500">
                  Tip: Buka Tableau Desktop &gt; Klik kanan di panel Data &gt; Pilih <em>"Create Calculated Field..."</em> &gt; Beri nama sesuai kode tag di atas.
                </p>
              </div>

              {/* Tableau Shelves Instructions */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Panduan Menempatkan di Tableau Shelves (Worksheet Setup)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block">Show Me Chart:</span>
                    <span className="text-xs font-semibold text-slate-900">{detail.tableauShelvesGuide.showMe}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block">Rows Shelf:</span>
                    <span className="text-xs font-mono text-slate-900">{detail.tableauShelvesGuide.rows}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block">Columns Shelf:</span>
                    <span className="text-xs font-mono text-slate-900">{detail.tableauShelvesGuide.columns}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block">Marks Card &amp; Colors:</span>
                    <span className="text-xs text-slate-900">{detail.tableauShelvesGuide.marks}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUMBER DATA & DATABASE */}
          {activeTab === 'data_source' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-blue-700">
                  <Database className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Asal Data Katalog &amp; Skema Database
                  </h4>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500">Item Katalog Data Resmi:</span>
                    <span className="font-mono text-xs font-bold text-blue-900">{detail.databaseSource.catalogItem}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500">Nama Tabel Database:</span>
                    <span className="font-mono text-xs font-semibold text-slate-800">{detail.databaseSource.tableName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500">Klasifikasi Akses:</span>
                    <span className="text-xs font-bold text-slate-800">{detail.databaseSource.dataClassification}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-600 block mb-1.5">
                    Atribut Kolom yang Digunakan dalam Formula:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {detail.databaseSource.attributes.map((attr, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-md font-mono text-[11px] font-semibold"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Kamus KPI Terverifikasi Resmi Biro Keuangan &amp; PDSI BP Batam</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(detail.presentationPitch)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Salin Narasi Paparan</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#1F4E79] hover:bg-[#163756] text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
