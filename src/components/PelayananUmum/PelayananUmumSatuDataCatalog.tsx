import React, { useState } from 'react';
import {
  Database,
  Search,
  Filter,
  Download,
  Stethoscope,
  Shield,
  Droplets,
  ExternalLink,
  Layers,
  FileSpreadsheet,
} from 'lucide-react';

interface DatasetItem {
  id: number;
  unit: 'bu-rumah-sakit' | 'dit-pam-aset' | 'bu-spam-fasling';
  unitName: string;
  nomorHalPdf: string;
  namaData: string;
  periode: string;
  sifatData: 'Terbuka' | 'Terbatas' | 'Tertutup';
  atribut: string[];
}

const SATU_DATA_CATALOG_LIST: DatasetItem[] = [
  // DITPAM (Hal 17-19)
  {
    id: 1,
    unit: 'dit-pam-aset',
    unitName: 'Dit. Pengamanan Aset',
    nomorHalPdf: 'Hal 17',
    namaData: 'Data Penertiban Bangunan Liar (1.030 Entri Terdata)',
    periode: 'Persemester',
    sifatData: 'Tertutup',
    atribut: ['Nama Pemilik', 'Pekerjaan', 'Jenis Bangunan', 'Nomor SP', 'Alamat/Lokasi', 'Luas Lahan', 'Keterangan'],
  },
  {
    id: 2,
    unit: 'dit-pam-aset',
    unitName: 'Dit. Pengamanan Aset',
    nomorHalPdf: 'Hal 17',
    namaData: 'Data Personil Bersertifikasi Khusus',
    periode: 'Persemester',
    sifatData: 'Terbuka',
    atribut: ['Status Kepegawaian', 'Jenis Sertifikasi Khusus', 'Jumlah Personil', 'Subdit/Seksi', 'Keterangan'],
  },
  {
    id: 3,
    unit: 'dit-pam-aset',
    unitName: 'Dit. Pengamanan Aset',
    nomorHalPdf: 'Hal 17',
    namaData: 'Data Distribusi Personil Pengamanan Obvit & Kawasan',
    periode: 'Persemester',
    sifatData: 'Terbuka',
    atribut: ['Penempatan Pos', 'Kekuatan Personil', 'Status Pegawai', 'Shift', 'Lokasi Pos'],
  },
  {
    id: 4,
    unit: 'dit-pam-aset',
    unitName: 'Dit. Pengamanan Aset',
    nomorHalPdf: 'Hal 18',
    namaData: 'Rekapitulasi Pengecekan Sistem Proteksi Kebakaran',
    periode: 'Persemester',
    sifatData: 'Tertutup',
    atribut: ['Lokasi Gedung', 'Jenis Alat Proteksi', 'Kondisi Kelayakan', 'Rekomendasi Perbaikan'],
  },
  {
    id: 6,
    unit: 'dit-pam-aset',
    unitName: 'Dit. Pengamanan Aset',
    nomorHalPdf: 'Hal 18',
    namaData: 'Rekapitulasi Kejadian Bencana Alam & Tanggap Darurat',
    periode: 'Persemester',
    sifatData: 'Terbuka',
    atribut: ['Tanggal Kejadian', 'Jenis Bencana', 'Uraian Kejadian', 'Lokasi', 'Personil Ditpam Dikerahkan', 'Korban/Kerugian'],
  },
  {
    id: 7,
    unit: 'dit-pam-aset',
    unitName: 'Dit. Pengamanan Aset',
    nomorHalPdf: 'Hal 18',
    namaData: 'Rekapitulasi Pengamanan Unjuk Rasa & Kamtibmas',
    periode: 'Persemester',
    sifatData: 'Terbuka',
    atribut: ['Tanggal', 'Lokasi Unjuk Rasa', 'Elemen Massa/Aliansi', 'Jumlah Peserta', 'Tuntutan Pokok', 'Situasi Akhir'],
  },
  {
    id: 10,
    unit: 'dit-pam-aset',
    unitName: 'Dit. Pengamanan Aset',
    nomorHalPdf: 'Hal 19',
    namaData: 'Data Penindakan Pelanggaran Kawasan Aset & Hutan Lindung',
    periode: 'Persemester',
    sifatData: 'Tertutup',
    atribut: ['Nama Pelanggar', 'Jenis Kegiatan Ilegal', 'Lokasi DTA/Hutan', 'Luas Terdampak', 'Tindakan Penegakan'],
  },
  {
    id: 12,
    unit: 'dit-pam-aset',
    unitName: 'Dit. Pengamanan Aset',
    nomorHalPdf: 'Hal 19',
    namaData: 'Kegiatan Pengamanan Lingkungan, Hutan Lindung & Waduk',
    periode: 'Persemester',
    sifatData: 'Tertutup',
    atribut: ['Subdit Pelaksana', 'Jenis Kegiatan Patroli', 'Lokasi Perimeter', 'Hasil Temuan Lapangan'],
  },

  // BU RUMAH SAKIT (Hal 19-21)
  {
    id: 13,
    unit: 'bu-rumah-sakit',
    unitName: 'BU Rumah Sakit (RSBP)',
    nomorHalPdf: 'Hal 19',
    namaData: 'Indeks Kepuasan Masyarakat (IKM) Layanan RSBP Batam',
    periode: 'Pertahun',
    sifatData: 'Terbuka',
    atribut: ['Tahun Survei', 'Indikator Mutu Pelayanan', 'Kategori Mutu (A/B/C)', 'Nilai Rata-rata Unsur'],
  },
  {
    id: 14,
    unit: 'bu-rumah-sakit',
    unitName: 'BU Rumah Sakit (RSBP)',
    nomorHalPdf: 'Hal 19',
    namaData: 'Realisasi Penerimaan PNBP Badan Usaha Rumah Sakit',
    periode: 'Pertahun',
    sifatData: 'Tertutup',
    atribut: ['Tahun Anggaran', 'Target PNBP Rumah Sakit', 'Realisasi PNBP Rumah Sakit', 'Persentase Capaian'],
  },
  {
    id: 15,
    unit: 'bu-rumah-sakit',
    unitName: 'BU Rumah Sakit (RSBP)',
    nomorHalPdf: 'Hal 20',
    namaData: 'Rasio Penerimaan terhadap Pengeluaran (Cost Recovery Rate)',
    periode: 'Pertahun',
    sifatData: 'Tertutup',
    atribut: ['Nilai Seluruh Belanja BLU', 'Nilai Pendapatan Operasional', 'Total Rasio Kemandirian Biaya'],
  },
  {
    id: 16,
    unit: 'bu-rumah-sakit',
    unitName: 'BU Rumah Sakit (RSBP)',
    nomorHalPdf: 'Hal 20',
    namaData: 'Jumlah Kasus Penyakit Terbanyak (Top 10 Morbiditas)',
    periode: 'Perbulan',
    sifatData: 'Terbuka',
    atribut: ['Jenis Rawat', 'Nama Penyakit Terbanyak', 'Kode ICD-10', 'Jumlah Kasus Baru', 'Jumlah Kasus Lama'],
  },
  {
    id: 17,
    unit: 'bu-rumah-sakit',
    unitName: 'BU Rumah Sakit (RSBP)',
    nomorHalPdf: 'Hal 20',
    namaData: 'Jumlah Kunjungan Pasien Rawat Jalan, Inap & IGD',
    periode: 'Perbulan',
    sifatData: 'Terbuka',
    atribut: ['Bagian/Instalasi', 'Jenis Kunjungan', 'Cara Bayar (BPJS, Umum, Asuransi)', 'Jumlah Pasien'],
  },
  {
    id: 21,
    unit: 'bu-rumah-sakit',
    unitName: 'BU Rumah Sakit (RSBP)',
    nomorHalPdf: 'Hal 21',
    namaData: 'Nilai Indikator Efisiensi Rumah Sakit (Barber Johnson)',
    periode: 'Perbulan',
    sifatData: 'Terbuka',
    atribut: ['BOR (%)', 'ALOS (Hari)', 'TOI (Hari)', 'BTO (Kali)', 'GDR (Permil)', 'NDR (Permil)'],
  },
  {
    id: 26,
    unit: 'bu-rumah-sakit',
    unitName: 'BU Rumah Sakit (RSBP)',
    nomorHalPdf: 'Hal 21',
    namaData: 'Daftar Mitra Tenant Penyewa Ruangan & Fasilitas Medis',
    periode: 'Pertahun',
    sifatData: 'Tertutup',
    atribut: ['Nama Penyewa/Tenant', 'Nomor PKS Kontrak', 'Luas Ruangan M2', 'Nilai Sewa Tahunan', 'Masa Berlaku'],
  },
  {
    id: 29,
    unit: 'bu-rumah-sakit',
    unitName: 'BU Rumah Sakit (RSBP)',
    nomorHalPdf: 'Hal 21',
    namaData: 'Rekapitulasi Peresepan Obat Generik vs Non Generik',
    periode: 'Perbulan',
    sifatData: 'Tertutup',
    atribut: ['Golongan Obat', 'Rawat Jalan', 'Rawat Inap', 'Instalasi Gawat Darurat', 'Rasio Resep Generik'],
  },

  // BU SPAM, FASILITAS & LINGKUNGAN (Hal 28-37)
  {
    id: 31,
    unit: 'bu-spam-fasling',
    unitName: 'BU SPAM Fasling',
    nomorHalPdf: 'Hal 28',
    namaData: 'Persentase Pemakaian & Alokasi Air Baku Batam',
    periode: 'Persemester',
    sifatData: 'Tertutup',
    atribut: ['Nama WTP', 'Volume Pemakaian M3', 'Periode Rekapitulasi', 'Status Saldo Alokasi'],
  },
  {
    id: 32,
    unit: 'bu-spam-fasling',
    unitName: 'BU SPAM Fasling',
    nomorHalPdf: 'Hal 28',
    namaData: 'Kapasitas Produksi Instalasi Pengolahan Air Bersih (WTP)',
    periode: 'Perbulan',
    sifatData: 'Terbuka',
    atribut: ['Nama WTP (Duriangkang, Muka Kuning, Sei Harapan, dll)', 'Kapasitas Terpasang (L/dtk)', 'Output Aktual', 'Teknologi Filtrasi'],
  },
  {
    id: 36,
    unit: 'bu-spam-fasling',
    unitName: 'BU SPAM Fasling',
    nomorHalPdf: 'Hal 29',
    namaData: 'Peta Jaringan & Batas Wilayah 23 District Meter Zone (DMZ)',
    periode: 'Jika Update',
    sifatData: 'Terbatas',
    atribut: ['Nomor DMZ (1 s.d 23)', 'Nama Kawasan Pelayanan', 'Titik Koordinat GIS', 'Tekanan Rata-rata Bar'],
  },
  {
    id: 41,
    unit: 'bu-spam-fasling',
    unitName: 'BU SPAM Fasling',
    nomorHalPdf: 'Hal 30',
    namaData: 'Pass Masuk Kawasan Pengelolaan Limbah Industri B3 (KPLI)',
    periode: 'Perbulan',
    sifatData: 'Tertutup',
    atribut: ['Nama Perusahaan Pengirim', 'Plat Kendaraan Angkut', 'Manifest Limbah B3', 'Tonase', 'Jenis Bahan'],
  },
  {
    id: 45,
    unit: 'bu-spam-fasling',
    unitName: 'BU SPAM Fasling',
    nomorHalPdf: 'Hal 31',
    namaData: 'Kunjungan Wisata Taman Rusa Sekupang & Taman Kolam',
    periode: 'Pertahun',
    sifatData: 'Terbuka',
    atribut: ['Jumlah Pengunjung Dewasa/Anak', 'Jumlah Kendaraan', 'Penerimaan Tiket Masuk', 'Pemanfaatan Event'],
  },
  {
    id: 55,
    unit: 'bu-spam-fasling',
    unitName: 'BU SPAM Fasling',
    nomorHalPdf: 'Hal 33',
    namaData: 'Data Hunian & Penyewaan Kamar Rusunawa BP Batam (32 Twin Block)',
    periode: 'Perbulan',
    sifatData: 'Terbuka',
    atribut: ['Nama Rusun (Batu Ampar, Muka Kuning, Sekupang, Kabil)', 'Twin Block', 'Nomor Kamar', 'Nama Pekerja', 'Nominal Sewa'],
  },
  {
    id: 67,
    unit: 'bu-spam-fasling',
    unitName: 'BU SPAM Fasling',
    nomorHalPdf: 'Hal 35',
    namaData: 'Kapasitas Tampung Waduk & Daerah Tangkapan Air (DTA)',
    periode: 'Jika Update',
    sifatData: 'Terbuka',
    atribut: ['Nama Waduk (6 Waduk Utama)', 'Daya Tampung Juta M3', 'Luas Permukaan Waduk Ha', 'Elevasi Muka Air Baku'],
  },
  {
    id: 100,
    unit: 'bu-spam-fasling',
    unitName: 'BU SPAM Fasling',
    nomorHalPdf: 'Hal 37',
    namaData: 'Rekapitulasi Non-Revenue Water (Tingkat Kehilangan Air Bersih)',
    periode: 'Pertriwulan',
    sifatData: 'Terbuka',
    atribut: ['Persentase NRW per DMZ', 'Volume Produksi Air Curah M3', 'Volume Tagih Pelanggan M3', 'Kebocoran Fisik'],
  },
];

export const PelayananUmumSatuDataCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [unitFilter, setUnitFilter] = useState<string>('ALL');
  const [sifatFilter, setSifatFilter] = useState<string>('ALL');

  const filtered = SATU_DATA_CATALOG_LIST.filter((item) => {
    const matchUnit = unitFilter === 'ALL' || item.unit === unitFilter;
    const matchSifat = sifatFilter === 'ALL' || item.sifatData === sifatFilter;
    const matchSearch =
      item.namaData.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nomorHalPdf.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.atribut.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchUnit && matchSifat && matchSearch;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 p-4 sm:p-5 space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600" />
            <span>KATALOG ATRIBUT SATU DATA BP BATAM (121 DATASET TERINTEGRASI)</span>
          </h2>
          <p className="text-[11px] text-slate-400">
            Sumber acuan dokumen resmi Buku Atribut Daftar Data Satu Data BP Batam (Hal 17-21, 28-37)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Total {filtered.length} Dataset Ditampilkan
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          {/* Unit Filter */}
          <select
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="ALL">Semua Satker (3 Satker)</option>
            <option value="bu-rumah-sakit">Badan Usaha Rumah Sakit (Hal 19-21)</option>
            <option value="dit-pam-aset">Dit. Pengamanan Aset (Hal 17-19)</option>
            <option value="bu-spam-fasling">BU SPAM Fasling (Hal 28-37)</option>
          </select>

          {/* Sifat Data */}
          <select
            value={sifatFilter}
            onChange={(e) => setSifatFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="ALL">Semua Sifat Data</option>
            <option value="Terbuka">Sifat: Terbuka</option>
            <option value="Terbatas">Sifat: Terbatas</option>
            <option value="Tertutup">Sifat: Tertutup</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari dataset, atribut..."
            className="w-full bg-white text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Dataset Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] font-mono sticky top-0">
              <tr>
                <th className="py-2.5 px-3">No Ref</th>
                <th className="py-2.5 px-3">Satker Pelaksana</th>
                <th className="py-2.5 px-3">Buku Satu Data</th>
                <th className="py-2.5 px-3">Nama Dataset Resmi</th>
                <th className="py-2.5 px-3">Periode</th>
                <th className="py-2.5 px-3">Sifat Data</th>
                <th className="py-2.5 px-3">Kunci Atribut Data (Kolom)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((ds) => (
                <tr key={ds.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-500">
                    DS #{ds.id}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">
                    {ds.unitName}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-blue-600">
                    {ds.nomorHalPdf}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-900">
                    {ds.namaData}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                    {ds.periode}
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        ds.sifatData === 'Terbuka'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : ds.sifatData === 'Terbatas'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {ds.sifatData}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex flex-wrap gap-1 max-w-sm">
                      {ds.atribut.map((a, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
