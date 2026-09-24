import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Table as TableIcon,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
  ShieldAlert,
  Coins,
  Receipt,
  Search,
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
  LineChart,
  Line,
} from 'recharts';
import {
  PNBP_BANDARA_ITEMS,
  TOTAL_ANGGARAN_PNBP,
  TOTAL_REALISASI_PNBP,
  CAPAIAN_TOTAL_PNBP_PERSEN,
} from './bandaraData';
import { BandaraVisualHeader } from './BandaraVisualHeader';

interface Dataset1PnbpBandaraCardProps {
  onOpenFormula: () => void;
}

// Monthly cashflow profile for airport PNBP
const MONTHLY_PNBP_DATA = [
  { bulan: 'Jan', anggaranM: 23.75, realisasiM: 25.10, pjp2uM: 12.2, pjp4uM: 6.8, lainnyaM: 6.1 },
  { bulan: 'Feb', anggaranM: 23.75, realisasiM: 23.40, pjp2uM: 11.4, pjp4uM: 6.2, lainnyaM: 5.8 },
  { bulan: 'Mar', anggaranM: 23.75, realisasiM: 26.80, pjp2uM: 12.9, pjp4uM: 7.1, lainnyaM: 6.8 },
  { bulan: 'Apr (Mudik)', anggaranM: 23.75, realisasiM: 29.50, pjp2uM: 14.8, pjp4uM: 7.8, lainnyaM: 6.9 },
  { bulan: 'Mei', anggaranM: 23.75, realisasiM: 25.60, pjp2uM: 12.5, pjp4uM: 6.7, lainnyaM: 6.4 },
  { bulan: 'Jun (Liburan)', anggaranM: 23.75, realisasiM: 28.50, pjp2uM: 14.1, pjp4uM: 7.4, lainnyaM: 7.0 },
  { bulan: 'Jul', anggaranM: 23.75, realisasiM: 27.80, pjp2uM: 13.6, pjp4uM: 7.2, lainnyaM: 7.0 },
  { bulan: 'Agu', anggaranM: 23.75, realisasiM: 26.20, pjp2uM: 12.8, pjp4uM: 6.9, lainnyaM: 6.5 },
  { bulan: 'Sep', anggaranM: 23.75, realisasiM: 25.00, pjp2uM: 12.2, pjp4uM: 6.6, lainnyaM: 6.2 },
  { bulan: 'Okt', anggaranM: 23.75, realisasiM: 25.40, pjp2uM: 12.4, pjp4uM: 6.7, lainnyaM: 6.3 },
  { bulan: 'Nov', anggaranM: 23.75, realisasiM: 25.20, pjp2uM: 12.3, pjp4uM: 6.6, lainnyaM: 6.3 },
  { bulan: 'Des (Nataru)', anggaranM: 23.75, realisasiM: 28.95, pjp2uM: 14.5, pjp4uM: 7.5, lainnyaM: 6.95 },
];

const DONUT_COLORS = ['#0284C7', '#0D9488', '#F59E0B', '#6366F1', '#EC4899'];

