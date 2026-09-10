import React, { useState } from 'react';
import { PdsiKpiRow } from './PdsiKpiRow';
import { PdsiDataCenterCard } from './PdsiDataCenterCard';
import { PdsiCyberSecurityCard } from './PdsiCyberSecurityCard';
import { PdsiHelpdeskSection } from './PdsiHelpdeskSection';
import { PdsiFiberOpticAndApps } from './PdsiFiberOpticAndApps';
import { PdsiKamusRumusView } from './PdsiKamusRumusView';
import { KpiWordDocumentView } from '../KpiWordDocumentView';
import { PdsiFilters } from './PdsiFilters';

interface PdsiDashboardProps {
  activeSubMenu: string;
  onSelectSubMenu: (menu: string) => void;
  onOpenExportModal?: () => void;
}

export const PdsiDashboard: React.FC<PdsiDashboardProps> = ({
  activeSubMenu,
  onSelectSubMenu,
  onOpenExportModal,
}) => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedCycle, setSelectedCycle] = useState('ALL');
  const [selectedDomain, setSelectedDomain] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [basis, setBasis] = useState<'ytd' | 'monthly'>('ytd');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleResetFilters = () => {
    setSelectedYear('2026');
    setSelectedMonth('April');
    setSelectedCycle('ALL');
    setSelectedDomain('ALL');
    setSelectedStatus('ALL');
    setBasis('ytd');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-4 font-sans select-none pb-8">
      {/* 1. Tableau Parameters & Filters Shelf (Matching Biro Keuangan style, tailored for PDSI) */}
      <PdsiFilters
        selectedYear={selectedYear}
        onChangeYear={setSelectedYear}
        selectedMonth={selectedMonth}
        onChangeMonth={setSelectedMonth}
        selectedCycle={selectedCycle}
        onChangeCycle={setSelectedCycle}
        selectedDomain={selectedDomain}
        onChangeDomain={setSelectedDomain}
        selectedStatus={selectedStatus}
        onChangeStatus={setSelectedStatus}
        basis={basis}
        onChangeBasis={setBasis}
        onResetFilters={handleResetFilters}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onOpenExportModal={onOpenExportModal}
      />

      {/* 2. Main Content Area based on activeSubMenu and selectedDomain */}
      {activeSubMenu === 'kpi_word_doc' ? (
        <KpiWordDocumentView activeUnitId="pdsi" onBackToDashboard={() => onSelectSubMenu('ikhtisar')} />
      ) : activeSubMenu === 'kamus_rumus' ? (
        <PdsiKamusRumusView />
      ) : activeSubMenu === 'helpdesk' || selectedDomain === 'helpdesk' ? (
        <div className="space-y-4">
          <PdsiHelpdeskSection />
        </div>
      ) : activeSubMenu === 'datacenter' || selectedDomain === 'datacenter' ? (
        <div className="space-y-4">
          <PdsiDataCenterCard />
        </div>
      ) : activeSubMenu === 'cyber' || selectedDomain === 'cyber' ? (
        <div className="space-y-4">
          <PdsiCyberSecurityCard />
        </div>
      ) : activeSubMenu === 'fiber' || selectedDomain === 'fiber' ? (
        <div className="space-y-4">
          <PdsiFiberOpticAndApps />
        </div>
      ) : (
        /* Default: Ikhtisar PDSI Overview */
        <div className="space-y-4">
          {/* Key Performance Indicators BAN Row */}
          <PdsiKpiRow
            onOpenKamusRumus={() => onSelectSubMenu('kamus_rumus')}
            onSelectMetric={(id) => {
              if (id === 'uptime_dc' || id === 'rack_occupancy') onSelectSubMenu('datacenter');
              else if (id === 'sla_helpdesk') onSelectSubMenu('helpdesk');
              else if (id === 'cyber_mitigation') onSelectSubMenu('cyber');
              else if (id === 'fiber_backbone') onSelectSubMenu('fiber');
            }}
          />

          {/* Row 1: Data Center & Keamanan Siber */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PdsiDataCenterCard />
            <PdsiCyberSecurityCard />
          </div>

          {/* Row 2: IT Helpdesk & Fiber Optic / SPBE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PdsiHelpdeskSection />
            <PdsiFiberOpticAndApps />
          </div>
        </div>
      )}
    </div>
  );
};
