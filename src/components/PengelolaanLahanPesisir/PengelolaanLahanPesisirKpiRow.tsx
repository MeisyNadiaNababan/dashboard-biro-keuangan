import React from 'react';
import {
  MapPin,
  Anchor,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  HelpCircle,
  ArrowUpRight,
  Maximize2,
  FileSpreadsheet,
} from 'lucide-react';
import { PERKIN_A3_KPIS, KpiPerkinA3Item } from './pengelolaanLahanPesisirData';

interface PengelolaanLahanPesisirKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedKpiId?: string | null;
}

export const PengelolaanLahanPesisirKpiRow: React.FC<
  PengelolaanLahanPesisirKpiRowProps
> = ({ onOpenFormulaModal, selectedKpiId }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'ikp-1-lahan-investasi':
        return <MapPin className="w-5 h-5 text-blue-600" />;
      case 'ikp-2-pesisir-reklamasi':
        return <Anchor className="w-5 h-5 text-cyan-600" />;
      case 'ikp-3-pengawasan-pengendalian':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      default:
        return <MapPin className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAccentGradient = (id: string) => {
    switch (id) {
      case 'ikp-1-lahan-investasi':
        return 'from-blue-600 to-indigo-600';
      case 'ikp-2-pesisir-reklamasi':
        return 'from-cyan-600 to-teal-600';
      case 'ikp-3-pengawasan-pengendalian':
        return 'from-emerald-600 to-green-600';
      default:
        return 'from-blue-600 to-indigo-600';
    }
  };

  return (
    <div className="space-y-3">
      {/* Header Section 1 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-5 rounded-full bg-blue-600" />
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>3 INDIKATOR KINERJA PROGRAM (IKP UTAMA)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
              PERKIN A3 NOMOR 1/KA/3/2025
            </span>
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Pengukuran Kumulatif: <span className="font-bold text-slate-700">Maret s.d Desember 2025 (Take Last Known)</span>
        </div>
      </div>

      {/* 3 KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {PERKIN_A3_KPIS.map((kpi) => {
          const isSelected = selectedKpiId === kpi.id;
          const progressPercent = Math.min(100, (kpi.realisasi / kpi.target2025) * 100);

          return (
            <div
              key={kpi.id}
              className={`bg-white rounded-xl border transition-all duration-200 p-4 relative overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              {/* Top Card Badge & Action */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      {getIcon(kpi.id)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          IKP #{kpi.no}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {kpi.capaianPersen.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenFormulaModal(kpi.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Lihat Rincian Formula & Naskah Regulasi"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>

                {/* KPI Title */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 min-h-[2.5rem]">
                  {kpi.nama}
                </h3>

                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {kpi.penjelasanOperasional}
                </p>

                {/* Main Metric Value */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Realisasi Berjalan
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                        {kpi.realisasi}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {kpi.satuan}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Target Perkin 2025
                    </span>
                    <div className="text-base font-bold font-mono text-slate-700">
                      {kpi.target2025} {kpi.satuan}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="text-slate-500 font-medium">Ketercapaian Target:</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {kpi.capaianPersen.toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden relative">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getAccentGradient(kpi.id)} transition-all duration-500`}
                      style={{ width: `${Math.min(100, kpi.capaianPersen)}%` }}
                    />
                  </div>
                </div>
                {/* Trend Note / Satker Info */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-medium text-slate-600 truncate max-w-[210px]">
                    {kpi.highlightTrend}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                    Akumulasi Tahunan
                  </span>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                <div className="flex items-center gap-1 text-slate-500 truncate max-w-[210px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="truncate">{kpi.satkerTerkait}</span>
                </div>

                <button
                  onClick={() => onOpenFormulaModal(kpi.id)}
                  className="font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Manual</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
