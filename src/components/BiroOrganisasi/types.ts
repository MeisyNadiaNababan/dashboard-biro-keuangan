export interface BokmrFilterState {
  tahun: string;
  klaster: string;
  unitKerja: string;
  kategoriAkuntabilitas: string;
  statusPengaduan: string;
  searchQuery: string;
}

export interface SakipComponent {
  id: string;
  komponen: string;
  bobot: number;
  nilai: number;
  capaianPersen: number;
  tingkatAkuntabilitas: string;
  keterangan: string;
  subKomponen: {
    nama: string;
    bobot: number;
    nilai: number;
  }[];
}

export interface SpipMaturitasItem {
  no: number;
  komponenPenilaian: string;
  bobot: number;
  skor: number;
  targetSkor: number;
  levelMaturitas: string;
  periodePenilaian: string;
  fokusArea: string;
}

export interface PengaduanBadanUsaha {
  id: string;
  periode: string;
  tahun: string;
  unitPelayanan: string;
  kodeUnit: string;
  jmlPengaduanDiterima: number;
  jmlPengaduanDiproses: number;
  jmlPengaduanSelesai: number;
  persentaseSelesai: number;
  kanalUtama: string;
  waktuRataRataPenyelesaian: string;
  topIsu: string;
}

export interface SkmHasilSurvey {
  id: number;
  tahun: string;
  unitUsaha: string;
  kategori: string;
  nilai: number;
  persentase: number;
  keterangan: string;
}

export interface PenyelesaianBluItem {
  id: string;
  entitasPengawas: string;
  datasetNo: string;
  rekomendasiTotal: number;
  rekomendasiSelesai: number;
  rekomendasiProses: number;
  persentasePenyelesaian: number;
  kategori: string;
  color: string;
}

export interface ModernisasiBluItem {
  id: string;
  semester: string;
  tahun: string;
  inisiatif: string;
  target: number;
  capaian: number;
  persentase: number;
  status: 'Tuntas' | 'Sesuai Target' | 'Dalam Perbaikan';
  detail: string;
}

export interface PiagamRisikoItem {
  nomorPiagam: string;
  unitKerja: string;
  sasaranOrganisasi: string;
  kejadianRisiko: string;
  besaranRisikoAwalTahun: number; // Skala 1 - 25
  besaranRisikoAkhirTahun: number; // Skala 1 - 25
  levelAwal: 'Sangat Tinggi' | 'Tinggi' | 'Sedang' | 'Rendah';
  levelAkhir: 'Sangat Tinggi' | 'Tinggi' | 'Sedang' | 'Rendah';
  mitigasiUtama: string;
  statusMitigasi: 'Efektif' | 'Terkendali' | 'Dalam Pemantauan';
}

export interface PekpppItem {
  id: string;
  tahun: string;
  unitKerja: string;
  capaianIndeks: number; // Skala 1.00 - 5.00
  kategori: string; // "A (Pelayanan Prima)", "A- (Sangat Baik)", "B (Baik)"
  predikat: string;
}
