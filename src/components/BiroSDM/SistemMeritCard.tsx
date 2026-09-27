import React, { useState } from 'react';
import {
  Award,
  Radar as RadarIcon,
  Table as TableIcon,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  Info,
} from 'lucide-react';
import { SistemMeritAspect, SistemMeritDatasetRow } from './types';
import { STANDAR_KASN_KONVERSI } from './sdmData';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface SistemMeritCardProps {
  aspekList: SistemMeritAspect[];
  datasetRow: SistemMeritDatasetRow;
  tahun: number;
  onOpenFormulaModal: (formulaType: string) => void;
}

export const SistemMeritCard: React.FC<SistemMeritCardProps> = ({
  aspekList = [],
  datasetRow,
  tahun,
  onOpenFormulaModal,
}) => {
  const safeAspekList = aspekList || [];
  const [activeTab, setActiveTab] = useState<'radar' | 'cards' | 'dataset' | 'kategori'>('radar');
  const [selectedAspek, setSelectedAspek] = useState<SistemMeritAspect | null>(safeAspekList[0] || null);

  // Radar Chart coordinates math (8 vertices)
  const size = 320;
  const center = size / 2;
  const maxRadius = 115;
  const numAspects = safeAspekList.length || 1;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI * 2 / numAspects) * index - Math.PI / 2;
    const r = maxRadius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Polygon for actual index values (0.0 - 1.0)
  const polygonPoints = safeAspekList
    .map((item, idx) => {
      const { x, y } = getCoordinates(idx, item.indeksAspek);
      return `${x},${y}`;
    })
    .join(' ');

  // Outer reference ring polygon (target = 1.0)
  const targetPoints = safeAspekList
    .map((_, idx) => {
      const { x, y } = getCoordinates(idx, 1.0);
      return `${x},${y}`;
    })
    .join(' ');

  // Mid reference ring polygon (baseline = 0.75)
  const midPoints = safeAspekList
    .map((_, idx) => {
      const { x, y } = getCoordinates(idx, 0.75);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* HEADER WITH AGGREGATE EXECUTIVE STATUS */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 via-indigo-50/20 to-slate-50/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Penilaian Indeks Sistem Merit BP Batam (8 Aspek KASN)
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Katalog Satu Data Hal. 2 Dataset #12 · Agregasi 8 Aspek KASN: Perencanaan, Pengadaan, Karir, Mutasi, Kinerja, Penggajian/Disiplin, Perlindungan, dan Sistem Informasi.
            </p>
          </div>

          {/* TOTAL SCORE SUMMARY BADGE */}
          <div className="flex items-center gap-3 bg-white p-2.5 sm:p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Total Skor / Indeks
              </span>
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-700 tabular-nums">
                  {datasetRow.TOTAL_NILAI_MERIT.toFixed(1)}
                </span>
                <span className="text-xs font-mono text-slate-400">/ 400</span>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Status Pemenuhan
              </span>
              <span className="text-xs sm:text-sm font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {datasetRow.STATUS_PEMENUHAN}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Indeks: {datasetRow.INDEKS_SISTEM_MERIT.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* VIEW TABS */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-200/70">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveTab('radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'radar'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RadarIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Radar Chart (8 Aspek)</span>
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'cards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kartu Rincian Aspek</span>
            </button>
            <button
              onClick={() => setActiveTab('dataset')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'dataset'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
              <span>Tabel Master Dataset (Atribut Wajib)</span>
            </button>
            <button
              onClick={() => setActiveTab('kategori')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'kategori'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Tabel Kategori Sistem Merit</span>
            </button>
          </div>

          <button
            onClick={() => onOpenFormulaModal('merit')}
            className="flex items-center gap-1 text-xs text-indigo-700 hover:text-indigo-900 font-medium transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Kamus Rumus &amp; Konversi KASN</span>
          </button>
        </div>
      </div>

      {/* TAB 1: RADAR SPIDER CHART + DETAIL PANEL */}
      {activeTab === 'radar' && (
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG RADAR CHART (8 ASPEK) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
                  {/* Circular & polygon guidelines */}
                  <polygon
                    points={targetPoints}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <polygon
                    points={midPoints}
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="0.8"
                  />

                  {/* Axes lines */}
                  {aspekList.map((_, idx) => {
                    const { x, y } = getCoordinates(idx, 1.0);
                    return (
                      <line
                        key={`axis-${idx}`}
                        x1={center}
                        y1={center}
                        x2={x}
                        y2={y}
                        stroke="#E2E8F0"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Actual Achieved Polygon */}
                  <polygon
                    points={polygonPoints}
                    fill="rgba(16, 185, 129, 0.22)"
                    stroke="#059669"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />

                  {/* Vertices Interactive Points */}
                  {aspekList.map((aspek, idx) => {
                    const { x, y } = getCoordinates(idx, aspek.indeksAspek);
                    const isSelected = selectedAspek?.id === aspek.id;

                    return (
                      <g key={aspek.id} className="cursor-pointer">
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 6 : 4}
                          fill={isSelected ? '#059669' : '#10B981'}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          className="transition-all duration-200 hover:scale-125"
                          onClick={() => setSelectedAspek(aspek)}
                        />
                      </g>
                    );
                  })}

                  {/* Labels on outer edge */}
                  {aspekList.map((aspek, idx) => {
                    const angle = (Math.PI * 2 / numAspects) * idx - Math.PI / 2;
                    const labelR = maxRadius + 28;
                    const lx = center + labelR * Math.cos(angle);
                    const ly = center + labelR * Math.sin(angle);
                    const isSelected = selectedAspek?.id === aspek.id;

                    return (
                      <text
                        key={`label-${idx}`}
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className={`text-[9px] sm:text-[10px] transition-all cursor-pointer select-none ${
                          isSelected ? 'fill-emerald-800 font-bold' : 'fill-slate-600 font-medium'
                        }`}
                        onClick={() => setSelectedAspek(aspek)}
                      >
                        {aspek?.nama?.split(' ')?.[0] || aspek?.nama || ''}
                      </text>
                    );
                  })}
                </svg>
              </div>

              <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-emerald-600 rounded-full" />
                  <span>Capaian Riil BP Batam</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 border-t border-slate-300 border-dashed" />
                  <span>Target Maksimal (1.00)</span>
                </div>
              </div>
            </div>

            {/* SELECTED ASPECT HIGHLIGHT CARD (Easy for laypeople) */}
            <div className="lg:col-span-6 space-y-3.5">
              {selectedAspek ? (
                <div className="p-4 sm:p-5 rounded-xl border border-emerald-200/90 bg-emerald-50/30 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                        Detail Aspek Terpilih
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {selectedAspek.nama}
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {selectedAspek.statusPemenuhan}
                    </span>
                  </div>

                  {/* 4 CORE ATTRIBUTES STRIP */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-emerald-100 text-center">
                    <div className="p-2 bg-white rounded-lg border border-emerald-100/80">
                      <span className="text-[10px] text-slate-500 block">Bobot Aspek</span>
                      <span className="text-sm font-bold font-mono text-slate-900">
                        {selectedAspek.bobotPersen}%
                      </span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-100/80">
                      <span className="text-[10px] text-slate-500 block">Nilai Aspek</span>
                      <span className="text-sm font-bold font-mono text-emerald-700">
                        {selectedAspek.nilaiAspek.toFixed(1)} / {selectedAspek.nilaiMaks}
                      </span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-100/80">
                      <span className="text-[10px] text-slate-500 block">Indeks Aspek</span>
                      <span className="text-sm font-bold font-mono text-emerald-700">
                        {selectedAspek.indeksAspek.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedAspek.deskripsiRingkas}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-700 block">
                      Kondisi Pemenuhan Lapangan:
                    </span>
                    <ul className="space-y-1">
                      {selectedAspek.poinKunci.map((point, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              {/* QUICK ASPECT SELECTOR BUTTONS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {aspekList.map((aspek) => {
                  const isSelected = selectedAspek?.id === aspek.id;
                  return (
                    <button
                      key={aspek.id}
                      onClick={() => setSelectedAspek(aspek)}
                      className={`p-2 text-left rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span className="block font-semibold truncate">{aspek.nama}</span>
                      <span className={`text-[10px] font-mono block ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                        Indeks: {aspek.indeksAspek.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CARDS GRID VIEW FOR ALL 8 ASPECTS */}
      {activeTab === 'cards' && (
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {aspekList.map((item, idx) => {
              const isSelected = selectedAspek?.id === item.id;
              const isExcellent = item.statusPemenuhan === 'Sangat Baik';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedAspek(item)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-400/20 bg-emerald-50/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                        Aspek 0{idx + 1} · Bobot {item.bobotPersen}%
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isExcellent
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {item.statusPemenuhan}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {item.nama}
                    </h4>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Nilai:</span>
                        <span className="font-mono font-bold text-slate-800">
                          {item.nilaiAspek.toFixed(1)} / {item.nilaiMaks}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${item.indeksAspek * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Indeks Aspek:</span>
                    <span className="font-mono font-bold text-emerald-700 tabular-nums">
                      {item.indeksAspek.toFixed(3)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: EXACT REQUIRED MASTER DATASET TABLE (POINT 6 ATRIBUT USER) */}
      {activeTab === 'dataset' && (
        <div className="p-4 sm:p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                  <th className="py-2.5 px-3 font-semibold">Tahun</th>
                  <th className="py-2.5 px-3 font-semibold">Komponen Penilaian (8 Aspek)</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Bobot</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Nilai per Aspek (Raw)</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Nilai Maks Aspek</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Indeks per Aspek</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Status Pemenuhan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {aspekList.map((aspek) => {
                  const isExcellent = aspek.statusPemenuhan === 'Sangat Baik';
                  return (
                    <tr key={aspek.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-slate-500">{tahun}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        {aspek.nama}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-slate-700">
                        {aspek.bobotPersen}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-900 tabular-nums">
                        {aspek.nilaiAspek.toFixed(1)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400 tabular-nums">
                        {aspek.nilaiMaks}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 tabular-nums">
                        {aspek.indeksAspek.toFixed(3)}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isExcellent
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {aspek.statusPemenuhan}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {/* AGGREGATE SUMMARY ROW */}
                <tr className="bg-emerald-50/70 font-bold border-t-2 border-emerald-300 text-slate-900">
                  <td className="py-3 px-3 font-mono text-emerald-900">{tahun}</td>
                  <td className="py-3 px-3 text-emerald-950 font-bold">
                    INDEKS SISTEM MERIT (Agregasi 8 Aspek × Bobot %)
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-emerald-900">100%</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-900 text-sm tabular-nums">
                    {datasetRow.TOTAL_NILAI_MERIT.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-700 text-sm tabular-nums">
                    400.0
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-900 text-sm tabular-nums">
                    {datasetRow.INDEKS_SISTEM_MERIT.toFixed(4)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-emerald-600 text-white shadow-2xs">
                      {datasetRow.STATUS_PEMENUHAN}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: EXACT KATEGORI SISTEM MERIT (SESUAI PEDOMAN KASN & MENPAN-RB) */}
      {activeTab === 'kategori' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-emerald-50 via-slate-50 to-indigo-50/50 rounded-xl border border-emerald-200/80">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
                Pedoman Penetapan Tingkat Kematangan Sistem Merit
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Klasifikasi Kategori, Rentang Nilai, Mutu Pelayanan &amp; Predikat
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 font-mono">
                Capaian BP Batam TA {tahun}:{' '}
                <strong className="text-emerald-700 font-bold">
                  {datasetRow.TOTAL_NILAI_MERIT.toFixed(1)} Poin ({datasetRow.STATUS_PEMENUHAN})
                </strong>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-300">
                  <th className="py-3 px-4 font-bold text-center border-r border-slate-200 w-28">
                    Kategori
                  </th>
                  <th className="py-3 px-5 font-bold text-center border-r border-slate-200">
                    Nilai
                  </th>
                  <th className="py-3 px-5 font-bold text-center border-r border-slate-200">
                    Mutu Pelayanan
                  </th>
                  <th className="py-3 px-5 font-bold text-center border-r border-slate-200">
                    Predikat
                  </th>
                  <th className="py-3 px-4 font-bold text-left hidden lg:table-cell border-r border-slate-200">
                    Implikasi Manajemen Talenta &amp; Pengisian JPT
                  </th>
                  <th className="py-3 px-3 font-bold text-center w-36">
                    Status Evaluasi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {STANDAR_KASN_KONVERSI.map((row) => {
                  const isCurrent =
                    datasetRow.TOTAL_NILAI_MERIT >= row.minNilai &&
                    datasetRow.TOTAL_NILAI_MERIT <= row.maxNilai;

                  return (
                    <tr
                      key={row.kategori}
                      className={`transition-colors ${
                        isCurrent
                          ? 'bg-emerald-50/90 font-medium'
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center font-black font-mono text-slate-900 text-base sm:text-lg border-r border-slate-200">
                        {row.kategori}
                      </td>
                      <td className="py-3.5 px-5 text-center font-mono font-bold text-slate-900 text-xs sm:text-sm border-r border-slate-200">
                        {row.nilai}
                      </td>
                      <td className="py-3.5 px-5 text-center font-mono font-bold text-slate-900 text-xs sm:text-sm border-r border-slate-200">
                        {row.mutuPelayanan}
                      </td>
                      <td className="py-3.5 px-5 text-center border-r border-slate-200">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${row.badgeWarna}`}
                        >
                          {row.predikat}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 leading-relaxed hidden lg:table-cell border-r border-slate-200">
                        {row.konsekuensi}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-600 text-white shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>Posisi BP Batam</span>
                          </span>
                        ) : (
                          <span className="text-slate-300 font-mono text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FOOTER: KASN CONVERSION TABLE REFERENCE & TABLEAU SHELVES */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Tabel Standar Kategori Penilaian Sistem Merit Nasional:</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            Sesuai Standar Komisi Aparatur Sipil Negara (KASN) / KemenPAN-RB
          </span>
        </div>

        {/* EXACT TABLE AS DISPLAYED IN USER SCREENSHOT */}
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-200">
                <th className="py-2.5 px-4 font-bold text-center border-r border-slate-200 w-24">
                  Kategori
                </th>
                <th className="py-2.5 px-4 font-bold text-center border-r border-slate-200">
                  Nilai
                </th>
                <th className="py-2.5 px-4 font-bold text-center border-r border-slate-200">
                  Mutu Pelayanan
                </th>
                <th className="py-2.5 px-4 font-bold text-center border-r border-slate-200">
                  Predikat
                </th>
                <th className="py-2.5 px-4 font-bold text-left hidden sm:table-cell">
                  Keterangan Implikasi
                </th>
                <th className="py-2.5 px-3 font-bold text-center w-32">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STANDAR_KASN_KONVERSI.map((row) => {
                const isCurrent =
                  datasetRow.TOTAL_NILAI_MERIT >= row.minNilai &&
                  datasetRow.TOTAL_NILAI_MERIT <= row.maxNilai;

                return (
                  <tr
                    key={row.kategori}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-emerald-50/80 font-medium'
                        : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <td className="py-2.5 px-4 text-center font-black font-mono text-slate-900 border-r border-slate-200 text-sm">
                      {row.kategori}
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono font-semibold text-slate-900 border-r border-slate-200">
                      {row.nilai}
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono font-semibold text-slate-900 border-r border-slate-200">
                      {row.mutuPelayanan}
                    </td>
                    <td className="py-2.5 px-4 text-center border-r border-slate-200">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${row.badgeWarna}`}
                      >
                        {row.predikat}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-xs text-slate-600 leading-snug hidden sm:table-cell">
                      {row.konsekuensi}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white shadow-2xs">
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                          <span>Capaian Riil</span>
                        </span>
                      ) : (
                        <span className="text-slate-300 font-mono text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* TABLEAU SHELVES SPECIFICATION */}
        <TableauShelvesBadge
          showMe="Radar / Spider Chart & Packed Aspect Breakdown"
          columns="[Komponen Penilaian (8 Aspek)], SUM([Nilai per Aspek]), AGG([Indeks per Aspek])"
          rows="[Tahun], [Bobot %]"
          color="[Status Pemenuhan (Kategori I - IV)]"
          detail="[Nilai Maks Aspek], [Bobot %], [Keterangan Pemenuhan]"
          text="AGG([Indeks per Aspek])"
          calculatedField="[Indeks per Aspek] = [Nilai per Aspek] / [Nilai Maks Aspek]; [Indeks Sistem Merit] = SUM([Indeks per Aspek] * [Bobot %])"
          compact={true}
        />
      </div>
    </div>
  );
};
