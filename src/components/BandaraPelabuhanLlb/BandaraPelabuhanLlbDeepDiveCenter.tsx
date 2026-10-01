import React, { useState } from 'react';
import {
  Plane,
  Anchor,
  Truck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { BandaraFilterState } from '../PengelolaanBandara/types';

// Components Dit. Pengelolaan Kawasan Bandara
import { Dataset1PnbpBandaraCard } from '../PengelolaanBandara/Dataset1PnbpBandaraCard';
import { Dataset2ArusLaluLintasUdaraCard } from '../PengelolaanBandara/Dataset2ArusLaluLintasUdaraCard';
import { Dataset5EmpuKargoCard } from '../PengelolaanBandara/Dataset5EmpuKargoCard';
import { Dataset9RuteLangsungCard } from '../PengelolaanBandara/Dataset9RuteLangsungCard';
import { OperatorFlightChart } from '../PengelolaanBandara/OperatorFlightChart';

// Components Dit. Pengelolaan Kepelabuhanan
import { PelabuhanPnbpBelanjaCard } from '../Kepelabuhanan/PelabuhanPnbpBelanjaCard';
import { PelabuhanKunjunganKapalCard } from '../Kepelabuhanan/PelabuhanKunjunganKapalCard';
import { PelabuhanArusBarangSheetSwap } from '../Kepelabuhanan/PelabuhanArusBarangSheetSwap';
import { PelabuhanDermagaPeruntukanCard } from '../Kepelabuhanan/PelabuhanDermagaPeruntukanCard';
import { PelabuhanPenumpangCard } from '../Kepelabuhanan/PelabuhanPenumpangCard';

// Components Dit. Lalu Lintas Barang
import { LlbPerizinanConsolidatedCard } from '../LaluLintasBarang/LlbPerizinanConsolidatedCard';
import { LlbPenerbitanBulananSheetSwap } from '../LaluLintasBarang/LlbPenerbitanBulananSheetSwap';
import { LlbSlaLayananCard } from '../LaluLintasBarang/LlbSlaLayananCard';

interface BandaraPelabuhanLlbDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
}

