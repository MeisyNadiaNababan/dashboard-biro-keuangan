// Definisi Tipe Data & Interface untuk Modul Pembangunan Infrastruktur
// Mengacu pada Atribut Dokumen "Satu Data BP Batam" (Halaman 48 - 51)

export type StatusKurvaSType = 'Ahead' | 'On Schedule' | 'Waspada' | 'Kritis (SCM)' | 'Selesai';

export interface InfrastrukturFilterState {
  tahun: string;
  jenisPekerjaan: string;
  wilayah: string;
  statusProgres: string;
  searchQuery: string;
}

// Dataset No. 6: Pembangunan Infrastruktur (Hal. 50-51)
// Atribut: SRNSOS, METADATA, SRS_ID, OBJECTID, NAMOBJ, REMARK, FCODE, KD_ANGG, TGL_MUL, TGL_SEL, KTGR_PEK, JNS_PEK, KLAS_PEK, NM_PPK, NPAGU_F, NHPS_S, NKON_S, SUPERVISI, VOL_PEK, PRGRS_PEK, KENDALA, SUBDIT
export interface ProyekInfrastrukturItem {
  id: string;
  kodePaket?: string;
  kodeAnggaran?: string; // KD_ANGG
  namaProyek?: string; // NAMOBJ
  namaPekerjaan?: string;
  lokasi?: string;
  kategoriPekerjaan?: string; // KTGR_PEK
  jenisPekerjaan: string; // JNS_PEK
  klasifikasiPekerjaan?: string; // KLAS_PEK
  namaPPK?: string; // NM_PPK
  nilaiPagu?: number; // NPAGU_F
  paguAnggaran?: number;
  tahunAnggaran?: number;
  sumberDana?: string;
  waktuPelaksanaanHari?: number;
  nilaiHPS?: number; // NHPS_S
  nilaiKontrak: number; // NKON_S
  kontraktorPelaksana?: string; // KONTRAKTOR
  kontraktor?: string;
  konsultanSupervisi?: string; // SUPERVISI
  konsultanPengawas?: string;
  volumePekerjaan: string; // VOL_PEK
  progresFisikPersen?: number; // PRGRS_PEK
  progresRencana?: number;
  progresRealisasi?: number;
  progresKeuangan?: number;
  kendalaPermasalahan?: string; // KENDALA
  keterangan?: string;
  subditPengelola?: string; // SUBDIT
  wilayah: string;
  targetSelesai?: string; // TGL_SEL
  statusProgres: StatusKurvaSType;
  rencanaPersen?: number;
  deviasi: number;
  koordinat: { x: number; y: number; lat?: number; lng?: number };
}

// Dataset No. 1: Perizinan Pemanfaatan ROW Utilitas (Hal. 48)
// Atribut: TAHUN TERBIT, NOMOR SURAT, TANGGAL SURAT, NAMA PEMOHON, LOKASI KEGIATAN, JENIS UTILITAS, GALIAN TERBUKA, GALIAN CROSSING, TOTAL GALIAN, TMT MULAI IZIN, TMT AKHIR IZIN, KODE TRANSAKSI
export interface RowUtilitasItem {
  id: string;
  tahunTerbit?: number; // TAHUN TERBIT
  nomorSurat?: string; // NOMOR SURAT
  tanggalSurat?: string; // TANGGAL SURAT
  namaPemohon: string; // NAMA PEMOHON
  lokasiKegiatan?: string; // LOKASI KEGIATAN
  jenisUtilitas: string; // JENIS UTILITAS
  galianTerbukaMeter?: number; // GALIAN TERBUKA (meter)
  galianCrossingMeter?: number; // GALIAN CROSSING (meter)
  totalGalianMeter?: number; // TOTAL GALIAN (meter)
  tmtMulaiIzin?: string; // TMT MULAI IZIN
  tmtAkhirIzin?: string; // TMT AKHIR IZIN
  kodeTransaksi?: string; // KODE TRANSAKSI
  wilayah: string;
  statusIzin: string;
  // Compatibility aliases
  nomorIzin: string;
  tanggalTerbit: string;
  lokasiRuasJalan: string;
  panjangGelaranMeter: number;
  kedalamanGalianMeter: number;
  masaBerlakuTahun: number;
}

