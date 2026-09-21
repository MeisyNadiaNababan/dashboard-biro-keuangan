import React from 'react';
import { Download, FileText, CheckCircle2, ArrowLeft, Printer } from 'lucide-react';
import {
  ALOKASI_LAHAN_INVESTASI_DATA,
  TARGET_PENERIMAAN_PNBP_LAHAN,
  SWP_LAHAN_TERSEDIA_DATA,
  ENAM_LAYANAN_LAHAN_DATA,
} from './lahanData';

interface LahanKpiWordDocViewProps {
  onBack: () => void;
}

export const LahanKpiWordDocView: React.FC<LahanKpiWordDocViewProps> = ({ onBack }) => {
  const handleDownloadDoc = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <title>Laporan Kinerja Direktorat Pengelolaan Lahan BP Batam</title>
        <style>
          body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #111; margin: 40px; }
          h1 { color: #0C4A6E; font-size: 18pt; border-bottom: 2px solid #0284C7; padding-bottom: 6px; margin-bottom: 4px; }
          h2 { color: #075985; font-size: 14pt; margin-top: 18px; margin-bottom: 6px; border-bottom: 1px solid #BAE6FD; padding-bottom: 4px; }
          h3 { color: #0369A1; font-size: 12pt; margin-top: 14px; margin-bottom: 4px; }
          p { margin: 6px 0; }
          table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 10pt; }
          th { background-color: #0284C7; color: #FFFFFF; font-weight: bold; text-align: left; padding: 6px 8px; border: 1px solid #0369A1; }
          td { padding: 5px 8px; border: 1px solid #CBD5E1; }
          tr:nth-child(even) { background-color: #F8FAFC; }
          .badge { font-weight: bold; color: #0284C7; }
          .header-box { background-color: #F0F9FF; border: 1px solid #BAE6FD; padding: 12px; border-radius: 6px; margin-bottom: 16px; }
        </style>
      </head>
      <body>
        <div class="header-box">
          <h1>BADAN PENGUSAHAAN BATAM (BP BATAM)</h1>
          <p><strong>DIREKTORAT PENGELOLAAN LAHAN</strong></p>
          <p>Laporan Eksekutif Monitoring Pengelolaan Lahan &amp; Kesiapan Ruang Investasi Kota Batam</p>
          <p><em>Sumber Data: Katalog Atribut Daftar Data Satu Data BP Batam (Hal. 6-8)</em></p>
        </div>

        <h2>I. INDIKATOR KINERJA UTAMA (EXECUTIVE KPI)</h2>
        <table>
          <tr>
            <th>No</th>
            <th>Indikator Kinerja</th>
            <th>Dataset Acuan</th>
            <th>Capaian Realisasi</th>
            <th>Keterangan / Dampak</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Luas Lahan yang Dialokasikan untuk Investasi</td>
            <td>Dataset No. 14</td>
            <td>485,02 Hektar (4.850.230 m²)</td>
            <td>Mendukung komitmen investasi strategis Rp 34,85 Triliun (312 persil disetujui)</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jumlah Perizinan Peralihan Hak Atas Tanah</td>
            <td>Dataset No. 9</td>
            <td>7.588 Berkas (5.712 Disetujui)</td>
            <td>Tingkat persetujuan 75,28%, kepastian hukum transaksi properti & industri</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Jumlah Perizinan Perpanjangan Hak Atas Tanah</td>
            <td>Dataset No. 13</td>
            <td>3.420 Berkas (2.958 Disetujui)</td>
            <td>Tingkat persetujuan 86,49%, perpanjangan siklus UWT 20-30 tahun</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Realisasi Target PNBP UWT Pertanahan</td>
            <td>Dataset No. 12</td>
            <td>Rp 714,28 Miliar (84,03%)</td>
            <td>Pagu target Rp 850 Miliar, kepatuhan SLA pelayanan 6,2 hari kerja</td>
          </tr>
        </table>

        <h2>II. REKAPITULASI PENERBITAN DOKUMEN LAHAN &amp; PENETAPAN LOKASI (PL)</h2>
        <h3>1. Rekapitulasi Penerbitan SKPT &amp; SPPT (Dataset #1 &amp; #2)</h3>
        <p>Surat Perjanjian Pengelolaan Tanah (SKPT) dan Surat Keputusan Pengelolaan Tanah (SPPT) merupakan instrumen perizinan legal pemanfaatan tanah di atas HPL BP Batam.</p>
        <table>
          <tr>
            <th>Kategori Layanan</th>
            <th>Disetujui</th>
            <th>Ditolak</th>
            <th>Total Berkas</th>
            <th>% Kelulusan</th>
          </tr>
          <tr>
            <td>SKPT &amp; SPPT Baru (Dataset #1)</td>
            <td>1.842</td>
            <td>412</td>
            <td>2.254</td>
            <td>81,7%</td>
          </tr>
          <tr>
            <td>SKPT &amp; SPPT Perubahan (Dataset #2)</td>
            <td>2.485</td>
            <td>568</td>
            <td>3.053</td>
            <td>81,4%</td>
          </tr>
        </table>

        <h3>2. Rekapitulasi Pecah PL &amp; Revisi PL (Dataset #3 &amp; #4)</h3>
        <table>
          <tr>
            <th>Kategori Permohonan</th>
            <th>Disetujui</th>
            <th>Ditolak</th>
            <th>Total Persil</th>
            <th>% Kelulusan</th>
          </tr>
          <tr>
            <td>Pecah Penetapan Lokasi (Dataset #3)</td>
            <td>2.695</td>
            <td>692</td>
            <td>3.387</td>
            <td>79,6%</td>
          </tr>
          <tr>
            <td>Revisi Penetapan Lokasi (Dataset #4)</td>
            <td>1.430</td>
            <td>325</td>
            <td>1.755</td>
            <td>81,5%</td>
          </tr>
        </table>

        <h2>III. KETERSEDIAAN LAHAN PER SUB WILAYAH PENGEMBANGAN (SWP) (DATASET #15)</h2>
        <table>
          <tr>
            <th>Zona Sub Wilayah (SWP)</th>
            <th>Luas (Ha)</th>
            <th>Persil Tersedia</th>
            <th>Persil Siap Pakai</th>
            <th>Peruntukan Utama</th>
          </tr>
          ${SWP_LAHAN_TERSEDIA_DATA.map(
            (s) => `
            <tr>
              <td>${s.swp}</td>
              <td>${s.luasHa} Ha</td>
              <td>${s.jumlahPersil}</td>
              <td>${s.persilSiapPakai}</td>
              <td>${s.peruntukanUtama}</td>
            </tr>
          `
          ).join('')}
        </table>

        <h2>IV. ANALISIS 6 LAYANAN PENGELOLAAN LAHAN</h2>
        <table>
          <tr>
            <th>No</th>
            <th>Layanan Pertanahan</th>
            <th>No Dataset</th>
            <th>Total Masuk</th>
            <th>Disetujui</th>
            <th>Ditolak</th>
            <th>Tingkat Acc</th>
          </tr>
          ${ENAM_LAYANAN_LAHAN_DATA.map(
            (l, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${l.namaLayanan}</td>
              <td>#${l.noDataset}</td>
              <td>${l.jumlahPermohonan.toLocaleString('id-ID')}</td>
              <td>${l.disetujui.toLocaleString('id-ID')}</td>
              <td>${l.ditolak.toLocaleString('id-ID')}</td>
              <td>${l.rasioDisetujui}%</td>
            </tr>
          `
          ).join('')}
        </table>

        <br/>
        <p><em>Dokumen ini dihasilkan secara otomatis oleh Dashboard Command Center BP Batam.</em></p>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Laporan_Eksekutif_Direktorat_Pengelolaan_Lahan_BP_Batam.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4 font-sans">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
            title="Kembali ke Tampilan Dashboard Visual"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Dokumen Resmi Eksekutif: Direktorat Pengelolaan Lahan
            </h3>
            <p className="text-xs text-slate-500">
              Format Laporan Briefing Direktur &amp; Kepala BP Batam (Dapat diunduh dalam format .doc / Word)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Halaman</span>
          </button>
          <button
            onClick={handleDownloadDoc}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .DOC (Microsoft Word)</span>
          </button>
        </div>
      </div>

      {/* Document Sheet Preview */}
      <div className="bg-white text-slate-900 rounded-xl p-6 sm:p-8 shadow-inner font-sans max-w-4xl mx-auto space-y-5">
        <div className="border-b-2 border-sky-600 pb-3 text-center">
          <h2 className="text-xl font-black text-sky-950 tracking-tight">BADAN PENGUSAHAAN BATAM (BP BATAM)</h2>
          <h3 className="text-base font-bold text-sky-800">DIREKTORAT PENGELOLAAN LAHAN</h3>
          <p className="text-xs text-slate-600 mt-1">
            Ringkasan Eksekutif Kinerja Pengelolaan Lahan &amp; Ketersediaan Ruang Investasi Kota Batam
          </p>
        </div>

        {/* Section 1 */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 border-b border-sky-200 pb-1 mb-2">
            I. Capaian Indikator Kinerja Utama (KPI Pertanahan)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Luas Lahan Investasi (#14)</span>
              <span className="text-lg font-bold text-sky-900">
                {ALOKASI_LAHAN_INVESTASI_DATA.totalLuasAlokasiHa} Ha
              </span>
              <span className="text-[10px] text-emerald-700 block">312 Persil Disetujui</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Peralihan Hak Lahan (#9)</span>
              <span className="text-lg font-bold text-emerald-800">7.588 Berkas</span>
              <span className="text-[10px] text-emerald-700 block">5.712 Disetujui (75,3%)</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Perpanjangan Hak (#13)</span>
              <span className="text-lg font-bold text-indigo-800">3.420 Berkas</span>
              <span className="text-[10px] text-indigo-700 block">2.958 Disetujui (86,5%)</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Realisasi PNBP UWT (#12)</span>
              <span className="text-lg font-bold text-amber-800">Rp 714,3 M</span>
              <span className="text-[10px] text-amber-700 block">84% dari Pagu Rp 850 M</span>
            </div>
          </div>
        </div>

        {/* Section 2: Table Summary of SWP */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 border-b border-sky-200 pb-1 mb-2">
            II. Sebaran Lahan Tersedia Sub Wilayah Pengembangan (SWP) (Dataset #15)
          </h4>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-sky-50 text-sky-950 border border-slate-300 font-bold">
                <th className="p-2">Sub Wilayah (SWP)</th>
                <th className="p-2 text-right">Luas (Ha)</th>
                <th className="p-2 text-right">Total Persil</th>
                <th className="p-2 text-right">Siap Pakai</th>
                <th className="p-2">Peruntukan Utama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 border border-slate-300">
              {SWP_LAHAN_TERSEDIA_DATA.slice(0, 6).map((s) => (
                <tr key={s.id}>
                  <td className="p-2 font-medium">{s.swp}</td>
                  <td className="p-2 text-right font-mono">{s.luasHa} Ha</td>
                  <td className="p-2 text-right font-mono">{s.jumlahPersil}</td>
                  <td className="p-2 text-right font-mono text-emerald-700 font-bold">{s.persilSiapPakai}</td>
                  <td className="p-2 text-slate-600">{s.peruntukanUtama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Katalog Satu Data Hal. 6-8 • Direktorat Pengelolaan Lahan BP Batam</span>
          <span>Dokumen Siap Dicetak / Disahkan</span>
        </div>
      </div>
    </div>
  );
};
