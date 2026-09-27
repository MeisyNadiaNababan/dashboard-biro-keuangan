import React, { useState } from 'react';
import {
  Stethoscope,
  Shield,
  Droplets,
  ChevronRight,
  Database,
  Layers,
  Sparkles,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { OPERATIONAL_UNITS_DATA } from './pelayananUmumData';
import { OperationalUnitSummary } from './types';

interface OperationalUnitPerformanceCardsProps {
  onAnalyzeUnit: (unitId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const OperationalUnitPerformanceCards: React.FC<OperationalUnitPerformanceCardsProps> = ({
  onAnalyzeUnit,
  onNavigateToUnit,
}) => {
  const [activePillarTab, setActivePillarTab] = useState<Record<string, number>>({
    'bu-rumah-sakit': 0,
    'dit-pam-aset': 0,
    'bu-spam-fasling': 0,
  });

  const handleTabChange = (unitId: string, tabIdx: number) => {
    setActivePillarTab((prev) => ({ ...prev, [unitId]: tabIdx }));
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-2xs">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              OPERATIONAL UNIT PERFORMANCE (3 PILAR PELAYANAN UMUM)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Dasbor terpadu berbasis atribut Buku Satu Data BP Batam: Layanan Medis RSBP, Penegakan & Pengamanan Ditpam, dan Utilitas BU SPAM Fasling
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 font-bold text-blue-700 border border-blue-200/80 shadow-2xs">
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>121 Dataset Terintegrasi Satu Data</span>
          </span>
        </div>
      </div>

      {/* 3 Executive Cards across full width */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {OPERATIONAL_UNITS_DATA.map((unit) => {
          const isRs = unit.unitId === 'bu-rumah-sakit';
          const isPam = unit.unitId === 'dit-pam-aset';
          const currentTabIndex = activePillarTab[unit.unitId] ?? 0;
          const currentPillar = unit.pillars[currentTabIndex] || unit.pillars[0];

          return (
            <div
              key={unit.unitId}
              className="bg-white rounded-xl shadow-xs border border-slate-200/90 flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all group overflow-hidden"
            >
              <div className="p-4 sm:p-5 space-y-4">
                {/* 1. Header: Icon, Titles, Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs ${
                        isRs
                          ? 'bg-rose-50 text-rose-600 border-rose-200'
                          : isPam
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-cyan-50 text-cyan-600 border-cyan-200'
                      }`}
                    >
                      {isRs ? (
                        <Stethoscope className="w-6 h-6" />
                      ) : isPam ? (
                        <Shield className="w-6 h-6" />
                      ) : (
                        <Droplets className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider font-mono ${
                          isRs
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : isPam
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                        }`}
                      >
                        {unit.tipeEntitas}
                      </span>
                      <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight mt-1 leading-snug">
                        {unit.singkatan}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs shrink-0 self-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{unit.statusLabel}</span>
                  </span>
                </div>

                {/* 2. Core Strategic Mission */}
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  {unit.coreRole}
                </p>

                {/* 3. 4 Key Operational Metrics Tiles (NO TRUNCATION!) */}
                <div className="grid grid-cols-2 gap-2.5">
                  {unit.quickStats.map((stat, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs space-y-1 flex flex-col justify-between"
                    >
                      <span className="text-[10.5px] font-bold text-slate-600 uppercase tracking-tight leading-tight min-h-[28px] block">
                        {stat.label}
                      </span>

                      <div className="flex items-baseline justify-between gap-1 pt-0.5">
                        <span className="text-base sm:text-lg font-black text-slate-900 font-mono tracking-tight">
                          {stat.value}
                        </span>
                        {stat.trend && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded font-mono shrink-0 ${
                              stat.trend.startsWith('-')
                                ? 'text-blue-700 bg-blue-50 border border-blue-200'
                                : stat.trend === 'Stabil'
                                ? 'text-slate-600 bg-slate-100 border border-slate-200'
                                : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                            }`}
                          >
                            {stat.trend}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-500 leading-tight block pt-0.5 border-t border-slate-100">
                        {stat.subLabel}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 4. Interactive 3 Focus Operational Pillars */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Fokus Pilar Operasional:</span>
                    </span>
                    <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {currentPillar?.badge}
                    </span>
                  </div>

                  {/* Tabs for Pillars */}
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg text-[10px] font-bold">
                    {unit.pillars.map((pillar, pIdx) => {
                      const shortTitle =
                        pIdx === 0
                          ? isRs
                            ? 'Efisiensi Medis'
                            : isPam
                            ? 'Pasukan'
                            : 'Air (SPAM)'
                          : pIdx === 1
                          ? isRs
                            ? 'Center Excellence'
                            : isPam
                            ? 'Penertiban'
                            : 'Limbah B3'
                          : isRs
                          ? 'Kunjungan'
                          : isPam
                          ? 'Proteksi Obvit'
                          : 'Rusun & Aset';

                      return (
                        <button
                          key={pIdx}
                          onClick={() => handleTabChange(unit.unitId, pIdx)}
                          className={`py-1.5 px-2 rounded-md text-center transition-all cursor-pointer leading-tight ${
                            currentTabIndex === pIdx
                              ? 'bg-white text-slate-900 shadow-xs font-black ring-1 ring-slate-200'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                          }`}
                          title={pillar.title}
                        >
                          {shortTitle}
                        </button>
                      );
                    })}
                  </div>

                  {/* Pillar Detail Box */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/90 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-xs font-bold text-slate-900">
                        {currentPillar?.title}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {currentPillar?.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="flex items-center justify-between text-xs py-1 border-b border-slate-200/40 last:border-none"
                        >
                          <div className="pr-2">
                            <span className="text-slate-700 text-xs font-medium block leading-tight">
                              {m.label}
                            </span>
                            {m.sub && (
                              <span className="text-[10px] text-slate-400 block mt-0.5">
                                {m.sub}
                              </span>
                            )}
                          </div>
                          <span className="font-mono font-black text-slate-900 text-xs shrink-0 pl-1">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. Highlight Bullets from Satu Data */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Capaian Utama Berdasarkan Satu Data:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {unit.operationalHighlights.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11.5px] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 6. Card Footer with Satu Data Page & Action */}
              <div className="p-3.5 bg-slate-50/90 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10.5px]">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{unit.pdfPages}</span>
                </div>

                <button
                  onClick={() => onAnalyzeUnit(unit.unitId)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                >
                  <span>Buka Detail Satker</span>
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


