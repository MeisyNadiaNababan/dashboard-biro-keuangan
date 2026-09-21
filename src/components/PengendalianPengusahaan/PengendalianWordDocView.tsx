import React from 'react';
import { FileText, Download, ShieldCheck, CheckCircle2, Calculator, ArrowLeft, Printer } from 'lucide-react';
import { KPI_DATASETS_PENGENDALIAN, DAFTAR_MITRA_PENGUSAHAAN } from './pengendalianData';

interface PengendalianWordDocViewProps {
  onBackToDashboard: () => void;
}

export const PengendalianWordDocView: React.FC<PengendalianWordDocViewProps> = ({
  onBackToDashboard,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto mb-10">
      {/* Top action bar */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-800 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Dashboard Utama</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Document Sheet Layout */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 text-slate-800">
        {/* Document Header */}
        <div className="text-center pb-6 border-b-2 border-slate-800 space-y-1">
          <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 uppercase">
            BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
          </h2>
          <h3 className="text-sm sm:text-base font-bold text-sky-900 uppercase">
            DIREKTORAT PENGENDALIAN PENGUSAHAAN
          </h3>
          <p className="text-xs text-slate-500">
            Kamus Indikator Kinerja Utama (IKU), Atribut Satu Data BP Batam, &amp; Standar Evaluasi Kemitraan Badan Usaha
          </p>
        </div>

        {/* Section 1: Ringkasan 4 Dataset */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-sky-950 bg-sky-50 p-2 rounded-md border-l-4 border-sky-600">
            I. DAFTAR 4 DATASET RESMI SATU DATA BP BATAM (HALAMAN 14)
          </h4>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5 w-12 text-center">No</th>
                  <th className="p-2.5">Nama Dataset Satu Data</th>
                  <th className="p-2.5 w-24">Satuan</th>
                  <th className="p-2.5 w-32">Target Standar</th>
                  <th className="p-2.5 w-32">Capaian Realtime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {KPI_DATASETS_PENGENDALIAN.map((ds) => (
                  <tr key={ds.nomorDataset} className="hover:bg-slate-50">
                    <td className="p-2.5 text-center font-mono font-bold text-slate-600">
                      #{ds.nomorDataset}
                    </td>
                    <td className="p-2.5 font-semibold text-slate-800">
                      {ds.namaDataset}
                      {ds.nomorDataset === 3 && (
                        <span className="ml-2 text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                          IKU Prioritas 1
                        </span>
                      )}
                      {ds.nomorDataset === 4 && (
                        <span className="ml-2 text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-bold">
                          IKU Prioritas 2
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 font-mono">{ds.satuan}</td>
                    <td className="p-2.5 font-mono">{ds.target}%</td>
                    <td className="p-2.5 font-mono font-bold text-emerald-700">
                      {ds.capaian.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Rincian Rumus & Algoritma Kalkulasi */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-sky-950 bg-sky-50 p-2 rounded-md border-l-4 border-sky-600">
            II. DETAIL FORMULASI MATEMATIS SETIAP DATASET
          </h4>

          <div className="space-y-3">
            {KPI_DATASETS_PENGENDALIAN.map((ds) => (
              <div key={ds.nomorDataset} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Dataset #{ds.nomorDataset}: {ds.namaDataset}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-white border border-slate-200 rounded font-semibold text-slate-600">
                    Satuan: {ds.satuan}
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 font-mono text-xs text-sky-900">
                  {ds.formula}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ds.deskripsi}
                </p>
                <div className="text-[11px] text-slate-500">
                  Unit Produsen Data: <strong>{ds.sumberData}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Rekap Kemitraan Berjalan */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-sky-950 bg-sky-50 p-2 rounded-md border-l-4 border-sky-600">
            III. SAMPEL DAFTAR KONTRAK KEMITRAAN DALAM PENGAWASAN AKTIF (2026)
          </h4>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5">Mitra &amp; Badan Usaha</th>
                  <th className="p-2.5">Skema</th>
                  <th className="p-2.5">Nilai Investasi</th>
                  <th className="p-2.5">Bagi Hasil Tahunan</th>
                  <th className="p-2.5">Kepatuhan (DS 3)</th>
                  <th className="p-2.5">Tindak Lanjut (DS 4)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {DAFTAR_MITRA_PENGUSAHAAN.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-sans font-semibold text-slate-900">
                      <div>{m.namaMitra}</div>
                      <div className="text-[10px] text-slate-500">{m.badanUsahaTerkait}</div>
                    </td>
                    <td className="p-2.5">{m.skemaKerjasama}</td>
                    <td className="p-2.5">Rp {m.nilaiInvestasiMitra.toLocaleString('id-ID')} M</td>
                    <td className="p-2.5 text-emerald-700 font-bold">
                      Rp {m.realisasiSharingRevenueTahunan.toFixed(1)} M
                    </td>
                    <td className="p-2.5">
                      <span className="font-bold text-blue-700">{m.skorKepatuhanOperasional}%</span>
                    </td>
                    <td className="p-2.5">
                      <span className="font-bold text-teal-700">
                        {m.persentaseTindakLanjut.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
