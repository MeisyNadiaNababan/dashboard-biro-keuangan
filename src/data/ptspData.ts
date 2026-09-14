// =========================================================================
// DATASET & INDIKATOR KPI PUSAT PELAYANAN TERPADU SATU PINTU (PTSP) BP BATAM
// Berdasarkan Dokumen BP Batam KPI Dictionary & Katalog 24 Unit Kerja (Hal 21-28)
// Dilengkapi Dataset Khusus: 'Indeks Kepuasan Masyarakat (IKM) PTSP' (9 Unsur Permenpan RB)
// =========================================================================

export interface PtspKpiMetric {
  id: string;
  code: string;
  title: string;
  value: string;
  target: string;
  percentage: string;
  trend: {
    direction: 'up' | 'down';
    value: string;
    period: string;
    isPositive: boolean;
  };
  sparkline: number[];
  badge: {
    text: string;
    variant: 'success' | 'warning' | 'danger' | 'info';
  };
  colorTheme: 'emerald' | 'blue' | 'purple' | 'amber' | 'teal' | 'rose';
  formulaRef: string;
  datasetNo: string;
  datasetName: string;
  relevantAttributes: string[];
  howGenerated: string;
  tableauCalc: string;
  description: string;
}

// -------------------------------------------------------------------------
// 1. DATASET KHUSUS: INDEKS KEPUASAN MASYARAKAT (IKM) PTSP
// Sesuai Permenpan RB No. 14 Tahun 2017 (9 Unsur Pelayanan)
// Atribut: TAHUN, UNSUR PELAYANAN, JUMLAH RESPONDEN, NILAI PER UNSUR, NILAI IKM TOTAL, KATEGORI (A/B/C/D), SARAN/KELUHAN, TINDAK LANJUT
// -------------------------------------------------------------------------

export interface PtspIkmUnsurItem {
  id: string;
  kodeUnsur: string;
  unsurPelayanan: string;
  deskripsi: string;
  jumlahResponden: number;
  nilaiPerUnsur: number; // Skala 100 (atau konversi dari skala 4 x 25)
  nilaiSkala4: number;
  bobot: number; // 1/9 = 0.111
  nilaiTertimbang: number;
  kategori: 'A' | 'B' | 'C' | 'D';
  kategoriLabel: string;
  saranKeluhan: string;
  tindakLanjut: string;
  statusTindakLanjut: 'Selesai Diterapkan' | 'Dalam Proses' | 'Terjadwal';
  unitPenanggungJawab: string;
}

export interface PtspIkmYearlyRecord {
  tahun: string;
  periode: string;
  jumlahRespondenTotal: number;
  nilaiIkmTotal: number; // e.g. 89.12
  kategoriTotal: 'A' | 'B' | 'C' | 'D';
  kategoriLabel: string;
  targetIkm: number;
  achievementRate: string;
  unsurItems: PtspIkmUnsurItem[];
  demografi: {
    jenisKelamin: { pria: number; wanita: number };
    pendidikan: { sma: number; diploma: number; s1: number; s2: number };
    jenisLayanan: { ossBerusaha: number; maritimSkkbm: number; mppGerai: number; nonIzin: number };
  };
}

