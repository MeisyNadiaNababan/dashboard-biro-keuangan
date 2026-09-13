import React from 'react';
import { PDSI_KPI_METRICS } from '../../data/pdsiData';
import {
  ArrowUpRight,
  ArrowDownRight,
  Server,
  ShieldAlert,
  Cpu,
  Calculator,
  Layers,
  HeartHandshake,
  HardDrive,
  AppWindow,
  Network
} from 'lucide-react';

interface PdsiKpiRowProps {
  onSelectMetric?: (metricId: string) => void;
  onOpenKamusRumus?: (metricTag?: string) => void;
}

// Micro vertical bar sparkline matching the CRMS "Total MTD Revenue" card
const MicroBarSparkline: React.FC<{
  data?: number[];
  color: string;
}> = ({ data = [60, 70, 75, 80, 85, 95], color }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-5 w-12 shrink-0 justify-end">
      {data.slice(-5).map((val, i) => {
        const heightPct = Math.max(25, Math.round((val / max) * 100));
        const isLast = i === 4;
        return (
          <div
            key={i}
            className="w-1.5 rounded-xs transition-all"
            style={{
              height: `${heightPct}%`,
              backgroundColor: color,
              opacity: isLast ? 1 : 0.35 + i * 0.12,
            }}
          />
        );
      })}
    </div>
  );
};

export const PdsiKpiRow: React.FC<PdsiKpiRowProps> = ({ onSelectMetric, onOpenKamusRumus }) => {
  const getPdsiConfig = (id: string) => {
    switch (id) {
      case 'total_rak':
        return {
          acronym: 'DC-RAK',
          icon: Server,
          badgeBg: 'bg-[#1F4E79]',
          badgeText: 'text-white',
          themeColor: '#1F4E79',
          subLabel: 'Kapasitas Fisik 42U',
        };
      case 'rak_terisi':
        return {
          acronym: 'OKUP',
          icon: Layers,
          badgeBg: 'bg-emerald-600',
          badgeText: 'text-white',
          themeColor: '#059669',
          subLabel: 'Okupansi 78,6% (9 Sisa)',
        };
      case 'indeks_spbe':
        return {
          acronym: 'SPBE',
          icon: Cpu,
          badgeBg: 'bg-purple-600',
          badgeText: 'text-white',
          themeColor: '#7C3AED',
          subLabel: 'Predikat Sangat Baik',
        };
      case 'total_serangan':
        return {
          acronym: 'SOC',
          icon: ShieldAlert,
          badgeBg: 'bg-rose-600',
          badgeText: 'text-white',
          themeColor: '#E11D48',
          subLabel: '98,7% Termitigasi CSIRT',
        };
      case 'kepuasan_dc':
        return {
          acronym: 'CSAT',
          icon: HeartHandshake,
          badgeBg: 'bg-amber-600',
          badgeText: 'text-white',
          themeColor: '#D97706',
          subLabel: 'Indeks 4,71 dari 5,00',
        };
      case 'kapasitas_core_fo':
        return {
          acronym: 'FO-CORE',
          icon: Network,
          badgeBg: 'bg-sky-600',
          badgeText: 'text-white',
          themeColor: '#0284C7',
          subLabel: 'Backbone Pulau Batam',
        };
      case 'jumlah_server':
        return {
          acronym: 'SRV',
          icon: HardDrive,
          badgeBg: 'bg-teal-600',
          badgeText: 'text-white',
          themeColor: '#0D9488',
          subLabel: '48 Aktif • 10 DRC Node',
        };
      case 'jumlah_aplikasi':
        return {
          acronym: 'APP',
          icon: AppWindow,
          badgeBg: 'bg-indigo-600',
          badgeText: 'text-white',
          themeColor: '#4F46E5',
          subLabel: '84 Publik & Internal Aktif',
        };
      default:
        return {
          acronym: 'KPI',
          icon: Server,
          badgeBg: 'bg-slate-700',
          badgeText: 'text-white',
          themeColor: '#334155',
          subLabel: 'Metrik PDSI',
        };
    }
  };

  return (
    <div className="space-y-2 font-sans select-none">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-2xs" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            Key Performance Indicators — PDSI BP Batam
          </h3>
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            (Klik kartu KPI manapun untuk membuka penjelasan rumus lengkap)
          </span>
        </div>
        {onOpenKamusRumus && (
          <button
            onClick={() => onOpenKamusRumus()}
            className="text-xs font-semibold text-[#1F4E79] hover:text-[#0B2545] flex items-center gap-1 cursor-pointer transition-colors bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs hover:bg-slate-50"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Kamus Rumus PDSI</span>
          </button>
        )}
      </div>

      {/* Grid of 8 Compact CRMS Style Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2.5">
        {PDSI_KPI_METRICS.map((kpi) => {
          const config = getPdsiConfig(kpi.id);
          const Icon = config.icon;
          const isPositive = kpi.trend.isPositive;

          return (
            <div
              key={kpi.id}
              onClick={() => onSelectMetric && onSelectMetric(kpi.id)}
              className="bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 p-3 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5 active:scale-[0.99] relative overflow-hidden"
              title="Klik untuk membuka penjelasan lengkap formula & cara kerja KPI"
            >
              {/* Subtle top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-70 group-hover:opacity-100"
                style={{ backgroundColor: config.themeColor }}
              />

              <div>
                {/* Header Row: Left Acronym Block + Title */}
                <div className="flex items-start justify-between gap-1 mb-1.5">
                  <div
                    className={`${config.badgeBg} ${config.badgeText} text-[9.5px] font-black font-mono px-1.5 py-0.5 rounded shadow-2xs shrink-0 flex items-center gap-0.5`}
                  >
                    <Icon className="w-2.5 h-2.5" />
                    <span>{config.acronym}</span>
                  </div>

                  <span className="text-[9px] font-mono text-slate-400 group-hover:text-blue-700 transition-colors flex items-center gap-0.5">
                    <Calculator className="w-2.5 h-2.5" />
                    <span>Rumus</span>
                  </span>
                </div>

                {/* Title (full visible without truncation) */}
                <h4 className="text-[11px] font-bold text-slate-800 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2 min-h-[26px]">
                  {kpi.title}
                </h4>

                {/* Big Number Value */}
                <div className="my-1">
                  <div className="text-lg sm:text-[19px] font-black text-slate-900 font-mono tracking-tight leading-none">
                    {kpi.value}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-1 truncate">
                    {config.subLabel}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Trend Pill & Micro Bar Sparkline */}
              <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1">
                <span
                  className={`inline-flex items-center gap-0.5 text-[9.5px] font-bold font-mono px-1.5 py-0.5 rounded-full ${
                    isPositive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                      : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  ) : (
                    <ArrowDownRight className="w-2.5 h-2.5" />
                  )}
                  <span>{kpi.trend.value}</span>
                </span>

                <MicroBarSparkline
                  data={kpi.sparkline}
                  color={config.themeColor}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
