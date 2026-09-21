/**
 * DATA MODEL & MOCK DATASETS: BADAN USAHA RUMAH SAKIT (RSBP BATAM)
 * Berdasarkan Dokumen Resmi "Atribut Daftar Data Satu Data BP Batam" (Halaman 19 - 21)
 *
 * 18 DATASET BADAN USAHA RUMAH SAKIT:
 * DS-1:  INDEKS KEPUASAN MASYARAKAT LAYANAN BU RUMAH SAKIT BP BATAM (Hal 19)
 * DS-2:  REALISASI PENERIMAAN PNBP BADAN USAHA RUMAH SAKIT (Hal 19-20)
 * DS-3:  RASIO PENERIMAAN TERHADAP PENGELUARAN (Hal 20)
 * DS-4:  JUMLAH KASUS PENYAKIT TERBANYAK DI RUMAH SAKIT BP BATAM (Hal 20)
 * DS-5:  JUMLAH KUNJUNGAN PASIEN DI RUMAH SAKIT BP BATAM (Hal 20)
 * DS-6:  JUMLAH KUNJUNGAN PASIEN BERDASARKAN LAYANAN UNGGULAN RSBP (Hal 20)
 * DS-7:  DATA PEGAWAI RUMAH SAKIT BP BATAM (Hal 20)
 * DS-8:  DAFTAR LAYANAN MEDIS DI RUMAH SAKIT BP BATAM (Hal 20)
 * DS-9:  NILAI INDIKATOR EFISIENSI RUMAH SAKIT BP BATAM (Hal 20)
 * DS-10: DATA PORSI MAKANAN PASIEN DI RUMAH SAKIT BP BATAM (Hal 20)
 * DS-11: DATA LAYANAN UTAMA DAN PENUNJANG BADAN USAHA RUMAH SAKIT (Hal 20)
 * DS-12: NILAI REALISASI BELANJA DAN PENERIMAAN BP BATAM (Hal 20-21)
 * DS-13: DAFTAR KLINIK RUMAH SAKIT BP BATAM (Hal 21)
 * DS-14: DAFTAR PENYEWA FASILITAS RUMAH SAKIT BP BATAM (Hal 21)
 * DS-15: REKAPITULASI PROYEKSI PENERIMAAN DAN PENCAIRAN DANA BU RS (Hal 21)
 * DS-16: REGISTRASI PELAYANAN RAWAT INAP RAWAT JALAN DAN IGD (Hal 21)
 * DS-17: REKAPITULASI RESEP DISPENS OBAT GENERIK DAN NON GENERIK (Hal 21)
 * DS-18: DAFTAR FASILITAS PENUNJANG MEDIS (Hal 21)
 */

export interface RumahSakitFilterState {
  tahun: number;
  periodeBulan: string;
  bagianLayanan: string;
  caraBayar: string;
  statusTenant: string;
}

// 1. DATASET NO. 2 & NO. 12: REALISASI PNBP DAN BELANJA RSBP (Miliar Rupiah)
export interface RsKeuanganSummary {
  tahun: number;
  totalTargetPnbpMiliar: number;
  totalRealisasiPnbpMiliar: number;
  persentasePnbp: number;
  totalPaguBelanjaMiliar: number;
  totalRealisasiBelanjaMiliar: number;
  totalSisaPaguMiliar: number;
  persentaseBelanja: number;
  rasioPenerimaanBelanja: number; // Cost Recovery Rate (DS-3)
}

export const RS_KEUANGAN_SUMMARY: RsKeuanganSummary = {
  tahun: 2026,
  totalTargetPnbpMiliar: 145.0,
  totalRealisasiPnbpMiliar: 121.8,
  persentasePnbp: 84.0,
  totalPaguBelanjaMiliar: 135.0,
  totalRealisasiBelanjaMiliar: 109.35,
  totalSisaPaguMiliar: 25.65,
  persentaseBelanja: 81.0,
  rasioPenerimaanBelanja: 111.38, // 121.8 / 109.35 * 100%
};

// Rincian Pos PNBP Rumah Sakit (Dataset No. 2)
export interface RsPosPnbp {
  posLayanan: string;
  targetMiliar: number;
  realisasiMiliar: number;
  persenCapaian: number;
  kontribusiPersen: number;
}

export const RS_POS_PNBP: RsPosPnbp[] = [
  { posLayanan: 'Instalasi Rawat Inap (VIP, Kelas 1, 2, 3)', targetMiliar: 45.0, realisasiMiliar: 38.6, persenCapaian: 85.78, kontribusiPersen: 31.69 },
  { posLayanan: 'Instalasi Rawat Jalan / Poliklinik Spesialis', targetMiliar: 32.0, realisasiMiliar: 27.4, persenCapaian: 85.63, kontribusiPersen: 22.50 },
  { posLayanan: 'Instalasi Bedah Sentral (IBS / Operasi)', targetMiliar: 24.0, realisasiMiliar: 20.8, persenCapaian: 86.67, kontribusiPersen: 17.08 },
  { posLayanan: 'Instalasi Farmasi & BMHP Medis', targetMiliar: 20.0, realisasiMiliar: 16.5, persenCapaian: 82.50, kontribusiPersen: 13.55 },
  { posLayanan: 'Laboratorium Klinis & Patologi Anatomi', targetMiliar: 11.5, realisasiMiliar: 9.8, persenCapaian: 85.22, kontribusiPersen: 8.05 },
  { posLayanan: 'Radiologi & Imaging (CT-Scan, MRI 1.5T, USG)', targetMiliar: 8.5, realisasiMiliar: 6.2, persenCapaian: 72.94, kontribusiPersen: 5.09 },
  { posLayanan: 'Sewa Ruangan & Fasilitas Tenant (DS-14)', targetMiliar: 4.0, realisasiMiliar: 2.5, persenCapaian: 62.50, kontribusiPersen: 2.05 },
];

