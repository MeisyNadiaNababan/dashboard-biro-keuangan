import React, { useState, useMemo } from 'react';
import {
  Users,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Table as TableIcon,
  Globe2,
  Filter,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import {
  PENUMPANG_PER_TERMINAL_DATA,
  PENUMPANG_REKAP_TOTAL,
} from '../../data/kepelabuhananData';
import { PelabuhanVisualHeader } from './PelabuhanVisualHeader';

interface PelabuhanPenumpangArusCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const PelabuhanPenumpangArusCard: React.FC<PelabuhanPenumpangArusCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [kategoriFilter, setKategoriFilter] = useState<'ALL' | 'Domestik' | 'Internasional'>('ALL');

  const filteredData = useMemo(() => {
    if (kategoriFilter === 'ALL') return PENUMPANG_PER_TERMINAL_DATA;
    return PENUMPANG_PER_TERMINAL_DATA.filter((item) =>
      item.jenis.toLowerCase().includes(kategoriFilter.toLowerCase())
    );
  }, [kategoriFilter]);

  const totalDatang = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.datang, 0);
  }, [filteredData]);

  const totalBerangkat = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.berangkat, 0);
  }, [filteredData]);

  const totalSemua = totalDatang + totalBerangkat;

  const maxTerminalScale = 3000000; // 3 Million passengers for bar scaling

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs font-sans">
      {/* 1. STANDARDIZED VISUAL HEADER (REQ 9) */}
      <PelabuhanVisualHeader
        datasetNumber={25}
        pdfPages="Hal. 17"
        title="Jumlah Penumpang Pelabuhan Domestik dan Internasional"
        visualName="Grafik Batang Dikelompokkan & Matriks Terminal (Grouped Column & Passenger Matrix)"
        classification="TERTUTUP"
        attributes={['PENUMPANG DOMESTIK/INTERNASIONAL', 'JUMLAH KEDATANGAN', 'JUMLAH KEBERANGKATAN']}
        rightControls={
          <div className="flex items-center gap-1.5">
            {/* Filter Domestik / Internasional */}
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 text-xs">
              <Filter className="w-3 h-3 text-slate-500" />
              <select
                value={kategoriFilter}
                onChange={(e) => setKategoriFilter(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
              >
                <option value="ALL">Semua Rute (Dom &amp; Int)</option>
                <option value="Domestik">Domestik</option>
                <option value="Internasional">Internasional</option>
              </select>
            </div>

            {/* Toggle View */}
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
                <span>Grafik</span>
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
                <span>Tabel</span>
              </button>
            </div>
          </div>
        }
        onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('kpi-penumpang-pelabuhan')}
      />

      {/* 2. SUMMARY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Total Penumpang Pelabuhan
          </span>
          <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
            {(totalSemua / 1e6).toFixed(2)} Juta Orang
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Jumlah Kedatangan
          </span>
          <span className="text-base sm:text-lg font-black text-sky-700 font-mono flex items-center gap-1">
            <ArrowDownLeft className="w-4 h-4 text-sky-600" />
            {(totalDatang / 1e6).toFixed(2)} Juta (49,6%)
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Jumlah Keberangkatan
          </span>
          <span className="text-base sm:text-lg font-black text-emerald-700 font-mono flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            {(totalBerangkat / 1e6).toFixed(2)} Juta (50,4%)
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Terminal Terpadat
          </span>
          <span className="text-base sm:text-lg font-black text-purple-700 font-mono">
            Batam Centre (38,7%)
          </span>
        </div>
      </div>

      {/* 3. VISUAL DISPLAY: CHART OR TABLE */}
      {viewMode === 'chart' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700">
              Komparasi Jumlah Kedatangan vs Keberangkatan per Terminal Pelabuhan
            </span>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 text-sky-700 font-bold">
                <span className="w-2.5 h-2.5 rounded bg-sky-600 inline-block" />
                Jumlah Kedatangan
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600 inline-block" />
                Jumlah Keberangkatan
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {filteredData.map((item) => {
              const datangPercent = (item.datang / maxTerminalScale) * 100;
              const berangkatPercent = (item.berangkat / maxTerminalScale) * 100;

              return (
                <div
                  key={item.terminal}
                  className="p-3 rounded-lg border border-slate-200/90 bg-white hover:border-sky-300 hover:shadow-2xs transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.terminal}</span>
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-mono text-[10px] font-bold">
                        {item.jenis}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
                      <span className="text-sky-700 font-bold">
                        Datang: {(item.datang / 1e3).toLocaleString('id-ID')} Ribu
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-emerald-700 font-bold">
                        Berangkat: {(item.berangkat / 1e3).toLocaleString('id-ID')} Ribu
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="font-black text-slate-900">
                        Total: {(item.total / 1e3).toLocaleString('id-ID')} Ribu ({item.porsi}%)
                      </span>
                    </div>
                  </div>

                  {/* Dual Bar Group for Kedatangan vs Keberangkatan */}
                  <div className="space-y-1.5">
                    {/* Bar Kedatangan */}
                    <div className="flex items-center gap-2 text-[10.5px]">
                      <span className="w-24 text-slate-500 shrink-0 font-medium">Kedatangan:</span>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full bg-sky-600 rounded-full transition-all duration-500"
                          style={{ width: `${datangPercent}%` }}
                          title={`Kedatangan: ${item.datang.toLocaleString('id-ID')} Orang`}
                        />
                      </div>
                    </div>

                    {/* Bar Keberangkatan */}
                    <div className="flex items-center gap-2 text-[10.5px]">
                      <span className="w-24 text-slate-500 shrink-0 font-medium">Keberangkatan:</span>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${berangkatPercent}%` }}
                          title={`Keberangkatan: ${item.berangkat.toLocaleString('id-ID')} Orang`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1 border-t border-slate-100">
                    <span className="text-slate-500">
                      Rute / Tujuan Utama: <strong className="text-slate-700 font-sans">{item.negaraTujuanUtama}</strong>
                    </span>
                    <span className="font-mono text-purple-700 font-semibold">{item.porsi}% Pangsa Trafik</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3">TERMINAL PELABUHAN</th>
                <th className="py-2.5 px-3">KATEGORI PENUMPANG</th>
                <th className="py-2.5 px-3 text-right">JUMLAH KEDATANGAN</th>
                <th className="py-2.5 px-3 text-right">JUMLAH KEBERANGKATAN</th>
                <th className="py-2.5 px-3 text-right">TOTAL PENUMPANG</th>
                <th className="py-2.5 px-3 text-center">PORSI (%)</th>
                <th className="py-2.5 px-3">DESTINASI / ASAL UTAMA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.map((row) => (
                <tr key={row.terminal} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">
                    {row.terminal}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-mono text-[10.5px] font-bold">
                      {row.jenis}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-sky-700 whitespace-nowrap">
                    {row.datang.toLocaleString('id-ID')} Orang
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                    {row.berangkat.toLocaleString('id-ID')} Orang
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-black text-slate-900 whitespace-nowrap">
                    {row.total.toLocaleString('id-ID')} Orang
                  </td>
                  <td className="py-2 px-3 text-center font-mono font-bold whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10.5px]">
                      {row.porsi}%
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-600 text-[11px]">
                    {row.negaraTujuanUtama}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-300">
              <tr>
                <td colSpan={2} className="py-2.5 px-3 text-right uppercase tracking-wider text-[11px]">
                  Total Arus Penumpang:
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-sky-800 text-xs">
                  {totalDatang.toLocaleString('id-ID')} Orang
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-800 text-xs">
                  {totalBerangkat.toLocaleString('id-ID')} Orang
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-900 text-xs">
                  {totalSemua.toLocaleString('id-ID')} Orang
                </td>
                <td className="py-2.5 px-3 text-center font-mono text-xs">
                  100%
                </td>
                <td className="py-2.5 px-3 text-slate-500 text-[10.5px]">
                  Buku Satu Data Hal. 17 No. 25
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
