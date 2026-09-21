// =====================================================================
// DATASET RESMI BIRO HUKUM BP BATAM
// Berdasarkan Dokumen Resmi: "Atribut Daftar Data Satu Data.pdf" (Halaman 2)
//
// 10 Dataset Resmi Biro Hukum BP Batam:
// 1. KAJIAN HUKUM / REKOMENDASI PENYELESAIAN (TANGGAL, TENTANG)
// 2. KEGIATAN PENDAMPINGAN HUKUM (TANGGAL, TENTANG)
// 3. PELAYANAN HUKUM NON LITIGASI (TANGGAL, TENTANG)
// 4. KEGIATAN PENANGANAN PERKARA (TANGGAL, TENTANG, JUMLAH DOKUMEN)
// 5. DAFTAR RANCANGAN PERATURAN BP BATAM (TANGGAL, TENTANG, JUMLAH DOKUMEN)
// 6. DAFTAR RANCANGAN KEPUTUSAN BP BATAM (TANGGAL, TENTANG, JUMLAH DOKUMEN)
// 7. DAFTAR RANCANGAN PERJANJIAN DAN NOTA KESEPAHAMAN BP BATAM (TANGGAL, TENTANG, JUMLAH DOKUMEN)
// 8. DAFTAR REGULASI YANG RELEVAN DENGAN INVESTASI (TANGGAL, TENTANG, JUMLAH DOKUMEN)
// 9. PERSENTASE PENANGANAN PERKARA YANG DISELESAIKAN (TANGGAL, TENTANG)
// 10. PERSENTASE PELAYANAN DAN PENANGANAN PERMASALAHAN HUKUM YANG DISELESAIKAN (TANGGAL, TENTANG)
// =====================================================================

export interface KegiatanPerkaraItem {
  id: string;
  nomorPerkara: string;
  tanggal: string;
  tentang: string;
  jumlahDokumen: number;
  instansiPengadilan: string;
  klasifikasi: 'Perdata' | 'Tata Usaha Negara (TUN)' | 'Pidana Khusus' | 'Ketenagakerjaan' | 'Arbitrase';
  status: 'Dalam Proses' | 'Selesai Inkracht' | 'Mediasi';
  tahapan: string;
  unitTerkait: string;
  tahun: number;
  mitigasiNilaiSengketaMiliar: number;
}

export interface LitigasiPerkaraItem {
  id: string;
  nomorPerkara: string;
  tanggal: string;
  tentang: string;
  klasifikasi: string;
  instansi: string;
  persentaseSelesai: number; // 0 - 100%
  status: 'Selesai (Inkracht)' | 'Sidang Banding/Kasasi' | 'Sidang Tingkat I';
  tahun: number;
  hasilPutusan: 'Dimenangkan BP Batam' | 'Perdamaian / Akta Dading' | 'Dalam Proses';
}

export interface NonLitigasiPerkaraItem {
  id: string;
  nomorRegistrasi: string;
  tanggal: string;
  tentang: string;
  jenisLayanan: 'Mediasi / Negosiasi' | 'Konsultasi Hukum' | 'Pendapat Hukum (Legal Opinion)' | 'Klarifikasi Sengketa Lahan';
  pemohon: string;
  persentasePelayanan: number; // 0 - 100%
  status: 'Selesai Tuntas' | 'Dalam Proses Mediasi' | 'Penyusunan Rekomendasi';
  tahun: number;
}

export interface TemaPerkaraAgregat {
  tentang: string;
  klusterBidang: string;
  jumlahLitigasi: number;
  jumlahNonLitigasi: number;
  totalPenanganan: number; // Formula: SUM(Litigasi) + SUM(Non-Litigasi)
  tingkatKeberhasilanPersen: number;
  mitigasiRisikoAsetMiliar: number;
}

export interface RegulasiProdukHukumItem {
  id: string;
  jenis: 'Peraturan Kepala (Perka)' | 'Keputusan Kepala (Kepka)' | 'Perjanjian & MoU' | 'Regulasi Investasi';
  nomorDraft: string;
  tanggal: string;
  tentang: string;
  jumlahDokumen: number;
  tahap: 'Drafting' | 'Harmonisasi Kemenkumham' | 'Pembahasan Pleno' | 'Penetapan & JDIHN';
  unitPemrakarsa: string;
  relevanInvestasi: boolean;
  tahun: number;
}

export interface PendampinganHukumItem {
  id: string;
  tanggal: string;
  tentang: string;
  kategori: 'Kajian Hukum / Rekomendasi' | 'Pendampingan Hukum (Litigasi/Non)';
  mitraKerjasama: string; // Misal: Kejati Kepri / Kejari Batam (JPN), BPKP
  statusMitigasi: 'Selesai Rekomendasi' | 'Pendampingan Berjalan';
  nilaiPenyelamatanRpMiliar: number;
  tahun: number;
}

