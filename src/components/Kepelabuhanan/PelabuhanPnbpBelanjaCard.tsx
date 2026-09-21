import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart as PieChartIcon,
  BarChart3,
  Table as TableIcon,
  HelpCircle,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Maximize2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  PNBP_KEPELABUHANAN_DATA,
  PNBP_PER_SATKER_SUMMARY,
  TREN_PNBP_DAN_BELANJA_BULANAN,
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
  const [viewMode, setViewMode] = useState<'dual-axis' | 'donut' | 'table'>('dual-axis');
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
                Kinerja Keuangan: Realisasi PNBP vs Serapan Belanja Kepelabuhanan
              </h3>
              <TableauShelvesBadge
                showMe="#3 Dual-Axis Bar & Line"
                rows="SUM([Nilai Rp])"
                columns="[Bulan], [Jenis Anggaran]"
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
            {/* View Switcher */}
            <div className="inline-flex bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setViewMode('dual-axis')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'dual-axis'
                    ? 'bg-white text-[#1F4E79] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Tren Dual-Axis</span>
              </button>
              <button
                onClick={() => setViewMode('donut')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'donut'
                    ? 'bg-white text-[#1F4E79] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PieChartIcon className="w-3.5 h-3.5" />
                <span>Satker &amp; Pagu</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#1F4E79] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Matriks Detail</span>
              </button>
            </div>

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

        {/* VIEW 1: DUAL-AXIS BAR & LINE */}
        {viewMode === 'dual-axis' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span className="font-semibold text-slate-700">
                Tren Bulanan PNBP (Batang Hijau) vs Belanja (Batang Biru) &amp; Target (Garis Putus)
              </span>
              <span className="font-mono text-[10.5px] text-slate-500">Satuan: Miliar Rupiah</span>
            </div>

            {/* Custom SVG Dual-Axis Chart */}
            <div className="h-44 w-full relative">
              <svg viewBox="0 0 600 160" className="w-full h-full">
                {/* Horizontal Grid lines */}
                <line x1="40" y1="20" x2="580" y2="20" stroke="#E2E8F0" strokeDasharray="2 2" />
                <line x1="40" y1="60" x2="580" y2="60" stroke="#E2E8F0" strokeDasharray="2 2" />
                <line x1="40" y1="100" x2="580" y2="100" stroke="#E2E8F0" strokeDasharray="2 2" />
                <line x1="40" y1="140" x2="580" y2="140" stroke="#CBD5E1" />

                {/* Y-Axis Labels Left (PNBP/Belanja in Miliar) */}
                <text x="32" y="24" textAnchor="end" className="text-[9px] fill-slate-400 font-mono">140M</text>
                <text x="32" y="64" textAnchor="end" className="text-[9px] fill-slate-400 font-mono">90M</text>
                <text x="32" y="104" textAnchor="end" className="text-[9px] fill-slate-400 font-mono">50M</text>
                <text x="32" y="144" textAnchor="end" className="text-[9px] fill-slate-400 font-mono">0</text>

                {/* Bars for Each Month */}
                {TREN_PNBP_DAN_BELANJA_BULANAN.map((item, idx) => {
                  const xBase = 65 + idx * 88;
                  const pnbpHeight = (item.pnbpMiliar / 140) * 120;
                  const belanjaHeight = (item.belanjaMiliar / 140) * 120;

                  return (
                    <g key={item.bulan}>
                      {/* PNBP Bar (Green) */}
                      <rect
                        x={xBase}
                        y={140 - pnbpHeight}
                        width="24"
                        height={pnbpHeight}
                        rx="3"
                        className="fill-emerald-600 hover:fill-emerald-500 transition-colors"
                      />
                      {/* Belanja Bar (Blue) */}
                      <rect
                        x={xBase + 26}
                        y={140 - belanjaHeight}
                        width="24"
                        height={belanjaHeight}
                        rx="3"
                        className="fill-[#1F4E79] hover:fill-[#2B6CB0] transition-colors"
                      />

                      {/* Values */}
                      <text
                        x={xBase + 12}
                        y={135 - pnbpHeight}
                        textAnchor="middle"
                        className="text-[8.5px] font-mono font-bold fill-emerald-800"
                      >
                        {item.pnbpMiliar}
                      </text>
                      <text
                        x={xBase + 38}
                        y={135 - belanjaHeight}
                        textAnchor="middle"
                        className="text-[8.5px] font-mono font-bold fill-blue-900"
                      >
                        {item.belanjaMiliar}
                      </text>

                      {/* Month Label */}
                      <text
                        x={xBase + 25}
                        y="155"
                        textAnchor="middle"
                        className="text-[10px] fill-slate-600 font-medium"
                      >
                        {item.bulan}
                      </text>
                    </g>
                  );
                })}

                {/* Target Line (Dotted Red Line for Target PNBP) */}
                <path
                  d="M 85 42 L 173 39 L 261 35 L 349 33 L 437 33 L 525 28"
                  fill="none"
                  stroke="#E15759"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-5 text-[10.5px] text-slate-600 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600" />
                <span className="font-semibold">Realisasi PNBP (Miliar)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#1F4E79]" />
                <span className="font-semibold">Realisasi Belanja (Miliar)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-red-500 border-t-2 border-dashed border-red-500" />
                <span>Target Bulanan (DIPA)</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: BREAKDOWN PER SATKER & PAGU */}
        {viewMode === 'donut' && (
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
        )}

        {/* VIEW 3: MATRIKS DETAIL */}
        {viewMode === 'table' && (
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto max-h-[220px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#0B1728] text-white text-[10.5px] font-semibold sticky top-0 z-10">
                  <tr>
                    <th className="py-2 px-2.5">COA</th>
                    <th className="py-2 px-2.5">Jenis Layanan / Akun</th>
                    <th className="py-2 px-2.5">Terminal / Satker</th>
                    <th className="py-2 px-2.5 text-right">Target (IDR)</th>
                    <th className="py-2 px-2.5 text-right">Realisasi (IDR)</th>
                    <th className="py-2 px-2.5 text-center">Capaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                  {PNBP_KEPELABUHANAN_DATA.map((row) => {
                    const pct = Math.round((row.jumlahRp / row.targetRp) * 1000) / 10;
                    return (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-1.5 px-2.5 font-mono text-slate-500 font-bold">{row.coa}</td>
                        <td className="py-1.5 px-2.5 font-semibold text-slate-900">{row.jenisLayanan}</td>
                        <td className="py-1.5 px-2.5 text-slate-600">{row.terminalSatker}</td>
                        <td className="py-1.5 px-2.5 text-right font-mono text-slate-500">
                          Rp {(row.targetRp / 1000000000).toFixed(2)} M
                        </td>
                        <td className="py-1.5 px-2.5 text-right font-mono font-bold text-emerald-700">
                          Rp {(row.jumlahRp / 1000000000).toFixed(2)} M
                        </td>
                        <td className="py-1.5 px-2.5 text-center">
                          <span className="px-1.5 py-0.2 rounded font-bold text-[9.5px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {pct}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
