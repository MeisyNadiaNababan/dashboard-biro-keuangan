import React, { useState } from 'react';
import { GraduationCap, BarChart2, Table as TableIcon, Award, BookOpen } from 'lucide-react';
import { PegawaiPendidikanData } from './types';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PendidikanPegawaiCardProps {
  data: PegawaiPendidikanData[];
  totalPegawai: number;
}

export const PendidikanPegawaiCard: React.FC<PendidikanPegawaiCardProps> = ({ data, totalPegawai }) => {
  const [viewMode, setViewMode] = useState<'bar' | 'table'>('bar');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Highest count for scale
  const maxCount = Math.max(...data.map((d) => d.jumlahPegawai));

  // High-level aggregates for ordinary people summary
  const totalSarjanaKeatas = data
    .filter((d) => ['s3', 's2', 's1'].includes(d.id))
    .reduce((acc, curr) => acc + curr.jumlahPegawai, 0);
  const persenSarjanaKeatas = (totalSarjanaKeatas / totalPegawai) * 100;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* CARD HEADER */}
      <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Jumlah Pegawai Berdasarkan Pendidikan
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Katalog Satu Data Hal. 1 Dataset #9 (Terbuka) · Menampilkan Tingkat Pendidikan &amp; Jumlah Pegawai
          </p>
        </div>

        {/* VIEW TOGGLE */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setViewMode('bar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'bar'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Grafik Batang</span>
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

      {/* QUICK HIGHLIGHT STRIP FOR LAYPEOPLE */}
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            Mayoritas pegawai berpendidikan tinggi: <strong>{persenSarjanaKeatas.toFixed(1)}%</strong> ({totalSarjanaKeatas.toLocaleString('id-ID')} orang lulusan S1, S2, dan S3).
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-slate-500 text-[11px]">Total: {totalPegawai} Pegawai</span>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-4 sm:p-5">
        {viewMode === 'bar' ? (
          <div className="space-y-4">
            {data.map((item) => {
              const barWidthPercent = (item.jumlahPegawai / maxCount) * 100;
              const isHovered = hoveredId === item.id;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    isHovered
                      ? 'bg-indigo-50/50 border-indigo-300 shadow-xs'
                      : 'bg-white border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.warna }} />
                      <span className="text-xs sm:text-sm font-bold text-slate-800">
                        {item.tingkatPendidikan}
                      </span>
                      <span className="text-[11px] text-slate-400 hidden sm:inline">
                        · {item.golonganDominan}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 shrink-0">
                      <span className="text-xs sm:text-sm font-bold font-mono text-slate-900 tabular-nums">
                        {item.jumlahPegawai.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs font-mono text-indigo-700 font-semibold tabular-nums">
                        {item.persentase.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${barWidthPercent}%`,
                        backgroundColor: item.warna,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW: CLEAN 2 ATRIBUT UTAMA (TINGKAT PENDIDIKAN & JUMLAH) */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600">
                  <th className="py-2.5 px-3 font-semibold">No</th>
                  <th className="py-2.5 px-3 font-semibold">Tingkat Pendidikan</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Jumlah Pegawai</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Proporsi (%)</th>
                  <th className="py-2.5 px-3 font-semibold">Kategori Dominan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.warna }} />
                        <span className="font-semibold">{row.tingkatPendidikan}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {row.jumlahPegawai.toLocaleString('id-ID')} Orang
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600 tabular-nums">
                      {row.persentase.toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 text-xs">
                      {row.golonganDominan}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50/90 font-bold border-t-2 border-slate-200">
                  <td className="py-2.5 px-3 font-mono text-slate-600" colSpan={2}>
                    Total Seluruh Pegawai BP Batam
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-indigo-700 tabular-nums">
                    {totalPegawai.toLocaleString('id-ID')} Orang
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-indigo-700 tabular-nums">
                    100.00%
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-xs">Semua Jenjang</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* TABLEAU SHELVES FOOTER */}
      <div className="px-4 pb-3">
        <TableauShelvesBadge
          showMe="Horizontal Bars"
          columns="SUM([Jumlah Pegawai])"
          rows="[Tingkat Pendidikan]"
          color="[Tingkat Pendidikan]"
          detail="SUM([Jumlah Pegawai]) & [% of Total]"
          filters="[Tahun], [Tingkat Pendidikan]"
          compact={true}
        />
      </div>
    </div>
  );
};
