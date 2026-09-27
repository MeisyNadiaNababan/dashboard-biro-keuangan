import React from 'react';
import {
  Compass,
  HardHat,
  ShieldCheck,
  Building2,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { INFRASTRUKTUR_3_UNITS } from './perkinA7Data';

interface InfrastrukturPerkinA7UnitCardsProps {
  onAnalyzeUnit: (unitId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const InfrastrukturPerkinA7UnitCards: React.FC<InfrastrukturPerkinA7UnitCardsProps> = ({
  onAnalyzeUnit,
  onNavigateToUnit,
}) => {
  return (
    <div className="space-y-3 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-black tracking-wider uppercase text-slate-800">
              3 UNIT KERJA PENGAMPU INFRASTRUKTUR BP BATAM
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 font-mono">
              Perkin A.7 Tahun 2025
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Sinergi 3 direktorat dalam eksekusi masterplan, pembangunan fisik &amp; pengamanan koridor ruang publik.
          </p>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          Klik tombol unit untuk membuka deep-dive atau dashboard penuh
        </span>
      </div>

      {/* Grid of 3 Pillar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {INFRASTRUKTUR_3_UNITS.map((unit) => {
          const isPerencanaan = unit.id === 'dit-perencanaan-infrastruktur';
          const isPembangunan = unit.id === 'dit-pembangunan-infrastruktur';
          const isPengamanan = unit.id === 'dit-pam-aset';

          return (
            <div
              key={unit.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                        isPerencanaan
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : isPembangunan
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {isPerencanaan && <Compass className="w-5 h-5" />}
                      {isPembangunan && <HardHat className="w-5 h-5" />}
                      {isPengamanan && <ShieldCheck className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-900 text-white">
                          {unit.code}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {unit.datasetCount} Dataset Resmi
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors mt-0.5">
                        {unit.name}
                      </h4>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      unit.statusColor === 'emerald'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : unit.statusColor === 'sky'
                        ? 'bg-sky-50 text-sky-700 border-sky-300'
                        : 'bg-amber-50 text-amber-700 border-amber-300'
                    }`}
                  >
                    {unit.statusPilar}
                  </span>
                </div>

                {/* Subtitle / Role */}
                <div className="text-[11px] font-bold text-blue-800 bg-blue-50/70 border border-blue-100 px-2 py-1 rounded-lg mb-2.5">
                  {unit.pilarUtama}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">
                  {unit.deskripsi}
                </p>

                {/* Pagu & Realisasi Fiscal Matrix */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Pagu Anggaran 2025:</span>
                    <span className="font-mono font-bold text-slate-900">{unit.paguAnggaran}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Realisasi Belanja:</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {unit.realisasiAnggaran} ({unit.persenRealisasi}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${unit.persenRealisasi}%` }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>

                {/* 4 Quick KPIs Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {unit.kpiRingkasan.map((kpi, idx) => (
                    <div key={idx} className="bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                      <div className="text-[9.5px] uppercase font-mono text-slate-400 truncate">
                        {kpi.label}
                      </div>
                      <div className="text-xs font-black font-mono text-slate-800 mt-0.5 truncate">
                        {kpi.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Datasets Accordion List */}
                <div className="space-y-1 mb-4">
                  <div className="text-[10px] uppercase font-mono font-bold text-slate-400">
                    Katalog Dataset Satu Data:
                  </div>
                  {unit.datasetList.slice(0, 3).map((ds, idx) => (
                    <div key={idx} className="text-[11px] text-slate-600 flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span className="truncate">{ds}</span>
                    </div>
                  ))}
                  {unit.datasetList.length > 3 && (
                    <div className="text-[10px] text-blue-600 font-semibold">
                      +{unit.datasetList.length - 3} dataset lainnya tersedia di Deep-Dive
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onAnalyzeUnit(unit.id)}
                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Buka Deep-Dive</span>
                </button>

                {onNavigateToUnit && (
                  <button
                    onClick={() => onNavigateToUnit(unit.id)}
                    className="py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                    title={`Buka Dashboard Penuh ${unit.shortName}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Dashboard Unit</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
