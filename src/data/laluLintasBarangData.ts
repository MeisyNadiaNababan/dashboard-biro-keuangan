// Data Reference: Atribut Daftar Data Satu Data.pdf (Halaman 8 - 9)
// Unit: DIREKTORAT LALU LINTAS BARANG (9 Dataset Katalog)

export interface IzinPersyaratanItem {
  id: string;
  uraianIzin: string;
  persyaratan: string[];
  alurProses: string;
  standarWaktuJam: number;
  kategori: 'Industri' | 'Perdagangan' | 'Kawasan';
  sifatData: 'TERBUKA';
}

export interface KuotaBarangKonsumsiItem {
  id: string;
  kodeHs: string;
  komoditas: string;
  kuota: number;
  satuan: string;
  realisasi: number;
  nilaiEkonomiRp: number; // Dalam Rupiah
  sisaKuota: number;
  persentaseRealisasi: number;
  noSk: string;
  tanggalSk: string;
  importirAktif: number;
  statusKecukupan: 'Aman' | 'Waspada' | 'Kritis';
  sifatData: 'TERTUTUP';
}

export interface PenerbitanPerizinanLlbItem {
  id: string;
  bagian: 'Seksi Industri' | 'Seksi Perdagangan' | 'Seksi Kawasan';
  tahun: number;
  bulan: string;
  namaLayanan: string;
  kategoriLayanan: 'Pemasukan' | 'Pengeluaran' | 'Izin Usaha Kawasan' | 'Perdagangan';
  npwp: string;
  nib: string;
  namaPerusahaan: string;
  alamatPerusahaan: string;
  jenisApi: 'API-U' | 'API-P';
  jenisUsaha: string;
  tglDaftar: string;
  noPendaftaran: string;
  noIzin: string;
  status: 'Disetujui' | 'Sedang Proses' | 'Ditolak';
  durasiJam: number;
  sifatData: 'TERBUKA';
}

export interface SlaLayananItem {
  no: number;
  uraianIzin: string;
  sektor: 'Industri' | 'Perdagangan';
  persentaseTepatWaktu: number; // e.g. 97.5%
  rataRataWaktuJam: number; // e.g. 3.4 jam
  standarSlaJam: number; // e.g. 6 jam
  totalDokumen: number;
  dokumenTepatWaktu: number;
  sifatData: 'TERBUKA';
}

export interface PerusahaanKbliItem {
  no: number;
  namaPerusahaan: string;
  noIzinUsahaKawasan: string;
  alamat: string;
  kbli: string;
  namaKbli: string;
  sektor: string;
  statusOperasional: 'Aktif Beroperasi' | 'Tahap Konstruksi' | 'Ekspansi';
  luasLahanM2: number;
  sifatData: 'TERBATAS';
}

export interface VolumePenerbitanBulanan {
  bulan: string;
  bulanSingkat: string;
  izinPemasukan: number;
  izinPengeluaran: number;
  izinUsahaKawasan: number;
  izinPerdagangan: number;
  total: number;
  nilaiPnbpMiliar: number; // Dalam Miliar Rupiah (Sumbu Ganda Kanan)
  nilaiDevisaMiliar: number; // Nilai Transaksi Devisa Ekspor/Impor (Miliar Rupiah)
}

// -------------------------------------------------------------
// 0. DATA PNBP DIREKTORAT LALU LINTAS BARANG (Simkeu & Perizinan)
// -------------------------------------------------------------
export interface PnbpLlbItem {
  kategori: string;
  targetRp: number;
  realisasiRp: number;
  persentase: number;
  pertumbuhanYoY: number;
  uraian: string;
  katalogRef: string;
}

export const LLB_PNBP_SUMMARY = {
  targetTahunanRp: 42500000000, // Rp 42,50 Miliar
  realisasiYtdRp: 36125000000,   // Rp 36,12 Miliar
  persentaseCapaian: 85.0,      // 85,0%
  pertumbuhanYoY: 14.2,         // +14,2% YoY
  sisaTargetRp: 6375000000,     // Rp 6,375 Miliar
  items: [
    {
      kategori: 'Pelayanan Izin Pemasukan Industri',
      targetRp: 21500000000,
      realisasiRp: 18400000000,
      persentase: 85.6,
      pertumbuhanYoY: 15.2,
      uraian: 'Tarif jasa verifikasi dokumen pemasukan bahan baku & mesin industri berikat (845 SK)',
      katalogRef: 'Item #6 (Rekap Izin Pemasukan)',
    },
    {
      kategori: 'Pelayanan Izin Pengeluaran Industri',
      targetRp: 11500000000,
      realisasiRp: 9800000000,
      persentase: 85.2,
      pertumbuhanYoY: 13.8,
      uraian: 'Jasa pelayanan permohonan pengeluaran produk olahan & re-ekspor LDP (520 SK)',
      katalogRef: 'Item #7 (Rekap Izin Pengeluaran)',
    },
    {
      kategori: 'Izin Usaha Kawasan (IUK)',
      targetRp: 6000000000,
      realisasiRp: 5225000000,
      persentase: 87.1,
      pertumbuhanYoY: 16.5,
      uraian: 'Penerbitan & perpanjangan izin operasional pengembang kawasan industri (265 SK)',
      katalogRef: 'Item #4 (Rekap Izin Usaha Kawasan)',
    },
    {
      kategori: 'Pelayanan Kuota Konsumsi & Dagang',
      targetRp: 3500000000,
      realisasiRp: 2700000000,
      persentase: 77.1,
      pertumbuhanYoY: 8.4,
      uraian: 'Biaya administrasi penetapan & pemantauan alokasi impor sembako (212 SK)',
      katalogRef: 'Item #2 & #3 (Kuota & Perdagangan)',
    },
  ] as PnbpLlbItem[],
};

