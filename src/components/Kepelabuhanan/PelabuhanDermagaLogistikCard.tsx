import React, { useState } from 'react';
import {
  Anchor,
  Box,
  Layers,
  MapPin,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Table as TableIcon,
  HelpCircle,
  Lightbulb,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  DAFTAR_DERMAGA_DATA,
  DERMAGA_SUMMARY,
  BONGKAR_MUAT_BATU_AMPAR_DATA,
  TOTAL_BONGKAR_MUAT_TAHUN,
} from '../../data/kepelabuhananData';
import { PelabuhanDatasetBadge } from './PelabuhanDatasetBadge';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PelabuhanDermagaLogistikCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const PelabuhanDermagaLogistikCard: React.FC<PelabuhanDermagaLogistikCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'dermaga-bor' | 'petikemas-teus' | 'daftar-dermaga'>('dermaga-bor');
  const [showFormula, setShowFormula] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* CARD HEADER */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/70">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center">
                <Anchor className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Fasilitas Dermaga &amp; Throughput Peti Kemas (TEUs) Batu Ampar
              </h3>
              <TableauShelvesBadge
                showMe="#14 Clustered Bar & Area"
                rows="[Pelabuhan], [Dermaga], SUM([TEUs])"
                columns="[Bulan], [BOR %]"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <PelabuhanDatasetBadge
                datasetNumber={4}
                datasetName="Daftar Dermaga yang Dikelola BP Batam"
                classification="TERBUKA"
                period="Jika Update"
                pdfPages="Hal. 15"
                tableId="daftar_dermaga"
              />
              <span className="text-slate-300">|</span>
              <PelabuhanDatasetBadge
                datasetNumber={23}
                datasetName="Bongkar Muat Peti Kemas Batu Ampar (TEUs)"
                classification="TERBUKA"
                period="Per Tahun / Bulan"
                pdfPages="Hal. 17"
                tableId="bongkar_muat_batu_ampar"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* View Switcher */}
            <div className="inline-flex bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setViewMode('dermaga-bor')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'dermaga-bor'
                    ? 'bg-white text-[#1F4E79] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Anchor className="w-3.5 h-3.5" />
                <span>BOR &amp; Utilitas</span>
              </button>
              <button
                onClick={() => setViewMode('petikemas-teus')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'petikemas-teus'
                    ? 'bg-white text-[#1F4E79] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>TEUs Batu Ampar</span>
              </button>
              <button
                onClick={() => setViewMode('daftar-dermaga')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'daftar-dermaga'
                    ? 'bg-white text-[#1F4E79] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Daftar 24 Dermaga</span>
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
                  Rumus Tableau: Tingkat Pemakaian Dermaga (BOR) &amp; Throughput Peti Kemas (TEUs)
                </span>
                <p className="text-slate-600 text-[10.5px] mt-0.5">
                  Satu Data Item #4 (Dermaga) &amp; Item #22-24 (Bongkar Muat): Mengukur efisiensi okupansi dermaga dan volume arus barang logistik ekspor-impor.
                </p>
              </div>
              <button
                onClick={() => onOpenFormulaModal && onOpenFormulaModal('pelabuhan_dermaga')}
                className="px-2 py-1 bg-[#1F4E79] text-white rounded text-[10.5px] font-bold shrink-0 hover:bg-[#163756] cursor-pointer"
              >
                Buka di Kamus Formula Eksekutif
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[10.5px]">
              <div className="bg-white p-2 rounded border border-blue-100">
                <span className="text-slate-500 font-sans block text-[9.5px] font-bold">1. BERTH OCCUPANCY RATIO (BOR %):</span>
                <code className="text-teal-900 font-bold">
                  [BOR %] = (SUM([WAKTU_TAMBAT_JAM]) / ([PANJANG_DERMAGA] * 24 * [HARI_PERIODE])) * 100
                </code>
              </div>
              <div className="bg-white p-2 rounded border border-blue-100">
                <span className="text-slate-500 font-sans block text-[9.5px] font-bold">2. TOTAL THROUGHPUT PETI KEMAS:</span>
                <code className="text-blue-900 font-bold">
                  [Total TEUs] = SUM([BONGKAR_TEUS]) + SUM([MUAT_TEUS])
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
              Dermaga Aktif (DS-4)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-slate-900">
                {DERMAGA_SUMMARY.totalDermaga} Fasilitas
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500">Panjang: 3.840 m • Max -14 MLWS</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Rata-rata BOR Pelabuhan
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-teal-700">
                {DERMAGA_SUMMARY.rataRataBorPersen}%
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800">
                Standar UNCTAD Ideal
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500">Batas Rekomendasi: 60 - 70%</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Throughput Peti Kemas (DS-23)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-[#1F4E79]">
                {TOTAL_BONGKAR_MUAT_TAHUN.totalTeusYtd.toLocaleString('id-ID')}
              </span>
              <span className="text-[10.5px] font-bold text-slate-500">TEUs</span>
            </div>
            <span className="text-[9.5px] text-slate-500">Target 2026: 650.000 TEUs</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Dwell Time Pelabuhan
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-extrabold text-emerald-700">
                {TOTAL_BONGKAR_MUAT_TAHUN.dwellTimeHari} Hari
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                &lt; 3 Hari (Cepat)
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500">Efisiensi bongkar muat STS prima</span>
          </div>
        </div>

        {/* VIEW 1: DERMAGA BOR */}
        {viewMode === 'dermaga-bor' && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 block">
              Tingkat Keterisian Dermaga Utama (Berth Occupancy Ratio - BOR)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {DAFTAR_DERMAGA_DATA.slice(0, 6).map((d) => (
                <div key={d.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-[10px] font-bold text-slate-500">
                      {d.pelabuhan}
                    </span>
                    <span className="font-mono font-bold text-xs text-teal-700">
                      BOR: {d.berthOccupancyRatio}%
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 line-clamp-1 block mb-1">
                    {d.dermaga}
                  </span>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-1">
                    <div
                      className={`h-1.5 rounded-full ${
                        d.berthOccupancyRatio > 70
                          ? 'bg-amber-500'
                          : 'bg-teal-600'
                      }`}
                      style={{ width: `${d.berthOccupancyRatio}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9.5px] text-slate-500 font-mono">
                    <span>Panjang: {d.panjangM}m</span>
                    <span>Kedalaman: -{d.kedalamanMlws} MLWS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: TEUS BATU AMPAR */}
        {viewMode === 'petikemas-teus' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span className="font-semibold text-slate-700">
                Arus Peti Kemas Terminal Batu Ampar (Bongkar vs Muat dalam TEUs)
              </span>
              <span className="font-mono text-[10.5px] text-slate-500">YTD 2026: 210.000 TEUs</span>
            </div>

            <div className="h-36 w-full relative">
              <svg viewBox="0 0 600 130" className="w-full h-full">
                <line x1="40" y1="20" x2="580" y2="20" stroke="#E2E8F0" strokeDasharray="2 2" />
                <line x1="40" y1="65" x2="580" y2="65" stroke="#E2E8F0" strokeDasharray="2 2" />
                <line x1="40" y1="110" x2="580" y2="110" stroke="#CBD5E1" />

                <text x="32" y="24" textAnchor="end" className="text-[9px] fill-slate-400 font-mono">35k</text>
                <text x="32" y="69" textAnchor="end" className="text-[9px] fill-slate-400 font-mono">20k</text>
                <text x="32" y="114" textAnchor="end" className="text-[9px] fill-slate-400 font-mono">0</text>

                {BONGKAR_MUAT_BATU_AMPAR_DATA.map((item, idx) => {
                  const xBase = 80 + idx * 125;
                  const bongkarHeight = (item.bongkarTeus / 35000) * 90;
                  const muatHeight = (item.muatTeus / 35000) * 90;

                  return (
                    <g key={item.bulan}>
                      {/* Bongkar TEUs */}
                      <rect
                        x={xBase}
                        y={110 - bongkarHeight}
                        width="26"
                        height={bongkarHeight}
                        rx="3"
                        className="fill-blue-600"
                      />
                      {/* Muat TEUs */}
                      <rect
                        x={xBase + 28}
                        y={110 - muatHeight}
                        width="26"
                        height={muatHeight}
                        rx="3"
                        className="fill-teal-600"
                      />

                      <text
                        x={xBase + 13}
                        y={105 - bongkarHeight}
                        textAnchor="middle"
                        className="text-[8.5px] font-mono font-bold fill-blue-900"
                      >
                        {(item.bongkarTeus / 1000).toFixed(1)}k
                      </text>
                      <text
                        x={xBase + 41}
                        y={105 - muatHeight}
                        textAnchor="middle"
                        className="text-[8.5px] font-mono font-bold fill-teal-900"
                      >
                        {(item.muatTeus / 1000).toFixed(1)}k
                      </text>

                      <text
                        x={xBase + 27}
                        y="124"
                        textAnchor="middle"
                        className="text-[10px] fill-slate-700 font-semibold"
                      >
                        {item.bulan}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex items-center justify-center gap-6 text-[10.5px] text-slate-600 pt-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-600" />
                <span className="font-semibold">Bongkar Peti Kemas (Inbound TEUs)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-teal-600" />
                <span className="font-semibold">Muat Peti Kemas (Outbound TEUs)</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: DAFTAR 24 DERMAGA DETAIL */}
        {viewMode === 'daftar-dermaga' && (
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto max-h-[220px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#0B1728] text-white text-[10.5px] font-semibold sticky top-0 z-10">
                  <tr>
                    <th className="py-2 px-2.5">No</th>
                    <th className="py-2 px-2.5">Gugus Pelabuhan</th>
                    <th className="py-2 px-2.5">Nama Fasilitas Dermaga</th>
                    <th className="py-2 px-2.5">Peruntukan</th>
                    <th className="py-2 px-2.5 text-right">Kedalaman (MLWS)</th>
                    <th className="py-2 px-2.5 text-right">Panjang (m)</th>
                    <th className="py-2 px-2.5 text-center">BOR %</th>
                    <th className="py-2 px-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                  {DAFTAR_DERMAGA_DATA.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-1.5 px-2.5 font-mono text-slate-500 font-bold">#{d.no}</td>
                      <td className="py-1.5 px-2.5 font-bold text-slate-900">{d.pelabuhan}</td>
                      <td className="py-1.5 px-2.5 font-semibold text-[#1F4E79]">{d.dermaga}</td>
                      <td className="py-1.5 px-2.5">
                        <span className="px-1.5 py-0.2 rounded font-medium text-[9.5px] bg-slate-100 text-slate-700">
                          {d.peruntukan}
                        </span>
                      </td>
                      <td className="py-1.5 px-2.5 text-right font-mono font-semibold text-slate-800">
                        -{d.kedalamanMlws} m
                      </td>
                      <td className="py-1.5 px-2.5 text-right font-mono text-slate-700">
                        {d.panjangM} m
                      </td>
                      <td className="py-1.5 px-2.5 text-center font-mono font-bold text-teal-700">
                        {d.berthOccupancyRatio}%
                      </td>
                      <td className="py-1.5 px-2.5 text-center">
                        <span className="px-1.5 py-0.2 rounded-full font-bold text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {d.statusOperasional}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STRATEGIC EXECUTIVE INSIGHT */}
        <div className="mt-3 p-2.5 rounded-lg bg-teal-50/70 border-l-4 border-teal-600 border border-teal-200/80">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed text-slate-800">
              <span className="font-bold text-teal-950 block">
                Insight Strategis Pimpinan (Optimalisasi Dermaga &amp; Logistik Batu Ampar):
              </span>
              <p className="mt-0.5 text-slate-700">
                Tingkat pemanfaatan dermaga (BOR) rata-rata berada pada kisaran optimal <strong>64,8%</strong> (standar UNCTAD 60-70%), mencegah kongesti kapal di perairan Selat Singapura. Peningkatan operasional STS Crane baru di Dermaga Utara berhasil memangkas <em>dwell time</em> menjadi <strong>2,8 hari</strong> dan memacu throughput peti kemas mencapai <strong>210.000 TEUs</strong> dalam 4 bulan pertama.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
