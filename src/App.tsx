import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { NavigationRail } from './components/NavigationRail';
import { UnitsDrawer } from './components/UnitsDrawer';
import { ExecutiveFilters } from './components/ExecutiveFilters';
import { KpiMetricsRow } from './components/KpiMetricsRow';
import { RevenuePerformanceCard } from './components/RevenuePerformanceCard';
import { BudgetAbsorptionCard } from './components/BudgetAbsorptionCard';
import { ReceivablesSection } from './components/ReceivablesSection';
import { AssetAndReportsRow } from './components/AssetAndReportsRow';
import { FiscalInsightsRow } from './components/FiscalInsightsRow';
import { PdsiDashboard } from './components/PDSI/PdsiDashboard';
import { OtherUnitPlaceholder } from './components/OtherUnitPlaceholder';
import { BiroKeuanganKamusRumusView } from './components/BiroKeuanganKamusRumusView';
import { KpiWordDocumentView } from './components/KpiWordDocumentView';
import { DetailModal, ModalType } from './components/Modals/DetailModal';
import { ExportModal } from './components/Modals/ExportModal';
import { TableauGuideModal } from './components/Modals/TableauGuideModal';
import { KPI_METRICS_DATA, REVENUE_DATA, EXPENSE_DATA } from './data/mockData';
import { BP_BATAM_24_UNITS, BpBatamUnit } from './data/bpBatamUnits';
import { CheckCircle2, FileCode2, Database, Layers, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & Multi-Unit State
  const [activeUnitId, setActiveUnitId] = useState<string>('biro-keuangan');
  const [isUnitsDrawerOpen, setIsUnitsDrawerOpen] = useState<boolean>(false);
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

  // Active Unit Object
  const currentUnit = useMemo(() => {
    return BP_BATAM_24_UNITS.find((u) => u.id === activeUnitId) || BP_BATAM_24_UNITS[0];
  }, [activeUnitId]);

  // Unit Change Handler
  const handleSelectUnit = (unitId: string) => {
    setActiveUnitId(unitId);
    if (unitId === 'biro-keuangan') {
      setActiveSheet('overview');
    } else if (unitId === 'pdsi') {
      setActiveSheet('ikhtisar');
    } else {
      setActiveSheet('ikhtisar');
    }
    const unitObj = BP_BATAM_24_UNITS.find((u) => u.id === unitId);
    setToastMessage(`Berpindah ke dashboard: ${unitObj?.name || unitId}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

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
    setToastMessage('Semua filter berhasil direset ke default (TA 2026 • April Q2 • Konsolidasi).');
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
      setToastMessage('Data extract berhasil diperbarui.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 600);
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
    } else if (sheetId === 'aset') {
      document.getElementById('aset-section')?.scrollIntoView({ behavior: 'smooth' });
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
      {/* 1. Left Navigation Rail (Multi-Unit 24 Units Architecture) */}
      <NavigationRail
        activeUnitId={activeUnitId}
        onSelectUnit={handleSelectUnit}
        onOpenUnitsDrawer={() => setIsUnitsDrawerOpen(true)}
        onOpenTableauGuide={() => setIsTableauGuideOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* 2. Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header with Unit switcher and Sub-menus */}
        <Header
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onOpenTableauGuide={() => setIsTableauGuideOpen(true)}
          onOpenUnitsDrawer={() => setIsUnitsDrawerOpen(true)}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          activeSheet={activeSheet}
          onSelectSheet={handleSelectSheet}
          activeUnitId={activeUnitId}
          onSelectUnit={handleSelectUnit}
        />

        {/* Scrollable Main Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5 space-y-4 scroll-smooth">
          <div className="max-w-[1920px] mx-auto space-y-4">

            {/* VIEW ROUTING ACCORDING TO ACTIVE UNIT */}
            {activeSheet === 'kpi_word_doc' ? (
              <KpiWordDocumentView
                activeUnitId={activeUnitId}
                onBackToDashboard={() => setActiveSheet(activeUnitId === 'biro-keuangan' ? 'overview' : 'ikhtisar')}
              />
            ) : activeUnitId === 'biro-keuangan' ? (
              /* --- BIRO KEUANGAN DASHBOARD & KAMUS RUMUS --- */
              activeSheet === 'kamus_rumus' ? (
                <BiroKeuanganKamusRumusView />
              ) : (
                <>
                  {/* Top Parameter & Filter Bar */}
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

                  {/* Biro Keuangan Worksheets */}
                  <div className="space-y-4">
                    {/* 1. Top 6 KPI Metric Cards (BANs) */}
                    <section id="overview" aria-label="KPI Ringkasan Eksekutif">
                      <KpiMetricsRow
                        metrics={KPI_METRICS_DATA}
                        onSelectMetric={handleSelectMetric}
                      />
                    </section>

                    {/* 2. Detail Performa Pendapatan & Detail Serapan Belanja */}
                    <section
                      id="pendapatan-belanja"
                      aria-label="Performa Pendapatan dan Belanja"
                      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                    >
                      <div id="pendapatan-section">
                        <RevenuePerformanceCard
                          items={filteredRevenue.length > 0 ? filteredRevenue : REVENUE_DATA}
                          onViewDetail={() => setDetailModalType('pendapatan')}
                          selectedYear={selectedYear}
                          selectedUnit={selectedUnit}
                          selectedMonth={selectedMonth}
                        />
                      </div>

                      <div id="belanja-section">
                        <BudgetAbsorptionCard
                          items={filteredExpense.length > 0 ? filteredExpense : EXPENSE_DATA}
                          onViewDetail={() => setDetailModalType('belanja')}
                          selectedYear={selectedYear}
                          selectedUnit={selectedUnit}
                          selectedMonth={selectedMonth}
                        />
                      </div>
                    </section>

                    {/* 3. Piutang & Arus Kas Section */}
                    <section aria-label="Piutang dan Arus Kas">
                      <ReceivablesSection
                        onViewPiutangDetail={() => setDetailModalType('piutang')}
                        onViewKasBankDetail={() => setDetailModalType('kas_bank')}
                      />
                    </section>

                    {/* 4. Asset Utilization */}
                    <section id="aset-section" aria-label="Pemanfaatan Aset dan Konsesi">
                      <AssetAndReportsRow onOpenExportModal={() => setIsExportModalOpen(true)} />
                    </section>

                    {/* 5. Fiscal Insights, Surplus/Deficit */}
                    <section id="fiskal-section" aria-label="Kemandirian Fiskal dan Rekomendasi">
                      <FiscalInsightsRow
                        onOpenExportModal={() => setIsExportModalOpen(true)}
                        onOpenTableauGuide={() => setIsTableauGuideOpen(true)}
                        lastUpdated="24 Apr 2026 10:24 WIB"
                      />
                    </section>
                  </div>
                </>
              )
            ) : activeUnitId === 'pdsi' ? (
              /* --- PUSAT DATA DAN SISTEM INFORMASI (PDSI) DASHBOARD --- */
              <PdsiDashboard
                activeSubMenu={activeSheet}
                onSelectSubMenu={handleSelectSheet}
              />
            ) : (
              /* --- OTHER 22 UNITS DASHBOARD & DESIGNER --- */
              <OtherUnitPlaceholder
                unit={currentUnit}
                onOpen24UnitsDrawer={() => setIsUnitsDrawerOpen(true)}
                onSwitchToKeuangan={() => handleSelectUnit('biro-keuangan')}
                onSwitchToPdsi={() => handleSelectUnit('pdsi')}
              />
            )}
          </div>
        </main>

        {/* Status Bar */}
        <footer className="h-7 bg-[#F2F4F7] border-t border-slate-300 px-4 flex items-center justify-between text-[11px] text-slate-600 font-sans select-none shrink-0">
          <div className="flex items-center gap-3 truncate">
            <button
              onClick={() => setIsUnitsDrawerOpen(true)}
              className="flex items-center gap-1 text-[#1F3864] hover:text-blue-700 font-bold hover:underline cursor-pointer"
              title="Buka Direktori 24 Unit Kerja BP Batam"
            >
              <Layers className="w-3 h-3 text-[#4E79A7]" />
              <span>Unit Aktif: {currentUnit.name} ({currentUnit.code})</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="hidden sm:inline font-mono">24 Unit Tersedia</span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="hidden md:inline font-mono">
              {activeUnitId === 'biro-keuangan'
                ? '28 Item Katalog PDF'
                : activeUnitId === 'pdsi'
                ? '21 Item Katalog PDF'
                : `${currentUnit.itemCount} Item Katalog PDF`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTableauGuideOpen(true)}
              className="text-[#4E79A7] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <FileCode2 className="w-3 h-3 text-[#E15759]" />
              <span>Tableau Calculated Fields &amp; Guide</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-500 font-medium">
              Command Center v2026.4
            </span>
          </div>
        </footer>
      </div>

      {/* 24 Units Sliding Drawer */}
      <UnitsDrawer
        isOpen={isUnitsDrawerOpen}
        onClose={() => setIsUnitsDrawerOpen(false)}
        activeUnitId={activeUnitId}
        onSelectUnit={handleSelectUnit}
      />

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
        activeUnitId={activeUnitId}
      />

      {/* Tableau Guide Modal */}
      <TableauGuideModal
        isOpen={isTableauGuideOpen}
        onClose={() => setIsTableauGuideOpen(false)}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 right-6 z-50 bg-slate-900 text-white px-4 py-2 shadow-lg border border-slate-700 flex items-center gap-2 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
