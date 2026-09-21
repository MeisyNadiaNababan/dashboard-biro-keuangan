import React, { useState } from 'react';
import {
  Trees,
  Search,
  CheckCircle2,
  HelpCircle,
  Filter,
} from 'lucide-react';
import { DATASET_2_ROW_PENGHIJAUAN, SUMMARY_ROW_PENGHIJAUAN } from './infrastrukturData';
import { RowPenghijauanItem } from './types';

interface DatasetRowPenghijauanCardProps {
  onOpenFormula: (kpi: 'kpi-row-penghijauan') => void;
}

export const DatasetRowPenghijauanCard: React.FC<DatasetRowPenghijauanCardProps> = ({
  onOpenFormula,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<RowPenghijauanItem | null>(null);

  const filteredItems = DATASET_2_ROW_PENGHIJAUAN.filter((item) => {
    const matchSearch =
      searchQuery === '' ||
      item.namaPemohon.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nomorIzin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lokasiRuasJalan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKategori = filterKategori === 'Semua' || item.kategoriPenghijauan === filterKategori;
    return matchSearch && matchKategori;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
            <Trees className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                DATASET NO. 2
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                Rekapitulasi Perizinan Pemanfaatan ROW untuk Penghijauan
              </h3>
            </div>
            <p className="text-[10.5px] text-slate-500">
              Atribut Resmi: NOMOR SURAT, TANGGAL, NAMA PEMOHON, LOKASI, JENIS PENGHIJAUAN, LUAS PENGHIJAUAN, TMT (Hal. 48)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={() => onOpenFormula('kpi-row-penghijauan')}
            className="text-[10.5px] text-emerald-700 hover:text-emerald-900 font-semibold px-2 py-1 rounded bg-emerald-50 border border-emerald-200 flex items-center gap-1"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Formula RTH</span>
          </button>
        </div>
      </div>

      {/* Mini Metric Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 p-2 rounded-lg bg-emerald-50/50 border border-emerald-200/80 text-[11px]">
        <div>
          <span className="text-slate-500 text-[10px] block">Total Izin Penghijauan:</span>
          <span className="font-bold text-slate-900 font-mono text-sm">
            {SUMMARY_ROW_PENGHIJAUAN.totalPerizinan} Izin
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Total Luas Ruang Hijau:</span>
          <span className="font-bold text-emerald-800 font-mono text-sm">
            {(SUMMARY_ROW_PENGHIJAUAN.totalLuasRuangHijauM2 / 10000).toFixed(1)} Ha
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Total Pohon Ditanam:</span>
          <span className="font-bold text-emerald-800 font-mono text-sm">
            {SUMMARY_ROW_PENGHIJAUAN.totalPohonDitanam.toLocaleString('id-ID')} Pohon
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Kondisi Terawat:</span>
          <span className="font-bold text-slate-800 text-[11px] block">
            {SUMMARY_ROW_PENGHIJAUAN.status.aktifTerawat} Lokasi (79.1%)
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2.5 text-xs">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari pemohon, nomor izin, ruas jalan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <span className="text-[10.5px] text-slate-500 shrink-0">Kategori:</span>
          {['Semua', 'Penataan Jalur Hijau Median Jalan', 'Adopsi Taman Korporasi CSR', 'Penanaman Pohon Pelindung Koridor', 'Buffer Zone Konservasi'].map(
            (kat) => {
              const label =
                kat === 'Semua'
                  ? 'Semua'
                  : kat.includes('Median')
                  ? 'Median Jalan'
                  : kat.includes('CSR')
                  ? 'Taman CSR'
                  : kat.includes('Pohon')
                  ? 'Pohon Koridor'
                  : 'Buffer Zone';

              return (
                <button
                  key={kat}
                  onClick={() => setFilterKategori(kat)}
                  className={`px-2 py-1 rounded text-[10.5px] font-medium whitespace-nowrap transition-colors ${
                    filterKategori === kat
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Compact Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase font-mono">
              <th className="py-2 px-2.5">NOMOR SURAT & TGL</th>
              <th className="py-2 px-2.5">PEMOHON</th>
              <th className="py-2 px-2.5">JENIS PENGHIJAUAN</th>
              <th className="py-2 px-2.5">LOKASI KEGIATAN</th>
              <th className="py-2 px-2.5 text-right">LUAS AREA</th>
              <th className="py-2 px-2.5 text-right">POHON</th>
              <th className="py-2 px-2.5 text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="hover:bg-emerald-50/40 cursor-pointer transition-colors"
              >
                <td className="py-2 px-2.5">
                  <div className="font-mono font-bold text-emerald-800 text-[10.5px]">
                    {item.nomorIzin}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {item.tanggalTerbit}
                  </div>
                </td>
                <td className="py-2 px-2.5 font-medium text-slate-900 max-w-[170px] truncate">
                  {item.namaPemohon}
                </td>
                <td className="py-2 px-2.5">
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700">
                    {item.kategoriPenghijauan}
                  </span>
                </td>
                <td className="py-2 px-2.5 text-slate-600 max-w-[180px] truncate">
                  {item.lokasiRuasJalan} ({item.wilayah})
                </td>
                <td className="py-2 px-2.5 text-right font-mono font-bold text-slate-900">
                  {item.luasAreaM2.toLocaleString('id-ID')} m²
                </td>
                <td className="py-2 px-2.5 text-right font-mono text-emerald-700 font-semibold">
                  {item.jumlahPohonDitanam}
                </td>
                <td className="py-2 px-2.5 text-center">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[9.5px] font-semibold ${
                      item.statusIzin === 'Aktif Terawat'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}
                  >
                    {item.statusIzin}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Item Detail Drawer */}
      {selectedItem && (
        <div className="mt-3 p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-200">
            <span className="font-bold text-emerald-900">
              Detail Perizinan Penghijauan: {selectedItem.nomorIzin}
            </span>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-slate-400 hover:text-slate-700 text-xs font-bold"
            >
              ✕ Tutup
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10.5px]">
            <div>
              <span className="text-slate-500 block">Pemohon:</span>
              <span className="font-semibold text-slate-800">{selectedItem.namaPemohon}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Kategori:</span>
              <span className="font-semibold text-slate-800">{selectedItem.kategoriPenghijauan}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Luas RTH:</span>
              <span className="font-semibold text-slate-800 font-mono">{selectedItem.luasAreaM2.toLocaleString('id-ID')} m²</span>
            </div>
            <div>
              <span className="text-slate-500 block">Jenis Tanaman:</span>
              <span className="font-semibold text-slate-800">{selectedItem.jenisTanaman}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 block">Ruas Jalan:</span>
              <span className="font-semibold text-slate-800">{selectedItem.lokasiRuasJalan}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Jumlah Bibit:</span>
              <span className="font-semibold text-emerald-700 font-mono">{selectedItem.jumlahPohonDitanam} Pohon</span>
            </div>
            <div>
              <span className="text-slate-500 block">Status Lapangan:</span>
              <span className="font-semibold text-emerald-700">{selectedItem.statusIzin}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
