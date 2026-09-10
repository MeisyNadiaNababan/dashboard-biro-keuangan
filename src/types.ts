export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  targetOrPagu?: string;
  percentage?: string;
  trend: {
    direction: 'up' | 'down';
    value: string;
    period: string;
    isPositive?: boolean; // In expenditure or debt, up might be warning
  };
  sparkline: number[];
  badge?: {
    text: string;
    variant: 'success' | 'warning' | 'danger' | 'info';
  };
  colorTheme: 'emerald' | 'blue' | 'amber' | 'rose' | 'purple' | 'teal';
}

export interface RevenueItem {
  id: number;
  sumber: string;
  target: number; // in Miliar
  realisasi: number; // in Miliar
  capaian: number; // in %
  sisaTarget: number; // in Miliar
  trend: number; // % change
  isUp: boolean;
  history: number[];
}

export interface ExpenseItem {
  id: number;
  unitKerja: string;
  program?: string;
  pagu: number; // in Miliar
  realisasi: number; // in Miliar
  serapan: number; // in %
  persentase?: number; // in % alias
  sisaAnggaran: number; // in Miliar
  sisa?: number; // in Miliar alias
  status: 'Rendah' | 'Cukup' | 'Baik';
  trend: number; // % change
  isUp: boolean;
  history: number[];
}

export interface ReceivableCategory {
  id: number;
  kategori: string;
  jumlahDebitur: number;
  nilaiPiutang: number; // in Miliar
  persentase: number; // in %
  agingTrend: number; // %
}

export interface AgingBucket {
  range: string;
  label: string;
  amount: number; // Miliar
  percentage: number;
  color: string;
}

export interface ReceivableStatus {
  status: string;
  percentage: number;
  amount: number;
  color: string;
}

export interface CashFlowMonth {
  month: string;
  masuk: number; // Miliar
  keluar: number; // Miliar
  saldo: number; // Miliar
}

export interface FundingSource {
  name: string;
  amount: string;
  percentage: number;
  color: string;
}

export interface SurplusDeficitUnit {
  unit: string;
  amount: string;
  isSurplus: boolean;
  type: string;
}

export interface InsightItem {
  id: number;
  text: string;
  category: 'positive' | 'warning' | 'alert';
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'warning' | 'success';
  read: boolean;
}

export interface PerkinIndicator {
  id: string;
  kodeIku: string;
  sasaran: string;
  indikator: string;
  targetDisplay: string;
  realisasiDisplay: string;
  capaian: number; // in %
  formulaResmi: string;
  sumberData: string;
  penanggungJawab: string;
  polarisasi: 'Maximize' | 'Minimize';
  status: 'Tercapai' | 'On Track' | 'Perlu Perhatian';
  catatan: string;
}

// -------------------------------------------------------------
// Official Data Catalog & Database Interfaces for Biro Keuangan
// (Matched with Dokumen Katalog Data & Atribut BP Batam)
// -------------------------------------------------------------

// Item 13: Laporan Saldo Bank Real Time
export interface LaporanSaldoBankRealTime {
  id: string;
  namaBank: string;
  unit: string;
  kategoriUnit: string;
  nomorRekening: string;
  kegunaanRekening: string;
  kategoriRekening: 'Operasional' | 'Penerimaan' | 'Pengeluaran' | 'Deposito';
  tanggalRekap: string;
  nilai: number; // in Miliar or Rupiah
  nilaiDisplay: string;
  porsiPersen: number;
}

// Item 7: Rincian Target Penerimaan Negara Bukan Pajak (PNBP)
export interface RincianTargetPnbp {
  kode: string;
  pengguna: string; // Unit Pengampu
  mataUang: string; // IDR / USD
  satuan: string;
  tarif: number;
  volume: number;
  jumlah: number; // in Miliar
  jumlahDisplay: string;
  tahun: number;
}

// Item 8: Rekapitulasi Target Penerimaan Negara Bukan Pajak (PNBP)
export interface RekapitulasiTargetPnbp {
  tahun?: number;
  kodeKegiatan: string;
  namaUnit: string;
  namaLayanan: string;
  jumlah: number; // in Miliar
  jumlahDisplay: string;
  realisasi: number;
  capaian: number;
}

