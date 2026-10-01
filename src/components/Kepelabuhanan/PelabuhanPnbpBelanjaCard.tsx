import React, { useState } from 'react';
import {
  DollarSign,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  PNBP_PER_SATKER_SUMMARY,
  BELANJA_KEPELABUHANAN_SUMMARY,
} from '../../data/kepelabuhananData';
import { PelabuhanDatasetBadge } from './PelabuhanDatasetBadge';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PelabuhanPnbpBelanjaCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const PelabuhanPnbpBelanjaCard: React.FC<PelabuhanPnbpBelanjaCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [showFormula, setShowFormula] = useState(false);

  const totalPnbpMiliar = 428.5;
  const targetPnbpMiliar = 480.0;
  const totalBelanjaMiliar = 184.25;
  const surplusMiliar = totalPnbpMiliar - totalBelanjaMiliar;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* CARD HEADER */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/70">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Kinerja Keuangan: Kontribusi Satker &amp; Pagu Belanja Kepelabuhanan
              </h3>
              <TableauShelvesBadge
                showMe="#14 Bar Breakdown"
                rows="SUM([Nilai Rp]), [Persen]"
                columns="[Satker], [Komponen Belanja]"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <PelabuhanDatasetBadge
                datasetNumber={3}
                datasetName="Realisasi PNBP Kepelabuhanan"
                classification="TERTUTUP"
                period="Per Tahun"
                pdfPages="Hal. 15"
                tableId="pnbp_kepelabuhanan"
              />
              <span className="text-slate-300">|</span>
              <PelabuhanDatasetBadge
                datasetNumber={2}
                datasetName="Data Realisasi Belanja Kepelabuhanan"
                classification="TERTUTUP"
                period="Per Bulan"
                pdfPages="Hal. 14 - 15"
                tableId="belanja_kepelabuhanan"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Formula Toggle */}
            <button
              onClick={() => setShowFormula(!showFormula)}
              className={`px-2 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 cursor-pointer transition-colors ${
                showFormula
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Formula</span>
              {showFormula ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* COLLAPSIBLE FORMULA ACCORDION */}
        {showFormula && (
          <div className="mt-2.5 p-2.5 bg-blue-50/80 border border-blue-200 rounded-lg text-[11px] text-slate-800 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-bold text-[#1F4E79] block">
                  Rumus Tableau: Realisasi PNBP &amp; Surplus Operasional Pelabuhan
                </span>
                <p className="text-slate-600 text-[10.5px] mt-0.5">
                  Satu Data Item #3 &amp; #2: Menghitung persentase capaian target PNBP kepelabuhanan serta surplus operasional maritim.
                </p>
              </div>
              <button
                onClick={() => onOpenFormulaModal && onOpenFormulaModal('pelabuhan_pnbp')}
                className="px-2 py-1 bg-[#1F4E79] text-white rounded text-[10.5px] font-bold shrink-0 hover:bg-[#163756] cursor-pointer"
              >
                Buka di Kamus Formula Eksekutif
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[10.5px]">
              <div className="bg-white p-2 rounded border border-blue-100">
                <span className="text-slate-500 font-sans block text-[9.5px] font-bold">1. PERSENTASE CAPAIAN PNBP:</span>
                <code className="text-blue-900 font-bold">
                  [% Capaian PNBP] = (SUM([JUMLAH_PNBP]) / SUM([TARGET_PNBP])) * 100
                </code>
              </div>
              <div className="bg-white p-2 rounded border border-blue-100">
                <span className="text-slate-500 font-sans block text-[9.5px] font-bold">2. SURPLUS NETTO KEPELABUHANAN:</span>
                <code className="text-emerald-900 font-bold">
                  [Surplus Operasional] = SUM([JUMLAH_PNBP]) - SUM([REALISASI_BELANJA])
                </code>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CARD BODY */}
      <div className="p-3.5">
        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-3 gap-2.5 mb-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Realisasi PNBP (Dataset #3)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-slate-900">
                Rp {totalPnbpMiliar.toFixed(1)} M
              </span>
              <span className="text-[10.5px] font-bold text-emerald-700">(89,3%)</span>
            </div>
            <span className="text-[9.5px] text-slate-500">Target TA 2026: Rp 480,0 M</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Realisasi Belanja (Dataset #2)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-blue-900">
                Rp {totalBelanjaMiliar.toFixed(2)} M
              </span>
              <span className="text-[10.5px] font-bold text-blue-700">(85,7%)</span>
            </div>
            <span className="text-[9.5px] text-slate-500">Pagu DIPA: Rp 215,0 M</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Surplus Operasional Maritim
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-emerald-700">
                +Rp {surplusMiliar.toFixed(2)} M
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                Surplus Tinggi
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500">Rasio Cost-to-Income: 43,0%</span>
          </div>
        </div>

        {/* VIEW: BREAKDOWN PER SATKER & PAGU */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Satker PNBP Breakdown */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-slate-800 block mb-2">
              Kontribusi PNBP per Satker / Pelabuhan (Dataset #3 &amp; #18)
            </span>
            <div className="space-y-2">
              {PNBP_PER_SATKER_SUMMARY.map((s) => (
                <div key={s.satker} className="space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{s.satker}</span>
                    <span className="font-mono font-bold text-slate-900">
                      Rp {(s.realisasiRp / 1000000000).toFixed(1)} M ({s.persen}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-1.5 rounded-full"
                      style={{ width: `${s.persen}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Belanja Category Breakdown */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-slate-800 block mb-2">
              Realisasi Belanja Berdasarkan Komponen Strategis (Dataset #2)
            </span>
            <div className="space-y-2">
              {BELANJA_KEPELABUHANAN_SUMMARY.kategori.map((k) => (
                <div key={k.nama} className="space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 truncate max-w-[220px]" title={k.nama}>
                      {k.nama}
                    </span>
                    <span className="font-mono font-bold text-blue-900">
                      Rp {(k.realisasiRp / 1000000000).toFixed(1)} M ({k.persen}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#1F4E79] h-1.5 rounded-full"
                      style={{ width: `${k.persen}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STRATEGIC EXECUTIVE INSIGHT */}
        <div className="mt-3 p-2.5 rounded-lg bg-emerald-50/70 border-l-4 border-emerald-600 border border-emerald-200/80">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed text-slate-800">
              <span className="font-bold text-emerald-950 block">
                Insight Strategis Pimpinan (Realisasi PNBP &amp; Efisiensi Belanja):
              </span>
              <p className="mt-0.5 text-slate-700">
                Penerimaan PNBP Pelabuhan Batu Ampar menyumbang porsi terbesar (<strong>51,0%</strong> dari total pendapatan), didorong oleh modernisasi sistem STS Crane dan percepatan <em>turnaround time</em> kapal kargo. Rasio serapan belanja modal mencapai <strong>85,7%</strong>, menjaga surplus kas operasional kepelabuhanan tetap positif sebesar <strong>+Rp 244,25 Miliar</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
