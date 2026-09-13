import React from 'react';
import { FIBER_OPTIC_ROUTES } from '../../data/pdsiData';
import { Network, HelpCircle } from 'lucide-react';

interface PdsiFiberOpticAndAppsProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PdsiFiberOpticAndApps: React.FC<PdsiFiberOpticAndAppsProps> = ({ onOpenFormulaModal }) => {
  const totalCore = FIBER_OPTIC_ROUTES.reduce((acc, r) => acc + (r.jmlhcore || 0), 0);
  const avgUtilitas = 81.4;
  const totalCoreAktif = Math.round(totalCore * (avgUtilitas / 100));

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-2xs overflow-hidden flex flex-col font-sans select-none">
      {/* Tableau Worksheet Title Bar */}
      <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-2xs" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Reliabilitas Jaringan Backbone Fiber Optik (FO) BP Batam
              </h3>
              {onOpenFormulaModal && (
                <button
                  onClick={() => onOpenFormulaModal('kapasitas_core_fo')}
                  className="px-2 py-0.5 text-[10px] font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-normal">
              Monitoring Kapasitas Core Backbone FO &amp; Koridor Transmisi Data (Katalog Item #2 &amp; #5)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 text-[#1F4E79] border border-blue-200">
            Katalog Data: Item #2 &amp; #5
          </span>
        </div>
      </div>

      {/* Tableau BAN (Big Numbers) Strip - Kapasitas Core FO ONLY */}
      <div className="p-4 border-b border-[#E2E8F0] bg-white">
        <div
          onClick={() => onOpenFormulaModal && onOpenFormulaModal('kapasitas_core_fo')}
          className="p-3 bg-[#F8FAFC] hover:bg-blue-50/60 border border-[#E2E8F0] hover:border-blue-300 rounded cursor-pointer transition-all hover:shadow-2xs group flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
          title="Klik untuk melihat Formula & Insight Kapasitas Core FO: SUM(JMLHCORE)"
        >
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Kapasitas Core FO Backbone</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                Formula: SUM([JMLHCORE])
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#1F4E79] font-mono mt-0.5 group-hover:text-blue-900">
              {totalCore} Core
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Utilisasi Rata-rata: {avgUtilitas}% ({totalCoreAktif} Core Aktif Digunakan)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 font-mono">
              Status: Redundan &amp; High-Throughput
            </span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-200 group-hover:bg-blue-100">
              Formula &gt;
            </span>
          </div>
        </div>
      </div>

      {/* Tableau Crosstab Table */}
      <div className="p-4 flex-1 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[780px]">
          <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
            <tr>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[12%]">
                Ruas
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 w-[20%]">
                Jalur
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 w-[20%]">
                Jalan (JLN)
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 w-[18%]">
                Nama Objek (NAMOBJ)
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[10%]">
                Jml Core
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 w-[10%]">
                Brand FO
              </th>
              <th className="py-2 px-3 w-[10%]">
                Remark
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
            {FIBER_OPTIC_ROUTES.map((route, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <tr
                  key={route.id}
                  className={`hover:bg-blue-50/60 transition-colors ${
                    isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                  }`}
                >
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-[#1F4E79] align-middle">
                    {route.ruas}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-semibold text-slate-900 align-middle">
                    {route.jalur}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-600 align-middle">
                    {route.jln}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-700 align-middle">
                    {route.namobj}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-slate-900 align-middle">
                    {route.jmlhcore} Core
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-600 font-mono text-[10px] align-middle">
                    {route.brandfo}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 align-middle">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                      {route.remark}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-[#E2E8F0] font-bold text-xs border-t-2 border-slate-300">
            <tr>
              <td colSpan={4} className="py-2.5 px-3 border-r border-slate-300 text-slate-900 uppercase">
                TOTAL KONSOLIDASI KAPASITAS CORE FO BACKBONE (ITEM #5)
              </td>
              <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono font-bold text-[#1F4E79] text-sm">
                {totalCore} Core
              </td>
              <td colSpan={2} className="py-2.5 px-3 text-slate-700 font-mono text-[11px]">
                Utilisasi Rata-rata 81,4% (938 Core Aktif)
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Tableau Caption Footer */}
      <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>Fasilitas: Jaringan Kabel Bawah Tanah &amp; Tiang Udara BP Batam</span>
        </div>
        <span className="font-mono">Extract: Live GIS Layer</span>
      </div>
    </div>
  );
};
