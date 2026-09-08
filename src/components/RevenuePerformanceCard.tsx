import React from 'react';
import { ArrowRight, BarChart2 } from 'lucide-react';
import { RevenueItem } from '../types';
import { REVENUE_TOTAL } from '../data/mockData';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface RevenuePerformanceCardProps {
  items: RevenueItem[];
  onViewDetail: () => void;
  selectedYear: string;
  selectedUnit?: string;
  selectedMonth?: string;
}

export const RevenuePerformanceCard: React.FC<RevenuePerformanceCardProps> = ({
  items,
  onViewDetail,
  selectedYear,
  selectedUnit = 'ALL',
  selectedMonth = 'April',
}) => {
  return (
    <div id="pendapatan-section" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4 font-sans select-none flex flex-col justify-between">
      <div className="space-y-4">
        {/* Modern Executive Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#59A14F]" />
              <span>PENDAPATAN NEGARA BUKAN PAJAK (PNBP) • PERKIN {selectedYear}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#002B49] tracking-tight flex items-center gap-2 flex-wrap">
              <span>Kinerja Realisasi Pendapatan per Unit Kerja</span>
              {selectedUnit !== 'ALL' && (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-bold">
                  Filtered: {selectedUnit}
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Target Perkin {selectedYear}: Rp 2.447,5 M • Cut-off: {selectedMonth} • Benchmark Capaian Q2: 50,0%
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewDetail}
              id="btn-detail-pendapatan"
              className="text-xs font-bold text-[#002B49] hover:text-[#001D3D] bg-white hover:bg-slate-50 px-3.5 py-2 border border-slate-200 rounded-xl flex items-center gap-2 cursor-pointer shadow-2xs transition-all"
            >
              <BarChart2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Lihat Data Detail (IKS-03)</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Legend Shelf */}
        <div className="px-3.5 py-2 bg-slate-50/70 rounded-xl border border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#59A14F] inline-block rounded-full" />
            <span className="font-medium text-slate-800">Realisasi PNBP (Rp M)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-slate-200 inline-block rounded-full" />
            <span>Target Perkin 2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-3 bg-slate-900 inline-block rounded-full" />
            <span>Benchmark Q2: 50%</span>
          </div>
        </div>

        {/* Tableau Shelves Mapping Badge */}
        <TableauShelvesBadge
          showMe="Show Me #6 / #23"
          rows="[sumber] (Unit Kerja)"
          columns="SUM([realisasi]), SUM([target])"
          color="[Status Capaian (% Target)]"
          referenceLine="SUM([target]) & Ref Q2 (50%)"
          detail="[kode_akun], [porsi_persen]"
          filters={`[tahun]='${selectedYear}', [bulan]='${selectedMonth}'`}
        />

        {/* Modern Clean Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/80">
          <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
            <thead className="bg-slate-50/80 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3.5">Unit Kerja Penghasil / Badan Usaha</th>
                <th className="py-3 px-3.5 text-right">Target Perkin (Rp M)</th>
                <th className="py-3 px-3.5 text-right">Realisasi YTD (Rp M)</th>
                <th className="py-3 px-3.5 min-w-[170px]">Visual Bar (% Target)</th>
                <th className="py-3 px-3.5 text-right">Sisa Target</th>
                <th className="py-3 px-3.5 text-center">Status Capaian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-xs">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3.5 font-sans font-semibold text-slate-900">
                    {item.sumber}
                  </td>
                  <td className="py-2.5 px-3.5 text-right text-slate-600">
                    Rp {(item.target ?? 0).toFixed(1)} M
                  </td>
                  <td className="py-2.5 px-3.5 text-right font-bold text-[#2B542C]">
                    Rp {(item.realisasi ?? 0).toFixed(1)} M
                  </td>
                  <td className="py-2.5 px-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-100 h-2.5 relative rounded-full overflow-hidden">
                        {/* Progress Bar */}
                        <div
                          className="h-full bg-[#59A14F] rounded-full"
                          style={{ width: `${Math.min(item.capaian ?? 0, 100)}%` }}
                        />
                        {/* Reference Line for 50% target */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                          style={{ left: '50%' }}
                          title="Reference Line: 50% Q2"
                        />
                      </div>
                      <span className="w-12 text-right text-xs font-bold text-slate-800">
                        {(item.capaian ?? 0).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3.5 text-right text-slate-600">
                    Rp {(item.sisaTarget ?? 0).toFixed(1)} M
                  </td>
                  <td className="py-2.5 px-3.5 text-center font-sans">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                        (item.capaian ?? 0) >= 45
                          ? 'bg-[#EBF3E8] text-[#2B542C] border border-[#59A14F]/40'
                          : (item.capaian ?? 0) >= 35
                          ? 'bg-[#FEF9E7] text-[#7D6608] border border-[#F28E2B]/40'
                          : 'bg-[#FDEDEC] text-[#922B21] border border-[#E15759]/40'
                      }`}
                    >
                      {(item.capaian ?? 0) >= 45 ? 'Sesuai Target' : (item.capaian ?? 0) >= 35 ? 'Mendekati' : 'Perlu Pacu'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Total Row */}
            <tfoot className="bg-slate-50/90 font-bold border-t-2 border-slate-200 font-mono text-xs">
              <tr>
                <td className="py-3 px-3.5 font-sans text-slate-900">
                  TOTAL PNBP KONSOLIDASI (PERKIN 2026)
                </td>
                <td className="py-3 px-3.5 text-right text-slate-900">
                  Rp {(REVENUE_TOTAL.target ?? 0).toFixed(1)} M
                </td>
                <td className="py-3 px-3.5 text-right text-[#2B542C]">
                  Rp {(REVENUE_TOTAL.realisasi ?? 0).toFixed(1)} M
                </td>
                <td className="py-3 px-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-200 h-2.5 relative rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#59A14F] rounded-full"
                        style={{ width: `${Math.min(REVENUE_TOTAL.capaian ?? 0, 100)}%` }}
                      />
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                        style={{ left: '50%' }}
                      />
                    </div>
                    <span className="w-12 text-right text-xs font-bold text-slate-900">
                      {(REVENUE_TOTAL.capaian ?? 0).toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3.5 text-right text-slate-900">
                  Rp {(REVENUE_TOTAL.sisaTarget ?? 0).toFixed(1)} M
                </td>
                <td className="py-3 px-3.5 text-center font-sans">
                  <span className="bg-[#EBF3E8] text-[#2B542C] px-2.5 py-0.5 text-[10px] uppercase font-bold border border-[#59A14F]/40 rounded-full">
                    On Track
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Footnote inside Card */}
      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
        <span>Target Renstra/Perkin 2026: Rp 2.447,46 M (Rp 2,447 T) • Sumber Data Resmi: Biro Keuangan BP Batam</span>
        <span className="font-mono text-slate-400">Sheet: IKS-03</span>
      </div>
    </div>
  );
};