// Rincian Pos Belanja Rumah Sakit (Dataset No. 12)
export interface RsPosBelanja {
  kategoriBelanja: string;
  paguMiliar: number;
  realisasiMiliar: number;
  sisaPaguMiliar: number;
  persenSerapan: number;
}

export const RS_POS_BELANJA: RsPosBelanja[] = [
  { kategoriBelanja: 'Belanja Obat, Reagen Lab & BMHP Medis', paguMiliar: 52.0, realisasiMiliar: 43.8, sisaPaguMiliar: 8.2, persenSerapan: 84.23 },
  { kategoriBelanja: 'Belanja Jasa Pelayanan & Remunerasi Medis', paguMiliar: 42.0, realisasiMiliar: 34.65, sisaPaguMiliar: 7.35, persenSerapan: 82.50 },
  { kategoriBelanja: 'Belanja Operasional & Pemeliharaan Alkes Canggih', paguMiliar: 23.0, realisasiMiliar: 17.9, sisaPaguMiliar: 5.1, persenSerapan: 77.83 },
  { kategoriBelanja: 'Belanja Modal Alkes & Modernisasi Gedung', paguMiliar: 18.0, realisasiMiliar: 13.0, sisaPaguMiliar: 5.0, persenSerapan: 72.22 },
];

// 2. DATASET NO. 1: INDEKS KEPUASAN MASYARAKAT (IKM) LAYANAN RSBP
export interface RsIkmUnsur {
  unsur: string;
  skor: number;
  predikat: 'Sangat Baik' | 'Baik' | 'Cukup';
  bobotPersen: number;
}

export const RS_IKM_TOTAL = 86.95; // Mutu Pelayanan A (Sangat Baik)
export const RS_IKM_PREDIKAT = 'A (Sangat Baik)';

export const RS_IKM_UNSUR: RsIkmUnsur[] = [
  { unsur: 'Persyaratan Pelayanan Pasien', skor: 88.4, predikat: 'Sangat Baik', bobotPersen: 11.1 },
  { unsur: 'Kemudahan Alur & Prosedur Registrasi', skor: 85.6, predikat: 'Baik', bobotPersen: 11.1 },
  { unsur: 'Kecepatan Waktu Pelayanan & Respon IGD', skor: 84.2, predikat: 'Baik', bobotPersen: 11.1 },
  { unsur: 'Kepastian Tarif & Transparansi Klaim BPJS', skor: 89.1, predikat: 'Sangat Baik', bobotPersen: 11.1 },
  { unsur: 'Kompetensi & Keahlian Dokter/Nakes', skor: 91.5, predikat: 'Sangat Baik', bobotPersen: 11.1 },
  { unsur: 'Kesopanan & Keramahan Petugas RS', skor: 87.8, predikat: 'Sangat Baik', bobotPersen: 11.1 },
  { unsur: 'Kenyamanan & Kebersihan Sarana Ruangan', skor: 86.0, predikat: 'Baik', bobotPersen: 11.1 },
  { unsur: 'Penanganan Pengaduan & Informasi Pasien', skor: 84.5, predikat: 'Baik', bobotPersen: 11.1 },
  { unsur: 'Kualitas Edukasi & Konseling Obat', skor: 85.5, predikat: 'Baik', bobotPersen: 11.1 },
];

// 3. DATASET NO. 5: REKAP KUNJUNGAN PASIEN DI RSBP BATAM
export interface RsKunjunganLayanan {
  bagianLayanan: string;
  jumlahKunjungan: number;
  persentase: number;
  kunjunganBaru: number;
  kunjunganLama: number;
  pria: number;
  wanita: number;
  bpjs: number;
  asuransiSwasta: number;
  umumMandiri: number;
  keterangan: string;
}

export const RS_KUNJUNGAN_TOTAL = 184620; // 184.620 pasien per tahun berjalan

