import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  PieChart,
  Layers,
  Sparkles,
  Zap,
  ShieldAlert,
  FileCheck2,
  Compass,
  Coins,
} from 'lucide-react';
import {
  STAGE_GATE_FUNNEL_DATA,
  UTILISASI_DOKUMEN_SUMMARY,
  EXECUTIVE_EARLY_WARNING_ITEMS,
  KPI_SEKTOR_LIST,
} from './perencanaanData';

export const PerencanaanExecutiveInsights: React.FC = () => {
  const [insightTab, setInsightTab] = useState<'funnel' | 'utilisasi' | 'capex' | 'early-warning'>('funnel');

  const totalCapexKeseluruhanMiliar = KPI_SEKTOR_LIST.reduce(
    (acc, item) => acc + item.totalEstimasiCapexFisik / 1000000000,
    0
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 text-base">
                  Monitoring Strategis Pimpinan (Executive Planning Analytics)
                </h3>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                  Decision Support
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Visualisasi kesiapan Readiness Criteria DED, rasio serah terima lelang fisik, dan mitigasi hambatan teknis
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs self-start sm:self-auto overflow-x-auto">
          <button
            onClick={() => setInsightTab('funnel')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap ${
              insightTab === 'funnel'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pipeline Kesiapan (Stage-Gate)
          </button>
          <button
            onClick={() => setInsightTab('utilisasi')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap ${
              insightTab === 'utilisasi'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Utilisasi Lelang Fisik (66.7%)
          </button>
          <button
            onClick={() => setInsightTab('capex')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap ${
              insightTab === 'capex'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Proyeksi Belanja Konstruksi
          </button>
          <button
            onClick={() => setInsightTab('early-warning')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              insightTab === 'early-warning'
                ? 'bg-white text-rose-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Bottleneck &amp; Mitigasi</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: STAGE-GATE / READINESS CRITERIA FUNNEL */}
      {insightTab === 'funnel' && (
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <h4 className="font-semibold text-slate-800 text-sm">
                Distribusi Tahapan Kesiapan Dokumen DED (Readiness Pipeline)
              </h4>
              <p className="text-[11px] text-slate-500">
                Memastikan setiap paket perencanaan melalui gerbang kualitas standar (FS ➔ DED &amp; RAB ➔ Asistensi ➔ Siap Lelang)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-200">
                21 Paket (48.8%) Telah 100% Siap Lelang
              </span>
            </div>
          </div>

          {/* Graphical Pipeline Progress Track */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            {STAGE_GATE_FUNNEL_DATA.map((item, idx) => (
              <div
                key={item.stage}
                className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 relative overflow-hidden flex flex-col justify-between"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400">TAHAP {idx + 1}</span>
                    <span className="font-bold text-slate-700 text-[11px]">{item.percentage}%</span>
                  </div>
                  <h5 className="font-bold text-slate-800 text-xs mb-1 line-clamp-1">{item.stage}</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{item.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between text-xs">
                  <div>
                    <span className="text-xl font-extrabold text-slate-900">{item.count}</span>
                    <span className="text-[11px] text-slate-500 ml-1">Paket</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700">
                    Est. Rp {item.totalCapexMiliar.toLocaleString('id-ID')} M
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Executive Directive Note */}
          <div className="p-3 bg-sky-50/80 rounded-xl border border-sky-200 text-xs text-sky-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Instruksi Direktur Perencanaan:</strong> 7 paket yang berada pada tahap Review &amp; Asistensi Teknis ditargetkan menyelesaikan telaah HPS dan BoQ maksimal akhir bulan ini agar siap diserahterimakan ke Direktorat Pembangunan Infrastruktur sebelum tender lelang dibuka.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TINGKAT UTILISASI & ADOPSI KE LELANG FISIK */}
      {insightTab === 'utilisasi' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Score Gauge */}
            <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-wide">
                  Handover to Construction
                </span>
                <h4 className="text-base font-bold mt-2">
                  Tingkat Utilisasi Hasil DED
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Persentase dokumen perencanaan selesai yang langsung dieksekusi menjadi tender lelang fisik nyata.
                </p>
              </div>

              <div className="my-5 text-center">
                <span className="text-5xl font-black text-emerald-400 tracking-tight">
                  {UTILISASI_DOKUMEN_SUMMARY.utilisasiFisikPersen}%
                </span>
                <span className="text-xs text-slate-300 block mt-1 font-medium">
                  {UTILISASI_DOKUMEN_SUMMARY.telahMasukLelangFisik} dari {UTILISASI_DOKUMEN_SUMMARY.totalDokumenTuntas} Dokumen Selesai
                </span>
              </div>

              <div className="text-[11px] text-slate-300 p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                Nilai Fisik Tertenderkan: <strong className="text-white">Rp {UTILISASI_DOKUMEN_SUMMARY.totalCapexTelahDitenderkanMiliar.toFixed(1)} Miliar</strong>
              </div>
            </div>

            {/* Right Detailed Breakdown */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">
                  Realisasi Serah Terima Dokumen ke Direktorat Pelaksana (Satker Fisik)
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Mencegah inefisiensi anggaran dan risiko dokumen perencanaan kadaluarsa (*obsolete design*)
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Telah Masuk Lelang Konstruksi Fisik TA 2025
                      </span>
                      <span className="font-bold text-emerald-700">14 Dokumen (66.7%)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mb-1.5">
                      Dokumen DED telah diserahkan dan diproses lelang oleh Dit. Pembangunan (termasuk Dermaga Batu Ampar, Drainase Sei Nayon, Arteri Simpang Kabil).
                    </p>
                    <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: '66.7%' }} />
                    </div>
                  </div>

                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-sky-900 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-sky-600" />
                        Dianggarkan untuk Alokasi Belanja Fisik Renja TA 2026
                      </span>
                      <span className="font-bold text-sky-700">7 Dokumen (33.3%)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mb-1.5">
                      DED telah rampung dan siap masuk usulan RKA/DIPA TA 2026 (Flyover KDA, Rusunawa Batamindo, Apron Kargo Hang Nadim).
                    </p>
                    <div className="w-full bg-sky-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-600 h-full rounded-full" style={{ width: '33.3%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                💡 <strong className="text-slate-800">Evaluasi Efektivitas:</strong> Angka 66,7% menunjukkan efisiensi perencanaan BP Batam berada di kategori sangat baik (di atas benchmark nasional 50%). Dokumen teknis terpakai optimal untuk realisasi fisik.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: PROYEKSI CAPEX BELANJA MODAL KONSTRUKSI HASIL DED */}
      {insightTab === 'capex' && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="font-semibold text-slate-800 text-sm">
                Proyeksi Belanja Modal Konstruksi (Capex Pipeline) Berdasarkan Sektor
              </h4>
              <p className="text-[11px] text-slate-500">
                Nilai estimasi biaya konstruksi fisik hasil perhitungan Rencana Anggaran Biaya (RAB) konsultan DED
              </p>
            </div>
            <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
              Total Capex Terencana: Rp {(totalCapexKeseluruhanMiliar / 1000).toFixed(2)} Triliun
            </span>
          </div>

          {/* Visual Sector Bars */}
          <div className="space-y-2.5">
            {KPI_SEKTOR_LIST.map((item) => {
              const capexMiliar = item.totalEstimasiCapexFisik / 1000000000;
              const persentase = (capexMiliar / totalCapexKeseluruhanMiliar) * 100;

              return (
                <div key={item.sektor} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex flex-wrap items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{item.sektor}</span>
                      <span className="text-[10px] text-slate-500">({item.totalPaket} Paket Perencanaan)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        Rp {capexMiliar >= 1000 ? `${(capexMiliar / 1000).toFixed(2)} Triliun` : `${capexMiliar.toFixed(0)} Miliar`}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">({persentase.toFixed(1)}%)</span>
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(persentase, 2)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span>Pagu Konsultansi DED: Rp {(item.totalPaguDED / 1000000000).toFixed(2)} M</span>
                    <span>Leverage Nilai Proyek: {(item.totalEstimasiCapexFisik / item.totalPaguDED).toFixed(0)}x</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: EARLY WARNING & BOTTLENECK RESOLUTION */}
      {insightTab === 'early-warning' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-slate-800 text-sm">
                Matriks Hambatan Teknis Perencanaan &amp; Rekomendasi Instruksi Pimpinan
              </h4>
              <p className="text-[11px] text-slate-500">
                Peringatan dini faktor non-teknis (Amdal, persetujuan lintas kementerian, keselarasan tata ruang)
              </p>
            </div>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>3 Isu Perlu Tindak Lanjut Direktur</span>
            </span>
          </div>

          <div className="space-y-3">
            {EXECUTIVE_EARLY_WARNING_ITEMS.map((ew) => (
              <div
                key={ew.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {ew.sektor}
                    </span>
                    <h5 className="font-bold text-slate-800 text-xs sm:text-sm">{ew.isu}</h5>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      ew.tingkatRisiko === 'Tinggi'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    Risiko: {ew.tingkatRisiko}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                  <span className="font-medium text-slate-700">Dampak Keterlambatan: </span>
                  {ew.dampak}
                </p>

                <div className="p-2.5 bg-sky-50/70 rounded-lg border border-sky-100 text-xs text-sky-900">
                  <strong className="font-semibold text-sky-950">Arahan Rekomendasi Pimpinan: </strong>
                  {ew.instruksiPimpinan}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
