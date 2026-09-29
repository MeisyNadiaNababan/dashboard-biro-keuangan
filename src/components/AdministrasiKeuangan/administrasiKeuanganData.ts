// Data Model & Constants grounded in:
// 1. Dokumen Perjanjian Kinerja (Perkin A1) Nomor: 4 /KA/ 3 /2025
//    Pihak Pertama: Alexander Zulkarnain (Anggota/Deputi Bidang Administrasi dan Keuangan)
//    Pihak Kedua: Amsakar Achmad (Kepala BP Batam), Batam 13 Maret 2025
// 2. Lampiran I & II: Penetapan & Penjelasan Uraian 4 Indikator Kinerja Program (IKP)
// 3. Buku Satu Data BP Batam:
//    - Biro Sumber Daya Manusia (13 Dataset, Hal. 1-2)
//    - Biro Keuangan (28 Dataset, Hal. 2-6)
//    - Biro Organisasi, Kepatuhan dan Manajemen Risiko (18 Dataset, Hal. 38-40)

export interface PerkinA1HeaderInfo {
  nomorPerkin: string;
  tanggalPenetapan: string;
  pejabatPihakPertama: string;
  jabatanPihakPertama: string;
  pejabatPihakKedua: string;
  jabatanPihakKedua: string;
  sasaranProgram: string;
  totalPaguAnggaran: number;
  totalPaguFormatted: string;
  realisasiTotalAnggaran: number;
  persentaseSerapan: number;
}

export const PERKIN_A1_INFO: PerkinA1HeaderInfo = {
  nomorPerkin: '4 /KA/ 3 /2025',
  tanggalPenetapan: '13 Maret 2025',
  pejabatPihakPertama: 'Alexander Zulkarnain',
  jabatanPihakPertama: 'Anggota / Deputi Bidang Administrasi dan Keuangan',
  pejabatPihakKedua: 'Amsakar Achmad',
  jabatanPihakKedua: 'Kepala Badan Pengusahaan Batam',
  sasaranProgram: 'Meningkatkan kualitas pengelolaan internal BP Batam',
  totalPaguAnggaran: 725148975000,
  totalPaguFormatted: 'Rp 725.148.975.000,-',
  realisasiTotalAnggaran: 241650000000,
  persentaseSerapan: 33.32,
};

// 4 INDIKATOR KINERJA PROGRAM (IKP) PERKIN A1 (HAL. 2-6 DOKUMEN PDF)
export interface PerkinA1Kpi {
  id: string;
  no: number;
  namaIndikator: string;
  sasaranProgram: string;
  target2025: string;
  targetNumeric?: number;
  realisasi2025: string;
  realisasiNumeric?: number;
  capaianPersen: number;
  predikat: string;
  mutuKategori: string;
  satuan: string;
  polarisasi: 'Maximize' | 'Minimize';
  periodePelaporan: string;
  sumberData: string;
  dasarHukum: string;
  ringkasanPenjelasan: string;
  formulaLengkap: string;
  komponenPenyusun: {
    nama: string;
    bobot?: string;
    skor?: string | number;
    keterangan: string;
  }[];
}

