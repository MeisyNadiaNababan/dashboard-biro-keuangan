import React from 'react';
import {
  X,
  FileText,
  Award,
  CheckCircle2,
  BookOpen,
  Scale,
  ShieldCheck,
  TrendingUp,
  Download,
  ExternalLink,
} from 'lucide-react';
import { PERKIN_A1_KPIS, PERKIN_A1_INFO, PerkinA1Kpi } from './administrasiKeuanganData';

interface AdministrasiKeuanganFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpiId: string | null;
}

export const AdministrasiKeuanganFormulaModal: React.FC<
  AdministrasiKeuanganFormulaModalProps
> = ({ isOpen, onClose, kpiId }) => {
  if (!isOpen) return null;

  const currentKpi: PerkinA1Kpi =
    PERKIN_A1_KPIS.find((k) => k.id === kpiId) || PERKIN_A1_KPIS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002B49] via-[#0F1E36] to-[#1E3A8A] text-white p-4 sm:p-5 flex items-start justify-between gap-3 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/30 text-cyan-300 border border-blue-400/40 text-[10px] font-mono font-bold uppercase">
                Perkin A1 • No. {PERKIN_A1_INFO.nomorPerkin}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Lampiran II Penjelasan Uraian IKP
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-cyan-400/20 text-cyan-300 font-mono text-xs flex items-center justify-center border border-cyan-400/30">
                0{currentKpi.no}
              </span>
              <span>{currentKpi.namaIndikator}</span>
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs text-slate-700">
          {/* Summary Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Target 2025
                </span>
                <span className="text-base font-black font-mono text-slate-900">
                  {currentKpi.target2025}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Realisasi 2025
                </span>
                <span className="text-base font-black font-mono text-emerald-700">
                  {currentKpi.realisasi2025}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Predikat Mutu
                </span>
                <span className="text-xs font-bold text-blue-700 block truncate">
                  {currentKpi.predikat}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Polarisasi
                </span>
                <span className="text-xs font-bold text-slate-700 block">
                  {currentKpi.polarisasi}
                </span>
              </div>
            </div>
          </div>

          {/* Penjelasan Operasional */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Penjelasan Operasional</span>
            </h4>
            <p className="text-xs leading-relaxed text-slate-600 bg-slate-50/60 p-3 rounded-lg border border-slate-200/80">
              {currentKpi.ringkasanPenjelasan}
            </p>
          </div>

          {/* Dasar Hukum & Formula */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span>Dasar Hukum &amp; Formula Perhitungan</span>
            </h4>
            <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-200/80 space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 block">
                  Regulasi Pengukuran:
                </span>
                <p className="text-xs text-slate-700 leading-snug">
                  {currentKpi.dasarHukum}
                </p>
              </div>
              <div className="pt-2 border-t border-blue-200/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 block">
                  Formula Matematis / Metode Agregasi:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-mono">
                  {currentKpi.formulaLengkap}
                </p>
              </div>
            </div>
          </div>

          {/* Rincian Komponen Penyusun */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Rincian Komponen Penilaian</span>
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Komponen / Aspek</th>
                    <th className="py-2 px-3 text-center">Bobot</th>
                    <th className="py-2 px-3 text-center">Skor / Status</th>
                    <th className="py-2 px-3">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {currentKpi.komponenPenyusun.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-3 font-medium text-slate-900">
                        {item.nama}
                      </td>
                      <td className="py-2 px-3 text-center font-mono text-slate-600">
                        {item.bobot || '-'}
                      </td>
                      <td className="py-2 px-3 text-center font-mono font-bold text-blue-700">
                        {item.skor || '-'}
                      </td>
                      <td className="py-2 px-3 text-slate-500">
                        {item.keterangan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Meta & Sumber Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] text-slate-600 border-t border-slate-200">
            <div>
              <span className="font-bold text-slate-800 block">Unit Sumber Data:</span>
              <span>{currentKpi.sumberData}</span>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">Periode &amp; Konsolidasi:</span>
              <span>{currentKpi.periodePelaporan} • Take Last Known / Akumulasi Jan-Des</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-3.5 px-6 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            BP Batam • Perjanjian Kinerja Tahun 2025
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
