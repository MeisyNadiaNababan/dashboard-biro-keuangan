import React, { useState } from 'react';
import {
  Stethoscope,
  Shield,
  Droplets,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Activity,
  FileSpreadsheet,
  Search,
  Sparkles,
  Layers,
  ChevronRight,
  FileText,
  Building2,
  BedDouble,
  Store,
  Pill,
  Award,
  Users,
  Flame,
  LayoutDashboard,
  Database,
  MapPin,
  Calendar,
  HelpCircle,
} from 'lucide-react';
import {
  RumahSakitFilterState,
  RS_KEUANGAN_SUMMARY,
  RS_IKM_TOTAL,
  RS_KUNJUNGAN_TOTAL,
  RS_TENANT_SEWA,
} from '../../data/rumahSakitData';
import { RumahSakitFilters } from '../RumahSakit/RumahSakitFilters';
import { RumahSakitKpiRow } from '../RumahSakit/RumahSakitKpiRow';
import { RumahSakitKunjunganLayananCard } from '../RumahSakit/RumahSakitKunjunganLayananCard';
import { RumahSakitEfisiensiCard } from '../RumahSakit/RumahSakitEfisiensiCard';
import { RumahSakitSewaTenantCard } from '../RumahSakit/RumahSakitSewaTenantCard';
import { RumahSakitPnbpBelanjaCard } from '../RumahSakit/RumahSakitPnbpBelanjaCard';
import { RumahSakitMorbiditasObatCard } from '../RumahSakit/RumahSakitMorbiditasObatCard';

import { PengamananFilterState } from '../PengamananAset/types';
import { PengamananAsetFilters } from '../PengamananAset/PengamananAsetFilters';
import { PengamananAsetKpis } from '../PengamananAset/PengamananAsetKpis';
import { RekapPenertibanCard } from '../PengamananAset/RekapPenertibanCard';
import { RekapBencanaAlamCard } from '../PengamananAset/RekapBencanaAlamCard';
import { RekapUnjukRasaCard } from '../PengamananAset/RekapUnjukRasaCard';
import { MonitoringPengamananAtasan } from '../PengamananAset/MonitoringPengamananAtasan';

import { DEEP_DIVE_PROFILES } from './pelayananUmumData';

