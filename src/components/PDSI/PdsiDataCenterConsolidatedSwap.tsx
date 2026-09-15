import React, { useState, useMemo } from 'react';
import {
  DC_RACKS_DATA,
  DC_TENANTS_DATA,
  SERVER_STORAGE_DATA,
  DcRackItem,
  DcTenantItem,
  ServerStorageItem,
} from '../../data/pdsiData';
import {
  Server,
  Layers,
  HardDrive,
  Users,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  PieChart as PieChartIcon,
  BarChart3,
  Table as TableIcon,
  ArrowRightLeft,
  Building,
  Info,
} from 'lucide-react';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

type ActiveSheet = 'rak_dc' | 'data_tenant' | 'server_storage';

interface PdsiDataCenterConsolidatedSwapProps {
  onOpenFormulaModal?: (metricId: string) => void;
}

export const PdsiDataCenterConsolidatedSwap: React.FC<PdsiDataCenterConsolidatedSwapProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>('rak_dc');
  const [displayMode, setDisplayMode] = useState<'both' | 'chart' | 'table'>('both');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculations for Rack DC
  const totalRakAll = useMemo(() => DC_RACKS_DATA.reduce((acc, r) => acc + r.totalRak, 0), []);
  const terisiRakAll = useMemo(() => DC_RACKS_DATA.reduce((acc, r) => acc + r.rakTerisi, 0), []);
  const kosongRakAll = totalRakAll - terisiRakAll;
  const okupansiPersenAll = Math.round((terisiRakAll / totalRakAll) * 1000) / 10;

  // Calculations for Tenant
  const totalTenant = useMemo(() => DC_TENANTS_DATA.reduce((acc, t) => acc + t.jumlah, 0), []);

  // Calculations for Server & Storage
  const totalUnitServer = useMemo(() => SERVER_STORAGE_DATA.reduce((acc, s) => acc + s.jumlahUnit, 0), []);
  const garansiAktifUnit = useMemo(
    () => SERVER_STORAGE_DATA.filter((s) => s.statusGaransi === 'Aktif').reduce((acc, s) => acc + s.jumlahUnit, 0),
    []
  );
  const eosUnits = useMemo(
    () => SERVER_STORAGE_DATA.filter((s) => s.eosStatus.includes('EOS')).reduce((acc, s) => acc + s.jumlahUnit, 0),
    []
  );

  // Filtered Racks
  const filteredRacks = useMemo(() => {
    if (!searchQuery.trim()) return DC_RACKS_DATA;
    return DC_RACKS_DATA.filter(
      (r) =>
        r.ruangan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.jenisRak.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Filtered Tenants
  const filteredTenants = useMemo(() => {
    if (!searchQuery.trim()) return DC_TENANTS_DATA;
    return DC_TENANTS_DATA.filter(
      (t) =>
        t.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.contohTenant.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Filtered Server & Storage
  const filteredServers = useMemo(() => {
    if (!searchQuery.trim()) return SERVER_STORAGE_DATA;
    return SERVER_STORAGE_DATA.filter(
      (s) =>
        s.namaServer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tipe.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.statusGaransi.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* 1. Header Bar with Sheet Swap Tabs */}
      <div className="bg-slate-50/90 border-b border-slate-200 px-4 py-3 sm:px-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#1F4E79] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                POIN #9
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                Rekap Data Center, Data Tenant & Server Storage
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Konsolidasi Terpadu 3 Dataset Fasilitas Ruang Server Tier III BP Batam (Model Sheet Swap)
            </p>
          </div>
        </div>

        {/* Action Controls: View Switcher */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs text-xs font-medium">
            <button
              onClick={() => setDisplayMode('both')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                displayMode === 'both' ? 'bg-[#1F4E79] text-white font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Visual & Tabel</span>
            </button>
            <button
              onClick={() => setDisplayMode('chart')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                displayMode === 'chart' ? 'bg-[#1F4E79] text-white font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PieChartIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grafis Saja</span>
            </button>
            <button
              onClick={() => setDisplayMode('table')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                displayMode === 'table' ? 'bg-[#1F4E79] text-white font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tabel Saja</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Tableau Sheet Swap Switcher Ribbon */}
      <div className="bg-slate-100/70 border-b border-slate-200 px-4 py-2 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#1F4E79]" />
            Sheet Swap:
          </span>

          <button
            onClick={() => setActiveSheet('rak_dc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 border ${
              activeSheet === 'rak_dc'
                ? 'bg-[#1F4E79] text-white border-[#1F4E79] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Okupansi Rak Data Center</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                activeSheet === 'rak_dc' ? 'bg-blue-900/60 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {DC_RACKS_DATA.length} Lokasi
            </span>
          </button>

          <button
            onClick={() => setActiveSheet('data_tenant')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 border ${
              activeSheet === 'data_tenant'
                ? 'bg-[#1F4E79] text-white border-[#1F4E79] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Data Tenant</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                activeSheet === 'data_tenant' ? 'bg-blue-900/60 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {totalTenant} Tenant
            </span>
          </button>

          <button
            onClick={() => setActiveSheet('server_storage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 border ${
              activeSheet === 'server_storage'
                ? 'bg-[#1F4E79] text-white border-[#1F4E79] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Server & Storage</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                activeSheet === 'server_storage' ? 'bg-blue-900/60 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {totalUnitServer} Unit
            </span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="w-full sm:w-60">
          <input
            type="text"
            placeholder="Cari dalam sheet ini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-1 focus:ring-[#1F4E79] focus:border-[#1F4E79]"
          />
        </div>
      </div>

      {/* 3. Sheet Swap Content Body */}
      <div className="p-4 sm:p-5">
        {/* ======================================================== */}
        {/* SHEET 1: OKUPANSI RAK DATA CENTER                        */}
        {/* ======================================================== */}
        {activeSheet === 'rak_dc' && (
          <div className="space-y-4">
            <TableauShelvesBadge
              showMe="Show Me #2 (Horizontal Stacked Bar & Matrix Grid) — Ruangan x Total vs Terisi"
              columns="[Ruangan], [Jenis Rak]"
              rows="SUM([Total Rak]), SUM([Jumlah Rak Terisi])"
              filters="[Status]='Aktif Operasional'"
              detail="Sheet Swap 1: Visualisasi Okupansi Ruang Data Center Tier III BP Batam"
            />

            {/* Quick KPI Summary Badges for Racks (Rasio Okupansi Global Dihapus Sesuai Permintaan) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3">
                <span className="text-[11px] font-semibold text-blue-900 block">Total Kapasitas Rak</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-blue-950 block mt-0.5">
                  {totalRakAll} <span className="text-xs font-normal">Unit</span>
                </span>
                <span className="text-[10.5px] text-blue-700 mt-0.5 block">Standar 42U Cabinet</span>
              </div>
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3">
                <span className="text-[11px] font-semibold text-emerald-900 block">Jumlah Rak Terisi</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-950 block mt-0.5">
                  {terisiRakAll} <span className="text-xs font-normal">Rak</span>
                </span>
                <span className="text-[10.5px] text-emerald-700 mt-0.5 block">Utilisasi Aktif</span>
              </div>
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3">
                <span className="text-[11px] font-semibold text-amber-900 block">Jumlah Rak Kosong</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-amber-950 block mt-0.5">
                  {kosongRakAll} <span className="text-xs font-normal">Slot</span>
                </span>
                <span className="text-[10.5px] text-amber-700 mt-0.5 block">Kapasitas Tersedia</span>
              </div>
            </div>

            {/* VISUAL CHART: Horizontal Bar Comparison */}
            {(displayMode === 'both' || displayMode === 'chart') && (
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Visual Okupansi Rak Per Ruangan Data Center
                  </h4>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#1F4E79]" />
                      <span className="text-slate-600 font-medium">Terisi</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-slate-300" />
                      <span className="text-slate-600 font-medium">Kosong</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredRacks.map((rack) => {
                    const terisiWidth = (rack.rakTerisi / rack.totalRak) * 100;
                    const kosongWidth = 100 - terisiWidth;
                    return (
                      <div key={rack.id} className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{rack.ruangan}</span>
                            <span className="text-[11px] text-slate-500">{rack.jenisRak}</span>
                          </div>
                          <div className="flex items-center gap-2 text-right">
                            <span className="text-xs font-bold font-mono text-[#1F4E79]">
                              {rack.rakTerisi} Terisi / {rack.totalRak} Total
                            </span>
                            <span className="text-[11px] font-black font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                              {rack.okupansiPersen}%
                            </span>
                          </div>
                        </div>

                        {/* Visual Bar */}
                        <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden flex">
                          <div
                            className="bg-[#1F4E79] h-full flex items-center justify-center text-[10px] text-white font-mono font-bold transition-all duration-500"
                            style={{ width: `${terisiWidth}%` }}
                            title={`Terisi: ${rack.rakTerisi} Rak (${Math.round(terisiWidth)}%)`}
                          >
                            {rack.rakTerisi} Rak
                          </div>
                          <div
                            className="bg-slate-300 h-full flex items-center justify-center text-[10px] text-slate-700 font-mono transition-all duration-500"
                            style={{ width: `${kosongWidth}%` }}
                            title={`Kosong: ${rack.rakKosong} Rak`}
                          >
                            {rack.rakKosong > 0 ? `${rack.rakKosong} Kosong` : ''}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STRUCTURED TABLE: RUANGAN, JENIS RAK, TOTAL RAK, JUMLAH RAK TERISI */}
            {(displayMode === 'both' || displayMode === 'table') && (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Tabel Detail Rekapitulasi Rak Data Center
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Wajib Menampilkan: Ruangan, Jenis Rak, Total Rak, Jumlah Rak Terisi
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#1F4E79] text-white font-bold text-[11px] uppercase tracking-wider">
                        <th className="px-3.5 py-2.5 border-r border-blue-800">Ruangan</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-800">Jenis Rak</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Total Rak</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Jumlah Rak Terisi</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Slot Kosong</th>
                        <th className="px-3.5 py-2.5 text-center">Persentase Okupansi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredRacks.map((item, idx) => (
                        <tr key={item.id} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-slate-50/60 hover:bg-blue-50/40'}>
                          <td className="px-3.5 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                            {item.ruangan}
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-700 border-r border-slate-200">
                            {item.jenisRak}
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-bold text-slate-800 border-r border-slate-200">
                            {item.totalRak} Unit
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-black text-[#1F4E79] border-r border-slate-200 bg-blue-50/40">
                            {item.rakTerisi} Rak
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono text-amber-700 border-r border-slate-200">
                            {item.rakKosong} Slot
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-black">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {item.okupansiPersen}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                        <td className="px-3.5 py-2.5 uppercase font-mono tracking-wider border-r border-slate-200" colSpan={2}>
                          Total Keseluruhan Fasilitas Data Center
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-slate-900 border-r border-slate-200">
                          {totalRakAll} Unit
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-[#1F4E79] border-r border-slate-200">
                          {terisiRakAll} Rak
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-amber-700 border-r border-slate-200">
                          {kosongRakAll} Slot
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-emerald-700">
                          {okupansiPersenAll}%
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SHEET 2: DATA TENANT DATA CENTER                         */}
        {/* ======================================================== */}
        {activeSheet === 'data_tenant' && (
          <div className="space-y-4">
            <TableauShelvesBadge
              showMe="Show Me #4 (Treemap / Bar Distribution & Matrix) — Kategori Tenant x Jumlah"
              columns="[Kategori Tenant]"
              rows="SUM([Jumlah Tenant])"
              filters="[Status]='Aktif Berlangganan'"
              detail="Sheet Swap 2: Rekapitulasi Data Tenant Fasilitas Colocation & Data Center BP Batam"
            />

            {/* Quick KPI Summary Badge for Tenants (Hanya Total Tenant Terdaftar Sesuai Permintaan) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 sm:col-span-1">
                <span className="text-[11px] font-semibold text-blue-900 block">Total Tenant Terdaftar</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-blue-950 block mt-0.5">
                  {totalTenant} <span className="text-xs font-normal">Tenant</span>
                </span>
                <span className="text-[10.5px] text-blue-700 mt-0.5 block">Instansi Pemerintah, BUMN & Kemitraan Swasta</span>
              </div>
            </div>

            {/* VISUAL CHART: Horizontal Proportion Bars per Kategori */}
            {(displayMode === 'both' || displayMode === 'chart') && (
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Distribusi Tenant Data Center Berdasarkan Kategori
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">Total 100% Portofolio</span>
                </div>

                <div className="space-y-3">
                  {filteredTenants.map((tenant, idx) => {
                    const colors = [
                      { bg: 'bg-[#1F4E79]', text: 'text-blue-900', light: 'bg-blue-50' },
                      { bg: 'bg-teal-600', text: 'text-teal-900', light: 'bg-teal-50' },
                      { bg: 'bg-indigo-600', text: 'text-indigo-900', light: 'bg-indigo-50' },
                      { bg: 'bg-emerald-600', text: 'text-emerald-900', light: 'bg-emerald-50' },
                      { bg: 'bg-purple-600', text: 'text-purple-900', light: 'bg-purple-50' },
                    ];
                    const color = colors[idx % colors.length];

                    return (
                      <div key={tenant.id} className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                          <div>
                            <span className="text-xs font-bold text-slate-900">{tenant.kategori}</span>
                            <span className="text-[11px] text-slate-500 block">{tenant.tipeLayanan}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-slate-800">
                              {tenant.jumlah} Tenant
                            </span>
                            <span className="text-[11px] font-black font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                              {tenant.persentase}%
                            </span>
                          </div>
                        </div>

                        {/* Bar */}
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`${color.bg} h-full rounded-full transition-all duration-500`}
                            style={{ width: `${tenant.persentase}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STRUCTURED TABLE: KATEGORI DAN JUMLAH */}
            {(displayMode === 'both' || displayMode === 'table') && (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Tabel Rekapitulasi Data Tenant
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Wajib Menampilkan: Kategori dan Jumlah
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#1F4E79] text-white font-bold text-[11px] uppercase tracking-wider">
                        <th className="px-3.5 py-2.5 text-center w-12 border-r border-blue-800">No</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-800">Kategori</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Jumlah Tenant</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Kontribusi (%)</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-800">Layanan Digunakan</th>
                        <th className="px-3.5 py-2.5">Alokasi Fasilitas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredTenants.map((item, idx) => (
                        <tr key={item.id} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-slate-50/60 hover:bg-blue-50/40'}>
                          <td className="px-3.5 py-2.5 text-center font-mono font-bold text-slate-600 border-r border-slate-200">
                            {idx + 1}
                          </td>
                          <td className="px-3.5 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                            {item.kategori}
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-black text-[#1F4E79] border-r border-slate-200 bg-blue-50/40">
                            {item.jumlah} Tenant
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-bold text-slate-800 border-r border-slate-200">
                            {item.persentase}%
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-700 border-r border-slate-200">
                            <span className="block">{item.tipeLayanan}</span>
                            <span className="text-[10px] text-slate-400 truncate block mt-0.5">{item.contohTenant}</span>
                          </td>
                          <td className="px-3.5 py-2.5 font-mono text-slate-700">
                            {item.kapasitasRak}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                        <td className="px-3.5 py-2.5 text-center font-mono border-r border-slate-200" colSpan={2}>
                          Total Keseluruhan Tenant Data Center
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-[#1F4E79] border-r border-slate-200">
                          {totalTenant} Tenant
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono border-r border-slate-200">
                          100,0%
                        </td>
                        <td className="px-3.5 py-2.5 text-slate-600 font-normal" colSpan={2}>
                          Fasilitas Colocation Main DC BIDA & DRC Sekupang
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SHEET 3: SERVER & STORAGE                                */}
        {/* ======================================================== */}
        {activeSheet === 'server_storage' && (
          <div className="space-y-4">
            <TableauShelvesBadge
              showMe="Show Me #1 (Matrix Table & Status Indicators) — Server x Brand x Garansi x EOS"
              columns="[Nama Server], [Brand], [Tipe]"
              rows="[Status Garansi], [EOS], SUM([Jumlah Unit])"
              filters="[Satker]='PDSI', [Kategori]='Hardware DC'"
              detail="Sheet Swap 3: Inventarisasi Perangkat Server & Storage Fisik BP Batam"
            />

            {/* Quick KPI Summary Badge for Server & Storage (Hanya Total Server dan Storage Sesuai Permintaan) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 sm:col-span-1">
                <span className="text-[11px] font-semibold text-blue-900 block">Total Server dan Storage</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-blue-950 block mt-0.5">
                  {totalUnitServer} <span className="text-xs font-normal">Unit</span>
                </span>
                <span className="text-[10.5px] text-blue-700 mt-0.5 block">HCI, Blade Compute & Storage SAN/NAS</span>
              </div>
            </div>

            {/* VISUAL CHART: Brand & Type Breakdown */}
            {(displayMode === 'both' || displayMode === 'chart') && (
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Visual Distribusi Unit Hardware Server & Storage
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">Berdasarkan Tipe & Merek</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredServers.map((srv) => {
                    const isWarrantyActive = srv.statusGaransi === 'Aktif';
                    const isEos = srv.eosStatus.includes('EOS');

                    return (
                      <div key={srv.id} className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                              {srv.brand}
                            </span>
                            <span className="text-xs font-mono font-black text-[#1F4E79]">
                              {srv.jumlahUnit} Unit
                            </span>
                          </div>
                          <h5 className="text-xs font-bold text-slate-900 leading-snug">{srv.namaServer}</h5>
                          <span className="text-[11px] text-slate-500 mt-0.5 block">{srv.tipe}</span>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[10px]">
                          <span
                            className={`px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5 ${
                              isWarrantyActive
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {isWarrantyActive ? <CheckCircle2 className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
                            {srv.statusGaransi}
                          </span>

                          <span
                            className={`px-1.5 py-0.5 rounded font-mono font-bold ${
                              isEos ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            EOS: {srv.eosStatus.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STRUCTURED TABLE: NAMA SERVER, TIPE, BRAND, STATUS GARANSI, JUMLAH, EOS */}
            {(displayMode === 'both' || displayMode === 'table') && (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Tabel Detail Infrastruktur Server & Storage
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Wajib Menampilkan: Nama Server, Tipe, Brand, Status Garansi, Jumlah, EOS
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#1F4E79] text-white font-bold text-[11px] uppercase tracking-wider">
                        <th className="px-3.5 py-2.5 border-r border-blue-800">Nama Server</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-800">Tipe</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-800">Brand</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Jumlah</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-800">Status Garansi</th>
                        <th className="px-3.5 py-2.5 text-center">EOS (End of Support)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredServers.map((item, idx) => {
                        const isWarrantyActive = item.statusGaransi === 'Aktif';
                        const isEos = item.eosStatus.includes('EOS');

                        return (
                          <tr key={item.id} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-slate-50/60 hover:bg-blue-50/40'}>
                            <td className="px-3.5 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                              {item.namaServer}
                              <span className="text-[10px] text-slate-400 block font-normal mt-0.5">{item.penggunaan}</span>
                            </td>
                            <td className="px-3.5 py-2.5 text-slate-700 border-r border-slate-200">
                              {item.tipe}
                            </td>
                            <td className="px-3.5 py-2.5 font-semibold text-slate-800 border-r border-slate-200">
                              {item.brand}
                            </td>
                            <td className="px-3.5 py-2.5 text-center font-mono font-black text-[#1F4E79] border-r border-slate-200 bg-blue-50/40">
                              {item.jumlahUnit} Unit
                            </td>
                            <td className="px-3.5 py-2.5 text-center border-r border-slate-200">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                                  isWarrantyActive
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {isWarrantyActive ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                {item.statusGaransi}
                              </span>
                            </td>
                            <td className="px-3.5 py-2.5 text-center">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                                  isEos
                                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                }`}
                              >
                                {item.eosStatus}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                        <td className="px-3.5 py-2.5 uppercase font-mono tracking-wider border-r border-slate-200" colSpan={3}>
                          Total Perangkat Server & Storage Terdata
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-[#1F4E79] border-r border-slate-200">
                          {totalUnitServer} Unit
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-emerald-700 border-r border-slate-200">
                          {garansiAktifUnit} Unit Aktif
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-slate-700">
                          {totalUnitServer - eosUnits} Unit Supported
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
