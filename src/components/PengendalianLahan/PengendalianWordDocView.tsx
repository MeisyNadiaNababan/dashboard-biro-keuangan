import React from 'react';
import { ArrowLeft, Download, Printer, Share2, FileText, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import {
  KPI_PENGAWASAN_DATA,
  KPI_EVALUASI_PEMBATALAN_DATA,
  KPI_PELAKSANAAN_DOKUMEN_DATA,
  KPI_REKOMENDASI_PEMBARUAN_DATA,
  SWP_PENGAWASAN_DATA,
} from './pengendalianData';

interface PengendalianWordDocViewProps {
  onBack: () => void;
}

export const PengendalianWordDocView: React.FC<PengendalianWordDocViewProps> = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDoc = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><title>Nota Dinas Eksekutif DP2LPR BP Batam</title>
    <style>body{font-family:Calibri,sans-serif;font-size:11pt;line-height:1.5;color:#1e293b;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #cbd5e1;padding:6px 10px;text-align:left;font-size:10pt;}th{background-color:#f1f5f9;font-weight:bold;}h1{font-size:16pt;color:#0f172a;}h2{font-size:13pt;color:#1e40af;border-bottom:1px solid #cbd5e1;padding-bottom:4px;}h3{font-size:11pt;color:#334155;}</style></head><body>`;
    const footer = '</body></html>';
    const content = document.getElementById('pengendalian-doc-content')?.innerHTML || '';
    const blob = new Blob(['\ufeff' + header + content + footer], {
      type: 'application/msword',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Laporan_Eksekutif_Pengendalian_Lahan_Pesisir_Reklamasi_BP_Batam.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Dashboard Interaktif</span>
          </button>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-sky-700" />
            Dokumen Eksekutif Resmi (.doc)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Nota</span>
          </button>
          <button
            onClick={handleDownloadDoc}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh File .DOC (Word)</span>
          </button>
        </div>
      </div>

      {/* Printable / Viewable Document Page */}
      <div
        id="pengendalian-doc-content"
        className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 shadow-sm max-w-4xl mx-auto space-y-6"
      >
        {/* Letterhead Header */}
        <div className="border-b-2 border-slate-900 pb-4 text-center">
          <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
          </div>
          <h1 className="text-lg font-black text-slate-900 mt-1 uppercase tracking-tight">
            DIREKTORAT PENGENDALIAN PENGELOLAAN LAHAN, PESISIR DAN REKLAMASI
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Gedung Utama BP Batam, Jl. Ibnu Sutowo No. 1, Batam Centre, Kota Batam
          </p>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-base font-black text-slate-900 uppercase">
            LAPORAN EKSEKUTIF KINERJA PENGAWASAN, EVALUASI PEMBATALAN LAHAN &amp; REKOMENDASI TEKNIS
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Periode: Triwulan I &amp; II Tahun Anggaran 2026 | Berdasarkan Buku Satu Data Hal. 11
          </p>
        </div>

        {/* 1. Ringkasan 4 Indikator Utama */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
            I. CAPAIAN 4 INDIKATOR UTAMA (DATASET #1 - #4)
          </h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-y border-slate-200">
                <th className="p-2">No</th>
                <th className="p-2">Nama Indikator Kinerja Utama (KPI)</th>
                <th className="p-2">Dataset</th>
                <th className="p-2 text-right">Target</th>
                <th className="p-2 text-right">Realisasi</th>
                <th className="p-2 text-right">Capaian (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-2 font-mono">1</td>
                <td className="p-2 font-medium">
                  {KPI_PENGAWASAN_DATA.namaKpi}
                </td>
                <td className="p-2 font-mono text-[10px]">Dataset #1</td>
                <td className="p-2 text-right font-mono">{KPI_PENGAWASAN_DATA.targetObjek} Objek</td>
                <td className="p-2 text-right font-mono font-bold text-slate-900">{KPI_PENGAWASAN_DATA.realisasiObjek} Objek</td>
                <td className="p-2 text-right font-mono font-black text-sky-700">{KPI_PENGAWASAN_DATA.persentase.toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">2</td>
                <td className="p-2 font-medium">
                  {KPI_EVALUASI_PEMBATALAN_DATA.namaKpi}
                </td>
                <td className="p-2 font-mono text-[10px]">Dataset #2</td>
                <td className="p-2 text-right font-mono">{KPI_EVALUASI_PEMBATALAN_DATA.targetKasus} Kasus</td>
                <td className="p-2 text-right font-mono font-bold text-slate-900">{KPI_EVALUASI_PEMBATALAN_DATA.realisasiKasus} Kasus</td>
                <td className="p-2 text-right font-mono font-black text-amber-700">{KPI_EVALUASI_PEMBATALAN_DATA.persentase.toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">3</td>
                <td className="p-2 font-medium">
                  {KPI_PELAKSANAAN_DOKUMEN_DATA.namaKpi}
                </td>
                <td className="p-2 font-mono text-[10px]">Dataset #3</td>
                <td className="p-2 text-right font-mono">{KPI_PELAKSANAAN_DOKUMEN_DATA.targetDokumen} Dokumen</td>
                <td className="p-2 text-right font-mono font-bold text-slate-900">{KPI_PELAKSANAAN_DOKUMEN_DATA.realisasiDokumen} Dokumen</td>
                <td className="p-2 text-right font-mono font-black text-indigo-700">{KPI_PELAKSANAAN_DOKUMEN_DATA.persentase.toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">4</td>
                <td className="p-2 font-medium">
                  {KPI_REKOMENDASI_PEMBARUAN_DATA.namaKpi}
                </td>
                <td className="p-2 font-mono text-[10px]">Dataset #4</td>
                <td className="p-2 text-right font-mono">{KPI_REKOMENDASI_PEMBARUAN_DATA.totalPermohonanMasuk} Berkas</td>
                <td className="p-2 text-right font-mono font-bold text-slate-900">{KPI_REKOMENDASI_PEMBARUAN_DATA.totalRekomendasiSelesai} Berkas</td>
                <td className="p-2 text-right font-mono font-black text-emerald-700">{KPI_REKOMENDASI_PEMBARUAN_DATA.persentase.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2. Dampak Penyelamatan Aset (Rekuperasi Lahan Mangkrak) */}
        <div className="space-y-2 text-xs leading-relaxed">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
            II. DAMPAK REKUPERASI ASET LAHAN MANGKRAK &amp; PEMULIHAN INVESTASI
          </h3>
          <p className="text-slate-700">
            Sepanjang tahun anggaran 2026 berjalan, Direktorat telah memproses eskalasi penertiban terhadap <strong>162 kasus lahan bermasalah</strong> dengan total luasan terekspose sebesar <strong>642,7 Hektar</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>
              <strong>Penyelamatan Aset Cadangan Lahan BP Batam:</strong> Sebanyak <strong>32 alokasi lahan</strong> resmi diterbitkan Keputusan Kepala BP Batam (Kepka) tentang Pembatalan Hak Alokasi dengan total luas <strong>94,6 Hektar</strong>. Lahan ini telah dibersihkan (clean and clear) dan siap dialokasikan kembali untuk investasi strategis berdaya saing tinggi.
            </li>
            <li>
              <strong>Pemulihan Komitmen Investasi:</strong> Sebanyak <strong>58 kasus (221,8 Ha)</strong> berhasil menyelesaikan sengketa dan melanjutkan komitmen pembangunan fisik setelah menerima SP-1/SP-2 dan melunasi kewajiban denda keterlambatan.
            </li>
            <li>
              <strong>Kasus dalam Proses Eskalasi Peringatan:</strong> Masih terdapat <strong>148 kasus</strong> yang berada pada status Surat Peringatan (SP-1: 74 kasus, SP-2: 46 kasus, SP-3: 28 kasus) yang terus dipantau secara ketat melalui audit kepatuhan lapangan.
            </li>
          </ul>
        </div>

        {/* 3. Sebaran Spasial Pengawasan 5 Sub Wilayah Pengembangan */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
            III. DISTRIBUSI PENGAWASAN SPASIAL PER SUB WILAYAH PENGEMBANGAN (SWP)
          </h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-y border-slate-200">
                <th className="p-2">SWP</th>
                <th className="p-2">Wilayah Cakupan</th>
                <th className="p-2 text-right">Objek Terperiksa</th>
                <th className="p-2 text-right">Luas (Ha)</th>
                <th className="p-2 text-right">Patuh</th>
                <th className="p-2 text-right">Teguran / Pelanggaran</th>
                <th className="p-2 text-right">Tingkat Kepatuhan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SWP_PENGAWASAN_DATA.map((s, idx) => (
                <tr key={idx}>
                  <td className="p-2 font-mono font-bold text-slate-900">{s.swp}</td>
                  <td className="p-2 text-slate-600">{s.namaWilayah}</td>
                  <td className="p-2 text-right font-mono">{s.totalObjek}</td>
                  <td className="p-2 text-right font-mono">{s.luasPengawasanHa} Ha</td>
                  <td className="p-2 text-right font-mono text-emerald-700 font-bold">{s.patuh}</td>
                  <td className="p-2 text-right font-mono text-rose-700">{s.teguran + s.pelanggaran}</td>
                  <td className="p-2 text-right font-mono font-bold text-slate-900">{s.persentaseKepatuhan}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Rekomendasi Teknis & Kecepatan Layanan (SLA) */}
        <div className="space-y-2 text-xs leading-relaxed">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
            IV. KINERJA LAYANAN REKOMENDASI TEKNIS &amp; DOKUMEN (SLA)
          </h3>
          <p className="text-slate-700">
            Rata-rata kecepatan penyelesaian rekomendasi teknis perpanjangan alokasi dan peralihan hak mencapai <strong>3,1 hari kerja</strong>, melampaui standar SOP maksimal 5 hari kerja (efisiensi 38%). Dari 520 permohonan yang masuk, <strong>457 berkas disetujui penuh</strong>, <strong>22 berkas bersyarat</strong>, dan <strong>15 berkas ditolak</strong> karena lahan terbukti ditelantarkan atau mangkrak.
          </p>
        </div>

        {/* Signatures */}
        <div className="pt-8 grid grid-cols-2 text-center text-xs">
          <div>
            <div className="text-slate-500">Mengetahui,</div>
            <div className="font-bold text-slate-900 mt-1">Anggota Bidang Pengelolaan Kawasan &amp; Investasi</div>
            <div className="h-16" />
            <div className="font-bold underline text-slate-900">BP BATAM EXECUTIVE</div>
            <div className="text-slate-500 font-mono text-[10px]">NIP. 19740512 199903 1 002</div>
          </div>
          <div>
            <div className="text-slate-500">Batam, 24 April 2026</div>
            <div className="font-bold text-slate-900 mt-1">Direktur Pengendalian Pengelolaan Lahan, Pesisir &amp; Reklamasi</div>
            <div className="h-16" />
            <div className="font-bold underline text-slate-900">DIREKTUR DP2LPR</div>
            <div className="text-slate-500 font-mono text-[10px]">NIP. 19760814 200212 1 001</div>
          </div>
        </div>
      </div>
    </div>
  );
};
