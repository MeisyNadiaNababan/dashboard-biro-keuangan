import React from 'react';
import {
  FileText,
  Award,
  Layers,
  Sparkles,
  Download,
  BookOpen,
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Database,
  FileCode2,
} from 'lucide-react';
import { PERKIN_METADATA } from './kebijakanStrategisData';

interface KebijakanStrategisVisualHeaderProps {
  onOpenFormulaModal?: (kpiId?: string) => void;
  onOpenExportModal?: () => void;
  onSelectSubView: (view: 'ikhtisar' | 'kpi_visual' | 'unit_kinerja' | 'deep_dive' | 'satu_data') => void;
  currentSubView: string;
}

export const KebijakanStrategisVisualHeader: React.FC<KebijakanStrategisVisualHeaderProps> = ({
  onOpenFormulaModal,
  onOpenExportModal,
  onSelectSubView,
  currentSubView,
}) => {
  return (
    <header className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="h-1 w-full bg-linear-to-r from-[#002B49] via-[#0284C7] to-[#0D9488]" />

      <div className="p-4 sm:p-5 lg:p-6 space-y-4">
        {/* Row 1: Executive Title, Metadata & Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="font-mono text-[11px] text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200/80 font-bold">
                PERKIN A2 (DEP A2) · TAHUN 2025
              </span>
              <span>·</span>
              <span className="text-slate-600">No. {PERKIN_METADATA.nomor}</span>
              <span>·</span>
              <span className="text-slate-600">{PERKIN_METADATA.tanggal}</span>
              <span>·</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold text-[11px]">
                4 Indikator Kinerja Program (IKP)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#002B49] text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-slate-900 uppercase">
                  DEPUTI BIDANG KEBIJAKAN STRATEGIS DAN PERIZINAN
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Sasaran Program:{' '}
                  <span className="font-bold text-slate-900">
                    "{PERKIN_METADATA.sasaranProgram}"
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Signatories & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 lg:self-center">
            {/* Signatories Box */}
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/80 text-[11px] space-y-0.5 min-w-[220px]">
              <div className="flex items-center justify-between text-slate-500">
                <span>Pihak I (Deputi):</span>
                <span className="font-bold text-slate-800">{PERKIN_METADATA.pejabatPertama}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Pihak II (Kepala BP):</span>
                <span className="font-bold text-slate-800">{PERKIN_METADATA.pejabatKedua}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenFormulaModal && onOpenFormulaModal('ikp-1-perencanaan')}
                className="px-3 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Buka Manual & Formula 4 IKP"
              >
                <FileCode2 className="w-3.5 h-3.5 text-sky-700" />
                <span>Manual 4 IKP</span>
              </button>

              <button
                onClick={onOpenExportModal}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Ekspor Laporan Eksekutif"
              >
                <Download className="w-3.5 h-3.5 text-sky-300" />
                <span>Ekspor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Sub-View Switcher Tabs (Anti-Slop, Clean Tab Bar) */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => onSelectSubView('ikhtisar')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentSubView === 'ikhtisar'
                  ? 'bg-white text-[#002B49] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Ikhtisar Eksekutif</span>
            </button>

            <button
              onClick={() => onSelectSubView('kpi_visual')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentSubView === 'kpi_visual'
                  ? 'bg-white text-sky-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>4 IKP &amp; Visualisasi Kinerja</span>
            </button>

            <button
              onClick={() => onSelectSubView('unit_kinerja')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentSubView === 'unit_kinerja'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Kinerja Unit Pelaksana</span>
            </button>

            <button
              onClick={() => onSelectSubView('deep_dive')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentSubView === 'deep_dive'
                  ? 'bg-white text-emerald-700 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Unit Deep-Dive Center</span>
            </button>

            <button
              onClick={() => onSelectSubView('satu_data')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentSubView === 'satu_data'
                  ? 'bg-white text-teal-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Katalog Satu Data PDF</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Perkin A2 · BP Batam</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
