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
  MapPin,
  FileCheck,
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

  // Filter Data Pemanfaatan Kawasan Pesisir dan Reklamasi untuk Investasi (Dataset #4)
  const filteredData = DATASET_4_PEMANFAATAN_INVESTASI.filter((item) => {
    if (filters.tahun !== 'ALL' && item.tahunPenerbitan.toString() !== filters.tahun) {
      return false;
    }
    if (filters.swp !== 'ALL' && item.wilayah !== filters.swp && item.swp !== filters.swp) {
      return false;
    }
    if (filters.jenisIzin !== 'ALL' && item.jenisIzin !== filters.jenisIzin) {
      return false;
    }
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      return (
        item.namaPerusahaan.toLowerCase().includes(q) ||
        item.nomorIzinPkkprl.toLowerCase().includes(q) ||
        item.koordinat.toLowerCase().includes(q) ||
        item.lokasiSpesifik.toLowerCase().includes(q) ||
        item.wilayah.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => (sortAsc ? a.luasHa - b.luasHa : b.luasHa - a.luasHa));

  const totalLuasHa = filteredData.reduce((sum, item) => sum + item.luasHa, 0);
  const totalLuasM2 = totalLuasHa * 10000;
  const avgLuasHa = filteredData.length > 0 ? totalLuasHa / filteredData.length : 0;

  const chartData = filteredData.slice(0, 10).map((item) => ({
    name: item.namaPerusahaan.length > 22 ? item.namaPerusahaan.substring(0, 22) + '...' : item.namaPerusahaan,
    fullName: item.namaPerusahaan,
    luas: item.luasHa,
    luasM2: item.luasM2,
    nomorIzin: item.nomorIzinPkkprl,
    koordinat: item.koordinat,
    tahun: item.tahunPenerbitan,
    wilayah: item.wilayah,
    lokasi: item.lokasiSpesifik,
    jenisIzin: item.jenisIzin,
  }));

  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col font-sans">
      {/* HEADER & SHEET SWAP VIEW TOGGLE (GRAFIK VS TABEL DETAIL) */}
      <div className="p-4 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-sky-600 rounded-full inline-block" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Luas Izin Pemanfaatan Kawasan Pesisir &amp; Izin Reklamasi untuk Investasi
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                DATASET NO. 4 (SATU DATA HAL. 14)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Atribut Resmi: Nama Perusahaan, Nomor Izin PKKPRL, Koordinat, Wilayah, Luas (Ha / m²), Tahun Penerbitan
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
              <span>Grafik Komparasi Luas</span>
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
              <span>Tabel Atribut Detail</span>
            </button>
          </div>

          <button
            onClick={() => onOpenFormulaModal('kpi_luas_izin')}
            className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Formula & Panduan Tableau Sheet Swap"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* METRICS SUMMARY STRIP - MURNI HANYA LUAS DAN JUMLAH IZIN */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50/60 border-b border-slate-100 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 block font-medium">Total Luas Izin Terbit</span>
          <span className="text-base font-black text-sky-700 font-mono">
            {totalLuasHa.toFixed(1)} Hektar
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            ({formatNumber(totalLuasM2)} m²)
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block font-medium">Jumlah Pemegang Izin (PT)</span>
          <span className="text-base font-black text-slate-900 font-mono">
            {filteredData.length} Perusahaan
          </span>
          <span className="text-[10px] text-emerald-700 block mt-0.5 font-medium">
            100% Memiliki PKKPRL
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block font-medium">Rata-Rata Luas per Izin</span>
          <span className="text-base font-black text-indigo-700 font-mono">
            {avgLuasHa.toFixed(1)} Hektar
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Distribusi Ruang Laut
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block font-medium">Wilayah Konsentrasi Terbesar</span>
          <span className="text-xs font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 inline-block mt-0.5">
            Sekupang &amp; Rempang-Galang
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            Sektor Shipyard &amp; Terminal
          </span>
        </div>
      </div>

      {/* SHEET SWAP VIEW 1: GRAFIK VISUAL (TABLEAU BAR CHART KOMPARASI LUAS) */}
      {activeView === 'chart' && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-slate-800">
              Peringkat Luas Izin Pemanfaatan Pesisir &amp; Reklamasi per Perusahaan (Top 10 Pemegang Izin Terbesar)
            </span>
            <span className="text-[11px] text-slate-500 font-mono font-bold bg-slate-100 px-2 py-0.5 rounded">
              Satuan: Hektar (Ha)
            </span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 15, right: 20, left: 10, bottom: 45 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 500 }}
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
                    `${val} Ha (${new Intl.NumberFormat('id-ID').format(entry.payload.luasM2)} m²)`,
                    'Luas Izin Diterbitkan',
                  ]}
                  labelFormatter={(label, payload) => {
                    const item = payload?.[0]?.payload;
                    return item
                      ? `${item.fullName} | No: ${item.nomorIzin} | Wilayah: ${item.wilayah}`
                      : label;
                  }}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    color: '#FFF',
                    borderRadius: '8px',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="luas" fill="#0284C7" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? '#0284C7'
                          : index === 1
                          ? '#0369A1'
                          : index === 2
                          ? '#0EA5E9'
                          : '#38BDF8'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* SHEET SWAP VIEW 2: TABEL DETAIL (SESUAI 6 ATRIBUT RESMI PDF SATU DATA HAL. 14) */}
      {activeView === 'table' && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <span className="text-slate-700 font-medium">
              Data Resmi Atribut Satu Data (Total: <strong>{filteredData.length}</strong> Perusahaan Pemegang Izin)
            </span>
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
                    <th className="py-2.5 px-3">Nomor Izin PKKPRL</th>
                    <th className="py-2.5 px-3">Titik Koordinat</th>
                    <th className="py-2.5 px-3">Wilayah</th>
                    <th className="py-2.5 px-3 text-right">Luas (Ha)</th>
                    <th className="py-2.5 px-3 text-right">Luas (m²)</th>
                    <th className="py-2.5 px-3 text-center">Tahun Penerbitan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">{item.namaPerusahaan}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{item.lokasiSpesifik}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-mono text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 text-[10.5px] font-semibold">
                          {item.nomorIzinPkkprl}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[10.5px] text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                          <span>{item.koordinat}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold text-[10.5px]">
                          {item.wilayah}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-sky-900 text-xs">
                        {item.luasHa.toFixed(1)} Ha
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600 text-xs">
                        {formatNumber(item.luasM2)} m²
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-800 border border-slate-200 rounded font-semibold text-[10px] font-mono">
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
