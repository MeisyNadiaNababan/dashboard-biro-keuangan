// Types for Direktorat Pengelolaan Kawasan Bandara
export interface BandaraFilterState {
  tahun: string;
  jenisPenerbangan: string; // 'Semua' | 'Domestik' | 'Internasional'
  arahPergerakan: string; // 'Semua' | 'Arrival' | 'Departure' | 'Transit'
  kategoriOperator: string; // 'Semua' | 'Lion Group' | 'Garuda Group' | 'AirAsia' | 'Perintis/Lainnya' | 'Kargo'
  jenisPnbp: string; // 'Semua' | 'PJP4U' | 'PJP2U' | 'Kargo' | 'Konsesi Aset'
  searchQuery: string;
}

export interface PnbpBandaraItem {
  id: string;
  jenisPenerimaan: string;
  kodeAkun: string;
  anggaranPnbp: number; // in IDR
  realisasiTotalIdr: number; // in IDR
  persentaseCapaian: number;
  keterangan: string;
  iconName: string;
}

export interface OperatorFlightData {
  id: string;
  namaMaskapai: string;
  kodeIata: string;
  kodeIcao: string;
  kategori: 'Lion Group' | 'Garuda Group' | 'AirAsia' | 'Perintis/Lainnya' | 'Kargo';
  tipe: 'PENUMPANG' | 'KARGO';
  jenisPenerbangan: 'DOMESTIK' | 'INTERNASIONAL' | 'DOMESTIK & INTERNASIONAL';
  status: 'BEROPERASI';
  siup: string;
  jumlahPenerbangan: number; // Pergerakan pesawat tahunan/periode
  sharePersen: number;
  totalPenumpang: number;
  loadFactorPersen: number;
  armadaDominan: string;
  ruteUtama: string[];
}

export interface BulananPenumpangData {
  bulan: string;
  kodeBulan: string;
  penumpangDomestikArrival: number;
  penumpangDomestikDeparture: number;
  penumpangDomestikTransit: number;
  penumpangInternasionalArrival: number;
  penumpangInternasionalDeparture: number;
  totalPenumpang: number;
  totalPenerbangan: number;
  kargoTon: number;
  bagasiKg: number;
  posKg: number;
  seatLoadFactor: number;
}

export interface FlightMovementRecord {
  id: string;
  nomorPenerbangan: string;
  operator: string;
  asal: string;
  tujuan: string;
  ruteLabel: string;
  arah: 'Arrival' | 'Departure';
  jenisPenerbangan: 'Domestik' | 'Internasional';
  waktuPenerbangan: string;
  typePesawat: string;
  registrasiPesawat: string;
  kapasitasKursi: number;
  penumpangDewasa: number;
  penumpangAnak: number;
  penumpangBayi: number;
  transit: number;
  totalPenumpang: number;
  seatLoadFactor: number;
  bagasiKg: number;
  kargoKg: number;
  posKg: number;
  statusPenerbangan: 'On-Time' | 'Landed' | 'Departed' | 'Scheduled' | 'Delayed';
}

export interface AirportRouteData {
  kodeRute: string;
  kotaAsal: string;
  kotaTujuan: string;
  namaBandara: string;
  frekuensiMingguan: number;
  totalPenumpangTahunan: number;
  seatLoadFactor: number;
  maskapaiMelayani: string[];
  kategori: 'Domestik' | 'Internasional';
}

export interface AirportAssetSpec {
  fasilitas: string;
  spesifikasi: string;
  kapasitasEksisting: string;
  utilisasiPersen: number;
  keterangan: string;
}
