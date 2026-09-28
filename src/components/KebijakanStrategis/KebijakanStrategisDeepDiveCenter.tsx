import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  Target,
  Compass,
  Sparkles,
  ExternalLink,
  Award,
  CheckCircle2,
  Building2,
  FileSpreadsheet,
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
  onNavigateToFullDashboard,
  onOpenFormulaModal,
  onOpenExportModal,
}) => {
  // Sub-tabs for PTSP view
  const [ptspSubMenu, setPtspSubMenu] = useState<string>('ikhtisar');

  // Sub-tabs for PDSI view
  const [pdsiSubMenu, setPdsiSubMenu] = useState<string>('ikhtisar');

  const normalizedUnitId =
    selectedUnitId === 'pusren'
      ? 'pusat-perencanaan-program'
      : selectedUnitId === 'phks'
      ? 'pusat-harmonisasi'
      : selectedUnitId || 'ptsp';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-5">
      {/* 1. Header with Tab Switcher (Identical to Deputi Administrasi dan Keuangan) */}
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
                Buku Satu Data BP Batam
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Unit Deep-Dive Center: Kebijakan Strategis, Perizinan, Perencanaan &amp; Sistem Informasi
            </h3>
          </div>
        </div>

        {/* 4 Unit Selection Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectUnit('ptsp')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'ptsp'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>PTSP (17 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('pdsi')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'pdsi'
                ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>PDSI (21 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('pusat-perencanaan-program')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'pusat-perencanaan-program'
                ? 'bg-white text-amber-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4 text-amber-600" />
            <span>Pusren (19 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('pusat-harmonisasi')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'pusat-harmonisasi'
                ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>PHKS (7 DS)</span>
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC WORKSPACE PER SELECTED UNIT */}

      {/* UNIT 1: PUSAT PELAYANAN TERPADU SATU PINTU (PTSP) */}
      {normalizedUnitId === 'ptsp' && (
        <div className="space-y-4">
          {/* Sub-filter Bar for PTSP */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setPtspSubMenu('ikhtisar')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  ptspSubMenu === 'ikhtisar'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                12 Poin Eksekutif PTSP
              </button>
              <button
                onClick={() => setPtspSubMenu('jenis_layanan')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  ptspSubMenu === 'jenis_layanan'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Jenis Layanan (DS 14)
              </button>
              <button
                onClick={() => setPtspSubMenu('sektor')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  ptspSubMenu === 'sektor'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Sektor OSS-RBA (DS 9)
              </button>
              <button
                onClick={() => setPtspSubMenu('pengaduan')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  ptspSubMenu === 'pengaduan'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Pengaduan &amp; MPP (DS 6)
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>98.4% SLA Terpenuhi • IKM 88.42 (Kategori A)</span>
            </div>
          </div>

          <PtspDashboard
            activeSubMenu={ptspSubMenu}
            onSelectSubMenu={setPtspSubMenu}
            onOpenExportModal={onOpenExportModal}
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      )}

      {/* UNIT 2: PUSAT DATA DAN SISTEM INFORMASI (PDSI) */}
      {normalizedUnitId === 'pdsi' && (
        <div className="space-y-4">
          {/* Sub-filter Bar for PDSI */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setPdsiSubMenu('ikhtisar')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  pdsiSubMenu === 'ikhtisar'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Visual Suite 8 Poin Satu Data
              </button>
              <button
                onClick={() => setPdsiSubMenu('datacenter')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  pdsiSubMenu === 'datacenter'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Tier-3 Data Center (Poin 9)
              </button>
              <button
                onClick={() => setPdsiSubMenu('layanan_ti')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  pdsiSubMenu === 'layanan_ti'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Layanan TI &amp; Helpdesk (Poin 10)
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SPBE 4.12 (Sangat Baik) • Tier-3 DC Uptime 99.98%</span>
            </div>
          </div>

          <PdsiDashboard
            activeSubMenu={pdsiSubMenu}
            onSelectSubMenu={setPdsiSubMenu}
            onOpenExportModal={onOpenExportModal}
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      )}

      {/* UNIT 3: PUSAT PERENCANAAN PROGRAM STRATEGIS (PUSREN) */}
      {normalizedUnitId === 'pusat-perencanaan-program' && (
        <div className="space-y-4">
          <PusrenDashboard
            onOpenFormulaModal={onOpenFormulaModal}
            onOpenExportModal={onOpenExportModal}
          />
        </div>
      )}

      {/* UNIT 4: PUSAT HARMONISASI KEBIJAKAN STRATEGIS (PHKS) */}
      {normalizedUnitId === 'pusat-harmonisasi' && (
        <div className="space-y-4">
          <HarmonisasiDashboard
            onOpenFormulaModal={onOpenFormulaModal}
            onOpenExportModal={onOpenExportModal}
          />
        </div>
      )}
    </div>
  );
};
