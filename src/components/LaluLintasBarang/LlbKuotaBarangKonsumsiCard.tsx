import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Table as TableIcon,
  PackageCheck,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  DollarSign,
  Layers,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
} from 'lucide-react';
import {
  KUOTA_BARANG_KONSUMSI_DATA,
  KuotaBarangKonsumsiItem,
} from '../../data/laluLintasBarangData';
import { LlbVisualHeader } from './LlbVisualHeader';
import { LlbDatasetSourceBadge } from './LlbDatasetSourceBadge';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface LlbKuotaBarangKonsumsiCardProps {
  onOpenFormulaModal?: (metricId: string) => void;
}

export const LlbKuotaBarangKonsumsiCard: React.FC<LlbKuotaBarangKonsumsiCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [displayMode, setDisplayMode] = useState<'chart' | 'table'>('chart');
  const [filterKomoditas, setFilterKomoditas] = useState<string>('ALL');
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  // Aggregations
  const totalKuota = useMemo(
    () => KUOTA_BARANG_KONSUMSI_DATA.reduce((acc, c) => acc + c.kuota, 0),
    []
  );
  const totalRealisasi = useMemo(
    () => KUOTA_BARANG_KONSUMSI_DATA.reduce((acc, c) => acc + c.realisasi, 0),
    []
  );
  const totalSisaKuota = totalKuota - totalRealisasi;
  const persenTotalRealisasi = Math.round((totalRealisasi / totalKuota) * 1000) / 10;
  const totalNilaiEkonomi = useMemo(
    () => KUOTA_BARANG_KONSUMSI_DATA.reduce((acc, c) => acc + c.nilaiEkonomiRp, 0),
    []
  );

  const filteredData = useMemo(() => {
    if (filterKomoditas === 'ALL') return KUOTA_BARANG_KONSUMSI_DATA;
    return KUOTA_BARANG_KONSUMSI_DATA.filter((k) => k.id === filterKomoditas);
  }, [filterKomoditas]);

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 mb-4 shadow-2xs">
      {/* 1. Standardized Visual Header */}
      <LlbVisualHeader
        datasetNumber={2}
        pdfPages="Hal. 8"
        classification="TERTUTUP"
        periode="JIKA UPDATE"
        title="DATA REALISASI KUOTA INDUK BARANG KONSUMSI"
        visualName="Bullet Bar Chart & Matriks Realisasi Kuota Induk Bahan Pangan"
        attributes={[
          'ID',
          'KODE HS',
          'KUOTA',
          'SATUAN',
          'NILAI',
          'NO SK',
          'TANGGAL SK',
        ]}
        onOpenFormula={() => onOpenFormulaModal?.('llb-kuota')}
        rightControls={
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
              <button
                onClick={() => setDisplayMode('chart')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  displayMode === 'chart'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3 h-3" />
                <span>Grafis (Bullet)</span>
              </button>
              <button
                onClick={() => setDisplayMode('table')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  displayMode === 'table'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3 h-3" />
                <span>Tabel SK</span>
              </button>
            </div>

            <button
              onClick={() => setShowFormulaDetails(!showFormulaDetails)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                showFormulaDetails
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Tampilkan Rumus & Calculated Field Kuota"
            >
              <HelpCircle className="w-3 h-3 text-amber-600" />
              <span>Formula</span>
              {showFormulaDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        }
      />

      {/* 2. Tableau Shelves Badge (Compact) */}
      <div className="my-1.5">
        <TableauShelvesBadge
          showMe="Show Me #2 (Horizontal Bullet Bar) + Dual Axis [Realisasi] vs [Kuota]"
          columns="SUM([Realisasi]), SUM([Kuota]), SUM([Nilai Ekonomi])"
          rows="[Kode HS], [Komoditas]"
          filters="[Tahun]=2026, [Sifat]='TERTUTUP'"
          detail="Visualisasi Standar Tableau Pengendalian Pasokan Sembako Bebas Bea Masuk KPBPBB Batam (Dataset No. 2)"
        />
      </div>

      {/* 3. Collapsible Formula Box */}
      {showFormulaDetails && (
        <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-lg my-2 text-xs text-slate-800 animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-amber-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              Kalkulasi Serapan Kuota &amp; Nilai Ekonomi Devisa
            </span>
            {onOpenFormulaModal && (
              <button
                onClick={() => onOpenFormulaModal('llb_izin_perdagangan')}
                className="text-[#1F4E79] hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <span>Buka Detail DLLB-04</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[10.5px]">
            <div className="bg-white p-2 rounded border border-amber-200">
              <span className="text-slate-500 block mb-0.5">// Persentase Serapan Kuota (%)</span>
              <code className="text-emerald-700 font-bold">
                (SUM([Realisasi]) / SUM([Kuota Alokasi SK])) * 100
              </code>
            </div>
            <div className="bg-white p-2 rounded border border-amber-200">
              <span className="text-slate-500 block mb-0.5">// Estimasi Nilai Ekonomi Devisa (Rp)</span>
              <code className="text-[#1F4E79] font-bold">
                SUM([Realisasi Ton] * [Harga Patokan CIF US$] * [Kurs JISDOR])
              </code>
            </div>
          </div>
        </div>
      )}

      {/* 4. Dataset Source Explanation Badge */}
      <LlbDatasetSourceBadge
        itemNumber="2"
        datasetName="Data Realisasi Kuota Induk Barang Konsumsi"
        sifatData="TERTUTUP"
        periodeData="JIKA UPDATE"
        pdfRef="Halaman 8 (No. 2)"
        atributList={[
          'ID',
          'KODE HS',
          'KUOTA',
          'SATUAN',
          'NILAI',
          'NO SK',
          'TANGGAL SK',
        ]}
      />

      {/* Summary Highlights (Compact) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-2.5">
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-2.5">
          <span className="text-[10.5px] font-semibold text-emerald-900 block">
            Total Realisasi Kuota (Serapan)
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg font-black font-mono text-emerald-950">
              {totalRealisasi.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-emerald-800">/ {totalKuota.toLocaleString('id-ID')} Ton/KL</span>
          </div>
          <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${persenTotalRealisasi}%` }}
            />
          </div>
          <span className="text-[10px] text-emerald-700 font-mono mt-1 block">
            Capaian: {persenTotalRealisasi}% kuota terserap
          </span>
        </div>

        <div className="bg-blue-50/70 border border-blue-200/80 rounded-lg p-2.5">
          <span className="text-[10.5px] font-semibold text-blue-900 block">
            Estimasi Nilai Ekonomi Devisa
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg font-black font-mono text-blue-950">
              Rp {(totalNilaiEkonomi / 1000000000000).toFixed(2)}
            </span>
            <span className="text-[11px] text-blue-800">Triliun</span>
          </div>
          <span className="text-[10px] text-blue-700 mt-1 block">
            CIF Pelabuhan Batu Ampar &amp; Kabil
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
          <span className="text-[10.5px] font-semibold text-slate-800 block">
            Sisa Kuota Belum Terealisasi
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg font-black font-mono text-slate-900">
              {totalSisaKuota.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-slate-600">Ton/KL ({(100 - persenTotalRealisasi).toFixed(1)}%)</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Alokasi cadangan s/d Q4 2026
          </span>
        </div>
      </div>

      {/* 5. CONTENT: GRAFIS MODE (Bullet Horizontal Bars - Compact & Tight) */}
      {displayMode === 'chart' && (
        <div className="space-y-2.5 mt-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3 h-3 text-[#1F4E79]" />
              Visual Alokasi Kuota vs Realisasi (Bullet Bars)
            </h4>
            <span className="text-[10px] text-slate-500 font-mono">
              Navy = Realisasi • Biru Muda = Kuota SK
            </span>
          </div>

          <div className="space-y-2">
            {filteredData.map((item) => {
              const maxScale = item.kuota * 1.05;
              const kuotaWidth = (item.kuota / maxScale) * 100;
              const realisasiWidth = (item.realisasi / maxScale) * 100;
              const isAman = item.statusKecukupan === 'Aman';

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-2xs hover:border-[#1F4E79] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono font-bold text-[9.5px] border border-slate-200">
                          HS {item.kodeHs}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900">{item.komoditas}</h5>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ({item.importirAktif} Importir)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[9.5px] font-bold flex items-center gap-0.5 ${
                          isAman
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {isAman ? <CheckCircle2 className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
                        {item.statusKecukupan}
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-mono font-black text-[#1F4E79] block">
                          {item.realisasi.toLocaleString('id-ID')} / {item.kuota.toLocaleString('id-ID')} {item.satuan}
                        </span>
                        <span className="text-[9.5px] font-mono text-emerald-700 font-bold block">
                          {item.persentaseRealisasi}% (Rp {(item.nilaiEkonomiRp / 1000000000).toFixed(1)} M)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet Bar Container */}
                  <div className="relative w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-blue-100 rounded-full border-r border-blue-400"
                      style={{ width: `${kuotaWidth}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-[#1F4E79] rounded-full transition-all duration-500"
                      style={{ width: `${realisasiWidth}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[9.5px] text-slate-500 mt-1 font-mono">
                    <span>Sisa: {item.sisaKuota.toLocaleString('id-ID')} {item.satuan}</span>
                    <span>SK: {item.noSk} ({item.tanggalSk})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TABEL DETAIL MODE */}
      {displayMode === 'table' && (
        <div className="mt-2.5 border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
          <div className="overflow-x-auto max-h-[260px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#0B1728] text-white text-[10.5px] font-semibold sticky top-0 z-10">
                <tr>
                  <th className="py-2 px-2.5">ID &amp; HS</th>
                  <th className="py-2 px-2.5">Komoditas</th>
                  <th className="py-2 px-2.5 text-right">Kuota</th>
                  <th className="py-2 px-2.5 text-right">Realisasi</th>
                  <th className="py-2 px-2.5 text-right">Sisa</th>
                  <th className="py-2 px-2.5 text-right">Nilai Devisa</th>
                  <th className="py-2 px-2.5">No SK</th>
                  <th className="py-2 px-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                {KUOTA_BARANG_KONSUMSI_DATA.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-2.5 font-mono">
                      <span className="font-bold text-[#1F4E79] block">{row.id}</span>
                      <span className="text-[10px] text-slate-500">{row.kodeHs}</span>
                    </td>
                    <td className="py-2 px-2.5">
                      <span className="font-bold text-slate-900 block">{row.komoditas}</span>
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono font-bold text-slate-800">
                      {row.kuota.toLocaleString('id-ID')} <span className="text-[10px] font-normal">{row.satuan}</span>
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono font-bold text-emerald-700">
                      {row.realisasi.toLocaleString('id-ID')} <span className="text-[10px] font-normal">({row.persentaseRealisasi}%)</span>
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono text-slate-700">
                      {row.sisaKuota.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono text-blue-900 font-semibold">
                      Rp {(row.nilaiEkonomiRp / 1000000000).toFixed(1)} M
                    </td>
                    <td className="py-2 px-2.5 font-mono text-[10px]">
                      <span className="text-slate-800 font-medium block">{row.noSk}</span>
                    </td>
                    <td className="py-2 px-2.5 text-center whitespace-nowrap">
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[9.5px] font-bold ${
                          row.statusKecukupan === 'Aman'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {row.statusKecukupan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. STRATEGIC EXECUTIVE INSIGHT & REKOMENDASI BOX */}
      <div className="mt-3 p-2.5 bg-emerald-50/60 border-l-4 border-emerald-600 rounded-r-lg text-xs text-slate-800 flex items-start gap-2">
        <Lightbulb className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10.5px]">
              Wawasan Pasokan Pangan &amp; Rekomendasi Alokasi Kuota
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 font-mono">
              Ketahanan Pangan Mantap
            </span>
          </div>
          <p className="text-slate-700 text-[11px] leading-relaxed">
            Serapan 77,8% (84.060 Ton/KL) membuktikan pengendalian pasokan sembako di Batam berjalan efektif tanpa distorsi kelangkaan. Komoditas Beras (80,6%) dan Gula Pasir (76,3%) berada pada zona aman pasokan 4 bulan ke depan.
          </p>
          <div className="text-[10px] font-mono text-slate-600 pt-0.5">
            <strong>Rekomendasi Kebijakan:</strong> Tetapkan kuota penyangga Daging Sapi beku menjelang kuartal IV dan evaluasi realisasi importir kuota minimum per bulan.
          </div>
        </div>
      </div>
    </div>
  );
};
