import React, { useState, useMemo } from 'react';
import { PDSI_CALCULATED_FIELDS, PDSI_DATA_CATALOG, PdsiCalculatedField, PdsiDataCatalogItem } from '../../data/pdsiData';
import { Search, Copy, Check, Calculator, BookOpen, Layers, Filter, FileCode2, ShieldAlert, Database, Table as TableIcon, FileText } from 'lucide-react';

export const PdsiKamusRumusView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'formulas' | 'data_catalog'>('formulas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSifat, setSelectedSifat] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['ALL', 'Infrastruktur & DC', 'Keamanan Siber', 'Layanan & Helpdesk', 'Tata Kelola SPBE & Data'];

  const filteredFields = useMemo(() => {
    return PDSI_CALCULATED_FIELDS.filter((field) => {
      const matchSearch =
        !searchTerm ||
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.primaryTable.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'ALL' || field.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  const filteredCatalog = useMemo(() => {
    return PDSI_DATA_CATALOG.filter((item) => {
      const matchSearch =
        !searchTerm ||
        item.namaData.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.jenisData.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tabelDatabase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.atributData.some((attr) => attr.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchSifat = selectedSifat === 'ALL' || item.sifatData === selectedSifat;
      return matchSearch && matchSifat;
    });
  }, [searchTerm, selectedSifat]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4 font-sans select-none">
      {/* Top Banner */}
      <div className="p-4 bg-[#0F1E36] text-white rounded-xl border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight">
                Kamus Rumus &amp; Data Catalog PDSI BP Batam
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/80 border border-blue-400 text-blue-200">
                Tableau Data Dictionary
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Definisi teknis, formula Tableau Calculated Fields &amp; data catalog resmi unit Pusat Data dan Sistem Informasi (PDSI)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">
            21 Item Data Catalog Resmi
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">
            {PDSI_CALCULATED_FIELDS.length} Formula Siap Pakai
          </span>
        </div>
      </div>

      {/* Main Mode Tabs: Calculated Fields vs 21 Katalog Data */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('formulas');
              setSearchTerm('');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'formulas'
                ? 'bg-[#1F3864] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculated Fields ({PDSI_CALCULATED_FIELDS.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('data_catalog');
              setSearchTerm('');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'data_catalog'
                ? 'bg-[#1F3864] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>21 Katalog Data PDF (Hal 40-43)</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
          {activeTab === 'formulas'
            ? `Menampilkan ${filteredFields.length} dari ${PDSI_CALCULATED_FIELDS.length} formula`
            : `Menampilkan ${filteredCatalog.length} dari ${PDSI_DATA_CATALOG.length} tabel katalog`}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeTab === 'formulas'
                ? 'Cari rumus calculated field, tag, atau nama tabel PDSI...'
                : 'Cari tabel katalog, atribut field, jenis data, atau kata kunci...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ×
            </button>
          )}
        </div>

        {activeTab === 'formulas' ? (
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1F3864] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {['ALL', 'TERBUKA', 'TERBATAS', 'TERTUTUP'].map((sifat) => (
              <button
                key={sifat}
                onClick={() => setSelectedSifat(sifat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  selectedSifat === sifat
                    ? 'bg-[#1F3864] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sifat === 'ALL' ? 'Semua Sifat Data' : sifat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VIEW CONTENT: CALCULATED FIELDS TAB */}
      {activeTab === 'formulas' ? (
        <div className="space-y-3">
          {filteredFields.map((field) => (
            <div
              key={field.id}
              className="p-4 bg-white border border-slate-200 hover:border-blue-300 rounded-xl shadow-2xs transition-all space-y-3"
            >
              {/* Header info */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                      {field.tag}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      Item #{field.itemNo} • {field.catalogName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {field.category}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                        field.sifatData === 'TERBUKA'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : field.sifatData === 'TERBATAS'
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-rose-50 text-rose-700 border-rose-300'
                      }`}
                    >
                      SIFAT: {field.sifatData}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{field.name}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {field.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono block">Lokasi PDF</span>
                  <span className="text-xs font-semibold text-slate-700">{field.pdfPage}</span>
                  <span className="text-[10px] text-blue-600 font-mono block mt-0.5">
                    Format: {field.format}
                  </span>
                </div>
              </div>

              {/* Formula Snippet Box */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
                <div className="overflow-x-auto text-sky-300">
                  <code>{field.formula}</code>
                </div>
                <button
                  onClick={() => handleCopy(field.id, field.formula)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors text-[11px]"
                  title="Salin Formula ke Clipboard"
                >
                  {copiedId === field.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* Attributes in Data Catalog (Item di PDF) */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="font-semibold text-slate-500 mr-1">Field Attributes:</span>
                {field.attributes.map((attr) => (
                  <span
                    key={attr}
                    className="px-1.5 py-0.5 bg-slate-100 text-slate-700 font-mono rounded border border-slate-200"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* VIEW CONTENT: 21 DATA CATALOG TABLE */
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-700" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Tabel Katalog Data PDSI BP Batam (21 Dataset Dokumen PDF Hal 40-43)
              </h4>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Menampilkan {filteredCatalog.length} dataset
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#1F3864] text-white font-semibold text-[11px]">
                  <th className="py-2.5 px-3 w-12 text-center border-r border-blue-800">No</th>
                  <th className="py-2.5 px-4 w-72 border-r border-blue-800">Nama Data Katalog</th>
                  <th className="py-2.5 px-3 w-40 border-r border-blue-800">Jenis &amp; Periode</th>
                  <th className="py-2.5 px-3 w-28 text-center border-r border-blue-800">Sifat Data</th>
                  <th className="py-2.5 px-4 border-r border-blue-800">Atribut Field Dokumen PDF</th>
                  <th className="py-2.5 px-4 w-72">Deskripsi &amp; Penggunaan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filteredCatalog.map((item) => (
                  <tr key={item.no} className="hover:bg-blue-50/50 transition-colors">
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-500 bg-slate-50/70 border-r border-slate-200">
                      {item.no}
                    </td>
                    <td className="py-3 px-4 border-r border-slate-200 font-medium">
                      <div className="font-bold text-slate-900 text-xs">{item.namaData}</div>
                      <div className="font-mono text-[10px] text-blue-700 mt-0.5">
                        Tabel: {item.tabelDatabase}
                      </div>
                    </td>
                    <td className="py-3 px-3 border-r border-slate-200">
                      <div className="text-[11px] font-medium text-slate-800">{item.jenisData}</div>
                      <span className="inline-block mt-0.5 text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {item.periodeData}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center border-r border-slate-200">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold rounded-full border ${
                          item.sifatData === 'TERBUKA'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : item.sifatData === 'TERBATAS'
                            ? 'bg-amber-50 text-amber-700 border-amber-300'
                            : 'bg-rose-50 text-rose-700 border-rose-300'
                        }`}
                      >
                        {item.sifatData}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-r border-slate-200">
                      <div className="flex flex-wrap gap-1">
                        {item.atributData.map((attr) => (
                          <span
                            key={attr}
                            className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded border border-slate-200"
                          >
                            {attr}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600 leading-relaxed">
                      {item.keterangan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

