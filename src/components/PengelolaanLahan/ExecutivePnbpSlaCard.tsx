import React from 'react';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Building2,
  Layers,
  ArrowUpRight,
  Zap,
  Info,
  Calendar,
  FileCheck2,
  Compass,
} from 'lucide-react';
import { ALOKASI_LAHAN_INVESTASI_DATA } from './lahanData';

interface ExecutivePnbpSlaCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const ExecutivePnbpSlaCard: React.FC<ExecutivePnbpSlaCardProps> = ({
  onOpenFormulaModal,
}) => {
  const alokasi = ALOKASI_LAHAN_INVESTASI_DATA;

  // SLA and Service Speed Data
  const slaData = {
    rataRataHari: 2.4,
    standarSopHari: 4.0,
    kepatuhanPersen: 96.2,
    selisihHari: 1.6,
    kategoriLayanan: [
      {
        nama: 'Penerbitan PL & Alokasi Lahan Baru',
        rataHari: 3.2,
        standarHari: 5.0,
        tepatWaktuPersen: 95.8,
        totalBerkas: 384,
      },
      {
        nama: 'Pecah Penetapan Lokasi (PL) & Revisi PL',
        rataHari: 2.1,
        standarHari: 3.0,
        tepatWaktuPersen: 98.2,
        totalBerkas: 246,
      },
      {
        nama: 'Perpanjangan Hak & Peralihan Hak Atas Tanah',
        rataHari: 2.8,
        standarHari: 4.0,
        tepatWaktuPersen: 94.6,
        totalBerkas: 520,
      },
      {
        nama: 'Faktur Peruntukan & Dokumen Rekomendasi',
        rataHari: 1.5,
        standarHari: 2.0,
        tepatWaktuPersen: 97.4,
        totalBerkas: 312,
      },
    ],
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-3.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-2xs">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Alokasi Investasi (#14) &amp; Service Level Agreement (SLA) Kecepatan Izin
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200">
                DATASET #14 &amp; SLA
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Evaluasi kinerja alokasi lahan investasi riil dan akselerasi waktu penerbitan dokumen perizinan pertanahan
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenFormulaModal?.('lahan_luas_alokasi')}
          className="p-1.5 text-slate-400 hover:text-blue-700 transition-colors cursor-pointer"
          title="Lihat Formula & Naskah Satu Data"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Grid Content: 2 Columns (Col 1: Alokasi Investasi #14 | Col 2: SLA & Kecepatan Izin) */}
      <div className="p-3.5 sm:p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* =================================================================== */}
        {/* COL 1: ALOKASI INVESTASI (DATASET #14)                             */}
        {/* =================================================================== */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-600" />
                Alokasi Lahan untuk Investasi (DS #14)
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                {alokasi.rasioDisetujuiPersen}% Disetujui
              </span>
            </div>

            {/* Metric Summary */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-medium block">Luas Teralokasi</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-black font-mono text-blue-700">{alokasi.totalLuasAlokasiHa}</span>
                  <span className="text-[10px] font-bold text-slate-600">Ha</span>
                </div>
                <span className="text-[9.5px] text-emerald-600 font-medium block mt-0.5">
                  Target: 200 Ha (124,25%)
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-medium block">Persetujuan</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-black font-mono text-slate-900">{alokasi.permohonanDisetujui}</span>
                  <span className="text-[10px] font-bold text-slate-500">/{alokasi.totalPermohonanMasuk}</span>
                </div>
                <span className="text-[9.5px] text-slate-500 font-medium block mt-0.5">
                  72 Ditolak / Revisi
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-medium block">Nilai Komitmen</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-black font-mono text-emerald-700">{alokasi.potensiNilaiInvestasiRpTriliun}</span>
                  <span className="text-[10px] font-bold text-slate-600">Triliun</span>
                </div>
                <span className="text-[9.5px] text-slate-500 font-medium block mt-0.5">
                  Potensi PMA/PMDN
                </span>
              </div>
            </div>

            {/* Sektor Breakdown List */}
            <div className="space-y-1.5 pt-1.5">
              <span className="text-[10.5px] font-bold text-slate-700 block">
                Distribusi Sektor Alokasi Investasi:
              </span>
              <div className="space-y-1.5">
                {alokasi.sektorBreakdown.map((s, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200 text-[10.5px] shadow-2xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-800 font-semibold truncate max-w-[200px]" title={s.sektor}>
                        {s.sektor}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-blue-700">{s.luasHa} Ha</span>
                        <span className="text-[9.5px] font-mono text-slate-500">({s.persentase}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${s.persentase}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1 font-mono">
                      <span>{s.persil} Persil Siap Bangun</span>
                      <span>Potensi UWT: Rp {s.pnbpUwtRpMiliar.toFixed(1)} Miliar</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* COL 2: SERVICE LEVEL AGREEMENT (SLA) & KECEPATAN IZIN               */}
        {/* =================================================================== */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-600" />
                Service Level Agreement (SLA) &amp; Kecepatan Izin
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {slaData.kepatuhanPersen}% Tepat Waktu
              </span>
            </div>

            {/* SLA Big Summary Cards */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-medium block">Rata-Rata Waktu Proses</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black font-mono text-sky-700">{slaData.rataRataHari}</span>
                  <span className="text-xs font-bold text-slate-600">Hari Kerja</span>
                </div>
                <span className="text-[9.5px] text-emerald-700 font-bold block mt-0.5 flex items-center gap-0.5">
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  {slaData.selisihHari} Hari Lebih Cepat dari Standar
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-medium block">Standar Maksimal (SOP)</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black font-mono text-slate-900">{slaData.standarSopHari}</span>
                  <span className="text-xs font-bold text-slate-600">Hari Kerja</span>
                </div>
                <span className="text-[9.5px] text-slate-500 font-medium block mt-0.5">
                  Perka BP Batam No. 3 (SLA Maks.)
                </span>
              </div>
            </div>

            {/* Breakdown per Layanan Kecepatan */}
            <div className="space-y-1.5 pt-1.5">
              <span className="text-[10.5px] font-bold text-slate-700 block">
                Pemantauan SLA Kecepatan Per Layanan Izin:
              </span>
              <div className="space-y-1.5">
                {slaData.kategoriLayanan.map((layanan, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200 text-[10.5px] shadow-2xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-800 font-semibold truncate max-w-[210px]" title={layanan.nama}>
                        {layanan.nama}
                      </span>
                      <span className="font-mono font-bold text-emerald-700">
                        {layanan.tepatWaktuPersen}% Sesuai SLA
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-sky-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${layanan.tepatWaktuPersen}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-slate-500 mt-1 font-mono">
                      <span>Rata-rata: <strong className="text-sky-800">{layanan.rataHari} hari</strong> (SOP: {layanan.standarHari} hari)</span>
                      <span>{layanan.totalBerkas} Berkas Selesai</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Insight */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span>Integrasi Alokasi Investasi Lahan 485,02 Ha dengan percepatan SLA rata-rata 2,4 hari kerja online LMS</span>
        </div>
        <span className="font-mono text-slate-600 font-semibold">Direktorat Pengelolaan Lahan</span>
      </div>
    </div>
  );
};
