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
  Sparkles,
  Network,
  AppWindow
} from 'lucide-react';
import { KpiMetric } from '../types';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface KpiMetricsRowProps {
  metrics: KpiMetric[];
  onSelectMetric?: (metricId: string) => void;
}

// Micro vertical bar visual matching CRMS Total MTD Revenue card
const MicroBarSparkline: React.FC<{
  data?: number[];
  color: string;
}> = ({ data = [40, 55, 60, 75, 85, 95], color }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-0.5 h-5 sm:h-5.5 w-10 sm:w-12 shrink-0 justify-end">
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
      case 'panjang_fiber':
      case 'jaringan_fiber':
        return {
          acronym: 'FO',
          icon: Network,
          badgeBg: 'bg-blue-600',
          badgeText: 'text-white',
          themeColor: '#2563EB', // Blue
          subLabel: '8 Wilayah Vital Batam',
          pctLabel: '81,4% Utilitas',
          trendVal: '+12,5 km',
          trendPositive: true,
          benchmarkText: 'Target: 300 KM',
        };
      case 'jumlah_aplikasi':
        return {
          acronym: 'APPS',
          icon: AppWindow,
          badgeBg: 'bg-indigo-600',
          badgeText: 'text-white',
          themeColor: '#4F46E5', // Indigo
          subLabel: '84 Aktif • 30 Integrasi',
          pctLabel: '100% SPBE',
          trendVal: '+3 App',
          trendPositive: true,
          benchmarkText: 'Mandat SPBE',
        };
      default:
        return {
          acronym: 'KPI',
          icon: Coins,
          badgeBg: 'bg-slate-700',
          badgeText: 'text-white',
          themeColor: '#1E293B',
          subLabel: 'Kinerja Operasional',
          pctLabel: '100%',
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

      {/* Header bar matching Image 1 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#002B49] rounded-2xs" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            Metrik Utama Eksekutif — Biro Keuangan
          </h3>
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            (Klik kartu untuk melihat formula perhitungan matematis &amp; rincian katalog data)
          </span>
        </div>
        <button
          onClick={() => onSelectMetric && onSelectMetric('kamus_rumus')}
          className="text-xs font-semibold text-[#1F4E79] hover:text-[#0B2545] flex items-center gap-1 cursor-pointer transition-colors bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs hover:bg-slate-50"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Kamus Rumus &amp; Formula Keuangan</span>
        </button>
      </div>

      {/* Grid of 8 KPI Cards Matching Image 1 Executive Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2.5">
        {metrics.map((metric) => {
          const config = getKpiConfig(metric.id);
          const Icon = config.icon;

          // Color assignment for values matching Image 1
          const getValueColor = (id: string) => {
            switch (id) {
              case 'pendapatan':
                return 'text-slate-900';
              case 'belanja':
                return 'text-blue-600';
              case 'kas_bank':
                return 'text-slate-900';
              case 'piutang':
                return 'text-rose-600';
              case 'coverage_ratio':
                return 'text-purple-600';
              case 'ipa':
                return 'text-amber-600';
              case 'panjang_fiber':
              case 'jaringan_fiber':
                return 'text-blue-600';
              case 'jumlah_aplikasi':
                return 'text-indigo-600';
              default:
                return 'text-slate-900';
            }
          };

          // Subtitle text matching Image 1 format
          const getSublabelCaps = (id: string) => {
            switch (id) {
              case 'pendapatan':
                return '40,1% CAPAIAN PERKIN';
              case 'belanja':
                return '28,5% SERAPAN PAGU';
              case 'kas_bank':
                return 'CADANGAN 3,89 BULAN';
              case 'piutang':
                return '73,8% KOLEKTIBEL • 305 DEB';
              case 'coverage_ratio':
                return 'PNBP 681M / BELANJA 791M';
              case 'ipa':
                return 'STANDAR SAP & KEMENKEU';
              case 'panjang_fiber':
              case 'jaringan_fiber':
                return '1.152 CORE • 81,4% UTIL';
              case 'jumlah_aplikasi':
                return '84 AKTIF • 30 INTEGRASI';
              default:
                return config.pctLabel.toUpperCase();
            }
          };

          return (
            <div
              key={metric.id}
              id={`kpi-card-${metric.id}`}
              onClick={() => onSelectMetric && onSelectMetric(metric.id)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-3.5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5 active:scale-[0.99] relative"
              title="Klik untuk membuka formula perhitungan & rincian katalog data"
            >
              {/* Card Top: Title on left, Subtle Icon on right */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-blue-700 transition-colors truncate">
                  {metric.title}
                </span>
                <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
              </div>

              {/* Card Center: Big Bold Colored Number */}
              <div className="my-1">
                <div
                  className={`text-xl sm:text-[22px] font-black tracking-tight leading-tight truncate ${getValueColor(
                    metric.id
                  )}`}
                >
                  {metric.value}
                </div>
              </div>

              {/* Card Bottom: Small Uppercase Subtitle / Benchmark */}
              <div className="text-[9.5px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                {getSublabelCaps(metric.id)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
