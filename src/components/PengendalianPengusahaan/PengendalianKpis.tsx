import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Percent,
  FileSpreadsheet,
  AlertTriangle,
  ArrowUpRight,
  Calculator,
  Building2,
  Briefcase,
} from 'lucide-react';
import { KpiPengendalianDataset } from './types';

interface PengendalianKpisProps {
  datasets: KpiPengendalianDataset[];
  onOpenFormulaModal: (datasetNo: number) => void;
}

export const PengendalianKpis: React.FC<PengendalianKpisProps> = ({
  datasets,
  onOpenFormulaModal,
}) => {
  // Find specific datasets requested by user
  const dataset3 = datasets.find((d) => d.nomorDataset === 3);
  const dataset4 = datasets.find((d) => d.nomorDataset === 4);
  const dataset1 = datasets.find((d) => d.nomorDataset === 1);
  const dataset2 = datasets.find((d) => d.nomorDataset === 2);

  return (
    <div className="space-y-4 mb-6">
      {/* Top Banner: 2 Primary User Requested KPIs (Dataset #3 & #4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* KPI 1: DATASET NO 3 */}
        {dataset3 && (
          <div className="bg-gradient-to-br from-[#0B1E38] via-[#102A4E] to-[#163B6E] rounded-2xl p-5 text-white border border-sky-500/30 shadow-lg relative overflow-hidden group">
            {/* Background glowing aesthetic */}
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 px-3 py-1 bg-sky-500/20 border-b border-l border-sky-400/30 rounded-bl-xl font-mono text-[10px] text-sky-300 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DATASET SATU DATA NO. 3</span>
            </div>

            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sky-300/90 block">
                    Indikator Kinerja Utama (IKU 1)
                  </span>
                  <h3 className="text-sm font-extrabold text-white leading-tight">
                    {dataset3.namaDataset}
                  </h3>
                </div>
              </div>
            </div>

            {/* Percentage Display */}
            <div className="flex items-baseline gap-3 my-3">
              <span className="text-4xl font-extrabold tracking-tight text-white font-mono">
                {dataset3.capaian.toFixed(1)}%
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {dataset3.trend}
                </span>
                <span className="text-[11px] text-slate-300">
                  Target Standar: <strong className="text-white">{dataset3.target}%</strong>
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 my-3">
              <div className="flex justify-between text-[11px] text-slate-300 font-medium">
                <span>Rasio Capaian Pengendalian Rencana Tahunan</span>
                <span className="text-sky-300 font-mono font-bold">
                  {((dataset3.capaian / dataset3.target) * 100).toFixed(0)}% Efektivitas
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, dataset3.capaian)}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-300/90 line-clamp-2 mb-3 leading-relaxed">
              {dataset3.deskripsi}
            </p>

            <div className="pt-2 border-t border-sky-500/20 flex items-center justify-between">
              <span className="text-[10px] text-sky-300/80 truncate max-w-[220px]">
                Sumber: {dataset3.sumberData}
              </span>
              <button
                onClick={() => onOpenFormulaModal(3)}
                className="flex items-center gap-1 text-xs text-sky-200 hover:text-white bg-sky-900/60 hover:bg-sky-800/80 border border-sky-400/40 px-2.5 py-1 rounded-lg cursor-pointer transition-colors font-medium shadow-xs"
              >
                <Calculator className="w-3 h-3 text-sky-400" />
                <span>Lihat Rumus &amp; Atribut</span>
              </button>
            </div>
          </div>
        )}

        {/* KPI 2: DATASET NO 4 */}
        {dataset4 && (
          <div className="bg-gradient-to-br from-[#0B2338] via-[#10334E] to-[#15466A] rounded-2xl p-5 text-white border border-teal-500/30 shadow-lg relative overflow-hidden group">
            {/* Background glowing aesthetic */}
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 px-3 py-1 bg-teal-500/20 border-b border-l border-teal-400/30 rounded-bl-xl font-mono text-[10px] text-teal-300 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DATASET SATU DATA NO. 4</span>
            </div>

            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300/90 block">
                    Indikator Kinerja Utama (IKU 2)
                  </span>
                  <h3 className="text-sm font-extrabold text-white leading-tight">
                    {dataset4.namaDataset}
                  </h3>
                </div>
              </div>
            </div>

            {/* Percentage Display */}
            <div className="flex items-baseline gap-3 my-3">
              <span className="text-4xl font-extrabold tracking-tight text-white font-mono">
                {dataset4.capaian.toFixed(1)}%
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {dataset4.trend}
                </span>
                <span className="text-[11px] text-slate-300">
                  Target Standar: <strong className="text-white">{dataset4.target}%</strong>
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 my-3">
              <div className="flex justify-between text-[11px] text-slate-300 font-medium">
                <span>Rekomendasi Selesai Diadendum &amp; Diperbaiki</span>
                <span className="text-teal-300 font-mono font-bold">
                  {((dataset4.capaian / dataset4.target) * 100).toFixed(0)}% Efektivitas
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, dataset4.capaian)}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-300/90 line-clamp-2 mb-3 leading-relaxed">
              {dataset4.deskripsi}
            </p>

            <div className="pt-2 border-t border-teal-500/20 flex items-center justify-between">
              <span className="text-[10px] text-teal-300/80 truncate max-w-[220px]">
                Sumber: {dataset4.sumberData}
              </span>
              <button
                onClick={() => onOpenFormulaModal(4)}
                className="flex items-center gap-1 text-xs text-teal-200 hover:text-white bg-teal-900/60 hover:bg-teal-800/80 border border-teal-400/40 px-2.5 py-1 rounded-lg cursor-pointer transition-colors font-medium shadow-xs"
              >
                <Calculator className="w-3 h-3 text-teal-400" />
                <span>Lihat Rumus &amp; Atribut</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Secondary Supporting Metrics (Dataset #1 & Dataset #2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Dataset #1: Rekomendasi Evaluasi dan Pengendalian Kerjasama Pengusahaan BU */}
        {dataset1 && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                DATASET NO. 1 (HALAMAN 14)
              </span>
              <button
                onClick={() => onOpenFormulaModal(1)}
                className="text-[11px] text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
              >
                Rumus &amp; Kamus
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-700">{dataset1.namaDataset}</h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {dataset1.capaian}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {dataset1.satuan}
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold">
                    (44 Selesai / 91,8%)
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl border border-emerald-300 flex flex-col items-center justify-center font-bold text-xs text-emerald-700 bg-emerald-50 font-mono">
                <span className="text-xs">44/48</span>
                <span className="text-[8px] uppercase font-bold text-emerald-600">Selesai</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">{dataset1.deskripsi}</p>
          </div>
        )}

        {/* Dataset #2: Laporan Pengawasan Pengendalian Pengusahaan */}
        {dataset2 && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                DATASET NO. 2 (HALAMAN 14)
              </span>
              <button
                onClick={() => onOpenFormulaModal(2)}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
              >
                Rumus &amp; Kamus
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-700">{dataset2.namaDataset}</h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {dataset2.capaian}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {dataset2.satuan}
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold">
                    100% Disahkan
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl border border-indigo-300 flex flex-col items-center justify-center font-bold text-xs text-indigo-700 bg-indigo-50 font-mono">
                <span className="text-xs">12/12</span>
                <span className="text-[8px] uppercase font-bold text-indigo-600">Bulan</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">{dataset2.deskripsi}</p>
          </div>
        )}
      </div>
    </div>
  );
};
