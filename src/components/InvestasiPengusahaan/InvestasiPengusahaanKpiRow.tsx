import React from 'react';
import {
  TrendingUp,
  Building2,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ArrowUpRight,
  DollarSign,
  Award,
  Globe2,
  ShieldCheck,
  FileCheck2,
  PieChart,
  Users,
} from 'lucide-react';
import { PERKIN_A4_KPIS, PERKIN_A4_METADATA } from './investasiPengusahaanData';

interface InvestasiPengusahaanKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedQuarter?: string;
  selectedSatker?: string;
  onSelectUnit?: (unitId: string) => void;
}

export const InvestasiPengusahaanKpiRow: React.FC<InvestasiPengusahaanKpiRowProps> = ({
  onOpenFormulaModal,
  selectedSatker = 'ALL',
  onSelectUnit,
}) => {
  const ikpInvestasi = PERKIN_A4_KPIS[0]; // Nilai Realisasi Investasi (Rp 60 T)
  const ikpPromosi = PERKIN_A4_KPIS[1]; // Minat Investasi (200 Leads)
  const ikpKek = PERKIN_A4_KPIS[2]; // Kajian KEK (100%)
  const ikpPengendalian = PERKIN_A4_KPIS[3]; // Pengendalian BU (100%)

  return (
    <div className="space-y-3 font-sans">
      {/* Header Bar - Identik Format DEP-A1 & DEP-A3 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>3 PILAR UNIT KERJA PENGAMPU PERKIN A4 (INVESTASI &amp; PENGUSAHAAN)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
              KONSOLIDASI 39 DATASET SATU DATA
            </span>
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          DIPA Program: <span className="font-bold text-slate-700">Rp 18,43 Miliar</span> &bull; Sasaran:{' '}
          <span className="font-bold text-emerald-600">{PERKIN_A4_METADATA.programName}</span>
        </div>
      </div>

      {/* 3 CONSOLIDATED DIRECTORATE KPI CARDS (IDENTIK MODEL KARTU DEP-A1 & DEP-A3) */}
      <div className="grid gap-3.5 grid-cols-1 lg:grid-cols-3">
        {/* ========================================================================= */}
        {/* KARTU 1: DIREKTORAT INVESTASI                                             */}
        {/* ========================================================================= */}
        <div
          className={`bg-white rounded-xl border transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-blue-600 ${
            selectedSatker === 'ALL' || selectedSatker === 'dit-investasi'
              ? 'border-slate-200/90 shadow-xs hover:shadow-md'
              : 'opacity-60 border-slate-100'
          }`}
        >
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 uppercase">
                    UNIT KERJA 1 &bull; INVESTASI
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-blue-700 transition-colors">
                    Direktorat Investasi
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikpInvestasi.capaianPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal(ikpInvestasi.id)}
                  className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis IKP 1 Dit. Investasi"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: IKP #1 Realisasi Investasi */}
            <div className="bg-gradient-to-br from-blue-50/70 to-slate-50/90 rounded-lg p-3 border border-blue-100/80 my-3">
              <div className="text-[10.5px] font-bold text-blue-950 flex items-center justify-between">
                <span className="truncate pr-1">IKP #1: {ikpInvestasi.name}</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded shrink-0">
                  MELAMPAUI TARGET
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                    {ikpInvestasi.realisasiDisplay}
                  </span>
                  <span className="text-xs font-bold text-blue-700">Realisasi</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                  <span className="font-bold font-mono text-slate-700">{ikpInvestasi.targetDisplay}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                  style={{ width: `${Math.min(100, ikpInvestasi.capaianPersen)}%` }}
                />
              </div>

              {/* Secondary Perkin Metric: IKP #2 Promosi & Minat */}
              <div className="mt-2.5 pt-2 border-t border-blue-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-bold text-slate-800 text-[11px]">IKP #2: {ikpPromosi.name}</span>
                </div>
                <div className="text-right font-mono font-bold text-emerald-700">
                  {ikpPromosi.realisasiDisplay}{' '}
                  <span className="text-[10px] text-slate-500 font-normal">/ {ikpPromosi.targetDisplay}</span>
                </div>
              </div>
            </div>

            {/* Ringkasan Kinerja Keseluruhan: KPI Selain KPI Utama dari Perkin (Buku Satu Data Hal. 46-48) */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                Ringkasan Kinerja Keseluruhan:
              </div>

              {/* Metric 1: Kunjungan Website Invest In Batam */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Globe2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Kunjungan Portal Invest in Batam</div>
                    <div className="text-[10px] text-slate-500 truncate">Trafik Investor Global (Hal. 47 Satu Data)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-blue-700">142.500</div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                    Trafik Aktif
                  </span>
                </div>
              </div>

              {/* Metric 2: Fasilitasi Insentif Fiskal & Tax Allowance */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Fasilitasi Insentif Fiskal (Tax Allowance)</div>
                    <div className="text-[10px] text-slate-500 truncate">Kemudahan Investasi PMDN/PMA (Hal. 48)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-emerald-700">100%</div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    Terfasilitasi
                  </span>
                </div>
              </div>

              {/* Metric 3: Laporan Kepatuhan LKPM */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Kepatuhan LKPM Perusahaan</div>
                    <div className="text-[10px] text-slate-500 truncate">Pengawalan Kewajiban PM (Hal. 46)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-indigo-700">96.8%</div>
                  <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-1 py-0.2 rounded border border-indigo-200">
                    Patuh
                  </span>
                </div>
              </div>

              {/* Metric 4: Profil Kawasan Industri Terbit */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Buku Profil Kawasan Industri</div>
                    <div className="text-[10px] text-slate-500 truncate">Industrial Estate Guidebook (Hal. 47)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-cyan-700">32 Kawasan</div>
                  <span className="text-[10px] font-mono text-cyan-700 font-bold bg-cyan-50 px-1 py-0.2 rounded border border-cyan-200">
                    Terdata
                  </span>
                </div>
              </div>

              {/* Metric 5: Event Promosi & Misi Dagang */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Pameran &amp; Roadshow Investasi</div>
                    <div className="text-[10px] text-slate-500 truncate">Misi Dagang LN &amp; Domestik (Hal. 48)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-amber-700">18 Event</div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                    Terlaksana
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-blue-700 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Status: Investasi Sangat Optimal
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectUnit?.('dit-investasi')}
                className="font-bold text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Analisis Satker Dit. Investasi"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal(ikpInvestasi.id)}
                className="text-slate-500 hover:text-blue-700 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual ↗
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KARTU 2: DIREKTORAT PENGEMBANGAN KPBPBB DAN KEK                           */}
        {/* ========================================================================= */}
        <div
          className={`bg-white rounded-xl border transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-indigo-600 ${
            selectedSatker === 'ALL' || selectedSatker === 'dit-kek'
              ? 'border-slate-200/90 shadow-xs hover:shadow-md'
              : 'opacity-60 border-slate-100'
          }`}
        >
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 uppercase">
                    UNIT KERJA 2 &bull; KEK &amp; KPBPBB
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-700 transition-colors">
                    Dit. Pengembangan KEK
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikpKek.capaianPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal(ikpKek.id)}
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis IKP 3 Dit. KEK"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: IKP #3 Kajian KEK & Kerjasama */}
            <div className="bg-gradient-to-br from-indigo-50/70 to-slate-50/90 rounded-lg p-3 border border-indigo-100/80 my-3">
              <div className="text-[10.5px] font-bold text-indigo-950 flex items-center justify-between">
                <span className="truncate pr-1">IKP #3: {ikpKek.name}</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded shrink-0">
                  TERCAPAI OPTIMAL
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                    {ikpKek.realisasiDisplay}
                  </span>
                  <span className="text-xs font-bold text-indigo-700">Tuntas 100%</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                  <span className="font-bold font-mono text-slate-700">{ikpKek.targetDisplay}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                  style={{ width: `${Math.min(100, ikpKek.capaianPersen)}%` }}
                />
              </div>
            </div>

            {/* Ringkasan Kinerja Keseluruhan: KPI Selain KPI Utama dari Perkin (Buku Satu Data Hal. 9-11) */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                Ringkasan Kinerja Keseluruhan:
              </div>

              {/* Metric 1: Realisasi Investasi KEK Nongsa & BAT */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Realisasi Investasi KEK BP Batam</div>
                    <div className="text-[10px] text-slate-500 truncate">KEK Nongsa Digital &amp; BAT (Hal. 9)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-indigo-700">Rp 12,8 T</div>
                  <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-1 py-0.2 rounded border border-indigo-200">
                    106,7% Target
                  </span>
                </div>
              </div>

              {/* Metric 2: Penyerapan Tenaga Kerja KEK */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Penyerapan Tenaga Kerja KEK</div>
                    <div className="text-[10px] text-slate-500 truncate">Kualifikasi Teknologi &amp; MRO (Hal. 10)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-emerald-700">8.400 Org</div>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    Optimal
                  </span>
                </div>
              </div>

              {/* Metric 3: Perizinan Administrator KEK */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Layanan Administrator KEK</div>
                    <div className="text-[10px] text-slate-500 truncate">SLA Perizinan Berusaha (Hal. 10)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-cyan-700">98.5%</div>
                  <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 px-1 py-0.2 rounded border border-cyan-200">
                    Tepat SLA
                  </span>
                </div>
              </div>

              {/* Metric 4: Dokumen Kajian Kerjasama & Daya Saing */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Kajian Daya Saing &amp; Kerjasama</div>
                    <div className="text-[10px] text-slate-500 truncate">Pengembangan KEK Baru (Hal. 10-11)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-purple-700">100%</div>
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-1 py-0.2 rounded border border-purple-200">
                    Selesai
                  </span>
                </div>
              </div>

              {/* Metric 5: Peta Spasial Deliniasi KEK */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Peta Deliniasi &amp; Zonasi KEK</div>
                    <div className="text-[10px] text-slate-500 truncate">Data Spasial SHP Kawasan (Hal. 10)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-slate-900">100%</div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1 py-0.2 rounded">
                    Tervalidasi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-indigo-700 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Status: KEK Tumbuh Agresif
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectUnit?.('dit-kek')}
                className="font-bold text-indigo-700 hover:text-indigo-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Analisis Satker Dit. KEK"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal(ikpKek.id)}
                className="text-slate-500 hover:text-indigo-700 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual ↗
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KARTU 3: DIREKTORAT PENGENDALIAN PENGUSAHAAN                               */}
        {/* ========================================================================= */}
        <div
          className={`bg-white rounded-xl border transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-cyan-600 ${
            selectedSatker === 'ALL' || selectedSatker === 'dit-pengendalian'
              ? 'border-slate-200/90 shadow-xs hover:shadow-md'
              : 'opacity-60 border-slate-100'
          }`}
        >
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-800 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 uppercase">
                    UNIT KERJA 3 &bull; PENGENDALIAN
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-cyan-800 transition-colors">
                    Dit. Pengendalian Usaha
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikpPengendalian.capaianPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal(ikpPengendalian.id)}
                  className="p-1 rounded-md text-slate-400 hover:text-cyan-800 hover:bg-cyan-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis IKP 4 Dit. Pengendalian"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: IKP #4 Pengendalian Kerjasama BU */}
            <div className="bg-gradient-to-br from-cyan-50/70 to-slate-50/90 rounded-lg p-3 border border-cyan-100/80 my-3">
              <div className="text-[10.5px] font-bold text-cyan-950 flex items-center justify-between">
                <span className="truncate pr-1">IKP #4: {ikpPengendalian.name}</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded shrink-0">
                  TERCAPAI OPTIMAL
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                    {ikpPengendalian.realisasiDisplay}
                  </span>
                  <span className="text-xs font-bold text-cyan-800">Tuntas 100%</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                  <span className="font-bold font-mono text-slate-700">{ikpPengendalian.targetDisplay}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-teal-500"
                  style={{ width: `${Math.min(100, ikpPengendalian.capaianPersen)}%` }}
                />
              </div>
            </div>

            {/* Ringkasan Kinerja Keseluruhan: KPI Selain KPI Utama dari Perkin (Buku Satu Data Hal. 14) */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                Ringkasan Kinerja Keseluruhan:
              </div>

              {/* Metric 1: Kepatuhan Evaluasi Kerjasama Badan Usaha */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Evaluasi Pengendalian &amp; Kerjasama BU</div>
                    <div className="text-[10px] text-slate-500 truncate">Monev 4 Badan Usaha (Hal. 14 Satu Data)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-cyan-800">96.2%</div>
                  <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 px-1 py-0.2 rounded border border-cyan-200">
                    Patuh
                  </span>
                </div>
              </div>

              {/* Metric 2: Rekomendasi Pengendalian Terimplementasi */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Rekomendasi Tindak Lanjut Kerjasama</div>
                    <div className="text-[10px] text-slate-500 truncate">Penyelesaian Temuan Monev (Hal. 14)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-emerald-700">100%</div>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    Tuntas
                  </span>
                </div>
              </div>

              {/* Metric 3: Pengawasan Operasional 4 Badan Usaha */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Audit Pembinaan Tata Kelola BU</div>
                    <div className="text-[10px] text-slate-500 truncate">Pelabuhan, Bandara, RSBP, SPAM (Hal. 14)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-blue-700">100%</div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                    Terlaksana
                  </span>
                </div>
              </div>

              {/* Metric 4: Mitigasi Risiko Klausul Kontrak */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Mitigasi Risiko Kontrak Kerjasama</div>
                    <div className="text-[10px] text-slate-500 truncate">Pencegahan Sengketa Hukum (Hal. 14)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-indigo-700">94.0%</div>
                  <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-1 py-0.2 rounded border border-indigo-200">
                    Terkendali
                  </span>
                </div>
              </div>

              {/* Metric 5: Penyesuaian Tarif & Klausul Kerjasama */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <PieChart className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Perubahan Kerjasama Usaha Ditindaklanjuti</div>
                    <div className="text-[10px] text-slate-500 truncate">Adendum &amp; Perpanjangan (Hal. 14)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-slate-900">88.5%</div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1 py-0.2 rounded">
                    Selesai
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-cyan-800 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700" /> Status: Pengendalian Tertib
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectUnit?.('dit-pengendalian')}
                className="font-bold text-cyan-800 hover:text-cyan-950 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Analisis Satker Dit. Pengendalian"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal(ikpPengendalian.id)}
                className="text-slate-500 hover:text-cyan-800 text-xs font-semibold cursor-pointer"
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
