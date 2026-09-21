import React from 'react';
import { ArrowLeft, Printer, Download, Shield, FileText } from 'lucide-react';
import {
  BANGUNAN_LIAR_SUMMARY,
  TOTAL_PERSONIL_DITPAM,
  TOTAL_GIAT_PENGAMANAN_OBVIT,
  TOTAL_LUAS_PENINDAKAN_HA,
  UNJUK_RASA_DATA,
  BENCANA_ALAM_SUMMARY,
  PENERTIBAN_BY_JENIS_KEGIATAN,
  TOTAL_BENCANA_ALAM_KEJADIAN,
} from './pengamananAsetData';

interface PengamananAsetWordDocViewProps {
  onBack: () => void;
}

export const PengamananAsetWordDocView: React.FC<PengamananAsetWordDocViewProps> = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExportDoc = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Laporan Eksekutif Ditpam BP Batam</title><style>body{font-family:Arial,sans-serif;line-height:1.4;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #333;padding:6px;font-size:11px;}</style></head><body>`;
    const footer = `</body></html>`;
    const element = document.getElementById('word-document-content');
    if (!element) return;
    const html = header + element.innerHTML + footer;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_Eksekutif_Ditpam_BP_Batam_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-12">
      {/* Top Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard Interaktif</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Cetak Dokumen</span>
          </button>
          <button
            onClick={handleExportDoc}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Format Word (.doc)</span>
          </button>
        </div>
      </div>

      {/* Document Sheet (Plain White Paper Aesthetic) */}
      <div
        id="word-document-content"
        className="bg-white border border-slate-300 rounded-lg p-8 sm:p-12 shadow-sm font-serif text-slate-900 leading-relaxed text-sm space-y-6"
      >
        {/* Kop Surat Resmi BP Batam */}
        <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1 font-sans">
          <div className="text-xs tracking-widest font-bold uppercase text-slate-600">
            BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
          </div>
          <div className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase">
            DIREKTORAT PENGAMANAN ASET DAN KAWASAN (DITPAM)
          </div>
          <div className="text-[11px] text-slate-500">
            Gedung BIFZA Lantai 4, Jl. Ibnu Sutowo No. 1, Batam Centre, Kota Batam 29400 • Telp: (0778) 462047
          </div>
        </div>

        {/* Judul Laporan */}
        <div className="text-center space-y-1 pt-2">
          <h2 className="text-base font-bold uppercase tracking-wider underline">
            LAPORAN EKSEKUTIF KINERJA OPERASIONAL PENGAMANAN ASET, OBJEK VITAL DAN PENERTIBAN KAWASAN
          </h2>
          <p className="text-xs text-slate-500 italic">
            Nomor: LAP-DITPAM/BP-BTM/{new Date().getFullYear()}/IX/019 • Klasifikasi: Terbatas
          </p>
        </div>

        {/* 1. Ringkasan Eksekutif 4 KPI Utama */}
        <div className="space-y-3 font-sans">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            I. RINGKASAN CAPAIAN 4 KPI STRATEGIS (BUKU SATU DATA HAL. 17 - 19)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 border border-slate-300 rounded bg-slate-50">
              <span className="text-[10.5px] text-slate-500 block">Penerbitan Bangunan Liar (Dataset #1)</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {BANGUNAN_LIAR_SUMMARY.totalBangunanDitertibkan.toLocaleString('id-ID')} Unit
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Dari 1.030 unit terdata</span>
            </div>
            <div className="p-3 border border-slate-300 rounded bg-slate-50">
              <span className="text-[10.5px] text-slate-500 block">Kekuatan Personil Ditpam (Dataset #3)</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {TOTAL_PERSONIL_DITPAM} Personil
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Kesiapsiagaan 98,2%</span>
            </div>
            <div className="p-3 border border-slate-300 rounded bg-slate-50">
              <span className="text-[10.5px] text-slate-500 block">Total Pengamanan Obvit & Hutan (Dataset #12)</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {TOTAL_GIAT_PENGAMANAN_OBVIT.toLocaleString('id-ID')} Giat
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">7 Objek Vital Utama</span>
            </div>
            <div className="p-3 border border-slate-300 rounded bg-slate-50">
              <span className="text-[10.5px] text-slate-500 block">Luas Penindakan Kawasan (Dataset #10)</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {TOTAL_LUAS_PENINDAKAN_HA} Hektar
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">3.485.000 m² Aset Lahan</span>
            </div>
          </div>
        </div>

        {/* 2. Rekap Pengamanan Unjuk Rasa (Dataset No. 7) */}
        <div className="space-y-3 font-sans">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            II. REKAPITULASI PENGAMANAN UNJUK RASA (DATASET NO. 7 • HAL. 18)
          </h3>
          <p className="text-xs text-slate-600">
            Berikut adalah riwayat kegiatan pengamanan aksi penyampaian aspirasi masyarakat di wilayah kerja BP Batam:
          </p>
          <table className="w-full text-left border-collapse border border-slate-300 text-xs">
            <thead className="bg-slate-100 font-bold text-slate-800">
              <tr>
                <th className="border border-slate-300 p-2 text-center w-10">No</th>
                <th className="border border-slate-300 p-2">Tanggal</th>
                <th className="border border-slate-300 p-2">Permasalahan / Aspirasi</th>
                <th className="border border-slate-300 p-2 text-right">Personil Ditpam</th>
                <th className="border border-slate-300 p-2">Lokasi &amp; Aliansi</th>
              </tr>
            </thead>
            <tbody>
              {UNJUK_RASA_DATA.slice(0, 10).map((u, idx) => (
                <tr key={u.id}>
                  <td className="border border-slate-300 p-2 text-center font-mono">{idx + 1}</td>
                  <td className="border border-slate-300 p-2 font-mono whitespace-nowrap">{u.tanggal}</td>
                  <td className="border border-slate-300 p-2">{u.permasalahan}</td>
                  <td className="border border-slate-300 p-2 text-right font-mono font-bold">{u.jumlahPersonil} Org</td>
                  <td className="border border-slate-300 p-2 text-[11px]">{u.lokasi} ({u.aliansiMasyarakat})</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[11px] text-slate-500 italic">
            * Menampilkan 10 dari 35 entri pengamanan unjuk rasa terdata pada sistem Ditpam BP Batam.
          </p>
        </div>

        {/* 3. Rekap Kejadian Bencana Alam (Dataset No. 6) */}
        <div className="space-y-3 font-sans">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            III. REKAP KEJADIAN BENCANA ALAM &amp; RESCUE (DATASET NO. 6 • HAL. 18)
          </h3>
          <table className="w-full text-left border-collapse border border-slate-300 text-xs">
            <thead className="bg-slate-100 font-bold text-slate-800">
              <tr>
                <th className="border border-slate-300 p-2 text-center w-10">No</th>
                <th className="border border-slate-300 p-2">Jenis Kegiatan Penanggulangan Bencana</th>
                <th className="border border-slate-300 p-2 text-center">Jumlah Kejadian</th>
                <th className="border border-slate-300 p-2 text-right">Personil Rescue</th>
                <th className="border border-slate-300 p-2">Status Penanganan</th>
              </tr>
            </thead>
            <tbody>
              {BENCANA_ALAM_SUMMARY.map((b, idx) => (
                <tr key={idx}>
                  <td className="border border-slate-300 p-2 text-center font-mono">{idx + 1}</td>
                  <td className="border border-slate-300 p-2 font-medium">{b.jenisKegiatan}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono font-bold">{b.jumlah} Kejadian</td>
                  <td className="border border-slate-300 p-2 text-right font-mono">{b.totalPersonilRescue} Org</td>
                  <td className="border border-slate-300 p-2 text-emerald-800 font-semibold">{b.statusPenanganan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Rekap Penertiban Rutin (Dataset No. 9) */}
        <div className="space-y-3 font-sans">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            IV. REKAP DATA KEGIATAN PENERTIBAN TIM TERPADU (DATASET NO. 9 • HAL. 18)
          </h3>
          <table className="w-full text-left border-collapse border border-slate-300 text-xs">
            <thead className="bg-slate-100 font-bold text-slate-800">
              <tr>
                <th className="border border-slate-300 p-2 text-center w-10">No</th>
                <th className="border border-slate-300 p-2">Jenis Kegiatan Penertiban</th>
                <th className="border border-slate-300 p-2 text-center">Jumlah Kegiatan</th>
                <th className="border border-slate-300 p-2 text-right">Total Objek Ditindak</th>
              </tr>
            </thead>
            <tbody>
              {PENERTIBAN_BY_JENIS_KEGIATAN.map((p, idx) => (
                <tr key={idx}>
                  <td className="border border-slate-300 p-2 text-center font-mono">{idx + 1}</td>
                  <td className="border border-slate-300 p-2 font-medium">{p.jenisKegiatan}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono font-bold">{p.jumlahKegiatan} Giat</td>
                  <td className="border border-slate-300 p-2 text-right font-mono">{p.totalObjekDitertibkan.toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tanda Tangan Resmi */}
        <div className="pt-8 flex justify-end font-sans text-xs">
          <div className="text-center space-y-12">
            <div>
              Batam, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br />
              <strong>Direktur Pengamanan Aset dan Kawasan BP Batam</strong>
            </div>
            <div>
              <strong className="underline uppercase block">Brigjen Pol. (Purn) / Direktur Ditpam</strong>
              <span className="text-slate-500 font-mono text-[11px]">NIP. 19680512 199203 1 002</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
