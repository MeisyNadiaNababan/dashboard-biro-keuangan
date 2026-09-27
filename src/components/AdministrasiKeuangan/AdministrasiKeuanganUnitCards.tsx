import React, { useState } from 'react';
import {
  Building2,
  Users,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  Layers,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import {
  SATKER_ADMINISTRASI_KEUANGAN_DATA,
  SatkerAdministrasiKeuangan,
} from './administrasiKeuanganData';

interface AdministrasiKeuanganUnitCardsProps {
  onAnalyzeUnit: (unitId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const AdministrasiKeuanganUnitCards: React.FC<
  AdministrasiKeuanganUnitCardsProps
> = ({ onAnalyzeUnit, onNavigateToUnit }) => {
  const [activePillarTabs, setActivePillarTabs] = useState<Record<string, number>>({
    'biro-keuangan': 0,
    'biro-sdm': 0,
    'biro-organisasi': 0,
  });

  const handlePillarChange = (unitId: string, pillarIdx: number) => {
    setActivePillarTabs((prev) => ({ ...prev, [unitId]: pillarIdx }));
  };

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#1F3864] text-white flex items-center justify-center shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
              <span>3 UNIT KERJA ADMINISTRASI &amp; KEUANGAN</span>
              <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                59 DATASET SATU DATA BP BATAM
              </span>
            </h2>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 font-sans">
          <span>Pengampu 5 Kegiatan Program Perkin A1 • Klik &ldquo;Buka Deep-Dive Satker&rdquo; untuk analisis detail</span>
        </div>
      </div>

      {/* Full-Width Grid 3 Satker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {SATKER_ADMINISTRASI_KEUANGAN_DATA.map((unit) => {
          const currentPillarIdx = activePillarTabs[unit.id] ?? 0;
          const currentPillar = unit.pillars?.[currentPillarIdx] || unit.pillars?.[0] || { title: '', badge: '', metrics: [] };

          // Icon per unit
          const IconComponent =
            unit.id === 'biro-keuangan'
              ? Building2
              : unit.id === 'biro-sdm'
              ? Users
              : ShieldAlert;

          // Theme accents
          const theme =
            unit.id === 'biro-keuangan'
              ? {
                  border: 'border-blue-200 hover:border-blue-400',
                  badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
                  accentBar: 'bg-blue-600',
                  btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
                }
              : unit.id === 'biro-sdm'
              ? {
                  border: 'border-indigo-200 hover:border-indigo-400',
                  badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
                  accentBar: 'bg-indigo-600',
                  btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
                }
              : {
                  border: 'border-cyan-200 hover:border-cyan-400',
                  badgeBg: 'bg-cyan-50 text-cyan-900 border-cyan-200',
                  accentBar: 'bg-cyan-600',
                  btnBg: 'bg-cyan-700 hover:bg-cyan-800 text-white',
                };

          return (
            <div
              key={unit.id}
              className={`bg-white rounded-xl border p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group ${theme.border}`}
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${theme.accentBar}`}
              />

              <div className="space-y-4">
                {/* 1. Header: Kode, Nama Satker, & Classification */}
                <div className="flex items-start justify-between gap-2 pt-1">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-mono text-[10px] font-black flex items-center justify-center">
                        {unit.kode}
                      </span>
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded border font-mono tracking-wider ${theme.badgeBg}`}
                      >
                        {unit.pdfPages}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-700 transition-colors uppercase tracking-tight">
                      {unit.nama}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                      {unit.coreRole}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <IconComponent className="w-4 h-4 text-slate-700" />
                  </div>
                </div>

                {/* 2. 4 Quick Performance Metrics Tiles */}
                <div className="grid grid-cols-2 gap-2">
                  {unit.quickStats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-50/90 border border-slate-200/80 hover:bg-white transition-colors space-y-0.5"
                    >
                      <div className="flex items-center justify-between text-[9.5px] text-slate-500">
                        <span className="font-semibold uppercase tracking-wider truncate">
                          {stat.label}
                        </span>
                        {stat.trend && (
                          <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1 rounded">
                            {stat.trend}
                          </span>
                        )}
                      </div>
                      <div className="text-sm sm:text-base font-black font-mono text-slate-900">
                        {stat.value}
                      </div>
                      <div className="text-[9.5px] text-slate-500 truncate">
                        {stat.subLabel}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3. Operational Pillars Tab Strip */}
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">
                      PILAR OPERASIONAL:
                    </span>
                    <span className="text-[9.5px] font-mono font-bold text-blue-700">
                      {currentPillar.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
                    {unit.pillars.map((pillar, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handlePillarChange(unit.id, pIdx)}
                        className={`px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                          currentPillarIdx === pIdx
                            ? 'bg-slate-900 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {pillar?.title?.split('&')?.[0]?.trim() || pillar?.title || ''}
                      </button>
                    ))}
                  </div>

                  {/* Active Pillar Metrics Content */}
                  <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/70 space-y-1.5">
                    {currentPillar?.metrics?.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="flex items-center justify-between text-xs py-0.5 border-b border-slate-100 last:border-0"
                      >
                        <span className="text-slate-600 truncate max-w-[160px]">
                          {m.label}
                        </span>
                        <div className="text-right">
                          <span className="font-mono font-bold text-slate-900">
                            {m.value}
                          </span>
                          {m.sub && (
                            <span className="block text-[9px] text-slate-400">
                              {m.sub}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Operational Highlights */}
                <div className="p-2.5 rounded-lg bg-blue-50/40 border border-blue-100 space-y-1">
                  <span className="text-[9.5px] font-extrabold uppercase text-blue-900 tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>Highlight Buku Satu Data:</span>
                  </span>
                  <p className="text-[10px] text-slate-700 leading-snug">
                    {unit.operationalHighlights?.[0] || 'Operasional terintegrasi dengan tata kelola Satu Data BP Batam.'}
                  </p>
                </div>
              </div>

              {/* Card Footer: Action Buttons */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {onNavigateToUnit && (
                  <button
                    onClick={() => onNavigateToUnit(unit.id)}
                    className="text-[11px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
                    title={`Pindah ke Dashboard Penuh ${unit.nama}`}
                  >
                    <span>Dashboard Penuh</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}

                <button
                  onClick={() => onAnalyzeUnit(unit.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer ml-auto ${theme.btnBg}`}
                >
                  <span>Buka Deep-Dive Satker</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
