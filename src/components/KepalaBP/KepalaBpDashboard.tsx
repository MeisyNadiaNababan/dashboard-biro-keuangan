import React, { useState } from 'react';
import {
  TrendingUp,
  Smile,
  DollarSign,
  ShieldCheck,
  FileText,
  BookOpen,
  LayoutDashboard,
  Layers,
  Sparkles,
  ArrowRight,
  Award,
  Compass,
  Building2,
  Database
} from 'lucide-react';
import { KepalaBpBanner } from './KepalaBpBanner';
import { ExecutiveCommandCenterView } from './ExecutiveCommandCenterView';
import { InvestasiDeepDiveCard } from './InvestasiDeepDiveCard';
import { IkmPelayananCard } from './IkmPelayananCard';
import { PnbpSatkerCard } from './PnbpSatkerCard';
import { ReformasiBirokrasiCard } from './ReformasiBirokrasiCard';
import { CrossUnitMatrixView } from './CrossUnitMatrixView';
import { KepalaBpWordDocView } from './KepalaBpWordDocView';
import { KepalaBpFormulaModal } from './KepalaBpFormulaModal';
import { KepalaBpCompactFilter, KepalaBpFilterState } from './KepalaBpCompactFilter';
import {
  EMPAT_IKS_KEPALA_BP,
  MATRIKS_24_SATKER_DATA,
  KONSOLIDASI_IKM_SELURUH_UNIT,
  KONSOLIDASI_PNBP_SELURUH_UNIT
} from './kepalaBpData';

