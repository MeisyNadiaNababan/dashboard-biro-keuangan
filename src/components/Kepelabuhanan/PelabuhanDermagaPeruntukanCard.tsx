import React, { useState, useMemo } from 'react';
import {
  Anchor,
  Layers,
  MapPin,
  CheckCircle2,
  Box,
  Compass,
  Filter,
  BarChart3,
  Table as TableIcon,
  HelpCircle,
  Maximize2,
} from 'lucide-react';
import {
  DAFTAR_DERMAGA_DATA,
  DERMAGA_SUMMARY,
  DermagaItem,
} from '../../data/kepelabuhananData';
import { PelabuhanVisualHeader } from './PelabuhanVisualHeader';

interface PelabuhanDermagaPeruntukanCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const PelabuhanDermagaPeruntukanCard: React.FC<PelabuhanDermagaPeruntukanCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'stacked-chart' | 'catalog-table'>('stacked-chart');
  const [selectedPeruntukan, setSelectedPeruntukan] = useState<string>('ALL');
  const [selectedPelabuhan, setSelectedPelabuhan] = useState<string>('ALL');

  // Aggregated data per Pelabuhan & Peruntukan
  const peruntukanList = ['Peti Kemas', 'Kargo Umum', 'Curah Cair', 'Curah Kering', 'Penumpang Feri', 'Roro'];

  const pelabuhanList = useMemo(() => {
    const setP = new Set(DAFTAR_DERMAGA_DATA.map((d) => d.pelabuhan));
    return Array.from(setP);
  }, []);

  const filteredDermaga = useMemo(() => {
    return DAFTAR_DERMAGA_DATA.filter((d) => {
      const matchPeruntukan = selectedPeruntukan === 'ALL' || d.peruntukan === selectedPeruntukan;
      const matchPelabuhan = selectedPelabuhan === 'ALL' || d.pelabuhan === selectedPelabuhan;
      return matchPeruntukan && matchPelabuhan;
    });
  }, [selectedPeruntukan, selectedPelabuhan]);

  // Matrix of Pelabuhan vs Peruntukan
  const matrixData = useMemo(() => {
    return pelabuhanList.map((pel) => {
      const dermagas = DAFTAR_DERMAGA_DATA.filter((d) => d.pelabuhan === pel);
      const peruntukanCounts: Record<string, number> = {};
      let totalPanjang = 0;
      let maxDepth = 0;

      peruntukanList.forEach((p) => {
        peruntukanCounts[p] = 0;
      });

      dermagas.forEach((d) => {
        peruntukanCounts[d.peruntukan] = (peruntukanCounts[d.peruntukan] || 0) + 1;
        totalPanjang += d.panjangM;
        if (d.kedalamanMlws > maxDepth) maxDepth = d.kedalamanMlws;
      });

      return {
        pelabuhan: pel,
        totalDermaga: dermagas.length,
        totalPanjang,
        maxDepth,
        peruntukanCounts,
        dermagas,
      };
    });
  }, [pelabuhanList]);

  const getPeruntukanColor = (peruntukan: string) => {
    switch (peruntukan) {
      case 'Peti Kemas':
        return 'bg-blue-600 text-white';
      case 'Kargo Umum':
        return 'bg-cyan-600 text-white';
      case 'Curah Cair':
        return 'bg-amber-600 text-white';
      case 'Curah Kering':
        return 'bg-orange-600 text-white';
      case 'Penumpang Feri':
        return 'bg-emerald-600 text-white';
      case 'Roro':
        return 'bg-indigo-600 text-white';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  const getPeruntukanBadge = (peruntukan: string) => {
    switch (peruntukan) {
      case 'Peti Kemas':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Kargo Umum':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      case 'Curah Cair':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Curah Kering':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'Penumpang Feri':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Roro':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs font-sans">
      {/* 1. STANDARDIZED VISUAL HEADER (REQ 9) */}
      <PelabuhanVisualHeader
        datasetNumber={4}
        pdfPages="Hal. 15"
        title="Daftar Dermaga yang Dikelola BP Batam"
        visualName="Grafik Distribusi Peruntukan Dermaga (Stacked Bar Chart) & Katalog Fasilitas"
        classification="TERBUKA"
        attributes={['PELABUHAN', 'PERUNTUKAN']}
        rightControls={
          <div className="flex items-center gap-2">
            {/* Filter Peruntukan */}
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 text-xs">
              <Filter className="w-3 h-3 text-slate-500" />
              <select
                value={selectedPeruntukan}
                onChange={(e) => setSelectedPeruntukan(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
              >
                <option value="ALL">Semua Peruntukan</option>
                {peruntukanList.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle View */}
            <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('stacked-chart')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'stacked-chart'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Grafik Distribusi</span>
              </button>
              <button
                onClick={() => setViewMode('catalog-table')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'catalog-table'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Tabel Dermaga</span>
              </button>
            </div>
          </div>
        }
        onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('kpi-dermaga-pelabuhan')}
      />

      {/* 2. SUMMARY ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Total Fasilitas Dermaga
          </span>
          <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
            {DERMAGA_SUMMARY.totalDermaga} Dermaga Aktif
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Gugus Pelabuhan
          </span>
          <span className="text-base sm:text-lg font-black text-sky-700 font-mono">
            {pelabuhanList.length} Pelabuhan
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Kedalaman Maksimum
          </span>
          <span className="text-base sm:text-lg font-black text-indigo-700 font-mono">
            -{DERMAGA_SUMMARY.kedalamanMaksimumMlws} MLWS
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Rata-rata BOR
          </span>
          <span className="text-base sm:text-lg font-black text-emerald-700 font-mono">
            {DERMAGA_SUMMARY.rataRataBorPersen}% (Optimal)
          </span>
        </div>
      </div>

      {/* 3. VISUAL DISPLAY */}
      {viewMode === 'stacked-chart' ? (
        <div className="space-y-4">
          {/* Legend Peruntukan */}
          <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-slate-100/70 border border-slate-200 text-xs">
            <span className="text-[11px] font-bold text-slate-600 mr-1">Legenda Peruntukan:</span>
            {peruntukanList.map((p) => (
              <span
                key={p}
                className={`text-[10.5px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${getPeruntukanBadge(
                  p
                )}`}
              >
                <span className={`w-2 h-2 rounded-full ${getPeruntukanColor(p)}`} />
                {p}
              </span>
            ))}
          </div>

          {/* Stacked Bars per Pelabuhan */}
          <div className="space-y-3">
            {matrixData.map((row) => (
              <div
                key={row.pelabuhan}
                className="p-3 rounded-lg border border-slate-200/90 bg-white hover:border-sky-300 hover:shadow-2xs transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{row.pelabuhan}</span>
                    <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 text-[10.5px] font-mono font-bold">
                      {row.totalDermaga} Dermaga
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span>Panjang: {row.totalPanjang} m</span>
                    <span>•</span>
                    <span className="text-indigo-700 font-bold">Max Draft: -{row.maxDepth} MLWS</span>
                  </div>
                </div>

                {/* Stacked Bar */}
                <div className="w-full h-5 bg-slate-100 rounded-md overflow-hidden flex">
                  {peruntukanList.map((p) => {
                    const count = row.peruntukanCounts[p] || 0;
                    if (count === 0) return null;
                    const widthPercent = (count / row.totalDermaga) * 100;
                    return (
                      <div
                        key={p}
                        className={`${getPeruntukanColor(
                          p
                        )} h-full flex items-center justify-center text-[10px] font-bold transition-all px-1`}
                        style={{ width: `${widthPercent}%` }}
                        title={`${row.pelabuhan} - Peruntukan: ${p} (${count} Dermaga, ${widthPercent.toFixed(0)}%)`}
                      >
                        {count > 0 && <span>{p} ({count})</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Tags of Dermaga names */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {row.dermagas.map((d) => (
                    <span
                      key={d.id}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200 font-sans"
                    >
                      <strong>{d.dermaga}</strong>: {d.peruntukan} ({d.panjangM}m, -{d.kedalamanMlws}m)
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* TABLE OF DERMAGA */
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3">NO</th>
                <th className="py-2.5 px-3">PELABUHAN</th>
                <th className="py-2.5 px-3">NAMA DERMAGA</th>
                <th className="py-2.5 px-3">PERUNTUKAN</th>
                <th className="py-2.5 px-3 text-right">KEDALAMAN (MLWS)</th>
                <th className="py-2.5 px-3 text-right">PANJANG (M)</th>
                <th className="py-2.5 px-3 text-right">LEBAR (M2)</th>
                <th className="py-2.5 px-3 text-right">KAPASITAS (TOP M2)</th>
                <th className="py-2.5 px-3 text-center">BOR (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDermaga.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 font-mono text-slate-500">{idx + 1}</td>
                  <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">
                    {item.pelabuhan}
                  </td>
                  <td className="py-2 px-3 font-semibold text-slate-800">
                    {item.dermaga}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPeruntukanBadge(
                        item.peruntukan
                      )}`}
                    >
                      {item.peruntukan}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-indigo-700 font-bold whitespace-nowrap">
                    -{item.kedalamanMlws.toFixed(1)} m
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-slate-800 whitespace-nowrap">
                    {item.panjangM} m
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-slate-600 whitespace-nowrap">
                    {item.lebarM2.toLocaleString('id-ID')} m²
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-slate-600 whitespace-nowrap">
                    {item.kapasitasTopM2.toLocaleString('id-ID')} m²
                  </td>
                  <td className="py-2 px-3 text-center font-mono font-bold whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10.5px] ${
                        item.berthOccupancyRatio >= 70
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.berthOccupancyRatio}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
