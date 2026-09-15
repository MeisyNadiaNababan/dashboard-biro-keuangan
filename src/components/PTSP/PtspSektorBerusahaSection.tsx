import React, { useState } from 'react';
import {
  Briefcase,
  BarChart2,
  Table,
  CheckCircle2,
  TrendingUp,
  Building2,
  ArrowUpDown,
} from 'lucide-react';
import {
  PTSP_DATASET_9_SEKTOR_BERUSAHA,
  PtspSektorBerusahaItem,
} from '../../data/ptspData';

interface PtspSektorBerusahaSectionProps {
  onExplainKpi?: (kpiId: string) => void;
}

export const PtspSektorBerusahaSection: React.FC<PtspSektorBerusahaSectionProps> = ({
  onExplainKpi,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [sortField, setSortField] = useState<'permohonan' | 'terbit' | 'tingkatTerbit'>('permohonan');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const data = [...PTSP_DATASET_9_SEKTOR_BERUSAHA].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA - valB : valB - valA;
  });

  const totalPermohonan = data.reduce((acc, curr) => acc + curr.permohonan, 0);
  const totalTerbit = data.reduce((acc, curr) => acc + curr.terbit, 0);
  const maxPermohonan = Math.max(...data.map((d) => d.permohonan));

  const handleSort = (field: 'permohonan' | 'terbit' | 'tingkatTerbit') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Container */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              POIN #11 • DATASET 9
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Perizinan Berusaha Berbasis Risiko (OSS RBA)
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#002B49]" />
            Perizinan Berusaha Berdasarkan Sektor
          </h2>
          <p className="text-xs text-slate-500">
            Sebaran volume permohonan dan izin terbit berdasarkan sektor ekonomi strategis BP Batam
          </p>
        </div>

        {/* View Controls & Totals */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Total Permohonan:</span>
              <span className="font-mono font-bold text-[#002B49]">{totalPermohonan.toLocaleString('id-ID')}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Terbit:</span>
              <span className="font-mono font-bold text-emerald-600">{totalTerbit.toLocaleString('id-ID')}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Rasio:</span>
              <span className="font-mono font-bold text-emerald-700">
                {((totalTerbit / totalPermohonan) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-[#002B49] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Visual Bar</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#002B49] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {viewMode === 'chart' ? (
          <div className="space-y-3">
            {/* Chart Legend */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Sektor Usaha</span>
              <div className="flex items-center gap-4 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-blue-200" />
                  <span className="text-slate-600">Permohonan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-600" />
                  <span className="text-slate-600">Terbit</span>
                </div>
              </div>
            </div>

            {/* Compact Bar Visual */}
            <div className="space-y-2.5">
              {data.map((item) => {
                const terbitRatio = (item.terbit / item.permohonan) * 100;
                const barWidth = (item.permohonan / maxPermohonan) * 100;
                const terbitBarWidth = (item.terbit / maxPermohonan) * 100;

                return (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{item.sektor}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                          {item.tingkatTerbit}% Terbit
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-slate-600">
                          Permohonan: <strong className="text-slate-900">{item.permohonan.toLocaleString('id-ID')}</strong>
                        </span>
                        <span className="text-emerald-700">
                          Terbit: <strong>{item.terbit.toLocaleString('id-ID')}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Dual Stacked / Overlapped Clean Bar */}
                    <div className="relative w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      {/* Permohonan Background Bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-blue-200 rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      />
                      {/* Terbit Foreground Bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${terbitBarWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Sektor</th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#002B49]"
                    onClick={() => handleSort('permohonan')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Permohonan</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#002B49]"
                    onClick={() => handleSort('terbit')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Terbit</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#002B49]"
                    onClick={() => handleSort('tingkatTerbit')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>% Terbit</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-right">Belum Terbit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{item.sektor}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {item.permohonan.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">
                      {item.terbit.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.tingkatTerbit}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                      {(item.permohonan - item.terbit).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-800">
                <tr>
                  <td className="py-2.5 px-3">Total Seluruh Sektor</td>
                  <td className="py-2.5 px-3 text-right font-mono">{totalPermohonan.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-600">{totalTerbit.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-700">
                    {((totalTerbit / totalPermohonan) * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                    {(totalPermohonan - totalTerbit).toLocaleString('id-ID')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
