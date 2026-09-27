import React, { useState } from 'react';
import {
  HardHat,
  Filter,
  Download,
  FileCode2,
  Calendar,
  Layers,
  Award,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  FileText,
  Compass,
  ShieldCheck,
  Building2,
  TrendingUp,
} from 'lucide-react';
import {
  PERKIN_A7_METADATA,
  PERKIN_A7_KPIS,
  KURVA_S_INFRASTRUKTUR_BULANAN,
} from './perkinA7Data';
import { InfrastrukturPerkinA7KpiRow } from './InfrastrukturPerkinA7KpiRow';
import { InfrastrukturPerkinA7VisualCharts } from './InfrastrukturPerkinA7VisualCharts';
import { InfrastrukturPerkinA7UnitCards } from './InfrastrukturPerkinA7UnitCards';
import { InfrastrukturPerkinA7DeepDiveCenter } from './InfrastrukturPerkinA7DeepDiveCenter';
import { InfrastrukturPerkinA7FormulaModal } from './InfrastrukturPerkinA7FormulaModal';
import { InfrastrukturPerkinA7WordDocView } from './InfrastrukturPerkinA7WordDocView';
import { FilterPerkinA7State } from './types';

interface InfrastrukturPerkinA7DashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const InfrastrukturPerkinA7Dashboard: React.FC<
  InfrastrukturPerkinA7DashboardProps
