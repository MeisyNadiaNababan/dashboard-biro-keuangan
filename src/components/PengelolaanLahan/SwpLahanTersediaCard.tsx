import React, { useState, useMemo } from 'react';
import {
  Compass,
  Info,
  Table as TableIcon,
  BarChart3,
  Download,
  Layers,
  Search,
} from 'lucide-react';
import {
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';
import { SWP_LAHAN_TERSEDIA_DATA } from './lahanData';
import { LahanVisualHeader } from './LahanVisualHeader';

interface SwpLahanTersediaCardProps {
  selectedSwpFilter?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
}

const SWP_COLORS = [
  '#0284C7', // Batam Centre
  '#10B981', // Nongsa
  '#6366F1', // Sekupang
  '#F59E0B', // Batu Ampar
  '#EC4899', // Muka Kuning
  '#14B8A6', // Kabil
  '#8B5CF6', // Tanjung Uncang
  '#F97316', // Tembesi
  '#06B6D4', // Rempang & Galang
];

type SwpViewMode = 'dual' | 'luas' | 'persil' | 'table';

export const SwpLahanTersediaCard: React.FC<SwpLahanTersediaCardProps> = ({
  selectedSwpFilter = 'ALL',
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<SwpViewMode>('dual');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter if global SWP filter is chosen
  const swpList = useMemo(() => {
    let list = SWP_LAHAN_TERSEDIA_DATA;
    if (selectedSwpFilter !== 'ALL') {
      list = list.filter((s) => s.swp === selectedSwpFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.swp.toLowerCase().includes(q) ||
          s.namaWilayah.toLowerCase().includes(q) ||
          s.peruntukanUtama.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedSwpFilter, searchQuery]);

  const totalHa = useMemo(() => swpList.reduce((acc, s) => acc + s.luasHa, 0), [swpList]);
  const totalM2 = useMemo(() => swpList.reduce((acc, s) => acc + s.luasM2, 0), [swpList]);
  const totalPersil = useMemo(() => swpList.reduce((acc, s) => acc + s.jumlahPersil, 0), [swpList]);
  const totalSiapPakai = useMemo(() => swpList.reduce((acc, s) => acc + s.persilSiapPakai, 0), [swpList]);

  // Chart data
  const chartData = useMemo(() => {
    return swpList.map((s, idx) => ({
      name: s.swp.replace('SWP ', ''),
      fullName: s.swp,
      luasHa: s.luasHa,
      jumlahPersil: s.jumlahPersil,
      siapPakai: s.persilSiapPakai,
      peruntukan: s.peruntukanUtama,
      color: SWP_COLORS[idx % SWP_COLORS.length],
      id: s.id,
    }));
  }, [swpList]);

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'Sub Wilayah Pengembangan (SWP)',
      'Nama Wilayah & Karakteristik',
      'Luas (Ha)',
      'Luas (m2)',
      'Jumlah Persil',
      'Persil Siap Pakai',
      'Persil Dalam Proses',
      'Peruntukan Utama',
      'Status Kawasan',
      'Tingkat Kesiapan',
    ];
    const rows = swpList.map((s) => [
      `"${s.swp}"`,
      `"${s.namaWilayah}"`,
      s.luasHa,
      s.luasM2,
      s.jumlahPersil,
      s.persilSiapPakai,
      s.persilDalamProses,
      `"${s.peruntukanUtama}"`,
      `"${s.statusKawasan}"`,
      `"${s.tingkatKesiapan}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'lahan_tersedia_area_swp_batam.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Standardized LahanVisualHeader */}
      <div className="p-4 pb-0">
        <LahanVisualHeader
          datasetNumber={15}
          pdfPages="Hal. 7-8"
          classification="TERBUKA"
          periode="JIKA UPDATE"
          title="LAHAN YANG TERSEDIA DENGAN AREA SUB WILAYAH PENGEMBANGAN (SWP)"
          visualName="Dual-Axis Bar & Line / Sheet Swap Luas (Ha) vs Jumlah Persil per SWP & Tabel Rincian"
          attributes={[
            'SWP',
            'LUAS (HA)',
            'LUAS (M²)',
            'JUMLAH PERSIL',
            'PERSIL SIAP PAKAI',
            'PERUNTUKAN UTAMA',
            'STATUS KAWASAN',
          ]}
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('lahan_swp_tersedia')}
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Sheet Mode Controls */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('dual')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'dual'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dual-Axis (Luas &amp; Persil)
                </button>
                <button
                  onClick={() => setViewMode('luas')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'luas'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Luas (Ha)
                </button>
                <button
                  onClick={() => setViewMode('persil')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'persil'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Jumlah Persil
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === 'table'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Tabel SWP</span>
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportCsv}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Unduh Data CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>
          }
        />
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-200 text-xs">
        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Total Luas Lahan Tersedia</div>
          <div className="text-base font-bold text-sky-700">
            {totalHa.toLocaleString('id-ID', { maximumFractionDigits: 1 })} Ha
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            {totalM2.toLocaleString('id-ID')} m²
          </div>
        </div>

        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Total Bidang Persil</div>
          <div className="text-base font-bold text-emerald-700">
            {totalPersil.toLocaleString('id-ID')} Persil
          </div>
          <div className="text-[10px] text-emerald-700">
            Siap Pakai: {totalSiapPakai.toLocaleString('id-ID')} Persil
          </div>
        </div>

        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Sub Wilayah (SWP)</div>
          <div className="text-base font-bold text-slate-900">{swpList.length} Zona SWP</div>
          <div className="text-[10px] text-slate-500">RTRW &amp; RDTR Kota Batam</div>
        </div>

        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Zona Luasan Terbesar</div>
          <div className="text-base font-bold text-slate-900 truncate">Rempang-Galang &amp; Kabil</div>
          <div className="text-[10px] text-amber-700 font-medium">Eco-City &amp; Zona Industri</div>
        </div>
      </div>

      {/* Main Visual Section */}
      <div className="p-3.5 space-y-3">
        {/* Table View */}
        {viewMode === 'table' ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Tabel Rincian Luas &amp; Jumlah Persil per Sub Wilayah Pengembangan
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari SWP atau peruntukan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-52 sm:w-64"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto max-h-[360px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">Sub Wilayah (SWP)</th>
                      <th className="py-2.5 px-3">Karakteristik Kawasan</th>
                      <th className="py-2.5 px-3 text-right">Luas (Ha)</th>
                      <th className="py-2.5 px-3 text-right">Luas (m²)</th>
                      <th className="py-2.5 px-3 text-right">Jumlah Persil</th>
                      <th className="py-2.5 px-3 text-right">Siap Pakai</th>
                      <th className="py-2.5 px-3">Peruntukan Utama</th>
                      <th className="py-2.5 px-3">Status Kawasan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {swpList.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">
                          {row.swp}
                        </td>
                        <td className="py-2 px-3 text-slate-600 max-w-xs">{row.namaWilayah}</td>
                        <td className="py-2 px-3 text-right font-bold text-sky-700 font-mono">
                          {row.luasHa.toLocaleString('id-ID', { maximumFractionDigits: 1 })}
                        </td>
                        <td className="py-2 px-3 text-right text-slate-600 font-mono">
                          {row.luasM2.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-700 font-mono">
                          {row.jumlahPersil}
                        </td>
                        <td className="py-2 px-3 text-right text-emerald-600 font-mono">
                          {row.persilSiapPakai}
                        </td>
                        <td className="py-2 px-3 text-slate-700 max-w-xs">{row.peruntukanUtama}</td>
                        <td className="py-2 px-3">
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {row.statusKawasan}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : viewMode === 'dual' ? (
          /* Dual Axis Composed Chart: Bar (Luas Ha) + Line (Jumlah Persil) */
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800">
                Visualisasi Gabungan: Luas Lahan (Ha, Batang Kiri) &amp; Jumlah Persil (Garis Kanan)
              </span>
              <span className="text-[10.5px] font-mono text-slate-500">
                9 Sub Wilayah Pengembangan (SWP)
              </span>
            </div>
            <div className="h-[270px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 15, right: 30, left: 5, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#64748B', fontSize: 10.5 }}
                    interval={0}
                    angle={-14}
                    textAnchor="end"
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: '#0284C7', fontSize: 11 }}
                    label={{
                      value: 'Luas Lahan (Ha)',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#0284C7',
                      fontSize: 10,
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#10B981', fontSize: 11 }}
                    label={{
                      value: 'Jumlah Persil',
                      angle: 90,
                      position: 'insideRight',
                      fill: '#10B981',
                      fontSize: 10,
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value: any, name: any) => [
                      name === 'luasHa'
                        ? `${Number(value).toLocaleString('id-ID')} Hektar`
                        : `${Number(value).toLocaleString('id-ID')} Persil`,
                      name === 'luasHa' ? 'Luas Lahan Tersedia' : 'Jumlah Persil',
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    height={30}
                    formatter={(val) => (
                      <span className="text-xs font-semibold text-slate-700">
                        {val === 'luasHa' ? 'Luas Lahan (Ha - Batang)' : 'Jumlah Persil (Persil - Garis)'}
                      </span>
                    )}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="luasHa"
                    name="luasHa"
                    fill="#0284C7"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="jumlahPersil"
                    name="jumlahPersil"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#10B981' }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          /* Single Bar Chart for Luas or Persil */
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800">
                {viewMode === 'luas'
                  ? 'Grafik Batang: Luas Lahan Tersedia (Hektar) per Sub Wilayah Pengembangan'
                  : 'Grafik Batang: Jumlah Bidang Persil Tanah per Sub Wilayah Pengembangan'}
              </span>
              <span className="text-[10.5px] font-mono text-slate-500">
                Unit: {viewMode === 'luas' ? 'Hektar (Ha)' : 'Bidang Persil'}
              </span>
            </div>
            <div className="h-[270px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 15, right: 15, left: 5, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#64748B', fontSize: 10.5 }}
                    interval={0}
                    angle={-14}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value: any) => [
                      viewMode === 'luas'
                        ? `${Number(value).toLocaleString('id-ID')} Hektar`
                        : `${Number(value).toLocaleString('id-ID')} Persil`,
                      viewMode === 'luas' ? 'Luas Lahan Tersedia' : 'Jumlah Persil',
                    ]}
                  />
                  <Bar
                    dataKey={viewMode === 'luas' ? 'luasHa' : 'jumlahPersil'}
                    radius={[4, 4, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        className="transition-all hover:opacity-80"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* SWP Badges Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 pt-1">
          {chartData.map((item) => (
            <div
              key={item.id}
              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-center"
            >
              <div className="text-[10px] font-semibold text-slate-700 truncate" title={item.fullName}>
                {item.name}
              </div>
              <div className="text-[10.5px] font-bold text-sky-700">{item.luasHa} Ha</div>
              <div className="text-[10px] text-emerald-700">{item.jumlahPersil} Persil</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Integrasi GIS &amp; Tata Ruang:</strong> Data bersumber dari Buku Rencana Tata Ruang
          &amp; Basis Spasial Sub Wilayah Pengembangan Batam.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 7-8 Item 15</span>
      </div>
    </div>
  );
};
