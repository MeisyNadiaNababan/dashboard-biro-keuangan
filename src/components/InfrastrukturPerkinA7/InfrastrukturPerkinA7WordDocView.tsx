import React from 'react';
import {
  FileText,
  Printer,
  Download,
  Award,
  CheckCircle2,
  Calendar,
  Building2,
  ShieldCheck,
  HardHat,
} from 'lucide-react';
import { PERKIN_A7_METADATA, PERKIN_A7_KPIS, SEKTOR_INFRASTRUKTUR_ALOKASI } from './perkinA7Data';

interface InfrastrukturPerkinA7WordDocViewProps {
  onPrint?: () => void;
}

export const InfrastrukturPerkinA7WordDocView: React.FC<
  InfrastrukturPerkinA7WordDocViewProps
> = ({ onPrint }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-700" />
          <span className="text-xs font-bold text-slate-800">
            DOKUMEN RESMI PERJANJIAN KINERJA (PERKIN A.7 TAHUN 2025)
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800">
            {PERKIN_A7_METADATA.nomorPerkin}
          </span>
        </div>

        <button
          onClick={handlePrint}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak Dokumen Perkin</span>
        </button>
      </div>

      {/* Formal Paper Container */}
      <div className="bg-white border border-slate-300 rounded-2xl shadow-sm p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
        {/* Garuda / Header */}
        <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
          <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <Award className="w-10 h-10 text-slate-800" />
          </div>
          <h2 className="text-sm font-black tracking-widest uppercase text-slate-900">
            BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
          </h2>
          <h3 className="text-base sm:text-lg font-black tracking-wide uppercase text-blue-900">
            PERJANJIAN KINERJA TAHUN 2025
          </h3>
          <p className="text-xs font-mono font-semibold text-slate-600">
            {PERKIN_A7_METADATA.nomorPerkin}
          </p>
        </div>

        {/* Pembukaan */}
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify space-y-3">
          <p>
            Dalam rangka mewujudkan manajemen pemerintahan yang efektif, transparan, dan akuntabel serta berorientasi pada hasil, kami yang bertanda tangan di bawah ini:
          </p>

          <div className="space-y-2 pl-4 border-l-2 border-slate-300">
            <div>
              <div className="font-bold text-slate-900">PIHAK PERTAMA:</div>
              <div>Nama: <strong>{PERKIN_A7_METADATA.pihakPertama.nama}</strong></div>
              <div>Jabatan: {PERKIN_A7_METADATA.pihakPertama.jabatan}</div>
            </div>
            <div>
              <div className="font-bold text-slate-900">PIHAK KEDUA:</div>
              <div>Nama: <strong>{PERKIN_A7_METADATA.pihakKedua.nama}</strong></div>
              <div>Jabatan: {PERKIN_A7_METADATA.pihakKedua.jabatan}</div>
            </div>
          </div>

          <p>
            Pihak Pertama berjanji akan mewujudkan target kinerja yang seharusnya sesuai lampiran perjanjian ini, dalam rangka mencapai target kinerja jangka menengah seperti yang telah ditetapkan dalam dokumen perencanaan. Pihak Kedua akan melakukan supervisi yang diperlukan serta akan melakukan evaluasi terhadap capaian kinerja dari perjanjian ini dan mengambil tindakan yang diperlukan dalam rangka pemberian penghargaan dan sanksi.
          </p>
        </div>

        {/* Tabel Indikator Kinerja Program */}
        <div className="space-y-2">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            LAMPIRAN: INDIKATOR KINERJA PROGRAM (IKP) PERKIN A.7 TAHUN 2025
          </h4>
          <p className="text-xs text-slate-600">
            Sasaran Program: <em>&ldquo;{PERKIN_A7_METADATA.sasaranProgram}&rdquo;</em>
          </p>

          <div className="overflow-x-auto border border-slate-300 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <tr>
                  <th className="py-2.5 px-3 text-center w-12">No</th>
                  <th className="py-2.5 px-3">Indikator Kinerja Program</th>
                  <th className="py-2.5 px-3 text-center">Target</th>
                  <th className="py-2.5 px-3 text-center">Realisasi</th>
                  <th className="py-2.5 px-3 text-center">Capaian</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {PERKIN_A7_KPIS.map((kpi) => (
                  <tr key={kpi.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 text-center font-bold">{kpi.number}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      <div>{kpi.name}</div>
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">{kpi.unitPengampu}</div>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold">{kpi.programTargetLabel}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-blue-700">{kpi.realizationLabel}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-600">
                      {kpi.achievement.toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {kpi.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alokasi Anggaran */}
        <div className="space-y-2">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            ALOKASI ANGGARAN PROGRAM TAHUN 2025
          </h4>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between text-xs gap-3">
            <div>
              <span className="text-slate-500">Total Pagu DIPA Program:</span>
              <div className="font-mono font-black text-slate-900 text-sm">{PERKIN_A7_METADATA.totalAnggaran}</div>
            </div>
            <div>
              <span className="text-slate-500">Realisasi Belanja Kumulatif:</span>
              <div className="font-mono font-black text-emerald-600 text-sm">
                {PERKIN_A7_METADATA.realisasiAnggaran} ({PERKIN_A7_METADATA.persenRealisasiAnggaran}%)
              </div>
            </div>
            <div>
              <span className="text-slate-500">Target Penerimaan PNBP:</span>
              <div className="font-mono font-black text-blue-700 text-sm">
                {PERKIN_A7_METADATA.totalPnbpTarget}
              </div>
            </div>
            <div>
              <span className="text-slate-500">Realisasi Penerimaan PNBP:</span>
              <div className="font-mono font-black text-cyan-600 text-sm">
                {PERKIN_A7_METADATA.totalPnbpRealisasi} ({PERKIN_A7_METADATA.persenPnbpRealisasi}%)
              </div>
            </div>
          </div>
        </div>

        {/* Tanda Tangan */}
        <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
          <div className="space-y-12">
            <div>
              <p>Pihak Kedua,</p>
              <p className="font-bold text-slate-800">Anggota / Deputi Bidang Infrastruktur</p>
            </div>
            <div>
              <p className="font-bold underline text-slate-900">{PERKIN_A7_METADATA.pihakKedua.nama}</p>
              <p className="text-[10px] text-slate-500 font-mono">NIP. {PERKIN_A7_METADATA.pihakKedua.nip}</p>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <p>Batam, {PERKIN_A7_METADATA.tanggalPenetapan}</p>
              <p className="font-bold text-slate-800">Pihak Pertama, Kepala BP Batam</p>
            </div>
            <div>
              <p className="font-bold underline text-slate-900">{PERKIN_A7_METADATA.pihakPertama.nama}</p>
              <p className="text-[10px] text-slate-500 font-mono">NIP. {PERKIN_A7_METADATA.pihakPertama.nip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
