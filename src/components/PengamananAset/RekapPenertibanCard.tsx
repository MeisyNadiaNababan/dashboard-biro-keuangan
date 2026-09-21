import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Calendar,
  CheckCircle2,
  FolderOpen,
  Search,
  Filter,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  PENERTIBAN_RUTIN_DATA,
  PENERTIBAN_BY_JENIS_KEGIATAN,
} from './pengamananAsetData';
import { PengamananFilterState } from './types';

interface RekapPenertibanCardProps {
  filters: PengamananFilterState;
}

export const RekapPenertibanCard: React.FC<RekapPenertibanCardProps> = ({ filters }) => {
  const [selectedKategori, setSelectedKategori] = useState<string>('ALL');
  const [localSearch, setLocalSearch] = useState<string>('');

  // Filter local data
  const filteredData = useMemo(() => {
    return PENERTIBAN_RUTIN_DATA.filter((item) => {
      if (filters.tahun !== 'ALL' && item.tahun.toString() !== filters.tahun) {
        return false;
      }
      if (filters.semester !== 'ALL' && item.semester.toString() !== filters.semester) {
        return false;
      }
      if (selectedKategori !== 'ALL' && item.kategori !== selectedKategori) {
        return false;
      }
      const q = (filters.searchQuery || localSearch).toLowerCase();
      if (q) {
        const matchKegiatan = item.jenisKegiatan.toLowerCase().includes(q);
        const matchObjek = item.objekPenertiban.toLowerCase().includes(q);
        const matchLokasi = item.lokasi.toLowerCase().includes(q);
        if (!matchKegiatan && !matchObjek && !matchLokasi) return false;
      }
      return true;
    });
  }, [filters, selectedKategori, localSearch]);

  const totalKegiatanTerfilter = filteredData.length;
  const totalObjekTerfilter = filteredData.reduce((acc, curr) => acc + curr.jumlah, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-sky-50 text-sky-800 border border-sky-200 font-mono">
              DATASET NO. 9 • SATU DATA
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Hal. 18 (604 Entri Lengkap)</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
            <span>Rekap Data Kegiatan Penertiban Rutin Tim Terpadu Ditpam</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Menampilkan rekapitulasi resmi <strong>Jenis Kegiatan</strong> dan <strong>Jumlah</strong> objek penertiban rutin yang ditindaklanjuti oleh Tim Terpadu BP Batam.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-left">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Total Entri Data</div>
            <div className="text-sm font-black text-slate-900 font-mono">604 Kegiatan</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-left">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Objek Ditertibkan</div>
            <div className="text-sm font-black text-sky-900 font-mono">
              12.650+ Satuan
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-left">
            <div className="text-[10px] text-emerald-700 font-semibold uppercase">Status Tim Terpadu</div>
            <div className="text-sm font-black text-emerald-800 font-mono">Operasi Rutin</div>
          </div>
        </div>
      </div>

      {/* Aggregated Table & Bar Chart: JENIS KEGIATAN & JUMLAH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Aggregated Table: REQUIRED BY USER (Jenis Kegiatan dan Jumlah) */}
        <div className="lg:col-span-6 border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-100/90 px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-700" />
              <span>Rekapitulasi: Jenis Kegiatan &amp; Jumlah Kegiatan</span>
            </h4>
            <span className="text-[10.5px] font-mono text-slate-500">6 Kategori Penertiban</span>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">No</th>
                <th className="py-2.5 px-3 font-bold text-slate-900">Jenis Kegiatan Penertiban</th>
                <th className="py-2.5 px-3 font-bold text-slate-900 text-center">Jumlah Kegiatan</th>
                <th className="py-2.5 px-3 text-right">Total Objek Ditindak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {PENERTIBAN_BY_JENIS_KEGIATAN.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px] font-bold">
                    {index + 1}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">
                    <div className="leading-snug">{row.jenisKegiatan}</div>
                    <span className="inline-block mt-0.5 text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                      {row.kategori}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 font-mono font-black text-sky-900 text-xs">
                      {row.jumlahKegiatan} Giat
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap font-mono text-slate-800 font-bold">
                    {row.totalObjekDitertibkan.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-slate-50 px-3 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 font-medium">
            <span>Data bersumber dari Rekap Kegiatan Penertiban Rutin (Dataset No. 9)</span>
            <span className="font-bold text-slate-900">Total: 604 Kegiatan Terpadu</span>
          </div>
        </div>

        {/* Visual Bar Chart Komparasi Jumlah Kegiatan per Jenis */}
        <div className="lg:col-span-6 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800">Visualisasi Frekuensi Kegiatan Penertiban Rutin</h4>
            <span className="text-[10.5px] text-slate-500 font-mono">Jumlah Operasi</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Perbandingan intensitas patroli monitoring dan penindakan fisik aset oleh Tim Terpadu BP Batam.
          </p>
          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={PENERTIBAN_BY_JENIS_KEGIATAN}
                layout="vertical"
                margin={{ top: 5, right: 25, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis
                  dataKey="kategori"
                  type="category"
                  width={105}
                  tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                />
                <Tooltip
                  formatter={(val: number) => [`${val} Kegiatan Operasi`, 'Jumlah Giat']}
                  labelFormatter={(label, payload) => {
                    const itm = payload[0]?.payload;
                    return itm ? itm.jenisKegiatan : label;
                  }}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}
                />
                <Bar dataKey="jumlahKegiatan" fill="#002B49" radius={[0, 4, 4, 0]}>
                  {PENERTIBAN_BY_JENIS_KEGIATAN.map((_, idx) => (
                    <Cell key={`cell-pen-${idx}`} fill={idx === 0 ? '#002B49' : idx === 1 ? '#0284C7' : '#0D9488'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
