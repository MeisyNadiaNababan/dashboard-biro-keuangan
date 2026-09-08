import React from 'react';
import { CYBER_THREATS_DATA } from '../../data/pdsiData';
import { ShieldCheck, ShieldAlert, AlertOctagon, Lock, Eye, CheckCircle2, Shield, Activity } from 'lucide-react';

export const PdsiCyberSecurityCard: React.FC = () => {
  const totalSerangan = CYBER_THREATS_DATA.reduce((acc, t) => acc + t.jmlSerangan, 0);
  const totalTermitigasi = CYBER_THREATS_DATA.reduce((acc, t) => {
    return t.statusKeamanan === 'Termitigasi (Blocked)' ? acc + t.jmlSerangan : acc;
  }, 0);
  const overallRate = Math.round((totalTermitigasi / totalSerangan) * 1000) / 10;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                SECURITY OPERATIONS CENTER (SOC) &amp; MITIGASI ANCAMAN
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-bold">
                Item #12 di PDF
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Monitoring serangan siber, threat intelligence CSIRT BP Batam &amp; integrasi WAF
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-700 font-mono">SOC AKTIF 24/7</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 flex-1">
        {/* Banner Mitigasi */}
        <div className="p-3.5 bg-gradient-to-r from-teal-900 via-[#0F3246] to-[#0B2538] text-white rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300">
              Threat Mitigation Rate (Formula Item #12)
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold font-mono text-white">
                {overallRate}%
              </span>
              <span className="text-xs text-teal-200">
                ({totalTermitigasi.toLocaleString()} dari {totalSerangan.toLocaleString()} serangan dinetralkan)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-teal-800/60 border border-teal-600/40 text-teal-100">
              <span className="text-[10px] text-teal-300 block">DDoS Filtered</span>
              <span className="font-bold">6.420 Req/sec</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-teal-800/60 border border-teal-600/40 text-teal-100">
              <span className="text-[10px] text-teal-300 block">IPS Block Rate</span>
              <span className="font-bold">99.1%</span>
            </div>
          </div>
        </div>

        {/* Threat Activity List (Item #12 PDF) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-bold">Rincian Insiden Ancaman Siber per Vektor:</span>
            <span className="font-mono text-[11px] text-slate-500">Katalog Item #12 • Sifat: TERTUTUP</span>
          </div>

          <div className="space-y-2">
            {CYBER_THREATS_DATA.map((threat) => (
              <div
                key={threat.id}
                className="p-3 border border-slate-200 rounded-lg hover:border-teal-400 bg-slate-50/60 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                      {threat.kategori}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900">{threat.threatActivity}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="font-bold text-slate-800">
                      {threat.jmlSerangan.toLocaleString()} Kali
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        threat.statusKeamanan.includes('Termitigasi')
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-amber-50 text-amber-700 border border-amber-300'
                      }`}
                    >
                      {threat.statusKeamanan}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="bg-teal-600 h-full rounded-full"
                    style={{ width: `${threat.mitigasiPersen}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="truncate">Vektor Pertahanan: {threat.vektorUtama}</span>
                  <span className="font-mono font-bold text-teal-800 shrink-0">
                    {threat.mitigasiPersen}% Termitigasi
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-teal-600" />
          <span>BSSN Gov-CSIRT Terkoneksi (National Threat Intel)</span>
        </div>
        <span className="font-mono">Sensor: WAF &amp; UTM Fortinet</span>
      </div>
    </div>
  );
};
