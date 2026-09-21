import React from 'react';
import { Download, Printer, FileText, CheckCircle2, Building2, Calendar, ShieldCheck, Award } from 'lucide-react';
import {
  BOKMR_SUMMARY,
  SAKIP_COMPONENTS_DATA,
  TOTAL_NILAI_SAKIP,
  PREDIKAT_SAKIP,
  SPIP_MATURITAS_ITEMS,
  SKOR_AGREGAT_SPIP,
  PENYELESAIAN_REKOMENDASI_BLU,
  PENGADUAN_BADAN_USAHA_DATA,
  PIAGAM_RISIKO_DATA,
} from './bokmrData';

export const BokmrWordDocView: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* TOP ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Dokumen Laporan Kinerja Tata Kelola & Pengawasan Risiko BOKMR (.docx / PDF)
            </h3>
            <p className="text-xs text-slate-500">
              Format Resmi Badan Pengusahaan Batam (Satu Data Hal 38-40: SAKIP, SPIP, IKM & BLU)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* WORD / PAPER SIMULATION CONTAINER */}
      <div className="bg-white border border-slate-300 rounded-xl shadow-md p-8 md:p-12 max-w-4xl mx-auto text-slate-800 space-y-6 font-serif leading-relaxed">
        {/* OFFICIAL KOP SURAT */}
        <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
          <div className="font-sans font-bold tracking-wider text-sm text-slate-700">
            BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
          </div>
          <div className="font-sans font-extrabold tracking-tight text-lg text-slate-900">
            BIRO ORGANISASI, KEPATUHAN DAN MANAJEMEN RISIKO (BOKMR)
          </div>
          <div className="font-sans text-[11px] text-slate-500">
            Gedung Utama BP Batam Lt. 5, Jl. Ibnu Sutowo No. 1, Batam Centre, Batam 29400 | www.bpbatam.go.id
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center space-y-1 font-sans">
          <h2 className="text-base font-black uppercase text-slate-900 tracking-wide">
            LAPORAN EKSEKUTIF AKUNTABILITAS KINERJA, MATURITAS SPIP, DAN PENGAWASAN TATA KELOLA
          </h2>
          <p className="text-xs font-semibold text-slate-600">
            TAHUN EVALUASI 2026 / PERIODE BERJALAN
          </p>
        </div>

        {/* EXECUTIVE SUMMARY */}
        <div className="space-y-2 text-xs">
          <h3 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-1">
            I. Ringkasan Eksekutif
          </h3>
          <p className="text-justify text-slate-700 leading-normal">
            Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR) BP Batam secara terintegrasi mengawal akuntabilitas kinerja institusi, pengendalian internal, serta pengawasan badan usaha di lingkungan Kawasan Bebas Batam. Berdasarkan evaluasi semester berjalan tahun 2026, <strong>Nilai SAKIP BP Batam</strong> mencapai <strong>{TOTAL_NILAI_SAKIP.toFixed(2)}</strong> dengan predikat <strong>{PREDIKAT_SAKIP}</strong>, dan <strong>Indeks Maturitas SPIP</strong> berada pada skor <strong>{SKOR_AGREGAT_SPIP.toFixed(2)}</strong> (Level 3 - Terdefinisi).
          </p>
          <p className="text-justify text-slate-700 leading-normal">
            Tingkat penyelesaian rekomendasi pengawasan Badan Layanan Umum (BLU) mencatat rata-rata <strong>95.26%</strong> tuntas, dengan tingkat resolusi pengaduan masyarakat layanan badan usaha sebesar <strong>96.15%</strong> (450 dari 468 pengaduan terselesaikan).
          </p>
        </div>

        {/* TABEL 7 INDIKATOR UTAMA */}
        <div className="space-y-2 text-xs">
          <h3 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-1">
            II. Capaian 7 Indikator Kinerja Utama (IKU BOKMR)
          </h3>
          <table className="w-full border-collapse border border-slate-300 font-sans text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-800">
                <th className="border border-slate-300 p-2 text-center w-8">No</th>
                <th className="border border-slate-300 p-2 text-left">Indikator Kinerja</th>
                <th className="border border-slate-300 p-2 text-left">Sumber Satu Data</th>
                <th className="border border-slate-300 p-2 text-center">Skor / Nilai</th>
                <th className="border border-slate-300 p-2 text-center">Status / Predikat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 p-2 text-center">1</td>
                <td className="border border-slate-300 p-2 font-medium">Indeks Reformasi Kebijakan (IRK)</td>
                <td className="border border-slate-300 p-2 text-slate-500">Dataset Belum Ada</td>
                <td className="border border-slate-300 p-2 text-center font-bold font-mono">84.75</td>
                <td className="border border-slate-300 p-2 text-center">A (Sangat Baik)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 text-center">2</td>
                <td className="border border-slate-300 p-2 font-medium">Indeks Maturitas SPIP</td>
                <td className="border border-slate-300 p-2 text-slate-500">Dataset No. 17 (Hal 40)</td>
                <td className="border border-slate-300 p-2 text-center font-bold font-mono">3.42 / 5.00</td>
                <td className="border border-slate-300 p-2 text-center text-emerald-700 font-semibold">Level 3 (Terdefinisi)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 text-center">3</td>
                <td className="border border-slate-300 p-2 font-medium">Indeks Kepuasan Masyarakat (IKM)</td>
                <td className="border border-slate-300 p-2 text-slate-500">Dataset No. 10 & 11</td>
                <td className="border border-slate-300 p-2 text-center font-bold font-mono">88.62 / 100</td>
                <td className="border border-slate-300 p-2 text-center text-blue-700 font-semibold">A (Sangat Baik)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 text-center">4</td>
                <td className="border border-slate-300 p-2 font-medium">Nilai SAKIP BP Batam</td>
                <td className="border border-slate-300 p-2 text-slate-500">Dataset No. 2 (Hal 38)</td>
                <td className="border border-slate-300 p-2 text-center font-bold font-mono">82.68 / 100</td>
                <td className="border border-slate-300 p-2 text-center text-indigo-700 font-semibold">A (Memuaskan)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 text-center">5</td>
                <td className="border border-slate-300 p-2 font-medium">Indeks Pelayanan Publik (IPP)</td>
                <td className="border border-slate-300 p-2 text-slate-500">Dataset No. 15 (Hal 40)</td>
                <td className="border border-slate-300 p-2 text-center font-bold font-mono">4.38 / 5.00</td>
                <td className="border border-slate-300 p-2 text-center text-teal-700 font-semibold">A- (Sangat Baik)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 text-center">6</td>
                <td className="border border-slate-300 p-2 font-medium">Indeks Manajemen Risiko (MRI)</td>
                <td className="border border-slate-300 p-2 text-slate-500">Dataset No. 18 (Hal 40)</td>
                <td className="border border-slate-300 p-2 text-center font-bold font-mono">3.65 / 5.00</td>
                <td className="border border-slate-300 p-2 text-center text-rose-700 font-semibold">Managed</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 text-center">7</td>
                <td className="border border-slate-300 p-2 font-medium">Pengaduan Layanan Badan Usaha</td>
                <td className="border border-slate-300 p-2 text-slate-500">Dataset No. 10 (Hal 39)</td>
                <td className="border border-slate-300 p-2 text-center font-bold font-mono">450 / 468 Selesai</td>
                <td className="border border-slate-300 p-2 text-center text-emerald-700 font-semibold">96.15% Tuntas</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TABEL KOMPONEN SAKIP */}
        <div className="space-y-2 text-xs">
          <h3 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-1">
            III. Rincian Komponen Penilaian SAKIP (Dataset No. 2)
          </h3>
          <table className="w-full border-collapse border border-slate-300 font-sans text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-800">
                <th className="border border-slate-300 p-2 text-left">Komponen yang Dinilai</th>
                <th className="border border-slate-300 p-2 text-center">Bobot</th>
                <th className="border border-slate-300 p-2 text-center">Nilai Capaian</th>
                <th className="border border-slate-300 p-2 text-center">% Capaian</th>
                <th className="border border-slate-300 p-2 text-center">Tingkat Akuntabilitas</th>
              </tr>
            </thead>
            <tbody>
              {SAKIP_COMPONENTS_DATA.map((c) => (
                <tr key={c.id}>
                  <td className="border border-slate-300 p-2 font-medium">{c.komponen}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono">{c.bobot.toFixed(0)}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono font-bold">{c.nilai.toFixed(2)}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono text-emerald-700">{c.capaianPersen.toFixed(1)}%</td>
                  <td className="border border-slate-300 p-2 text-center">{c.tingkatAkuntabilitas}</td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-bold">
                <td className="border border-slate-300 p-2">TOTAL NILAI SAKIP</td>
                <td className="border border-slate-300 p-2 text-center font-mono">100</td>
                <td className="border border-slate-300 p-2 text-center font-mono text-indigo-900">{TOTAL_NILAI_SAKIP.toFixed(2)}</td>
                <td className="border border-slate-300 p-2 text-center font-mono text-emerald-800">82.7%</td>
                <td className="border border-slate-300 p-2 text-center text-indigo-900">{PREDIKAT_SAKIP}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TANDA TANGAN PEJABAT */}
        <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs font-sans">
          <div>
            <p className="text-slate-500">Mengetahui,</p>
            <p className="font-bold text-slate-800">Anggota Bidang Kebijakan Strategis</p>
            <div className="h-16" />
            <p className="font-bold text-slate-900 underline">Ir. Enoh Suharto Pranoto, M.T.</p>
            <p className="text-[10px] text-slate-500">NIP. 19650412 199103 1 002</p>
          </div>
          <div>
            <p className="text-slate-500">Batam, 17 September 2026</p>
            <p className="font-bold text-slate-800">Kepala Biro OKMR BP Batam</p>
            <div className="h-16" />
            <p className="font-bold text-slate-900 underline">Drs. Raden Permadi, M.Si.</p>
            <p className="text-[10px] text-slate-500">NIP. 19710815 199703 1 003</p>
          </div>
        </div>
      </div>
    </div>
  );
};
