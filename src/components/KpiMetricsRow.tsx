import React from 'react';
import {
  Coins,
  CreditCard,
  Building2,
  Receipt,
  Scale,
  Award,
  Calculator,
} from 'lucide-react';
import { KpiMetric } from '../types';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface KpiMetricsRowProps {
  metrics: KpiMetric[];
  onSelectMetric?: (metricId: string) => void;
}

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
        };
      case 'coverage_ratio':
        return {
          acronym: 'COV',
          icon: Scale,
          badgeBg: 'bg-purple-600',
          badgeText: 'text-white',
          themeColor: '#7C3AED', // Purple
          subLabel: 'PNBP Rp 981,2 M / Belanja Rp 945,0 M',
          pctLabel: '103,8% Mandiri',
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
        };
      default:
        return {
          acronym: 'KPI',
          icon: Coins,
          badgeBg: 'bg-slate-700',
          badgeText: 'text-white',
          themeColor: '#475569',
          subLabel: 'Indikator Utama',
          pctLabel: '100% Target',
        };
    }
  };

  // Filter out any non-Biro Keuangan KPIs (FO & Apps belong to PDSI)
  const biroKeuanganMetrics = metrics.filter(
    (m) => m.id !== 'panjang_fiber' && m.id !== 'jaringan_fiber' && m.id !== 'jumlah_aplikasi'
  );

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

      {/* Grid of 6 Clean KPI Cards with Spacious Layout (3 columns on lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {biroKeuanganMetrics.map((metric) => {
          const config = getKpiConfig(metric.id);
          const Icon = config.icon;

          // Color assignment for values
          const getValueColor = (id: string) => {
            switch (id) {
              case 'pendapatan':
                return 'text-slate-900';
              case 'belanja':
                return 'text-blue-700';
              case 'kas_bank':
                return 'text-teal-700';
              case 'piutang':
                return 'text-rose-600';
              case 'coverage_ratio':
                return 'text-purple-700';
              case 'ipa':
                return 'text-amber-600';
              default:
                return 'text-slate-900';
            }
          };

          return (
            <div
              key={metric.id}
              id={`kpi-card-${metric.id}`}
              onClick={() => onSelectMetric && onSelectMetric(metric.id)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5 active:scale-[0.99] relative overflow-hidden"
              title="Klik untuk membuka formula perhitungan & rincian katalog data"
            >
              {/* Subtle top indicator bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-70 group-hover:opacity-100"
                style={{ backgroundColor: config.themeColor }}
              />

              {/* Card Top: Title on left with acronym badge, Icon on right */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`${config.badgeBg} ${config.badgeText} text-[10px] font-black font-mono px-1.5 py-0.5 rounded shadow-2xs shrink-0`}
                  >
                    {config.acronym}
                  </span>
                  <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700 transition-colors truncate">
                    {metric.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono text-blue-600 bg-blue-50 group-hover:bg-blue-100 border border-blue-200/80 px-1.5 py-0.5 rounded transition-colors flex items-center gap-0.5">
                    <Calculator className="w-2.5 h-2.5" />
                    <span>Rumus</span>
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${config.themeColor}15`, color: config.themeColor }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card Center: Big Bold Colored Number */}
              <div className="my-1.5">
                <div
                  className={`text-2xl sm:text-[26px] font-black tracking-tight leading-tight font-mono truncate ${getValueColor(
                    metric.id
                  )}`}
                >
                  {metric.value}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-1 truncate">
                  {config.subLabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
