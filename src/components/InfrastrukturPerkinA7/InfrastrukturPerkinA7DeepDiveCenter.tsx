import React, { useState, useMemo } from 'react';
import {
  Compass,
  HardHat,
  ShieldCheck,
  Search,
  Filter,
  Layers,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Coins,
  MapPin,
  Route,
  Trees,
  Zap,
  Mountain,
  Users,
  Flame,
  FileCheck2,
  FileText,
  HelpCircle,
  BarChart3,
  PieChart,
  ShieldAlert,
  Building2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { INFRASTRUKTUR_3_UNITS } from './perkinA7Data';

// Unit 1: Perencanaan Infrastruktur imports
import {
  SEMUA_PAKET_PERENCANAAN,
  KPI_SEKTOR_LIST,
} from '../PerencanaanInfrastruktur/perencanaanData';
import { PaketPerencanaan } from '../PerencanaanInfrastruktur/types';
import { PerencanaanKpis } from '../PerencanaanInfrastruktur/PerencanaanKpis';
import { PerencanaanVisualisasiData } from '../PerencanaanInfrastruktur/PerencanaanVisualisasiData';
import { DaftarPaketPerencanaanCard } from '../PerencanaanInfrastruktur/DaftarPaketPerencanaanCard';

// Unit 2: Pembangunan Infrastruktur imports
import {
  DATASET_6_PEMBANGUNAN_INFRASTRUKTUR,
  DATASET_1_ROW_UTILITAS,
  DATASET_2_ROW_PENGHIJAUAN,
  DATASET_4_PROGRES_KONSTRUKSI,
  DATASET_5_PEMATANGAN_TANAH,
  DATASET_3_RUAS_JARINGAN_JALAN,
  SUMMARY_RUAS_JARINGAN_JALAN,
  SUMMARY_ROW_UTILITAS,
  SUMMARY_ROW_PENGHIJAUAN,
  SUMMARY_PEMATANGAN_TANAH,
} from '../PembangunanInfrastruktur/infrastrukturData';
import { DatasetRowUtilitasCard } from '../PembangunanInfrastruktur/DatasetRowUtilitasCard';
import { DatasetRowPenghijauanCard } from '../PembangunanInfrastruktur/DatasetRowPenghijauanCard';
import { DatasetJaringanJalanCard } from '../PembangunanInfrastruktur/DatasetJaringanJalanCard';
import { ProgresKonstruksiCard } from '../PembangunanInfrastruktur/ProgresKonstruksiCard';
import { DatasetPematanganTanahCard } from '../PembangunanInfrastruktur/DatasetPematanganTanahCard';
import { JenisPembangunanCard } from '../PembangunanInfrastruktur/JenisPembangunanCard';

// Unit 3: Pengamanan Aset dan Kawasan (Ditpam) imports
import {
  BANGUNAN_LIAR_SAMPLES,
  BANGUNAN_LIAR_SUMMARY,
  UNJUK_RASA_DATA,
  TOTAL_PERSONIL_DITPAM,
  TOTAL_GIAT_PENGAMANAN_OBVIT,
  TOTAL_LUAS_PENINDAKAN_HA,
} from '../PengamananAset/pengamananAsetData';
import { PengamananAsetKpis } from '../PengamananAset/PengamananAsetKpis';
import { RekapPenertibanCard } from '../PengamananAset/RekapPenertibanCard';
import { RekapUnjukRasaCard } from '../PengamananAset/RekapUnjukRasaCard';
import { RekapBencanaAlamCard } from '../PengamananAset/RekapBencanaAlamCard';
import { MonitoringPengamananAtasan } from '../PengamananAset/MonitoringPengamananAtasan';
import { PengamananFilterState } from '../PengamananAset/types';

interface InfrastrukturPerkinA7DeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
}

