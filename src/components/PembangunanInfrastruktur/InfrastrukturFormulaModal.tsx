import React from 'react';
import { X, Calculator, Database, HelpCircle, CheckCircle2, Copy, BookOpen } from 'lucide-react';

interface InfrastrukturFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpiType:
    | 'kpi-pembangunan'
    | 'kpi-progres-fisik'
    | 'kpi-progres-keuangan'
    | 'kpi-kurva-s'
    | 'kpi-row-utilitas'
    | 'kpi-row-penghijauan'
    | 'kpi-ruas-jalan'
    | null;
}

export const InfrastrukturFormulaModal: React.FC<InfrastrukturFormulaModalProps> = ({
  isOpen,
  onClose,
  kpiType,
}) => {
  if (!isOpen || !kpiType) return null;

  const getFormulaContent = () => {
    switch (kpiType) {
      case 'kpi-pembangunan':
        return {
          title: 'KPI Jumlah Paket Pembangunan Infrastruktur Strategis',
          dataset: 'Dataset No. 6: Pembangunan Infrastruktur (Hal 49)',
          definisi:
            'Menghitung total keseluruhan paket pekerjaan konstruksi fisik strategis (jalan, jembatan, drainase, dermaga) yang dikontrakkan dan dibiayai melalui anggaran BP Batam pada tahun anggaran berjalan.',
          formula: 'Total Paket = COUNTD([KODE_PAKET]) WHERE [STATUS_KONTRAK] IN ("Aktif", "Konstruksi", "PHO")',
          tableauField: `// Formula Tableau Calculated Field:
IF [TAHUN_ANGGARAN] = [Parameter_Tahun] THEN
    COUNTD([KODE_PAKET])
END`,
          atributUtama: [
            'KODE_PAKET (ID unik SPK)',
            'JNS_PEK (Peningkatan Jalan, Jembatan, Drainase, Gedung)',
            'NILAI_KONTRAK (Pagu Anggaran)',
            'PROGRES_FISIK_% (Realisasi Lapangan)',
            'LOKASI_WILAYAH (Batam Centre, Batu Ampar, Sekupang, Nongsa)',
          ],
          dasarHukum: 'Peraturan Kepala BP Batam tentang Pengadaan Barang dan Jasa Pemerintah & Renstra Infrastruktur BP Batam.',
        };

      case 'kpi-progres-fisik':
        return {
          title: 'KPI Realisasi Fisik Proyek (%) & Deviasi Kurva S',
          dataset: 'Dataset No. 4: Laporan Progres Pekerjaan Konstruksi (Hal 49)',
          definisi:
            'Rata-rata persentase penyelesaian fisik pekerjaan di lapangan berdasarkan laporan konsultan pengawas supervisi, dibandingkan dengan target Kurva S rencana jadwal kontrak.',
          formula: 'Realisasi Fisik (%) = (SUM([BOBOT_ITEM] * [PROGRES_ITEM_%]) ÷ 100) | Deviasi = Realisasi Fisik (%) - Rencana Fisik (%)',
          tableauField: `// Formula Tableau Calculated Field:
// [Realisasi Fisik Aktual %]
AVG([REALISASI_FISIK_%])

// [Deviasi Kurva S %]
AVG([REALISASI_FISIK_%]) - AVG([RENCANA_FISIK_%])`,
          atributUtama: [
            'NAMA_PAKET (Nama Pekerjaan Konstruksi)',
            'NOMOR_KONTRAK (Surat Perjanjian Kerja)',
            'RENCANA_FISIK_% (Target Kurva S Rencana)',
            'REALISASI_FISIK_% (Progres Aktual Lapangan)',
            'DEVIASI_% (Varian Jadwal: Positif Ahead, Negatif Kritis/SCM)',
            'STATUS_KURVA_S (Ahead, On Schedule, Waspada, Kritis SCM)',
          ],
          dasarHukum: 'Syarat-Syarat Umum Kontrak (SSUK) Standar Pekerjaan Konstruksi Kementerian PUPR & Standard Operating Procedure BP Batam.',
        };

      case 'kpi-progres-keuangan':
        return {
          title: 'KPI Realisasi Keuangan Proyek (%) & Serapan Anggaran',
          dataset: 'Dataset No. 4: Laporan Progres Pekerjaan Konstruksi (Hal 49)',
          definisi:
            'Persentase pencairan pembayaran termin kontrak pekerjaan konstruksi berdasarkan Berita Acara Pembayaran (BAP) dan Surat Perintah Membayar (SPM) terhadap total nilai kontrak.',
          formula: 'Realisasi Keuangan (%) = (Total Pembayaran Termin Fisik ÷ Total Nilai Kontrak) × 100%',
          tableauField: `// Formula Tableau Calculated Field:
// [Realisasi Keuangan %]
SUM([PEMBAYARAN_TERMIN_RP]) / SUM([NILAI_KONTRAK_RP]) * 100`,
          atributUtama: [
            'NILAI_KONTRAK (Nilai Perjanjian Kerja Sama)',
            'NILAI_TERMIN_CAIR (Akumulasi SP2D Pembayaran)',
            'REALISASI_KEUANGAN_% (Persentase Serapan)',
            'GAP_FISIK_KEUANGAN (Selisih Progres Fisik - Progres Keuangan)',
          ],
          dasarHukum: 'Peraturan Menteri Keuangan tentang Tata Cara Pembayaran atas Beban APBN/PNBP Satker Badan Layanan Umum.',
        };

      case 'kpi-kurva-s':
        return {
          title: 'Monitoring Dual-Axis Kurva S: Fisik vs Keuangan',
          dataset: 'Dataset No. 4: Laporan Progres Konstruksi',
          definisi:
            'Analisis keselarasan antara kemajuan fisik riil di lapangan (garis Kurva S) dengan penyerapan anggaran termin pembayaran (batang keuangan) untuk mencegah overpayment maupun kontraktor cash-flow bottleneck.',
          formula: 'Gap Fisik Keuangan = [REALISASI_FISIK_%] - [REALISASI_KEUANGAN_%]',
          tableauField: `// Tableau Dual Axis Configuration:
// Columns: [Nama Paket]
// Rows: [Measure Values] (AVG([Realisasi Fisik %]), SUM([Realisasi Keuangan %]))
// Marks: Dual Axis (Line for Fisik, Bar for Keuangan)`,
          atributUtama: [
            'NOMOR_KONTRAK',
            'NAMA_PAKET',
            'NILAI_KONTRAK',
            'KONTRAKTOR_PELAKSANA',
            'STATUS_KURVA_S',
          ],
          dasarHukum: 'Pedoman Pengendalian Kontrak Kritis (Show Cause Meeting / SCM) Konstruksi BP Batam.',
        };

      case 'kpi-row-utilitas':
        return {
          title: 'KPI Jumlah Perizinan Pemanfaatan ROW Utilitas',
          dataset: 'Dataset No. 1: Perizinan Pemanfaatan ROW Utilitas',
          definisi:
            'Mengukur jumlah izin penempatan infrastruktur utilitas di koridor Right of Way (ROW) jalan BP Batam, meliputi jaringan telekomunikasi fiber optik, pipa SPAM, pipa gas bumi PGN, dan kabel daya listrik bawah tanah.',
          formula: 'Total Izin ROW Utilitas = COUNTD([NOMOR_IZIN_ROW_UTILITAS])',
          tableauField: `// Formula Tableau Calculated Field:
COUNTD(
    IF [STATUS_IZIN] = "Berlaku" OR [STATUS_IZIN] = "Dalam Konstruksi" 
    THEN [NOMOR_IZIN_ROW_UTILITAS] 
    END
)`,
          atributUtama: [
            'NOMOR_IZIN (Nomor SK Perizinan)',
            'NAMA_PEMOHON (Instansi/Operator Utilitas)',
            'JENIS_UTILITAS (Fiber Optik, Air Bersih/SPAM, Gas, Listrik)',
            'LOKASI_RUAS (Nama Jalan & Titik Sta)',
            'PANJANG_GELARAN_METER (Panjang lintasan galian)',
          ],
          dasarHukum: 'Perka BP Batam tentang Tata Cara Pemanfaatan dan Penggunaan Lahan Ruang Milik Jalan (ROW) untuk Jaringan Utilitas Terpadu.',
        };

      case 'kpi-row-penghijauan':
        return {
          title: 'KPI Jumlah Perizinan Pemanfaatan ROW Penghijauan',
          dataset: 'Dataset No. 2: Perizinan Pemanfaatan ROW Penghijauan',
          definisi:
            'Menghitung perizinan ruang terbuka hijau pada median dan sempadan koridor jalan, termasuk adopsi taman CSR korporasi kawasan industri, penanaman pohon peneduh, dan buffer zone konservasi.',
          formula: 'Total Izin ROW Penghijauan = COUNTD([NOMOR_IZIN_ROW_PENGHIJAUAN])',
          tableauField: `// Formula Tableau Calculated Field:
COUNTD([NOMOR_IZIN_ROW_PENGHIJAUAN])`,
          atributUtama: [
            'NOMOR_IZIN (Nomor SK Pemanfaatan Jalur Hijau)',
            'NAMA_PEMOHON (Perusahaan Pengelola/Mitra CSR)',
            'KATEGORI_PENGHIJAUAN (Median Jalan, Taman CSR, Pohon Pelindung)',
            'LUAS_AREA_M2 (Luasan ruang terbuka hijau)',
            'JUMLAH_POHON (Jumlah pohon peneduh yang ditanam)',
          ],
          dasarHukum: 'Pedoman Penataan Lansekap Ruang Terbuka Hijau (RTH) Jalan Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam.',
        };

      case 'kpi-ruas-jalan':
        return {
          title: 'KPI Ruas Jaringan Jalan BP Batam',
          dataset: 'Dataset No. 3: Ruas Jaringan Jalan',
          definisi:
            'Menghitung total ruas jalan kewenangan BP Batam, total panjang jaringan jalan (km), serta persentase tingkat kemantapan jalan berdasarkan International Roughness Index (IRI).',
          formula: `Persentase Kemantapan (%) = (Panjang Jalan Kondisi Baik + Sedang) / Total Panjang Jalan * 100%`,
          tableauField: `// Formula Tableau Calculated Field Tingkat Kemantapan:
SUM([PANJANG_KONDISI_BAIK_KM] + [PANJANG_KONDISI_SEDANG_KM]) / SUM([TOTAL_PANJANG_KM]) * 100`,
          atributUtama: [
            'KODE_RUAS (Identitas Ruas Jalan)',
            'NAMA_RUAS_JALAN (Koridor Jalan)',
            'FUNGSI_JALAN (Arteri Primer, Kolektor, Sekunder)',
            'PANJANG_KM & LEBAR_METER (Dimensi Ruas)',
            'KONDISI_MANTAP_KM vs KONDISI_TIDAK_MANTAP_KM',
            'INDEKS_IRI (Tingkat kerataan permukaan jalan m/km)',
          ],
          dasarHukum: 'SK Kepala BP Batam tentang Penetapan Status dan Klasifikasi Ruas Jaringan Jalan di Wilayah Kerja BP Batam & Standar Pelayanan Minimal (SPM) Jalan.',
        };

      default:
        return null;
    }
  };

  const content = getFormulaContent();
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                {content.dataset}
              </span>
              <h3 className="font-bold text-slate-800 text-base mt-0.5">
                {content.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-slate-600">
          {/* Definisi */}
          <div>
            <h4 className="font-semibold text-slate-800 text-xs mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-600" /> Definisi Operasional &amp; Ruang Lingkup
            </h4>
            <p className="leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-700">
              {content.definisi}
            </p>
          </div>

          {/* Rumus Matematis */}
          <div>
            <h4 className="font-semibold text-slate-800 text-xs mb-1 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-sky-600" /> Formula Agregasi
            </h4>
            <div className="bg-slate-900 text-sky-300 p-3 rounded-lg font-mono text-[11px] border border-slate-800">
              {content.formula}
            </div>
          </div>

          {/* Tableau Calculated Field */}
          <div>
            <h4 className="font-semibold text-slate-800 text-xs mb-1 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-indigo-600" /> Implementasi Tableau Desktop Calculated Field
            </h4>
            <pre className="bg-slate-900 text-emerald-300 p-3 rounded-lg font-mono text-[11px] border border-slate-800 overflow-x-auto whitespace-pre-wrap">
              {content.tableauField}
            </pre>
          </div>

          {/* Atribut Satu Data */}
          <div>
            <h4 className="font-semibold text-slate-800 text-xs mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Atribut Sumber Data (Satu Data BP Batam)
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {content.atributUtama.map((attr, idx) => (
                <li
                  key={idx}
                  className="bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200 text-slate-700 text-[11px] flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                  <span>{attr}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dasar Regulasi */}
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <strong>Dasar Regulasi:</strong> {content.dasarHukum}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Tutup Penjelasan
          </button>
        </div>
      </div>
    </div>
  );
};