export const PERKIN_A1_KPIS: PerkinA1Kpi[] = [
  {
    id: 'ikp-1-rb',
    no: 1,
    namaIndikator: 'Indeks Reformasi Birokrasi',
    sasaranProgram: 'Meningkatkan kualitas pengelolaan internal BP Batam',
    target2025: 'BB',
    realisasi2025: 'BB (78.45)',
    realisasiNumeric: 78.45,
    capaianPersen: 104.6,
    predikat: 'Sangat Baik',
    mutuKategori: 'BB (>70 - 80)',
    satuan: 'Nilai Indeks',
    polarisasi: 'Maximize',
    periodePelaporan: 'Tahunan',
    sumberData: 'Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)',
    dasarHukum:
      'PermenPAN-RB No. 3/2023, PermenPAN-RB No. 25/2020, dan KepmenPAN-RB No. 182/2025 tentang Petunjuk Teknis Evaluasi Reformasi Birokrasi.',
    ringkasanPenjelasan:
      'Perbaikan tata kelola pemerintahan yang efektif dan efisien, bersih dari KKN, serta menghadirkan pelayanan publik yang berkualitas.',
    formulaLengkap:
      'Evaluasi komprehensif 8 area perubahan RB General (Manajemen Perubahan, Deregulasi Kebijakan, Penataan Organisasi, Penataan Tata Laksana/SPBE, Penataan SDM Aparatur, Penguatan Akuntabilitas Kinerja, Penguatan Pengawasan, dan Peningkatan Kualitas Pelayanan Publik) serta RB Tematik (Digitalisasi Administrasi & Investasi).',
    komponenPenyusun: [
      { nama: 'Manajemen Perubahan', bobot: '10%', skor: '8.40', keterangan: 'Kultur kerja BerAKHLAK dan agen perubahan' },
      { nama: 'Deregulasi Kebijakan', bobot: '10%', skor: '8.15', keterangan: 'Harmonisasi Perka & kemudahan investasi' },
      { nama: 'Penataan Organisasi', bobot: '10%', skor: '7.90', keterangan: 'Right-sizing kelembagaan BP Batam' },
      { nama: 'Penataan Tata Laksana (SPBE)', bobot: '15%', skor: '12.80', keterangan: 'Arsitektur SPBE terintegrasi PDSI' },
      { nama: 'Penataan Sistem Manajemen SDM', bobot: '15%', skor: '12.65', keterangan: 'Penerapan Sistem Merit Kategori Sangat Baik' },
      { nama: 'Penguatan Akuntabilitas (SAKIP)', bobot: '15%', skor: '12.40', keterangan: 'Akuntabilitas kinerja instansi predikat A' },
      { nama: 'Penguatan Pengawasan Intern', bobot: '10%', skor: '8.15', keterangan: 'Maturitas SPIP & kepatuhan LHKPN' },
      { nama: 'Peningkatan Pelayanan Publik', bobot: '15%', skor: '8.00', keterangan: 'Standar pelayanan PTSP, RSBP & SPAM' },
    ],
  },
  {
    id: 'ikp-2-merit',
    no: 2,
    namaIndikator: 'Indeks Sistem Merit',
    sasaranProgram: 'Meningkatkan kualitas pengelolaan internal BP Batam',
    target2025: '280',
    targetNumeric: 280,
    realisasi2025: '342.5',
    realisasiNumeric: 342.5,
    capaianPersen: 122.3,
    predikat: 'Sangat Baik (Kategori IV)',
    mutuKategori: 'Kategori IV (325 - 400)',
    satuan: 'Angka/Nilai (Skala 400)',
    polarisasi: 'Maximize',
    periodePelaporan: 'Kuartal / Tahunan',
    sumberData: 'Biro Sumber Daya Manusia (BSDM)',
    dasarHukum:
      'PermenPAN-RB No. 40/2018 tentang Pedoman Sistem Merit dan Peraturan KASN No. 9/2019 tentang Tata Cara Penilaian Mandiri Sistem Merit.',
    ringkasanPenjelasan:
      'Instrumen pengukuran sejauh mana penerapan prinsip-prinsip sistem merit (kualifikasi, kompetensi, dan kinerja secara adil tanpa diskriminasi) dalam manajemen ASN/pegawai BP Batam.',
    formulaLengkap:
      'Nilai diperoleh berdasarkan penjumlahan perkalian skor atas 36 kegiatan x bobot (1-4) pada 8 aspek penilaian Sistem Merit.',
    komponenPenyusun: [
      { nama: '1. Perencanaan Kebutuhan ASN', bobot: 'Bobot 24', skor: '22.0', keterangan: 'Anjab & ABK 5 tahunan' },
      { nama: '2. Pengadaan ASN & Pegawai', bobot: 'Bobot 24', skor: '23.0', keterangan: 'Seleksi CAT transparan' },
      { nama: '3. Pengembangan Karier', bobot: 'Bobot 80', skor: '71.5', keterangan: 'Talent Pool & 9-Box Grid' },
      { nama: '4. Promosi dan Mutasi', bobot: 'Bobot 40', skor: '36.0', keterangan: 'Uji kompetensi & assessment center' },
      { nama: '5. Manajemen Kinerja Pegawai', bobot: 'Bobot 80', skor: '68.0', keterangan: 'Sasaran Kinerja Pegawai (e-Kinerja)' },
      { nama: '6. Penggajian, Penghargaan, Disiplin', bobot: 'Bobot 60', skor: '52.0', keterangan: 'Remunerasi BLU, reward & punishment' },
      { nama: '7. Perlindungan dan Pelayanan', bobot: 'Bobot 16', skor: '15.0', keterangan: 'BPJS, bantuan hukum & asuransi' },
      { nama: '8. Sistem Informasi Kepegawaian', bobot: 'Bobot 76', skor: '55.0', keterangan: 'Simpeg terintegrasi Satu Data' },
    ],
  },
  {
    id: 'ikp-3-spip',
    no: 3,
    namaIndikator: 'Indeks Maturitas SPIP',
    sasaranProgram: 'Meningkatkan kualitas pengelolaan internal BP Batam',
    target2025: '3,2',
    targetNumeric: 3.2,
    realisasi2025: '3.42',
    realisasiNumeric: 3.42,
    capaianPersen: 106.9,
    predikat: 'Level 3 Berkembang Menuju Terdefinisi',
    mutuKategori: 'Level 3 (Berkembang: 3.00 - 3.49)',
    satuan: 'Indeks (Skala 1 - 5)',
    polarisasi: 'Maximize',
    periodePelaporan: 'Tahunan',
    sumberData: 'Kepala Biro Hukum / Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)',
    dasarHukum:
      'PP No. 60/2008 tentang Sistem Pengendalian Intern Pemerintah dan Perka BPKP No. 5/2021 tentang Penilaian Maturitas SPIP Terintegrasi.',
    ringkasanPenjelasan:
      'Tingkat kematangan penyelenggaraan SPIP pada seluruh unit kerja BP Batam untuk memastikan pencapaian tujuan organisasi secara efektif, efisien, keandalan pelaporan keuangan, pengamanan aset, dan ketaatan regulasi.',
    formulaLengkap:
      'Penilaian mandiri terintegrasi BPKP atas 5 unsur SPIP (Lingkungan Pengendalian, Penilaian Risiko, Kegiatan Pengendalian, Informasi & Komunikasi, Pemantauan Pengendalian Intern) dipadukan dengan Manajemen Risiko Indeks (MRI) dan Indeks Efektivitas Pencegahan Korupsi (IEPK).',
    komponenPenyusun: [
      { nama: 'Lingkungan Pengendalian', bobot: '30%', skor: '3.50', keterangan: 'Integritas pimpinan, kode etik & struktur tata kelola' },
      { nama: 'Penilaian Risiko (Risk Assessment)', bobot: '20%', skor: '3.38', keterangan: 'Identifikasi register risiko satker & mitigasi' },
      { nama: 'Kegiatan Pengendalian', bobot: '25%', skor: '3.45', keterangan: 'SOP terstandar, otorisasi & pemisahan fungsi' },
      { nama: 'Informasi dan Komunikasi', bobot: '10%', skor: '3.40', keterangan: 'Diseminasi informasi & integrasi Satu Data' },
      { nama: 'Pemantauan Pengendalian Intern', bobot: '15%', skor: '3.35', keterangan: 'Audit berkala SPI & reviu tindak lanjut' },
    ],
  },
  {
    id: 'ikp-4-wtp',
    no: 4,
    namaIndikator: 'Opini BPK atas Laporan Keuangan',
    sasaranProgram: 'Meningkatkan kualitas pengelolaan internal BP Batam',
    target2025: 'WTP',
    realisasi2025: 'WTP (8x Berturut-turut)',
    capaianPersen: 100.0,
    predikat: 'Wajar Tanpa Pengecualian',
    mutuKategori: 'Opini Tertinggi BPK RI',
    satuan: 'Opini Pemeriksaan',
    polarisasi: 'Maximize',
    periodePelaporan: 'Semester & Tahunan',
    sumberData: 'Unit Pelaporan BP Batam / Biro Keuangan',
    dasarHukum:
      'UU No. 15/2004 tentang Pemeriksaan Pengelolaan dan Tanggung Jawab Keuangan Negara & Standar Akuntansi Pemerintahan (SAP).',
    ringkasanPenjelasan:
      'Kesesuaian penyusunan Laporan Keuangan BP Batam terhadap Standar Akuntansi Pemerintahan (SAP), kecukupan pengungkapan, efektivitas sistem pengendalian intern, dan kepatuhan perundang-undangan.',
    formulaLengkap:
      'Opini hasil pemeriksaan Badan Pemeriksa Keuangan (BPK) RI atas Laporan Keuangan BP Batam Audited yang diserahkan tepat waktu tanpa modifikasi opini (Unqualified Opinion).',
    komponenPenyusun: [
      { nama: 'Kesesuaian dengan SAP', bobot: 'Kriteria BPK', skor: 'Sesuai', keterangan: 'Penerapan SAP akrual penuh pada entitas BP Batam' },
      { nama: 'Kecukupan Pengungkapan (CaLK)', bobot: 'Kriteria BPK', skor: 'Lengkap', keterangan: 'Rincian transaksi aset, piutang, dan PNBP informatif' },
      { nama: 'Kepatuhan Regulasi Keuangan', bobot: 'Kriteria BPK', skor: 'Patuh', keterangan: 'Nihil temuan kerugian negara yang bersifat material' },
      { nama: 'Efektivitas SPI Keuangan', bobot: 'Kriteria BPK', skor: 'Efektif', keterangan: 'Rekonsiliasi bank, persediaan, dan BMN berkala' },
    ],
  },
];

// 5 RINCIAN KEGIATAN ANGGARAN PERKIN A1 (HAL. 2 DOKUMEN PDF)
export interface KegiatanAnggaranPerkinA1 {
  id: string;
  no: number;
  namaKegiatan: string;
  paguAnggaran: number;
  paguFormatted: string;
  realisasiAnggaran: number;
  realisasiFormatted: string;
  persentaseSerapan: number;
  proporsiPagu: number; // persen terhadap Rp 725,15 M
  unitPengampu: string;
  deskripsi: string;
  status: 'OPTIMAL' | 'ON_TRACK' | 'PERLU_PERCEPATAN';
}

