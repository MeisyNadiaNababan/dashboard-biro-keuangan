import React from 'react';
import { X, Calculator, Database, HelpCircle, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PengendalianFormulaModalProps {
  kpiId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

interface KpiDetail {
  id: string;
  datasetNo: number;
  title: string;
  category: string;
  rumusTeks: string;
  calculatedFieldTableau: string;
  rowsColumnsGuide: {
    columns: string;
    rows: string;
    marks: string;
    filters: string;
  };
  atributSatuData: string[];
  definisiOperasional: string;
}

const FORMULA_REGISTRY: Record<string, KpiDetail> = {
  kpi_pengawasan: {
    id: 'kpi_pengawasan',
    datasetNo: 1,
    title: 'Persentase Keberhasilan Pengawasan dan Pengendalian Lahan, Pesisir dan Reklamasi',
    category: 'Pengawasan Lapangan & Kepatuhan Tata Ruang',
    rumusTeks:
      'Persentase Keberhasilan Pengawasan = (Jumlah Objek/Lokasi yang Berhasil Diawasi & Dikendalikan / Total Target Pengawasan) × 100%',
    calculatedFieldTableau:
      '// [Kalkulasi Keberhasilan Pengawasan Lahan & Pesisir]\n' +
      'SUM([Jumlah Objek Terealisasi Diawasi]) / SUM([Target Objek Pengawasan]) * 100',
    rowsColumnsGuide: {
      columns: '[Sub Wilayah Pengembangan (SWP)], [Kategori Objek Pengawasan]',
      rows: '[% Keberhasilan Pengawasan]',
      marks: 'Bar / Stacked Bar (Color: [Status Kepatuhan: Patuh, Teguran, Pelanggaran])',
      filters: '[Tahun Anggaran], [SWP], [Kategori Objek: Lahan/Pesisir/Reklamasi]',
    },
    atributSatuData: [
      'No. Pengawasan',
      'Lokasi / SWP',
      'Kategori (Lahan Darat, Wilayah Pesisir, Area Reklamasi)',
      'Luas Area Terperiksa (Ha / m²)',
      'Tanggal Pengawasan',
      'Hasil Pemeriksaan (Patuh, Teguran Lisan, Indikasi Pelanggaran)',
      'Status Tindakan Pengendalian',
    ],
    definisiOperasional:
      'Mengukur efektivitas patroli dan pengawasan lapangan atas kepatuhan pemanfaatan lahan darat alokasi komersial/industri, sempadan pesisir, serta legalitas izin penimbunan reklamasi di kawasan Batam sesuai batas peruntukan yang ditetapkan BP Batam.',
  },
  kpi_evaluasi_pembatalan: {
    id: 'kpi_evaluasi_pembatalan',
    datasetNo: 2,
    title: 'Persentase Keberhasilan Tindakan Evaluasi dan Pembatalan Alokasi Lahan, Pesisir dan Reklamasi',
    category: 'Penertiban Lahan Terlantar & Rekuperasi Aset',
    rumusTeks:
      'Persentase Keberhasilan Tindakan = (Jumlah Tindakan Evaluasi & Pembatalan Selesai Terlaksana / Total Usulan Kasus Lahan Bermasalah) × 100%',
    calculatedFieldTableau:
      '// [Kalkulasi Keberhasilan Tindakan Penertiban Lahan]\n' +
      'COUNTD(IF [Status Tindakan] = "Selesai Tindakan" THEN [ID Kasus] END) / COUNTD([ID Kasus Usulan]) * 100',
    rowsColumnsGuide: {
      columns: '[Tahap Peringatan (SP-1, SP-2, SP-3, Batal SK, Re-Komitmen)]',
      rows: 'COUNTD([ID Kasus]), SUM([Luas Hektar])',
      marks: 'Step Funnel / Bar Chart (Color: [Status Eskalasi])',
      filters: '[Tahun Terbit], [SWP], [Tahap Peringatan]',
    },
    atributSatuData: [
      'No. Kasus Evaluasi',
      'Nama Pemegang Alokasi',
      'Peruntukan Lahan Awal',
      'Luas Lahan (m² / Ha)',
      'Lokasi SWP',
      'Tahap Peringatan (SP-1, SP-2, SP-3, Kepka Pembatalan, Pemulihan Komitmen)',
      'Alasan Evaluasi / Mangkrak',
      'Potensi Lahan Diselamatkan (Ha)',
    ],
    definisiOperasional:
      'Mengukur kemampuan direktorat menindaklanjuti kasus-kasus lahan mangkrak atau wanprestasi melalui penerbitan surat peringatan berjenjang hingga eksekusi pencabutan SK alokasi untuk diselamatkan kembali menjadi aset cadangan BP Batam.',
  },
  kpi_dokumen: {
    id: 'kpi_dokumen',
    datasetNo: 3,
    title: 'Persentase Pelaksanaan Kegiatan Dokumen Lahan, Pesisir dan Reklamasi',
    category: 'Administrasi Teknis & Standarisasi Dokumen',
    rumusTeks:
      'Persentase Pelaksanaan Dokumen = (Jumlah Dokumen Lahan, Pesisir & Reklamasi yang Disahkan / Target Dokumen yang Direncanakan) × 100%',
    calculatedFieldTableau:
      '// [Kalkulasi Pelaksanaan Dokumen Teknis]\n' +
      'SUM([Jumlah Dokumen Disahkan]) / SUM([Target Dokumen]) * 100',
    rowsColumnsGuide: {
      columns: '[Jenis Dokumen: BAPL, Teknis Reklamasi, Sempadan Pesisir, Rekomendasi]',
      rows: '[Realisasi Dokumen], [SLA Rata-rata Hari]',
      marks: 'Dual-Axis Bar & Line (Bar: Volume, Line: SLA Hari)',
      filters: '[Tahun], [Bulan / Triwulan], [Jenis Dokumen]',
    },
    atributSatuData: [
      'No. Dokumen Teknis',
      'Jenis Dokumen (BAPL, Reklamasi, Pesisir, Rekomendasi)',
      'Nama Objek / Pemohon',
      'Lokasi SWP',
      'Tanggal Pengesahan',
      'Waktu Penyelesaian (SLA Hari)',
      'Status Pengesahan (Disahkan / Revisi)',
    ],
    definisiOperasional:
      'Menilai akuntabilitas penerbitan dokumen Berita Acara Pemeriksaan Lapangan (BAPL), dokumen verifikasi teknis reklamasi, dan kajian sempadan pesisir sebagai dokumen hukum pengendali pertanahan di Batam.',
  },
  kpi_rekomendasi: {
    id: 'kpi_rekomendasi',
    datasetNo: 4,
    title: 'Persentase Pemberian Rekomendasi Perpanjangan Pembaruan Alokasi Lahan dan Izin Peralihan Hak',
    category: 'Layanan Clearance Perizinan Pertanahan',
    rumusTeks:
      'Persentase Pemberian Rekomendasi = (Jumlah Rekomendasi Selesai Diproses / Total Permohonan Rekomendasi Masuk) × 100%',
    calculatedFieldTableau:
      '// [Kalkulasi Kinerja Pemberian Rekomendasi Teknis]\n' +
      'COUNTD(IF [Status Rekomendasi] IN ("Disetujui", "Disetujui Bersyarat", "Ditolak") THEN [ID Permohonan] END) / COUNTD([ID Permohonan Masuk]) * 100',
    rowsColumnsGuide: {
      columns: '[Jenis Rekomendasi: Perpanjangan UWT vs Peralihan Hak]',
      rows: '[Jumlah Selesai], [% Keberhasilan Rekomendasi]',
      marks: 'Segmented Bar (Color: [Hasil: Disetujui, Bersyarat, Ditolak Mangkrak])',
      filters: '[Tahun], [Bulan], [SWP], [Hasil Keputusan]',
    },
    atributSatuData: [
      'No. Permohonan Rekomendasi',
      'Jenis Layanan (Perpanjangan Pembaruan Alokasi, Izin Peralihan Hak)',
      'Nama Pemohon & Peruntukan',
      'Luas Lahan (m²)',
      'Tanggal Masuk & Tanggal Terbit',
      'Hasil Keputusan (Disetujui, Bersyarat, Ditolak Mangkrak)',
      'SLA Hari Proses',
    ],
    definisiOperasional:
      'Mengukur ketepatan waktu dan objektivitas pemberian rekomendasi teknis pengendalian sebelum pemohon mendapatkan SK perpanjangan alokasi atau izin peralihan hak dari Dit. Pengelolaan Lahan, guna mencegah spekulasi lahan mangkrak.',
  },
};

export const PengendalianFormulaModal: React.FC<PengendalianFormulaModalProps> = ({
  kpiId,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !kpiId) return null;

  const detail =
    FORMULA_REGISTRY[kpiId] ||
    FORMULA_REGISTRY.kpi_pengawasan;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Formula &amp; Panduan Tableau Satu Data
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  DATASET #{detail.datasetNo}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Direktorat Pengendalian Pengelolaan Lahan, Pesisir dan Reklamasi (DP2LPR)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* KPI Title & Category */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-sky-700 tracking-wider">
              {detail.category}
            </span>
            <h4 className="text-sm font-black text-slate-900 mt-0.5">{detail.title}</h4>
            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
              {detail.definisiOperasional}
            </p>
          </div>

          {/* Mathematical Formula Box */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-slate-500" />
              <span>Formula Matematis KPI</span>
            </label>
            <div className="p-3 bg-slate-900 text-slate-100 font-mono text-xs rounded-xl border border-slate-800 select-all leading-relaxed">
              {detail.rumusTeks}
            </div>
          </div>

          {/* Tableau Calculated Field */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-slate-500" />
              <span>Tableau Calculated Field (Syntax)</span>
            </label>
            <div className="p-3 bg-slate-900 text-sky-300 font-mono text-xs rounded-xl border border-slate-800 select-all whitespace-pre-wrap leading-relaxed">
              {detail.calculatedFieldTableau}
            </div>
          </div>

          {/* Tableau Shelves Config Guide */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Rancangan Visualisasi Tableau (Shelves Configuration)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-slate-400 block font-semibold">Columns Shelf:</span>
                <span className="font-mono text-slate-900">{detail.rowsColumnsGuide.columns}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-slate-400 block font-semibold">Rows Shelf:</span>
                <span className="font-mono text-slate-900">{detail.rowsColumnsGuide.rows}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-slate-400 block font-semibold">Marks Card:</span>
                <span className="font-mono text-slate-900">{detail.rowsColumnsGuide.marks}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-slate-400 block font-semibold">Filters Shelf:</span>
                <span className="font-mono text-slate-900">{detail.rowsColumnsGuide.filters}</span>
              </div>
            </div>
          </div>

          {/* Satu Data Catalog Attributes */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Atribut Data Terstandarisasi (Buku Satu Data BP Batam)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {detail.atributSatuData.map((attr, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[10.5px] font-mono"
                >
                  {attr}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Katalog Satu Data Hal. 11 (Dataset #{detail.datasetNo})</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors cursor-pointer text-xs"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
