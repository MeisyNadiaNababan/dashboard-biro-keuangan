// Data Finansial & Akuntansi Badan Layanan Umum (BLU) BP Batam
// Berdasarkan Buku Katalog Satu Data BP Batam (Hal. 2-5) & Laporan Realisasi Anggaran (LRA) per 30 Juni 2026

export interface LraBluItem {
  id: string;
  jenisAnggaran: 'PENDAPATAN LRA' | 'BELANJA OPERASI' | 'BELANJA MODAL';
  kategori: string;
  uraian: string;
  triwulan: string;
  tahun: number;
  anggaran: number; // Rupiah
  realisasi: number; // Rupiah
  persentase: number; // % Capaian
}

export interface OperasionalBluItem {
  id: string;
  uraian: string;
  kategori: 'PENDAPATAN-LO' | 'BEBAN-LO' | 'SURPLUS-DEFISIT';
  periodeBaru: string; // TW II 2026
  periodeSebelum: string; // TW II 2025
  nilaiPeriodeBaru: number; // Rupiah Miliar
  nilaiPeriodeSebelum: number; // Rupiah Miliar
  nilaiKenaikanPenurunan: number; // Rupiah Miliar
  persentase: number; // % Pertumbuhan
}

export interface PerubahanEkuitasBluItem {
  id: string;
  uraian: string;
  triwulan: string;
  tahun: number;
  periodeBaru: string;
  periodeSebelum: string;
  nilaiPeriodeBaru: number; // Rupiah Miliar
  nilaiPeriodeSebelum: number; // Rupiah Miliar
  nilaiKenaikanPenurunan: number; // Rupiah Miliar
  persentase: number;
}

export interface ArusKasBluItem {
  id: string;
  uraian: string;
  kategoriAktivitas: 'OPERASI' | 'INVESTASI' | 'PENDANAAN' | 'TRANSITORIS' | 'SALDO';
  triwulan: string;
  tahun: number;
  periodeBaru: string;
  periodeSebelum: string;
  nilaiPeriodeBaru: number; // Rupiah Miliar
  nilaiPeriodeSebelum: number; // Rupiah Miliar
  nilaiKenaikanPenurunan: number; // Rupiah Miliar
  persentase: number;
}

export interface NeracaBluItem {
  id: string;
  kategori: 'ASET LANCAR' | 'ASET TETAP' | 'ASET LAINNYA' | 'KEWAJIBAN' | 'EKUITAS';
  detail: string;
  namaPerkiraan: string;
  tahunBaru: number;
  tahunSebelumnya: number;
  nilaiTahunBaru: number; // Rupiah Miliar
  nilaiTahunSebelumnya: number; // Rupiah Miliar
  nilaiKenaikanPenurunan: number; // Rupiah Miliar
  persentase: number;
}

export interface SaldoBankRealTimeItem {
  id: string;
  namaBank: string;
  nomorRekening: string;
  nilaiSaldo: number; // Rupiah
  unit: string;
  kategoriUnit: string;
  kegunaanRekening: string;
  kategoriRekening: 'Operasional' | 'Penerimaan PNBP' | 'Dana Kelolaan' | 'Investasi';
  tanggalRekap: string;
  persentaseShare?: number;
}

export interface PenerimaanSumberDanaItem {
  id: string;
  sumberDana: 'PNBP Jasa Layanan' | 'Rupiah Murni (APBN)' | 'Pinjaman/Hibah (PHLN)' | 'Pengelolaan Kas BLU';
  unitKerja: string;
  tanggalRekapAwal: string;
  tanggalRekapAkhir: string;
  nilai: number; // Rupiah Miliar
  targetNilai: number;
  capaian: number;
}

export interface PiutangTakTertagihItem {
  id: string;
  nomorFaktur: string;
  tanggalTerbitFaktur: string;
  namaPelanggan: string;
  tanggalJatuhTempo: string;
  jumlahPiutangKoreksiKpknl: number; // Rupiah
  perhitunganDenda: number; // Rupiah
  bayarFaktur: number; // Rupiah
  saldoPiutangTakTertagih: number; // Rupiah
  statusPenyelesaian: 'Penyelidikan PUPN/KPKNL' | 'Restrukturisasi Pembayaran' | 'Verifikasi BPKP' | 'Hapus Tagih Bersyarat';
  umurPiutang: string;
}

