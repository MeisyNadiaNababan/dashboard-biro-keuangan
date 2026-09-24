import React, { useState, useMemo } from 'react';
import {
  FileWarning,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Table as TableIcon,
  BarChart3,
  Filter,
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
  Legend,
} from 'recharts';
import { PIUTANG_TAK_TERTAGIH_DATA, PiutangTakTertagihItem } from './bluFinancialData';
import { LahanVisualHeader } from './LahanVisualHeader';

interface PiutangTakTertagihCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

type PiutangFilterMode = 'all' | 'kpknl' | 'restrukturisasi' | 'table';

export const PiutangTakTertagihCard: React.FC<PiutangTakTertagihCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [filterMode, setFilterMode] = useState<PiutangFilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let list = PIUTANG_TAK_TERTAGIH_DATA;
    if (filterMode === 'kpknl') {
      list = list.filter((i) => i.statusPenyelesaian === 'Penyelidikan PUPN/KPKNL');
    } else if (filterMode === 'restrukturisasi') {
      list = list.filter((i) => i.statusPenyelesaian === 'Restrukturisasi Pembayaran' || i.statusPenyelesaian === 'Verifikasi BPKP');
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.namaPelanggan.toLowerCase().includes(q) ||
          i.nomorFaktur.toLowerCase().includes(q) ||
          i.statusPenyelesaian.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filterMode, searchQuery]);

  const totalSaldo = useMemo(
    () => PIUTANG_TAK_TERTAGIH_DATA.reduce((acc, i) => acc + i.saldoPiutangTakTertagih, 0),
    []
  );
  const totalKpknl = useMemo(
    () => PIUTANG_TAK_TERTAGIH_DATA.reduce((acc, i) => acc + i.jumlahPiutangKoreksiKpknl, 0),
    []
  );
  const totalDenda = useMemo(
    () => PIUTANG_TAK_TERTAGIH_DATA.reduce((acc, i) => acc + i.perhitunganDenda, 0),
    []
  );

  const chartData = useMemo(() => {
    return filteredItems.map((item) => ({
      name: item.namaPelanggan.length > 20 ? item.namaPelanggan.substring(0, 18) + '...' : item.namaPelanggan,
      fullName: item.namaPelanggan,
      faktur: item.nomorFaktur,
      saldoJuta: Number((item.saldoPiutangTakTertagih / 1e6).toFixed(0)),
      kpknlJuta: Number((item.jumlahPiutangKoreksiKpknl / 1e6).toFixed(0)),
      dendaJuta: Number((item.perhitunganDenda / 1e6).toFixed(0)),
      status: item.statusPenyelesaian,
    }));
  }, [filteredItems]);

  const handleExportCsv = () => {
    const headers = [
      'Nomor Faktur',
      'Tanggal Terbit Faktur',
      'Nama Pelanggan',
      'Tanggal Jatuh Tempo',
      'Piutang Koreksi KPKNL (Rp)',
      'Denda (Rp)',
      'Bayar Faktur (Rp)',
      'Saldo Piutang Tak Tertagih (Rp)',
      'Status Penyelesaian',
      'Umur Piutang',
    ];
    const rows = filteredItems.map((d) => [
      `"${d.nomorFaktur}"`,
      `"${d.tanggalTerbitFaktur}"`,
      `"${d.namaPelanggan}"`,
      `"${d.tanggalJatuhTempo}"`,
      d.jumlahPiutangKoreksiKpknl,
      d.perhitunganDenda,
      d.bayarFaktur,
      d.saldoPiutangTakTertagih,
      `"${d.statusPenyelesaian}"`,
      `"${d.umurPiutang}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Rekapitulasi_Piutang_Tak_Tertagih_BP_Batam.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header Visualisasi Terstandarisasi */}
      <div className="p-4 pb-0">
        <LahanVisualHeader
          datasetNumber={20}
          pdfPages="Hal. 5 Item 20"
          classification="TERTUTUP"
          periode="PERTAHUN (AUDITED)"
          title="REKAPITULASI PIUTANG TAK TERTAGIH"
          visualName="Grafik Batang Saldo Piutang Macet per Pelanggan &amp; Pengurusan PUPN/KPKNL"
          attributes={[
            'NOMOR FAKTUR',
            'NAMA PELANGGAN',
            'TANGGAL JATUH TEMPO',
            'KOREKSI KPKNL',
            'SALDO PIUTANG TAK TERTAGIH',
          ]}
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('piutang_tak_tertagih')}
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Sheet Swap Controls */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    filterMode === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua Piutang
                </button>
                <button
                  onClick={() => setFilterMode('kpknl')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    filterMode === 'kpknl'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dalam KPKNL
                </button>
                <button
                  onClick={() => setFilterMode('restrukturisasi')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    filterMode === 'restrukturisasi'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Restrukturisasi
                </button>
                <button
                  onClick={() => setFilterMode('table')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    filterMode === 'table'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Tabel Faktur</span>
                </button>
              </div>

              {/* CSV */}
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
          <div className="text-[10px] text-slate-500 font-medium">Total Piutang Tak Tertagih</div>
          <div className="text-base font-bold text-rose-700">
            Rp {(totalSaldo / 1e9).toFixed(2)} Miliar
          </div>
          <div className="text-[10px] text-rose-600">{PIUTANG_TAK_TERTAGIH_DATA.length} Faktur Macet Teridentifikasi</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Diserahkan ke KPKNL / PUPN</div>
          <div className="text-base font-bold text-amber-700">
            Rp {(totalKpknl / 1e9).toFixed(2)} Miliar
          </div>
          <div className="text-[10px] text-slate-500">Proses Penagihan Paksa Negara</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Akumulasi Denda Berjalan</div>
          <div className="text-base font-bold text-slate-900">
            Rp {(totalDenda / 1e6).toFixed(1)} Juta
          </div>
          <div className="text-[10px] text-slate-500">Sesuai Ketentuan PMK Piutang</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Umur Piutang Terlama</div>
          <div className="text-base font-bold text-slate-900">&gt; 5 Tahun</div>
          <div className="text-[10px] text-slate-500">Usulan Hapus Tagih Bersyarat</div>
        </div>
      </div>

      {/* Main Section */}
      <div className="p-3.5 space-y-3">
        {filterMode === 'table' ? (
          /* Table View */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Tabel Rincian Faktur Piutang Tak Tertagih
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari faktur atau pelanggan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-52 sm:w-60"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto max-h-[320px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">Nomor Faktur</th>
                      <th className="py-2.5 px-3">Nama Pelanggan / Debitur</th>
                      <th className="py-2.5 px-3">Jatuh Tempo</th>
                      <th className="py-2.5 px-3 text-right">Koreksi KPKNL (Rp)</th>
                      <th className="py-2.5 px-3 text-right">Denda (Rp)</th>
                      <th className="py-2.5 px-3 text-right">Saldo Piutang (Rp)</th>
                      <th className="py-2.5 px-3">Status Pengurusan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {filteredItems.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors font-sans">
                        <td className="py-2 px-3 font-mono font-semibold text-slate-900 whitespace-nowrap">
                          {row.nomorFaktur}
                        </td>
                        <td className="py-2 px-3 font-medium text-slate-800 max-w-xs">
                          <div>{row.namaPelanggan}</div>
                          <div className="text-[10px] text-slate-500">{row.umurPiutang}</div>
                        </td>
                        <td className="py-2 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                          {row.tanggalJatuhTempo}
                        </td>
                        <td className="py-2 px-3 text-right text-slate-700 font-mono">
                          {row.jumlahPiutangKoreksiKpknl.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2 px-3 text-right text-amber-700 font-mono">
                          {row.perhitunganDenda.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-rose-700 font-mono">
                          Rp {row.saldoPiutangTakTertagih.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2 px-3">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                              row.statusPenyelesaian === 'Penyelidikan PUPN/KPKNL'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : row.statusPenyelesaian === 'Restrukturisasi Pembayaran'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {row.statusPenyelesaian}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Bar Chart View */
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800">
                Grafik Batang: Saldo Piutang Tak Tertagih vs Nilai Koreksi KPKNL (Juta Rupiah)
              </span>
              <span className="text-[10.5px] font-mono text-slate-500">Unit: Juta Rupiah</span>
            </div>

            <div className="h-[260px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 15, right: 20, left: 10, bottom: 35 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    interval={0}
                    angle={-14}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fill: '#64748B', fontSize: 10.5 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(val: any, name: any) => [
                      `Rp ${Number(val).toLocaleString('id-ID')} Juta`,
                      name === 'saldoJuta' ? 'Saldo Piutang Tak Tertagih' : 'Koreksi KPKNL',
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    height={28}
                    formatter={(val) => (
                      <span className="text-xs font-semibold text-slate-700">
                        {val === 'saldoJuta' ? 'Saldo Piutang Macet' : 'Koreksi KPKNL'}
                      </span>
                    )}
                  />
                  <Bar dataKey="saldoJuta" fill="#E11D48" radius={[4, 4, 0, 0]} maxBarSize={30} />
                  <Bar dataKey="kpknlJuta" fill="#F59E0B" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Ketentuan PMK No. 240/PMK.06/2016:</strong> Pengurusan Piutang Instansi Pemerintah yang tidak dapat diselesaikan diserahkan kepada Panitia Urusan Piutang Negara (PUPN) / KPKNL.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 5 Item 20</span>
      </div>
    </div>
  );
};
