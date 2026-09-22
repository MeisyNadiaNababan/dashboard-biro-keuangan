import React, { useState } from 'react';
import {
  FileText,
  MapPin,
  Coins,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  ArrowUpDown,
  Building2,
  Layers,
  Sparkles,
  Table,
  HelpCircle,
  TrendingUp,
  Search,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PaketPerencanaan } from './types';
import { DetailPaketPerencanaanModal } from './DetailPaketPerencanaanModal';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface DaftarPaketPerencanaanCardProps {
  pakets: PaketPerencanaan[];
  allPakets?: PaketPerencanaan[];
  selectedSektor?: string;
  onSelectSektor?: (sektor: string) => void;
  onOpenFormula?: (datasetNo: number) => void;
}

const SEKTOR_COLORS: Record<string, string> = {
  'Gedung': '#0284C7', // sky-600
  'Utilitas dan Drainase': '#0891B2', // cyan-600
  'Fasilitas Wisata dan Lingkungan': '#059669', // emerald-600
  'Pertanaman dan Penghijauan': '#16A34A', // green-600
  'Darat': '#D97706', // amber-600
  'Laut dan Udara': '#4F46E5', // indigo-600
};

const SEKTOR_LIST = [
  { name: 'Semua', label: 'Semua 6 Sektor', count: 43 },
  { name: 'Gedung', label: 'Gedung', count: 8 },
  { name: 'Utilitas dan Drainase', label: 'Utilitas', count: 7 },
  { name: 'Fasilitas Wisata dan Lingkungan', label: 'Wisata', count: 6 },
  { name: 'Pertanaman dan Penghijauan', label: 'Pertanaman', count: 6 },
  { name: 'Darat', label: 'Darat', count: 9 },
  { name: 'Laut dan Udara', label: 'Laut & Udara', count: 7 },
];

