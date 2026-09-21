import React, { useState } from 'react';
import { Download, Printer, Check, ArrowLeft, FileText, Sparkles, Building2 } from 'lucide-react';
import {
  KPI_SEKTOR_LIST,
  SEMUA_PAKET_PERENCANAAN,
  UTILISASI_DOKUMEN_SUMMARY,
  PEMANFAATAN_DOKUMEN_LIST,
} from './perencanaanData';

interface PerencanaanWordDocViewProps {
  onBack: () => void;
}

export const PerencanaanWordDocView: React.FC<PerencanaanWordDocViewProps> = ({ onBack }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleDownloadDoc = () => {
    const docContent = document.getElementById('perencanaan-word-doc')?.innerHTML;
    if (!docContent) return;

    const htmlString = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Laporan Eksekutif Direktorat Perencanaan Infrastruktur BP Batam</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.4; color: #111; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; }
          th, td { border: 1px solid #333; padding: 6px 8px; font-size: 10pt; }
          th { background-color: #f2f4f7; font-weight: bold; }
          .header-kop { text-align: center; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 20px; }
          .title { font-size: 14pt; font-weight: bold; text-align: center; margin-bottom: 4px; }
          .subtitle { font-size: 11pt; text-align: center; margin-bottom: 15px; }
          .section-title { font-size: 12pt; font-weight: bold; margin-top: 15px; margin-bottom: 6px; border-bottom: 1px solid #ccc; padding-bottom: 2px; }
          .badge { display: inline-block; padding: 2px 6px; font-size: 9pt; font-weight: bold; border-radius: 4px; }
        </style>
      </head>
      <body>
        ${docContent}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlString], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_Eksekutif_Perencanaan_Infrastruktur_BP_Batam_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Action Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Dokumen</span>
          </button>

          <button
            onClick={handleDownloadDoc}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Format Word (.doc)</span>
          </button>
        </div>
      </div>

      {/* Official Government Document Paper Sheet */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-md p-8 md:p-12 max-w-4xl mx-auto font-serif text-slate-900 leading-relaxed text-sm">
        <div id="perencanaan-word-doc">
          {/* Header KOP Resmi */}
          <div className="text-center border-b-4 border-double border-slate-900 pb-4 mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900">
              BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
            </h2>
            <h3 className="text-base font-bold uppercase tracking-wide text-slate-800">
              DIREKTORAT PERENCANAAN INFRASTRUKTUR
            </h3>
            <p className="text-xs font-sans text-slate-600 mt-1">
              Gedung Utama BP Batam Jl. Ibnu Sutowo No. 1, Batam Centre, Batam 29400 | Telp: (0778) 462047 | www.bpbatam.go.id
            </p>
          </div>

          {/* Doc Metadata */}
          <div className="text-center mb-6">
            <h4 className="text-base font-bold uppercase underline text-slate-900">
              NOTA DINAS LAPORAN EKSEKUTIF PERENCANAAN PEMBANGUNAN INFRASTRUKTUR
            </h4>
            <p className="text-xs font-sans text-slate-600 mt-1">
              Nomor: ND/DPR.INF/BP-BTM/{new Date().getFullYear()}/049 | Tanggal: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="font-sans text-xs space-y-1 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="grid grid-cols-6 gap-2">
              <span className="font-bold col-span-1">Yth.</span>
              <span className="col-span-5">: Kepala Badan Pengusahaan Kawasan Bebas Batam</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              <span className="font-bold col-span-1">Dari</span>
              <span className="col-span-5">: Direktur Perencanaan Infrastruktur BP Batam</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              <span className="font-bold col-span-1">Hal</span>
              <span className="col-span-5 font-semibold">
                : Laporan Capaian Perencanaan Infrastruktur, Total Biaya DED, &amp; Pemanfaatan Dokumen TA 2025
              </span>
            </div>
          </div>

          {/* Isi Dokumen */}
          <div className="space-y-4 text-xs font-sans leading-relaxed text-slate-800">
            <p>
              Bersama ini disampaikan laporan progres dan rekapitulasi penyusunan perencanaan infrastruktur (Detail Engineering Design / DED) di lingkungan Direktorat Perencanaan Infrastruktur BP Batam berdasarkan metadata Satu Data Indonesia (Hal. 53):
            </p>

            {/* RINGKASAN 2 KPI UTAMA */}
            <div className="grid grid-cols-2 gap-4 my-3 p-4 bg-slate-100 rounded-lg border border-slate-300">
              <div className="border-r border-slate-300 pr-3">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">KPI UTAMA #1</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">Total Perencanaan Infrastruktur</div>
                <div className="text-2xl font-mono font-bold text-sky-700 mt-1">43 Paket DED</div>
                <div className="text-[10px] text-slate-600 mt-0.5">Mencakup 6 sektor perencanaan pembangunan fisik kota Batam</div>
              </div>
              <div className="pl-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">KPI UTAMA #2</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">Total Biaya DED Keseluruhan</div>
                <div className="text-2xl font-mono font-bold text-emerald-700 mt-1">Rp 53,68 Miliar</div>
                <div className="text-[10px] text-slate-600 mt-0.5">Pagu biaya jasa konsultansi perancangan teknis terintegrasi</div>
              </div>
            </div>

            {/* TABEL REKAP 6 SEKTOR PERENCANAAN */}
            <h5 className="font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mt-4">
              I. Rekapitulasi 6 Sektor Perencanaan Pembangunan (Dataset Satu Data No. 1 s.d. 6)
            </h5>

            <table className="w-full border-collapse border border-slate-300 text-left text-xs my-2">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold">
                  <th className="border border-slate-300 p-2 text-center w-8">No</th>
                  <th className="border border-slate-300 p-2">Sektor Infrastruktur</th>
                  <th className="border border-slate-300 p-2 text-center">Jumlah DED</th>
                  <th className="border border-slate-300 p-2 text-center">Waktu Rata-rata</th>
                  <th className="border border-slate-300 p-2 text-right">Biaya DED (Rp)</th>
                  <th className="border border-slate-300 p-2 text-right">Estimasi Nilai Fisik</th>
                </tr>
              </thead>
              <tbody>
                {KPI_SEKTOR_LIST.map((kpi, idx) => (
                  <tr key={kpi.datasetNo} className="hover:bg-slate-50">
                    <td className="border border-slate-300 p-2 text-center font-bold">{idx + 1}</td>
                    <td className="border border-slate-300 p-2">
                      <strong>Dataset #{kpi.datasetNo}:</strong> {kpi.datasetTitle}
                    </td>
                    <td className="border border-slate-300 p-2 text-center font-bold">{kpi.totalPaket} Paket</td>
                    <td className="border border-slate-300 p-2 text-center text-slate-700 font-mono">
                      {kpi.waktuPelaksanaanAvgBulan} Bulan
                    </td>
                    <td className="border border-slate-300 p-2 text-right font-mono text-emerald-800 font-semibold">
                      Rp {(kpi.totalPaguDED / 1000000000).toFixed(2)} M
                    </td>
                    <td className="border border-slate-300 p-2 text-right font-bold font-mono text-slate-900">
                      Rp {(kpi.totalEstimasiCapexFisik / 1000000000000).toFixed(2)} T
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-bold text-slate-900">
                  <td colSpan={2} className="border border-slate-300 p-2 text-center">
                    TOTAL KESELURUHAN
                  </td>
                  <td className="border border-slate-300 p-2 text-center">
                    {KPI_SEKTOR_LIST.reduce((a, b) => a + b.totalPaket, 0)} Paket
                  </td>
                  <td className="border border-slate-300 p-2 text-center">
                    5,5 Bulan (Rata-rata)
                  </td>
                  <td className="border border-slate-300 p-2 text-right text-emerald-800">
                    Rp {(KPI_SEKTOR_LIST.reduce((a, b) => a + b.totalPaguDED, 0) / 1000000000).toFixed(2)} M
                  </td>
                  <td className="border border-slate-300 p-2 text-right">
                    Rp {(KPI_SEKTOR_LIST.reduce((a, b) => a + b.totalEstimasiCapexFisik, 0) / 1000000000000).toFixed(2)} T
                  </td>
                </tr>
              </tbody>
            </table>

            {/* BAB II: PEMANFAATAN DOKUMEN OLEH UNIT/INSTANSI LAIN (DATASET NO. 7, 8, 9) */}
            <h5 className="font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mt-6">
              II. Persentase Pemanfaatan Dokumen Perencanaan Teknis oleh Unit/Instansi Lain (Dataset 7 s.d. 9)
            </h5>
            <p className="text-[11px] text-slate-600">
              Menunjukkan efektivitas dokumen DED yang diadopsi dan dieksekusi secara nyata oleh unit kerja internal maupun eksternal:
            </p>

            <table className="w-full border-collapse border border-slate-300 text-left text-xs my-2">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold">
                  <th className="border border-slate-300 p-2 text-center w-8">No</th>
                  <th className="border border-slate-300 p-2">Kategori Dokumen DED</th>
                  <th className="border border-slate-300 p-2 text-center">% Pemanfaatan</th>
                  <th className="border border-slate-300 p-2 text-right">Nilai DED Dimanfaatkan</th>
                  <th className="border border-slate-300 p-2 text-center">Tahun Pembuatan</th>
                  <th className="border border-slate-300 p-2 text-center">Jumlah Pengguna</th>
                </tr>
              </thead>
              <tbody>
                {PEMANFAATAN_DOKUMEN_LIST.map((item) => (
                  <tr key={item.datasetNo} className="hover:bg-slate-50">
                    <td className="border border-slate-300 p-2 text-center font-bold">{item.datasetNo}</td>
                    <td className="border border-slate-300 p-2">
                      <strong>Dataset #{item.datasetNo}:</strong> {item.namaDataset}
                    </td>
                    <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">
                      {item.persentasePemanfaatan.toFixed(1)}%
                    </td>
                    <td className="border border-slate-300 p-2 text-right font-mono font-semibold text-slate-900">
                      Rp {(item.nilaiDedDimanfaatkan / 1e9).toFixed(2)} M
                    </td>
                    <td className="border border-slate-300 p-2 text-center font-mono">
                      {item.tahunPembuatanDed}
                    </td>
                    <td className="border border-slate-300 p-2 text-center font-bold">
                      {item.jumlahUnitPengguna} Instansi
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* BAB III: READINESS CRITERIA & UTILISASI DOKUMEN */}
            <h5 className="font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mt-6">
              III. Analisis Kesiapan Tender Fisik &amp; Mitigasi Hambatan Teknis
            </h5>
            <p>
              Dari total 21 dokumen perencanaan yang telah berstatus <strong>Selesai (Siap Lelang Fisik)</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>14 Dokumen (66,7%)</strong> telah berhasil diserahterimakan dan masuk dalam tahapan lelang konstruksi fisik pada Direktorat Pembangunan Infrastruktur (nilai estimasi proyek Rp 1,28 Triliun).
              </li>
              <li>
                <strong>7 Dokumen (33,3%)</strong> telah rampung dan dialokasikan untuk usulan pembiayaan Rencana Kerja (Renja/DIPA) TA 2026.
              </li>
              <li>
                Rasio serap serah terima 66,7% ini melampaui standar minimal indikator nasional (50%), membuktikan bahwa belanja konsultansi perencanaan di BP Batam sangat efektif dan berorientasi langsung pada realisasi fisik.
              </li>
            </ul>

            {/* Tanda Tangan */}
            <div className="mt-12 pt-6 flex justify-end">
              <div className="text-center font-sans text-xs w-64">
                <p className="font-medium text-slate-700">Batam, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="font-bold mt-1 text-slate-900">DIREKTUR PERENCANAAN INFRASTRUKTUR</p>
                <div className="h-20 flex items-center justify-center">
                  <span className="text-[10px] text-slate-400 italic">[Ditandatangani secara elektronik]</span>
                </div>
                <p className="font-bold underline text-slate-900">Dr. Ir. CECEP BUSTAM, M.T.</p>
                <p className="text-slate-500 text-[11px]">NIP. 19740815 199903 1 002</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
