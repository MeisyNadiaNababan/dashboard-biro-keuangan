import React from 'react';
import {
  HardHat,
  TrendingUp,
  Coins,
  CheckCircle2,
  HelpCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Layers,
  FileCheck2,
  Flame,
  Zap,
} from 'lucide-react';
import { PERKIN_A7_KPIS, PERKIN_A7_METADATA } from './perkinA7Data';

interface InfrastrukturPerkinA7KpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedQuarter?: string;
}

export const InfrastrukturPerkinA7KpiRow: React.FC<InfrastrukturPerkinA7KpiRowProps> = ({
  onOpenFormulaModal,
  selectedQuarter = 'ALL',
}) => {
  return (
    <div className="space-y-3 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-xs sm:text-sm font-black tracking-wider uppercase text-slate-800">
            2 INDIKATOR KINERJA PROGRAM (IKP) RESMI PERKIN A.7 TAHUN 2025
          </h2>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 border border-sky-200">
            {PERKIN_A7_METADATA.nomorPerkin}
          </span>
        </div>
        <div className="text-[11px] text-slate-500 font-medium">
          Ditetapkan oleh Kepala BP Batam &bull; Periode Evaluasi:{' '}
          <strong className="text-slate-800 font-mono">
            {selectedQuarter === 'ALL' ? 'Akumulatif s.d. Triwulan III' : `Triwulan ${selectedQuarter}`}
          </strong>
        </div>
      </div>

      {/* Grid of 2 Primary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PERKIN_A7_KPIS.map((kpi) => {
          const isKpi1 = kpi.code === 'IKP-1';
          const isMelampaui = kpi.status === 'Melampaui Target';

          return (
            <div
              key={kpi.id}
              onClick={() => onOpenFormulaModal(kpi.id)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between relative group overflow-hidden"
              title="Klik untuk membuka Kamus Rumus & Dasar Regulasi Perkin"
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  isKpi1 ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                }`}
              />

              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                        isKpi1
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {isKpi1 ? <HardHat className="w-5 h-5" /> : <Coins className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10.5px] font-mono font-black px-1.5 py-0.5 rounded bg-slate-900 text-white">
                          {kpi.code}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {kpi.halamanPdf}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Pill & Formula Help */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        isMelampaui
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-sky-50 text-sky-700 border-sky-300'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{kpi.status}</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenFormulaModal(kpi.id);
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                      title="Lihat Detail Rumus Perhitungan"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* KPI Title */}
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                  {kpi.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                  {kpi.deskripsi}
                </p>

                {/* Metrics Highlight Display */}
                <div className="my-4 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10.5px] font-mono uppercase text-slate-500 tracking-wider">
                      Realisasi Kumulatif
                    </div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900">
                        {kpi.realizationLabel}
                      </span>
                    </div>
                  </div>

                  <div className="text-right border-l border-slate-200 pl-4">
                    <div className="text-[10.5px] font-mono uppercase text-slate-500 tracking-wider">
                      Target Perkin A.7
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-mono text-slate-700 mt-0.5">
                      {kpi.programTargetLabel}
                    </div>
                    <div className="text-[10.5px] font-semibold text-emerald-600 flex items-center justify-end gap-1 mt-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>Capaian: {kpi.achievement.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                {/* Triwulan Performance Progress Bar */}
                {kpi.triwulanTrend && (
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center justify-between text-[10.5px] text-slate-500 font-mono">
                      <span>Progres Triwulanan (Q1 - Q4):</span>
                      <span className="font-bold text-slate-800">
                        Q1: {kpi.triwulanTrend.q1}% &bull; Q2: {kpi.triwulanTrend.q2}% &bull; Q3: {kpi.triwulanTrend.q3}% &bull; Q4 (Proj): {kpi.triwulanTrend.q4}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${Math.min(kpi.achievement, 100)}%` }}
                        className={`h-full transition-all duration-500 rounded-full ${
                          isMelampaui ? 'bg-emerald-500' : 'bg-blue-600'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Footer Info */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                <span className="truncate max-w-[280px]">
                  <strong>Pengampu:</strong> {kpi.unitPengampu}
                </span>
                <span className="text-blue-700 font-bold group-hover:underline flex items-center gap-1">
                  Kamus Rumus &bull; Atribut &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
