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
  const [activeTab, setActiveTab] = useState<'all' | 'swp' | 'rekap' | 'layanan'>('all');

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
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Semua Modul (Executive Overview)
          </button>
          <button
            onClick={() => setActiveTab('swp')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'swp'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Ketersediaan Lahan SWP (#15)
          </button>
          <button
            onClick={() => setActiveTab('rekap')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'rekap'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            Sheet Swap: PL, SKPT &amp; SPPT
          </button>
          <button
            onClick={() => setActiveTab('layanan')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'layanan'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            6 Layanan Pengelolaan Lahan
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

      {/* 1. VISUALISASI LAHAN TERSEDIA AREA SUB WILAYAH PENGEMBANG (SWP) TARUH DIATAS SETELAH KPI */}
      {(activeTab === 'all' || activeTab === 'swp') && (
        <SwpLahanTersediaCard
          onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
        />
      )}

      {/* 2. MAIN ANALYTICAL GRID */}
      <div className="space-y-4">
        {/* Module: Sheet Swap Cards (Rekapitulasi SKPT & SPPT, Pecah/Revisi PL, Hak Atas Tanah) */}
        {(activeTab === 'all' || activeTab === 'rekap') && (
          <div className="space-y-4">
            {/* Requirement 4: Rekapitulasi SKPT & SPPT Baru vs Perubahan */}
            <SkptSpptSheetSwapCard
              filters={filters}
              onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
            />

            {/* Requirement 5 & Requirement 6 in 2 Columns on Desktop */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {/* Requirement 5: Rekapitulasi Pecah PL & Revisi PL */}
              <PecahRevisiPlSheetSwapCard
                filters={filters}
                onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
              />

              {/* Requirement 6: Rekapitulasi Hak Atas Tanah 3-Way */}
              <HakAtasTanah3WaySheetSwapCard
                filters={filters}
                onOpenFormulaModal={(id) => setActiveFormulaKpi(id)}
              />
            </div>
          </div>
        )}

        {/* Module: 6 Layanan Pengelolaan Lahan Pie Chart */}
        {(activeTab === 'all' || activeTab === 'layanan') && (
          <EnamLayananLahanPieCard
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
