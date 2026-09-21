import React, { useState } from 'react';
import { Activity, Award, CheckCircle2, ChevronRight, BarChart2, ShieldCheck, FileText, Info } from 'lucide-react';
import { SAKIP_COMPONENTS_DATA, TOTAL_BOBOT_SAKIP, TOTAL_NILAI_SAKIP, PREDIKAT_SAKIP } from './bokmrData';
import { SakipComponent } from './types';

export const SakipEvaluationView: React.FC = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>('perencanaan_kinerja');

  const selectedComponent = SAKIP_COMPONENTS_DATA.find((c) => c.id === selectedCompId) || SAKIP_COMPONENTS_DATA[0];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Nilai Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP)
              </h3>
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold text-[10px] font-mono">
                DATASET NO. 2 (HAL 38)
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Evaluasi Akuntabilitas & Kinerja BP Batam Berdasarkan Peraturan MenPAN-RB No. 88/2021
            </p>
          </div>
        </div>

        {/* OVERALL SCORE BADGE */}
        <div className="flex items-center gap-3 bg-indigo-50/80 border border-indigo-200 px-3.5 py-1.5 rounded-xl">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-indigo-600 block">Total Nilai SAKIP</span>
            <span className="text-base font-black text-indigo-950 font-mono">
              {TOTAL_NILAI_SAKIP.toFixed(2)} <span className="text-xs font-normal text-indigo-700">/ 100</span>
            </span>
          </div>
          <div className="h-7 w-[1px] bg-indigo-200" />
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-indigo-600 block">Tingkat Akuntabilitas</span>
            <span className="text-xs font-black text-indigo-900 bg-white px-2 py-0.5 rounded border border-indigo-200 inline-block">
              {PREDIKAT_SAKIP}
            </span>
          </div>
        </div>
      </div>

      {/* 4 KOMPONEN YANG DINILAI: VISUAL CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SAKIP_COMPONENTS_DATA.map((comp) => {
          const isSelected = comp.id === selectedCompId;
          return (
            <button
              key={comp.id}
              onClick={() => setSelectedCompId(comp.id)}
              className={`text-left p-3.5 rounded-xl border transition-all relative ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-500'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 line-clamp-1">
                  {comp.komponen}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-indigo-800 border border-indigo-200">
                  {comp.tingkatAkuntabilitas}
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <div>
                  <span className="text-lg font-black text-slate-900 font-mono">
                    {comp.nilai.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium ml-1">
                    / {comp.bobot.toFixed(0)}
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-700">
                  {comp.capaianPersen.toFixed(1)}%
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${comp.capaianPersen}%` }}
                />
              </div>

              <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
                <span>Bobot: {comp.bobot}%</span>
                <span className="text-indigo-600 font-semibold flex items-center">
                  Detail <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* DRILLDOWN DETAIL FOR SELECTED COMPONENT */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-900">
              Rincian Sub-Komponen: {selectedComponent.komponen} (Bobot {selectedComponent.bobot} Poin)
            </span>
          </div>
          <span className="text-xs font-semibold text-indigo-700">
            Realisasi Nilai: <strong className="font-mono">{selectedComponent.nilai.toFixed(2)}</strong> ({selectedComponent.capaianPersen.toFixed(1)}%)
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {selectedComponent.keterangan}
        </p>

        {/* SUB-KOMPONEN BARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {selectedComponent.subKomponen.map((sub, idx) => {
            const pct = (sub.nilai / sub.bobot) * 100;
            return (
              <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800 line-clamp-1" title={sub.nama}>
                    {sub.nama}
                  </span>
                  <span className="font-bold text-indigo-700 font-mono ml-2 shrink-0">
                    {sub.nilai.toFixed(2)} / {sub.bobot.toFixed(1)}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                  <span>Bobot: {sub.bobot} Poin</span>
                  <span className="font-bold text-emerald-700">{pct.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
