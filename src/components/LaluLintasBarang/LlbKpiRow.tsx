import React from 'react';
import {
  FileCheck2,
  PackageCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Building2,
  HelpCircle,
  Factory,
  ShoppingBag,
  ArrowDownToLine,
  ArrowUpFromLine,
  Layers,
} from 'lucide-react';
import {
  REKAP_LAYANAN_INDUSTRI_PERDAGANGAN,
  REKAP_IZIN_USAHA_KAWASAN_BULANAN,
  REKAP_IZIN_PEMASUKAN_BULANAN,
  REKAP_IZIN_PENGELUARAN_BULANAN,
  DATA_SLA_PERDAGANGAN,
  DATA_SLA_INDUSTRI,
} from '../../data/laluLintasBarangData';

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
  onExplainKpi,
}) => {
  // Aggregate real numbers from datasets
  const totalIuk = REKAP_IZIN_USAHA_KAWASAN_BULANAN.reduce((a, b) => a + b.totalTahunan, 0); // 265
  const totalPemasukan = REKAP_IZIN_PEMASUKAN_BULANAN.reduce((a, b) => a + b.totalTahunan, 0); // 1.522
  const totalPengeluaran = REKAP_IZIN_PENGELUARAN_BULANAN.reduce((a, b) => a + b.totalTahunan, 0); // 835

  const totalIndustri = REKAP_LAYANAN_INDUSTRI_PERDAGANGAN.filter((i) => i.bagian === 'Industri').reduce(
    (a, b) => a + b.jumlah,
    0
  ); // 1.365
  const totalPerdagangan = REKAP_LAYANAN_INDUSTRI_PERDAGANGAN.filter((i) => i.bagian === 'Perdagangan').reduce(
    (a, b) => a + b.jumlah,
    0
  ); // 477

  const avgSlaIndustri =
    Math.round(
      (DATA_SLA_INDUSTRI.reduce((a, b) => a + b.persentaseLayananTepatWaktu, 0) /
        DATA_SLA_INDUSTRI.length) *
        10
    ) / 10; // 96.7%

  const avgJamIndustri =
    Math.round(
      (DATA_SLA_INDUSTRI.reduce((a, b) => a + b.rataRataWaktuPenyelesaianDokumenJam, 0) /
        DATA_SLA_INDUSTRI.length) *
        10
    ) / 10; // 3.3 Jam

  const avgSlaPerdagangan =
    Math.round(
      (DATA_SLA_PERDAGANGAN.reduce((a, b) => a + b.persentaseLayananTepatWaktu, 0) /
        DATA_SLA_PERDAGANGAN.length) *
        10
    ) / 10; // 96.0%

  const avgJamPerdagangan =
    Math.round(
      (DATA_SLA_PERDAGANGAN.reduce((a, b) => a + b.rataRataWaktuPenyelesaianDokumenJam, 0) /
        DATA_SLA_PERDAGANGAN.length) *
        10
    ) / 10; // 3.9 Jam

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-4">
      {/* KPI 1: TOTAL PENERBITAN IZIN LLB (INDUSTRI & PERDAGANGAN - Dataset No. 3) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-blue-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
            Total Izin LLB (DS 3)
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

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden flex">
          <div className="h-full bg-[#1F4E79]" style={{ width: '74%' }} title="Industri: 1.365" />
          <div className="h-full bg-amber-500" style={{ width: '26%' }} title="Perdagangan: 477" />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span className="text-slate-600 font-mono">
            Ind: <strong>{totalIndustri}</strong> | Dag: <strong>{totalPerdagangan}</strong>
          </span>
          {onExplainKpi && (
            <button
              onClick={() => onExplainKpi('llb-total-izin')}
              className="text-[#1F4E79] hover:underline cursor-pointer"
              title="Rumus Total Izin LLB"
            >
              <HelpCircle className="w-2.5 h-2.5 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* KPI 2: IZIN USAHA KAWASAN (IUK - Dataset No. 4) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-teal-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
            Izin Usaha Kawasan (DS 4)
          </span>
          <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Building2 className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-xl font-black font-mono text-teal-950 tracking-tight">
            {totalIuk}
          </span>
          <span className="text-[11px] font-semibold text-slate-500">SK Terbit</span>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-teal-600 rounded-full" style={{ width: '85%' }} />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span className="text-teal-800 font-bold font-mono">
            34 Kawasan Industri
          </span>
          <span className="text-slate-400 font-mono text-[9.5px]">22,1 SK/bln</span>
        </div>
      </div>

      {/* KPI 3: PERIZINAN PEMASUKAN BARANG (Inbound - Dataset No. 6) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-blue-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
            Pemasukan Barang (DS 6)
          </span>
          <div className="w-6 h-6 rounded-md bg-sky-50 text-[#1F4E79] flex items-center justify-center shrink-0">
            <ArrowDownToLine className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-xl font-black font-mono text-slate-900 tracking-tight">
            {totalPemasukan.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] font-semibold text-slate-500">SK Terbit</span>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-[#1F4E79] rounded-full" style={{ width: '92%' }} />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span className="text-blue-900 font-bold font-mono">
            Bahan Baku &amp; Mesin
          </span>
          <span className="text-slate-400 font-mono text-[9.5px]">126,8 SK/bln</span>
        </div>
      </div>

      {/* KPI 4: PERIZINAN PENGELUARAN BARANG (Outbound - Dataset No. 7) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-sky-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
            Pengeluaran Barang (DS 7)
          </span>
          <div className="w-6 h-6 rounded-md bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
            <ArrowUpFromLine className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-xl font-black font-mono text-slate-900 tracking-tight">
            {totalPengeluaran.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] font-semibold text-slate-500">SK Terbit</span>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-sky-600 rounded-full" style={{ width: '78%' }} />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span className="text-sky-800 font-bold font-mono">
            Ekspor LDP &amp; TLDDP
          </span>
          <span className="text-slate-400 font-mono text-[9.5px]">69,6 SK/bln</span>
        </div>
      </div>

      {/* KPI 5: % PELAYANAN PERDAGANGAN TEPAT WAKTU (Dataset No. 8) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-amber-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
            SLA Perdagangan (DS 8)
          </span>
          <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-xl font-black font-mono text-amber-950 tracking-tight">
            {avgSlaPerdagangan}%
          </span>
          <span className="text-[10.5px] font-bold text-amber-800 font-mono">
            ({avgJamPerdagangan} Jam)
          </span>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full"
            style={{ width: `${avgSlaPerdagangan}%` }}
          />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span className="text-amber-800 font-bold flex items-center gap-0.5">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
            Target: 8 Jam
          </span>
          <span className="text-slate-400 font-mono text-[9.5px]">5 Jenis Izin</span>
        </div>
      </div>

      {/* KPI 6: % PELAYANAN INDUSTRI TEPAT WAKTU (Dataset No. 9) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm hover:border-emerald-300">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
            SLA Industri (DS 9)
          </span>
          <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Factory className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-xl font-black font-mono text-emerald-950 tracking-tight">
            {avgSlaIndustri}%
          </span>
          <span className="text-[10.5px] font-bold text-emerald-800 font-mono">
            ({avgJamIndustri} Jam)
          </span>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full"
            style={{ width: `${avgSlaIndustri}%` }}
          />
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span className="text-emerald-800 font-bold flex items-center gap-0.5">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
            Target: 6 Jam
          </span>
          <span className="text-slate-400 font-mono text-[9.5px]">6 Jenis Izin</span>
        </div>
      </div>
    </div>
  );
};
