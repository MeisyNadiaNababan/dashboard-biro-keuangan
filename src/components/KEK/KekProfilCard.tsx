import React, { useState } from 'react';
import {
  MapPin,
  Maximize2,
  CheckCircle2,
  Layers,
  LayoutGrid,
  Table as TableIcon,
} from 'lucide-react';
import { KEK_PROFIL_DATA } from '../../data/kekData';

interface KekProfilCardProps {
  selectedKek: string;
  onSelectKek: (kekName: string) => void;
  onOpenFormulaModal: (formulaId: string) => void;
}

export const KekProfilCard: React.FC<KekProfilCardProps> = ({
  selectedKek,
  onSelectKek,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  return (
    <div
      id="kek-profil-kawasan-section"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
    >
      {/* Header Profil */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 border border-emerald-300/60 flex items-center justify-center text-emerald-800 shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                PROFIL KAWASAN EKONOMI KHUSUS
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono">
                Dataset No. 2 • profil-kek.pdf
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Informasi Kawasan, Lokasi Geografis, Luas Area (Ha), dan Status Operasional
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-xs self-end sm:self-auto">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-white text-slate-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Tampilan Kartu"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Kartu</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-slate-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Tampilan Tabel"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Tabel</span>
          </button>
        </div>
      </div>

      {/* TAMPILAN 1: KARTU (HANYA MENAMPILKAN KAWASAN, LOKASI, LUAS AREA, DAN STATUS OPERASIONAL) */}
      {viewMode === 'cards' ? (
        <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {KEK_PROFIL_DATA.map((item, idx) => {
            const isSelected =
              selectedKek === item.kawasan ||
              selectedKek === item.shortName ||
              (selectedKek.includes('Pariwisata') && item.kawasan.includes('Pariwisata'));

            return (
              <div
                key={item.id}
                onClick={() =>
                  onSelectKek(
                    item.shortName === 'KEK Pariwisata & Kesehatan'
                      ? 'KEK Pariwisata dan Kesehatan Internasional Batam'
                      : item.shortName
                  )
                }
                className={`rounded-xl border p-4 sm:p-4.5 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/25 ring-2 ring-sky-400/40 shadow-md'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
                }`}
                title="Klik untuk memfilter data dashboard ke kawasan ini"
              >
                {/* Top Accent Strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-opacity"
                  style={{ backgroundColor: item.themeColor }}
                />

                <div className="space-y-3.5">
                  {/* 1. KAWASAN */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                        KEK #{idx + 1}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                          Terpilih
                        </span>
                      )}
                    </div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
                      Kawasan
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-blue-700 transition-colors">
                      {item.kawasan}
                    </h3>
                  </div>

                  {/* 2. LOKASI */}
                  <div className="flex items-start gap-2 pt-2 border-t border-slate-100">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
                        Lokasi
                      </span>
                      <span className="text-xs text-slate-800 font-medium leading-snug block">
                        {item.lokasi}
                      </span>
                    </div>
                  </div>

                  {/* 3. LUAS AREA */}
                  <div className="flex items-start gap-2 pt-2 border-t border-slate-100">
                    <Maximize2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
                        Luas Area
                      </span>
                      <span className="text-base font-black font-mono text-slate-900">
                        {item.luasArea.toLocaleString('id-ID', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{' '}
                        <span className="text-xs font-semibold text-slate-500 font-sans">Ha</span>
                      </span>
                    </div>
                  </div>

                  {/* 4. STATUS OPERASIONAL */}
                  <div className="flex items-start gap-2 pt-2 border-t border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
                        Status Operasional
                      </span>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.statusOperasional}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Click Hint */}
                <div className="mt-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{isSelected ? '✓ Sedang Aktif' : 'Klik untuk filter'}</span>
                  <span style={{ color: item.themeColor }}>{item.shortName}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TAMPILAN 2: TABEL (HANYA MENAMPILKAN KAWASAN, LOKASI, LUAS AREA, DAN STATUS OPERASIONAL) */
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Kawasan</th>
                <th className="py-3 px-4">Lokasi</th>
                <th className="py-3 px-4 w-40 whitespace-nowrap">Luas Area</th>
                <th className="py-3 px-4">Status Operasional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {KEK_PROFIL_DATA.map((item, idx) => (
                <tr
                  key={item.id}
                  onClick={() =>
                    onSelectKek(
                      item.shortName === 'KEK Pariwisata & Kesehatan'
                        ? 'KEK Pariwisata dan Kesehatan Internasional Batam'
                        : item.shortName
                    )
                  }
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.themeColor }}
                      />
                      <span>{item.kawasan}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{item.lokasi}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono font-black text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        {item.luasArea.toLocaleString('id-ID', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{' '}
                        Ha
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {item.statusOperasional}
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
