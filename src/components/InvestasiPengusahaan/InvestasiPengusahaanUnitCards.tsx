import React, { useState } from 'react';
import {
  TrendingUp,
  Building2,
  ShieldCheck,
  Truck,
  Layers,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  PieChart as PieIcon,
  Globe,
} from 'lucide-react';
import {
  SATKER_INVESTASI_PENGUSAHAAN_DATA,
  SatkerInvestasiPengusahaan,
} from './investasiPengusahaanData';

interface InvestasiPengusahaanUnitCardsProps {
  onAnalyzeUnit: (unitId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const InvestasiPengusahaanUnitCards: React.FC<
  InvestasiPengusahaanUnitCardsProps
> = ({ onAnalyzeUnit, onNavigateToUnit }) => {
  const [activePillarTabs, setActivePillarTabs] = useState<Record<string, number>>({
    'dit-investasi': 0,
    'dit-pengembangan-kek': 0,
    'dit-pengendalian-usaha': 0,
    'dit-lalu-lintas-barang': 0,
  });

  const handlePillarChange = (unitId: string, pillarIdx: number) => {
    setActivePillarTabs((prev) => ({ ...prev, [unitId]: pillarIdx }));
  };

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#002B49] text-white flex items-center justify-center shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
              <span>4 UNIT KERJA PENGAMPU INVESTASI &amp; PENGUSAHAAN</span>
              <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                39 DATASET SATU DATA BP BATAM
              </span>
            </h2>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 font-sans">
          <span>Pengampu 4 Kegiatan Program Perkin A.4 • Klik &ldquo;Buka Deep-Dive Satker&rdquo; untuk analisis detail</span>
        </div>
      </div>

      {/* Grid 4 Satker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {SATKER_INVESTASI_PENGUSAHAAN_DATA.map((unit) => {
          const currentPillarIdx = activePillarTabs[unit.id] ?? 0;
          const currentPillar =
            unit.pillars?.[currentPillarIdx] ||
            unit.pillars?.[0] || { title: '', badge: '', metrics: [] };

          // Icon per unit
          const IconComponent =
            unit.id === 'dit-investasi'
              ? TrendingUp
              : unit.id === 'dit-pengembangan-kek'
              ? Building2
              : unit.id === 'dit-pengendalian-usaha'
              ? ShieldCheck
              : Truck;

          // Theme accents
          const theme =
            unit.id === 'dit-investasi'
              ? {
                  border: 'border-blue-200 hover:border-blue-400',
                  badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
                  accentBar: 'bg-blue-600',
                  btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
                }
              : unit.id === 'dit-pengembangan-kek'
              ? {
                  border: 'border-emerald-200 hover:border-emerald-400',
                  badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                  accentBar: 'bg-emerald-600',
                  btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
                }
              : unit.id === 'dit-pengendalian-usaha'
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
              className={`bg-white rounded-xl border ${theme.border} transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between overflow-hidden group`}
            >
              {/* Header Card */}
              <div>
                <div className="p-3 bg-slate-50/80 border-b border-slate-100 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${theme.accentBar} text-white flex items-center justify-center shadow-2xs`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-900 text-white">
                          {unit.code}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {unit.datasetsCount} DS
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">
                        {unit.shortName}
                      </h3>
                    </div>
                  </div>

                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${theme.badgeBg}`}>
                    {unit.pdfPages}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-3 space-y-2.5">
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed" title={unit.description}>
                    {unit.description}
                  </p>

                  {/* Key Stats Chips */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {unit.keyStats.map((st, sIdx) => (
                      <div key={sIdx} className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                        <div className="text-[9px] text-slate-400 font-mono truncate">{st.label}</div>
                        <div className="text-xs font-mono font-bold text-slate-900 truncate">{st.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pillars Sub-Tabs */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
                      {unit.pillars.map((pil, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handlePillarChange(unit.id, pIdx)}
                          className={`text-[9px] font-mono px-2 py-0.5 rounded cursor-pointer whitespace-nowrap transition-all ${
                            currentPillarIdx === pIdx
                              ? 'bg-slate-900 text-white font-bold shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Pilar {pIdx + 1}
                        </button>
                      ))}
                    </div>

                    {/* Active Pillar Card */}
                    <div className="bg-slate-50/70 p-2 rounded-lg border border-slate-100 mt-1 space-y-1">
                      <div className="text-[10px] font-bold text-slate-800 flex justify-between">
                        <span>{currentPillar.title}</span>
                        <span className="text-[9px] font-mono text-slate-400">{currentPillar.badge}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[10px]">
                        {currentPillar.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="truncate">
                            <span className="text-slate-400">{m.label}: </span>
                            <span className={`font-mono font-bold ${m.color || 'text-slate-800'}`}>
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onAnalyzeUnit(unit.id)}
                  className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer ${theme.btnBg}`}
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
