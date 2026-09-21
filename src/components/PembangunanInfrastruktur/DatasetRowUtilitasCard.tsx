import React, { useState } from 'react';
import {
  Zap,
  Search,
  CheckCircle2,
  Clock,
  HelpCircle,
  ChevronDown,
  Filter,
  FileText,
} from 'lucide-react';
import { DATASET_1_ROW_UTILITAS, SUMMARY_ROW_UTILITAS } from './infrastrukturData';
import { RowUtilitasItem } from './types';

interface DatasetRowUtilitasCardProps {
  onOpenFormula: (kpi: 'kpi-row-utilitas') => void;
}

export const DatasetRowUtilitasCard: React.FC<DatasetRowUtilitasCardProps> = ({
  onOpenFormula,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterJenis, setFilterJenis] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<RowUtilitasItem | null>(null);

  const filteredItems = DATASET_1_ROW_UTILITAS.filter((item) => {
    const matchSearch =
      searchQuery === '' ||
      item.namaPemohon.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nomorIzin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lokasiRuasJalan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchJenis = filterJenis === 'Semua' || item.jenisUtilitas === filterJenis;
    return matchSearch && matchJenis;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                DATASET NO. 1
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                Rekapitulasi Perizinan Pemanfaatan ROW untuk Utilitas
              </h3>
            </div>
            <p className="text-[10.5px] text-slate-500">
              Atribut Resmi: NOMOR SURAT, TGL, NAMA PEMOHON, LOKASI, JENIS UTILITAS, GALIAN TERBUKA, CROSSING, TOTAL GALIAN (Hal. 48)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={() => onOpenFormula('kpi-row-utilitas')}
            className="text-[10.5px] text-sky-700 hover:text-sky-900 font-semibold px-2 py-1 rounded bg-sky-50 border border-sky-200 flex items-center gap-1"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Formula Rekondisi</span>
          </button>
        </div>
      </div>

      {/* Mini Metric Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px]">
        <div>
          <span className="text-slate-500 text-[10px] block">Total Izin Terbit:</span>
          <span className="font-bold text-slate-900 font-mono text-sm">
            {SUMMARY_ROW_UTILITAS.totalIzinTerbit} Izin
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Total Panjang Galian:</span>
          <span className="font-bold text-sky-800 font-mono text-sm">
            {SUMMARY_ROW_UTILITAS.totalPanjangGalianKm} Km
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Tingkat Rekondisi Aspal:</span>
          <span className="font-bold text-emerald-800 font-mono text-sm">
            {SUMMARY_ROW_UTILITAS.tingkatRekondisiPersen}%
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Utilitas Dominan:</span>
          <span className="font-bold text-slate-800 text-[11px] truncate block">
            Fiber Optik (52.8%)
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
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <span className="text-[10.5px] text-slate-500 shrink-0">Filter Utilitas:</span>
          {['Semua', 'Fiber Optik (Telekomunikasi)', 'Pipa Air Bersih / SPAM', 'Pipa Gas Bumi (PGN)', 'Kabel Listrik Bawah Tanah (PLN)'].map(
            (jenis) => {
              const label =
                jenis === 'Semua'
                  ? 'Semua'
                  : jenis.includes('Fiber')
                  ? 'Fiber Optik'
                  : jenis.includes('Air')
                  ? 'Air SPAM'
                  : jenis.includes('Gas')
                  ? 'Pipa Gas'
                  : 'Kabel Listrik';

              return (
                <button
                  key={jenis}
                  onClick={() => setFilterJenis(jenis)}
                  className={`px-2 py-1 rounded text-[10.5px] font-medium whitespace-nowrap transition-colors ${
                    filterJenis === jenis
                      ? 'bg-sky-600 text-white font-semibold'
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
              <th className="py-2 px-2.5">NAMA PEMOHON</th>
              <th className="py-2 px-2.5">JENIS UTILITAS</th>
              <th className="py-2 px-2.5">LOKASI RUAS JALAN</th>
              <th className="py-2 px-2.5 text-right">TOTAL GALIAN</th>
              <th className="py-2 px-2.5 text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="hover:bg-sky-50/40 cursor-pointer transition-colors"
              >
                <td className="py-2 px-2.5">
                  <div className="font-mono font-bold text-sky-800 text-[10.5px]">
                    {item.nomorIzin}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {item.tanggalTerbit}
                  </div>
                </td>
                <td className="py-2 px-2.5 font-medium text-slate-900 max-w-[180px] truncate">
                  {item.namaPemohon}
                </td>
                <td className="py-2 px-2.5">
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                    {item.jenisUtilitas}
                  </span>
                </td>
                <td className="py-2 px-2.5 text-slate-600 max-w-[200px] truncate">
                  {item.lokasiRuasJalan} ({item.wilayah})
                </td>
                <td className="py-2 px-2.5 text-right font-mono font-bold text-slate-900">
                  {item.panjangGelaranMeter.toLocaleString('id-ID')} m
                </td>
                <td className="py-2 px-2.5 text-center">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[9.5px] font-semibold ${
                      item.statusIzin === 'Berlaku'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.statusIzin === 'Dalam Pengawasan Konstruksi'
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
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

      {/* Selected Item Detail Drawer/Modal */}
      {selectedItem && (
        <div className="mt-3 p-3 rounded-lg bg-sky-50/60 border border-sky-200 text-xs">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-sky-200">
            <span className="font-bold text-sky-900">
              Detail Perizinan: {selectedItem.nomorIzin}
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
              <span className="text-slate-500 block">Jenis Utilitas:</span>
              <span className="font-semibold text-slate-800">{selectedItem.jenisUtilitas}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Total Galian:</span>
              <span className="font-semibold text-slate-800 font-mono">{selectedItem.panjangGelaranMeter} m</span>
            </div>
            <div>
              <span className="text-slate-500 block">Kedalaman:</span>
              <span className="font-semibold text-slate-800 font-mono">{selectedItem.kedalamanGalianMeter} meter</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 block">Ruas Lokasi:</span>
              <span className="font-semibold text-slate-800">{selectedItem.lokasiRuasJalan}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Masa Berlaku:</span>
              <span className="font-semibold text-slate-800">{selectedItem.masaBerlakuTahun} Tahun</span>
            </div>
            <div>
              <span className="text-slate-500 block">Status Rekondisi:</span>
              <span className="font-semibold text-emerald-700">{selectedItem.statusIzin}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
