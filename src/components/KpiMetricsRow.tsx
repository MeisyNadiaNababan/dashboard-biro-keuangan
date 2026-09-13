import React from 'react';
import {
  Coins,
  CreditCard,
  Building2,
  Receipt,
  Scale,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  Sparkles
} from 'lucide-react';
import { KpiMetric } from '../types';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface KpiMetricsRowProps {
  metrics: KpiMetric[];
  onSelectMetric?: (metricId: string) => void;
}

// Micro vertical bar visual matching Image 2 (CRMS Total MTD Revenue card)
const MicroBarSparkline: React.FC<{
  data?: number[];
  color: string;
}> = ({ data = [40, 55, 60, 75, 85, 95], color }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-6 w-14 shrink-0 justify-end">
      {data.slice(-5).map((val, i) => {
        const heightPct = Math.max(20, Math.round((val / max) * 100));
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

export const KpiMetricsRow: React.FC<KpiMetricsRowProps> = ({ metrics, onSelectMetric }) => {
  const getKpiConfig = (id: string) => {
    switch (id) {
      case 'pendapatan':
        return {
          acronym: 'PNBP',
          icon: Coins,
          badgeBg: 'bg-emerald-600',
          badgeText: 'text-white',
          themeColor: '#059669', // Emerald
          subLabel: 'Target Perkin Rp 2.447,5 M',
          pctLabel: '40,1% Perkin',
          trendVal: '+12,3%',
          trendPositive: true,
          benchmarkText: 'Target Q2: 50%',
        };
      case 'belanja':
        return {
          acronym: 'PAGU',
          icon: CreditCard,
          badgeBg: 'bg-[#1F4E79]',
          badgeText: 'text-white',
          themeColor: '#1F4E79', // Navy Blue
          subLabel: 'Pagu DIPA Rp 3.318,5 M',
          pctLabel: '28,5% Serapan',
          trendVal: '+8,1%',
          trendPositive: false,
          benchmarkText: 'Target Q2: 35%',
        };
      case 'kas_bank':
        return {
          acronym: 'KAS',
          icon: Building2,
          badgeBg: 'bg-teal-600',
          badgeText: 'text-white',
          themeColor: '#0D9488', // Teal
          subLabel: 'Cadangan 3,89 Bulan Operasional',
          pctLabel: 'Solven Prima',
          trendVal: '+2,3%',
          trendPositive: true,
          benchmarkText: 'Threshold ≥ 3,0 Bln',
        };
      case 'piutang':
        return {
          acronym: 'PIUT',
          icon: Receipt,
          badgeBg: 'bg-rose-600',
          badgeText: 'text-white',
          themeColor: '#E11D48', // Rose
          subLabel: 'Tunggakan 305 Debitur',
          pctLabel: '73,8% Kolektibel',
          trendVal: '+5,1%',
          trendPositive: false,
          benchmarkText: 'Macet: 14,0%',
        };
      case 'coverage_ratio':
        return {
          acronym: 'COV',
          icon: Scale,
          badgeBg: 'bg-purple-600',
          badgeText: 'text-white',
          themeColor: '#7C3AED', // Purple
          subLabel: 'PNBP Rp 681,0 M / Belanja Rp 791,8 M',
          pctLabel: '86,0% Mandiri',
          trendVal: '+0,06x',
          trendPositive: true,
          benchmarkText: 'Ambang Batas ≥ 0,80',
        };
      case 'ipa':
        return {
          acronym: 'IKPA',
          icon: Award,
          badgeBg: 'bg-amber-600',
          badgeText: 'text-white',
          themeColor: '#D97706', // Amber
          subLabel: 'Kemenkeu Kategori Sangat Baik',
          pctLabel: 'Opini WTP',
          trendVal: '+1,8',
          trendPositive: true,
          benchmarkText: 'Target ≥ 90,0 Poin',
        };
      default:
        return {
          acronym: 'KPI',
          icon: Coins,
          badgeBg: 'bg-slate-700',
          badgeText: 'text-white',
          themeColor: '#1E293B',
          subLabel: 'Kinerja Fiskal',
          pctLabel: '50,0%',
          trendVal: '+0,0%',
          trendPositive: true,
          benchmarkText: 'Target 100%',
        };
    }
  };

  return (
    <div className="space-y-2 font-sans select-none">
      {/* Tableau Shelves Mapping for Executive BANs */}
      <TableauShelvesBadge
        showMe="Show Me #1 (Text / KPI Tile Cards) — In-Cell Bullet & Formula Popups"
        columns="Measure Names"
        text="Measure Values"
        filters="[tahun]='2026', [bulan]='April', [satker]='ALL'"
        detail="Klik kartu KPI untuk melihat pop-up rumus matematis & breakdown angka riil"
      />

      {/* Grid of 6 Compact CRMS / E-Commerce Style KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {metrics.map((metric) => {
          const config = getKpiConfig(metric.id);
          const Icon = config.icon;

          return (
            <div
              key={metric.id}
              id={`kpi-card-${metric.id}`}
              onClick={() => onSelectMetric && onSelectMetric(metric.id)}
              className="bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 p-3.5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5 active:scale-[0.99] relative overflow-hidden"
              title="Klik untuk membuka penjelasan lengkap formula & cara kerja KPI"
            >
              {/* Subtle top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-70 group-hover:opacity-100"
                style={{ backgroundColor: config.themeColor }}
              />

              <div>
                {/* Header Row: Left Acronym Block (like CRMS MTD Revenue) + Title + Formula Tag */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {/* CRMS-Style Left Colored Badge Block */}
                    <div
                      className={`${config.badgeBg} ${config.badgeText} text-[10px] font-black font-mono px-2 py-0.5 rounded-md shadow-2xs shrink-0 flex items-center gap-1`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{config.acronym}</span>
                    </div>

                    {/* Full Visible Title without Truncation */}
                    <h4 className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-700 transition-colors">
                      {metric.title}
                    </h4>
                  </div>

                  {/* Micro "Rumus ↗" Pill Indicator */}
                  <span className="text-[9.5px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 group-hover:bg-blue-50 text-slate-500 group-hover:text-blue-700 border border-slate-200 group-hover:border-blue-200 transition-colors shrink-0 flex items-center gap-0.5">
                    <Calculator className="w-2.5 h-2.5" />
                    <span>Rumus</span>
                  </span>
                </div>

                {/* Big Number Figure */}
                <div className="my-1.5">
                  <div className="text-xl sm:text-[22px] font-black text-slate-900 font-mono tracking-tight leading-none">
                    {metric.value}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                    {config.subLabel}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Trend Pill on Left, Micro-Bar Sparkline on Right (like CRMS card) */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                {/* Left Pill */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-0.5 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                      config.trendPositive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                    }`}
                  >
                    {config.trendPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    <span>{config.pctLabel}</span>
                  </span>
                </div>

                {/* Right: Micro Bar Sparkline (Exact match to CRMS card visual) */}
                <MicroBarSparkline
                  data={metric.sparkline}
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
