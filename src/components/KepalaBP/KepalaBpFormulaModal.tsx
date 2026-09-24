import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Award,
  TrendingUp,
  Smile,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Table,
  Layers
} from 'lucide-react';
import {
  EMPAT_IKS_KEPALA_BP,
  STANDAR_IKM_PERMENPAN,
  TABEL_TARGET_PNBP_PERKIN,
  STANDAR_REFORMASI_BIROKRASI
} from './kepalaBpData';

interface KepalaBpFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIksId?: string | null;
}

export const KepalaBpFormulaModal: React.FC<KepalaBpFormulaModalProps> = ({
  isOpen,
  onClose,
  initialIksId,
}) => {
  const [selectedIksId, setSelectedIksId] = useState<string>(
    initialIksId || 'iks-1'
  );

  if (!isOpen) return null;

  const currentIks =
    EMPAT_IKS_KEPALA_BP.find((i) => i.id === selectedIksId) ||
    EMPAT_IKS_KEPALA_BP[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs font-sans animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white border border-slate-300 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden rounded-2xl">
        {/* MODAL HEADER */}
        <div className="bg-[#0F1E36] text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-xs">
              <BookOpen className="w-5 h-5 text-amber-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-full">
                  Lampiran Resmi Perkin 2026
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Manual Indikator Kinerja Strategis
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Kamus Rumus &amp; Metodologi 4 Indikator Kinerja Strategis (IKS)
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* IKS SELECTOR BUTTONS */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {EMPAT_IKS_KEPALA_BP.map((iks) => (
            <button
              key={iks.id}
              onClick={() => setSelectedIksId(iks.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                selectedIksId === iks.id
                  ? 'bg-[#1F3864] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span className="font-mono text-[10.5px]">0{iks.nomor}</span>
              <span className="truncate max-w-[170px] sm:max-w-none">
                {iks.indikatorKinerjaStrategis}
              </span>
            </button>
          ))}
        </div>

        {/* MODAL BODY */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-800">
          {/* IDENTITAS IKS */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10.5px] font-bold text-blue-700 uppercase tracking-wider font-mono">
                MANUAL INDIKATOR 0{currentIks.nomor}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Target 2026: {currentIks.target}
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900 leading-snug">
              {currentIks.indikatorKinerjaStrategis}
            </h4>
            <div className="text-slate-600 font-medium">
              <strong>Sasaran Strategis:</strong> {currentIks.sasaranStrategis}
            </div>
          </div>

          {/* DESKRIPSI & FORMULA TABEL (PERSIS MANUAL PDF) */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="w-40 bg-slate-50 font-bold p-3 text-slate-700">
                    Deskripsi Indikator
                  </td>
                  <td className="p-3 leading-relaxed text-slate-800">
                    {currentIks.deskripsi}
                  </td>
                </tr>

                <tr>
                  <td className="bg-slate-50 font-bold p-3 text-slate-700">
                    Formula Perhitungan
                  </td>
                  <td className="p-3 leading-relaxed bg-blue-50/40 font-mono text-slate-900 font-semibold">
                    {currentIks.formulaRingkas}
                  </td>
                </tr>

                <tr>
                  <td className="bg-slate-50 font-bold p-3 text-slate-700">
                    Satuan Pengukuran
                  </td>
                  <td className="p-3 font-semibold text-slate-800">
                    {currentIks.satuan}
                  </td>
                </tr>

                <tr>
                  <td className="bg-slate-50 font-bold p-3 text-slate-700">
                    Polarisasi Indikator
                  </td>
                  <td className="p-3 text-slate-800">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono">
                      {currentIks.polarisasi}
                    </span>{' '}
                    (Semakin tinggi capaian semakin baik)
                  </td>
                </tr>

                <tr>
                  <td className="bg-slate-50 font-bold p-3 text-slate-700">
                    Jenis Konsolidasi
                  </td>
                  <td className="p-3 text-slate-800">
                    {currentIks.jenisKonsolidasi}
                  </td>
                </tr>

                <tr>
                  <td className="bg-slate-50 font-bold p-3 text-slate-700">
                    Periode Pelaporan
                  </td>
                  <td className="p-3 text-slate-800">
                    {currentIks.periodePelaporan}
                  </td>
                </tr>

                <tr>
                  <td className="bg-slate-50 font-bold p-3 text-slate-700">
                    Sumber Data Resmi
                  </td>
                  <td className="p-3 font-bold text-blue-900">
                    {currentIks.sumberData}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* KHUSUS IKS-1: DETAIL MODAL TETAP DAN MODAL LANCAR */}
          {selectedIksId === 'iks-1' && (
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
              <h5 className="font-bold text-blue-950">
                Penjelasan Komponen Formula Realisasi Investasi (Halaman 3 PDF):
              </h5>
              <div className="text-xs text-slate-700 space-y-1 leading-relaxed">
                <div>
                  • <strong>Modal Tetap:</strong> Diperoleh dari Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam (Impor Barang Modal + Margin Distribusi + Jasa Pemasangan + Biaya Lain-lain).
                </div>
                <div>
                  • <strong>Modal Lancar:</strong> Diperoleh dari Kantor Pelayanan Utama Bea dan Cukai Batam serta Badan Pusat Statistik (BPS) Kota Batam.
                </div>
              </div>
            </div>
          )}

          {/* KHUSUS IKS-2: TABEL STANDAR IKM PERMENPAN 14/2017 */}
          {selectedIksId === 'iks-2' && (
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900">
                Tabel Standar Penilaian IKM PermenPAN-RB No. 14 Tahun 2017 (Halaman 4 PDF):
              </h5>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-center text-xs">
                  <thead className="bg-slate-100 font-bold">
                    <tr>
                      <th className="p-2 border">Skala 1 - 100</th>
                      <th className="p-2 border">Mutu Pelayanan</th>
                      <th className="p-2 border">Predikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STANDAR_IKM_PERMENPAN.map((std) => (
                      <tr key={std.mutu} className={std.mutu === 'A' ? 'bg-emerald-50 font-bold' : ''}>
                        <td className="p-2 border font-mono">{std.rentang}</td>
                        <td className="p-2 border font-mono">{std.mutu}</td>
                        <td className="p-2 border">{std.predikat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* KHUSUS IKS-3: DAFTAR 10 UNIT KERJA PENGHASIL PNBP */}
          {selectedIksId === 'iks-3' && (
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900">
                10 Unit Kerja Penghasil PNBP Target Renstra 2,447 T (Halaman 5 PDF):
              </h5>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-bold">
                    <tr>
                      <th className="p-2 border text-center">No</th>
                      <th className="p-2 border">Unit Kerja / Badan Usaha</th>
                      <th className="p-2 border text-right">Target (Juta Rp)</th>
                      <th className="p-2 border text-center">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABEL_TARGET_PNBP_PERKIN.map((row) => (
                      <tr key={row.no}>
                        <td className="p-2 border text-center font-mono">{row.no}</td>
                        <td className="p-2 border font-medium">{row.namaSatker}</td>
                        <td className="p-2 border text-right font-mono">{row.targetPnbpJuta.toLocaleString('id-ID')}</td>
                        <td className="p-2 border text-center font-mono font-bold text-indigo-700">{row.targetPersen}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* KHUSUS IKS-4: TABEL STANDAR REFORMASI BIROKRASI */}
          {selectedIksId === 'iks-4' && (
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900">
                Tabel Standar Kategori RB SE MenPAN-RB No. 6 Tahun 2025 (Halaman 6 PDF):
              </h5>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-center text-xs">
                  <thead className="bg-slate-100 font-bold">
                    <tr>
                      <th className="p-2 border">Kategori</th>
                      <th className="p-2 border">Nilai / Angka</th>
                      <th className="p-2 border">Predikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STANDAR_REFORMASI_BIROKRASI.map((row) => (
                      <tr key={row.kategori} className={row.kategori === 'BB' ? 'bg-blue-100 font-bold' : ''}>
                        <td className="p-2 border font-mono">{row.kategori}</td>
                        <td className="p-2 border font-mono">{row.nilai}</td>
                        <td className="p-2 border">{row.predikat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Tutup Manual
          </button>
        </div>
      </div>
    </div>
  );
};
