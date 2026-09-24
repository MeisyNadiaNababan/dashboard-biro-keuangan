import React, { useState, useMemo } from 'react';
import {
  FileText,
  Layers,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Info,
  TrendingUp,
  Table as TableIcon,
  BarChart3,
  Search,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { REKAP_PENERBITAN_BARU_DATA, REKAP_PENERBITAN_PERUBAHAN_DATA } from './lahanData';
import { LahanVisualHeader } from './LahanVisualHeader';
import { LahanFilterState, RekapPermohonanItem } from './types';

interface SkptSpptSheetSwapCardProps {
  filters: LahanFilterState;
  onOpenFormulaModal?: (kpiId: string) => void;
}

type SheetMode = 'baru' | 'perubahan' | 'komparasi';

export const SkptSpptSheetSwapCard: React.FC<SkptSpptSheetSwapCardProps> = ({
  filters,
  onOpenFormulaModal,
}) => {
  const [sheetMode, setSheetMode] = useState<SheetMode>('perubahan'); // Defaults to user screenshot (Dataset #2)
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  // Filter raw datasets according to global filters
  const filterData = (data: RekapPermohonanItem[]) => {
    return data.filter((item) => {
      if (filters.tahun !== 'ALL' && item.tahun.toString() !== filters.tahun) return false;
      if (filters.jenisPemohon !== 'ALL' && item.jenisPemohon !== filters.jenisPemohon) return false;
      if (filters.status === 'DISETUJUI' && item.disetujui === 0) return false;
      if (filters.status === 'DITOLAK' && item.ditolak === 0) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchPemohon = item.jenisPemohon.toLowerCase().includes(query);
        const matchId = item.id.toString().includes(query);
        const matchBulan = item.bulan.toLowerCase().includes(query);
        if (!matchPemohon && !matchId && !matchBulan) return false;
      }
      return true;
    });
  };

  const filteredBaru = useMemo(() => filterData(REKAP_PENERBITAN_BARU_DATA), [filters]);
  const filteredPerubahan = useMemo(() => filterData(REKAP_PENERBITAN_PERUBAHAN_DATA), [filters]);

  // Aggregate by Jenis Pemohon
  const aggregateByPemohon = (data: RekapPermohonanItem[]) => {
    const map = new Map<string, { pemohon: string; disetujui: number; ditolak: number; total: number }>();
    data.forEach((item) => {
      const existing = map.get(item.jenisPemohon) || {
        pemohon: item.jenisPemohon,
        disetujui: 0,
        ditolak: 0,
        total: 0,
      };
      existing.disetujui += item.disetujui;
      existing.ditolak += item.ditolak;
      existing.total += item.jumlah;
      map.set(item.jenisPemohon, existing);
    });
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  };

  const aggBaru = useMemo(() => aggregateByPemohon(filteredBaru), [filteredBaru]);
  const aggPerubahan = useMemo(() => aggregateByPemohon(filteredPerubahan), [filteredPerubahan]);

  // Combined dataset for komparasi mode
  const aggKomparasi = useMemo(() => {
    const allPemohon = Array.from(new Set([...aggBaru.map((x) => x.pemohon), ...aggPerubahan.map((x) => x.pemohon)]));
    return allPemohon.map((pemohon) => {
      const b = aggBaru.find((x) => x.pemohon === pemohon) || { disetujui: 0, ditolak: 0, total: 0 };
      const p = aggPerubahan.find((x) => x.pemohon === pemohon) || { disetujui: 0, ditolak: 0, total: 0 };
      return {
        pemohon,
        baruDisetujui: b.disetujui,
        baruDitolak: b.ditolak,
        baruTotal: b.total,
        perubahanDisetujui: p.disetujui,
        perubahanDitolak: p.ditolak,
        perubahanTotal: p.total,
        totalSemua: b.total + p.total,
      };
    }).sort((a, b) => b.totalSemua - a.totalSemua);
  }, [aggBaru, aggPerubahan]);

  // Summary Metrics depending on active sheet mode
  const summary = useMemo(() => {
    if (sheetMode === 'baru') {
      const total = filteredBaru.reduce((acc, i) => acc + i.jumlah, 0);
      const disetujui = filteredBaru.reduce((acc, i) => acc + i.disetujui, 0);
      const ditolak = filteredBaru.reduce((acc, i) => acc + i.ditolak, 0);
      const rate = total > 0 ? ((disetujui / total) * 100).toFixed(1) : '0';
      return { total, disetujui, ditolak, rate, label: 'SKPT/SPPT Baru (Dataset #1)' };
    }
    if (sheetMode === 'perubahan') {
      const total = filteredPerubahan.reduce((acc, i) => acc + i.jumlah, 0);
      const disetujui = filteredPerubahan.reduce((acc, i) => acc + i.disetujui, 0);
      const ditolak = filteredPerubahan.reduce((acc, i) => acc + i.ditolak, 0);
      const rate = total > 0 ? ((disetujui / total) * 100).toFixed(1) : '0';
      return { total, disetujui, ditolak, rate, label: 'SKPT/SPPT Perubahan (Dataset #2)' };
    }
    const total = filteredBaru.reduce((acc, i) => acc + i.jumlah, 0) + filteredPerubahan.reduce((acc, i) => acc + i.jumlah, 0);
    const disetujui = filteredBaru.reduce((acc, i) => acc + i.disetujui, 0) + filteredPerubahan.reduce((acc, i) => acc + i.disetujui, 0);
    const ditolak = filteredBaru.reduce((acc, i) => acc + i.ditolak, 0) + filteredPerubahan.reduce((acc, i) => acc + i.ditolak, 0);
    const rate = total > 0 ? ((disetujui / total) * 100).toFixed(1) : '0';
    return { total, disetujui, ditolak, rate, label: 'Gabungan Baru & Perubahan' };
  }, [sheetMode, filteredBaru, filteredPerubahan]);

  const activeTableData = sheetMode === 'baru' ? filteredBaru : filteredPerubahan;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Standardized Header with LahanVisualHeader & Sheet Swap Tabs */}
      <div className="p-4 pb-0">
        <LahanVisualHeader
          datasetNumber={sheetMode === 'baru' ? 1 : sheetMode === 'perubahan' ? 2 : '1 & 2'}
          pdfPages="Hal. 6"
          classification="TERBUKA"
          periode="JIKA UPDATE"
          title={
            sheetMode === 'baru'
              ? 'REKAPITULASI PENERBITAN SURAT PERJANJIAN PENGELOLAAN TANAH (SKPT) DAN SURAT KEPUTUSAN PENGELOLAAN TANAH BARU'
              : sheetMode === 'perubahan'
              ? 'REKAPITULASI PENERBITAN SURAT PERJANJIAN PENGELOLAAN TANAH (SKPT) DAN SURAT KEPUTUSAN PENGELOLAAN TANAH PERUBAHAN'
              : 'KOMPARASI REKAPITULASI PENERBITAN SKPT & SPPT: BARU VS PERUBAHAN'
          }
          visualName={
            sheetMode === 'baru'
              ? 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Penerbitan Baru) & Tabel Detail'
              : sheetMode === 'perubahan'
              ? 'Grafik Batang Disetujui vs Ditolak per Jenis Pemohon (Penerbitan Perubahan) & Tabel Detail'
              : 'Grouped Bar Chart Komparasi Disetujui vs Ditolak per Jenis Pemohon & Matriks'
          }
          attributes={
            sheetMode === 'komparasi'
              ? ['JENIS PEMOHON', 'BARU DISETUJUI', 'BARU DITOLAK', 'PERUBAHAN DISETUJUI', 'PERUBAHAN DITOLAK', 'TOTAL']
              : ['JENIS PEMOHON', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'DISETUJUI', 'DITOLAK', 'JUMLAH']
          }
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('lahan_skpt_sppt')}
          rightControls={
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setSheetMode('baru')}
                  className={`px-3 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    sheetMode === 'baru'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #1: Baru
                </button>
                <button
                  onClick={() => setSheetMode('perubahan')}
                  className={`px-3 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    sheetMode === 'perubahan'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  DS #2: Perubahan
                </button>
                <button
                  onClick={() => setSheetMode('komparasi')}
                  className={`px-3 py-1 rounded-md text-xs transition-all cursor-pointer ${
                    sheetMode === 'komparasi'
                      ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Komparasi
                </button>
              </div>

              <div className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('chart')}
                  className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                    viewMode === 'chart' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Tampilan Grafik"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                    viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Tampilan Tabel Detail"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          }
        />
      </div>

      {/* Mini KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-100 text-xs">
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Total Permohonan</div>
          <div className="text-base font-bold text-slate-900">{summary.total.toLocaleString('id-ID')}</div>
          <div className="text-[10px] text-sky-700 font-medium truncate">{summary.label}</div>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Disetujui</div>
          <div className="text-base font-bold text-emerald-700">{summary.disetujui.toLocaleString('id-ID')}</div>
          <div className="text-[10px] text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Telah Diterbitkan</span>
          </div>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Ditolak / Dikembalikan</div>
          <div className="text-base font-bold text-rose-700">{summary.ditolak.toLocaleString('id-ID')}</div>
          <div className="text-[10px] text-rose-700 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            <span>Persyaratan Belum Lengkap</span>
          </div>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Tingkat Persetujuan</div>
          <div className="text-base font-bold text-amber-700">{summary.rate}%</div>
          <div className="text-[10px] text-amber-700 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Target: &gt; 80%</span>
          </div>
        </div>
      </div>

      {/* Main Content: Chart or Table */}
      <div className="p-3.5 flex-1 min-h-[300px]">
        {viewMode === 'chart' ? (
          <div>
            <div className="text-xs text-slate-500 mb-2 flex items-center justify-between">
              <span>
                Visualisasi: <strong className="text-slate-800">Jumlah Permohonan Disetujui vs Ditolak</strong> per Jenis Pemohon
              </span>
              <span className="text-[11px] text-slate-500">Satuan: Berkas / Dokumen</span>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {sheetMode === 'komparasi' ? (
                  <BarChart data={aggKomparasi} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis
                      dataKey="pemohon"
                      tick={{ fill: '#64748B', fontSize: 10 }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                    />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E2E8F0',
                        borderRadius: '8px',
                        color: '#0F172A',
                        fontSize: '11px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="baruDisetujui" name="Baru: Disetujui" fill="#0284C7" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="baruDitolak" name="Baru: Ditolak" fill="#F87171" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="perubahanDisetujui" name="Perubahan: Disetujui" fill="#10B981" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="perubahanDitolak" name="Perubahan: Ditolak" fill="#FB923C" radius={[3, 3, 0, 0]} />
                  </BarChart>
                ) : (
                  <BarChart
                    data={sheetMode === 'baru' ? aggBaru : aggPerubahan}
                    margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis
                      dataKey="pemohon"
                      tick={{ fill: '#64748B', fontSize: 10 }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                    />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E2E8F0',
                        borderRadius: '8px',
                        color: '#0F172A',
                        fontSize: '11px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="disetujui" name="Disetujui" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ditolak" name="Ditolak" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          /* Table View matching the User's Screenshot */
          <div className="overflow-x-auto">
            <div className="text-xs text-slate-500 mb-2 flex items-center justify-between">
              <span>
                Data Tabel:{' '}
                <strong className="text-slate-800">
                  {sheetMode === 'baru' ? 'Dataset #1 (Baru)' : 'Dataset #2 (Perubahan - PDF Screenshot)'}
                </strong>{' '}
                ({activeTableData.length} entri)
              </span>
              <span className="text-[11px] text-emerald-700 font-mono">Status: Terverifikasi OCR</span>
            </div>
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="py-2 px-2.5 font-bold">_id</th>
                  <th className="py-2 px-2.5 font-bold">JENIS PEMOHON</th>
                  <th className="py-2 px-2.5 font-bold">TGL AWAL</th>
                  <th className="py-2 px-2.5 font-bold">TGL AKHIR</th>
                  <th className="py-2 px-2.5 font-bold text-right text-emerald-700">DISETUJUI</th>
                  <th className="py-2 px-2.5 font-bold text-right text-rose-700">DITOLAK</th>
                  <th className="py-2 px-2.5 font-bold text-right text-slate-800">JUMLAH</th>
                  <th className="py-2 px-2.5 font-bold text-center">% ACC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {activeTableData.slice(0, 10).map((row) => {
                  const rate = row.jumlah > 0 ? ((row.disetujui / row.jumlah) * 100).toFixed(0) : '0';
                  return (
                    <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2 px-2.5 font-mono text-slate-400">{row.id}</td>
                      <td className="py-2 px-2.5 font-medium text-slate-800">{row.jenisPemohon}</td>
                      <td className="py-2 px-2.5 font-mono text-slate-500">{row.tglAwal}</td>
                      <td className="py-2 px-2.5 font-mono text-slate-500">{row.tglAkhir}</td>
                      <td className="py-2 px-2.5 font-mono text-right text-emerald-700 font-bold">
                        {row.disetujui.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 px-2.5 font-mono text-right text-rose-700">
                        {row.ditolak.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 px-2.5 font-mono text-right text-slate-900 font-bold">
                        {row.jumlah.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 px-2.5 text-center">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            Number(rate) >= 80
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {rate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Insight */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Catatan Teknis:</strong> Permohonan SKPT/SPPT Perubahan didominasi oleh Individual Person (alih kepemilikan/pecah kavling) dan PT (penggabungan HPL industri).
        </span>
        <span className="text-slate-600 font-medium">Satu Data Hal. 6 Item 1 &amp; 2</span>
      </div>
    </div>
  );
};
