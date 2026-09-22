import React from 'react';
import {
  X,
  FileText,
  Calculator,
  Compass,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Code2,
} from 'lucide-react';

interface PesisirFormulaModalProps {
  activeKpiId: string | null;
  onClose: () => void;
}

export const PesisirFormulaModal: React.FC<PesisirFormulaModalProps> = ({
  activeKpiId,
  onClose,
}) => {
  if (!activeKpiId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Panduan Formula &amp; Rekayasa Tableau (Satu Data Pesisir &amp; Reklamasi)
              </h3>
              <p className="text-xs text-slate-500">
                Spesifikasi Atribut Satu Data Hal. 13–14 &amp; Logika Perhitungan Metrik
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4 text-xs">
          {activeKpiId === 'kpi_luas_izin' && (
            <div className="space-y-3">
              <div className="p-3 bg-sky-50/60 border border-sky-200 rounded-lg">
                <span className="font-bold text-sky-900 block text-xs mb-1">
                  1. KPI Luas Izin Pemanfaatan Kawasan Pesisir &amp; Izin Reklamasi untuk Investasi
                </span>
                <p className="text-slate-700 text-[11.5px] leading-relaxed">
                  Metrik ini mengukur total akumulasi luasan ruang perairan laut dan daratan pulau buatan (reklamasi) yang telah resmi mengantongi izin operasional investasi dari BP Batam. Sumber: <strong>Dataset No. 4 (Pemanfaatan Kawasan Pesisir dan Izin Reklamasi untuk Investasi)</strong>.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1 text-xs">Formula Matematis:</span>
                <div className="p-2.5 bg-slate-900 text-sky-300 font-mono rounded-lg text-[11px]">
                  Luas_Total_Ha = SUM([Luas (Ha)])<br />
                  Luas_Total_m2 = SUM([Luas (Ha)]) * 10,000
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1 text-xs">Syntax Tableau Calculated Field:</span>
                <div className="p-2.5 bg-slate-100 border border-slate-200 font-mono text-slate-800 rounded-lg text-[11px]">
                  // [Total Luas Investasi Pesisir Ha]<br />
                  ZN(SUM([Luas_Ha]))
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600">
                📌 <strong>Atribut Resmi Dataset #4 (Hal. 14):</strong> Nama Perusahaan, Nomor Izin PKKPRL, Koordinat, Wilayah, Luas (Ha / m²), dan Tahun Penerbitan. (Tidak ada atribut nilai investasi, murni berfokus pada luas alokasi ruang laut).
              </div>
            </div>
          )}

          {activeKpiId === 'kpi_spasial_rencana' && (
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-lg">
                <span className="font-bold text-indigo-900 block text-xs mb-1">
                  4. Dataset #2: Rencana Pemanfaatan Wilayah Pesisir dan Reklamasi (Data Spasial)
                </span>
                <p className="text-slate-700 text-[11.5px] leading-relaxed">
                  Memetakan titik-titik alokasi ruang laut masa depan untuk permohonan reklamasi, dermaga/jetty, pelabuhan, dan industri maritim lepas pantai. Sumber: <strong>Dataset No. 2 (Data Spasial Hal. 14)</strong>.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1 text-xs">Atribut Resmi Sesuai PDF Satu Data:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                  <li>Nama Perusahaan</li>
                  <li>Nomor Izin PKKPRL</li>
                  <li>Koordinat (Lintang &amp; Bujur)</li>
                  <li>Wilayah (Sub Wilayah Pengembangan)</li>
                  <li>Status Kegiatan (Rencana Reklamasi, Dermaga/Jetty, Wisata Bahari, dll.)</li>
                  <li>Luas (Ha / m²)</li>
                  <li>Tahun Penerbitan</li>
                </ul>
              </div>
            </div>
          )}

          {activeKpiId === 'kpi_tepat_waktu' && (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg">
                <span className="font-bold text-emerald-900 block text-xs mb-1">
                  2. Persentase Perizinan Pesisir dan Reklamasi yang Selesai Tepat Waktu
                </span>
                <p className="text-slate-700 text-[11.5px] leading-relaxed">
                  Mengukur efektivitas dan kepatuhan terhadap Service Level Agreement (SLA SOP 14 Hari Kerja) dalam proses verifikasi dan penerbitan izin pemanfaatan ruang laut dan reklamasi. Sumber: <strong>Dataset No. 3 (Perizinan Pesisir dan Reklamasi)</strong>.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1 text-xs">Formula Matematis:</span>
                <div className="p-2.5 bg-slate-900 text-emerald-300 font-mono rounded-lg text-[11px]">
                  Persentase_Tepat_Waktu = (Jumlah_Izin_Selesai_&le;_14_Hari / Total_Izin_Diproses) * 100%
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1 text-xs">Syntax Tableau Calculated Field:</span>
                <div className="p-2.5 bg-slate-100 border border-slate-200 font-mono text-slate-800 rounded-lg text-[11px]">
                  // [% SLA Tepat Waktu]<br />
                  COUNT(IF [Status_Waktu] = 'Tepat Waktu' THEN [ID_Izin] END) / COUNT([ID_Izin])
                </div>
              </div>
            </div>
          )}

          {activeKpiId === 'kpi_masalah' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg">
                <span className="font-bold text-amber-900 block text-xs mb-1">
                  3. Persentase Penyelesaian Permasalahan Pesisir dan Reklamasi
                </span>
                <p className="text-slate-700 text-[11.5px] leading-relaxed">
                  Rasio keberhasilan penanganan konflik ruang laut, deviasi amdal/sedimentasi, dan pelanggaran garis sempadan pantai yang dilaporkan masyarakat maupun tim patroli pengawasan. Sumber: <strong>Dataset No. 1 (Permasalahan Pesisir dan Reklamasi)</strong>.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1 text-xs">Formula Matematis:</span>
                <div className="p-2.5 bg-slate-900 text-amber-300 font-mono rounded-lg text-[11px]">
                  Persentase_Masalah_Selesai = (Jumlah_Kasus_Status_Selesai / Total_Laporan_Kasus) * 100%
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1 text-xs">Syntax Tableau Calculated Field:</span>
                <div className="p-2.5 bg-slate-100 border border-slate-200 font-mono text-slate-800 rounded-lg text-[11px]">
                  // [% Penyelesaian Masalah Pesisir]<br />
                  COUNT(IF [Status_Kasus] = 'Selesai' THEN [ID_Kasus] END) / COUNT([ID_Kasus])
                </div>
              </div>
            </div>
          )}

          {activeKpiId === 'dataset_rencana' && (
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-lg">
                <span className="font-bold text-indigo-900 block text-xs mb-1">
                  4. Panduan Sheet Swap: Dataset #2 Rencana vs Dataset #4 Realisasi Izin
                </span>
                <p className="text-slate-700 text-[11.5px] leading-relaxed">
                  Fitur Sheet Swap memungkinkan manajemen eksekutif BP Batam mengecek alokasi rencana tata ruang laut (Dataset #2) dan membandingkannya langsung dengan izin pemanfaatan investasi riil (Dataset #4) pada satu kontainer dashboard tanpa duplikasi layout.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1 text-xs">Langkah Pembuatan Sheet Swap di Tableau Desktop:</span>
                <ol className="list-decimal pl-4 space-y-1.5 text-slate-700 text-[11px]">
                  <li>Buat Parameter baru bernama <code>[Pilih Tampilan Sheet]</code> tipe String (List: &apos;Sheet Rencana&apos;, &apos;Sheet Investasi&apos;).</li>
                  <li>Buat Calculated Field Filter: <code>[Filter Sheet] = [Pilih Tampilan Sheet]</code>.</li>
                  <li>Di Worksheet Rencana, filter <code>[Filter Sheet] = &apos;Sheet Rencana&apos;</code>.</li>
                  <li>Di Worksheet Investasi, filter <code>[Filter Sheet] = &apos;Sheet Investasi&apos;</code>.</li>
                  <li>Tarik kedua sheet ke dalam 1 Horizontal/Vertical Container di Dashboard, sembunyikan title masing-masing sheet.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10.5px] text-slate-500">
            Sumber Data: Buku Atribut Daftar Data Satu Data BP Batam (Hal. 13–14)
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
