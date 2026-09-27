import React, { useState } from 'react';
import {
  X,
  FileCode2,
  BookOpen,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Database,
  ExternalLink,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';
import { PERKIN_A4_KPIS, PerkinA4Kpi } from './investasiPengusahaanData';

interface InvestasiPengusahaanFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedKpiId?: string | null;
}

export const InvestasiPengusahaanFormulaModal: React.FC<
  InvestasiPengusahaanFormulaModalProps
> = ({ isOpen, onClose, selectedKpiId = 'ikp-1-investasi-kpbpb' }) => {
  const [activeKpiId, setActiveKpiId] = useState<string>(
    selectedKpiId || 'ikp-1-investasi-kpbpb'
  );

  if (!isOpen) return null;

  const currentKpi =
    PERKIN_A4_KPIS.find((k) => k.id === activeKpiId) || PERKIN_A4_KPIS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-[#002B49] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 text-cyan-300 flex items-center justify-center">
              <FileCode2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 uppercase">
                  MANUAL &amp; DEFINISI OPERASIONAL
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  Perkin A.4 Tahun 2025
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                Kamus Rumus 4 Indikator Kinerja Program (IKP)
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Tabs Selector */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto no-scrollbar shrink-0">
          {PERKIN_A4_KPIS.map((kpi) => (
            <button
              key={kpi.id}
              onClick={() => setActiveKpiId(kpi.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeKpiId === kpi.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <span>{kpi.code}:</span>
              <span>{kpi.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* Main Title & Responsible Unit */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[11px] font-bold">
                {currentKpi.code}
              </span>
              <span className="text-slate-600 font-mono text-[11px]">
                Unit Pengampu: <strong className="text-slate-900">{currentKpi.pjSatker} ({currentKpi.pjSatkerCode})</strong>
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{currentKpi.name}</h4>
            <p className="text-slate-600 leading-relaxed">{currentKpi.deskripsi}</p>
          </div>

          {/* Formula Card */}
          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold font-mono text-[11px]">
              <Calculator className="w-4 h-4 text-blue-700" />
              <span>FORMULA / RUMUS PERHITUNGAN RESMI:</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-200 font-mono text-slate-900 text-xs sm:text-sm font-bold shadow-2xs">
              {currentKpi.formula}
            </div>
          </div>

          {/* Target, Realization, and Achievement Matrix */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-mono">TARGET PERKIN</div>
              <div className="text-base sm:text-lg font-black font-mono text-slate-900 mt-1">
                {currentKpi.targetDisplay}
              </div>
              <div className="text-[10px] text-slate-400">Satuan: {currentKpi.unit}</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-mono">REALISASI 2025</div>
              <div className="text-base sm:text-lg font-black font-mono text-slate-900 mt-1">
                {currentKpi.realisasiDisplay}
              </div>
              <div className="text-[10px] text-emerald-700 font-bold">{currentKpi.yoyGrowth}</div>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
              <div className="text-[10px] text-emerald-800 font-mono font-bold">CAPAIAN KINERJA</div>
              <div className="text-base sm:text-lg font-black font-mono text-emerald-800 mt-1">
                {currentKpi.achievement.toFixed(2)}%
              </div>
              <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                Melampaui Target
              </div>
            </div>
          </div>

          {/* Sumber Data & Dasar Regulasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 font-mono text-[11px]">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>SUMBER DATA RESMI</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {currentKpi.sumberData}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 font-mono text-[11px]">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>KEGIATAN ANGGARAN PENGAMPU</span>
              </div>
              <p className="text-slate-800 font-bold text-[11px]">
                {currentKpi.kegiatanAnggaranPengampu}
              </p>
              <p className="text-slate-500 text-[10px] font-mono">
                {currentKpi.alokasiAnggaran}
              </p>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 font-mono text-[11px] uppercase tracking-wider">
              Sorotan Analisis &amp; Poin Eksekutif:
            </div>
            <ul className="space-y-1.5">
              {currentKpi.keyHighlights.map((hl, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2 text-slate-700 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-500 font-mono text-[11px]">
            Dokumen: Perjanjian Kinerja No. 04/SPJ/KA/4/2025
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors cursor-pointer"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