// -------------------------------------------------------------
// 1. DATA PERSYARATAN & ALUR LAYANAN (Item #1)
// -------------------------------------------------------------
export const PERSYARATAN_LAYANAN_DATA: IzinPersyaratanItem[] = [
  {
    id: 'IZN-001',
    uraianIzin: 'Izin Pemasukan Barang Modal & Bahan Baku Industri (IPB-Industri)',
    kategori: 'Industri',
    persyaratan: [
      'NIB & Izin Usaha Industri yang berlaku',
      'Rencana Kebutuhan Barang Impor (RKBI)',
      'Faktur/Invoice & Packing List resmi',
      'Bukti kepemilikan/sewa pabrik di KPBPBB Batam',
      'Laporan realisasi penggunaan bahan baku periode sebelumnya',
    ],
    alurProses: 'Permohonan Online (IBOSS/INSW) -> Validasi Verifikator (2 Jam) -> Verifikasi Teknis Analis (2 Jam) -> Penerbitan SK Izin Direktur (1 Jam)',
    standarWaktuJam: 6,
    sifatData: 'TERBUKA',
  },
  {
    id: 'IZN-002',
    uraianIzin: 'Izin Pengeluaran Barang Hasil Industri ke Luar Daerah Pabean (Re-Ekspor)',
    kategori: 'Industri',
    persyaratan: [
      'NIB & Surat Pemberitahuan Ekspor Barang (PEB)',
      'Certificate of Origin (CoO) / Form D/E/AK',
      'Surat Keterangan Hasil Olahan KPBPBB',
      'Bukti pemenuhan kewajiban kepabeanan',
    ],
    alurProses: 'Submit Dokumen Ekspor -> Cek Kesesuaian Fisik/Sistem -> Persetujuan Pejabat Teknis -> Penerbitan Nota Pengeluaran',
    standarWaktuJam: 4,
    sifatData: 'TERBUKA',
  },
  {
    id: 'IZN-003',
    uraianIzin: 'Izin Usaha Kawasan (IUK) Industri KPBPBB Batam',
    kategori: 'Kawasan',
    persyaratan: [
      'Akta Pendirian Badan Hukum & SK Kemenkumham',
      'Masterplan Kawasan Industri yang telah disahkan',
      'Dokumen AMDAL / UKL-UPL terintegrasi',
      'Bukti penguasaan lahan minimal 20 Hektar',
    ],
    alurProses: 'Registrasi Pelaku Usaha -> Kajian Kelayakan Tata Ruang -> Rapat Tim Koordinasi Teknis -> Penerbitan SK IUK Kepala BP Batam',
    standarWaktuJam: 24,
    sifatData: 'TERBUKA',
  },
  {
    id: 'IZN-004',
    uraianIzin: 'Pemasukan Barang Konsumsi Berdasarkan Kuota Induk',
    kategori: 'Perdagangan',
    persyaratan: [
      'NIB dengan hak akses impor perdagangan umum (API-U)',
      'Surat Penetapan Alokasi Kuota Tahunan BP Batam',
      'Perjanjian pasokan distributor terakreditasi',
      'Sertifikat Kesehatan / Sanitari & Phytosanitary (Karantina)',
    ],
    alurProses: 'Verifikasi Sisa Alokasi Kuota -> Uji Kelayakan Administrasi -> Validasi Port Clearance -> Terbit Surat Izin Masuk',
    standarWaktuJam: 8,
    sifatData: 'TERBUKA',
  },
  {
    id: 'IZN-005',
    uraianIzin: 'Pengeluaran Sisa Bahan Baku dan Scrap Industri (Sub-Kontrak)',
    kategori: 'Industri',
    persyaratan: [
      'Surat Perjanjian Subkontrak resmi antarpabrik',
      'Daftar rincian material scrap / waste industri',
      'Rekomendasi Lingkungan Hidup untuk limbah non-B3',
    ],
    alurProses: 'Pemeriksaan manifest limbah -> Verifikasi bobot timbang -> Rekomendasi teknis -> Terbit Izin Pengeluaran',
    standarWaktuJam: 6,
    sifatData: 'TERBUKA',
  },
];

// -------------------------------------------------------------
// 2. DATA REALISASI KUOTA INDUK BARANG KONSUMSI (Item #2)
// -------------------------------------------------------------
export const KUOTA_BARANG_KONSUMSI_DATA: KuotaBarangKonsumsiItem[] = [
  {
    id: 'KBK-01',
    kodeHs: '1006.30.90',
    komoditas: 'Beras Khusus / Premium (Jasmine & Basmati)',
    kuota: 32000,
    satuan: 'Ton',
    realisasi: 24650,
    nilaiEkonomiRp: 394400000000, // Rp 394.4 Miliar
    sisaKuota: 7350,
    persentaseRealisasi: 77.0,
    noSk: 'SK.KPTS.118/KA/DLLB/2026',
    tanggalSk: '15 Januari 2026',
    importirAktif: 8,
    statusKecukupan: 'Aman',
    sifatData: 'TERTUTUP',
  },
  {
    id: 'KBK-02',
    kodeHs: '1701.99.10',
    komoditas: 'Gula Pasir Kristal Putih (Konsumsi Rumah Tangga)',
    kuota: 28000,
    satuan: 'Ton',
    realisasi: 21840,
    nilaiEkonomiRp: 349440000000, // Rp 349.4 Miliar
    sisaKuota: 6160,
    persentaseRealisasi: 78.0,
    noSk: 'SK.KPTS.120/KA/DLLB/2026',
    tanggalSk: '18 Januari 2026',
    importirAktif: 6,
    statusKecukupan: 'Aman',
    sifatData: 'TERTUTUP',
  },
  {
    id: 'KBK-03',
    kodeHs: '0202.30.00',
    komoditas: 'Daging Lembu Beku Tanpa Tulang (Boneless Beef)',
    kuota: 6500,
    satuan: 'Ton',
    realisasi: 4950,
    nilaiEkonomiRp: 445500000000, // Rp 445.5 Miliar
    sisaKuota: 1550,
    persentaseRealisasi: 76.2,
    noSk: 'SK.KPTS.125/KA/DLLB/2026',
    tanggalSk: '22 Januari 2026',
    importirAktif: 11,
    statusKecukupan: 'Aman',
    sifatData: 'TERTUTUP',
  },
  {
    id: 'KBK-04',
    kodeHs: '1101.00.10',
    komoditas: 'Tepung Terigu Mutu Pangan Industri',
    kuota: 18000,
    satuan: 'Ton',
    realisasi: 14760,
    nilaiEkonomiRp: 177120000000, // Rp 177.1 Miliar
    sisaKuota: 3240,
    persentaseRealisasi: 82.0,
    noSk: 'SK.KPTS.128/KA/DLLB/2026',
    tanggalSk: '25 Januari 2026',
    importirAktif: 7,
    statusKecukupan: 'Aman',
    sifatData: 'TERTUTUP',
  },
  {
    id: 'KBK-05',
    kodeHs: '1511.90.20',
    komoditas: 'Minyak Goreng Sawit Olahan Kemasan',
    kuota: 14000,
    satuan: 'Kilo Liter',
    realisasi: 11620,
    nilaiEkonomiRp: 185920000000, // Rp 185.9 Miliar
    sisaKuota: 2380,
    persentaseRealisasi: 83.0,
    noSk: 'SK.KPTS.132/KA/DLLB/2026',
    tanggalSk: '02 Februari 2026',
    importirAktif: 9,
    statusKecukupan: 'Aman',
    sifatData: 'TERTUTUP',
  },
  {
    id: 'KBK-06',
    kodeHs: '0402.10.00',
    komoditas: 'Susu Bubuk & Olahan Susu Kemasan Khusus',
    kuota: 4500,
    satuan: 'Ton',
    realisasi: 3240,
    nilaiEkonomiRp: 162000000000, // Rp 162.0 Miliar
    sisaKuota: 1260,
    persentaseRealisasi: 72.0,
    noSk: 'SK.KPTS.135/KA/DLLB/2026',
    tanggalSk: '05 Februari 2026',
    importirAktif: 5,
    statusKecukupan: 'Waspada',
    sifatData: 'TERTUTUP',
  },
  {
    id: 'KBK-07',
    kodeHs: '0703.20.90',
    komoditas: 'Bawang Putih Segar / Dingin',
    kuota: 5000,
    satuan: 'Ton',
    realisasi: 4250,
    nilaiEkonomiRp: 106250000000, // Rp 106.3 Miliar
    sisaKuota: 750,
    persentaseRealisasi: 85.0,
    noSk: 'SK.KPTS.140/KA/DLLB/2026',
    tanggalSk: '10 Februari 2026',
    importirAktif: 6,
    statusKecukupan: 'Waspada',
    sifatData: 'TERTUTUP',
  },
];

