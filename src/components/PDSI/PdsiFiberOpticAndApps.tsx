import React, { useState } from 'react';
import { FIBER_OPTIC_ROUTES, BP_BATAM_APPS_DATA, SPBE_DOMAINS_DATA } from '../../data/pdsiData';
import { Network, AppWindow, FileText, CheckCircle2, Globe, ShieldCheck, MapPin, Layers, Server } from 'lucide-react';

export const PdsiFiberOpticAndApps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fiber' | 'apps' | 'spbe'>('fiber');

  const totalKm = FIBER_OPTIC_ROUTES.reduce((acc, r) => acc + r.panjangKm, 0);
  const totalCore = FIBER_OPTIC_ROUTES.reduce((acc, r) => acc + r.jmlCore, 0);
  const totalCoreAktif = FIBER_OPTIC_ROUTES.reduce((acc, r) => acc + r.coreAktif, 0);
  const avgUtilitas = Math.round((totalCoreAktif / totalCore) * 1000) / 10;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                JARINGAN FIBER OPTIK, APLIKASI &amp; ARSITEKTUR SPBE
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                Item #2, #5, #14 &amp; #19 di PDF
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Infrastruktur kabel FO 284,5 KM, portofolio sistem informasi Satu Data &amp; kesiapan TTE BSrE
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-white border border-slate-200 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('fiber')}
            className={`px-3 py-1 font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'fiber'
                ? 'bg-[#1F3864] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Jaringan FO (Item 2 &amp; 5)
          </button>
          <button
            onClick={() => setActiveTab('apps')}
            className={`px-3 py-1 font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'apps'
                ? 'bg-[#1F3864] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Aplikasi &amp; TTE (Item 14)
          </button>
          <button
            onClick={() => setActiveTab('spbe')}
            className={`px-3 py-1 font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'spbe'
                ? 'bg-[#1F3864] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Arsitektur SIA SPBE (Item 19)
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 flex-1">
        {/* Tab 1: Fiber Optic Network */}
        {activeTab === 'fiber' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-lg">
                <span className="text-[10px] text-sky-800 font-semibold block">Total Panjang Jalur FO</span>
                <span className="text-xl font-extrabold text-sky-950 font-mono">
                  {totalKm.toFixed(1)} KM
                </span>
                <span className="text-[10px] text-sky-600 block mt-0.5">5 Ruas Backbone Utama</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-600 font-semibold block">Total Kapasitas Core</span>
                <span className="text-xl font-extrabold text-slate-900 font-mono">
                  {totalCore} Core
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Single-mode 48C - 96C</span>
              </div>
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                <span className="text-[10px] text-emerald-800 font-semibold block">Rata-rata Utilisasi Core</span>
                <span className="text-xl font-extrabold text-emerald-950 font-mono">
                  {avgUtilitas}%
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">
                  {totalCoreAktif} Core Aktif Mentransmisi
                </span>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3 border-r border-slate-200">Nama Jalur &amp; Ruas Jalan</th>
                    <th className="py-2 px-3 border-r border-slate-200 text-center">Panjang</th>
                    <th className="py-2 px-3 border-r border-slate-200 text-center">Core (Aktif/Tot)</th>
                    <th className="py-2 px-3 border-r border-slate-200 text-center">Utilisasi (%)</th>
                    <th className="py-2 px-3 border-r border-slate-200">Spesifikasi Brand</th>
                    <th className="py-2 px-3 text-center">Status Jalur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-[11px]">
                  {FIBER_OPTIC_ROUTES.map((route) => (
                    <tr key={route.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 border-r border-slate-200">
                        <div className="font-bold text-slate-900">{route.jalur}</div>
                        <div className="text-[10px] text-slate-500">{route.ruasJalan}</div>
                        <div className="text-[9px] text-blue-700 font-mono mt-0.5">
                          {route.startPoint} ➔ {route.endPoint}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 text-center font-mono font-bold text-slate-800">
                        {route.panjangKm} km
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 text-center font-mono">
                        <span className="text-blue-700 font-bold">{route.coreAktif}</span> / {route.jmlCore}
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 text-center">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono font-bold text-[10px]">
                          {route.utilitasPersen}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 font-mono text-[10px] text-slate-600">
                        {route.brandFo}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold text-[10px]">
                          {route.statusKabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Apps & TTE (Item #14) */}
        {activeTab === 'apps' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-bold">Portofolio Aplikasi BP Batam &amp; Sertifikasi TTE:</span>
              <span className="font-mono text-[10px] text-slate-500">Katalog Item #14 • Sifat: TERTUTUP</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BP_BATAM_APPS_DATA.map((app) => (
                <div key={app.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                          {app.kategoriAplikasi}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 mt-1">{app.namaAplikasi}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 text-[10px] font-bold shrink-0 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {app.tandaTanganElektronik}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                      {app.uraianAplikasi}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Pengelola: <strong className="text-slate-700">{app.unitOperasional}</strong></span>
                    <span className="font-mono">{app.basisAplikasi} • {app.devYear}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: SIA SPBE 6 Domain (Item #19) */}
        {activeTab === 'spbe' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-bold">6 Domain Arsitektur SPBE BP Batam (Item #19 di PDF):</span>
              <span className="font-mono text-emerald-700 font-bold text-xs">Indeks Komposit: 3,68 (Sangat Baik)</span>
            </div>

            <div className="space-y-2">
              {SPBE_DOMAINS_DATA.map((item) => (
                <div key={item.domain} className="p-3 border border-slate-200 rounded-lg bg-slate-50/60">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-xs text-slate-900">{item.domain}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-900">
                        Skor: {item.skor} / 5,0
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 text-[10px] font-bold">
                        {item.predikat}
                      </span>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${(item.skor / 5.0) * 100}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-600">
                    {item.keterangan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
        <span className="font-mono">Standar: Perpres No. 95/2018 tentang SPBE &amp; Satu Data BP Batam</span>
        <span>PDSI BP Batam</span>
      </div>
    </div>
  );
};
