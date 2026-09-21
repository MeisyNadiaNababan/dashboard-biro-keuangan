import React, { useState } from 'react';
import {
  Mountain,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { DATASET_5_PEMATANGAN_TANAH, SUMMARY_PEMATANGAN_TANAH } from './infrastrukturData';
import { PematanganTanahItem } from './types';

export const DatasetPematanganTanahCard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<PematanganTanahItem | null>(null);

  const filteredItems = DATASET_5_PEMATANGAN_TANAH.filter((item) => {
    return (
      searchQuery === '' ||
      item.namaLokasiBsw.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.wilayahBsw.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kontraktor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.namaPPK.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
            <Mountain className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                DATASET NO. 5
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                Pematangan Tanah (BSW) & Cut and Fill Lahan
              </h3>
            </div>
            <p className="text-[10.5px] text-slate-500">
              Atribut Resmi: KD_ANGG, TGL_MUL/SEL, KTGR_PEK, JNS_PEK, NM_PPK, NPAGU_F, NKON_S, KONTRAKTOR, SUPERVISI, VOL_PEK (Hal. 50)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-[10.5px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200">
            Subdit Pematangan Kawasan BSW
          </span>
        </div>
      </div>

      {/* Mini Metric Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 p-2 rounded-lg bg-amber-50/40 border border-amber-200/80 text-[11px]">
        <div>
          <span className="text-slate-500 text-[10px] block">Total Lokasi BSW:</span>
          <span className="font-bold text-slate-900 font-mono text-sm">
            {SUMMARY_PEMATANGAN_TANAH.totalLokasi} Lokasi
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Total Luas Lahan:</span>
          <span className="font-bold text-amber-800 font-mono text-sm">
            {SUMMARY_PEMATANGAN_TANAH.totalLuasHektar} Hektar
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Volume Cut & Fill:</span>
          <span className="font-bold text-amber-800 font-mono text-sm">
            4,27 Juta m³ Tanah
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Total Kontrak Pelaksanaan:</span>
          <span className="font-bold text-slate-800 font-mono text-sm">
            Rp {SUMMARY_PEMATANGAN_TANAH.totalKontrakMiliar} Miliar
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-2.5">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari lokasi BSW, kontraktor, PPK..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Compact Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase font-mono">
              <th className="py-2 px-2.5">KODE & LOKASI BSW (NAMOBJ)</th>
              <th className="py-2 px-2.5">PPK & KONTRAKTOR</th>
              <th className="py-2 px-2.5 text-right">LUAS (HA)</th>
              <th className="py-2 px-2.5 text-right">VOLUME (M³)</th>
              <th className="py-2 px-2.5 text-right">KONTRAK</th>
              <th className="py-2 px-2.5 text-center">PROGRES</th>
              <th className="py-2 px-2.5">KENDALA LAPANGAN</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="hover:bg-amber-50/40 cursor-pointer transition-colors"
              >
                <td className="py-2 px-2.5">
                  <div className="font-mono text-[10px] text-amber-800 font-bold">
                    {item.kodeAnggaran}
                  </div>
                  <div className="font-semibold text-slate-900 max-w-[210px] truncate text-[11px]">
                    {item.namaLokasiBsw}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{item.wilayahBsw}</span>
                </td>
                <td className="py-2 px-2.5 text-slate-700 max-w-[170px] truncate">
                  <div className="font-medium text-[10.5px] text-slate-900">{item.namaPPK}</div>
                  <div className="text-[10px] text-slate-500 truncate">{item.kontraktor}</div>
                </td>
                <td className="py-2 px-2.5 text-right font-mono font-bold text-slate-900">
                  {item.luasAreaHektar} Ha
                </td>
                <td className="py-2 px-2.5 text-right font-mono text-slate-700">
                  {item.volumeCutFillM3.toLocaleString('id-ID')} m³
                </td>
                <td className="py-2 px-2.5 text-right font-mono font-bold text-amber-900">
                  Rp {item.nilaiKontrakMiliar} M
                </td>
                <td className="py-2 px-2.5 text-center">
                  <div className="font-mono font-bold text-slate-900">
                    {item.progresRealisasiPersen}%
                  </div>
                  <span
                    className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-semibold ${
                      item.statusProgres === 'Ahead'
                        ? 'bg-emerald-50 text-emerald-700'
                        : item.statusProgres === 'On Schedule'
                        ? 'bg-sky-50 text-sky-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {item.statusProgres}
                  </span>
                </td>
                <td className="py-2 px-2.5 text-slate-500 text-[10px] max-w-[190px] truncate">
                  {item.kendala}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Item Detail Drawer */}
      {selectedItem && (
        <div className="mt-3 p-3 rounded-lg bg-amber-50/60 border border-amber-200 text-xs">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-amber-200">
            <span className="font-bold text-amber-900">
              Detail Pematangan Lahan: {selectedItem.namaLokasiBsw}
            </span>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-slate-400 hover:text-slate-700 text-xs font-bold"
            >
              ✕ Tutup
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10.5px]">
            <div>
              <span className="text-slate-500 block">Kode Anggaran (KD_ANGG):</span>
              <span className="font-mono font-semibold text-slate-800">{selectedItem.kodeAnggaran}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Pejabat Pembuat Komitmen (NM_PPK):</span>
              <span className="font-semibold text-slate-800">{selectedItem.namaPPK}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Pelaksana / Kontraktor:</span>
              <span className="font-semibold text-slate-800">{selectedItem.kontraktor}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Konsultan Supervisi:</span>
              <span className="font-semibold text-slate-800">{selectedItem.konsultanSupervisi}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Volume Cut & Fill:</span>
              <span className="font-mono font-semibold text-slate-800">{selectedItem.volumeCutFillM3.toLocaleString('id-ID')} m³</span>
            </div>
            <div>
              <span className="text-slate-500 block">Nilai Kontrak (NKON_S):</span>
              <span className="font-mono font-semibold text-amber-800">Rp {selectedItem.nilaiKontrakMiliar} Miliar</span>
            </div>
            <div>
              <span className="text-slate-500 block">Progres Realisasi:</span>
              <span className="font-mono font-bold text-emerald-700">{selectedItem.progresRealisasiPersen}% (Target: {selectedItem.progresRencanaPersen}%)</span>
            </div>
            <div>
              <span className="text-slate-500 block">Status Progres:</span>
              <span className="font-semibold text-emerald-700">{selectedItem.statusProgres}</span>
            </div>
            <div className="col-span-2 sm:col-span-4 mt-1 pt-1 border-t border-amber-200/60">
              <span className="text-slate-500 block">Kendala Teknis Lapangan:</span>
              <span className="font-medium text-slate-800">{selectedItem.kendala}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