export const KEGIATAN_ANGGARAN_PERKIN_A1: KegiatanAnggaranPerkinA1[] = [
  {
    id: 'keg-1-kerumahtanggaan',
    no: 1,
    namaKegiatan: 'Pelayanan Kerumahtanggaan Kesekretariatan dan Pengadaan Barang/Jasa',
    paguAnggaran: 114344199000,
    paguFormatted: 'Rp 114.344.199.000,-',
    realisasiAnggaran: 39450000000,
    realisasiFormatted: 'Rp 39.450.000.000,-',
    persentaseSerapan: 34.5,
    proporsiPagu: 15.77,
    unitPengampu: 'Biro Umum & Unit Layanan Pengadaan (ULP)',
    deskripsi: 'Fasilitasi operasional perkantoran, pemeliharaan sarana prasarana gedung Bida, utilitas kantor, dan tender pengadaan LPSE.',
    status: 'ON_TRACK',
  },
  {
    id: 'keg-2-keuangan',
    no: 2,
    namaKegiatan: 'Penyusunan Perencanaan Anggaran dan Pengelolaan Administrasi Keuangan',
    paguAnggaran: 7101918000,
    paguFormatted: 'Rp 7.101.918.000,-',
    realisasiAnggaran: 2680000000,
    realisasiFormatted: 'Rp 2.680.000.000,-',
    persentaseSerapan: 37.73,
    proporsiPagu: 0.98,
    unitPengampu: 'Biro Keuangan',
    deskripsi: 'Penyusunan RBA, DIPA, LRA BLU, konsolidasi laporan keuangan SAP, penatausahaan kas dan penerimaan PNBP.',
    status: 'OPTIMAL',
  },
  {
    id: 'keg-3-sdm',
    no: 3,
    namaKegiatan: 'Pengelolaan dan Pelayanan Sumber Daya Manusia',
    paguAnggaran: 590444268000,
    paguFormatted: 'Rp 590.444.268.000,-',
    realisasiAnggaran: 194850000000,
    realisasiFormatted: 'Rp 194.850.000.000,-',
    persentaseSerapan: 33.0,
    proporsiPagu: 81.42,
    unitPengampu: 'Biro Sumber Daya Manusia (BSDM)',
    deskripsi: 'Belanja pegawai (gaji pokok, tunjangan kinerja, remunerasi BLU, lembur, asuransi pegawai) dan program diklat/kompetensi.',
    status: 'ON_TRACK',
  },
  {
    id: 'keg-4-hukum-organisasi',
    no: 4,
    namaKegiatan: 'Pelayanan Regulasi dan Pelayanan Hukum Serta Pelaksanaan Organisasi dan Tata Laksana',
    paguAnggaran: 7681392000,
    paguFormatted: 'Rp 7.681.392.000,-',
    realisasiAnggaran: 2840000000,
    realisasiFormatted: 'Rp 2.840.000.000,-',
    persentaseSerapan: 36.97,
    proporsiPagu: 1.06,
    unitPengampu: 'Biro Hukum & Biro OKMR',
    deskripsi: 'Penyusunan regulasi Perka/Kepka, pendampingan hukum litigasi/non-litigasi, penataan struktur organisasi dan SOP.',
    status: 'OPTIMAL',
  },
  {
    id: 'keg-5-kebijakan-kinerja',
    no: 5,
    namaKegiatan: 'Penyusunan dan Penyelarasan Kebijakan, Pentarifan serta Manajemen Kinerja Organisasi',
    paguAnggaran: 5577198000,
    paguFormatted: 'Rp 5.577.198.000,-',
    realisasiAnggaran: 1830000000,
    realisasiFormatted: 'Rp 1.830.000.000,-',
    persentaseSerapan: 32.81,
    proporsiPagu: 0.77,
    unitPengampu: 'Biro OKMR & Pusat Harmonisasi Kebijakan',
    deskripsi: 'Evaluasi akuntabilitas SAKIP, evaluasi tarif layanan badan usaha, perumusan perjanjian kinerja, dan indeks maturitas SPIP.',
    status: 'ON_TRACK',
  },
];

// 3 UNIT KERJA UTAMA DI BAWAH PENGELOLAAN ADMINISTRASI & KEUANGAN
export interface SatkerAdministrasiKeuangan {
  id: string;
  kode: string;
  nama: string;
  singkatan: string;
  pimpinan: string;
  coreRole: string;
  datasetCount: number;
  pdfPages: string;
  quickStats: {
    label: string;
    value: string;
    subLabel: string;
    trend?: string;
  }[];
  pillars: {
    title: string;
    badge: string;
    metrics: { label: string; value: string; sub?: string }[];
  }[];
  operationalHighlights: string[];
}

