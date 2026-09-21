import React from 'react';
import { X, HelpCircle, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { LAHAN_KPI_FORMULAS } from './lahanData';

interface LahanFormulaModalProps {
  kpiId: string | null;
  onClose: () => void;
}

export const LahanFormulaModal: React.FC<LahanFormulaModalProps> = ({ kpiId, onClose }) => {
  if (!kpiId) return null;

  const formulaInfo = LAHAN_KPI_FORMULAS[kpiId] || {
    title: 'Formula & Metadata Pengelolaan Lahan BP Batam',
    datasetNo: 'Katalog Satu Data',
    formula: 'SUM([Disetujui]) / SUM([Jumlah Permohonan]) * 100',
    description: 'Rincian metodologi perhitungan dan panduan shelves Tableau untuk indikator pertanahan BP Batam.',
    tableauGuide: {
      columns: 'Jenis Pemohon / SWP',
      rows: 'SUM(Disetujui), SUM(Ditolak)',
      marks: 'Bar / Donut Chart',
      colors: 'Status (Hijau = Disetujui, Merah = Ditolak)',
      filters: 'Tahun, Jenis Pemohon, SWP',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {formulaInfo.datasetNo}
                </span>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Formula &amp; Panduan Tableau
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{formulaInfo.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 overflow-y-auto text-xs">
          {/* Formula Box */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              Formula Matematis / Kalkulasi Field
            </span>
            <div className="font-mono text-sm bg-white text-slate-900 p-2.5 rounded-lg border border-slate-200 overflow-x-auto select-all shadow-2xs font-semibold">
              {formulaInfo.formula}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">Deskripsi &amp; Landasan Regulasi</h4>
            <p className="text-slate-600 leading-relaxed">{formulaInfo.description}</p>
          </div>

          {/* Tableau Shelves Configuration Guide */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Panduan Setup Tableau Shelves (Worksheet Implementation)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-slate-500 block text-[10px]">Columns (Kolom):</span>
                <span className="font-mono text-slate-800 font-semibold">{formulaInfo.tableauGuide.columns}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-slate-500 block text-[10px]">Rows (Baris):</span>
                <span className="font-mono text-slate-800 font-semibold">{formulaInfo.tableauGuide.rows}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-slate-500 block text-[10px]">Marks Card:</span>
                <span className="font-mono text-sky-700 font-semibold">{formulaInfo.tableauGuide.marks}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-slate-500 block text-[10px]">Color Encoding:</span>
                <span className="font-mono text-emerald-700 font-semibold">{formulaInfo.tableauGuide.colors}</span>
              </div>
              <div className="col-span-2 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-slate-500 block text-[10px]">Filters Shelf:</span>
                <span className="font-mono text-amber-700 font-semibold">{formulaInfo.tableauGuide.filters}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Sumber Data: <strong>Atribut Daftar Data Satu Data BP Batam (Hal. 6-8)</strong>
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
