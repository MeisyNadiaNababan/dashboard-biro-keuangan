import React, { useState, useMemo } from 'react';
import {
  PDSI_DATA_LAYANAN_TI,
  PDSI_PERMINTAAN_LAYANAN_TI,
  BCARE_44_SUB_LAYANAN,
  PdsiDataLayananItem,
  PdsiPermintaanLayananItem,
  PdsiBcareSubLayananRecord,
} from '../../data/pdsiData';
import {
  Headphones,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowRightLeft,
  BarChart3,
  PieChart as PieChartIcon,
  Table as TableIcon,
  Layers,
  Activity,
  CheckSquare,
  ListFilter,
  FileText,
} from 'lucide-react';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

type ActiveServiceSheet = 'data_layanan' | 'permintaan_layanan';

interface PdsiItServicesConsolidatedSwapProps {
  onOpenFormulaModal?: (metricId: string) => void;
}

export const PdsiItServicesConsolidatedSwap: React.FC<PdsiItServicesConsolidatedSwapProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<ActiveServiceSheet>('data_layanan');
  const [displayMode, setDisplayMode] = useState<'both' | 'chart' | 'table'>('both');
  const [katalogSubView, setKatalogSubView] = useState<'rekap' | 'rincian44'>('rekap');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculations for Data Layanan TI
  const totalLayanan = useMemo(() => PDSI_DATA_LAYANAN_TI.reduce((acc, l) => acc + l.jumlah, 0), []);

  // Calculations for Permintaan Layanan TI
  const totalPermintaan = useMemo(() => PDSI_PERMINTAAN_LAYANAN_TI.reduce((acc, p) => acc + p.jumlah, 0), []);
  const totalSelesai = useMemo(() => PDSI_PERMINTAAN_LAYANAN_TI.reduce((acc, p) => acc + p.selesai, 0), []);
  const totalDalamProses = totalPermintaan - totalSelesai;
  const tingkatPenyelesaianAll = Math.round((totalSelesai / totalPermintaan) * 1000) / 10;

  // Filtered Data Layanan (8 Kategori Rekap)
  const filteredDataLayanan = useMemo(() => {
    if (!searchQuery.trim()) return PDSI_DATA_LAYANAN_TI;
    const q = searchQuery.toLowerCase();
    return PDSI_DATA_LAYANAN_TI.filter(
      (l) =>
        l.namaLayanan.toLowerCase().includes(q) ||
        l.kategori.toLowerCase().includes(q) ||
        l.kode.toLowerCase().includes(q) ||
        l.subditPengelola.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filtered Rincian 44 Sub Layanan Bcare
  const filteredBcareSubLayanan = useMemo(() => {
    if (!searchQuery.trim()) return BCARE_44_SUB_LAYANAN;
    const q = searchQuery.toLowerCase();
    return BCARE_44_SUB_LAYANAN.filter(
      (b) =>
        b.namaLayanan.toLowerCase().includes(q) ||
        b.namaSubLayanan.toLowerCase().includes(q) ||
        b.kode.toLowerCase().includes(q) ||
        b.kategoriTingkat.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filtered Permintaan Layanan
  const filteredPermintaan = useMemo(() => {
    if (!searchQuery.trim()) return PDSI_PERMINTAAN_LAYANAN_TI;
    const q = searchQuery.toLowerCase();
    return PDSI_PERMINTAAN_LAYANAN_TI.filter(
      (p) =>
        p.namaLayanan.toLowerCase().includes(q) ||
        p.kategoriPrioritas.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* 1. Header Bar with Sheet Swap Tabs */}
      <div className="bg-slate-50/90 border-b border-slate-200 px-4 py-3 sm:px-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#1F4E79] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                POIN #10
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                Data Layanan TI & Permintaan Layanan TI
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Konsolidasi Katalog Layanan (44 Sub-Layanan) & Permintaan Layanan (544 Tiket Bcare) • Model Sheet Swap
            </p>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs text-xs font-medium">
            <button
              onClick={() => setDisplayMode('both')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                displayMode === 'both' ? 'bg-[#1F4E79] text-white font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Visual & Tabel</span>
            </button>
            <button
              onClick={() => setDisplayMode('chart')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                displayMode === 'chart' ? 'bg-[#1F4E79] text-white font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PieChartIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grafis Saja</span>
            </button>
            <button
              onClick={() => setDisplayMode('table')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                displayMode === 'table' ? 'bg-[#1F4E79] text-white font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tabel Saja</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Tableau Sheet Swap Switcher Ribbon */}
      <div className="bg-slate-100/70 border-b border-slate-200 px-4 py-2 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#1F4E79]" />
            Sheet Swap:
          </span>

          <button
            onClick={() => setActiveSheet('data_layanan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 border ${
              activeSheet === 'data_layanan'
                ? 'bg-[#1F4E79] text-white border-[#1F4E79] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Data Layanan TI</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                activeSheet === 'data_layanan' ? 'bg-blue-900/60 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {totalLayanan} Sub-Layanan
            </span>
          </button>

          <button
            onClick={() => setActiveSheet('permintaan_layanan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 border ${
              activeSheet === 'permintaan_layanan'
                ? 'bg-[#1F4E79] text-white border-[#1F4E79] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Permintaan Layanan TI</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                activeSheet === 'permintaan_layanan' ? 'bg-blue-900/60 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {totalPermintaan} Tiket
            </span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="w-full sm:w-60">
          <input
            type="text"
            placeholder="Cari dalam sheet ini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-1 focus:ring-[#1F4E79] focus:border-[#1F4E79]"
          />
        </div>
      </div>

      {/* 3. Sheet Swap Content Body */}
      <div className="p-4 sm:p-5">
        {/* ======================================================== */}
        {/* SHEET 1: DATA LAYANAN TI (Katalog Layanan Resmi Bcare)   */}
        {/* ======================================================== */}
        {activeSheet === 'data_layanan' && (
          <div className="space-y-4">
            <TableauShelvesBadge
              showMe="Show Me #2 (Horizontal Categorical Bars & Matrix) — Nama Layanan x Jumlah"
              columns="[Nama Layanan], [Kategori], [Kode ITSM]"
              rows="SUM([Jumlah Sub Layanan])"
              filters="[Status]='Katalog Resmi Bcare PDSI BP Batam'"
              detail="Sheet Swap 1: Rekapitulasi Data Layanan TI & Rincian 44 Katalog Sub-Layanan BP Batam"
            />

            {/* Quick KPI Summary Badges for Data Layanan (Tepat 2 KPI Sesuai Permintaan) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-blue-900 block">Total Katalog Layanan TI</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-blue-950 block mt-0.5">
                  {totalLayanan} <span className="text-xs font-normal">Sub-Layanan</span>
                </span>
                <span className="text-[10.5px] text-blue-700 mt-0.5 block">Katalog Resmi Standar Layanan TIK BP Batam</span>
              </div>
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-emerald-900 block">Kelompok Kategori Layanan TI</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-950 block mt-0.5">
                  {PDSI_DATA_LAYANAN_TI.length} <span className="text-xs font-normal">Kategori Utama</span>
                </span>
                <span className="text-[10.5px] text-emerald-700 mt-0.5 block">Penanganan Insiden, Data, Keamanan, Jaringan &amp; SI</span>
              </div>
            </div>

            {/* Sub-view Switcher: Rekap per Kategori vs Rincian 44 Sub-Layanan */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider">Format Tampilan:</span>
                <button
                  onClick={() => setKatalogSubView('rekap')}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer border ${
                    katalogSubView === 'rekap'
                      ? 'bg-[#1F4E79] text-white border-[#1F4E79]'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  Rekap Kategori ({PDSI_DATA_LAYANAN_TI.length} Kelompok)
                </button>
                <button
                  onClick={() => setKatalogSubView('rincian44')}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer border flex items-center gap-1 ${
                    katalogSubView === 'rincian44'
                      ? 'bg-[#1F4E79] text-white border-[#1F4E79]'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>Daftar 44 Sub-Layanan (Sesuai Dokumen Bcare)</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                {katalogSubView === 'rekap' ? '8 Kategori Layanan' : '44 Sub-Layanan Terdaftar'}
              </span>
            </div>

            {/* VISUAL CHART: Horizontal Bars for Data Layanan */}
            {(displayMode === 'both' || displayMode === 'chart') && katalogSubView === 'rekap' && (
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Visual Distribusi Data Layanan TI BP Batam (Kategori x Jumlah Sub-Layanan)
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">Total {totalLayanan} Sub-Layanan</span>
                </div>

                <div className="space-y-3">
                  {filteredDataLayanan.map((item) => {
                    const maxJumlah = Math.max(...PDSI_DATA_LAYANAN_TI.map((d) => d.jumlah));
                    const widthPercent = (item.jumlah / maxJumlah) * 100;

                    return (
                      <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                {item.kode}
                              </span>
                              <span className="text-xs font-bold text-slate-900">{item.namaLayanan}</span>
                            </div>
                            <span className="text-[11px] text-slate-500 block mt-0.5">{item.subditPengelola}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-black text-[#1F4E79]">
                              {item.jumlah} Sub-Layanan
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                              {item.kategori}
                            </span>
                          </div>
                        </div>

                        {/* Bar */}
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#1F4E79] h-full rounded-full transition-all duration-500"
                            style={{ width: `${widthPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STRUCTURED TABLE: NAMA LAYANAN DAN JUMLAH */}
            {(displayMode === 'both' || displayMode === 'table') && katalogSubView === 'rekap' && (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Tabel Rekapitulasi Data Layanan TI (Kategori Layanan dan Jumlah)
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Wajib Menampilkan: Nama Layanan dan Jumlah
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#1F4E79] text-white font-bold text-[11px] uppercase tracking-wider">
                        <th className="px-3.5 py-2.5 text-center w-12 border-r border-blue-800">No</th>
                        <th className="px-3.5 py-2.5 text-center w-20 border-r border-blue-800">Kode</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-800">Nama Layanan</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Jumlah Sub-Layanan</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-800">Kategori</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-800">Contoh Sub-Layanan Terdaftar</th>
                        <th className="px-3.5 py-2.5">Subdit Pengelola</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredDataLayanan.map((item, idx) => (
                        <tr key={item.id} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-slate-50/60 hover:bg-blue-50/40'}>
                          <td className="px-3.5 py-2.5 text-center font-mono font-bold text-slate-600 border-r border-slate-200">
                            {idx + 1}
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-bold text-blue-800 border-r border-slate-200">
                            {item.kode}
                          </td>
                          <td className="px-3.5 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                            {item.namaLayanan}
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-black text-[#1F4E79] border-r border-slate-200 bg-blue-50/40">
                            {item.jumlah} Layanan
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-700 font-medium border-r border-slate-200">
                            {item.kategori}
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-600 text-[11px] border-r border-slate-200">
                            {item.subLayananContoh}
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-600">
                            {item.subditPengelola}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                        <td className="px-3.5 py-2.5 text-center font-mono border-r border-slate-200" colSpan={3}>
                          Total Keseluruhan Katalog Data Layanan TI BP Batam
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-[#1F4E79] border-r border-slate-200">
                          {totalLayanan} Sub-Layanan
                        </td>
                        <td className="px-3.5 py-2.5 text-slate-600 font-normal" colSpan={3}>
                          8 Kelompok Layanan Resmi Standar ITSM PDSI BP Batam
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* TABEL RINCIAN 44 SUB LAYANAN BCARE (PERSIS SEPERTI DOKUMEN PDF LAMPIRAN) */}
            {katalogSubView === 'rincian44' && (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Katalog Lengkap 44 Sub-Layanan TI pada Bcare BP Batam
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Dokumen Resmi Bcare: Data Layanan TI (44 Record)
                  </span>
                </div>
                <div className="overflow-x-auto max-h-[480px]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="sticky top-0 z-10">
                      <tr className="bg-[#1F4E79] text-white font-bold text-[11px] uppercase tracking-wider">
                        <th className="px-3.5 py-2.5 text-center w-14 border-r border-blue-800">_id</th>
                        <th className="px-3.5 py-2.5 text-center w-24 border-r border-blue-800">KODE</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-800">NAMA LAYANAN</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-800">NAMA SUB LAYANAN</th>
                        <th className="px-3.5 py-2.5 text-center">KATEGORI PRIORITAS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredBcareSubLayanan.map((row, idx) => (
                        <tr key={row.id} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-slate-50/60 hover:bg-blue-50/40'}>
                          <td className="px-3.5 py-2 text-center font-mono font-bold text-slate-500 border-r border-slate-200">
                            {row.id}
                          </td>
                          <td className="px-3.5 py-2 text-center font-mono font-bold text-blue-900 border-r border-slate-200 bg-blue-50/30">
                            {row.kode}
                          </td>
                          <td className="px-3.5 py-2 font-semibold text-slate-800 border-r border-slate-200">
                            {row.namaLayanan}
                          </td>
                          <td className="px-3.5 py-2 font-medium text-slate-900 border-r border-slate-200">
                            {row.namaSubLayanan}
                          </td>
                          <td className="px-3.5 py-2 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                                row.kategoriTingkat === 'Tinggi'
                                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                                  : 'bg-blue-50 text-blue-700 border-blue-200'
                              }`}
                            >
                              {row.kategoriTingkat}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="sticky bottom-0 bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                      <tr>
                        <td className="px-3.5 py-2.5 text-center font-mono border-r border-slate-200" colSpan={3}>
                          Total Sub-Layanan Terdaftar pada Portal Bcare
                        </td>
                        <td className="px-3.5 py-2.5 font-mono text-[#1F4E79] border-r border-slate-200">
                          {filteredBcareSubLayanan.length} dari 44 Sub-Layanan Aktif
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-emerald-700">
                          100% Terstandar
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SHEET 2: PERMINTAAN LAYANAN TI (Statistik Tiket Bcare)   */}
        {/* ======================================================== */}
        {activeSheet === 'permintaan_layanan' && (
          <div className="space-y-4">
            <TableauShelvesBadge
              showMe="Show Me #2 (Comparative Horizontal Progress Bar) — Nama Layanan x Tiket Selesai vs Proses"
              columns="[Nama Layanan]"
              rows="SUM([Tiket Masuk]), SUM([Selesai])"
              filters="[Sumber]='Bcare BP Batam', [Status]='Helpdesk PDSI'"
              detail="Sheet Swap 2: Statistik Permintaan Layanan TI Masuk (544 Tiket) & Capaian Penyelesaian"
            />

            {/* Quick KPI Summary Badges for Permintaan Layanan (Tepat 2 KPI Sesuai Permintaan) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-blue-900 block">Total Permintaan Layanan TI</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-blue-950 block mt-0.5">
                  {totalPermintaan} <span className="text-xs font-normal">Tiket Masuk</span>
                </span>
                <span className="text-[10.5px] text-blue-700 mt-0.5 block">Akumulasi Seluruh Kategori Permintaan Layanan Bcare</span>
              </div>
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-emerald-900 block">Tingkat Penyelesaian &amp; Tiket Selesai</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-950 block mt-0.5">
                  {totalSelesai} <span className="text-xs font-normal">Tiket ({tingkatPenyelesaianAll}%)</span>
                </span>
                <span className="text-[10.5px] text-emerald-700 mt-0.5 block">{totalDalamProses} Tiket Masih Dalam Proses Pengerjaan</span>
              </div>
            </div>

            {/* VISUAL CHART: Horizontal Bars for Permintaan Layanan */}
            {(displayMode === 'both' || displayMode === 'chart') && (
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Visual Permintaan Layanan TI & Tingkat Penyelesaian (544 Tiket)
                  </h4>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#1F4E79]" />
                      <span className="text-slate-600 font-medium">Selesai</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
                      <span className="text-slate-600 font-medium">Dalam Proses</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredPermintaan.map((item) => {
                    const selesaiWidth = (item.selesai / item.jumlah) * 100;
                    const prosesWidth = (item.dalamProses / item.jumlah) * 100;

                    return (
                      <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                          <div>
                            <span className="text-xs font-bold text-slate-900">{item.namaLayanan}</span>
                            <span className="text-[11px] text-slate-500 block">
                              Prioritas: {item.kategoriPrioritas} • Durasi Rata-rata: {item.waktuRataRata}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-black text-[#1F4E79]">
                              {item.jumlah} Tiket
                            </span>
                            <span className="text-[11px] font-black font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {item.tingkatPenyelesaian}% Selesai
                            </span>
                          </div>
                        </div>

                        {/* Visual Bar */}
                        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
                          <div
                            className="bg-[#1F4E79] h-full flex items-center justify-center text-[9px] text-white font-mono font-bold transition-all duration-500"
                            style={{ width: `${selesaiWidth}%` }}
                            title={`Selesai: ${item.selesai} (${item.tingkatPenyelesaian}%)`}
                          />
                          {item.dalamProses > 0 && (
                            <div
                              className="bg-amber-500 h-full flex items-center justify-center text-[9px] text-white font-mono transition-all duration-500"
                              style={{ width: `${prosesWidth}%` }}
                              title={`Dalam Proses: ${item.dalamProses}`}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STRUCTURED TABLE: NAMA LAYANAN DAN JUMLAH */}
            {(displayMode === 'both' || displayMode === 'table') && (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Tabel Rekapitulasi Permintaan Layanan TI
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Wajib Menampilkan: Nama Layanan dan Jumlah
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#1F4E79] text-white font-bold text-[11px] uppercase tracking-wider">
                        <th className="px-3.5 py-2.5 text-center w-12 border-r border-blue-800">No</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-800">Nama Layanan</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Jumlah Tiket</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Selesai</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Dalam Proses</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Capaian (%)</th>
                        <th className="px-3.5 py-2.5 text-center">Durasi Rata-rata</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredPermintaan.map((item, idx) => (
                        <tr key={item.id} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-slate-50/60 hover:bg-blue-50/40'}>
                          <td className="px-3.5 py-2.5 text-center font-mono font-bold text-slate-600 border-r border-slate-200">
                            {idx + 1}
                          </td>
                          <td className="px-3.5 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                            {item.namaLayanan}
                            <span className="text-[10px] text-slate-400 block font-normal mt-0.5">
                              Tingkat Prioritas: {item.kategoriPrioritas}
                            </span>
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-black text-[#1F4E79] border-r border-slate-200 bg-blue-50/40">
                            {item.jumlah} Tiket
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-bold text-emerald-700 border-r border-slate-200">
                            {item.selesai}
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono text-amber-700 border-r border-slate-200">
                            {item.dalamProses}
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-black border-r border-slate-200">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {item.tingkatPenyelesaian}%
                            </span>
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono text-slate-700">
                            {item.waktuRataRata}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                        <td className="px-3.5 py-2.5 text-center font-mono border-r border-slate-200" colSpan={2}>
                          Total Keseluruhan Permintaan Layanan TI Masuk
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-[#1F4E79] border-r border-slate-200">
                          {totalPermintaan} Tiket
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-emerald-700 border-r border-slate-200">
                          {totalSelesai} Tiket
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-amber-700 border-r border-slate-200">
                          {totalDalamProses} Tiket
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-emerald-700 border-r border-slate-200">
                          {tingkatPenyelesaianAll}%
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-slate-600 font-normal">
                          Helpdesk Bcare BP Batam
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

