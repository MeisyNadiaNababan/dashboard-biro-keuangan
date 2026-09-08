import React, { useState } from 'react';
import { DC_RACKS_DATA, SERVER_STORAGE_DATA } from '../../data/pdsiData';
import { Server, Database, HardDrive, ShieldAlert, CheckCircle2, AlertTriangle, ArrowUpRight, Cpu, Thermometer, Zap } from 'lucide-react';

export const PdsiDataCenterCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'racks' | 'servers'>('racks');

  const totalRaks = DC_RACKS_DATA.reduce((acc, r) => acc + r.totalRak, 0);
  const totalTerisi = DC_RACKS_DATA.reduce((acc, r) => acc + r.rakTerisi, 0);
  const totalKosong = DC_RACKS_DATA.reduce((acc, r) => acc + r.rakKosong, 0);
  const overallOccupancy = Math.round((totalTerisi / totalRaks) * 1000) / 10;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                DATA CENTER &amp; INFRASTRUKTUR SERVER STORAGE
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                Item #8 &amp; #13
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Monitoring utilisasi rak 42U, node compute, storage all-flash &amp; risiko End-of-Support (EOS)
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-white border border-slate-200 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('racks')}
            className={`px-3 py-1 font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'racks'
                ? 'bg-[#1F3864] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Okupansi Rak DC (Item 8)
          </button>
          <button
            onClick={() => setActiveTab('servers')}
            className={`px-3 py-1 font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'servers'
                ? 'bg-[#1F3864] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Server &amp; Storage (Item 13)
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 flex-1 space-y-4">
        {/* Top Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>Total Kapasitas Rak</span>
              <Server className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-base font-extrabold text-slate-900 font-mono">
              {totalRaks} Unit Rak
            </div>
            <span className="text-[10px] text-slate-500">Kapasitas 42U Standard</span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>Rak Terisi (Terpasang)</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-base font-extrabold text-blue-700 font-mono">
              {totalTerisi} Rak ({overallOccupancy}%)
            </div>
            <span className="text-[10px] text-slate-500">Utilisasi Server Aktif</span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>Rak Kosong (Tersedia)</span>
              <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-base font-extrabold text-emerald-700 font-mono">
              {totalKosong} Rak (21,4%)
            </div>
            <span className="text-[10px] text-slate-500">Ruang Ekspansi Proyek</span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>Efisiensi Energi (PUE)</span>
              <Zap className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-base font-extrabold text-slate-900 font-mono">
              1,45 PUE
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">Efisiensi Tinggi (&lt; 1,5)</span>
          </div>
        </div>

        {/* Tab 1: Okupansi Rak DC (Item #8 di PDF) */}
        {activeTab === 'racks' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-bold">Distribusi Rak Server per Ruangan Fasilitas Data Center:</span>
              <span className="font-mono text-[11px] text-blue-700">Formula: (Rak Terisi / Total Rak) * 100</span>
            </div>

            <div className="space-y-3">
              {DC_RACKS_DATA.map((rack) => (
                <div key={rack.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50/70 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{rack.ruangan}</h4>
                      <p className="text-[11px] text-slate-500">{rack.jenisRak}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <div className="flex items-center gap-1 text-slate-600 text-[11px]">
                        <Thermometer className="w-3 h-3 text-rose-500" />
                        <span>{rack.suhuRataRata}</span>
                      </div>
                      <span className="font-bold text-blue-800">
                        {rack.rakTerisi} / {rack.totalRak} Rak
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[11px]">
                        {rack.okupansiPersen}%
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${rack.okupansiPersen}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Terisi: {rack.rakTerisi} Rak server blade</span>
                    <span>Tersedia: {rack.rakKosong} Rak slot kosong</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Server & Storage (Item #13 di PDF) */}
        {activeTab === 'servers' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-bold">Daftar Infrastruktur Node Server, HCI &amp; Storage:</span>
              <span className="font-mono text-[10px] text-slate-500">Katalog Item #13 • Sifat: TERTUTUP</span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3 border-r border-slate-200">Nama Perangkat &amp; Brand</th>
                    <th className="py-2 px-3 border-r border-slate-200">Tipe Perangkat</th>
                    <th className="py-2 px-3 border-r border-slate-200 text-center">Unit</th>
                    <th className="py-2 px-3 border-r border-slate-200 text-center">Status Garansi</th>
                    <th className="py-2 px-3 border-r border-slate-200 text-center">Status EOS</th>
                    <th className="py-2 px-3">Peruntukan Layanan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-[11px]">
                  {SERVER_STORAGE_DATA.map((srv) => (
                    <tr key={srv.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 border-r border-slate-200">
                        <div className="font-bold text-slate-900">{srv.namaServer}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{srv.brand}</div>
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200">
                        <span className="font-mono text-slate-700">{srv.tipe}</span>
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 text-center font-bold font-mono">
                        {srv.jumlahUnit}
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            srv.statusGaransi === 'Aktif'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                              : 'bg-rose-50 text-rose-700 border border-rose-300'
                          }`}
                        >
                          {srv.statusGaransi}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            srv.eosStatus === 'Aman (Supported)'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-300'
                          }`}
                        >
                          {srv.eosStatus}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {srv.penggunaan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Sertifikasi Tier III Design &amp; Facility Terakreditasi</span>
        </div>
        <span className="font-mono">Sumber: SIM Data Center PDSI</span>
      </div>
    </div>
  );
};
