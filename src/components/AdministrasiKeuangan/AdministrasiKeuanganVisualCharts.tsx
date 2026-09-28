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

export const AdministrasiKeuanganVisualCharts: React.FC<
  AdministrasiKeuanganVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    'fiskal_keuangan' | 'sdm_demografi' | 'akuntabilitas_okmr'
  >('fiskal_keuangan');

  // Expense Unit Filter Mode: 'all_units' vs 'perkin_units'
  const [expenseUnitMode, setExpenseUnitMode] = useState<'all_units' | 'perkin_units'>('all_units');

  // Radar Data for 6 Vital Indices related to Deputi Administrasi & Keuangan & Biro OKMR
  const radarData = [
    { subject: 'Indeks RB', target: 80.0, realisasi: 81.14, fullMark: 100 },
    { subject: 'Nilai SAKIP', target: 81.5, realisasi: 82.68, fullMark: 100 },
    { subject: 'Maturitas SPIP', target: 66.0, realisasi: 68.4, fullMark: 100 },
    { subject: 'Sistem Merit', target: 70.0, realisasi: 85.6, fullMark: 100 },
    { subject: 'Manajemen Risiko (MRI)', target: 64.0, realisasi: 67.0, fullMark: 100 },
    { subject: 'Evaluasi Kelembagaan', target: 75.0, realisasi: 78.4, fullMark: 100 },
  ];

  // Data Konsolidasi Nilai Indeks-Indeks Tata Kelola & Akuntabilitas Biro OKMR & Deputi 1
  const OKMR_GOVERNANCE_INDICES = [
    {
      id: 'sakip',
      label: 'Nilai Akuntabilitas Kinerja (SAKIP)',
      subtext: 'Perencanaan, Pengukuran & LAKIP BP',
      target: 'Target: 81.50',
      realisasi: '82.68',
      predikat: 'Predikat A Memuaskan',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      pengampu: 'Biro OKMR & Pimpinan BP Batam',
    },
    {
      id: 'spip',
      label: 'Maturitas SPIP Terintegrasi',
      subtext: 'Kematangan Pengendalian Intern BPKP',
      target: 'Target: 3.30',
      realisasi: '3.42',
      predikat: 'Level 3 Terdefinisi',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      pengampu: 'Biro OKMR & Seluruh Satker',
    },
    {
      id: 'rb',
      label: 'Indeks Reformasi Birokrasi (RB)',
      subtext: 'Evaluasi 8 Area Perubahan MenPAN-RB',
      target: 'Target: 80.00',
      realisasi: '81.14',
      predikat: 'Predikat A',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      pengampu: 'Biro OKMR (Tata Laksana & RB)',
    },
    {
      id: 'lhkpn',
      label: 'Tingkat Kepatuhan LHKPN',
      subtext: 'Kepatuhan Wajib Lapor KPK RI',
      target: 'Target: 100%',
      realisasi: '100%',
      predikat: 'Selesai Tepat Waktu',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      pengampu: 'Kepatuhan Internal Biro OKMR',
    },
    {
      id: 'mri',
      label: 'Manajemen Risiko Indeks (MRI)',
      subtext: 'Validasi Piagam Register Risiko 24 Satker',
      target: 'Target: 3.20',
      realisasi: '3.35',
      predikat: 'Level 3 Terkelola',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      pengampu: 'Biro OKMR (Bagian MR)',
    },
    {
      id: 'kelembagaan',
      label: 'Evaluasi Kelembagaan',
      subtext: 'Tingkat Kematangan Struktur & Tata Kelola',
      target: 'Target: 75.00',
      realisasi: '78.40',
      predikat: 'Efektif & Efisien',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      pengampu: 'Biro OKMR (Bagian Organisasi)',
    },
    {
      id: 'merit',
      label: 'Indeks Penerapan Sistem Merit',
      subtext: 'Evaluasi 8 Aspek KASN & BKN RI',
      target: 'Target: 280 Poin',
      realisasi: '342.5 Poin',
      predikat: 'Kategori IV (Sangat Baik)',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      pengampu: 'Biro Sumber Daya Manusia',
    },
    {
      id: 'wtp_ikpa',
      label: 'Opini BPK & Akuntabilitas Keuangan (IKPA)',
      subtext: 'Laporan Keuangan SAP & Nilai IKPA Kemenkeu',
      target: 'Target: WTP / IKPA 95.0',
      realisasi: 'WTP / 96.25',
      predikat: 'Paripurna (8x Berturut)',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      pengampu: 'Biro Keuangan',
    },
    {
      id: 'pekppp',
      label: 'Indeks Pelayanan Publik (PEKPPP)',
      subtext: 'Kualitas Pelayanan Terpadu & Sektor Usaha',
      target: 'Target: 4.00 / 5.0',
      realisasi: '4.38 / 5.0',
      predikat: 'Predikat A- (Sangat Baik)',
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      pengampu: 'Biro OKMR & Satker Pelayanan',
    },
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
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Kualifikasi Pendidikan & Status Pegawai</span>
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
      {/* VIEW 3: RADAR AKUNTABILITAS & OKMR + KONSOLIDASI INDEKS TATA KELOLA  */}
      {/* MENAMPILKAN RADAR INDEKS DAN KONSOLIDASI LENGKAP NILAI INDEKS TATA KELOLA */}
      {/* ==================================================================== */}
      {activeTab === 'akuntabilitas_okmr' && (
        <div className="space-y-4">
          {/* Top Row: Radar Chart Indeks Akuntabilitas & Tata Kelola OKMR */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between pb-2 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                  RADAR INDEKS AKUNTABILITAS &amp; TATA KELOLA OKMR
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold">
                  SAKIP Predikat A (82.68) • RB Predikat A (81.14)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold">
                  Target vs Realisasi
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 10.5, fill: '#334155', fontWeight: 600 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#94A3B8' }} />
                  <Radar
                    name="Target Standar / Perkin"
                    dataKey="target"
                    stroke="#94A3B8"
                    fill="#94A3B8"
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="Realisasi Capaian"
                    dataKey="realisasi"
                    stroke="#0284C7"
                    fill="#0284C7"
                    fillOpacity={0.45}
                  />
                  <Tooltip
                    formatter={(value: any, name: any) => [`${value}% Skala 100`, name]}
                    contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-[10.5px] text-slate-500 pt-2 border-t border-slate-100 font-mono flex flex-wrap items-center justify-between gap-2">
              <span>Pengampu Utama: Biro OKMR, didukung Biro SDM &amp; Biro Keuangan</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                6 Indeks Seluruhnya Melampaui Target
              </span>
            </div>
          </div>

          {/* Bottom Section: KONSOLIDASI LENGKAP INDEKS-INDEKS TATA KELOLA & AKUNTABILITAS */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                    KONSOLIDASI INDEKS TATA KELOLA &amp; AKUNTABILITAS UNIT (BIRO OKMR, SDM, KEUANGAN)
                  </h4>
                  <p className="text-[10.5px] text-slate-500">
                    Rincian parameter, target perkin, capaian riil, serta predikat akuntabilitas di bawah koordinasi Deputi Bidang Administrasi dan Keuangan
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                9 INDEKS KONSOLIDASI
              </span>
            </div>

            {/* Grid 9 Index Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {OKMR_GOVERNANCE_INDICES.map((idx) => (
                <div
                  key={idx.id}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-2xs transition-all flex flex-col justify-between space-y-2.5"
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-1.5">
                      <span className="text-[11px] font-extrabold text-slate-900 leading-snug">
                        {idx.label}
                      </span>
                      <span
                        className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${idx.badgeColor}`}
                      >
                        {idx.predikat}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-snug">
                      {idx.subtext}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {idx.target}
                      </span>
                      <span className="text-base font-black text-slate-900 font-mono">
                        {idx.realisasi}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 font-mono block">Pengampu:</span>
                      <span className="text-[10px] font-semibold text-slate-700 font-mono">
                        {idx.pengampu.split('(')[0].trim()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
