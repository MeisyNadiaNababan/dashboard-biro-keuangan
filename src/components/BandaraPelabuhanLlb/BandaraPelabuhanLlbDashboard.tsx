import React, { useState } from 'react';
import {
  Plane,
  Anchor,
  Truck,
  Filter,
  Sparkles,
  Download,
  FileCode2,
  Calendar,
  Layers,
  Award,
  ChevronDown,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Maximize2,
  ExternalLink,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import {
  PERKIN_A5_METADATA,
  PERKIN_A5_KPIS,
  MONTHLY_OPERATIONAL_DATA,
} from './bandaraPelabuhanLlbData';
import { BandaraPelabuhanLlbKpiRow } from './BandaraPelabuhanLlbKpiRow';
import { BandaraPelabuhanLlbVisualCharts } from './BandaraPelabuhanLlbVisualCharts';
import { BandaraPelabuhanLlbUnitCards } from './BandaraPelabuhanLlbUnitCards';
import { BandaraPelabuhanLlbDeepDiveCenter } from './BandaraPelabuhanLlbDeepDiveCenter';
import { BandaraPelabuhanLlbFormulaModal } from './BandaraPelabuhanLlbFormulaModal';

interface BandaraPelabuhanLlbDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const BandaraPelabuhanLlbDashboard: React.FC<
  BandaraPelabuhanLlbDashboardProps
> = ({
  activeSubTab = 'ikhtisar',
  onOpenExportModal,
  onSwitchUnit,
}) => {
  // Compact Filters State (Non-intrusive & Space-efficient)
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2025');
  const [selectedQuarter, setSelectedQuarter] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('ALL');
  const [selectedSatkerFilter, setSelectedSatkerFilter] = useState<
    'ALL' | 'dit-bandara' | 'dit-pelabuhan' | 'dit-lalu-lintas-barang'
  >('ALL');

  // Deep-Dive Unit State (Default: dit-bandara)
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>('dit-bandara');

  // Internal Formula Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [modalKpiId, setModalKpiId] = useState<string | null>('ikp-1-ikm-gabungan');

  const handleOpenFormula = (kpiId: string) => {
    setModalKpiId(kpiId);
    setIsFormulaModalOpen(true);
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('bandara-pelabuhan-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Export Executive Summary CSV
  const handleExportExecutiveSummary = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'RINGKASAN EKSEKUTIF PERKIN A.5 TAHUN 2025\n';
    csvContent += `Nomor Perkin,${PERKIN_A5_METADATA.nomorPerkin}\n`;
    csvContent += `Tanggal Penetapan,${PERKIN_A5_METADATA.tanggalPenetapan}\n`;
    csvContent += `Pihak Pertama,${PERKIN_A5_METADATA.pihakPertama.nama} (${PERKIN_A5_METADATA.pihakPertama.jabatan})\n`;
    csvContent += `Pihak Kedua,${PERKIN_A5_METADATA.pihakKedua.nama} (${PERKIN_A5_METADATA.pihakKedua.jabatan})\n`;
    csvContent += `Total Pagu Anggaran,Rp ${PERKIN_A5_METADATA.totalAnggaran}\n`;
    csvContent += `Realisasi Anggaran,Rp ${PERKIN_A5_METADATA.realisasiAnggaran} (40.0%)\n\n`;

    csvContent += 'INDIKATOR KINERJA PROGRAM (IKP)\n';
    csvContent += 'No,Kode IKP,Indikator Kinerja,Target,Realisasi,Capaian (%),Satuan,Status\n';
    PERKIN_A5_KPIS.forEach((kpi) => {
      csvContent += `${kpi.number},${kpi.code},"${kpi.name}",${kpi.programTarget},${kpi.realization},${kpi.achievement.toFixed(2)}%,"${kpi.unit}","Melampaui Target"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ringkasan_eksekutif_perkin_a5_bandara_pelabuhan_llb.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 pb-12">
      {/* ============================================================== */}
      {/* 1. COMPACT FILTER BAR (NON-INTRUSIVE & SPACE-EFFICIENT)        */}
      {/* ============================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-2 sm:p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Badge Label */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono font-bold">
            <Filter className="w-3.5 h-3.5 text-cyan-300" />
            <span>FILTER PERKIN A5</span>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setSelectedYear('2025')}
              className={`px-2.5 py-1 rounded-md font-bold text-xs transition-all cursor-pointer ${
                selectedYear === '2025'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TA 2025 (Perkin)
            </button>
            <button
              onClick={() => setSelectedYear('2026')}
              className={`px-2.5 py-1 rounded-md font-bold text-xs transition-all cursor-pointer ${
                selectedYear === '2026'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TA 2026 (Berjalan)
            </button>
          </div>

          {/* Triwulan Cut-Off */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {(['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuarter(q)}
                className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  selectedQuarter === q
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Filter Satker */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setSelectedSatkerFilter('ALL')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Konsolidasi 3 Satker
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('dit-bandara');
                handleSelectDeepDive('dit-bandara');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'dit-bandara'
                  ? 'bg-white text-emerald-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dit. Bandara
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('dit-pelabuhan');
                handleSelectDeepDive('dit-pelabuhan');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'dit-pelabuhan'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dit. Pelabuhan
            </button>
            <button
              onClick={() => {
                setSelectedSatkerFilter('dit-lalu-lintas-barang');
                handleSelectDeepDive('dit-lalu-lintas-barang');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSatkerFilter === 'dit-lalu-lintas-barang'
                  ? 'bg-white text-amber-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dit. LLB
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenFormula('ikp-1-ikm-gabungan')}
            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Kamus Rumus & Regulasi IKP"
          >
            <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Kamus Rumus Perkin A5</span>
          </button>

          <button
            onClick={handleExportExecutiveSummary}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Unduh Ringkasan Eksekutif CSV"
          >
            <Download className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden md:inline">Unduh Ringkasan</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. EXECUTIVE SUMMARY HEADER BANNER                              */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-r from-[#002B49] via-[#0A3D62] to-[#13315C] text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-700/60 relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-32 bottom-0 w-64 h-64 bg-blue-400/5 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                PERKIN A.5 &bull; DEPUTI BIDANG PENGELOLAAN BANDARA, PELABUHAN &amp; LLB
              </span>
              <span className="text-[11px] text-slate-300 font-mono">
                No. {PERKIN_A5_METADATA.nomorPerkin} &bull; Batam, {PERKIN_A5_METADATA.tanggalPenetapan}
              </span>
            </div>

            <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white">
              Command Center Perkin A.5: Bandara, Pelabuhan &amp; Lalu Lintas Barang
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Sasaran Program: <strong>&ldquo;{PERKIN_A5_METADATA.sasaranProgram}&rdquo;</strong> di bawah kepemimpinan <strong>{PERKIN_A5_METADATA.pihakPertama.nama}</strong>. Mengintegrasikan 46 dataset resmi dari 3 unit kerja pengampu untuk memonitor throughput logistik, konektivitas udara &amp; maritim, mutu pelayanan publik, serta realisasi PNBP BLU.
            </p>
          </div>

          {/* Quick Metrics Capsule */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0">
            <div className="bg-slate-900/60 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700/60">
              <div className="text-[10px] font-mono text-slate-400">TOTAL PAGU PERKIN</div>
              <div className="text-sm sm:text-base font-black font-mono text-cyan-300">
                Rp 59,51 M
              </div>
              <div className="text-[10px] text-slate-400 font-mono">3 Kegiatan Program</div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700/60">
              <div className="text-[10px] font-mono text-slate-400">REALISASI PNBP TOTAL</div>
              <div className="text-sm sm:text-base font-black font-mono text-emerald-400">
                Rp 565,33 M
              </div>
              <div className="text-[10px] text-emerald-400 font-mono font-bold">108,63% Capaian</div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-900/60 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700/60">
              <div className="text-[10px] font-mono text-slate-400">RATA-RATA IKP</div>
              <div className="text-sm sm:text-base font-black font-mono text-amber-300">
                107,94%
              </div>
              <div className="text-[10px] text-emerald-400 font-mono font-bold">100% Melampaui</div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. 3 INDIKATOR KINERJA PROGRAM (PERKIN A.5 TAHUN 2025)         */}
      {/* ============================================================== */}
      <BandaraPelabuhanLlbKpiRow
        onOpenFormulaModal={handleOpenFormula}
        selectedQuarter={selectedQuarter}
      />

      {/* ============================================================== */}
      {/* 4. VISUALISASI ANALITIK SETELAH KPI (RINGKASAN & DETAIL)       */}
      {/* ============================================================== */}
      <BandaraPelabuhanLlbVisualCharts
        onOpenFormulaModal={handleOpenFormula}
        onNavigateToUnit={handleSelectDeepDive}
      />

      {/* ============================================================== */}
      {/* 5. 3 UNIT KERJA PENGAMPU PERKIN A.5                            */}
      {/* ============================================================== */}
      <BandaraPelabuhanLlbUnitCards
        onAnalyzeUnit={handleSelectDeepDive}
        onNavigateToUnit={(unitId) => onSwitchUnit && onSwitchUnit(unitId)}
      />

      {/* ============================================================== */}
      {/* 6. UNIT DEEP-DIVE CENTER (3 UNIT KERJA TERKAIT)                */}
      {/* ============================================================== */}
      <BandaraPelabuhanLlbDeepDiveCenter
        selectedUnitId={selectedDeepDiveUnit}
        onSelectUnit={setSelectedDeepDiveUnit}
        onOpenFormulaModal={handleOpenFormula}
        onNavigateToFullDashboard={(unitId) => onSwitchUnit && onSwitchUnit(unitId)}
      />

      {/* ============================================================== */}
      {/* 7. FORMULA & DEFINISI MODAL                                    */}
      {/* ============================================================== */}
      <BandaraPelabuhanLlbFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        selectedKpiId={modalKpiId}
      />
    </div>
  );
};
