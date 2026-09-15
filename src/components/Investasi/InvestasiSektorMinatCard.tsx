import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  PieChart as PieIcon,
  Layers,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
} from 'lucide-react';
import { MinatInvestasiItem } from '../../data/investasiData';

interface InvestasiSektorMinatCardProps {
  minatList: MinatInvestasiItem[];
  onOpenFormulaModal: (formulaId: string) => void;
}

export const InvestasiSektorMinatCard: React.FC<InvestasiSektorMinatCardProps> = ({
  minatList,
  onOpenFormulaModal,
}) => {
  const [selectedSektor, setSelectedSektor] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailTable, setShowDetailTable] = useState(true);

  // Agregasi minat per sektor
  const sektorAggregates = useMemo(() => {
    const map = new Map<
      string,
      {
        sektor: string;
        jumlahMinat: number;
        totalNilai: number;
        luarNegeriCount: number;
        dalamNegeriCount: number;
        perusahaanList: string[];
      }
    >();

    minatList.forEach((item) => {
      const current = map.get(item.sektor) || {
        sektor: item.sektor,
        jumlahMinat: 0,
        totalNilai: 0,
        luarNegeriCount: 0,
        dalamNegeriCount: 0,
        perusahaanList: [],
      };

      current.jumlahMinat += 1;
      current.totalNilai += item.nilaiMinatInvestasi;
      if (item.kategoriAsal === 'Luar Negeri') current.luarNegeriCount += 1;
      else current.dalamNegeriCount += 1;
      current.perusahaanList.push(item.namaPerusahaan);

      map.set(item.sektor, current);
    });

    const arr = Array.from(map.values());
    arr.sort((a, b) => b.jumlahMinat - a.jumlahMinat || b.totalNilai - a.totalNilai);
    return arr;
  }, [minatList]);

  // Max jumlah minat untuk visual progress bar
  const maxMinat = useMemo(() => {
    return Math.max(...sektorAggregates.map((s) => s.jumlahMinat), 1);
  }, [sektorAggregates]);

  const grandTotalMinat = minatList.length;
  const grandTotalNilai = useMemo(() => {
    return minatList.reduce((acc, curr) => acc + curr.nilaiMinatInvestasi, 0);
  }, [minatList]);

  // Filter detail table
  const filteredDetailList = useMemo(() => {
    return minatList.filter((item) => {
      const matchSektor = selectedSektor === 'ALL' || item.sektor === selectedSektor;
      const matchSearch =
        item.namaPerusahaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.asalNegara.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sektor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.namaPameranKegiatan.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSektor && matchSearch;
    });
  }, [minatList, selectedSektor, searchQuery]);

  // Format Rupiah Triliun/Miliar
  const formatRupiah = (val: number): string => {
    if (val >= 1e12) {
      return `Rp ${(val / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;
    }
    return `Rp ${(val / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
  };

  // Export CSV
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'No,Nama Perusahaan,Asal Negara,Kategori,Sektor,Nilai Minat Investasi (Rp),Nama Pameran/Kegiatan,Status Minat\n';
    filteredDetailList.forEach((r, idx) => {
      csvContent += `"${idx + 1}","${r.namaPerusahaan}","${r.asalNegara}","${r.kategoriAsal}","${r.sektor}","${r.nilaiMinatInvestasi}","${r.namaPameranKegiatan}","${r.statusMinat}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `minat_investasi_sektor_dataset14.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Palet warna per sektor
  const sectorColors: Record<string, string> = {
    'Pusat Data & Ekonomi Digital': '#2563EB',
    'Elektronik & Semikonduktor': '#059669',
    'Energi Terbarukan & Baterai EV': '#10B981',
    'Galangan Kapal & Maritim Offshore': '#0284C7',
    'Kesehatan & Pariwisata Medis': '#7C3AED',
    'Aviasi MRO & Komponen Pesawat': '#4F46E5',
    'Industri Kimia & Oleokimia': '#D97706',
    'Logistik & Pergudangan Modern': '#F59E0B',
    'Kawasan Industri & Properti': '#64748B',
  };

  return (
    <div
      id="investasi-sektor-minat-card"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
    >
      {/* Header */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100/70 border border-indigo-300/60 flex items-center justify-center text-indigo-800 shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                DATA MINAT INVESTASI BERDASARKAN SEKTOR
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 font-mono">
                Dataset No. 14 • Kunjungan &amp; Pameran
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Distribusi jumlah peminat investasi (Letter of Intent / LoI) dan proyeksi nilai investasi per klaster industri
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => onOpenFormulaModal('kpi_investasi_minat')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Lihat Metadata Dataset 14"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
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

      {/* Quick Stat Summary Bar */}
      <div className="px-4 py-3 bg-indigo-50/30 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="text-[10.5px] font-medium text-slate-500 block">Total Minat Investasi</span>
          <span className="text-base font-black font-mono text-slate-900">{grandTotalMinat} Calon Investor</span>
        </div>
        <div>
          <span className="text-[10.5px] font-medium text-slate-500 block">Total Estimasi Nilai</span>
          <span className="text-base font-black font-mono text-indigo-700">{formatRupiah(grandTotalNilai)}</span>
        </div>
        <div>
          <span className="text-[10.5px] font-medium text-slate-500 block">Sektor Paling Diminati</span>
          <span className="text-xs font-bold text-slate-900 truncate block">
            {sektorAggregates[0]?.sektor || '-'}
          </span>
        </div>
        <div>
          <span className="text-[10.5px] font-medium text-slate-500 block">Komposisi Investor</span>
          <span className="text-xs font-semibold text-slate-700 font-mono">
            {minatList.filter((m) => m.kategoriAsal === 'Luar Negeri').length} PMA • {minatList.filter((m) => m.kategoriAsal === 'Dalam Negeri').length} PMDN
          </span>
        </div>
      </div>

      {/* Visualisasi Minat Investasi Berdasarkan Sektor (Horizontal Bar Matrix + Detail) */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <PieIcon className="w-3.5 h-3.5 text-indigo-600" />
            <span>Peringkat Sektor Berdasarkan Jumlah Minat Investasi (LoI)</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Klik baris sektor untuk memfilter rincian perusahaan
          </span>
        </div>

        {/* Visual Bar Chart per Sektor */}
        <div className="space-y-2.5">
          {sektorAggregates.map((item) => {
            const isSelected = selectedSektor === item.sektor;
            const percentage = Math.round((item.jumlahMinat / grandTotalMinat) * 100);
            const barWidth = Math.max(12, Math.round((item.jumlahMinat / maxMinat) * 100));
            const color = sectorColors[item.sektor] || '#4F46E5';

            return (
              <div
                key={item.sektor}
                onClick={() => setSelectedSektor(isSelected ? 'ALL' : item.sektor)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50/40 ring-1 ring-indigo-400/40 shadow-xs'
                    : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs font-bold text-slate-900">
                      {item.sektor}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800 font-mono">
                        Filter Aktif
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="font-bold text-slate-900">
                      {item.jumlahMinat} Minat ({percentage}%)
                    </span>
                    <span className="text-indigo-700 font-semibold">
                      {formatRupiah(item.totalNilai)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar Visual */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>

                {/* Sub info tags */}
                <div className="flex items-center justify-between mt-2 text-[10.5px] text-slate-500">
                  <span>
                    Asal Investor: {item.luarNegeriCount} Luar Negeri • {item.dalamNegeriCount} Dalam Negeri
                  </span>
                  <span className="font-sans text-indigo-600 hover:underline">
                    {item.perusahaanList.slice(0, 2).join(', ')}
                    {item.perusahaanList.length > 2 ? ` +${item.perusahaanList.length - 2} lainnya` : ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rincian Tabel Perusahaan Calon Investor (Dataset 14) */}
      <div className="border-t border-slate-200">
        <div className="p-3 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetailTable(!showDetailTable)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {showDetailTable ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
              <span>Rincian Investor &amp; Event Pameran (Dataset No. 14)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700 font-mono">
                {filteredDetailList.length} Entri
              </span>
            </button>
            {selectedSektor !== 'ALL' && (
              <button
                onClick={() => setSelectedSektor('ALL')}
                className="text-[11px] text-indigo-600 hover:underline ml-2 font-medium"
              >
                Reset Filter Sektor
              </button>
            )}
          </div>

          <div className="relative w-48 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari investor / pameran..."
              className="w-full pl-7 pr-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        {showDetailTable && (
          <div className="overflow-x-auto max-h-80 overflow-y-auto">
            <table className="w-full text-xs font-sans text-left border-collapse">
              <thead className="sticky top-0 bg-slate-100 z-10">
                <tr className="text-slate-700 border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2 px-3 w-10 text-center">No</th>
                  <th className="py-2 px-3">Nama Perusahaan</th>
                  <th className="py-2 px-3">Asal / Kategori</th>
                  <th className="py-2 px-3">Sektor</th>
                  <th className="py-2 px-3 text-right">Nilai Minat</th>
                  <th className="py-2 px-3">Pameran / Forum Promosi</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDetailList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-400">
                      Tidak ada data investor yang sesuai filter
                    </td>
                  </tr>
                ) : (
                  filteredDetailList.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {row.namaPerusahaan}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-bold font-mono ${
                              row.kategoriAsal === 'Luar Negeri'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {row.kategoriAsal === 'Luar Negeri' ? 'PMA' : 'PMDN'}
                          </span>
                          <span className="text-slate-700">{row.asalNegara}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">
                        {row.sektor}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        {formatRupiah(row.nilaiMinatInvestasi)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11.5px]">
                        <div>{row.namaPameranKegiatan}</div>
                        <div className="text-[10px] text-slate-400">{row.lokasiKegiatan}</div>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            row.statusMinat === 'Pemenuhan Komitmen'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : row.statusMinat === 'Studi Kelayakan (FS)'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : row.statusMinat === 'Kunjungan Lapangan (Site Visit)'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {row.statusMinat}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
