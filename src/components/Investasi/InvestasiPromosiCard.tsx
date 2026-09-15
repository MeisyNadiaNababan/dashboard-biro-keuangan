import React, { useState, useMemo } from 'react';
import {
  Megaphone,
  Users,
  Calendar,
  Layers,
  MapPin,
  Download,
  Search,
  ExternalLink,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { KEGIATAN_PROMOSI_DATA, KegiatanPromosiItem } from '../../data/investasiData';

interface InvestasiPromosiCardProps {
  onOpenFormulaModal: (formulaId: string) => void;
}

export const InvestasiPromosiCard: React.FC<InvestasiPromosiCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Agregasi per Kategori Kegiatan
  const categoryAggregates = useMemo(() => {
    const map = new Map<
      string,
      {
        kategori: string;
        jumlahPelaksanaan: number;
        jumlahTamu: number;
        eventCount: number;
        sampleEvents: string[];
      }
    >();

    KEGIATAN_PROMOSI_DATA.forEach((item) => {
      const current = map.get(item.kategori) || {
        kategori: item.kategori,
        jumlahPelaksanaan: 0,
        jumlahTamu: 0,
        eventCount: 0,
        sampleEvents: [],
      };

      current.jumlahPelaksanaan += item.jumlahPelaksanaan;
      current.jumlahTamu += item.jumlahTamu;
      current.eventCount += 1;
      current.sampleEvents.push(item.namaKegiatan);

      map.set(item.kategori, current);
    });

    const arr = Array.from(map.values());
    arr.sort((a, b) => b.jumlahTamu - a.jumlahTamu);
    return arr;
  }, []);

  const grandTotalTamu = useMemo(() => {
    return KEGIATAN_PROMOSI_DATA.reduce((sum, item) => sum + item.jumlahTamu, 0);
  }, []);

  const grandTotalPelaksanaan = useMemo(() => {
    return KEGIATAN_PROMOSI_DATA.reduce((sum, item) => sum + item.jumlahPelaksanaan, 0);
  }, []);

  const maxCategoryTamu = useMemo(() => {
    return Math.max(...categoryAggregates.map((c) => c.jumlahTamu), 1);
  }, [categoryAggregates]);

  const maxCategoryPelaksanaan = useMemo(() => {
    return Math.max(...categoryAggregates.map((c) => c.jumlahPelaksanaan), 1);
  }, [categoryAggregates]);

  // Filter detail events
  const filteredEvents = useMemo(() => {
    return KEGIATAN_PROMOSI_DATA.filter((item) => {
      const matchCat = selectedCategory === 'ALL' || item.kategori === selectedCategory;
      const matchSearch =
        item.namaKegiatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sektorFokus.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Palet warna per kategori
  const categoryTheme: Record<
    string,
    { color: string; bg: string; text: string; border: string }
  > = {
    'Business Forum & Matchmaking': {
      color: '#2563EB',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
    'Pameran Luar Negeri': {
      color: '#7C3AED',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
    },
    'Pameran Dalam Negeri': {
      color: '#059669',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
    },
    'Misi Diplomatik & Dagang': {
      color: '#D97706',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
    },
    'Inbound Delegasi Investor': {
      color: '#0284C7',
      bg: 'bg-sky-50',
      text: 'text-sky-700',
      border: 'border-sky-200',
    },
  };

  // Export CSV
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'No,Nama Kegiatan,Kategori,Waktu Pelaksanaan,Lokasi,Jumlah Tamu,Jumlah Pelaksanaan,Sektor Fokus,Status\n';
    filteredEvents.forEach((r, idx) => {
      csvContent += `"${idx + 1}","${r.namaKegiatan}","${r.kategori}","${r.waktuPelaksanaan}","${r.lokasi}","${r.jumlahTamu}","${r.jumlahPelaksanaan}","${r.sektorFokus}","${r.status}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tentatif_kegiatan_promosi_investasi.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id="investasi-promosi-card"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
    >
      {/* 1. Header */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-100/70 border border-purple-300/60 flex items-center justify-center text-purple-800 shrink-0">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                TENTATIF KEGIATAN PROMOSI
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200 font-mono">
                Promosi Investasi &amp; Pameran
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Visualisasi metrik per Kategori Kegiatan: Jumlah Tamu / Delegasi dan Jumlah Pelaksanaan Kegiatan
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => onOpenFormulaModal('kpi_investasi_promosi')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Lihat Metrik Kegiatan Promosi"
          >
            <ExternalLink className="w-3.5 h-3.5 text-purple-600" />
            <span>Info Metrik</span>
          </button>
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Ekspor data promosi ke format CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Visualisasi Metrik Per Kategori Kegiatan (Jumlah Tamu & Jumlah Pelaksanaan) */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span>Matriks Kategori: Jumlah Tamu/Delegasi vs Jumlah Pelaksanaan Kegiatan</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Klik kartu kategori untuk memfilter rincian jadwal kegiatan di bawah
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <div>
              <span className="text-slate-500 mr-1">Total Pelaksanaan:</span>
              <span className="font-black text-slate-900">{grandTotalPelaksanaan} Sesi</span>
            </div>
            <span className="text-slate-300">•</span>
            <div>
              <span className="text-slate-500 mr-1">Total Tamu:</span>
              <span className="font-black text-purple-700">{grandTotalTamu.toLocaleString('id-ID')} Orang</span>
            </div>
          </div>
        </div>

        {/* 5 Kartu Kategori Kegiatan dengan Visual Dual-Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {categoryAggregates.map((cat) => {
            const isSelected = selectedCategory === cat.kategori;
            const theme = categoryTheme[cat.kategori] || {
              color: '#64748B',
              bg: 'bg-slate-50',
              text: 'text-slate-700',
              border: 'border-slate-200',
            };
            const tamuWidth = Math.round((cat.jumlahTamu / maxCategoryTamu) * 100);
            const pelaksanaanWidth = Math.round(
              (cat.jumlahPelaksanaan / maxCategoryPelaksanaan) * 100
            );

            return (
              <div
                key={cat.kategori}
                onClick={() => setSelectedCategory(isSelected ? 'ALL' : cat.kategori)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50/50 ring-2 ring-purple-400/40 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
                }`}
                title={`Klik untuk filter jadwal ke ${cat.kategori}`}
              >
                <div>
                  {/* Badge & Title */}
                  <div className="mb-2.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold font-mono mb-1.5 ${theme.bg} ${theme.text} border ${theme.border}`}
                    >
                      {cat.eventCount} Agenda
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                      {cat.kategori}
                    </h4>
                  </div>

                  {/* Metrik 1: Jumlah Tamu / Delegasi */}
                  <div className="space-y-1 mb-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium flex items-center gap-1">
                        <Users className="w-3 h-3 text-purple-600" />
                        <span>Jumlah Tamu:</span>
                      </span>
                      <span className="font-mono font-black text-purple-800">
                        {cat.jumlahTamu.toLocaleString('id-ID')}
                      </span>
                    </div>
                    {/* Bar Tamu */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(15, tamuWidth)}%`,
                          backgroundColor: theme.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Metrik 2: Jumlah Pelaksanaan Kegiatan */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-600" />
                        <span>Pelaksanaan:</span>
                      </span>
                      <span className="font-mono font-bold text-slate-900">
                        {cat.jumlahPelaksanaan} Kali
                      </span>
                    </div>
                    {/* Bar Pelaksanaan */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-slate-700 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(20, pelaksanaanWidth)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{isSelected ? '✓ Filter Aktif' : 'Klik filter'}</span>
                  <span>Rata² {Math.round(cat.jumlahTamu / cat.jumlahPelaksanaan)}/sesi</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bar Kontrol Filter Kategori & Pencarian */}
      <div className="p-3 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">Semua Kategori Kegiatan</option>
            <option value="Business Forum & Matchmaking">Business Forum &amp; Matchmaking</option>
            <option value="Pameran Luar Negeri">Pameran Luar Negeri</option>
            <option value="Pameran Dalam Negeri">Pameran Dalam Negeri</option>
            <option value="Misi Diplomatik & Dagang">Misi Diplomatik &amp; Dagang</option>
            <option value="Inbound Delegasi Investor">Inbound Delegasi Investor</option>
          </select>
          {selectedCategory !== 'ALL' && (
            <button
              onClick={() => setSelectedCategory('ALL')}
              className="text-[11px] text-purple-600 hover:underline font-medium"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kegiatan / kota tujuan..."
            className="w-full pl-7 pr-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-purple-500 font-sans"
          />
        </div>
      </div>

      {/* 4. Tabel Jadwal Tentatif Kegiatan Promosi */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-sans text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
              <th className="py-2.5 px-3 w-12 text-center">No</th>
              <th className="py-2.5 px-3">Nama Kegiatan Promosi</th>
              <th className="py-2.5 px-3">Kategori Kegiatan</th>
              <th className="py-2.5 px-3">Waktu &amp; Lokasi</th>
              <th className="py-2.5 px-3 text-right">Jumlah Tamu</th>
              <th className="py-2.5 px-3 text-center">Pelaksanaan</th>
              <th className="py-2.5 px-3">Sektor Fokus</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  Tidak ada agenda kegiatan promosi yang sesuai filter
                </td>
              </tr>
            ) : (
              filteredEvents.map((row, idx) => (
                <tr key={row.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {row.namaKegiatan}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10.5px] font-semibold ${
                        categoryTheme[row.kategori]?.bg || 'bg-slate-100'
                      } ${categoryTheme[row.kategori]?.text || 'text-slate-800'}`}
                    >
                      {row.kategori}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 text-[11.5px]">
                    <div className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3 text-purple-600 shrink-0" />
                      <span>{row.waktuPelaksanaan}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10.5px] text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>{row.lokasi}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-purple-800 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <Users className="w-3 h-3 text-purple-500" />
                      <span>{row.jumlahTamu.toLocaleString('id-ID')} Orang</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-900 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {row.jumlahPelaksanaan}x Kegiatan
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 text-[11px]">
                    {row.sektorFokus}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
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
          Menampilkan {filteredEvents.length} dari {KEGIATAN_PROMOSI_DATA.length} agenda kegiatan promosi investasi
        </span>
        <span className="text-slate-400 font-sans text-[11px]">
          Metrik Ditampilkan: [Kategori Kegiatan], [Jumlah Tamu], dan [Jumlah Pelaksanaan Kegiatan]
        </span>
      </div>
    </div>
  );
};