export const PTSP_IKM_DATASET: PtspIkmYearlyRecord[] = [
  {
    tahun: '2026',
    periode: 'Triwulan I - April 2026 (YTD)',
    jumlahRespondenTotal: 1480,
    nilaiIkmTotal: 89.24,
    kategoriTotal: 'A',
    kategoriLabel: 'Sangat Baik (Mutu Pelayanan A)',
    targetIkm: 88.0,
    achievementRate: '101,4%',
    demografi: {
      jenisKelamin: { pria: 918, wanita: 562 },
      pendidikan: { sma: 195, diploma: 285, s1: 890, s2: 110 },
      jenisLayanan: { ossBerusaha: 612, maritimSkkbm: 428, mppGerai: 280, nonIzin: 160 },
    },
    unsurItems: [
      {
        id: 'ikm-u1',
        kodeUnsur: 'U1',
        unsurPelayanan: 'Persyaratan Pelayanan',
        deskripsi: 'Kesesuaian persyaratan izin yang diajukan dengan jenis pelayanan yang tertera pada SOP/IBIS.',
        jumlahResponden: 1480,
        nilaiPerUnsur: 90.75,
        nilaiSkala4: 3.63,
        bobot: 0.111,
        nilaiTertimbang: 10.07,
        kategori: 'A',
        kategoriLabel: 'Sangat Baik',
        saranKeluhan: 'Format lampiran gambar teknis PKKPRL dan dokumen lingkungan mohon distandarisasi contoh filenya.',
        tindakLanjut: 'Telah disediakan template dokumen standar dan panduan video interaktif pada portal PTSP BP Batam.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Subdit Verifikasi Berusaha PTSP',
      },
      {
        id: 'ikm-u2',
        kodeUnsur: 'U2',
        unsurPelayanan: 'Sistem, Mekanisme, dan Prosedur',
        deskripsi: 'Kemudahan alur layanan perizinan dari pengajuan mandiri, validasi teknis, hingga pengesahan digital.',
        jumlahResponden: 1480,
        nilaiPerUnsur: 89.25,
        nilaiSkala4: 3.57,
        bobot: 0.111,
        nilaiTertimbang: 9.91,
        kategori: 'A',
        kategoriLabel: 'Sangat Baik',
        saranKeluhan: 'Mohon sinkronisasi status izin di OSS RBA dengan portal internal BP Batam dipercepat agar tidak perlu cek manual dua sisi.',
        tindakLanjut: 'Integrasi Webhook API OSS ke IBIS BP Batam telah dioptimalkan dengan interval polling real-time 15 menit.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Tim Integrasi Sistem PTSP & PDSI',
      },
      {
        id: 'ikm-u3',
        kodeUnsur: 'U3',
        unsurPelayanan: 'Waktu Penyelesaian',
        deskripsi: 'Kecepatan dan kepatuhan penyelesaian dokumen perizinan terhadap Service Level Agreement (SLA).',
        jumlahResponden: 1480,
        nilaiPerUnsur: 87.50,
        nilaiSkala4: 3.50,
        bobot: 0.111,
        nilaiTertimbang: 9.71,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Permohonan persetujuan jadwal kapal & rekomendasi TERSUS pada akhir pekan terkadang mengalami jeda verifikasi.',
        tindakLanjut: 'Membentuk shift petugas siaga verifikasi 7x24 jam untuk layanan operasional maritim mendesak.',
        statusTindakLanjut: 'Dalam Proses',
        unitPenanggungJawab: 'Seksi Layanan Transportasi & Maritim',
      },
      {
        id: 'ikm-u4',
        kodeUnsur: 'U4',
        unsurPelayanan: 'Biaya/Tarif',
        deskripsi: 'Keterbukaan informasi tarif PNBP sesuai PP No. 41/2021 dan transparansi tanpa pungutan liar (Nol Pungli).',
        jumlahResponden: 1480,
        nilaiPerUnsur: 92.50,
        nilaiSkala4: 3.70,
        bobot: 0.111,
        nilaiTertimbang: 10.27,
        kategori: 'A',
        kategoriLabel: 'Sangat Baik',
        saranKeluhan: 'Sistem billing e-Payment SIMPONI/Bank Mandiri kadang memerlukan waktu konfirmasi pembayaran otomatis.',
        tindakLanjut: 'Integrasi payment gateway direct host-to-host multi-bank telah aktif dengan autoverifikasi instan.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Subdit Keuangan & Kasir Digital MPP',
      },
      {
        id: 'ikm-u5',
        kodeUnsur: 'U5',
        unsurPelayanan: 'Produk Spesifikasi Jenis Pelayanan',
        deskripsi: 'Kesesuaian hasil izin terbit (SKKBM, SKKAB, TUKS, Izin Kawasan) dengan spesifikasi yang dimohonkan.',
        jumlahResponden: 1480,
        nilaiPerUnsur: 90.00,
        nilaiSkala4: 3.60,
        bobot: 0.111,
        nilaiTertimbang: 9.99,
        kategori: 'A',
        kategoriLabel: 'Sangat Baik',
        saranKeluhan: 'E-Sertifikat dan surat izin dengan tanda tangan elektronik (TTE BSrE) kadang lambat didownload dari email.',
        tindakLanjut: 'Menambahkan fitur direct download dashboard akun pemohon di samping pengiriman notifikasi email.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Seksi Pengelolaan Dokumen PTSP',
      },
      {
        id: 'ikm-u6',
        kodeUnsur: 'U6',
        unsurPelayanan: 'Kompetensi Pelaksana',
        deskripsi: 'Kemampuan, keahlian, dan pemahaman petugas front office maupun back office terhadap regulasi perizinan.',
        jumlahResponden: 1480,
        nilaiPerUnsur: 88.75,
        nilaiSkala4: 3.55,
        bobot: 0.111,
        nilaiTertimbang: 9.85,
        kategori: 'A',
        kategoriLabel: 'Sangat Baik',
        saranKeluhan: 'Petugas konsultasi di loket MPP diharapkan lebih menguasai teknis perizinan KBLI sektor energi dan industri kimia.',
        tindakLanjut: 'Penyelenggaraan pelatihan tematik regulasi teknis KBLI lintas sektor bekerjasama dengan Kementerian ESDM dan Kemenperin.',
        statusTindakLanjut: 'Dalam Proses',
        unitPenanggungJawab: 'Subdit Tata Kelola & SDM PTSP',
      },
      {
        id: 'ikm-u7',
        kodeUnsur: 'U7',
        unsurPelayanan: 'Perilaku Pelaksana',
        deskripsi: 'Sikap sopan, ramah, disiplin, tidak diskriminatif, dan integritas tinggi dalam memberikan pelayanan.',
        jumlahResponden: 1480,
        nilaiPerUnsur: 91.25,
        nilaiSkala4: 3.65,
        bobot: 0.111,
        nilaiTertimbang: 10.13,
        kategori: 'A',
        kategoriLabel: 'Sangat Baik',
        saranKeluhan: 'Pelayanan petugas di loket informasi dan customer service sangat sopan, ramah, dan solutif.',
        tindakLanjut: 'Mempertahankan program Reward of The Month bagi petugas front-liner berkinerja dan beretika terbaik.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Kepala PTSP & Koordinator MPP',
      },
      {
        id: 'ikm-u8',
        kodeUnsur: 'U8',
        unsurPelayanan: 'Penanganan Pengaduan, Saran, dan Masukan',
        deskripsi: 'Kecepatan respon tindak lanjut terhadap saran, pertanyaan, serta pengaduan masyarakat di PTSP dan kanal SP4N-LAPOR!.',
        jumlahResponden: 1480,
        nilaiPerUnsur: 86.25,
        nilaiSkala4: 3.45,
        bobot: 0.111,
        nilaiTertimbang: 9.57,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Mohon saluran WhatsApp Helpdesk PTSP dapat membalas pertanyaan di luar jam kerja dengan chatbot interaktif.',
        tindakLanjut: 'Pengembangan WhatsApp Business API terintegrasi AI Assistant untuk respon FAQ otomatis 24/7.',
        statusTindakLanjut: 'Dalam Proses',
        unitPenanggungJawab: 'Unit Layanan Pengaduan PTSP',
      },
      {
        id: 'ikm-u9',
        kodeUnsur: 'U9',
        unsurPelayanan: 'Sarana dan Prasarana',
        deskripsi: 'Kenyamanan ruang tunggu MPP Gedung SPC/BIDA, ketersediaan mesin antrean online, wifi gratis, ruang laktasi, dan fasilitas difabel.',
        jumlahResponden: 1480,
        nilaiPerUnsur: 86.90,
        nilaiSkala4: 3.48,
        bobot: 0.111,
        nilaiTertimbang: 9.65,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Kapasitas area parkir kendaraan pemohon di Mal Pelayanan Publik (MPP) Batam Centre sering penuh saat jam puncak 10:00 - 14:00.',
        tindakLanjut: 'Koordinasi pemanfaatan area parkir cadangan Gedung BIDA dan penyediaan layanan parkir terintegrasi.',
        statusTindakLanjut: 'Terjadwal',
        unitPenanggungJawab: 'Biro Umum & Pengelola MPP',
      },
    ],
  },
  {
    tahun: '2025',
    periode: 'Tahun Penuh 2025 (Audit Tahunan)',
    jumlahRespondenTotal: 4620,
    nilaiIkmTotal: 87.80,
    kategoriTotal: 'B',
    kategoriLabel: 'Baik (Mutu Pelayanan B)',
    targetIkm: 86.5,
    achievementRate: '101,5%',
    demografi: {
      jenisKelamin: { pria: 2940, wanita: 1680 },
      pendidikan: { sma: 650, diploma: 980, s1: 2650, s2: 340 },
      jenisLayanan: { ossBerusaha: 1980, maritimSkkbm: 1350, mppGerai: 840, nonIzin: 450 },
    },
    unsurItems: [
      {
        id: 'ikm-u1-2025',
        kodeUnsur: 'U1',
        unsurPelayanan: 'Persyaratan Pelayanan',
        deskripsi: 'Kesesuaian persyaratan izin yang diajukan dengan jenis pelayanan.',
        jumlahResponden: 4620,
        nilaiPerUnsur: 88.50,
        nilaiSkala4: 3.54,
        bobot: 0.111,
        nilaiTertimbang: 9.82,
        kategori: 'A',
        kategoriLabel: 'Sangat Baik',
        saranKeluhan: 'Pemberitahuan dokumen perbaikan agar detail per poin kekurangan.',
        tindakLanjut: 'Penyempurnaan checklist verifikasi interaktif pada portal pemohon.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Subdit Verifikasi Berusaha PTSP',
      },
      {
        id: 'ikm-u2-2025',
        kodeUnsur: 'U2',
        unsurPelayanan: 'Sistem, Mekanisme, dan Prosedur',
        deskripsi: 'Kemudahan alur layanan perizinan terpadu.',
        jumlahResponden: 4620,
        nilaiPerUnsur: 87.20,
        nilaiSkala4: 3.49,
        bobot: 0.111,
        nilaiTertimbang: 9.68,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Alur izin bongkar muat SKKBM butuh simplifikasi formulir.',
        tindakLanjut: 'Pemangkasan isian formulir dari 24 field menjadi 14 field inti terintegrasi NIB.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Seksi Layanan Transportasi & Maritim',
      },
      {
        id: 'ikm-u3-2025',
        kodeUnsur: 'U3',
        unsurPelayanan: 'Waktu Penyelesaian',
        deskripsi: 'Kepatuhan waktu penyelesaian izin terhadap SLA.',
        jumlahResponden: 4620,
        nilaiPerUnsur: 86.10,
        nilaiSkala4: 3.44,
        bobot: 0.111,
        nilaiTertimbang: 9.56,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Waktu penerbitan izin usaha kawasan perlu percepatan saat kuota padat.',
        tindakLanjut: 'Penambahan verifikator paralel untuk kluster industri prioritas.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Subdit Perizinan Kawasan',
      },
      {
        id: 'ikm-u4-2025',
        kodeUnsur: 'U4',
        unsurPelayanan: 'Biaya/Tarif',
        deskripsi: 'Keterbukaan informasi tarif dan tidak ada biaya tambahan.',
        jumlahResponden: 4620,
        nilaiPerUnsur: 91.00,
        nilaiSkala4: 3.64,
        bobot: 0.111,
        nilaiTertimbang: 10.10,
        kategori: 'A',
        kategoriLabel: 'Sangat Baik',
        saranKeluhan: 'Pemberitahuan invoice kode bayar agar dikirimkan lewat SMS/WA.',
        tindakLanjut: 'Integrasi SMS Gateway dan WhatsApp Billing Notifier telah diaktifkan.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Subdit Keuangan PTSP',
      },
      {
        id: 'ikm-u5-2025',
        kodeUnsur: 'U5',
        unsurPelayanan: 'Produk Spesifikasi Jenis Pelayanan',
        deskripsi: 'Kesesuaian produk perizinan yang diterbitkan.',
        jumlahResponden: 4620,
        nilaiPerUnsur: 88.90,
        nilaiSkala4: 3.56,
        bobot: 0.111,
        nilaiTertimbang: 9.87,
        kategori: 'A',
        kategoriLabel: 'Sangat Baik',
        saranKeluhan: 'Watermark digital BSrE agar dapat diverifikasi via QR code.',
        tindakLanjut: 'Penyematan QR Code validasi BSrE Kominfo pada setiap lembar SK.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Tim IT PTSP & PDSI',
      },
      {
        id: 'ikm-u6-2025',
        kodeUnsur: 'U6',
        unsurPelayanan: 'Kompetensi Pelaksana',
        deskripsi: 'Keahlian dan pemahaman petugas dalam menangani pemohon.',
        jumlahResponden: 4620,
        nilaiPerUnsur: 87.40,
        nilaiSkala4: 3.50,
        bobot: 0.111,
        nilaiTertimbang: 9.70,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Sosialisasi perubahan regulasi KBLI risiko tinggi perlu rutin.',
        tindakLanjut: 'Sosialisasi triwulanan bersama Kamar Dagang dan APINDO Kepri.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Subdit Tata Kelola PTSP',
      },
      {
        id: 'ikm-u7-2025',
        kodeUnsur: 'U7',
        unsurPelayanan: 'Perilaku Pelaksana',
        deskripsi: 'Kesopanan, kedisiplinan, dan keramahan petugas.',
        jumlahResponden: 4620,
        nilaiPerUnsur: 90.50,
        nilaiSkala4: 3.62,
        bobot: 0.111,
        nilaiTertimbang: 10.05,
        kategori: 'A',
        kategoriLabel: 'Sangat Baik',
        saranKeluhan: 'Pertahankan keramahan petugas dan ketegasan anti-gratifikasi.',
        tindakLanjut: 'Deklarasi Zona Integritas Wilayah Bebas dari Korupsi (WBK/WBBM) ditegakkan.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Kepala PTSP & SPI BP Batam',
      },
      {
        id: 'ikm-u8-2025',
        kodeUnsur: 'U8',
        unsurPelayanan: 'Penanganan Pengaduan, Saran, dan Masukan',
        deskripsi: 'Kecepatan tindak lanjut keluhan dan kanal aspirasi.',
        jumlahResponden: 4620,
        nilaiPerUnsur: 84.80,
        nilaiSkala4: 3.39,
        bobot: 0.111,
        nilaiTertimbang: 9.41,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Tindak lanjut pengaduan melalui SP4N LAPOR perlu dipercepat respon awalnya.',
        tindakLanjut: 'Pemberlakuan target First Response Time pengaduan maks. 2 jam kerja.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Unit Pengaduan PTSP',
      },
      {
        id: 'ikm-u9-2025',
        kodeUnsur: 'U9',
        unsurPelayanan: 'Sarana dan Prasarana',
        deskripsi: 'Fasilitas fisik, digital, ruang tunggu, dan sarana difabel.',
        jumlahResponden: 4620,
        nilaiPerUnsur: 84.80,
        nilaiSkala4: 3.39,
        bobot: 0.111,
        nilaiTertimbang: 9.41,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Koneksi Wi-Fi publik di ruang tunggu MPP sempat putus-nyambung.',
        tindakLanjut: 'Upgrade access point Wi-Fi 6 oleh PDSI di seluruh gedung MPP Batam Centre.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Pengelola MPP & PDSI',
      },
    ],
  },
  {
    tahun: '2024',
    periode: 'Tahun Penuh 2024 (Baseline)',
    jumlahRespondenTotal: 3950,
    nilaiIkmTotal: 85.90,
    kategoriTotal: 'B',
    kategoriLabel: 'Baik (Mutu Pelayanan B)',
    targetIkm: 85.0,
    achievementRate: '101,1%',
    demografi: {
      jenisKelamin: { pria: 2510, wanita: 1440 },
      pendidikan: { sma: 610, diploma: 880, s1: 2200, s2: 260 },
      jenisLayanan: { ossBerusaha: 1720, maritimSkkbm: 1180, mppGerai: 720, nonIzin: 330 },
    },
    unsurItems: [
      {
        id: 'ikm-u1-2024',
        kodeUnsur: 'U1',
        unsurPelayanan: 'Persyaratan Pelayanan',
        deskripsi: 'Kesesuaian persyaratan izin yang diajukan.',
        jumlahResponden: 3950,
        nilaiPerUnsur: 86.50,
        nilaiSkala4: 3.46,
        bobot: 0.111,
        nilaiTertimbang: 9.60,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Sosialisasi aturan teknis pemindahan hak atas izin usaha maritim.',
        tindakLanjut: 'Penerbitan Buku Panduan Pelayanan PTSP versi cetak dan e-book digital.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Subdit Verifikasi PTSP',
      },
      {
        id: 'ikm-u2-2024',
        kodeUnsur: 'U2',
        unsurPelayanan: 'Sistem, Mekanisme, dan Prosedur',
        deskripsi: 'Kemudahan alur layanan perizinan terpadu.',
        jumlahResponden: 3950,
        nilaiPerUnsur: 85.40,
        nilaiSkala4: 3.42,
        bobot: 0.111,
        nilaiTertimbang: 9.48,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Banyak langkah verifikasi berulang antar seksi.',
        tindakLanjut: 'Harmonisasi SOP alur persetujuan lintas seksi di PTSP.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Bagian Tata Usaha PTSP',
      },
      {
        id: 'ikm-u3-2024',
        kodeUnsur: 'U3',
        unsurPelayanan: 'Waktu Penyelesaian',
        deskripsi: 'Kepatuhan waktu izin terhadap SLA.',
        jumlahResponden: 3950,
        nilaiPerUnsur: 84.10,
        nilaiSkala4: 3.36,
        bobot: 0.111,
        nilaiTertimbang: 9.34,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Keterlambatan izin kapal saat cuaca ekstrem atau inspeksi lapangan.',
        tindakLanjut: 'Digitalisasi berita acara inspeksi lapangan via tablet online.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Seksi Layanan Transportasi',
      },
      {
        id: 'ikm-u4-2024',
        kodeUnsur: 'U4',
        unsurPelayanan: 'Biaya/Tarif',
        deskripsi: 'Keterbukaan informasi tarif resmi.',
        jumlahResponden: 3950,
        nilaiPerUnsur: 89.60,
        nilaiSkala4: 3.58,
        bobot: 0.111,
        nilaiTertimbang: 9.95,
        kategori: 'A',
        kategoriLabel: 'Sangat Baik',
        saranKeluhan: 'Pajang daftar tarif PNBP di setiap loket fisik MPP.',
        tindakLanjut: 'Pemasangan videotron informasi tarif dan standing banner di ruang tunggu.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Subdit Keuangan PTSP',
      },
      {
        id: 'ikm-u5-2024',
        kodeUnsur: 'U5',
        unsurPelayanan: 'Produk Spesifikasi Jenis Pelayanan',
        deskripsi: 'Kesesuaian produk perizinan yang diterbitkan.',
        jumlahResponden: 3950,
        nilaiPerUnsur: 87.20,
        nilaiSkala4: 3.49,
        bobot: 0.111,
        nilaiTertimbang: 9.68,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Validasi izin pelabuhan dapat diakses instansi KSOP.',
        tindakLanjut: 'Pemberian akses API verifikasi izin terbit ke KSOP Batam.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Tim Integrasi PTSP',
      },
      {
        id: 'ikm-u6-2024',
        kodeUnsur: 'U6',
        unsurPelayanan: 'Kompetensi Pelaksana',
        deskripsi: 'Keahlian dan pemahaman petugas.',
        jumlahResponden: 3950,
        nilaiPerUnsur: 85.00,
        nilaiSkala4: 3.40,
        bobot: 0.111,
        nilaiTertimbang: 9.44,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Pelatihan teknis regulasi OSS RBA bagi petugas front-desk.',
        tindakLanjut: 'Bimtek intensif bersama Kementerian Investasi / BKPM RI.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Subdit SDM PTSP',
      },
      {
        id: 'ikm-u7-2024',
        kodeUnsur: 'U7',
        unsurPelayanan: 'Perilaku Pelaksana',
        deskripsi: 'Kesopanan dan kedisiplinan petugas.',
        jumlahResponden: 3950,
        nilaiPerUnsur: 88.00,
        nilaiSkala4: 3.52,
        bobot: 0.111,
        nilaiTertimbang: 9.77,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Pelayanan sudah ramah dan memuaskan pemohon.',
        tindakLanjut: 'Monitoring rutin standar etika 5S (Senyum, Sapa, Salam, Sopan, Santun).',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Koordinator Layanan Front-Office',
      },
      {
        id: 'ikm-u8-2024',
        kodeUnsur: 'U8',
        unsurPelayanan: 'Penanganan Pengaduan, Saran, dan Masukan',
        deskripsi: 'Kecepatan respon pengaduan.',
        jumlahResponden: 3950,
        nilaiPerUnsur: 83.20,
        nilaiSkala4: 3.33,
        bobot: 0.111,
        nilaiTertimbang: 9.24,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Kanal pengaduan manual lambat mendapat respon balasan.',
        tindakLanjut: 'Sentralisasi seluruh aduan ke sistem ticketing helpdesk.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Unit Pengaduan PTSP',
      },
      {
        id: 'ikm-u9-2024',
        kodeUnsur: 'U9',
        unsurPelayanan: 'Sarana dan Prasarana',
        deskripsi: 'Fasilitas gedung, antrean, dan fasilitas penunjang.',
        jumlahResponden: 3950,
        nilaiPerUnsur: 84.10,
        nilaiSkala4: 3.36,
        bobot: 0.111,
        nilaiTertimbang: 9.34,
        kategori: 'B',
        kategoriLabel: 'Baik',
        saranKeluhan: 'Kiosk antrean mandiri perlu ditambah unitnya.',
        tindakLanjut: 'Pengadaan 3 unit kiosk touchscreen antrean pintar di lobi utama MPP.',
        statusTindakLanjut: 'Selesai Diterapkan',
        unitPenanggungJawab: 'Biro Umum & MPP',
      },
    ],
  },
];

