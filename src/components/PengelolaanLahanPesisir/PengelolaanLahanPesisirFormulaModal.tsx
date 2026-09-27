import React from 'react';
import {
  X,
  FileCode2,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  BookOpen,
  Download,
  Info,
} from 'lucide-react';
import { PERKIN_A3_METADATA, PERKIN_A3_KPIS } from './pengelolaanLahanPesisirData';

interface PengelolaanLahanPesisirFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpiId?: string | null;
}

export const PengelolaanLahanPesisirFormulaModal: React.FC<
  PengelolaanLahanPesisirFormulaModalProps
> = ({ isOpen, onClose, kpiId }) => {
  if (!isOpen) return null;

  const selectedKpi =
    PERKIN_A3_KPIS.find((k) => k.id === kpiId) || PERKIN_A3_KPIS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs font-sans select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white border border-slate-300 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden rounded-2xl">
        {/* Top Header */}
        <div className="bg-[#0F1E36] text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xs border border-blue-400/30">
              <BookOpen className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase">
                  MANUAL TEKNIS PERKIN A3
                </span>
                <span className="text-[10px] font-mono text-slate-300">
                  Nomor: {PERKIN_A3_METADATA.nomor}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mt-0.5">
                Kamus Rumus &amp; Penjelasan Uraian Indikator Kinerja Program
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
          {/* 1. Official Legal Header Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <span className="text-xs font-mono font-bold text-slate-500">
                LAMPIRAN II PERJANJIAN KINERJA TAHUN 2025
              </span>
              <span className="text-xs font-mono text-blue-700 font-bold">
                Batam, {PERKIN_A3_METADATA.tanggal}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Pihak Pertama:</span>
                <span className="font-bold text-slate-800">{PERKIN_A3_METADATA.pihakPertama}</span>
                <span className="text-[11px] text-slate-500 block">({PERKIN_A3_METADATA.jabatanPertama})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Pihak Kedua (Atasan):</span>
                <span className="font-bold text-slate-800">{PERKIN_A3_METADATA.pihakKedua}</span>
                <span className="text-[11px] text-slate-500 block">({PERKIN_A3_METADATA.jabatanKedua})</span>
              </div>
            </div>
          </div>

          {/* 2. Selected IKP Card Detail */}
          <div className="bg-white rounded-xl border border-blue-200 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  INDIKATOR #{selectedKpi.no}
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {selectedKpi.nama}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">TARGET TAHUN 2025</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-blue-700">
                  {selectedKpi.target2025} {selectedKpi.satuan}
                </span>
              </div>
            </div>

            {/* Formula Block */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5 font-mono">
              <span className="text-[10.5px] text-cyan-300 font-bold uppercase tracking-wider block">
                FORMULA PERHITUNGAN RESMI:
              </span>
              <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs sm:text-sm text-cyan-100 font-bold">
                {selectedKpi.formula}
              </div>
            </div>

            {/* Metadata Table (Persis Lampiran II PDF) */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <td className="p-2.5 font-bold text-slate-700 w-1/3">Sasaran Kegiatan</td>
                    <td className="p-2.5 text-slate-900">{selectedKpi.sasaranKegiatan}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-2.5 font-bold text-slate-700">Penjelasan Operasional</td>
                    <td className="p-2.5 text-slate-900 leading-relaxed">
                      {selectedKpi.penjelasanOperasional}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <td className="p-2.5 font-bold text-slate-700">Satuan Pengukuran</td>
                    <td className="p-2.5 text-slate-900 font-mono">{selectedKpi.satuan}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-2.5 font-bold text-slate-700">Jenis Konsolidasi Periode</td>
                    <td className="p-2.5 text-slate-900 font-mono">{selectedKpi.jenisKonsolidasi}</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <td className="p-2.5 font-bold text-slate-700">Polarisasi Indikator Kinerja</td>
                    <td className="p-2.5 text-slate-900 font-mono font-bold text-emerald-700">
                      {selectedKpi.polarisasi}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-2.5 font-bold text-slate-700">Periode Pelaporan</td>
                    <td className="p-2.5 text-slate-900 font-mono">{selectedKpi.periodePelaporan}</td>
                  </tr>
                  <tr className="bg-slate-50/70">
                    <td className="p-2.5 font-bold text-slate-700">Sumber Data Resmi</td>
                    <td className="p-2.5 text-blue-700 font-bold">{selectedKpi.sumberData}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Ringkasan Pagu Anggaran 2 Kegiatan Program */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <h5 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-tight flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              Alokasi Anggaran Program (Lampiran I Perkin A3: Rp 92.503.740.000,-)
            </h5>

            <div className="space-y-2">
              {PERKIN_A3_METADATA.kegiatan.map((k) => (
                <div
                  key={k.no}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs"
                >
                  <div className="space-y-0.5 max-w-lg">
                    <span className="font-bold text-slate-900">
                      {k.no}. {k.nama}
                    </span>
                    <span className="text-[10.5px] text-slate-500 block">
                      Satker Pelaksana: {k.satker}
                    </span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-slate-900 text-sm block">
                      {k.paguFormatted}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">
                      Serapan: {k.persen}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            BP Batam • Perjanjian Kinerja Terintegrasi
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
