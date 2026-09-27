import React, { useState, useMemo } from 'react';
import {
  Compass,
  Plane,
  BarChart3,
  Table as TableIcon,
  Search,
  ArrowRight,
  TrendingUp,
  MapPin,
  Globe2,
  Users,
  Percent,
  CheckCircle2,
  Sparkles,
  Layers,
  Calendar,
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
  Cell,
} from 'recharts';
import { AIRPORT_TOP_ROUTES } from './bandaraData';
import { AirportRouteData, BandaraFilterState } from './types';
import { BandaraVisualHeader } from './BandaraVisualHeader';

interface Dataset9RuteLangsungCardProps {
  filters?: BandaraFilterState;
  onOpenFormula: () => void;
}

export const Dataset9RuteLangsungCard: React.FC<Dataset9RuteLangsungCardProps> = ({
  filters,
  onOpenFormula,
}) => {
  const [activeSheet, setActiveSheet] = useState<'konektivitas' | 'komparasi' | 'tabel'>('konektivitas');
  const [searchRoute, setSearchRoute] = useState('');
  const [filterKategori, setFilterKategori] = useState<string>('Semua');

  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  // Filter routes based on local search & filter state
  const filteredRoutes = useMemo(() => {
    return AIRPORT_TOP_ROUTES.filter((r) => {
      if (filterKategori !== 'Semua' && r.kategori !== filterKategori) return false;
      if (searchRoute.trim() !== '') {
        const q = searchRoute.toLowerCase();
        return (
          r.kotaTujuan.toLowerCase().includes(q) ||
          r.kodeRute.toLowerCase().includes(q) ||
          r.namaBandara.toLowerCase().includes(q) ||
          r.maskapaiMelayani.some((m) => m.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [filterKategori, searchRoute]);

  const totalFrekuensiMingguan = filteredRoutes.reduce((sum, r) => sum + r.frekuensiMingguan, 0);
  const totalPaxTahunan = filteredRoutes.reduce((sum, r) => sum + r.totalPenumpangTahunan, 0);
  const avgSlf = Number((filteredRoutes.reduce((sum, r) => sum + r.seatLoadFactor, 0) / (filteredRoutes.length || 1)).toFixed(1));

  // Chart data sorted by frequency
  const chartFrequencyData = useMemo(() => {
    return [...filteredRoutes]
      .sort((a, b) => b.frekuensiMingguan - a.frekuensiMingguan)
      .map((r) => ({
        name: r.kotaTujuan.split('(')[0].trim(),
        fullDest: r.kotaTujuan,
        kodeRute: r.kodeRute,
        frekuensi: r.frekuensiMingguan,
        penumpangRibu: Number((r.totalPenumpangTahunan / 1000).toFixed(0)),
        penumpangAsli: r.totalPenumpangTahunan,
        slf: r.seatLoadFactor,
        kategori: r.kategori,
      }));
  }, [filteredRoutes]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs font-sans">
      {/* Visual Header Sesuai Standar Dashboard Pembangunan Infrastruktur (Req 6) */}
      <BandaraVisualHeader
        datasetNumber={9}
        pdfPages="Hal. 12"
        title="RUTE PENERBANGAN LANGSUNG DARI BATAM (BANDARA HANG NADIM)"
        visualName={
          activeSheet === 'konektivitas'
            ? 'Sheet 1: Visualisasi Peta Konektivitas Jaringan & Frekuensi Mingguan Rute Langsung'
            : activeSheet === 'komparasi'
            ? 'Sheet 2: Grafik Komparasi Traffic Penumpang & Okupansi (Seat Load Factor) per Rute'
            : 'Sheet 3: Tabel Rincian Rute Penerbangan Langsung dari Batam (Atribut Dokumen Satu Data Hal. 12)'
        }
        classification="TERBUKA"
        periode="JIKA UPDATE"
        attributes={[
          'RINCIAN RUTE PENERBANGAN LANGSUNG DARI BATAM',
          'KODE RUTE',
          'KOTA ASAL / TUJUAN',
          'FREKUENSI MINGGUAN',
          'TOTAL PENUMPANG TAHUNAN',
          'SEAT LOAD FACTOR (%)',
          'MASKAPAI MELAYANI',
        ]}
        rightControls={
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveSheet('konektivitas')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'konektivitas'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Sheet 1: Peta &amp; Frekuensi</span>
            </button>
            <button
              onClick={() => setActiveSheet('komparasi')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'komparasi'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Sheet 2: Penumpang &amp; SLF</span>
            </button>
            <button
              onClick={() => setActiveSheet('tabel')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'tabel'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Sheet 3: Tabel Rincian Rute</span>
            </button>
          </div>
        }
        onOpenFormula={onOpenFormula}
      />

      {/* Mini Executive Banner Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gradient-to-r from-sky-50/70 via-blue-50/40 to-slate-50 rounded-xl border border-sky-100 mb-4 text-xs">
        <div>
          <span className="text-slate-500 block text-[10.5px]">Total Rute Langsung Aktif</span>
          <span className="text-base font-mono font-black text-sky-950 block">{filteredRoutes.length} Destinasi</span>
          <span className="text-[10px] text-sky-700 block mt-0.5">Domestik &amp; Internasional</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Frekuensi Penerbangan Mingguan</span>
          <span className="text-base font-mono font-black text-slate-800 block">{totalFrekuensiMingguan} Frekuensi / Minggu</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Rata-rata 54 flights/hari</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Estimasi Penumpang Dilayani</span>
          <span className="text-base font-mono font-black text-emerald-700 block">{(totalPaxTahunan / 1000000).toFixed(2)} Juta Pax</span>
          <span className="text-[10px] text-emerald-800 block mt-0.5 font-semibold">Trafik Koridor Strategis</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Rata-rata Okupansi Rute (SLF)</span>
          <span className="text-base font-mono font-black text-indigo-700 block">{avgSlf}%</span>
          <span className="text-[10px] text-indigo-800 block mt-0.5 font-mono">Tingkat Isian Kursi Tinggi</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SHEET 1: VISUALISASI PETA KONEKTIVITAS JARINGAN & FREKUENSI MINGGUAN     */}
      {/* ========================================================================= */}
      {activeSheet === 'konektivitas' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Ranking Frekuensi Penerbangan Mingguan Rute Langsung dari Bandara Hang Nadim (BTH)
                </span>
                <p className="text-[10.5px] text-slate-500">
                  Koridor penerbangan terpadat menghubungkan Batam dengan pusat ekonomi nasional &amp; regional
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-sky-800 font-bold">
                  <span className="w-3 h-3 rounded-xs bg-sky-600 inline-block" />
                  <span>Rute Domestik</span>
                </span>
                <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
                  <span className="w-3 h-3 rounded-xs bg-indigo-500 inline-block" />
                  <span>Rute Internasional</span>
                </span>
              </div>
            </div>

            <div className="h-80 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartFrequencyData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 130, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} unit=" Flts" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 10.5, fill: '#1E293B', fontWeight: 600 }}
                    width={125}
                  />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${val} Penerbangan / Minggu (${item.payload.kategori})`,
                      'Frekuensi Mingguan',
                    ]}
                    labelFormatter={(label) => `Destinasi: ${label}`}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Bar dataKey="frekuensi" name="Frekuensi Mingguan" radius={[0, 4, 4, 0]} barSize={14}>
                    {chartFrequencyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.kategori === 'Internasional' ? '#6366F1' : '#0284C7'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hub & Spoke Connectivity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sky-950 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-700" />
                  Koridor Utama Sumatera - Jawa
                </span>
                <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded font-bold">
                  Trunk Route
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Rute BTH &harr; CGK (148x/minggu), BTH &harr; KNO (56x), dan BTH &harr; SUB (42x) menyumbang &gt; 65% total pergerakan penumpang Hang Nadim.
              </p>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-emerald-700" />
                  Konektivitas Kepulauan Riau
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                  Perintis &amp; ATR
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Menghubungkan Batam dengan pulau terdepan: Natuna Ranai (14x/minggu), Letung Anambas (7x/minggu), dan Dabo Singkep (7x/minggu).
              </p>
            </div>

            <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-purple-950 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-purple-700" />
                  Rute Internasional &amp; Regional
                </span>
                <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded font-bold">
                  Cross-Border
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Layanan langsung ke Kuala Lumpur (KUL, 14x/minggu), Subang (SZB, 7x/minggu), serta penerbangan carter turis Korea Seoul (ICN, 4x/minggu).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHEET 2: GRAFIK KOMPARASI VOLUME PENUMPANG & SEAT LOAD FACTOR (SLF %)    */}
      {/* ========================================================================= */}
      {activeSheet === 'komparasi' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Estimasi Total Penumpang Tahunan (Ribu Pax) &amp; Okupansi Kursi (Seat Load Factor %)
                </span>
                <p className="text-[10.5px] text-slate-500">
                  Tingkat keterisian kursi di atas 80% menunjukkan profitabilitas dan tingginya animo mobilitas penumpang
                </p>
              </div>
              <span className="text-[10.5px] font-mono text-slate-500">
                14 Rute Langsung Terjadwal
              </span>
            </div>

            <div className="h-80 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartFrequencyData} margin={{ top: 10, right: 30, left: 10, bottom: 35 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748B' }} unit="k Pax" />
                  <YAxis yAxisId="right" orientation="right" domain={[60, 100]} tick={{ fontSize: 11, fill: '#10B981' }} unit="%" />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      name === 'penumpangRibu' ? `${Number(val) * 1000} Pax / Tahun` : `${val}% SLF`,
                      name === 'penumpangRibu' ? 'Estimasi Penumpang' : 'Seat Load Factor',
                    ]}
                    labelFormatter={(label) => `Rute: ${label}`}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar yAxisId="left" dataKey="penumpangRibu" name="Estimasi Penumpang (x1000)" fill="#0284C7" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="slf" name="Seat Load Factor (%)" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHEET 3: TABEL RINCIAN RUTE PENERBANGAN LANGSUNG DARI BATAM (HAL. 12)    */}
      {/* ========================================================================= */}
      {activeSheet === 'tabel' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari Kota Tujuan, Kode Rute, Maskapai..."
                value={searchRoute}
                onChange={(e) => setSearchRoute(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded text-xs focus:outline-hidden focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterKategori}
                onChange={(e) => setFilterKategori(e.target.value)}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Domestik">Domestik</option>
                <option value="Internasional">Internasional</option>
              </select>

              <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 bg-white border border-slate-200 rounded">
                {filteredRoutes.length} Rute Langsung
              </span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3 font-mono">NO</th>
                    <th className="py-2.5 px-3 font-mono text-sky-950 font-bold bg-sky-50/70">KODE RUTE</th>
                    <th className="py-2.5 px-4 font-bold text-sky-950 bg-sky-50/70">KOTA TUJUAN</th>
                    <th className="py-2.5 px-4 font-bold text-sky-950 bg-sky-50/70">NAMA BANDARA TUJUAN</th>
                    <th className="py-2.5 px-3 text-center">KATEGORI</th>
                    <th className="py-2.5 px-3 text-right font-bold text-sky-950 bg-sky-50/70">FREKUENSI (MINGGU)</th>
                    <th className="py-2.5 px-3 text-right font-bold text-sky-950 bg-sky-50/70">TOTAL PAX (TAHUN)</th>
                    <th className="py-2.5 px-3 text-right">SLF (%)</th>
                    <th className="py-2.5 px-4">MASKAPAI MELAYANI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredRoutes.map((r, idx) => (
                    <tr key={r.kodeRute} className="hover:bg-sky-50/30 transition-colors">
                      <td className="py-3 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-3 font-mono font-bold text-sky-900 bg-sky-50/30">
                        {r.kodeRute}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {r.kotaTujuan}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        {r.namaBandara}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.kategori === 'Internasional'
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-sky-100 text-sky-800 border border-sky-200'
                        }`}>
                          {r.kategori}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-black text-slate-900 text-xs">
                        {r.frekuensiMingguan}x
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-sky-950">
                        {formatNumber(r.totalPenumpangTahunan)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700">
                        {r.seatLoadFactor}%
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {r.maskapaiMelayani.map((m, mIdx) => (
                            <span key={mIdx} className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                              {m}
                            </span>
                          ))}
                        </div>
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