export const RS_KUNJUNGAN_LAYANAN: RsKunjunganLayanan[] = [
  {
    bagianLayanan: 'Instalasi Rawat Jalan (Poliklinik Spesialis)',
    jumlahKunjungan: 114250,
    persentase: 61.89,
    kunjunganBaru: 28560,
    kunjunganLama: 85690,
    pria: 52400,
    wanita: 61850,
    bpjs: 76550,
    asuransiSwasta: 23990,
    umumMandiri: 13710,
    keterangan: 'Poli Penyakit Dalam, Jantung, Bedah, Anak, Mata, Obgyn & Saraf',
  },
  {
    bagianLayanan: 'Instalasi Gawat Darurat (IGD 24 Jam)',
    jumlahKunjungan: 32480,
    persentase: 17.59,
    kunjunganBaru: 19480,
    kunjunganLama: 13000,
    pria: 17860,
    wanita: 14620,
    bpjs: 21760,
    asuransiSwasta: 6820,
    umumMandiri: 3900,
    keterangan: 'Kasus Trauma, Kardiovaskular Akut, Asfiksia, Bedah Darurat',
  },
  {
    bagianLayanan: 'Instalasi Rawat Inap (Bangsal & Ruang Khusus)',
    jumlahKunjungan: 21850,
    persentase: 11.83,
    kunjunganBaru: 8740,
    kunjunganLama: 13110,
    pria: 10480,
    wanita: 11370,
    bpjs: 14200,
    asuransiSwasta: 5680,
    umumMandiri: 1970,
    keterangan: 'Kapasitas 212 Tempat Tidur Aktif (ICU, ICCU, Perawatan Kelas 1-3 & VIP)',
  },
  {
    bagianLayanan: 'Unit Hemodialisa (Cuci Darah)',
    jumlahKunjungan: 9840,
    persentase: 5.33,
    kunjunganBaru: 490,
    kunjunganLama: 9350,
    pria: 5410,
    wanita: 4430,
    bpjs: 9150,
    asuransiSwasta: 510,
    umumMandiri: 180,
    keterangan: '40 Mesin Hemodialisa Aktif berstandar internasional',
  },
  {
    bagianLayanan: 'Medical Check Up (MCU) & Eksekutif',
    jumlahKunjungan: 6200,
    persentase: 3.36,
    kunjunganBaru: 4340,
    kunjunganLama: 1860,
    pria: 3720,
    wanita: 2480,
    bpjs: 0,
    asuransiSwasta: 4340,
    umumMandiri: 1860,
    keterangan: 'Paket Pekerja Kawasan Industri, Maritim KEK, & Tenaga Ahli Asing',
  },
];

// Breakdown Cara Bayar Pasien (Dataset No. 5)
export const RS_CARA_BAYAR = [
  { nama: 'BPJS Kesehatan (JKN / KIS / Mandiri)', jumlah: 121660, persen: 65.9, color: '#0284C7' },
  { nama: 'Asuransi Swasta & Perusahaan Kemitraan', jumlah: 41340, persen: 22.4, color: '#10B981' },
  { nama: 'Pasien Umum / Bayar Mandiri', jumlah: 21620, persen: 11.7, color: '#F59E0B' },
];

// 4. DATASET NO. 6: KUNJUNGAN PASIEN BERDASARKAN LAYANAN UNGGULAN RSBP BATAM
export interface RsLayananUnggulan {
  id: string;
  namaLayanan: string;
  jumlahKasus: number;
  persentase: number;
  pertumbuhanYoy: number;
  keunggulanTeknis: string;
}

export const RS_LAYANAN_UNGGULAN: RsLayananUnggulan[] = [
  {
    id: 'jantung',
    namaLayanan: 'Pusat Jantung & Vaskular (Cardiac Center)',
    jumlahKasus: 12450,
    persentase: 32.38,
    pertumbuhanYoy: 18.5,
    keunggulanTeknis: 'Cathlab Monoplane, Percutaneous Coronary Intervention (PCI), CABG bypass jantung',
  },
  {
    id: 'trauma',
    namaLayanan: 'Trauma Center & Bedah Rekonstruksi',
    jumlahKasus: 9120,
    persentase: 23.72,
    pertumbuhanYoy: 12.2,
    keunggulanTeknis: 'Penanganan kecelakaan industri KEK & kemaritiman, bedah mikro saraf & ortopedi',
  },
  {
    id: 'hemodialisa',
    namaLayanan: 'Pusat Ginjal & Hemodialisa Modern',
    jumlahKasus: 7850,
    persentase: 20.42,
    pertumbuhanYoy: 9.4,
    keunggulanTeknis: '40 Mesin Hemodialisis High-Flux + ruang isolasi hepatitis & CAPD mandiri',
  },
  {
    id: 'onkologi',
    namaLayanan: 'Onkologi & Radioterapi',
    jumlahKasus: 4620,
    persentase: 12.02,
    pertumbuhanYoy: 24.8,
    keunggulanTeknis: 'Kemoterapi terpadu, Linac Radiotherapy, & deteksi dini tumor genetik',
  },
  {
    id: 'aesthetic',
    namaLayanan: 'Aesthetic, Laser & Anti-Aging Center',
    jumlahKasus: 2860,
    persentase: 7.44,
    pertumbuhanYoy: 31.0,
    keunggulanTeknis: 'Laser dermatologi medis, bedah plastik estetik, medical wellness pariwisata medis',
  },
  {
    id: 'hyperbaric',
    namaLayanan: 'Hyperbaric Oxygen Chamber (HBOT)',
    jumlahKasus: 1550,
    persentase: 4.03,
    pertumbuhanYoy: 15.6,
    keunggulanTeknis: 'Terapi dekompresi penyelam perairan Batam, penyembuhan luka diabetes gangren',
  },
];

