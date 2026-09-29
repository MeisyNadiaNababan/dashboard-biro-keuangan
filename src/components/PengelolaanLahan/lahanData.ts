import { RekapPermohonanItem, SwpLahanItem, LayananPertanahanSummary } from './types';

// =====================================================================
// DATASET #2: REKAPITULASI PENERBITAN SKPT & SPPT PERUBAHAN
// Sumber: PDF Pengguna 'rekap-penerbitan-perubahan' (Halaman 1)
// =====================================================================
export const REKAP_PENERBITAN_PERUBAHAN_DATA: RekapPermohonanItem[] = [
  { id: 1289, jenisPemohon: 'Individual Person', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 217, ditolak: 46, jumlah: 263, tahun: 2024, bulan: 'Februari' },
  { id: 1290, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 58, ditolak: 15, jumlah: 73, tahun: 2024, bulan: 'Februari' },
  { id: 1291, jenisPemohon: 'Individual Person', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 345, ditolak: 65, jumlah: 410, tahun: 2024, bulan: 'Januari' },
  { id: 1292, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 44, ditolak: 32, jumlah: 76, tahun: 2024, bulan: 'Januari' },
  { id: 1293, jenisPemohon: 'Pemerintahan', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 1, ditolak: 0, jumlah: 1, tahun: 2024, bulan: 'Januari' },
  { id: 1294, jenisPemohon: 'Yayasan', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 3, ditolak: 1, jumlah: 4, tahun: 2024, bulan: 'Januari' },
  { id: 1295, jenisPemohon: 'Individual Person', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 269, ditolak: 46, jumlah: 315, tahun: 2023, bulan: 'Desember' },
  { id: 1296, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 27, ditolak: 62, jumlah: 89, tahun: 2023, bulan: 'Desember' },
  { id: 1297, jenisPemohon: 'Pemerintahan', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 2, ditolak: 1, jumlah: 3, tahun: 2023, bulan: 'Desember' },
  { id: 1298, jenisPemohon: 'Gereja', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 1, ditolak: 0, jumlah: 1, tahun: 2023, bulan: 'Desember' },
  { id: 1299, jenisPemohon: 'Individual Person', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 307, ditolak: 63, jumlah: 370, tahun: 2023, bulan: 'November' },
  { id: 1300, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 40, ditolak: 8, jumlah: 48, tahun: 2023, bulan: 'November' },
  { id: 1301, jenisPemohon: 'Yayasan', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 3, ditolak: 1, jumlah: 4, tahun: 2023, bulan: 'November' },
  { id: 1302, jenisPemohon: 'Individual Person', tglAwal: '2023-10-01', tglAkhir: '2023-10-31', disetujui: 217, ditolak: 50, jumlah: 267, tahun: 2023, bulan: 'Oktober' },
  { id: 1303, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-10-01', tglAkhir: '2023-10-31', disetujui: 31, ditolak: 15, jumlah: 46, tahun: 2023, bulan: 'Oktober' },
  { id: 1304, jenisPemohon: 'Pemerintahan', tglAwal: '2023-10-01', tglAkhir: '2023-10-31', disetujui: 1, ditolak: 0, jumlah: 1, tahun: 2023, bulan: 'Oktober' },
  { id: 1305, jenisPemohon: 'Yayasan', tglAwal: '2023-10-01', tglAkhir: '2023-10-31', disetujui: 3, ditolak: 1, jumlah: 4, tahun: 2023, bulan: 'Oktober' },
  { id: 1306, jenisPemohon: 'Lain-Lain', tglAwal: '2023-10-01', tglAkhir: '2023-10-31', disetujui: 0, ditolak: 1, jumlah: 1, tahun: 2023, bulan: 'Oktober' },
  { id: 1307, jenisPemohon: 'Gereja', tglAwal: '2023-10-01', tglAkhir: '2023-10-31', disetujui: 1, ditolak: 0, jumlah: 1, tahun: 2023, bulan: 'Oktober' },
  { id: 1308, jenisPemohon: 'Individual Person', tglAwal: '2023-09-01', tglAkhir: '2023-09-30', disetujui: 245, ditolak: 51, jumlah: 296, tahun: 2023, bulan: 'September' },
];

// =====================================================================
// DATASET #1: REKAPITULASI PENERBITAN SKPT & SPPT BARU
// Sumber: Katalog Satu Data Item #1
// =====================================================================
export const REKAP_PENERBITAN_BARU_DATA: RekapPermohonanItem[] = [
  { id: 1101, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 184, ditolak: 28, jumlah: 212, tahun: 2024, bulan: 'Februari' },
  { id: 1102, jenisPemohon: 'Individual Person', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 142, ditolak: 36, jumlah: 178, tahun: 2024, bulan: 'Februari' },
  { id: 1103, jenisPemohon: 'Pemerintahan', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 6, ditolak: 0, jumlah: 6, tahun: 2024, bulan: 'Februari' },
  { id: 1104, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 198, ditolak: 34, jumlah: 232, tahun: 2024, bulan: 'Januari' },
  { id: 1105, jenisPemohon: 'Individual Person', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 165, ditolak: 42, jumlah: 207, tahun: 2024, bulan: 'Januari' },
  { id: 1106, jenisPemohon: 'Yayasan', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 4, ditolak: 1, jumlah: 5, tahun: 2024, bulan: 'Januari' },
  { id: 1107, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 156, ditolak: 38, jumlah: 194, tahun: 2023, bulan: 'Desember' },
  { id: 1108, jenisPemohon: 'Individual Person', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 130, ditolak: 45, jumlah: 175, tahun: 2023, bulan: 'Desember' },
  { id: 1109, jenisPemohon: 'Koperasi', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 3, ditolak: 1, jumlah: 4, tahun: 2023, bulan: 'Desember' },
  { id: 1110, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 172, ditolak: 30, jumlah: 202, tahun: 2023, bulan: 'November' },
  { id: 1111, jenisPemohon: 'Individual Person', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 148, ditolak: 38, jumlah: 186, tahun: 2023, bulan: 'November' },
  { id: 1112, jenisPemohon: 'Gereja', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 2, ditolak: 0, jumlah: 2, tahun: 2023, bulan: 'November' },
  { id: 1113, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-10-01', tglAkhir: '2023-10-31', disetujui: 160, ditolak: 25, jumlah: 185, tahun: 2023, bulan: 'Oktober' },
  { id: 1114, jenisPemohon: 'Individual Person', tglAwal: '2023-10-01', tglAkhir: '2023-10-31', disetujui: 135, ditolak: 32, jumlah: 167, tahun: 2023, bulan: 'Oktober' },
];

// =====================================================================
// DATASET #3: REKAPITULASI PECAH PENETAPAN LOKASI (PL)
// Sumber: PDF Pengguna 'rekap-pecah-pl' (Halaman 1)
// =====================================================================
export const REKAP_PECAH_PL_DATA: RekapPermohonanItem[] = [
  { id: 1021, jenisPemohon: 'Individual Person', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 65, ditolak: 35, jumlah: 100, tahun: 2024, bulan: 'Februari' },
  { id: 1022, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 1037, ditolak: 11, jumlah: 1048, tahun: 2024, bulan: 'Februari' },
  { id: 1023, jenisPemohon: 'Individual Person', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 95, ditolak: 47, jumlah: 142, tahun: 2024, bulan: 'Januari' },
  { id: 1024, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 290, ditolak: 27, jumlah: 317, tahun: 2024, bulan: 'Januari' },
  { id: 1025, jenisPemohon: 'Yayasan', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 0, ditolak: 2, jumlah: 2, tahun: 2024, bulan: 'Januari' },
  { id: 1026, jenisPemohon: 'Individual Person', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 104, ditolak: 34, jumlah: 138, tahun: 2023, bulan: 'Desember' },
  { id: 1027, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 811, ditolak: 26, jumlah: 837, tahun: 2023, bulan: 'Desember' },
  { id: 1028, jenisPemohon: 'Individual Person', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 103, ditolak: 47, jumlah: 150, tahun: 2023, bulan: 'November' },
  { id: 1029, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 926, ditolak: 46, jumlah: 972, tahun: 2023, bulan: 'November' },
  { id: 1030, jenisPemohon: 'Yayasan', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 1, ditolak: 0, jumlah: 1, tahun: 2023, bulan: 'November' },
  { id: 1031, jenisPemohon: 'Individual Person', tglAwal: '2023-10-01', tglAkhir: '2023-10-31', disetujui: 116, ditolak: 45, jumlah: 161, tahun: 2023, bulan: 'Oktober' },
  { id: 1032, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-10-01', tglAkhir: '2023-10-31', disetujui: 557, ditolak: 79, jumlah: 636, tahun: 2023, bulan: 'Oktober' },
  { id: 1033, jenisPemohon: 'Yayasan', tglAwal: '2023-10-01', tglAkhir: '2023-10-31', disetujui: 1, ditolak: 0, jumlah: 1, tahun: 2023, bulan: 'Oktober' },
  { id: 1034, jenisPemohon: 'Individual Person', tglAwal: '2023-09-01', tglAkhir: '2023-09-30', disetujui: 76, ditolak: 51, jumlah: 127, tahun: 2023, bulan: 'September' },
  { id: 1035, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-09-01', tglAkhir: '2023-09-30', disetujui: 909, ditolak: 34, jumlah: 943, tahun: 2023, bulan: 'September' },
  { id: 1036, jenisPemohon: 'Individual Person', tglAwal: '2023-08-01', tglAkhir: '2023-08-31', disetujui: 119, ditolak: 56, jumlah: 175, tahun: 2023, bulan: 'Agustus' },
  { id: 1037, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-08-01', tglAkhir: '2023-08-31', disetujui: 1006, ditolak: 501, jumlah: 1507, tahun: 2023, bulan: 'Agustus' },
  { id: 1038, jenisPemohon: 'Pemerintahan', tglAwal: '2023-08-01', tglAkhir: '2023-08-31', disetujui: 0, ditolak: 1, jumlah: 1, tahun: 2023, bulan: 'Agustus' },
  { id: 1039, jenisPemohon: 'Koperasi', tglAwal: '2023-08-01', tglAkhir: '2023-08-31', disetujui: 0, ditolak: 2, jumlah: 2, tahun: 2023, bulan: 'Agustus' },
  { id: 1040, jenisPemohon: 'Lain-Lain', tglAwal: '2023-08-01', tglAkhir: '2023-08-31', disetujui: 0, ditolak: 1, jumlah: 1, tahun: 2023, bulan: 'Agustus' },
];

// =====================================================================
// DATASET #4: REKAPITULASI REVISI PENETAPAN LOKASI (PL)
// Sumber: Katalog Satu Data Item #4
// =====================================================================
export const REKAP_REVISI_PL_DATA: RekapPermohonanItem[] = [
  { id: 1401, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 145, ditolak: 32, jumlah: 177, tahun: 2024, bulan: 'Februari' },
  { id: 1402, jenisPemohon: 'Individual Person', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 42, ditolak: 18, jumlah: 60, tahun: 2024, bulan: 'Februari' },
  { id: 1403, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 168, ditolak: 29, jumlah: 197, tahun: 2024, bulan: 'Januari' },
  { id: 1404, jenisPemohon: 'Individual Person', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 54, ditolak: 22, jumlah: 76, tahun: 2024, bulan: 'Januari' },
  { id: 1405, jenisPemohon: 'Yayasan', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 2, ditolak: 1, jumlah: 3, tahun: 2024, bulan: 'Januari' },
  { id: 1406, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 138, ditolak: 41, jumlah: 179, tahun: 2023, bulan: 'Desember' },
  { id: 1407, jenisPemohon: 'Individual Person', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 48, ditolak: 20, jumlah: 68, tahun: 2023, bulan: 'Desember' },
  { id: 1408, jenisPemohon: 'Pemerintahan', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 3, ditolak: 0, jumlah: 3, tahun: 2023, bulan: 'Desember' },
  { id: 1409, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 152, ditolak: 26, jumlah: 178, tahun: 2023, bulan: 'November' },
  { id: 1410, jenisPemohon: 'Individual Person', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 50, ditolak: 19, jumlah: 69, tahun: 2023, bulan: 'November' },
];

// =====================================================================
// DATASET #9: REKAPITULASI JUMLAH PERIZINAN PERALIHAN HAK ATAS TANAH
// Sumber: PDF Pengguna 'rekap-laporan-peralihan' (Halaman 1)
// =====================================================================
export const REKAP_PERALIHAN_HAK_DATA: RekapPermohonanItem[] = [
  { id: 127, jenisPemohon: 'Individual Person', tglAwal: '2023-06-01', tglAkhir: '2023-06-30', disetujui: 494, ditolak: 374, jumlah: 868, tahun: 2023, bulan: 'Juni' },
  { id: 128, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-06-01', tglAkhir: '2023-06-30', disetujui: 531, ditolak: 235, jumlah: 766, tahun: 2023, bulan: 'Juni' },
  { id: 129, jenisPemohon: 'Koperasi', tglAwal: '2023-06-01', tglAkhir: '2023-06-30', disetujui: 3, ditolak: 5, jumlah: 8, tahun: 2023, bulan: 'Juni' },
  { id: 130, jenisPemohon: 'Individual Person', tglAwal: '2023-05-01', tglAkhir: '2023-05-31', disetujui: 623, ditolak: 445, jumlah: 1068, tahun: 2023, bulan: 'Mei' },
  { id: 131, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-05-01', tglAkhir: '2023-05-31', disetujui: 729, ditolak: 253, jumlah: 982, tahun: 2023, bulan: 'Mei' },
  { id: 132, jenisPemohon: 'Yayasan', tglAwal: '2023-05-01', tglAkhir: '2023-05-31', disetujui: 1, ditolak: 0, jumlah: 1, tahun: 2023, bulan: 'Mei' },
  { id: 133, jenisPemohon: 'Koperasi', tglAwal: '2023-05-01', tglAkhir: '2023-05-31', disetujui: 1, ditolak: 1, jumlah: 2, tahun: 2023, bulan: 'Mei' },
  { id: 134, jenisPemohon: 'Lain-Lain', tglAwal: '2023-05-01', tglAkhir: '2023-05-31', disetujui: 1, ditolak: 1, jumlah: 2, tahun: 2023, bulan: 'Mei' },
  { id: 135, jenisPemohon: 'Individual Person', tglAwal: '2023-04-01', tglAkhir: '2023-04-30', disetujui: 338, ditolak: 288, jumlah: 626, tahun: 2023, bulan: 'April' },
  { id: 136, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-04-01', tglAkhir: '2023-04-30', disetujui: 454, ditolak: 225, jumlah: 679, tahun: 2023, bulan: 'April' },
  { id: 137, jenisPemohon: 'Persekutuan Komanditer (CV)', tglAwal: '2023-04-01', tglAkhir: '2023-04-30', disetujui: 0, ditolak: 2, jumlah: 2, tahun: 2023, bulan: 'April' },
  { id: 138, jenisPemohon: 'Yayasan', tglAwal: '2023-04-01', tglAkhir: '2023-04-30', disetujui: 0, ditolak: 1, jumlah: 1, tahun: 2023, bulan: 'April' },
  { id: 139, jenisPemohon: 'Koperasi', tglAwal: '2023-04-01', tglAkhir: '2023-04-30', disetujui: 0, ditolak: 1, jumlah: 1, tahun: 2023, bulan: 'April' },
  { id: 140, jenisPemohon: 'Individual Person', tglAwal: '2023-03-01', tglAkhir: '2023-03-31', disetujui: 632, ditolak: 509, jumlah: 1141, tahun: 2023, bulan: 'Maret' },
  { id: 141, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-03-01', tglAkhir: '2023-03-31', disetujui: 692, ditolak: 321, jumlah: 1013, tahun: 2023, bulan: 'Maret' },
  { id: 142, jenisPemohon: 'Yayasan', tglAwal: '2023-03-01', tglAkhir: '2023-03-31', disetujui: 0, ditolak: 1, jumlah: 1, tahun: 2023, bulan: 'Maret' },
  { id: 143, jenisPemohon: 'Individual Person', tglAwal: '2023-02-01', tglAkhir: '2023-02-28', disetujui: 571, ditolak: 399, jumlah: 970, tahun: 2023, bulan: 'Februari' },
  { id: 144, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-02-01', tglAkhir: '2023-02-28', disetujui: 540, ditolak: 276, jumlah: 816, tahun: 2023, bulan: 'Februari' },
  { id: 145, jenisPemohon: 'Pemerintahan', tglAwal: '2023-02-01', tglAkhir: '2023-02-28', disetujui: 0, ditolak: 1, jumlah: 1, tahun: 2023, bulan: 'Februari' },
  { id: 146, jenisPemohon: 'Yayasan', tglAwal: '2023-02-01', tglAkhir: '2023-02-28', disetujui: 0, ditolak: 2, jumlah: 2, tahun: 2023, bulan: 'Februari' },
];

// =====================================================================
// DATASET #13: REKAPITULASI JUMLAH PERIZINAN PERPANJANGAN HAK ATAS TANAH
// Sumber: Katalog Satu Data Item #13
// =====================================================================
export const REKAP_PERPANJANGAN_HAK_DATA: RekapPermohonanItem[] = [
  { id: 1301, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 248, ditolak: 22, jumlah: 270, tahun: 2024, bulan: 'Februari' },
  { id: 1302, jenisPemohon: 'Individual Person', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 185, ditolak: 34, jumlah: 219, tahun: 2024, bulan: 'Februari' },
  { id: 1303, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 310, ditolak: 40, jumlah: 350, tahun: 2024, bulan: 'Januari' },
  { id: 1304, jenisPemohon: 'Individual Person', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 215, ditolak: 38, jumlah: 253, tahun: 2024, bulan: 'Januari' },
  { id: 1305, jenisPemohon: 'Yayasan', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 6, ditolak: 1, jumlah: 7, tahun: 2024, bulan: 'Januari' },
  { id: 1306, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 280, ditolak: 35, jumlah: 315, tahun: 2023, bulan: 'Desember' },
  { id: 1307, jenisPemohon: 'Individual Person', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 195, ditolak: 42, jumlah: 237, tahun: 2023, bulan: 'Desember' },
  { id: 1308, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 295, ditolak: 38, jumlah: 333, tahun: 2023, bulan: 'November' },
  { id: 1309, jenisPemohon: 'Individual Person', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 205, ditolak: 35, jumlah: 240, tahun: 2023, bulan: 'November' },
  { id: 1310, jenisPemohon: 'Gereja', tglAwal: '2023-11-01', tglAkhir: '2023-11-30', disetujui: 2, ditolak: 0, jumlah: 2, tahun: 2023, bulan: 'November' },
];

// =====================================================================
// DATASET #5: REKAPITULASI PEMBAHARUAN HAK ATAS TANAH
// Sumber: Katalog Satu Data Item #5
// =====================================================================
export const REKAP_PEMBAHARUAN_HAK_DATA: RekapPermohonanItem[] = [
  { id: 1501, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 96, ditolak: 12, jumlah: 108, tahun: 2024, bulan: 'Februari' },
  { id: 1502, jenisPemohon: 'Individual Person', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 68, ditolak: 15, jumlah: 83, tahun: 2024, bulan: 'Februari' },
  { id: 1503, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 115, ditolak: 18, jumlah: 133, tahun: 2024, bulan: 'Januari' },
  { id: 1504, jenisPemohon: 'Individual Person', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 82, ditolak: 16, jumlah: 98, tahun: 2024, bulan: 'Januari' },
  { id: 1505, jenisPemohon: 'Yayasan', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 4, ditolak: 1, jumlah: 5, tahun: 2024, bulan: 'Januari' },
  { id: 1506, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 102, ditolak: 14, jumlah: 116, tahun: 2023, bulan: 'Desember' },
  { id: 1507, jenisPemohon: 'Individual Person', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 74, ditolak: 12, jumlah: 86, tahun: 2023, bulan: 'Desember' },
];

// =====================================================================
// DATASET #15: LAHAN YANG TERSEDIA DENGAN AREA SUB WILAYAH PENGEMBANGAN (SWP)
// Sumber: Katalog Satu Data Item #15
// =====================================================================
export const SWP_LAHAN_TERSEDIA_DATA: SwpLahanItem[] = [
  {
    id: 'swp-batam-centre',
    swp: 'SWP Batam Centre',
    namaWilayah: 'Pusat Pemerintahan, Bisnis & High-Rise Komersial',
    luasHa: 84.5,
    luasM2: 845000,
    jumlahPersil: 142,
    persilSiapPakai: 118,
    persilDalamProses: 24,
    peruntukanUtama: 'Pemerintahan, Perkantoran Perbankan, MICE, Mall',
    statusKawasan: 'Kawasan Perkotaan Primer (Core CBD)',
    tingkatKesiapan: 'Sangat Tinggi',
    investasiFokus: 'Finansial, Kantor Pusat Regional, Smart City Hotel',
  },
  {
    id: 'swp-nongsa',
    swp: 'SWP Nongsa',
    namaWilayah: 'KEK Nongsa Digital Park & Koridor Pariwisata Mewah',
    luasHa: 245.2,
    luasM2: 2452000,
    jumlahPersil: 86,
    persilSiapPakai: 72,
    persilDalamProses: 14,
    peruntukanUtama: 'Data Center AI Tier-IV, Studio Animasi, Eco-Resort',
    statusKawasan: 'Kawasan Ekonomi Khusus (KEK Digital)',
    tingkatKesiapan: 'Sangat Tinggi',
    investasiFokus: 'Hyperscale Data Center, Digital Creative, Marina Resort',
  },
  {
    id: 'swp-sekupang',
    swp: 'SWP Sekupang',
    namaWilayah: 'Kawasan Pariwisata Sehat (KEK Kesehatan RSBP) & Perumahan',
    luasHa: 128.6,
    luasM2: 1286000,
    jumlahPersil: 115,
    persilSiapPakai: 94,
    persilDalamProses: 21,
    peruntukanUtama: 'Rumah Sakit Internasional, Wellness Park, Waterfront Living',
    statusKawasan: 'Kawasan Pengembangan Layanan Medis & Wisata',
    tingkatKesiapan: 'Tinggi',
    investasiFokus: 'Medical Tourism, Industri Farmasi, Senior Living',
  },
  {
    id: 'swp-batu-ampar',
    swp: 'SWP Batu Ampar',
    namaWilayah: 'Sentra Logistik Pelabuhan Peti Kemas & Gudang Maritim',
    luasHa: 32.4,
    luasM2: 324000,
    jumlahPersil: 48,
    persilSiapPakai: 38,
    persilDalamProses: 10,
    peruntukanUtama: 'Depo Kontainer, Gudang Logistik Terpadu, Cold Storage',
    statusKawasan: 'Kawasan Industri Penunjang Pelabuhan Bebas',
    tingkatKesiapan: 'Sangat Tinggi',
    investasiFokus: 'Logistik Multimoda, Depo Peti Kemas, Port Services',
  },
  {
    id: 'swp-muka-kuning',
    swp: 'SWP Muka Kuning',
    namaWilayah: 'Kawasan Industri Manufaktur Presisi & Perakitan Elektronika',
    luasHa: 68.0,
    luasM2: 680000,
    jumlahPersil: 52,
    persilSiapPakai: 46,
    persilDalamProses: 6,
    peruntukanUtama: 'Semikonduktor, Komponen Elektronik, PCB Otomotif',
    statusKawasan: 'Kluster Industri Manufaktur Modern (BIP)',
    tingkatKesiapan: 'Tinggi',
    investasiFokus: 'High-Tech Electronics, Komponen EV, Perakitan Robotik',
  },
  {
    id: 'swp-kabil',
    swp: 'SWP Kabil',
    namaWilayah: 'Zona Industri Berat, Fabrikasi Lepas Pantai & Energi Hijau',
    luasHa: 310.5,
    luasM2: 3105000,
    jumlahPersil: 94,
    persilSiapPakai: 80,
    persilDalamProses: 14,
    peruntukanUtama: 'Fabrikasi Pipa Migas, Terminal Curah Cair, PLTS Terapung',
    statusKawasan: 'Zona Industri Berat Terpadu Kabil',
    tingkatKesiapan: 'Tinggi',
    investasiFokus: 'Offshore Fabrication, Modul Panel Surya, Green Hydrogen',
  },
  {
    id: 'swp-tanjung-uncang',
    swp: 'SWP Tanjung Uncang',
    namaWilayah: 'Galangan Kapal (Shipyard), Fabrikasi Baja & Dry Dock',
    luasHa: 195.0,
    luasM2: 1950000,
    jumlahPersil: 78,
    persilSiapPakai: 62,
    persilDalamProses: 16,
    peruntukanUtama: 'Shipyard, Perbaikan Kapal Niaga, Fabrikasi Struktur Baja',
    statusKawasan: 'Kluster Maritim & Industri Lepas Pantai',
    tingkatKesiapan: 'Sedang',
    investasiFokus: 'Pembuatan Tongkang/Tugboat, Repair Kapal Tanker',
  },
  {
    id: 'swp-tembesi',
    swp: 'SWP Tembesi & Sagulung',
    namaWilayah: 'Koridor Pemukiman Terencana, Niaga Lokal & Sentra IKM',
    luasHa: 154.8,
    luasM2: 1548000,
    jumlahPersil: 164,
    persilSiapPakai: 135,
    persilDalamProses: 29,
    peruntukanUtama: 'Perumahan Skala Kota, Ruko Bisnis, Sentra Distribusi',
    statusKawasan: 'Pengembangan Perkotaan Sekunder',
    tingkatKesiapan: 'Tinggi',
    investasiFokus: 'Retail Modern, Townhouse, Sekolah & Pusat Pelatihan',
  },
  {
    id: 'swp-rempang-galang',
    swp: 'SWP Rempang & Galang',
    namaWilayah: 'Kawasan Pengembangan Eco-City Strategis Nasional',
    luasHa: 1250.0,
    luasM2: 12500000,
    jumlahPersil: 210,
    persilSiapPakai: 165,
    persilDalamProses: 45,
    peruntukanUtama: 'Industri Kaca & Solar Photovoltaic, Eco-Tourism Terpadu',
    statusKawasan: 'Proyek Strategis Nasional (PSN Rempang Eco-City)',
    tingkatKesiapan: 'Sedang',
    investasiFokus: 'Pabrik Kaca Terintegrasi Xinyi, PLTS Skala Gigawatt',
  },
];

// =====================================================================
// DATASET #14: LAPORAN PENGALOKASIAN LAHAN UNTUK INVESTASI
// Sumber: Katalog Satu Data Item #14 (KPI Luas Lahan)
// =====================================================================
export const ALOKASI_LAHAN_INVESTASI_DATA = {
  totalLuasAlokasiM2: 4850230,
  totalLuasAlokasiHa: 485.02,
  totalPermohonanMasuk: 384,
  permohonanDisetujui: 312,
  permohonanDitolak: 72,
  rasioDisetujuiPersen: 81.25,
  potensiNilaiInvestasiRpTriliun: 34.85,
  sektorBreakdown: [
    { sektor: 'Industri Manufaktur & Galangan', luasHa: 182.4, persil: 88, persentase: 37.6, pnbpUwtRpMiliar: 145.92 },
    { sektor: 'Data Center & Digital Tech Hub', luasHa: 114.8, persil: 42, persentase: 23.7, pnbpUwtRpMiliar: 114.80 },
    { sektor: 'Pariwisata, Hotel & Eco-Resort', luasHa: 98.2, persil: 56, persentase: 20.2, pnbpUwtRpMiliar: 88.38 },
    { sektor: 'Logistik Pelabuhan & Pergudangan', luasHa: 54.6, persil: 64, persentase: 11.3, pnbpUwtRpMiliar: 43.68 },
    { sektor: 'Komersial, Jasa & Pendidikan', luasHa: 35.02, persil: 62, persentase: 7.2, pnbpUwtRpMiliar: 35.02 },
  ],
};

// =====================================================================
// REQUIREMENT 3: ENAM LAYANAN LAHAN (SHEET SWAP: PIE CHART & RINCIAN TIAP LAYANAN)
// 1. Rekapitulasi Pembaharuan Hak Atas Tanah (#5)
// 2. Rekapitulasi Pelayanan Penerbitan Faktur Perubahan Peruntukan (#6)
// 3. Rekapitulasi Hak Tanggungan (#7)
// 4. Rekapitulasi Dokumen Pengganti (#8)
// 5. Rekapitulasi Persetujuan Lelang (#10)
// 6. Rekapitulasi Layanan Rekomendasi (#11)
// =====================================================================
export const REKAP_FAKTUR_PERUNTUKAN_DATA: RekapPermohonanItem[] = [
  { id: 2601, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 112, ditolak: 10, jumlah: 122, tahun: 2024, bulan: 'Februari' },
  { id: 2602, jenisPemohon: 'Individual Person', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 45, ditolak: 8, jumlah: 53, tahun: 2024, bulan: 'Februari' },
  { id: 2603, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 120, ditolak: 12, jumlah: 132, tahun: 2024, bulan: 'Januari' },
  { id: 2604, jenisPemohon: 'Individual Person', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 48, ditolak: 7, jumlah: 55, tahun: 2024, bulan: 'Januari' },
  { id: 2605, jenisPemohon: 'Koperasi', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 6, ditolak: 1, jumlah: 7, tahun: 2024, bulan: 'Januari' },
  { id: 2606, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 110, ditolak: 10, jumlah: 120, tahun: 2023, bulan: 'Desember' },
  { id: 2607, jenisPemohon: 'Individual Person', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 45, ditolak: 8, jumlah: 53, tahun: 2023, bulan: 'Desember' },
];

export const REKAP_HAK_TANGGUNGAN_DATA: RekapPermohonanItem[] = [
  { id: 2701, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 298, ditolak: 14, jumlah: 312, tahun: 2024, bulan: 'Februari' },
  { id: 2702, jenisPemohon: 'Individual Person', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 154, ditolak: 9, jumlah: 163, tahun: 2024, bulan: 'Februari' },
  { id: 2703, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 310, ditolak: 12, jumlah: 322, tahun: 2024, bulan: 'Januari' },
  { id: 2704, jenisPemohon: 'Individual Person', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 160, ditolak: 10, jumlah: 170, tahun: 2024, bulan: 'Januari' },
  { id: 2705, jenisPemohon: 'Pemerintahan', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 8, ditolak: 1, jumlah: 9, tahun: 2024, bulan: 'Januari' },
  { id: 2706, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 284, ditolak: 12, jumlah: 296, tahun: 2023, bulan: 'Desember' },
  { id: 2707, jenisPemohon: 'Individual Person', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 148, ditolak: 8, jumlah: 156, tahun: 2023, bulan: 'Desember' },
];

export const REKAP_DOKUMEN_PENGGANTI_DATA: RekapPermohonanItem[] = [
  { id: 2801, jenisPemohon: 'Individual Person', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 74, ditolak: 12, jumlah: 86, tahun: 2024, bulan: 'Februari' },
  { id: 2802, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 34, ditolak: 4, jumlah: 38, tahun: 2024, bulan: 'Februari' },
  { id: 2803, jenisPemohon: 'Individual Person', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 76, ditolak: 11, jumlah: 87, tahun: 2024, bulan: 'Januari' },
  { id: 2804, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 32, ditolak: 4, jumlah: 36, tahun: 2024, bulan: 'Januari' },
  { id: 2805, jenisPemohon: 'Yayasan', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 2, ditolak: 1, jumlah: 3, tahun: 2024, bulan: 'Januari' },
  { id: 2806, jenisPemohon: 'Individual Person', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 68, ditolak: 11, jumlah: 79, tahun: 2023, bulan: 'Desember' },
  { id: 2807, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 32, ditolak: 4, jumlah: 36, tahun: 2023, bulan: 'Desember' },
];

export const REKAP_PERSETUJUAN_LELANG_DATA: RekapPermohonanItem[] = [
  { id: 3001, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 42, ditolak: 6, jumlah: 48, tahun: 2024, bulan: 'Februari' },
  { id: 3002, jenisPemohon: 'Individual Person', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 22, ditolak: 4, jumlah: 26, tahun: 2024, bulan: 'Februari' },
  { id: 3003, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 44, ditolak: 5, jumlah: 49, tahun: 2024, bulan: 'Januari' },
  { id: 3004, jenisPemohon: 'Individual Person', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 20, ditolak: 3, jumlah: 23, tahun: 2024, bulan: 'Januari' },
  { id: 3005, jenisPemohon: 'Pemerintahan', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 2, ditolak: 0, jumlah: 2, tahun: 2024, bulan: 'Januari' },
  { id: 3006, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 38, ditolak: 5, jumlah: 43, tahun: 2023, bulan: 'Desember' },
  { id: 3007, jenisPemohon: 'Individual Person', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 20, ditolak: 4, jumlah: 24, tahun: 2023, bulan: 'Desember' },
];

export const REKAP_LAYANAN_REKOMENDASI_DATA: RekapPermohonanItem[] = [
  { id: 3101, jenisPemohon: 'Individual Person', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 175, ditolak: 16, jumlah: 191, tahun: 2024, bulan: 'Februari' },
  { id: 3102, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-02-01', tglAkhir: '2024-02-29', disetujui: 98, ditolak: 9, jumlah: 107, tahun: 2024, bulan: 'Februari' },
  { id: 3103, jenisPemohon: 'Individual Person', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 180, ditolak: 17, jumlah: 197, tahun: 2024, bulan: 'Januari' },
  { id: 3104, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 100, ditolak: 9, jumlah: 109, tahun: 2024, bulan: 'Januari' },
  { id: 3105, jenisPemohon: 'Yayasan', tglAwal: '2024-01-01', tglAkhir: '2024-01-31', disetujui: 8, ditolak: 2, jumlah: 10, tahun: 2024, bulan: 'Januari' },
  { id: 3106, jenisPemohon: 'Individual Person', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 157, ditolak: 15, jumlah: 172, tahun: 2023, bulan: 'Desember' },
  { id: 3107, jenisPemohon: 'Perseroan Terbatas (PT)', tglAwal: '2023-12-01', tglAkhir: '2023-12-31', disetujui: 96, ditolak: 8, jumlah: 104, tahun: 2023, bulan: 'Desember' },
];

export const ENAM_LAYANAN_LAHAN_DATA: LayananPertanahanSummary[] = [
  {
    noDataset: 1,
    namaLayanan: 'Penerbitan SKPT & SK Baru',
    kodeTag: 'DPL-01',
    jumlahPermohonan: 4887,
    disetujui: 4195,
    ditolak: 692,
    rasioDisetujui: 85.84,
    color: '#2563EB', // Blue
    iconName: 'FileCheck2',
    deskripsi: 'Penerbitan Surat Perjanjian Pengelolaan Tanah (SKPT) dan SK Pengelolaan Tanah Baru.',
  },
  {
    noDataset: 2,
    namaLayanan: 'Penerbitan SKPT & SK Perubahan',
    kodeTag: 'DPL-02',
    jumlahPermohonan: 5753,
    disetujui: 4908,
    ditolak: 845,
    rasioDisetujui: 85.31,
    color: '#7C3AED', // Purple
    iconName: 'FileCheck2',
    deskripsi: 'Penerbitan Surat Perjanjian dan SK Pengelolaan Tanah Perubahan data alokasi.',
  },
  {
    noDataset: 3,
    namaLayanan: 'Pecah Penetapan Lokasi (PL)',
    kodeTag: 'DPL-03',
    jumlahPermohonan: 1157,
    disetujui: 978,
    ditolak: 179,
    rasioDisetujui: 84.53,
    color: '#059669', // Emerald
    iconName: 'Scissors',
    deskripsi: 'Pelayanan pemecahan persil Penetapan Lokasi (PL) tanah untuk pengembangan.',
  },
  {
    noDataset: 4,
    namaLayanan: 'Revisi Penetapan Lokasi (PL)',
    kodeTag: 'DPL-04',
    jumlahPermohonan: 1040,
    disetujui: 890,
    ditolak: 150,
    rasioDisetujui: 85.58,
    color: '#D97706', // Amber
    iconName: 'Edit3',
    deskripsi: 'Pelayanan revisi batasan persil Penetapan Lokasi (PL) dan koordinat batas lahan.',
  },
  {
    noDataset: 5,
    namaLayanan: 'Pembaharuan Hak Atas Tanah',
    kodeTag: 'DPL-05',
    jumlahPermohonan: 629,
    disetujui: 541,
    ditolak: 88,
    rasioDisetujui: 86.01,
    color: '#0284C7', // Sky blue
    iconName: 'RefreshCw',
    deskripsi: 'Pemberian pembaruan jangka waktu alokasi tanah HPL yang telah habis masa berlakunya.',
  },
  {
    noDataset: 6,
    namaLayanan: 'Faktur Perubahan Peruntukan',
    kodeTag: 'DPL-06',
    jumlahPermohonan: 542,
    disetujui: 486,
    ditolak: 56,
    rasioDisetujui: 89.67,
    color: '#10B981', // Teal
    iconName: 'RefreshCw',
    deskripsi: 'Penerbitan faktur tagihan UWT akibat perubahan rencana pemanfaatan lahan.',
  },
  {
    noDataset: 7,
    namaLayanan: 'Rekapitulasi Hak Tanggungan',
    kodeTag: 'DPL-07',
    jumlahPermohonan: 1428,
    disetujui: 1362,
    ditolak: 66,
    rasioDisetujui: 95.38,
    color: '#6366F1', // Indigo
    iconName: 'ShieldCheck',
    deskripsi: 'Pencatatan jaminan fidusia/hak tanggungan perbankan atas sertifikat HPL.',
  },
  {
    noDataset: 8,
    namaLayanan: 'Rekapitulasi Dokumen Pengganti',
    kodeTag: 'DPL-08',
    jumlahPermohonan: 365,
    disetujui: 318,
    ditolak: 47,
    rasioDisetujui: 87.12,
    color: '#F43F5E', // Rose
    iconName: 'FileText',
    deskripsi: 'Penerbitan salinan pengganti dokumen PL, SKPT, atau SPPT hilang/rusak.',
  },
  {
    noDataset: 10,
    namaLayanan: 'Rekapitulasi Persetujuan Lelang',
    kodeTag: 'DPL-10',
    jumlahPermohonan: 215,
    disetujui: 188,
    ditolak: 27,
    rasioDisetujui: 87.44,
    color: '#EC4899', // Pink
    iconName: 'Gavel',
    deskripsi: 'Rekomendasi persetujuan lelang eksekusi hak atas tanah oleh KPKNL/Pengadilan.',
  },
  {
    noDataset: 11,
    namaLayanan: 'Layanan Rekomendasi Pertanahan',
    kodeTag: 'DPL-11',
    jumlahPermohonan: 890,
    disetujui: 814,
    ditolak: 76,
    rasioDisetujui: 91.46,
    color: '#14B8A6', // Cyan
    iconName: 'Award',
    deskripsi: 'Penerbitan surat rekomendasi pendaftaran pertama kali, BPN, dan konsolidasi.',
  },
];

// =====================================================================
// DATASET #12: LAPORAN TARGET PENERIMAAN PNBP PENGELOLAAN TANAH
// Sumber: Katalog Satu Data Item #12
// =====================================================================
export const TARGET_PENERIMAAN_PNBP_LAHAN = {
  tahun: 2026,
  targetPnbpRp: 850000000000, // Rp 850 Miliar
  realisasiPnbpRp: 714280000000, // Rp 714,28 Miliar
  capaianPersen: 84.03,
  sumberPenerimaan: [
    { jenis: 'Uang Wajib Tahunan (UWT) Alokasi Baru (30 Thn)', targetMiliar: 380.0, realisasiMiliar: 326.5, capaianPersen: 85.92 },
    { jenis: 'Perpanjangan UWT Hak Atas Tanah (20/30 Thn)', targetMiliar: 280.0, realisasiMiliar: 238.4, capaianPersen: 85.14 },
    { jenis: 'Peralihan Hak & Administrasi Pengelolaan', targetMiliar: 110.0, realisasiMiliar: 92.18, capaianPersen: 83.80 },
    { jenis: 'Perubahan Peruntukan & Pecah/Revisi PL', targetMiliar: 80.0, realisasiMiliar: 57.20, capaianPersen: 71.50 },
  ],
  rataRataSlaHari: 6.2,
  targetSlaHari: 7.0,
  kepatuhanSlaPersen: 94.8,
};

// =====================================================================
// FORMULA & TABLEAU GUIDE METADATA
// =====================================================================
export interface LahanFormulaGuide {
  title: string;
  datasetNo: string;
  formula: string;
  description: string;
  tableauGuide: {
    columns: string;
    rows: string;
    marks: string;
    colors: string;
    filters: string;
  };
}

export const LAHAN_KPI_FORMULAS: Record<string, LahanFormulaGuide> = {
  lahan_luas_alokasi: {
    title: 'Luas Lahan yang Dialokasikan untuk Investasi',
    datasetNo: 'Katalog Satu Data Hal. 7 Item 14',
    formula: 'SUM([Luas Alokasi (m2)]) / 10000',
    description: 'Menghitung total luasan bidang tanah persil HPL yang telah resmi dialokasikan kepada investor untuk kegiatan industri, komersial, perumahan, dan pariwisata dalam satuan Hektar (Ha).',
    tableauGuide: {
      columns: 'Peruntukan / Sektor Investasi',
      rows: 'SUM([Luas Alokasi (Ha)])',
      marks: 'Bar Chart / Treemap',
      colors: 'Sektor Industri / KEK',
      filters: 'Tahun Alokasi, Status SKPT, SWP',
    },
  },
  lahan_peralihan_hak: {
    title: 'Jumlah Perizinan Peralihan Hak Atas Tanah',
    datasetNo: 'Katalog Satu Data Hal. 7 Item 9',
    formula: 'SUM([Disetujui]) + SUM([Ditolak])',
    description: 'Menghitung seluruh volume berkas permohonan peralihan hak atas tanah (jual beli, hibah, merger aset usaha) dengan rasio persetujuan (% Acc = SUM(Disetujui) / SUM(Jumlah) * 100).',
    tableauGuide: {
      columns: '[Jenis Pemohon]',
      rows: 'Measure Values: SUM(Disetujui), SUM(Ditolak)',
      marks: 'Side-by-side Bar / Stacked Bar',
      colors: 'Measure Names (Hijau = Disetujui, Merah = Ditolak)',
      filters: 'Tahun (2023, 2024), Bulan, Status',
    },
  },
  lahan_perpanjangan_hak: {
    title: 'Jumlah Perizinan Perpanjangan Hak Atas Tanah',
    datasetNo: 'Katalog Satu Data Hal. 7 Item 13',
    formula: 'SUM([Jumlah Permohonan Perpanjangan])',
    description: 'Mengukur volume permohonan perpanjangan masa berlaku Uang Wajib Tahunan (UWT) untuk jangka waktu 20 atau 30 tahun di atas Hak Pengelolaan BP Batam.',
    tableauGuide: {
      columns: '[Jenis Pemohon]',
      rows: 'SUM(Disetujui), SUM(Ditolak)',
      marks: 'Grouped Bar Chart',
      colors: 'Status Keputusan',
      filters: 'Tahun, Jenis Pemohon, Kategori Kavling',
    },
  },
  lahan_skpt_sppt: {
    title: 'Rekapitulasi Penerbitan SKPT & SPPT (Sheet Swap)',
    datasetNo: 'Katalog Satu Data Hal. 6 Item 1 & 2',
    formula: 'Parameter [Pilih_Dataset] = "Baru" THEN [Dataset_1] ELSE [Dataset_2] END',
    description: 'Implementasi teknik Sheet Swap di Tableau untuk beralih secara dinamis antara penerbitan SKPT/SPPT Baru (Dataset #1) dan Perubahan (Dataset #2) berdasarkan jenis pemohon.',
    tableauGuide: {
      columns: '[Jenis Pemohon]',
      rows: 'SUM([Disetujui]), SUM([Ditolak])',
      marks: 'Stacked Bar Chart / Data Grid',
      colors: 'Status Persetujuan Dokumen',
      filters: 'Parameter Sheet Swap, Tahun, Jenis Pemohon',
    },
  },
  lahan_pecah_revisi_pl: {
    title: 'Rekapitulasi Pecah PL & Revisi PL (Sheet Swap)',
    datasetNo: 'Katalog Satu Data Hal. 6 Item 3 & 4',
    formula: 'CASE [Parameter_PL] WHEN "Pecah" THEN [Dataset_3] WHEN "Revisi" THEN [Dataset_4] END',
    description: 'Menampilkan volume permohonan pemecahan bidang tanah (kavling) dan revisi penetapan lokasi yang diajukan oleh perseorangan maupun korporasi/pengembang.',
    tableauGuide: {
      columns: '[Jenis Pemohon]',
      rows: 'SUM([Disetujui]), SUM([Ditolak])',
      marks: 'Bar Chart',
      colors: 'Status (Disetujui vs Ditolak)',
      filters: 'Parameter Sheet Swap, Periode Cut-Off',
    },
  },
  lahan_swp_tersedia: {
    title: 'Lahan Tersedia Sub Wilayah Pengembangan (SWP)',
    datasetNo: 'Katalog Satu Data Hal. 7-8 Item 15',
    formula: 'SUM([Luas Tersedia Ha]) & COUNTD([ID Persil])',
    description: 'Sebaran inventarisasi bidang tanah siap bangun di 9 Sub Wilayah Pengembangan Kota Batam berdasarkan Rencana Tata Ruang Wilayah (RTRW).',
    tableauGuide: {
      columns: '[Nama SWP]',
      rows: 'SUM([Luas Ha]), SUM([Persil Siap Pakai])',
      marks: 'Dual Axis Bar / Map Polygon',
      colors: '[Tingkat Kesiapan Lahan]',
      filters: 'SWP, Status Kawasan (KEK / Non-KEK)',
    },
  },
  lahan_6_layanan: {
    title: 'Proporsi 6 Layanan Pengelolaan Lahan BP Batam',
    datasetNo: 'Katalog Satu Data Item 6, 7, 8, 10, 11, 14',
    formula: 'SUM([Jumlah Permohonan]) / TOTAL(SUM([Jumlah Permohonan])) * 100',
    description: 'Visualisasi Pie/Donut Chart yang membandingkan pangsa volume 6 layanan operasional kantor pertanahan BP Batam.',
    tableauGuide: {
      columns: 'None (Pie)',
      rows: 'None',
      marks: 'Pie Chart (Angle: SUM(Jumlah Permohonan))',
      colors: '[Nama Layanan Pertanahan]',
      filters: 'Tahun, Kategori Layanan',
    },
  },
  lahan_target_pnbp: {
    title: 'Realisasi Target PNBP Pengelolaan Lahan',
    datasetNo: 'Katalog Satu Data Hal. 7 Item 12',
    formula: '(SUM([Realisasi PNBP Lahan]) / SUM([Target Anggaran PNBP])) * 100',
    description: 'Persentase capaian penerimaan kas negara dari pos Uang Wajib Tahunan (UWT) dan faktur perizinan lahan BP Batam.',
    tableauGuide: {
      columns: '[Jenis Penerimaan]',
      rows: 'SUM([Realisasi IDR]), SUM([Target IDR])',
      marks: 'Bullet Graph / Bar in Bar',
      colors: 'Capaian (>= 80% Hijau, <80% Kuning)',
      filters: 'Tahun Anggaran, Pos Tarif UWT',
    },
  },
};

