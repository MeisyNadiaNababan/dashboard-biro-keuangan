import React from 'react';
import { X, Calculator, Database, FileText, CheckCircle2, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import { KPI_DATASETS_PENGENDALIAN } from './pengendalianData';

interface PengendalianFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDatasetNo?: number;
}

export const PengendalianFormulaModal: React.FC<PengendalianFormulaModalProps> = ({
  isOpen,
  onClose,
  defaultDatasetNo = 3,
}) => {
  const [selectedDataset, setSelectedDataset] = React.useState<number>(defaultDatasetNo);

  React.useEffect(() => {
    if (defaultDatasetNo) {
      setSelectedDataset(defaultDatasetNo);
    }
  }, [defaultDatasetNo]);

  if (!isOpen) return null;

  const currentDataset =
    KPI_DATASETS_PENGENDALIAN.find((d) => d.nomorDataset === selectedDataset) ||
    KPI_DATASETS_PENGENDALIAN[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B1E38] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-sky-300 uppercase tracking-wider block">
                Kamus Rumus &amp; Atribut Satu Data BP Batam (Halaman 14)
              </span>
              <h3 className="text-base font-bold text-white">
                Direktorat Pengendalian Pengusahaan
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection for 4 Datasets */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-1 overflow-x-auto">
          {KPI_DATASETS_PENGENDALIAN.map((ds) => {
            const isUserPrimary = ds.nomorDataset === 3 || ds.nomorDataset === 4;
            const isSelected = selectedDataset === ds.nomorDataset;

            return (
              <button
                key={ds.nomorDataset}
                onClick={() => setSelectedDataset(ds.nomorDataset)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all border-t border-x cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-white border-slate-200 text-sky-900 border-b-transparent shadow-xs font-bold'
                    : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Dataset #{ds.nomorDataset}</span>
                {isUserPrimary && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Permintaan Utama Pengguna" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Main Title of Selected Dataset */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                DATASET NO. {currentDataset.nomorDataset} DARI 4 DATASET
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1">
                {currentDataset.namaDataset}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono">Capaian Realtime</span>
              <span className="text-2xl font-black text-sky-900 font-mono">
                {currentDataset.capaian.toFixed(1)}
                <span className="text-sm font-bold text-slate-600 ml-0.5">
                  {currentDataset.satuan}
                </span>
              </span>
            </div>
          </div>

          {/* Formula Box */}
          <div className="bg-slate-900 rounded-xl p-4 text-white space-y-2">
            <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider block">
              Rumus Matematis Perhitungan
            </span>
            <div className="font-mono text-xs sm:text-sm bg-slate-800/90 p-3 rounded-lg text-sky-200 border border-slate-700 leading-relaxed overflow-x-auto">
              {currentDataset.formula}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                Produsen &amp; Sumber Data
              </span>
              <p className="font-semibold text-slate-800">{currentDataset.sumberData}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                Target &amp; Ambang Batas Evaluasi
              </span>
              <p className="font-semibold text-slate-800">
                Minimal {currentDataset.target}% (Evaluasi Triwulanan)
              </p>
            </div>
          </div>

          {/* Description & Impact */}
          <div className="space-y-1.5 text-xs text-slate-600 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
            <span className="font-bold text-blue-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Deskripsi &amp; Manfaat Bagi Pimpinan:</span>
            </span>
            <p className="leading-relaxed text-slate-700">
              {currentDataset.deskripsi}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-3.5 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Sesuai Standar Kamus Data Satu Data BP Batam
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0B1E38] hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
