import React, { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  Award,
  CheckCircle2,
  PieChart as PieIcon,
  MessageSquare,
  FileCheck,
  TrendingDown,
  TrendingUp,
  Target,
  ArrowRight,
  ShieldCheck,
  Layers,
  Sparkles,
  ChevronRight,
  Check,
  Building,
  UserCheck,
  BarChart3,
  Gauge,
  HelpCircle,
} from 'lucide-react';
import {
  SAKIP_COMPONENTS_DATA,
  TOTAL_NILAI_SAKIP,
  PREDIKAT_SAKIP,
  SPIP_MATURITAS_ITEMS,
  SKOR_AGREGAT_SPIP,
  PIAGAM_RISIKO_DATA,
  PENYELESAIAN_REKOMENDASI_BLU,
  MODERNISASI_BLU_DATA,
  PENGADUAN_BADAN_USAHA_DATA,
  SKM_KATEGORI_DATA,
  PEKPPP_DATA,
  SOP_BOKMR_SUMMARY,
  KONTRAK_KINERJA_IKU_DATA,
  ANJAB_ABK_DATA,
  MRI_DATA,
} from './bokmrData';
import { BokmrFilterState } from './types';

interface OkmrVisualizerSuiteProps {
  filters: BokmrFilterState;
  onOpenFormulaModal?: (datasetIndex: number) => void;
}

type VisualTab = 'risiko_matrix' | 'sakip_radar' | 'spip_unsur' | 'blu_dewas' | 'pengaduan_skm' | 'iku_sop';

