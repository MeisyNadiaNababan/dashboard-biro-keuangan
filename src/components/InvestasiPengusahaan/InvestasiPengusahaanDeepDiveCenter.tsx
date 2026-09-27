import React, { useState } from 'react';
import {
  TrendingUp,
  Building2,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronRight,
  Database,
  Layers,
  ArrowUpRight,
  FileCode2,
  Filter,
  CheckCircle2,
  ExternalLink,
  DollarSign,
  PieChart as PieIcon,
  Globe,
  Briefcase,
  FileText,
  Activity,
  Calendar,
} from 'lucide-react';
import { InvestasiRealisasiCard } from '../Investasi/InvestasiRealisasiCard';
import { InvestasiSektorMinatCard } from '../Investasi/InvestasiSektorMinatCard';
import { InvestasiWebsiteTrafficCard } from '../Investasi/InvestasiWebsiteTrafficCard';
import { InvestasiInfrastrukturCard } from '../Investasi/InvestasiInfrastrukturCard';
import { InvestasiPromosiCard } from '../Investasi/InvestasiPromosiCard';
import { MINAT_INVESTASI_DATA } from '../../data/investasiData';

import { KekProfilCard } from '../KEK/KekProfilCard';
import { KekInvestasiJenisCard } from '../KEK/KekInvestasiJenisCard';
import { KekPerizinanSheetSwap } from '../KEK/KekPerizinanSheetSwap';
import { KekKajianCard } from '../KEK/KekKajianCard';
import { KEK_INVESTASI_RAW } from '../../data/kekData';

import { RekomendasiPengendalianVisualizer } from '../PengendalianPengusahaan/RekomendasiPengendalianVisualizer';
import { DaftarKerjasamaCards } from '../PengendalianPengusahaan/DaftarKerjasamaCards';
import { DAFTAR_MITRA_PENGUSAHAAN } from '../PengendalianPengusahaan/pengendalianData';