// ---------------------------------------------------------------------
// 1. DATASET #4: KEGIATAN PENANGANAN PERKARA (TANGGAL, TENTANG, JUMLAH DOKUMEN)
// ---------------------------------------------------------------------
export const KEGIATAN_PENANGANAN_PERKARA: KegiatanPerkaraItem[] = [
  {
    id: 'KP-01',
    nomorPerkara: '124/Pdt.G/2025/PN Btm',
    tanggal: '2026-03-12',
    tentang: 'Sengketa Tumpang Tindih Alokasi Lahan HPL BP Batam Kawasan Batam Centre',
    jumlahDokumen: 24,
    instansiPengadilan: 'Pengadilan Negeri Batam',
    klasifikasi: 'Perdata',
    status: 'Selesai Inkracht',
    tahapan: 'Putusan Inkracht (Menolak Gugatan Penggugat)',
    unitTerkait: 'Direktorat Pengelolaan Lahan',
    tahun: 2026,
    mitigasiNilaiSengketaMiliar: 85.0,
  },
  {
    id: 'KP-02',
    nomorPerkara: '18/G/2026/PTUN.TPI',
    tanggal: '2026-02-28',
    tentang: 'Gugatan Pembatalan Surat Keputusan Pengalokasian Lahan Industri Kabil',
    jumlahDokumen: 18,
    instansiPengadilan: 'PTUN Tanjungpinang',
    klasifikasi: 'Tata Usaha Negara (TUN)',
    status: 'Dalam Proses',
    tahapan: 'Pemeriksaan Saksi Ahli Tata Ruang',
    unitTerkait: 'Direktorat Pengelolaan Lahan',
    tahun: 2026,
    mitigasiNilaiSengketaMiliar: 42.5,
  },
  {
    id: 'KP-03',
    nomorPerkara: '89/Pdt.G/2025/PN Btm',
    tanggal: '2026-02-14',
    tentang: 'Wanprestasi Pembayaran Uang Wajib Tahunan (UWT) & Sewa Bangunan Aset BMN',
    jumlahDokumen: 15,
    instansiPengadilan: 'Pengadilan Negeri Batam',
    klasifikasi: 'Perdata',
    status: 'Selesai Inkracht',
    tahapan: 'Eksekusi Sukarela & Pelunasan Tunggakan',
    unitTerkait: 'Biro Keuangan & Dit. Pengamanan Aset',
    tahun: 2026,
    mitigasiNilaiSengketaMiliar: 18.2,
  },
  {
    id: 'KP-04',
    nomorPerkara: '05/Pdt.Sus-PHI/2026/PN Tpi',
    tanggal: '2026-01-22',
    tentang: 'Perselisihan Pemutusan Hubungan Kerja (PHK) Pekerja Kontrak Proyek Pelabuhan',
    jumlahDokumen: 12,
    instansiPengadilan: 'Pengadilan Hubungan Industrial Tanjungpinang',
    klasifikasi: 'Ketenagakerjaan',
    status: 'Mediasi',
    tahapan: 'Perdamaian Melalui Akta Kesepakatan Bersama',
    unitTerkait: 'Direktorat Pelabuhan & Biro SDM',
    tahun: 2026,
    mitigasiNilaiSengketaMiliar: 3.4,
  },
  {
    id: 'KP-05',
    nomorPerkara: '44/Pdt.G/2025/PN Btm',
    tanggal: '2026-01-10',
    tentang: 'Klaim Hak Kepemilikan Masyarakat Adat atas Kawasan Hutan Lindung Sei Harapan',
    jumlahDokumen: 32,
    instansiPengadilan: 'Pengadilan Negeri Batam',
    klasifikasi: 'Perdata',
    status: 'Dalam Proses',
    tahapan: 'Pemeriksaan Setempat (Descente) Majelis Hakim',
    unitTerkait: 'Direktorat Pengamanan Aset & Kawasan',
    tahun: 2026,
    mitigasiNilaiSengketaMiliar: 120.0,
  },
  {
    id: 'KP-06',
    nomorPerkara: '31/G/2025/PTUN.TPI',
    tanggal: '2025-11-18',
    tentang: 'Gugatan Pembatalan Izin Pemanfaatan Ruang Laut & Dermaga Tersus Sekupang',
    jumlahDokumen: 16,
    instansiPengadilan: 'PTUN Tanjungpinang',
    klasifikasi: 'Tata Usaha Negara (TUN)',
    status: 'Selesai Inkracht',
    tahapan: 'Dimenangkan Penuh BP Batam (Tolak Gugatan)',
    unitTerkait: 'Direktorat Pengelolaan Kepelabuhanan',
    tahun: 2025,
    mitigasiNilaiSengketaMiliar: 35.8,
  },
  {
    id: 'KP-07',
    nomorPerkara: '77/Pdt.G/2025/PN Btm',
    tanggal: '2025-10-05',
    tentang: 'Sengketa Pelaksanaan Kontrak Pengadaan Jasa Konstruksi Flyover Laluan Madani',
    jumlahDokumen: 21,
    instansiPengadilan: 'Pengadilan Negeri Batam',
    klasifikasi: 'Perdata',
    status: 'Selesai Inkracht',
    tahapan: 'Putusan Verstek & Konsolidasi Pembayaran',
    unitTerkait: 'Direktorat Pembangunan Infrastruktur',
    tahun: 2025,
    mitigasiNilaiSengketaMiliar: 27.5,
  },
  {
    id: 'KP-08',
    nomorPerkara: '12/Pid.Sus/2025/PN Tpi',
    tanggal: '2025-08-14',
    tentang: 'Dugaan Perusakan Pagar Batas Pengamanan Kawasan Waduk Duriangkang',
    jumlahDokumen: 14,
    instansiPengadilan: 'Pengadilan Negeri Batam',
    klasifikasi: 'Pidana Khusus',
    status: 'Selesai Inkracht',
    tahapan: 'Putusan Bersalah & Pemulihan Aset Lingkungan',
    unitTerkait: 'BU SPAM, Fasilitas & Lingkungan',
    tahun: 2025,
    mitigasiNilaiSengketaMiliar: 12.0,
  },
  {
    id: 'KP-09',
    nomorPerkara: '95/Pdt.G/2025/PN Btm',
    tanggal: '2025-06-20',
    tentang: 'Sengketa Batas Hak Pengelolaan Lahan (HPL) Sektor Perumahan Nongsa',
    jumlahDokumen: 26,
    instansiPengadilan: 'Pengadilan Negeri Batam',
    klasifikasi: 'Perdata',
    status: 'Selesai Inkracht',
    tahapan: 'Inkracht Mahkamah Agung (Menolak Kasasi)',
    unitTerkait: 'Direktorat Pengelolaan Lahan',
    tahun: 2025,
    mitigasiNilaiSengketaMiliar: 68.0,
  },
  {
    id: 'KP-10',
    nomorPerkara: '22/BANI/2025',
    tanggal: '2025-04-10',
    tentang: 'Arbitrase Sengketa Tarif Konsesi Terminal Peti Kemas Batu Ampar dengan Konsorsium',
    jumlahDokumen: 38,
    instansiPengadilan: 'Badan Arbitrase Nasional Indonesia (BANI)',
    klasifikasi: 'Arbitrase',
    status: 'Selesai Inkracht',
    tahapan: 'Putusan Arbitrase Mengikat Final (Dading)',
    unitTerkait: 'Direktorat Kepelabuhanan & BU Pelabuhan',
    tahun: 2025,
    mitigasiNilaiSengketaMiliar: 210.0,
  },
];

