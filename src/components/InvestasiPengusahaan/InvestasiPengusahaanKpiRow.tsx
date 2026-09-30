import React from 'react';
import {
  Award,
  FileCode2,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { PERKIN_A4_KPIS } from './investasiPengusahaanData';

interface InvestasiPengusahaanKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedQuarter?: string;
  selectedSatker?: string;
}

export const InvestasiPengusahaanKpiRow: React.FC<InvestasiPengusahaanKpiRowProps> = ({
  onOpenFormulaModal,
  selectedSatker = 'ALL',
}) => {
  return (
    <div className="space-y-2.5 font-sans">
      {/* Section Sub-heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-1">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-700" />
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
            4 INDIKATOR KINERJA PROGRAM (IKP) &bull; PERKIN A.4 TAHUN 2025
          </h2>
          <span className="text-[11px] text-slate-500 font-medium hidden md:inline">
            Sasaran: Meningkatnya efektivitas promosi dan kualitas realisasi investasi
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          Sumber: Perjanjian Kinerja No. 7 /KA/3 /2025
        </span>
      </div>

      {/* 4 Cards Grid - Model DEP-A2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {PERKIN_A4_KPIS.map((ikp) => {
          const isHighlighted = selectedSatker === 'ALL' || selectedSatker === ikp.unitId;

          return (
            <div
              key={ikp.id}
              className={`rounded-xl border p-4 transition-all flex flex-col justify-between space-y-3 bg-white shadow-xs ${
                isHighlighted
                  ? 'border-slate-200/90 hover:border-blue-300 hover:shadow-md'
                  : 'opacity-60 border-slate-100'
              }`}
            >
              {/* Header: Code & Predicate */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-black tracking-wider uppercase bg-slate-100 text-slate-700">
                    {ikp.code} &bull; BUTIR #{ikp.number}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200">
                    {ikp.predikat}
                  </span>
                </div>

                <h3
                  className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug line-clamp-2"
                  title={ikp.name}
                >
                  {ikp.name}
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
                      {ikp.targetDisplay}
                    </span>
                  </div>
                </div>

                {/* Capaian Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Capaian Kinerja</span>
                    <span className="font-black text-emerald-700">
                      {ikp.capaianPersen.toFixed(1)}% (
                      {ikp.capaianPersen >= 100 ? 'Melampaui' : 'Tercapai Baik'})
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-blue-500 to-emerald-500"
                      style={{ width: `${Math.min(ikp.capaianPersen, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Attribution & Activities: Sumber & Unit Pelaksana (Sesuai DEP-A2) */}
              <div className="space-y-1.5 text-[10.5px] text-slate-600 pt-1 border-t border-slate-100">
                <div className="flex items-start justify-between gap-1.5">
                  <span className="text-slate-400 font-medium shrink-0">Sumber:</span>
                  <span className="font-mono font-bold text-blue-800 text-[10px] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 truncate max-w-[200px]" title={ikp.sumberData}>
                    {ikp.sumberData}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400 font-medium shrink-0">Unit Pelaksana:</span>
                  <span className="font-mono font-bold text-slate-800 text-[10.5px]">
                    {ikp.unitKerja}
                  </span>
                </div>
              </div>

              {/* Footer Button: Formula Modal */}
              <button
                type="button"
                onClick={() => onOpenFormulaModal(ikp.id)}
                className="w-full py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
