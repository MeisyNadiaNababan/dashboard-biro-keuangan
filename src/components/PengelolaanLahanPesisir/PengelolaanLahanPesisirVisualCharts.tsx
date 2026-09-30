import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Layers,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  Compass,
  PieChart as PieIcon,
  Sparkles,
} from 'lucide-react';
import { LAHAN_KAWASAN_SUMMARY } from './pengelolaanLahanPesisirData';
import { LahanPesisirIkeEvaluationSection } from './LahanPesisirIkeEvaluationSection';
import { SwpLahanTersediaCard } from '../PengelolaanLahan/SwpLahanTersediaCard';
import { EnamLayananLahanPieCard } from '../PengelolaanLahan/EnamLayananLahanPieCard';

interface PengelolaanLahanPesisirVisualChartsProps {
  onOpenFormulaModal?: (kpiId: string) => void;
  onSelectSwpDetail?: (swpId: string) => void;
}

type DepA3MainSheet = 'ikp' | 'lahan-swp' | 'layanan';

export const PengelolaanLahanPesisirVisualCharts: React.FC<
  PengelolaanLahanPesisirVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  // State for Sheet Swap DEP-A3
  const [activeMainSheet, setActiveMainSheet] = useState<DepA3MainSheet>('ikp');

  return (
    <div className="space-y-4">
      {/* REQUIREMENT: SHEET SWAP KONSOLIDASI DEP-A3 (3 VISUALISASI UTAMA) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-2xs shrink-0">
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                SHEET SWAP ANALITIKAL DEP-A3
              </span>
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                Satu Data BP Batam
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mt-0.5">
              Konsolidasi 3 Visualisasi Portofolio Lahan &amp; Kawasan
            </h3>
          </div>
        </div>

        {/* 3 Tab Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveMainSheet('ikp')}
            className={`px-3 py-2 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeMainSheet === 'ikp'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span>Capaian Evaluasi 3 IKP</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainSheet('lahan-swp')}
            className={`px-3 py-2 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeMainSheet === 'lahan-swp'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lahan yang Tersedia dengan Area SWP (#15)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainSheet('layanan')}
            className={`px-3 py-2 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeMainSheet === 'layanan'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Rekapitulasi 10 Layanan Pertanahan</span>
          </button>
        </div>
      </div>

      {/* 3. DYNAMIC CONTENT CONTAINER BASED ON ACTIVE SHEET */}
      <div className="space-y-4">
        {/* SHEET 1: CAPAIAN EVALUASI 3 INDIKATOR KINERJA PROGRAM (IKP) */}
        {activeMainSheet === 'ikp' && (
          <LahanPesisirIkeEvaluationSection onOpenFormulaModal={onOpenFormulaModal} />
        )}

        {/* SHEET 2: LAHAN YANG TERSEDIA DENGAN AREA SUB WILAYAH PENGEMBANGAN (SWP) - DATASET #15 */}
        {activeMainSheet === 'lahan-swp' && (
          <SwpLahanTersediaCard onOpenFormulaModal={onOpenFormulaModal} />
        )}

        {/* SHEET 3: REKAPITULASI 6 LAYANAN PERTANAHAN & PENGELOLAAN LAHAN BP BATAM */}
        {activeMainSheet === 'layanan' && (
          <EnamLayananLahanPieCard onOpenFormulaModal={onOpenFormulaModal} />
        )}
      </div>
    </div>
  );
};
