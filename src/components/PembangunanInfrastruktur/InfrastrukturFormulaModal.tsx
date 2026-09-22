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
    | 'kpi-pematangan'
    | null;
}

export const InfrastrukturFormulaModal: React.FC<InfrastrukturFormulaModalProps> = ({
  isOpen,
  onClose,
  kpiType,
}) => {
  const [activeKpi, setActiveKpi] = React.useState<typeof kpiType>(kpiType);

  React.useEffect(() => {
    setActiveKpi(kpiType);
  }, [kpiType]);

  if (!isOpen || !activeKpi) return null;

  const getFormulaContent = () => {
    switch (activeKpi) {
      case 'kpi-pematangan':
        return {
          title: 'KPI Pematangan Lahan Kawasan Strategis BSW (280 Ha)',
          dataset: 'Dataset No. 5: Pematangan Tanah Wilayah BSW (Hal. 50-51)',
          definisi:
            'Menghitung volume pekerjaan cut and fill serta pematangan tanah (land clearing & grading) pada 5 Wilayah Pengembangan Strategis Batam (BSW) untuk kesiapan investasi industri, logistik, dan fasilitas publik.',
          formula: 'Total Luas Pematangan = SUM([VOL_PEK]) dengan satuan Hektar (Ha) | Rata-rata Progres = AVG([PRGRS_PEK])',
          tableauField: `// Formula Tableau Calculated Field:
// [Total Luas Pematangan Lahan BSW]
SUM([VOL_PEK])

// [Rata-rata Progres Pematangan Fisik %]
AVG([PRGRS_PEK])`,
          atributUtama: [
            'NAMOBJ (Nama Objek Kawasan / Lokasi BSW: Batam Centre, Nongsa, Batu Ampar, Sekupang, Tembesi)',
            'VOL_PEK (Volume Pekerjaan Pematangan Lahan dalam Satuan Hektar/Ha)',
            'PRGRS_PEK (Persentase Realisasi Progres Fisik Pematangan Lapangan)',
            'KONTRAKTOR (Pelaksana Pekerjaan Pengurukan & Pematangan)',
            'STATUS_LAHAN (Siap Alokasi Investasi / Tahap Pematangan)',
          ],
          dasarHukum: 'Masterplan Tata Ruang Wilayah Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam & Dokumen Pengadaan Lahan BP Batam.',
        };
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
          title: 'Total Jaringan Jalan & Formula Kemantapan Jalan (88,2%)',
          dataset: 'Dataset No. 3: Jaringan Jalan (Eksisting) (Hal. 48-49)',
          definisi:
            'Mengukur persentase panjang jalan dalam kondisi mantap (kondisi baik dan sedang) terhadap total keseluruhan panjang jaringan jalan yang menjadi kewenangan BP Batam.',
          formula:
            'Persentase Kemantapan Jalan (88,2%) = (Panjang Jalan Kondisi Mantap [LKONOF = "Baik/Sedang"] ÷ Total Panjang Seluruh Ruas Jalan [SHAPE_LENG]) × 100% = (478,80 Km ÷ 542,80 Km) × 100% = 88,2%',
          tableauField: `// Formula Tableau Calculated Field [% Kemantapan Jalan]:
// Pembilang: Total panjang jalan berkondisi baik/sedang
// Penyebut: Total seluruh panjang jalan (SHAPE_LENG)
SUM(
    IF [LKONOF] = 'Baik' OR [LKONOF] = 'Sedang' 
    THEN [SHAPE_LENG] 
    ELSE 0 
    END
) 
/ 
SUM([SHAPE_LENG]) * 100`,
          atributUtama: [
            'SHAPE_LENG (Panjang Ruas Jalan dalam Km/Meter) -> Digunakan sebagai bobot pembilang & penyebut',
            'LKONOF / KONRJL (Kondisi Fisik Jalan: Baik, Sedang, Rusak Ringan, Rusak Berat) -> Filter kondisi mantap',
            'NAMOBJ (Nama Objek / Nama Ruas Jalan)',
            'WLYRJL (Wilayah Administrasi Ruas Jalan: Batam Centre, Batu Ampar, Sekupang, Mukakuning, Nongsa, Barelang)',
            'KLSRJL (Kelas Jalan: Arteri Primer, Kolektor Primer, Sekunder)',
            'LBRJLN (Lebar Jalan dalam Meter)',
          ],
          dasarHukum:
            'SK Kepala BP Batam tentang Penetapan Status Ruas Jaringan Jalan Kota Batam & Standar Pelayanan Minimal (SPM) Kemantapan Jalan Kementerian PUPR (Target IKU ≥ 85%).',
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
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-mono">
                  {content.dataset}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Buku Satu Data Hal. 48-51</span>
              </div>
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

        {/* Quick Tab Switcher 6 Dataset */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 overflow-x-auto text-[11px]">
          <span className="text-slate-500 font-semibold shrink-0 mr-1 text-[10.5px]">Pilih Dataset:</span>
          {[
            { key: 'kpi-ruas-jalan', label: 'DS 3: Total Jaringan Jalan (542,8 Km)' },
            { key: 'kpi-progres-fisik', label: 'DS 4: Progres Fisik' },
            { key: 'kpi-row-utilitas', label: 'DS 1: ROW Utilitas' },
            { key: 'kpi-row-penghijauan', label: 'DS 2: Penghijauan' },
            { key: 'kpi-pematangan', label: 'DS 5: Pematangan Lahan' },
            { key: 'kpi-pembangunan', label: 'DS 6: Pembangunan Total' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveKpi(tab.key as any)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeKpi === tab.key
                  ? 'bg-sky-600 text-white shadow-2xs font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
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
