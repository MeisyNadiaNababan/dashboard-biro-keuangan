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
  BarChart3,
  Calculator,
  Target
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from 'recharts';
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

// Radar Data untuk 4 IKP Perkin Kepala BP Batam (Persis Model Radar Capaian 4 IKP Tata Kelola & Akuntabilitas)
const RADAR_4_IKP_KEPALA_BP = [
  {
    subject: '1. Investasi (Rp 70 T)',
    target: 100,
    realisasi: 78.1,
    skorAsli: 'Rp 54,68 T / Rp 70,0 T',
  },
  {
    subject: '2. Kepuasan IKM (88)',
    target: 100,
    realisasi: 100.5,
    skorAsli: '88,42 / 88,00',
  },
  {
    subject: '3. PNBP (Rp 2,45 T)',
    target: 100,
    realisasi: 77.3,
    skorAsli: 'Rp 1.892,4 M / Rp 2.447,8 M',
  },
  {
    subject: '4. Reformasi Birokrasi',
    target: 100,
    realisasi: 101.7,
    skorAsli: '81,35 (A) / 80,00 (BB)',
  },
];

// Tabel Komponen IKP-1: Realisasi Investasi KPBPB Batam
const DETAIL_INVESTASI_TABLE_DATA = [
  { komponen: 'Modal Tetap (KPU Bea Cukai)', target: 'Rp 48,00 T', realisasi: 'Rp 38,20 T', persen: 79.58, status: 'On Track' },
  { komponen: 'Modal Lancar (KPU BC & BPS)', target: 'Rp 22,00 T', realisasi: 'Rp 16,48 T', persen: 74.91, status: 'On Track' },
  { komponen: 'PMA (Penanaman Modal Asing)', target: 'Rp 52,00 T', realisasi: 'Rp 42,10 T', persen: 80.96, status: 'On Track' },
  { komponen: 'PMDN (Modal Dalam Negeri)', target: 'Rp 18,00 T', realisasi: 'Rp 12,58 T', persen: 69.89, status: 'Waspada' },
  { komponen: 'KEK Batam Aero Technic (BAT)', target: 'Rp 5,50 T', realisasi: 'Rp 4,82 T', persen: 87.64, status: 'Tercapai' },
  { komponen: 'KEK Nongsa Digital Park (NDP)', target: 'Rp 4,20 T', realisasi: 'Rp 4,10 T', persen: 97.62, status: 'Tercapai' },
];

// Tabel Komponen IKP-2: Survei Kepuasan Masyarakat (5 Lokus Layanan)
const DETAIL_IKM_5_LOKUS_TABLE_DATA = [
  { lokus: 'PTSP (Perizinan Berusaha)', target: 88.0, skor: 89.40, mutu: 'A', responden: 2840, persen: 101.59 },
  { lokus: 'BUP (Pelabuhan Laut)', target: 88.0, skor: 88.10, mutu: 'A', responden: 3120, persen: 100.11 },
  { lokus: 'Pengelolaan Pertanahan & Lahan', target: 88.0, skor: 87.50, mutu: 'B', responden: 4250, persen: 99.43 },
  { lokus: 'BU Rumah Sakit BP Batam (RSBP)', target: 88.0, skor: 88.90, mutu: 'A', responden: 1980, persen: 101.02 },
  { lokus: 'BU SPAM, Rusun & Fasling', target: 88.0, skor: 87.80, mutu: 'B', responden: 3450, persen: 99.77 },
];

// Tabel Komponen IKP-3: Realisasi Penerimaan PNBP (Top Satker & Badan Usaha)
const DETAIL_PNBP_TOP_SATKER_TABLE_DATA = [
  { satker: 'Dit. Pengelolaan Lahan (UWT/Sewa)', target: 'Rp 920,0 M', realisasi: 'Rp 748,2 M', persen: 81.33, status: 'On Track' },
  { satker: 'BU SPAM & Fasling (Air Minum)', target: 'Rp 710,0 M', realisasi: 'Rp 592,6 M', persen: 83.46, status: 'On Track' },
  { satker: 'Dit. Kepelabuhanan (BUP)', target: 'Rp 510,0 M', realisasi: 'Rp 382,4 M', persen: 74.98, status: 'On Track' },
  { satker: 'Dit. Kawasan Bandara & TI', target: 'Rp 165,0 M', realisasi: 'Rp 106,8 M', persen: 64.73, status: 'Waspada' },
  { satker: 'BU Rumah Sakit (RSBP)', target: 'Rp 142,0 M', realisasi: 'Rp 62,4 M', persen: 43.94, status: 'Perlu Perhatian' },
  { satker: 'Biro Keuangan (Jasa Giro/Bunga)', target: 'Rp 50,0 M', realisasi: 'Rp 38,5 M', persen: 77.00, status: 'On Track' },
];

