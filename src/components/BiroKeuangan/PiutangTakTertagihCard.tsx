import React, { useState, useMemo } from 'react';
import {
  Download,
  Search,
  Table as TableIcon,
  BarChart3,
  AlertCircle,
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
import {
  PIUTANG_TAK_TERTAGIH_DATA,
  PiutangTakTertagihItem,
} from './keuanganData';
import { KeuanganVisualHeader } from './KeuanganVisualHeader';

interface PiutangTakTertagihCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PiutangTakTertagihCard: React.FC<PiutangTakTertagihCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    let list = PIUTANG_TAK_TERTAGIH_DATA;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.namaPelanggan.toLowerCase().includes(q) ||
          item.nomorFaktur.toLowerCase().includes(q) ||
          item.unitLayanan.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery]);

  const totalPiutangMacet = useMemo(() => {
    return filteredItems.reduce(
      (acc, item) => acc + item.saldoPiutangTakTertagih,
      0
    );
  }, [filteredItems]);

  const formatMiliar = (val: number) => {
    return `Rp ${(val / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
  };

  const chartData = useMemo(() => {
    return filteredItems.map((item) => ({
      name:
        item.namaPelanggan.length > 20
          ? item.namaPelanggan.substring(0, 18) + '...'
          : item.namaPelanggan,
      fullName: item.namaPelanggan,
      saldoMiliar: Math.round(item.saldoPiutangTakTertagih / 1e9),
      saldoExact: item.saldoPiutangTakTertagih,
      faktur: item.nomorFaktur,
      tglJatuhTempo: item.tanggalJatuhTempo,
    }));
  }, [filteredItems]);

  const handleExportCsv = () => {
    const headers = [
      'Nama Debitur / Pelanggan',
      'Nomor Faktur',
      'Tanggal Jatuh Tempo',
      'Saldo Piutang Tak Tertagih (Rp)',
    ];
    const rows = filteredItems.map((item) => [
      `"${item.namaPelanggan}"`,
      `"${item.nomorFaktur}"`,
      `"${item.tanggalJatuhTempo}"`,
      item.saldoPiutangTakTertagih,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'REKAPITULASI_PIUTANG_TAK_TERTAGIH_BP_BATAM.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Standard Header */}
      <div className="p-4 pb-0">
        <KeuanganVisualHeader
          datasetNumber={20}
          pdfPages="Hal. 5"
          classification="TERTUTUP"
          periode="PERTAHUN / JIKA UPDATE"
          title="REKAPITULASI PIUTANG TAK TERTAGIH"
          visualName="Bar Chart Peringkat Debitur &amp; Tabel Monitoring Piutang Tak Tertagih"
          attributes={[
            'NAMA DEBITUR',
            'NOMOR FAKTUR',
            'JATUH TEMPO',
            'SALDO PIUTANG',
          ]}
          onOpenFormula={() =>
            onOpenFormulaModal && onOpenFormulaModal('piutang_tak_tertagih')
          }
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* View Switcher */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('chart')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'chart'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Grafik Debitur</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'table'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Tabel Piutang</span>
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

      {/* KPI Highlights: Only TOTAL PIUTANG TAK TERTAGIH per user request */}
      <div className="p-3 bg-slate-50/70 border-b border-slate-200">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                Total Piutang Tak Tertagih
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                Penyisihan 100%
              </span>
            </div>
            <div className="text-xl font-bold text-rose-700 mt-0.5">
              {formatMiliar(totalPiutangMacet)}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              Rp {totalPiutangMacet.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-700 block">
              {filteredItems.length} Berkas Debitur
            </span>
            <span className="text-[11px] text-slate-500">
              Dokumen Buku Satu Data Hal. 5 Item 20
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3.5 space-y-3">
        {viewMode === 'chart' ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800">
                Peringkat Debitur dengan Piutang Tak Tertagih Terbesar (Miliar Rupiah)
              </span>
              <span className="text-[10.5px] font-mono text-slate-500">
                Total {filteredItems.length} Debitur
              </span>
            </div>

            <div className="h-[270px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tick={{ fill: '#64748B', fontSize: 10.5 }} unit=" M" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: '#334155', fontSize: 11, fontWeight: 500 }}
                    width={130}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, name: any, item: any) => [
                      `Rp ${Number(item.payload.saldoExact).toLocaleString('id-ID')}`,
                      `Faktur: ${item.payload.faktur} (JT: ${item.payload.tglJatuhTempo})`,
                    ]}
                  />
                  <Bar dataKey="saldoMiliar" name="Saldo Piutang (Rp Miliar)" radius={[0, 4, 4, 0]}>
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? '#BE123C' : index < 3 ? '#E11D48' : '#F43F5E'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          /* Table: Clean 4 attributes (STATUS PENYELESAIAN REMOVED per user request) */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Daftar Rincian Piutang Tak Tertagih
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari Debitur / Faktur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-52 sm:w-64"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto max-h-[340px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">Nama Debitur / Pelanggan</th>
                      <th className="py-2.5 px-3">Nomor Faktur</th>
                      <th className="py-2.5 px-3">Tanggal Jatuh Tempo</th>
                      <th className="py-2.5 px-3 text-right">Saldo Piutang (Rp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-sans font-bold text-slate-900">
                          {item.namaPelanggan}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{item.nomorFaktur}</td>
                        <td className="py-2.5 px-3 font-sans text-slate-700">
                          {item.tanggalJatuhTempo}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-rose-700">
                          Rp {item.saldoPiutangTakTertagih.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-100/90 font-bold border-t-2 border-slate-300">
                      <td className="py-2.5 px-3 font-sans">TOTAL PIUTANG TAK TERTAGIH</td>
                      <td className="py-2.5 px-3 font-sans text-slate-500" colSpan={2}>
                        {filteredItems.length} Berkas Perkara
                      </td>
                      <td className="py-2.5 px-3 text-right text-rose-800">
                        Rp {totalPiutangMacet.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          ⚖️ <strong>Tata Kelola Piutang Macet:</strong> Sesuai PMK Pengelolaan Piutang Instansi Pemerintah / BLU.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 5 Item 20</span>
      </div>
    </div>
  );
};
