import React from 'react';
import {
  Coins,
  CreditCard,
  Building2,
  Receipt,
  Scale,
  Award,
  Wallet
} from 'lucide-react';
import { KpiMetric } from '../types';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface KpiMetricsRowProps {
  metrics: KpiMetric[];
  onSelectMetric?: (metricId: string) => void;
}

// Clean, Crisp Tableau Line Sparkline (no candy gradient, strict Tableau stroke)
const TableauSparkline: React.FC<{ data?: number[]; color: string; height?: number }> = ({
  data = [],
  color,
  height = 26,
}) => {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const width = 110;
  const padding = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, idx) => {
    const x = padding + (idx / Math.max(data.length - 1, 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-6 overflow-visible">
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {points.length > 0 && (
        <circle
          cx={points[points.length - 1].split(',')[0]}
          cy={points[points.length - 1].split(',')[1]}
          r="2.5"
          fill={color}
        />
      )}
    </svg>
  );
};

export const KpiMetricsRow: React.FC<KpiMetricsRowProps> = ({ metrics, onSelectMetric }) => {
  const getTableauTheme = (id: string) => {
    switch (id) {
      case 'pendapatan':
        return {
          icon: Coins,
          tableauColor: '#59A14F', // Tableau Green
          measureName: 'SUM([Realisasi Pendapatan])',
          subLabel: 'vs Target DIPA Rp 2,45 T',
          pctNum: 40.1,
          benchMark: 50.0,
        };
      case 'belanja':
        return {
          icon: CreditCard,
          tableauColor: '#4E79A7', // Tableau Blue
          measureName: 'SUM([Realisasi Belanja])',
          subLabel: 'vs Pagu Anggaran Rp 3,32 T',
          pctNum: 28.5,
          benchMark: 35.0,
        };
      case 'kas_bank':
        return {
          icon: Building2,
          tableauColor: '#76B7B2', // Tableau Teal
          measureName: 'AGG([Saldo Kas & Bank])',
          subLabel: 'Rekening Bank Mitra Operasional',
          pctNum: 78.0,
          benchMark: 70.0,
        };
      case 'piutang':
        return {
          icon: Receipt,
          tableauColor: '#E15759', // Tableau Red
          measureName: 'AGG([Outstanding Piutang])',
          subLabel: 'Tunggakan 305 Debitur Aktif',
          pctNum: 8.5,
          benchMark: 10.0,
        };
      case 'coverage_ratio':
        return {
          icon: Scale,
          tableauColor: '#B07AA1', // Tableau Purple
          measureName: 'AGG([Rasio Kemandirian])',
          subLabel: 'Standar Otonomi BLU ≥ 0,80',
          pctNum: 86.0,
          benchMark: 80.0,
        };
      case 'ipa':
        return {
          icon: Award,
          tableauColor: '#F28E2B', // Tableau Orange
          measureName: 'AGG([Indeks IKPA Kemenkeu])',
          subLabel: 'Skor Target Nasional ≥ 90,0',
          pctNum: 92.4,
          benchMark: 90.0,
        };
      default:
        return {
          icon: Wallet,
          tableauColor: '#4E79A7',
          measureName: 'AGG([Kinerja Fiskal])',
          subLabel: 'Ringkasan Anggaran',
          pctNum: 50.0,
          benchMark: 50.0,
        };
    }
  };

  return (
    <div className="space-y-2 font-sans select-none">
      {/* Tableau Shelves Mapping for Executive BANs */}
      <TableauShelvesBadge
        showMe="Show Me #1 (Text / KPI Tile Cards)"
        columns="Measure Names"
        text="Measure Values"
        filters="[tahun], [bulan], [satker]"
        detail="Pendapatan, Belanja, Kas Bank, Piutang, Rasio Kemandirian, IKPA"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3.5">
        {metrics.map((metric) => {
          const theme = getTableauTheme(metric.id);
          const IconComponent = theme.icon;

          return (
            <div
              key={metric.id}
              id={`kpi-ban-${metric.id}`}
              onClick={() => onSelectMetric?.(metric.id)}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer p-5 relative group"
            >
              <div>
                {/* Header inside Box: Icon, Category Tag & Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                      style={{
                        backgroundColor: `${theme.tableauColor}18`,
                        color: theme.tableauColor,
                      }}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span
                      className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider truncate max-w-[90px]"
                      title={theme.measureName}
                    >
                      {metric.title}
                    </span>
                  </div>

                  {metric.percentage && (
                    <span
                      className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${theme.tableauColor}15`,
                        color: theme.tableauColor,
                      }}
                    >
                      {metric.percentage}
                    </span>
                  )}
                </div>

                {/* Large Bold Measure Figure */}
                <div className="text-2xl sm:text-[26px] font-black text-[#002B49] font-mono tracking-tight leading-none mb-1">
                  {metric.value}
                </div>

                {/* Sub-label comparison */}
                <div className="text-xs text-slate-500 truncate mb-3">
                  {theme.subLabel}
                </div>

                {/* Tableau Bullet Progress Bar */}
                <div className="space-y-1">
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    {/* Actual Progress Bar */}
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(theme.pctNum, 100)}%`,
                        backgroundColor: theme.tableauColor,
                      }}
                    />
                    {/* Reference Line Tick */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                      style={{ left: `${theme.benchMark}%` }}
                      title={`Target Reference: ${theme.benchMark}%`}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>0%</span>
                    <span className="text-slate-600 font-semibold">Ref: {theme.benchMark}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Sparkline & Measure Info in Bottom Area */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-20">
                    <TableauSparkline data={metric.sparkline} color={theme.tableauColor} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 text-right font-medium">
                    {metric.trend?.value ? `${metric.trend.direction === 'up' ? '▲' : '▼'} ${metric.trend.value} ${metric.trend.period}` : 'Tren Q1–Q2'}
                  </span>
                </div>
                <div className="text-[9.5px] font-mono text-slate-400 truncate group-hover:text-blue-700 transition-colors" title={theme.measureName}>
                  {theme.measureName}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
