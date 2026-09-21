import React from 'react';
import {
  FileCheck2,
  PackageCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  DollarSign,
  Building2,
  HelpCircle,
  Factory,
  ShoppingBag,
  ArrowUpRight,
} from 'lucide-react';
import { LLB_PNBP_SUMMARY } from '../../data/laluLintasBarangData';

interface LlbKpiRowProps {
  totalPerizinan?: number;
  totalRealisasiKuotaTon?: number;
  nilaiEkonomiMiliar?: number;
  persenSlaTepatWaktu?: number;
  rataRataWaktuJam?: number;
  onExplainKpi?: (metricId: string) => void;
}

export const LlbKpiRow: React.FC<LlbKpiRowProps> = ({
  totalPerizinan = 1842,
  totalRealisasiKuotaTon = 84060,
  nilaiEkonomiMiliar = 1826.5,
  persenSlaTepatWaktu = 96.8,
  rataRataWaktuJam = 3.5,
  onExplainKpi,
}) => {
  const pnbpRealisasiM = LLB_PNBP_SUMMARY.realisasiYtdRp / 1e9;
  const pnbpTargetM = LLB_PNBP_SUMMARY.targetTahunanRp / 1e9;
  const pnbpCapaian = LLB_PNBP_SUMMARY.persentaseCapaian;

  // Sektor breakdown
  const izinIndustriTotal = 845 + 520; // 1.365
  const izinPerdaganganTotal = 212;
  const izinKawasanTotal = 265;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-4">
      {/* KPI 1: REALISASI PNBP (Sesuai Permintaan Poin 1) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-emerald-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider truncate">
            Realisasi PNBP DLLB
          </span>
          <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-xl font-black font-mono text-emerald-950 tracking-tight">
            Rp {pnbpRealisasiM.toFixed(2)}
          </span>
          <span className="text-[11px] font-bold text-emerald-800">M</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full"
            style={{ width: `${Math.min(pnbpCapaian, 100)}%` }}
          />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
          <span className="text-emerald-700 font-bold font-mono">
            {pnbpCapaian.toFixed(1)}% Capaian
          </span>
          {onExplainKpi ? (
            <button
              onClick={() => onExplainKpi('llb-pnbp')}
              className="text-[#1F4E79] hover:text-blue-900 font-semibold flex items-center gap-0.5 cursor-pointer text-[10px]"
              title="Lihat Rumus & Logika PNBP"
            >
              <span>Target: Rp {pnbpTargetM.toFixed(1)} M</span>
              <HelpCircle className="w-2.5 h-2.5 text-slate-400 ml-0.5" />
            </button>
          ) : (
            <span className="text-slate-400 font-mono text-[10px]">Tgt: Rp {pnbpTargetM.toFixed(1)} M</span>
          )}
        </div>
      </div>

      {/* KPI 2: TOTAL PERIZINAN KESELURUHAN */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-blue-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider truncate">
            Total Perizinan Terbit
          </span>
          <div className="w-6 h-6 rounded-md bg-blue-50 text-[#1F4E79] flex items-center justify-center shrink-0">
            <FileCheck2 className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-xl font-black font-mono text-slate-900 tracking-tight">
            {totalPerizinan.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] font-semibold text-slate-500">Dokumen</span>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-[#1F4E79] rounded-full" style={{ width: '68%' }} />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
          <span className="text-blue-700 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-2.5 h-2.5" />
            +8.4% MoM
          </span>
          {onExplainKpi ? (
            <button
              onClick={() => onExplainKpi('llb-total-izin')}
              className="text-slate-500 hover:text-slate-900 flex items-center gap-0.5 cursor-pointer text-[10px]"
              title="Lihat Rumus Total Izin"
            >
              <span>4 Kategori SK</span>
              <HelpCircle className="w-2.5 h-2.5 text-slate-400" />
            </button>
          ) : (
            <span className="text-slate-400 font-mono text-[10px]">4 Kategori SK</span>
          )}
        </div>
      </div>

      {/* KPI 3: IZIN LLB INDUSTRI (Pemasukan & Pengeluaran - Sesuai Poin 2) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-sky-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider truncate">
            Izin Sektor Industri
          </span>
          <div className="w-6 h-6 rounded-md bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
            <Factory className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-xl font-black font-mono text-slate-900 tracking-tight">
            {izinIndustriTotal.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] font-semibold text-slate-500">SK (74,1%)</span>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden flex">
          <div className="h-full bg-[#1F4E79]" style={{ width: '61.9%' }} title="Masuk: 845" />
          <div className="h-full bg-[#2E75B6]" style={{ width: '38.1%' }} title="Keluar: 520" />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
          <span className="text-slate-600 font-mono text-[10px]">
            Masuk <strong className="text-slate-800">845</strong> | Keluar <strong className="text-slate-800">520</strong>
          </span>
          {onExplainKpi && (
            <button
              onClick={() => onExplainKpi('llb-izin-industri')}
              className="text-[#1F4E79] hover:underline cursor-pointer"
              title="Rumus Izin Industri"
            >
              <HelpCircle className="w-2.5 h-2.5 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* KPI 4: IZIN LLB PERDAGANGAN & KUOTA KONSUMSI (Sesuai Poin 2) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-amber-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider truncate">
            Izin Perdagangan &amp; Kuota
          </span>
          <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-xl font-black font-mono text-slate-900 tracking-tight">
            {izinPerdaganganTotal}
          </span>
          <span className="text-[11px] font-semibold text-slate-500">Izin Impor</span>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-amber-500 rounded-full" style={{ width: '77.8%' }} />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
          <span className="text-amber-800 font-bold font-mono text-[10px]">
            {(totalRealisasiKuotaTon / 1000).toFixed(1)}k Ton Sembako
          </span>
          {onExplainKpi ? (
            <button
              onClick={() => onExplainKpi('llb-izin-perdagangan')}
              className="text-slate-500 hover:text-slate-900 flex items-center gap-0.5 cursor-pointer text-[10px]"
              title="Lihat Rumus Perdagangan"
            >
              <span>Rp {(nilaiEkonomiMiliar / 1000).toFixed(2)} T</span>
              <HelpCircle className="w-2.5 h-2.5 text-slate-400" />
            </button>
          ) : (
            <span className="text-slate-400 font-mono text-[10px]">Rp {(nilaiEkonomiMiliar / 1000).toFixed(2)} T</span>
          )}
        </div>
      </div>

      {/* KPI 5: IZIN USAHA KAWASAN (IUK) (Sesuai Poin 2) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-teal-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider truncate">
            Izin Usaha Kawasan (IUK)
          </span>
          <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Building2 className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-xl font-black font-mono text-slate-900 tracking-tight">
            {izinKawasanTotal}
          </span>
          <span className="text-[11px] font-semibold text-slate-500">SK Terbit</span>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-teal-600 rounded-full" style={{ width: '85%' }} />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
          <span className="text-teal-800 font-bold font-mono text-[10px]">
            34 Kawasan Industri
          </span>
          {onExplainKpi ? (
            <button
              onClick={() => onExplainKpi('llb-izin-kawasan')}
              className="text-slate-500 hover:text-slate-900 flex items-center gap-0.5 cursor-pointer text-[10px]"
              title="Lihat Rumus IUK"
            >
              <span>1.420 Ha</span>
              <HelpCircle className="w-2.5 h-2.5 text-slate-400" />
            </button>
          ) : (
            <span className="text-slate-400 font-mono text-[10px]">1.420 Ha</span>
          )}
        </div>
      </div>

      {/* KPI 6: KEPATUHAN SLA & RATA-RATA WAKTU (JAM) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-teal-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider truncate">
            SLA &amp; Waktu Layanan
          </span>
          <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-xl font-black font-mono text-teal-700 tracking-tight">
            {persenSlaTepatWaktu.toFixed(1)}%
          </span>
          <span className="text-[11px] font-bold text-slate-600 font-mono">
            ({rataRataWaktuJam.toFixed(1)} Jam)
          </span>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-teal-600 rounded-full" style={{ width: `${persenSlaTepatWaktu}%` }} />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
          <span className="text-emerald-700 font-semibold flex items-center gap-0.5 text-[10px]">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Target &ge;95% Terlampaui
          </span>
          {onExplainKpi ? (
            <button
              onClick={() => onExplainKpi('llb-sla')}
              className="text-[#1F4E79] hover:underline flex items-center gap-0.5 cursor-pointer text-[10px]"
              title="Lihat Rumus SLA"
            >
              <HelpCircle className="w-2.5 h-2.5 text-slate-400" />
            </button>
          ) : (
            <span className="text-slate-400 text-[10px]">Maks 6 Jam</span>
          )}
        </div>
      </div>
    </div>
  );
};

