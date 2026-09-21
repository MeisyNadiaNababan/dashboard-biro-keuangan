import React, { useState, useMemo } from 'react';
import {
  Building2,
  FileCode2,
  FileText,
  Printer,
  ShieldCheck,
  Award,
  Activity,
  PieChart as PieIcon,
  MessageSquare,
  Sparkles,
  Layers,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { BokmrFilterState } from './types';
import { BokmrFilters } from './BokmrFilters';
import { BokmrKpis } from './BokmrKpis';
import { SakipEvaluationView } from './SakipEvaluationView';
import { PenyelesaianBluPieChart } from './PenyelesaianBluPieChart';
import { PengaduanMasyarakatChart } from './PengaduanMasyarakatChart';
import { SpipMaturitasChart } from './SpipMaturitasChart';
import { StrategicBokmrMetrics } from './StrategicBokmrMetrics';
import { BokmrFormulaModal } from './BokmrFormulaModal';
import { BokmrWordDocView } from './BokmrWordDocView';
import { DEFAULT_BOKMR_FILTERS } from './bokmrData';

export const BiroOrganisasiDashboard: React.FC = () => {
  const [filters, setFilters] = useState<BokmrFilterState>(DEFAULT_BOKMR_FILTERS);
  const [activeViewMode, setActiveViewMode] = useState<
    'all' | 'sakip' | 'spip' | 'pengaduan' | 'blu' | 'risiko' | 'document'
  >('all');
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
    <div className="space-y-6 pb-12">
      {/* DASHBOARD TOP BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 uppercase tracking-wider">
                Satu Data BP Batam • Halaman 38 - 40
              </span>
              <span className="text-xs text-slate-400">Tahun Evaluasi 2026</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Biro Organisasi, Kepatuhan dan Manajemen Risiko
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Monitoring Terpadu Akuntabilitas SAKIP, Maturitas Pengendalian SPIP, Indeks Kualitas Kebijakan, Indeks Kepuasan Masyarakat, serta Pengawasan Badan Usaha BLU.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleOpenFormulaModal(2)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm border border-white/15 transition-all shadow-sm"
            >
              <FileCode2 className="w-4 h-4 text-sky-400" />
              <span>Kamus Atribut & Rumus</span>
            </button>

            <button
              onClick={() => setActiveViewMode(activeViewMode === 'document' ? 'all' : 'document')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                activeViewMode === 'document'
                  ? 'bg-indigo-600 text-white shadow-indigo-500/20'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>{activeViewMode === 'document' ? 'Kembali ke Visual Dashboard' : 'Format Dokumen Word'}</span>
            </button>
          </div>
        </div>

        {/* BACKGROUND SUBTLE ACCENT */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-indigo-600/10 to-transparent pointer-events-none" />
      </div>

      {/* FILTER CONTROL BAR (ALWAYS VISIBLE EXCEPT IN FULL DOCUMENT VIEW IF DESIRED) */}
      <BokmrFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        activeCountInfo="10 Dataset Terintegrasi"
      />

      {/* NAVIGATION TABS FOR SECTIONS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 text-xs">
        {[
          { id: 'all', label: 'Ringkasan Utama (Semua Visualisasi)', icon: Layers },
          { id: 'sakip', label: 'SAKIP & Akuntabilitas (DS #2)', icon: Activity },
          { id: 'blu', label: 'Penyelesaian BLU (DS #6 & #7)', icon: PieIcon },
          { id: 'pengaduan', label: 'Pengaduan & SKM (DS #10 & #11)', icon: MessageSquare },
          { id: 'spip', label: 'Maturitas SPIP (DS #17)', icon: ShieldCheck },
          { id: 'risiko', label: 'Piagam Risiko & SOP (DS #14 & #1)', icon: Award },
          { id: 'document', label: 'Dokumen Word Resmi', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeViewMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveViewMode(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 font-semibold rounded-xl transition-all shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* VIEW RENDERER */}
      {activeViewMode === 'document' ? (
        <BokmrWordDocView />
      ) : activeViewMode === 'all' ? (
        <div className="space-y-6">
          {/* 1. 7 CORE KPIS (POINTS 1 TO 7) */}
          <BokmrKpis onOpenFormulaModal={handleOpenFormulaModal} />

          {/* 2. SAKIP DETAILED EVALUATION & COMPONENT BREAKDOWN (POINTS 4 & 8) */}
          <SakipEvaluationView />

          {/* 3. TWO COLUMNS: PIE CHART BLU (POINT 9) & PENGADUAN / SKM (POINTS 7 & 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <PenyelesaianBluPieChart />
            <PengaduanMasyarakatChart filters={filters} />
          </div>

          {/* 4. SPIP MATURITAS CHART (POINT 2) */}
          <SpipMaturitasChart />

          {/* 5. STRATEGIC METRICS UNTUK ATASAN (POINT 11: PIAGAM RISIKO, PEKPPP, SOP) */}
          <StrategicBokmrMetrics
            filters={filters}
            onOpenFormulaModal={handleOpenFormulaModal}
          />
        </div>
      ) : activeViewMode === 'sakip' ? (
        <div className="space-y-6">
          <SakipEvaluationView />
          <StrategicBokmrMetrics
            filters={filters}
            onOpenFormulaModal={handleOpenFormulaModal}
          />
        </div>
      ) : activeViewMode === 'blu' ? (
        <div className="space-y-6">
          <PenyelesaianBluPieChart />
        </div>
      ) : activeViewMode === 'pengaduan' ? (
        <div className="space-y-6">
          <PengaduanMasyarakatChart filters={filters} />
        </div>
      ) : activeViewMode === 'spip' ? (
        <div className="space-y-6">
          <SpipMaturitasChart />
        </div>
      ) : activeViewMode === 'risiko' ? (
        <div className="space-y-6">
          <StrategicBokmrMetrics
            filters={filters}
            onOpenFormulaModal={handleOpenFormulaModal}
          />
        </div>
      ) : null}

      {/* FORMULA & ATTRIBUTES MODAL */}
      <BokmrFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialDatasetIndex={formulaModalDatasetIndex}
      />
    </div>
  );
};