// 1. DATA LAPORAN REALISASI ANGGARAN (LRA) BLU PER 30 JUNI 2026 (Hal. 3 Item 3)
export const LRA_BLU_2026_DATA: LraBluItem[] = [
  {
    id: 'lra-1',
    jenisAnggaran: 'PENDAPATAN LRA',
    kategori: 'Pendapatan Jasa Layanan',
    uraian: 'Pendapatan Alokasi dan Pengelolaan Lahan (UWT & Jasa Pertanahan)',
    triwulan: 'Triwulan II (s.d. 30 Juni)',
    tahun: 2026,
    anggaran: 680000000000,
    realisasi: 362500000000,
    persentase: 53.31,
  },
  {
    id: 'lra-2',
    jenisAnggaran: 'PENDAPATAN LRA',
    kategori: 'Pendapatan Jasa Layanan',
    uraian: 'Pendapatan Jasa Kepelabuhanan (Labuh, Tambat & Dermaga)',
    triwulan: 'Triwulan II (s.d. 30 Juni)',
    tahun: 2026,
    anggaran: 820000000000,
    realisasi: 445600000000,
    persentase: 54.34,
  },
  {
    id: 'lra-3',
    jenisAnggaran: 'PENDAPATAN LRA',
    kategori: 'Pendapatan Jasa Layanan',
    uraian: 'Pendapatan Jasa Kebandaraan Hang Nadim (PJP2U & Konsesi)',
    triwulan: 'Triwulan II (s.d. 30 Juni)',
    tahun: 2026,
    anggaran: 450000000000,
    realisasi: 238100000000,
    persentase: 52.91,
  },
  {
    id: 'lra-4',
    jenisAnggaran: 'PENDAPATAN LRA',
    kategori: 'Pendapatan Jasa Layanan',
    uraian: 'Pendapatan Jasa Layanan Kesehatan Rumah Sakit BP Batam',
    triwulan: 'Triwulan II (s.d. 30 Juni)',
    tahun: 2026,
    anggaran: 310000000000,
    realisasi: 159200000000,
    persentase: 51.35,
  },
  {
    id: 'lra-5',
    jenisAnggaran: 'PENDAPATAN LRA',
    kategori: 'Pendapatan Jasa Layanan',
    uraian: 'Pendapatan Layanan Air Bersih SPAM, Pengelolaan Fasilitas & Lingkungan',
    triwulan: 'Triwulan II (s.d. 30 Juni)',
    tahun: 2026,
    anggaran: 190000000000,
    realisasi: 98700000000,
    persentase: 51.95,
  },
  {
    id: 'lra-6',
    jenisAnggaran: 'BELANJA OPERASI',
    kategori: 'Belanja Pegawai BLU',
    uraian: 'Belanja Gaji, Tunjangan & Remunerasi Dewan Pengawas & Pegawai BLU',
    triwulan: 'Triwulan II (s.d. 30 Juni)',
    tahun: 2026,
    anggaran: 480000000000,
    realisasi: 235200000000,
    persentase: 49.0,
  },
  {
    id: 'lra-7',
    jenisAnggaran: 'BELANJA OPERASI',
    kategori: 'Belanja Barang dan Jasa',
    uraian: 'Belanja Barang Operasional Pelayanan, Bahan Medis & Kantor',
    triwulan: 'Triwulan II (s.d. 30 Juni)',
    tahun: 2026,
    anggaran: 920000000000,
    realisasi: 412600000000,
    persentase: 44.85,
  },
  {
    id: 'lra-8',
    jenisAnggaran: 'BELANJA OPERASI',
    kategori: 'Belanja Pemeliharaan',
    uraian: 'Belanja Pemeliharaan Sarana, Prasarana Pelabuhan & Infrastruktur',
    triwulan: 'Triwulan II (s.d. 30 Juni)',
    tahun: 2026,
    anggaran: 310000000000,
    realisasi: 128000000000,
    persentase: 41.29,
  },
  {
    id: 'lra-9',
    jenisAnggaran: 'BELANJA MODAL',
    kategori: 'Belanja Modal Gedung & Bangunan',
    uraian: 'Pengembangan Terminal Kargo, Fasilitas Logistik & Gedung Layanan',
    triwulan: 'Triwulan II (s.d. 30 Juni)',
    tahun: 2026,
    anggaran: 450000000000,
    realisasi: 168000000000,
    persentase: 37.33,
  },
  {
    id: 'lra-10',
    jenisAnggaran: 'BELANJA MODAL',
    kategori: 'Belanja Modal Jalan, Jaringan & Utilitas',
    uraian: 'Peningkatan Jalan Kawasan Industri, Jembatan & Jaringan Air Bersih',
    triwulan: 'Triwulan II (s.d. 30 Juni)',
    tahun: 2026,
    anggaran: 520000000000,
    realisasi: 182000000000,
    persentase: 35.0,
  },
  {
    id: 'lra-11',
    jenisAnggaran: 'BELANJA MODAL',
    kategori: 'Belanja Modal Peralatan & Mesin',
    uraian: 'Pengadaan Mesin STS Crane Dermaga, Alkes RSBP & Server PDSI',
    triwulan: 'Triwulan II (s.d. 30 Juni)',
    tahun: 2026,
    anggaran: 220000000000,
    realisasi: 86400000000,
    persentase: 39.27,
  },
];

