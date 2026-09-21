import React, { useState } from 'react';
import {
  FileCode2,
  BookOpen,
  Search,
  Filter,
  Download,
  Layers,
  ChevronDown,
  ChevronUp,
  Calculator,
  ShieldCheck,
  Building2,
  HelpCircle,
} from 'lucide-react';
import { RS_18_DATASETS, RsDatasetCatalog } from '../../data/rumahSakitData';

export const RumahSakitKamusRumusView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSifat, setSelectedSifat] = useState<string>('ALL');
  const [expandedDatasetNo, setExpandedDatasetNo] = useState<number | null>(1);

  const filteredDatasets = RS_18_DATASETS.filter((item) => {
    const matchesSearch =
      item.namaData.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.atributData.some((attr) => attr.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.keteranganPenggunaan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSifat =
      selectedSifat === 'ALL' || item.sifatData === selectedSifat;

    return matchesSearch && matchesSifat;
  });

  const toggleExpand = (no: number) => {
    setExpandedDatasetNo((prev) => (prev === no ? null : no));
  };

  return (
    <div className="space-y-3.5 font-sans">
      {/* 1. Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Halaman 19 - 21 PDF
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Satu Data BP Batam
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                Kamus Data & Formula 18 Dataset Badan Usaha Rumah Sakit (RSBP)
              </h2>
              <p className="text-xs text-slate-500">
                Katalog data resmi, atribut field basis data, sifat klasifikasi, periode pencatatan, dan sintaks kalkulasi BI Tableau.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              18 Item Dataset
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
          <div className="relative grow w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama dataset, atribut data (misal: TOTAL TARGET PNBP, INDIKATOR, NAMA TENANT)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white focus:border-emerald-500 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedSifat}
              onChange={(e) => setSelectedSifat(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Sifat Data</option>
              <option value="TERBUKA">Terbuka (Publik)</option>
              <option value="TERTUTUP">Tertutup (Internal BLU)</option>
              <option value="TERBATAS">Terbatas</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. List of 18 Datasets */}
      <div className="space-y-2.5">
        {filteredDatasets.map((ds) => {
          const isExpanded = expandedDatasetNo === ds.no;
          return (
            <div
              key={ds.no}
              className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
            >
              <div
                onClick={() => toggleExpand(ds.no)}
                className="p-3 sm:p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                    #{ds.no}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                        {ds.namaData}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          ds.sifatData === 'TERBUKA'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {ds.sifatData}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {ds.periodeData}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      Fungsi Dashboard: <strong className="text-slate-700">{ds.keteranganPenggunaan}</strong> • Dokumen: {ds.halamanPdf}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
                    {ds.atributData.length} Atribut
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Details: Attributes and Calculation Guide */}
              {isExpanded && (
                <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-100 bg-slate-50/50 text-xs">
                  <div className="font-semibold text-slate-700 text-[11px] mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    Atribut Kolom Data (Sesuai Halaman {ds.halamanPdf} Dokumen Satu Data):
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {ds.atributData.map((attr, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white border border-slate-200 rounded-md font-mono text-[11px] font-bold text-slate-800 shadow-2xs"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>

                  {/* Implementation formula mapping */}
                  <div className="p-2.5 bg-white border border-slate-200/90 rounded-lg space-y-1 text-[11px]">
                    <div className="font-semibold text-slate-800 flex items-center gap-1">
                      <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                      Pemanfaatan Dalam Dashboard Eksekutif BP Batam:
                    </div>
                    <p className="text-slate-600">
                      Tabel ini diintegrasikan ke dalam visualisasi eksekutif untuk mendukung pemantauan langsung pimpinan, menyediakan metrik agregasi, drill-down per bagian layanan, serta sinkronisasi ke tabel laporan keuangan BLU.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
