import React, { useState } from 'react';
import {
  TrendingUp,
  Smile,
  DollarSign,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Info,
  X,
  Layers,
  Building2,
  ExternalLink,
  Activity,
  Shield,
  Stethoscope,
  Droplets,
  Ship,
  Plane,
  MapPin,
  HardHat,
  Calendar,
  Compass,
  CheckCircle2,
  Users,
  Anchor,
  Globe,
  Briefcase,
  FileText,
  Award,
  Zap,
  BarChart3
} from 'lucide-react';
import {
  EMPAT_IKS_KEPALA_BP,
  KONSOLIDASI_IKM_SELURUH_UNIT,
  AGREGAT_IKM_BP_BATAM,
  KONSOLIDASI_PNBP_SELURUH_UNIT,
  AGREGAT_PNBP_BP_BATAM,
  KONSOLIDASI_OPERASIONAL_SELURUH_UNIT,
  KONSOLIDASI_BELANJA_BP_BATAM,
  KONSOLIDASI_TATA_KELOLA_RB,
  DATA_6_WADUK_BATAM,
  DATA_LOGISTIK_FTZ_BATAM,
  DATA_SDM_DAN_TATA_KELOLA,
  DATA_7_SWP_LAHAN,
  KONSOLIDASI_MULTI_SEKTOR_BP_BATAM,
  UnitIkmKonsolidasi,
  WadukBatamItem
} from './kepalaBpData';
import { KepalaBpFilterState } from './KepalaBpCompactFilter';