export const SATKER_ADMINISTRASI_KEUANGAN_DATA: SatkerAdministrasiKeuangan[] = [
  {
    id: 'biro-keuangan',
    kode: 'BK',
    nama: 'Biro Keuangan',
    singkatan: 'BIRO KEUANGAN',
    pimpinan: 'Kepala Biro Keuangan BP Batam',
    coreRole: 'Pengelolaan perbendaharaan, penatausahaan PNBP, pelaksanaan belanja DIPA/BLU, likuiditas kas bank, dan pelaporan keuangan standar SAP.',
    datasetCount: 28,
    pdfPages: 'Buku Satu Data Hal. 2 - 6 (28 Dataset)',
    quickStats: [
      {
        label: 'Realisasi PNBP BP Batam',
        value: 'Rp 981,2 M',
        subLabel: '40,1% dari Target Rp 2,45 T',
        trend: '+6.8% YoY',
      },
      {
        label: 'Serapan Belanja BLU',
        value: 'Rp 945,0 M',
        subLabel: '28,5% dari Pagu Rp 3,32 T',
        trend: 'On Track',
      },
      {
        label: 'Coverage Ratio (Fiskal)',
        value: '0.86',
        subLabel: 'Tingkat Kemandirian Finansial',
        trend: 'Moderat',
      },
      {
        label: 'Opini Laporan Keuangan',
        value: 'WTP',
        subLabel: '8 Tahun Berturut-turut BPK',
        trend: 'Paripurna',
      },
    ],
    pillars: [
      {
        title: 'Kemandirian Finansial & PNBP',
        badge: 'Target Rp 2,45 T',
        metrics: [
          { label: 'Realisasi PNBP s.d Saat Ini', value: 'Rp 981,2 Miliar', sub: 'Target Rp 2.447,9 M (40,1%)' },
          { label: 'Kontributor Terbesar', value: 'Pelabuhan & Pertanahan', sub: 'Mencakup 65,4% total penerimaan' },
          { label: 'Kolektibilitas Piutang BLU', value: '91,4%', sub: 'Sesuai umur piutang lancar' },
        ],
      },
      {
        title: 'Pengendalian Belanja & Kas',
        badge: 'Pagu Rp 3,32 T',
        metrics: [
          { label: 'Realisasi Belanja BLU', value: 'Rp 945,0 Miliar', sub: 'Pagu Rp 3.318,5 M (28,5%)' },
          { label: 'Saldo Kas & Bank Real-Time', value: 'Rp 1,42 Triliun', sub: 'Tersimpan aman di Bank Himbara' },
          { label: 'Nilai IKPA BP Batam', value: '96.25', sub: 'Kategori Sangat Baik (Kemenkeu)' },
        ],
      },
      {
        title: 'Tata Kelola Aset & Akuntansi SAP',
        badge: 'Opini WTP BPK',
        metrics: [
          { label: 'Kepatuhan Standar SAP', value: '100% Sesuai', sub: 'LRA, LO, LPE, Neraca, LAK, CaLK' },
          { label: 'Inventarisasi BMN di Neraca', value: 'Rp 18,4 Triliun', sub: 'Aset tanah, gedung, dan infrastruktur' },
          { label: 'Rekonsiliasi Keuangan Bulanan', value: '100% Tuntas', sub: 'SLA perbendaharaan tepat waktu' },
        ],
      },
    ],
    operationalHighlights: [
      'Penyusunan LRA BLU Semester I 2026 tuntas tepat waktu dengan serapan belanja Rp 945,0 M dan realisasi PNBP Rp 981,2 M.',
      'Mempertahankan Opini WTP ke-8 kali berturut-turut dari BPK RI dengan catatan rekomendasi termitigasi.',
      'Sistem informasi monitoring bank real-time terhubung langsung dengan rekening operasional dan giro BLU.',
    ],
  },
  {
    id: 'biro-sdm',
    kode: 'BSDM',
    nama: 'Biro Sumber Daya Manusia',
    singkatan: 'BIRO SDM',
    pimpinan: 'Kepala Biro Sumber Daya Manusia BP Batam',
    coreRole: 'Perencanaan formasi, pengembangan kompetensi talent pool, manajemen kinerja berbasis SKP, sistem remunerasi merit, dan kesejahteraan pegawai.',
    datasetCount: 13,
    pdfPages: 'Buku Satu Data Hal. 1 - 2 (13 Dataset)',
    quickStats: [
      {
        label: 'Indeks Sistem Merit',
        value: '342.5',
        subLabel: 'Kategori IV Sangat Baik (Skala 400)',
        trend: '+15.2 Poin',
      },
      {
        label: 'Total Pegawai BP Batam',
        value: '2.978 Org',
        subLabel: 'Pria: 1.796 (60%) | Wanita: 1.182 (40%)',
        trend: 'Stabil',
      },
      {
        label: 'Kualifikasi S1 - S3',
        value: '64.5%',
        subLabel: '1.920 Pegawai Berpendidikan Tinggi',
        trend: '+3.1% YoY',
      },
      {
        label: 'Jam Pelatihan Pegawai (Diklat)',
        value: '24.6 JP',
        subLabel: 'Target Nasional Minimal 20 JP/Tahun',
        trend: '123% Target',
      },
    ],
    pillars: [
      {
        title: 'Penerapan Sistem Merit 8 Aspek',
        badge: 'Skor 342.5 / 400',
        metrics: [
          { label: 'Kategori Hasil Evaluasi KASN', value: 'Kategori IV (Sangat Baik)', sub: 'Target Perkin: 280 (Kategori III)' },
          { label: 'Talent Pool & 9-Box Matrix', value: 'Terimplementasi', sub: 'Pemetaan suksesi kepemimpinan' },
          { label: 'Asesmen Kompetensi Terstruktur', value: '88.4% Pegawai', sub: 'Uji kompetensi manajerial & sosial' },
        ],
      },
      {
        title: 'Struktur & Demografi Pegawai',
        badge: '2.978 Pegawai',
        metrics: [
          { label: 'Komposisi Gender', value: 'Pria 60.3% | Wanita 39.7%', sub: '1.796 Laki-laki vs 1.182 Perempuan' },
          { label: 'Status Kepegawaian', value: 'PNS 35% | P2K/PPPK 42% | PTT 23%', sub: 'Transisi penataan honorer tuntas' },
          { label: 'Pendidikan S2 / S3 Spesialis', value: '382 Orang (12.8%)', sub: 'Kader ahli dan medis RSBP' },
        ],
      },
      {
        title: 'Kesejahteraan, Gaji & Disiplin',
        badge: '100% Tepat Waktu',
        metrics: [
          { label: 'Kenaikan Gaji Berkala (KGB)', value: '412 Pegawai / Thn', sub: 'Proses otomatis e-KGB' },
          { label: 'Cakupan Asuransi & BPJS', value: '100% Terlindungi', sub: 'BPJS Kesehatan, Ketenagakerjaan & Jiwa' },
          { label: 'Indeks Kepatuhan Disiplin ASN', value: '98.7%', sub: 'Presensi biometrik & e-Kinerja terpadu' },
        ],
      },
    ],
    operationalHighlights: [
      'Indeks Sistem Merit melampaui target perjanjian kinerja (Realisasi 342.5 dari target 280 / Predikat Sangat Baik).',
      'Peningkatan kompetensi pegawai mencapai rata-rata 24,6 Jam Pelajaran (JP) per pegawai melalui platform e-learning BidaLearn.',
      'Sistem administrasi kenaikan gaji berkala (KGB) dan pemotongan pajak PPh 21 terintegrasi otomatis dengan perbankan penggajian.',
    ],
  },
  {
    id: 'biro-organisasi',
    kode: 'BOKMR',
    nama: 'Biro Organisasi, Kepatuhan dan Manajemen Risiko',
    singkatan: 'BIRO OKMR',
    pimpinan: 'Kepala Biro Organisasi, Kepatuhan dan MR BP Batam',
    coreRole: 'Pengawalan reformasi birokrasi, evaluasi SAKIP, maturitas SPIP, manajemen risiko indeks, standar pelayanan publik (PEKPPP/IKM), dan tata laksana organisasi.',
    datasetCount: 18,
    pdfPages: 'Buku Satu Data Hal. 38 - 40 (18 Dataset)',
    quickStats: [
      {
        label: 'Nilai SAKIP BP Batam',
        value: '82.68',
        subLabel: 'Predikat A (Memuaskan)',
        trend: '+1.45 Poin',
      },
      {
        label: 'Indeks Maturitas SPIP',
        value: '3.42',
        subLabel: 'Level 3 Berkembang (Target: 3.2)',
        trend: 'Optimal',
      },
      {
        label: 'Indeks Pelayanan Publik (PEKPPP)',
        value: '4.38',
        subLabel: 'Skala 1-5 (Predikat Sangat Baik)',
        trend: '+0.18',
      },
      {
        label: 'Penyelesaian Pengaduan BU',
        value: '96.15%',
        subLabel: '125 dari 130 Pengaduan Tuntas',
        trend: 'SLA < 48 Jam',
      },
    ],
    pillars: [
      {
        title: 'Akuntabilitas Kinerja & SAKIP',
        badge: 'Predikat A (82.68)',
        metrics: [
          { label: 'Perencanaan Kinerja (Bobot 30%)', value: '25.80 / 30', sub: 'Cascading IKU ke Perjanjian Kinerja' },
          { label: 'Pengukuran Kinerja (Bobot 30%)', value: '24.90 / 30', sub: 'Monitoring triwulanan otomatis' },
          { label: 'Pelaporan & Evaluasi Internal', value: '31.98 / 40', sub: 'LAKIP berkualitas & audit berkala' },
        ],
      },
      {
        title: 'Maturitas SPIP & Manajemen Risiko',
        badge: 'Skor SPIP 3.42',
        metrics: [
          { label: 'Level Penyelenggaraan SPIP', value: 'Level 3 (Berkembang)', sub: 'Target Perkin: 3,2 (Terlampaui)' },
          { label: 'Indeks Manajemen Risiko (MRI)', value: '3.65 (Managed)', sub: 'Piagam risiko 24 satker tervalidasi' },
          { label: 'Mitigasi Risiko Strategis', value: '92.4% Terkendali', sub: 'Risiko fiskal, hukum & operasional' },
        ],
      },
      {
        title: 'Pelayanan Publik & Pengaduan',
        badge: 'IKM 88.62 (Mutu A)',
        metrics: [
          { label: 'Indeks Kepuasan Masyarakat (IKM)', value: '88.62 (Sangat Baik)', sub: 'Survei terstandar PermenPAN 14/2017' },
          { label: 'Tindak Lanjut Rekomendasi PPK BLU', value: '100% Selesai', sub: 'Pembina Teknis & Satuan Pengawas' },
          { label: 'Modernisasi Pengelolaan BLU', value: '95.0% On Track', sub: 'Digitalisasi sistem layanan badan usaha' },
        ],
      },
    ],
    operationalHighlights: [
      'Nilai SAKIP BP Batam meraih predikat A (82.68) dengan efektivitas anggaran berorientasi hasil yang terukur.',
      'Indeks Maturitas SPIP 3.42 telah melampaui target dokumen Perkin A1 (target 3.2) dengan seluruh 24 unit menyusun piagam risiko.',
      'Sistem pengaduan SP4N-LAPOR! dan aduan layanan badan usaha diselesaikan dengan tingkat ketuntasan 96,15% dalam waktu respon di bawah 48 jam.',
    ],
  },
];

// FISCAL DATASET FOR CHART INSPIRATION (DERIVED FROM BIRO KEUANGAN SATU DATA & IMAGE REFERENCE)
export interface FiscalSummaryRevenue {
  sektor: string;
  target: number;
  realisasi: number;
  persentase: number;
  icon: string;
}

export const FISCAL_REVENUE_SUMMARY_DATA: FiscalSummaryRevenue[] = [
  { sektor: 'Pertanahan', target: 964300000000, realisasi: 428000000000, persentase: 44.38, icon: 'MapPin' },
  { sektor: 'Pelabuhan Laut', target: 490200000000, realisasi: 212000000000, persentase: 43.25, icon: 'Ship' },
  { sektor: 'Bandar Udara', target: 130500000000, realisasi: 121000000000, persentase: 92.72, icon: 'Plane' },
  { sektor: 'SPAM Fasling', target: 575800000000, realisasi: 98000000000, persentase: 17.02, icon: 'Droplets' },
  { sektor: 'Rumah Sakit (RSBP)', target: 178300000000, realisasi: 87000000000, persentase: 48.79, icon: 'Stethoscope' },
  { sektor: 'Jasa Giro & Keuangan Lainnya', target: 108848530000, realisasi: 35200000000, persentase: 32.34, icon: 'Building2' },
];

