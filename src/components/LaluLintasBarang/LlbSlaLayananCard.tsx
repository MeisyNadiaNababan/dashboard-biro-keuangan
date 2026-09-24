import React, { useState, useMemo } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Timer,
  BarChart3,
  Table as TableIcon,
  HelpCircle,
  TrendingUp,
  ArrowRightLeft,
  Factory,
  ShoppingBag,
  Download,
  ShieldCheck,
} from 'lucide-react';
import {
  DATA_SLA_INDUSTRI,
  DATA_SLA_PERDAGANGAN,
  SlaIndustriItem,
  SlaPerdaganganItem,
} from '../../data/laluLintasBarangData';
import { LlbVisualHeader } from './LlbVisualHeader';

interface LlbSlaLayananCardProps {
  onOpenFormulaModal?: (metricId: string) => void;
}

export const LlbSlaLayananCard: React.FC<LlbSlaLayananCardProps> = ({
  onOpenFormulaModal,
}) => {
  // Sheet: 'komparasi' | 'industri' | 'perdagangan' | 'tabel'
  const [activeSheet, setActiveSheet] = useState<'komparasi' | 'industri' | 'perdagangan' | 'tabel'>('komparasi');

  // Aggregations Industri (Dataset 9)
  const totalDokumenIndustri = useMemo(
    () => DATA_SLA_INDUSTRI.reduce((acc, curr) => acc + curr.jumlahDokumen, 0),
    []
  );
  const avgSlaIndustri = useMemo(
    () =>
      Math.round(
        (DATA_SLA_INDUSTRI.reduce((acc, curr) => acc + curr.persentaseLayananTepatWaktu, 0) /
          DATA_SLA_INDUSTRI.length) *
          10
      ) / 10,
    []
  );
  const avgJamIndustri = useMemo(
    () =>
      Math.round(
        (DATA_SLA_INDUSTRI.reduce(
          (acc, curr) => acc + curr.rataRataWaktuPenyelesaianDokumenJam,
          0
        ) /
          DATA_SLA_INDUSTRI.length) *
          10
      ) / 10,
    []
  );

  // Aggregations Perdagangan (Dataset 8)
  const totalDokumenPerdagangan = useMemo(
    () => DATA_SLA_PERDAGANGAN.reduce((acc, curr) => acc + curr.jumlahDokumen, 0),
    []
  );
  const avgSlaPerdagangan = useMemo(
    () =>
      Math.round(
        (DATA_SLA_PERDAGANGAN.reduce(
          (acc, curr) => acc + curr.persentaseLayananTepatWaktu,
          0
        ) /
          DATA_SLA_PERDAGANGAN.length) *
          10
      ) / 10,
    []
  );
  const avgJamPerdagangan = useMemo(
    () =>
      Math.round(
        (DATA_SLA_PERDAGANGAN.reduce(
          (acc, curr) => acc + curr.rataRataWaktuPenyelesaianDokumenJam,
          0
        ) /
          DATA_SLA_PERDAGANGAN.length) *
          10
      ) / 10,
    []
  );

  const currentDatasetNumber =
    activeSheet === 'perdagangan' ? 8 : activeSheet === 'industri' ? 9 : 8;

  const currentTitle =
    activeSheet === 'perdagangan'
      ? 'PERSENTASE PELAYANAN LALU LINTAS BARANG PERDAGANGAN YANG SELESAI TEPAT WAKTU'
      : activeSheet === 'industri'
      ? 'PERSENTASE PELAYANAN LALU LINTAS BARANG INDUSTRI YANG SELESAI TEPAT WAKTU'
      : 'KINERJA KETEPATAN WAKTU & SLA LAYANAN LALU LINTAS BARANG (INDUSTRI & PERDAGANGAN)';

  const exportCsv = () => {
    let csv = 'No,Sektor,Uraian Izin,Persentase Layanan Tepat Waktu (%),Rata-rata Waktu Penyelesaian (Jam),Target SLA (Jam),Jumlah Dokumen\n';
    DATA_SLA_INDUSTRI.forEach((r) => {
      csv += `${r.no},"Industri","${r.uraianIzin}",${r.persentaseLayananTepatWaktu}%,${r.rataRataWaktuPenyelesaianDokumenJam},${r.targetSlaJam},${r.jumlahDokumen}\n`;
    });
    DATA_SLA_PERDAGANGAN.forEach((r) => {
      csv += `${r.no},"Perdagangan","${r.uraianIzin}",${r.persentaseLayananTepatWaktu}%,${r.rataRataWaktuPenyelesaianDokumenJam},${r.targetSlaJam},${r.jumlahDokumen}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'kinerja_sla_llb_industri_perdagangan.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 mb-4 shadow-2xs">
      {/* 1. Standardized Visual Header */}
      <LlbVisualHeader
        datasetNumber={currentDatasetNumber}
        pdfPages="Hal. 9 (DS 8 & 9)"
        classification="TERBUKA"
        periode="PERBULAN"
        title={currentTitle}
        visualName="Visual Gauge & Dual-Metric: Persentase Tepat Waktu (%) vs Waktu Penyelesaian (Jam)"
        attributes={[
          'NO',
          'URAIAN IZIN',
          'PERSENTASE LAYANAN TEPAT WAKTU',
          'RATA-RATA WAKTU PENYELESAIAN DOKUMEN (DALAM JAM)',
        ]}
        onOpenFormula={() => onOpenFormulaModal?.('llb-sla')}
        rightControls={
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Sheet Swap Controller */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
              <button
                onClick={() => setActiveSheet('komparasi')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeSheet === 'komparasi'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3 h-3" />
                <span>Komparasi Sektor</span>
              </button>
              <button
                onClick={() => setActiveSheet('industri')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeSheet === 'industri'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Factory className="w-3 h-3" />
                <span>Industri (DS 9)</span>
              </button>
              <button
                onClick={() => setActiveSheet('perdagangan')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeSheet === 'perdagangan'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShoppingBag className="w-3 h-3" />
                <span>Perdagangan (DS 8)</span>
              </button>
              <button
                onClick={() => setActiveSheet('tabel')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeSheet === 'tabel'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3 h-3" />
                <span>Tabel Lengkap</span>
              </button>
            </div>

            {/* Export CSV */}
            <button
              onClick={exportCsv}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Unduh Data SLA (CSV)"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        }
      />

      {/* 2. DUAL EXECUTIVE KPI BADGES (Industri vs Perdagangan Selesai Tepat Waktu) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Industri SLA Highlight (Dataset 9) */}
        <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
              <Factory className="w-3.5 h-3.5 text-blue-700" />
              Sektor Industri Selesai Tepat Waktu (Dataset No. 9)
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono">
              Target: 6 Jam
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-2xl font-black font-mono text-blue-950">
              {avgSlaIndustri}%
            </span>
            <span className="text-xs font-bold text-blue-800 font-mono">
              Rata-rata {avgJamIndustri} Jam
            </span>
            <span className="text-[11px] text-slate-500 font-mono ml-auto">
              {totalDokumenIndustri} Dokumen
            </span>
          </div>

          <div className="w-full bg-blue-200/80 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-blue-700 rounded-full"
              style={{ width: `${avgSlaIndustri}%` }}
            />
          </div>

          <div className="mt-2 text-[10.5px] text-blue-800 font-medium flex items-center justify-between">
            <span>✅ Memenuhi standar SLA Kemenpan-RB &amp; ISO 9001</span>
            <span className="font-mono text-slate-500">6 Jenis Layanan</span>
          </div>
        </div>

        {/* Perdagangan SLA Highlight (Dataset 8) */}
        <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
              Sektor Perdagangan Selesai Tepat Waktu (Dataset No. 8)
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
              Target: 8 Jam
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-2xl font-black font-mono text-amber-950">
              {avgSlaPerdagangan}%
            </span>
            <span className="text-xs font-bold text-amber-800 font-mono">
              Rata-rata {avgJamPerdagangan} Jam
            </span>
            <span className="text-[11px] text-slate-500 font-mono ml-auto">
              {totalDokumenPerdagangan} Dokumen
            </span>
          </div>

          <div className="w-full bg-amber-200/80 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-amber-600 rounded-full"
              style={{ width: `${avgSlaPerdagangan}%` }}
            />
          </div>

          <div className="mt-2 text-[10.5px] text-amber-800 font-medium flex items-center justify-between">
            <span>✅ Verifikasi alokasi kuota &amp; port clearance</span>
            <span className="font-mono text-slate-500">5 Jenis Layanan</span>
          </div>
        </div>
      </div>

      {/* 3. SHEET 1: KOMPARASI KINERJA INDUSTRI VS PERDAGANGAN */}
      {activeSheet === 'komparasi' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Sektor Industri Summary List */}
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/30">
            <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Factory className="w-3.5 h-3.5 text-blue-700" />
                Layanan Industri (Dataset No. 9)
              </span>
              <span className="text-[10.5px] font-bold text-blue-800 font-mono">
                Rata-rata: {avgSlaIndustri}%
              </span>
            </div>

            <div className="space-y-2">
              {DATA_SLA_INDUSTRI.map((item) => (
                <div key={item.no} className="p-2 rounded-lg bg-white border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-medium text-slate-800 truncate max-w-[70%]">
                      {item.uraianIzin}
                    </span>
                    <div className="flex items-center gap-2 font-mono shrink-0">
                      <span className="text-slate-500 text-[10px]">{item.rataRataWaktuPenyelesaianDokumenJam} Jam</span>
                      <span className="font-bold text-blue-900">{item.persentaseLayananTepatWaktu}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 rounded-full"
                      style={{ width: `${item.persentaseLayananTepatWaktu}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sektor Perdagangan Summary List */}
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/30">
            <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
                Layanan Perdagangan (Dataset No. 8)
              </span>
              <span className="text-[10.5px] font-bold text-amber-800 font-mono">
                Rata-rata: {avgSlaPerdagangan}%
              </span>
            </div>

            <div className="space-y-2">
              {DATA_SLA_PERDAGANGAN.map((item) => (
                <div key={item.no} className="p-2 rounded-lg bg-white border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-medium text-slate-800 truncate max-w-[70%]">
                      {item.uraianIzin}
                    </span>
                    <div className="flex items-center gap-2 font-mono shrink-0">
                      <span className="text-slate-500 text-[10px]">{item.rataRataWaktuPenyelesaianDokumenJam} Jam</span>
                      <span className="font-bold text-amber-900">{item.persentaseLayananTepatWaktu}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-600 rounded-full"
                      style={{ width: `${item.persentaseLayananTepatWaktu}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. SHEET 2: RINCIAN INDUSTRI (Dataset 9) */}
      {activeSheet === 'industri' && (
        <div className="space-y-2.5">
          <div className="text-[11px] text-slate-500 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>
              6 Uraian Izin Industri • Target SLA: <strong>Maks 4.0 - 6.0 Jam</strong>
            </span>
            <span className="font-mono text-emerald-700 font-bold">
              ✅ Rata-rata Kinerja: {avgSlaIndustri}% ({avgJamIndustri} Jam)
            </span>
          </div>

          <div className="space-y-2">
            {DATA_SLA_INDUSTRI.map((item) => (
              <div
                key={item.no}
                className="p-3 rounded-lg border border-slate-200/90 bg-white hover:border-blue-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold font-mono flex items-center justify-center">
                      {item.no}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {item.uraianIzin}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono shrink-0 text-xs">
                    <span className="text-slate-500">
                      ⏱️ Rata-rata: <strong>{item.rataRataWaktuPenyelesaianDokumenJam} Jam</strong> (Target: {item.targetSlaJam} Jam)
                    </span>
                    <span className="text-sm font-black text-blue-900">
                      {item.persentaseLayananTepatWaktu}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-700 rounded-full"
                    style={{ width: `${item.persentaseLayananTepatWaktu}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pt-1 font-mono">
                  <span>Volume Penerbitan: {item.jumlahDokumen} Dokumen SK</span>
                  <span className="text-emerald-700 font-semibold">Tingkat Kepatuhan: Sangat Tinggi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SHEET 3: RINCIAN PERDAGANGAN (Dataset 8) */}
      {activeSheet === 'perdagangan' && (
        <div className="space-y-2.5">
          <div className="text-[11px] text-slate-500 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>
              5 Uraian Izin Perdagangan • Target SLA: <strong>Maks 6.0 - 8.0 Jam</strong>
            </span>
            <span className="font-mono text-amber-800 font-bold">
              ✅ Rata-rata Kinerja: {avgSlaPerdagangan}% ({avgJamPerdagangan} Jam)
            </span>
          </div>

          <div className="space-y-2">
            {DATA_SLA_PERDAGANGAN.map((item) => (
              <div
                key={item.no}
                className="p-3 rounded-lg border border-slate-200/90 bg-white hover:border-amber-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold font-mono flex items-center justify-center">
                      {item.no}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {item.uraianIzin}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono shrink-0 text-xs">
                    <span className="text-slate-500">
                      ⏱️ Rata-rata: <strong>{item.rataRataWaktuPenyelesaianDokumenJam} Jam</strong> (Target: {item.targetSlaJam} Jam)
                    </span>
                    <span className="text-sm font-black text-amber-900">
                      {item.persentaseLayananTepatWaktu}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full"
                    style={{ width: `${item.persentaseLayananTepatWaktu}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pt-1 font-mono">
                  <span>Volume Permohonan Impor: {item.jumlahDokumen} Dokumen</span>
                  <span className="text-emerald-700 font-semibold">Tingkat Kepatuhan: Sangat Tinggi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SHEET 4: TABEL MATRIKS KEPATUHAN LENGKAP */}
      {activeSheet === 'tabel' && (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-3 py-2">No</th>
                <th className="px-3 py-2">Sektor</th>
                <th className="px-3 py-2">Uraian Izin</th>
                <th className="px-3 py-2 text-right font-mono">Target SLA</th>
                <th className="px-3 py-2 text-right font-mono">Waktu Rata-rata (Jam)</th>
                <th className="px-3 py-2 text-right font-mono">% Selesai Tepat Waktu</th>
                <th className="px-3 py-2 text-right font-mono">Volume Dokumen</th>
                <th className="px-3 py-2 text-center">Status SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {/* Industri Rows */}
              {DATA_SLA_INDUSTRI.map((row) => (
                <tr key={`ind-${row.no}`} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-2 font-mono font-bold text-slate-400">{row.no}</td>
                  <td className="px-3 py-2">
                    <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold">
                      Industri (DS 9)
                    </span>
                  </td>
                  <td className="px-3 py-2 font-semibold text-slate-900">{row.uraianIzin}</td>
                  <td className="px-3 py-2 text-right font-mono text-slate-600">{row.targetSlaJam} Jam</td>
                  <td className="px-3 py-2 text-right font-mono font-bold text-slate-800">
                    {row.rataRataWaktuPenyelesaianDokumenJam} Jam
                  </td>
                  <td className="px-3 py-2 text-right font-mono font-black text-blue-900">
                    {row.persentaseLayananTepatWaktu}%
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-slate-600">{row.jumlahDokumen} SK</td>
                  <td className="px-3 py-2 text-center">
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Terpenuhi
                    </span>
                  </td>
                </tr>
              ))}

              {/* Perdagangan Rows */}
              {DATA_SLA_PERDAGANGAN.map((row) => (
                <tr key={`dag-${row.no}`} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-2 font-mono font-bold text-slate-400">{row.no}</td>
                  <td className="px-3 py-2">
                    <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold">
                      Perdagangan (DS 8)
                    </span>
                  </td>
                  <td className="px-3 py-2 font-semibold text-slate-900">{row.uraianIzin}</td>
                  <td className="px-3 py-2 text-right font-mono text-slate-600">{row.targetSlaJam} Jam</td>
                  <td className="px-3 py-2 text-right font-mono font-bold text-slate-800">
                    {row.rataRataWaktuPenyelesaianDokumenJam} Jam
                  </td>
                  <td className="px-3 py-2 text-right font-mono font-black text-amber-900">
                    {row.persentaseLayananTepatWaktu}%
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-slate-600">{row.jumlahDokumen} SK</td>
                  <td className="px-3 py-2 text-center">
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Terpenuhi
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
