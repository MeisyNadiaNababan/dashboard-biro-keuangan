import React, { useState, useMemo } from 'react';
import {
  Users,
  Calendar,
  AlertOctagon,
  Shield,
  Search,
  Filter,
  ArrowUpDown,
  Building,
  CheckCircle2,
  FileSpreadsheet,
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
import { UNJUK_RASA_DATA } from './pengamananAsetData';
import { PengamananFilterState, UnjukRasaRecord } from './types';

interface RekapUnjukRasaCardProps {
  filters: PengamananFilterState;
}

export const RekapUnjukRasaCard: React.FC<RekapUnjukRasaCardProps> = ({ filters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssueCategory, setSelectedIssueCategory] = useState<string>('ALL');

  // Filter dataset based on global filters + local search
  const filteredData = useMemo(() => {
    return UNJUK_RASA_DATA.filter((item) => {
      // Filter tahun
      if (filters.tahun !== 'ALL' && item.tahun.toString() !== filters.tahun) {
        return false;
      }
      // Filter semester
      if (filters.semester !== 'ALL' && item.semester.toString() !== filters.semester) {
        return false;
      }
      // Filter sektor
      if (filters.lokasiSektor !== 'ALL') {
        const lowerLoc = item.lokasi.toLowerCase();
        const lowerSektor = filters.lokasiSektor.toLowerCase();
        if (!lowerLoc.includes(lowerSektor)) return false;
      }
      // Filter issue category
      if (selectedIssueCategory !== 'ALL') {
        if (!item.permasalahan.toLowerCase().includes(selectedIssueCategory.toLowerCase())) {
          return false;
        }
      }
      // Search term
      const query = (filters.searchQuery || searchTerm).toLowerCase();
      if (query) {
        const matchPermasalahan = item.permasalahan.toLowerCase().includes(query);
        const matchAliansi = item.aliansiMasyarakat.toLowerCase().includes(query);
        const matchLokasi = item.lokasi.toLowerCase();
        const matchTanggal = item.tanggal.includes(query);
        if (!matchPermasalahan && !matchAliansi && !matchLokasi && !matchTanggal) {
          return false;
        }
      }
      return true;
    });
  }, [filters, searchTerm, selectedIssueCategory]);

  // Summaries
  const totalPersonilDikerahkan = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.jumlahPersonil, 0);
  }, [filteredData]);

  const totalAksi = filteredData.length;
  const avgPersonilPerAksi = totalAksi > 0 ? Math.round(totalPersonilDikerahkan / totalAksi) : 0;

  // Chart data: Top 7 aksi dengan personil terbanyak
  const chartData = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => b.jumlahPersonil - a.jumlahPersonil)
      .slice(0, 7)
      .map((item) => ({
        name: `${item.tanggal.substring(5)} - ${item.aliansiMasyarakat.substring(0, 18)}...`,
        personil: item.jumlahPersonil,
        permasalahan: item.permasalahan,
        tanggal: item.tanggal,
        aliansi: item.aliansiMasyarakat,
      }));
  }, [filteredData]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Header Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-amber-50 text-amber-800 border border-amber-200 font-mono">
              POIN #5 • DATASET NO. 7 • SATU DATA
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
              🏷️ Visualisasi: Top-N Bar Chart Pengerahan Personil &amp; Tabel Rekapitulasi Aksi Aspirasi
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
            <span>Rekap Pengamanan Unjuk Rasa Ditpam BP Batam (Dataset 7)</span>
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
              Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>TANGGAL AKSI</strong>, <strong>LOKASI SEKTOR</strong>, <strong>ALIANSI/MASYARAKAT</strong>, <strong>PERMASALAHAN/TUNTUTAN</strong>, &amp; <strong>JUMLAH PERSONIL DITUGASKAN</strong> (Hal. 18)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Menampilkan data resmi pengerahan kekuatan personil dalam pengamanan penyampaian aspirasi masyarakat.
          </p>
        </div>

        {/* Mini Executive Metric Chips */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-left">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Total Aksi</div>
            <div className="text-sm font-black text-slate-900 font-mono">{totalAksi} Kegiatan</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-left">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Total Personil Ditpam</div>
            <div className="text-sm font-black text-amber-900 font-mono">
              {totalPersonilDikerahkan.toLocaleString('id-ID')} Orang
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-left">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Rata-rata/Aksi</div>
            <div className="text-sm font-black text-slate-800 font-mono">{avgPersonilPerAksi} Personil</div>
          </div>
        </div>
      </div>

      {/* Visual Chart: Pengerahan Personil per Aksi Massa */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-700" />
              <span>Intensitas Pengerahan Personil Ditpam (Aksi Terbesar)</span>
            </h4>
            <span className="text-[10.5px] text-slate-500 font-mono">Jumlah Personil</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Perbandingan jumlah personil Ditpam yang diterjunkan untuk pengamanan objek vital dan negosiasi persuasif.
          </p>
          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 9.5, fill: '#334155' }} />
                <Tooltip
                  formatter={(val: number) => [`${val} Personil Ditpam`, 'Kekuatan Terjun']}
                  labelFormatter={(label, payload) => {
                    const item = payload[0]?.payload;
                    return item ? `${item.tanggal} • ${item.aliansi}` : label;
                  }}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}
                />
                <Bar dataKey="personil" fill="#002B49" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.personil >= 300 ? '#B45309' : '#002B49'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Controls & Category Filter */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-400" />
                <span>Kategori Isu:</span>
              </span>
              {[
                { id: 'ALL', label: 'Semua Isu' },
                { id: 'Rempang', label: 'Relokasi Rempang' },
                { id: 'Air', label: 'Air Bersih SPAM' },
                { id: 'pelebaran jalan', label: 'ROW Jalan 200m' },
                { id: 'Pembebasan Lahan', label: 'Pembebasan Lahan' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedIssueCategory(tab.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                    selectedIssueCategory === tab.id
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-56">
              <input
                type="text"
                placeholder="Cari isu / aliansi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-7.5 pl-7 pr-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500 text-slate-800"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
            </div>
          </div>

          {/* Table: REQUIRED BY USER (Tanggal, Permasalahan, Jumlah Personil) */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="max-h-72 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 sticky top-0 text-slate-700 font-bold text-[11px] uppercase tracking-wider border-b border-slate-200 z-10">
                  <tr>
                    <th className="py-2 px-3">No</th>
                    <th className="py-2 px-3 font-bold text-slate-900">Tanggal</th>
                    <th className="py-2 px-3 font-bold text-slate-900">Permasalahan (Aspirasi / Tuntutan)</th>
                    <th className="py-2 px-3 font-bold text-slate-900 text-right">Jumlah Personil</th>
                    <th className="py-2 px-3">Lokasi &amp; Aliansi Masyarakat</th>
                    <th className="py-2 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-400 italic">
                        Tidak ada data unjuk rasa yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                          {index + 1}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap font-mono font-bold text-slate-900">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {item.tanggal}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-slate-800 max-w-xs leading-snug">
                          {item.permasalahan}
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap font-mono font-black text-amber-900">
                          <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
                            {item.jumlahPersonil} Org
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 max-w-[200px] truncate">
                          <div className="font-semibold text-slate-800 truncate">{item.lokasi}</div>
                          <div className="text-[10.5px] text-slate-500 truncate">{item.aliansiMasyarakat}</div>
                        </td>
                        <td className="py-2.5 px-3 text-center whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.statusKeamanan === 'Pengamanan Ketat'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : item.statusKeamanan === 'Negosiasi Tertib'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {item.statusKeamanan}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 px-3 py-1.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Menampilkan {filteredData.length} dari 35 riwayat unjuk rasa terdata di Dataset #7</span>
              <span>Kekuatan Personil: {totalPersonilDikerahkan} Personil Ditpam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
