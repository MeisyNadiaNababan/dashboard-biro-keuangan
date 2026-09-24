import React from 'react';
import { X, Award, FileCode2, BookOpen, CheckCircle2, Calculator } from 'lucide-react';
import { STANDAR_KASN_KONVERSI } from './sdmData';

interface SdmFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  formulaType?: string;
}

export const SdmFormulaModal: React.FC<SdmFormulaModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* MODAL HEADER */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                Kamus Rumus &amp; Metodologi Sistem Merit SDM BP Batam
              </h3>
              <p className="text-xs text-slate-300">
                Standar KASN &amp; Peraturan MenPAN-RB No. 40 Tahun 2018
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-700">
          {/* SECTION 1: RUMUS INDEKS PER ASPEK */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-mono">
                01
              </span>
              <span>Rumus Perhitungan Indeks per Aspek</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs space-y-1.5">
              <div className="text-indigo-800 font-bold">
                INDEKS_ASPEK = NILAI_ASPEK / NILAI_MAKS_ASPEK
              </div>
              <p className="text-[11px] text-slate-600 font-sans">
                Di mana <strong>NILAI_ASPEK</strong> adalah akumulasi skor bukti dukung pemenuhan kriteria kegiatan pada masing-masing aspek dikalikan sub-bobot, dan <strong>NILAI_MAKS_ASPEK</strong> adalah total skor maksimal kriteria aspek tersebut. Rentang indeks bernilai 0.000 s/d 1.000 (atau 0% - 100%).
              </p>
            </div>
          </div>

          {/* SECTION 2: RUMUS INDEKS SISTEM MERIT */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-mono">
                02
              </span>
              <span>Rumus Agregasi Indeks Sistem Merit Nasional</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs space-y-1.5">
              <div className="text-emerald-800 font-bold">
                INDEKS_SISTEM_MERIT = &Sigma; (INDEKS_ASPEK_i &times; BOBOT_ASPEK_i)
              </div>
              <div className="text-slate-600 font-sans text-xs">
                TOTAL_NILAI_MERIT = &Sigma; (NILAI_ASPEK_i) &le; 400.0
              </div>
              <p className="text-[11px] text-slate-600 font-sans">
                Total skor maksimal 8 aspek adalah <strong>400 poin</strong>. Indeks Sistem Merit dihitung dengan membagi total skor dengan 400 (skala 0 - 1.000) atau mengalikan indeks masing-masing aspek dengan bobot persentasenya.
              </p>
            </div>
          </div>

          {/* SECTION 3: 8 ASPEK DAN BOBOT */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-mono">
                03
              </span>
              <span>Rincian 8 Komponen Penilaian &amp; Bobot</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">1. Perencanaan Kebutuhan</span>: Bobot 10% (Maks 40)
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">2. Pengadaan</span>: Bobot 10% (Maks 40)
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">3. Pengembangan Karir</span>: Bobot 30% (Maks 120)
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">4. Promosi dan Mutasi</span>: Bobot 10% (Maks 40)
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">5. Manajemen Kinerja</span>: Bobot 20% (Maks 80)
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">6. Penggajian, Penghargaan, Disiplin</span>: Bobot 10% (Maks 40)
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">7. Perlindungan dan Pelayanan</span>: Bobot 4% (Maks 16)
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">8. Sistem Informasi</span>: Bobot 6% (Maks 24)
              </div>
            </div>
          </div>

          {/* SECTION 4: TABEL KONVERSI KASN */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-mono">
                04
              </span>
              <span>Tabel Standar Kategori Penilaian Sistem Merit &amp; Mutu Pelayanan</span>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 font-bold text-center w-20">Kategori</th>
                    <th className="py-2.5 px-3 font-bold text-center">Nilai</th>
                    <th className="py-2.5 px-3 font-bold text-center">Mutu Pelayanan</th>
                    <th className="py-2.5 px-3 font-bold text-center">Predikat</th>
                    <th className="py-2.5 px-3 font-bold text-left">Implikasi Pengisian JPT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {STANDAR_KASN_KONVERSI.map((row) => (
                    <tr key={row.kategori} className={row.kategori === 'IV' ? 'bg-emerald-50/60 font-semibold' : ''}>
                      <td className="py-2.5 px-3 font-mono font-bold text-center text-slate-900">{row.kategori}</td>
                      <td className="py-2.5 px-3 font-mono text-center font-semibold text-slate-800">{row.nilai}</td>
                      <td className="py-2.5 px-3 font-mono text-center font-semibold text-slate-800">{row.mutuPelayanan}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${row.badgeWarna}`}>
                          {row.predikat}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-xs">{row.konsekuensi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Tutup Penjelasan
          </button>
        </div>
      </div>
    </div>
  );
};