// 5. DATASET NO. 9: NILAI INDIKATOR EFISIENSI RUMAH SAKIT BP BATAM (Standar Barber Johnson / Kemenkes RI)
export interface RsIndikatorEfisiensi {
  kode: string;
  indikator: string;
  nilai: number;
  satuan: string;
  standarIdealKemenkes: string;
  statusKinerja: 'Ideal / Prima' | 'Perlu Perhatian' | 'Waspada';
  statusColor: 'emerald' | 'amber' | 'rose';
  definisi: string;
  rumusTeks: string;
}

export const RS_INDIKATOR_EFISIENSI: RsIndikatorEfisiensi[] = [
  {
    kode: 'BOR',
    indikator: 'Bed Occupancy Rate (BOR)',
    nilai: 74.2,
    satuan: '%',
    standarIdealKemenkes: '60% - 85%',
    statusKinerja: 'Ideal / Prima',
    statusColor: 'emerald',
    definisi: 'Persentase pemakaian tempat tidur rawat inap pada periode tertentu.',
    rumusTeks: '(Jumlah Hari Perawatan ÷ (Jumlah Tempat Tidur × Jumlah Hari Periode)) × 100%',
  },
  {
    kode: 'ALOS',
    indikator: 'Average Length of Stay (ALOS)',
    nilai: 4.2,
    satuan: 'Hari',
    standarIdealKemenkes: '3 - 5 Hari',
    statusKinerja: 'Ideal / Prima',
    statusColor: 'emerald',
    definisi: 'Rata-rata lama perawatan seorang pasien rawat inap hingga sembuh/keluar.',
    rumusTeks: 'Jumlah Hari Perawatan Pasien Keluar Hidup & Mati ÷ Jumlah Pasien Keluar Hidup & Mati',
  },
  {
    kode: 'TOI',
    indikator: 'Turn Over Interval (TOI)',
    nilai: 1.5,
    satuan: 'Hari',
    standarIdealKemenkes: '1 - 3 Hari',
    statusKinerja: 'Ideal / Prima',
    statusColor: 'emerald',
    definisi: 'Rata-rata hari tempat tidur kosong/tidak ditempati dari pasien keluar ke pasien baru masuk.',
    rumusTeks: '((Jumlah TT × Hari Periode) - Jumlah Hari Perawatan) ÷ Jumlah Pasien Keluar Hidup & Mati',
  },
  {
    kode: 'BTO',
    indikator: 'Bed Turn Over (BTO)',
    nilai: 48.6,
    satuan: 'Kali / TT / Thn',
    standarIdealKemenkes: '40 - 50 Kali',
    statusKinerja: 'Ideal / Prima',
    statusColor: 'emerald',
    definisi: 'Frekuensi pemakaian tempat tidur dalam satu tahun (produktivitas utilisasi ranjang).',
    rumusTeks: 'Jumlah Pasien Keluar (Hidup + Mati) ÷ Rata-rata Jumlah Tempat Tidur Siap Pakai',
  },
  {
    kode: 'NDR',
    indikator: 'Net Death Rate (NDR)',
    nilai: 14.8,
    satuan: '‰ (per mil)',
    standarIdealKemenkes: '< 25 ‰',
    statusKinerja: 'Ideal / Prima',
    statusColor: 'emerald',
    definisi: 'Angka kematian 48 jam setelah dirawat untuk setiap 1.000 pasien keluar.',
    rumusTeks: '(Jumlah Pasien Meninggal > 48 Jam ÷ Jumlah Pasien Keluar Hidup & Mati) × 1.000 ‰',
  },
  {
    kode: 'GDR',
    indikator: 'Gross Death Rate (GDR)',
    nilai: 24.5,
    satuan: '‰ (per mil)',
    standarIdealKemenkes: '< 45 ‰',
    statusKinerja: 'Ideal / Prima',
    statusColor: 'emerald',
    definisi: 'Angka kematian umum seluruh pasien rawat inap untuk setiap 1.000 pasien keluar.',
    rumusTeks: '(Total Seluruh Pasien Meninggal ÷ Jumlah Pasien Keluar Hidup & Mati) × 1.000 ‰',
  },
];

// 6. DATASET NO. 14: DAFTAR PENYEWA FASILITAS RUMAH SAKIT BP BATAM (SEWA RUANGAN TENANT)
export interface RsTenantSewa {
  id: string;
  tahun: number;
  namaTenant: string;
  nomorPerjanjian: string;
  masaBerlaku: string;
  jatuhTempo: string;
  luasM2: number;
  lokasiGedung: string;
  nilaiSewaTahunanJuta: number;
  statusSewa: 'Aktif' | 'Mendekati Jatuh Tempo' | 'Proses Perpanjangan';
  statusBadgeColor: 'emerald' | 'amber' | 'blue';
  sisaHari: number;
}

