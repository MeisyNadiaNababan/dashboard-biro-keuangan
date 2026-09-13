import React, { useState } from 'react';
import {
  TrendingUp,
  Wallet,
  Receipt,
  Layers,
  BarChart3,
  CheckCircle2,
  Table as TableIcon,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { RevenueItem, ExpenseItem } from '../types';
import {
  REVENUE_TOTAL,
  EXPENSE_TOTAL,
  RINCIAN_TARGET_PNBP_DATA,
} from '../data/mockData';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface BiroKeuanganFinancialCardProps {
  revenueItems: RevenueItem[];
  expenseItems: ExpenseItem[];
  selectedYear: string;
  selectedUnit?: string;
  selectedMonth?: string;
  onExplainKpi?: (kpiId: string) => void;
}

type FinancialTabType = 'pendapatan' | 'belanja';
type VisualModeType = 'incell_bullet' | 'horizontal_bar';

export const BiroKeuanganFinancialCard: React.FC<BiroKeuanganFinancialCardProps> = ({
  revenueItems,
  expenseItems,
  selectedYear,
  selectedUnit = 'ALL',
  selectedMonth = 'April',
  onExplainKpi,
}) => {
  const [activeTab, setActiveTab] = useState<FinancialTabType>('pendapatan');
  const [visualMode, setVisualMode] = useState<VisualModeType>('incell_bullet');
  const [showTableauGuide, setShowTableauGuide] = useState(false);

  // Calculations for Revenue BANs
  const totalRevTarget = revenueItems.reduce((acc, r) => acc + (r.target || 0), 0) || REVENUE_TOTAL.target;
  const totalRevReal = revenueItems.reduce((acc, r) => acc + (r.realisasi || 0), 0) || REVENUE_TOTAL.realisasi;
  const avgRevCapaian = Math.round((totalRevReal / totalRevTarget) * 1000) / 10;
  const sisaRevTarget = Math.max(0, totalRevTarget - totalRevReal);

  // Calculations for Expense BANs
  const totalExpPagu = expenseItems.reduce((acc, e) => acc + (e.pagu || 0), 0) || EXPENSE_TOTAL.pagu;
  const totalExpReal = expenseItems.reduce((acc, e) => acc + (e.realisasi || 0), 0) || EXPENSE_TOTAL.realisasi;
  const avgExpSerapan = Math.round((totalExpReal / totalExpPagu) * 1000) / 10;
  const sisaExpPagu = Math.max(0, totalExpPagu - totalExpReal);

  // Status helper for in-cell badges - Clean corporate styling (without distracting green/orange)
  const getStatusBadge = (pct: number, _benchmark?: number) => {
    return {
      label: `${pct.toFixed(1)}%`,
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      barColor: 'bg-[#1F4E79]',
    };
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden flex flex-col font-sans select-none">
      {/* 1. Header with Data Tab Switcher & Creative Visual Mode Switcher */}
      <div className="px-4 py-3.5 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-2xs" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Performa Keuangan BLU BP Batam • TA {selectedYear}
              </h3>
              {selectedUnit !== 'ALL' && (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded font-bold">
                  Filtered: {selectedUnit}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-normal">
              Visualisasi terintegrasi Tableau: In-Cell Bullet, Dual-Axis Bar, dan Heatmap matriks
            </p>
          </div>
        </div>

        {/* Data Tabs */}
        <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold flex-wrap">
          <button
            onClick={() => setActiveTab('pendapatan')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pendapatan'
                ? 'bg-[#1F4E79] text-white shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Pendapatan PNBP</span>
          </button>
          <button
            onClick={() => setActiveTab('belanja')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'belanja'
                ? 'bg-[#1F4E79] text-white shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Realisasi Belanja</span>
          </button>
        </div>
      </div>

      {/* 2. Tableau BAN Strip */}
      <div className="p-4 border-b border-slate-200 bg-white grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {activeTab === 'pendapatan' && (
          <>
            <div
              onClick={() => onExplainKpi?.('rev_target')}
              className={`p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-xl transition-all ${
                onExplainKpi ? 'cursor-pointer hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-2xs group' : ''
              }`}
              title={onExplainKpi ? "Klik untuk melihat formula & penjelasan KPI lengkap" : undefined}
            >
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <span>Target Perkin {selectedYear}</span>
                {onExplainKpi && <HelpCircle className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
              </span>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                Rp {totalRevTarget.toFixed(1)} M
              </div>
              <span className="text-[10px] text-slate-500">10 Satker Penghasil</span>
            </div>
            <div
              onClick={() => onExplainKpi?.('rev_real')}
              className={`p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-xl transition-all ${
                onExplainKpi ? 'cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-2xs group' : ''
              }`}
              title={onExplainKpi ? "Klik untuk melihat formula & penjelasan KPI lengkap" : undefined}
            >
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <span>Realisasi YTD ({selectedMonth})</span>
                {onExplainKpi && <HelpCircle className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
              </span>
              <div className="text-xl font-black text-emerald-600 font-mono mt-0.5">
                Rp {totalRevReal.toFixed(1)} M
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold">Kas Masuk BLU</span>
            </div>
            <div
              onClick={() => onExplainKpi?.('rev_capaian')}
              className={`p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-xl transition-all ${
                onExplainKpi ? 'cursor-pointer hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-2xs group' : ''
              }`}
              title={onExplainKpi ? "Klik untuk melihat formula & penjelasan KPI lengkap" : undefined}
            >
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <span>% Capaian Target</span>
                {onExplainKpi && <HelpCircle className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
              </span>
              <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5">
                {avgRevCapaian}%
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">Benchmark Q2: 50,0%</span>
            </div>
            <div
              onClick={() => onExplainKpi?.('rev_sisa')}
              className={`p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-xl transition-all ${
                onExplainKpi ? 'cursor-pointer hover:border-rose-300 hover:bg-rose-50/40 hover:shadow-2xs group' : ''
              }`}
              title={onExplainKpi ? "Klik untuk melihat formula & penjelasan KPI lengkap" : undefined}
            >
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-rose-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <span>Sisa Target Perkin</span>
                {onExplainKpi && <HelpCircle className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
              </span>
              <div className="text-xl font-black text-rose-600 font-mono mt-0.5">
                Rp {sisaRevTarget.toFixed(1)} M
              </div>
              <span className="text-[10px] text-slate-500">Hingga Akhir TA 2026</span>
            </div>
          </>
        )}

        {activeTab === 'belanja' && (
          <>
            <div
              onClick={() => onExplainKpi?.('exp_pagu')}
              className={`p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-xl transition-all ${
                onExplainKpi ? 'cursor-pointer hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-2xs group' : ''
              }`}
              title={onExplainKpi ? "Klik untuk melihat formula & penjelasan KPI lengkap" : undefined}
            >
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <span>Total Pagu DIPA {selectedYear}</span>
                {onExplainKpi && <HelpCircle className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
              </span>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                Rp {totalExpPagu.toFixed(1)} M
              </div>
              <span className="text-[10px] text-slate-500">Alokasi DIPA BLU</span>
            </div>
            <div
              onClick={() => onExplainKpi?.('exp_real')}
              className={`p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-xl transition-all ${
                onExplainKpi ? 'cursor-pointer hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-2xs group' : ''
              }`}
              title={onExplainKpi ? "Klik untuk melihat formula & penjelasan KPI lengkap" : undefined}
            >
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <span>Realisasi Belanja YTD</span>
                {onExplainKpi && <HelpCircle className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
              </span>
              <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5">
                Rp {totalExpReal.toFixed(1)} M
              </div>
              <span className="text-[10px] text-blue-700 font-semibold">SP2D Cair</span>
            </div>
            <div
              onClick={() => onExplainKpi?.('exp_serapan')}
              className={`p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-xl transition-all ${
                onExplainKpi ? 'cursor-pointer hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-2xs group' : ''
              }`}
              title={onExplainKpi ? "Klik untuk melihat formula & penjelasan KPI lengkap" : undefined}
            >
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <span>% Serapan Pagu</span>
                {onExplainKpi && <HelpCircle className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
              </span>
              <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5">
                {avgExpSerapan}%
              </div>
              <span className="text-[10px] text-slate-500">Benchmark Q2: 35,0%</span>
            </div>
            <div
              onClick={() => onExplainKpi?.('exp_sisa')}
              className={`p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-xl transition-all ${
                onExplainKpi ? 'cursor-pointer hover:border-slate-400 hover:bg-slate-100 hover:shadow-2xs group' : ''
              }`}
              title={onExplainKpi ? "Klik untuk melihat formula & penjelasan KPI lengkap" : undefined}
            >
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <span>Sisa Pagu Anggaran</span>
                {onExplainKpi && <HelpCircle className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />}
              </span>
              <div className="text-xl font-black text-slate-800 font-mono mt-0.5">
                Rp {sisaExpPagu.toFixed(1)} M
              </div>
              <span className="text-[10px] text-slate-500">Kebutuhan Q3 &amp; Q4</span>
            </div>
          </>
        )}
      </div>

      {/* 3. Creative View Mode Switcher Toolbar */}
      <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Format Visualisasi Tableau:</span>
            </span>

            {/* View 1: In-Cell Bullet Table */}
            <button
              onClick={() => setVisualMode('incell_bullet')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                visualMode === 'incell_bullet'
                  ? 'bg-white text-[#1F4E79] shadow-2xs border border-slate-300 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3 h-3" />
              <span>Tabel In-Cell Bullet (Tanpa Kolom Bar Terpisah)</span>
            </button>

            {/* View 2: Horizontal Bar Show Me #6 */}
            <button
              onClick={() => setVisualMode('horizontal_bar')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                visualMode === 'horizontal_bar'
                  ? 'bg-white text-[#1F4E79] shadow-2xs border border-slate-300 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3 h-3" />
              <span>Side-by-Side Horizontal Bar (Show Me #6)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onExplainKpi && (
              <button
                onClick={() => {
                  if (activeTab === 'pendapatan') onExplainKpi('rev_capaian');
                  else onExplainKpi('exp_serapan');
                }}
                className="text-[11px] font-semibold text-[#1F4E79] bg-white hover:bg-blue-50 border border-slate-300 px-2.5 py-1 rounded-md flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
              >
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Formula &amp; Insight</span>
              </button>
            )}

            {/* Tableau Guide Toggle */}
            <button
              onClick={() => setShowTableauGuide(!showTableauGuide)}
              className="text-[11px] font-medium text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Cara Bikin di Tableau</span>
              {showTableauGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

      {/* 4. Collapsible Tableau Implementation Guide Box */}
      {showTableauGuide && (
        <div className="p-3.5 bg-blue-50/70 border-b border-blue-200 text-xs text-slate-800 space-y-2 animate-in fade-in">
          <div className="font-bold text-blue-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>Panduan Implementasi Kreatif di Tableau Desktop (Meniadakan Kolom Visual Bar Tradisional):</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px] leading-relaxed">
            <div className="p-2.5 bg-white rounded-lg border border-blue-200">
              <strong className="text-blue-900 block mb-1">1. Pola In-Cell Bullet (Dual-Axis):</strong>
              <p className="text-slate-600">
                Di Tableau Desktop, jangan buat kolom bar terpisah. Gunakan fitur <em>Dual-Axis</em> pada <code>Measure Values</code> di Columns shelf. Atur Mark 1 sebagai <strong>Bar</strong> (Realisasi) dan Mark 2 sebagai <strong>Text Label</strong> (Angka Rp M), lalu sinkronkan axis.
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-blue-200">
              <strong className="text-blue-900 block mb-1">2. Bullet Graph Standar (Show Me #23):</strong>
              <p className="text-slate-600">
                Pilih <code>Show Me &gt; Bullet Graph</code>. Masukkan <code>[Realisasi]</code> pada Columns, <code>[Target]</code> pada Detail, lalu klik kanan axis &gt; <em>Add Reference Line</em> pada 50% (Q2 Benchmark).
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-blue-200">
              <strong className="text-blue-900 block mb-1">3. Status Color Encoding:</strong>
              <p className="text-slate-600">
                Buat Calculated Field: <code>IF [Capaian %] &gt;= 50 THEN 'Hijau' ELSEIF [Capaian %] &gt;= 35 THEN 'Kuning' ELSE 'Merah' END</code> dan seret ke <strong>Color Card</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Main Content Area according to selected visualMode */}
      <div className="p-3 sm:p-4 flex-1 overflow-x-auto">
        {/* ========================================================================= */}
        {/* PENDAPATAN TAB CONTENT */}
        {/* ========================================================================= */}
        {activeTab === 'pendapatan' && (
          <>
            {/* Banner Deskripsi Tabel Pendapatan PNBP */}
            <div className="mb-3 p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl flex items-start gap-2.5 text-xs text-slate-700 shadow-2xs">
              <TrendingUp className="w-4 h-4 text-[#1F4E79] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-[#002B49] block">
                  Tabel Target &amp; Realisasi Pendapatan PNBP (Penerimaan Negara Bukan Pajak)
                </span>
                <p className="text-[11.5px] text-slate-600 leading-relaxed">
                  Tabel ini menampilkan perbandingan target kinerja tahunan dengan penerimaan kas riil (kas masuk) yang dihasilkan dari berbagai unit usaha dan layanan operasional BP Batam (seperti Pelabuhan, Bandara Hang Nadim, RSBP, Pengelolaan Air Bersih, Pemanfaatan Tanah &amp; Bangunan) yang disetor ke kas BLU.
                </p>
              </div>
            </div>

            {/* VIEW MODE 1: IN-CELL BULLET TABLE (NO VISUAL BAR COLUMN!) - COMPACT SCROLL */}
            {visualMode === 'incell_bullet' && (
              <div className="border border-slate-200/90 rounded-xl overflow-x-auto max-h-[350px] overflow-y-auto shadow-2xs">
                <table className="w-full text-left text-xs border-collapse min-w-[760px]">
                  <thead className="sticky top-0 z-10 bg-[#0B2545] text-white font-bold text-[11px]">
                    <tr>
                      <th className="py-2 px-2.5 border-r border-blue-900/60 w-[34%]">
                        Unit Kerja Penghasil / Badan Usaha
                      </th>
                      <th className="py-2 px-2.5 border-r border-blue-900/60 text-right w-[18%]">
                        Target Perkin (Rp M)
                      </th>
                      <th className="py-2 px-2.5 border-r border-blue-900/60 text-left w-[26%]">
                        Realisasi YTD &amp; In-Cell Bullet
                      </th>
                      <th className="py-2 px-2.5 text-right w-[22%]">
                        Sisa Target (Rp M)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                  {revenueItems.map((item, idx) => {
                    const isEven = idx % 2 === 0;
                    const capaianPct = item.capaian ?? (item.target ? (item.realisasi / item.target) * 100 : 0);
                    const sisa = item.sisaTarget ?? Math.max(0, item.target - item.realisasi);
                    const status = getStatusBadge(capaianPct, 50);

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-blue-50/50 transition-colors ${
                          isEven ? 'bg-slate-50/50' : 'bg-white'
                        }`}
                      >
                        {/* Satker Column */}
                        <td className="py-3 px-3 border-r border-slate-200 font-semibold text-slate-900 align-middle">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            <span>{item.sumber}</span>
                          </div>
                        </td>

                        {/* Target Column */}
                        <td className="py-3 px-3 border-r border-slate-200 text-right font-mono text-slate-700 align-middle font-medium">
                          Rp {item.target.toFixed(1)} M
                        </td>

                        {/* Realisasi YTD with In-Cell Bullet Progress Visual inside the cell! */}
                        <td className="py-3 px-3 border-r border-slate-200 align-middle">
                          <div className="space-y-1">
                            {/* Figure and Status Badge */}
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-bold text-slate-900 text-xs">
                                Rp {item.realisasi.toFixed(1)} M
                              </span>
                              <span
                                className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded border ${status.bg}`}
                              >
                                {status.label}
                              </span>
                            </div>

                            {/* In-Cell Bullet Progress Bar with 50% Benchmark Marker */}
                            <div className="relative w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                              {/* Actual Progress Fill */}
                              <div
                                className={`h-full rounded-full transition-all ${status.barColor}`}
                                style={{ width: `${Math.min(100, capaianPct)}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                              <span>0%</span>
                              <span className="text-blue-700 font-bold">| 50% Ref Q2</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </td>

                        {/* Sisa Target Column */}
                        <td className="py-3 px-3 text-right font-mono font-medium text-slate-600 align-middle">
                          Rp {sisa.toFixed(1)} M
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* Total Row */}
                <tfoot className="bg-slate-100 font-bold text-xs border-t-2 border-slate-300">
                  <tr>
                    <td className="py-3 px-3 border-r border-slate-300 text-slate-900 uppercase">
                      TOTAL KONSOLIDASI PNBP
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300 text-right font-mono text-slate-900">
                      Rp {totalRevTarget.toFixed(1)} M
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-emerald-700 font-bold">
                          Rp {totalRevReal.toFixed(1)} M
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-[#1F4E79] font-mono text-[10px] font-bold">
                          {avgRevCapaian}% Konsolidasi
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-800">
                      Rp {sisaRevTarget.toFixed(1)} M
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

            {/* VIEW MODE 2: SIDE-BY-SIDE HORIZONTAL BAR (SHOW ME #6 TABLEAU) */}
            {visualMode === 'horizontal_bar' && (
              <div className="space-y-3.5 py-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-1 border-b border-slate-200">
                  <span>Unit Kerja Penghasil (Rows)</span>
                  <div className="flex items-center gap-4 text-[11px] font-mono">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
                      <span>Realisasi YTD (M)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-slate-300" />
                      <span>Target Perkin (M)</span>
                    </span>
                    <span className="text-blue-700 font-bold">
                      Ref Line Q2: 50%
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {revenueItems.map((item) => {
                    const capaianPct = item.capaian ?? (item.target ? (item.realisasi / item.target) * 100 : 0);
                    const status = getStatusBadge(capaianPct, 50);

                    return (
                      <div key={item.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{item.sumber}</span>
                          <div className="flex items-center gap-3 font-mono text-[11px]">
                            <span className="font-bold text-slate-900">
                              Rp {item.realisasi.toFixed(1)} M{' '}
                              <span className="text-slate-400 font-normal">/ Rp {item.target.toFixed(1)} M</span>
                            </span>
                            <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold border ${status.bg}`}>
                              {capaianPct.toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        {/* Dual Bar Track with 50% Reference Line */}
                        <div className="relative w-full bg-slate-100 h-4 rounded-md overflow-hidden border border-slate-200/80">
                          {/* 50% Q2 Reference Line Marker */}
                          <div
                            className="absolute top-0 bottom-0 w-[2px] bg-blue-600 z-10"
                            style={{ left: '50%' }}
                            title="Tableau Reference Line: Q2 Benchmark 50%"
                          />

                          {/* Realisasi Bar Fill */}
                          <div
                            className={`h-full rounded-xs transition-all ${status.barColor}`}
                            style={{ width: `${Math.min(100, capaianPct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* ========================================================================= */}
        {/* BELANJA TAB CONTENT */}
        {/* ========================================================================= */}
        {activeTab === 'belanja' && (
          <>
            {/* Banner Deskripsi Tabel Realisasi Belanja */}
            <div className="mb-3 p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl flex items-start gap-2.5 text-xs text-slate-700 shadow-2xs">
              <Wallet className="w-4 h-4 text-[#1F4E79] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-[#002B49] block">
                  Tabel Pagu &amp; Realisasi Belanja (Pengeluaran Kas SP2D)
                </span>
                <p className="text-[11.5px] text-slate-600 leading-relaxed">
                  Tabel ini menampilkan rincian alokasi pagu DIPA dan pencairan anggaran belanja riil (SP2D) berdasarkan program kerja serta unit operasional BP Batam untuk mengontrol dan mengevaluasi daya serap anggaran belanja pegawai, barang, jasa, dan belanja modal.
                </p>
              </div>
            </div>

            {/* VIEW MODE 1: IN-CELL BULLET TABLE (NO VISUAL BAR COLUMN!) - COMPACT SCROLL */}
            {visualMode === 'incell_bullet' && (
              <div className="border border-slate-200/90 rounded-xl overflow-x-auto max-h-[350px] overflow-y-auto shadow-2xs">
                <table className="w-full text-left text-xs border-collapse min-w-[760px]">
                  <thead className="sticky top-0 z-10 bg-[#0B2545] text-white font-bold text-[11px]">
                    <tr>
                      <th className="py-2 px-2.5 border-r border-blue-900/60 w-[34%]">
                        Komponen Belanja / Satker
                      </th>
                      <th className="py-2 px-2.5 border-r border-blue-900/60 text-right w-[18%]">
                        Pagu DIPA (Rp M)
                      </th>
                      <th className="py-2 px-2.5 border-r border-blue-900/60 text-left w-[26%]">
                        Realisasi Belanja &amp; In-Cell Bullet
                      </th>
                      <th className="py-2 px-2.5 text-right w-[22%]">
                        Sisa Pagu (Rp M)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                  {expenseItems.map((item, idx) => {
                    const isEven = idx % 2 === 0;
                    const programName = item.program || item.unitKerja || `Komponen Belanja ${item.id}`;
                    const serapanPct = item.serapan ?? item.persentase ?? (item.pagu ? (item.realisasi / item.pagu) * 100 : 0);
                    const sisaPagu = item.sisaAnggaran ?? item.sisa ?? Math.max(0, item.pagu - item.realisasi);
                    const status = getStatusBadge(serapanPct, 35); // Belanja Q2 benchmark is 35%

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-blue-50/50 transition-colors ${
                          isEven ? 'bg-slate-50/50' : 'bg-white'
                        }`}
                      >
                        {/* Satker Column */}
                        <td className="py-3 px-3 border-r border-slate-200 font-semibold text-slate-900 align-middle">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1F4E79]" />
                            <span>{programName}</span>
                          </div>
                        </td>

                        {/* Pagu Column */}
                        <td className="py-3 px-3 border-r border-slate-200 text-right font-mono text-slate-700 align-middle font-medium">
                          Rp {item.pagu.toFixed(1)} M
                        </td>

                        {/* Realisasi Belanja with In-Cell Bullet Progress Visual inside the cell! */}
                        <td className="py-3 px-3 border-r border-slate-200 align-middle">
                          <div className="space-y-1">
                            {/* Figure and Status Badge */}
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-bold text-slate-900 text-xs">
                                Rp {item.realisasi.toFixed(1)} M
                              </span>
                              <span
                                className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded border ${status.bg}`}
                              >
                                {status.label}
                              </span>
                            </div>

                            {/* In-Cell Bullet Progress Bar with 35% Benchmark Marker */}
                            <div className="relative w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${status.barColor}`}
                                style={{ width: `${Math.min(100, serapanPct)}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                              <span>0%</span>
                              <span className="text-blue-700 font-bold">| 35% Ref Q2</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </td>

                        {/* Sisa Pagu Column */}
                        <td className="py-3 px-3 text-right font-mono font-medium text-slate-600 align-middle">
                          Rp {sisaPagu.toFixed(1)} M
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* Total Row */}
                <tfoot className="bg-slate-100 font-bold text-xs border-t-2 border-slate-300">
                  <tr>
                    <td className="py-3 px-3 border-r border-slate-300 text-slate-900 uppercase">
                      TOTAL KONSOLIDASI BELANJA
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300 text-right font-mono text-slate-900">
                      Rp {totalExpPagu.toFixed(1)} M
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[#1F4E79] font-bold">
                          Rp {totalExpReal.toFixed(1)} M
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-[#1F4E79] font-mono text-[10px] font-bold">
                          {avgExpSerapan}% Konsolidasi
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-800">
                      Rp {sisaExpPagu.toFixed(1)} M
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

            {/* VIEW MODE 2: SIDE-BY-SIDE HORIZONTAL BAR (SHOW ME #6 TABLEAU) */}
            {visualMode === 'horizontal_bar' && (
              <div className="space-y-3.5 py-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-1 border-b border-slate-200">
                  <span>Komponen Belanja (Rows)</span>
                  <div className="flex items-center gap-4 text-[11px] font-mono">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#1F4E79]" />
                      <span>Realisasi SP2D (M)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-slate-300" />
                      <span>Pagu DIPA (M)</span>
                    </span>
                    <span className="text-blue-700 font-bold">
                      Ref Line Q2: 35%
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {expenseItems.map((item) => {
                    const programName = item.program || item.unitKerja || `Komponen Belanja ${item.id}`;
                    const serapanPct = item.serapan ?? item.persentase ?? (item.pagu ? (item.realisasi / item.pagu) * 100 : 0);
                    const status = getStatusBadge(serapanPct, 35);

                    return (
                      <div key={item.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{programName}</span>
                          <div className="flex items-center gap-3 font-mono text-[11px]">
                            <span className="font-bold text-slate-900">
                              Rp {item.realisasi.toFixed(1)} M{' '}
                              <span className="text-slate-400 font-normal">/ Rp {item.pagu.toFixed(1)} M</span>
                            </span>
                            <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold border ${status.bg}`}>
                              {serapanPct.toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        {/* Dual Bar Track with 35% Reference Line */}
                        <div className="relative w-full bg-slate-100 h-4 rounded-md overflow-hidden border border-slate-200/80">
                          {/* 35% Q2 Reference Line Marker */}
                          <div
                            className="absolute top-0 bottom-0 w-[2px] bg-blue-600 z-10"
                            style={{ left: '35%' }}
                            title="Tableau Reference Line: Q2 Benchmark 35%"
                          />

                          {/* Realisasi Bar Fill */}
                          <div
                            className={`h-full rounded-xs transition-all ${status.barColor}`}
                            style={{ width: `${Math.min(100, serapanPct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 6. Footer Caption with Tableau Info */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>
            Sumber Data: SIMKEU BP Batam • Sinkronisasi SAKTI Kementerian Keuangan RI • Perjanjian Kinerja TA {selectedYear}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
            Tableau-Ready: Dual-Axis &amp; In-Cell Bullet
          </span>
          <span className="font-mono text-slate-400">Extract Live</span>
        </div>
      </div>
    </div>
  );
};
