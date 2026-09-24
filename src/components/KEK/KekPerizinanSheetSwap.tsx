import React, { useState, useMemo } from 'react';
import {
  Layers,
  FileCheck2,
  FileText,
  Search,
  Calendar,
  Download,
} from 'lucide-react';
import {
  KEK_PERIZINAN_BERUSAHA,
  KEK_NON_PERIZINAN,
  KEK_PERIZINAN_LAINNYA,
} from '../../data/kekData';
import { KekVisualHeader } from './KekVisualHeader';

type SheetType = 'berusaha' | 'non_perizinan' | 'lainnya';

interface KekPerizinanSheetSwapProps {
  selectedKekFilter?: string;
  onOpenFormulaModal: (formulaId: string) => void;
}

export const KekPerizinanSheetSwap: React.FC<KekPerizinanSheetSwapProps> = ({
  selectedKekFilter = 'ALL',
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<SheetType>('berusaha');
  const [searchQuery, setSearchQuery] = useState('');
  const [localKekFilter, setLocalKekFilter] = useState<string>('ALL');

  // Sinkronisasi dengan filter global jika ada
  const effectiveKek = selectedKekFilter !== 'ALL' ? selectedKekFilter : localKekFilter;

  // Filter Data Perizinan Berusaha (Dataset 3)
  const filteredBerusaha = useMemo(() => {
    return KEK_PERIZINAN_BERUSAHA.filter((item) => {
      const matchKek = effectiveKek === 'ALL' || item.kek === effectiveKek;
      const matchSearch =
        item.namaPerizinan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tanggalPerizinan.toLowerCase().includes(searchQuery.toLowerCase());
      return matchKek && matchSearch;
    });
  }, [effectiveKek, searchQuery]);

  // Filter Data Non Perizinan (Dataset 4)
  const filteredNonPerizinan = useMemo(() => {
    return KEK_NON_PERIZINAN.filter((item) => {
      const matchKek = effectiveKek === 'ALL' || item.kek === effectiveKek;
      const matchSearch =
        item.namaNonPerizinan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tanggal.toLowerCase().includes(searchQuery.toLowerCase());
      return matchKek && matchSearch;
    });
  }, [effectiveKek, searchQuery]);

  // Filter Data Perizinan Lainnya (Dataset 7)
  const filteredLainnya = useMemo(() => {
    return KEK_PERIZINAN_LAINNYA.filter((item) => {
      const matchKek = effectiveKek === 'ALL' || item.kek === effectiveKek;
      const matchSearch =
        item.namaPerizinan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tanggalPerizinan.toLowerCase().includes(searchQuery.toLowerCase());
      return matchKek && matchSearch;
    });
  }, [effectiveKek, searchQuery]);

  // Ekspor CSV (hanya Nama Perizinan dan Tanggal)
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (activeSheet === 'berusaha') {
      csvContent += 'No,Nama Perizinan Berusaha,Tanggal Perizinan Berusaha\n';
      filteredBerusaha.forEach((r, idx) => {
        csvContent += `"${idx + 1}","${r.namaPerizinan}","${r.tanggalPerizinan}"\n`;
      });
    } else if (activeSheet === 'non_perizinan') {
      csvContent += 'No,Nama Non Perizinan,Tanggal\n';
      filteredNonPerizinan.forEach((r, idx) => {
        csvContent += `"${idx + 1}","${r.namaNonPerizinan}","${r.tanggal}"\n`;
      });
    } else {
      csvContent += 'No,Nama Perizinan Lainnya,Tanggal Perizinan\n';
      filteredLainnya.forEach((r, idx) => {
        csvContent += `"${idx + 1}","${r.namaPerizinan}","${r.tanggalPerizinan}"\n`;
      });
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tabel_perizinan_kek_${activeSheet}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSheetMeta = () => {
    switch (activeSheet) {
      case 'berusaha':
        return {
          num: 3,
          page: 'Hal. 10',
          title: 'DAFTAR PERIZINAN BERUSAHA ADMINISTRATOR KAWASAN EKONOMI KHUSUS (KEK)',
          visualName: 'Tabel Informasi Perizinan Berusaha Administrator KEK Terintegrasi OSS RBA',
          attrs: ['NAMA PERIZINAN BERUSAHA', 'TANGGAL PERIZINAN BERUSAHA'],
          formula: 'kpi_kek_izin_berusaha',
        };
      case 'non_perizinan':
        return {
          num: 4,
          page: 'Hal. 10',
          title: 'DAFTAR NON PERIZINAN ADMINISTRATOR KAWASAN EKONOMI KHUSUS (KEK)',
          visualName: 'Tabel Pelayanan Fasilitas Non-Perizinan Administrator KEK (Masterlist & Fiskal)',
          attrs: ['NAMA NON PERIZINAN', 'TANGGAL'],
          formula: 'kpi_kek_non_perizinan',
        };
      case 'lainnya':
        return {
          num: 7,
          page: 'Hal. 10',
          title: 'DAFTAR PERIZINAN LAINNYA ADMINISTRATOR KAWASAN EKONOMI KHUSUS (KEK)',
          visualName: 'Tabel Layanan Perizinan Khusus Operasional & Lingkungan Administrator KEK',
          attrs: ['NAMA PERIZINAN', 'TANGGAL PERIZINAN'],
          formula: 'kpi_kek_perizinan_lainnya',
        };
    }
  };

  const meta = getSheetMeta();

  return (
    <div
      id="kek-perizinan-sheet-swap-section"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-4 sm:p-5"
    >
      {/* 1. Official Visual Header */}
      <KekVisualHeader
        datasetNumber={meta.num}
        pdfPages={meta.page}
        title={meta.title}
        visualName={meta.visualName}
        visualIcon={<Layers className="w-3.5 h-3.5 text-blue-600" />}
        attributes={meta.attrs}
        classification="TERBUKA"
        periode="JIKA UPDATE"
        rightControls={
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Ekspor data aktif ke format CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
        }
        onOpenFormula={() => onOpenFormulaModal(meta.formula)}
      />

      {/* 2. Sheet Swap Navigation Switcher (Tableau Style Tabs) */}
      <div className="px-4 pt-3 border-b border-slate-200 flex flex-wrap gap-2 items-center justify-between bg-white">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
          {/* TAB 1: PERIZINAN BERUSAHA (DATASET 3) */}
          <button
            onClick={() => setActiveSheet('berusaha')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeSheet === 'berusaha'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Perizinan Berusaha</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
                activeSheet === 'berusaha' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {KEK_PERIZINAN_BERUSAHA.length}
            </span>
          </button>

          {/* TAB 2: NON PERIZINAN (DATASET 4) */}
          <button
            onClick={() => setActiveSheet('non_perizinan')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeSheet === 'non_perizinan'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Non Perizinan</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
                activeSheet === 'non_perizinan' ? 'bg-amber-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {KEK_NON_PERIZINAN.length}
            </span>
          </button>

          {/* TAB 3: PERIZINAN LAINNYA (DATASET 7) */}
          <button
            onClick={() => setActiveSheet('lainnya')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeSheet === 'lainnya'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Perizinan Lainnya</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
                activeSheet === 'lainnya' ? 'bg-purple-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {KEK_PERIZINAN_LAINNYA.length}
            </span>
          </button>
        </div>

        {/* Active Sheet Info */}
        <div className="pb-2 text-[11px] font-mono text-slate-500 hidden lg:block">
          {activeSheet === 'berusaha' && 'Menampilkan: Nama Perizinan Berusaha & Tanggal'}
          {activeSheet === 'non_perizinan' && 'Menampilkan: Nama Non Perizinan & Tanggal'}
          {activeSheet === 'lainnya' && 'Menampilkan: Nama Perizinan Lainnya & Tanggal'}
        </div>
      </div>

      {/* 3. Search & Quick Filters Bar */}
      <div className="p-3 bg-slate-50/50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama perizinan atau tanggal..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 font-sans"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
          <span className="text-slate-500 font-medium">Filter KEK:</span>
          <select
            value={localKekFilter}
            onChange={(e) => setLocalKekFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">Semua KEK</option>
            <option value="KEK Nongsa">KEK Nongsa</option>
            <option value="KEK Batam Teknik">KEK Batam Teknik</option>
            <option value="KEK Pariwisata dan Kesehatan Internasional Batam">
              KEK Pariwisata &amp; Kesehatan
            </option>
          </select>
        </div>
      </div>

      {/* 4. TABEL HANYA MENAMPILKAN 5 DATA AWAL, SISANYA DAPAT DI-SCROLL SECARA VERTIKAL */}
      <div className="overflow-x-auto overflow-y-auto max-h-[260px] divide-y divide-slate-100 relative">
        {activeSheet === 'berusaha' && (
          <table className="w-full text-xs font-sans text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700 shadow-xs">
              <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-4 w-14 text-center bg-slate-100">No</th>
                <th className="py-2.5 px-4 bg-slate-100">Nama Perizinan Berusaha</th>
                <th className="py-2.5 px-4 w-60 whitespace-nowrap bg-slate-100">Tanggal Perizinan Berusaha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBerusaha.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-slate-400">
                    Tidak ada data perizinan yang sesuai filter
                  </td>
                </tr>
              ) : (
                filteredBerusaha.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-2.5 px-4 text-center font-mono text-slate-400 font-bold">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">
                      {row.namaPerizinan}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap font-mono text-slate-700">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{row.tanggalPerizinan}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {activeSheet === 'non_perizinan' && (
          <table className="w-full text-xs font-sans text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700 shadow-xs">
              <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-4 w-14 text-center bg-slate-100">No</th>
                <th className="py-2.5 px-4 bg-slate-100">Nama Non Perizinan</th>
                <th className="py-2.5 px-4 w-60 whitespace-nowrap bg-slate-100">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredNonPerizinan.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-slate-400">
                    Tidak ada data non perizinan yang sesuai filter
                  </td>
                </tr>
              ) : (
                filteredNonPerizinan.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-2.5 px-4 text-center font-mono text-slate-400 font-bold">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">
                      {row.namaNonPerizinan}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap font-mono text-slate-700">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{row.tanggal}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {activeSheet === 'lainnya' && (
          <table className="w-full text-xs font-sans text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700 shadow-xs">
              <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-4 w-14 text-center bg-slate-100">No</th>
                <th className="py-2.5 px-4 bg-slate-100">Nama Perizinan Lainnya</th>
                <th className="py-2.5 px-4 w-60 whitespace-nowrap bg-slate-100">Tanggal Perizinan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLainnya.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-slate-400">
                    Tidak ada data perizinan lainnya yang sesuai filter
                  </td>
                </tr>
              ) : (
                filteredLainnya.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="py-2.5 px-4 text-center font-mono text-slate-400 font-bold">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">
                      {row.namaPerizinan}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap font-mono text-slate-700">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span>{row.tanggalPerizinan}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer baris status count */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 font-mono">
        <div className="flex items-center gap-2">
          <span>
            Menampilkan{' '}
            {activeSheet === 'berusaha'
              ? `${filteredBerusaha.length} dari ${KEK_PERIZINAN_BERUSAHA.length}`
              : activeSheet === 'non_perizinan'
              ? `${filteredNonPerizinan.length} dari ${KEK_NON_PERIZINAN.length}`
              : `${filteredLainnya.length} dari ${KEK_PERIZINAN_LAINNYA.length}`}{' '}
            entri perizinan
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10.5px] font-sans font-medium">
            Tampilan 5 baris • Scroll ke bawah untuk data berikutnya
          </span>
        </div>
        <span className="text-slate-400 text-[11px] font-sans">
          Kolom: [Nama Perizinan] dan [Tanggal]
        </span>
      </div>
    </div>
  );
};