// -------------------------------------------------------------------------
// 2. EXECUTIVE KPI CARDS DATA (PTSP BANs) - SESUAI PDF FORMULAS
// -------------------------------------------------------------------------

export const PTSP_KPI_METRICS: PtspKpiMetric[] = [
  {
    id: 'ikss_ikm',
    code: 'IKSS_IKM',
    title: 'Indeks Kepuasan Masyarakat (IKM)',
    value: '89,24',
    target: 'Target Renstra: ≥ 88,00',
    percentage: 'Kategori A • Sangat Baik',
    trend: {
      direction: 'up',
      value: '+1,44 poin',
      period: '(vs TA 2025: 87,80)',
      isPositive: true,
    },
    sparkline: [85.9, 86.4, 87.2, 87.8, 88.3, 88.9, 89.24],
    badge: {
      text: 'Mutu A (Sangat Baik)',
      variant: 'success',
    },
    colorTheme: 'emerald',
    datasetNo: 'Permenpan RB 14/2017 & Dataset Item #5',
    datasetName: 'DATA IMPLEMENTASI KEBIJAKAN TRANSFORMASI DIGITAL MAL PELAYANAN PUBLIK (MPP)',
    relevantAttributes: [
      'SEMESTER', 'TAHUN', '9 UNSUR PELAYANAN (U1-U9)', 'JUMLAH RESPONDEN',
      'NILAI PER UNSUR', 'BOBOT TERTINBANG (0,111)', 'KATEGORI MUTU', 'JENIS LAYANAN MPP'
    ],
    howGenerated: 'Nilai 89,24 dihasilkan dari kuesioner elektronik mandiri kepada 1.480 responden di loket MPP & portal daring PTSP. Setiap unsur (U1 s.d U9) dinilai (skala 1-4), dikali bobot 0,111, dijumlahkan (NRR Tertimbang = 3,57) lalu dikali nilai konversi 25 menghasilkan skor indeks 89,24 (Mutu A: Sangat Baik).',
    tableauCalc: `// Indeks Kepuasan Masyarakat (IKM) Skala 100
(SUM([Nilai Rata-rata per Unsur] * 0.111) * 25)`,
    formulaRef: 'IKSS_IKM: Permenpan RB 14/2017 & Item #5 MPP - (∑[Nilai Rata-rata per Unsur × 0,111]) × 25',
    description: 'Skor kepuasan masyarakat terhadap 9 unsur pelayanan di PTSP BP Batam dan Mal Pelayanan Publik (MPP).',
  },
  {
    id: 'lic_sla',
    code: 'LIC_SLA',
    title: 'SLA Perizinan Tepat Waktu',
    value: '94,6%',
    target: 'Target Kepatuhan SLA: ≥ 90,0%',
    percentage: '12.480 Selesai Tepat Waktu',
    trend: {
      direction: 'up',
      value: '+2,1%',
      period: '(MoM)',
      isPositive: true,
    },
    sparkline: [91.2, 91.8, 92.5, 93.1, 93.8, 94.2, 94.6],
    badge: {
      text: 'Di Atas SLA (≥90%)',
      variant: 'success',
    },
    colorTheme: 'blue',
    datasetNo: 'Dataset Item #17',
    datasetName: 'DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU',
    relevantAttributes: [
      'BULAN', 'TANGGAL IZIN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR',
      'JENIS PERIZINAN', 'NAMA PERIZINAN BERUSAHA', 'PERMOHONAN STATUS SELESAI', 'SERVICE LEVEL AGREEMENT (SLA)'
    ],
    howGenerated: 'Persentase 94,6% dihasilkan dengan membagi jumlah berkas izin terbit yang durasi pengerjaannya ([TANGGAL REKAP AKHIR] - [TANGGAL REKAP AWAL]) <= target SLA (yaitu 12.480 berkas) dengan total berkas [PERMOHONAN STATUS SELESAI] (13.192 berkas) lalu dikalikan 100%. (12.480 ÷ 13.192 × 100% = 94,60%).',
    tableauCalc: `// SLA Compliance Rate %
(SUM(IF DATEDIFF('day', [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]) <= [SERVICE LEVEL AGREEMENT (SLA)] 
 THEN [PERMOHONAN STATUS SELESAI] ELSE 0 END) 
 / SUM([PERMOHONAN STATUS SELESAI])) * 100`,
    formulaRef: 'LIC_SLA: Item #17 [DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU] - (SUM([PERMOHONAN STATUS SELESAI] <= SLA) ÷ SUM([PERMOHONAN STATUS SELESAI])) × 100%',
    description: 'Persentase berkas permohonan perizinan berusaha dan operasional yang diselesaikan tepat waktu sesuai standar pelayanan.',
  },
  {
    id: 'lic_vol',
    code: 'LIC_VOL',
    title: 'Total Permohonan Masuk',
    value: '13.820',
    target: 'Target Demand: ~13.000 / Periode',
    percentage: 'Akumulasi YTD April 2026',
    trend: {
      direction: 'up',
      value: '+1.140 Dok',
      period: '(+9,0% YoY)',
      isPositive: true,
    },
    sparkline: [10200, 10800, 11500, 12200, 12900, 13400, 13820],
    badge: {
      text: 'Demand Tinggi',
      variant: 'info',
    },
    colorTheme: 'purple',
    datasetNo: 'Dataset Item #14 & Item #9',
    datasetName: 'JENIS LAYANAN BP BATAM & DATA PERMOHONAN PERIZINAN BERUSAHA',
    relevantAttributes: [
      'BULAN', 'TAHUN', 'JENIS LAYANAN', 'JUMLAH LAYANAN MASUK',
      'NOMOR PERMOHONAN', 'TANGGAL PERMOHONAN', 'STATUS PERMOHONAN', 'SEKTOR'
    ],
    howGenerated: 'Angka 13.820 berkas permohonan masuk dihasilkan dari penjumlahan kolom [JUMLAH LAYANAN MASUK] pada Dataset Item #14 selama Januari-April 2026 (Jan: 3.320 + Feb: 3.250 + Mar: 3.610 + Apr: 3.640 = 13.820), yang sinkron dengan hitungan COUNTD([NOMOR PERMOHONAN]) pada Dataset Item #9 ditambah layanan maritim (Item #1, #2, #3, #4, #10, #11, #12) dan non-perizinan (Item #16).',
    tableauCalc: `// Total Permohonan Masuk (Volume)
SUM([JUMLAH LAYANAN MASUK])
// Atau pada tabel permohonan detail OSS & Maritim:
COUNTD([NOMOR PERMOHONAN])`,
    formulaRef: 'LIC_VOL: Item #14 [JENIS LAYANAN BP BATAM] SUM([JUMLAH LAYANAN MASUK]) & Item #9 COUNT([NOMOR PERMOHONAN])',
    description: 'Jumlah seluruh permohonan perizinan berusaha OSS, SKKBM, jadwal kapal, dan rekomendasi teknis yang masuk ke sistem.',
  },
  {
    id: 'lic_issued',
    code: 'LIC_ISSUED',
    title: 'Izin Berhasil Terbit',
    value: '13.192',
    target: 'Target Realisasi: ≥ 95,0%',
    percentage: 'Rasio Terbit: 95,4% dari Masuk',
    trend: {
      direction: 'up',
      value: '+980 Dok',
      period: '(MoM)',
      isPositive: true,
    },
    sparkline: [9700, 10300, 10950, 11620, 12300, 12800, 13192],
    badge: {
      text: 'Realisasi 95,4%',
      variant: 'success',
    },
    colorTheme: 'teal',
    datasetNo: 'Dataset Item #14 & Item #17',
    datasetName: 'JENIS LAYANAN BP BATAM & DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU',
    relevantAttributes: [
      'BULAN', 'TAHUN', 'JUMLAH LAYANAN TERSELESAIKAN', 'PERMOHONAN STATUS SELESAI',
      'STATUS PERMOHONAN', 'TANGGAL IZIN', 'NO IZIN'
    ],
    howGenerated: 'Angka 13.192 izin terbit diperoleh dari agregasi kolom [JUMLAH LAYANAN TERSELESAIKAN] pada Dataset Item #14 dan kolom [PERMOHONAN STATUS SELESAI] pada Dataset Item #17. Rasio efektivitas penyelesaian dihitung: (13.192 ÷ 13.820) × 100% = 95,45% ≈ 95,4%.',
    tableauCalc: `// Total Izin Resmi Terbit
SUM([JUMLAH LAYANAN TERSELESAIKAN])
// Rasio Penyelesaian (%)
SUM([JUMLAH LAYANAN TERSELESAIKAN]) / SUM([JUMLAH LAYANAN MASUK]) * 100`,
    formulaRef: 'LIC_ISSUED: Item #14 SUM([JUMLAH LAYANAN TERSELESAIKAN]) & Item #17 SUM([PERMOHONAN STATUS SELESAI])',
    description: 'Akumulasi izin berusaha dan operasional yang telah divalidasi, ditandatangani secara elektronik (BSrE), dan resmi diterbitkan.',
  },
  {
    id: 'lic_backlog',
    code: 'LIC_BACKLOG',
    title: 'Backlog / Open Pending Cases',
    value: '628',
    target: 'Batas Toleransi: ≤ 750 Dok',
    percentage: '4,5% dari Total Permohonan',
    trend: {
      direction: 'down',
      value: '-82 Dok',
      period: '(Penurunan Backlog)',
      isPositive: true,
    },
    sparkline: [820, 780, 740, 710, 680, 650, 628],
    badge: {
      text: 'Terkendali (≤750)',
      variant: 'success',
    },
    colorTheme: 'amber',
    datasetNo: 'Dataset Item #16 & Item #17',
    datasetName: 'JUMLAH NON PERIZINAN & DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU',
    relevantAttributes: [
      'PERMOHONAN STATUS PROSES', 'JUMLAH STATUS PROSES', 'STATUS PERMOHONAN',
      'TANGGAL REKAP AWAL', 'JENIS PERIZINAN'
    ],
    howGenerated: 'Angka 628 berkas aktif diperoleh dari rekap kolom [PERMOHONAN STATUS PROSES] pada Dataset Item #17 ditambah kolom [JUMLAH STATUS PROSES] pada Dataset Item #16. Ini juga sama dengan selisih permohonan masuk (13.820) dikurangi izin terbit (13.192) = 628 berkas yang sedang dalam antrean verifikasi teknis.',
    tableauCalc: `// Berkas Aktif Dalam Proses (Backlog)
SUM([PERMOHONAN STATUS PROSES])
// Proporsi Terhadap Total Masuk
SUM([PERMOHONAN STATUS PROSES]) / SUM([PERMOHONAN STATUS MASUK]) * 100`,
    formulaRef: 'LIC_BACKLOG: Item #16 [JUMLAH NON PERIZINAN] SUM([JUMLAH STATUS PROSES]) & Item #17 SUM([PERMOHONAN STATUS PROSES])',
    description: 'Jumlah berkas perizinan yang saat ini sedang dalam proses verifikasi dokumen, validasi teknis, atau menunggu kelengkapan pemohon.',
  },
  {
    id: 'lic_mlt',
    code: 'LIC_MLT',
    title: 'Median Lead Time (Kecepatan)',
    value: '1,8 Hari',
    target: 'Standar SLA Maksimal: ≤ 3,0 Hari',
    percentage: 'Lebih Cepat 40% dari Standar',
    trend: {
      direction: 'down',
      value: '-0,3 Hari',
      period: '(Makin Cepat)',
      isPositive: true,
    },
    sparkline: [2.5, 2.4, 2.2, 2.1, 2.0, 1.9, 1.8],
    badge: {
      text: '1,8 Hari Kerja',
      variant: 'success',
    },
    colorTheme: 'emerald',
    datasetNo: 'Dataset Item #17 & Item #9',
    datasetName: 'DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU & PERIZINAN BERUSAHA',
    relevantAttributes: [
      'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'TANGGAL IZIN',
      'SERVICE LEVEL AGREEMENT (SLA)', 'JENIS PERIZINAN'
    ],
    howGenerated: 'Angka 1,8 hari kerja dihasilkan dengan menghitung selisih hari kerja antara [TANGGAL REKAP AKHIR] dan [TANGGAL REKAP AWAL] pada Dataset Item #17 untuk setiap berkas terbit, kemudian diambil nilai median (nilai tengah data ke-50 persentil) dari seluruh 13.192 berkas.',
    tableauCalc: `// Median Lead Time (Hari Kerja)
MEDIAN(DATEDIFF('day', [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]))`,
    formulaRef: 'LIC_MLT: Item #17 MEDIAN([TANGGAL REKAP AKHIR] - [TANGGAL REKAP AWAL]) dalam Hari Kerja',
    description: 'Rata-rata median waktu yang dibutuhkan sejak pemohon menekan submit permohonan hingga izin resmi terbit.',
  },
  {
    id: 'lic_bottleneck',
    code: 'LIC_BOTTLENECK',
    title: 'Bottleneck Rate (Kasus Overdue)',
    value: '3,2%',
    target: 'Ambang Batas Toleransi: ≤ 5,0%',
    percentage: '20 Kasus Overdue dari 628 Open',
    trend: {
      direction: 'down',
      value: '-0,8%',
      period: '(Perbaikan Efisiensi)',
      isPositive: true,
    },
    sparkline: [5.2, 4.8, 4.3, 4.0, 3.7, 3.5, 3.2],
    badge: {
      text: 'Hijau (≤ 5,0%)',
      variant: 'success',
    },
    colorTheme: 'blue',
    datasetNo: 'Dataset Item #17',
    datasetName: 'DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU',
    relevantAttributes: [
      'PERMOHONAN STATUS PROSES', 'TANGGAL REKAP AWAL',
      'SERVICE LEVEL AGREEMENT (SLA)', 'NAMA PERIZINAN BERUSAHA'
    ],
    howGenerated: 'Angka 3,2% dihasilkan dari identifikasi 20 berkas permohonan dalam proses yang durasi harinya melampaui batas target SLA (> 3 hari kerja) dibagi total 628 berkas aktif dalam proses dikalikan 100%: (20 ÷ 628) × 100% = 3,18% ≈ 3,2%.',
    tableauCalc: `// Bottleneck Overdue Rate %
(SUM(IF [Durasi Berjalan Hari] > [SERVICE LEVEL AGREEMENT (SLA)] 
 THEN [PERMOHONAN STATUS PROSES] ELSE 0 END)
 / SUM([PERMOHONAN STATUS PROSES])) * 100`,
    formulaRef: 'LIC_BOTTLENECK: Item #17 (SUM([PERMOHONAN STATUS PROSES] Overdue SLA) ÷ Total Berkas Aktif) × 100%',
    description: 'Proporsi permohonan aktif yang melewati batas waktu standar pelayanan akibat kendala verifikasi teknis atau revisi dari pemohon.',
  },
  {
    id: 'sat_ccr',
    code: 'SAT_CCR',
    title: 'Complaint Close Rate (Pengaduan)',
    value: '98,4%',
    target: 'Target Penanganan Aduan: ≥ 90,0%',
    percentage: '185 Selesai dari 188 Aduan',
    trend: {
      direction: 'up',
      value: '+1,2%',
      period: '(YTD)',
      isPositive: true,
    },
    sparkline: [92.0, 93.5, 95.0, 96.2, 97.0, 97.8, 98.4],
    badge: {
      text: '98,4% Selesai',
      variant: 'success',
    },
    colorTheme: 'rose',
    datasetNo: 'Dataset Item #6 & Item #7',
    datasetName: 'DATA MONITORING DAN EVALUASI PENGELOLAAN PENGADUAN MASYARAKAT TERHADAP LAYANAN DI PUSAT PELAYANAN TERPADU SATU PINTU',
    relevantAttributes: [
      'BULAN', 'TAHUN', 'SALURAN PENGADUAN', 'JENIS PENGADUAN',
      'JUMLAH PENGADUAN', 'PENYELESAIAN PENGADUAN', 'STATUS SELESAI'
    ],
    howGenerated: 'Angka 98,4% dihasilkan dari total aduan terselesaikan pada kolom [PENYELESAIAN PENGADUAN] (185 aduan berstatus selesai) dibagi total aduan masuk pada kolom [JUMLAH PENGADUAN] (188 aduan) dikalikan 100%: (185 ÷ 188) × 100% = 98,404% ≈ 98,4%.',
    tableauCalc: `// Complaint Close Rate %
SUM([PENYELESAIAN PENGADUAN]) / SUM([JUMLAH PENGADUAN]) * 100`,
    formulaRef: 'SAT_CCR: Item #6 [PENGELOLAAN PENGADUAN MASYARAKAT] - (SUM([PENYELESAIAN PENGADUAN]) ÷ SUM([JUMLAH PENGADUAN])) × 100%',
    description: 'Persentase pengaduan dan konsultasi masyarakat terkait layanan PTSP yang berhasil diselesaikan dan diberikan solusi nyata.',
  },
];

