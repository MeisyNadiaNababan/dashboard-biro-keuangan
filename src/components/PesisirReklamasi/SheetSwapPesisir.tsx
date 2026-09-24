import React, { useState } from 'react';
import {
  Waves,
  MapPin,
  Building,
  Calendar,
  Layers,
  ArrowUpDown,
  Search,
  CheckCircle2,
  PieChart as PieIcon,
  BarChart3,
  Table as TableIcon,
  Info,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import {
  DATASET_4_PEMANFAATAN_INVESTASI,
  DISTRIBUSI_WILAYAH_PESISIR_DATA,
  KPI_PESISIR_REKLAMASI_DATA,
} from './pesisirReklamasiData';
import { PesisirVisualHeader } from './PesisirVisualHeader';
import { PesisirReklamasiFilterState, PemanfaatanInvestasiItem } from './types';

interface SheetSwapPesisirProps {
  filters: PesisirReklamasiFilterState;
  onOpenFormulaModal: (formulaId: string) => void;
}

export const SheetSwapPesisir: React.FC<SheetSwapPesisirProps> = ({
  filters,
  onOpenFormulaModal,
}) => {
  // SHEET SWAP STATE (Req 2):
  // Sheet 1: Visualisasi Wilayah & Luas Pemanfaatan
  // Sheet 2: Tabel Detail Info (4 Atribut: Nama Perusahaan, Wilayah, Luas, Tahun Penerbitan)
  const [activeSheet, setActiveSheet] = useState<'visual-wilayah' | 'tabel-detail'>('visual-wilayah');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'luas-desc' | 'luas-asc' | 'nama' | 'tahun'>('luas-desc');
  const [selectedWilayah, setSelectedWilayah] = useState<string | null>(null);

  // Filter Data Pemanfaatan Kawasan Pesisir dan Izin Reklamasi untuk Investasi (Dataset #4)
  const filteredData = DATASET_4_PEMANFAATAN_INVESTASI.filter((item) => {
    if (filters.swp !== 'ALL' && item.wilayah !== filters.swp && item.swp !== filters.swp) {
      return false;
    }
    if (filters.tahun !== 'ALL' && item.tahunPenerbitan.toString() !== filters.tahun) {
      return false;
    }
    if (filters.jenisIzin !== 'ALL' && item.jenisIzin !== filters.jenisIzin) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.namaPerusahaan.toLowerCase().includes(q) ||
        item.wilayah.toLowerCase().includes(q) ||
        item.nomorIzinPkkprl.toLowerCase().includes(q) ||
        item.jenisIzin.toLowerCase().includes(q) ||
        item.sektorIndustri.toLowerCase().includes(q) ||
        item.koordinat.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'luas-desc') return b.luasHa - a.luasHa;
    if (sortBy === 'luas-asc') return a.luasHa - b.luasHa;
    if (sortBy === 'tahun') return b.tahunPenerbitan - a.tahunPenerbitan;
    return a.namaPerusahaan.localeCompare(b.namaPerusahaan);
  });

  const totalLuasHa = filteredData.reduce((acc, curr) => acc + curr.luasHa, 0);
  const totalLuasM2 = totalLuasHa * 10000;

  // 1. Agregasi Wilayah & Luas Pemanfaatan (Untuk Sheet 1)
  const wilayahAggMap = filteredData.reduce((acc, item) => {
    if (!acc[item.wilayah]) {
      acc[item.wilayah] = {
        wilayah: item.wilayah,
        totalLuasHa: 0,
        jumlahPerusahaan: 0,
        reklamasiHa: 0,
        pesisirHa: 0,
        perusahaanList: [] as PemanfaatanInvestasiItem[],
      };
    }
    acc[item.wilayah].totalLuasHa += item.luasHa;
    acc[item.wilayah].jumlahPerusahaan += 1;
    if (item.jenisIzin === 'Izin Reklamasi') {
      acc[item.wilayah].reklamasiHa += item.luasHa;
    } else {
      acc[item.wilayah].pesisirHa += item.luasHa;
    }
    acc[item.wilayah].perusahaanList.push(item);
    return acc;
  }, {} as Record<string, { wilayah: string; totalLuasHa: number; jumlahPerusahaan: number; reklamasiHa: number; pesisirHa: number; perusahaanList: PemanfaatanInvestasiItem[] }>);

  const wilayahChartData = Object.values(wilayahAggMap)
    .map((w) => ({
      ...w,
      luasHa: Number(w.totalLuasHa.toFixed(1)),
      persen: totalLuasHa > 0 ? Number(((w.totalLuasHa / totalLuasHa) * 100).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.luasHa - a.luasHa);

  const activeWilayahInfo = selectedWilayah
    ? wilayahAggMap[selectedWilayah]
    : wilayahChartData[0] || null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs font-sans">
      {/* 1. STANDARDIZED VISUAL HEADER (REQ 4) */}
      <PesisirVisualHeader
        datasetNumber={4}
        pdfPages="Hal. 14"
        title="Luas Izin Pemanfaatan Kawasan Pesisir dan Izin Reklamasi untuk Investasi"
        visualName="Sheet Swap - Visualisasi Wilayah & Luas Pemanfaatan vs Tabel Detail 4 Atribut"
        classification="TERBUKA"
        attributes={[
          'NAMA PERUSAHAAN',
          'WILAYAH',
          'LUAS (Ha & m²)',
          'TAHUN PENERBITAN',
          'NOMOR IZIN PKKPRL',
          'KOORDINAT',
        ]}
        rightControls={
          /* SHEET SWAP SELECTOR (REQ 2) */
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveSheet('visual-wilayah')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'visual-wilayah'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Sheet 1: Visualisasi Wilayah &amp; Luas</span>
            </button>
            <button
              onClick={() => setActiveSheet('tabel-detail')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'tabel-detail'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Sheet 2: Tabel Detail (4 Atribut)</span>
            </button>
          </div>
        }
        onOpenFormula={() => onOpenFormulaModal('kpi_luas_izin')}
      />

      {/* 2. SUMMARY METRICS STRIP - MURNI LUAS (HA/M²) DAN JUMLAH IZIN */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-100 mb-4">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Total Luas Izin Terbit
          </span>
          <span className="text-base sm:text-lg font-black text-sky-700 font-mono">
            {totalLuasHa.toLocaleString('id-ID')} Ha
          </span>
          <span className="text-[10.5px] text-slate-400 block font-mono">
            {(totalLuasM2).toLocaleString('id-ID')} m²
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Perusahaan Berizin
          </span>
          <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
            {filteredData.length} Entitas
          </span>
          <span className="text-[10.5px] text-emerald-700 font-medium block">
            100% Berstatus Aktif
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Rata-Rata Luas per Izin
          </span>
          <span className="text-base sm:text-lg font-black text-indigo-700 font-mono">
            {filteredData.length > 0 ? (totalLuasHa / filteredData.length).toFixed(1) : '0'} Ha
          </span>
          <span className="text-[10.5px] text-slate-400 block font-mono">
            Per Pemegang PKKPRL
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Wilayah Terbesar
          </span>
          <span className="text-base sm:text-lg font-black text-emerald-700 font-mono">
            Rempang &amp; Galang
          </span>
          <span className="text-[10.5px] text-slate-400 block">
            Konsentrasi Energi &amp; Maritim
          </span>
        </div>
      </div>

      {/* 3. SHEET SWAP CONTAINER */}
      {/* SHEET 1: VISUALISASI YANG COCOK MENAMPILKAN WILAYAH DAN LUAS PEMANFAATAN (REQ 2) */}
      {activeSheet === 'visual-wilayah' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">
                Visualisasi Luas Pemanfaatan Kawasan Pesisir &amp; Reklamasi per Wilayah
              </span>
              <span className="text-[10.5px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Satuan: Hektar (Ha)
              </span>
            </div>
            <span className="text-xs text-slate-500 italic">
              Klik kartu wilayah di sebelah kiri untuk melihat daftar nama perusahaan, luas dan izin di wilayah tersebut
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Left Column: Interactive Horizontal Ranking of Wilayah and Luas Pemanfaatan */}
            <div className="lg:col-span-7 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="space-y-3">
                {wilayahChartData.map((item) => {
                  const isSelected = selectedWilayah === item.wilayah;
                  const maxLuas = wilayahChartData[0]?.luasHa || 1;
                  const barPercent = Math.max(8, (item.luasHa / maxLuas) * 100);

                  return (
                    <div
                      key={item.wilayah}
                      onClick={() => setSelectedWilayah(item.wilayah)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-50/70 border-sky-400 shadow-2xs ring-2 ring-sky-300/40'
                          : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span className="text-xs font-bold text-slate-900">{item.wilayah}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-sky-900 font-mono">
                            {item.luasHa.toLocaleString('id-ID')} Ha
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono ml-1.5">
                            ({item.persen}%)
                          </span>
                        </div>
                      </div>

                      {/* Bar Fill */}
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-sky-500 to-indigo-600"
                          style={{ width: `${barPercent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between mt-2 text-[10.5px] text-slate-500">
                        <span>{item.jumlahPerusahaan} Perusahaan Berizin</span>
                        <span className="font-mono">{(item.luasHa * 10000).toLocaleString('id-ID')} m²</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Detail Inspector Perusahaan di Wilayah Terpilih */}
            <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              {activeWilayahInfo ? (
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Rincian Perusahaan di Wilayah
                      </span>
                      <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-4 h-4 text-sky-600" />
                        {activeWilayahInfo.wilayah}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-sky-700 font-mono">
                        {activeWilayahInfo.totalLuasHa.toLocaleString('id-ID')} Ha
                      </span>
                      <span className="text-[10px] text-slate-500 block">Total Luas</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                    {activeWilayahInfo.perusahaanList.map((comp) => (
                      <div
                        key={comp.id}
                        className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-sky-300 transition-all text-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-slate-900 leading-snug">
                            {comp.namaPerusahaan}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono font-bold text-[10px] shrink-0">
                            Thn {comp.tahunPenerbitan}
                          </span>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between font-mono text-[11px]">
                          <span className="text-slate-500">Luas Pemanfaatan:</span>
                          <span className="font-black text-sky-800">
                            {comp.luasHa} Ha ({comp.luasM2.toLocaleString('id-ID')} m²)
                          </span>
                        </div>

                        <div className="mt-1 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                          <span className="truncate max-w-[180px]" title={comp.jenisIzin}>
                            🏷️ {comp.jenisIzin}
                          </span>
                          <span className="font-mono text-slate-400">{comp.koordinat}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Pilih wilayah pada grafik sebelah kiri untuk memuat rincian perusahaan.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SHEET 2: TABEL DETAIL INFO (4 ATRIBUT UTAMA SESUAI PERMINTAAN REQ 2) */}
      {activeSheet === 'tabel-detail' && (
        <div className="space-y-3">
          {/* Search and Sort Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
            <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Cari nama perusahaan, wilayah, nomor PKKPRL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-slate-800 placeholder-slate-400 text-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 text-[11px] font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none cursor-pointer"
              >
                <option value="luas-desc">Luas Terbesar (Ha)</option>
                <option value="luas-asc">Luas Terkecil (Ha)</option>
                <option value="nama">Nama Perusahaan (A-Z)</option>
                <option value="tahun">Tahun Terbit (Terbaru)</option>
              </select>
            </div>
          </div>

          {/* TABLE DISPLAYING 4 PRIMARY ATTRIBUTES (NAMA PERUSAHAAN, WILAYAH, LUAS, TAHUN PENERBITAN) */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 font-mono text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">NO</th>
                  <th className="py-2.5 px-3 text-slate-900 bg-sky-50/50">
                    1. NAMA PERUSAHAAN
                  </th>
                  <th className="py-2.5 px-3 bg-sky-50/50">
                    2. WILAYAH
                  </th>
                  <th className="py-2.5 px-3 text-right bg-sky-50/60 text-sky-900">
                    3. LUAS (Ha)
                  </th>
                  <th className="py-2.5 px-3 text-right text-slate-600">
                    LUAS (m²)
                  </th>
                  <th className="py-2.5 px-3 text-center bg-purple-50/50 text-purple-900">
                    4. TAHUN PENERBITAN
                  </th>
                  <th className="py-2.5 px-3">JENIS IZIN</th>
                  <th className="py-2.5 px-3">NOMOR IZIN PKKPRL</th>
                  <th className="py-2.5 px-3 font-mono">KOORDINAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-slate-700">
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        {item.namaPerusahaan}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-sky-800">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-sky-600" />
                          {item.wilayah}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-black text-sky-700 font-mono text-xs">
                        {item.luasHa.toLocaleString('id-ID')} Ha
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-500 text-[11px]">
                        {item.luasM2.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-purple-800 font-mono">
                        <span className="px-2 py-0.5 rounded bg-purple-50 border border-purple-200">
                          {item.tahunPenerbitan}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                        {item.jenisIzin}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[10.5px] text-slate-500">
                        {item.nomorIzinPkkprl}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400">
                        {item.koordinat}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                      Tidak ada data izin pemanfaatan yang sesuai filter.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-200 font-mono text-slate-900 text-xs">
                <tr>
                  <td colSpan={3} className="py-2.5 px-3 font-sans">
                    TOTAL LUAS IZIN TERBIT ({filteredData.length} PERUSAHAAN)
                  </td>
                  <td className="py-2.5 px-3 text-right text-sky-800">
                    {totalLuasHa.toLocaleString('id-ID')} Ha
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-600">
                    {totalLuasM2.toLocaleString('id-ID')} m²
                  </td>
                  <td colSpan={4} className="py-2.5 px-3 text-right text-slate-500 font-sans text-[11px]">
                    Dataset No. 4 Satu Data (Hal. 14)
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
