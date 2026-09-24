import React from 'react';
import {
  FileText,
  Calendar,
  Building2,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Briefcase,
  DollarSign
} from 'lucide-react';
import {
  DOKUMEN_PERKIN_KEPALA,
  PROGRAM_ANGGARAN_PERKIN,
  TOTAL_PAGU_ANGGARAN_PERKIN,
  EMPAT_IKS_KEPALA_BP
} from './kepalaBpData';

interface KepalaBpBannerProps {
  onOpenDocModal?: () => void;
  onOpenManualModal?: () => void;
}

export const KepalaBpBanner: React.FC<KepalaBpBannerProps> = ({
  onOpenDocModal,
  onOpenManualModal,
}) => {
  const totalRealisasiAnggaran = PROGRAM_ANGGARAN_PERKIN.reduce(
    (acc, cur) => acc + cur.realisasiAnggaran,
    0
  );
  const totalPersenSerapan = ((totalRealisasiAnggaran / TOTAL_PAGU_ANGGARAN_PERKIN) * 100).toFixed(1);

  return (
    <div className="bg-gradient-to-br from-[#0B1728] via-[#10243E] to-[#1E3A8A] text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-blue-900/50 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar: Official Document Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-blue-800/60 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-900 flex items-center justify-center font-black shadow-md shrink-0">
            <Award className="w-6 h-6 text-amber-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
                Dokumen Resmi Kepala BP Batam
              </span>
              <span className="text-[11px] font-mono text-blue-200 hidden sm:inline">
                Nomor: {DOKUMEN_PERKIN_KEPALA.nomor}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
              PERJANJIAN KINERJA TAHUN 2026
            </h1>
            <p className="text-xs text-blue-200/90 font-medium">
              Badan Pengusahaan Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenDocModal && (
            <button
              onClick={onOpenDocModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold backdrop-blur-xs border border-white/20 transition-all cursor-pointer shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-sky-300" />
              <span>Naskah Dinas Perkin (.doc)</span>
            </button>
          )}
          {onOpenManualModal && (
            <button
              onClick={onOpenManualModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              <Award className="w-3.5 h-3.5 text-amber-950" />
              <span>Manual 4 IKS</span>
            </button>
          )}
        </div>
      </div>

      {/* Middle Bar: Signatory & Commitment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 py-4 border-b border-blue-800/60 relative z-10">
        {/* Signatory Profile */}
        <div className="lg:col-span-4 flex items-start gap-3 bg-white/5 rounded-xl p-3.5 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-blue-600/60 border border-blue-400 flex items-center justify-center text-white shrink-0 font-bold text-sm">
            AA
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block">
              Pejabat Penandatangan
            </span>
            <div className="text-sm font-bold text-white truncate">
              {DOKUMEN_PERKIN_KEPALA.namaKepala}
            </div>
            <div className="text-[11px] text-blue-200 line-clamp-1">
              {DOKUMEN_PERKIN_KEPALA.jabatan}
            </div>
            <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-300 font-mono">
              <Calendar className="w-3 h-3 text-sky-400" />
              <span>Ditetapkan: {DOKUMEN_PERKIN_KEPALA.tanggalPenetapan}</span>
            </div>
          </div>
        </div>

        {/* Commitment Statement */}
        <div className="lg:col-span-8 bg-blue-950/40 rounded-xl p-3.5 border border-blue-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-bold text-emerald-300">
                Pernyataan Komitmen Kinerja Berorientasi Hasil
              </span>
            </div>
            <p className="text-xs text-blue-100/90 leading-relaxed italic">
              &quot;{DOKUMEN_PERKIN_KEPALA.pernyataan}&quot;
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-blue-900/50 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
            <span>Prinsip: Efektif, Efisien, Transparan &amp; Akuntabel</span>
            <span className="text-amber-300 font-semibold font-mono">
              Target Jangka Menengah Renstra 2025 - 2029
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: 2 Core Programs & Budget Allocation (Halaman 2 PDF) */}
      <div className="pt-4 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Pagu Anggaran 2 Program Strategis (Halaman 2 Perkin):
            </span>
          </div>
          <div className="text-xs text-slate-200 font-mono">
            Total Pagu:{' '}
            <strong className="text-white text-sm">
              Rp {(TOTAL_PAGU_ANGGARAN_PERKIN / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 3 })} Triliun
            </strong>{' '}
            <span className="text-emerald-400 font-bold">({totalPersenSerapan}% Terealisasi)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {PROGRAM_ANGGARAN_PERKIN.map((prog) => (
            <div
              key={prog.id}
              className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-3.5 border border-white/10"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-sky-300">
                    PROGRAM 0{prog.id}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {prog.namaProgram}
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shrink-0">
                  {prog.persenSerapan}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${prog.persenSerapan}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>
                  Pagu:{' '}
                  <strong className="text-white font-mono">
                    Rp {(prog.paguAnggaran / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 3 })} T
                  </strong>
                </span>
                <span>
                  Realisasi:{' '}
                  <strong className="text-emerald-300 font-mono">
                    Rp {(prog.realisasiAnggaran / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 3 })} T
                  </strong>
                </span>
              </div>

              <div className="mt-1.5 text-[10px] text-blue-200/70 truncate">
                Satker: {prog.penanggungJawab}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
