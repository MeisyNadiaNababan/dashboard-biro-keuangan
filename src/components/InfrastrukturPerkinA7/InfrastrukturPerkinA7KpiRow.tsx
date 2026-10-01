import React from 'react';
import {
  HardHat,
  Coins,
  ShieldCheck,
  Award,
  TrendingUp,
  FileCheck2,
  HelpCircle,
  BarChart3,
  ExternalLink,
  FileCode2,
  Database,
  Tag,
} from 'lucide-react';
import { PERKIN_A7_KPIS, PERKIN_A7_METADATA } from './perkinA7Data';

interface InfrastrukturPerkinA7KpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedKpiId?: string | null;
  selectedQuarter?: string;
}

const KPI_THEMES = {
  1: {
    border: 'border-blue-200 hover:border-blue-400',
    bar: 'from-blue-600 to-cyan-500',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: HardHat,
  },
  2: {
    border: 'border-cyan-200 hover:border-cyan-400',
    bar: 'from-cyan-600 to-teal-500',
    badge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    icon: Coins,
  },
};

export const InfrastrukturPerkinA7KpiRow: React.FC<InfrastrukturPerkinA7KpiRowProps> = ({
  onOpenFormulaModal,
  selectedKpiId,
  selectedQuarter = 'ALL',
}) => {
  return (
    <div className="space-y-3 font-sans">
      {/* Header Bar - Model Tampilan Identik KPI DEP-A1 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            2 Indikator Kinerja Program (IKP) Deputi Bidang Infrastruktur TA 2025
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Mempedomani Perjanjian Kinerja {PERKIN_A7_METADATA.nomorPerkin} • Sasaran: Realisasi Investasi &amp; Kualitas Pelayanan Perizinan
        </span>
      </div>

      {/* 2 Cards Grid - Styled exactly like KPI DEP-A1 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {PERKIN_A7_KPIS.map((kpi) => {
          const theme = KPI_THEMES[kpi.number as keyof typeof KPI_THEMES] || KPI_THEMES[1];
          const isSelected = selectedKpiId === kpi.id;

          return (
            <div
              key={kpi.id}
              className={`bg-white rounded-xl p-4 border transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between ${
                theme.border
              } ${isSelected ? 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/20' : ''} group`}
            >
              <div>
                {/* Top Row: Nomor & Unit / Help Button */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black font-mono bg-slate-100 text-slate-700 border border-slate-200">
                    IKP 0{kpi.number}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${theme.badge}`}
                    >
                      {kpi.satkerShort || kpi.unitPengampu}
                    </span>
                    <button
                      onClick={() => onOpenFormulaModal(kpi.id)}
                      className="p-1 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Lihat Manual & Kamus Rumus IKP"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sasaran Program */}
                <div className="text-[10.5px] text-slate-500 line-clamp-1 mb-1 font-medium">
                  {kpi.sasaranProgram}
                </div>

                {/* Indikator Title */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug min-h-[38px] group-hover:text-blue-700 transition-colors">
                  {kpi.name}
                </h3>

                {/* Target vs Realisasi Grid (Identik dengan format DEP-A1) */}
                <div className="mt-3 grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      Target Perkin
                    </span>
                    <div className="text-sm sm:text-base font-extrabold font-mono text-slate-900">
                      {kpi.programTargetLabel}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 block">
                      Realisasi YTD
                    </span>
                    <div className="text-sm sm:text-base font-extrabold font-mono text-emerald-700">
                      {kpi.realizationLabel}
                    </div>
                  </div>
                </div>

                {/* Capaian Progress Bar */}
                <div className="space-y-1 pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Capaian Kinerja</span>
                    <span className="font-black text-emerald-700">
                      {kpi.achievement.toFixed(1)}% ({kpi.statusKinerja || kpi.status})
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${theme.bar}`}
                      style={{ width: `${Math.min(kpi.achievement, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Attribution: Sumber & Unit Pelaksana (Identik format DEP-A1) */}
              <div className="space-y-1.5 text-[10.5px] text-slate-600 pt-2 border-t border-slate-100 mt-2">
                <div className="flex items-start justify-between gap-1.5">
                  <span className="text-slate-400 font-medium shrink-0">Sumber:</span>
                  <span className="font-mono font-bold text-sky-800 text-[10px] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200 truncate">
                    {kpi.number === 1
                      ? 'Data No. 4 & 6 (Pembangunan), Perencanaan & Ditpam'
                      : 'Data No. 1 & 2 Dit. Pembangunan (Hal. 48 Satu Data)'}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400 font-medium shrink-0">Unit Pelaksana:</span>
                  <span className="font-mono font-bold text-slate-800 text-[10.5px]">
                    {kpi.number === 1
                      ? 'Dit. Pembangunan, Perencanaan & Pengamanan Aset'
                      : 'Dit. Pembangunan Infrastruktur (Subdit ROW Utilitas)'}
                  </span>
                </div>
              </div>

              {/* Footer Button: Formula Modal (Identik DEP-A1) */}
              <button
                onClick={() => onOpenFormulaModal(kpi.id)}
                className="w-full mt-2 py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
