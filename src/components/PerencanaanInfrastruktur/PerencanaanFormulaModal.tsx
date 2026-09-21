import React, { useState } from 'react';
import {
  Calculator,
  X,
  Copy,
  Check,
  Code2,
  Database,
  Building2,
  Boxes,
  Palmtree,
  Trees,
  Route,
  Ship,
  FileCheck2,
} from 'lucide-react';
import { KPI_SEKTOR_LIST, PEMANFAATAN_DOKUMEN_LIST } from './perencanaanData';

interface PerencanaanFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDatasetNo?: number;
}

export const PerencanaanFormulaModal: React.FC<PerencanaanFormulaModalProps> = ({
  isOpen,
  onClose,
  initialDatasetNo = 1,
}) => {
  const [selectedDatasetNo, setSelectedDatasetNo] = useState<number>(initialDatasetNo);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentSectorKpi = KPI_SEKTOR_LIST.find((k) => k.datasetNo === selectedDatasetNo);
  const currentPemanfaatan = PEMANFAATAN_DOKUMEN_LIST.find((p) => p.datasetNo === selectedDatasetNo);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getTableauFormula = (datasetNo: number) => {
    switch (datasetNo) {
      case 1:
        return `// DATASET NO 1: Jumlah Perencanaan Infrastruktur Gedung (Satu Data Hal. 53 No. 1)\n// 1. Jumlah DED:\nCOUNTD(IF [Kategori Sektor] = "Gedung" AND [Status Dokumen] != "Batal" THEN [Kode Paket Perencanaan] END)\n\n// 2. Biaya DED:\nSUM(IF [Kategori Sektor] = "Gedung" THEN [Pagu Biaya DED] END)\n\n// 3. Waktu Pelaksanaan DED (Bulan):\nAVG(IF [Kategori Sektor] = "Gedung" THEN [Waktu Pelaksanaan Bulan] END)`;
      case 2:
        return `// DATASET NO 2: Jumlah Perencanaan Utilitas & Drainase (Satu Data Hal. 53 No. 2)\n// 1. Jumlah DED:\nCOUNTD(IF [Kategori Sektor] = "Utilitas dan Drainase" THEN [Kode Paket Perencanaan] END)\n\n// 2. Biaya DED:\nSUM(IF [Kategori Sektor] = "Utilitas dan Drainase" THEN [Pagu Biaya DED] END)`;
      case 3:
        return `// DATASET NO 3: Jumlah Perencanaan Fasilitas Wisata & Lingkungan (Satu Data Hal. 53 No. 3)\n// 1. Jumlah DED:\nCOUNTD(IF [Kategori Sektor] = "Fasilitas Wisata dan Lingkungan" THEN [Kode Paket Perencanaan] END)\n\n// 2. Biaya DED:\nSUM(IF [Kategori Sektor] = "Fasilitas Wisata dan Lingkungan" THEN [Pagu Biaya DED] END)`;
      case 4:
        return `// DATASET NO 4: Jumlah Perencanaan Pertanaman & Penghijauan (Satu Data Hal. 53 No. 4)\n// 1. Jumlah DED:\nCOUNTD(IF [Kategori Sektor] = "Pertanaman dan Penghijauan" THEN [Kode Paket Perencanaan] END)\n\n// 2. Biaya DED:\nSUM(IF [Kategori Sektor] = "Pertanaman dan Penghijauan" THEN [Pagu Biaya DED] END)`;
      case 5:
        return `// DATASET NO 5: Jumlah Perencanaan Infrastruktur Darat (Satu Data Hal. 53 No. 5)\n// 1. Jumlah DED:\nCOUNTD(IF [Kategori Sektor] = "Darat" THEN [Kode Paket Perencanaan] END)\n\n// 2. Biaya DED:\nSUM(IF [Kategori Sektor] = "Darat" THEN [Pagu Biaya DED] END)`;
      case 6:
        return `// DATASET NO 6: Jumlah Perencanaan Infrastruktur Laut dan Udara (Satu Data Hal. 53 No. 6)\n// 1. Jumlah DED:\nCOUNTD(IF [Kategori Sektor] = "Laut dan Udara" THEN [Kode Paket Perencanaan] END)\n\n// 2. Biaya DED:\nSUM(IF [Kategori Sektor] = "Laut dan Udara" THEN [Pagu Biaya DED] END)`;
      case 7:
        return `// DATASET NO 7: Persentase Pemanfaatan Dokumen Teknis Bangunan (Satu Data Hal. 53 No. 7 - SIFAT TERBUKA)\n// Persentase Pemanfaatan (%):\n(COUNTD(IF [Kategori Sektor] = "Gedung" AND [Status Pemanfaatan] = "Dimanfaatkan" THEN [Kode DED] END) /\nCOUNTD(IF [Kategori Sektor] = "Gedung" THEN [Kode DED] END)) * 100\n\n// Nilai DED Dimanfaatkan:\nSUM(IF [Kategori Sektor] = "Gedung" AND [Status Pemanfaatan] = "Dimanfaatkan" THEN [Nilai DED] END)\n\n// Jumlah Unit Pengguna DED:\nCOUNTD(IF [Kategori Sektor] = "Gedung" THEN [Unit Pengguna] END)`;
      case 8:
        return `// DATASET NO 8: Persentase Pemanfaatan Dokumen Teknis Perhubungan (Satu Data Hal. 53 No. 8 - SIFAT TERBUKA)\n// Persentase Pemanfaatan (%):\n(COUNTD(IF [Kategori Sektor] IN ("Darat", "Laut dan Udara") AND [Status Pemanfaatan] = "Dimanfaatkan" THEN [Kode DED] END) /\nCOUNTD(IF [Kategori Sektor] IN ("Darat", "Laut dan Udara") THEN [Kode DED] END)) * 100\n\n// Nilai DED Dimanfaatkan:\nSUM(IF [Kategori Sektor] IN ("Darat", "Laut dan Udara") AND [Status Pemanfaatan] = "Dimanfaatkan" THEN [Nilai DED] END)`;
      case 9:
        return `// DATASET NO 9: Persentase Pemanfaatan Dokumen Teknis Lingkungan (Satu Data Hal. 53 No. 9 - SIFAT TERBUKA)\n// Persentase Pemanfaatan (%):\n(COUNTD(IF [Kategori Sektor] IN ("Utilitas dan Drainase", "Pertanaman dan Penghijauan", "Fasilitas Wisata dan Lingkungan") AND [Status Pemanfaatan] = "Dimanfaatkan" THEN [Kode DED] END) /\nCOUNTD(IF [Kategori Sektor] IN ("Utilitas dan Drainase", "Pertanaman dan Penghijauan", "Fasilitas Wisata dan Lingkungan") THEN [Kode DED] END)) * 100\n\n// Nilai DED Dimanfaatkan:\nSUM(IF [Kategori Sektor] IN ("Utilitas dan Drainase", "Pertanaman dan Penghijauan", "Fasilitas Wisata dan Lingkungan") AND [Status Pemanfaatan] = "Dimanfaatkan" THEN [Nilai DED] END)`;
      default:
        return `COUNTD([Kode Paket Perencanaan])`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Kamus Data &amp; Formula Tableau (Direktorat Perencanaan Infrastruktur)
              </h3>
              <p className="text-xs text-slate-500">
                Dokumentasi definisi metrik Satu Data BP Batam Hal. 53 (Dataset 1 s.d. 9 Lengkap)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dataset Tabs (1 s.d. 9) */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Dataset:</span>
          {KPI_SEKTOR_LIST.map((kpi) => (
            <button
              key={kpi.datasetNo}
              onClick={() => setSelectedDatasetNo(kpi.datasetNo)}
              className={`px-2.5 py-1.5 rounded-md font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                selectedDatasetNo === kpi.datasetNo
                  ? 'bg-white text-sky-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full bg-sky-100 text-sky-800 text-[9px] flex items-center justify-center font-bold">
                {kpi.datasetNo}
              </span>
              <span>{kpi.sektor.split(' ')[0]}</span>
            </button>
          ))}
          {PEMANFAATAN_DOKUMEN_LIST.map((pem) => (
            <button
              key={pem.datasetNo}
              onClick={() => setSelectedDatasetNo(pem.datasetNo)}
              className={`px-2.5 py-1.5 rounded-md font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                selectedDatasetNo === pem.datasetNo
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full bg-white text-emerald-800 text-[9px] flex items-center justify-center font-bold">
                {pem.datasetNo}
              </span>
              <span>{pem.kategori}</span>
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Active Dataset Overview */}
          {currentSectorKpi ? (
            <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-200">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-sky-700" />
                  <h4 className="font-bold text-sky-950 text-sm">
                    Dataset No. {currentSectorKpi.datasetNo}: {currentSectorKpi.datasetTitle}
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                  Sifat: Tertutup (Statistik Tahunan)
                </span>
              </div>
              <p className="text-xs text-sky-900 leading-relaxed">
                {currentSectorKpi.deskripsi}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] font-medium text-sky-900">
                <span className="bg-white/80 px-2.5 py-0.5 rounded border border-sky-200">
                  Jumlah DED: <strong>{currentSectorKpi.totalPaket} Paket</strong>
                </span>
                <span className="bg-white/80 px-2.5 py-0.5 rounded border border-sky-200">
                  Biaya DED: <strong>Rp {(currentSectorKpi.totalPaguDED / 1000000000).toFixed(2)} Miliar</strong>
                </span>
                <span className="bg-white/80 px-2.5 py-0.5 rounded border border-sky-200">
                  Waktu Pelaksanaan: <strong>{currentSectorKpi.waktuPelaksanaanAvgBulan} Bulan</strong>
                </span>
              </div>
            </div>
          ) : currentPemanfaatan ? (
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bold text-emerald-950 text-sm">
                    Dataset No. {currentPemanfaatan.datasetNo}: {currentPemanfaatan.namaDataset}
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  Sifat: Terbuka
                </span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {currentPemanfaatan.keterangan}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] font-medium text-emerald-950">
                <span className="bg-white/80 px-2.5 py-0.5 rounded border border-emerald-200">
                  Persentase Pemanfaatan: <strong>{currentPemanfaatan.persentasePemanfaatan.toFixed(1)}%</strong>
                </span>
                <span className="bg-white/80 px-2.5 py-0.5 rounded border border-emerald-200">
                  Nilai DED Dimanfaatkan: <strong>Rp {(currentPemanfaatan.nilaiDedDimanfaatkan / 1e9).toFixed(2)} Miliar</strong>
                </span>
                <span className="bg-white/80 px-2.5 py-0.5 rounded border border-emerald-200">
                  Tahun Pembuatan: <strong>{currentPemanfaatan.tahunPembuatanDed}</strong>
                </span>
                <span className="bg-white/80 px-2.5 py-0.5 rounded border border-emerald-200">
                  Jumlah Unit Pengguna: <strong>{currentPemanfaatan.jumlahUnitPengguna} Instansi</strong>
                </span>
              </div>
            </div>
          ) : null}

          {/* Tableau Calculated Field Implementation */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Formula Perhitungan &amp; Calculated Field Tableau</span>
              </h5>
              <button
                onClick={() => handleCopy(getTableauFormula(selectedDatasetNo), 'tab-formula')}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 transition-colors cursor-pointer"
              >
                {copiedKey === 'tab-formula' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin Formula</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
              {getTableauFormula(selectedDatasetNo)}
            </pre>
          </div>

          {/* Business Logic & Data Dictionary */}
          <div>
            <h5 className="font-bold text-slate-800 text-xs mb-2">Atribut Kolom Sumber Data (Satu Data BP Batam Hal. 53)</h5>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                  <tr>
                    <th className="p-2.5">Atribut</th>
                    <th className="p-2.5">Tipe Data</th>
                    <th className="p-2.5">Keterangan Teknis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  <tr>
                    <td className="p-2.5 font-mono text-slate-900 font-semibold">JUMLAH_DED</td>
                    <td className="p-2.5 text-slate-500">Integer</td>
                    <td className="p-2.5 text-slate-700">Jumlah paket Detail Engineering Design (DED) yang disiapkan di sektor terkait</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono text-slate-900 font-semibold">BIAYA_DED_RP</td>
                    <td className="p-2.5 text-slate-500">Numeric(18,2)</td>
                    <td className="p-2.5 text-slate-700">Pagu anggaran belanja jasa konsultansi engineering perencanaan DED</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono text-slate-900 font-semibold">WAKTU_PELAKSANAAN_BLN</td>
                    <td className="p-2.5 text-slate-500">Decimal(4,1)</td>
                    <td className="p-2.5 text-slate-700">Rata-rata waktu pelaksanaan penyusunan DED dalam satuan Bulan</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono text-slate-900 font-semibold">PERSEN_PEMANFAATAN</td>
                    <td className="p-2.5 text-slate-500">Decimal(5,2)</td>
                    <td className="p-2.5 text-slate-700">Persentase dokumen perencanaan teknis yang dimanfaatkan unit/instansi lain</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono text-slate-900 font-semibold">NILAI_DED_DIMANFAATKAN</td>
                    <td className="p-2.5 text-slate-500">Numeric(18,2)</td>
                    <td className="p-2.5 text-slate-700">Total nilai DED dalam rupiah yang telah digunakan dalam pelaksanaan fisik</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono text-slate-900 font-semibold">JML_UNIT_PENGGUNA</td>
                    <td className="p-2.5 text-slate-500">Integer</td>
                    <td className="p-2.5 text-slate-700">Jumlah unit/instansi lain pengguna dokumen DED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            Sesuai Standar Tata Kelola Satu Data Indonesia &amp; BP Batam (Hal. 53)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
