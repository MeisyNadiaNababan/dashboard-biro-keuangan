import React from 'react';
import {
  FileCode2,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Award,
  AlertTriangle,
  Smile,
  Activity,
  Layers,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Info,
} from 'lucide-react';
import { BOKMR_SUMMARY } from './bokmrData';

interface BokmrKpisProps {
  onOpenFormulaModal: (datasetIndex: number) => void;
  onSelectKpiDetail?: (kpiKey: string) => void;
}

export const BokmrKpis: React.FC<BokmrKpisProps> = ({
  onOpenFormulaModal,
  onSelectKpiDetail,
}) => {
  return (
    <div className="space-y-3">
      {/* TITLE BAR FOR KPIS */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-sky-600" />
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            7 Indikator Kinerja Utama Tata Kelola (Satu Data Hal 38 - 40)
          </h2>
        </div>
        <span className="text-[11px] text-slate-500">
          Target KemenPAN-RB & BPKP Tahun Evaluasi 2026
        </span>
      </div>

      {/* 7 KPI CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. KPI INDEKS REFORMASI KEBIJAKAN */}
        <div
          id="kpi-indeks-reformasi-kebijakan"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="p-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
              <Award className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">
              DATASET BELUM ADA
            </span>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              1. Indeks Reformasi Kebijakan
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {BOKMR_SUMMARY.indeksReformasiKebijakan.nilai.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 100</span>
              <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {BOKMR_SUMMARY.indeksReformasiKebijakan.kategori}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${BOKMR_SUMMARY.indeksReformasiKebijakan.nilai}%` }}
              />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="truncate max-w-[170px]" title={BOKMR_SUMMARY.indeksReformasiKebijakan.catatan}>
              {BOKMR_SUMMARY.indeksReformasiKebijakan.statusDataset}
            </span>
            <button
              onClick={() => onOpenFormulaModal(0)}
              className="text-amber-700 hover:text-amber-800 font-semibold hover:underline flex items-center gap-0.5 shrink-0"
            >
              Info <Info className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 2. KPI INDEKS MATURITAS SPIP */}
        <div
          id="kpi-indeks-maturitas-spip"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold font-mono">
              DATASET NO. 17
            </span>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              2. Indeks Maturitas SPIP
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {BOKMR_SUMMARY.indeksMaturitasSpip.nilai.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 5.00</span>
              <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Level 3 (Terdefinisi)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(BOKMR_SUMMARY.indeksMaturitasSpip.nilai / 5.0) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Target BPKP: 3.20 ({BOKMR_SUMMARY.indeksMaturitasSpip.deviasi})</span>
            <button
              onClick={() => onOpenFormulaModal(17)}
              className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline flex items-center gap-0.5 shrink-0"
            >
              Matriks <FileCode2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 3. KPI INDEKS KEPUASAN MASYARAKAT (IKM) */}
        <div
          id="kpi-indeks-kepuasan-masyarakat"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-200">
              <Smile className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-bold font-mono">
              DATASET NO. 10 & 11
            </span>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              3. Indeks Kepuasan Masyarakat
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {BOKMR_SUMMARY.indeksKepuasanMasyarakat.nilai}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 100</span>
              <span className="ml-auto text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                {BOKMR_SUMMARY.indeksKepuasanMasyarakat.kategori}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${BOKMR_SUMMARY.indeksKepuasanMasyarakat.nilai}%` }}
              />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Konversi: 3.54 / 4.00 (1.325 entri PDF)</span>
            <button
              onClick={() => onOpenFormulaModal(10)}
              className="text-blue-700 hover:text-blue-800 font-semibold hover:underline flex items-center gap-0.5 shrink-0"
            >
              Detail <FileCode2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 4. KPI NILAI SAKIP */}
        <div
          id="kpi-nilai-sakip"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-200">
              <Activity className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-[10px] font-bold font-mono">
              DATASET NO. 2
            </span>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              4. Nilai SAKIP BP Batam
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {BOKMR_SUMMARY.nilaiSakip.nilai}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 100</span>
              <span className="ml-auto text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                Predikat A
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${BOKMR_SUMMARY.nilaiSakip.nilai}%` }}
              />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Tingkat: Memuaskan / Akuntabel</span>
            <button
              onClick={() => onOpenFormulaModal(2)}
              className="text-indigo-700 hover:text-indigo-800 font-semibold hover:underline flex items-center gap-0.5 shrink-0"
            >
              Komponen <FileCode2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 5. KPI INDEKS PELAYANAN PUBLIK (IPP / PEKPPP) */}
        <div
          id="kpi-indeks-pelayanan-publik"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="p-2 bg-teal-50 text-teal-700 rounded-xl border border-teal-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded text-[10px] font-bold font-mono">
              DATASET NO. 15
            </span>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              5. Indeks Pelayanan Publik
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {BOKMR_SUMMARY.indeksPelayananPublik.nilai.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 5.00</span>
              <span className="ml-auto text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                {BOKMR_SUMMARY.indeksPelayananPublik.kategori}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-teal-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(BOKMR_SUMMARY.indeksPelayananPublik.nilai / 5.0) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Capaian: 109.5% dari target 4.00</span>
            <button
              onClick={() => onOpenFormulaModal(15)}
              className="text-teal-700 hover:text-teal-800 font-semibold hover:underline flex items-center gap-0.5 shrink-0"
            >
              PEKPPP <FileCode2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 6. KPI NILAI INDEKS MANAJEMEN RISIKO (MRI) */}
        <div
          id="kpi-indeks-manajemen-risiko"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="p-2 bg-rose-50 text-rose-700 rounded-xl border border-rose-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded text-[10px] font-bold font-mono">
              DATASET NO. 18
            </span>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              6. Indeks Manajemen Risiko
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {BOKMR_SUMMARY.indeksManajemenRisiko.nilai.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 5.00</span>
              <span className="ml-auto text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Managed
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-rose-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(BOKMR_SUMMARY.indeksManajemenRisiko.nilai / 5.0) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Mitigasi: 94.2% Register Terkelola</span>
            <button
              onClick={() => onOpenFormulaModal(18)}
              className="text-rose-700 hover:text-rose-800 font-semibold hover:underline flex items-center gap-0.5 shrink-0"
            >
              Piagam <FileCode2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 7. JUMLAH PENGADUAN MASYARAKAT TERHADAP LAYANAN BADAN USAHA */}
        <div
          id="kpi-pengaduan-masyarakat-badan-usaha"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between col-span-1 md:col-span-2"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="p-2 bg-sky-50 text-sky-700 rounded-xl border border-sky-200">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded text-[10px] font-bold font-mono">
                DATASET NO. 10 & NO. 2
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                96,15% TUNTAS
              </span>
            </div>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              7. Jumlah Pengaduan Masyarakat Layanan Badan Usaha
            </span>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Diterima</span>
                <span className="text-xl font-black text-slate-900">
                  {BOKMR_SUMMARY.pengaduanMasyarakat.totalDiterima}
                </span>
                <span className="text-[10px] text-slate-400 block">Aduan Masuk</span>
              </div>
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-200">
                <span className="text-[10px] text-amber-700 block">Diproses</span>
                <span className="text-xl font-black text-amber-900">
                  {BOKMR_SUMMARY.pengaduanMasyarakat.totalDiproses}
                </span>
                <span className="text-[10px] text-amber-600 block">Investigasi Unit</span>
              </div>
              <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                <span className="text-[10px] text-emerald-700 block">Selesai</span>
                <span className="text-xl font-black text-emerald-800">
                  {BOKMR_SUMMARY.pengaduanMasyarakat.totalSelesai}
                </span>
                <span className="text-[10px] text-emerald-600 block">Terselesaikan</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>SLA Rata-rata: {BOKMR_SUMMARY.pengaduanMasyarakat.waktuRataRata} (SP4N LAPOR! & Loket)</span>
            <button
              onClick={() => onOpenFormulaModal(10)}
              className="text-sky-700 hover:text-sky-800 font-semibold hover:underline flex items-center gap-0.5 shrink-0"
            >
              Lihat Unit <FileCode2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