// -------------------------------------------------------------
// 3. REKAPITULASI PENERBITAN IZIN LALU LINTAS BARANG (Items #3, #4, #6, #7)
// -------------------------------------------------------------
export const REKAP_PENERBITAN_DETAIL_DATA: PenerbitanPerizinanLlbItem[] = [
  {
    id: 'PL-001',
    bagian: 'Seksi Industri',
    tahun: 2026,
    bulan: 'April',
    namaLayanan: 'Izin Pemasukan Bahan Baku Elektronik',
    kategoriLayanan: 'Pemasukan',
    npwp: '01.345.678.9-215.000',
    nib: '9120001234567',
    namaPerusahaan: 'PT Schneider Electric Manufacturing Batam',
    alamatPerusahaan: 'Kawasan Industri Batamindo Lot 208, Mukakuning',
    jenisApi: 'API-P',
    jenisUsaha: 'Industri Komponen Elektronika Tegangan Rendah',
    tglDaftar: '04/04/2026',
    noPendaftaran: 'REG-IND-2026-0891',
    noIzin: '503/IPB/DLLB/IV/2026',
    status: 'Disetujui',
    durasiJam: 2.5,
    sifatData: 'TERBUKA',
  },
  {
    id: 'PL-002',
    bagian: 'Seksi Industri',
    tahun: 2026,
    bulan: 'April',
    namaLayanan: 'Izin Pengeluaran Produk Semikonduktor ke Kawasan Pabean Lain',
    kategoriLayanan: 'Pengeluaran',
    npwp: '02.456.789.0-216.000',
    nib: '8120002345678',
    namaPerusahaan: 'PT Infineon Technologies Batam',
    alamatPerusahaan: 'Batamindo Industrial Park Lot 317, Batam',
    jenisApi: 'API-P',
    jenisUsaha: 'Industri Perakitan Komponen Semikonduktor',
    tglDaftar: '06/04/2026',
    noPendaftaran: 'REG-EXP-2026-0412',
    noIzin: '503/OPB/DLLB/IV/2026',
    status: 'Disetujui',
    durasiJam: 3.0,
    sifatData: 'TERBUKA',
  },
  {
    id: 'PL-003',
    bagian: 'Seksi Kawasan',
    tahun: 2026,
    bulan: 'April',
    namaLayanan: 'Perpanjangan Izin Usaha Kawasan (IUK) Industri',
    kategoriLayanan: 'Izin Usaha Kawasan',
    npwp: '01.123.456.7-214.000',
    nib: '0120003456789',
    namaPerusahaan: 'PT Batamindo Investment Corporation',
    alamatPerusahaan: 'Wisma Batamindo Lt. 3, Jl. Rasamala, Mukakuning',
    jenisApi: 'API-U',
    jenisUsaha: 'Pengembang & Pengelola Kawasan Industri Terpadu',
    tglDaftar: '08/04/2026',
    noPendaftaran: 'REG-IUK-2026-0045',
    noIzin: '503/IUK/DLLB/IV/2026',
    status: 'Disetujui',
    durasiJam: 18.0,
    sifatData: 'TERBUKA',
  },
  {
    id: 'PL-004',
    bagian: 'Seksi Perdagangan',
    tahun: 2026,
    bulan: 'April',
    namaLayanan: 'Persetujuan Impor Beras Khusus Kuota Tahunan',
    kategoriLayanan: 'Perdagangan',
    npwp: '03.789.012.3-217.000',
    nib: '7120004567890',
    namaPerusahaan: 'PT Pangan Mandiri Kepri',
    alamatPerusahaan: 'Komp. Ruko Nagoya Hill Blok G No. 12, Batam',
    jenisApi: 'API-U',
    jenisUsaha: 'Distributor Pangan Pokok & Sembako',
    tglDaftar: '10/04/2026',
    noPendaftaran: 'REG-DAG-2026-0178',
    noIzin: '503/PIK/DLLB/IV/2026',
    status: 'Disetujui',
    durasiJam: 4.5,
    sifatData: 'TERBUKA',
  },
  {
    id: 'PL-005',
    bagian: 'Seksi Industri',
    tahun: 2026,
    bulan: 'April',
    namaLayanan: 'Izin Pemasukan Mesin CNC & Robotik Fabrikasi',
    kategoriLayanan: 'Pemasukan',
    npwp: '01.890.123.4-215.000',
    nib: '6120005678901',
    namaPerusahaan: 'PT Caterpillar Indonesia Batam',
    alamatPerusahaan: 'Jl. Brigjen Katamso Km. 6, Tanjung Uncang',
    jenisApi: 'API-P',
    jenisUsaha: 'Fabrikasi Mesin & Alat Berat Pertambangan',
    tglDaftar: '12/04/2026',
    noPendaftaran: 'REG-IND-2026-0932',
    noIzin: '503/IPB/DLLB/IV/2026',
    status: 'Disetujui',
    durasiJam: 3.8,
    sifatData: 'TERBUKA',
  },
  {
    id: 'PL-006',
    bagian: 'Seksi Industri',
    tahun: 2026,
    bulan: 'April',
    namaLayanan: 'Izin Pengeluaran Limbah Scrap Logam Hasil Fabrikasi',
    kategoriLayanan: 'Pengeluaran',
    npwp: '02.901.234.5-216.000',
    nib: '5120006789012',
    namaPerusahaan: 'PT McDermott Indonesia',
    alamatPerusahaan: 'Jl. Bawal No. 1, Batu Ampar, Batam',
    jenisApi: 'API-P',
    jenisUsaha: 'Fabrikasi Platform Minyak & Gas Lepas Pantai',
    tglDaftar: '14/04/2026',
    noPendaftaran: 'REG-EXP-2026-0488',
    noIzin: '503/OPB/DLLB/IV/2026',
    status: 'Disetujui',
    durasiJam: 4.0,
    sifatData: 'TERBUKA',
  },
  {
    id: 'PL-007',
    bagian: 'Seksi Kawasan',
    tahun: 2026,
    bulan: 'April',
    namaLayanan: 'Izin Usaha Kawasan Galangan Kapal & Maritim',
    kategoriLayanan: 'Izin Usaha Kawasan',
    npwp: '01.012.345.6-214.000',
    nib: '4120007890123',
    namaPerusahaan: 'PT Kabil Indonusa Estate',
    alamatPerusahaan: 'Jl. Hang Kesturi I No. 1, Kabil Integrated Industrial Park',
    jenisApi: 'API-U',
    jenisUsaha: 'Kawasan Industri Energi Terbarukan & Logistik Maritim',
    tglDaftar: '16/04/2026',
    noPendaftaran: 'REG-IUK-2026-0051',
    noIzin: '503/IUK/DLLB/IV/2026',
    status: 'Disetujui',
    durasiJam: 20.5,
    sifatData: 'TERBUKA',
  },
  {
    id: 'PL-008',
    bagian: 'Seksi Perdagangan',
    tahun: 2026,
    bulan: 'April',
    namaLayanan: 'Persetujuan Pemasukan Gula Kristal Konsumsi',
    kategoriLayanan: 'Perdagangan',
    npwp: '03.234.567.8-217.000',
    nib: '3120008901234',
    namaPerusahaan: 'PT Batam Logistik Pangan Nusantara',
    alamatPerusahaan: 'Pergudangan Citra Buana II Blok E, Batu Ampar',
    jenisApi: 'API-U',
    jenisUsaha: 'Penyedia Bahan Pokok Industri Kecil & Retail',
    tglDaftar: '18/04/2026',
    noPendaftaran: 'REG-DAG-2026-0205',
    noIzin: '503/PIK/DLLB/IV/2026',
    status: 'Disetujui',
    durasiJam: 3.2,
    sifatData: 'TERBUKA',
  },
];

