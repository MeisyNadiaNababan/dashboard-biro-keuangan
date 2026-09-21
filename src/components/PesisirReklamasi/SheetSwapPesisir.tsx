import React, { useState } from 'react';
import {
  Layers,
  ArrowUpDown,
  Building,
  Calendar,
  Waves,
  TrendingUp,
  Download,
  Info,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  BarChart3,
  Table as TableIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import {
  DATASET_4_PEMANFAATAN_INVESTASI,
} from './pesisirReklamasiData';
import { PesisirReklamasiFilterState } from './types';

interface SheetSwapPesisirProps {
  filters: PesisirReklamasiFilterState;
  onOpenFormulaModal: (kpiId: string) => void;
}

export const SheetSwapPesisir: React.FC<SheetSwapPesisirProps> = ({
  filters,
  onOpenFormulaModal,
}) => {
  // Sheet Swap: Toggleable view between Grafik Batang and Tabel Data Detail
  const [activeView, setActiveView] = useState<'chart' | 'table'>('chart');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Filter Data Pemanfaatan Kawasan Pesisir dan Reklamasi untuk Investasi
  const filteredData = DATASET_4_PEMANFAATAN_INVESTASI.filter((item) => {
    if (filters.tahun !== 'ALL' && item.tahunPenerbitan.toString() !== filters.tahun) {
      return false;
    }
    if (filters.swp !== 'ALL' && item.swp !== filters.swp) {
      return false;
    }
    if (filters.jenisIzin !== 'ALL' && item.jenisIzin !== filters.jenisIzin) {
      return false;
    }
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      return (
        item.namaPerusahaan.toLowerCase().includes(q) ||
        item.lokasiSpesifik.toLowerCase().includes(q) ||
        item.sektorIndustri.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => (sortAsc ? a.luasHa - b.luasHa : b.luasHa - a.luasHa));

  const totalLuasHa = filteredData.reduce((sum, item) => sum + item.luasHa, 0);
  const totalInvestasiM = filteredData.reduce((sum, item) => sum + item.nilaiInvestasiMiliar, 0);

  const chartData = filteredData.slice(0, 10).map((item) => ({
    name: item.namaPerusahaan.length > 20 ? item.namaPerusahaan.substring(0, 20) + '...' : item.namaPerusahaan,
    fullName: item.namaPerusahaan,
    luas: item.luasHa,
    tahun: item.tahunPenerbitan,
    swp: item.swp,
    investasiRp: item.nilaiInvestasiMiliar,
    sektor: item.sektorIndustri,
  }));

  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col font-sans">
      {/* HEADER & SHEET SWAP VIEW TOGGLE (GRAFIK VS TABEL DETAIL) */}
      <div className="p-4 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-sky-600 rounded-full inline-block" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Pemanfaatan Kawasan Pesisir &amp; Izin Reklamasi Investasi
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Dataset Satu Data BP Batam (Hal. 13 - 14): Realisasi Alokasi Ruang Pesisir &amp; Pulau Reklamasi
            </p>
          </div>
        </div>

        {/* SHEET SWAP TOGGLE CONTROLS */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveView('chart')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'chart'
                  ? 'bg-white text-sky-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-sky-700" />
              <span>Grafik Visual</span>
            </button>
            <button
              onClick={() => setActiveView('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'table'
                  ? 'bg-white text-sky-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 text-indigo-700" />
              <span>Tabel Detail</span>
            </button>
          </div>

          <button
            onClick={() => onOpenFormulaModal('kpi_luas_izin')}
            className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Formula & Panduan Tableau"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* METRICS SUMMARY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50/60 border-b border-slate-100 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 block">Total Luas Terverifikasi</span>
          <span className="text-base font-black text-sky-700 font-mono">
            {totalLuasHa.toFixed(1)} Hektar
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Total Nilai Investasi</span>
          <span className="text-base font-black text-emerald-700 font-mono">
            Rp {formatNumber(totalInvestasiM)} Miliar
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Jumlah Pemrakarsa / PT</span>
          <span className="text-base font-black text-slate-900 font-mono">
            {filteredData.length} Perusahaan
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Status Perizinan</span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
            100% Terdaftar OSS / BP Batam
          </span>
        </div>
      </div>

      {/* SHEET SWAP VIEW 1: GRAFIK VISUAL (TABLEAU BAR CHART) */}
      {activeView === 'chart' && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Komparasi Luas Lahan Reklamasi/Pesisir per Perusahaan (Top 10 Pemrakarsa Terbesar)</span>
            <span className="text-[11px] text-slate-400">Satuan: Hektar (Ha)</span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#64748B', fontSize: 10 }}
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  unit=" Ha"
                />
                <Tooltip
                  formatter={(val: any, name: any, entry: any) => [
                    `${val} Ha | Investasi: Rp ${entry.payload.investasiRp} M`,
                    entry.payload.fullName,
                  ]}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="luas" fill="#0284C7" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#0284C7' : index === 1 ? '#0369A1' : index === 2 ? '#0EA5E9' : '#38BDF8'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* SHEET SWAP VIEW 2: TABEL DETAIL (TABLEAU CROSSTAB TABLE) */}
      {activeView === 'table' && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <span>Daftar Rinci Perusahaan, Lokasi Spesifik, Sektor &amp; Nilai Investasi (Total: {filteredData.length} data)</span>
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="flex items-center gap-1 text-[11px] text-sky-700 hover:text-sky-900 font-semibold cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Urutkan Luas: {sortAsc ? 'Terkecil' : 'Terbesar'}</span>
            </button>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">No</th>
                    <th className="py-2.5 px-3">Nama Perusahaan</th>
                    <th className="py-2.5 px-3">SWP &amp; Lokasi</th>
                    <th className="py-2.5 px-3">Jenis Izin &amp; Sektor</th>
                    <th className="py-2.5 px-3 text-right">Luas (Ha)</th>
                    <th className="py-2.5 px-3 text-right">Investasi (Miliar)</th>
                    <th className="py-2.5 px-3 text-center">Tahun</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">{item.namaPerusahaan}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {item.id}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold text-[10px]">
                          {item.swp}
                        </span>
                        <div className="text-[11px] text-slate-600 mt-0.5">{item.lokasiSpesifik}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-medium text-slate-800">{item.jenisIzin}</span>
                        <div className="text-[10px] text-slate-500">{item.sektorIndustri}</div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-sky-800">
                        {item.luasHa.toFixed(1)} Ha
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-semibold text-emerald-700">
                        Rp {formatNumber(item.nilaiInvestasiMiliar)} M
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 bg-sky-50 text-sky-800 border border-sky-200 rounded font-semibold text-[10px]">
                          {item.tahunPenerbitan}
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
