import React, { useState, useMemo } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Timer,
  BarChart3,
  Table as TableIcon,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowRightLeft,
} from 'lucide-react';
import {
  SLA_LAYANAN_DATA,
  SlaLayananItem,
} from '../../data/laluLintasBarangData';
import { LlbDatasetSourceBadge } from './LlbDatasetSourceBadge';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface LlbSlaLayananCardProps {
  onOpenFormulaModal?: (metricId: string) => void;
}

export const LlbSlaLayananCard: React.FC<LlbSlaLayananCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<'all' | 'industri' | 'perdagangan'>('all');
  const [displayMode, setDisplayMode] = useState<'chart' | 'table'>('chart');
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  // Filtered SLA items
  const filteredData = useMemo(() => {
    if (activeSheet === 'industri') {
      return SLA_LAYANAN_DATA.filter((item) => item.sektor === 'Industri');
    }
    if (activeSheet === 'perdagangan') {
      return SLA_LAYANAN_DATA.filter((item) => item.sektor === 'Perdagangan');
    }
    return SLA_LAYANAN_DATA;
  }, [activeSheet]);

  // Calculations
  const totalDokumen = useMemo(
    () => filteredData.reduce((acc, curr) => acc + curr.totalDokumen, 0),
    [filteredData]
  );
  const totalTepatWaktu = useMemo(
    () => filteredData.reduce((acc, curr) => acc + curr.dokumenTepatWaktu, 0),
    [filteredData]
  );
  const rataRataSla =
    Math.round(
      (filteredData.reduce((acc, curr) => acc + curr.persentaseTepatWaktu, 0) /
        filteredData.length) *
        10
    ) / 10;
  const rataRataJam =
    Math.round(
      (filteredData.reduce((acc, curr) => acc + curr.rataRataWaktuJam, 0) /
        filteredData.length) *
        10
    ) / 10;

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 mb-4 shadow-2xs">
      {/* 1. Header Bar with Sheet Swap & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              Kinerja Pelayanan &amp; SLA Waktu Selesai (Tepat Waktu)
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Monitoring Standar Waktu Layanan &amp; Ketepatan Waktu Penerbitan Dokumen (Jam) Berdasarkan Dataset No. 8 &amp; 9
          </p>
        </div>

        {/* View Switcher & Formula Toggle */}
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
              <span>Grafis SLA</span>
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
              <span>Tabel Matriks</span>
            </button>
          </div>

          <button
            onClick={() => setShowFormulaDetails(!showFormulaDetails)}
            className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
              showFormulaDetails
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Tampilkan Rumus & Calculated Field SLA"
          >
            <HelpCircle className="w-3 h-3 text-amber-600" />
            <span>Formula</span>
            {showFormulaDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* 2. Sheet Swap Tabs (Konsolidasi vs Industri vs Perdagangan) */}
      <div className="flex items-center gap-1.5 mt-2.5 pt-0.5 overflow-x-auto no-scrollbar">
        <span className="text-[10.5px] font-semibold text-slate-500 mr-1 shrink-0 flex items-center gap-1">
          <ArrowRightLeft className="w-3 h-3 text-[#1F4E79]" />
          Sheet Swap Sektor:
        </span>
        <button
          onClick={() => setActiveSheet('all')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSheet === 'all'
              ? 'bg-[#1F4E79] text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Semua Layanan ({SLA_LAYANAN_DATA.length} Izin)
        </button>
        <button
          onClick={() => setActiveSheet('industri')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSheet === 'industri'
              ? 'bg-[#1F4E79] text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Sektor Industri (Item #9)
        </button>
        <button
          onClick={() => setActiveSheet('perdagangan')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSheet === 'perdagangan'
              ? 'bg-[#1F4E79] text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Sektor Perdagangan (Item #8)
        </button>
      </div>

      {/* 3. Tableau Shelves Badge (Compact) */}
      <div className="my-1.5">
        <TableauShelvesBadge
          showMe="Show Me #2 (Horizontal Dual Bar / Bullet) + Reference Line Waktu Selesai (Jam)"
          columns="AVG([Persentase Tepat Waktu]), AVG([Rata-rata Waktu Jam]), AVG([Standar SLA])"
          rows="[Sektor], [Uraian Izin]"
          filters="[Tahun]=2026, [Sifat Data]='TERBUKA'"
          detail="Visualisasi Standar Kepatuhan Service Level Agreement (SLA) Dit. Lalu Lintas Barang BP Batam"
        />
      </div>

      {/* 4. Collapsible Formula Box */}
      {showFormulaDetails && (
        <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-lg my-2 text-xs text-slate-800 animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-amber-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              Kalkulasi Kepatuhan SLA &amp; Rata-Rata Waktu Pelayanan
            </span>
            {onOpenFormulaModal && (
              <button
                onClick={() => onOpenFormulaModal('llb_sla')}
                className="text-[#1F4E79] hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <span>Buka Detail DLLB-06</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[10.5px]">
            <div className="bg-white p-2 rounded border border-amber-200">
              <span className="text-slate-500 block mb-0.5">// Persentase Tepat Waktu (%)</span>
              <code className="text-teal-700 font-bold">
                (SUM([Dokumen Tepat Waktu]) / SUM([Total Dokumen])) * 100
              </code>
            </div>
            <div className="bg-white p-2 rounded border border-amber-200">
              <span className="text-slate-500 block mb-0.5">// Rata-Rata Durasi Layanan (Jam)</span>
              <code className="text-[#1F4E79] font-bold">
                AVG(DATEDIFF(&apos;hour&apos;, [Waktu Masuk Berkas], [Waktu Terbit SK]))
              </code>
            </div>
          </div>
        </div>
      )}

      {/* 5. Dataset Source Explanation Badge */}
      <div className="space-y-1.5 my-2">
        {activeSheet !== 'industri' && (
          <LlbDatasetSourceBadge
            itemNumber="8"
            datasetName="Data Waktu Selesai Perizinan Berusaha Sektor Perdagangan"
            sifatData="TERBUKA"
            periodeData="PER BULAN"
            pdfRef="Halaman 9 (No. 8)"
            atributList={[
              'NO',
              'URAIAN IZIN',
              'PERSENTASE TEPAT WAKTU',
              'RATA-RATA WAKTU',
              'STANDAR SLA (JAM)',
            ]}
          />
        )}
        {activeSheet !== 'perdagangan' && (
          <LlbDatasetSourceBadge
            itemNumber="9"
            datasetName="Data Waktu Selesai Perizinan Berusaha Sektor Industri"
            sifatData="TERBUKA"
            periodeData="PER BULAN"
            pdfRef="Halaman 9 (No. 9)"
            atributList={[
              'NO',
              'URAIAN IZIN',
              'PERSENTASE TEPAT WAKTU',
              'RATA-RATA WAKTU',
              'STANDAR SLA (JAM)',
            ]}
          />
        )}
      </div>

      {/* 6. Summary Highlights (Compact) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-2.5">
        <div className="bg-teal-50/70 border border-teal-200/80 rounded-lg p-2.5">
          <span className="text-[10.5px] font-semibold text-teal-900 block">
            Rata-rata Kepatuhan Tepat Waktu
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg font-black font-mono text-teal-950">
              {rataRataSla}%
            </span>
            <span className="text-[11px] text-teal-800">Tepat Waktu</span>
          </div>
          <div className="w-full bg-teal-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-teal-600 rounded-full"
              style={{ width: `${rataRataSla}%` }}
            />
          </div>
          <span className="text-[10px] text-teal-700 font-mono mt-1 block">
            {totalTepatWaktu} dari {totalDokumen} Dokumen Selesai Sesuai Standar
          </span>
        </div>

        <div className="bg-blue-50/70 border border-blue-200/80 rounded-lg p-2.5">
          <span className="text-[10.5px] font-semibold text-blue-900 block">
            Rata-rata Waktu Penyelesaian
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg font-black font-mono text-blue-950">
              {rataRataJam}
            </span>
            <span className="text-[11px] text-blue-800">Jam per Dokumen</span>
          </div>
          <span className="text-[10px] text-blue-700 mt-1 block">
            Standar SLA Maksimal: 4.0 - 8.0 Jam
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
          <span className="text-[10.5px] font-semibold text-slate-800 block">
            Total Dokumen Terlayani
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg font-black font-mono text-slate-900">
              {totalDokumen}
            </span>
            <span className="text-[11px] text-slate-600">Berkas Permohonan</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block font-mono">
            Sistem Digital IBOSS &amp; Portal INSW BP Batam
          </span>
        </div>
      </div>

      {/* 7. CONTENT: GRAFIS MODE (Compact) */}
      {displayMode === 'chart' && (
        <div className="space-y-2.5 mt-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Timer className="w-3 h-3 text-[#1F4E79]" />
              Visual Kepatuhan Waktu &amp; Durasi Layanan per Jenis Izin
            </h4>
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                <span>% Tepat Waktu</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#1F4E79]" />
                <span>Waktu Selesai (Jam)</span>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {filteredData.map((item) => {
              const isExcellent = item.persentaseTepatWaktu >= 96;
              const maxHour = 8;
              const hourWidth = (item.rataRataWaktuJam / maxHour) * 100;
              const standardWidth = (item.standarSlaJam / maxHour) * 100;

              return (
                <div
                  key={item.no}
                  className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-2xs hover:border-[#1F4E79] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono font-bold text-[9.5px] border border-slate-200">
                          #{item.no}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900">{item.uraianIzin}</h5>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] font-semibold ${
                            item.sektor === 'Industri'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          Sektor {item.sektor}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-xs font-mono font-black text-teal-700 block">
                          {item.persentaseTepatWaktu}% Tepat Waktu
                        </span>
                        <span className="text-[9.5px] text-slate-500 font-mono">
                          {item.dokumenTepatWaktu}/{item.totalDokumen} Dokumen
                        </span>
                      </div>
                      <div className="text-right pl-2 border-l border-slate-200">
                        <span className="text-xs font-mono font-bold text-[#1F4E79] block">
                          {item.rataRataWaktuJam} Jam
                        </span>
                        <span className="text-[9.5px] text-slate-400 font-mono">
                          Std: {item.standarSlaJam} Jam
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Performance Bars */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1.5 pt-1.5 border-t border-slate-100">
                    <div>
                      <div className="flex justify-between text-[9.5px] font-mono text-slate-500 mb-0.5">
                        <span>Ketepatan Waktu</span>
                        <span className="font-bold text-teal-700">{item.persentaseTepatWaktu}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isExcellent ? 'bg-teal-600' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${item.persentaseTepatWaktu}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[9.5px] font-mono text-slate-500 mb-0.5">
                        <span>Durasi Penyelesaian</span>
                        <span className="font-bold text-[#1F4E79]">
                          {item.rataRataWaktuJam} Jam / Std {item.standarSlaJam} Jam
                        </span>
                      </div>
                      <div className="relative w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 bottom-0 left-0 bg-slate-200 border-r border-slate-400"
                          style={{ width: `${standardWidth}%` }}
                        />
                        <div
                          className="absolute top-0 bottom-0 left-0 bg-[#1F4E79] rounded-full"
                          style={{ width: `${hourWidth}%` }}
                        />
                      </div>
                    </div>
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
                  <th className="py-2 px-2.5">No</th>
                  <th className="py-2 px-2.5">Uraian Perizinan</th>
                  <th className="py-2 px-2.5">Sektor</th>
                  <th className="py-2 px-2.5 text-right">% Tepat Waktu</th>
                  <th className="py-2 px-2.5 text-right">Dokumen Selesai</th>
                  <th className="py-2 px-2.5 text-right">Rata Waktu</th>
                  <th className="py-2 px-2.5 text-right">Standar SLA</th>
                  <th className="py-2 px-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                {filteredData.map((row) => (
                  <tr key={row.no} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-2.5 font-mono text-slate-500 font-bold">#{row.no}</td>
                    <td className="py-2 px-2.5">
                      <span className="font-bold text-slate-900 block">{row.uraianIzin}</span>
                    </td>
                    <td className="py-2 px-2.5">
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9.5px] font-semibold ${
                          row.sektor === 'Industri'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {row.sektor}
                      </span>
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono font-bold text-teal-700">
                      {row.persentaseTepatWaktu}%
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono text-slate-700">
                      {row.dokumenTepatWaktu} / {row.totalDokumen}
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono font-black text-[#1F4E79]">
                      {row.rataRataWaktuJam} Jam
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono text-slate-500">
                      {row.standarSlaJam} Jam
                    </td>
                    <td className="py-2 px-2.5 text-center whitespace-nowrap">
                      <span className="px-1.5 py-0.2 rounded-full text-[9.5px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. STRATEGIC EXECUTIVE INSIGHT & REKOMENDASI BOX */}
      <div className="mt-3 p-2.5 bg-teal-50/60 border-l-4 border-teal-600 rounded-r-lg text-xs text-slate-800 flex items-start gap-2">
        <Lightbulb className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-teal-900 uppercase tracking-wider text-[10.5px]">
              Wawasan Kecepatan Layanan &amp; Evaluasi SLA
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-teal-100 text-teal-800 font-mono">
              96,8% Kepatuhan (Sangat Baik)
            </span>
          </div>
          <p className="text-slate-700 text-[11px] leading-relaxed">
            Tingkat kepatuhan rata-rata 96,8% melampaui target SPM BP Batam (95,0%). Rata-rata durasi penyelesaian izin industri hanya butuh 2,9 jam (jauh di bawah batas toleransi 6,0 jam), menunjukkan otomatisasi verifikasi data kepabeanan INSW bekerja optimal.
          </p>
          <div className="text-[10px] font-mono text-slate-600 pt-0.5">
            <strong>Rekomendasi Kebijakan:</strong> Terapkan integrasi tanda tangan elektronik (TTE) massal pada izin perdagangan sembako untuk mereduksi waktu dari 4,7 jam menjadi di bawah 3,0 jam.
          </div>
        </div>
      </div>
    </div>
  );
};