// 2. DATA LAPORAN OPERASIONAL (LO) BLU (Hal. 2-3 Item 2)
export const OPERASIONAL_BLU_DATA: OperasionalBluItem[] = [
  {
    id: 'lo-1',
    kategori: 'PENDAPATAN-LO',
    uraian: 'Pendapatan Jasa Pengelolaan Lahan & Tata Ruang',
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 378.4,
    nilaiPeriodeSebelum: 341.2,
    nilaiKenaikanPenurunan: 37.2,
    persentase: 10.9,
  },
  {
    id: 'lo-2',
    kategori: 'PENDAPATAN-LO',
    uraian: 'Pendapatan Jasa Layanan Kepelabuhanan & Logistik',
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 462.8,
    nilaiPeriodeSebelum: 418.5,
    nilaiKenaikanPenurunan: 44.3,
    persentase: 10.58,
  },
  {
    id: 'lo-3',
    kategori: 'PENDAPATAN-LO',
    uraian: 'Pendapatan Jasa Kebandaraan & Konsesi Hang Nadim',
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 247.5,
    nilaiPeriodeSebelum: 225.0,
    nilaiKenaikanPenurunan: 22.5,
    persentase: 10.0,
  },
  {
    id: 'lo-4',
    kategori: 'PENDAPATAN-LO',
    uraian: 'Pendapatan Layanan Medis RSBP & Fasilitas Lingkungan',
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 271.3,
    nilaiPeriodeSebelum: 249.6,
    nilaiKenaikanPenurunan: 21.7,
    persentase: 8.69,
  },
  {
    id: 'lo-5',
    kategori: 'BEBAN-LO',
    uraian: 'Beban Pegawai & Remunerasi Pejabat Pengelola BLU',
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 238.9,
    nilaiPeriodeSebelum: 221.4,
    nilaiKenaikanPenurunan: 17.5,
    persentase: 7.9,
  },
  {
    id: 'lo-6',
    kategori: 'BEBAN-LO',
    uraian: 'Beban Barang, Jasa Operasional & Bahan Medis Habis Pakai',
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 418.2,
    nilaiPeriodeSebelum: 395.0,
    nilaiKenaikanPenurunan: 23.2,
    persentase: 5.87,
  },
  {
    id: 'lo-7',
    kategori: 'BEBAN-LO',
    uraian: 'Beban Pemeliharaan Sarana Gedung, Dermaga & Aset BMN',
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 131.5,
    nilaiPeriodeSebelum: 124.8,
    nilaiKenaikanPenurunan: 6.7,
    persentase: 5.37,
  },
  {
    id: 'lo-8',
    kategori: 'BEBAN-LO',
    uraian: 'Beban Penyusutan Aset Tetap dan Amortisasi Intangible',
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 185.0,
    nilaiPeriodeSebelum: 172.5,
    nilaiKenaikanPenurunan: 12.5,
    persentase: 7.25,
  },
  {
    id: 'lo-9',
    kategori: 'SURPLUS-DEFISIT',
    uraian: 'SURPLUS / (DEFISIT) DARI OPERASI BLU',
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 386.4,
    nilaiPeriodeSebelum: 350.6,
    nilaiKenaikanPenurunan: 35.8,
    persentase: 10.21,
  },
];