export const InfrastrukturPerkinA7DeepDiveCenter: React.FC<
  InfrastrukturPerkinA7DeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
  onOpenFormulaModal,
  onNavigateToFullDashboard,
}) => {
  // Current active unit metadata
  const currentUnit = useMemo(() => {
    return (
      INFRASTRUKTUR_3_UNITS.find((u) => u.id === selectedUnitId) ||
      INFRASTRUKTUR_3_UNITS[0]
    );
  }, [selectedUnitId]);

  // -------------------------------------------------------------
  // Unit 1: Perencanaan Infrastruktur Local State
  // -------------------------------------------------------------
  const [subTabPerencanaan, setSubTabPerencanaan] = useState<
    'paket-ded' | 'visual-sektor' | 'kpis'
  >('paket-ded');
  const [selectedPerencanaanSektor, setSelectedPerencanaanSektor] = useState<string>('Semua');
  const [searchPerencanaan, setSearchPerencanaan] = useState<string>('');

  const filteredPaketPerencanaan = useMemo(() => {
    return SEMUA_PAKET_PERENCANAAN.filter((p) => {
      const matchSektor =
        selectedPerencanaanSektor === 'Semua' ||
        p.sektor.toLowerCase().includes(selectedPerencanaanSektor.toLowerCase());
      const matchSearch =
        !searchPerencanaan ||
        p.namaKegiatan.toLowerCase().includes(searchPerencanaan.toLowerCase()) ||
        p.kodePaket.toLowerCase().includes(searchPerencanaan.toLowerCase()) ||
        p.lokasiKawasan.toLowerCase().includes(searchPerencanaan.toLowerCase());
      return matchSektor && matchSearch;
    });
  }, [selectedPerencanaanSektor, searchPerencanaan]);

  const dynamicPerencanaanKpis = useMemo(() => {
    return KPI_SEKTOR_LIST.map((kpi) => {
      const paketsInSektor = filteredPaketPerencanaan.filter((p) => p.sektor === kpi.sektor);
      const totalPagu = paketsInSektor.reduce((acc, p) => acc + p.paguKonsultansi, 0);
      const totalCapex = paketsInSektor.reduce((acc, p) => acc + p.estimasiCapexFisik, 0);
      const siapLelang = paketsInSektor.filter(
        (p) => p.statusKesiapan === 'Selesai (Siap Lelang Fisik)'
      ).length;

      return {
        ...kpi,
        totalPaket: paketsInSektor.length,
        totalPaguDED: totalPagu,
        totalEstimasiCapexFisik: totalCapex,
        paketSiapLelangCount: siapLelang,
        persenSelesaiSiapLelang:
          paketsInSektor.length > 0 ? (siapLelang / paketsInSektor.length) * 100 : 0,
      };
    });
  }, [filteredPaketPerencanaan]);

  // -------------------------------------------------------------
  // Unit 2: Pembangunan Infrastruktur Local State (6 Datasets)
  // -------------------------------------------------------------
  const [subTabPembangunan, setSubTabPembangunan] = useState<
    'dataset-4' | 'dataset-3' | 'dataset-1' | 'dataset-2' | 'dataset-5' | 'dataset-6'
  >('dataset-4');
  const [searchPembangunanDs4, setSearchPembangunanDs4] = useState<string>('');
  const [statusFilterDs4, setStatusFilterDs4] = useState<string>('Semua');
  const [selectedJenisPekerjaanDs6, setSelectedJenisPekerjaanDs6] = useState<string>('Semua');

  // -------------------------------------------------------------
  // Unit 3: Pengamanan Aset dan Kawasan (Ditpam) Local State
  // -------------------------------------------------------------
  const [subTabPengamanan, setSubTabPengamanan] = useState<
    'penertiban' | 'unjuk-rasa' | 'bencana' | 'monitoring'
  >('penertiban');
  const [pengamananFilters, setPengamananFilters] = useState<PengamananFilterState>({
    tahun: 'ALL',
    semester: 'ALL',
    lokasiSektor: 'ALL',
    jenisObjek: 'ALL',
    searchQuery: '',
  });

  return (
    <div
      id="infrastruktur-deep-dive-section"
      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4 font-sans"
    >
      {/* ============================================================== */}
      {/* 1. TOP HEADER & 3-UNIT SELECTOR BAR                            */}
      {/* ============================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h3 className="text-sm font-black tracking-wider uppercase text-slate-800">
              UNIT DEEP-DIVE CENTER &bull; 3 UNIT KERJA PERKIN A.7
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Satu Data Interaktif Terpadu
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Eksplorasi data operasional mendalam yang diintegrasikan langsung dari dashboard 3 unit kerja pengampu Perkin A.7: <strong>Direktorat Perencanaan</strong>, <strong>Direktorat Pembangunan</strong>, dan <strong>Direktorat Pengamanan Aset dan Kawasan</strong>.
          </p>
        </div>

        {/* 3 Main Unit Selectors */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
          {INFRASTRUKTUR_3_UNITS.map((unit) => {
            const isSelected = selectedUnitId === unit.id;
            return (
              <button
                key={unit.id}
                onClick={() => {
                  onSelectUnit(unit.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {unit.id === 'dit-perencanaan-infrastruktur' && <Compass className="w-3.5 h-3.5" />}
                {unit.id === 'dit-pembangunan-infrastruktur' && <HardHat className="w-3.5 h-3.5" />}
                {unit.id === 'dit-pam-aset' && <ShieldCheck className="w-3.5 h-3.5" />}
                <span>{unit.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. SELECTED UNIT BANNER WITH ACTION                            */}
      {/* ============================================================== */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-blue-600 text-white">
              {currentUnit.code}
            </span>
            <h4 className="text-sm font-bold text-slate-900">{currentUnit.name}</h4>
          </div>
          <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
            {currentUnit.deskripsi}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenFormulaModal(
              selectedUnitId === 'dit-perencanaan-infrastruktur'
                ? 'kpi-ded-perencanaan'
                : selectedUnitId === 'dit-pam-aset'
                ? 'kpi_bangunan_liar'
                : 'kpi-ruas-jalan'
            )}
            className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
            title="Kamus Rumus & Formula Unit"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Kamus Rumus</span>
          </button>

          {onNavigateToFullDashboard && (
            <button
              onClick={() => onNavigateToFullDashboard(currentUnit.id)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Dashboard Penuh {currentUnit.shortName}</span>
            </button>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. UNIT 1: DIREKTORAT PERENCANAAN INFRASTRUKTUR DEEP-DIVE      */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-perencanaan-infrastruktur' && (
        <div className="space-y-4">
          {/* Sub-tab Navigation Bar for Perencanaan */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'paket-ded', label: 'Daftar & Detail Paket DED (43 Paket)', icon: FileText },
                { id: 'visual-sektor', label: 'Visualisasi Matriks & Sektor Capex', icon: BarChart3 },
                { id: 'kpis', label: 'Ringkasan Scorecard 6 Sektor', icon: Layers },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = subTabPerencanaan === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSubTabPerencanaan(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-500 font-mono">
              Buku Satu Data Hal. 53 (Dataset 1 s.d. 6 DED)
            </div>
          </div>

          {/* Sub-view: Paket DED Table & Modal */}
          {subTabPerencanaan === 'paket-ded' && (
            <DaftarPaketPerencanaanCard
              pakets={filteredPaketPerencanaan}
              allPakets={SEMUA_PAKET_PERENCANAAN}
              selectedSektor={selectedPerencanaanSektor}
              onSelectSektor={setSelectedPerencanaanSektor}
              onOpenFormula={(datasetNo) => onOpenFormulaModal('kpi-ded-perencanaan')}
            />
          )}

          {/* Sub-view: Visualisasi Matriks & Capex */}
          {subTabPerencanaan === 'visual-sektor' && (
            <PerencanaanVisualisasiData
              pakets={filteredPaketPerencanaan}
              selectedSektor={selectedPerencanaanSektor}
              onSelectSektor={setSelectedPerencanaanSektor}
              onOpenFormula={(datasetNo) => onOpenFormulaModal('kpi-ded-perencanaan')}
            />
          )}

          {/* Sub-view: Scorecards Sektor Lengkap */}
          {subTabPerencanaan === 'kpis' && (
            <PerencanaanKpis
              kpis={dynamicPerencanaanKpis}
              selectedSektor={selectedPerencanaanSektor}
              onSelectSektor={setSelectedPerencanaanSektor}
              onOpenFormula={(datasetNo) => onOpenFormulaModal('kpi-ded-perencanaan')}
            />
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. UNIT 2: DIREKTORAT PEMBANGUNAN INFRASTRUKTUR DEEP-DIVE      */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-pembangunan-infrastruktur' && (
        <div className="space-y-4">
          {/* Sub-tab Navigation Across 6 Datasets of Satu Data (Hal. 48-51) */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
            {[
              {
                id: 'dataset-4',
                label: 'Dataset 4: Progres Fisik & SCM Kurva S',
                badge: '12 Paket',
                icon: TrendingUp,
              },
              {
                id: 'dataset-3',
                label: 'Dataset 3: Ruas Jaringan Jalan',
                badge: '542,8 Km (88,2% Mantap)',
                icon: Route,
              },
              {
                id: 'dataset-1',
                label: 'Dataset 1: ROW Utilitas',
                badge: '12 Izin (Rp 4,85 M)',
                icon: Zap,
              },
              {
                id: 'dataset-2',
                label: 'Dataset 2: ROW Penghijauan',
                badge: '38 Titik RTH',
                icon: Trees,
              },
              {
                id: 'dataset-5',
                label: 'Dataset 5: Pematangan Tanah BSW',
                badge: '280 Ha',
                icon: Mountain,
              },
              {
                id: 'dataset-6',
                label: 'Dataset 6: Pembangunan Fisik',
                badge: '14 Proyek',
                icon: Layers,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = subTabPembangunan === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSubTabPembangunan(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[9.5px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dataset 4: Progres Konstruksi & SCM Kurva S */}
          {subTabPembangunan === 'dataset-4' && (
            <div className="space-y-3">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-xs text-sky-900 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-2 py-0.5 bg-sky-200 text-sky-900 rounded text-[10px]">
                    DATASET NO. 4 • HAL. 49-50
                  </span>
                  <span>
                    Pemantauan kurva S kontraktual, deviasi mingguan, serta status rapat pembuktian keterlambatan (Show Cause Meeting/SCM).
                  </span>
                </div>
                <button
                  onClick={() => onOpenFormulaModal('kpi-kurva-s')}
                  className="px-2 py-1 rounded bg-white hover:bg-sky-100 text-sky-800 border border-sky-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula Kurva S</span>
                </button>
              </div>

              <ProgresKonstruksiCard
                searchQuery={searchPembangunanDs4}
                statusFilter={statusFilterDs4}
                onOpenFormula={(kpiType) => onOpenFormulaModal('kpi-kurva-s')}
              />
            </div>
          )}

          {/* Dataset 3: Ruas Jaringan Jalan Eksisting (542,8 Km) */}
          {subTabPembangunan === 'dataset-3' && (
            <div className="space-y-3">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-900 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-2 py-0.5 bg-indigo-200 text-indigo-900 rounded text-[10px]">
                    DATASET NO. 3 • HAL. 48-49
                  </span>
                  <span>
                    Panjang total jalan 542,80 Km dengan <strong>478,75 Km (88,20%)</strong> dalam kondisi Mantap (Baik &amp; Sedang).
                  </span>
                </div>
                <button
                  onClick={() => onOpenFormulaModal('kpi-ruas-jalan')}
                  className="px-2 py-1 rounded bg-white hover:bg-indigo-100 text-indigo-800 border border-indigo-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula Kemantapan Jalan</span>
                </button>
              </div>

              <DatasetJaringanJalanCard
                onOpenFormula={(kpi) => onOpenFormulaModal('kpi-ruas-jalan')}
              />
            </div>
          )}

          {/* Dataset 1: ROW Utilitas */}
          {subTabPembangunan === 'dataset-1' && (
            <div className="space-y-3">
              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3 text-xs text-cyan-900 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-2 py-0.5 bg-cyan-200 text-cyan-900 rounded text-[10px]">
                    DATASET NO. 1 • HAL. 48
                  </span>
                  <span>
                    Rekapitulasi perizinan pemanfaatan koridor jalan untuk galian kabel fiber optik, pipa gas bumi, pipa air SPAM, dan kabel PLN. Realisasi PNBP <strong>Rp 4,85 Miliar (110,2%)</strong>.
                  </span>
                </div>
                <button
                  onClick={() => onOpenFormulaModal('kpi-row-utilitas')}
                  className="px-2 py-1 rounded bg-white hover:bg-cyan-100 text-cyan-800 border border-cyan-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula PNBP ROW</span>
                </button>
              </div>

              <DatasetRowUtilitasCard
                onOpenFormula={(kpi) => onOpenFormulaModal('kpi-row-utilitas')}
              />
            </div>
          )}

          {/* Dataset 2: ROW Penghijauan */}
          {subTabPembangunan === 'dataset-2' && (
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded text-[10px]">
                    DATASET NO. 2 • HAL. 48
                  </span>
                  <span>
                    Pengelolaan Ruang Terbuka Hijau (RTH) median dan sempadan jalan protokol di 38 titik lokasi seluas <strong>142.500 m²</strong>.
                  </span>
                </div>
                <button
                  onClick={() => onOpenFormulaModal('kpi-row-penghijauan')}
                  className="px-2 py-1 rounded bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula RTH Hijau</span>
                </button>
              </div>

              <DatasetRowPenghijauanCard
                onOpenFormula={(kpi) => onOpenFormulaModal('kpi-row-penghijauan')}
              />
            </div>
          )}

          {/* Dataset 5: Pematangan Tanah Cut and Fill BSW */}
          {subTabPembangunan === 'dataset-5' && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-2 py-0.5 bg-amber-200 text-amber-900 rounded text-[10px]">
                    DATASET NO. 5 • HAL. 50-51
                  </span>
                  <span>
                    Total pematangan lahan seluas <strong>280 Hektar</strong> pada 5 Wilayah Pengembangan Strategis (BSW) dengan total volume <strong>4.270.000 m³</strong> cut and fill dan nilai kontrak Rp 418,1 M.
                  </span>
                </div>
                <button
                  onClick={() => onOpenFormulaModal('kpi-pematangan')}
                  className="px-2 py-1 rounded bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula Pematangan BSW</span>
                </button>
              </div>

              <DatasetPematanganTanahCard />
            </div>
          )}

          {/* Dataset 6: Rekap Jenis Pembangunan Fisik */}
          {subTabPembangunan === 'dataset-6' && (
            <div className="space-y-3">
              <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-2 py-0.5 bg-slate-900 text-white rounded text-[10px]">
                    DATASET NO. 6 • HAL. 49
                  </span>
                  <span>
                    Rekapitulasi 14 paket pembangunan fisik jalan tol/non-tol, jembatan &amp; flyover, dermaga pelabuhan, drainase primer, dan gedung utilitas.
                  </span>
                </div>
                <button
                  onClick={() => onOpenFormulaModal('ikp-1-pembangunan-infrastruktur')}
                  className="px-2 py-1 rounded bg-white hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula IKP Fisik</span>
                </button>
              </div>

              <JenisPembangunanCard
                selectedJenisPekerjaan={selectedJenisPekerjaanDs6}
                onSelectJenis={setSelectedJenisPekerjaanDs6}
              />
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. UNIT 3: DIREKTORAT PENGAMANAN ASET DAN KAWASAN DEEP-DIVE   */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-pam-aset' && (
        <div className="space-y-4">
          {/* Executive Ditpam BAN KPI Cards (Poin 1-4) */}
          <PengamananAsetKpis
            onOpenFormulaModal={(kpiId) => onOpenFormulaModal(kpiId || 'kpi_bangunan_liar')}
          />

          {/* Ditpam Module Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                {
                  id: 'penertiban',
                  label: 'Rekap Penertiban Bangunan Liar (Dataset 9)',
                  icon: ShieldAlert,
                },
                {
                  id: 'unjuk-rasa',
                  label: 'Rekap Pengamanan Unjuk Rasa (Dataset 7)',
                  icon: Users,
                },
                {
                  id: 'bencana',
                  label: 'Rekap Bencana Alam & Rescue (Dataset 6)',
                  icon: Flame,
                },
                {
                  id: 'monitoring',
                  label: 'Kesiapsiagaan Obvitnas & Hutan Lindung',
                  icon: TrendingUp,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = subTabPengamanan === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSubTabPengamanan(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Year / Semester Filter for Ditpam */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-[11px] text-slate-500 font-semibold mr-1">Tahun:</span>
              {(['ALL', '2025', '2024'] as const).map((yr) => (
                <button
                  key={yr}
                  onClick={() =>
                    setPengamananFilters((prev) => ({
                      ...prev,
                      tahun: yr,
                    }))
                  }
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    pengamananFilters.tahun === yr
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Module 1: Rekap Penertiban Rutin & Bangunan Liar */}
          {subTabPengamanan === 'penertiban' && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between gap-2">
                <span>
                  <strong>Sterilisasi Koridor ROW &amp; Aset Fisik:</strong> Penertiban 1.030 unit bangunan liar tanpa izin di koridor pelebaran jalan Sudirman, Waduk Duriangkang, Sekupang, dan Rempang guna menjamin kelancaran pekerjaan fisik infrastruktur.
                </span>
                <span className="font-mono font-bold px-2 py-0.5 bg-amber-200 rounded text-[10px] shrink-0">
                  SATU DATA HAL. 18-19
                </span>
              </div>
              <RekapPenertibanCard filters={pengamananFilters} />
            </div>
          )}

          {/* Module 2: Rekap Pengamanan Unjuk Rasa */}
          {subTabPengamanan === 'unjuk-rasa' && (
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-center justify-between gap-2">
                <span>
                  <strong>Stabilitas Kamtibmas Aset &amp; Kantor BP Batam:</strong> Penanganan 28 aksi demonstrasi dan unjuk rasa aliansi serikat buruh serta ormas dengan eskalasi kondusif tanpa kerusakan fasilitas umum.
                </span>
                <span className="font-mono font-bold px-2 py-0.5 bg-blue-200 rounded text-[10px] shrink-0">
                  SATU DATA HAL. 18
                </span>
              </div>
              <RekapUnjukRasaCard filters={pengamananFilters} />
            </div>
          )}

          {/* Module 3: Rekap Bencana Alam & Rescue */}
          {subTabPengamanan === 'bencana' && (
            <div className="space-y-3">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-900 flex items-center justify-between gap-2">
                <span>
                  <strong>Tanggap Darurat Rescue &amp; Damkar Ditpam:</strong> Respon cepat 124 kejadian bencana (karhutla, pohon tumbang di jalan arteri, dan longsor lereng) dengan rata-rata waktu respon 12,4 menit.
                </span>
                <span className="font-mono font-bold px-2 py-0.5 bg-rose-200 rounded text-[10px] shrink-0">
                  SATU DATA HAL. 18
                </span>
              </div>
              <RekapBencanaAlamCard filters={pengamananFilters} />
            </div>
          )}

          {/* Module 4: Kesiapsiagaan Obvitnas & Hutan Lindung */}
          {subTabPengamanan === 'monitoring' && (
            <div className="space-y-3">
              <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 flex items-center justify-between gap-2">
                <span>
                  <strong>Patroli Objek Vital Nasional (Obvitnas) &amp; Penindakan Hutan Lindung:</strong> Pengamanan 7 Obvitnas (Bandara Hang Nadim, Pelabuhan Batu Ampar, Sekupang, Kabil, Batamindo, Waduk Duriangkang, dan Kantor BP Batam) serta sterilisasi 1.042 Ha kawasan lindung.
                </span>
                <span className="font-mono font-bold px-2 py-0.5 bg-slate-900 text-white rounded text-[10px] shrink-0">
                  SATU DATA HAL. 17
                </span>
              </div>
              <MonitoringPengamananAtasan filters={pengamananFilters} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
