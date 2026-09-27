import React, { useState } from 'react';
import {
  Building2,
  Users,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  Database,
  Layers,
  ArrowUpRight,
  FileCode2,
  Filter,
  CheckCircle2,
  ExternalLink,
  Coins,
  Scale,
  Award,
  GraduationCap,
  ShieldCheck,
  Activity,
  FileSpreadsheet,
} from 'lucide-react';
import { LraBluCard } from '../BiroKeuangan/LraBluCard';
import { LaporanFinansialBlu4WayCard } from '../BiroKeuangan/LaporanFinansialBlu4WayCard';
import { SaldoBankRealTimeCard } from '../BiroKeuangan/SaldoBankRealTimeCard';
import { PenerimaanSumberDanaCard } from '../BiroKeuangan/PenerimaanSumberDanaCard';
import { PiutangTakTertagihCard } from '../BiroKeuangan/PiutangTakTertagihCard';
import { SurplusDefisitUnitCard } from '../BiroKeuangan/SurplusDefisitUnitCard';

import { SistemMeritCard } from '../BiroSDM/SistemMeritCard';
import { StatusKepegawaianCard } from '../BiroSDM/StatusKepegawaianCard';
import { PendidikanPegawaiCard } from '../BiroSDM/PendidikanPegawaiCard';
import { SdmKpiCards } from '../BiroSDM/SdmKpiCards';
import { SDM_DATA_BY_YEAR, DEFAULT_SDM_FILTERS } from '../BiroSDM/sdmData';

import { OkmrTableauDashboard } from '../BiroOrganisasi/OkmrTableauDashboard';
import { DEFAULT_BOKMR_FILTERS } from '../BiroOrganisasi/bokmrData';

interface AdministrasiKeuanganDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const AdministrasiKeuanganDeepDiveCenter: React.FC<
  AdministrasiKeuanganDeepDiveCenterProps
