import React from 'react';
import {
  TrendingUp,
  Smile,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  HelpCircle,
  BarChart3,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { EMPAT_IKS_KEPALA_BP, IksPerkinItem } from './kepalaBpData';

interface KepalaBpKpisProps {
  onSelectIks?: (iksId: string) => void;
  onOpenManualModal?: (iksId: string) => void;
}

const IKS_ICONS = {
  'iks-1': TrendingUp,
  'iks-2': Smile,
  'iks-3': DollarSign,
  'iks-4': ShieldCheck,
};

const IKS_ACCENT_COLORS = {
  'iks-1': {
    border: 'border-blue-200 hover:border-blue-400',
    bar: 'from-blue-600 to-cyan-500',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-50 text-blue-600',
  },
  'iks-2': {
    border: 'border-emerald-200 hover:border-emerald-400',
    bar: 'from-emerald-600 to-teal-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-50 text-emerald-600',
  },
  'iks-3': {
    border: 'border-indigo-200 hover:border-indigo-400',
    bar: 'from-indigo-600 to-blue-500',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    iconBg: 'bg-indigo-50 text-indigo-600',
  },
  'iks-4': {
    border: 'border-amber-200 hover:border-amber-400',
    bar: 'from-amber-500 to-orange-500',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    iconBg: 'bg-amber-50 text-amber-700',
  },
};

export const KepalaBpKpis: React.FC<KepalaBpKpisProps> = ({
  onSelectIks,
  onOpenManualModal,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            4 Indikator Kinerja Strategis (IKS) Kepala BP Batam TA 2026
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Mempedomani Lampiran Perjanjian Kinerja No. 1/SPJ/KA/1/2026
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {EMPAT_IKS_KEPALA_BP.map((iks) => {
          const IconComp = IKS_ICONS[iks.id as keyof typeof IKS_ICONS] || BarChart3;
          const colors = IKS_ACCENT_COLORS[iks.id as keyof typeof IKS_ACCENT_COLORS];

          return (
            <div
              key={iks.id}
              className={`bg-white rounded-xl p-4 border transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between ${colors.border} group`}
            >
              <div>
                {/* Top Row: Nomor & Status */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black font-mono bg-slate-100 text-slate-700 border border-slate-200">
                    IKS 0{iks.nomor}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        iks.statusCapaian === 'Tercapai'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-blue-50 text-blue-700 border-blue-300'
                      }`}
                    >
                      {iks.statusCapaian}
                    </span>
                    {onOpenManualModal && (
                      <button
                        onClick={() => onOpenManualModal(iks.id)}
                        className="p-1 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors"
                        title="Lihat Manual &amp; Kamus Rumus IKS"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sasaran Strategis Tag */}
                <div className="text-[10.5px] text-slate-500 line-clamp-1 mb-1 font-medium">
                  {iks.sasaranStrategis}
                </div>

                {/* Indikator Title */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug min-h-[38px] group-hover:text-blue-700 transition-colors">
                  {iks.indikatorKinerjaStrategis}
                </h3>

                {/* Target vs Realisasi Grid */}
                <div className="mt-3 grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      Target Perkin
                    </span>
                    <div className="text-sm sm:text-base font-extrabold font-mono text-slate-900">
                      {iks.target}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 block">
                      Realisasi YTD
                    </span>
                    <div className="text-sm sm:text-base font-extrabold font-mono text-emerald-700">
                      {iks.id === 'iks-1'
                        ? `Rp ${iks.realisasiYtd.toFixed(2)} T`
                        : iks.id === 'iks-2'
                        ? iks.realisasiYtd.toFixed(2)
                        : iks.id === 'iks-3'
                        ? `Rp ${(iks.realisasiYtd / 1000).toFixed(3)} T`
                        : `${iks.realisasiYtd.toFixed(2)}`}
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Percentage */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500 font-medium">Tingkat Capaian:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {iks.persenCapaian.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${colors.bar} transition-all duration-700`}
                      style={{ width: `${Math.min(iks.persenCapaian, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Predikat & Sumber Data Note */}
                <div className="mt-2.5 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-700">Predikat: </span>
                  <span className="font-bold text-emerald-800">{iks.predikat}</span>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 truncate max-w-[150px]">
                  {iks.sumberData.split(',')[0]}
                </span>
                {onSelectIks && (
                  <button
                    onClick={() => onSelectIks(iks.id)}
                    className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    <span>Detail</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