interface UnitDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const UnitDeepDiveCenter: React.FC<UnitDeepDiveCenterProps> = ({
  selectedUnitId,
  onSelectUnit,
  onNavigateToFullDashboard,
  onOpenFormulaModal,
}) => {
  // RSBP Internal States
  const [rsbpSubTab, setRsbpSubTab] = useState<
    'ikhtisar' | 'keuangan' | 'kunjungan' | 'efisiensi' | 'sewa' | 'penyakit_obat' | 'satu_data'
  >('ikhtisar');

  const [rsbpFilters, setRsbpFilters] = useState<RumahSakitFilterState>({
    tahun: 2026,
    periodeBulan: 'ALL',
    bagianLayanan: 'ALL',
    caraBayar: 'ALL',
    statusTenant: 'ALL',
  });

  // Ditpam Internal States
  const [ditpamSubTab, setDitpamSubTab] = useState<
    'all' | 'monitoring' | 'unjuk_rasa' | 'bencana_alam' | 'penertiban' | 'satu_data'
  >('all');

  const [ditpamFilters, setDitpamFilters] = useState<PengamananFilterState>({
    tahun: 'ALL',
    semester: 'ALL',
    lokasiSektor: 'ALL',
    jenisObjek: 'ALL',
    searchQuery: '',
  });

  const [ditpamSearch, setDitpamSearch] = useState('');

  // SPAM Fasling Internal States
  const [spamSubTab, setSpamSubTab] = useState<
    'ikhtisar' | 'waduk_wtp' | 'dmz_nrw' | 'kpli_b3' | 'rusunawa' | 'satu_data'
  >('ikhtisar');

  const [datasetSearch, setDatasetSearch] = useState('');

  const activeProfile =
    DEEP_DIVE_PROFILES[selectedUnitId] || DEEP_DIVE_PROFILES['bu-rumah-sakit'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 overflow-hidden font-sans">
      {/* 1. Main Directorate Header & Unit Switcher */}
      <div className="bg-gradient-to-r from-slate-900 via-[#002B49] to-[#0A2540] text-white p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>UNIT DEEP-DIVE CENTER • PERKIN A6 PELAYANAN UMUM</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1 flex items-center gap-2">
              <span>Eksplorasi Mendalam Satker Pelayanan Umum</span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-200 border border-blue-400/30">
                Lokus: {selectedUnitId === 'bu-rumah-sakit' ? 'BU RSBP Batam' : selectedUnitId === 'dit-pam-aset' ? 'Ditpam BP Batam' : 'BU SPAM Fasling'}
              </span>
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Telaah data kinerja fungsional, parameter operasional, serapan anggaran, dan daftar atribut Satu Data BP Batam.
            </p>
          </div>

          {/* 3 Unit Selection Tabs */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10 shrink-0 self-start md:self-auto">
            <button
              onClick={() => onSelectUnit('bu-rumah-sakit')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedUnitId === 'bu-rumah-sakit'
                  ? 'bg-rose-600 text-white shadow-md ring-1 ring-white/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-rose-200" />
              <span>BU Rumah Sakit</span>
            </button>

            <button
              onClick={() => onSelectUnit('dit-pam-aset')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedUnitId === 'dit-pam-aset'
                  ? 'bg-amber-600 text-white shadow-md ring-1 ring-white/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-200" />
              <span>Dit. Pengamanan Aset</span>
            </button>

            <button
              onClick={() => onSelectUnit('bu-spam-fasling')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedUnitId === 'bu-spam-fasling'
                  ? 'bg-cyan-600 text-white shadow-md ring-1 ring-white/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Droplets className="w-4 h-4 text-cyan-200" />
              <span>BU SPAM Fasling</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. UNIT CONTENT: BADAN USAHA RUMAH SAKIT (RSBP BATAM) */}
      {selectedUnitId === 'bu-rumah-sakit' && (
        <div className="p-4 sm:p-5 space-y-4 bg-slate-50/60">
          {/* RSBP Satker Banner & Sub-Tabs Toolbar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 shadow-2xs">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 font-mono">
                      KODE: BURS
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Badan Usaha Rumah Sakit BP Batam (RSBP Sekupang)
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                      SATU DATA HAL. 19 - 21 (18 DATASET)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                      STATUS: BLU PENUH
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
                    Pusat layanan kesehatan rujukan terstandar internasional di Sekupang, penunjang KEK Kesehatan Sekupang, dengan keunggulan kardiovaskular, onkologi, traumatologi, dan MCU terpadu.
                  </p>
                </div>
              </div>

              {/* Action Button: Buka Dashboard Penuh */}
              {onNavigateToFullDashboard && (
                <button
                  onClick={() => onNavigateToFullDashboard('bu-rumah-sakit')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start lg:self-auto shrink-0"
                  title="Pindah ke Dashboard Penuh Satker Rumah Sakit"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Buka Dashboard Penuh RSBP</span>
                </button>
              )}
            </div>

            {/* Sub-Navigation Tabs within RSBP */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {[
                { id: 'ikhtisar', label: 'Ikhtisar 4 KPI & Dual Visual', icon: LayoutDashboard },
                { id: 'keuangan', label: 'PNBP & Belanja (DS 2 & 12)', icon: CreditCard },
                { id: 'kunjungan', label: 'Kunjungan & Layanan Unggulan (DS 5 & 6)', icon: Users },
                { id: 'efisiensi', label: 'Efisiensi Barber Johnson (DS 9)', icon: Activity },
                { id: 'sewa', label: 'Sewa Ruangan Tenant (DS 14)', icon: Store },
                { id: 'penyakit_obat', label: 'Morbiditas & Resep Obat (DS 4 & 17)', icon: Pill },
                { id: 'satu_data', label: 'Katalog 18 Dataset (PDF Hal 19-21)', icon: Database },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = rsbpSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setRsbpSubTab(tab.id as any)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Bar RSBP */}
          <RumahSakitFilters
            filters={rsbpFilters}
            onFilterChange={(newF) => setRsbpFilters((p) => ({ ...p, ...newF }))}
            onResetFilters={() =>
              setRsbpFilters({
                tahun: 2026,
                periodeBulan: 'ALL',
                bagianLayanan: 'ALL',
                caraBayar: 'ALL',
                statusTenant: 'ALL',
              })
            }
          />

          {/* Top 4 Core KPI Row of RSBP */}
          <RumahSakitKpiRow
            realisasiPnbpMiliar={RS_KEUANGAN_SUMMARY.totalRealisasiPnbpMiliar}
            targetPnbpMiliar={RS_KEUANGAN_SUMMARY.totalTargetPnbpMiliar}
            realisasiBelanjaMiliar={RS_KEUANGAN_SUMMARY.totalRealisasiBelanjaMiliar}
            paguBelanjaMiliar={RS_KEUANGAN_SUMMARY.totalPaguBelanjaMiliar}
            nilaiIkm={RS_IKM_TOTAL}
            totalKunjunganPasien={RS_KUNJUNGAN_TOTAL}
            nilaiBor={74.2}
            jumlahTenant={RS_TENANT_SEWA.length}
            onExplainKpi={onOpenFormulaModal}
          />

          {/* Dynamic Content Views based on rsbpSubTab */}
          {rsbpSubTab === 'ikhtisar' && (
            <div className="space-y-4">
              {/* Primary Dual Analytical Grid: Kunjungan & Efisiensi Barber Johnson */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RumahSakitKunjunganLayananCard onOpenFormulaModal={onOpenFormulaModal} />
                <RumahSakitEfisiensiCard onOpenFormulaModal={onOpenFormulaModal} />
              </div>

              {/* Secondary Analytical Grid: Sewa Ruangan Tenant Komersial */}
              <RumahSakitSewaTenantCard onOpenFormulaModal={onOpenFormulaModal} />
            </div>
          )}

          {rsbpSubTab === 'keuangan' && (
            <div className="space-y-4">
              <RumahSakitPnbpBelanjaCard onOpenFormulaModal={onOpenFormulaModal} />
            </div>
          )}

          {rsbpSubTab === 'kunjungan' && (
            <div className="space-y-4">
              <RumahSakitKunjunganLayananCard onOpenFormulaModal={onOpenFormulaModal} />
            </div>
          )}

          {rsbpSubTab === 'efisiensi' && (
            <div className="space-y-4">
              <RumahSakitEfisiensiCard onOpenFormulaModal={onOpenFormulaModal} />
            </div>
          )}

          {rsbpSubTab === 'sewa' && (
            <div className="space-y-4">
              <RumahSakitSewaTenantCard onOpenFormulaModal={onOpenFormulaModal} />
            </div>
          )}

          {rsbpSubTab === 'penyakit_obat' && (
            <div className="space-y-4">
              <RumahSakitMorbiditasObatCard onOpenFormulaModal={onOpenFormulaModal} />
            </div>
          )}

          {rsbpSubTab === 'satu_data' && (
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Database className="w-4 h-4 text-rose-600" />
                    <span>KATALOG 18 ATRIBUT SATU DATA RESMI BADAN USAHA RUMAH SAKIT (HAL. 19 - 21)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Daftar seluruh dataset terstandar RSBP Batam untuk integrasi data pimpinan &amp; DIPA
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={datasetSearch}
                    onChange={(e) => setDatasetSearch(e.target.value)}
                    placeholder="Cari dataset RSBP..."
                    className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] font-mono">
                    <tr>
                      <th className="py-2.5 px-3">No</th>
                      <th className="py-2.5 px-3">Buku Satu Data</th>
                      <th className="py-2.5 px-3">Nama Dataset Resmi</th>
                      <th className="py-2.5 px-3">Periode</th>
                      <th className="py-2.5 px-3">Sifat Data</th>
                      <th className="py-2.5 px-3">Kunci Atribut Kolom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeProfile.datasetAtributSatuData
                      .filter(
                        (ds) =>
                          ds.namaData.toLowerCase().includes(datasetSearch.toLowerCase()) ||
                          ds.kunciAtribut.some((k) =>
                            k.toLowerCase().includes(datasetSearch.toLowerCase())
                          )
                      )
                      .map((ds) => (
                        <tr key={ds.no} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-500">
                            #{ds.no}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[11px] text-rose-700 font-semibold">
                            Hal 19 - 21
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">
                            {ds.namaData}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                            {ds.periode}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                ds.sifatData === 'Terbuka'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : ds.sifatData === 'Terbatas'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {ds.sifatData}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex flex-wrap gap-1 max-w-md">
                              {ds.kunciAtribut.map((a, i) => (
                                <span
                                  key={i}
                                  className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono"
                                >
                                  {a}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. UNIT CONTENT: DIREKTORAT PENGAMANAN ASET DAN KAWASAN */}
      {selectedUnitId === 'dit-pam-aset' && (
        <div className="p-4 sm:p-5 space-y-4 bg-slate-50/60 font-sans text-slate-800">
          {/* Top Directorate Banner & Executive Action Bar - Clean Plain White Theme */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Shield className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Direktorat Pengamanan Aset dan Kawasan (Ditpam BP Batam)
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                      KODE: DPAMP
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                      SATU DATA HAL. 17 - 19 (12 DATASET)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-4xl leading-relaxed">
                    Pemantauan terpadu komando operasional Ditpam BP Batam: penertiban bangunan liar, kekuatan personil, pengamanan 7 objek vital kritis &amp; hutan lindung, penindakan kawasan aset, rekap penanganan unjuk rasa, serta respon cepat mitigasi bencana alam.
                  </p>
                </div>
              </div>

              {/* Quick Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenFormulaModal && onOpenFormulaModal('kpi_bangunan_liar')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                  title="Kamus Rumus & Formula Tableau Desktop"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-sky-700" />
                  <span>Kamus Rumus &amp; Tableau</span>
                </button>

                {onNavigateToFullDashboard && (
                  <button
                    onClick={() => onNavigateToFullDashboard('dit-pengamanan-aset')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    title="Pindah ke Dashboard Penuh Ditpam"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-sky-300" />
                    <span>Buka Dashboard Penuh Ditpam</span>
                  </button>
                )}
              </div>
            </div>

            {/* Navigation Tabs for Executive View Switch */}
            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100 overflow-x-auto text-xs">
              <button
                onClick={() => setDitpamSubTab('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 ${
                  ditpamSubTab === 'all'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Semua Modul (Executive Command)
              </button>
              <button
                onClick={() => setDitpamSubTab('monitoring')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  ditpamSubTab === 'monitoring'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Kesiapsiagaan &amp; Penindakan Kawasan Hutan</span>
              </button>
              <button
                onClick={() => setDitpamSubTab('unjuk_rasa')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  ditpamSubTab === 'unjuk_rasa'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Rekap Pengamanan Unjuk Rasa (Poin 5 • Dataset #7)</span>
              </button>
              <button
                onClick={() => setDitpamSubTab('bencana_alam')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  ditpamSubTab === 'bencana_alam'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Rekap Bencana Alam &amp; Rescue (Poin 6 • Dataset #6)</span>
              </button>
              <button
                onClick={() => setDitpamSubTab('penertiban')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  ditpamSubTab === 'penertiban'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Rekap Penertiban Rutin (Poin 7 • Dataset #9)</span>
              </button>
              <button
                onClick={() => setDitpamSubTab('satu_data')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  ditpamSubTab === 'satu_data'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Katalog 12 Dataset (Hal. 17 - 19)</span>
              </button>
            </div>
          </div>

          {/* Interactive Global Filters Bar (Poin 9) */}
          <PengamananAsetFilters
            filters={ditpamFilters}
            onFilterChange={(newFilters) =>
              setDitpamFilters((prev) => ({ ...prev, ...newFilters }))
            }
            onResetFilters={() =>
              setDitpamFilters({
                tahun: 'ALL',
                semester: 'ALL',
                lokasiSektor: 'ALL',
                jenisObjek: 'ALL',
                searchQuery: '',
              })
            }
          />

          {/* 4 Main Executive BAN KPI Cards (Poin 1, 2, 3, 4) */}
          <PengamananAsetKpis
            onOpenFormulaModal={(kpiId) => onOpenFormulaModal && onOpenFormulaModal(kpiId)}
          />

          {/* Kesiapsiagaan & Penindakan Kawasan Lingkungan dan Hutan (Diletakkan Langsung Setelah KPI) */}
          {(ditpamSubTab === 'all' || ditpamSubTab === 'monitoring') && (
            <MonitoringPengamananAtasan filters={ditpamFilters} />
          )}

          {/* Section Content Rendering */}
          {(ditpamSubTab === 'all' || ditpamSubTab === 'unjuk_rasa') && (
            <RekapUnjukRasaCard filters={ditpamFilters} />
          )}

          {(ditpamSubTab === 'all' || ditpamSubTab === 'bencana_alam') && (
            <RekapBencanaAlamCard filters={ditpamFilters} />
          )}

          {(ditpamSubTab === 'all' || ditpamSubTab === 'penertiban') && (
            <RekapPenertibanCard filters={ditpamFilters} />
          )}

          {/* Katalog 12 Dataset Atribut Satu Data Ditpam */}
          {ditpamSubTab === 'satu_data' && (
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Database className="w-4 h-4 text-sky-600" />
                    <span>KATALOG 12 ATRIBUT SATU DATA RESMI DITPAM (HAL. 17 - 19)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Daftar seluruh dataset terstandar Direktorat Pengamanan Aset dan Kawasan BP Batam
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={ditpamSearch}
                    onChange={(e) => setDitpamSearch(e.target.value)}
                    placeholder="Cari dataset Ditpam..."
                    className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] font-mono">
                    <tr>
                      <th className="py-2.5 px-3">No</th>
                      <th className="py-2.5 px-3">Buku Satu Data</th>
                      <th className="py-2.5 px-3">Nama Dataset Resmi</th>
                      <th className="py-2.5 px-3">Periode</th>
                      <th className="py-2.5 px-3">Sifat Data</th>
                      <th className="py-2.5 px-3">Kunci Atribut Kolom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeProfile.datasetAtributSatuData
                      .filter(
                        (ds) =>
                          ds.namaData.toLowerCase().includes(ditpamSearch.toLowerCase()) ||
                          ds.kunciAtribut.some((k) =>
                            k.toLowerCase().includes(ditpamSearch.toLowerCase())
                          )
                      )
                      .map((ds) => (
                        <tr key={ds.no} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-500">
                            #{ds.no}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[11px] text-sky-700 font-semibold">
                            Hal 17 - 19
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">
                            {ds.namaData}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                            {ds.periode}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                ds.sifatData === 'Terbuka'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : ds.sifatData === 'Terbatas'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {ds.sifatData}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex flex-wrap gap-1 max-w-md">
                              {ds.kunciAtribut.map((a, i) => (
                                <span
                                  key={i}
                                  className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono"
                                >
                                  {a}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. UNIT CONTENT: BADAN USAHA SPAM, FASILITAS DAN LINGKUNGAN */}
      {selectedUnitId === 'bu-spam-fasling' && (
        <div className="p-4 sm:p-5 space-y-4 bg-slate-50/60">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0 shadow-2xs">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800 font-mono">
                      KODE: BUSPAM
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Badan Usaha SPAM, Fasilitas dan Lingkungan (BU SPAM Fasling)
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                      SATU DATA HAL. 28 - 37 (91 DATASET)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
                    Penyelenggara ketahanan air baku (6 waduk utama), instalasi pengolahan WTP 3.420 L/dtk, 23 District Meter Zone (DMZ), pengelolaan limbah industri B3 KPLI Kabil, dan 32 twin block rusunawa pekerja.
                  </p>
                </div>
              </div>
            </div>

            {/* Sub Tabs BU SPAM */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {[
                { id: 'ikhtisar', label: 'Ikhtisar Operasional SPAM & Fasling', icon: LayoutDashboard },
                { id: 'waduk_wtp', label: 'Kapasitas 6 Waduk & WTP Air Curah', icon: Droplets },
                { id: 'dmz_nrw', label: '23 DMZ & Pengendalian NRW Air', icon: Activity },
                { id: 'kpli_b3', label: 'Pengelolaan Limbah Industri B3 KPLI', icon: Flame },
                { id: 'rusunawa', label: '32 Twin Block Rusunawa Pekerja', icon: Building2 },
                { id: 'satu_data', label: 'Katalog 91 Dataset (Hal 28-37)', icon: Database },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = spamSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSpamSubTab(tab.id as any)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SPAM Fasling Core 4 Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                KAPASITAS WTP AKTIF
              </span>
              <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">
                3.420 L/dtk
              </span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                <ArrowUpRight className="w-3 h-3" /> +200 L/dtk Mukakuning
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                TINGKAT KEHILANGAN AIR (NRW)
              </span>
              <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">
                24.8%
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Target RPJMN 2026: &lt; 25%
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                LIMBAH B3 KPLI KABIL
              </span>
              <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">
                14.850 Ton
              </span>
              <span className="text-[10px] text-cyan-600 font-bold">
                100% Sesuai AMDAL Terpadu
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                OKUPANSI RUSUNAWA
              </span>
              <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">
                91.5%
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">
                32 Twin Block Beroperasi
              </span>
            </div>
          </div>

          {/* SPAM Fasling Operational Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                <span>MONITORING 6 WADUK &amp; ELEVASI AIR BAKU BATAM</span>
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { waduk: 'Waduk Duriangkang', vol: '101,2 Juta M3', elevasi: '+0.18 m (Normal)', wtp: '2.200 L/s' },
                  { waduk: 'Waduk Mukakuning', vol: '13,1 Juta M3', elevasi: '+0.05 m (Normal)', wtp: '600 L/s' },
                  { waduk: 'Waduk Sei Harapan', vol: '3,8 Juta M3', elevasi: '-0.12 m (Waspada)', wtp: '210 L/s' },
                  { waduk: 'Waduk Sei Ladi', vol: '9,4 Juta M3', elevasi: '+0.10 m (Normal)', wtp: '240 L/s' },
                  { waduk: 'Waduk Nongsa', vol: '0,7 Juta M3', elevasi: '+0.02 m (Normal)', wtp: '60 L/s' },
                  { waduk: 'Waduk Tembesi', vol: '56,0 Juta M3', elevasi: 'Desalinasi Siap', wtp: 'Cadangan' },
                ].map((w, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">{w.waduk}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Daya Tampung: {w.vol} | Kapasitas: {w.wtp}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                      {w.elevasi}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-600" />
                <span>SEBARAN 32 TWIN BLOCK RUSUNAWA PEKERJA BP BATAM</span>
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { lokasi: 'Rusunawa Mukakuning (1-10)', kamar: '960 Unit', okupansi: '94.2%', pekerja: 'Pekerja Industri Mukakuning' },
                  { lokasi: 'Rusunawa Batu Ampar (1-6)', kamar: '576 Unit', okupansi: '91.0%', pekerja: 'Tenaga Kerja Pelabuhan & Shipyard' },
                  { lokasi: 'Rusunawa Sekupang (1-8)', kamar: '768 Unit', okupansi: '88.5%', pekerja: 'Karyawan Medis & Penunjang KEK' },
                  { lokasi: 'Rusunawa Kabil (1-8)', kamar: '768 Unit', okupansi: '92.3%', pekerja: 'Pekerja Kawasan Industri Kabil & KPLI' },
                ].map((r, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">{r.lokasi}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{r.kamar} | {r.pekerja}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {r.okupansi}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SPAM Satu Data Table */}
          {spamSubTab === 'satu_data' && (
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-600" />
                <span>KATALOG 91 ATRIBUT SATU DATA RESMI BU SPAM FASLING (HAL. 28 - 37)</span>
              </h4>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] font-mono">
                    <tr>
                      <th className="py-2.5 px-3">No</th>
                      <th className="py-2.5 px-3">Buku Satu Data</th>
                      <th className="py-2.5 px-3">Nama Dataset Resmi</th>
                      <th className="py-2.5 px-3">Periode</th>
                      <th className="py-2.5 px-3">Sifat Data</th>
                      <th className="py-2.5 px-3">Kunci Atribut Kolom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeProfile.datasetAtributSatuData.map((ds) => (
                      <tr key={ds.no} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-500">
                          #{ds.no}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-cyan-700 font-semibold">
                          Hal 28 - 37
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">
                          {ds.namaData}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                          {ds.periode}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                            {ds.sifatData}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex flex-wrap gap-1 max-w-md">
                            {ds.kunciAtribut.map((a, i) => (
                              <span
                                key={i}
                                className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
