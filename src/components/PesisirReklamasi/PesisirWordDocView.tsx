import React from 'react';
import {
  ArrowLeft,
  Download,
  Printer,
  FileText,
  Building,
  CheckCircle2,
  Anchor,
  Clock,
  Waves,
  ShieldAlert,
} from 'lucide-react';
import {
  KPI_PESISIR_REKLAMASI_DATA,
  DATASET_1_PERMASALAHAN,
  DATASET_2_RENCANA_PEMANFAATAN,
  DATASET_3_PERIZINAN_WAKTU,
  DATASET_4_PEMANFAATAN_INVESTASI,
  DISTRIBUSI_SWP_PESISIR_DATA,
} from './pesisirReklamasiData';

interface PesisirWordDocViewProps {
  onBack: () => void;
}

export const PesisirWordDocView: React.FC<PesisirWordDocViewProps> = ({ onBack }) => {
  const kpi = KPI_PESISIR_REKLAMASI_DATA;

  const handlePrint = () => {
    window.print();
  };

  const handleExportDoc = () => {
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Laporan Eksekutif Pengelolaan Pesisir dan Reklamasi BP Batam</title>" +
      "<style>body{font-family:Arial,sans-serif;line-height:1.6;font-size:11pt;color:#1e293b}table{width:100%;border-collapse:collapse;margin:15px 0}th,td{border:1px solid #cbd5e1;padding:8px;font-size:10pt}th{background-color:#f1f5f9;text-align:left}.kpi-box{border:1px solid #94a3b8;padding:12px;margin:10px 0;background:#f8fafc}</style></head><body>";
    const content = document.getElementById('word-export-content-pesisir')?.innerHTML || '';
    const footer = '</body></html>';
    const sourceHTML = header + content + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'Laporan_Eksekutif_Pesisir_Reklamasi_BP_Batam.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Dashboard Interaktif</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / PDF</span>
          </button>
          <button
            onClick={handleExportDoc}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-semibold hover:bg-sky-800 transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor File Word (.doc)</span>
          </button>
        </div>
      </div>

      {/* Document Canvas (A4 Paper Style) */}
      <div className="max-w-4xl mx-auto bg-white border border-slate-300 shadow-md rounded-xl p-8 sm:p-12 text-slate-900 print:border-none print:shadow-none print:p-0">
        <div id="word-export-content-pesisir" className="space-y-6">
          {/* Header Surat Kedinasan */}
          <div className="border-b-2 border-slate-900 pb-4 text-center">
            <h1 className="text-lg font-black tracking-wide uppercase text-slate-900">
              BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM (BP BATAM)
            </h1>
            <h2 className="text-base font-bold text-slate-800 mt-1 uppercase">
              DIREKTORAT PENGELOLAAN KAWASAN PESISIR DAN REKLAMASI
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Jl. Jenderal Ibnu Sutowo No. 1, Batam Centre, Kota Batam • Satu Data Hal. 13–14
            </p>
          </div>

          {/* Title */}
          <div className="text-center py-2">
            <h3 className="text-base font-black uppercase text-slate-900 underline">
              LAPORAN KINERJA EKSEKUTIF PENGELOLAAN KAWASAN PESISIR DAN REKLAMASI
            </h3>
            <p className="text-xs text-slate-600 mt-1">Periode Evaluasi: Tahun Anggaran 2026</p>
          </div>

          {/* Section 1: Ringkasan 3 KPI Utama */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              I. CAPAIAN INDIKATOR KINERJA UTAMA (KPI) DIREKTORAT
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                <span className="font-bold text-slate-700 block text-[10.5px]">
                  KPI 1 (DATASET NO. 4):
                </span>
                <span className="text-sm font-black text-slate-900 block mt-1">
                  {kpi.kpi1_luasIzinInvestasiHa.toLocaleString('id-ID')} Hektar
                </span>
                <p className="text-[10px] text-slate-600 mt-1">
                  Luas Izin Pemanfaatan Kawasan Pesisir &amp; Izin Reklamasi untuk Investasi ({kpi.kpi1_totalIzinTerbit} Proyek, Total Rp {kpi.kpi1_totalNilaiInvestasiT} T)
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                <span className="font-bold text-slate-700 block text-[10.5px]">
                  KPI 2 (DATASET NO. 3):
                </span>
                <span className="text-sm font-black text-emerald-800 block mt-1">
                  {kpi.kpi2_persenTepatWaktu.toFixed(1)}% Tepat Waktu
                </span>
                <p className="text-[10px] text-slate-600 mt-1">
                  Persentase Perizinan Pesisir dan Reklamasi Selesai Sesuai SLA ({kpi.kpi2_totalTepatWaktu} dari {kpi.kpi2_totalPerizinanSelesai} Berkas)
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                <span className="font-bold text-slate-700 block text-[10.5px]">
                  KPI 3 (DATASET NO. 1):
                </span>
                <span className="text-sm font-black text-amber-800 block mt-1">
                  {kpi.kpi3_persenPenyelesaianMasalah.toFixed(1)}% Terselesaikan
                </span>
                <p className="text-[10px] text-slate-600 mt-1">
                  Persentase Penyelesaian Permasalahan Pesisir dan Reklamasi ({kpi.kpi3_kasusSelesai} dari {kpi.kpi3_totalKasus} Kasus Selesai)
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Realisasi Izin Investasi (Dataset No. 4) */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              II. DATA PEMANFAATAN KAWASAN PESISIR DAN IZIN REKLAMASI UNTUK INVESTASI (DATASET NO. 4)
            </h4>
            <p className="text-xs text-slate-600">
              Kolom wajib: Nama Perusahaan, Luas (Ha / m²), Tahun, dan Tahun Penerbitan Izin.
            </p>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="p-2 border border-slate-300">No</th>
                  <th className="p-2 border border-slate-300">Nama Perusahaan</th>
                  <th className="p-2 border border-slate-300">Luas (Ha)</th>
                  <th className="p-2 border border-slate-300">Luas (m²)</th>
                  <th className="p-2 border border-slate-300">Tahun</th>
                  <th className="p-2 border border-slate-300">Tahun Terbit</th>
                  <th className="p-2 border border-slate-300">Sektor Industri</th>
                </tr>
              </thead>
              <tbody>
                {DATASET_4_PEMANFAATAN_INVESTASI.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="p-2 border border-slate-300 text-center">{idx + 1}</td>
                    <td className="p-2 border border-slate-300 font-bold">{item.namaPerusahaan}</td>
                    <td className="p-2 border border-slate-300 font-mono">{item.luasHa.toFixed(1)} Ha</td>
                    <td className="p-2 border border-slate-300 font-mono">{item.luasM2.toLocaleString('id-ID')} m²</td>
                    <td className="p-2 border border-slate-300 text-center font-mono">{item.tahun}</td>
                    <td className="p-2 border border-slate-300 text-center font-mono font-bold">{item.tahunPenerbitan}</td>
                    <td className="p-2 border border-slate-300">{item.sektorIndustri}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: Rencana Pemanfaatan Wilayah (Dataset No. 2) */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              III. DATA RENCANA PEMANFAATAN WILAYAH PESISIR DAN REKLAMASI (DATASET NO. 2)
            </h4>
            <p className="text-xs text-slate-600">
              Kolom wajib: Nama Perusahaan, Luas (Ha), Tahun Penerbitan, dan Luas Konversi (m²).
            </p>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="p-2 border border-slate-300">No</th>
                  <th className="p-2 border border-slate-300">Nama Perusahaan</th>
                  <th className="p-2 border border-slate-300">Luas (Ha)</th>
                  <th className="p-2 border border-slate-300">Tahun Penerbitan</th>
                  <th className="p-2 border border-slate-300">Luas (m²)</th>
                  <th className="p-2 border border-slate-300">Zona Rencana Ruang Laut</th>
                </tr>
              </thead>
              <tbody>
                {DATASET_2_RENCANA_PEMANFAATAN.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="p-2 border border-slate-300 text-center">{idx + 1}</td>
                    <td className="p-2 border border-slate-300 font-bold">{item.namaPerusahaan}</td>
                    <td className="p-2 border border-slate-300 font-mono">{item.luasHa.toFixed(1)} Ha</td>
                    <td className="p-2 border border-slate-300 text-center font-mono font-bold">{item.tahunPenerbitan}</td>
                    <td className="p-2 border border-slate-300 font-mono">{item.luasM2.toLocaleString('id-ID')} m²</td>
                    <td className="p-2 border border-slate-300">{item.zonaRencana}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 4: Distribusi Spasial SWP untuk Atasan */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              IV. REKAPITULASI SEBARAN SPASIAL PER SUB WILAYAH PENGEMBANGAN (SWP)
            </h4>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="p-2 border border-slate-300">Sub Wilayah (SWP)</th>
                  <th className="p-2 border border-slate-300">Jumlah Izin</th>
                  <th className="p-2 border border-slate-300">Luas Total (Ha)</th>
                  <th className="p-2 border border-slate-300">Reklamasi (Ha)</th>
                  <th className="p-2 border border-slate-300">Pesisir/Jetty (Ha)</th>
                  <th className="p-2 border border-slate-300">Kepatuhan Ruang Laut</th>
                </tr>
              </thead>
              <tbody>
                {DISTRIBUSI_SWP_PESISIR_DATA.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border border-slate-300 font-bold">{item.swp}</td>
                    <td className="p-2 border border-slate-300 font-mono">{item.jumlahProyek} Proyek</td>
                    <td className="p-2 border border-slate-300 font-mono font-bold">{item.luasTotalHa.toFixed(1)} Ha</td>
                    <td className="p-2 border border-slate-300 font-mono">{item.reklamasiHa.toFixed(1)} Ha</td>
                    <td className="p-2 border border-slate-300 font-mono">{item.pesisirHa.toFixed(1)} Ha</td>
                    <td className="p-2 border border-slate-300 font-mono text-emerald-800 font-bold">{item.kepatuhanPersen}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tanda Tangan Pejabat */}
          <div className="pt-8 flex justify-end">
            <div className="text-center text-xs">
              <p>Batam, 17 September 2026</p>
              <p className="font-bold mt-1">Direktur Pengelolaan Kawasan Pesisir dan Reklamasi</p>
              <div className="h-16" />
              <p className="font-bold underline uppercase">( Pejabat Pimpinan Tinggi Pratama )</p>
              <p className="text-slate-500">NIP. 19780412 200212 1 002</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