> = ({
  activeSubTab = 'ikhtisar',
  onOpenExportModal,
  onSwitchUnit,
}) => {
  // Compact Filter State (Space-Efficient & Non-Intrusive)
  const [filterState, setFilterState] = useState<FilterPerkinA7State>({
    selectedYear: '2025',
    selectedQuarter: 'ALL',
    selectedSatker: 'ALL',
    selectedStatus: 'ALL',
    viewMode: (activeSubTab as any) || 'ikhtisar',
  });

  // Deep-Dive Unit State (Default: dit-pembangunan-infrastruktur)
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>(
    'dit-pembangunan-infrastruktur'
  );

  // Formula Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [selectedKpiId, setSelectedKpiId] = useState<string | null>(
    'ikp-1-pembangunan-infrastruktur'
  );

  const handleOpenFormula = (kpiId: string) => {
    setSelectedKpiId(kpiId);
    setIsFormulaModalOpen(true);
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('infrastruktur-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    let csv = 'data:text/csv;charset=utf-8,';
    csv += 'RINGKASAN EKSEKUTIF PERKIN A.7 TAHUN 2025 (INFRASTRUKTUR BP BATAM)\n';
    csv += `Nomor Perkin,${PERKIN_A7_METADATA.nomorPerkin}\n`;
    csv += `Tanggal Penetapan,${PERKIN_A7_METADATA.tanggalPenetapan}\n`;
    csv += `Pihak Pertama,${PERKIN_A7_METADATA.pihakPertama.nama}\n`;
    csv += `Pihak Kedua,${PERKIN_A7_METADATA.pihakKedua.nama}\n`;
    csv += `Total Pagu Anggaran,${PERKIN_A7_METADATA.totalAnggaran}\n`;
    csv += `Realisasi Anggaran,${PERKIN_A7_METADATA.realisasiAnggaran} (${PERKIN_A7_METADATA.persenRealisasiAnggaran}%)\n`;
    csv += `Target PNBP,${PERKIN_A7_METADATA.totalPnbpTarget}\n`;
    csv += `Realisasi PNBP,${PERKIN_A7_METADATA.totalPnbpRealisasi} (${PERKIN_A7_METADATA.persenPnbpRealisasi}%)\n\n`;

    csv += 'INDIKATOR KINERJA PROGRAM (IKP)\n';
    csv += 'No,Kode IKP,Nama Indikator,Target,Realisasi,Capaian (%),Unit Pengampu,Status\n';
    PERKIN_A7_KPIS.forEach((k) => {
      csv += `${k.number},${k.code},"${k.name}",${k.programTargetLabel},"${k.realizationLabel}",${k.achievement.toFixed(2)}%,"${k.unitPengampu}","${k.status}"\n`;
    });

    const encodedUri = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ringkasan_perkin_a7_infrastruktur_bp_batam.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 pb-12">
      {/* ============================================================== */}
      {/* 1. COMPACT FILTER TOOLBAR (SPACE-EFFICIENT & RESPONSIVE)       */}
      {/* ============================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-2 sm:p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Badge Label */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono font-bold">
            <Filter className="w-3.5 h-3.5 text-cyan-300" />
            <span>FILTER PERKIN A.7</span>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setFilterState((prev) => ({ ...prev, selectedYear: '2025' }))}
              className={`px-2.5 py-1 rounded-md font-bold text-xs transition-all cursor-pointer ${
                filterState.selectedYear === '2025'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TA 2025 (Perkin)
            </button>
            <button
              onClick={() => setFilterState((prev) => ({ ...prev, selectedYear: '2026' }))}
              className={`px-2.5 py-1 rounded-md font-bold text-xs transition-all cursor-pointer ${
                filterState.selectedYear === '2026'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TA 2026 (Berjalan)
            </button>
          </div>

          {/* Quarter Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {(['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setFilterState((prev) => ({ ...prev, selectedQuarter: q }))}
                className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  filterState.selectedQuarter === q
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Satker Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => {
                setFilterState((prev) => ({ ...prev, selectedSatker: 'ALL' }));
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                filterState.selectedSatker === 'ALL'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Konsolidasi 3 Unit
            </button>
            <button
              onClick={() => {
                setFilterState((prev) => ({ ...prev, selectedSatker: 'dit-perencanaan-infrastruktur' }));
                handleSelectDeepDive('dit-perencanaan-infrastruktur');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                filterState.selectedSatker === 'dit-perencanaan-infrastruktur'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dit. Perencanaan
            </button>
            <button
              onClick={() => {
                setFilterState((prev) => ({ ...prev, selectedSatker: 'dit-pembangunan-infrastruktur' }));
                handleSelectDeepDive('dit-pembangunan-infrastruktur');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                filterState.selectedSatker === 'dit-pembangunan-infrastruktur'
                  ? 'bg-white text-sky-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dit. Pembangunan
            </button>
            <button
              onClick={() => {
                setFilterState((prev) => ({ ...prev, selectedSatker: 'dit-pam-aset' }));
                handleSelectDeepDive('dit-pam-aset');
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                filterState.selectedSatker === 'dit-pam-aset'
                  ? 'bg-white text-amber-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dit. Pengamanan Aset
            </button>
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setFilterState((prev) => ({ ...prev, viewMode: 'ikhtisar' }))}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                filterState.viewMode === 'ikhtisar'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setFilterState((prev) => ({ ...prev, viewMode: 'word-doc' }))}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                filterState.viewMode === 'word-doc'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Dokumen Perkin</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenFormula('ikp-1-pembangunan-infrastruktur')}
            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Kamus Rumus & Regulasi IKP"
          >
            <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Kamus Rumus Perkin A.7</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Unduh Ringkasan Eksekutif CSV"
          >
            <Download className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden md:inline">Unduh CSV</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIEW MODE: DOKUMEN PERKIN (WORD-DOC VIEW)                     */}
      {/* ============================================================== */}
      {filterState.viewMode === 'word-doc' ? (
        <InfrastrukturPerkinA7WordDocView />
      ) : (
        <>
          {/* ============================================================== */}
          {/* 2. EXECUTIVE COMMAND BANNER                                    */}
          {/* ============================================================== */}
          <div className="bg-gradient-to-r from-[#002B49] via-[#0A3D62] to-[#13315C] text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-700/60 relative overflow-hidden">
            {/* Background Decorative Glow */}
            <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute right-32 bottom-0 w-64 h-64 bg-blue-400/5 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                    PERKIN A.7 &bull; DEPUTI BIDANG INFRASTRUKTUR
                  </span>
                  <span className="text-[11px] text-slate-300 font-mono">
                    {PERKIN_A7_METADATA.nomorPerkin} &bull; Batam, {PERKIN_A7_METADATA.tanggalPenetapan}
                  </span>
                </div>

                <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white">
                  Pusat Komando Eksekutif Perkin A.7: Infrastruktur BP Batam
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Sasaran Program: <strong>&ldquo;{PERKIN_A7_METADATA.sasaranProgram}&rdquo;</strong>. Mengintegrasikan 24 dataset resmi dari 3 unit kerja pengampu: <strong>Direktorat Perencanaan Infrastruktur</strong>, <strong>Direktorat Pembangunan Infrastruktur</strong>, dan <strong>Direktorat Pengamanan Aset dan Kawasan</strong>.
                </p>
              </div>

              {/* Quick Fiscal Metrics Capsule */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0">
                <div className="bg-slate-900/60 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700/60">
                  <div className="text-[10px] font-mono text-slate-400">TOTAL PAGU PROGRAM</div>
                  <div className="text-sm sm:text-base font-black font-mono text-cyan-300">
                    Rp 842,50 M
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">5 Sektor Terintegrasi</div>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700/60">
                  <div className="text-[10px] font-mono text-slate-400">REALISASI BELANJA</div>
                  <div className="text-sm sm:text-base font-black font-mono text-emerald-400">
                    Rp 682,43 M
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono font-bold">81,00% Serapan</div>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-slate-900/60 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700/60">
                  <div className="text-[10px] font-mono text-slate-400">PNBP ROW UTILITAS</div>
                  <div className="text-sm sm:text-base font-black font-mono text-amber-300">
                    Rp 7,45 M
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono font-bold">109,22% Capaian</div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3. DUA INDIKATOR KINERJA PROGRAM (IKP) SESUAI INSTRUKSI POIN 1 */}
          {/* ============================================================== */}
          <InfrastrukturPerkinA7KpiRow
            onOpenFormulaModal={handleOpenFormula}
            selectedQuarter={filterState.selectedQuarter}
          />

          {/* ============================================================== */}
          {/* 4. VISUALISASI SETELAH KPI (SESUAI INSTRUKSI POIN 2 & 5)       */}
          {/* ============================================================== */}
          <InfrastrukturPerkinA7VisualCharts
            onOpenFormulaModal={handleOpenFormula}
            onNavigateToUnit={handleSelectDeepDive}
          />

          {/* ============================================================== */}
          {/* 5. 3 UNIT KERJA PENGAMPU INFRASTRUKTUR (SESUAI POIN 3)         */}
          {/* ============================================================== */}
          <InfrastrukturPerkinA7UnitCards
            onAnalyzeUnit={handleSelectDeepDive}
            onNavigateToUnit={(unitId) => onSwitchUnit && onSwitchUnit(unitId)}
          />

          {/* ============================================================== */}
          {/* 6. UNIT DEEP-DIVE CENTER SESUAI 3 UNIT (SESUAI POIN 6 & 8)     */}
          {/* ============================================================== */}
          <InfrastrukturPerkinA7DeepDiveCenter
            selectedUnitId={selectedDeepDiveUnit}
            onSelectUnit={setSelectedDeepDiveUnit}
            onOpenFormulaModal={handleOpenFormula}
            onNavigateToFullDashboard={(unitId) => onSwitchUnit && onSwitchUnit(unitId)}
          />
        </>
      )}

      {/* ============================================================== */}
      {/* 7. KAMUS RUMUS & DEFINISI MODAL                                */}
      {/* ============================================================== */}
      <InfrastrukturPerkinA7FormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        selectedKpiId={selectedKpiId}
      />
    </div>
  );
};
