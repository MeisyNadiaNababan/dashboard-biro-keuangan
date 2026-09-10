import React, { useState } from 'react';
import { FIBER_OPTIC_ROUTES, BP_BATAM_APPS_DATA, SPBE_DOMAINS_DATA } from '../../data/pdsiData';
import { Network, AppWindow, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

export const PdsiFiberOpticAndApps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fiber' | 'apps' | 'spbe'>('fiber');

  const totalKm = FIBER_OPTIC_ROUTES.reduce((acc, r) => acc + (r.panjang || 0), 0);
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Reliabilitas Backbone Fiber Optik &amp; Portofolio SPBE
            </h3>
            <p className="text-[11px] text-slate-500 font-normal">
              Monitoring Jalur Transmisi FO, Kesiapan Sertifikasi TTE BSrE &amp; Arsitektur SPBE
            </p>
          </div>
        </div>

        {/* Tableau Worksheet View Switcher */}
        <div className="flex items-center bg-[#E2E8F0] p-0.5 rounded text-xs font-semibold">
          <button
            onClick={() => setActiveTab('fiber')}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${
              activeTab === 'fiber'
                ? 'bg-[#1F4E79] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Jaringan Backbone FO
          </button>
          <button
            onClick={() => setActiveTab('apps')}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${
              activeTab === 'apps'
                ? 'bg-[#1F4E79] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Portofolio Aplikasi &amp; TTE
          </button>
          <button
            onClick={() => setActiveTab('spbe')}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${
              activeTab === 'spbe'
                ? 'bg-[#1F4E79] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Arsitektur SPBE
          </button>
        </div>
      </div>

      {/* Tableau BAN (Big Numbers) Strip */}
      <div className="p-4 border-b border-[#E2E8F0] bg-white grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Panjang Jalur FO
          </span>
          <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
            {totalKm.toFixed(1)} KM
          </div>
          <span className="text-[10px] text-slate-500">5 Koridor Backbone</span>
        </div>

        <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Kapasitas Core FO
          </span>
          <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5">
            {totalCore} Core
          </div>
          <span className="text-[10px] text-blue-700 font-semibold">{totalCoreAktif} Core Aktif</span>
        </div>

        <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Rata-rata Utilisasi
          </span>
          <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
            {avgUtilitas}%
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Trafik Transmisi Stabil</span>
        </div>

        <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Indeks SPBE BP Batam
          </span>
          <div className="text-xl font-black text-[#0B2545] font-mono mt-0.5">
            3,68 / 5,00
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">Predikat Sangat Baik</span>
        </div>
      </div>

      {/* Tableau Crosstab Table */}
      <div className="p-4 flex-1 overflow-x-auto">
        {activeTab === 'fiber' && (
          <table className="w-full text-left text-xs border-collapse min-w-[780px]">
            <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
              <tr>
                <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[11%]">
                  Ruas
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[18%]">
                  Jalur
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[18%]">
                  Jalan (JLN)
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[16%]">
                  Nama Objek (NAMOBJ)
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[8%]">
                  Jml Core
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 text-right w-[8%]">
                  Panjang
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[11%]">
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
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-bold text-[#1F4E79] align-middle">
                      {route.panjang} KM
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
          </table>
        )}

        {activeTab === 'apps' && (
          <table className="w-full text-left text-xs border-collapse min-w-[720px]">
            <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
              <tr>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[30%]">
                  Nama Sistem Informasi / Aplikasi
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[18%]">
                  Kategori Aplikasi
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[18%]">
                  Unit Kerja Pemilik
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[16%]">
                  Unit Pengembang
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[8%]">
                  Basis
                </th>
                <th className="py-2 px-3 text-center w-[10%]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
              {BP_BATAM_APPS_DATA.map((app, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <tr
                    key={app.id}
                    className={`hover:bg-blue-50/60 transition-colors ${
                      isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] align-middle">
                      <div className="font-semibold text-slate-900">{app.namaAplikasi}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[280px]" title={app.uraianAplikasi}>
                        {app.uraianAplikasi}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-700 font-medium align-middle">
                      {app.kategoriAplikasi}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-800 font-semibold align-middle">
                      {app.unitOperasional}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-[#1F4E79] font-bold align-middle">
                      {app.unitPengembang}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center align-middle font-mono text-slate-700">
                      {app.basisAplikasi}
                    </td>
                    <td className="py-2.5 px-3 text-center align-middle">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {activeTab === 'spbe' && (
          <table className="w-full text-left text-xs border-collapse min-w-[620px]">
            <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
              <tr>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[30%]">
                  Domain Tata Kelola SPBE
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[16%]">
                  Skor Indeks
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[20%]">
                  Predikat Kinerja
                </th>
                <th className="py-2 px-3 text-center w-[34%]">
                  % Capaian terhadap Target (5,00)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
              {SPBE_DOMAINS_DATA.map((domain, idx) => {
                const isEven = idx % 2 === 0;
                const pct = Math.round((domain.skor / domain.target) * 1000) / 10;

                return (
                  <tr
                    key={domain.domain}
                    className={`hover:bg-blue-50/60 transition-colors ${
                      isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-semibold text-slate-900 align-middle">
                      {domain.domain}
                      <div className="text-[10px] text-slate-500 font-normal">{domain.keterangan}</div>
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-slate-900 align-middle">
                      {domain.skor.toFixed(2)} / {domain.target.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center align-middle">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                        {domain.predikat}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 align-middle">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 h-2.5 rounded-2xs overflow-hidden">
                          <div
                            className="bg-[#1F4E79] h-full rounded-2xs"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-[10px] text-slate-800 w-11 text-right shrink-0">
                          {pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Tableau Caption Footer */}
      <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>Sumber: GIS Infrastruktur Jaringan PDSI &amp; Evaluasi KemenPAN-RB</span>
        </div>
        <span className="font-mono">Standar: Perpres No. 95/2018 tentang SPBE</span>
      </div>
    </div>
  );
};
