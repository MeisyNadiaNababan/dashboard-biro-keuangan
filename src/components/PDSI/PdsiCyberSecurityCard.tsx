import React from 'react';
import { CYBER_THREATS_DATA } from '../../data/pdsiData';
import { ShieldCheck, ShieldAlert, Activity, BarChart2, HelpCircle } from 'lucide-react';

interface PdsiCyberSecurityCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PdsiCyberSecurityCard: React.FC<PdsiCyberSecurityCardProps> = ({ onOpenFormulaModal }) => {
  const totalSerangan = CYBER_THREATS_DATA.reduce((acc, t) => acc + t.jmlSerangan, 0);

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-2xs overflow-hidden flex flex-col font-sans select-none">
      {/* Tableau Worksheet Title Bar */}
      <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-2xs" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Data Serangan Keamanan TI &amp; Aktivitas CSIRT
              </h3>
              {onOpenFormulaModal && (
                <button
                  onClick={() => onOpenFormulaModal('kpi_cyber_incident')}
                  className="px-2 py-0.5 text-[10px] font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-normal">
              Monitoring Aktivitas Threat dan Status Penanganan Insiden Keamanan TI (BSSN CSIRT)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Status CSIRT:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-300">
            Aktif 24/7
          </span>
        </div>
      </div>

      {/* Tableau BAN (Big Numbers) Strip - Only Total Serangan */}
      <div className="p-4 border-b border-[#E2E8F0] bg-white">
        <div
          onClick={() => onOpenFormulaModal && onOpenFormulaModal('total_serangan')}
          className="p-3 bg-[#F8FAFC] hover:bg-rose-50/60 border border-[#E2E8F0] hover:border-rose-300 rounded cursor-pointer transition-all hover:shadow-2xs group flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
          title="Klik untuk melihat Formula & Insight Total Serangan (SUM JML SERANGAN)"
        >
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Total Serangan</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800">
                Formula: SUM(JML SERANGAN)
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#E15759] font-mono mt-0.5 group-hover:text-rose-900">
              {totalSerangan.toLocaleString('id-ID')} Serangan
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Akumulasi anomali dan serangan siber terdeteksi pada gateway Next-Gen Firewall &amp; WAF
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-200 group-hover:bg-blue-100">
              Formula &gt;
            </span>
          </div>
        </div>
      </div>

      {/* Tableau-Style Crosstab Grid */}
      <div className="p-4 flex-1 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[580px]">
          {/* Tableau Header */}
          <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
            <tr>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[15%]">
                Periode
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 w-[45%]">
                Threat Activity
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 w-[24%]">
                Status Keamanan
              </th>
              <th className="py-2 px-3 text-right w-[16%]">
                Jml Serangan
              </th>
            </tr>
          </thead>

          {/* Tableau Data Rows with alternating background */}
          <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
            {CYBER_THREATS_DATA.map((threat, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <tr
                  key={threat.id}
                  className={`hover:bg-blue-50/60 transition-colors ${
                    isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                  }`}
                >
                  {/* Periode */}
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-medium text-slate-600 align-middle">
                    {threat.periode}
                  </td>

                  {/* Threat Activity */}
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-800 font-semibold align-middle">
                    {threat.threatActivity}
                  </td>

                  {/* Status Keamanan */}
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] align-middle">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      {threat.statusKeamanan}
                    </span>
                  </td>

                  {/* Jml Serangan */}
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 align-middle">
                    {threat.jmlSerangan.toLocaleString('id-ID')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tableau Caption Footer */}
      <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>Sumber: Integrasi WAF Cloudflare, UTM Firewall Fortinet &amp; Gov-CSIRT BSSN</span>
        </div>
        <span className="font-mono">Koneksi SOC: Live</span>
      </div>
    </div>
  );
};
