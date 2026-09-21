import React, { useState } from 'react';
import {
  FileText,
  MapPin,
  Coins,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  ArrowUpDown,
  Building2,
  Layers,
  Sparkles,
  BarChart2,
  Table,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  LabelList,
} from 'recharts';
import { PaketPerencanaan } from './types';
import { DetailPaketPerencanaanModal } from './DetailPaketPerencanaanModal';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface DaftarPaketPerencanaanCardProps {
  pakets: PaketPerencanaan[];
  allPakets?: PaketPerencanaan[];
  selectedSektor?: string;
  onSelectSektor?: (sektor: string) => void;
  onOpenFormula?: (datasetNo: number) => void;
}

const SEKTOR_COLORS: Record<string, string> = {
  'Gedung': '#0284C7', // sky-600
  'Utilitas dan Drainase': '#4F46E5', // indigo-600
  'Fasilitas Wisata dan Lingkungan': '#D97706', // amber-600
  'Pertanaman dan Penghijauan': '#059669', // emerald-600
  'Darat': '#E11D48', // rose-600
  'Laut dan Udara': '#0891B2', // cyan-600
};

const SEKTOR_LIST = [
  { name: 'Semua', label: 'Semua 6 Sektor', count: 43 },
  { name: 'Gedung', label: 'Gedung', count: 8 },
  { name: 'Utilitas dan Drainase', label: 'Utilitas', count: 7 },
  { name: 'Fasilitas Wisata dan Lingkungan', label: 'Wisata', count: 6 },
  { name: 'Pertanaman dan Penghijauan', label: 'Pertanaman', count: 6 },
  { name: 'Darat', label: 'Darat', count: 9 },
  { name: 'Laut dan Udara', label: 'Laut & Udara', count: 7 },
];

