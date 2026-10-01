import React, { useState, useEffect } from 'react';
import {
  Award,
  Filter,
  Download,
  Building2,
  Users,
  ShieldCheck,
  Sparkles,
  FileCode2,
  DollarSign,
  ArrowRight,
  Layers,
  Target,
  Compass,
} from 'lucide-react';
import { PERKIN_METADATA } from './kebijakanStrategisData';
import { KebijakanStrategisKpiRow } from './KebijakanStrategisKpiRow';
import { KebijakanStrategisVisualCharts } from './KebijakanStrategisVisualCharts';
import { KebijakanStrategisDeepDiveCenter } from './KebijakanStrategisDeepDiveCenter';
import { KebijakanStrategisFormulaModal } from './KebijakanStrategisFormulaModal';

interface KebijakanStrategisDashboardProps {
  activeSheet?: string;
  activeSubTab?: string;
  onSelectSheet?: (sheet: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const KebijakanStrategisDashboard: React.FC<KebijakanStrategisDashboardProps> = ({
  activeSheet = 'ikhtisar',
  activeSubTab,
  onOpenExportModal,
  onNavigateToFullDashboard,
  onSwitchUnit,
}) => {
  const currentTab = activeSubTab || activeSheet || 'ikhtisar';

  // Compact Filters State (Mirrors Deputi Administrasi dan Keuangan)
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2025');
  const [selectedQuarter, setSelectedQuarter] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q2');
  const [selectedSatkerFilter, setSelectedSatkerFilter] = useState<
    'ALL' | 'ptsp' | 'pdsi'
  >('ALL');

  // Deep-Dive Unit State (PTSP, PDSI)
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>('ptsp');

  // Internal Formula Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [modalKpiId, setModalKpiId] = useState<string | null>('ikp-1-perencanaan');

  const handleOpenFormula = (kpiId: string) => {
    setModalKpiId(kpiId);
    setIsFormulaModalOpen(true);
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('kebijakan-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Scroll to section based on active header subtab if changed externally
  useEffect(() => {
    if (currentTab === 'deep_dive') {
      const el = document.getElementById('kebijakan-deep-dive-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (currentTab === 'kpi_visual') {
      const el = document.getElementById('kebijakan-visual-charts-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (currentTab === 'unit_kinerja') {
      const el = document.getElementById('kebijakan-unit-cards-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (currentTab === 'kamus_rumus') {
      handleOpenFormula('ikp-1-perencanaan');
    }
  }, [currentTab]);

  return (
    <div className="space-y-4 font-sans text-slate-800 pb-12">
      {/* 1. COMPACT FILTER BAR (NON-INTRUSIVE & SPACE-EFFICIENT) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-2 sm:p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Badge Label */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#002B49] text-white font-mono font-bold">
            <Filter className="w-3.5 h-3.5 text-cyan-300" />
            <span>FILTER DEP A2 (PERKIN A2)</span>
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
              Konsolidasi Satker
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('ptsp');
                handleSelectDeepDive('ptsp');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'ptsp'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PTSP
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('pdsi');
                handleSelectDeepDive('pdsi');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'pdsi'
                  ? 'bg-white text-emerald-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PDSI
            </button>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">DEP A2: Unit Pelaksana</span>
          </div>

          <button
            onClick={() => handleOpenFormula('ikp-1-perencanaan')}
            className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Buka Naskah & Manual 4 IKP"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Manual 4 IKP</span>
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

      {/* 2. SECTION 1: 4 KPI UTAMA INDIKATOR KINERJA PROGRAM & OPERASIONAL SATKER */}
      <KebijakanStrategisKpiRow
        onOpenFormulaModal={handleOpenFormula}
        selectedUnit={selectedSatkerFilter}
        onSelectUnit={handleSelectDeepDive}
      />

      {/* 4. SECTION 2: VISUALISASI PERFORMA & INFORMASI PENTING (RINGKASAN KESELURUHAN 4 UNIT) */}
      <div id="kebijakan-visual-charts-section" className="scroll-mt-6">
        <KebijakanStrategisVisualCharts
          onOpenFormulaModal={handleOpenFormula}
          onAnalyzeUnit={handleSelectDeepDive}
        />
      </div>

      {/* 5. SECTION 3: FULL-WIDTH UNIT DEEP-DIVE CENTER (MIRRORS ADMINISTRASI KEUANGAN DEEP DIVE) */}
      <div id="kebijakan-deep-dive-section" className="pt-2 scroll-mt-6">
        <KebijakanStrategisDeepDiveCenter
          selectedUnitId={selectedDeepDiveUnit}
          onSelectUnit={(unitId) => setSelectedDeepDiveUnit(unitId)}
          onOpenFormulaModal={handleOpenFormula}
          onOpenExportModal={onOpenExportModal}
          onNavigateToFullDashboard={onNavigateToFullDashboard || onSwitchUnit}
        />
      </div>

      {/* 7. REGULATORY & FORMULA EXPLANATION MODAL */}
      <KebijakanStrategisFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        kpiId={modalKpiId}
      />
    </div>
  );
};
