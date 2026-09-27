import React, { useState } from 'react';
import { X, FileCode2, Award, ShieldCheck, Server, BookOpen, CheckCircle2 } from 'lucide-react';
import { IKP_METRICS_LIST } from './kebijakanStrategisData';

interface KebijakanStrategisFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialKpiId?: string;
}

export const KebijakanStrategisFormulaModal: React.FC<KebijakanStrategisFormulaModalProps> = ({
  isOpen,
  onClose,
  initialKpiId = 'ikp-1-perencanaan',
}) => {
  const [selectedIkpId, setSelectedIkpId] = useState(initialKpiId);

  if (!isOpen) return null;

  const currentIkp = IKP_METRICS_LIST.find((m) => m.id === selectedIkpId) || IKP_METRICS_LIST[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#002B49] text-white flex items-center justify-center">
              <FileCode2 className="w-4 h-4 text-sky-300" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                KAMUS RUMUS &amp; MANUAL 4 IKP · PERKIN A2 (DEP A2)
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Dasar Hukum: Perjanjian Kinerja No. 3/KA/8/2025 &amp; Regulasi Nasional Terkait
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector for 4 IKP */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {IKP_METRICS_LIST.map((ikp) => (
            <button
              key={ikp.id}
              onClick={() => setSelectedIkpId(ikp.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedIkpId === ikp.id
                  ? 'bg-white text-[#002B49] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="font-mono text-[10.5px] font-black">{ikp.code}</span>
              <span className="truncate max-w-[130px]">{ikp.title.split(' ')[0]} {ikp.title.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Card Title & Overview */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-black bg-indigo-100 text-indigo-900">
                {currentIkp.code} · BUTIR #{currentIkp.number}
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {currentIkp.predikat}
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900">{currentIkp.title}</h4>
            <p className="text-slate-600 leading-relaxed">{currentIkp.keterangan}</p>
          </div>

          {/* Metric Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Target 2025</span>
              <span className="text-base font-black font-mono text-slate-900">{currentIkp.target}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Realisasi</span>
              <span className="text-base font-black font-mono text-emerald-700">{currentIkp.realisasi}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Satuan Ukur</span>
              <span className="text-xs font-black text-slate-800">{currentIkp.satuan}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Polaritas</span>
              <span className="text-xs font-black text-sky-700">{currentIkp.polarisasi}</span>
            </div>
          </div>

          {/* Formula & Calculation Method */}
          <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-2">
            <div className="flex items-center gap-2 text-sky-900 font-bold text-xs">
              <FileCode2 className="w-4 h-4 text-sky-700" />
              <span>Metodologi Perhitungan &amp; Skala Rentang Penilaian</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-sky-100 font-mono text-[11px] text-slate-800 leading-relaxed">
              {currentIkp.formulaRingkas}
            </div>
          </div>

          {/* Specific Technical Detail Per IKP */}
          {currentIkp.id === 'ikp-1-perencanaan' && (
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900">Rincian Indeks Perencanaan Pembangunan (IPPN):</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11.5px] leading-relaxed">
                <li>Berdasarkan SE Menteri PPN/Kepala Bappenas Nomor 3 Tahun 2023.</li>
                <li>Menilai konsistensi Renstra BP Batam 2025-2029 terhadap RPJMN 2025-2029.</li>
                <li>Evaluasi ketepatan alokasi RKA DIPA terhadap KRO (Keluaran Rincian Output) prioritas.</li>
                <li>Tingkat partisipasi pelaporan triwulanan secara elektronik via e-Monev Bappenas.</li>
              </ul>
            </div>
          )}

          {currentIkp.id === 'ikp-2-kebijakan' && (
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900">4 Dimensi Penilaian Indeks Kualitas Kebijakan (IKK):</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11.5px] leading-relaxed">
                <li><strong>Agenda Setting (Bobot 20%):</strong> Uji urgensi dan keterlibatan stakeholder dalam perumusan isu.</li>
                <li><strong>Formulasi Kebijakan (Bobot 30%):</strong> Kajian akademis, harmonisasi vertikal-horizontal, dan konsultasi publik.</li>
                <li><strong>Implementasi Kebijakan (Bobot 25%):</strong> Kesiapan juknis, SOP unit operasional, dan sosialisasi regulasi.</li>
                <li><strong>Evaluasi Kebijakan (Bobot 25%):</strong> Pengukuran dampak ekonomi, kepatuhan tarif, dan evaluasi purna regulasi.</li>
              </ul>
            </div>
          )}

          {currentIkp.id === 'ikp-3-spbe' && (
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900">Tingkat Kematangan Arsitektur SPBE (Skala 0 - 5):</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11.5px] leading-relaxed">
                <li>(0) Belum memiliki arsitektur SPBE.</li>
                <li>(1) Sudah memiliki arsitektur kondisi saat ini (as-is).</li>
                <li>(2) Memenuhi kriteria (1) dan telah memiliki target arsitektur to-be.</li>
                <li>(3) Memenuhi kriteria (2), telah melakukan gap analysis serta menyusun peta rencana SPBE terpadu.</li>
                <li>(4) <strong>Level BP Batam Saat Ini (4.12):</strong> Telah mengimplementasikan arsitektur SPBE dalam perencanaan penganggaran dan evaluasi belanja TIK.</li>
                <li>(5) Melakukan evaluasi berkala berkelanjutan sebagai mekanisme Continuous Improvement.</li>
              </ul>
            </div>
          )}

          {currentIkp.id === 'ikp-4-ikm-ptsp' && (
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900">9 Unsur Indeks Kepuasan Masyarakat (PermenPAN-RB No. 14/2017):</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11.5px] leading-relaxed">
                <li>Persyaratan, Sistem/Mekanisme/Prosedur, Waktu Penyelesaian.</li>
                <li>Biaya/Tarif Layanan, Produk Spesifikasi Layanan, Kompetensi Pelaksana Layanan.</li>
                <li>Perilaku Pelaksana, Penanganan Pengaduan/Saran/Masukan, Sarana &amp; Prasarana MPP.</li>
                <li>Konversi Nilai Interval: <strong>3.5324 - 4.00 (Kategori A / Sangat Baik = 88.31 - 100)</strong>.</li>
              </ul>
            </div>
          )}

          {/* Unit & Activity Budget attribution */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]">
            <div>
              <span className="text-slate-500">Unit Penanggung Jawab:</span>
              <span className="font-bold text-slate-900 ml-1">{currentIkp.unitKerja}</span>
            </div>
            <div>
              <span className="text-slate-500">Pagu Anggaran Kegiatan:</span>
              <span className="font-mono font-bold text-slate-900 ml-1">
                Rp {(currentIkp.paguKegiatan / 1e9).toFixed(2)} Miliar
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            Tutup Manual
          </button>
        </div>
      </div>
    </div>
  );
};
