import React from 'react';
import { ArrowLeft, Printer, Download, HardHat, FileText } from 'lucide-react';
import {
  REKAP_JENIS_PEMBANGUNAN,
  SUMMARY_ROW_UTILITAS,
  SUMMARY_ROW_PENGHIJAUAN,
  SUMMARY_RUAS_JARINGAN_JALAN,
  DATASET_4_PROGRES_KONSTRUKSI,
} from './infrastrukturData';

interface InfrastrukturWordDocViewProps {
  onBack: () => void;
}

export const InfrastrukturWordDocView: React.FC<InfrastrukturWordDocViewProps> = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExportDoc = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Laporan Eksekutif Pembangunan Infrastruktur BP Batam</title><style>body{font-family:Arial,sans-serif;line-height:1.4;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #333;padding:6px;font-size:11px;}</style></head><body>`;
    const footer = `</body></html>`;
    const element = document.getElementById('word-document-content');
    if (!element) return;
    const html = header + element.innerHTML + footer;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_Eksekutif_Pembangunan_Infrastruktur_BP_Batam_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-12">
      {/* Top Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh File .DOC (Word)</span>
          </button>
        </div>
      </div>

      {/* Printable Paper Canvas */}
      <div
        id="word-document-content"
        className="bg-white border border-slate-300 rounded-xl p-8 sm:p-12 shadow-md text-slate-800 space-y-6 print:border-none print:shadow-none print:p-0"
      >
        {/* Kop Surat Resmi BP Batam */}
        <div className="border-b-2 border-slate-800 pb-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              BP
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wider text-slate-900 uppercase">
                BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
              </h2>
              <h3 className="text-sm font-bold text-sky-800 uppercase tracking-wide">
                DIREKTORAT PEMBANGUNAN INFRASTRUKTUR
              </h3>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Gedung BIFZA Lt. 5, Jl. Ibnu Sutowo No. 1, Batam Centre, Kota Batam 29400 | Telp: (0778) 462047 | Email: info@bpbatam.go.id
          </p>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-base sm:text-lg font-extrabold uppercase underline tracking-wide text-slate-900">
            LAPORAN EKSEKUTIF PENGENDALIAN PEMBANGUNAN INFRASTRUKTUR TAHUN BERJALAN
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            Nomor: 048/LAKIP-DPI/BPB/{new Date().getFullYear()} • Berdasarkan Satu Data BP Batam
          </p>
        </div>

        {/* 1. Ringkasan Eksekutif KPI Utama */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-2 border-l-4 border-sky-600 pl-2">
            I. RINGKASAN CAPAIAN INDIKATOR KINERJA UTAMA (IKU)
          </h4>
          <table className="w-full text-left text-xs border border-slate-300">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-300">
              <tr>
                <th className="p-2 border border-slate-300">No</th>
                <th className="p-2 border border-slate-300">Indikator Kinerja Utama (IKU)</th>
                <th className="p-2 border border-slate-300 text-center">Dataset Acuan</th>
                <th className="p-2 border border-slate-300 text-center">Realisasi Capaian</th>
                <th className="p-2 border border-slate-300">Keterangan / Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-300 text-center">1</td>
                <td className="p-2 border border-slate-300 font-medium">Jumlah Pembangunan Infrastruktur BP Batam</td>
                <td className="p-2 border border-slate-300 text-center">Dataset No. 6</td>
                <td className="p-2 border border-slate-300 text-center font-bold text-sky-700">58 Paket</td>
                <td className="p-2 border border-slate-300">Total Pagu Rp 2,84 Triliun (88,4% On Schedule)</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-300 text-center">2</td>
                <td className="p-2 border border-slate-300 font-medium">Jumlah Izin Pemanfaatan ROW Utilitas</td>
                <td className="p-2 border border-slate-300 text-center">Dataset No. 1</td>
                <td className="p-2 border border-slate-300 text-center font-bold text-indigo-700">142 Izin</td>
                <td className="p-2 border border-slate-300">64 FO, 38 SPAM, 22 Pipa Gas, 18 Listrik Bawah Tanah</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-300 text-center">3</td>
                <td className="p-2 border border-slate-300 font-medium">Jumlah Izin Pemanfaatan ROW Penghijauan</td>
                <td className="p-2 border border-slate-300 text-center">Dataset No. 2</td>
                <td className="p-2 border border-slate-300 text-center font-bold text-emerald-700">86 Izin</td>
                <td className="p-2 border border-slate-300">34,2 Hektar RTH koridor jalan & 14.850 pohon peneduh</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-300 text-center">4</td>
                <td className="p-2 border border-slate-300 font-medium">Ruas Jaringan Jalan Kewenangan BP Batam</td>
                <td className="p-2 border border-slate-300 text-center">Dataset No. 3</td>
                <td className="p-2 border border-slate-300 text-center font-bold text-amber-700">184 Ruas</td>
                <td className="p-2 border border-slate-300">Total 542,8 Km (89,4% Tingkat Kemantapan Jalan)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2. Rekap Jenis Pembangunan (Dataset No. 6) */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-2 border-l-4 border-sky-600 pl-2">
            II. DISTRIBUSI PEMBANGUNAN BERDASARKAN JENIS PEKERJAAN (JNS_PEK - DATASET NO. 6)
          </h4>
          <table className="w-full text-left text-xs border border-slate-300">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-300">
              <tr>
                <th className="p-2 border border-slate-300">No</th>
                <th className="p-2 border border-slate-300">Jenis Pekerjaan (JNS_PEK)</th>
                <th className="p-2 border border-slate-300 text-center">Jumlah Paket</th>
                <th className="p-2 border border-slate-300 text-right">Pagu Anggaran</th>
                <th className="p-2 border border-slate-300 text-center">Porsi (%)</th>
                <th className="p-2 border border-slate-300">Volume Fisik Terpasang</th>
              </tr>
            </thead>
            <tbody>
              {REKAP_JENIS_PEMBANGUNAN.map((item, idx) => (
                <tr key={item.jenisPekerjaan}>
                  <td className="p-2 border border-slate-300 text-center">{idx + 1}</td>
                  <td className="p-2 border border-slate-300 font-medium">{item.jenisPekerjaan}</td>
                  <td className="p-2 border border-slate-300 text-center font-bold">{item.jumlahProyek}</td>
                  <td className="p-2 border border-slate-300 text-right">
                    Rp {(item.totalPagu / 1000000000).toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                  </td>
                  <td className="p-2 border border-slate-300 text-center">{item.persentaseAnggaran}%</td>
                  <td className="p-2 border border-slate-300">{item.panjangVolume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. Laporan Progres Konstruksi & Pengawasan Kurva S (Dataset No. 4) */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-2 border-l-4 border-sky-600 pl-2">
            III. LAPORAN PROGRES PEKERJAAN KONSTRUKSI & PENGAWASAN KURVA S (DATASET NO. 4)
          </h4>
          <table className="w-full text-left text-xs border border-slate-300">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-300">
              <tr>
                <th className="p-1.5 border border-slate-300">Paket Pekerjaan</th>
                <th className="p-1.5 border border-slate-300">Penyedia Jasa (Kontraktor)</th>
                <th className="p-1.5 border border-slate-300 text-right">Nilai (M)</th>
                <th className="p-1.5 border border-slate-300 text-center">Rencana</th>
                <th className="p-1.5 border border-slate-300 text-center">Realisasi</th>
                <th className="p-1.5 border border-slate-300 text-center">Deviasi</th>
                <th className="p-1.5 border border-slate-300 text-center">Keuangan</th>
                <th className="p-1.5 border border-slate-300">Status & Tindak Lanjut</th>
              </tr>
            </thead>
            <tbody>
              {DATASET_4_PROGRES_KONSTRUKSI.slice(0, 5).map((p) => (
                <tr key={p.id}>
                  <td className="p-1.5 border border-slate-300 font-medium">{p.namaPaket}</td>
                  <td className="p-1.5 border border-slate-300">{p.kontraktor}</td>
                  <td className="p-1.5 border border-slate-300 text-right">Rp {p.nilaiKontrakMiliar.toFixed(1)} M</td>
                  <td className="p-1.5 border border-slate-300 text-center">{p.rencanaFisikPersen}%</td>
                  <td className="p-1.5 border border-slate-300 text-center font-bold">{p.realisasiFisikPersen}%</td>
                  <td className="p-1.5 border border-slate-300 text-center font-bold">
                    {p.deviasiFisikPersen > 0 ? `+${p.deviasiFisikPersen}` : p.deviasiFisikPersen}%
                  </td>
                  <td className="p-1.5 border border-slate-300 text-center">{p.realisasiKeuanganPersen}%</td>
                  <td className="p-1.5 border border-slate-300 text-[10px]">
                    <strong>{p.statusKurvaS}</strong>: {p.tindakLanjut}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Rekomendasi Pimpinan */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-2">
          <h4 className="font-bold text-slate-900 uppercase">IV. KESIMPULAN & INSTRUKSI TINDAK LANJUT DIREKTUR</h4>
          <ol className="list-decimal list-inside space-y-1 text-slate-700 leading-relaxed">
            <li>
              <strong>Percepatan Paket Kritis:</strong> Paket Dermaga Batu Ampar (SCM-1) dan Akses Kabil - Punggur (SCM-2) wajib menambah kapasitas alat dan shift kerja untuk mengejar deviasi fisik sebelum masa kontrak berakhir.
            </li>
            <li>
              <strong>Sinkronisasi ROW Utilitas:</strong> Memperketat koordinasi bersama operator fiber optik dan SPAM agar rekondisi jalan bekas galian memenuhi standar kepadatan aspal lapis AC-BC.
            </li>
            <li>
              <strong>Preservasi Jalan TA 2026:</strong> Memprioritaskan ruas jalan rusak ringan (41,2 km) untuk program preservasi berkala guna mempertahankan tingkat kemantapan di atas 90%.
            </li>
          </ol>
        </div>

        {/* Signatures */}
        <div className="pt-8 grid grid-cols-2 text-center text-xs">
          <div>
            <p className="text-slate-500">Mengetahui,</p>
            <p className="font-bold text-slate-800 mt-1">Anggota Bidang Pengelolaan Kawasan &amp; Investasi</p>
            <div className="h-16" />
            <p className="font-bold underline text-slate-900">Dr. Ir. H. Sudirman Umar, M.T.</p>
            <p className="text-slate-500">NIP. 19680412 199303 1 002</p>
          </div>
          <div>
            <p className="text-slate-500">Batam, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="font-bold text-slate-800 mt-1">Direktur Pembangunan Infrastruktur</p>
            <div className="h-16" />
            <p className="font-bold underline text-slate-900">Ir. Budi Hendarto, M.Sc.</p>
            <p className="text-slate-500">NIP. 19720815 199803 1 004</p>
          </div>
        </div>
      </div>
    </div>
  );
};
