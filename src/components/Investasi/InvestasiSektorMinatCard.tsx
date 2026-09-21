import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  BarChart3,
  Table as TableIcon,
  ExternalLink,
  Download,
  Award,
} from 'lucide-react';
import { MinatInvestasiItem } from '../../data/investasiData';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface InvestasiSektorMinatCardProps {
  minatList: MinatInvestasiItem[];
  onOpenFormulaModal: (formulaId: string) => void;
}

export const InvestasiSektorMinatCard: React.FC<InvestasiSektorMinatCardProps> = ({
  minatList,
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'crosstab'>('chart');

  // Agregasi MURNI HANYA: Sektor dan Jumlah Minat
  const sektorRanking = useMemo(() => {
    const counts: Record<string, number> = {};

    minatList.forEach((item) => {
      counts[item.sektor] = (counts[item.sektor] || 0) + 1;
    });

    const entries = Object.entries(counts).map(([sektor, jumlahMinat]) => ({
      sektor,
      jumlahMinat,
    }));

    // Urutkan menurun dari jumlah minat terbanyak (Tableau Sort Descending)
    entries.sort((a, b) => b.jumlahMinat - a.jumlahMinat);
    return entries;
  }, [minatList]);

  const grandTotalMinat = useMemo(() => {
    return sektorRanking.reduce((sum, s) => sum + s.jumlahMinat, 0);
  }, [sektorRanking]);

  const maxMinat = useMemo(() => {
    return Math.max(...sektorRanking.map((s) => s.jumlahMinat), 1);
  }, [sektorRanking]);

  // Ekspor CSV ringkasan murni Sektor dan Jumlah Minat
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Peringkat,Sektor Industri,Jumlah Minat Investasi (LoI),Persentase Kontribusi\n';
    sektorRanking.forEach((item, idx) => {
      const pct = ((item.jumlahMinat / grandTotalMinat) * 100).toFixed(1);
      csvContent += `${idx + 1},"${item.sektor}",${item.jumlahMinat},${pct}%\n`;
    });
    csvContent += `Total,Semua Sektor,${grandTotalMinat},100.0%\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `peringkat_sektor_minat_investasi_dataset14.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Warna gradasi biru Tableau untuk bar chart
  const getBarColor = (index: number) => {
    const colors = [
      '#1D4ED8', // Blue 700 (Rank 1)
      '#2563EB', // Blue 600
      '#3B82F6', // Blue 500
      '#60A5FA', // Blue 400
      '#4F46E5', // Indigo 600
      '#6366F1', // Indigo 500
      '#0284C7', // Sky 600
      '#0EA5E9', // Sky 500
      '#64748B', // Slate 500
    ];
    return colors[index % colors.length];
  };

  return (
    <div
      id="investasi-sektor-minat-card"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
    >
      {/* 1. Header Visualisasi */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100/70 border border-indigo-300/60 flex items-center justify-center text-indigo-800 shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                DATA MINAT INVESTASI BERDASARKAN SEKTOR
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 font-mono">
                Dataset No. 14 • Satu Data
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Peringkat sektor industri dan jumlah minat investasi (Letter of Intent / LoI)
            </p>
          </div>
        </div>

        {/* View Mode Switcher & Export */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="bg-slate-200/70 p-0.5 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                viewMode === 'chart'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Horizontal Bar</span>
            </button>
            <button
              onClick={() => setViewMode('crosstab')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                viewMode === 'crosstab'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Tabel Matriks</span>
            </button>
          </div>

          <button
            onClick={() => onOpenFormulaModal('kpi_investasi_minat')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Lihat Metadata Dataset 14"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            <span>Katalog</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Ekspor peringkat sektor ke CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor</span>
          </button>
        </div>
      </div>

      {/* 2. Tableau Shelf Guide Badge */}
      <div className="px-4 py-2 bg-indigo-50/20 border-b border-slate-200">
        <TableauShelvesBadge
          showMe="Horizontal Bar Chart (Peringkat Sektor)"
          rows="[Sektor] (Sorted Descending by SUM([Jumlah Minat]))"
          columns="SUM([Jumlah Minat])"
          marks="Bar (Color by SUM([Jumlah Minat]), Label: [Jumlah Minat] & % of Total)"
          filters="[Tahun] = 2025/2026"
        />
      </div>

      {/* 3. VISUALISASI UTAMA: HANYA SEKTOR DAN JUMLAH MINAT (SLIM BARS) */}
      <div className="p-3 sm:p-4">
        {viewMode === 'chart' ? (
          /* OPSI A: TABLEAU HORIZONTAL BAR CHART (SLIM COMPACT BARS) */
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-1.5 border-b border-slate-100 px-1">
              <span className="font-semibold uppercase tracking-wider text-[10.5px]">Sektor Industri (Rows)</span>
              <span className="font-semibold uppercase tracking-wider text-[10.5px]">Jumlah Minat & Pangsa (Columns)</span>
            </div>

            <div className="space-y-1">
              {sektorRanking.map((item, idx) => {
                const percentage = ((item.jumlahMinat / grandTotalMinat) * 100).toFixed(1);
                const barWidth = Math.round((item.jumlahMinat / maxMinat) * 100);
                const barColor = getBarColor(idx);

                return (
                  <div
                    key={item.sektor}
                    className="py-1.5 px-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all flex items-center gap-2.5 sm:gap-3"
                  >
                    {/* Sektor Label (Rows Shelf) */}
                    <div className="w-48 sm:w-56 shrink-0 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate" title={item.sektor}>
                        {item.sektor}
                      </span>
                    </div>

                    {/* Bar Visual (Columns Shelf) - SLIM THIN BAR */}
                    <div className="flex-1 flex items-center gap-2.5">
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.max(6, barWidth)}%`,
                            backgroundColor: barColor,
                          }}
                        />
                      </div>

                      {/* Right Tag: Minat & % */}
                      <div className="w-24 text-right shrink-0 font-mono">
                        <span className="text-xs font-bold text-slate-900">
                          {item.jumlahMinat} Minat
                        </span>
                        <span className="text-[10px] text-slate-400 ml-1">
                          ({percentage}%)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* OPSI B: TABLEAU CROSSTAB MATRIX */
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs font-sans text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3 w-16 text-center">Peringkat</th>
                  <th className="py-2.5 px-4">Sektor Industri</th>
                  <th className="py-2.5 px-4 text-right">Jumlah Minat Investasi (LoI)</th>
                  <th className="py-2.5 px-4 text-right">% Kontribusi</th>
                  <th className="py-2.5 px-4 w-48 text-center">Distribusi Batang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sektorRanking.map((item, idx) => {
                  const percentage = ((item.jumlahMinat / grandTotalMinat) * 100).toFixed(1);
                  const barWidth = Math.round((item.jumlahMinat / maxMinat) * 100);
                  const barColor = getBarColor(idx);

                  return (
                    <tr key={item.sektor} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">
                        {item.sektor}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-black text-indigo-700">
                        {item.jumlahMinat} Minat
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-semibold text-slate-700">
                        {percentage}%
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: barColor,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="py-2.5 px-3 text-center font-mono">-</td>
                  <td className="py-2.5 px-4 font-black">TOTAL KESELURUHAN</td>
                  <td className="py-2.5 px-4 text-right font-mono font-black text-indigo-800">
                    {grandTotalMinat} Minat
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-black">
                    100,0%
                  </td>
                  <td className="py-2.5 px-4 text-center text-[10px] text-slate-500 font-mono">
                    100% Tercakup
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 font-mono gap-1">
        <span>
          Dataset No. 14: Data Minat Investasi Berdasarkan Sektor (Kunjungan &amp; Pameran)
        </span>
        <span className="text-[11px] text-slate-400 font-sans">
          Format Visual: Sektor Industri &amp; Jumlah Minat (LoI)
        </span>
      </div>
    </div>
  );
};