// -------------------------------------------------------------------------
// 3. DATASET PERIZINAN BERUSAHA (OSS RBA & BP BATAM IBIS)
// Berdasarkan Halaman 24-25 Katalog Data: Item #8, #9, #10, #14
// Atribut: BULAN, TAHUN, SEKTOR, KBLI, KEGIATAN USAHA, JENIS USAHA, KAWASAN INDUSTRI, SKALA USAHA, TINGKAT RESIKO, STATUS PENANAMAN MODAL, MODAL USAHA, STATUS
// -------------------------------------------------------------------------

export interface PtspPerizinanBerusahaItem {
  id: string;
  nomorPermohonan: string;
  namaPerusahaan: string;
  npwp: string;
  nib: string;
  sektor: string;
  kbli: string;
  uraianKbli: string;
  skalaUsaha: 'Mikro' | 'Kecil' | 'Menengah' | 'Besar';
  tingkatRisiko: 'Rendah' | 'Menengah Rendah' | 'Menengah Tinggi' | 'Tinggi';
  statusPenanamanModal: 'PMA' | 'PMDN';
  asalNegara: string;
  lokasiKawasan: string;
  rencanaInvestasi: number; // Dalam Miliar Rupiah
  tki: number;
  tka: number;
  tanggalPermohonan: string;
  statusPermohonan: 'Terbit Otomatis' | 'Disetujui' | 'Verifikasi Teknis' | 'Perbaikan Dokumen';
  slaHari: number;
}

