import React from 'react';
import {
  TrendingUp,
  Award,
  ShieldCheck,
  Server,
  FileCode2,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Info,
} from 'lucide-react';
import { IKP_METRICS_LIST } from './kebijakanStrategisData';

interface KebijakanStrategisKpiRowProps {
  onOpenFormulaModal?: (kpiId: string) => void;
  selectedUnit?: string;
}

export const KebijakanStrategisKpiRow: React.FC<KebijakanStrategisKpiRowProps> = ({
  onOpenFormulaModal,
  selectedUnit = 'ALL',
}) => {
  return (
    <div className="space-y-2.5">
      {/* Section Sub-heading */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-sky-700" />
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
            4 INDIKATOR KINERJA PROGRAM (IKP) · PERKIN A2 (DEP A2)
          </h2>
          <span className="text-[11px] text-slate-500 font-medium">
            Sasaran: Meningkatnya kualitas kebijakan dan perizinan BP Batam
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
          Sumber: Perjanjian Kinerja No. 3/KA/8/2025
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {IKP_METRICS_LIST.map((ikp) => {
          const isHighlighted = selectedUnit === 'ALL' || selectedUnit === ikp.unitId;

          return (
            <div
              key={ikp.id}
              className={`rounded-xl border p-4 transition-all flex flex-col justify-between space-y-3 bg-white shadow-xs ${
                isHighlighted
                  ? 'border-slate-200/90 hover:border-sky-300 hover:shadow-md'
                  : 'opacity-60 border-slate-100'
              }`}
            >
              {/* Header: Code & Predicate */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-black tracking-wider uppercase bg-slate-100 text-slate-700">
                    {ikp.code} · BUTIR #{ikp.number}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${
                      ikp.predikatColor === 'emerald'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : ikp.predikatColor === 'blue'
                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    }`}
                  >
                    {ikp.predikat}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug line-clamp-2">
                  {ikp.title}
                </h3>
              </div>

              {/* Main Numbers: Realisasi vs Target */}
              <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-100 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                      {typeof ikp.realisasi === 'number' && ikp.realisasi % 1 !== 0
                        ? ikp.realisasi.toFixed(2)
                        : ikp.realisasi}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      {ikp.satuan}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                      Target 2025
                    </span>
                    <span className="text-xs font-mono font-black text-slate-700">
                      {typeof ikp.target === 'number' && ikp.target % 1 !== 0
                        ? ikp.target.toFixed(2)
                        : ikp.target}
                    </span>
                  </div>
                </div>

                {/* Capaian Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Capaian Kinerja</span>
                    <span className="font-black text-emerald-700">
                      {ikp.capaianPersen.toFixed(1)}% (Melampaui)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-sky-500 to-emerald-500"
                      style={{ width: `${Math.min(ikp.capaianPersen, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Attribution & Activities */}
              <div className="space-y-1.5 text-[10.5px] text-slate-600 pt-1 border-t border-slate-100">
                <div className="flex items-start justify-between gap-1.5">
                  <span className="text-slate-400 font-medium shrink-0">Sumber:</span>
                  <span className="font-mono font-bold text-sky-800 text-[10px] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200 truncate">
                    {ikp.id === 'ikp-1-perencanaan' && 'Data P3S No. 3 (Satu Data)'}
                    {ikp.id === 'ikp-2-kebijakan' && 'Data PHKS No. 1 (Satu Data)'}
                    {ikp.id === 'ikp-3-spbe' && 'Data PDSI No. 1 (Satu Data)'}
                    {ikp.id === 'ikp-4-ikm-ptsp' && 'Data PTSP No. 4 (Satu Data)'}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400 font-medium shrink-0">Alokasi Pagu:</span>
                  <span className="font-mono font-bold text-slate-900">
                    Rp {(ikp.paguKegiatan / 1e9).toFixed(2)} Miliar
                  </span>
                </div>
              </div>

              {/* Footer Button: Formula Modal */}
              <button
                onClick={() => onOpenFormulaModal && onOpenFormulaModal(ikp.id)}
                className="w-full py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Buka rumus, regulasi acuan, dan rentang penilaian"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Kamus Rumus &amp; Regulasi</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