export const RS_TENANT_SEWA: RsTenantSewa[] = [
  {
    id: 't-1',
    tahun: 2026,
    namaTenant: 'Bank Mandiri (Kantor Kas & ATM Center RSBP)',
    nomorPerjanjian: 'SPK-RSBP/BM/012/2024',
    masaBerlaku: '01 Jan 2024 s.d 31 Des 2026',
    jatuhTempo: '31 Desember 2026',
    luasM2: 78.5,
    lokasiGedung: 'Lobby Utama Gedung A Lantai 1',
    nilaiSewaTahunanJuta: 350.0,
    statusSewa: 'Aktif',
    statusBadgeColor: 'emerald',
    sisaHari: 260,
  },
  {
    id: 't-2',
    tahun: 2026,
    namaTenant: 'Apotek Kimia Farma (Mitra Farmasi Luar & Resep Khusus)',
    nomorPerjanjian: 'PKS-RSBP/KF/045/2023',
    masaBerlaku: '01 Mei 2023 s.d 30 Apr 2026',
    jatuhTempo: '30 April 2026',
    luasM2: 120.0,
    lokasiGedung: 'Samping Poliklinik Rawat Jalan Lantai 1',
    nilaiSewaTahunanJuta: 480.0,
    statusSewa: 'Mendekati Jatuh Tempo',
    statusBadgeColor: 'amber',
    sisaHari: 15,
  },
  {
    id: 't-3',
    tahun: 2026,
    namaTenant: 'Indomaret Point (Minimarket Modern & Kebutuhan Pasien)',
    nomorPerjanjian: 'SPK-RSBP/IDM/088/2024',
    masaBerlaku: '15 Jul 2024 s.d 14 Jul 2027',
    jatuhTempo: '14 Juli 2027',
    luasM2: 95.0,
    lokasiGedung: 'Kawasan Komersial Gedung B Lantai 1',
    nilaiSewaTahunanJuta: 380.0,
    statusSewa: 'Aktif',
    statusBadgeColor: 'emerald',
    sisaHari: 455,
  },
  {
    id: 't-4',
    tahun: 2026,
    namaTenant: 'Fore Coffee & Healthy Cafetaria',
    nomorPerjanjian: 'PKS-RSBP/FC/029/2025',
    masaBerlaku: '01 Jan 2025 s.d 31 Des 2026',
    jatuhTempo: '31 Desember 2026',
    luasM2: 85.0,
    lokasiGedung: 'Taman Terapeutik Gedung Rawat Inap',
    nilaiSewaTahunanJuta: 310.0,
    statusSewa: 'Aktif',
    statusBadgeColor: 'emerald',
    sisaHari: 260,
  },
  {
    id: 't-5',
    tahun: 2026,
    namaTenant: 'Optik Melawai (Layanan Kacamata & Lensa Korektif)',
    nomorPerjanjian: 'SPK-RSBP/OM/019/2023',
    masaBerlaku: '01 Agu 2023 s.d 31 Jul 2026',
    jatuhTempo: '31 Juli 2026',
    luasM2: 45.0,
    lokasiGedung: 'Koridor Poliklinik Mata & THT',
    nilaiSewaTahunanJuta: 210.0,
    statusSewa: 'Proses Perpanjangan',
    statusBadgeColor: 'blue',
    sisaHari: 107,
  },
  {
    id: 't-6',
    tahun: 2026,
    namaTenant: 'PT Medika Rental Sarana (Rental Kursi Roda & Bed Medis)',
    nomorPerjanjian: 'PKS-RSBP/MRS/102/2024',
    masaBerlaku: '01 Okt 2024 s.d 30 Sep 2026',
    jatuhTempo: '30 September 2026',
    luasM2: 60.0,
    lokasiGedung: 'Gedung Penunjang Parkir Terpadu',
    nilaiSewaTahunanJuta: 190.0,
    statusSewa: 'Aktif',
    statusBadgeColor: 'emerald',
    sisaHari: 168,
  },
  {
    id: 't-7',
    tahun: 2026,
    namaTenant: 'Kantin Sehat Dharma Wanita RSBP',
    nomorPerjanjian: 'SPK-RSBP/DW/007/2025',
    masaBerlaku: '01 Jan 2025 s.d 31 Des 2027',
    jatuhTempo: '31 Desember 2027',
    luasM2: 180.0,
    lokasiGedung: 'Pujasera Higienis Belakang Gedung C',
    nilaiSewaTahunanJuta: 240.0,
    statusSewa: 'Aktif',
    statusBadgeColor: 'emerald',
    sisaHari: 625,
  },
  {
    id: 't-8',
    tahun: 2026,
    namaTenant: 'ATM Gallery Bersama (BRI, BNI, BCA)',
    nomorPerjanjian: 'SPK-RSBP/ATM/033/2024',
    masaBerlaku: '01 Jun 2024 s.d 31 Mei 2026',
    jatuhTempo: '31 Mei 2026',
    luasM2: 32.0,
    lokasiGedung: 'Samping Pintu Masuk IGD 24 Jam',
    nilaiSewaTahunanJuta: 180.0,
    statusSewa: 'Mendekati Jatuh Tempo',
    statusBadgeColor: 'amber',
    sisaHari: 46,
  },
];

