import React, { useState } from 'react';
import { DC_RACKS_DATA, SERVER_STORAGE_DATA } from '../../data/pdsiData';
import { Server, Database, HardDrive, Zap, Thermometer, CheckCircle2 } from 'lucide-react';

export const PdsiDataCenterCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'racks' | 'servers'>('racks');

  const totalRaks = DC_RACKS_DATA.reduce((acc, r) => acc + r.totalRak, 0);
  const totalTerisi = DC_RACKS_DATA.reduce((acc, r) => acc + r.rakTerisi, 0);
  const totalKosong = DC_RACKS_DATA.reduce((acc, r) => acc + r.rakKosong, 0);
  const overallOccupancy = Math.round((totalTerisi / totalRaks) * 1000) / 10;

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-2xs overflow-hidden flex flex-col font-sans select-none">
      {/* Tableau Worksheet Header */}
      <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-2xs" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Kapasitas &amp; Okupansi Data Center Tier III
            </h3>
            <p className="text-[11px] text-slate-500 font-normal">
              Utilisasi Rak 42U, Efisiensi Daya Listrik (PUE) &amp; Storage SAN Terpusat
            </p>
          </div>
        </div>

        {/* Tableau Worksheet View Tabs */}
        <div className="flex items-center bg-[#E2E8F0] p-0.5 rounded text-xs font-semibold">
          <button
            onClick={() => setActiveTab('racks')}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${
              activeTab === 'racks'
                ? 'bg-[#1F4E79] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Okupansi Rak Ruang DC
          </button>
          <button
            onClick={() => setActiveTab('servers')}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${
              activeTab === 'servers'
                ? 'bg-[#1F4E79] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Server &amp; Storage SAN
          </button>
        </div>
      </div>

      {/* Tableau BAN (Big Numbers) Strip */}
      <div className="p-4 border-b border-[#E2E8F0] bg-white grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Rak
          </span>
          <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
            {totalRaks} Unit Rak
          </div>
          <span className="text-[10px] text-slate-500">Standar 42U Server</span>
        </div>

        <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Rak Terisi
          </span>
          <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5">
            {totalTerisi} Rak ({overallOccupancy}%)
          </div>
          <span className="text-[10px] text-blue-700 font-semibold">Terpasang Hardware Aktif</span>
        </div>

        <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Jumlah Rak Kosong
          </span>
          <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
            {totalKosong} Rak ({Math.round((totalKosong / totalRaks) * 1000) / 10}%)
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Slot Tersedia untuk Ekspansi</span>
        </div>
      </div>

      {/* Tableau Crosstab Table */}
      <div className="p-4 flex-1 overflow-x-auto">
        {activeTab === 'racks' ? (
          <table className="w-full text-left text-xs border-collapse min-w-[620px]">
            <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
              <tr>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[28%]">
                  Ruang Fasilitas DC
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[24%]">
                  Jenis Rak
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 text-right w-[11%]">
                  Rak Terisi
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 text-right w-[11%]">
                  Total Rak
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 text-right w-[12%]">
                  Jumlah Rak Kosong
                </th>
                <th className="py-2 px-3 text-center w-[14%]">
                  % Okupansi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
              {DC_RACKS_DATA.map((rack, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <tr
                    key={rack.id}
                    className={`hover:bg-blue-50/60 transition-colors ${
                      isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-semibold text-slate-900 align-middle">
                      {rack.ruangan}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-600 align-middle">
                      {rack.jenisRak}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-bold text-[#1F4E79] align-middle">
                      {rack.rakTerisi} Rak
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-bold text-slate-900 align-middle">
                      {rack.totalRak} Rak
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-bold text-emerald-700 align-middle">
                      {rack.rakKosong} Rak
                    </td>
                    <td className="py-2.5 px-3 align-middle">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 h-2.5 rounded-2xs overflow-hidden">
                          <div
                            className="bg-[#1F4E79] h-full rounded-2xs"
                            style={{ width: `${rack.okupansiPersen}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-[10px] text-slate-800 w-11 text-right shrink-0">
                          {rack.okupansiPersen}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
              <tr>
                <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[12%]">
                  Tanggal Rekap
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[24%]">
                  Nama Server
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 w-[16%]">
                  Brand
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[10%]">
                  Jumlah
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[12%]">
                  Tanggal Garansi
                </th>
                <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[12%]">
                  Status Garansi
                </th>
                <th className="py-2 px-3 text-center w-[14%]">
                  Siklus Hidup (EOS)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
              {SERVER_STORAGE_DATA.map((srv, idx) => {
                const isEven = idx % 2 === 0;
                const isEosSafe = srv.eosStatus.includes('Aman');

                return (
                  <tr
                    key={srv.id}
                    className={`hover:bg-blue-50/60 transition-colors ${
                      isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono text-slate-600 align-middle">
                      {srv.tanggalRekap}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] align-middle">
                      <div className="font-semibold text-slate-900">{srv.namaServer}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[200px]" title={srv.penggunaan}>
                        {srv.penggunaan}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] align-middle">
                      <div className="font-medium text-slate-800">{srv.brand}</div>
                      <span className="text-[10px] text-slate-500 font-mono">{srv.tipe}</span>
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-slate-900 align-middle">
                      {srv.jumlahUnit} Unit
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono text-slate-700 align-middle">
                      {srv.tanggalGaransi}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center align-middle">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          srv.statusGaransi === 'Aktif'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-50 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {srv.statusGaransi}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center align-middle">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          isEosSafe
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {srv.eosStatus}
                      </span>
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
          <Server className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>Sensor: Schneider DCIM &amp; BMS Ruang Server Tier III BP Batam</span>
        </div>
        <span className="font-mono">Standar: TIA-942 Tier III</span>
      </div>
    </div>
  );
};
