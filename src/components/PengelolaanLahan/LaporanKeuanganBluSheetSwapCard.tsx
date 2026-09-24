import React, { useState, useMemo } from 'react';
import {
  Layers,
  Table as TableIcon,
  BarChart3,
  TrendingUp,
  Download,
  Search,
  Scale,
  DollarSign,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import {
  OPERASIONAL_BLU_DATA,
  PERUBAHAN_EKUITAS_BLU_DATA,
  ARUS_KAS_BLU_DATA,
  NERACA_BLU_DATA,
} from './bluFinancialData';
import { LahanVisualHeader } from './LahanVisualHeader';

interface LaporanKeuanganBluSheetSwapCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

type SheetKey = 'overview' | 'lo' | 'ekuitas' | 'arus_kas' | 'neraca';

export const LaporanKeuanganBluSheetSwapCard: React.FC<LaporanKeuanganBluSheetSwapCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<SheetKey>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Overview data combining top indicators from the 4 financial statements
  const combinedOverviewData = useMemo(() => {
    return [
      {
        kategori: 'Pendapatan-LO',
        laporan: 'Laporan Operasional (#2)',
        nilaiTahunBaru: 1360.0,
        nilaiTahunLama: 1234.3,
        persentase: 10.18,
        color: '#0284C7',
      },
      {
        kategori: 'Beban Operasional-LO',
        laporan: 'Laporan Operasional (#2)',
        nilaiTahunBaru: 973.6,
        nilaiTahunLama: 913.7,
        persentase: 6.56,
        color: '#64748B',
      },
      {
        kategori: 'Surplus-LO Berjalan',
        laporan: 'Laporan Operasional (#2)',
        nilaiTahunBaru: 386.4,
        nilaiTahunLama: 350.6,
        persentase: 10.21,
        color: '#10B981',
      },
      {
        kategori: 'Arus Kas Masuk Operasi',
        laporan: 'Laporan Arus Kas (#5)',
        nilaiTahunBaru: 528.6,
        nilaiTahunLama: 472.1,
        persentase: 11.97,
        color: '#0D9488',
      },
      {
        kategori: 'Saldo Akhir Kas BLU',
        laporan: 'Laporan Arus Kas (#5)',
        nilaiTahunBaru: 1487.6,
        nilaiTahunLama: 1280.8,
        persentase: 16.15,
        color: '#059669',
      },
      {
        kategori: 'Total Aset Lancar',
        laporan: 'Laporan Neraca (#6)',
        nilaiTahunBaru: 1988.3,
        nilaiTahunLama: 1750.5,
        persentase: 13.58,
        color: '#6366F1',
      },
      {
        kategori: 'Total Kewajiban Lancar',
        laporan: 'Laporan Neraca (#6)',
        nilaiTahunBaru: 642.5,
        nilaiTahunLama: 598.0,
        persentase: 7.44,
        color: '#F59E0B',
      },
      {
        kategori: 'Ekuitas Akhir BLU',
        laporan: 'Perubahan Ekuitas (#4)',
        nilaiTahunBaru: 48747.2,
        nilaiTahunLama: 46522.8,
        persentase: 4.78,
        color: '#1E293B',
      },
    ];
  }, []);

  // Filtered dataset according to active sheet
  const activeData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (activeSheet === 'lo') {
      let list = OPERASIONAL_BLU_DATA;
      if (q) list = list.filter((i) => i.uraian.toLowerCase().includes(q) || i.kategori.toLowerCase().includes(q));
      return list;
    }
    if (activeSheet === 'ekuitas') {
      let list = PERUBAHAN_EKUITAS_BLU_DATA;
      if (q) list = list.filter((i) => i.uraian.toLowerCase().includes(q));
      return list;
    }
    if (activeSheet === 'arus_kas') {
      let list = ARUS_KAS_BLU_DATA;
      if (q) list = list.filter((i) => i.uraian.toLowerCase().includes(q) || i.kategoriAktivitas.toLowerCase().includes(q));
      return list;
    }
    if (activeSheet === 'neraca') {
      let list = NERACA_BLU_DATA;
      if (q) list = list.filter((i) => i.namaPerkiraan.toLowerCase().includes(q) || i.kategori.toLowerCase().includes(q));
      return list;
    }
    // overview
    let list = combinedOverviewData;
    if (q) list = list.filter((i) => i.kategori.toLowerCase().includes(q) || i.laporan.toLowerCase().includes(q));
    return list;
  }, [activeSheet, searchQuery, combinedOverviewData]);

  // Chart data for current sheet
  const chartData = useMemo(() => {
    if (activeSheet === 'overview') {
      return combinedOverviewData.filter((i) => i.kategori !== 'Ekuitas Akhir BLU').map((item) => ({
        name: item.kategori.length > 18 ? item.kategori.substring(0, 16) + '...' : item.kategori,
        fullName: item.kategori,
        nilaiTahunBaru: item.nilaiTahunBaru,
        nilaiTahunLama: item.nilaiTahunLama,
        persentase: item.persentase,
        color: item.color,
      }));
    }
    if (activeSheet === 'lo') {
      return OPERASIONAL_BLU_DATA.map((item) => ({
        name: item.uraian.length > 20 ? item.uraian.substring(0, 18) + '...' : item.uraian,
        fullName: item.uraian,
        nilaiTahunBaru: item.nilaiPeriodeBaru,
        nilaiTahunLama: item.nilaiPeriodeSebelum,
        persentase: item.persentase,
        color: item.kategori === 'PENDAPATAN-LO' ? '#0284C7' : item.kategori === 'BEBAN-LO' ? '#F59E0B' : '#10B981',
      }));
    }
    if (activeSheet === 'ekuitas') {
      return PERUBAHAN_EKUITAS_BLU_DATA.filter((i) => !i.uraian.includes('Ekuitas')).map((item) => ({
        name: item.uraian.length > 20 ? item.uraian.substring(0, 18) + '...' : item.uraian,
        fullName: item.uraian,
        nilaiTahunBaru: item.nilaiPeriodeBaru,
        nilaiTahunLama: item.nilaiPeriodeSebelum,
        persentase: item.persentase,
        color: '#6366F1',
      }));
    }
    if (activeSheet === 'arus_kas') {
      return ARUS_KAS_BLU_DATA.map((item) => ({
        name: item.uraian.length > 20 ? item.uraian.substring(0, 18) + '...' : item.uraian,
        fullName: item.uraian,
        nilaiTahunBaru: item.nilaiPeriodeBaru,
        nilaiTahunLama: item.nilaiPeriodeSebelum,
        persentase: item.persentase,
        color: item.nilaiPeriodeBaru >= 0 ? '#0D9488' : '#E11D48',
      }));
    }
    // Neraca
    return NERACA_BLU_DATA.filter((i) => i.kategori !== 'EKUITAS' && i.kategori !== 'ASET TETAP').map((item) => ({
      name: item.detail,
      fullName: item.namaPerkiraan,
      nilaiTahunBaru: item.nilaiTahunBaru,
      nilaiTahunLama: item.nilaiTahunSebelumnya,
      persentase: item.persentase,
      color: '#0284C7',
    }));
  }, [activeSheet, combinedOverviewData]);

  // Export CSV
  const handleExportCsv = () => {
    let headers: string[] = [];
    let rows: any[][] = [];

    if (activeSheet === 'lo') {
      headers = ['Uraian Pos LO', 'Kategori', 'Periode Baru (TW II 2026)', 'Periode Sebelumnya (TW II 2025)', 'Pertumbuhan (Rp Miliar)', 'Persentase (%)'];
      rows = OPERASIONAL_BLU_DATA.map((d) => [`"${d.uraian}"`, `"${d.kategori}"`, d.nilaiPeriodeBaru, d.nilaiPeriodeSebelum, d.nilaiKenaikanPenurunan, d.persentase]);
    } else if (activeSheet === 'ekuitas') {
      headers = ['Uraian Perubahan Ekuitas', 'Periode Baru (2026)', 'Periode Sebelum (2025)', 'Kenaikan/Penurunan', 'Persentase (%)'];
      rows = PERUBAHAN_EKUITAS_BLU_DATA.map((d) => [`"${d.uraian}"`, d.nilaiPeriodeBaru, d.nilaiPeriodeSebelum, d.nilaiKenaikanPenurunan, d.persentase]);
    } else if (activeSheet === 'arus_kas') {
      headers = ['Uraian Arus Kas', 'Aktivitas', 'TW II 2026 (Rp M)', 'TW II 2025 (Rp M)', 'Mutasi Kas (Rp M)', 'Persentase (%)'];
      rows = ARUS_KAS_BLU_DATA.map((d) => [`"${d.uraian}"`, `"${d.kategoriAktivitas}"`, d.nilaiPeriodeBaru, d.nilaiPeriodeSebelum, d.nilaiKenaikanPenurunan, d.persentase]);
    } else if (activeSheet === 'neraca') {
      headers = ['Kategori', 'Detail Perkiraan', 'Nama Akun', 'Tahun 2026 (Rp M)', 'Tahun 2025 (Rp M)', 'Pertumbuhan (Rp M)', 'Persentase (%)'];
      rows = NERACA_BLU_DATA.map((d) => [`"${d.kategori}"`, `"${d.detail}"`, `"${d.namaPerkiraan}"`, d.nilaiTahunBaru, d.nilaiTahunSebelumnya, d.nilaiKenaikanPenurunan, d.persentase]);
    } else {
      headers = ['Indikator Finansial', 'Laporan Rujukan', 'Nilai Tahun Baru (Rp M)', 'Nilai Tahun Lama (Rp M)', 'Persentase (%)'];
      rows = combinedOverviewData.map((d) => [`"${d.kategori}"`, `"${d.laporan}"`, d.nilaiTahunBaru, d.nilaiTahunLama, d.persentase]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Keuangan_BLU_${activeSheet}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic header metadata per sheet
  const getHeaderMeta = () => {
    switch (activeSheet) {
      case 'lo':
        return {
          dsNo: 2,
          pages: 'Hal. 2-3 Item 2',
          title: 'LAPORAN OPERASIONAL BADAN LAYANAN UMUM (BLU)',
          visualName: 'Komparasi Batang Nilai Periode Baru vs Sebelumnya & Garis Persentase (%) Pertumbuhan',
          attributes: ['URAIAN', 'PERIODE BARU (2026)', 'PERIODE SEBELUM (2025)', 'KENAIKAN / PENURUNAN', 'PERSENTASE (%)'],
        };
      case 'ekuitas':
        return {
          dsNo: 4,
          pages: 'Hal. 3 Item 4',
          title: 'LAPORAN PERUBAHAN EKUITAS BADAN LAYANAN UMUM (BLU)',
          visualName: 'Visualisasi Komparasi Saldo Awal, Surplus-LO, Revaluasi & Ekuitas Akhir Konsolidasian',
          attributes: ['URAIAN', 'NILAI PERIODE BARU', 'NILAI PERIODE SEBELUM', 'MUTASI EKUITAS', 'PERSENTASE (%)'],
        };
      case 'arus_kas':
        return {
          dsNo: 5,
          pages: 'Hal. 3 Item 5',
          title: 'LAPORAN ARUS KAS BADAN LAYANAN UMUM (BLU)',
          visualName: 'Grafik Batang Arus Kas Bersih per Aktivitas (Operasi, Investasi, Pendanaan, Transitoris) & Saldo Kas',
          attributes: ['URAIAN ARUS KAS', 'NILAI PERIODE BARU', 'NILAI PERIODE SEBELUM', 'MUTASI KAS', 'PERSENTASE (%)'],
        };
      case 'neraca':
        return {
          dsNo: 6,
          pages: 'Hal. 3 Item 6',
          title: 'LAPORAN NERACA BADAN LAYANAN UMUM (BLU)',
          visualName: 'Komparasi Struktur Aset Lancar, Aset Tetap BMN, Kewajiban & Ekuitas BLU',
          attributes: ['KATEGORI', 'NAMA PERKIRAAN', 'NILAI TAHUN BARU', 'NILAI TAHUN SEBELUMNYA', 'PERSENTASE (%)'],
        };
      default:
        return {
          dsNo: '2, 4, 5, 6',
          pages: 'Hal. 2-3',
          title: 'KONSOLIDASI 4 LAPORAN KEUANGAN BADAN LAYANAN UMUM (BLU)',
          visualName: 'Dual-Axis Composed Bar (Nilai Tahun Baru Rp Miliar) & Line (% Pertumbuhan) dengan Sheet Swap',
          attributes: ['POS LAPORAN BLU', 'NILAI TAHUN BARU (2026)', 'NILAI TAHUN SEBELUM (2025)', 'PERSENTASE PERTUMBUHAN (%)'],
        };
    }
  };

  const meta = getHeaderMeta();

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header Visualisasi Terstandarisasi */}
      <div className="p-4 pb-0">
        <LahanVisualHeader
          datasetNumber={meta.dsNo}
          pdfPages={meta.pages}
          classification="TERTUTUP"
          periode="PER 30 JUNI 2026 (TW II)"
          title={meta.title}
          visualName={meta.visualName}
          attributes={meta.attributes}
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('laporan_keuangan_blu')}
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Sheet Swap Controls - Poin 6 */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setActiveSheet('overview')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeSheet === 'overview'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Gabungan 4 Laporan
                </button>
                <button
                  onClick={() => setActiveSheet('lo')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeSheet === 'lo'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Operasional (LO #2)
                </button>
                <button
                  onClick={() => setActiveSheet('ekuitas')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeSheet === 'ekuitas'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ekuitas (#4)
                </button>
                <button
                  onClick={() => setActiveSheet('arus_kas')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeSheet === 'arus_kas'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Arus Kas (#5)
                </button>
                <button
                  onClick={() => setActiveSheet('neraca')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeSheet === 'neraca'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Neraca (#6)
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportCsv}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Unduh Data CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>
          }
        />
      </div>

      {/* Mini KPI Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-200 text-xs">
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Surplus Operasional (LO)</div>
          <div className="text-base font-bold text-emerald-700">Rp 386,4 Miliar</div>
          <div className="text-[10px] text-emerald-600 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>+10,21% dibanding TW II 2025</span>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Saldo Akhir Kas &amp; Setara Kas</div>
          <div className="text-base font-bold text-sky-700">Rp 1.487,6 Miliar</div>
          <div className="text-[10px] text-sky-600 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>+16,15% kenaikan likuiditas</span>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Ekuitas Akhir Konsolidasi</div>
          <div className="text-base font-bold text-slate-900">Rp 48,75 Triliun</div>
          <div className="text-[10px] text-slate-600 font-medium">Pertumbuhan +4,78% YoY</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Model Pelaporan</div>
          <div className="text-base font-bold text-slate-800">4-Way Sheet Swap</div>
          <div className="text-[10px] text-indigo-700 font-medium">Standar Akuntansi BLU (PSAP 13)</div>
        </div>
      </div>

      {/* Main Section */}
      <div className="p-3.5 space-y-3">
        {/* Visual Chart: Nilai Tahun Baru vs Line Persentase */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-800">
              Grafik Komparasi: Nilai Periode Baru (Rp Miliar, Sumbu Kiri) &amp; Pertumbuhan/Persentase (% Garis, Sumbu Kanan)
            </span>
            <span className="text-[10.5px] font-mono text-slate-500">
              {activeSheet === 'overview'
                ? 'Indikator Utama 4 Laporan'
                : activeSheet === 'lo'
                ? 'Laporan Operasional (LO)'
                : activeSheet === 'ekuitas'
                ? 'Perubahan Ekuitas'
                : activeSheet === 'arus_kas'
                ? 'Arus Kas'
                : 'Neraca BLU'}
            </span>
          </div>

          <div className="h-[270px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 15, right: 30, left: 10, bottom: 35 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#64748B', fontSize: 10 }}
                  interval={0}
                  angle={-14}
                  textAnchor="end"
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: '#0284C7', fontSize: 10.5 }}
                  label={{
                    value: 'Nilai (Rp Miliar)',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#0284C7',
                    fontSize: 10,
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: '#10B981', fontSize: 10.5 }}
                  label={{
                    value: 'Persentase (%)',
                    angle: 90,
                    position: 'insideRight',
                    fill: '#10B981',
                    fontSize: 10,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value: any, name: any) => [
                    name === 'persentase'
                      ? `${Number(value).toFixed(2)}%`
                      : `Rp ${Number(value).toLocaleString('id-ID')} Miliar`,
                    name === 'nilaiTahunBaru'
                      ? 'Nilai Tahun Baru (2026)'
                      : name === 'nilaiTahunLama'
                      ? 'Nilai Tahun Sebelumnya (2025)'
                      : 'Pertumbuhan / Persentase',
                  ]}
                />
                <Legend
                  verticalAlign="top"
                  height={30}
                  formatter={(val) => (
                    <span className="text-xs font-semibold text-slate-700">
                      {val === 'nilaiTahunBaru'
                        ? 'Nilai Tahun Baru 2026 (Rp M)'
                        : val === 'nilaiTahunLama'
                        ? 'Nilai Tahun Lalu 2025 (Rp M)'
                        : 'Persentase Pertumbuhan (%)'}
                    </span>
                  )}
                />
                <Bar
                  yAxisId="left"
                  dataKey="nilaiTahunLama"
                  name="nilaiTahunLama"
                  fill="#94A3B8"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
                <Bar
                  yAxisId="left"
                  dataKey="nilaiTahunBaru"
                  name="nilaiTahunBaru"
                  fill="#0284C7"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="persentase"
                  name="persentase"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: '#10B981' }}
                  activeDot={{ r: 5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Accounting Table for Active Sheet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">
              Tabel Rincian Akuntansi: {meta.title}
            </span>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari akun atau uraian..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-52 sm:w-60"
              />
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="overflow-x-auto max-h-[300px]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold sticky top-0">
                  <tr>
                    <th className="py-2.5 px-3">Uraian / Akun Perkiraan</th>
                    <th className="py-2.5 px-3 text-right">Nilai 2026 (Rp M)</th>
                    <th className="py-2.5 px-3 text-right">Nilai 2025 (Rp M)</th>
                    <th className="py-2.5 px-3 text-right">Mutasi / Selisih</th>
                    <th className="py-2.5 px-3 text-right">Pertumbuhan (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {activeSheet === 'lo' ? (
                    OPERASIONAL_BLU_DATA.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors font-sans">
                        <td className="py-2 px-3">
                          <div className="font-semibold text-slate-900">{row.uraian}</div>
                          <div className="text-[10px] text-slate-500">{row.kategori}</div>
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-sky-700 font-mono">
                          Rp {row.nilaiPeriodeBaru.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right text-slate-600 font-mono">
                          Rp {row.nilaiPeriodeSebelum.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right text-slate-700 font-mono">
                          +{row.nilaiKenaikanPenurunan.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-700 font-mono">
                          +{row.persentase.toFixed(2)}%
                        </td>
                      </tr>
                    ))
                  ) : activeSheet === 'ekuitas' ? (
                    PERUBAHAN_EKUITAS_BLU_DATA.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors font-sans">
                        <td className="py-2 px-3 font-semibold text-slate-900">{row.uraian}</td>
                        <td className="py-2 px-3 text-right font-bold text-sky-700 font-mono">
                          Rp {row.nilaiPeriodeBaru.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right text-slate-600 font-mono">
                          Rp {row.nilaiPeriodeSebelum.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right text-slate-700 font-mono">
                          +{row.nilaiKenaikanPenurunan.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-700 font-mono">
                          +{row.persentase.toFixed(2)}%
                        </td>
                      </tr>
                    ))
                  ) : activeSheet === 'arus_kas' ? (
                    ARUS_KAS_BLU_DATA.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors font-sans">
                        <td className="py-2 px-3">
                          <div className="font-semibold text-slate-900">{row.uraian}</div>
                          <div className="text-[10px] text-slate-500">Aktivitas {row.kategoriAktivitas}</div>
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-sky-700 font-mono">
                          Rp {row.nilaiPeriodeBaru.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right text-slate-600 font-mono">
                          Rp {row.nilaiPeriodeSebelum.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right text-slate-700 font-mono">
                          {row.nilaiKenaikanPenurunan >= 0 ? '+' : ''}
                          {row.nilaiKenaikanPenurunan.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-700 font-mono">
                          +{row.persentase.toFixed(2)}%
                        </td>
                      </tr>
                    ))
                  ) : activeSheet === 'neraca' ? (
                    NERACA_BLU_DATA.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors font-sans">
                        <td className="py-2 px-3">
                          <div className="font-semibold text-slate-900">{row.namaPerkiraan}</div>
                          <div className="text-[10px] text-slate-500">{row.kategori} • {row.detail}</div>
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-sky-700 font-mono">
                          Rp {row.nilaiTahunBaru.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right text-slate-600 font-mono">
                          Rp {row.nilaiTahunSebelumnya.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right text-slate-700 font-mono">
                          +{row.nilaiKenaikanPenurunan.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-700 font-mono">
                          +{row.persentase.toFixed(2)}%
                        </td>
                      </tr>
                    ))
                  ) : (
                    combinedOverviewData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors font-sans">
                        <td className="py-2 px-3">
                          <div className="font-semibold text-slate-900">{row.kategori}</div>
                          <div className="text-[10px] text-slate-500">{row.laporan}</div>
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-sky-700 font-mono">
                          Rp {row.nilaiTahunBaru.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right text-slate-600 font-mono">
                          Rp {row.nilaiTahunLama.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right text-slate-700 font-mono">
                          +{(row.nilaiTahunBaru - row.nilaiTahunLama).toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-700 font-mono">
                          +{row.persentase.toFixed(2)}%
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Integrasi 4 Laporan Keuangan BLU:</strong> Laporan Operasional, Perubahan Ekuitas, Arus Kas, dan Neraca menyajikan informasi posisi keuangan dan hasil kinerja entitas secara komprehensif.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 2-3</span>
      </div>
    </div>
  );
};
