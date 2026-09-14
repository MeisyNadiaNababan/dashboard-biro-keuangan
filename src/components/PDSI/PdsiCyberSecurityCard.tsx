import React from 'react';
import { CYBER_THREATS_DATA } from '../../data/pdsiData';
import {
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PdsiCyberSecurityCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PdsiCyberSecurityCard: React.FC<PdsiCyberSecurityCardProps> = ({ onOpenFormulaModal }) => {
  const totalSerangan = CYBER_THREATS_DATA.reduce((acc, t) => acc + t.jmlSerangan, 0);

  // Threat severity classifications based on threat data
  const getThreatSeverity = (threatName: string) => {
    if (threatName.includes('DDoS') || threatName.includes('Volumetric')) {
      return { level: 'KRITIS', color: 'bg-rose-500', textColor: 'text-rose-700', bgSoft: 'bg-rose-50', border: 'border-rose-200' };
    }
    if (threatName.includes('SQL Injection') || threatName.includes('XSS')) {
      return { level: 'TINGGI', color: 'bg-amber-500', textColor: 'text-amber-700', bgSoft: 'bg-amber-50', border: 'border-amber-200' };
    }
    if (threatName.includes('Brute Force') || threatName.includes('VPN')) {
      return { level: 'TINGGI', color: 'bg-orange-500', textColor: 'text-orange-700', bgSoft: 'bg-orange-50', border: 'border-orange-200' };
    }
    if (threatName.includes('Malware') || threatName.includes('Phishing')) {
      return { level: 'SEDANG', color: 'bg-purple-500', textColor: 'text-purple-700', bgSoft: 'bg-purple-50', border: 'border-purple-200' };
    }
    return { level: 'MONITOR', color: 'bg-blue-500', textColor: 'text-blue-700', bgSoft: 'bg-blue-50', border: 'border-blue-200' };
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-xl shadow-xs overflow-hidden flex flex-col font-sans select-none transition-all">
      {/* Tableau Worksheet Title Bar */}
      <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-xs" />
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

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>SOC CSIRT: Aktif 24/7</span>
        </div>
      </div>

      {/* Tableau Shelves Specification Badge */}
      <div className="px-4 pt-3">
        <TableauShelvesBadge
          showMe="Show Me #6 (Horizontal Diverging Bar) & #13 (Stacked Threat Volume)"
          rows="[threat_activity], [periode]"
          columns="SUM([jml_serangan]), [% Distribusi]"
          color="[kategori_urgensi] (Merah = DDoS, Oranye = SQLi, Ungu = Phishing)"
          filters="[tahun] = '2026', [status_keamanan] = 'Termitigasi'"
        />
      </div>

      {/* Main Content: Visual Model */}
      <div className="p-4 flex-1">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#0B2545] uppercase tracking-wide">
              Distribusi Volume &amp; Vektor Serangan Siber (Katalog Item #12)
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Total: {totalSerangan.toLocaleString('id-ID')} Upaya Serangan
            </span>
          </div>

          <div className="space-y-2.5">
            {CYBER_THREATS_DATA.map((threat) => {
              const pct = Math.round((threat.jmlSerangan / totalSerangan) * 1000) / 10;
              const severity = getThreatSeverity(threat.threatActivity);

              return (
                <div
                  key={threat.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-blue-50/30 hover:border-blue-300 transition-all shadow-2xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider font-mono ${severity.bgSoft} ${severity.textColor} border ${severity.border}`}>
                        {severity.level}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {threat.threatActivity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="font-bold text-slate-900">
                        {threat.jmlSerangan.toLocaleString('id-ID')} Upaya
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar with Embedded Percentage Value */}
                  <div className="relative w-full bg-slate-100 h-5 rounded-md overflow-hidden border border-slate-200/80 flex items-center">
                    <div
                      className={`h-full rounded-md transition-all flex items-center justify-end px-2.5 ${severity.color}`}
                      style={{ width: `${Math.max(12, pct)}%` }}
                    >
                      <span className="text-[10px] font-bold text-white font-mono whitespace-nowrap drop-shadow-2xs">
                        {pct}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>Periode Deteksi: {threat.periode}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tableau Caption Footer */}
      <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>Sumber: Integrasi WAF Cloudflare, UTM Firewall Fortinet &amp; Gov-CSIRT BSSN</span>
        </div>
        <span className="font-mono">Koneksi SOC: Live 24/7 Monitoring</span>
      </div>
    </div>
  );
};