// Dataset No. 2: Perizinan Pemanfaatan ROW Penghijauan (Hal. 48)
// Atribut: TAHUN TERBIT, NOMOR SURAT, TANGGAL SURAT, NAMA PEMOHON, NIB/NIK PEMOHON, LOKASI KEGIATAN, JENIS PENGHIJAUAN, LUAS PENGHIJAUAN, TMT MULAI IZIN, TMT AKHIR IZIN, KODE TRANSAKSI
export interface RowPenghijauanItem {
  id: string;
  tahunTerbit?: number; // TAHUN TERBIT
  nomorSurat?: string; // NOMOR SURAT
  tanggalSurat?: string; // TANGGAL SURAT
  namaPemohon: string; // NAMA PEMOHON
  nibNikPemohon?: string; // NIB/NIK PEMOHON
  lokasiKegiatan?: string; // LOKASI KEGIATAN
  jenisPenghijauan?: string; // JENIS PENGHIJAUAN
  luasPenghijauanM2?: number; // LUAS PENGHIJAUAN (m²)
  jumlahPohonDitanam: number;
  jenisTanaman: string;
  tmtMulaiIzin?: string; // TMT MULAI IZIN
  tmtAkhirIzin?: string; // TMT AKHIR IZIN
  kodeTransaksi?: string; // KODE TRANSAKSI
  wilayah: string;
  statusIzin: string;
  // Compatibility aliases
  nomorIzin: string;
  tanggalTerbit: string;
  kategoriPenghijauan: string;
  lokasiRuasJalan: string;
  luasAreaM2: number;
  masaBerlakuTahun: number;
}

// Dataset No. 3: Ruas Jaringan Jalan Eksisting (Hal. 48-49)
// Atribut: STARJL, SPCRJL, MATRJL, KLSRJL, AUTRJL, KONRJL, LOCRJL, LKSBSP, UTKRJL, FCODE, JPARJL, FGSRJL, MEDRJL, KLLRJL, LLHRRT, TOLRJL, SRS_ID, ARHRJL, LKSRTA, KPMSTR, JARRJL, VLCPRT, TGL_SK, NAMOBJ, JLNLYG, OBJECTID, LBRJLN, METADATA, WLYRJL, REMARK, LBRBHJ, SHAPE_LENG, LKONOF, RUAS, UTILITAS
export interface RuasJaringanJalanItem {
  id: string;
  kodeRuas: string; // RUAS
  namaRuasJalan: string; // NAMOBJ
  klasifikasiFungsi?: string; // KLSRJL
  materialJalan?: string; // MATRJL (Aspal AC-WC, Rigid Beton)
  statusJalan?: string; // STARJL (Jalan Khusus Kawasan Bebas Batam)
  panjangKm: number; // SHAPE_LENG (Km)
  lebarMeter: number; // LBRJLN (meter)
  lebarBahuJalanMeter?: number; // LBRBHJ (meter)
  jumlahLajur?: number;
  kondisiJalan?: string; // LKONOF
  persentaseMantap?: number;
  indeksIri?: number; // International Roughness Index (m/km)
  wilayah: string; // WLYRJL
  volumeLaluLintasHarian?: number; // LLHRRT (LHR kendaraan/hari)
  utilitasTerpasang?: string; // UTILITAS
  tahunPeningkatanTerakhir?: number;
  // Compatibility aliases
  nomorRuas?: string;
  klasifikasiJalan?: string;
  tipePerkerasan?: string;
  kelengkapanUtilitas?: string;
  kondisiMantapKm?: number;
  kondisiTidakMantapKm?: number;
}

