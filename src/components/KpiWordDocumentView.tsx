import React, { useState, useMemo, useEffect } from 'react';
import {
  Download,
  FileText,
  Search,
  Copy,
  Check,
  Building2,
  Server,
  ArrowLeft,
  CheckCircle2,
  Table as TableIcon,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import {
  BIRO_KEUANGAN_KPI_DATA,
  PDSI_KPI_DATA,
  KPI_DICTIONARY_DATA,
  KpiTableItem,
  downloadKpiDocxInBrowser,
} from '../utils/generateDocx';

interface KpiWordDocumentViewProps {
  activeUnitId?: string;
  onBackToDashboard?: () => void;
}

export const KpiWordDocumentView: React.FC<KpiWordDocumentViewProps> = ({
  activeUnitId = 'biro-keuangan',
  onBackToDashboard,
}) => {
  // Unit tab: default to whichever unit the user came from
  const initialUnit = activeUnitId === 'pdsi' ? 'PDSI' : 'KEUANGAN';
  const [selectedUnit, setSelectedUnit] = useState<'KEUANGAN' | 'PDSI'>(initialUnit);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'ALL' | 'Financial' | 'Executive' | 'Program Driver' | 'Operational Driver'>('ALL');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Sync if activeUnitId prop changes
  useEffect(() => {
    if (activeUnitId === 'pdsi') {
      setSelectedUnit('PDSI');
    } else if (activeUnitId === 'biro-keuangan') {
      setSelectedUnit('KEUANGAN');
    }
  }, [activeUnitId]);

  // Dataset strictly segregated by unit
  const activeDataset = useMemo(() => {
    return selectedUnit === 'KEUANGAN' ? BIRO_KEUANGAN_KPI_DATA : PDSI_KPI_DATA;
  }, [selectedUnit]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return activeDataset.filter((item) => {
      // Strategic level filter
      if (selectedLevelFilter !== 'ALL' && item.strategicLevel !== selectedLevelFilter) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        return (
          item.domain.toLowerCase().includes(term) ||
          item.kpiCode.toLowerCase().includes(term) ||
          item.kpiName.toLowerCase().includes(term) ||
          item.strategicLevel.toLowerCase().includes(term) ||
          item.definition.toLowerCase().includes(term) ||
          item.formula.toLowerCase().includes(term)
        );
      }

      return true;
    });
  }, [activeDataset, searchTerm, selectedLevelFilter]);

  const handleDownloadDocx = async () => {
    try {
      setIsDownloading(true);
      const unitKey = selectedUnit === 'KEUANGAN' ? 'keuangan' : 'pdsi';
      await downloadKpiDocxInBrowser(unitKey);
      const filename = selectedUnit === 'KEUANGAN'
        ? 'Kamus_KPI_Dashboard_Biro_Keuangan_BP_Batam.docx'
        : 'Kamus_KPI_Dashboard_PDSI_BP_Batam.docx';
      setDownloadSuccess(filename);
      setTimeout(() => setDownloadSuccess(null), 4500);
    } catch (err) {
      console.error('Failed to download word document:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyFormula = (code: string, formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isKeu = selectedUnit === 'KEUANGAN';

  return (
    <div className="space-y-5 pb-12 animate-fadeIn font-sans">
      {/* Top Unit Selector Bar */}
      <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-all mr-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Dashboard</span>
            </button>
          )}

          {/* Unit Toggle Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => {
                setSelectedUnit('KEUANGAN');
                setSearchTerm('');
                setSelectedLevelFilter('ALL');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                selectedUnit === 'KEUANGAN'
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Biro Keuangan ({BIRO_KEUANGAN_KPI_DATA.length} KPI Sesuai PDF)</span>
            </button>

            <button
              onClick={() => {
                setSelectedUnit('PDSI');
                setSearchTerm('');
                setSelectedLevelFilter('ALL');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                selectedUnit === 'PDSI'
                  ? 'bg-[#1F3864] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Pusat Data dan Sistem Informasi - PDSI ({PDSI_KPI_DATA.length} KPI)</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Kamus Terisolasi per Unit Kerja</span>
        </div>
      </div>

      {/* Hero Banner with Unit Context */}
      <div
        className={`rounded-xl p-6 text-white shadow-lg border relative overflow-hidden transition-all ${
          isKeu
            ? 'bg-gradient-to-r from-[#0B2545] via-[#123966] to-[#1F4E79] border-blue-900/40'
            : 'bg-gradient-to-r from-[#0F1E36] via-[#193A6F] to-[#25529A] border-blue-900/40'
        }`}
      >
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <FileText className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-500/30 text-blue-200 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-blue-400/30 flex items-center gap-1.5">
                <TableIcon className="w-3.5 h-3.5" />
                {isKeu ? 'Unit: Biro Keuangan BP Batam' : 'Unit: PDSI BP Batam'}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-emerald-400/30">
                Word (.docx) Ready
              </span>
              <span className="bg-white/10 text-slate-200 text-xs px-2.5 py-0.5 rounded-full font-mono">
                BP_Batam_KPI_Dictionary_Updated.pdf
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {isKeu
                ? 'Kamus Indikator Kinerja Utama (KPI) - Biro Keuangan'
                : 'Kamus Indikator Kinerja Utama (KPI) - PDSI'}
            </h1>

            <p className="text-blue-100 text-xs md:text-sm leading-relaxed">
              {isKeu ? (
                <>
                  Tabel kamus KPI resmi diselaraskan langsung dengan dokumen{' '}
                  <strong className="text-white">BP_Batam_KPI_Dictionary_Updated.pdf</strong>.
                  Cakupan terbagi menjadi 3 domain utama: <strong className="text-white">Revenue / PNBP</strong> (5 KPI),{' '}
                  <strong className="text-white">Budget / Spending Control</strong> (4 KPI), dan{' '}
                  <strong className="text-white">Financial Linkage</strong> (4 KPI). Seluruh indikator yang tidak ada di dashboard telah dieliminasi.
                </>
              ) : (
                <>
                  Tabel kamus KPI resmi unit <strong className="text-white">Pusat Data dan Sistem Informasi (PDSI)</strong>.
                  Cakupan terbagi menjadi 4 domain operasional: <strong className="text-white">Data Center & Server Tier III</strong> (5 KPI),{' '}
                  <strong className="text-white">Layanan TI & Helpdesk</strong> (5 KPI),{' '}
                  <strong className="text-white">Keamanan Siber & SOC</strong> (4 KPI), dan{' '}
                  <strong className="text-white">Jaringan FO & Aplikasi SPBE</strong> (4 KPI).
                </>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadDocx}
              disabled={isDownloading}
              className="px-5 py-3 rounded-lg font-bold text-xs md:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-emerald-400/40 active:scale-95 disabled:opacity-75 whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>
                {isDownloading
                  ? 'Menyusun File Word...'
                  : isKeu
                  ? 'Download Word (.docx) Biro Keuangan'
                  : 'Download Word (.docx) PDSI'}
              </span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-4 p-3 bg-emerald-900/80 border border-emerald-400/60 rounded-lg text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>File Word Berhasil Diunduh!</strong> Dokumen <em>{downloadSuccess}</em> telah tersimpan di perangkat Anda.
            </span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-3.5 shadow-2xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={
              isKeu
                ? 'Cari Kode (REV_TOTAL, BUDG_BURN...), Nama KPI, atau Formula Keuangan...'
                : 'Cari Kode (PDSI_DC_UPTIME...), Nama KPI, atau Formula PDSI...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent bg-slate-50 focus:bg-white text-slate-800"
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

        {/* Level Filter */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-500 font-semibold px-2">Level:</span>
          {(isKeu
            ? (['ALL', 'Financial'] as const)
            : (['ALL', 'Executive', 'Program Driver', 'Operational Driver'] as const)
          ).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevelFilter(lvl as any)}
              className={`px-2.5 py-1 rounded-md transition-all text-xs font-semibold cursor-pointer ${
                selectedLevelFilter === lvl
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl === 'ALL' ? 'Semua Level' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table - Exactly Matching the User's Screenshot */}
      <div className="bg-white rounded-xl shadow-md border border-slate-300 overflow-hidden">
        {/* Table Title Header Bar */}
        <div className="px-5 py-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-xs md:text-sm">
              {isKeu
                ? 'Tabel Kamus KPI & Formula Dashboard Biro Keuangan BP Batam'
                : 'Tabel Kamus KPI & Formula Dashboard PDSI BP Batam'}
            </span>
            <span className="text-xs text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full font-mono font-semibold">
              Menampilkan {filteredItems.length} dari {activeDataset.length} Indikator
            </span>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2 font-mono">
            <span>Standar: <strong>BP_Batam_KPI_Dictionary_Updated.pdf</strong></span>
          </div>
        </div>

        {/* Scrollable Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1050px]">
            {/* Dark Navy Blue Header (#0B2545) Matching Screenshot */}
            <thead>
              <tr className="bg-[#0B2545] text-white text-xs tracking-wider font-bold">
                <th className="py-3 px-4 border-r border-blue-900/60 w-[17%]">
                  Domain
                </th>
                <th className="py-3 px-4 border-r border-blue-900/60 w-[14%] text-center">
                  KPI Code
                </th>
                <th className="py-3 px-4 border-r border-blue-900/60 w-[19%]">
                  KPI Name
                </th>
                <th className="py-3 px-4 border-r border-blue-900/60 w-[12%] text-center">
                  Strategic Level
                </th>
                <th className="py-3 px-4 border-r border-blue-900/60 w-[21%]">
                  Definition / What it measures
                </th>
                <th className="py-3 px-4 w-[17%]">
                  Formula / Logic
                </th>
              </tr>
            </thead>

            {/* Table Body with alternating rows */}
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <p className="font-medium">Tidak ada KPI yang cocok dengan filter pencarian.</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedLevelFilter('ALL');
                      }}
                      className="mt-2 text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                    >
                      Reset Filter
                    </button>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, idx) => {
                  const isEven = idx % 2 === 0;

                  return (
                    <tr
                      key={item.kpiCode}
                      className={`hover:bg-blue-50/70 transition-colors group ${
                        isEven ? 'bg-[#F0F4F8]/60' : 'bg-white'
                      }`}
                    >
                      {/* 1. Domain */}
                      <td className="py-3 px-4 border-r border-slate-200 align-top font-bold text-slate-800">
                        {item.domain}
                      </td>

                      {/* 2. KPI Code (in bright blue text #0066CC matching screenshot) */}
                      <td className="py-3 px-4 border-r border-slate-200 align-top text-center">
                        <span className="font-mono font-bold text-[#0066CC] tracking-wide text-xs">
                          {item.kpiCode}
                        </span>
                      </td>

                      {/* 3. KPI Name */}
                      <td className="py-3 px-4 border-r border-slate-200 align-top font-semibold text-slate-900">
                        {item.kpiName}
                      </td>

                      {/* 4. Strategic Level */}
                      <td className="py-3 px-4 border-r border-slate-200 align-top text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full font-semibold text-[11px] border ${
                            item.strategicLevel === 'Financial'
                              ? 'bg-blue-50 text-[#0066CC] border-blue-300 font-bold'
                              : item.strategicLevel === 'Executive'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : item.strategicLevel === 'Program Driver'
                              ? 'bg-amber-50 text-amber-700 border-amber-300'
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          {item.strategicLevel}
                        </span>
                      </td>

                      {/* 5. Definition / What it measures */}
                      <td className="py-3 px-4 border-r border-slate-200 align-top text-slate-700 leading-relaxed">
                        {item.definition}
                      </td>

                      {/* 6. Formula / Logic */}
                      <td className="py-3 px-4 align-top">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono text-[11px] text-slate-900 font-bold leading-snug">
                            {item.formula}
                          </span>
                          <button
                            onClick={() => handleCopyFormula(item.kpiCode, item.formula)}
                            className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded cursor-pointer transition-colors shrink-0 mt-0.5"
                            title="Salin Formula"
                          >
                            {copiedCode === item.kpiCode ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
