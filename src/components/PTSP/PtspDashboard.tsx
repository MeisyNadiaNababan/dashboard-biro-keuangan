import React, { useState } from 'react';
import {
  LayoutDashboard,
  Award,
  FileCheck2,
  Ship,
  MessageSquare,
  FolderKanban,
  FileCode2,
  FileText,
  ArrowLeft,
} from 'lucide-react';
import { PtspFilters } from './PtspFilters';
import { PtspKpiRow } from './PtspKpiRow';
import { PtspExecutiveOverview } from './PtspExecutiveOverview';
import { PtspIkmSection } from './PtspIkmSection';
import { PtspLicensingSection } from './PtspLicensingSection';
import { PtspMaritimeSection } from './PtspMaritimeSection';
import { PtspComplaintsSection } from './PtspComplaintsSection';
import { PtspCatalogSection } from './PtspCatalogSection';
import { PtspKamusRumusView } from './PtspKamusRumusView';
import { KpiWordDocumentView } from '../KpiWordDocumentView';

interface PtspDashboardProps {
  activeSubMenu: string;
  onSelectSubMenu: (menu: string) => void;
  onOpenExportModal?: () => void;
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PtspDashboard: React.FC<PtspDashboardProps> = ({
  activeSubMenu,
  onSelectSubMenu,
  onOpenExportModal,
  onOpenFormulaModal,
}) => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [basis, setBasis] = useState<'ytd' | 'monthly'>('ytd');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleResetFilters = () => {
    setSelectedYear('2026');
    setSelectedMonth('April');
    setSelectedSector('ALL');
    setSelectedRisk('ALL');
    setSelectedStatus('ALL');
    setBasis('ytd');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleKpiCardClick = (kpiId: string) => {
    if (onOpenFormulaModal) {
      onOpenFormulaModal(kpiId);
    }
  };

  const navTabs = [
    { id: 'ikhtisar', label: 'Ikhtisar Eksekutif', icon: LayoutDashboard },
    { id: 'ikm', label: 'IKM Permenpan RB', icon: Award, highlight: true },
    { id: 'perizinan', label: 'Perizinan Berusaha (OSS)', icon: FileCheck2 },
    { id: 'maritim', label: 'Maritim & Logistik', icon: Ship },
    { id: 'pengaduan', label: 'Pengaduan & SP4N', icon: MessageSquare },
    { id: 'katalog', label: '17 Item Data PDF', icon: FolderKanban },
    { id: 'kamus_rumus', label: 'Kamus Rumus Calculated', icon: FileCode2 },
    { id: 'kpi_word_doc', label: 'Dokumen Word (.docx)', icon: FileText },
  ];

  return (
    <div className="space-y-4 font-sans select-none pb-8">
      {/* 1. Tableau Parameters & Context Filters Shelf */}
      <PtspFilters
        selectedYear={selectedYear}
        onChangeYear={setSelectedYear}
        selectedMonth={selectedMonth}
        onChangeMonth={setSelectedMonth}
        selectedSector={selectedSector}
        onChangeSector={setSelectedSector}
        selectedRisk={selectedRisk}
        onChangeRisk={setSelectedRisk}
        selectedStatus={selectedStatus}
        onChangeStatus={setSelectedStatus}
        basis={basis}
        onChangeBasis={setBasis}
        onResetFilters={handleResetFilters}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onOpenExportModal={onOpenExportModal}
      />

      {/* 2. In-Dashboard View Navigation Pills (Clean & Fast Switcher) */}
      <div className="bg-white rounded-xl border border-slate-200 p-1.5 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubMenu === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectSubMenu(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-300' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.highlight && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Submenu View Rendering */}
      {activeSubMenu === 'kpi_word_doc' ? (
        <KpiWordDocumentView
          activeUnitId="ptsp"
          onBackToDashboard={() => onSelectSubMenu('ikhtisar')}
        />
      ) : activeSubMenu === 'kamus_rumus' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectSubMenu('ikhtisar')}
              className="text-xs font-bold text-[#002B49] hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Ikhtisar Dashboard Lengkap</span>
            </button>
            <span className="text-xs text-slate-500 font-medium">Kamus Rumus &amp; Calculated Fields</span>
          </div>
          <PtspKamusRumusView />
        </div>
      ) : activeSubMenu === 'ikm' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectSubMenu('ikhtisar')}
              className="text-xs font-bold text-[#002B49] hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Ikhtisar Dashboard Lengkap</span>
            </button>
            <span className="text-xs text-slate-500 font-medium">Fokus Tampilan: Survei IKM PTSP Permenpan RB (9 Unsur)</span>
          </div>
          <PtspIkmSection
            selectedYear={selectedYear}
            onExplainKpi={handleKpiCardClick}
          />
        </div>
      ) : activeSubMenu === 'perizinan' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectSubMenu('ikhtisar')}
              className="text-xs font-bold text-[#002B49] hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Ikhtisar Dashboard Lengkap</span>
            </button>
            <span className="text-xs text-slate-500 font-medium">Fokus Tampilan: Perizinan Berusaha OSS RBA &amp; IBIS</span>
          </div>
          <PtspLicensingSection onExplainKpi={handleKpiCardClick} />
        </div>
      ) : activeSubMenu === 'maritim' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectSubMenu('ikhtisar')}
              className="text-xs font-bold text-[#002B49] hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Ikhtisar Dashboard Lengkap</span>
            </button>
            <span className="text-xs text-slate-500 font-medium">Fokus Tampilan: Maritim &amp; Logistik Pelabuhan</span>
          </div>
          <PtspMaritimeSection onExplainKpi={handleKpiCardClick} />
        </div>
      ) : activeSubMenu === 'pengaduan' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectSubMenu('ikhtisar')}
              className="text-xs font-bold text-[#002B49] hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Ikhtisar Dashboard Lengkap</span>
            </button>
            <span className="text-xs text-slate-500 font-medium">Fokus Tampilan: Aspirasi &amp; Pengaduan SP4N-LAPOR!</span>
          </div>
          <PtspComplaintsSection onExplainKpi={handleKpiCardClick} />
        </div>
      ) : activeSubMenu === 'katalog' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectSubMenu('ikhtisar')}
              className="text-xs font-bold text-[#002B49] hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Ikhtisar Dashboard Lengkap</span>
            </button>
            <span className="text-xs text-slate-500 font-medium">Fokus Tampilan: 17 Item Katalog Data Satu Data PDF</span>
          </div>
          <PtspCatalogSection />
        </div>
      ) : (
        /* Default: Dashboard Ikhtisar Eksekutif Lengkap PTSP (Command Center Model Sesuai Biro Keuangan & PDSI) */
        <div className="space-y-4">
          {/* 1. TOP BAN KPI ROW: 8 Indikator Kinerja Kunci PTSP (LIC_SLA, LIC_VOL, LIC_ISSUED, LIC_BACKLOG, LIC_MLT, IKSS_IKM, dll) */}
          <section id="ptsp-overview-bans" aria-label="BANs 8 Indikator Kunci PTSP">
            <PtspKpiRow
              onSelectMetric={handleKpiCardClick}
              onOpenKamusRumus={() => onSelectSubMenu('kamus_rumus')}
            />
          </section>

          {/* 2. DUAL ANALYTICS: Tren Volume Bulanan, Kepatuhan SLA & Klasifikasi Risiko OSS RBA */}
          <section id="ptsp-analytics-trend" aria-label="Tren Volume dan Risiko OSS RBA">
            <PtspExecutiveOverview
              onNavigateTab={(tabId) => onSelectSubMenu(tabId)}
              onOpenFormulaModal={handleKpiCardClick}
              hideKpiCards={true}
            />
          </section>

          {/* 3. DATASET UTAMA: Indeks Kepuasan Masyarakat (IKM) 9 Unsur Sesuai Permenpan RB */}
          <section id="ptsp-ikm-dataset" aria-label="Dataset IKM PTSP 9 Unsur">
            <PtspIkmSection
              selectedYear={selectedYear}
              onExplainKpi={handleKpiCardClick}
            />
          </section>

          {/* 4. PERIZINAN BERUSAHA (OSS RBA & IBIS BP BATAM) */}
          <section id="ptsp-licensing-table" aria-label="Tabel Perizinan Berusaha">
            <PtspLicensingSection onExplainKpi={handleKpiCardClick} />
          </section>

          {/* 5. DUAL SECTIONS: Maritim & Logistik Pelabuhan */}
          <section id="ptsp-maritime-table" aria-label="Layanan Maritim dan Logistik">
            <PtspMaritimeSection onExplainKpi={handleKpiCardClick} />
          </section>

          {/* 6. PENGADUAN MASYARAKAT & SP4N-LAPOR! */}
          <section id="ptsp-complaints-table" aria-label="Aspirasi dan Pengaduan SP4N">
            <PtspComplaintsSection onExplainKpi={handleKpiCardClick} />
          </section>
        </div>
      )}
    </div>
  );
};
