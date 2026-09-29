import React, { useState } from 'react';
import {
  Anchor,
  Clock,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Building2,
  TrendingUp,
  Waves,
  MapPin,
  Layers,
  ArrowUpRight,
  FileCheck2,
  Calendar,
  Sparkles,
  Info,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  KPI_PESISIR_REKLAMASI_DATA,
  DATASET_1_PERMASALAHAN,
  DATASET_2_RENCANA_PEMANFAATAN,
  DATASET_3_REKAP_TAHUNAN,
  DATASET_4_PEMANFAATAN_INVESTASI,
} from './pesisirReklamasiData';

interface KompilasiPesisirReklamasiCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const KompilasiPesisirReklamasiCard: React.FC<
  KompilasiPesisirReklamasiCardProps
> = ({ onOpenFormulaModal }) => {
  const kpi = KPI_PESISIR_REKLAMASI_DATA;
  const [activeDatasetTab, setActiveDatasetTab] = useState<'all' | 'ds4' | 'ds2' | 'ds1' | 'ds3'>('all');

  // Proporsi Reklamasi vs Pesisir untuk Pie Chart
  const proporsiData = [
    { name: 'Area Reklamasi', value: kpi.reklamasiVsPesisirHa.reklamasiHa, color: '#0284C7', pct: kpi.reklamasiVsPesisirHa.reklamasiPersen },
    { name: 'Area Pesisir/Ruang Laut', value: kpi.reklamasiVsPesisirHa.pesisirHa, color: '#0D9488', pct: kpi.reklamasiVsPesisirHa.pesisirPersen },
  ];

  // Ringkasan per Wilayah dari DS #1, #2, #4
  const sebaranWilayah = [
    {
      wilayah: 'Kabil & Pesisir Timur',
      kode: 'SWP-KBL',
      izinHa: 512.4,
      rencanaHa: 680.0,
      kasus: 14,
      kasusSelesai: 13,
      slaPersen: 94.2,
      peruntukan: 'Pelabuhan Industri & Terminal Khusus',
    },
    {
      wilayah: 'Tanjung Sauh & Sekitarnya',
      kode: 'SWP-TSH',
      izinHa: 384.2,
      rencanaHa: 520.0,
      kasus: 8,
      kasusSelesai: 7,
      slaPersen: 95.0,
      peruntukan: 'Pelabuhan Hub Kontainer Internasional',
    },
    {
      wilayah: 'Nongsa & Sambau (Pesisir Utara)',
      kode: 'SWP-NGS',
      izinHa: 265.8,
      rencanaHa: 410.0,
      kasus: 21,
      kasusSelesai: 19,
      slaPersen: 91.5,
      peruntukan: 'Resort Pariwisata & Luxury Marina',
    },
    {
      wilayah: 'Sekupang & Tg. Uncang (Barat)',
      kode: 'SWP-SKP',
      izinHa: 198.5,
      rencanaHa: 320.0,
      kasus: 22,
      kasusSelesai: 19,
      slaPersen: 89.8,
      peruntukan: 'Shipyard, Galangan Kapal & Perbaikan',
    },
    {
      wilayah: 'Rempang & Galang (Selatan)',
      kode: 'SWP-RMP',
      izinHa: 124.5,
      rencanaHa: 220.0,
      kasus: 14,
      kasusSelesai: 12,
      slaPersen: 93.4,
      peruntukan: 'Eco-City, Konservasi & Dermaga Logistik',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden font-sans space-y-4">
      {/* 1. Header Banner */}
      <div className="p-3.5 sm:p-4 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shadow-2xs">
            <Anchor className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                Kompilasi Eksekutif 4 Dataset Direktorat Pengelolaan Kawasan Pesisir dan Reklamasi
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-bold border border-sky-200">
                BUKU SATU DATA HAL. 13 - 14
              </span>
            </div>
            <p className="text-[10.5px] sm:text-[11px] text-slate-500">
              Integrasi terpadu izin investasi (#4), rencana pemanfaatan spasial (#2), penyelesaian kasus (#1), dan SLA waktu perizinan (#3)
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenFormulaModal?.('kpi_luas_izin')}
          className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
        >
          <Info className="w-3.5 h-3.5 text-sky-600" />
          <span>Kamus Rumus</span>
        </button>
      </div>

      {/* 2. Top Summary 4 Dataset Cards */}
      <div className="px-3.5 sm:px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* DS #4: Luas Izin Investasi */}
        <div className="bg-sky-50/60 rounded-xl border border-sky-200/80 p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-sky-800 mb-1">
              <span>DATASET #4 &bull; IZIN INVESTASI</span>
              <span className="px-1.5 py-0.2 rounded bg-white text-sky-900 border border-sky-200">
                108.5%
              </span>
            </div>
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              Luas Izin Investasi Terbit
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-2xl font-black font-mono text-sky-900">
                {kpi.kpi1_luasIzinInvestasiHa.toLocaleString('id-ID')}
              </span>
              <span className="text-xs font-bold text-slate-600">Ha</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-sky-200/60 text-[10px] text-slate-600 flex items-center justify-between font-mono">
            <span>{kpi.kpi1_totalIzinTerbit} Izin PKKPRL</span>
            <span>Tgt: {kpi.kpi1_targetLuasHa} Ha</span>
          </div>
        </div>

        {/* DS #2: Rencana Pemanfaatan Ruang Laut */}
        <div className="bg-teal-50/60 rounded-xl border border-teal-200/80 p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-teal-800 mb-1">
              <span>DATASET #2 &bull; DATA SPASIAL</span>
              <span className="px-1.5 py-0.2 rounded bg-white text-teal-900 border border-teal-200">
                26 Titik
              </span>
            </div>
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              Rencana Pemanfaatan Pesisir
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-2xl font-black font-mono text-teal-900">
                {kpi.kpi4_totalRencanaLuasHa.toLocaleString('id-ID')}
              </span>
              <span className="text-xs font-bold text-slate-600">Ha</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-teal-200/60 text-[10px] text-slate-600 flex items-center justify-between font-mono">
            <span>Delineasi RTRW Laut</span>
            <span>26 Titik Alokasi</span>
          </div>
        </div>

        {/* DS #1: Penyelesaian Kasus Masalah */}
        <div className="bg-emerald-50/60 rounded-xl border border-emerald-200/80 p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-emerald-800 mb-1">
              <span>DATASET #1 &bull; PENGAWASAN</span>
              <span className="px-1.5 py-0.2 rounded bg-white text-emerald-900 border border-emerald-200">
                {kpi.kpi3_persenPenyelesaianMasalah}%
              </span>
            </div>
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              Penyelesaian Masalah Pesisir
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-900">
                {kpi.kpi3_kasusSelesai}
              </span>
              <span className="text-xs font-bold text-slate-600">/{kpi.kpi3_totalKasus} Kasus</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-emerald-200/60 text-[10px] text-slate-600 flex items-center justify-between font-mono">
            <span>{kpi.kpi3_totalLuasTerdampakHa} Ha Tertangani</span>
            <span>{kpi.kpi3_rataRataWaktuSelesaiHari} Hari Selesai</span>
          </div>
        </div>

        {/* DS #3: Persentase Tepat Waktu SLA */}
        <div className="bg-indigo-50/60 rounded-xl border border-indigo-200/80 p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-indigo-800 mb-1">
              <span>DATASET #3 &bull; KECEPATAN SLA</span>
              <span className="px-1.5 py-0.2 rounded bg-white text-indigo-900 border border-indigo-200">
                {kpi.kpi2_persenTepatWaktu}%
              </span>
            </div>
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              Izin Selesai Tepat Waktu
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-2xl font-black font-mono text-indigo-900">
                {kpi.kpi2_rataRataSlaHari}
              </span>
              <span className="text-xs font-bold text-slate-600">Hari Kerja</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-indigo-200/60 text-[10px] text-slate-600 flex items-center justify-between font-mono">
            <span>{kpi.kpi2_totalTepatWaktu} / {kpi.kpi2_totalPerizinanSelesai} Tepat</span>
            <span>Standar SLA: 14 Hari</span>
          </div>
        </div>
      </div>

      {/* 3. Deep-Dive Split: Left (Ruang Investasi DS 4 & 2) | Right (Sebaran Wilayah & Pengawasan DS 1 & 3) */}
      <div className="px-3.5 sm:px-4 pb-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* =================================================================== */}
        {/* LEFT COLUMN: KOMPOSISI IZIN INVESTASI & DATA SPASIAL (5 COLS)       */}
        {/* =================================================================== */}
        <div className="lg:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200 p-3.5 sm:p-4 space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-sky-600" />
                Proporsi Izin: Reklamasi vs Pesisir (DS #4)
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Total: {kpi.kpi1_luasIzinInvestasiHa} Ha
              </span>
            </div>

            {/* Donut Chart Reklamasi vs Pesisir */}
            <div className="relative h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    formatter={(value: any, name: any) => [`${value} Ha`, name]}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      fontSize: '11px',
                    }}
                  />
                  <Pie
                    data={proporsiData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={74}
                    paddingAngle={3}
                  >
                    {proporsiData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[9px] uppercase font-bold text-slate-400 font-mono">Total Izin</span>
                <span className="text-xl font-black font-mono text-slate-900">
                  1.485,4
                </span>
                <span className="text-[9px] font-bold text-sky-700">Hektar</span>
              </div>
            </div>

            {/* Legend Detail */}
            <div className="space-y-2">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                    Area Reklamasi (Pulau Buatan/Timbunan)
                  </span>
                  <span className="font-mono font-bold text-sky-800">
                    {kpi.reklamasiVsPesisirHa.reklamasiHa} Ha ({kpi.reklamasiVsPesisirHa.reklamasiPersen}%)
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">
                  Peruntukan: Terminal peti kemas, galangan kapal berat, kawasan industri maritim &amp; dermaga jetty.
                </p>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                    Area Ruang Pesisir / Garis Pantai
                  </span>
                  <span className="font-mono font-bold text-teal-800">
                    {kpi.reklamasiVsPesisirHa.pesisirHa} Ha ({kpi.reklamasiVsPesisirHa.pesisirPersen}%)
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">
                  Peruntukan: Marina kapal pesiar, fasilitas rekreasi wisata bahari, labuh jangkar &amp; koridor ekologis.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[10.5px] text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              <span>Rencana Tata Ruang Laut (DS #2): <strong>2.150 Ha (26 Titik)</strong></span>
            </span>
            <span className="font-mono font-bold text-emerald-700">69,1% Terrealisasi</span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: KINERJA SEBARAN WILAYAH, KASUS & SLA (7 COLS)         */}
        {/* =================================================================== */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-600" />
                Matriks Sebaran 5 Wilayah Pesisir &amp; Kinerja 4 Dataset
              </h4>
              <p className="text-[10px] text-slate-500">
                Perbandingan alokasi izin, rencana spasial, penanganan masalah (#1) dan kepatuhan SLA (#3)
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold">
              5 Wilayah Utama
            </span>
          </div>

          {/* Table Matriks 5 Wilayah */}
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
            <table className="w-full text-left text-[10.5px]">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[9px] border-b border-slate-200">
                  <th className="py-2 px-2.5">Wilayah Pesisir</th>
                  <th className="py-2 px-2 text-right">Izin Terbit</th>
                  <th className="py-2 px-2 text-right">Rencana Laut</th>
                  <th className="py-2 px-2 text-center">Masalah Selesai</th>
                  <th className="py-2 px-2 text-right">SLA Tepat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 text-slate-700 font-medium">
                {sebaranWilayah.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white transition-colors">
                    <td className="py-2 px-2.5">
                      <span className="font-bold text-slate-900 block">{row.wilayah}</span>
                      <span className="text-[9.5px] text-slate-500 block">{row.peruntukan}</span>
                    </td>
                    <td className="py-2 px-2 text-right font-mono font-bold text-sky-800">
                      {row.izinHa} Ha
                    </td>
                    <td className="py-2 px-2 text-right font-mono text-slate-600">
                      {row.rencanaHa} Ha
                    </td>
                    <td className="py-2 px-2 text-center font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[10px]">
                        {row.kasusSelesai}/{row.kasus}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right font-mono font-bold text-indigo-700">
                      {row.slaPersen}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-sky-50/80 font-bold text-slate-900 border-t border-sky-200 text-[10.5px]">
                  <td className="py-2 px-2.5 font-bold text-sky-950">
                    Total Konsolidasi DPKPR:
                  </td>
                  <td className="py-2 px-2 text-right font-mono font-black text-sky-950">
                    1.485,4 Ha
                  </td>
                  <td className="py-2 px-2 text-right font-mono font-black text-slate-800">
                    2.150,0 Ha
                  </td>
                  <td className="py-2 px-2 text-center font-mono font-black text-emerald-900">
                    70 / 79 (88,6%)
                  </td>
                  <td className="py-2 px-2 text-right font-mono font-black text-indigo-950">
                    92,4% Tepat
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick Insights Row */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-[10px]">
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/80 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-slate-600">
                128,5 Ha area terdampak berhasil dipulihkan garis pantainya sesuai sempadan BP Batam.
              </span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/80 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="text-slate-600">
                Rata-rata kecepatan penerbitan izin 11,2 hari (2,8 hari lebih cepat dari batas SLA 14 hari).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