// ---------------------------------------------------------------------
// 2. DATASET #9: PERSENTASE PENANGANAN PERKARA YANG DISELESAIKAN (LITIGASI)
// ---------------------------------------------------------------------
export const DATASET_LITIGASI_PERKARA: LitigasiPerkaraItem[] = [
  {
    id: 'LIT-01',
    nomorPerkara: '124/Pdt.G/2025/PN Btm',
    tanggal: '2026-03-12',
    tentang: 'Sengketa Tumpang Tindih Alokasi Lahan HPL BP Batam',
    klasifikasi: 'Perdata Pertanahan',
    instansi: 'Pengadilan Negeri Batam',
    persentaseSelesai: 100,
    status: 'Selesai (Inkracht)',
    tahun: 2026,
    hasilPutusan: 'Dimenangkan BP Batam',
  },
  {
    id: 'LIT-02',
    nomorPerkara: '18/G/2026/PTUN.TPI',
    tanggal: '2026-02-28',
    tentang: 'Gugatan Pembatalan Surat Keputusan Pengalokasian Lahan',
    klasifikasi: 'Tata Usaha Negara (TUN)',
    instansi: 'PTUN Tanjungpinang',
    persentaseSelesai: 75,
    status: 'Sidang Tingkat I',
    tahun: 2026,
    hasilPutusan: 'Dalam Proses',
  },
  {
    id: 'LIT-03',
    nomorPerkara: '89/Pdt.G/2025/PN Btm',
    tanggal: '2026-02-14',
    tentang: 'Wanprestasi Pembayaran Sewa Fasilitas Aset BMN & UWT',
    klasifikasi: 'Perdata Perjanjian',
    instansi: 'Pengadilan Negeri Batam',
    persentaseSelesai: 100,
    status: 'Selesai (Inkracht)',
    tahun: 2026,
    hasilPutusan: 'Dimenangkan BP Batam',
  },
  {
    id: 'LIT-04',
    nomorPerkara: '05/Pdt.Sus-PHI/2026/PN Tpi',
    tanggal: '2026-01-22',
    tentang: 'Perselisihan Hubungan Industrial Tenaga Ahli Pelabuhan',
    klasifikasi: 'Ketenagakerjaan',
    instansi: 'Pengadilan Hubungan Industrial',
    persentaseSelesai: 100,
    status: 'Selesai (Inkracht)',
    tahun: 2026,
    hasilPutusan: 'Perdamaian / Akta Dading',
  },
  {
    id: 'LIT-05',
    nomorPerkara: '44/Pdt.G/2025/PN Btm',
    tanggal: '2026-01-10',
    tentang: 'Klaim Penguasaan Tanpa Hak Hutan Lindung Daerah Tangkapan Air',
    klasifikasi: 'Perdata Lingkungan',
    instansi: 'Pengadilan Negeri Batam',
    persentaseSelesai: 60,
    status: 'Sidang Tingkat I',
    tahun: 2026,
    hasilPutusan: 'Dalam Proses',
  },
  {
    id: 'LIT-06',
    nomorPerkara: '31/G/2025/PTUN.TPI',
    tanggal: '2025-11-18',
    tentang: 'Gugatan Pembatalan Rekomendasi Teknis Ruang Laut Tersus',
    klasifikasi: 'Tata Usaha Negara (TUN)',
    instansi: 'PTUN Tanjungpinang',
    persentaseSelesai: 100,
    status: 'Selesai (Inkracht)',
    tahun: 2025,
    hasilPutusan: 'Dimenangkan BP Batam',
  },
  {
    id: 'LIT-07',
    nomorPerkara: '77/Pdt.G/2025/PN Btm',
    tanggal: '2025-10-05',
    tentang: 'Sengketa Kontrak Kerjasama Konstruksi Infrastruktur Jalan',
    klasifikasi: 'Perdata Konstruksi',
    instansi: 'Pengadilan Negeri Batam',
    persentaseSelesai: 100,
    status: 'Selesai (Inkracht)',
    tahun: 2025,
    hasilPutusan: 'Dimenangkan BP Batam',
  },
  {
    id: 'LIT-08',
    nomorPerkara: '95/Pdt.G/2025/PN Btm',
    tanggal: '2025-06-20',
    tentang: 'Sengketa Batas Hak Pengelolaan Lahan (HPL) Perumahan',
    klasifikasi: 'Perdata Pertanahan',
    instansi: 'Mahkamah Agung (Kasasi)',
    persentaseSelesai: 100,
    status: 'Selesai (Inkracht)',
    tahun: 2025,
    hasilPutusan: 'Dimenangkan BP Batam',
  },
];

