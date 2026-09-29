import React, { useState } from 'react';
import {
  PieChart as PieIcon,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Layers,
  Clock,
  TrendingUp,
  FileText,
  Calculator,
  ChevronRight,
  Info,
  MapPin,
  Anchor,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  KPI_PENGAWASAN_DATA,
  KPI_EVALUASI_PEMBATALAN_DATA,
  KPI_PELAKSANAAN_DOKUMEN_DATA,
  KPI_REKOMENDASI_PEMBARUAN_DATA,
} from './pengendalianData';

interface PengendalianEmpatPersentaseCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PengendalianEmpatPersentaseCard: React.FC<
  PengendalianEmpatPersentaseCardProps
> = ({ onOpenFormulaModal }) => {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);

  // 4 DATASET SESUAI DAFTAR ATRIBUT DATA HALAMAN 11 BUKU SATU DATA BP BATAM
  const pieData = [
    {
      id: 'ds1',
      kpiId: 'kpi_pengawasan',
      no: 1,
      namaSingkat: '1. Pengawasan & Pengendalian',
      namaLengkap: 'Persentase Keberhasilan Pengawasan dan Pengendalian Lahan, Pesisir dan Reklamasi',
      persentase: KPI_PENGAWASAN_DATA.persentase,
      realisasi: KPI_PENGAWASAN_DATA.realisasiObjek,
      target: KPI_PENGAWASAN_DATA.targetObjek,
      satuan: 'Objek / Lokasi',
      formula: KPI_PENGAWASAN_DATA.formula,
      color: '#0D9488', // Teal
      bgBadge: 'bg-teal-50 text-teal-800 border-teal-200',
      fillColor: '#14B8A6',
      rincian: [
        { label: 'Lahan Darat', val: '228/240 Objek (95,0%)', luas: '890,4 Ha' },
        { label: 'Wilayah Pesisir', val: '111/120 Objek (92,5%)', luas: '412,8 Ha' },
        { label: 'Area Reklamasi', val: '83/90 Objek (92,2%)', luas: '345,2 Ha' },
      ],
      highlight: '422 Objek dari 450 Target Berhasil Diawasi & Dikendalikan (412 Objek Patuh)',
    },
    {
      id: 'ds2',
      kpiId: 'kpi_evaluasi_pembatalan',
      no: 2,
      namaSingkat: '2. Tindakan Evaluasi & Batal',
      namaLengkap: 'Persentase Keberhasilan Tindakan Evaluasi dan Pembatalan Alokasi Lahan, Pesisir dan Reklamasi',
      persentase: KPI_EVALUASI_PEMBATALAN_DATA.persentase,
      realisasi: KPI_EVALUASI_PEMBATALAN_DATA.realisasiKasus,
      target: KPI_EVALUASI_PEMBATALAN_DATA.targetKasus,
      satuan: 'Kasus Alokasi',
      formula: KPI_EVALUASI_PEMBATALAN_DATA.formula,
      color: '#3B82F6', // Blue
      bgBadge: 'bg-blue-50 text-blue-800 border-blue-200',
      fillColor: '#60A5FA',
      rincian: [
        { label: 'SP-1 (Peringatan I)', val: '74 Kasus (312,4 Ha)', luas: 'Proses Teguran' },
        { label: 'SP-2 & SP-3', val: '74 Kasus (303,9 Ha)', luas: 'Eskalasi Akhir' },
        { label: 'Kepka Pembatalan Resmi', val: '32 Kasus (94,6 Ha)', luas: 'Dicabut ke Cadangan BP' },
      ],
      highlight: '94,6 Ha Lahan Mangkrak Resmi Dicabut & 221,8 Ha Memperbarui Komitmen Investasi',
    },
    {
      id: 'ds3',
      kpiId: 'kpi_dokumen',
      no: 3,
      namaSingkat: '3. Pelaksanaan Kegiatan Dokumen',
      namaLengkap: 'Persentase Pelaksanaan Kegiatan Dokumen Lahan, Pesisir dan Reklamasi',
      persentase: KPI_PELAKSANAAN_DOKUMEN_DATA.persentase,
      realisasi: KPI_PELAKSANAAN_DOKUMEN_DATA.realisasiDokumen,
      target: KPI_PELAKSANAAN_DOKUMEN_DATA.targetDokumen,
      satuan: 'Dokumen Sah',
      formula: KPI_PELAKSANAAN_DOKUMEN_DATA.formula,
      color: '#6366F1', // Indigo
      bgBadge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      fillColor: '#818CF8',
      rincian: [
        { label: 'BAPL Lapangan', val: '174/180 Dok (96,7%)', luas: 'SLA 2,1 Hari' },
        { label: 'Verifikasi Reklamasi', val: '65/70 Dok (92,9%)', luas: 'SLA 2,9 Hari' },
        { label: 'Kajian Sempadan Pesisir', val: '57/60 Dok (95,0%)', luas: 'SLA 2,6 Hari' },
        { label: 'Rekomendasi Pengendalian', val: '46/50 Dok (92,0%)', luas: 'SLA 2,2 Hari' },
      ],
      highlight: '342 dari 360 Dokumen Disahkan Tuntas • Kecepatan Rata-Rata SLA 2,4 Hari (Standar 4 Hari)',
    },
    {
      id: 'ds4',
      kpiId: 'kpi_rekomendasi',
      no: 4,
      namaSingkat: '4. Rekomendasi Pembaruan & Peralihan',
      namaLengkap: 'Persentase Pemberian Rekomendasi Perpanjangan Pembaruan Alokasi Lahan dan Izin Peralihan Hak',
      persentase: KPI_REKOMENDASI_PEMBARUAN_DATA.persentase,
      realisasi: KPI_REKOMENDASI_PEMBARUAN_DATA.totalRekomendasiSelesai,
      target: KPI_REKOMENDASI_PEMBARUAN_DATA.totalPermohonanMasuk,
      satuan: 'Permohonan Selesai',
      formula: KPI_REKOMENDASI_PEMBARUAN_DATA.formula,
      color: '#0284C7', // Sky
      bgBadge: 'bg-sky-50 text-sky-800 border-sky-200',
      fillColor: '#38BDF8',
      rincian: [
        { label: 'Perpanjangan UWT 30 Thn', val: '296/310 Berkas (95,5%)', luas: '272 Disetujui' },
        { label: 'Izin Peralihan Hak Tanah', val: '198/210 Berkas (94,3%)', luas: '185 Disetujui' },
      ],
      highlight: '494 dari 520 Berkas Permohonan Direkomendasikan • Rata-Rata SLA 3,1 Hari Kerja',
    },
  ];

  const rataRataPersentase = (
    pieData.reduce((acc, curr) => acc + curr.persentase, 0) / pieData.length
  ).toFixed(2);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden font-sans">
      {/* Header Bar */}
      <div className="p-3.5 sm:p-4 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shadow-2xs">
            <PieIcon className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                Rekapitulasi 4 Persentase Kinerja Pengendalian Lahan, Pesisir dan Reklamasi
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">
                DAFTAR ATRIBUT DATA HAL. 11
              </span>
            </div>
            <p className="text-[10.5px] sm:text-[11px] text-slate-500">
              Visualisasi proporsi pie chart 4 indikator persentase kinerja resmi Dit. Pengendalian beserta rincian capaian realisasi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Rata-Rata Capaian: <strong className="text-teal-700">{rataRataPersentase}%</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Side = Pie Chart Visual | Right Side = Rincian Persentase */}
      <div className="p-3.5 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* =================================================================== */}
        {/* LEFT COLUMN: PIE CHART & DONUT PROPORTION VISUAL (5 COLS)           */}
        {/* =================================================================== */}
        <div className="lg:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200 p-3.5 sm:p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <PieIcon className="w-3.5 h-3.5 text-teal-600" />
                Visualisasi Proporsi 4 Persentase
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Nilai Persentase (%)
              </span>
            </div>

            {/* Recharts Pie Chart with Center Stats */}
            <div className="relative h-60 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    formatter={(value: any, name: any, item: any) => [
                      `${value}% (Realisasi: ${item.payload.realisasi}/${item.payload.target} ${item.payload.satuan})`,
                      item.payload.namaSingkat,
                    ]}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '11px',
                    }}
                  />
                  <Pie
                    data={pieData}
                    dataKey="persentase"
                    nameKey="namaSingkat"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={88}
                    paddingAngle={3}
                    onMouseEnter={(_, index) => setActiveSegmentIndex(index)}
                    onMouseLeave={() => setActiveSegmentIndex(null)}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#ffffff"
                        strokeWidth={2}
                        opacity={activeSegmentIndex === null || activeSegmentIndex === index ? 1 : 0.6}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
                  Rata-Rata
                </span>
                <span className="text-2xl font-black font-mono text-slate-900 leading-tight">
                  {rataRataPersentase}%
                </span>
                <span className="text-[9.5px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200 mt-0.5">
                  Sangat Tinggi
                </span>
              </div>
            </div>

            {/* Legend Matrix */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/80">
              {pieData.map((d, idx) => (
                <div
                  key={d.id}
                  onClick={() => setActiveSegmentIndex(activeSegmentIndex === idx ? null : idx)}
                  className={`p-2 rounded-lg border text-[10.5px] cursor-pointer transition-all ${
                    activeSegmentIndex === idx
                      ? 'bg-white border-teal-300 ring-1 ring-teal-300 shadow-2xs'
                      : 'bg-white/80 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="font-bold text-slate-800 truncate" title={d.namaSingkat}>
                      {d.namaSingkat}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-slate-500 text-[9.5px]">Persentase:</span>
                    <span className="font-bold text-slate-900" style={{ color: d.color }}>
                      {d.persentase}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10.5px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600 shrink-0" />
            <span>
              Seluruh 4 indikator persentase melampaui target standar evaluasi (ambang batas kinerja &gt; 80%).
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: RINCIAN PERSENTASENYA (7 COLS)                        */}
        {/* =================================================================== */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              Rincian Persentase 4 Indikator Data Pengendalian:
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              Formula &amp; Realisasi Objek
            </span>
          </div>

          <div className="space-y-2.5">
            {pieData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-3 sm:p-3.5 hover:border-teal-300 transition-all shadow-2xs space-y-2"
              >
                {/* Header Card Rincian */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${item.bgBadge}`}>
                        DATASET #{item.no}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {item.namaLengkap}
                      </h4>
                    </div>
                    <p className="text-[9.5px] font-mono text-slate-500">
                      Formula: <span className="text-slate-700 font-semibold">{item.formula}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className="text-lg font-black font-mono block leading-none"
                      style={{ color: item.color }}
                    >
                      {item.persentase}%
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">
                      {item.realisasi} / {item.target} {item.satuan}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.persentase}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>

                {/* Sub-breakdown badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                  {item.rincian.map((r, rIdx) => (
                    <div
                      key={rIdx}
                      className="bg-slate-50 p-1.5 rounded-lg border border-slate-200/80 text-[10px]"
                    >
                      <span className="text-slate-500 block text-[9px] truncate">{r.label}</span>
                      <span className="font-mono font-bold text-slate-800 block truncate">{r.val}</span>
                      <span className="text-[8.5px] font-mono text-slate-400 block truncate">{r.luas}</span>
                    </div>
                  ))}
                </div>

                {/* Highlight note & action button */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                  <span className="text-slate-600 truncate max-w-[80%]" title={item.highlight}>
                    ✨ <strong>Output:</strong> {item.highlight}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal?.(item.kpiId)}
                    className="font-bold text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-0.5 cursor-pointer shrink-0"
                  >
                    <span>Formula</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