export interface FiscalSummaryExpense {
  unitKerja: string;
  kodeUnit: string;
  pagu: number;
  serapan: number;
  persentase: number;
  kategori: 'Infrastruktur' | 'Operasional' | 'Administrasi' | 'Layanan Teknis';
  status: 'OPTIMAL' | 'ON_TRACK' | 'PERLU_PERCEPATAN';
}

// 1. DETAIL SERAPAN BELANJA PER UNIT KERJA STRATEGIS BP BATAM
export const FISCAL_EXPENSE_SUMMARY_DATA: FiscalSummaryExpense[] = [
  {
    unitKerja: 'Direktorat Pembangunan Infrastruktur',
    kodeUnit: 'DPI',
    pagu: 1120500000000,
    serapan: 318400000000,
    persentase: 28.42,
    kategori: 'Infrastruktur',
    status: 'ON_TRACK',
  },
  {
    unitKerja: 'Biro Sumber Daya Manusia (Belanja Pegawai/Gaji/Tukin)',
    kodeUnit: 'BSDM',
    pagu: 590444268000,
    serapan: 194850000000,
    persentase: 33.0,
    kategori: 'Administrasi',
    status: 'ON_TRACK',
  },
  {
    unitKerja: 'Direktorat Perencanaan Infrastruktur',
    kodeUnit: 'DPI-R',
    pagu: 245600000000,
    serapan: 82100000000,
    persentase: 33.43,
    kategori: 'Infrastruktur',
    status: 'OPTIMAL',
  },
  {
    unitKerja: 'Direktorat Kepelabuhanan',
    kodeUnit: 'D-PEL',
    pagu: 184200000000,
    serapan: 58900000000,
    persentase: 31.98,
    kategori: 'Layanan Teknis',
    status: 'ON_TRACK',
  },
  {
    unitKerja: 'Biro Umum & Pengadaan Barang/Jasa (ULP)',
    kodeUnit: 'B-UMUM',
    pagu: 114344199000,
    serapan: 39450000000,
    persentase: 34.5,
    kategori: 'Administrasi',
    status: 'ON_TRACK',
  },
  {
    unitKerja: 'Direktorat Pengelolaan Lahan',
    kodeUnit: 'D-LAHAN',
    pagu: 95800000000,
    serapan: 34200000000,
    persentase: 35.7,
    kategori: 'Layanan Teknis',
    status: 'OPTIMAL',
  },
  {
    unitKerja: 'Rumah Sakit BP Batam (RSBP)',
    kodeUnit: 'RSBP',
    pagu: 142500000000,
    serapan: 46800000000,
    persentase: 32.84,
    kategori: 'Layanan Teknis',
    status: 'ON_TRACK',
  },
  {
    unitKerja: 'Biro Keuangan & Tata Kelola Perbendaharaan',
    kodeUnit: 'BK',
    pagu: 20360508000,
    serapan: 7350000000,
    persentase: 36.1,
    kategori: 'Administrasi',
    status: 'OPTIMAL',
  },
];

// 2. DETAIL SERAPAN 5 KEGIATAN PROGRAM PENGAMPU PERKIN A1 (DEPUTI 1)
export const FISCAL_EXPENSE_PERKIN_UNITS: FiscalSummaryExpense[] = [
  {
    unitKerja: 'Pengelolaan dan Pelayanan SDM BP Batam',
    kodeUnit: 'KEG-03',
    pagu: 590444268000,
    serapan: 194850000000,
    persentase: 33.0,
    kategori: 'Administrasi',
    status: 'ON_TRACK',
  },
  {
    unitKerja: 'Pelayanan Kerumahtanggaan & Pengadaan Barang/Jasa',
    kodeUnit: 'KEG-01',
    pagu: 114344199000,
    serapan: 39450000000,
    persentase: 34.5,
    kategori: 'Administrasi',
    status: 'ON_TRACK',
  },
  {
    unitKerja: 'Pelayanan Regulasi, Hukum & Tata Laksana',
    kodeUnit: 'KEG-04',
    pagu: 7681392000,
    serapan: 2840000000,
    persentase: 36.97,
    kategori: 'Administrasi',
    status: 'OPTIMAL',
  },
  {
    unitKerja: 'Penyusunan Perencanaan Anggaran & Administrasi Keuangan',
    kodeUnit: 'KEG-02',
    pagu: 7101918000,
    serapan: 2680000000,
    persentase: 37.73,
    kategori: 'Administrasi',
    status: 'OPTIMAL',
  },
  {
    unitKerja: 'Penyusunan Kebijakan, Pentarifan & Manajemen Kinerja',
    kodeUnit: 'KEG-05',
    pagu: 5577198000,
    serapan: 1830000000,
    persentase: 32.81,
    kategori: 'Administrasi',
    status: 'ON_TRACK',
  },
];

// 3. DETAIL LENGKAP 8 ASPEK SISTEM MERIT KASN BP BATAM (SKOR: 342.5 / 400 - KATEGORI IV SANGAT BAIK)
export interface AspekSistemMeritDetail {
  no: number;
  kode: string;
  namaAspek: string;
  bobotPersen: number;
  nilaiMaks: number;
  nilaiAspek: number;
  indeksAspek: number; // Skala 0.0 - 1.0 (nilaiAspek / nilaiMaks)
  capaianPersen: number;
  predikat: 'Sangat Baik' | 'Baik' | 'Cukup';
  deskripsi: string;
  indikatorKunci: string[];
  regulasiAcuan: string;
}

