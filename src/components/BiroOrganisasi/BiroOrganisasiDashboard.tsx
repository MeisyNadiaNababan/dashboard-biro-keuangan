import React, { useState } from 'react';
import {
  FileCode2,
  FileText,
  BarChart3,
  Layers,
  Sparkles,
} from 'lucide-react';
import { BokmrFilterState } from './types';
import { BokmrFilters } from './BokmrFilters';
import { OkmrTableauDashboard } from './OkmrTableauDashboard';
import { BokmrFormulaModal } from './BokmrFormulaModal';
import { BokmrWordDocView } from './BokmrWordDocView';
import { DEFAULT_BOKMR_FILTERS } from './bokmrData';

export const BiroOrganisasiDashboard: React.FC = () => {
  const [filters, setFilters] = useState<BokmrFilterState>(DEFAULT_BOKMR_FILTERS);
  const [activeViewMode, setActiveViewMode] = useState<'tableau' | 'document'>('tableau');
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);
  const [formulaModalDatasetIndex, setFormulaModalDatasetIndex] = useState<number>(2);

  const handleFilterChange = (newFilters: Partial<BokmrFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_BOKMR_FILTERS);
  };

  const handleOpenFormulaModal = (datasetIndex: number) => {
    setFormulaModalDatasetIndex(datasetIndex);
    setIsFormulaModalOpen(true);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* DASHBOARD TOP BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E9762B]/30 text-amber-300 border border-[#E9762B]/40 uppercase tracking-wider">
                Tableau-Ready • Satu Data Hal. 38 - 40
              </span>
              <span className="text-xs text-slate-400">Tahun Evaluasi 2026</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Biro Organisasi, Kepatuhan dan Manajemen Risiko
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Visualisasi Eksekutif Sederhana &amp; Terstruktur: Akuntabilitas SAKIP, Matriks Risiko 5x5, Kepatuhan Rekomendasi BLU, Maturitas SPIP, dan Kepuasan Pengaduan Publik.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleOpenFormulaModal(2)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm border border-white/15 transition-all shadow-xs"
            >
              <FileCode2 className="w-4 h-4 text-sky-400" />
              <span>Kamus &amp; Rumus</span>
            </button>

            <button
              onClick={() => setActiveViewMode(activeViewMode === 'document' ? 'tableau' : 'document')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs ${
                activeViewMode === 'document'
                  ? 'bg-indigo-600 text-white shadow-indigo-500/20'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              {activeViewMode === 'document' ? (
                <>
                  <BarChart3 className="w-4 h-4 text-white" />
                  <span>Kembali ke Visual Tableau</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Format Dokumen Word</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* BACKGROUND ACCENT */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-[#E9762B]/10 to-transparent pointer-events-none" />
      </div>

      {/* FILTER CONTROL BAR */}
      <BokmrFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        activeCountInfo="10 Dataset Terintegrasi"
      />

      {/* VIEW RENDERER: CLEAN TABLEAU DASHBOARD OR WORD DOC */}
      {activeViewMode === 'document' ? (
        <BokmrWordDocView />
      ) : (
        <OkmrTableauDashboard
          filters={filters}
          onOpenFormulaModal={handleOpenFormulaModal}
        />
      )}

      {/* FORMULA & ATTRIBUTES MODAL */}
      <BokmrFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialDatasetIndex={formulaModalDatasetIndex}
      />
    </div>
  );
};
