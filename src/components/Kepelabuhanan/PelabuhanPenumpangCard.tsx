import React, { useState } from 'react';
import {
  Users,
  MapPin,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  PENUMPANG_PER_TERMINAL_DATA,
  PENUMPANG_REKAP_TOTAL,
} from '../../data/kepelabuhananData';
import { PelabuhanDatasetBadge } from './PelabuhanDatasetBadge';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PelabuhanPenumpangCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const PelabuhanPenumpangCard: React.FC<PelabuhanPenumpangCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [showFormula, setShowFormula] = useState(false);

  const { totalKedatangan, totalKeberangkatan, totalSeluruh, totalDomestik, totalInternasional } =
    PENUMPANG_REKAP_TOTAL;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* CARD HEADER */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/70">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Arus Penumpang (Domestik vs Internasional) Berdasarkan Terminal Feri
              </h3>
              <TableauShelvesBadge
                showMe="#12 Stacked Bar & Gantt"
                rows="[Nama Terminal], SUM([Penumpang])"
                columns="[Kategori], [Kedatangan/Keberangkatan]"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <PelabuhanDatasetBadge
                datasetNumber={25}
                datasetName="Jumlah Penumpang Pelabuhan Domestik dan Internasional"
                classification="TERTUTUP"
                period="Per Tahun / Bulan"
                pdfPages="Hal. 17"
                tableId="penumpang_pelabuhan"
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
                  Rumus Tableau: Total Penumpang (Pax) &amp; Nilai Konversi IKM Pelabuhan
                </span>
                <p className="text-slate-600 text-[10.5px] mt-0.5">
                  Satu Data Item #25 (Penumpang) &amp; Item #21 (IKM): Mengkalkulasi mobilitas penumpang kedatangan/keberangkatan dan kepuasan pelayanan maritim.
                </p>
              </div>
              <button
                onClick={() => onOpenFormulaModal && onOpenFormulaModal('pelabuhan_penumpang')}
                className="px-2 py-1 bg-[#1F4E79] text-white rounded text-[10.5px] font-bold shrink-0 hover:bg-[#163756] cursor-pointer"
              >
                Buka di Kamus Formula Eksekutif
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[10.5px]">
              <div className="bg-white p-2 rounded border border-blue-100">
                <span className="text-slate-500 font-sans block text-[9.5px] font-bold">1. TOTAL PENUMPANG PELABUHAN:</span>
                <code className="text-indigo-900 font-bold">
                  [Total Penumpang] = SUM([JUMLAH_KEDATANGAN]) + SUM([JUMLAH_KEBERANGKATAN])
                </code>
              </div>
              <div className="bg-white p-2 rounded border border-blue-100">
                <span className="text-slate-500 font-sans block text-[9.5px] font-bold">2. INDEKS IKM TERTIMBANG (PERMENPAN-RB):</span>
                <code className="text-emerald-900 font-bold">
                  [Skor IKM Tertimbang] = (SUM([NILAI_UNSUR_1..9]) / 9) * 25
                </code>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CARD BODY */}
      <div className="p-3.5">
        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Penumpang (DS-25)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-slate-900">
                {(totalSeluruh / 1000000).toFixed(2)}
              </span>
              <span className="text-[10.5px] font-bold text-slate-500">Juta Pax</span>
            </div>
            <span className="text-[9.5px] text-slate-500">YTD s/d April 2026</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Kedatangan vs Keberangkatan
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xs font-bold text-blue-700">
                {(totalKedatangan / 1000000).toFixed(2)}M
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-xs font-bold text-indigo-700">
                {(totalKeberangkatan / 1000000).toFixed(2)}M
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500">Net Outflow: 65.400 Pax</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Domestik vs Internasional
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xs font-bold text-slate-800">
                65,3% <span className="font-normal text-slate-500">Dom</span>
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-xs font-bold text-sky-700">
                34,7% <span className="font-normal text-slate-500">Int</span>
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500">Singapura &amp; Malaysia: 2,57M Pax</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Terminal Terpadat (Porsi Terbesar)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-emerald-700">
                Batam Centre
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                42,5%
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500 font-mono">3,15 Juta Penumpang</span>
          </div>
        </div>

        {/* VIEW: ARUS TERMINAL */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-800 block">
            Arus Penumpang Berdasarkan Terminal Feri &amp; Pelabuhan (Dataset #25)
          </span>

          <div className="space-y-2">
            {PENUMPANG_PER_TERMINAL_DATA.map((t) => (
              <div key={t.terminal} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="font-bold text-slate-900">{t.terminal}</span>
                    <span className="px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-[9px]">
                      {t.jenis}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-500 text-[10.5px]">
                      Datang: {(t.datang / 1000).toFixed(1)}k | Berangkat: {(t.berangkat / 1000).toFixed(1)}k
                    </span>
                    <span className="font-bold text-slate-900 text-xs">
                      {(t.total / 1000).toFixed(1)}k ({t.porsi}%)
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2 flex overflow-hidden">
                  <div
                    className="bg-blue-600 h-2"
                    style={{ width: `${(t.datang / t.total) * 100}%` }}
                    title={`Kedatangan: ${t.datang.toLocaleString('id-ID')}`}
                  />
                  <div
                    className="bg-indigo-600 h-2"
                    style={{ width: `${(t.berangkat / t.total) * 100}%` }}
                    title={`Keberangkatan: ${t.berangkat.toLocaleString('id-ID')}`}
                  />
                </div>
                <span className="text-[9.5px] text-slate-500 block mt-1">
                  Rute Utama: {t.negaraTujuanUtama}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-[10.5px] text-slate-600 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-600" />
              <span>Kedatangan Penumpang (Arrival)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-indigo-600" />
              <span>Keberangkatan Penumpang (Departure)</span>
            </div>
          </div>
        </div>

        {/* STRATEGIC EXECUTIVE INSIGHT */}
        <div className="mt-3 p-2.5 rounded-lg bg-indigo-50/70 border-l-4 border-indigo-600 border border-indigo-200/80">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed text-slate-800">
              <span className="font-bold text-indigo-950 block">
                Insight Strategis Pimpinan (Pergerakan Penumpang &amp; Indeks Kepuasan):
              </span>
              <p className="mt-0.5 text-slate-700">
                Terminal Feri Internasional Batam Centre dan Harbour Bay melayani <strong>61,7%</strong> total mobilitas penumpang feri (<strong>4,57 Juta Pax</strong>), menjadi pintu gerbang wisman mancanegara ke Batam. Tingginya skor IKM (<strong>88,40</strong> / Kategori A) membuktikan transformasi gate otomatis autogate dan sterilisasi ruang tunggu feri diapresiasi tinggi oleh penumpang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
