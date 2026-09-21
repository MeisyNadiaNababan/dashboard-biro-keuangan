import React, { useState } from 'react';
import {
  BookOpen,
  FileCode2,
  Database,
  Search,
  CheckCircle2,
  Layers,
  Copy,
  Download,
  Filter,
  Ship,
  Anchor,
  HelpCircle,
} from 'lucide-react';

interface KamusDatasetItem {
  no: number;
  namaData: string;
  jenisData: string;
  periodeData: string;
  sifatData: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  atributData: string[];
}

const KATALOG_25_DATASET_KEPELABUHANAN: KamusDatasetItem[] = [
  {
    no: 1,
    namaData: 'Rekapitulasi Kegiatan Jasa Dermaga BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Per Bulan',
    sifatData: 'TERBUKA',
    atributData: ['PELABUHAN', 'JENIS PELAYANAN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'VOLUME', 'BULAN'],
  },
  {
    no: 2,
    namaData: 'Data Realisasi Belanja Direktorat Pengelolaan Kepelabuhanan',
    jenisData: 'Data Statistik',
    periodeData: 'Per Bulan',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL', 'BULAN', 'COA (CHART OF ACCOUNT)', 'MATA ANGGARAN', 'KETERANGAN', 'NILAI'],
  },
  {
    no: 3,
    namaData: 'Realisasi Penerimaan Negara Bukan Pajak (PNBP) Kepelabuhanan',
    jenisData: 'Data Statistik',
    periodeData: 'Per Tahun',
    sifatData: 'TERTUTUP',
    atributData: ['MATA UANG', 'JUMLAH', 'BULAN', 'TANGGAL', 'COA (CHART OF ACCOUNT)/JENIS LAYANAN', 'PERUSAHAAN', 'TERMINAL/SATKER'],
  },
  {
    no: 4,
    namaData: 'Daftar Dermaga yang Dikelola BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERBUKA',
    atributData: ['PELABUHAN', 'LETAK LINTANG UTARA', 'LETAK BUJUR TIMUR', 'DERMAGA', 'KEDALAMAN (MLWS)', 'PANJANG (M)', 'LEBAR (M2)', 'PERUNTUKAN', 'KAPASITAS (TOP M2)'],
  },
  {
    no: 5,
    namaData: 'Rekapitulasi Kunjungan Kapal Barang',
    jenisData: 'Data Statistik',
    periodeData: 'Per Bulan',
    sifatData: 'TERBUKA',
    atributData: ['PELABUHAN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'CALL KAPAL', 'GT KAPAL', 'TIPE KAPAL', 'CALL DALAM', 'CALL LUAR', 'GT DALAM', 'GT LUAR', 'TON DALAM', 'TON LUAR'],
  },
  {
    no: 6,
    namaData: 'Rekapitulasi Pass Kendaraan Pelabuhan Penumpang',
    jenisData: 'Data Statistik',
    periodeData: 'Per Bulan',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA PELABUHAN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'JENIS KENDARAAN (MOTOR, MOBIL, TRUK/BUS, TAKSI, TNI/POLRI)', 'STATUS PASS (HARIAN/LANGGANAN)', 'JUMLAH'],
  },
  {
    no: 7,
    namaData: 'Rekapitulasi Kunjungan Kapal Penumpang',
    jenisData: 'Data Statistik',
    periodeData: 'Per Bulan',
    sifatData: 'TERBUKA',
    atributData: ['PELABUHAN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'CALL KAPAL', 'GT KAPAL', 'NOTA JASA DMT', 'TIPE KAPAL', 'CALL DALAM', 'CALL LUAR', 'GT DALAM', 'GT LUAR'],
  },
  {
    no: 8,
    namaData: 'Jadwal Keberangkatan Kapal (Batam Maritime System - BMS)',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL REKAP', 'NAMA PERUSAHAAN/AGEN', 'JAM KEBERANGKATAN', 'TUJUAN/RUTE'],
  },
  {
    no: 9,
    namaData: 'Daftar Penyewa Fasilitas Pelabuhan',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL REKAP', 'NAMA PERUSAHAAN', 'LOKASI', 'LUASAN', 'PERUNTUKAN', 'MASA SEWA'],
  },
  {
    no: 10,
    namaData: 'Daftar Mitra KSO Kepelabuhanan',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA PERUSAHAAN', 'NAMA PERJANJIAN', 'NOMOR PERJANJIAN', 'TANGGAL PERJANJIAN', 'MASA WAKTU PERJANJIAN'],
  },
  {
    no: 11,
    namaData: 'Daftar Perusahaan Pengguna Jasa Kepelabuhanan',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA PERUSAHAAN', 'KATEGORI PERUSAHAAN', 'ALAMAT', 'NOMOR SIUP', 'TANGGAL SIUP', 'NOMOR SIO', 'TANGGAL SIO'],
  },
  {
    no: 12,
    namaData: 'Data Volume/Tonase Barang Asal/Tujuan Negara',
    jenisData: 'Data Statistik',
    periodeData: 'Per Bulan',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA TERMINAL', 'BENDERA KAPAL', 'NEGARA ASAL', 'PELABUHAN ASAL', 'NEGARA TUJUAN', 'PELABUHAN TUJUAN', 'VOLUME BONGKAR', 'VOLUME MUAT'],
  },
  {
    no: 13,
    namaData: 'Monitoring & Evaluasi SOP Pelabuhan',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL REKAP', 'IDENTIFIKASI MASALAH', 'TOLAK UKUR KEPATUHAN', 'EVALUASI KINERJA', 'SARAN/REKOMENDASI', 'LAPORAN MONEV'],
  },
  {
    no: 14,
    namaData: 'Perjanjian Kerjasama Pemanfaatan Aset BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL REKAP', 'NAMA PERJANJIAN', 'JANGKA WAKTU', 'NAMA MITRA', 'HAK & KEWAJIBAN PIHAK PERTAMA DAN KEDUA'],
  },
  {
    no: 15,
    namaData: 'Data Layanan Badan Usaha Kepelabuhanan',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL REKAP', 'LAYANAN KEPELABUHANAN', 'LAYANAN NON KEPELABUHANAN', 'SATUAN', 'TARIF'],
  },
  {
    no: 16,
    namaData: 'Rekapitulasi Proyeksi Penerimaan dan Pencairan Dana',
    jenisData: 'Data Statistik',
    periodeData: 'Per Bulan',
    sifatData: 'TERTUTUP',
    atributData: ['TANGGAL REKAP', 'PROYEKSI PENERIMAAN PERJASA/PERLAYANAN', 'RENCANA PEMBAYARAN PELAKSANAAN KEGIATAN'],
  },
  {
    no: 17,
    namaData: 'Rekapitulasi Pendapatan Pelabuhan Penumpang',
    jenisData: 'Data Statistik',
    periodeData: 'Per Bulan',
    sifatData: 'TERTUTUP',
    atributData: ['PENDAPATAN PERJASA', 'PENDAPATAN PERSATKER'],
  },
  {
    no: 18,
    namaData: 'Rekapitulasi Pendapatan Pelabuhan Barang',
    jenisData: 'Data Statistik',
    periodeData: 'Per Bulan',
    sifatData: 'TERTUTUP',
    atributData: ['PENDAPATAN PERJASA', 'PENDAPATAN PERSATKER'],
  },
  {
    no: 19,
    namaData: 'Profil Badan Usaha Kepelabuhanan BP Batam',
    jenisData: 'Dokumen Digital',
    periodeData: 'Jika Update',
    sifatData: 'TERBUKA',
    atributData: ['PROFIL BADAN USAHA', 'DASAR HUKUM', 'STRUKTUR ORGANISASI'],
  },
  {
    no: 20,
    namaData: 'Fasilitas Pelabuhan Laut BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERBUKA',
    atributData: ['TANGGAL REKAP', 'DAFTAR FASILITAS PELABUHAN', 'PERALATAN BONGKAR MUAT'],
  },
  {
    no: 21,
    namaData: 'Indeks Kepuasan Masyarakat (IKM) Layanan Kepelabuhanan',
    jenisData: 'Data Statistik',
    periodeData: 'Per Tahun',
    sifatData: 'TERTUTUP',
    atributData: ['NILAI INDEKS KEPUASAN MASYARAKAT', 'TAHUN', '9 UNSUR PERMENPAN-RB'],
  },
  {
    no: 22,
    namaData: 'Jumlah Pelayanan Bongkar Muat Terminal Kargo Batu Ampar',
    jenisData: 'Data Statistik',
    periodeData: 'Per Tahun',
    sifatData: 'TERBUKA',
    atributData: ['VOLUME BONGKAR CARGO BATU AMPAR (TON)', 'VOLUME BONGKAR MUAT GENERAL CARGO (TON)'],
  },
  {
    no: 23,
    namaData: 'Jumlah Pelayanan Bongkar Muat Terminal Peti Kemas Batu Ampar',
    jenisData: 'Data Statistik',
    periodeData: 'Per Tahun',
    sifatData: 'TERBUKA',
    atributData: ['TAHUN', 'VOLUME BONGKAR PETI KEMAS BATU AMPAR (TEUS)', 'VOLUME MUAT PETI KEMAS BATU AMPAR (TEUS)'],
  },
  {
    no: 24,
    namaData: 'Jumlah Pelayanan Bongkar Muat Terminal Curah',
    jenisData: 'Data Statistik',
    periodeData: 'Per Tahun',
    sifatData: 'TERBUKA',
    atributData: ['VOLUME BONGKAR CURAH CAIR (TON)', 'VOLUME MUAT CURAH CAIR (TON)'],
  },
  {
    no: 25,
    namaData: 'Jumlah Penumpang Pelabuhan Domestik dan Internasional',
    jenisData: 'Data Statistik',
    periodeData: 'Per Tahun',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA TERMINAL', 'JENIS PENUMPANG', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'PENUMPANG DOMESTIK/INTERNASIONAL', 'JUMLAH KEDATANGAN', 'JUMLAH KEBERANGKATAN', 'KEWARGANEGARAAN PENUMPANG'],
  },
];

const FORMULA_LIST = [
  {
    code: 'DPKPL-01',
    nama: 'Realisasi PNBP Kepelabuhanan (%)',
    dataset: 'Dataset #3 (PNBP)',
    rumus: 'SUM([JUMLAH_PNBP]) / SUM([TARGET_PNBP]) * 100',
    penjelasan: 'Rasio pencapaian penerimaan bukan pajak jasa labuh, tambat, dermaga, pandu/tunda, dan pass pelabuhan.',
  },
  {
    code: 'DPKPL-02',
    nama: 'Rasio Serapan Belanja Kepelabuhanan (%)',
    dataset: 'Dataset #2 (Belanja)',
    rumus: 'SUM([REALISASI_BELANJA]) / SUM([PAGU_DIPA]) * 100',
    penjelasan: 'Tingkat penyerapan anggaran modal dan pemeliharaan dermaga, STS crane, dan alur pelayaran.',
  },
  {
    code: 'DPKPL-03',
    nama: 'Indeks Kepuasan Masyarakat (IKM Layanan)',
    dataset: 'Dataset #21 (IKM)',
    rumus: '(SUM([NILAI_UNSUR_1..9]) / 9) * 25',
    penjelasan: 'Standar konversi PermenPAN-RB dari skala 4 ke skala 100 (Nilai ≥ 88.31 predikat Sangat Baik / A).',
  },
  {
    code: 'DPKPL-04',
    nama: 'Total Penumpang (Kedatangan + Keberangkatan)',
    dataset: 'Dataset #25 (Penumpang)',
    rumus: 'SUM([JUMLAH_KEDATANGAN]) + SUM([JUMLAH_KEBERANGKATAN])',
    penjelasan: 'Agregasi mobilitas penumpang kapal feri domestik dan feri internasional di seluruh terminal Batam.',
  },
  {
    code: 'DPKPL-05',
    nama: 'Tingkat Keterisian Dermaga (BOR %)',
    dataset: 'Dataset #4 (Dermaga)',
    rumus: '(SUM([WAKTU_TAMBAT_JAM]) / (COUNT([DERMAGA]) * 24 * [JUMLAH_HARI])) * 100',
    penjelasan: 'Berth Occupancy Ratio mengukur kepadatan sandar kapal di 24 dermaga aktif (standar UNCTAD 60-70%).',
  },
  {
    code: 'DPKPL-06',
    nama: 'Total Kunjungan Kapal (Call & Gross Tonnage)',
    dataset: 'Dataset #5 (Barang) & #7 (Penumpang)',
    rumus: '[CALL_TOTAL] = SUM([CALL_DALAM]) + SUM([CALL_LUAR])',
    penjelasan: 'Jumlah panggilan kapal berlabuh/sandar di perairan Batam beserta total bobot tonase GT kapal.',
  },
  {
    code: 'DPKPL-07',
    nama: 'Throughput Peti Kemas Batu Ampar (TEUs)',
    dataset: 'Dataset #23 (Peti Kemas Batu Ampar)',
    rumus: 'SUM([VOLUME_BONGKAR_TEUS]) + SUM([VOLUME_MUAT_TEUS])',
    penjelasan: 'Volume arus peti kemas ekspor, impor, dan transshipment di Terminal Peti Kemas Batu Ampar.',
  },
  {
    code: 'DPKPL-08',
    nama: 'Dwell Time Peti Kemas (Hari)',
    dataset: 'Dataset #23 & Sistem INSW Terminal',
    rumus: 'AVG(DATEDIFF(\'day\', [TGL_BONGKAR_DERMAGA], [TGL_GATE_OUT_CY]))',
    penjelasan: 'Waktu rata-rata penumpukan peti kemas di Container Yard (CY) sejak dibongkar hingga keluar gerbang terminal (Target Nasional INSW ≤ 3,0 Hari, Realisasi Batam 2,8 Hari).',
  },
];

export const PelabuhanKamusRumusView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sifatFilter, setSifatFilter] = useState<'ALL' | 'TERBUKA' | 'TERBATAS' | 'TERTUTUP'>('ALL');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredDatasets = KATALOG_25_DATASET_KEPELABUHANAN.filter((item) => {
    const matchSearch =
      search === '' ||
      item.namaData.toLowerCase().includes(search.toLowerCase()) ||
      item.atributData.some((a) => a.toLowerCase().includes(search.toLowerCase()));
    const matchSifat = sifatFilter === 'ALL' || item.sifatData === sifatFilter;
    return matchSearch && matchSifat;
  });

  const handleCopy = (code: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-[#0B1728] text-white rounded-xl p-4 border border-[#1F4E79] shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-sky-400" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Kamus Satu Data BP Batam: Direktorat Pengelolaan Kepelabuhanan (DPKPL)
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              Dokumentasi lengkap 25 dataset resmi (Hal. 14 - 17 Dokumen Satu Data) &amp; kalkulasi terhitung Tableau Calculated Fields
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-blue-900/60 text-sky-300 border border-blue-700 text-xs font-mono font-bold">
              25 Dataset Resmi
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-900/60 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold">
              7 Formula Terverifikasi
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: TABEL FORMULA KALKULASI TABLEAU */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
        <div className="flex items-center gap-2 mb-2.5">
          <FileCode2 className="w-4 h-4 text-[#1F4E79]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
            Daftar 7 Formula Perhitungan Eksekutif (Tableau Calculated Fields)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {FORMULA_LIST.map((f) => (
            <div
              key={f.code}
              className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[10px] bg-blue-100 text-[#1F4E79]">
                    {f.code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{f.dataset}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">{f.nama}</h4>
                <p className="text-[10.5px] text-slate-600 mb-2 leading-relaxed">{f.penjelasan}</p>
              </div>

              <div className="bg-white p-2 rounded border border-slate-200 flex items-center justify-between gap-2">
                <code className="font-mono text-[10.5px] font-semibold text-blue-900 truncate">
                  {f.rumus}
                </code>
                <button
                  onClick={() => handleCopy(f.code, f.rumus)}
                  className="px-2 py-0.8 rounded text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedCode === f.code ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: 25 DATASET RESMI KATALOG SATU DATA */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>Daftar 25 Dataset Satu Data Dit. Pengelolaan Kepelabuhanan (Hal. 14 - 17)</span>
            </h3>
            <p className="text-[10.5px] text-slate-500">
              Menampilkan skema tabel, sifat keterbukaan informasi, dan atribut kolom sesuai SK Satu Data BP Batam
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari dataset atau atribut..."
                className="pl-8 pr-3 py-1 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 w-44 sm:w-56"
              />
            </div>

            {/* Sifat Filter */}
            <select
              value={sifatFilter}
              onChange={(e) => setSifatFilter(e.target.value as any)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1 bg-slate-50 text-slate-700 cursor-pointer"
            >
              <option value="ALL">Semua Sifat</option>
              <option value="TERBUKA">Terbuka</option>
              <option value="TERBATAS">Terbatas</option>
              <option value="TERTUTUP">Tertutup</option>
            </select>
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto max-h-[380px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#0B1728] text-white text-[10.5px] font-semibold sticky top-0 z-10">
                <tr>
                  <th className="py-2 px-2.5 w-12">No</th>
                  <th className="py-2 px-2.5">Nama Dataset Satu Data</th>
                  <th className="py-2 px-2.5">Jenis Data</th>
                  <th className="py-2 px-2.5">Periode</th>
                  <th className="py-2 px-2.5 text-center">Sifat Data</th>
                  <th className="py-2 px-2.5">Daftar Atribut Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                {filteredDatasets.map((row) => (
                  <tr key={row.no} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-2.5 font-mono font-bold text-slate-500">#{row.no}</td>
                    <td className="py-2 px-2.5 font-bold text-slate-900 max-w-[200px]">{row.namaData}</td>
                    <td className="py-2 px-2.5 text-slate-600 whitespace-nowrap">{row.jenisData}</td>
                    <td className="py-2 px-2.5 text-slate-600 whitespace-nowrap font-mono">{row.periodeData}</td>
                    <td className="py-2 px-2.5 text-center whitespace-nowrap">
                      <span
                        className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${
                          row.sifatData === 'TERBUKA'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : row.sifatData === 'TERBATAS'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {row.sifatData}
                      </span>
                    </td>
                    <td className="py-2 px-2.5">
                      <div className="flex flex-wrap gap-1 max-w-[380px]">
                        {row.atributData.map((attr, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono text-[9px] border border-slate-200"
                          >
                            {attr}
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
    </div>
  );
};