// 3. DATA LAPORAN PERUBAHAN EKUITAS BLU (Hal. 3 Item 4)
export const PERUBAHAN_EKUITAS_BLU_DATA: PerubahanEkuitasBluItem[] = [
  {
    id: 'pe-1',
    uraian: 'Ekuitas Awal (Saldo Awal per 1 Januari)',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '30 Juni 2025',
    nilaiPeriodeBaru: 48250.0,
    nilaiPeriodeSebelum: 46120.0,
    nilaiKenaikanPenurunan: 2130.0,
    persentase: 4.62,
  },
  {
    id: 'pe-2',
    uraian: 'Surplus / (Defisit) - LO Periode Berjalan',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '30 Juni 2025',
    nilaiPeriodeBaru: 386.4,
    nilaiPeriodeSebelum: 350.6,
    nilaiKenaikanPenurunan: 35.8,
    persentase: 10.21,
  },
  {
    id: 'pe-3',
    uraian: 'Dampak Kumulatif Perubahan Kebijakan / Koreksi Mendasar',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '30 Juni 2025',
    nilaiPeriodeBaru: 42.5,
    nilaiPeriodeSebelum: 18.2,
    nilaiKenaikanPenurunan: 24.3,
    persentase: 133.52,
  },
  {
    id: 'pe-4',
    uraian: 'Koreksi Nilai Aset Non Lancar & Reklasifikasi BMN',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '30 Juni 2025',
    nilaiPeriodeBaru: 68.3,
    nilaiPeriodeSebelum: 34.0,
    nilaiKenaikanPenurunan: 34.3,
    persentase: 100.88,
  },
  {
    id: 'pe-5',
    uraian: 'Ekuitas Akhir Konsolidasian BLU',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: '30 Juni 2026',
    periodeSebelum: '30 Juni 2025',
    nilaiPeriodeBaru: 48747.2,
    nilaiPeriodeSebelum: 46522.8,
    nilaiKenaikanPenurunan: 2224.4,
    persentase: 4.78,
  },
];

// 4. DATA LAPORAN ARUS KAS BLU (Hal. 3 Item 5)
export const ARUS_KAS_BLU_DATA: ArusKasBluItem[] = [
  {
    id: 'ak-1',
    kategoriAktivitas: 'OPERASI',
    uraian: 'Arus Kas Bersih dari Aktivitas Operasi (Penerimaan PNBP Layanan vs Beban Kas)',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 528.6,
    nilaiPeriodeSebelum: 472.1,
    nilaiKenaikanPenurunan: 56.5,
    persentase: 11.97,
  },
  {
    id: 'ak-2',
    kategoriAktivitas: 'INVESTASI',
    uraian: 'Arus Kas Bersih dari Aktivitas Investasi Nonkeuangan (Realisasi Belanja Modal Aset Tetap)',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: -364.5,
    nilaiPeriodeSebelum: -328.0,
    nilaiKenaikanPenurunan: -36.5,
    persentase: 11.13,
  },
  {
    id: 'ak-3',
    kategoriAktivitas: 'PENDANAAN',
    uraian: 'Arus Kas Bersih dari Aktivitas Pendanaan (Dana Alokasi & Penyertaan Modal)',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 85.0,
    nilaiPeriodeSebelum: 60.0,
    nilaiKenaikanPenurunan: 25.0,
    persentase: 41.67,
  },
  {
    id: 'ak-4',
    kategoriAktivitas: 'TRANSITORIS',
    uraian: 'Arus Kas Bersih dari Aktivitas Transitoris (Perhitungan Fihak Ketiga/PFK & Pajak)',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 14.8,
    nilaiPeriodeSebelum: 11.5,
    nilaiKenaikanPenurunan: 3.3,
    persentase: 28.7,
  },
  {
    id: 'ak-5',
    kategoriAktivitas: 'SALDO',
    uraian: 'Kenaikan / (Penurunan) Bersih Kas Periode Berjalan',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 263.9,
    nilaiPeriodeSebelum: 215.6,
    nilaiKenaikanPenurunan: 48.3,
    persentase: 22.4,
  },
  {
    id: 'ak-6',
    kategoriAktivitas: 'SALDO',
    uraian: 'Saldo Awal Kas BLU pada Kas & Bank (1 Januari)',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 1223.7,
    nilaiPeriodeSebelum: 1065.2,
    nilaiKenaikanPenurunan: 158.5,
    persentase: 14.88,
  },
  {
    id: 'ak-7',
    kategoriAktivitas: 'SALDO',
    uraian: 'Saldo Akhir Kas BLU pada Kas & Bank (30 Juni)',
    triwulan: 'TW II',
    tahun: 2026,
    periodeBaru: 'TW II 2026',
    periodeSebelum: 'TW II 2025',
    nilaiPeriodeBaru: 1487.6,
    nilaiPeriodeSebelum: 1280.8,
    nilaiKenaikanPenurunan: 206.8,
    persentase: 16.15,
  },
];