// ---------------------------------------------------------------------
// 3. DATASET #10: PERSENTASE PELAYANAN & PENANGANAN PERMASALAHAN NON-LITIGASI
// ---------------------------------------------------------------------
export const DATASET_NON_LITIGASI: NonLitigasiPerkaraItem[] = [
  {
    id: 'NON-01',
    nomorRegistrasi: 'REG-NL/001/BHUK/2026',
    tanggal: '2026-03-05',
    tentang: 'Sengketa Tumpang Tindih Alokasi Lahan HPL BP Batam',
    jenisLayanan: 'Mediasi / Negosiasi',
    pemohon: 'PT Batam Graha Lestari vs Warga Penggarap',
    persentasePelayanan: 100,
    status: 'Selesai Tuntas',
    tahun: 2026,
  },
  {
    id: 'NON-02',
    nomorRegistrasi: 'REG-NL/002/BHUK/2026',
    tanggal: '2026-02-20',
    tentang: 'Wanprestasi Pembayaran Sewa Fasilitas Aset BMN & UWT',
    jenisLayanan: 'Mediasi / Negosiasi',
    pemohon: 'Mitra Usaha Tenant Fasilitas Pelabuhan',
    persentasePelayanan: 100,
    status: 'Selesai Tuntas',
    tahun: 2026,
  },
  {
    id: 'NON-03',
    nomorRegistrasi: 'REG-NL/003/BHUK/2026',
    tanggal: '2026-02-12',
    tentang: 'Gugatan Pembatalan Surat Keputusan Pengalokasian Lahan',
    jenisLayanan: 'Klarifikasi Sengketa Lahan',
    pemohon: 'Asosiasi Pengusaha Industri Batu Ampar',
    persentasePelayanan: 85,
    status: 'Dalam Proses Mediasi',
    tahun: 2026,
  },
  {
    id: 'NON-04',
    nomorRegistrasi: 'REG-NL/004/BHUK/2026',
    tanggal: '2026-01-28',
    tentang: 'Perselisihan Hubungan Industrial Tenaga Ahli Pelabuhan',
    jenisLayanan: 'Konsultasi Hukum',
    pemohon: 'Direktorat Pengelolaan Kepelabuhanan',
    persentasePelayanan: 100,
    status: 'Selesai Tuntas',
    tahun: 2026,
  },
  {
    id: 'NON-05',
    nomorRegistrasi: 'REG-NL/005/BHUK/2026',
    tanggal: '2026-01-15',
    tentang: 'Sengketa Kontrak Kerjasama Konstruksi Infrastruktur Jalan',
    jenisLayanan: 'Pendapat Hukum (Legal Opinion)',
    pemohon: 'PPK Proyek Pelebaran Jalan Sudirman',
    persentasePelayanan: 100,
    status: 'Selesai Tuntas',
    tahun: 2026,
  },
  {
    id: 'NON-06',
    nomorRegistrasi: 'REG-NL/006/BHUK/2026',
    tanggal: '2026-01-08',
    tentang: 'Klaim Penguasaan Tanpa Hak Hutan Lindung Daerah Tangkapan Air',
    jenisLayanan: 'Klarifikasi Sengketa Lahan',
    pemohon: 'Masyarakat Kampung Teluk Mata Ikan',
    persentasePelayanan: 90,
    status: 'Penyusunan Rekomendasi',
    tahun: 2026,
  },
  {
    id: 'NON-07',
    nomorRegistrasi: 'REG-NL/007/BHUK/2025',
    tanggal: '2025-11-25',
    tentang: 'Gugatan Pembatalan Rekomendasi Teknis Ruang Laut Tersus',
    jenisLayanan: 'Pendapat Hukum (Legal Opinion)',
    pemohon: 'Direktorat Pengelolaan Kepelabuhanan',
    persentasePelayanan: 100,
    status: 'Selesai Tuntas',
    tahun: 2025,
  },
  {
    id: 'NON-08',
    nomorRegistrasi: 'REG-NL/008/BHUK/2025',
    tanggal: '2025-10-18',
    tentang: 'Sengketa Batas Hak Pengelolaan Lahan (HPL) Perumahan',
    jenisLayanan: 'Mediasi / Negosiasi',
    pemohon: 'Developer Perumahan Palm Regency',
    persentasePelayanan: 100,
    status: 'Selesai Tuntas',
    tahun: 2025,
  },
];

