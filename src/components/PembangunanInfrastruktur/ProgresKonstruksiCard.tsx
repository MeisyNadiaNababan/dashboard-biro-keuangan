import React, { useState } from 'react';
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  BarChart2,
  Table,
  HelpCircle,
  Activity,
  HardHat,
} from 'lucide-react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { DATASET_4_PROGRES_KONSTRUKSI } from './infrastrukturData';
import { LaporanProgresKonstruksiItem } from './types';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface ProgresKonstruksiCardProps {
  searchQuery?: string;
  statusFilter?: string;
  onOpenFormula?: (kpiType: 'kpi-pembangunan' | 'kpi-progres-fisik' | 'kpi-progres-keuangan' | 'kpi-kurva-s') => void;
}

export const ProgresKonstruksiCard: React.FC<ProgresKonstruksiCardProps> = ({
  searchQuery = '',
  statusFilter = 'Semua',
  onOpenFormula,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('table');
  const [activeTab, setActiveTab] = useState<'semua' | 'kritis' | 'on-track'>('semua');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState<string>('');

  const effectiveSearch = localSearch || searchQuery;

  // Filter items
  const items = DATASET_4_PROGRES_KONSTRUKSI.filter((item) => {
    const matchSearch =
      effectiveSearch === '' ||
      item.namaPaket.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      item.kontraktor.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      item.nomorKontrak.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      (item.kodeAnggaran && item.kodeAnggaran.toLowerCase().includes(effectiveSearch.toLowerCase()));

    const matchStatus =
      statusFilter === 'Semua' ||
      item.statusKurvaS === statusFilter;

    const matchTab =
      activeTab === 'semua' ||
      (activeTab === 'kritis' && (item.statusKurvaS === 'Kritis (SCM)' || item.statusKurvaS === 'Waspada')) ||
      (activeTab === 'on-track' && (item.statusKurvaS === 'Ahead' || item.statusKurvaS === 'On Schedule' || item.statusKurvaS === 'Selesai'));

    return matchSearch && matchStatus && matchTab;
  });

  const totalNilaiKontrak = DATASET_4_PROGRES_KONSTRUKSI.reduce(
    (sum, item) => sum + item.nilaiKontrakMiliar,
    0
  );
  const avgRealisasiFisik = (
    DATASET_4_PROGRES_KONSTRUKSI.reduce((sum, item) => sum + item.realisasiFisikPersen, 0) /
    DATASET_4_PROGRES_KONSTRUKSI.length
  ).toFixed(1);
  const avgRealisasiKeuangan = (
    DATASET_4_PROGRES_KONSTRUKSI.reduce((sum, item) => sum + item.realisasiKeuanganPersen, 0) /
    DATASET_4_PROGRES_KONSTRUKSI.length
  ).toFixed(1);

  // Prepare chart data
  const chartData = items.map((item) => {
    const shortLabel = item.namaPaket.length > 20
      ? `${item.namaPaket.slice(0, 18)}...`
      : item.namaPaket;

    return {
      id: item.id,
      label: shortLabel,
      fullLabel: item.namaPaket,
      kontraktor: item.kontraktor,
      nilaiKontrak: item.nilaiKontrakMiliar,
      rencanaFisik: item.rencanaFisikPersen,
      realisasiFisik: item.realisasiFisikPersen,
      realisasiKeuangan: item.realisasiKeuanganPersen,
      deviasi: item.deviasiFisikPersen,
      status: item.statusKurvaS,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs mb-4 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  DATASET NO. 4 & 6
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Laporan Progres Fisik Konstruksi & Keuangan Tahun Berjalan
                </h3>
              </div>
              <p className="text-[10.5px] text-slate-500">
                Atribut: KD_ANGG, NAMOBJ, NM_PPK, NPAGU_F, NKON_S, VOL_PEK, PRGRS_PEK, KENDALA, SUBDIT (Hal. 49-51)
              </p>
            </div>
          </div>
        </div>

        {/* View Controls & Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto text-xs">
          {/* Quick Filter Pill */}
          <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg text-[10.5px]">
            <button
              onClick={() => setActiveTab('semua')}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                activeTab === 'semua'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({DATASET_4_PROGRES_KONSTRUKSI.length})
            </button>
            <button
              onClick={() => setActiveTab('kritis')}
              className={`px-2 py-0.5 rounded font-medium transition-all flex items-center gap-0.5 ${
                activeTab === 'kritis'
                  ? 'bg-rose-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>SCM (1)</span>
            </button>
            <button
              onClick={() => setActiveTab('on-track')}
              className={`px-2 py-0.5 rounded font-medium transition-all flex items-center gap-0.5 ${
                activeTab === 'on-track'
                  ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>On-Track (5)</span>
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg text-[10.5px]">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-sky-800 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3 h-3" />
              <span>Tabel Rinci</span>
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                viewMode === 'chart'
                  ? 'bg-white text-sky-800 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-3 h-3" />
              <span>Grafik Dual-Axis</span>
            </button>
          </div>

          {/* Formula Trigger */}
          <button
            onClick={() => onOpenFormula && onOpenFormula('kpi-progres-fisik')}
            className="flex items-center gap-1 text-[10.5px] text-sky-700 hover:text-sky-900 font-semibold bg-sky-50 px-2 py-1 rounded border border-sky-200 transition-colors"
            title="Formula Progres Fisik"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Rumus</span>
          </button>
        </div>
      </div>

      {/* Mini Search & Summary Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari paket pekerjaan, PPK, kontraktor..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-600">
          <span>
            Total Kontrak: <strong className="font-mono text-slate-900">Rp {totalNilaiKontrak.toFixed(1)} M</strong>
          </span>
          <span>
            Rata-rata Fisik: <strong className="font-mono text-emerald-800">{avgRealisasiFisik}%</strong>
          </span>
          <span>
            Keuangan: <strong className="font-mono text-amber-800">{avgRealisasiKeuangan}%</strong>
          </span>
        </div>
      </div>

      {/* Content Area: Table View (Default, Compact) or Chart View */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase font-mono">
                <th className="py-2 px-2.5">KODE & NAMA PAKET (NAMOBJ)</th>
                <th className="py-2 px-2.5">PPK & KONTRAKTOR</th>
                <th className="py-2 px-2.5 text-right">KONTRAK (M)</th>
                <th className="py-2 px-2.5 text-center">RENCANA</th>
                <th className="py-2 px-2.5 text-center">REALISASI</th>
                <th className="py-2 px-2.5 text-center">DEVIASI</th>
                <th className="py-2 px-2.5 text-center">KEUANGAN</th>
                <th className="py-2 px-2.5 text-center">STATUS</th>
                <th className="py-2 px-2.5 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <tr
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className={`hover:bg-sky-50/40 cursor-pointer transition-colors ${
                      expandedId === item.id ? 'bg-sky-50/30' : ''
                    }`}
                  >
                    <td className="py-2 px-2.5 max-w-[220px]">
                      <span className="font-mono text-[9.5px] text-sky-800 block font-bold">
                        {item.kodeAnggaran || item.nomorKontrak}
                      </span>
                      <span className="font-semibold text-slate-900 block truncate" title={item.namaPaket}>
                        {item.namaPaket}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        Vol: {item.volumePekerjaan || 'Spesifikasi Standar BP'}
                      </span>
                    </td>
                    <td className="py-2 px-2.5 max-w-[160px]">
                      <span className="font-medium text-slate-900 block truncate text-[10.5px]">
                        {item.satkerPPK}
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate">
                        {item.kontraktor}
                      </span>
                    </td>
                    <td className="py-2 px-2.5 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      Rp {item.nilaiKontrakMiliar.toFixed(1)} M
                    </td>
                    <td className="py-2 px-2.5 text-center font-mono text-slate-500 whitespace-nowrap">
                      {item.rencanaFisikPersen}%
                    </td>
                    <td className="py-2 px-2.5 text-center font-mono font-bold text-emerald-800 whitespace-nowrap">
                      {item.realisasiFisikPersen}%
                    </td>
                    <td className="py-2 px-2.5 text-center font-mono font-bold whitespace-nowrap">
                      <span
                        className={
                          item.deviasiFisikPersen >= 0
                            ? 'text-emerald-700'
                            : item.deviasiFisikPersen >= -5
                            ? 'text-amber-700'
                            : 'text-rose-700'
                        }
                      >
                        {item.deviasiFisikPersen > 0 ? `+${item.deviasiFisikPersen}%` : `${item.deviasiFisikPersen}%`}
                      </span>
                    </td>
                    <td className="py-2 px-2.5 text-center font-mono text-amber-800 whitespace-nowrap">
                      {item.realisasiKeuanganPersen}%
                    </td>
                    <td className="py-2 px-2.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-1.5 py-0.2 rounded text-[9.5px] font-semibold ${
                          item.statusKurvaS === 'Ahead'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.statusKurvaS === 'On Schedule'
                            ? 'bg-sky-50 text-sky-700 border border-sky-200'
                            : item.statusKurvaS === 'Waspada'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {item.statusKurvaS}
                      </span>
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <button className="text-slate-400 hover:text-sky-700 p-0.5">
                        {expandedId === item.id ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row Detail */}
                  {expandedId === item.id && (
                    <tr className="bg-slate-50/80">
                      <td colSpan={9} className="p-3 border-t border-slate-200">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10.5px]">
                          <div>
                            <span className="text-slate-500 block">Konsultan Supervisi:</span>
                            <span className="font-semibold text-slate-800">{item.konsultanSupervisi}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Jadwal Pelaksanaan:</span>
                            <span className="font-semibold text-slate-800 font-mono">
                              {item.tanggalMulai} s/d {item.targetSelesai} ({item.durasiHari} Hari)
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Sisa Waktu Kontrak:</span>
                            <span className="font-semibold text-slate-800 font-mono">{item.sisaHari} Hari Kalender</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Status Kritis / SCM:</span>
                            <span className="font-bold text-rose-700">{item.tingkatKritis}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-slate-500 block">Isu & Kendala Lapangan (KENDALA):</span>
                            <span className="font-medium text-slate-800">{item.isuKendala}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-slate-500 block">Tindak Lanjut / Instruksi Pimpinan:</span>
                            <span className="font-medium text-sky-800">{item.tindakLanjut}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Compact Dual-Axis Chart */
        <div className="space-y-2">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 35 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="label"
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                  tick={{ fill: '#475569', fontSize: 9.5 }}
                  height={35}
                />
                <YAxis
                  unit="%"
                  domain={[0, 100]}
                  tick={{ fill: '#64748B', fontSize: 9.5 }}
                />
                <Tooltip
                  formatter={(value: any, name: string) => {
                    if (name === 'realisasiKeuangan') return [`${value}%`, 'Keuangan'];
                    if (name === 'realisasiFisik') return [`${value}%`, 'Realisasi Fisik'];
                    if (name === 'rencanaFisik') return [`${value}%`, 'Target Fisik'];
                    return [value, name];
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      const d = payload[0].payload;
                      return `${d.fullLabel} (Rp ${d.nilaiKontrak} M - ${d.status})`;
                    }
                    return label;
                  }}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    color: '#FFF',
                    borderRadius: '6px',
                    fontSize: '10.5px',
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ fontSize: '10px', paddingBottom: '4px' }}
                  formatter={(val) => {
                    if (val === 'realisasiKeuangan') return 'Keuangan (%) - Batang';
                    if (val === 'realisasiFisik') return 'Fisik (%) - Garis Hijau';
                    if (val === 'rencanaFisik') return 'Target (%) - Dotted';
                    return val;
                  }}
                />
                <ReferenceLine y={80} stroke="#94A3B8" strokeDasharray="3 3" />
                <Bar
                  dataKey="realisasiKeuangan"
                  fill="#F59E0B"
                  radius={[3, 3, 0, 0]}
                  name="realisasiKeuangan"
                  barSize={24}
                />
                <Line
                  type="monotone"
                  dataKey="rencanaFisik"
                  stroke="#94A3B8"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  dot={{ r: 2 }}
                  name="rencanaFisik"
                />
                <Line
                  type="monotone"
                  dataKey="realisasiFisik"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ r: 3.5, fill: '#059669' }}
                  name="realisasiFisik"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
