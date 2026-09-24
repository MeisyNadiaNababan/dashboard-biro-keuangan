import React, { useState, useMemo } from 'react';
import {
  Globe2,
  Building,
  TrendingUp,
  BarChart3,
  Layers,
  CheckCircle2,
  Table as TableIcon,
  Download,
  AlertCircle,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { KekRealisasiInvestasi } from '../../data/kekData';
import { KekVisualHeader } from './KekVisualHeader';

interface KekInvestasiJenisCardProps {
  investasiList: KekRealisasiInvestasi[];
  onOpenFormulaModal: (formulaId: string) => void;
}

type SheetSwapMode = 'perbandingan_target_realisasi' | 'tren_triwulan' | 'tabel_kinerja';

export const KekInvestasiJenisCard: React.FC<KekInvestasiJenisCardProps> = ({
  investasiList,
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<SheetSwapMode>('perbandingan_target_realisasi');
  const [selectedFilterJenis, setSelectedFilterJenis] = useState<'ALL' | 'PMA' | 'PMDN'>('ALL');

  // Filtered entries by local jenis filter if applicable
  const displayList = useMemo(() => {
    if (selectedFilterJenis === 'ALL') return investasiList;
    return investasiList.filter((item) => item.jenisInvestasi === selectedFilterJenis);
  }, [investasiList, selectedFilterJenis]);

  // Kalkulasi agregasi berdasarkan jenis investasi
  const pmaEntries = investasiList.filter((item) => item.jenisInvestasi === 'PMA');
  const pmdnEntries = investasiList.filter((item) => item.jenisInvestasi === 'PMDN');

  // Total Realisasi
  const totalPmaRealisasi = pmaEntries.reduce((acc, curr) => acc + curr.realisasiInvestasi, 0);
  const totalPmdnRealisasi = pmdnEntries.reduce((acc, curr) => acc + curr.realisasiInvestasi, 0);
  const grandTotalRealisasi = totalPmaRealisasi + totalPmdnRealisasi;

  // Total Target (Unique by KEK & Jenis, to avoid quadrupling when viewing multiple quarters)
  // Target tahunan resmi: KEK Nongsa Rp 2,835 T, KEK Batam Teknik Rp 700 M, KEK Pariwisata Rp 817 M
  // Total Target PMA = Rp 2,835 T (KEK Nongsa PMA)
  // Total Target PMDN = Rp 700 M (Batam Teknik) + Rp 817 M (Pariwisata) + Rp 2,835 T (Nongsa PMDN allocation)
  const targetPmaTahunan = 2835000000000;
  const targetPmdnTahunan = 700000000000 + 817000000000; // PMDN core
  const grandTotalTarget = targetPmaTahunan + targetPmdnTahunan;

  const capaianPmaPct = targetPmaTahunan > 0 ? (totalPmaRealisasi / targetPmaTahunan) * 100 : 0;
  const capaianPmdnPct = targetPmdnTahunan > 0 ? (totalPmdnRealisasi / targetPmdnTahunan) * 100 : 0;
  const grandCapaianPct = grandTotalTarget > 0 ? (grandTotalRealisasi / grandTotalTarget) * 100 : 0;

  // Breakdown Per KEK: Target vs Realisasi by PMA & PMDN
  const kekBreakdown = useMemo(() => {
    const kekNames = [
      'KEK Nongsa',
      'KEK Batam Teknik',
      'KEK Pariwisata dan Kesehatan Internasional Batam',
    ];

    return kekNames.map((nama) => {
      const entries = investasiList.filter((d) => d.namaKek === nama);
      const pmaReal = entries
        .filter((d) => d.jenisInvestasi === 'PMA')
        .reduce((sum, d) => sum + d.realisasiInvestasi, 0);
      const pmdnReal = entries
        .filter((d) => d.jenisInvestasi === 'PMDN')
        .reduce((sum, d) => sum + d.realisasiInvestasi, 0);
      const totalReal = pmaReal + pmdnReal;

      // Target breakdown
      let target = 0;
      let targetPma = 0;
      let targetPmdn = 0;
      if (nama === 'KEK Nongsa') {
        target = 2835000000000;
        targetPma = 2835000000000;
        targetPmdn = 0;
      } else if (nama === 'KEK Batam Teknik') {
        target = 700000000000;
        targetPma = 0;
        targetPmdn = 700000000000;
      } else {
        target = 817000000000;
        targetPma = 0;
        targetPmdn = 817000000000;
      }

      const pct = target > 0 ? (totalReal / target) * 100 : 0;

      return {
        nama,
        shortName:
          nama === 'KEK Pariwisata dan Kesehatan Internasional Batam'
            ? 'KEK Pariwisata & Kesehatan'
            : nama,
        pmaReal,
        pmdnReal,
        totalReal,
        target,
        targetPma,
        targetPmdn,
        capaianPct: pct,
      };
    });
  }, [investasiList]);

  // Breakdown Triwulan Q1 - Q4
  const quarterBreakdown = useMemo(() => {
    return [1, 2, 3, 4].map((q) => {
      const qEntries = investasiList.filter((d) => d.triwulan === q);
      const pmaReal = qEntries
        .filter((d) => d.jenisInvestasi === 'PMA')
        .reduce((sum, d) => sum + d.realisasiInvestasi, 0);
      const pmdnReal = qEntries
        .filter((d) => d.jenisInvestasi === 'PMDN')
        .reduce((sum, d) => sum + d.realisasiInvestasi, 0);
      const totalReal = pmaReal + pmdnReal;
      const quarterTarget = grandTotalTarget / 4;
      const pct = quarterTarget > 0 ? (totalReal / quarterTarget) * 100 : 0;

      return {
        triwulan: `Q${q}`,
        triwulanNama: `Triwulan ${q}`,
        pmaReal,
        pmdnReal,
        totalReal,
        quarterTarget,
        capaianPct: pct,
      };
    });
  }, [investasiList, grandTotalTarget]);

  const maxQuarterVal = Math.max(...quarterBreakdown.map((q) => Math.max(q.totalReal, q.quarterTarget)), 1);

  const formatRupiah = (val: number): string => {
    if (val >= 1e12) {
      return `Rp ${(val / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;
    }
    if (val >= 1e9) {
      return `Rp ${(val / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M`;
    }
    if (val === 0) return 'Rp 0';
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  const formatShortRupiah = (val: number): string => {
    if (val >= 1e12) {
      return `${(val / 1e12).toFixed(2)} T`;
    }
    if (val >= 1e9) {
      return `${(val / 1e9).toFixed(1)} M`;
    }
    return val.toString();
  };

  const handleExportCsv = () => {
    const headers = [
      'TAHUN',
      'TRIWULAN',
      'NAMA_KAWASAN_EKONOMI_KHUSUS',
      'JENIS_INVESTASI',
      'TARGET_INVESTASI_RUPIAH',
      'REALISASI_INVESTASI_RUPIAH',
      'PERSEN_CAPAIAN',
    ];

    const rows = displayList.map((item) => {
      const pct = item.targetInvestasi > 0 ? ((item.realisasiInvestasi / item.targetInvestasi) * 100).toFixed(2) : '0';
      return [
        item.tahun,
        `Q${item.triwulan}`,
        `"${item.namaKek}"`,
        item.jenisInvestasi,
        item.targetInvestasi,
        item.realisasiInvestasi,
        `${pct}%`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Realisasi_Investasi_KEK_KPBPBB_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getVisualMeta = () => {
    switch (activeSheet) {
      case 'perbandingan_target_realisasi':
        return {
          name: 'Grouped Bar & Metric: Target vs Realisasi Investasi PMA & PMDN per KEK',
          attrs: [
            'TAHUN',
            'TRIWULAN',
            'NAMA KAWASAN EKONOMI KHUSUS',
            'JENIS INVESTASI (PMA/PMDN)',
            'TARGET INVESTASI',
            'REALISASI INVESTASI',
          ],
        };
      case 'tren_triwulan':
        return {
          name: 'Stacked Bar & Multi-Series Trend: Realisasi Triwulanan PMA vs PMDN terhadap Target',
          attrs: [
            'TAHUN',
            'TRIWULAN',
            'JENIS INVESTASI (PMA/PMDN)',
            'TARGET INVESTASI',
            'REALISASI INVESTASI',
          ],
        };
      case 'tabel_kinerja':
        return {
          name: 'Matriks Data Tabular: Nilai Target & Realisasi Investasi KEK (16 Baris Resmi)',
          attrs: [
            'TAHUN',
            'TRIWULAN',
            'NAMA KAWASAN EKONOMI KHUSUS',
            'JENIS INVESTASI (PMA/PMDN)',
            'TARGET INVESTASI',
            'REALISASI INVESTASI',
          ],
        };
    }
  };

  const visualMeta = getVisualMeta();

  return (
    <div
      id="kek-investasi-jenis-section"
      className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5"
    >
      {/* Official Visual Header (Memenuhi Poin 5: Nama Visualisasi & Atribut) */}
      <KekVisualHeader
        datasetNumber={1}
        pdfPages="Hal. 9"
        title="NILAI REALISASI INVESTASI KAWASAN EKONOMI KHUSUS (KEK) DI KAWASAN PERDAGANGAN DAN PELABUHAN BEBAS BATAM (KPBPBB)"
        visualName={visualMeta.name}
        visualIcon={<BarChart3 className="w-3.5 h-3.5 text-indigo-600" />}
        attributes={visualMeta.attrs}
        classification="TERBUKA"
        periode="PERTRIWULAN"
        rightControls={
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setActiveSheet('perbandingan_target_realisasi')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSheet === 'perbandingan_target_realisasi'
                  ? 'bg-white text-blue-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sheet 1: Target vs Realisasi PMA & PMDN"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Target vs Realisasi</span>
            </button>

            <button
              onClick={() => setActiveSheet('tren_triwulan')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSheet === 'tren_triwulan'
                  ? 'bg-white text-blue-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sheet 2: Tren Triwulanan Q1-Q4"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Tren Triwulan</span>
            </button>

            <button
              onClick={() => setActiveSheet('tabel_kinerja')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSheet === 'tabel_kinerja'
                  ? 'bg-white text-blue-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sheet 3: Tabel Data 16 Entri"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel Rincian</span>
            </button>
          </div>
        }
        onOpenFormula={() => onOpenFormulaModal('kpi_kek_investasi')}
      />

      {/* TOP KPI CARDS: TARGET vs REALISASI INVESTASI (PMA vs PMDN) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
        {/* Card 1: TOTAL INVESTASI (Target vs Realisasi) */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Total Investasi KEK
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                PMA + PMDN
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                {formatRupiah(grandTotalRealisasi)}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
              <span>Target: <strong>{formatRupiah(grandTotalTarget)}</strong></span>
              <span className={`font-mono font-bold ${grandCapaianPct >= 100 ? 'text-emerald-700' : 'text-blue-700'}`}>
                {grandCapaianPct.toFixed(1)}%
              </span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                grandCapaianPct >= 100 ? 'bg-emerald-600' : 'bg-blue-600'
              }`}
              style={{ width: `${Math.min(100, grandCapaianPct)}%` }}
            />
          </div>
        </div>

        {/* Card 2: INVESTASI PMA (Penanaman Modal Asing) */}
        <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-sky-700" />
                <span className="text-[11px] font-bold text-sky-900 uppercase tracking-wider">
                  Investasi PMA (Asing)
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-sky-200/80 text-sky-900">
                Porsi: {((totalPmaRealisasi / (grandTotalRealisasi || 1)) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black font-mono text-sky-950">
                {formatRupiah(totalPmaRealisasi)}
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-1 flex items-center justify-between">
              <span>Target: <strong>{formatRupiah(targetPmaTahunan)}</strong></span>
              <span className="font-mono font-bold text-sky-800">
                {capaianPmaPct.toFixed(1)}% Capaian
              </span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-sky-200/80 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-sky-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, capaianPmaPct)}%` }}
            />
          </div>
        </div>

        {/* Card 3: INVESTASI PMDN (Modal Dalam Negeri) */}
        <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-indigo-700" />
                <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider">
                  Investasi PMDN (Dalam Negeri)
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-200/80 text-indigo-900">
                Porsi: {((totalPmdnRealisasi / (grandTotalRealisasi || 1)) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black font-mono text-indigo-950">
                {formatRupiah(totalPmdnRealisasi)}
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-1 flex items-center justify-between">
              <span>Target: <strong>{formatRupiah(targetPmdnTahunan)}</strong></span>
              <span className="font-mono font-bold text-indigo-800">
                {capaianPmdnPct.toFixed(1)}% Capaian
              </span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-indigo-200/80 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, capaianPmdnPct)}%` }}
            />
          </div>
        </div>
      </div>

      {/* SHEET SWAP CONTENT */}
      {activeSheet === 'perbandingan_target_realisasi' && (
        <div className="space-y-4">
          {/* Grouped Comparison Chart per KEK */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Komparasi Target vs Realisasi Investasi Berdasarkan Jenis (PMA & PMDN) per Kawasan KEK
                </h3>
                <p className="text-[11px] text-slate-500">
                  Membandingkan target investasi terhadap realisasi modal asing (PMA) dan modal dalam negeri (PMDN) di setiap KEK
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-slate-300 border border-slate-400" />
                  <span className="text-slate-600 font-medium">Target Investasi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-sky-600" />
                  <span className="text-slate-700 font-bold">Realisasi PMA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-indigo-600" />
                  <span className="text-slate-700 font-bold">Realisasi PMDN</span>
                </div>
              </div>
            </div>

            {/* List of KEK Cards with Dual Progress Bars */}
            <div className="space-y-4">
              {kekBreakdown.map((kek) => {
                const targetMax = Math.max(kek.target, kek.totalReal, 1);
                const targetPct = (kek.target / targetMax) * 100;
                const pmaPct = (kek.pmaReal / targetMax) * 100;
                const pmdnPct = (kek.pmdnReal / targetMax) * 100;

                return (
                  <div
                    key={kek.nama}
                    className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2.5 shadow-2xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{kek.nama}</span>
                        <div className="flex items-center gap-2 mt-0.5 text-slate-500 text-[11px]">
                          <span>
                            Target: <strong className="text-slate-700">{formatRupiah(kek.target)}</strong>
                          </span>
                          <span>•</span>
                          <span>
                            Realisasi: <strong className="text-slate-900">{formatRupiah(kek.totalReal)}</strong>
                          </span>
                          {kek.pmaReal > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-sky-700 font-semibold">PMA: {formatRupiah(kek.pmaReal)}</span>
                            </>
                          )}
                          {kek.pmdnReal > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-indigo-700 font-semibold">PMDN: {formatRupiah(kek.pmdnReal)}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono text-xs font-bold ${
                            kek.capaianPct >= 100
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : kek.capaianPct >= 20
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {kek.capaianPct.toFixed(1)}% Capaian
                        </span>
                      </div>
                    </div>

                    {/* Dual Comparative Bar: Bar 1 Target, Bar 2 Realisasi (PMA + PMDN stacked) */}
                    <div className="space-y-1">
                      {/* Realisasi Bar (PMA + PMDN) */}
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="w-14 shrink-0 font-medium">Realisasi</span>
                        <div className="flex-1 bg-slate-100 rounded-md h-4 overflow-hidden flex shadow-inner border border-slate-200">
                          {kek.pmaReal > 0 && (
                            <div
                              className="bg-sky-600 hover:bg-sky-500 transition-all flex items-center justify-center text-[9.5px] font-bold text-white"
                              style={{ width: `${pmaPct}%` }}
                              title={`PMA: ${formatRupiah(kek.pmaReal)}`}
                            >
                              {pmaPct > 15 && `PMA ${formatShortRupiah(kek.pmaReal)}`}
                            </div>
                          )}
                          {kek.pmdnReal > 0 && (
                            <div
                              className="bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center text-[9.5px] font-bold text-white"
                              style={{ width: `${pmdnPct}%` }}
                              title={`PMDN: ${formatRupiah(kek.pmdnReal)}`}
                            >
                              {pmdnPct > 12 && `PMDN ${formatShortRupiah(kek.pmdnReal)}`}
                            </div>
                          )}
                        </div>
                        <span className="w-20 text-right font-mono font-bold text-slate-800 text-[11px]">
                          {formatShortRupiah(kek.totalReal)}
                        </span>
                      </div>

                      {/* Target Reference Bar */}
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="w-14 shrink-0 font-medium">Target</span>
                        <div className="flex-1 bg-slate-100 rounded-md h-2.5 overflow-hidden flex border border-slate-200">
                          <div
                            className="bg-slate-400 h-full rounded-xs transition-all"
                            style={{ width: `${targetPct}%` }}
                            title={`Target: ${formatRupiah(kek.target)}`}
                          />
                        </div>
                        <span className="w-20 text-right font-mono text-slate-500 text-[10px]">
                          {formatShortRupiah(kek.target)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeSheet === 'tren_triwulan' && (
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Dinamika Realisasi Investasi PMA vs PMDN Per Triwulan (Q1–Q4 TA 2025)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Perbandingan nominal realisasi PMA (Modal Asing) dan PMDN (Modal Dalam Negeri) terhadap benchmark target triwulan
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-sky-600" />
                  <span className="font-semibold text-slate-700">PMA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-indigo-600" />
                  <span className="font-semibold text-slate-700">PMDN</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-slate-400" />
                  <span className="font-medium text-slate-500">Target Rata-rata</span>
                </div>
              </div>
            </div>

            {/* Quarterly Bars */}
            <div className="space-y-4">
              {quarterBreakdown.map((q) => {
                const pmaWidth = (q.pmaReal / maxQuarterVal) * 100;
                const pmdnWidth = (q.pmdnReal / maxQuarterVal) * 100;
                const targetWidth = (q.quarterTarget / maxQuarterVal) * 100;

                return (
                  <div key={q.triwulan} className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-900 text-white font-bold font-mono text-[10px]">
                          {q.triwulan}
                        </span>
                        <span className="font-bold text-slate-800">{q.triwulanNama} 2025</span>
                        <span className="text-[11px] text-slate-500 hidden sm:inline">
                          (Target Q: {formatRupiah(q.quarterTarget)})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-900 font-black text-xs">
                          {formatRupiah(q.totalReal)}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            q.capaianPct >= 100
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {q.capaianPct.toFixed(1)}% Capaian
                        </span>
                      </div>
                    </div>

                    {/* Stacked Proportional Bar */}
                    <div className="h-5 bg-slate-100 rounded-md overflow-hidden flex shadow-inner border border-slate-200">
                      {q.pmaReal > 0 && (
                        <div
                          className="bg-sky-600 hover:bg-sky-500 transition-all flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ width: `${pmaWidth}%` }}
                          title={`${q.triwulan} PMA: ${formatRupiah(q.pmaReal)}`}
                        >
                          {pmaWidth > 15 && `PMA: ${formatShortRupiah(q.pmaReal)}`}
                        </div>
                      )}
                      {q.pmdnReal > 0 && (
                        <div
                          className="bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ width: `${pmdnWidth}%` }}
                          title={`${q.triwulan} PMDN: ${formatRupiah(q.pmdnReal)}`}
                        >
                          {pmdnWidth > 10 && `PMDN: ${formatShortRupiah(q.pmdnReal)}`}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeSheet === 'tabel_kinerja' && (
        <div className="space-y-3">
          {/* Controls Bar for Table */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Filter Jenis:
              </span>
              <button
                onClick={() => setSelectedFilterJenis('ALL')}
                className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer ${
                  selectedFilterJenis === 'ALL'
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                Semua ({investasiList.length})
              </button>
              <button
                onClick={() => setSelectedFilterJenis('PMA')}
                className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer ${
                  selectedFilterJenis === 'PMA'
                    ? 'bg-sky-700 text-white'
                    : 'bg-white text-sky-800 border border-sky-200'
                }`}
              >
                PMA Saja ({pmaEntries.length})
              </button>
              <button
                onClick={() => setSelectedFilterJenis('PMDN')}
                className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer ${
                  selectedFilterJenis === 'PMDN'
                    ? 'bg-indigo-700 text-white'
                    : 'bg-white text-indigo-800 border border-indigo-200'
                }`}
              >
                PMDN Saja ({pmdnEntries.length})
              </button>
            </div>

            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded border border-slate-300 cursor-pointer shadow-2xs text-xs"
              title="Unduh Data Realisasi Investasi (.CSV)"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Table displaying all official attributes */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#0F1E36] text-white text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3 w-12 text-center">No</th>
                  <th className="py-2.5 px-3">Tahun</th>
                  <th className="py-2.5 px-3">Triwulan</th>
                  <th className="py-2.5 px-3">Nama Kawasan Ekonomi Khusus</th>
                  <th className="py-2.5 px-3">Jenis Investasi</th>
                  <th className="py-2.5 px-3 text-right">Target Investasi</th>
                  <th className="py-2.5 px-3 text-right">Realisasi Investasi</th>
                  <th className="py-2.5 px-3 text-center">Capaian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {displayList.map((row, idx) => {
                  const pct = row.targetInvestasi > 0 ? (row.realisasiInvestasi / row.targetInvestasi) * 100 : 0;
                  const isPma = row.jenisInvestasi === 'PMA';

                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      }`}
                    >
                      <td className="py-2 px-3 text-center font-mono text-slate-400 font-bold">
                        {idx + 1}
                      </td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-700">{row.tahun}</td>
                      <td className="py-2 px-3">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-slate-800 font-bold">
                          Q{row.triwulan}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-bold text-slate-900">{row.namaKek}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded font-mono font-bold text-[10.5px] ${
                            isPma
                              ? 'bg-sky-100 text-sky-800 border border-sky-300'
                              : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                          }`}
                        >
                          {row.jenisInvestasi}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-600">
                        {formatRupiah(row.targetInvestasi)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                        {formatRupiah(row.realisasiInvestasi)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded font-mono text-[10.5px] font-bold ${
                            pct >= 100
                              ? 'bg-emerald-100 text-emerald-800'
                              : pct > 0
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {pct.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
