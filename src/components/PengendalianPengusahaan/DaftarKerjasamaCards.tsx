import React, { useState } from 'react';
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp,
  Coins,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { MitraKerjasama } from './types';

interface DaftarKerjasamaCardsProps {
  mitraList: MitraKerjasama[];
}

export const DaftarKerjasamaCards: React.FC<DaftarKerjasamaCardsProps> = ({ mitraList }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getKepatuhanBadge = (status: string) => {
    switch (status) {
      case 'Sangat Patuh':
        return 'bg-emerald-50 text-emerald-700 border-emerald-300';
      case 'Patuh Bersyarat':
        return 'bg-amber-50 text-amber-700 border-amber-300';
      case 'Pengawasan Khusus':
        return 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-300';
    }
  };

  const getTindakLanjutBadge = (status: string) => {
    switch (status) {
      case 'Selesai Ditindaklanjuti':
        return 'bg-teal-50 text-teal-700 border-teal-300';
      case 'Dalam Proses Amandemen':
        return 'bg-sky-50 text-sky-700 border-sky-300';
      case 'Menunggu Verifikasi Mitra':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'Keterlambatan Komitmen':
        return 'bg-rose-50 text-rose-700 border-rose-300';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-300';
    }
  };

  if (mitraList.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
          <Briefcase className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-slate-800">Tidak Ada Data Kontrak Sesuai Filter</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Silakan sesuaikan kembali kriteria filter tahun, sektor badan usaha, skema kemitraan, atau kata kunci pencarian Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-sky-700" />
          <h3 className="text-sm font-bold text-slate-800">
            Daftar Kontrak Kemitraan Strategis &amp; Status Pengendalian
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {mitraList.length} Kontrak Ditampilkan
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {mitraList.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shadow-2xs transition-all"
            >
              {/* Header Card */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold border border-slate-200">
                      {item.nomorPks}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      {item.badanUsahaTerkait}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                      Skema: {item.skemaKerjasama}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.judulPerjanjian}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-700">{item.namaMitra}</span>
                    <span className="text-slate-300">•</span>
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono text-[11px]">
                      Periode: {item.tahunMulai} - {item.tahunBerakhir}
                    </span>
                  </div>
                </div>

                {/* Right Status Badges & Button */}
                <div className="flex flex-wrap lg:flex-col lg:items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getKepatuhanBadge(
                        item.statusKepatuhan
                      )}`}
                    >
                      {item.statusKepatuhan} ({item.skorKepatuhanOperasional}%)
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getTindakLanjutBadge(
                        item.statusTindakLanjut
                      )}`}
                    >
                      {item.statusTindakLanjut}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="flex items-center gap-1 text-xs text-sky-700 hover:text-sky-900 font-semibold cursor-pointer pt-1"
                  >
                    <span>{isExpanded ? 'Tutup Detail Evaluasi' : 'Buka Detail Evaluasi & Audit'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* 3 Metric Pillars: Dataset 3 (% Pengendalian), Dataset 4 (% Tindak Lanjut), Nilai Finansial */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                {/* Pillar 1: Indikator DS #3 Pengendalian */}
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                    DS #3: Kepatuhan Operasional
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-extrabold text-blue-800 font-mono">
                      {item.skorKepatuhanOperasional}%
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ({item.jumlahAuditEvaluasi}x Audit Terlaksana)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.skorKepatuhanOperasional}%` }}
                    />
                  </div>
                </div>

                {/* Pillar 2: Indikator DS #4 Tindak Lanjut Perbaikan */}
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                    DS #4: Tindak Lanjut Perbaikan
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-extrabold text-teal-700 font-mono">
                      {item.persentaseTindakLanjut.toFixed(1)}%
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ({item.jumlahRekomendasiSelesai}/{item.jumlahRekomendasiPerbaikan} Rekomendasi)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-teal-600 rounded-full"
                      style={{ width: `${item.persentaseTindakLanjut}%` }}
                    />
                  </div>
                </div>

                {/* Pillar 3: Finansial & Bagi Hasil */}
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                    Finansial: Realisasi Bagi Hasil
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-base font-extrabold text-slate-900 font-mono">
                      Rp {item.realisasiSharingRevenueTahunan.toFixed(1)} M
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">
                      (Target: {item.targetSharingRevenueTahunan} M)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Komitmen Investasi Mitra: Rp {item.nilaiInvestasiMitra.toLocaleString('id-ID')} Miliar
                  </span>
                </div>
              </div>

              {/* Collapsible Expanded Details */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-200/80 bg-sky-50/30 -mx-4 -mb-4 p-4 rounded-b-xl space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[11px] font-bold text-slate-700 block mb-1">
                        Status Addendum &amp; Amandemen PKS:
                      </span>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 font-mono text-[11px] text-slate-800">
                        <FileText className="w-3.5 h-3.5 text-sky-600" />
                        <span>{item.statusAddendum}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-2">
                        Jadwal Inspeksi Terakhir:{' '}
                        <strong className="text-slate-700">{item.jadwalInspeksiTerakhir}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-700 block mb-1">
                        Catatan Pengendalian &amp; Kepatuhan Strategis:
                      </span>
                      <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                        {item.catatanStrategis}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
