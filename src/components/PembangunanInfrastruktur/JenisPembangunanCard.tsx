import React, { useState } from 'react';
import {
  Layers,
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  Coins,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { REKAP_JENIS_PEMBANGUNAN } from './infrastrukturData';

interface JenisPembangunanCardProps {
  selectedJenisPekerjaan: string;
  onSelectJenis: (jenis: string) => void;
}

export const JenisPembangunanCard: React.FC<JenisPembangunanCardProps> = ({
  selectedJenisPekerjaan,
  onSelectJenis,
}) => {
  const [viewMode, setViewMode] = useState<'visual' | 'tabel'>('visual');

  const filteredData = selectedJenisPekerjaan === 'Semua'
    ? REKAP_JENIS_PEMBANGUNAN
    : REKAP_JENIS_PEMBANGUNAN.filter(
        (item) => item.jenisPekerjaan.toLowerCase().includes(selectedJenisPekerjaan.toLowerCase()) ||
                  selectedJenisPekerjaan.toLowerCase().includes(item.jenisPekerjaan.toLowerCase())
      );

  const totalProyek = REKAP_JENIS_PEMBANGUNAN.reduce((acc, curr) => acc + curr.jumlahProyek, 0);
  const maxProyek = Math.max(...REKAP_JENIS_PEMBANGUNAN.map((item) => item.jumlahProyek));

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 mb-4 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                  JNS_PEK
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Distribusi Infrastruktur Berdasarkan Jenis Pekerjaan
                </h3>
              </div>
              <p className="text-[10.5px] text-slate-500">
                Pagu, HPS, Nilai Kontrak dan realisasi fisik per kategori konstruksi (Hal. 50-51)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="bg-slate-100 p-0.5 rounded-lg flex items-center text-[10.5px]">
            <button
              onClick={() => setViewMode('visual')}
              className={`px-2 py-1 rounded font-medium flex items-center gap-1 transition-all ${
                viewMode === 'visual'
                  ? 'bg-white text-slate-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3 h-3" />
              <span>Grafik Batang</span>
            </button>
            <button
              onClick={() => setViewMode('tabel')}
              className={`px-2 py-1 rounded font-medium flex items-center gap-1 transition-all ${
                viewMode === 'tabel'
                  ? 'bg-white text-slate-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PieIcon className="w-3 h-3" />
              <span>Tabel Pivot</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'visual' ? (
        /* Visual Horizontal Bars & Distribution */
        <div className="space-y-2">
          {filteredData.map((item) => {
            const percentageOfTotal = ((item.jumlahProyek / totalProyek) * 100).toFixed(1);
            const barWidth = (item.jumlahProyek / maxProyek) * 100;
            const isSelected = selectedJenisPekerjaan === item.jenisPekerjaan;

            return (
              <div
                key={item.jenisPekerjaan}
                onClick={() => onSelectJenis(isSelected ? 'Semua' : item.jenisPekerjaan)}
                className={`group p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/40 shadow-2xs'
                    : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.warna }}
                    />
                    <span className="font-semibold text-xs text-slate-800 group-hover:text-sky-700 transition-colors">
                      {item.jenisPekerjaan}
                    </span>
                    <span className="text-[10.5px] text-slate-400">({item.singkatan})</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs">
                    <span className="font-bold text-slate-800 font-mono text-[11px]">
                      {item.jumlahProyek} Paket
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-600 font-medium font-mono text-[11px]">
                      Rp {(item.totalPagu / 1000000000).toFixed(1)} M
                    </span>
                    <span className="bg-sky-100 text-sky-800 font-bold px-1.5 py-0.2 rounded text-[10px]">
                      {percentageOfTotal}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex mb-1.5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: item.warna,
                    }}
                  />
                </div>

                {/* Metadata & Sub-Breakdown */}
                <div className="flex flex-wrap items-center justify-between gap-1 text-[10.5px] text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-600 font-medium">
                      📐 Volume: {item.panjangVolume}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-medium border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> {item.statusSelesai} Selesai
                    </span>
                    <span className="inline-flex items-center gap-1 text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-[10px] font-medium border border-sky-200">
                      <Clock className="w-3 h-3" /> {item.statusOnTrack} On Schedule
                    </span>
                    {item.statusKritis > 0 && (
                      <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[10px] font-medium border border-rose-200">
                        <AlertTriangle className="w-3 h-3" /> {item.statusKritis} Kritis SCM
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              Tidak ada data yang sesuai dengan filter jenis pekerjaan.
            </div>
          )}
        </div>
      ) : (
        /* Detailed Data Table Mode */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="px-3 py-2.5">No</th>
                <th className="px-3 py-2.5">Jenis Pekerjaan (JNS_PEK)</th>
                <th className="px-3 py-2.5 text-center">Jumlah Paket</th>
                <th className="px-3 py-2.5 text-right">Pagu Anggaran</th>
                <th className="px-3 py-2.5 text-center">Porsi (%)</th>
                <th className="px-3 py-2.5">Cakupan Volume Fisik</th>
                <th className="px-3 py-2.5 text-center">Status On-Track</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, index) => (
                <tr
                  key={item.jenisPekerjaan}
                  className="hover:bg-sky-50/40 transition-colors"
                >
                  <td className="px-3 py-3 font-medium text-slate-500">{index + 1}</td>
                  <td className="px-3 py-3 font-semibold text-slate-800">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.warna }}
                      />
                      {item.jenisPekerjaan}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center font-bold text-slate-800">
                    {item.jumlahProyek} Paket
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-slate-700">
                    Rp {(item.totalPagu / 1000000000).toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[11px]">
                      {item.persentaseAnggaran}%
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{item.panjangVolume}</td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-emerald-700 font-semibold">
                      {item.statusSelesai + item.statusOnTrack}/{item.jumlahProyek} (
                      {(((item.statusSelesai + item.statusOnTrack) / item.jumlahProyek) * 100).toFixed(0)}%)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-semibold text-slate-800 border-t border-slate-200">
              <tr>
                <td colSpan={2} className="px-3 py-2.5 text-right uppercase text-[10px]">
                  Total Seluruh Proyek
                </td>
                <td className="px-3 py-2.5 text-center font-bold">58 Paket</td>
                <td className="px-3 py-2.5 text-right font-bold text-sky-700">
                  Rp 2.840,0 Miliar
                </td>
                <td className="px-3 py-2.5 text-center font-bold">100%</td>
                <td colSpan={2} className="px-3 py-2.5 text-slate-500 text-[11px]">
                  Tersebar di 7 Wilayah BP Batam
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
