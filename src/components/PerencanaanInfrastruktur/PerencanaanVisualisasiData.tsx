import React, { useState } from 'react';
import {
  Clock,
  Coins,
  Building2,
  Boxes,
  Palmtree,
  Trees,
  Route,
  Ship,
  FileCheck2,
  Users,
  Info,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Eye,
  BarChart2,
  Calendar,
  Building,
  CheckCircle2,
  Table as TableIcon,
  LayoutGrid,
} from 'lucide-react';
import {
  KPI_SEKTOR_LIST,
  PEMANFAATAN_DOKUMEN_LIST,
} from './perencanaanData';
import { PaketPerencanaan } from './types';

interface PerencanaanVisualisasiDataProps {
  pakets?: PaketPerencanaan[];
  onSelectSektor?: (sektor: string) => void;
  selectedSektor?: string;
  onOpenFormula?: (datasetNo: number) => void;
  hidePemanfaatan?: boolean;
}

export const PerencanaanVisualisasiData: React.FC<PerencanaanVisualisasiDataProps> = ({
  onSelectSektor,
  selectedSektor = 'Semua',
  onOpenFormula,
  hidePemanfaatan = false,
}) => {
  // Filter tampilan fokus: 'semua' | 'sektor' | 'pemanfaatan'
  const [activeSection, setActiveSection] = useState<'semua' | 'sektor' | 'pemanfaatan'>('semua');

  // Urutan metrik Data 1-6 untuk view batang: 'biaya' | 'paket' | 'waktu'
  const [sortBy, setSortBy] = useState<'biaya' | 'paket' | 'waktu'>('biaya');

  // Mode visualisasi Bagian 2 (Pemanfaatan Dokumen): 'kartu' (Kartu Terstruktur Lega) | 'tabel' (Tabel Matriks Lengkap)
  const [pemanfaatanViewMode, setPemanfaatanViewMode] = useState<'kartu' | 'tabel'>('kartu');

  // Total pagu DED seluruh 6 sektor (Rp 53,68 Miliar)
  const totalBiayaDEDSemua = KPI_SEKTOR_LIST.reduce((acc, k) => acc + k.totalPaguDED, 0);

  // Siapkan data 6 sektor yang telah terurut
  const sortedSektorList = [...KPI_SEKTOR_LIST].sort((a, b) => {
    if (sortBy === 'biaya') return b.totalPaguDED - a.totalPaguDED;
    if (sortBy === 'paket') return b.totalPaket - a.totalPaket;
    if (sortBy === 'waktu') return b.waktuPelaksanaanAvgBulan - a.waktuPelaksanaanAvgBulan;
    return 0;
  });

  // Total nilai DED yang dimanfaatkan (Rp 40,89 Miliar) - Murni Nilai DED
  const totalNilaiDimanfaatkan = PEMANFAATAN_DOKUMEN_LIST.reduce((acc, p) => acc + p.nilaiDedDimanfaatkan, 0);

  // Icon mapper untuk sektor
  const getSektorIcon = (sektor: string) => {
    switch (sektor) {
      case 'Gedung':
        return <Building2 className="w-4 h-4 text-sky-600" />;
      case 'Utilitas dan Drainase':
        return <Boxes className="w-4 h-4 text-cyan-600" />;
      case 'Fasilitas Wisata dan Lingkungan':
        return <Palmtree className="w-4 h-4 text-emerald-600" />;
      case 'Pertanaman dan Penghijauan':
        return <Trees className="w-4 h-4 text-green-600" />;
      case 'Darat':
        return <Route className="w-4 h-4 text-amber-600" />;
      case 'Laut dan Udara':
        return <Ship className="w-4 h-4 text-indigo-600" />;
      default:
        return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  // Color mapper untuk sektor
  const SEKTOR_PALETTE: Record<string, { bg: string; text: string; bar: string; border: string }> = {
    'Gedung': { bg: 'bg-sky-50', text: 'text-sky-800', bar: 'bg-sky-600', border: 'border-sky-200' },
    'Utilitas dan Drainase': { bg: 'bg-cyan-50', text: 'text-cyan-800', bar: 'bg-cyan-600', border: 'border-cyan-200' },
    'Fasilitas Wisata dan Lingkungan': { bg: 'bg-emerald-50', text: 'text-emerald-800', bar: 'bg-emerald-600', border: 'border-emerald-200' },
    'Pertanaman dan Penghijauan': { bg: 'bg-green-50', text: 'text-green-800', bar: 'bg-green-600', border: 'border-green-200' },
    'Darat': { bg: 'bg-amber-50', text: 'text-amber-800', bar: 'bg-amber-600', border: 'border-amber-200' },
    'Laut dan Udara': { bg: 'bg-indigo-50', text: 'text-indigo-800', bar: 'bg-indigo-600', border: 'border-indigo-200' },
  };

  return (
    <div className="space-y-6 mb-6 font-sans">
      {/* =========================================================================
          BAR KONTROL UTAMA: FILTER FOKUS TAMPILAN
         ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Visualisasi Inti Direktorat Perencanaan Infrastruktur
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                Satu Data Indonesia Hal. 53
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {hidePemanfaatan ? (
                <>Penyajian visual langsung untuk <strong>Rekapitulasi 6 Sektor Perencanaan Teknis DED (Data 1-6)</strong>.</>
              ) : (
                <>Penyajian visual langsung untuk <strong>Rekapitulasi 6 Sektor (Data 1-6)</strong> dan{' '}
                <strong>Pemanfaatan Dokumen Teknis (Data 7-9)</strong>.</>
              )}
            </p>
          </div>

          {/* Quick View Filter Segment */}
          {!hidePemanfaatan && (
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs self-start md:self-auto shrink-0">
              <button
                onClick={() => setActiveSection('semua')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  activeSection === 'semua'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua Visualisasi
              </button>
              <button
                onClick={() => setActiveSection('sektor')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  activeSection === 'sektor'
                    ? 'bg-white text-sky-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Rekap 6 Sektor (Data 1-6)
              </button>
              <button
                onClick={() => setActiveSection('pemanfaatan')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  activeSection === 'pemanfaatan'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Pemanfaatan Dokumen (Data 7-9)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BAGIAN 1: REKAPITULASI PERENCANAAN 6 SEKTOR INFRASTRUKTUR (DATASET NO. 1 - 6)
          (RESPONS PERMINTAAN USER: GRAFIK BATANG BERSIH TANPA GRAFIK CAPEX & TANPA INTI TEMUAN)
         ========================================================================= */}
      {(activeSection === 'semua' || activeSection === 'sektor') && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          {/* Header Card 1 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-4 border-b border-slate-100 gap-2.5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                  DATASET NO. 1 S.D. 6
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Rekapitulasi Perencanaan Pembangunan 6 Sektor Infrastruktur (Hal. 53)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                  🏷️ Visualisasi: Grafik Batang Horizontal (Horizontal Bar Chart)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Membandingkan 3 atribut resmi: <strong>Jumlah DED</strong>, <strong>Biaya DED</strong>, dan{' '}
                <strong>Waktu Pelaksanaan Penyusunan DED</strong> pada 6 sektor fisik kota Batam.
              </p>
            </div>

            {/* Sort Controls & Formula Action */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer"
                >
                  <option value="biaya">Biaya DED Tertinggi</option>
                  <option value="paket">Jumlah Paket Terbanyak</option>
                  <option value="waktu">Waktu Durasi Terpanjang</option>
                </select>
              </div>

              {onOpenFormula && (
                <button
                  onClick={() => onOpenFormula(1)}
                  className="text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                  title="Lihat Formula & Atribut Perhitungan"
                >
                  Formula #1-6
                </button>
              )}
            </div>
          </div>

          {/* VIEW: GRAFIK BATANG HORIZONTAL 6 SEKTOR */}
          <div className="space-y-2.5">
            {sortedSektorList.map((item) => {
              const biayaMiliar = (item.totalPaguDED / 1e9).toFixed(2);
              const persenShare = ((item.totalPaguDED / totalBiayaDEDSemua) * 100).toFixed(1);
              const isSelected = selectedSektor === item.sektor;
              const palette = SEKTOR_PALETTE[item.sektor] || SEKTOR_PALETTE['Gedung'];

              return (
                <div
                  key={item.sektor}
                  onClick={() => onSelectSektor && onSelectSektor(isSelected ? 'Semua' : item.sektor)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-sky-50/80 border-sky-400 ring-1 ring-sky-400 shadow-xs'
                      : 'bg-slate-50/50 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                        {getSektorIcon(item.sektor)}
                      </div>
                      <span className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors text-sm">
                        {item.sektor}
                      </span>
                      <span className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
                        Dataset #{item.datasetNo}
                      </span>
                    </div>

                    {/* 3 Atribut: Paket, Durasi Waktu, dan Biaya DED */}
                    <div className="flex items-center gap-3 text-right">
                      <span className="text-xs text-slate-500 font-medium">
                        <strong className="text-slate-800 font-mono">{item.totalPaket}</strong> Paket DED
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        ⏱️ <strong className="text-slate-800 font-mono">{item.waktuPelaksanaanAvgBulan}</strong> Bulan
                      </span>
                      <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        Rp {biayaMiliar} M ({persenShare}%)
                      </span>
                    </div>
                  </div>

                  {/* Batang Horizontal Proporsional */}
                  <div className="w-full bg-slate-200/80 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${palette.bar}`}
                      style={{ width: `${persenShare}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 mt-1.5">
                    <span className="line-clamp-1">{item.deskripsi}</span>
                    <span className="text-slate-400 font-mono shrink-0 ml-2 text-[11px]">
                      Estimasi Capex: Rp {(item.totalEstimasiCapexFisik / 1e12).toFixed(2)} T
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          BAGIAN 2: PERSENTASE PEMANFAATAN DOKUMEN PERENCANAAN TEKNIS (DATASET NO. 7 - 9)
          (RESPONS USER REQUEST 3: HAPUS TOTAL PAGU, HANYA NILAI DED, TAHUN, DAN UNIT PENGGUNA, TAMPILAN LEGA TIDAK MENUMPUK)
         ========================================================================= */}
      {!hidePemanfaatan && (activeSection === 'semua' || activeSection === 'pemanfaatan') && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          {/* Header Card 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-4 border-b border-slate-100 gap-2.5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                  DATASET NO. 7, 8, DAN 9
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Persentase Pemanfaatan Dokumen Perencanaan Teknis oleh Unit/Instansi Lain (Hal. 53)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                  🏷️ Visualisasi: Matriks Nilai DED, Tahun &amp; Unit Pengguna
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Menyajikan <strong>Nilai DED</strong>, <strong>Tahun Pembuatan</strong>, serta <strong>Unit / Instansi Pengguna</strong> yang memanfaatkan dokumen perencanaan teknis.
              </p>
            </div>

            {/* View Mode Toggle & Formula Action */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  onClick={() => setPemanfaatanViewMode('kartu')}
                  className={`px-2.5 py-1 rounded font-semibold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
                    pemanfaatanViewMode === 'kartu'
                      ? 'bg-white text-emerald-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Tampilan Kartu Horisontal Lega"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Kartu Terstruktur</span>
                </button>
                <button
                  onClick={() => setPemanfaatanViewMode('tabel')}
                  className={`px-2.5 py-1 rounded font-semibold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
                    pemanfaatanViewMode === 'tabel'
                      ? 'bg-white text-emerald-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Tampilan Tabel Matriks Resmi"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Tabel Matriks</span>
                </button>
              </div>

              {onOpenFormula && (
                <button
                  onClick={() => onOpenFormula(7)}
                  className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                  title="Lihat Formula #7, 8, 9"
                >
                  Formula #7-9
                </button>
              )}
            </div>
          </div>

          {/* Ringkasan Eksekutif Ringkas & Lega (Tanpa Total Pagu, Tanpa Slogan Bertumpuk) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 mb-5 text-xs">
            <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium block">Total Nilai DED Dimanfaatkan:</span>
              <span className="text-lg font-bold font-mono text-emerald-700 block mt-0.5">
                Rp {(totalNilaiDimanfaatkan / 1e9).toFixed(2)} Miliar
              </span>
              <span className="text-[10.5px] text-slate-500 mt-0.5 block">Akumulasi 3 Bidang Infrastruktur</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium block">Periode Tahun Pembuatan DED:</span>
              <span className="text-lg font-bold font-mono text-slate-900 block mt-0.5">
                2023 – 2025
              </span>
              <span className="text-[10.5px] text-slate-500 mt-0.5 block">Status Dokumen: Siap Tender Fisik</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium block">Total Jangkauan Pengguna:</span>
              <span className="text-lg font-bold font-mono text-slate-900 block mt-0.5">
                11 Instansi &amp; Unit Kerja
              </span>
              <span className="text-[10.5px] text-slate-500 mt-0.5 block">Internal BP Batam &amp; Instansi Eksternal</span>
            </div>
          </div>

          {/* VIEW 1: KARTU HORISONTAL TERSTRUKTUR & LEGA (TIDAK MENUMPUK) */}
          {pemanfaatanViewMode === 'kartu' && (
            <div className="space-y-3.5">
              {PEMANFAATAN_DOKUMEN_LIST.map((item) => {
                const nilaiM = (item.nilaiDedDimanfaatkan / 1e9).toFixed(2);
                const sharePercent = ((item.nilaiDedDimanfaatkan / totalNilaiDimanfaatkan) * 100).toFixed(1);

                // Distinct thematic badges
                const theme =
                  item.datasetNo === 8
                    ? { border: 'border-amber-200', bg: 'bg-amber-50/40', badge: 'bg-amber-100 text-amber-900 border-amber-300', icon: <Route className="w-4 h-4 text-amber-600" /> }
                    : item.datasetNo === 9
                    ? { border: 'border-emerald-200', bg: 'bg-emerald-50/40', badge: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: <Boxes className="w-4 h-4 text-emerald-600" /> }
                    : { border: 'border-sky-200', bg: 'bg-sky-50/40', badge: 'bg-sky-100 text-sky-900 border-sky-300', icon: <Building2 className="w-4 h-4 text-sky-600" /> };

                return (
                  <div
                    key={item.datasetNo}
                    className={`rounded-xl border ${theme.border} bg-white p-4 shadow-2xs hover:shadow-xs transition-all`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                      {/* Kolom 1: Sektor & Tahun (Lega & Jelas) */}
                      <div className="lg:col-span-4 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10.5px] font-mono font-bold px-2 py-0.5 rounded border ${theme.badge}`}>
                            DATASET #{item.datasetNo}
                          </span>
                          <span className="text-[11px] font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {item.tahunPembuatanDed}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                            {theme.icon}
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {item.kategori}
                          </h4>
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-2 pt-0.5">
                          {item.keterangan}
                        </p>
                      </div>

                      {/* Kolom 2: Nilai DED Dimanfaatkan (Angka Monospace Jelas) */}
                      <div className="lg:col-span-3 bg-slate-50 p-3 rounded-lg border border-slate-200/90 space-y-1.5">
                        <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
                          Nilai DED Dimanfaatkan
                        </span>
                        <div className="text-xl font-black font-mono text-emerald-700">
                          Rp {nilaiM} Miliar
                        </div>

                        {/* Bar Proporsi Terhadap Total DED Terserap */}
                        <div className="space-y-1 pt-1">
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${sharePercent}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[10.5px] text-slate-500 font-mono">
                            <span>Proporsi DED:</span>
                            <span className="font-bold text-slate-700">{sharePercent}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Kolom 3: Unit / Instansi Pengguna (Rapi, Terbaca, Tanpa Truncate) */}
                      <div className="lg:col-span-5 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-slate-500" />
                            Unit / Instansi Pengguna:
                          </span>
                          <span className="text-[10.5px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {item.jumlahUnitPengguna} Instansi
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                          {item.daftarUnitPengguna.map((unit, idx) => (
                            <div
                              key={idx}
                              className="text-[11px] px-2 py-1 rounded-md bg-slate-50 text-slate-800 border border-slate-200/80 flex items-start gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-snug">{unit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW 2: TABEL MATRIKS RESMI (LEGA, TRANSPARAN, TIDAK MENUMPUK) */}
          {pemanfaatanViewMode === 'tabel' && (
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                    <th className="p-3 w-12 text-center">No</th>
                    <th className="p-3 w-48">Kategori / Sektor DED</th>
                    <th className="p-3 w-32 text-center">Tahun Pembuatan</th>
                    <th className="p-3 w-44 text-right">Nilai DED Dimanfaatkan</th>
                    <th className="p-3">Unit / Instansi Pengguna</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {PEMANFAATAN_DOKUMEN_LIST.map((item, index) => {
                    const nilaiM = (item.nilaiDedDimanfaatkan / 1e9).toFixed(2);
                    return (
                      <tr key={item.datasetNo} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 text-center font-mono font-bold text-slate-500">
                          {index + 1}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900 text-sm">
                            {item.kategori}
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">
                            Dataset #{item.datasetNo} • Sifat: Terbuka
                          </span>
                        </td>
                        <td className="p-3 text-center font-mono font-semibold text-slate-800">
                          <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">
                            {item.tahunPembuatanDed}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <span className="font-mono font-black text-sm text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                            Rp {nilaiM} Miliar
                          </span>
                        </td>
                        <td className="p-3">
                          <ul className="space-y-1">
                            {item.daftarUnitPengguna.map((unit, uIdx) => (
                              <li key={uIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span>{unit}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Catatan Kaki Satu Data */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sumber: <strong>Buku Satu Data Indonesia BP Batam (Hal. 53)</strong>. Dokumen teknis siap pelaksanaan tender fisik.</span>
            </span>
            <span className="font-mono text-slate-600 font-semibold hidden sm:inline">
              Data Terbuka • 3 Rumpun Perencanaan
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
