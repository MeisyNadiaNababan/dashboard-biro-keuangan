import React from 'react';
import { Database, ShieldCheck, Lock, Globe, Layers } from 'lucide-react';

interface PelabuhanDatasetBadgeProps {
  datasetNumber: number;
  datasetName: string;
  classification?: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  period?: string;
  pdfPages?: string;
  tableId?: string;
}

export const PelabuhanDatasetBadge: React.FC<PelabuhanDatasetBadgeProps> = ({
  datasetNumber,
  datasetName,
  classification = 'TERBUKA',
  period = 'Per Bulan',
  pdfPages = 'Hal. 14 - 17',
  tableId,
}) => {
  const getBadgeStyle = () => {
    switch (classification) {
      case 'TERBUKA':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: Globe,
          label: 'Satu Data Terbuka',
        };
      case 'TERBATAS':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: ShieldCheck,
          label: 'Data Terbatas',
        };
      case 'TERTUTUP':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: Lock,
          label: 'Data Tertutup',
        };
      default:
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Database,
          label: 'Satu Data',
        };
    }
  };

  const style = getBadgeStyle();
  const Icon = style.icon;

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0B1728] text-white text-[10px] font-mono font-semibold border border-slate-700 shadow-2xs">
        <Database className="w-2.5 h-2.5 text-sky-400" />
        <span>Satu Data #DS-{datasetNumber}</span>
      </div>

      <div
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-medium border ${style.bg}`}
      >
        <Icon className="w-2.5 h-2.5" />
        <span>{style.label}</span>
      </div>

      <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
        PDF {pdfPages} • {period}
      </span>

      {tableId && (
        <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono text-[9px] border border-slate-200">
          Table: {tableId}
        </span>
      )}
    </div>
  );
};
