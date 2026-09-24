import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  PieChart as PieChartIcon,
  Table as TableIcon,
  Search,
  CheckCircle2,
  Clock,
  Building,
  ArrowUpRight,
  TrendingUp,
  Download,
  Factory,
  ShoppingBag,
  Filter,
} from 'lucide-react';
import {
  REKAP_LAYANAN_INDUSTRI_PERDAGANGAN,
  REKAP_PENERBITAN_DETAIL_DATA,
  LayananLlbItem,
} from '../../data/laluLintasBarangData';
import { LlbVisualHeader } from './LlbVisualHeader';

interface LlbPerizinanLlbCardProps {
  onOpenFormulaModal?: (metricId: string) => void;
}

export const LlbPerizinanLlbCard: React.FC<LlbPerizinanLlbCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<'bar' | 'donut' | 'table'>('bar');
  const [filterBagian, setFilterBagian] = useState<'ALL' | 'Industri' | 'Perdagangan'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculations
  const filteredLayanan = useMemo(() => {
    return REKAP_LAYANAN_INDUSTRI_PERDAGANGAN.filter((item) => {
      const matchBagian = filterBagian === 'ALL' || item.bagian === filterBagian;
      const matchSearch =
        searchQuery === '' ||
        item.namaLayanan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBagian && matchSearch;
    });
  }, [filterBagian, searchQuery]);

  const totalJumlah = useMemo(
    () => filteredLayanan.reduce((acc, curr) => acc + curr.jumlah, 0),
    [filteredLayanan]
  );

  const totalIndustri = useMemo(
    () =>
      REKAP_LAYANAN_INDUSTRI_PERDAGANGAN.filter((i) => i.bagian === 'Industri').reduce(
        (acc, curr) => acc + curr.jumlah,
        0
      ),
    []
  );

  const totalPerdagangan = useMemo(
    () =>
      REKAP_LAYANAN_INDUSTRI_PERDAGANGAN.filter((i) => i.bagian === 'Perdagangan').reduce(
        (acc, curr) => acc + curr.jumlah,
        0
      ),
    []
  );

  const maxJumlah = useMemo(
    () => Math.max(...REKAP_LAYANAN_INDUSTRI_PERDAGANGAN.map((i) => i.jumlah)),
    []
  );

  // Detailed perizinan table
  const filteredDetailTable = useMemo(() => {
    return REKAP_PENERBITAN_DETAIL_DATA.filter((row) => {
      const matchBagian =
        filterBagian === 'ALL' ||
        (filterBagian === 'Industri' && row.bagian === 'Seksi Industri') ||
        (filterBagian === 'Perdagangan' && row.bagian === 'Seksi Perdagangan');
      const matchSearch =
        searchQuery === '' ||
        row.namaLayanan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.namaPerusahaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.noIzin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.nib.includes(searchQuery);
      return matchBagian && matchSearch;
    });
  }, [filterBagian, searchQuery]);

  const exportCsv = () => {
    let csv = '';
    if (activeSheet === 'table') {
      csv = 'Bagian,Nama Layanan,Nama Perusahaan,NIB,NPWP,No Izin,Tgl Daftar,Status,Durasi Jam\n';
      filteredDetailTable.forEach((r) => {
        csv += `"${r.bagian}","${r.namaLayanan}","${r.namaPerusahaan}","${r.nib}","${r.npwp}","${r.noIzin}","${r.tglDaftar}","${r.status}",${r.durasiJam}\n`;
      });
    } else {
      csv = 'Bagian,Nama Layanan,Jumlah,Persentase,Rata-rata Waktu Jam,Keterangan\n';
      filteredLayanan.forEach((r) => {
        csv += `"${r.bagian}","${r.namaLayanan}",${r.jumlah},${r.persentaseBagian}%,"${r.rataRataWaktuJam} Jam","${r.keterangan}"\n`;
      });
    }
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rekap_layanan_llb_${activeSheet}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 mb-4 shadow-2xs">
      {/* 1. Standardized Visual Header */}
      <LlbVisualHeader
        datasetNumber={3}
        pdfPages="Hal. 9"
        classification="TERBUKA"
        periode="JIKA UPDATE"
        title="REKAPITULASI PENERBITAN LAYANAN PERIZINAN LALU LINTAS BARANG (INDUSTRI DAN PERDAGANGAN)"
        visualName="Bar Chart Horizontal & Komparasi Jumlah Penerbitan per Nama Layanan"
        attributes={[
          'NAMA LAYANAN',
          'BAGIAN',
          'JUMLAH',
          'STATUS',
          'NAMA PERUSAHAAN',
          'NO IJIN',
        ]}
        onOpenFormula={() => onOpenFormulaModal?.('llb-perizinan-layanan')}
        rightControls={
          <div className="flex items-center gap-1.5">
            {/* Sheet Swap Buttons */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
              <button
                onClick={() => setActiveSheet('bar')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeSheet === 'bar'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3 h-3" />
                <span>Bar Chart Layanan</span>
              </button>
              <button
                onClick={() => setActiveSheet('donut')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeSheet === 'donut'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PieChartIcon className="w-3 h-3" />
                <span>Proporsi Bagian</span>
              </button>
              <button
                onClick={() => setActiveSheet('table')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeSheet === 'table'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3 h-3" />
                <span>Tabel Rincian</span>
              </button>
            </div>

            {/* Export CSV Button */}
            <button
              onClick={exportCsv}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Unduh Data CSV Sesuai Lembar Aktif"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        }
      />

      {/* 2. Top Summary KPI Badges & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#1F4E79]" />
            Filter Bagian:
          </span>
          <button
            onClick={() => setFilterBagian('ALL')}
            className={`px-2 py-0.5 rounded text-[10.5px] font-bold transition-all cursor-pointer ${
              filterBagian === 'ALL'
                ? 'bg-[#1F4E79] text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Semua Bagian (11 Layanan)
          </button>
          <button
            onClick={() => setFilterBagian('Industri')}
            className={`px-2 py-0.5 rounded text-[10.5px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              filterBagian === 'Industri'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Factory className="w-2.5 h-2.5" />
            <span>Seksi Industri ({totalIndustri.toLocaleString('id-ID')} SK)</span>
          </button>
          <button
            onClick={() => setFilterBagian('Perdagangan')}
            className={`px-2 py-0.5 rounded text-[10.5px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              filterBagian === 'Perdagangan'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ShoppingBag className="w-2.5 h-2.5" />
            <span>Seksi Perdagangan ({totalPerdagangan.toLocaleString('id-ID')} SK)</span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama layanan..."
            className="w-full pl-7 pr-2.5 py-1 text-[11px] rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#1F4E79]"
          />
        </div>
      </div>

      {/* 3. SHEET 1: HORIZONTAL BAR CHART (Nama Layanan & Jumlah) */}
      {activeSheet === 'bar' && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-100">
            <span>
              Menampilkan <strong>{filteredLayanan.length}</strong> Layanan Penerbitan Perizinan • Total{' '}
              <strong className="text-[#1F4E79] font-mono">{totalJumlah.toLocaleString('id-ID')} SK</strong>
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Skala Terbesar: {maxJumlah.toLocaleString('id-ID')} SK
            </span>
          </div>

          <div className="space-y-2">
            {filteredLayanan.map((item, idx) => {
              const widthPct = Math.max((item.jumlah / maxJumlah) * 100, 4);
              const isIndustri = item.bagian === 'Industri';
              return (
                <div
                  key={item.id}
                  className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all bg-white"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold font-mono flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded shrink-0 font-mono ${
                          isIndustri
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.bagian}
                      </span>
                      <span className="text-[12px] font-bold text-slate-900 truncate">
                        {item.namaLayanan}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                        ⏱️ {item.rataRataWaktuJam} Jam
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-black font-mono text-slate-900">
                          {item.jumlah.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 font-mono">
                          SK ({item.persentaseBagian}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Bar Progress */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isIndustri ? 'bg-[#1F4E79]' : 'bg-amber-500'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 pt-1 border-t border-slate-100/80">
                    <span className="truncate">{item.keterangan}</span>
                    <span className="text-slate-400 font-mono shrink-0 ml-2">
                      SLA: Maks 6 Jam • ID: {item.id}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. SHEET 2: PROPORSI BAGIAN & BREAKDOWN (Donut / Composition) */}
      {activeSheet === 'donut' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Left: Interactive Donut Representation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                {/* Industri (74.1%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#1F4E79"
                  strokeWidth="14"
                  strokeDasharray={`${74.1 * 2.387} 238.7`}
                  strokeDashoffset="0"
                />
                {/* Perdagangan (25.9%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="14"
                  strokeDasharray={`${25.9 * 2.387} 238.7`}
                  strokeDashoffset={`-${74.1 * 2.387}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Total Penerbitan
                </span>
                <span className="text-xl font-black font-mono text-slate-900">
                  {(totalIndustri + totalPerdagangan).toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] font-bold text-slate-600 font-mono">Dokumen SK</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4 text-[11px] font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#1F4E79]" />
                <span>Seksi Industri (74,1%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500" />
                <span>Seksi Perdagangan (25,9%)</span>
              </div>
            </div>
          </div>

          {/* Right: Comparative Section Cards */}
          <div className="lg:col-span-7 space-y-3">
            {/* Industri Card */}
            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1F4E79] flex items-center justify-center">
                    <Factory className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Seksi Lalu Lintas Barang Industri</h4>
                    <p className="text-[10.5px] text-slate-500">
                      Bahan Baku Pabrik, Mesin Modal, Subkontrak, dan Ekspor LDP
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-black font-mono text-blue-950">
                    {totalIndustri.toLocaleString('id-ID')} SK
                  </span>
                  <span className="block text-[10px] font-bold text-blue-800 font-mono">
                    74,1% Pangsa Layanan
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600">
                Mendukung rantai pasok industri manufaktur, semikonduktor, dan perakitan alat berat di berbagai kawasan industri terpadu Batam.
              </p>
            </div>

            {/* Perdagangan Card */}
            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Seksi Lalu Lintas Barang Perdagangan</h4>
                    <p className="text-[10.5px] text-slate-500">
                      Penetapan &amp; Realisasi Pemasukan Beras, Gula, Daging, &amp; Sembako Kuota
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-black font-mono text-amber-950">
                    {totalPerdagangan.toLocaleString('id-ID')} SK
                  </span>
                  <span className="block text-[10px] font-bold text-amber-800 font-mono">
                    25,9% Pangsa Layanan
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600">
                Memastikan ketersediaan dan kestabilan harga pangan pokok bagi seluruh warga Batam melalui alokasi kuota induk tahunan bebas bea masuk.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. SHEET 3: TABEL RINCIAN PERIZINAN SATU DATA (18 Atribut) */}
      {activeSheet === 'table' && (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-3 py-2">No</th>
                <th className="px-3 py-2">Bagian</th>
                <th className="px-3 py-2">Nama Layanan</th>
                <th className="px-3 py-2">Nama Perusahaan</th>
                <th className="px-3 py-2">NIB &amp; NPWP</th>
                <th className="px-3 py-2">No Izin / Pendaftaran</th>
                <th className="px-3 py-2">Tgl Daftar</th>
                <th className="px-3 py-2 text-center">Status</th>
                <th className="px-3 py-2 text-right">Durasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredDetailTable.map((row, idx) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-2 font-mono font-bold text-slate-400">{idx + 1}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded font-mono ${
                        row.bagian === 'Seksi Industri'
                          ? 'bg-blue-100 text-blue-800'
                          : row.bagian === 'Seksi Perdagangan'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {row.bagian}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-semibold text-slate-900">{row.namaLayanan}</td>
                  <td className="px-3 py-2 text-slate-700 font-medium">{row.namaPerusahaan}</td>
                  <td className="px-3 py-2 font-mono text-[10px] text-slate-500">
                    <div>NIB: {row.nib}</div>
                    <div>NPWP: {row.npwp}</div>
                  </td>
                  <td className="px-3 py-2 font-mono text-[10px] text-slate-700">
                    <div className="font-bold text-[#1F4E79]">{row.noIzin}</div>
                    <div className="text-slate-400">Reg: {row.noPendaftaran}</div>
                  </td>
                  <td className="px-3 py-2 font-mono text-slate-500">{row.tglDaftar}</td>
                  <td className="px-3 py-2 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right font-mono font-bold text-slate-800">
                    {row.durasiJam} Jam
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
