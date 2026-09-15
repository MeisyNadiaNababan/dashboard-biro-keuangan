import React, { useState } from 'react';
import {
  Globe2,
  Building,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  ArrowUpRight,
  Info,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { KekRealisasiInvestasi } from '../../data/kekData';

interface KekInvestasiJenisCardProps {
  investasiList: KekRealisasiInvestasi[];
  onOpenFormulaModal: (formulaId: string) => void;
}

export const KekInvestasiJenisCard: React.FC<KekInvestasiJenisCardProps> = ({
  investasiList,
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  // Kalkulasi agregasi berdasarkan jenis investasi
  const pmaEntries = investasiList.filter((item) => item.jenisInvestasi === 'PMA');
  const pmdnEntries = investasiList.filter((item) => item.jenisInvestasi === 'PMDN');

  const totalPmaRealisasi = pmaEntries.reduce((acc, curr) => acc + curr.realisasiInvestasi, 0);
  const totalPmdnRealisasi = pmdnEntries.reduce((acc, curr) => acc + curr.realisasiInvestasi, 0);
  const grandTotalRealisasi = totalPmaRealisasi + totalPmdnRealisasi;

  const pmaPercent = grandTotalRealisasi > 0 ? (totalPmaRealisasi / grandTotalRealisasi) * 100 : 0;
  const pmdnPercent = grandTotalRealisasi > 0 ? (totalPmdnRealisasi / grandTotalRealisasi) * 100 : 0;

  // Breakdown Triwulan Q1 - Q4
  const quarterBreakdown = [1, 2, 3, 4].map((q) => {
    const pmaQ = investasiList
      .filter((d) => d.triwulan === q && d.jenisInvestasi === 'PMA')
      .reduce((sum, d) => sum + d.realisasiInvestasi, 0);
    const pmdnQ = investasiList
      .filter((d) => d.triwulan === q && d.jenisInvestasi === 'PMDN')
      .reduce((sum, d) => sum + d.realisasiInvestasi, 0);
    const totalQ = pmaQ + pmdnQ;
    return {
      triwulan: `Q${q}`,
      triwulanNama: `Triwulan ${q}`,
      pma: pmaQ,
      pmdn: pmdnQ,
      total: totalQ,
    };
  });

  const maxQuarterVal = Math.max(...quarterBreakdown.map((q) => q.total), 1);

  const formatRupiah = (val: number): string => {
    if (val >= 1e12) {
      return `Rp ${(val / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;
    }
    return `Rp ${(val / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
  };

  return (
    <div
      id="kek-investasi-jenis-section"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
    >
      {/* Header Visualisasi */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-100/70 border border-sky-300/60 flex items-center justify-center text-sky-800 shrink-0">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800">
                Realisasi Investasi Berdasarkan Jenis (PMA vs PMDN)
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-700 border border-sky-200 font-mono">
                Dataset No. 1
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Analisis proporsi penanaman modal asing vs modal dalam negeri di KEK KPBPBB Batam TA 2025
            </p>
          </div>
        </div>

        {/* View switcher & formula button */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="bg-slate-200/70 p-0.5 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
                viewMode === 'chart'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PieIcon className="w-3 h-3" />
              <span>Visual Chart</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Tabel Entri (16 Baris)</span>
            </button>
          </div>

          <button
            onClick={() => onOpenFormulaModal('kpi_kek_investasi')}
            className="px-2.5 py-1 text-[11px] font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-md transition-colors cursor-pointer"
          >
            Info Rumus
          </button>
        </div>
      </div>

      {viewMode === 'chart' ? (
        <div className="p-4 sm:p-5 space-y-5">
          {/* Top 2 Summary Cards: PMA vs PMDN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kartu PMA */}
            <div className="p-4 rounded-xl border border-sky-200/70 bg-gradient-to-br from-sky-50/50 via-white to-sky-50/20 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-800">
                      PMA (Penanaman Modal Asing)
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                    {formatRupiah(totalPmaRealisasi)}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Porsi:{' '}
                    <span className="font-bold text-sky-700 font-mono text-sm">
                      {pmaPercent.toFixed(1)}%
                    </span>{' '}
                    dari total realisasi investasi KEK
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
              </div>

              {/* Detail KEK Utama PMA */}
              <div className="mt-3 pt-3 border-t border-sky-100 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Kawasan Utama:</span>
                  <span className="font-semibold text-slate-800">KEK Nongsa (Digital Park)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fokus Sektor:</span>
                  <span className="font-semibold text-slate-800">Data Center Hyperscale, Cloud &amp; AI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Asal Investor:</span>
                  <span className="font-semibold text-slate-800">Singapura, Hong Kong, AS, Australia</span>
                </div>
              </div>
            </div>

            {/* Kartu PMDN */}
            <div className="p-4 rounded-xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50/50 via-white to-indigo-50/20 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-800">
                      PMDN (Modal Dalam Negeri)
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                    {formatRupiah(totalPmdnRealisasi)}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Porsi:{' '}
                    <span className="font-bold text-indigo-700 font-mono text-sm">
                      {pmdnPercent.toFixed(1)}%
                    </span>{' '}
                    dari total realisasi investasi KEK
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
              </div>

              {/* Detail KEK Utama PMDN */}
              <div className="mt-3 pt-3 border-t border-indigo-100 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Kawasan Utama:</span>
                  <span className="font-semibold text-slate-800">KEK Batam Teknik &amp; KEK Pariwisata</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fokus Sektor:</span>
                  <span className="font-semibold text-slate-800">MRO Pesawat Terbang &amp; Fasilitas Medis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Entitas Pengembang:</span>
                  <span className="font-semibold text-slate-800">Lion Air Group &amp; Mayapada Group</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visualisasi Tren Per Triwulan: PMA vs PMDN */}
          <div className="border border-slate-200/80 rounded-xl p-4 bg-slate-50/40">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Dinamika Realisasi Investasi Per Triwulan (Q1 s/d Q4 2025)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Perbandingan nominal realisasi PMA (Modal Asing) vs PMDN (Modal Dalam Negeri)
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-sky-600" />
                  <span className="font-medium text-slate-700">PMA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-indigo-600" />
                  <span className="font-medium text-slate-700">PMDN</span>
                </div>
              </div>
            </div>

            {/* Bars List */}
            <div className="space-y-3.5">
              {quarterBreakdown.map((q) => {
                const pmaWidth = (q.pma / maxQuarterVal) * 100;
                const pmdnWidth = (q.pmdn / maxQuarterVal) * 100;

                return (
                  <div key={q.triwulan} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded-sm bg-slate-200 text-slate-800 font-bold font-mono text-[10px]">
                          {q.triwulan}
                        </span>
                        <span className="font-semibold text-slate-700">{q.triwulanNama}</span>
                      </div>
                      <div className="font-mono text-slate-800 font-bold">
                        {formatRupiah(q.total)}{' '}
                        <span className="text-slate-400 font-normal text-[11px]">
                          (PMA: {formatRupiah(q.pma)} • PMDN: {formatRupiah(q.pmdn)})
                        </span>
                      </div>
                    </div>

                    {/* Stacked / Proportional Bar */}
                    <div className="h-4 bg-slate-200/70 rounded-md overflow-hidden flex shadow-inner">
                      {q.pma > 0 && (
                        <div
                          className="bg-sky-600 hover:bg-sky-500 transition-all h-full"
                          style={{ width: `${Math.max(2, pmaWidth)}%` }}
                          title={`${q.triwulan} PMA: ${formatRupiah(q.pma)}`}
                        />
                      )}
                      {q.pmdn > 0 && (
                        <div
                          className="bg-indigo-600 hover:bg-indigo-500 transition-all h-full"
                          style={{ width: `${Math.max(1, pmdnWidth)}%` }}
                          title={`${q.triwulan} PMDN: ${formatRupiah(q.pmdn)}`}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insight Box */}
            <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Insight Analisis Investasi KEK: </span>
                Realisasi PMA mendominasi sebesar{' '}
                <span className="font-bold text-sky-700">{pmaPercent.toFixed(1)}%</span> dari total
                investasi KEK, terdorong oleh akselerasi pembangunan Data Center Hyperscale di KEK
                Nongsa pada Triwulan III dan IV. Sementara itu, PMDN bertumpu pada ekspansi fasilitas MRO
                Batam Aero Technic dan peletakan batu pertama rumah sakit internasional di KEK Pariwisata &amp; Kesehatan.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Table View: 16 Entri Realisasi Investasi */
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-xs font-sans text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">_id</th>
                <th className="py-2.5 px-3">Tahun</th>
                <th className="py-2.5 px-3">Triwulan</th>
                <th className="py-2.5 px-3">Nama KEK</th>
                <th className="py-2.5 px-3">Jenis</th>
                <th className="py-2.5 px-3 text-right">Target Investasi</th>
                <th className="py-2.5 px-3 text-right">Realisasi Investasi</th>
                <th className="py-2.5 px-3 text-center">ID DPP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {investasiList.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-3 font-mono text-slate-500 font-bold">{row.id}</td>
                  <td className="py-2 px-3 font-mono text-slate-700">{row.tahun}</td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 rounded-sm bg-slate-200 text-slate-800 font-mono font-semibold">
                      Q{row.triwulan}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-medium text-slate-800">{row.namaKek}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        row.jenisInvestasi === 'PMA'
                          ? 'bg-sky-100 text-sky-800 border border-sky-200'
                          : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      }`}
                    >
                      {row.jenisInvestasi}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-slate-600">
                    Rp {row.targetInvestasi.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                    {row.realisasiInvestasi > 0 ? (
                      `Rp ${row.realisasiInvestasi.toLocaleString('id-ID')}`
                    ) : (
                      <span className="text-slate-400 font-normal">0</span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-center font-mono text-slate-500 text-[10.5px]">
                    {row.idDpp}
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
