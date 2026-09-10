import React, { useState } from 'react';
import {
  TrendingUp,
  Wallet,
  Receipt,
  FileSpreadsheet,
  Layers,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import { RevenueItem, ExpenseItem } from '../types';
import {
  REVENUE_TOTAL,
  EXPENSE_TOTAL,
  RINCIAN_TARGET_PNBP_DATA,
  LAPORAN_REALISASI_ANGGARAN_BLU_DATA,
  REKAPITULASI_PAGU_ANGGARAN_DATA
} from '../data/mockData';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface BiroKeuanganFinancialCardProps {
  revenueItems: RevenueItem[];
  expenseItems: ExpenseItem[];
  selectedYear: string;
  selectedUnit?: string;
  selectedMonth?: string;
}

type FinancialTabType = 'pendapatan' | 'belanja' | 'rincian_pnbp' | 'realisasi_blu';

export const BiroKeuanganFinancialCard: React.FC<BiroKeuanganFinancialCardProps> = ({
  revenueItems,
  expenseItems,
  selectedYear,
  selectedUnit = 'ALL',
  selectedMonth = 'April',
}) => {
  const [activeTab, setActiveTab] = useState<FinancialTabType>('pendapatan');

  // Calculation for Revenue BANs
  const totalRevTarget = revenueItems.reduce((acc, r) => acc + (r.target || 0), 0) || REVENUE_TOTAL.target;
  const totalRevReal = revenueItems.reduce((acc, r) => acc + (r.realisasi || 0), 0) || REVENUE_TOTAL.realisasi;
  const avgRevCapaian = Math.round((totalRevReal / totalRevTarget) * 1000) / 10;
  const sisaRevTarget = Math.max(0, totalRevTarget - totalRevReal);

  // Calculation for Expense BANs
  const totalExpPagu = expenseItems.reduce((acc, e) => acc + (e.pagu || 0), 0) || EXPENSE_TOTAL.pagu;
  const totalExpReal = expenseItems.reduce((acc, e) => acc + (e.realisasi || 0), 0) || EXPENSE_TOTAL.realisasi;
  const avgExpSerapan = Math.round((totalExpReal / totalExpPagu) * 1000) / 10;
  const sisaExpPagu = Math.max(0, totalExpPagu - totalExpReal);

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans select-none">
      {/* Tableau Worksheet Title Bar with Mode/Table Switcher (Like PDSI Data Center) */}
      <div className="px-4 py-3.5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-2xs" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-2">
              <span>Performa Keuangan BLU BP Batam • TA {selectedYear}</span>
              {selectedUnit !== 'ALL' && (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded font-bold">
                  Filtered: {selectedUnit}
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-500 font-normal">
              Swap Tabel Data: Pendapatan PNBP, Alokasi &amp; Serapan Belanja, Rincian Akun (Item 7), dan Realisasi BLU (Item 3)
            </p>
          </div>
        </div>

        {/* Tableau Worksheet Table Switcher (Direct Swap without Detail Modal Button) */}
        <div className="flex items-center bg-[#E2E8F0] p-0.5 rounded text-xs font-semibold flex-wrap">
          <button
            onClick={() => setActiveTab('pendapatan')}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pendapatan'
                ? 'bg-[#1F4E79] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Pendapatan PNBP (IKS-03)</span>
          </button>
          <button
            onClick={() => setActiveTab('belanja')}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'belanja'
                ? 'bg-[#1F4E79] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Realisasi Belanja (Pagu)</span>
          </button>
          <button
            onClick={() => setActiveTab('rincian_pnbp')}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rincian_pnbp'
                ? 'bg-[#1F4E79] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Rincian Akun PNBP (Item 7)</span>
          </button>
          <button
            onClick={() => setActiveTab('realisasi_blu')}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'realisasi_blu'
                ? 'bg-[#1F4E79] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Realisasi Anggaran BLU (Item 3)</span>
          </button>
        </div>
      </div>

      {/* Tableau BAN (Big Numbers) Strip */}
      <div className="p-4 border-b border-[#E2E8F0] bg-white grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {activeTab === 'pendapatan' && (
          <>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Target Perkin {selectedYear}
              </span>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                Rp {totalRevTarget.toFixed(1)} M
              </div>
              <span className="text-[10px] text-slate-500">10 Satker Penghasil</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Realisasi YTD ({selectedMonth})
              </span>
              <div className="text-xl font-black text-[#59A14F] font-mono mt-0.5">
                Rp {totalRevReal.toFixed(1)} M
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold">Kas Masuk BLU</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                % Capaian Target
              </span>
              <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5">
                {avgRevCapaian}%
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">Benchmark Q2: 50,0%</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Sisa Target Perkin
              </span>
              <div className="text-xl font-black text-[#E15759] font-mono mt-0.5">
                Rp {sisaRevTarget.toFixed(1)} M
              </div>
              <span className="text-[10px] text-slate-500">Kebutuhan Q3 &amp; Q4</span>
            </div>
          </>
        )}

        {activeTab === 'belanja' && (
          <>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Pagu DIPA {selectedYear}
              </span>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                Rp {totalExpPagu.toFixed(1)} M
              </div>
              <span className="text-[10px] text-slate-500">Alokasi Belanja Satker</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Realisasi YTD ({selectedMonth})
              </span>
              <div className="text-xl font-black text-[#4E79A7] font-mono mt-0.5">
                Rp {totalExpReal.toFixed(1)} M
              </div>
              <span className="text-[10px] text-blue-700 font-semibold">Belanja Terserap</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                % Tingkat Serapan
              </span>
              <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5">
                {avgExpSerapan}%
              </div>
              <span className="text-[10px] text-amber-600 font-semibold">Benchmark Q2: 35,0%</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Sisa Pagu Belanja
              </span>
              <div className="text-xl font-black text-slate-800 font-mono mt-0.5">
                Rp {sisaExpPagu.toFixed(1)} M
              </div>
              <span className="text-[10px] text-slate-500">Siap Dialokasikan</span>
            </div>
          </>
        )}

        {activeTab === 'rincian_pnbp' && (
          <>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Akun PNBP
              </span>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                {RINCIAN_TARGET_PNBP_DATA.length} Akun
              </div>
              <span className="text-[10px] text-slate-500">Item 7 SIMKEU</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Pagu Target
              </span>
              <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5">
                Rp {RINCIAN_TARGET_PNBP_DATA.reduce((acc, i) => acc + i.jumlah, 0).toFixed(1)} M
              </div>
              <span className="text-[10px] text-blue-700 font-semibold">Target Resmi APBN</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Akun Terbesar
              </span>
              <div className="text-xl font-black text-[#59A14F] font-mono mt-0.5">
                Rp 964,3 M
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold">425111 - UWT Lahan</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Status Integrasi
              </span>
              <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
                Sinkron Live
              </div>
              <span className="text-[10px] text-slate-500">SIMKEU &amp; SAKTI</span>
            </div>
          </>
        )}

        {activeTab === 'realisasi_blu' && (
          <>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Komponen Belanja
              </span>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                {LAPORAN_REALISASI_ANGGARAN_BLU_DATA.length} Baris
              </div>
              <span className="text-[10px] text-slate-500">Item 3 SIMKEU</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Anggaran
              </span>
              <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5">
                Rp {LAPORAN_REALISASI_ANGGARAN_BLU_DATA.reduce((acc, i) => acc + i.anggaran, 0).toFixed(1)} M
              </div>
              <span className="text-[10px] text-blue-700 font-semibold">Operasional + Modal</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Realisasi
              </span>
              <div className="text-xl font-black text-[#59A14F] font-mono mt-0.5">
                Rp {LAPORAN_REALISASI_ANGGARAN_BLU_DATA.reduce((acc, i) => acc + i.realisasi, 0).toFixed(1)} M
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold">Terserap YTD</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Status Likuiditas
              </span>
              <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
                Surplus Kas
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold">+Rp 3,18 Miliar</span>
            </div>
          </>
        )}
      </div>

      {/* Tableau Shelves Mapping Badge */}
      <div className="px-4 pt-3">
        {activeTab === 'pendapatan' && (
          <TableauShelvesBadge
            showMe="Show Me #6 (Horizontal Bar) & #1 (Crosstab)"
            rows="[sumber] (Unit Kerja Penghasil)"
            columns="SUM([target]), SUM([realisasi]), % Capaian"
            color="[Realisasi PNBP]"
            referenceLine="Target Perkin & Ref Q2 (50%)"
            filters={`[tahun]='${selectedYear}', [bulan]='${selectedMonth}'`}
          />
        )}
        {activeTab === 'belanja' && (
          <TableauShelvesBadge
            showMe="Show Me #6 (Horizontal Bar) & #1 (Crosstab)"
            rows="[jenis_anggaran] / [unitKerja]"
            columns="SUM([pagu]), SUM([realisasi]), % Serapan"
            color="[Realisasi Belanja]"
            referenceLine="Pagu DIPA & Benchmark Q2 (35%)"
            filters={`[tahun]='${selectedYear}', [bulan]='${selectedMonth}'`}
          />
        )}
        {activeTab === 'rincian_pnbp' && (
          <TableauShelvesBadge
            showMe="Show Me #1 (Text Table / Crosstab)"
            rows="[kode_akun], [uraian_akun]"
            columns="SUM([jumlah]) (Rp Miliar)"
            color="[kategori]"
            detail="Tabel Item 7 SIMKEU BP Batam"
          />
        )}
        {activeTab === 'realisasi_blu' && (
          <TableauShelvesBadge
            showMe="Show Me #1 (Text Table) & #23 (Bullet Graph)"
            rows="[jenisAnggaran], [kategori]"
            columns="SUM([anggaran]), SUM([realisasi]), % Capaian"
            color="[triwulan]"
            detail="Tabel Item 3 Laporan Realisasi BLU"
          />
        )}
      </div>

      {/* Tableau Crosstab Tables for Each Tab View */}
      <div className="p-4 flex-1 overflow-x-auto">
        {/* TAB 1: PENDAPATAN PNBP (IKS-03) */}
        {activeTab === 'pendapatan' && (
          <table className="w-full text-left text-xs border-collapse min-w-[720px]">
            <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r border-blue-900/60 w-[30%]">
                  Unit Kerja Penghasil / Badan Usaha
                </th>
                <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[16%]">
                  Target Perkin (Rp M)
                </th>
                <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[16%]">
                  Realisasi YTD (Rp M)
                </th>
                <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[22%]">
                  Visual Bar (% Target)
                </th>
                <th className="py-2.5 px-3 text-right w-[16%]">
                  Sisa Target (Rp M)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
              {revenueItems.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const capaianPct = item.capaian ?? (item.target ? (item.realisasi / item.target) * 100 : 0);
                const sisa = item.sisaTarget ?? Math.max(0, item.target - item.realisasi);

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-blue-50/60 transition-colors ${
                      isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-semibold text-slate-900 align-middle">
                      {item.sumber}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono text-slate-700 align-middle">
                      Rp {item.target.toFixed(1)} M
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-bold text-[#59A14F] align-middle">
                      Rp {item.realisasi.toFixed(1)} M
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] align-middle">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 h-2.5 rounded-2xs overflow-hidden">
                          <div
                            className={`h-full rounded-2xs ${
                              capaianPct >= 50
                                ? 'bg-[#59A14F]'
                                : capaianPct >= 35
                                ? 'bg-[#F28E2B]'
                                : 'bg-[#E15759]'
                            }`}
                            style={{ width: `${Math.min(100, capaianPct)}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-[10px] text-slate-800 w-12 text-right shrink-0">
                          {capaianPct.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-600 align-middle">
                      Rp {sisa.toFixed(1)} M
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Total Row */}
            <tfoot className="bg-slate-100 font-bold text-xs border-t-2 border-slate-300">
              <tr>
                <td className="py-2.5 px-3 border-r border-slate-300 text-slate-900 uppercase">
                  TOTAL KONSOLIDASI PNBP
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-right font-mono text-slate-900">
                  Rp {totalRevTarget.toFixed(1)} M
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-right font-mono text-[#59A14F]">
                  Rp {totalRevReal.toFixed(1)} M
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[#1F4E79]">
                  {avgRevCapaian}%
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-800">
                  Rp {sisaRevTarget.toFixed(1)} M
                </td>
              </tr>
            </tfoot>
          </table>
        )}

        {/* TAB 2: ALOKASI & REALISASI BELANJA */}
        {activeTab === 'belanja' && (
          <table className="w-full text-left text-xs border-collapse min-w-[720px]">
            <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r border-blue-900/60 w-[30%]">
                  Komponen Belanja / Satker
                </th>
                <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[16%]">
                  Pagu DIPA (Rp M)
                </th>
                <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[16%]">
                  Realisasi YTD (Rp M)
                </th>
                <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[22%]">
                  Visual Bar (% Pagu)
                </th>
                <th className="py-2.5 px-3 text-right w-[16%]">
                  Sisa Pagu (Rp M)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
              {expenseItems.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const programName = item.program || item.unitKerja || `Komponen Belanja ${item.id}`;
                const serapanPct = item.serapan ?? item.persentase ?? (item.pagu ? (item.realisasi / item.pagu) * 100 : 0);
                const sisaPagu = item.sisaAnggaran ?? item.sisa ?? Math.max(0, item.pagu - item.realisasi);

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-blue-50/60 transition-colors ${
                      isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-semibold text-slate-900 align-middle">
                      {programName}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono text-slate-700 align-middle">
                      Rp {item.pagu.toFixed(1)} M
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-bold text-[#4E79A7] align-middle">
                      Rp {item.realisasi.toFixed(1)} M
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] align-middle">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 h-2.5 rounded-2xs overflow-hidden">
                          <div
                            className={`h-full rounded-2xs ${
                              serapanPct >= 35
                                ? 'bg-[#4E79A7]'
                                : serapanPct >= 20
                                ? 'bg-[#F28E2B]'
                                : 'bg-[#E15759]'
                            }`}
                            style={{ width: `${Math.min(100, serapanPct)}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-[10px] text-slate-800 w-12 text-right shrink-0">
                          {serapanPct.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-600 align-middle">
                      Rp {sisaPagu.toFixed(1)} M
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Total Row */}
            <tfoot className="bg-slate-100 font-bold text-xs border-t-2 border-slate-300">
              <tr>
                <td className="py-2.5 px-3 border-r border-slate-300 text-slate-900 uppercase">
                  TOTAL KONSOLIDASI BELANJA
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-right font-mono text-slate-900">
                  Rp {totalExpPagu.toFixed(1)} M
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-right font-mono text-[#4E79A7]">
                  Rp {totalExpReal.toFixed(1)} M
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[#1F4E79]">
                  {avgExpSerapan}%
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-800">
                  Rp {sisaExpPagu.toFixed(1)} M
                </td>
              </tr>
            </tfoot>
          </table>
        )}

        {/* TAB 3: RINCIAN AKUN PNBP (ITEM 7 SIMKEU) */}
        {activeTab === 'rincian_pnbp' && (
          <table className="w-full text-left text-xs border-collapse min-w-[760px]">
            <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[14%]">
                  Kode Akun (Item 7)
                </th>
                <th className="py-2.5 px-3 border-r border-blue-900/60 w-[42%]">
                  Unit Pengguna / Layanan
                </th>
                <th className="py-2.5 px-3 border-r border-blue-900/60 w-[22%]">
                  Satuan Tarif
                </th>
                <th className="py-2.5 px-3 text-right w-[22%]">
                  Jumlah Target Perkin
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
              {RINCIAN_TARGET_PNBP_DATA.map((akun, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <tr
                    key={akun.kode}
                    className={`hover:bg-blue-50/60 transition-colors ${
                      isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-[#1F4E79] align-middle">
                      {akun.kode}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-semibold text-slate-900 align-middle">
                      {akun.pengguna}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-600 align-middle">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {akun.satuan}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 align-middle">
                      {akun.jumlahDisplay}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* TAB 4: LAPORAN REALISASI ANGGARAN BLU (ITEM 3 SIMKEU) */}
        {activeTab === 'realisasi_blu' && (
          <table className="w-full text-left text-xs border-collapse min-w-[760px]">
            <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r border-blue-900/60 w-[20%]">
                  Jenis Anggaran
                </th>
                <th className="py-2.5 px-3 border-r border-blue-900/60 w-[34%]">
                  Uraian Belanja / Pendapatan
                </th>
                <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[15%]">
                  Anggaran (Rp M)
                </th>
                <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[15%]">
                  Realisasi (Rp M)
                </th>
                <th className="py-2.5 px-3 text-center w-[16%]">
                  % Capaian / Serapan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
              {LAPORAN_REALISASI_ANGGARAN_BLU_DATA.map((row, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <tr
                    key={idx}
                    className={`hover:bg-blue-50/60 transition-colors ${
                      isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-bold text-slate-900 align-middle">
                      {row.jenisAnggaran}
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-700 align-middle">
                      <div className="font-semibold text-slate-900">{row.kategori}</div>
                      <div className="text-[10px] text-slate-500">{row.uraian}</div>
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono text-slate-800 align-middle">
                      Rp {row.anggaran.toFixed(1)} M
                    </td>
                    <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-bold text-[#1F4E79] align-middle">
                      Rp {row.realisasi.toFixed(1)} M
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700 align-middle">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {row.persentase.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Tableau Caption Footer */}
      <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>
            Sumber Data: SIMKEU BP Batam • Sinkronisasi SAKTI Kementerian Keuangan RI • Perjanjian Kinerja TA {selectedYear}
          </span>
        </div>
        <span className="font-mono text-slate-400">Status Extract: Terverifikasi</span>
      </div>
    </div>
  );
};
