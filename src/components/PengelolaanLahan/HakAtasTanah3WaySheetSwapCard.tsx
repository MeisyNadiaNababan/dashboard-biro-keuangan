import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Repeat,
  CalendarCheck2,
  Layers,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Info,
  Table as TableIcon,
  BarChart3,
  GitCompare,
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
import {
  REKAP_PEMBAHARUAN_HAK_DATA,
  REKAP_PERALIHAN_HAK_DATA,
  REKAP_PERPANJANGAN_HAK_DATA,
} from './lahanData';
import { LahanFilterState, RekapPermohonanItem } from './types';

interface HakAtasTanah3WaySheetSwapCardProps {
  filters: LahanFilterState;
  onOpenFormulaModal?: (kpiId: string) => void;
}

type HakMode = 'pembaharuan' | 'peralihan' | 'perpanjangan' | 'matriks';

export const HakAtasTanah3WaySheetSwapCard: React.FC<HakAtasTanah3WaySheetSwapCardProps> = ({
  filters,
  onOpenFormulaModal,
}) => {
  const [hakMode, setHakMode] = useState<HakMode>('peralihan'); // Defaults to user screenshot (Dataset #9)
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

  const filteredPembaharuan = useMemo(() => filterData(REKAP_PEMBAHARUAN_HAK_DATA), [filters]);
  const filteredPeralihan = useMemo(() => filterData(REKAP_PERALIHAN_HAK_DATA), [filters]);
  const filteredPerpanjangan = useMemo(() => filterData(REKAP_PERPANJANGAN_HAK_DATA), [filters]);

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

  const aggPembaharuan = useMemo(() => aggregateByPemohon(filteredPembaharuan), [filteredPembaharuan]);
  const aggPeralihan = useMemo(() => aggregateByPemohon(filteredPeralihan), [filteredPeralihan]);
  const aggPerpanjangan = useMemo(() => aggregateByPemohon(filteredPerpanjangan), [filteredPerpanjangan]);

  // Combined Matriks 3-way
  const aggMatriks = useMemo(() => {
    const allPemohon = Array.from(
      new Set([
        ...aggPembaharuan.map((x) => x.pemohon),
        ...aggPeralihan.map((x) => x.pemohon),
        ...aggPerpanjangan.map((x) => x.pemohon),
      ])
    );
    return allPemohon.map((pemohon) => {
      const b = aggPembaharuan.find((x) => x.pemohon === pemohon) || { disetujui: 0, ditolak: 0, total: 0 };
      const l = aggPeralihan.find((x) => x.pemohon === pemohon) || { disetujui: 0, ditolak: 0, total: 0 };
      const j = aggPerpanjangan.find((x) => x.pemohon === pemohon) || { disetujui: 0, ditolak: 0, total: 0 };
      return {
        pemohon,
        pembaharuan: b.disetujui,
        peralihan: l.disetujui,
        perpanjangan: j.disetujui,
        totalDisetujui: b.disetujui + l.disetujui + j.disetujui,
      };
    }).sort((a, b) => b.totalDisetujui - a.totalDisetujui);
  }, [aggPembaharuan, aggPeralihan, aggPerpanjangan]);

  // Summary Metrics depending on active mode
  const summary = useMemo(() => {
    let dataset: RekapPermohonanItem[] = [];
    let label = '';
    let datasetNo = 9;

    if (hakMode === 'pembaharuan') {
      dataset = filteredPembaharuan;
      label = 'Pembaharuan Hak Atas Tanah';
      datasetNo = 5;
    } else if (hakMode === 'peralihan') {
      dataset = filteredPeralihan;
      label = 'Peralihan Hak Atas Tanah';
      datasetNo = 9;
    } else if (hakMode === 'perpanjangan') {
      dataset = filteredPerpanjangan;
      label = 'Perpanjangan Hak Atas Tanah';
      datasetNo = 13;
    } else {
      dataset = [...filteredPembaharuan, ...filteredPeralihan, ...filteredPerpanjangan];
      label = 'Konsolidasi 3 Hak Atas Tanah (#5, #9, #13)';
      datasetNo = 0;
    }

    const total = dataset.reduce((acc, i) => acc + i.jumlah, 0);
    const disetujui = dataset.reduce((acc, i) => acc + i.disetujui, 0);
    const ditolak = dataset.reduce((acc, i) => acc + i.ditolak, 0);
    const rate = total > 0 ? ((disetujui / total) * 100).toFixed(1) : '0';
    return { total, disetujui, ditolak, rate, label, datasetNo };
  }, [hakMode, filteredPembaharuan, filteredPeralihan, filteredPerpanjangan]);

  const activeTableData =
    hakMode === 'pembaharuan'
      ? filteredPembaharuan
      : hakMode === 'perpanjangan'
      ? filteredPerpanjangan
      : filteredPeralihan;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header with 3-Way Sheet Swap Tabs */}
      <div className="p-3.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <Repeat className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Rekapitulasi Hak Atas Tanah
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                3-Way Sheet Swap
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Pembaruan Hak (#5), Peralihan Hak (#9), dan Perpanjangan Hak Atas Tanah (#13)
            </p>
          </div>
        </div>

        {/* 3-Way Sheet Swap Controls */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
            <button
              onClick={() => setHakMode('pembaharuan')}
              className={`px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer ${
                hakMode === 'pembaharuan'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              #5 Pembaharuan
            </button>
            <button
              onClick={() => setHakMode('peralihan')}
              className={`px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer ${
                hakMode === 'peralihan'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              #9 Peralihan
            </button>
            <button
              onClick={() => setHakMode('perpanjangan')}
              className={`px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer ${
                hakMode === 'perpanjangan'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              #13 Perpanjangan
            </button>
            <button
              onClick={() => setHakMode('matriks')}
              className={`px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer ${
                hakMode === 'matriks'
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Matriks 3-Way
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

          <button
            onClick={() => onOpenFormulaModal && onOpenFormulaModal('lahan_peralihan_hak')}
            className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
            title="Penjelasan Formula & Tableau Guide"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mini KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-100 text-xs">
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Total Permohonan</div>
          <div className="text-base font-bold text-slate-900">{summary.total.toLocaleString('id-ID')}</div>
          <div className="text-[10px] text-indigo-700 font-medium truncate">{summary.label}</div>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Izin Disetujui</div>
          <div className="text-base font-bold text-emerald-700">{summary.disetujui.toLocaleString('id-ID')}</div>
          <div className="text-[10px] text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Hak Tanah Sah</span>
          </div>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Ditolak / Batal</div>
          <div className="text-base font-bold text-rose-700">{summary.ditolak.toLocaleString('id-ID')}</div>
          <div className="text-[10px] text-rose-700 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            <span>Sengketa / Non-Kesesuaian</span>
          </div>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Approval Ratio</div>
          <div className="text-base font-bold text-amber-700">{summary.rate}%</div>
          <div className="text-[10px] text-amber-700 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Tingkat Kelulusan</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3.5 flex-1 min-h-[300px]">
        {viewMode === 'chart' ? (
          <div>
            <div className="text-xs text-slate-500 mb-2 flex items-center justify-between">
              <span>
                Visualisasi:{' '}
                <strong className="text-slate-800">
                  {hakMode === 'matriks'
                    ? 'Komparasi Volume Disetujui (Pembaharuan vs Peralihan vs Perpanjangan)'
                    : `Disetujui vs Ditolak (${summary.label})`}
                </strong>
              </span>
              <span className="text-[11px] text-slate-500">Satuan: Berkas Perizinan</span>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {hakMode === 'matriks' ? (
                  <BarChart data={aggMatriks} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
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
                    <Bar dataKey="pembaharuan" name="#5 Pembaharuan" fill="#14B8A6" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="peralihan" name="#9 Peralihan" fill="#6366F1" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="perpanjangan" name="#13 Perpanjangan" fill="#F59E0B" radius={[3, 3, 0, 0]} />
                  </BarChart>
                ) : (
                  <BarChart
                    data={
                      hakMode === 'pembaharuan'
                        ? aggPembaharuan
                        : hakMode === 'perpanjangan'
                        ? aggPerpanjangan
                        : aggPeralihan
                    }
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
                Data Tabel: <strong className="text-slate-800">{summary.label}</strong> ({activeTableData.length} entri)
              </span>
              <span className="text-[11px] text-emerald-700 font-mono">
                {hakMode === 'peralihan' ? 'Sesuai OCR PDF Screenshot' : 'Katalog Satu Data'}
              </span>
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
          💡 <strong>Catatan Teknis:</strong> Peralihan Hak Atas Tanah (Dataset #9) memiliki volume tertinggi (7.500+ berkas) karena transaksi jual beli perumahan &amp; take-over aset bisnis di Batam.
        </span>
        <span className="text-slate-600 font-medium">Satu Data Hal. 6-7 Item 5, 9, 13</span>
      </div>
    </div>
  );
};
