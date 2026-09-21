import React from 'react';
import { Database, FileSpreadsheet, Lock, Globe2, Clock, Info } from 'lucide-react';

interface LlbDatasetSourceBadgeProps {
  itemNumber: number | string;
  datasetName: string;
  sifatData: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  periodeData: 'PERBULAN' | 'JIKA UPDATE' | 'PERTAHUN' | string;
  atributList?: string[];
  pdfRef?: string;
  compact?: boolean;
}

export const LlbDatasetSourceBadge: React.FC<LlbDatasetSourceBadgeProps> = ({
  itemNumber,
  datasetName,
  sifatData,
  periodeData,
  atributList = [],
  pdfRef = 'Halaman 8 - 9',
  compact = false,
}) => {
  const isTerbuka = sifatData === 'TERBUKA';
  const isTerbatas = sifatData === 'TERBATAS';

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10.5px] text-slate-700 font-mono">
        <Database className="w-3 h-3 text-[#1F4E79]" />
        <span className="font-semibold text-[#1F4E79]">Satu Data #{itemNumber}</span>
        <span className="text-slate-300">•</span>
        <span
          className={`px-1 rounded text-[9.5px] font-bold ${
            isTerbuka
              ? 'bg-emerald-100 text-emerald-800'
              : isTerbatas
              ? 'bg-amber-100 text-amber-800'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          {sifatData}
        </span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-500">{periodeData}</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border border-slate-200/90 rounded-lg p-2.5 my-2.5 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-5 h-5 rounded bg-[#1F4E79] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Database className="w-3 h-3" />
          </div>
          <span className="font-bold text-[#1F4E79] uppercase tracking-wide text-[11px]">
            Sumber Dataset Resmi: Katalog Satu Data BP Batam (No. {itemNumber})
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Sifat Data */}
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
              isTerbuka
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : isTerbatas
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-rose-100 text-rose-800 border border-rose-300'
            }`}
          >
            {isTerbuka ? (
              <Globe2 className="w-2.5 h-2.5" />
            ) : isTerbatas ? (
              <Info className="w-2.5 h-2.5" />
            ) : (
              <Lock className="w-2.5 h-2.5" />
            )}
            Sifat: {sifatData}
          </span>

          {/* Periode */}
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-200/80 text-slate-700 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-slate-500" />
            Periode: {periodeData}
          </span>

          {/* Dokumen PDF Ref */}
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-100/80 text-blue-800 border border-blue-200">
            PDF {pdfRef}
          </span>
        </div>
      </div>

      <div className="text-[11.5px] text-slate-700 leading-relaxed">
        <span className="font-semibold text-slate-900">Nama Data: </span>
        <span className="font-mono text-slate-800">{datasetName}</span>
      </div>

      {atributList.length > 0 && (
        <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 flex items-center gap-1 flex-wrap text-[10.5px]">
          <span className="text-slate-500 font-semibold shrink-0">Atribut Tabel:</span>
          {atributList.slice(0, 8).map((attr, idx) => (
            <span
              key={idx}
              className="px-1.5 py-0.2 rounded bg-white border border-slate-200 text-slate-600 font-mono text-[9.5px]"
            >
              {attr}
            </span>
          ))}
          {atributList.length > 8 && (
            <span className="text-slate-400 text-[10px] italic">
              +{atributList.length - 8} atribut lainnya
            </span>
          )}
        </div>
      )}
    </div>
  );
};
