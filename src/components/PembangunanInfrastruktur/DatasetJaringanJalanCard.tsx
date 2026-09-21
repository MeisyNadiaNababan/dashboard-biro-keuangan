import React, { useState } from 'react';
import {
  Route,
  Search,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Filter,
} from 'lucide-react';
import { DATASET_3_RUAS_JARINGAN_JALAN, SUMMARY_RUAS_JARINGAN_JALAN } from './infrastrukturData';
import { RuasJaringanJalanItem } from './types';

interface DatasetJaringanJalanCardProps {
  onOpenFormula: (kpi: 'kpi-ruas-jalan') => void;
}

export const DatasetJaringanJalanCard: React.FC<DatasetJaringanJalanCardProps> = ({
  onOpenFormula,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKondisi, setFilterKondisi] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<RuasJaringanJalanItem | null>(null);

  const filteredItems = DATASET_3_RUAS_JARINGAN_JALAN.filter((item) => {
    const kode = item.kodeRuas || item.nomorRuas || '';
    const matchSearch =
      searchQuery === '' ||
      item.namaRuasJalan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.wilayah.toLowerCase().includes(searchQuery.toLowerCase());
    
    const kondisiLabel = item.kondisiJalan || (item.persentaseMantap && item.persentaseMantap >= 90 ? 'Baik' : 'Sedang');
    const matchKondisi = filterKondisi === 'Semua' || kondisiLabel === filterKondisi;
    return matchSearch && matchKondisi;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
            <Route className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                DATASET NO. 3
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                Jaringan Jalan (Eksisting) BP Batam
              </h3>
            </div>
            <p className="text-[10.5px] text-slate-500">
              Atribut: RUAS, NAMOBJ, KLSRJL, SHAPE_LENG, LBRJLN, LKONOF (Kondisi Mantap), UTILITAS, WLYRJL (Hal. 48-49)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={() => onOpenFormula('kpi-ruas-jalan')}
            className="text-[10.5px] text-indigo-700 hover:text-indigo-900 font-semibold px-2 py-1 rounded bg-indigo-50 border border-indigo-200 flex items-center gap-1"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Formula Mantap (LKONOF)</span>
          </button>
        </div>
      </div>

      {/* Mini Metric Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 p-2 rounded-lg bg-indigo-50/40 border border-indigo-200/80 text-[11px]">
        <div>
          <span className="text-slate-500 text-[10px] block">Total Panjang Jalan:</span>
          <span className="font-bold text-indigo-950 font-mono text-sm">
            {SUMMARY_RUAS_JARINGAN_JALAN.totalPanjangJalanKm} Km
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Indeks Kemantapan (LKONOF):</span>
          <span className="font-bold text-indigo-800 font-mono text-sm">
            {SUMMARY_RUAS_JARINGAN_JALAN.kondisiJalan.persentaseMantap}%
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Kondisi Baik &amp; Sedang:</span>
          <span className="font-bold text-emerald-800 font-mono text-sm">
            {SUMMARY_RUAS_JARINGAN_JALAN.kondisiJalan.baikKm + SUMMARY_RUAS_JARINGAN_JALAN.kondisiJalan.sedangKm} Km
          </span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Perlu Pemeliharaan:</span>
          <span className="font-bold text-amber-700 font-mono text-sm">
            {SUMMARY_RUAS_JARINGAN_JALAN.kondisiJalan.rusakRinganKm + SUMMARY_RUAS_JARINGAN_JALAN.kondisiJalan.rusakBeratKm} Km
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2.5 text-xs">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama ruas, nomor ruas, wilayah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <span className="text-[10.5px] text-slate-500 shrink-0">Kondisi LKONOF:</span>
          {['Semua', 'Baik', 'Sedang', 'Rusak Ringan'].map((k) => (
            <button
              key={k}
              onClick={() => setFilterKondisi(k)}
              className={`px-2 py-1 rounded text-[10.5px] font-medium whitespace-nowrap transition-colors ${
                filterKondisi === k
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Compact Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase font-mono">
              <th className="py-2 px-2.5">KODE RUAS</th>
              <th className="py-2 px-2.5">NAMA RUAS JALAN (NAMOBJ)</th>
              <th className="py-2 px-2.5">KLASIFIKASI</th>
              <th className="py-2 px-2.5 text-right">PANJANG</th>
              <th className="py-2 px-2.5 text-right">LEBAR</th>
              <th className="py-2 px-2.5 text-center">KEMANTAPAN</th>
              <th className="py-2 px-2.5 text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map((item) => {
              const kode = item.kodeRuas || item.nomorRuas || item.id;
              const klas = item.klasifikasiFungsi || item.klasifikasiJalan || 'Arteri Primer';
              const mantap = item.persentaseMantap || 90;
              const statusKondisi = item.kondisiJalan || (mantap >= 90 ? 'Baik' : 'Sedang');

              return (
                <tr
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="hover:bg-indigo-50/40 cursor-pointer transition-colors"
                >
                  <td className="py-2 px-2.5 font-mono font-bold text-indigo-800 text-[10.5px]">
                    {kode}
                  </td>
                  <td className="py-2 px-2.5 font-medium text-slate-900 max-w-[210px] truncate">
                    {item.namaRuasJalan}
                    <span className="block text-[10px] text-slate-400 font-normal">{item.wilayah}</span>
                  </td>
                  <td className="py-2 px-2.5">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9.5px] font-medium bg-slate-100 text-slate-700">
                      {klas}
                    </span>
                  </td>
                  <td className="py-2 px-2.5 text-right font-mono font-bold text-slate-900">
                    {item.panjangKm.toFixed(1)} Km
                  </td>
                  <td className="py-2 px-2.5 text-right font-mono text-slate-700">
                    {item.lebarMeter} m
                  </td>
                  <td className="py-2 px-2.5 text-center font-mono font-bold text-indigo-800">
                    {mantap}%
                  </td>
                  <td className="py-2 px-2.5 text-center">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[9.5px] font-semibold ${
                        statusKondisi === 'Baik'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : statusKondisi === 'Sedang'
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {statusKondisi}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Item Detail Drawer */}
      {selectedItem && (
        <div className="mt-3 p-3 rounded-lg bg-indigo-50/60 border border-indigo-200 text-xs">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-indigo-200">
            <span className="font-bold text-indigo-900">
              Detail Ruas: {selectedItem.kodeRuas || selectedItem.nomorRuas} • {selectedItem.namaRuasJalan}
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
              <span className="text-slate-500 block">Klasifikasi (KLSRJL):</span>
              <span className="font-semibold text-slate-800">{selectedItem.klasifikasiFungsi || selectedItem.klasifikasiJalan}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Wilayah (WLYRJL):</span>
              <span className="font-semibold text-slate-800">{selectedItem.wilayah}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Panjang (SHAPE_LENG):</span>
              <span className="font-semibold text-slate-800 font-mono">{selectedItem.panjangKm} Km</span>
            </div>
            <div>
              <span className="text-slate-500 block">Lebar Jalan (LBRJLN):</span>
              <span className="font-semibold text-slate-800 font-mono">{selectedItem.lebarMeter} meter</span>
            </div>
            <div>
              <span className="text-slate-500 block">Kemantapan Jalan:</span>
              <span className="font-semibold text-emerald-700 font-mono">{selectedItem.persentaseMantap}% Mantap</span>
            </div>
            <div>
              <span className="text-slate-500 block">Volume Lalu Lintas (LHR):</span>
              <span className="font-semibold text-slate-800 font-mono">{selectedItem.volumeLaluLintasHarian?.toLocaleString('id-ID')} kend/hari</span>
            </div>
            <div>
              <span className="text-slate-500 block">Tahun Peningkatan:</span>
              <span className="font-semibold text-slate-800 font-mono">{selectedItem.tahunPeningkatanTerakhir}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Indeks Kekasaran (IRI):</span>
              <span className="font-semibold text-slate-800 font-mono">{selectedItem.indeksIri} m/km</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
