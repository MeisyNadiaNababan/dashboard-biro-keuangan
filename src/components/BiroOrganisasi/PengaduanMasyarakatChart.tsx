import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import {
  MessageSquare,
  Smile,
  CheckCircle2,
  Clock,
  Building2,
  AlertCircle,
  FileSpreadsheet,
  ChevronRight,
} from 'lucide-react';
import { PENGADUAN_BADAN_USAHA_DATA, SKM_KATEGORI_DATA } from './bokmrData';
import { BokmrFilterState } from './types';

interface PengaduanMasyarakatChartProps {
  filters: BokmrFilterState;
}

export const PengaduanMasyarakatChart: React.FC<PengaduanMasyarakatChartProps> = ({ filters }) => {
  const [activeSubTab, setActiveSubTab] = useState<'pengaduan' | 'skm'>('pengaduan');

  // Filtered Pengaduan data
  const filteredPengaduan = PENGADUAN_BADAN_USAHA_DATA.filter((item) => {
    if (filters.unitKerja !== 'Semua' && item.unitPelayanan !== filters.unitKerja) {
      return false;
    }
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const matchUnit = item.unitPelayanan.toLowerCase().includes(q);
      const matchIsu = item.topIsu.toLowerCase().includes(q);
      if (!matchUnit && !matchIsu) return false;
    }
    return true;
  });

  const chartDataPengaduan = filteredPengaduan.map((item) => ({
    name: item.kodeUnit,
    unitName: item.unitPelayanan,
    diterima: item.jmlPengaduanDiterima,
    selesai: item.jmlPengaduanSelesai,
    diproses: item.jmlPengaduanDiproses,
    persen: item.persentaseSelesai,
    waktu: item.waktuRataRataPenyelesaian,
    topIsu: item.topIsu,
  }));

  const CustomTooltipPengaduan = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5">
          <div className="font-bold text-sky-300">{data.unitName}</div>
          <div className="text-[11px] text-slate-300">Top Isu: {data.topIsu}</div>
          <div className="pt-1 border-t border-slate-800 space-y-0.5 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Diterima:</span>
              <span className="font-bold font-mono">{data.diterima} Aduan</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-emerald-400">Tuntas Selesai:</span>
              <span className="font-bold font-mono text-emerald-300">
                {data.selesai} ({data.persen}%)
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-amber-400">Sedang Diproses:</span>
              <span className="font-bold font-mono">{data.diproses} Aduan</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-slate-800">
              <span className="text-slate-400">SLA Penanganan:</span>
              <span className="font-mono text-sky-300">{data.waktu}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Pengaduan Layanan Badan Usaha & Survei Kepuasan (SKM)
              </h3>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px] font-mono">
                DATASET NO. 10 & NO. 11
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Monitoring Aduan Diterima, Diproses, Selesai serta 6 Unsur SKM (1.325 Entri Survei)
            </p>
          </div>
        </div>

        {/* SUBTAB TOGGLE */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveSubTab('pengaduan')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'pengaduan'
                ? 'bg-white text-blue-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pengaduan Badan Usaha (DS #10)
          </button>
          <button
            onClick={() => setActiveSubTab('skm')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'skm'
                ? 'bg-white text-blue-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rekap SKM 6 Kategori (DS #11)
          </button>
        </div>
      </div>

      {activeSubTab === 'pengaduan' ? (
        /* TAB 1: PENGADUAN BADAN USAHA BAR CHART */
        <div className="space-y-4">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartDataPengaduan}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltipPengaduan />} />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  iconType="circle"
                />
                <Bar
                  dataKey="diterima"
                  name="Pengaduan Diterima"
                  fill="#0284c7"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
                <Bar
                  dataKey="selesai"
                  name="Tuntas Selesai"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
                <Bar
                  dataKey="diproses"
                  name="Sedang Diproses"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* SUMMARY CARDS PER UNIT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {filteredPengaduan.map((item) => (
              <div
                key={item.id}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 font-mono">{item.kodeUnit}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {item.persentaseSelesai}%
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 line-clamp-1" title={item.unitPelayanan}>
                  {item.unitPelayanan}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200 font-mono">
                  <span>Diterima: {item.jmlPengaduanDiterima}</span>
                  <span className="text-emerald-700 font-bold">✓ {item.jmlPengaduanSelesai}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* TAB 2: REKAP HASIL SKM 6 KATEGORI (BERDASARKAN SCREENSHOT PDF HASIL-SKM) */
        <div className="space-y-3">
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-bold text-blue-900">
                Rekapitulasi Hasil Survei Kepuasan Masyarakat (SKM)
              </span>
              <p className="text-[11px] text-blue-700 mt-0.5">
                Sumber: Lampiran PDF hasil-skm (1.325 entri responden lintas Unit Usaha BP Batam)
              </p>
            </div>
            <span className="font-mono font-bold text-blue-900 bg-blue-100 px-2.5 py-1 rounded-lg text-xs">
              Rata-rata IKM: 88.62 (Mutu A)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SKM_KATEGORI_DATA.map((skm) => (
              <div
                key={skm.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      {skm.kategori}
                    </span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">
                      {skm.unitUsaha}
                    </span>
                  </div>
                  <span className="text-xs font-black font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200 shrink-0">
                    {skm.persentase.toFixed(1)}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all"
                    style={{ width: `${skm.persentase}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="line-clamp-1">{skm.keterangan}</span>
                  <span className="font-mono font-semibold text-slate-700 shrink-0 ml-2">
                    Skor: {skm.nilai.toFixed(2)}/4.00
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
