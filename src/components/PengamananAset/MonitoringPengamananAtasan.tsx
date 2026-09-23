import React from 'react';
import {
  Shield,
  Activity,
  Trees,
  TrendingUp,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Radio,
  FileText,
  DollarSign,
  Layers,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import {
  TREND_BULANAN_OPERASI_DITPAM,
  PENINDAKAN_ASET_DATA,
  TOTAL_LUAS_PENINDAKAN_HA,
} from './pengamananAsetData';
import { PengamananFilterState } from './types';

interface MonitoringPengamananAtasanProps {
  filters: PengamananFilterState;
}

export const MonitoringPengamananAtasan: React.FC<MonitoringPengamananAtasanProps> = ({ filters }) => {
  // Chart data for Penindakan Kawasan Lingkungan dan Hutan
  const chartPenindakanHutan = PENINDAKAN_ASET_DATA.map((item) => ({
    name: item.lokasiAset.length > 25 ? item.lokasiAset.substring(0, 25) + '...' : item.lokasiAset,
    fullName: item.lokasiAset,
    luasHa: item.luasPenindakanHa,
    jenisAset: item.jenisAset,
    swp: item.swp,
    status: item.statusPenindakan,
    asetDiamankanM: item.potensiKerugianDiamankanMiliar,
  }));

  const totalPotensiMiliar = PENINDAKAN_ASET_DATA.reduce(
    (acc, curr) => acc + curr.potensiKerugianDiamankanMiliar,
    0
  );

  return (
    <div className="space-y-4 font-sans">
      {/* SECTION HEADER: STRATEGIS KESIAPSIAGAAN OPERASIONAL & PENINDAKAN KAWASAN */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                  Kesiapsiagaan Operasional Ditpam &amp; Penindakan Kawasan Lingkungan dan Hutan
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                  Satu Data Hal. 17 - 19
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Dinamika insiden bulanan, pengerahan personil, dan rekapitulasi penindakan kawasan hutan lindung serta daerah tangkapan air (DTA) waduk di Batam.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Kesiagaan Mako: <strong>Siaga 1 Aktif</strong></span>
          </div>
        </div>
      </div>

      {/* VISUALISASI 1: DINAMIKA INSIDEN BULANAN VS PENGERAHAN PERSONIL (AREA CHART) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                DATASET OPERASIONAL DITPAM
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                🏷️ Visualisasi: Dual Axis Area &amp; Line Chart Tren Insiden vs Personil
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 mt-0.5">
              <TrendingUp className="w-4 h-4 text-sky-700" />
              <span>Dinamika Insiden Bulanan vs Beban Pengerahan Personil Ditpam</span>
            </h4>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Atribut yang Ditampilkan: <strong>BULAN</strong>, <strong>TOTAL PERSONIL DITERJUNKAN</strong>, <strong>KEGIATAN PENERTIBAN</strong>, &amp; <strong>AKSI UNJUK RASA</strong> (Hal. 17-19)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Analisis korelasi eskalasi pengamanan aksi massa, penertiban, dan mitigasi bencana alam dengan personil lapangan.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-[#002B49]" />
              <span className="font-medium">Personil Diterjunkan</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-1.5 bg-[#D97706] rounded-full" />
              <span className="font-medium">Penertiban &amp; Bencana</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={TREND_BULANAN_OPERASI_DITPAM}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPersonil" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#002B49" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#002B49" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorPenertiban" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D97706" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D97706" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="bulan" tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#D97706', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="totalPersonil"
                stroke="#002B49"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPersonil)"
                name="Personil Diterjunkan"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="penertiban"
                stroke="#D97706"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPenertiban)"
                name="Kegiatan Penertiban"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="unjukRasa"
                stroke="#E11D48"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Aksi Unjuk Rasa"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* VISUALISASI 2: DATA PENINDAKAN KAWASAN LINGKUNGAN DAN HUTAN (TABLEAU-READY HORIZONTAL BAR + DETAIL CROSSTAB) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                DATASET KAWASAN &amp; HUTAN LINDUNG
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                🏷️ Visualisasi: Horizontal Ranked Bar Chart &amp; Matriks Status Penindakan Lokasi
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 mt-0.5">
              <Trees className="w-4 h-4 text-emerald-700" />
              <span>Data Penindakan Kawasan Lingkungan dan Hutan (DTA &amp; Hutan Lindung)</span>
            </h4>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Atribut yang Ditampilkan: <strong>LOKASI ASET/HUTAN LINDUNG</strong>, <strong>SUB WILAYAH (SWP)</strong>, <strong>LUAS PENINDAKAN (HA)</strong>, &amp; <strong>STATUS PENINDAKAN</strong> (Hal. 17)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Visualisasi penindakan penguasaan lahan ilegal, perambahan kawasan tangkapan air waduk (DTA), dan hutan lindung BP Batam.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg text-emerald-800">
              Total Diamankan: <strong>{TOTAL_LUAS_PENINDAKAN_HA} Hektar</strong>
            </div>
            <div className="bg-sky-50 border border-sky-200 px-3 py-1 rounded-lg text-sky-800">
              Estimasi Nilai Aset: <strong>Rp {totalPotensiMiliar.toLocaleString('id-ID')} M</strong>
            </div>
          </div>
        </div>

        {/* Tableau Horizontal Ranked Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-7 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartPenindakanHutan}
                margin={{ top: 5, right: 30, left: 130, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fill: '#64748B', fontSize: 11 }} unit=" Ha" />
                <YAxis
                  dataKey="fullName"
                  type="category"
                  tick={{ fill: '#1E293B', fontSize: 11, fontWeight: 600 }}
                  width={125}
                />
                <Tooltip
                  formatter={(val: any) => [`${val} Hektar`, 'Luas Kawasan Ditindak']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="luasHa" radius={[0, 4, 4, 0]}>
                  {chartPenindakanHutan.map((_, idx) => (
                    <Cell
                      key={`cell-penindakan-${idx}`}
                      fill={
                        idx === 0
                          ? '#047857' // Waduk Duriangkang
                          : idx === 1
                          ? '#059669' // Waduk Sei Ladi
                          : idx === 2
                          ? '#10B981' // Hutan Lindung Tiban
                          : idx === 3
                          ? '#0284C7' // ROW Mukakuning
                          : '#0369A1'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Key Metric Highlights for Environment & Forest Protection */}
          <div className="lg:col-span-5 space-y-2.5">
            {PENINDAKAN_ASET_DATA.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs flex items-center justify-between hover:bg-slate-100/70 transition-colors"
              >
                <div>
                  <div className="font-bold text-slate-900">{item.lokasiAset}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {item.jenisAset} • SWP: <span className="font-semibold text-slate-700">{item.swp}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono font-black text-emerald-800 text-sm">{item.luasPenindakanHa} Ha</div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                    {item.statusPenindakan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Table for Tableau Verification */}
        <div className="border border-slate-200 rounded-xl overflow-hidden pt-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10.5px]">
                <tr>
                  <th className="py-2.5 px-3">No</th>
                  <th className="py-2.5 px-3">Kawasan Target Penindakan</th>
                  <th className="py-2.5 px-3">SWP</th>
                  <th className="py-2.5 px-3">Klasifikasi Kawasan</th>
                  <th className="py-2.5 px-3 text-right">Luas (Ha)</th>
                  <th className="py-2.5 px-3 text-right">Estimasi Nilai Aset</th>
                  <th className="py-2.5 px-3 text-center">Status Sterilisasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {PENINDAKAN_ASET_DATA.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-2 px-3 font-bold text-slate-900">{item.lokasiAset}</td>
                    <td className="py-2 px-3 text-slate-700">{item.swp}</td>
                    <td className="py-2 px-3 text-slate-600">{item.jenisAset}</td>
                    <td className="py-2 px-3 text-right font-mono font-black text-emerald-800">
                      {item.luasPenindakanHa} Ha
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold text-sky-900">
                      Rp {item.potensiKerugianDiamankanMiliar} M
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.statusPenindakan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
