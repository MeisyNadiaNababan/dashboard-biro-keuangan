import React from 'react';
import {
  Plane,
  Anchor,
  Truck,
  Layers,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  DollarSign,
  Activity,
  Users,
} from 'lucide-react';
import { SATKER_A5_LIST, SatkerPengampuA5 } from './bandaraPelabuhanLlbData';

interface BandaraPelabuhanLlbUnitCardsProps {
  onAnalyzeUnit: (unitId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const BandaraPelabuhanLlbUnitCards: React.FC<
  BandaraPelabuhanLlbUnitCardsProps
> = ({ onAnalyzeUnit, onNavigateToUnit }) => {
  return (
    <div className="space-y-3 font-sans">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#002B49] text-white flex items-center justify-center shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
              <span>3 UNIT KERJA PENGAMPU PERKIN A.5</span>
              <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                46 DATASET BUKU SATU DATA BP BATAM
              </span>
            </h2>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 font-sans">
          <span>Pengampu 3 Kegiatan Program Perkin A.5 • Klik &ldquo;Buka Deep-Dive Satker&rdquo; untuk analisis detail</span>
        </div>
      </div>

      {/* Grid 3 Satker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {SATKER_A5_LIST.map((unit) => {
          const isPelabuhan = unit.id === 'dit-pelabuhan';
          const isBandara = unit.id === 'dit-bandara';

          const icon = isBandara ? (
            <Plane className="w-5 h-5 text-emerald-600" />
          ) : isPelabuhan ? (
            <Anchor className="w-5 h-5 text-blue-600" />
          ) : (
            <Truck className="w-5 h-5 text-amber-600" />
          );

          const borderAccent = isBandara
            ? 'border-emerald-200 hover:border-emerald-400'
            : isPelabuhan
            ? 'border-blue-200 hover:border-blue-400'
            : 'border-amber-200 hover:border-amber-400';

          const bgBadge = isBandara
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : isPelabuhan
            ? 'bg-blue-50 text-blue-800 border-blue-200'
            : 'bg-amber-50 text-amber-800 border-amber-200';

          return (
            <div
              key={unit.id}
              className={`bg-white rounded-2xl border ${borderAccent} p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3.5`}
            >
              {/* Header Card */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      {icon}
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${bgBadge}`}>
                        {unit.datasetCount} DATASET RESMI
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                        {unit.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 font-mono">
                  {unit.pdfPages} &bull; {unit.headOfUnit}
                </p>
              </div>

              {/* 3 Metric Pills: PNBP, Belanja, & IKM */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Realisasi PNBP</div>
                  <div className="text-xs font-black font-mono text-slate-900 mt-0.5">
                    Rp {(unit.realisasiPnbp / 1e9).toFixed(1)} M
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 font-mono">
                    {unit.capaianPnbpPersen.toFixed(1)}%
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Serapan Pagu</div>
                  <div className="text-xs font-black font-mono text-slate-900 mt-0.5">
                    Rp {(unit.realisasiBelanja / 1e9).toFixed(1)} M
                  </div>
                  <div className="text-[10px] font-bold text-blue-600 font-mono">
                    {unit.serapanPersen.toFixed(0)}% Pagu
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Skor IKM</div>
                  <div className="text-xs font-black font-mono text-amber-600 mt-0.5">
                    {unit.ikmScore}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-700 font-mono truncate">
                    {unit.ikmPredikat.split(' ')[0]}
                  </div>
                </div>
              </div>

              {/* Operational Highlights Matrix */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  Sorotan Operasional Utama:
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {unit.operationalHighlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-1.5 rounded-lg bg-slate-50/80 border border-slate-100 text-[11px]"
                    >
                      <div className="text-slate-400 text-[9.5px] truncate font-mono">{hl.label}</div>
                      <div className="font-bold text-slate-900 font-mono truncate">{hl.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Insight */}
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] text-slate-600 italic leading-relaxed">
                &ldquo;{unit.strategicInsights}&rdquo;
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onAnalyzeUnit(unit.id)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Buka Deep-Dive Satker</span>
                </button>

                {onNavigateToUnit && (
                  <button
                    onClick={() => {
                      const targetId =
                        unit.id === 'dit-bandara'
                          ? 'pengelolaan-bandara'
                          : unit.id === 'dit-pelabuhan'
                          ? 'kepelabuhanan'
                          : 'lalu-lintas-barang';
                      onNavigateToUnit(targetId);
                    }}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-xs"
                    title="Navigasi ke Dashboard Penuh Unit"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
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