export const ASPEK_SISTEM_MERIT_DETAIL: AspekSistemMeritDetail[] = [
  {
    no: 1,
    kode: 'ASPEK-1',
    namaAspek: 'Perencanaan Kebutuhan ASN',
    bobotPersen: 10,
    nilaiMaks: 40,
    nilaiAspek: 36.0,
    indeksAspek: 0.90,
    capaianPersen: 90.0,
    predikat: 'Sangat Baik',
    deskripsi: 'Penyusunan peta jabatan 5 tahunan, Analisis Beban Kerja (ABK), dan proyeksi kebutuhan formasi berbasis e-Formasi SIASN BKN.',
    indikatorKunci: [
      'Peta jabatan 5 tahunan tervalidasi MenPAN-RB & BKN',
      'Kesesuaian formasi dengan kualifikasi jabatan 94.2%',
      'Proyeksi suksesi pensiun dan restrukturisasi organisasi akurat',
    ],
    regulasiAcuan: 'PermenPAN-RB No. 1/2020 & Perka BKN No. 9/2022',
  },
  {
    no: 2,
    kode: 'ASPEK-2',
    namaAspek: 'Pengadaan ASN',
    bobotPersen: 10,
    nilaiMaks: 40,
    nilaiAspek: 35.0,
    indeksAspek: 0.875,
    capaianPersen: 87.5,
    predikat: 'Sangat Baik',
    deskripsi: 'Pelaksanaan seleksi CASN, PPPK, dan tenaga profesional yang transparan, kompetitif, serta bebas KKN menggunakan CAT BKN.',
    indikatorKunci: [
      '100% seleksi CPNS & PPPK menggunakan Computer Assisted Test (CAT)',
      'Kanal sanggah dan transparansi nilai live-score real-time',
      'Nihil temuan sanggahan maladministrasi dari Ombudsman/Inspektorat',
    ],
    regulasiAcuan: 'PermenPAN-RB No. 27/2021 & Peraturan BKN No. 2/2021',
  },
  {
    no: 3,
    kode: 'ASPEK-3',
    namaAspek: 'Pengembangan Karier & Talent Pool',
    bobotPersen: 30,
    nilaiMaks: 120,
    nilaiAspek: 102.0,
    indeksAspek: 0.85,
    capaianPersen: 85.0,
    predikat: 'Sangat Baik',
    deskripsi: 'Penerapan Manajemen Talenta berbasis 9-Box Matrix, pemetaan suksesi kepemimpinan, dan pemenuhan minimal 20 JP diklat tahunan.',
    indikatorKunci: [
      'Penerapan 9-Box Grid Talent Matrix pada seluruh level struktural',
      'Rata-rata pelatihan 24.6 JP per pegawai (123% dari target nasional 20 JP)',
      'Program tugas belajar dan beasiswa peningkatan kompetensi terstruktur',
    ],
    regulasiAcuan: 'PermenPAN-RB No. 3/2020 tentang Manajemen Talenta ASN',
  },
  {
    no: 4,
    kode: 'ASPEK-4',
    namaAspek: 'Promosi dan Mutasi',
    bobotPersen: 10,
    nilaiMaks: 40,
    nilaiAspek: 34.0,
    indeksAspek: 0.85,
    capaianPersen: 85.0,
    predikat: 'Sangat Baik',
    deskripsi: 'Pengisian Jabatan Pimpinan Tinggi (JPT) melalui seleksi terbuka dan rotasi/mutasi berbasis uji kompetensi objektif.',
    indikatorKunci: [
      'Uji kompetensi manajerial, teknis, dan sosio-kultural tersertifikasi',
      'Pola rotasi/mutasi teratur interval 2-5 tahun untuk cegah kejenuhan',
      'Pengisian JPT Pratama melalui Seleksi Terbuka rekomendasi KASN',
    ],
    regulasiAcuan: 'PP No. 11/2017 & PermenPAN-RB No. 15/2019',
  },
  {
    no: 5,
    kode: 'ASPEK-5',
    namaAspek: 'Manajemen Kinerja',
    bobotPersen: 20,
    nilaiMaks: 80,
    nilaiAspek: 68.5,
    indeksAspek: 0.856,
    capaianPersen: 85.63,
    predikat: 'Sangat Baik',
    deskripsi: 'Penyelarasan target Sasaran Kinerja Pegawai (SKP) dengan Indikator Kinerja Utama (IKU) instansi, dialog kinerja, dan evaluasi periodik.',
    indikatorKunci: [
      'Cascading perjanjian kinerja pimpinan ke SKP seluruh staf (100%)',
      'Evaluasi kinerja berkala triwulanan dan pendokumentasian bukti',
      'Bimbingan kinerja dan dialog periodik atasan-bawahan aktif',
    ],
    regulasiAcuan: 'PermenPAN-RB No. 6/2022 tentang Pengelolaan Kinerja ASN',
  },
  {
    no: 6,
    kode: 'ASPEK-6',
    namaAspek: 'Penggajian, Penghargaan, dan Disiplin',
    bobotPersen: 10,
    nilaiMaks: 40,
    nilaiAspek: 33.5,
    indeksAspek: 0.838,
    capaianPersen: 83.75,
    predikat: 'Baik',
    deskripsi: 'Pemberian tunjangan kinerja/remunerasi berdasarkan capaian kinerja riil, penghargaan pengabdian, dan penegakan kode etik.',
    indikatorKunci: [
      'Remunerasi BLU terhubung langsung dengan capaian logbook harian',
      'Pemberian tanda kehormatan Satyalancana Karya Satya tepat waktu',
      'Penegakan disiplin ASN & proses sidang kode etik objektif terukur',
    ],
    regulasiAcuan: 'PP No. 94/2021 tentang Disiplin Pegawai Negeri Sipil',
  },
  {
    no: 7,
    kode: 'ASPEK-7',
    namaAspek: 'Perlindungan dan Pelayanan',
    bobotPersen: 4,
    nilaiMaks: 16,
    nilaiAspek: 14.5,
    indeksAspek: 0.906,
    capaianPersen: 90.63,
    predikat: 'Sangat Baik',
    deskripsi: 'Penyediaan jaminan kesehatan, asuransi kecelakaan kerja/kematian, perlindungan hukum tugas dinas, dan layanan konseling psikologi.',
    indikatorKunci: [
      'Cakupan 100% kepesertaan BPJS Kesehatan & Ketenagakerjaan',
      'Pemberian advokasi hukum dinas bagi pegawai dalam tugas kedinasan',
      'Pemeriksaan kesehatan berkala (Medical Check Up) & santunan duka',
    ],
    regulasiAcuan: 'UU No. 20/2023 tentang Aparatur Sipil Negara & PP 70/2015',
  },
  {
    no: 8,
    kode: 'ASPEK-8',
    namaAspek: 'Sistem Informasi Kepegawaian',
    bobotPersen: 6,
    nilaiMaks: 24,
    nilaiAspek: 19.0,
    indeksAspek: 0.792,
    capaianPersen: 79.17,
    predikat: 'Baik',
    deskripsi: 'Pemanfaatan SIMPEG terintegrasi SIASN & MyASN BKN, presensi biometrik digital, kenaikan pangkat otomatis, dan e-KGB.',
    indikatorKunci: [
      'Integrasi data SIMPEG BP Batam dengan layanan SIASN BKN',
      'Presensi biometrik mobile dengan geolokasi valid dan anti-spoofing',
      'Digitalisasi 96% arsip naskah kepegawaian (e-Dossier paperless)',
    ],
    regulasiAcuan: 'Perpres No. 95/2018 tentang SPBE & Perka BKN No. 18/2020',
  },
];

// REFORMASI BIROKRASI (8 AREA PERUBAHAN & INDEKS REFORMASI BIROKRASI)
export interface ReformasiBirokrasiAreaItem {
  no: number;
  namaKomponen: string;
  singkatan: string;
  bobot: number; // %
  target: number;
  nilai: number; // Nilai Indeks
  capaianPersen: number;
  indeks: number; // 0.0 - 1.0
  predikat: string;
  deskripsi: string;
  subKomponenRingkas: string;
}

