import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import {
  TrendingUp,
  Clock,
  Coins,
  CheckCircle2,
  Building2,
  Boxes,
  Palmtree,
  Trees,
  Route,
  Ship,
  FileCheck2,
  Users,
  Info,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Eye,
  PieChart as PieIcon,
} from 'lucide-react';
import {
  KPI_SEKTOR_LIST,
  PEMANFAATAN_DOKUMEN_LIST,
} from './perencanaanData';

interface PerencanaanVisualisasiDataProps {
  onSelectSektor?: (sektor: string) => void;
  selectedSektor?: string;
  onOpenFormula?: (datasetNo: number) => void;
}

export const PerencanaanVisualisasiData: React.FC<PerencanaanVisualisasiDataProps> = ({
  onSelectSektor,
  selectedSektor = 'Semua',
  onOpenFormula,
}) => {
  // Tab Visualisasi: 'sektor-komparasi' | 'waktu-pelaksanaan' | 'pemanfaatan-dokumen'
  const [activeVisualTab, setActiveVisualTab] = useState<
    'sektor-komparasi' | 'waktu-pelaksanaan' | 'pemanfaatan-dokumen'
  >('sektor-komparasi');

  // Chart view metric toggle: 'both' | 'jumlah' | 'biaya'
  const [chartMetric, setChartMetric] = useState<'both' | 'jumlah' | 'biaya'>('both');

  // Pie Chart Metric Toggle untuk Pemanfaatan: 'persen' | 'nilai'
  const [pieMetric, setPieMetric] = useState<'persen' | 'nilai'>('persen');

  // Siapkan data untuk Chart Sektor
  const sektorChartData = KPI_SEKTOR_LIST.map((k) => ({
    name: k.sektor.replace(' dan ', ' & '),
    shortName: k.sektor.split(' ')[0],
    sektorOriginal: k.sektor,
    datasetNo: k.datasetNo,
    jumlahDED: k.totalPaket,
    biayaDEDMiliar: parseFloat((k.totalPaguDED / 1000000000).toFixed(2)),
    biayaDEDFormatted: `Rp ${(k.totalPaguDED / 1000000000).toFixed(2)} M`,
    waktuPelaksanaanBulan: k.waktuPelaksanaanAvgBulan,
    estimasiCapexTriliun: parseFloat((k.totalEstimasiCapexFisik / 1000000000000).toFixed(2)),
  }));

  // Data Pie Chart Pemanfaatan Instansi Lain (Dataset #7, #8, #9)
  const pieDataPemanfaatan = [
    {
      name: 'Teknis Bangunan',
      datasetNo: 7,
      persen: 75.0,
      nilaiMiliar: 6.68,
      totalNilaiMiliar: 8.90,
      color: '#0284C7', // Sky Blue
      kategoriLabel: 'Teknis Bangunan (75,0%)',
      unitCount: 5,
      instansi: [
        'Dit. Pembangunan',
        'RSBP',
        'BU Fasling',
        'PT BIB',
        'Kemenaker RI (BPVP)',
      ],
      keterangan: 'DED gedung perkantoran, pusat riset digital KEK Nongsa, & workshop maritim.',
    },
    {
      name: 'Infrastruktur Pembangunan',
      datasetNo: 8,
      persen: 81.3,
      nilaiMiliar: 22.63,
      totalNilaiMiliar: 27.83,
      color: '#F59E0B', // Amber / Golden Orange
      kategoriLabel: 'Infrastruktur Pembangunan (81,3%)',
      unitCount: 6,
      instansi: [
        'Dit. Pembangunan',
        'BUP Batam',
        'BPJN Kepri',
        'Dinas Bina Marga',
        'PT BIB Hang Nadim',
        'KSOP Khusus Batam',
      ],
      keterangan: 'DED jalan nasional, flyover, dermaga peti kemas Batu Ampar, & apron kargo.',
    },
    {
      name: 'Lingkungan',
      datasetNo: 9,
      persen: 68.4,
      nilaiMiliar: 11.59,
      totalNilaiMiliar: 16.95,
      color: '#10B981', // Emerald Green
      kategoriLabel: 'Lingkungan (68,4%)',
      unitCount: 4,
      instansi: [
        'BU SPAM BP Batam',
        'Dit. Pembangunan',
        'DLH Kota Batam',
        'BPDAS Duriangkang',
      ],
      keterangan: 'DED drainase kota, polder DAS Batam Centre, MUT utilitas, & sabuk waduk.',
    },
  ];

  // Sektor icon mapper
  const getSektorIcon = (sektor: string) => {
    switch (sektor) {
      case 'Gedung':
        return <Building2 className="w-4 h-4 text-sky-600" />;
      case 'Utilitas dan Drainase':
        return <Boxes className="w-4 h-4 text-cyan-600" />;
      case 'Fasilitas Wisata dan Lingkungan':
        return <Palmtree className="w-4 h-4 text-emerald-600" />;
      case 'Pertanaman dan Penghijauan':
        return <Trees className="w-4 h-4 text-green-600" />;
      case 'Darat':
        return <Route className="w-4 h-4 text-amber-600" />;
      case 'Laut dan Udara':
        return <Ship className="w-4 h-4 text-indigo-600" />;
      default:
        return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  const SEKTOR_COLORS: Record<string, string> = {
    'Gedung': '#0284c7', // sky-600
    'Utilitas dan Drainase': '#06b6d4', // cyan-500
    'Fasilitas Wisata dan Lingkungan': '#10b981', // emerald-500
    'Pertanaman dan Penghijauan': '#22c55e', // green-500
    'Darat': '#f59e0b', // amber-500
    'Laut dan Udara': '#6366f1', // indigo-500
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6 font-sans">
      {/* Header Visualisasi */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">
                  Visualisasi Data Direktorat Perencanaan Infrastruktur
                </h3>
                <span className="text-[10px] font-bold bg-sky-50 text-sky-800 px-2 py-0.5 rounded-full border border-sky-200">
                  9 Dataset Satu Data
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Penyajian visual komparatif Jumlah DED, Biaya DED, Waktu Pelaksanaan, dan Pemanfaatan Dokumen Teknis oleh Instansi Lain
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls Navigasi Visualisasi (Hanya 3 Tab Sesuai Permintaan User) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs self-start lg:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveVisualTab('sektor-komparasi')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeVisualTab === 'sektor-komparasi'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Perencanaan 6 Sektor
          </button>
          <button
            onClick={() => setActiveVisualTab('waktu-pelaksanaan')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeVisualTab === 'waktu-pelaksanaan'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Waktu Pelaksanaan DED
          </button>
          <button
            onClick={() => setActiveVisualTab('pemanfaatan-dokumen')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeVisualTab === 'pemanfaatan-dokumen'
                ? 'bg-white text-emerald-800 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>3. Pemanfaatan Instansi Lain (Pie Chart)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: PERENCANAAN 6 SEKTOR INFRASTRUKTUR (DATASET #1 - #6)
          Atribut: JUMLAH DED, BIAYA DED, WAKTU PELAKSANAAN
         ========================================================================= */}
      {activeVisualTab === 'sektor-komparasi' && (
        <div className="space-y-4">
          {/* Quick Explainer Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-sky-50/70 border border-sky-100 rounded-lg text-xs">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-700 shrink-0" />
              <span className="text-slate-700">
                Grafik di bawah membandingkan <strong>Jumlah Paket DED</strong> dan <strong>Total Biaya DED</strong> pada 6 sektor infrastruktur kota Batam.
              </span>
            </div>
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md p-0.5 text-[11px] self-start sm:self-auto shrink-0">
              <button
                onClick={() => setChartMetric('both')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  chartMetric === 'both' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua Metrik
              </button>
              <button
                onClick={() => setChartMetric('jumlah')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  chartMetric === 'jumlah' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Jumlah DED
              </button>
              <button
                onClick={() => setChartMetric('biaya')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  chartMetric === 'biaya' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Biaya DED (Rp M)
              </button>
            </div>
          </div>

          {/* Dual Bar Chart / Visualizer */}
          <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>Distribusi Paket &amp; Anggaran DED Berdasarkan 6 Sektor</span>
                <span className="text-[10px] font-normal text-slate-500">(Dataset No. 1 s.d. 6)</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">
                Total: <strong className="text-slate-900">43 Paket</strong> | <strong className="text-emerald-700">Rp 53,68 Miliar</strong>
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sektorChartData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#475569' }}
                    interval={0}
                    angle={-10}
                    textAnchor="end"
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="#0284c7"
                    tick={{ fontSize: 11, fill: '#0284c7' }}
                    label={{
                      value: 'Jumlah DED (Paket)',
                      angle: -90,
                      position: 'insideLeft',
                      fontSize: 10,
                      fill: '#0284c7',
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#059669"
                    tick={{ fontSize: 11, fill: '#059669' }}
                    label={{
                      value: 'Biaya DED (Miliar Rp)',
                      angle: 90,
                      position: 'insideRight',
                      fontSize: 10,
                      fill: '#059669',
                    }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1">
                            <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                              {data.sektorOriginal} (Dataset #{data.datasetNo})
                            </p>
                            <p className="text-sky-700 flex justify-between gap-4">
                              <span>Jumlah DED:</span>
                              <strong>{data.jumlahDED} Paket</strong>
                            </p>
                            <p className="text-emerald-700 flex justify-between gap-4">
                              <span>Biaya DED:</span>
                              <strong>Rp {data.biayaDEDMiliar} Miliar</strong>
                            </p>
                            <p className="text-slate-600 flex justify-between gap-4">
                              <span>Waktu Pelaksanaan Rata-rata:</span>
                              <strong>{data.waktuPelaksanaanBulan} Bulan</strong>
                            </p>
                            <p className="text-indigo-600 flex justify-between gap-4 pt-1 border-t border-slate-100">
                              <span>Estimasi Nilai Fisik Konstruksi:</span>
                              <strong>Rp {data.estimasiCapexTriliun} Triliun</strong>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '11px' }}
                  />
                  {(chartMetric === 'both' || chartMetric === 'jumlah') && (
                    <Bar
                      yAxisId="left"
                      dataKey="jumlahDED"
                      name="Jumlah DED (Paket)"
                      fill="#0284c7"
                      radius={[4, 4, 0, 0]}
                    />
                  )}
                  {(chartMetric === 'both' || chartMetric === 'biaya') && (
                    <Bar
                      yAxisId="right"
                      dataKey="biayaDEDMiliar"
                      name="Biaya DED (Rp Miliar)"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cards 6 Sektor Terstruktur (Dengan 3 Atribut Resmi Satu Data) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">
                Rincian 6 Sektor (Klik untuk memfilter daftar paket teknis):
              </span>
              <span className="text-[11px] text-slate-500">
                Sifat Data: <strong>Tertutup (Data Statistik Tahunan)</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {KPI_SEKTOR_LIST.map((kpi) => {
                const isSelected = selectedSektor === kpi.sektor;
                return (
                  <div
                    key={kpi.sektor}
                    onClick={() => onSelectSektor && onSelectSektor(isSelected ? 'Semua' : kpi.sektor)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-sky-50/80 border-sky-400 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                            {getSektorIcon(kpi.sektor)}
                          </div>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                            Dataset #{kpi.datasetNo}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                            Aktif Terfilter
                          </span>
                        )}
                      </div>

                      <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{kpi.sektor}</h5>
                      <p className="text-[10.5px] text-slate-500 line-clamp-2 mt-0.5">{kpi.deskripsi}</p>
                    </div>

                    {/* 3 Atribut Sesuai Image User: JUMLAH DED, BIAYA DED, WAKTU PELAKSANAAN */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-3 gap-1.5 text-center">
                      <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                        <div className="text-[9px] text-slate-500 uppercase font-semibold">Jumlah DED</div>
                        <div className="text-xs font-mono font-bold text-slate-900">{kpi.totalPaket} Paket</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                        <div className="text-[9px] text-slate-500 uppercase font-semibold">Biaya DED</div>
                        <div className="text-xs font-mono font-bold text-emerald-700">
                          Rp {(kpi.totalPaguDED / 1e9).toFixed(1)} M
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                        <div className="text-[9px] text-slate-500 uppercase font-semibold">Waktu</div>
                        <div className="text-xs font-mono font-bold text-slate-800">
                          {kpi.waktuPelaksanaanAvgBulan} Bln
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: WAKTU PELAKSANAAN PENYUSUNAN DED (BULAN)
         ========================================================================= */}
      {activeVisualTab === 'waktu-pelaksanaan' && (
        <div className="space-y-4">
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Atribut: WAKTU PELAKSANAAN PENYUSUNAN DED</strong>
              <p className="mt-0.5 text-[11px] text-amber-800">
                Menunjukkan durasi kontrak rata-rata penyusunan dokumen teknis dari tahap survei hingga penetapan HPS. Sektor Darat serta Laut &amp; Udara memerlukan waktu terpanjang (6,7 bulan) karena survei batimetri, geoteknik, dan asistensi KKJTJ jembatan/flyover.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Horizontal Duration Ranking */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center justify-between">
                <span>Rata-rata Durasi Penyusunan DED per Sektor (Bulan)</span>
                <span className="text-[10px] text-slate-500 font-normal">Target SOP: Maksimal 6 Bulan</span>
              </h4>

              <div className="space-y-3">
                {KPI_SEKTOR_LIST.sort((a, b) => b.waktuPelaksanaanAvgBulan - a.waktuPelaksanaanAvgBulan).map((item) => {
                  const percentageOfMax = (item.waktuPelaksanaanAvgBulan / 8) * 100;
                  const isLong = item.waktuPelaksanaanAvgBulan > 6.0;
                  return (
                    <div key={item.sektor} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                          {getSektorIcon(item.sektor)}
                          {item.sektor}
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          {item.waktuPelaksanaanAvgBulan} Bulan
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isLong ? 'bg-amber-500' : 'bg-sky-600'
                          }`}
                          style={{ width: `${percentageOfMax}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanatory Cards */}
            <div className="space-y-3">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <h5 className="font-bold text-xs text-slate-800">Sektor Durasi Tercepat: Pertamanan (4,3 Bulan)</h5>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Penyusunan DED penghijauan dan koridor hijau Tabebuya berfokus pada landscape architecture, pemilihan spesifikasi jenis vegetasi, dan instalasi sistem irigasi sprinkle dengan waktu perizinan cepat.
                </p>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <h5 className="font-bold text-xs text-slate-800">Sektor Durasi Terpanjang: Darat &amp; Pelabuhan (6,7 Bulan)</h5>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Proyek DED flyover, pelebaran arteri, dan dermaga peti kemas membutuhkan survei penyelidikan tanah (soil investigation), boring mesin, perhitungan respon dinamis gempa, dan pembebasan ROW lahan.
                </p>
              </div>

              <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-sky-950">Rata-rata Waktu Pelaksanaan Total:</div>
                  <div className="text-[11px] text-sky-800">5,5 Bulan (Tepat Waktu Sesuai Standar DIPA BP Batam)</div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: PERSENTASE PEMANFAATAN DOKUMEN OLEH UNIT/INSTANSI LAIN (DATASET #7, #8, #9)
          PIE CHART VISUALISASI LANGSUNG MEMBEDAKAN:
          1. TEKNIS BANGUNAN
          2. INFRASTRUKTUR PEMBANGUNAN
          3. LINGKUNGAN
         ========================================================================= */}
      {activeVisualTab === 'pemanfaatan-dokumen' && (
        <div className="space-y-4">
          {/* Informational banner */}
          <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs text-emerald-950 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>DATASET SATU DATA NO. 7, 8, DAN 9 (SIFAT DATA: TERBUKA)</strong>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Visualisasi Pie Chart tingkat pemanfaatan dokumen perencanaan teknis yang langsung membedakan capaian persentase dan kontribusi nilai DED pada 3 rumpun utama: <strong>Teknis Bangunan</strong>, <strong>Infrastruktur Pembangunan</strong>, dan <strong>Lingkungan</strong>.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
              SIFAT: TERBUKA
            </span>
          </div>

          {/* Controls Bar for Pie Chart */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800">
                Mode Tampilan Pie Chart:
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setPieMetric('persen')}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  pieMetric === 'persen'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Persentase Pemanfaatan (%)
              </button>
              <button
                type="button"
                onClick={() => setPieMetric('nilai')}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  pieMetric === 'nilai'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Proporsi Nilai DED (Rp Miliar)
              </button>
            </div>
          </div>

          {/* Main Visual: Pie Chart + Summary Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center bg-white rounded-xl border border-slate-200 p-4">
            {/* Left: Interactive Pie Chart (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-lg shadow-lg border border-slate-700 text-xs max-w-xs font-sans">
                              <div className="flex items-center gap-1.5 font-bold mb-1 text-emerald-400">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: data.color }}
                                />
                                <span>{data.name}</span>
                              </div>
                              <div className="text-[11px] text-slate-300 mb-2">
                                Dataset #{data.datasetNo} (Satu Data Hal. 53)
                              </div>
                              <div className="space-y-1 font-mono text-[11px] border-t border-slate-800 pt-1.5">
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Tingkat Pemanfaatan:</span>
                                  <span className="font-bold text-white">{data.persen.toFixed(1)}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Nilai Dimanfaatkan:</span>
                                  <span className="font-bold text-emerald-400">
                                    Rp {data.nilaiMiliar.toFixed(2)} M
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Total Nilai DED:</span>
                                  <span className="text-slate-300">
                                    Rp {data.totalNilaiMiliar.toFixed(2)} M
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Unit Pengguna:</span>
                                  <span className="text-slate-200">{data.unitCount} Instansi/Unit</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Pie
                      data={pieDataPemanfaatan}
                      dataKey={pieMetric === 'persen' ? 'persen' : 'nilaiMiliar'}
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={105}
                      innerRadius={55}
                      paddingAngle={4}
                      label={({ name, percent, value }) =>
                        pieMetric === 'persen'
                          ? `${name}: ${value}%`
                          : `${name}: Rp ${value}M`
                      }
                      labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                    >
                      {pieDataPemanfaatan.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                {pieDataPemanfaatan.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}:</span>
                    <strong className="font-mono text-slate-900">
                      {pieMetric === 'persen' ? `${item.persen}%` : `Rp ${item.nilaiMiliar} M`}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3 Clear Comparative Cards for Teknis Bangunan, Infrastruktur Pembangunan, Lingkungan (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              {pieDataPemanfaatan.map((item) => (
                <div
                  key={item.datasetNo}
                  className="bg-slate-50/90 rounded-xl border border-slate-200 p-3.5 hover:bg-white hover:border-slate-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <h4 className="font-bold text-xs text-slate-900">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
                        Dataset #{item.datasetNo}
                      </span>
                    </div>

                    <span
                      className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-full text-white shadow-xs"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.persen.toFixed(1)}% Teradopsi
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 mb-2.5 leading-relaxed">
                    {item.keterangan}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 border-t border-slate-200/80 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500">Nilai Dimanfaatkan:</div>
                      <div className="font-mono font-bold text-slate-900">
                        Rp {item.nilaiMiliar.toFixed(2)} Miliar
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Total Pagu DED:</div>
                      <div className="font-mono font-bold text-slate-600">
                        Rp {item.totalNilaiMiliar.toFixed(2)} Miliar
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-slate-500">Instansi Pengguna:</div>
                      <div className="font-mono font-bold text-emerald-800">
                        {item.unitCount} Instansi/Unit
                      </div>
                    </div>
                  </div>

                  {/* Instansi tags */}
                  <div className="flex flex-wrap gap-1 mt-1 pt-1.5 border-t border-dashed border-slate-200">
                    {item.instansi.map((ins, idx) => (
                      <span
                        key={idx}
                        className="text-[9.5px] px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium truncate"
                      >
                        {ins}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Insight Footer */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-slate-700">
                <strong>Nilai Total DED yang Berhasil Dimanfaatkan:</strong> Rp 40,89 Miliar (76,2% dari total anggaran perencanaan Rp 53,68 M) digunakan secara produktif tanpa dokumen kedaluwarsa.
              </span>
            </div>
            <button
              onClick={() => onOpenFormula && onOpenFormula(7)}
              className="text-[11px] font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1 underline self-start sm:self-auto cursor-pointer"
            >
              Lihat Formula Tableau Pemanfaatan
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Cara Membaca & Panduan Pemahaman Awam (Agar mudah dipahami orang lain) */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          <span>
            <strong>Panduan Singkat:</strong> DED = <em>Detail Engineering Design</em> (dokumen gambar kerja, RAB, &amp; spesifikasi teknis sebelum proyek fisik ditenderkan).
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Dataset #1 - #6: Sifat Tertutup
          </span>
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Dataset #7 - #9: Sifat Terbuka
          </span>
        </div>
      </div>
    </div>
  );
};
