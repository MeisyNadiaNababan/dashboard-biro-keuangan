export interface SistemMeritAspect {
  id: string;
  kodeAspek: string;
  nama: string; // Komponen Penilaian
  bobotPersen: number; // Bobot %
  nilaiMaks: number; // Nilai Maksimal Aspek
  nilaiAspek: number; // Nilai Aspek (raw)
  indeksAspek: number; // Nilai Aspek / Nilai Maks Aspek
  statusPemenuhan: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang';
  deskripsiRingkas: string; // Penjelasan ramah orang awam
  poinKunci: string[];
}

export interface SistemMeritDatasetRow {
  TAHUN: number;
  NILAI_PERENCANAAN_KEBUTUHAN: number;
  NILAI_PENGADAAN: number;
  NILAI_PENGEMBANGAN_KARIR: number;
  NILAI_PROMOSI_DAN_MUTASI: number;
  NILAI_MANAJEMEN_KINERJA: number;
  NILAI_PENGGAJIAN_PENGHARGAAN_DISIPLIN: number;
  NILAI_PERLINDUNGAN_DAN_PELAYANAN: number;
  NILAI_SISTEM_INFORMASI: number;
  INDEKS_PERENCANAAN_KEBUTUHAN: number;
  INDEKS_PENGADAAN: number;
  INDEKS_PENGEMBANGAN_KARIR: number;
  INDEKS_PROMOSI_DAN_MUTASI: number;
  INDEKS_MANAJEMEN_KINERJA: number;
  INDEKS_PENGGAJIAN_PENGHARGAAN_DISIPLIN: number;
  INDEKS_PERLINDUNGAN_DAN_PELAYANAN: number;
  INDEKS_SISTEM_INFORMASI: number;
  INDEKS_SISTEM_MERIT: number;
  TOTAL_NILAI_MERIT: number;
  STATUS_PEMENUHAN: string;
  KATEGORI_PREDIKAT: 'Kategori IV (Sangat Baik)' | 'Kategori III (Baik)' | 'Kategori II (Kurang)' | 'Kategori I (Buruk)';
}

export interface PegawaiGenderData {
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  jumlah: number;
  persentase: number;
  rataRataUsia: number;
}

export interface PegawaiStatusData {
  id: string;
  statusPegawai: string;
  jumlahPegawai: number;
  persentase: number;
  warna: string;
  deskripsi: string;
}

export interface PegawaiPendidikanData {
  id: string;
  tingkatPendidikan: string;
  jumlahPegawai: number;
  persentase: number;
  warna: string;
  golonganDominan: string;
}

export interface SdmYearData {
  tahun: number;
  totalPegawai: number;
  gender: {
    lakiLaki: PegawaiGenderData;
    perempuan: PegawaiGenderData;
  };
  statusKepegawaian: PegawaiStatusData[];
  pendidikan: PegawaiPendidikanData[];
  sistemMerit: {
    aspekList: SistemMeritAspect[];
    datasetRow: SistemMeritDatasetRow;
  };
}

export interface SdmFilterState {
  tahun: number;
  genderFilter: 'all' | 'Laki-laki' | 'Perempuan';
  statusFilter: string;
  searchQuery: string;
}
