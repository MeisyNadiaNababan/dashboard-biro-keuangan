import React from 'react';
import {
  Sparkles,
  Award,
  TrendingUp,
  FileCheck2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  Shield,
  Droplets,
} from 'lucide-react';
import { DEPUTY_AI_CONTROL_BRIEFS } from './pelayananUmumData';

interface DeputyAiControlCardProps {
  onSelectDeepDiveUnit?: (unitId: string) => void;
  selectedDeepDiveUnit?: string;
}

export const DeputyAiControlCard: React.FC<DeputyAiControlCardProps> = ({
  onSelectDeepDiveUnit,
  selectedDeepDiveUnit,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#0B1E36] via-[#102A4C] to-[#0A2540] text-white rounded-xl shadow-md border border-slate-700/60 p-4 sm:p-5 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-2xs">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white font-mono flex items-center gap-2">
                <span>DEPUTY STRATEGIC CONTROL & ADVISORY</span>
              </h3>
              <p className="text-[11px] text-slate-300">
                Sintesis evaluasi berkala capaian indikator Perkin A6 Deputi Bidang Pelayanan Umum
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 font-bold self-start sm:self-auto">
            PERKIN No. 6/KA/3/2025
          </span>
        </div>

        {/* 3 Strategic Briefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {DEPUTY_AI_CONTROL_BRIEFS.map((brief) => {
            const isRs = brief.unit.includes('Rumah Sakit');
            const isDitpam = brief.unit.includes('Pengamanan');
            const unitKey = isRs
              ? 'bu-rumah-sakit'
              : isDitpam
              ? 'dit-pam-aset'
              : 'bu-spam-fasling';

            return (
              <div
                key={brief.id}
                onClick={() => onSelectDeepDiveUnit && onSelectDeepDiveUnit(unitKey)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  selectedDeepDiveUnit === unitKey
                    ? 'bg-white/10 border-cyan-400 ring-1 ring-cyan-300/50'
                    : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-cyan-500/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-mono text-xs font-black">
                        {brief.id}
                      </div>
                      <span className="text-[11px] font-bold text-cyan-200 uppercase tracking-tight">
                        {brief.unit}
                      </span>
                    </div>
                    {isRs ? (
                      <Stethoscope className="w-4 h-4 text-rose-300" />
                    ) : isDitpam ? (
                      <Shield className="w-4 h-4 text-amber-300" />
                    ) : (
                      <Droplets className="w-4 h-4 text-cyan-300" />
                    )}
                  </div>

                  <p className="text-xs text-slate-200 italic leading-relaxed pt-1">
                    &ldquo;{brief.analisis}&rdquo;
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1 text-[11px]">
                  <p className="text-cyan-200">
                    <strong className="text-white">Rekomendasi:</strong> {brief.rekomendasi}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    <strong className="text-slate-300">Dampak:</strong> {brief.dampakStrategis}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

