import React, { useState } from 'react';
import {
  TrendingUp,
  Building2,
  ShieldCheck,
  Truck,
  Filter,
  Sparkles,
  Download,
  FileCode2,
  Calendar,
  Layers,
  Award,
  ChevronDown,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Maximize2,
  ExternalLink,
} from 'lucide-react';
import {
  PERKIN_A4_METADATA,
  PERKIN_A4_KPIS,
} from './investasiPengusahaanData';
import { InvestasiPengusahaanKpiRow } from './InvestasiPengusahaanKpiRow';
import { InvestasiPengusahaanVisualCharts } from './InvestasiPengusahaanVisualCharts';
import { InvestasiPengusahaanUnitCards } from './InvestasiPengusahaanUnitCards';
import { InvestasiPengusahaanDeepDiveCenter } from './InvestasiPengusahaanDeepDiveCenter';
import { InvestasiPengusahaanFormulaModal } from './InvestasiPengusahaanFormulaModal';

interface InvestasiPengusahaanDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const InvestasiPengusahaanDashboard: React.FC<
  InvestasiPengusahaanDashboardProps
> = ({
  activeSubTab = 'ikhtisar',
  onOpenExportModal,
  onSwitchUnit,
}) => {
  // Compact Filters State (Non-intrusive & Space-efficient)
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2025');
  const [selectedQuarter, setSelectedQuarter] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('ALL');
  const [selectedSatkerFilter, setSelectedSatkerFilter] = useState<
    'ALL' | 'dit-investasi' | 'dit-pengembangan-kek' | 'dit-pengendalian-usaha' | 'dit-lalu-lintas-barang'
  >('ALL');

  // Deep-Dive Unit State (Default: dit-investasi)
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>('dit-investasi');

  // Internal Formula Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [modalKpiId, setModalKpiId] = useState<string | null>('ikp-1-investasi-kpbpb');

  const handleOpenFormula = (kpiId: string) => {
    setModalKpiId(kpiId);
    setIsFormulaModalOpen(true);
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('investasi-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 pb-12">
      {/* ============================================================== */}
      {/* 1. COMPACT FILTER BAR (NON-INTRUSIVE & SPACE-EFFICIENT)        */}
      {/* ============================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-2 sm:p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Badge Label */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono font-bold">
            <Filter className="w-3.5 h-3.5 text-cyan-300" />
            <span>FILTER PERKIN A4</span>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setSelectedYear('2025')}
              className={`px-2.5 py-1 rounded-md font-bold text-xs transition-all cursor-pointer ${
                selectedYear === '2025'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TA 2025 (Perkin)
            </button>
            <button
              onClick={() => setSelectedYear('2026')}
              className={`px-2.5 py-1 rounded-md font-bold text-xs transition-all cursor-pointer ${
                selectedYear === '2026'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TA 2026 (Berjalan)
            </button>
          </div>

          {/* Triwulan Cut-Off */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {(['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuarter(q)}
                className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  selectedQuarter === q
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Filter Satker */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setSelectedSatkerFilter('ALL')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Konsolidasi 4 Satker
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('dit-investasi');
                handleSelectDeepDive('dit-investasi');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'dit-investasi'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dit. Investasi
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('dit-pengembangan-kek');
                handleSelectDeepDive('dit-pengembangan-kek');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'dit-pengembangan-kek'
                  ? 'bg-white text-emerald-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pengembangan KEK
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('dit-pengendalian-usaha');
                handleSelectDeepDive('dit-pengendalian-usaha');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'dit-pengendalian-usaha'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pengendalian Usaha
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('dit-lalu-lintas-barang');
                handleSelectDeepDive('dit-lalu-lintas-barang');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'dit-lalu-lintas-barang'
                  ? 'bg-white text-cyan-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lalu Lintas Barang
            </button>
          </div>
        </div>

        {/* Quick Actions Right */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => handleOpenFormula('ikp-1-investasi-kpbpb')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 font-bold transition-colors cursor-pointer"
          >
            <FileCode2 className="w-3.5 h-3.5 text-blue-700" />
            <span className="hidden sm:inline">Kamus Rumus &amp; Definisi KPI</span>
            <span className="sm:hidden">Rumus</span>
          </button>

          {onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Ekspor Laporan</span>
            </button>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. EXECUTIVE BANNER - PERKIN A.4 TAHUN 2025                    */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-r from-[#002B49] via-[#0B1E38] to-[#122A4E] text-white rounded-2xl p-4 sm:p-5 border border-slate-700/80 shadow-sm relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider">
                PERJANJIAN KINERJA DEPUTI &bull; PERKIN A.4
              </span>
              <span className="text-xs text-slate-300 font-mono">
                No: {PERKIN_A4_METADATA.noPerkin}
              </span>
            </div>

            <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white">
              Pusat Komando Eksekutif Investasi &amp; Pengusahaan BP Batam
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              Monitoring 4 Indikator Kinerja Program utama (Realisasi Investasi KPBPB Rp 31,48 T, KEK Rp 9,09 T, Pengendalian Pengusahaan 94,60%, dan Fasilitasi 52 Investor Pipeline) serta pengendalian 4 Unit Kerja strategis di lingkungan BP Batam.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300 font-mono">
              <span>Pejabat: <strong className="text-white">{PERKIN_A4_METADATA.officialName}</strong></span>
              <span className="text-slate-600">|</span>
              <span>Kepala BP Batam: <strong className="text-white">{PERKIN_A4_METADATA.supervisorName}</strong></span>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 shrink-0 lg:max-w-md w-full">
            <div className="bg-slate-900/60 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700/60">
              <div className="text-[10px] font-mono text-slate-400">PAGU PROGRAM</div>
              <div className="text-sm sm:text-base font-black font-mono text-cyan-300">
                Rp 88,42 M
              </div>
              <div className="text-[10px] text-slate-400 font-mono">4 Kegiatan Utama</div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700/60">
              <div className="text-[10px] font-mono text-slate-400">REALISASI ANGGARAN</div>
              <div className="text-sm sm:text-base font-black font-mono text-emerald-400">
                Rp 35,12 M
              </div>
              <div className="text-[10px] text-emerald-400 font-mono font-bold">39,72% Serapan</div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-900/60 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700/60">
              <div className="text-[10px] font-mono text-slate-400">RATA-RATA IKP</div>
              <div className="text-sm sm:text-base font-black font-mono text-amber-300">
                114,67%
              </div>
              <div className="text-[10px] text-emerald-400 font-mono font-bold">100% Melampaui</div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. 4 INDIKATOR KINERJA PROGRAM (PERKIN A.4 TAHUN 2025)         */}
      {/* ============================================================== */}
      <InvestasiPengusahaanKpiRow
        onOpenFormulaModal={handleOpenFormula}
        selectedQuarter={selectedQuarter}
      />

      {/* ============================================================== */}
      {/* 4. VISUALISASI ANALITIK SETELAH KPI (RINGKASAN & DETAIL)       */}
      {/* ============================================================== */}
      <InvestasiPengusahaanVisualCharts
        onOpenFormulaModal={handleOpenFormula}
        onNavigateToUnit={handleSelectDeepDive}
      />

      {/* ============================================================== */}
      {/* 5. 4 UNIT KERJA PENGAMPU INVESTASI & PENGUSAHAAN               */}
      {/* ============================================================== */}
      <InvestasiPengusahaanUnitCards
        onAnalyzeUnit={handleSelectDeepDive}
        onNavigateToUnit={(unitId) => onSwitchUnit && onSwitchUnit(unitId)}
      />

      {/* ============================================================== */}
      {/* 6. UNIT DEEP-DIVE CENTER (4 UNIT KERJA TERKAIT)                */}
      {/* ============================================================== */}
      <InvestasiPengusahaanDeepDiveCenter
        selectedUnitId={selectedDeepDiveUnit}
        onSelectUnit={setSelectedDeepDiveUnit}
        onOpenFormulaModal={handleOpenFormula}
        onNavigateToFullDashboard={(unitId) => onSwitchUnit && onSwitchUnit(unitId)}
      />

      {/* ============================================================== */}
      {/* 7. FORMULA & DEFINISI MODAL                                    */}
      {/* ============================================================== */}
      <InvestasiPengusahaanFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        selectedKpiId={modalKpiId}
      />
    </div>
  );
};
