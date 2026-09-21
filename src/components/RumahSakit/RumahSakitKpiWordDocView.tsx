import React from 'react';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  Building2,
  Calendar,
  DollarSign,
  Activity,
  Users,
  Award,
  Clock,
  Store,
} from 'lucide-react';
import {
  RS_KEUANGAN_SUMMARY,
  RS_IKM_TOTAL,
  RS_KUNJUNGAN_TOTAL,
  RS_INDIKATOR_EFISIENSI,
  RS_TENANT_SEWA,
  RS_TOP_PENYAKIT,
  RS_RESEP_OBAT_TOTAL,
} from '../../data/rumahSakitData';

export const RumahSakitKpiWordDocView: React.FC = () => {
  const handleDownloadDoc = () => {
    const content = document.getElementById('rsbp-word-doc-content')?.innerText || '';
    const blob = new Blob(
      [
        `\ufeffLaporan Eksekutif Kinerja Badan Usaha Rumah Sakit (RSBP Batam) TA 2026\n\n${content}`,
      ],
      { type: 'application/msword' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Laporan_Eksekutif_RSBP_Batam_2026.doc';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 font-sans max-w-5xl mx-auto">
      {/* 1. Action Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800">
              Naskah Dinas Laporan Eksekutif Kinerja RSBP Batam
            </h3>
            <p className="text-[11px] text-slate-500">
              Format siap unduh Word (.doc) dan siap cetak untuk briefing pimpinan BP Batam.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadDoc}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F4E79] hover:bg-[#163857] text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh File (.doc)</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Dokumen</span>
          </button>
        </div>
      </div>

      {/* 2. Paper Document View */}
      <div
        id="rsbp-word-doc-content"
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-10 text-slate-800 text-xs sm:text-sm leading-relaxed"
      >
        {/* Header BP Batam Official Style */}
        <div className="text-center pb-4 border-b-2 border-slate-900 mb-6">
          <div className="font-serif font-black text-sm sm:text-base tracking-wider text-slate-900 uppercase">
            BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
          </div>
          <div className="font-serif font-bold text-xs sm:text-sm tracking-wide text-slate-800 uppercase mt-0.5">
            BADAN USAHA RUMAH SAKIT (RSBP BATAM)
          </div>
          <div className="text-[11px] text-slate-600 mt-1 font-sans">
            Jl. Dr. Ciptomangunkusumo No. 1, Sekupang, Kota Batam, Kepulauan Riau • Telp. (0778) 322121
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            Katalog Satu Data BP Batam Halaman 19 - 21 (Dataset 1 s.d 18)
          </div>
        </div>

        {/* Title */}
        <div className="text-center my-5">
          <h1 className="font-bold text-base sm:text-lg text-slate-900 uppercase tracking-tight underline">
            LAPORAN KINERJA EKSEKUTIF BADAN USAHA RUMAH SAKIT
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Periode Berjalan Tahun Anggaran 2026 (Kompilasi Data YTD April 2026)
          </p>
        </div>

        {/* Section I: Executive Summary */}
        <div className="space-y-4 text-justify">
          <div>
            <h2 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">
              I. RINGKASAN CAPAIAN 6 INDIKATOR UTAMA
            </h2>
            <p className="indent-6 text-slate-700">
              Badan Usaha Rumah Sakit (RSBP Batam) sebagai unit pengelola layanan kesehatan rujukan di Batam dan Kawasan Ekonomi Khusus (KEK) Kesehatan Sekupang membukukan kinerja yang sehat, mandiri, dan memenuhi standar efisiensi Kementerian Kesehatan RI. Berikut adalah ringkasan capaian utama:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700 pl-2">
              <li>
                <strong>Realisasi PNBP (Dataset No. 2):</strong> Tercapai sebesar <strong>Rp {RS_KEUANGAN_SUMMARY.totalRealisasiPnbpMiliar.toFixed(2)} Miliar</strong> dari target RBA sebesar Rp {RS_KEUANGAN_SUMMARY.totalTargetPnbpMiliar.toFixed(2)} Miliar (Capaian <strong>{RS_KEUANGAN_SUMMARY.persentasePnbp.toFixed(1)}%</strong>).
              </li>
              <li>
                <strong>Realisasi Belanja (Dataset No. 12):</strong> Terserap sebesar <strong>Rp {RS_KEUANGAN_SUMMARY.totalRealisasiBelanjaMiliar.toFixed(2)} Miliar</strong> dari pagu DIPA sebesar Rp {RS_KEUANGAN_SUMMARY.totalPaguBelanjaMiliar.toFixed(2)} Miliar (Serapan <strong>{RS_KEUANGAN_SUMMARY.persentaseBelanja.toFixed(1)}%</strong>), menghasilkan sisa pagu Rp {RS_KEUANGAN_SUMMARY.totalSisaPaguMiliar.toFixed(2)} Miliar.
              </li>
              <li>
                <strong>Cost Recovery Rate (Dataset No. 3):</strong> Rasio pendapatan terhadap belanja operasional mencapai <strong>{RS_KEUANGAN_SUMMARY.rasioPenerimaanBelanja.toFixed(2)}%</strong> (kategori mandiri fiskal &gt;100%).
              </li>
              <li>
                <strong>Indeks Kepuasan Masyarakat (Dataset No. 1):</strong> Memperoleh skor <strong>{RS_IKM_TOTAL}</strong> dengan predikat <strong>Mutu Pelayanan A (Sangat Baik)</strong> berdasarkan survei 9 unsur PermenPAN-RB No. 14 Tahun 2017.
              </li>
              <li>
                <strong>Volume Kunjungan Pasien (Dataset No. 5 & 6):</strong> Total kunjungan pasien terlayani mencapai <strong>{RS_KUNJUNGAN_TOTAL.toLocaleString('id-ID')} pasien</strong>, dengan porsi pasien BPJS Kesehatan 65,9% dan 38.450 kasus terlayani di 6 Pusat Layanan Unggulan.
              </li>
              <li>
                <strong>Indikator Efisiensi Tempat Tidur (Dataset No. 9):</strong> Bed Occupancy Rate (BOR) mencapai <strong>74,2%</strong> (dalam batas ideal Kemenkes 60%–85%), ALOS 4,2 hari, dan TOI 1,5 hari.
              </li>
              <li>
                <strong>Sewa Ruangan Tenant Komersial (Dataset No. 14):</strong> Mengelola <strong>{RS_TENANT_SEWA.length} tenant komersial</strong> aktif dengan proyeksi PNBP sewa tahunan mencapai Rp 2,06 Miliar.
              </li>
            </ul>
          </div>

          {/* Section II: Rincian Keuangan */}
          <div>
            <h2 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">
              II. REKAPITULASI POS PNBP DAN BELANJA
            </h2>
            <div className="overflow-x-auto my-2">
              <table className="w-full border-collapse border border-slate-300 text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="border border-slate-300 p-2">No</th>
                    <th className="border border-slate-300 p-2">Pos Layanan Penghasil PNBP</th>
                    <th className="border border-slate-300 p-2 text-right">Target (Rp M)</th>
                    <th className="border border-slate-300 p-2 text-right">Realisasi (Rp M)</th>
                    <th className="border border-slate-300 p-2 text-right">Capaian (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-2">1</td>
                    <td className="border border-slate-300 p-2">Instalasi Rawat Inap (VIP, Kelas 1-3)</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">45,00</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">38,60</td>
                    <td className="border border-slate-300 p-2 text-right font-mono font-bold text-emerald-700">85,78%</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">2</td>
                    <td className="border border-slate-300 p-2">Instalasi Rawat Jalan (Poli Spesialis)</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">32,00</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">27,40</td>
                    <td className="border border-slate-300 p-2 text-right font-mono font-bold text-emerald-700">85,63%</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">3</td>
                    <td className="border border-slate-300 p-2">Instalasi Bedah Sentral (IBS)</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">24,00</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">20,80</td>
                    <td className="border border-slate-300 p-2 text-right font-mono font-bold text-emerald-700">86,67%</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">4</td>
                    <td className="border border-slate-300 p-2">Instalasi Farmasi & BMHP Medis</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">20,00</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">16,50</td>
                    <td className="border border-slate-300 p-2 text-right font-mono font-bold text-emerald-700">82,50%</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">5</td>
                    <td className="border border-slate-300 p-2">Laboratorium Klinis & Patologi Anatomi</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">11,50</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">9,80</td>
                    <td className="border border-slate-300 p-2 text-right font-mono font-bold text-emerald-700">85,22%</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">6</td>
                    <td className="border border-slate-300 p-2">Radiologi & Diagnostic Imaging</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">8,50</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">6,20</td>
                    <td className="border border-slate-300 p-2 text-right font-mono font-bold text-emerald-700">72,94%</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">7</td>
                    <td className="border border-slate-300 p-2">Sewa Ruangan & Fasilitas Tenant (DS-14)</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">4,00</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">2,50</td>
                    <td className="border border-slate-300 p-2 text-right font-mono font-bold text-emerald-700">62,50%</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td colSpan={2} className="border border-slate-300 p-2 text-center uppercase">Total Akumulasi PNBP</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">145,00</td>
                    <td className="border border-slate-300 p-2 text-right font-mono">121,80</td>
                    <td className="border border-slate-300 p-2 text-right font-mono text-emerald-800">84,00%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section III: Indikator Efisiensi & Barber Johnson */}
          <div>
            <h2 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">
              III. INDIKATOR EFISIENSI RUMAH SAKIT (STANDAR KEMENKES RI)
            </h2>
            <p className="indent-6 text-slate-700">
              Pengukuran indikator efisiensi rawat inap menggunakan parameter Barber Johnson menunjukkan bahwa seluruh indikator operasional ranjang RSBP berada dalam interval ideal:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-3">
              {RS_INDIKATOR_EFISIENSI.map((ef) => (
                <div key={ef.kode} className="p-2 border border-slate-200 rounded-lg bg-slate-50 text-xs">
                  <div className="font-bold text-slate-800">{ef.kode} - {ef.indikator}</div>
                  <div className="text-base font-black text-emerald-800 mt-0.5">{ef.nilai} {ef.satuan}</div>
                  <div className="text-[10px] text-slate-500">Standar: {ef.standarIdealKemenkes}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section IV: Rekap Sewa Ruangan Tenant */}
          <div>
            <h2 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">
              IV. REKAPITULASI SEWA RUANGAN & TENANT FASILITAS RSBP (DATASET NO. 14)
            </h2>
            <div className="overflow-x-auto my-2">
              <table className="w-full border-collapse border border-slate-300 text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="border border-slate-300 p-1.5">Nama Tenant</th>
                    <th className="border border-slate-300 p-1.5">No. Perjanjian</th>
                    <th className="border border-slate-300 p-1.5">Masa Berlaku</th>
                    <th className="border border-slate-300 p-1.5">Jatuh Tempo</th>
                    <th className="border border-slate-300 p-1.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RS_TENANT_SEWA.slice(0, 5).map((t) => (
                    <tr key={t.id}>
                      <td className="border border-slate-300 p-1.5 font-semibold">{t.namaTenant}</td>
                      <td className="border border-slate-300 p-1.5 font-mono text-[10px]">{t.nomorPerjanjian}</td>
                      <td className="border border-slate-300 p-1.5">{t.masaBerlaku}</td>
                      <td className="border border-slate-300 p-1.5 font-bold text-amber-800">{t.jatuhTempo}</td>
                      <td className="border border-slate-300 p-1.5 text-center font-bold text-emerald-700">{t.statusSewa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-8 grid grid-cols-2 text-center text-xs">
            <div>
              <p className="text-slate-500">Mengetahui,</p>
              <p className="font-bold text-slate-800 uppercase mt-0.5">
                Direktur Badan Usaha Rumah Sakit BP Batam
              </p>
              <div className="h-16 flex items-center justify-center">
                <span className="font-serif italic text-slate-300 text-sm">[Tanda Tangan & Cap Dinas]</span>
              </div>
              <p className="font-bold text-slate-900 underline">dr. Direktur RSBP Batam, Sp.B, M.Kes</p>
              <p className="text-[10px] text-slate-500 font-mono">NIP. 19740815 200212 1 002</p>
            </div>

            <div>
              <p className="text-slate-500">Batam, 15 April 2026</p>
              <p className="font-bold text-slate-800 uppercase mt-0.5">
                Kepala Subdirektorat Keuangan & Penatausahaan RSBP
              </p>
              <div className="h-16 flex items-center justify-center">
                <span className="font-serif italic text-slate-300 text-sm">[Tanda Tangan Elektronik]</span>
              </div>
              <p className="font-bold text-slate-900 underline">Kabag Keuangan & Evaluasi Kinerja</p>
              <p className="text-[10px] text-slate-500 font-mono">NIP. 19800520 200501 2 004</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