// 5. DATA LAPORAN NERACA BLU (Hal. 3 Item 6)
export const NERACA_BLU_DATA: NeracaBluItem[] = [
  {
    id: 'nr-1',
    kategori: 'ASET LANCAR',
    detail: 'Kas dan Setara Kas',
    namaPerkiraan: 'Kas pada Rekening Operasional & Penampung BLU',
    tahunBaru: 2026,
    tahunSebelumnya: 2025,
    nilaiTahunBaru: 1487.6,
    nilaiTahunSebelumnya: 1280.8,
    nilaiKenaikanPenurunan: 206.8,
    persentase: 16.15,
  },
  {
    id: 'nr-2',
    kategori: 'ASET LANCAR',
    detail: 'Piutang Pelayanan',
    namaPerkiraan: 'Piutang PNBP Layanan Jasa Lahan & Pelabuhan',
    tahunBaru: 2026,
    tahunSebelumnya: 2025,
    nilaiTahunBaru: 412.3,
    nilaiTahunSebelumnya: 388.5,
    nilaiKenaikanPenurunan: 23.8,
    persentase: 6.13,
  },
  {
    id: 'nr-3',
    kategori: 'ASET LANCAR',
    detail: 'Persediaan',
    namaPerkiraan: 'Persediaan Obat-obatan, Bahan Kimia SPAM & Material BMN',
    tahunBaru: 2026,
    tahunSebelumnya: 2025,
    nilaiTahunBaru: 88.4,
    nilaiTahunSebelumnya: 81.2,
    nilaiKenaikanPenurunan: 7.2,
    persentase: 8.87,
  },
  {
    id: 'nr-4',
    kategori: 'ASET TETAP',
    detail: 'Tanah & HPL',
    namaPerkiraan: 'Tanah Hak Pengelolaan Lahan (HPL) & Ruang Milik Jalan BP Batam',
    tahunBaru: 2026,
    tahunSebelumnya: 2025,
    nilaiTahunBaru: 34120.0,
    nilaiTahunSebelumnya: 33850.0,
    nilaiKenaikanPenurunan: 270.0,
    persentase: 0.8,
  },
  {
    id: 'nr-5',
    kategori: 'ASET TETAP',
    detail: 'Gedung dan Bangunan',
    namaPerkiraan: 'Gedung Kantor, Dermaga Pelabuhan, Runway & Terminal Bandara',
    tahunBaru: 2026,
    tahunSebelumnya: 2025,
    nilaiTahunBaru: 10240.0,
    nilaiTahunSebelumnya: 9810.0,
    nilaiKenaikanPenurunan: 430.0,
    persentase: 4.38,
  },
  {
    id: 'nr-6',
    kategori: 'ASET TETAP',
    detail: 'Jalan, Jaringan dan Irigasi',
    namaPerkiraan: 'Jalan Kolektor Kawasan Bebas, Jembatan Barelang & Jaringan Pipa Air',
    tahunBaru: 2026,
    tahunSebelumnya: 2025,
    nilaiTahunBaru: 4180.0,
    nilaiTahunSebelumnya: 3950.0,
    nilaiKenaikanPenurunan: 230.0,
    persentase: 5.82,
  },
  {
    id: 'nr-7',
    kategori: 'KEWAJIBAN',
    detail: 'Kewajiban Jangka Pendek',
    namaPerkiraan: 'Utang Belanja Barang/Jasa & Pendapatan Diterima Dimuka',
    tahunBaru: 2026,
    tahunSebelumnya: 2025,
    nilaiTahunBaru: 642.5,
    nilaiTahunSebelumnya: 598.0,
    nilaiKenaikanPenurunan: 44.5,
    persentase: 7.44,
  },
  {
    id: 'nr-8',
    kategori: 'EKUITAS',
    detail: 'Ekuitas BLU',
    namaPerkiraan: 'Total Ekuitas Badan Layanan Umum BP Batam',
    tahunBaru: 2026,
    tahunSebelumnya: 2025,
    nilaiTahunBaru: 48747.2,
    nilaiTahunSebelumnya: 46522.8,
    nilaiKenaikanPenurunan: 2224.4,
    persentase: 4.78,
  },
];

