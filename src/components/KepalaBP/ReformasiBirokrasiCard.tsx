import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  BarChart3,
  HelpCircle,
  Info,
  Layers,
  FileCheck2,
  TrendingUp,
  Target
} from 'lucide-react';
import {
  STANDAR_REFORMASI_BIROKRASI,
  AREA_REFORMASI_BIROKRASI_DATA,
  EMPAT_IKS_KEPALA_BP
} from './kepalaBpData';

interface ReformasiBirokrasiCardProps {
  onOpenManualModal?: () => void;
}

export const ReformasiBirokrasiCard: React.FC<ReformasiBirokrasiCardProps> = ({
  onOpenManualModal,
}) => {
  const [activeTab, setActiveTab] = useState<'8area' | 'standar_se' | 'tematik'>('8area');
  const iks4 = EMPAT_IKS_KEPALA_BP[3];

  const totalNilaiRB = AREA_REFORMASI_BIROKRASI_DATA.reduce(
    (acc, cur) => acc + cur.capaianNilai,
    0
  ).toFixed(2);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* HEADER */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-amber-50/50 via-slate-50 to-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                  IKS-04 KEPALA BP BATAM
                </span>
                <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                  Sumber: BOKMR &amp; SE MenPAN-RB No. 6 Tahun 2025
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Indeks Reformasi Birokrasi (Target: 80 / Predikat BB Sangat Baik)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10.5px] uppercase font-bold text-slate-500 block">
                Target: 80 (BB) | Capaian Berjalan
              </span>
              <span className="text-base font-black font-mono text-emerald-700">
                {totalNilaiRB}{' '}
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Predikat A (Memuaskan)
                </span>
              </span>
            </div>
            {onOpenManualModal && (
              <button
                onClick={onOpenManualModal}
                className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold border border-amber-200 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Manual SE MenPAN</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="mt-4 flex items-center gap-2 border-t border-slate-200/60 pt-2">
          <button
            onClick={() => setActiveTab('8area')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === '8area'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            8 Area Perubahan RB General (Skor {totalNilaiRB})
          </button>
          <button
            onClick={() => setActiveTab('standar_se')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'standar_se'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tabel Standar Kategori SE MenPAN-RB (Hal 6)
          </button>
          <button
            onClick={() => setActiveTab('tematik')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'tematik'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            RB Tematik (Investasi, SPBE, Kemiskinan, Inflasi)
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* VIEW 1: 8 AREA PERUBAHAN */}
        {activeTab === '8area' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {AREA_REFORMASI_BIROKRASI_DATA.map((item) => {
                const persen = ((item.capaianNilai / item.bobot) * 100).toFixed(0);

                return (
                  <div
                    key={item.kode}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-amber-400 transition-colors shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        {item.kode}
                      </span>
                      <span className="font-bold font-mono text-slate-700">
                        Bobot: {item.bobot} Poin
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-slate-900 leading-snug min-h-[34px] mb-2">
                      {item.aspek}
                    </h5>

                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-xl font-black font-mono text-slate-900">
                        {item.capaianNilai.toFixed(1)}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 font-mono">
                        {persen}% (Predikat {item.predikat.split(' ')[0]})
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                      <div
                        style={{ width: `${persen}%` }}
                        className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full"
                      />
                    </div>

                    <p className="text-[10.5px] text-slate-500 leading-snug line-clamp-2">
                      {item.fokusImplementasi}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: STANDAR KATEGORI SE MENPAN-RB (PERSIS HALAMAN 6 PDF) */}
        {activeTab === 'standar_se' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-slate-700">
              <strong>Dasar Regulasi:</strong> Surat Edaran Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi Nomor 6 Tahun 2025 tentang Pelaksanaan Reformasi Birokrasi pada Periode Transisi Tahun 2025/2026. Target Perjanjian Kinerja Kepala BP Batam adalah <strong>Skor 80 (Predikat BB / Sangat Baik)</strong>.
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-bold text-center w-24">Kategori</th>
                    <th className="py-2.5 px-4 font-bold text-center w-40">Nilai / Angka</th>
                    <th className="py-2.5 px-4 font-bold">Predikat Kinerja RB</th>
                    <th className="py-2.5 px-4 font-bold text-center w-36">Status Perkin 2026</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {STANDAR_REFORMASI_BIROKRASI.map((row) => (
                    <tr
                      key={row.kategori}
                      className={
                        row.kategori === 'BB'
                          ? 'bg-blue-50/70 font-bold'
                          : row.kategori === 'A'
                          ? 'bg-emerald-50/50'
                          : 'hover:bg-slate-50'
                      }
                    >
                      <td className="py-2.5 px-4 text-center">
                        <span className="font-mono font-black text-sm px-2 py-0.5 rounded bg-slate-100 text-slate-900 border border-slate-200">
                          {row.kategori}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono font-bold text-slate-800">
                        {row.nilai}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900">
                        {row.predikat}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        {row.kategori === 'BB' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                            <Target className="w-3 h-3 text-blue-700" />
                            Target Perkin 80
                          </span>
                        ) : row.kategori === 'A' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            Capaian Ril 81,35
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono text-[11px]">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 3: RB TEMATIK */}
        {activeTab === 'tematik' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
                1. RB Tematik Peningkatan Investasi di Kawasan Batam
              </span>
              <div className="text-xl font-black text-slate-900 mb-2">
                Fasilitasi Realisasi Rp 70 T
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Akselerasi penerbitan perizinan berusaha OSS RBA, integrasi IBOSS PTSP, pembentukan Satgas Pengawalan Investasi, dan kemudahan fasilitas kepabeanan di Kawasan FTZ dan KEK.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                2. RB Tematik Digitalisasi Administrasi (SPBE)
              </span>
              <div className="text-xl font-black text-slate-900 mb-2">
                Satu Data &amp; Integrasi Cloud
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penyatuan ratusan sistem informasi internal ke Satu Data BP Batam, sertifikasi ISO 27001 Data Center, serta otomatisasi layanan publik tanpa tatap muka untuk mencegah pungutan liar.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                3. RB Tematik Dampak Pengentasan Kemiskinan
              </span>
              <div className="text-xl font-black text-slate-900 mb-2">
                24.150 Tenaga Kerja Terserap
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penciptaan lapangan kerja industri bernilai tambah tinggi, pelatihan keahlian vokasi lokal (Politeknik Negeri Batam &amp; BLK), serta pemberdayaan UMKM pemasok rantai pasok industri.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                4. RB Tematik Pengendalian Inflasi Daerah
              </span>
              <div className="text-xl font-black text-slate-900 mb-2">
                Kuota Sembako Bebas Bea Masuk
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pemberian kuota induk bahan pangan pokok bebas Bea Masuk, PPN, dan PPh impor oleh Direktorat Lalu Lintas Barang untuk menjaga stabilitas harga bahan makanan di Kepulauan Riau.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Evaluasi Reformasi Birokrasi dikoordinasikan oleh BOKMR bersama Tim Evaluasi Nasional KemenPAN-RB.
        </span>
        <span className="font-mono text-[11px] text-emerald-800 font-bold">
          Target IKS-4: 80 / BB (Tercapai Skor 81,35)
        </span>
      </div>
    </div>
  );
};