// Tabel Komponen IKP-4: Indeks Reformasi Birokrasi (8 Area Perubahan)
const DETAIL_RB_8_AREA_TABLE_DATA = [
  { area: '1. Manajemen Perubahan', bobot: '5%', target: 4.00, nilai: 4.25, capaian: '106.3%' },
  { area: '2. Deregulasi Kebijakan', bobot: '5%', target: 4.00, nilai: 4.10, capaian: '102.5%' },
  { area: '3. Penataan Organisasi', bobot: '6%', target: 4.80, nilai: 5.30, capaian: '110.4%' },
  { area: '4. Penataan Tatalaksana (SPBE)', bobot: '7%', target: 5.60, nilai: 6.80, capaian: '121.4%' },
  { area: '5. Penataan Sistem Manajemen SDM', bobot: '13%', target: 10.40, nilai: 11.20, capaian: '107.7%' },
  { area: '6. Penguatan Akuntabilitas (SAKIP)', bobot: '14%', target: 11.20, nilai: 12.80, capaian: '114.3%' },
  { area: '7. Penguatan Pengawasan (SPIP)', bobot: '12%', target: 9.60, nilai: 11.40, capaian: '118.8%' },
  { area: '8. Kualitas Pelayanan Publik', bobot: '38%', target: 30.40, nilai: 25.50, capaian: '83.9%' },
];

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
  // Sheet Swap State: Strategic Compass between 4 IKP Radar & Detail Table vs Kinerja Operasional Satker
  const [strategicCompassView, setStrategicCompassView] = useState<'4ikp_radar' | 'operasional_satker'>('4ikp_radar');
  
  // Sheet Swap State: Widget 3 in Row 3 between Operasional Satker vs 4 IKP Ringkas
  const [operasionalWidgetView, setOperasionalWidgetView] = useState<'operasional' | 'ringkasan_4ikp'>('operasional');

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
      {/* 2. ROW 1: STRATEGIC COMPASS (KOMPAS STRATEGIS KEPALA BP BATAM)       */}
      {/* PERSIS FORMAT RADAR CAPAIAN 4 IKP TATA KELOLA & DETAIL TABEL RESMI   */}
      {/* ==================================================================== */}
      <div className="space-y-3">
        {/* Header Banner & Sheet Swap Controls for Strategic Compass */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3.5 bg-gradient-to-r from-slate-900 via-[#002B49] to-slate-900 rounded-xl border border-slate-800 text-white shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white">
                  STRATEGIC COMPASS (KOMPAS STRATEGIS KEPALA BP BATAM)
                </h3>
                <span className="hidden sm:inline-block text-[9.5px] font-mono px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700/60 font-bold">
                  Perkin No. 1/SPJ/KA/1/2026
                </span>
              </div>
              <p className="text-[10.5px] text-slate-300 font-sans">
                Radar Capaian 4 Indikator Kinerja Program (IKP) Utama &amp; Komparasi Kinerja Operasional Satker
              </p>
            </div>
          </div>

          {/* Sheet Swap Controls (Sesuai Permintaan User: Sheet Swap antara 4 Detail IKP dan Operasional Satker) */}
          <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto bg-slate-800/90 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setStrategicCompassView('4ikp_radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                strategicCompassView === '4ikp_radar'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-cyan-300" />
              <span>Radar &amp; 4 Detail IKP Perkin</span>
            </button>

            <button
              onClick={() => setStrategicCompassView('operasional_satker')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                strategicCompassView === 'operasional_satker'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Operasional Satker (Sheet Swap)</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: RADAR CAPAIAN 4 IKP & 4 DETAIL PERFORMANCE CARDS WITH TABLES */}
        {strategicCompassView === '4ikp_radar' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5">
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
                  100% On-Track / Tercapai
                </span>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={RADAR_4_IKP_KEPALA_BP}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }}
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
                      formatter={(val: any, name: any, item: any) => [
                        `${Number(val).toFixed(1)}% (${item.payload.skorAsli})`,
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
                  <span className="font-extrabold text-emerald-700">89.4% Kinerja Komprehensif</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  *Investasi (Rp 70 T), IKM (88,0), PNBP (Rp 2,45 T), dan RB (80 BB) dinormalisasi ke indeks 100% untuk kompas visual terpadu.
                </div>
              </div>
            </div>

            {/* Right: 4 Detailed IKP Performance Cards (Persis seperti Capaian Evaluasi 4 IKP Tata Kelola) */}
            <div className="xl:col-span-8 bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                      Capaian Evaluasi 4 Indikator Kinerja Program (IKP)
                    </h4>
                    <p className="text-[10px] sm:text-[10.5px] text-slate-500">
                      Tabel rincian komponen evaluasi realisasi investasi, 5 lokus IKM, PNBP satker, dan 8 area perubahan reformasi birokrasi
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 shrink-0 self-start sm:self-auto">
                  Perkin Kepala BP Batam 2026
                </span>
              </div>

              {/* Grid 2 Sebaris, 2 Dibawahnya (Persis Format Standar Radar Capaian 4 IKP) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* CARD 1: IKP-1 REALISASI INVESTASI */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded text-[10px] border border-blue-200">
                      IKP-1 &bull; DIT. INVESTASI &amp; KEK
                    </span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 border border-amber-200">
                      78.11% On Track
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      Nilai Realisasi Investasi di KPBPB Batam
                    </h5>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Unit: Dit. Investasi &amp; KEK (KPU Bea Cukai + BPS Kota Batam)
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black font-mono text-slate-900">Rp 54,68T</span>
                        <span className="text-[10.5px] font-bold text-blue-700">YTD 2026</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        Target: <strong className="text-slate-800">Rp 70,00T</strong>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div style={{ width: '78.1%' }} className="bg-blue-600 h-full rounded-full" />
                    </div>
                  </div>

                  {/* Detail Breakdown Table */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-700">Rincian Komponen Modal &amp; Kawasan KEK:</span>
                      <span className="text-[9px] font-mono text-slate-500">6 Komponen</span>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60 max-h-[175px] overflow-y-auto">
                      <table className="w-full text-left text-[9.5px]">
                        <thead className="sticky top-0 bg-slate-100/95 z-10">
                          <tr className="text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                            <th className="py-1 px-1.5">Komponen Investasi</th>
                            <th className="py-1 px-1 text-center">Target</th>
                            <th className="py-1 px-1.5 text-right">Realisasi</th>
                            <th className="py-1 px-1 text-right">Capaian</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                          {DETAIL_INVESTASI_TABLE_DATA.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white transition-colors">
                              <td className="py-1 px-1.5 font-sans truncate max-w-[130px]" title={row.komponen}>
                                {row.komponen}
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-slate-500">
                                {row.target}
                              </td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">
                                {row.realisasi}
                              </td>
                              <td className="py-1 px-1 text-right font-mono font-bold text-blue-700">
                                {row.persen.toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-blue-50/70 font-bold text-slate-900 border-t border-blue-200 text-[9.5px]">
                            <td className="py-1 px-1.5 font-bold text-blue-950">Total Realisasi Investasi:</td>
                            <td className="py-1 px-1 text-center font-mono text-blue-900">Rp 70,0T</td>
                            <td className="py-1 px-1.5 text-right font-mono font-black text-blue-900">Rp 54,68T</td>
                            <td className="py-1 px-1 text-right font-mono font-black text-blue-900">78.11%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectIksDetail('iks-1')}
                    className="w-full text-center text-[10px] text-blue-700 hover:text-blue-900 font-bold py-1 bg-white hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Calculator className="w-3 h-3 text-blue-600" />
                    <span>Lihat Panduan &amp; Formula Investasi</span>
                  </button>
                </div>

                {/* CARD 2: IKP-2 INDEKS KEPUASAN MASYARAKAT */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                      IKP-2 &bull; KONSOLIDASI 5 LOKUS
                    </span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                      100.48% Tercapai
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      Indeks Kepuasan Masyarakat Pengguna Layanan
                    </h5>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Unit: Biro OKMR / Standar PermenPAN-RB No. 14/2017
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black font-mono text-slate-900">88,42</span>
                        <span className="text-[10.5px] font-bold text-emerald-700">Mutu A (Sangat Baik)</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        Target: <strong className="text-slate-800">88,00</strong>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div style={{ width: '100%' }} className="bg-emerald-600 h-full rounded-full" />
                    </div>
                  </div>

                  {/* Detail Breakdown Table */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-700">Rincian Skor IKM 5 Lokus Pelayanan Utama:</span>
                      <span className="text-[9px] font-mono text-slate-500">5 Lokus</span>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60 max-h-[175px] overflow-y-auto">
                      <table className="w-full text-left text-[9.5px]">
                        <thead className="sticky top-0 bg-slate-100/95 z-10">
                          <tr className="text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                            <th className="py-1 px-1.5">Lokus Layanan</th>
                            <th className="py-1 px-1 text-center">Target</th>
                            <th className="py-1 px-1.5 text-right">Skor IKM</th>
                            <th className="py-1 px-1 text-center">Mutu</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                          {DETAIL_IKM_5_LOKUS_TABLE_DATA.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white transition-colors">
                              <td className="py-1 px-1.5 font-sans truncate max-w-[130px]" title={row.lokus}>
                                {row.lokus}
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-slate-500">
                                {row.target.toFixed(1)}
                              </td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">
                                {row.skor.toFixed(2)}
                              </td>
                              <td className="py-1 px-1 text-center font-mono font-bold text-emerald-700">
                                {row.mutu}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-emerald-50/70 font-bold text-slate-900 border-t border-emerald-200 text-[9.5px]">
                            <td className="py-1 px-1.5 font-bold text-emerald-950">Rerata Tertimbang Konsolidasi:</td>
                            <td className="py-1 px-1 text-center font-mono text-emerald-900">88.00</td>
                            <td className="py-1 px-1.5 text-right font-mono font-black text-emerald-900">88.42</td>
                            <td className="py-1 px-1 text-center font-mono font-black text-emerald-900">Mutu A</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectIksDetail('iks-2')}
                    className="w-full text-center text-[10px] text-emerald-700 hover:text-emerald-900 font-bold py-1 bg-white hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Calculator className="w-3 h-3 text-emerald-600" />
                    <span>Lihat Panduan &amp; Formula IKM</span>
                  </button>
                </div>

                {/* CARD 3: IKP-3 REALISASI PNBP */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded text-[10px] border border-indigo-200">
                      IKP-3 &bull; BIRO KEUANGAN &amp; 10 SATKER
                    </span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 border border-amber-200">
                      77.31% On Track
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      Nilai Realisasi PNBP BP Batam
                    </h5>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Unit: Biro Keuangan &amp; 10 Satker Penghasil BLU
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black font-mono text-slate-900">Rp 1.892,4M</span>
                        <span className="text-[10.5px] font-bold text-indigo-700">(Rp 1,89T)</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        Target: <strong className="text-slate-800">Rp 2.447,8M</strong>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div style={{ width: '77.3%' }} className="bg-indigo-600 h-full rounded-full" />
                    </div>
                  </div>

                  {/* Detail Breakdown Table */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-700">Rincian Top Satker Kontributor PNBP (Hal. 5):</span>
                      <span className="text-[9px] font-mono text-slate-500">Top 6 Unit</span>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60 max-h-[175px] overflow-y-auto">
                      <table className="w-full text-left text-[9.5px]">
                        <thead className="sticky top-0 bg-slate-100/95 z-10">
                          <tr className="text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                            <th className="py-1 px-1.5">Satker Penghasil</th>
                            <th className="py-1 px-1 text-center">Target</th>
                            <th className="py-1 px-1.5 text-right">Realisasi</th>
                            <th className="py-1 px-1 text-right">Capaian</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                          {DETAIL_PNBP_TOP_SATKER_TABLE_DATA.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white transition-colors">
                              <td className="py-1 px-1.5 font-sans truncate max-w-[130px]" title={row.satker}>
                                {row.satker}
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-slate-500">
                                {row.target}
                              </td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">
                                {row.realisasi}
                              </td>
                              <td className="py-1 px-1 text-right font-mono font-bold text-indigo-700">
                                {row.persen.toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-indigo-50/70 font-bold text-slate-900 border-t border-indigo-200 text-[9.5px]">
                            <td className="py-1 px-1.5 font-bold text-indigo-950">Total Realisasi PNBP BLU:</td>
                            <td className="py-1 px-1 text-center font-mono text-indigo-900">Rp 2.447,8M</td>
                            <td className="py-1 px-1.5 text-right font-mono font-black text-indigo-900">Rp 1.892,5M</td>
                            <td className="py-1 px-1 text-right font-mono font-black text-indigo-900">77.31%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectIksDetail('iks-3')}
                    className="w-full text-center text-[10px] text-indigo-700 hover:text-indigo-900 font-bold py-1 bg-white hover:bg-indigo-50 rounded-lg border border-indigo-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Calculator className="w-3 h-3 text-indigo-600" />
                    <span>Lihat Panduan &amp; Formula PNBP</span>
                  </button>
                </div>

                {/* CARD 4: IKP-4 REFORMASI BIROKRASI */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white hover:border-amber-300 transition-all shadow-2xs flex flex-col justify-between space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[10px] border border-amber-200">
                      IKP-4 &bull; BIRO OKMR
                    </span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                      101.69% Tercapai
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      Indeks Reformasi Birokrasi (8 Area)
                    </h5>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Unit: Biro OKMR / KemenPAN-RB
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black font-mono text-slate-900">81,35</span>
                        <span className="text-[10.5px] font-bold text-emerald-700">Predikat A (Memuaskan)</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        Target: <strong className="text-slate-800">80,00</strong> (BB)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div style={{ width: '100%' }} className="bg-emerald-600 h-full rounded-full" />
                    </div>
                  </div>

                  {/* Detail Breakdown Table */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-700">Tabel Komponen 8 Area Perubahan RB:</span>
                      <span className="text-[9px] font-mono text-slate-500">8 Komponen</span>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60 max-h-[175px] overflow-y-auto">
                      <table className="w-full text-left text-[9.5px]">
                        <thead className="sticky top-0 bg-slate-100/95 z-10">
                          <tr className="text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                            <th className="py-1 px-1.5">Area Perubahan</th>
                            <th className="py-1 px-1 text-center">Bobot</th>
                            <th className="py-1 px-1 text-center">Target</th>
                            <th className="py-1 px-1.5 text-right">Nilai</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                          {DETAIL_RB_8_AREA_TABLE_DATA.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white transition-colors">
                              <td className="py-1 px-1.5 font-sans truncate max-w-[130px]" title={row.area}>
                                {row.area}
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-slate-500">
                                {row.bobot}
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-slate-500">
                                {row.target.toFixed(2)}
                              </td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">
                                {row.nilai.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-amber-50/70 font-bold text-slate-900 border-t border-amber-200 text-[9.5px]">
                            <td className="py-1 px-1.5 font-bold text-amber-950">Total Indeks RB (Predikat A):</td>
                            <td className="py-1 px-1 text-center font-mono text-amber-900">100%</td>
                            <td className="py-1 px-1 text-center font-mono text-amber-900">80.00</td>
                            <td className="py-1 px-1.5 text-right font-mono font-black text-emerald-800">81.35</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectIksDetail('iks-4')}
                    className="w-full text-center text-[10px] text-amber-700 hover:text-amber-900 font-bold py-1 bg-white hover:bg-amber-50 rounded-lg border border-amber-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Calculator className="w-3 h-3 text-amber-600" />
                    <span>Lihat Panduan &amp; Formula RB</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SHEET SWAP KINERJA OPERASIONAL SATKER (SESUAI PERMINTAAN USER: OPERASIONAL SATKER DI SHEET SWAPNYA 4 DETAIL IKP PERKIN) */}
        {strategicCompassView === 'operasional_satker' && (
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900">
                    Kinerja Operasional Satuan Kerja Kunci (Sheet Swap)
                  </h4>
                  <p className="text-[10px] sm:text-[10.5px] text-slate-500">
                    Capaian output nyata 6 satker operasional strategis (Lahan, Infras, Pelabuhan, Bandara, Ditpam, dan RSBP)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  Output Real Berjalan
                </span>
                <button
                  onClick={onNavigateToCrossUnitMatrix}
                  className="px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Matriks 24 Satker</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 6 Expanded Operasional Satker Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* Satker 1: Lahan */}
              <div
                onClick={() => handleJumpToUnit('dit-lahan')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer bg-slate-50/50 flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">PENGELOLAAN LAHAN</div>
                      <div className="text-[9.5px] text-slate-500 font-mono">Dit. Pengelolaan Pertanahan</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    On-Target
                  </span>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-slate-900">248 Ha</div>
                  <div className="text-[10px] text-slate-600 font-medium">Realisasi Alokasi &amp; UWT Lahan</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Target: 250 Ha</span>
                    <span className="font-bold text-emerald-700">99.2%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '99.2%' }} />
                  </div>
                </div>
              </div>

              {/* Satker 2: Infras */}
              <div
                onClick={() => handleJumpToUnit('dit-pembangunan-infrastruktur')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-xs transition-all cursor-pointer bg-slate-50/50 flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                      <HardHat className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">INFRASTRUKTUR</div>
                      <div className="text-[9.5px] text-slate-500 font-mono">Dit. Pembangunan Infras</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                    14 Proyek Aktif
                  </span>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-slate-900">14 Paket</div>
                  <div className="text-[10px] text-slate-600 font-medium">Proyek Strategis Jalan &amp; Drainase</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Target: 15 Proyek</span>
                    <span className="font-bold text-amber-700">93.3%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '93.3%' }} />
                  </div>
                </div>
              </div>

              {/* Satker 3: Pelabuhan */}
              <div
                onClick={() => handleJumpToUnit('dit-pelabuhan')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer bg-slate-50/50 flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <Ship className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">KEPELABUHANAN</div>
                      <div className="text-[9.5px] text-slate-500 font-mono">Badan Usaha Pelabuhan (BUP)</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                    Tercapai
                  </span>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-slate-900">612.000 TEUs</div>
                  <div className="text-[10px] text-slate-600 font-medium">Arus Petikemas Batu Ampar &amp; Sekupang</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Target: 600.000 TEUs</span>
                    <span className="font-bold text-blue-700">102.0%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              {/* Satker 4: Bandara */}
              <div
                onClick={() => handleJumpToUnit('dit-bandara')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer bg-slate-50/50 flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      <Plane className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">BANDARA HANG NADIM</div>
                      <div className="text-[9.5px] text-slate-500 font-mono">Dit. Kawasan Bandara</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                    Tinggi
                  </span>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-slate-900">4,12 Juta Pax</div>
                  <div className="text-[10px] text-slate-600 font-medium">Lalu Lintas Penumpang Udara</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Target: 4,00M Pax</span>
                    <span className="font-bold text-indigo-700">103.0%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              {/* Satker 5: Ditpam */}
              <div
                onClick={() => handleJumpToUnit('dit-pam-aset')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-rose-300 hover:shadow-xs transition-all cursor-pointer bg-slate-50/50 flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">PENGAMANAN ASET</div>
                      <div className="text-[9.5px] text-slate-500 font-mono">Dit. Pengamanan Aset (Ditpam)</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                    Tertib
                  </span>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-slate-900">874 Lokasi</div>
                  <div className="text-[10px] text-slate-600 font-medium">Penertiban Bangunan Liar &amp; Patroli</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Target: 900 Lokasi</span>
                    <span className="font-bold text-rose-700">97.1%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '97.1%' }} />
                  </div>
                </div>
              </div>

              {/* Satker 6: RSBP */}
              <div
                onClick={() => handleJumpToUnit('bu-rumah-sakit')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer bg-slate-50/50 flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">RUMAH SAKIT BP BATAM</div>
                      <div className="text-[9.5px] text-slate-500 font-mono">BU RSBP Batam</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded">
                    Optimal
                  </span>
                </div>
                <div>
                  <div className="text-xl font-black font-mono text-slate-900">76,2% BOR</div>
                  <div className="text-[10px] text-slate-600 font-medium">Bed Occupancy Rate &amp; Layanan KEK</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Standar Kemenkes: 70-85%</span>
                    <span className="font-bold text-teal-700">Memuaskan</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-teal-600 h-full rounded-full" style={{ width: '89.6%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
        {/* ------------------------------------------------------------------ */}
        {/* WIDGET 3: KINERJA OPERASIONAL SATKER KUNCI & SHEET SWAP 4 IKP PERKIN*/}
        {/* SESUAI PERMINTAAN USER: UNTUK OPERASIONAL SATKER BUAT DI SHEET SWAPNYA 4 DETAIL IKP */}
        {/* ------------------------------------------------------------------ */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 font-mono">
                {operasionalWidgetView === 'operasional' ? 'OPERASIONAL SATKER' : '4 DETAIL IKP PERKIN'}
              </span>
              
              {/* Sheet Swap Controls for Operasional Satker vs 4 IKP */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[9px] font-mono">
                <button
                  onClick={() => setOperasionalWidgetView('operasional')}
                  className={`px-2 py-0.5 rounded font-bold cursor-pointer transition-colors ${
                    operasionalWidgetView === 'operasional'
                      ? 'bg-white text-emerald-700 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Tampilkan Operasional Satker"
                >
                  Satker
                </button>
                <button
                  onClick={() => setOperasionalWidgetView('ringkasan_4ikp')}
                  className={`px-2 py-0.5 rounded font-bold cursor-pointer transition-colors ${
                    operasionalWidgetView === 'ringkasan_4ikp'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Tampilkan 4 Detail IKP Perkin Kepala BP"
                >
                  4 IKP
                </button>
              </div>
            </div>

            {/* TAB 1: OPERASIONAL SATKER (Clean Real Output Rows) */}
            {operasionalWidgetView === 'operasional' && (
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
                      <div className="text-[9px] text-slate-500 font-medium">Operasi Penertiban &amp; Aset</div>
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
            )}

            {/* TAB 2: SHEET SWAP 4 DETAIL IKP PERKIN KEPALA BP BATAM */}
            {operasionalWidgetView === 'ringkasan_4ikp' && (
              <div className="space-y-2 mt-2">
                {/* 1. Investasi */}
                <div
                  onClick={() => onSelectIksDetail('iks-1')}
                  className="p-2 rounded-lg bg-blue-50/60 border border-blue-200/70 hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="font-bold text-blue-900">IKP 1: Investasi KPBPB</span>
                    <span className="font-mono font-bold text-blue-700">78.1%</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-0.5">
                    <span>Realisasi: Rp 54,68T</span>
                    <span>Target: Rp 70,0T</span>
                  </div>
                  <div className="w-full bg-blue-200/50 rounded-full h-1 mt-1 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '78.1%' }} />
                  </div>
                </div>

                {/* 2. IKM */}
                <div
                  onClick={() => onSelectIksDetail('iks-2')}
                  className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-200/70 hover:bg-emerald-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="font-bold text-emerald-900">IKP 2: Indeks Kepuasan (IKM)</span>
                    <span className="font-mono font-bold text-emerald-700">100.5% (Mutu A)</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-0.5">
                    <span>Skor: 88,42</span>
                    <span>Target: 88,00</span>
                  </div>
                  <div className="w-full bg-emerald-200/50 rounded-full h-1 mt-1 overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* 3. PNBP */}
                <div
                  onClick={() => onSelectIksDetail('iks-3')}
                  className="p-2 rounded-lg bg-indigo-50/60 border border-indigo-200/70 hover:bg-indigo-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="font-bold text-indigo-900">IKP 3: Realisasi PNBP BLU</span>
                    <span className="font-mono font-bold text-indigo-700">77.3%</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-0.5">
                    <span>Realisasi: Rp 1.892,4M</span>
                    <span>Target: Rp 2.447,8M</span>
                  </div>
                  <div className="w-full bg-indigo-200/50 rounded-full h-1 mt-1 overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: '77.3%' }} />
                  </div>
                </div>

                {/* 4. RB */}
                <div
                  onClick={() => onSelectIksDetail('iks-4')}
                  className="p-2 rounded-lg bg-amber-50/60 border border-amber-200/70 hover:bg-amber-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="font-bold text-amber-900">IKP 4: Reformasi Birokrasi</span>
                    <span className="font-mono font-bold text-amber-700">101.7% (Predikat A)</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-0.5">
                    <span>Nilai: 81,35</span>
                    <span>Target: 80,00</span>
                  </div>
                  <div className="w-full bg-amber-200/50 rounded-full h-1 mt-1 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>{operasionalWidgetView === 'operasional' ? '6 Satker Terpilih' : '4 IKP Perkin 2026'}</span>
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
