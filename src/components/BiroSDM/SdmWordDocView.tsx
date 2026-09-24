import React from 'react';
import { Download, Printer, FileText, CheckCircle2, Shield } from 'lucide-react';
import { SdmYearData } from './types';

interface SdmWordDocViewProps {
  data: SdmYearData;
}

export const SdmWordDocView: React.FC<SdmWordDocViewProps> = ({ data }) => {
  const { sistemMerit, gender, statusKepegawaian, pendidikan, tahun, totalPegawai } = data;
  const meritRow = sistemMerit.datasetRow;

  const handleDownloadDoc = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Laporan Kinerja SDM BP Batam ${tahun}</title>
    <style>
      body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #111827; }
      h1 { font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 4pt; }
      h2 { font-size: 13pt; font-weight: bold; border-bottom: 2px solid #002B49; padding-bottom: 3pt; margin-top: 14pt; }
      table { width: 100%; border-collapse: collapse; margin-top: 8pt; margin-bottom: 12pt; }
      th, td { border: 1px solid #CBD5E1; padding: 6pt; font-size: 10pt; }
      th { background-color: #F1F5F9; font-weight: bold; }
      .text-right { text-align: right; }
      .text-center { text-align: center; }
      .badge { font-weight: bold; color: #059669; }
    </style></head><body>`;

    const body = document.getElementById('sdm-doc-content')?.innerHTML || '';
    const footer = `</body></html>`;
    const sourceHTML = header + body + footer;

    const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_Eksekutif_SDM_BP_Batam_${tahun}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">Format Dokumen Resmi Biro SDM BP Batam</h3>
            <p className="text-xs text-slate-500">Pratinjau naskah dinas siap cetak atau ekspor ke Microsoft Word (.doc)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / PDF</span>
          </button>
          <button
            onClick={handleDownloadDoc}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh File Word (.doc)</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT PREVIEW CONTAINER */}
      <div className="bg-slate-100 p-3 sm:p-6 rounded-xl flex justify-center">
        <div
          id="sdm-doc-content"
          className="bg-white max-w-4xl w-full p-6 sm:p-12 shadow-md border border-slate-300 rounded-lg text-slate-900 leading-relaxed font-sans"
        >
          {/* KOP SURAT BP BATAM */}
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-900 m-0">
              BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
            </h2>
            <h1 className="text-sm sm:text-base font-bold text-slate-800 uppercase mt-1">
              BIRO SUMBER DAYA MANUSIA
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Gedung Utama BP Batam Lt. 3, Jl. Ibnu Sutowo No. 1 Batam Centre, Kota Batam 29400
            </p>
          </div>

          {/* DOCUMENT TITLE */}
          <div className="text-center my-6">
            <h3 className="text-base sm:text-lg font-bold underline uppercase">
              LAPORAN KINERJA PENGELOLAAN SDM &amp; EVALUASI SISTEM MERIT TAHUN {tahun}
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Nomor: LAP-SDM/BPB/{tahun}/009 · Tanggal Pelaporan: 31 Desember {tahun}
            </p>
          </div>

          {/* BAB I: RINGKASAN EKSEKUTIF */}
          <div className="space-y-2 mt-6">
            <h4 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1">
              I. Ringkasan Eksekutif &amp; Demografi SDM
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 text-justify">
              Pada Tahun Anggaran {tahun}, total sumber daya manusia yang bertugas di lingkungan Badan Pengusahaan Batam tercatat sebanyak <strong>{totalPegawai.toLocaleString('id-ID')} orang pegawai</strong>. Komposisi berdasarkan jenis kelamin mencatat pegawai laki-laki sebanyak <strong>{gender.lakiLaki.jumlah.toLocaleString('id-ID')} orang ({gender.lakiLaki.persentase.toFixed(1)}%)</strong> dan pegawai perempuan sebanyak <strong>{gender.perempuan.jumlah.toLocaleString('id-ID')} orang ({gender.perempuan.persentase.toFixed(1)}%)</strong>.
            </p>
          </div>

          {/* TABEL STATUS KEPEGAWAIAN */}
          <div className="space-y-2 mt-6">
            <h4 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1">
              II. Jumlah Pegawai Berdasarkan Status Kepegawaian (Dataset #8)
            </h4>
            <table className="w-full text-xs border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-2 border border-slate-300">No</th>
                  <th className="p-2 border border-slate-300">Status Pegawai</th>
                  <th className="p-2 border border-slate-300 text-right">Jumlah Pegawai</th>
                  <th className="p-2 border border-slate-300 text-right">Persentase</th>
                </tr>
              </thead>
              <tbody>
                {statusKepegawaian.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="p-2 border border-slate-300 text-center font-mono">{idx + 1}</td>
                    <td className="p-2 border border-slate-300 font-medium">{item.statusPegawai}</td>
                    <td className="p-2 border border-slate-300 text-right font-mono font-bold">
                      {item.jumlahPegawai.toLocaleString('id-ID')} Orang
                    </td>
                    <td className="p-2 border border-slate-300 text-right font-mono">
                      {item.persentase.toFixed(2)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-bold">
                  <td colSpan={2} className="p-2 border border-slate-300">Total Pegawai BP Batam</td>
                  <td className="p-2 border border-slate-300 text-right font-mono">
                    {totalPegawai.toLocaleString('id-ID')} Orang
                  </td>
                  <td className="p-2 border border-slate-300 text-right font-mono">100.00%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* TABEL PENDIDIKAN PEGAWAI */}
          <div className="space-y-2 mt-6">
            <h4 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1">
              III. Jumlah Pegawai Berdasarkan Tingkat Pendidikan (Dataset #9)
            </h4>
            <table className="w-full text-xs border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-2 border border-slate-300">No</th>
                  <th className="p-2 border border-slate-300">Tingkat Pendidikan</th>
                  <th className="p-2 border border-slate-300 text-right">Jumlah Pegawai</th>
                  <th className="p-2 border border-slate-300 text-right">Persentase</th>
                  <th className="p-2 border border-slate-300">Keterangan Golongan</th>
                </tr>
              </thead>
              <tbody>
                {pendidikan.map((row, idx) => (
                  <tr key={row.id}>
                    <td className="p-2 border border-slate-300 text-center font-mono">{idx + 1}</td>
                    <td className="p-2 border border-slate-300 font-medium">{row.tingkatPendidikan}</td>
                    <td className="p-2 border border-slate-300 text-right font-mono font-bold">
                      {row.jumlahPegawai.toLocaleString('id-ID')} Orang
                    </td>
                    <td className="p-2 border border-slate-300 text-right font-mono">
                      {row.persentase.toFixed(2)}%
                    </td>
                    <td className="p-2 border border-slate-300 text-slate-600">{row.golonganDominan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BAB IV: EVALUASI SISTEM MERIT */}
          <div className="space-y-2 mt-6">
            <h4 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1">
              IV. Hasil Penilaian Sistem Merit 8 Aspek KASN (Dataset #12)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 text-justify">
              Berdasarkan hasil evaluasi mandiri dan verifikasi Komisi Aparatur Sipil Negara (KASN), BP Batam memperoleh total skor <strong>{meritRow.TOTAL_NILAI_MERIT.toFixed(1)} dari total nilai 400.0</strong> dengan <strong>Indeks Sistem Merit sebesar {meritRow.INDEKS_SISTEM_MERIT.toFixed(4)}</strong>, menempatkan BP Batam pada <strong>{meritRow.STATUS_PEMENUHAN}</strong>.
            </p>

            <table className="w-full text-xs border border-slate-300 mt-3">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-2 border border-slate-300">Komponen Penilaian (8 Aspek)</th>
                  <th className="p-2 border border-slate-300 text-center">Bobot</th>
                  <th className="p-2 border border-slate-300 text-right">Nilai Aspek</th>
                  <th className="p-2 border border-slate-300 text-right">Nilai Maks</th>
                  <th className="p-2 border border-slate-300 text-right">Indeks</th>
                  <th className="p-2 border border-slate-300 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {sistemMerit.aspekList.map((aspek) => (
                  <tr key={aspek.id}>
                    <td className="p-2 border border-slate-300 font-medium">{aspek.nama}</td>
                    <td className="p-2 border border-slate-300 text-center font-mono">{aspek.bobotPersen}%</td>
                    <td className="p-2 border border-slate-300 text-right font-mono font-bold">{aspek.nilaiAspek.toFixed(1)}</td>
                    <td className="p-2 border border-slate-300 text-right font-mono">{aspek.nilaiMaks}</td>
                    <td className="p-2 border border-slate-300 text-right font-mono font-bold text-emerald-700">{aspek.indeksAspek.toFixed(3)}</td>
                    <td className="p-2 border border-slate-300 text-center font-medium">{aspek.statusPemenuhan}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-bold">
                  <td className="p-2 border border-slate-300">INDEKS SISTEM MERIT NASIONAL</td>
                  <td className="p-2 border border-slate-300 text-center font-mono">100%</td>
                  <td className="p-2 border border-slate-300 text-right font-mono text-emerald-800">{meritRow.TOTAL_NILAI_MERIT.toFixed(1)}</td>
                  <td className="p-2 border border-slate-300 text-right font-mono">400.0</td>
                  <td className="p-2 border border-slate-300 text-right font-mono text-emerald-800">{meritRow.INDEKS_SISTEM_MERIT.toFixed(4)}</td>
                  <td className="p-2 border border-slate-300 text-center text-emerald-800 font-bold">{meritRow.STATUS_PEMENUHAN}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SIGNATURE SECTION */}
          <div className="mt-12 pt-6 flex justify-end">
            <div className="text-center text-xs space-y-1 w-64">
              <p>Batam, 31 Desember {tahun}</p>
              <p className="font-bold">Kepala Biro Sumber Daya Manusia</p>
              <p className="font-bold">BP Batam</p>
              <div className="h-16" />
              <p className="font-bold underline uppercase">( Pejabat Pembina Kepegawaian )</p>
              <p className="text-slate-500 font-mono">NIP. 19780415 200312 1 002</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