// 7. VISUALISASI TAMBAHAN 1 (DATASET NO. 4): 10 KASUS PENYAKIT TERBANYAK (TOP 10 MORBIDITY)
export interface RsKasusPenyakit {
  peringkat: number;
  kodeIcd: string;
  namaPenyakit: string;
  jenisRawat: 'Rawat Jalan' | 'Rawat Inap' | 'Campuran';
  jumlahKasus: number;
  persenKasus: number;
  trend: 'up' | 'stable' | 'down';
}

export const RS_TOP_PENYAKIT: RsKasusPenyakit[] = [
  { peringkat: 1, kodeIcd: 'I11.9', namaPenyakit: 'Hypertensive Heart Disease (Hipertensi)', jenisRawat: 'Rawat Jalan', jumlahKasus: 14850, persenKasus: 19.8, trend: 'up' },
  { peringkat: 2, kodeIcd: 'E11.9', namaPenyakit: 'Type 2 Diabetes Mellitus (Diabetes)', jenisRawat: 'Rawat Jalan', jumlahKasus: 12620, persenKasus: 16.8, trend: 'up' },
  { peringkat: 3, kodeIcd: 'K30', namaPenyakit: 'Functional Dyspepsia / Gastritis', jenisRawat: 'Rawat Jalan', jumlahKasus: 9450, persenKasus: 12.6, trend: 'stable' },
  { peringkat: 4, kodeIcd: 'N18.5', namaPenyakit: 'Chronic Kidney Disease Stage 5 (Gagal Ginjal)', jenisRawat: 'Campuran', jumlahKasus: 7840, persenKasus: 10.4, trend: 'up' },
  { peringkat: 5, kodeIcd: 'I21.9', namaPenyakit: 'Acute Myocardial Infarction / STEMI (Serangan Jantung)', jenisRawat: 'Rawat Inap', jumlahKasus: 6920, persenKasus: 9.2, trend: 'stable' },
  { peringkat: 6, kodeIcd: 'J18.9', namaPenyakit: 'Pneumonia / Infeksi Saluran Napas Akut', jenisRawat: 'Rawat Inap', jumlahKasus: 5810, persenKasus: 7.7, trend: 'down' },
  { peringkat: 7, kodeIcd: 'I63.9', namaPenyakit: 'Cerebral Infarction / Stroke Iskemik', jenisRawat: 'Rawat Inap', jumlahKasus: 5120, persenKasus: 6.8, trend: 'up' },
  { peringkat: 8, kodeIcd: 'A09', namaPenyakit: 'Infectious Gastroenteritis & Colitis', jenisRawat: 'Campuran', jumlahKasus: 4350, persenKasus: 5.8, trend: 'down' },
  { peringkat: 9, kodeIcd: 'A91', namaPenyakit: 'Dengue Hemorrhagic Fever (Demam Berdarah)', jenisRawat: 'Rawat Inap', jumlahKasus: 4120, persenKasus: 5.5, trend: 'stable' },
  { peringkat: 10, kodeIcd: 'S06.0', namaPenyakit: 'Concussion / Cedera Kepala Ringan (Trauma)', jenisRawat: 'Rawat Inap', jumlahKasus: 3980, persenKasus: 5.3, trend: 'down' },
];

// 8. VISUALISASI TAMBAHAN 2 (DATASET NO. 17): RESEP OBAT GENERIK VS NON GENERIK
export interface RsResepObat {
  instalasi: string;
  resepGenerik: number;
  resepNonGenerik: number;
  totalResep: number;
  persenGenerik: number;
}

export const RS_RESEP_OBAT_TOTAL = {
  totalGenerik: 153240,
  totalNonGenerik: 30420,
  totalSemua: 183660,
  rasioGenerikPersen: 83.44, // Standar Kemenkes RI RS BLU > 80%
};

export const RS_RESEP_OBAT: RsResepObat[] = [
  { instalasi: 'Rawat Jalan (Poliklinik)', resepGenerik: 98450, resepNonGenerik: 15800, totalResep: 114250, persenGenerik: 86.17 },
  { instalasi: 'Rawat Inap (Bangsal)', resepGenerik: 31250, resepNonGenerik: 8620, totalResep: 39870, persenGenerik: 78.38 },
  { instalasi: 'Instalasi Gawat Darurat (IGD)', resepGenerik: 23540, resepNonGenerik: 6000, totalResep: 29540, persenGenerik: 79.69 },
];

// 9. VISUALISASI TAMBAHAN 3 (DATASET NO. 7): DATA PEGAWAI RSBP BATAM
export interface RsPegawaiKategori {
  kategori: string;
  jumlah: number;
  statusPns: number;
  statusP3k: number;
  statusKontrakBlu: number;
  persen: number;
}

export const RS_TOTAL_PEGAWAI = 583;

