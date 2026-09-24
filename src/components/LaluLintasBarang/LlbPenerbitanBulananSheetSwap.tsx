import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Table as TableIcon,
  Layers,
  ArrowRightLeft,
  Building2,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  Download,
  Calendar,
  Filter,
} from 'lucide-react';
import {
  REKAP_IZIN_USAHA_KAWASAN_BULANAN,
  REKAP_IZIN_PEMASUKAN_BULANAN,
  REKAP_IZIN_PENGELUARAN_BULANAN,
  RekapBulananItem,
} from '../../data/laluLintasBarangData';
import { LlbVisualHeader } from './LlbVisualHeader';

interface LlbPenerbitanBulananSheetSwapProps {
  onOpenFormulaModal?: (metricId: string) => void;
}

const BULAN_LIST = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const BULAN_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

export const LlbPenerbitanBulananSheetSwap: React.FC<LlbPenerbitanBulananSheetSwapProps> = ({
  onOpenFormulaModal,
}) => {
  // Active Sheet: 'kawasan' | 'pemasukan' | 'pengeluaran' | 'konsolidasi'
  const [activeSheet, setActiveSheet] = useState<'kawasan' | 'pemasukan' | 'pengeluaran' | 'konsolidasi'>('kawasan');
  const [viewFormat, setViewFormat] = useState<'chart' | 'matrix'>('chart');
  const [selectedBulan, setSelectedBulan] = useState<string>('ALL');

  // Determine metadata based on active sheet
  const currentSheetMeta = useMemo(() => {
    switch (activeSheet) {
      case 'kawasan':
        return {
          datasetNumber: 4,
          pdfPages: 'Hal. 9',
          title: 'REKAPITULASI PENERBITAN LAYANAN IZIN USAHA KAWASAN',
          visualName: 'Visual Grouped Bar & Matriks Jumlah Penerbitan Izin Usaha Kawasan per Bulan',
          attributes: ['URAIAN IZIN USAHA KAWASAN', 'JUMLAH PENERBITAN PER BULAN'],
          data: REKAP_IZIN_USAHA_KAWASAN_BULANAN,
          themeColor: '#0D9488', // Teal
          badgeText: 'Izin Kawasan (IUK)',
          icon: <Building2 className="w-3.5 h-3.5 text-teal-600" />,
        };
      case 'pemasukan':
        return {
          datasetNumber: 6,
          pdfPages: 'Hal. 9',
          title: 'REKAPITULASI PENERBITAN LAYANAN PERIZINAN PEMASUKAN BARANG',
          visualName: 'Visual Bar Chart & Tren Jumlah Penerbitan Izin Pemasukan Barang per Bulan',
          attributes: ['URAIAN IZIN PEMASUKAN BARANG', 'JUMLAH PENERBITAN PER BULAN'],
          data: REKAP_IZIN_PEMASUKAN_BULANAN,
          themeColor: '#1F4E79', // Navy
          badgeText: 'Pemasukan (Inbound)',
          icon: <ArrowDownToLine className="w-3.5 h-3.5 text-blue-600" />,
        };
      case 'pengeluaran':
        return {
          datasetNumber: 7,
          pdfPages: 'Hal. 9',
          title: 'REKAPITULASI PENERBITAN LAYANAN PERIZINAN PENGELUARAN BARANG',
          visualName: 'Visual Bar Chart & Tren Jumlah Penerbitan Izin Pengeluaran Barang per Bulan',
          attributes: ['URAIAN IZIN PENGELUARAN BARANG', 'JUMLAH PENERBITAN PER BULAN'],
          data: REKAP_IZIN_PENGELUARAN_BULANAN,
          themeColor: '#2E75B6', // Accent Blue
          badgeText: 'Pengeluaran (Outbound)',
          icon: <ArrowUpFromLine className="w-3.5 h-3.5 text-sky-600" />,
        };
      case 'konsolidasi':
      default:
        return {
          datasetNumber: 4,
          pdfPages: 'Hal. 9 (DS 4, 6, 7)',
          title: 'KONSOLIDASI TREN BULANAN PENERBITAN IZIN KAWASAN, PEMASUKAN & PENGELUARAN BARANG',
          visualName: 'Multi-Series Line & Bar Chart Komparasi 3 Alur Pelayanan Barang Bulanan',
          attributes: ['URAIAN IZIN', 'BULAN', 'JUMLAH PENERBITAN PER BULAN'],
          data: [],
          themeColor: '#4F46E5', // Indigo
          badgeText: 'Konsolidasi 3 Arus',
          icon: <Layers className="w-3.5 h-3.5 text-indigo-600" />,
        };
    }
  }, [activeSheet]);

  // Aggregations for Active Sheet
  const activeDataset = currentSheetMeta.data;

  const totalTahunanAktif = useMemo(() => {
    return activeDataset.reduce((acc, curr) => acc + curr.totalTahunan, 0);
  }, [activeDataset]);

  const rataRataPerBulan = useMemo(() => {
    return Math.round((totalTahunanAktif / 12) * 10) / 10;
  }, [totalTahunanAktif]);

  // Monthly totals for current active dataset
  const bulananTotals = useMemo(() => {
    const totals: { [bulan: string]: number } = {};
    BULAN_LIST.forEach((b) => {
      totals[b] = activeDataset.reduce((acc, curr) => acc + (curr.bulanan[b] || 0), 0);
    });
    return totals;
  }, [activeDataset]);

  const maxBulanTotal = useMemo(() => {
    const values = Object.values(bulananTotals) as number[];
    return Math.max(...values, 1);
  }, [bulananTotals]);

  // Consolidation dataset calculations
  const konsolidasiBulanan = useMemo(() => {
    return BULAN_LIST.map((bulan, idx) => {
      const iuk = REKAP_IZIN_USAHA_KAWASAN_BULANAN.reduce((acc, curr) => acc + curr.bulanan[bulan], 0);
      const pemasukan = REKAP_IZIN_PEMASUKAN_BULANAN.reduce((acc, curr) => acc + curr.bulanan[bulan], 0);
      const pengeluaran = REKAP_IZIN_PENGELUARAN_BULANAN.reduce((acc, curr) => acc + curr.bulanan[bulan], 0);
      return {
        bulan,
        bulanSingkat: BULAN_SHORT[idx],
        iuk,
        pemasukan,
        pengeluaran,
        total: iuk + pemasukan + pengeluaran,
      };
    });
  }, []);

  const totalIukTahun = useMemo(
    () => REKAP_IZIN_USAHA_KAWASAN_BULANAN.reduce((acc, curr) => acc + curr.totalTahunan, 0),
    []
  );
  const totalPemasukanTahun = useMemo(
    () => REKAP_IZIN_PEMASUKAN_BULANAN.reduce((acc, curr) => acc + curr.totalTahunan, 0),
    []
  );
  const totalPengeluaranTahun = useMemo(
    () => REKAP_IZIN_PENGELUARAN_BULANAN.reduce((acc, curr) => acc + curr.totalTahunan, 0),
    []
  );

  const exportCsv = () => {
    let csv = '';
    if (activeSheet === 'konsolidasi') {
      csv = 'Bulan,Izin Usaha Kawasan (SK),Izin Pemasukan Barang (SK),Izin Pengeluaran Barang (SK),Total Gabungan (SK)\n';
      konsolidasiBulanan.forEach((r) => {
        csv += `"${r.bulan}",${r.iuk},${r.pemasukan},${r.pengeluaran},${r.total}\n`;
      });
    } else {
      csv = `Uraian Izin,${BULAN_LIST.join(',')},Total Tahunan\n`;
      activeDataset.forEach((row) => {
        const monthCols = BULAN_LIST.map((b) => row.bulanan[b]).join(',');
        csv += `"${row.uraian}",${monthCols},${row.totalTahunan}\n`;
      });
    }
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rekap_bulanan_${activeSheet}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 mb-4 shadow-2xs">
      {/* 1. Standardized Visual Header */}
      <LlbVisualHeader
        datasetNumber={currentSheetMeta.datasetNumber}
        pdfPages={currentSheetMeta.pdfPages}
        classification="TERBUKA"
        periode="PERBULAN"
        title={currentSheetMeta.title}
        visualName={currentSheetMeta.visualName}
        visualIcon={currentSheetMeta.icon}
        attributes={currentSheetMeta.attributes}
        onOpenFormula={() => onOpenFormulaModal?.(`llb-${activeSheet}`)}
        rightControls={
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Chart vs Matrix Switcher */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
              <button
                onClick={() => setViewFormat('chart')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  viewFormat === 'chart'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3 h-3" />
                <span>Grafik Bulanan</span>
              </button>
              <button
                onClick={() => setViewFormat('matrix')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  viewFormat === 'matrix'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3 h-3" />
                <span>Matriks 12 Bulan</span>
              </button>
            </div>

            {/* Export CSV */}
            <button
              onClick={exportCsv}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Unduh Lembar Ini (CSV)"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        }
      />

      {/* 2. Sheet Swap Switcher Bar (Points 2, 3, 4, 6) */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80 mb-3.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
            <ArrowRightLeft className="w-3 h-3 text-[#1F4E79]" />
            Pilih Sheet Swap:
          </span>

          {/* Sheet 1: Kawasan */}
          <button
            onClick={() => setActiveSheet('kawasan')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSheet === 'kawasan'
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>Izin Usaha Kawasan (DS 4)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/15 font-mono">
              {totalIukTahun} SK
            </span>
          </button>

          {/* Sheet 2: Pemasukan */}
          <button
            onClick={() => setActiveSheet('pemasukan')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSheet === 'pemasukan'
                ? 'bg-[#1F4E79] text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ArrowDownToLine className="w-3 h-3" />
            <span>Pemasukan Barang (DS 6)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/15 font-mono">
              {totalPemasukanTahun} SK
            </span>
          </button>

          {/* Sheet 3: Pengeluaran */}
          <button
            onClick={() => setActiveSheet('pengeluaran')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSheet === 'pengeluaran'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ArrowUpFromLine className="w-3 h-3" />
            <span>Pengeluaran Barang (DS 7)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/15 font-mono">
              {totalPengeluaranTahun} SK
            </span>
          </button>

          {/* Sheet 4: Konsolidasi 3 Arus */}
          <button
            onClick={() => setActiveSheet('konsolidasi')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSheet === 'konsolidasi'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Komparasi 3 Arus</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/15 font-mono">
              {(totalIukTahun + totalPemasukanTahun + totalPengeluaranTahun).toLocaleString('id-ID')}
            </span>
          </button>
        </div>

        {/* Quick Month Filter for Detailed Breakdown */}
        {activeSheet !== 'konsolidasi' && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10.5px] text-slate-500 font-medium">Bulan Sorotan:</span>
            <select
              value={selectedBulan}
              onChange={(e) => setSelectedBulan(e.target.value)}
              className="text-[11px] font-semibold border border-slate-200 rounded px-2 py-0.5 bg-white text-slate-700"
            >
              <option value="ALL">Semua Bulan (Jan - Des)</option>
              {BULAN_LIST.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 3. ACTIVE SHEET CONTENT: SHEETS 1, 2, 3 (Kawasan, Pemasukan, Pengeluaran) */}
      {activeSheet !== 'konsolidasi' && (
        <div>
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wide">
                Total Penerbitan Tahunan
              </span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-black font-mono text-slate-900">
                  {totalTahunanAktif.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] font-bold text-slate-500">Dokumen SK</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wide">
                Rata-rata Penerbitan / Bulan
              </span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-black font-mono text-[#1F4E79]">
                  {rataRataPerBulan}
                </span>
                <span className="text-[11px] font-bold text-slate-500">SK / Bulan</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wide">
                Jumlah Uraian Layanan Terdaftar
              </span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-black font-mono text-emerald-700">
                  {activeDataset.length}
                </span>
                <span className="text-[11px] font-bold text-slate-500">Kategori Uraian Izin</span>
              </div>
            </div>
          </div>

          {/* VIEW 1: MONTHLY BAR & TREND CHART */}
          {viewFormat === 'chart' && (
            <div className="space-y-4">
              {/* Monthly Overview Column Bars (Jan - Des) */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40">
                <div className="flex items-center justify-between mb-3 text-[11px]">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#1F4E79]" />
                    Distribusi Jumlah Penerbitan per Bulan (Januari s/d Desember)
                  </span>
                  <span className="text-slate-400 font-mono text-[10.5px]">
                    Satuan: Dokumen SK
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-1.5 items-end h-32 pt-2 pb-1 border-b border-slate-200">
                  {BULAN_LIST.map((bulan, idx) => {
                    const total = bulananTotals[bulan] || 0;
                    const heightPct = Math.max((total / maxBulanTotal) * 100, 8);
                    const isHighlighted = selectedBulan === 'ALL' || selectedBulan === bulan;

                    return (
                      <div
                        key={bulan}
                        className={`flex flex-col items-center gap-1 group cursor-pointer ${
                          !isHighlighted ? 'opacity-35' : ''
                        }`}
                        onClick={() => setSelectedBulan(bulan)}
                      >
                        <span className="text-[9.5px] font-bold font-mono text-slate-700 group-hover:text-blue-600">
                          {total}
                        </span>
                        <div className="w-full bg-slate-200 h-20 rounded-t flex items-end overflow-hidden">
                          <div
                            className="w-full rounded-t transition-all duration-300"
                            style={{
                              height: `${heightPct}%`,
                              backgroundColor: currentSheetMeta.themeColor,
                            }}
                          />
                        </div>
                        <span className="text-[9.5px] font-bold text-slate-600 truncate w-full text-center">
                          {BULAN_SHORT[idx]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Breakdown per Uraian Izin Card list */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Rincian Uraian Izin &amp; Capaian per Bulan:
                </div>
                {activeDataset.map((item, idx) => {
                  const values = Object.values(item.bulanan) as number[];
                  const maxRowMonth = Math.max(...values, 1);
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-2xs transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold font-mono flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {item.uraian}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {item.kategori}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1 shrink-0">
                          <span className="text-xs font-black font-mono text-slate-900">
                            {item.totalTahunan}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 font-mono">
                            SK / Tahun
                          </span>
                        </div>
                      </div>

                      {/* 12 Monthly Spark-Bars */}
                      <div className="grid grid-cols-12 gap-1 items-end pt-1">
                        {BULAN_LIST.map((bulan, bIdx) => {
                          const val = item.bulanan[bulan] || 0;
                          const barH = Math.max((val / maxRowMonth) * 100, 10);
                          const isMatch = selectedBulan === 'ALL' || selectedBulan === bulan;

                          return (
                            <div
                              key={bulan}
                              className={`flex flex-col items-center gap-0.5 ${
                                !isMatch ? 'opacity-30' : ''
                              }`}
                              title={`${bulan}: ${val} SK`}
                            >
                              <div className="w-full bg-slate-100 h-6 rounded-xs flex items-end">
                                <div
                                  className="w-full rounded-xs transition-all"
                                  style={{
                                    height: `${barH}%`,
                                    backgroundColor: currentSheetMeta.themeColor,
                                  }}
                                />
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">
                                {val}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 2: FULL 12-MONTH MATRIX TABLE */}
          {viewFormat === 'matrix' && (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-3 py-2 min-w-[220px]">Uraian Izin Usaha / Layanan</th>
                    <th className="px-2 py-2 text-center">Kategori</th>
                    {BULAN_SHORT.map((b) => (
                      <th key={b} className="px-2 py-2 text-right font-mono">
                        {b}
                      </th>
                    ))}
                    <th className="px-3 py-2 text-right font-mono bg-slate-200/80">Total SK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {activeDataset.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2 font-semibold text-slate-900">{row.uraian}</td>
                      <td className="px-2 py-2 text-center">
                        <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono border border-slate-200">
                          {row.kategori}
                        </span>
                      </td>
                      {BULAN_LIST.map((b) => (
                        <td key={b} className="px-2 py-2 text-right font-mono text-slate-700">
                          {row.bulanan[b]}
                        </td>
                      ))}
                      <td className="px-3 py-2 text-right font-mono font-black text-[#1F4E79] bg-slate-50">
                        {row.totalTahunan}
                      </td>
                    </tr>
                  ))}
                  {/* Total Summary Row */}
                  <tr className="bg-slate-100/80 font-bold border-t-2 border-slate-300">
                    <td className="px-3 py-2 text-slate-900" colSpan={2}>
                      TOTAL KESELURUHAN PENERBITAN
                    </td>
                    {BULAN_LIST.map((b) => (
                      <td key={b} className="px-2 py-2 text-right font-mono text-slate-900">
                        {bulananTotals[b]}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-mono text-base font-black text-slate-900 bg-slate-200/90">
                      {totalTahunanAktif}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 4. ACTIVE SHEET CONTENT: SHEET 4 (Konsolidasi 3 Arus) */}
      {activeSheet === 'konsolidasi' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                  Perbandingan 3 Alur Pelayanan Barang Bulanan
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Menampilkan komparasi dinamika Izin Usaha Kawasan (IUK), Perizinan Pemasukan (Inbound), dan Pengeluaran (Outbound)
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                  <span>Kawasan ({totalIukTahun})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1F4E79]" />
                  <span>Pemasukan ({totalPemasukanTahun})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  <span>Pengeluaran ({totalPengeluaranTahun})</span>
                </div>
              </div>
            </div>

            {/* Visual Stacked Columns */}
            <div className="grid grid-cols-12 gap-1.5 items-end h-36 pt-3 pb-1 border-b border-indigo-200">
              {konsolidasiBulanan.map((item) => {
                const maxConsol = 260; // Max expected per month
                const iukH = (item.iuk / maxConsol) * 100;
                const inH = (item.pemasukan / maxConsol) * 100;
                const outH = (item.pengeluaran / maxConsol) * 100;

                return (
                  <div key={item.bulan} className="flex flex-col items-center gap-1 group">
                    <span className="text-[9px] font-bold font-mono text-slate-700">
                      {item.total}
                    </span>
                    <div className="w-full bg-slate-200 h-24 rounded-t flex flex-col-reverse overflow-hidden">
                      <div style={{ height: `${iukH}%` }} className="bg-teal-600 w-full" title={`Kawasan: ${item.iuk}`} />
                      <div style={{ height: `${outH}%` }} className="bg-sky-500 w-full" title={`Pengeluaran: ${item.pengeluaran}`} />
                      <div style={{ height: `${inH}%` }} className="bg-[#1F4E79] w-full" title={`Pemasukan: ${item.pemasukan}`} />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-600 truncate w-full text-center">
                      {item.bulanSingkat}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-3 py-2">Bulan</th>
                  <th className="px-3 py-2 text-right font-mono">Izin Usaha Kawasan (SK)</th>
                  <th className="px-3 py-2 text-right font-mono">Izin Pemasukan (SK)</th>
                  <th className="px-3 py-2 text-right font-mono">Izin Pengeluaran (SK)</th>
                  <th className="px-3 py-2 text-right font-mono bg-slate-200/80">Total Bulanan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {konsolidasiBulanan.map((row) => (
                  <tr key={row.bulan} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-2 font-bold text-slate-900">{row.bulan}</td>
                    <td className="px-3 py-2 text-right font-mono text-teal-800 font-semibold">{row.iuk}</td>
                    <td className="px-3 py-2 text-right font-mono text-[#1F4E79] font-semibold">{row.pemasukan}</td>
                    <td className="px-3 py-2 text-right font-mono text-sky-700 font-semibold">{row.pengeluaran}</td>
                    <td className="px-3 py-2 text-right font-mono font-black text-slate-900 bg-slate-50">
                      {row.total} SK
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
