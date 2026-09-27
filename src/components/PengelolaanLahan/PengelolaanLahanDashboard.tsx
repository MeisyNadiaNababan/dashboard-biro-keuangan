import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Building,
  Layers,
  FileText,
  FileCheck2,
  TrendingUp,
  Sparkles,
  HelpCircle,
  BarChart3,
  Search,
} from 'lucide-react';
import { PengelolaanLahanFilters } from './PengelolaanLahanFilters';
import { PengelolaanLahanKpis } from './PengelolaanLahanKpis';
import { SwpLahanTersediaCard } from './SwpLahanTersediaCard';
import { ExecutivePnbpSlaCard } from './ExecutivePnbpSlaCard';
import { SkptSpptSheetSwapCard } from './SkptSpptSheetSwapCard';
import { PecahRevisiPlSheetSwapCard } from './PecahRevisiPlSheetSwapCard';
import { HakAtasTanah3WaySheetSwapCard } from './HakAtasTanah3WaySheetSwapCard';
import { EnamLayananLahanPieCard } from './EnamLayananLahanPieCard';
import { LahanFormulaModal } from './LahanFormulaModal';
import { LahanKpiWordDocView } from './LahanKpiWordDocView';
import { LahanFilterState } from './types';
import {
  SWP_LAHAN_TERSEDIA_DATA,
} from './lahanData';

export const PengelolaanLahanDashboard: React.FC = () => {
  // Global Filters
  const [filters, setFilters] = useState<LahanFilterState>({
    tahun: 'ALL',
    jenisPemohon: 'ALL',
    status: 'ALL',
    swp: 'ALL',
    searchQuery: '',
  });

  // Modal & View toggles
  const [activeFormulaKpi, setActiveFormulaKpi] = useState<string | null>(null);
  const [showWordDocView, setShowWordDocView] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    | 'all'
    | 'swp'
    | 'alokasi-pnbp'
    | 'skpt-pl'
    | 'hak'
    | 'layanan'
  >('all');

  const handleFilterChange = (newFilters: Partial<LahanFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 'ALL',
      jenisPemohon: 'ALL',
      status: 'ALL',
      swp: 'ALL',
      searchQuery: '',
    });
  };

  const swpFiltered = useMemo(() => {
    if (filters.swp === 'ALL') return SWP_LAHAN_TERSEDIA_DATA;
    return SWP_LAHAN_TERSEDIA_DATA.filter((s) => s.swp === filters.swp);
  }, [filters.swp]);

  const totalSwpPersil = useMemo(() => swpFiltered.reduce((acc, s) => acc + s.jumlahPersil, 0), [swpFiltered]);
  const totalSwpHa = useMemo(() => swpFiltered.reduce((acc, s) => acc + s.luasHa, 0), [swpFiltered]);

  if (showWordDocView) {
    return <LahanKpiWordDocView onBack={() => setShowWordDocView(false)} />;
  }

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Directorate Banner & Executive Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-2xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">
                  BP Batam Satu Data • Hal. 6-8
                </span>
                <span className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Data Verified
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                Direktorat Pengelolaan Lahan
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Dashboard Eksekutif Pelayanan Pertanahan, Alokasi Investasi, Ketersediaan Lahan SWP &amp; Rekapitulasi PL/SKPT/SPPT
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWordDocView(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              title="Lihat Format Laporan Resmi Microsoft Word"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Dokumen Word (.doc)</span>
            </button>
            <button
              onClick={() => setActiveFormulaKpi('lahan_luas_alokasi')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              title="Panduan Formula Perhitungan & Tableau"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Panduan Tableau &amp; Formula</span>
            </button>
          </div>
        </div>

        {/* Directorate Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100 overflow-x-auto text-xs pb-0.5">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Semua Visualisasi Lahan (Overview 15 DS)
          </button>
          <button
            onClick={() => setActiveTab('swp')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'swp'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Lahan Tersedia 9 SWP (#15)
          </button>
          <button
            onClick={() => setActiveTab('alokasi-pnbp')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'alokasi-pnbp'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Alokasi Investasi (#14) &amp; Target PNBP (#12)
          </button>
          <button
            onClick={() => setActiveTab('skpt-pl')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'skpt-pl'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            SKPT &amp; PL (#1-#4)
          </button>
          <button
            onClick={() => setActiveTab('hak')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hak'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Peralihan &amp; Perpanjangan Hak (#5, #9, #13)
          </button>
          <button
            onClick={() => setActiveTab('layanan')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'layanan'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            6 Layanan Pengelolaan Lahan (#6, #7, #8, #10, #11)
          </button>
        </div>
      </div>

      {/* Global Interactive Filters */}
      <PengelolaanLahanFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* Primary KPI Row: Luas Alokasi, Lahan Tersedia SWP & Realisasi PNBP */}
      <PengelolaanLahanKpis
        totalSwpPersil={totalSwpPersil}
        totalSwpHa={totalSwpHa}
        onExplainKpi={(kpiId) => setActiveFormulaKpi(kpiId)}
      />

      {/* SECTION 1: MONITORING EKSEKUTIF ALOKASI INVESTASI & PNBP UWT LAHAN (DATASET #12 & #14) */}
      {(activeTab === 'all' || activeTab === 'alokasi-pnbp') && (
        <ExecutivePnbpSlaCard onOpenFormulaModal={(id) => setActiveFormulaKpi(id)} />
      )}

      {/* SECTION 2: VISUALISASI LAHAN TERSEDIA AREA SUB WILAYAH PENGEMBANG (SWP - DATASET #15) */}
      {(activeTab === 'all' || activeTab === 'swp') && (
        <SwpLahanTersediaCard
          selectedSwpFilter={filters.swp}
          onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
        />
      )}

      {/* SECTION 3: MAIN ANALYTICAL LAND VISUALIZATIONS */}
      <div className="space-y-4">
        {/* Module 1: SKPT & SPPT + Pecah/Revisi PL (DATASET #1, #2, #3, #4) */}
        {(activeTab === 'all' || activeTab === 'skpt-pl') && (
          <div className="space-y-4">
            {/* Req 1: Rekapitulasi SKPT & SPPT Baru vs Perubahan */}
            <SkptSpptSheetSwapCard
              filters={filters}
              onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
            />

            {/* Req 2: Rekapitulasi Pecah PL & Revisi PL */}
            <PecahRevisiPlSheetSwapCard
              filters={filters}
              onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
            />
          </div>
        )}

        {/* Module 2: Pembaharuan Hak, Peralihan Hak & Perpanjangan Hak (DATASET #5, #9, #13) */}
        {(activeTab === 'all' || activeTab === 'hak') && (
          <HakAtasTanah3WaySheetSwapCard
            filters={filters}
            onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
          />
        )}

        {/* Module 3: 6 Layanan Pengelolaan Lahan (DATASET #6, #7, #8, #10, #11) */}
        {(activeTab === 'all' || activeTab === 'layanan') && (
          <EnamLayananLahanPieCard
            filters={filters}
            onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
          />
        )}
      </div>

      {/* Formula and Tableau Shelves Modal */}
      <LahanFormulaModal
        kpiId={activeFormulaKpi}
        onClose={() => setActiveFormulaKpi(null)}
      />
    </div>
  );
};
