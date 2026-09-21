import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Calculator,
  Download,
  Filter,
  Layers,
  Building2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { PengendalianFilterState } from './types';
import {
  KPI_DATASETS_PENGENDALIAN,
  DAFTAR_MITRA_PENGUSAHAAN,
} from './pengendalianData';
import { PengendalianFilters } from './PengendalianFilters';
import { PengendalianKpis } from './PengendalianKpis';
import { PengendalianVisualCharts } from './PengendalianVisualCharts';
import { DaftarKerjasamaCards } from './DaftarKerjasamaCards';
import { PengendalianFormulaModal } from './PengendalianFormulaModal';
import { PengendalianWordDocView } from './PengendalianWordDocView';

export const PengendalianPengusahaanDashboard: React.FC = () => {
  // Navigation Sub-tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'word-doc' | 'formula'>('dashboard');

  // Filter State
  const [filters, setFilters] = useState<PengendalianFilterState>({
    tahun: 'Semua',
    sektor: 'Semua Sektor BU',
    skemaKerjasama: 'Semua',
    statusKepatuhan: 'Semua',
    statusTindakLanjut: 'Semua',
    searchQuery: '',
  });

  // Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [selectedDatasetForFormula, setSelectedDatasetForFormula] = useState(3);

  // Filter handlers
  const handleFilterChange = (newFilters: Partial<PengendalianFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 'Semua',
      sektor: 'Semua Sektor BU',
      skemaKerjasama: 'Semua',
      statusKepatuhan: 'Semua',
      statusTindakLanjut: 'Semua',
      searchQuery: '',
    });
  };

  // Filtered List
  const filteredMitra = useMemo(() => {
    return DAFTAR_MITRA_PENGUSAHAAN.filter((item) => {
      // Filter Tahun (cek apakah dalam rentang tahun mulai - tahun berakhir)
      if (filters.tahun !== 'Semua') {
        const targetYear = parseInt(filters.tahun, 10);
        const startYear = parseInt(item.tahunMulai, 10);
        const endYear = parseInt(item.tahunBerakhir, 10);
        if (targetYear < startYear || targetYear > endYear) {
          return false;
        }
      }

      // Filter Sektor Badan Usaha
      if (filters.sektor !== 'Semua Sektor BU' && item.badanUsahaTerkait !== filters.sektor) {
        return false;
      }

      // Filter Skema Kerjasama
      if (filters.skemaKerjasama !== 'Semua' && item.skemaKerjasama !== filters.skemaKerjasama) {
        return false;
      }

      // Filter Status Kepatuhan
      if (filters.statusKepatuhan !== 'Semua' && item.statusKepatuhan !== filters.statusKepatuhan) {
        return false;
      }

      // Filter Status Tindak Lanjut
      if (
        filters.statusTindakLanjut !== 'Semua' &&
        item.statusTindakLanjut !== filters.statusTindakLanjut
      ) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesNama = item.namaMitra.toLowerCase().includes(query);
        const matchesJudul = item.judulPerjanjian.toLowerCase().includes(query);
        const matchesPks = item.nomorPks.toLowerCase().includes(query);
        const matchesBu = item.badanUsahaTerkait.toLowerCase().includes(query);
        if (!matchesNama && !matchesJudul && !matchesPks && !matchesBu) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const handleOpenFormula = (datasetNo: number) => {
    setSelectedDatasetForFormula(datasetNo);
    setIsFormulaModalOpen(true);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. Header Banner & Sub-Nav Menu */}
      <div className="bg-gradient-to-r from-[#0B1E38] via-[#102A4E] to-[#163864] text-white p-5 sm:p-6 rounded-2xl shadow-md border border-slate-700/50 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute right-0 top-0 w-80 h-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[11px] font-bold border border-sky-400/30 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>UNIT KERJA DIREKTORAT (DPPU)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold border border-emerald-400/30">
                Satu Data Halaman 14 • 4 Dataset
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Direktorat Pengendalian Pengusahaan
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Dashboard Eksekutif Pengawasan Tata Kelola Badan Usaha, Evaluasi Kemitraan Strategis (KSO/BTO/BOT), dan Tindak Lanjut Perbaikan Kontrak Kerjasama Usaha BP Batam.
            </p>
          </div>

          {/* Action Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-white text-slate-900 shadow-md font-extrabold'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              <span>Dashboard Utama</span>
            </button>

            <button
              onClick={() => handleOpenFormula(3)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-300 cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-teal-400" />
              <span>Kamus Rumus (4 Dataset)</span>
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'word-doc' ? 'dashboard' : 'word-doc')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'word-doc'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Kamus KPI (.docx)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content Tabs Rendering */}
      {activeTab === 'word-doc' ? (
        <PengendalianWordDocView onBackToDashboard={() => setActiveTab('dashboard')} />
      ) : (
        <>
          {/* Filters Control (Req #4) */}
          <PengendalianFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalFiltered={filteredMitra.length}
            totalAll={DAFTAR_MITRA_PENGUSAHAAN.length}
          />

          {/* Primary & Secondary KPI Cards (Req #1 & #2) */}
          <PengendalianKpis
            datasets={KPI_DATASETS_PENGENDALIAN}
            onOpenFormulaModal={handleOpenFormula}
          />

          {/* Executive Visualizations (Req #3) */}
          <PengendalianVisualCharts />

          {/* Interactive Dossier Cards of Partner Agreements */}
          <DaftarKerjasamaCards mitraList={filteredMitra} />
        </>
      )}

      {/* Formula Modal */}
      <PengendalianFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        defaultDatasetNo={selectedDatasetForFormula}
      />
    </div>
  );
};
