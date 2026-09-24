import React, { useState } from 'react';
import {
  Ship,
  TrendingUp,
  BarChart3,
  Table as TableIcon,
  Compass,
  Layers,
  Globe2,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import {
  KUNJUNGAN_KAPAL_SUMMARY,
  TREN_KUNJUNGAN_BULANAN,
} from '../../data/kepelabuhananData';
import { PelabuhanVisualHeader } from './PelabuhanVisualHeader';

interface PelabuhanKunjunganKapalSheetSwapProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const PelabuhanKunjunganKapalSheetSwap: React.FC<PelabuhanKunjunganKapalSheetSwapProps> = ({
  onOpenFormulaModal,
}) => {
  // SHEET SWAP STATE
  const [activeSheet, setActiveSheet] = useState<'tren-bulanan' | 'tabel-detail' | 'distribusi-armada'>('tren-bulanan');
  const [hoveredMonth, setHoveredMonth] = useState<typeof TREN_KUNJUNGAN_BULANAN[0] | null>(null);

  const { totalCallSeluruh, totalGtSeluruhJuta, kapalBarang, kapalPenumpang } = KUNJUNGAN_KAPAL_SUMMARY;

  const persenBarangCall = Math.round((kapalBarang.totalCall / totalCallSeluruh) * 1000) / 10;
  const persenPenumpangCall = Math.round((kapalPenumpang.totalCall / totalCallSeluruh) * 1000) / 10;

  // Chart configuration constants for SVG
  const chartWidth = 900;
  const chartHeight = 310;
  const padLeft = 65;
  const padRight = 65;
  const padTop = 35;
  const padBottom = 45;
  const plotW = chartWidth - padLeft - padRight; // 770
  const plotH = chartHeight - padTop - padBottom; // 230

  const maxCall = 12000;
  const maxGt = 20;

  // Calculate coordinates for the 6 months
  const monthData = TREN_KUNJUNGAN_BULANAN.map((item, idx) => {
    const xStep = plotW / TREN_KUNJUNGAN_BULANAN.length;
    const cx = padLeft + (idx + 0.5) * xStep;
    const barWidth = 26;
    const barGap = 6;
    const xBarang = cx - barWidth - barGap / 2;
    const xPenumpang = cx + barGap / 2;

    const hBarang = (item.callBarang / maxCall) * plotH;
    const yBarang = padTop + plotH - hBarang;

    const hPenumpang = (item.callPenumpang / maxCall) * plotH;
    const yPenumpang = padTop + plotH - hPenumpang;

    const yGt = padTop + plotH - (item.gtTotalJuta / maxGt) * plotH;

    return {
      ...item,
      cx,
      xBarang,
      xPenumpang,
      barWidth,
      hBarang,
      yBarang,
      hPenumpang,
      yPenumpang,
      yGt,
    };
  });

  // Polyline for GT Line
  const gtPoints = monthData.map((d) => `${d.cx},${d.yGt}`).join(' ');
  const gtAreaPoints = `${monthData[0].cx},${padTop + plotH} ${gtPoints} ${monthData[monthData.length - 1].cx},${padTop + plotH}`;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs font-sans">
      {/* 1. STANDARDIZED VISUAL HEADER (REQ 9) */}
      <PelabuhanVisualHeader
        datasetNumber={5}
        pdfPages="Hal. 15 (No. 5 & 7)"
        title="Rekapitulasi Kunjungan Kapal Barang dan Penumpang"
        visualName="Sheet Swap - Tren Bulanan (Area/Line) & Tabel Detail Kunjungan Kapal"
        classification="TERBUKA"
        attributes={[
          'PELABUHAN',
          'CALL KAPAL',
          'GT KAPAL',
          'TIPE KAPAL',
          'CALL DALAM',
          'CALL LUAR',
          'GT DALAM',
          'GT LUAR',
        ]}
        rightControls={
          /* SHEET SWAP SELECTOR (REQ 4) */
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveSheet('tren-bulanan')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'tren-bulanan'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Sheet 1: Tren Bulanan</span>
            </button>
            <button
              onClick={() => setActiveSheet('tabel-detail')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'tabel-detail'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Sheet 2: Tabel Detail</span>
            </button>
            <button
              onClick={() => setActiveSheet('distribusi-armada')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'distribusi-armada'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Sheet 3: Distribusi Armada</span>
            </button>
          </div>
        }
        onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('kpi-kunjungan-kapal')}
      />

      {/* 2. SUMMARY METRICS BANNER */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-100 mb-4">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Total Call Kapal
          </span>
          <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
            {totalCallSeluruh.toLocaleString('id-ID')} Call
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Kapal Barang (Cargo &amp; Tanker)
          </span>
          <span className="text-base sm:text-lg font-black text-sky-700 font-mono">
            {kapalBarang.totalCall.toLocaleString('id-ID')} Call ({persenBarangCall}%)
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Kapal Penumpang &amp; Feri Cepat
          </span>
          <span className="text-base sm:text-lg font-black text-emerald-700 font-mono">
            {kapalPenumpang.totalCall.toLocaleString('id-ID')} Call ({persenPenumpangCall}%)
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Total Tonase Kapal
          </span>
          <span className="text-base sm:text-lg font-black text-purple-700 font-mono">
            {totalGtSeluruhJuta} Juta GT
          </span>
        </div>
      </div>

      {/* 3. SHEET SWAP CONTAINER */}
      {/* SHEET 1: REAL DUAL-AXIS COMBO CHART (GRAFIK BUKAN KOTAK-KOTAK) */}
      {activeSheet === 'tren-bulanan' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">
                Grafik Kombinasi Arus Kunjungan Kapal &amp; Tonase Bulanan
              </span>
              <span className="text-[10.5px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                Semester I TA 2026
              </span>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 text-sky-700 font-bold">
                <span className="w-3 h-3 rounded-xs bg-sky-600 inline-block shadow-2xs" />
                Kapal Barang (Call)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block shadow-2xs" />
                Kapal Penumpang (Call)
              </span>
              <span className="flex items-center gap-1.5 text-purple-700 font-bold">
                <span className="w-3 h-0.5 bg-purple-600 inline-block" />
                <span className="w-2 h-2 rounded-full bg-purple-600 inline-block -ml-2" />
                Total Tonase (Juta GT)
              </span>
            </div>
          </div>

          {/* SVG UNIFIED COMBO CHART */}
          <div className="w-full bg-slate-900 rounded-xl p-3 sm:p-4 text-white shadow-md relative overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto select-none"
            >
              <defs>
                {/* Purple gradient for GT area */}
                <linearGradient id="gtGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                </linearGradient>
                {/* Sky gradient for Barang bar */}
                <linearGradient id="barangGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                {/* Emerald gradient for Penumpang bar */}
                <linearGradient id="penumpangGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>

              {/* Grid Lines & Left Y-Axis (Call Kapal) */}
              {[0, 3000, 6000, 9000, 12000].map((val) => {
                const y = padTop + plotH - (val / maxCall) * plotH;
                const gtVal = (val / maxCall) * maxGt;
                return (
                  <g key={val}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={chartWidth - padRight}
                      y2={y}
                      stroke="#334155"
                      strokeDasharray={val === 0 ? '0' : '4,4'}
                      strokeWidth="1"
                    />
                    {/* Left label: Call */}
                    <text
                      x={padLeft - 10}
                      y={y + 3}
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="end"
                    >
                      {val.toLocaleString('id-ID')}
                    </text>
                    {/* Right label: GT */}
                    <text
                      x={chartWidth - padRight + 10}
                      y={y + 3}
                      fill="#c084fc"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="start"
                    >
                      {gtVal.toFixed(0)}M GT
                    </text>
                  </g>
                );
              })}

              {/* Axis Titles */}
              <text
                x={padLeft - 12}
                y={padTop - 12}
                fill="#94a3b8"
                fontSize="9.5"
                fontFamily="sans-serif"
                fontWeight="bold"
                textAnchor="end"
              >
                CALL KAPAL
              </text>
              <text
                x={chartWidth - padRight + 12}
                y={padTop - 12}
                fill="#c084fc"
                fontSize="9.5"
                fontFamily="sans-serif"
                fontWeight="bold"
                textAnchor="start"
              >
                GROSS TONNAGE (GT)
              </text>

              {/* GT Area fill */}
              <polygon points={gtAreaPoints} fill="url(#gtGradient)" />

              {/* Monthly Clustered Bars */}
              {monthData.map((d) => {
                const isHovered = hoveredMonth?.bulan === d.bulan;
                return (
                  <g
                    key={d.bulan}
                    className="cursor-pointer transition-opacity"
                    onMouseEnter={() => setHoveredMonth(d)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    {/* Hover highlight column band */}
                    {isHovered && (
                      <rect
                        x={d.cx - 50}
                        y={padTop}
                        width="100"
                        height={plotH}
                        fill="#38bdf8"
                        fillOpacity="0.08"
                        rx="4"
                      />
                    )}

                    {/* Bar Barang */}
                    <rect
                      x={d.xBarang}
                      y={d.yBarang}
                      width={d.barWidth}
                      height={d.hBarang}
                      fill="url(#barangGrad)"
                      rx="3"
                    />
                    {/* Value text above Barang bar */}
                    <text
                      x={d.xBarang + d.barWidth / 2}
                      y={d.yBarang - 5}
                      fill="#38bdf8"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {d.callBarang}
                    </text>

                    {/* Bar Penumpang */}
                    <rect
                      x={d.xPenumpang}
                      y={d.yPenumpang}
                      width={d.barWidth}
                      height={d.hPenumpang}
                      fill="url(#penumpangGrad)"
                      rx="3"
                    />
                    {/* Value text above Penumpang bar */}
                    <text
                      x={d.xPenumpang + d.barWidth / 2}
                      y={d.yPenumpang - 5}
                      fill="#34d399"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {d.callPenumpang}
                    </text>

                    {/* Month Label on X-Axis */}
                    <text
                      x={d.cx}
                      y={chartHeight - padBottom + 18}
                      fill={isHovered ? '#38bdf8' : '#e2e8f0'}
                      fontSize="11"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {d.bulan}
                    </text>
                    <text
                      x={d.cx}
                      y={chartHeight - padBottom + 30}
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      Tot: {(d.callBarang + d.callPenumpang).toLocaleString('id-ID')}
                    </text>
                  </g>
                );
              })}

              {/* GT Polyline */}
              <polyline
                points={gtPoints}
                fill="none"
                stroke="#c084fc"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* GT Data Points & Value Badges */}
              {monthData.map((d) => (
                <g key={`pt-${d.bulan}`}>
                  <circle
                    cx={d.cx}
                    cy={d.yGt}
                    r="4.5"
                    fill="#a855f7"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <rect
                    x={d.cx - 24}
                    y={d.yGt - 20}
                    width="48"
                    height="14"
                    rx="3"
                    fill="#581c87"
                    stroke="#a855f7"
                    strokeWidth="1"
                  />
                  <text
                    x={d.cx}
                    y={d.yGt - 10}
                    fill="#f3e8ff"
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {d.gtTotalJuta}M GT
                  </text>
                </g>
              ))}
            </svg>

            {/* Interactive Inspector Pill on bottom right */}
            <div className="mt-2 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  {hoveredMonth ? (
                    <span>
                      Rincian Bulan <strong className="text-white">{hoveredMonth.bulan}</strong>: 
                      Barang: <strong className="text-sky-300 font-mono">{hoveredMonth.callBarang} Call</strong> | 
                      Penumpang: <strong className="text-emerald-300 font-mono">{hoveredMonth.callPenumpang} Call</strong> | 
                      Total: <strong className="text-white font-mono">{(hoveredMonth.callBarang + hoveredMonth.callPenumpang).toLocaleString('id-ID')} Call</strong> | 
                      Dalam Negeri: <strong className="text-slate-200 font-mono">{hoveredMonth.callDalam}</strong> | 
                      Luar Negeri (Ocean): <strong className="text-sky-200 font-mono">{hoveredMonth.callLuar}</strong> | 
                      Tonase: <strong className="text-purple-300 font-mono">{hoveredMonth.gtTotalJuta} Juta GT</strong>
                    </span>
                  ) : (
                    <span>Arahkan kursor pada batang bulan untuk melihat rincian call dalam vs luar negeri secara interaktif.</span>
                  )}
                </span>
              </div>
              <span className="font-mono text-[10.5px] text-slate-400">
                Data Terverifikasi Port Operations (BP Batam BMS)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SHEET 2: TABEL DETAIL */}
      {activeSheet === 'tabel-detail' && (
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3">PERIODE BULAN</th>
                <th className="py-2.5 px-3 text-right">CALL KAPAL BARANG</th>
                <th className="py-2.5 px-3 text-right">CALL KAPAL PENUMPANG</th>
                <th className="py-2.5 px-3 text-right">TOTAL CALL KAPAL</th>
                <th className="py-2.5 px-3 text-right">TOTAL TONASE (JUTA GT)</th>
                <th className="py-2.5 px-3 text-right">CALL DALAM NEGERI</th>
                <th className="py-2.5 px-3 text-right">CALL LUAR NEGERI (OCEAN)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
              {TREN_KUNJUNGAN_BULANAN.map((item) => (
                <tr key={item.bulan} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold font-sans text-slate-900">{item.bulan} 2026</td>
                  <td className="py-2.5 px-3 text-right font-bold text-sky-700">
                    {item.callBarang.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                    {item.callPenumpang.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                    {(item.callBarang + item.callPenumpang).toLocaleString('id-ID')}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-purple-700">
                    {item.gtTotalJuta} Juta GT
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-600">{item.callDalam.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-3 text-right text-sky-700 font-bold">{item.callLuar.toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-bold border-t border-slate-200 font-mono text-slate-900">
              <tr>
                <td className="py-2.5 px-3 font-sans">TOTAL SEMESTER I (6 BULAN)</td>
                <td className="py-2.5 px-3 text-right text-sky-700">
                  {TREN_KUNJUNGAN_BULANAN.reduce((acc, c) => acc + c.callBarang, 0).toLocaleString('id-ID')}
                </td>
                <td className="py-2.5 px-3 text-right text-emerald-700">
                  {TREN_KUNJUNGAN_BULANAN.reduce((acc, c) => acc + c.callPenumpang, 0).toLocaleString('id-ID')}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-900">
                  {TREN_KUNJUNGAN_BULANAN.reduce((acc, c) => acc + c.callBarang + c.callPenumpang, 0).toLocaleString('id-ID')}
                </td>
                <td className="py-2.5 px-3 text-right text-purple-700">61,4 Juta GT</td>
                <td className="py-2.5 px-3 text-right text-slate-600">30.820</td>
                <td className="py-2.5 px-3 text-right text-sky-700">17.830</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* SHEET 3: DISTRIBUSI ARMADA */}
      {activeSheet === 'distribusi-armada' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50">
            <div className="flex items-center gap-2 mb-2">
              <Ship className="w-5 h-5 text-sky-700" />
              <h4 className="font-bold text-slate-900 text-sm">Armada Kapal Barang (Cargo &amp; Tanker)</h4>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Melayani pengiriman kontainer peti kemas internasional/domestik, curah cair kelapa sawit &amp; minyak bumi, serta kargo curah kering galangan kapal.
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-sky-100">
                <span className="text-slate-600">Total Kunjungan:</span>
                <span className="font-bold text-sky-800">{kapalBarang.totalCall.toLocaleString('id-ID')} Call</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sky-100">
                <span className="text-slate-600">Total Gross Tonnage (GT):</span>
                <span className="font-bold text-sky-800">{kapalBarang.totalGtJuta} Juta GT</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sky-100">
                <span className="text-slate-600">Proporsi Kunjungan:</span>
                <span className="font-bold text-sky-800">{persenBarangCall}%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Pelabuhan Utama:</span>
                <span className="font-bold text-slate-800 font-sans">Batu Ampar &amp; Kabil</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <div className="flex items-center gap-2 mb-2">
              <Ship className="w-5 h-5 text-emerald-700" />
              <h4 className="font-bold text-slate-900 text-sm">Armada Kapal Penumpang &amp; Feri Cepat</h4>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Melayani pergerakan penumpang rute internasional (Singapura &amp; Malaysia) serta pelayaran domestik antar-pulau Kepri, Dumai, dan Kuala Tungkal.
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-emerald-100">
                <span className="text-slate-600">Total Kunjungan:</span>
                <span className="font-bold text-emerald-800">{kapalPenumpang.totalCall.toLocaleString('id-ID')} Call</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-100">
                <span className="text-slate-600">Total Gross Tonnage (GT):</span>
                <span className="font-bold text-emerald-800">{kapalPenumpang.totalGtJuta} Juta GT</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-100">
                <span className="text-slate-600">Proporsi Kunjungan:</span>
                <span className="font-bold text-emerald-800">{persenPenumpangCall}%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Pelabuhan Utama:</span>
                <span className="font-bold text-slate-800 font-sans">Batam Centre, Harbour Bay, Sekupang</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