interface ExecutiveCommandCenterViewProps {
  filterState: KepalaBpFilterState;
  onSelectIksDetail: (iksId: string) => void;
  onOpenManualModal: (iksId: string) => void;
  onNavigateToCrossUnitMatrix: () => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const ExecutiveCommandCenterView: React.FC<ExecutiveCommandCenterViewProps> = ({
  filterState,
  onSelectIksDetail,
  onOpenManualModal,
  onNavigateToCrossUnitMatrix,
  onNavigateToUnit,
}) => {
  // Modal states for on-demand details
  const [selectedIkmModal, setSelectedIkmModal] = useState<UnitIkmKonsolidasi | null>(null);
  const [selectedWadukModal, setSelectedWadukModal] = useState<WadukBatamItem | null>(null);
  const [isFtzModalOpen, setIsFtzModalOpen] = useState<boolean>(false);
  const [isSdmModalOpen, setIsSdmModalOpen] = useState<boolean>(false);
  const [isSwpModalOpen, setIsSwpModalOpen] = useState<boolean>(false);

  // Helper to jump to satker dashboard
  const handleJumpToUnit = (unitIdOrCode: string) => {
    if (!onNavigateToUnit) return;
    const lower = unitIdOrCode.toLowerCase();
    if (lower.includes('rsbp') || lower.includes('burs') || lower.includes('rumah sakit')) {
      onNavigateToUnit('bu-rumah-sakit');
    } else if (lower.includes('ditpam') || lower.includes('pengamanan')) {
      onNavigateToUnit('dit-pam-aset');
    } else if (lower.includes('ptsp')) {
      onNavigateToUnit('ptsp');
    } else if (lower.includes('pelabuhan') || lower.includes('bup')) {
      onNavigateToUnit('dit-pelabuhan');
    } else if (lower.includes('bandara')) {
      onNavigateToUnit('dit-bandara');
    } else if (lower.includes('lahan') || lower.includes('dpl') || lower.includes('pertanahan')) {
      onNavigateToUnit('dit-lahan');
    } else if (lower.includes('pembangunan') || lower.includes('infrastruktur')) {
      onNavigateToUnit('dit-pembangunan-infrastruktur');
    } else if (lower.includes('pdsi')) {
      onNavigateToUnit('pdsi');
    } else if (lower.includes('keuangan')) {
      onNavigateToUnit('biro-keuangan');
    } else if (lower.includes('dep-a1')) {
      onNavigateToUnit('deputi-administrasi-keuangan');
    } else if (lower.includes('dep-a2')) {
      onNavigateToUnit('deputi-kebijakan-strategis');
    } else if (lower.includes('dep-a3')) {
      onNavigateToUnit('deputi-pengelolaan-lahan');
    } else if (lower.includes('dep-a4')) {
      onNavigateToUnit('deputi-investasi');
    } else if (lower.includes('dep-a5')) {
      onNavigateToUnit('deputi-bandara-pelabuhan');
    } else if (lower.includes('dep-a6')) {
      onNavigateToUnit('deputi-pelayanan-umum');
    } else if (lower.includes('dep-a7')) {
      onNavigateToUnit('deputi-infrastruktur');
    } else {
      onNavigateToCrossUnitMatrix();
    }
  };

  // Helper for multi-sector icon rendering
  const renderSectorIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ship':
        return <Ship className="w-4 h-4 text-blue-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'Droplets':
        return <Droplets className="w-4 h-4 text-cyan-600" />;
      case 'Shield':
        return <Shield className="w-4 h-4 text-rose-600" />;
      case 'HardHat':
        return <HardHat className="w-4 h-4 text-amber-600" />;
      case 'Building2':
        return <Building2 className="w-4 h-4 text-purple-600" />;
      default:
        return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-3.5 font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* 1. TOP HEADER STRIP (EXACT REFERENCE COMMAND CENTER HEADER)          */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 px-3.5 py-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#002B49] text-cyan-300 flex items-center justify-center font-black shadow-xs shrink-0">
            <Compass className="w-4 h-4 text-cyan-300 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 leading-tight">
              EXECUTIVE COMMAND CENTER BP BATAM
            </h1>
            <p className="text-[10.5px] text-slate-500 font-medium">
              Sistem Pemantauan Perjanjian Kinerja &amp; Ringkasan Konsolidasi Satuan Kerja
            </p>
          </div>
        </div>

        {/* Center: Live Date & Update badge */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono font-semibold text-slate-600 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>TAHUN 2026</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">UPDATE: 21 APRIL 2026 08:00 WIB</span>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenManualModal('iks-1')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
            title="Lihat Manual 4 IKS"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Manual IKS</span>
          </button>

          <button
            onClick={onNavigateToCrossUnitMatrix}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            title="Matriks 24 Satker"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">24 Satker</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. ROW 1: STRATEGIC COMPASS (4 IKS RESMI PERKIN KEPALA BP BATAM)     */}
      {/* ==================================================================== */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wide text-slate-600 font-mono flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-700" />
            <span>STRATEGIC COMPASS (KOMPAS STRATEGIS KEPALA BP BATAM)</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            Dokumen Resmi No. 1/SPJ/KA/1/2026
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Realisasi Investasi */}
          <div
            onClick={() => onSelectIksDetail('iks-1')}
            className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  REALISASI INVESTASI
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs animate-pulse" />
              </div>

              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
                Rp 54,68T
              </div>

              <div className="flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 mt-1">
                <span>↑ 12.4%</span>
                <span className="text-slate-400 font-normal">VS PERIODE LALU</span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-700"
                  style={{ width: '78.1%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 pt-0.5">
                <span>TGT: RP 70,0T</span>
                <span className="text-slate-800">78.1% CAPAIAN</span>
              </div>
            </div>
          </div>

          {/* Card 2: Realisasi PNBP */}
          <div
            onClick={() => onSelectIksDetail('iks-3')}
            className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  REALISASI PNBP
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs animate-pulse" />
              </div>

              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
                Rp 1.892,4M
              </div>

              <div className="flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 mt-1">
                <span>↑ 8.7%</span>
                <span className="text-slate-400 font-normal">VS PERIODE LALU</span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-700"
                  style={{ width: '77.3%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 pt-0.5">
                <span>TGT: RP 2,45T</span>
                <span className="text-slate-800">77.3% CAPAIAN</span>
              </div>
            </div>
          </div>

          {/* Card 3: Indeks Kepuasan Masyarakat */}
          <div
            onClick={() => onSelectIksDetail('iks-2')}
            className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  INDEKS KEPUASAN MASYARAKAT
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs animate-pulse" />
              </div>

              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
                88,4
              </div>

              <div className="flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 mt-1">
                <span>↑ 1.1%</span>
                <span className="text-slate-400 font-normal">VS PERIODE LALU</span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 pt-0.5">
                <span>TGT: 88,0</span>
                <span className="text-emerald-700">100.5% CAPAIAN</span>
              </div>
            </div>
          </div>

          {/* Card 4: Reformasi Birokrasi */}
          <div
            onClick={() => onSelectIksDetail('iks-4')}
            className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  REFORMASI BIROKRASI
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs animate-pulse" />
              </div>

              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
                81,35 <span className="text-lg font-bold text-emerald-700">(A)</span>
              </div>

              <div className="flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 mt-1">
                <span>MEMUASKAN</span>
                <span className="text-slate-400 font-normal">· SAKIP 82,68</span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 pt-0.5">
                <span>TGT: BB (80)</span>
                <span className="text-emerald-700">101.7% CAPAIAN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. ROW 2: 6 SLEEK EXECUTIVE QUICK STRIP CARDS (PULSA LINTAS SEKTOR)  */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Strip 1: Serapan Realisasi Belanja */}
        <div className="bg-white rounded-xl p-2.5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-amber-300 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-600 font-mono truncate" title="Serapan Anggaran Belanja Konsolidasi BP Batam">
                SERAPAN BELANJA
              </span>
              <span className="text-xs font-black font-mono text-slate-900">77,6%</span>
            </div>
            <div className="text-[9px] text-slate-500 font-medium truncate mb-1">
              Realisasi Rp 1,96T (Pagu 2,53T)
            </div>
          </div>
          <div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '77.6%' }} />
            </div>
            <div className="text-[9px] font-mono text-slate-400 text-right mt-1 font-bold">
              TGT PERKIN: 75,0%
            </div>
          </div>
        </div>

        {/* Strip 2: SLA Perizinan Berusaha PTSP */}
        <div
          onClick={() => handleJumpToUnit('ptsp')}
          className="bg-white rounded-xl p-2.5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-emerald-300 transition-colors cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-600 font-mono truncate" title="SLA Perizinan Berusaha Pusat Pelayanan Terpadu Satu Pintu">
                SLA PERIZINAN PTSP
              </span>
              <span className="text-xs font-black font-mono text-slate-900">88,6%</span>
            </div>
            <div className="text-[9px] text-slate-500 font-medium truncate mb-1">
              Ketepatan Waktu Penerbitan Izin
            </div>
          </div>
          <div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88.6%' }} />
            </div>
            <div className="text-[9px] font-mono text-emerald-700 text-right mt-1 font-bold">
              1,8 HARI (SLA &lt; 3 HARI)
            </div>
          </div>
        </div>

        {/* Strip 3: Penertiban & Pengamanan Aset */}
        <div
          onClick={() => handleJumpToUnit('dit-pam-aset')}
          className="bg-white rounded-xl p-2.5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-rose-300 transition-colors cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-600 font-mono truncate" title="Penertiban Bangunan Liar & Pengamanan Aset Vital Ditpam">
                PENERTIBAN ASET
              </span>
              <span className="text-xs font-black font-mono text-slate-900">84,8%</span>
            </div>
            <div className="text-[9px] text-slate-500 font-medium truncate mb-1">
              874 Bangunan Liar Ditertibkan
            </div>
          </div>
          <div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84.8%' }} />
            </div>
            <div className="text-[9px] font-mono text-slate-500 text-right mt-1 font-bold">
              874 LOKASI TERTIB
            </div>
          </div>
        </div>

        {/* Strip 4: Kemandirian Keuangan BLU */}
        <div
          onClick={() => handleJumpToUnit('biro-keuangan')}
          className="bg-white rounded-xl p-2.5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-indigo-300 transition-colors cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-600 font-mono truncate" title="Rasio Kemandirian Finansial BLU (Pendapatan vs Belanja)">
                KEMANDIRIAN BLU
              </span>
              <span className="text-xs font-black font-mono text-slate-900">0,96</span>
            </div>
            <div className="text-[9px] text-slate-500 font-medium truncate mb-1">
              Rasio Pendapatan vs Belanja
            </div>
          </div>
          <div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '96%' }} />
            </div>
            <div className="text-[9px] font-mono text-indigo-700 text-right mt-1 font-bold">
              KAS BLU: RP 1,42T
            </div>
          </div>
        </div>

        {/* Strip 5: Total Nilai Ekspor FTZ Batam */}
        <div
          onClick={() => setIsFtzModalOpen(true)}
          className="bg-white rounded-xl p-2.5 border border-slate-200/90 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-blue-300 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-600 font-mono truncate" title="Total Nilai Ekspor Bebas Pajak KPBPB Batam">
                EKSPOR FTZ BATAM
              </span>
              <span className="text-xs font-black font-mono text-blue-700">$14,8B</span>
            </div>
            <div className="text-[9px] text-slate-500 font-medium truncate mb-1">
              Ekspor Bebas Pajak KPBPB
            </div>
          </div>
          <div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '82%' }} />
            </div>
            <div className="text-[9px] font-mono text-emerald-700 text-right mt-1 font-bold">
              SURPLUS +$2,6B (KPBPB)
            </div>
          </div>
        </div>

        {/* Strip 6: Ketahanan Air Baku 6 Waduk */}
        <div
          onClick={() => setSelectedWadukModal(DATA_6_WADUK_BATAM[0])}
          className="bg-white rounded-xl p-2.5 border border-slate-200/90 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-cyan-300 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-600 font-mono truncate" title="Kapasitas Tampung 6 Waduk Air Baku Kota Batam (BU SPAM)">
                AIR 6 WADUK
              </span>
              <span className="text-xs font-black font-mono text-cyan-800">161,9M m³</span>
            </div>
            <div className="text-[9px] text-slate-500 font-medium truncate mb-1">
              Kapasitas Tampung 96,8%
            </div>
          </div>
          <div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-cyan-600 rounded-full" style={{ width: '96.8%' }} />
            </div>
            <div className="text-[9px] font-mono text-cyan-700 text-right mt-1 font-bold">
              WTP: 3.420 L/DTK
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. ROW 3: 3 BALANCED EXECUTIVE WIDGETS (FOKUS MONITORING LINTAS UNIT)*/}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3.5">
        {/* ------------------------------------------------------------------ */}
        {/* WIDGET 1: KONSOLIDASI IKM UNIT LAYANAN (4 COLS)                    */}
        {/* ------------------------------------------------------------------ */}
        <div className="xl:col-span-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 font-mono">
                KONSOLIDASI IKM UNIT LAYANAN
              </span>
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                88,06 RERATA
              </span>
            </div>

            {/* List 6 Units with small clear font & full names */}
            <div className="space-y-1.5 mt-2">
              {KONSOLIDASI_IKM_SELURUH_UNIT.map((unit) => {
                const isMutuA = unit.mutuPelayanan === 'A';
                return (
                  <div
                    key={unit.id}
                    onClick={() => setSelectedIkmModal(unit)}
                    className="group cursor-pointer hover:bg-slate-50 p-2 rounded-lg border border-transparent hover:border-slate-200 transition-all"
                  >
                    <div className="flex items-start justify-between gap-1.5 mb-1">
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-800 leading-tight">
                          {unit.namaUnit}
                        </div>
                        <div className="text-[8.5px] text-slate-400 font-mono mt-0.5">
                          {unit.jumlahResponden.toLocaleString('id-ID')} Responden • {unit.kategori.split('&')[0]}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-mono font-black text-slate-900 text-[11px]">
                          {unit.skorIkm.toFixed(2)}
                        </div>
                        <span className="text-[8.5px] font-mono font-bold px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 inline-block mt-0.5">
                          Mutu {unit.mutuPelayanan}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isMutuA ? 'bg-[#002B49]' : 'bg-amber-600'
                        }`}
                        style={{ width: `${Math.min(unit.skorIkm, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>Standar PermenPAN-RB</span>
            <span className="text-emerald-700 font-bold">Target Perkin: 88,0</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* WIDGET 2: RINGKASAN KEUANGAN KONSOLIDASI (5 COLS)                  */}
        {/* ------------------------------------------------------------------ */}
        <div className="xl:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 font-mono">
                RINGKASAN KEUANGAN
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                REALISASI YTD
              </span>
            </div>

            {/* Penerimaan vs Belanja Strip */}
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs font-mono">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                <div className="text-[9.5px] font-bold text-slate-500 uppercase">PENERIMAAN (PNBP)</div>
                <div className="text-sm font-black text-slate-900 mt-0.5">Rp 1,89T</div>
                <div className="text-[9.5px] font-bold text-indigo-700 mt-0.5">77.3% Capaian</div>
              </div>

              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                <div className="text-[9.5px] font-bold text-slate-500 uppercase">BELANJA</div>
                <div className="text-sm font-black text-slate-900 mt-0.5">Rp 1,96T</div>
                <div className="text-[9.5px] font-bold text-purple-700 mt-0.5">77.6% Capaian</div>
              </div>
            </div>

            {/* Two Sub-columns: Top 5 Penerimaan vs 5 Belanja */}
            <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-slate-100 text-[10.5px]">
              <div>
                <span className="text-[9.5px] font-extrabold uppercase tracking-wide text-slate-400 font-mono block mb-1">
                  TOP 5 PENERIMAAN
                </span>
                <div className="space-y-1 font-mono">
                  <div>
                    <div className="text-slate-600 truncate text-[10px]">Dir. Pengelolaan Lahan</div>
                    <div className="font-bold text-slate-900">Rp 748.2M</div>
                  </div>
                  <div>
                    <div className="text-slate-600 truncate text-[10px]">BU SPAM Fasling</div>
                    <div className="font-bold text-slate-900">Rp 592.6M</div>
                  </div>
                  <div>
                    <div className="text-slate-600 truncate text-[10px]">Dir. Kepelabuhanan</div>
                    <div className="font-bold text-slate-900">Rp 382.4M</div>
                  </div>
                  <div>
                    <div className="text-slate-600 truncate text-[10px]">Dir. Kawasan Bandara</div>
                    <div className="font-bold text-slate-900">Rp 106.8M</div>
                  </div>
                  <div>
                    <div className="text-slate-600 truncate text-[10px]">Biro Keuangan (Giro)</div>
                    <div className="font-bold text-slate-900">Rp 38.5M</div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[9.5px] font-extrabold uppercase tracking-wide text-slate-400 font-mono block mb-1">
                  5 REALISASI BELANJA
                </span>
                <div className="space-y-1 font-mono">
                  <div>
                    <div className="text-slate-600 truncate text-[10px]">Dir. Pembangunan Infras</div>
                    <div className="font-bold text-slate-900">68.4% (Rp 466M)</div>
                  </div>
                  <div>
                    <div className="text-slate-600 truncate text-[10px]">Dir. Perencanaan Infras</div>
                    <div className="font-bold text-slate-900">71.0% (Rp 58M)</div>
                  </div>
                  <div>
                    <div className="text-slate-600 truncate text-[10px]">BU Rumah Sakit (RSBP)</div>
                    <div className="font-bold text-slate-900">81.0% (Rp 109M)</div>
                  </div>
                  <div>
                    <div className="text-slate-600 truncate text-[10px]">Dit. Pengamanan Aset</div>
                    <div className="font-bold text-slate-900">81.6% (Rp 52M)</div>
                  </div>
                  <div>
                    <div className="text-slate-600 truncate text-[10px]">Dit. Pelabuhan BUP</div>
                    <div className="font-bold text-slate-900">79.0% (Rp 146M)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-100 text-[10px] font-mono text-emerald-700 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Status: Saldo kas bank penampung BLU Rp 1,42T aman.</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* WIDGET 3: KINERJA OPERASIONAL SATKER KUNCI (3 COLS)                */}
        {/* HASIL CAPAIAN NYATA MENGGANTIKAN PERSENTASE SESUAI ARAHAN KEPALA   */}
        {/* ------------------------------------------------------------------ */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 font-mono">
                OPERASIONAL SATKER
              </span>
              <span className="text-[9px] font-mono text-slate-400">OUTPUT UTAMA</span>
            </div>

            {/* Clean Real Output Rows - No Ambiguous Percentages */}
            <div className="space-y-1.5 mt-2">
              {/* 1. LAHAN */}
              <div
                onClick={() => handleJumpToUnit('dit-lahan')}
                className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/50">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10.5px] font-bold text-slate-800 leading-tight">LAHAN</div>
                    <div className="text-[9px] text-slate-500 font-medium">Alokasi Lahan</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs font-black text-slate-900 shrink-0">
                  <span>248 Ha</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* 2. INFRAS */}
              <div
                onClick={() => handleJumpToUnit('dit-pembangunan-infrastruktur')}
                className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/50">
                    <HardHat className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10.5px] font-bold text-slate-800 leading-tight">INFRAS</div>
                    <div className="text-[9px] text-slate-500 font-medium">Proyek Strategis Konstruksi</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs font-black text-slate-900 shrink-0">
                  <span>14 Proyek</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* 3. PELABUHAN */}
              <div
                onClick={() => handleJumpToUnit('dit-pelabuhan')}
                className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200/50">
                    <Ship className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10.5px] font-bold text-slate-800 leading-tight">PELABUHAN</div>
                    <div className="text-[9px] text-slate-500 font-medium">Arus Petikemas Batu Ampar</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs font-black text-slate-900 shrink-0">
                  <span>612k TEUs</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* 4. BANDARA */}
              <div
                onClick={() => handleJumpToUnit('dit-bandara')}
                className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-200/50">
                    <Plane className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10.5px] font-bold text-slate-800 leading-tight">BANDARA</div>
                    <div className="text-[9px] text-slate-500 font-medium">Pergerakan Penumpang Udara</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs font-black text-slate-900 shrink-0">
                  <span>4,12M Pax</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* 5. DITPAM */}
              <div
                onClick={() => handleJumpToUnit('dit-pam-aset')}
                className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200/50">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10.5px] font-bold text-slate-800 leading-tight">DITPAM</div>
                    <div className="text-[9px] text-slate-500 font-medium">Operasi Penertiban & Aset</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs font-black text-slate-900 shrink-0">
                  <span>874 Tertib</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* 6. RSBP */}
              <div
                onClick={() => handleJumpToUnit('bu-rumah-sakit')}
                className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200/50">
                    <Stethoscope className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10.5px] font-bold text-slate-800 leading-tight">RSBP</div>
                    <div className="text-[9px] text-slate-500 font-medium">Okupansi Tempat Tidur Rawat</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs font-black text-slate-900 shrink-0">
                  <span>76,2% BOR</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>6 Satker Terpilih</span>
            <button
              onClick={onNavigateToCrossUnitMatrix}
              className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-0.5 cursor-pointer"
            >
              <span>Matriks 24 Satker</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 5. SEKSI BARU: KONSOLIDASI MULTI-INDIKATOR LINTAS DIREKTORAT/BIRO/BU */}
      {/* ==================================================================== */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between px-1 gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-[#002B49] text-cyan-300">
              <Zap className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="text-[11.5px] font-black uppercase tracking-tight text-slate-900 font-mono flex items-center gap-1.5">
                KONSOLIDASI MULTI-INDIKATOR STRATEGIS DIREKTORAT, BIRO & BADAN USAHA
              </span>
              <span className="text-[9.5px] font-mono text-slate-500">
                Sintesis komprehensif seluruh indikator output lintas unit kerja BP Batam untuk Pengawasan Terpadu Kepala BP
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200/60">
            6 KLASTER SEKTORAL TERPADU
          </span>
        </div>

        {/* 6 Comprehensive Multi-Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {KONSOLIDASI_MULTI_SEKTOR_BP_BATAM.map((sektor) => (
            <div
              key={sektor.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col justify-between space-y-3 hover:border-blue-300 hover:shadow-xs transition-all"
            >
              <div>
                {/* Sector Header */}
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/80 shrink-0">
                      {renderSectorIcon(sektor.iconName)}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-[11px] font-black uppercase tracking-tight text-slate-900 font-mono truncate" title={sektor.judul}>
                        {sektor.judul}
                      </h4>
                      <div className="text-[9px] text-slate-500 truncate mt-0.5">
                        {sektor.deskripsi}
                      </div>
                    </div>
                  </div>
                  <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 shrink-0">
                    {sektor.sektor}
                  </span>
                </div>

                {/* Primary Headline Highlight */}
                <div className="mt-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <div className="text-[8.5px] font-mono text-slate-400 uppercase">Sorotan Kinerja Utama</div>
                    <div className="text-[10.5px] font-bold text-slate-900 leading-snug line-clamp-2">
                      {sektor.highlightUtama}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Aktif & Terkendali
                    </span>
                  </div>
                </div>

                {/* Multi-Metrics List (Rangkuman Banyak Informasi per Sektor) */}
                <div className="mt-2.5 space-y-1.5">
                  <span className="text-[9px] font-mono font-extrabold uppercase text-slate-400 block tracking-wider">
                    INDIKATOR CAPAIAN MULTI-DIMENSI:
                  </span>
                  {sektor.metrikList.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-1.5 rounded-md bg-white border border-slate-100 hover:border-slate-200 flex items-center justify-between text-[10px] font-mono transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-slate-700 font-semibold truncate leading-tight">
                          {m.label}
                        </div>
                        <div className="text-[8.5px] text-slate-400 truncate">
                          {m.subtext} {m.target ? `· ${m.target}` : ''}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-black text-slate-900 text-[10.5px]">
                          {m.nilai}
                        </div>
                        <div
                          className={`text-[8px] font-bold ${
                            m.status === 'Tercapai' || m.status === 'Normal'
                              ? 'text-emerald-700'
                              : 'text-blue-700'
                          }`}
                        >
                          {m.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Jump Buttons to Underlying Units */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-[8.5px] font-mono text-slate-400 mb-1 flex items-center justify-between">
                  <span>UNIT KERJA TERKAIT:</span>
                  <span className="text-blue-700 font-bold">KLIK MENUJU DASHBOARD</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {sektor.satkerTerkait.map((u) => (
                    <button
                      key={u.routeId}
                      onClick={() => handleJumpToUnit(u.routeId)}
                      className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-100 text-slate-700 hover:bg-[#002B49] hover:text-white transition-all cursor-pointer border border-slate-200 flex items-center gap-1"
                      title={`Buka dashboard ${u.nama}`}
                    >
                      <span>{u.kode || u.nama}</span>
                      <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* ==================================================================== */}
      {/* 6. ROW 5: NARASI STRATEGIS EKSEKUTIF (MATCHING REFERENCE IMAGE)     */}
      {/* ==================================================================== */}
      <div className="bg-[#002B49] text-white rounded-xl p-3 sm:p-3.5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0 pr-3 md:border-r md:border-white/20">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-cyan-300 flex items-center justify-center font-black">
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </div>
          <div className="font-black font-mono uppercase tracking-tight text-[11px] leading-tight">
            <div>NARASI STRATEGIS</div>
            <div className="text-cyan-300 text-[10px]">KEPALA BP BATAM</div>
          </div>
        </div>

        {/* 3 Executive Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px] text-slate-200 leading-snug">
          <div className="flex items-start gap-1.5">
            <span className="font-mono font-bold text-cyan-300 shrink-0">01</span>
            <span>
              Investasi bertumbuh positif (Rp 54,68T / 78,1%) didukung ekspor FTZ US$ 14,8B; percepatan KEK dan penyelesaian izin lahan 7 SWP menjadi prioritas.
            </span>
          </div>

          <div className="flex items-start gap-1.5">
            <span className="font-mono font-bold text-cyan-300 shrink-0">02</span>
            <span>
              Ketahanan air 6 waduk terjaga pada 161,9M m³ (96,8% kapasitas); pemeliharaan waduk Sei Ladi dan penekanan kehilangan air NRW terus ditingkatkan.
            </span>
          </div>

          <div className="flex items-start gap-1.5">
            <span className="font-mono font-bold text-cyan-300 shrink-0">03</span>
            <span>
              Kinerja tata kelola BLU solid dengan saldo kas Rp 1,42T dan opini WTP; sistem merit ASN 342,5 menjamin profesionalitas 2.978 aparatur BP Batam.
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 7. ROW 6: FOOTER STATUS STRIP (MATCHING REFERENCE IMAGE)             */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px]">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span>SISTEM MANAJEMEN EKSEKUTIF — BP BATAM 2026</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono font-bold text-blue-700">
          <button
            onClick={onNavigateToCrossUnitMatrix}
            className="hover:text-blue-900 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>AKSES MATRIKS 24 SATKER</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => onSelectIksDetail('iks-1')}
            className="hover:text-blue-900 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>AKSES DETAIL 4 IKS</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 8. INTERACTIVE DETAIL MODAL: IKM UNIT SURVEY DETAIL                  */}
      {/* ==================================================================== */}
      {selectedIkmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <Smile className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded bg-emerald-100 text-emerald-800">
                      {selectedIkmModal.kodeUnit}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Mutu {selectedIkmModal.mutuPelayanan} ({selectedIkmModal.predikat})
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mt-0.5">
                    {selectedIkmModal.namaUnit}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedIkmModal(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">SKOR IKM (1-100)</span>
                  <span className="text-xl font-black text-emerald-700">
                    {selectedIkmModal.skorIkm.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">TARGET PERKIN</span>
                  <span className="text-base font-bold text-slate-800">
                    {selectedIkmModal.targetIkm.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">TOTAL RESPONDEN</span>
                  <span className="text-base font-bold text-blue-700">
                    {selectedIkmModal.jumlahResponden.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* 9 Elements Grid */}
              <div>
                <span className="font-extrabold uppercase font-mono text-[10px] text-slate-400 block mb-1">
                  SKOR 9 UNSUR PERMENPAN-RB:
                </span>
                <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                  <div className="bg-slate-50 p-1.5 rounded border border-slate-200/80">
                    <span className="text-[9px] text-slate-500 block truncate">1. Syarat</span>
                    <span className="font-bold text-slate-900 text-[11px]">{selectedIkmModal.unsur9.persyaratan}</span>
                  </div>
                  <div className="bg-slate-50 p-1.5 rounded border border-slate-200/80">
                    <span className="text-[9px] text-slate-500 block truncate">2. Prosedur</span>
                    <span className="font-bold text-slate-900 text-[11px]">{selectedIkmModal.unsur9.prosedur}</span>
                  </div>
                  <div className="bg-amber-50 p-1.5 rounded border border-amber-200">
                    <span className="text-[9px] text-amber-700 block truncate">3. Waktu</span>
                    <span className="font-bold text-amber-800 text-[11px]">{selectedIkmModal.unsur9.waktuLayanan}</span>
                  </div>
                  <div className="bg-slate-50 p-1.5 rounded border border-slate-200/80">
                    <span className="text-[9px] text-slate-500 block truncate">4. Tarif</span>
                    <span className="font-bold text-slate-900 text-[11px]">{selectedIkmModal.unsur9.biayaTarif}</span>
                  </div>
                  <div className="bg-slate-50 p-1.5 rounded border border-slate-200/80">
                    <span className="text-[9px] text-slate-500 block truncate">5. Produk</span>
                    <span className="font-bold text-slate-900 text-[11px]">{selectedIkmModal.unsur9.produkSpesifikasi}</span>
                  </div>
                  <div className="bg-slate-50 p-1.5 rounded border border-slate-200/80">
                    <span className="text-[9px] text-slate-500 block truncate">6. Kompetensi</span>
                    <span className="font-bold text-slate-900 text-[11px]">{selectedIkmModal.unsur9.kompetensiPetugas}</span>
                  </div>
                  <div className="bg-emerald-50 p-1.5 rounded border border-emerald-200">
                    <span className="text-[9px] text-emerald-700 block truncate">7. Perilaku</span>
                    <span className="font-bold text-emerald-800 text-[11px]">{selectedIkmModal.unsur9.perilakuPetugas}</span>
                  </div>
                  <div className="bg-slate-50 p-1.5 rounded border border-slate-200/80">
                    <span className="text-[9px] text-slate-500 block truncate">8. Sarana</span>
                    <span className="font-bold text-slate-900 text-[11px]">{selectedIkmModal.unsur9.maklumatLayanan}</span>
                  </div>
                  <div className="bg-slate-50 p-1.5 rounded border border-slate-200/80">
                    <span className="text-[9px] text-slate-500 block truncate">9. Pengaduan</span>
                    <span className="font-bold text-slate-900 text-[11px]">{selectedIkmModal.unsur9.penangananPengaduan}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] space-y-1 pt-1 border-t border-slate-100">
                <div className="text-slate-700">
                  <span className="font-bold text-emerald-700">✓ Unsur Terkuat: </span>
                  {selectedIkmModal.unsurTerkuat}
                </div>
                <div className="text-slate-700">
                  <span className="font-bold text-amber-700">⚠ Unsur Perhatian: </span>
                  {selectedIkmModal.unsurPerhatian}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  const lower = selectedIkmModal.kodeUnit.toLowerCase();
                  if (lower.includes('ptsp')) handleJumpToUnit('ptsp');
                  else if (lower.includes('burs') || lower.includes('rsbp')) handleJumpToUnit('bu-rumah-sakit');
                  else if (lower.includes('bup') || lower.includes('pelabuhan')) handleJumpToUnit('dit-pelabuhan');
                  else if (lower.includes('bandara')) handleJumpToUnit('dit-bandara');
                  else if (lower.includes('dpl') || lower.includes('lahan')) handleJumpToUnit('dit-lahan');
                  else onNavigateToCrossUnitMatrix();
                  setSelectedIkmModal(null);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-1 cursor-pointer"
              >
                <span>Buka Dashboard Unit Ini</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setSelectedIkmModal(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}



      {/* ==================================================================== */}
      {/* 10. INTERACTIVE DETAIL MODAL: WADUK AIR BATAM                        */}
      {/* ==================================================================== */}
      {selectedWadukModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-100 text-cyan-800">
                  <Droplets className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded bg-cyan-100 text-cyan-800">
                      STATUS: {selectedWadukModal.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Elevasi: {selectedWadukModal.elevasiM} m DPL
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mt-0.5">
                    {selectedWadukModal.nama}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedWadukModal(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">KAPASITAS TAMPUNG</span>
                  <span className="text-sm font-black text-slate-900">
                    {selectedWadukModal.kapasitasJutaM3} Juta m³
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SUPLAI AIR BAKU</span>
                  <span className="text-sm font-black text-cyan-700">
                    {selectedWadukModal.suplaiLps} Liter/detik
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">ELEVASI NORMAL</span>
                  <span className="text-sm font-black text-slate-800">
                    {selectedWadukModal.elevasiNormalM} m DPL
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">PERSENTASE ISI</span>
                  <span className="text-sm font-black text-emerald-700">
                    {selectedWadukModal.persenIsi}%
                  </span>
                </div>
              </div>

              <div>
                <span className="font-extrabold uppercase font-mono text-[10px] text-slate-400 block mb-1">
                  STATUS 6 WADUK PENOPANG AIR KOTA BATAM:
                </span>
                <div className="space-y-1 font-mono text-[11px]">
                  {DATA_6_WADUK_BATAM.map((w) => (
                    <div
                      key={w.id}
                      className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-200/50"
                    >
                      <span className="font-bold text-slate-800">{w.nama}</span>
                      <span className="text-slate-600">
                        {w.kapasitasJutaM3}M m³ · Suplai {w.suplaiLps} L/s ·{' '}
                        <span className={w.status === 'Siaga' ? 'text-amber-700 font-bold' : 'text-emerald-700 font-bold'}>
                          {w.status} ({w.persenIsi}%)
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  handleJumpToUnit('deputi-pelayanan-umum');
                  setSelectedWadukModal(null);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 flex items-center gap-1 cursor-pointer"
              >
                <span>Dashboard SPAM / Air Minum</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setSelectedWadukModal(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 11. INTERACTIVE DETAIL MODAL: PERDAGANGAN FTZ & LOGISTIK             */}
      {/* ==================================================================== */}
      {isFtzModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
                  <Globe className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    NERACA PERDAGANGAN &amp; LOGISTIK KPBPB BATAM
                  </h3>
                  <p className="text-[10.5px] text-slate-500 font-mono">
                    Lalu Lintas Barang, Kepelabuhanan, dan Aviasi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFtzModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 block">TOTAL EKSPOR</span>
                  <span className="text-sm font-black text-slate-900">
                    US$ {DATA_LOGISTIK_FTZ_BATAM.nilaiEksporMiliarUsd} Miliar
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">TOTAL IMPOR</span>
                  <span className="text-sm font-black text-slate-900">
                    US$ {DATA_LOGISTIK_FTZ_BATAM.nilaiImporMiliarUsd} Miliar
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SURPLUS PERDAGANGAN</span>
                  <span className="text-sm font-black text-emerald-700">
                    +US$ {DATA_LOGISTIK_FTZ_BATAM.surplusNeracaUsd} Miliar
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">DOKUMEN PPFTZ</span>
                  <span className="text-sm font-black text-blue-700">
                    {DATA_LOGISTIK_FTZ_BATAM.dokumenPpftz.toLocaleString('id-ID')} Dok (1,4 Jam)
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between p-1.5 bg-slate-50 rounded border border-slate-200/50">
                  <span className="text-slate-700">Arus Peti Kemas Batu Ampar:</span>
                  <span className="font-bold text-slate-900">{DATA_LOGISTIK_FTZ_BATAM.arusPetiKemasTeus.toLocaleString('id-ID')} TEUs</span>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-50 rounded border border-slate-200/50">
                  <span className="text-slate-700">Kunjungan Kapal (Vessel Calls):</span>
                  <span className="font-bold text-slate-900">{DATA_LOGISTIK_FTZ_BATAM.vesselCallsKapal.toLocaleString('id-ID')} Call</span>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-50 rounded border border-slate-200/50">
                  <span className="text-slate-700">Pergerakan Pesawat Udara:</span>
                  <span className="font-bold text-slate-900">{DATA_LOGISTIK_FTZ_BATAM.penerbanganFlight.toLocaleString('id-ID')} Flight</span>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-50 rounded border border-slate-200/50">
                  <span className="text-slate-700">Arus Penumpang Bandara:</span>
                  <span className="font-bold text-slate-900">{DATA_LOGISTIK_FTZ_BATAM.penumpangBandara.toLocaleString('id-ID')} Pax</span>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-50 rounded border border-slate-200/50">
                  <span className="text-slate-700">Kargo Udara (EMPU):</span>
                  <span className="font-bold text-slate-900">{DATA_LOGISTIK_FTZ_BATAM.kargoUdaraEmpuTon.toLocaleString('id-ID')} Ton</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsFtzModalOpen(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 12. INTERACTIVE DETAIL MODAL: SDM & TATA KELOLA LAHAN 7 SWP          */}
      {/* ==================================================================== */}
      {isSdmModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-purple-100 text-purple-800">
                  <Users className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    SDM APARATUR &amp; PEMETAAN 7 SWP LAHAN BATAM
                  </h3>
                  <p className="text-[10.5px] text-slate-500 font-mono">
                    Biro SDM &amp; Direktorat Pengelolaan Pertanahan
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSdmModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 block">TOTAL PEGAWAI</span>
                  <span className="text-sm font-black text-slate-900">
                    {DATA_SDM_DAN_TATA_KELOLA.totalPegawai} Orang
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SISTEM MERIT KASN</span>
                  <span className="text-sm font-black text-emerald-700">
                    {DATA_SDM_DAN_TATA_KELOLA.sistemMeritSkor} / 400 (Sangat Baik)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">KOMPOSISI APARATUR</span>
                  <span className="text-[10.5px] font-bold text-slate-700">
                    PNS: {DATA_SDM_DAN_TATA_KELOLA.pns} · PPPK: {DATA_SDM_DAN_TATA_KELOLA.pppk} · PTT: {DATA_SDM_DAN_TATA_KELOLA.pttKontrak}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">NILAI SAKIP &amp; SPBE</span>
                  <span className="text-[10.5px] font-bold text-purple-700">
                    SAKIP: {DATA_SDM_DAN_TATA_KELOLA.indeksSakip} (A) · SPBE: {DATA_SDM_DAN_TATA_KELOLA.indeksSpbe}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-extrabold uppercase font-mono text-[10px] text-slate-400 block mb-1">
                  SEBARAN ALOKASI LAHAN PADA 7 SWP BATAM:
                </span>
                <div className="space-y-1 text-[10.5px]">
                  {DATA_7_SWP_LAHAN.map((swp) => (
                    <div
                      key={swp.swp}
                      className="flex items-center justify-between p-1 bg-slate-50 rounded border border-slate-200/50"
                    >
                      <span className="font-bold text-slate-800">{swp.swp}</span>
                      <span className="text-slate-600">
                        {swp.luasHa} Ha · Alokasi: {swp.alokasiHa} Ha · {swp.izinPemanfaatan} Izin ({swp.status})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsSdmModalOpen(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