export const BandaraPelabuhanLlbDeepDiveCenter: React.FC<
  BandaraPelabuhanLlbDeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
  onOpenFormulaModal = (_kpiId?: string) => {},
  onNavigateToFullDashboard,
}) => {
  // Sub-tabs for Kawasan Bandara (Default: 'pnbp', tanpa opsi 'all')
  const [bandaraSubTab, setBandaraSubTab] = useState<
    'pnbp' | 'arus_udara' | 'kargo' | 'rute' | 'operator'
  >('pnbp');

  // Sub-tabs for Kepelabuhanan (Default: 'pnbp', tanpa opsi 'all')
  const [pelabuhanSubTab, setPelabuhanSubTab] = useState<
    'pnbp' | 'kapal' | 'arus_barang' | 'dermaga' | 'penumpang'
  >('pnbp');

  // Sub-tabs for Lalu Lintas Barang (Default: 'perizinan', tanpa opsi 'all')
  const [llbSubTab, setLlbSubTab] = useState<
    'perizinan' | 'bulanan' | 'sla'
  >('perizinan');

  // Default filters for Bandara Dataset 2
  const bandaraFilters: BandaraFilterState = {
    tahun: '2025',
    jenisPenerbangan: 'Semua',
    arahPergerakan: 'Semua',
    kategoriOperator: 'Semua',
    jenisPnbp: 'Semua',
    searchQuery: '',
  };

  return (
    <div
      id="bandara-pelabuhan-deep-dive-section"
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-5 font-sans"
    >
      {/* 1. Header with Tab Switcher for 3 Units */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#002B49] to-[#0A3D62] text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                EXECUTIVE DEEP-DIVE
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Buku Satu Data BP Batam (46 Dataset)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Unit Deep-Dive Center: Bandara, Pelabuhan &amp; Lalu Lintas Barang
            </h3>
          </div>
        </div>

        {/* 3 Unit Selection Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectUnit('dit-bandara')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedUnitId === 'dit-bandara'
                ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plane className="w-4 h-4 text-emerald-600" />
            <span>Kawasan Bandara (12 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-pelabuhan')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedUnitId === 'dit-pelabuhan'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Anchor className="w-4 h-4 text-blue-600" />
            <span>Kepelabuhanan (25 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-lalu-lintas-barang')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedUnitId === 'dit-lalu-lintas-barang'
                ? 'bg-white text-amber-800 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-4 h-4 text-amber-600" />
            <span>Lalu Lintas Barang (9 DS)</span>
          </button>
        </div>
      </div>

      {/* 2. SUB-SECTION CONTENT FOR CHOSEN UNIT */}

      {/* ================================================================ */}
      {/* UNIT 1: DIREKTORAT PENGELOLAAN KAWASAN BANDARA (12 DATASET)      */}
      {/* (Opsi Semua Modul Dihapus, Tampilkan Sheet Terpilih Saja)        */}
      {/* ================================================================ */}
      {selectedUnitId === 'dit-bandara' && (
        <div className="space-y-4">
          {/* Sub-bar Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-mono font-bold text-emerald-900 uppercase px-1">
                Pilih Sheet:
              </span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-emerald-200">
                {[
                  { id: 'pnbp', label: 'PNBP Bandara (DS 1)' },
                  { id: 'arus_udara', label: 'Arus Penerbangan (DS 2)' },
                  { id: 'kargo', label: 'Kargo EMPU (DS 5)' },
                  { id: 'rute', label: 'Rute Langsung (DS 9)' },
                  { id: 'operator', label: 'Maskapai & Operator' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setBandaraSubTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      bandaraSubTab === tab.id
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
                onClick={() => onNavigateToFullDashboard('pengelolaan-bandara')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-emerald-200"
              >
                <span>Dashboard Penuh Unit</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Active Sheet Display */}
          <div className="space-y-4">
            {bandaraSubTab === 'pnbp' && (
              <Dataset1PnbpBandaraCard
                onOpenFormula={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
              />
            )}

            {bandaraSubTab === 'arus_udara' && (
              <Dataset2ArusLaluLintasUdaraCard
                filters={bandaraFilters}
                onOpenFormula={() => onOpenFormulaModal('ikp-1-ikm-gabungan')}
              />
            )}

            {bandaraSubTab === 'kargo' && (
              <Dataset5EmpuKargoCard
                onOpenFormula={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
              />
            )}

            {bandaraSubTab === 'rute' && (
              <Dataset9RuteLangsungCard
                filters={bandaraFilters}
                onOpenFormula={() => onOpenFormulaModal('ikp-1-ikm-gabungan')}
              />
            )}

            {bandaraSubTab === 'operator' && (
              <OperatorFlightChart
                filters={bandaraFilters}
                onOpenFormulaModal={() => onOpenFormulaModal('ikp-1-ikm-gabungan')}
                onOpenFormula={() => onOpenFormulaModal('ikp-1-ikm-gabungan')}
              />
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* UNIT 2: DIREKTORAT PENGELOLAAN KEPELABUHANAN (25 DATASET)        */}
      {/* (Opsi Semua Modul Dihapus, Tampilkan Sheet Terpilih Saja)        */}
      {/* ================================================================ */}
      {selectedUnitId === 'dit-pelabuhan' && (
        <div className="space-y-4">
          {/* Sub-bar Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-mono font-bold text-blue-900 uppercase px-1">
                Pilih Sheet:
              </span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-blue-200">
                {[
                  { id: 'pnbp', label: 'PNBP & Belanja (DS 3)' },
                  { id: 'kapal', label: 'Kunjungan Kapal (DS 5 & 7)' },
                  { id: 'arus_barang', label: 'Throughput Peti Kemas (DS 12 & 23)' },
                  { id: 'dermaga', label: 'Fasilitas Dermaga (DS 4)' },
                  { id: 'penumpang', label: 'Arus Penumpang (DS 25)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setPelabuhanSubTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      pelabuhanSubTab === tab.id
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
                onClick={() => onNavigateToFullDashboard('kepelabuhanan')}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-blue-200"
              >
                <span>Dashboard Penuh Unit</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Active Sheet Display */}
          <div className="space-y-4">
            {pelabuhanSubTab === 'pnbp' && (
              <PelabuhanPnbpBelanjaCard
                onOpenFormulaModal={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
              />
            )}

            {pelabuhanSubTab === 'kapal' && (
              <PelabuhanKunjunganKapalCard
                onOpenFormulaModal={() => onOpenFormulaModal('ikp-1-ikm-gabungan')}
              />
            )}

            {pelabuhanSubTab === 'arus_barang' && (
              <PelabuhanArusBarangSheetSwap
                onOpenFormulaModal={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
              />
            )}

            {pelabuhanSubTab === 'dermaga' && (
              <PelabuhanDermagaPeruntukanCard
                onOpenFormulaModal={() => onOpenFormulaModal('ikp-1-ikm-gabungan')}
              />
            )}

            {pelabuhanSubTab === 'penumpang' && (
              <PelabuhanPenumpangCard
                onOpenFormulaModal={() => onOpenFormulaModal('ikp-1-ikm-gabungan')}
              />
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* UNIT 3: DIREKTORAT LALU LINTAS BARANG (9 DATASET)                */}
      {/* (Opsi Semua Modul Dihapus, Tampilkan Sheet Terpilih Saja)        */}
      {/* ================================================================ */}
      {selectedUnitId === 'dit-lalu-lintas-barang' && (
        <div className="space-y-4">
          {/* Sub-bar Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-mono font-bold text-amber-900 uppercase px-1">
                Pilih Sheet:
              </span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-amber-200">
                {[
                  { id: 'perizinan', label: 'Perizinan Konsolidasian (DS 3)' },
                  { id: 'bulanan', label: 'Arus Inbound & Outbound (DS 6 & 7)' },
                  { id: 'sla', label: 'Kinerja SLA Layanan (DS 8 & 9)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setLlbSubTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      llbSubTab === tab.id
                        ? 'bg-amber-600 text-white shadow-2xs'
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
                onClick={() => onNavigateToFullDashboard('lalu-lintas-barang')}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-amber-200"
              >
                <span>Dashboard Penuh Unit</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Active Sheet Display */}
          <div className="space-y-4">
            {llbSubTab === 'perizinan' && (
              <LlbPerizinanConsolidatedCard
                onOpenFormulaModal={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
              />
            )}

            {llbSubTab === 'bulanan' && (
              <LlbPenerbitanBulananSheetSwap
                onOpenFormulaModal={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
              />
            )}

            {llbSubTab === 'sla' && (
              <LlbSlaLayananCard
                onOpenFormulaModal={() => onOpenFormulaModal('ikp-1-ikm-gabungan')}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
