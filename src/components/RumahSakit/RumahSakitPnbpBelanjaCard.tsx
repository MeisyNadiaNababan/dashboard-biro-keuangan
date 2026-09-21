import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  HelpCircle,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Building,
  Activity,
  AlertCircle,
} from 'lucide-react';
import {
  RS_KEUANGAN_SUMMARY,
  RS_POS_PNBP,
  RS_POS_BELANJA,
} from '../../data/rumahSakitData';

interface RumahSakitPnbpBelanjaCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const RumahSakitPnbpBelanjaCard: React.FC<RumahSakitPnbpBelanjaCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeView, setActiveView] = useState<'pnbp' | 'belanja'>('pnbp');

  const {
    totalTargetPnbpMiliar,
    totalRealisasiPnbpMiliar,
    persentasePnbp,
    totalPaguBelanjaMiliar,
    totalRealisasiBelanjaMiliar,
    totalSisaPaguMiliar,
    persentaseBelanja,
    rasioPenerimaanBelanja,
  } = RS_KEUANGAN_SUMMARY;

  return (
    <div
      id="card-rsbp-keuangan-pnbp-belanja"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 font-sans flex flex-col justify-between"
    >
      {/* 1. Header with Title, Switcher & Formula Button */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Dataset #2 & #12
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                  Tertutup
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                Kinerja Keuangan BLU RSBP: Realisasi PNBP & Belanja
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-center">
            {/* Toggle View Switcher */}
            <div className="bg-slate-100 p-0.5 rounded-lg flex items-center text-xs">
              <button
                onClick={() => setActiveView('pnbp')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeView === 'pnbp'
                    ? 'bg-white text-emerald-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pos PNBP (DS 2)
              </button>
              <button
                onClick={() => setActiveView('belanja')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeView === 'belanja'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pos Belanja (DS 12)
              </button>
            </div>

            <button
              onClick={() => onOpenFormulaModal && onOpenFormulaModal(activeView === 'pnbp' ? 'rsbp_pnbp' : 'rsbp_belanja')}
              className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
              title="Lihat Formula Perhitungan & Atribut Satu Data"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Top Summary Comparison BANs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 my-3">
          {/* BAN 1: PNBP */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-2.5">
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">
              Realisasi PNBP (DS 2)
            </span>
            <div className="text-base sm:text-lg font-black text-emerald-800 mt-0.5">
              Rp {totalRealisasiPnbpMiliar.toFixed(2)}{' '}
              <span className="text-xs font-semibold text-slate-500">M</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700">
              {persentasePnbp.toFixed(1)}% dari Rp {totalTargetPnbpMiliar.toFixed(1)} M
            </span>
          </div>

          {/* BAN 2: Belanja */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2.5">
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">
              Realisasi Belanja (DS 12)
            </span>
            <div className="text-base sm:text-lg font-black text-blue-800 mt-0.5">
              Rp {totalRealisasiBelanjaMiliar.toFixed(2)}{' '}
              <span className="text-xs font-semibold text-slate-500">M</span>
            </div>
            <span className="text-[10px] font-bold text-blue-700">
              {persentaseBelanja.toFixed(1)}% dari Rp {totalPaguBelanjaMiliar.toFixed(1)} M
            </span>
          </div>

          {/* BAN 3: Cost Recovery Rate (DS 3) */}
          <div className="col-span-2 sm:col-span-1 bg-amber-50/50 border border-amber-100 rounded-lg p-2.5">
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">
              Cost Recovery Rate (DS 3)
            </span>
            <div className="text-base sm:text-lg font-black text-amber-800 mt-0.5">
              {rasioPenerimaanBelanja.toFixed(2)}%
            </div>
            <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Mandiri Finansial (&gt; 100%)
            </span>
          </div>
        </div>

        {/* 3. Detailed Data Table for Selected View */}
        {activeView === 'pnbp' ? (
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-semibold">
              <span>Rincian Realisasi Pos Layanan Penghasil PNBP:</span>
              <span>Total Target: Rp {totalTargetPnbpMiliar.toFixed(1)} M</span>
            </div>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {RS_POS_PNBP.map((pos, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-emerald-50/40 transition-colors border border-slate-200/70 rounded-lg p-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-800 line-clamp-1">
                      {pos.posLayanan}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-slate-900">
                        Rp {pos.realisasiMiliar.toFixed(1)} M
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                        {pos.persenCapaian.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500">
                    <div className="grow bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-1.5 rounded-full"
                        style={{ width: `${Math.min(pos.persenCapaian, 100)}%` }}
                      />
                    </div>
                    <span className="shrink-0 font-mono text-[9px] text-slate-500">
                      Target: Rp {pos.targetMiliar.toFixed(1)} M ({pos.kontribusiPersen.toFixed(1)}% Porsi)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-semibold">
              <span>Rincian Penyerapan Pagu Belanja DIPA RSBP:</span>
              <span>Sisa Pagu: Rp {totalSisaPaguMiliar.toFixed(2)} M</span>
            </div>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {RS_POS_BELANJA.map((belanja, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-blue-50/40 transition-colors border border-slate-200/70 rounded-lg p-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-800 line-clamp-1">
                      {belanja.kategoriBelanja}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-slate-900">
                        Rp {belanja.realisasiMiliar.toFixed(2)} M
                      </span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded">
                        {belanja.persenSerapan.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500">
                    <div className="grow bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${Math.min(belanja.persenSerapan, 100)}%` }}
                      />
                    </div>
                    <span className="shrink-0 font-mono text-[9px] text-slate-500">
                      Pagu Rp {belanja.paguMiliar.toFixed(1)} M • Sisa Rp {belanja.sisaPaguMiliar.toFixed(2)} M
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Footer Note for Executive */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Status BLU: <strong>Mandiri & Solven</strong>
        </span>
        <span className="font-mono text-[10px] text-slate-400">
          Update: BRS-02/12/2026
        </span>
      </div>
    </div>
  );
};
