import React, { useState } from 'react';
import {
  FileText,
  Pill,
  Users2,
  Award,
  HelpCircle,
  TrendingUp,
  Activity,
  HeartPulse,
  CheckCircle2,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import {
  RS_TOP_PENYAKIT,
  RS_RESEP_OBAT_TOTAL,
  RS_RESEP_OBAT,
  RS_DATA_PEGAWAI,
  RS_TOTAL_PEGAWAI,
  RS_IKM_TOTAL,
  RS_IKM_UNSUR,
} from '../../data/rumahSakitData';

interface RumahSakitMorbiditasObatCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const RumahSakitMorbiditasObatCard: React.FC<RumahSakitMorbiditasObatCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeTab, setActiveTab] = useState<'penyakit' | 'obat' | 'pegawai' | 'ikm'>('penyakit');

  return (
    <div
      id="card-rsbp-morbiditas-obat-pegawai"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 font-sans flex flex-col justify-between"
    >
      {/* 1. Header with Tab Switcher */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-teal-50 text-teal-700 border border-teal-200">
                  Dataset #4, #17, #7, #1
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                  Analisis Klinis & SDM
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                Morbiditas Penyakit, Farmasi Fornas & SDM Medis RSBP
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-center">
            {/* View switcher */}
            <div className="bg-slate-100 p-0.5 rounded-lg flex items-center text-xs">
              <button
                onClick={() => setActiveTab('penyakit')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTab === 'penyakit'
                    ? 'bg-white text-teal-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Top 10 Morbiditas (DS 4)
              </button>
              <button
                onClick={() => setActiveTab('obat')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTab === 'obat'
                    ? 'bg-white text-emerald-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Resep Generik (DS 17)
              </button>
              <button
                onClick={() => setActiveTab('pegawai')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTab === 'pegawai'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                SDM Medis (DS 7)
              </button>
              <button
                onClick={() => setActiveTab('ikm')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTab === 'ikm'
                    ? 'bg-white text-amber-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Unsur IKM (DS 1)
              </button>
            </div>

            <button
              onClick={() => onOpenFormulaModal && onOpenFormulaModal(activeTab === 'penyakit' ? 'rsbp_morbiditas' : activeTab === 'obat' ? 'rsbp_resep_generik' : 'rsbp_ikm')}
              className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
              title="Formula & Keterangan Sumber Data Satu Data"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. TAB CONTENT: TOP 10 PENYAKIT (DATASET NO. 4) */}
        {activeTab === 'penyakit' && (
          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-semibold">
              <span>10 Pola Penyakit Terbanyak (Klasifikasi ICD-10):</span>
              <span className="text-teal-700 font-bold">Total: 74.990 Kasus Terdata</span>
            </div>
            <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
              {RS_TOP_PENYAKIT.map((penyakit) => (
                <div
                  key={penyakit.peringkat}
                  className="bg-slate-50 hover:bg-teal-50/40 border border-slate-200/70 rounded-lg p-2 text-xs transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                        {penyakit.peringkat}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {penyakit.kodeIcd}
                      </span>
                      <span className="font-bold text-slate-800 line-clamp-1">
                        {penyakit.namaPenyakit}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 font-mono">
                      <span className="font-bold text-slate-900">
                        {penyakit.jumlahKasus.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                        {penyakit.persenKasus.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Subtitle / tag info */}
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Instalasi: <strong className="text-slate-600">{penyakit.jenisRawat}</strong></span>
                    <span className="italic">Prognosa Klinis Terkendali</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. TAB CONTENT: RESEP OBAT GENERIK (DATASET NO. 17) */}
        {activeTab === 'obat' && (
          <div className="mt-2.5">
            {/* Highlights BAN */}
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between mb-2.5">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  Rasio Resep Obat Generik RSBP (DS-17)
                </span>
                <div className="text-xl font-black text-emerald-800">
                  {RS_RESEP_OBAT_TOTAL.rasioGenerikPersen.toFixed(2)}%
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200 inline-block">
                  Standar Fornas Kemenkes: &gt; 80%
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Generik: {RS_RESEP_OBAT_TOTAL.totalGenerik.toLocaleString('id-ID')} Lembar
                </span>
              </div>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {RS_RESEP_OBAT.map((resep) => (
                <div
                  key={resep.instalasi}
                  className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-xs"
                >
                  <div className="flex items-center justify-between mb-1 font-semibold">
                    <span className="text-slate-800">{resep.instalasi}</span>
                    <span className="font-mono text-emerald-700 font-bold">
                      Generik: {resep.persenGenerik.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex">
                    <div
                      className="bg-emerald-600 h-2"
                      style={{ width: `${resep.persenGenerik}%` }}
                      title={`Generik: ${resep.resepGenerik}`}
                    />
                    <div
                      className="bg-amber-400 h-2"
                      style={{ width: `${100 - resep.persenGenerik}%` }}
                      title={`Non-Generik: ${resep.resepNonGenerik}`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>Generik: {resep.resepGenerik.toLocaleString('id-ID')}</span>
                    <span>Non-Generik: {resep.resepNonGenerik.toLocaleString('id-ID')}</span>
                    <span>Total: {resep.totalResep.toLocaleString('id-ID')} Lembar</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TAB CONTENT: SDM MEDIS (DATASET NO. 7) */}
        {activeTab === 'pegawai' && (
          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 font-semibold">
              <span>Komposisi Ketenagaan RSBP (Total {RS_TOTAL_PEGAWAI} SDM):</span>
              <span className="text-blue-700 font-bold">Dokter & Perawat: 58,6%</span>
            </div>
            <div className="space-y-1.5 max-h-[240px] overflow-y-auto pr-1">
              {RS_DATA_PEGAWAI.map((pegawai) => (
                <div
                  key={pegawai.kategori}
                  className="bg-slate-50 border border-slate-200/80 rounded-lg p-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-800">
                      {pegawai.kategori}
                    </span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-slate-900 text-[11px]">
                        {pegawai.jumlah} Orang
                      </span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                        {pegawai.persen.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                    <span>PNS: <strong className="text-slate-700">{pegawai.statusPns}</strong></span>
                    <span>P3K: <strong className="text-slate-700">{pegawai.statusP3k}</strong></span>
                    <span>Kontrak BLU: <strong className="text-slate-700">{pegawai.statusKontrakBlu}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TAB CONTENT: UNSUR IKM (DATASET NO. 1) */}
        {activeTab === 'ikm' && (
          <div className="mt-2.5">
            <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between mb-2 text-xs">
              <span className="text-slate-700">
                Nilai IKM Terpadu: <strong className="text-amber-800 text-sm">{RS_IKM_TOTAL}</strong>
              </span>
              <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-amber-200">
                Mutu A (Sangat Baik)
              </span>
            </div>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {RS_IKM_UNSUR.map((unsur, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/70 rounded-lg p-1.5 text-xs flex items-center justify-between gap-2"
                >
                  <span className="text-slate-700 font-medium text-[11px] line-clamp-1">
                    {unsur.unsur}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="font-mono font-bold text-slate-900 text-[11px]">
                      {unsur.skor.toFixed(1)}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      {unsur.predikat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Katalog Satu Data Hal. 19-21</span>
        <span className="font-mono text-[10px] text-slate-400">DS 4, 17, 7, 1</span>
      </div>
    </div>
  );
};
