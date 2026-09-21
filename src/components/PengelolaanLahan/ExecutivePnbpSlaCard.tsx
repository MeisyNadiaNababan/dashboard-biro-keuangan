import React from 'react';
import {
  DollarSign,
  Clock,
  ShieldAlert,
  TrendingUp,
  Award,
  CheckCircle2,
  Info,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { TARGET_PENERIMAAN_PNBP_LAHAN, ALOKASI_LAHAN_INVESTASI_DATA } from './lahanData';

interface ExecutivePnbpSlaCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const ExecutivePnbpSlaCard: React.FC<ExecutivePnbpSlaCardProps> = ({
  onOpenFormulaModal,
}) => {
  const pnbp = TARGET_PENERIMAAN_PNBP_LAHAN;
  const alokasi = ALOKASI_LAHAN_INVESTASI_DATA;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-3.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Monitoring Eksekutif: Target PNBP UWT &amp; Kecepatan SLA Layanan
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                DATASET #12
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Pengawasan pendapatan negara bukan pajak (UWT 30 tahun) &amp; standar waktu penyelesaian izin lahan
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenFormulaModal && onOpenFormulaModal('lahan_target_pnbp')}
          className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
          title="Penjelasan Formula Target PNBP"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Grid Content: 2 Columns (Financial & Operational SLA) */}
      <div className="p-3.5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Col 1: Realisasi Target PNBP UWT Pertanahan */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                Target PNBP Lahan (UWT &amp; Faktur)
              </span>
              <span className="text-xs font-black text-amber-700">
                {pnbp.capaianPersen}% Capaian
              </span>
            </div>

            {/* Visual Gauge Bar */}
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${pnbp.capaianPersen}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-slate-500">
                Realisasi:{' '}
                <strong className="text-emerald-700 font-mono">
                  Rp {(pnbp.realisasiPnbpRp / 1000000000).toFixed(1)} Miliar
                </strong>
              </span>
              <span className="text-slate-500">
                Pagu Target:{' '}
                <strong className="text-slate-800 font-mono">
                  Rp {(pnbp.targetPnbpRp / 1000000000).toFixed(0)} Miliar
                </strong>
              </span>
            </div>

            {/* Breakdown Mini Bars */}
            <div className="space-y-1.5">
              {pnbp.sumberPenerimaan.map((s, idx) => (
                <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200 text-[11px] shadow-2xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-700 font-medium truncate">{s.jenis}</span>
                    <span className="text-emerald-700 font-bold font-mono">{s.capaianPersen}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-600 h-full rounded-full"
                      style={{ width: `${s.capaianPersen}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <span>Realisasi: Rp {s.realisasiMiliar} M</span>
                    <span>Target: Rp {s.targetMiliar} M</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: SLA & Manajemen Kecepatan Layanan Pertanahan */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                Service Level Agreement (SLA) &amp; Kecepatan Izin
              </span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {pnbp.kepatuhanSlaPersen}% Tepat Waktu
              </span>
            </div>

            {/* SLA Big Metric Box */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Rata-Rata Waktu Proses</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black text-sky-700">{pnbp.rataRataSlaHari}</span>
                  <span className="text-xs font-semibold text-slate-700">Hari Kerja</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-medium">
                  ⚡ 0,8 Hari Lebih Cepat dari Standar
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Standar Maksimal (SOP)</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black text-slate-900">{pnbp.targetSlaHari}</span>
                  <span className="text-xs font-semibold text-slate-500">Hari Kerja</span>
                </div>
                <span className="text-[10px] text-slate-500">Perka BP Batam No. 3</span>
              </div>
            </div>

            {/* Strategic Notes for Leadership */}
            <div className="bg-sky-50/70 border border-sky-200 rounded-lg p-2.5 text-xs text-slate-700 space-y-1.5">
              <div className="font-bold text-sky-900 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-sky-700" />
                <span>Rekomendasi Strategis Pimpinan (Actionable Insights)</span>
              </div>
              <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1 leading-relaxed">
                <li>
                  <strong>Percepatan Alokasi Lahan KEK:</strong> Prioritaskan permohonan lahan Data Center di Nongsa dan Eco-City Rempang untuk akselerasi investasi Rp 34,85 T.
                </li>
                <li>
                  <strong>Digitalisasi Integrasi BPN - BP Batam:</strong> 100% penerbitan SKPT/SPPT telah tersinkronisasi dengan portal Land Management System (LMS) online.
                </li>
                <li>
                  <strong>Optimalisasi Penagihan UWT:</strong> Penerimaan perpanjangan UWT mencapai 85,14% dengan tingkat kepatuhan tinggi dari korporasi (PT).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Ringkasan Kinerja Eksekutif:</strong> Menggabungkan stabilitas pendapatan PNBP (Dataset #12) dan SLA kepuasan investor tanpa menambah beban visual berlebih.
        </span>
        <span className="text-slate-600 font-medium">Biro Keuangan &amp; Dit. Pengelolaan Lahan</span>
      </div>
    </div>
  );
};
