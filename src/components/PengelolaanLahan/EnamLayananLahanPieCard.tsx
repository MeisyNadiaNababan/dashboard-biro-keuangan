import React, { useState, useMemo } from 'react';
import {
  PieChart as PieChartIcon,
  Layers,
  RefreshCw,
  ShieldCheck,
  FileText,
  Gavel,
  Award,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Table as TableIcon,
  BarChart3,
  Search,
  Download,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  ENAM_LAYANAN_LAHAN_DATA,
  REKAP_PENERBITAN_BARU_DATA,
  REKAP_PENERBITAN_PERUBAHAN_DATA,
  REKAP_PECAH_PL_DATA,
  REKAP_REVISI_PL_DATA,
  REKAP_PEMBAHARUAN_HAK_DATA,
  REKAP_FAKTUR_PERUNTUKAN_DATA,
  REKAP_HAK_TANGGUNGAN_DATA,
  REKAP_DOKUMEN_PENGGANTI_DATA,
  REKAP_PERSETUJUAN_LELANG_DATA,
  REKAP_LAYANAN_REKOMENDASI_DATA,
} from './lahanData';
import { LahanVisualHeader } from './LahanVisualHeader';
import { LahanFilterState, RekapPermohonanItem } from './types';

interface EnamLayananLahanPieCardProps {
  filters?: LahanFilterState;
  onOpenFormulaModal?: (kpiId: string) => void;
}

type ActiveSheet = 'pie' | 'ds1' | 'ds2' | 'ds3' | 'ds4' | 'ds5' | 'ds6' | 'ds7' | 'ds8' | 'ds10' | 'ds11';

