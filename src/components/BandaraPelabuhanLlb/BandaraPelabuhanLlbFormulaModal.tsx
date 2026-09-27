import React, { useState } from 'react';
import {
  X,
  FileCode2,
  BookOpen,
  Award,
  CheckCircle2,
  Database,
  Building2,
  Scale,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Plane,
  Anchor,
  Truck,
  Users,
} from 'lucide-react';
import { PERKIN_A5_KPIS, PERKIN_A5_METADATA } from './bandaraPelabuhanLlbData';

interface BandaraPelabuhanLlbFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedKpiId?: string | null;
}

export const BandaraPelabuhanLlbFormulaModal: React.FC<
  BandaraPelabuhanLlbFormulaModalProps
> = ({ isOpen, onClose, selectedKpiId = 'ikp-1-ikm-gabungan' }) => {
  const [activeKpiId, setActiveKpiId] = useState<string>(
    selectedKpiId || 'ikp-1-ikm-gabungan'
  );

  if (!isOpen) return null;

  const currentKpi =
    PERKIN_A5_KPIS.find((k) => k.id === activeKpiId) || PERKIN_A5_KPIS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs font-sans animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white border border-slate-300 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden rounded-2xl">
        {/* Top Header */}
        <div className="bg-[#002B49] text-white px-5 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-300 shadow-xs">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-400/20 text-cyan-300 border border-blue-400/30 uppercase">
                  PERKIN A.5 TAHUN 2025
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  Nomor: {PERKIN_A5_METADATA.nomorPerkin}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                Kamus Rumus, Definisi Operasional &amp; Regulasi IKP
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector 3 IKP */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {PERKIN_A5_KPIS.map((kpi) => (
            <button
              key={kpi.id}
              onClick={() => setActiveKpiId(kpi.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeKpiId === kpi.id
                  ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-mono">
                {kpi.number}
              </span>
              <span>{kpi.code}: {kpi.name.substring(0, 32)}...</span>
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Main Title Banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                {currentKpi.code} &bull; INDIKATOR KINERJA PROGRAM
              </span>
              <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Capaian: {currentKpi.achievement.toFixed(2)}% (Melampaui Target)
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {currentKpi.name}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Target Perkin:</span>
                <span className="font-bold text-slate-900">{currentKpi.programTarget}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Realisasi 2025:</span>
                <span className="font-bold text-blue-700">{currentKpi.realization}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Satuan Pengukuran:</span>
                <span className="font-bold text-slate-900">{currentKpi.unit}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Polarisasi:</span>
                <span className="font-bold text-emerald-700">{currentKpi.polarization}</span>
              </div>
            </div>
          </div>

          {/* Operational Definition & Legal Basis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Definisi Operasional (Lampiran II Perkin)</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                {currentKpi.operationalDefinition}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-indigo-600" />
                <span>Dasar Hukum &amp; Pedoman Teknis</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                {currentKpi.legalBasis}
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-500">
                <span>Sumber Data: </span>
                <strong className="text-slate-800">{currentKpi.dataSource}</strong>
              </div>
            </div>
          </div>

          {/* Formula Display Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                RUMUS MATEMATIS PERHITUNGAN
              </span>
              <span>Periode: {currentKpi.reportingPeriod}</span>
            </div>

            <div className="p-3 bg-slate-800/90 rounded-lg border border-slate-700 font-mono text-xs sm:text-sm text-amber-300">
              {currentKpi.formula}
            </div>

            <div className="text-[11px] text-slate-400 font-sans pt-1">
              * Konsolidasi Periode: <strong>{currentKpi.consolidationPeriod}</strong>. Unit kerja bertanggung jawab menginput dan memvalidasi data triwulan ke dalam Sistem Perjanjian Kinerja BP Batam.
            </div>
          </div>

          {/* Breakdown Table if available */}
          {currentKpi.breakdown && (
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="p-2.5 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Rincian Komponen / Satker Pengampu:</span>
                <span className="text-[10px] font-mono text-slate-500 font-normal">
                  Sesuai Lampiran I Penetapan IKP
                </span>
              </div>
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Badan Usaha / Unit Kerja</th>
                    <th className="p-2.5 text-right">Target</th>
                    <th className="p-2.5 text-right">Realisasi</th>
                    <th className="p-2.5 text-right">Capaian (%)</th>
                    {currentKpi.breakdown[0].sharePercent && (
                      <th className="p-2.5 text-right">Share Target (%)</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {currentKpi.breakdown.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-sans font-bold text-slate-900">{row.entity}</td>
                      <td className="p-2.5 text-right text-slate-600">{row.target}</td>
                      <td className="p-2.5 text-right font-bold text-blue-700">{row.realization}</td>
                      <td className="p-2.5 text-right font-bold text-emerald-600">
                        {row.percentage.toFixed(2)}%
                      </td>
                      {row.sharePercent && (
                        <td className="p-2.5 text-right text-slate-500">{row.sharePercent}%</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Penetapan Perkin: <strong>13 Maret 2025</strong> &bull; Nomor: <strong>2 /IKA/ 3 /2025</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
