import React, { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Calendar,
  Layers,
  TrendingUp,
  BarChart2,
  ShieldCheck,
  Building2,
  Anchor,
  Search,
  SlidersHorizontal,
  Table as TableIcon,
  BarChart3,
  FileCheck,
  Compass,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  DATASET_1_PERMASALAHAN,
  DATASET_3_REKAP_TAHUNAN,
  DATASET_3_PERIZINAN_WAKTU,
  TREN_TRIWULAN_MASALAH,
} from './pesisirReklamasiData';
import { PesisirReklamasiFilterState, PermasalahanPesisirItem } from './types';
import { PesisirVisualHeader } from './PesisirVisualHeader';

interface PesisirKawasanVisualizerProps {
  filters: PesisirReklamasiFilterState;
  onOpenFormulaModal: (kpiId: string) => void;
  focusedDataset?: 1 | 3;
}

export const PesisirKawasanVisualizer: React.FC<PesisirKawasanVisualizerProps> = ({
  filters,
  onOpenFormulaModal,
  focusedDataset,
}) => {
  // SHEET SWAP STATES:
  // Dataset #1: 'grafik' (Visualisasi Grafik) vs 'tabel' (Tabel Detail 7 Atribut)
  const [dataset1Sheet, setDataset1Sheet] = useState<'grafik' | 'tabel'>('grafik');
  const [searchMasalah, setSearchMasalah] = useState('');
  const [sortMasalah, setSortMasalah] = useState<'luas-desc' | 'luas-asc' | 'nama' | 'tahun'>('luas-desc');
  const [filterTriwulan, setFilterTriwulan] = useState<string>('ALL');

  // Dataset #3: 'grafik' (Visualisasi Grafik) vs 'tabel' (Tabel Detail 3 Atribut)
  const [dataset3Sheet, setDataset3Sheet] = useState<'grafik' | 'tabel'>('grafik');
  const [searchPermohonan, setSearchPermohonan] = useState('');
  const [filterStatusSla, setFilterStatusSla] = useState<'ALL' | 'Tepat Waktu' | 'Terlambat'>('ALL');

  // =========================================================================
  // DATASET #1: FILTER & LOGIKA DATA
  // =========================================================================
  const filteredPermasalahan = DATASET_1_PERMASALAHAN.filter((item) => {
    if (filters.swp !== 'ALL' && item.wilayah !== filters.swp && item.swp !== filters.swp) return false;
    if (filters.tahun !== 'ALL' && item.tahun.toString() !== filters.tahun) return false;
    if (filters.statusPenyelesaian === 'Selesai' && item.status !== 'Selesai') return false;
    if (filters.statusPenyelesaian === 'Proses' && item.status !== 'Dalam Proses') return false;
    if (filterTriwulan !== 'ALL' && item.triwulan !== filterTriwulan) return false;
    
    const q = (searchMasalah || filters.searchQuery || '').trim().toLowerCase();
    if (q !== '') {
      return (
        item.namaPerusahaan.toLowerCase().includes(q) ||
        item.dokumenPerizinan.toLowerCase().includes(q) ||
        item.dokumenPendukung.toLowerCase().includes(q) ||
        item.wilayah.toLowerCase().includes(q) ||
        (item.judulKasus && item.judulKasus.toLowerCase().includes(q))
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortMasalah === 'luas-desc') return (b.luasYangDiterbitkan || b.luasDiterbitkanHa) - (a.luasYangDiterbitkan || a.luasDiterbitkanHa);
    if (sortMasalah === 'luas-asc') return (a.luasYangDiterbitkan || a.luasDiterbitkanHa) - (b.luasYangDiterbitkan || b.luasDiterbitkanHa);
    if (sortMasalah === 'nama') return a.namaPerusahaan.localeCompare(b.namaPerusahaan);
    if (sortMasalah === 'tahun') return b.tahun - a.tahun;
    return 0;
  });

  const totalLuasKasusTertangani = filteredPermasalahan.reduce((acc, curr) => acc + (curr.luasYangDiterbitkan || curr.luasDiterbitkanHa), 0);
  const totalKasusSelesai = filteredPermasalahan.filter((k) => k.status === 'Selesai').length;
  const persenSelesai = filteredPermasalahan.length > 0 
    ? ((totalKasusSelesai / filteredPermasalahan.length) * 100).toFixed(1)
    : '0';

  // =========================================================================
  // DATASET #3: FILTER & LOGIKA DATA
  // =========================================================================
  const filteredRekapTahunan = DATASET_3_REKAP_TAHUNAN.filter((item) => {
    if (filters.tahun !== 'ALL' && item.tahun.toString() !== filters.tahun) return false;
    return true;
  });

  const filteredPermohonanDetail = DATASET_3_PERIZINAN_WAKTU.filter((item) => {
    if (filters.swp !== 'ALL' && item.wilayah !== filters.swp && item.swp !== filters.swp) return false;
    if (filterStatusSla !== 'ALL' && item.statusWaktu !== filterStatusSla) return false;
    if (searchPermohonan.trim() !== '') {
      const q = searchPermohonan.toLowerCase();
      return (
        item.namaPemohon.toLowerCase().includes(q) ||
        item.noIzin.toLowerCase().includes(q) ||
        item.jenisIzin.toLowerCase().includes(q) ||
        item.wilayah.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* SECTION BANNER: Visualisasi Kinerja Direktorat Sesuai Atribut Dokumen Satu Data */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-5 bg-indigo-600 rounded-full inline-block" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Visualisasi Kinerja Direktorat Sesuai Atribut Dokumen Satu Data
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 font-mono">
                BUKU SATU DATA HAL. 13 - 14
              </span>
            </div>
            <p className="text-[11.5px] text-slate-500 mt-0.5">
              Penyajian capaian Dataset #1 (Penyelesaian Permasalahan) dan Dataset #3 (Kepatuhan SLA Perizinan) masing-masing dilengkapi fitur <strong>Sheet Swap</strong> interaktif
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
          <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-md font-semibold">
            Dataset #1: {persenSelesai}% Selesai
          </span>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md font-semibold">
            Dataset #3: 92,4% Tepat Waktu SLA
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DATASET #1 (TARUH DI ATAS): PERSENTASE PENYELESAIAN PERMASALAHAN       */}
      {/* MODEL SHEET SWAP: GRAFIK TREN vs TABEL DETAIL 7 ATRIBUT RESMI SATU DATA   */}
      {/* ATRIBUT: NAMA PERUSAHAAN | DOKUMEN PERIZINAN | DOKUMEN PENDUKUNG |        */}
      {/*          WILAYAH | LUAS YANG DITERBITKAN | TRIWULAN | TAHUN               */}
      {/* ========================================================================= */}
      {(!focusedDataset || focusedDataset === 1) && (
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
        {/* Standardized Visual Header with Sheet Swap Controls */}
        <PesisirVisualHeader
          datasetNumber={1}
          pdfPages="Hal. 13 - 14"
          title="PERSENTASE PENYELESAIAN PERMASALAHAN PESISIR DAN REKLAMASI"
          visualName={
            dataset1Sheet === 'grafik'
              ? 'Sheet 1: Visualisasi Grafik - Tren Triwulan & Luas Area Ditangani'
              : 'Sheet 2: Tabel Detail Info - 7 Atribut Dokumen Satu Data'
          }
          classification="TERBUKA"
          attributes={[
            'NAMA PERUSAHAAN',
            'DOKUMEN PERIZINAN',
            'DOKUMEN PENDUKUNG',
            'WILAYAH',
            'LUAS YANG DITERBITKAN',
            'TRIWULAN',
            'TAHUN',
          ]}
          rightControls={
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setDataset1Sheet('grafik')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  dataset1Sheet === 'grafik'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Sheet 1: Visualisasi Grafik</span>
              </button>
              <button
                onClick={() => setDataset1Sheet('tabel')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  dataset1Sheet === 'tabel'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Sheet 2: Tabel Detail (7 Atribut)</span>
              </button>
            </div>
          }
          onOpenFormula={() => onOpenFormulaModal('kpi_penyelesaian_masalah')}
        />

        {/* SHEET 1: VISUALISASI GRAFIK */}
        {dataset1Sheet === 'grafik' && (
          <div className="space-y-4">
            {/* Mini Summary Strip Dataset #1 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-amber-50/40 rounded-xl border border-amber-100 text-xs">
              <div>
                <span className="text-slate-500 block text-[10.5px]">Tingkat Penyelesaian</span>
                <span className="text-base font-mono font-black text-amber-900">{persenSelesai}%</span>
                <span className="text-[10px] text-amber-700 block mt-0.5">{totalKasusSelesai} dari {filteredPermasalahan.length} kasus tuntas</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Total Luas Ditangani</span>
                <span className="text-base font-mono font-black text-slate-900">{totalLuasKasusTertangani.toFixed(1)} Ha</span>
                <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">{(totalLuasKasusTertangani * 10000).toLocaleString('id-ID')} m²</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Frekuensi Pelaporan</span>
                <span className="text-sm font-mono font-bold text-slate-800">Pertriwulan (TW I - IV)</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Data Statistik Berkala</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Klasifikasi Data</span>
                <span className="text-sm font-mono font-bold text-emerald-800">TERBUKA</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5 font-semibold">Tervalidasi PPNS BP Batam</span>
              </div>
            </div>

            {/* 2 Charts Grid: Tren Triwulan & Luas Area Terdampak Kasus */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Chart 1: Tren Persentase Penyelesaian Kasus per Triwulan */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold text-slate-800">
                      Tren Capaian Persentase Penyelesaian Masalah per Triwulan
                    </span>
                    <p className="text-[10.5px] text-slate-500">
                      Pemantauan aduan masyarakat, pelanggaran sempadan, dan penertiban alur laut
                    </p>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-500">Satuan: %</span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={TREN_TRIWULAN_MASALAH} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="triwulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                      <YAxis domain={[75, 100]} tick={{ fontSize: 11, fill: '#64748B' }} unit="%" />
                      <Tooltip
                        formatter={(val: any) => [`${val}%`, 'Persentase Selesai']}
                        contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                      <Line type="monotone" dataKey="persenSelesai" name="% Penyelesaian Masalah" stroke="#D97706" strokeWidth={2.5} dot={{ r: 4, fill: '#D97706' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Luas yang Diterbitkan/Ditangani per Triwulan */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold text-slate-800">
                      Luas Area yang Ditangani (Ha)
                    </span>
                    <p className="text-[10.5px] text-slate-500">
                      Akumulasi luasan ruang pesisir yang dipulihkan per triwulan
                    </p>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-500">Satuan: Ha</span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={TREN_TRIWULAN_MASALAH} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="triwulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Ha" />
                      <Tooltip
                        formatter={(val: any) => [`${val} Ha`, 'Luas Ditangani']}
                        contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                      />
                      <Bar dataKey="luasTerdampakHa" name="Luas yang Ditangani (Ha)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SHEET 2: TABEL DETAIL INFO (SESUAI 7 ATRIBUT DOKUMEN SATU DATA) */}
        {dataset1Sheet === 'tabel' && (
          <div className="space-y-3">
            {/* Toolbar: Search, Filters, and Sorting */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
              <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari Nama Perusahaan, Dokumen Perizinan, Dokumen Pendukung, Wilayah..."
                    value={searchMasalah}
                    onChange={(e) => setSearchMasalah(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-semibold">Triwulan:</span>
                  <select
                    value={filterTriwulan}
                    onChange={(e) => setFilterTriwulan(e.target.value)}
                    className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
                  >
                    <option value="ALL">Semua Triwulan</option>
                    <option value="Triwulan I">Triwulan I</option>
                    <option value="Triwulan II">Triwulan II</option>
                    <option value="Triwulan III">Triwulan III</option>
                    <option value="Triwulan IV">Triwulan IV</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-semibold">Urutkan:</span>
                  <select
                    value={sortMasalah}
                    onChange={(e: any) => setSortMasalah(e.target.value)}
                    className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
                  >
                    <option value="luas-desc">Luas Terbesar (Ha)</option>
                    <option value="luas-asc">Luas Terkecil (Ha)</option>
                    <option value="nama">Nama Perusahaan (A-Z)</option>
                    <option value="tahun">Tahun Terbaru</option>
                  </select>
                </div>

                <span className="text-[11px] text-slate-500 font-mono px-2 py-0.5 bg-white border border-slate-200 rounded">
                  {filteredPermasalahan.length} Data Kasus
                </span>
              </div>
            </div>

            {/* Table Detail: 7 Atribut Resmi Sesuai Gambar 1 */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3 font-mono">NO</th>
                      <th className="py-2.5 px-3 text-amber-950 font-bold bg-amber-50/60">
                        1. NAMA PERUSAHAAN
                      </th>
                      <th className="py-2.5 px-3 text-amber-950 font-bold bg-amber-50/60">
                        2. DOKUMEN PERIZINAN
                      </th>
                      <th className="py-2.5 px-3 text-amber-950 font-bold bg-amber-50/60">
                        3. DOKUMEN PENDUKUNG
                      </th>
                      <th className="py-2.5 px-3 text-amber-950 font-bold bg-amber-50/60">
                        4. WILAYAH
                      </th>
                      <th className="py-2.5 px-3 text-right text-amber-950 font-bold bg-amber-50/60">
                        5. LUAS YANG DITERBITKAN
                      </th>
                      <th className="py-2.5 px-3 text-center text-amber-950 font-bold bg-amber-50/60">
                        6. TRIWULAN
                      </th>
                      <th className="py-2.5 px-3 text-center text-amber-950 font-bold bg-amber-50/60">
                        7. TAHUN
                      </th>
                      <th className="py-2.5 px-3 text-center">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredPermasalahan.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                        <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-slate-900">{item.namaPerusahaan}</div>
                          {item.judulKasus && (
                            <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                              Kasus: {item.judulKasus}
                            </div>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <FileCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span className="font-mono text-[11px] text-slate-800 font-semibold">
                              {item.dokumenPerizinan}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-start gap-1.5 max-w-xs">
                            <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span className="text-[11px] text-slate-700 leading-snug">
                              {item.dokumenPendukung}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-semibold text-[10.5px]">
                            {item.wilayah}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono">
                          <span className="font-bold text-amber-900 block text-xs">
                            {(item.luasYangDiterbitkan || item.luasDiterbitkanHa).toFixed(1)} Ha
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {((item.luasYangDiterbitkan || item.luasDiterbitkanHa) * 10000).toLocaleString('id-ID')} m²
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono">
                          <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded font-bold text-[10.5px]">
                            {item.triwulan}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-800">
                          {item.tahun}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              item.status === 'Selesai'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DATASET #3: PERSENTASE PERIZINAN SELESAI TEPAT WAKTU (STANDAR SLA)     */}
      {/* MODEL SHEET SWAP: GRAFIK TREN vs TABEL DETAIL 3 ATRIBUT RESMI SATU DATA   */}
      {/* ATRIBUT: JUMLAH PERMOHONAN | TOTAL LUASAN | TAHUN (DATA STATISTIK PERTAHUN)*/}
      {/* ========================================================================= */}
      {(!focusedDataset || focusedDataset === 3) && (
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
        {/* Standardized Visual Header with Sheet Swap Controls */}
        <PesisirVisualHeader
          datasetNumber={3}
          pdfPages="Hal. 14"
          title="PERSENTASE PERIZINAN PESISIR DAN REKLAMASI YANG SELESAI TEPAT WAKTU"
          visualName={
            dataset3Sheet === 'grafik'
              ? 'Sheet 1: Visualisasi Grafik - Tren Permohonan & Kepatuhan SLA vs Akumulasi Luasan'
              : 'Sheet 2: Tabel Detail Info - 3 Atribut Dokumen Satu Data'
          }
          classification="TERBUKA"
          attributes={['JUMLAH PERMOHONAN', 'TOTAL LUASAN', 'TAHUN']}
          rightControls={
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setDataset3Sheet('grafik')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  dataset3Sheet === 'grafik'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Sheet 1: Visualisasi Grafik</span>
              </button>
              <button
                onClick={() => setDataset3Sheet('tabel')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  dataset3Sheet === 'tabel'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Sheet 2: Tabel Detail (3 Atribut)</span>
              </button>
            </div>
          }
          onOpenFormula={() => onOpenFormulaModal('kpi_sla_perizinan')}
        />

        {/* SHEET 1: VISUALISASI GRAFIK */}
        {dataset3Sheet === 'grafik' && (
          <div className="space-y-4">
            {/* Mini Summary Strip Dataset #3 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 text-xs">
              <div>
                <span className="text-slate-500 block text-[10.5px]">Rata-rata Capaian SLA</span>
                <span className="text-base font-mono font-black text-emerald-800">92,4%</span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">Standar Target: &ge; 90,0% SLA</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Total Permohonan Masuk</span>
                <span className="text-base font-mono font-black text-slate-900">343 Berkas</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">317 Selesai &le; 14 Hari Kerja</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Total Luasan Dimohonkan</span>
                <span className="text-base font-mono font-black text-slate-900">1.820,5 Ha</span>
                <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">{(1820.5 * 10000).toLocaleString('id-ID')} m²</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10.5px]">Standar Waktu Proses</span>
                <span className="text-sm font-mono font-bold text-slate-800">&le; 14 Hari Kerja</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5 font-semibold">Pelayanan Terpadu BP Batam</span>
              </div>
            </div>

            {/* 2 Charts: Tren Jumlah Permohonan vs Tepat Waktu & Total Luasan per Tahun */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Chart 1: Tren Permohonan & Kepatuhan SLA */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold text-slate-800">
                      Tren Tahunan: Jumlah Permohonan Masuk vs Selesai Tepat Waktu
                    </span>
                    <p className="text-[10.5px] text-slate-500">
                      Evaluasi kepatuhan SLA proses verifikasi dokumen teknis perizinan
                    </p>
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Target: &ge; 90%
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATASET_3_REKAP_TAHUNAN} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="tahun" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Berkas" />
                      <Tooltip
                        formatter={(val: any, name: any) => [
                          `${val} Berkas`,
                          name === 'jumlahPermohonan' ? 'Total Permohonan' : 'Selesai Tepat Waktu',
                        ]}
                        contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                      <Bar dataKey="jumlahPermohonan" name="Total Permohonan Masuk" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="jumlahTepatWaktu" name="Selesai Tepat Waktu (SLA)" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Total Luasan yang Dimohonkan vs Disetujui (Ha) */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold text-slate-800">
                      Total Luasan Perizinan per Tahun (Ha)
                    </span>
                    <p className="text-[10.5px] text-slate-500">
                      Akumulasi luasan ruang perairan dan reklamasi yang diverifikasi
                    </p>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-500">Satuan: Ha</span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATASET_3_REKAP_TAHUNAN} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                      <defs>
                        <linearGradient id="colorLuas3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="tahun" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Ha" />
                      <Tooltip
                        formatter={(val: any) => [`${val} Ha`, 'Total Luasan']}
                        contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                      />
                      <Area type="monotone" dataKey="totalLuasanHa" name="Total Luasan (Ha)" stroke="#059669" fillOpacity={1} fill="url(#colorLuas3)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SHEET 2: TABEL DETAIL INFO (SESUAI 3 ATRIBUT DOKUMEN SATU DATA) */}
        {dataset3Sheet === 'tabel' && (
          <div className="space-y-4">
            {/* Tabel Utama: 3 Atribut Resmi Sesuai Gambar 2 (TAHUN, JUMLAH PERMOHONAN, TOTAL LUASAN) */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-emerald-50/70 px-3.5 py-2.5 border-b border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-950">
                    Tabel Rekapitulasi Tahunan (3 Atribut Dokumen Satu Data)
                  </span>
                  <p className="text-[11px] text-emerald-700">
                    Menampilkan data statistik pertahun kepatuhan SLA perizinan pesisir &amp; reklamasi
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  SLA: &le; 14 Hari Kerja
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-4 text-emerald-950 font-bold bg-emerald-50/60">
                        1. TAHUN
                      </th>
                      <th className="py-2.5 px-4 text-right text-emerald-950 font-bold bg-emerald-50/60">
                        2. JUMLAH PERMOHONAN
                      </th>
                      <th className="py-2.5 px-4 text-right text-emerald-950 font-bold bg-emerald-50/60">
                        3. TOTAL LUASAN
                      </th>
                      <th className="py-2.5 px-4 text-right text-slate-700">
                        SELESAI TEPAT WAKTU
                      </th>
                      <th className="py-2.5 px-4 text-right text-slate-700">
                        % TEPAT WAKTU (SLA)
                      </th>
                      <th className="py-2.5 px-4 text-center text-slate-700">
                        STATUS CAPAIAN
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-xs">
                    {filteredRekapTahunan.map((item) => (
                      <tr key={item.tahun} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                          {item.tahun}
                        </td>
                        <td className="py-3 px-4 text-right font-black text-slate-800">
                          {item.jumlahPermohonan} Berkas
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-black text-emerald-900 block text-xs">
                            {item.totalLuasanHa.toLocaleString('id-ID')} Ha
                          </span>
                          <span className="text-[10px] text-slate-400 block font-normal">
                            {(item.totalLuasanHa * 10000).toLocaleString('id-ID')} m²
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-emerald-700">
                          {item.jumlahTepatWaktu} Berkas
                        </td>
                        <td className="py-3 px-4 text-right font-black text-emerald-800">
                          {item.persentaseTepatWaktu.toFixed(1)}%
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            MEMENUHI SLA
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sub-Tabel Drilldown: Log Berkas Permohonan Individual & Pelacakan SLA */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-slate-50 px-3.5 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Log Pemantauan Berkas Permohonan &amp; Realisasi SLA (14 Hari Kerja)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari pemohon / jenis izin..."
                      value={searchPermohonan}
                      onChange={(e) => setSearchPermohonan(e.target.value)}
                      className="pl-7 pr-2.5 py-1 bg-white border border-slate-200 rounded text-[11px] focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <select
                    value={filterStatusSla}
                    onChange={(e: any) => setFilterStatusSla(e.target.value)}
                    className="bg-white border border-slate-200 rounded px-2 py-1 text-[11px] text-slate-700"
                  >
                    <option value="ALL">Semua Status SLA</option>
                    <option value="Tepat Waktu">Tepat Waktu</option>
                    <option value="Terlambat">Terlambat</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2 px-3 font-mono">No</th>
                      <th className="py-2 px-3">No. Berkas Permohonan</th>
                      <th className="py-2 px-3">Nama Pemohon (Perusahaan)</th>
                      <th className="py-2 px-3">Jenis Izin</th>
                      <th className="py-2 px-3">Wilayah</th>
                      <th className="py-2 px-3 text-right">Luas Dimohonkan (Ha)</th>
                      <th className="py-2 px-3 text-center">Realisasi vs Target SLA</th>
                      <th className="py-2 px-3 text-center">Status Waktu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredPermohonanDetail.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2 px-3 font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-2 px-3 font-mono text-[11px] font-semibold text-slate-800">
                          {item.noIzin}
                        </td>
                        <td className="py-2 px-3 font-bold text-slate-900">
                          {item.namaPemohon}
                        </td>
                        <td className="py-2 px-3 text-slate-700 text-[11px]">
                          {item.jenisIzin}
                        </td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10.5px]">
                            {item.wilayah}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-emerald-900">
                          {item.luasHa.toFixed(1)} Ha
                        </td>
                        <td className="py-2 px-3 text-center font-mono text-[11px]">
                          <span className="font-bold text-slate-800">{item.realisasiHari} hari</span>
                          <span className="text-slate-400 text-[10px] ml-1">(target &le; 14)</span>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              item.statusWaktu === 'Tepat Waktu'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {item.statusWaktu}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
};