interface KepalaBpDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const KepalaBpDashboard: React.FC<KepalaBpDashboardProps> = ({
  activeSubTab: externalSubTab,
  onOpenFormulaModal,
  onNavigateToUnit,
}) => {
  const [internalTab, setInternalTab] = useState<string>('ikhtisar');
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);
  const [selectedIksIdModal, setSelectedIksIdModal] = useState<string>('iks-1');

  // Filter state
  const [filterState, setFilterState] = useState<KepalaBpFilterState>({
    periode: 'YTD 2026',
    klaster: 'ALL',
    statusCapaian: 'ALL',
    searchQuery: '',
  });

  // Active view: external prop if provided, else internal state
  const activeTab = externalSubTab && externalSubTab !== 'ikhtisar' ? externalSubTab : internalTab;

  const handleFilterChange = (newFilter: Partial<KepalaBpFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...newFilter }));
  };

  const handleResetFilter = () => {
    setFilterState({
      periode: 'YTD 2026',
      klaster: 'ALL',
      statusCapaian: 'ALL',
      searchQuery: '',
    });
  };

  const handleSelectIks = (iksId: string) => {
    if (iksId === 'iks-1') setInternalTab('investasi');
    else if (iksId === 'iks-2') setInternalTab('ikm');
    else if (iksId === 'iks-3') setInternalTab('pnbp');
    else if (iksId === 'iks-4') setInternalTab('rb');
    else setInternalTab('ikhtisar');
  };

  const handleOpenManual = (iksId?: string) => {
    setSelectedIksIdModal(iksId || 'iks-1');
    setIsFormulaModalOpen(true);
    if (onOpenFormulaModal) {
      onOpenFormulaModal(iksId || 'iks-1');
    }
  };

  const handleExportConsolidatedCsv = () => {
    const headers = ['Kategori', 'Nama Item/Satker', 'Target/Pagu', 'Realisasi', 'Capaian (%)', 'Status'];
    const rows: (string | number)[][] = [];

    // Add IKS rows
    EMPAT_IKS_KEPALA_BP.forEach((iks) => {
      rows.push([
        'IKS Kepala BP',
        `"${iks.indikatorKinerjaStrategis}"`,
        `"${iks.target}"`,
        iks.realisasiYtd,
        iks.persenCapaian,
        `"${iks.statusCapaian}"`,
      ]);
    });

    // Add IKM rows
    KONSOLIDASI_IKM_SELURUH_UNIT.forEach((ikm) => {
      rows.push([
        'IKM Unit Layanan',
        `"${ikm.namaUnit}"`,
        ikm.targetIkm,
        ikm.skorIkm,
        ((ikm.skorIkm / ikm.targetIkm) * 100).toFixed(1),
        `"${ikm.predikat}"`,
      ]);
    });

    // Add PNBP rows
    KONSOLIDASI_PNBP_SELURUH_UNIT.forEach((pnbp) => {
      rows.push([
        'PNBP Satker',
        `"${pnbp.namaSatker}"`,
        pnbp.targetMiliar,
        pnbp.realisasiMiliar,
        pnbp.persenCapaian,
        `"${pnbp.statusCapaian}"`,
      ]);
    });

    // Add 24 Satker rows
    MATRIKS_24_SATKER_DATA.forEach((s) => {
      rows.push([
        'Satker BP Batam',
        `"${s.nama}"`,
        s.paguMiliar,
        s.realisasiMiliar,
        s.serapanPersen,
        `"${s.statusKinerja}"`,
      ]);
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Ringkasan_Konsolidasi_Perkin_Kepala_BP_Batam_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 pb-12 font-sans text-slate-800">
      {/* 1. OFFICIAL LETTERHEAD & PERKIN HEADER (HANYA DI TAB NASKAH PERKIN AGAR COMMAND CENTER BERSIH) */}
      {activeTab === 'naskah_perkin' && (
        <KepalaBpBanner
          onOpenDocModal={() => setInternalTab('naskah_perkin')}
          onOpenManualModal={() => handleOpenManual('iks-1')}
        />
      )}

      {/* 2. COMPACT NON-INTRUSIVE FILTER BAR */}
      <KepalaBpCompactFilter
        filterState={filterState}
        onFilterChange={handleFilterChange}
        onResetFilter={handleResetFilter}
        onExportCsv={handleExportConsolidatedCsv}
        activeView={activeTab}
        onSelectView={(v) => setInternalTab(v)}
      />

      {/* 3. SUB-NAVIGATION TABS BAR */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar p-1.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setInternalTab('ikhtisar')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ikhtisar'
                ? 'bg-[#002B49] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4 text-cyan-300" />
            <span>Ringkasan Konsolidasi Lintas Unit</span>
          </button>

          <button
            onClick={() => setInternalTab('investasi')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'investasi'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-cyan-200" />
            <span>IKS 1: Realisasi Investasi (Rp 70 T)</span>
          </button>

          <button
            onClick={() => setInternalTab('ikm')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ikm'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Smile className="w-4 h-4 text-emerald-200" />
            <span>IKS 2: Kepuasan Masyarakat (IKM 88)</span>
          </button>

          <button
            onClick={() => setInternalTab('pnbp')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pnbp'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <DollarSign className="w-4 h-4 text-indigo-200" />
            <span>IKS 3: Realisasi PNBP (Rp 2,447 T)</span>
          </button>

          <button
            onClick={() => setInternalTab('rb')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rb'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-200" />
            <span>IKS 4: Reformasi Birokrasi (80 BB)</span>
          </button>

          <button
            onClick={() => setInternalTab('matriks_satker')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'matriks_satker'
                ? 'bg-slate-900 text-cyan-300 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4 text-sky-400" />
            <span>Matriks 24 Satker (Satu Data)</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-slate-200">
          <button
            onClick={() => setInternalTab('naskah_perkin')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'naskah_perkin'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            <span>Word (.doc)</span>
          </button>

          <button
            onClick={() => handleOpenManual('iks-1')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Manual 4 IKS</span>
          </button>
        </div>
      </div>

      {/* 4. CONDITIONAL TAB CONTENTS */}
      {/* ------------------------------------------------------------------ */}
      {/* VIEW: EXECUTIVE COMMAND CENTER (FLAGSHIP INTEGRATED VIEW)          */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'ikhtisar' && (
        <div className="space-y-6">
          <ExecutiveCommandCenterView
            filterState={filterState}
            onSelectIksDetail={handleSelectIks}
            onOpenManualModal={handleOpenManual}
            onNavigateToCrossUnitMatrix={() => setInternalTab('matriks_satker')}
            onNavigateToUnit={onNavigateToUnit}
          />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: IKS 1 REALISASI INVESTASI & KEK (DETAIL TAB)                */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'investasi' && (
        <div className="space-y-6">
          <InvestasiDeepDiveCard onOpenManualModal={() => handleOpenManual('iks-1')} />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: IKS 2 INDEKS KEPUASAN MASYARAKAT 5 LOKUS (DETAIL TAB)        */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'ikm' && (
        <div className="space-y-6">
          <IkmPelayananCard onOpenManualModal={() => handleOpenManual('iks-2')} />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: IKS 3 REALISASI PNBP 10 SATKER PENGHASIL (DETAIL TAB)        */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'pnbp' && (
        <div className="space-y-6">
          <PnbpSatkerCard onOpenManualModal={() => handleOpenManual('iks-3')} />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: IKS 4 REFORMASI BIROKRASI (8 AREA PERUBAHAN)                 */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'rb' && (
        <div className="space-y-6">
          <ReformasiBirokrasiCard onOpenManualModal={() => handleOpenManual('iks-4')} />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: MATRIKS 24 SATKER & KATALOG SATU DATA (HAL. 1 - 53)          */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'matriks_satker' && (
        <div className="space-y-6">
          <CrossUnitMatrixView onSelectUnit={onNavigateToUnit} />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: NASKAH DINAS PERJANJIAN KINERJA 2026 (.DOC VIEW)            */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'naskah_perkin' && (
        <div className="space-y-6">
          <KepalaBpWordDocView />
        </div>
      )}

      {/* 5. FORMULA & MANUAL POP-UP MODAL */}
      <KepalaBpFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialIksId={selectedIksIdModal}
      />
    </div>
  );
};
