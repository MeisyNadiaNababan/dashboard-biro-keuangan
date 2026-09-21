import React, { useState } from 'react';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Building,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import {
  DATASET_1_PERMASALAHAN,
  DATASET_3_PERIZINAN_WAKTU,
  DISTRIBUSI_SWP_PESISIR_DATA,
} from './pesisirReklamasiData';
import { PesisirReklamasiFilterState } from './types';
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
} from 'recharts';

interface MonitoringPesisirAtasanProps {
  filters: PesisirReklamasiFilterState;
  onOpenFormulaModal: (kpiId: string) => void;
}

export const MonitoringPesisirAtasan: React.FC<MonitoringPesisirAtasanProps> = ({
  filters,
  onOpenFormulaModal,
}) => {
  const [activeTab, setActiveTab] = useState<'permasalahan' | 'perizinan_sla' | 'spasial_swp'>('spasial_swp');

  // Filter Data Permasalahan
  const filteredPermasalahan = DATASET_1_PERMASALAHAN.filter((item) => {
    if (filters.swp !== 'ALL' && item.swp !== filters.swp) return false;
    if (filters.statusPenyelesaian === 'Selesai' && item.status !== 'Selesai') return false;
    if (filters.statusPenyelesaian === 'Proses' && item.status !== 'Dalam Proses') return false;
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      return (
        item.judulKasus.toLowerCase().includes(q) ||
        item.namaPihakTerkait.toLowerCase().includes(q) ||
        item.lokasi.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filter Data Perizinan Waktu
  const filteredPerizinan = DATASET_3_PERIZINAN_WAKTU.filter((item) => {
    if (filters.swp !== 'ALL' && item.swp !== filters.swp) return false;
    if (filters.statusPenyelesaian === 'Tepat Waktu' && item.statusWaktu !== 'Tepat Waktu') return false;
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      return (
        item.namaPemohon.toLowerCase().includes(q) ||
        item.jenisIzin.toLowerCase().includes(q) ||
        item.noIzin.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Pie Chart Data: Komparasi Pesisir vs Reklamasi
  const pieData = [
    { name: 'Area Reklamasi (Pulau Buatan & Timbunan)', value: 912.6, color: '#0284c7' },
    { name: 'Pemanfaatan Pesisir / Laut (Dermaga & Jetty)', value: 572.8, color: '#059669' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden font-sans">
      {/* Header Panel */}
      <div className="p-3.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Panel Monitoring Atasan: Pengendalian &amp; Kepatuhan Spasial Pesisir
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                POIN 2, 3 &amp; 7
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Visualisasi terpadu untuk pimpinan: Kepatuhan SLA izin, resolusi konflik/aduan lingkungan, dan distribusi spasial per SWP
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('spasial_swp')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'spasial_swp'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Distribusi Spasial SWP (Poin 7)
          </button>
          <button
            onClick={() => setActiveTab('perizinan_sla')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'perizinan_sla'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SLA Perizinan Tepat Waktu (Poin 2)
          </button>
          <button
            onClick={() => setActiveTab('permasalahan')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'permasalahan'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Penyelesaian Kasus Aduan (Poin 3)
          </button>
        </div>
      </div>

      {/* Tab 1: Distribusi Spasial SWP (Rancangan untuk Atasan Sesuai Poin 7) */}
      {activeTab === 'spasial_swp' && (
        <div className="p-3.5 space-y-3.5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Chart: Luas Reklamasi vs Pesisir per SWP */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Sebaran Luas Pemanfaatan Ruang Laut per Sub Wilayah (SWP)
                  </h4>
                  <p className="text-[10.5px] text-slate-500">
                    Memantau konsentrasi izin reklamasi versus izin perairan/jetty di setiap koridor Batam
                  </p>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                  Satuan: Hektar (Ha)
                </span>
              </div>

              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={DISTRIBUSI_SWP_PESISIR_DATA}
                    margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="swp"
                      tick={{ fill: '#64748b', fontSize: 9.5 }}
                      interval={0}
                      angle={-10}
                      textAnchor="end"
                    />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E2E8F0',
                        borderRadius: '8px',
                        fontSize: '11px',
                      }}
                      formatter={(val: any, name: any) => [
                        `${val} Ha`,
                        name === 'reklamasiHa' ? 'Luas Reklamasi' : 'Luas Pesisir / Laut',
                      ]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                      formatter={(value) =>
                        value === 'reklamasiHa' ? 'Luas Reklamasi (Ha)' : 'Luas Pesisir / Jetty (Ha)'
                      }
                    />
                    <Bar dataKey="reklamasiHa" stackId="a" fill="#0284c7" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="pesisirHa" stackId="a" fill="#059669" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut Chart: Komposisi Proporsi Reklamasi vs Pesisir */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Rasio Ruang Reklamasi vs Pesisir
                </h4>
                <p className="text-[10.5px] text-slate-500 mb-2">
                  Total izin investasi terdaftar 1.485,4 Hektar
                </p>

                <div className="h-[140px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={62}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#E2E8F0',
                          borderRadius: '8px',
                          fontSize: '11px',
                        }}
                        formatter={(val: any) => [`${val} Ha`, 'Luas']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs font-black text-slate-900">1.485 Ha</span>
                    <span className="text-[9px] text-slate-400">Total Luas</span>
                  </div>
                </div>

                <div className="space-y-1.5 mt-1 text-[10.5px]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                      Reklamasi (Timbunan/Pulau):
                    </span>
                    <span className="font-bold text-slate-900">912,6 Ha (61,4%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      Pesisir / Jetty / Dermaga:
                    </span>
                    <span className="font-bold text-slate-900">572,8 Ha (38,6%)</span>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] text-slate-600 mt-2">
                ⚡ <strong>Insight Atasan:</strong> SWP Rempang-Galang &amp; Sekupang-Tanjung Uncang menyerap 59,8% total luas reklamasi untuk industri galangan dan energi laut.
              </div>
            </div>
          </div>

          {/* Tabel Executive Ringkasan SWP */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold text-[11px]">
                  <th className="py-2.5 px-3">Sub Wilayah (SWP)</th>
                  <th className="py-2.5 px-3">Jumlah Proyek</th>
                  <th className="py-2.5 px-3">Luas Total (Ha)</th>
                  <th className="py-2.5 px-3">Luas Reklamasi</th>
                  <th className="py-2.5 px-3">Luas Pesisir</th>
                  <th className="py-2.5 px-3">Investasi Terikat</th>
                  <th className="py-2.5 px-3 text-right">Tingkat Kepatuhan Ruang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {DISTRIBUSI_SWP_PESISIR_DATA.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{item.swp}</td>
                    <td className="py-2.5 px-3 font-mono">{item.jumlahProyek} Izin</td>
                    <td className="py-2.5 px-3 font-black text-sky-800 font-mono">
                      {item.luasTotalHa.toFixed(1)} Ha
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">{item.reklamasiHa.toFixed(1)} Ha</td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">{item.pesisirHa.toFixed(1)} Ha</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">
                      Rp {item.investasiT} Triliun
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="px-2 py-0.5 rounded font-bold font-mono text-[10.5px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.kepatuhanPersen}% Patuh
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Perizinan Pesisir Selesai Tepat Waktu (Sesuai Poin 2 & Dataset #3) */}
      {activeTab === 'perizinan_sla' && (
        <div className="p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Data Perizinan Pesisir dan Reklamasi Berdasarkan SLA (Dataset No. 3)
              </h4>
              <p className="text-[10.5px] text-slate-500">
                Standar Pelayanan Minimal (SLA): 14 Hari Kerja sejak berkas lengkap
              </p>
            </div>
            <span className="text-[10.5px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Tingkat Ketepatan Waktu: 92,4%
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold text-[11px]">
                  <th className="py-2.5 px-3">No. Izin &amp; Pemohon</th>
                  <th className="py-2.5 px-3">Jenis Izin Perairan</th>
                  <th className="py-2.5 px-3">Tanggal Pengajuan</th>
                  <th className="py-2.5 px-3">Tanggal Selesai</th>
                  <th className="py-2.5 px-3">Realisasi vs SLA</th>
                  <th className="py-2.5 px-3">Status Ketepatan</th>
                  <th className="py-2.5 px-3 text-right">Wilayah (SWP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {filteredPerizinan.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{item.namaPemohon}</div>
                      <div className="text-[10px] font-mono text-slate-500">{item.noIzin}</div>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{item.jenisIzin}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{item.tanggalPengajuan}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{item.tanggalPenyelesaian}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold font-mono text-slate-900">
                        {item.realisasiHari} Hari
                      </span>
                      <span className="text-[10px] text-slate-400 block">Target: ≤ 14 Hari</span>
                    </td>
                    <td className="py-2.5 px-3">
                      {item.statusWaktu === 'Tepat Waktu' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Tepat Waktu
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                          <Clock className="w-3 h-3" />
                          Terlambat ({item.realisasiHari - item.targetSlaHari} hr)
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium text-slate-700">{item.swp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Penyelesaian Kasus Permasalahan (Sesuai Poin 3 & Dataset #1) */}
      {activeTab === 'permasalahan' && (
        <div className="p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Log Kasus dan Penyelesaian Permasalahan Pesisir &amp; Reklamasi (Dataset No. 1)
              </h4>
              <p className="text-[10.5px] text-slate-500">
                Penanganan konflik perbatasan laut, reklamasi liar, dan penegakan sempadan pantai
              </p>
            </div>
            <span className="text-[10.5px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Tingkat Keberhasilan: 88,6% Kasus Selesai
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold text-[11px]">
                  <th className="py-2.5 px-3">No. Aduan &amp; Kasus</th>
                  <th className="py-2.5 px-3">Pihak / Entitas Terkait</th>
                  <th className="py-2.5 px-3">Kategori Permasalahan</th>
                  <th className="py-2.5 px-3">Luas Terdampak</th>
                  <th className="py-2.5 px-3">Solusi &amp; Tindak Lanjut</th>
                  <th className="py-2.5 px-3 text-right">Status Kasus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {filteredPermasalahan.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{item.judulKasus}</div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {item.noPengaduan} • {item.lokasi}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{item.namaPihakTerkait}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                      {item.luasTerdampakHa} Ha
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 text-[10.5px]">
                      {item.solusiTindakan}
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Waktu penanganan: {item.lamaPenyelesaianHari} hari
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {item.status === 'Selesai' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Selesai
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <AlertTriangle className="w-3 h-3" />
                          Dalam Proses
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
