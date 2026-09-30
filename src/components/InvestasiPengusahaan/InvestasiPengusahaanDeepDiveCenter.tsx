import React, { useState } from 'react';
import {
  TrendingUp,
  Building2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { InvestasiSektorMinatCard } from '../Investasi/InvestasiSektorMinatCard';
import { InvestasiWebsiteTrafficCard } from '../Investasi/InvestasiWebsiteTrafficCard';
import { InvestasiInfrastrukturCard } from '../Investasi/InvestasiInfrastrukturCard';
import { MINAT_INVESTASI_DATA } from '../../data/investasiData';

import { KekProfilCard } from '../KEK/KekProfilCard';
import { KekPerizinanSheetSwap } from '../KEK/KekPerizinanSheetSwap';

import { EvaluasiTindakLanjutVisualizer } from '../PengendalianPengusahaan/EvaluasiTindakLanjutVisualizer';

interface InvestasiPengusahaanDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
}

export const InvestasiPengusahaanDeepDiveCenter: React.FC<
  InvestasiPengusahaanDeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
  onOpenFormulaModal = (_kpiId?: string) => {},
  onNavigateToFullDashboard,
}) => {
  // Sub-tabs for Direktorat Investasi view (Sesuai instruksi: Hapus Sheet Realisasi DS 13 & Sheet Agenda Promosi)
  const [investasiSubTab, setInvestasiSubTab] = useState<
    'pipeline' | 'traffic' | 'infrastruktur'
  >('pipeline');

  // Sub-tabs for Direktorat Pengembangan KEK view (Sesuai instruksi: Hapus Sheet Realisasi PMA/PMDN & Sheet Kajian Perkin)
  const [kekSubTab, setKekSubTab] = useState<'profil' | 'perizinan'>('profil');
  const [selectedKekName, setSelectedKekName] = useState<string>('ALL');

  // Normalize selectedUnitId so if it's invalid or dit-lalu-lintas-barang, fallback to dit-investasi
  const activeUnit =
    selectedUnitId === 'dit-pengembangan-kek' ||
    selectedUnitId === 'dit-pengendalian-usaha'
      ? selectedUnitId
      : 'dit-investasi';

  return (
    <div
      id="investasi-deep-dive-section"
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-5"
    >
      {/* 1. Header with Tab Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#002B49] to-[#1F3864] text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                EXECUTIVE DEEP-DIVE
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Buku Satu Data BP Batam (3 Unit Pengampu A4)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Unit Deep-Dive Center: Investasi, KEK &amp; Pengusahaan
            </h3>
          </div>
        </div>

        {/* 3 Unit Selection Tabs (Sesuai Instruksi: Hapus Sheet Lalu Lintas Barang) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectUnit('dit-investasi')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeUnit === 'dit-investasi'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Dit. Investasi</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-pengembangan-kek')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeUnit === 'dit-pengembangan-kek'
                ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Pengembangan KEK</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-pengendalian-usaha')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeUnit === 'dit-pengendalian-usaha'
                ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Pengendalian Pengusahaan</span>
          </button>
        </div>
      </div>

      {/* 2. SUB-SECTION CONTENT FOR CHOSEN UNIT */}

      {/* ================================================================ */}
      {/* UNIT 1: DIREKTORAT INVESTASI                                     */}
      {/* (Sheet Realisasi DS 13 & Sheet Agenda Promosi Dihapus)           */}
      {/* ================================================================ */}
      {activeUnit === 'dit-investasi' && (
        <div className="space-y-4">
          {/* Sub-bar Filter - Clean Model DEP-A2 */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase px-1">
                Pilih Sheet:
              </span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
                {[
                  { id: 'pipeline', label: 'Minat & Pipeline (DS 14)' },
                  { id: 'traffic', label: 'Trafik Web (DS 10)' },
                  { id: 'infrastruktur', label: 'Infrastruktur (DS 6)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setInvestasiSubTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      investasiSubTab === tab.id
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {onNavigateToFullDashboard && (
              <button
                onClick={() => onNavigateToFullDashboard('dit-investasi')}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-blue-200"
              >
                <span>Dashboard Penuh Unit</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Active Sheet Display */}
          <div className="space-y-4">
            {investasiSubTab === 'pipeline' && (
              <InvestasiSektorMinatCard
                minatList={MINAT_INVESTASI_DATA}
                onOpenFormulaModal={onOpenFormulaModal}
              />
            )}

            {investasiSubTab === 'traffic' && (
              <InvestasiWebsiteTrafficCard onOpenFormulaModal={onOpenFormulaModal} />
            )}

            {investasiSubTab === 'infrastruktur' && (
              <InvestasiInfrastrukturCard onOpenFormulaModal={onOpenFormulaModal} />
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* UNIT 2: DIREKTORAT PENGEMBANGAN KPBPBB DAN KEK                   */}
      {/* (Sheet Realisasi PMA/PMDN & Sheet Kajian Perkin Dihapus)         */}
      {/* ================================================================ */}
      {activeUnit === 'dit-pengembangan-kek' && (
        <div className="space-y-4">
          {/* Sub-bar Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase px-1">
                Pilih Sheet:
              </span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-emerald-200">
                {[
                  { id: 'profil', label: 'Profil 3 KEK (DS 2)' },
                  { id: 'perizinan', label: 'Perizinan Administrator (DS 3 & 4)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setKekSubTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      kekSubTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {onNavigateToFullDashboard && (
              <button
                onClick={() => onNavigateToFullDashboard('dit-pengembangan-kek')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-emerald-200"
              >
                <span>Dashboard Penuh Unit</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Active Sheet Display */}
          <div className="space-y-4">
            {kekSubTab === 'profil' && (
              <KekProfilCard
                selectedKek={selectedKekName}
                onSelectKek={setSelectedKekName}
                onOpenFormulaModal={onOpenFormulaModal}
              />
            )}

            {kekSubTab === 'perizinan' && (
              <KekPerizinanSheetSwap onOpenFormulaModal={onOpenFormulaModal} />
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* UNIT 3: DIREKTORAT PENGENDALIAN PENGUSAHAAN                      */}
      {/* (Hapus Semua Modul Lama, Ganti Visualisasi 2 Indikator Hal. 14)  */}
      {/* ================================================================ */}
      {activeUnit === 'dit-pengendalian-usaha' && (
        <div className="space-y-4">
          <EvaluasiTindakLanjutVisualizer
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      )}
    </div>
  );
};
