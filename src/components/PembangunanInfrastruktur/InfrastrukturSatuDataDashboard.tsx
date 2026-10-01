import React, { useState } from 'react';
import {
  HardHat,
  Route,
  Zap,
  Trees,
  Mountain,
  Building2,
  CheckCircle2,
  HelpCircle,
  FileText,
  BarChart3,
  PieChart,
  Calculator,
  Layers,
  ArrowUpDown,
  BookOpen,
} from 'lucide-react';
import {
  DATASET_4_PROGRES_KONSTRUKSI,
  REKAP_JENIS_PEMBANGUNAN,
} from './infrastrukturData';

interface InfrastrukturSatuDataDashboardProps {
  onOpenFormula?: (kpiType: any) => void;
  onOpenWordDoc?: () => void;
  onOpenVisualCatalog?: () => void;
}

export const InfrastrukturSatuDataDashboard: React.FC<InfrastrukturSatuDataDashboardProps> = ({
  onOpenFormula,
  onOpenWordDoc,
  onOpenVisualCatalog,
}) => {
  // Tab pilihan dataset: 'ds4' | 'ds1' | 'ds2' | 'ds5' | 'ds6'
  const [activeTab, setActiveTab] = useState<string>('ds4');

  // Filter & sortir untuk Dataset 4 (NAMOBJ & PRGRS_PEK)
  const [statusFilterDs4, setStatusFilterDs4] = useState<'Semua' | 'Lancar' | 'Waspada' | 'Kritis'>('Semua');
  const [sortByDs4, setSortByDs4] = useState<'progres-desc' | 'progres-asc' | 'nama'>('progres-desc');

  // View mode untuk Dataset 6
  const [dataset6ViewMode, setDataset6ViewMode] = useState<'bar' | 'treemap'>('bar');

  // Data paket Dataset 4 terfilter & tersortir murni berdasarkan NAMOBJ dan PRGRS_PEK
  const filteredDs4 = DATASET_4_PROGRES_KONSTRUKSI.filter((p) => {
    if (statusFilterDs4 === 'Semua') return true;
    if (statusFilterDs4 === 'Lancar') return p.statusKurvaS === 'Ahead' || p.statusKurvaS === 'On Schedule' || p.statusKurvaS === 'Selesai';
    if (statusFilterDs4 === 'Waspada') return p.statusKurvaS === 'Waspada';
    return p.statusKurvaS === 'Kritis (SCM)';
  }).sort((a, b) => {
    if (sortByDs4 === 'progres-desc') return b.realisasiFisikPersen - a.realisasiFisikPersen;
    if (sortByDs4 === 'progres-asc') return a.realisasiFisikPersen - b.realisasiFisikPersen;
    return a.namaPaket.localeCompare(b.namaPaket);
  });

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* ========================================================================= */}
      {/* 1. HEADER RESMI DOKUMEN SATU DATA (HAL. 48 - 51) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  DIREKTORAT PEMBANGUNAN INFRASTRUKTUR
                </span>
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Buku Satu Data Hal. 48 - 51
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 5 Dataset Statistik Terverifikasi
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Dashboard Pemantauan Pembangunan Infrastruktur
              </h1>
              <p className="text-xs text-slate-500">
                Visualisasi bersih, langsung ke inti data (atribut &amp; persentase), dilengkapi panduan formula perhitungan yang transparan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            {onOpenFormula && (
              <button
                onClick={() => onOpenFormula('kpi-ruas-jalan')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                title="Buka Panduan Nama Atribut & Rumus Formula Perhitungan (Buku Satu Data Hal. 48-51)"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-700" />
                <span>Panduan Atribut &amp; Rumus</span>
              </button>
            )}

            {onOpenVisualCatalog && (
              <button
                onClick={onOpenVisualCatalog}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                title="Lihat Nama Visualisasi di Setiap Informasi Seluruh Dashboard"
              >
                <BarChart3 className="w-3.5 h-3.5 text-sky-600" />
                <span>Nama Visualisasi</span>
              </button>
            )}

            {onOpenWordDoc && (
              <button
                onClick={onOpenWordDoc}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                title="Lihat Format Dokumen Word"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Format Dokumen</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB NAVIGATOR DATASET SESUAI BUKU SATU DATA */}
        <div className="flex items-center gap-1 mt-3.5 pt-3 border-t border-slate-100 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0 mr-1 text-[11px]">
            Pilih Tampilan:
          </span>
          {[
            { key: 'ds4', label: 'Dataset 4: Progres Fisik (NAMOBJ & PRGRS)', icon: <HardHat className="w-3.5 h-3.5" />, badge: '12 Proyek' },
            { key: 'ds1', label: 'Dataset 1: ROW Utilitas', icon: <Zap className="w-3.5 h-3.5" />, badge: '142 Izin' },
            { key: 'ds2', label: 'Dataset 2: ROW Penghijauan', icon: <Trees className="w-3.5 h-3.5" />, badge: '34,2 Ha' },
            { key: 'ds5', label: 'Dataset 5: Pematangan Tanah BSW', icon: <Mountain className="w-3.5 h-3.5" />, badge: '5 Kawasan' },
            { key: 'ds6', label: 'Dataset 6: Rekap 6 Bidang', icon: <Building2 className="w-3.5 h-3.5" />, badge: 'Rp 2,84 T' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-sky-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9.5px] px-1.5 py-0.2 rounded font-mono ${
                    activeTab === tab.key ? 'bg-sky-700 text-sky-100' : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. KARTU METRIK KPI 6 DATASET LENGKAP DENGAN ATRIBUT & FORMULA */}
      {/* ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
            Ringkasan Indikator 5 Dataset Statistik
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-mono">
            🏷️ Visualisasi: Kartu Metrik KPI (BANs)
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {/* Dataset 1 */}
          <div
            onClick={() => {
              setActiveTab('ds1');
              if (onOpenFormula) onOpenFormula('kpi-row-utilitas');
            }}
            className={`p-3 rounded-xl border transition-all cursor-pointer bg-white hover:border-sky-400 group ${
              activeTab === 'ds1' ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-xs' : 'border-slate-200 shadow-2xs'
            }`}
            title="Klik untuk melihat Atribut Data & Rumus Dataset 1"
          >
            <div className="flex items-center justify-between text-slate-500 text-[10.5px] mb-1">
              <span className="font-bold text-sky-700">DATASET 1</span>
              <Zap className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 block line-clamp-1">ROW Utilitas</span>
            <div className="text-xl font-black text-slate-900 font-mono my-0.5">142 Izin</div>
            <span className="text-[10px] text-slate-500 block truncate">JENIS UTILITAS, TOTAL GALIAN</span>
            <div className="text-[9.5px] text-sky-700 font-semibold flex items-center gap-1 mt-1.5 pt-1 border-t border-slate-100 group-hover:underline">
              <Calculator className="w-3 h-3 text-sky-600 shrink-0" />
              <span>Lihat Formula &amp; Atribut</span>
            </div>
          </div>

          {/* Dataset 2 */}
          <div
            onClick={() => {
              setActiveTab('ds2');
              if (onOpenFormula) onOpenFormula('kpi-row-penghijauan');
            }}
            className={`p-3 rounded-xl border transition-all cursor-pointer bg-white hover:border-emerald-400 group ${
              activeTab === 'ds2' ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs' : 'border-slate-200 shadow-2xs'
            }`}
            title="Klik untuk melihat Atribut Data & Rumus Dataset 2"
          >
            <div className="flex items-center justify-between text-slate-500 text-[10.5px] mb-1">
              <span className="font-bold text-emerald-700">DATASET 2</span>
              <Trees className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 block line-clamp-1">ROW Penghijauan</span>
            <div className="text-xl font-black text-slate-900 font-mono my-0.5">34,2 Ha</div>
            <span className="text-[10px] text-slate-500 block truncate">LUAS PENGHIJAUAN</span>
            <div className="text-[9.5px] text-emerald-700 font-semibold flex items-center gap-1 mt-1.5 pt-1 border-t border-slate-100 group-hover:underline">
              <Calculator className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Lihat Formula &amp; Atribut</span>
            </div>
          </div>

          {/* Dataset 4 - Progres Fisik Konstruksi */}
          <div
            onClick={() => {
              setActiveTab('ds4');
              if (onOpenFormula) onOpenFormula('kpi-progres-fisik');
            }}
            className={`p-3 rounded-xl border transition-all cursor-pointer bg-white hover:border-sky-400 group ${
              activeTab === 'ds4' ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-xs' : 'border-slate-200 shadow-2xs'
            }`}
            title="Klik untuk melihat Atribut Data & Rumus Dataset 4"
          >
            <div className="flex items-center justify-between text-slate-500 text-[10.5px] mb-1">
              <span className="font-bold text-sky-700">DATASET 4</span>
              <HardHat className="w-3.5 h-3.5 text-sky-600" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 block line-clamp-1">Progres Fisik</span>
            <div className="text-xl font-black text-slate-900 font-mono my-0.5">81,6%</div>
            <span className="text-[10px] text-emerald-700 font-semibold block truncate">NAMOBJ, PRGRS_PEK</span>
            <div className="text-[9.5px] text-sky-700 font-semibold flex items-center gap-1 mt-1.5 pt-1 border-t border-slate-100 group-hover:underline">
              <Calculator className="w-3 h-3 text-sky-600 shrink-0" />
              <span>Lihat Formula &amp; Atribut</span>
            </div>
          </div>

          {/* Dataset 5 - Pematangan Lahan BSW */}
          <div
            onClick={() => {
              setActiveTab('ds5');
              if (onOpenFormula) onOpenFormula('kpi-pematangan');
            }}
            className={`p-3 rounded-xl border transition-all cursor-pointer bg-white hover:border-amber-400 group ${
              activeTab === 'ds5' ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-xs' : 'border-slate-200 shadow-2xs'
            }`}
            title="Klik untuk melihat Atribut Data & Rumus Dataset 5"
          >
            <div className="flex items-center justify-between text-slate-500 text-[10.5px] mb-1">
              <span className="font-bold text-amber-700">DATASET 5</span>
              <Mountain className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 block line-clamp-1">Pematangan Lahan</span>
            <div className="text-xl font-black text-slate-900 font-mono my-0.5">280 Ha</div>
            <span className="text-[10px] text-slate-500 block truncate">NAMOBJ, VOL_PEK</span>
            <div className="text-[9.5px] text-amber-700 font-semibold flex items-center gap-1 mt-1.5 pt-1 border-t border-slate-100 group-hover:underline">
              <Calculator className="w-3 h-3 text-amber-600 shrink-0" />
              <span>Lihat Formula &amp; Atribut</span>
            </div>
          </div>

          {/* Dataset 6 - Total Pembangunan Fisik */}
          <div
            onClick={() => {
              setActiveTab('ds6');
              if (onOpenFormula) onOpenFormula('kpi-pembangunan');
            }}
            className={`p-3 rounded-xl border transition-all cursor-pointer bg-white hover:border-purple-400 group ${
              activeTab === 'ds6' ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-xs' : 'border-slate-200 shadow-2xs'
            }`}
            title="Klik untuk melihat Atribut Data & Rumus Dataset 6"
          >
            <div className="flex items-center justify-between text-slate-500 text-[10.5px] mb-1">
              <span className="font-bold text-purple-700">DATASET 6</span>
              <Building2 className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 block line-clamp-1">Pembangunan Total</span>
            <div className="text-xl font-black text-slate-900 font-mono my-0.5">Rp 2,84 T</div>
            <span className="text-[10px] text-slate-500 block truncate">JNS_PEK, NKON_F</span>
            <div className="text-[9.5px] text-purple-700 font-semibold flex items-center gap-1 mt-1.5 pt-1 border-t border-slate-100 group-hover:underline">
              <Calculator className="w-3 h-3 text-purple-600 shrink-0" />
              <span>Lihat Formula &amp; Atribut</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. DATASET 4: LAPORAN PROGRES PEKERJAAN KONSTRUKSI (NAMOBJ & PRGRS_PEK)    */}
      {/* (RESPONS PERTANYAAN 2: FOKUS GRAFIK NAMOBJ & PRGRS_PEK, TANPA DESKRIPSI RAMAI) */}
      {/* ========================================================================= */}
      {activeTab === 'ds4' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                  DATASET NO. 4 (Hal. 49-50)
                </span>
                <h2 className="text-sm font-bold text-slate-900">
                  Laporan Progres Pekerjaan Konstruksi Tahun Berjalan
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                  🏷️ Visualisasi: Grafik Batang Horizontal (Horizontal Bar Chart)
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  Atribut yang Ditampilkan: <strong>NAMOBJ</strong> (Nama Objek Proyek) &amp; <strong>PRGRS_PEK</strong> (Progres Fisik %)
                </span>
              </div>
            </div>

            {/* Kontrol Filter & Urutan Ringkas */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              {/* Filter Status */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                {[
                  { id: 'Semua', label: 'Semua (12)' },
                  { id: 'Lancar', label: '🟢 Lancar (8)' },
                  { id: 'Waspada', label: '🟡 Waspada (2)' },
                  { id: 'Kritis', label: '🔴 Kritis (2)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStatusFilterDs4(f.id as any)}
                    className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                      statusFilterDs4 === f.id
                        ? 'bg-slate-900 text-white font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Sort By Progres */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  onClick={() => setSortByDs4(sortByDs4 === 'progres-desc' ? 'progres-asc' : 'progres-desc')}
                  className="px-2 py-1 rounded text-[11px] font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  title="Urutkan persentase progres"
                >
                  <ArrowUpDown className="w-3 h-3 text-sky-600" />
                  <span>{sortByDs4 === 'progres-desc' ? 'Tertinggi' : 'Terendah'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* GRAFIK BATANG HORIZONTAL MURNI: NAMOBJ vs PRGRS_PEK (BERSIH, TANPA TEKS BERLEBIHAN) */}
          <div className="space-y-2.5">
            {filteredDs4.map((p) => {
              const isAhead = p.realisasiFisikPersen >= 80;
              const isWarning = p.realisasiFisikPersen >= 60 && p.realisasiFisikPersen < 80;
              const isCritical = p.realisasiFisikPersen < 60;

              let barColor = 'bg-emerald-500';
              let badgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
              let statusLabel = 'Lancar';

              if (isCritical) {
                barColor = 'bg-rose-500';
                badgeColor = 'text-rose-700 bg-rose-50 border-rose-200';
                statusLabel = 'Kritis (SCM)';
              } else if (isWarning) {
                barColor = 'bg-amber-500';
                badgeColor = 'text-amber-800 bg-amber-50 border-amber-200';
                statusLabel = 'Waspada';
              }

              return (
                <div
                  key={p.id}
                  className="p-2.5 rounded-lg bg-slate-50/70 border border-slate-200 hover:border-sky-300 transition-all"
                >
                  {/* Baris Atas: NAMOBJ (Nama Objek Proyek) dan Nilai PRGRS_PEK */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border font-mono shrink-0 ${badgeColor}`}>
                        {statusLabel}
                      </span>
                      <strong className="text-xs sm:text-[13px] text-slate-900 truncate">
                        {p.namaPaket}
                      </strong>
                    </div>

                    <div className="flex items-baseline gap-1 shrink-0 font-mono">
                      <span className="text-sm sm:text-base font-black text-slate-900">
                        {p.realisasiFisikPersen}%
                      </span>
                      <span className="text-[10px] text-slate-400">
                        (target {p.rencanaFisikPersen}%)
                      </span>
                    </div>
                  </div>

                  {/* Batang Horizontal Progres (PRGRS_PEK) */}
                  <div className="relative w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    {/* Target Garis Penanda Rencana */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-slate-700 z-10"
                      style={{ left: `${p.rencanaFisikPersen}%` }}
                      title={`Target Rencana: ${p.rencanaFisikPersen}%`}
                    />
                    {/* Realisasi Fisik */}
                    <div
                      className={`h-full rounded-full transition-all ${barColor}`}
                      style={{ width: `${p.realisasiFisikPersen}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rangkuman Singkat Kaki Grafik */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> &ge; 80% (Lancar)
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ml-2" /> 60% - 79% (Waspada)
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ml-2" /> &lt; 60% (Kritis)
            </span>
            <span>
              Total <strong>12 Paket Pekerjaan Konstruksi Fisik</strong> BP Batam TA 2025
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. DATASET 1 & 2: ROW UTILITAS & ROW PENGHIJAUAN                         */}
      {/* ========================================================================= */}
      {(activeTab === 'ds1' || activeTab === 'ds2') && (
        <div className="grid grid-cols-1 gap-3.5">
          {/* DATASET 1: ROW UTILITAS */}
          {activeTab === 'ds1' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
                    DATASET NO. 1 (Hal. 48)
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    Perizinan Pemanfaatan ROW Utilitas
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono block mt-1">
                    🏷️ Visualisasi: Grafik Batang Horizontal (Horizontal Bar Chart)
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                  142 Izin Terbit
                </span>
              </div>

              <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded mb-2.5">
                Atribut yang Ditampilkan: <strong>JENIS UTILITAS</strong> &amp; <strong>TOTAL GALIAN</strong> (Meter)
              </div>

              {/* Grafik Batang Horizontal Jenis Utilitas */}
              <div className="space-y-2 mb-3">
                {[
                  { nama: 'Kabel Fiber Optik (Internet)', meter: '31.400 M', izin: '52 Izin', persen: 36.6, color: 'bg-sky-600' },
                  { nama: 'Pipa Air Bersih (SPAM)', meter: '28.500 M', izin: '48 Izin', persen: 33.8, color: 'bg-blue-600' },
                  { nama: 'Kabel Listrik Bawah Tanah PLN', meter: '24.600 M', izin: '42 Izin', persen: 29.6, color: 'bg-amber-500' },
                ].map((item) => (
                  <div key={item.nama} className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-800">{item.nama}</span>
                      <span className="font-mono font-bold text-slate-900">{item.meter} ({item.izin})</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.persen}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Galian Terbuka (Open Trench)</span>
                  <strong className="font-mono text-slate-900">52.800 M (62,5%)</strong>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Galian Crossing (Boring)</span>
                  <strong className="font-mono text-emerald-700">31.700 M (37,5%)</strong>
                </div>
              </div>
            </div>
          )}

          {/* DATASET 2: ROW PENGHIJAUAN */}
          {activeTab === 'ds2' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                    DATASET NO. 2 (Hal. 48)
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    Perizinan Pemanfaatan ROW Penghijauan
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono block mt-1">
                    🏷️ Visualisasi: Grafik Batang Horizontal (Horizontal Bar Chart)
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  34,2 Hektar
                </span>
              </div>

              <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded mb-2.5">
                Atribut yang Ditampilkan: <strong>JENIS PENGHIJAUAN</strong> &amp; <strong>LUAS PENGHIJAUAN</strong> (m²)
              </div>

              {/* Grafik Batang Horizontal Jenis Penghijauan */}
              <div className="space-y-2 mb-3">
                {[
                  { nama: 'Taman Median Jalan', luas: '138.000 m²', lokasi: '35 Lokasi', persen: 40.7 },
                  { nama: 'Adopsi Taman Korporasi CSR', luas: '104.500 m²', lokasi: '26 Lokasi', persen: 30.2 },
                  { nama: 'Pohon Pelindung Koridor', luas: '58.200 m²', lokasi: '15 Lokasi', persen: 17.5 },
                  { nama: 'Buffer Zone Konservasi', luas: '41.900 m²', lokasi: '10 Lokasi', persen: 11.6 },
                ].map((item) => (
                  <div key={item.nama} className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-emerald-950">{item.nama}</span>
                      <span className="font-mono font-bold text-emerald-800">{item.luas} ({item.lokasi})</span>
                    </div>
                    <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${item.persen}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. DATASET 5 & 6: PEMATANGAN TANAH (BSW) & REKAPITULASI PEMBANGUNAN       */}
      {/* ========================================================================= */}
      {(activeTab === 'ds5' || activeTab === 'ds6') && (
        <div className="grid grid-cols-1 gap-3.5">
          {/* DATASET 5: PEMATANGAN TANAH (BSW) CUT & FILL */}
          {activeTab === 'ds5' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
                    DATASET NO. 5 (Hal. 50)
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    Pematangan Tanah (BSW) Cut &amp; Fill
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono block mt-1">
                    🏷️ Visualisasi: Grafik Batang Horizontal (Horizontal Bar Chart)
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                  280 Hektar
                </span>
              </div>

              <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded mb-2.5">
                Atribut yang Ditampilkan: <strong>NAMOBJ</strong> (Kawasan BSW) &amp; <strong>VOL_PEK</strong> (Luas &amp; Volume Cut &amp; Fill)
              </div>

              {/* Grafik Batang Horizontal Pematangan BSW */}
              <div className="space-y-2">
                {[
                  { kawasan: 'Tanjung Pinggir Sekupang', luas: '20 Ha', vol: '320.000 m³' },
                  { kawasan: 'KEK Nongsa Digital Park (Ekspansi)', luas: '45 Ha', vol: '780.000 m³' },
                  { kawasan: 'Batu Ampar Logistics Hub', luas: '25 Ha', vol: '450.000 m³' },
                  { kawasan: 'Kabil Industrial Estate', luas: '50 Ha', vol: '850.000 m³' },
                  { kawasan: 'Kawasan Industri Rempang Eco-City', luas: '140 Ha', vol: '2.450.000 m³' },
                ].map((item) => (
                  <div key={item.kawasan} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-900">{item.kawasan}</span>
                      <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{item.luas}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-1.5">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(parseInt(item.luas) / 140) * 100}%` }} />
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center justify-between">
                      <span>Kawasan BSW</span>
                      <span className="font-mono text-slate-600">Volume: {item.vol}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DATASET 6: REKAPITULASI PEMBANGUNAN FISIK TOTAL */}
          {activeTab === 'ds6' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-2 border-b border-slate-100 gap-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono">
                    DATASET NO. 6 (Hal. 50-51)
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    Distribusi Berdasarkan Jenis Pekerjaan
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-mono block mt-1">
                    🏷️ Visualisasi: {dataset6ViewMode === 'bar' ? 'Grafik Batang Horizontal' : 'Treemap Proporsional Anggaran'}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                    <button
                      onClick={() => setDataset6ViewMode('bar')}
                      className={`px-2 py-1 rounded font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                        dataset6ViewMode === 'bar'
                          ? 'bg-white text-purple-900 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <BarChart3 className="w-3 h-3" />
                      <span>Batang</span>
                    </button>
                    <button
                      onClick={() => setDataset6ViewMode('treemap')}
                      className={`px-2 py-1 rounded font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                        dataset6ViewMode === 'treemap'
                          ? 'bg-white text-emerald-900 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <PieChart className="w-3 h-3" />
                      <span>Treemap</span>
                    </button>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded border border-purple-200">
                    Rp 2,84 T
                  </span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded mb-2.5">
                Atribut yang Ditampilkan: <strong>JNS_PEK</strong> (Jenis Pekerjaan) &amp; <strong>NKON_F</strong> (Nilai Kontrak Fisik)
              </div>

              {/* MODE GRAFIK BATANG HORIZONTAL (TANPA PERSENTASE) */}
              {dataset6ViewMode === 'bar' && (
                <div className="space-y-2">
                  {REKAP_JENIS_PEMBANGUNAN.map((j) => (
                    <div key={j.singkatan} className="p-2 rounded-lg bg-slate-50/70 border border-slate-200">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: j.warna }} />
                          <strong className="text-slate-800">{j.singkatan}</strong>
                        </div>
                        <span className="font-mono font-bold text-slate-900">
                          Rp {(j.totalPagu / 1000000000).toFixed(0)} M
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ backgroundColor: j.warna, width: `${j.persentaseAnggaran * 2}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MODE TREEMAP PROPORSIONAL (TANPA PERSENTASE) */}
              {dataset6ViewMode === 'treemap' && (
                <div className="space-y-1.5">
                  <div className="grid grid-cols-6 gap-1.5 h-44 text-white text-xs">
                    <div
                      className="col-span-6 sm:col-span-3 row-span-2 p-2.5 rounded-lg flex flex-col justify-between shadow-2xs"
                      style={{ backgroundColor: REKAP_JENIS_PEMBANGUNAN[0].warna }}
                    >
                      <h4 className="font-bold text-xs sm:text-sm leading-tight">{REKAP_JENIS_PEMBANGUNAN[0].singkatan}</h4>
                      <div className="text-base sm:text-lg font-black font-mono">
                        Rp {(REKAP_JENIS_PEMBANGUNAN[0].totalPagu / 1000000000).toFixed(0)} M
                      </div>
                    </div>
                    <div
                      className="col-span-6 sm:col-span-3 p-2 rounded-lg flex flex-col justify-between shadow-2xs"
                      style={{ backgroundColor: REKAP_JENIS_PEMBANGUNAN[1].warna }}
                    >
                      <h4 className="font-bold text-xs">{REKAP_JENIS_PEMBANGUNAN[1].singkatan}</h4>
                      <div className="text-xs sm:text-sm font-bold font-mono">Rp {(REKAP_JENIS_PEMBANGUNAN[1].totalPagu / 1000000000).toFixed(0)} M</div>
                    </div>
                    <div
                      className="col-span-3 sm:col-span-1.5 p-1.5 rounded-lg flex flex-col justify-between shadow-2xs"
                      style={{ backgroundColor: REKAP_JENIS_PEMBANGUNAN[2].warna }}
                    >
                      <h4 className="font-bold text-[10px] leading-tight line-clamp-1">{REKAP_JENIS_PEMBANGUNAN[2].singkatan}</h4>
                      <div className="text-xs font-mono font-bold">Rp 440 M</div>
                    </div>
                    <div
                      className="col-span-3 sm:col-span-1.5 p-1.5 rounded-lg flex flex-col justify-between shadow-2xs"
                      style={{ backgroundColor: REKAP_JENIS_PEMBANGUNAN[3].warna }}
                    >
                      <h4 className="font-bold text-[10px] leading-tight line-clamp-1">{REKAP_JENIS_PEMBANGUNAN[3].singkatan}</h4>
                      <div className="text-xs font-mono font-bold">Rp 300 M</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