export const PTSP_PERIZINAN_BERUSAHA_SAMPLE: PtspPerizinanBerusahaItem[] = [
  {
    id: 'PB-2026-001',
    nomorPermohonan: 'PB-OSS-20260401-0089',
    namaPerusahaan: 'PT Batam Semiconductor Advanced',
    npwp: '01.345.678.9-215.000',
    nib: '9120304910283',
    sektor: 'Industri Manufaktur Elektronik',
    kbli: '26110',
    uraianKbli: 'Industri Komponen Elektronik Semikonduktor',
    skalaUsaha: 'Besar',
    tingkatRisiko: 'Tinggi',
    statusPenanamanModal: 'PMA',
    asalNegara: 'Singapura',
    lokasiKawasan: 'Kawasan Industri Batamindo, Mukakuning',
    rencanaInvestasi: 450.0, // Rp 450 Miliar
    tki: 320,
    tka: 12,
    tanggalPermohonan: '2026-04-02',
    statusPermohonan: 'Disetujui',
    slaHari: 2,
  },
  {
    id: 'PB-2026-002',
    nomorPermohonan: 'PB-OSS-20260403-0142',
    namaPerusahaan: 'PT Marina Shipyard Offshore Batam',
    npwp: '02.876.543.1-215.000',
    nib: '8120401928374',
    sektor: 'Maritim & Galangan Kapal',
    kbli: '30111',
    uraianKbli: 'Industri Pembuatan Kapal dan Bangunan Terapung',
    skalaUsaha: 'Besar',
    tingkatRisiko: 'Tinggi',
    statusPenanamanModal: 'PMA',
    asalNegara: 'Belanda',
    lokasiKawasan: 'Kawasan Industri Galangan Kapal Tanjung Uncang',
    rencanaInvestasi: 280.0,
    tki: 210,
    tka: 8,
    tanggalPermohonan: '2026-04-03',
    statusPermohonan: 'Disetujui',
    slaHari: 3,
  },
  {
    id: 'PB-2026-003',
    nomorPermohonan: 'PB-OSS-20260405-0205',
    namaPerusahaan: 'PT Global Data Center Nusantara',
    npwp: '03.222.111.4-215.000',
    nib: '7120502938475',
    sektor: 'Teknologi Informasi & KEK',
    kbli: '63111',
    uraianKbli: 'Aktivitas Pengolahan Data dan Hosting (Data Center)',
    skalaUsaha: 'Besar',
    tingkatRisiko: 'Menengah Tinggi',
    statusPenanamanModal: 'PMA',
    asalNegara: 'Amerika Serikat',
    lokasiKawasan: 'KEK Nongsa Digital Park (NDP)',
    rencanaInvestasi: 850.0,
    tki: 85,
    tka: 6,
    tanggalPermohonan: '2026-04-05',
    statusPermohonan: 'Disetujui',
    slaHari: 2,
  },
  {
    id: 'PB-2026-004',
    nomorPermohonan: 'PB-OSS-20260407-0310',
    namaPerusahaan: 'PT Logistik Selat Malaka Trans',
    npwp: '04.555.666.7-215.000',
    nib: '6120603948576',
    sektor: 'Logistik, Pergudangan & Rantai Pasok',
    kbli: '52101',
    uraianKbli: 'Aktivitas Pergudangan dan Penyimpanan Kargo Berikat',
    skalaUsaha: 'Menengah',
    tingkatRisiko: 'Menengah Rendah',
    statusPenanamanModal: 'PMDN',
    asalNegara: 'Indonesia',
    lokasiKawasan: 'Kawasan Logistik Terpadu Kabil',
    rencanaInvestasi: 75.0,
    tki: 45,
    tka: 0,
    tanggalPermohonan: '2026-04-07',
    statusPermohonan: 'Disetujui',
    slaHari: 1,
  },
  {
    id: 'PB-2026-005',
    nomorPermohonan: 'PB-OSS-20260409-0418',
    namaPerusahaan: 'PT Surya Energi Terbarukan Batam',
    npwp: '05.999.888.2-215.000',
    nib: '5120704958677',
    sektor: 'Energi Baru Terbarukan (EBT)',
    kbli: '35116',
    uraianKbli: 'Pembangkit Tenaga Listrik Tenaga Surya (PLTS)',
    skalaUsaha: 'Besar',
    tingkatRisiko: 'Menengah Tinggi',
    statusPenanamanModal: 'PMA',
    asalNegara: 'Jepang',
    lokasiKawasan: 'Area Duriangkang & Tembesi',
    rencanaInvestasi: 620.0,
    tki: 140,
    tka: 5,
    tanggalPermohonan: '2026-04-09',
    statusPermohonan: 'Verifikasi Teknis',
    slaHari: 2,
  },
  {
    id: 'PB-2026-006',
    nomorPermohonan: 'PB-OSS-20260411-0520',
    namaPerusahaan: 'PT Presisi Cetak Plastik Industri',
    npwp: '06.333.444.8-215.000',
    nib: '4120805968778',
    sektor: 'Industri Manufaktur',
    kbli: '22220',
    uraianKbli: 'Industri Barang Plastik untuk Pengemasan Ekspor',
    skalaUsaha: 'Menengah',
    tingkatRisiko: 'Rendah',
    statusPenanamanModal: 'PMDN',
    asalNegara: 'Indonesia',
    lokasiKawasan: 'Kawasan Industri Tunas Batam Centre',
    rencanaInvestasi: 38.0,
    tki: 65,
    tka: 0,
    tanggalPermohonan: '2026-04-11',
    statusPermohonan: 'Terbit Otomatis',
    slaHari: 1,
  },
  {
    id: 'PB-2026-007',
    nomorPermohonan: 'PB-OSS-20260412-0589',
    namaPerusahaan: 'PT Aero Maintenance Nusantara',
    npwp: '07.777.888.9-215.000',
    nib: '3120906978879',
    sektor: 'Kedirgantaraan & Aviasi',
    kbli: '33151',
    uraianKbli: 'Reparasi dan Perawatan Pesawat Terbang (MRO)',
    skalaUsaha: 'Besar',
    tingkatRisiko: 'Tinggi',
    statusPenanamanModal: 'PMDN',
    asalNegara: 'Indonesia',
    lokasiKawasan: 'KEK Batam Aero Technic (BAT) Hang Nadim',
    rencanaInvestasi: 320.0,
    tki: 180,
    tka: 4,
    tanggalPermohonan: '2026-04-12',
    statusPermohonan: 'Disetujui',
    slaHari: 2,
  },
  {
    id: 'PB-2026-008',
    nomorPermohonan: 'PB-OSS-20260414-0644',
    namaPerusahaan: 'PT Samudera Inti Farmasi Medika',
    npwp: '08.111.999.3-215.000',
    nib: '2121007988980',
    sektor: 'Kesehatan & Alat Medis',
    kbli: '21012',
    uraianKbli: 'Industri Produk Farmasi dan Bahan Medis Habis Pakai',
    skalaUsaha: 'Menengah',
    tingkatRisiko: 'Menengah Tinggi',
    statusPenanamanModal: 'PMA',
    asalNegara: 'Jerman',
    lokasiKawasan: 'Kawasan Industri Cammo Industrial Park',
    rencanaInvestasi: 145.0,
    tki: 95,
    tka: 3,
    tanggalPermohonan: '2026-04-14',
    statusPermohonan: 'Perbaikan Dokumen',
    slaHari: 3,
  },
];

