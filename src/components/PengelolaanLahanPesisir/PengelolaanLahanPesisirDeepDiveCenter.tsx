import React, { useState } from 'react';
import {
  MapPin,
  Anchor,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  Building2,
  FolderCheck,
} from 'lucide-react';
import { PengelolaanLahanDashboard } from '../PengelolaanLahan/PengelolaanLahanDashboard';
import { PesisirReklamasiDashboard } from '../PesisirReklamasi/PesisirReklamasiDashboard';
import { PengendalianLahanDashboard } from '../PengendalianLahan/PengendalianLahanDashboard';

interface PengelolaanLahanPesisirDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
}

export const PengelolaanLahanPesisirDeepDiveCenter: React.FC<
  PengelolaanLahanPesisirDeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
  onNavigateToFullDashboard,
  onOpenFormulaModal,
  onOpenExportModal,
}) => {
  // Sub-tabs for Pengendalian view
  const [pengendalianSubTab, setPengendalianSubTab] = useState<string>('ikhtisar');

  const normalizedUnitId =
    selectedUnitId === 'dit-lahan' || selectedUnitId === 'lahan'
      ? 'dit-lahan'
      : selectedUnitId === 'dit-pesisir-reklamasi' || selectedUnitId === 'pesisir'
      ? 'dit-pesisir-reklamasi'
      : selectedUnitId === 'dit-pengendalian-lahan' || selectedUnitId === 'pengendalian'
      ? 'dit-pengendalian-lahan'
      : 'dit-lahan';

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
              Unit Deep-Dive Center: Pengelolaan Lahan, Pesisir &amp; Pengendalian
            </h3>
          </div>
        </div>

        {/* 3 Unit Selection Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectUnit('dit-lahan')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'dit-lahan'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Pengelolaan Lahan (15 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-pesisir-reklamasi')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'dit-pesisir-reklamasi'
                ? 'bg-white text-cyan-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Anchor className="w-4 h-4 text-cyan-600" />
            <span>Pesisir &amp; Reklamasi (4 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-pengendalian-lahan')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'dit-pengendalian-lahan'
                ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Pengendalian Lahan (4 DS)</span>
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC WORKSPACE PER SELECTED UNIT */}

      {/* UNIT 1: DIREKTORAT PENGELOLAAN LAHAN (15 DATASET) */}
      {normalizedUnitId === 'dit-lahan' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-blue-50/60 rounded-xl border border-blue-200/70">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="font-bold text-slate-800">
                Direktorat Pengelolaan Lahan (Halaman 6-8 Buku Satu Data)
              </span>
              <span className="text-slate-500 hidden sm:inline">
                • SKPT, SPPT, Pecah/Revisi PL, Hak Atas Tanah &amp; Lahan 9 SWP
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-600 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Target 200 Ha • Realisasi 248,5 Ha (Melampaui 124,25%)</span>
            </div>
          </div>

          <PengelolaanLahanDashboard />
        </div>
      )}

      {/* UNIT 2: DIREKTORAT PENGELOLAAN KAWASAN PESISIR DAN REKLAMASI (4 DATASET) */}
      {normalizedUnitId === 'dit-pesisir-reklamasi' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-cyan-50/60 rounded-xl border border-cyan-200/70">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
              <span className="font-bold text-slate-800">
                Direktorat Pengelolaan Kawasan Pesisir dan Reklamasi (Halaman 13-14)
              </span>
              <span className="text-slate-500 hidden sm:inline">
                • PKKPRL, Perizinan Reklamasi, Rencana Pemanfaatan Ruang Laut
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-600 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Target 150 Ha • Realisasi 162,8 Ha (108,53% Sangat Baik)</span>
            </div>
          </div>

          <PesisirReklamasiDashboard />
        </div>
      )}

      {/* UNIT 3: DIREKTORAT PENGENDALIAN PENGELOLAAN LAHAN, PESISIR DAN REKLAMASI (4 DATASET) */}
      {normalizedUnitId === 'dit-pengendalian-lahan' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-200/70">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setPengendalianSubTab('ikhtisar')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  pengendalianSubTab === 'ikhtisar'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Ikhtisar &amp; 4 KPI Pengendalian
              </button>
              <button
                onClick={() => setPengendalianSubTab('penertiban')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  pengendalianSubTab === 'penertiban'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Pipeline Penertiban &amp; Rekuperasi (DS #2)
              </button>
              <button
                onClick={() => setPengendalianSubTab('spasial')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  pengendalianSubTab === 'spasial'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Pengawasan 5 SWP &amp; Pesisir (DS #1)
              </button>
              <button
                onClick={() => setPengendalianSubTab('rekomendasi')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  pengendalianSubTab === 'rekomendasi'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Rekomendasi &amp; Dokumen (DS #3 &amp; #4)
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-600 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Kepatuhan 93,8% • 94,6 Ha Rekuperasi Lahan Mangkrak</span>
            </div>
          </div>

          <PengendalianLahanDashboard activeSubTab={pengendalianSubTab} />
        </div>
      )}
    </div>
  );
};