export const RS_DATA_PEGAWAI: RsPegawaiKategori[] = [
  { kategori: 'Dokter Spesialis & Subspesialis', jumlah: 68, statusPns: 32, statusP3k: 18, statusKontrakBlu: 18, persen: 11.66 },
  { kategori: 'Dokter Umum & Dokter Gigi', jumlah: 28, statusPns: 12, statusP3k: 8, statusKontrakBlu: 8, persen: 4.80 },
  { kategori: 'Perawat Klinis & Ners', jumlah: 246, statusPns: 104, statusP3k: 62, statusKontrakBlu: 80, persen: 42.20 },
  { kategori: 'Bidan', jumlah: 42, statusPns: 20, statusP3k: 12, statusKontrakBlu: 10, persen: 7.20 },
  { kategori: 'Tenaga Penunjang Medis (Lab, Radiologi, Farmasi, Gizi)', jumlah: 84, statusPns: 36, statusP3k: 24, statusKontrakBlu: 24, persen: 14.41 },
  { kategori: 'Tenaga Administrasi, IT & Manajemen RS', jumlah: 115, statusPns: 48, statusP3k: 25, statusKontrakBlu: 42, persen: 19.73 },
];

// 10. KATALOG 18 DATASET BADAN USAHA RUMAH SAKIT SATU DATA BP BATAM (Halaman 19 - 21 PDF)
export interface RsDatasetCatalog {
  no: number;
  namaData: string;
  jenisData: string;
  periodeData: string;
  sifatData: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  atributData: string[];
  halamanPdf: string;
  keteranganPenggunaan: string;
}

