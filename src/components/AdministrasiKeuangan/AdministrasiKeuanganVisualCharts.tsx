import React, { useState } from 'react';
import {
  TrendingUp,
  Scale,
  Users,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronRight,
  BookOpen,
  PieChart as PieIcon,
  FileCheck2,
  Layers,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  Table as TableIcon,
  BarChart2,
  Filter,
} from 'lucide-react';
import {
  FISCAL_REVENUE_SUMMARY_DATA,
  FISCAL_EXPENSE_SUMMARY_DATA,
  FISCAL_EXPENSE_PERKIN_UNITS,
  PEGAWAI_STATUS_DETAIL_DATA,
  PEGAWAI_PENDIDIKAN_DETAIL_DATA,
  MATRIKS_STATUS_PENDIDIKAN_DATA,
  FiscalSummaryExpense,
} from './administrasiKeuanganData';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface AdministrasiKeuanganVisualChartsProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const AdministrasiKeuanganVisualCharts: React.FC<
  AdministrasiKeuanganVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  // Navigation tabs (Anggaran Perkin removed as requested by user)
  const [activeTab, setActiveTab] = useState<
    'fiskal_keuangan' | 'sdm_demografi' | 'akuntabilitas_okmr'
  >('fiskal_keuangan');

  // Expense Unit Filter Mode: 'all_units' vs 'perkin_units'
  const [expenseUnitMode, setExpenseUnitMode] = useState<'all_units' | 'perkin_units'>('all_units');

  // SDM Tab Sub-View: 'kartu_distribusi' | 'matriks_silang' | 'grafik_analisis'
  const [sdmSubView, setSdmSubView] = useState<'kartu_distribusi' | 'matriks_silang' | 'grafik_analisis'>('kartu_distribusi');

  // Selected Status for Matrix Highlighting
  const [selectedStatusId, setSelectedStatusId] = useState<string | null>(null);

  // Radar Data for 4 IKP
  const radarData = [
    { subject: 'Indeks RB (BB)', target: 80, realisasi: 78.45, fullMark: 100 },
    { subject: 'Sistem Merit (IV)', target: 70, realisasi: 85.6, fullMark: 100 },
    { subject: 'Maturitas SPIP', target: 64, realisasi: 68.4, fullMark: 100 },
    { subject: 'Opini BPK WTP', target: 100, realisasi: 100, fullMark: 100 },
  ];

  const activeExpenseList: FiscalSummaryExpense[] =
    expenseUnitMode === 'all_units' ? FISCAL_EXPENSE_SUMMARY_DATA : FISCAL_EXPENSE_PERKIN_UNITS;

  const totalPaguFiltered = activeExpenseList.reduce((acc, curr) => acc + curr.pagu, 0);
  const totalSerapanFiltered = activeExpenseList.reduce((acc, curr) => acc + curr.serapan, 0);
  const avgSerapanPercent = totalPaguFiltered > 0 ? (totalSerapanFiltered / totalPaguFiltered) * 100 : 0;

  // Chart Data for Stacked / Grouped Status vs Education
  const chartDataStatusPendidikan = MATRIKS_STATUS_PENDIDIKAN_DATA.map((row) => ({
    name: row.kode,
    fullName: row.statusNama,
    S3: row.s3,
    S2: row.s2,
    S1: row.s1_d4,
    D3: row.d3,
    SMA: row.sma_smk,
    SD_SMP: row.smp_sd,
    total: row.totalPegawai,
  }));

  return (
    <div className="space-y-4">
      {/* Tab Navigation Controls (Without Anggaran Perkin) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-tight">
              VISUALISASI EKSEKUTIF PERFORMA & TATA KELOLA
            </h3>
            <p className="text-[10.5px] text-slate-500">
              Analisis terpadu performa fiskal, serapan belanja unit, distribusi status PNS & jenjang pendidikan, serta 8 aspek sistem merit
            </p>
          </div>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('fiskal_keuangan')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'fiskal_keuangan'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Kinerja Fiskal & Belanja Unit</span>
          </button>

          <button
            onClick={() => setActiveTab('sdm_demografi')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sdm_demografi'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Kualifikasi Pendidikan & Sistem Merit (8 Aspek)</span>
          </button>

          <button
            onClick={() => setActiveTab('akuntabilitas_okmr')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'akuntabilitas_okmr'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Radar Akuntabilitas & OKMR</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: KINERJA FISKAL & BELANJA UNIT (DILENGKAPI DETAIL SERAPAN BELANJA UNIT) */}
      {activeTab === 'fiskal_keuangan' && (
        <div className="space-y-4">
          {/* Executive Fiscal Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Target Pendapatan
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">
                Rp 2.45T
              </span>
              <span className="text-[9.5px] text-slate-400 block">PNBP BLU 2026</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-emerald-200 bg-emerald-50/20 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Realisasi Pendapatan
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-700 font-mono block">
                Rp 981.2M
              </span>
              <span className="text-[9.5px] text-emerald-600 font-bold block">40.1% Tercapai</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Target Belanja
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">
                Rp 3.32T
              </span>
              <span className="text-[9.5px] text-slate-400 block">Pagu DIPA BLU</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-blue-200 bg-blue-50/20 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                Realisasi Belanja
              </span>
              <span className="text-base sm:text-lg font-black text-blue-700 font-mono block">
                Rp 945.0M
              </span>
              <span className="text-[9.5px] text-blue-600 font-bold block">28.5% Serapan</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-amber-200 bg-amber-50/20 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                Coverage Ratio
              </span>
              <span className="text-base sm:text-lg font-black text-amber-700 font-mono block">
                0.86
              </span>
              <span className="text-[9.5px] text-amber-600 font-bold block">Kemandirian Finansial</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-rose-200 bg-rose-50/20 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
                Revenue Gap
              </span>
              <span className="text-base sm:text-lg font-black text-rose-700 font-mono block">
                Rp -1.47T
              </span>
              <span className="text-[9.5px] text-rose-600 font-bold block">Target s/d Akhir TA</span>
            </div>
          </div>

          {/* TWO BALANCED COLUMNS: DETAIL PENDAPATAN & DETAIL SERAPAN BELANJA UNIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Column 1: DETAIL PERFORMA PENDAPATAN (6 Sektor PNBP) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                      DETAIL PERFORMA PENDAPATAN (PNBP)
                    </h4>
                    <span className="text-[10px] text-slate-400">Target vs Realisasi per Sektor Badan Layanan Umum</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-500">
                  <span className="text-slate-400">TARGET</span>
                  <span className="text-emerald-700">REALISASI</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {FISCAL_REVENUE_SUMMARY_DATA.map((item, idx) => (
                  <div key={idx} className="space-y-1.5 p-2 rounded-lg hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-mono text-[9px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-slate-800 uppercase tracking-tight">
                          {item.sektor}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 font-mono text-xs">
                        <span className="text-slate-400">
                          Rp {(item.target / 1000000000).toFixed(1)}M
                        </span>
                        <span className="font-bold text-emerald-600">
                          Rp {(item.realisasi / 1000000000).toFixed(1)}M
                        </span>
                        <span className="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.persentase.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(item.persentase, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-[11px] text-emerald-900">
                <span className="font-medium">Total PNBP Sektor Utama:</span>
                <span className="font-mono font-bold">Rp 981,2 Miliar / Rp 2.447,9 Miliar (40,1%)</span>
              </div>
            </div>

            {/* Column 2: DETAIL SERAPAN BELANJA UNIT (PAGU VS SERAPAN) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Scale className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                      DETAIL SERAPAN BELANJA UNIT
                    </h4>
                    <span className="text-[10px] text-slate-400">Pagu DIPA vs Serapan Realisasi per Satker</span>
                  </div>
                </div>

                {/* Scope Switcher Toggle */}
                <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md text-[10px]">
                  <button
                    onClick={() => setExpenseUnitMode('all_units')}
                    className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                      expenseUnitMode === 'all_units'
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Satker Utama
                  </button>
                  <button
                    onClick={() => setExpenseUnitMode('perkin_units')}
                    className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                      expenseUnitMode === 'perkin_units'
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    5 Unit Perkin A1
                  </button>
                </div>
              </div>

              {/* Serapan Unit List */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {activeExpenseList.map((item, idx) => (
                  <div key={idx} className="space-y-1.5 p-2 rounded-lg hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 max-w-[55%]">
                        <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="truncate">
                          <span className="font-bold text-slate-800 uppercase tracking-tight block truncate">
                            {item.unitKerja}
                          </span>
                          <span className="text-[9.5px] font-mono text-slate-400">
                            Kode: {item.kodeUnit}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-xs text-right">
                        <div>
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-[10px] text-slate-400">Pagu:</span>
                            <span className="text-slate-500 font-bold">
                              Rp {(item.pagu / 1000000000).toFixed(1)}M
                            </span>
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-[10px] text-slate-400">Serap:</span>
                            <span className="text-blue-700 font-bold">
                              Rp {(item.serapan / 1000000000).toFixed(1)}M
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap ${
                            item.status === 'OPTIMAL'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {item.persentase.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.persentase >= 35
                            ? 'bg-emerald-500'
                            : item.persentase >= 30
                            ? 'bg-blue-500'
                            : 'bg-sky-500'
                        }`}
                        style={{ width: `${Math.min(item.persentase, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 flex items-center justify-between text-[11px] text-blue-900">
                <span className="font-medium">Total Konsolidasi Belanja Unit:</span>
                <span className="font-mono font-bold">
                  Rp {(totalSerapanFiltered / 1000000000).toFixed(1)}M / Rp {(totalPaguFiltered / 1000000000).toFixed(1)}M ({avgSerapanPercent.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {/* LOWER SECTION: KEMANDIRIAN FISKAL, SUMBER PENDANAAN & ANALISIS BIRO KEUANGAN */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Donut 1: Kemandirian Fiskal */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs text-center space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 block">
                KEMANDIRIAN FISKAL
              </span>
              <div className="h-24 w-full flex items-center justify-center">
                <div className="relative w-20 h-20 rounded-full border-6 border-slate-900 border-t-cyan-500 border-r-cyan-400 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-base font-black font-mono text-slate-900">0.86</span>
                    <span className="text-[7.5px] font-mono text-slate-400 block">RATIO</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                &ldquo;Tingkat kemandirian finansial level moderat.&rdquo;
              </p>
            </div>

            {/* Donut 2: Sumber Pendanaan */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs text-center space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 block">
                SUMBER PENDANAAN
              </span>
              <div className="h-24 w-full flex items-center justify-center">
                <div className="relative w-20 h-20 rounded-full border-6 border-[#002B49] border-l-sky-400 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-xs font-black font-mono text-slate-900">BLU</span>
                    <span className="text-[7.5px] font-mono text-slate-400 block">74% PNBP</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                &ldquo;Dominan jasa kepelabuhanan & pertanahan.&rdquo;
              </p>
            </div>

            {/* Metric 3: Rasio Surplus / Efisiensi Operasional */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 block">
                SURPLUS / DEFISIT OPERASIONAL
              </span>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-lg font-black font-mono text-emerald-800 block">
                  +Rp 36,2 M
                </span>
                <span className="text-[9.5px] font-bold text-emerald-600 block">
                  Net Surplus Berjalan BLU
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-snug">
                Penerimaan PNBP (Rp 981,2 M) melampaui realisasi belanja s.d saat ini (Rp 945,0 M).
              </p>
            </div>

            {/* Box 4: Advisory Insight Biro Keuangan */}
            <div className="p-4 rounded-xl bg-slate-900 text-white shadow-xs space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-cyan-300 font-mono text-xs font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ANALISIS KEUANGAN DEPUTI 1</span>
                </div>
                <ul className="space-y-1 text-[10.5px] text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-mono font-bold">01</span>
                    <span>Pendapatan didominasi pertanahan & pelabuhan (65,4%).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-mono font-bold">02</span>
                    <span>Serapan belanja unit sejalan dengan jadwal termin pengadaan.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[9.5px] text-slate-400 flex items-center justify-between">
                <span>Kas Bank Real-Time:</span>
                <span className="font-mono text-cyan-300 font-bold">Rp 1,42 Triliun</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: KUALIFIKASI PENDIDIKAN, STATUS PNS & NON-PNS, DAN 8 ASPEK SISTEM MERIT */}
      {activeTab === 'sdm_demografi' && (
        <div className="space-y-4">
          {/* SECTION A: DISTRIBUSI KARYAWAN BERDASARKAN STATUS PNS & JENJANG PENDIDIKAN */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    JUMLAH KARYAWAN BERDASARKAN STATUS PNS & JENJANG PENDIDIKAN
                  </h4>
                  <span className="text-[10.5px] text-slate-500">
                    Buku Satu Data BP Batam (Hal. 1-2): 2.978 Total Pegawai Aktif
                  </span>
                </div>
              </div>

              {/* Sub-view Switcher (Cards vs Matrix Table vs Chart) */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs">
                <button
                  onClick={() => setSdmSubView('kartu_distribusi')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    sdmSubView === 'kartu_distribusi'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Rincian Kartu</span>
                </button>

                <button
                  onClick={() => setSdmSubView('matriks_silang')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    sdmSubView === 'matriks_silang'
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Matriks Silang Status x Pendidikan</span>
                </button>

                <button
                  onClick={() => setSdmSubView('grafik_analisis')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    sdmSubView === 'grafik_analisis'
                      ? 'bg-white text-teal-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Grafik Batang</span>
                </button>
              </div>
            </div>

            {/* SUB-VIEW 1: RINCIAN KARTU (STATUS KEPEGAWAIAN & JENJANG PENDIDIKAN) */}
            {sdmSubView === 'kartu_distribusi' && (
              <div className="space-y-5">
                {/* 1. KELOMPOK STATUS KEPEGAWAIAN (PNS, P2K, PPPK, PTT, PROFESIONAL) */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold uppercase tracking-tight text-slate-800 flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                      <span>1. Jumlah Karyawan Berdasarkan Status Kepegawaian (PNS & Non-PNS)</span>
                    </span>
                    <span className="font-mono text-slate-500 text-[11px]">Total: 2.978 Pegawai</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {PEGAWAI_STATUS_DETAIL_DATA.map((st) => (
                      <div
                        key={st.id}
                        className="rounded-xl border border-slate-200/90 p-3.5 bg-white hover:border-blue-300 hover:shadow-2xs transition-all space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded text-white"
                              style={{ backgroundColor: st.warna }}
                            >
                              {st.kodeStatus}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-600">
                              {st.persentase.toFixed(1)}%
                            </span>
                          </div>

                          <h5 className="text-xs font-black text-slate-900 uppercase tracking-tight line-clamp-1">
                            {st.statusPegawai}
                          </h5>

                          <div className="flex items-baseline gap-1 pt-1">
                            <span className="text-xl font-black font-mono text-slate-900">
                              {st.jumlah.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">Orang</span>
                          </div>

                          <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                            {st.deskripsi}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span>Pria: {st.komposisiGender.pria}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                            <span>Wanita: {st.komposisiGender.wanita}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. KELOMPOK JENJANG PENDIDIKAN (S3, S2, S1, D3, SMA, SMP/SD) */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold uppercase tracking-tight text-slate-800 flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                      <span>2. Jumlah Karyawan Berdasarkan Jenjang Pendidikan Terakhir</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-700 text-[11px]">
                      Sarjana+ (S1-S3): 64,5% (1.920 Pegawai)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {PEGAWAI_PENDIDIKAN_DETAIL_DATA.map((pen) => (
                      <div
                        key={pen.id}
                        className="rounded-xl border border-slate-200/90 p-3 bg-white hover:border-indigo-300 hover:shadow-2xs transition-all space-y-1.5 flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded text-white"
                              style={{ backgroundColor: pen.warna }}
                            >
                              {pen.jenjang}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-500">
                              {pen.persentase.toFixed(1)}%
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1 pt-1">
                            <span className="text-lg font-black font-mono text-slate-900">
                              {pen.jumlah.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[9.5px] text-slate-400">Pegawai</span>
                          </div>

                          <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">
                            {pen.kategoriTingkat}
                          </span>
                        </div>

                        <p className="text-[9.5px] text-slate-500 line-clamp-2 leading-snug border-t border-slate-100 pt-1.5">
                          {pen.jabatanDominan}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-VIEW 2: MATRIKS SILANG (STATUS PNS & LAINNYA VS JENJANG PENDIDIKAN) */}
            {sdmSubView === 'matriks_silang' && (
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-900 flex items-center justify-between">
                  <span className="font-medium">
                    Tabel Matriks Silang: Distribusi Riil Jenjang Pendidikan untuk Masing-masing Status Kepegawaian BP Batam
                  </span>
                  <span className="font-mono font-bold text-[11px]">Satu Data Hal. 1-2</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-100/90 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3 font-extrabold">Status Kepegawaian</th>
                        <th className="py-2.5 px-2.5 text-center">S3 (Doktor)</th>
                        <th className="py-2.5 px-2.5 text-center">S2 (Magister)</th>
                        <th className="py-2.5 px-2.5 text-center">S1 / D4</th>
                        <th className="py-2.5 px-2.5 text-center">D3 (Diploma)</th>
                        <th className="py-2.5 px-2.5 text-center">SMA / SMK</th>
                        <th className="py-2.5 px-2.5 text-center">SMP / SD</th>
                        <th className="py-2.5 px-3 text-right font-black bg-slate-200/50">Total</th>
                        <th className="py-2.5 px-3 text-right font-black text-emerald-800 bg-emerald-50/60">% Sarjana+</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {MATRIKS_STATUS_PENDIDIKAN_DATA.map((row) => {
                        const isSelected = selectedStatusId === row.statusId;
                        return (
                          <tr
                            key={row.statusId}
                            onClick={() => setSelectedStatusId(isSelected ? null : row.statusId)}
                            className={`transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-50/80 font-medium'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="py-2.5 px-3">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-600" />
                                <span className="font-bold text-slate-900">{row.statusNama}</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-bold">
                                  {row.kode}
                                </span>
                              </div>
                            </td>
                            <td className="py-2.5 px-2.5 text-center font-mono">{row.s3}</td>
                            <td className="py-2.5 px-2.5 text-center font-mono">{row.s2}</td>
                            <td className="py-2.5 px-2.5 text-center font-mono font-bold text-blue-700">{row.s1_d4}</td>
                            <td className="py-2.5 px-2.5 text-center font-mono">{row.d3}</td>
                            <td className="py-2.5 px-2.5 text-center font-mono">{row.sma_smk}</td>
                            <td className="py-2.5 px-2.5 text-center font-mono text-slate-400">{row.smp_sd}</td>
                            <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900 bg-slate-50/70">
                              {row.totalPegawai.toLocaleString('id-ID')} Org
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">
                              {row.persenSarjanaPlus.toFixed(1)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-slate-900 text-white font-mono text-xs border-t-2 border-slate-700">
                      <tr>
                        <td className="py-2.5 px-3 font-black uppercase">TOTAL KONSOLIDASI BP BATAM</td>
                        <td className="py-2.5 px-2.5 text-center font-bold text-cyan-300">24</td>
                        <td className="py-2.5 px-2.5 text-center font-bold text-cyan-300">312</td>
                        <td className="py-2.5 px-2.5 text-center font-bold text-cyan-300">1.584</td>
                        <td className="py-2.5 px-2.5 text-center font-bold text-cyan-300">428</td>
                        <td className="py-2.5 px-2.5 text-center font-bold text-cyan-300">562</td>
                        <td className="py-2.5 px-2.5 text-center font-bold text-cyan-300">68</td>
                        <td className="py-2.5 px-3 text-right font-black text-amber-300 bg-slate-800">
                          2.978 Org
                        </td>
                        <td className="py-2.5 px-3 text-right font-black text-emerald-400 bg-slate-800">
                          64.5%
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <p className="text-[10.5px] text-slate-500 italic">
                  * Catatan: Sebanyak 79,5% Pegawai Negeri Sipil (PNS) berpendidikan Sarjana hingga Doktor (S1-S3), sedangkan tenaga operasional lapangan didukung oleh formasi vokasi D3 dan PTT.
                </p>
              </div>
            )}

            {/* SUB-VIEW 3: GRAFIK KOMPARASI STATUS VS PENDIDIKAN */}
            {sdmSubView === 'grafik_analisis' && (
              <div className="space-y-3">
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartDataStatusPendidikan} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#334155' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#334155' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          borderColor: '#334155',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '11px',
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                      <Bar dataKey="S1" stackId="a" fill="#0284C7" name="S1 / D4" />
                      <Bar dataKey="S2" stackId="a" fill="#2563EB" name="S2 (Magister)" />
                      <Bar dataKey="S3" stackId="a" fill="#4338CA" name="S3 (Doktor)" />
                      <Bar dataKey="D3" stackId="a" fill="#0D9488" name="D3 (Diploma)" />
                      <Bar dataKey="SMA" stackId="a" fill="#F59E0B" name="SMA / SMK" />
                      <Bar dataKey="SD_SMP" stackId="a" fill="#94A3B8" name="SMP / SD" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 border-t border-slate-100 pt-2">
                  <span>Keterangan Status: <strong>PNS</strong> = Pegawai Negeri Sipil (1.042) | <strong>P2K</strong> = Pegawai Tetap (872) | <strong>PPPK</strong> = P3K (485) | <strong>PTT</strong> = Kontrak (396) | <strong>PROF</strong> = Tenaga Khusus (183).</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: RADAR AKUNTABILITAS & OKMR */}
      {activeTab === 'akuntabilitas_okmr' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Radar Chart 4 IKP */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                  RADAR CAPAIAN 4 INDIKATOR KINERJA PROGRAM
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold">
                Target vs Realisasi
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#334155' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Target Perkin"
                    dataKey="target"
                    stroke="#94A3B8"
                    fill="#94A3B8"
                    fillOpacity={0.25}
                  />
                  <Radar
                    name="Realisasi 2025"
                    dataKey="realisasi"
                    stroke="#0284C7"
                    fill="#0284C7"
                    fillOpacity={0.5}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4 Governance Quadrants */}
          <div className="lg:col-span-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Nilai SAKIP BP Batam
                </span>
                <span className="text-xl font-black text-slate-900 font-mono block">
                  82.68
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
                  Predikat A (Memuaskan)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Maturitas SPIP
                </span>
                <span className="text-xl font-black text-slate-900 font-mono block">
                  3.42
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                  Level 3 Berkembang
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Indeks Layanan (PEKPPP)
                </span>
                <span className="text-xl font-black text-slate-900 font-mono block">
                  4.38
                </span>
                <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 inline-block">
                  Sangat Baik (Skala 1-5)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Manajemen Risiko (MRI)
                </span>
                <span className="text-xl font-black text-slate-900 font-mono block">
                  3.65
                </span>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 inline-block">
                  Managed (24 Satker)
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  Penyelesaian Pengaduan Layanan Badan Usaha:
                </span>
                <span className="font-mono font-bold text-emerald-700">96.15% Tuntas</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96.15%' }} />
              </div>
              <p className="text-[10.5px] text-slate-500 leading-snug">
                125 dari 130 aduan masyarakat diselesaikan tepat waktu dengan SLA &lt; 48 jam di bawah supervisi Biro OKMR.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