// ---------------------------------------------------------------------
// 4. AGREGASI PENANGANAN PERKARA: FORMULA PENGGABUNGAN TENTANG (LITIGASI + NON LITIGASI)
// FORMULA: Total Kasus per Tema = SUM(Litigasi) + SUM(Non-Litigasi)
// ---------------------------------------------------------------------
export const TEMA_PERKARA_AGREGAT: TemaPerkaraAgregat[] = [
  {
    tentang: 'Sengketa Tumpang Tindih Alokasi Lahan HPL BP Batam',
    klusterBidang: 'Pertanahan & Pengelolaan HPL',
    jumlahLitigasi: 12,
    jumlahNonLitigasi: 18,
    totalPenanganan: 30,
    tingkatKeberhasilanPersen: 93.3,
    mitigasiRisikoAsetMiliar: 185.0,
  },
  {
    tentang: 'Wanprestasi Pembayaran Sewa Fasilitas Aset BMN & UWT',
    klusterBidang: 'Keuangan, BMN & Pendapatan BLU',
    jumlahLitigasi: 8,
    jumlahNonLitigasi: 14,
    totalPenanganan: 22,
    tingkatKeberhasilanPersen: 95.5,
    mitigasiRisikoAsetMiliar: 45.6,
  },
  {
    tentang: 'Gugatan Pembatalan Surat Keputusan Pengalokasian Lahan',
    klusterBidang: 'Tata Usaha Negara (TUN)',
    jumlahLitigasi: 9,
    jumlahNonLitigasi: 7,
    totalPenanganan: 16,
    tingkatKeberhasilanPersen: 87.5,
    mitigasiRisikoAsetMiliar: 78.2,
  },
  {
    tentang: 'Sengketa Kontrak Kerjasama Konstruksi Infrastruktur Jalan',
    klusterBidang: 'Pembangunan Infrastruktur & Pengadaan',
    jumlahLitigasi: 5,
    jumlahNonLitigasi: 10,
    totalPenanganan: 15,
    tingkatKeberhasilanPersen: 93.3,
    mitigasiRisikoAsetMiliar: 62.4,
  },
  {
    tentang: 'Klaim Penguasaan Tanpa Hak Hutan Lindung Daerah Tangkapan Air',
    klusterBidang: 'Pengamanan Aset & Lingkungan DTA',
    jumlahLitigasi: 6,
    jumlahNonLitigasi: 8,
    totalPenanganan: 14,
    tingkatKeberhasilanPersen: 85.7,
    mitigasiRisikoAsetMiliar: 140.0,
  },
  {
    tentang: 'Perselisihan Hubungan Industrial Tenaga Ahli Pelabuhan',
    klusterBidang: 'Ketenagakerjaan & SDM',
    jumlahLitigasi: 3,
    jumlahNonLitigasi: 9,
    totalPenanganan: 12,
    tingkatKeberhasilanPersen: 100.0,
    mitigasiRisikoAsetMiliar: 8.5,
  },
  {
    tentang: 'Gugatan Pembatalan Rekomendasi Teknis Ruang Laut Tersus',
    klusterBidang: 'Kepelabuhanan & Maritim',
    jumlahLitigasi: 4,
    jumlahNonLitigasi: 5,
    totalPenanganan: 9,
    tingkatKeberhasilanPersen: 88.9,
    mitigasiRisikoAsetMiliar: 55.0,
  },
];

