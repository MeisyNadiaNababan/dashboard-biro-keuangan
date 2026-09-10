import React, { useState } from 'react';
import {
  ArrowRight,
  Receipt,
  Building2,
  BarChart3,
  Layers,
  FileText
} from 'lucide-react';
import {
  RECEIVABLES_DATA,
  RECEIVABLES_TOTAL,
  AGING_BUCKETS,
  CASH_FLOW_DATA,
  SALDO_BANK_REAL_TIME_DATA,
  REKAPITULASI_UMUR_PIUTANG_DATA,
  REKAPITULASI_MUTASI_PIUTANG_DATA
} from '../data/mockData';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface ReceivablesSectionProps {
  onViewPiutangDetail?: () => void;
  onViewKasBankDetail?: () => void;
}

// Authentic Tableau Cash Flow Dual-Axis Chart - Compact & Sleek
const TableauCashFlowChart: React.FC<{ data?: typeof CASH_FLOW_DATA }> = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full py-4 text-center text-xs text-slate-400 font-mono">
        Tidak ada data arus kas tersedia
      </div>
    );
  }

  const masukList = data.map((d) => d?.masuk ?? 0);
  const keluarList = data.map((d) => d?.keluar ?? 0);
  const saldoList = data.map((d) => d?.saldo ?? 0);

  const maxIn = masukList.length > 0 ? Math.max(...masukList) : 100;
  const maxOut = keluarList.length > 0 ? Math.max(...keluarList) : 100;
  const maxBar = Math.max(maxIn, maxOut, 1) * 1.15; // Primary Axis Max

  const minBalance = saldoList.length > 0 ? Math.min(...saldoList) : 0;
  const maxBalance = saldoList.length > 0 ? Math.max(...saldoList) : 100;
  const balanceRange = maxBalance - minBalance || 1;

  // Extended chart dimensions for full-width layout
  const chartHeight = 125;
  const paddingBottom = 22;
  const paddingTop = 12;
  const usableHeight = chartHeight - paddingBottom - paddingTop;

  // Points for line mark (Saldo Kas)
  const linePoints = data.map((d, idx) => {
    const x = 60 + idx * 115;
    const y = paddingTop + usableHeight - ((d.saldo - minBalance) / balanceRange) * (usableHeight * 0.75);
    return `${x},${y}`;
  });

  return (
    <div className="w-full space-y-2">
      {/* Dual Axis Chart Canvas - Full Width */}
      <div className="relative border border-slate-200/80 bg-slate-50/50 rounded-xl p-3">
        <svg viewBox="0 0 720 125" className="w-full h-36 sm:h-40 overflow-visible">
          {/* Horizontal Gridlines */}
          {[0, 0.5, 1].map((pct, i) => {
            const y = paddingTop + usableHeight * (1 - pct);
            return (
              <g key={i}>
                <line x1="45" y1={y} x2="685" y2={y} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
                <text x="40" y={y + 3} textAnchor="end" fontSize="9" fill="#94A3B8" fontFamily="monospace">
                  {(maxBar * pct).toFixed(0)}M
                </text>
                <text x="690" y={y + 3} textAnchor="start" fontSize="9" fill="#4E79A7" fontFamily="monospace" fontWeight="600">
                  {((minBalance + balanceRange * pct * 0.75) / 1000).toFixed(2)}T
                </text>
              </g>
            );
          })}

          {/* Bars for Cash In & Cash Out */}
          {data.map((d, idx) => {
            const groupX = 48 + idx * 115;
            const barW = 20;
            const inH = (d.masuk / maxBar) * usableHeight;
            const outH = (d.keluar / maxBar) * usableHeight;

            return (
              <g key={d.month}>
                {/* Bar Arus Masuk */}
                <rect
                  x={groupX}
                  y={paddingTop + usableHeight - inH}
                  width={barW}
                  height={inH}
                  fill="#59A14F"
                  rx="3"
                  className="hover:opacity-85 transition-all"
                >
                  <title>{`${d.month} - Masuk: Rp ${d.masuk} M`}</title>
                </rect>

                {/* Bar Arus Keluar */}
                <rect
                  x={groupX + barW + 3}
                  y={paddingTop + usableHeight - outH}
                  width={barW}
                  height={outH}
                  fill="#E15759"
                  rx="3"
                  className="hover:opacity-85 transition-all"
                >
                  <title>{`${d.month} - Keluar: Rp ${d.keluar} M`}</title>
                </rect>

                {/* X Axis Month Label */}
                <text
                  x={groupX + barW + 1}
                  y={chartHeight - 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#334155"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {d.month}
                </text>
              </g>
            );
          })}

          {/* Line for Saldo Kas - Secondary Axis */}
          <path
            d={`M ${linePoints.join(' L ')}`}
            fill="none"
            stroke="#4E79A7"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {linePoints.map((pt, idx) => {
            const [cx, cy] = pt.split(',');
            return (
              <g key={idx}>
                <circle cx={cx} cy={cy} r="3.5" fill="#4E79A7" stroke="#FFFFFF" strokeWidth="2" />
                <text
                  x={cx}
                  y={Number(cy) - 6}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="#002B49"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {(data[idx].saldo / 1000).toFixed(2)}T
                </text>
              </g>
            );
          })}
        </svg>

        {/* Dual Axis Legends */}
        <div className="flex flex-wrap items-center justify-between border-t border-slate-200/80 pt-2 px-1 text-[11px] text-slate-600 gap-1.5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#59A14F] inline-block rounded" />
              <span>Arus Masuk (Penerimaan)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#E15759] inline-block rounded" />
              <span>Arus Keluar (Pengeluaran)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#4E79A7] inline-block rounded-full" />
              <span className="font-semibold text-[#002B49]">Line: Saldo Kumulatif Akhir Bulan (T)</span>
            </div>
          </div>
          <span className="font-mono text-slate-400 text-[10px]">Dual-Axis Synchronized</span>
        </div>
      </div>
    </div>
  );
};

