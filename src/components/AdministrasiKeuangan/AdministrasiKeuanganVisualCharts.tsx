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
  FileCheck2,
  Layers,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  BarChart2,
  DollarSign,
  Building2,
  CheckCircle2,
  Calculator,
} from 'lucide-react';
import {
  FISCAL_REVENUE_SUMMARY_DATA,
  FISCAL_EXPENSE_SUMMARY_DATA,
  FISCAL_EXPENSE_PERKIN_UNITS,
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

// Data Tabel 4 IKP untuk Capaian Evaluasi Detail (Persis Format DEP-A2)
const RB_8_AREA_TABLE_DATA = [
  { no: 1, komponen: 'Manajemen Perubahan', bobot: '10%', nilai: 8.40 },
  { no: 2, komponen: 'Deregulasi Kebijakan', bobot: '10%', nilai: 8.15 },
  { no: 3, komponen: 'Penataan Organisasi', bobot: '10%', nilai: 7.90 },
  { no: 4, komponen: 'Penataan Tata Laksana (SPBE)', bobot: '15%', nilai: 12.80 },
  { no: 5, komponen: 'Penataan Sistem Manajemen SDM', bobot: '15%', nilai: 12.65 },
  { no: 6, komponen: 'Penguatan Akuntabilitas (SAKIP)', bobot: '15%', nilai: 12.40 },
  { no: 7, komponen: 'Penguatan Pengawasan Intern', bobot: '10%', nilai: 8.15 },
  { no: 8, komponen: 'Peningkatan Pelayanan Publik', bobot: '15%', nilai: 8.00 },
];

const MERIT_8_ASPEK_TABLE_DATA = [
  { no: 1, komponen: '1. Perencanaan Kebutuhan ASN', bobot: 'Bobot 24 (6%)', nilai: 22.0 },
  { no: 2, komponen: '2. Pengadaan ASN & Pegawai', bobot: 'Bobot 24 (6%)', nilai: 23.0 },
  { no: 3, komponen: '3. Pengembangan Karier', bobot: 'Bobot 80 (20%)', nilai: 71.5 },
  { no: 4, komponen: '4. Promosi dan Mutasi', bobot: 'Bobot 40 (10%)', nilai: 36.0 },
  { no: 5, komponen: '5. Manajemen Kinerja Pegawai', bobot: 'Bobot 80 (20%)', nilai: 68.0 },
  { no: 6, komponen: '6. Penggajian, Penghargaan, Disiplin', bobot: 'Bobot 60 (15%)', nilai: 52.0 },
  { no: 7, komponen: '7. Perlindungan dan Pelayanan', bobot: 'Bobot 16 (4%)', nilai: 15.0 },
  { no: 8, komponen: '8. Sistem Informasi Kepegawaian', bobot: 'Bobot 76 (19%)', nilai: 55.0 },
];

const SPIP_5_UNSUR_TABLE_DATA = [
  { no: 1, komponen: '1. Lingkungan Pengendalian', bobot: '30%', nilai: 3.50 },
  { no: 2, komponen: '2. Penilaian Risiko (Risk Assessment)', bobot: '20%', nilai: 3.38 },
  { no: 3, komponen: '3. Kegiatan Pengendalian', bobot: '25%', nilai: 3.45 },
  { no: 4, komponen: '4. Informasi dan Komunikasi', bobot: '10%', nilai: 3.40 },
  { no: 5, komponen: '5. Pemantauan Pengendalian Intern', bobot: '15%', nilai: 3.35 },
];

const OPINI_BPK_TABLE_DATA = [
  { no: 1, kriteria: 'Kesesuaian Standar Akuntansi (SAP)', dasar: 'PP No. 71/2010', hasil: 'Sesuai (Akrual Penuh)' },
  { no: 2, kriteria: 'Kecukupan Pengungkapan (CaLK)', dasar: 'PSAP 04', hasil: 'Lengkap & Informatif' },
  { no: 3, kriteria: 'Kepatuhan Regulasi Keuangan', dasar: 'UU No. 15/2004', hasil: 'Nihil Temuan Material' },
  { no: 4, kriteria: 'Efektivitas Pengendalian Intern (SPI)', dasar: 'PP No. 60/2008', hasil: 'SPI Kas & BMN Efektif' },
];

export const AdministrasiKeuanganVisualCharts: React.FC<
  AdministrasiKeuanganVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  // Navigation tabs (Sesuai Permintaan User: Tab 1 Radar Capaian 4 IKP, Tab 2 Kinerja Fiskal, Tab 3 Kualifikasi Pendidikan)
  const [activeTab, setActiveTab] = useState<
    'akuntabilitas_okmr' | 'fiskal_keuangan' | 'sdm_demografi'
  >('akuntabilitas_okmr');

  // Expense Unit Filter Mode: 'all_units' vs 'perkin_units'
  const [expenseUnitMode, setExpenseUnitMode] = useState<'all_units' | 'perkin_units'>('all_units');

  // Sub-tab under Akuntabilitas & OKMR (Hanya 4 IKP & Evaluasi Detail)
  const [okmrSubTab, setOkmrSubTab] = useState<
    'radar' | 'rb' | 'merit' | 'spip' | 'wtp'
  >('radar');

  // Radar Data Capaian 4 IKP vs Target (Skala 100)
  const radar4IkpData = [
    { subject: 'Indeks RB', target: 80.0, realisasi: 81.14, fullMark: 100 },
    { subject: 'Sistem Merit', target: 70.0, realisasi: 85.63, fullMark: 100 },
    { subject: 'Maturitas SPIP', target: 64.0, realisasi: 68.4, fullMark: 100 },
    { subject: 'Opini BPK (WTP)', target: 100.0, realisasi: 100.0, fullMark: 100 },
  ];

  const activeExpenseList: FiscalSummaryExpense[] =
    expenseUnitMode === 'all_units' ? FISCAL_EXPENSE_SUMMARY_DATA : FISCAL_EXPENSE_PERKIN_UNITS;

  const totalPaguFiltered = activeExpenseList.reduce((acc, curr) => acc + curr.pagu, 0);
  const totalSerapanFiltered = activeExpenseList.reduce((acc, curr) => acc + curr.serapan, 0);
  const avgSerapanPercent = totalPaguFiltered > 0 ? (totalSerapanFiltered / totalPaguFiltered) * 100 : 0;

  // Chart Data for Grouped / Stacked Status vs Jenjang Pendidikan
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
      {/* Tab Navigation Controls */}
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
              Analisis terpadu performa fiskal, serapan belanja unit, distribusi status kepegawaian & kualifikasi pendidikan, serta radar 4 indeks akuntabilitas
            </p>
          </div>
        </div>

        {/* Tab Pills (Sesuai Permintaan User: Sheet 1 Radar Capaian 4 IKP, Sheet 2 Kinerja Fiskal, Sheet 3 Kualifikasi Pendidikan) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('akuntabilitas_okmr')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'akuntabilitas_okmr'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Radar Capaian 4 IKP &amp; Tata Kelola</span>
          </button>

          <button
            onClick={() => setActiveTab('fiskal_keuangan')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'fiskal_keuangan'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Kinerja Fiskal &amp; Belanja Unit</span>
          </button>

          <button
            onClick={() => setActiveTab('sdm_demografi')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sdm_demografi'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Kualifikasi Pendidikan &amp; Status Pegawai</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* VIEW 1: KINERJA FISKAL & BELANJA UNIT                                */}
      {/* MENGIKUTI FORMAT RINGKASAN KEUANGAN DASHBOARD KEPALA BP BATAM        */}
      {/* ==================================================================== */}
      {activeTab === 'fiskal_keuangan' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 font-mono">
                  RINGKASAN KEUANGAN & REALISASI FISKAL KONSOLIDASI
                </span>
                <div className="text-[10px] text-slate-400 font-mono">
                  REALISASI YTD TAHUN ANGGARAN 2026 • BADAN PENGUSAHAAN BATAM
                </div>
              </div>
            </div>

            {/* Quick Indicators Pill */}
            <div className="flex items-center gap-2 font-mono text-[10.5px]">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                Surplus: +Rp 36,2 M
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                Kemandirian: 0.86
              </span>
            </div>
          </div>

          {/* Penerimaan vs Belanja Strip (Identik dengan format Kepala BP Batam) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-extrabold text-slate-500 uppercase tracking-wide">
                  PENERIMAAN (PNBP BLU)
                </span>
                <span className="text-slate-400">Target: Rp 2,45 T</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900">
                Rp 981,2 M
              </div>
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-200/60">
                <span className="font-bold text-emerald-700">40.1% Capaian Target</span>
                <span className="text-slate-400">6 Sektor PNBP Aktif</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-extrabold text-slate-500 uppercase tracking-wide">
                  REALISASI BELANJA
                </span>
                <span className="text-slate-400">Pagu DIPA: Rp 3,32 T</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900">
                Rp 945,0 M
              </div>
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-200/60">
                <span className="font-bold text-blue-700">28.5% Serapan Anggaran</span>
                <span className="text-slate-400">Termin Pengadaan Berjalan</span>
              </div>
            </div>
          </div>

          {/* Two Sub-columns: Performa Penerimaan vs Realisasi Belanja Unit */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-[10.5px]">
            {/* Left Sub-column: Sektor Penerimaan PNBP */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500 font-mono">
                  RINCIAN PENERIMAAN (PNBP BLU)
                </span>
                <span className="text-[9.5px] font-mono text-emerald-700 font-bold">
                  KONTRIBUTOR UTAMA
                </span>
              </div>

              <div className="space-y-1.5 font-mono">
                {FISCAL_REVENUE_SUMMARY_DATA.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/60 flex items-center justify-between hover:bg-slate-100/70 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="w-4 h-4 rounded bg-slate-200 text-slate-700 text-[9px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <div className="text-[11px] font-bold text-slate-800 truncate uppercase">
                          {item.sektor}
                        </div>
                        <div className="text-[9px] text-slate-400">
                          Target: Rp {(item.target / 1000000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-bold text-slate-900 text-xs">
                        Rp {(item.realisasi / 1000000000).toFixed(1)}M
                      </div>
                      <div className="text-[9.5px] font-bold text-emerald-700">
                        {item.persentase.toFixed(1)}% Capaian
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sub-column: Realisasi Serapan Belanja Satker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500 font-mono">
                  REALISASI BELANJA SATKER
                </span>

                {/* Scope Switcher */}
                <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md text-[9.5px] font-sans">
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

              <div className="space-y-1.5 font-mono max-h-[310px] overflow-y-auto pr-0.5">
                {activeExpenseList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/60 flex items-center justify-between hover:bg-slate-100/70 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="w-4 h-4 rounded bg-slate-200 text-slate-700 text-[9px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <div className="text-[11px] font-bold text-slate-800 truncate uppercase">
                          {item.unitKerja}
                        </div>
                        <div className="text-[9px] text-slate-400">
                          Pagu: Rp {(item.pagu / 1000000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-bold text-slate-900 text-xs">
                        Rp {(item.serapan / 1000000000).toFixed(1)}M
                      </div>
                      <div
                        className={`text-[9.5px] font-bold ${
                          item.persentase >= 35
                            ? 'text-emerald-700'
                            : item.persentase >= 30
                            ? 'text-blue-700'
                            : 'text-slate-600'
                        }`}
                      >
                        {item.persentase.toFixed(1)}% Serapan
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Status Line (Identik dengan format Kepala BP Batam) */}
          <div className="pt-2 border-t border-slate-100 text-[10.5px] font-mono text-emerald-700 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Status: Saldo kas bank penampung BLU Rp 1,42T tersimpan aman di Bank Himbara.</span>
            </div>
            <span className="text-slate-500">Nilai IKPA Kemenkeu: <strong>96.25 (Sangat Baik)</strong></span>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* VIEW 2: KUALIFIKASI PENDIDIKAN DAN STATUS PEGAWAI                    */}
      {/* HANYA MENAMPILKAN GRAFIK BATANG SESUAI PERMINTAAN USER               */}
      {/* ==================================================================== */}
      {activeTab === 'sdm_demografi' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                  KUALIFIKASI PENDIDIKAN DAN STATUS PEGAWAI
                </h4>
                <span className="text-[10.5px] text-slate-500">
                  Buku Satu Data BP Batam (Hal. 1-2): Komposisi Jenjang Pendidikan pada 5 Status Kepegawaian (Total 2.978 Pegawai)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-700">
              <span className="px-2.5 py-1 rounded bg-slate-100 font-bold border border-slate-200">
                Total: 2.978 Pegawai
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                Sarjana+: 64.5% (1.920 Org)
              </span>
            </div>
          </div>

          {/* GRAFIK BATANG KOMPARASI STATUS VS PENDIDIKAN */}
          <div className="space-y-3 pt-1">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartDataStatusPendidikan}
                  margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="fullName"
                    tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                  />
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
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="S1" stackId="a" fill="#0284C7" name="S1 / D4" />
                  <Bar dataKey="S2" stackId="a" fill="#2563EB" name="S2 (Magister)" />
                  <Bar dataKey="S3" stackId="a" fill="#4338CA" name="S3 (Doktor)" />
                  <Bar dataKey="D3" stackId="a" fill="#0D9488" name="D3 (Diploma)" />
                  <Bar dataKey="SMA" stackId="a" fill="#F59E0B" name="SMA / SMK" />
                  <Bar dataKey="SD_SMP" stackId="a" fill="#94A3B8" name="SMP / SD" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Status Breakdown Quick Summary Row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-100 font-mono text-xs">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">PNS (1.042)</span>
                <span className="font-extrabold text-blue-700">79.5% Sarjana+</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">P2K Tetap (872)</span>
                <span className="font-extrabold text-indigo-700">65.8% Sarjana+</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">PPPK (485)</span>
                <span className="font-extrabold text-cyan-700">68.5% Sarjana+</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">PTT Kontrak (396)</span>
                <span className="font-extrabold text-amber-700">22.2% Sarjana+</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Profesional (183)</span>
                <span className="font-extrabold text-emerald-700">93.4% Sarjana+</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 italic pt-1">
              * Keterangan: PNS = Pegawai Negeri Sipil (1.042 org) • P2K = Pegawai Perjanjian Kerja Tetap (872 org) • PPPK = Pegawai Pemerintah dgn Perjanjian Kerja (485 org) • PTT = Pegawai Tidak Tetap Operasional (396 org) • PROF = Tenaga Profesional Khusus/Medis (183 org).
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* VIEW 3: AKUNTABILITAS & TATA KELOLA BIRO OKMR (DEP A1)               */}
      {/* MENGINTEGRASIKAN RADAR, SAKIP, PEKPPP, PENGADUAN, DAN PIAGAM RISIKO */}
      {/* ==================================================================== */}
      {activeTab === 'akuntabilitas_okmr' && (
        <div className="space-y-4">
          {/* Header Banner for 4 IKP Tata Kelola & Akuntabilitas */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800 shadow-2xs">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Radar Capaian 4 IKP Tata Kelola &amp; Akuntabilitas Unit
                </h4>
                <p className="text-[10.5px] text-slate-500 font-mono">
                  Sinergi Biro OKMR, Biro Sumber Daya Manusia, dan Biro Keuangan BP Batam
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-bold hidden sm:inline-block">
              Buku Satu Data Hal. 1-5
            </span>
          </div>

          {/* VIEW 3A: RADAR CAPAIAN 4 IKP & TABEL DETAIL PENILAIAN (PERSIS FORMAT DEP-A2) */}
          {okmrSubTab === 'radar' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                {/* Left: Radar Chart 4 IKP Capaian vs Target */}
                <div className="xl:col-span-4 bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-sky-600" />
                      <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                        Radar Capaian 4 IKP vs Target
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      100% On-Target
                    </span>
                  </div>

                  <div className="h-64 sm:h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radar4IkpData}>
                        <PolarGrid stroke="#E2E8F0" />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: '#334155', fontSize: 10.5, fontWeight: 700 }}
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" fontSize={9} />
                        <Radar
                          name="Target Perkin"
                          dataKey="target"
                          stroke="#94A3B8"
                          fill="#94A3B8"
                          fillOpacity={0.2}
                          strokeDasharray="4 4"
                        />
                        <Radar
                          name="Realisasi Kinerja"
                          dataKey="realisasi"
                          stroke="#0284C7"
                          fill="#0284C7"
                          fillOpacity={0.45}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                        <Tooltip
                          formatter={(val: any, name: any) => [
                            `${Number(val).toFixed(1)}%`,
                            name,
                          ]}
                          contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 font-mono text-[10.5px]">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Rata-Rata Capaian 4 IKP:</span>
                      <span className="font-extrabold text-emerald-700">107.7% Melampaui Target</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      *Indeks SPIP (3.42) &amp; Sistem Merit (342.5) diskalakan ke 100 untuk keseragaman visual radar. Seluruh indikator telah melampaui target Perkin.
                    </div>
                  </div>
                </div>

                {/* Right: 4 Detailed IKP Performance Cards (Persis seperti Capaian Evaluasi 4 IKP DEP-A2) */}
                <div className="xl:col-span-8 bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-sky-600" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                          Capaian Evaluasi 4 Indikator Kinerja Program (IKP)
                        </h4>
                        <p className="text-[10px] sm:text-[10.5px] text-slate-500">
                          Tabel rincian komponen 8 area perubahan RB, 8 aspek sistem merit, 5 unsur maturitas SPIP, serta kriteria evaluasi Opini BPK
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 shrink-0 self-start sm:self-auto">
                      Perkin A1 BP Batam
                    </span>
                  </div>

                  {/* Grid 2 Sebaris, 2 Dibawahnya (Persis DEP-A2) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* CARD 1: IKP-1 INDEKS REFORMASI BIROKRASI */}
                    <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded text-[10px] border border-indigo-200">
                          IKP-1 &bull; BIRO OKMR
                        </span>
                        <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                          101.43% Tercapai
                        </span>
                      </div>

                      <div>
                        <h5 className="text-xs font-bold text-slate-900 leading-snug">
                          Indeks Reformasi Birokrasi (RB)
                        </h5>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Unit: Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)
                        </span>
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between mb-1">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black font-mono text-slate-900">81.14</span>
                            <span className="text-[10.5px] font-bold text-indigo-700">Predikat A</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">
                            Target: <strong className="text-slate-800">80.00</strong> (Sangat Baik)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div style={{ width: '100%' }} className="bg-indigo-600 h-full rounded-full" />
                        </div>
                      </div>

                      {/* Tabel Komponen RB dan Nilainya (Permintaan User: Komponen 8 area & Nilai) */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-slate-700">Tabel Komponen Penilaian RB (8 Area Perubahan):</span>
                          <span className="text-[9px] font-mono text-slate-500">8 Komponen</span>
                        </div>
                        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60 max-h-[190px] overflow-y-auto">
                          <table className="w-full text-left text-[9.5px]">
                            <thead className="sticky top-0 bg-slate-100/95 z-10">
                              <tr className="text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                                <th className="py-1 px-1.5">Komponen (8 Area Perubahan)</th>
                                <th className="py-1 px-1 text-center">Bobot</th>
                                <th className="py-1 px-1.5 text-right">Indeks RB (Nilai)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                              {RB_8_AREA_TABLE_DATA.map((item) => (
                                <tr key={item.no} className="hover:bg-white transition-colors">
                                  <td className="py-1 px-1.5 font-sans truncate max-w-[150px]" title={item.komponen}>
                                    {item.komponen}
                                  </td>
                                  <td className="py-1 px-1 text-center font-mono text-slate-500">
                                    {item.bobot}
                                  </td>
                                  <td className="py-1 px-1.5 text-right font-mono font-black text-indigo-700">
                                    {item.nilai.toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                              <tr className="bg-indigo-50/70 font-bold text-slate-900 border-t border-indigo-200 text-[9.5px]">
                                <td className="py-1 px-1.5 font-bold text-indigo-950">
                                  Total Indeks RB (Predikat A):
                                </td>
                                <td className="py-1 px-1 text-center font-mono text-indigo-900">100%</td>
                                <td className="py-1 px-1.5 text-right font-mono font-black text-indigo-900">
                                  81.14
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenFormulaModal?.('ikp-1-rb')}
                        className="w-full text-center text-[10px] text-indigo-700 hover:text-indigo-900 font-bold py-1 bg-white hover:bg-indigo-50 rounded-lg border border-indigo-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                      >
                        <Calculator className="w-3 h-3 text-indigo-600" />
                        <span>Lihat Panduan &amp; Formula RB</span>
                      </button>
                    </div>

                    {/* CARD 2: IKP-2 INDEKS SISTEM MERIT */}
                    <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded text-[10px] border border-purple-200">
                          IKP-2 &bull; BIRO SDM
                        </span>
                        <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                          122.32% Tercapai
                        </span>
                      </div>

                      <div>
                        <h5 className="text-xs font-bold text-slate-900 leading-snug">
                          Indeks Penerapan Sistem Merit
                        </h5>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Unit: Biro Sumber Daya Manusia (BSDM)
                        </span>
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between mb-1">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black font-mono text-slate-900">342.5</span>
                            <span className="text-[10.5px] font-bold text-purple-700">Kategori IV</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">
                            Target: <strong className="text-slate-800">280 Poin</strong> (Baik)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div style={{ width: '100%' }} className="bg-purple-600 h-full rounded-full" />
                        </div>
                      </div>

                      {/* Tabel Komponen Sistem Merit dan Nilainya (Permintaan User: 8 aspek, bobot, nilai) */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-slate-700">Tabel Komponen Penilaian (8 Aspek Sistem Merit):</span>
                          <span className="text-[9px] font-mono text-slate-500">8 Aspek</span>
                        </div>
                        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60 max-h-[190px] overflow-y-auto">
                          <table className="w-full text-left text-[9.5px]">
                            <thead className="sticky top-0 bg-slate-100/95 z-10">
                              <tr className="text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                                <th className="py-1 px-1.5">Komponen Penilaian (8 Aspek)</th>
                                <th className="py-1 px-1 text-center">Bobot</th>
                                <th className="py-1 px-1.5 text-right">Nilai per Aspek</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                              {MERIT_8_ASPEK_TABLE_DATA.map((item) => (
                                <tr key={item.no} className="hover:bg-white transition-colors">
                                  <td className="py-1 px-1.5 font-sans truncate max-w-[150px]" title={item.komponen}>
                                    {item.komponen}
                                  </td>
                                  <td className="py-1 px-1 text-center font-mono text-slate-500">
                                    {item.bobot}
                                  </td>
                                  <td className="py-1 px-1.5 text-right font-mono font-black text-purple-700">
                                    {item.nilai.toFixed(1)}
                                  </td>
                                </tr>
                              ))}
                              <tr className="bg-purple-50/70 font-bold text-slate-900 border-t border-purple-200 text-[9.5px]">
                                <td className="py-1 px-1.5 font-bold text-purple-950">
                                  Total Skor Merit (Sangat Baik):
                                </td>
                                <td className="py-1 px-1 text-center font-mono text-purple-900">400 (100%)</td>
                                <td className="py-1 px-1.5 text-right font-mono font-black text-purple-900">
                                  342.5 Poin
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenFormulaModal?.('ikp-2-merit')}
                        className="w-full text-center text-[10px] text-purple-700 hover:text-purple-900 font-bold py-1 bg-white hover:bg-purple-50 rounded-lg border border-purple-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                      >
                        <Calculator className="w-3 h-3 text-purple-600" />
                        <span>Lihat Panduan &amp; Formula Sistem Merit</span>
                      </button>
                    </div>

                    {/* CARD 3: IKP-3 INDEKS MATURITAS SPIP */}
                    <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                          IKP-3 &bull; BIRO OKMR
                        </span>
                        <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                          106.88% Tercapai
                        </span>
                      </div>

                      <div>
                        <h5 className="text-xs font-bold text-slate-900 leading-snug">
                          Indeks Maturitas SPIP Terintegrasi
                        </h5>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Unit: Biro OKMR / Bagian Pengendalian Intern &amp; BPKP
                        </span>
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between mb-1">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black font-mono text-slate-900">3.42</span>
                            <span className="text-[10.5px] font-bold text-emerald-700">Level 3 Terdefinisi</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">
                            Target: <strong className="text-slate-800">3.20</strong> (Level 3)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div style={{ width: '100%' }} className="bg-emerald-600 h-full rounded-full" />
                        </div>
                      </div>

                      {/* Tabel Komponen SPIP dan Nilainya (Permintaan User: Komponen penilaian, bobot dan nilainya) */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-slate-700">Tabel Komponen Penilaian (5 Unsur Maturitas SPIP):</span>
                          <span className="text-[9px] font-mono text-slate-500">5 Unsur</span>
                        </div>
                        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60 max-h-[190px] overflow-y-auto">
                          <table className="w-full text-left text-[9.5px]">
                            <thead className="sticky top-0 bg-slate-100/95 z-10">
                              <tr className="text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                                <th className="py-1 px-1.5">Komponen Penilaian</th>
                                <th className="py-1 px-1 text-center">Bobot</th>
                                <th className="py-1 px-1.5 text-right">Nilai / Skor</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                              {SPIP_5_UNSUR_TABLE_DATA.map((item) => (
                                <tr key={item.no} className="hover:bg-white transition-colors">
                                  <td className="py-1 px-1.5 font-sans truncate max-w-[150px]" title={item.komponen}>
                                    {item.komponen}
                                  </td>
                                  <td className="py-1 px-1 text-center font-mono text-slate-500">
                                    {item.bobot}
                                  </td>
                                  <td className="py-1 px-1.5 text-right font-mono font-black text-emerald-700">
                                    {item.nilai.toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                              <tr className="bg-emerald-50/70 font-bold text-slate-900 border-t border-emerald-200 text-[9.5px]">
                                <td className="py-1 px-1.5 font-bold text-emerald-950">
                                  Total Maturitas SPIP (Level 3):
                                </td>
                                <td className="py-1 px-1 text-center font-mono text-emerald-900">100%</td>
                                <td className="py-1 px-1.5 text-right font-mono font-black text-emerald-900">
                                  3.42
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenFormulaModal?.('ikp-3-spip')}
                        className="w-full text-center text-[10px] text-emerald-700 hover:text-emerald-900 font-bold py-1 bg-white hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                      >
                        <Calculator className="w-3 h-3 text-emerald-600" />
                        <span>Lihat Panduan &amp; Formula SPIP</span>
                      </button>
                    </div>

                    {/* CARD 4: IKP-4 OPINI BPK ATAS LAPORAN KEUANGAN */}
                    <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-teal-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded text-[10px] border border-teal-200">
                          IKP-4 &bull; BIRO KEUANGAN
                        </span>
                        <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                          100.0% Tercapai
                        </span>
                      </div>

                      <div>
                        <h5 className="text-xs font-bold text-slate-900 leading-snug">
                          Opini BPK atas Laporan Keuangan
                        </h5>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Unit: Biro Keuangan BP Batam &amp; Pemeriksaan BPK RI
                        </span>
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between mb-1">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black font-mono text-teal-800">WTP</span>
                            <span className="text-[10.5px] font-bold text-teal-700">8x Berturut</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">
                            Target: <strong className="text-slate-800">WTP</strong> (Unqualified)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div style={{ width: '100%' }} className="bg-teal-600 h-full rounded-full" />
                        </div>
                      </div>

                      {/* Tabel Kriteria Opini BPK dan Statusnya (Permintaan User: Tabel Opini BPK) */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-slate-700">Tabel Kriteria Penilaian Opini BPK (4 Kriteria SAP):</span>
                          <span className="text-[9px] font-mono text-slate-500">4 Kriteria</span>
                        </div>
                        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60 max-h-[190px] overflow-y-auto">
                          <table className="w-full text-left text-[9.5px]">
                            <thead className="sticky top-0 bg-slate-100/95 z-10">
                              <tr className="text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                                <th className="py-1 px-1.5">Kriteria Pemeriksaan BPK</th>
                                <th className="py-1 px-1 text-center">Dasar Standar</th>
                                <th className="py-1 px-1.5 text-right">Hasil Evaluasi</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                              {OPINI_BPK_TABLE_DATA.map((item) => (
                                <tr key={item.no} className="hover:bg-white transition-colors">
                                  <td className="py-1 px-1.5 font-sans truncate max-w-[150px]" title={item.kriteria}>
                                    {item.kriteria}
                                  </td>
                                  <td className="py-1 px-1 text-center font-mono text-slate-500">
                                    {item.dasar}
                                  </td>
                                  <td className="py-1 px-1.5 text-right font-mono font-bold text-teal-800">
                                    <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px]">
                                      {item.hasil}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                              <tr className="bg-teal-50/70 font-bold text-slate-900 border-t border-teal-200 text-[9.5px]">
                                <td className="py-1 px-1.5 font-bold text-teal-950">
                                  Hasil Opini Laporan Keuangan:
                                </td>
                                <td className="py-1 px-1 text-center font-mono text-teal-900">BPK RI</td>
                                <td className="py-1 px-1.5 text-right font-mono font-black text-teal-900">
                                  WTP Paripurna
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenFormulaModal?.('ikp-4-wtp')}
                        className="w-full text-center text-[10px] text-teal-700 hover:text-teal-900 font-bold py-1 bg-white hover:bg-teal-50 rounded-lg border border-teal-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                      >
                        <Calculator className="w-3 h-3 text-teal-600" />
                        <span>Lihat Panduan &amp; Regulasi Opini BPK</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
