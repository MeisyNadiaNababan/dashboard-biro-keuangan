import React, { useState } from 'react';
import { X, Search, Table, FileSpreadsheet, Database, Layers, Check, Copy } from 'lucide-react';
import {
  REVENUE_DATA,
  EXPENSE_DATA,
  RECEIVABLES_DATA,
  RECEIVABLES_TOTAL,
  SALDO_BANK_REAL_TIME_DATA,
  RINCIAN_TARGET_PNBP_DATA,
  REKAPITULASI_TARGET_PNBP_DATA,
  LAPORAN_REALISASI_ANGGARAN_BLU_DATA,
  REKAPITULASI_PAGU_ANGGARAN_DATA,
  REKAPITULASI_MUTASI_PIUTANG_DATA,
  REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA,
  REKAPITULASI_DAFTAR_PIUTANG_DATA,
  REKAPITULASI_UMUR_PIUTANG_DATA,
  LAPORAN_PENERIMAAN_SUMBER_DANA_DATA,
  BIRO_KEUANGAN_DATA_CATALOG
} from '../../data/mockData';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

export type ModalType = 'pendapatan' | 'belanja' | 'piutang' | 'kas_bank' | 'data_catalog' | null;

interface DetailModalProps {
  type: ModalType;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ type, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subTab, setSubTab] = useState<string>('default');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen || !type) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const modalTitles: Record<NonNullable<ModalType>, { title: string; subtitle: string }> = {
    pendapatan: {
      title: 'Tableau View Data — Target & Realisasi PNBP (Biro Keuangan)',
      subtitle: 'Sinkronisasi Tabel Item 7 (Rincian Target) & Item 8 (Rekapitulasi Target) SIMKEU BP Batam',
    },
    belanja: {
      title: 'Tableau View Data — Laporan Realisasi & Pagu Anggaran BLU',
      subtitle: 'Sinkronisasi Tabel Item 3 & 12 (Laporan Realisasi) & Item 23 (Rekapitulasi Pagu DIPA)',
    },
    piutang: {
      title: 'Tableau View Data — Rekapitulasi Piutang & Aging Schedule',
      subtitle: 'Sinkronisasi Tabel Item 17 (Umur), Item 18 (Mutasi Faktur) & Item 20 (Piutang Tak Tertagih PUPN)',
    },
    kas_bank: {
      title: 'Tableau View Data — Laporan Saldo Bank Real Time & Sumber Dana',
      subtitle: 'Sinkronisasi Tabel Item 13 (Laporan Saldo Bank Real Time) & Item 14 (Penerimaan Sumber Dana)',
    },
    data_catalog: {
      title: 'Katalog Data & Atribut Database Resmi Biro Keuangan BP Batam',
      subtitle: '28 Tabel dan Atribut Data Sesuai Dokumen Master Katalog Data BP Batam',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-sans select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container - Tableau "View Data" Window */}
      <div className="relative bg-white shadow-2xl rounded-2xl border border-slate-200/90 max-w-6xl w-full max-h-[92vh] flex flex-col z-10 overflow-hidden">
        {/* Tableau Dialog Header */}
        <div className="px-5 py-3.5 bg-[#001D3D] text-white flex items-center justify-between border-b border-[#001429]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
              <Table className="w-4 h-4 text-sky-300" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wide block">
                {modalTitles[type].title}
              </span>
              <span className="text-[11px] text-sky-200/80 block">
                {modalTitles[type].subtitle}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/15 text-slate-300 hover:text-white rounded-md cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-Tabs Shelf (Table Selector) */}
        <div className="bg-slate-100/90 px-5 py-2 border-b border-slate-200 flex items-center gap-2 text-xs overflow-x-auto">
          {type === 'pendapatan' && (
            <>
              <button
                onClick={() => setSubTab('default')}
                className={`px-3 py-1 font-semibold border-b-2 cursor-pointer transition-colors ${
                  subTab === 'default'
                    ? 'border-[#1F3864] text-[#1F3864] bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Item 8: Rekapitulasi Target PNBP
              </button>
              <button
                onClick={() => setSubTab('rincian')}
                className={`px-3 py-1 font-semibold border-b-2 cursor-pointer transition-colors ${
                  subTab === 'rincian'
                    ? 'border-[#1F3864] text-[#1F3864] bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Item 7: Rincian Target PNBP (Tarif & Volume)
              </button>
            </>
          )}

          {type === 'belanja' && (
            <>
              <button
                onClick={() => setSubTab('default')}
                className={`px-3 py-1 font-semibold border-b-2 cursor-pointer transition-colors ${
                  subTab === 'default'
                    ? 'border-[#1F3864] text-[#1F3864] bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Item 3 &amp; 12: Realisasi Anggaran BLU
              </button>
              <button
                onClick={() => setSubTab('pagu')}
                className={`px-3 py-1 font-semibold border-b-2 cursor-pointer transition-colors ${
                  subTab === 'pagu'
                    ? 'border-[#1F3864] text-[#1F3864] bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Item 23: Rekapitulasi Pagu Anggaran (Sumber Dana)
              </button>
            </>
          )}

          {type === 'piutang' && (
            <>
              <button
                onClick={() => setSubTab('default')}
                className={`px-3 py-1 font-semibold border-b-2 cursor-pointer transition-colors ${
                  subTab === 'default'
                    ? 'border-[#1F3864] text-[#1F3864] bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Item 18: Mutasi Piutang Per Faktur
              </button>
              <button
                onClick={() => setSubTab('tak_tertagih')}
                className={`px-3 py-1 font-semibold border-b-2 cursor-pointer transition-colors ${
                  subTab === 'tak_tertagih'
                    ? 'border-[#1F3864] text-[#1F3864] bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Item 20: Piutang Tak Tertagih (PUPN/KPKNL)
              </button>
              <button
                onClick={() => setSubTab('kategori')}
                className={`px-3 py-1 font-semibold border-b-2 cursor-pointer transition-colors ${
                  subTab === 'kategori'
                    ? 'border-[#1F3864] text-[#1F3864] bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Item 17: Rekapitulasi Umur Piutang (Aging)
              </button>
              <button
                onClick={() => setSubTab('daftar_piutang')}
                className={`px-3 py-1 font-semibold border-b-2 cursor-pointer transition-colors ${
                  subTab === 'daftar_piutang'
                    ? 'border-[#1F3864] text-[#1F3864] bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Item 21: Rekapitulasi Daftar Piutang
              </button>
            </>
          )}

          {type === 'kas_bank' && (
            <>
              <button
                onClick={() => setSubTab('default')}
                className={`px-3 py-1 font-semibold border-b-2 cursor-pointer transition-colors ${
                  subTab === 'default'
                    ? 'border-[#1F3864] text-[#1F3864] bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Item 13: Saldo Bank Real Time
              </button>
              <button
                onClick={() => setSubTab('sumber_dana')}
                className={`px-3 py-1 font-semibold border-b-2 cursor-pointer transition-colors ${
                  subTab === 'sumber_dana'
                    ? 'border-[#1F3864] text-[#1F3864] bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Item 14: Laporan Penerimaan Sumber Dana
              </button>
            </>
          )}

          {type === 'data_catalog' && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
              <Database className="w-3.5 h-3.5 text-[#1F3864]" />
              <span>Daftar 28 Tabel Database &amp; Kamus Atribut Biro Keuangan BP Batam</span>
            </div>
          )}
        </div>

        {/* Search & Export Toolbar */}
        <div className="px-4 py-2 bg-[#F8F9FA] border-b border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan atribut / unit / rekening / kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-300 pl-8 pr-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#4E79A7]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-[11px] text-slate-500 font-mono">
              Database: PostgreSQL / SIMKEU BP Batam
            </span>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV / Print</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 bg-white">
          {/* PENDAPATAN */}
          {type === 'pendapatan' && (
            <div>
              {/* Summary KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4 font-mono text-xs">
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    SUM([Realisasi PNBP 2026])
                  </span>
                  <p className="text-xl font-black text-[#2B542C] mt-0.5">Rp 981,20 M</p>
                  <span className="text-[11px] text-slate-500">40,1% Capaian Perkin</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    SUM([Target PNBP Resmi])
                  </span>
                  <p className="text-xl font-black text-slate-800 mt-0.5">Rp 2.447,46 M</p>
                  <span className="text-[11px] text-slate-500">Target DIPA 2026</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    PNBP Biro Keuangan
                  </span>
                  <p className="text-xl font-black text-[#1F3864] mt-0.5">Rp 21,50 M</p>
                  <span className="text-[11px] text-slate-500">46,0% dari Rp 46,72 M</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    Tabel Database
                  </span>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    {subTab === 'rincian' ? 'keu_target_pnbp_rincian' : 'keu_target_pnbp_rekap'}
                  </p>
                  <span className="text-[11px] text-slate-500">Item 7 &amp; 8 Katalog</span>
                </div>
              </div>

              {subTab === 'default' ? (
                /* Item 8: Rekapitulasi Target PNBP */
                <>
                  <TableauShelvesBadge
                    className="mb-2.5"
                    showMe="Show Me #1 (Crosstab / Text Table)"
                    rows="[kodeKegiatan], [namaUnit], [namaLayanan]"
                    columns="SUM([jumlah]), SUM([realisasi]), AGG([capaian])"
                    color="[Status Capaian]"
                    detail="Item 8 Katalog Data (keu_target_pnbp_rekap)"
                  />
                  <div className="overflow-x-auto border border-slate-300">
                  <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                    <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300">
                      <tr>
                        <th className="py-2 px-3 border-r border-slate-300 font-mono text-center">TAHUN</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-mono">KODE KEGIATAN</th>
                        <th className="py-2 px-3 border-r border-slate-300">NAMA UNIT</th>
                        <th className="py-2 px-3 border-r border-slate-300">NAMA LAYANAN</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">JUMLAH (TARGET)</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">REALISASI</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">% CAPAIAN</th>
                        <th className="py-2 px-3 text-center">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono text-xs">
                      {REKAPITULASI_TARGET_PNBP_DATA.filter((i) =>
                        i.namaUnit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        i.namaLayanan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        i.kodeKegiatan.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((item) => (
                        <tr key={item.kodeKegiatan} className="hover:bg-slate-50">
                          <td className="py-2 px-3 text-center font-mono text-slate-700 border-r border-slate-200">
                            {item.tahun || 2026}
                          </td>
                          <td className="py-2 px-3 font-bold text-[#1F3864] border-r border-slate-200">
                            {item.kodeKegiatan}
                          </td>
                          <td className="py-2 px-3 font-sans font-semibold text-slate-900 border-r border-slate-200">
                            {item.namaUnit}
                          </td>
                          <td className="py-2 px-3 font-sans text-slate-700 border-r border-slate-200">
                            {item.namaLayanan}
                          </td>
                          <td className="py-2 px-3 text-right text-slate-800 border-r border-slate-200 font-bold">
                            {item.jumlahDisplay}
                          </td>
                          <td className="py-2 px-3 text-right text-[#2B542C] border-r border-slate-200 font-bold">
                            Rp {item.realisasi.toFixed(2)} M
                          </td>
                          <td className="py-2 px-3 text-right border-r border-slate-200 font-bold text-slate-900">
                            {item.capaian.toFixed(1)}%
                          </td>
                          <td className="py-2 px-3 text-center font-sans">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                                item.capaian >= 40
                                  ? 'bg-[#EBF3E8] text-[#2B542C] border border-[#59A14F]/40'
                                  : 'bg-[#FDEDEC] text-[#922B21] border border-[#E15759]/40'
                              }`}
                            >
                              {item.capaian >= 40 ? 'On Track' : 'Perlu Pacu'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
              ) : (
                /* Item 7: Rincian Target PNBP */
                <>
                  <TableauShelvesBadge
                    className="mb-2.5"
                    showMe="Show Me #1 (Crosstab / Text Table)"
                    rows="[kode], [pengguna], [satuan]"
                    columns="SUM([tarif]), SUM([volume]), SUM([jumlah])"
                    filters="[tahun]"
                    detail="Item 7 Katalog Data (keu_target_pnbp_rincian)"
                  />
                  <div className="overflow-x-auto border border-slate-300">
                  <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                    <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300">
                      <tr>
                        <th className="py-2 px-3 border-r border-slate-300 font-mono">KODE</th>
                        <th className="py-2 px-3 border-r border-slate-300">PENGGUNA</th>
                        <th className="py-2 px-3 text-center border-r border-slate-300 font-mono">MATA UANG</th>
                        <th className="py-2 px-3 border-r border-slate-300">SATUAN</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">TARIF</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">VOLUME</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">JUMLAH (RP M)</th>
                        <th className="py-2 px-3 text-center font-mono">TAHUN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono text-xs">
                      {RINCIAN_TARGET_PNBP_DATA.filter((i) =>
                        i.pengguna.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        i.kode.includes(searchTerm)
                      ).map((item) => (
                        <tr key={item.kode} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-bold text-[#1F3864] border-r border-slate-200">
                            {item.kode}
                          </td>
                          <td className="py-2 px-3 font-sans font-semibold text-slate-900 border-r border-slate-200">
                            {item.pengguna}
                          </td>
                          <td className="py-2 px-3 text-center text-slate-700 border-r border-slate-200">
                            {item.mataUang}
                          </td>
                          <td className="py-2 px-3 font-sans text-slate-700 border-r border-slate-200">
                            {item.satuan}
                          </td>
                          <td className="py-2 px-3 text-right text-slate-800 border-r border-slate-200">
                            {item.tarif > 1000 ? `Rp ${item.tarif.toLocaleString('id-ID')}` : `${(item.tarif * 100).toFixed(1)}%`}
                          </td>
                          <td className="py-2 px-3 text-right text-slate-700 border-r border-slate-200">
                            {item.volume.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-[#2B542C] border-r border-slate-200">
                            {item.jumlahDisplay}
                          </td>
                          <td className="py-2 px-3 text-center text-slate-600">
                            {item.tahun}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
              )}
            </div>
          )}

          {/* BELANJA */}
          {type === 'belanja' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4 font-mono text-xs">
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    SUM([Realisasi Belanja])
                  </span>
                  <p className="text-xl font-black text-[#1F3864] mt-0.5">Rp 945,0 M</p>
                  <span className="text-[11px] text-slate-500">28,5% Serapan Pagu</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    SUM([Pagu DIPA 2026])
                  </span>
                  <p className="text-xl font-black text-slate-800 mt-0.5">Rp 3,32 T</p>
                  <span className="text-[11px] text-slate-500">Sisa Pagu: Rp 2,37 T</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    AVG([Indeks IKPA])
                  </span>
                  <p className="text-xl font-black text-[#F28E2B] mt-0.5">92,4</p>
                  <span className="text-[11px] text-slate-500">Kemenkeu Target &ge;90</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    Tabel Database
                  </span>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    {subTab === 'pagu' ? 'keu_rekap_pagu_anggaran' : 'keu_laporan_realisasi_anggaran_blu'}
                  </p>
                  <span className="text-[11px] text-slate-500">Item 3, 12 &amp; 23 Katalog</span>
                </div>
              </div>

              {subTab === 'default' ? (
                /* Item 3 & 12: Realisasi Anggaran BLU */
                <>
                  <TableauShelvesBadge
                    className="mb-2.5"
                    showMe="Show Me #1 (Crosstab / Text Table)"
                    rows="[jenisAnggaran], [kategori], [uraian]"
                    columns="SUM([anggaran]), SUM([realisasi]), AGG([persentase])"
                    filters="[tahun], [triwulan]"
                    detail="Item 3 & 12 Katalog Data (keu_laporan_realisasi_anggaran_blu)"
                  />
                  <div className="overflow-x-auto border border-slate-300">
                  <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                    <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300">
                      <tr>
                        <th className="py-2 px-3 border-r border-slate-300">JENIS ANGGARAN</th>
                        <th className="py-2 px-3 border-r border-slate-300">KATEGORI</th>
                        <th className="py-2 px-3 border-r border-slate-300">URAIAN</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-mono">TRIWULAN</th>
                        <th className="py-2 px-3 text-center border-r border-slate-300 font-mono">TAHUN</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">ANGGARAN (RP M)</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">REALISASI (RP M)</th>
                        <th className="py-2 px-3 text-right font-mono">PERSENTASE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono text-xs">
                      {LAPORAN_REALISASI_ANGGARAN_BLU_DATA.filter((i) =>
                        i.uraian.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        i.kategori.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-sans font-bold text-[#1F3864] border-r border-slate-200">
                            {item.jenisAnggaran}
                          </td>
                          <td className="py-2 px-3 font-sans text-slate-800 border-r border-slate-200">
                            {item.kategori}
                          </td>
                          <td className="py-2 px-3 font-sans text-slate-700 border-r border-slate-200">
                            {item.uraian}
                          </td>
                          <td className="py-2 px-3 text-slate-600 border-r border-slate-200">
                            {item.triwulan}
                          </td>
                          <td className="py-2 px-3 text-center text-slate-600 border-r border-slate-200">
                            {item.tahun}
                          </td>
                          <td className="py-2 px-3 text-right text-slate-800 border-r border-slate-200 font-bold">
                            Rp {item.anggaran.toFixed(1)} M
                          </td>
                          <td className="py-2 px-3 text-right text-[#1F3864] border-r border-slate-200 font-bold">
                            Rp {item.realisasi.toFixed(1)} M
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-slate-900">
                            {item.persentase.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
              ) : (
                /* Item 23: Rekapitulasi Pagu Anggaran */
                <>
                  <TableauShelvesBadge
                    className="mb-2.5"
                    showMe="Show Me #1 (Crosstab / Text Table)"
                    rows="[kodeKegiatan], [namaKegiatan]"
                    columns="SUM([sumberDanaPnbp]), SUM([sumberDanaRm]), SUM([sumberDanaPhln]), SUM([jumlah])"
                    filters="[tahun]"
                    detail="Item 23 Katalog Data (keu_rekap_pagu_anggaran)"
                  />
                  <div className="overflow-x-auto border border-slate-300">
                  <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                    <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300">
                      <tr>
                        <th className="py-2 px-3 text-center border-r border-slate-300 font-mono">TAHUN</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-mono">KODE KEGIATAN</th>
                        <th className="py-2 px-3 border-r border-slate-300">NAMA KEGIATAN</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">SUMBER DANA_PNBP</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">SUMBER DANA_RM</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">SUMBER DANA_PHLN</th>
                        <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">JUMLAH (RP M)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono text-xs">
                      {REKAPITULASI_PAGU_ANGGARAN_DATA.filter((i) =>
                        i.namaKegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        i.kodeKegiatan.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((item) => (
                        <tr key={item.kodeKegiatan} className="hover:bg-slate-50">
                          <td className="py-2 px-3 text-center text-slate-600 border-r border-slate-200">
                            {item.tahun}
                          </td>
                          <td className="py-2 px-3 font-bold text-[#1F3864] border-r border-slate-200">
                            {item.kodeKegiatan}
                          </td>
                          <td className="py-2 px-3 font-sans font-semibold text-slate-900 border-r border-slate-200">
                            {item.namaKegiatan}
                          </td>
                          <td className="py-2 px-3 text-right text-slate-800 border-r border-slate-200">
                            Rp {item.sumberDanaPnbp.toFixed(1)} M
                          </td>
                          <td className="py-2 px-3 text-right text-slate-800 border-r border-slate-200">
                            Rp {item.sumberDanaRm.toFixed(1)} M
                          </td>
                          <td className="py-2 px-3 text-right text-slate-600 border-r border-slate-200">
                            Rp {item.sumberDanaPhln.toFixed(1)} M
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-slate-900 border-r border-slate-200">
                            Rp {item.jumlah.toFixed(1)} M
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
              )}
            </div>
          )}

          {/* PIUTANG */}
          {type === 'piutang' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4 font-mono text-xs">
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    SUM([Nilai Piutang])
                  </span>
                  <p className="text-xl font-black text-[#E15759] mt-0.5">
                    Rp {RECEIVABLES_TOTAL.nilaiPiutang.toFixed(1)} M
                  </p>
                  <span className="text-[11px] text-slate-500">Seluruh Wilayah BP Batam</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    SUM([Jumlah Debitur])
                  </span>
                  <p className="text-xl font-black text-slate-800 mt-0.5">
                    {RECEIVABLES_TOTAL.jumlahDebitur} Mitra
                  </p>
                  <span className="text-[11px] text-slate-500">Faktur Terbit Aktif</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    Piutang Macet PUPN
                  </span>
                  <p className="text-xl font-black text-[#E15759] mt-0.5">Rp 26,4 M</p>
                  <span className="text-[11px] text-slate-500">Proses Penyerahan KPKNL</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    Tabel Database
                  </span>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    {subTab === 'tak_tertagih'
                      ? 'keu_piutang_tak_tertagih'
                      : subTab === 'daftar_piutang'
                      ? 'keu_rekap_daftar_piutang'
                      : subTab === 'kategori'
                      ? 'keu_rekap_umur_piutang'
                      : 'keu_mutasi_piutang_faktur'}
                  </p>
                  <span className="text-[11px] text-slate-500">Item 17, 18, 20 &amp; 21 Katalog</span>
                </div>
              </div>

              {subTab === 'default' && (
                /* Item 18: Mutasi Piutang Per Faktur */
                <>
                  <TableauShelvesBadge
                    className="mb-2.5"
                    showMe="Show Me #1 (Crosstab / Text Table)"
                    rows="[namaPelanggan], [fakturTerbit]"
                    columns="SUM([saldoAwal]), SUM([bayarFaktur]), SUM([saldoAkhir]), AVG([umurPiutang])"
                    color="[Status Tindak Lanjut]"
                    detail="Item 18 Katalog Data (keu_mutasi_piutang_faktur)"
                  />
                  <div className="overflow-x-auto border border-slate-300">
                    <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                      <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300">
                        <tr>
                          <th className="py-2 px-3 border-r border-slate-300">NAMA PELANGGAN</th>
                          <th className="py-2 px-3 border-r border-slate-300 font-mono">FAKTUR TERBIT</th>
                          <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">SALDO AWAL</th>
                          <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">BAYAR FAKTUR</th>
                          <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">SALDO AKHIR</th>
                          <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">UMUR PIUTANG</th>
                          <th className="py-2 px-3 text-center">STATUS TINDAK LANJUT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono text-xs">
                        {REKAPITULASI_MUTASI_PIUTANG_DATA.filter((i) =>
                          i.namaPelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.fakturTerbit.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-sans font-bold text-slate-900 border-r border-slate-200">
                              {item.namaPelanggan}
                            </td>
                            <td className="py-2 px-3 text-[#1F3864] border-r border-slate-200 font-bold">
                              {item.fakturTerbit}
                            </td>
                            <td className="py-2 px-3 text-right text-slate-700 border-r border-slate-200">
                              Rp {item.saldoAwal.toFixed(2)} M
                            </td>
                            <td className="py-2 px-3 text-right text-[#2B542C] border-r border-slate-200 font-bold">
                              Rp {item.bayarFaktur.toFixed(2)} M
                            </td>
                            <td className="py-2 px-3 text-right text-[#E15759] border-r border-slate-200 font-bold">
                              Rp {item.saldoAkhir.toFixed(2)} M
                            </td>
                            <td className="py-2 px-3 text-right border-r border-slate-200 font-bold text-slate-800">
                              {item.umurPiutang} Hari
                            </td>
                            <td className="py-2 px-3 text-center font-sans">
                              <span
                                className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                                  item.umurPiutang > 90
                                    ? 'bg-[#FDEDEC] text-[#922B21] border border-[#E15759]/40'
                                    : 'bg-[#FEF9E7] text-[#7D6608] border border-[#F28E2B]/40'
                                }`}
                              >
                                {item.umurPiutang > 90 ? 'Peringatan III' : 'Penagihan Terjadwal'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {subTab === 'tak_tertagih' && (
                /* Item 20: Piutang Tak Tertagih */
                <>
                  <TableauShelvesBadge
                    className="mb-2.5"
                    showMe="Show Me #1 (Crosstab / Text Table)"
                    rows="[nomorFaktur], [namaPelanggan]"
                    columns="SUM([jumlahPiutangKoreksiKpknl]), SUM([perhitunganDenda]), SUM([saldoPiutangTakTertagih])"
                    detail="Item 20 Katalog Data (keu_piutang_tak_tertagih)"
                  />
                  <div className="overflow-x-auto border border-slate-300">
                    <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                      <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300">
                        <tr>
                          <th className="py-2 px-3 border-r border-slate-300 font-mono">NOMOR FAKTUR</th>
                          <th className="py-2 px-3 border-r border-slate-300 font-mono">TGL TERBIT</th>
                          <th className="py-2 px-3 border-r border-slate-300">NAMA PELANGGAN</th>
                          <th className="py-2 px-3 border-r border-slate-300 font-mono">JATUH TEMPO</th>
                          <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">KOREKSI KPKNL</th>
                          <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">DENDA</th>
                          <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">BAYAR FAKTUR</th>
                          <th className="py-2 px-3 text-right font-mono">SALDO TAK TERTAGIH</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono text-xs">
                        {REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA.filter((i) =>
                          i.namaPelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.nomorFaktur.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((item) => (
                          <tr key={item.nomorFaktur} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-bold text-[#1F3864] border-r border-slate-200">
                              {item.nomorFaktur}
                            </td>
                            <td className="py-2 px-3 text-slate-600 border-r border-slate-200">
                              {item.tanggalTerbitFaktur}
                            </td>
                            <td className="py-2 px-3 font-sans font-bold text-slate-900 border-r border-slate-200">
                              {item.namaPelanggan}
                            </td>
                            <td className="py-2 px-3 text-slate-600 border-r border-slate-200">
                              {item.tanggalJatuhTempo}
                            </td>
                            <td className="py-2 px-3 text-right text-slate-800 border-r border-slate-200">
                              Rp {item.jumlahPiutangKoreksiKpknl.toFixed(2)} M
                            </td>
                            <td className="py-2 px-3 text-right text-amber-700 border-r border-slate-200">
                              Rp {item.perhitunganDenda.toFixed(2)} M
                            </td>
                            <td className="py-2 px-3 text-right text-[#2B542C] border-r border-slate-200">
                              Rp {item.bayarFaktur.toFixed(2)} M
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-[#E15759]">
                              Rp {item.saldoPiutangTakTertagih.toFixed(2)} M
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {subTab === 'kategori' && (
                /* Item 17: Rekapitulasi Umur Piutang (Atribut Resmi + Calculated Field) */
                <>
                  <div className="mb-3 p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-950 leading-relaxed font-sans">
                    <strong className="text-blue-900 block font-bold">ℹ️ Penjelasan Sumber Atribut Data &amp; Calculated Field:</strong>
                    <p className="mt-1 text-slate-700">
                      Berdasarkan dokumen resmi <em>Atribut Daftar Data Satu Data BP Batam</em>, tabel <code>keu_rekap_umur_piutang</code> (Item 17) menyimpan 3 atribut fisik di database: <strong>NAMA PELANGGAN</strong>, <strong>JUMLAH PIUTANG TERTAGIH (RP M)</strong>, dan <strong>UMUR PIUTANG (HARI)</strong>.
                    </p>
                    <p className="mt-1 text-slate-700">
                      Kolom <strong>Kategori Aging Schedule</strong> dikelompokkan melalui <em>Calculated Field Tableau</em>: <br />
                      <code className="bg-white/80 px-1 py-0.5 rounded border border-blue-200 text-blue-800 font-mono text-[11px]">
                        IF [umur_piutang] &gt; 90 THEN '&gt; 90 Hari' ELSEIF [umur_piutang] &gt; 60 THEN '61-90 Hari' ELSEIF [umur_piutang] &gt; 30 THEN '31-60 Hari' ELSE '0-30 Hari' END
                      </code>
                    </p>
                  </div>

                  <TableauShelvesBadge
                    className="mb-2.5"
                    showMe="Show Me #1 (Crosstab / Text Table)"
                    rows="[namaPelanggan], [kategoriCalculated]"
                    columns="SUM([jumlahPiutangTertagih]), AVG([umurPiutang])"
                    color="[kategoriCalculated]"
                    detail="Item 17 Katalog Data (keu_rekap_umur_piutang)"
                  />
                  <div className="overflow-x-auto border border-slate-300">
                    <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                      <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300">
                        <tr>
                          <th className="py-2 px-3 border-r border-slate-300">NAMA PELANGGAN (DB)</th>
                          <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">JUMLAH PIUTANG (RP M)</th>
                          <th className="py-2 px-3 text-right border-r border-slate-300 font-mono">UMUR PIUTANG (HARI)</th>
                          <th className="py-2 px-3">KATEGORI AGING (CALCULATED)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono text-xs">
                        {REKAPITULASI_UMUR_PIUTANG_DATA.filter((i) =>
                          i.namaPelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.kategoriCalculated.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-sans font-bold text-slate-900 border-r border-slate-200">
                              {item.namaPelanggan}
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-[#E15759] border-r border-slate-200">
                              Rp {item.jumlahPiutangTertagih.toFixed(2)} M
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-slate-800 border-r border-slate-200">
                              {item.umurPiutang} Hari
                            </td>
                            <td className="py-2 px-3 font-sans">
                              <span
                                className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                                  item.umurPiutang > 90
                                    ? 'bg-[#FDEDEC] text-[#922B21] border border-[#E15759]/40'
                                    : item.umurPiutang > 60
                                    ? 'bg-[#FEF9E7] text-[#7D6608] border border-[#F28E2B]/40'
                                    : item.umurPiutang > 30
                                    ? 'bg-[#EBF3FB] text-[#1F3864] border border-[#4E79A7]/40'
                                    : 'bg-[#EBF3E8] text-[#2B542C] border border-[#59A14F]/40'
                                }`}
                              >
                                {item.kategoriCalculated}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {subTab === 'daftar_piutang' && (
                /* Item 21: Rekapitulasi Daftar Piutang (Atribut Asli Dokumen Satu Data) */
                <>
                  <div className="mb-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed font-sans">
                    <strong className="text-slate-900 block font-bold">ℹ️ Atribut Resmi Satu Data (Item 21 - keu_rekap_daftar_piutang):</strong>
                    <p className="mt-1 text-slate-600">
                      Tabel master ini memuat ringkasan piutang per unit kerja pengampu sesuai dokumen Atribut Daftar Data Satu Data BP Batam dengan 3 atribut resmi: <strong>UNIT USAHA</strong>, <strong>NAMA PELANGGAN</strong>, dan <strong>JUMLAH PIUTANG (RP M)</strong>.
                    </p>
                  </div>

                  <TableauShelvesBadge
                    className="mb-2.5"
                    showMe="Show Me #1 (Crosstab / Text Table)"
                    rows="[unitUsaha], [namaPelanggan]"
                    columns="SUM([jumlahPiutang])"
                    detail="Item 21 Katalog Data (keu_rekap_daftar_piutang)"
                  />
                  <div className="overflow-x-auto border border-slate-300">
                    <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                      <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300">
                        <tr>
                          <th className="py-2 px-3 border-r border-slate-300">UNIT USAHA (DB)</th>
                          <th className="py-2 px-3 border-r border-slate-300">NAMA PELANGGAN (DB)</th>
                          <th className="py-2 px-3 text-right font-mono">JUMLAH PIUTANG (RP M) (DB)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono text-xs">
                        {REKAPITULASI_DAFTAR_PIUTANG_DATA.filter((i) =>
                          i.unitUsaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.namaPelanggan.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-sans font-semibold text-[#1F3864] border-r border-slate-200">
                              {item.unitUsaha}
                            </td>
                            <td className="py-2 px-3 font-sans font-bold text-slate-900 border-r border-slate-200">
                              {item.namaPelanggan}
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-[#E15759]">
                              Rp {item.jumlahPiutang.toFixed(2)} M
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {/* KAS & BANK */}
          {type === 'kas_bank' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4 font-mono text-xs">
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    TOTAL KAS &amp; SETARA KAS
                  </span>
                  <p className="text-xl font-black text-slate-900 mt-0.5">Rp 1,52 T</p>
                  <span className="text-[11px] text-slate-500">Saldo Gabungan Mitra Bank</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    CASH COVERAGE RATIO
                  </span>
                  <p className="text-xl font-black text-[#4E79A7] mt-0.5">0,86</p>
                  <span className="text-[11px] text-[#2B542C] font-bold">Aman (Standar &ge;0,80)</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    KETAHANAN LIKUIDITAS
                  </span>
                  <p className="text-xl font-black text-[#2B542C] mt-0.5">5,2 Bulan</p>
                  <span className="text-[11px] text-slate-500">Operasional Rutin BP Batam</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">
                    Tabel Database
                  </span>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    {subTab === 'sumber_dana' ? 'keu_penerimaan_sumber_dana' : 'keu_saldo_bank_realtime'}
                  </p>
                  <span className="text-[11px] text-slate-500">Item 13 &amp; 14 Katalog</span>
                </div>
              </div>

              {subTab === 'default' ? (
                /* Item 13: Laporan Saldo Bank Real Time */
                <>
                  <TableauShelvesBadge
                    className="mb-2.5"
                    showMe="Show Me #1 (Crosstab / Text Table)"
                    rows="[namaBank], [unit], [nomorRekening], [kegunaanRekening]"
                    columns="SUM([nilai]), % of Total"
                    color="[kategoriRekening]"
                    detail="Item 13 Katalog Data (keu_saldo_bank_realtime)"
                  />
                  <div className="overflow-x-auto border border-slate-300">
                    <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                      <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300">
                        <tr>
                          <th className="py-2 px-3 border-r border-slate-300">NAMA BANK</th>
                          <th className="py-2 px-3 border-r border-slate-300">UNIT</th>
                          <th className="py-2 px-3 border-r border-slate-300">KATEGORI UNIT</th>
                          <th className="py-2 px-3 border-r border-slate-300 font-mono">NOMOR REKENING</th>
                          <th className="py-2 px-3 border-r border-slate-300">KEGUNAAN REKENING</th>
                          <th className="py-2 px-3 text-center border-r border-slate-300">KATEGORI REKENING</th>
                          <th className="py-2 px-3 text-center border-r border-slate-300 font-mono">TANGGAL REKAP</th>
                          <th className="py-2 px-3 text-right font-mono">NILAI (RP M)</th>
                          <th className="py-2 px-3 text-right font-mono pl-3">PORSI (%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono text-xs">
                        {SALDO_BANK_REAL_TIME_DATA.filter((i) =>
                          i.namaBank.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.nomorRekening.includes(searchTerm) ||
                          i.kegunaanRekening.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-sans font-bold text-slate-900 border-r border-slate-200">
                              {item.namaBank}
                            </td>
                            <td className="py-2 px-3 font-sans text-slate-800 border-r border-slate-200">
                              {item.unit}
                            </td>
                            <td className="py-2 px-3 font-sans text-slate-600 border-r border-slate-200 text-[11px]">
                              {item.kategoriUnit}
                            </td>
                            <td className="py-2 px-3 font-bold text-[#1F3864] border-r border-slate-200">
                              {item.nomorRekening}
                            </td>
                            <td className="py-2 px-3 font-sans text-slate-700 border-r border-slate-200 text-[11px]">
                              {item.kegunaanRekening}
                            </td>
                            <td className="py-2 px-3 text-center border-r border-slate-200 font-sans">
                              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-100 border border-slate-300 text-slate-700">
                                {item.kategoriRekening}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-center text-slate-600 border-r border-slate-200">
                              {item.tanggalRekap}
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-[#2B542C]">
                              {item.nilaiDisplay}
                            </td>
                            <td className="py-2 px-3 text-right text-slate-600 pl-3">
                              {item.porsiPersen.toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                /* Item 14: Laporan Penerimaan Sumber Dana */
                <>
                  <TableauShelvesBadge
                    className="mb-2.5"
                    showMe="Show Me #1 (Crosstab / Text Table)"
                    rows="[sumberDana], [unitKerja]"
                    columns="SUM([nilai])"
                    filters="[tanggalRekapAwal] - [tanggalRekapAkhir]"
                    detail="Item 14 Katalog Data (keu_penerimaan_sumber_dana)"
                  />
                  <div className="overflow-x-auto border border-slate-300">
                    <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                      <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300">
                        <tr>
                          <th className="py-2 px-3 border-r border-slate-300">SUMBER DANA</th>
                          <th className="py-2 px-3 border-r border-slate-300">UNIT KERJA</th>
                          <th className="py-2 px-3 text-center border-r border-slate-300 font-mono">TANGGAL REKAP AWAL</th>
                          <th className="py-2 px-3 text-center border-r border-slate-300 font-mono">TANGGAL REKAP AKHIR</th>
                          <th className="py-2 px-3 text-right font-mono">NILAI (RP M)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono text-xs">
                        {LAPORAN_PENERIMAAN_SUMBER_DANA_DATA.filter((i) =>
                          i.sumberDana.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.unitKerja.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-sans font-bold text-[#1F3864] border-r border-slate-200">
                              {item.sumberDana}
                            </td>
                            <td className="py-2 px-3 font-sans text-slate-800 border-r border-slate-200">
                              {item.unitKerja}
                            </td>
                            <td className="py-2 px-3 text-center text-slate-600 border-r border-slate-200">
                              {item.tanggalRekapAwal}
                            </td>
                            <td className="py-2 px-3 text-center text-slate-600 border-r border-slate-200">
                              {item.tanggalRekapAkhir}
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-[#2B542C]">
                              Rp {item.nilai.toFixed(1)} M
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {/* DATA CATALOG (28 TABLES) */}
          {type === 'data_catalog' && (
            <div className="space-y-4">
              <div className="bg-[#EBF3FB] border border-[#4E79A7]/30 p-3 text-xs text-slate-800 flex items-start gap-2.5">
                <Database className="w-4 h-4 text-[#1F3864] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-[#1F3864]">
                    Master Katalog Data &amp; Atribut Database Biro Keuangan BP Batam (28 Tabel)
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Setiap tabel di bawah ini diambil secara komprehensif dari dokumen resmi Master Katalog Data BP Batam (Halaman 2 sampai 6), mencakup tipe data statistik, periode, sifat data (Terbuka/Terbatas/Tertutup), dan semua atribut kolom database SIMKEU BP Batam.
                  </p>
                </div>
              </div>

              <TableauShelvesBadge
                className="mb-2.5"
                showMe="Show Me #1 (Master Data Schema Catalog)"
                rows="[tabelDatabase], [namaData]"
                columns="[jenisData], [periodeData], [sifatData]"
                detail="28 Tabel Database SIMKEU BP Batam"
              />

              <div className="overflow-x-auto border border-slate-300">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F2F4F7] font-bold text-slate-700 border-b border-slate-300">
                    <tr>
                      <th className="py-2 px-3 text-center border-r border-slate-300 font-mono w-12">NO</th>
                      <th className="py-2 px-3 border-r border-slate-300">NAMA DATA</th>
                      <th className="py-2 px-3 border-r border-slate-300 font-mono text-[11px]">JENIS DATA</th>
                      <th className="py-2 px-3 border-r border-slate-300 font-mono text-[11px]">PERIODE</th>
                      <th className="py-2 px-3 text-center border-r border-slate-300">SIFAT DATA</th>
                      <th className="py-2 px-3 border-r border-slate-300 font-mono text-[11px]">TABEL DATABASE (SQL)</th>
                      <th className="py-2 px-3">ATRIBUT DATA (KOLOM DATABASE)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {BIRO_KEUANGAN_DATA_CATALOG.filter((i) =>
                      i.namaData.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      i.tabelDatabase.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      i.atributData.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).map((item) => (
                      <tr key={item.no} className="hover:bg-slate-50">
                        <td className="py-2 px-3 text-center font-mono font-bold text-slate-600 border-r border-slate-200">
                          {item.no}
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-900 border-r border-slate-200">
                          {item.namaData}
                        </td>
                        <td className="py-2 px-3 font-mono text-[11px] text-slate-600 border-r border-slate-200">
                          {item.jenisData}
                        </td>
                        <td className="py-2 px-3 font-mono text-[11px] text-slate-600 border-r border-slate-200">
                          {item.periodeData}
                        </td>
                        <td className="py-2 px-3 text-center border-r border-slate-200">
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                              item.sifatData === 'TERBUKA'
                                ? 'bg-[#EBF3E8] text-[#2B542C] border border-[#59A14F]/40'
                                : item.sifatData === 'TERBATAS'
                                ? 'bg-[#FEF9E7] text-[#7D6608] border border-[#F28E2B]/40'
                                : 'bg-slate-100 text-slate-700 border border-slate-300'
                            }`}
                          >
                            {item.sifatData}
                          </span>
                        </td>
                        <td className="py-2 px-3 font-mono font-bold text-[#1F3864] text-[11px] border-r border-slate-200">
                          {item.tabelDatabase}
                        </td>
                        <td className="py-2 px-3 font-mono text-[11px] text-slate-700">
                          <div className="flex flex-wrap gap-1">
                            {item.atributData.map((attr, aIdx) => (
                              <span
                                key={aIdx}
                                className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 text-[10px]"
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
          )}
        </div>

        {/* Dialog Footer */}
        <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[11px] font-mono">
              Tableau Desktop &amp; Cloud View Data • Biro Keuangan BP Batam
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-bold text-slate-700 cursor-pointer shadow-2xs transition-colors"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