// -------------------------------------------------------------
// 4. SUMMARY KOMPOSISI PERIZINAN (Untuk Unified Donut/Pie Chart)
// -------------------------------------------------------------
export interface KomposisiPerizinanSummary {
  kategori: string;
  subLabel: string;
  volume: number;
  persentase: number;
  color: string;
  datasetItemRef: string;
}

export const KOMPOSISI_PERIZINAN_DATA: KomposisiPerizinanSummary[] = [
  {
    kategori: 'Izin Pemasukan Barang (Industri)',
    subLabel: 'Bahan Baku, Mesin & Penolong Pabrik',
    volume: 845,
    persentase: 45.9,
    color: '#1F4E79', // Navy Brand BP Batam
    datasetItemRef: 'Item #6 (Rekap Izin Pemasukan)',
  },
  {
    kategori: 'Izin Pengeluaran Barang (Industri)',
    subLabel: 'Hasil Produksi, Re-ekspor, & Scrap',
    volume: 520,
    persentase: 28.2,
    color: '#2E75B6', // Blue Accent
    datasetItemRef: 'Item #7 (Rekap Izin Pengeluaran)',
  },
  {
    kategori: 'Izin Usaha Kawasan (IUK)',
    subLabel: 'Pengembang & Tenant Kawasan Industri',
    volume: 265,
    persentase: 14.4,
    color: '#0D9488', // Teal
    datasetItemRef: 'Item #4 (Rekap Izin Usaha Kawasan)',
  },
  {
    kategori: 'Izin Perdagangan & Kuota Konsumsi',
    subLabel: 'Pangan Pokok & Barang Konsumsi',
    volume: 212,
    persentase: 11.5,
    color: '#F59E0B', // Amber
    datasetItemRef: 'Item #3 (Rekap Izin Perdagangan)',
  },
];

// Tren Bulanan Volume Penerbitan & Dual-Axis Nilai PNBP/Devisa (Jan - Jun 2026)
export const TREN_VOLUME_BULANAN: VolumePenerbitanBulanan[] = [
  {
    bulan: 'Januari 2026',
    bulanSingkat: 'Jan',
    izinPemasukan: 195,
    izinPengeluaran: 120,
    izinUsahaKawasan: 60,
    izinPerdagangan: 48,
    total: 423,
    nilaiPnbpMiliar: 7.85, // Rp 7,85 M
    nilaiDevisaMiliar: 382.5,
  },
  {
    bulan: 'Februari 2026',
    bulanSingkat: 'Feb',
    izinPemasukan: 210,
    izinPengeluaran: 128,
    izinUsahaKawasan: 68,
    izinPerdagangan: 52,
    total: 458,
    nilaiPnbpMiliar: 8.92, // Rp 8,92 M
    nilaiDevisaMiliar: 415.0,
  },
  {
    bulan: 'Maret 2026',
    bulanSingkat: 'Mar',
    izinPemasukan: 218,
    izinPengeluaran: 134,
    izinUsahaKawasan: 67,
    izinPerdagangan: 54,
    total: 473,
    nilaiPnbpMiliar: 9.45, // Rp 9,45 M
    nilaiDevisaMiliar: 438.2,
  },
  {
    bulan: 'April 2026',
    bulanSingkat: 'Apr',
    izinPemasukan: 222,
    izinPengeluaran: 138,
    izinUsahaKawasan: 70,
    izinPerdagangan: 58,
    total: 488,
    nilaiPnbpMiliar: 9.90, // Rp 9,90 M
    nilaiDevisaMiliar: 455.8,
  },
  {
    bulan: 'Mei 2026',
    bulanSingkat: 'Mei',
    izinPemasukan: 235,
    izinPengeluaran: 145,
    izinUsahaKawasan: 72,
    izinPerdagangan: 61,
    total: 513,
    nilaiPnbpMiliar: 10.35, // Rp 10,35 M
    nilaiDevisaMiliar: 472.0,
  },
  {
    bulan: 'Juni 2026',
    bulanSingkat: 'Jun',
    izinPemasukan: 248,
    izinPengeluaran: 152,
    izinUsahaKawasan: 76,
    izinPerdagangan: 64,
    total: 540,
    nilaiPnbpMiliar: 11.10, // Rp 11,10 M
    nilaiDevisaMiliar: 495.5,
  },
];