export const Dataset1PnbpBandaraCard: React.FC<Dataset1PnbpBandaraCardProps> = ({ onOpenFormula }) => {
  const [activeSheet, setActiveSheet] = useState<'grafik' | 'komposisi' | 'tabel'>('grafik');
  const [searchTable, setSearchTable] = useState('');

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatMilyar = (val: number) => {
    return `Rp ${(val / 1000000000).toFixed(2)} M`;
  };

  // Prepare data for Recharts (in Billion IDR)
  const chartData = PNBP_BANDARA_ITEMS.map((item) => ({
    name: item.jenisPenerimaan.length > 28 ? item.jenisPenerimaan.slice(0, 26) + '...' : item.jenisPenerimaan,
    fullName: item.jenisPenerimaan,
    anggaranM: item.anggaranPnbp / 1000000000,
    realisasiM: item.realisasiTotalIdr / 1000000000,
    capaianPersen: item.persentaseCapaian,
    surplusM: (item.realisasiTotalIdr - item.anggaranPnbp) / 1000000000,
    value: item.realisasiTotalIdr,
  }));

  const filteredTableItems = PNBP_BANDARA_ITEMS.filter((item) => {
    if (searchTable.trim() === '') return true;
    const q = searchTable.toLowerCase();
    return (
      item.jenisPenerimaan.toLowerCase().includes(q) ||
      item.kodeAkun.toLowerCase().includes(q) ||
      item.keterangan.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs font-sans">
      {/* Visual Header sesuai Standar Dashboard Pembangunan Infrastruktur */}
      <BandaraVisualHeader
        datasetNumber={1}
        pdfPages="Hal. 11"
        title="DATA REALISASI PENERIMAAN PENERIMAAN NEGARA BUKAN PAJAK (PNBP)"
        visualName={
          activeSheet === 'grafik'
            ? 'Sheet 1: Grafik Batang Komparasi Anggaran vs Realisasi Total IDR per Jenis Anggaran / Penerimaan'
            : activeSheet === 'komposisi'
            ? 'Sheet 2: Donut Chart & Tren Siklus Bulanan Kontribusi Realisasi PNBP'
            : 'Sheet 3: Tabel Detail Realisasi PNBP (3 Atribut Dokumen Satu Data Hal. 11)'
        }
        classification="TERTUTUP"
        periode="PERTAHUN"
        attributes={['1. JENIS ANGGARAN (PENERIMAAN)', '2. ANGGARAN PNBP (IDR)', '3. TOTAL IDR (REALISASI)']}
        rightControls={
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveSheet('grafik')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'grafik'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Sheet 1: Grafik Komparasi IDR</span>
            </button>
            <button
              onClick={() => setActiveSheet('komposisi')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'komposisi'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PieIcon className="w-3.5 h-3.5" />
              <span>Sheet 2: Komposisi &amp; Tren</span>
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
              <span>Sheet 3: Tabel Detail (3 Atribut)</span>
            </button>
          </div>
        }
        onOpenFormula={onOpenFormula}
      />

      {/* Mini Executive Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gradient-to-r from-sky-50/70 via-blue-50/40 to-slate-50 rounded-xl border border-sky-100 mb-4 text-xs">
        <div>
          <span className="text-slate-500 block text-[10.5px]">Total Realisasi PNBP (Total IDR)</span>
          <span className="text-base font-mono font-black text-sky-950 block">{formatMilyar(TOTAL_REALISASI_PNBP)}</span>
          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">Surplus +{formatMilyar(TOTAL_REALISASI_PNBP - TOTAL_ANGGARAN_PNBP)}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Target Anggaran PNBP (DIPA)</span>
          <span className="text-base font-mono font-black text-slate-800 block">{formatMilyar(TOTAL_ANGGARAN_PNBP)}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">5 Pos Retribusi &amp; Jasa</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Rasio Capaian Target</span>
          <span className="text-base font-mono font-black text-emerald-700 block">{CAPAIAN_TOTAL_PNBP_PERSEN}%</span>
          <span className="text-[10px] text-emerald-800 block mt-0.5 font-semibold">Melampaui Target (&gt; 100%)</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Penerimaan Terbesar</span>
          <span className="text-sm font-mono font-bold text-slate-900 block truncate">PJP2U (PSC Penumpang)</span>
          <span className="text-[10px] text-sky-800 block mt-0.5 font-mono">Rp 148,20 M (47,4%)</span>
        </div>
      </div>

      {/* SHEET 1: GRAFIK BATANG KOMPARASI TOTAL IDR vs ANGGARAN PER JENIS PENERIMAAN */}
      {activeSheet === 'grafik' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Grafik Komparasi: Realisasi Total IDR vs Anggaran PNBP per Jenis Penerimaan
                </span>
                <p className="text-[10.5px] text-slate-500">
                  Visualisasi direct comparison mengukur efektivitas pemungutan pendapatan jasa kebandarudaraan
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded-xs bg-slate-400 inline-block" />
                  <span>Anggaran PNBP (IDR)</span>
                </span>
                <span className="flex items-center gap-1.5 text-sky-800 font-bold">
                  <span className="w-3 h-3 rounded-xs bg-sky-600 inline-block" />
                  <span>Total Realisasi (IDR)</span>
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 180, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: '#64748B' }}
                    unit=" M"
                    domain={[0, 165]}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 10.5, fill: '#1E293B', fontWeight: 600 }}
                    width={175}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      `Rp ${Number(val).toFixed(2)} Miliar`,
                      name === 'anggaranM' ? 'Target Anggaran PNBP' : 'Realisasi Total IDR',
                    ]}
                    labelFormatter={(label) => `Pos: ${label}`}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Bar dataKey="anggaranM" name="Anggaran PNBP (IDR)" fill="#94A3B8" radius={[0, 4, 4, 0]} barSize={12} />
                  <Bar dataKey="realisasiM" name="Realisasi Total IDR" fill="#0284C7" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown Per Jenis Pos Card Strips */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {PNBP_BANDARA_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                className="bg-slate-50/80 hover:bg-sky-50/50 p-3 rounded-xl border border-slate-200 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded">
                    Pos #{idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 mt-1 line-clamp-2 leading-tight">
                    {item.jenisPenerimaan}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.kodeAkun}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/80">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] text-slate-500">Realisasi:</span>
                    <span className="text-xs font-mono font-bold text-sky-950">{formatMilyar(item.realisasiTotalIdr)}</span>
                  </div>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-[10px] text-slate-500">Anggaran:</span>
                    <span className="text-[11px] font-mono text-slate-600">{formatMilyar(item.anggaranPnbp)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10.5px]">
                    <span className="text-emerald-700 font-bold font-mono">+{item.persentaseCapaian}%</span>
                    <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold bg-emerald-100 text-emerald-800">
                      Tercapai
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SHEET 2: KOMPOSISI KONTRIBUSI SHARE (DONUT) & TREN SIKLUS BULANAN */}
      {activeSheet === 'komposisi' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Donut Chart: Komposisi Share per Jenis Penerimaan */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3.5">
              <span className="text-xs font-bold text-slate-800 block">
                Komposisi Kontribusi Total IDR PNBP Bandara
              </span>
              <p className="text-[10.5px] text-slate-500 mb-2">
                Pangsa pendapatan terbesar berasal dari PJP2U (PSC) dan PJP4U (Landing fee)
              </p>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="fullName"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`${formatIDR(val)} (${((val / TOTAL_REALISASI_PNBP) * 100).toFixed(1)}%)`, 'Total IDR']}
                      contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 mt-2">
                {chartData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: DONUT_COLORS[idx % DONUT_COLORS.length] }} />
                      <span className="text-slate-700 truncate">{item.fullName}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 shrink-0">
                      {((item.value / TOTAL_REALISASI_PNBP) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Line Chart: Tren Siklus Realisasi Bulanan Bandara */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-800">
                    Tren Realisasi Bulanan PNBP Bandara vs Rata-rata Anggaran
                  </span>
                  <p className="text-[10.5px] text-slate-500">
                    Lonjakan penerimaan terjadi pada Peak Season Lebaran (Apr) dan Nataru (Des)
                  </p>
                </div>
                <span className="text-[10.5px] font-mono text-slate-500">Satuan: Miliar IDR</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MONTHLY_PNBP_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                    <YAxis domain={[20, 32]} tick={{ fontSize: 11, fill: '#64748B' }} unit=" M" />
                    <Tooltip
                      formatter={(val: any) => [`Rp ${val} Miliar`, '']}
                      contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Line type="monotone" dataKey="realisasiM" name="Total Realisasi Bulanan" stroke="#0284C7" strokeWidth={2.5} dot={{ r: 4, fill: '#0284C7' }} />
                    <Line type="monotone" dataKey="anggaranM" name="Batas Rata-rata Anggaran (Rp 23,75 M)" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHEET 3: TABEL DETAIL (3 ATRIBUT RESMI SESUAI BUKU SATU DATA HAL. 11) */}
      {activeSheet === 'tabel' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari Jenis Penerimaan, Kode Akun..."
                value={searchTable}
                onChange={(e) => setSearchTable(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded text-xs focus:outline-hidden focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
              Menampilkan {filteredTableItems.length} Pos Penerimaan Resmi
            </span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3 font-mono">NO</th>
                    <th className="py-2.5 px-4 text-sky-950 font-bold bg-sky-50/70">
                      1. JENIS ANGGARAN (PENERIMAAN)
                    </th>
                    <th className="py-2.5 px-4 text-right text-sky-950 font-bold bg-sky-50/70">
                      2. ANGGARAN PNBP (IDR)
                    </th>
                    <th className="py-2.5 px-4 text-right text-sky-950 font-bold bg-sky-50/70">
                      3. TOTAL IDR (REALISASI)
                    </th>
                    <th className="py-2.5 px-4 text-right">CAPAIAN (%)</th>
                    <th className="py-2.5 px-4 text-right">SELISIH / SURPLUS</th>
                    <th className="py-2.5 px-3 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredTableItems.map((item, idx) => {
                    const surplus = item.realisasiTotalIdr - item.anggaranPnbp;
                    return (
                      <tr key={item.id} className="hover:bg-sky-50/30 transition-colors">
                        <td className="py-3 px-3 font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{item.jenisPenerimaan}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.kodeAkun}</div>
                          <div className="text-[10.5px] text-slate-500 mt-1 line-clamp-1 italic">{item.keterangan}</div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-semibold text-slate-700">
                          {formatIDR(item.anggaranPnbp)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-black text-sky-950 bg-sky-50/30">
                          {formatIDR(item.realisasiTotalIdr)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-black text-emerald-800">
                          {item.persentaseCapaian.toFixed(2)}%
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">
                          +{formatIDR(surplus)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            SURPLUS
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {/* TOTAL ROW */}
                  <tr className="bg-slate-100/80 font-bold border-t-2 border-slate-300 text-xs">
                    <td colSpan={2} className="py-3 px-4 uppercase text-slate-900 font-black">
                      TOTAL REALISASI PNBP (DIREKTORAT PENGELOLAAN KAWASAN BANDARA)
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-black text-slate-800">
                      {formatIDR(TOTAL_ANGGARAN_PNBP)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-black text-sky-950 bg-sky-100/50">
                      {formatIDR(TOTAL_REALISASI_PNBP)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-black text-emerald-800">
                      {CAPAIAN_TOTAL_PNBP_PERSEN}%
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-black text-emerald-800">
                      +{formatIDR(TOTAL_REALISASI_PNBP - TOTAL_ANGGARAN_PNBP)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                        TERCAPAI
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
