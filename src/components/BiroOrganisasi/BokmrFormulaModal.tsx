import React, { useState } from 'react';
import { X, FileCode2, Calculator, CheckCircle2, BookOpen, Layers, ExternalLink, ShieldCheck } from 'lucide-react';

interface BokmrFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDatasetIndex?: number;
}

export const BokmrFormulaModal: React.FC<BokmrFormulaModalProps> = ({
  isOpen,
  onClose,
  initialDatasetIndex = 2,
}) => {
  const [activeTab, setActiveTab] = useState<number>(initialDatasetIndex);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Kamus Atribut Data & Rumus Matematis BOKMR
              </h3>
              <p className="text-xs text-slate-500">
                Sumber Resmi: Atribut Daftar Data Satu Data BP Batam (Halaman 38 - 40)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TABS SELECTOR */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 px-6 pt-2 gap-2 overflow-x-auto">
          {[
            { id: 0, label: 'Indeks Reformasi Kebijakan' },
            { id: 2, label: 'Dataset #2: SAKIP' },
            { id: 6, label: 'Dataset #6 & #7: BLU' },
            { id: 10, label: 'Dataset #10 & #11: Aduan & SKM' },
            { id: 14, label: 'Dataset #14: Piagam Risiko' },
            { id: 17, label: 'Dataset #17: Maturitas SPIP' },
            { id: 18, label: 'Dataset #18: Indeks Risiko' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-lg shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT BODY */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {activeTab === 0 && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-amber-900 text-sm">
                    INDEKS REFORMASI KEBIJAKAN (IRK) / KUALITAS KEBIJAKAN
                  </span>
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-semibold text-[10px]">
                    STATUS: DATASET BELUM TERSEDIA DI SATU DATA
                  </span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  Sebagaimana dicatat dalam permintaan pimpinan, dataset resmi untuk Indeks Reformasi Kebijakan saat ini belum terdaftar di metadata Satu Data BP Batam. Indeks ini mengukur kualitas formulasi kebijakan (Perka/Kepka), konsultasi publik, dan dampak regulasi.
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2">
                <div className="text-amber-400 font-bold">// FORMULA STANDAR INDEKS KUALITAS KEBIJAKAN (LAN RI):</div>
                <div className="bg-slate-800 p-2.5 rounded border border-slate-700 text-emerald-300">
                  IKK = (0.30 * Perencanaan) + (0.35 * Implementasi) + (0.20 * Evaluasi) + (0.15 * Tata Kelola)
                </div>
                <div className="text-[11px] text-slate-400">
                  Estimasi Mandiri BP Batam: 84.75 / 100 (Predikat A / Sangat Baik)
                </div>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-900 text-sm">
                    Dataset 2: NILAI SISTEM AKUNTABILITAS KINERJA INSTANSI PEMERINTAH (SAKIP)
                  </span>
                  <span className="px-2 py-0.5 bg-indigo-200 text-indigo-900 rounded font-semibold text-[10px]">
                    DATA STATISTIK PERTAHUN | TERBUKA
                  </span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  Evaluasi resmi KemenPAN-RB atas akuntabilitas perencanaan, pengukuran, pelaporan, dan evaluasi capaian kinerja instansi.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs mb-2 uppercase tracking-wider">
                  Daftar Atribut Data Resmi (PDF Halaman 38)
                </h4>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-700 leading-relaxed">
                  TAHUN, KOMPONEN YANG DINILAI, BOBOT, NILAI, TINGKAT AKUNTABILITAS KINERJA.
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2">
                <div className="text-sky-400 font-bold">// FORMULA TOTAL NILAI SAKIP:</div>
                <div className="bg-slate-800 p-2.5 rounded border border-slate-700 text-emerald-300">
                  Total Nilai SAKIP = Σ (Nilai Komponen)
                  = 25.10 (Perencanaan/30) + 24.60 (Pengukuran/30) + 12.75 (Pelaporan/15) + 20.23 (Evaluasi/25)
                  = 82.68 (Predikat A - Memuaskan)
                </div>
              </div>
            </div>
          )}

          {activeTab === 6 && (
            <div className="space-y-4">
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                <span className="font-bold text-sky-900 text-sm block mb-1">
                  Dataset 6 & 7: PENGAWASAN & MODERNISASI PENGELOLAAN BLU
                </span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Atribut Dataset #6: TAHUN, PERSENTASE PENYELESAIAN PENGELOLA BLU, DEWAN PENGAWAS BLU, KOMITE AUDIT BLU, SATUAN PENGAWAS INTERN BLU.<br />
                  Atribut Dataset #7: SEMESTER, TAHUN, TARGET, CAPAIAN, PERSENTASE.
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2">
                <div className="text-emerald-400 font-bold">// FORMULA PERSENTASE PENYELESAIAN REKOMENDASI:</div>
                <div className="bg-slate-800 p-2.5 rounded border border-slate-700 text-emerald-300">
                  % Selesai = (Jumlah Rekomendasi TL Selesai / Total Rekomendasi Audit Diterbitkan) * 100%
                </div>
                <div className="text-[11px] text-slate-400">
                  Pengelola BLU: 94.4% | Dewas: 96.5% | Komite Audit: 92.2% | SPI: 97.9% | Rata-rata: 95.26%
                </div>
              </div>
            </div>
          )}

          {activeTab === 10 && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <span className="font-bold text-blue-900 text-sm block mb-1">
                  Dataset 10 & 11: PENGADUAN LAYANAN BADAN USAHA & SURVEI KEPUASAN (SKM)
                </span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Dataset 10 memantau volume aduan di BU RSBP, Pelabuhan, Bandara, SPAM, dan PTSP.<br />
                  Dataset 11 (Ref screenshot 1.325 entri): TAHUN, UNIT USAHA, KATEGORI, DETAIL, NILAI, PERSENTASE.
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2">
                <div className="text-blue-400 font-bold">// FORMULA TINGKAT RESOLUSI ADUAN:</div>
                <div className="bg-slate-800 p-2.5 rounded border border-slate-700 text-emerald-300">
                  Tingkat Resolusi (%) = (Pengaduan Selesai / Pengaduan Diterima) * 100%
                </div>
                <div className="text-[11px] text-slate-400">
                  Realisasi: (450 selesai / 468 diterima) * 100% = 96.15% Tuntas
                </div>
              </div>
            </div>
          )}

          {activeTab === 14 && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
                <span className="font-bold text-rose-900 text-sm block mb-1">
                  Dataset 14: PIAGAM RISIKO UNIT KERJA
                </span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Atribut Resmi: NOMOR PIAGAM, UNIT KERJA, NO FAKTUR, SASARAN ORGANISASI, KEJADIAN RISIKO, BESARAN RISIKO AWAL TAHUN, BESARAN RISIKO AKHIR TAHUN.
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2">
                <div className="text-rose-400 font-bold">// FORMULA BESARAN RISIKO (MATRIKS 5X5):</div>
                <div className="bg-slate-800 p-2.5 rounded border border-slate-700 text-emerald-300">
                  Besaran Risiko = Probabilitas (1 - 5) * Dampak (1 - 5)
                  Besaran Maksimal = 25 (Sangat Tinggi / Merah)
                </div>
                <div className="text-[11px] text-slate-400">
                  Tingkat Penurunan Risiko BP Batam: Rata-rata berkurang 9.8 poin (Mitigasi Efektif)
                </div>
              </div>
            </div>
          )}

          {activeTab === 17 && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 text-sm block mb-1">
                  Dataset 17: PENILAIAN MATURITAS SPIP
                </span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Atribut: NO, KOMPONEN PENILAIAN, BOBOT, SKOR, PERIODE PENILAIAN. Mengacu pada Peraturan Pemerintah Nomor 60 Tahun 2008.
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2">
                <div className="text-emerald-400 font-bold">// FORMULA SKOR AGREGAT SPIP:</div>
                <div className="bg-slate-800 p-2.5 rounded border border-slate-700 text-emerald-300">
                  Skor SPIP = Σ (Skor Unsur * Bobot%)
                  = (3.48*0.30) + (3.35*0.20) + (3.44*0.25) + (3.38*0.10) + (3.46*0.15) = 3.42 (Level 3)
                </div>
              </div>
            </div>
          )}

          {activeTab === 18 && (
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <span className="font-bold text-purple-900 text-sm block mb-1">
                  Dataset 18: NILAI MANAGEMEN RESIKO INDEKS (MRI)
                </span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Atribut: PERIODE PENILAIAN, SKOR, KETERANGAN, TAHUN. Mengukur tingkat kematangan penerapan manajemen risiko di seluruh satuan kerja BP Batam.
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2">
                <div className="text-purple-400 font-bold">// STATUS CAPAIAN INDEKS RISIKO (MRI):</div>
                <div className="bg-slate-800 p-2.5 rounded border border-slate-700 text-emerald-300">
                  Skor MRI: 3.65 / 5.00 | Kategori: Managed (Terkelola) | Target: 3.25
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Tutup Kamus Rumus
          </button>
        </div>
      </div>
    </div>
  );
};
