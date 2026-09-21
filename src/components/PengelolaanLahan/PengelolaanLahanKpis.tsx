import React from 'react';
import {
  MapPin,
  DollarSign,
  Info,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { ALOKASI_LAHAN_INVESTASI_DATA, TARGET_PENERIMAAN_PNBP_LAHAN } from './lahanData';

interface PengelolaanLahanKpisProps {
  totalSwpPersil: number;
  totalSwpHa: number;
  onExplainKpi?: (kpiId: string) => void;
}

export const PengelolaanLahanKpis: React.FC<PengelolaanLahanKpisProps> = ({
  totalSwpPersil,
  totalSwpHa,
  onExplainKpi,
}) => {
  const alokasi = ALOKASI_LAHAN_INVESTASI_DATA;
  const pnbp = TARGET_PENERIMAAN_PNBP_LAHAN;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans">
      {/* KPI 1: LUAS LAHAN YANG DIALOKASIKAN UNTUK INVESTASI (DATASET NO. 14) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-all relative flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    DATASET #14
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Investasi Strategis</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">Luas Lahan Dialokasikan</h4>
              </div>
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('lahan_luas_alokasi')}
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
              title="Lihat Formula Perhitungan KPI #14"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {alokasi.totalLuasAlokasiHa.toLocaleString('id-ID')}
              </span>
              <span className="text-xs font-bold text-sky-700">Hektar (Ha)</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-0.5">
              ({alokasi.totalLuasAlokasiM2.toLocaleString('id-ID')} m²)
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1 text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{alokasi.permohonanDisetujui} Alokasi Disetujui</span>
          </div>
          <span className="text-slate-500">
            Nilai: <strong className="text-slate-800">Rp 34,85 T</strong>
          </span>
        </div>
      </div>

      {/* KPI 2: TOTAL LAHAN TERSEDIA DI SUB WILAYAH PENGEMBANGAN (SWP - DATASET NO. 15) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-all relative flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    DATASET #15
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">8 Sub Wilayah</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">Lahan Tersedia SWP</h4>
              </div>
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('lahan_swp_tersedia')}
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
              title="Lihat Formula Perhitungan Ketersediaan SWP #15"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {totalSwpHa.toLocaleString('id-ID')}
              </span>
              <span className="text-xs font-bold text-emerald-700">Hektar (Ha)</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
              <span>Total Persil Siap Bangun: <strong className="text-slate-800">{totalSwpPersil} Persil</strong></span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">Kawasan Industri &amp; Komersial</span>
          <span className="text-emerald-700 font-medium">Siap Alokasi</span>
        </div>
      </div>

      {/* KPI 3: REALISASI PENERIMAAN PNBP PENGELOLAAN TANAH (DATASET NO. 12) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-all relative flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    DATASET #12
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">PNBP UWT &amp; Faktur</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">Realisasi PNBP Lahan</h4>
              </div>
            </div>
            <button
              onClick={() => onExplainKpi && onExplainKpi('lahan_target_pnbp')}
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
              title="Lihat Formula Perhitungan PNBP Lahan #12"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                Rp {(pnbp.realisasiPnbpRp / 1000000000).toFixed(1)}
              </span>
              <span className="text-xs font-bold text-amber-700">Miliar</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
              <span>Target: Rp {(pnbp.targetPnbpRp / 1000000000).toFixed(0)} M</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">{pnbp.capaianPersen}% Capaian</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">Status Capaian:</span>
          <span className="text-emerald-700 font-semibold">Tercapai &gt; 95%</span>
        </div>
      </div>
    </div>
  );
};
