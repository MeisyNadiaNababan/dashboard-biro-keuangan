import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Info,
  HelpCircle,
  FileCode2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PTSP_KPI_METRICS, PtspKpiMetric } from '../../data/ptspData';

interface PtspKpiRowProps {
  onSelectMetric?: (kpiId: string) => void;
  onOpenKamusRumus?: () => void;
}

export const PtspKpiRow: React.FC<PtspKpiRowProps> = ({
  onSelectMetric,
  onOpenKamusRumus,
}) => {
  return (
    <div className="space-y-2.5">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-xs font-bold tracking-wider uppercase text-slate-700">
            Eksekutif BANs: 8 Indikator Kunci PTSP BP Batam (Sesuai PDF Renstra)
          </h2>
        </div>
        {onOpenKamusRumus && (
          <button
            onClick={onOpenKamusRumus}
            className="flex items-center gap-1.5 text-xs text-[#002B49] hover:text-blue-700 font-bold hover:underline cursor-pointer transition-colors"
          >
            <FileCode2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Lihat Kamus Rumus &amp; Calculated Fields PTSP</span>
          </button>
        )}
      </div>

      {/* Grid of 8 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PTSP_KPI_METRICS.map((kpi) => {
          const isPositiveTrend = kpi.trend.isPositive;

          return (
            <div
              key={kpi.id}
              onClick={() => onSelectMetric && onSelectMetric(kpi.id)}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition-all cursor-pointer p-3.5 flex flex-col justify-between group relative overflow-hidden"
              title="Klik untuk membuka kalkulasi detail rumus dan Tableau shelves guide"
            >
              {/* Top Row: Code Badge & Dataset Badge */}
              <div className="flex flex-col gap-1.5 mb-2">
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10.5px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                      {kpi.code}
                    </span>
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 truncate max-w-[140px]" title={kpi.datasetNo}>
                      {kpi.datasetNo}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border flex items-center gap-1 ${
                        kpi.badge.variant === 'success'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : kpi.badge.variant === 'warning'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : kpi.badge.variant === 'danger'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-sky-50 text-sky-700 border-sky-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          kpi.badge.variant === 'success'
                            ? 'bg-emerald-500'
                            : kpi.badge.variant === 'warning'
                            ? 'bg-amber-500'
                            : kpi.badge.variant === 'danger'
                            ? 'bg-rose-500'
                            : 'bg-sky-500'
                        }`}
                      />
                      {kpi.badge.text}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectMetric) onSelectMetric(kpi.id);
                      }}
                      className="text-slate-400 group-hover:text-blue-700 transition-colors p-0.5 rounded-md hover:bg-slate-100"
                      title="Klik untuk membuka kalkulasi formula detail & sumber dataset"
                    >
                      <Info className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                  </div>
                </div>

                {/* Dataset Full Title Indicator */}
                <div className="text-[9.5px] font-semibold text-slate-500 truncate" title={kpi.datasetName}>
                  {kpi.datasetName}
                </div>
              </div>

              {/* Title & BAN Big Value */}
              <div>
                <h3 className="text-xs font-semibold text-slate-700 mb-1 leading-tight line-clamp-1">
                  {kpi.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {kpi.value}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 truncate">
                    {kpi.percentage}
                  </span>
                </div>
              </div>

              {/* Target & Trend Sparkline */}
              <div className="pt-2 border-t border-slate-100 mt-2 space-y-1.5">
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className="text-slate-500 truncate">{kpi.target}</span>
                  <div
                    className={`flex items-center gap-0.5 font-bold ${
                      isPositiveTrend ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {kpi.trend.direction === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{kpi.trend.value}</span>
                  </div>
                </div>

                {/* Sparkline Visual Mini Bars */}
                <div className="flex items-end gap-1 h-2.5 pt-0.5">
                  {kpi.sparkline.map((val, idx) => {
                    const min = Math.min(...kpi.sparkline);
                    const max = Math.max(...kpi.sparkline);
                    const heightPercent = max === min ? 50 : Math.max(15, Math.round(((val - min) / (max - min)) * 100));

                    return (
                      <div
                        key={idx}
                        className="flex-1 bg-slate-200 rounded-xs group-hover:bg-blue-500 transition-colors"
                        style={{ height: `${heightPercent}%` }}
                        title={`Histori periode ${idx + 1}: ${val}`}
                      />
                    );
                  })}
                </div>

                {/* Subtitle Formula Hint & Source */}
                <div className="bg-slate-50 p-1.5 rounded-md border border-slate-100 text-[9px] text-slate-600 leading-tight">
                  <div className="font-mono font-bold text-[#002B49] flex items-center gap-1 mb-0.5 truncate">
                    <FileCode2 className="w-2.5 h-2.5 text-blue-600 shrink-0" />
                    <span className="truncate">{kpi.formulaRef}</span>
                  </div>
                  <div className="text-[8.5px] text-slate-500 line-clamp-2">
                    {kpi.howGenerated}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
