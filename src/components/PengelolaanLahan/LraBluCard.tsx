import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Download,
  TrendingUp,
  Search,
  CheckCircle2,
  AlertCircle,
  Table as TableIcon,
  BarChart3,
  Percent,
} from 'lucide-react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { LRA_BLU_2026_DATA, LraBluItem } from './bluFinancialData';
import { LahanVisualHeader } from './LahanVisualHeader';

interface LraBluCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

type LraViewMode = 'all' | 'pendapatan' | 'belanja' | 'table';

export const LraBluCard: React.FC<LraBluCardProps> = ({ onOpenFormulaModal }) => {
  const [viewMode, setViewMode] = useState<LraViewMode>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items
  const filteredData = useMemo(() => {
    let list = LRA_BLU_2026_DATA;
    if (viewMode === 'pendapatan') {
      list = list.filter((item) => item.jenisAnggaran === 'PENDAPATAN LRA');
    } else if (viewMode === 'belanja') {
      list = list.filter(
        (item) => item.jenisAnggaran === 'BELANJA OPERASI' || item.jenisAnggaran === 'BELANJA MODAL'
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.uraian.toLowerCase().includes(q) ||
          i.kategori.toLowerCase().includes(q) ||
          i.jenisAnggaran.toLowerCase().includes(q)
      );
    }
    return list;
  }, [viewMode, searchQuery]);

  // Aggregations
  const pendapatanList = LRA_BLU_2026_DATA.filter((i) => i.jenisAnggaran === 'PENDAPATAN LRA');
  const belanjaList = LRA_BLU_2026_DATA.filter((i) => i.jenisAnggaran !== 'PENDAPATAN LRA');

  const totalAnggaranPendapatan = pendapatanList.reduce((acc, i) => acc + i.anggaran, 0);
  const totalRealisasiPendapatan = pendapatanList.reduce((acc, i) => acc + i.realisasi, 0);
  const pctPendapatan = (totalRealisasiPendapatan / totalAnggaranPendapatan) * 100;

  const totalAnggaranBelanja = belanjaList.reduce((acc, i) => acc + i.anggaran, 0);
  const totalRealisasiBelanja = belanjaList.reduce((acc, i) => acc + i.realisasi, 0);
  const pctBelanja = (totalRealisasiBelanja / totalAnggaranBelanja) * 100;

  const surplusDefisit = totalRealisasiPendapatan - totalRealisasiBelanja;

  // Chart data
  const chartData = useMemo(() => {
    return filteredData.map((item) => ({
      name: item.kategori.length > 20 ? item.kategori.substring(0, 18) + '...' : item.kategori,
      fullName: item.uraian,
      kategori: item.kategori,
      anggaranMiliar: Number((item.anggaran / 1e9).toFixed(1)),
      realisasiMiliar: Number((item.realisasi / 1e9).toFixed(1)),
      persentase: item.persentase,
      jenis: item.jenisAnggaran,
    }));
  }, [filteredData]);

  // CSV Export
  const handleExportCsv = () => {
    const headers = ['Jenis Anggaran', 'Kategori', 'Uraian', 'Triwulan', 'Tahun', 'Anggaran (Rp)', 'Realisasi (Rp)', 'Persentase (%)'];
    const rows = filteredData.map((d) => [
      `"${d.jenisAnggaran}"`,
      `"${d.kategori}"`,
      `"${d.uraian}"`,
      `"${d.triwulan}"`,
      d.tahun,
      d.anggaran,
      d.realisasi,
      d.persentase,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'LRA_BLU_BP_Batam_per_30_Juni_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header Visualisasi Terstandarisasi */}
      <div className="p-4 pb-0">
        <LahanVisualHeader
          datasetNumber={3}
          pdfPages="Hal. 3 Item 3"
          classification="TERTUTUP"
          periode="PER 30 JUNI 2026 (TW II)"
          title="LAPORAN REALISASI ANGGARAN BADAN LAYANAN UMUM (BLU)"
          visualName="Grafik Batang Komparasi Pagu Anggaran vs Realisasi & Garis Capaian (%) dengan Sheet Swap"
          attributes={[
            'JENIS ANGGARAN',
            'URAIAN',
            'ANGGARAN (PAGU)',
            'REALISASI S.D. JUNI 2026',
            'PERSENTASE (%)',
          ]}
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('lra_blu_2026')}
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Sheet Swap Controls */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua Rekap (LRA)
                </button>
                <button
                  onClick={() => setViewMode('pendapatan')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'pendapatan'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pendapatan LRA
                </button>
                <button
                  onClick={() => setViewMode('belanja')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'belanja'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Belanja Operasi &amp; Modal
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
                  <span>Tabel LRA</span>
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportCsv}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Unduh Data CSV LRA"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>
          }
        />
      </div>

      {/* Mini KPI Highlights LRA */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-200 text-xs">
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Realisasi Pendapatan LRA</div>
          <div className="text-base font-bold text-emerald-700">
            Rp {(totalRealisasiPendapatan / 1e12).toFixed(2)} Triliun
          </div>
          <div className="text-[10px] text-emerald-600 font-mono">
            {pctPendapatan.toFixed(2)}% dari Pagu Rp {(totalAnggaranPendapatan / 1e12).toFixed(2)} T
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Realisasi Belanja LRA</div>
          <div className="text-base font-bold text-blue-700">
            Rp {(totalRealisasiBelanja / 1e12).toFixed(2)} Triliun
          </div>
          <div className="text-[10px] text-blue-600 font-mono">
            {pctBelanja.toFixed(2)}% dari Pagu Rp {(totalAnggaranBelanja / 1e12).toFixed(2)} T
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Surplus / (Defisit) LRA</div>
          <div className="text-base font-bold text-teal-700">
            + Rp {(surplusDefisit / 1e9).toFixed(1)} Miliar
          </div>
          <div className="text-[10px] text-teal-600">Surplus Operasional Semester I</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Periode Audit &amp; Data</div>
          <div className="text-base font-bold text-slate-900">Per 30 Juni 2026</div>
          <div className="text-[10px] text-slate-500">LRA BLU Triwulan II / Semester I</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3.5 space-y-3">
        {viewMode === 'table' ? (
          /* Table View */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Tabel Rincian Laporan Realisasi Anggaran BLU BP Batam (per 30 Juni 2026)
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari uraian atau pos belanja/pendapatan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-56 sm:w-64"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto max-h-[380px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">Jenis Anggaran</th>
                      <th className="py-2.5 px-3">Pos / Uraian LRA</th>
                      <th className="py-2.5 px-3 text-right">Anggaran / Pagu (Rp)</th>
                      <th className="py-2.5 px-3 text-right">Realisasi (Rp)</th>
                      <th className="py-2.5 px-3 text-right">Sisa Pagu (Rp)</th>
                      <th className="py-2.5 px-3 text-right">% Capaian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {filteredData.map((row) => {
                      const sisa = row.anggaran - row.realisasi;
                      return (
                        <tr key={row.id} className="hover:bg-slate-50/80 transition-colors font-sans">
                          <td className="py-2 px-3">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                row.jenisAnggaran === 'PENDAPATAN LRA'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : row.jenisAnggaran === 'BELANJA OPERASI'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-amber-50 text-amber-800 border-amber-200'
                              }`}
                            >
                              {row.jenisAnggaran}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-medium text-slate-800 max-w-sm">
                            <div className="font-semibold text-slate-900">{row.uraian}</div>
                            <div className="text-[10.5px] text-slate-500">{row.kategori}</div>
                          </td>
                          <td className="py-2 px-3 text-right font-semibold text-slate-700 font-mono">
                            {row.anggaran.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-sky-700 font-mono">
                            {row.realisasi.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2 px-3 text-right text-slate-500 font-mono">
                            {sisa.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2 px-3 text-right font-bold font-mono">
                            <span
                              className={`inline-block px-1.5 py-0.5 rounded ${
                                row.persentase >= 50
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {row.persentase.toFixed(2)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Visual Chart View: Composed Bar (Pagu vs Realisasi) + Line (% Capaian) */
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800">
                Visualisasi Komparasi Pagu Anggaran vs Realisasi (Rp Miliar, Sumbu Kiri) &amp; Capaian % (Garis, Sumbu Kanan)
              </span>
              <span className="text-[10.5px] font-mono text-slate-500">
                Realisasi Semester I / per 30 Juni 2026
              </span>
            </div>

            <div className="h-[280px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 15, right: 30, left: 10, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    interval={0}
                    angle={-18}
                    textAnchor="end"
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: '#0284C7', fontSize: 10.5 }}
                    label={{
                      value: 'Nilai (Rp Miliar)',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#0284C7',
                      fontSize: 10,
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 100]}
                    tick={{ fill: '#10B981', fontSize: 10.5 }}
                    label={{
                      value: 'Capaian (%)',
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
                      name === 'persentase'
                        ? `${Number(value).toFixed(2)}%`
                        : `Rp ${Number(value).toLocaleString('id-ID')} Miliar`,
                      name === 'anggaranMiliar'
                        ? 'Pagu Anggaran'
                        : name === 'realisasiMiliar'
                        ? 'Realisasi s.d. 30 Juni 2026'
                        : 'Persentase Capaian',
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    height={30}
                    formatter={(val) => (
                      <span className="text-xs font-semibold text-slate-700">
                        {val === 'anggaranMiliar'
                          ? 'Pagu Anggaran (Rp M)'
                          : val === 'realisasiMiliar'
                          ? 'Realisasi s.d. 30 Juni 2026 (Rp M)'
                          : 'Persentase Capaian (%)'}
                      </span>
                    )}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="anggaranMiliar"
                    name="anggaranMiliar"
                    fill="#94A3B8"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="realisasiMiliar"
                    name="realisasiMiliar"
                    fill="#0284C7"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="persentase"
                    name="persentase"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: '#10B981' }}
                    activeDot={{ r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Breakdown Micro Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 pt-1">
          {filteredData.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="p-2 rounded-lg border border-slate-200 bg-slate-50 text-center"
            >
              <div className="text-[10px] font-semibold text-slate-700 truncate" title={item.uraian}>
                {item.kategori}
              </div>
              <div className="text-[11px] font-bold text-sky-700">
                Rp {(item.realisasi / 1e9).toFixed(1)} M
              </div>
              <div className="text-[9.5px] text-emerald-600 font-semibold font-mono">
                {item.persentase.toFixed(1)}% terealisasi
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Ketentuan PSAP 13 (BLU):</strong> Laporan Realisasi Anggaran menyajikan ikhtisar sumber, alokasi, dan pemakaian sumber daya keuangan per 30 Juni 2026.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 3 Item 3</span>
      </div>
    </div>
  );
};