// -------------------------------------------------------------
// 5. DATA KINERJA SLA & WAKTU LAYANAN (Items #8 & #9)
// -------------------------------------------------------------
export const SLA_LAYANAN_DATA: SlaLayananItem[] = [
  // SEKTOR INDUSTRI (Item #9)
  {
    no: 1,
    uraianIzin: 'Penerbitan Izin Pemasukan Bahan Baku Industri',
    sektor: 'Industri',
    persentaseTepatWaktu: 98.2,
    rataRataWaktuJam: 2.8,
    standarSlaJam: 6.0,
    totalDokumen: 450,
    dokumenTepatWaktu: 442,
    sifatData: 'TERBUKA',
  },
  {
    no: 2,
    uraianIzin: 'Penerbitan Izin Pemasukan Mesin & Peralatan Modal',
    sektor: 'Industri',
    persentaseTepatWaktu: 96.5,
    rataRataWaktuJam: 3.5,
    standarSlaJam: 6.0,
    totalDokumen: 260,
    dokumenTepatWaktu: 251,
    sifatData: 'TERBUKA',
  },
  {
    no: 3,
    uraianIzin: 'Penerbitan Izin Pengeluaran Hasil Produksi (Ekspor/LDP)',
    sektor: 'Industri',
    persentaseTepatWaktu: 97.4,
    rataRataWaktuJam: 3.1,
    standarSlaJam: 4.0,
    totalDokumen: 380,
    dokumenTepatWaktu: 370,
    sifatData: 'TERBUKA',
  },
  {
    no: 4,
    uraianIzin: 'Penerbitan Izin Pengeluaran Scrap & Sisa Olahan',
    sektor: 'Industri',
    persentaseTepatWaktu: 95.0,
    rataRataWaktuJam: 4.2,
    standarSlaJam: 6.0,
    totalDokumen: 140,
    dokumenTepatWaktu: 133,
    sifatData: 'TERBUKA',
  },
  // SEKTOR PERDAGANGAN (Item #8)
  {
    no: 5,
    uraianIzin: 'Persetujuan Pemasukan Barang Konsumsi Beras & Gula',
    sektor: 'Perdagangan',
    persentaseTepatWaktu: 95.8,
    rataRataWaktuJam: 4.0,
    standarSlaJam: 8.0,
    totalDokumen: 95,
    dokumenTepatWaktu: 91,
    sifatData: 'TERBUKA',
  },
  {
    no: 6,
    uraianIzin: 'Persetujuan Pemasukan Daging Lembu & Produk Susu',
    sektor: 'Perdagangan',
    persentaseTepatWaktu: 94.6,
    rataRataWaktuJam: 4.8,
    standarSlaJam: 8.0,
    totalDokumen: 65,
    dokumenTepatWaktu: 61,
    sifatData: 'TERBUKA',
  },
  {
    no: 7,
    uraianIzin: 'Persetujuan Pemasukan Aneka Komoditas Pangan Lainnya',
    sektor: 'Perdagangan',
    persentaseTepatWaktu: 96.2,
    rataRataWaktuJam: 3.9,
    standarSlaJam: 6.0,
    totalDokumen: 52,
    dokumenTepatWaktu: 50,
    sifatData: 'TERBUKA',
  },
];

// -------------------------------------------------------------
// 6. DATA KBLI PERUSAHAAN PEMILIK IZIN USAHA KAWASAN (Item #5)
// -------------------------------------------------------------
export const PERUSAHAAN_KBLI_DATA: PerusahaanKbliItem[] = [
  {
    no: 1,
    namaPerusahaan: 'PT Batamindo Investment Corporation',
    noIzinUsahaKawasan: 'IUK-2171-IND-001-2024',
    alamat: 'Jl. Rasamala No. 1, Kawasan Industri Batamindo, Mukakuning',
    kbli: '68130',
    namaKbli: 'Kawasan Industri (Industrial Estate Developer)',
    sektor: 'Pengembang Kawasan Industri',
    statusOperasional: 'Aktif Beroperasi',
    luasLahanM2: 3200000,
    sifatData: 'TERBATAS',
  },
  {
    no: 2,
    namaPerusahaan: 'PT Kabil Indonusa Estate',
    noIzinUsahaKawasan: 'IUK-2171-IND-002-2024',
    alamat: 'Jl. Hang Kesturi I No. 1, Kabil, Nongsa, Batam',
    kbli: '68130',
    namaKbli: 'Kawasan Industri Berikat Energi & Maritim',
    sektor: 'Kawasan Industri Maritim & Migas',
    statusOperasional: 'Aktif Beroperasi',
    luasLahanM2: 5400000,
    sifatData: 'TERBATAS',
  },
  {
    no: 3,
    namaPerusahaan: 'PT Panbil Utamacipta',
    noIzinUsahaKawasan: 'IUK-2171-IND-003-2024',
    alamat: 'Jl. Ahmad Yani, Kawasan Industri Panbil, Mukakuning',
    kbli: '68130',
    namaKbli: 'Kawasan Industri Elektronika & Manufaktur',
    sektor: 'Pengembang Kawasan Industri',
    statusOperasional: 'Aktif Beroperasi',
    luasLahanM2: 2100000,
    sifatData: 'TERBATAS',
  },
  {
    no: 4,
    namaPerusahaan: 'PT Citra Buana Prasida',
    noIzinUsahaKawasan: 'IUK-2171-IND-004-2025',
    alamat: 'Kawasan Industri Union & Citra Buana Park, Batu Ampar',
    kbli: '68130',
    namaKbli: 'Kawasan Industri Terpadu Pergudangan & Logistik',
    sektor: 'Logistik & Pergudangan Industri',
    statusOperasional: 'Aktif Beroperasi',
    luasLahanM2: 1250000,
    sifatData: 'TERBATAS',
  },
  {
    no: 5,
    namaPerusahaan: 'PT Puri Global Sukses (Kawasan Industri Puri)',
    noIzinUsahaKawasan: 'IUK-2171-IND-005-2025',
    alamat: 'Jl. Sudirman, Kawasan Industri Puri Industrial Park, Batam Centre',
    kbli: '68130',
    namaKbli: 'Kawasan Industri Ringan & Clean Industry',
    sektor: 'Industri Ringan & Presisi',
    statusOperasional: 'Aktif Beroperasi',
    luasLahanM2: 850000,
    sifatData: 'TERBATAS',
  },
  {
    no: 6,
    namaPerusahaan: 'PT Tunas Industri Batam',
    noIzinUsahaKawasan: 'IUK-2171-IND-006-2025',
    alamat: 'Jl. Engku Putri, Tunas Industrial Estate, Batam Centre',
    kbli: '68130',
    namaKbli: 'Kawasan Industri Pergudangan Modern & Pusat Data',
    sektor: 'Pusat Data & Manufaktur',
    statusOperasional: 'Ekspansi',
    luasLahanM2: 1400000,
    sifatData: 'TERBATAS',
  },
];

// =============================================================
// DATASET NO. 3 (Hal. 9): REKAPITULASI PENERBITAN LAYANAN PERIZINAN
// LALU LINTAS BARANG (INDUSTRI DAN PERDAGANGAN)
// Sifat: TERBUKA | Periode: JIKA UPDATE
// Atribut: BAGIAN, TAHUN, BULAN, TANGGAL REKAP AWAL, TANGGAL REKAP AKHIR,
// JUMLAH TOTAL, NAMA LAYANAN, NPWP, NIB, URAIAN LAYANAN, JENIS API, JENIS USAHA,
// NAMA PERUSAHAAN, ALAMAT PERUSAHAAN, TGL DAFTAR, NO PENDAFTARAN, NO IJIN, STATUS
// =============================================================

