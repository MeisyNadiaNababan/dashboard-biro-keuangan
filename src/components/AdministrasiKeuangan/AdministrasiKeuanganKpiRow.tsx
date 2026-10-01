import React from 'react';
import {
  Building2,
  Users,
  ShieldCheck,
  ShieldAlert,
  Award,
  CheckCircle2,
  HelpCircle,
  DollarSign,
  Coins,
  Scale,
  FileCheck2,
  GraduationCap,
  ArrowUpRight,
  TrendingUp,
  Layers,
  Sparkles,
  CreditCard,
  MessageSquare,
  FileText,
  Activity,
  CheckSquare,
} from 'lucide-react';
import { PERKIN_A1_KPIS, PERKIN_A1_INFO } from './administrasiKeuanganData';

interface AdministrasiKeuanganKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedKpiId?: string | null;
  onSelectUnit?: (unitId: string) => void;
}

export const AdministrasiKeuanganKpiRow: React.FC<AdministrasiKeuanganKpiRowProps> = ({
  onOpenFormulaModal,
  selectedKpiId,
  onSelectUnit,
}) => {
  // Mapping 4 Perkin IKPs
  const ikpRb = PERKIN_A1_KPIS.find((k) => k.id === 'ikp-1-rb') || PERKIN_A1_KPIS[0];
  const ikpMerit = PERKIN_A1_KPIS.find((k) => k.id === 'ikp-2-merit') || PERKIN_A1_KPIS[1];
  const ikpSpip = PERKIN_A1_KPIS.find((k) => k.id === 'ikp-3-spip') || PERKIN_A1_KPIS[2];
  const ikpWtp = PERKIN_A1_KPIS.find((k) => k.id === 'ikp-4-wtp') || PERKIN_A1_KPIS[3];

  return (
    <div className="space-y-3 font-sans">
      {/* Header Bar - Model Tampilan Satker Eksekutif Terpadu (Persis Model DEP-A3) */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>3 PILAR UNIT KERJA PENGAMPU PERKIN A1 (ADMINISTRASI &amp; KEUANGAN)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
              KONSOLIDASI 59 DATASET SATU DATA
            </span>
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          DIPA Program: <span className="font-bold text-slate-700">Rp 725,15 Miliar</span> &bull; Sasaran:{' '}
          <span className="font-bold text-emerald-600">Meningkatkan Kualitas Pengelolaan Internal BP Batam</span>
        </div>
      </div>

      {/* 3 CONSOLIDATED WORK UNIT KPI CARDS (IDENTIK MODEL KARTU DEP-A3) */}
      <div className="grid gap-3.5 grid-cols-1 lg:grid-cols-3">
        {/* ========================================================================= */}
        {/* KARTU 1: BIRO 1 - BIRO KEUANGAN                                           */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-blue-600">
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 uppercase">
                    UNIT KERJA 1 &bull; KEUANGAN
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-blue-700 transition-colors">
                    Biro Keuangan
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  100.0% WTP
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-4-wtp')}
                  className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis IKP 4 Biro Keuangan"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: IKP #4 Opini BPK (KPI Utama Perkin) */}
            <div className="bg-gradient-to-br from-blue-50/70 to-slate-50/90 rounded-lg p-3 border border-blue-100/80 my-3">
              <div className="text-[10.5px] font-bold text-blue-950 flex items-center justify-between">
                <span>IKP #4: Opini BPK atas Laporan Keuangan</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                  TERCAPAI OPTIMAL
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                    WTP
                  </span>
                  <span className="text-xs font-bold text-blue-700">8x Berturut-turut</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                  <span className="font-bold font-mono text-slate-700">WTP</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Ringkasan Kinerja Keseluruhan Unit (KPI Lainnya dari Informasi Biro Keuangan) */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                Ringkasan Kinerja Keseluruhan:
              </div>

              {/* Metric 1: Realisasi Pendapatan BLU (LRA) */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Realisasi Pendapatan BLU (LRA)</div>
                    <div className="text-[10px] text-slate-500 truncate">Target Rp 2,05 T (Buku Satu Data Hal. 2-3)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-emerald-700">Rp 2,49 T</div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    121.5% Target
                  </span>
                </div>
              </div>

              {/* Metric 2: Realisasi Belanja Total */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                    <CreditCard className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Realisasi Belanja &amp; Pagu Anggaran</div>
                    <div className="text-[10px] text-slate-500 truncate">Pagu Rp 2,24 T (Buku Satu Data Hal. 3)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-cyan-700">Rp 2,12 T</div>
                  <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 px-1 py-0.2 rounded border border-cyan-200">
                    94.8% Serapan
                  </span>
                </div>
              </div>

              {/* Metric 3: Saldo Kas & Bank Real-Time */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Coins className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Saldo Kas &amp; Bank Real-Time</div>
                    <div className="text-[10px] text-slate-500 truncate">Likuiditas 242.8% (Buku Satu Data Hal. 4)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-slate-900">Rp 1,42 T</div>
                  <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                    Likuid &amp; Aman
                  </span>
                </div>
              </div>

              {/* Metric 4: Indeks Kinerja Pelaksanaan Anggaran (IKPA) */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Indeks Pelaksanaan Anggaran (IKPA)</div>
                    <div className="text-[10px] text-slate-500 truncate">Kemenkeu RI (Buku Satu Data Hal. 4)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-amber-700">96.25</div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                    Sangat Baik
                  </span>
                </div>
              </div>

              {/* Metric 5: Penyelesaian Piutang & BMN */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <Scale className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Penyelesaian Piutang &amp; BMN</div>
                    <div className="text-[10px] text-slate-500 truncate">Tertagih Rp 74,8 M dari 21 Debitur (Hal. 5)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-indigo-700">88.4%</div>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1 py-0.2 rounded">
                    KPKNL Selesai
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Status: Akuntabel &amp; WTP
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectUnit?.('biro-keuangan')}
                className="font-bold text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Visualisasi Mendalam Biro Keuangan"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal('ikp-4-wtp')}
                className="text-slate-500 hover:text-blue-700 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual Naskah ↗
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KARTU 2: BIRO 2 - BIRO SUMBER DAYA MANUSIA (BIRO SDM)                     */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-indigo-600">
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 uppercase">
                    UNIT KERJA 2 &bull; SDM
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-700 transition-colors">
                    Biro Sumber Daya Manusia
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikpMerit.capaianPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-2-merit')}
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis IKP 2 Sistem Merit"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: IKP #2 Sistem Merit (KPI Utama Perkin) */}
            <div className="bg-gradient-to-br from-indigo-50/70 to-slate-50/90 rounded-lg p-3 border border-indigo-100/80 my-3">
              <div className="text-[10.5px] font-bold text-indigo-950 flex items-center justify-between">
                <span>IKP #2: Indeks Sistem Merit ASN/BP Batam</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                  MELAMPAUI TARGET
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                    {ikpMerit.realisasi2025}
                  </span>
                  <span className="text-xs font-bold text-indigo-700">Poin (Kategori IV)</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                  <span className="font-bold font-mono text-slate-700">{ikpMerit.target2025} Poin</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-600"
                  style={{ width: `${Math.min(100, ikpMerit.capaianPersen)}%` }}
                />
              </div>
            </div>

            {/* Ringkasan Kinerja Keseluruhan Unit (KPI Lainnya dari Informasi Biro SDM) */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                Ringkasan Kinerja Keseluruhan:
              </div>

              {/* Metric 1: Total Pegawai Aktif */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Total Pegawai Aktif BP Batam</div>
                    <div className="text-[10px] text-slate-500 truncate">Pria 1.796 (60.3%) | Wanita 1.182 (39.7%)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-indigo-700">2.978 Peg</div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1 py-0.2 rounded border border-slate-200">
                    Terdata 100%
                  </span>
                </div>
              </div>

              {/* Metric 2: Kenaikan Gaji Berkala (KGB) & Pensiun */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Layanan Kenaikan Gaji (KGB) &amp; Pensiun</div>
                    <div className="text-[10px] text-slate-500 truncate">642 Berkas Tepat Waktu (Hal. 1-2 Satu Data)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-emerald-700">100%</div>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    SLA Terpenuhi
                  </span>
                </div>
              </div>

              {/* Metric 3: Pengembangan Kompetensi & Diklat */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Pengembangan Kompetensi SDM &amp; Diklat</div>
                    <div className="text-[10px] text-slate-500 truncate">84 Pegawai Tubel &amp; 48 Angkatan Diklat</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-blue-700">92.6%</div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                    Kompeten
                  </span>
                </div>
              </div>

              {/* Metric 4: Pemenuhan Standar Kualifikasi S1-S3 */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Kualifikasi Pendidikan S1-S3 Pegawai</div>
                    <div className="text-[10px] text-slate-500 truncate">2.156 dari 2.978 Pegawai (Hal. 2)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-purple-700">72.4%</div>
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-1 py-0.2 rounded border border-purple-200">
                    Pendidikan Tinggi
                  </span>
                </div>
              </div>

              {/* Metric 5: Indeks Profesionalitas ASN (IP ASN) */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <CheckSquare className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Indeks Profesionalitas ASN (IP ASN)</div>
                    <div className="text-[10px] text-slate-500 truncate">Dimensi Kualifikasi, Kompetensi &amp; Disiplin</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-rose-700">88.40</div>
                  <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-1 py-0.2 rounded border border-rose-200">
                    Kategori Tinggi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-indigo-700 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Status: Merit Kategori IV (Sangat Baik)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectUnit?.('biro-sdm')}
                className="font-bold text-indigo-700 hover:text-indigo-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Visualisasi Mendalam Biro SDM"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal('ikp-2-merit')}
                className="text-slate-500 hover:text-indigo-700 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual Naskah ↗
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KARTU 3: BIRO 3 - BIRO OKMR                                               */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-cyan-600">
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-800 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 uppercase">
                    UNIT KERJA 3 &bull; TATA KELOLA &amp; MR
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-cyan-800 transition-colors">
                    Biro Organisasi, Kepatuhan &amp; MR
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ikpRb.capaianPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-1-rb')}
                  className="p-1 rounded-md text-slate-400 hover:text-cyan-800 hover:bg-cyan-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis IKP 1 Reformasi Birokrasi"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: IKP #1 Reformasi Birokrasi (KPI Utama Perkin) */}
            <div className="bg-gradient-to-br from-cyan-50/70 to-slate-50/90 rounded-lg p-3 border border-cyan-100/80 my-3">
              <div className="text-[10.5px] font-bold text-cyan-950 flex items-center justify-between">
                <span>IKP #1: Indeks Reformasi Birokrasi (RB)</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                  MELAMPAUI TARGET
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                    {ikpRb.realisasi2025}
                  </span>
                  <span className="text-xs font-bold text-cyan-800">Predikat BB (Sangat Baik)</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                  <span className="font-bold font-mono text-slate-700">{ikpRb.target2025}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-teal-500"
                  style={{ width: `${Math.min(100, ikpRb.capaianPersen)}%` }}
                />
              </div>
            </div>

            {/* Ringkasan Kinerja Keseluruhan Unit (KPI Lainnya dari Informasi Biro OKMR) */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                Ringkasan Kinerja Keseluruhan:
              </div>

              {/* Metric 1: Indeks Maturitas SPIP (IKP #3 Perkin) */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Maturitas SPIP (IKP #3 Perkin)</div>
                    <div className="text-[10px] text-slate-500 truncate">Target: 3,20 (Level 3 Terdefinisi - Hal. 40)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-emerald-700">{ikpSpip.realisasi2025}</div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    {ikpSpip.capaianPersen.toFixed(1)}% Target
                  </span>
                </div>
              </div>

              {/* Metric 2: Indeks Pelayanan Publik (PEKPPP) */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Indeks Pelayanan Publik (PEKPPP)</div>
                    <div className="text-[10px] text-slate-500 truncate">Kategori A (Pelayanan Prima - Hal. 40)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-amber-700">4.38 / 5.0</div>
                  <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                    Pelayanan Prima
                  </span>
                </div>
              </div>

              {/* Metric 3: Tindak Lanjut Pengaduan Publik */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Tindak Lanjut Pengaduan Publik</div>
                    <div className="text-[10px] text-slate-500 truncate">450/468 Selesai (Rata-rata 1.4 Hari)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-blue-700">96.2%</div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                    SP4N-LAPOR!
                  </span>
                </div>
              </div>

              {/* Metric 4: Akuntabilitas Kinerja Instansi (SAKIP) */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Akuntabilitas Kinerja (SAKIP)</div>
                    <div className="text-[10px] text-slate-500 truncate">Evaluasi KemenPAN-RB (Hal. 38)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-teal-700">84.60 Poin</div>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-1 py-0.2 rounded border border-teal-200">
                    Predikat A
                  </span>
                </div>
              </div>

              {/* Metric 5: Kepatuhan Pelaporan LHKPN */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">Kepatuhan LHKPN &amp; Gratifikasi</div>
                    <div className="text-[10px] text-slate-500 truncate">Wajib Lapor Tepat Waktu (Hal. 39)</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black font-mono text-emerald-700">100%</div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    Nihil Fraud
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-cyan-800 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700" /> Status: SPIP &amp; RB Terakreditasi Tinggi
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectUnit?.('biro-organisasi')}
                className="font-bold text-cyan-800 hover:text-cyan-950 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Visualisasi Mendalam Biro OKMR"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal('ikp-1-rb')}
                className="text-slate-500 hover:text-cyan-800 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual Naskah ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
