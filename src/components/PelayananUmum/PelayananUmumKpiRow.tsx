import React from 'react';
import {
  Stethoscope,
  Droplets,
  DollarSign,
  TrendingUp,
  Percent,
  Calculator,
  Activity,
  CheckCircle2,
  ArrowUpRight,
  HelpCircle,
  Layers,
  Award,
  Users,
} from 'lucide-react';
import { PERKIN_A6_KPIS } from './pelayananUmumData';

interface PelayananUmumKpiRowProps {
  onOpenFormulaModal: (kpiId?: string) => void;
  selectedUnit?: string;
}

export const PelayananUmumKpiRow: React.FC<PelayananUmumKpiRowProps> = ({
  onOpenFormulaModal,
}) => {
  const ikp1 = PERKIN_A6_KPIS[0]; // Peningkatan Kinerja BU
  const ikp2 = PERKIN_A6_KPIS[1]; // Rasio PNBP BU
  const ikp3 = PERKIN_A6_KPIS[2]; // Rata-rata IKM Layanan BU

  return (
    <div className="space-y-3 font-sans">
      {/* 3 CONSOLIDATED KPI CARDS (PERSIS MODEL DEP-A3) */}
      <div className="grid gap-3.5 grid-cols-1 lg:grid-cols-3">
        {/* ========================================================================= */}
        {/* CARD 1: IKP #1 - PERSENTASE PENINGKATAN KINERJA BADAN USAHA               */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between relative overflow-hidden">
          <div>
            {/* Top Badge & Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 uppercase">
                    IKP #1 • PERKIN A6.01
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug">
                    Peningkatan Kinerja Badan Usaha
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikp1.persenCapaian.toFixed(1)}%
                </span>
                {onOpenFormulaModal && (
                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal('ikp-1')}
                    className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Formula & Manual Teknis IKP 1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Primary IKP Card Block */}
            <div className="bg-gradient-to-br from-blue-50/70 to-slate-50/90 rounded-lg p-3 border border-blue-100/80 my-3">
              <div className="text-[10.5px] font-bold text-blue-950 flex items-center justify-between">
                <span>IKP #1: Persentase Peningkatan Kinerja BU</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                  MELAMPAUI TARGET
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                    {ikp1.realisasiDisplay}
                  </span>
                  <span className="text-xs font-bold text-blue-700">Pertumbuhan</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                  <span className="font-bold font-mono text-slate-700">{ikp1.targetDisplay}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                  style={{ width: `${Math.min(100, ikp1.persenCapaian)}%` }}
                />
              </div>
            </div>

            {/* Essential Metrics: Ringkasan Kinerja Keseluruhan (Format DEP-A3) */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                Ringkasan Kinerja Keseluruhan:
              </div>

              {/* Metric 1: RSBP */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <Stethoscope className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">BU Rumah Sakit (RSBP)</div>
                    <div className="text-[10px] text-slate-500">Realisasi Rp 121,8M vs Rp 116,5M</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black font-mono text-rose-700">+4,55%</div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    413,6% Target
                  </span>
                </div>
              </div>

              {/* Metric 2: SPAM Fasling */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">BU SPAM, Fasilitas &amp; Lingkungan</div>
                    <div className="text-[10px] text-slate-500">Realisasi Rp 142,5M vs Rp 139,2M</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black font-mono text-cyan-700">+2,37%</div>
                  <span className="text-[10px] font-mono text-cyan-700 font-bold bg-cyan-50 px-1 py-0.2 rounded border border-cyan-200">
                    215,5% Target
                  </span>
                </div>
              </div>

              {/* Metric 3: Konsolidasi Pertumbuhan BU */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Pertumbuhan Gabungan BU</div>
                    <div className="text-[10px] text-slate-500">Total Pendapatan BU: Rp 264,3 M</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black font-mono text-indigo-700">+1,24%</div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                    Melampaui Target
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Status: Melampaui Target (1,1%)
            </span>
            {onOpenFormulaModal && (
              <button
                type="button"
                onClick={() => onOpenFormulaModal('ikp-1')}
                className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
              >
                <span>Manual Naskah</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: IKP #2 - RASIO PNBP BU TERHADAP PNBP BP BATAM                     */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between relative overflow-hidden">
          <div>
            {/* Top Badge & Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                    IKP #2 • PERKIN A6.02
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug">
                    Rasio PNBP BU thd BP Batam
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikp2.persenCapaian.toFixed(1)}%
                </span>
                {onOpenFormulaModal && (
                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal('ikp-2')}
                    className="p-1 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                    title="Formula & Manual Teknis IKP 2"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Primary IKP Card Block */}
            <div className="bg-gradient-to-br from-emerald-50/70 to-slate-50/90 rounded-lg p-3 border border-emerald-100/80 my-3">
              <div className="text-[10.5px] font-bold text-emerald-950 flex items-center justify-between">
                <span>IKP #2: Rasio PNBP BU thd Target BP Batam</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                  TARGET TERCAPAI
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                    {ikp2.realisasiDisplay}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">Rasio Finansial</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                  <span className="font-bold font-mono text-slate-700">{ikp2.targetDisplay}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600"
                  style={{ width: `${Math.min(100, ikp2.persenCapaian)}%` }}
                />
              </div>
            </div>

            {/* Essential Metrics: Ringkasan Kinerja Keseluruhan (Format DEP-A3) */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                Ringkasan Kinerja Keseluruhan:
              </div>

              {/* Metric 1: PNBP RSBP */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Realisasi PNBP BU RSBP</div>
                    <div className="text-[10px] text-slate-500">Rasio 0,33 thd Target BP Batam</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black font-mono text-rose-700">Rp 121,8 M</div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    105,9% Pagu
                  </span>
                </div>
              </div>

              {/* Metric 2: PNBP BU SPAM Fasling */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Realisasi PNBP BU SPAM</div>
                    <div className="text-[10px] text-slate-500">Rasio 0,38 thd Target BP Batam</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black font-mono text-cyan-700">Rp 142,5 M</div>
                  <span className="text-[10px] font-mono text-cyan-700 font-bold bg-cyan-50 px-1 py-0.2 rounded border border-cyan-200">
                    109,6% Pagu
                  </span>
                </div>
              </div>

              {/* Metric 3: Total Kontribusi PNBP 2 BU */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Total PNBP 2 Badan Usaha</div>
                    <div className="text-[10px] text-slate-500">Surplus Fiskal BLU: +Rp 31,7 M</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black font-mono text-emerald-700">Rp 264,3 M</div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                    Rasio 0,71
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Status: Tercapai (Target 0,68)
            </span>
            {onOpenFormulaModal && (
              <button
                type="button"
                onClick={() => onOpenFormulaModal('ikp-2')}
                className="font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-0.5 cursor-pointer"
              >
                <span>Manual Naskah</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: IKP #3 - RATA-RATA IKM PENGGUNA LAYANAN BADAN USAHA                */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between relative overflow-hidden">
          <div>
            {/* Top Badge & Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 uppercase">
                    IKP #3 • PERKIN A6.03
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug">
                    Rata-rata IKM Badan Usaha
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikp3.persenCapaian.toFixed(1)}%
                </span>
                {onOpenFormulaModal && (
                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal('ikp-3')}
                    className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                    title="Formula & Manual Teknis IKP 3"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Primary IKP Card Block */}
            <div className="bg-gradient-to-br from-indigo-50/70 to-slate-50/90 rounded-lg p-3 border border-indigo-100/80 my-3">
              <div className="text-[10.5px] font-bold text-indigo-950 flex items-center justify-between">
                <span>IKP #3: Rata-rata IKM Pengguna Layanan BU</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                  MUTU A (SANGAT BAIK)
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                    {ikp3.realisasiDisplay}
                  </span>
                  <span className="text-xs font-bold text-indigo-700">/ 100</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                  <span className="font-bold font-mono text-slate-700">{ikp3.targetDisplay}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                  style={{ width: `${Math.min(100, ikp3.persenCapaian)}%` }}
                />
              </div>
            </div>

            {/* Essential Metrics: Ringkasan Kinerja Keseluruhan (Format DEP-A3) */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                Ringkasan Kinerja Keseluruhan:
              </div>

              {/* Metric 1: IKM RSBP */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">IKM BU Rumah Sakit</div>
                    <div className="text-[10px] text-slate-500">Mutu A (Sangat Baik) • KARS Paripurna</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black font-mono text-rose-700">88,92</div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    100,7% Target
                  </span>
                </div>
              </div>

              {/* Metric 2: IKM SPAM Fasling */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">IKM BU SPAM, Fasling</div>
                    <div className="text-[10px] text-slate-500">Mutu A (Sangat Baik) • Layanan Air &amp; Rusun</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black font-mono text-cyan-700">88,40</div>
                  <span className="text-[10px] font-mono text-cyan-700 font-bold bg-cyan-50 px-1 py-0.2 rounded border border-cyan-200">
                    100,1% Target
                  </span>
                </div>
              </div>

              {/* Metric 3: Standar Pelayanan PermenPAN-RB */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">9 Unsur Layanan Terstandar</div>
                    <div className="text-[10px] text-slate-500">PermenPAN-RB No. 14 Tahun 2017</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black font-mono text-purple-700">88,66</div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                    Mutu A Prima
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Status: Mutu A (Target 88,31)
            </span>
            {onOpenFormulaModal && (
              <button
                type="button"
                onClick={() => onOpenFormulaModal('ikp-3')}
                className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 cursor-pointer"
              >
                <span>Manual Naskah</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