import { LlbPerizinanConsolidatedCard } from '../LaluLintasBarang/LlbPerizinanConsolidatedCard';
import { LlbSlaLayananCard } from '../LaluLintasBarang/LlbSlaLayananCard';
import { LlbPenerbitanBulananSheetSwap } from '../LaluLintasBarang/LlbPenerbitanBulananSheetSwap';

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
  // Sub-tabs for Direktorat Investasi view
  const [investasiSubTab, setInvestasiSubTab] = useState<
    'all' | 'realisasi' | 'pipeline' | 'traffic' | 'infrastruktur' | 'promosi'
  >('all');

  // Sub-tabs for Direktorat Pengembangan KEK view
  const [kekSubTab, setKekSubTab] = useState<
    'all' | 'profil' | 'realisasi' | 'perizinan' | 'kajian'
  >('all');
  const [selectedKekName, setSelectedKekName] = useState<string>('ALL');

  // Sub-tabs for Direktorat Pengendalian Pengusahaan view
  const [pengendalianSubTab, setPengendalianSubTab] = useState<
    'all' | 'rekomendasi' | 'kemitraan'
  >('all');

  // Sub-tabs for Direktorat Lalu Lintas Barang view
  const [llbSubTab, setLlbSubTab] = useState<
    'all' | 'perizinan' | 'bulanan' | 'sla'
  >('all');

  return (
    <div
      id="investasi-deep-dive-section"
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-5"
    >
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
                Buku Satu Data BP Batam (39 Dataset)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Unit Deep-Dive Center: Investasi, KEK &amp; Pengusahaan
            </h3>
          </div>
        </div>

        {/* 4 Unit Selection Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectUnit('dit-investasi')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedUnitId === 'dit-investasi'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Dit. Investasi (14 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-pengembangan-kek')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedUnitId === 'dit-pengembangan-kek'
                ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Pengembangan KEK (12 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-pengendalian-usaha')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedUnitId === 'dit-pengendalian-usaha'
                ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Pengendalian Pengusahaan (4 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-lalu-lintas-barang')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedUnitId === 'dit-lalu-lintas-barang'
                ? 'bg-white text-cyan-800 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-4 h-4 text-cyan-600" />
            <span>Lalu Lintas Barang (9 DS)</span>
          </button>
        </div>
      </div>

      {/* 2. SUB-SECTION CONTENT FOR CHOSEN UNIT */}

      {/* ================================================================ */}
      {/* UNIT 1: DIREKTORAT INVESTASI (14 DATASET)                        */}
      {/* ================================================================ */}
      {selectedUnitId === 'dit-investasi' && (
        <div className="space-y-4">
          {/* Sub-bar Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-blue-900 font-mono">Modul Analisis Dit. Investasi:</span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-blue-200">
                {[
                  { id: 'all', label: 'Semua Modul' },
                  { id: 'realisasi', label: 'Realisasi Investasi (DS 13)' },
                  { id: 'pipeline', label: 'Minat & Pipeline (DS 14)' },
                  { id: 'traffic', label: 'Trafik Web (DS 10)' },
                  { id: 'infrastruktur', label: 'Infrastruktur (DS 6)' },
                  { id: 'promosi', label: 'Agenda Promosi (DS 11)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setInvestasiSubTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      investasiSubTab === tab.id
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
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

          {/* Components Grid */}
          <div className="space-y-4">
            {(investasiSubTab === 'all' || investasiSubTab === 'realisasi') && (
              <InvestasiRealisasiCard onOpenFormulaModal={onOpenFormulaModal} />
            )}

            {(investasiSubTab === 'all' || investasiSubTab === 'pipeline') && (
              <InvestasiSektorMinatCard
                minatList={MINAT_INVESTASI_DATA}
                onOpenFormulaModal={onOpenFormulaModal}
              />
            )}

            {(investasiSubTab === 'all' || investasiSubTab === 'traffic') && (
              <InvestasiWebsiteTrafficCard onOpenFormulaModal={onOpenFormulaModal} />
            )}

            {(investasiSubTab === 'all' || investasiSubTab === 'infrastruktur') && (
              <InvestasiInfrastrukturCard onOpenFormulaModal={onOpenFormulaModal} />
            )}

            {(investasiSubTab === 'all' || investasiSubTab === 'promosi') && (
              <InvestasiPromosiCard onOpenFormulaModal={onOpenFormulaModal} />
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* UNIT 2: DIREKTORAT PENGEMBANGAN KPBPBB DAN KEK (12 DATASET)      */}
      {/* ================================================================ */}
      {selectedUnitId === 'dit-pengembangan-kek' && (
        <div className="space-y-4">
          {/* Sub-bar Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-emerald-900 font-mono">Modul Analisis KEK:</span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-emerald-200">
                {[
                  { id: 'all', label: 'Semua Modul' },
                  { id: 'profil', label: 'Profil 3 KEK' },
                  { id: 'realisasi', label: 'Realisasi PMA/PMDN' },
                  { id: 'perizinan', label: 'Perizinan Administrator' },
                  { id: 'kajian', label: 'Kajian Perkin' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setKekSubTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      kekSubTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
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

          {/* Components Grid */}
          <div className="space-y-4">
            {(kekSubTab === 'all' || kekSubTab === 'profil') && (
              <KekProfilCard
                selectedKek={selectedKekName}
                onSelectKek={setSelectedKekName}
                onOpenFormulaModal={onOpenFormulaModal}
              />
            )}

            {(kekSubTab === 'all' || kekSubTab === 'realisasi') && (
              <KekInvestasiJenisCard
                investasiList={KEK_INVESTASI_RAW}
                onOpenFormulaModal={onOpenFormulaModal}
              />
            )}

            {(kekSubTab === 'all' || kekSubTab === 'perizinan') && (
              <KekPerizinanSheetSwap onOpenFormulaModal={onOpenFormulaModal} />
            )}

            {(kekSubTab === 'all' || kekSubTab === 'kajian') && (
              <KekKajianCard onOpenFormulaModal={onOpenFormulaModal} />
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* UNIT 3: DIREKTORAT PENGENDALIAN PENGUSAHAAN (4 DATASET)          */}
      {/* ================================================================ */}
      {selectedUnitId === 'dit-pengendalian-usaha' && (
        <div className="space-y-4">
          {/* Sub-bar Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-indigo-900 font-mono">Modul Pengendalian Pengusahaan:</span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-indigo-200">
                {[
                  { id: 'all', label: 'Semua Evaluasi & PKS' },
                  { id: 'rekomendasi', label: 'Rekomendasi Evaluasi (DS 1 & 3)' },
                  { id: 'kemitraan', label: 'Daftar Mitra PKS (DS 2 & 4)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setPengendalianSubTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      pengendalianSubTab === tab.id
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {onNavigateToFullDashboard && (
              <button
                onClick={() => onNavigateToFullDashboard('dit-pengendalian-usaha')}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-indigo-200"
              >
                <span>Dashboard Penuh Unit</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Components Grid */}
          <div className="space-y-4">
            {(pengendalianSubTab === 'all' || pengendalianSubTab === 'rekomendasi') && (
              <RekomendasiPengendalianVisualizer />
            )}

            {(pengendalianSubTab === 'all' || pengendalianSubTab === 'kemitraan') && (
              <DaftarKerjasamaCards
                mitraList={DAFTAR_MITRA_PENGUSAHAAN}
                onSelectMitra={() => {}}
              />
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* UNIT 4: DIREKTORAT LALU LINTAS BARANG (9 DATASET)                */}
      {/* ================================================================ */}
      {selectedUnitId === 'dit-lalu-lintas-barang' && (
        <div className="space-y-4">
          {/* Sub-bar Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-cyan-50/50 p-2.5 rounded-xl border border-cyan-100">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-cyan-900 font-mono">Modul Lalu Lintas Barang:</span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-cyan-200">
                {[
                  { id: 'all', label: 'Semua Modul LLB' },
                  { id: 'perizinan', label: 'Perizinan Industri & Dagang (DS 3)' },
                  { id: 'bulanan', label: 'Arus Inbound & Outbound (DS 6 & 7)' },
                  { id: 'sla', label: 'Kinerja SLA Layanan (DS 8 & 9)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setLlbSubTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      llbSubTab === tab.id
                        ? 'bg-cyan-700 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {onNavigateToFullDashboard && (
              <button
                onClick={() => onNavigateToFullDashboard('dit-lalu-lintas-barang')}
                className="text-xs font-bold text-cyan-800 hover:text-cyan-950 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-cyan-200"
              >
                <span>Dashboard Penuh Unit</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Components Grid */}
          <div className="space-y-4">
            {(llbSubTab === 'all' || llbSubTab === 'perizinan') && (
              <LlbPerizinanConsolidatedCard
                onOpenFormulaModal={onOpenFormulaModal}
              />
            )}

            {(llbSubTab === 'all' || llbSubTab === 'bulanan') && (
              <LlbPenerbitanBulananSheetSwap
                onOpenFormulaModal={onOpenFormulaModal}
              />
            )}

            {(llbSubTab === 'all' || llbSubTab === 'sla') && (
              <LlbSlaLayananCard
                onOpenFormulaModal={onOpenFormulaModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
