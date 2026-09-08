import React, { useState } from 'react';
import { X, FileText, Table, Download, Image, Layers, Check, Sparkles } from 'lucide-react';
import { downloadKpiDocxInBrowser } from '../../utils/generateDocx';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastUpdated: string;
  activeUnitId?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, lastUpdated, activeUnitId = 'biro-keuangan' }) => {
  const [selectedFormat, setSelectedFormat] = useState<'docx' | 'pdf' | 'excel' | 'csv' | 'image' | 'twbx'>('docx');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);

    if (selectedFormat === 'docx') {
      try {
        const unitKey = activeUnitId === 'pdsi' ? 'pdsi' : 'keuangan';
        await downloadKpiDocxInBrowser(unitKey);
        setDownloadSuccess(true);
        setTimeout(() => {
          setIsExporting(false);
          setDownloadSuccess(false);
          onClose();
        }, 1200);
      } catch (err) {
        console.error('Failed to export docx:', err);
        setIsExporting(false);
      }
      return;
    }

    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(true);

      const content = `TABLEAU SERVER REPORT EXPORT
Workbook: Dashboard Eksekutif Biro Keuangan BP Batam
Sheet: All Dashboards & Worksheets
Extracted Date: ${lastUpdated}
--------------------------------------------------
METRIK UTAMA:
- Realisasi Pendapatan: Rp 981,2 M (40,1% vs Pagu Rp 2,45 T)
- Realisasi Belanja: Rp 945,0 M (28,5% vs Pagu Rp 3,32 T)
- Saldo Kas & Bank: Rp 1,52 T
- Total Piutang: Rp 312,4 M
- Rasio Kemandirian Fiskal BLU: 0,86 (Mandiri)
- Nilai IKPA Kemenkeu: 92,4 (Sangat Baik)
--------------------------------------------------
SURPLUS & DEFISIT UNIT KERJA:
1. Dit. Pengelolaan Lahan: Net +Rp 367,0 M (Surplus)
2. Kantor Bandara Hang Nadim: Net +Rp 173,0 M (Surplus)
3. Dit. Pelabuhan & Terminal: Net +Rp 67,2 M (Surplus)
4. Dit. Fasilitas Usaha: Net -Rp 40,0 M (Defisit Subsidi)
5. Dit. Pembangunan Infrastruktur: Net -Rp 171,0 M (Defisit Modal)
--------------------------------------------------
Data terverifikasi SIMKEU BP Batam.`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = selectedFormat === 'csv' ? 'csv' : selectedFormat === 'excel' ? 'xlsx' : selectedFormat === 'image' ? 'png' : selectedFormat === 'twbx' ? 'twbx' : 'pdf';
      a.download = `BP_Batam_Keuangan_Tableau_Export_${Date.now()}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setTimeout(() => {
        setDownloadSuccess(false);
        onClose();
      }, 1200);
    }, 750);
  };

  const isPdsi = activeUnitId === 'pdsi';
  const options = [
    {
      id: 'docx' as const,
      label: isPdsi ? 'Kamus KPI & Formula PDSI (Word .docx)' : 'Kamus KPI & Formula Biro Keuangan (Word .docx)',
      desc: isPdsi
        ? 'Dokumen Word tabel acuan KPI Pusat Data dan Sistem Informasi (PDSI) BP Batam'
        : 'Dokumen Word tabel acuan KPI resmi Biro Keuangan BP Batam (Revenue, Spending, Financial Linkage)',
      icon: FileText,
      isRecommended: true,
    },
    {
      id: 'pdf' as const,
      label: 'PDF Laporan Eksekutif',
      desc: 'Laporan visual resolusi tinggi format cetak PDF lanskap',
      icon: FileText,
    },
    {
      id: 'excel' as const,
      label: 'Crosstab (Excel .xlsx)',
      desc: 'Tabel data rekapitulasi crosstab untuk analisis Microsoft Excel',
      icon: Table,
    },
    {
      id: 'csv' as const,
      label: 'Data Mentah (CSV)',
      desc: 'Seluruh baris transaksi underlying data format CSV',
      icon: Table,
    },
    {
      id: 'image' as const,
      label: 'Image (.png)',
      desc: 'Tangkapan visual dashboard format PNG untuk slide presentasi',
      icon: Image,
    },
    {
      id: 'twbx' as const,
      label: 'Tableau Packaged Workbook (.twbx)',
      desc: 'File workbook Tableau lengkap beserta data extract lokal',
      icon: Layers,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-sans select-none">
      <div
        className="fixed inset-0 bg-slate-900/60 transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl border border-slate-200/90 max-w-lg w-full z-10 overflow-hidden shadow-2xl">
        {/* Tableau Modal Title Bar */}
        <div className="px-5 py-3.5 bg-[#001D3D] text-white flex items-center justify-between border-b border-[#001429]">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
              <Download className="w-3.5 h-3.5 text-sky-300" />
            </div>
            <span className="text-xs font-bold tracking-wide">
              Download — Tableau Server
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/15 text-slate-300 hover:text-white rounded-md cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-3.5">
          <p className="text-xs text-slate-600">
            Pilih format keluaran untuk mengekspor lembar kerja atau dashboard eksekutif:
          </p>

          {/* Option List */}
          <div className="space-y-2">
            {options.map((opt) => {
              const isSelected = selectedFormat === opt.id;
              const Icon = opt.icon;

              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedFormat(opt.id)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-slate-50 border-[#002B49] ring-1 ring-[#002B49] shadow-xs'
                      : 'bg-white border-slate-200/90 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[#002B49] text-white shadow-2xs' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                      <div className="text-[11px] text-slate-500">{opt.desc}</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="export-format"
                    checked={isSelected}
                    onChange={() => setSelectedFormat(opt.id)}
                    className="accent-[#002B49] cursor-pointer w-4 h-4"
                  />
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 font-mono">
            Data Source: PostgreSQL SIMKEU • Extracted: {lastUpdated}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-2.5 text-xs">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-bold text-slate-700 cursor-pointer shadow-2xs transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-1.5 bg-[#002B49] hover:bg-[#003860] text-white font-bold rounded-lg cursor-pointer flex items-center gap-1.5 shadow-2xs transition-all"
          >
            {isExporting ? (
              <span>Generating Export...</span>
            ) : downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Berhasil Diunduh!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download {selectedFormat.toUpperCase()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