export interface LayananLlbItem {
  id: string;
  bagian: 'Industri' | 'Perdagangan';
  namaLayanan: string;
  jumlah: number;
  persentaseBagian: number;
  satuan: string;
  rataRataWaktuJam: number;
  keterangan: string;
}

export const REKAP_LAYANAN_INDUSTRI_PERDAGANGAN: LayananLlbItem[] = [
  // SEKSI INDUSTRI (Total: 1.365 Layanan)
  {
    id: 'SRV-IND-01',
    bagian: 'Industri',
    namaLayanan: 'Pemasukan Bahan Baku & Bahan Penolong Industri Manufaktur',
    jumlah: 535,
    persentaseBagian: 39.2,
    satuan: 'Dokumen SK',
    rataRataWaktuJam: 2.8,
    keterangan: 'Komponen elektronik, logam presisi, plastik cetakan untuk perakitan pabrik berikat',
  },
  {
    id: 'SRV-IND-02',
    bagian: 'Industri',
    namaLayanan: 'Pengeluaran Produk Jadi Hasil Olahan Industri ke Luar Negeri (Ekspor)',
    jumlah: 328,
    persentaseBagian: 24.0,
    satuan: 'Dokumen SK',
    rataRataWaktuJam: 3.1,
    keterangan: 'Pengapalan produk jadi semikonduktor, modul komputer, alat berat & kapal laut',
  },
  {
    id: 'SRV-IND-03',
    bagian: 'Industri',
    namaLayanan: 'Pemasukan Mesin, Suku Cadang & Peralatan Modal Pabrik',
    jumlah: 210,
    persentaseBagian: 15.4,
    satuan: 'Dokumen SK',
    rataRataWaktuJam: 3.5,
    keterangan: 'Mesin SMT, CNC robotics, generator daya & peralatan otomasi industri modern',
  },
  {
    id: 'SRV-IND-04',
    bagian: 'Industri',
    namaLayanan: 'Pengeluaran Produk Industri ke Tempat Lain Dalam Daerah Pabean (TLDDP)',
    jumlah: 152,
    persentaseBagian: 11.1,
    satuan: 'Dokumen SK',
    rataRataWaktuJam: 3.8,
    keterangan: 'Distribusi barang industri berfasilitas ke pasar domestik Indonesia dengan pelunasan bea',
  },
  {
    id: 'SRV-IND-05',
    bagian: 'Industri',
    namaLayanan: 'Pelayanan Pengerjaan Subkontrak Antar Industri KPBPBB',
    jumlah: 82,
    persentaseBagian: 6.0,
    satuan: 'Dokumen SK',
    rataRataWaktuJam: 4.2,
    keterangan: 'Kerja sama antar-tenant kawasan industri untuk proses electroplating, coating, stamping',
  },
  {
    id: 'SRV-IND-06',
    bagian: 'Industri',
    namaLayanan: 'Pengeluaran Limbah Sisa Bahan Baku / Scrap Logam Industri',
    jumlah: 58,
    persentaseBagian: 4.3,
    satuan: 'Dokumen SK',
    rataRataWaktuJam: 4.0,
    keterangan: 'Penjualan / pemusnahan scrap tembaga, aluminium, dan sisa bahan manufaktur terkontrol',
  },

  // SEKSI PERDAGANGAN (Total: 477 Layanan)
  {
    id: 'SRV-DAG-01',
    bagian: 'Perdagangan',
    namaLayanan: 'Persetujuan Pemasukan Beras Khusus & Premium Alokasi Kuota',
    jumlah: 145,
    persentaseBagian: 30.4,
    satuan: 'Dokumen SK',
    rataRataWaktuJam: 4.0,
    keterangan: 'Izin alokasi beras Jasmine, Basmati, dan beras khusus kebutuhan konsumsi masyarakat Batam',
  },
  {
    id: 'SRV-DAG-02',
    bagian: 'Perdagangan',
    namaLayanan: 'Persetujuan Pemasukan Gula Pasir Kristal Putih Konsumsi',
    jumlah: 118,
    persentaseBagian: 24.7,
    satuan: 'Dokumen SK',
    rataRataWaktuJam: 4.2,
    keterangan: 'Alokasi gula kristal konsumsi rumah tangga dan industri kecil menengah (IKM) Batam',
  },
  {
    id: 'SRV-DAG-03',
    bagian: 'Perdagangan',
    namaLayanan: 'Persetujuan Pemasukan Daging Lembu & Daging Beku Impor',
    jumlah: 92,
    persentaseBagian: 19.3,
    satuan: 'Dokumen SK',
    rataRataWaktuJam: 4.8,
    keterangan: 'Daging sapi beku tanpa tulang untuk perhotelan, restoran, dan pasar tradisional',
  },
  {
    id: 'SRV-DAG-04',
    bagian: 'Perdagangan',
    namaLayanan: 'Persetujuan Pemasukan Tepung Terigu Mutu Pangan',
    jumlah: 64,
    persentaseBagian: 13.4,
    satuan: 'Dokumen SK',
    rataRataWaktuJam: 3.6,
    keterangan: 'Tepung terigu protein tinggi untuk industri roti, mie, dan kebutuhan pangan harian',
  },
  {
    id: 'SRV-DAG-05',
    bagian: 'Perdagangan',
    namaLayanan: 'Persetujuan Pemasukan Susu, Mentega & Hasil Olahan Ternak',
    jumlah: 58,
    persentaseBagian: 12.2,
    satuan: 'Dokumen SK',
    rataRataWaktuJam: 3.9,
    keterangan: 'Susu formula, mentega, keju, dan olahan dairy berizin edar BPOM dan sertifikasi halal',
  },
];

// =============================================================
// DATASET NO. 4 (Hal. 9): REKAPITULASI PENERBITAN LAYANAN IZIN USAHA KAWASAN
// Sifat: TERBUKA | Periode: PERBULAN
// Atribut: URAIAN IZIN USAHA KAWASAN, JUMLAH PENERBITAN PER BULAN
// =============================================================

export interface RekapBulananItem {
  id: string;
  uraian: string;
  kategori: string;
  satuan: string;
  bulanan: { [bulan: string]: number };
  totalTahunan: number;
}

