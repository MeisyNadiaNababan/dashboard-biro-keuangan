import React, { useState } from 'react';
import {
  ArrowRight,
  Receipt,
  Building2,
  BarChart3,
  Layers,
  FileText,
  HelpCircle
} from 'lucide-react';
import {
  RECEIVABLES_DATA,
  RECEIVABLES_TOTAL,
  AGING_BUCKETS,
  SALDO_BANK_REAL_TIME_DATA,
  REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA
} from '../data/mockData';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface ReceivablesSectionProps {
  onViewPiutangDetail?: () => void;
  onViewKasBankDetail?: () => void;
  onExplainKpi?: (kpiId: string) => void;
}

export const ReceivablesSection: React.FC<ReceivablesSectionProps> = ({
  onViewPiutangDetail,
  onViewKasBankDetail,
  onExplainKpi,
}) => {
  const [bankViewMode, setBankViewMode] = useState<'bar' | 'table' | 'treemap'>('bar');
  const [piutangTab, setPiutangTab] = useState<'aging' | 'tak_tertagih'>('aging');

  return (
    <div className="space-y-5 font-sans select-none">
      {/* 1. SEKSI PIUTANG: SWAP TABEL DATA (MODE SWAP TANPA BUTTON DETAIL) */}
      <div id="piutang-section" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4">
        {/* Modern Executive Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#E15759]" />
              <span>MANAJEMEN PIUTANG &amp; AGING</span>
            </div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg sm:text-xl font-black text-[#002B49] tracking-tight">
                Monitoring Rekapitulasi Umur Piutang &amp; Mutasi Faktur
              </h3>
              {onExplainKpi && (
                <button
                  onClick={() => onExplainKpi('piutang')}
                  className="px-2.5 py-1 text-xs font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              305 Debitur Aktif di Seluruh Wilayah Kerja BP Batam (Item 18 Katalog Data)
            </p>
          </div>

          {/* Table Switcher Tabs: Hanya Distribusi Aging dan Rekapitulasi Piutang Tak Tertagih */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setPiutangTab('aging')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                piutangTab === 'aging'
                  ? 'bg-[#002B49] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Distribusi Aging</span>
            </button>
            <button
              onClick={() => setPiutangTab('tak_tertagih')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                piutangTab === 'tak_tertagih'
                  ? 'bg-[#002B49] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Piutang Tak Tertagih (Item 20)</span>
            </button>
          </div>
        </div>

        {/* Content: Selected Piutang View */}
        {piutangTab === 'aging' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Distribusi Umur Piutang (Aging Buckets)
              </div>
              <span className="text-xs font-mono text-slate-500">
                Total 4 Kategori Umur Piutang
              </span>
            </div>

            {/* Tableau Shelves Mapping Badge */}
            <TableauShelvesBadge
              showMe="Show Me #6 (Horizontal Bar)"
              rows="[range] (Umur Piutang)"
              columns="SUM([amount]), % of Total"
              color="[color] (Tingkat Risiko Umur)"
              text="SUM([amount]) & %"
            />

            {/* Aging Bar Chart - Compact Spacing */}
            <div className="rounded-xl border border-slate-200/80 divide-y divide-slate-100 text-xs overflow-hidden">
              {AGING_BUCKETS.map((bucket) => {
                const pct = (bucket.amount / RECEIVABLES_TOTAL.nilaiPiutang) * 100;

                return (
                  <div key={bucket.range} className="p-2.5 hover:bg-slate-50/70 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{bucket.range}</span>
                        <span className="text-[11px] text-slate-500 font-sans">
                          ({bucket.label})
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 font-mono text-xs">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          Rp {bucket.amount.toFixed(1)} M
                        </span>
                        <span className="text-slate-500 font-semibold">({pct.toFixed(1)}%)</span>
                      </div>
                    </div>

                    <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: bucket.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Footer Banner */}
            <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-1.5">
              <span className="font-sans font-bold text-slate-800">
                TOTAL OUTSTANDING PIUTANG:
              </span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#E15759] text-sm sm:text-base">
                  Rp {RECEIVABLES_TOTAL.nilaiPiutang.toFixed(1)} M
                </span>
                <span className="text-slate-500 font-sans text-xs">
                  ({RECEIVABLES_TOTAL.jumlahDebitur} Debitur Aktif)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Rekapitulasi Piutang Tak Tertagih (Item 20 Katalog Data SIMKEU BP Batam) */}
        {piutangTab === 'tak_tertagih' && (
          <div className="space-y-2.5">
            <TableauShelvesBadge
              showMe="Show Me #1 (Text Table / Crosstab)"
              rows="[nomorFaktur], [namaPelanggan]"
              columns="SUM([jumlahPiutang]), SUM([perhitunganDenda]), SUM([bayarFaktur]), SUM([saldoPiutangTakTertagih])"
              color="[saldoPiutangTakTertagih]"
              detail="Item 20 SIMKEU: Rekapitulasi Piutang Tak Tertagih (FBMS)"
            />
            <div className="overflow-x-auto max-h-[280px] overflow-y-auto rounded-xl border border-slate-200/80 shadow-2xs">
              <table className="w-full text-left text-xs border-collapse min-w-[760px]">
                <thead className="sticky top-0 z-10 bg-[#0B2545] text-white font-bold text-[10px] tracking-tight">
                  <tr>
                    <th className="py-2.5 px-2.5 border-r border-blue-900/60 text-center w-[16%]">
                      No Faktur &amp; Tgl
                    </th>
                    <th className="py-2.5 px-2.5 border-r border-blue-900/60 w-[24%]">
                      Nama Pelanggan
                    </th>
                    <th className="py-2.5 px-2 text-center border-r border-blue-900/60 w-[12%]">
                      Jatuh Tempo
                    </th>
                    <th className="py-2.5 px-2.5 border-r border-blue-900/60 text-right w-[12%]">
                      Jml Piutang (Rp M)
                    </th>
                    <th className="py-2.5 px-2.5 border-r border-blue-900/60 text-right w-[12%]">
                      Denda (+) (Rp M)
                    </th>
                    <th className="py-2.5 px-2.5 border-r border-blue-900/60 text-right w-[12%]">
                      Bayar (-) (Rp M)
                    </th>
                    <th className="py-2.5 px-2.5 text-right w-[12%]">
                      Saldo Piutang (Rp M)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
                  {REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA.map((item, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                      <tr
                        key={item.nomorFaktur}
                        className={`hover:bg-blue-50/60 transition-colors ${
                          isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                        }`}
                      >
                        <td className="py-2 px-2.5 border-r border-[#E2E8F0] text-center font-mono align-middle">
                          <div className="font-bold text-[#1F4E79]">{item.nomorFaktur}</div>
                          <div className="text-[10px] text-slate-400">{item.tanggalTerbitFaktur}</div>
                        </td>
                        <td className="py-2 px-2.5 border-r border-[#E2E8F0] font-semibold text-slate-900 align-middle">
                          {item.namaPelanggan}
                        </td>
                        <td className="py-2 px-2 border-r border-[#E2E8F0] text-center font-mono text-slate-600 align-middle text-[10.5px]">
                          {item.tanggalJatuhTempo}
                        </td>
                        <td className="py-2 px-2.5 border-r border-[#E2E8F0] text-right font-mono text-slate-700 align-middle">
                          Rp {item.jumlahPiutang.toFixed(2)} M
                        </td>
                        <td className="py-2 px-2.5 border-r border-[#E2E8F0] text-right font-mono text-amber-700 font-medium align-middle">
                          +Rp {item.perhitunganDenda.toFixed(2)} M
                        </td>
                        <td className="py-2 px-2.5 border-r border-[#E2E8F0] text-right font-mono text-[#59A14F] font-bold align-middle">
                          -Rp {item.bayarFaktur.toFixed(2)} M
                        </td>
                        <td className="py-2 px-2.5 text-right font-mono text-[#E15759] font-bold align-middle">
                          Rp {item.saldoPiutangTakTertagih.toFixed(2)} M
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-100 font-bold text-slate-800 text-[11px] border-t-2 border-slate-300">
                  <tr>
                    <td colSpan={3} className="py-2 px-2.5 text-right uppercase tracking-wider text-[10px] text-slate-600">
                      Total Rekapitulasi (Formula: Piutang + Denda - Bayar - Koreksi):
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono text-slate-800">
                      Rp {REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA.reduce((acc, r) => acc + r.jumlahPiutang, 0).toFixed(2)} M
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono text-amber-800">
                      +Rp {REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA.reduce((acc, r) => acc + r.perhitunganDenda, 0).toFixed(2)} M
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono text-[#2B542C]">
                      -Rp {REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA.reduce((acc, r) => acc + r.bayarFaktur, 0).toFixed(2)} M
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono text-[#E15759] text-xs">
                      Rp {REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA.reduce((acc, r) => acc + r.saldoPiutangTakTertagih, 0).toFixed(2)} M
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Tableau Server BI • Filter Debitur: Seluruh Wilayah Kerja BP Batam</span>
          <span className="font-mono text-slate-400">Sheet: Piutang &amp; Aging</span>
        </div>
      </div>

      {/* 2. SEKSI SALDO BANK OPERASIONAL (Item 13) */}
      <div id="kas-bank-section" className="space-y-6">
        {/* Saldo Kas & Rekening Bank Operasional (Item 13) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#4E79A7]" />
                <span>REKENING OPERASIONAL BANK</span>
              </div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg sm:text-xl font-bold text-[#002B49] tracking-tight">
                  Saldo Bank Real Time (Item 13)
                </h3>
                {onExplainKpi && (
                  <button
                    onClick={() => onExplainKpi('saldo_kas')}
                    className="px-2.5 py-1 text-xs font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Formula &amp; Insight</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Data Konsolidasi Rekening Bank Mitra BLU BP Batam • Tabel: <code>keu_saldo_bank_realtime</code>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1 bg-[#EBF3E8] text-[#2B542C] border border-[#59A14F]/40 text-xs font-bold uppercase font-mono rounded-full whitespace-nowrap">
                Likuiditas Prima
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Total Saldo Header - Spacious Banner */}
            <div className="p-3.5 sm:p-4 bg-slate-50/90 border border-slate-200/80 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Total Kas &amp; Setara Kas
                </span>
                <p className="text-2xl font-black text-[#002B49] font-mono mt-0.5">
                  Rp 1,52 T
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Coverage Ratio
                </span>
                <p className="text-sm font-extrabold text-[#4E79A7] font-mono mt-0.5">
                  1,4x <span className="text-xs font-normal text-slate-500">(Realisasi PNBP 981,2 / Belanja 945,0)</span>
                </p>
              </div>
            </div>

            {/* View Switcher: Authentic Tableau Worksheet Types */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs px-0.5 pt-0.5">
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="font-bold">Format Visualisasi Tableau:</span>
                <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Item 13 • Show Me
                </span>
              </div>
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px] font-medium border border-slate-200/70 self-start sm:self-auto">
                <button
                  onClick={() => setBankViewMode('bar')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    bankViewMode === 'bar'
                      ? 'bg-white text-[#002B49] font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Tableau Show Me #6: Horizontal Bar Chart"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Horizontal Bar</span>
                </button>
                <button
                  onClick={() => setBankViewMode('table')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    bankViewMode === 'table'
                      ? 'bg-white text-[#002B49] font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Tableau Show Me #1: Text Table / Crosstab"
                >
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Crosstab</span>
                </button>
                <button
                  onClick={() => setBankViewMode('treemap')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    bankViewMode === 'treemap'
                      ? 'bg-white text-[#002B49] font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Tableau Show Me #12: Treemap"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Treemap</span>
                </button>
              </div>
            </div>

            {/* Tableau Shelves Mapping Badge */}
            <TableauShelvesBadge
              showMe="Show Me #6 / #1 / #12"
              rows="[nama_bank]"
              columns="SUM([nilai])"
              color="[kategori_rekening]"
              detail="[nomor_rekening], [porsi_persen]"
              referenceLine="Markers at 200M, 400M, 600M"
            />

            {/* Mode 1: Tableau Horizontal Bar Chart (Standard Tableau Show Me #6) */}
            {bankViewMode === 'bar' && (
              <div className="border border-slate-200/80 rounded-xl p-4 bg-white space-y-3.5 shadow-2xs">
                {/* Horizontal Bars */}
                <div className="space-y-3">
                  {SALDO_BANK_REAL_TIME_DATA.map((bank) => {
                    // Maximum scale is 700 Miliar
                    const maxScale = 700;
                    const barPercent = Math.min(100, Math.max(8, (bank.nilai / maxScale) * 100));
                    
                    const colorClass =
                      bank.kategoriRekening === 'Penerimaan'
                        ? 'bg-[#59A14F]' // Tableau Green
                        : bank.kategoriRekening === 'Pengeluaran'
                        ? 'bg-[#E15759]' // Tableau Red
                        : bank.kategoriRekening === 'Operasional'
                        ? 'bg-[#4E79A7]' // Tableau Blue
                        : 'bg-[#B07AA1]'; // Tableau Purple

                    return (
                      <div key={bank.id} className="group relative space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{bank.namaBank}</span>
                            <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                              {bank.nomorRekening}
                            </span>
                          </div>
                          <div className="font-mono text-xs font-bold text-slate-900">
                            {bank.nilaiDisplay}{' '}
                            <span className="text-slate-400 font-normal">({bank.porsiPersen.toFixed(1)}%)</span>
                          </div>
                        </div>

                        {/* Bar Track with Tableau Color Mark */}
                        <div className="relative h-6 bg-slate-100 rounded flex items-center overflow-hidden">
                          {/* Vertical Grid Markers at 200M (28.5%), 400M (57.1%), 600M (85.7%) */}
                          <div className="absolute inset-y-0 left-[28.57%] border-r border-slate-200/60 z-0" />
                          <div className="absolute inset-y-0 left-[57.14%] border-r border-slate-200/60 z-0" />
                          <div className="absolute inset-y-0 left-[85.71%] border-r border-slate-200/60 z-0" />

                          {/* Bar */}
                          <div
                            className={`h-full ${colorClass} rounded-r transition-all duration-500 flex items-center px-2 z-10`}
                            style={{ width: `${barPercent}%` }}
                          >
                            <span className="text-[10px] font-bold text-white whitespace-nowrap drop-shadow-2xs">
                              {bank.kategoriRekening}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tableau Bottom X-Axis (0 to 700 Miliar) */}
                <div className="pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0 M</span>
                  <span>200 M</span>
                  <span>400 M</span>
                  <span>600 M</span>
                  <span>700 M (Rp Miliar)</span>
                </div>

                {/* Tableau Categorical Legend */}
                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-600 pt-1 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#59A14F]" />
                    <span>Penerimaan (Mandiri)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#E15759]" />
                    <span>Pengeluaran (BRI)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#4E79A7]" />
                    <span>Operasional (BNI)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#B07AA1]" />
                    <span>Deposito (BRK Syariah)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mode 2: Tableau Text Table / Crosstab (Standard Tableau Show Me #1) - Compact Scroll Container */}
            {bankViewMode === 'table' && (
              <div className="border border-slate-200/80 rounded-xl overflow-x-auto max-h-[260px] overflow-y-auto shadow-2xs">
                <table className="w-full text-left text-xs border-collapse min-w-[560px]">
                  <thead className="sticky top-0 z-10 bg-[#F1F5F9] font-bold text-slate-700 border-b border-slate-300 text-xs">
                    <tr>
                      <th className="py-2 px-2.5 whitespace-nowrap">Bank Mitra &amp; Rekening</th>
                      <th className="py-2 px-2.5 whitespace-nowrap">Kategori</th>
                      <th className="py-2 px-2.5">Kegunaan Rekening</th>
                      <th className="py-2 px-2 text-center font-mono text-[11px] whitespace-nowrap">Tgl Rekap</th>
                      <th className="py-2 px-2.5 text-right font-mono whitespace-nowrap">Saldo (Rp M)</th>
                      <th className="py-2 px-2.5 text-right font-mono whitespace-nowrap">Porsi (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 text-xs">
                    {SALDO_BANK_REAL_TIME_DATA.map((bank, idx) => (
                      <tr key={bank.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                        <td className="py-1.5 px-2.5 whitespace-nowrap">
                          <span className="font-bold text-slate-900 block">{bank.namaBank}</span>
                          <span className="text-[11px] text-[#002B49] font-mono">
                            {bank.nomorRekening}
                          </span>
                        </td>
                        <td className="py-1.5 px-2.5 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                              bank.kategoriRekening === 'Penerimaan'
                                ? 'bg-emerald-100 text-emerald-800'
                                : bank.kategoriRekening === 'Pengeluaran'
                                ? 'bg-rose-100 text-rose-800'
                                : bank.kategoriRekening === 'Deposito'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {bank.kategoriRekening}
                          </span>
                        </td>
                        <td className="py-1.5 px-2.5 text-slate-700 text-[11px]">
                          {bank.kegunaanRekening}
                        </td>
                        <td className="py-1.5 px-2 text-center font-mono text-[11px] text-slate-600 whitespace-nowrap">
                          {bank.tanggalRekap}
                        </td>
                        <td className="py-1.5 px-2.5 text-right font-mono font-bold text-slate-900 whitespace-nowrap text-xs sm:text-sm">
                          {bank.nilai.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-1.5 px-2.5 text-right font-mono text-slate-800 font-bold whitespace-nowrap">
                          {bank.porsiPersen.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Tableau Grand Total Row */}
                  <tfoot className="sticky bottom-0 bg-[#E2E8F0] font-bold text-slate-900 border-t-2 border-slate-300 text-xs">
                    <tr>
                      <td colSpan={4} className="py-2 px-2.5 text-slate-800 uppercase tracking-wider">
                        Grand Total Kas &amp; Setara Kas
                      </td>
                      <td className="py-2 px-2.5 text-right font-mono text-sm font-black text-[#002B49]">
                        1.520,00
                      </td>
                      <td className="py-2 px-2.5 text-right font-mono text-sm font-black text-[#002B49]">
                        100,0%
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {/* Mode 3: Tableau Treemap (Standard Tableau Show Me #12) */}
            {bankViewMode === 'treemap' && (
              <div className="border border-slate-200/80 rounded-xl p-3 bg-white space-y-3 shadow-2xs">
                <div className="grid grid-cols-12 gap-2 h-48">
                  {/* Bank Mandiri: 42.1% (5 cols) */}
                  <div className="col-span-12 sm:col-span-5 bg-[#59A14F] text-white p-3 rounded-lg flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-90 block">
                        Penerimaan PNBP
                      </span>
                      <h4 className="font-bold text-sm leading-tight mt-0.5">Bank Mandiri</h4>
                      <p className="text-[10px] font-mono opacity-80">109-00-1971202-6</p>
                    </div>
                    <div>
                      <p className="text-xl font-black font-mono">Rp 640,5 M</p>
                      <p className="text-[11px] font-medium opacity-90">Porsi: 42,1% dari Total Kas</p>
                    </div>
                  </div>

                  {/* Bank BRI: 31.6% (4 cols) */}
                  <div className="col-span-12 sm:col-span-4 bg-[#E15759] text-white p-3 rounded-lg flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-90 block">
                        Pengeluaran SP2D
                      </span>
                      <h4 className="font-bold text-sm leading-tight mt-0.5">Bank BRI</h4>
                      <p className="text-[10px] font-mono opacity-80">0065-01-000892-30-1</p>
                    </div>
                    <div>
                      <p className="text-xl font-black font-mono">Rp 480,2 M</p>
                      <p className="text-[11px] font-medium opacity-90">Porsi: 31,6% dari Total Kas</p>
                    </div>
                  </div>

                  {/* BNI + BRK: 3 cols total (stacked vertical) */}
                  <div className="col-span-12 sm:col-span-3 flex flex-col gap-2">
                    <div className="flex-1 bg-[#4E79A7] text-white p-2.5 rounded-lg flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider opacity-90 block">
                          Operasional
                        </span>
                        <h4 className="font-bold text-xs leading-tight">Bank BNI</h4>
                      </div>
                      <div>
                        <p className="text-sm font-black font-mono">Rp 285,3 M</p>
                        <p className="text-[10px] opacity-90">18,8%</p>
                      </div>
                    </div>

                    <div className="flex-1 bg-[#B07AA1] text-white p-2.5 rounded-lg flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider opacity-90 block">
                          Deposito DOC
                        </span>
                        <h4 className="font-bold text-xs leading-tight">BRK Syariah</h4>
                      </div>
                      <div>
                        <p className="text-sm font-black font-mono">Rp 114,0 M</p>
                        <p className="text-[10px] opacity-90">7,5%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 text-center font-sans">
                  * Ukuran kotak mewakili proporsi nilai saldo pada marks card Tableau (Size: SUM([nilai]), Color: [kategori_rekening])
                </div>
              </div>
            )}
          </div>

          {/* Standar Ketahanan Likuiditas (Cash Runway) & Penjelasan Awam */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-700 gap-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">Standar Ketahanan Likuiditas (Cash Runway):</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Kategori Sangat Sehat (Prima)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#2B542C] font-mono text-sm sm:text-base whitespace-nowrap">
                  5,2 Bulan Operasional Rutin
                </span>
                {onExplainKpi && (
                  <button
                    onClick={() => onExplainKpi('saldo_kas')}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1F4E79] bg-white border border-blue-200 px-2 py-0.5 rounded shadow-2xs hover:bg-blue-50 cursor-pointer"
                    title="Formula & Penjelasan Ketahanan Kas"
                  >
                    <HelpCircle className="w-3 h-3 text-[#1F4E79]" />
                    <span>Formula</span>
                  </button>
                )}
              </div>
            </div>

            {/* Kotak Analisis & Interpretasi Daya Tahan Kas Operasional */}
            <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-700 leading-relaxed shadow-2xs">
              <span className="font-bold text-[#002B49] block mb-1">
                💡 Analisis &amp; Interpretasi Daya Tahan Kas Operasional (5,2 Bulan):
              </span>
              <p className="text-[11.5px] text-slate-600">
                Angka <strong>5,2 bulan</strong> ini menunjukkan daya tahan kas BP Batam (Cash Runway). Artinya, jika seluruh penerimaan kas baru terhenti sementara, <strong>saldo kas dan simpanan bank yang ada saat ini (Rp 1,52 Triliun) sanggup menjamin kelancaran pembayaran operasional rutin, listrik/air, pemeliharaan aset, dan belanja layanan selama 5,2 bulan ke depan</strong> tanpa memerlukan pinjaman pihak ketiga. Standar aman Kementerian Keuangan adalah minimal 3 bulan, membuktikan likuiditas BP Batam sangat prima.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
