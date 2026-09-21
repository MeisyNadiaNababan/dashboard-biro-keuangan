import React, { useState } from 'react';
import {
  FileText,
  FileCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  KPI_PELAKSANAAN_DOKUMEN_DATA,
  KPI_REKOMENDASI_PEMBARUAN_DATA,
  DAFTAR_REKOMENDASI_TERBARU,
} from './pengendalianData';

interface RekomendasiDokumenCardProps {
  onOpenFormulaModal: (id: string) => void;
}

export const RekomendasiDokumenCard: React.FC<RekomendasiDokumenCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeTab, setActiveTab] = useState<'rekomendasi' | 'dokumen'>('rekomendasi');
  const dokumen = KPI_PELAKSANAAN_DOKUMEN_DATA;
  const rekomendasi = KPI_REKOMENDASI_PEMBARUAN_DATA;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-3.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <FileCheck2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Rekomendasi Perpanjangan, Peralihan Hak &amp; Dokumen Teknis
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                DATASET #3 &amp; #4
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Clearance evaluasi kepatuhan lapangan sebelum izin perpanjangan atau peralihan hak diterbitkan
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
            <button
              onClick={() => setActiveTab('rekomendasi')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'rekomendasi'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rekomendasi (DS #4)
            </button>
            <button
              onClick={() => setActiveTab('dokumen')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dokumen'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kegiatan Dokumen (DS #3)
            </button>
          </div>

          <button
            onClick={() =>
              onOpenFormulaModal(
                activeTab === 'rekomendasi' ? 'kpi_rekomendasi' : 'kpi_dokumen'
              )
            }
            className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
            title="Formula & Atribut"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content for Tab: Rekomendasi (Dataset #4) */}
      {activeTab === 'rekomendasi' ? (
        <div className="p-3.5 space-y-3.5">
          {/* Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[10.5px] text-slate-500 block">Total Permohonan Masuk</span>
              <span className="text-xl font-black text-slate-900">
                {rekomendasi.totalPermohonanMasuk} Berkas
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                {rekomendasi.totalRekomendasiSelesai} Selesai ({rekomendasi.persentase}%)
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[10.5px] text-slate-500 block">Hasil Keputusan Lapangan</span>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span className="text-emerald-700 font-bold">Disetujui: 457</span>
                <span>•</span>
                <span className="text-amber-700 font-bold">Bersyarat: 22</span>
                <span>•</span>
                <span className="text-rose-700 font-bold">Ditolak: 15</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Penolakan didasari indikasi penelantaran fisik
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[10.5px] text-slate-500 block">Rata-rata Waktu Proses (SLA)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-slate-900">
                  {rekomendasi.rataRataSlaHari} Hari
                </span>
                <span className="text-xs text-slate-500">
                  (Target Maks: {rekomendasi.targetSlaHari} Hari)
                </span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                ⚡ 38% Lebih Cepat dari Standar SOP
              </span>
            </div>
          </div>

          {/* Breakdown 2 Layanan Rekomendasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {rekomendasi.breakdownLayanan.map((layanan, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200 bg-white shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h5 className="font-bold text-slate-900 text-xs">{layanan.jenis}</h5>
                    <span className="text-[10.5px] font-mono font-bold text-emerald-700 px-1.5 py-0.5 bg-emerald-50 rounded border border-emerald-200">
                      {layanan.persen}%
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 mb-2">
                    Selesai: <strong>{layanan.selesai}</strong> dari {layanan.permohonanMasuk} Permohonan (SLA {layanan.slaHari} Hari)
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-center text-[10.5px] pt-2 border-t border-slate-100">
                  <div className="bg-emerald-50 text-emerald-800 p-1 rounded font-medium">
                    Disetujui: {layanan.disetujui}
                  </div>
                  <div className="bg-amber-50 text-amber-800 p-1 rounded font-medium">
                    Bersyarat: {layanan.bersyarat}
                  </div>
                  <div className="bg-rose-50 text-rose-800 p-1 rounded font-medium">
                    Ditolak: {layanan.ditolakMangkrak}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sample Recommendations Log */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <span className="font-bold text-slate-800">
                Log Rekomendasi Terkini (Pengujian Lapangan DP2LPR)
              </span>
              <span className="text-[10.5px] text-slate-500">Sampel Uji Petik Berkas</span>
            </div>

            <div className="space-y-1.5 overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-y border-slate-200 text-[10.5px]">
                    <th className="py-1.5 px-2 font-semibold">No. Berkas</th>
                    <th className="py-1.5 px-2 font-semibold">Pemohon &amp; Peruntukan</th>
                    <th className="py-1.5 px-2 font-semibold">Jenis Layanan</th>
                    <th className="py-1.5 px-2 font-semibold">SWP</th>
                    <th className="py-1.5 px-2 font-semibold">Keputusan Evaluasi</th>
                    <th className="py-1.5 px-2 font-semibold text-right">SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  {DAFTAR_REKOMENDASI_TERBARU.map((rek) => (
                    <tr key={rek.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2 px-2 font-mono text-[10px] text-slate-500">
                        {rek.noPermohonan}
                      </td>
                      <td className="py-2 px-2">
                        <div className="font-semibold text-slate-900">{rek.pemohon}</div>
                        <div className="text-[10px] text-slate-500">{rek.peruntukan}</div>
                      </td>
                      <td className="py-2 px-2 text-slate-700">{rek.jenis}</td>
                      <td className="py-2 px-2 text-slate-600">{rek.swp}</td>
                      <td className="py-2 px-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                            rek.status === 'Disetujui'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : rek.status === 'Disetujui Bersyarat'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {rek.status === 'Disetujui' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : rek.status === 'Disetujui Bersyarat' ? (
                            <AlertCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {rek.status}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-right font-mono font-bold text-slate-800">
                        {rek.slaHari} Hari
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Content for Tab: Kegiatan Dokumen (Dataset #3) */
        <div className="p-3.5 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {dokumen.breakdownDokumen.map((d, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block mb-0.5">
                    KATEGORI DOKUMEN #{idx + 1}
                  </span>
                  <h6 className="font-bold text-slate-900 text-xs line-clamp-2">
                    {d.jenis}
                  </h6>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-black text-slate-900 font-mono">
                      {d.realisasi}
                    </span>
                    <span className="text-[10px] text-slate-500">Target: {d.target}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <span className="text-emerald-700 font-bold font-mono">{d.persen}%</span>
                    <span>SLA: {d.slaHari} Hari</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900 block">
                Total Capaian Pelaksanaan Dokumen Lahan &amp; Pesisir TA 2026:
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                342 dari 360 Dokumen telah disahkan secara digital &amp; terarsip pada Satu Data BP Batam (95,0%)
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-mono font-black text-slate-900">
                SLA Rata-rata: {dokumen.rataRataSlaHari} Hari
              </span>
              <span className="text-[10px] text-emerald-700 block font-semibold">
                Standar Maksimal: {dokumen.targetSlaHari} Hari
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Integrasi Layanan:</strong> Hasil rekomendasi DP2LPR secara otomatis menjadi prasyarat SKPT/Perpanjangan di Dit. Pengelolaan Lahan.
        </span>
        <span className="text-slate-600 font-medium">Satu Data Hal. 11 Item 3 &amp; 4</span>
      </div>
    </div>
  );
};
