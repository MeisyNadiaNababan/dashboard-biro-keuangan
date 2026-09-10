import React from 'react';
import { PDSI_KPI_METRICS } from '../../data/pdsiData';
import {
  ArrowUpRight,
  ArrowDownRight,
  Server,
  ShieldAlert,
  Clock,
  Network,
  Cpu,
  Calculator,
  Layers,
  HeartHandshake,
  HardDrive,
  AppWindow,
} from 'lucide-react';

interface PdsiKpiRowProps {
  onSelectMetric?: (metricId: string) => void;
  onOpenKamusRumus?: (metricTag?: string) => void;
}

// Crisp Tableau-Style Sparkline
const TableauSparkline: React.FC<{ data?: number[]; color: string; height?: number }> = ({
  data = [],
  color,
  height = 24,
}) => {
  if (!Array.isArray(data) || data.length === 0) return null;

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
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-5 overflow-visible">
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

export const PdsiKpiRow: React.FC<PdsiKpiRowProps> = ({ onSelectMetric, onOpenKamusRumus }) => {
  const getMetricIcon = (id: string) => {
    switch (id) {
      case 'total_rak':
        return Server;
      case 'rak_terisi':
        return Layers;
      case 'indeks_spbe':
        return Cpu;
      case 'total_serangan':
        return ShieldAlert;
      case 'kepuasan_dc':
        return HeartHandshake;
      case 'jaringan_fiber':
        return Network;
      case 'jumlah_server':
        return HardDrive;
      case 'jumlah_aplikasi':
        return AppWindow;
      default:
        return Server;
    }
  };

  const getTableauColor = (id: string) => {
    switch (id) {
      case 'total_rak':
        return '#1F4E79'; // Tableau Navy
      case 'rak_terisi':
        return '#59A14F'; // Tableau Green
      case 'indeks_spbe':
        return '#B07AA1'; // Tableau Purple
      case 'total_serangan':
        return '#E15759'; // Tableau Red
      case 'kepuasan_dc':
        return '#F28E2B'; // Tableau Amber
      case 'jaringan_fiber':
        return '#4E79A7'; // Tableau Steel
      case 'jumlah_server':
        return '#76B7B2'; // Tableau Teal
      case 'jumlah_aplikasi':
        return '#59A14F'; // Tableau Green
      default:
        return '#1F4E79';
    }
  };

  return (
    <div className="space-y-2 font-sans select-none">
      {/* Tableau Row Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-2xs" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            Key Performance Indicators — PDSI BP Batam
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">
            8 Indikator Kinerja Utama &amp; Operasional
          </span>
        </div>
        {onOpenKamusRumus && (
          <button
            onClick={() => onOpenKamusRumus()}
            className="text-xs font-semibold text-[#1F4E79] hover:text-[#0B2545] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Kamus Rumus PDSI</span>
          </button>
        )}
      </div>

      {/* Grid of 8 Tableau BAN Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2.5">
        {PDSI_KPI_METRICS.map((kpi) => {
          const Icon = getMetricIcon(kpi.id);
          const color = getTableauColor(kpi.id);
          const isPositive = kpi.trend.isPositive;

          return (
            <div
              key={kpi.id}
              onClick={() => onSelectMetric && onSelectMetric(kpi.id)}
              className="bg-white border border-[#CBD5E1] hover:border-[#1F4E79] p-3 rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
            >
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-1 mb-1">
                  <span className="text-[11px] font-bold text-slate-700 leading-tight group-hover:text-[#1F4E79] transition-colors line-clamp-2 min-h-[28px]">
                    {kpi.title}
                  </span>
                  <div className="w-6 h-6 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                    <Icon className="w-3 h-3 text-slate-600" />
                  </div>
                </div>

                {/* Big Number Value */}
                <div className="my-1">
                  <div className="text-lg sm:text-xl font-black tracking-tight text-slate-900 font-mono">
                    {kpi.value}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {kpi.target}
                  </div>
                </div>
              </div>

              {/* Sparkline & Trend Footer */}
              <div className="pt-2 border-t border-[#E2E8F0] space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <div
                    className={`flex items-center gap-0.5 font-bold font-mono ${
                      isPositive ? 'text-emerald-700' : 'text-slate-600'
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
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {kpi.badge.text}
                    </span>
                  )}
                </div>

                {/* Tableau Sparkline */}
                <div className="w-full">
                  <TableauSparkline data={kpi.sparkline} color={color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
