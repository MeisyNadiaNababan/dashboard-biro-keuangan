import React, { useState } from 'react';
import {
  TrendingUp,
  Wallet,
  BarChart3,
  HelpCircle,
  Layers,
} from 'lucide-react';
import { RevenueItem, ExpenseItem } from '../types';
import {
  REVENUE_TOTAL,
  EXPENSE_TOTAL,
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

export const BiroKeuanganFinancialCard: React.FC<BiroKeuanganFinancialCardProps> = ({
  revenueItems,
  expenseItems,
  selectedYear,
  selectedUnit = 'ALL',
  selectedMonth = 'April',
  onExplainKpi,
}) => {
  const [activeTab, setActiveTab] = useState<FinancialTabType>('pendapatan');

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

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden flex flex-col font-sans select-none">
      {/* 1. Header with Data Tab Switcher */}
      <div className="px-4 py-3.5 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-4 bg-[#002B49] rounded-2xs" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#002B49]">
                Realisasi Pendapatan dan Belanja • TA {selectedYear}
              </h3>
              {selectedUnit !== 'ALL' && (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded font-bold">
                  Filtered: {selectedUnit}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-normal">
              Realisasi Kas Masuk PNBP &amp; Serapan Belanja Satker Terhadap Alokasi DIPA BLU
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold border border-slate-200/80">
          <button
            onClick={() => setActiveTab('pendapatan')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pendapatan'
                ? 'bg-[#002B49] text-white shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Pendapatan PNBP</span>
            <span className="ml-1 text-[10px] opacity-80 font-mono hidden sm:inline">({avgRevCapaian}%)</span>
          </button>
          <button
            onClick={() => setActiveTab('belanja')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'belanja'
                ? 'bg-[#002B49] text-white shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Realisasi Belanja</span>
            <span className="ml-1 text-[10px] opacity-80 font-mono hidden sm:inline">({avgExpSerapan}%)</span>
          </button>
        </div>
      </div>

      {/* 2. Executive 4-Tile BAN Strip */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {activeTab === 'pendapatan' && (
          <>
            <div
              onClick={() => onExplainKpi?.('rev_target')}
              className="p-3 bg-white border border-slate-200/90 rounded-xl shadow-2xs cursor-pointer hover:border-blue-300 transition-colors"
              title="Target Perjanjian Kinerja"
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Target Perkin {selectedYear}
              </span>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                Rp {totalRevTarget.toFixed(1)} M
              </div>
            </div>

            <div
              onClick={() => onExplainKpi?.('rev_real')}
              className="p-3 bg-white border border-emerald-200/90 rounded-xl shadow-2xs cursor-pointer hover:border-emerald-300 transition-colors"
              title="Kas Masuk Riil"
            >
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Realisasi Kas Masuk
              </span>
              <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
                Rp {totalRevReal.toFixed(1)} M
              </div>
            </div>

            <div
              onClick={() => onExplainKpi?.('rev_sisa')}
              className="p-3 bg-white border border-slate-200/90 rounded-xl shadow-2xs cursor-pointer hover:border-rose-300 transition-colors"
              title="Sisa Target yang Harus Dicapai"
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Sisa Target Tahunan
              </span>
              <div className="text-xl font-black text-rose-600 font-mono mt-0.5">
                Rp {sisaRevTarget.toFixed(1)} M
              </div>
            </div>

            <div
              onClick={() => onExplainKpi?.('rev_capaian')}
              className="p-3 bg-blue-50/70 border border-blue-200/90 rounded-xl shadow-2xs cursor-pointer hover:border-blue-400 transition-colors"
              title="Persentase Capaian Realisasi PNBP terhadap Target Perkin"
            >
              <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">
                Persentase Realisasi PNBP
              </span>
              <div className="text-xl font-black text-[#002B49] font-mono mt-0.5">
                {avgRevCapaian.toFixed(1)}%
              </div>
            </div>
          </>
        )}

        {activeTab === 'belanja' && (
          <>
            <div
              onClick={() => onExplainKpi?.('exp_pagu')}
              className="p-3 bg-white border border-slate-200/90 rounded-xl shadow-2xs cursor-pointer hover:border-blue-300 transition-colors"
              title="Total Pagu DIPA"
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Pagu DIPA {selectedYear}
              </span>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                Rp {totalExpPagu.toFixed(1)} M
              </div>
            </div>

            <div
              onClick={() => onExplainKpi?.('exp_real')}
              className="p-3 bg-white border border-blue-200/90 rounded-xl shadow-2xs cursor-pointer hover:border-blue-400 transition-colors"
              title="Realisasi Pengeluaran Kas SP2D"
            >
              <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">
                Realisasi Belanja
              </span>
              <div className="text-xl font-black text-blue-700 font-mono mt-0.5">
                Rp {totalExpReal.toFixed(1)} M
              </div>
            </div>

            <div
              onClick={() => onExplainKpi?.('exp_sisa')}
              className="p-3 bg-white border border-slate-200/90 rounded-xl shadow-2xs cursor-pointer hover:border-slate-300 transition-colors"
              title="Sisa Pagu Anggaran"
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Sisa Pagu Anggaran
              </span>
              <div className="text-xl font-black text-slate-800 font-mono mt-0.5">
                Rp {sisaExpPagu.toFixed(1)} M
              </div>
            </div>

            <div
              onClick={() => onExplainKpi?.('exp_serapan')}
              className="p-3 bg-blue-50/70 border border-blue-200/90 rounded-xl shadow-2xs cursor-pointer hover:border-blue-400 transition-colors"
              title="Persentase Serapan Belanja terhadap Pagu DIPA"
            >
              <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">
                % Serapan Anggaran
              </span>
              <div className="text-xl font-black text-[#002B49] font-mono mt-0.5">
                {avgExpSerapan.toFixed(1)}%
              </div>
            </div>
          </>
        )}
      </div>

      {/* 3. Subheader / Shelf Indicator */}
      <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
            Model Visualisasi: Side-by-Side Horizontal Bar (Tableau Show Me #6)
          </span>
        </div>

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
      </div>

      {/* 4. Main Content Area (Side by Side Horizontal Bar View Only) */}
      <div className="p-3 sm:p-4 flex-1 overflow-x-auto">
        {/* ========================================================================= */}
        {/* PENDAPATAN TAB CONTENT (SIDE-BY-SIDE HORIZONTAL BAR ONLY) */}
        {/* ========================================================================= */}
        {activeTab === 'pendapatan' && (
          <div className="space-y-3 py-1">
            <TableauShelvesBadge
              showMe="Show Me #6 (Horizontal Bar)"
              rows="[satker_penghasil_pnbp]"
              columns="SUM([realisasi_kas_masuk]), SUM([target_perkin])"
              color="[satker]"
              referenceLine="Benchmark Q2: 50%"
            />

            <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-2 border-b border-slate-200">
              <span className="uppercase tracking-wider text-[#002B49]">10 Satker Penghasil PNBP (Peringkat Kinerja)</span>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#002B49]" />
                  <span>Realisasi YTD</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-slate-200" />
                  <span>Target Perkin</span>
                </span>
                <span className="text-blue-700 font-bold">
                  Benchmark Q2: 50%
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              {revenueItems.map((item, idx) => {
                const capaianPct = item.capaian ?? (item.target ? (item.realisasi / item.target) * 100 : 0);
                const sisa = item.sisaTarget ?? Math.max(0, item.target - item.realisasi);

                return (
                  <div
                    key={item.id}
                    onClick={() => onExplainKpi?.('pendapatan')}
                    className="p-2 sm:p-2.5 bg-white hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-300 rounded-xl transition-all shadow-2xs space-y-1 cursor-pointer group"
                    title="Klik untuk membuka formula perhitungan capaian PNBP"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded bg-[#002B49] text-white flex items-center justify-center font-mono font-bold text-[9px]">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-slate-900 group-hover:text-blue-700 text-xs sm:text-[13px]">{item.sumber}</span>
                        <HelpCircle className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-slate-500 font-medium">
                          <span className="font-black text-slate-900 group-hover:text-blue-800">Rp {item.realisasi.toFixed(1)} M</span>
                          {' '}/ Rp {item.target.toFixed(1)} M
                        </span>
                      </div>
                    </div>

                    {/* Compact Bar Track */}
                    <div className="relative w-full bg-slate-100 h-3.5 sm:h-4 rounded-md overflow-hidden border border-slate-200/80 flex items-center">
                      {/* 50% Q2 Reference Line Marker */}
                      <div
                        className="absolute top-0 bottom-0 w-[2px] bg-blue-600 z-10"
                        style={{ left: '50%' }}
                        title="Tableau Reference Line: Q2 Benchmark 50%"
                      />
                      {/* Realisasi Bar Fill with % INSIDE */}
                      <div
                        className="h-full rounded-md transition-all bg-[#002B49] flex items-center justify-end px-1.5"
                        style={{ width: `${Math.max(14, Math.min(100, capaianPct))}%` }}
                      >
                        <span className="text-[9px] sm:text-[10px] font-bold text-white font-mono whitespace-nowrap leading-none drop-shadow-2xs">
                          {capaianPct.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Sisa Target: Rp {sisa.toFixed(1)} M</span>
                      <span className={capaianPct >= 50 ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
                        {capaianPct >= 50 ? 'Melampaui Benchmark Q2 • Formula' : 'Menuju Target Semester I • Formula'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BELANJA TAB CONTENT (SIDE-BY-SIDE HORIZONTAL BAR ONLY) */}
        {/* ========================================================================= */}
        {activeTab === 'belanja' && (
          <div className="space-y-3 py-1">
            <TableauShelvesBadge
              showMe="Show Me #6 (Horizontal Bar)"
              rows="[komponen_belanja_operasional_dan_modal]"
              columns="SUM([realisasi_sp2d]), SUM([pagu_dipa])"
              color="[program_belanja]"
              referenceLine="Ref Line Q2: 35%"
            />

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

            <div className="space-y-1.5">
              {expenseItems.map((item) => {
                const programName = item.program || item.unitKerja || `Komponen Belanja ${item.id}`;
                const serapanPct = item.serapan ?? item.persentase ?? (item.pagu ? (item.realisasi / item.pagu) * 100 : 0);

                return (
                  <div
                    key={item.id}
                    onClick={() => onExplainKpi?.('belanja')}
                    className="space-y-1 p-2 sm:p-2.5 rounded-xl hover:bg-blue-50/50 cursor-pointer group transition-colors border border-slate-100 hover:border-blue-200 bg-white shadow-2xs"
                    title="Klik untuk melihat formula dan rincian komponen belanja"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800 group-hover:text-blue-700">{programName}</span>
                        <HelpCircle className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="font-bold text-slate-900 group-hover:text-blue-800">
                          Rp {item.realisasi.toFixed(1)} M{' '}
                          <span className="text-slate-400 font-normal">/ Rp {item.pagu.toFixed(1)} M</span>
                        </span>
                      </div>
                    </div>

                    {/* Compact Bar Track */}
                    <div className="relative w-full bg-slate-100 h-3.5 sm:h-4 rounded-md overflow-hidden border border-slate-200/80 flex items-center">
                      {/* 35% Q2 Reference Line Marker */}
                      <div
                        className="absolute top-0 bottom-0 w-[2px] bg-blue-600 z-10"
                        style={{ left: '35%' }}
                        title="Tableau Reference Line: Q2 Benchmark 35%"
                      />

                      {/* Realisasi Bar Fill with % INSIDE */}
                      <div
                        className="h-full rounded-md transition-all bg-[#1F4E79] flex items-center justify-end px-1.5"
                        style={{ width: `${Math.max(14, Math.min(100, serapanPct))}%` }}
                      >
                        <span className="text-[9px] sm:text-[10px] font-bold text-white font-mono whitespace-nowrap leading-none drop-shadow-2xs">
                          {serapanPct.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 5. Footer Caption */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>
            Sumber Data: SIMKEU BP Batam • Sinkronisasi SAKTI Kementerian Keuangan RI • Perjanjian Kinerja TA {selectedYear}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold border border-blue-200">
            Tableau-Ready: Side-by-Side Horizontal Bar
          </span>
          <span className="font-mono text-slate-400">Extract Live</span>
        </div>
      </div>
    </div>
  );
};
