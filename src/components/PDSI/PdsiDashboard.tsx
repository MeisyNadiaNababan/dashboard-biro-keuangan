import React, { useState } from 'react';
import { PdsiKpiRow } from './PdsiKpiRow';
import { PdsiDataCenterCard } from './PdsiDataCenterCard';
import { PdsiCyberSecurityCard } from './PdsiCyberSecurityCard';
import { PdsiHelpdeskSection } from './PdsiHelpdeskSection';
import { PdsiFiberOpticAndApps } from './PdsiFiberOpticAndApps';
import { PdsiKamusRumusView } from './PdsiKamusRumusView';
import { KpiWordDocumentView } from '../KpiWordDocumentView';
import { Server, ShieldCheck, Headphones, Network, FileCode2, Layers, Download, RefreshCw, Calendar, CheckCircle2, Shield, FileText } from 'lucide-react';

interface PdsiDashboardProps {
  activeSubMenu: string;
  onSelectSubMenu: (menu: string) => void;
}

export const PdsiDashboard: React.FC<PdsiDashboardProps> = ({
  activeSubMenu,
  onSelectSubMenu,
}) => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('April');

  return (
    <div className="space-y-4 font-sans select-none pb-8">
      {/* PDSI Executive Sub-Menu Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Unit Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B2545] border border-blue-800 flex items-center justify-center text-sky-300 shadow-xs">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
                Pusat Data dan Sistem Informasi (PDSI) BP Batam
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Feed
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Tata Kelola SPBE, Infrastruktur Data Center Tier III, Jaringan Fiber Optik &amp; CSIRT Keamanan Siber
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-700">Tahun:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg text-xs">
            <span className="font-semibold text-slate-700">Bulan:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="April">April (YTD)</option>
              <option value="Maret">Maret</option>
              <option value="Februari">Februari</option>
              <option value="Januari">Januari</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area based on activeSubMenu */}
      {activeSubMenu === 'kpi_word_doc' ? (
        <KpiWordDocumentView activeUnitId="pdsi" onBackToDashboard={() => onSelectSubMenu('ikhtisar')} />
      ) : activeSubMenu === 'kamus_rumus' ? (
        <PdsiKamusRumusView />
      ) : activeSubMenu === 'helpdesk' ? (
        <div className="space-y-4">
          <PdsiHelpdeskSection />
        </div>
      ) : activeSubMenu === 'datacenter' ? (
        <div className="space-y-4">
          <PdsiDataCenterCard />
        </div>
      ) : activeSubMenu === 'cyber' ? (
        <div className="space-y-4">
          <PdsiCyberSecurityCard />
        </div>
      ) : activeSubMenu === 'fiber' ? (
        <div className="space-y-4">
          <PdsiFiberOpticAndApps />
        </div>
      ) : (
        /* Default: Ikhtisar PDSI Overview */
        <div className="space-y-4">
          {/* KPI Metrics Row */}
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

          {/* Row 2: Helpdesk & Jaringan/Aplikasi */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PdsiHelpdeskSection />
            <PdsiFiberOpticAndApps />
          </div>
        </div>
      )}
    </div>
  );
};
