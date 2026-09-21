import React, { useState } from 'react';
import {
  BookOpen,
  Database,
  Code2,
  Table as TableIcon,
  Search,
  ExternalLink,
  Layers,
  FileSpreadsheet,
  Globe2,
  Lock,
} from 'lucide-react';

interface DatasetMetadata {
  no: number;
  namaData: string;
  jenisData: string;
  periode: string;
  sifat: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  atribut: string[];
  rumusTableau: string;
  penjelasanBisnis: string;
  halamanPdf: string;
}

const DATASET_KATALOG_LLB: DatasetMetadata[] = [
  {
    no: 1,
    namaData: 'NAMA IZIN DOKUMEN PERSYARATAN DAN ALUR PROSES PERMOHONAN LAYANAN/PERIZINAN',
    jenisData: 'DATA STATISTIK',
    periode: 'JIKA UPDATE',
    sifat: 'TERBUKA',
    atribut: ['ID', 'URAIAN IZIN', 'PERSYARATAN'],
    rumusTableau: 'COUNTD([ID]) / TOTAL(COUNTD([ID]))',
    penjelasanBisnis:
      'Kamus master dokumen izin, alur tahapan permohonan melalui sistem IBOSS BP Batam, dan syarat administrasi bagi importir & eksportir di KPBPBB Batam.',
    halamanPdf: 'Halaman 8 (No. 1)',
  },
  {
    no: 2,
    namaData: 'DATA REALISASI KUOTA INDUK BARANG KONSUMSI',
    jenisData: 'DATA STATISTIK',
    periode: 'JIKA UPDATE',
    sifat: 'TERTUTUP',
    atribut: ['ID', 'KODE HS', 'KUOTA', 'SATUAN', 'NILAI', 'NO SK', 'TANGGAL SK'],
    rumusTableau:
      'Persentase Serapan = SUM([Realisasi]) / SUM([Kuota]) * 100\nSisa Kuota = SUM([Kuota]) - SUM([Realisasi])\nTotal Nilai Devisa = SUM([Nilai])',
    penjelasanBisnis:
      'Alokasi batas kuota impor komoditas pangan pokok strategis (beras, gula, daging, minyak) bebas bea masuk/PPN untuk menjamin ketersediaan pasokan dan stabilitas harga di Batam.',
    halamanPdf: 'Halaman 8 (No. 2)',
  },
  {
    no: 3,
    namaData:
      'REKAPITULASI PENERBITAN LAYANAN PERIZINAN LALU LINTAS BARANG (INDUSTRI DAN PERDAGANGAN)',
    jenisData: 'DATA STATISTIK',
    periode: 'JIKA UPDATE',
    sifat: 'TERBUKA',
    atribut: [
      'BAGIAN',
      'TAHUN',
      'BULAN',
      'TANGGAL REKAP AWAL',
      'TANGGAL REKAP AKHIR',
      'JUMLAH TOTAL',
      'NAMA LAYANAN',
      'NPWP',
      'NIB',
      'URAILAYAN',
      'JENIS API',
      'JENIS USAHA',
      'NAMA PERUSAHAAN',
      'ALAMAT PEPRSH',
      'TGL DAFTAR',
      'NO PENDAFTARAN',
      'NO IJIN',
      'STATUS',
    ],
    rumusTableau: 'SUM([JUMLAH TOTAL]) grouped by [NAMA LAYANAN], [BAGIAN], [STATUS]',
    penjelasanBisnis:
      'Log registrasi seluruh perizinan lalu lintas barang sektor industri manufaktur dan perdagangan umum yang diproses dan diterbitkan secara resmi oleh BP Batam.',
    halamanPdf: 'Halaman 9 (No. 3)',
  },
  {
    no: 4,
    namaData: 'REKAPITULASI PENERBITAN LAYANAN IZIN USAHA KAWASAN',
    jenisData: 'DATA STATISTIK',
    periode: 'PERBULAN',
    sifat: 'TERBUKA',
    atribut: ['URAIAN IZIN USAHA KAWASAN', 'JUMLAH PENERBITAN PER BULAN'],
    rumusTableau: 'SUM([JUMLAH PENERBITAN PER BULAN]) grouped by [URAIAN IZIN USAHA KAWASAN]',
    penjelasanBisnis:
      'Rekap bulanan penerbitan Izin Usaha Kawasan (IUK) untuk pengembang kawasan industri, pengelola logistik terpadu, dan tenant kawasan berikat.',
    halamanPdf: 'Halaman 9 (No. 4)',
  },
  {
    no: 5,
    namaData: 'DATA KBLI PERUSAHAAN YANG MEMILIKI IZIN USAHA KAWASAN',
    jenisData: 'DATA STATISTIK',
    periode: 'PERBULAN',
    sifat: 'TERBATAS',
    atribut: ['NO', 'NAMA PERUSAHAAN', 'NO IZIN USAHA KAWASAN', 'ALAMAT', 'KBLI'],
    rumusTableau: 'COUNTD([NAMA PERUSAHAAN]) grouped by [KBLI], [ALAMAT]',
    penjelasanBisnis:
      'Klasifikasi Baku Lapangan Usaha Indonesia (KBLI) pelaku usaha yang beroperasi di dalam kawasan industri berizin resmi di wilayah kerja BP Batam.',
    halamanPdf: 'Halaman 9 (No. 5)',
  },
  {
    no: 6,
    namaData: 'REKAPITULASI PENERBITAN LAYANAN PERIZINAN PEMASUKAN BARANG',
    jenisData: 'DATA STATISTIK',
    periode: 'PERBULAN',
    sifat: 'TERBUKA',
    atribut: ['URAIAN IZIN PEMASUKAN BARANG', 'JUMLAH PENERBITAN PER BULAN'],
    rumusTableau: 'SUM([JUMLAH PENERBITAN PER BULAN]) grouped by [URAIAN IZIN PEMASUKAN BARANG]',
    penjelasanBisnis:
      'Volume bulanan penerbitan izin pemasukan bahan baku, barang modal mesin pabrik, dan penolong industri dari luar daerah pabean ke KPBPBB Batam.',
    halamanPdf: 'Halaman 9 (No. 6)',
  },
  {
    no: 7,
    namaData: 'REKAPITULASI PENERBITAN LAYANAN PERIZINAN PENGELUARAN BARANG',
    jenisData: 'DATA STATISTIK',
    periode: 'PERBULAN',
    sifat: 'TERBUKA',
    atribut: ['URAIAN IZIN PENGELUARAN BARANG', 'JUMLAH PENERBITAN PER BULAN'],
    rumusTableau: 'SUM([JUMLAH PENERBITAN PER BULAN]) grouped by [URAIAN IZIN PENGELUARAN BARANG]',
    penjelasanBisnis:
      'Volume bulanan penerbitan izin pengeluaran hasil olahan produksi, re-ekspor, dan sisa bahan baku/scrap industri ke luar daerah pabean (LDP/TLDDP).',
    halamanPdf: 'Halaman 9 (No. 7)',
  },
  {
    no: 8,
    namaData: 'PERSENTASE PELAYANAN LALU LINTAS BARANG PERDAGANGAN YANG SELESAI TEPAT WAKTU',
    jenisData: 'DATA STATISTIK',
    periode: 'PERBULAN',
    sifat: 'TERBUKA',
    atribut: [
      'NO',
      'URAIAN IZIN',
      'PERSENTASE LAYANAN TEPAT WAKTU',
      'RATA-RATA WAKTU PENYELESAIAN DOKUMEN (DALAM JAM)',
    ],
    rumusTableau:
      'SLA Tepat Waktu % = SUM([Dokumen Tepat Waktu]) / SUM([Total Dokumen]) * 100\nAVG([RATA-RATA WAKTU (JAM)])',
    penjelasanBisnis:
      'Indikator efisiensi pelayanan perizinan sektor perdagangan umum dan komoditas pangan, mengukur kepatuhan terhadap Service Level Agreement (SLA).',
    halamanPdf: 'Halaman 9 (No. 8)',
  },
  {
    no: 9,
    namaData: 'PERSENTASE PELAYANAN LALU LINTAS BARANG INDUSTRI YANG SELESAI TEPAT WAKTU',
    jenisData: 'DATA STATISTIK',
    periode: 'PERBULAN',
    sifat: 'TERBUKA',
    atribut: [
      'NO',
      'URAIAN IZIN',
      'PERSENTASE LAYANAN TEPAT WAKTU',
      'RATA-RATA WAKTU PENYELESAIAN DOKUMEN (DALAM JAM)',
    ],
    rumusTableau:
      'SLA Tepat Waktu % = SUM([Dokumen Tepat Waktu]) / SUM([Total Dokumen]) * 100\nAVG([RATA-RATA WAKTU (JAM)])',
    penjelasanBisnis:
      'Indikator kecepatan dan ketepatan penerbitan izin permohonan bahan baku & penolong manufaktur guna mendukung kelancaran rantai pasok industri di Batam.',
    halamanPdf: 'Halaman 9 (No. 9)',
  },
];

