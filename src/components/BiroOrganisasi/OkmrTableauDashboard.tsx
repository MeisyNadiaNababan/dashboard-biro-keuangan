import React, { useState } from 'react';
import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  Award,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Layers,
  FileCode2,
  Copy,
  Check,
  Download,
  HelpCircle,
  BarChart3,
  PieChart as PieIcon,
  MessageSquare,
  Building,
  Target,
  FileSpreadsheet,
  Zap,
  ExternalLink,
  ArrowRight,
  ArrowDownRight,
  Sparkles,
  SlidersHorizontal,
  Info,
} from 'lucide-react';
import {
  BOKMR_SUMMARY,
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
  MRI_DATA,
} from './bokmrData';
import { BokmrFilterState } from './types';

interface OkmrTableauDashboardProps {
  filters: BokmrFilterState;
  onOpenFormulaModal?: (datasetIndex: number) => void;
}

type TableauTab =
  | 'overview'
  | 'sakip'
  | 'risk_matrix'
  | 'spip_blu'
  | 'pengaduan'
  | 'tableau_spec';

export const OkmrTableauDashboard: React.FC<OkmrTableauDashboardProps> = ({
  filters,
  onOpenFormulaModal,
}) => {
  const [activeTab, setActiveTab] = useState<TableauTab>('overview');
  const [selectedRiskCell, setSelectedRiskCell] = useState<{ impact: number; prob: number } | null>(null);
  const [selectedRiskUnit, setSelectedRiskUnit] = useState<string>('Semua');
  const [riskVisualMode, setRiskVisualMode] = useState<'dumbbell' | 'profile' | 'quadrant'>('dumbbell');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filtered Piagam Risiko
  const filteredRisks = PIAGAM_RISIKO_DATA.filter((r) => {
    if (selectedRiskUnit !== 'Semua' && r.unitKerja !== selectedRiskUnit) return false;
    return true;
  });

  // Calculate totals for BLU
  const totalRekomendasi = PENYELESAIAN_REKOMENDASI_BLU.reduce((s, i) => s + i.rekomendasiTotal, 0);
  const totalSelesai = PENYELESAIAN_REKOMENDASI_BLU.reduce((s, i) => s + i.rekomendasiSelesai, 0);
  const pctBluSelesai = ((totalSelesai / totalRekomendasi) * 100).toFixed(1);

  // Total Pengaduan
  const totalDiterima = PENGADUAN_BADAN_USAHA_DATA.reduce((s, i) => s + i.jmlPengaduanDiterima, 0);
  const totalPengaduanSelesai = PENGADUAN_BADAN_USAHA_DATA.reduce((s, i) => s + i.jmlPengaduanSelesai, 0);
  const pctPengaduanSelesai = ((totalPengaduanSelesai / totalDiterima) * 100).toFixed(1);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Tableau CSV Generator for raw export
  const handleDownloadTableauCSV = () => {
    const csvContent = [
      'Worksheet,Dimensi,Kategori,Target,Realisasi,Satuan,Persentase_Capaian,Status',
      ...SAKIP_COMPONENTS_DATA.map(
        (s) =>
          `SAKIP,"${s.komponen}","Bobot",${s.bobot},${s.nilai},"Poin",${s.capaianPersen.toFixed(1)},"${s.tingkatAkuntabilitas}"`
      ),
      ...SPIP_MATURITAS_ITEMS.map(
        (sp) =>
          `SPIP,"${sp.komponenPenilaian}","Maturitas",${sp.targetSkor},${sp.skor},"Level",${((sp.skor / sp.targetSkor) * 100).toFixed(1)},"${sp.levelMaturitas}"`
      ),
      ...PENYELESAIAN_REKOMENDASI_BLU.map(
        (b) =>
          `BLU,"${b.entitasPengawas}","Rekomendasi",${b.rekomendasiTotal},${b.rekomendasiSelesai},"Kasus",${b.persentasePenyelesaian.toFixed(1)},"Selesai"`
      ),
      ...PENGADUAN_BADAN_USAHA_DATA.map(
        (p) =>
          `PENGADUAN,"${p.unitPelayanan}","Layanan",${p.jmlPengaduanDiterima},${p.jmlPengaduanSelesai},"Aduan",${p.persentaseSelesai.toFixed(1)},"Selesai"`
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Tableau_Dataset_OKMR_BPBatam_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-sans">
      {/* ========================================================================= */}
      {/* 1. TABLEAU EXECUTIVE HEADER & NAVIGATION */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#E9762B]/10 text-[#E9762B] border border-[#E9762B]/30 flex items-center justify-center shrink-0">
            {/* Tableau classic logo mark styled icon */}
            <BarChart3 className="w-5 h-5 text-[#E9762B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-[#C45E1B] border border-amber-200">
                TABLEAU-READY DASHBOARD
              </span>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                Tata Kelola Organisasi, Kepatuhan &amp; Manajemen Risiko
              </h2>
            </div>
            <p className="text-[10.5px] text-slate-500">
              Visualisasi terstruktur &amp; intuitif sesuai standar lembar kerja Tableau (Halaman 38–40 Satu Data)
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={handleDownloadTableauCSV}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10.5px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
            title="Download CSV siap import ke Tableau Desktop"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Ekspor Dataset Tableau (.csv)</span>
          </button>

          {onOpenFormulaModal && (
            <button
              onClick={() => onOpenFormulaModal(2)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10.5px] font-semibold bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors border border-sky-200"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Kamus &amp; Formula</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW TABS (TABLEAU WORKBOOK NAVIGATION) */}
      <div className="flex items-center gap-1 overflow-x-auto text-[11px] bg-slate-100 p-1 rounded-xl border border-slate-200/80">
        {[
          { id: 'overview', label: '1. Dashboard Eksekutif', icon: Layers },
          { id: 'sakip', label: '2. Akuntabilitas SAKIP (DS #2)', icon: Activity },
          { id: 'risk_matrix', label: '3. Mitigasi Risiko / Dumbbell (DS #14 & #18)', icon: ShieldAlert },
          { id: 'spip_blu', label: '4. Kepatuhan BLU & SPIP (DS #6, 7, 17)', icon: ShieldCheck },
          { id: 'pengaduan', label: '5. Pengaduan & SKM (DS #10 & #11)', icon: MessageSquare },
          { id: 'tableau_spec', label: '📐 Blueprint Worksheet Tableau', icon: FileSpreadsheet },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TableauTab)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-slate-900 shadow-2xs font-bold border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E9762B]' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 2. TABLEAU BANS (BIG ASS NUMBERS - 4 CORE METRIC CARDS) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* KPI 1: SAKIP */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Nilai SAKIP (DS #2)
            </span>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Predikat {PREDIKAT_SAKIP}
            </span>
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                {TOTAL_NILAI_SAKIP}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">/ 100</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: `${TOTAL_NILAI_SAKIP}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[9.5px] text-slate-500 pt-1 border-t border-slate-100">
            <span>Target: <strong>80.00</strong></span>
            <span className="text-emerald-700 font-bold font-mono">+2.68 Pts</span>
          </div>
        </div>

        {/* KPI 2: SPIP */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Maturitas SPIP (DS #17)
            </span>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
              Level 3 - Terdefinisi
            </span>
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                {SKOR_AGREGAT_SPIP}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">/ 5.00</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="bg-sky-600 h-full rounded-full"
                style={{ width: `${(SKOR_AGREGAT_SPIP / 5) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[9.5px] text-slate-500 pt-1 border-t border-slate-100">
            <span>Target: <strong>3.20</strong></span>
            <span className="text-sky-700 font-bold font-mono">+0.22 (Matur)</span>
          </div>
        </div>

        {/* KPI 3: MANAJEMEN RISIKO */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Mitigasi Risiko (DS #14 &amp; 18)
            </span>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              Terkendali
            </span>
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                {MRI_DATA.persentaseMitigasi}%
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Tindakan</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: `${MRI_DATA.persentaseMitigasi}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[9.5px] text-slate-500 pt-1 border-t border-slate-100">
            <span>Reduksi Besaran:</span>
            <span className="text-indigo-700 font-bold font-mono">-60.8% Awal vs Akhir</span>
          </div>
        </div>

        {/* KPI 4: TINDAK LANJUT BLU */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Kepatuhan BLU (DS #6 &amp; 7)
            </span>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              448 Tuntas
            </span>
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                {pctBluSelesai}%
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Rekomendasi</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="bg-amber-500 h-full rounded-full"
                style={{ width: `${pctBluSelesai}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[9.5px] text-slate-500 pt-1 border-t border-slate-100">
            <span>Total Rekomendasi:</span>
            <strong className="text-slate-700 font-mono">467 Temuan</strong>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TABLEAU WORKBOOKS: OVERVIEW & INDIVIDUAL WORKSHEETS */}
      {/* ========================================================================= */}
      {(activeTab === 'overview' || activeTab === 'sakip') && (
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1F77B4]" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Worksheet 1: Evaluasi Komponen SAKIP (Target vs Realisasi Bobot)
              </h3>
              <span className="text-[9.5px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                Tableau Bullet / Horizontal Bar
              </span>
            </div>
            <span className="text-[10px] text-slate-500">
              Evaluasi Akuntabilitas Instansi Pemerintah TA 2025/2026 (Atribut Hal. 38)
            </span>
          </div>

          {/* Tableau-style Horizontal Bar Chart with Benchmark Lines */}
          <div className="space-y-3">
            {SAKIP_COMPONENTS_DATA.map((item) => (
              <div key={item.id} className="group">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-800 font-semibold">{item.komponen}</strong>
                    <span className="text-[9.5px] text-slate-400">
                      (Bobot: {item.bobot.toFixed(1)})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-600 text-[10.5px]">
                      Realisasi: <strong className="text-slate-900">{item.nilai.toFixed(2)}</strong> / {item.bobot}
                    </span>
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded text-[10px] border border-emerald-200">
                      {item.capaianPersen.toFixed(1)}% (A)
                    </span>
                  </div>
                </div>

                {/* Bar with Reference Line at 80% (Threshold for 'A') */}
                <div className="relative w-full h-4 bg-slate-100 rounded-md overflow-hidden flex items-center">
                  <div
                    className="h-full bg-[#1F77B4] rounded-md transition-all duration-500"
                    style={{ width: `${item.capaianPersen}%` }}
                  />
                  {/* 80% Target Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                    style={{ left: '80%' }}
                    title="Target Standar Predikat A (80%)"
                  />
                </div>

                {/* Sub-components Chips */}
                <div className="mt-1 flex flex-wrap gap-1.5 text-[9px] text-slate-500">
                  {item.subKomponen.map((sub) => (
                    <span
                      key={sub.nama}
                      className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 text-slate-600"
                    >
                      {sub.nama}: <strong>{sub.nilai.toFixed(2)}</strong>/{sub.bobot}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-3 h-2 bg-[#1F77B4] rounded-xs" /> Realisasi Nilai Komponen
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-3 bg-slate-900" /> Garis Benchmark Predikat A (80%)
              </span>
            </div>
            <span className="font-mono text-slate-700 font-semibold">
              Total Skor SAKIP: {TOTAL_NILAI_SAKIP} (Target Terlampaui)
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. WORKSHEET 2: EFEKTIVITAS MITIGASI RISIKO (TABLEAU-READY VISUALIZATION) */}
      {/* ========================================================================= */}
      {(activeTab === 'overview' || activeTab === 'risk_matrix') && (
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-3.5">
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E15759]" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Worksheet 2: Efektivitas Mitigasi Risiko Unit Kerja (DS #14 &amp; #18)
                </h3>
                <span className="text-[9.5px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-semibold">
                  100% Risiko Kritis Termitigasi
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Visualisasi terstruktur &amp; mudah dipahami pimpinan: membandingkan skor risiko sebelum vs sesudah mitigasi.
              </p>
            </div>

            {/* View Mode Switcher + Unit Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px]">
                <button
                  onClick={() => setRiskVisualMode('dumbbell')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
                    riskVisualMode === 'dumbbell'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Grafik Penurunan Risiko Dual-Axis (Paling Direkomendasikan di Tableau)"
                >
                  <ArrowDownRight className="w-3 h-3 text-indigo-600" />
                  <span>Dumbbell Chart</span>
                </button>

                <button
                  onClick={() => setRiskVisualMode('profile')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
                    riskVisualMode === 'profile'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Pergeseran Kategori Risiko 100% Stacked Bar"
                >
                  <BarChart3 className="w-3 h-3 text-amber-600" />
                  <span>Profil Risiko (100% Bar)</span>
                </button>

                <button
                  onClick={() => setRiskVisualMode('quadrant')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
                    riskVisualMode === 'quadrant'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Matriks 4 Kuadran Eksekutif"
                >
                  <Layers className="w-3 h-3 text-emerald-600" />
                  <span>4 Kuadran Eksekutif</span>
                </button>
              </div>

              {/* Filter by Unit Kerja */}
              <select
                value={selectedRiskUnit}
                onChange={(e) => setSelectedRiskUnit(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-semibold text-[10px] focus:outline-hidden"
              >
                <option value="Semua">Semua Unit (5 Piagam)</option>
                <option value="Badan Usaha Pelabuhan">BU Pelabuhan</option>
                <option value="Badan Usaha Bandar Udara">BU Bandara</option>
                <option value="Badan Usaha Rumah Sakit BP Batam">BU Rumah Sakit</option>
                <option value="Pusat Pelayanan Terpadu Satu Pintu">PTSP</option>
                <option value="Badan Usaha Fasilitas & Lingkungan (SPAM)">BU SPAM &amp; Fasling</option>
              </select>
            </div>
          </div>

          {/* =================================================================== */}
          {/* VIEW MODE 1: DUMBBELL CHART (PENURUNAN SKOR RISIKO - TABLEAU DUAL AXIS) */}
          {/* =================================================================== */}
          {riskVisualMode === 'dumbbell' && (
            <div className="space-y-3">
              {/* Legend & Scale Header */}
              <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px]">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-700">Skala Risiko:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
                    <span className="text-slate-600">🔴 Skor Awal (Sebelum Mitigasi)</span>
                  </div>
                  <span className="text-slate-300">➔</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                    <span className="text-slate-600">🟢 Skor Akhir (Sesudah Mitigasi)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[9px] text-slate-500">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">0-9 Rendah</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-medium">10-14 Sedang</span>
                  <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-900 font-medium">15-19 Tinggi</span>
                  <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-900 font-medium">20-25 Ekstrem</span>
                </div>
              </div>

              {/* Rows of Dumbbell Chart */}
              <div className="space-y-2.5">
                {filteredRisks.map((r) => {
                  const initialScore = r.besaranRisikoAwalTahun;
                  const finalScore = r.besaranRisikoAkhirTahun;
                  const reductionPct = Math.round(((initialScore - finalScore) / initialScore) * 100);
                  const initialPos = (initialScore / 25) * 100;
                  const finalPos = (finalScore / 25) * 100;

                  return (
                    <div
                      key={r.nomorPiagam}
                      className="p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-xs transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                              {r.nomorPiagam}
                            </span>
                            <span className="text-[11px] font-bold text-slate-900">
                              {r.unitKerja}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-600 font-medium mt-0.5">
                            {r.kejadianRisiko}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
                            Awal: {initialScore} ({r.levelAwal})
                          </span>
                          <span className="text-slate-400 text-xs">➔</span>
                          <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                            Akhir: {finalScore} ({r.levelAkhir})
                          </span>
                          <span className="font-mono text-[10px] font-black text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                            ▼ -{reductionPct}%
                          </span>
                        </div>
                      </div>

                      {/* Visual Dumbbell Track (0 - 25 scale) */}
                      <div className="relative w-full h-8 bg-slate-100/80 rounded-lg overflow-hidden flex items-center px-3">
                        {/* Zone Backgrounds */}
                        <div className="absolute inset-0 flex pointer-events-none opacity-40">
                          <div className="w-[36%] h-full bg-emerald-200/50 border-r border-emerald-300" title="Zona Rendah (0-9)" />
                          <div className="w-[20%] h-full bg-amber-200/50 border-r border-amber-300" title="Zona Sedang (10-14)" />
                          <div className="w-[20%] h-full bg-orange-200/50 border-r border-orange-300" title="Zona Tinggi (15-19)" />
                          <div className="w-[24%] h-full bg-rose-200/50" title="Zona Ekstrem (20-25)" />
                        </div>

                        {/* Connecting Line between Final and Initial */}
                        <div
                          className="absolute h-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 rounded-full z-10"
                          style={{
                            left: `${finalPos}%`,
                            width: `${initialPos - finalPos}%`,
                          }}
                        />

                        {/* Initial Point (Red Circle) */}
                        <div
                          className="absolute z-20 -translate-x-1/2 flex flex-col items-center"
                          style={{ left: `${initialPos}%` }}
                        >
                          <div className="w-5 h-5 rounded-full bg-rose-600 text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-xs border-2 border-white ring-1 ring-rose-300" title={`Skor Awal: ${initialScore}`}>
                            {initialScore}
                          </div>
                        </div>

                        {/* Final Point (Green Circle) */}
                        <div
                          className="absolute z-20 -translate-x-1/2 flex flex-col items-center"
                          style={{ left: `${finalPos}%` }}
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-xs border-2 border-white ring-1 ring-emerald-300" title={`Skor Akhir: ${finalScore}`}>
                            {finalScore}
                          </div>
                        </div>
                      </div>

                      {/* Mitigation Action Details */}
                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[9.5px] text-slate-500 pt-1.5 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <strong className="text-slate-700">Mitigasi Operasional:</strong>
                          <span className="text-slate-600 line-clamp-1">{r.mitigasiUtama}</span>
                        </div>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 shrink-0 self-start sm:self-auto">
                          Status: {r.statusMitigasi}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dumbbell Chart Summary Footer */}
              <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-wrap items-center justify-between gap-3 text-[10px]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="text-indigo-950 font-medium">
                    <strong>Kesimpulan Eksekutif:</strong> Rata-rata besaran risiko unit kerja turun dari <strong>18.2 (Zona Tinggi)</strong> menjadi <strong>7.8 (Zona Rendah)</strong> dengan efektivitas reduksi risiko sebesar <strong>-57.1%</strong>.
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-[9.5px]">
                  <span>🟢 Skor Akhir Target: <strong>&lt; 10 (Rendah)</strong></span>
                  <span className="text-emerald-700 font-bold">100% Kasus Terkendali</span>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* VIEW MODE 2: PROFIL KATEGORI RISIKO (100% STACKED BAR) */}
          {/* =================================================================== */}
          {riskVisualMode === 'profile' && (
            <div className="space-y-4">
              <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 mb-1">
                  Pergeseran Komposisi Risiko Organisasi (Sebelum vs Sesudah Mitigasi)
                </h4>
                <p className="text-[10px] text-slate-500 mb-3">
                  Visualisasi 100% Stacked Bar ini memperlihatkan keberhasilan eliminasi total risiko kategori merah ke kategori aman.
                </p>

                {/* 1. Bar Sebelum Mitigasi */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="font-bold text-slate-800">1. Sebelum Mitigasi (Awal Tahun):</span>
                    <span className="font-mono text-rose-700 font-bold text-[10px]">
                      100% Risiko di Zona Bahaya (3 Sangat Tinggi, 2 Tinggi)
                    </span>
                  </div>
                  <div className="w-full h-7 rounded-lg overflow-hidden flex text-white font-mono text-[10px] font-bold shadow-xs">
                    <div className="w-[60%] bg-rose-600 flex items-center justify-center" title="Sangat Tinggi: 3 Unit (60%)">
                      Sangat Tinggi 60% (3 Unit)
                    </div>
                    <div className="w-[40%] bg-orange-500 flex items-center justify-center" title="Tinggi: 2 Unit (40%)">
                      Tinggi 40% (2 Unit)
                    </div>
                  </div>
                </div>

                {/* 2. Bar Sesudah Mitigasi */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="font-bold text-slate-800">2. Sesudah Mitigasi (Akhir Tahun):</span>
                    <span className="font-mono text-emerald-700 font-bold text-[10px]">
                      100% Risiko di Zona Aman / Terkendali (0 Kategori Merah Tersisa)
                    </span>
                  </div>
                  <div className="w-full h-7 rounded-lg overflow-hidden flex text-white font-mono text-[10px] font-bold shadow-xs">
                    <div className="w-[60%] bg-amber-500 flex items-center justify-center text-slate-900" title="Sedang: 3 Unit (60%)">
                      Sedang 60% (3 Unit)
                    </div>
                    <div className="w-[40%] bg-emerald-600 flex items-center justify-center" title="Rendah: 2 Unit (40%)">
                      Rendah 40% (2 Unit)
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Breakdown per Unit */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="py-2 px-3">Unit Kerja</th>
                      <th className="py-2 px-3">Kejadian Risiko</th>
                      <th className="py-2 px-3 text-center">Tingkat Awal</th>
                      <th className="py-2 px-3 text-center">Tingkat Akhir</th>
                      <th className="py-2 px-3 text-center">Pergeseran</th>
                      <th className="py-2 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredRisks.map((r) => (
                      <tr key={r.nomorPiagam} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3 font-semibold text-slate-900">{r.unitKerja}</td>
                        <td className="py-2 px-3">{r.kejadianRisiko}</td>
                        <td className="py-2 px-3 text-center">
                          <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200">
                            {r.levelAwal} ({r.besaranRisikoAwalTahun})
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                            {r.levelAkhir} ({r.besaranRisikoAkhirTahun})
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center font-bold text-emerald-700 font-mono">
                          Turun {(r.besaranRisikoAwalTahun - r.besaranRisikoAkhirTahun)} Poin
                        </td>
                        <td className="py-2 px-3 text-right">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            {r.statusMitigasi}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* VIEW MODE 3: 4 KUADRAN EKSEKUTIF BERSIH */}
          {/* =================================================================== */}
          {riskVisualMode === 'quadrant' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Distribusi 5 Piagam Risiko ke dalam 4 Kuadran Standar Manajemen Risiko:</span>
                <span className="font-semibold text-slate-700">Status Evaluasi Akhir Tahun</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Kuadran 1: Rendah */}
                <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      <strong className="text-xs text-emerald-950">Kuadran Rendah (Skor 1 - 9)</strong>
                    </div>
                    <span className="font-mono font-bold text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      2 Piagam
                    </span>
                  </div>
                  <p className="text-[9.5px] text-emerald-800">
                    Risiko terkendali sepenuhnya dengan sistem otomasi dan SOP berkala.
                  </p>
                  <div className="space-y-1.5 pt-1">
                    <div className="p-2 rounded-lg bg-white border border-emerald-100 text-[9.5px]">
                      <div className="font-bold text-slate-900">BU Bandar Udara (Hang Nadim)</div>
                      <div className="text-slate-600">Foreign Object Debris (FOD) Runway: Skor 16 ➔ 6 (Rendah)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-emerald-100 text-[9.5px]">
                      <div className="font-bold text-slate-900">Pusat Pelayanan Terpadu Satu Pintu (PTSP)</div>
                      <div className="text-slate-600">Interkoneksi Server OSS RBA & IBOSS: Skor 18 ➔ 7 (Rendah)</div>
                    </div>
                  </div>
                </div>

                {/* Kuadran 2: Sedang */}
                <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <strong className="text-xs text-amber-950">Kuadran Sedang (Skor 10 - 14)</strong>
                    </div>
                    <span className="font-mono font-bold text-xs bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                      3 Piagam
                    </span>
                  </div>
                  <p className="text-[9.5px] text-amber-800">
                    Dalam pemantauan rutin triwulanan dan mitigasi berjalan efektif.
                  </p>
                  <div className="space-y-1.5 pt-1">
                    <div className="p-2 rounded-lg bg-white border border-amber-100 text-[9.5px]">
                      <div className="font-bold text-slate-900">BU Pelabuhan Batam (Batu Ampar)</div>
                      <div className="text-slate-600">Downtime Crane STS & Kongesti CY: Skor 20 ➔ 8 (Sedang)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-amber-100 text-[9.5px]">
                      <div className="font-bold text-slate-900">BU Rumah Sakit BP Batam (RSBP)</div>
                      <div className="text-slate-600">Rantai Pasok Obat Impor KEK: Skor 15 ➔ 9 (Sedang)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-amber-100 text-[9.5px]">
                      <div className="font-bold text-slate-900">BU Fasilitas & Lingkungan (SPAM)</div>
                      <div className="text-slate-600">Pipa Transmisi Duriangkang: Skor 22 ➔ 10 (Sedang)</div>
                    </div>
                  </div>
                </div>

                {/* Kuadran 3: Tinggi */}
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 opacity-75">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                      <strong className="text-xs text-slate-800">Kuadran Tinggi (Skor 15 - 19)</strong>
                    </div>
                    <span className="font-mono font-bold text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                      0 Piagam Tersisa
                    </span>
                  </div>
                  <p className="text-[9.5px] text-slate-500">
                    Awalnya terdapat 2 risiko (RSBP &amp; Bandara), seluruhnya telah berhasil diturunkan ke kuadran aman.
                  </p>
                  <div className="p-2 rounded-lg bg-white border border-dashed border-slate-200 text-center text-[9.5px] text-emerald-700 font-semibold">
                    ✓ Nihil Kasus Kategori Tinggi
                  </div>
                </div>

                {/* Kuadran 4: Ekstrem / Sangat Tinggi */}
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 opacity-75">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <strong className="text-xs text-slate-800">Kuadran Ekstrem (Skor 20 - 25)</strong>
                    </div>
                    <span className="font-mono font-bold text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                      0 Piagam Tersisa
                    </span>
                  </div>
                  <p className="text-[9.5px] text-slate-500">
                    Awalnya terdapat 3 risiko (Pelabuhan, PTSP, SPAM), seluruhnya telah berhasil dieliminasi dari zona merah.
                  </p>
                  <div className="p-2 rounded-lg bg-white border border-dashed border-slate-200 text-center text-[9.5px] text-emerald-700 font-semibold">
                    ✓ Nihil Kasus Kategori Ekstrem
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* QUICK TABLEAU IMPLEMENTATION TIPS BOX */}
          {/* =================================================================== */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2 text-[9.5px] text-slate-600">
            <Info className="w-3.5 h-3.5 text-[#E9762B] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-slate-800">Cara Membuat Dumbbell Chart di Tableau Desktop (30 Detik):</strong>
              <p>
                1. Tarik <code className="bg-slate-200 px-1 rounded text-slate-800 font-mono">[Unit Kerja]</code> ke <strong>Rows</strong> • 
                2. Tarik <code className="bg-slate-200 px-1 rounded text-slate-800 font-mono">[Measure Values]</code> ke <strong>Columns</strong> (filter hanya <code className="text-slate-800 font-mono">[Besaran Awal]</code> &amp; <code className="text-slate-800 font-mono">[Besaran Akhir]</code>) • 
                3. Duplikat Measure Values di Columns, klik kanan pilih <strong>Dual Axis</strong> &amp; <strong>Synchronize Axis</strong> • 
                4. Set Mark 1 = <strong>Line</strong> (Path by Measure Names) &amp; Mark 2 = <strong>Circle</strong> (Color by Status Mitigasi).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. WORKSHEET 3 & 4: KEPATUHAN BLU & 5 UNSUR SPIP */}
      {/* ========================================================================= */}
      {(activeTab === 'overview' || activeTab === 'spip_blu') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Worksheet 3: Kepatuhan BLU (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E79A7]" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Worksheet 3: Tindak Lanjut Rekomendasi BLU (DS #6)
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {pctBluSelesai}% Tuntas
                </span>
              </div>

              {/* Progress bars per Entitas Pengawas */}
              <div className="space-y-2.5">
                {PENYELESAIAN_REKOMENDASI_BLU.map((entitas) => (
                  <div key={entitas.id} className="space-y-1">
                    <div className="flex items-center justify-between text-[10.5px]">
                      <span className="font-semibold text-slate-800">{entitas.entitasPengawas}</span>
                      <span className="font-mono text-slate-600">
                        <strong>{entitas.rekomendasiSelesai}</strong> / {entitas.rekomendasiTotal} ({entitas.persentasePenyelesaian.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${entitas.persentasePenyelesaian}%`,
                          backgroundColor: entitas.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Modernisasi BLU Highlights */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-700 block mb-1.5">
                  Modernisasi Pengelolaan BLU (Dataset No. 7)
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[9.5px]">
                  {MODERNISASI_BLU_DATA.map((m) => (
                    <div key={m.id} className="p-1.5 rounded bg-slate-50 border border-slate-100">
                      <div className="flex justify-between text-slate-600 mb-0.5">
                        <span className="truncate">{m.inisiatif.split(' ')[0]} {m.inisiatif.split(' ')[1]}</span>
                        <strong className="font-mono text-slate-900">{m.capaian}%</strong>
                      </div>
                      <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div className="bg-sky-600 h-full rounded-full" style={{ width: `${m.capaian}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 text-[9.5px] text-slate-400">
              *Evaluasi berkesinambungan Dewan Pengawas, Komite Audit &amp; Satuan Pengawas Intern.
            </div>
          </div>

          {/* Worksheet 4: 5 Unsur Maturitas SPIP (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#59A14F]" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Worksheet 4: 5 Unsur Penyelenggaraan SPIP (DS #17)
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  Skor: {SKOR_AGREGAT_SPIP} / 5.0
                </span>
              </div>

              {/* Horizontal Bar Chart for 5 Elements */}
              <div className="space-y-2">
                {SPIP_MATURITAS_ITEMS.map((item) => (
                  <div key={item.no}>
                    <div className="flex items-center justify-between text-[10.5px] mb-0.5">
                      <span className="font-semibold text-slate-800">
                        {item.no}. {item.komponenPenilaian}
                      </span>
                      <div className="flex items-center gap-1.5 font-mono">
                        <strong className="text-slate-900">{item.skor.toFixed(2)}</strong>
                        <span className="text-slate-400 text-[9px]">/ Target {item.targetSkor}</span>
                      </div>
                    </div>

                    <div className="relative w-full h-3.5 bg-slate-100 rounded-md overflow-hidden flex items-center">
                      <div
                        className="h-full bg-[#59A14F] rounded-md transition-all duration-500"
                        style={{ width: `${(item.skor / 5) * 100}%` }}
                      />
                      {/* Reference line for 3.20 target */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                        style={{ left: `${(item.targetSkor / 5) * 100}%` }}
                        title="Target Level 3 (3.20)"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* SPIP Level Definition Info */}
              <div className="mt-3.5 p-2 rounded-lg bg-emerald-50/60 border border-emerald-200 text-[9.5px] text-emerald-900 flex items-center justify-between">
                <div>
                  <strong className="block font-semibold">Tingkat Maturitas: Level 3 (Terdefinisi)</strong>
                  <span>Integritas, kebijakan tertulis, pemantauan dan mitigasi risiko telah melembaga.</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[9.5px] text-slate-500">
              <span>Dasar Hukum: PP No. 60 Tahun 2008</span>
              <span>Audit Penjamin Mutu: BPKP</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. WORKSHEET 5 & 6: PENGADUAN LAYANAN & SKM */}
      {/* ========================================================================= */}
      {(activeTab === 'overview' || activeTab === 'pengaduan') && (
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F28E2B]" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Worksheet 5: Pengelolaan Pengaduan Masyarakat &amp; Survei Kepuasan (SKM)
              </h3>
              <span className="text-[9.5px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                DS #10 &amp; #11
              </span>
            </div>
            <span className="text-[10px] text-slate-500">
              Total {totalDiterima} Aduan • {totalPengaduanSelesai} Diselesaikan ({pctPengaduanSelesai}%)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Table / Bars per Unit Layanan (7 cols) */}
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[10.5px] font-bold text-slate-700 block mb-1">
                Tingkat Resolusi Pengaduan per Badan Usaha (DS #10)
              </span>

              {PENGADUAN_BADAN_USAHA_DATA.map((unit) => (
                <div key={unit.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-[10.5px] mb-1">
                    <span className="font-semibold text-slate-900">{unit.unitPelayanan}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-500 text-[9.5px]">
                        Selesai: <strong>{unit.jmlPengaduanSelesai}</strong> / {unit.jmlPengaduanDiterima}
                      </span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 rounded text-[9.5px] border border-emerald-200">
                        {unit.persentaseSelesai}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-600 h-full rounded-full"
                      style={{ width: `${unit.persentaseSelesai}%` }}
                    />
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[9px] text-slate-500">
                    <span>Top Isu: <span className="italic text-slate-700">{unit.topIsu}</span></span>
                    <span>Waktu Rata-rata: <strong>{unit.waktuRataRataPenyelesaian}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            {/* SKM & PEKPPP Highlights (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5 flex flex-col justify-between">
              <div>
                <span className="text-[10.5px] font-bold text-slate-700 block mb-1.5">
                  Indeks Kepuasan Masyarakat &amp; PEKPPP (DS #11 &amp; #16)
                </span>

                <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200 mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-900">Indeks SKM Rata-Rata</span>
                    <span className="font-mono text-xs font-black text-amber-950">
                      {BOKMR_SUMMARY.indeksKepuasanMasyarakat.nilai} / 100 (Mutu A)
                    </span>
                  </div>
                  <p className="text-[9px] text-amber-800 mt-0.5">
                    Responden survei: 4.850 pengguna jasa pelabuhan, bandara, RSBP &amp; PTSP.
                  </p>
                </div>

                <div className="space-y-1 text-[9.5px]">
                  <span className="font-semibold text-slate-700 block">Evaluasi PEKPPP MenPAN-RB:</span>
                  {PEKPPP_DATA.map((pek) => (
                    <div
                      key={pek.id}
                      className="flex items-center justify-between py-1 px-1.5 rounded bg-slate-50 border border-slate-100"
                    >
                      <span className="text-slate-700 truncate">{pek.unitKerja}</span>
                      <span className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.2 rounded border text-[9px]">
                        {pek.capaianIndeks} ({pek.kategori.split(' ')[0]})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SOP Kepatuhan Quick Strip */}
              <div className="p-2 rounded-lg bg-indigo-50/50 border border-indigo-100 text-[9px] text-indigo-900 flex items-center justify-between">
                <span>Total SOP Organisasi: <strong>{SOP_BOKMR_SUMMARY.totalSopTerdaftar}</strong></span>
                <span className="font-semibold text-indigo-700">
                  {SOP_BOKMR_SUMMARY.persentaseKepatuhanSop}% Terverifikasi SPBE
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. TABLEAU BLUEPRINT & WORKSHEET SPECIFICATION GUIDE */}
      {/* ========================================================================= */}
      {activeTab === 'tableau_spec' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#E9762B]" />
                <span>Panduan Implementasi Tableau (Tableau Worksheet Recipes)</span>
              </h3>
              <p className="text-[10.5px] text-slate-500">
                Spesifikasi konfigurasi Rows, Columns, Marks, dan Rumus Calculated Field untuk diimplementasikan langsung di Tableau Desktop / Public.
              </p>
            </div>

            <button
              onClick={handleDownloadTableauCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E9762B] text-white hover:bg-[#D4651E] transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Raw Dataset (.CSV)</span>
            </button>
          </div>

          {/* Table of Tableau Specifications */}
          <div className="space-y-3">
            {[
              {
                sheet: 'Sheet 1: SAKIP Target vs Actual',
                chartType: 'Bullet Graph / Horizontal Bar',
                dimensions: ['[Komponen SAKIP] (Columns: Discrete Dimension)'],
                measures: ['SUM([Nilai]) (Columns)', 'AVG([Bobot]) (Reference Line)'],
                calculatedField: `// Formula % Capaian SAKIP
[% Capaian SAKIP] = SUM([Nilai]) / SUM([Bobot]) * 100`,
                marks: 'Bar, Color coded by IF [% Capaian] >= 80 THEN "Predikat A" ELSE "Predikat B" END',
              },
              {
                sheet: 'Sheet 2: Efektivitas Mitigasi Risiko (Dumbbell Chart)',
                chartType: 'Dumbbell / Slope Graph (Dual Axis)',
                dimensions: ['[Unit Kerja] (Rows)', '[Kejadian Risiko] (Rows)'],
                measures: ['Measure Values: SUM([Besaran Risiko Awal]), SUM([Besaran Risiko Akhir]) (Columns: Dual Axis)'],
                calculatedField: `// Formula Persentase Penurunan Risiko (Reduksi)
[% Reduksi Risiko] = 
(SUM([Besaran Risiko Awal]) - SUM([Besaran Risiko Akhir])) / SUM([Besaran Risiko Awal]) * 100

// Formula Kategori Status Risiko
[Status Efektivitas] = 
IF SUM([Besaran Risiko Akhir]) < 10 THEN "Zona Rendah (Aman)"
ELSEIF SUM([Besaran Risiko Akhir]) <= 14 THEN "Zona Sedang (Terkendali)"
ELSE "Zona Tinggi" END`,
                marks: 'Dual Axis: Mark 1 = Line (Path by [Measure Names]), Mark 2 = Circle (Color: Awal=Merah, Akhir=Hijau)',
              },
              {
                sheet: 'Sheet 3: Kepatuhan Rekomendasi BLU',
                chartType: 'Bar Chart / Donut Chart',
                dimensions: ['[Entitas Pengawas] (Rows: Dewas, Pengelola, SPI, Komite)'],
                measures: ['SUM([Rekomendasi Selesai]) (Columns)', 'SUM([Rekomendasi Total])'],
                calculatedField: `// Formula Persentase Selesai
[% Selesai Rekomendasi] = SUM([Rekomendasi Selesai]) / SUM([Rekomendasi Total])`,
                marks: 'Bar, Dual Axis with Target Circle at 100%',
              },
              {
                sheet: 'Sheet 4: Maturitas 5 Unsur SPIP',
                chartType: 'Horizontal Ranked Bar with Reference Line',
                dimensions: ['[5 Unsur SPIP] (Rows: Lingkungan, Risiko, Pengendalian, dll)'],
                measures: ['AVG([Skor SPIP]) (Columns: Continuous Measure)'],
                calculatedField: `// Formula Deviasi SPIP
[Deviasi SPIP] = [Skor SPIP] - [Target 3.20]`,
                marks: 'Bar (Green), Reference Line on Entire Table at Value = 3.20 (Level 3 - Terdefinisi)',
              },
              {
                sheet: 'Sheet 5: Pengaduan Layanan & SKM',
                chartType: 'Side-by-Side Bar or Stacked Bar',
                dimensions: ['[Unit Pelayanan] (Rows: RSBP, Pelabuhan, Bandara, SPAM, PTSP)'],
                measures: ['Measure Values: SUM([Diterima]), SUM([Selesai]) (Columns)'],
                calculatedField: `// Resolusi Pengaduan
[% Resolusi Aduan] = SUM([Jml Pengaduan Selesai]) / SUM([Jml Pengaduan Diterima]) * 100`,
                marks: 'Bar, Color by Measure Names',
              },
            ].map((spec, idx) => (
              <div
                key={spec.sheet}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 text-[10.5px] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-800 text-xs">
                      {spec.sheet}
                    </span>
                    <span className="bg-amber-100 text-[#C45E1B] px-1.5 py-0.2 rounded font-bold text-[9px] border border-amber-200">
                      {spec.chartType}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(spec.calculatedField, `calc_${idx}`)}
                    className="flex items-center gap-1 text-[9.5px] text-sky-700 hover:text-sky-800 font-semibold"
                  >
                    {copiedCode === `calc_${idx}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Rumus Calculated Field</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-900 block">Dimensions (Blue Pills):</span>
                    <ul className="list-disc list-inside text-[9.5px]">
                      {spec.dimensions.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Measures (Green Pills):</span>
                    <ul className="list-disc list-inside text-[9.5px]">
                      {spec.measures.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-100 p-2 rounded font-mono text-[9px] overflow-x-auto">
                  {spec.calculatedField}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