export const REKAP_IZIN_USAHA_KAWASAN_BULANAN: RekapBulananItem[] = [
  {
    id: 'IUK-01',
    uraian: 'Penerbitan Izin Usaha Kawasan (IUK) Baru Industri',
    kategori: 'Izin Baru',
    satuan: 'SK',
    bulanan: {
      Januari: 6,
      Februari: 8,
      Maret: 7,
      April: 8,
      Mei: 9,
      Juni: 10,
      Juli: 8,
      Agustus: 9,
      September: 8,
      Oktober: 7,
      November: 8,
      Desember: 6,
    },
    totalTahunan: 94,
  },
  {
    id: 'IUK-02',
    uraian: 'Perpanjangan Masa Berlaku Izin Usaha Kawasan (IUK)',
    kategori: 'Perpanjangan',
    satuan: 'SK',
    bulanan: {
      Januari: 8,
      Februari: 9,
      Maret: 9,
      April: 10,
      Mei: 10,
      Juni: 11,
      Juli: 10,
      Agustus: 11,
      September: 9,
      Oktober: 8,
      November: 9,
      Desember: 8,
    },
    totalTahunan: 112,
  },
  {
    id: 'IUK-03',
    uraian: 'Persetujuan Perluasan / Ekspansi Wilayah Kawasan Industri',
    kategori: 'Perluasan Lahan',
    satuan: 'SK',
    bulanan: {
      Januari: 2,
      Februari: 3,
      Maret: 2,
      April: 3,
      Mei: 4,
      Juni: 3,
      Juli: 3,
      Agustus: 3,
      September: 2,
      Oktober: 2,
      November: 3,
      Desember: 2,
    },
    totalTahunan: 32,
  },
  {
    id: 'IUK-04',
    uraian: 'Perubahan Data Administrasi / Pengurus & Masterplan IUK',
    kategori: 'Administrasi',
    satuan: 'SK',
    bulanan: {
      Januari: 2,
      Februari: 2,
      Maret: 3,
      April: 2,
      Mei: 3,
      Juni: 3,
      Juli: 2,
      Agustus: 2,
      September: 3,
      Oktober: 2,
      November: 2,
      Desember: 1,
    },
    totalTahunan: 27,
  },
];

// =============================================================
// DATASET NO. 6 (Hal. 9): REKAPITULASI PENERBITAN LAYANAN PERIZINAN PEMASUKAN BARANG
// Sifat: TERBUKA | Periode: PERBULAN
// Atribut: URAIAN IZIN PEMASUKAN BARANG, JUMLAH PENERBITAN PER BULAN
// =============================================================

export const REKAP_IZIN_PEMASUKAN_BULANAN: RekapBulananItem[] = [
  {
    id: 'IPB-01',
    uraian: 'Izin Pemasukan Bahan Baku & Bahan Penolong Industri Manufaktur',
    kategori: 'Bahan Baku',
    satuan: 'SK',
    bulanan: {
      Januari: 42,
      Februari: 45,
      Maret: 47,
      April: 48,
      Mei: 50,
      Juni: 52,
      Juli: 49,
      Agustus: 51,
      September: 47,
      Oktober: 46,
      November: 48,
      Desember: 44,
    },
    totalTahunan: 569,
  },
  {
    id: 'IPB-02',
    uraian: 'Izin Pemasukan Mesin & Peralatan Pabrik / Barang Modal',
    kategori: 'Barang Modal',
    satuan: 'SK',
    bulanan: {
      Januari: 18,
      Februari: 20,
      Maret: 21,
      April: 22,
      Mei: 23,
      Juni: 24,
      Juli: 22,
      Agustus: 23,
      September: 21,
      Oktober: 19,
      November: 21,
      Desember: 19,
    },
    totalTahunan: 253,
  },
  {
    id: 'IPB-03',
    uraian: 'Izin Pemasukan Komponen Elektronika, Chip & Semikonduktor',
    kategori: 'Elektronika',
    satuan: 'SK',
    bulanan: {
      Januari: 28,
      Februari: 30,
      Maret: 31,
      April: 32,
      Mei: 34,
      Juni: 36,
      Juli: 33,
      Agustus: 35,
      September: 32,
      Oktober: 30,
      November: 33,
      Desember: 29,
    },
    totalTahunan: 383,
  },
  {
    id: 'IPB-04',
    uraian: 'Izin Pemasukan Suku Cadang & Peralatan Pemeliharaan Fasilitas',
    kategori: 'Suku Cadang',
    satuan: 'SK',
    bulanan: {
      Januari: 12,
      Februari: 14,
      Maret: 15,
      April: 15,
      Mei: 16,
      Juni: 17,
      Juli: 15,
      Agustus: 16,
      September: 14,
      Oktober: 13,
      November: 15,
      Desember: 13,
    },
    totalTahunan: 175,
  },
  {
    id: 'IPB-05',
    uraian: 'Izin Pemasukan Bahan Kemasan & Pembungkus Standar Ekspor',
    kategori: 'Kemasan',
    satuan: 'SK',
    bulanan: {
      Januari: 10,
      Februari: 11,
      Maret: 12,
      April: 12,
      Mei: 13,
      Juni: 14,
      Juli: 12,
      Agustus: 13,
      September: 12,
      Oktober: 11,
      November: 12,
      Desember: 10,
    },
    totalTahunan: 142,
  },
];

// =============================================================
// DATASET NO. 7 (Hal. 9): REKAPITULASI PENERBITAN LAYANAN PERIZINAN PENGELUARAN BARANG
// Sifat: TERBUKA | Periode: PERBULAN
// Atribut: URAIAN IZIN PENGELUARAN BARANG, JUMLAH PENERBITAN PER BULAN
// =============================================================

export const REKAP_IZIN_PENGELUARAN_BULANAN: RekapBulananItem[] = [
  {
    id: 'OPB-01',
    uraian: 'Izin Pengeluaran Produk Jadi Olahan Industri ke Luar Daerah Pabean (Ekspor)',
    kategori: 'Ekspor',
    satuan: 'SK',
    bulanan: {
      Januari: 26,
      Februari: 28,
      Maret: 29,
      April: 30,
      Mei: 32,
      Juni: 34,
      Juli: 31,
      Agustus: 33,
      September: 30,
      Oktober: 28,
      November: 31,
      Desember: 27,
    },
    totalTahunan: 359,
  },
  {
    id: 'OPB-02',
    uraian: 'Izin Pengeluaran Produk Industri ke Tempat Lain Dalam Daerah Pabean (TLDDP)',
    kategori: 'Domestik TLDDP',
    satuan: 'SK',
    bulanan: {
      Januari: 16,
      Februari: 17,
      Maret: 18,
      April: 19,
      Mei: 20,
      Juni: 21,
      Juli: 19,
      Agustus: 20,
      September: 18,
      Oktober: 17,
      November: 19,
      Desember: 16,
    },
    totalTahunan: 220,
  },
  {
    id: 'OPB-03',
    uraian: 'Izin Pengeluaran Barang untuk Pengerjaan Subkontrak Antar Pabrik',
    kategori: 'Subkontrak',
    satuan: 'SK',
    bulanan: {
      Januari: 8,
      Februari: 9,
      Maret: 10,
      April: 10,
      Mei: 11,
      Juni: 12,
      Juli: 10,
      Agustus: 11,
      September: 10,
      Oktober: 9,
      November: 10,
      Desember: 8,
    },
    totalTahunan: 118,
  },
  {
    id: 'OPB-04',
    uraian: 'Izin Pengeluaran Sisa Bahan Baku, Rusak, atau Afval / Scrap Logam Industri',
    kategori: 'Scrap & Waste',
    satuan: 'SK',
    bulanan: {
      Januari: 6,
      Februari: 6,
      Maret: 7,
      April: 7,
      Mei: 8,
      Juni: 8,
      Juli: 7,
      Agustus: 8,
      September: 7,
      Oktober: 6,
      November: 7,
      Desember: 5,
    },
    totalTahunan: 82,
  },
  {
    id: 'OPB-05',
    uraian: 'Izin Pengeluaran Mesin & Peralatan Pabrik untuk Perbaikan (Re-Ekspor)',
    kategori: 'Perbaikan / Repair',
    satuan: 'SK',
    bulanan: {
      Januari: 4,
      Februari: 4,
      Maret: 5,
      April: 5,
      Mei: 5,
      Juni: 6,
      Juli: 5,
      Agustus: 5,
      September: 4,
      Oktober: 4,
      November: 5,
      Desember: 4,
    },
    totalTahunan: 56,
  },
];

