import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Clock,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  ShieldCheck,
  Building2,
  Anchor,
  Filter,
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  DATASET_1_PERMASALAHAN,
  DATASET_2_RENCANA_PEMANFAATAN,
  DATASET_3_REKAP_TAHUNAN,
  DATASET_3_PERIZINAN_WAKTU,
  DISTRIBUSI_WILAYAH_PESISIR_DATA,
  TREN_TRIWULAN_MASALAH,
} from './pesisirReklamasiData';
import { PesisirReklamasiFilterState } from './types';

interface PesisirKawasanVisualizerProps {
  filters: PesisirReklamasiFilterState;
  onOpenFormulaModal: (kpiId: string) => void;
}

export const PesisirKawasanVisualizer: React.FC<PesisirKawasanVisualizerProps> = ({
  filters,
  onOpenFormulaModal,
}) => {
  // 3 Tab sesuai dengan 3 Dataset pelengkap dari PDF Satu Data BP Batam
  const [activeTab, setActiveTab] = useState<'dataset2_spasial' | 'dataset3_kinerja' | 'dataset1_masalah'>('dataset2_spasial');

  // Filter Data Spasial Rencana (Dataset #2)
  const filteredRencana = DATASET_2_RENCANA_PEMANFAATAN.filter((item) => {
    if (filters.swp !== 'ALL' && item.wilayah !== filters.swp && item.swp !== filters.swp) return false;
    if (filters.tahun !== 'ALL' && item.tahunPenerbitan.toString() !== filters.tahun) return false;
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      return (
        item.namaPerusahaan.toLowerCase().includes(q) ||
        item.nomorIzinPkkprl.toLowerCase().includes(q) ||
        item.wilayah.toLowerCase().includes(q) ||
        item.statusKegiatan.toLowerCase().includes(q) ||
        item.koordinat.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filter Permasalahan (Dataset #1)
  const filteredPermasalahan = DATASET_1_PERMASALAHAN.filter((item) => {
    if (filters.swp !== 'ALL' && item.wilayah !== filters.swp && item.swp !== filters.swp) return false;
    if (filters.tahun !== 'ALL' && item.tahun.toString() !== filters.tahun) return false;
    if (filters.statusPenyelesaian === 'Selesai' && item.status !== 'Selesai') return false;
    if (filters.statusPenyelesaian === 'Proses' && item.status !== 'Dalam Proses') return false;
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      return (
        item.judulKasus.toLowerCase().includes(q) ||
        item.namaPihakTerkait.toLowerCase().includes(q) ||
        item.wilayah.toLowerCase().includes(q) ||
        item.dokumenPendukung.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Data Agregasi Status Kegiatan untuk Donut Chart (Dataset #2)
  const statusKegiatanAgg = filteredRencana.reduce((acc, curr) => {
    acc[curr.statusKegiatan] = (acc[curr.statusKegiatan] || 0) + curr.luasHa;
    return acc;
  }, {} as Record<string, number>);

  const pieStatusKegiatan = Object.entries(statusKegiatanAgg).map(([name, value], i) => {
    const colors = ['#0284c7', '#0d9488', '#f59e0b', '#6366f1', '#ec4899'];
    return { name, value: Number(value.toFixed(1)), color: colors[i % colors.length] };
  });

  // Data Sebaran Luas Rencana per Wilayah (Dataset #2)
  const barWilayahRencana = DISTRIBUSI_WILAYAH_PESISIR_DATA.map((d) => ({
    wilayah: d.wilayah.replace('& ', ''),
    luasReklamasi: d.reklamasiHa,
    luasPesisir: d.pesisirHa,
    totalLuas: d.luasTotalHa,
  }));

  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden font-sans">
      {/* HEADER VISUALISASI TERPADU DIREKTORAT */}
      <div className="p-4 bg-white border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-5 bg-indigo-600 rounded-full inline-block" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Visualisasi Kinerja Direktorat Sesuai Atribut Dokumen Satu Data
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 font-mono">
              HALAMAN 13 - 14
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Penyajian data spasial rencana pemanfaatan ruang laut, kepatuhan SLA perizinan, dan efektivitas penyelesaian kasus pesisir
          </p>
        </div>

        {/* DATASET TAB SELECTOR */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs shrink-0">
          <button
            onClick={() => setActiveTab('dataset2_spasial')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'dataset2_spasial'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Dataset #2: Spasial Rencana</span>
          </button>
          <button
            onClick={() => setActiveTab('dataset3_kinerja')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'dataset3_kinerja'
                ? 'bg-white text-emerald-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dataset #3: Perizinan Tepat Waktu</span>
          </button>
          <button
            onClick={() => setActiveTab('dataset1_masalah')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'dataset1_masalah'
                ? 'bg-white text-amber-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Dataset #1: Penyelesaian Masalah</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DATASET #2 RENCANA PEMANFAATAN WILAYAH PESISIR DAN REKLAMASI       */}
      {/* ATRIBUT PDF: NAMA PERUSAHAAN, NOMOR IZIN PKKPRL, KOORDINAT, WILAYAH,      */}
      {/* STATUS KEGIATAN, LUAS, TAHUN PENERBITAN (DATA SPASIAL)                     */}
      {/* ========================================================================= */}
      {activeTab === 'dataset2_spasial' && (
        <div className="p-4 space-y-4">
          {/* Metadata Banner Dataset 2 */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <div>
                <span className="font-bold text-slate-900">Dataset #2: Rencana Pemanfaatan Wilayah Pesisir dan Reklamasi (Data Spasial)</span>
                <span className="text-slate-500 block text-[11px]">
                  Atribut: Nama Perusahaan | Nomor Izin PKKPRL | Koordinat Lintang-Bujur | Wilayah | Status Kegiatan | Luas (Ha) | Tahun Penerbitan
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="bg-white px-2.5 py-1 rounded border border-indigo-200 text-indigo-900 font-bold">
                {filteredRencana.length} Rencana Terpetakan
              </span>
              <span className="bg-white px-2.5 py-1 rounded border border-indigo-200 text-indigo-900 font-bold">
                Total: {filteredRencana.reduce((s, c) => s + c.luasHa, 0).toFixed(1)} Ha
              </span>
            </div>
          </div>

          {/* 2 Charts Grid: Sebaran Luas per Wilayah & Distribusi Status Kegiatan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Chart 1: Sebaran Luas per Wilayah (Stacked Bar Reklamasi vs Pesisir) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">
                  Sebaran Luas Alokasi Ruang Pesisir &amp; Reklamasi per Wilayah
                </span>
                <span className="text-[10.5px] font-mono text-slate-500">Satuan: Ha</span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barWilayahRencana} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="wilayah" tick={{ fontSize: 10, fill: '#64748B' }} angle={-15} textAnchor="end" />
                    <YAxis tick={{ fontSize: 10, fill: '#64748B' }} unit=" Ha" />
                    <Tooltip
                      formatter={(val: any, name: any) => [`${val} Ha`, name === 'luasReklamasi' ? 'Luas Reklamasi' : 'Luas Pesisir']}
                      contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="luasReklamasi" name="Luas Reklamasi" fill="#0284C7" stackId="a" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="luasPesisir" name="Luas Pesisir / Jetty" fill="#10B981" stackId="a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Proporsi Luas per Status Kegiatan (Donut Chart) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1">
                  Komposisi Luas (Ha) Berdasarkan Status Kegiatan
                </span>
                <p className="text-[10.5px] text-slate-500 mb-2">
                  Zonasi peruntukan ruang laut untuk investasi maritim, pariwisata, dan industri
                </p>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieStatusKegiatan}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={2}
                      >
                        {pieStatusKegiatan.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val: any) => [`${val} Ha`, 'Luas Rencana']}
                        contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status Kegiatan Legend */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[10.5px]">
                {pieStatusKegiatan.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate max-w-[200px]" title={item.name}>
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-700 truncate">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">{item.value} Ha</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabel Spasial Rencana (Sesuai Atribut Lengkap PDF Dataset 2) */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-slate-50 px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Daftar Spasial Rencana Pemanfaatan Wilayah Pesisir &amp; Reklamasi (Dataset #2)
              </span>
              <span className="text-[11px] text-slate-500">
                Menampilkan <strong>{filteredRencana.length}</strong> data terverifikasi
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">No</th>
                    <th className="py-2.5 px-3">Nama Perusahaan</th>
                    <th className="py-2.5 px-3">Nomor Izin PKKPRL</th>
                    <th className="py-2.5 px-3">Titik Koordinat (Spasial)</th>
                    <th className="py-2.5 px-3">Wilayah</th>
                    <th className="py-2.5 px-3">Status Kegiatan</th>
                    <th className="py-2.5 px-3 text-right">Luas (Ha)</th>
                    <th className="py-2.5 px-3 text-center">Tahun Penerbitan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredRencana.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        {item.namaPerusahaan}
                        <div className="text-[10px] text-slate-500 font-normal mt-0.5">{item.lokasiSpesifik}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-mono text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 text-[10.5px] font-semibold">
                          {item.nomorIzinPkkprl}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-600 text-[10.5px]">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                          <span>{item.koordinat}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold text-[10px]">
                          {item.wilayah}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-medium text-[10.5px]">
                          {item.statusKegiatan}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-indigo-900">
                        {item.luasHa.toFixed(1)} Ha
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-slate-700">
                        {item.tahunPenerbitan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DATASET #3 PERSENTASE PERIZINAN SELESAI TEPAT WAKTU                */}
      {/* ATRIBUT PDF: JUMLAH PERMOHONAN, TOTAL LUASAN, TAHUN                        */}
      {/* ========================================================================= */}
      {activeTab === 'dataset3_kinerja' && (
        <div className="p-4 space-y-4">
          {/* Metadata Banner Dataset 3 */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="font-bold text-slate-900">
                  Dataset #3: Persentase Perizinan Pesisir dan Reklamasi yang Selesai Tepat Waktu (Data Statistik)
                </span>
                <span className="text-slate-500 block text-[11px]">
                  Atribut: Jumlah Permohonan | Total Luasan (Ha) | Tahun | Standar SLA: ≤ 14 Hari Kerja
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="bg-white px-2.5 py-1 rounded border border-emerald-200 text-emerald-900 font-bold">
                Capaian SLA: 92,4% Tepat Waktu
              </span>
              <span className="bg-white px-2.5 py-1 rounded border border-emerald-200 text-emerald-900 font-bold">
                Total Luasan: 1.820,5 Ha
              </span>
            </div>
          </div>

          {/* 2 Charts: Tren Jumlah Permohonan vs Tepat Waktu & Total Luasan per Tahun */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Chart 1: Tren Permohonan & Kepatuhan SLA */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-800">
                    Tren Tahunan: Jumlah Permohonan Masuk vs Selesai Tepat Waktu
                  </span>
                  <p className="text-[10.5px] text-slate-500">
                    Evaluasi kepatuhan SLA proses verifikasi dokumen teknis perizinan
                  </p>
                </div>
                <span className="text-[10.5px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Target: ≥ 90%
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATASET_3_REKAP_TAHUNAN} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="tahun" tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Berkas" />
                    <Tooltip
                      formatter={(val: any, name: any) => [
                        `${val} Berkas`,
                        name === 'jumlahPermohonan' ? 'Total Permohonan' : 'Selesai Tepat Waktu',
                      ]}
                      contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar dataKey="jumlahPermohonan" name="Total Permohonan Masuk" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="jumlahTepatWaktu" name="Selesai Tepat Waktu (SLA)" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Total Luasan yang Dimohonkan vs Disetujui (Ha) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-800">
                    Total Luasan Perizinan per Tahun (Ha)
                  </span>
                  <p className="text-[10.5px] text-slate-500">
                    Akumulasi luasan ruang laut yang diproses verifikasi
                  </p>
                </div>
                <span className="text-[10.5px] font-mono text-slate-500">Satuan: Ha</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DATASET_3_REKAP_TAHUNAN} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorLuas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284C7" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="tahun" tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Ha" />
                    <Tooltip
                      formatter={(val: any) => [`${val} Ha`, 'Total Luasan']}
                      contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                    />
                    <Area type="monotone" dataKey="totalLuasanHa" name="Total Luasan (Ha)" stroke="#0284C7" fillOpacity={1} fill="url(#colorLuas)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tabel Rekapitulasi Tahunan (Sesuai Atribut PDF Dataset 3) */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-slate-50 px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Tabel Rekapitulasi Dataset #3: Kinerja Perizinan Selesai Tepat Waktu &amp; Total Luasan
              </span>
              <span className="text-[11px] text-slate-500">
                Sumber: Subdit Pelayanan Perizinan Pesisir &amp; Reklamasi
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Tahun</th>
                    <th className="py-2.5 px-3 text-right">Jumlah Permohonan</th>
                    <th className="py-2.5 px-3 text-right">Selesai Tepat Waktu</th>
                    <th className="py-2.5 px-3 text-right">Persentase Tepat Waktu</th>
                    <th className="py-2.5 px-3 text-right">Total Luasan Dimohonkan (Ha)</th>
                    <th className="py-2.5 px-3 text-right">Total Luasan Disetujui (Ha)</th>
                    <th className="py-2.5 px-3 text-center">Status Capaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {DATASET_3_REKAP_TAHUNAN.map((item) => (
                    <tr key={item.tahun} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900 font-mono text-xs">
                        {item.tahun}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-700">
                        {item.jumlahPermohonan} Berkas
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-semibold text-emerald-700">
                        {item.jumlahTepatWaktu} Berkas
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-800">
                        {item.persentaseTepatWaktu.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                        {item.totalLuasanHa.toLocaleString('id-ID')} Ha
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-sky-800">
                        {item.totalLuasanDisetujuiHa.toLocaleString('id-ID')} Ha
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Memenuhi SLA
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DATASET #1 PERSENTASE PENYELESAIAN PERMASALAHAN PESISIR & REKLAMASI */}
      {/* ATRIBUT PDF: DOKUMEN PENDUKUNG, WILAYAH, LUAS YANG DITERBITKAN,           */}
      {/* TRIWULAN, TAHUN (DATA STATISTIK PERTRIWULAN)                              */}
      {/* ========================================================================= */}
      {activeTab === 'dataset1_masalah' && (
        <div className="p-4 space-y-4">
          {/* Metadata Banner Dataset 1 */}
          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <div>
                <span className="font-bold text-slate-900">
                  Dataset #1: Persentase Penyelesaian Permasalahan Pesisir dan Reklamasi (Data Statistik Pertriwulan)
                </span>
                <span className="text-slate-500 block text-[11px]">
                  Atribut Resmi: Dokumen Pendukung | Wilayah | Luas yang Diterbitkan (Ha) | Triwulan | Tahun
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="bg-white px-2.5 py-1 rounded border border-amber-200 text-amber-900 font-bold">
                Tingkat Penyelesaian: 88,6%
              </span>
              <span className="bg-white px-2.5 py-1 rounded border border-amber-200 text-amber-900 font-bold">
                Total Luas Tertangani: 128,5 Ha
              </span>
            </div>
          </div>

          {/* Tren Triwulan & Distribusi Luas Area Terdampak Kasus */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Chart 1: Tren Persentase Penyelesaian Kasus per Triwulan */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-800">
                    Tren Capaian Persentase Penyelesaian Masalah per Triwulan
                  </span>
                  <p className="text-[10.5px] text-slate-500">
                    Pemantauan aduan masyarakat, pelanggaran sempadan, dan sedimentasi alur pelayaran
                  </p>
                </div>
                <span className="text-[10.5px] font-mono text-slate-500">Periode Triwulan</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TREN_TRIWULAN_MASALAH} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="triwulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                    <YAxis domain={[75, 100]} tick={{ fontSize: 11, fill: '#64748B' }} unit="%" />
                    <Tooltip
                      formatter={(val: any) => [`${val}%`, 'Persentase Selesai']}
                      contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Line type="monotone" dataKey="persenSelesai" name="% Penyelesaian Masalah" stroke="#D97706" strokeWidth={2.5} dot={{ r: 4, fill: '#D97706' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Luas yang Diterbitkan/Ditangani per Triwulan */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-800">
                    Luas Area Terdampak / Ditangani (Ha)
                  </span>
                  <p className="text-[10.5px] text-slate-500">
                    Luasan pesisir yang direstorasi / ditertibkan per triwulan
                  </p>
                </div>
                <span className="text-[10.5px] font-mono text-slate-500">Satuan: Ha</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TREN_TRIWULAN_MASALAH} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="triwulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Ha" />
                    <Tooltip
                      formatter={(val: any) => [`${val} Ha`, 'Luas Ditangani']}
                      contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                    />
                    <Bar dataKey="luasTerdampakHa" name="Luas yang Ditangani (Ha)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tabel Detail Kasus & Dokumen Pendukung (Sesuai Atribut Lengkap PDF Dataset 1) */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-slate-50 px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Daftar Permasalahan, Wilayah, Luas yang Ditangani &amp; Dokumen Pendukung (Dataset #1)
              </span>
              <span className="text-[11px] text-slate-500">
                Menampilkan <strong>{filteredPermasalahan.length}</strong> kasus aduan lapangan
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">No</th>
                    <th className="py-2.5 px-3">Judul Permasalahan &amp; Pihak Terkait</th>
                    <th className="py-2.5 px-3">Wilayah</th>
                    <th className="py-2.5 px-3">Dokumen Pendukung Resmi</th>
                    <th className="py-2.5 px-3 text-right">Luas Ditangani (Ha)</th>
                    <th className="py-2.5 px-3 text-center">Periode (Triwulan &amp; Tahun)</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredPermasalahan.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">{item.judulKasus}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          Pihak: <strong>{item.namaPihakTerkait}</strong> ({item.lokasi})
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold text-[10.5px]">
                          {item.wilayah}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-start gap-1.5 max-w-sm">
                          <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span className="text-[11px] text-slate-700 font-medium leading-relaxed">
                            {item.dokumenPendukung}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-900">
                        {item.luasDiterbitkanHa.toFixed(1)} Ha
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-[10.5px]">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded">
                          {item.triwulan} {item.tahun}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            item.status === 'Selesai'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