// Rekap Sektor Investasi & Perizinan Berusaha
export const PTSP_SEKTOR_SUMMARY = [
  { sektor: 'Industri Manufaktur & Perakitan', permohonan: 4820, terbit: 4610, investasiMiliar: 4850, pmaShare: 72 },
  { sektor: 'Maritim & Galangan Kapal', permohonan: 3240, terbit: 3105, investasiMiliar: 2940, pmaShare: 64 },
  { sektor: 'Logistik & Pergudangan Berikat', permohonan: 2450, terbit: 2360, investasiMiliar: 1780, pmaShare: 38 },
  { sektor: 'Teknologi Informasi & KEK Digital', permohonan: 1540, terbit: 1490, investasiMiliar: 2420, pmaShare: 85 },
  { sektor: 'Jasa Komersial & Pariwisata', permohonan: 1120, terbit: 1082, investasiMiliar: 890, pmaShare: 29 },
  { sektor: 'Energi Terbarukan & Infrastruktur', permohonan: 650, terbit: 545, investasiMiliar: 1460, pmaShare: 78 },
];

// -------------------------------------------------------------------------
// 4. DATASET PERIZINAN TRANSPORTASI & LOGISTIK MARITIM (SKKBM, SKKAB, SKKAA, JADWAL KAPAL)
// Sesuai PDF Halaman 21-23, 26-27 (Item #1, #2, #3, #11, #12)
// -------------------------------------------------------------------------

export interface PtspMaritimePermitItem {
  id: string;
  jenisIzin: 'SKKBM' | 'SKKAB' | 'SKKAA' | 'Jadwal Kapal' | 'Rekomendasi TERSUS';
  nomorIzin: string;
  namaPerusahaan: string;
  namaKapal: string;
  benderaKapal: string;
  agenPelayaran: string;
  pelabuhanAsal: string;
  pelabuhanBongkarMuat: string;
  jenisMuatanKomoditi: string;
  jumlahVolume: string;
  jumlahTkbm: number;
  eta: string;
  estimateMulaiKerja: string;
  estimateLamaHari: number;
  status: 'Selesai Terbit' | 'Proses Verifikasi' | 'Menunggu Verifikasi KSOP';
}

export const PTSP_MARITIME_PERMITS_SAMPLE: PtspMaritimePermitItem[] = [
  {
    id: 'MAR-001',
    jenisIzin: 'SKKBM',
    nomorIzin: 'SKKBM/BPB-PTSP/IV/2026/0891',
    namaPerusahaan: 'PT Batam Logistik Samudera',
    namaKapal: 'MV Pacific Voyager',
    benderaKapal: 'Panama',
    agenPelayaran: 'PT Pelayaran Samudera Jaya',
    pelabuhanAsal: 'Jurong Port, Singapore',
    pelabuhanBongkarMuat: 'Dermaga Peti Kemas Batu Ampar',
    jenisMuatanKomoditi: 'Peti Kemas Elektronik & Raw Materials',
    jumlahVolume: '1.250 TEUs (14.200 Ton)',
    jumlahTkbm: 48,
    eta: '2026-04-18 07:00 WIB',
    estimateMulaiKerja: '2026-04-18 09:00 WIB',
    estimateLamaHari: 2,
    status: 'Selesai Terbit',
  },
  {
    id: 'MAR-002',
    jenisIzin: 'SKKAB',
    nomorIzin: 'SKKAB/BPB-PTSP/IV/2026/0412',
    namaPerusahaan: 'PT Citra Angkut Nusantara',
    namaKapal: 'TB Sumber Makmur / BG Citra 3001',
    benderaKapal: 'Indonesia',
    agenPelayaran: 'PT Mitra Bahari Mandiri',
    pelabuhanAsal: 'Tanjung Priok, Jakarta',
    pelabuhanBongkarMuat: 'Pelabuhan Curah Kabil',
    jenisMuatanKomoditi: 'Semen Curah & Material Konstruksi',
    jumlahVolume: '7.800 Ton',
    jumlahTkbm: 24,
    eta: '2026-04-19 14:00 WIB',
    estimateMulaiKerja: '2026-04-19 16:30 WIB',
    estimateLamaHari: 3,
    status: 'Selesai Terbit',
  },
  {
    id: 'MAR-003',
    jenisIzin: 'SKKAA',
    nomorIzin: 'SKKAA/BPB-PTSP/IV/2026/0198',
    namaPerusahaan: 'PT Heavy Crane Offshore Batam',
    namaKapal: 'Crane Barge Titan 500',
    benderaKapal: 'Singapura',
    agenPelayaran: 'PT Trans Offshore Services',
    pelabuhanAsal: 'Pasir Gudang, Malaysia',
    pelabuhanBongkarMuat: 'Tanjung Uncang Shipyard Yard-4',
    jenisMuatanKomoditi: 'Floating Crane 500 Ton & Alat Rigging',
    jumlahVolume: '1 Unit Heavy Lifting Crane',
    jumlahTkbm: 16,
    eta: '2026-04-20 06:00 WIB',
    estimateMulaiKerja: '2026-04-20 08:00 WIB',
    estimateLamaHari: 5,
    status: 'Selesai Terbit',
  },
  {
    id: 'MAR-004',
    jenisIzin: 'Jadwal Kapal',
    nomorIzin: 'SPJK/BPB-PTSP/IV/2026/1102',
    namaPerusahaan: 'PT Batam Fast Ferry Lines',
    namaKapal: 'MV Batam Fast 28',
    benderaKapal: 'Indonesia',
    agenPelayaran: 'PT Batam Express Agency',
    pelabuhanAsal: 'HarbourFront Centre, Singapore',
    pelabuhanBongkarMuat: 'Terminal Feri Internasional Batam Centre',
    jenisMuatanKomoditi: 'Penumpang Wisata & Pebisnis (Pass Masuk)',
    jumlahVolume: '280 Penumpang',
    jumlahTkbm: 8,
    eta: '2026-04-21 08:15 WIB',
    estimateMulaiKerja: '2026-04-21 08:30 WIB',
    estimateLamaHari: 1,
    status: 'Selesai Terbit',
  },
  {
    id: 'MAR-005',
    jenisIzin: 'Rekomendasi TERSUS',
    nomorIzin: 'TERSUS/BPB-PTSP/IV/2026/0074',
    namaPerusahaan: 'PT Kabil Indonusa Steel Works',
    namaKapal: 'MV Kabil Pioneer',
    benderaKapal: 'Indonesia',
    agenPelayaran: 'PT Kabil Shipping Agency',
    pelabuhanAsal: 'Cigading, Banten',
    pelabuhanBongkarMuat: 'TUKS Kabil Estate Jetty-1',
    jenisMuatanKomoditi: 'Baja Coil & Pipa Industri Migas',
    jumlahVolume: '12.500 Ton',
    jumlahTkbm: 36,
    eta: '2026-04-22 10:00 WIB',
    estimateMulaiKerja: '2026-04-22 13:00 WIB',
    estimateLamaHari: 4,
    status: 'Proses Verifikasi',
  },
];

// -------------------------------------------------------------------------
// 5. MONITORING PENGADUAN MASYARAKAT LAYANAN PTSP (SP4N-LAPOR & MPP)
// Sesuai PDF Halaman 24: Item #6 & #7
// -------------------------------------------------------------------------

export interface PtspComplaintItem {
  id: string;
  kodeTiket: string;
  bulan: string;
  tahun: string;
  saluranPengaduan: 'SP4N-LAPOR!' | 'Meja Pengaduan MPP' | 'WhatsApp Helpdesk' | 'Portal Web PTSP';
  jenisPengaduan: string;
  perusahaanPelapor: string;
  uraianMasalah: string;
  statusSelesai: 'Selesai Tertangani' | 'Dalam Penanganan' | 'Eskalasi Teknis';
  lamaPenyelesaianHari: number;
  solusiDiberikan: string;
}

