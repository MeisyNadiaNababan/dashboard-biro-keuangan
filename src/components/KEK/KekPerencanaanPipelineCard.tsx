import React, { useState, useMemo } from 'react';
import {
  FileText,
  MapPin,
  Sparkles,
  Download,
  Search,
  Building2,
  Maximize2,
} from 'lucide-react';
import { KEK_PERENCANAAN_DATA, KekPerencanaanItem } from '../../data/kekData';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface KekPerencanaanPipelineCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const KekPerencanaanPipelineCard: React.FC<KekPerencanaanPipelineCardProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showTableauGuide, setShowTableauGuide] = useState<boolean>(false);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return KEK_PERENCANAAN_DATA;
    const q = searchQuery.toLowerCase();
    return KEK_PERENCANAAN_DATA.filter(
      (item) =>
        item.namaKek.toLowerCase().includes(q) ||
        item.lokasi.toLowerCase().includes(q) ||
        item.pengusul.toLowerCase().includes(q) ||
        item.kegiatan.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Aggregate Metrics for Atasan / Pimpinan
  const totalUsulan = KEK_PERENCANAAN_DATA.length;
  const totalLuasRencana = KEK_PERENCANAAN_DATA.reduce((acc, curr) => acc + curr.luas, 0);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(num);
  };

  const handleExportCsv = () => {
    const headers = [
      'NO',
      'NAMA_KEK',
      'LOKASI',
      'LUAS_HA',
      'KEGIATAN',
      'PENGUSUL',
    ];
    const rows = KEK_PERENCANAAN_DATA.map((item, idx) => [
      idx + 1,
      `"${item.namaKek}"`,
      `"${item.lokasi}"`,
      item.luas,
      `"${item.kegiatan}"`,
      `"${item.pengusul}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Daftar_Perencanaan_KEK_Batam_Tableau.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div
      id="kek-perencanaan-section"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden font-sans"
    >
      {/* 1. Header Card Sederhana & Jelas */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100/80 border border-indigo-300/80 flex items-center justify-center text-indigo-800 shrink-0 shadow-2xs">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                DAFTAR PERENCANAAN / PENGUSULAN KAWASAN EKONOMI KHUSUS (KEK)
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 font-mono">
                Dataset No. 5 • Data Statistik
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Daftar perencanaan dan usulan pembentukan KEK baru di Batam beserta lokasi, luas rencana area, kegiatan, dan badan usaha pengusul
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => setShowTableauGuide(!showTableauGuide)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors cursor-pointer ${
              showTableauGuide
                ? 'bg-indigo-600 text-white border-indigo-700'
                : 'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50'
            }`}
            title="Panduan Implementasi Tableau"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Panduan Tableau</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Ekspor CSV untuk Tableau"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Executive Quick Summary Strip */}
      <div className="px-4 py-2.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Total Usulan KEK</div>
              <div className="text-sm font-bold text-white font-mono">{totalUsulan} Kawasan</div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Total Rencana Luas</div>
              <div className="text-sm font-bold text-sky-300 font-mono">{formatNumber(totalLuasRencana)} Ha</div>
            </div>
          </div>
        </div>

        {/* Pencarian Simpel */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama KEK, lokasi, kegiatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-400 transition-colors"
          />
        </div>
      </div>

      {/* 3. Panduan Implementasi Tableau (Collapsible) */}
      {showTableauGuide && (
        <div className="p-3 bg-indigo-50/70 border-b border-indigo-200">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>PANDUAN IMPLEMENTASI DI TABLEAU (DAFTAR PERENCANAAN KEK)</span>
            </div>
            <span className="text-[10.5px] font-mono text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
              Text Table / Horizontal Bar Chart
            </span>
          </div>
          <TableauShelvesBadge
            showMe="Text Table or Horizontal Bar"
            rows="NAMA KEK, LOKASI, PENGUSUL"
            columns="SUM(LUAS)"
            color="PENGUSUL"
            text="SUM(LUAS)"
            tooltip="KEGIATAN, LOKASI"
            filters="NAMA KEK"
            calculatedField="Rata-rata Luas Usulan = AVG([LUAS])"
          />
        </div>
      )}

      {/* 4. TABEL UTAMA (Hanya menampilkan No, Nama KEK, Lokasi, Luas, Kegiatan, Pengusul) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-bold text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-3 w-12 text-center">No</th>
              <th className="py-2.5 px-3 min-w-[200px]">Nama KEK</th>
              <th className="py-2.5 px-3 min-w-[220px]">Lokasi</th>
              <th className="py-2.5 px-3 text-right min-w-[110px]">Luas (Ha)</th>
              <th className="py-2.5 px-3 min-w-[340px]">Kegiatan</th>
              <th className="py-2.5 px-3 min-w-[240px]">Pengusul</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80">
            {filteredItems.map((item, idx) => (
              <tr
                key={item.id}
                className="hover:bg-indigo-50/40 transition-colors"
              >
                {/* No */}
                <td className="py-3 px-3 text-center text-slate-400 font-mono text-[11px]">
                  {idx + 1}
                </td>

                {/* Nama KEK */}
                <td className="py-3 px-3">
                  <div className="font-bold text-slate-900 text-[12px]">
                    {item.namaKek}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {item.kodeUsulan}
                  </div>
                </td>

                {/* Lokasi */}
                <td className="py-3 px-3 text-slate-600 text-[11px] leading-snug">
                  <div className="flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                    <span>{item.lokasi}</span>
                  </div>
                </td>

                {/* Luas */}
                <td className="py-3 px-3 text-right font-mono font-bold text-sky-700 text-[12px] whitespace-nowrap">
                  {formatNumber(item.luas)}
                </td>

                {/* Kegiatan */}
                <td className="py-3 px-3 text-slate-700 text-[11px] leading-relaxed">
                  {item.kegiatan}
                </td>

                {/* Pengusul */}
                <td className="py-3 px-3 text-slate-800 font-medium text-[11px] leading-snug">
                  {item.pengusul}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. Simple Clean Footer */}
      <div className="p-2.5 px-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
        <span>Menampilkan <strong>{filteredItems.length}</strong> dari <strong>{totalUsulan}</strong> usulan KEK</span>
        <span className="font-mono text-slate-400">Direktorat Pengembangan KPBPBB &amp; KEK — BP Batam</span>
      </div>
    </div>
  );
};
