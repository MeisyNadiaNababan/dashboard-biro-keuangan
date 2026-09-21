import React from 'react';
import {
  TrendingUp,
  Plane,
  Users,
  Package,
  ArrowUpRight,
  Gauge,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  TOTAL_ANGGARAN_PNBP,
  TOTAL_REALISASI_PNBP,
  CAPAIAN_TOTAL_PNBP_PERSEN,
  TOTAL_PENERBANGAN_TAHUNAN,
  TOTAL_PENERBANGAN_ARRIVAL,
  TOTAL_PENERBANGAN_DEPARTURE,
  TOTAL_PENERBANGAN_DOMESTIK,
  TOTAL_PENERBANGAN_INTERNASIONAL,
  TOTAL_PENUMPANG_TAHUNAN,
  TOTAL_PENUMPANG_ARRIVAL,
  TOTAL_PENUMPANG_DEPARTURE,
  TOTAL_PENUMPANG_TRANSIT,
  AVERAGE_SEAT_LOAD_FACTOR,
  TOTAL_KARGO_TON,
} from './bandaraData';

interface BandaraKpisProps {
  onOpenFormulaModal: (metricKeyOrDataset: string | number) => void;
}

export const BandaraKpis: React.FC<BandaraKpisProps> = ({ onOpenFormulaModal }) => {
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('id-ID').format(val);
  };

  return (
    <div className="space-y-4 mb-6 font-sans">
      {/* SECTION HEADER WITH BADGE */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-6 bg-sky-600 rounded-full inline-block" />
          <h2 className="text-base font-bold text-slate-800">
            Indikator Kinerja Utama (IKU) Kebandarudaraan Hang Nadim Batam
          </h2>
          <span className="text-[11px] px-2.5 py-0.5 bg-sky-100 text-sky-800 font-semibold rounded-full border border-sky-200">
            Satu Data Hal 11 (Dataset #1 &amp; #2)
          </span>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Periode Audit 2025 / Estimasi Berjalan 2026</span>
        </div>
      </div>

      {/* 3 PRIMARY KPI HERO CARDS - ALL IN ELEGANT UNIFORM WHITE STYLING */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1: REALISASI PNBP BANDARA (DATASET NO 1) - NOW UNIFORM WHITE STYLED */}
        <div
          id="kpi-pnbp-bandara"
          className="relative overflow-hidden bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-amber-300 hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
                DATASET SATU DATA NO. 1
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  +9,63% Surplus
                </span>
                <button
                  onClick={() => onOpenFormulaModal('pnbp')}
                  className="p-1 text-slate-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                  title="Lihat Formula & Atribut Tableau PNBP"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xs font-semibold text-slate-600 mb-1">
              KPI Realisasi PNBP Kebandarudaraan
            </h3>

            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                Rp 312,45 M
              </span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {CAPAIAN_TOTAL_PNBP_PERSEN}%
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mb-4">
              Total Realisasi IDR dari target anggaran Rp 285,00 Miliar (PJP2U, PJP4U, EMPU Kargo &amp; Konsesi Aset).
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Target Anggaran PNBP:</span>
              <span className="font-semibold text-slate-700">{formatIDR(TOTAL_ANGGARAN_PNBP)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Realisasi Total IDR:</span>
              <span className="font-bold text-emerald-700">{formatIDR(TOTAL_REALISASI_PNBP)}</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(CAPAIAN_TOTAL_PNBP_PERSEN, 100)}%` }}
              />
            </div>

            <button
              onClick={() => onOpenFormulaModal('pnbp')}
              className="w-full mt-2 py-1.5 text-[11px] text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100/70 rounded-lg border border-amber-200 flex items-center justify-center gap-1.5 transition-colors font-medium cursor-pointer"
            >
              <span>Lihat Formula &amp; Atribut Dataset #1</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* KPI 2: TOTAL PENERBANGAN (DATASET NO 2) */}
        <div
          id="kpi-total-penerbangan"
          className="relative overflow-hidden bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                DATASET SATU DATA NO. 2
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-sky-700 font-semibold bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 flex items-center gap-1">
                  <Plane className="w-3 h-3" />
                  ~105 Flight/Hari
                </span>
                <button
                  onClick={() => onOpenFormulaModal('flights')}
                  className="p-1 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                  title="Lihat Formula & Atribut Penerbangan"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xs font-semibold text-slate-600 mb-1">
              KPI Total Penerbangan (Pergerakan Pesawat)
            </h3>

            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                {formatNumber(TOTAL_PENERBANGAN_TAHUNAN)}
              </span>
              <span className="text-xs font-semibold text-slate-500">Pergerakan A/D</span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3">
              Arus lalu lintas pesawat landing &amp; take-off (Arrival, Departure, Domestik &amp; Internasional).
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100">
            {/* Split breakdown Arrival vs Departure */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                <div className="text-[10px] text-slate-500 font-medium">Kedatangan (Arrival)</div>
                <div className="font-bold text-slate-800 text-sm">{formatNumber(TOTAL_PENERBANGAN_ARRIVAL)}</div>
                <div className="text-[10px] text-sky-600 font-medium">49,88% Arus</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                <div className="text-[10px] text-slate-500 font-medium">Keberangkatan (Dep.)</div>
                <div className="font-bold text-slate-800 text-sm">{formatNumber(TOTAL_PENERBANGAN_DEPARTURE)}</div>
                <div className="text-[10px] text-indigo-600 font-medium">50,12% Arus</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <span>Domestik: <strong className="text-slate-800">{formatNumber(TOTAL_PENERBANGAN_DOMESTIK)}</strong></span>
              <span>Internasional: <strong className="text-slate-800">{formatNumber(TOTAL_PENERBANGAN_INTERNASIONAL)}</strong></span>
            </div>

            <button
              onClick={() => onOpenFormulaModal('flights')}
              className="w-full mt-2 py-1.5 text-[11px] text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100/70 rounded-lg border border-blue-200 flex items-center justify-center gap-1.5 transition-colors font-medium cursor-pointer"
            >
              <span>Lihat Formula &amp; Atribut Dataset #2</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* KPI 3: TOTAL PENUMPANG BANDARA (DATASET NO 2) */}
        <div
          id="kpi-total-penumpang"
          className="relative overflow-hidden bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                DATASET SATU DATA NO. 2
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  4,86 Juta Pax
                </span>
                <button
                  onClick={() => onOpenFormulaModal('passengers')}
                  className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                  title="Lihat Formula & Atribut Penumpang"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xs font-semibold text-slate-600 mb-1">
              KPI Total Penumpang Bandara
            </h3>

            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                {formatNumber(TOTAL_PENUMPANG_TAHUNAN)}
              </span>
              <span className="text-xs font-semibold text-slate-500">Penumpang (Pax)</span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3">
              Arus penumpang datang, berangkat, dan transit domestik serta internasional di terminal bandara.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100">
            {/* Breakdown Arrival vs Departure */}
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 text-center">
                <div className="text-[10px] text-slate-500">Datang (Arr)</div>
                <div className="font-bold text-slate-800">{formatNumber(TOTAL_PENUMPANG_ARRIVAL)}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 text-center">
                <div className="text-[10px] text-slate-500">Berangkat (Dep)</div>
                <div className="font-bold text-slate-800">{formatNumber(TOTAL_PENUMPANG_DEPARTURE)}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 text-center">
                <div className="text-[10px] text-slate-500">Transit</div>
                <div className="font-bold text-slate-800">{formatNumber(TOTAL_PENUMPANG_TRANSIT)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <span>Dewasa: <strong className="text-slate-800">88,4%</strong></span>
              <span>Anak: <strong className="text-slate-800">9,8%</strong></span>
              <span>Bayi: <strong className="text-slate-800">1,8%</strong></span>
            </div>

            <button
              onClick={() => onOpenFormulaModal('passengers')}
              className="w-full mt-2 py-1.5 text-[11px] text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 rounded-lg border border-emerald-200 flex items-center justify-center gap-1 font-medium cursor-pointer"
            >
              <span>Lihat Formula &amp; Atribut Manifest Penumpang</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* QUICK HIGHLIGHT STRATEGIC METRICS WITH INTERACTIVE FORMULA POPUPS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* METRIC 1: SEAT LOAD FACTOR (SLF) */}
        <div className="bg-sky-50/70 border border-sky-200/70 rounded-xl p-3 flex items-center justify-between gap-3 group relative">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-600 text-white rounded-lg shadow-2xs">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-600">Rata-rata Seat Load Factor (SLF)</div>
              <div className="text-lg font-bold text-sky-950">{AVERAGE_SEAT_LOAD_FACTOR}%</div>
              <div className="text-[10px] text-slate-500">Okupansi kursi penumpang</div>
            </div>
          </div>
          <button
            onClick={() => onOpenFormulaModal('slf')}
            className="p-1.5 text-sky-600 hover:text-sky-900 hover:bg-sky-200/60 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Lihat Formula Perhitungan SLF"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* METRIC 2: VOLUME KARGO EMPU */}
        <div className="bg-indigo-50/70 border border-indigo-200/70 rounded-xl p-3 flex items-center justify-between gap-3 group relative">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-lg shadow-2xs">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-600">Volume Kargo Udara (EMPU)</div>
              <div className="text-lg font-bold text-indigo-950">{formatNumber(TOTAL_KARGO_TON)} Ton</div>
              <div className="text-[10px] text-slate-500">Dataset #5 Logistik Kargo</div>
            </div>
          </div>
          <button
            onClick={() => onOpenFormulaModal('cargo')}
            className="p-1.5 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-200/60 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Lihat Formula Kargo EMPU"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* METRIC 3: RUTE LANGSUNG POPUP */}
        <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 flex items-center justify-between gap-3 group relative">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-600 text-white rounded-lg shadow-2xs">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-600">Frekuensi Rute Langsung</div>
              <div className="text-lg font-bold text-amber-950">28 Rute Aktif</div>
              <div className="text-[10px] text-slate-500">Dataset #9 Penerbangan Langsung</div>
            </div>
          </div>
          <button
            onClick={() => onOpenFormulaModal('routes')}
            className="p-1.5 text-amber-600 hover:text-amber-900 hover:bg-amber-200/60 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Lihat Formula Kepadatan Trayek Rute"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* METRIC 4: OPERATOR MASKAPAI */}
        <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-3 flex items-center justify-between gap-3 group relative">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-lg shadow-2xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-600">Pangsa Pasar Maskapai</div>
              <div className="text-lg font-bold text-emerald-950">149 SIUP / 9 Aktif</div>
              <div className="text-[10px] text-slate-500">Dataset #10 (PDF Operator)</div>
            </div>
          </div>
          <button
            onClick={() => onOpenFormulaModal('operator_share')}
            className="p-1.5 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-200/60 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Lihat Formula Pangsa Pasar Operator"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
