import React, { useState } from 'react';
import { Users, PieChart as PieChartIcon, Table as TableIcon, Info } from 'lucide-react';
import { PegawaiStatusData } from './types';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface StatusKepegawaianCardProps {
  data: PegawaiStatusData[];
  totalPegawai: number;
}

export const StatusKepegawaianCard: React.FC<StatusKepegawaianCardProps> = ({ data, totalPegawai }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate SVG donut slice paths
  let cumulativeAngle = 0;
  const radius = 68;
  const innerRadius = 44;
  const cx = 80;
  const cy = 80;

  const slices = data.map((item, idx) => {
    const angle = (item.jumlahPegawai / totalPegawai) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const x3 = cx + innerRadius * Math.cos(endRad);
    const y3 = cy + innerRadius * Math.sin(endRad);
    const x4 = cx + innerRadius * Math.cos(startRad);
    const y4 = cy + innerRadius * Math.sin(startRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z',
    ].join(' ');

    return {
      ...item,
      pathData,
      idx,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* CARD HEADER */}
      <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Jumlah Pegawai Berdasarkan Status Kepegawaian
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Katalog Satu Data Hal. 1 Dataset #8 (Terbuka) · Menampilkan Status Pegawai &amp; Jumlah Pegawai
          </p>
        </div>

        {/* VIEW TOGGLE */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setViewMode('chart')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'chart'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieChartIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Donut &amp; Bar</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5 text-slate-600" />
            <span>Tabel Ringkas</span>
          </button>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="p-4 sm:p-5">
        {viewMode === 'chart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* 1. DONUT VISUALIZATION WITH SVG */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
                  {slices.map((slice) => {
                    const isHovered = hoveredIndex === slice.idx;
                    return (
                      <path
                        key={slice.id}
                        d={slice.pathData}
                        fill={slice.warna}
                        className="transition-all duration-200 cursor-pointer"
                        opacity={hoveredIndex === null || isHovered ? 1 : 0.4}
                        transform={isHovered ? 'scale(1.03) translate(-2, -2)' : undefined}
                        onMouseEnter={() => setHoveredIndex(slice.idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    );
                  })}
                </svg>

                {/* Center metric */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total SDM</span>
                  <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 tabular-nums">
                    {totalPegawai.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-slate-400">Pegawai</span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="text-xs text-slate-500 font-medium">
                  {hoveredIndex !== null
                    ? `${data[hoveredIndex].statusPegawai}: ${data[hoveredIndex].jumlahPegawai.toLocaleString('id-ID')} (${data[hoveredIndex].persentase.toFixed(1)}%)`
                    : 'Arahkan kursor ke grafik untuk detail status'}
                </span>
              </div>
            </div>

            {/* 2. SIMPLE BREAKDOWN: STATUS PEGAWAI & JUMLAH PEGAWAI (Anti-clutter) */}
            <div className="lg:col-span-7 space-y-3">
              {data.map((item, idx) => {
                const isHovered = hoveredIndex === idx;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isHovered
                        ? 'bg-slate-50/90 border-blue-300 shadow-xs'
                        : 'bg-white border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: item.warna }}
                        />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                          {item.statusPegawai}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 shrink-0">
                        <span className="text-xs sm:text-sm font-bold font-mono text-slate-900 tabular-nums">
                          {item.jumlahPegawai.toLocaleString('id-ID')}
                        </span>
                        <span className="text-xs text-slate-500 font-mono tabular-nums">
                          ({item.persentase.toFixed(1)}%)
                        </span>
                      </div>
                    </div>

                    {/* Progress visual bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.persentase}%`,
                          backgroundColor: item.warna,
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-500">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Format sederhana 2 atribut: Status Pegawai dan Jumlah Pegawai, mudah dipahami pimpinan &amp; publik.</span>
              </div>
            </div>
          </div>
        ) : (
          /* TABLE VIEW: CLEAN 2 ATRIBUT UTAMA (STATUS & JUMLAH) */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600">
                  <th className="py-2.5 px-3 font-semibold">No</th>
                  <th className="py-2.5 px-3 font-semibold">Status Pegawai</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Jumlah Pegawai</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Proporsi (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.warna }} />
                        <span>{row.statusPegawai}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {row.jumlahPegawai.toLocaleString('id-ID')} Orang
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600 tabular-nums">
                      {row.persentase.toFixed(2)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50/90 font-bold border-t-2 border-slate-200">
                  <td className="py-2.5 px-3 font-mono text-slate-600" colSpan={2}>
                    Total Seluruh Pegawai BP Batam
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-blue-700 tabular-nums">
                    {totalPegawai.toLocaleString('id-ID')} Orang
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-blue-700 tabular-nums">
                    100.00%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* TABLEAU SHELVES FOOTER */}
      <div className="px-4 pb-3">
        <TableauShelvesBadge
          showMe="Horizontal Bars / Donut Chart"
          columns="SUM([Jumlah Pegawai])"
          rows="[Status Pegawai]"
          color="[Status Pegawai]"
          detail="SUM([Jumlah Pegawai]) & [% of Total]"
          filters="[Tahun], [Status Pegawai]"
          compact={true}
        />
      </div>
    </div>
  );
};