// ---------------------------------------------------------------------
// 5. JDIHN (JARINGAN DOKUMENTASI DAN INFORMASI HUKUM NASIONAL) SCORE: 100
// Penilaian Kemenkumham RI - Predikat Terbaik Nasional (Anggota JDIHN Lembaga Non-Kementerian)
// ---------------------------------------------------------------------
export interface JdihnIndicator {
  kategori: string;
  skorMaks: number;
  skorCapaian: number;
  bobot: string;
  status: string;
  keterangan: string;
}

export const JDIHN_PERFORMANCE_DATA = {
  skorTotal: 100,
  skorMaksimal: 100,
  predikat: 'Anggota JDIHN Terbaik Nasional (Kategori LPNK / Badan Otorita)',
  pemberiPenghargaan: 'Kementerian Hukum dan HAM Republik Indonesia',
  tahunEvaluasi: 2025,
  integrasiNasional: '100% Terintegrasi API Portal JDIHN.go.id',
  indikatorPenilaian: [
    {
      kategori: 'Organisasi & Kelembagaan Pengelola',
      skorMaks: 20,
      skorCapaian: 20,
      bobot: '20%',
      status: 'Sempurna',
      keterangan: 'SK Pengelola JDIHN definitif, SOP terdokumentasi, anggaran mandiri BLU BP Batam.',
    },
    {
      kategori: 'Sumber Daya Manusia (Pengelola Dokumen Hukum)',
      skorMaks: 15,
      skorCapaian: 15,
      bobot: '15%',
      status: 'Sempurna',
      keterangan: 'Fungsional Analis Hukum & Pranata Komputer bersertifikasi BPHN Kemenkumham.',
    },
    {
      kategori: 'Kelengkapan Koleksi Dokumen & Metadata Hukum',
      skorMaks: 30,
      skorCapaian: 30,
      bobot: '30%',
      status: 'Sempurna',
      keterangan: '1.240+ produk hukum (Perka, Kepka, Instruksi) terindeks penuh dengan abstraksi & status uji.',
    },
    {
      kategori: 'Teknis Website, Keamanan & API Integrasi',
      skorMaks: 25,
      skorCapaian: 25,
      bobot: '25%',
      status: 'Sempurna',
      keterangan: 'SLA Uptime 99.95%, sertifikat SSL TLS 1.3, integrasi JSON Schema standar BPHN.',
    },
    {
      kategori: 'Promosi, Literasi & Sosialisasi Hukum Publik',
      skorMaks: 10,
      skorCapaian: 10,
      bobot: '10%',
      status: 'Sempurna',
      keterangan: 'Sosialisasi regulasi ramah investasi secara luring & daring kepada para pelaku usaha.',
    },
  ] as JdihnIndicator[],
};

