import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { SPIP_MATURITAS_ITEMS, SKOR_AGREGAT_SPIP } from './bokmrData';

export const SpipMaturitasChart: React.FC = () => {
  const [selectedItemNo, setSelectedItemNo] = useState<number>(1);

  const selectedItem = SPIP_MATURITAS_ITEMS.find((item) => item.no === selectedItemNo) || SPIP_MATURITAS_ITEMS[0];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Matriks Penilaian Maturitas Sistem Pengendalian Intern Pemerintah (SPIP)
              </h3>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px] font-mono">
                DATASET NO. 17 (HAL 40)
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Evaluasi 5 Unsur Pengendalian Intern PP No. 60/2008 & BPKP
            </p>
          </div>
        </div>

        {/* AGGREGATE SCORE BADGE */}
        <div className="flex items-center gap-3 bg-emerald-50/80 border border-emerald-200 px-3.5 py-1.5 rounded-xl">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Skor Agregat SPIP</span>
            <span className="text-base font-black text-emerald-950 font-mono">
              {SKOR_AGREGAT_SPIP.toFixed(2)} <span className="text-xs font-normal text-emerald-700">/ 5.00</span>
            </span>
          </div>
          <div className="h-7 w-[1px] bg-emerald-200" />
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Level Maturitas</span>
            <span className="text-xs font-black text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-200 inline-block">
              Level 3 (Terdefinisi)
            </span>
          </div>
        </div>
      </div>

      {/* SPIP MATURITY LEVELS SCALE INDICATOR */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between text-[11px] mb-1.5">
          <span className="font-bold text-slate-700">Skala Tingkat Maturitas SPIP (BPKP):</span>
          <span className="font-mono text-emerald-700 font-bold">Target 2026: ≥ 3.20 (Tercapai: 3.42)</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
          <div className="bg-slate-200/70 p-1.5 rounded text-slate-500 font-medium">
            Level 1: Rintisan (&lt; 2.0)
          </div>
          <div className="bg-slate-200/70 p-1.5 rounded text-slate-500 font-medium">
            Level 2: Berkembang (2.0 - 2.9)
          </div>
          <div className="bg-emerald-600 text-white p-1.5 rounded font-bold shadow-xs">
            Level 3: Terdefinisi (3.0 - 3.9) ★
          </div>
          <div className="bg-slate-100 p-1.5 rounded text-slate-400 font-medium border border-dashed border-slate-300">
            Level 4: Terkelola (4.0 - 4.4)
          </div>
          <div className="bg-slate-100 p-1.5 rounded text-slate-400 font-medium border border-dashed border-slate-300">
            Level 5: Optimum (4.5 - 5.0)
          </div>
        </div>
      </div>

      {/* 5 KOMPONEN PENILAIAN SPIP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {SPIP_MATURITAS_ITEMS.map((item) => {
          const isSelected = item.no === selectedItemNo;
          const pct = (item.skor / 5.0) * 100;
          return (
            <button
              key={item.no}
              onClick={() => setSelectedItemNo(item.no)}
              className={`text-left p-3 rounded-xl border transition-all ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/60 shadow-sm ring-1 ring-emerald-500'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-700 line-clamp-1">
                  {item.no}. {item.komponenPenilaian}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-white px-1.5 py-0.2 rounded border border-emerald-200">
                  {item.bobot}%
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <span className="text-lg font-black text-slate-900 font-mono">
                  {item.skor.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-400">Target: {item.targetSkor.toFixed(2)}</span>
              </div>

              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <span className="mt-2 text-[10px] text-emerald-700 font-semibold block flex items-center justify-between">
                <span>{item.levelMaturitas}</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </button>
          );
        })}
      </div>

      {/* SELECTED COMPONENT DRILLDOWN */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800">
            Fokus Penerapan Unsur {selectedItem.no}: {selectedItem.komponenPenilaian}
          </span>
          <span className="font-mono text-emerald-700 font-bold">
            Skor Capaian: {selectedItem.skor.toFixed(2)} (Bobot {selectedItem.bobot}%)
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {selectedItem.fokusArea}
        </p>
      </div>
    </div>
  );
};
