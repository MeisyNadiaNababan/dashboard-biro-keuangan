// Data source for Pusat Harmonisasi Kebijakan Strategis (PHKS)
// Sesuai Dokumen Standarisasi Atribut Satu Data BP Batam (Halaman 12 - 13: 7 Dataset)

export interface PhksIkkPolicyItem {
  nomor: string;
  namaKebijakan: string;
  tahunPenetapan: string;
  periodeBulan: string;
  mak: string;
  targetBelanja: number;
  analisInstansi: string;
  skorIkk: number;
  dimensiUnggul: string;
  status: 'Efektif' | 'Reviu Berkala' | 'Harmonisasi Lanjut';
}

export interface PhksTarifLayananDetail {
  unit: string;
  layanan: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
  level6: string;
  level7: string;
  satuanLayanan: string;
  bentukTarif: string;
  unitCost: number;
  tarifBerlaku: number;
  tarifBerlakuMaksimal: number;
  levelPengaturanTarif: string;
  dasarHukum: string;
  statusTarif: 'Sesuai Biaya Riil' | 'Perlu Penyesuaian' | 'Evaluasi Subsidi';
  tahun: string;
  keterangan: string;
}

export interface PhksSinkronisasiRegulasi {
  nomor: string;
  tentang: string;
  kategori: 'Perka' | 'Kepka' | 'PP / Permen' | 'UU Ciptaker';
  jenis: 'INTERNAL' | 'EKSTERNAL';
  status: 'Harmonis' | 'Dalam Pembahasan' | 'Perlu Revisi';
  periode: string;
  tahun: string;
  catatanHarmonisasi: string;
}

export interface PhksSurveiKewajaran {
  lokasi: string;
  tahun: string;
  instrumentPenelitian: string;
  kriteria: string;
  jumlahResponden: number;
  persentaseWajar: number;
  rekomendasi: string;
}

export interface PhksRapimItem {
  id: string;
  tanggalRapat: string;
  judulRapat: string;
  tempat: string;
  waktu: string;
  notaDinasPengantar: string;
  matrikTindakLanjut: string;
  tahun: string;
  statusTindakLanjut: 'Selesai 100%' | 'On-Progress' | 'Koordinasi Teknis';
  unitPelaksana: string;
}

// 1. Dataset #1: Evaluasi Kualitas Kebijakan BP Batam (IKK 71.80)
export const PHKS_IKK_POLICIES: PhksIkkPolicyItem[] = [
  {
    nomor: 'Perka BP Batam No. 3/2024',
    namaKebijakan: 'Tata Cara Penetapan Tarif Sewa Lahan dan Perpanjangan Hak Atas Tanah',
    tahunPenetapan: '2024',
    periodeBulan: 'Januari 2024',
    mak: '521211',
    targetBelanja: 450000000,
    analisInstansi: 'Pusat Harmonisasi Kebijakan / Dit. Lahan',
    skorIkk: 82.5,
    dimensiUnggul: 'Formulasi & Konsultasi Publik',
    status: 'Efektif',
  },
  {
    nomor: 'Perka BP Batam No. 8/2024',
    namaKebijakan: 'Standarisasi Pelayanan Terpadu Satu Pintu Berbasis OSS-RBA di MPP',
    tahunPenetapan: '2024',
    periodeBulan: 'Maret 2024',
    mak: '521219',
    targetBelanja: 380000000,
    analisInstansi: 'Pusat Harmonisasi Kebijakan / PTSP',
    skorIkk: 86.0,
    dimensiUnggul: 'Implementasi & Kepatuhan SLA',
    status: 'Efektif',
  },
  {
    nomor: 'Perka BP Batam No. 12/2024',
    namaKebijakan: 'Pemanfaatan Infrastruktur Bersama Koridor Multi-Utility Tunnel Batam',
    tahunPenetapan: '2024',
    periodeBulan: 'Juni 2024',
    mak: '521211',
    targetBelanja: 520000000,
    analisInstansi: 'Pusat Harmonisasi Kebijakan / PDSI',
    skorIkk: 74.2,
    dimensiUnggul: 'Agenda Setting & Kajian Dampak',
    status: 'Harmonisasi Lanjut',
  },
  {
    nomor: 'Kepka BP Batam No. 44/2024',
    namaKebijakan: 'Pedoman Penilaian Kinerja Badan Usaha Pengelola Aset Komersial BP Batam',
    tahunPenetapan: '2024',
    periodeBulan: 'Agustus 2024',
    mak: '521219',
    targetBelanja: 290000000,
    analisInstansi: 'Pusat Harmonisasi Kebijakan / Biro Keuangan',
    skorIkk: 78.4,
    dimensiUnggul: 'Evaluasi Dampak Finansial',
    status: 'Efektif',
  },
  {
    nomor: 'Perka BP Batam No. 19/2024',
    namaKebijakan: 'Pengendalian dan Penataan Reklame & Media Informasi Ruang Luar Kawasan',
    tahunPenetapan: '2024',
    periodeBulan: 'Oktober 2024',
    mak: '521211',
    targetBelanja: 310000000,
    analisInstansi: 'Pusat Harmonisasi Kebijakan / Dit. Pam Aset',
    skorIkk: 68.5,
    dimensiUnggul: 'Agenda Setting',
    status: 'Reviu Berkala',
  },
];

