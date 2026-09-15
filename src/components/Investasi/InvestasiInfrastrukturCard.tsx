import React, { useState, useMemo } from 'react';
import {
  Building2,
  Calendar,
  Maximize2,
  DollarSign,
  Download,
  Search,
  ExternalLink,
  Layers,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { INFRASTRUKTUR_DATA, InfrastrukturItem } from '../../data/investasiData';

interface InvestasiInfrastrukturCardProps {
  onOpenFormulaModal: (formulaId: string) => void;
}

export const InvestasiInfrastrukturCard: React.FC<InvestasiInfrastrukturCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  // Daftar tahun unik
  const availableYears = [2024, 2025, 2026, 2027];

  // Agregasi per tahun (Nilai Investasi & Luas Area)
  const yearlyMetrics = useMemo(() => {
    return availableYears.map((year) => {
      const projects = INFRASTRUKTUR_DATA.filter((p) => p.tahun === year);
      const totalNilai = projects.reduce((sum, p) => sum + p.nilaiInvestasi, 0);
      const totalLuas = projects.reduce((sum, p) => sum + p.luasAreaHa, 0);
      return {
        year,
        count: projects.length,
        totalNilai,
        totalLuas,
        projects,
      };
    });
  }, []);

  const maxYearlyNilai = useMemo(() => {
    return Math.max(...yearlyMetrics.map((y) => y.totalNilai), 1);
  }, [yearlyMetrics]);

  const maxYearlyLuas = useMemo(() => {
    return Math.max(...yearlyMetrics.map((y) => y.totalLuas), 1);
  }, [yearlyMetrics]);

  // Grand totals
  const grandTotalNilai = useMemo(() => {
    return INFRASTRUKTUR_DATA.reduce((sum, p) => sum + p.nilaiInvestasi, 0);
  }, []);

  const grandTotalLuas = useMemo(() => {
    return INFRASTRUKTUR_DATA.reduce((sum, p) => sum + p.luasAreaHa, 0);
  }, []);

  // Filtered project list
  const filteredProjects = useMemo(() => {
    return INFRASTRUKTUR_DATA.filter((p) => {
      const matchYear = selectedYear === 'ALL' || p.tahun === selectedYear;
      const matchSector = selectedSector === 'ALL' || p.sektor === selectedSector;
      const matchSearch =
        p.namaProyek.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sektor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchYear && matchSearch && matchSector;
    });
  }, [selectedYear, selectedSector, searchQuery]);

  // Format Rupiah
  const formatRupiah = (val: number): string => {
    if (val >= 1e12) {
      return `Rp ${(val / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;
    }
    return `Rp ${(val / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
  };

  // Export CSV
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'No,Nama Proyek,Tahun,Nilai Investasi (Rp),Luas Area (Ha),Lokasi,Sektor,Status,Sumber Pendanaan\n';
    filteredProjects.forEach((r, idx) => {
      csvContent += `"${idx + 1}","${r.namaProyek}","${r.tahun}","${r.nilaiInvestasi}","${r.luasAreaHa}","${r.lokasi}","${r.sektor}","${r.status}","${r.sumberPendanaan}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `infrastruktur_yang_akan_dibangun_dataset6.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id="investasi-infrastruktur-card"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
    >
      {/* 1. Header */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 border border-emerald-300/60 flex items-center justify-center text-emerald-800 shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                INFRASTRUKTUR YANG AKAN DIBANGUN
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono">
                Dataset No. 6 • Multi-Tahun
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Visualisasi komparasi nilai investasi (Rp) dan luas area (Ha) proyek infrastruktur per tahun pelaksanaan
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => onOpenFormulaModal('kpi_investasi_infrastruktur')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Lihat Definisi Dataset 6"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>Katalog Data</span>
          </button>
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Ekspor data aktif ke format CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Ringkasan Visual Multi-Tahun: Nilai Investasi & Luas Area per Tahun */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Komparasi Nilai Investasi &amp; Luas Lahan Menurut Tahun Pelaksanaan</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Pilih tahun di bawah untuk melihat rincian proyek pada tahun tersebut
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500">Total Pipeline:</span>
            <span className="font-black text-slate-900">{formatRupiah(grandTotalNilai)}</span>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-emerald-700">{grandTotalLuas.toFixed(1)} Ha</span>
          </div>
        </div>

        {/* 4 Kartu Tahun Komparatif (Visualisasi Nilai Investasi & Luas per Tahun) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {yearlyMetrics.map((item) => {
            const isSelected = selectedYear === item.year;
            const nilaiPct = Math.round((item.totalNilai / maxYearlyNilai) * 100);
            const luasPct = Math.round((item.totalLuas / maxYearlyLuas) * 100);

            return (
              <div
                key={item.year}
                onClick={() => setSelectedYear(isSelected ? 'ALL' : item.year)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-400/40 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
                }`}
                title={`Klik untuk filter data ke tahun ${item.year}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-slate-900 text-white">
                      Tahun {item.year}
                    </span>
                    <span className="text-[10.5px] font-mono text-slate-500 font-semibold">
                      {item.count} Proyek
                    </span>
                  </div>

                  {/* 1. Nilai Investasi */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-emerald-600" />
                        <span>Nilai Investasi:</span>
                      </span>
                      <span className="font-mono font-black text-slate-900">
                        {formatRupiah(item.totalNilai)}
                      </span>
                    </div>
                    {/* Bar Nilai */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(12, nilaiPct)}%` }}
                      />
                    </div>
                  </div>

                  {/* 2. Luas Area */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-sky-600" />
                        <span>Luas Area:</span>
                      </span>
                      <span className="font-mono font-bold text-sky-800">
                        {item.totalLuas.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Ha
                      </span>
                    </div>
                    {/* Bar Luas */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-sky-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(12, luasPct)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{isSelected ? '✓ Filter Aktif' : 'Klik untuk filter'}</span>
                  <span>{item.projects[0]?.sektor?.split('&')[0] || ''}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bar Kontrol Filter & Pencarian Tabel Proyek */}
      <div className="p-3 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Filter Tab Tahun */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setSelectedYear('ALL')}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-all ${
                selectedYear === 'ALL'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Tahun
            </button>
            {availableYears.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-all ${
                  selectedYear === yr
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* Sektor Filter */}
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">Semua Sektor</option>
            <option value="Transportasi & Konektivitas">Transportasi &amp; Konektivitas</option>
            <option value="Energi & Utilitas">Energi &amp; Utilitas</option>
            <option value="Kawasan Industri & Hub">Kawasan Industri &amp; Hub</option>
            <option value="Kesehatan & Pariwisata">Kesehatan &amp; Pariwisata</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama proyek / lokasi..."
            className="w-full pl-7 pr-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-emerald-500"
          />
        </div>
      </div>

      {/* 4. Tabel Rincian Proyek Infrastruktur (Dataset No. 6) */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-sans text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
              <th className="py-2.5 px-3 w-12 text-center">No</th>
              <th className="py-2.5 px-3">Nama Proyek Infrastruktur</th>
              <th className="py-2.5 px-3 w-20 text-center">Tahun</th>
              <th className="py-2.5 px-3 text-right">Nilai Investasi</th>
              <th className="py-2.5 px-3 text-right">Luas Area</th>
              <th className="py-2.5 px-3">Lokasi</th>
              <th className="py-2.5 px-3">Sektor</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  Tidak ada proyek infrastruktur yang sesuai filter
                </td>
              </tr>
            ) : (
              filteredProjects.map((row, idx) => (
                <tr key={row.id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{row.namaProyek}</div>
                    <div className="text-[10.5px] text-slate-500 font-sans">
                      Sumber: {row.sumberPendanaan}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      {row.tahun}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-black text-slate-900 whitespace-nowrap">
                    {formatRupiah(row.nilaiInvestasi)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                    {row.luasAreaHa.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Ha
                  </td>
                  <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{row.lokasi}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-700 text-[11px]">
                    {row.sektor}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.status === 'Operasional Awal'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : row.status === 'Tahap Konstruksi Fisik'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : row.status === 'Tender Konstruksi'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 font-mono gap-1">
        <span>
          Menampilkan {filteredProjects.length} dari {INFRASTRUKTUR_DATA.length} proyek infrastruktur strategis
        </span>
        <span className="text-slate-400 font-sans text-[11px]">
          Atribut Dataset 6: [NILAI INVESTASI], [LUAS], dan [TAHUN]
        </span>
      </div>
    </div>
  );
};
