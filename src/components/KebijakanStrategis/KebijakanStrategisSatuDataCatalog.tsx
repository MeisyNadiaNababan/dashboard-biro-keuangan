import React, { useState } from 'react';
import {
  Database,
  Search,
  Download,
  Filter,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  Eye,
  ShieldAlert,
} from 'lucide-react';
import { SATU_DATA_KEBIJAKAN_STRATEGIS_CATALOG } from './kebijakanStrategisData';

interface KebijakanStrategisSatuDataCatalogProps {
  onSelectUnit?: (unitId: string) => void;
}

export const KebijakanStrategisSatuDataCatalog: React.FC<KebijakanStrategisSatuDataCatalogProps> = ({
  onSelectUnit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState('ALL');
  const [selectedSifatFilter, setSelectedSifatFilter] = useState('ALL');

  const filteredDatasets = SATU_DATA_KEBIJAKAN_STRATEGIS_CATALOG.filter((ds) => {
    const matchesSearch =
      searchTerm === '' ||
      ds.namaData.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.atributUtama.some((attr) => attr.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesUnit = selectedUnitFilter === 'ALL' || ds.unitId === selectedUnitFilter;
    const matchesSifat = selectedSifatFilter === 'ALL' || ds.sifatData === selectedSifatFilter;

    return matchesSearch && matchesUnit && matchesSifat;
  });

  const exportCsv = () => {
    const headers = ['No', 'Unit Kerja', 'Nama Dataset', 'Jenis Data', 'Periode', 'Sifat Data', 'Atribut Kunci', 'Halaman PDF'];
    const rows = filteredDatasets.map((ds) => [
      ds.no,
      `"${ds.unit}"`,
      `"${ds.namaData}"`,
      `"${ds.jenisData}"`,
      `"${ds.periodeData}"`,
      `"${ds.sifatData}"`,
      `"${ds.atributUtama.join(', ')}"`,
      `"${ds.halamanPdf}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Katalog_64_Dataset_Perkin_A2_DEP_A2_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-5 lg:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <Database className="w-4 h-4" />
            </span>
            <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-900 uppercase">
              KATALOG 45 DATASET SATU DATA · PERKIN A2 (DEP A2) (HALAMAN ATRIBUT RESMI)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Daftar lengkap dataset terstandarisasi dari 3 unit pelaksana Perkin A2 (PTSP: 17, PHKS: 7, PDSI: 21 - Total 45 Dataset).
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 self-start sm:self-center"
          title="Unduh format CSV Satu Data"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Ekspor CSV ({filteredDatasets.length})</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Unit Filter */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1">
            <span className="text-slate-500 font-medium">Unit:</span>
            <select
              value={selectedUnitFilter}
              onChange={(e) => setSelectedUnitFilter(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua 3 Unit Pelaksana (45 Dataset)</option>
              <option value="ptsp">PTSP (17 Dataset)</option>
              <option value="pusat-harmonisasi">PHKS (7 Dataset)</option>
              <option value="pdsi">PDSI (21 Dataset)</option>
            </select>
          </div>

          {/* Sifat Data Filter */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1">
            <span className="text-slate-500 font-medium">Sifat:</span>
            <select
              value={selectedSifatFilter}
              onChange={(e) => setSelectedSifatFilter(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Sifat Data</option>
              <option value="TERBUKA">TERBUKA (Publik)</option>
              <option value="TERBATAS">TERBATAS (Internal/Antar Unit)</option>
              <option value="TERTUTUP">TERTUTUP (Rahasia/Pimpinan)</option>
            </select>
          </div>
        </div>

        {/* Search Field */}
        <div className="relative min-w-[220px] max-w-sm flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari dataset, atribut, atau kata kunci..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-teal-500"
          />
        </div>
      </div>

      {/* Dataset Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold text-slate-500">
              <th className="py-2.5 px-3">No</th>
              <th className="py-2.5 px-3">Unit Produsen Data</th>
              <th className="py-2.5 px-3">Nama Dataset Resmi</th>
              <th className="py-2.5 px-2">Jenis Data</th>
              <th className="py-2.5 px-2">Periode</th>
              <th className="py-2.5 px-2">Sifat Data</th>
              <th className="py-2.5 px-3">Atribut Kunci dari Dokumen</th>
              <th className="py-2.5 px-2 text-right">Hal PDF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filteredDatasets.map((ds) => (
              <tr key={ds.no} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 px-3 font-mono text-slate-400">{ds.no}</td>
                <td className="py-2.5 px-3">
                  <span className="font-bold text-slate-800 block">{ds.unit}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Satker Pelaksana DEP A2</span>
                </td>
                <td className="py-2.5 px-3 font-bold text-slate-900">{ds.namaData}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-600">{ds.jenisData}</td>
                <td className="py-2.5 px-2 text-[11px] text-slate-600">{ds.periodeData}</td>
                <td className="py-2.5 px-2">
                  <span
                    className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded border inline-flex items-center gap-1 ${
                      ds.sifatData === 'TERBUKA'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : ds.sifatData === 'TERBATAS'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {ds.sifatData === 'TERTUTUP' && <Lock className="w-2.5 h-2.5" />}
                    {ds.sifatData === 'TERBUKA' && <Eye className="w-2.5 h-2.5" />}
                    {ds.sifatData}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-[10.5px] text-slate-600">
                  <div className="flex flex-wrap gap-1">
                    {ds.atributUtama.map((attr, idx) => (
                      <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 text-[10px]">
                        {attr}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-2.5 px-2 text-right font-mono text-[10.5px] text-slate-500 font-semibold">
                  {ds.halamanPdf}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-[11px] text-slate-500 flex items-center justify-between px-1">
        <span>Menampilkan {filteredDatasets.length} dari total 64 Dataset Satu Data BP Batam</span>
        <span className="font-mono">Sumber: Dokumen Standarisasi Atribut Satu Data 2025</span>
      </div>
    </div>
  );
};