// 2. Dataset #3: Daftar Tarif Layanan BP Batam (7 Level Tarif Lengkap)
export const PHKS_TARIF_LAYANAN: PhksTarifLayananDetail[] = [
  {
    unit: 'Badan Usaha Pelabuhan',
    layanan: 'Jasa Dermaga Tambat Kapal Peti Kemas Domestik/Internasional',
    level1: 'Transportasi',
    level2: 'Kepelabuhanan',
    level3: 'Dermaga Batu Ampar',
    level4: 'Kapal Cargo',
    level5: 'Panjang Kapal >150m',
    level6: 'Hari Kalender',
    level7: 'Non-Perintis',
    satuanLayanan: 'GT/Etmal',
    bentukTarif: 'Tarif Pokok Layanan',
    unitCost: 115,
    tarifBerlaku: 135,
    tarifBerlakuMaksimal: 160,
    levelPengaturanTarif: 'Perka Kepala BP Batam (PMK No. 148/2016)',
    dasarHukum: 'Perka No. 17 Tahun 2023',
    statusTarif: 'Sesuai Biaya Riil',
    tahun: '2025',
    keterangan: 'Evaluasi penyesuaian otomatis terhadap indeks inflasi regional dan kurs USD.',
  },
  {
    unit: 'Badan Usaha Rumah Sakit (RSBP)',
    layanan: 'Paket Kateterisasi Jantung (Cath Lab) Modern Mandiri',
    level1: 'Kesehatan',
    level2: 'Rawat Inap Khusus',
    level3: 'Pusat Jantung Terpadu',
    level4: 'Tindakan Invasif',
    level5: 'Kelas VIP / Eksekutif',
    level6: 'Prosedural Standar',
    level7: 'Non-BPJS Mandiri',
    satuanLayanan: 'Paket Tindakan',
    bentukTarif: 'Unit Cost + Sarana Medik',
    unitCost: 28500000,
    tarifBerlaku: 32000000,
    tarifBerlakuMaksimal: 38000000,
    levelPengaturanTarif: 'Perka Kepala BP Batam',
    dasarHukum: 'Perka No. 5 Tahun 2022',
    statusTarif: 'Sesuai Biaya Riil',
    tahun: '2025',
    keterangan: 'Tarif bersaing 45% lebih ekonomis dibandingkan rujukan rumah sakit di Johor/Singapura.',
  },
  {
    unit: 'BU SPAM Fasling',
    layanan: 'Pengolahan Limbah Industri B3 Kawasan KPLI Kabil',
    level1: 'Lingkungan Hidup',
    level2: 'KPLI Sembrulang',
    level3: 'Insinerator & Sludge',
    level4: 'Limbah Padat B3',
    level5: 'Tingkat Bahaya Kategori 1',
    level6: 'Metrik Ton',
    level7: 'Tenant Non-Kabil',
    satuanLayanan: 'Ton / M3',
    bentukTarif: 'Tarif Progresif',
    unitCost: 1850000,
    tarifBerlaku: 2200000,
    tarifBerlakuMaksimal: 2750000,
    levelPengaturanTarif: 'Perka Kepala BP Batam',
    dasarHukum: 'Perka No. 9 Tahun 2023',
    statusTarif: 'Sesuai Biaya Riil',
    tahun: '2025',
    keterangan: 'Menampung 1.850 ton limbah B3 industri galangan kapal dan elektronik.',
  },
  {
    unit: 'Direktorat Pengelolaan Lahan',
    layanan: 'Uang Wajib Tahunan (UWT) Alokasi Baru Kawasan Industri Mukakuning',
    level1: 'Pertanahan',
    level2: 'Komersial / Industri',
    level3: 'Mukakuning Sub-Wilayah C',
    level4: 'Pemberian Baru 30 Tahun',
    level5: 'Luas >10.000 m2',
    level6: 'Jalan Kolektor Primer',
    level7: 'PMA / PMDN',
    satuanLayanan: 'Per Meter Persegi (m2)',
    bentukTarif: 'Tarif Nilai Perolehan Hak',
    unitCost: 110000,
    tarifBerlaku: 135000,
    tarifBerlakuMaksimal: 155000,
    levelPengaturanTarif: 'Perka Kepala BP Batam (PMK No. 95/2021)',
    dasarHukum: 'Perka No. 22 Tahun 2021',
    statusTarif: 'Sesuai Biaya Riil',
    tahun: '2025',
    keterangan: 'Kepastian tarif UWT 30 tahun menjamin investasi jangka panjang industri semikonduktor.',
  },
  {
    unit: 'Badan Usaha Bandara (Hang Nadim)',
    layanan: 'Pelayanan Jasa Penumpang Pesawat Udara (PJP2U) Internasional',
    level1: 'Kebandaraan',
    level2: 'Terminal Keberangkatan',
    level3: 'Penerbangan Internasional',
    level4: 'Penumpang Reguler',
    level5: 'Langsung (Direct)',
    level6: 'Terminal 1 Eksisting',
    level7: 'Semua Maskapai',
    satuanLayanan: 'Per Penumpang',
    bentukTarif: 'User Charge PSC',
    unitCost: 140000,
    tarifBerlaku: 175000,
    tarifBerlakuMaksimal: 200000,
    levelPengaturanTarif: 'Perka Kepala BP Batam / Kemenhub',
    dasarHukum: 'Perka No. 11 Tahun 2022',
    statusTarif: 'Sesuai Biaya Riil',
    tahun: '2025',
    keterangan: 'Termasuk fasilitas automated immigration autogate dan baggage handling system.',
  },
];

