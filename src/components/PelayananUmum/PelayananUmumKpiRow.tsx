import React from 'react';
import {
  TrendingUp,
  Percent,
  Calculator,
  Activity,
  ArrowUpRight,
  HelpCircle,
  Stethoscope,
  Shield,
  Droplets,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { PERKIN_A6_KPIS } from './pelayananUmumData';

interface PelayananUmumKpiRowProps {
  onOpenFormulaModal: (kpiId?: string) => void;
  selectedUnit?: string;
}

export const PelayananUmumKpiRow: React.FC<PelayananUmumKpiRowProps> = ({
  onOpenFormulaModal,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PERKIN_A6_KPIS.map((kpi) => {
        const isKpi1 = kpi.id === 'ikp-1';
        const isKpi2 = kpi.id === 'ikp-2';
        const isKpi3 = kpi.id === 'ikp-3';

        return (
          <div
            key={kpi.id}
            className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md hover:border-blue-300 group"
          >
            {/* Top decorative accent line */}
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 ${
                isKpi1
                  ? 'bg-blue-600'
                  : isKpi2
                  ? 'bg-emerald-600'
                  : 'bg-indigo-600'
              }`}
            />

            <div>
              {/* Top Sub-Header: KPI Code + Status Badge (No wrapping conflict) */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10.5px] font-mono font-extrabold ${
                      isKpi1
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : isKpi2
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    {kpi.kode}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    INDIKATOR KINERJA PROGRAM
                  </span>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 flex items-center gap-1 ${
                    kpi.status === 'healthy'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {kpi.status === 'healthy' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  )}
                  <span>{kpi.statusLabel}</span>
                </span>
              </div>

              {/* Title & Icon: FULL TEXT, NEVER CUT OFF / NO TRUNCATE */}
              <div className="pt-3 flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                    isKpi1
                      ? 'bg-blue-600 text-white'
                      : isKpi2
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {isKpi1 ? (
                    <Percent className="w-5 h-5" />
                  ) : isKpi2 ? (
                    <Calculator className="w-5 h-5" />
                  ) : (
                    <Activity className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug tracking-tight group-hover:text-blue-600 transition-colors">
                    {kpi.indikator}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                    {kpi.sasaranProgram}
                  </p>
                </div>
              </div>

              {/* Main Headline Number & Target Display */}
              <div className="mt-4 pt-2 flex items-baseline justify-between gap-2 border-t border-slate-50">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-sans">
                      {kpi.realisasiDisplay}
                    </span>
                    {isKpi3 && (
                      <span className="text-slate-400 font-bold text-xs sm:text-sm">
                        / 100
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 font-mono flex items-center gap-0.5 mt-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    Capaian {kpi.persenCapaian.toFixed(1)}% dari Target
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    {isKpi1
                      ? 'TARGET PERKIN'
                      : isKpi2
                      ? 'TARGET RASIO'
                      : 'TARGET PERKIN'}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-800 font-mono">
                    {kpi.targetDisplay}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Satuan: {kpi.satuan}
                  </span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isKpi1
                        ? 'bg-blue-600'
                        : isKpi2
                        ? 'bg-emerald-600'
                        : 'bg-indigo-600'
                    }`}
                    style={{
                      width: `${Math.min(
                        kpi.persenCapaian > 100 ? 100 : kpi.persenCapaian,
                        100
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10.5px] text-slate-500 font-mono mt-1">
                  <span>0%</span>
                  <span className="font-bold text-slate-800">
                    Capaian: {kpi.persenCapaian.toFixed(1)}%
                  </span>
                  <span>100% Target</span>
                </div>
              </div>
            </div>

            {/* Bottom: Breakdown Badan Usaha Layanan Umum */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <div className="text-[10.5px] uppercase font-extrabold text-slate-600 tracking-wider flex items-center justify-between">
                <span>Rincian Kontribusi Badan Usaha</span>
                <button
                  onClick={() => onOpenFormulaModal(kpi.id)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer font-bold lowercase bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors text-[10.5px]"
                  title="Lihat formula & penjelasan operasional resmi"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Kamus Rumus</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {kpi.komponenUnit.slice(0, 2).map((comp, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 rounded-lg p-2 border border-slate-200/70 hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                      {idx === 0 ? (
                        <Stethoscope className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      ) : (
                        <Droplets className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      )}
                      <span className="truncate">{comp.unit}</span>
                    </div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="font-extrabold text-slate-900 font-mono text-xs">
                        {isKpi1
                          ? `+${comp.realisasi}%`
                          : isKpi2
                          ? `Rasio ${comp.realisasi}`
                          : `${comp.realisasi} / 100`}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">
                        {comp.subLabel || `${comp.persen}%`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

