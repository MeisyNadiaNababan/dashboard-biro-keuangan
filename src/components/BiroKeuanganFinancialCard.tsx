import React, { useState } from 'react';
import {
  TrendingUp,
  Wallet,
  BarChart3,
  HelpCircle,
  Layers,
  Table as TableIcon,
  CheckCircle2,
  Clock,
  Building2,
  Coins,
  ArrowRightLeft,
  Filter,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { RevenueItem, ExpenseItem } from '../types';
import {
  REVENUE_TOTAL,
  EXPENSE_TOTAL,
} from '../data/mockData';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface BiroKeuanganFinancialCardProps {
  revenueItems: RevenueItem[];
  expenseItems: ExpenseItem[];
  selectedYear: string;
  selectedUnit?: string;
  selectedMonth?: string;
  onExplainKpi?: (kpiId: string) => void;
}

type FinancialTabType = 'pendapatan' | 'belanja';
type DisplayMode = 'chart' | 'table';

export const BiroKeuanganFinancialCard: React.FC<BiroKeuanganFinancialCardProps> = ({
  revenueItems,
  expenseItems,
  selectedYear,
  selectedUnit = 'ALL',
  selectedMonth = 'April',
  onExplainKpi,
}) => {
  const [activeTab, setActiveTab] = useState<FinancialTabType>('pendapatan');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('chart');

  // Calculations for Revenue BANs
  const totalRevTarget = revenueItems.reduce((acc, r) => acc + (r.target || 0), 0) || REVENUE_TOTAL.target;
  const totalRevReal = revenueItems.reduce((acc, r) => acc + (r.realisasi || 0), 0) || REVENUE_TOTAL.realisasi;
  const avgRevCapaian = Math.round((totalRevReal / totalRevTarget) * 1000) / 10;
  const sisaRevTarget = Math.max(0, totalRevTarget - totalRevReal);

  // Calculations for Expense BANs
  const totalExpPagu = expenseItems.reduce((acc, e) => acc + (e.pagu || 0), 0) || EXPENSE_TOTAL.pagu;
  const totalExpReal = expenseItems.reduce((acc, e) => acc + (e.realisasi || 0), 0) || EXPENSE_TOTAL.realisasi;
  const avgExpSerapan = Math.round((totalExpReal / totalExpPagu) * 1000) / 10;
  const sisaExpPagu = Math.max(0, totalExpPagu - totalExpReal);

  // Chart Data for Pendapatan (Clustered Bar)
  const chartDataRevenue = revenueItems.map((item, idx) => {
    const capaian = item.capaian ?? (item.target ? (item.realisasi / item.target) * 100 : 0);
    // Short label for X-axis
    let shortName = item.sumber
      .replace('Dit. Pengelolaan ', '')
      .replace('Direktorat ', '')
      .replace('Badan Usaha ', 'BU ')
      .replace('BU SPAM, Fasilitas dan Lingkungan', 'BU SPAM & Fasling')
      .replace('Pengelolaan Kawasan Bandara', 'Bandara')
      .replace('Pengelolaan Kepelabuhanan', 'Pelabuhan')
      .replace('Pengelolaan Pertanahan', 'Pertanahan / Lahan')
      .replace('Pelayanan Terpadu Satu Pintu', 'PTSP')
      .replace('Rumah Sakit BP Batam', 'RSBP Batam');

    return {
      id: item.id,
      name: shortName,
      fullName: item.sumber,
      target: parseFloat(item.target.toFixed(1)),
      realisasi: parseFloat(item.realisasi.toFixed(1)),
      sisa: parseFloat(Math.max(0, item.target - item.realisasi).toFixed(1)),
      capaian: parseFloat(capaian.toFixed(1)),
      status: capaian >= 50 ? 'On-Track (Q2)' : capaian >= 35 ? 'Sedang' : 'Perlu Optimasi',
    };
  });

  // Chart Data for Belanja (Clustered Bar)
  const chartDataExpense = expenseItems.map((item, idx) => {
    const programName = item.program || item.unitKerja || `Komponen ${idx + 1}`;
    const serapan = item.serapan ?? item.persentase ?? (item.pagu ? (item.realisasi / item.pagu) * 100 : 0);
    let shortName = programName
      .replace('Direktorat ', 'Dit. ')
      .replace(' (Pembangunan & Pemeliharaan)', '')
      .replace(' & Pengembangan Kawasan', '')
      .replace('Peningkatan Kualitas Layanan Medis', 'Layanan Medis RS')
      .replace('Belanja Operasional & ', 'Operasional & ')
      .replace('Belanja Pegawai dan Remunerasi', 'Gaji & Remunerasi');

    if (shortName.length > 20) {
      shortName = shortName.substring(0, 18) + '...';
    }

    return {
      id: item.id,
      name: shortName,
      fullName: programName,
      pagu: parseFloat(item.pagu.toFixed(1)),
      realisasi: parseFloat(item.realisasi.toFixed(1)),
      sisa: parseFloat(Math.max(0, item.pagu - item.realisasi).toFixed(1)),
      serapan: parseFloat(serapan.toFixed(1)),
      status: serapan >= 30 ? 'Normal (Q2)' : serapan >= 20 ? 'Moderat' : 'Percepatan SP2D',
    };
  });

  // Tooltip for Revenue Chart
  const CustomTooltipRevenue = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-2 max-w-xs select-none">
          <div className="font-bold text-sky-300 border-b border-slate-800 pb-1">
            {data.fullName}
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Target Perkin {selectedYear}:</span>
              <span className="font-bold font-mono text-slate-200">Rp {data.target} Miliar</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-sky-400">Realisasi Kas Masuk:</span>
              <span className="font-bold font-mono text-sky-300">Rp {data.realisasi} Miliar</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-rose-400">Sisa Target:</span>
              <span className="font-mono text-rose-300">Rp {data.sisa} Miliar</span>
            </div>
            <div className="flex justify-between gap-4 pt-1.5 border-t border-slate-800 items-center">
              <span className="text-slate-400">Persentase Capaian:</span>
              <span className="font-bold font-mono text-emerald-400 text-xs bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                {data.capaian}% ({data.status})
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Tooltip for Expense Chart
  const CustomTooltipExpense = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-2 max-w-xs select-none">
          <div className="font-bold text-emerald-300 border-b border-slate-800 pb-1">
            {data.fullName}
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Pagu DIPA {selectedYear}:</span>
              <span className="font-bold font-mono text-slate-200">Rp {data.pagu} Miliar</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-emerald-400">Realisasi SP2D:</span>
              <span className="font-bold font-mono text-emerald-300">Rp {data.realisasi} Miliar</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-amber-400">Sisa Pagu DIPA:</span>
              <span className="font-mono text-amber-300">Rp {data.sisa} Miliar</span>
            </div>
            <div className="flex justify-between gap-4 pt-1.5 border-t border-slate-800 items-center">
              <span className="text-slate-400">Tingkat Serapan:</span>
              <span className="font-bold font-mono text-emerald-400 text-xs bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                {data.serapan}% ({data.status})
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden flex flex-col font-sans select-none">
      {/* 1. Header with Data Tab Switcher & Sheet Swap Mode Controls */}
      <div className="px-4 py-3.5 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#002B49] text-white flex items-center justify-center shrink-0 shadow-2xs">
            {activeTab === 'pendapatan' ? (
              <TrendingUp className="w-5 h-5 text-sky-400" />
            ) : (
              <Wallet className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {activeTab === 'pendapatan'
                  ? 'Realisasi Pendapatan PNBP Satker'
                  : 'Realisasi Penyerapan Belanja DIPA'}{' '}
                • TA {selectedYear}
              </h3>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded font-bold text-[10px] font-mono border border-blue-200">
                {activeTab === 'pendapatan' ? 'DATASET ITEM #1 & #2' : 'DATASET ITEM #3 & #4'}
              </span>
              {selectedUnit !== 'ALL' && (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded font-bold">
                  {selectedUnit}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              {activeTab === 'pendapatan'
                ? 'Monitoring Target Perkin vs Kas Masuk Riil Satker Penghasil PNBP BP Batam'
                : 'Monitoring Pagu Alokasi DIPA vs Realisasi Pembayaran SP2D Lintas Program'}
            </p>
          </div>
        </div>

        {/* Action Controls: Tab Switcher & Sheet Swap (Grafik vs Tabel) */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Sub-Tab Switcher: Pendapatan vs Belanja */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold border border-slate-200/80">
            <button
              onClick={() => setActiveTab('pendapatan')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'pendapatan'
                  ? 'bg-[#002B49] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Pendapatan PNBP</span>
              <span className="ml-1 text-[10px] opacity-80 font-mono hidden sm:inline">({avgRevCapaian}%)</span>
            </button>
            <button
              onClick={() => setActiveTab('belanja')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'belanja'
                  ? 'bg-[#002B49] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Realisasi Belanja</span>
              <span className="ml-1 text-[10px] opacity-80 font-mono hidden sm:inline">({avgExpSerapan}%)</span>
            </button>
          </div>

          {/* Sheet Swap View Toggle: Grafik Interaktif vs Tabel Pivot */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs text-xs font-medium">
            <button
              onClick={() => setDisplayMode('chart')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                displayMode === 'chart'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Grafis</span>
            </button>
            <button
              onClick={() => setDisplayMode('table')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                displayMode === 'table'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          {onExplainKpi && (
            <button
              onClick={() => {
                if (activeTab === 'pendapatan') onExplainKpi('rev_capaian');
                else onExplainKpi('exp_serapan');
              }}
              className="text-xs font-semibold text-[#1F4E79] bg-white hover:bg-blue-50 border border-slate-200 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
              title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Rumus</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content: Recharts Visualization or Tableau Pivot Crosstab */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Tableau Shelves Badge */}
        {activeTab === 'pendapatan' ? (
          <TableauShelvesBadge
            showMe="Show Me #4 (Clustered / Side-by-Side Bar Chart)"
            columns="[Satker Penghasil PNBP]"
            rows="SUM([Target Perkin (Rp M)]), SUM([Realisasi Kas Masuk (Rp M)])"
            color="[Measure Names]: Target (Abu-abu) vs Realisasi (Navy)"
            filters="[Tahun]=2026, [Status]='Aktif'"
            detail="Komparasi Capaian PNBP Satker Terhadap Target Perkin Tahunan"
          />
        ) : (
          <TableauShelvesBadge
            showMe="Show Me #4 (Clustered / Side-by-Side Bar Chart)"
            columns="[Komponen Program Belanja]"
            rows="SUM([Pagu DIPA (Rp M)]), SUM([Realisasi Belanja SP2D (Rp M)])"
            color="[Measure Names]: Pagu (Slate) vs Realisasi (Emerald)"
            filters="[Tahun]=2026, [Status]='Aktif'"
            detail="Komparasi Realisasi Serapan Belanja Satker Terhadap Alokasi Pagu DIPA"
          />
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 1: PENDAPATAN PNBP                               */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'pendapatan' && (
          <>
            {displayMode === 'chart' ? (
              <div className="space-y-4">
                {/* Recharts Clustered Bar Chart */}
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#002B49]" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Grafik Komparasi Target Perkin vs Realisasi Kas Masuk per Satker (Rp Miliar)
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      Akumulasi Realisasi: <strong className="text-slate-800 font-bold">Rp {totalRevReal.toFixed(1)} M</strong> dari Rp {totalRevTarget.toFixed(1)} M
                    </span>
                  </div>

                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartDataRevenue}
                        margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                          axisLine={{ stroke: '#cbd5e1' }}
                          interval={0}
                          angle={-12}
                          textAnchor="end"
                          height={40}
                        />
                        <YAxis
                          unit=" M"
                          tick={{ fontSize: 10, fill: '#64748b' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip content={<CustomTooltipRevenue />} />
                        <Legend
                          wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                          iconType="circle"
                        />
                        <Bar
                          dataKey="target"
                          name="Target Perkin (Rp M)"
                          fill="#94a3b8"
                          radius={[4, 4, 0, 0]}
                          barSize={18}
                        />
                        <Bar
                          dataKey="realisasi"
                          name="Realisasi Kas Masuk (Rp M)"
                          fill="#002B49"
                          radius={[4, 4, 0, 0]}
                          barSize={18}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              /* Pivot Crosstab Table Mode */
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-[#002B49]" />
                    Tabel Rincian Capaian Realisasi PNBP Satker
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {chartDataRevenue.length} Satker Terdaftar
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002B49] text-white font-bold text-[11px] uppercase tracking-wider">
                        <th className="px-3.5 py-2.5 text-center w-12 border-r border-blue-900">No</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-900">Satker Penghasil PNBP</th>
                        <th className="px-3.5 py-2.5 text-right border-r border-blue-900">Target Perkin (Rp M)</th>
                        <th className="px-3.5 py-2.5 text-right border-r border-blue-900">Realisasi Riil (Rp M)</th>
                        <th className="px-3.5 py-2.5 text-right border-r border-blue-900">Sisa Target (Rp M)</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-900">Capaian (%)</th>
                        <th className="px-3.5 py-2.5 text-center">Status Q2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {chartDataRevenue.map((item, idx) => (
                        <tr
                          key={item.id}
                          onClick={() => onExplainKpi?.('pendapatan')}
                          className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                        >
                          <td className="px-3.5 py-2.5 text-center font-mono font-bold text-slate-600 border-r border-slate-200">
                            {idx + 1}
                          </td>
                          <td className="px-3.5 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                            {item.fullName}
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-mono text-slate-700 border-r border-slate-200">
                            Rp {item.target.toFixed(1)} M
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-mono font-black text-[#002B49] border-r border-slate-200 bg-blue-50/30">
                            Rp {item.realisasi.toFixed(1)} M
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-mono text-rose-600 border-r border-slate-200">
                            Rp {item.sisa.toFixed(1)} M
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-black border-r border-slate-200">
                            <span
                              className={`px-2 py-0.5 rounded-md ${
                                item.capaian >= 50
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-blue-50 text-blue-800 border border-blue-200'
                              }`}
                            >
                              {item.capaian}%
                            </span>
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-medium">
                            <span className="text-slate-600 text-[11px]">{item.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                      <tr>
                        <td className="px-3.5 py-2.5 text-center font-mono border-r border-slate-200" colSpan={2}>
                          Total Akumulasi Satker PNBP
                        </td>
                        <td className="px-3.5 py-2.5 text-right font-mono border-r border-slate-200">
                          Rp {totalRevTarget.toFixed(1)} M
                        </td>
                        <td className="px-3.5 py-2.5 text-right font-mono text-[#002B49] border-r border-slate-200">
                          Rp {totalRevReal.toFixed(1)} M
                        </td>
                        <td className="px-3.5 py-2.5 text-right font-mono text-rose-600 border-r border-slate-200">
                          Rp {sisaRevTarget.toFixed(1)} M
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-emerald-700 border-r border-slate-200">
                          {avgRevCapaian.toFixed(1)}%
                        </td>
                        <td className="px-3.5 py-2.5 text-center text-emerald-700">
                          Tercapai
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: REALISASI BELANJA                             */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'belanja' && (
          <>
            {displayMode === 'chart' ? (
              <div className="space-y-4">
                {/* Recharts Clustered Bar Chart for Belanja */}
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Grafik Komparasi Pagu DIPA vs Realisasi Belanja SP2D (Rp Miliar)
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      Akumulasi Serapan: <strong className="text-emerald-700 font-bold">Rp {totalExpReal.toFixed(1)} M</strong> dari Rp {totalExpPagu.toFixed(1)} M ({avgExpSerapan}%)
                    </span>
                  </div>

                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartDataExpense}
                        margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                          axisLine={{ stroke: '#cbd5e1' }}
                          interval={0}
                          angle={-12}
                          textAnchor="end"
                          height={40}
                        />
                        <YAxis
                          unit=" M"
                          tick={{ fontSize: 10, fill: '#64748b' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip content={<CustomTooltipExpense />} />
                        <Legend
                          wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                          iconType="circle"
                        />
                        <Bar
                          dataKey="pagu"
                          name="Pagu DIPA (Rp M)"
                          fill="#94a3b8"
                          radius={[4, 4, 0, 0]}
                          barSize={18}
                        />
                        <Bar
                          dataKey="realisasi"
                          name="Realisasi Belanja SP2D (Rp M)"
                          fill="#10b981"
                          radius={[4, 4, 0, 0]}
                          barSize={18}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              /* Pivot Crosstab Table Mode for Belanja */
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-emerald-700" />
                    Tabel Rincian Serapan Belanja DIPA Satker
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {chartDataExpense.length} Komponen Belanja
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002B49] text-white font-bold text-[11px] uppercase tracking-wider">
                        <th className="px-3.5 py-2.5 text-center w-12 border-r border-blue-900">No</th>
                        <th className="px-3.5 py-2.5 border-r border-blue-900">Program / Komponen Belanja</th>
                        <th className="px-3.5 py-2.5 text-right border-r border-blue-900">Pagu DIPA (Rp M)</th>
                        <th className="px-3.5 py-2.5 text-right border-r border-blue-900">Realisasi SP2D (Rp M)</th>
                        <th className="px-3.5 py-2.5 text-right border-r border-blue-900">Sisa Pagu (Rp M)</th>
                        <th className="px-3.5 py-2.5 text-center border-r border-blue-900">Serapan (%)</th>
                        <th className="px-3.5 py-2.5 text-center">Status Q2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {chartDataExpense.map((item, idx) => (
                        <tr
                          key={item.id}
                          onClick={() => onExplainKpi?.('belanja')}
                          className="hover:bg-emerald-50/40 cursor-pointer transition-colors"
                        >
                          <td className="px-3.5 py-2.5 text-center font-mono font-bold text-slate-600 border-r border-slate-200">
                            {idx + 1}
                          </td>
                          <td className="px-3.5 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                            {item.fullName}
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-mono text-slate-700 border-r border-slate-200">
                            Rp {item.pagu.toFixed(1)} M
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-mono font-black text-emerald-700 border-r border-slate-200 bg-emerald-50/30">
                            Rp {item.realisasi.toFixed(1)} M
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-mono text-amber-700 border-r border-slate-200">
                            Rp {item.sisa.toFixed(1)} M
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-mono font-black border-r border-slate-200">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {item.serapan}%
                            </span>
                          </td>
                          <td className="px-3.5 py-2.5 text-center font-medium">
                            <span className="text-slate-600 text-[11px]">{item.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                      <tr>
                        <td className="px-3.5 py-2.5 text-center font-mono border-r border-slate-200" colSpan={2}>
                          Total Akumulasi Belanja DIPA
                        </td>
                        <td className="px-3.5 py-2.5 text-right font-mono border-r border-slate-200">
                          Rp {totalExpPagu.toFixed(1)} M
                        </td>
                        <td className="px-3.5 py-2.5 text-right font-mono text-emerald-700 border-r border-slate-200">
                          Rp {totalExpReal.toFixed(1)} M
                        </td>
                        <td className="px-3.5 py-2.5 text-right font-mono text-amber-700 border-r border-slate-200">
                          Rp {sisaExpPagu.toFixed(1)} M
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-emerald-700 border-r border-slate-200">
                          {avgExpSerapan.toFixed(1)}%
                        </td>
                        <td className="px-3.5 py-2.5 text-center text-emerald-700">
                          On-Track
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
