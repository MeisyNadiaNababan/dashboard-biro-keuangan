import React, { useState } from 'react';
import {
  Filter,
  Download,
  FileCode2,
  Stethoscope,
  Droplets,
  Shield,
  Layers,
} from 'lucide-react';
import { PelayananUmumKpiRow } from './PelayananUmumKpiRow';
import { PelayananUmumIkeEvaluationSection } from './PelayananUmumIkeEvaluationSection';
import { PelayananUmumVisualCharts } from './PelayananUmumVisualCharts';
import { UnitDeepDiveCenter } from './UnitDeepDiveCenter';
import { PelayananUmumFormulaModal } from './PelayananUmumFormulaModal';

interface PelayananUmumDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId?: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const PelayananUmumDashboard: React.FC<PelayananUmumDashboardProps> = ({
  activeSubTab = 'ikhtisar',
  onOpenFormulaModal,
  onOpenExportModal,
  onSwitchUnit,
}) => {
  // Compact Filters State (Persis Format DEP-A3)
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2025');
  const [selectedSatkerFilter, setSelectedSatkerFilter] = useState<'ALL' | 'bu-rumah-sakit' | 'bu-spam-fasling' | 'dit-pam-aset'>('ALL');

  // Deep-Dive Unit State (Default: bu-rumah-sakit)
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>('bu-rumah-sakit');

  // Formula Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [selectedKpiFormulaId, setSelectedKpiFormulaId] = useState<string>('ikp-1');

  const handleOpenFormula = (kpiId?: string) => {
    setSelectedKpiFormulaId(kpiId || 'ikp-1');
    setIsFormulaModalOpen(true);
    if (onOpenFormulaModal) {
      onOpenFormulaModal(kpiId);
    }
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('unit-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 pb-12">
      {/* 1. COMPACT FILTER BAR (NON-INTRUSIVE & SPACE-EFFICIENT - PERSIS MODEL DEP-A3) */}
      {/* Note: Card Biru 'DASHBOARD DEPUTI PELAYANAN UMUM' telah dihapus sesuai instruksi user */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-2 sm:p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Badge Label */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono font-bold">
            <Filter className="w-3.5 h-3.5 text-cyan-300" />
            <span>FILTER PERKIN A6</span>
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

          {/* Periode Info */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Periode: Kumulatif Berjalan (Jan s.d Des)</span>
          </div>

          {/* Filter Badan Usaha & Unit */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setSelectedSatkerFilter('ALL')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Konsolidasi 2 BU
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('bu-rumah-sakit');
                handleSelectDeepDive('bu-rumah-sakit');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedSatkerFilter === 'bu-rumah-sakit'
                  ? 'bg-white text-rose-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3 h-3 text-rose-500" />
              <span>RSBP (18 DS)</span>
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('bu-spam-fasling');
                handleSelectDeepDive('bu-spam-fasling');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedSatkerFilter === 'bu-spam-fasling'
                  ? 'bg-white text-cyan-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Droplets className="w-3 h-3 text-cyan-500" />
              <span>SPAM Fasling (91 DS)</span>
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('dit-pam-aset');
                handleSelectDeepDive('dit-pam-aset');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedSatkerFilter === 'dit-pam-aset'
                  ? 'bg-white text-amber-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3 h-3 text-amber-500" />
              <span>Ditpam (12 DS)</span>
            </button>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => handleOpenFormula('ikp-1')}
            className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Buka Naskah & Manual 3 IKP Perkin A6"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Manual 3 IKP (PDF)</span>
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

      {/* 2. SECTION 1: 3 KPI INDIKATOR IKP (PERSIS MODEL DEP-A3) */}
      <PelayananUmumKpiRow
        onOpenFormulaModal={handleOpenFormula}
        selectedUnit={selectedSatkerFilter}
      />

      {/* 3. SECTION 2: CAPAIAN EVALUASI 3 INDIKATOR KINERJA PROGRAM (IKP) (PERSIS MODEL DEP-A3) */}
      <PelayananUmumIkeEvaluationSection
        onOpenFormulaModal={handleOpenFormula}
      />

      {/* 4. SECTION 3: VISUAL CHARTS ANALITIKAL IKM & FINANSIAL */}
      <PelayananUmumVisualCharts
        onOpenFormulaModal={() => handleOpenFormula('ikp-2')}
      />

      {/* 5. SECTION 4: FULL-WIDTH UNIT DEEP-DIVE CENTER (RUMAH SAKIT & SPAM FASLING) */}
      <div id="unit-deep-dive-section" className="pt-2 scroll-mt-6">
        <UnitDeepDiveCenter
          selectedUnitId={selectedDeepDiveUnit}
          onSelectUnit={(unitId) => setSelectedDeepDiveUnit(unitId)}
          onNavigateToFullDashboard={onSwitchUnit}
          onOpenFormulaModal={handleOpenFormula}
        />
      </div>

      {/* 6. REGULATORY & FORMULA EXPLANATION MODAL */}
      <PelayananUmumFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialKpiId={selectedKpiFormulaId}
      />
    </div>
  );
};