// ---------------------------------------------------------------------
// 6. PIPELINE HARMONISASI PRODUK HUKUM BP BATAM (DATASET #5, #6, #7, #8)
// Rekap regulasi untuk atasan memantau progres pembentukan produk hukum
// ---------------------------------------------------------------------
export const DAFTAR_PRODUK_HUKUM: RegulasiProdukHukumItem[] = [
  {
    id: 'REG-01',
    jenis: 'Peraturan Kepala (Perka)',
    nomorDraft: 'R-PERKA/02/2026',
    tanggal: '2026-03-08',
    tentang: 'Tata Cara Alokasi dan Penarifan Uang Wajib Tahunan (UWT) Kawasan Industri Nongsa',
    jumlahDokumen: 8,
    tahap: 'Harmonisasi Kemenkumham',
    unitPemrakarsa: 'Direktorat Pengelolaan Lahan & Dit. Investasi',
    relevanInvestasi: true,
    tahun: 2026,
  },
  {
    id: 'REG-02',
    jenis: 'Peraturan Kepala (Perka)',
    nomorDraft: 'R-PERKA/01/2026',
    tanggal: '2026-02-15',
    tentang: 'Penyelenggaraan Logistik Maritim dan Efisiensi Bongkar Muat Terminal Batu Ampar',
    jumlahDokumen: 12,
    tahap: 'Penetapan & JDIHN',
    unitPemrakarsa: 'Direktorat Pengelolaan Kepelabuhanan',
    relevanInvestasi: true,
    tahun: 2026,
  },
  {
    id: 'REG-03',
    jenis: 'Keputusan Kepala (Kepka)',
    nomorDraft: 'R-KEPKA/14/2026',
    tanggal: '2026-03-02',
    tentang: 'Penetapan Besaran Tarif Sewa Ruangan dan Fasilitas Tenant Rumah Sakit BP Batam',
    jumlahDokumen: 6,
    tahap: 'Pembahasan Pleno',
    unitPemrakarsa: 'Badan Usaha Rumah Sakit',
    relevanInvestasi: false,
    tahun: 2026,
  },
  {
    id: 'REG-04',
    jenis: 'Perjanjian & MoU',
    nomorDraft: 'R-PKS/05/2026',
    tanggal: '2026-02-24',
    tentang: 'Kerjasama Pemanfaatan Lahan Pembangunan Data Center Tier IV Kawasan KEK Nongsa',
    jumlahDokumen: 14,
    tahap: 'Penetapan & JDIHN',
    unitPemrakarsa: 'Direktorat KEK & Dit. Investasi',
    relevanInvestasi: true,
    tahun: 2026,
  },
  {
    id: 'REG-05',
    jenis: 'Regulasi Investasi',
    nomorDraft: 'REG-INV/03/2026',
    tanggal: '2026-01-30',
    tentang: 'Kemudahan Fasilitas Kepabeanan dan Jalur Hijau Ekspor-Impor Kawasan KPBPBB Batam',
    jumlahDokumen: 10,
    tahap: 'Harmonisasi Kemenkumham',
    unitPemrakarsa: 'Direktorat Lalu Lintas Barang & Dit. Investasi',
    relevanInvestasi: true,
    tahun: 2026,
  },
  {
    id: 'REG-06',
    jenis: 'Perjanjian & MoU',
    nomorDraft: 'R-MOU/02/2026',
    tanggal: '2026-01-18',
    tentang: 'Nota Kesepahaman Pengembangan Sistem Distribusi Air SPAM dengan Konsorsium Internasional',
    jumlahDokumen: 9,
    tahap: 'Drafting',
    unitPemrakarsa: 'BU SPAM, Fasilitas & Lingkungan',
    relevanInvestasi: true,
    tahun: 2026,
  },
];

// ---------------------------------------------------------------------
// 7. KAJIAN & PENDAMPINGAN HUKUM / MITIGASI RISIKO (DATASET #1 & #2)
// ---------------------------------------------------------------------
export const DATA_KAJIAN_PENDAMPINGAN: PendampinganHukumItem[] = [
  {
    id: 'KJN-01',
    tanggal: '2026-03-10',
    tentang: 'Kajian Hukum Resiliensi Kontrak Konsesi Kerjasama Pemerintah dan Badan Usaha (KPBU) Bandara Hang Nadim',
    kategori: 'Kajian Hukum / Rekomendasi',
    mitraKerjasama: 'Kejaksaan Tinggi Kepri (JPN) & BPKP',
    statusMitigasi: 'Selesai Rekomendasi',
    nilaiPenyelamatanRpMiliar: 145.0,
    tahun: 2026,
  },
  {
    id: 'KJN-02',
    tanggal: '2026-02-18',
    tentang: 'Pendampingan Hukum Pengadaan STS Crane dan Modernisasi Container Yard Batu Ampar',
    kategori: 'Pendampingan Hukum (Litigasi/Non)',
    mitraKerjasama: 'Kejaksaan Negeri Batam (JPN)',
    statusMitigasi: 'Pendampingan Berjalan',
    nilaiPenyelamatanRpMiliar: 92.5,
    tahun: 2026,
  },
  {
    id: 'KJN-03',
    tanggal: '2026-01-25',
    tentang: 'Legal Audit Status Kepemilikan Lahan Ex-Otorita Batam untuk Relokasi Warga Rempang Galang',
    kategori: 'Kajian Hukum / Rekomendasi',
    mitraKerjasama: 'Kementerian ATR/BPN & Jamdatun Kejaksaan RI',
    statusMitigasi: 'Selesai Rekomendasi',
    nilaiPenyelamatanRpMiliar: 250.0,
    tahun: 2026,
  },
  {
    id: 'KJN-04',
    tanggal: '2025-11-12',
    tentang: 'Mitigasi Risiko Regulasi Penataan Reklame dan Pajak Reklame di Ruang Milik Jalan BP Batam',
    kategori: 'Pendampingan Hukum (Litigasi/Non)',
    mitraKerjasama: 'Biro Hukum & Biro Umum BP Batam',
    statusMitigasi: 'Selesai Rekomendasi',
    nilaiPenyelamatanRpMiliar: 18.0,
    tahun: 2025,
  },
];

