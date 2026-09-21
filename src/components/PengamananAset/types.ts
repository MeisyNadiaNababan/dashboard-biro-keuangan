// Types definition for Direktorat Pengamanan Aset dan Kawasan (Ditpam BP Batam)
// Based on Satu Data BP Batam (Dataset No. 1, 3, 6, 7, 9, 10, 12)

export interface BangunanLiarRecord {
  id: number;
  tanggal: string;
  semester: number;
  tahun: number;
  lokasi: string;
  swp: string;
  jenisBangunan: string;
  lamaMenghuni: string;
  caraMendapatkanLokasi: string;
  jumlah: number;
  luasM2: number;
  statusPenertiban: 'Ditegur (SP 1-3)' | 'Ditertibkan' | 'Relokasi Sukarela' | 'Monitoring';
}

export interface PersonilPengamananRecord {
  id: string;
  subdit: string;
  tugasPokok: string;
  jumlahPersonil: number;
  statusKesiapsiagaan: 'Siaga 1' | 'Siaga 2' | 'Rutin Operasional';
  poskoUtama: string;
  armadaPatroli: number;
  persentaseKesiapan: number;
}

export interface PengamananLingkunganObvitRecord {
  id: string;
  namaObjekVital: string;
  kategori: 'Waduk & DTA Air Baku' | 'Kawasan Hutan Lindung' | 'Infrastruktur Transportasi' | 'Gedung Pemerintahan' | 'Kawasan Industri & KEK';
  lokasi: string;
  totalKegiatanPengamanan: number;
  personilTerlibat: number;
  statusKondisi: 'Aman Terkendali' | 'Pengawasan Khusus' | 'Siaga Penertiban';
  titikPosko: number;
  patroliPerHari: number;
}

export interface PenindakanKawasanAsetRecord {
  id: string;
  lokasiAset: string;
  swp: string;
  luasPenindakanHa: number;
  luasM2: number;
  jenisAset: 'Buffer Zone Waduk' | 'Hutan Lindung / Tangkapan Air' | 'ROW Jalan Protokol' | 'Lahan Alokasi Strategis';
  tahun: number;
  semester: number;
  statusPenindakan: 'Selesai Disterilisasi' | 'Dalam Proses Penertiban' | 'Pemasangan Plang BP Batam';
  potensiKerugianDiamankanMiliar: number;
}

export interface UnjukRasaRecord {
  id: number;
  tanggal: string;
  semester: number;
  tahun: number;
  lokasi: string;
  aliansiMasyarakat: string;
  permasalahan: string;
  jumlahPersonil: number;
  estimasiMassa: number;
  statusKeamanan: 'Kondusif' | 'Negosiasi Tertib' | 'Pengamanan Ketat';
}

export interface BencanaAlamRecord {
  id: number;
  jenisKegiatan: string;
  kategoriBencana: 'Kebakaran Hutan & Lahan' | 'Pohon Tumbang' | 'Longsor Tanggul' | 'Banjir & Genangan' | 'Penyelamatan Air';
  lokasi: string;
  tanggal: string;
  semester: number;
  tahun: number;
  jumlahKejadian: number;
  personilRescue: number;
  statusPenanganan: 'Selesai Ditangani' | 'Mitigasi Lanjutan';
  dampak: string;
}

export interface PenertibanRutinRecord {
  id: number;
  jenisKegiatan: string;
  objekPenertiban: string;
  kategori: 'Bangunan Liar' | 'Waduk & Air Baku' | 'Tanam Tumbuh & Kebun' | 'Illegal Logging' | 'Tambang Pasir Ilegal' | 'Aksi Massa';
  tanggal: string;
  semester: number;
  tahun: number;
  jumlah: number;
  satuan: string;
  lokasi: string;
}

export interface PengamananFilterState {
  tahun: string;
  semester: string;
  lokasiSektor: string;
  jenisObjek: string;
  searchQuery: string;
}