// 6. DATA LAPORAN SALDO BANK REAL TIME (Hal. 4 Item 13)
// Rule 12: "cukup nama bank, nomor rekening dan nilai saldonya"
export const SALDO_BANK_REALTIME_DATA: SaldoBankRealTimeItem[] = [
  {
    id: 'bank-1',
    namaBank: 'Bank Mandiri (Persero) Tbk',
    nomorRekening: '109-00-2458921-3',
    nilaiSaldo: 524350000000,
    unit: 'Biro Keuangan / Konsolidasi',
    kategoriUnit: 'Kantor Pusat BP Batam',
    kegunaanRekening: 'Rekening Operasional & Penampung PNBP Lahan',
    kategoriRekening: 'Operasional',
    tanggalRekap: '23 September 2026 15:00 WIB',
    persentaseShare: 35.25,
  },
  {
    id: 'bank-2',
    namaBank: 'Bank Rakyat Indonesia (BRI) Tbk',
    nomorRekening: '0021-01-000889-30-1',
    nilaiSaldo: 386100000000,
    unit: 'Biro Keuangan / RSBP Batam',
    kategoriUnit: 'Badan Usaha Rumah Sakit',
    kegunaanRekening: 'Rekening Penampung Kas Layanan Medis',
    kategoriRekening: 'Operasional',
    tanggalRekap: '23 September 2026 15:00 WIB',
    persentaseShare: 25.95,
  },
  {
    id: 'bank-3',
    namaBank: 'Bank Negara Indonesia (BNI) Tbk',
    nomorRekening: '018-456-7890-001',
    nilaiSaldo: 275800000000,
    unit: 'Dit. Pengelolaan Kepelabuhanan',
    kategoriUnit: 'Badan Usaha Pelabuhan',
    kegunaanRekening: 'Rekening Penerimaan Jasa Labuh & Dermaga',
    kategoriRekening: 'Penerimaan PNBP',
    tanggalRekap: '23 September 2026 15:00 WIB',
    persentaseShare: 18.54,
  },
  {
    id: 'bank-4',
    namaBank: 'Bank Tabungan Negara (BTN) Tbk',
    nomorRekening: '0015-88-990012-4',
    nilaiSaldo: 142250000000,
    unit: 'Dit. Pengelolaan Lahan',
    kategoriUnit: 'Pengelolaan Lahan & Rusun',
    kegunaanRekening: 'Rekening Penampung UWT & Sewa Rusunawa',
    kategoriRekening: 'Penerimaan PNBP',
    tanggalRekap: '23 September 2026 15:00 WIB',
    persentaseShare: 9.56,
  },
  {
    id: 'bank-5',
    namaBank: 'Bank Riau Kepri Syariah',
    nomorRekening: '101-08-00445-9',
    nilaiSaldo: 98600000000,
    unit: 'Biro Keuangan',
    kategoriUnit: 'Kantor Pusat BP Batam',
    kegunaanRekening: 'Rekening Dana Kelolaan Syariah & Deposito BLU',
    kategoriRekening: 'Investasi',
    tanggalRekap: '23 September 2026 15:00 WIB',
    persentaseShare: 6.63,
  },
  {
    id: 'bank-6',
    namaBank: 'Bank Central Asia (BCA) Tbk',
    nomorRekening: '061-399-4488',
    nilaiSaldo: 60500000000,
    unit: 'BU SPAM & Fasling',
    kategoriUnit: 'Badan Usaha SPAM',
    kegunaanRekening: 'Rekening Pembayaran Air Minum Mitra Industri',
    kategoriRekening: 'Dana Kelolaan',
    tanggalRekap: '23 September 2026 15:00 WIB',
    persentaseShare: 4.07,
  },
];

