import React from 'react';
import {
  ShieldCheck,
  AlertOctagon,
  FileCheck2,
  FileText,
  Info,
  TrendingUp,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  KPI_PENGAWASAN_DATA,
  KPI_EVALUASI_PEMBATALAN_DATA,
  KPI_PELAKSANAAN_DOKUMEN_DATA,
  KPI_REKOMENDASI_PEMBARUAN_DATA,
} from './pengendalianData';

interface PengendalianLahanKpisProps {
  onOpenFormulaModal: (kpiId: string) => void;
}

export const PengendalianLahanKpis: React.FC<PengendalianLahanKpisProps> = ({
  onOpenFormulaModal,
}) => {
  const kpi1 = KPI_PENGAWASAN_DATA;
  const kpi2 = KPI_EVALUASI_PEMBATALAN_DATA;
  const kpi3 = KPI_PELAKSANAAN_DOKUMEN_DATA;
  const kpi4 = KPI_REKOMENDASI_PEMBARUAN_DATA;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 font-sans">
      {/* ====================================================================
          KPI 1: PENGAWASAN & PENGENDALIAN LAHAN, PESISIR DAN REKLAMASI (DATASET #1)
         ==================================================================== */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-2.5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          {/* Top Bar: Icon, Tag & Formula Link */}
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-5 h-5 rounded bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                <ShieldCheck className="w-3 h-3" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                DATASET #1
              </span>
              <span className="text-[10px] text-slate-400 truncate">Satu Data Hal. 11</span>
            </div>
            <button
              onClick={() => onOpenFormulaModal('kpi_pengawasan')}
              className="p-0.5 rounded text-slate-400 hover:text-sky-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              title="Lihat Formula & Panduan Tableau Dataset #1"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Compact Title & Subtitle */}
          <h4
            className="text-xs font-bold text-slate-900 leading-tight truncate"
            title={kpi1.namaKpi}
          >
            Pengawasan Lahan &amp; Pesisir
          </h4>
          <p className="text-[10px] text-slate-500 leading-tight truncate mt-0.5">
            Realisasi objek diawasi vs target
          </p>

          {/* Numbers Display */}
          <div className="flex items-baseline justify-between gap-1.5 my-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-mono text-slate-900 tracking-tight">
                {kpi1.persentase.toFixed(1)}%
              </span>
              <span className="text-[9.5px] font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200 flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" />
                Tercapai
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {kpi1.realisasiObjek}/{kpi1.targetObjek}
            </span>
          </div>

          {/* Mini Progress Bar */}
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-1">
            <div
              className="bg-sky-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, kpi1.persentase)}%` }}
            />
          </div>
        </div>

        {/* Compact Footer */}
        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <span className="truncate">3 Zona Pengawasan</span>
          <span className="text-sky-700 font-semibold font-mono">{kpi1.realisasiObjek} Objek</span>
        </div>
      </div>

      {/* ====================================================================
          KPI 2: TINDAKAN EVALUASI DAN PEMBATALAN ALOKASI (DATASET #2)
         ==================================================================== */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-2.5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-5 h-5 rounded bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <AlertOctagon className="w-3 h-3" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                DATASET #2
              </span>
              <span className="text-[10px] text-slate-400 truncate">Penertiban Lahan</span>
            </div>
            <button
              onClick={() => onOpenFormulaModal('kpi_evaluasi_pembatalan')}
              className="p-0.5 rounded text-slate-400 hover:text-amber-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              title="Lihat Formula & Panduan Tableau Dataset #2"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <h4
            className="text-xs font-bold text-slate-900 leading-tight truncate"
            title={kpi2.namaKpi}
          >
            Evaluasi &amp; Pembatalan Lahan
          </h4>
          <p className="text-[10px] text-slate-500 leading-tight truncate mt-0.5">
            Penyelesaian kasus lahan wanprestasi
          </p>

          <div className="flex items-baseline justify-between gap-1.5 my-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-mono text-slate-900 tracking-tight">
                {kpi2.persentase.toFixed(1)}%
              </span>
              <span className="text-[9.5px] font-semibold text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200 flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" />
                162 Ditindak
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {kpi2.realisasiKasus}/{kpi2.targetKasus}
            </span>
          </div>

          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-1">
            <div
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, kpi2.persentase)}%` }}
            />
          </div>
        </div>

        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <span className="truncate">Kembali ke BP:</span>
          <span className="text-emerald-700 font-bold font-mono">
            {kpi2.luasLahanDiselamatkanHa} Ha
          </span>
        </div>
      </div>

      {/* ====================================================================
          KPI 3: PELAKSANAAN KEGIATAN DOKUMEN LAHAN (DATASET #3)
         ==================================================================== */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-2.5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-5 h-5 rounded bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                <FileCheck2 className="w-3 h-3" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                DATASET #3
              </span>
              <span className="text-[10px] text-slate-400 truncate">Dokumen Teknis</span>
            </div>
            <button
              onClick={() => onOpenFormulaModal('kpi_dokumen')}
              className="p-0.5 rounded text-slate-400 hover:text-indigo-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              title="Lihat Formula & Panduan Tableau Dataset #3"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <h4
            className="text-xs font-bold text-slate-900 leading-tight truncate"
            title={kpi3.namaKpi}
          >
            Kegiatan Dokumen Lahan
          </h4>
          <p className="text-[10px] text-slate-500 leading-tight truncate mt-0.5">
            BAPL, verifikasi reklamasi &amp; sempadan
          </p>

          <div className="flex items-baseline justify-between gap-1.5 my-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-mono text-slate-900 tracking-tight">
                {kpi3.persentase.toFixed(1)}%
              </span>
              <span className="text-[9.5px] font-semibold text-indigo-700 bg-indigo-50 px-1 py-0.2 rounded border border-indigo-200 flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" />
                342 Sah
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {kpi3.realisasiDokumen}/{kpi3.targetDokumen}
            </span>
          </div>

          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-1">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, kpi3.persentase)}%` }}
            />
          </div>
        </div>

        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <span className="flex items-center gap-1 truncate">
            <Clock className="w-3 h-3 text-slate-400 shrink-0" /> SLA:
          </span>
          <span className="text-indigo-700 font-bold font-mono">
            {kpi3.rataRataSlaHari} Hari (Target {kpi3.targetSlaHari})
          </span>
        </div>
      </div>

      {/* ====================================================================
          KPI 4: PEMBERIAN REKOMENDASI PERPANJANGAN & PERALIHAN (DATASET #4)
         ==================================================================== */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-2.5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-5 h-5 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <FileText className="w-3 h-3" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                DATASET #4
              </span>
              <span className="text-[10px] text-slate-400 truncate">Rekomendasi Hak</span>
            </div>
            <button
              onClick={() => onOpenFormulaModal('kpi_rekomendasi')}
              className="p-0.5 rounded text-slate-400 hover:text-emerald-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              title="Lihat Formula & Panduan Tableau Dataset #4"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <h4
            className="text-xs font-bold text-slate-900 leading-tight truncate"
            title={kpi4.namaKpi}
          >
            Rekomendasi Hak &amp; Peralihan
          </h4>
          <p className="text-[10px] text-slate-500 leading-tight truncate mt-0.5">
            Verifikasi lapangan pra-penerbitan izin
          </p>

          <div className="flex items-baseline justify-between gap-1.5 my-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-mono text-slate-900 tracking-tight">
                {kpi4.persentase.toFixed(1)}%
              </span>
              <span className="text-[9.5px] font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200 flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" />
                494 Selesai
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {kpi4.totalRekomendasiSelesai}/{kpi4.totalPermohonanMasuk}
            </span>
          </div>

          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-1">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, kpi4.persentase)}%` }}
            />
          </div>
        </div>

        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <span className="flex items-center gap-1 truncate">
            <Clock className="w-3 h-3 text-slate-400 shrink-0" /> Kecepatan:
          </span>
          <span className="text-emerald-700 font-bold font-mono">
            {kpi4.rataRataSlaHari} Hari (SOP 5 Hari)
          </span>
        </div>
      </div>
    </div>
  );
};
