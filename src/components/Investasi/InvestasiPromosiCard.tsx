import React, { useState, useMemo } from 'react';
import {
  Megaphone,
  BarChart3,
  Table as TableIcon,
  ExternalLink,
  Download,
  Users,
  Calendar,
  Layers,
} from 'lucide-react';
import { KEGIATAN_PROMOSI_DATA } from '../../data/investasiData';
import { TableauShelvesBadge } from '../TableauShelvesBadge';
import { InvestasiVisualHeader } from './InvestasiVisualHeader';

interface InvestasiPromosiCardProps {
  onOpenFormulaModal: (formulaId: string) => void;
}

export const InvestasiPromosiCard: React.FC<InvestasiPromosiCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'grouped-bar' | 'crosstab'>('grouped-bar');

  // Agregasi MURNI Matriks Kategori: Kategori, Jumlah Tamu, dan Jumlah Pelaksanaan
  const categoryMatrix = useMemo(() => {
    const map = new Map<
      string,
      {
        kategori: string;
        jumlahPelaksanaan: number;
        jumlahTamu: number;
      }
    >();

    KEGIATAN_PROMOSI_DATA.forEach((item) => {
      const current = map.get(item.kategori) || {
        kategori: item.kategori,
        jumlahPelaksanaan: 0,
        jumlahTamu: 0,
      };

      current.jumlahPelaksanaan += item.jumlahPelaksanaan;
      current.jumlahTamu += item.jumlahTamu;

      map.set(item.kategori, current);
    });

    const arr = Array.from(map.values());
    // Urutkan berdasarkan Jumlah Tamu tertinggi (Tableau Sort Descending)
    arr.sort((a, b) => b.jumlahTamu - a.jumlahTamu);
    return arr;
  }, []);

  const grandTotalTamu = useMemo(() => {
    return categoryMatrix.reduce((sum, item) => sum + item.jumlahTamu, 0);
  }, [categoryMatrix]);

  const grandTotalPelaksanaan = useMemo(() => {
    return categoryMatrix.reduce((sum, item) => sum + item.jumlahPelaksanaan, 0);
  }, [categoryMatrix]);

  const maxTamu = useMemo(() => {
    return Math.max(...categoryMatrix.map((c) => c.jumlahTamu), 1);
  }, [categoryMatrix]);

  const maxPelaksanaan = useMemo(() => {
    return Math.max(...categoryMatrix.map((c) => c.jumlahPelaksanaan), 1);
  }, [categoryMatrix]);

  // Ekspor CSV Matriks Kategori
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'No,Kategori Kegiatan,Jumlah Pelaksanaan (Kali),Jumlah Tamu / Delegasi (Orang),% Kontribusi Tamu\n';
    categoryMatrix.forEach((r, idx) => {
      const pct = ((r.jumlahTamu / grandTotalTamu) * 100).toFixed(1);
      csvContent += `${idx + 1},"${r.kategori}",${r.jumlahPelaksanaan},${r.jumlahTamu},${pct}%\n`;
    });
    csvContent += `Total,Semua Kategori,${grandTotalPelaksanaan},${grandTotalTamu},100.0%\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `matriks_kategori_kegiatan_promosi_investasi.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id="investasi-promosi-card"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden p-3.5 sm:p-4 font-sans"
    >
      {/* 1. Header Visualisasi Standar Pembangunan Infrastruktur */}
      <InvestasiVisualHeader
        datasetNumber={11}
        pdfPages="Hal. 48"
        classification="TERTUTUP"
        periode="PERTAHUN"
        title="TENTATIF KEGIATAN PROMOSI: MATRIKS KATEGORI"
        visualName="Grafik Batang Ganda Berdampingan Tamu vs Pelaksanaan Kegiatan (Side-by-Side Bar Chart & Crosstab)"
        attributes={[
          'TAHUN',
          'KATEGORI KEGIATAN',
          'NAMA KEGIATAN',
          'NAMA PENYELENGGARA',
          'TANGGAL PELAKSANAAN',
          'JUMLAH TAMU/JUMLAH PELAKSANAAN KEGIATAN',
        ]}
        onOpenFormula={() => onOpenFormulaModal('kpi_investasi_promosi')}
        rightControls={
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex items-center text-xs font-semibold">
              <button
                onClick={() => setViewMode('grouped-bar')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                  viewMode === 'grouped-bar'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
                <span>Side-by-Side Bar</span>
              </button>
              <button
                onClick={() => setViewMode('crosstab')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                  viewMode === 'crosstab'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5 text-purple-600" />
                <span>Tabel Matriks</span>
              </button>
            </div>

            <button
              onClick={handleExportCsv}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
              title="Unduh Data CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">CSV</span>
            </button>
          </div>
        }
      />

      {/* 2. Tableau Shelves Guide Badge */}
      <div className="px-4 py-2 bg-purple-50/20 border-b border-slate-200">
        <TableauShelvesBadge
          showMe="Side-by-Side Horizontal Bar / Text Table (Crosstab)"
          rows="[Kategori Kegiatan]"
          columns="Measure Values (SUM([Jumlah Tamu]), SUM([Jumlah Pelaksanaan]))"
          marks="Bar (Color: Measure Names — Ungu: Tamu, Biru: Pelaksanaan)"
          filters="[Tahun] = 2025"
        />
      </div>

      {/* 3. Ringkasan Eksekutif Matriks */}
      <div className="px-4 py-3 bg-purple-50/30 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10.5px] font-medium text-slate-500 block">Total Tamu / Delegasi</span>
            <span className="text-sm font-black font-mono text-purple-900">
              {grandTotalTamu.toLocaleString('id-ID')} Orang
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10.5px] font-medium text-slate-500 block">Total Pelaksanaan Kegiatan</span>
            <span className="text-sm font-black font-mono text-blue-900">
              {grandTotalPelaksanaan} Kali Sesi
            </span>
          </div>
        </div>
      </div>

      {/* 4. VISUALISASI UTAMA: MATRIKS KATEGORI (TABLEAU APPLICABLE) */}
      <div className="p-4 sm:p-5">
        {viewMode === 'grouped-bar' ? (
          /* OPSI 1: TABLEAU SIDE-BY-SIDE HORIZONTAL BAR CHART */
          <div className="space-y-4">
            {/* Chart Legend (Tableau Measure Names) */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
                Kategori Kegiatan (Rows)
              </span>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-purple-600" />
                  <span className="font-bold text-slate-800">Jumlah Tamu (Orang)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-blue-600" />
                  <span className="font-bold text-slate-800">Jumlah Pelaksanaan (Kali)</span>
                </div>
              </div>
            </div>

            {/* List of categories with paired horizontal bars */}
            <div className="space-y-3.5">
              {categoryMatrix.map((item, idx) => {
                const tamuPct = Math.round((item.jumlahTamu / maxTamu) * 100);
                const pelaksanaanPct = Math.round((item.jumlahPelaksanaan / maxPelaksanaan) * 100);
                const avgTamu = Math.round(item.jumlahTamu / item.jumlahPelaksanaan);

                return (
                  <div
                    key={item.kategori}
                    className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 transition-all"
                  >
                    {/* Header baris: Nama Kategori */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10.5px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {item.kategori}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {item.jumlahPelaksanaan} Sesi Kegiatan
                      </span>
                    </div>

                    {/* Dual Bars Container (Slim Bars) */}
                    <div className="space-y-1">
                      {/* Bar 1: Jumlah Tamu (Orang) */}
                      <div className="flex items-center gap-2">
                        <span className="w-18 text-[10px] text-purple-700 font-semibold shrink-0">
                          Tamu
                        </span>
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-purple-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(4, tamuPct)}%` }}
                          />
                        </div>
                        <span className="w-20 text-right font-mono text-[11px] font-bold text-purple-900 shrink-0">
                          {item.jumlahTamu.toLocaleString('id-ID')} Org
                        </span>
                      </div>

                      {/* Bar 2: Jumlah Pelaksanaan (Kali) */}
                      <div className="flex items-center gap-2">
                        <span className="w-18 text-[10px] text-blue-700 font-semibold shrink-0">
                          Pelaksanaan
                        </span>
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(4, pelaksanaanPct)}%` }}
                          />
                        </div>
                        <span className="w-20 text-right font-mono text-[11px] font-bold text-blue-900 shrink-0">
                          {item.jumlahPelaksanaan} Sesi
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* OPSI 2: TABLEAU MATRIKS CROSSTAB (HIGHLIGHT TABLE) */
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs font-sans text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3 w-12 text-center">No</th>
                  <th className="py-2.5 px-4">Kategori Kegiatan</th>
                  <th className="py-2.5 px-4 text-right">Jumlah Pelaksanaan</th>
                  <th className="py-2.5 px-4 text-right">Jumlah Tamu / Delegasi</th>
                  <th className="py-2.5 px-4 text-right">% Kontribusi Tamu</th>
                  <th className="py-2.5 px-4 w-40 text-center">Intensitas Tamu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categoryMatrix.map((item, idx) => {
                  const percentage = ((item.jumlahTamu / grandTotalTamu) * 100).toFixed(1);
                  const barWidth = Math.round((item.jumlahTamu / maxTamu) * 100);

                  return (
                    <tr key={item.kategori} className="hover:bg-purple-50/30 transition-colors">
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {item.kategori}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-blue-800">
                        {item.jumlahPelaksanaan} Kali
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-black text-purple-800">
                        {item.jumlahTamu.toLocaleString('id-ID')} Orang
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold text-slate-700">
                        {percentage}%
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-purple-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="py-3 px-3 text-center font-mono">-</td>
                  <td className="py-3 px-4 font-black">TOTAL KESELURUHAN</td>
                  <td className="py-3 px-4 text-right font-mono font-black text-blue-900">
                    {grandTotalPelaksanaan} Kali
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-black text-purple-900">
                    {grandTotalTamu.toLocaleString('id-ID')} Orang
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-black">
                    100,0%
                  </td>
                  <td className="py-3 px-4 text-center text-[10px] text-slate-500 font-mono">
                    100% Tercakup
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* 5. Footer Info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 font-mono gap-1">
        <span>
          Matriks Kategori Kegiatan Promosi: [Kategori Kegiatan], [Jumlah Pelaksanaan], [Jumlah Tamu]
        </span>
        <span className="text-[11px] text-slate-400 font-sans">
          Format Visual: Tableau Side-by-Side Bar &amp; Crosstab Matrix
        </span>
      </div>
    </div>
  );
};
