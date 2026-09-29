import React, { useState } from 'react';
import {
  Anchor,
  FileText,
  HelpCircle,
  TrendingUp,
  Download,
  Share2,
  Sparkles,
  Waves,
  Layers,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { PesisirReklamasiFilters } from './PesisirReklamasiFilters';
import { KompilasiPesisirReklamasiCard } from './KompilasiPesisirReklamasiCard';
import { PesisirKawasanVisualizer } from './PesisirKawasanVisualizer';
import { PesisirFormulaModal } from './PesisirFormulaModal';
import { PesisirWordDocView } from './PesisirWordDocView';
import { PesisirReklamasiFilterState } from './types';

export const PesisirReklamasiDashboard: React.FC = () => {
  const [filters, setFilters] = useState<PesisirReklamasiFilterState>({
    tahun: 'ALL',
    swp: 'ALL',
    jenisIzin: 'ALL',
    statusPenyelesaian: 'ALL',
    searchQuery: '',
  });

  const [activeTab, setActiveTab] = useState<'kompilasi' | 'detail-pengawasan'>('kompilasi');
  const [activeFormulaKpi, setActiveFormulaKpi] = useState<string | null>(null);
  const [showWordDocView, setShowWordDocView] = useState<boolean>(false);

  const handleFilterChange = (newFilters: Partial<PesisirReklamasiFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 'ALL',
      swp: 'ALL',
      jenisIzin: 'ALL',
      statusPenyelesaian: 'ALL',
      searchQuery: '',
    });
  };

  if (showWordDocView) {
    return <PesisirWordDocView onBack={() => setShowWordDocView(false)} />;
  }

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Directorate Banner & Executive Action Bar - Clean Plain White Theme */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0 shadow-2xs">
              <Anchor className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Direktorat Pengelolaan Kawasan Pesisir dan Reklamasi
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                  KODE: DPKPR
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                  SATU DATA HAL. 13 - 14 (4 DATASET)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-4xl leading-relaxed">
                Pemantauan terpadu perizinan ruang laut, alokasi ruang pesisir, dan tata kelola pulau reklamasi investasi di Batam.
              </p>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveFormulaKpi('kpi_luas_izin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              title="Formula & Panduan Tableau Sheet Swap"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-700" />
              <span>Kamus Rumus &amp; Tableau</span>
            </button>

            <button
              onClick={() => setShowWordDocView(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              title="Tampilkan Format Dokumen Word Resmi untuk Pimpinan"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Format Word Dokumen</span>
            </button>
          </div>
        </div>

        {/* Directorate Sub-Navigation Tabs: 2 Consolidated Sheets Displaying All 4 Datasets */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100 overflow-x-auto text-xs pb-0.5">
          <button
            onClick={() => setActiveTab('kompilasi')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'kompilasi'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Kompilasi 4 Dataset Ruang Pesisir &amp; Reklamasi
          </button>
          <button
            onClick={() => setActiveTab('detail-pengawasan')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'detail-pengawasan'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Detail Pengawasan &amp; SLA Perizinan (DS #1 &amp; #3)
          </button>
        </div>
      </div>

      {/* Interactive Global Filters Bar */}
      <PesisirReklamasiFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* SHEET 1: KOMPILASI 4 DATASET RUANG PESISIR & REKLAMASI */}
      {activeTab === 'kompilasi' && (
        <KompilasiPesisirReklamasiCard
          onOpenFormulaModal={(kpiId) => setActiveFormulaKpi(kpiId)}
        />
      )}

      {/* SHEET 2: DETAIL PENGAWASAN, PERMASALAHAN & SLA PERIZINAN (DATASET #1 & #3) */}
      {activeTab === 'detail-pengawasan' && (
        <PesisirKawasanVisualizer
          filters={filters}
          onOpenFormulaModal={(kpiId) => setActiveFormulaKpi(kpiId)}
        />
      )}

      {/* Tableau Formula Guide & Attribute Modal */}
      <PesisirFormulaModal
        activeKpiId={activeFormulaKpi}
        onClose={() => setActiveFormulaKpi(null)}
      />
    </div>
  );
};
