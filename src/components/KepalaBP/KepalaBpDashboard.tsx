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
  Award
} from 'lucide-react';
import { KepalaBpBanner } from './KepalaBpBanner';
import { KepalaBpKpis } from './KepalaBpKpis';
import { InvestasiDeepDiveCard } from './InvestasiDeepDiveCard';
import { IkmPelayananCard } from './IkmPelayananCard';
import { PnbpSatkerCard } from './PnbpSatkerCard';
import { ReformasiBirokrasiCard } from './ReformasiBirokrasiCard';
import { KepalaBpWordDocView } from './KepalaBpWordDocView';
import { KepalaBpFormulaModal } from './KepalaBpFormulaModal';

interface KepalaBpDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const KepalaBpDashboard: React.FC<KepalaBpDashboardProps> = ({
  activeSubTab: externalSubTab,
  onOpenFormulaModal,
}) => {
  const [internalTab, setInternalTab] = useState<string>('ikhtisar');
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);
  const [selectedIksIdModal, setSelectedIksIdModal] = useState<string>('iks-1');

  // Use external tab if provided and valid, otherwise internal
  const activeTab = externalSubTab && externalSubTab !== 'ikhtisar' ? externalSubTab : internalTab;

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
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* 1. OFFICIAL LETTERHEAD & PERKIN HEADER */}
      <KepalaBpBanner
        onOpenDocModal={() => setInternalTab('naskah_perkin')}
        onOpenManualModal={() => handleOpenManual('iks-1')}
      />

      {/* 2. SUB-NAVIGATION TABS BAR */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar p-1.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setInternalTab('ikhtisar')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ikhtisar'
                ? 'bg-[#0F1E36] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-sky-400" />
            <span>Ikhtisar 4 IKS &amp; Program</span>
          </button>

          <button
            onClick={() => setInternalTab('investasi')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'investasi'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-cyan-300" />
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
            <span>Naskah Dinas Word (.doc)</span>
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

      {/* 3. CONDITIONAL TAB CONTENTS */}
      {activeTab === 'ikhtisar' && (
        <div className="space-y-6">
          {/* 4 IKS CARDS */}
          <KepalaBpKpis
            onSelectIks={handleSelectIks}
            onOpenManualModal={handleOpenManual}
          />

          {/* MAIN REQUESTED VISUALIZATION: GRAFIK BATANG TREN INVESTASI DARI TAHUN KE TAHUN & KEK */}
          <InvestasiDeepDiveCard onOpenManualModal={() => handleOpenManual('iks-1')} />

          {/* 3 OTHER IKS DEEP DIVES IN COMPACT EXECUTIVE VIEW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IkmPelayananCard onOpenManualModal={() => handleOpenManual('iks-2')} />
            <PnbpSatkerCard onOpenManualModal={() => handleOpenManual('iks-3')} />
          </div>

          <ReformasiBirokrasiCard onOpenManualModal={() => handleOpenManual('iks-4')} />
        </div>
      )}

      {/* VIEW: IKS 1 REALISASI INVESTASI */}
      {activeTab === 'investasi' && (
        <div className="space-y-6">
          <InvestasiDeepDiveCard onOpenManualModal={() => handleOpenManual('iks-1')} />
        </div>
      )}

      {/* VIEW: IKS 2 INDEKS KEPUASAN MASYARAKAT */}
      {activeTab === 'ikm' && (
        <div className="space-y-6">
          <IkmPelayananCard onOpenManualModal={() => handleOpenManual('iks-2')} />
        </div>
      )}

      {/* VIEW: IKS 3 REALISASI PNBP */}
      {activeTab === 'pnbp' && (
        <div className="space-y-6">
          <PnbpSatkerCard onOpenManualModal={() => handleOpenManual('iks-3')} />
        </div>
      )}

      {/* VIEW: IKS 4 REFORMASI BIROKRASI */}
      {activeTab === 'rb' && (
        <div className="space-y-6">
          <ReformasiBirokrasiCard onOpenManualModal={() => handleOpenManual('iks-4')} />
        </div>
      )}

      {/* VIEW: NASKAH DINAS PERJANJIAN KINERJA 2026 */}
      {activeTab === 'naskah_perkin' && (
        <div className="space-y-6">
          <KepalaBpWordDocView />
        </div>
      )}

      {/* 4. FORMULA & MANUAL POP-UP MODAL */}
      <KepalaBpFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialIksId={selectedIksIdModal}
      />
    </div>
  );
};