// ---------------------------------------------------------------------
// 8. 10 ATRIBUT DAFTAR DATA SATU DATA BIRO HUKUM (HALAMAN 2 PDF)
// ---------------------------------------------------------------------
export interface SatuDataBiroHukumCatalogItem {
  no: number;
  namaData: string;
  jenisData: string;
  periodeData: string;
  sifatData: string;
  atributData: string[];
  keterangan: string;
}

export const BIRO_HUKUM_10_DATASETS: SatuDataBiroHukumCatalogItem[] = [
  {
    no: 1,
    namaData: 'KAJIAN HUKUM / REKOMENDASI PENYELESAIAN',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL', 'TENTANG'],
    keterangan: 'Legal Opinion, telaah yuridis, dan saran tindak penyelesaian masalah hukum internal unit kerja.',
  },
  {
    no: 2,
    namaData: 'KEGIATAN PENDAMPINGAN HUKUM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL', 'TENTANG'],
    keterangan: 'Pendampingan proyek strategis bersama Jaksa Pengacara Negara (JPN) Kejaksaan Negeri/Tinggi.',
  },
  {
    no: 3,
    namaData: 'PELAYANAN HUKUM NON LITIGASI',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL', 'TENTANG'],
    keterangan: 'Konsultasi hukum dan bantuan klarifikasi masalah hukum bagi masyarakat/mitra BP Batam.',
  },
  {
    no: 4,
    namaData: 'KEGIATAN PENANGANAN PERKARA',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL', 'TENTANG', 'JUMLAH DOKUMEN'],
    keterangan: 'Daftar perkara persidangan aktif di pengadilan (Perdata, TUN, PHI, Pidana Khusus) beserta volume berkas dokumen perkara.',
  },
  {
    no: 5,
    namaData: 'DAFTAR RANCANGAN PERATURAN BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL', 'TENTANG', 'JUMLAH DOKUMEN'],
    keterangan: 'Proses pembentukan Peraturan Kepala (Perka) BP Batam dari drafting hingga harmonisasi.',
  },
  {
    no: 6,
    namaData: 'DAFTAR RANCANGAN KEPUTUSAN BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL', 'TENTANG', 'JUMLAH DOKUMEN'],
    keterangan: 'Penerbitan Keputusan Kepala BP Batam (Kepka) terkait penetapan hak, struktur, dan kebijakan teknis.',
  },
  {
    no: 7,
    namaData: 'DAFTAR RANCANGAN PERJANJIAN DAN NOTA KESEPAHAMAN BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL', 'TENTANG', 'JUMLAH DOKUMEN'],
    keterangan: 'Legal drafting naskah MoU, Kontrak Kerjasama (KSO), dan perjanjian pemanfaatan BMN/aset dengan pihak ketiga.',
  },
  {
    no: 8,
    namaData: 'DAFTAR REGULASI YANG RELEVAN DENGAN INVESTASI',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERSEMESTER',
    sifatData: 'TERBATAS',
    atributData: ['TANGGAL', 'TENTANG', 'JUMLAH DOKUMEN'],
    keterangan: 'Kompilasi regulasi pendukung iklim investasi, kemudahan perizinan, dan insentif fiskal di KPBPBB Batam.',
  },
  {
    no: 9,
    namaData: 'PERSENTASE PENANGANAN PERKARA YANG DISELESAIKAN',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL', 'TENTANG'],
    keterangan: 'Rasio capaian penyelesaian perkara persidangan / mitigasi litigasi yang berkekuatan hukum tetap (Inkracht).',
  },
  {
    no: 10,
    namaData: 'PERSENTASE PELAYANAN DAN PENANGANAN PERMASALAHAN HUKUM YANG DISELESAIKAN',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL', 'TENTANG'],
    keterangan: 'Rasio capaian penyelesaian perkara dan layanan hukum yang diselesaikan melalui jalur non-litigasi/mediasi damai.',
  },
];
