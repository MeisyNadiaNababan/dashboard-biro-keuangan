import React, { useState } from 'react';
import {
  DATA_JALUR_FIBER_OPTIC,
  DC_RACKS_DATA,
  DATA_KEPUASAN_PELANGGAN_DC,
  CYBER_THREATS_DATA,
  SERVER_STORAGE_DATA,
  BP_BATAM_APPS_DATA,
  PDSI_PERMINTAAN_LAYANAN_TI,
  PdsiJalurFoItem,
  BpBatamAppItem,
} from '../../data/pdsiData';
import {
  Network,
  Server,
  SmilePlus,
  ShieldAlert,
  HardDrive,
  AppWindow,
  Headphones,
  Search,
  CheckCircle2,
  Layers,
  MapPin,
  Activity,
  Radio,
  ExternalLink,
  Table,
  BarChart3,
  Building2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

// Coordinates and details for the 8 Fiber Optic Nodes on Pulau Batam schematic map
interface FoMapNode {
  id: string;
  name: string;
  shortName: string;
  wilayah: string;
  x: number; // SVG viewBox coordinates (0-800, 0-480)
  y: number;
  corridorId: string;
  role: string;
  core: number;
}

const FO_NODES: FoMapNode[] = [
  {
    id: 'node-bc',
    name: 'Gedung BIDA Batam Centre (Core NOC)',
    shortName: 'Batam Centre (NOC)',
    wilayah: 'Batam Kota',
    x: 430,
    y: 190,
    corridorId: 'fo-jlr-01',
    role: 'Pusat Pemerintahan & Main DC',
    core: 96,
  },
  {
    id: 'node-bta',
    name: 'Pelabuhan Peti Kemas Batu Ampar',
    shortName: 'Batu Ampar',
    wilayah: 'Batu Ampar',
    x: 290,
    y: 85,
    corridorId: 'fo-jlr-02',
    role: 'Logistik Maritim & Bea Cukai',
    core: 72,
  },
  {
    id: 'node-skp',
    name: 'DRC Sekupang & RSBP Batam',
    shortName: 'Sekupang (DRC)',
    wilayah: 'Sekupang',
    x: 130,
    y: 210,
    corridorId: 'fo-jlr-03',
    role: 'Disaster Recovery & Medis',
    core: 96,
  },
  {
    id: 'node-ngs',
    name: 'KEK Nongsa Digital Park & DC Hub',
    shortName: 'Nongsa KEK',
    wilayah: 'Nongsa',
    x: 670,
    y: 100,
    corridorId: 'fo-jlr-04',
    role: 'Hub Digital & Kabel Laut',
    core: 96,
  },
  {
    id: 'node-kbl',
    name: 'Kawasan Industri Kabil & Pelabuhan CPO',
    shortName: 'Kabil Industri',
    wilayah: 'Kabil / Nongsa Selatan',
    x: 640,
    y: 310,
    corridorId: 'fo-jlr-05',
    role: 'Industri Manufaktur & B3',
    core: 48,
  },
  {
    id: 'node-bnd',
    name: 'Bandara Hang Nadim & KEK BAT',
    shortName: 'Hang Nadim',
    wilayah: 'Batam Kota / Hang Nadim',
    x: 570,
    y: 180,
    corridorId: 'fo-jlr-06',
    role: 'Kedirgantaraan & Logistik Udara',
    core: 48,
  },
  {
    id: 'node-ngy',
    name: 'Nagoya Sentra Finansial / Komersial',
    shortName: 'Nagoya / Lubuk Baja',
    wilayah: 'Lubuk Baja / Nagoya',
    x: 280,
    y: 160,
    corridorId: 'fo-jlr-07',
    role: 'Perbankan & Pelayanan Mitra',
    core: 72,
  },
  {
    id: 'node-btj',
    name: 'Kawasan Pelayanan Batu Aji & Mukakuning',
    shortName: 'Batu Aji / Mukakuning',
    wilayah: 'Batu Aji / Sagulung',
    x: 310,
    y: 350,
    corridorId: 'fo-jlr-08',
    role: 'Industri Elektronik & Layanan Publik',
    core: 48,
  },
];

// Corridors / Links connecting the nodes
interface FoLink {
  from: string;
  to: string;
  corridorId: string;
  core: number;
  label: string;
  tipe: string;
}

const FO_LINKS: FoLink[] = [
  { from: 'node-bc', to: 'node-bta', corridorId: 'fo-jlr-02', core: 72, label: 'Batam Centre - Batu Ampar (18.5 Km)', tipe: 'Interkoneksi Maritim' },
  { from: 'node-bc', to: 'node-ngy', corridorId: 'fo-jlr-07', core: 72, label: 'Batam Centre - Nagoya (12.4 Km)', tipe: 'Distribusi Komersial' },
  { from: 'node-ngy', to: 'node-bta', corridorId: 'fo-jlr-02', core: 72, label: 'Nagoya - Batu Ampar Link', tipe: 'Loop Pengaman' },
  { from: 'node-bc', to: 'node-skp', corridorId: 'fo-jlr-03', core: 96, label: 'Batam Centre - Sekupang DRC (26.4 Km)', tipe: 'Backbone Replikasi DRC' },
  { from: 'node-bc', to: 'node-bnd', corridorId: 'fo-jlr-06', core: 48, label: 'Batam Centre - Hang Nadim (16.7 Km)', tipe: 'Spur Link Bandara' },
  { from: 'node-bnd', to: 'node-ngs', corridorId: 'fo-jlr-04', core: 96, label: 'Hang Nadim - Nongsa KEK (22.1 Km)', tipe: 'Konektivitas KEK Digital' },
  { from: 'node-bc', to: 'node-kbl', corridorId: 'fo-jlr-05', core: 48, label: 'Batam Centre - Kabil (19.3 Km)', tipe: 'Distribusi Industri' },
  { from: 'node-bc', to: 'node-btj', corridorId: 'fo-jlr-08', core: 48, label: 'Batam Centre - Batu Aji / Mukakuning (21.0 Km)', tipe: 'Distribusi Pelayanan' },
  { from: 'node-btj', to: 'node-skp', corridorId: 'fo-jlr-03', core: 48, label: 'Batu Aji - Sekupang Ring Selatan', tipe: 'Redundansi Link' },
];

export const PdsiSatuDataVisualSuite: React.FC = () => {
  // Navigation Tabs for the 7 active visualizations
  const [activeVisualTab, setActiveVisualTab] = useState<string>('all');

  // Visualization 1: Fiber Optic Filter & Active Node/Corridor
  const [selectedFoWilayah, setSelectedFoWilayah] = useState<string>('ALL');
  const [activeFoCorridorId, setActiveFoCorridorId] = useState<string>('fo-jlr-01');
  const [foViewMode, setFoViewMode] = useState<'topology' | 'table'>('topology');

  // Visualization 6: Server & Storage Filter
  const [serverTypeFilter, setServerTypeFilter] = useState<string>('ALL');

  // Visualization 7: App by Operational Unit Filter & Search
  const [appUnitFilter, setAppUnitFilter] = useState<string>('ALL');
  const [appSearch, setAppSearch] = useState<string>('');
  const [appCategoryFilter, setAppCategoryFilter] = useState<string>('ALL');

  // Selected FO Corridor
  const activeFoCorridor = DATA_JALUR_FIBER_OPTIC.find((c) => c.id === activeFoCorridorId) || DATA_JALUR_FIBER_OPTIC[0];
  const filteredFo = selectedFoWilayah === 'ALL'
    ? DATA_JALUR_FIBER_OPTIC
    : DATA_JALUR_FIBER_OPTIC.filter((item) => item.bagianWilayah.toLowerCase().includes(selectedFoWilayah.toLowerCase()));

  // Data Center Rack Room Aggregates (Denah Okupansi Slot Rak telah dihapus sesuai permintaan)
  const totalRacksAll = DC_RACKS_DATA.reduce((acc, r) => acc + r.totalRak, 0);
  const totalTerisiAll = DC_RACKS_DATA.reduce((acc, r) => acc + r.jumlahRakTerisi, 0);
  const totalKosongAll = DC_RACKS_DATA.reduce((acc, r) => acc + r.jumlahRakKosong, 0);

  // Cyber Threats sorted & total
  const totalSerangan = CYBER_THREATS_DATA.reduce((acc, t) => acc + t.jmlSerangan, 0);
  const maxThreat = Math.max(...CYBER_THREATS_DATA.map((t) => t.jmlSerangan), 1);

  // Server & Storage filtered & total
  const serverTypes = ['ALL', ...Array.from(new Set(SERVER_STORAGE_DATA.map((s) => s.tipe)))];
  const filteredServers = serverTypeFilter === 'ALL'
    ? SERVER_STORAGE_DATA
    : SERVER_STORAGE_DATA.filter((s) => s.tipe === serverTypeFilter);
  const totalHardwareUnits = SERVER_STORAGE_DATA.reduce((acc, s) => acc + s.jumlahUnit, 0);
  const maxHardware = Math.max(...SERVER_STORAGE_DATA.map((s) => s.jumlahUnit), 1);

  // Apps grouped by Unit Operasional (Bukan card kotak-kotak)
  const allUnits = ['ALL', ...Array.from(new Set(BP_BATAM_APPS_DATA.map((a) => a.unitOperasional)))];
  const appCategories = ['ALL', ...Array.from(new Set(BP_BATAM_APPS_DATA.map((a) => a.kategoriAplikasi)))];

  // Unit breakdown calculations for Treemap & Distribution
  const unitStats = Array.from(new Set(BP_BATAM_APPS_DATA.map((a) => a.unitOperasional))).map((unit) => {
    const apps = BP_BATAM_APPS_DATA.filter((a) => a.unitOperasional === unit);
    return {
      unit,
      count: apps.length,
      percentage: ((apps.length / BP_BATAM_APPS_DATA.length) * 100).toFixed(1),
      apps,
    };
  });

  const filteredApps = BP_BATAM_APPS_DATA.filter((app) => {
    const matchUnit = appUnitFilter === 'ALL' || app.unitOperasional === appUnitFilter;
    const matchCat = appCategoryFilter === 'ALL' || app.kategoriAplikasi === appCategoryFilter;
    const matchSearch = app.namaAplikasi.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.uraianAplikasi.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.unitOperasional.toLowerCase().includes(appSearch.toLowerCase());
    return matchUnit && matchCat && matchSearch;
  });

  // Helpdesk tickets total & max
  const totalHelpdesk = PDSI_PERMINTAAN_LAYANAN_TI.reduce((acc, h) => acc + h.jumlah, 0);
  const maxHelpdesk = Math.max(...PDSI_PERMINTAAN_LAYANAN_TI.map((h) => h.jumlah), 1);

  // 7 Visualizations (Daftar Software dihapus sesuai permintaan user)
  const visualNavButtons = [
    { id: 'all', label: 'Semua (7 Visualisasi)', icon: Layers },
    { id: 'vis-1', label: '1. Jalur FO', icon: Network },
    { id: 'vis-2', label: '2. Rak Data Center', icon: Server },
    { id: 'vis-3', label: '3. Kepuasan DC', icon: SmilePlus },
    { id: 'vis-4', label: '4. Serangan Keamanan', icon: ShieldAlert },
    { id: 'vis-5', label: '5. Server & Storage', icon: HardDrive },
    { id: 'vis-6', label: '6. Aplikasi BP Batam', icon: AppWindow },
    { id: 'vis-7', label: '7. Permintaan Layanan', icon: Headphones },
  ];

  // Unit color themes for the App Visualization
  const getUnitTheme = (unit: string) => {
    if (unit.includes('Keuangan')) return { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300', dot: 'bg-emerald-600', badge: 'bg-emerald-100 text-emerald-800' };
    if (unit.includes('Lahan')) return { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300', dot: 'bg-amber-600', badge: 'bg-amber-100 text-amber-800' };
    if (unit.includes('Umum')) return { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-300', dot: 'bg-blue-600', badge: 'bg-blue-100 text-blue-800' };
    if (unit.includes('PTSP')) return { bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-300', dot: 'bg-purple-600', badge: 'bg-purple-100 text-purple-800' };
    if (unit.includes('Pelabuhan')) return { bg: 'bg-cyan-50', text: 'text-cyan-900', border: 'border-cyan-300', dot: 'bg-cyan-600', badge: 'bg-cyan-100 text-cyan-800' };
    if (unit.includes('Rumah Sakit') || unit.includes('RSBP')) return { bg: 'bg-rose-50', text: 'text-rose-900', border: 'border-rose-300', dot: 'bg-rose-600', badge: 'bg-rose-100 text-rose-800' };
    if (unit.includes('SPAM') || unit.includes('Fasling')) return { bg: 'bg-teal-50', text: 'text-teal-900', border: 'border-teal-300', dot: 'bg-teal-600', badge: 'bg-teal-100 text-teal-800' };
    return { bg: 'bg-indigo-50', text: 'text-indigo-900', border: 'border-indigo-300', dot: 'bg-indigo-600', badge: 'bg-indigo-100 text-indigo-800' };
  };

  return (
    <div className="space-y-6">
      {/* Quick Visualisation Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs flex items-center gap-1.5 overflow-x-auto">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 shrink-0">
          Visualisasi:
        </span>
        {visualNavButtons.map((btn) => {
          const Icon = btn.icon;
          const isActive = activeVisualTab === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setActiveVisualTab(btn.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#1F4E79] text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. VISUALISASI DATA JALUR FIBER OPTIC (FO) - DATASET NO. 5 */}
      {/* VISUALISASI BARU: Diagram Topologi Jaringan Interaktif & Peta Koridor Pulau Batam */}
      {/* ========================================================================= */}
      {(activeVisualTab === 'all' || activeVisualTab === 'vis-1') && (
        <div id="vis-1" className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          {/* Header Standardisasi Point 9 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                  DATASET NO. 5 (Hal. 41)
                </span>
                <h2 className="text-sm font-bold text-slate-900">
                  Data Jalur Fiber Optic (FO)
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                  🏷️ Visualisasi: Topologi Skematik Interaktif Backbone Fiber Optik Pulau Batam
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>BAGIAN WILAYAH</strong>, &amp; <strong>LOKASI</strong>
                </span>
              </div>
            </div>

            {/* View Mode & Filter */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 p-0.5 rounded border border-slate-200">
                <button
                  onClick={() => setFoViewMode('topology')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer flex items-center gap-1 ${
                    foViewMode === 'topology' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Network className="w-3.5 h-3.5" />
                  Topologi Map
                </button>
                <button
                  onClick={() => setFoViewMode('table')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer flex items-center gap-1 ${
                    foViewMode === 'table' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  Tabel Koridor
                </button>
              </div>

              <select
                value={selectedFoWilayah}
                onChange={(e) => {
                  setSelectedFoWilayah(e.target.value);
                  const matched = DATA_JALUR_FIBER_OPTIC.find((c) =>
                    e.target.value === 'ALL' || c.bagianWilayah.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                  if (matched) setActiveFoCorridorId(matched.id);
                }}
                className="text-xs border border-slate-300 rounded px-2.5 py-1 bg-white text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
              >
                <option value="ALL">Semua Bagian Wilayah (8 Koridor)</option>
                <option value="Batam Kota">Batam Kota</option>
                <option value="Batu Ampar">Batu Ampar</option>
                <option value="Sekupang">Sekupang</option>
                <option value="Nongsa">Nongsa &amp; KEK</option>
                <option value="Kabil">Kabil</option>
                <option value="Lubuk Baja">Lubuk Baja / Nagoya</option>
                <option value="Batu Aji">Batu Aji / Sagulung</option>
              </select>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            <div className="bg-sky-50/70 border border-sky-200 rounded p-2 text-center">
              <span className="text-[10px] text-sky-800 font-semibold block">Total Koridor Jaringan</span>
              <span className="text-base font-bold text-sky-950 font-mono">{DATA_JALUR_FIBER_OPTIC.length} Koridor</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-2 text-center">
              <span className="text-[10px] text-slate-600 font-semibold block">Total Panjang Bentang</span>
              <span className="text-base font-bold text-slate-900 font-mono">151,2 Km FO</span>
            </div>
            <div className="bg-emerald-50/70 border border-emerald-200 rounded p-2 text-center">
              <span className="text-[10px] text-emerald-800 font-semibold block">Kapasitas Core Maks</span>
              <span className="text-base font-bold text-emerald-950 font-mono">96 Core SM</span>
            </div>
            <div className="bg-indigo-50/70 border border-indigo-200 rounded p-2 text-center">
              <span className="text-[10px] text-indigo-800 font-semibold block">Tahun Rekapitulasi</span>
              <span className="text-base font-bold text-indigo-950 font-mono">Tahun 2026</span>
            </div>
          </div>

          {foViewMode === 'topology' ? (
            /* ========================================================================= */
            /* VISUAL TOPOLOGI MAP: Interactive Geospatial FO Backbone of Pulau Batam */
            /* ========================================================================= */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* Left Column: Interactive Topology Canvas (8 Cols) */}
              <div className="lg:col-span-8 bg-linear-to-b from-slate-900 to-slate-950 rounded-xl p-3 border border-slate-800 shadow-md relative overflow-hidden">
                {/* Visual Header of the Topology Console */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">NOC TOPOLOGY MAP:</span>
                    <span className="text-slate-300">Ring Backbone Serat Optik BP Batam</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-0.5 bg-emerald-400 inline-block"></span> 96 Core
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-0.5 bg-sky-400 inline-block"></span> 72 Core
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-0.5 bg-amber-400 inline-block"></span> 48 Core
                    </span>
                  </div>
                </div>

                {/* SVG Canvas depicting schematic Pulau Batam */}
                <div className="relative w-full aspect-16/10 bg-slate-950/80 rounded-lg overflow-hidden border border-slate-800/80 flex items-center justify-center">
                  <svg
                    viewBox="0 0 800 450"
                    className="w-full h-full select-none"
                    style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.5))' }}
                  >
                    <defs>
                      {/* Grid Pattern */}
                      <pattern id="fo-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                      </pattern>

                      {/* Gradients */}
                      <linearGradient id="link-grad-96" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <linearGradient id="link-grad-72" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                      <linearGradient id="link-grad-48" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>

                    {/* Background Grid */}
                    <rect width="800" height="450" fill="url(#fo-grid)" />

                    {/* Schematic Outline of Pulau Batam Coastline */}
                    <path
                      d="M 120 220 C 130 150, 200 90, 270 70 C 330 50, 420 55, 520 80 C 600 100, 720 80, 740 140 C 750 200, 720 280, 680 340 C 640 400, 560 410, 480 390 C 400 370, 320 420, 240 380 C 170 340, 110 300, 120 220 Z"
                      fill="#0f172a"
                      stroke="#1e293b"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="opacity-60"
                    />

                    {/* Ambient Water Label */}
                    <text x="70" y="70" fill="#334155" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      SELAT MALAKA / SINGAPORE STRAIT
                    </text>
                    <text x="610" y="420" fill="#334155" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      PERAIRAN KABIL / SELAT RIAU
                    </text>

                    {/* FO Links / Cables */}
                    {FO_LINKS.map((link, idx) => {
                      const fromNode = FO_NODES.find((n) => n.id === link.from);
                      const toNode = FO_NODES.find((n) => n.id === link.to);
                      if (!fromNode || !toNode) return null;

                      const isSelected = activeFoCorridorId === link.corridorId;
                      const strokeColor = link.core === 96 ? 'url(#link-grad-96)' : link.core === 72 ? 'url(#link-grad-72)' : 'url(#link-grad-48)';
                      const strokeWidth = isSelected ? 4.5 : link.core === 96 ? 3 : 2;

                      return (
                        <g
                          key={idx}
                          className="cursor-pointer group"
                          onClick={() => setActiveFoCorridorId(link.corridorId)}
                        >
                          {/* Glow background line when selected */}
                          {isSelected && (
                            <line
                              x1={fromNode.x}
                              y1={fromNode.y}
                              x2={toNode.x}
                              y2={toNode.y}
                              stroke="#38bdf8"
                              strokeWidth="9"
                              strokeOpacity="0.4"
                              strokeLinecap="round"
                            />
                          )}

                          {/* Base Cable Line */}
                          <line
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            className="transition-all duration-300"
                          />

                          {/* Midpoint Core Badge */}
                          <circle
                            cx={(fromNode.x + toNode.x) / 2}
                            cy={(fromNode.y + toNode.y) / 2}
                            r={isSelected ? 7 : 5}
                            fill="#090d16"
                            stroke={link.core === 96 ? '#10b981' : link.core === 72 ? '#38bdf8' : '#fbbf24'}
                            strokeWidth="1.5"
                          />
                        </g>
                      );
                    })}

                    {/* FO Hub Nodes */}
                    {FO_NODES.map((node) => {
                      const isNodeActive = activeFoCorridorId === node.corridorId;
                      const isMainCenter = node.id === 'node-bc';

                      return (
                        <g
                          key={node.id}
                          className="cursor-pointer group"
                          onClick={() => setActiveFoCorridorId(node.corridorId)}
                        >
                          {/* Outer Pulsing Ring */}
                          {isNodeActive && (
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r="20"
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="1.5"
                              strokeDasharray="4 2"
                              className="animate-spin-slow opacity-80"
                            />
                          )}

                          {/* Glow backdrop */}
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={isMainCenter ? 14 : isNodeActive ? 12 : 9}
                            fill={isMainCenter ? '#0284c7' : isNodeActive ? '#0ea5e9' : '#1e293b'}
                            stroke={isNodeActive ? '#ffffff' : '#64748b'}
                            strokeWidth="2"
                            className="transition-all"
                          />

                          {/* Inner Core indicator */}
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={isMainCenter ? 6 : 4}
                            fill={node.core === 96 ? '#10b981' : node.core === 72 ? '#38bdf8' : '#fbbf24'}
                          />

                          {/* Node Label */}
                          <rect
                            x={node.x - 48}
                            y={node.y + 12}
                            width="96"
                            height="18"
                            rx="3"
                            fill="#090d16"
                            fillOpacity="0.85"
                            stroke={isNodeActive ? '#38bdf8' : '#334155'}
                            strokeWidth="1"
                          />
                          <text
                            x={node.x}
                            y={node.y + 24}
                            textAnchor="middle"
                            fill={isNodeActive ? '#38bdf8' : '#cbd5e1'}
                            fontSize="9"
                            fontFamily="sans-serif"
                            fontWeight="bold"
                          >
                            {node.shortName}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Instruction overlay */}
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs border border-slate-800 px-2.5 py-1 rounded text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
                    <Radio className="w-3 h-3 text-sky-400 shrink-0 animate-pulse" />
                    <span>Klik node / segmen kabel untuk melihat detail lokasi jalur</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Active Corridor Inspector (4 Cols) */}
              <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-900 bg-sky-100 px-2 py-0.5 rounded font-mono">
                      Detail Koridor Terpilih
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {activeFoCorridor.statusKoneksi || 'Aktif Normal'}
                    </span>
                  </div>

                  {/* Highlighted Attributes: TAHUN, BAGIAN WILAYAH, LOKASI */}
                  <div className="space-y-3">
                    {/* BAGIAN WILAYAH */}
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase block">
                        Bagian Wilayah:
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-4 h-4 text-[#1F4E79] shrink-0" />
                        <span>{activeFoCorridor.bagianWilayah}</span>
                      </h3>
                    </div>

                    {/* TAHUN */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 font-medium">Tahun Rekap:</span>
                      <span className="text-xs font-bold font-mono text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {activeFoCorridor.tahun}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        ({activeFoCorridor.tipeJalur})
                      </span>
                    </div>

                    {/* LOKASI JALUR */}
                    <div className="bg-white border border-slate-200 rounded-lg p-3">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                        <Network className="w-3 h-3 text-sky-600" />
                        Lokasi Jalur Fiber Optik:
                      </span>
                      <p className="text-xs font-medium text-slate-800 leading-relaxed">
                        {activeFoCorridor.lokasi}
                      </p>
                    </div>

                    {/* Technical Specs */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      <div className="bg-white border border-slate-200 rounded p-2 text-center">
                        <span className="text-[10px] text-slate-500 block">Panjang Kabel</span>
                        <span className="font-bold text-slate-900 font-mono text-sm">
                          {activeFoCorridor.panjangKm} Km
                        </span>
                      </div>
                      <div className="bg-white border border-slate-200 rounded p-2 text-center">
                        <span className="text-[10px] text-slate-500 block">Kapasitas Core</span>
                        <span className="font-bold text-emerald-700 font-mono text-sm">
                          {activeFoCorridor.kapasitasCore} Core SM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Corridor Switcher */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Pilih Koridor Lainnya:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {DATA_JALUR_FIBER_OPTIC.slice(0, 6).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveFoCorridorId(item.id)}
                        className={`text-left text-[11px] p-1.5 rounded transition-all truncate cursor-pointer ${
                          activeFoCorridorId === item.id
                            ? 'bg-[#1F4E79] text-white font-bold'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                        title={item.bagianWilayah}
                      >
                        {item.bagianWilayah}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* VIEW TABEL MATRIKS: High-Density Table of FO Corridors */
            /* ========================================================================= */
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider font-mono">
                  <tr>
                    <th className="px-3 py-2.5">No</th>
                    <th className="px-3 py-2.5">Tahun</th>
                    <th className="px-3 py-2.5">Bagian Wilayah</th>
                    <th className="px-3 py-2.5">Lokasi Jalur Fiber Optic</th>
                    <th className="px-3 py-2.5 text-center">Panjang (Km)</th>
                    <th className="px-3 py-2.5 text-center">Kapasitas Core</th>
                    <th className="px-3 py-2.5">Tipe Jalur</th>
                    <th className="px-3 py-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredFo.map((item, idx) => {
                    const isSelected = item.id === activeFoCorridorId;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setActiveFoCorridorId(item.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-sky-50 font-semibold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="px-3 py-2.5 font-mono text-slate-500">{idx + 1}</td>
                        <td className="px-3 py-2.5 font-mono font-bold text-indigo-900">{item.tahun}</td>
                        <td className="px-3 py-2.5 font-bold text-[#1F4E79]">{item.bagianWilayah}</td>
                        <td className="px-3 py-2.5 text-slate-800 max-w-md">{item.lokasi}</td>
                        <td className="px-3 py-2.5 text-center font-mono font-bold text-slate-900">{item.panjangKm} Km</td>
                        <td className="px-3 py-2.5 text-center font-mono font-bold text-emerald-700">{item.kapasitasCore} Core</td>
                        <td className="px-3 py-2.5 text-slate-600 text-[11px]">{item.tipeJalur}</td>
                        <td className="px-3 py-2.5 text-center">
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            {item.statusKoneksi || 'Aktif Normal'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Comparative Horizontal Bar: Panjang Bentang Kabel per Bagian Wilayah */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-[#1F4E79]" />
              Sebaran Panjang Bentang Kabel (Km) Berdasarkan Bagian Wilayah:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {DATA_JALUR_FIBER_OPTIC.map((item) => {
                const maxKm = 30;
                const pct = Math.round(((item.panjangKm || 10) / maxKm) * 100);
                const isSelected = activeFoCorridorId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveFoCorridorId(item.id)}
                    className={`p-2 rounded border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1F4E79] bg-sky-50/60 shadow-xs ring-1 ring-[#1F4E79]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-800 truncate">{item.bagianWilayah}</span>
                      <span className="font-mono font-bold text-[#1F4E79]">{item.panjangKm} Km</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${pct}%` }}
                        className="h-full bg-linear-to-r from-[#1F4E79] to-sky-500 rounded-full"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      {item.kapasitasCore} Core • {item.tipeJalur}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VISUALISASI DATA RAK DATA CENTER - DATASET NO. 8 */}
      {/* Catatan Sesuai Permintaan User: Denah Okupansi Slot Rak telah DIHAPUS */}
      {/* ========================================================================= */}
      {(activeVisualTab === 'all' || activeVisualTab === 'vis-2') && (
        <div id="vis-2" className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          {/* Header Standardisasi Point 9 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                  DATASET NO. 8 (Hal. 41)
                </span>
                <h2 className="text-sm font-bold text-slate-900">
                  Data Rak Data Center
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                  🏷️ Visualisasi: Stacked Bar Chart Okupansi Rak Server 42U per Ruangan
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  Atribut yang Ditampilkan: <strong>RUANGAN</strong>, <strong>JUMLAH RAK TERISI</strong>, &amp; <strong>JUMLAH RAK KOSONG</strong>
                </span>
              </div>
            </div>

            {/* Total Aggregates */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-700">Total: {totalRacksAll} Rak</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded font-mono">
                Terisi: {totalTerisiAll} ({((totalTerisiAll / totalRacksAll) * 100).toFixed(1)}%)
              </span>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-semibold rounded font-mono">
                Kosong: {totalKosongAll} ({((totalKosongAll / totalRacksAll) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>

          {/* Visual Stacked Bar Chart per Ruangan (Atribut: RUANGAN, JUMLAH RAK TERISI, JUMLAH RAK KOSONG) */}
          <div className="space-y-3">
            {DC_RACKS_DATA.map((rack) => {
              const pctTerisi = Math.round((rack.jumlahRakTerisi / rack.totalRak) * 100);
              const pctKosong = 100 - pctTerisi;

              return (
                <div
                  key={rack.id}
                  className="p-3.5 rounded-lg border border-slate-200 bg-white hover:border-[#1F4E79] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-[#1F4E79]" />
                      {/* Atribut RUANGAN */}
                      <span className="text-xs font-bold text-slate-900">
                        Ruangan: {rack.ruangan}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        ({rack.jenisRak})
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      {/* Atribut JUMLAH RAK TERISI */}
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Terisi: {rack.jumlahRakTerisi} Rak
                      </span>
                      {/* Atribut JUMLAH RAK KOSONG */}
                      <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Kosong: {rack.jumlahRakKosong} Rak
                      </span>
                      <span className="font-mono text-slate-600 font-bold">
                        Total: {rack.totalRak} Rak
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Stacked Bar */}
                  <div className="h-5 w-full bg-slate-100 rounded overflow-hidden flex shadow-inner">
                    <div
                      style={{ width: `${pctTerisi}%` }}
                      className="bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center text-[10px] text-white font-bold"
                      title={`Rak Terisi: ${rack.jumlahRakTerisi} (${pctTerisi}%)`}
                    >
                      {pctTerisi >= 15 && `${pctTerisi}% Terisi (${rack.jumlahRakTerisi} Rak)`}
                    </div>
                    <div
                      style={{ width: `${pctKosong}%` }}
                      className="bg-amber-400 hover:bg-amber-500 transition-all flex items-center justify-center text-[10px] text-slate-900 font-bold"
                      title={`Rak Kosong: ${rack.jumlahRakKosong} (${pctKosong}%)`}
                    >
                      {pctKosong >= 15 && `${pctKosong}% Kosong (${rack.jumlahRakKosong} Rak)`}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1 border-t border-slate-100">
                    <span>Suhu Ruang Standar: <strong className="text-slate-700">{rack.suhuRataRata}</strong></span>
                    <span>Efisiensi Daya: <strong className="text-slate-700">PUE {rack.pueScore}</strong></span>
                    <span>Periode Rekap: <strong className="text-slate-700 font-mono">{rack.tanggalRekapAwal} s/d {rack.tanggalRekapAkhir}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. VISUALISASI DATA KEPUASAN PELANGGAN DATA CENTRE - DATASET NO. 11 */}
      {/* ========================================================================= */}
      {(activeVisualTab === 'all' || activeVisualTab === 'vis-3') && (
        <div id="vis-3" className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          {/* Header Standardisasi Point 9 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                  DATASET NO. 11 (Hal. 42)
                </span>
                <h2 className="text-sm font-bold text-slate-900">
                  Data Kepuasan Pelanggan Data Centre
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                  🏷️ Visualisasi: Scorecard Radar &amp; Horizontal Rating Bar Chart
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  Atribut yang Ditampilkan: <strong>KATEGORI</strong> &amp; <strong>TINGKAT KEPUASAN</strong> (beserta Persentase %)
                </span>
              </div>
            </div>

            {/* Scorecard Aggregate */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded px-3 py-1.5">
              <SmilePlus className="w-5 h-5 text-emerald-700" />
              <div>
                <span className="text-[10px] text-emerald-800 font-semibold block">Indeks Kepuasan Komposit:</span>
                <span className="text-sm font-bold text-emerald-950">93,8% (Sangat Puas)</span>
              </div>
            </div>
          </div>

          {/* Rating Bars per Kategori */}
          <div className="space-y-3">
            {DATA_KEPUASAN_PELANGGAN_DC.map((item) => (
              <div
                key={item.id}
                className="p-3 border border-slate-200 rounded-lg hover:border-emerald-300 transition-all bg-linear-to-r from-white to-slate-50/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    {/* Highlighted KATEGORI */}
                    <span className="text-xs font-bold text-slate-900">
                      Kategori: {item.kategori}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Highlighted TINGKAT KEPUASAN */}
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Tingkat Kepuasan: {item.tingkatKepuasan}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {item.persentase}% (Skor: {item.skorSkala5}/5.0)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.persentase}%` }}
                    className="h-full bg-linear-to-r from-emerald-500 to-teal-600 rounded-full transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. VISUALISASI DATA SERANGAN KEAMANAN IT - DATASET NO. 12 */}
      {/* ========================================================================= */}
      {(activeVisualTab === 'all' || activeVisualTab === 'vis-4') && (
        <div id="vis-4" className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          {/* Header Standardisasi Point 9 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                  DATASET NO. 12 (Hal. 42)
                </span>
                <h2 className="text-sm font-bold text-slate-900">
                  Data Serangan Keamanan IT
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                  🏷️ Visualisasi: Grafik Batang Horizontal Berperingkat (Ranked Threat Bar Chart)
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  Atribut yang Ditampilkan: <strong>THREAT ACTIVITY</strong> &amp; <strong>JUMLAH</strong> (Jml Serangan Tertangkap)
                </span>
              </div>
            </div>

            {/* Total Threat Badge */}
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded px-3 py-1.5">
              <ShieldAlert className="w-5 h-5 text-rose-700" />
              <div>
                <span className="text-[10px] text-rose-800 font-semibold block">Total Serangan Termitigasi:</span>
                <span className="text-sm font-bold text-rose-950 font-mono">{totalSerangan.toLocaleString('id-ID')} Kali</span>
              </div>
            </div>
          </div>

          {/* Ranked Horizontal Threat Bars */}
          <div className="space-y-3">
            {CYBER_THREATS_DATA.map((threat, idx) => {
              const widthPct = Math.round((threat.jmlSerangan / maxThreat) * 100);
              const sharePct = ((threat.jmlSerangan / totalSerangan) * 100).toFixed(1);

              const colorThemes = [
                { bar: 'bg-rose-600', badge: 'bg-rose-100 text-rose-800' },
                { bar: 'bg-amber-600', badge: 'bg-amber-100 text-amber-800' },
                { bar: 'bg-orange-600', badge: 'bg-orange-100 text-orange-800' },
                { bar: 'bg-sky-600', badge: 'bg-sky-100 text-sky-800' },
                { bar: 'bg-slate-600', badge: 'bg-slate-100 text-slate-800' },
              ];
              const theme = colorThemes[idx % colorThemes.length];

              return (
                <div
                  key={threat.id}
                  className="p-3 border border-slate-200 rounded-lg hover:border-slate-300 transition-all bg-white"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      {/* Highlighted THREAT ACTIVITY */}
                      <span className="text-xs font-bold text-slate-900">
                        Threat Activity: {threat.threatActivity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${theme.badge}`}>
                        {threat.statusKeamanan}
                      </span>
                      {/* Highlighted JUMLAH */}
                      <span className="text-xs font-bold font-mono text-slate-900">
                        Jumlah: {threat.jmlSerangan.toLocaleString('id-ID')} Serangan ({sharePct}%)
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className={`h-full ${theme.bar} rounded-full transition-all`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. VISUALISASI REKAP INFRASTRUKTUR SERVER DAN STORAGE - DATASET NO. 13 */}
      {/* ========================================================================= */}
      {(activeVisualTab === 'all' || activeVisualTab === 'vis-5') && (
        <div id="vis-5" className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          {/* Header Standardisasi Point 9 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                  DATASET NO. 13 (Hal. 42)
                </span>
                <h2 className="text-sm font-bold text-slate-900">
                  Rekap Infrastruktur Server dan Storage
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                  🏷️ Visualisasi: Grafik Batang Horizontal &amp; Inventaris Alokasi Unit Komputasi
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  Atribut yang Ditampilkan: <strong>NAMA SERVER</strong> &amp; <strong>JUMLAH</strong> (Unit Hardware)
                </span>
              </div>
            </div>

            {/* Filter by Type */}
            <div className="flex items-center gap-2">
              <select
                value={serverTypeFilter}
                onChange={(e) => setServerTypeFilter(e.target.value)}
                className="text-xs border border-slate-300 rounded px-2 py-1 bg-white text-slate-700 focus:outline-hidden"
              >
                {serverTypes.map((t) => (
                  <option key={t} value={t}>{t === 'ALL' ? 'Semua Tipe Hardware' : t}</option>
                ))}
              </select>
              <div className="bg-slate-100 px-2.5 py-1 rounded text-xs font-bold text-slate-800 font-mono">
                Total: {totalHardwareUnits} Unit
              </div>
            </div>
          </div>

          {/* Server & Storage Bars */}
          <div className="space-y-3">
            {filteredServers.map((item) => {
              const widthPct = Math.round((item.jumlahUnit / maxHardware) * 100);
              return (
                <div
                  key={item.id}
                  className="p-3 border border-slate-200 rounded-lg hover:border-[#1F4E79] transition-all bg-white"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-[#1F4E79] shrink-0" />
                      {/* Highlighted NAMA SERVER */}
                      <span className="text-xs font-bold text-slate-900">
                        Nama Server: {item.namaServer}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        ({item.brand} • {item.tipe})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        Garansi: {item.statusGaransi}
                      </span>
                      {/* Highlighted JUMLAH */}
                      <span className="text-xs font-bold font-mono text-[#1F4E79] bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        Jumlah: {item.jumlahUnit} Unit
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className="h-full bg-linear-to-r from-[#1F4E79] to-sky-500 rounded-full transition-all"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. VISUALISASI DATA APLIKASI BP BATAM - DATASET NO. 14 */}
      {/* VISUALISASI BARU: Treemap Hierarki & Tabel Matriks Berdasarkan Unit Operasional */}
      {/* Sesuai Permintaan: Bukan Card Kotak-Kotak! */}
      {/* ========================================================================= */}
      {(activeVisualTab === 'all' || activeVisualTab === 'vis-6') && (
        <div id="vis-6" className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          {/* Header Standardisasi Point 9 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                  DATASET NO. 14 (Hal. 42)
                </span>
                <h2 className="text-sm font-bold text-slate-900">
                  Data Aplikasi BP Batam
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                  🏷️ Visualisasi: Treemap Distribusi &amp; Katalog Matriks per Unit Operasional
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  Atribut yang Ditampilkan: <strong>NAMA APLIKASI</strong> &amp; <strong>UNIT OPERASIONAL</strong>
                </span>
              </div>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
                <input
                  type="text"
                  placeholder="Cari Nama Aplikasi / Unit..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  className="pl-7 pr-2 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-sky-500 focus:outline-hidden w-40 sm:w-52"
                />
              </div>

              <select
                value={appUnitFilter}
                onChange={(e) => setAppUnitFilter(e.target.value)}
                className="text-xs border border-slate-300 rounded px-2.5 py-1 bg-white text-slate-700 focus:outline-hidden"
              >
                {allUnits.map((u) => (
                  <option key={u} value={u}>{u === 'ALL' ? 'Semua Unit Operasional' : u}</option>
                ))}
              </select>

              <select
                value={appCategoryFilter}
                onChange={(e) => setAppCategoryFilter(e.target.value)}
                className="text-xs border border-slate-300 rounded px-2 py-1 bg-white text-slate-700 focus:outline-hidden"
              >
                {appCategories.map((c) => (
                  <option key={c} value={c}>{c === 'ALL' ? 'Semua Kategori' : c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* VISUAL 1: PROPORTIONAL HIERARCHICAL TREEMAP OF APPS BY OPERATIONAL UNIT */}
          {/* ========================================================================= */}
          <div className="mb-5 bg-slate-50 border border-slate-200 rounded-lg p-3.5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#1F4E79]" />
                Distribusi Portofolio Aplikasi Berdasarkan Unit Operasional:
              </span>
              <span className="text-[11px] font-mono text-slate-500 font-semibold">
                Total: {BP_BATAM_APPS_DATA.length} Aplikasi Terdaftar
              </span>
            </div>

            {/* Treemap Segmented Proportion Bar */}
            <div className="h-7 w-full rounded-md overflow-hidden flex shadow-xs mb-3">
              {unitStats.map((item, idx) => {
                const theme = getUnitTheme(item.unit);
                const isSelected = appUnitFilter === item.unit;
                return (
                  <div
                    key={idx}
                    style={{ width: `${item.percentage}%` }}
                    onClick={() => setAppUnitFilter(appUnitFilter === item.unit ? 'ALL' : item.unit)}
                    className={`h-full transition-all cursor-pointer flex items-center justify-center text-[10px] font-bold border-r border-white/40 ${
                      isSelected ? 'ring-2 ring-slate-900 z-10 brightness-110' : 'hover:brightness-95'
                    } ${theme.badge}`}
                    title={`${item.unit}: ${item.count} Aplikasi (${item.percentage}%)`}
                  >
                    <span className="truncate px-1 hidden sm:inline">
                      {item.count} App
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Interactive Unit Cards Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {unitStats.map((item, idx) => {
                const isSelected = appUnitFilter === item.unit;
                const theme = getUnitTheme(item.unit);
                return (
                  <button
                    key={idx}
                    onClick={() => setAppUnitFilter(appUnitFilter === item.unit ? 'ALL' : item.unit)}
                    className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#1F4E79] bg-white ring-2 ring-[#1F4E79]/30 shadow-xs'
                        : `${theme.bg} ${theme.border} hover:border-slate-400 bg-white`
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`w-2 h-2 rounded-full ${theme.dot}`}></span>
                        <span className="text-[10px] font-mono font-bold text-slate-600">
                          {item.count} App
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-900 leading-tight block line-clamp-2">
                        {item.unit}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1 block">
                      {item.percentage}% Share
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* VISUAL 2: HIGH-DENSITY ARCHITECTURAL MATRIX TABLE (BUKAN CARD KOTAK-KOTAK) */}
          {/* ========================================================================= */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <AppWindow className="w-4 h-4 text-sky-700" />
                Daftar Aplikasi ({filteredApps.length} Aplikasi Ditampilkan)
              </span>
              {appUnitFilter !== 'ALL' && (
                <button
                  onClick={() => setAppUnitFilter('ALL')}
                  className="text-[11px] text-[#1F4E79] hover:underline font-semibold cursor-pointer"
                >
                  Tampilkan Semua Unit
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider font-mono">
                  <tr>
                    <th className="px-3 py-2.5 w-10">No</th>
                    <th className="px-3 py-2.5">Nama Aplikasi</th>
                    <th className="px-3 py-2.5">Unit Operasional</th>
                    <th className="px-3 py-2.5">Uraian Tugas &amp; Fungsi Sistem</th>
                    <th className="px-3 py-2.5 text-center">Basis</th>
                    <th className="px-3 py-2.5 text-center">Kategori</th>
                    <th className="px-3 py-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredApps.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-slate-500 text-xs">
                        Tidak ada aplikasi yang cocok dengan filter pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredApps.map((app, idx) => {
                      const theme = getUnitTheme(app.unitOperasional);
                      return (
                        <tr
                          key={app.id}
                          className="hover:bg-sky-50/50 transition-colors"
                        >
                          <td className="px-3 py-3 font-mono text-slate-400 font-bold">{idx + 1}</td>
                          {/* Highlighted NAMA APLIKASI */}
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-2">
                              <AppWindow className="w-4 h-4 text-sky-700 shrink-0" />
                              <div>
                                <span className="font-bold text-slate-900 text-xs block">
                                  {app.namaAplikasi}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                  ID: {app.id} • Rilis: {app.devYear}
                                </span>
                              </div>
                            </div>
                          </td>
                          {/* Highlighted UNIT OPERASIONAL */}
                          <td className="px-3 py-3">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold border ${theme.badge} ${theme.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`}></span>
                              {app.unitOperasional}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-slate-700 text-xs max-w-sm leading-relaxed">
                            {app.uraianAplikasi}
                          </td>
                          <td className="px-3 py-3 text-center">
                            <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                              {app.basisAplikasi}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-center">
                            <span className="text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                              {app.kategoriAplikasi}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-center">
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. VISUALISASI DATA PERMINTAAN LAYANAN IT (HELPDESK) - DATASET NO. 21 */}
      {/* ========================================================================= */}
      {(activeVisualTab === 'all' || activeVisualTab === 'vis-7') && (
        <div id="vis-7" className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          {/* Header Standardisasi Point 9 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                  DATASET NO. 21 (Hal. 43)
                </span>
                <h2 className="text-sm font-bold text-slate-900">
                  Data Permintaan Layanan IT (Helpdesk)
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                  🏷️ Visualisasi: Grafik Batang Horizontal Volume Tiket per Nama Layanan
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  Atribut yang Ditampilkan: <strong>NAMA LAYANAN</strong> &amp; <strong>JUMLAH</strong> (Tiket Masuk Bulanan)
                </span>
              </div>
            </div>

            {/* Total Helpdesk Aggregate */}
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded px-3 py-1.5">
              <Headphones className="w-5 h-5 text-indigo-700" />
              <div>
                <span className="text-[10px] text-indigo-800 font-semibold block">Total Tiket Layanan:</span>
                <span className="text-sm font-bold text-indigo-950 font-mono">{totalHelpdesk} Tiket</span>
              </div>
            </div>
          </div>

          {/* Ranked Helpdesk Service Request Bars */}
          <div className="space-y-3">
            {PDSI_PERMINTAAN_LAYANAN_TI.map((service, idx) => {
              const widthPct = Math.round((service.jumlah / maxHelpdesk) * 100);
              const sharePct = ((service.jumlah / totalHelpdesk) * 100).toFixed(1);

              return (
                <div
                  key={service.id}
                  className="p-3 border border-slate-200 rounded-lg hover:border-indigo-300 transition-all bg-white"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      {/* Highlighted NAMA LAYANAN */}
                      <span className="text-xs font-bold text-slate-900">
                        Nama Layanan: {service.namaLayanan}
                      </span>
                    </div>
                    {/* Highlighted JUMLAH */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        Jumlah: {service.jumlah} Tiket ({sharePct}%)
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className="h-full bg-linear-to-r from-indigo-600 to-sky-500 rounded-full transition-all"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
