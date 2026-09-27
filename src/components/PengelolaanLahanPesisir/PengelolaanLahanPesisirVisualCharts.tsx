import React, { useState } from 'react';
import {
  MapPin,
  Anchor,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Layers,
  Compass,
  AlertTriangle,
  Building2,
  DollarSign,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  BarChart3,
  Sparkles,
  PieChart as PieIcon,
  ChevronRight,
  FolderCheck,
  Activity,
} from 'lucide-react';
import {
  LAHAN_KAWASAN_SUMMARY,
  SWP_OVERVIEW_LIST,
  ALOKASI_TERBARU_LIST,
  SwpOverviewItem,
} from './pengelolaanLahanPesisirData';

interface PengelolaanLahanPesisirVisualChartsProps {
  onOpenFormulaModal?: (kpiId: string) => void;
  onSelectSwpDetail?: (swpId: string) => void;
}

export const PengelolaanLahanPesisirVisualCharts: React.FC<
  PengelolaanLahanPesisirVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  const [selectedSwpId, setSelectedSwpId] = useState<string>('swp-batam-centre');
  const [activeTab, setActiveTab] = useState<'utilisasi_swp' | 'pipeline_alokasi' | 'pengawasan_rekuperasi'>('utilisasi_swp');

  const selectedSwp = SWP_OVERVIEW_LIST.find((s) => s.id === selectedSwpId) || SWP_OVERVIEW_LIST[0];

  return (
    <div className="space-y-4">
      {/* 1. TOP EXECUTIVE METRIC STRIP (Ringkasan Komprehensif Lahan & Kawasan) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase font-bold">TOTAL LUAS LAHAN</span>
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-lg sm:text-xl font-black font-mono text-slate-900">
            {LAHAN_KAWASAN_SUMMARY.totalLuasLahanHa.toLocaleString('id-ID')} <span className="text-xs font-semibold text-slate-500">Ha</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Delineasi KPBPB Batam</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase font-bold">LAHAN TERSEDIA</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-lg sm:text-xl font-black font-mono text-emerald-600">
            {LAHAN_KAWASAN_SUMMARY.lahanTersediaHa.toLocaleString('id-ID')} <span className="text-xs font-semibold text-slate-500">Ha</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">22.2% Siap Alokasi</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase font-bold">LAHAN ALOKASI</span>
            <Layers className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-lg sm:text-xl font-black font-mono text-blue-700">
            {LAHAN_KAWASAN_SUMMARY.lahanAlokasiHa.toLocaleString('id-ID')} <span className="text-xs font-semibold text-slate-500">Ha</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">59.8% Hak SKPT Terbit</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase font-bold">IDLE LAND RATIO</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-lg sm:text-xl font-black font-mono text-amber-600">
            {LAHAN_KAWASAN_SUMMARY.idleLandRatio}%
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Target Pengendalian &lt; 10%</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase font-bold">UTILISASI KAWASAN</span>
            <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-lg sm:text-xl font-black font-mono text-indigo-600">
            {LAHAN_KAWASAN_SUMMARY.utilisasiKawasanPersen}%
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Target Optimal &gt; 80%</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase font-bold">PENGENDALIAN / ISU</span>
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-lg sm:text-xl font-black font-mono text-rose-600">
            {LAHAN_KAWASAN_SUMMARY.kasusAktifKonflik} <span className="text-xs font-semibold text-slate-500">Kasus</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">52 Kasus Tersolusi</span>
        </div>
      </div>

      {/* 2. MAIN VISUALIZATION ROW: KOMPOSISI LAHAN & MAP UTILISASI SPASIAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Komposisi Status Lahan & Inter-Domain Linkage (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card: Komposisi Status Lahan */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                  Komposisi Status Pemanfaatan Lahan (41.500 Ha)
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                Data Spasial 2025/2026
              </span>
            </div>

            {/* Visual Multi-Segment Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100">
                <div style={{ width: '42.0%' }} className="bg-blue-600 h-full" title="Produktif 17.450 Ha (42.0%)" />
                <div style={{ width: '22.2%' }} className="bg-emerald-500 h-full" title="Tersedia 9.200 Ha (22.2%)" />
                <div style={{ width: '17.8%' }} className="bg-indigo-500 h-full" title="Alokasi Baru 7.350 Ha (17.8%)" />
                <div style={{ width: '8.8%' }} className="bg-amber-400 h-full" title="Idle 3.670 Ha (8.8%)" />
                <div style={{ width: '4.4%' }} className="bg-rose-500 h-full" title="Sengketa 1.830 Ha (4.4%)" />
                <div style={{ width: '4.8%' }} className="bg-slate-400 h-full" title="Cadangan Konservasi 2.000 Ha (4.8%)" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span className="text-slate-600 text-[11px] font-medium">Produktif Beroperasi</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-xs">17.450 Ha</span>
                </div>

                <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-emerald-800 text-[11px] font-medium">Lahan Tersedia</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 text-xs">9.200 Ha</span>
                </div>

                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-slate-600 text-[11px] font-medium">Alokasi Berjalan</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-xs">7.350 Ha</span>
                </div>

                <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="text-amber-800 text-[11px] font-medium">Idle Land (Mangkrak)</span>
                  </div>
                  <span className="font-mono font-bold text-amber-700 text-xs">3.670 Ha</span>
                </div>

                <div className="p-2 rounded-lg bg-rose-50/60 border border-rose-100 flex items-center justify-between col-span-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="text-rose-800 text-[11px] font-medium">Dalam Sengketa / Evaluasi Penertiban</span>
                  </div>
                  <span className="font-mono font-bold text-rose-700 text-xs">1.830 Ha</span>
                </div>
              </div>
            </div>

            {/* Inter-Domain Linkage Card */}
            <div className="mt-3 p-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-300 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  INTER-DOMAIN LINKAGE PERKIN
                </span>
                <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded text-white font-mono">
                  Sinergi Fiskal &amp; Investasi
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="border-r border-white/20 pr-2">
                  <span className="text-[10px] text-slate-300 block">Dampak Investasi Masuk:</span>
                  <div className="text-base sm:text-lg font-black font-mono text-white">
                    Rp {LAHAN_KAWASAN_SUMMARY.dampakInvestasiT} Triliun
                  </div>
                  <span className="text-[9px] text-cyan-200 block">Mendukung IKS-1 Kepala BP</span>
                </div>
                <div className="pl-1">
                  <span className="text-[10px] text-slate-300 block">Potensi Penerimaan PNBP:</span>
                  <div className="text-base sm:text-lg font-black font-mono text-emerald-300">
                    Rp {LAHAN_KAWASAN_SUMMARY.potensiPnbpM} Miliar
                  </div>
                  <span className="text-[9px] text-emerald-200 block">Tarif UWT &amp; Jasa Pesisir</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coastal & Reclamation Quick Status */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-cyan-600" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Status Izin Kawasan Pesisir &amp; Reklamasi (PKKPRL)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Target: 150 Ha • Realisasi: 162,8 Ha
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-cyan-50 border border-cyan-100">
                <span className="text-[10px] text-cyan-700 font-bold uppercase block">Ready Plots</span>
                <span className="text-xl font-black font-mono text-cyan-900">12 Plot</span>
                <span className="text-[10px] text-cyan-600 block mt-0.5">Tanjung Sauh &amp; Kabil</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-600 font-bold uppercase block">Under Review</span>
                <span className="text-xl font-black font-mono text-slate-800">8 Plot</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Kajian Lingkungan Hidup</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Matriks Utilisasi SWP & Pipeline Alokasi (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            {/* Tab Controller */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('utilisasi_swp')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'utilisasi_swp'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Utilisasi 7 SWP / Kawasan</span>
                </button>

                <button
                  onClick={() => setActiveTab('pipeline_alokasi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'pipeline_alokasi'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Alokasi Investasi Q2</span>
                </button>

                <button
                  onClick={() => setActiveTab('pengawasan_rekuperasi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'pengawasan_rekuperasi'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Pengawasan &amp; Rekuperasi</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                Satu Data Item #15 &amp; #14
              </span>
            </div>

            {/* TAB CONTENT 1: UTILISASI PER SUB-WILAYAH PENGEMBANGAN (SWP) */}
            {activeTab === 'utilisasi_swp' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Pilih Sub Wilayah Pengembangan untuk melihat detail alokasi:</span>
                  <span className="font-mono text-[11px]">7 Sub-Wilayah Aktif</span>
                </div>

                <div className="space-y-2">
                  {SWP_OVERVIEW_LIST.map((swp) => {
                    const isSelected = selectedSwpId === swp.id;

                    return (
                      <div
                        key={swp.id}
                        onClick={() => setSelectedSwpId(swp.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-300 ring-1 ring-blue-300'
                            : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-100/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                              {swp.kode}
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              {swp.nama}
                            </span>
                            <span className="text-[10px] text-slate-500 hidden sm:inline">
                              • {swp.fokusInvestasi}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold font-mono text-blue-700">
                              {swp.utilisasiPersen}%
                            </span>
                            <span
                              className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded ${
                                swp.tingkatKesiapan === 'Sangat Tinggi'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : swp.tingkatKesiapan === 'Tinggi'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {swp.tingkatKesiapan}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar Utilisasi */}
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              swp.utilisasiPersen >= 80
                                ? 'bg-emerald-500'
                                : swp.utilisasiPersen >= 70
                                ? 'bg-blue-600'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${swp.utilisasiPersen}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                          <span>Luas Wilayah: {swp.luasWilayahHa} Ha</span>
                          <span>Tersedia: {swp.luasTersediaHa} Ha</span>
                          <span>Persil Siap Bangun: {swp.persilSiapPakai} Persil</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: PIPELINE ALOKASI LAHAN TERBARU (Q2) */}
            {activeTab === 'pipeline_alokasi' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Daftar Proyek Alokasi Investasi Strategis Q2 Berjalan:</span>
                  <span className="font-mono text-[11px] text-emerald-600 font-bold">Total +248,5 Ha</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ALOKASI_TERBARU_LIST.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 hover:bg-slate-100/70 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                          {item.kodePl}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                            item.status === 'FINALIZED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'PROSES'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div>
                        <h5 className="text-xs font-bold text-slate-900 leading-snug">
                          {item.namaProyek}
                        </h5>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {item.sektor} • {item.swp}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                        <div>
                          <span className="text-[9px] text-slate-400 block">Luas Alokasi:</span>
                          <span className="font-bold text-slate-900">{item.luasHa} Ha</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-slate-400 block">Komitmen Investasi:</span>
                          <span className="font-bold text-blue-700">Rp {item.nilaiInvestasiT} T</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: PENGAWASAN, EVALUASI & REKUPERASI LAHAN */}
            {activeTab === 'pengawasan_rekuperasi' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h5 className="text-xs font-bold">Kinerja Pengawasan Kepatuhan &amp; Rekuperasi</h5>
                      <p className="text-[10.5px] text-slate-300">
                        Capaian Kepatuhan 93,8% • 94,6 Ha Lahan Mangkrak Dikembalikan ke BP Batam
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-white/10 px-2.5 py-1 rounded-lg">
                    IKP #3: 117,25%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-mono block">SP-1 DITERBITKAN</span>
                    <span className="text-lg font-black font-mono text-slate-800">46 Berkas</span>
                    <span className="text-[9.5px] text-slate-400 block mt-0.5">Teguran Awal 30 Hari</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                    <span className="text-[10px] text-amber-700 font-mono block">SP-2 &amp; SP-3</span>
                    <span className="text-lg font-black font-mono text-amber-800">18 Berkas</span>
                    <span className="text-[9.5px] text-amber-600 block mt-0.5">Klarifikasi &amp; Gelar Kasus</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] text-emerald-700 font-mono block">SK PEMBATALAN &amp; REKUPERASI</span>
                    <span className="text-lg font-black font-mono text-emerald-800">94,6 Ha</span>
                    <span className="text-[9.5px] text-emerald-600 block mt-0.5">Kembali ke Bank Tanah</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px]">
                    Sorotan Evaluasi Pemanfaatan Lahan:
                  </span>
                  <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                    <li>Konsentrasi lahan idle di Galang &amp; Rempang mulai diaktifkan via program re-delineasi PSN.</li>
                    <li>Sengketa batas dan tumpang tindih alokasi berkurang dari 84 menjadi 63 kasus aktif (penurunan 25%).</li>
                    <li>Pemberian rekomendasi perpanjangan &amp; pembaruan hak mencapai kepatuhan 95% sesuai SOP 14 hari kerja.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sub-footer detail SWP terpilih */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Wilayah Terpilih: <strong className="text-slate-800">{selectedSwp.nama}</strong></span>
              <span className="text-slate-400">({selectedSwp.statusKawasan})</span>
            </div>
            <span className="font-mono text-blue-700 font-bold">
              Kesiapan: {selectedSwp.tingkatKesiapan} ({selectedSwp.persilSiapPakai} Persil Siap Bangun)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