export const PTSP_COMPLAINTS_SAMPLE: PtspComplaintItem[] = [
  {
    id: 'ADU-001',
    kodeTiket: 'TKT-PTSP-202604-012',
    bulan: 'April',
    tahun: '2026',
    saluranPengaduan: 'SP4N-LAPOR!',
    jenisPengaduan: 'Keterlambatan Konfirmasi Bayar PNBP',
    perusahaanPelapor: 'PT Nusa Maritim Sejahtera',
    uraianMasalah: 'Bukti setor PNBP jasa dermaga via Bank BNI belum otomatis terverifikasi di aplikasi IBIS.',
    statusSelesai: 'Selesai Tertangani',
    lamaPenyelesaianHari: 1,
    solusiDiberikan: 'Sinkronisasi manual oleh kasir digital PTSP dan surat izin langsung terbit dalam 2 jam.',
  },
  {
    id: 'ADU-002',
    kodeTiket: 'TKT-PTSP-202604-015',
    bulan: 'April',
    tahun: '2026',
    saluranPengaduan: 'WhatsApp Helpdesk',
    jenisPengaduan: 'Konsultasi Persyaratan KBLI Industri Medis',
    perusahaanPelapor: 'PT Batam Biofarmaka Lestari',
    uraianMasalah: 'Menanyakan dokumen sertifikat standar dan permohonan persetujuan denah ruang produksi.',
    statusSelesai: 'Selesai Tertangani',
    lamaPenyelesaianHari: 1,
    solusiDiberikan: 'Diberikan checklist perizinan sektoral dan difasilitasi desk konsultasi teknis gratis di Gerai MPP.',
  },
  {
    id: 'ADU-003',
    kodeTiket: 'TKT-PTSP-202604-019',
    bulan: 'April',
    tahun: '2026',
    saluranPengaduan: 'Meja Pengaduan MPP',
    jenisPengaduan: 'Permohonan Notifikasi Perpanjangan Izin Usaha',
    perusahaanPelapor: 'PT Tunas Abadi Plastindo',
    uraianMasalah: 'Berharap ada pengingat 30 hari sebelum izin operasional tahunan berakhir agar tidak kena denda.',
    statusSelesai: 'Selesai Tertangani',
    lamaPenyelesaianHari: 2,
    solusiDiberikan: 'Fitur Reminder Otomatis H-30 telah diaktifkan di modul profil pemohon OSS BP Batam.',
  },
  {
    id: 'ADU-004',
    kodeTiket: 'TKT-PTSP-202604-023',
    bulan: 'April',
    tahun: '2026',
    saluranPengaduan: 'Portal Web PTSP',
    jenisPengaduan: 'Koreksi Data Perusahaan pada Dokumen Izin SKKBM',
    perusahaanPelapor: 'PT Samudera Raya Transport',
    uraianMasalah: 'Terdapat saltik pada nama kapal dari MV Pacific Glory menjadi MV Pacific Gloria.',
    statusSelesai: 'Selesai Tertangani',
    lamaPenyelesaianHari: 1,
    solusiDiberikan: 'Penerbitan addendum ralat izin secara instan via sistem TTE BSrE.',
  },
  {
    id: 'ADU-005',
    kodeTiket: 'TKT-PTSP-202604-028',
    bulan: 'April',
    tahun: '2026',
    saluranPengaduan: 'WhatsApp Helpdesk',
    jenisPengaduan: 'Kepadatan Antrean Loket Fisik Jam Istirahat',
    perusahaanPelapor: 'Masyarakat Pemohon Umum / Karyawan',
    uraianMasalah: 'Antrean konsultasi tatap muka sempat menumpuk pada pukul 12.00 - 13.00 WIB.',
    statusSelesai: 'Dalam Penanganan',
    lamaPenyelesaianHari: 1,
    solusiDiberikan: 'Pemberlakuan rotasi piket istirahat petugas agar loket tidak kosong selama jam siang.',
  },
];

// -------------------------------------------------------------------------
// 6. KATALOG 17 ATRIBUT DATA KHUSUS UNIT PTSP (PDF Halaman 21-28)
// -------------------------------------------------------------------------

export interface PtspCatalogItem {
  no: number;
  namaData: string;
  jenisData: string;
  periodeData: string;
  sifatData: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  atributData: string[];
  deskripsi: string;
}