// =============================================================
// DATASET NO. 8 (Hal. 9): PERSENTASE PELAYANAN LALU LINTAS BARANG
// PERDAGANGAN YANG SELESAI TEPAT WAKTU
// Sifat: TERBUKA | Periode: PERBULAN
// Atribut: NO, URAIAN IZIN, PERSENTASE LAYANAN TEPAT WAKTU,
// RATA-RATA WAKTU PENYELESAIAN DOKUMEN (DALAM JAM)
// =============================================================

export interface SlaPerdaganganItem {
  no: number;
  uraianIzin: string;
  persentaseLayananTepatWaktu: number; // e.g. 96.2%
  rataRataWaktuPenyelesaianDokumenJam: number; // e.g. 3.8 jam
  targetSlaJam: number;
  jumlahDokumen: number;
}

export const DATA_SLA_PERDAGANGAN: SlaPerdaganganItem[] = [
  {
    no: 1,
    uraianIzin: 'Persetujuan Pemasukan Beras Khusus Kuota Tahunan',
    persentaseLayananTepatWaktu: 96.8,
    rataRataWaktuPenyelesaianDokumenJam: 3.8,
    targetSlaJam: 8.0,
    jumlahDokumen: 145,
  },
  {
    no: 2,
    uraianIzin: 'Persetujuan Pemasukan Gula Pasir Kristal Putih',
    persentaseLayananTepatWaktu: 95.4,
    rataRataWaktuPenyelesaianDokumenJam: 4.1,
    targetSlaJam: 8.0,
    jumlahDokumen: 118,
  },
  {
    no: 3,
    uraianIzin: 'Persetujuan Pemasukan Daging Lembu & Produk Daging Beku',
    persentaseLayananTepatWaktu: 94.8,
    rataRataWaktuPenyelesaianDokumenJam: 4.6,
    targetSlaJam: 8.0,
    jumlahDokumen: 92,
  },
  {
    no: 4,
    uraianIzin: 'Persetujuan Pemasukan Tepung Terigu Mutu Pangan',
    persentaseLayananTepatWaktu: 97.2,
    rataRataWaktuPenyelesaianDokumenJam: 3.4,
    targetSlaJam: 6.0,
    jumlahDokumen: 64,
  },
  {
    no: 5,
    uraianIzin: 'Persetujuan Pemasukan Susu Bubuk & Produk Olahan Dairy',
    persentaseLayananTepatWaktu: 96.0,
    rataRataWaktuPenyelesaianDokumenJam: 3.7,
    targetSlaJam: 6.0,
    jumlahDokumen: 58,
  },
];

// =============================================================
// DATASET NO. 9 (Hal. 9): PERSENTASE PELAYANAN LALU LINTAS BARANG
// INDUSTRI YANG SELESAI TEPAT WAKTU
// Sifat: TERBUKA | Periode: PERBULAN
// Atribut: NO, URAIAN IZIN, PERSENTASE LAYANAN TEPAT WAKTU,
// RATA-RATA WAKTU PENYELESAIAN DOKUMEN (DALAM JAM)
// =============================================================

export interface SlaIndustriItem {
  no: number;
  uraianIzin: string;
  persentaseLayananTepatWaktu: number; // e.g. 98.4%
  rataRataWaktuPenyelesaianDokumenJam: number; // e.g. 2.7 jam
  targetSlaJam: number;
  jumlahDokumen: number;
}

export const DATA_SLA_INDUSTRI: SlaIndustriItem[] = [
  {
    no: 1,
    uraianIzin: 'Penerbitan Izin Pemasukan Bahan Baku & Bahan Penolong Industri',
    persentaseLayananTepatWaktu: 98.4,
    rataRataWaktuPenyelesaianDokumenJam: 2.7,
    targetSlaJam: 6.0,
    jumlahDokumen: 535,
  },
  {
    no: 2,
    uraianIzin: 'Penerbitan Izin Pemasukan Mesin & Peralatan Modal Pabrik',
    persentaseLayananTepatWaktu: 96.9,
    rataRataWaktuPenyelesaianDokumenJam: 3.3,
    targetSlaJam: 6.0,
    jumlahDokumen: 210,
  },
  {
    no: 3,
    uraianIzin: 'Penerbitan Izin Pengeluaran Produk Jadi Hasil Industri (Ekspor)',
    persentaseLayananTepatWaktu: 97.8,
    rataRataWaktuPenyelesaianDokumenJam: 2.9,
    targetSlaJam: 4.0,
    jumlahDokumen: 328,
  },
  {
    no: 4,
    uraianIzin: 'Penerbitan Izin Pengeluaran Produk Industri ke TLDDP',
    persentaseLayananTepatWaktu: 96.2,
    rataRataWaktuPenyelesaianDokumenJam: 3.6,
    targetSlaJam: 6.0,
    jumlahDokumen: 152,
  },
  {
    no: 5,
    uraianIzin: 'Penerbitan Izin Pengerjaan Subkontrak Antar Industri',
    persentaseLayananTepatWaktu: 95.8,
    rataRataWaktuPenyelesaianDokumenJam: 3.9,
    targetSlaJam: 6.0,
    jumlahDokumen: 82,
  },
  {
    no: 6,
    uraianIzin: 'Penerbitan Izin Pengeluaran Limbah Sisa / Scrap Logam Pabrik',
    persentaseLayananTepatWaktu: 95.2,
    rataRataWaktuPenyelesaianDokumenJam: 4.1,
    targetSlaJam: 6.0,
    jumlahDokumen: 58,
  },
];

