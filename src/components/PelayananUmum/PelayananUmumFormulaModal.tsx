import React, { useState } from 'react';
import {
  X,
  FileCode2,
  Calculator,
  BookOpen,
  CheckCircle2,
  CreditCard,
  TrendingUp,
  Activity,
  Layers,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';
import { PERKIN_A6_KPIS } from './pelayananUmumData';

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialKpiId?: string;
}

export const PelayananUmumFormulaModal: React.FC<FormulaModalProps> = ({
  isOpen,
  onClose,
  initialKpiId = 'ikp-1',
}) => {
  const [activeKpiId, setActiveKpiId] = useState<string>(initialKpiId || 'ikp-1');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const currentKpi =
    PERKIN_A6_KPIS.find((k) => k.id === activeKpiId) || PERKIN_A6_KPIS[0];

  const handleCopyFormula = () => {
    navigator.clipboard.writeText(currentKpi.formula);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002B49] to-[#0A3D62] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <FileCode2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-blue-200 uppercase tracking-wider block">
                METODOLOGI & KAMUS RUMUS RESMI
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Formula Perjanjian Kinerja Perkin A6 (Pelayanan Umum)
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 overflow-x-auto text-xs font-bold">
          {PERKIN_A6_KPIS.map((kpi) => (
            <button
              key={kpi.id}
              onClick={() => setActiveKpiId(kpi.id)}
              className={`px-3 py-2 rounded-t-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeKpiId === kpi.id
                  ? 'bg-white text-[#002B49] border-t-2 border-[#002B49] shadow-2xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="font-mono text-[10px] bg-slate-200 px-1 rounded">
                {kpi.kode}
              </span>
              <span className="truncate max-w-[160px] sm:max-w-xs">{kpi.indikator}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Main Formula Card */}
          <div className="bg-slate-900 text-white rounded-xl p-4 font-mono relative">
            <div className="flex items-center justify-between text-[11px] text-cyan-300 pb-2 border-b border-slate-700 mb-2">
              <span className="flex items-center gap-1.5 font-bold uppercase">
                <Calculator className="w-4 h-4" />
                <span>FORMULA PERHITUNGAN</span>
              </span>
              <button
                onClick={handleCopyFormula}
                className="flex items-center gap-1 text-[10px] bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded cursor-pointer transition-colors"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? 'Tersalin' : 'Salin Formula'}</span>
              </button>
            </div>
            <p className="text-sm font-bold text-amber-300 leading-relaxed">
              {currentKpi.formula}
            </p>
          </div>

          {/* KPI Target, Realisasi & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                TARGET PERKIN RESMI
              </span>
              <span className="text-base font-extrabold text-slate-900 font-mono mt-0.5 block">
                {currentKpi.targetDisplay}
              </span>
              <span className="text-[10px] text-slate-500">
                Satuan: {currentKpi.satuan}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                REALISASI CAPAIAN
              </span>
              <span className="text-base font-extrabold text-emerald-600 font-mono mt-0.5 block">
                {currentKpi.realisasiDisplay}
              </span>
              <span className="text-[10px] text-slate-500">
                Akumulasi Januari s.d Desember
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                EVALUASI CAPAIAN
              </span>
              <span className="text-base font-extrabold text-blue-700 font-mono mt-0.5 block">
                {currentKpi.persenCapaian.toFixed(1)}%
              </span>
              <span className="text-[10px] font-bold text-emerald-600">
                {currentKpi.statusLabel}
              </span>
            </div>
          </div>

          {/* Official Perkin Metadata Table */}
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-slate-900 uppercase font-mono tracking-wider text-[11px] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>URAIAN RINCIAN INDIKATOR KINERJA PROGRAM (PERKIN NO. 6 /KA/ 3 /2025)</span>
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-600 bg-slate-50 w-1/3">
                      Sasaran Program / Kegiatan
                    </td>
                    <td className="py-2.5 px-3 text-slate-800 font-medium">
                      {currentKpi.sasaranProgram || 'Meningkatnya kinerja Badan Usaha Pelayanan Umum BP Batam'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-600 bg-slate-50">
                      Indikator Kinerja Program
                    </td>
                    <td className="py-2.5 px-3 text-slate-900 font-bold">
                      {currentKpi.indikator}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-600 bg-slate-50">
                      Penjelasan Operasional
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 leading-relaxed">
                      {currentKpi.penjelasanOperasional || currentKpi.deskripsi}
                    </td>
                  </tr>
                  {currentKpi.tujuan && (
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-slate-600 bg-slate-50">
                        Tujuan Indikator
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">
                        {currentKpi.tujuan}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-600 bg-slate-50">
                      Satuan Pengukuran
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">
                      {currentKpi.satuan}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-600 bg-slate-50">
                      Jenis Konsolidasi Periode
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">
                      {currentKpi.jenisKonsolidasi || 'Take Last Known (Akumulasi Januari s.d Desember)'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-600 bg-slate-50">
                      Polarisasi Indikator
                    </td>
                    <td className="py-2.5 px-3 font-mono text-emerald-700 font-semibold">
                      {currentKpi.polarisasi || 'Maximize (semakin tinggi capaian semakin baik)'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-600 bg-slate-50">
                      Periode Pelaporan & Sumber Data
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      <span className="font-mono font-bold text-slate-800">
                        {currentKpi.periodePelaporan || 'Tahunan'}
                      </span>
                      {' — '}
                      <span>{currentKpi.sumberData}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* If IKM (IKP-3), Show Standard PermenPAN-RB Table */}
          {currentKpi.id === 'ikp-3' && (
            <div className="space-y-1.5 p-3.5 bg-sky-50/70 border border-sky-200 rounded-xl">
              <h5 className="font-mono font-bold text-[11px] text-sky-900 uppercase">
                Tabel Skala Mutu Pelayanan PermenPAN-RB No. 14 Tahun 2017:
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-center text-[11px] border border-sky-300 rounded-lg bg-white overflow-hidden">
                  <thead className="bg-sky-100 font-bold text-sky-900 font-mono">
                    <tr>
                      <th className="py-1.5 px-2 border-r border-sky-200">Indeks Kuantitatif (Skala 1 - 100)</th>
                      <th className="py-1.5 px-2 border-r border-sky-200">Mutu Pelayanan</th>
                      <th className="py-1.5 px-2">Predikat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-100 font-mono">
                    <tr className="bg-emerald-50/80 font-bold text-emerald-800">
                      <td className="py-1 px-2 border-r border-sky-200">88,31 - 100,00</td>
                      <td className="py-1 px-2 border-r border-sky-200">A</td>
                      <td className="py-1 px-2">Sangat Baik (Capaian: 88,66)</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border-r border-sky-200">76,61 - 88,30</td>
                      <td className="py-1 px-2 border-r border-sky-200">B</td>
                      <td className="py-1 px-2">Baik</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border-r border-sky-200">65,00 - 76,60</td>
                      <td className="py-1 px-2 border-r border-sky-200">C</td>
                      <td className="py-1 px-2">Kurang Baik</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border-r border-sky-200">25,00 - 64,99</td>
                      <td className="py-1 px-2 border-r border-sky-200">D</td>
                      <td className="py-1 px-2">Tidak Baik</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Breakdown Komponen Badan Usaha */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 uppercase font-mono tracking-wider text-[11px] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>RINCIAN KONTRIBUSI BADAN USAHA PELAYANAN UMUM</span>
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 font-bold text-slate-600 font-mono text-[10px] uppercase">
                  <tr>
                    <th className="py-2 px-3">Badan Usaha / Unit</th>
                    <th className="py-2 px-3 text-right">Target</th>
                    <th className="py-2 px-3 text-right">Realisasi</th>
                    <th className="py-2 px-3 text-right">Keterangan / Capaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentKpi.komponenUnit.map((u, i) => (
                    <tr key={i} className="hover:bg-slate-50 font-mono">
                      <td className="py-2 px-3 font-sans font-semibold text-slate-800">
                        {u.unit}
                      </td>
                      <td className="py-2 px-3 text-right text-slate-600">
                        {u.target} {u.satuan}
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-slate-900">
                        {u.realisasi} {u.satuan}
                      </td>
                      <td className="py-2 px-3 text-right font-extrabold text-emerald-700">
                        {u.subLabel || `${u.persen.toFixed(1)}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dasar Regulasi & Penandatangan Resmi */}
          <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-2">
            <span className="text-[10.5px] font-mono font-bold text-amber-300 uppercase block">
              DOKUMEN DASAR: PERJANJIAN KINERJA NO. 6 /KA/ 3 /2025
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 font-sans pt-1 border-t border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Pihak Pertama:</span>
                <span className="font-bold text-white">Ariastuty Sirait</span>
                <span className="block text-[11px] text-slate-400">Anggota/Deputi Bidang Pelayanan Umum</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Pihak Kedua:</span>
                <span className="font-bold text-white">Amsakar Achmad</span>
                <span className="block text-[11px] text-slate-400">Kepala BP Batam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">
            Satu Data BP Batam • Perkin A6 TA 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#002B49] hover:bg-blue-800 text-white font-bold rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