export const RS_18_DATASETS: RsDatasetCatalog[] = [
  {
    no: 1,
    namaData: 'INDEKS KEPUASAN MASYARAKAT LAYANAN BADAN USAHA RUMAH SAKIT BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERBUKA',
    atributData: ['TAHUN', 'INDIKATOR MUTU', 'KATEGORI MUTU', 'PELAYANAN PER UNSUR'],
    halamanPdf: 'Hal. 19',
    keteranganPenggunaan: 'KPI Utama IKM Rumah Sakit (Skor 86,95 - Mutu A)',
  },
  {
    no: 2,
    namaData: 'REALISASI PENERIMAAN PENERIMAAN NEGARA BUKAN PAJAK (PNBP) BADAN USAHA RUMAH SAKIT',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['TAHUN', 'TOTAL TARGET PNBP', 'TOTAL REALISASI PNBP'],
    halamanPdf: 'Hal. 19 - 20',
    keteranganPenggunaan: 'KPI Utama PNBP Rumah Sakit (Target Rp 145 M, Realisasi Rp 121,8 M / 84%)',
  },
  {
    no: 3,
    namaData: 'RASIO PENERIMAAN TERHADAP PENGELUARAN',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['TAHUN', 'NILAI SELURUH BELANJA', 'NILAI PENDAPATAN', 'TOTAL RASIO PENDAPATAN'],
    halamanPdf: 'Hal. 20',
    keteranganPenggunaan: 'Cost Recovery Rate (CRR 111,38% - Kemandirian Fiskal BLU)',
  },
  {
    no: 4,
    namaData: 'JUMLAH KASUS PENYAKIT TERBANYAK DI RUMAH SAKIT BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERBUKA',
    atributData: ['TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'JENIS RAWAT', 'NAMA PENYAKIT', 'JUMLAH KASUS', 'KODE ICD'],
    halamanPdf: 'Hal. 20',
    keteranganPenggunaan: 'Visualisasi 10 Kasus Terbanyak / Top 10 Morbidity ICD-10',
  },
  {
    no: 5,
    namaData: 'JUMLAH KUNJUNGAN PASIEN DI RUMAH SAKIT BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERBUKA',
    atributData: ['BAGIAN LAYANAN', 'JENIS KUNJUNGAN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'JUMLAH KUNJUNGAN', 'JENIS KELAMIN', 'CARA BAYAR'],
    halamanPdf: 'Hal. 20',
    keteranganPenggunaan: 'KPI Kunjungan Pasien & Rekap Kunjungan per Bagian Layanan (184.620 Pasien)',
  },
  {
    no: 6,
    namaData: 'JUMLAH KUNJUNGAN PASIEN BERDASARKAN LAYANAN UNGGULAN RUMAH SAKIT BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERBUKA',
    atributData: ['NAMA LAYANAN UNGGULAN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'JUMLAH KASUS'],
    halamanPdf: 'Hal. 20',
    keteranganPenggunaan: 'KPI Layanan Unggulan (Cardiac Center, Trauma, Onkologi, Hemodialisa)',
  },
  {
    no: 7,
    namaData: 'DATA PEGAWAI RUMAH SAKIT BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERBUKA',
    atributData: ['JENIS KETENAGAAN', 'TAHUN', 'JUMLAH PEGAWAI', 'STATUS PEGAWAI'],
    halamanPdf: 'Hal. 20',
    keteranganPenggunaan: 'Profil SDM Kesehatan (583 Pegawai Medis & Non-Medis)',
  },
  {
    no: 8,
    namaData: 'DAFTAR LAYANAN MEDIS DI RUMAH SAKIT BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERBUKA',
    atributData: ['JENIS LAYANAN', 'FASILITAS MEDIS'],
    halamanPdf: 'Hal. 20',
    keteranganPenggunaan: 'Katalog Spesialisasi Medis & Peralatan Diagnostik',
  },
  {
    no: 9,
    namaData: 'NILAI INDIKATOR EFISIENSI RUMAH SAKIT BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERBUKA',
    atributData: ['INDIKATOR', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'NILAI'],
    halamanPdf: 'Hal. 20',
    keteranganPenggunaan: 'Indikator Barber Johnson (BOR 74,2%, ALOS 4,2 Hari, TOI 1,5 Hari, BTO, NDR, GDR)',
  },
  {
    no: 10,
    namaData: 'DATA PORSI MAKANAN PASIEN DI RUMAH SAKIT BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERBUKA',
    atributData: ['TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'PORSI MAKANAN PADAT', 'PORSI MAKANAN CAIR', 'TOTAL'],
    halamanPdf: 'Hal. 20',
    keteranganPenggunaan: 'Kinerja Instalasi Gizi & Dietetik Pasien Rawat Inap',
  },
  {
    no: 11,
    namaData: 'DATA LAYANAN UTAMA DAN PENUNJANG BADAN USAHA RUMAH SAKIT',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERBUKA',
    atributData: ['TANGGAL_REKAP', 'NAMA LAYANAN', 'JENIS LAYANAN'],
    halamanPdf: 'Hal. 20',
    keteranganPenggunaan: 'Struktur Organisasi Unit Pelayanan Rumah Sakit',
  },
  {
    no: 12,
    namaData: 'NILAI REALISASI BELANJA DAN PENERIMAAN BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['TAHUN', 'TOTAL NILAI PAGU', 'TOTAL NILAI REALISASI', 'TOTAL NILAI SISA PAGU', 'PERSENTASE NILAI REALISASI BELANJA'],
    halamanPdf: 'Hal. 20 - 21',
    keteranganPenggunaan: 'KPI Utama Belanja RSBP (Pagu Rp 135 M, Realisasi Rp 109,35 M / 81%)',
  },
  {
    no: 13,
    namaData: 'DAFTAR KLINIK RUMAH SAKIT BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERBUKA',
    atributData: ['TANGGAL_REKAP', 'NAMA_KLINIK'],
    halamanPdf: 'Hal. 21',
    keteranganPenggunaan: 'Daftar 28 Poliklinik Rawat Jalan Spesialis & Subspesialis',
  },
  {
    no: 14,
    namaData: 'DAFTAR PENYEWA FASILITAS RUMAH SAKIT BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['TAHUN', 'NAMA TENANT', 'NOMOR PERJANJIAN', 'MASA BERLAKU', 'JATUH TEMPO'],
    halamanPdf: 'Hal. 21',
    keteranganPenggunaan: 'Rekapitulasi Sewa Ruangan Tenant & Fasilitas Komersial RSBP',
  },
  {
    no: 15,
    namaData: 'REKAPITULASI PROYEKSI PENERIMAAN DAN PENCAIRAN DANA BADAN USAHA RUMAH SAKIT',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['TAHUN', 'NILAI TARGET ANGGARAN', 'NILAI BELANJA'],
    halamanPdf: 'Hal. 21',
    keteranganPenggunaan: 'Cash Flow & Proyeksi Rencana Bisnis Anggaran (RBA) RSBP',
  },
  {
    no: 16,
    namaData: 'REGISTRASI PELAYANAN RAWAT INAP RAWAT JALAN DAN IGD DI RUMAH SAKIT BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['DIAGNOSA', 'TANGGAL MASUK (Rawat Inap)', 'TANGGAL KELUAR (Rawat Inap)', 'CARA PASIEN KELUAR (Rawat Inap)', 'LAMA DIRAWAT (Rawat Inap)', 'HARI RAWAT (Rawat Inap)', 'TANGGAL_REKAP'],
    halamanPdf: 'Hal. 21',
    keteranganPenggunaan: 'Buku Registrasi Induk Pasien & Kalkulasi ALOS / Hari Rawat',
  },
  {
    no: 17,
    namaData: 'REKAPITULASI RESEP DISPENS OBAT GENERIK DAN NON GENERIK',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: ['TAHUN', 'BULAN', 'GOLONGAN OBAT', 'RAWAT JALAN', 'RAWAT INAP', 'GAWAT DARURAT'],
    halamanPdf: 'Hal. 21',
    keteranganPenggunaan: 'Kepatuhan Formularium Nasional Farmasi (83,4% Generik)',
  },
  {
    no: 18,
    namaData: 'DAFTAR FASILITAS PENUNJANG MEDIS',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERTUTUP',
    atributData: ['TAHUN', 'NAMA LAYANAN'],
    halamanPdf: 'Hal. 21',
    keteranganPenggunaan: 'Fasilitas Penunjang (CSSD, IPAL Medis, Bank Darah BDRS, Ambulans Hebat)',
  },
];
