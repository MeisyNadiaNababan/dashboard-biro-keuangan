import React from 'react';
import { HELPDESK_TICKETS_DATA } from '../../data/pdsiData';
import { Headphones, Clock, CheckCircle2, HelpCircle } from 'lucide-react';

interface PdsiHelpdeskSectionProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PdsiHelpdeskSection: React.FC<PdsiHelpdeskSectionProps> = ({ onOpenFormulaModal }) => {
  const totalSubLayanan = HELPDESK_TICKETS_DATA.length;
  const overallSla = 98.4;
  const totalTiketTepatWaktu = 432;
  const totalTiketMasuk = 439;

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-2xs overflow-hidden flex flex-col font-sans select-none">
      {/* Tableau Worksheet Title Bar */}
      <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-2xs" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Kinerja Layanan IT Helpdesk &amp; Kepatuhan SLA
              </h3>
              {onOpenFormulaModal && (
                <button
                  onClick={() => onOpenFormulaModal('kpi_helpdesk_sla')}
                  className="px-2 py-0.5 text-[10px] font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-normal">
              Monitoring Norma Waktu Respon dan Penyelesaian Tiket Permintaan Pengguna
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Kategori Layanan:</span>
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200">
            {totalSubLayanan} Sub-Layanan TI
          </span>
        </div>
      </div>

      {/* Tableau BAN (Big Numbers) Strip - Only Capaian SLA */}
      <div className="p-4 border-b border-[#E2E8F0] bg-white">
        <div
          onClick={() => onOpenFormulaModal && onOpenFormulaModal('kpi_helpdesk_sla')}
          className="p-3 bg-[#F8FAFC] hover:bg-blue-50/60 border border-[#E2E8F0] hover:border-blue-300 rounded cursor-pointer transition-all hover:shadow-2xs group flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
          title="Klik untuk melihat Formula & Insight Capaian SLA (Tiket Sesuai Norma / Total Tiket × 100%)"
        >
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Capaian SLA Layanan Helpdesk</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                Formula: (Tiket Sesuai Norma / Total Tiket) × 100%
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#1F4E79] font-mono mt-0.5 group-hover:text-blue-900">
              {overallSla}%
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Realisasi {totalTiketTepatWaktu} tiket tepat waktu dari total {totalTiketMasuk} tiket permintaan terespons
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 font-mono">
              Target Standar: &ge; 90,0% (Terpenuhi)
            </span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-200 group-hover:bg-blue-100">
              Formula &gt;
            </span>
          </div>
        </div>
      </div>

      {/* Tableau Crosstab Table */}
      <div className="p-4 flex-1 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[880px]">
          <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
            <tr>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[9%]">
                Kode
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 w-[18%]">
                Nama Layanan
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 w-[20%]">
                Nama Sub Layanan
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[11%]">
                Prioritas
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[9%]">
                Norma Respon
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[9%]">
                Norma Selesai
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 text-right w-[7%]">
                Tiket
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 text-right w-[8%]">
                Tepat Waktu
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[9%]">
                Capaian SLA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
            {HELPDESK_TICKETS_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <tr
                  key={item.id}
                  className={`hover:bg-blue-50/60 transition-colors ${
                    isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                  }`}
                >
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-[#1F4E79] align-middle">
                    {item.kode}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-semibold text-slate-900 align-middle">
                    {item.namaLayanan}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-700 align-middle">
                    <div>{item.namaSubLayanan}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.pengelolaLayanan}</div>
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center align-middle">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.kategoriPrioritas.includes('P1')
                          ? 'bg-rose-50 text-rose-800 border border-rose-300'
                          : item.kategoriPrioritas.includes('P2')
                          ? 'bg-amber-50 text-amber-800 border border-amber-300'
                          : item.kategoriPrioritas.includes('P3')
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {item.kategoriPrioritas}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-medium text-slate-800 align-middle">
                    {item.normaWaktuRespon}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-semibold text-slate-800 align-middle">
                    {item.normaWaktuSelesai}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-medium text-slate-800 align-middle">
                    {item.tiketMasuk}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-bold text-emerald-700 align-middle">
                    {item.tiketTepatWaktu}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-[#1F4E79] align-middle">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.capaianSla.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-[#E2E8F0] font-bold text-xs border-t-2 border-slate-300">
            <tr>
              <td colSpan={6} className="py-2.5 px-3 border-r border-slate-300 text-slate-900 uppercase">
                TOTAL KONSOLIDASI TIKET LAYANAN TI (ITEM 17 DAFTAR LAYANAN TI)
              </td>
              <td className="py-2.5 px-3 border-r border-slate-300 text-right font-mono text-slate-900">
                {totalTiketMasuk}
              </td>
              <td className="py-2.5 px-3 border-r border-slate-300 text-right font-mono text-emerald-700">
                {totalTiketTepatWaktu}
              </td>
              <td className="py-2.5 px-3 text-center font-mono text-[#1F4E79] bg-blue-50/80">
                {overallSla}%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Tableau Caption Footer */}
      <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Headphones className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>Sistem: Portal Layanan &amp; Helpdesk TI Terintegrasi PDSI BP Batam</span>
        </div>
        <span className="font-mono">Standar: Service Level Agreement (SLA)</span>
      </div>
    </div>
  );
};
