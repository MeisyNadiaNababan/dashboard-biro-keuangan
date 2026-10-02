import React from 'react';
import {
  FileText,
  Scale,
  Server,
  Building2,
  CheckCircle2,
  HelpCircle,
  ArrowUpRight,
  TrendingUp,
  Layers,
  Sparkles,
  ShieldCheck,
  FileCheck2,
  FolderKanban,
  Clock,
  Compass,
  Database,
  Lock,
  MessageSquare,
  Award,
} from 'lucide-react';
import { IKP_METRICS_LIST, PERKIN_METADATA } from './kebijakanStrategisData';

interface KebijakanStrategisKpiRowProps {
  onOpenFormulaModal?: (kpiId: string) => void;
  selectedUnit?: string;
  onSelectUnit?: (unitId: string) => void;
}

export const KebijakanStrategisKpiRow: React.FC<KebijakanStrategisKpiRowProps> = ({
  onOpenFormulaModal,
  selectedUnit = 'ALL',
  onSelectUnit,
}) => {
  const [displayMode, setDisplayMode] = React.useState<'all' | 'primary_only' | 'operational_only'>('all');

  const ikpPusren = IKP_METRICS_LIST.find((k) => k.id === 'ikp-1-perencanaan') || IKP_METRICS_LIST[0];
  const ikpHarmonisasi = IKP_METRICS_LIST.find((k) => k.id === 'ikp-2-kebijakan') || IKP_METRICS_LIST[1];
  const ikpPdsi = IKP_METRICS_LIST.find((k) => k.id === 'ikp-3-spbe') || IKP_METRICS_LIST[2];
  const ikpPtsp = IKP_METRICS_LIST.find((k) => k.id === 'ikp-4-ikm-ptsp') || IKP_METRICS_LIST[3];

  return (
    <div className="space-y-3 font-sans">
      {/* Header Bar - Model Tampilan Satker Eksekutif Terpadu (Persis Model DEP-A1 & DEP-A3) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-1">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse" />
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>4 PILAR UNIT KERJA PENGAMPU PERKIN A2 (KEBIJAKAN STRATEGIS &amp; PERIZINAN)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold border border-sky-200">
              KONSOLIDASI 64 DATASET SATU DATA
            </span>
          </h2>
        </div>

        {/* View Toggle: Semua vs Hanya KPI Utama vs Hanya KPI Selain Utama */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setDisplayMode('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              displayMode === 'all'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Indikator
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode('primary_only')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              displayMode === 'primary_only'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>★</span>
            <span>Hanya KPI Utama Perkin</span>
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode('operational_only')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              displayMode === 'operational_only'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>◆</span>
            <span>KPI Selain Utama (Operasional)</span>
          </button>
        </div>
      </div>

      <div className="text-xs text-slate-500 font-medium flex flex-wrap items-center justify-between gap-1">
        <span>
          DIPA Program: <strong className="text-slate-700">Rp 75,87 Miliar</strong> &bull; Sasaran:{' '}
          <strong className="text-emerald-600">{PERKIN_METADATA.sasaranProgram}</strong>
        </span>
        <span className="font-mono text-[11px] text-slate-600">
          Struktur: 4 KPI Utama Perkin + 20 Indikator Operasional Lintas 64 Dataset
        </span>
      </div>

      {/* 4 CONSOLIDATED WORK UNIT KPI CARDS (IDENTIK MODEL KARTU DEP-A1 & DEP-A3) */}
      <div className="grid gap-3.5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {/* ========================================================================= */}
        {/* KARTU 1: PUSAT PERENCANAAN PROGRAM STRATEGIS (PUSREN)                     */}
        {/* ========================================================================= */}
        <div
          className={`bg-white rounded-xl border transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-sky-600 ${
            selectedUnit === 'ALL' || selectedUnit === 'pusat-perencanaan-program' || selectedUnit === 'pusren'
              ? 'border-slate-200/90 shadow-xs hover:shadow-md'
              : 'opacity-60 border-slate-100'
          }`}
        >
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 uppercase">
                    UNIT KERJA 1 &bull; PUSREN
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-sky-700 transition-colors">
                    Pusat Perencanaan Strategis
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikpPusren.capaianPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal?.('ikp-1-perencanaan')}
                  className="p-1 rounded-md text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis IKP 1 Pusren"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: IKP #1 Indeks Perencanaan Pembangunan (KPI Utama Perkin) */}
            {displayMode !== 'operational_only' && (
              <div className="bg-gradient-to-br from-sky-50/70 to-slate-50/90 rounded-lg p-3 border border-sky-100/80 my-3">
                <div className="text-[10px] font-bold text-sky-950 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 font-black text-sky-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                    IKP #1: {ikpPusren.title}
                  </span>
                  <span className="text-[9.5px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    MELAMPAUI TARGET
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                      {ikpPusren.realisasi}
                    </span>
                    <span className="text-xs font-bold text-sky-700">Indeks (IPPN)</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                    <span className="font-bold font-mono text-slate-700">{ikpPusren.target}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-600 to-blue-600"
                    style={{ width: `${Math.min(100, ikpPusren.capaianPersen)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Ringkasan Kinerja Keseluruhan: KPI Selain KPI Utama dari Perkin (Buku Satu Data Hal. 51-53) */}
            {displayMode !== 'primary_only' && (
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="text-[10px] font-bold font-mono text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    <span>KPI SELAIN UTAMA (SATU DATA):</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200">
                    19 Dataset
                  </span>
                </div>

              {/* Metric 1: Dokumen Perencanaan & Kajian Kelayakan */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Rencana Strategis &amp; Kelayakan</div>
                    <div className="text-[10px] text-slate-500 truncate">18 Dokumen (Buku Satu Data Hal. 51)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-sky-700">100%</div>
                  <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-1 py-0.2 rounded border border-sky-200">
                    Selesai
                  </span>
                </div>
              </div>

              {/* Metric 2: Keselarasan RKA & Pagu DIPA */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Keselarasan RKA &amp; Pagu DIPA</div>
                    <div className="text-[10px] text-slate-500 truncate">Alokasi KRO &amp; RO Satker (Hal. 51)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-emerald-700">98.2%</div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    Optimal
                  </span>
                </div>
              </div>

              {/* Metric 3: Masterplan Jalan, Drainase & Utilitas */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <FolderKanban className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Masterplan Jalan &amp; Drainase</div>
                    <div className="text-[10px] text-slate-500 truncate">Peta Spasial Kontur 1M (Hal. 51-52)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-indigo-700">100%</div>
                  <span className="text-[10px] font-mono text-indigo-700 font-bold bg-indigo-50 px-1 py-0.2 rounded border border-indigo-200">
                    Tersusun
                  </span>
                </div>
              </div>

              {/* Metric 4: Capaian Sasaran Renstra BP Batam */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Capaian Sasaran Renstra</div>
                    <div className="text-[10px] text-slate-500 truncate">Monev 5 Tahunan (Hal. 52-53)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-slate-900">92.8%</div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1 py-0.2 rounded">
                    On Track
                  </span>
                </div>
              </div>

              {/* Metric 5: Evaluasi Bappenas (SE PPN 3/2023) */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Evaluasi Perencanaan Bappenas</div>
                    <div className="text-[10px] text-slate-500 truncate">Partisipasi Informasi Anggaran (Hal. 53)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-amber-700">A</div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                    Sangat Baik
                  </span>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Status: Terintegrasi
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectUnit?.('pusat-perencanaan-program')}
                className="font-bold text-sky-700 hover:text-sky-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Analisis Satker Pusren"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal?.('ikp-1-perencanaan')}
                className="text-slate-500 hover:text-sky-700 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual ↗
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KARTU 2: PUSAT HARMONISASI KEBIJAKAN STRATEGIS                            */}
        {/* ========================================================================= */}
        <div
          className={`bg-white rounded-xl border transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-blue-600 ${
            selectedUnit === 'ALL' || selectedUnit === 'pusat-harmonisasi' || selectedUnit === 'harmonisasi'
              ? 'border-slate-200/90 shadow-xs hover:shadow-md'
              : 'opacity-60 border-slate-100'
          }`}
        >
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 uppercase">
                    UNIT KERJA 2 &bull; HARMONISASI
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-blue-700 transition-colors">
                    Pusat Harmonisasi Kebijakan
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikpHarmonisasi.capaianPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal?.('ikp-2-kebijakan')}
                  className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis IKP 2 Harmonisasi"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: IKP #2 Indeks Kualitas Kebijakan (KPI Utama Perkin) */}
            {displayMode !== 'operational_only' && (
              <div className="bg-gradient-to-br from-blue-50/70 to-slate-50/90 rounded-lg p-3 border border-blue-100/80 my-3">
                <div className="text-[10px] font-bold text-blue-950 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 font-black text-blue-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    IKP #2: {ikpHarmonisasi.title}
                  </span>
                  <span className="text-[9.5px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    MELAMPAUI TARGET
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                      {ikpHarmonisasi.realisasi}
                    </span>
                    <span className="text-xs font-bold text-blue-700">Indeks (IKK)</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                    <span className="font-bold font-mono text-slate-700">{ikpHarmonisasi.target}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    style={{ width: `${Math.min(100, ikpHarmonisasi.capaianPersen)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Ringkasan Kinerja Keseluruhan: KPI Selain KPI Utama dari Perkin (Buku Satu Data Hal. 12-13) */}
            {displayMode !== 'primary_only' && (
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="text-[10px] font-bold font-mono text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>KPI SELAIN UTAMA (SATU DATA):</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                    7 Dataset
                  </span>
                </div>

                {/* Metric 1: Harmonisasi Regulasi Perka/Kepka */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Scale className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Harmonisasi Perka / Kepka</div>
                      <div className="text-[10px] text-slate-500 truncate">42 Regulasi Tuntas (Hal. 12 Satu Data)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-blue-700">100%</div>
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                      Tervalidasi
                    </span>
                  </div>
                </div>

                {/* Metric 2: Evaluasi 7 Level Tarif Layanan Badan Usaha */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Evaluasi 7 Level Tarif Layanan</div>
                      <div className="text-[10px] text-slate-500 truncate">Unitcost &amp; Daya Saing (Hal. 13)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-emerald-700">100%</div>
                    <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                      Tuntas
                    </span>
                  </div>
                </div>

                {/* Metric 3: Sinkronisasi Kebijakan Eksternal */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Sinkronisasi Kebijakan K/L</div>
                      <div className="text-[10px] text-slate-500 truncate">36 Dokumen Selaras (Hal. 13)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-indigo-700">96.4%</div>
                    <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-1 py-0.2 rounded border border-indigo-200">
                      Harmonis
                    </span>
                  </div>
                </div>

                {/* Metric 4: Tindak Lanjut Risalah Rapat Pimpinan */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Tindak Lanjut Rapim BP Batam</div>
                      <div className="text-[10px] text-slate-500 truncate">Matriks Eksekusi Cepat (Hal. 13)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-cyan-700">98.1%</div>
                    <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 px-1 py-0.2 rounded border border-cyan-200">
                      SLA Tepat
                    </span>
                  </div>
                </div>

                {/* Metric 5: Survei Kewajaran & Deregulasi Investasi */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Deregulasi Hambatan Usaha</div>
                      <div className="text-[10px] text-slate-500 truncate">Penyederhanaan Perizinan (Hal. 12-13)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-purple-700">94.5%</div>
                    <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-1 py-0.2 rounded border border-purple-200">
                      Efektif
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-blue-700 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Status: Harmonisasi Efektif
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectUnit?.('pusat-harmonisasi')}
                className="font-bold text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Analisis Satker Harmonisasi"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal?.('ikp-2-kebijakan')}
                className="text-slate-500 hover:text-blue-700 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual ↗
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KARTU 3: PUSAT DATA DAN SISTEM INFORMASI (PDSI)                           */}
        {/* ========================================================================= */}
        <div
          className={`bg-white rounded-xl border transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-indigo-600 ${
            selectedUnit === 'ALL' || selectedUnit === 'pdsi'
              ? 'border-slate-200/90 shadow-xs hover:shadow-md'
              : 'opacity-60 border-slate-100'
          }`}
        >
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 uppercase">
                    UNIT KERJA 3 &bull; PDSI
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-700 transition-colors">
                    Pusat Data &amp; Sistem Info
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikpPdsi.capaianPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal?.('ikp-3-spbe')}
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis IKP 3 PDSI"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: IKP #3 Tingkat Kematangan SPBE (KPI Utama Perkin) */}
            {displayMode !== 'operational_only' && (
              <div className="bg-gradient-to-br from-indigo-50/70 to-slate-50/90 rounded-lg p-3 border border-indigo-100/80 my-3">
                <div className="text-[10px] font-bold text-indigo-950 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 font-black text-indigo-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    IKP #3: {ikpPdsi.title}
                  </span>
                  <span className="text-[9.5px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    MELAMPAUI TARGET
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                      {ikpPdsi.realisasi}
                    </span>
                    <span className="text-xs font-bold text-indigo-700">Skala 5 (Level 4)</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                    <span className="font-bold font-mono text-slate-700">{ikpPdsi.target}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500"
                    style={{ width: `${Math.min(100, ikpPdsi.capaianPersen)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Ringkasan Kinerja Keseluruhan: KPI Selain KPI Utama dari Perkin (Buku Satu Data Hal. 40-43) */}
            {displayMode !== 'primary_only' && (
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="text-[10px] font-bold font-mono text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    <span>KPI SELAIN UTAMA (SATU DATA):</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                    21 Dataset
                  </span>
                </div>

                {/* Metric 1: Uptime Data Center Tier-3 */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <Server className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Tier-3 Data Center (96 Rak)</div>
                      <div className="text-[10px] text-slate-500 truncate">Uptime 99.98% (Hal. 41 Satu Data)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-indigo-700">99.98%</div>
                    <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-1 py-0.2 rounded border border-indigo-200">
                      High Avail
                    </span>
                  </div>
                </div>

                {/* Metric 2: Fiber Optik Terpasang */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Jaringan Backbone Fiber Optik</div>
                      <div className="text-[10px] text-slate-500 truncate">Konektivitas Gedung Bida (Hal. 40-41)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-cyan-700">210 Km</div>
                    <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 px-1 py-0.2 rounded border border-cyan-200">
                      Terhubung
                    </span>
                  </div>
                </div>

                {/* Metric 3: SOC & Mitigasi Serangan Cyber */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Security Operation Center (SOC)</div>
                      <div className="text-[10px] text-slate-500 truncate">Insiden Cyber Termitigasi (Hal. 42)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-emerald-700">100%</div>
                    <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                      Aman
                    </span>
                  </div>
                </div>

                {/* Metric 4: Kepuasan Layanan Helpdesk TI */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Layanan Helpdesk IT Satker</div>
                      <div className="text-[10px] text-slate-500 truncate">1.420 Tiket Tuntas (Hal. 43)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-blue-700">95.4%</div>
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                      Puas
                    </span>
                  </div>
                </div>

                {/* Metric 5: Integrasi Satu Data BP Batam */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Database className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Katalog Satu Data Terpadu</div>
                      <div className="text-[10px] text-slate-500 truncate">24 Satker Terhubung (Hal. 40-43)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-purple-700">59 DS</div>
                    <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-1 py-0.2 rounded border border-purple-200">
                      Interoperabel
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-indigo-700 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Status: SPBE Kategori 4
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectUnit?.('pdsi')}
                className="font-bold text-indigo-700 hover:text-indigo-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Analisis Satker PDSI"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal?.('ikp-3-spbe')}
                className="text-slate-500 hover:text-indigo-700 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual ↗
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KARTU 4: PUSAT PELAYANAN TERPADU SATU PINTU (PTSP)                        */}
        {/* ========================================================================= */}
        <div
          className={`bg-white rounded-xl border transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-emerald-600 ${
            selectedUnit === 'ALL' || selectedUnit === 'ptsp'
              ? 'border-slate-200/90 shadow-xs hover:shadow-md'
              : 'opacity-60 border-slate-100'
          }`}
        >
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                    UNIT KERJA 4 &bull; PTSP
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-emerald-700 transition-colors">
                    Pelayanan Terpadu (PTSP)
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikpPtsp.capaianPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal?.('ikp-4-ikm-ptsp')}
                  className="p-1 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis IKP 4 PTSP"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: IKP #4 IKM Pengguna Layanan PTSP (KPI Utama Perkin) */}
            {displayMode !== 'operational_only' && (
              <div className="bg-gradient-to-br from-emerald-50/70 to-slate-50/90 rounded-lg p-3 border border-emerald-100/80 my-3">
                <div className="text-[10px] font-bold text-emerald-950 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 font-black text-emerald-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    IKP #4: {ikpPtsp.title}
                  </span>
                  <span className="text-[9.5px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    MELAMPAUI TARGET
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                      {ikpPtsp.realisasi}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">Mutu A (Sangat Baik)</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                    <span className="font-bold font-mono text-slate-700">{ikpPtsp.target}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500"
                    style={{ width: `${Math.min(100, ikpPtsp.capaianPersen)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Ringkasan Kinerja Keseluruhan: KPI Selain KPI Utama dari Perkin (Buku Satu Data Hal. 21-28) */}
            {displayMode !== 'primary_only' && (
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="text-[10px] font-bold font-mono text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>KPI SELAIN UTAMA (SATU DATA):</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    17 Dataset
                  </span>
                </div>

                {/* Metric 1: Total Perizinan Diterbitkan */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Total Perizinan Diterbitkan</div>
                      <div className="text-[10px] text-slate-500 truncate">Izin Berusaha &amp; Non-Perizinan (Hal. 21-27)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-emerald-700">12.450</div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                      Izin Terbit
                    </span>
                  </div>
                </div>

                {/* Metric 2: Kepatuhan SLA Penyelesaian Tepat Waktu */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Kepatuhan SLA Waktu Layanan</div>
                      <div className="text-[10px] text-slate-500 truncate">SLA Standar Terpenuhi (Hal. 24 &amp; 28)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-blue-700">97.8%</div>
                    <span className="text-[10px] font-mono text-blue-800 font-bold bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                      SLA Patuh
                    </span>
                  </div>
                </div>

                {/* Metric 3: Efektivitas MPP Digital */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Transformasi MPP Digital</div>
                      <div className="text-[10px] text-slate-500 truncate">Layanan Mandiri Terintegrasi (Hal. 24)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-teal-700">95.2%</div>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-1 py-0.2 rounded border border-teal-200">
                      Digital
                    </span>
                  </div>
                </div>

                {/* Metric 4: Izin Maritim, SKKBM & SKKAB */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Izin Maritim (SKKBM/SKKAB)</div>
                      <div className="text-[10px] text-slate-500 truncate">Bongkar Muat &amp; Tersus (Hal. 21-23)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-sky-700">100%</div>
                    <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-1 py-0.2 rounded border border-sky-200">
                      Terlayani
                    </span>
                  </div>
                </div>

                {/* Metric 5: Penyelesaian Pengaduan Masyarakat */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Penyelesaian Pengaduan</div>
                      <div className="text-[10px] text-slate-500 truncate">Kanal Aduan &amp; SP4N (Hal. 24)</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-amber-700">98.6%</div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                      Tuntas
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Status: Pelayanan Prima
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectUnit?.('ptsp')}
                className="font-bold text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Analisis Satker PTSP"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal?.('ikp-4-ikm-ptsp')}
                className="text-slate-500 hover:text-emerald-700 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
