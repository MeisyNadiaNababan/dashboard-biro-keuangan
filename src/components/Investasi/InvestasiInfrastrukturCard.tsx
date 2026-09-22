import React, { useState, useMemo } from 'react';
import {
  Building2,
  MapPin,
  BarChart3,
  Table as TableIcon,
  Search,
  Download,
  ExternalLink,
  ArrowUpDown,
  Calendar,
} from 'lucide-react';
import { INFRASTRUKTUR_DATA } from '../../data/investasiData';

interface InvestasiInfrastrukturCardProps {
  onOpenFormulaModal: (formulaId: string) => void;
  filterYear?: number | 'ALL';
}

export const InvestasiInfrastrukturCard: React.FC<InvestasiInfrastrukturCardProps> = ({
  onOpenFormulaModal,
  filterYear = 'ALL',
}) => {
  const [viewMode, setViewMode] = useState<'ranking-bar' | 'table'>('ranking-bar');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'nilai-desc' | 'nilai-asc' | 'tahun' | 'nama'>('nilai-desc');

  // Format Rupiah
  const formatRupiah = (val: number): string => {
    if (val >= 1e12) {
      return `Rp ${(val / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Triliun`;
    }
    return `Rp ${(val / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 1 })} Miliar`;
  };

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return INFRASTRUKTUR_DATA.filter((p) => {
      const matchYear = String(filterYear) === 'ALL' || p.tahun === Number(filterYear);
      const matchSearch =
        p.namaProyek.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
      return matchYear && matchSearch;
    });
  }, [filterYear, searchQuery]);

  // Sorted Projects
  const sortedProjects = useMemo(() => {
    const list = [...filteredProjects];
    if (sortBy === 'nilai-desc') {
      list.sort((a, b) => b.nilaiInvestasi - a.nilaiInvestasi);
    } else if (sortBy === 'nilai-asc') {
      list.sort((a, b) => a.nilaiInvestasi - b.nilaiInvestasi);
    } else if (sortBy === 'tahun') {
      list.sort((a, b) => a.tahun - b.tahun || b.nilaiInvestasi - a.nilaiInvestasi);
    } else if (sortBy === 'nama') {
      list.sort((a, b) => a.namaProyek.localeCompare(b.namaProyek));
    }
    return list;
  }, [filteredProjects, sortBy]);

  // Metrics
  const totalNilaiFiltered = useMemo(() => {
    return filteredProjects.reduce((sum, p) => sum + p.nilaiInvestasi, 0);
  }, [filteredProjects]);

  const maxNilaiInvestasi = useMemo(() => {
    return Math.max(...INFRASTRUKTUR_DATA.map((p) => p.nilaiInvestasi), 1);
  }, []);

  // Export CSV
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'No,Nama Project,Lokasi,Nilai Investasi (Rp),Nilai Formatted,Tahun\n';
    sortedProjects.forEach((p, idx) => {
      csvContent += `${idx + 1},"${p.namaProyek}","${p.lokasi}",${p.nilaiInvestasi},"${formatRupiah(p.nilaiInvestasi)}",${p.tahun}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `infrastruktur_yang_akan_dibangun_batam.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id="investasi-infrastruktur-card"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
    >
      {/* 1. Header Visualisasi */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 border border-emerald-300/60 flex items-center justify-center text-emerald-800 shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                INFRASTRUKTUR YANG AKAN DIBANGUN DI BATAM
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono">
                Dataset No. 6 • Satu Data
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Visualisasi komprehensif Nama Project, Lokasi Wilayah, Tahun, dan Nilai Investasi Proyek Strategis Batam
            </p>
          </div>
        </div>

        {/* View Mode & Export */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="bg-slate-200/70 p-0.5 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('ranking-bar')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                viewMode === 'ranking-bar'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Grafik Proyek</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tabel Matriks</span>
            </button>
          </div>

          <button
            onClick={() => onOpenFormulaModal('kpi_investasi_infrastruktur')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Lihat Atribut & Metadata Dataset 6"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>Katalog</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Ekspor daftar proyek ke CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary Bar */}
      <div className="px-4 py-3 bg-emerald-50/25 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-[10.5px] font-medium text-slate-500 block">Total Nilai Investasi Pipeline</span>
          <span className="text-base font-black font-mono text-emerald-800">
            {formatRupiah(totalNilaiFiltered)}
          </span>
        </div>
        <div>
          <span className="text-[10.5px] font-medium text-slate-500 block">Jumlah Proyek Ditampilkan</span>
          <span className="text-base font-black font-mono text-slate-800">
            {sortedProjects.length} Proyek {filterYear !== 'ALL' ? `(Tahun ${filterYear})` : '(Multi-Tahun)'}
          </span>
        </div>
      </div>

      {/* 3. Search & Sort Controls */}
      <div className="p-3 sm:px-4 bg-slate-50/40 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama project atau lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] text-slate-500 font-medium">Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="nilai-desc">Nilai Investasi Tertinggi</option>
            <option value="nilai-asc">Nilai Investasi Terendah</option>
            <option value="tahun">Tahun Rencana (Kronologis)</option>
            <option value="nama">Nama Project (A-Z)</option>
          </select>
        </div>
      </div>

      {/* 4. VISUALISASI UTAMA: MENAMPILKAN NAMA PROJECT, LOKASI, TAHUN DAN NILAI INVESTASI */}
      <div className="p-3.5 sm:p-4">
        {viewMode === 'ranking-bar' ? (
          /* OPSI 1: HORIZONTAL BAR RANKING PROYEK (NAMA PROJECT, LOKASI, TAHUN & NILAI INVESTASI) */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider pb-1.5 border-b border-slate-100">
              <span>Nama Project &amp; Lokasi Pembangunan</span>
              <span>Nilai Investasi (Rupiah)</span>
            </div>

            <div className="space-y-2.5">
              {sortedProjects.map((p, idx) => {
                const barWidth = Math.round((p.nilaiInvestasi / maxNilaiInvestasi) * 100);

                return (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl border border-slate-200/90 hover:border-emerald-400 hover:shadow-xs bg-white transition-all group"
                  >
                    {/* Header Proyek, Lokasi, Tahun, dan Nilai Investasi */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      {/* Nama Project, Lokasi & Tahun */}
                      <div className="flex items-start gap-2.5 flex-1">
                        <span className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-800 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {p.namaProyek}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            {/* Lokasi Proyek */}
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                              <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
                              <span>Lokasi: {p.lokasi}</span>
                            </span>

                            {/* Tahun Rencana */}
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                              <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                              <span>Tahun {p.tahun}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Nilai Investasi (Tinggi, Jelas, Monospace) */}
                      <div className="text-left sm:text-right shrink-0 bg-emerald-50/70 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                        <span className="text-[10px] text-emerald-800 font-semibold block sm:inline">
                          Nilai Investasi:{' '}
                        </span>
                        <span className="text-xs sm:text-sm font-black font-mono text-emerald-900">
                          {formatRupiah(p.nilaiInvestasi)}
                        </span>
                        <div className="text-[10.5px] font-mono text-slate-400">
                          Rp {p.nilaiInvestasi.toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>

                    {/* Visual Bar Proporsional Nilai Investasi */}
                    <div className="pt-1">
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all duration-500 group-hover:bg-emerald-500"
                          style={{ width: `${Math.max(3, barWidth)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* OPSI 2: TABEL MATRIKS PROYEK (NAMA PROJECT, LOKASI, NILAI INVESTASI, TAHUN) */
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs font-sans text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3 w-12 text-center">No</th>
                  <th className="py-2.5 px-4 min-w-[240px]">Nama Project</th>
                  <th className="py-2.5 px-4 min-w-[180px]">Lokasi</th>
                  <th className="py-2.5 px-4 text-right min-w-[160px]">Nilai Investasi</th>
                  <th className="py-2.5 px-3 text-center w-28">Tahun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedProjects.map((p, idx) => (
                  <tr key={p.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {p.namaProyek}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-semibold text-sky-800">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{p.lokasi}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-black text-emerald-800">
                      {formatRupiah(p.nilaiInvestasi)}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">
                      {p.tahun}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="py-3 px-3 text-center font-mono">-</td>
                  <td className="py-3 px-4 font-black">TOTAL ({sortedProjects.length} PROYEK)</td>
                  <td className="py-3 px-4 text-slate-500 font-medium">Batam &amp; Sekitarnya</td>
                  <td className="py-3 px-4 text-right font-mono font-black text-emerald-900">
                    {formatRupiah(totalNilaiFiltered)}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold">-</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* 5. Footer Info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 font-mono gap-1">
        <span>
          Dataset No. 6: [Nama Project], [Lokasi], [Tahun], [Nilai Investasi (Rp)]
        </span>
        <span className="text-[11px] text-slate-400 font-sans">
          Sumber Data: BP Batam • Satu Data Indonesia
        </span>
      </div>
    </div>
  );
};