const SHEET_CONFIG = {
  pie: {
    datasetNumber: '1, 2, 3, 4, 5, 6, 7, 8, 10, 11',
    pdfPages: 'Hal. 6-7',
    title: 'REKAPITULASI LAYANAN PERTANAHAN & PENGELOLAAN LAHAN BP BATAM (10 DATASET REKAPITULASI)',
    visualName: 'Pie / Donut Chart Proporsi Jumlah Semua Rekapitulasi & Sheet Swap Rincian Layanan',
    attributes: [
      'NAMA LAYANAN',
      'JUMLAH PERMOHONAN',
      'DISETUJUI',
      'DITOLAK',
      'RASIO PERSETUJUAN (%)',
      'PANGSA PROPORSI',
    ],
  },
  ds1: {
    datasetNumber: 1,
    pdfPages: 'Hal. 6',
    title: 'REKAPITULASI PENERBITAN SURAT PERJANJIAN PENGELOLAAN TANAH (SKPT) DAN SURAT KEPUTUSAN PENGELOLAAN TANAH (BARU)',
    visualName: 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (SKPT Baru) & Tabel Detail',
    attributes: ['JENIS PEMOHON', 'DISETUJUI', 'DITOLAK', 'JUMLAH', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR'],
    data: REKAP_PENERBITAN_BARU_DATA,
    color: '#2563EB',
    shortName: 'SKPT Baru (#1)',
  },
  ds2: {
    datasetNumber: 2,
    pdfPages: 'Hal. 6',
    title: 'REKAPITULASI PENERBITAN SURAT PERJANJIAN PENGELOLAAN TANAH (SKPT) DAN SURAT KEPUTUSAN PENGELOLAAN TANAH (PERUBAHAN)',
    visualName: 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (SKPT Perubahan) & Tabel Detail',
    attributes: ['JENIS PEMOHON', 'DISETUJUI', 'DITOLAK', 'JUMLAH', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR'],
    data: REKAP_PENERBITAN_PERUBAHAN_DATA,
    color: '#7C3AED',
    shortName: 'SKPT Perubahan (#2)',
  },
  ds3: {
    datasetNumber: 3,
    pdfPages: 'Hal. 6',
    title: 'REKAPITULASI PECAH PENETAPAN LOKASI (PL)',
    visualName: 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Pecah PL) & Tabel Detail',
    attributes: ['JENIS PEMOHON', 'DISETUJUI', 'DITOLAK', 'JUMLAH', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR'],
    data: REKAP_PECAH_PL_DATA,
    color: '#059669',
    shortName: 'Pecah PL (#3)',
  },
  ds4: {
    datasetNumber: 4,
    pdfPages: 'Hal. 6',
    title: 'REKAPITULASI REVISI PENETAPAN LOKASI (PL)',
    visualName: 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Revisi PL) & Tabel Detail',
    attributes: ['JENIS PEMOHON', 'DISETUJUI', 'DITOLAK', 'JUMLAH', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR'],
    data: REKAP_REVISI_PL_DATA,
    color: '#D97706',
    shortName: 'Revisi PL (#4)',
  },
  ds5: {
    datasetNumber: 5,
    pdfPages: 'Hal. 6',
    title: 'REKAPITULASI PEMBAHARUAN HAK ATAS TANAH',
    visualName: 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Pembaharuan Hak) & Tabel Detail',
    attributes: ['JENIS PEMOHON', 'DISETUJUI', 'DITOLAK', 'JUMLAH', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR'],
    data: REKAP_PEMBAHARUAN_HAK_DATA,
    color: '#0284C7',
    shortName: 'Pembaharuan Hak (#5)',
  },
  ds6: {
    datasetNumber: 6,
    pdfPages: 'Hal. 6',
    title: 'REKAPITULASI PELAYANAN PENERBITAN FAKTUR PERUBAHAN PERUNTUKAN',
    visualName: 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Faktur Peruntukan) & Tabel Detail',
    attributes: ['JENIS PEMOHON', 'DISETUJUI', 'DITOLAK', 'JUMLAH', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR'],
    data: REKAP_FAKTUR_PERUNTUKAN_DATA,
    color: '#10B981',
    shortName: 'Faktur Peruntukan (#6)',
  },
  ds7: {
    datasetNumber: 7,
    pdfPages: 'Hal. 7',
    title: 'REKAPITULASI HAK TANGGUNGAN',
    visualName: 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Hak Tanggungan) & Tabel Detail',
    attributes: ['JENIS PEMOHON', 'DISETUJUI', 'DITOLAK', 'JUMLAH', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR'],
    data: REKAP_HAK_TANGGUNGAN_DATA,
    color: '#6366F1',
    shortName: 'Hak Tanggungan (#7)',
  },
  ds8: {
    datasetNumber: 8,
    pdfPages: 'Hal. 7',
    title: 'REKAPITULASI DOKUMEN PENGGANTI',
    visualName: 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Dokumen Pengganti) & Tabel Detail',
    attributes: ['JENIS PEMOHON', 'DISETUJUI', 'DITOLAK', 'JUMLAH', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR'],
    data: REKAP_DOKUMEN_PENGGANTI_DATA,
    color: '#F43F5E',
    shortName: 'Dokumen Pengganti (#8)',
  },
  ds10: {
    datasetNumber: 10,
    pdfPages: 'Hal. 7',
    title: 'REKAPITULASI PERSETUJUAN LELANG',
    visualName: 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Persetujuan Lelang) & Tabel Detail',
    attributes: ['JENIS PEMOHON', 'DISETUJUI', 'DITOLAK', 'JUMLAH', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR'],
    data: REKAP_PERSETUJUAN_LELANG_DATA,
    color: '#EC4899',
    shortName: 'Persetujuan Lelang (#10)',
  },
  ds11: {
    datasetNumber: 11,
    pdfPages: 'Hal. 7',
    title: 'REKAPITULASI LAYANAN REKOMENDASI PERTANAHAN',
    visualName: 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Layanan Rekomendasi) & Tabel Detail',
    attributes: ['JENIS PEMOHON', 'DISETUJUI', 'DITOLAK', 'JUMLAH', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR'],
    data: REKAP_LAYANAN_REKOMENDASI_DATA,
    color: '#14B8A6',
    shortName: 'Layanan Rekomendasi (#11)',
  },
};

export const EnamLayananLahanPieCard: React.FC<EnamLayananLahanPieCardProps> = ({
  filters = { tahun: 'ALL', jenisPemohon: 'ALL', status: 'ALL', searchQuery: '' },
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>('pie');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [selectedKodeInPie, setSelectedKodeInPie] = useState<string>('DPL-07');
  const [localSearch, setLocalSearch] = useState<string>('');

  const totalAllPermohonan = useMemo(
    () => ENAM_LAYANAN_LAHAN_DATA.reduce((acc, item) => acc + item.jumlahPermohonan, 0),
    []
  );

  const totalAllDisetujui = useMemo(
    () => ENAM_LAYANAN_LAHAN_DATA.reduce((acc, item) => acc + item.disetujui, 0),
    []
  );

  const totalAllDitolak = useMemo(
    () => ENAM_LAYANAN_LAHAN_DATA.reduce((acc, item) => acc + item.ditolak, 0),
    []
  );

  // Pie chart dataset
  const pieData = useMemo(() => {
    return ENAM_LAYANAN_LAHAN_DATA.map((item) => ({
      name: item.namaLayanan,
      value: item.jumlahPermohonan,
      kodeTag: item.kodeTag,
      color: item.color,
      noDataset: item.noDataset,
      disetujui: item.disetujui,
      ditolak: item.ditolak,
      rasio: item.rasioDisetujui,
      sheetKey:
        item.noDataset === 1
          ? ('ds1' as ActiveSheet)
          : item.noDataset === 2
          ? ('ds2' as ActiveSheet)
          : item.noDataset === 3
          ? ('ds3' as ActiveSheet)
          : item.noDataset === 4
          ? ('ds4' as ActiveSheet)
          : item.noDataset === 5
          ? ('ds5' as ActiveSheet)
          : item.noDataset === 6
          ? ('ds6' as ActiveSheet)
          : item.noDataset === 7
          ? ('ds7' as ActiveSheet)
          : item.noDataset === 8
          ? ('ds8' as ActiveSheet)
          : item.noDataset === 10
          ? ('ds10' as ActiveSheet)
          : ('ds11' as ActiveSheet),
    }));
  }, []);

  const activeLayananInPie = useMemo(
    () => ENAM_LAYANAN_LAHAN_DATA.find((item) => item.kodeTag === selectedKodeInPie) || ENAM_LAYANAN_LAHAN_DATA[0],
    [selectedKodeInPie]
  );

  // Helper to filter sub-datasets by global filters & local search
  const getFilteredDataset = (rawData: RekapPermohonanItem[]) => {
    return rawData.filter((item) => {
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

  // Active sub-dataset for sheets ds5, ds6, ds7, ds8, ds10, ds11
  const currentSubData = useMemo(() => {
    if (activeSheet === 'pie') return [];
    const cfg = SHEET_CONFIG[activeSheet] as any;
    return getFilteredDataset(cfg.data || []);
  }, [activeSheet, filters, localSearch]);

  // Aggregate sub-dataset by Jenis Pemohon
  const currentAgg = useMemo(() => {
    const map = new Map<string, { pemohon: string; disetujui: number; ditolak: number; total: number }>();
    (currentSubData || []).forEach((item) => {
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
  }, [currentSubData]);

  const currentSummary = useMemo(() => {
    const total = currentSubData.reduce((acc, i) => acc + i.jumlah, 0);
    const disetujui = currentSubData.reduce((acc, i) => acc + i.disetujui, 0);
    const ditolak = currentSubData.reduce((acc, i) => acc + i.ditolak, 0);
    const rate = total > 0 ? ((disetujui / total) * 100).toFixed(1) : '0';
    return { total, disetujui, ditolak, rate };
  }, [currentSubData]);

  // CSV Export for active sheet
  const handleExportCsv = () => {
    if (activeSheet === 'pie') {
      const headers = ['No Dataset', 'Kode', 'Nama Layanan', 'Total Permohonan', 'Disetujui', 'Ditolak', 'Rasio Disetujui (%)'];
      const rows = ENAM_LAYANAN_LAHAN_DATA.map((d) => [
        d.noDataset,
        d.kodeTag,
        `"${d.namaLayanan}"`,
        d.jumlahPermohonan,
        d.disetujui,
        d.ditolak,
        d.rasioDisetujui,
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `rekapitulasi_6_layanan_lahan.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const headers = ['ID Berkas', 'Jenis Pemohon', 'Periode Rekap', 'Bulan', 'Tahun', 'Disetujui', 'Ditolak', 'Jumlah'];
      const rows = currentSubData.map((d) => [
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
      link.setAttribute('download', `${activeSheet}_rincian_pemohon.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const activeHeaderConfig = SHEET_CONFIG[activeSheet] as any;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Dynamic LahanVisualHeader with Sheet Swap controls */}
      <div className="p-4 pb-0">
        <LahanVisualHeader
          datasetNumber={activeHeaderConfig.datasetNumber}
          pdfPages={activeHeaderConfig.pdfPages}
          classification="TERBUKA"
          periode="JIKA UPDATE"
          title={activeHeaderConfig.title}
          visualName={activeHeaderConfig.visualName}
          attributes={activeHeaderConfig.attributes}
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('lahan_6_layanan')}
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Sheet Switch Tabs */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 flex-wrap gap-0.5">
                <button
                  onClick={() => setActiveSheet('pie')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    activeSheet === 'pie'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <PieChartIcon className="w-3 h-3 text-pink-600" />
                  <span>Semua (Pie)</span>
                </button>
                <button
                  onClick={() => setActiveSheet('ds1')}
                  className={`px-2 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    activeSheet === 'ds1'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #1: SKPT Baru
                </button>
                <button
                  onClick={() => setActiveSheet('ds2')}
                  className={`px-2 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    activeSheet === 'ds2'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #2: SKPT Ubah
                </button>
                <button
                  onClick={() => setActiveSheet('ds3')}
                  className={`px-2 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    activeSheet === 'ds3'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #3: Pecah PL
                </button>
                <button
                  onClick={() => setActiveSheet('ds4')}
                  className={`px-2 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    activeSheet === 'ds4'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #4: Revisi PL
                </button>
                <button
                  onClick={() => setActiveSheet('ds5')}
                  className={`px-2 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    activeSheet === 'ds5'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #5: Pembaharuan
                </button>
                <button
                  onClick={() => setActiveSheet('ds6')}
                  className={`px-2 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    activeSheet === 'ds6'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #6: Faktur
                </button>
                <button
                  onClick={() => setActiveSheet('ds7')}
                  className={`px-2 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    activeSheet === 'ds7'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #7: Hak Tanggungan
                </button>
                <button
                  onClick={() => setActiveSheet('ds8')}
                  className={`px-2 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    activeSheet === 'ds8'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #8: Pengganti
                </button>
                <button
                  onClick={() => setActiveSheet('ds10')}
                  className={`px-2 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    activeSheet === 'ds10'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #10: Lelang
                </button>
                <button
                  onClick={() => setActiveSheet('ds11')}
                  className={`px-2 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    activeSheet === 'ds11'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #11: Rekomendasi
                </button>
              </div>

              {/* Chart vs Table toggle (only visible on individual sheets) */}
              {activeSheet !== 'pie' && (
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
          <div className="text-[10px] text-slate-500">
            {activeSheet === 'pie' ? 'Total 10 Rekapitulasi' : 'Total Permohonan'}
          </div>
          <div className="text-base font-bold text-slate-900">
            {activeSheet === 'pie'
              ? totalAllPermohonan.toLocaleString('id-ID')
              : currentSummary.total.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Berkas masuk</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-emerald-700 font-medium">Disetujui (ACC)</div>
          <div className="text-base font-bold text-emerald-700">
            {activeSheet === 'pie'
              ? totalAllDisetujui.toLocaleString('id-ID')
              : currentSummary.disetujui.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-emerald-600 mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Selesai diproses</span>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-rose-700 font-medium">Ditolak / Dikembalikan</div>
          <div className="text-base font-bold text-rose-700">
            {activeSheet === 'pie'
              ? totalAllDitolak.toLocaleString('id-ID')
              : currentSummary.ditolak.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-rose-600 mt-0.5 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            <span>Perbaikan berkas</span>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-indigo-700 font-medium">Tingkat Persetujuan</div>
          <div className="text-base font-bold text-indigo-700">
            {activeSheet === 'pie'
              ? `${((totalAllDisetujui / totalAllPermohonan) * 100).toFixed(1)}%`
              : `${currentSummary.rate}%`}
          </div>
          <div className="text-[10px] text-indigo-600 mt-0.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Rasio kelolosan</span>
          </div>
        </div>
      </div>

      {/* BODY CONTENT DEPENDING ON ACTIVE SHEET */}
      {activeSheet === 'pie' ? (
        /* =================== SHEET 1: PIE CHART KONSOLIDASI 6 LAYANAN =================== */
        <div className="p-3.5 grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Donut Chart View (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50/70 border border-slate-200 rounded-xl p-3 relative">
            <div className="text-xs font-semibold text-slate-700 mb-1 text-center">
              Distribusi Volume 10 Rekapitulasi Layanan Pertanahan
            </div>
            <div className="h-[230px] w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    onClick={(entry: any) => {
                      if (entry && entry.kodeTag) setSelectedKodeInPie(entry.kodeTag);
                    }}
                    cursor="pointer"
                  >
                    {pieData.map((entry) => (
                      <Cell
                        key={`cell-${entry.kodeTag}`}
                        fill={entry.color}
                        stroke={entry.kodeTag === selectedKodeInPie ? '#0F172A' : '#FFFFFF'}
                        strokeWidth={entry.kodeTag === selectedKodeInPie ? 2.5 : 1}
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
                        (Number(value) / totalAllPermohonan) *
                        100
                      ).toFixed(1)}%)`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Centered Donut Stat */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-500 font-medium">Total 10 Layanan</span>
                <span className="text-base font-black text-slate-900">
                  {totalAllPermohonan.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-pink-700 font-semibold">100% Berkas</span>
              </div>
            </div>
            <span className="text-[10.5px] text-slate-500 mt-1 text-center">
              💡 Klik juring donat atau kartu layanan untuk memilih &amp; buka lembar rincian
            </span>
          </div>

          {/* Right Panel: Active Service Card + Shortcuts (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5">
            {/* Active Highlight Card with Direct Sheet Swap Button */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3">
              <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: activeLayananInPie.color }}
                  >
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-mono">
                        Dataset #{activeLayananInPie.noDataset}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 font-mono">
                        {activeLayananInPie.kodeTag}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                      {activeLayananInPie.namaLayanan}
                    </h4>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Pangsa Layanan</span>
                  <span className="text-sm font-black text-slate-900">
                    {((activeLayananInPie.jumlahPermohonan / totalAllPermohonan) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 mb-2.5">{activeLayananInPie.deskripsi}</p>

              <div className="grid grid-cols-3 gap-2 text-xs mb-2.5">
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block">Total Permohonan</span>
                  <span className="text-sm font-bold text-slate-900">
                    {activeLayananInPie.jumlahPermohonan.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-emerald-700 block">Disetujui</span>
                  <span className="text-sm font-bold text-emerald-700">
                    {activeLayananInPie.disetujui.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-rose-700 block">Ditolak</span>
                  <span className="text-sm font-bold text-rose-700">
                    {activeLayananInPie.ditolak.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Direct Jump to sheet */}
              <button
                onClick={() => {
                  const targetSheet =
                    activeLayananInPie.noDataset === 1
                      ? 'ds1'
                      : activeLayananInPie.noDataset === 2
                      ? 'ds2'
                      : activeLayananInPie.noDataset === 3
                      ? 'ds3'
                      : activeLayananInPie.noDataset === 4
                      ? 'ds4'
                      : activeLayananInPie.noDataset === 5
                      ? 'ds5'
                      : activeLayananInPie.noDataset === 6
                      ? 'ds6'
                      : activeLayananInPie.noDataset === 7
                      ? 'ds7'
                      : activeLayananInPie.noDataset === 8
                      ? 'ds8'
                      : activeLayananInPie.noDataset === 10
                      ? 'ds10'
                      : 'ds11';
                  setActiveSheet(targetSheet as ActiveSheet);
                }}
                className="w-full py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Buka Lembar Sheet Rincian {activeLayananInPie.namaLayanan}</span>
              </button>
            </div>

            {/* Interactive Grid of all 6 services */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {ENAM_LAYANAN_LAHAN_DATA.map((item) => {
                const isSelected = item.kodeTag === selectedKodeInPie;
                return (
                  <button
                    key={item.kodeTag}
                    onClick={() => setSelectedKodeInPie(item.kodeTag)}
                    className={`p-2 rounded-lg text-left transition-all border text-xs cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-slate-900 shadow-xs ring-1 ring-slate-900'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span
                        className={`text-[11px] font-semibold truncate ${
                          isSelected ? 'text-slate-900' : 'text-slate-700'
                        }`}
                      >
                        {item.namaLayanan}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono text-slate-500">#{item.noDataset}</span>
                      <span className="font-bold text-slate-900">
                        {item.jumlahPermohonan.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* REQUIREMENT 2: REKAPITULASI LENGKAP 10 LAYANAN (JUMLAH PEMOHON, DISETUJUI, DITOLAK) */}
          <div className="lg:col-span-12 mt-2 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-3 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <h4 className="text-xs font-bold text-slate-900">
                  Tabel Kompilasi 10 Rekapitulasi Layanan Pertanahan &amp; Pengelolaan Lahan BP Batam
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 font-bold">
                  Buku Satu Data Hal. 6-7
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                Kompilasi Seluruh Permohonan Masuk, ACC, Ditolak &amp; Rasio
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-[10.5px] font-bold text-slate-700 uppercase font-mono tracking-wider">
                    <th className="py-2.5 px-3">No. Dataset &amp; Kode</th>
                    <th className="py-2.5 px-3">Nama Layanan Pertanahan</th>
                    <th className="py-2.5 px-3 text-right">Permohonan Masuk</th>
                    <th className="py-2.5 px-3 text-right text-emerald-700">Disetujui (ACC)</th>
                    <th className="py-2.5 px-3 text-right text-rose-700">Ditolak / Dikembalikan</th>
                    <th className="py-2.5 px-3 text-right text-indigo-700">Rasio ACC</th>
                    <th className="py-2.5 px-3 text-center">Aksi Lembar Sheet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  {ENAM_LAYANAN_LAHAN_DATA.map((item) => {
                    const targetSheet =
                      item.noDataset === 1
                        ? 'ds1'
                        : item.noDataset === 2
                        ? 'ds2'
                        : item.noDataset === 3
                        ? 'ds3'
                        : item.noDataset === 4
                        ? 'ds4'
                        : item.noDataset === 5
                        ? 'ds5'
                        : item.noDataset === 6
                        ? 'ds6'
                        : item.noDataset === 7
                        ? 'ds7'
                        : item.noDataset === 8
                        ? 'ds8'
                        : item.noDataset === 10
                        ? 'ds10'
                        : 'ds11';
                    const isSelected = item.kodeTag === selectedKodeInPie;

                    return (
                      <tr
                        key={item.kodeTag}
                        className={`hover:bg-slate-50 transition-colors ${
                          isSelected ? 'bg-blue-50/40 font-medium' : ''
                        }`}
                      >
                        <td className="py-2 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="font-mono font-bold text-slate-800">
                              #{item.noDataset}
                            </span>
                            <span className="font-mono text-[10px] text-slate-500">
                              ({item.kodeTag})
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-900">
                          {item.namaLayanan}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                          {item.jumlahPermohonan.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                          {item.disetujui.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-rose-700">
                          {item.ditolak.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2 px-3 text-right">
                          <span className="inline-block px-1.5 py-0.5 rounded font-mono font-bold text-[10.5px] bg-slate-100 text-slate-800 border border-slate-200">
                            {item.rasioDisetujui.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => {
                              setSelectedKodeInPie(item.kodeTag);
                              setActiveSheet(targetSheet as ActiveSheet);
                            }}
                            className="px-2.5 py-1 rounded-md text-[10.5px] font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                          >
                            <span>Rincian</span>
                            <span className="text-[9px] opacity-75">→</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100/90 font-bold border-t border-slate-200 text-slate-900 text-[11px]">
                    <td colSpan={2} className="py-2.5 px-3 font-mono uppercase">
                      Total 10 Rekapitulasi Layanan Pertanahan
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-base font-black text-slate-900">
                      {totalAllPermohonan.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-base font-black text-emerald-700">
                      {totalAllDisetujui.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-base font-black text-rose-700">
                      {totalAllDitolak.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-base font-black text-indigo-700">
                      {((totalAllDisetujui / totalAllPermohonan) * 100).toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3 text-center text-[10px] text-slate-500 font-normal">
                      100% Berkas Masuk
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* =================== SHEETS 2-7: RINCIAN TIAP LAYANAN (JENIS PEMOHON, DISETUJUI, DITOLAK) =================== */
        <div className="p-3.5 space-y-3">
          {/* Subheader with back to pie shortcut & search */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSheet('pie')}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                ← Kembali ke Pie Chart
              </button>
              <span className="text-xs font-bold text-slate-800">
                Rincian Pemohon: {activeHeaderConfig.shortName}
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
            /* Bar Chart View: Disetujui vs Ditolak by Jenis Pemohon */
            <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-800">
                  Grafik Batang: Disetujui vs Ditolak Berdasarkan Jenis Pemohon
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Total {currentAgg.length} Kelompok Pemohon
                </span>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={currentAgg}
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
                      formatter={(value: any, name: any) => [
                        `${Number(value).toLocaleString('id-ID')} berkas`,
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
                      fill="#059669"
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
                    {currentSubData.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-500">
                          Tidak ada data berkas yang sesuai filter.
                        </td>
                      </tr>
                    ) : (
                      currentSubData.map((row) => {
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

          {/* Aggregated Summary Cards by Jenis Pemohon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {currentAgg.slice(0, 4).map((agg) => (
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
          💡 <strong>Ketentuan Satu Data:</strong> Menampilkan konsolidasi 6 layanan perizinan lahan
          (Hal. 7 Buku Satu Data BP Batam) dengan Sheet Swap analitik Pie Chart dan tabel berkas tiap
          pemohon.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 6-7</span>
      </div>
    </div>
  );
};
