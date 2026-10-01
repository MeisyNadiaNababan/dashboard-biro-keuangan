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

      {/* 2. SECTION 1: KPI TIAP UNIT KERJA (PERKIN & INDIKATOR UTAMA UNIT SESUAI MODEL DEP-A3) */}
      <AdministrasiKeuanganKpiRow
        onOpenFormulaModal={handleOpenFormula}
        selectedKpiId={modalKpiId}
        onSelectUnit={handleSelectDeepDive}
      />

      {/* 4. SECTION 2: VISUALISASI PERFORMA & INFORMASI PENTING */}
      <AdministrasiKeuanganVisualCharts
        onOpenFormulaModal={handleOpenFormula}
      />

      {/* 5. SECTION 3: FULL-WIDTH UNIT DEEP-DIVE CENTER */}
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