export const LlbKamusRumusView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedSifat, setSelectedSifat] = useState<string>('ALL');

  const filtered = DATASET_KATALOG_LLB.filter((d) => {
    const matchSearch =
      search === '' ||
      d.namaData.toLowerCase().includes(search.toLowerCase()) ||
      d.penjelasanBisnis.toLowerCase().includes(search.toLowerCase()) ||
      d.atribut.some((a) => a.toLowerCase().includes(search.toLowerCase()));
    const matchSifat = selectedSifat === 'ALL' || d.sifat === selectedSifat;
    return matchSearch && matchSifat;
  });

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 mb-5 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1F4E79] flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Kamus Data &amp; Rumus Indikator (Satu Data BP Batam)
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Direktorat Lalu Lintas Barang • 9 Dataset Resmi (Halaman 8 - 9 Dokumen PDF)
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedSifat}
            onChange={(e) => setSelectedSifat(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold outline-none cursor-pointer"
          >
            <option value="ALL">Semua Sifat Akses</option>
            <option value="TERBUKA">Terbuka (7 Dataset)</option>
            <option value="TERTUTUP">Tertutup (1 Dataset)</option>
            <option value="TERBATAS">Terbatas (1 Dataset)</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="my-3.5 relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari dataset, atribut kolom, atau rumus Tableau..."
          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#1F4E79] focus:bg-white"
        />
      </div>

      {/* Dataset Grid */}
      <div className="space-y-3.5">
        {filtered.map((item) => (
          <div
            key={item.no}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#1F4E79] transition-all shadow-2xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#1F4E79] text-white font-mono font-bold text-[10px]">
                    Dataset #{item.no}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.sifat === 'TERBUKA'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.sifat === 'TERBATAS'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {item.sifat}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-mono">
                    Periode: {item.periode}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.halamanPdf}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.namaData}</h4>
              </div>
            </div>

            <p className="text-[11.5px] text-slate-600 mb-2.5 leading-relaxed">
              {item.penjelasanBisnis}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
              {/* Atribut */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[10.5px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Atribut Kolom Database:
                </span>
                <div className="flex flex-wrap gap-1">
                  {item.atribut.map((attr, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-mono text-[10px]"
                    >
                      {attr}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rumus Tableau */}
              <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                <span className="text-[10.5px] font-bold text-blue-900 uppercase tracking-wider block mb-1">
                  Tableau Calculated Field &amp; Syntax:
                </span>
                <pre className="font-mono text-[10px] text-blue-950 whitespace-pre-wrap leading-tight">
                  {item.rumusTableau}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
