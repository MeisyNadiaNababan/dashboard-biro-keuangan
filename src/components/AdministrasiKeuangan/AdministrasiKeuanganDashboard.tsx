import React, { useState } from 'react';
import {
  Award,
  Calendar,
  Filter,
  RefreshCw,
  Download,
  FileText,
  Building2,
  Users,
  ShieldAlert,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  FileCode2,
  DollarSign,
  ArrowRight,
  HelpCircle,
  Layers,
} from 'lucide-react';
import {
  PERKIN_A1_INFO,
  PERKIN_A1_KPIS,
  KEGIATAN_ANGGARAN_PERKIN_A1,
} from './administrasiKeuanganData';
import { AdministrasiKeuanganKpiRow } from './AdministrasiKeuanganKpiRow';
import { AdministrasiKeuanganVisualCharts } from './AdministrasiKeuanganVisualCharts';
import { AdministrasiKeuanganUnitCards } from './AdministrasiKeuanganUnitCards';
import { AdministrasiKeuanganDeepDiveCenter } from './AdministrasiKeuanganDeepDiveCenter';
import { AdministrasiKeuanganFormulaModal } from './AdministrasiKeuanganFormulaModal';

interface AdministrasiKeuanganDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const AdministrasiKeuanganDashboard: React.FC<
  AdministrasiKeuanganDashboardProps
> = ({ activeSubTab = 'ikhtisar', onOpenExportModal, onSwitchUnit }) => {
  // Compact Filters State
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2025');
  const [selectedQuarter, setSelectedQuarter] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q2');
  const [selectedSatkerFilter, setSelectedSatkerFilter] = useState<'ALL' | 'biro-keuangan' | 'biro-sdm' | 'biro-organisasi'>('ALL');
  const [viewMode, setViewMode] = useState<'ikhtisar' | 'kegiatan' | 'fiskal' | 'deep_dive'>('ikhtisar');

  // Deep-Dive Unit State
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>('biro-keuangan');

  // Internal Formula Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [modalKpiId, setModalKpiId] = useState<string | null>('ikp-1-rb');

  const handleOpenFormula = (kpiId: string) => {
    setModalKpiId(kpiId);
    setIsFormulaModalOpen(true);
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('administrasi-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 pb-12">
      {/* 1. COMPACT FILTER BAR (NON-INTRUSIVE & SPACE-EFFICIENT) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-2 sm:p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Badge Label */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono font-bold">
            <Filter className="w-3.5 h-3.5 text-cyan-300" />
            <span>FILTER PERKIN A1</span>
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
              Konsolidasi 3 Satker
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('biro-keuangan');
                handleSelectDeepDive('biro-keuangan');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'biro-keuangan'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Keuangan
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('biro-sdm');
                handleSelectDeepDive('biro-sdm');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'biro-sdm'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SDM
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('biro-organisasi');
                handleSelectDeepDive('biro-organisasi');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'biro-organisasi'
                  ? 'bg-white text-cyan-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              OKMR
            </button>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => handleOpenFormula('ikp-1-rb')}
            className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Buka Naskah & Manual 4 IKP"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Manual 4 IKP (PDF)</span>
          </button>

          {onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. TOP EXECUTIVE HERO BANNER (IDENTITAS RESMI PERKIN A1) */}
      <div className="bg-gradient-to-r from-[#002B49] via-[#0F223D] to-[#1E3A8A] text-white rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
        {/* Background Subtle Watermark */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
          <Award className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                PERKIN A1 RESMI
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-cyan-200 border border-white/20">
                Nomor: {PERKIN_A1_INFO.nomorPerkin}
              </span>
              <span className="text-[11px] text-slate-300 font-mono">
                Batam, {PERKIN_A1_INFO.tanggalPenetapan}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-cyan-200">
              <span>Pihak I: <strong>{PERKIN_A1_INFO.pejabatPihakPertama}</strong></span>
              <span className="text-white/40">|</span>
              <span>Pihak II: <strong>{PERKIN_A1_INFO.pejabatPihakKedua}</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Title & Mission (8 cols) */}
            <div className="lg:col-span-8 space-y-1">
              <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight uppercase">
                {PERKIN_A1_INFO.jabatanPihakPertama}
              </h1>
              <p className="text-xs sm:text-sm text-cyan-100 font-medium">
                Sasaran Program: <span className="text-white font-bold">&ldquo;{PERKIN_A1_INFO.sasaranProgram}&rdquo;</span>
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed max-w-3xl">
                Mengintegrasikan 4 Indikator Kinerja Program utama (Indeks RB BB, Indeks Sistem Merit 280, Indeks Maturitas SPIP 3,2, dan Opini BPK WTP) didukung alokasi 5 kegiatan program serta supervisi teknis 3 unit kerja pilar (Biro Keuangan, Biro SDM, dan Biro OKMR).
              </p>
            </div>

            {/* Total Budget Card (4 cols) */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-cyan-200 uppercase font-mono font-bold">
                  TOTAL PAGU PERKIN A1:
                </span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  5 Kegiatan
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
                {PERKIN_A1_INFO.totalPaguFormatted}
              </div>
              <div className="flex items-center justify-between text-[10.5px] text-slate-300 border-t border-white/15 pt-1">
                <span>Realisasi s.d Cut-Off:</span>
                <span className="font-mono font-bold text-cyan-200">
                  Rp 241,65 Miliar ({PERKIN_A1_INFO.persentaseSerapan}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECTION 1: 4 KPI UTAMA INDIKATOR KINERJA PROGRAM */}
      <AdministrasiKeuanganKpiRow
        onOpenFormulaModal={handleOpenFormula}
        selectedKpiId={modalKpiId}
      />

      {/* 4. SECTION 2: VISUALISASI PERFORMA & INFORMASI PENTING */}
      <AdministrasiKeuanganVisualCharts
        onOpenFormulaModal={handleOpenFormula}
      />

      {/* 5. SECTION 3: 3 PILAR UNIT KERJA ADMINISTRASI & KEUANGAN */}
      <AdministrasiKeuanganUnitCards
        onAnalyzeUnit={handleSelectDeepDive}
        onNavigateToUnit={onSwitchUnit}
      />

      {/* 6. SECTION 4: FULL-WIDTH UNIT DEEP-DIVE CENTER */}
      <div id="administrasi-deep-dive-section" className="pt-2 scroll-mt-6">
        <AdministrasiKeuanganDeepDiveCenter
          selectedUnitId={selectedDeepDiveUnit}
          onSelectUnit={(unitId) => setSelectedDeepDiveUnit(unitId)}
          onOpenFormulaModal={handleOpenFormula}
        />
      </div>

      {/* 7. REGULATORY & FORMULA EXPLANATION MODAL */}
      <AdministrasiKeuanganFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        kpiId={modalKpiId}
      />
    </div>
  );
};
