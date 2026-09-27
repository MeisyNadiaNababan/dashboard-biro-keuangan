import React, { useState, useMemo } from 'react';
import {
  Repeat,
  CalendarCheck2,
  PieChart as PieChartIcon,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Table as TableIcon,
  BarChart3,
  GitCompare,
  Search,
  Download,
  Layers,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  REKAP_PERALIHAN_HAK_DATA,
  REKAP_PERPANJANGAN_HAK_DATA,
} from './lahanData';
import { LahanVisualHeader } from './LahanVisualHeader';
import { LahanFilterState, RekapPermohonanItem } from './types';

interface HakAtasTanah3WaySheetSwapCardProps {
  filters: LahanFilterState;
  onOpenFormulaModal?: (kpiId: string) => void;
}

type HakMode = 'pie' | 'peralihan' | 'perpanjangan' | 'komparasi';

const PIE_COLORS = ['#0284C7', '#10B981'];

export const HakAtasTanah3WaySheetSwapCard: React.FC<HakAtasTanah3WaySheetSwapCardProps> = ({
  filters,
  onOpenFormulaModal,
}) => {
  const [hakMode, setHakMode] = useState<HakMode>('pie'); // Defaults to Pie chart as requested
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [localSearch, setLocalSearch] = useState<string>('');

  // Filter raw datasets according to global filters
  const filterData = (data: RekapPermohonanItem[]) => {
    return data.filter((item) => {
      if (filters.tahun !== 'ALL' && item.tahun.toString() !== filters.tahun) return false;
      if (filters.jenisPemohon !== 'ALL' && item.jenisPemohon !== filters.jenisPemohon) return false;
      if (filters.status === 'DISETUJUI' && item.disetujui === 0) return false;
      if (filters.status === 'DITOLAK' && item.ditolak === 0) return false;

      const q = (localSearch || filters.searchQuery || '').toLowerCase().trim();
      if (q) {
        const matchPemohon = item.jenisPemohon.toLowerCase().includes(q);
        const matchId = item.id.toString().includes(q);
        const matchBulan = item.bulan.toLowerCase().includes(q);
        if (!matchPemohon && !matchId && !matchBulan) return false;
      }
      return true;
    });
  };

  const filteredPeralihan = useMemo(() => filterData(REKAP_PERALIHAN_HAK_DATA), [filters, localSearch]);
  const filteredPerpanjangan = useMemo(() => filterData(REKAP_PERPANJANGAN_HAK_DATA), [filters, localSearch]);

  // Aggregate by Jenis Pemohon
  const aggregateByPemohon = (data: RekapPermohonanItem[]) => {
    const map = new Map<string, { pemohon: string; disetujui: number; ditolak: number; total: number }>();
    (data || []).forEach((item) => {
      const existing = map.get(item.jenisPemohon) || {
        pemohon: item.jenisPemohon,
        disetujui: 0,
        ditolak: 0,
        total: 0,
      };
      existing.disetujui += item.disetujui;
      existing.ditolak += item.ditolak;
      existing.total += item.jumlah;
      map.set(item.jenisPemohon, existing);
    });
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  };

  const aggPeralihan = useMemo(() => aggregateByPemohon(filteredPeralihan), [filteredPeralihan]);
  const aggPerpanjangan = useMemo(() => aggregateByPemohon(filteredPerpanjangan), [filteredPerpanjangan]);

  // Combined Matriks for 2-way comparison
  const aggKomparasi = useMemo(() => {
    const allPemohon = Array.from(
      new Set([
        ...aggPeralihan.map((x) => x.pemohon),
        ...aggPerpanjangan.map((x) => x.pemohon),
      ])
    );
    return allPemohon
      .map((pemohon) => {
        const p = aggPeralihan.find((x) => x.pemohon === pemohon) || { disetujui: 0, ditolak: 0, total: 0 };
        const j = aggPerpanjangan.find((x) => x.pemohon === pemohon) || { disetujui: 0, ditolak: 0, total: 0 };
        return {
          pemohon,
          peralihanDisetujui: p.disetujui,
          peralihanDitolak: p.ditolak,
          peralihanTotal: p.total,
          perpanjanganDisetujui: j.disetujui,
          perpanjanganDitolak: j.ditolak,
          perpanjanganTotal: j.total,
          totalSemua: p.total + j.total,
        };
      })
      .sort((a, b) => b.totalSemua - a.totalSemua);
  }, [aggPeralihan, aggPerpanjangan]);

  // Totals for Peralihan and Perpanjangan
  const totalPeralihan = useMemo(() => filteredPeralihan.reduce((acc, i) => acc + i.jumlah, 0), [filteredPeralihan]);
  const accPeralihan = useMemo(() => filteredPeralihan.reduce((acc, i) => acc + i.disetujui, 0), [filteredPeralihan]);
  const rejectPeralihan = useMemo(() => filteredPeralihan.reduce((acc, i) => acc + i.ditolak, 0), [filteredPeralihan]);

  const totalPerpanjangan = useMemo(() => filteredPerpanjangan.reduce((acc, i) => acc + i.jumlah, 0), [filteredPerpanjangan]);
  const accPerpanjangan = useMemo(() => filteredPerpanjangan.reduce((acc, i) => acc + i.disetujui, 0), [filteredPerpanjangan]);
  const rejectPerpanjangan = useMemo(() => filteredPerpanjangan.reduce((acc, i) => acc + i.ditolak, 0), [filteredPerpanjangan]);

  const grandTotal = totalPeralihan + totalPerpanjangan;

  // Pie chart dataset comparing Peralihan vs Perpanjangan
  const pieData = useMemo(() => {
    return [
      {
        name: 'Peralihan Hak Atas Tanah',
        datasetNo: 9,
        value: totalPeralihan,
        disetujui: accPeralihan,
        ditolak: rejectPeralihan,
        color: '#0284C7',
        targetMode: 'peralihan' as HakMode,
      },
      {
        name: 'Perpanjangan Hak Atas Tanah',
        datasetNo: 13,
        value: totalPerpanjangan,
        disetujui: accPerpanjangan,
        ditolak: rejectPerpanjangan,
        color: '#10B981',
        targetMode: 'perpanjangan' as HakMode,
      },
    ];
  }, [totalPeralihan, accPeralihan, rejectPeralihan, totalPerpanjangan, accPerpanjangan, rejectPerpanjangan]);

  // Summary Metrics depending on active mode
  const summary = useMemo(() => {
    if (hakMode === 'peralihan') {
      const rate = totalPeralihan > 0 ? ((accPeralihan / totalPeralihan) * 100).toFixed(1) : '0';
      return { total: totalPeralihan, disetujui: accPeralihan, ditolak: rejectPeralihan, rate, label: 'Peralihan Hak (#9)' };
    }
    if (hakMode === 'perpanjangan') {
      const rate = totalPerpanjangan > 0 ? ((accPerpanjangan / totalPerpanjangan) * 100).toFixed(1) : '0';
      return { total: totalPerpanjangan, disetujui: accPerpanjangan, ditolak: rejectPerpanjangan, rate, label: 'Perpanjangan Hak (#13)' };
    }
    const total = totalPeralihan + totalPerpanjangan;
    const disetujui = accPeralihan + accPerpanjangan;
    const ditolak = rejectPeralihan + rejectPerpanjangan;
    const rate = total > 0 ? ((disetujui / total) * 100).toFixed(1) : '0';
    return { total, disetujui, ditolak, rate, label: 'Total Dua Perizinan (#9 & #13)' };
  }, [hakMode, totalPeralihan, accPeralihan, rejectPeralihan, totalPerpanjangan, accPerpanjangan, rejectPerpanjangan]);

  const activeRawData = hakMode === 'peralihan' ? filteredPeralihan : filteredPerpanjangan;
  const activeAggData = hakMode === 'peralihan' ? aggPeralihan : aggPerpanjangan;

  // Export CSV
  const handleExportCsv = () => {
    if (hakMode === 'pie') {
      const headers = ['Dataset', 'Nama Perizinan', 'Total Berkas', 'Disetujui', 'Ditolak', 'Persentase Pangsa (%)'];
      const rows = pieData.map((d) => [
        `"Dataset #${d.datasetNo}"`,
        `"${d.name}"`,
        d.value,
        d.disetujui,
        d.ditolak,
        grandTotal > 0 ? ((d.value / grandTotal) * 100).toFixed(2) : '0',
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'komparasi_pie_peralihan_vs_perpanjangan.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (hakMode === 'komparasi') {
      const headers = ['Jenis Pemohon', 'Peralihan Disetujui', 'Peralihan Ditolak', 'Perpanjangan Disetujui', 'Perpanjangan Ditolak', 'Total Semua'];
      const rows = aggKomparasi.map((d) => [
        `"${d.pemohon}"`,
        d.peralihanDisetujui,
        d.peralihanDitolak,
        d.perpanjanganDisetujui,
        d.perpanjanganDitolak,
        d.totalSemua,
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'komparasi_pemohon_peralihan_perpanjangan.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const headers = ['ID Berkas', 'Jenis Pemohon', 'Periode Rekap', 'Bulan', 'Tahun', 'Disetujui', 'Ditolak', 'Jumlah'];
      const rows = activeRawData.map((d) => [
        d.id,
        `"${d.jenisPemohon}"`,
        `"${d.tglAwal} s/d ${d.tglAkhir}"`,
        d.bulan,
        d.tahun,
        d.disetujui,
        d.ditolak,
        d.jumlah,
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${hakMode}_detail_pemohon.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Dynamic LahanVisualHeader */}
      <div className="p-4 pb-0">
        <LahanVisualHeader
          datasetNumber={
            hakMode === 'pie'
              ? '9 & 13'
              : hakMode === 'peralihan'
              ? 9
              : hakMode === 'perpanjangan'
              ? 13
              : '9 & 13'
          }
          pdfPages="Hal. 7"
          classification="TERBUKA"
          periode="JIKA UPDATE"
          title={
            hakMode === 'pie'
              ? 'REKAPITULASI JUMLAH PERIZINAN PERALIHAN HAK & PERPANJANGAN HAK ATAS TANAH'
              : hakMode === 'peralihan'
              ? 'REKAPITULASI JUMLAH PERIZINAN PERALIHAN HAK ATAS TANAH'
              : hakMode === 'perpanjangan'
              ? 'REKAPITULASI JUMLAH PERIZINAN PERPANJANGAN HAK ATAS TANAH'
              : 'KOMPARASI PERALILAN HAK VS PERPANJANGAN HAK ATAS TANAH'
          }
          visualName={
            hakMode === 'pie'
              ? 'Pie Chart Proporsi Jumlah Kedua Perizinan & Sheet Swap Rincian Jenis Pemohon'
              : hakMode === 'peralihan'
              ? 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Peralihan Hak) & Tabel Detail'
              : hakMode === 'perpanjangan'
              ? 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Perpanjangan Hak) & Tabel Detail'
              : 'Grouped Bar Chart Komparasi Peralihan vs Perpanjangan per Jenis Pemohon'
          }
          attributes={
            hakMode === 'pie'
              ? ['JENIS PERIZINAN', 'JUMLAH PERMOHONAN', 'DISETUJUI', 'DITOLAK', 'RASIO (%)', 'PANGSA VOLUME']
              : hakMode === 'komparasi'
              ? ['JENIS PEMOHON', 'PERALIHAN DISETUJUI', 'PERALIHAN DITOLAK', 'PERPANJANGAN DISETUJUI', 'PERPANJANGAN DITOLAK', 'TOTAL']
              : ['JENIS PEMOHON', 'DISETUJUI', 'DITOLAK', 'JUMLAH', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR']
          }
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('lahan_peralihan_hak')}
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Sheet Swap Tabs */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setHakMode('pie')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    hakMode === 'pie'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <PieChartIcon className="w-3 h-3 text-sky-600" />
                  <span>Pie Chart Kedua Izin</span>
                </button>
                <button
                  onClick={() => setHakMode('peralihan')}
                  className={`px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    hakMode === 'peralihan'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #9: Peralihan Hak
                </button>
                <button
                  onClick={() => setHakMode('perpanjangan')}
                  className={`px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    hakMode === 'perpanjangan'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #13: Perpanjangan Hak
                </button>
                <button
                  onClick={() => setHakMode('komparasi')}
                  className={`px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    hakMode === 'komparasi'
                      ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Komparasi
                </button>
              </div>

              {/* View Toggle on individual sheets */}
              {hakMode !== 'pie' && hakMode !== 'komparasi' && (
                <div className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                  <button
                    onClick={() => setViewMode('chart')}
                    className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                      viewMode === 'chart'
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Tampilan Grafik Batang"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                      viewMode === 'table'
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Tampilan Tabel Detail"
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

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

      {/* Mini KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-100 text-xs">
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Total Berkas Permohonan</div>
          <div className="text-base font-bold text-slate-900">{summary.total.toLocaleString('id-ID')}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{summary.label}</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-emerald-700 font-medium">Disetujui (ACC)</div>
          <div className="text-base font-bold text-emerald-700">{summary.disetujui.toLocaleString('id-ID')}</div>
          <div className="text-[10px] text-emerald-600 mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Terbit izin</span>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-rose-700 font-medium">Ditolak</div>
          <div className="text-base font-bold text-rose-700">{summary.ditolak.toLocaleString('id-ID')}</div>
          <div className="text-[10px] text-rose-600 mt-0.5 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            <span>Perbaikan berkas</span>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-indigo-700 font-medium">Tingkat Persetujuan</div>
          <div className="text-base font-bold text-indigo-700">{summary.rate}%</div>
          <div className="text-[10px] text-indigo-600 mt-0.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Success rate</span>
          </div>
        </div>
      </div>

      {/* BODY CONTENT DEPENDING ON ACTIVE SHEET */}
      {hakMode === 'pie' ? (
        /* =================== SHEET 1: PIE CHART JUMLAH KEDUA PERIZINAN =================== */
        <div className="p-3.5 grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Donut Chart View (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50/70 border border-slate-200 rounded-xl p-3 relative">
            <div className="text-xs font-semibold text-slate-700 mb-1 text-center">
              Proporsi Volume: Peralihan Hak (#9) vs Perpanjangan Hak (#13)
            </div>
            <div className="h-[230px] w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={92}
                    paddingAngle={4}
                    dataKey="value"
                    onClick={(entry: any) => {
                      if (entry && entry.targetMode) setHakMode(entry.targetMode);
                    }}
                    cursor="pointer"
                  >
                    {pieData.map((entry, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={entry.color}
                        stroke="#FFFFFF"
                        strokeWidth={2}
                        className="transition-all hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      color: '#0F172A',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value: any, name: any) => [
                      `${value.toLocaleString('id-ID')} berkas (${(
                        (Number(value) / grandTotal) *
                        100
                      ).toFixed(1)}%)`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Centered Donut Stat */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-500 font-medium">Total 2 Izin</span>
                <span className="text-base font-black text-slate-900">
                  {grandTotal.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-sky-700 font-semibold">Berkas Terbit</span>
              </div>
            </div>
            <span className="text-[10.5px] text-slate-500 mt-1 text-center">
              💡 Klik juring donat atau tombol di samping untuk membuka lembar rincian permohonan
            </span>
          </div>

          {/* Right Cards: Direct Breakdown for both permits (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
            {/* Card 1: Peralihan Hak Atas Tanah */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3">
              <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shrink-0">
                    <Repeat className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-mono">
                        DATASET #9
                      </span>
                      <span className="text-[10px] font-bold text-sky-700 font-mono">
                        Hal. 7 Buku Satu Data
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                      Rekapitulasi Jumlah Perizinan Peralihan Hak Atas Tanah
                    </h4>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Pangsa</span>
                  <span className="text-sm font-black text-sky-700">
                    {grandTotal > 0 ? ((totalPeralihan / grandTotal) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs mb-2.5">
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block">Total Permohonan</span>
                  <span className="text-sm font-bold text-slate-900">
                    {totalPeralihan.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-emerald-700 block">Disetujui</span>
                  <span className="text-sm font-bold text-emerald-700">
                    {accPeralihan.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-rose-700 block">Ditolak</span>
                  <span className="text-sm font-bold text-rose-700">
                    {rejectPeralihan.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setHakMode('peralihan')}
                className="w-full py-1.5 px-3 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Buka Lembar Rincian Jenis Pemohon Peralihan Hak (DS #9)</span>
              </button>
            </div>

            {/* Card 2: Perpanjangan Hak Atas Tanah */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3">
              <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                    <CalendarCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-mono">
                        DATASET #13
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 font-mono">
                        Hal. 7 Buku Satu Data
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                      Rekapitulasi Jumlah Perizinan Perpanjangan Hak Atas Tanah
                    </h4>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Pangsa</span>
                  <span className="text-sm font-black text-emerald-700">
                    {grandTotal > 0 ? ((totalPerpanjangan / grandTotal) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs mb-2.5">
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block">Total Permohonan</span>
                  <span className="text-sm font-bold text-slate-900">
                    {totalPerpanjangan.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-emerald-700 block">Disetujui</span>
                  <span className="text-sm font-bold text-emerald-700">
                    {accPerpanjangan.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-rose-700 block">Ditolak</span>
                  <span className="text-sm font-bold text-rose-700">
                    {rejectPerpanjangan.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setHakMode('perpanjangan')}
                className="w-full py-1.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Buka Lembar Rincian Jenis Pemohon Perpanjangan Hak (DS #13)</span>
              </button>
            </div>
          </div>
        </div>
      ) : hakMode === 'komparasi' ? (
        /* =================== SHEET 4: KOMPARASI MATRIKS / GROUPED BAR CHART =================== */
        <div className="p-3.5 space-y-3">
          <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800">
                Grouped Bar Chart: Komparasi Permohonan Peralihan vs Perpanjangan per Jenis Pemohon
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Unit: Berkas Permohonan
              </span>
            </div>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={aggKomparasi}
                  margin={{ top: 10, right: 20, left: 0, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="pemohon"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    interval={0}
                    angle={-12}
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
                    formatter={(val: any, name: any) => [
                      `${Number(val).toLocaleString('id-ID')} berkas`,
                      name === 'peralihanDisetujui'
                        ? 'Peralihan: Disetujui'
                        : name === 'peralihanDitolak'
                        ? 'Peralihan: Ditolak'
                        : name === 'perpanjanganDisetujui'
                        ? 'Perpanjangan: Disetujui'
                        : 'Perpanjangan: Ditolak',
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    height={32}
                    formatter={(val) => (
                      <span className="text-xs font-medium text-slate-700">
                        {val === 'peralihanDisetujui'
                          ? 'Peralihan (ACC)'
                          : val === 'peralihanDitolak'
                          ? 'Peralihan (Tolak)'
                          : val === 'perpanjanganDisetujui'
                          ? 'Perpanjangan (ACC)'
                          : 'Perpanjangan (Tolak)'}
                      </span>
                    )}
                  />
                  <Bar dataKey="peralihanDisetujui" fill="#0284C7" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="peralihanDitolak" fill="#93C5FD" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="perpanjanganDisetujui" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="perpanjanganDitolak" fill="#6EE7B7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Matriks Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="overflow-x-auto max-h-[300px]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold sticky top-0">
                  <tr>
                    <th className="py-2 px-3" rowSpan={2}>Jenis Pemohon</th>
                    <th className="py-1 px-3 text-center bg-sky-50 text-sky-900 border-b border-sky-200" colSpan={3}>
                      Peralihan Hak (DS #9)
                    </th>
                    <th className="py-1 px-3 text-center bg-emerald-50 text-emerald-900 border-b border-emerald-200" colSpan={3}>
                      Perpanjangan Hak (DS #13)
                    </th>
                    <th className="py-2 px-3 text-right" rowSpan={2}>Total Semua</th>
                  </tr>
                  <tr>
                    <th className="py-1 px-2 text-right bg-sky-50/70 text-emerald-800">ACC</th>
                    <th className="py-1 px-2 text-right bg-sky-50/70 text-rose-800">Tolak</th>
                    <th className="py-1 px-2 text-right bg-sky-50/70 text-sky-900">Total</th>
                    <th className="py-1 px-2 text-right bg-emerald-50/70 text-emerald-800">ACC</th>
                    <th className="py-1 px-2 text-right bg-emerald-50/70 text-rose-800">Tolak</th>
                    <th className="py-1 px-2 text-right bg-emerald-50/70 text-emerald-900">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {aggKomparasi.map((row) => (
                    <tr key={row.pemohon} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2 px-3 font-semibold text-slate-900">{row.pemohon}</td>
                      <td className="py-2 px-2 text-right font-medium text-emerald-700">
                        {row.peralihanDisetujui.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 px-2 text-right font-medium text-rose-700">
                        {row.peralihanDitolak.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 px-2 text-right font-bold text-sky-900 bg-sky-50/30">
                        {row.peralihanTotal.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 px-2 text-right font-medium text-emerald-700">
                        {row.perpanjanganDisetujui.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 px-2 text-right font-medium text-rose-700">
                        {row.perpanjanganDitolak.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 px-2 text-right font-bold text-emerald-900 bg-emerald-50/30">
                        {row.perpanjanganTotal.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 px-3 text-right font-black text-slate-900">
                        {row.totalSemua.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* =================== SHEETS 2 & 3: RINCIAN PERALIHAN HAK ATAU PERPANJANGAN HAK =================== */
        <div className="p-3.5 space-y-3">
          {/* Subheader with back shortcut & search */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHakMode('pie')}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                ← Kembali ke Pie Chart
              </button>
              <span className="text-xs font-bold text-slate-800">
                Rincian Pemohon: {hakMode === 'peralihan' ? 'Peralihan Hak (#9)' : 'Perpanjangan Hak (#13)'}
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari jenis pemohon..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-48 sm:w-64"
              />
            </div>
          </div>

          {viewMode === 'chart' ? (
            /* Bar Chart: Disetujui vs Ditolak by Jenis Pemohon */
            <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-800">
                  Grafik Batang: Disetujui vs Ditolak Berdasarkan Jenis Pemohon
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Total {activeAggData.length} Kelompok Pemohon
                </span>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activeAggData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                      dataKey="pemohon"
                      tick={{ fill: '#64748B', fontSize: 11 }}
                      interval={0}
                      angle={-12}
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
                      formatter={(val: any, name: any) => [
                        `${Number(val).toLocaleString('id-ID')} berkas`,
                        name === 'disetujui' ? 'Disetujui (ACC)' : 'Ditolak',
                      ]}
                    />
                    <Legend
                      verticalAlign="top"
                      height={32}
                      formatter={(value) => (
                        <span className="text-xs font-medium text-slate-700">
                          {value === 'disetujui' ? 'Disetujui (ACC)' : 'Ditolak'}
                        </span>
                      )}
                    />
                    <Bar
                      dataKey="disetujui"
                      name="disetujui"
                      fill={hakMode === 'peralihan' ? '#0284C7' : '#059669'}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="ditolak"
                      name="ditolak"
                      fill="#E11D48"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            /* Table Detail View */
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto max-h-[300px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="py-2 px-3">ID Berkas</th>
                      <th className="py-2 px-3">Jenis Pemohon</th>
                      <th className="py-2 px-3">Bulan</th>
                      <th className="py-2 px-3">Tahun</th>
                      <th className="py-2 px-3 text-right">Disetujui</th>
                      <th className="py-2 px-3 text-right">Ditolak</th>
                      <th className="py-2 px-3 text-right">Jumlah</th>
                      <th className="py-2 px-3 text-center">Tingkat ACC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeRawData.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-500">
                          Tidak ada data berkas yang sesuai filter.
                        </td>
                      </tr>
                    ) : (
                      activeRawData.map((row) => {
                        const accRate =
                          row.jumlah > 0 ? ((row.disetujui / row.jumlah) * 100).toFixed(0) : '0';
                        return (
                          <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-2 px-3 font-mono text-slate-500">{row.id}</td>
                            <td className="py-2 px-3 font-semibold text-slate-900">
                              {row.jenisPemohon}
                            </td>
                            <td className="py-2 px-3 text-slate-600">{row.bulan}</td>
                            <td className="py-2 px-3 text-slate-600 font-mono">{row.tahun}</td>
                            <td className="py-2 px-3 text-right font-bold text-emerald-700">
                              {row.disetujui.toLocaleString('id-ID')}
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-rose-700">
                              {row.ditolak.toLocaleString('id-ID')}
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-slate-900">
                              {row.jumlah.toLocaleString('id-ID')}
                            </td>
                            <td className="py-2 px-3 text-center">
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                                  Number(accRate) >= 80
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                                }`}
                              >
                                {accRate}%
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
          )}

          {/* Quick Summary Cards by Jenis Pemohon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {activeAggData.slice(0, 4).map((agg) => (
              <div
                key={agg.pemohon}
                className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs"
              >
                <div className="text-[11px] font-semibold text-slate-800 truncate mb-1">
                  {agg.pemohon}
                </div>
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className="text-emerald-700 font-bold">✓ {agg.disetujui}</span>
                  <span className="text-rose-700 font-bold">✗ {agg.ditolak}</span>
                  <span className="text-slate-900 font-black">Tot: {agg.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>
          💡 <strong>Ketentuan Satu Data:</strong> Menampilkan komparasi Pie Chart jumlah permohonan
          Peralihan Hak (#9) dan Perpanjangan Hak (#13), serta rincian jenis pemohon per izin.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 7 Item 9 &amp; 13</span>
      </div>
    </div>
  );
};
