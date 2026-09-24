import React, { useState, useMemo } from 'react';
import {
  PieChart as PieIcon,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Building2,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  FileText,
  BarChart3,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
} from 'recharts';
import {
  DAFTAR_REKOMENDASI_EVALUASI,
  DATA_KPI_TAHUNAN,
  DAFTAR_LAPORAN_PENGAWASAN,
} from './pengendalianData';
import { RekomendasiEvaluasiItem } from './types';

export const RekomendasiPengendalianVisualizer: React.FC = () => {
  // Filter state
  const [filterStatus, setFilterStatus] = useState<'Semua' | 'Selesai' | 'Dalam Proses'>('Semua');
  const [filterBu, setFilterBu] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'tabel' | 'kartu'>('tabel');

  // Filtered recommendations
  const filteredData = useMemo(() => {
    return DAFTAR_REKOMENDASI_EVALUASI.filter((item) => {
      if (filterStatus !== 'Semua' && item.status !== filterStatus) {
        return false;
      }
      if (filterBu !== 'Semua' && item.badanUsaha !== filterBu) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchJudul = item.judul.toLowerCase().includes(q);
        const matchRek = item.rekomendasi.toLowerCase().includes(q);
        const matchBu = item.badanUsaha.toLowerCase().includes(q);
        if (!matchJudul && !matchRek && !matchBu) return false;
      }
      return true;
    });
  }, [filterStatus, filterBu, searchQuery]);

  // Aggregate stats
  const totalRekomendasi = DAFTAR_REKOMENDASI_EVALUASI.length;
  const selesaiCount = DAFTAR_REKOMENDASI_EVALUASI.filter((i) => i.status === 'Selesai').length;
  const prosesCount = DAFTAR_REKOMENDASI_EVALUASI.filter((i) => i.status === 'Dalam Proses').length;
  const persenSelesai = ((selesaiCount / totalRekomendasi) * 100).toFixed(1);

  // Donut chart data
  const pieData = [
    { name: 'Selesai Ditindaklanjuti', value: selesaiCount, color: '#10B981' },
    { name: 'Dalam Proses Amandemen', value: prosesCount, color: '#F59E0B' },
  ];

  // Distribution by Badan Usaha
  const buDistribution = [
    { name: 'BU Pelabuhan', selesai: 5, proses: 1, total: 6, persen: 83.3 },
    { name: 'Aset Properti & Komersial', selesai: 2, proses: 2, total: 4, persen: 50.0 },
    { name: 'BU Bandar Udara', selesai: 1, proses: 0, total: 1, persen: 100 },
    { name: 'BU SPAM (Air Minum)', selesai: 1, proses: 1, total: 2, persen: 50.0 },
    { name: 'BU Fasilitas & Limbah', selesai: 1, proses: 0, total: 1, persen: 100 },
  ];

  return (
    <div className="space-y-6 mb-6">
      {/* Visual Section Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Visualisasi Dataset #1 (Satu Data Hal. 14)
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1">
              Rekomendasi Evaluasi &amp; Pengendalian Kerjasama Pengusahaan Badan Usaha
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Visual ringkas dan informatif untuk memantau status penyelesaian butir evaluasi kerja sama mitra usaha BP Batam.
            </p>
          </div>

          {/* Quick Metrics (Clean & Zero Clutter) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Rekomendasi</span>
              <span className="text-lg font-black font-mono text-slate-800">{totalRekomendasi}</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-600 block">Selesai</span>
              <span className="text-lg font-black font-mono text-emerald-700">
                {selesaiCount} <span className="text-xs font-normal">({persenSelesai}%)</span>
              </span>
            </div>
            <div className="bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-600 block">Dalam Proses</span>
              <span className="text-lg font-black font-mono text-amber-700">{prosesCount}</span>
            </div>
          </div>
        </div>

        {/* Visual Charts: Left Donut + Middle BU Progress + Right KPI Historical Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-5">
          {/* Visual 1: Donut Status Penyelesaian (Sangat Mudah Dipahami Orang Awam) */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <PieIcon className="w-3.5 h-3.5 text-emerald-600" />
                  Status Tindak Lanjut
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  {persenSelesai}% Tuntas
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Perbandingan butir rekomendasi yang telah tuntas disepakati vs masih dalam negosiasi amandemen.
              </p>

              {/* Donut Chart */}
              <div className="h-40 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any, name: any) => [
                        `${val} Rekomendasi (${((val / totalRekomendasi) * 100).toFixed(1)}%)`,
                        name,
                      ]}
                      contentStyle={{
                        backgroundColor: '#0F1E36',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '11px',
                        border: 'none',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-base font-black text-slate-800 font-mono">{persenSelesai}%</span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">Efektivitas</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-slate-600 truncate">Selesai ({selesaiCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-slate-600 truncate">Proses ({prosesCount})</span>
              </div>
            </div>
          </div>

          {/* Visual 2: Sebaran per Badan Usaha (Progress Bar Bertingkat) */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-600" />
                  Sebaran per Badan Usaha
                </span>
                <span className="text-[10px] text-slate-500 font-mono">5 Entitas BU</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Proporsi pemenuhan rekomendasi pengawasan pada masing-masing unit kerja badan usaha.
              </p>

              <div className="space-y-2.5">
                {buDistribution.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 truncate max-w-[170px]">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        <strong className="text-emerald-700">{item.selesai}</strong>/{item.total} (
                        {item.persen.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                      <div
                        className="bg-emerald-500 h-full transition-all"
                        style={{ width: `${item.persen}%` }}
                        title={`${item.selesai} Selesai`}
                      />
                      <div
                        className="bg-amber-400 h-full transition-all"
                        style={{ width: `${100 - item.persen}%` }}
                        title={`${item.proses} Dalam Proses`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>Hijau: Selesai</span>
              <span>Kuning: Amandemen/Proses</span>
            </div>
          </div>

          {/* Visual 3: Tren Historis 2 KPI Utama (Dataset #3 & #4) */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  Tren Tahunan Dua KPI Utama
                </span>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                  2023 - 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Perkembangan % Evaluasi BU (DS #3) dan % Perbaikan PKS (DS #4) dari tahun ke tahun.
              </p>

              {/* Bar & Line Composed Chart */}
              <div className="h-40 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_KPI_TAHUNAN} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="tahun" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[80, 100]} tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F1E36',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '11px',
                        border: 'none',
                      }}
                      formatter={(val: any, name: any) => [`${val}%`, name]}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="persentaseEvaluasiPembinaan" name="KPI 1 (% Evaluasi BU)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="persentasePerbaikanPerubahan" name="KPI 2 (% Perbaikan PKS)" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Tahun 2026 mencapai rekor tertinggi: 94,6% (KPI 1) dan 91,8% (KPI 2).</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Recommendation Table / Minimalist Cards (Zero Clutter - Requirement #4) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              Status:
            </span>
            {(['Semua', 'Selesai', 'Dalam Proses'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  filterStatus === st
                    ? st === 'Selesai'
                      ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                      : st === 'Dalam Proses'
                      ? 'bg-amber-500 text-white shadow-2xs font-bold'
                      : 'bg-slate-900 text-white shadow-2xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}

            <select
              value={filterBu}
              onChange={(e) => setFilterBu(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-1 font-medium ml-1 focus:ring-1 focus:ring-sky-500"
            >
              <option value="Semua">Semua Badan Usaha</option>
              <option value="BU Pelabuhan">BU Pelabuhan</option>
              <option value="BU Bandar Udara">BU Bandar Udara</option>
              <option value="BU SPAM">BU SPAM (Air Bersih)</option>
              <option value="BU Fasilitas & Lingkungan">BU Fasilitas &amp; Lingkungan</option>
              <option value="Aset Properti & Komersial">Aset Properti &amp; Komersial</option>
            </select>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul kerjasama atau rekomendasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500 transition-all"
            />
          </div>
        </div>

        {/* Informative Note regarding Requirement #4 */}
        <div className="bg-sky-50/60 border border-sky-200/70 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs text-sky-800">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              <strong>Format Ringkas Ramah Pengguna:</strong> Hanya menampilkan 4 atribut esensial (Tanggal/Tahun, Judul Kerjasama, Rekomendasi, dan Status) agar mudah dipahami secara cepat.
            </span>
          </div>
          <span className="font-mono text-[11px] font-bold text-sky-900 shrink-0">
            {filteredData.length} dari {totalRekomendasi} Data Ditampilkan
          </span>
        </div>

        {/* Minimalist Table View */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-3 px-3.5 w-32">Tanggal &amp; Tahun</th>
                <th className="py-3 px-3.5 w-64">Judul Kerjasama / Badan Usaha</th>
                <th className="py-3 px-3.5">Rekomendasi Evaluasi &amp; Pengendalian</th>
                <th className="py-3 px-3.5 w-32 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">
                    Tidak ada butir rekomendasi yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Atribut 1: Tanggal, Bulan, Tahun */}
                    <td className="py-3 px-3.5 font-mono text-slate-600 align-top">
                      <div className="font-bold text-slate-800">
                        {item.tanggal} {item.bulan}
                      </div>
                      <span className="text-[11px] text-slate-400">Tahun {item.tahun}</span>
                    </td>

                    {/* Atribut 2: Judul & Badan Usaha */}
                    <td className="py-3 px-3.5 align-top">
                      <div className="font-bold text-slate-900 leading-snug">
                        {item.judul}
                      </div>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        {item.badanUsaha}
                      </span>
                    </td>

                    {/* Atribut 3: Butir Rekomendasi Evaluasi (To The Point) */}
                    <td className="py-3 px-3.5 text-slate-700 leading-relaxed align-top">
                      {item.rekomendasi}
                    </td>

                    {/* Atribut 4: Status Penyelesaian */}
                    <td className="py-3 px-3.5 text-center align-top">
                      {item.status === 'Selesai' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Selesai</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-300">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Dalam Proses</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
