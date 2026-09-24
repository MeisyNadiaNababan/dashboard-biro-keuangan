import React, { useState } from 'react';
import {
  Coins,
  TrendingUp,
  Landmark,
  Scale,
  Activity,
  Layers,
  FileSpreadsheet,
  AlertTriangle,
  Building2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { KpiMetricsRow } from '../KpiMetricsRow';
import { KPI_METRICS_DATA } from '../../data/mockData';
import { LraBluCard } from './LraBluCard';
import { LaporanFinansialBlu4WayCard } from './LaporanFinansialBlu4WayCard';
import { SaldoBankRealTimeCard } from './SaldoBankRealTimeCard';
import { PenerimaanSumberDanaCard } from './PenerimaanSumberDanaCard';
import { PiutangTakTertagihCard } from './PiutangTakTertagihCard';
import { SurplusDefisitUnitCard } from './SurplusDefisitUnitCard';

interface BiroKeuanganDashboardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  activeSubMenu?: string;
}

type KeuanganModuleTab =
  | 'all'
  | 'lra'
  | 'finansial-4way'
  | 'saldo-bank'
  | 'sumber-dana'
  | 'piutang-macet'
  | 'surplus-defisit';

export const BiroKeuanganDashboard: React.FC<BiroKeuanganDashboardProps> = ({
  onOpenFormulaModal,
  onOpenExportModal,
  activeSubMenu,
}) => {
  const [activeTab, setActiveTab] = useState<KeuanganModuleTab>('all');

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Sub-Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Semua Visualisasi (Overview)
          </button>
          <button
            onClick={() => setActiveTab('lra')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'lra'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            LRA BLU (#3 • LRA Satker)
          </button>
          <button
            onClick={() => setActiveTab('finansial-4way')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'finansial-4way'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            4 Laporan Finansial (#2, #4, #5, #6)
          </button>
          <button
            onClick={() => setActiveTab('saldo-bank')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'saldo-bank'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Saldo Bank Real Time (#13)
          </button>
          <button
            onClick={() => setActiveTab('sumber-dana')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'sumber-dana'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Penerimaan Sumber Dana (#14)
          </button>
          <button
            onClick={() => setActiveTab('piutang-macet')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'piutang-macet'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Piutang Tak Tertagih (#20)
          </button>
          <button
            onClick={() => setActiveTab('surplus-defisit')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'surplus-defisit'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Surplus &amp; Defisit Unit
          </button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-xs">
          <span className="text-[11px] text-slate-500 font-mono hidden md:inline">
            Satker 568717 • Periode Final Smt I 2026
          </span>
        </div>
      </div>

      {/* REQUIREMENT 11: KPI JANGAN DIRUBAH (Top 6 Executive KPI Metric BAN Cards) */}
      <section id="keuangan-kpi-row" aria-label="KPI Ringkasan Eksekutif Keuangan">
        <KpiMetricsRow
          metrics={KPI_METRICS_DATA}
          onSelectMetric={(id) => onOpenFormulaModal && onOpenFormulaModal(id)}
        />
      </section>

      {/* 1. REQUIREMENT 1: LAPORAN REALISASI ANGGARAN BLU (LRA-BLU-per-30-Juni-2026.pdf) */}
      {(activeTab === 'all' || activeTab === 'lra') && (
        <section id="pendapatan-section" aria-label="Laporan Realisasi Anggaran BLU">
          <LraBluCard onOpenFormulaModal={onOpenFormulaModal} />
        </section>
      )}

      {/* 2–6. REQUIREMENTS 2-6: KONSOLIDASI 4 LAPORAN POKOK FINANSIAL & SHEET SWAP (LO, LPE, LAK, NERACA) */}
      {(activeTab === 'all' || activeTab === 'finansial-4way') && (
        <section id="belanja-section" aria-label="4 Laporan Pokok Finansial BLU">
          <LaporanFinansialBlu4WayCard onOpenFormulaModal={onOpenFormulaModal} />
        </section>
      )}

      {/* 7 & 8. REQUIREMENTS 7 & 8: SALDO BANK REAL TIME & PENERIMAAN SUMBER DANA */}
      {(activeTab === 'all' || activeTab === 'saldo-bank' || activeTab === 'sumber-dana') && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Requirement 7: Saldo Bank Real Time */}
          {(activeTab === 'all' || activeTab === 'saldo-bank') && (
            <section id="kas-bank-section" aria-label="Laporan Saldo Bank Real Time">
              <SaldoBankRealTimeCard onOpenFormulaModal={onOpenFormulaModal} />
            </section>
          )}

          {/* Requirement 8: Penerimaan Sumber Dana */}
          {(activeTab === 'all' || activeTab === 'sumber-dana') && (
            <section aria-label="Laporan Penerimaan Sumber Dana">
              <PenerimaanSumberDanaCard onOpenFormulaModal={onOpenFormulaModal} />
            </section>
          )}
        </div>
      )}

      {/* 9. REQUIREMENT 9: REKAPITULASI PIUTANG TAK TERTAGIH */}
      {(activeTab === 'all' || activeTab === 'piutang-macet') && (
        <section id="piutang-section" aria-label="Rekapitulasi Piutang Tak Tertagih">
          <PiutangTakTertagihCard onOpenFormulaModal={onOpenFormulaModal} />
        </section>
      )}

      {/* 10. VISUALISASI SURPLUS DAN DEFISIT SETIAP UNIT (PENDAPATAN VS BELANJA) */}
      {(activeTab === 'all' || activeTab === 'surplus-defisit') && (
        <section id="kemandirian-fiskal" aria-label="Analisis Surplus dan Defisit Setiap Unit">
          <SurplusDefisitUnitCard onOpenFormulaModal={onOpenFormulaModal} />
        </section>
      )}
    </div>
  );
};