// 7. DATA LAPORAN PENERIMAAN SUMBER DANA (Hal. 4 Item 14)
export const PENERIMAAN_SUMBER_DANA_DATA: PenerimaanSumberDanaItem[] = [
  {
    id: 'sd-1',
    sumberDana: 'PNBP Jasa Layanan',
    unitKerja: 'Direktorat Pengelolaan Lahan (UWT & Pertanahan)',
    tanggalRekapAwal: '01 Januari 2026',
    tanggalRekapAkhir: '30 Juni 2026',
    nilai: 362.5,
    targetNilai: 680.0,
    capaian: 53.31,
  },
  {
    id: 'sd-2',
    sumberDana: 'PNBP Jasa Layanan',
    unitKerja: 'Direktorat Pengelolaan Kepelabuhanan',
    tanggalRekapAwal: '01 Januari 2026',
    tanggalRekapAkhir: '30 Juni 2026',
    nilai: 445.6,
    targetNilai: 820.0,
    capaian: 54.34,
  },
  {
    id: 'sd-3',
    sumberDana: 'PNBP Jasa Layanan',
    unitKerja: 'Direktorat Pengelolaan Kawasan Bandara (Hang Nadim)',
    tanggalRekapAwal: '01 Januari 2026',
    tanggalRekapAkhir: '30 Juni 2026',
    nilai: 238.1,
    targetNilai: 450.0,
    capaian: 52.91,
  },
  {
    id: 'sd-4',
    sumberDana: 'PNBP Jasa Layanan',
    unitKerja: 'Badan Usaha Rumah Sakit BP Batam',
    tanggalRekapAwal: '01 Januari 2026',
    tanggalRekapAkhir: '30 Juni 2026',
    nilai: 159.2,
    targetNilai: 310.0,
    capaian: 51.35,
  },
  {
    id: 'sd-5',
    sumberDana: 'PNBP Jasa Layanan',
    unitKerja: 'Badan Usaha SPAM, Fasilitas & Lingkungan',
    tanggalRekapAwal: '01 Januari 2026',
    tanggalRekapAkhir: '30 Juni 2026',
    nilai: 98.7,
    targetNilai: 190.0,
    capaian: 51.95,
  },
  {
    id: 'sd-6',
    sumberDana: 'Rupiah Murni (APBN)',
    unitKerja: 'Pembangunan Infrastruktur Strategis Nasional',
    tanggalRekapAwal: '01 Januari 2026',
    tanggalRekapAkhir: '30 Juni 2026',
    nilai: 185.0,
    targetNilai: 380.0,
    capaian: 48.68,
  },
  {
    id: 'sd-7',
    sumberDana: 'Pengelolaan Kas BLU',
    unitKerja: 'Biro Keuangan (Bunga Deposito & Saldo Optimalisasi Kas)',
    tanggalRekapAwal: '01 Januari 2026',
    tanggalRekapAkhir: '30 Juni 2026',
    nilai: 48.2,
    targetNilai: 85.0,
    capaian: 56.71,
  },
  {
    id: 'sd-8',
    sumberDana: 'Pinjaman/Hibah (PHLN)',
    unitKerja: 'Pusat Perencanaan Program Strategis',
    tanggalRekapAwal: '01 Januari 2026',
    tanggalRekapAkhir: '30 Juni 2026',
    nilai: 24.5,
    targetNilai: 50.0,
    capaian: 49.0,
  },
];

