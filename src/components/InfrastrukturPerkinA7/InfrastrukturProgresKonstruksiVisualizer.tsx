import React from 'react';
import {
  TrendingUp,
  HardHat,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  Database,
  ShieldAlert,
  HelpCircle,
  Activity,
  ArrowUpRight,
  FileText,
  SlidersHorizontal,
  Info,
  Table,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import {
  KURVA_S_INFRASTRUKTUR_BULANAN,
  KURVA_S_METADATA_ATRIBUT,
} from './perkinA7Data';
import {
  DATASET_4_PROGRES_KONSTRUKSI,
  DATASET_6_PEMBANGUNAN_INFRASTRUKTUR,
} from '../PembangunanInfrastruktur/infrastrukturData';

interface InfrastrukturProgresKonstruksiVisualizerProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const InfrastrukturProgresKonstruksiVisualizer: React.FC<
  InfrastrukturProgresKonstruksiVisualizerProps
> = ({ onOpenFormulaModal, onNavigateToUnit }) => {
  // Mode Tampilan: Hanya Kurva S & Timeline (sesuai instruksi user)
  const viewMode = 'kurva-s-timeline';

  // Summary Metrics
  const totalPaket = DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.length; // 14 Paket
  const totalKontrakMiliar =
    DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.reduce(
      (acc, curr) => acc + (curr.nilaiKontrak || 0),
      0
    ) / 1000000000;
  const totalPaguMiliar =
    DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.reduce(
      (acc, curr) => acc + (curr.paguAnggaran || curr.nilaiKontrak * 1.05),
      0
    ) / 1000000000;

  // Kurva S Chart Data with Deviasi
  const chartData = KURVA_S_INFRASTRUKTUR_BULANAN.map((item) => {
    const deviasiNum =
      item.realisasiFisik !== null
        ? parseFloat((item.realisasiFisik - item.targetFisik).toFixed(1))
        : null;
    return {
      ...item,
      deviasiNum,
    };
  });

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* ============================================================== */}
      {/* 1. EXECUTIVE METRIC CARDS                                      */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Metric 1: Realisasi Fisik Lapangan */}
        <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono font-bold text-emerald-800">
              REALISASI FISIK (PRGRS_PEK)
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold">
              Bulan Sep
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-950 mt-1">
            86,5 %
          </div>
          <div className="text-[11px] text-emerald-700 font-mono font-bold mt-0.5 flex items-center justify-between">
            <span>Deviasi: -1,5% (On Schedule)</span>
            <span className="text-slate-500 font-normal">Target: 88,0%</span>
          </div>
        </div>

        {/* Metric 2: Nilai Total Kontrak & Pagu */}
        <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono font-bold text-blue-800">
              NILAI KONTRAK (NKON_S)
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-300">
              {totalPaket} Paket Fisik
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-blue-950 mt-1">
            Rp {totalKontrakMiliar.toFixed(1)} M
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center justify-between">
            <span>Pagu (NPAGU_F): Rp {totalPaguMiliar.toFixed(1)} M</span>
            <span className="font-bold text-blue-700">Efisiensi 5,1%</span>
          </div>
        </div>

        {/* Metric 3: Serapan Keuangan DIPA */}
        <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono font-bold text-purple-800">
              REALISASI KEUANGAN (SP2D)
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-bold border border-purple-300">
              DIPA BP Batam
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-purple-950 mt-1">
            81,00 %
          </div>
          <div className="text-[11px] text-purple-700 font-mono font-bold mt-0.5 flex items-center justify-between">
            <span>Rp 682,43 Miliar Serapan</span>
            <span className="text-slate-500 font-normal">Target: 85,0%</span>
          </div>
        </div>

        {/* Metric 4: Distribusi Kesehatan Kontrak */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-600">
              DISTRIBUSI KESEHATAN KONTRAK
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
              Kurva S
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
              9 Ahead/Selesai
            </span>
            <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
              3 Normal
            </span>
            <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
              2 SCM/Waspada
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">
            2 paket dalam pemantauan Show Cause Meeting (SCM)
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. SHOW CAUSE MEETING (SCM) WARNING & MITIGATION BOX           */}
      {/* ============================================================== */}
      <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-300 text-xs text-amber-950 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>PENGAWASAN KONTRAK KRITIS &amp; SHOW CAUSE MEETING (SCM 1 &amp; SCM 2):</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-300 self-start sm:self-auto">
            Standar Teknis Penanganan Kontrak Kritis PUPR &amp; BP Batam
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-0.5">
          {/* Paket Kritis 1: Batu Ampar */}
          <div className="bg-white p-2.5 rounded-lg border border-amber-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs truncate max-w-[240px]">
                Revitalisasi Dermaga Utara Batu Ampar (Tahap 2)
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 border border-rose-200">
                SCM 1 (Deviasi -11.5%)
              </span>
            </div>
            <div className="text-[11px] text-slate-600">
              <strong>Kendala (KENDALA):</strong> Formasi batuan dasar laut keras menghambat penetrasi tiang pancang baja D=1000mm.
            </div>
            <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-1.5 rounded border border-emerald-200">
              <strong>Tindak Lanjut Percepatan:</strong> Mobilisasi hydraulic drilling rig tambahan dan penambahan shift kerja 24 jam.
            </div>
          </div>

          {/* Paket Kritis 2: Akses Pelabuhan Telaga Punggur */}
          <div className="bg-white p-2.5 rounded-lg border border-amber-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs truncate max-w-[240px]">
                Pelebaran Jalan Akses Pelabuhan Telaga Punggur
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 border border-rose-200">
                SCM 2 (Deviasi -13.0%)
              </span>
            </div>
            <div className="text-[11px] text-slate-600">
              <strong>Kendala (KENDALA):</strong> Keterlambatan pasokan batching plant beton mutu FS 45 dan tingginya arus trailer logistik.
            </div>
            <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-1.5 rounded border border-emerald-200">
              <strong>Tindak Lanjut Percepatan:</strong> Kontraktor wajib tambah batching plant cadangan di Kabil dan jadwal cor malam hari.
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. TOOLBAR MODE TAMPILAN: HANYA KURVA S & TIMELINE             */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase font-mono text-slate-500 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            Mode Tampilan:
          </span>
          <div className="px-3 py-1.5 rounded-lg font-bold bg-blue-600 text-white shadow-2xs flex items-center gap-1.5 text-xs">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Kurva S &amp; Timeline</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
          <span className="text-slate-400">Dasar Verifikasi:</span>
          <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-slate-800">
            PDF Satu Data Hal. 49-51 &amp; Hal. 2, 4
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5. KURVA S AGREGAT PELAKSANAAN KONSTRUKSI TA 2025              */}
      {/* ============================================================== */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-4">
        {/* Header Kurva S Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 font-mono">
                KURVA S AGREGAT PELAKSANAAN KONSTRUKSI TA 2025
              </h4>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Target Rencana Kumulatif (<code>VOL_PEK</code>) vs Realisasi Fisik Lapangan (<code>PRGRS_PEK</code>) vs Serapan Keuangan DIPA (<code>REALISASI</code>)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="bg-slate-100 px-2 py-1 rounded-lg">
              <span className="text-[10px] text-slate-500 block uppercase">POSISI DATA (SEP 2025)</span>
              <span className="font-bold text-emerald-700">
                Fisik: 86,5% <span className="text-slate-500 font-normal">(Dev: -1,5%)</span>
              </span>
            </div>
            <div className="bg-purple-50 px-2 py-1 rounded-lg border border-purple-200">
              <span className="text-[10px] text-purple-600 block uppercase">KEUANGAN SP2D</span>
              <span className="font-bold text-purple-800">
                81,0% (Rp 682,43 M)
              </span>
            </div>
          </div>
        </div>

        {/* Kurva S Composed Chart: Target Area, Realisasi Line, Keuangan Line, dan Deviasi Bar */}
        <div className="h-72 sm:h-80 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 15, right: 15, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTargetFisik" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis unit="%" domain={[0, 105]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                formatter={(val: any, name: any) => [val !== null ? `${val}%` : '-', name]}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area
                type="monotone"
                dataKey="targetFisik"
                name="Target Rencana Fisik (VOL_PEK) %"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorTargetFisik)"
              />
              <Line
                type="monotone"
                dataKey="realisasiFisik"
                name="Realisasi Fisik Lapangan (PRGRS_PEK) %"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="keuangan"
                name="Realisasi Keuangan DIPA (REALISASI) %"
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#8b5cf6' }}
              />
              <Bar
                dataKey="deviasiNum"
                name="Deviasi Fisik Bulanan (+/- %)"
                fill="#f59e0b"
                barSize={12}
                radius={[2, 2, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.deviasiNum === null
                        ? '#cbd5e1'
                        : entry.deviasiNum >= 0
                        ? '#10b981'
                        : entry.deviasiNum >= -2
                        ? '#3b82f6'
                        : '#ef4444'
                    }
                  />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* ============================================================== */}
        {/* TABEL REKAPITULASI KURVA S BULANAN (ATRIBUT PDF RESMI)         */}
        {/* ============================================================== */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase font-mono">
              <Table className="w-3.5 h-3.5 text-blue-600" />
              <span>Tabel Progres Kurva S Bulanan TA 2025 &amp; Pemetaan Atribut PDF</span>
            </h5>
            <span className="text-[10px] font-mono text-slate-500">
              Periode Data: Perbulan (Buku Satu Data Hal. 49 Data No. 4)
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase font-mono">
                  <th className="py-2.5 px-3">BULAN</th>
                  <th className="py-2.5 px-3 text-center">RENCANA (VOL_PEK)</th>
                  <th className="py-2.5 px-3 text-center">REALISASI (PRGRS_PEK)</th>
                  <th className="py-2.5 px-3 text-center">DEVIASI FISIK</th>
                  <th className="py-2.5 px-3 text-center">KEUANGAN (REALISASI)</th>
                  <th className="py-2.5 px-3 text-center">STATUS</th>
                  <th className="py-2.5 px-3">CATATAN LAPANGAN / MILESTONE PEKERJAAN</th>
                  <th className="py-2.5 px-3 font-mono text-[9px]">ATRIBUT PDF SATU DATA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {KURVA_S_INFRASTRUKTUR_BULANAN.map((row) => (
                  <tr
                    key={row.bulan}
                    className={`hover:bg-blue-50/40 transition-colors ${
                      row.bulan === 'Sep' ? 'bg-blue-50/30 font-semibold' : ''
                    }`}
                  >
                    <td className="py-2 px-3 font-mono font-bold text-slate-900">
                      {row.bulan} {row.bulan === 'Sep' && <span className="text-[9px] text-blue-600 font-bold ml-1">(Posisi Data)</span>}
                    </td>

                    <td className="py-2 px-3 text-center font-mono text-slate-600">
                      {row.targetFisik}%
                    </td>

                    <td className="py-2 px-3 text-center font-mono font-bold text-emerald-800">
                      {row.realisasiFisik !== null ? `${row.realisasiFisik}%` : '-'}
                    </td>

                    <td className="py-2 px-3 text-center font-mono font-bold">
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] ${
                          row.deviasi.startsWith('+')
                            ? 'bg-emerald-100 text-emerald-800'
                            : row.deviasi.startsWith('-')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {row.deviasi}
                      </span>
                    </td>

                    <td className="py-2 px-3 text-center font-mono text-purple-700 font-medium">
                      {row.keuangan !== null ? `${row.keuangan}%` : '-'}
                    </td>

                    <td className="py-2 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[9.5px] font-bold font-mono ${
                          row.status === 'Ahead'
                            ? 'bg-emerald-100 text-emerald-800'
                            : row.status === 'On Track'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>

                    <td className="py-2 px-3 text-[11px] text-slate-600 max-w-xs">
                      {row.catatan}
                    </td>

                    <td className="py-2 px-3 font-mono text-[9.5px] text-slate-500 whitespace-nowrap">
                      {row.realisasiFisik !== null ? (
                        <span className="text-emerald-700 font-bold">
                          PRGRS_PEK (Data 4 &amp; 6)
                        </span>
                      ) : (
                        <span className="text-blue-700 font-bold">
                          VOL_PEK (Data 4 &amp; 6)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PEMETAAN ATRIBUT DATA PDF SATU DATA TERVERIFIKASI              */}
        {/* ============================================================== */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold uppercase tracking-wide text-slate-700 font-mono text-[10px] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>PEMETAAN SUMBER DATASET &amp; ATRIBUT RESMI BUKU SATU DATA BP BATAM:</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              Terverifikasi Sesuai File PDF
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px]">
            {/* Card 1: Data No. 4 */}
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Dit. Pembangunan Infrastruktur</span>
                <span className="font-mono text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">
                  Data No. 4 (Hal. 49-50)
                </span>
              </div>
              <p className="text-slate-600 text-[10.5px]">
                <strong>Nama Data:</strong> <em>Laporan Progres Pekerjaan Kontruksi Tahun Berjalan</em>
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                <strong>Atribut:</strong> <code>PRGRS_PEK</code>, <code>VOL_PEK</code>, <code>KD_ANGG</code>, <code>NAMOBJ</code>, <code>TGL_MUL</code>, <code>TGL_SEL</code>, <code>KTGR_PEK</code>, <code>JNS_PEK</code>, <code>NM_PPK</code>, <code>NPAGU_F</code>, <code>NHPS_S</code>, <code>NKON_S</code>, <code>SUPERVISI</code>, <code>KENDALA</code>, <code>SUBDIT</code>.
              </div>
            </div>

            {/* Card 2: Data No. 6 */}
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Dit. Pembangunan Infrastruktur</span>
                <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                  Data No. 6 (Hal. 50-51)
                </span>
              </div>
              <p className="text-slate-600 text-[10.5px]">
                <strong>Nama Data:</strong> <em>Pembangunan Infrastruktur BP Batam (14 Proyek Fisik)</em>
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                <strong>Atribut:</strong> <code>PRGRS_PEK</code>, <code>VOL_PEK</code>, <code>KD_ANGG</code>, <code>TH_MUL</code>, <code>TH_SEL</code>, <code>KTGR_PEK</code>, <code>JNS_PEK</code>, <code>NM_PPK</code>, <code>NPAGU_F</code>, <code>NKON_F</code>, <code>KONTRAKTOR</code>, <code>SUPERVISI</code>, <code>KENDALA</code>, <code>SUBDIT</code>.
              </div>
            </div>

            {/* Card 3: Biro Keuangan */}
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Biro Keuangan BP Batam</span>
                <span className="font-mono text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded">
                  Data No. 1 &amp; 12 (Hal. 2, 4)
                </span>
              </div>
              <p className="text-slate-600 text-[10.5px]">
                <strong>Nama Data:</strong> <em>Persentase Realisasi Belanja &amp; LRA (SP2D Kas)</em>
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                <strong>Atribut:</strong> <code>REALISASI</code>, <code>ANGGARAN</code>, <code>PERSENTASE</code>, <code>TAHUN</code>, <code>TRIWULAN</code>, <code>% YTD CAPAIAN BELANJA</code>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
