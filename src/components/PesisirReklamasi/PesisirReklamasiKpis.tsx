import React from 'react';
import {
  Waves,
  Clock,
  AlertCircle,
  TrendingUp,
  Info,
  CheckCircle2,
  MapPin,
  FileCheck,
} from 'lucide-react';
import { KPI_PESISIR_REKLAMASI_DATA } from './pesisirReklamasiData';

interface PesisirReklamasiKpisProps {
  onOpenFormulaModal: (kpiId: string) => void;
}

export const PesisirReklamasiKpis: React.FC<PesisirReklamasiKpisProps> = ({
  onOpenFormulaModal,
}) => {
  const data = KPI_PESISIR_REKLAMASI_DATA;
  const persenTargetLuas = ((data.kpi1_luasIzinInvestasiHa / data.kpi1_targetLuasHa) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 font-sans">
      {/* KPI 1: Luas Izin Pemanfaatan Kawasan Pesisir dan Izin Reklamasi untuk Investasi (Dataset No. 4) */}
      {/* MURNI HANYA LUAS (HA / M²), TANPA NILAI INVESTASI */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                <Waves className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                DATASET NO. 4
              </span>
            </div>
            <button
              onClick={() => onOpenFormulaModal('kpi_luas_izin')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Penjelasan Formula & Atribut Dataset #4"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <h3 className="text-xs font-bold text-slate-900 leading-tight">
            Luas Izin Pemanfaatan Kawasan Pesisir &amp; Izin Reklamasi untuk Investasi
          </h3>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
            Total luasan ruang laut &amp; pulau reklamasi yang telah diterbitkan izin
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {data.kpi1_luasIzinInvestasiHa.toLocaleString('id-ID')}
              </span>
              <span className="text-xs font-bold text-sky-700">Hektar (Ha)</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
              Setara <strong>{(data.kpi1_luasIzinInvestasiHa * 10000).toLocaleString('id-ID')} m²</strong>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
          <span className="text-slate-600">
            Rata-rata: <strong className="text-slate-800 font-mono">{data.kpi1_rataRataLuasHa} Ha/Izin</strong>
          </span>
          <span className="font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
            {data.kpi1_totalIzinTerbit} Izin PKKPRL
          </span>
        </div>
      </div>

      {/* KPI 2: Persentase Perizinan Pesisir dan Reklamasi yang Selesai Tepat Waktu (Dataset No. 3) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                DATASET NO. 3
              </span>
            </div>
            <button
              onClick={() => onOpenFormulaModal('kpi_tepat_waktu')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Penjelasan Formula & Atribut Dataset #3"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <h3 className="text-xs font-bold text-slate-900 leading-tight">
            Persentase Perizinan Pesisir &amp; Reklamasi Selesai Tepat Waktu
          </h3>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
            Kepatuhan SLA penyelesaian verifikasi teknis perizinan ruang laut
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {data.kpi2_persenTepatWaktu.toFixed(1)}%
              </span>
              <span className="text-xs font-bold text-emerald-700">Tepat Waktu</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              <strong>{data.kpi2_totalTepatWaktu}</strong> dari {data.kpi2_totalPerizinanSelesai} Berkas Terlayani
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
          <span className="text-slate-600">
            Total Luasan: <strong className="text-slate-800 font-mono">{data.kpi2_totalLuasanHa.toLocaleString('id-ID')} Ha</strong>
          </span>
          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Rata SLA: {data.kpi2_rataRataSlaHari} Hari
          </span>
        </div>
      </div>

      {/* KPI 3: Persentase Penyelesaian Permasalahan Pesisir dan Reklamasi (Dataset No. 1) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                DATASET NO. 1
              </span>
            </div>
            <button
              onClick={() => onOpenFormulaModal('kpi_masalah')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Penjelasan Formula & Atribut Dataset #1"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <h3 className="text-xs font-bold text-slate-900 leading-tight">
            Persentase Penyelesaian Permasalahan Pesisir &amp; Reklamasi
          </h3>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
            Penyelesaian konflik batas laut, deviasi reklamasi &amp; sempadan pantai
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {data.kpi3_persenPenyelesaianMasalah.toFixed(1)}%
              </span>
              <span className="text-xs font-bold text-amber-700">Terselesaikan</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              <strong>{data.kpi3_kasusSelesai}</strong> dari {data.kpi3_totalKasus} Kasus Aduan Tuntas
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
          <span className="text-slate-600">
            Luas Ditangani: <strong className="text-slate-800 font-mono">{data.kpi3_totalLuasTerdampakHa} Ha</strong>
          </span>
          <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            {data.kpi3_kasusProses} Dalam Proses
          </span>
        </div>
      </div>

      {/* KPI 4: Rencana Pemanfaatan Wilayah Pesisir dan Reklamasi (Dataset No. 2 - Data Spasial) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                DATASET NO. 2 (SPASIAL)
              </span>
            </div>
            <button
              onClick={() => onOpenFormulaModal('kpi_spasial_rencana')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Penjelasan Formula & Atribut Dataset #2"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <h3 className="text-xs font-bold text-slate-900 leading-tight">
            Rencana Pemanfaatan Wilayah Pesisir &amp; Reklamasi (Spasial)
          </h3>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
            Alokasi zonasi ruang laut terpetakan berdasarkan koordinat geodetik
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {data.kpi4_totalRencanaLuasHa.toLocaleString('id-ID')}
              </span>
              <span className="text-xs font-bold text-indigo-700">Hektar Rencana</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Tersebar di <strong>{data.kpi4_totalRencanaTitik} Titik Koordinat</strong> Ruang Laut
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
          <span className="text-slate-600">
            Rekomendasi: <strong className="text-slate-800">PKKPRL BPSPL</strong>
          </span>
          <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            Sesuai RTRW Laut
          </span>
        </div>
      </div>
    </div>
  );
};
