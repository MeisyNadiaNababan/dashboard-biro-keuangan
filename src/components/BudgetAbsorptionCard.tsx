import React from 'react';
import { ArrowRight, BarChart2 } from 'lucide-react';
import { ExpenseItem } from '../types';
import { EXPENSE_TOTAL } from '../data/mockData';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface BudgetAbsorptionCardProps {
  items: ExpenseItem[];
  onViewDetail: () => void;
  selectedYear: string;
  selectedUnit?: string;
  selectedMonth?: string;
}

export const BudgetAbsorptionCard: React.FC<BudgetAbsorptionCardProps> = ({
  items,
  onViewDetail,
  selectedYear,
  selectedUnit = 'ALL',
  selectedMonth = 'April',
}) => {
  return (
    <div id="belanja-section" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4 font-sans select-none flex flex-col justify-between">
      <div className="space-y-4">
        {/* Modern Executive Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#4E79A7]" />
              <span>ALOKASI &amp; REALISASI BELANJA • PERKIN {selectedYear}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#002B49] tracking-tight flex items-center gap-2 flex-wrap">
              <span>Tingkat Penyerapan Anggaran Belanja Operasional &amp; Modal</span>
              {selectedUnit !== 'ALL' && (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-md font-bold">
                  Filtered: {selectedUnit}
                </span>
              )}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-600">
              <span className="px-2.5 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">
                Pagu DIPA {selectedYear}: <strong className="font-bold text-slate-900">Rp 3.324,5 M</strong>
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-2.5 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">
                Cut-off: <strong className="font-bold text-slate-900">{selectedMonth} {selectedYear}</strong>
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-2.5 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">
                Benchmark Q2: <strong className="font-bold text-slate-900">35,0%</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewDetail}
              id="btn-detail-belanja"
              className="text-xs font-bold text-[#002B49] hover:text-[#001D3D] bg-white hover:bg-slate-50 px-3.5 py-2 border border-slate-200 rounded-xl flex items-center gap-2 cursor-pointer shadow-2xs transition-all"
            >
              <BarChart2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Lihat Data Detail (Belanja)</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Legend Shelf */}
        <div className="px-3.5 py-2 bg-slate-50/70 rounded-xl border border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#4E79A7] inline-block rounded-full" />
            <span className="font-medium text-slate-800">Realisasi Belanja (Rp M)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-slate-200 inline-block rounded-full" />
            <span>Pagu DIPA 2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-3 bg-slate-900 inline-block rounded-full" />
            <span>Benchmark Q2: 35%</span>
          </div>
        </div>

        {/* Tableau Shelves Mapping Badge */}
        <TableauShelvesBadge
          showMe="Show Me #6 / #23"
          rows="[jenis_anggaran] / [satker]"
          columns="SUM([realisasi]), SUM([pagu])"
          color="[Realisasi Belanja]"
          referenceLine="SUM([pagu]) & Benchmark Q2 (35%)"
          detail="[jenis_belanja], [persentase_serapan]"
          filters={`[tahun]='${selectedYear}', [bulan]='${selectedMonth}'`}
        />

        {/* Modern Clean Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/80">
          <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
            <thead className="bg-slate-50/80 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3.5">Jenis Anggaran</th>
                <th className="py-3 px-3.5 text-right">Pagu DIPA (Rp M)</th>
                <th className="py-3 px-3.5 text-right">Realisasi YTD (Rp M)</th>
                <th className="py-3 px-3.5 min-w-[200px]">Visual Bar (% Pagu DIPA)</th>
                <th className="py-3 px-3.5 text-right">Sisa Pagu (Rp M)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-xs">
              {items.map((item) => {
                const programName = item.program || item.unitKerja || `Komponen Belanja ${item.id}`;
                const serapanPct = item.serapan ?? item.persentase ?? (item.pagu ? (item.realisasi / item.pagu) * 100 : 0);
                const sisaPagu = item.sisaAnggaran ?? item.sisa ?? Math.max(0, item.pagu - item.realisasi);

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3.5 font-sans font-semibold text-slate-900">
                      {programName}
                    </td>
                    <td className="py-2.5 px-3.5 text-right text-slate-600">
                      Rp {(item.pagu ?? 0).toFixed(1)} M
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-bold text-[#1F3864]">
                      Rp {(item.realisasi ?? 0).toFixed(1)} M
                    </td>
                    <td className="py-2.5 px-3.5">
                      <div className="w-full bg-slate-100 h-5 relative rounded-md overflow-hidden border border-slate-200/80 flex items-center">
                        {/* Reference Line for 35% target */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-blue-600 z-10"
                          style={{ left: '35%' }}
                          title="Reference Line: 35% Q2"
                        />
                        {/* Progress Bar with % on Bar */}
                        <div
                          className="h-full bg-[#1F4E79] rounded-md transition-all duration-300 flex items-center justify-end px-2"
                          style={{ width: `${Math.max(16, Math.min(serapanPct, 100))}%` }}
                        >
                          <span className="text-[10px] font-bold text-white font-mono whitespace-nowrap drop-shadow-2xs">
                            {serapanPct.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3.5 text-right text-slate-600">
                      Rp {sisaPagu.toFixed(1)} M
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Total Row */}
            <tfoot className="bg-slate-50/90 font-bold border-t-2 border-slate-200 font-mono text-xs">
              <tr>
                <td className="py-3 px-3.5 font-sans text-slate-900">
                  TOTAL REALISASI BELANJA
                </td>
                <td className="py-3 px-3.5 text-right text-slate-900">
                  Rp {(EXPENSE_TOTAL.pagu ?? 0).toFixed(1)} M
                </td>
                <td className="py-3 px-3.5 text-right text-[#1F3864]">
                  Rp {(EXPENSE_TOTAL.realisasi ?? 0).toFixed(1)} M
                </td>
                <td className="py-3 px-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-200 h-2.5 relative rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4E79A7] rounded-full"
                        style={{ width: `${Math.min(EXPENSE_TOTAL.serapan ?? 0, 100)}%` }}
                      />
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                        style={{ left: '35%' }}
                        title="Reference Line: 35% Q2"
                      />
                    </div>
                    <span className="w-14 text-right text-xs font-bold text-slate-900">
                      {(EXPENSE_TOTAL.serapan ?? 0).toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3.5 text-right text-slate-900">
                  Rp {(EXPENSE_TOTAL.sisaAnggaran ?? 0).toFixed(1)} M
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Footnote inside Card */}
      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
        <span>Catatan: Belanja Modal dan Pengadaan memiliki porsi sisa Rp 1,84 T untuk percepatan tender Q3.</span>
        <span className="font-mono text-slate-400">Sheet: Sheet 2</span>
      </div>
    </div>
  );
};