export const ReceivablesSection: React.FC<ReceivablesSectionProps> = ({
  onViewPiutangDetail,
  onViewKasBankDetail,
}) => {
  const [bankViewMode, setBankViewMode] = useState<'bar' | 'table' | 'treemap'>('bar');
  const [piutangTab, setPiutangTab] = useState<'aging' | 'rekap' | 'mutasi'>('aging');

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
            <h3 className="text-lg sm:text-xl font-black text-[#002B49] tracking-tight">
              Monitoring Rekapitulasi Umur Piutang &amp; Mutasi Faktur
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              305 Debitur Aktif di Seluruh Wilayah Kerja BP Batam (Item 17 &amp; 18 Katalog Data)
            </p>
          </div>

          {/* Table Switcher Tabs */}
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
              onClick={() => setPiutangTab('rekap')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                piutangTab === 'rekap'
                  ? 'bg-[#002B49] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Tabel Umur Piutang (Item 17)</span>
            </button>
            <button
              onClick={() => setPiutangTab('mutasi')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                piutangTab === 'mutasi'
                  ? 'bg-[#002B49] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Mutasi Faktur (Item 18)</span>
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

            {/* Aging Bar Chart */}
            <div className="rounded-xl border border-slate-200/80 divide-y divide-slate-100 text-xs overflow-hidden">
              {AGING_BUCKETS.map((bucket) => {
                const pct = (bucket.amount / RECEIVABLES_TOTAL.nilaiPiutang) * 100;

                return (
                  <div key={bucket.range} className="p-3.5 hover:bg-slate-50/70 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{bucket.range}</span>
                        <span className="text-xs text-slate-500 font-sans">
                          ({bucket.label})
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="font-bold text-slate-900 text-sm">
                          Rp {bucket.amount.toFixed(1)} M
                        </span>
                        <span className="text-slate-500 font-semibold">({pct.toFixed(1)}%)</span>
                      </div>
                    </div>

                    <div className="relative h-3.5 bg-slate-100 rounded-full overflow-hidden">
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
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-2">
              <span className="font-sans font-bold text-slate-800">
                TOTAL OUTSTANDING PIUTANG:
              </span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#E15759] text-base sm:text-lg">
                  Rp {RECEIVABLES_TOTAL.nilaiPiutang.toFixed(1)} M
                </span>
                <span className="text-slate-500 font-sans text-xs">
                  ({RECEIVABLES_TOTAL.jumlahDebitur} Debitur Aktif)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Tabel Rekapitulasi Umur Piutang (Item 17) - Tanpa kolom Ketentuan PUPN/Kemenkeu */}
        {piutangTab === 'rekap' && (
          <div className="space-y-3">
            <TableauShelvesBadge
              showMe="Show Me #1 (Text Table / Crosstab)"
              rows="[namaPelanggan]"
              columns="SUM([jumlahPiutangTertagih]), [umurPiutang]"
              color="[umurPiutang]"
              detail="Tabel Item 17 SIMKEU BP Batam"
            />
            <div className="overflow-x-auto rounded-xl border border-slate-200/80">
              <table className="w-full text-left text-xs border-collapse min-w-[560px]">
                <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[8%]">
                      No
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[48%]">
                      Nama Pelanggan (Debitur)
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[24%]">
                      Jumlah Piutang Tertagih (Rp M)
                    </th>
                    <th className="py-2.5 px-3 text-center w-[20%]">
                      Umur Piutang (Hari)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
                  {REKAPITULASI_UMUR_PIUTANG_DATA.map((row, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                      <tr
                        key={idx}
                        className={`hover:bg-blue-50/60 transition-colors ${
                          isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                        }`}
                      >
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono text-slate-600 align-middle">
                          {idx + 1}
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-semibold text-slate-900 align-middle">
                          {row.namaPelanggan}
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-bold text-[#E15759] align-middle">
                          Rp {row.jumlahPiutangTertagih.toFixed(2)} M
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-800 align-middle">
                          {row.umurPiutang} Hari
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 3: Mutasi Piutang per Faktur (Item 18) */}
        {piutangTab === 'mutasi' && (
          <div className="space-y-3">
            <TableauShelvesBadge
              showMe="Show Me #1 (Text Table / Crosstab)"
              rows="[nomorFaktur], [namaPelanggan]"
              columns="SUM([saldoAwal]), SUM([bayarFaktur]), SUM([saldoAkhir])"
              color="[saldoAkhir]"
              detail="Tabel Item 18 SIMKEU BP Batam"
            />
            <div className="overflow-x-auto rounded-xl border border-slate-200/80">
              <table className="w-full text-left text-xs border-collapse min-w-[680px]">
                <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[16%]">
                      No Faktur
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[30%]">
                      Nama Pelanggan
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[14%]">
                      Saldo Awal (Rp M)
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[14%]">
                      Bayar Faktur (Rp M)
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[14%]">
                      Saldo Akhir (Rp M)
                    </th>
                    <th className="py-2.5 px-3 text-center w-[12%]">
                      Umur
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
                  {REKAPITULASI_MUTASI_PIUTANG_DATA.map((mutasi, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                      <tr
                        key={mutasi.id}
                        className={`hover:bg-blue-50/60 transition-colors ${
                          isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                        }`}
                      >
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-[#1F4E79] align-middle">
                          {mutasi.fakturTerbit}
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-semibold text-slate-900 align-middle">
                          {mutasi.namaPelanggan}
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono text-slate-700 align-middle">
                          Rp {mutasi.saldoAwal.toFixed(1)} M
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono text-[#59A14F] font-bold align-middle">
                          Rp {mutasi.bayarFaktur.toFixed(1)} M
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono text-[#E15759] font-bold align-middle">
                          Rp {mutasi.saldoAkhir.toFixed(1)} M
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-slate-700 align-middle">
                          {mutasi.umurPiutang} Hari
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Tableau Server BI • Filter Debitur: Seluruh Wilayah Kerja BP Batam</span>
          <span className="font-mono text-slate-400">Sheet: Piutang &amp; Aging</span>
        </div>
      </div>

      {/* 2. SEKSI ARUS KAS & SALDO BANK (DIPISAHKAN SECARA VERTIKAL, TIDAK BERSEJALAN) */}
      <div id="kas-bank-section" className="space-y-6">
        {/* Atas: Arus Kas & Likuiditas (Full Width) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#76B7B2]" />
                <span>LIKUIDITAS &amp; ARUS KAS</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#002B49] tracking-tight">
                Tren Arus Kas &amp; Likuiditas (6 Bulan Terakhir)
              </h3>
              <p className="text-xs text-slate-500">
                Dual Axis Tableau: Arus Kas Masuk (Item 14), Keluar (Item 27) vs Saldo Kas Akhir
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-2xs self-start sm:self-auto whitespace-nowrap">
              Nov 2025 – Apr 2026
            </span>
          </div>

          {/* Tableau Shelves Mapping Badge */}
          <TableauShelvesBadge
            showMe="Show Me #24 (Dual Axis Combination)"
            columns="[month] (Date Dimension)"
            rows="Axis 1: SUM([masuk]), SUM([keluar]) | Axis 2: SUM([saldo])"
            color="Measure Names"
            referenceLine="Synchronized Dual Axis"
          />

          <div>
            <TableauCashFlowChart data={CASH_FLOW_DATA} />
          </div>

          {/* 3-Column Summary Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex flex-col">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Total Kas Masuk (Item 14)</span>
              <span className="text-sm sm:text-base font-bold font-mono text-emerald-900 mt-0.5 whitespace-nowrap">Rp 5.280,6 M</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/60 flex flex-col">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">Total Kas Keluar (Item 27)</span>
              <span className="text-sm sm:text-base font-bold font-mono text-rose-900 mt-0.5 whitespace-nowrap">Rp 4.220,1 M</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 flex flex-col">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Net Surplus Kas</span>
              <span className="text-sm sm:text-base font-bold font-mono text-blue-900 mt-0.5 whitespace-nowrap">+Rp 1.060,5 M</span>
            </div>
          </div>

          {/* Banner Calculated Field Rata-rata Penerimaan Kas Bulanan */}
          <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs text-slate-700">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 font-medium">
                <span className="font-bold text-slate-800">Rata-rata Penerimaan Kas Bulanan:</span>
                <span className="font-bold text-[#2B542C] font-mono text-sm">Rp 880,1 M / bulan</span>
              </div>
              <p className="text-[11px] text-slate-500 font-sans">
                Formula Tableau: <code className="bg-white px-1 py-0.5 rounded border border-slate-200 text-slate-700 font-mono text-[10.5px]">SUM([keu_penerimaan_sumber_dana].[nilai]) / COUNTD([tanggal_rekap])</code>
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200 shrink-0 self-start md:self-auto">
              Tabel Sumber: keu_penerimaan_sumber_dana (Item 14)
            </div>
          </div>
        </div>

        {/* Bawah: Saldo Kas & Rekening Bank Operasional (Item 13) - Full Width Below Arus Kas */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#4E79A7]" />
                <span>REKENING OPERASIONAL BANK</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#002B49] tracking-tight">
                Saldo Bank Real Time (Item 13)
              </h3>
              <p className="text-xs text-slate-500">
                Data Konsolidasi Rekening Bank Mitra BLU BP Batam • Tabel: <code>keu_saldo_bank_realtime</code>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1 bg-[#EBF3E8] text-[#2B542C] border border-[#59A14F]/40 text-xs font-bold uppercase font-mono rounded-full whitespace-nowrap">
                Likuiditas Prima
              </span>
              {onViewKasBankDetail && (
                <button
                  onClick={onViewKasBankDetail}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-[#002B49] rounded-xl cursor-pointer shadow-2xs transition-all whitespace-nowrap"
                >
                  View Data
                </button>
              )}
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
                  0,86 <span className="text-xs font-normal text-slate-500">(Aman &gt;0,80)</span>
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

            {/* Mode 2: Tableau Text Table / Crosstab (Standard Tableau Show Me #1) */}
            {bankViewMode === 'table' && (
              <div className="border border-slate-200/80 rounded-xl overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs border-collapse min-w-[560px]">
                  <thead className="bg-[#F1F5F9] font-bold text-slate-700 border-b border-slate-300 text-xs">
                    <tr>
                      <th className="py-2.5 px-3 whitespace-nowrap">Bank Mitra &amp; Rekening</th>
                      <th className="py-2.5 px-3 whitespace-nowrap">Kategori</th>
                      <th className="py-2.5 px-3">Kegunaan Rekening</th>
                      <th className="py-2.5 px-2.5 text-center font-mono text-[11px] whitespace-nowrap">Tgl Rekap</th>
                      <th className="py-2.5 px-3 text-right font-mono whitespace-nowrap">Saldo (Rp M)</th>
                      <th className="py-2.5 px-3 text-right font-mono whitespace-nowrap">Porsi (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 text-xs">
                    {SALDO_BANK_REAL_TIME_DATA.map((bank, idx) => (
                      <tr key={bank.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className="font-bold text-slate-900 block">{bank.namaBank}</span>
                          <span className="text-[11px] text-[#002B49] font-mono">
                            {bank.nomorRekening}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
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
                        <td className="py-2.5 px-3 text-slate-700 text-[11px]">
                          {bank.kegunaanRekening}
                        </td>
                        <td className="py-2.5 px-2.5 text-center font-mono text-[11px] text-slate-600 whitespace-nowrap">
                          {bank.tanggalRekap}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap text-sm">
                          {bank.nilai.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-slate-800 font-bold whitespace-nowrap">
                          {bank.porsiPersen.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Tableau Grand Total Row */}
                  <tfoot className="bg-[#E2E8F0] font-bold text-slate-900 border-t-2 border-slate-300 text-xs">
                    <tr>
                      <td colSpan={4} className="py-2.5 px-3 text-slate-800 uppercase tracking-wider">
                        Grand Total Kas &amp; Setara Kas
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-sm font-black text-[#002B49]">
                        1.520,00
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-sm font-black text-[#002B49]">
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

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Standar Ketahanan Likuiditas:</span>
            <span className="font-semibold text-[#2B542C] font-mono whitespace-nowrap">
              5,2 Bulan Operasional Rutin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