// Item 3 & 12: Laporan Realisasi Anggaran Badan Layanan Umum (BLU)
export interface LaporanRealisasiAnggaranBlu {
  jenisAnggaran: string;
  kategori: 'Belanja Pegawai' | 'Belanja Barang & Jasa' | 'Belanja Modal' | 'Pendapatan Layanan';
  uraian: string;
  triwulan: string;
  tahun: number;
  anggaran: number; // in Miliar
  realisasi: number; // in Miliar
  persentase: number; // in %
  periodeRekap: string;
}

// Item 23: Rekapitulasi Pagu Anggaran
export interface RekapitulasiPaguAnggaran {
  tahun: number;
  kodeKegiatan: string;
  namaKegiatan: string;
  sumberDanaPnbp: number; // in Miliar
  sumberDanaRm: number; // in Miliar
  sumberDanaPhln: number; // in Miliar
  sumberDanaPdln: number; // in Miliar
  jumlah: number; // in Miliar
}

// Item 21: Rekapitulasi Daftar Piutang
export interface RekapitulasiDaftarPiutang {
  unitUsaha: string;
  namaPelanggan: string;
  jumlahPiutang: number; // in Miliar
}

// Item 17: Rekapitulasi Umur Piutang
export interface RekapitulasiUmurPiutang {
  namaPelanggan: string;
  jumlahPiutangTertagih: number; // in Miliar
  umurPiutang: number; // in Hari
  kategoriCalculated?: string;
}

// Item 18: Rekapitulasi Mutasi Piutang Per Faktur
export interface RekapitulasiMutasiPiutang {
  id: string;
  namaPelanggan: string;
  fakturTerbit: string;
  saldoAwal: number; // in Miliar
  bayarFaktur: number; // in Miliar
  saldoAkhir: number; // in Miliar
  umurPiutang: number; // in hari
}

// Item 20: Rekapitulasi Piutang Tak Tertagih
export interface RekapitulasiPiutangTakTertagih {
  nomorFaktur: string;
  tanggalTerbitFaktur: string;
  namaPelanggan: string;
  tanggalJatuhTempo: string;
  jumlahPiutangKoreksiKpknl: number; // in Juta / Miliar
  perhitunganDenda: number;
  bayarFaktur: number;
  saldoPiutangTakTertagih: number;
}

// Item 14: Laporan Penerimaan Sumber Dana
export interface LaporanPenerimaanSumberDana {
  sumberDana: 'PNBP' | 'APBN (Rupiah Murni)' | 'Hibah/Lainnya';
  unitKerja: string;
  tanggalRekapAwal: string;
  tanggalRekapAkhir: string;
  nilai: number; // in Miliar
  porsi: number;
}

// Katalog Data Biro Keuangan BP Batam
export interface BiroKeuanganDataCatalogItem {
  no: number;
  namaData: string;
  jenisData: 'DATA STATISTIK' | 'DOKUMEN DIGITAL' | 'DATA SPASIAL';
  periodeData: 'PERBULAN' | 'PERTRIWULAN' | 'PERSEMESTER' | 'PERTAHUN' | 'JIKA UPDATE';
  sifatData: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  atributData: string[];
  tabelDatabase: string;
  keterangan: string;
}

// Data Dictionary Atribut Database Resmi
export interface DataDictionaryField {
  id: string;
  tableName: string; // contoh: 'keu_target_pnbp_rekap'
  tableItemNo: number; // nomor item katalog, contoh: 8
  tableLabel: string; // contoh: 'Rekapitulasi Target PNBP'
  fieldName: string; // nama atribut dokumen resmi, contoh: 'KODE KEGIATAN'
  sqlColumnName: string; // nama kolom database postgresql, contoh: 'kode_kegiatan'
  tableauRole: 'Dimension' | 'Measure';
  dataType: 'String' | 'Integer' | 'Numeric / Currency' | 'Date' | 'Percentage';
  defaultAggregation?: 'None' | 'SUM' | 'AVG' | 'COUNT';
  description: string;
  exampleValue: string;
  sifatData: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  usedInWorksheets: string[];
}
