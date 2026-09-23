import React from 'react';
import {
  Home,
  Users,
  ShieldCheck,
  MapPin,
  TrendingUp,
  AlertTriangle,
  FileCheck2,
  ExternalLink,
  Flame,
} from 'lucide-react';
import {
  BANGUNAN_LIAR_SUMMARY,
  TOTAL_PERSONIL_DITPAM,
  TOTAL_GIAT_PENGAMANAN_OBVIT,
  TOTAL_LUAS_PENINDAKAN_HA,
} from './pengamananAsetData';

interface PengamananAsetKpisProps {
  onOpenFormulaModal: (kpiId: string) => void;
}

export const PengamananAsetKpis: React.FC<PengamananAsetKpisProps> = ({ onOpenFormulaModal }) => {
  return (
    <div className="space-y-2 font-sans">
      {/* Standard Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
              POIN #1 SAMPAI #4
            </span>
            <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800">
              INDIKATOR KINERJA UTAMA KOMANDO OPERASIONAL DITPAM BP BATAM
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
              🏷️ Visualisasi: Executive Command Scorecards &amp; Penertiban KPI Gauges
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
              Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>TOTAL BANGUNAN LIAR DITERTIBKAN</strong>, <strong>KEKUATAN PERSONIL DITPAM</strong>, <strong>GIAT PENGAMANAN OBVITNAS</strong>, &amp; <strong>LUAS PENINDAKAN HUTAN (HA)</strong> (Hal. 17)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
      {/* KPI 1: JUMLAH PENERBITAN BANGUNAN LIAR (Dataset No. 1) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between relative group">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              DATASET NO. 1 • SATU DATA
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 font-mono">
              1'030 Total Entri
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
            Jumlah Penerbitan Bangunan Liar
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Hasil penemuan dan penertiban pekerja/pemukim liar di kawasan aset BP Batam.
          </p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
              {BANGUNAN_LIAR_SUMMARY.totalBangunanDitertibkan.toLocaleString('id-ID')}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Unit Ditertibkan
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Home className="w-3.5 h-3.5 text-amber-600" />
            <span>156 Unit Tahap SP 1-3</span>
          </div>
          <button
            onClick={() => onOpenFormulaModal('kpi_bangunan_liar')}
            className="text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Detail Rumus</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* KPI 2: JUMLAH PERSONIL PENGAMANAN (Dataset No. 3) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between relative group">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              DATASET NO. 3 • SATU DATA
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
              Kesiapan 98,2%
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
            Jumlah Personil Pengamanan
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Total kekuatan personil Ditpam aktif, bersertifikasi Gada &amp; kualifikasi SAR.
          </p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
              {TOTAL_PERSONIL_DITPAM.toLocaleString('id-ID')}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Personil Ditpam
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>4 Subdit &amp; 72 Armada Patroli</span>
          </div>
          <button
            onClick={() => onOpenFormulaModal('kpi_personil')}
            className="text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Detail Rumus</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* KPI 3: TOTAL PENGAMANAN LINGKUNGAN, HUTAN, ASET DAN OBJEK VITAL (Dataset No. 12) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between relative group">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              DATASET NO. 12 • SATU DATA
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200 font-mono">
              24/7 Monitoring
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
            Total Pengamanan Objek Vital &amp; Hutan
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Total kegiatan patroli rutin, sterilisasi posko, dan pengamanan lingkungan.
          </p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
              {TOTAL_GIAT_PENGAMANAN_OBVIT.toLocaleString('id-ID')}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Kegiatan Pengamanan
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>7 Objek Vital Kritis BP Batam</span>
          </div>
          <button
            onClick={() => onOpenFormulaModal('kpi_total_pengamanan')}
            className="text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Detail Rumus</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* KPI 4: LUAS DATA PENINDAKAN KAWASAN ASET DAN OBJEK VITAL (Dataset No. 10) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between relative group">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              DATASET NO. 10 • SATU DATA
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 font-mono">
              3.485.000 m²
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
            Luas Data Penindakan Kawasan Aset
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Total luasan kawasan aset BP Batam &amp; DTA waduk yang berhasil disterilisasi.
          </p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
              {TOTAL_LUAS_PENINDAKAN_HA.toLocaleString('id-ID')}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Hektar Diamankan
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span>Rp 1,82 T Potensi Aset Diamankan</span>
          </div>
          <button
            onClick={() => onOpenFormulaModal('kpi_luas_penindakan')}
            className="text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Detail Rumus</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};
