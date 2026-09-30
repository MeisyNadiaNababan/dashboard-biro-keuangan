import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Filter,
  RefreshCw,
  Download,
  FileText,
  Building2,
  Anchor,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  FileCode2,
  Layers,
  ArrowRight,
  HelpCircle,
  Award,
} from 'lucide-react';
import {
  PERKIN_A3_KPIS,
} from './pengelolaanLahanPesisirData';
import { ExecutiveUnifiedKpiCenter } from './ExecutiveUnifiedKpiCenter';
import { PengelolaanLahanPesisirVisualCharts } from './PengelolaanLahanPesisirVisualCharts';
import { PengelolaanLahanPesisirDeepDiveCenter } from './PengelolaanLahanPesisirDeepDiveCenter';
import { PengelolaanLahanPesisirFormulaModal } from './PengelolaanLahanPesisirFormulaModal';

interface PengelolaanLahanPesisirDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const PengelolaanLahanPesisirDashboard: React.FC<
  PengelolaanLahanPesisirDashboardProps
> = ({ activeSubTab = 'ikhtisar', onOpenExportModal, onSwitchUnit }) => {
  // Compact Filters State
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2025');
  const [selectedSatkerFilter, setSelectedSatkerFilter] = useState<'ALL' | 'dit-lahan' | 'dit-pesisir-reklamasi' | 'dit-pengendalian-lahan'>('ALL');

  // Deep-Dive Unit State
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>('dit-lahan');

  // Internal Formula Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [modalKpiId, setModalKpiId] = useState<string | null>('ikp-1-lahan-investasi');

  const handleOpenFormula = (kpiId: string) => {
    setModalKpiId(kpiId);
    setIsFormulaModalOpen(true);
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('lahan-deep-dive-section');
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
            <span>FILTER PERKIN A3</span>
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
            <span>Periode: Kumulatif Berjalan (YTD)</span>
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
                setSelectedSatkerFilter('dit-lahan');
                handleSelectDeepDive('dit-lahan');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'dit-lahan'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lahan (15 DS)
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('dit-pesisir-reklamasi');
                handleSelectDeepDive('dit-pesisir-reklamasi');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'dit-pesisir-reklamasi'
                  ? 'bg-white text-cyan-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pesisir &amp; Reklamasi (4 DS)
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('dit-pengendalian-lahan');
                handleSelectDeepDive('dit-pengendalian-lahan');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'dit-pengendalian-lahan'
                  ? 'bg-white text-emerald-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pengendalian (4 DS)
            </button>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => handleOpenFormula('ikp-1-lahan-investasi')}
            className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Buka Naskah & Manual 3 IKP"
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

      {/* 2. SECTION 1: KONSOLIDASI KPI 3 DIREKTORAT DEP-A3 */}
      <ExecutiveUnifiedKpiCenter
        onOpenFormulaModal={handleOpenFormula}
        onSelectDirectorate={handleSelectDeepDive}
      />

      {/* 3. SECTION 2: CAPAIAN EVALUASI & MATRIKS SPASIAL LAHAN-PESISIR */}
      <PengelolaanLahanPesisirVisualCharts
        onOpenFormulaModal={handleOpenFormula}
      />

      {/* 6. SECTION 4: FULL-WIDTH UNIT DEEP-DIVE CENTER */}
      <div id="lahan-deep-dive-section" className="pt-2 scroll-mt-6">
        <PengelolaanLahanPesisirDeepDiveCenter
          selectedUnitId={selectedDeepDiveUnit}
          onSelectUnit={(unitId) => setSelectedDeepDiveUnit(unitId)}
          onOpenFormulaModal={handleOpenFormula}
          onOpenExportModal={onOpenExportModal}
        />
      </div>

      {/* 7. REGULATORY & FORMULA EXPLANATION MODAL */}
      <PengelolaanLahanPesisirFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        kpiId={modalKpiId}
      />
    </div>
  );
};
