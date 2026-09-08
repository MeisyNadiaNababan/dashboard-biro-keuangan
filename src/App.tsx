import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar, SidebarTab } from './components/Sidebar';
import { ExecutiveFilters } from './components/ExecutiveFilters';
import { KpiMetricsRow } from './components/KpiMetricsRow';
import { RevenuePerformanceCard } from './components/RevenuePerformanceCard';
import { BudgetAbsorptionCard } from './components/BudgetAbsorptionCard';
import { ReceivablesSection } from './components/ReceivablesSection';
import { AssetAndReportsRow } from './components/AssetAndReportsRow';
import { FiscalInsightsRow } from './components/FiscalInsightsRow';
import { DetailModal, ModalType } from './components/Modals/DetailModal';
import { ExportModal } from './components/Modals/ExportModal';
import { TableauGuideModal } from './components/Modals/TableauGuideModal';
import { KPI_METRICS_DATA, REVENUE_DATA, EXPENSE_DATA } from './data/mockData';
import { CheckCircle2, FileCode2, Database } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSheet, setActiveSheet] = useState<string>('overview');

  // Filters State - Complete Tableau Context Dimensions
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedQuarter, setSelectedQuarter] = useState('Q2');
  const [selectedUnit, setSelectedUnit] = useState('ALL');
  const [selectedFunding, setSelectedFunding] = useState('ALL');
  const [basis, setBasis] = useState<'ytd' | 'monthly'>('ytd');
  const [selectedPeriod, setSelectedPeriod] = useState('April 2026');

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Modals
  const [detailModalType, setDetailModalType] = useState<ModalType>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTableauGuideOpen, setIsTableauGuideOpen] = useState(false);

  // Filter Handlers with Feedback Toast
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedPeriod(`${selectedMonth} ${year}`);
    setToastMessage(`Tahun Anggaran diubah ke TA ${year}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setSelectedPeriod(`${month} ${selectedYear}`);
    setToastMessage(`Periode Cut-Off diubah ke ${month} ${selectedYear}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleQuarterChange = (q: string) => {
    setSelectedQuarter(q);
    setToastMessage(`Filter Triwulan diterapkan: ${q}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit);
    const unitLabel = unit === 'ALL' ? 'Konsolidasi Seluruh Satker' : unit;
    setToastMessage(`Filter Satker diterapkan: ${unitLabel}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleFundingChange = (funding: string) => {
    setSelectedFunding(funding);
    const label = funding === 'ALL' ? 'Semua Sumber Pendanaan' : funding;
    setToastMessage(`Filter Sumber Dana: ${label}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleBasisChange = (b: 'ytd' | 'monthly') => {
    setBasis(b);
    setToastMessage(`Metode Tampilan: ${b === 'ytd' ? 'Kumulatif (YTD)' : 'Per Bulan'}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleResetFilters = () => {
    setSelectedYear('2026');
    setSelectedMonth('April');
    setSelectedQuarter('Q2');
    setSelectedUnit('ALL');
    setSelectedFunding('ALL');
    setBasis('ytd');
    setSelectedPeriod('April 2026');
    setToastMessage('Semua filter berhasil direset ke pengaturan default (TA 2026 • April Q2 • Konsolidasi).');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Filtered Datasets based on selectedUnit
  const filteredRevenue = useMemo(() => {
    if (selectedUnit === 'ALL') return REVENUE_DATA;
    const lowerUnit = selectedUnit.toLowerCase();
    const result = REVENUE_DATA.filter((item) => {
      const lowerSumber = item.sumber.toLowerCase();
      if (lowerSumber.includes(lowerUnit)) return true;
      if (lowerUnit.includes('biro keuangan') && lowerSumber.includes('biro keuangan')) return true;
      if (lowerUnit.includes('pertanahan') && lowerSumber.includes('pertanahan')) return true;
      if (lowerUnit.includes('pelabuhan') && (lowerSumber.includes('pelabuhan') || lowerSumber.includes('kepelabuhanan'))) return true;
      if (lowerUnit.includes('bandara') && lowerSumber.includes('bandara')) return true;
      if (lowerUnit.includes('fasilitas') && (lowerSumber.includes('fasilitas') || lowerSumber.includes('spam'))) return true;
      if (lowerUnit.includes('pdsi') && lowerSumber.includes('pdsi')) return true;
      if (lowerUnit.includes('infrastruktur') && lowerSumber.includes('infrastruktur')) return true;
      return false;
    });
    return result.length > 0 ? result : REVENUE_DATA;
  }, [selectedUnit]);

  const filteredExpense = useMemo(() => {
    if (selectedUnit === 'ALL') return EXPENSE_DATA;
    const lowerUnit = selectedUnit.toLowerCase();
    const result = EXPENSE_DATA.filter((item) => {
      const lowerKerja = item.unitKerja.toLowerCase();
      const lowerProg = (item.program || '').toLowerCase();
      if (lowerKerja.includes(lowerUnit) || lowerProg.includes(lowerUnit)) return true;
      if (lowerUnit.includes('infrastruktur') && (lowerKerja.includes('infrastruktur') || lowerProg.includes('infrastruktur'))) return true;
      if (lowerUnit.includes('pertanahan') && (lowerKerja.includes('pertanahan') || lowerProg.includes('pertanahan'))) return true;
      if (lowerUnit.includes('biro keuangan') && (lowerKerja.includes('keuangan') || lowerProg.includes('dukungan manajemen'))) return true;
      return false;
    });
    return result.length > 0 ? result : EXPENSE_DATA;
  }, [selectedUnit]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMessage('Data extract Tableau berhasil diperbarui dari SIMKEU.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 600);
  };

  const handleSelectTab = (tab: SidebarTab) => {
    setActiveTab(tab);
    if (tab === 'dashboard') {
      setActiveSheet('overview');
      document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'pendapatan') {
      setActiveSheet('pendapatan');
      document.getElementById('pendapatan-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'belanja') {
      setActiveSheet('belanja');
      document.getElementById('belanja-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'piutang') {
      setActiveSheet('piutang');
      document.getElementById('piutang-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'kas_bank') {
      setActiveSheet('kas_bank');
      document.getElementById('kas-bank-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'aset') {
      setActiveSheet('aset');
      document.getElementById('aset-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'laporan') {
      setIsExportModalOpen(true);
    } else if (tab === 'tableau_guide') {
      setIsTableauGuideOpen(true);
    }
  };

  const handleSelectSheet = (sheetId: string) => {
    setActiveSheet(sheetId);
    if (sheetId === 'overview') {
      document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sheetId === 'pendapatan') {
      document.getElementById('pendapatan-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sheetId === 'belanja') {
      document.getElementById('belanja-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sheetId === 'piutang') {
      document.getElementById('piutang-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sheetId === 'kas_bank') {
      document.getElementById('kas-bank-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sheetId === 'fiskal') {
      document.getElementById('fiskal-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMetric = (metricId: string) => {
    if (metricId === 'pendapatan') {
      setDetailModalType('pendapatan');
    } else if (metricId === 'belanja') {
      setDetailModalType('belanja');
    } else if (metricId === 'piutang') {
      setDetailModalType('piutang');
    } else if (metricId === 'kas_bank') {
      setDetailModalType('kas_bank');
    } else if (metricId === 'coverage_ratio') {
      setDetailModalType('kas_bank');
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F4F6F8] text-slate-800 font-sans overflow-hidden antialiased selection:bg-[#002B49] selection:text-white">
      {/* Left Tableau Navigation Pane */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenTableauGuide={() => setIsTableauGuideOpen(true)}
      />

      {/* Main Workspace Area with Header, Dashboard Canvas and Status Bar */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onOpenTableauGuide={() => setIsTableauGuideOpen(true)}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          activeSheet={activeSheet}
          onSelectSheet={handleSelectSheet}
        />

        {/* Tableau Dashboard Canvas (Tiled Layout Container) */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5 space-y-4 scroll-smooth">
          <div className="max-w-[1920px] mx-auto space-y-4">
            {/* Top Hero Banner & Parameter Bar - Styled to Match Reference Image */}
            <ExecutiveFilters
              selectedYear={selectedYear}
              onChangeYear={handleYearChange}
              selectedMonth={selectedMonth}
              onChangeMonth={handleMonthChange}
              selectedQuarter={selectedQuarter}
              onChangeQuarter={handleQuarterChange}
              selectedUnit={selectedUnit}
              onChangeUnit={handleUnitChange}
              selectedFunding={selectedFunding}
              onChangeFunding={handleFundingChange}
              basis={basis}
              onChangeBasis={handleBasisChange}
              onResetFilters={handleResetFilters}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
              onOpenExportModal={() => setIsExportModalOpen(true)}
              onOpenDataExploration={() => setIsTableauGuideOpen(true)}
              selectedPeriod={selectedPeriod}
              onChangePeriod={setSelectedPeriod}
            />

            {/* UNIFIED DASHBOARD WORKSHEETS */}
            <div className="space-y-4">
              {/* 1. Top 6 KPI Metric Cards (BANs) */}
              <section id="overview" aria-label="KPI Ringkasan Eksekutif">
                <KpiMetricsRow
                  metrics={KPI_METRICS_DATA}
                  onSelectMetric={handleSelectMetric}
                />
              </section>

              {/* 2. Detail Performa Pendapatan & Detail Serapan Belanja (Side-by-Side Tiled Worksheets) */}
              <section
                id="pendapatan-belanja"
                aria-label="Performa Pendapatan dan Belanja"
                className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              >
                <RevenuePerformanceCard
                  items={filteredRevenue.length > 0 ? filteredRevenue : REVENUE_DATA}
                  onViewDetail={() => setDetailModalType('pendapatan')}
                  selectedYear={selectedYear}
                  selectedUnit={selectedUnit}
                  selectedMonth={selectedMonth}
                />

                <BudgetAbsorptionCard
                  items={filteredExpense.length > 0 ? filteredExpense : EXPENSE_DATA}
                  onViewDetail={() => setDetailModalType('belanja')}
                  selectedYear={selectedYear}
                  selectedUnit={selectedUnit}
                  selectedMonth={selectedMonth}
                />
              </section>

              {/* 3. Piutang & Arus Kas Section (Tiled Worksheets) */}
              <section aria-label="Piutang dan Arus Kas">
                <ReceivablesSection
                  onViewPiutangDetail={() => setDetailModalType('piutang')}
                  onViewKasBankDetail={() => setDetailModalType('kas_bank')}
                />
              </section>

              {/* 4. Asset Utilization (Tiled Worksheet) */}
              <section aria-label="Pemanfaatan Aset dan Konsesi">
                <AssetAndReportsRow onOpenExportModal={() => setIsExportModalOpen(true)} />
              </section>

              {/* 5. Fiscal Insights, Diverging Bar Chart Surplus/Deficit */}
              <section aria-label="Kemandirian Fiskal dan Rekomendasi">
                <FiscalInsightsRow
                  onOpenExportModal={() => setIsExportModalOpen(true)}
                  onOpenTableauGuide={() => setIsTableauGuideOpen(true)}
                  lastUpdated="24 Apr 2026 10:24 WIB"
                />
              </section>
            </div>
          </div>
        </main>

        {/* Authentic Tableau Status Bar */}
        <footer className="h-7 bg-[#F2F4F7] border-t border-slate-300 px-4 flex items-center justify-between text-[11px] text-slate-600 font-sans select-none shrink-0">
          <div className="flex items-center gap-3 truncate">
            <button
              onClick={() => setDetailModalType('data_catalog')}
              className="flex items-center gap-1 text-[#1F3864] hover:text-blue-700 font-bold hover:underline cursor-pointer"
              title="Klik untuk membuka Katalog 28 Tabel & Atribut Database Resmi Biro Keuangan"
            >
              <Database className="w-3 h-3 text-[#4E79A7]" />
              <span>Katalog Data: 28 Tabel SIMKEU BP Batam</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="hidden sm:inline">6 Worksheets</span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="hidden md:inline font-mono">Realisasi: Rp 981,2 M</span>
            <span className="text-slate-300 hidden md:inline">|</span>
            <span className="hidden lg:inline font-mono">Belanja: Rp 945,0 M</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTableauGuideOpen(true)}
              className="text-[#4E79A7] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <FileCode2 className="w-3 h-3 text-[#E15759]" />
              <span>Tableau Calculated Fields</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-500 font-medium">
              Tableau Server v2024.1
            </span>
          </div>
        </footer>
      </div>

      {/* Drill-down Detail Modal */}
      <DetailModal
        type={detailModalType}
        isOpen={detailModalType !== null}
        onClose={() => setDetailModalType(null)}
      />

      {/* Export Report Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        lastUpdated="24 Apr 2026 10:24 WIB"
      />

      {/* Tableau Guide Modal */}
      <TableauGuideModal
        isOpen={isTableauGuideOpen}
        onClose={() => setIsTableauGuideOpen(false)}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 right-6 z-50 bg-slate-900 text-white px-4 py-2 shadow-lg border border-slate-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
