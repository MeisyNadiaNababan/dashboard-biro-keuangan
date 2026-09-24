import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  Table as TableIcon,
  Layers,
  Building2,
  CheckCircle2,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import {
  PNBP_COA_DETAILED_DATA,
  PNBP_PER_SATKER_SUMMARY,
  PnbpCoaItem,
} from '../../data/kepelabuhananData';
import { PelabuhanVisualHeader } from './PelabuhanVisualHeader';

interface PelabuhanPnbpCoaCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const PelabuhanPnbpCoaCard: React.FC<PelabuhanPnbpCoaCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [selectedSatkerFilter, setSelectedSatkerFilter] = useState<string>('ALL');

  // Filter data berdasarkan Satker
  const filteredData = useMemo(() => {
    if (selectedSatkerFilter === 'ALL') return PNBP_COA_DETAILED_DATA;
    return PNBP_COA_DETAILED_DATA.filter((item) =>
      item.terminalSatker.toLowerCase().includes(selectedSatkerFilter.toLowerCase())
    );
  }, [selectedSatkerFilter]);

  const totalRealisasi = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.jumlahRp, 0);
  }, [filteredData]);

  const totalTarget = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.targetRp, 0);
  }, [filteredData]);

  const persenCapaian = totalTarget > 0 ? Math.round((totalRealisasi / totalTarget) * 1000) / 10 : 0;

  const satkerOptions = [
    { id: 'ALL', label: 'Semua Terminal / Satker' },
    { id: 'Batu Ampar', label: 'Batu Ampar' },
    { id: 'Kabil', label: 'Kabil & Selat Riau' },
    { id: 'Batam Centre', label: 'Batam Centre' },
    { id: 'Sekupang', label: 'Sekupang' },
    { id: 'Telaga Punggur', label: 'Telaga Punggur' },
    { id: 'Harbour Bay', label: 'Harbour Bay & Nongsa' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs font-sans">
      {/* 1. STANDARDIZED VISUAL HEADER (REQ 9) */}
      <PelabuhanVisualHeader
        datasetNumber={3}
        pdfPages="Hal. 15"
        title="Realisasi Penerimaan Negara Bukan Pajak (PNBP) Kepelabuhanan"
        visualName="Grafik Batang Bertingkat & Matriks COA (Stacked Bar & Matrix Card)"
        classification="TERTUTUP"
        attributes={['COA (CHART OF ACOUNT)/ JENIS LAYANAN', 'TERMINAL/SATKER', 'JUMLAH']}
        rightControls={
          <div className="flex items-center gap-2">
            {/* Filter Satker */}
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 text-xs">
              <Filter className="w-3 h-3 text-slate-500" />
              <select
                value={selectedSatkerFilter}
                onChange={(e) => setSelectedSatkerFilter(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
              >
                {satkerOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle Chart / Table */}
            <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('chart')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'chart'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Grafik Batang</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Tabel Matriks</span>
              </button>
            </div>
          </div>
        }
        onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('kpi-pnbp-pelabuhan')}
      />

      {/* 2. SUMMARY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Total Realisasi PNBP
          </span>
          <span className="text-base sm:text-lg font-black text-emerald-700 font-mono">
            Rp {(totalRealisasi / 1e9).toFixed(1)} Miliar
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Target Penetapan
          </span>
          <span className="text-base sm:text-lg font-black text-slate-700 font-mono">
            Rp {(totalTarget / 1e9).toFixed(1)} Miliar
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Persentase Capaian
          </span>
          <span className="text-base sm:text-lg font-black text-sky-700 font-mono">
            {persenCapaian}%
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Jumlah Rekening COA
          </span>
          <span className="text-base sm:text-lg font-black text-purple-700 font-mono">
            {filteredData.length} Akun Layanan
          </span>
        </div>
      </div>

      {/* 3. VISUAL DISPLAY: CHART OR TABLE */}
      {viewMode === 'chart' ? (
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-between mb-1">
            <span>Breakdown Capaian PNBP per COA &amp; Terminal/Satker</span>
            <span className="font-mono text-[10.5px] text-slate-400">Scrollable • {filteredData.length} Rekening</span>
          </div>

          {/* Scrollable Container so the card does not elongate vertically */}
          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1.5 divide-y divide-slate-100">
            {filteredData.map((item) => {
              const realisasiMiliar = item.jumlahRp / 1e9;
              const targetMiliar = item.targetRp / 1e9;
              const maxScale = 140; // Max baseline in billion IDR
              const barWidth = Math.min(100, (realisasiMiliar / maxScale) * 100);
              const targetMarkerPos = Math.min(100, (targetMiliar / maxScale) * 100);

              return (
                <div
                  key={item.coa}
                  className="p-2.5 rounded-lg border border-slate-200/90 bg-white hover:border-sky-300 hover:shadow-2xs transition-all pt-2.5 first:pt-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white font-mono text-[10px] font-bold">
                        COA {item.coa}
                      </span>
                      <span className="font-bold text-slate-900">{item.jenisLayanan}</span>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 text-[10.5px] font-semibold flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-sky-600" />
                        {item.terminalSatker}
                      </span>
                      <span className="font-mono font-bold text-emerald-700 text-xs">
                        Rp {realisasiMiliar.toFixed(1)} M
                      </span>
                      <span className="text-[10px] text-slate-500">
                        ({item.persen}%)
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar Container with Target Marker */}
                  <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-600 to-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                    {/* Target line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10"
                      style={{ left: `${targetMarkerPos}%` }}
                      title={`Target: Rp ${targetMiliar.toFixed(1)} M`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span className="truncate max-w-[70%] text-slate-500">{item.keterangan}</span>
                    <span className="font-mono">Target: Rp {targetMiliar.toFixed(1)} M</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* TABLE MATRIX VIEW */
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3">KODE COA</th>
                <th className="py-2.5 px-3">JENIS LAYANAN KEPELABUHANAN</th>
                <th className="py-2.5 px-3">TERMINAL / SATKER</th>
                <th className="py-2.5 px-3 text-right">JUMLAH REALISASI</th>
                <th className="py-2.5 px-3 text-right">TARGET DIPA</th>
                <th className="py-2.5 px-3 text-center">CAPAIAN (%)</th>
                <th className="py-2.5 px-3">KETERANGAN OPERASIONAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.map((row) => (
                <tr key={row.coa} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 font-mono font-bold text-sky-800 whitespace-nowrap">
                    {row.coa}
                  </td>
                  <td className="py-2 px-3 font-semibold text-slate-900">
                    {row.jenisLayanan}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium text-[11px]">
                      {row.terminalSatker}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                    Rp {row.jumlahRp.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-slate-600 whitespace-nowrap">
                    Rp {row.targetRp.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2 px-3 text-center font-mono font-bold whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10.5px] ${
                        row.persen >= 90
                          ? 'bg-emerald-100 text-emerald-800'
                          : row.persen >= 80
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {row.persen}%
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-500 text-[11px]">
                    {row.keterangan}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-300">
              <tr>
                <td colSpan={3} className="py-2.5 px-3 text-right uppercase tracking-wider text-[11px]">
                  Total Konsolidasi Realisasi:
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-800 text-xs">
                  Rp {totalRealisasi.toLocaleString('id-ID')}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-700 text-xs">
                  Rp {totalTarget.toLocaleString('id-ID')}
                </td>
                <td className="py-2.5 px-3 text-center font-mono text-sky-900 text-xs">
                  {persenCapaian}%
                </td>
                <td className="py-2.5 px-3 text-slate-500 text-[10.5px]">
                  Berdasarkan Buku Satu Data Hal. 15 No. 3
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
