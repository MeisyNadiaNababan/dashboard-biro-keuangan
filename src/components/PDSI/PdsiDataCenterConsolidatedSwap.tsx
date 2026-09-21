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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  ReferenceLine,
} from 'recharts';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

type ActiveSheet = 'rak_dc' | 'data_tenant' | 'server_storage';

interface PdsiDataCenterConsolidatedSwapProps {
  onOpenFormulaModal?: (metricId: string) => void;
}

export const PdsiDataCenterConsolidatedSwap: React.FC<PdsiDataCenterConsolidatedSwapProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>('rak_dc');
  const [displayMode, setDisplayMode] = useState<'chart' | 'table'>('chart');
  const [serverVisualType, setServerVisualType] = useState<'bar' | 'treemap'>('bar');
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

  // Chart Data for Okupansi Rak DC
  const chartDataRacks = useMemo(() => {
    return filteredRacks.map((rack) => {
      let shortName = rack.ruangan
        .replace('Ruang Server ', 'R. Server ')
        .replace('Ruang Data Center ', 'R. DC ');
      return {
        id: rack.id,
        name: shortName,
        fullName: rack.ruangan,
        jenisRak: rack.jenisRak,
        terisi: rack.rakTerisi,
        kosong: rack.rakKosong,
        total: rack.totalRak,
        okupansi: rack.okupansiPersen,
      };
    });
  }, [filteredRacks]);

  // Chart Data for Tenants
  const chartDataTenants = useMemo(() => {
    return filteredTenants.map((t) => ({
      id: t.id,
      name: t.kategori,
      jumlah: t.jumlah,
      persen: t.persentase,
      tipe: t.tipeLayanan,
      contoh: t.contohTenant,
      kapasitas: t.kapasitasRak,
    }));
  }, [filteredTenants]);

  // Tooltip for Racks
  const CustomTooltipRack = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 max-w-xs select-none">
          <div className="font-bold text-sky-300 border-b border-slate-800 pb-1">
            {data.fullName}
          </div>
          <div className="text-[11px] text-slate-400">
            Tipe Rak: <span className="text-slate-200">{data.jenisRak}</span>
          </div>
          <div className="pt-1 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Rak:</span>
              <span className="font-bold font-mono text-slate-200">{data.total} Unit</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-sky-400">Rak Terisi:</span>
              <span className="font-bold font-mono text-sky-300">
                {data.terisi} Unit ({data.okupansi}%)
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-amber-400">Rak Kosong:</span>
              <span className="font-bold font-mono text-amber-300">{data.kosong} Unit</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Tooltip for Tenants
  const CustomTooltipTenant = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 max-w-xs select-none">
          <div className="font-bold text-sky-300 border-b border-slate-800 pb-1">
            {data.name}
          </div>
          <div className="text-[11px] text-slate-300">
            Layanan: <span className="text-slate-200 font-medium">{data.tipe}</span>
          </div>
          <div className="pt-1 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Jumlah Tenant:</span>
              <span className="font-bold font-mono text-sky-300">
                {data.jumlah} Tenant ({data.persen}%)
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Kapasitas Rak:</span>
              <span className="font-mono text-slate-200">{data.kapasitas}</span>
            </div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
              Mitra: {data.contoh}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

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

  // Chart Data for Server & Storage (Horizontal Bar Tableau Show Me #2)
  const chartDataServers = useMemo(() => {
    return filteredServers.map((s) => {
      let shortName = s.namaServer
        .replace('Cluster Nutanix Enterprise Cloud', 'Nutanix HCI Cloud')
        .replace('Cisco UCS Blade B200 Compute Cluster', 'Cisco UCS B200')
        .replace('Dell PowerEdge R750 Enterprise Server', 'Dell PowerEdge R750')
        .replace('SAN Storage All-Flash OceanStor', 'Huawei OceanStor')
        .replace('Database Server Cluster (Exadata X8M)', 'Oracle Exadata X8M')
        .replace('HP ProLiant DL380 Gen10 Application Host', 'HP ProLiant DL380')
        .replace('IBM Tape Library TS4300 Cold Storage Backup', 'IBM Tape TS4300')
        .replace('Gateway Edge & Security Appliance NGFW', 'Next-Gen NGFW');

      const isWarrantyActive = srvStatusColor(s.statusGaransi);

      return {
        id: s.id,
        name: shortName,
        fullName: s.namaServer,
        brand: s.brand,
        tipe: s.tipe,
        unit: s.jumlahUnit,
        statusGaransi: s.statusGaransi,
        eosStatus: s.eosStatus,
        penggunaan: s.penggunaan,
        tanggalGaransi: s.tanggalGaransi,
        fillColor: isWarrantyActive,
      };
    });
  }, [filteredServers]);

  function srvStatusColor(status: string) {
    if (status === 'Aktif') return '#1F4E79';
    if (status === 'Masa Perpanjangan') return '#d97706';
    return '#e11d48';
  }

  // Custom Tooltip for Server & Storage
  const CustomTooltipServer = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 max-w-xs select-none">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
            <span className="font-bold text-sky-300">{data.fullName}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {data.brand}
            </span>
          </div>
          <div className="text-[11px] text-slate-300">
            Tipe: <span className="text-white font-medium">{data.tipe}</span>
          </div>
          <div className="pt-1 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Jumlah Unit:</span>
              <span className="font-bold font-mono text-sky-300">{data.unit} Unit</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Status Garansi:</span>
              <span
                className={`font-bold ${
                  data.statusGaransi === 'Aktif'
                    ? 'text-emerald-400'
                    : data.statusGaransi === 'Masa Perpanjangan'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {data.statusGaransi} ({data.tanggalGaransi})
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Support EOS:</span>
              <span className="font-mono text-slate-300">{data.eosStatus}</span>
            </div>
            <div className="text-[10.5px] text-slate-400 pt-1 border-t border-slate-800">
              Penggunaan: {data.penggunaan}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

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

        {/* Action Controls: View Switcher (Grafis & Tabel) */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs text-xs font-medium">
            <button
              onClick={() => setDisplayMode('chart')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                displayMode === 'chart'
                  ? 'bg-[#1F4E79] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Grafis</span>
            </button>
            <button
              onClick={() => setDisplayMode('table')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                displayMode === 'table'
                  ? 'bg-[#1F4E79] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Static KPI Row: Tetap Tampil di Atas (Tidak Ikut Sheet Swap) */}
      <div className="bg-slate-50/75 border-b border-slate-200 px-4 py-3 sm:px-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* KPI 1: JUMLAH RAK */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Jumlah Rak Data Center
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-[#1F4E79] mt-0.5">
                {totalRakAll} <span className="text-xs font-normal text-slate-500">Unit Rak</span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                <span className="text-emerald-700 font-bold">{terisiRakAll} Terisi ({okupansiPersenAll}%)</span> • {kosongRakAll} Kosong
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-[#1F4E79]" />
            </div>
          </div>

          {/* KPI 2: JUMLAH TENANT DATA */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Jumlah Tenant Data
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-[#0284c7] mt-0.5">
                {totalTenant} <span className="text-xs font-normal text-slate-500">Tenant</span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                Pemerintah, BUMN &amp; Swasta
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#0284c7]" />
            </div>
          </div>

          {/* KPI 3: TOTAL SERVER DAN STORAGE */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Server &amp; Storage
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-[#0d9488] mt-0.5">
                {totalUnitServer} <span className="text-xs font-normal text-slate-500">Unit</span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                <span className="text-emerald-700 font-bold">{garansiAktifUnit} Garansi Aktif</span> • {totalUnitServer - eosUnits} Supported
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center shrink-0">
              <HardDrive className="w-5 h-5 text-[#0d9488]" />
            </div>
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

            {/* VISUAL CHART: Recharts Bar Comparison (Mode Grafis) */}
            {displayMode === 'chart' && (
              <div className="space-y-4">
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#1F4E79]" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Grafik Okupansi Rak per Ruangan Data Center (Terisi vs Kosong)
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      Total Kapasitas: <strong className="text-slate-800 font-bold">{terisiRakAll} Terisi</strong> dari {totalRakAll} Rak ({okupansiPersenAll}%)
                    </span>
                  </div>

                  <div className="h-[270px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartDataRacks}
                        margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                          axisLine={{ stroke: '#cbd5e1' }}
                          interval={0}
                          angle={-10}
                          textAnchor="end"
                          height={38}
                        />
                        <YAxis
                          tick={{ fontSize: 10, fill: '#64748b' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip content={<CustomTooltipRack />} />
                        <Legend
                          wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                          iconType="circle"
                        />
                        <Bar
                          dataKey="terisi"
                          name="Rak Terisi"
                          fill="#1F4E79"
                          radius={[4, 4, 0, 0]}
                          barSize={20}
                        />
                        <Bar
                          dataKey="kosong"
                          name="Rak Kosong"
                          fill="#94a3b8"
                          radius={[4, 4, 0, 0]}
                          barSize={20}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* STRUCTURED TABLE: RUANGAN, JENIS RAK, TOTAL RAK, JUMLAH RAK TERISI */}
            {displayMode === 'table' && (
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

            {/* VISUAL CHART: Recharts BarChart per Kategori Tenant (Mode Grafis) */}
            {displayMode === 'chart' && (
              <div className="space-y-4">
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#1F4E79]" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Grafik Komposisi Tenant Data Center Berdasarkan Kategori
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      Total Tenant: <strong className="text-slate-800 font-bold">{totalTenant} Tenant</strong> (100% Portofolio)
                    </span>
                  </div>

                  <div className="h-[260px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartDataTenants}
                        margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                          axisLine={{ stroke: '#cbd5e1' }}
                          interval={0}
                          angle={-10}
                          textAnchor="end"
                          height={38}
                        />
                        <YAxis
                          tick={{ fontSize: 10, fill: '#64748b' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip content={<CustomTooltipTenant />} />
                        <Bar
                          dataKey="jumlah"
                          name="Jumlah Tenant"
                          radius={[4, 4, 0, 0]}
                          barSize={24}
                          fill="#1F4E79"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* STRUCTURED TABLE: KATEGORI DAN JUMLAH */}
            {displayMode === 'table' && (
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
              showMe="Show Me #2 (Horizontal Bar Chart) & Show Me #10 (Treemap)"
              columns="SUM([Jumlah Unit])"
              rows="[Brand], [Nama Server]"
              filters="[Status Garansi], [Tipe Hardware]"
              detail="Sheet Swap 3: Visualisasi Standar Tableau Show Me Distribusi Unit Hardware Server & Storage (58 Unit)"
            />

            {/* VISUAL CHART: Standar Tableau Show Me (Horizontal Bar & Treemap) */}
            {displayMode === 'chart' && (
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3 border-b border-slate-200">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-[#1F4E79]" />
                      Visual Distribusi Unit Hardware Server & Storage (Tableau Show Me)
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                      Columns: SUM([Jumlah Unit]) • Rows: [Brand], [Nama Server] • Total {totalUnitServer} Unit
                    </span>
                  </div>

                  {/* Tableau Show Me Option Switcher */}
                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs self-start sm:self-auto">
                    <button
                      onClick={() => setServerVisualType('bar')}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                        serverVisualType === 'bar'
                          ? 'bg-[#1F4E79] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Tableau Show Me #2: Horizontal Bar Chart"
                    >
                      <BarChart3 className="w-3 h-3" />
                      <span>Bar Chart (Show Me #2)</span>
                    </button>
                    <button
                      onClick={() => setServerVisualType('treemap')}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                        serverVisualType === 'treemap'
                          ? 'bg-[#1F4E79] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Tableau Show Me #10: Treemap"
                    >
                      <Layers className="w-3 h-3" />
                      <span>Treemap (Show Me #10)</span>
                    </button>
                  </div>
                </div>

                {/* Option 1: Tableau Horizontal Bar Chart (Show Me #2) via Recharts */}
                {serverVisualType === 'bar' && (
                  <div className="space-y-3">
                    <div className="h-[360px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={chartDataServers}
                          margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                          <XAxis
                            type="number"
                            domain={[0, 18]}
                            tick={{ fontSize: 10, fill: '#64748b' }}
                            axisLine={{ stroke: '#cbd5e1' }}
                            label={{
                              value: 'Jumlah Unit Hardware (Columns: SUM([Jumlah Unit]))',
                              position: 'insideBottom',
                              offset: -10,
                              fontSize: 11,
                              fill: '#64748b',
                            }}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 600 }}
                            width={165}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip content={<CustomTooltipServer />} />
                          <ReferenceLine
                            x={7.25}
                            stroke="#d97706"
                            strokeDasharray="4 4"
                            label={{
                              value: 'Garis Referensi (Rata-rata: 7.3 Unit)',
                              position: 'top',
                              fill: '#b45309',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          />
                          <Bar dataKey="unit" name="Jumlah Unit" radius={[0, 6, 6, 0]} barSize={22}>
                            {chartDataServers.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fillColor} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Tableau Continuous Measure Axis & Legend */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 border-t border-slate-200 text-[11px] text-slate-600">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-semibold text-slate-700">Warna Markah (Status Garansi):</span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-xs bg-[#1F4E79]" />
                          <span>Garansi Aktif ({garansiAktifUnit} Unit • 82,8%)</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-xs bg-[#d97706]" />
                          <span>Masa Perpanjangan (4 Unit • 6,9%)</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-xs bg-[#e11d48]" />
                          <span>Habis Garansi ({eosUnits} Unit • 10,3%)</span>
                        </span>
                      </div>
                      <div className="text-[10.5px] font-mono text-slate-500">
                        Formula Tableau: <code>SUM([Jumlah Unit]) By [Brand]</code>
                      </div>
                    </div>
                  </div>
                )}

                {/* Option 2: Tableau Treemap (Show Me #10) */}
                {serverVisualType === 'treemap' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-2 min-h-[300px]">
                      {filteredServers.map((srv, idx) => {
                        const pct = Math.round((srv.jumlahUnit / totalUnitServer) * 1000) / 10;
                        const isWarrantyActive = srv.statusGaransi === 'Aktif';
                        const isPerpanjangan = srv.statusGaransi === 'Masa Perpanjangan';

                        // Col span proportional to unit size in a 12-col grid
                        const colSpanClass =
                          srv.jumlahUnit >= 16
                            ? 'col-span-12 md:col-span-6 row-span-2'
                            : srv.jumlahUnit >= 12
                            ? 'col-span-12 md:col-span-6'
                            : srv.jumlahUnit >= 10
                            ? 'col-span-6 md:col-span-4'
                            : srv.jumlahUnit >= 6
                            ? 'col-span-6 md:col-span-4'
                            : 'col-span-6 md:col-span-3';

                        const bgClass = isWarrantyActive
                          ? 'bg-blue-900 text-white'
                          : isPerpanjangan
                          ? 'bg-amber-700 text-white'
                          : 'bg-rose-800 text-white';

                        return (
                          <div
                            key={srv.id}
                            className={`${colSpanClass} ${bgClass} rounded-lg p-3.5 flex flex-col justify-between shadow-2xs transition-transform hover:scale-[1.01]`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-[10px] font-mono uppercase tracking-wider opacity-85 font-bold">
                                  {srv.brand}
                                </span>
                                <span className="text-xs font-mono font-black">
                                  {srv.jumlahUnit} Unit ({pct}%)
                                </span>
                              </div>
                              <h5 className="text-xs font-bold leading-snug">{srv.namaServer}</h5>
                              <span className="text-[10px] opacity-80 block mt-0.5">{srv.tipe}</span>
                            </div>

                            <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-[10px]">
                              <span>{srv.statusGaransi}</span>
                              <span className="font-mono">EOS: {srv.eosStatus.split(' ')[0]}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono text-center">
                      Ukuran Kotak Treemap = SUM([Jumlah Unit]) • Warna = [Status Garansi]
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STRUCTURED TABLE: NAMA SERVER, TIPE, BRAND, STATUS GARANSI, JUMLAH, EOS */}
            {displayMode === 'table' && (
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