// 8. DATA REKAPITULASI PIUTANG TAK TERTAGIH (Hal. 5 Item 20)
export const PIUTANG_TAK_TERTAGIH_DATA: PiutangTakTertagihItem[] = [
  {
    id: 'ptt-1',
    nomorFaktur: 'FAK-LHN/2021/04882',
    tanggalTerbitFaktur: '15 Maret 2021',
    namaPelanggan: 'PT Batam Sentosa Maritime Corp',
    tanggalJatuhTempo: '15 Juni 2021',
    jumlahPiutangKoreksiKpknl: 4850000000,
    perhitunganDenda: 582000000,
    bayarFaktur: 600000000,
    saldoPiutangTakTertagih: 4832000000,
    statusPenyelesaian: 'Penyelidikan PUPN/KPKNL',
    umurPiutang: '> 5 Tahun (Macet)',
  },
  {
    id: 'ptt-2',
    nomorFaktur: 'FAK-PLB/2020/09114',
    tanggalTerbitFaktur: '08 November 2020',
    namaPelanggan: 'PT Graha Galang Galatama Logistik',
    tanggalJatuhTempo: '08 Februari 2021',
    jumlahPiutangKoreksiKpknl: 3420000000,
    perhitunganDenda: 410400000,
    bayarFaktur: 450000000,
    saldoPiutangTakTertagih: 3380400000,
    statusPenyelesaian: 'Penyelidikan PUPN/KPKNL',
    umurPiutang: '> 5 Tahun (Macet)',
  },
  {
    id: 'ptt-3',
    nomorFaktur: 'FAK-LHN/2022/01245',
    tanggalTerbitFaktur: '24 Januari 2022',
    namaPelanggan: 'PT Nusantara Megah Permai (UWT Lahan Industri)',
    tanggalJatuhTempo: '24 April 2022',
    jumlahPiutangKoreksiKpknl: 2750000000,
    perhitunganDenda: 275000000,
    bayarFaktur: 750000000,
    saldoPiutangTakTertagih: 2275000000,
    statusPenyelesaian: 'Restrukturisasi Pembayaran',
    umurPiutang: '4-5 Tahun',
  },
  {
    id: 'ptt-4',
    nomorFaktur: 'FAK-BDR/2021/00871',
    tanggalTerbitFaktur: '12 Agustus 2021',
    namaPelanggan: 'PT Selat Malaka Aviation Cargo',
    tanggalJatuhTempo: '12 November 2021',
    jumlahPiutangKoreksiKpknl: 1980000000,
    perhitunganDenda: 198000000,
    bayarFaktur: 300000000,
    saldoPiutangTakTertagih: 1878000000,
    statusPenyelesaian: 'Verifikasi BPKP',
    umurPiutang: '> 5 Tahun (Macet)',
  },
  {
    id: 'ptt-5',
    nomorFaktur: 'FAK-SPM/2022/07432',
    tanggalTerbitFaktur: '19 Juli 2022',
    namaPelanggan: 'PT Tirta Mas Utama Galang',
    tanggalJatuhTempo: '19 Oktober 2022',
    jumlahPiutangKoreksiKpknl: 1250000000,
    perhitunganDenda: 112500000,
    bayarFaktur: 250000000,
    saldoPiutangTakTertagih: 1112500000,
    statusPenyelesaian: 'Restrukturisasi Pembayaran',
    umurPiutang: '3-4 Tahun',
  },
  {
    id: 'ptt-6',
    nomorFaktur: 'FAK-LHN/2019/00318',
    tanggalTerbitFaktur: '10 Mei 2019',
    namaPelanggan: 'CV Kabil Sukses Sejahtera',
    tanggalJatuhTempo: '10 Agustus 2019',
    jumlahPiutangKoreksiKpknl: 890000000,
    perhitunganDenda: 106800000,
    bayarFaktur: 100000000,
    saldoPiutangTakTertagih: 896800000,
    statusPenyelesaian: 'Hapus Tagih Bersyarat',
    umurPiutang: '> 5 Tahun (Macet)',
  },
];
