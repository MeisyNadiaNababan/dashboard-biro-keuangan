import React, { useState } from 'react';
import { PDSI_KPI_METRICS, PdsiKpiMetric } from '../../data/pdsiData';
import { ArrowUpRight, ArrowDownRight, Server, ShieldCheck, CheckCircle2, Clock, Network, Cpu, Info, Calculator, FileCode2 } from 'lucide-react';

interface PdsiKpiRowProps {
  onSelectMetric?: (metricId: string) => void;
  onOpenKamusRumus?: (metricTag?: string) => void;
}

export const PdsiKpiRow: React.FC<PdsiKpiRowProps> = ({ onSelectMetric, onOpenKamusRumus }) => {
  const [activeInfoId, setActiveInfoId] = useState<string | null>(null);

  const getMetricIcon = (id: string) => {
    switch (id) {
      case 'uptime_dc':
        return Server;
      case 'sla_helpdesk':
        return Clock;
      case 'indeks_spbe':
        return Cpu;
      case 'cyber_mitigation':
        return ShieldCheck;
      case 'rack_occupancy':
        return Server;
      case 'fiber_backbone':
        return Network;
      default:
        return Server;
    }
  };

  return (
    <div className="space-y-2 font-sans select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-4 bg-blue-600 rounded-xs" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            KEY PERFORMANCE INDICATORS (KPI UTAMA PDSI BP BATAM)
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
            Sumber: PDF Hal 40-43
          </span>
        </div>
        <button
          onClick={() => onOpenKamusRumus && onOpenKamusRumus()}
          className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>Lihat Kamus Rumus Calculated Fields</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {PDSI_KPI_METRICS.map((kpi) => {
          const Icon = getMetricIcon(kpi.id);
          const isPositive = kpi.trend.isPositive;

          return (
            <div
              key={kpi.id}
              onClick={() => onSelectMetric && onSelectMetric(kpi.id)}
              className="bg-white border border-slate-200 hover:border-blue-400 p-3.5 rounded-xl shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative"
            >
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-1 mb-1.5">
                  <span className="text-[11px] font-bold text-slate-600 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors">
                    {kpi.title}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-slate-700 group-hover:text-blue-600" />
                  </div>
                </div>

                {/* Big Number Value */}
                <div className="my-1">
                  <div className="text-xl font-extrabold tracking-tight text-slate-900 font-mono">
                    {kpi.value}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 truncate">
                    {kpi.target}
                  </div>
                </div>
              </div>

              {/* Sparkline & Trend Footer */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <div
                    className={`flex items-center gap-0.5 text-[10px] font-bold font-mono ${
                      isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    <span>{kpi.trend.value}</span>
                    <span className="text-[9px] font-normal text-slate-400 ml-0.5">
                      {kpi.trend.period}
                    </span>
                  </div>

                  {kpi.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {kpi.badge.text}
                    </span>
                  )}
                </div>

                {/* Sparkline Visual SVG */}
                <div className="h-6 w-full flex items-end gap-1">
                  {kpi.sparkline.map((val, idx) => {
                    const min = Math.min(...kpi.sparkline);
                    const max = Math.max(...kpi.sparkline);
                    const heightPercent = max === min ? 50 : Math.max(15, Math.round(((val - min) / (max - min)) * 100));
                    const isLast = idx === kpi.sparkline.length - 1;

                    return (
                      <div
                        key={idx}
                        className="flex-1 rounded-t-xs transition-all duration-300 group-hover:opacity-100"
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: isLast ? '#2563EB' : '#94A3B8',
                          opacity: isLast ? 1 : 0.6,
                        }}
                        title={`Periode ${idx + 1}: ${val}`}
                      />
                    );
                  })}
                </div>

                {/* Formula Footnote */}
                <div
                  className="mt-1.5 text-[9px] text-slate-400 truncate hover:text-slate-700 flex items-center gap-1"
                  title={kpi.formulaRef}
                >
                  <Calculator className="w-2.5 h-2.5 shrink-0 text-slate-400" />
                  <span className="truncate">{kpi.formulaRef}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
