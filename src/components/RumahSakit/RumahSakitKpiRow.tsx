import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Award,
  Users,
  BedDouble,
  Store,
  HelpCircle,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from 'lucide-react';

interface RumahSakitKpiRowProps {
  realisasiPnbpMiliar: number;
  targetPnbpMiliar: number;
  realisasiBelanjaMiliar: number;
  paguBelanjaMiliar: number;
  nilaiIkm: number;
  totalKunjunganPasien: number;
  nilaiBor: number;
  jumlahTenant: number;
  onExplainKpi?: (kpiId: string) => void;
}

export const RumahSakitKpiRow: React.FC<RumahSakitKpiRowProps> = ({
  realisasiPnbpMiliar,
  targetPnbpMiliar,
  realisasiBelanjaMiliar,
  paguBelanjaMiliar,
  nilaiIkm,
  totalKunjunganPasien,
  nilaiBor,
  jumlahTenant,
  onExplainKpi,
}) => {
  const pnbpPersen = (realisasiPnbpMiliar / targetPnbpMiliar) * 100;
  const belanjaPersen = (realisasiBelanjaMiliar / paguBelanjaMiliar) * 100;
  const sisaPaguMiliar = paguBelanjaMiliar - realisasiBelanjaMiliar;

  return (
    <div className="space-y-2 font-sans">
      {/* Standard Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
              IKHTISAR UTAMA • 4 KPI EKSEKUTIF
            </span>
            <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800">
              INDIKATOR KINERJA UTAMA BLU RSBP BATAM
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
              🏷️ Visualisasi: Executive Scorecard Banner &amp; Radial Progress Metric
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
              Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>REALISASI PNBP</strong>, <strong>REALISASI BELANJA</strong>, <strong>INDEKS KEPUASAN MASYARAKAT (IKM)</strong>, &amp; <strong>TOTAL KUNJUNGAN PASIEN</strong> (Katalog Satu Data RSBP)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* CARD 1: KPI REALISASI PNBP RUMAH SAKIT (DATASET NO. 2) */}
      <div
        id="card-kpi-rsbp-pnbp"
        className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden flex flex-col justify-between"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                DS #2
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Realisasi PNBP RSBP
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
              Rp {realisasiPnbpMiliar.toFixed(2)}{' '}
              <span className="text-xs font-semibold text-slate-500">M</span>
            </h3>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('rsbp_pnbp')}
              className="text-[10px] text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 font-medium cursor-pointer"
              title="Penjelasan Formula & Atribut Satu Data"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Formula</span>
            </button>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Target RBA (DIPA):</span>
            <span className="font-semibold text-slate-800">Rp {targetPnbpMiliar.toFixed(2)} M</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Rasio Capaian:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
              {pnbpPersen.toFixed(1)}% (Sangat Baik)
            </span>
          </div>
          {/* Mini progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(pnbpPersen, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* CARD 2: KPI REALISASI BELANJA RUMAH SAKIT (DATASET NO. 12) */}
      <div
        id="card-kpi-rsbp-belanja"
        className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden flex flex-col justify-between"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-blue-50 text-blue-700 border border-blue-200">
                DS #12
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Realisasi Belanja RSBP
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
              Rp {realisasiBelanjaMiliar.toFixed(2)}{' '}
              <span className="text-xs font-semibold text-slate-500">M</span>
            </h3>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('rsbp_belanja')}
              className="text-[10px] text-blue-700 hover:text-blue-900 flex items-center gap-0.5 font-medium cursor-pointer"
              title="Penjelasan Formula & Atribut Satu Data"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Formula</span>
            </button>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Pagu DIPA Belanja:</span>
            <span className="font-semibold text-slate-800">Rp {paguBelanjaMiliar.toFixed(2)} M</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Serapan / Sisa Pagu:</span>
            <span className="font-bold text-blue-700">
              {belanjaPersen.toFixed(1)}% • Sisa Rp {sisaPaguMiliar.toFixed(2)} M
            </span>
          </div>
          {/* Mini progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(belanjaPersen, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* CARD 3: KPI IKM LAYANAN RUMAH SAKIT (DATASET NO. 1) */}
      <div
        id="card-kpi-rsbp-ikm"
        className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden flex flex-col justify-between"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-amber-50 text-amber-700 border border-amber-200">
                DS #1
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Indeks Kepuasan (IKM)
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {nilaiIkm.toFixed(2)}
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Mutu A (Sangat Baik)
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('rsbp_ikm')}
              className="text-[10px] text-amber-700 hover:text-amber-900 flex items-center gap-0.5 font-medium cursor-pointer"
              title="Penjelasan Formula & 9 Unsur Pelayanan"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Formula</span>
            </button>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Standar PermenPAN-RB:</span>
            <span className="font-semibold text-slate-800">No. 14 Tahun 2017</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Skor Tertinggi Nakes:</span>
            <span className="font-bold text-emerald-700">91,5 (Kompetensi Dokter)</span>
          </div>
          {/* Mini progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(nilaiIkm / 100) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* CARD 4: KPI JUMLAH KUNJUNGAN PASIEN RS BP (DATASET NO. 6 & 5) */}
      <div
        id="card-kpi-rsbp-kunjungan"
        className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden flex flex-col justify-between"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-purple-50 text-purple-700 border border-purple-200">
                DS #5 & #6
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Total Kunjungan Pasien
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
              {totalKunjunganPasien.toLocaleString('id-ID')}{' '}
              <span className="text-xs font-semibold text-slate-500">Pasien</span>
            </h3>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('rsbp_kunjungan')}
              className="text-[10px] text-purple-700 hover:text-purple-900 flex items-center gap-0.5 font-medium cursor-pointer"
              title="Penjelasan Formula & Atribut Satu Data"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Formula</span>
            </button>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Pangsa BPJS Kesehatan:</span>
            <span className="font-semibold text-slate-800">65,9% (121.660 Pasien)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Layanan Unggulan (DS-6):</span>
            <span className="font-bold text-purple-700">38.450 Kasus Terlayani</span>
          </div>
          {/* Secondary stats pill */}
          <div className="flex items-center justify-between pt-0.5 text-[10px] text-slate-500">
            <span>BOR: <strong className="text-slate-700">{nilaiBor}%</strong></span>
            <span>Tenant: <strong className="text-slate-700">{jumlahTenant} Mitra</strong></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