export const DaftarPaketPerencanaanCard: React.FC<DaftarPaketPerencanaanCardProps> = ({
  pakets,
  allPakets,
  selectedSektor = 'Semua',
  onSelectSektor,
  onOpenFormula,
}) => {
  // Default to 'table' so dashboard is clean and directly displays visualizations above
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedPaket, setSelectedPaket] = useState<PaketPerencanaan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'capex-desc' | 'progres-desc' | 'readiness-desc' | 'sektor'>('capex-desc');
  const [localSektor, setLocalSektor] = useState<string>(selectedSektor);

  // Sumber data paket dasar: utamakan allPakets jika tersedia agar tidak terkunci di 1 sektor
  const basePakets = allPakets && allPakets.length > 0 ? allPakets : pakets;

  // Filter berdasarkan localSektor (default: 'Semua')
  const activeSektor = localSektor || 'Semua';
  let filteredPakets =
    activeSektor === 'Semua'
      ? basePakets
      : basePakets.filter((p) => p.sektor === activeSektor);

  // Filter berdasarkan search query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredPakets = filteredPakets.filter(
      (p) =>
        p.namaKegiatan.toLowerCase().includes(q) ||
        p.lokasiKawasan.toLowerCase().includes(q) ||
        p.konsultanPerencana.toLowerCase().includes(q) ||
        p.kodePaket.toLowerCase().includes(q)
    );
  }

  const handleSelectSektor = (sektor: string) => {
    setLocalSektor(sektor);
    setCurrentPage(1);
    if (onSelectSektor) {
      onSelectSektor(sektor);
    }
  };

  const handleOpenDetail = (paket: PaketPerencanaan) => {
    setSelectedPaket(paket);
    setIsModalOpen(true);
  };

  const sortedPakets = [...filteredPakets].sort((a, b) => {
    if (sortBy === 'capex-desc') {
      return b.estimasiCapexFisik - a.estimasiCapexFisik;
    }
    if (sortBy === 'progres-desc') {
      return b.progresPenyusunanPersen - a.progresPenyusunanPersen;
    }
    if (sortBy === 'readiness-desc') {
      return b.readinessScore - a.readinessScore;
    }
    if (sortBy === 'sektor') {
      return a.datasetNo - b.datasetNo;
    }
    return 0;
  });

  // Pagination for table
  const totalPages = Math.ceil(sortedPakets.length / itemsPerPage) || 1;
  const paginatedPakets = sortedPakets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalCapexMiliar = (sortedPakets.reduce((acc, p) => acc + p.estimasiCapexFisik, 0) / 1000000000).toFixed(1);
  const totalBiayaDEDMiliar = (sortedPakets.reduce((acc, p) => acc + p.paguKonsultansi, 0) / 1000000000).toFixed(2);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs mb-6 overflow-hidden">
      {/* Header & Collapsible Toggle */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title={isOpen ? 'Ciutkan Tabel' : 'Buka Tabel'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <div>
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <span>Rincian Paket Dokumen Perencanaan (DED)</span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {filteredPakets.length} Paket
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Daftar komparatif pagu DED konsultan, estimasi capex fisik konstruksi, dan status readiness
            </p>
          </div>
        </div>

        {/* View Mode & Collapse Toggle */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
            TABEL DATA RESMI: {sortedPakets.length} PAKET
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md font-medium cursor-pointer"
          >
            {isOpen ? 'Sembunyikan' : 'Tampilkan'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 space-y-4">
          {/* Sektor Quick Filter Bar & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                Sektor:
              </span>
              {SEKTOR_LIST.map((sek) => {
                const isSelected = activeSektor === sek.name;
                return (
                  <button
                    key={sek.name}
                    type="button"
                    onClick={() => handleSelectSektor(sek.name)}
                    className={`px-2 py-0.5 text-xs rounded-md font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-slate-900 text-white font-bold shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{sek.label}</span>
                    <span
                      className={`text-[10px] px-1 rounded-full ${
                        isSelected ? 'bg-slate-700 text-white font-mono' : 'bg-slate-100 text-slate-500 font-mono'
                      }`}
                    >
                      {sek.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari nama paket / lokasi..."
                className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* MAIN CONTENT AREA: TABEL RINCIAN BERSIH & RAMPING */}
          <div className="space-y-3">
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">Nama Paket DED &amp; Kawasan</th>
                      <th className="py-2.5 px-3 font-semibold">Sektor</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Pagu DED (Juta)</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Capex Fisik (Miliar)</th>
                      <th className="py-2.5 px-3 font-semibold text-center">Durasi</th>
                      <th className="py-2.5 px-3 font-semibold text-center">Status Readiness</th>
                      <th className="py-2.5 px-3 font-semibold text-center">Detail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedPakets.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          Tidak ditemukan paket DED yang sesuai pencarian.
                        </td>
                      </tr>
                    ) : (
                      paginatedPakets.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-3">
                            <div className="font-semibold text-slate-800 leading-snug line-clamp-1">{item.namaKegiatan}</div>
                            <div className="text-[10.5px] text-slate-400 font-mono mt-0.5">
                              {item.kodePaket} • {item.lokasiKawasan}
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className="px-2 py-0.5 rounded text-[10px] font-semibold text-white inline-block"
                              style={{ backgroundColor: SEKTOR_COLORS[item.sektor] || '#0284C7' }}
                            >
                              {item.sektor}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                            Rp {(item.paguKonsultansi / 1000000).toLocaleString('id-ID')} Jt
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                            Rp {(item.estimasiCapexFisik / 1000000000).toFixed(1)} M
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono text-slate-600">
                            {item.waktuPelaksanaanBulan} Bln
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                item.statusKesiapan === 'Selesai (Siap Lelang Fisik)'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {item.statusKesiapan}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => handleOpenDetail(item)}
                              className="p-1 rounded hover:bg-slate-200 text-sky-600 transition-colors cursor-pointer"
                              title="Lihat Detail Dokumen DED"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>
                    Menampilkan {(currentPage - 1) * itemsPerPage + 1} s/d{' '}
                    {Math.min(currentPage * itemsPerPage, sortedPakets.length)} dari {sortedPakets.length} paket
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Sebelumnya
                    </button>
                    <span className="px-2 font-mono font-semibold text-slate-700">
                      Hal {currentPage} dari {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Detail Modal */}
      {selectedPaket && (
        <DetailPaketPerencanaanModal
          paket={selectedPaket}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
