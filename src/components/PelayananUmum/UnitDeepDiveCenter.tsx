import React, { useState } from 'react';
import {
  Stethoscope,
  Droplets,
  Shield,
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
  BarChart3,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

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

// SPAM Dataset Visualizations Data
const SPAM_WTP_CAPACITY_DATA = [
  { wtp: 'Duriangkang', kapasitas: 2200, produksi: 2120, utilisasi: 96.4, color: '#0284C7' },
  { wtp: 'Mukakuning', kapasitas: 600, produksi: 580, utilisasi: 96.7, color: '#0EA5E9' },
  { wtp: 'Sei Ladi', kapasitas: 240, produksi: 230, utilisasi: 95.8, color: '#38BDF8' },
  { wtp: 'Sei Harapan', kapasitas: 210, produksi: 195, utilisasi: 92.9, color: '#06B6D4' },
  { wtp: 'Nongsa', kapasitas: 60, produksi: 55, utilisasi: 91.7, color: '#14B8A6' },
  { wtp: 'Tembesi', kapasitas: 350, produksi: 240, utilisasi: 68.6, color: '#10B981' },
];

const SPAM_REVENUE_PIE_DATA = [
  { name: 'Penjualan Air Bersih Curah (SPAM)', value: 92.4, persen: 64.8, color: '#0284C7' },
  { name: 'Pengolahan Limbah Industri B3 KPLI', value: 28.6, persen: 20.1, color: '#F59E0B' },
  { name: 'Sewa Rusunawa Pekerja (32 TB)', value: 14.2, persen: 10.0, color: '#10B981' },
  { name: 'Aset Komersial & Taman Rusa', value: 7.3, persen: 5.1, color: '#6366F1' },
];

const SPAM_WADUK_DATA = [
  { nama: 'Waduk Duriangkang', dayaTampung: 101.2, luasHa: 1260, elevasi: '+0.18 m', status: 'Normal / Prima', ketahanan: '14 Bulan', debitWtp: '2.200 L/s' },
  { nama: 'Waduk Mukakuning', dayaTampung: 13.1, luasHa: 230, elevasi: '+0.05 m', status: 'Normal / Prima', ketahanan: '11 Bulan', debitWtp: '600 L/s' },
  { nama: 'Waduk Sei Ladi', dayaTampung: 9.4, luasHa: 190, elevasi: '+0.10 m', status: 'Normal / Prima', ketahanan: '12 Bulan', debitWtp: '240 L/s' },
  { nama: 'Waduk Sei Harapan', dayaTampung: 3.8, luasHa: 95, elevasi: '-0.12 m', status: 'Waspada Sedimen', ketahanan: '8 Bulan', debitWtp: '210 L/s' },
  { nama: 'Waduk Nongsa', dayaTampung: 0.7, luasHa: 35, elevasi: '+0.02 m', status: 'Normal', ketahanan: '9 Bulan', debitWtp: '60 L/s' },
  { nama: 'Waduk Tembesi', dayaTampung: 56.0, luasHa: 850, elevasi: 'Desalinasi Siap', status: 'Estuari Siap Operasi', ketahanan: '16 Bulan', debitWtp: '350 L/s' },
];

const SPAM_DMZ_DATA = [
  { dmz: 'DMZ 01 Batu Ampar', pelanggan: 24500, tekanan: '1.45 bar', nrw: '26.4%', status: 'Peremajaan Pipa' },
  { dmz: 'DMZ 04 Sekupang', pelanggan: 18200, tekanan: '1.50 bar', nrw: '22.1%', status: 'Optimal' },
  { dmz: 'DMZ 07 Batam Centre', pelanggan: 41300, tekanan: '1.55 bar', nrw: '23.8%', status: 'Optimal' },
  { dmz: 'DMZ 11 Nagoya - Jodoh', pelanggan: 31800, tekanan: '1.40 bar', nrw: '27.2%', status: 'Pemantauan Sensor' },
  { dmz: 'DMZ 16 Kabil Industri', pelanggan: 14200, tekanan: '1.65 bar', nrw: '19.4%', status: 'Sangat Baik' },
  { dmz: 'DMZ 21 Mukakuning KEK', pelanggan: 16800, tekanan: '1.60 bar', nrw: '21.0%', status: 'Sangat Baik' },
];

const SPAM_RUSUN_DATA = [
  { lokasi: 'Rusunawa Mukakuning (Blok 1 - 10)', unit: 960, terisi: 904, okupansi: 94.2, pnbpBulan: 'Rp 412 Juta', pekerja: 'Kawasan Industri Batamindo' },
  { lokasi: 'Rusunawa Batu Ampar (Blok 1 - 6)', unit: 576, terisi: 524, okupansi: 91.0, pnbpBulan: 'Rp 238 Juta', pekerja: 'Pelabuhan & Galangan Kapal' },
  { lokasi: 'Rusunawa Sekupang (Blok 1 - 8)', unit: 768, terisi: 680, okupansi: 88.5, pnbpBulan: 'Rp 305 Juta', pekerja: 'Tenaga Medis RSBP & KEK' },
  { lokasi: 'Rusunawa Kabil (Blok 1 - 8)', unit: 768, terisi: 709, okupansi: 92.3, pnbpBulan: 'Rp 320 Juta', pekerja: 'Industri Kabil & KPLI B3' },
];

export const UnitDeepDiveCenter: React.FC<UnitDeepDiveCenterProps> = ({
  selectedUnitId,
  onSelectUnit,
  onNavigateToFullDashboard,
  onOpenFormulaModal,
}) => {
  // Normalize unit ID (Badan Usaha focus)
  const normalizedUnitId =
    selectedUnitId === 'bu-rumah-sakit' || selectedUnitId === 'rsbp'
      ? 'bu-rumah-sakit'
      : selectedUnitId === 'dit-pam-aset' || selectedUnitId === 'ditpam'
      ? 'dit-pam-aset'
      : 'bu-spam-fasling';

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

  const [spamSearch, setSpamSearch] = useState('');

  const activeProfile =
    DEEP_DIVE_PROFILES[normalizedUnitId] || DEEP_DIVE_PROFILES['bu-rumah-sakit'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-5 font-sans">
      {/* 1. Header with Tab Switcher (PERSIS FORMAT DEP-A3) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#002B49] to-[#1F3864] text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                EXECUTIVE DEEP-DIVE
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Buku Satu Data BP Batam
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Unit Deep-Dive Center: Badan Usaha Rumah Sakit &amp; SPAM Fasling
            </h3>
          </div>
        </div>

        {/* Badan Usaha Selection Tabs (Rumah Sakit & SPAM sebagai Badan Usaha Utama DEP-A6) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectUnit('bu-rumah-sakit')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'bu-rumah-sakit'
                ? 'bg-white text-rose-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-rose-600" />
            <span>BU Rumah Sakit (18 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('bu-spam-fasling')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'bu-spam-fasling'
                ? 'bg-white text-cyan-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplets className="w-4 h-4 text-cyan-600" />
            <span>BU SPAM, Fasilitas &amp; Lingkungan (91 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-pam-aset')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              normalizedUnitId === 'dit-pam-aset'
                ? 'bg-white text-amber-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>Dit. Pengamanan Aset (12 DS)</span>
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC WORKSPACE PER SELECTED UNIT */}

      {/* ========================================================================= */}
      {/* UNIT 1: BADAN USAHA RUMAH SAKIT (18 DATASET - HALAMAN 19-21)               */}
      {/* ========================================================================= */}
      {normalizedUnitId === 'bu-rumah-sakit' && (
        <div className="space-y-4">
          {/* Sub-banner status */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-rose-50/70 rounded-xl border border-rose-200/70">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span className="font-bold text-slate-800">
                Badan Usaha Rumah Sakit BP Batam (RSBP Sekupang - Halaman 19-21 Buku Satu Data)
              </span>
              <span className="text-slate-500 hidden sm:inline">
                • Rawat Inap BOR 76,2%, ALOS 4,2 Hari, Resep Generik 86,4%, &amp; 18 Dataset Terverifikasi
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-600 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Target Pertumbuhan: 1,1% • Realisasi Pertumbuhan: +4,55% (Melampaui Target)</span>
            </div>
          </div>

          {/* Sub-navigation tabs within RSBP */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'ikhtisar', label: 'Ikhtisar 4 KPI & Dual Visual', icon: LayoutDashboard },
                { id: 'keuangan', label: 'PNBP & Belanja (DS 2 & 12)', icon: CreditCard },
                { id: 'kunjungan', label: 'Kunjungan & Layanan Unggulan (DS 5 & 6)', icon: Users },
                { id: 'efisiensi', label: 'Efisiensi Barber Johnson (DS 9)', icon: Activity },
                { id: 'sewa', label: 'Sewa Ruangan Tenant (DS 14)', icon: Store },
                { id: 'penyakit_obat', label: 'Morbiditas & Resep Obat (DS 4 & 17)', icon: Pill },
                { id: 'satu_data', label: 'Katalog 18 Dataset (Hal 19-21)', icon: Database },
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

            {onNavigateToFullDashboard && (
              <button
                onClick={() => onNavigateToFullDashboard('bu-rumah-sakit')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
                <span>Dashboard Penuh RSBP</span>
              </button>
            )}
          </div>

          {/* Filters RSBP */}
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

          {/* Dynamic Content RSBP */}
          {rsbpSubTab === 'ikhtisar' && (
            <div className="space-y-4">
              <RumahSakitKpiRow filters={rsbpFilters} onOpenFormulaModal={onOpenFormulaModal} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RumahSakitPnbpBelanjaCard onOpenFormulaModal={onOpenFormulaModal} />
                <RumahSakitKunjunganLayananCard onOpenFormulaModal={onOpenFormulaModal} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RumahSakitEfisiensiCard onOpenFormulaModal={onOpenFormulaModal} />
                <RumahSakitSewaTenantCard onOpenFormulaModal={onOpenFormulaModal} />
              </div>
            </div>
          )}

          {rsbpSubTab === 'keuangan' && <RumahSakitPnbpBelanjaCard onOpenFormulaModal={onOpenFormulaModal} />}
          {rsbpSubTab === 'kunjungan' && <RumahSakitKunjunganLayananCard onOpenFormulaModal={onOpenFormulaModal} />}
          {rsbpSubTab === 'efisiensi' && <RumahSakitEfisiensiCard onOpenFormulaModal={onOpenFormulaModal} />}
          {rsbpSubTab === 'sewa' && <RumahSakitSewaTenantCard onOpenFormulaModal={onOpenFormulaModal} />}
          {rsbpSubTab === 'penyakit_obat' && <RumahSakitMorbiditasObatCard onOpenFormulaModal={onOpenFormulaModal} />}

          {rsbpSubTab === 'satu_data' && (
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Database className="w-4 h-4 text-rose-600" />
                <span>KATALOG 18 ATRIBUT SATU DATA RESMI RSBP BATAM (HAL. 19 - 21)</span>
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
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-500">#{ds.no}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-rose-700 font-semibold">Hal 19 - 21</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{ds.namaData}</td>
                        <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{ds.periode}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            {ds.sifatData}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex flex-wrap gap-1 max-w-md">
                            {ds.kunciAtribut.map((a, i) => (
                              <span key={i} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono">
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

      {/* ========================================================================= */}
      {/* UNIT 2: BADAN USAHA SPAM, FASILITAS DAN LINGKUNGAN (91 DATASET - HAL 28-37) */}
      {/* ========================================================================= */}
      {normalizedUnitId === 'bu-spam-fasling' && (
        <div className="space-y-4">
          {/* Sub-banner status */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-cyan-50/70 rounded-xl border border-cyan-200/70">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
              <span className="font-bold text-slate-800">
                Badan Usaha SPAM, Fasilitas dan Lingkungan (Halaman 28-37 Buku Satu Data)
              </span>
              <span className="text-slate-500 hidden sm:inline">
                • 6 Waduk Air Baku, WTP 3.420 L/dtk, 23 DMZ Sensor, Limbah B3 KPLI Sambau &amp; 32 Rusunawa
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-600 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Target Pertumbuhan: 1,1% • Realisasi Pertumbuhan: +2,37% • PNBP: Rp 142,5 M (109,6%)</span>
            </div>
          </div>

          {/* Sub-navigation tabs within SPAM */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'ikhtisar', label: 'Ikhtisar Operasional SPAM & Fasling', icon: LayoutDashboard },
                { id: 'waduk_wtp', label: 'Kapasitas 6 Waduk & WTP Air Curah (DS 1, 2, 37)', icon: Droplets },
                { id: 'dmz_nrw', label: '23 DMZ & Pengendalian NRW Air (DS 6, 41, 70)', icon: Activity },
                { id: 'kpli_b3', label: 'Pengelolaan Limbah Industri B3 KPLI (DS 11-13)', icon: Flame },
                { id: 'rusunawa', label: '32 Twin Block Rusunawa Pekerja (DS 25)', icon: Building2 },
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

          {/* 4 Primary BAN Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                KAPASITAS WTP AKTIF
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-0.5 block">
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
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-0.5 block">
                24,8%
              </span>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">
                Terkendali di 23 DMZ (&lt;25%)
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                LIMBAH B3 TEROLAH KPLI
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-0.5 block">
                14.850 Ton
              </span>
              <span className="text-[10px] text-cyan-700 font-bold">
                100% Sesuai AMDAL Terpadu
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                OKUPANSI RUSUNAWA
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-0.5 block">
                91,5%
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">
                32 Twin Block (3.840 Unit)
              </span>
            </div>
          </div>

          {/* TAB 1: IKHTISAR DUAL VISUALISASI UTAMA (BAR CHART & DONUT CHART) */}
          {spamSubTab === 'ikhtisar' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Visual 1: Bar Chart Kapasitas vs Produksi WTP */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-cyan-600" />
                        <span>KAPASITAS VS PRODUKSI 6 WTP / IPA (LITER / DETIK)</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Evaluasi utilisasi suplai air bersih instalasi pengolahan waduk utama Batam
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded border border-cyan-200">
                      Total 3.420 L/s
                    </span>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={SPAM_WTP_CAPACITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="wtp" tick={{ fontSize: 10, fill: '#64748B' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                        <RechartsTooltip
                          formatter={(value: any, name: any) => [
                            `${Number(value).toLocaleString('id-ID')} L/dtk`,
                            name === 'kapasitas' ? 'Kapasitas Desain' : 'Realisasi Produksi',
                          ]}
                          contentStyle={{ backgroundColor: '#0F1E36', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                        <Bar dataKey="kapasitas" name="Kapasitas Desain" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="produksi" name="Realisasi Produksi" fill="#0284C7" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Visual 2: Donut Chart Komposisi Pendapatan PNBP BU SPAM Fasling */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <PieChartIcon className="w-4 h-4 text-cyan-600" />
                        <span>KOMPOSISI REALISASI PNBP BU SPAM FASLING (RP 142,5 M)</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Distribusi sumber pendapatan: Air Curah, Limbah B3, Rusunawa &amp; Aset Komersial
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                      109,6% Target
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-48 h-48 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={SPAM_REVENUE_PIE_DATA}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={75}
                            paddingAngle={2}
                          >
                            {SPAM_REVENUE_PIE_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            formatter={(val: any) => [`Rp ${val} Miliar`, 'Nilai PNBP']}
                            contentStyle={{ backgroundColor: '#0F1E36', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex-1 space-y-2 text-xs w-full">
                      {SPAM_REVENUE_PIE_DATA.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="truncate text-slate-700 font-medium">{item.name}</span>
                          </div>
                          <div className="text-right shrink-0 font-mono font-bold text-slate-900">
                            Rp {item.value} M <span className="text-slate-400 font-normal">({item.persen}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rincian Operasional 6 Waduk & Rusunawa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-600" />
                    <span>MONITORING ELEVASI AIR BAKU 6 WADUK STRATEGIS (DS 37)</span>
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {SPAM_WADUK_DATA.slice(0, 4).map((w, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-800 block">{w.nama}</span>
                          <span className="text-[10px] text-slate-400 font-mono">Daya Tampung: {w.dayaTampung} Jt M3 | {w.debitWtp}</span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                          {w.elevasi} • {w.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-600" />
                    <span>SEBARAN 32 TWIN BLOCK RUSUNAWA PEKERJA BP BATAM (DS 25)</span>
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {SPAM_RUSUN_DATA.map((r, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-800 block">{r.lokasi}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{r.unit} Unit | {r.pekerja}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {r.okupansi}% Okupansi
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KAPASITAS 6 WADUK & WTP AIR CURAH */}
          {spamSubTab === 'waduk_wtp' && (
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-600" />
                    <span>REKAPITULASI KAPASITAS 6 WADUK &amp; ELEVASI AIR BAKU BATAM (DS 1, 2, 37)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Data daya tampung air, luas genangan, muka air normal, dan ketahanan pasokan air baku Batam
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-cyan-50 text-cyan-700 px-2 py-1 rounded border border-cyan-200">
                  Total Daya Tampung: 184 Juta M3
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] font-mono">
                    <tr>
                      <th className="py-2.5 px-3">Nama Waduk</th>
                      <th className="py-2.5 px-3 text-right">Daya Tampung</th>
                      <th className="py-2.5 px-3 text-right">Luas Genangan</th>
                      <th className="py-2.5 px-3 text-right">Debit WTP</th>
                      <th className="py-2.5 px-3">Elevasi Muka Air</th>
                      <th className="py-2.5 px-3">Ketahanan Suplai</th>
                      <th className="py-2.5 px-3">Status Operasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {SPAM_WADUK_DATA.map((w, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-800">{w.nama}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-cyan-700 text-right">{w.dayaTampung} Juta M³</td>
                        <td className="py-2.5 px-3 font-mono text-slate-600 text-right">{w.luasHa} Ha</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-900 text-right">{w.debitWtp}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-700">{w.elevasi}</td>
                        <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold">{w.ketahanan}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            w.status.includes('Normal') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {w.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: 23 DMZ & PENGENDALIAN NRW AIR */}
          {spamSubTab === 'dmz_nrw' && (
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-600" />
                    <span>PEMANTAUAN 23 DISTRICT METER ZONE (DMZ) &amp; TINGKAT KEHILANGAN AIR (NRW)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Sistem pemantauan SCADA debit pipa, tekanan bar, dan penurunan kebocoran air per wilayah distribusi
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-200">
                  Rata-rata NRW: 24,8% (Target &lt;25%)
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] font-mono">
                    <tr>
                      <th className="py-2.5 px-3">Wilayah DMZ</th>
                      <th className="py-2.5 px-3 text-right">Jumlah Pelanggan</th>
                      <th className="py-2.5 px-3 text-right">Rata-rata Tekanan</th>
                      <th className="py-2.5 px-3 text-right">Tingkat NRW</th>
                      <th className="py-2.5 px-3">Tindakan Mitigasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {SPAM_DMZ_DATA.map((d, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-800">{d.dmz}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-700 text-right">{d.pelanggan.toLocaleString('id-ID')}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-cyan-700 text-right">{d.tekanan}</td>
                        <td className="py-2.5 px-3 font-mono font-black text-right text-slate-900">{d.nrw}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            d.status.includes('Sangat Baik') || d.status.includes('Optimal') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: PENGELOLAAN LIMBAH INDUSTRI B3 KPLI */}
          {spamSubTab === 'kpli_b3' && (
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-600" />
                    <span>KAWASAN PENGELOLAAN LIMBAH INDUSTRI (KPLI) B3 SAMBAU - KABIL</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Pusat penampungan dan pengolahan limbah industri bahan berbahaya &amp; beracun berstandar lingkungan
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-200">
                  Total Terolah: 14.850 Ton B3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">TENANT INDUSTRI AKTIF</span>
                  <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">42 Perusahaan</span>
                  <span className="text-[10px] text-slate-500">Manufaktur, Galangan Kapal &amp; Fabrikasi</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">KONTRIBUSI PNBP LIMBAH B3</span>
                  <span className="text-xl font-black text-emerald-700 font-mono mt-0.5 block">Rp 28,6 Miliar</span>
                  <span className="text-[10px] text-emerald-600 font-bold">100% Retribusi Resmi BLU</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">UJI LABORATORIUM AKREDITASI</span>
                  <span className="text-xl font-black text-cyan-700 font-mono mt-0.5 block">1.450 Sampel</span>
                  <span className="text-[10px] text-slate-500">Terakreditasi KAN LP-624-IDN</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: 32 TWIN BLOCK RUSUNAWA PEKERJA */}
          {spamSubTab === 'rusunawa' && (
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-600" />
                    <span>PEMANFAATAN 32 TWIN BLOCK RUSUNAWA PEKERJA BP BATAM (DS 25)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Penyediaan hunian layak dan terjangkau bagi tenaga kerja kawasan industri Kota Batam
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-200">
                  Total Hunian: 3.840 Unit • Okupansi 91,5%
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] font-mono">
                    <tr>
                      <th className="py-2.5 px-3">Lokasi Rusunawa</th>
                      <th className="py-2.5 px-3 text-right">Total Unit</th>
                      <th className="py-2.5 px-3 text-right">Unit Terisi</th>
                      <th className="py-2.5 px-3 text-right">Okupansi</th>
                      <th className="py-2.5 px-3 text-right">PNBP / Bulan</th>
                      <th className="py-2.5 px-3">Profil Penghuni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {SPAM_RUSUN_DATA.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-800">{r.lokasi}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-700 text-right">{r.unit} Unit</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-900 text-right">{r.terisi} Unit</td>
                        <td className="py-2.5 px-3 font-mono font-black text-emerald-700 text-right">{r.okupansi}%</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-cyan-700 text-right">{r.pnbpBulan}</td>
                        <td className="py-2.5 px-3 text-slate-600 font-medium">{r.pekerja}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: KATALOG 91 DATASET SATU DATA SPAM */}
          {spamSubTab === 'satu_data' && (
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-600" />
                    <span>KATALOG 91 ATRIBUT SATU DATA RESMI BU SPAM FASLING (HAL. 28 - 37)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Daftar seluruh dataset terstandar Badan Usaha SPAM, Fasilitas dan Lingkungan BP Batam
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={spamSearch}
                    onChange={(e) => setSpamSearch(e.target.value)}
                    placeholder="Cari dataset SPAM..."
                    className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
                      .filter((ds) =>
                        ds.namaData.toLowerCase().includes(spamSearch.toLowerCase()) ||
                        ds.kunciAtribut.some((k) => k.toLowerCase().includes(spamSearch.toLowerCase()))
                      )
                      .map((ds) => (
                        <tr key={ds.no} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-500">#{ds.no}</td>
                          <td className="py-2.5 px-3 font-mono text-[11px] text-cyan-700 font-semibold">Hal 28 - 37</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">{ds.namaData}</td>
                          <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{ds.periode}</td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                              {ds.sifatData}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex flex-wrap gap-1 max-w-md">
                              {ds.kunciAtribut.map((a, i) => (
                                <span key={i} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono">
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

      {/* ========================================================================= */}
      {/* UNIT 3: DIREKTORAT PENGAMANAN ASET (12 DATASET)                            */}
      {/* ========================================================================= */}
      {normalizedUnitId === 'dit-pam-aset' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-amber-50/70 rounded-xl border border-amber-200/70">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              <span className="font-bold text-slate-800">
                Direktorat Pengamanan Aset dan Kawasan (Ditpam BP Batam - Halaman 17-19)
              </span>
              <span className="text-slate-500 hidden sm:inline">
                • 874 Bangli Ditertibkan, 480 Personel Khusus, 7 Obvit 100% Aman &amp; 12 Dataset Terverifikasi
              </span>
            </div>
          </div>

          <PengamananAsetFilters
            filters={ditpamFilters}
            onFilterChange={(newFilters) => setDitpamFilters((prev) => ({ ...prev, ...newFilters }))}
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

          <PengamananAsetKpis
            onOpenFormulaModal={(kpiId) => onOpenFormulaModal && onOpenFormulaModal(kpiId)}
          />

          <MonitoringPengamananAtasan filters={ditpamFilters} />
          <RekapPenertibanCard filters={ditpamFilters} />
          <RekapBencanaAlamCard filters={ditpamFilters} />
          <RekapUnjukRasaCard filters={ditpamFilters} />
        </div>
      )}
    </div>
  );
};
