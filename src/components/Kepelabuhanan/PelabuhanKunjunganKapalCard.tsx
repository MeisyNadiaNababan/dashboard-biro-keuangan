import React, { useState } from 'react';
import {
  Ship,
  Anchor,
  HelpCircle,
  Lightbulb,
  MapPin,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  KUNJUNGAN_KAPAL_SUMMARY,
  TREN_KUNJUNGAN_BULANAN,
  PENUMPANG_PER_TERMINAL_DATA,
} from '../../data/kepelabuhananData';
import { PelabuhanDatasetBadge } from './PelabuhanDatasetBadge';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PelabuhanKunjunganKapalCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const PelabuhanKunjunganKapalCard: React.FC<PelabuhanKunjunganKapalCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [showFormula, setShowFormula] = useState(false);

  const { totalCallSeluruh, totalGtSeluruhJuta, kapalBarang, kapalPenumpang } = KUNJUNGAN_KAPAL_SUMMARY;

  const persenBarangCall = Math.round((kapalBarang.totalCall / totalCallSeluruh) * 1000) / 10;
  const persenPenumpangCall = Math.round((kapalPenumpang.totalCall / totalCallSeluruh) * 1000) / 10;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* CARD HEADER */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/70">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
                <Ship className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Trafik Kunjungan Kapal (Call &amp; GT) &amp; Arus Terminal Penumpang
              </h3>
              <TableauShelvesBadge
                showMe="#14 Side-by-Side Bars & Gantt"
                rows="[Tipe Kapal], SUM([Call]), SUM([Penumpang])"
                columns="[Bulan], [Trayek], [Nama Terminal]"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <PelabuhanDatasetBadge
                datasetNumber={5}
                datasetName="Rekapitulasi Kunjungan Kapal Barang"
                classification="TERBUKA"
                period="Per Bulan"
                pdfPages="Hal. 15"
                tableId="kunjungan_kapal_barang"
              />
              <span className="text-slate-300">|</span>
              <PelabuhanDatasetBadge
                datasetNumber={7}
                datasetName="Rekapitulasi Kunjungan Kapal Penumpang"
                classification="TERBUKA"
                period="Per Bulan"
                pdfPages="Hal. 15"
                tableId="kunjungan_kapal_penumpang"
              />
              <span className="text-slate-300">|</span>
              <PelabuhanDatasetBadge
                datasetNumber={25}
                datasetName="Jumlah Penumpang Terminal Feri"
                classification="TERTUTUP"
                period="Per Bulan"
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
                  Rumus Tableau: Kunjungan Kapal (Call) &amp; Arus Terminal Penumpang
                </span>
                <p className="text-slate-600 text-[10.5px] mt-0.5">
                  Satu Data Item #5 (Kapal Barang), #7 (Kapal Penumpang) &amp; #25 (Penumpang): Mengagregasikan panggilan kapal dan mobilitas penumpang antarpulau &amp; internasional.
                </p>
              </div>
              <button
                onClick={() => onOpenFormulaModal && onOpenFormulaModal('pelabuhan_kunjungan')}
                className="px-2 py-1 bg-[#1F4E79] text-white rounded text-[10.5px] font-bold shrink-0 hover:bg-[#163756] cursor-pointer"
              >
                Buka di Kamus Formula Eksekutif
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[10.5px]">
              <div className="bg-white p-2 rounded border border-blue-100">
                <span className="text-slate-500 font-sans block text-[9.5px] font-bold">1. TOTAL CALL KAPAL:</span>
                <code className="text-blue-900 font-bold">
                  [Total Call] = SUM([CALL_DALAM]) + SUM([CALL_LUAR])
                </code>
              </div>
              <div className="bg-white p-2 rounded border border-blue-100">
                <span className="text-slate-500 font-sans block text-[9.5px] font-bold">2. TOTAL GROSS TONNAGE (GT):</span>
                <code className="text-sky-900 font-bold">
                  [Total GT] = SUM([GT_DALAM]) + SUM([GT_LUAR])
                </code>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CARD BODY */}
      <div className="p-3.5 space-y-4">
        {/* Metric Overview Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Panggilan (Call)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-slate-900">
                {totalCallSeluruh.toLocaleString('id-ID')}
              </span>
              <span className="text-[10.5px] font-bold text-slate-500">Call</span>
            </div>
            <span className="text-[9.5px] text-slate-500">YTD s/d April 2026</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Tonase (GT)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-sky-900">
                {totalGtSeluruhJuta}
              </span>
              <span className="text-[10.5px] font-bold text-slate-500">Juta GT</span>
            </div>
            <span className="text-[9.5px] text-slate-500">Gross Registered Tonnage</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Kapal Barang (DS-5)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-amber-700">
                {kapalBarang.totalCall.toLocaleString('id-ID')}
              </span>
              <span className="text-[10.5px] font-bold text-amber-700">({persenBarangCall}%)</span>
            </div>
            <span className="text-[9.5px] text-slate-500">{kapalBarang.totalGtJuta} Juta GT &bull; Kargo &amp; Peti Kemas</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Kapal Penumpang (DS-7)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-sky-700">
                {kapalPenumpang.totalCall.toLocaleString('id-ID')}
              </span>
              <span className="text-[10.5px] font-bold text-sky-700">({persenPenumpangCall}%)</span>
            </div>
            <span className="text-[9.5px] text-slate-500">{kapalPenumpang.totalGtJuta} Juta GT &bull; Feri &amp; Roro</span>
          </div>
        </div>

        {/* COMBINED SECTION: TREN BULANAN (KIRI) & KOMPOSISI TRAYEK (KANAN) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* KOLOM KIRI: TREN BULANAN */}
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2 pb-1 border-b border-slate-200">
                <span className="font-bold text-slate-800">
                  Tren Kunjungan Kapal Bulanan (Call Barang vs Penumpang)
                </span>
                <span className="font-mono text-[10.5px] text-slate-500">Panggilan (Call)</span>
              </div>

              <div className="h-44 w-full relative">
                <svg viewBox="0 0 600 130" className="w-full h-full">
                  <line x1="40" y1="20" x2="580" y2="20" stroke="#E2E8F0" strokeDasharray="2 2" />
                  <line x1="40" y1="65" x2="580" y2="65" stroke="#E2E8F0" strokeDasharray="2 2" />
                  <line x1="40" y1="110" x2="580" y2="110" stroke="#CBD5E1" />

                  <text x="32" y="24" textAnchor="end" className="text-[9px] fill-slate-400 font-mono">10k</text>
                  <text x="32" y="69" textAnchor="end" className="text-[9px] fill-slate-400 font-mono">5k</text>
                  <text x="32" y="114" textAnchor="end" className="text-[9px] fill-slate-400 font-mono">0</text>

                  {TREN_KUNJUNGAN_BULANAN.map((item, idx) => {
                    const xBase = 65 + idx * 88;
                    const barangHeight = (item.callBarang / 10000) * 90;
                    const penumpangHeight = (item.callPenumpang / 10000) * 90;

                    return (
                      <g key={item.bulan}>
                        {/* Kapal Barang Bar */}
                        <rect
                          x={xBase}
                          y={110 - barangHeight}
                          width="22"
                          height={barangHeight}
                          rx="2.5"
                          className="fill-amber-500"
                        />
                        {/* Kapal Penumpang Bar */}
                        <rect
                          x={xBase + 24}
                          y={110 - penumpangHeight}
                          width="22"
                          height={penumpangHeight}
                          rx="2.5"
                          className="fill-sky-600"
                        />

                        <text
                          x={xBase + 11}
                          y={105 - barangHeight}
                          textAnchor="middle"
                          className="text-[8px] font-mono font-bold fill-amber-800"
                        >
                          {item.callBarang}
                        </text>
                        <text
                          x={xBase + 35}
                          y={105 - penumpangHeight}
                          textAnchor="middle"
                          className="text-[8px] font-mono font-bold fill-sky-800"
                        >
                          {item.callPenumpang}
                        </text>

                        <text
                          x={xBase + 23}
                          y="124"
                          textAnchor="middle"
                          className="text-[9.5px] fill-slate-600 font-medium"
                        >
                          {item.bulan}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 text-[10.5px] text-slate-600 pt-1 border-t border-slate-200 mt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500" />
                <span className="font-medium">Call Barang (DS-5)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-sky-600" />
                <span className="font-medium">Call Penumpang (DS-7)</span>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: KOMPOSISI TRAYEK */}
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 pb-1 border-b border-slate-200">
              <span className="font-bold text-slate-800">
                Komposisi Trayek Kapal: Domestik vs Luar Negeri
              </span>
              <span className="font-mono text-[10.5px] text-slate-500">Call &amp; Tonase GT</span>
            </div>

            {/* Kapal Barang Breakdown */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Anchor className="w-3.5 h-3.5 text-amber-600" />
                  <span>Kapal Barang (16.240 Call)</span>
                </span>
                <span className="text-[10.5px] font-mono font-bold text-amber-800">42,8 Juta GT</span>
              </div>

              <div className="space-y-1.5">
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <span className="font-medium text-slate-700">Call Domestik (Antarpulau)</span>
                    <span className="font-mono font-bold text-slate-900">
                      {kapalBarang.callDalam.toLocaleString('id-ID')} Call (67,0%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '67.0%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <span className="font-medium text-slate-700">Call Luar Negeri (Ocean-Going)</span>
                    <span className="font-mono font-bold text-slate-900">
                      {kapalBarang.callLuar.toLocaleString('id-ID')} Call (33,0%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-700 h-1.5 rounded-full" style={{ width: '33.0%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Kapal Penumpang Breakdown */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Ship className="w-3.5 h-3.5 text-sky-600" />
                  <span>Kapal Penumpang (32.410 Call)</span>
                </span>
                <span className="text-[10.5px] font-mono font-bold text-sky-800">18,6 Juta GT</span>
              </div>

              <div className="space-y-1.5">
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <span className="font-medium text-slate-700">Call Domestik (Feri Domestik)</span>
                    <span className="font-mono font-bold text-slate-900">
                      {kapalPenumpang.callDalam.toLocaleString('id-ID')} Call (58,4%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: '58.4%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <span className="font-medium text-slate-700">Call Luar Negeri (Feri Internasional)</span>
                    <span className="font-mono font-bold text-slate-900">
                      {kapalPenumpang.callLuar.toLocaleString('id-ID')} Call (41,6%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-sky-700 h-1.5 rounded-full" style={{ width: '41.6%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PENGGANTI DETAIL CALL/GT: SHEET ARUS PENUMPANG (SHEET ARUS TERMINAL) */}
        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>Arus Penumpang Berdasarkan Terminal Feri &amp; Pelabuhan (Dataset #25)</span>
              </span>
              <p className="text-[10.5px] text-slate-500 mt-0.5">
                Distribusi kedatangan dan keberangkatan penumpang di 5 terminal feri utama Batam
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
              Total 7,41 Juta Pax
            </span>
          </div>

          <div className="space-y-2">
            {PENUMPANG_PER_TERMINAL_DATA.map((t) => (
              <div key={t.terminal} className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
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

          <div className="flex items-center justify-center gap-6 text-[10.5px] text-slate-600 pt-1 border-t border-slate-200">
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
        <div className="p-2.5 rounded-lg bg-sky-50/70 border-l-4 border-sky-600 border border-sky-200/80">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed text-slate-800">
              <span className="font-bold text-sky-950 block">
                Insight Strategis Pimpinan (Kunjungan Kapal &amp; Alur Maritim):
              </span>
              <p className="mt-0.5 text-slate-700">
                Meskipun jumlah panggilan kapal penumpang mendominasi volume pergerakan (<strong>66,6%</strong> dari 48.650 Call), kapal barang menyumbang bobot tonase terbesar (<strong>42,8 Juta GT</strong> dari total 61,4 Juta GT atau <strong>69,7%</strong>). Layanan kepanduan 24/7 dan digitalisasi BMS berhasil menjaga <em>turnaround time</em> feri di angka rata-rata <strong>38 menit</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
