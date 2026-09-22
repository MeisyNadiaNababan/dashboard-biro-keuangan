import React from 'react';
import {
  TrendingUp,
  Plane,
  Users,
  Package,
  ArrowUpRight,
  Gauge,
  Calendar,
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
            Satu Data Hal 11 - 12 (Dataset #1, #2, #5 &amp; Standar ICAO)
          </span>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Periode Audit 2025 / Estimasi Berjalan 2026</span>
        </div>
      </div>

      {/* 5 PRIMARY KPI HERO CARDS - SERAGAM, BERSIH & EKSEKUTIF */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* KPI 1: REALISASI PNBP BANDARA (DATASET NO 1) */}
        <div
          id="kpi-pnbp-bandara"
          className="relative overflow-hidden bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200 shadow-2xs hover:border-amber-300 hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[9.5px] font-bold tracking-wider uppercase px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
                DATASET NO. 1
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10.5px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  +9,6%
                </span>
                <button
                  onClick={() => onOpenFormulaModal('pnbp')}
                  className="p-1 text-slate-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                  title="Lihat Formula PNBP"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-xs font-semibold text-slate-600 mb-1">
              Realisasi PNBP Bandara
            </h3>

            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                Rp 312,45 M
              </span>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                {CAPAIAN_TOTAL_PNBP_PERSEN}%
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3 line-clamp-2">
              Total penerimaan IDR dari target anggaran Rp 285 Miliar (PJP2U, PJP4U &amp; EMPU Kargo).
            </p>
          </div>

          <div className="space-y-2 pt-2.5 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Target DIPA:</span>
              <span className="font-semibold text-slate-700">{formatIDR(TOTAL_ANGGARAN_PNBP)}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Realisasi Kas:</span>
              <span className="font-bold text-emerald-700">{formatIDR(TOTAL_REALISASI_PNBP)}</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(CAPAIAN_TOTAL_PNBP_PERSEN, 100)}%` }}
              />
            </div>

            <button
              onClick={() => onOpenFormulaModal('pnbp')}
              className="w-full mt-2 py-1.5 text-[10.5px] text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100/70 rounded-lg border border-amber-200 flex items-center justify-center gap-1 transition-colors font-medium cursor-pointer"
            >
              <span>Formula PNBP</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* KPI 2: TOTAL PENERBANGAN (DATASET NO 2) */}
        <div
          id="kpi-total-penerbangan"
          className="relative overflow-hidden bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[9.5px] font-bold tracking-wider uppercase px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                DATASET NO. 2
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10.5px] text-sky-700 font-semibold bg-sky-50 px-1.5 py-0.5 rounded-full border border-sky-100 flex items-center gap-0.5">
                  <Plane className="w-3 h-3" />
                  ~105 Fl/Hari
                </span>
                <button
                  onClick={() => onOpenFormulaModal('flights')}
                  className="p-1 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                  title="Lihat Formula Penerbangan"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-xs font-semibold text-slate-600 mb-1">
              Total Penerbangan Pesawat
            </h3>

            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {formatNumber(TOTAL_PENERBANGAN_TAHUNAN)}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">Pergerakan A/D</span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3 line-clamp-2">
              Arus lalu lintas pesawat landing &amp; take-off (Arrival &amp; Departure, Domestik &amp; Intl).
            </p>
          </div>

          <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-1.5 text-center text-xs">
              <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                <div className="text-[9.5px] text-slate-500">Datang (Arr)</div>
                <div className="font-bold text-slate-800 text-[11px] font-mono">{formatNumber(TOTAL_PENERBANGAN_ARRIVAL)}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                <div className="text-[9.5px] text-slate-500">Berangkat (Dep)</div>
                <div className="font-bold text-slate-800 text-[11px] font-mono">{formatNumber(TOTAL_PENERBANGAN_DEPARTURE)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10.5px] text-slate-600 pt-0.5">
              <span>Dom: <strong>{formatNumber(TOTAL_PENERBANGAN_DOMESTIK)}</strong></span>
              <span>Intl: <strong>{formatNumber(TOTAL_PENERBANGAN_INTERNASIONAL)}</strong></span>
            </div>

            <button
              onClick={() => onOpenFormulaModal('flights')}
              className="w-full mt-2 py-1.5 text-[10.5px] text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100/70 rounded-lg border border-blue-200 flex items-center justify-center gap-1 transition-colors font-medium cursor-pointer"
            >
              <span>Formula Penerbangan</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* KPI 3: TOTAL PENUMPANG BANDARA (DATASET NO 2) */}
        <div
          id="kpi-total-penumpang"
          className="relative overflow-hidden bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[9.5px] font-bold tracking-wider uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                DATASET NO. 2
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10.5px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5">
                  <Users className="w-3 h-3" />
                  4,86 Juta Pax
                </span>
                <button
                  onClick={() => onOpenFormulaModal('passengers')}
                  className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                  title="Lihat Formula Penumpang"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-xs font-semibold text-slate-600 mb-1">
              Total Penumpang Bandara
            </h3>

            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {formatNumber(TOTAL_PENUMPANG_TAHUNAN)}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">Pax</span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3 line-clamp-2">
              Arus penumpang datang, berangkat, dan transit domestik serta internasional di terminal.
            </p>
          </div>

          <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
            <div className="grid grid-cols-3 gap-1 text-center text-xs">
              <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                <div className="text-[9px] text-slate-500">Datang</div>
                <div className="font-bold text-slate-800 text-[10.5px] font-mono">2,38M</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                <div className="text-[9px] text-slate-500">Berangkat</div>
                <div className="font-bold text-slate-800 text-[10.5px] font-mono">2,41M</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                <div className="text-[9px] text-slate-500">Transit</div>
                <div className="font-bold text-slate-800 text-[10.5px] font-mono">64,8k</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10.5px] text-slate-600 pt-0.5">
              <span>Dewasa: <strong>88,4%</strong></span>
              <span>Anak &amp; Bayi: <strong>11,6%</strong></span>
            </div>

            <button
              onClick={() => onOpenFormulaModal('passengers')}
              className="w-full mt-2 py-1.5 text-[10.5px] text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 rounded-lg border border-emerald-200 flex items-center justify-center gap-1 transition-colors font-medium cursor-pointer"
            >
              <span>Formula Penumpang</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* KPI 4: RATA-RATA SEAT LOAD FACTOR (SLF) - BARU (SEPERTI YANG LAIN) */}
        <div
          id="kpi-seat-load-factor"
          className="relative overflow-hidden bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[9.5px] font-bold tracking-wider uppercase px-2 py-0.5 bg-sky-50 text-sky-800 border border-sky-200 rounded-full">
                STANDAR ICAO
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10.5px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5">
                  <Gauge className="w-3 h-3" />
                  Optimal (&gt;75%)
                </span>
                <button
                  onClick={() => onOpenFormulaModal('slf')}
                  className="p-1 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                  title="Lihat Formula SLF"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-xs font-semibold text-slate-600 mb-1">
              Rata-rata Seat Load Factor (SLF)
            </h3>

            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {AVERAGE_SEAT_LOAD_FACTOR}%
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                +9,6% vs Target
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3 line-clamp-2">
              Okupansi kursi penumpang, rasio keterisian kursi maskapai di atas batas efisiensi ICAO (75%).
            </p>
          </div>

          <div className="space-y-2 pt-2.5 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Rute Domestik:</span>
              <span className="font-semibold text-slate-800 font-mono">85,2% SLF</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Rute Internasional:</span>
              <span className="font-bold text-sky-700 font-mono">78,4% SLF</span>
            </div>

            {/* Progress bar SLF */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-gradient-to-r from-sky-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${AVERAGE_SEAT_LOAD_FACTOR}%` }}
              />
            </div>

            <button
              onClick={() => onOpenFormulaModal('slf')}
              className="w-full mt-2 py-1.5 text-[10.5px] text-sky-800 hover:text-sky-900 bg-sky-50 hover:bg-sky-100/70 rounded-lg border border-sky-200 flex items-center justify-center gap-1 transition-colors font-medium cursor-pointer"
            >
              <span>Formula SLF</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* KPI 5: VOLUME KARGO UDARA (EMPU) - BARU (SEPERTI YANG LAIN) */}
        <div
          id="kpi-volume-kargo"
          className="relative overflow-hidden bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[9.5px] font-bold tracking-wider uppercase px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full">
                DATASET NO. 5
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10.5px] text-indigo-700 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded-full border border-indigo-100 flex items-center gap-0.5">
                  <Package className="w-3 h-3" />
                  Logistik Kargo
                </span>
                <button
                  onClick={() => onOpenFormulaModal('cargo')}
                  className="p-1 text-slate-400 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                  title="Lihat Formula Kargo EMPU"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-xs font-semibold text-slate-600 mb-1">
              Volume Kargo Udara (EMPU)
            </h3>

            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {formatNumber(TOTAL_KARGO_TON)}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">Ton</span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3 line-clamp-2">
              Dataset #5 Logistik Kargo, total volume Ekspedisi Muatan Pesawat Udara masuk &amp; keluar Batam.
            </p>
          </div>

          <div className="space-y-2 pt-2.5 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Kargo Masuk (Inbound):</span>
              <span className="font-semibold text-slate-800 font-mono">24.850 Ton</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Kargo Keluar (Outbound):</span>
              <span className="font-bold text-indigo-700 font-mono">21.430 Ton</span>
            </div>

            {/* Progress bar Kargo */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: '88%' }}
              />
            </div>

            <button
              onClick={() => onOpenFormulaModal('cargo')}
              className="w-full mt-2 py-1.5 text-[10.5px] text-indigo-800 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/70 rounded-lg border border-indigo-200 flex items-center justify-center gap-1 transition-colors font-medium cursor-pointer"
            >
              <span>Formula Kargo EMPU</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
