import React, { useState } from 'react';
import {
  Users,
  Award,
  GraduationCap,
  Briefcase,
  FileCode2,
  FileText,
  BarChart3,
  Calendar,
  Filter,
  RefreshCw,
  Search,
} from 'lucide-react';
import { SdmFilterState } from './types';
import { SDM_DATA_BY_YEAR, DEFAULT_SDM_FILTERS } from './sdmData';
import { SdmKpiCards } from './SdmKpiCards';
import { StatusKepegawaianCard } from './StatusKepegawaianCard';
import { PendidikanPegawaiCard } from './PendidikanPegawaiCard';
import { SistemMeritCard } from './SistemMeritCard';
import { SdmFormulaModal } from './SdmFormulaModal';
import { SdmWordDocView } from './SdmWordDocView';

interface BiroSDMDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const BiroSDMDashboard: React.FC<BiroSDMDashboardProps> = ({
  activeSubTab = 'ikhtisar',
}) => {
  const [filters, setFilters] = useState<SdmFilterState>(DEFAULT_SDM_FILTERS);
  const [activeViewMode, setActiveViewMode] = useState<'visual' | 'doc'>('visual');
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);
  const [activeFormulaType, setActiveFormulaType] = useState<string>('merit');

  // Year-based data
  const currentYearData = SDM_DATA_BY_YEAR[filters.tahun] || SDM_DATA_BY_YEAR[2026];

  const handleOpenFormulaModal = (type: string) => {
    setActiveFormulaType(type);
    setIsFormulaModalOpen(true);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_SDM_FILTERS);
  };

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* 1. TOP EXECUTIVE HERO BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Status: Active
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E9762B]/30 text-amber-300 border border-[#E9762B]/40 uppercase tracking-wider">
                Tableau-Ready • Satu Data Hal. 1 - 2
              </span>
              <span className="text-xs text-slate-400">13 Dataset Statistik Terintegrasi</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              BIRO SUMBER DAYA MANUSIA BP BATAM
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Dashboard Eksekutif Manajemen Talenta &amp; Kepegawaian: Pemantauan Indeks Sistem Merit 8 Aspek KASN, Demografi Gender, Komposisi Status Kepegawaian, dan Distribusi Jenjang Pendidikan.
            </p>
          </div>

          {/* QUICK ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleOpenFormulaModal('merit')}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-xs border border-white/15 transition-all shadow-xs cursor-pointer"
            >
              <FileCode2 className="w-4 h-4 text-sky-400" />
              <span>Kamus &amp; Rumus</span>
            </button>

            <button
              onClick={() => setActiveViewMode(activeViewMode === 'doc' ? 'visual' : 'doc')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                activeViewMode === 'doc'
                  ? 'bg-indigo-600 text-white shadow-indigo-500/20'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              {activeViewMode === 'doc' ? (
                <>
                  <BarChart3 className="w-4 h-4 text-white" />
                  <span>Kembali ke Dashboard Visual</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Dokumen Word (.doc)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* BACKGROUND SUBTLE ACCENT */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
      </div>

      {/* 2. FILTER & CONTROL BAR (Tahun, Gender, Status) */}
      <div className="p-3 sm:p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Year selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-medium">Tahun:</span>
            <select
              value={filters.tahun}
              onChange={(e) => setFilters((prev) => ({ ...prev, tahun: Number(e.target.value) }))}
              className="bg-transparent font-bold font-mono text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value={2026}>2026 (Tahun Berjalan)</option>
              <option value={2025}>2025 (Audited)</option>
              <option value={2024}>2024 (Historis)</option>
            </select>
          </div>

          {/* Gender filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, genderFilter: 'all' }))}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                filters.genderFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Gender
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, genderFilter: 'Laki-laki' }))}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                filters.genderFilter === 'Laki-laki'
                  ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Laki-laki (60.3%)
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, genderFilter: 'Perempuan' }))}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                filters.genderFilter === 'Perempuan'
                  ? 'bg-white text-pink-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Perempuan (39.7%)
            </button>
          </div>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Reset Filter"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Status KASN: Kategori IV
          </span>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT (VISUAL OR DOCUMENT) */}
      {activeViewMode === 'doc' ? (
        <SdmWordDocView data={currentYearData} />
      ) : (
        <div className="space-y-4">
          {/* SECTION 1: 3 TOP EXECUTIVE KPIS REQUESTED BY USER */}
          <SdmKpiCards
            data={currentYearData}
            onOpenFormulaModal={handleOpenFormulaModal}
          />

          {/* SECTION 2: 2 KEY DEMOGRAPHIC VISUALIZATIONS (STATUS & PENDIDIKAN) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Visualisasi 1: Status Kepegawaian (Dataset #8) */}
            <StatusKepegawaianCard
              data={currentYearData.statusKepegawaian}
              totalPegawai={currentYearData.totalPegawai}
            />

            {/* Visualisasi 2: Tingkat Pendidikan (Dataset #9) */}
            <PendidikanPegawaiCard
              data={currentYearData.pendidikan}
              totalPegawai={currentYearData.totalPegawai}
            />
          </div>

          {/* SECTION 3: VISUALISASI SISTEM MERIT (8 ASPEK, DATASET ROW, ATRIBUT WAJIB) */}
          <SistemMeritCard
            aspekList={currentYearData.sistemMerit.aspekList}
            datasetRow={currentYearData.sistemMerit.datasetRow}
            tahun={currentYearData.tahun}
            onOpenFormulaModal={handleOpenFormulaModal}
          />
        </div>
      )}

      {/* FORMULA & METHODOLOGY MODAL */}
      <SdmFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        formulaType={activeFormulaType}
      />
    </div>
  );
};
