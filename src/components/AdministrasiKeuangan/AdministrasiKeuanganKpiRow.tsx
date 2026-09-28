import React from 'react';
import {
  ShieldCheck,
  Award,
  TrendingUp,
  FileCheck2,
  HelpCircle,
  BarChart3,
  ExternalLink,
} from 'lucide-react';
import { PERKIN_A1_KPIS } from './administrasiKeuanganData';

interface AdministrasiKeuanganKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedKpiId?: string | null;
}

const KPI_THEMES = {
  1: {
    border: 'border-blue-200 hover:border-blue-400',
    bar: 'from-blue-600 to-cyan-500',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: ShieldCheck,
  },
  2: {
    border: 'border-indigo-200 hover:border-indigo-400',
    bar: 'from-indigo-600 to-blue-500',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: Award,
  },
  3: {
    border: 'border-cyan-200 hover:border-cyan-400',
    bar: 'from-cyan-600 to-teal-500',
    badge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    icon: TrendingUp,
  },
  4: {
    border: 'border-emerald-200 hover:border-emerald-400',
    bar: 'from-emerald-600 to-teal-500',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: FileCheck2,
  },
};

export const AdministrasiKeuanganKpiRow: React.FC<AdministrasiKeuanganKpiRowProps> = ({
  onOpenFormulaModal,
  selectedKpiId,
}) => {
  return (
    <div className="space-y-3">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            4 Indikator Kinerja Program (IKP) Deputi Administrasi dan Keuangan TA 2025
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Mempedomani Perjanjian Kinerja No. 4/KA/3/2025 • Sasaran: Meningkatkan Kualitas Pengelolaan Internal BP Batam
        </span>
      </div>

      {/* 4 Cards Grid - Styled exactly like Kepala BP Batam KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {PERKIN_A1_KPIS.map((kpi) => {
          const theme = KPI_THEMES[kpi.no as keyof typeof KPI_THEMES] || KPI_THEMES[1];
          const isSelected = selectedKpiId === kpi.id;

          const satkerShort =
            kpi.no === 1
              ? 'Biro OKMR'
              : kpi.no === 2
              ? 'Biro SDM'
              : kpi.no === 3
              ? 'Biro OKMR / SPIP'
              : 'Biro Keuangan';

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
                    IKP 0{kpi.no}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${theme.badge}`}
                    >
                      {satkerShort}
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
                  {kpi.namaIndikator}
                </h3>

                {/* Target vs Realisasi Grid (Identik dengan format Kepala BP Batam) */}
                <div className="mt-3 grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      Target Perkin
                    </span>
                    <div className="text-sm sm:text-base font-extrabold font-mono text-slate-900">
                      {kpi.target2025}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 block">
                      Realisasi YTD
                    </span>
                    <div className="text-sm sm:text-base font-extrabold font-mono text-emerald-700">
                      {kpi.realisasi2025}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer info: Satuan & Tombol Detail Acuan */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500 font-sans">
                <span className="font-mono text-[10px] text-slate-400">
                  {kpi.satuan} • {kpi.periodePelaporan}
                </span>
                <button
                  onClick={() => onOpenFormulaModal(kpi.id)}
                  className="font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer flex items-center gap-0.5 text-[10.5px]"
                >
                  <span>Manual Acuan</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
