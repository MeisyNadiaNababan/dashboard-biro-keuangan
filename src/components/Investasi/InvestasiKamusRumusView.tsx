import React, { useState } from 'react';
import {
  BookOpen,
  Calculator,
  Database,
  Layers,
  CheckCircle2,
  FileText,
  Search,
  ExternalLink,
} from 'lucide-react';

interface DatasetMeta {
  no: number;
  namaData: string;
  jenisData: string;
  periodeData: string;
  sifatData: string;
  atributData: string[];
  formula: string;
  deskripsi: string;
}

const INVESTASI_DATASETS_CATALOG: DatasetMeta[] = [
  {
    no: 13,
    namaData: 'REALISASI INVESTASI',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTRIWULAN / TAHUNAN',
    sifatData: 'TERBUKA',
    atributData: ['TAHUN', 'TRIWULAN', 'SEKTOR', 'NEGARA ASAL', 'JENIS (PMA/PMDN)', 'TARGET INVESTASI', 'REALISASI INVESTASI', 'JUMLAH PROYEK', 'PENYERAPAN TENAGA KERJA'],
    formula: '% Capaian = (Total Realisasi Investasi / Total Target Investasi) × 100%',
    deskripsi: 'Memuat data target dan realisasi investasi di Batam yang dilaporkan melalui LKPM (Laporan Kegiatan Penanaman Modal) dan sistem perizinan OSS.',
  },
  {
    no: 10,
    namaData: 'JUMLAH KUNJUNGAN WEBSITE INVEST IN-BATAM',
    jenisData: 'DATA STATISTIK & TRAFFIC',
    periodeData: 'BULANAN / REAL-TIME',
    sifatData: 'TERBUKA',
    atributData: ['TAHUN', 'BULAN', 'JUMLAH KUNJUNGAN (HITS/SESSIONS)', 'PENGUNJUNG UNIK (USERS)', 'PAGEVIEWS', 'ASAL NEGARA PENGUNJUNG', 'HALAMAN TERPOPULER'],
    formula: 'Total Kunjungan = ∑ Kunjungan Bulanan (Sessions dari Portal investinbatam.bpbatam.go.id)',
    deskripsi: 'Data analitik lalu lintas kunjungan web investor global yang mengakses panduan investasi, peta kawasan industri, dan simulasi insentif fiskal Batam.',
  },
  {
    no: 14,
    namaData: 'MINAT INVESTASI HASIL KUNJUNGAN DAN PAMERAN DALAM DAN LUAR NEGERI',
    jenisData: 'DATA STATISTIK & ADMINISTRASI',
    periodeData: 'JIKA UPDATE / PER KEGIATAN',
    sifatData: 'TERTUTUP / TERBATAS',
    atributData: ['NAMA PERUSAHAAN', 'NEGARA ASAL', 'KATEGORI (DALAM/LUAR NEGERI)', 'SEKTOR INVESTASI', 'NILAI MINAT INVESTASI (RP)', 'NAMA PAMERAN/KEGIATAN', 'LOKASI KEGIATAN', 'STATUS MINAT'],
    formula: 'Total Minat = ∑ Jumlah Calon Investor yang menandatangani Letter of Intent (LoI) atau Project Inquiry',
    deskripsi: 'Pencatatan komitmen awal dan minat investor yang diperoleh dari partisipasi BP Batam pada expo internasional, temu usaha bisnis (business forum), dan diplomatic mission.',
  },
  {
    no: 6,
    namaData: 'INFRASTRUKTUR YANG AKAN DIBANGUN',
    jenisData: 'DATA TEKNIS & PERENCANAAN',
    periodeData: 'TAHUNAN / MULTI-YEAR',
    sifatData: 'TERBUKA',
    atributData: ['NAMA PROYEK INFRASTRUKTUR', 'TAHUN PELAKSANAAN', 'NILAI INVESTASI (RP)', 'LUAS AREA (HA)', 'LOKASI', 'SEKTOR', 'STATUS PERENCANAAN', 'SUMBER PENDANAAN'],
    formula: '∑ Nilai Investasi per Tahun & ∑ Luas Lahan (Ha) yang dialokasikan untuk pembangunan fisik strategis',
    deskripsi: 'Daftar proyek infrastruktur strategis publik dan kemitraan KPBU yang direncanakan untuk memperkuat konektivitas, logistik, dan daya saing industri Batam.',
  },
];

export const InvestasiKamusRumusView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = INVESTASI_DATASETS_CATALOG.filter((d) => {
    return (
      d.namaData.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.atributData.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div
      id="investasi-kamus-rumus-view"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden font-sans"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100/70 border border-blue-300/60 flex items-center justify-center text-blue-800 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              KAMUS RUMUS &amp; METADATA SATU DATA — DIREKTORAT INVESTASI
            </h2>
            <p className="text-[11px] text-slate-500">
              Katalog resmi standar data BP Batam (Dataset No. 13, 10, 14, dan 6) sesuai Perka Satu Data
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari dataset / atribut..."
            className="w-full pl-7 pr-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 font-sans"
          />
        </div>
      </div>

      {/* Dataset Cards List */}
      <div className="p-4 sm:p-5 space-y-4">
        {filtered.map((item) => (
          <div
            key={item.no}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-xs font-black font-mono bg-blue-600 text-white">
                  DATASET #{item.no}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">
                  {item.namaData}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {item.jenisData}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {item.periodeData}
                </span>
                <span
                  className={`px-2 py-0.5 rounded border ${
                    item.sifatData === 'TERBUKA'
                      ? 'bg-sky-50 text-sky-800 border-sky-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {item.sifatData}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {item.deskripsi}
            </p>

            {/* Formula box */}
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2 text-xs">
              <Calculator className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-700 mr-1.5">Formula Perhitungan / Agregasi:</span>
                <code className="font-mono text-blue-800 font-bold bg-white px-1.5 py-0.5 rounded border border-blue-200">
                  {item.formula}
                </code>
              </div>
            </div>

            {/* Atribut Data Chips */}
            <div>
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Daftar Atribut Data:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.atributData.map((attr, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[10.5px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
