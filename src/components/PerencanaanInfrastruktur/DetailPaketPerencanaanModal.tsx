import React from 'react';
import {
  X,
  Building2,
  Calendar,
  MapPin,
  Coins,
  CheckCircle2,
  Clock,
  FileText,
  UserCheck,
  AlertCircle,
  Award,
  Sparkles,
  Download,
} from 'lucide-react';
import { PaketPerencanaan } from './types';

interface DetailPaketPerencanaanModalProps {
  paket: PaketPerencanaan | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailPaketPerencanaanModal: React.FC<DetailPaketPerencanaanModalProps> = ({
  paket,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !paket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200 uppercase">
                {paket.kodePaket}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                Dataset No. {paket.datasetNo} - {paket.sektor}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                {paket.statusKesiapan}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {paket.namaKegiatan}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Pagu DED Konsultansi</span>
              <span className="font-extrabold text-slate-900 text-sm">
                Rp {(paket.paguKonsultansi / 1000000000).toFixed(2)} Miliar
              </span>
              <span className="text-[10px] text-slate-500 block">{paket.sumberDana}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Estimasi Nilai Konstruksi</span>
              <span className="font-extrabold text-sky-700 text-sm">
                Rp {(paket.estimasiCapexFisik / 1000000000 >= 1000
                  ? `${(paket.estimasiCapexFisik / 1000000000000).toFixed(2)} Triliun`
                  : `${(paket.estimasiCapexFisik / 1000000000).toFixed(1)} Miliar`)}
              </span>
              <span className="text-[10px] text-slate-500 block">Proyeksi Capex Fisik</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Progres Penyusunan DED</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-extrabold text-slate-900 text-sm">{paket.progresPenyusunanPersen}%</span>
                <span className="text-[10px] font-semibold text-slate-500">
                  ({paket.waktuPelaksanaanBulan} Bulan)
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-sky-600 h-full rounded-full"
                  style={{ width: `${paket.progresPenyusunanPersen}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Indeks Kesiapan (Readiness)</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-extrabold text-emerald-700 text-sm">{paket.readinessScore}/100</span>
              </div>
              <span className="text-[10px] font-medium text-emerald-600">
                {paket.readinessScore >= 90 ? 'Ready for Tender' : 'Under Review'}
              </span>
            </div>
          </div>

          {/* Lokasi & Konsultan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Kawasan / Lokasi</span>
                <p className="font-semibold text-slate-800 text-xs mt-0.5">{paket.lokasiKawasan}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white">
              <UserCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Konsultan Perencana DED</span>
                <p className="font-semibold text-slate-800 text-xs mt-0.5">{paket.konsultanPerencana}</p>
              </div>
            </div>
          </div>

          {/* Ringkasan Desain Teknis */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-sky-600" />
              <span>Deskripsi Lingkup &amp; Spesifikasi Teknis Perencanaan</span>
            </h4>
            <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 leading-relaxed text-slate-700">
              {paket.ringkasanTeknis}
            </p>
          </div>

          {/* Output Dokumen Produk Perencanaan */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Daftar Deliverables Dokumen Produk DED</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {paket.outputDokumen.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100 text-slate-700 text-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rekomendasi Tindak Lanjut Atasan */}
          <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-sky-700" />
              <h5 className="font-bold text-sky-900 text-xs">Catatan &amp; Arahan Direktur Perencanaan:</h5>
            </div>
            <p className="text-xs text-sky-950 font-medium leading-relaxed">
              {paket.rekomendasiAtasan}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            Dokumen terintegrasi dengan Portal Satu Data BP Batam (Dataset No. {paket.datasetNo})
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-colors"
          >
            Tutup Lembar Detail
          </button>
        </div>
      </div>
    </div>
  );
};
