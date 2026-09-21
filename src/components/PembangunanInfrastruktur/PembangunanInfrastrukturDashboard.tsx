import React, { useState } from 'react';
import {
  HardHat,
  FileText,
  HelpCircle,
  Activity,
  Compass,
  CheckCircle2,
  TrendingUp,
  Zap,
  Trees,
  Route,
  Mountain,
  LayoutGrid,
} from 'lucide-react';
import { InfrastrukturFilterState } from './types';
import { InfrastrukturFilters } from './InfrastrukturFilters';
import { InfrastrukturKpis } from './InfrastrukturKpis';
import { ExecutiveBriefCard } from './ExecutiveBriefCard';
import { DatasetRowUtilitasCard } from './DatasetRowUtilitasCard';
import { DatasetRowPenghijauanCard } from './DatasetRowPenghijauanCard';
import { DatasetJaringanJalanCard } from './DatasetJaringanJalanCard';
import { DatasetPematanganTanahCard } from './DatasetPematanganTanahCard';
import { JenisPembangunanCard } from './JenisPembangunanCard';
import { PetaInfrastrukturCard } from './PetaInfrastrukturCard';
import { ProgresKonstruksiCard } from './ProgresKonstruksiCard';
import { MonitoringInfrastrukturAtasan } from './MonitoringInfrastrukturAtasan';
import { InfrastrukturFormulaModal } from './InfrastrukturFormulaModal';
import { InfrastrukturWordDocView } from './InfrastrukturWordDocView';
import { DATASET_6_PEMBANGUNAN_INFRASTRUKTUR } from './infrastrukturData';

type SubTabKey =
  | 'semua'
  | 'progres'
  | 'utilitas'
  | 'penghijauan'
  | 'jalan'
  | 'pematangan'
  | 'spasial'
  | 'pimpinan';