// Dataset No. 4: Laporan Progres Pekerjaan Konstruksi Tahun Berjalan (Hal. 49-50)
// Atribut: SRNSOS, METADATA, SRS_ID, OBJECTID, NAMOBJ, REMARK, FCODE, KD_ANGG, TGL_MUL, TGL_SEL, KTGR_PEK, JNS_PEK, KLAS_PEK, NM_PPK, NPAGU_F, NHPS_S, NKON_S, SUPERVISI, VOL_PEK, PRGRS_PEK, KENDALA, SUBDIT
export interface LaporanProgresKonstruksiItem {
  id: string;
  kodeAnggaran?: string; // KD_ANGG
  nomorKontrak: string;
  namaPaket: string; // NAMOBJ
  kategoriPekerjaan?: string; // KTGR_PEK
  jenisPekerjaan?: string; // JNS_PEK
  klasifikasiPekerjaan?: string; // KLAS_PEK
  satkerPPK: string; // NM_PPK
  kontraktor: string; // KONTRAKTOR
  konsultanSupervisi: string; // SUPERVISI
  nilaiPaguMiliar?: number; // NPAGU_F
  nilaiKontrakMiliar: number; // NKON_S
  nilaiHpsMiliar?: number; // NHPS_S
  tanggalMulai: string; // TGL_MUL
  targetSelesai: string; // TGL_SEL
  durasiHari: number;
  sisaHari: number;
  rencanaFisikPersen: number; // Target
  realisasiFisikPersen: number; // PRGRS_PEK (Realisasi)
  deviasiFisikPersen: number;
  realisasiKeuanganPersen: number;
  statusKurvaS: StatusKurvaSType;
  volumePekerjaan?: string; // VOL_PEK
  subditPelaksana?: string; // SUBDIT
  isuKendala?: string; // KENDALA
  tindakLanjut?: string;
  gapFisikKeuangan?: number;
  tingkatKritis: 'Normal' | 'Aman' | 'Waspada' | 'Show Cause Meeting (SCM-1)' | 'Show Cause Meeting (SCM-2)' | 'SCM 1' | 'SCM 2' | 'Rekomendasi Pemutusan';
}

// Dataset No. 5: Pematangan Lahan & Kawasan Industri BSW (Hal. 50)
// Atribut: KD_ANGG, TGL_MUL, TGL_SEL, KTGR_PEK, JNS_PEK, KLAS_PEK, NM_PPK, NPAGU_F, NHPS_S, NKON_S, KONTRAKTOR, SUPERVISI, VOL_PEK, PRGRS_PEK, KENDALA, SUBDIT
export interface PematanganTanahItem {
  id: string;
  kodeAnggaran: string; // KD_ANGG
  namaLokasiBsw: string; // NAMOBJ
  wilayahBsw: string;
  luasAreaHektar: number;
  kategoriPekerjaan?: string;
  jenisPekerjaan?: string;
  volumePekerjaan?: string;
  volumeCutFillM3: number; // VOL_PEK
  namaPPK: string; // NM_PPK
  kontraktor: string; // KONTRAKTOR
  konsultanSupervisi: string; // SUPERVISI
  nilaiPaguMiliar?: number; // NPAGU_F
  nilaiPaguFisikMiliar?: number;
  nilaiHpsMiliar: number; // NHPS_S
  nilaiKontrakMiliar: number; // NKON_S
  progresRencanaPersen: number;
  progresRealisasiPersen: number; // PRGRS_PEK
  deviasiPersen?: number;
  statusProgres: StatusKurvaSType;
  kendala: string; // KENDALA
  tanggalMulai: string; // TGL_MUL
  tanggalSelesai: string; // TGL_SEL
  subdit?: string;
}

// Rekapitulasi Jenis Pekerjaan (JNS_PEK)
export interface RekapJenisPekerjaan {
  jenisPekerjaan: string;
  singkatan: string;
  jumlahProyek: number;
  totalPagu: number;
  persentase: number;
  warna: string;
  panjangVolume: string;
  rataRataProgres: number;
}