// 3. Dataset #2 & #4: Sinkronisasi Regulasi Internal & Eksternal
export const PHKS_SINKRONISASI_REGULASI: PhksSinkronisasiRegulasi[] = [
  {
    nomor: 'PP No. 41 Tahun 2021',
    tentang: 'Penyelenggaraan Kawasan Perdagangan Bebas dan Pelabuhan Bebas (KPBPB)',
    kategori: 'PP / Permen',
    jenis: 'EKSTERNAL',
    status: 'Harmonis',
    periode: 'Peraturan Pemerintah RI',
    tahun: '2021-2025',
    catatanHarmonisasi: 'Telah diadopsi penuh dalam 18 Perka turunan perizinan dan pengelolaan kawasan.',
  },
  {
    nomor: 'Permenko Perekonomian No. 12/2024',
    tentang: 'Perubahan Daftar Inventarisasi Izin Berusaha Sektor Maritim di Kawasan Bebas',
    kategori: 'PP / Permen',
    jenis: 'EKSTERNAL',
    status: 'Harmonis',
    periode: 'Triwulan I 2024',
    tahun: '2024',
    catatanHarmonisasi: 'Sinkronisasi pelimpahan 4 norma standar perizinan TUKS dan SKKBM ke PTSP BP Batam.',
  },
  {
    nomor: 'Rancangan Perka BP Batam 2025',
    tentang: 'Penyederhanaan Proses Pelayanan Perpanjangan Alokasi Tanah Melalui SuperApps',
    kategori: 'Perka',
    jenis: 'INTERNAL',
    status: 'Dalam Pembahasan',
    periode: 'Triwulan II 2025',
    tahun: '2025',
    catatanHarmonisasi: 'Integrasi tanda tangan elektronik (TTE) BSrE dan integrasi data spasial geospasial.',
  },
  {
    nomor: 'Rancangan Kepka BP Batam 2025',
    tentang: 'Penetapan Formula Indeks Kepuasan Pelanggan Data Center & Cloud BP Batam',
    kategori: 'Kepka',
    jenis: 'INTERNAL',
    status: 'Harmonis',
    periode: 'Triwulan I 2025',
    tahun: '2025',
    catatanHarmonisasi: 'Standar baku SLA Tier-3 dan matriks restitusi downtime untuk tenant publik/swasta.',
  },
];

