import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  PieChart as PieIcon,
  TrendingUp,
  FileCheck2,
  FileText,
  BarChart3,
  Scale,
  Building2,
  Layers,
  ArrowUpRight,
  Database,
  HelpCircle,
  Download,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  KPI_DATASETS_PENGENDALIAN,
  DATA_KPI_TAHUNAN,
} from './pengendalianData';

interface EvaluasiTindakLanjutVisualizerProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const EvaluasiTindakLanjutVisualizer: React.FC<
  EvaluasiTindakLanjutVisualizerProps
> = ({ onOpenFormulaModal }) => {
  const [selectedView, setSelectedView] = useState<'gabungan' | 'pembinaan' | 'kerjasama'>('gabungan');

  // Indikator 1 & 2 dari Satu Data Hal. 14
  const kpiPembinaan = KPI_DATASETS_PENGENDALIAN.find((d) => d.nomorDataset === 3) || {
    nomorDataset: 3,
    namaDataset: 'PERSENTASE HASIL EVALUASI PENGENDALIAN DAN PEMBINAAN BADAN USAHA YANG DITINDAKLANJUTI',
    capaian: 94.6,
    target: 90.0,
    satuan: '%',
    formula: '(Rekomendasi Hasil Evaluasi & Pembinaan BU Ditindaklanjuti / Total Rekomendasi) × 100%',
  };

  const kpiKerjasama = KPI_DATASETS_PENGENDALIAN.find((d) => d.nomorDataset === 4) || {
    nomorDataset: 4,
    namaDataset: 'PERSENTASE HASIL PERBAIKAN, DAN PERUBAHAN KERJASAMA USAHA YANG DITINDAKLANJUTI',
    capaian: 91.8,
    target: 88.0,
    satuan: '%',
    formula: '(Perbaikan dan Perubahan PKS Kerjasama Usaha Ditindaklanjuti / Total Permohonan Perubahan) × 100%',
  };

  // Nilai Gabungan
  const rataRataCapaian = (kpiPembinaan.capaian + kpiKerjasama.capaian) / 2;
  const rataRataTarget = (kpiPembinaan.target + kpiKerjasama.target) / 2;

  // Data Gabungan Pie Chart
  // Pembinaan: 45 ditindaklanjuti, 3 dalam proses (total 48)
  // Perbaikan Kerjasama: 45 ditindaklanjuti, 4 dalam proses (total 49)
  const donutData = [
    {
      name: 'Pembinaan BU Ditindaklanjuti',
      value: 45,
      percentage: kpiPembinaan.capaian,
      color: '#059669', // Emerald
      labelDetail: 'Dataset #3 (Hal. 14)',
    },
    {
      name: 'Perbaikan PKS Ditindaklanjuti',
      value: 45,
      percentage: kpiKerjasama.capaian,
      color: '#3B82F6', // Blue
      labelDetail: 'Dataset #4 (Hal. 14)',
    },
    {
      name: 'Dalam Proses Harmonisasi/Mitigasi',
      value: 7,
      percentage: 100 - rataRataCapaian,
      color: '#F59E0B', // Amber
      labelDetail: 'Total 7 Objek Dalam Proses',
    },
  ];

  // Rincian Bidang Evaluasi & Perbaikan PKS
  const rincianBidangData = [
    {
      no: 1,
      bidang: 'Kepatuhan Operasional Fasilitas & Standar Sarana BU',
      jenis: 'Evaluasi Pembinaan BU (DS 3)',
      target: 95.0,
      diberikan: 18,
      ditindaklanjuti: 18,
      persentase: 100.0,
      status: 'Selesai 100%',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      no: 2,
      bidang: 'Ketertiban Administrasi, Pelaporan & SLA Layanan',
      jenis: 'Evaluasi Pembinaan BU (DS 3)',
      target: 90.0,
      diberikan: 30,
      ditindaklanjuti: 27,
      persentase: 90.0,
      status: 'Optimal (3 Monitoring)',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      no: 3,
      bidang: 'Penyesuaian Klausul Bagi Hasil & Rekonsiliasi PNBP',
      jenis: 'Perbaikan Kerjasama (DS 4)',
      target: 90.0,
      diberikan: 24,
      ditindaklanjuti: 23,
      persentase: 95.8,
      status: 'Selesai 95.8%',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      no: 4,
      bidang: 'Adendum Perjanjian PKS & Penataan Hak/Kewajiban Aset',
      jenis: 'Perbaikan Kerjasama (DS 4)',
      target: 88.0,
      diberikan: 25,
      ditindaklanjuti: 22,
      persentase: 88.0,
      status: 'Patuh (3 Legal Drafting)',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
  ];

  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'EVALUASI PENGENDALIAN PEMBINAAN DAN PERBAIKAN KERJASAMA BADAN USAHA BP BATAM\n';
    csvContent += 'Buku Satu Data BP Batam Hal. 14\n\n';
    csvContent += 'No,Indikator Kinerja,Dataset,Target (%),Realisasi (%),Diberikan,Ditindaklanjuti,Status\n';
    rincianBidangData.forEach((row) => {
      csvContent += `${row.no},"${row.bidang}","${row.jenis}",${row.target}%,${row.persentase}%,${row.diberikan},${row.ditindaklanjuti},"${row.status}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `evaluasi_pengendalian_kerjasama_bp_batam.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4 font-sans text-slate-800">
      {/* 1. Header Resmi Satu Data BP Batam (Hal. 14) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 border border-indigo-200 flex items-center gap-1">
              <Database className="w-3 h-3 text-indigo-700" />
              DATASET NO. 3 &amp; 4 (HAL. 14 BUKU SATU DATA)
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              TERTUTUP • PERTAHUN
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              DIT. PENGENDALIAN PENGUSAHAAN
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            Visualisasi Hasil Evaluasi Pengendalian, Pembinaan &amp; Perbaikan Kerja Sama Usaha
          </h3>
          <p className="text-[11px] text-slate-500">
            Menggabungkan persentase tindak lanjut hasil evaluasi pembinaan Badan Usaha dan persentase tindak lanjut perbaikan kerja sama usaha BP Batam
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            title="Ekspor CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ekspor CSV</span>
          </button>
          {onOpenFormulaModal && (
            <button
              onClick={() => onOpenFormulaModal('ikp-4-pengendalian-pengusahaan')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Formula &amp; Regulasi</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Dua Kartu Metrik Utama Sesuai Buku Satu Data Hal. 14 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* KARTU 1: INDIKATOR DATASET NO. 3 */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-emerald-200 bg-linear-to-br from-emerald-50/50 via-white to-emerald-50/20 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              DATASET #3 • PEMBINAAN BU
            </span>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Melampaui Target (+4,6%)
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
            Persentase Hasil Evaluasi Pengendalian dan Pembinaan Badan Usaha yang Ditindaklanjuti
          </h4>

          <div className="flex items-baseline justify-between pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-950">
                {kpiPembinaan.capaian.toFixed(1)}%
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">Tuntas</span>
            </div>
            <div className="text-right text-[11px] font-mono">
              <span className="text-slate-400 block text-[9.5px] uppercase font-bold">Target Mutu</span>
              <span className="font-extrabold text-slate-800">{kpiPembinaan.target.toFixed(1)}%</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${kpiPembinaan.capaian}%` }}
            />
          </div>

          {/* Sub detail & formula */}
          <div className="pt-1.5 border-t border-emerald-100 flex items-center justify-between text-[10px] font-mono text-slate-600">
            <span>Rekomendasi Diselesaikan: <strong>45 dari 48</strong></span>
            <span className="text-emerald-700 font-bold">3 Dalam Pemantauan</span>
          </div>
        </div>

        {/* KARTU 2: INDIKATOR DATASET NO. 4 */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-blue-200 bg-linear-to-br from-blue-50/50 via-white to-blue-50/20 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-blue-700" />
              DATASET #4 • KERJA SAMA USAHA
            </span>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Melampaui Target (+3,8%)
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
            Persentase Hasil Perbaikan, dan Perubahan Kerja Sama Usaha yang Ditindaklanjuti
          </h4>

          <div className="flex items-baseline justify-between pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-blue-950">
                {kpiKerjasama.capaian.toFixed(1)}%
              </span>
              <span className="text-xs font-mono font-bold text-blue-700">Tuntas</span>
            </div>
            <div className="text-right text-[11px] font-mono">
              <span className="text-slate-400 block text-[9.5px] uppercase font-bold">Target Mutu</span>
              <span className="font-extrabold text-slate-800">{kpiKerjasama.target.toFixed(1)}%</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${kpiKerjasama.capaian}%` }}
            />
          </div>

          {/* Sub detail & formula */}
          <div className="pt-1.5 border-t border-blue-100 flex items-center justify-between text-[10px] font-mono text-slate-600">
            <span>Perbaikan PKS Diselesaikan: <strong>45 dari 49</strong></span>
            <span className="text-blue-700 font-bold">4 Harmonisasi Legal</span>
          </div>
        </div>
      </div>

      {/* 3. VISUALISASI GABUNGAN: DONUT CHART & BAR CHART KOMPARASI TAHUNAN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
        {/* Kiri (5 Kolom): Donut Chart Gabungan Persentase Tindak Lanjut */}
        <div className="lg:col-span-5 p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <PieIcon className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Donut Chart Gabungan Status Tindak Lanjut
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
              Total 97 Butir
            </span>
          </div>

          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any, item: any) => [
                    `${value} Butir (${item.payload.percentage.toFixed(1)}%)`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: '#0F1E36',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Central Score Callout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Rata-Rata</span>
              <span className="text-2xl font-black font-mono text-slate-900 leading-tight">
                {rataRataCapaian.toFixed(1)}%
              </span>
              <span className="text-[10px] font-bold text-emerald-700">Tindak Lanjut</span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-1.5 text-xs pt-1 border-t border-slate-200">
            {donutData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-700 font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-900">
                  {item.value} Butir ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Kanan (7 Kolom): Tren Capaian Tahunan 2 Indikator (Atribut Satu Data: Tahun & Persentase) */}
        <div className="lg:col-span-7 p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Tren Capaian Persentase 2 Indikator (2023 - 2026)
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Atribut: TAHUN &bull; PERSENTASE
            </span>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA_KPI_TAHUNAN} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="tahun" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis domain={[75, 100]} tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val}%`, name]}
                  contentStyle={{
                    backgroundColor: '#0F1E36',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '10px', paddingTop: '6px' }}
                  iconType="circle"
                />
                <Bar
                  dataKey="persentaseEvaluasiPembinaan"
                  name="% Evaluasi Pembinaan BU (DS 3)"
                  fill="#059669"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="persentasePerbaikanPerubahan"
                  name="% Perbaikan Kerjasama PKS (DS 4)"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs font-mono">
            <div className="p-2 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-between">
              <span className="text-[10.5px] text-emerald-900">Rata-rata 4 Tahun Pembinaan:</span>
              <span className="font-black text-emerald-950">92.25%</span>
            </div>
            <div className="p-2 rounded bg-blue-50 border border-blue-100 flex items-center justify-between">
              <span className="text-[10.5px] text-blue-900">Rata-rata 4 Tahun Kerjasama:</span>
              <span className="font-black text-blue-950">88.38%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tabel Detail Rincian 4 Bidang Evaluasi & Perbaikan Kerjasama */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Matriks Hasil Tindak Lanjut per Bidang Pengendalian &amp; Kemitraan</span>
          </h4>
          <span className="text-[10px] font-mono text-slate-500">
            Sumber: Subdit Evaluasi &amp; Restrukturisasi Kerjasama BP Batam
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200 font-mono">
                <th className="py-2 px-3 text-center">No</th>
                <th className="py-2 px-3">Bidang Pengendalian &amp; Kerja Sama Usaha</th>
                <th className="py-2 px-3">Indikator Dataset</th>
                <th className="py-2 px-2 text-center">Diberikan</th>
                <th className="py-2 px-2 text-center">Selesai</th>
                <th className="py-2 px-3 text-right">Persentase</th>
                <th className="py-2 px-3 text-center">Status Mutu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {rincianBidangData.map((row) => (
                <tr key={row.no} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2 px-3 text-center font-mono font-bold text-slate-500">{row.no}</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">{row.bidang}</td>
                  <td className="py-2 px-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {row.jenis}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center font-mono font-bold text-slate-700">{row.diberikan}</td>
                  <td className="py-2 px-2 text-center font-mono font-black text-emerald-700">{row.ditindaklanjuti}</td>
                  <td className="py-2 px-3 text-right font-mono font-black text-slate-900">
                    {row.persentase.toFixed(1)}%
                  </td>
                  <td className="py-2 px-3 text-center font-mono">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${row.badgeColor}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-200">
                <td colSpan={3} className="py-2.5 px-3 font-bold text-slate-950 text-right uppercase font-mono text-[10.5px]">
                  Total Konsolidasi 2 Indikator:
                </td>
                <td className="py-2.5 px-2 text-center font-mono font-black text-slate-950">97</td>
                <td className="py-2.5 px-2 text-center font-mono font-black text-emerald-750">90</td>
                <td className="py-2.5 px-3 text-right font-mono font-black text-indigo-900 text-sm">
                  {rataRataCapaian.toFixed(1)}%
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-600 text-white font-mono shadow-2xs">
                    Melampaui Target (+4,2%)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