export const DaftarPaketPerencanaanCard: React.FC<DaftarPaketPerencanaanCardProps> = ({
  pakets,
  allPakets,
  selectedSektor = 'Semua',
  onSelectSektor,
  onOpenFormula,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [selectedPaket, setSelectedPaket] = useState<PaketPerencanaan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'capex-desc' | 'progres-desc' | 'readiness-desc' | 'sektor'>('capex-desc');
  const [chartScope, setChartScope] = useState<'top15' | 'all'>('top15');
  const [chartCostMode, setChartCostMode] = useState<'capex' | 'both'>('capex');
  const [localSektor, setLocalSektor] = useState<string>(selectedSektor);

  // Sumber data paket dasar: utamakan allPakets jika tersedia agar tidak terkunci di 1 sektor
  const basePakets = allPakets && allPakets.length > 0 ? allPakets : pakets;

  // Filter berdasarkan localSektor (default: 'Semua')
  const activeSektor = localSektor || 'Semua';
  const effectivePakets =
    activeSektor === 'Semua'
      ? basePakets
      : basePakets.filter((p) => p.sektor === activeSektor);

  const handleSelectSektor = (sektor: string) => {
    setLocalSektor(sektor);
    if (onSelectSektor) {
      onSelectSektor(sektor);
    }
  };

  const handleOpenDetail = (paket: PaketPerencanaan) => {
    setSelectedPaket(paket);
    setIsModalOpen(true);
  };

  const sortedPakets = [...effectivePakets].sort((a, b) => {
    if (sortBy === 'capex-desc') {
      return b.estimasiCapexFisik - a.estimasiCapexFisik;
    }
    if (sortBy === 'progres-desc') {
      return b.progresPenyusunanPersen - a.progresPenyusunanPersen;
    }
    if (sortBy === 'readiness-desc') {
      return b.readinessScore - a.readinessScore;
    }
    if (sortBy === 'sektor') {
      return a.datasetNo - b.datasetNo;
    }
    return 0;
  });

  // Data yang akan ditampilkan di chart (bisa top 15 atau semua)
  const slicedForChart =
    activeSektor === 'Semua' && chartScope === 'top15'
      ? sortedPakets.slice(0, 15)
      : sortedPakets;

  // Prepare chart data dengan keterangan biaya yang sangat jelas
  const chartData = slicedForChart.map((p) => {
    const shortLabel = p.namaKegiatan.length > 22 ? `${p.namaKegiatan.slice(0, 20)}...` : p.namaKegiatan;
    const capexM = parseFloat((p.estimasiCapexFisik / 1000000000).toFixed(1));
    const paguDedM = parseFloat((p.paguKonsultansi / 1000000000).toFixed(2));

    return {
      id: p.id,
      label: shortLabel,
      fullTitle: p.namaKegiatan,
      sektor: p.sektor,
      capexMiliar: capexM,
      paguDedMiliar: paguDedM,
      // Format text keterangan biaya langsung untuk label di atas batang diagram
      labelBiaya: `Rp ${capexM}M`,
      progresDED: p.progresPenyusunanPersen,
      readiness: p.readinessScore,
      konsultan: p.konsultanPerencana,
      status: p.statusKesiapan,
      color: SEKTOR_COLORS[p.sektor] || '#0284C7',
    };
  });

  const totalCapexMiliar = (sortedPakets.reduce((acc, p) => acc + p.estimasiCapexFisik, 0) / 1000000000).toFixed(1);
  const totalBiayaDEDMiliar = (sortedPakets.reduce((acc, p) => acc + p.paguKonsultansi, 0) / 1000000000).toFixed(2);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <span>Pemetaan Dokumen DED &amp; Estimasi Capex Konstruksi</span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {pakets.length} Paket Terpilih
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Visualisasi komparasi nilai Capex fisik konstruksi masa depan dan rincian crosstab readiness criteria
          </p>
        </div>

        {/* View Mode & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Sheet Swap Controls */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-sky-800 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Bar Chart Capex</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-sky-800 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Pivot Crosstab</span>
            </button>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-0 text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="capex-desc">Capex Tertinggi</option>
              <option value="progres-desc">Progres DED</option>
              <option value="readiness-desc">Indeks Readiness</option>
              <option value="sektor">Kategori Sektor</option>
            </select>
          </div>

          {/* Formula Link */}
          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(1)}
              className="flex items-center gap-1 text-xs text-sky-700 bg-sky-50 px-2.5 py-1.5 rounded-lg border border-sky-200 font-semibold hover:bg-sky-100 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Formula</span>
            </button>
          )}
        </div>
      </div>

      {/* Tableau Shelves Badge */}
      <div className="mb-3">
        <TableauShelvesBadge
          columns="[Nama Kegiatan / Paket Perencanaan]"
          rows="SUM([Estimasi Capex Konstruksi (Rp)]), SUM([Biaya Pagu DED (Rp)])"
          marks="Bar Chart (Color: [Kategori Sektor], Label: [Nilai Biaya Rp Miliar])"
          filters="[Tahun]=Semua, [Status Kesiapan]=Selected"
        />
      </div>

      {/* Banner Penjelasan Definisi Biaya Pada Grafik (Mencegah Kebingungan) */}
      <div className="mb-4 p-3 bg-gradient-to-r from-sky-50 via-indigo-50/50 to-slate-50 rounded-xl border border-sky-200 text-xs text-slate-700 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-sky-600 text-white rounded-lg shrink-0 mt-0.5">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <span>PANDUAN KETERANGAN DUA JENIS BIAYA PADA GRAFIK</span>
                <span className="text-[10px] font-mono font-bold bg-sky-100 text-sky-800 px-2 py-0.2 rounded-full border border-sky-200">
                  Satuan: Miliar Rupiah (Rp M)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-1 text-[11px]">
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0 mt-1" />
                  <span>
                    <strong>1. Estimasi Capex Fisik (Tinggi Batang Utama):</strong> Proyeksi total biaya konstruksi fisik di lapangan yang dihasilkan dari kajian DED/RAB.
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1" />
                  <span>
                    <strong>2. Pagu Konsultansi DED (Biaya Perencanaan):</strong> Anggaran kontrak konsultan perencana penyusun dokumen teknis (±Rp 0,6 M - Rp 2,8 M/paket).
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Perbandingan Mode Biaya */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shrink-0 self-start md:self-center">
            <span className="text-[10.5px] font-semibold text-slate-500 px-1.5">Tampilkan:</span>
            <button
              type="button"
              onClick={() => setChartCostMode('capex')}
              className={`px-2.5 py-1 text-[11px] rounded-md font-semibold transition-all cursor-pointer ${
                chartCostMode === 'capex'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Estimasi Capex Fisik
            </button>
            <button
              type="button"
              onClick={() => setChartCostMode('both')}
              className={`px-2.5 py-1 text-[11px] rounded-md font-semibold transition-all cursor-pointer ${
                chartCostMode === 'both'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Komparasi Capex &amp; Pagu DED
            </button>
          </div>
        </div>
      </div>

      {/* Sektor Quick Filter Bar (Memastikan visualisasi menampilkan semua 6 sektor atau sektor yang dipilih) */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            Pilih Sektor:
          </span>
          {SEKTOR_LIST.map((sek) => {
            const isSelected = activeSektor === sek.name;
            return (
              <button
                key={sek.name}
                type="button"
                onClick={() => handleSelectSektor(sek.name)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {sek.name !== 'Semua' && (
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: SEKTOR_COLORS[sek.name] || '#94a3b8' }}
                  />
                )}
                <span>{sek.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-slate-700 text-white font-mono' : 'bg-slate-100 text-slate-500 font-mono'
                  }`}
                >
                  {sek.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scope selector when 'Semua' is active */}
        {activeSektor === 'Semua' && viewMode === 'chart' && (
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setChartScope('top15')}
              className={`px-2.5 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                chartScope === 'top15'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Top 15 Capex Terbesar
            </button>
            <button
              type="button"
              onClick={() => setChartScope('all')}
              className={`px-2.5 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                chartScope === 'all'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua 43 Paket (Scroll)
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {sortedPakets.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600">Tidak ada paket perencanaan yang sesuai filter</p>
          <p className="text-xs text-slate-400 mt-1">Silakan sesuaikan kriteria filter atau klik reset</p>
        </div>
      ) : viewMode === 'chart' ? (
        <div className="space-y-4">
          <div className="w-full overflow-x-auto">
            <div
              className="h-88"
              style={{
                minWidth: chartScope === 'all' && activeSektor === 'Semua' ? '1800px' : '100%',
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 25, right: 20, left: 10, bottom: 65 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="label"
                    angle={-28}
                    textAnchor="end"
                    interval={0}
                    tick={{ fill: '#334155', fontSize: 10 }}
                    height={70}
                  />
                  <YAxis
                    unit=" M"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs max-w-sm font-sans">
                            <div className="flex items-center gap-1.5 font-bold text-sky-400 mb-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: d.color }}
                              />
                              <span className="truncate">{d.fullTitle}</span>
                            </div>
                            <div className="text-[10.5px] text-slate-300 mb-2 pb-1.5 border-b border-slate-800 flex items-center justify-between">
                              <span>Sektor: <strong>{d.sektor}</strong></span>
                              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-400 font-mono">
                                DED: {d.progresDED}%
                              </span>
                            </div>

                            {/* Rincian Keterangan Biaya Sangat Jelas */}
                            <div className="space-y-1.5 font-mono text-[11px]">
                              <div className="flex justify-between items-center bg-slate-800/80 px-2 py-1 rounded">
                                <span className="text-sky-300 font-sans font-medium flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                                  Estimasi Capex Konstruksi:
                                </span>
                                <span className="font-bold text-white text-xs">
                                  Rp {d.capexMiliar.toFixed(1)} Miliar
                                </span>
                              </div>
                              <div className="flex justify-between items-center bg-slate-800/80 px-2 py-1 rounded">
                                <span className="text-amber-300 font-sans font-medium flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                                  Pagu Konsultansi DED:
                                </span>
                                <span className="font-bold text-amber-300 text-xs">
                                  Rp {d.paguDedMiliar.toFixed(2)} Miliar
                                </span>
                              </div>
                            </div>

                            <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
                              <span>Konsultan: {d.konsultan}</span>
                              <span className="text-slate-300 font-semibold">{d.status}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {/* Batang 1: Estimasi Capex Fisik dengan Label Angka Langsung di atas Batang */}
                  <Bar
                    dataKey="capexMiliar"
                    radius={[4, 4, 0, 0]}
                    name="Estimasi Capex Fisik (Rp Miliar)"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="labelBiaya"
                      position="top"
                      style={{
                        fill: '#1e293b',
                        fontSize: '9.5px',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                      }}
                    />
                  </Bar>

                  {/* Batang 2 (Opsional jika mode 'both' diaktifkan): Pagu DED Konsultansi */}
                  {chartCostMode === 'both' && (
                    <Bar
                      dataKey="paguDedMiliar"
                      radius={[4, 4, 0, 0]}
                      fill="#F59E0B"
                      name="Pagu Konsultansi DED (Rp Miliar)"
                    >
                      <LabelList
                        dataKey="paguDedMiliar"
                        position="top"
                        formatter={(val: any) => `Rp ${val}M`}
                        style={{
                          fill: '#b45309',
                          fontSize: '9px',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                        }}
                      />
                    </Bar>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sektor Color Legend & Cost Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-slate-700 text-[11px]">Warna Sektor:</span>
              {Object.entries(SEKTOR_COLORS).map(([sektor, color]) => (
                <div key={sektor} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-slate-600 text-[11px] font-medium">{sektor}</span>
                </div>
              ))}
              {chartCostMode === 'both' && (
                <div className="flex items-center gap-1.5 pl-2 border-l border-slate-300">
                  <span className="w-2.5 h-2.5 rounded-xs shrink-0 bg-amber-500" />
                  <span className="text-amber-800 text-[11px] font-bold">Batang Kuning: Pagu DED</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
              <div className="text-slate-600">
                Total Estimasi Capex: <strong className="text-sky-700 font-mono font-bold">Rp {totalCapexMiliar} Miliar</strong>
              </div>
              <span className="text-slate-300">•</span>
              <div className="text-slate-600">
                Total Pagu DED: <strong className="text-amber-700 font-mono font-bold">Rp {totalBiayaDEDMiliar} Miliar</strong>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Pivot Crosstab */
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Kode &amp; Nama Paket DED</th>
                <th className="py-2.5 px-3 font-semibold">Sektor</th>
                <th className="py-2.5 px-3 font-semibold">Konsultan Perencana</th>
                <th className="py-2.5 px-3 font-semibold text-right">Pagu DED (Juta)</th>
                <th className="py-2.5 px-3 font-semibold text-right">Estimasi Capex (Rp)</th>
                <th className="py-2.5 px-3 font-semibold text-right">Progres DED</th>
                <th className="py-2.5 px-3 font-semibold text-center">Status Readiness</th>
                <th className="py-2.5 px-3 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedPakets.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-slate-800">{item.namaKegiatan}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.kodePaket} • {item.lokasiKawasan}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-semibold text-white"
                      style={{ backgroundColor: SEKTOR_COLORS[item.sektor] || '#0284C7' }}
                    >
                      {item.sektor}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-700">{item.konsultanPerencana}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                    Rp {(item.paguKonsultansi / 1000000).toLocaleString('id-ID')} Jt
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                    Rp {(item.estimasiCapexFisik / 1000000000).toFixed(1)} M
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                    {item.progresPenyusunanPersen}%
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.statusKesiapan === 'Selesai (Siap Lelang Fisik)'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.statusKesiapan}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleOpenDetail(item)}
                      className="p-1 rounded hover:bg-slate-200 text-sky-600 transition-colors cursor-pointer"
                      title="Lihat Detail Dokumen DED"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selectedPaket && (
        <DetailPaketPerencanaanModal
          paket={selectedPaket}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
