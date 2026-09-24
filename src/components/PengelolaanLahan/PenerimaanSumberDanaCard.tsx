import React, { useState, useMemo } from 'react';
import {
  Wallet,
  Download,
  Search,
  CheckCircle2,
  Building2,
  Table as TableIcon,
  BarChart3,
  TrendingUp,
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
import { PENERIMAAN_SUMBER_DANA_DATA, PenerimaanSumberDanaItem } from './bluFinancialData';
import { LahanVisualHeader } from './LahanVisualHeader';

interface PenerimaanSumberDanaCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

type ViewMode = 'sumber' | 'unit' | 'table';

const DANA_COLORS = ['#0284C7', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#06B6D4', '#8B5CF6', '#14B8A6'];

export const PenerimaanSumberDanaCard: React.FC<PenerimaanSumberDanaCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('sumber');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    let list = PENERIMAAN_SUMBER_DANA_DATA;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.sumberDana.toLowerCase().includes(q) ||
          d.unitKerja.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery]);

  // Aggregate by Sumber Dana
  const sumberDanaAgg = useMemo(() => {
    const map = new Map<string, { nilai: number; target: number }>();
    PENERIMAAN_SUMBER_DANA_DATA.forEach((item) => {
      const existing = map.get(item.sumberDana) || { nilai: 0, target: 0 };
      map.set(item.sumberDana, {
        nilai: existing.nilai + item.nilai,
        target: existing.target + item.targetNilai,
      });
    });
    return Array.from(map.entries()).map(([sumber, val], idx) => ({
      name: sumber,
      nilai: Number(val.nilai.toFixed(1)),
      target: Number(val.target.toFixed(1)),
      capaian: Number(((val.nilai / val.target) * 100).toFixed(2)),
      color: DANA_COLORS[idx % DANA_COLORS.length],
    }));
  }, []);

  // Aggregate by Unit Kerja
  const unitKerjaData = useMemo(() => {
    return filteredData.map((item, idx) => ({
      name: item.unitKerja.length > 22 ? item.unitKerja.substring(0, 20) + '...' : item.unitKerja,
      fullName: item.unitKerja,
      sumber: item.sumberDana,
      nilai: item.nilai,
      target: item.targetNilai,
      capaian: item.capaian,
      color: DANA_COLORS[idx % DANA_COLORS.length],
    }));
  }, [filteredData]);

  const totalPenerimaan = useMemo(
    () => PENERIMAAN_SUMBER_DANA_DATA.reduce((acc, d) => acc + d.nilai, 0),
    []
  );
  const totalTarget = useMemo(
    () => PENERIMAAN_SUMBER_DANA_DATA.reduce((acc, d) => acc + d.targetNilai, 0),
    []
  );

  const handleExportCsv = () => {
    const headers = ['Sumber Dana', 'Unit Kerja', 'Tanggal Rekap Awal', 'Tanggal Rekap Akhir', 'Nilai (Rp Miliar)', 'Target (Rp Miliar)', 'Capaian (%)'];
    const rows = filteredData.map((d) => [
      `"${d.sumberDana}"`,
      `"${d.unitKerja}"`,
      `"${d.tanggalRekapAwal}"`,
      `"${d.tanggalRekapAkhir}"`,
      d.nilai,
      d.targetNilai,
      d.capaian,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Penerimaan_Sumber_Dana_BP_Batam.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header Visualisasi Terstandarisasi */}
      <div className="p-4 pb-0">
        <LahanVisualHeader
          datasetNumber={14}
          pdfPages="Hal. 4 Item 14"
          classification="TERTUTUP"
          periode="PERBULAN (TW II 2026)"
          title="LAPORAN PENERIMAAN SUMBER DANA"
          visualName="Grafik Batang Aliran Penerimaan Berdasarkan Sumber Dana &amp; Unit Kerja Penghasil"
          attributes={[
            'SUMBER DANA',
            'UNIT KERJA',
            'TANGGAL REKAP AWAL',
            'TANGGAL REKAP AKHIR',
            'NILAI',
          ]}
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('penerimaan_sumber_dana')}
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Sheet Swap Controls */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('sumber')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'sumber'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Per Sumber Dana
                </button>
                <button
                  onClick={() => setViewMode('unit')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'unit'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Per Unit Kerja
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
                  <span>Tabel Rincian</span>
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
          <div className="text-[10px] text-slate-500 font-medium">Total Penerimaan Masuk</div>
          <div className="text-base font-bold text-sky-700">
            Rp {totalPenerimaan.toLocaleString('id-ID', { maximumFractionDigits: 1 })} Miliar
          </div>
          <div className="text-[10px] text-emerald-600 font-mono">
            {((totalPenerimaan / totalTarget) * 100).toFixed(2)}% dari Target Rp {totalTarget.toLocaleString('id-ID')} M
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Sumber Dana Terbesar</div>
          <div className="text-base font-bold text-slate-900">PNBP Jasa Layanan</div>
          <div className="text-[10px] text-slate-500">Porsi 84,6% Penerimaan Total</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Rupiah Murni (APBN)</div>
          <div className="text-base font-bold text-slate-900">Rp 185,0 Miliar</div>
          <div className="text-[10px] text-slate-500">Infrastruktur Strategis</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 font-medium">Pengelolaan Kas BLU</div>
          <div className="text-base font-bold text-teal-700">Rp 48,2 Miliar</div>
          <div className="text-[10px] text-teal-600">Capaian 56,7% Target</div>
        </div>
      </div>

      {/* Main Visual */}
      <div className="p-3.5 space-y-3">
        {viewMode === 'table' ? (
          /* Table View */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Tabel Rincian Penerimaan Berdasarkan Sumber Dana &amp; Unit Kerja
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari sumber dana atau unit kerja..."
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
                    <th className="py-2.5 px-3">Sumber Dana</th>
                    <th className="py-2.5 px-3">Unit Kerja Penghasil</th>
                    <th className="py-2.5 px-3">Periode Rekap</th>
                    <th className="py-2.5 px-3 text-right">Nilai (Rp M)</th>
                    <th className="py-2.5 px-3 text-right">Target (Rp M)</th>
                    <th className="py-2.5 px-3 text-right">% Capaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredData.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/80 transition-colors font-sans">
                      <td className="py-2 px-3 font-semibold text-slate-900">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                          {d.sumberDana}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-700 font-medium">{d.unitKerja}</td>
                      <td className="py-2 px-3 text-slate-500 text-[10.5px]">
                        {d.tanggalRekapAwal} s.d {d.tanggalRekapAkhir}
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-sky-700 font-mono">
                        Rp {d.nilai.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                      </td>
                      <td className="py-2 px-3 text-right text-slate-500 font-mono">
                        Rp {d.targetNilai.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-emerald-700 font-mono">
                        {d.capaian.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Bar Chart View */
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800">
                {viewMode === 'sumber'
                  ? 'Grafik Batang: Komposisi Realisasi Penerimaan per Sumber Dana (Rp Miliar)'
                  : 'Grafik Batang: Aliran Penerimaan Berdasarkan Unit Kerja Penghasil (Rp Miliar)'}
              </span>
              <span className="text-[10.5px] font-mono text-slate-500">Unit: Rp Miliar</span>
            </div>

            <div className="h-[260px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={viewMode === 'sumber' ? sumberDanaAgg : unitKerjaData}
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
                    formatter={(val: any) => [`Rp ${Number(val).toLocaleString('id-ID')} Miliar`, 'Realisasi Penerimaan']}
                  />
                  <Bar dataKey="nilai" radius={[4, 4, 0, 0]} maxBarSize={45}>
                    {(viewMode === 'sumber' ? sumberDanaAgg : unitKerjaData).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Ketentuan Sumber Pendanaan:</strong> Mengelompokkan seluruh arus dana masuk berdasarkan sumber otorisasi anggaran negara &amp; PNBP BLU.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 4 Item 14</span>
      </div>
    </div>
  );
};