export const OkmrVisualizerSuite: React.FC<OkmrVisualizerSuiteProps> = ({
  filters,
  onOpenFormulaModal,
}) => {
  const [activeTab, setActiveTab] = useState<VisualTab>('risiko_matrix');
  const [selectedRiskUnit, setSelectedRiskUnit] = useState<number>(0);
  const [selectedSakipId, setSelectedSakipId] = useState<string>('perencanaan_kinerja');
  const [selectedSpipIndex, setSelectedSpipIndex] = useState<number>(0);

  const currentRisk = PIAGAM_RISIKO_DATA[selectedRiskUnit] || PIAGAM_RISIKO_DATA[0];
  const currentSakip = SAKIP_COMPONENTS_DATA.find((c) => c.id === selectedSakipId) || SAKIP_COMPONENTS_DATA[0];
  const currentSpip = SPIP_MATURITAS_ITEMS[selectedSpipIndex] || SPIP_MATURITAS_ITEMS[0];

  // Helper calculation for risk reduction
  const riskReductionPct = (
    ((currentRisk.besaranRisikoAwalTahun - currentRisk.besaranRisikoAkhirTahun) /
      currentRisk.besaranRisikoAwalTahun) *
    100
  ).toFixed(1);

  // Total risk aggregation
  const totalAwal = PIAGAM_RISIKO_DATA.reduce((acc, r) => acc + r.besaranRisikoAwalTahun, 0);
  const totalAkhir = PIAGAM_RISIKO_DATA.reduce((acc, r) => acc + r.besaranRisikoAkhirTahun, 0);
  const aggregateRiskDrop = (((totalAwal - totalAkhir) / totalAwal) * 100).toFixed(1);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* HEADER SECTION: CLEAN & SCANNABLE */}
      <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-indigo-50/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800 font-mono">
                SUITE VISUALISASI EKSEKUTIF
              </span>
              <span className="text-xs text-slate-400">Atribut Resmi Satu Data Hal. 38 - 40</span>
            </div>
            <h3 className="text-base md:text-lg font-black text-slate-900 tracking-tight">
              Visualisasi Kinerja Tata Kelola, Kepatuhan & Manajemen Risiko
            </h3>
          </div>

          {/* TAB SELECTOR PILLS */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            {[
              { id: 'risiko_matrix', label: 'Peta Panas Risiko 5x5', icon: ShieldAlert, badge: 'DS #14 & #18' },
              { id: 'sakip_radar', label: 'Akuntabilitas SAKIP', icon: Activity, badge: 'DS #2' },
              { id: 'spip_unsur', label: '5 Unsur SPIP', icon: ShieldCheck, badge: 'DS #17' },
              { id: 'blu_dewas', label: 'Pengawasan BLU', icon: PieIcon, badge: 'DS #6 & #7' },
              { id: 'pengaduan_skm', label: 'Pengaduan & SKM', icon: MessageSquare, badge: 'DS #10 & #11' },
              { id: 'iku_sop', label: 'Kontrak IKU & SOP', icon: Target, badge: 'DS #5 & #1' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as VisualTab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT VIEWPORT */}
      <div className="p-5 md:p-6">
        {/* ========================================================================= */}
        {/* TAB 1: PETA PANAS RISIKO 5X5 & RESIDUAL RISK REDUCTION (DATASET #14 & #18) */}
        {/* ========================================================================= */}
        {activeTab === 'risiko_matrix' && (
          <div className="space-y-6">
            {/* TOP BAR: AGGREGATE SUMMARY STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                    Risiko Awal (Inherent)
                  </span>
                  <span className="text-xl font-black text-rose-900 font-mono">
                    {totalAwal} Poin
                  </span>
                  <span className="text-[10px] text-rose-600 block mt-0.5">Zona Merah & Oranye</span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Risiko Akhir (Residual)
                  </span>
                  <span className="text-xl font-black text-emerald-900 font-mono">
                    {totalAkhir} Poin
                  </span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">Zona Kuning & Hijau</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                    Penurunan Risiko
                  </span>
                  <span className="text-xl font-black text-indigo-900 font-mono">
                    -{aggregateRiskDrop}%
                  </span>
                  <span className="text-[10px] text-indigo-600 block mt-0.5">Mitigasi Pengendalian Terkendali</span>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                  <TrendingDown className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-sky-100 bg-sky-50/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                    Indeks MRI BP Batam
                  </span>
                  <span className="text-xl font-black text-sky-900 font-mono">
                    {MRI_DATA.skor.toFixed(2)} <span className="text-xs font-normal text-sky-600">/ 5.00</span>
                  </span>
                  <span className="text-[10px] text-sky-700 font-semibold block mt-0.5">{MRI_DATA.level}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* MAIN TWO-COLUMN VISUALIZER: 5X5 HEATMAP & UNIT REDUCTION HERO */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT: INTERACTIVE 5X5 RISK HEATMAP (7 COLS) */}
              <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Matriks Peta Panas Risiko 5x5 (Dampak vs Kemungkinan)
                    </h4>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">Standar BPKP / ISO 31000</span>
                </div>

                {/* 5X5 GRID MATRIX */}
                <div className="relative pt-2">
                  <div className="flex">
                    {/* Y-AXIS LABEL (KEMUNGKINAN / PROBABILITY) */}
                    <div className="w-7 flex flex-col justify-between items-center text-[10px] font-black text-slate-400 py-2">
                      <span>5</span>
                      <span>4</span>
                      <span>3</span>
                      <span>2</span>
                      <span>1</span>
                    </div>

                    {/* 5X5 CELLS */}
                    <div className="flex-1 grid grid-cols-5 gap-1.5">
                      {[
                        // Row 5 (Likelihood = 5)
                        { score: 5, col: 'bg-amber-100/90 text-amber-800' },
                        { score: 10, col: 'bg-amber-200 text-amber-900' },
                        { score: 15, col: 'bg-orange-300 text-orange-950 font-black' },
                        { score: 20, col: 'bg-rose-500 text-white font-black' },
                        { score: 25, col: 'bg-rose-700 text-white font-black' },

                        // Row 4 (Likelihood = 4)
                        { score: 4, col: 'bg-emerald-100 text-emerald-800' },
                        { score: 8, col: 'bg-amber-100 text-amber-800' },
                        { score: 12, col: 'bg-amber-200 text-amber-900' },
                        { score: 16, col: 'bg-orange-400 text-white font-black' },
                        { score: 20, col: 'bg-rose-500 text-white font-black' },

                        // Row 3 (Likelihood = 3)
                        { score: 3, col: 'bg-emerald-100 text-emerald-800' },
                        { score: 6, col: 'bg-emerald-200 text-emerald-900' },
                        { score: 9, col: 'bg-amber-200 text-amber-900' },
                        { score: 12, col: 'bg-amber-200 text-amber-900' },
                        { score: 15, col: 'bg-orange-300 text-orange-950 font-black' },

                        // Row 2 (Likelihood = 2)
                        { score: 2, col: 'bg-emerald-100 text-emerald-800' },
                        { score: 4, col: 'bg-emerald-100 text-emerald-800' },
                        { score: 6, col: 'bg-emerald-200 text-emerald-900' },
                        { score: 8, col: 'bg-amber-100 text-amber-800' },
                        { score: 10, col: 'bg-amber-200 text-amber-900' },

                        // Row 1 (Likelihood = 1)
                        { score: 1, col: 'bg-emerald-100 text-emerald-800' },
                        { score: 2, col: 'bg-emerald-100 text-emerald-800' },
                        { score: 3, col: 'bg-emerald-100 text-emerald-800' },
                        { score: 4, col: 'bg-emerald-100 text-emerald-800' },
                        { score: 5, col: 'bg-amber-100/90 text-amber-800' },
                      ].map((cell, idx) => (
                        <div
                          key={idx}
                          className={`h-11 rounded-lg flex flex-col items-center justify-center text-xs font-mono transition-transform hover:scale-105 relative cursor-default ${cell.col}`}
                        >
                          <span className="font-bold opacity-80">{cell.score}</span>
                          {/* HIGHLIGHT INDICATOR IF MATCHING CURRENT SELECTED RISK */}
                          {cell.score === currentRisk.besaranRisikoAwalTahun && (
                            <span
                              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[9px] font-black shadow-xs ring-2 ring-white"
                              title="Posisi Risiko Awal Tahun (Inherent)"
                            >
                              A
                            </span>
                          )}
                          {cell.score === currentRisk.besaranRisikoAkhirTahun && (
                            <span
                              className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black shadow-xs ring-2 ring-white"
                              title="Posisi Risiko Akhir Tahun (Residual)"
                            >
                              R
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* X-AXIS LABELS (DAMPAK / IMPACT) */}
                  <div className="flex pl-7 justify-between items-center text-[10px] font-black text-slate-400 pt-1.5 px-2">
                    <span>1 (Ringan)</span>
                    <span>2 (Minor)</span>
                    <span>3 (Sedang)</span>
                    <span>4 (Signifikan)</span>
                    <span>5 (Bencana)</span>
                  </div>
                </div>

                {/* LEGEND PALETTE */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/80 text-[10px] font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Rendah (1 - 5)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Sedang (6 - 12)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span>Tinggi (13 - 19)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <span>Sangat Tinggi (20 - 25)</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: UNIT RISK DRILLDOWN & SLOPE REDUCTION (5 COLS) */}
              <div className="lg:col-span-5 space-y-4">
                {/* SELECTOR PILLS FOR 5 UNITS */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Pilih Unit Kerja Piagam Risiko (Dataset #14)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PIAGAM_RISIKO_DATA.map((risk, idx) => {
                      const isSelected = selectedRiskUnit === idx;
                      return (
                        <button
                          key={risk.nomorPiagam}
                          onClick={() => setSelectedRiskUnit(idx)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {risk.unitKerja.replace('Badan Usaha ', 'BU ')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SELECTED UNIT VISUAL CARD */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-600 block">
                        {currentRisk.nomorPiagam}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 mt-0.5">
                        {currentRisk.unitKerja}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 font-medium line-clamp-1" title={currentRisk.kejadianRisiko}>
                        Risiko: {currentRisk.kejadianRisiko}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                      {currentRisk.statusMitigasi}
                    </span>
                  </div>

                  {/* VISUAL SLIDER: AWAL (RED) -> AKHIR (GREEN) */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-baseline text-xs mb-1">
                        <span className="font-bold text-rose-700">Awal Tahun (Inherent):</span>
                        <span className="font-black text-rose-900 font-mono">
                          {currentRisk.besaranRisikoAwalTahun} / 25 ({currentRisk.levelAwal})
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full transition-all duration-500"
                          style={{ width: `${(currentRisk.besaranRisikoAwalTahun / 25) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline text-xs mb-1">
                        <span className="font-bold text-emerald-700">Akhir Tahun (Residual):</span>
                        <span className="font-black text-emerald-900 font-mono">
                          {currentRisk.besaranRisikoAkhirTahun} / 25 ({currentRisk.levelAkhir})
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${(currentRisk.besaranRisikoAkhirTahun / 25) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* REDUCTION SUMMARY CALLOUT */}
                  <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-indigo-600 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-indigo-700 block">Efektivitas Mitigasi</span>
                        <span className="text-xs text-slate-700 font-medium">Penurunan Tingkat Risiko</span>
                      </div>
                    </div>
                    <span className="text-lg font-black text-indigo-950 font-mono">
                      -{riskReductionPct}%
                    </span>
                  </div>

                  {/* ACTION MITIGATION PILL */}
                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <strong className="text-slate-800">Tindakan Mitigasi: </strong>
                    {currentRisk.mitigasiUtama}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: AKUNTABILITAS SAKIP & 4 PILAR (DATASET #2 - HAL. 38) */}
        {/* ========================================================================= */}
        {activeTab === 'sakip_radar' && (
          <div className="space-y-6">
            {/* HERO SCORE & OVERVIEW */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/30 text-indigo-300 font-mono">
                  DATASET NO. 2 (HAL. 38)
                </span>
                <h4 className="text-lg font-black tracking-tight">
                  Evaluasi Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP)
                </h4>
                <p className="text-xs text-slate-300 max-w-xl">
                  Berdasarkan PermenPAN-RB No. 88/2021 dengan total nilai evaluasi mencapai 82.68 poin dari target 80.00.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white/10 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-xs">
                <div className="text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200 block">
                    Total Nilai
                  </span>
                  <span className="text-3xl font-black font-mono text-white">
                    {TOTAL_NILAI_SAKIP.toFixed(2)}
                  </span>
                </div>
                <div className="h-10 w-[1px] bg-white/20" />
                <div className="text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200 block">
                    Predikat
                  </span>
                  <span className="text-xl font-black text-amber-300">
                    {PREDIKAT_SAKIP}
                  </span>
                </div>
              </div>
            </div>

            {/* 4 SAKIP COMPONENTS COMPARATIVE BARS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SAKIP_COMPONENTS_DATA.map((comp) => {
                const isSelected = comp.id === selectedSakipId;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedSakipId(comp.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-slate-900 line-clamp-1">
                        {comp.komponen}
                      </span>
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold text-[10px] font-mono">
                        {comp.tingkatAkuntabilitas}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between mt-2">
                      <span className="text-2xl font-black text-slate-900 font-mono">
                        {comp.nilai.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Bobot {comp.bobot}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2.5">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${comp.capaianPersen}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-semibold">
                      <span>Capaian Efektivitas</span>
                      <span className="text-emerald-700 font-bold">{comp.capaianPersen.toFixed(1)}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* SUB-KOMPONEN DRILLDOWN CARDS */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Rincian Sub-Komponen: {currentSakip.komponen}
                  </h4>
                </div>
                <span className="text-xs font-bold text-indigo-700 font-mono">
                  Realisasi: {currentSakip.nilai.toFixed(2)} / {currentSakip.bobot.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                {currentSakip.subKomponen.map((sub, idx) => {
                  const pct = (sub.nilai / sub.bobot) * 100;
                  return (
                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 line-clamp-1" title={sub.nama}>
                          {sub.nama}
                        </span>
                        <span className="font-black text-indigo-900 font-mono ml-2 shrink-0">
                          {sub.nilai.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>Bobot: {sub.bobot.toFixed(1)}</span>
                        <span>{pct.toFixed(1)}% Capaian</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: 5 UNSUR MATURITAS SPIP (DATASET #17 - HAL. 40) */}
        {/* ========================================================================= */}
        {activeTab === 'spip_unsur' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* LEFT: MATURITAS GAUGE CARD (4 COLS) */}
              <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-sm text-center space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  DATASET NO. 17 (HAL. 40)
                </span>
                <h4 className="text-sm font-bold text-slate-200">Indeks Maturitas SPIP Terbobot</h4>
                <div className="py-2">
                  <span className="text-5xl font-black text-white font-mono tracking-tight">
                    {SKOR_AGREGAT_SPIP.toFixed(2)}
                  </span>
                  <span className="text-sm text-slate-400 block mt-1">Skala Maksimum 5.00</span>
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-xs">
                  Level 3 (Terdefinisi / Matur)
                </div>
                <p className="text-[11px] text-slate-300 pt-2 border-t border-white/10">
                  Melampaui Target BPKP RI: <strong>3.20</strong> (+0.22 poin deviasi positif)
                </p>
              </div>

              {/* RIGHT: 5 UNSUR COMPARATIVE BARS (8 COLS) */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    5 Unsur Pengendalian Intern Pemerintah (PP No. 60/2008)
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Target BPKP: 3.20
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {SPIP_MATURITAS_ITEMS.map((item, idx) => {
                    const isSelected = selectedSpipIndex === idx;
                    const pct = (item.skor / 5.0) * 100;
                    return (
                      <div
                        key={item.no}
                        onClick={() => setSelectedSpipIndex(idx)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-500'
                            : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-slate-800">
                            {item.no}. {item.komponenPenilaian}
                          </span>
                          <span className="font-black font-mono text-emerald-800">
                            {item.skor.toFixed(2)} / 5.00
                          </span>
                        </div>

                        <div className="relative w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                          {/* TARGET BENCHMARK LINE (3.20 / 5.00 = 64%) */}
                          <div
                            className="absolute top-0 bottom-0 w-0.5 bg-slate-900"
                            style={{ left: '64%' }}
                            title="Target BPKP: 3.20"
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                          <span>Bobot: {item.bobot}%</span>
                          <span className="text-emerald-700 font-semibold">{item.levelMaturitas}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: PENGAWASAN BLU & MODERNISASI (DATASET #6 & #7 - HAL. 39) */}
        {/* ========================================================================= */}
        {activeTab === 'blu_dewas' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT: 4 ENTITAS PENGAWAS REKOMENDASI BLU */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Penyelesaian Rekomendasi Pengawasan BLU
                    </h4>
                    <span className="text-[10px] text-slate-500">Dataset #6 • Dewan Pengawas, SPI, Komite Audit & Pengelola</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 font-mono">
                    95.8% RATA-RATA
                  </span>
                </div>

                <div className="space-y-3">
                  {PENYELESAIAN_REKOMENDASI_BLU.map((entitas) => (
                    <div key={entitas.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-800">{entitas.entitasPengawas}</span>
                        <span className="font-black font-mono text-indigo-900">
                          {entitas.persentasePenyelesaian}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden my-1.5">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${entitas.persentasePenyelesaian}%`,
                            backgroundColor: entitas.color,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>Selesai: {entitas.rekomendasiSelesai} / {entitas.rekomendasiTotal}</span>
                        <span>Dalam Proses: {entitas.rekomendasiProses}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: MODERNISASI PENGELOLAAN BLU (DATASET #7) */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Penyelesaian Modernisasi Pengelolaan BLU
                    </h4>
                    <span className="text-[10px] text-slate-500">Dataset #7 • Semester I & II Tahun 2026</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                    SEMESTER 2026
                  </span>
                </div>

                <div className="space-y-3">
                  {MODERNISASI_BLU_DATA.map((mod) => (
                    <div key={mod.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-800 line-clamp-1">{mod.inisiatif}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-200 shrink-0 ml-2">
                          {mod.status}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden my-1.5">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${mod.persentase}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>{mod.semester}</span>
                        <span className="font-bold font-mono text-emerald-700">{mod.persentase}% Capaian</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: PENGADUAN MASYARAKAT & SKM (DATASET #10, #11, & #16) */}
        {/* ========================================================================= */}
        {activeTab === 'pengaduan_skm' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT: PENGADUAN MASYARAKAT (DATASET #10) */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Pengaduan Masyarakat Layanan Badan Usaha
                    </h4>
                    <span className="text-[10px] text-slate-500">Dataset #10 • SP4N LAPOR! & Loket Layanan</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 font-mono">
                    96.15% SELESAI
                  </span>
                </div>

                <div className="space-y-2.5">
                  {PENGADUAN_BADAN_USAHA_DATA.map((bu) => (
                    <div key={bu.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-800">{bu.unitPelayanan}</span>
                        <span className="font-bold font-mono text-sky-800">{bu.persentaseSelesai}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden my-1.5">
                        <div
                          className="bg-sky-600 h-full rounded-full"
                          style={{ width: `${bu.persentaseSelesai}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>Diterima: {bu.jmlPengaduanDiterima} • Selesai: {bu.jmlPengaduanSelesai}</span>
                        <span>SLA: {bu.waktuRataRataPenyelesaian}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: SKM 6 INDIKATOR LAYANAN (DATASET #11) */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Hasil Survei Kepuasan Masyarakat (SKM)
                    </h4>
                    <span className="text-[10px] text-slate-500">Dataset #11 • Skala Nilai 1.00 s/d 4.00</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 font-mono">
                    MUTU A (SANGAT BAIK)
                  </span>
                </div>

                <div className="space-y-2.5">
                  {SKM_KATEGORI_DATA.map((skm) => (
                    <div key={skm.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-800 line-clamp-1">{skm.kategori}</span>
                        <span className="font-black font-mono text-amber-900">{skm.nilai.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden my-1.5">
                        <div
                          className="bg-amber-500 h-full rounded-full"
                          style={{ width: `${(skm.nilai / 4.0) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>{skm.unitUsaha.replace('Direktorat ', '')}</span>
                        <span className="font-bold text-amber-800 font-mono">{skm.persentase}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: KONTRAK KINERJA IKU & SOP PROSES BISNIS (DATASET #5 & #1) */}
        {/* ========================================================================= */}
        {activeTab === 'iku_sop' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT: PEMENUHAN KONTRAK KINERJA IKU (DATASET #5) */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Pemenuhan Kontrak Kinerja IKU Unit Kerja
                    </h4>
                    <span className="text-[10px] text-slate-500">Dataset #5 • Evaluasi Capaian Triwulan I 2026</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 font-mono">
                    102.5% RATA-RATA
                  </span>
                </div>

                <div className="space-y-3">
                  {KONTRAK_KINERJA_IKU_DATA.map((kki) => (
                    <div key={kki.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div>
                          <span className="font-black text-slate-900">{kki.unitKerja}</span>
                          <span className="text-[11px] text-slate-500 block">{kki.iku}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                          {kki.capaianPersen}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden my-2">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${Math.min(kki.capaianPersen, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>Target: {kki.targetNilaiIku.toLocaleString('id-ID')}</span>
                        <span>Realisasi: {kki.nilaiRealisasiIku.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: PROSES BISNIS & SOP (DATASET #1 & #13) */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Kepatuhan SOP & Anjab ABK BP Batam
                    </h4>
                    <span className="text-[10px] text-slate-500">Dataset #1 & Dataset #13 • Integrasi SPBE</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 font-mono">
                    94.92% PATUH
                  </span>
                </div>

                {/* SOP METRIC CARDS */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-teal-50/60 border border-teal-200 rounded-xl">
                    <span className="text-[10px] font-bold text-teal-700 uppercase block">Total SOP Terdaftar</span>
                    <span className="text-2xl font-black text-teal-950 font-mono">{SOP_BOKMR_SUMMARY.totalSopTerdaftar}</span>
                    <span className="text-[10px] text-teal-600 block mt-0.5">Level 0 s.d Level 3</span>
                  </div>
                  <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase block">SOP Terverifikasi Aktif</span>
                    <span className="text-2xl font-black text-emerald-950 font-mono">{SOP_BOKMR_SUMMARY.sopTerverifikasiAktif}</span>
                    <span className="text-[10px] text-emerald-600 block mt-0.5">Kepatuhan 94.92%</span>
                  </div>
                </div>

                {/* ANJAB ABK SUMMARY TABLE */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-800 block mb-2">
                    Analisa Jabatan & Beban Kerja (Dataset #13)
                  </span>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 font-bold text-[10.5px]">
                          <th className="p-2">Jabatan</th>
                          <th className="p-2 text-center">Butuh</th>
                          <th className="p-2 text-center">Ada</th>
                          <th className="p-2 text-right">Beban Kerja</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-[11px]">
                        {ANJAB_ABK_DATA.map((abk) => (
                          <tr key={abk.id}>
                            <td className="p-2 font-semibold text-slate-900">{abk.namaJabatan}</td>
                            <td className="p-2 text-center font-mono">{abk.jumlahPegawaiDibutuhkan}</td>
                            <td className="p-2 text-center font-mono">{abk.jumlahPegawaiEksisting}</td>
                            <td className="p-2 text-right font-mono font-bold text-indigo-700">
                              {abk.bebanKerjaPersen}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