export const REFORMASI_BIROKRASI_8_AREA_DETAIL: ReformasiBirokrasiAreaItem[] = [
  {
    no: 1,
    namaKomponen: 'Manajemen Perubahan',
    singkatan: 'Manajemen Perubahan',
    bobot: 5.0,
    target: 4.0,
    nilai: 4.15,
    capaianPersen: 83.0,
    indeks: 0.83,
    predikat: 'Sangat Baik',
    deskripsi: 'Pembangunan Zona Integritas (WBK/WBBM), pembentukan Tim Reformasi Birokrasi terpadu, Road Map RB BP Batam, dan internalisasi Core Values ASN BerAKHLAK.',
    subKomponenRingkas: 'Tim RB (1.70) • Pembangunan ZI Menuju WBK (1.25) • Budaya BerAKHLAK (1.20)',
  },
  {
    no: 2,
    namaKomponen: 'Deregulasi & Simplifikasi Kebijakan',
    singkatan: 'Deregulasi Kebijakan',
    bobot: 5.0,
    target: 3.8,
    nilai: 4.10,
    capaianPersen: 82.0,
    indeks: 0.82,
    predikat: 'Sangat Baik',
    deskripsi: 'Penataan regulasi internal, harmonisasi peraturan perundang-undangan (Perka/Kepka), debirokratisasi perizinan investasi, dan kemudahan berusaha di KPBPB Batam.',
    subKomponenRingkas: 'Harmonisasi Perka (2.10) • Deregulasi Perizinan Investasi KEK (2.00)',
  },
  {
    no: 3,
    namaKomponen: 'Penataan dan Penguatan Organisasi (Kelembagaan)',
    singkatan: 'Kelembagaan Organisasi',
    bobot: 6.0,
    target: 4.6,
    nilai: 4.95,
    capaianPersen: 82.5,
    indeks: 0.825,
    predikat: 'Sangat Baik',
    deskripsi: 'Evaluasi kelembagaan mandiri & MenPAN-RB, penataan struktur organisasi agile dan proporsional, serta penguatan tata kelola 4 badan usaha komersial.',
    subKomponenRingkas: 'Kematangan Struktur (2.50) • SOTK Proporsional & Unit Bisnis BLU (2.45)',
  },
  {
    no: 4,
    namaKomponen: 'Penataan Tata Laksana (Proses Bisnis & SPBE)',
    singkatan: 'Tata Laksana & SPBE',
    bobot: 7.0,
    target: 5.5,
    nilai: 5.82,
    capaianPersen: 83.14,
    indeks: 0.831,
    predikat: 'Sangat Baik',
    deskripsi: 'Penyusunan Peta Proses Bisnis terintegrasi, digitalisasi SOP administrasi perkantoran, dan implementasi Arsitektur Sistem Pemerintahan Berbasis Elektronik (SPBE).',
    subKomponenRingkas: 'Peta Probis & SOP Digital (2.92) • Arsitektur SPBE & Integrasi TIK (2.90)',
  },
  {
    no: 5,
    namaKomponen: 'Penataan Sistem Manajemen SDM Aparatur',
    singkatan: 'Manajemen SDM Merit',
    bobot: 10.0,
    target: 8.0,
    nilai: 8.56,
    capaianPersen: 85.6,
    indeks: 0.856,
    predikat: 'Sangat Baik',
    deskripsi: 'Penerapan Sistem Merit Kategori IV (342.5 Poin), manajemen talenta pegawai berbasis merit, penilaian SKP terukur, dan program pengembangan kompetensi berkelanjutan.',
    subKomponenRingkas: 'Sistem Merit & Talent Pool (4.35) • Kinerja SKP & Diklat Pegawai (4.21)',
  },
  {
    no: 6,
    namaKomponen: 'Penguatan Akuntabilitas Kinerja',
    singkatan: 'Akuntabilitas SAKIP',
    bobot: 10.0,
    target: 8.0,
    nilai: 8.27,
    capaianPersen: 82.7,
    indeks: 0.827,
    predikat: 'Sangat Baik',
    deskripsi: 'Penerapan SAKIP menyeluruh (Nilai SAKIP 82.68 Predikat A), cascading sasaran Perkin hingga level individu, serta efektivitas alokasi anggaran berbasis hasil.',
    subKomponenRingkas: 'Kualitas Dokumen Renja & Perkin (4.15) • Pengukuran, Evaluasi & LAKIP (4.12)',
  },
  {
    no: 7,
    namaKomponen: 'Penguatan Pengawasan Intern',
    singkatan: 'Pengawasan & SPIP',
    bobot: 10.0,
    target: 8.0,
    nilai: 8.42,
    capaianPersen: 84.2,
    indeks: 0.842,
    predikat: 'Sangat Baik',
    deskripsi: 'Maturitas SPIP Terintegrasi (3.42 Level 3), tingkat kepatuhan LHKPN 100%, Whistleblowing System (WBS), pengendalian gratifikasi, dan Manajemen Risiko Indeks (MRI 3.35).',
    subKomponenRingkas: 'Maturitas SPIP & Manajemen Risiko (4.22) • Kepatuhan LHKPN & WBS (4.20)',
  },
  {
    no: 8,
    namaKomponen: 'Peningkatan Kualitas Pelayanan Publik',
    singkatan: 'Pelayanan Publik & PEKPPP',
    bobot: 10.0,
    target: 8.5,
    nilai: 8.87,
    capaianPersen: 88.7,
    indeks: 0.887,
    predikat: 'Sangat Baik',
    deskripsi: 'Pemantauan Evaluasi Kinerja Penyelenggara Pelayanan Publik (PEKPPP 4.38 Kategori A), Survei Kepuasan Masyarakat (SKM 88.94), dan tindak lanjut aduan SP4N LAPOR 96.2%.',
    subKomponenRingkas: 'Standar Pelayanan MPP/PTSP & PEKPPP (4.50) • SKM & Penanganan Aduan (4.37)',
  },
];

// INDEKS MATURITAS SPIP (5 UNSUR / KOMPONEN PENILAIAN BPKP)
export interface MaturitasSpipUnsurItem {
  no: number;
  namaKomponen: string;
  singkatan: string;
  bobot: number; // %
  target: number;
  skor: number; // Skor langsung (1.00 - 5.00)
  skorTerbobot: number;
  capaianPersen: number;
  level: string;
  fokusArea: string;
  subUnsurRingkas: string;
}

export const MATURITAS_SPIP_5_UNSUR_DETAIL: MaturitasSpipUnsurItem[] = [
  {
    no: 1,
    namaKomponen: 'Lingkungan Pengendalian',
    singkatan: 'Lingkungan Pengendalian',
    bobot: 30.0,
    target: 3.20,
    skor: 3.48,
    skorTerbobot: 1.04,
    capaianPersen: 108.8,
    level: 'Level 3 (Terdefinisi)',
    fokusArea: 'Penegakan integritas, kode etik pegawai, komitmen kompetensi sumber daya manusia, kepemimpinan kondusif, dan struktur organisasi akuntabel.',
    subUnsurRingkas: 'Integritas & Etika (3.52) • Komitmen Kompetensi (3.46) • Pendelegasian Wewenang (3.45)',
  },
  {
    no: 2,
    namaKomponen: 'Penilaian Risiko',
    singkatan: 'Penilaian Risiko',
    bobot: 20.0,
    target: 3.20,
    skor: 3.35,
    skorTerbobot: 0.67,
    capaianPersen: 104.7,
    level: 'Level 3 (Terdefinisi)',
    fokusArea: 'Identifikasi risiko strategis & operasional unit kerja, piagam register risiko 24 satker, serta mitigasi risiko fraud dan korupsi.',
    subUnsurRingkas: 'Risiko Strategis Organisasi (3.38) • Analisis Fraud & Mitigasi Pengendalian (3.32)',
  },
  {
    no: 3,
    namaKomponen: 'Kegiatan Pengendalian',
    singkatan: 'Kegiatan Pengendalian',
    bobot: 25.0,
    target: 3.20,
    skor: 3.44,
    skorTerbobot: 0.86,
    capaianPersen: 107.5,
    level: 'Level 3 (Terdefinisi)',
    fokusArea: 'Reviu kinerja pimpinan, pengendalian sistem informasi & otorisasi transaksi, pemisahan fungsi tugas, dan pengamanan aset fisik BMN.',
    subUnsurRingkas: 'Reviu Supervisi Atasan (3.46) • Pengendalian Sistem TIK (3.42) • Pemisahan Fungsi Keuangan (3.43)',
  },
  {
    no: 4,
    namaKomponen: 'Informasi dan Komunikasi',
    singkatan: 'Informasi & Komunikasi',
    bobot: 10.0,
    target: 3.20,
    skor: 3.38,
    skorTerbobot: 0.34,
    capaianPersen: 105.6,
    level: 'Level 3 (Terdefinisi)',
    fokusArea: 'Ketersediaan saluran whistleblowing system (WBS), keterbukaan informasi publik (PPID), koordinasi lintas satker, dan transparansi laporan berkala.',
    subUnsurRingkas: 'Kanal WBS & Pengaduan (3.40) • Keterbukaan Informasi & Integrasi Lintas Satker (3.36)',
  },
  {
    no: 5,
    namaKomponen: 'Pemantauan Pengendalian Intern',
    singkatan: 'Pemantauan Pengendalian',
    bobot: 15.0,
    target: 3.20,
    skor: 3.46,
    skorTerbobot: 0.52,
    capaianPersen: 108.1,
    level: 'Level 3 (Terdefinisi)',
    fokusArea: 'Pemantauan berkelanjutan, evaluasi terpisah oleh Satuan Pengawas Intern (SPI), dan percepatan penyelesaian rekomendasi tindak lanjut temuan BPK RI.',
    subUnsurRingkas: 'Pemantauan Berkelanjutan & Audit SPI (3.48) • Tindak Lanjut Temuan BPK/BPKP (3.44)',
  },
];

