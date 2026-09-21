import React, { useState } from 'react';
import {
  ShieldAlert,
  ArrowDownRight,
  CheckCircle2,
  FileCode2,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Building,
} from 'lucide-react';
import { PIAGAM_RISIKO_DATA, PEKPPP_DATA, SOP_BOKMR_SUMMARY } from './bokmrData';
import { BokmrFilterState } from './types';

interface StrategicBokmrMetricsProps {
  filters: BokmrFilterState;
  onOpenFormulaModal: (datasetIndex: number) => void;
}

export const StrategicBokmrMetrics: React.FC<StrategicBokmrMetricsProps> = ({
  filters,
  onOpenFormulaModal,
}) => {
  const [selectedRiskIndex, setSelectedRiskIndex] = useState<number>(0);

  const selectedRisk = PIAGAM_RISIKO_DATA[selectedRiskIndex] || PIAGAM_RISIKO_DATA[0];

  return (
    <div className="space-y-4">
      {/* SECTION TITLE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Pengawasan Strategis Pimpinan: Piagam Risiko Unit, Evaluasi Pelayanan Publik & Kepatuhan SOP
          </h3>
        </div>
        <span className="text-[11px] text-slate-500">
          Satu Data Hal 38 & 40 (Dataset #1, #14 & #16)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ITEM 1: PIAGAM RISIKO & PENURUNAN RESIDUAL RISK (DATASET #14) - 7 COLS */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">
                  Efektivitas Mitigasi Piagam Risiko Unit Kerja
                </h4>
                <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold text-[10px] font-mono">
                  DATASET NO. 14 (HAL 40)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Pemantauan Penurunan Besaran Risiko Awal Tahun vs Akhir Tahun
              </p>
            </div>

            <button
              onClick={() => onOpenFormulaModal(14)}
              className="text-xs font-semibold text-rose-700 hover:text-rose-800 flex items-center gap-1"
            >
              Matriks 5x5 <FileCode2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* RISK ITEMS SELECTOR (PILL BUTTONS) */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {PIAGAM_RISIKO_DATA.map((risk, idx) => (
              <button
                key={risk.nomorPiagam}
                onClick={() => setSelectedRiskIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
                  selectedRiskIndex === idx
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {risk.unitKerja.replace('Badan Usaha ', 'BU ')}
              </button>
            ))}
          </div>

          {/* SELECTED RISK HERO CARD */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">
                  {selectedRisk.nomorPiagam} • {selectedRisk.unitKerja}
                </span>
                <h5 className="text-xs font-bold text-slate-900 mt-0.5">
                  {selectedRisk.sasaranOrganisasi}
                </h5>
                <p className="text-[11px] text-rose-800 font-medium mt-1">
                  Kejadian Risiko: {selectedRisk.kejadianRisiko}
                </p>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                  selectedRisk.statusMitigasi === 'Efektif'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}
              >
                Mitigasi: {selectedRisk.statusMitigasi}
              </span>
            </div>

            {/* VISUAL RISK SCORE COMPARISON: AWAL VS AKHIR */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-rose-700 block">
                  Besaran Risiko Awal Tahun
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-rose-900 font-mono">
                    {selectedRisk.besaranRisikoAwalTahun}
                  </span>
                  <span className="text-xs font-bold text-rose-700">
                    Level: {selectedRisk.levelAwal}
                  </span>
                </div>
                <div className="w-full bg-rose-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="bg-rose-600 h-full rounded-full"
                    style={{ width: `${(selectedRisk.besaranRisikoAwalTahun / 25) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                    Besaran Risiko Akhir Tahun
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                    -{selectedRisk.besaranRisikoAwalTahun - selectedRisk.besaranRisikoAkhirTahun} Poin
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-emerald-950 font-mono">
                    {selectedRisk.besaranRisikoAkhirTahun}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    Level: {selectedRisk.levelAkhir}
                  </span>
                </div>
                <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${(selectedRisk.besaranRisikoAkhirTahun / 25) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
              <strong className="text-slate-800">Tindakan Mitigasi Utama:</strong> {selectedRisk.mitigasiUtama}
            </div>
          </div>
        </div>

        {/* ITEM 2: EVALUASI PEKPPP & STANDAR OPERASIONAL PROSEDUR (SOP) - 5 COLS */}
        <div className="lg:col-span-5 space-y-4">
          {/* CARD 1: PEKPPP EVALUASI PELAYANAN PUBLIK (DATASET #16) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-teal-600" />
                <h4 className="text-xs font-bold text-slate-900">
                  Evaluasi Penyelenggaraan Pelayanan Publik (PEKPPP)
                </h4>
              </div>
              <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-bold text-[10px] font-mono">
                DATASET NO. 16
              </span>
            </div>

            <div className="space-y-2">
              {PEKPPP_DATA.map((pek) => (
                <div
                  key={pek.id}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-800 block line-clamp-1">
                      {pek.unitKerja}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Predikat: {pek.predikat}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-teal-800 text-sm block">
                      {pek.capaianIndeks.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                      {pek.kategori}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 2: KEPATUHAN SOP & PROSES BISNIS (DATASET #1) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <h4 className="text-xs font-bold text-slate-900">
                  Peta Proses Bisnis & SOP Terverifikasi
                </h4>
              </div>
              <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded font-bold text-[10px] font-mono">
                DATASET NO. 1
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Total SOP</span>
                <span className="text-lg font-black text-slate-900 font-mono">
                  {SOP_BOKMR_SUMMARY.totalSopTerdaftar}
                </span>
                <span className="text-[9px] text-slate-400 block">Terdaftar</span>
              </div>
              <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                <span className="text-[10px] text-emerald-700 block">Terverifikasi</span>
                <span className="text-lg font-black text-emerald-800 font-mono">
                  {SOP_BOKMR_SUMMARY.sopTerverifikasiAktif}
                </span>
                <span className="text-[9px] text-emerald-600 block">Aktif</span>
              </div>
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-200">
                <span className="text-[10px] text-amber-700 block">Proses Revisi</span>
                <span className="text-lg font-black text-amber-800 font-mono">
                  {SOP_BOKMR_SUMMARY.sopProsesRevisi}
                </span>
                <span className="text-[9px] text-amber-600 block">Digitalisasi</span>
              </div>
            </div>

            <div className="p-2.5 bg-sky-50/70 border border-sky-200 rounded-xl text-xs flex items-center justify-between">
              <span className="text-slate-600 text-[11px]">Kepatuhan SOP Nasional:</span>
              <span className="font-mono font-bold text-sky-800">
                {SOP_BOKMR_SUMMARY.persentaseKepatuhanSop}% (Level 3 SPBE)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
