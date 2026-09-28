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
import { PerencanaanKpis } from '../PerencanaanInfrastruktur/PerencanaanKpis';
import { PerencanaanVisualisasiData } from '../PerencanaanInfrastruktur/PerencanaanVisualisasiData';

// Unit 2: Pembangunan Infrastruktur imports (Dashboard Satu Data Lengkap)
import { InfrastrukturSatuDataDashboard } from '../PembangunanInfrastruktur/InfrastrukturSatuDataDashboard';

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
  // (Sheet Daftar Paket DED dihapus sesuai instruksi)
  // -------------------------------------------------------------
  const [subTabPerencanaan, setSubTabPerencanaan] = useState<
    'visual-sektor' | 'kpis'
  >('visual-sektor');
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
          {/* Sub-tab Navigation Bar for Perencanaan (Hanya Visualisasi & Scorecard, Daftar Paket Dihapus) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
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

          {/* Sub-view: Visualisasi Matriks & Capex (Persentase Pemanfaatan Dokumen Dihapus) */}
          {subTabPerencanaan === 'visual-sektor' && (
            <PerencanaanVisualisasiData
              pakets={filteredPaketPerencanaan}
              selectedSektor={selectedPerencanaanSektor}
              onSelectSektor={setSelectedPerencanaanSektor}
              onOpenFormula={(datasetNo) => onOpenFormulaModal('kpi-ded-perencanaan')}
              hidePemanfaatan={true}
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
      {/* (Menggunakan Dashboard Pembangunan yang sebelumnya dibuatkan)   */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-pembangunan-infrastruktur' && (
        <div className="space-y-4">
          <InfrastrukturSatuDataDashboard
            onOpenFormula={(kpiType) => onOpenFormulaModal(kpiType)}
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. UNIT 3: DIREKTORAT PENGAMANAN ASET DAN KAWASAN DEEP-DIVE   */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-pam-aset' && (
        <div className="space-y-4">
          {/* Executive Ditpam BAN KPI Cards */}
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
            <RekapPenertibanCard
              filters={pengamananFilters}
              onOpenFormula={() => onOpenFormulaModal('kpi_bangunan_liar')}
            />
          )}

          {/* Module 2: Pengamanan Unjuk Rasa & Kamtibmas Kawasan */}
          {subTabPengamanan === 'unjuk-rasa' && (
            <RekapUnjukRasaCard
              filters={pengamananFilters}
              onOpenFormula={() => onOpenFormulaModal('kpi_unjuk_rasa')}
            />
          )}

          {/* Module 3: Bencana Alam, Karhutla & Operasi Rescue */}
          {subTabPengamanan === 'bencana' && (
            <RekapBencanaAlamCard
              filters={pengamananFilters}
              onOpenFormula={() => onOpenFormulaModal('kpi_bencana_alam')}
            />
          )}

          {/* Module 4: Monitoring Atasan & Sektor Rawan Obvitnas */}
          {subTabPengamanan === 'monitoring' && (
            <MonitoringPengamananAtasan
              onOpenFormula={() => onOpenFormulaModal('kpi_bangunan_liar')}
            />
          )}
        </div>
      )}
    </div>
  );
};
