import React, { useState } from 'react';
import { BpBatamUnit, BP_BATAM_24_UNITS } from '../data/bpBatamUnits';
import { Building2, Layers, BookOpen, Sparkles, Plus, CheckCircle2, ArrowRight, BarChart3, Layout, FileText, Settings, Shield } from 'lucide-react';

interface OtherUnitPlaceholderProps {
  unit: BpBatamUnit;
  onOpen24UnitsDrawer: () => void;
  onSwitchToKeuangan: () => void;
  onSwitchToPdsi: () => void;
}

export const OtherUnitPlaceholder: React.FC<OtherUnitPlaceholderProps> = ({
  unit,
  onOpen24UnitsDrawer,
  onSwitchToKeuangan,
  onSwitchToPdsi,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ikhtisar' | 'katalog' | 'designer'>('ikhtisar');
  const [widgets, setWidgets] = useState<string[]>([
    'KPI Ringkasan Kinerja Utama',
    'Grafik Tren Bulanan Capaian Sasaran',
    'Tabel Rekapitulasi Data Operasional',
  ]);
  const [isSaved, setIsSaved] = useState(false);

  const addWidget = (name: string) => {
    if (!widgets.includes(name)) {
      setWidgets([...widgets, name]);
    }
  };

  const removeWidget = (name: string) => {
    setWidgets(widgets.filter((w) => w !== name));
  };

  return (
    <div className="space-y-4 font-sans select-none pb-12">
      {/* Unit Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-sky-400 font-bold font-mono text-sm shadow-xs">
            {unit.code}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                {unit.category}
              </span>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                {unit.name}
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Siap Dirancang
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {unit.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpen24UnitsDrawer}
            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer"
          >
            Pilih Unit Lain (24 Unit)
          </button>
        </div>
      </div>

      {/* Sub-menu Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('ikhtisar')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
            activeSubTab === 'ikhtisar'
              ? 'bg-[#1F3864] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Ikhtisar Unit</span>
        </button>

        <button
          onClick={() => setActiveSubTab('katalog')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
            activeSubTab === 'katalog'
              ? 'bg-[#1F3864] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Kamus Rumus &amp; Katalog PDF ({unit.itemCount} Item)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('designer')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
            activeSubTab === 'designer'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>+ Rancang Dashboard Unit Ini</span>
        </button>
      </div>

      {/* Content Area */}
      {activeSubTab === 'ikhtisar' && (
        <div className="space-y-4">
          {/* Metadata Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Referensi Buku Kamus</span>
              <span className="text-lg font-bold text-slate-900 font-mono mt-1 block">
                {unit.pdfPages}
              </span>
              <span className="text-[10px] text-slate-400">File: BP_Batam_KPI_Dictionary_Updated.pdf</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Total Tabel / Katalog Data</span>
              <span className="text-lg font-bold text-blue-700 font-mono mt-1 block">
                {unit.itemCount} Item Data Resmi
              </span>
              <span className="text-[10px] text-slate-400">Tercatat dalam Data Dictionary BP Batam</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Penanggung Jawab Unit</span>
              <span className="text-lg font-bold text-emerald-700 mt-1 block">
                {unit.headOfUnit || 'Pimpinan Unit'}
              </span>
              <span className="text-[10px] text-slate-400">Struktur Organisasi Resmi BP Batam</span>
            </div>
          </div>

          {/* Key KPIs Proposed */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-4 bg-blue-600 rounded-xs" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  INDIKATOR KINERJA UTAMA (PROPOSED KPIS DARI PDF)
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">{unit.name}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {unit.keyKpis.map((kpi, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <span className="text-[10px] font-mono font-bold text-blue-700">KPI #{idx + 1}</span>
                  <h4 className="text-xs font-bold text-slate-900">{kpi}</h4>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                    <span>Target: Sesuai Perkin</span>
                    <span className="text-emerald-600 font-semibold">Ready</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Switch to Working Dashboards Banner */}
          <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
            <div>
              <h4 className="text-sm font-bold">Ingin melihat dashboard yang sudah aktif sepenuhnya?</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Biro Keuangan dan PDSI telah terkonfigurasi dengan data visual interaktif dan kamus rumus lengkap.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onSwitchToKeuangan}
                className="px-3.5 py-1.5 bg-[#2E75B6] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
              >
                Buka Biro Keuangan
              </button>
              <button
                onClick={onSwitchToPdsi}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-600 cursor-pointer transition-colors"
              >
                Buka PDSI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Katalog Data PDF */}
      {activeSubTab === 'katalog' && (
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              DAFTAR KATALOG &amp; RUMUS DATA {unit.name.toUpperCase()} (DARI PDF)
            </h3>
            <span className="text-xs text-blue-700 font-mono font-bold">
              {unit.pdfPages} • {unit.itemCount} Item
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Data dictionary dan kamus rumus untuk <strong>{unit.name}</strong> telah terpetakan dalam file master{' '}
            <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px] text-blue-700">
              BP_Batam_KPI_Dictionary_Updated.pdf
            </code>
            . Modul ini siap dikoneksikan ke skema database atau diekspor ke Tableau / Power BI.
          </p>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
            <div className="font-bold text-slate-800">Cakupan Data Katalog Unit:</div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-[11px]">
              {unit.keyKpis.map((k, i) => (
                <li key={i}>{k} - Pengukuran capaian indikator kinerja sasaran unit kerja.</li>
              ))}
              <li>Format kalkulasi terstandarisasi dengan formula Calculated Fields Tableau.</li>
              <li>Atribut sifat data: Terbuka, Terbatas, atau Tertutup sesuai regulasi BP Batam.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab: Dashboard Designer Template */}
      {activeSubTab === 'designer' && (
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Studio Desain Dashboard {unit.name}
              </h3>
              <p className="text-xs text-slate-500">
                Pilih komponen atau widget visual untuk dirancang ke dalam lembar kerja unit ini
              </p>
            </div>

            <button
              onClick={() => {
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 3000);
              }}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg cursor-pointer transition-colors shadow-xs flex items-center gap-1.5"
            >
              {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              <span>{isSaved ? 'Rancangan Tersimpan!' : 'Simpan Blueprint Desain'}</span>
            </button>
          </div>

          {/* Widget palette */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700">Tambahkan Widget Baru:</span>
            <div className="flex flex-wrap gap-2">
              {[
                'Matriks Realisasi Target vs Anggaran',
                'Analisis Distribusi Kategori Layanan',
                'Peta Spasial Geografis Batam',
                'Heatmap Tingkat Kepatuhan Regulasi',
                'Laporan Rincian Detail Ekspor Excel',
              ].map((w) => (
                <button
                  key={w}
                  onClick={() => addWidget(w)}
                  className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-md border border-slate-200 cursor-pointer flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>{w}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Canvas Layout */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-700">Susunan Widget Aktif:</span>
            <div className="space-y-2">
              {widgets.map((w, index) => (
                <div
                  key={w}
                  className="p-3 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 font-bold font-mono text-[10px] flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-slate-800">{w}</span>
                  </div>
                  <button
                    onClick={() => removeWidget(w)}
                    className="text-rose-600 hover:text-rose-800 text-xs font-semibold cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
