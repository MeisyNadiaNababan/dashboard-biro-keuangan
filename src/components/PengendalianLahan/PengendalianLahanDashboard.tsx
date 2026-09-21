import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Compass,
  FileCheck2,
  Download,
  Share2,
  Sparkles,
} from 'lucide-react';
import { PengendalianLahanFilters } from './PengendalianLahanFilters';
import { PengendalianLahanKpis } from './PengendalianLahanKpis';
import { PenertibanPipelineCard } from './PenertibanPipelineCard';
import { PengawasanSpasialPesisirCard } from './PengawasanSpasialPesisirCard';
import { RekomendasiDokumenCard } from './RekomendasiDokumenCard';
import { PengendalianFormulaModal } from './PengendalianFormulaModal';
import { PengendalianWordDocView } from './PengendalianWordDocView';
import { PengendalianFilterState } from './types';

export const PengendalianLahanDashboard: React.FC = () => {
  const [filters, setFilters] = useState<PengendalianFilterState>({
    tahun: 'ALL',
    swp: 'ALL',
    objekPengawasan: 'ALL',
    tahapPenindakan: 'ALL',
    searchQuery: '',
  });

  const [activeFormulaKpi, setActiveFormulaKpi] = useState<string | null>(null);
  const [showWordDocView, setShowWordDocView] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'penertiban' | 'spasial' | 'rekomendasi'>('all');

  const handleFilterChange = (newFilters: Partial<PengendalianFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 'ALL',
      swp: 'ALL',
      objekPengawasan: 'ALL',
      tahapPenindakan: 'ALL',
      searchQuery: '',
    });
  };

  if (showWordDocView) {
    return <PengendalianWordDocView onBack={() => setShowWordDocView(false)} />;
  }

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Directorate Banner & Executive Action Bar - Clean Plain White */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0 shadow-2xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Direktorat Pengendalian Pengelolaan Lahan, Pesisir dan Reklamasi
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                  KODE: DP2LPR
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  SATU DATA HAL. 11 (4 DATASET)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-4xl leading-relaxed">
                Pemantauan kepatuhan peruntukan alokasi tanah, penertiban lahan terlantar (SP 1–3 &amp; Pembatalan SK), pengawasan garis sempadan pesisir &amp; reklamasi, serta rekomendasi teknis perpanjangan hak atas tanah BP Batam.
              </p>
            </div>
          </div>

          {/* Action Buttons: Formula Guide & Export Word Doc */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveFormulaKpi('kpi_pengawasan')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              title="Lihat Formula & Panduan Tableau"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-700" />
              <span>Panduan Formula Tableau</span>
            </button>

            <button
              onClick={() => setShowWordDocView(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Buka Dokumen Nota Dinas Eksekutif"
            >
              <FileText className="w-3.5 h-3.5 text-white" />
              <span>Dokumen Eksekutif (.doc)</span>
            </button>
          </div>
        </div>

        {/* Navigation Sub-Tabs for Focused Views */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-medium mr-1 hidden sm:inline">Tampilan Fokus:</span>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Semua Modul &amp; Visualisasi
          </button>
          <button
            onClick={() => setActiveTab('penertiban')}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'penertiban'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Pipeline Penertiban Lahan (Dataset #2)
          </button>
          <button
            onClick={() => setActiveTab('spasial')}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'spasial'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Pengawasan 5 SWP &amp; Pesisir (Dataset #1)
          </button>
          <button
            onClick={() => setActiveTab('rekomendasi')}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'rekomendasi'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Rekomendasi &amp; Dokumen (Dataset #3 &amp; #4)
          </button>
        </div>
      </div>

      {/* Interactive Filters (Poin 6) */}
      <PengendalianLahanFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* 4 KPI Cards (Poin 1, 2, 3, 4) */}
      <PengendalianLahanKpis
        onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
      />

      {/* Executive Visualizations Designed for Leadership (Poin 5) */}
      <div className="space-y-4">
        {/* Module 1: Pipeline Penertiban Lahan Terlantar & Rekuperasi Aset */}
        {(activeTab === 'all' || activeTab === 'penertiban') && (
          <PenertibanPipelineCard
            onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
          />
        )}

        {/* Module 2: Pengawasan Spasial 5 SWP & Kepatuhan Pesisir-Reklamasi */}
        {(activeTab === 'all' || activeTab === 'spasial') && (
          <PengawasanSpasialPesisirCard
            onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
          />
        )}

        {/* Module 3: Rekomendasi Perpanjangan & Pelaksanaan Dokumen Teknis */}
        {(activeTab === 'all' || activeTab === 'rekomendasi') && (
          <RekomendasiDokumenCard
            onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
          />
        )}
      </div>

      {/* Formula & Tableau Calculation Modal */}
      <PengendalianFormulaModal
        kpiId={activeFormulaKpi}
        isOpen={activeFormulaKpi !== null}
        onClose={() => setActiveFormulaKpi(null)}
      />
    </div>
  );
};
