import React, { useState } from 'react';
import {
  Globe2,
  TrendingUp,
  BarChart3,
  Table as TableIcon,
  ArrowDownToLine,
  ArrowUpFromLine,
  Package,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import {
  VOLUME_TONASE_NEGARA_DATA,
  VOLUME_PER_NEGARA_ASAL_SUMMARY,
  TOTAL_VOLUME_ARUS_BARANG,
  VolumeTonaseNegaraItem,
} from '../../data/kepelabuhananData';
import { PelabuhanVisualHeader } from './PelabuhanVisualHeader';

interface PelabuhanArusBarangSheetSwapProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const PelabuhanArusBarangSheetSwap: React.FC<PelabuhanArusBarangSheetSwapProps> = ({
  onOpenFormulaModal,
}) => {
  // SHEET SWAP STATE
  const [activeSheet, setActiveSheet] = useState<'total-negara' | 'tabel-detail'>('total-negara');

  const { totalBongkarTon, totalMuatTon, totalArusTon } = TOTAL_VOLUME_ARUS_BARANG;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs font-sans">
      {/* 1. STANDARDIZED VISUAL HEADER (REQ 9) */}
      <PelabuhanVisualHeader
        datasetNumber={12}
        pdfPages="Hal. 16"
        title="Volume / Tonase Barang Masuk dan Keluar Pelabuhan Batam per Negara Mitra"
        visualName="Sheet Swap - Peringkat Tonase Negara Asal (Horizontal Bar) & Tabel Detail Arus Barang"
        classification="TERTUTUP"
        attributes={['NEGARA ASAL', 'NEGARA TUJUAN', 'VOLUME BONGKAR', 'VOLUME MUAT']}
        rightControls={
          /* SHEET SWAP SELECTOR (REQ 5) */
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveSheet('total-negara')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'total-negara'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Sheet 1: Total Negara Asal</span>
            </button>
            <button
              onClick={() => setActiveSheet('tabel-detail')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'tabel-detail'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Sheet 2: Tabel Detail Ringkas</span>
            </button>
          </div>
        }
        onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('kpi-tonase-barang')}
      />

      {/* 2. SUMMARY METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Total Arus Barang
          </span>
          <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
            {(totalArusTon / 1e6).toFixed(2)} Juta Ton
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Volume Bongkar (Impor/Masuk)
          </span>
          <span className="text-base sm:text-lg font-black text-sky-700 font-mono flex items-center gap-1">
            <ArrowDownToLine className="w-4 h-4 text-sky-600" />
            {(totalBongkarTon / 1e6).toFixed(2)} Juta Ton
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Volume Muat (Ekspor/Keluar)
          </span>
          <span className="text-base sm:text-lg font-black text-emerald-700 font-mono flex items-center gap-1">
            <ArrowUpFromLine className="w-4 h-4 text-emerald-600" />
            {(totalMuatTon / 1e6).toFixed(2)} Juta Ton
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Negara Mitra Utama
          </span>
          <span className="text-base sm:text-lg font-black text-purple-700 font-mono">
            Singapura &amp; Domestik RI
          </span>
        </div>
      </div>

      {/* 3. SHEET SWAP CONTAINER */}
      {activeSheet === 'total-negara' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700">
              Peringkat Arus Tonase Barang Berdasarkan Negara Asal (Volume Bongkar vs Volume Muat)
            </span>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="flex items-center gap-1 text-sky-700 font-bold">
                <span className="w-2.5 h-2.5 rounded bg-sky-600 inline-block" />
                Bongkar (Ton)
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600 inline-block" />
                Muat (Ton)
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            {VOLUME_PER_NEGARA_ASAL_SUMMARY.map((row, idx) => {
              const totalJuta = row.totalTon / 1e6;
              const bongkarJuta = row.bongkarTon / 1e6;
              const muatJuta = row.muatTon / 1e6;
              const maxScale = 9.0; // Max scale in million tons
              const totalWidthPercent = Math.min(100, (totalJuta / maxScale) * 100);
              const bongkarPartPercent = (bongkarJuta / totalJuta) * 100;
              const muatPartPercent = (muatJuta / totalJuta) * 100;

              return (
                <div
                  key={row.negara}
                  className="p-2.5 rounded-lg border border-slate-200/90 bg-white hover:border-sky-300 hover:shadow-2xs transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-mono text-[10px] font-bold text-slate-700">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-900">{row.negara}</span>
                      <span className="text-[10.5px] px-1.5 py-0.2 rounded bg-purple-50 text-purple-800 border border-purple-200 font-mono">
                        {row.porsiPersen}% Porsi
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
                      <span className="text-sky-700 font-semibold">
                        Bongkar: {bongkarJuta.toFixed(2)}M
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-emerald-700 font-semibold">
                        Muat: {muatJuta.toFixed(2)}M
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="font-bold text-slate-900">
                        Total: {totalJuta.toFixed(2)} Juta Ton
                      </span>
                    </div>
                  </div>

                  {/* Dual Segment Stacked Horizontal Bar */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${totalWidthPercent}%` }}
                      className="h-full flex rounded-full overflow-hidden"
                    >
                      <div
                        className="h-full bg-sky-600 transition-all duration-500"
                        style={{ width: `${bongkarPartPercent}%` }}
                        title={`Bongkar: ${bongkarJuta.toFixed(2)} Juta Ton`}
                      />
                      <div
                        className="h-full bg-emerald-600 transition-all duration-500"
                        style={{ width: `${muatPartPercent}%` }}
                        title={`Muat: ${muatJuta.toFixed(2)} Juta Ton`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* TABLE DETAIL RINGKAS (KOLOM PERSIS SESUAI PERMINTAAN USER: NEGARA ASAL, NEGARA TUJUAN, VOLUME BONGKAR, VOLUME MUAT) */
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3">NO</th>
                <th className="py-2.5 px-3">NEGARA ASAL</th>
                <th className="py-2.5 px-3">NEGARA TUJUAN</th>
                <th className="py-2.5 px-3 text-right">VOLUME BONGKAR (TON)</th>
                <th className="py-2.5 px-3 text-right">VOLUME MUAT (TON)</th>
                <th className="py-2.5 px-3 text-right">TOTAL VOLUME (TON)</th>
                <th className="py-2.5 px-3">TERMINAL PELABUHAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {VOLUME_TONASE_NEGARA_DATA.map((row, idx) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 font-mono text-slate-500">{idx + 1}</td>
                  <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">
                    {row.negaraAsal}
                  </td>
                  <td className="py-2 px-3 font-medium text-slate-700 whitespace-nowrap">
                    {row.negaraTujuan}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-sky-700 whitespace-nowrap">
                    {row.volumeBongkarTon.toLocaleString('id-ID')} Ton
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                    {row.volumeMuatTon.toLocaleString('id-ID')} Ton
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-black text-slate-900 whitespace-nowrap">
                    {row.totalVolumeTon.toLocaleString('id-ID')} Ton
                  </td>
                  <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-sans text-[11px]">
                      {row.namaTerminal}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-300">
              <tr>
                <td colSpan={3} className="py-2.5 px-3 text-right uppercase tracking-wider text-[11px]">
                  Total Konsolidasi Arus Barang:
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-sky-800 text-xs">
                  {totalBongkarTon.toLocaleString('id-ID')} Ton
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-800 text-xs">
                  {totalMuatTon.toLocaleString('id-ID')} Ton
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-900 text-xs">
                  {totalArusTon.toLocaleString('id-ID')} Ton
                </td>
                <td className="py-2.5 px-3 text-slate-500 text-[10.5px]">
                  Buku Satu Data Hal. 16 No. 12
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
