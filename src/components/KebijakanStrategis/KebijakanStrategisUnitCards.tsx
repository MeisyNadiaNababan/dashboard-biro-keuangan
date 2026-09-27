import React from 'react';
import {
  Building2,
  Sparkles,
  ExternalLink,
  Award,
  Layers,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { KEBIJAKAN_STRATEGIS_UNITS, KebijakanStrategisUnitProfile } from './kebijakanStrategisData';

interface KebijakanStrategisUnitCardsProps {
  onSelectUnitDeepDive: (unitId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  selectedUnit?: string;
}

export const KebijakanStrategisUnitCards: React.FC<KebijakanStrategisUnitCardsProps> = ({
  onSelectUnitDeepDive,
  onNavigateToFullDashboard,
  selectedUnit = 'ALL',
}) => {
  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-indigo-700" />
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
            4 UNIT KERJA PELAKSANA KEBIJAKAN STRATEGIS &amp; PERIZINAN
          </h2>
          <span className="text-[11px] text-slate-500 font-medium">
            (PTSP · Pusren · PHKS · PDSI)
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
          Total 64 Dataset Satu Data Terintegrasi
        </span>
      </div>

      {/* Grid of 4 Units */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {KEBIJAKAN_STRATEGIS_UNITS.map((unit) => {
          const isSelected = selectedUnit === 'ALL' || selectedUnit === unit.id;

          return (
            <div
              key={unit.id}
              className={`bg-white rounded-xl border p-4 sm:p-5 shadow-xs transition-all flex flex-col justify-between space-y-3.5 ${
                isSelected
                  ? 'border-slate-200/90 hover:border-indigo-300 hover:shadow-md'
                  : 'opacity-60 border-slate-100'
              }`}
            >
              {/* Header: Unit Code, Name & Pagu */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md font-mono text-[10.5px] font-black tracking-wider uppercase bg-indigo-50 text-indigo-800 border border-indigo-200/80">
                      {unit.code}
                    </span>
                    <span className="text-[10.5px] font-bold text-slate-500">
                      {unit.datasetCount} Dataset PDF ({unit.pdfPages})
                    </span>
                  </div>

                  <span className="font-mono text-xs font-black text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    Pagu: Rp {(unit.paguAnggaran / 1e9).toFixed(2)} M
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug">
                    {unit.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Penanggung Jawab: <span className="text-slate-800 font-semibold">{unit.pimpinan}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {unit.ringkasanPeran}
                </p>
              </div>

              {/* Connected IKP Target vs Realisasi */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      IKP Perkin Terhubung
                    </span>
                    <span className="font-bold text-slate-800">{unit.ikpTerhubung}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Realisasi
                  </span>
                  <span className="font-mono font-black text-emerald-700">
                    {unit.realisasiIkp}
                  </span>
                </div>
              </div>

              {/* 4 Key Highlights Matrix */}
              <div className="grid grid-cols-2 gap-2">
                {unit.keyHighlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-50/70 border border-slate-100 space-y-0.5"
                  >
                    <span className="text-[9.5px] uppercase font-bold text-slate-400 block truncate">
                      {hl.label}
                    </span>
                    <div className="text-xs font-black font-mono text-slate-900 truncate">
                      {hl.value}
                    </div>
                    <span className="text-[9.5px] font-semibold text-emerald-600 block truncate">
                      {hl.trend}
                    </span>
                  </div>
                ))}
              </div>

              {/* Isu Strategis Alert */}
              <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-200/70 text-[10.5px] text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong className="font-bold">Isu Strategis:</strong> {unit.isuStrategis}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onSelectUnitDeepDive(unit.id)}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  title={`Buka analisis mendalam untuk ${unit.shortName}`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Analisis Deep-Dive</span>
                </button>

                {onNavigateToFullDashboard && (
                  <button
                    onClick={() => onNavigateToFullDashboard(unit.id)}
                    className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border border-slate-200"
                    title={`Buka dashboard khusus 24 unit: ${unit.name}`}
                  >
                    <span>Dashboard Unit</span>
                    <ExternalLink className="w-3 h-3" />
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
