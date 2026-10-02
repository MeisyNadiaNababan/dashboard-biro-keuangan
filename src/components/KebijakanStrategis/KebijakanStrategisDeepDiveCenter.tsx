import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  Sparkles,
  Compass,
  Scale,
} from 'lucide-react';
import { PtspDashboard } from '../PTSP/PtspDashboard';
import { PdsiDashboard } from '../PDSI/PdsiDashboard';
import { PusrenDashboard } from '../Pusren/PusrenDashboard';
import { HarmonisasiDashboard } from '../Harmonisasi/HarmonisasiDashboard';

interface KebijakanStrategisDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
}

export const KebijakanStrategisDeepDiveCenter: React.FC<
  KebijakanStrategisDeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
  onOpenFormulaModal,
  onOpenExportModal,
}) => {
  // Sub-tabs for PTSP view
  const [ptspSubMenu, setPtspSubMenu] = useState<string>('jenis_layanan');

  // Sub-tabs for PDSI view
  const [pdsiSubMenu, setPdsiSubMenu] = useState<string>('ikhtisar');

  const normalizedUnitId =
    selectedUnitId === 'pusat-perencanaan-program' || selectedUnitId === 'pusren'
      ? 'pusat-perencanaan-program'
      : selectedUnitId === 'pusat-harmonisasi' || selectedUnitId === 'harmonisasi'
      ? 'pusat-harmonisasi'
      : selectedUnitId === 'pdsi'
      ? 'pdsi'
      : 'ptsp';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-5">
      {/* 1. Header with Tab Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#002B49] to-[#1F3864] text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                EXECUTIVE DEEP-DIVE
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Buku Satu Data BP Batam (64 Dataset)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Unit Deep-Dive Center: 4 Satker Pengampu Kebijakan Strategis &amp; Perizinan
            </h3>
          </div>
        </div>

        {/* 4 Unit Selection Tabs (Pusren, Harmonisasi, PDSI, PTSP) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectUnit('pusat-perencanaan-program')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'pusat-perencanaan-program'
                ? 'bg-white text-sky-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-sky-600" />
            <span>Pusren (19 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('pusat-harmonisasi')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'pusat-harmonisasi'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4 text-blue-600" />
            <span>Harmonisasi (7 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('pdsi')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'pdsi'
                ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>PDSI (21 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('ptsp')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'ptsp'
                ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>PTSP (17 DS)</span>
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC WORKSPACE PER SELECTED UNIT */}

      {/* UNIT 1: PUSAT PERENCANAAN PROGRAM STRATEGIS (PUSREN) */}
      {normalizedUnitId === 'pusat-perencanaan-program' && (
        <div className="space-y-4">
          <PusrenDashboard
            activeSubTab="masterplan"
            onOpenExportModal={onOpenExportModal}
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      )}

      {/* UNIT 2: PUSAT HARMONISASI KEBIJAKAN STRATEGIS (HARMONISASI) */}
      {normalizedUnitId === 'pusat-harmonisasi' && (
        <div className="space-y-4">
          <HarmonisasiDashboard
            activeSubTab="ikk"
            onOpenExportModal={onOpenExportModal}
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      )}

      {/* UNIT 3: PUSAT DATA DAN SISTEM INFORMASI (PDSI) */}
      {normalizedUnitId === 'pdsi' && (
        <div className="space-y-4">
          <PdsiDashboard
            activeSubMenu={pdsiSubMenu}
            onSelectSubMenu={setPdsiSubMenu}
            onOpenExportModal={onOpenExportModal}
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      )}

      {/* UNIT 4: PUSAT PELAYANAN TERPADU SATU PINTU (PTSP) */}
      {normalizedUnitId === 'ptsp' && (
        <div className="space-y-4">
          <PtspDashboard
            activeSubMenu={ptspSubMenu}
            onSelectSubMenu={setPtspSubMenu}
            onOpenExportModal={onOpenExportModal}
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      )}
    </div>
  );
};
