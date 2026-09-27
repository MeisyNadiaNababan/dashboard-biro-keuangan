import React from 'react';
import {
  ShieldCheck,
  Award,
  TrendingUp,
  FileCheck2,
  Info,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  HelpCircle,
} from 'lucide-react';
import { PERKIN_A1_KPIS, PerkinA1Kpi } from './administrasiKeuanganData';

interface AdministrasiKeuanganKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedKpiId?: string | null;
}

export const AdministrasiKeuanganKpiRow: React.FC<AdministrasiKeuanganKpiRowProps> = ({
  onOpenFormulaModal,
  selectedKpiId,
}) => {
  return (
    <div className="space-y-3">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#002B49] text-white flex items-center justify-center shadow-2xs">
            <Award className="w-3.5 h-3.5 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
              <span>INDIKATOR KINERJA PROGRAM (4 KPI UTAMA PERKIN A1)</span>
              <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                TA 2025 • DEP-1
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-sans">
          <span>Sasaran: <strong className="text-slate-700">Meningkatkan kualitas pengelolaan internal BP Batam</strong></span>
        </div>
      </div>

      {/* 4 Authentic KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {PERKIN_A1_KPIS.map((kpi) => {
          const isSelected = selectedKpiId === kpi.id;

          // Color themes according to KPI type
          const theme =
            kpi.no === 1
              ? {
                  border: 'border-blue-200 hover:border-blue-400',
                  badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
                  accentBg: 'bg-blue-600',
                  icon: ShieldCheck,
                }
              : kpi.no === 2
              ? {
                  border: 'border-indigo-200 hover:border-indigo-400',
                  badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                  accentBg: 'bg-indigo-600',
                  icon: Award,
                }
              : kpi.no === 3
              ? {
                  border: 'border-cyan-200 hover:border-cyan-400',
                  badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
                  accentBg: 'bg-cyan-600',
                  icon: TrendingUp,
                }
              : {
                  border: 'border-emerald-200 hover:border-emerald-400',
                  badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                  accentBg: 'bg-emerald-600',
                  icon: FileCheck2,
                };

          const IconComponent = theme.icon;

          return (
            <div
              key={kpi.id}
              className={`bg-white rounded-xl border p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/20'
                  : theme.border
              }`}
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${theme.accentBg}`}
              />

              <div className="space-y-2.5">
                {/* Header: Number & Source satker */}
                <div className="flex items-center justify-between gap-1 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md bg-slate-900 text-white font-mono text-[10px] font-black flex items-center justify-center">
                      0{kpi.no}
                    </span>
                    <span
                      className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded border font-mono uppercase tracking-wider truncate max-w-[150px] ${theme.badgeBg}`}
                      title={kpi.sumberData}
                    >
                      {kpi.sumberData?.split('/')?.[0]?.trim() || kpi.sumberData || ''}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenFormulaModal(kpi.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Buka Penjelasan Formula & Dasar Hukum"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* KPI Title */}
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-blue-700 transition-colors uppercase tracking-tight leading-snug">
                    {kpi.namaIndikator}
                  </h3>
                  <p className="text-[10.5px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {kpi.ringkasanPenjelasan}
                  </p>
                </div>

                {/* Target vs Realisasi Metric Box */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      Target 2025:
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {kpi.target2025}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2 pt-1 border-t border-slate-200/60">
                    <span className="text-[10px] font-bold uppercase text-slate-900 tracking-wider">
                      Realisasi:
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base sm:text-lg font-black font-mono text-slate-950 tracking-tight">
                        {kpi.realisasi2025}
                      </span>
                    </div>
                  </div>

                  {/* Achievement Status Pill */}
                  <div className="flex items-center justify-between text-[10px] pt-1">
                    <span className="text-slate-500 font-medium">Capaian:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{kpi.capaianPersen}%</span>
                      <span>({kpi.predikat})</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer: Formula & Modal trigger */}
              <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 font-mono truncate max-w-[130px]">
                  {kpi.satuan} • {kpi.periodePelaporan}
                </span>

                <button
                  onClick={() => onOpenFormulaModal(kpi.id)}
                  className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group-hover:underline"
                >
                  <span>Detail Acuan</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
