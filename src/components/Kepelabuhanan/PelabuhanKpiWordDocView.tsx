import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Copy,
  Building2,
  ShieldCheck,
  Table,
} from 'lucide-react';

export const PelabuhanKpiWordDocView: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownloadWordDoc = () => {
    setDownloading(true);

    const docContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>DOKUMEN_KPI_DIREKTORAT_PENGELOLAAN_KEPELABUHANAN_BP_BATAM</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; }
          h1 { font-size: 16pt; color: #0B1728; text-align: center; margin-bottom: 4pt; font-weight: bold; }
          h2 { font-size: 13pt; color: #1F4E79; border-bottom: 2px solid #1F4E79; padding-bottom: 3pt; margin-top: 14pt; }
          h3 { font-size: 11pt; color: #334155; margin-top: 8pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 8pt; margin-bottom: 12pt; }
          th, td { border: 1px solid #cbd5e1; padding: 6pt 8pt; text-align: left; font-size: 9.5pt; vertical-align: top; }
          th { background-color: #f1f5f9; color: #0f172a; font-weight: bold; }
          .highlight { background-color: #f8fafc; font-weight: bold; }
          .badge { display: inline-block; padding: 2pt 5pt; border-radius: 3pt; font-size: 8.5pt; font-weight: bold; }
          .footer { font-size: 9pt; color: #64748b; text-align: center; margin-top: 24pt; border-top: 1px solid #e2e8f0; padding-top: 6pt; }
        </style>
      </head>
      <body>
        <h1>BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM (BP BATAM)</h1>
        <h1 style="font-size: 14pt; color: #1F4E79;">DIREKTORAT PENGELOLAAN KEPELABUHANAN</h1>
        <p style="text-align: center; font-size: 10pt; color: #64748b; margin-top: -2pt;">
          DOKUMEN MATRIKS KEY PERFORMANCE INDICATORS (KPI) EKSEKUTIF BERDASARKAN SATU DATA BP BATAM<br>
          Tahun Anggaran: 2026 | Dokumen Sumber: Atribut Daftar Data Satu Data.pdf (Halaman 14 - 17)
        </p>
        <hr/>

        <h2>I. RINGKASAN CAPAIAN INDIKATOR KINERJA UTAMA (IKU) KEPELABUHANAN</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Indikator Kinerja (KPI)</th>
              <th>Sumber Dataset</th>
              <th>Target 2026</th>
              <th>Realisasi s/d April 2026</th>
              <th>% Capaian</th>
              <th>Status Evaluasi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><strong>Realisasi PNBP Kepelabuhanan</strong></td>
              <td>Dataset #3: Realisasi PNBP Kepelabuhanan</td>
              <td>Rp 480,00 M</td>
              <td>Rp 428,50 M</td>
              <td>89,3%</td>
              <td>On Track / Sangat Baik (+12,4% YoY)</td>
            </tr>
            <tr>
              <td>2</td>
              <td><strong>Realisasi Belanja Direktorat</strong></td>
              <td>Dataset #2: Realisasi Belanja Kepelabuhanan</td>
              <td>Rp 215,00 M (Pagu)</td>
              <td>Rp 184,25 M</td>
              <td>85,7%</td>
              <td>Serapan Anggaran Optimal (Cost-to-Income 43%)</td>
            </tr>
            <tr>
              <td>3</td>
              <td><strong>Indeks Kepuasan Masyarakat (IKM)</strong></td>
              <td>Dataset #21: IKM Layanan Pelabuhan</td>
              <td>&ge; 85,00</td>
              <td>88,40</td>
              <td>104,0%</td>
              <td>Kategori Mutu A (Sangat Baik / 9 Unsur)</td>
            </tr>
            <tr>
              <td>4</td>
              <td><strong>Jumlah Penumpang Domestik &amp; Internasional</strong></td>
              <td>Dataset #25: Arus Penumpang</td>
              <td>9,50 Juta Pax</td>
              <td>7,43 Juta Pax</td>
              <td>78,2%</td>
              <td>3,68M Datang / 3,75M Berangkat (Batam Centre 38,7%)</td>
            </tr>
            <tr>
              <td>5</td>
              <td><strong>Jumlah Dermaga &amp; Utilitas BOR</strong></td>
              <td>Dataset #4: Daftar Dermaga BP Batam</td>
              <td>60 - 70% BOR</td>
              <td>24 Dermaga (BOR 64,8%)</td>
              <td>Optimal</td>
              <td>Panjang 3.840m, Draf s.d. -14 MLWS (Standar UNCTAD)</td>
            </tr>
            <tr>
              <td>6</td>
              <td><strong>Kunjungan Kapal Barang &amp; Penumpang</strong></td>
              <td>Dataset #5 &amp; #7: Kunjungan Kapal</td>
              <td>60.000 Call</td>
              <td>48.650 Call (61,4 Jt GT)</td>
              <td>81,1%</td>
              <td>Barang: 16.240 Call (42,8M GT) | Penumpang: 32.410 Call</td>
            </tr>
          </tbody>
        </table>

        <h2>II. FORMULA PERHITUNGAN TABLEAU CALCULATED FIELDS</h2>
        <table>
          <thead>
            <tr>
              <th>Kode KPI</th>
              <th>Nama Formula</th>
              <th>Kalkulasi Terhitung (Calculated Field)</th>
              <th>Keterangan Operasional</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DPKPL-01</td>
              <td>% Capaian PNBP</td>
              <td><code>(SUM([JUMLAH_PNBP]) / SUM([TARGET_PNBP])) * 100</code></td>
              <td>Agregasi akun Jasa Labuh, Tambat, Dermaga, Pandu/Tunda, dan Pass Pelabuhan.</td>
            </tr>
            <tr>
              <td>DPKPL-02</td>
              <td>% Serapan Belanja</td>
              <td><code>(SUM([REALISASI_BELANJA]) / SUM([PAGU_DIPA])) * 100</code></td>
              <td>Monev penyerapan belanja pemeliharaan dermaga dan modernisasi alat STS crane.</td>
            </tr>
            <tr>
              <td>DPKPL-03</td>
              <td>Indeks IKM Tertimbang</td>
              <td><code>(SUM([NILAI_UNSUR_1..9]) / 9) * 25</code></td>
              <td>Konversi standar PermenPAN-RB dari skala 4 ke skala 100.</td>
            </tr>
            <tr>
              <td>DPKPL-04</td>
              <td>Total Penumpang</td>
              <td><code>SUM([KEDATANGAN]) + SUM([KEBERANGKATAN])</code></td>
              <td>Jumlah penumpang di 5 terminal feri internasional dan pelabuhan domestik.</td>
            </tr>
            <tr>
              <td>DPKPL-05</td>
              <td>Berth Occupancy Ratio (BOR %)</td>
              <td><code>(SUM([JAM_TAMBAT]) / (24 * [JML_DERMAGA] * [HARI])) * 100</code></td>
              <td>Indikator tingkat kepadatan sandar dermaga BP Batam (standar UNCTAD 60-70%).</td>
            </tr>
            <tr>
              <td>DPKPL-06</td>
              <td>Total Call &amp; GT Kapal</td>
              <td><code>SUM([CALL_DALAM]) + SUM([CALL_LUAR])</code></td>
              <td>Akumulasi panggilan kapal barang dan kapal penumpang di seluruh perairan Batam.</td>
            </tr>
            <tr>
              <td>DPKPL-07</td>
              <td>Throughput Peti Kemas Batu Ampar</td>
              <td><code>SUM([BONGKAR_TEUS]) + SUM([MUAT_TEUS])</code></td>
              <td>Volume lalu lintas kontainer di Terminal Peti Kemas Batu Ampar (Target 650k TEUs).</td>
            </tr>
          </tbody>
        </table>

        <h2>III. REKOMENDASI STRATEGIS PIMPINAN</h2>
        <ol>
          <li><strong>Akselerasi Hub Logistik Maritim Batu Ampar:</strong> Optimalisasi operasional penuh STS Crane di Dermaga Utara telah membuktikan pemangkasan <em>dwell time</em> menjadi 2,8 hari. Disarankan memperluas <em>container yard</em> (CY) untuk menyerap proyeksi 650.000 TEUs di akhir 2026.</li>
          <li><strong>Digitalisasi Terpadu Batam Maritime System (BMS):</strong> Integrasi penuh izin sandar, jasa labuh tambat, dan pemanduan ke dalam sistem Single Submission terbukti menaikkan IKM ke angka 88,40 (Mutu A).</li>
          <li><strong>Peningkatan Fasilitas Sterilisasi Terminal Feri Internasional:</strong> Dengan arus 2,87 Juta penumpang di Batam Centre dan 1,71 Juta di Harbour Bay, penambahan gerbang <em>autogate</em> keimigrasian dan pengawasan ISPS Code wajib dipertahankan secara konsisten.</li>
        </ol>

        <div class="footer">
          Dicetak secara otomatis melalui Sistem Dashboard Eksekutif Satu Data BP Batam • Direktorat Pengelolaan Kepelabuhanan
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', docContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Dokumen_KPI_Direktorat_Kepelabuhanan_BP_Batam_2026.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloading(false), 800);
  };

  const handleCopySummary = () => {
    const text = `DOKUMEN KPI DIREKTORAT PENGELOLAAN KEPELABUHANAN BP BATAM (TA 2026)
1. Realisasi PNBP Kepelabuhanan: Rp 428,50 M (89,3% dari Target Rp 480,00 M)
2. Realisasi Belanja: Rp 184,25 M (85,7% dari Pagu Rp 215,00 M)
3. IKM Layanan Pelabuhan: 88,40 (Predikat A - Sangat Baik)
4. Jumlah Penumpang: 7,43 Juta Pax (3,68M Datang / 3,75M Berangkat)
5. Jumlah Dermaga: 24 Dermaga Aktif (BOR 64,8% - Standar UNCTAD)
6. Kunjungan Kapal: 48.650 Call (61,4 Juta GT)
Throughput Peti Kemas Batu Ampar: 210.000 TEUs (YTD) / Dwell Time 2,8 Hari`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header Actions Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-[#1F4E79]" />
            <h2 className="text-base font-bold text-slate-900">
              Dokumen KPI &amp; Rekomendasi Eksekutif Direktorat Pengelolaan Kepelabuhanan
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Format resmi Microsoft Word (.doc/.docx) siap cetak dan review pimpinan berdasarkan 25 dataset Satu Data
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 text-xs font-semibold cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Ringkasan</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadWordDoc}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1F4E79] hover:bg-[#163756] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Menyiapkan Dokumen...' : 'Unduh Dokumen Word (.doc)'}</span>
          </button>
        </div>
      </div>

      {/* Preview Sheet Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs max-w-4xl mx-auto font-sans">
        {/* Header BP Batam */}
        <div className="text-center pb-4 border-b-2 border-[#1F4E79] mb-5">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
            Badan Pengusahaan Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam (BP Batam)
          </h3>
          <h4 className="text-base font-extrabold text-[#1F4E79] mt-0.5">
            DIREKTORAT PENGELOLAAN KEPELABUHANAN
          </h4>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Dokumen Matriks Evaluasi Key Performance Indicators (KPI) Eksekutif Berbasis Satu Data BP Batam
          </p>
        </div>

        {/* Section 1: Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Table className="w-4 h-4 text-[#1F4E79]" />
              <span>I. Matriks Capaian 6 Indikator Mandat Utama (Hal. 14 - 17 PDF)</span>
            </h5>
            <span className="text-[10px] font-mono text-slate-500">Cut-Off: April 2026</span>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#0B1728] text-white text-[10.5px]">
                <tr>
                  <th className="py-2 px-2.5 w-8">No</th>
                  <th className="py-2 px-2.5">Indikator Kinerja (KPI)</th>
                  <th className="py-2 px-2.5">Katalog Satu Data</th>
                  <th className="py-2 px-2.5 text-right">Target 2026</th>
                  <th className="py-2 px-2.5 text-right">Realisasi 2026</th>
                  <th className="py-2 px-2.5 text-center">Capaian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                <tr className="bg-emerald-50/40">
                  <td className="py-2 px-2.5 font-bold">1</td>
                  <td className="py-2 px-2.5 font-bold text-slate-900">Realisasi PNBP Kepelabuhanan</td>
                  <td className="py-2 px-2.5 font-mono text-slate-600">Dataset #3</td>
                  <td className="py-2 px-2.5 text-right font-mono">Rp 480,00 M</td>
                  <td className="py-2 px-2.5 text-right font-mono font-bold text-emerald-700">Rp 428,50 M</td>
                  <td className="py-2 px-2.5 text-center font-bold text-emerald-700">89,3%</td>
                </tr>
                <tr>
                  <td className="py-2 px-2.5 font-bold">2</td>
                  <td className="py-2 px-2.5 font-bold text-slate-900">Realisasi Belanja Direktorat</td>
                  <td className="py-2 px-2.5 font-mono text-slate-600">Dataset #2</td>
                  <td className="py-2 px-2.5 text-right font-mono">Rp 215,00 M</td>
                  <td className="py-2 px-2.5 text-right font-mono font-bold text-blue-900">Rp 184,25 M</td>
                  <td className="py-2 px-2.5 text-center font-bold text-blue-700">85,7%</td>
                </tr>
                <tr className="bg-emerald-50/40">
                  <td className="py-2 px-2.5 font-bold">3</td>
                  <td className="py-2 px-2.5 font-bold text-slate-900">Indeks Kepuasan Masyarakat (IKM)</td>
                  <td className="py-2 px-2.5 font-mono text-slate-600">Dataset #21</td>
                  <td className="py-2 px-2.5 text-right font-mono">&ge; 85,00</td>
                  <td className="py-2 px-2.5 text-right font-mono font-bold text-emerald-700">88,40</td>
                  <td className="py-2 px-2.5 text-center font-bold text-emerald-700">Mutu A</td>
                </tr>
                <tr>
                  <td className="py-2 px-2.5 font-bold">4</td>
                  <td className="py-2 px-2.5 font-bold text-slate-900">Arus Penumpang Domestik &amp; Internasional</td>
                  <td className="py-2 px-2.5 font-mono text-slate-600">Dataset #25</td>
                  <td className="py-2 px-2.5 text-right font-mono">9,50 Juta Pax</td>
                  <td className="py-2 px-2.5 text-right font-mono font-bold text-indigo-700">7,43 Juta Pax</td>
                  <td className="py-2 px-2.5 text-center font-bold text-indigo-700">78,2%</td>
                </tr>
                <tr className="bg-emerald-50/40">
                  <td className="py-2 px-2.5 font-bold">5</td>
                  <td className="py-2 px-2.5 font-bold text-slate-900">Fasilitas Dermaga &amp; BOR</td>
                  <td className="py-2 px-2.5 font-mono text-slate-600">Dataset #4</td>
                  <td className="py-2 px-2.5 text-right font-mono">60 - 70% BOR</td>
                  <td className="py-2 px-2.5 text-right font-mono font-bold text-teal-700">24 Dermaga (64,8%)</td>
                  <td className="py-2 px-2.5 text-center font-bold text-teal-700">Ideal</td>
                </tr>
                <tr>
                  <td className="py-2 px-2.5 font-bold">6</td>
                  <td className="py-2 px-2.5 font-bold text-slate-900">Kunjungan Kapal Barang &amp; Penumpang</td>
                  <td className="py-2 px-2.5 font-mono text-slate-600">Dataset #5 &amp; #7</td>
                  <td className="py-2 px-2.5 text-right font-mono">60.000 Call</td>
                  <td className="py-2 px-2.5 text-right font-mono font-bold text-sky-700">48.650 Call</td>
                  <td className="py-2 px-2.5 text-center font-bold text-sky-700">81,1%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: Narrative */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-2">
            <h6 className="font-bold text-slate-900 uppercase tracking-wide">
              II. Ringkasan Evaluasi Kinerja untuk Direktur &amp; Kepala BP Batam
            </h6>
            <p className="leading-relaxed">
              1. <strong>Kinerja Finansial:</strong> Realisasi PNBP mencapai Rp 428,50 Miliar (89,3% dari target tahunan), didukung pemanfaatan Terminal Peti Kemas Batu Ampar yang prima. Dengan realisasi belanja Rp 184,25 Miliar, tercipta surplus operasional kepelabuhanan sebesar +Rp 244,25 Miliar.
            </p>
            <p className="leading-relaxed">
              2. <strong>Konektivitas &amp; Logistik Maritim:</strong> Total kunjungan kapal mencapai 48.650 Call dengan bobot 61,4 Juta GT. Throughput peti kemas Batu Ampar membukukan 210.000 TEUs dengan <em>dwell time</em> terkendali di 2,8 hari.
            </p>
            <p className="leading-relaxed">
              3. <strong>Kualitas Pelayanan Publik:</strong> Nilai IKM sebesar 88,40 menempatkan layanan kepelabuhanan BP Batam pada Mutu A (Sangat Baik), mencerminkan kepuasan tinggi dari asosiasi pelayaran INSA dan pengguna jasa feri internasional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