// 4. Dataset #5: Survei Kewajaran & Evaluasi Tarif (89.5% Skor Validitas)
export const PHKS_SURVEI_KEWAJARAN: PhksSurveiKewajaran[] = [
  { lokasi: 'Kawasan Pelabuhan Batu Ampar', tahun: '2025', instrumentPenelitian: 'Kuesioner WTP (Willingness to Pay) & Cost-Recovery Ratio', kriteria: 'Tarif Tambat & Bongkar Muat', jumlahResponden: 124, persentaseWajar: 88.7, rekomendasi: 'Tarif wajar dan kompetitif dibanding Pelabuhan Pasir Gudang Johor.' },
  { lokasi: 'Mal Pelayanan Publik (MPP)', tahun: '2025', instrumentPenelitian: 'Survei Persepsi Tarif Non-Perizinan & Transparansi Biaya', kriteria: 'Nol Rupiah (Zero-Fee) Perizinan Dasar', jumlahResponden: 350, persentaseWajar: 95.2, rekomendasi: 'Tingkat kepuasan sangat tinggi atas layanan bebas pungli dan transparan.' },
  { lokasi: 'RSBP Sekupang', tahun: '2025', instrumentPenelitian: 'Analisis Unit Cost Tindakan Medik Invasif & Benchmark Swasta', kriteria: 'Tarif Cath Lab & Bedah Jantung', jumlahResponden: 86, persentaseWajar: 91.4, rekomendasi: 'Memenuhi tolak ukur keterjangkauan masyarakat lokal dan regional.' },
  { lokasi: 'KPLI Sembrulang Kabil', tahun: '2025', instrumentPenelitian: 'Audit Kewajaran Biaya Pengolahan Sludge & Incineration', kriteria: 'Tarif Limbah Padat B3', jumlahResponden: 58, persentaseWajar: 82.8, rekomendasi: 'Kewajaran diterima tenant industri galangan kapal dan fabrikasi migas.' },
];

// 5. Dataset #6 & #7: Daftar Risalah RDP & Monitoring Tindak Lanjut Rapim (76 Nota Dinas, 94.5% Tuntas)
export const PHKS_RAPIM_LIST: PhksRapimItem[] = [
  {
    id: 'rapim-01',
    tanggalRapat: '14 Januari 2026',
    judulRapat: 'Rapim Koordinasi Pelimpahan Wewenang Norma Standar Prosedur Kriteria (NSPK) OSS-RBA',
    tempat: 'Ruang Rapat Utama Pimpinan Gedung BIDA Lt. 3',
    waktu: '09:00 - 12:30 WIB',
    notaDinasPengantar: 'ND-014/KA/PHKS/01/2026',
    matrikTindakLanjut: 'Draft Perka SOP PTSP diterbitkan, sinkronisasi API webhook Kementerian Investasi/BKPM selesai.',
    tahun: '2026',
    statusTindakLanjut: 'Selesai 100%',
    unitPelaksana: 'PTSP & Biro Hukum',
  },
  {
    id: 'rapim-02',
    tanggalRapat: '05 Februari 2026',
    judulRapat: 'Evaluasi Penyesuaian Tarif Sewa Ruang Server Data Center Tier-3 untuk Tenant KEK Nongsa',
    tempat: 'Ruang Rapat Deputi Kebijakan Strategis Lt. 2',
    waktu: '13:30 - 16:00 WIB',
    notaDinasPengantar: 'ND-032/DEP.A1/PHKS/02/2026',
    matrikTindakLanjut: 'Survei benchmark pasar cloud regional selesai, simulasi payback period 4,2 tahun disetujui.',
    tahun: '2026',
    statusTindakLanjut: 'Selesai 100%',
    unitPelaksana: 'PDSI & Biro Keuangan',
  },
  {
    id: 'rapim-03',
    tanggalRapat: '28 Februari 2026',
    judulRapat: 'Harmonisasi Draft Masterplan Drainase & Alokasi Anggaran Penanganan Titik Banjir Sei Beduk',
    tempat: 'Ruang Rapat Pusren Gedung BIDA Barat',
    waktu: '10:00 - 12:00 WIB',
    notaDinasPengantar: 'ND-058/DEP.A1/PHKS/02/2026',
    matrikTindakLanjut: 'Alokasi DIPA Rp 2,85 Miliar diselaraskan dengan rencana kerja Dit. Pembangunan Infrastruktur.',
    tahun: '2026',
    statusTindakLanjut: 'On-Progress',
    unitPelaksana: 'Pusren & Dit. Pembangunan',
  },
  {
    id: 'rapim-04',
    tanggalRapat: '18 Maret 2026',
    judulRapat: 'Penyusunan Naskah Rekomendasi Sinkronisasi PP 41/2021 Terkait Fasilitas Kepabeanan KPBPB',
    tempat: 'Ruang Rapat Badan Pengusahaan Batam',
    waktu: '14:00 - 17:00 WIB',
    notaDinasPengantar: 'ND-076/DEP.A1/PHKS/03/2026',
    matrikTindakLanjut: 'Surat resmi rekomendasi harmonisasi ke Kemenko Perekonomian & Kemenkeu telah dikirimkan.',
    tahun: '2026',
    statusTindakLanjut: 'Selesai 100%',
    unitPelaksana: 'PHKS & Dit. Lalu Lintas Barang',
  },
];
