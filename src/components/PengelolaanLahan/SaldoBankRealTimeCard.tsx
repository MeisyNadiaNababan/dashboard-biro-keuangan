import React, { useState, useMemo } from 'react';
import {
  Landmark,
  Download,
  CreditCard,
  Building,
  RefreshCw,
  Search,
  CheckCircle2,
  Table as TableIcon,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { SALDO_BANK_REALTIME_DATA, SaldoBankRealTimeItem } from './bluFinancialData';
import { LahanVisualHeader } from './LahanVisualHeader';

interface SaldoBankRealTimeCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

const BANK_COLORS = ['#0284C7', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#06B6D4'];

export const SaldoBankRealTimeCard: React.FC<SaldoBankRealTimeCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState('23 Sep 2026 15:00 WIB');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastRefreshed(
        now.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }) +
          ' ' +
          now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
          ' WIB'
      );
    }, 600);
  };

  const filteredBanks = useMemo(() => {
    let list = SALDO_BANK_REALTIME_DATA;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (b) =>
          b.namaBank.toLowerCase().includes(q) ||
          b.nomorRekening.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery]);

  const totalSaldo = useMemo(
    () => SALDO_BANK_REALTIME_DATA.reduce((acc, b) => acc + b.nilaiSaldo, 0),
    []
  );

  const pieChartData = useMemo(() => {
    return SALDO_BANK_REALTIME_DATA.map((b, idx) => ({
      name: b.namaBank.replace(' (Persero) Tbk', '').replace(' Tbk', ''),
      fullName: b.namaBank,
      nomorRekening: b.nomorRekening,
      value: b.nilaiSaldo,
      color: BANK_COLORS[idx % BANK_COLORS.length],
    }));
  }, []);

  const handleExportCsv = () => {
    const headers = ['Nama Bank', 'Nomor Rekening', 'Nilai Saldo (Rp)'];
    const rows = filteredBanks.map((b) => [`"${b.namaBank}"`, `"${b.nomorRekening}"`, b.nilaiSaldo]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Saldo_Bank_Real_Time_BP_Batam.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header Visualisasi Terstandarisasi */}
      <div className="p-4 pb-0">
        <LahanVisualHeader
          datasetNumber={13}
          pdfPages="Hal. 4 Item 13"
          classification="TERTUTUP"
          periode="REAL TIME"
          title="LAPORAN SALDO BANK REAL TIME"
          visualName="Donut Chart Distribusi Saldo Kas &amp; Bank serta Rincian Akun Rekening"
          attributes={[
            'NAMA BANK',
            'NOMOR REKENING',
            'NILAI SALDO',
          ]}
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('saldo_bank_realtime')}
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Refresh Real Time */}
              <button
                onClick={handleRefresh}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Sinkronisasi Saldo Real Time"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              {/* View toggle */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('chart')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === 'chart'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <PieChartIcon className="w-3.5 h-3.5" />
                  <span>Donut &amp; Kartu</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === 'table'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Tabel Rekening</span>
                </button>
              </div>

              {/* CSV */}
              <button
                onClick={handleExportCsv}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Unduh CSV Saldo Bank"
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
          <div className="text-[10px] text-slate-500 font-medium">Total Saldo Bank Konsolidasi</div>
          <div className="text-base font-bold text-sky-700">
            Rp {(totalSaldo / 1e12).toFixed(3)} Triliun
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Rp {(totalSaldo / 1e9).toLocaleString('id-ID', { maximumFractionDigits: 1 })} Miliar
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Bank Mitra Pengelola</div>
          <div className="text-base font-bold text-slate-900">{SALDO_BANK_REALTIME_DATA.length} Bank</div>
          <div className="text-[10px] text-emerald-600 font-medium">Mandiri, BRI, BNI, BTN, BRKS, BCA</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Porsi Terbesar (Market Share)</div>
          <div className="text-base font-bold text-slate-900">Bank Mandiri (35,2%)</div>
          <div className="text-[10px] text-slate-500 font-mono">Rp 524,35 Miliar</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Status Pembaruan Data</div>
          <div className="text-base font-bold text-emerald-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Terhubung API Host-to-Host</span>
          </div>
          <div className="text-[10px] text-slate-500 truncate">{lastRefreshed}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3.5 space-y-3">
        {viewMode === 'table' ? (
          /* Table View displaying strictly the requested concise attributes: NAMA BANK, NOMOR REKENING, NILAI SALDO */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Tabel Saldo Rekening Bank Real Time BP Batam
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari bank atau nomor rekening..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-52 sm:w-60"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Nama Bank</th>
                    <th className="py-2.5 px-3">Nomor Rekening</th>
                    <th className="py-2.5 px-3 text-right">Nilai Saldo (Rp)</th>
                    <th className="py-2.5 px-3 text-right">Porsi Saldo (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredBanks.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors font-sans">
                      <td className="py-2.5 px-3 font-semibold text-slate-900 flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-sky-600" />
                        <span>{b.namaBank}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-700 font-medium">
                        {b.nomorRekening}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-sky-700 font-mono text-sm">
                        Rp {b.nilaiSaldo.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-700 font-mono font-bold">
                        {b.persentaseShare?.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Donut Chart + Clean Cards */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            {/* Donut Chart */}
            <div className="lg:col-span-6 h-[250px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <div className="text-[11px] font-semibold text-slate-700 mb-1 px-1">
                Komposisi Saldo per Bank Mitra
              </div>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(val: any, name: any, item: any) => [
                      `Rp ${Number(val).toLocaleString('id-ID')}`,
                      item.payload.fullName,
                    ]}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Concise Cards List: strictly showing NAMA BANK, NOMOR REKENING, NILAI SALDO */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SALDO_BANK_REALTIME_DATA.map((b, idx) => (
                <div
                  key={b.id}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-800 truncate" title={b.namaBank}>
                      {b.namaBank.replace(' (Persero) Tbk', '').replace(' Tbk', '')}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: BANK_COLORS[idx % BANK_COLORS.length] }}
                    />
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mb-1.5 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 flex items-center justify-between">
                    <span>No. Rek:</span>
                    <span className="font-semibold text-slate-700">{b.nomorRekening}</span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-slate-100 pt-1">
                    <span className="text-[10px] text-slate-400">Saldo:</span>
                    <span className="text-xs font-bold text-sky-700 font-mono">
                      Rp {(b.nilaiSaldo / 1e9).toFixed(2)} Miliar
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Kas &amp; Rekening Penampung:</strong> Saldo tercatat secara real time terintegrasi dengan SPAN &amp; CMS Perbankan.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 4 Item 13</span>
      </div>
    </div>
  );
};
