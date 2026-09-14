import React, { useState } from 'react';
import { DC_RACKS_DATA, SERVER_STORAGE_DATA } from '../../data/pdsiData';
import {
  Server,
  Database,
  HardDrive,
  Zap,
  Thermometer,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  Table as TableIcon,
  ShieldCheck,
  Cpu,
  Layers,
  Activity,
  Box,
  Check,
  AlertTriangle
} from 'lucide-react';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PdsiDataCenterCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PdsiDataCenterCard: React.FC<PdsiDataCenterCardProps> = ({ onOpenFormulaModal }) => {
  const [activeTab, setActiveTab] = useState<'racks' | 'servers'>('racks');
  const [viewModel, setViewModel] = useState<'visual' | 'table'>('visual');

  const totalRaks = DC_RACKS_DATA.reduce((acc, r) => acc + r.totalRak, 0);
  const totalTerisi = DC_RACKS_DATA.reduce((acc, r) => acc + r.rakTerisi, 0);
  const totalKosong = DC_RACKS_DATA.reduce((acc, r) => acc + r.rakKosong, 0);
  const overallOccupancy = Math.round((totalTerisi / totalRaks) * 1000) / 10;

  const totalServerUnit = SERVER_STORAGE_DATA.reduce((acc, s) => acc + s.jumlahUnit, 0);
  const serverGaransiAktif = SERVER_STORAGE_DATA.filter((s) => s.statusGaransi === 'Aktif').reduce(
    (acc, s) => acc + s.jumlahUnit,
    0
  );
  const pctGaransiAktif = Math.round((serverGaransiAktif / totalServerUnit) * 1000) / 10;

  const serverAmanEos = SERVER_STORAGE_DATA.filter((s) => s.eosStatus === 'Aman (Supported)').reduce(
    (acc, s) => acc + s.jumlahUnit,
    0
  );
  const serverLegacyEos = totalServerUnit - serverAmanEos;
  const pctAmanEos = Math.round((serverAmanEos / totalServerUnit) * 1000) / 10;

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-xl shadow-xs overflow-hidden flex flex-col font-sans select-none transition-all">
      {/* Tableau Worksheet Header */}
      <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-xs" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Kapasitas &amp; Okupansi Data Center Tier III
              </h3>
              {onOpenFormulaModal && (
                <button
                  onClick={() => onOpenFormulaModal(activeTab === 'servers' ? 'jumlah_server' : 'kpi_dc_rack')}
                  className="px-2 py-0.5 text-[10px] font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-normal">
              Utilisasi Rak 42U, Efisiensi Daya Listrik (PUE) &amp; Storage SAN Terpusat
            </p>
          </div>
        </div>

        {/* Controls: Worksheets Tabs & View Model Switcher */}
        <div className="flex items-center gap-2">
          {/* Visual / Table Model Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setViewModel('visual')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                viewModel === 'visual'
                  ? 'bg-white text-[#1F4E79] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilkan Model Visual Grafis / Chart View"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="text-[11px]">Visual Grafis</span>
            </button>
            <button
              onClick={() => setViewModel('table')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                viewModel === 'table'
                  ? 'bg-white text-[#1F4E79] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilkan Model Tabel Detail / Crosstab View"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="text-[11px]">Tabel Detail</span>
            </button>
          </div>

          {/* Tab Selection */}
          <div className="flex items-center bg-[#E2E8F0] p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('racks')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === 'racks'
                  ? 'bg-[#1F4E79] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Okupansi Rak
            </button>
            <button
              onClick={() => setActiveTab('servers')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === 'servers'
                  ? 'bg-[#1F4E79] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Server &amp; Storage
            </button>
          </div>
        </div>
      </div>

      {/* Tableau BAN (Big Numbers) Strip */}
      <div className={`p-3.5 border-b border-[#E2E8F0] bg-slate-50/50 grid grid-cols-1 ${activeTab === 'racks' ? 'sm:grid-cols-3' : 'sm:grid-cols-4'} gap-2.5 text-center`}>
        {activeTab === 'racks' ? (
          <>
            <div
              onClick={() => onOpenFormulaModal && onOpenFormulaModal('total_rak')}
              className="p-2.5 bg-white hover:bg-blue-50/60 border border-[#E2E8F0] hover:border-blue-300 rounded-lg cursor-pointer transition-all hover:shadow-2xs group text-left"
              title="Klik untuk melihat Formula & Insight Total Rak"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Total Kapasitas Rak</span>
                <span className="text-[9px] font-normal text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Formula &gt;</span>
              </div>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5 group-hover:text-blue-900">
                {totalRaks} Unit Rak
              </div>
              <span className="text-[10px] text-slate-500">Standar 42U Server Blade</span>
            </div>

            <div
              onClick={() => onOpenFormulaModal && onOpenFormulaModal('rak_terisi')}
              className="p-2.5 bg-white hover:bg-blue-50/60 border border-[#E2E8F0] hover:border-blue-300 rounded-lg cursor-pointer transition-all hover:shadow-2xs group text-left"
              title="Klik untuk melihat Formula & Insight Okupansi Rak Terisi"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Rak Terpasang Aktif</span>
                <span className="text-[9px] font-normal text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Formula &gt;</span>
              </div>
              <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5 group-hover:text-blue-900">
                {totalTerisi} Rak ({overallOccupancy}%)
              </div>
              <span className="text-[10px] text-blue-700 font-semibold">Tingkat Utilisasi Optimal</span>
            </div>

            <div
              onClick={() => onOpenFormulaModal && onOpenFormulaModal('rak_kosong')}
              className="p-2.5 bg-white hover:bg-emerald-50/60 border border-[#E2E8F0] hover:border-emerald-300 rounded-lg cursor-pointer transition-all hover:shadow-2xs group text-left"
              title="Klik untuk melihat Formula & Insight Kapasitas Rak Kosong"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Cadangan Rak Kosong</span>
                <span className="text-[9px] font-normal text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">Formula &gt;</span>
              </div>
              <div className="text-xl font-black text-emerald-700 font-mono mt-0.5 group-hover:text-emerald-900">
                {totalKosong} Rak ({Math.round((totalKosong / totalRaks) * 1000) / 10}%)
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">Ruang Ekspansi Baru</span>
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => onOpenFormulaModal && onOpenFormulaModal('jumlah_server')}
              className="p-2.5 bg-white hover:bg-blue-50/60 border border-[#E2E8F0] hover:border-blue-300 rounded-lg cursor-pointer transition-all hover:shadow-2xs group text-left"
              title="Klik untuk melihat Formula & Insight Total Node Server & Storage"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Total Server &amp; Storage</span>
                <span className="text-[9px] font-normal text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Formula &gt;</span>
              </div>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5 group-hover:text-blue-900">
                {totalServerUnit} Unit Node
              </div>
              <span className="text-[10px] text-slate-500">HCI, Storage SAN &amp; Exadata</span>
            </div>

            <div
              onClick={() => onOpenFormulaModal && onOpenFormulaModal('jumlah_server')}
              className="p-2.5 bg-white hover:bg-emerald-50/60 border border-[#E2E8F0] hover:border-emerald-300 rounded-lg cursor-pointer transition-all hover:shadow-2xs group text-left"
              title="Klik untuk melihat Formula & Insight Garansi Aktif Perangkat Server"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Garansi Resmi Aktif</span>
                <span className="text-[9px] font-normal text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">Formula &gt;</span>
              </div>
              <div className="text-xl font-black text-emerald-700 font-mono mt-0.5 group-hover:text-emerald-900">
                {serverGaransiAktif} Unit ({pctGaransiAktif}%)
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">SLA Support Vendor Aktif</span>
            </div>

            <div
              onClick={() => onOpenFormulaModal && onOpenFormulaModal('kpi_lifecycle_eos')}
              className="p-2.5 bg-white hover:bg-blue-50/60 border border-[#E2E8F0] hover:border-blue-300 rounded-lg cursor-pointer transition-all hover:shadow-2xs group text-left"
              title={`Formula: (${serverAmanEos} Unit Aman ÷ ${totalServerUnit} Total Unit) × 100% = ${pctAmanEos.toFixed(1)}%`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Status Lifecycle / EOS</span>
                <span className="text-[9px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                  {serverAmanEos}/{totalServerUnit}
                </span>
              </div>
              <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5 group-hover:text-blue-900">
                {pctAmanEos.toFixed(1)}% Aman
              </div>
              <span className="text-[10px] text-blue-700 font-semibold block truncate">
                {serverLegacyEos} Unit Legacy Mendekati EOS
              </span>
            </div>

            <div
              className="p-2.5 bg-white border border-[#E2E8F0] rounded-lg text-left"
            >
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Rata-rata Suhu Ruang
              </div>
              <div className="text-xl font-black text-sky-700 font-mono mt-0.5 flex items-center gap-1">
                <Thermometer className="w-5 h-5 text-sky-600" />
                <span>19.8°C</span>
              </div>
              <span className="text-[10px] text-sky-700 font-semibold">ASHRAE Thermal Safe A1</span>
            </div>
          </>
        )}
      </div>

      {/* Tableau Shelves Specification Badge */}
      <div className="px-4 pt-3">
        {activeTab === 'racks' ? (
          <TableauShelvesBadge
            showMe="Show Me #6 (Horizontal Progress Bar) & #13 (Stacked Occupancy Bar)"
            rows="[ruangan], [jenis_rak]"
            columns="SUM([rak_terisi]), SUM([total_rak]), [% Okupansi]"
            color="IF [% Okupansi] >= 80 THEN '#1F4E79' ELSE '#0D9488' END"
            referenceLine="Reference Line Target Okupansi 80,0%"
            filters="[tahun] = '2026', [fasilitas] = 'Tier III DC & DRC'"
          />
        ) : (
          <TableauShelvesBadge
            showMe="Show Me #14 (Treemap Arsitektur Hardware) & #6 (Bar Status Garansi)"
            rows="[brand], [tipe], [nama_server]"
            columns="SUM([jumlah_unit]), [status_garansi], [status_eos]"
            color="[status_garansi] (Hijau = Aktif, Merah = Habis Garansi)"
            filters="[tahun] = '2026', [klasifikasi] = 'Server & Storage SAN'"
          />
        )}
      </div>

      {/* Main Content Area: Visual Model or Crosstab Table */}
      <div className="p-4 flex-1">
        {viewModel === 'visual' ? (
          /* ================= MODEL VISUALISASI GRAFIS ================= */
          activeTab === 'racks' ? (
            <div className="space-y-4">
              {/* Visual Facility Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {DC_RACKS_DATA.map((rack) => {
                  const isHighOccupancy = rack.okupansiPersen >= 80;
                  return (
                    <div
                      key={rack.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-blue-50/30 hover:border-blue-300 transition-all shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-[#0B2545] leading-snug">
                            {rack.ruangan}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                              isHighOccupancy
                                ? 'bg-blue-100 text-[#1F4E79] border border-blue-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            {rack.okupansiPersen}%
                          </span>
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1">
                          {rack.jenisRak}
                        </p>

                        {/* Interactive Visual Bar */}
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center justify-between text-[10.5px]">
                            <span className="font-semibold text-slate-700">
                              Utilisasi Slot Rak
                            </span>
                            <span className="font-mono font-bold text-slate-900">
                              {rack.rakTerisi} / {rack.totalRak} Rak
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 h-3.5 rounded-md overflow-hidden p-0.5 flex">
                            <div
                              className="h-full bg-linear-to-r from-[#1F4E79] to-blue-600 rounded-xs transition-all flex items-center justify-center text-[9px] font-bold text-white shadow-xs"
                              style={{ width: `${rack.okupansiPersen}%` }}
                            >
                              {rack.okupansiPersen > 30 ? `${rack.rakTerisi} Rak` : ''}
                            </div>
                            <div
                              className="h-full bg-emerald-100 rounded-xs transition-all flex items-center justify-center text-[9px] font-semibold text-emerald-800"
                              style={{ width: `${100 - rack.okupansiPersen}%` }}
                            >
                              {100 - rack.okupansiPersen > 25 ? `${rack.rakKosong} Sisa` : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Visual Server & Storage SAN */
            <div className="space-y-4">
              {/* Server Architecture by Workload Visual Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SERVER_STORAGE_DATA.map((srv) => {
                  const isEosSafe = srv.eosStatus.includes('Aman');
                  const isWarrantyActive = srv.statusGaransi === 'Aktif';

                  return (
                    <div
                      key={srv.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                            {srv.tipe}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isWarrantyActive
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {srv.statusGaransi}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {srv.namaServer}
                        </h4>
                        <div className="text-[11px] font-semibold text-[#1F4E79] mt-0.5">
                          {srv.brand}
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1 line-clamp-2" title={srv.penggunaan}>
                          {srv.penggunaan}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Kapasitas Node</span>
                          <span className="font-mono font-bold text-slate-900 text-sm">
                            {srv.jumlahUnit} Unit
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">Siklus EOS</span>
                          <span
                            className={`inline-block text-[10px] font-bold font-mono ${
                              isEosSafe ? 'text-emerald-700' : 'text-amber-700'
                            }`}
                          >
                            {srv.eosStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Vendor Share & Ecosystem Progress Bar */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                    Distribusi Beban Kerja Server &amp; Storage Berdasarkan Vendor
                  </span>
                  <span className="text-[11px] font-mono text-slate-600">
                    Total: {totalServerUnit} Unit Node Terintegrasi
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-6 rounded-lg overflow-hidden flex p-0.5 gap-0.5">
                  <div
                    className="bg-[#1F4E79] text-white text-[10px] font-bold flex items-center justify-center rounded-xs transition-all hover:opacity-90"
                    style={{ width: `${(8 / totalServerUnit) * 100}%` }}
                    title="Nutanix / Supermicro (HCI) - 8 Unit (50,0%)"
                  >
                    Nutanix HCI (8)
                  </div>
                  <div
                    className="bg-sky-600 text-white text-[10px] font-bold flex items-center justify-center rounded-xs transition-all hover:opacity-90"
                    style={{ width: `${(2 / totalServerUnit) * 100}%` }}
                    title="Huawei OceanStor (SAN) - 2 Unit (12,5%)"
                  >
                    Huawei (2)
                  </div>
                  <div
                    className="bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center rounded-xs transition-all hover:opacity-90"
                    style={{ width: `${(2 / totalServerUnit) * 100}%` }}
                    title="Oracle Exadata X8M - 2 Unit (12,5%)"
                  >
                    Oracle Exadata (2)
                  </div>
                  <div
                    className="bg-slate-500 text-white text-[10px] font-bold flex items-center justify-center rounded-xs transition-all hover:opacity-90"
                    style={{ width: `${(4 / totalServerUnit) * 100}%` }}
                    title="HPE ProLiant DL380 Gen9 - 4 Unit (25,0%)"
                  >
                    HPE Gen9 (4)
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-[10.5px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1F4E79]" />
                    <span className="text-slate-700">Nutanix HCI: 8 Unit (Core Portal &amp; SIMKEU)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                    <span className="text-slate-700">Huawei SAN: 2 Unit (All-Flash NVMe)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                    <span className="text-slate-700">Oracle Exadata: 2 Unit (Database Core)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                    <span className="text-slate-700">HPE Gen9: 4 Unit (Legacy Dev/Archive)</span>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          /* ================= MODEL TABEL CROSSTAB DETAIL ================= */
          <div className="overflow-x-auto">
            {activeTab === 'racks' ? (
              <table className="w-full text-left text-xs border-collapse min-w-[620px]">
                <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[28%]">
                      Ruang Fasilitas DC
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[24%]">
                      Jenis Rak
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[11%]">
                      Rak Terisi
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[11%]">
                      Total Rak
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[12%]">
                      Jumlah Rak Kosong
                    </th>
                    <th className="py-2.5 px-3 text-center w-[14%]">
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
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[12%]">
                      Tanggal Rekap
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[24%]">
                      Nama Server
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[16%]">
                      Brand
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[10%]">
                      Jumlah
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[12%]">
                      Tanggal Garansi
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[12%]">
                      Status Garansi
                    </th>
                    <th className="py-2.5 px-3 text-center w-[14%]">
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
        )}
      </div>

      {/* Tableau Caption Footer */}
      <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Server className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>Sensor: Schneider DCIM &amp; BMS Ruang Server Tier III BP Batam</span>
        </div>
        <span className="font-mono">Standar: TIA-942 Tier III Ready</span>
      </div>
    </div>
  );
};