export const PembangunanInfrastrukturDashboard: React.FC = () => {
  // Navigation & View State
  const [activeView, setActiveView] = useState<'dashboard' | 'word-doc'>('dashboard');
  const [activeSubTab, setActiveSubTab] = useState<SubTabKey>('semua');

  // Filter State
  const [filters, setFilters] = useState<InfrastrukturFilterState>({
    tahun: '2025',
    jenisPekerjaan: 'Semua',
    wilayah: 'Semua',
    statusProgres: 'Semua',
    searchQuery: '',
  });

  // Modal State
  const [formulaKpiType, setFormulaKpiType] = useState<
    | 'kpi-pembangunan'
    | 'kpi-progres-fisik'
    | 'kpi-progres-keuangan'
    | 'kpi-kurva-s'
    | 'kpi-row-utilitas'
    | 'kpi-row-penghijauan'
    | 'kpi-ruas-jalan'
    | null
  >(null);
  const [isFormulaOpen, setIsFormulaOpen] = useState<boolean>(false);

  const handleFilterChange = (newFilters: Partial<InfrastrukturFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 'Semua',
      jenisPekerjaan: 'Semua',
      wilayah: 'Semua',
      statusProgres: 'Semua',
      searchQuery: '',
    });
  };

  const handleOpenFormula = (
    kpiType:
      | 'kpi-pembangunan'
      | 'kpi-progres-fisik'
      | 'kpi-progres-keuangan'
      | 'kpi-kurva-s'
      | 'kpi-row-utilitas'
      | 'kpi-row-penghijauan'
      | 'kpi-ruas-jalan'
  ) => {
    setFormulaKpiType(kpiType);
    setIsFormulaOpen(true);
  };

  // If in Word Document view
  if (activeView === 'word-doc') {
    return <InfrastrukturWordDocView onBack={() => setActiveView('dashboard')} />;
  }

  const subTabs: { key: SubTabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    { key: 'semua', label: 'Ringkasan Eksekutif', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { key: 'progres', label: 'Paket Fisik (DS 4 & 6)', icon: <Activity className="w-3.5 h-3.5" />, badge: '6 Paket' },
    { key: 'utilitas', label: 'ROW Utilitas (DS 1)', icon: <Zap className="w-3.5 h-3.5" />, badge: '48 Izin' },
    { key: 'penghijauan', label: 'ROW Penghijauan (DS 2)', icon: <Trees className="w-3.5 h-3.5" />, badge: '12.4 Ha' },
    { key: 'jalan', label: 'Jaringan Jalan (DS 3)', icon: <Route className="w-3.5 h-3.5" />, badge: '1.240 Km' },
    { key: 'pematangan', label: 'Pematangan Lahan (DS 5)', icon: <Mountain className="w-3.5 h-3.5" />, badge: '6 Lokasi' },
    { key: 'spasial', label: 'Peta Spasial', icon: <Compass className="w-3.5 h-3.5" /> },
    { key: 'pimpinan', label: 'Kurva S & SCM', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-3.5 pb-10 font-sans">
      {/* Top Banner & Header (Compact & Executive-Focused) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-sky-800 text-white flex items-center justify-center shadow-md shadow-sky-600/15 shrink-0">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.2 rounded border border-sky-200 font-mono">
                  DPINF • Satker Pembangunan Fisik
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.2 rounded">
                  Atribut Satu Data Hal. 48 - 51
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.2 rounded font-semibold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 6 Dataset Aktif
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Direktorat Pembangunan Infrastruktur BP Batam
              </h1>
              <p className="text-[11px] text-slate-500">
                Monitoring Progres Fisik, Kurva S, SCM, ROW Utilitas, Penghijauan, Jaringan Jalan &amp; Pematangan Lahan BSW
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              onClick={() => handleOpenFormula('kpi-pembangunan')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition-colors"
              title="Kamus Rumus & Formula Perhitungan"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Kamus Rumus</span>
            </button>

            <button
              onClick={() => setActiveView('word-doc')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-semibold shadow-2xs transition-colors"
              title="Buka format dokumen laporan resmi"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Format Dokumen</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="flex items-center gap-1 mt-3 pt-2.5 border-t border-slate-100 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0 mr-1 text-[10.5px]">
            Tampilan:
          </span>
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSubTab(tab.key)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
                activeSubTab === tab.key
                  ? 'bg-sky-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] px-1 rounded-full font-mono ${
                    activeSubTab === tab.key
                      ? 'bg-sky-700 text-sky-100'
                      : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Section (Compact) */}
      <InfrastrukturFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* 6 Dataset High-Density KPI Header (Always visible for executive overview) */}
      <InfrastrukturKpis
        totalProyek={DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.length}
        onOpenFormula={handleOpenFormula}
      />

      {/* TAB 1: SEMUA & RINGKASAN EKSEKUTIF */}
      {activeSubTab === 'semua' && (
        <div className="space-y-3.5">
          {/* Executive Brief Card: Kurva S Macro, SCM List, Dataset Compliance */}
          <ExecutiveBriefCard
            onSelectPaketKritis={() => setActiveSubTab('progres')}
            onOpenFormula={() => handleOpenFormula('kpi-kurva-s')}
          />

          {/* Spatial Map & JNS_PEK Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            <div className="lg:col-span-7">
              <PetaInfrastrukturCard
                selectedWilayah={filters.wilayah}
                selectedJenisPekerjaan={filters.jenisPekerjaan}
                onSelectWilayah={(w) => handleFilterChange({ wilayah: w })}
              />
            </div>
            <div className="lg:col-span-5">
              <JenisPembangunanCard
                selectedJenisPekerjaan={filters.jenisPekerjaan}
                onSelectJenis={(jenis) => handleFilterChange({ jenisPekerjaan: jenis })}
              />
            </div>
          </div>

          {/* Paket Pekerjaan Fisik (Dataset No. 4 & 6) */}
          <ProgresKonstruksiCard
            searchQuery={filters.searchQuery}
            statusFilter={filters.statusProgres}
            onOpenFormula={handleOpenFormula}
          />
        </div>
      )}

      {/* TAB 2: PROGRES PEKERJAAN FISIK KONSTRUKSI (Dataset No. 4 & 6) */}
      {activeSubTab === 'progres' && (
        <div className="space-y-3.5">
          <ProgresKonstruksiCard
            searchQuery={filters.searchQuery}
            statusFilter={filters.statusProgres}
            onOpenFormula={handleOpenFormula}
          />
          <JenisPembangunanCard
            selectedJenisPekerjaan={filters.jenisPekerjaan}
            onSelectJenis={(jenis) => handleFilterChange({ jenisPekerjaan: jenis })}
          />
        </div>
      )}

      {/* TAB 3: PEMANFAATAN ROW UNTUK UTILITAS (Dataset No. 1) */}
      {activeSubTab === 'utilitas' && (
        <div className="space-y-3.5">
          <DatasetRowUtilitasCard onOpenFormula={handleOpenFormula} />
        </div>
      )}

      {/* TAB 4: PEMANFAATAN ROW UNTUK PENGHIJAUAN (Dataset No. 2) */}
      {activeSubTab === 'penghijauan' && (
        <div className="space-y-3.5">
          <DatasetRowPenghijauanCard onOpenFormula={handleOpenFormula} />
        </div>
      )}

      {/* TAB 5: JARINGAN JALAN EKSISTING (Dataset No. 3) */}
      {activeSubTab === 'jalan' && (
        <div className="space-y-3.5">
          <DatasetJaringanJalanCard onOpenFormula={handleOpenFormula} />
        </div>
      )}

      {/* TAB 6: PEMATANGAN TANAH BSW (Dataset No. 5) */}
      {activeSubTab === 'pematangan' && (
        <div className="space-y-3.5">
          <DatasetPematanganTanahCard />
        </div>
      )}

      {/* TAB 7: PETA SPASIAL SEBARAN PROYEK */}
      {activeSubTab === 'spasial' && (
        <div className="space-y-3.5">
          <PetaInfrastrukturCard
            selectedWilayah={filters.wilayah}
            selectedJenisPekerjaan={filters.jenisPekerjaan}
            onSelectWilayah={(w) => handleFilterChange({ wilayah: w })}
          />
        </div>
      )}

      {/* TAB 8: MONITORING STRATEGIS PIMPINAN (KURVA S & SCM) */}
      {activeSubTab === 'pimpinan' && (
        <div className="space-y-3.5">
          <ExecutiveBriefCard
            onSelectPaketKritis={() => setActiveSubTab('progres')}
            onOpenFormula={() => handleOpenFormula('kpi-kurva-s')}
          />
          <MonitoringInfrastrukturAtasan />
        </div>
      )}

      {/* Formula Explanation Modal */}
      <InfrastrukturFormulaModal
        isOpen={isFormulaOpen}
        onClose={() => setIsFormulaOpen(false)}
        kpiType={formulaKpiType}
      />
    </div>
  );
};
