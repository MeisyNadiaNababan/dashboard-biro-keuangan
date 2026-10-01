import React, { useMemo } from 'react';
import {
  Layers,
  Table as TableIcon,
  Download,
} from 'lucide-react';
import {
  REKAP_IZIN_USAHA_KAWASAN_BULANAN,
  REKAP_IZIN_PEMASUKAN_BULANAN,
  REKAP_IZIN_PENGELUARAN_BULANAN,
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
  // Aggregations
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

  const grandTotalSk = totalIukTahun + totalPemasukanTahun + totalPengeluaranTahun;

  // Consolidation dataset calculations per month
  const konsolidasiBulanan = useMemo(() => {
    return BULAN_LIST.map((bulan, idx) => {
      const iuk = REKAP_IZIN_USAHA_KAWASAN_BULANAN.reduce((acc, curr) => acc + (curr.bulanan[bulan] || 0), 0);
      const pemasukan = REKAP_IZIN_PEMASUKAN_BULANAN.reduce((acc, curr) => acc + (curr.bulanan[bulan] || 0), 0);
      const pengeluaran = REKAP_IZIN_PENGELUARAN_BULANAN.reduce((acc, curr) => acc + (curr.bulanan[bulan] || 0), 0);
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

  // Combined Uraian Izin across 3 streams
  const daftarUraianIzin = useMemo(() => {
    const list: Array<{
      id: string;
      uraian: string;
      kategoriArus: 'Izin Usaha Kawasan' | 'Pemasukan Barang' | 'Pengeluaran Barang';
      subKategori: string;
      totalTahunan: number;
      porsi: number;
      badgeColor: string;
    }> = [];

    REKAP_IZIN_USAHA_KAWASAN_BULANAN.forEach((item) => {
      list.push({
        id: `iuk-${item.id}`,
        uraian: item.uraian,
        kategoriArus: 'Izin Usaha Kawasan',
        subKategori: item.kategori,
        totalTahunan: item.totalTahunan,
        porsi: Math.round((item.totalTahunan / grandTotalSk) * 1000) / 10,
        badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      });
    });

    REKAP_IZIN_PEMASUKAN_BULANAN.forEach((item) => {
      list.push({
        id: `in-${item.id}`,
        uraian: item.uraian,
        kategoriArus: 'Pemasukan Barang',
        subKategori: item.kategori,
        totalTahunan: item.totalTahunan,
        porsi: Math.round((item.totalTahunan / grandTotalSk) * 1000) / 10,
        badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
      });
    });

    REKAP_IZIN_PENGELUARAN_BULANAN.forEach((item) => {
      list.push({
        id: `out-${item.id}`,
        uraian: item.uraian,
        kategoriArus: 'Pengeluaran Barang',
        subKategori: item.kategori,
        totalTahunan: item.totalTahunan,
        porsi: Math.round((item.totalTahunan / grandTotalSk) * 1000) / 10,
        badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
      });
    });

    // Sort descending by total volume
    return list.sort((a, b) => b.totalTahunan - a.totalTahunan);
  }, [grandTotalSk]);

  const exportCsv = () => {
    let csv = 'No,Uraian Izin,Kelompok Arus,Kategori,Jumlah Keseluruhan (SK),Porsi (%)\n';
    daftarUraianIzin.forEach((r, idx) => {
      csv += `${idx + 1},"${r.uraian}","${r.kategoriArus}","${r.subKategori}",${r.totalTahunan},${r.porsi}%\n`;
    });
    csv += `TOTAL,"Total Keseluruhan Seluruh Izin","-","-",${grandTotalSk},100%\n`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'konsolidasi_uraian_izin_llb.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 mb-4 shadow-2xs font-sans">
      {/* 1. Standardized Visual Header */}
      <LlbVisualHeader
        datasetNumber={4}
        pdfPages="Hal. 9 (DS 4, 6, 7)"
        classification="TERBUKA"
        periode="PERBULAN"
        title="KONSOLIDASI TREN BULANAN PENERBITAN IZIN KAWASAN, PEMASUKAN & PENGELUARAN BARANG"
        visualName="Multi-Series Komparasi 3 Alur Pelayanan Barang Bulanan & Tabel Detail Uraian Izin"
        visualIcon={<Layers className="w-3.5 h-3.5 text-indigo-600" />}
        attributes={['URAIAN IZIN', 'KELOMPOK ARUS', 'JUMLAH KESELURUHAN PENERBITAN']}
        onOpenFormula={() => onOpenFormulaModal?.('llb-konsolidasi')}
        rightControls={
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={exportCsv}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Unduh Data Uraian Izin (CSV)"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        }
      />

      {/* 2. Quick Highlight Strip 3 Arus */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
        <div className="p-2.5 rounded-lg border border-teal-100 bg-teal-50/50">
          <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wide block">
            Izin Usaha Kawasan (DS 4)
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-base font-black font-mono text-teal-950">
              {totalIukTahun.toLocaleString('id-ID')}
            </span>
            <span className="text-[10.5px] font-bold text-teal-700 font-mono">
              ({((totalIukTahun / grandTotalSk) * 100).toFixed(1)}%)
            </span>
          </div>
          <span className="text-[9.5px] text-slate-500">IUK Pengembang &amp; Tenant</span>
        </div>

        <div className="p-2.5 rounded-lg border border-blue-100 bg-blue-50/50">
          <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wide block">
            Pemasukan Barang (DS 6)
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-base font-black font-mono text-blue-950">
              {totalPemasukanTahun.toLocaleString('id-ID')}
            </span>
            <span className="text-[10.5px] font-bold text-blue-800 font-mono">
              ({((totalPemasukanTahun / grandTotalSk) * 100).toFixed(1)}%)
            </span>
          </div>
          <span className="text-[9.5px] text-slate-500">Bahan Baku &amp; Mesin (Inbound)</span>
        </div>

        <div className="p-2.5 rounded-lg border border-sky-100 bg-sky-50/50">
          <span className="text-[10px] font-bold text-sky-900 uppercase tracking-wide block">
            Pengeluaran Barang (DS 7)
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-base font-black font-mono text-sky-950">
              {totalPengeluaranTahun.toLocaleString('id-ID')}
            </span>
            <span className="text-[10.5px] font-bold text-sky-800 font-mono">
              ({((totalPengeluaranTahun / grandTotalSk) * 100).toFixed(1)}%)
            </span>
          </div>
          <span className="text-[9.5px] text-slate-500">Hasil Produksi &amp; Scrap (Outbound)</span>
        </div>

        <div className="p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/60">
          <span className="text-[10px] font-bold text-indigo-950 uppercase tracking-wide block">
            Total Seluruh Dokumen SK
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-base font-black font-mono text-indigo-950">
              {grandTotalSk.toLocaleString('id-ID')}
            </span>
            <span className="text-[10.5px] font-bold text-indigo-700">SK</span>
          </div>
          <span className="text-[9.5px] text-slate-500">10 Uraian Layanan Terdaftar</span>
        </div>
      </div>

      {/* 3. KOMPARASI 3 ARUS BULANAN */}
      <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/30 mb-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
              Grafik Komparasi 3 Alur Pelayanan Barang Bulanan
            </h4>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Menampilkan komparasi dinamika Izin Usaha Kawasan (IUK), Perizinan Pemasukan (Inbound), dan Pengeluaran (Outbound) per bulan
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
            const maxConsol = 260; // Max scale per month
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

      {/* 4. TABEL DETAIL BERDASARKAN URAIAN IZIN & JUMLAH KESELURUHANNYA */}
      <div className="space-y-2">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-1.5">
            <TableIcon className="w-4 h-4 text-[#1F4E79]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Tabel Rincian Berdasarkan Uraian Izin &amp; Jumlah Keseluruhan (Tahunan)
            </h4>
          </div>
          <span className="text-[10.5px] font-mono text-indigo-900 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            Total {grandTotalSk.toLocaleString('id-ID')} Dokumen SK
          </span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200 font-mono">
              <tr>
                <th className="py-2.5 px-3 text-center w-10">No</th>
                <th className="py-2.5 px-3 min-w-[240px]">Uraian Izin Layanan</th>
                <th className="py-2.5 px-3">Kelompok Arus</th>
                <th className="py-2.5 px-3">Sub-Kategori</th>
                <th className="py-2.5 px-3 text-right">Jumlah Keseluruhan</th>
                <th className="py-2.5 px-3 text-right">Porsi (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {daftarUraianIzin.map((row, idx) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-400 font-bold">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {row.uraian}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${row.badgeColor}`}>
                      {row.kategoriArus}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 font-medium">
                    {row.subKategori}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                    {row.totalTahunan.toLocaleString('id-ID')} SK
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-[#1F4E79]">
                    {row.porsi}%
                  </td>
                </tr>
              ))}

              {/* Total Summary Row */}
              <tr className="bg-slate-100/90 font-bold text-slate-900 border-t-2 border-slate-300 font-mono text-xs">
                <td colSpan={4} className="py-2.5 px-3 text-right uppercase font-black text-slate-950">
                  Total Keseluruhan Seluruh Izin (Grand Total):
                </td>
                <td className="py-2.5 px-3 text-right font-black text-indigo-950 text-sm">
                  {grandTotalSk.toLocaleString('id-ID')} SK
                </td>
                <td className="py-2.5 px-3 text-right font-black text-emerald-800 text-sm">
                  100,0%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
