import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Layers,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  Waves,
  Clock,
  AlertCircle,
  FileCheck2,
  FileText,
  DollarSign,
  Info,
  Building2,
  Anchor,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { LAHAN_KAWASAN_SUMMARY } from './pengelolaanLahanPesisirData';
import {
  ALOKASI_LAHAN_INVESTASI_DATA,
  TARGET_PENERIMAAN_PNBP_LAHAN,
  SWP_LAHAN_TERSEDIA_DATA,
} from '../PengelolaanLahan/lahanData';
import { KPI_PESISIR_REKLAMASI_DATA } from '../PesisirReklamasi/pesisirReklamasiData';
import {
  KPI_PENGAWASAN_DATA,
  KPI_EVALUASI_PEMBATALAN_DATA,
  KPI_PELAKSANAAN_DOKUMEN_DATA,
  KPI_REKOMENDASI_PEMBARUAN_DATA,
} from '../PengendalianLahan/pengendalianData';

interface ExecutiveUnifiedKpiCenterProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

type KpiCategory = 'all' | 'makro' | 'lahan' | 'pesisir' | 'pengendalian';

export const ExecutiveUnifiedKpiCenter: React.FC<ExecutiveUnifiedKpiCenterProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<KpiCategory>('all');

  const alokasi = ALOKASI_LAHAN_INVESTASI_DATA;
  const pnbp = TARGET_PENERIMAAN_PNBP_LAHAN;
  const pesisir = KPI_PESISIR_REKLAMASI_DATA;
  const kpiPengawasan = KPI_PENGAWASAN_DATA;
  const kpiEvaluasi = KPI_EVALUASI_PEMBATALAN_DATA;
  const kpiDokumen = KPI_PELAKSANAAN_DOKUMEN_DATA;
  const kpiRekomendasi = KPI_REKOMENDASI_PEMBARUAN_DATA;

  const totalSwpHa = SWP_LAHAN_TERSEDIA_DATA.reduce((sum, item) => sum + item.luasHa, 0);
  const totalSwpPersil = SWP_LAHAN_TERSEDIA_DATA.reduce((sum, item) => sum + item.jumlahPersil, 0);

  return (
    <div className="space-y-3 font-sans">
      {/* Category Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2 bg-slate-50/80 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 px-1">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 tracking-tight">
            Konsolidasi Seluruh Indikator Kinerja Utama (IKU / KPI) Deputi III
          </span>
          <span className="text-[10px] text-slate-500 font-mono hidden md:inline">
            (16 Metrik Terintegrasi)
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto text-[11px] no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Semua KPI (16)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('makro')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'makro'
                ? 'bg-blue-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
            }`}
          >
            Makro Wilayah (6)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('lahan')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'lahan'
                ? 'bg-indigo-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50'
            }`}
          >
            Pengelolaan Lahan (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('pesisir')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'pesisir'
                ? 'bg-cyan-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-cyan-700 hover:bg-cyan-50'
            }`}
          >
            Pesisir &amp; Reklamasi (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('pengendalian')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'pengendalian'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Pengendalian &amp; Pengawasan (4)
          </button>
        </div>
      </div>

      {/* CLUSTER 1: MAKRO KAWASAN & WILAYAH (6 INDIKATOR UTAMA) */}
      {(activeCategory === 'all' || activeCategory === 'makro') && (
        <div className="space-y-1.5">
          {activeCategory === 'all' && (
            <div className="flex items-center gap-1.5 px-1 pt-1">
              <span className="w-1.5 h-3.5 rounded-full bg-blue-600" />
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono">
                Portofolio Makro Kawasan &amp; Utilisasi Lahan
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* 1. Total Luas Lahan */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[9.5px] font-mono uppercase font-bold">TOTAL LUAS LAHAN</span>
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="text-lg sm:text-xl font-black font-mono text-slate-900">
                {LAHAN_KAWASAN_SUMMARY.totalLuasLahanHa.toLocaleString('id-ID')}{' '}
                <span className="text-xs font-semibold text-slate-500">Ha</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                Delineasi KPBPB Batam
              </span>
            </div>

            {/* 2. Lahan Tersedia */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[9.5px] font-mono uppercase font-bold">LAHAN TERSEDIA</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-lg sm:text-xl font-black font-mono text-emerald-600">
                {LAHAN_KAWASAN_SUMMARY.lahanTersediaHa.toLocaleString('id-ID')}{' '}
                <span className="text-xs font-semibold text-slate-500">Ha</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block truncate">
                22.2% Siap Alokasi
              </span>
            </div>

            {/* 3. Lahan Alokasi */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[9.5px] font-mono uppercase font-bold">LAHAN ALOKASI</span>
                <Layers className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div className="text-lg sm:text-xl font-black font-mono text-blue-700">
                {LAHAN_KAWASAN_SUMMARY.lahanAlokasiHa.toLocaleString('id-ID')}{' '}
                <span className="text-xs font-semibold text-slate-500">Ha</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                59.8% Hak SKPT Terbit
              </span>
            </div>

            {/* 4. Idle Land Ratio */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[9.5px] font-mono uppercase font-bold">IDLE LAND RATIO</span>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-lg sm:text-xl font-black font-mono text-amber-600">
                {LAHAN_KAWASAN_SUMMARY.idleLandRatio}%
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                Target Pengendalian &lt; 10%
              </span>
            </div>

            {/* 5. Utilisasi Kawasan */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[9.5px] font-mono uppercase font-bold">UTILISASI KAWASAN</span>
                <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div className="text-lg sm:text-xl font-black font-mono text-indigo-600">
                {LAHAN_KAWASAN_SUMMARY.utilisasiKawasanPersen}%
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                Target Optimal &gt; 80%
              </span>
            </div>

            {/* 6. Pengendalian / Isu */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[9.5px] font-mono uppercase font-bold">PENGENDALIAN / ISU</span>
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <div className="text-lg sm:text-xl font-black font-mono text-rose-600">
                {LAHAN_KAWASAN_SUMMARY.kasusAktifKonflik}{' '}
                <span className="text-xs font-semibold text-slate-500">Kasus</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block truncate">
                {LAHAN_KAWASAN_SUMMARY.kasusSelesaiKonflik} Kasus Tersolusi
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CLUSTER 2: DIREKTORAT PENGELOLAAN LAHAN (3 KPI) */}
      {(activeCategory === 'all' || activeCategory === 'lahan') && (
        <div className="space-y-1.5">
          {activeCategory === 'all' && (
            <div className="flex items-center gap-1.5 px-1 pt-1">
              <span className="w-1.5 h-3.5 rounded-full bg-indigo-600" />
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono">
                Kinerja Direktorat Pengelolaan Lahan
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* PNBP Lahan (DS #12) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      DATASET #12
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">UWT &amp; Faktur</span>
                  </div>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('lahan_pnbp')}
                      className="p-1 rounded text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                      title="Formula PNBP Lahan"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  Realisasi PNBP Pengelolaan Tanah
                </div>
                <div className="flex items-baseline gap-1.5 my-1">
                  <span className="text-xl font-bold font-mono text-emerald-700">
                    Rp {(pnbp.realisasiPnbpRp / 1000000000).toFixed(1)} M
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    {pnbp.capaianPersen.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>Target: Rp {(pnbp.targetPnbpRp / 1000000000).toFixed(0)} M</span>
                <span className="text-emerald-700 font-medium">SLA: {pnbp.rataRataSlaHari} Hari</span>
              </div>
            </div>

            {/* Alokasi Lahan Investasi (DS #14) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      DATASET #14
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Investasi</span>
                  </div>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('lahan_luas_alokasi')}
                      className="p-1 rounded text-slate-400 hover:text-sky-700 transition-colors cursor-pointer"
                      title="Formula Alokasi Investasi"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  Luas Lahan Dialokasikan Investasi
                </div>
                <div className="flex items-baseline gap-1.5 my-1">
                  <span className="text-xl font-bold font-mono text-slate-900">
                    {alokasi.totalLuasAlokasiHa.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs font-bold text-sky-700">Ha</span>
                  <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200">
                    {alokasi.permohonanDisetujui} SKPT
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>Nilai Investasi: <strong className="text-slate-800">Rp 34,85 T</strong></span>
                <span className="text-emerald-700 font-medium">81.3% ACC</span>
              </div>
            </div>

            {/* Lahan Tersedia SWP (DS #15) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      DATASET #15
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Kesiapan SWP</span>
                  </div>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('lahan_swp_tersedia')}
                      className="p-1 rounded text-slate-400 hover:text-indigo-700 transition-colors cursor-pointer"
                      title="Formula Lahan Tersedia SWP"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  Lahan Tersedia di 8 SWP Batam
                </div>
                <div className="flex items-baseline gap-1.5 my-1">
                  <span className="text-xl font-bold font-mono text-slate-900">
                    {totalSwpHa.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs font-bold text-indigo-700">Ha</span>
                  <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                    {totalSwpPersil} Persil
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>Siap Bangun: Industri &amp; Bisnis</span>
                <span className="text-emerald-700 font-medium">Tingkat Siap Tinggi</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CLUSTER 3: DIREKTORAT PENGELOLAAN KAWASAN PESISIR DAN REKLAMASI (4 KPI) */}
      {(activeCategory === 'all' || activeCategory === 'pesisir') && (
        <div className="space-y-1.5">
          {activeCategory === 'all' && (
            <div className="flex items-center gap-1.5 px-1 pt-1">
              <span className="w-1.5 h-3.5 rounded-full bg-cyan-600" />
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono">
                Kinerja Direktorat Pengelolaan Kawasan Pesisir &amp; Reklamasi
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Luas Izin Pesisir & Reklamasi (DS #4) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                      <Waves className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      DS #4
                    </span>
                  </div>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('kpi_luas_izin')}
                      className="p-1 rounded text-slate-400 hover:text-sky-700 transition-colors cursor-pointer"
                      title="Formula Luas Izin Pesisir"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  Luas Izin Pesisir &amp; Reklamasi
                </div>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-lg font-bold font-mono text-slate-900">
                    {pesisir.kpi1_luasIzinInvestasiHa.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs font-bold text-sky-700">Ha</span>
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>{pesisir.kpi1_totalIzinTerbit} PKKPRL</span>
                <span className="text-sky-700 font-medium">{pesisir.kpi1_rataRataLuasHa} Ha/Izin</span>
              </div>
            </div>

            {/* Izin Tepat Waktu (DS #3) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      DS #3
                    </span>
                  </div>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('kpi_tepat_waktu')}
                      className="p-1 rounded text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                      title="Formula Kepatuhan Tepat Waktu"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  Perizinan Selesai Tepat Waktu
                </div>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-lg font-bold font-mono text-emerald-700">
                    {pesisir.kpi2_persenTepatWaktu.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">SLA</span>
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>{pesisir.kpi2_totalTepatWaktu}/{pesisir.kpi2_totalPerizinanSelesai} Berkas</span>
                <span className="text-emerald-700 font-medium">{pesisir.kpi2_rataRataSlaHari} Hari</span>
              </div>
            </div>

            {/* Penyelesaian Isu Pesisir (DS #1) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                      <AlertCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      DS #1
                    </span>
                  </div>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('kpi_masalah')}
                      className="p-1 rounded text-slate-400 hover:text-amber-700 transition-colors cursor-pointer"
                      title="Formula Penyelesaian Masalah Pesisir"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  Penyelesaian Masalah Pesisir
                </div>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-lg font-bold font-mono text-amber-700">
                    {pesisir.kpi3_persenPenyelesaianMasalah.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-amber-800 font-medium">Tuntas</span>
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>{pesisir.kpi3_kasusSelesai}/{pesisir.kpi3_totalKasus} Kasus</span>
                <span className="text-slate-700 font-medium">{pesisir.kpi3_totalLuasTerdampakHa} Ha</span>
              </div>
            </div>

            {/* Rencana Spasial Pesisir (DS #2) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
                      <Anchor className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      DS #2
                    </span>
                  </div>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('kpi_spasial_rencana')}
                      className="p-1 rounded text-slate-400 hover:text-indigo-700 transition-colors cursor-pointer"
                      title="Formula Rencana Spasial Pesisir"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  Rencana Spasial Ruang Laut
                </div>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-lg font-bold font-mono text-slate-900">
                    {pesisir.kpi4_totalRencanaLuasHa.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs font-bold text-indigo-700">Ha</span>
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>{pesisir.kpi4_totalRencanaTitik} Titik Zonasi</span>
                <span className="text-indigo-700 font-medium">RTRW Laut</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CLUSTER 4: DIREKTORAT PENGENDALIAN PENGELOLAAN LAHAN, PESISIR DAN REKLAMASI (4 KPI) */}
      {(activeCategory === 'all' || activeCategory === 'pengendalian') && (
        <div className="space-y-1.5">
          {activeCategory === 'all' && (
            <div className="flex items-center gap-1.5 px-1 pt-1">
              <span className="w-1.5 h-3.5 rounded-full bg-emerald-600" />
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono">
                Kinerja Direktorat Pengendalian Pengelolaan Lahan, Pesisir &amp; Reklamasi
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Pengawasan Lahan & Pesisir (DS #1) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      DS #1
                    </span>
                  </div>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('kpi_pengawasan')}
                      className="p-1 rounded text-slate-400 hover:text-sky-700 transition-colors cursor-pointer"
                      title="Formula Pengawasan Lahan"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  Pengawasan Objek Lahan &amp; Pesisir
                </div>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-lg font-bold font-mono text-emerald-700">
                    {kpiPengawasan.persentase.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-emerald-700 font-medium">Realisasi</span>
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>{kpiPengawasan.realisasiObjek}/{kpiPengawasan.targetObjek} Objek</span>
                <span className="text-sky-700 font-medium">3 Zona SWP</span>
              </div>
            </div>

            {/* Evaluasi & Rekuperasi Lahan Terlantar (DS #2) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      DS #2
                    </span>
                  </div>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('kpi_evaluasi_pembatalan')}
                      className="p-1 rounded text-slate-400 hover:text-amber-700 transition-colors cursor-pointer"
                      title="Formula Rekuperasi Lahan"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  Evaluasi &amp; Rekuperasi Lahan
                </div>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-lg font-bold font-mono text-amber-700">
                    {kpiEvaluasi.persentase.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-amber-800 font-medium">Tuntas</span>
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>{kpiEvaluasi.realisasiKasus}/{kpiEvaluasi.targetKasus} Kasus</span>
                <span className="text-emerald-700 font-bold font-mono">
                  {kpiEvaluasi.luasLahanDiselamatkanHa} Ha Rekuperasi
                </span>
              </div>
            </div>

            {/* Dokumen Lahan & BAPL (DS #3) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
                      <FileCheck2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      DS #3
                    </span>
                  </div>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('kpi_dokumen')}
                      className="p-1 rounded text-slate-400 hover:text-indigo-700 transition-colors cursor-pointer"
                      title="Formula Dokumen Lahan"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  Kegiatan Dokumen Lahan &amp; BAPL
                </div>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-lg font-bold font-mono text-indigo-700">
                    {kpiDokumen.persentase.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-indigo-700 font-medium">Sah</span>
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>{kpiDokumen.realisasiDokumen}/{kpiDokumen.targetDokumen} Dok</span>
                <span className="text-indigo-700 font-medium">SLA: {kpiDokumen.rataRataSlaHari} Hari</span>
              </div>
            </div>

            {/* Rekomendasi Hak & Peralihan (DS #4) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      DS #4
                    </span>
                  </div>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('kpi_rekomendasi')}
                      className="p-1 rounded text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                      title="Formula Rekomendasi Hak"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  Rekomendasi Hak &amp; Peralihan
                </div>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-lg font-bold font-mono text-emerald-700">
                    {kpiRekomendasi.persentase.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-emerald-700 font-medium">Selesai</span>
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span>{kpiRekomendasi.totalRekomendasiSelesai}/{kpiRekomendasi.totalPermohonanMasuk}</span>
                <span className="text-emerald-700 font-medium">SOP: {kpiRekomendasi.rataRataSlaHari} Hari</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