export const PTSP_CATALOG_17_ITEMS: PtspCatalogItem[] = [
  {
    no: 1,
    namaData: 'DATA PERMOHONAN PERIZINAN SURAT KETERANGAN KERJA BONGKAR MUAT (SKKBM)',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: [
      'NAMA LAYANAN', 'NAMA PERUSAHAAN', 'NPWP', 'NO PENDAFTARAN', 'NO IZIN', 'TANGGAL IZIN',
      'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'NOMOR SURAT PERMOHONAN', 'TANGGAL SURAT PERMOHONAN',
      'PERIHAL SURAT PERMOHONAN', 'NAMA AGEN PELAYARAN', 'NAMA PERUSAHAAN EMKL', 'NAMA PERUSAHAAN PBM',
      'NAMA KAPAL', 'BENDERA KAPAL', 'ESTIMATE TIME ARRIVAL', 'ESTIMATE TANGGAL MULAI KERJA',
      'ESTIMATE LAMA HARI KERJA', 'ASAL PEMASUKAN', 'PELABUHAN ASAL', 'PELABUHAN BONGKAR MUAT',
      'JENIS MUATAN KOMODITI', 'JENIS KEMASAN', 'JENIS KEGIATAN', 'JUMLAH BONGKAR MUAT',
      'KETERANGAN KEGIATAN', 'PERALATAN BONGKAR MUAT', 'JUMLAH TKBM', 'STATUS KEPEMILIKAN MUATAN',
      'KETERANGAN'
    ],
    deskripsi: 'Data operasional permohonan izin kerja bongkar muat kapal kargo & peti kemas di dermaga BP Batam.',
  },
  {
    no: 2,
    namaData: 'DATA PERMOHONAN PERIZINAN SURAT KETERANGAN KERJA ANGKUT BARANG (SKKAB)',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: [
      'NAMA LAYANAN', 'NAMA PERUSAHAAN', 'NPWP', 'NO PENDAFTARAN', 'NO IZIN', 'TANGGAL IZIN',
      'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'NOMOR SURAT PERMOHONAN', 'TANGGAL SURAT PERMOHONAN',
      'PERIHAL SURAT PERMOHONAN', 'NAMA AGEN PELAYARAN', 'NAMA PERUSAHAAN EMKL', 'NAMA PERUSAHAAN PBM',
      'NAMA KAPAL', 'BENDERA KAPAL', 'ESTIMATE TIME ARRIVAL', 'ESTIMATE TANGGAL MULAI KERJA',
      'ESTIMATE LAMA HARI KERJA', 'ASAL PEMASUKAN', 'PELABUHAN ASAL', 'PELABUHAN BONGKAR MUAT',
      'JENIS MUATAN KOMODITI', 'JENIS KEMASAN', 'JENIS KEGIATAN', 'JUMLAH BONGKAR MUAT',
      'KETERANGAN KEGIATAN', 'PERALATAN BONGKAR MUAT', 'JUMLAH TKBM', 'STATUS KEPEMILIKAN MUATAN',
      'KETERANGAN'
    ],
    deskripsi: 'Data perizinan pengangkutan barang dari pelabuhan ke kawasan industri atau antar pulau di KPBPBB.',
  },
  {
    no: 3,
    namaData: 'DATA PERMOHONAN PERIZINAN SURAT KETERANGAN KEPEMILIKAN DAN ASAL ALAT (SKKAA)',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: [
      'NAMA LAYANAN', 'NAMA PERUSAHAAN', 'NPWP', 'NO PENDAFTARAN', 'NO IZIN', 'TANGGAL IZIN',
      'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'NOMOR SURAT PERMOHONAN', 'TANGGAL SURAT PERMOHONAN',
      'PERIHAL SURAT PERMOHONAN', 'NAMA AGEN PELAYARAN', 'NAMA PERUSAHAAN EMKL', 'NAMA PERUSAHAAN PBM',
      'NAMA KAPAL', 'BENDERA KAPAL', 'ESTIMATE TIME ARRIVAL', 'ESTIMATE TANGGAL MULAI KERJA',
      'ESTIMATE LAMA HARI KERJA', 'ASAL PEMASUKAN', 'PELABUHAN ASAL', 'PELABUHAN BONGKAR MUAT',
      'JENIS MUATAN KOMODITI', 'JENIS KEMASAN', 'JENIS KEGIATAN', 'JUMLAH BONGKAR MUAT',
      'KETERANGAN KEGIATAN', 'PERALATAN BONGKAR MUAT', 'JUMLAH TKBM', 'STATUS KEPEMILIKAN MUATAN',
      'KETERANGAN'
    ],
    deskripsi: 'Verifikasi legalitas asal-usul dan kepemilikan alat berat konstruksi/maritim yang beroperasi di Batam.',
  },
  {
    no: 4,
    namaData: 'DATA IJIN PEMBANGUNAN/ PENGOPERASIAN/PENYESUAIAN/ PENGEMBANGAN TERMINAL KHUSUS ATAU TUKS',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERBUKA',
    atributData: [
      'NAMA LAYANAN', 'NAMA PERUSAHAAN', 'NPWP', 'NO PENDAFTARAN', 'NO IZIN', 'TANGGAL IZIN',
      'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'NOMOR SURAT PERMOHONAN', 'TANGGAL SURAT PERMOHONAN',
      'PERIHAL SURAT PERMOHONAN', 'NAMA AGEN PELAYARAN', 'NAMA PERUSAHAAN EMKL', 'NAMA PERUSAHAAN PBM',
      'NAMA KAPAL', 'BENDERA KAPAL', 'ESTIMATE TIME ARRIVAL', 'ESTIMATE TANGGAL MULAI KERJA',
      'ESTIMATE LAMA HARI KERJA', 'ASAL PEMASUKAN', 'PELABUHAN ASAL', 'PELABUHAN BONGKAR MUAT',
      'JENIS MUATAN KOMODITI', 'JENIS KEMASAN', 'JENIS KEGIATAN', 'JUMLAH BONGKAR MUAT',
      'KETERANGAN KEGIATAN', 'PERALATAN BONGKAR MUAT', 'JUMLAH TKBM', 'STATUS KEPEMILIKAN MUATAN',
      'KETERANGAN'
    ],
    deskripsi: 'Data penetapan izin operasional dermaga khusus galangan kapal, pabrik pipa, dan terminal industri.',
  },
  {
    no: 5,
    namaData: 'DATA IMPLEMENTASI KEBIJAKAN TRANSFORMASI DIGITAL MAL PELAYANAN PUBLIK (MPP)',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERSEMESTER',
    sifatData: 'TERBUKA',
    atributData: [
      'SEMESTER', 'TAHUN', 'NAMA PERUSAHAAN', 'ALAMAT PERUSAHAAN', 'NOMOR SURAT PERMOHONAN',
      'TANGGAL SURAT PERMOHONAN', 'PERIHAL SURAT PERMOHONAN/JENIS PERMOHONAN', 'NOMOR TELP PENANGGUNGJAWAB',
      'JABATAN PENANGGUNGJAWAB', 'NIB', 'NPWP', 'NOMOR AKTA', 'KBLI', 'NOMOR IZIN OPERASI'
    ],
    deskripsi: 'Monitoring digitalisasi layanan pada Mal Pelayanan Publik (MPP) terintegrasi 24 instansi eksternal.',
  },
  {
    no: 6,
    namaData: 'DATA MONITORING DAN EVALUASI PENGELOLAAN PENGADUAN MASYARAKAT TERHADAP LAYANAN DI PUSAT PELAYANAN TERPADU SATU PINTU',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERSEMESTER',
    sifatData: 'TERBUKA',
    atributData: [
      'BULAN', 'TAHUN', 'SALURAN PENGADUAN', 'JENIS PENGADUAN', 'KODE', 'JUMLAH PENGADUAN',
      'PENYELESAIAN PENGADUAN', 'STATUS SELESAI'
    ],
    deskripsi: 'Rekapitulasi berkala tindak lanjut komplain pemohon demi peningkatan mutu layanan PTSP.',
  },
  {
    no: 7,
    namaData: 'DAFTAR INFORMASI PERIZINAN BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: [
      'BULAN', 'TAHUN', 'SALURAN PENGADUAN', 'JENIS PENGADUAN', 'KODE', 'JUMLAH PENGADUAN',
      'PENYELESAIAN PENGADUAN', 'STATUS SELESAI'
    ],
    deskripsi: 'Pusat informasi transparansi perizinan berusaha dan pelacakan berkas bagi para pelaku usaha.',
  },
  {
    no: 8,
    namaData: 'DATA PEMANTAUAN DAN EVALUASI PERIZINAN',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: [
      'NAMA PERUSAHAAN', 'ALAMAT', 'PENANGGUNGJAWAB PROYEK', 'KONTAK PENANGGUNGJAWAB PROYEK',
      'NIB', 'NO KODE PROYEK', 'KBLI', 'URAIAN KBLI', 'SEKTOR', 'STATUS PENANAMAN MODAL',
      'NO SERTIFIKAT STANDAR', 'PEMENUHAN STANDAR USAHA', 'PERMASALAHAN', 'RENCANA INVESTASI',
      'REALISASI INVESTASI', 'JUMLAH TKI LAKI', 'JUMLAH TKI PEREMPUAN', 'JUMLAH TKA LAKI',
      'JUMLAH TKA PEREMPUAN'
    ],
    deskripsi: 'Monitoring komitmen realisasi investasi dan kepatuhan ketenagakerjaan dari izin yang diterbitkan.',
  },
  {
    no: 9,
    namaData: 'DATA PERMOHONAN PERIZINAN BERUSAHA',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: [
      'BULAN', 'TAHUN', 'PELAKSANA', 'KBLI', 'KEGIATAN USAHA', 'SEKTOR', 'JENIS PERUSAHAAN',
      'KAWASAN INDUSTRI', 'SKALA USAHA', 'TINGKAT RESIKO', 'STATUS PENANAMAN MODAL', 'ASAL NEGARA',
      'TKI', 'TKA', 'TANGGAL PERMOHONAN', 'NOMOR PERMOHONAN', 'NOMOR PROYEK', 'NIB', 'MODAL USAHA',
      'ALAMAT', 'LOKASI PROYEK', 'EMAIL', 'KONTAK', 'JENIS PROYEK', 'NAMA PERIZINAN',
      'STATUS PERMOHONAN', 'PEMEGANG SAHAM'
    ],
    deskripsi: 'Basis data terpadu permohonan perizinan berusaha OSS RBA yang diproses di wilayah kerja BP Batam.',
  },
  {
    no: 10,
    namaData: 'DATA SURAT KETERANGAN IZIN OPERASI PERUSAHAAN',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERBUKA',
    atributData: [
      'NAMA LAYANAN', 'NAMA PERUSAHAAN', 'NPWP', 'NO PENDAFTARAN', 'NO IZIN', 'TANGGAL IZIN',
      'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'NOMOR SURAT PERMOHONAN', 'TANGGAL SURAT PERMOHONAN',
      'PERIHAL SURAT PERMOHONAN', 'NAMA AGEN PELAYARAN', 'NAMA PERUSAHAAN EMKL', 'NAMA PERUSAHAAN PBM',
      'NAMA KAPAL', 'BENDERA KAPAL', 'ESTIMATE TIME ARRIVAL', 'ESTIMATE TANGGAL MULAI KERJA',
      'ESTIMATE LAMA HARI KERJA', 'ASAL PEMASUKAN', 'PELABUHAN ASAL', 'PELABUHAN BONGKAR MUAT',
      'JENIS MUATAN KOMODITI', 'JENIS KEMASAN', 'JENIS KEGIATAN', 'JUMLAH BONGKAR MUAT',
      'KETERANGAN KEGIATAN', 'PERALATAN BONGKAR MUAT', 'JUMLAH TKBM', 'STATUS KEPEMILIKAN MUATAN',
      'KETERANGAN'
    ],
    deskripsi: 'Penerbitan surat keterangan operasional izin kerja bagi korporasi yang aktif menjalankan aktivitas bisnis di KPBPBB Batam.',
  },
  {
    no: 11,
    namaData: 'DATA PERMOHONAN REKOMENDASI TERSUS UNTUK KEGIATAN BONGKAR MUAT',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: [
      'NAMA LAYANAN', 'NAMA PERUSAHAAN', 'NPWP', 'NO PENDAFTARAN', 'NO IZIN', 'TANGGAL IZIN',
      'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'NAMA KAPAL', 'JENIS BARANG', 'VOLUME BARANG',
      'PELABUHAN ASAL', 'PELABUHAN TUJUAN', 'JENIS IZIN OPERASI'
    ],
    deskripsi: 'Rekomendasi teknis penggunaan dermaga khusus (TERSUS) untuk komoditas industri strategis.',
  },
  {
    no: 12,
    namaData: 'DATA PERMOHONAN PERSETUJUAN JADWAL KAPAL',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: [
      'NAMA LAYANAN', 'NAMA PERUSAHAAN', 'NPWP', 'KAPASITAS PENUMPANG',
      'NO SURAT PERSETUJUAN PENGOPERASIAN KAPAL', 'NOMOR SURAT PERMOHONAN', 'TANGGAL SURAT PERMOHONAN',
      'JENIS KAPAL', 'PEMILIK KAPAL', 'NAMA KAPAL', 'BENDERA KAPAL', 'PELABUHAN ASAL TUJUAN',
      'JADWAL KEBERANGKATAN'
    ],
    deskripsi: 'Persetujuan jadwal operasional kapal feri reguler internasional/domestik dan kapal roro.',
  },
  {
    no: 13,
    namaData: 'DATA IJIN KERUK DAN REKLAMASI',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERBUKA',
    atributData: [
      'NAMA PERUSAHAAN', 'NIB', 'ALAMAT', 'STATUS PENANAMAN MODAL', 'KBLI', 'LOKASI USAHA',
      'NPWP', 'NOMOR PENDAFTARAN'
    ],
    deskripsi: 'Izin pengerukan alur pelayaran dan penataan reklamasi pantai ramah lingkungan.',
  },
  {
    no: 14,
    namaData: 'JENIS LAYANAN BP BATAM',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERBUKA',
    atributData: [
      'BULAN', 'TAHUN', 'JENIS LAYANAN', 'JUMLAH LAYANAN MASUK', 'JUMLAH LAYANAN TERSELESAIKAN'
    ],
    deskripsi: 'Katalog jenis layanan perizinan terpadu dan volume transaksi bulanan yang difasilitasi PTSP.',
  },
  {
    no: 15,
    namaData: 'JUMLAH PEMANTAUAN DAN EVALUASI',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: [
      'NAMA PERUSAHAAN', 'ALAMAT', 'PENANGGUNGJAWAB PROYEK', 'KONTAK PENANGGUNGJAWAB PROYEK',
      'NIB', 'NO KODE PROYEK', 'KBLI', 'URAIAN KBLI', 'SEKTOR', 'STATUS PENANAMAN MODAL',
      'NO SERTIFIKAT STANDAR', 'PEMENUHAN STANDAR USAHA', 'PERMASALAHAN', 'RENCANA INVESTASI',
      'REALISASI INVESTASI', 'JUMLAH TKI LAKI', 'JUMLAH TKI PEREMPUAN', 'JUMLAH TKA LAKI',
      'JUMLAH TKA PEREMPUAN'
    ],
    deskripsi: 'Audit kepatuhan lapangan pasca penerbitan perizinan berusaha (post-audit monitoring LKPM).',
  },
  {
    no: 16,
    namaData: 'JUMLAH NON PERIZINAN',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERTUTUP',
    atributData: [
      'BULAN', 'TAHUN', 'TANGGAL AWAL PERIZINAN', 'TANGGAL AKHIR PERIZINAN', 'UNIT PELAYANAN',
      'JENIS NON PERIZINAN', 'JUMLAH STATUS MASUK', 'JUMLAH STATUS TOLAK', 'JUMLAH STATUS PROSES',
      'JUMLAH STATUS SELESAI'
    ],
    deskripsi: 'Layanan administrasi non-perizinan seperti legalisir, surat rekomendasi, dan konsultasi OSS.',
  },
  {
    no: 17,
    namaData: 'DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERBULAN',
    sifatData: 'TERBUKA',
    atributData: [
      'BULAN', 'TANGGAL IZIN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'JENIS PERIZINAN',
      'NAMA PERIZINAN BERUSAHA', 'PERMOHONAN STATUS MASUK', 'PERMOHONAN STATUS PROSES',
      'PERMOHONAN STATUS SELESAI', 'SERVICE LEVEL AGREEMENT (SLA)'
    ],
    deskripsi: 'Data performa ketepatan waktu penyelesaian izin terhadap janji layanan publik (SLA).',
  },
];
