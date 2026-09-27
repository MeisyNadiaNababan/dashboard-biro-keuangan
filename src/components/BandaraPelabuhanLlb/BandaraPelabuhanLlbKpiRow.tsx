import React from 'react';
import {
  TrendingUp,
  Sparkles,
  Award,
  ChevronRight,
  Info,
  CheckCircle2,
  ArrowUpRight,
  DollarSign,
  PieChart as PieIcon,
  ShieldCheck,
  Plane,
  Anchor,
  Truck,
  Users,
} from 'lucide-react';
import { PERKIN_A5_KPIS, PerkinA5Kpi } from './bandaraPelabuhanLlbData';

interface BandaraPelabuhanLlbKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedQuarter?: string;
}

export const BandaraPelabuhanLlbKpiRow: React.FC<BandaraPelabuhanLlbKpiRowProps> = ({
  onOpenFormulaModal,
  selectedQuarter = 'ALL',
}) => {
  return (
    <div className="space-y-3 font-sans">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#002B49] text-white flex items-center justify-center text-xs shadow-2xs font-mono font-bold">
            3
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
              <span>3 INDIKATOR KINERJA PROGRAM (PERKIN A.5 TAHUN 2025)</span>
              <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                100% HIJAU &bull; RATA-RATA CAPAIAN 107,94%
              </span>
            </h2>
          </div>
        </div>

        <span className="text-[11px] text-slate-500 hidden sm:inline font-sans">
          Klik tombol <Info className="w-3 h-3 inline text-blue-600" /> untuk melihat kamus rumus perhitungan, regulasi &amp; lokus survei
        </span>
      </div>

      {/* Grid 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {PERKIN_A5_KPIS.map((kpi) => {
          const isExceeded = kpi.achievement >= 100;
          const accentGradient =
            kpi.number === 1
              ? 'from-blue-600 to-indigo-600'
              : kpi.number === 2
              ? 'from-sky-600 to-cyan-600'
              : 'from-emerald-600 to-teal-600';

          const icon =
            kpi.number === 1 ? (
              <Users className="w-4 h-4 text-white" />
            ) : kpi.number === 2 ? (
              <Anchor className="w-4 h-4 text-white" />
            ) : (
              <Truck className="w-4 h-4 text-white" />
            );

          return (
            <div
              key={kpi.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden relative group"
            >
              {/* Top Accent Strip */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${accentGradient}`} />

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                {/* Badge Header & Info Button */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg bg-gradient-to-br ${accentGradient} flex items-center justify-center shadow-xs`}
                    >
                      {icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {kpi.code}
                      </span>
                      <span className="ml-1.5 text-[10px] text-slate-400 font-mono">
                        PERKIN A.5
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenFormulaModal(kpi.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Buka Kamus Rumus & Definisi Operasional"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* KPI Title */}
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug line-clamp-2">
                    {kpi.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {kpi.responsibleUnit}
                  </p>
                </div>

                {/* Realization & Target Display */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        Realisasi 2025
                      </div>
                      <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
                        {kpi.realization}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        Target Perkin
                      </div>
                      <div className="text-sm sm:text-base font-bold font-mono text-slate-600">
                        {kpi.programTarget}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar & Capaian */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[11px] text-slate-600">Capaian Target:</span>
                      <span className="font-extrabold text-emerald-600">
                        {kpi.achievement.toFixed(2)}%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isExceeded
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                        }`}
                        style={{ width: `${Math.min(kpi.achievement, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Breakdown per Satker / Component */}
                {kpi.breakdown && kpi.breakdown.length > 0 && (
                  <div className="pt-2 border-t border-dashed border-slate-200 space-y-1.5 text-xs">
                    <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Breakdown Satker Pengampu:
                    </div>
                    {kpi.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px]"
                      >
                        <div className="truncate mr-2">
                          <span className="font-bold text-slate-800">{item.entity}</span>
                          {item.sharePercent && (
                            <span className="ml-1 text-[10px] font-mono text-slate-500">
                              ({item.sharePercent}%)
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 font-mono">
                          <span className="text-slate-900 font-bold">{item.realization}</span>
                          <span className="text-[10px] text-emerald-600 font-bold">
                            {item.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Quick Footer */}
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Baseline 2024: {kpi.baseline2024}</span>
                <span className="text-emerald-700 font-bold uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  TUNTAS MELAMPAUI
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
