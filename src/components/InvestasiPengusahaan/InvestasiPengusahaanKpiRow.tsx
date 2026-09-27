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
  Building2,
  Users,
  Compass,
} from 'lucide-react';
import { PERKIN_A4_KPIS, PerkinA4Kpi } from './investasiPengusahaanData';

interface InvestasiPengusahaanKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedQuarter?: string;
}

export const InvestasiPengusahaanKpiRow: React.FC<InvestasiPengusahaanKpiRowProps> = ({
  onOpenFormulaModal,
  selectedQuarter = 'ALL',
}) => {
  return (
    <div className="space-y-2.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#002B49] text-white flex items-center justify-center text-xs shadow-2xs font-mono font-bold">
            4
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
              <span>4 INDIKATOR KINERJA PROGRAM (PERKIN A.4 TAHUN 2025)</span>
              <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                100% HIJAU &bull; RATA-RATA 114,67%
              </span>
            </h2>
          </div>
        </div>

        <span className="text-[11px] text-slate-500 hidden sm:inline font-sans">
          Klik tombol formula <Info className="w-3 h-3 inline text-blue-600" /> untuk detail perhitungan &amp; dasar hukum
        </span>
      </div>

      {/* Grid 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {PERKIN_A4_KPIS.map((kpi) => {
          // Dynamic accent color
          const isExceeded = kpi.achievement >= 100;
          const accentGradient =
            kpi.number === 1
              ? 'from-blue-600 to-cyan-600'
              : kpi.number === 2
              ? 'from-emerald-600 to-teal-600'
              : kpi.number === 3
              ? 'from-indigo-600 to-blue-700'
              : 'from-amber-500 to-orange-600';

          const bgHeader =
            kpi.number === 1
              ? 'bg-blue-50/70 border-b border-blue-100'
              : kpi.number === 2
              ? 'bg-emerald-50/70 border-b border-emerald-100'
              : kpi.number === 3
              ? 'bg-indigo-50/70 border-b border-indigo-100'
              : 'bg-amber-50/70 border-b border-amber-100';

          return (
            <div
              key={kpi.id}
              className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header Top */}
              <div>
                <div className={`p-3 ${bgHeader} flex items-start justify-between gap-2`}>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[11px] font-bold shadow-2xs">
                      {kpi.code}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                      {kpi.pjSatkerCode}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onOpenFormulaModal(kpi.id)}
                      title="Lihat Rumus & Definisi Operasional"
                      className="p-1 rounded-md text-slate-500 hover:text-blue-700 hover:bg-white/80 transition-colors cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Melampaui
                    </span>
                  </div>
                </div>

                {/* KPI Title & Target */}
                <div className="p-3 pb-2 space-y-2">
                  <h3 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2" title={kpi.name}>
                    {kpi.name}
                  </h3>

                  {/* Big Realization Number */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">Realisasi Capaian:</div>
                      <div className="text-2xl sm:text-2xl font-black text-slate-900 tracking-tight font-mono flex items-baseline gap-1">
                        <span>{kpi.realisasiDisplay}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-mono">Target: {kpi.targetDisplay}</div>
                      <div className="text-xs font-mono font-black text-emerald-700 flex items-center justify-end gap-0.5">
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{kpi.achievement.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${accentGradient} transition-all duration-700`}
                        style={{ width: `${Math.min(100, (kpi.realisasi / kpi.target) * 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Baseline: {kpi.baseline2024}</span>
                      <span className="text-emerald-700 font-bold">{kpi.yoyGrowth}</span>
                    </div>
                  </div>

                  {/* Quarterly Mini Bars */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[10px] font-mono text-slate-500 mb-1 flex justify-between items-center">
                      <span>Tren Kuartalan Q1-Q4:</span>
                      <span className="text-slate-400">Target vs Real</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {kpi.quarterlyBreakdown.map((q) => {
                        const isQSelected = selectedQuarter === 'ALL' || selectedQuarter === q.quarter;
                        const barPct = Math.min(100, (q.realisasi / q.target) * 100);
                        return (
                          <div
                            key={q.quarter}
                            className={`p-1 rounded text-center transition-all ${
                              isQSelected ? 'bg-slate-50 border border-slate-200' : 'opacity-40'
                            }`}
                          >
                            <div className="text-[9px] font-mono font-bold text-slate-600">{q.quarter}</div>
                            <div className="h-1 w-full bg-slate-200 rounded-full my-1 overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${barPct}%` }}
                              />
                            </div>
                            <div className="text-[9px] font-mono text-slate-800 font-extrabold truncate">
                              {q.realisasi >= 1000 ? `${(q.realisasi / 1000).toFixed(1)}k` : q.realisasi.toFixed(1)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Note */}
              <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-600 flex items-center justify-between">
                <span className="truncate pr-1">Pengampu: <strong className="text-slate-800">{kpi.pjSatker}</strong></span>
                <button
                  onClick={() => onOpenFormulaModal(kpi.id)}
                  className="text-blue-600 hover:text-blue-800 font-bold hover:underline shrink-0 flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Detail</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
