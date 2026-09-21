export interface LahanFilterState {
  tahun: string; // 'ALL' | '2024' | '2023'
  jenisPemohon: string; // 'ALL' | 'Individual Person' | 'Perseroan Terbatas (PT)' | 'Yayasan' | 'Pemerintahan' | 'Koperasi' | 'Gereja' | 'Lain-Lain'
  status: 'ALL' | 'DISETUJUI' | 'DITOLAK';
  swp: string; // 'ALL' | specific SWP
  searchQuery: string;
}

export interface RekapPermohonanItem {
  id: number;
  jenisPemohon: string;
  tglAwal: string;
  tglAkhir: string;
  disetujui: number;
  ditolak: number;
  jumlah: number;
  tahun: number;
  bulan: string;
  keterangan?: string;
}

export interface SwpLahanItem {
  id: string;
  swp: string;
  namaWilayah: string;
  luasHa: number;
  luasM2: number;
  jumlahPersil: number;
  persilSiapPakai: number;
  persilDalamProses: number;
  peruntukanUtama: string;
  statusKawasan: string;
  tingkatKesiapan: 'Sangat Tinggi' | 'Tinggi' | 'Sedang';
  investasiFokus: string;
}

export interface LayananPertanahanSummary {
  noDataset: number;
  namaLayanan: string;
  kodeTag: string;
  jumlahPermohonan: number;
  disetujui: number;
  ditolak: number;
  rasioDisetujui: number;
  color: string;
  iconName: string;
  deskripsi: string;
}
