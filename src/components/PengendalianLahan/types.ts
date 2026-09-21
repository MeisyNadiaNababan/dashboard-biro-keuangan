export interface PengendalianFilterState {
  tahun: string;
  swp: string;
  objekPengawasan: string;
  tahapPenindakan: string;
  searchQuery: string;
}

export interface PengawasanItem {
  id: string;
  kode: string;
  namaLokasi: string;
  swp: string;
  kategori: 'Lahan Darat' | 'Wilayah Pesisir' | 'Area Reklamasi';
  luasHa: number;
  tanggalPemeriksaan: string;
  hasilPemeriksaan: 'Sesuai Ketentuan' | 'Teguran Lisan' | 'Indikasi Pelanggaran' | 'Dihentikan Sementara';
  statusTindakan: 'Terkendali' | 'Dalam Pengawasan' | 'Rekomendasi SP';
  pemegangAlokasi: string;
  catatanPetugas: string;
}

export interface EvaluasiPembatalanItem {
  id: string;
  noKasus: string;
  pemegangAlokasi: string;
  peruntukan: string;
  luasM2: number;
  luasHa: number;
  swp: string;
  tahapPeringatan: 'SP-1' | 'SP-2' | 'SP-3' | 'Pembatalan SK' | 'Pemulihan Komitmen';
  tanggalTerbit: string;
  alasanEvaluasi: string;
  statusPenyelesaian: 'Selesai' | 'Dalam Proses';
  potensiLahanKembaliHa: number;
}

export interface DokumenLahanPesisirItem {
  id: string;
  noDokumen: string;
  jenisDokumen: 'BAPL Lapangan' | 'Dokumen Teknis Reklamasi' | 'Kajian Sempadan Pesisir' | 'Rekomendasi Pengendalian';
  pemohonObjek: string;
  swp: string;
  tanggalPengesahan: string;
  status: 'Disahkan' | 'Dalam Verifikasi' | 'Revisi Teknis';
  slaHari: number;
}

export interface RekomendasiPembaruanItem {
  id: string;
  noPermohonan: string;
  jenis: 'Perpanjangan Pembaruan Alokasi' | 'Izin Peralihan Hak';
  pemohon: string;
  peruntukan: string;
  luasM2: number;
  swp: string;
  tanggalMasuk: string;
  tanggalSelesai: string;
  status: 'Disetujui' | 'Disetujui Bersyarat' | 'Ditolak (Mangkrak)';
  slaHari: number;
  alasanKeputusan: string;
}

export interface SwpPengendalianSummary {
  swp: string;
  namaWilayah: string;
  totalObjek: number;
  patuh: number;
  teguran: number;
  pelanggaran: number;
  persentaseKepatuhan: number;
  luasPengawasanHa: number;
}
