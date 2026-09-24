import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Layers,
  Building2,
  CheckCircle2,
  HelpCircle,
  Info,
  Download
} from 'lucide-react';
import {
  TABEL_TARGET_PNBP_PERKIN,
  TOTAL_TARGET_PNBP_JUTA,
  TOTAL_REALISASI_PNBP_JUTA,
  EMPAT_IKS_KEPALA_BP
} from './kepalaBpData';

interface PnbpSatkerCardProps {
  onOpenManualModal?: () => void;
}

export const PnbpSatkerCard: React.FC<PnbpSatkerCardProps> = ({
  onOpenManualModal,
}) => {
  const [filterKategori, setFilterKategori] = useState<'ALL' | 'Unit Kerja Penghasil' | 'Badan Usaha'>('ALL');
  const iks3 = EMPAT_IKS_KEPALA_BP[2];

  const filteredData = TABEL_TARGET_PNBP_PERKIN.filter((row) => {
    if (filterKategori === 'ALL') return true;
    return row.kategori === filterKategori;
  });

  const totalTargetFilter = filteredData.reduce((acc, cur) => acc + cur.targetPnbpJuta, 0);
  const totalRealisasiFilter = filteredData.reduce((acc, cur) => acc + cur.realisasiPnbpJuta, 0);
  const persenCapaianFilter = ((totalRealisasiFilter / totalTargetFilter) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* HEADER */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50/50 via-slate-50 to-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
                  IKS-03 KEPALA BP BATAM
                </span>
                <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                  Sumber: Biro Keuangan BP Batam
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Nilai Realisasi PNBP BP Batam (Target Renstra: Rp 2,447 Triliun)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10.5px] uppercase font-bold text-slate-500 block">
                Target Renstra: Rp 2,447 T | Realisasi YTD
              </span>
              <span className="text-base font-black font-mono text-emerald-700">
                Rp {(TOTAL_REALISASI_PNBP_JUTA / 1e6).toFixed(3)} T{' '}
                <span className="text-xs font-bold text-slate-500">
                  ({((TOTAL_REALISASI_PNBP_JUTA / TOTAL_TARGET_PNBP_JUTA) * 100).toFixed(1)}%)
                </span>
              </span>
            </div>
            {onOpenManualModal && (
              <button
                onClick={onOpenManualModal}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-200 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Manual Formula</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-4 flex items-center gap-2 border-t border-slate-200/60 pt-2">
          <button
            onClick={() => setFilterKategori('ALL')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filterKategori === 'ALL'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Semua Satker (10 Unit)
          </button>
          <button
            onClick={() => setFilterKategori('Unit Kerja Penghasil')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filterKategori === 'Unit Kerja Penghasil'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Unit Kerja Penunjang (6 Satker - 42,5%)
          </button>
          <button
            onClick={() => setFilterKategori('Badan Usaha')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filterKategori === 'Badan Usaha'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Badan Usaha (4 Unit - 57,5%)
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* TOP SUMMARY STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-200">
            <span className="text-[10px] uppercase font-bold text-indigo-700 block">
              Target Penetapan Renstra TA 2026
            </span>
            <div className="text-xl font-black font-mono text-indigo-950">
              Rp {(totalTargetFilter / 1e6).toFixed(3)} Triliun
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Rp {totalTargetFilter.toLocaleString('id-ID', { maximumFractionDigits: 2 })} Juta
            </span>
          </div>

          <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">
              Realisasi Akumulasi YTD
            </span>
            <div className="text-xl font-black font-mono text-emerald-800">
              Rp {(totalRealisasiFilter / 1e6).toFixed(3)} Triliun
            </div>
            <span className="text-[11px] text-emerald-600 font-mono font-bold">
              Rp {totalRealisasiFilter.toLocaleString('id-ID', { maximumFractionDigits: 2 })} Juta
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-600 block">
              Tingkat Ketercapaian
            </span>
            <div className="text-xl font-black font-mono text-slate-900">
              {persenCapaianFilter}%
            </div>
            <span className="text-[11px] text-slate-500">
              Status: <strong className="text-emerald-700">On Track</strong> menuju akhir TA 2026
            </span>
          </div>
        </div>

        {/* VISUALISASI GRAFIK BATANG TARGET VS REALISASI 10 SATKER */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900">
              Grafik Batang Capaian vs Target PNBP per Satker Penghasil (Juta Rupiah):
            </h4>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-300" />
                <span className="text-slate-600">Target</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-indigo-600" />
                <span className="text-indigo-800 font-bold">Realisasi</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {filteredData.map((row) => {
              const maxVal = 1000000; // 1 Juta Juta = 1 Triliun
              const targetWidth = Math.min((row.targetPnbpJuta / maxVal) * 100, 100);
              const realisasiWidth = Math.min((row.realisasiPnbpJuta / maxVal) * 100, 100);

              return (
                <div key={row.namaSatker} className="p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-xs mb-1">
                    <span className="font-bold text-slate-900">
                      {row.no}. {row.namaSatker}{' '}
                      <span className="text-[10.5px] font-mono font-normal text-slate-500">
                        (Porsi Target: {row.targetPersen}%)
                      </span>
                    </span>
                    <span className="font-mono text-indigo-700 font-bold">
                      {row.persenCapaian}%
                    </span>
                  </div>

                  {/* Dual Bar (Target and Realisasi) */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        style={{ width: `${targetWidth}%` }}
                        className="bg-slate-300 h-full rounded-full"
                        title={`Target: Rp ${row.targetPnbpJuta.toLocaleString('id-ID')} Juta`}
                      />
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        style={{ width: `${realisasiWidth}%` }}
                        className="bg-gradient-to-r from-indigo-600 to-blue-500 h-full rounded-full"
                        title={`Realisasi: Rp ${row.realisasiPnbpJuta.toLocaleString('id-ID')} Juta`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] text-slate-500 mt-1 font-mono">
                    <span>Target: Rp {row.targetPnbpJuta.toLocaleString('id-ID')} Juta</span>
                    <span className="text-emerald-700 font-semibold">
                      Realisasi: Rp {row.realisasiPnbpJuta.toLocaleString('id-ID')} Juta
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TABEL RESMI HALAMAN 5 PERKIN */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">
              Tabel Breakdown Unit Kerja Penghasil &amp; Target PNBP (Persis Lampiran Halaman 5 Perkin):
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                  <th className="py-2.5 px-3 font-bold text-center w-12">No</th>
                  <th className="py-2.5 px-3 font-bold">Unit Kerja Penghasil / Badan Usaha</th>
                  <th className="py-2.5 px-3 font-bold text-right">Target PNBP (Juta Rp)</th>
                  <th className="py-2.5 px-3 font-bold text-center w-20">%</th>
                  <th className="py-2.5 px-3 font-bold text-right">Realisasi (Juta Rp)</th>
                  <th className="py-2.5 px-3 font-bold text-center w-24">Capaian (%)</th>
                  <th className="py-2.5 px-3 font-bold hidden md:table-cell">Uraian Layanan PNBP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TABEL_TARGET_PNBP_PERKIN.map((row) => (
                  <tr
                    key={row.no}
                    className={
                      row.kategori === 'Badan Usaha'
                        ? 'bg-blue-50/30 hover:bg-blue-50/60'
                        : 'hover:bg-slate-50'
                    }
                  >
                    <td className="py-2 px-3 text-center font-mono font-bold text-slate-700">
                      {row.no}
                    </td>
                    <td className="py-2 px-3">
                      <span className="font-bold text-slate-900 block">{row.namaSatker}</span>
                      <span className="text-[10px] text-slate-500">{row.kategori}</span>
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold text-slate-900">
                      {row.targetPnbpJuta.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-3 text-center font-mono font-bold text-indigo-700">
                      {row.targetPersen.toFixed(2)}%
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                      {row.realisasiPnbpJuta.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-3 text-center font-mono font-bold">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">
                        {row.persenCapaian}%
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-600 text-[11px] hidden md:table-cell">
                      {row.keterangan}
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                  <td colSpan={2} className="py-2.5 px-3 text-right">
                    TOTAL TARGET RENSTRA PNBP 2026:
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-900 text-sm">
                    {TOTAL_TARGET_PNBP_JUTA.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-indigo-700">
                    100,00%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-800 text-sm">
                    {TOTAL_REALISASI_PNBP_JUTA.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-emerald-800 font-bold">
                    {((TOTAL_REALISASI_PNBP_JUTA / TOTAL_TARGET_PNBP_JUTA) * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-xs text-slate-600 hidden md:table-cell">
                    Target Renstra 2,44 T (Rp 2,447 Triliun)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Pendapatan jasa layanan BLU BP Batam tidak termasuk Rupiah Murni (RM) APBN.
        </span>
        <span className="font-mono text-[11px] text-slate-600">
          Target Renstra: <strong>Rp 2,447 Triliun</strong>
        </span>
      </div>
    </div>
  );
};
