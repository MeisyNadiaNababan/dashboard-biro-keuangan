import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  PieChart as PieChartIcon,
  BarChart3,
  Table as TableIcon,
  CheckCircle2,
  TrendingDown,
  Layers,
  ArrowDownRight,
  Info,
} from 'lucide-react';
import {
  BELANJA_COA_DETAILED_DATA,
  BELANJA_KEPELABUHANAN_SUMMARY,
  BelanjaCoaItem,
} from '../../data/kepelabuhananData';
import { PelabuhanVisualHeader } from './PelabuhanVisualHeader';

interface PelabuhanBelanjaCoaCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const PelabuhanBelanjaCoaCard: React.FC<PelabuhanBelanjaCoaCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'progress' | 'table'>('progress');

  const { totalPaguRp, totalRealisasiRp, persenSerapan, sisaPaguRp } = BELANJA_KEPELABUHANAN_SUMMARY;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs font-sans">
      {/* 1. STANDARDIZED VISUAL HEADER (REQ 9) */}
      <PelabuhanVisualHeader
        datasetNumber={2}
        pdfPages="Hal. 14"
        title="Data Realisasi Belanja Direktorat Pengelolaan Kepelabuhanan"
        visualName="Grafik Batang Penyerapan Anggaran & Ledger COA (Progress Bar & Ledger Matrix)"
        classification="TERTUTUP"
        attributes={['COA (CHART OF ACOUNT)', 'JUMLAH']}
        rightControls={
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('progress')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'progress'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Grafik Serapan</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel Detail COA</span>
            </button>
          </div>
        }
        onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('kpi-belanja-pelabuhan')}
      />

      {/* 2. SUMMARY STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Pagu Belanja Total
          </span>
          <span className="text-base sm:text-lg font-black text-slate-800 font-mono">
            Rp {(totalPaguRp / 1e9).toFixed(1)} Miliar
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Total Realisasi Belanja
          </span>
          <span className="text-base sm:text-lg font-black text-blue-700 font-mono">
            Rp {(totalRealisasiRp / 1e9).toFixed(2)} Miliar
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Sisa Anggaran (Efisiensi)
          </span>
          <span className="text-base sm:text-lg font-black text-emerald-700 font-mono">
            Rp {(sisaPaguRp / 1e9).toFixed(2)} Miliar
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Persentase Serapan
          </span>
          <span className="text-base sm:text-lg font-black text-amber-700 font-mono">
            {persenSerapan}%
          </span>
        </div>
      </div>

      {/* 3. VISUAL DISPLAY */}
      {viewMode === 'progress' ? (
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-between mb-1">
            <span>Realisasi Penyerapan Belanja per Rekening COA (Pagu vs Realisasi)</span>
            <span className="font-mono text-[10.5px] text-slate-400">Scrollable • {BELANJA_COA_DETAILED_DATA.length} Rekening</span>
          </div>

          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1.5">
            {BELANJA_COA_DETAILED_DATA.map((item) => {
              const realisasiM = item.realisasiRp / 1e9;
              const paguM = item.paguRp / 1e9;
              const sisaM = item.sisaRp / 1e9;

              return (
                <div
                  key={item.coa}
                  className="p-3 rounded-lg border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-2xs transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-900 text-white font-mono text-[10.5px] font-bold">
                        COA {item.coa}
                      </span>
                      <span className="font-bold text-slate-900">{item.mataAnggaran}</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-slate-500">Pagu: Rp {paguM.toFixed(1)} M</span>
                      <span className="text-slate-300">|</span>
                      <span className="font-bold text-blue-700">Realisasi: Rp {realisasiM.toFixed(1)} M</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold text-[10px]">
                        {item.persen}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.persen >= 85
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                          : item.persen >= 75
                          ? 'bg-gradient-to-r from-sky-500 to-blue-500'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500'
                      }`}
                      style={{ width: `${item.persen}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] text-slate-500 mt-1.5">
                    <span className="truncate max-w-[70%]">{item.keterangan}</span>
                    <span className="font-mono text-emerald-700 font-medium">
                      Sisa Pagu: Rp {sisaM.toFixed(1)} M
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3">KODE COA</th>
                <th className="py-2.5 px-3">MATA ANGGARAN KEPELABUHANAN</th>
                <th className="py-2.5 px-3 text-right">PAGU ANGGARAN</th>
                <th className="py-2.5 px-3 text-right">REALISASI JUMLAH</th>
                <th className="py-2.5 px-3 text-right">SISA PAGU</th>
                <th className="py-2.5 px-3 text-center">SERAPAN (%)</th>
                <th className="py-2.5 px-3">KETERANGAN ALOKASI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {BELANJA_COA_DETAILED_DATA.map((row) => (
                <tr key={row.coa} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 font-mono font-bold text-blue-900 whitespace-nowrap">
                    {row.coa}
                  </td>
                  <td className="py-2 px-3 font-semibold text-slate-900">
                    {row.mataAnggaran}
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-slate-700 whitespace-nowrap">
                    Rp {row.paguRp.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-blue-700 whitespace-nowrap">
                    Rp {row.realisasiRp.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-emerald-700 whitespace-nowrap">
                    Rp {row.sisaRp.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2 px-3 text-center font-mono font-bold whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10.5px] ${
                        row.persen >= 85
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {row.persen}%
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-500 text-[11px]">
                    {row.keterangan}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-300">
              <tr>
                <td colSpan={2} className="py-2.5 px-3 text-right uppercase tracking-wider text-[11px]">
                  Total Anggaran Belanja:
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-800 text-xs">
                  Rp {totalPaguRp.toLocaleString('id-ID')}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-blue-800 text-xs">
                  Rp {totalRealisasiRp.toLocaleString('id-ID')}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-800 text-xs">
                  Rp {sisaPaguRp.toLocaleString('id-ID')}
                </td>
                <td className="py-2.5 px-3 text-center font-mono text-blue-900 text-xs">
                  {persenSerapan}%
                </td>
                <td className="py-2.5 px-3 text-slate-500 text-[10.5px]">
                  Buku Satu Data Hal. 14 No. 2
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