> = ({ selectedUnitId, onSelectUnit, onOpenFormulaModal }) => {
  // Sub-tabs for Biro Keuangan view
  const [keuanganSubTab, setKeuanganSubTab] = useState<
    'all' | 'lra' | 'surplus' | 'kas_bank' | 'sumber_dana' | 'piutang'
  >('all');

  // Sub-tabs for Biro SDM view
  const [sdmSubTab, setSdmSubTab] = useState<
    'all' | 'merit' | 'status' | 'pendidikan'
  >('all');

  // Data for SDM components
  const sdmYearData = SDM_DATA_BY_YEAR[2026] || SDM_DATA_BY_YEAR[2025];

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
                Buku Satu Data BP Batam
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Unit Deep-Dive Center: Administrasi, Keuangan &amp; Tata Kelola
            </h3>
          </div>
        </div>

        {/* 3 Unit Selection Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectUnit('biro-keuangan')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedUnitId === 'biro-keuangan'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Biro Keuangan (28 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('biro-sdm')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedUnitId === 'biro-sdm'
                ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Biro SDM (13 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('biro-organisasi')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedUnitId === 'biro-organisasi'
                ? 'bg-white text-cyan-800 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-cyan-600" />
            <span>Biro OKMR (18 DS)</span>
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC WORKSPACE PER SELECTED UNIT */}

      {/* UNIT 1: BIRO KEUANGAN */}
      {selectedUnitId === 'biro-keuangan' && (
        <div className="space-y-4">
          {/* Sub-filter Bar for Biro Keuangan */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setKeuanganSubTab('all')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  keuanganSubTab === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Semua Visualisasi
              </button>
              <button
                onClick={() => setKeuanganSubTab('lra')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  keuanganSubTab === 'lra'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                LRA BLU &amp; Pendapatan
              </button>
              <button
                onClick={() => setKeuanganSubTab('surplus')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  keuanganSubTab === 'surplus'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Surplus/Defisit Satker
              </button>
              <button
                onClick={() => setKeuanganSubTab('kas_bank')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  keuanganSubTab === 'kas_bank'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Saldo Kas &amp; Bank
              </button>
              <button
                onClick={() => setKeuanganSubTab('sumber_dana')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  keuanganSubTab === 'sumber_dana'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Penerimaan Sumber Dana
              </button>
              <button
                onClick={() => setKeuanganSubTab('piutang')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  keuanganSubTab === 'piutang'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Piutang &amp; Aging
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Opini BPK WTP • IKPA 96.25</span>
            </div>
          </div>

          {/* Render Components */}
          {(keuanganSubTab === 'all' || keuanganSubTab === 'lra') && (
            <LraBluCard onOpenFormulaModal={onOpenFormulaModal} />
          )}

          {(keuanganSubTab === 'all' || keuanganSubTab === 'surplus') && (
            <SurplusDefisitUnitCard />
          )}

          {keuanganSubTab === 'all' && (
            <LaporanFinansialBlu4WayCard />
          )}

          {(keuanganSubTab === 'all' || keuanganSubTab === 'kas_bank') && (
            <SaldoBankRealTimeCard />
          )}

          {(keuanganSubTab === 'all' || keuanganSubTab === 'sumber_dana') && (
            <PenerimaanSumberDanaCard />
          )}

          {(keuanganSubTab === 'all' || keuanganSubTab === 'piutang') && (
            <PiutangTakTertagihCard />
          )}
        </div>
      )}

      {/* UNIT 2: BIRO SUMBER DAYA MANUSIA */}
      {selectedUnitId === 'biro-sdm' && (
        <div className="space-y-4">
          {/* Sub-filter Bar for Biro SDM */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setSdmSubTab('all')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  sdmSubTab === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Semua Visualisasi SDM
              </button>
              <button
                onClick={() => setSdmSubTab('merit')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  sdmSubTab === 'merit'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Sistem Merit (8 Aspek)
              </button>
              <button
                onClick={() => setSdmSubTab('status')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  sdmSubTab === 'status'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Status Kepegawaian
              </button>
              <button
                onClick={() => setSdmSubTab('pendidikan')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  sdmSubTab === 'pendidikan'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Kualifikasi Pendidikan
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Total: 2.978 Pegawai (Pria 60.3% | Wanita 39.7%)</span>
            </div>
          </div>

          {/* SDM KPI Cards */}
          <SdmKpiCards
            data={sdmYearData}
            onOpenFormulaModal={() => onOpenFormulaModal?.('ikp-2-merit')}
          />

          {/* 8 Aspek Sistem Merit Card */}
          {(sdmSubTab === 'all' || sdmSubTab === 'merit') && (
            <SistemMeritCard
              aspekList={sdmYearData?.sistemMerit?.aspekList || []}
              datasetRow={sdmYearData?.sistemMerit?.datasetRow}
              tahun={sdmYearData?.tahun || 2026}
              onOpenFormulaModal={() => onOpenFormulaModal?.('ikp-2-merit')}
            />
          )}

          {/* Demographic & Education Grid */}
          {(sdmSubTab === 'all' || sdmSubTab === 'status' || sdmSubTab === 'pendidikan') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {(sdmSubTab === 'all' || sdmSubTab === 'status') && (
                <StatusKepegawaianCard
                  data={sdmYearData?.statusKepegawaian || []}
                  totalPegawai={sdmYearData?.totalPegawai || 2978}
                />
              )}
              {(sdmSubTab === 'all' || sdmSubTab === 'pendidikan') && (
                <PendidikanPegawaiCard
                  data={sdmYearData?.pendidikan || []}
                  totalPegawai={sdmYearData?.totalPegawai || 2978}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* UNIT 3: BIRO ORGANISASI, KEPATUHAN DAN MANAJEMEN RISIKO */}
      {selectedUnitId === 'biro-organisasi' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <ShieldAlert className="w-4 h-4 text-cyan-600" />
              <span>Dashboard Terintegrasi Biro OKMR (18 Dataset Buku Satu Data BP Batam)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span>SAKIP: 82.68 (A) • SPIP: 3.42 • PEKPPP: 4.38 • MRI: 3.65</span>
            </div>
          </div>

          {/* Embedded Tableau Dashboard suite from Biro Organisasi */}
          <OkmrTableauDashboard
            filters={DEFAULT_BOKMR_FILTERS}
            onOpenFormulaModal={(idx) => onOpenFormulaModal?.(idx === 17 ? 'ikp-3-spip' : 'ikp-1-rb')}
          />
        </div>
      )}
    </div>
  );
};
