import React, { useState } from 'react';
import {
  Receipt,
  Building2,
  BarChart3,
  FileText,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingDown,
} from 'lucide-react';
import {
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
  const [piutangTab, setPiutangTab] = useState<'aging' | 'tak_tertagih'>('aging');

  return (
    <div className="space-y-6 font-sans select-none">
      {/* ========================================================================= */}
      {/* 1. SEKSI PIUTANG: STANDARISASI MODEL VISUALISASI SEPERTI REVENUE & BUDGET */}
      {/* ========================================================================= */}
      <div id="piutang-section" className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 sm:p-6 space-y-4">
        {/* Modern Executive Card Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#E15759]" />
              <span>MANAJEMEN PIUTANG &amp; MUTASI FAKTUR</span>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                Item #17 &amp; #20
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-lg sm:text-xl font-black text-[#002B49] tracking-tight">
                Rekapitulasi Piutang dan Mutasi Faktur
              </h3>
              {onExplainKpi && (
                <button
                  onClick={() => onExplainKpi('piutang')}
                  className="px-2.5 py-1 text-xs font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Katalog Data SIMKEU: Distribusi Umur Piutang (Item 17) &amp; Rekapitulasi Piutang Tak Tertagih (Item 20)
            </p>
          </div>

          {/* Right Controls: Tab Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold border border-slate-200/80">
              <button
                onClick={() => setPiutangTab('aging')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  piutangTab === 'aging'
                    ? 'bg-[#002B49] text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Distribusi Aging (Item 17)</span>
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
        </div>

        {/* Marks & Legend Shelf Standardized */}
        <div className="px-3.5 py-2 bg-slate-50/70 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-[11px]">Marks &amp; Risiko:</span>
            <div className="flex items-center gap-3 text-[11px] flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#59A14F]" />
                <span>Lancar (0-30 Hari)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#4E79A7]" />
                <span>Kurang Lancar (31-90 Hari)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#EDC948]" />
                <span>Diragukan (91-180 Hari)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#E15759]" />
                <span>Macet (&gt;180 Hari / PUPN)</span>
              </div>
            </div>
          </div>
          <span className="text-[10.5px] font-mono text-slate-400">
            Sumber Data: SIMKEU e-Billing &amp; FBMS
          </span>
        </div>

        {/* View 1: Distribusi Aging (Item 17) - Visual Bar Only */}
        {piutangTab === 'aging' && (
          <div className="space-y-3">
            <TableauShelvesBadge
              showMe="Show Me #6 (Horizontal Bar)"
              rows="[Bucket Aging Kemenkeu]"
              columns="SUM([nilai_piutang]), % of Total"
              color="[Tingkat Risiko]"
              detail="[jumlah_debitur], [tindakan_penagihan]"
              referenceLine="Toleransi Macet Kemenkeu ≤ 10,0%"
            />

            {/* Visual Horizontal Bar (Narrow, compact bars with minimal spacing) */}
            <div className="rounded-xl border border-slate-200/80 p-3 bg-white space-y-2 shadow-2xs">
              <div className="space-y-1">
                {AGING_BUCKETS.map((bucket) => {
                  const pct = (bucket.amount / RECEIVABLES_TOTAL.nilaiPiutang) * 100;
                  const maxScale = 150; // max scale in Miliar for relative bar length
                  const barWidth = Math.min(100, Math.max(8, (bucket.amount / maxScale) * 100));

                  return (
                    <div
                      key={bucket.range}
                      onClick={() => onExplainKpi?.('piutang')}
                      className="group space-y-0.5 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                      title="Klik untuk membuka penjelasan formula kolektibilitas"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {bucket.range}
                          </span>
                          <span className="text-[11px] text-slate-500 font-sans truncate">
                            ({bucket.label})
                          </span>
                          <span className="text-[10px] text-blue-600 bg-blue-50 px-1 py-0.2 rounded font-mono border border-blue-200 opacity-0 group-hover:opacity-100 transition-opacity">
                            Rumus
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                          <span className="font-bold text-slate-900">
                            Rp {bucket.amount.toFixed(1)} M
                          </span>
                          <span className="text-[10px] font-bold text-blue-700 bg-slate-100 px-1 rounded">
                            {pct.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* Narrow Compact Bar Track */}
                      <div className="relative h-2.5 sm:h-3 bg-slate-100 rounded overflow-hidden flex items-center">
                        <div
                          className="h-full rounded transition-all duration-500 flex items-center px-1.5 z-10"
                          style={{
                            width: `${barWidth}%`,
                            backgroundColor: bucket.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-Axis scale */}
              <div className="pt-1.5 border-t border-slate-200 flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 M</span>
                <span>35 M</span>
                <span>75 M (Ref)</span>
                <span>110 M</span>
                <span>150 M (Rp Miliar)</span>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Rekapitulasi Piutang Tak Tertagih (Item 20 Katalog Data SIMKEU BP Batam) */}
        {piutangTab === 'tak_tertagih' && (
          <div className="space-y-3">
            <TableauShelvesBadge
              showMe="Show Me #1 (Crosstab with In-Cell Balances)"
              rows="[tanggalTerbitFaktur], [namaPelanggan]"
              columns="SUM([jumlahPiutang]), SUM([perhitunganDenda]), SUM([bayarFaktur]), SUM([saldoPiutangTakTertagih])"
              color="[saldoPiutangTakTertagih]"
              detail="Item 20 SIMKEU: Rekapitulasi Piutang Tak Tertagih (FBMS)"
            />

            <div className="overflow-x-auto max-h-[340px] overflow-y-auto rounded-xl border border-slate-200/80 shadow-2xs">
              <table className="w-full text-left text-xs border-collapse min-w-[750px]">
                <thead className="sticky top-0 z-10 bg-[#0B2545] text-white font-bold text-[10.5px] tracking-tight">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[14%]">
                      Tanggal Faktur
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[26%]">
                      Nama Pelanggan / Debitur (Klik Rumus)
                    </th>
                    <th className="py-2.5 px-2.5 text-center border-r border-blue-900/60 w-[12%]">
                      Jatuh Tempo
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[12%]">
                      Jml Piutang
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[12%]">
                      Denda (+)
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[12%]">
                      Bayar (-)
                    </th>
                    <th className="py-2.5 px-3 text-right w-[12%]">
                      Saldo Piutang
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
                  {REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA.map((item, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                      <tr
                        key={item.nomorFaktur}
                        onClick={() => onExplainKpi?.('piutang')}
                        className={`hover:bg-blue-50/70 transition-colors cursor-pointer group ${
                          isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                        }`}
                        title="Klik untuk melihat formula perhitungan piutang"
                      >
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono text-slate-500 align-middle text-[10.5px]">
                          {item.tanggalTerbitFaktur}
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-semibold text-slate-900 group-hover:text-blue-800 align-middle">
                          <div className="flex items-center justify-between gap-1">
                            <span>{item.namaPelanggan}</span>
                            <HelpCircle className="w-2.5 h-2.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </div>
                        </td>
                        <td className="py-2.5 px-2.5 border-r border-[#E2E8F0] text-center font-mono text-slate-600 align-middle text-[10.5px]">
                          {item.tanggalJatuhTempo}
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono text-slate-700 align-middle">
                          Rp {item.jumlahPiutang.toFixed(2)} M
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono text-amber-700 font-medium align-middle">
                          +Rp {item.perhitunganDenda.toFixed(2)} M
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono text-[#59A14F] font-bold align-middle">
                          -Rp {item.bayarFaktur.toFixed(2)} M
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-[#E15759] font-bold align-middle">
                          Rp {item.saldoPiutangTakTertagih.toFixed(2)} M
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-100 font-bold text-slate-800 text-[11px] border-t-2 border-slate-300">
                  <tr>
                    <td colSpan={3} className="py-2.5 px-3 text-right uppercase tracking-wider text-[10px] text-slate-600">
                      Total Rekapitulasi (Formula: Piutang + Denda - Bayar - Koreksi):
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-800">
                      Rp {REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA.reduce((acc, r) => acc + r.jumlahPiutang, 0).toFixed(2)} M
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-800">
                      +Rp {REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA.reduce((acc, r) => acc + r.perhitunganDenda, 0).toFixed(2)} M
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-[#2B542C]">
                      -Rp {REKAPITULASI_PIUTANG_TAK_TERTAGIH_DATA.reduce((acc, r) => acc + r.bayarFaktur, 0).toFixed(2)} M
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-[#E15759] text-xs">
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

      {/* ========================================================================= */}
      {/* 2. SEKSI SALDO BANK: STANDARISASI VISUALISASI HANYA TREEMAP SAJA (POINT 13) */}
      {/* ========================================================================= */}
      <div id="kas-bank-section" className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 sm:p-5 space-y-3">
        {/* Modern Executive Card Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#1F4E79]" />
              <span>REKENING OPERASIONAL &amp; TATA KELOLA KAS BANK</span>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                Item #13
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-[#002B49] tracking-tight">
                Saldo Bank
              </h3>
              {onExplainKpi && (
                <button
                  onClick={() => onExplainKpi('saldo_kas')}
                  className="px-2 py-0.5 text-xs font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3 h-3 text-blue-600" />
                  <span>Formula</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Status Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold font-mono rounded-full whitespace-nowrap shadow-2xs">
              Total Saldo: Rp 1.520,0 M
            </span>
          </div>
        </div>

        {/* Tableau Shelves Mapping Badge */}
        <TableauShelvesBadge
          showMe="Show Me #12 (Treemap Komposisi Saldo Kas & Bank)"
          rows="[nama_bank]"
          columns="SUM([nilai_saldo])"
          color="[nama_bank]"
          detail="[nomor_rekening], [nilai_saldo]"
          referenceLine="Porsi Bank: Mandiri 42,1% | BRI 31,6% | BNI 18,8% | BRK 7,5%"
        />

        {/* VISUAL TREEMAP SALDO BANK (DIPERKECIL & HANYA NAMA BANK, NO REK, JUMLAH SALDO) */}
        <div className="border border-slate-200/80 rounded-xl p-2.5 bg-white shadow-2xs">
          <div className="grid grid-cols-12 gap-2 h-28 sm:h-32">
            {/* Bank Mandiri: 5 cols */}
            <div
              onClick={() => onExplainKpi?.('saldo_kas')}
              className="col-span-12 sm:col-span-5 bg-[#59A14F] hover:bg-[#4d8c44] transition-colors cursor-pointer text-white p-2.5 rounded-xl flex flex-col justify-between shadow-2xs group"
              title="Klik untuk membuka formula perhitungan saldo kas"
            >
              <div>
                <h4 className="font-black text-xs sm:text-sm leading-tight">Bank Mandiri</h4>
                <p className="text-[10px] sm:text-[11px] font-mono opacity-90 mt-0.5">No. Rek: 109-00-1971202-6</p>
              </div>
              <div className="pt-1 border-t border-white/20">
                <p className="text-base sm:text-lg font-black font-mono leading-tight">Rp 640,5 M</p>
              </div>
            </div>

            {/* Bank BRI: 4 cols */}
            <div
              onClick={() => onExplainKpi?.('saldo_kas')}
              className="col-span-12 sm:col-span-4 bg-[#E15759] hover:bg-[#c9494b] transition-colors cursor-pointer text-white p-2.5 rounded-xl flex flex-col justify-between shadow-2xs group"
              title="Klik untuk membuka formula perhitungan saldo kas"
            >
              <div>
                <h4 className="font-black text-xs sm:text-sm leading-tight">Bank BRI</h4>
                <p className="text-[10px] sm:text-[11px] font-mono opacity-90 mt-0.5">No. Rek: 0065-01-000892-30-1</p>
              </div>
              <div className="pt-1 border-t border-white/20">
                <p className="text-base sm:text-lg font-black font-mono leading-tight">Rp 480,2 M</p>
              </div>
            </div>

            {/* BNI + BRK: 3 cols total (stacked vertical) */}
            <div className="col-span-12 sm:col-span-3 flex flex-col gap-1.5">
              {/* Bank BNI */}
              <div
                onClick={() => onExplainKpi?.('saldo_kas')}
                className="flex-1 bg-[#4E79A7] hover:bg-[#41678f] transition-colors cursor-pointer text-white p-1.5 px-2 rounded-lg flex flex-col justify-between shadow-2xs group"
                title="Klik untuk membuka formula perhitungan saldo kas"
              >
                <div>
                  <h4 className="font-black text-[11px] sm:text-xs leading-tight truncate">Bank BNI</h4>
                  <p className="text-[9.5px] font-mono opacity-90 truncate">No. Rek: 023-8891244-001</p>
                </div>
                <div className="pt-0.5 border-t border-white/15">
                  <p className="text-xs sm:text-sm font-black font-mono leading-tight">Rp 285,3 M</p>
                </div>
              </div>

              {/* BRK Syariah */}
              <div
                onClick={() => onExplainKpi?.('saldo_kas')}
                className="flex-1 bg-[#B07AA1] hover:bg-[#976489] transition-colors cursor-pointer text-white p-1.5 px-2 rounded-lg flex flex-col justify-between shadow-2xs group"
                title="Klik untuk membuka formula perhitungan saldo kas"
              >
                <div>
                  <h4 className="font-black text-[11px] sm:text-xs leading-tight truncate">BRK Syariah</h4>
                  <p className="text-[9.5px] font-mono opacity-90 truncate">No. Rek: 101-20-00452-9</p>
                </div>
                <div className="pt-0.5 border-t border-white/15">
                  <p className="text-xs sm:text-sm font-black font-mono leading-tight">Rp 114,0 M</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