// 4. DATA DETAIL STATISTIK KARYAWAN BERDASARKAN STATUS KEPEGAWAIAN (BUKU SATU DATA HAL. 1-2)
export interface PegawaiStatusStat {
  id: string;
  statusPegawai: string;
  kodeStatus: string;
  jumlah: number;
  persentase: number;
  warna: string;
  deskripsi: string;
  komposisiGender: { pria: number; wanita: number };
}

export const PEGAWAI_STATUS_DETAIL_DATA: PegawaiStatusStat[] = [
  {
    id: 'pns',
    statusPegawai: 'Pegawai Negeri Sipil (PNS)',
    kodeStatus: 'PNS',
    jumlah: 1042,
    persentase: 34.99,
    warna: '#2563EB',
    deskripsi: 'Aparatur Sipil Negara tetap berdasarkan penetapan NIP BKN RI dan SK Kepala BP Batam.',
    komposisiGender: { pria: 618, wanita: 424 },
  },
  {
    id: 'p2k',
    statusPegawai: 'Pegawai Tetap BP Batam (P2K)',
    kodeStatus: 'P2K',
    jumlah: 872,
    persentase: 29.28,
    warna: '#0D9488',
    deskripsi: 'Pegawai berstatus tetap non-PNS berdasarkan SK Kepala BP Batam dengan hak pensiun & remunerasi.',
    komposisiGender: { pria: 532, wanita: 340 },
  },
  {
    id: 'pppk',
    statusPegawai: 'PPPK (P3K)',
    kodeStatus: 'PPPK',
    jumlah: 485,
    persentase: 16.29,
    warna: '#7C3AED',
    deskripsi: 'Pegawai Pemerintah dengan Perjanjian Kerja formasi fungsional, guru, dan teknis spesialis.',
    komposisiGender: { pria: 279, wanita: 206 },
  },
  {
    id: 'ptt',
    statusPegawai: 'Pegawai Tidak Tetap (PTT)',
    kodeStatus: 'PTT',
    jumlah: 396,
    persentase: 13.30,
    warna: '#EA580C',
    deskripsi: 'Pegawai kontrak pendukung kelancaran operasional, keamanan, dan administrasi perkantoran.',
    komposisiGender: { pria: 262, wanita: 134 },
  },
  {
    id: 'profesional',
    statusPegawai: 'Tenaga Profesional / Kontrak Khusus',
    kodeStatus: 'PROF',
    jumlah: 183,
    persentase: 6.14,
    warna: '#D97706',
    deskripsi: 'Spesialis medis dokter RSBP, konsultan ahli maritim, analis pelabuhan laut, IT architect & hukum.',
    komposisiGender: { pria: 105, wanita: 78 },
  },
];

// 5. DATA DETAIL STATISTIK KARYAWAN BERDASARKAN JENJANG PENDIDIKAN
export interface PegawaiPendidikanStat {
  id: string;
  jenjang: string;
  kategoriTingkat: 'Pendidikan Tinggi (S1-S3)' | 'Vokasi (Diploma)' | 'Pendidikan Menengah/Dasar';
  jumlah: number;
  persentase: number;
  warna: string;
  jabatanDominan: string;
}

export const PEGAWAI_PENDIDIKAN_DETAIL_DATA: PegawaiPendidikanStat[] = [
  {
    id: 's3',
    jenjang: 'S3 (Doktor)',
    kategoriTingkat: 'Pendidikan Tinggi (S1-S3)',
    jumlah: 24,
    persentase: 0.81,
    warna: '#4338CA',
    jabatanDominan: 'Pimpinan Tinggi Madya/Pratama, Ahli Utama, Dokter Spesialis Konsultan',
  },
  {
    id: 's2',
    jenjang: 'S2 (Magister)',
    kategoriTingkat: 'Pendidikan Tinggi (S1-S3)',
    jumlah: 312,
    persentase: 10.48,
    warna: '#2563EB',
    jabatanDominan: 'Administrator, Pengawas, Dokter Spesialis, Analis Kebijakan Ahli Madya',
  },
  {
    id: 's1',
    jenjang: 'S1 / D4 (Sarjana)',
    kategoriTingkat: 'Pendidikan Tinggi (S1-S3)',
    jumlah: 1584,
    persentase: 53.19,
    warna: '#0284C7',
    jabatanDominan: 'Pranata Komputer, Pengelola Pengadaan, Penata Kelola, Medis Umum, Analis Keuangan',
  },
  {
    id: 'd3',
    jenjang: 'D3 (Diploma)',
    kategoriTingkat: 'Vokasi (Diploma)',
    jumlah: 428,
    persentase: 14.37,
    warna: '#0D9488',
    jabatanDominan: 'Perawat Terampil, Teknisi Infrastruktur, Pengelola Arsip, Operator Pelabuhan',
  },
  {
    id: 'sma',
    jenjang: 'SMA / SMK',
    kategoriTingkat: 'Pendidikan Menengah/Dasar',
    jumlah: 562,
    persentase: 18.87,
    warna: '#F59E0B',
    jabatanDominan: 'Petugas Pengamanan (Ditpam), Pengadministrasi Umum, Petugas Lapangan Pemeliharaan',
  },
  {
    id: 'smp_sd',
    jenjang: 'SMP / SD',
    kategoriTingkat: 'Pendidikan Menengah/Dasar',
    jumlah: 68,
    persentase: 2.28,
    warna: '#94A3B8',
    jabatanDominan: 'Petugas Kebersihan Gedung, Juru Mudi, Caraka & Peramu Bhakti',
  },
];

// 6. MATRIKS SILANG (CROSS-TABULATION): DISTRIBUSI STATUS KEPEGAWAIAN VS JENJANG PENDIDIKAN
export interface MatriksStatusPendidikan {
  statusId: string;
  statusNama: string;
  kode: string;
  totalPegawai: number;
  s3: number;
  s2: number;
  s1_d4: number;
  d3: number;
  sma_smk: number;
  smp_sd: number;
  persenSarjanaPlus: number; // (S1 + S2 + S3) / Total
}

export const MATRIKS_STATUS_PENDIDIKAN_DATA: MatriksStatusPendidikan[] = [
  {
    statusId: 'pns',
    statusNama: 'Pegawai Negeri Sipil (PNS)',
    kode: 'PNS',
    totalPegawai: 1042,
    s3: 18,
    s2: 196,
    s1_d4: 614,
    d3: 132,
    sma_smk: 78,
    smp_sd: 4,
    persenSarjanaPlus: 79.46,
  },
  {
    statusId: 'p2k',
    statusNama: 'Pegawai Tetap BP Batam (P2K)',
    kode: 'P2K',
    totalPegawai: 872,
    s3: 4,
    s2: 74,
    s1_d4: 486,
    d3: 148,
    sma_smk: 142,
    smp_sd: 18,
    persenSarjanaPlus: 64.68,
  },
  {
    statusId: 'pppk',
    statusNama: 'PPPK (P3K)',
    kode: 'PPPK',
    totalPegawai: 485,
    s3: 0,
    s2: 24,
    s1_d4: 312,
    d3: 94,
    sma_smk: 55,
    smp_sd: 0,
    persenSarjanaPlus: 69.28,
  },
  {
    statusId: 'ptt',
    statusNama: 'Pegawai Tidak Tetap (PTT)',
    kode: 'PTT',
    totalPegawai: 396,
    s3: 0,
    s2: 6,
    s1_d4: 98,
    d3: 42,
    sma_smk: 216,
    smp_sd: 34,
    persenSarjanaPlus: 26.26,
  },
  {
    statusId: 'profesional',
    statusNama: 'Tenaga Profesional / Kontrak Khusus',
    kode: 'PROF',
    totalPegawai: 183,
    s3: 2,
    s2: 12,
    s1_d4: 74,
    d3: 12,
    sma_smk: 71,
    smp_sd: 12,
    persenSarjanaPlus: 48.09,
  },
];

