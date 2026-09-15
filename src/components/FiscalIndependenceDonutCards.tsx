import React, { useState } from 'react';
import {
  HelpCircle,
  Table as TableIcon,
  Layers,
  LayoutGrid,
  Coins,
  Building2,
  Landmark,
  TrendingUp,
} from 'lucide-react';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface FiscalIndependenceDonutCardsProps {
  onExplainKpi?: (kpiId: string) => void;
}

export const FundingSourcesTreemapCard: React.FC<FiscalIndependenceDonutCardsProps> = ({
  onExplainKpi,
}) => {
  const [viewMode, setViewMode] = useState<'treemap' | 'table'>('treemap');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Data for Sumber Pendanaan (Item #14: Rekapitulasi Realisasi Penerimaan Berdasarkan Sumber Dana)
  const fundingSources = [
    {
      id: 'pnbp',
      label: 'PNBP Layanan BLU',
      sumberDana: 'PNBP (Pendapatan Negara Bukan Pajak)',
      unitKerja: 'Seluruh Satker BLU BP Batam',
      nominal: 681.0,
      nilaiFormatted: 'Rp 681.000.000.000',
      pagu: 980.0,
      percentage: 64.1,
      color: '#002B49',
      bgHover: 'hover:bg-[#001f35]',
      icon: Coins,
      role: 'Pendanaan Utama Operasional & Layanan',
      description: 'Penerimaan jasa kepelabuhanan, bandara udara, sewa lahan UWT & pengelolaan air bersih',
    },
    {
      id: 'apbn',
      label: 'Rupiah Murni (APBN)',
      sumberDana: 'Rupiah Murni (APBN)',
      unitKerja: 'Biro Perencanaan & Keuangan',
      nominal: 224.0,
      nilaiFormatted: 'Rp 224.000.000.000',
      pagu: 250.0,
      percentage: 21.1,
      color: '#0284C7',
      bgHover: 'hover:bg-[#0369a1]',
      icon: Landmark,
      role: 'Dukungan Proyek Strategis & Infrastruktur',
      description: 'Alokasi DIPA APBN untuk belanja modal jalan arteri, jembatan & fasilitas umum Batam',
    },
    {
      id: 'hibah',
      label: 'Hibah & Treasury',
      sumberDana: 'Hibah & Kerjasama Treasury BLU',
      unitKerja: 'Biro Keuangan',
      nominal: 157.2,
      nilaiFormatted: 'Rp 157.200.000.000',
      pagu: 160.0,
      percentage: 14.8,
      color: '#059669',
      bgHover: 'hover:bg-[#047857]',
      icon: Building2,
      role: 'Optimalisasi Treasury & Jasa Giro',
      description: 'Pendapatan jasa giro perbankan mitra, bunga penempatan deposito & kerja sama pemanfaatan',
    },
  ];

  const totalFunding = fundingSources.reduce((acc, f) => acc + f.nominal, 0); // 1.062,2 M

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all p-4 sm:p-5 flex flex-col justify-between h-full font-sans select-none">
      <div className="space-y-3.5">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[#002B49] rounded-2xs" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black text-[#002B49] uppercase tracking-wider">
                  Sumber Pendanaan
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                  Total: Rp {totalFunding.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal">
                Komposisi Kas Masuk: PNBP Layanan BLU, Alokasi APBN &amp; Treasury
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* View Switcher: Treemap vs Table */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode('treemap')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 font-medium ${
                  viewMode === 'treemap'
                    ? 'bg-white text-[#002B49] font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tampilan Visualisasi Treemap Proporsional"
              >
                <LayoutGrid className="w-3 h-3" />
                <span>Treemap</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 font-medium ${
                  viewMode === 'table'
                    ? 'bg-white text-[#002B49] font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tampilan Tabel Informasi Struktur Pendanaan"
              >
                <TableIcon className="w-3 h-3" />
                <span>Tabel Data</span>
              </button>
            </div>

            {onExplainKpi && (
              <button
                onClick={() => onExplainKpi('sumber_pendanaan')}
                className="px-2 py-1 text-[11px] font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                title="Lihat Formula Lengkap & Penjelasan Insight"
              >
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Formula</span>
              </button>
            )}
          </div>
        </div>

        {/* Top 3 Executive Metric Tiles */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {fundingSources.map((source) => (
            <div
              key={source.id}
              onClick={() => onExplainKpi?.('sumber_pendanaan')}
              className={`p-2 rounded-xl transition-all cursor-pointer group shadow-2xs border ${
                hoveredId === source.id
                  ? 'border-blue-400 bg-blue-50/70'
                  : 'border-slate-200/80 bg-slate-50/70 hover:border-blue-300'
              }`}
              onMouseEnter={() => setHoveredId(source.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider truncate">
                {source.label}
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 font-mono mt-0.5">
                Rp {source.nominal.toFixed(1)} M
              </div>
              <span className="text-[9px] font-bold text-blue-700 font-mono block truncate">
                {source.percentage}% Porsi
              </span>
            </div>
          ))}
        </div>

        {/* Treemap Shelves Badge */}
        <TableauShelvesBadge
          showMe="Show Me #10 (Treemap)"
          rows="[sumber_dana]"
          columns="SUM([nominal_kas_masuk])"
          color="[kategori_sumber_dana]"
          marks="SIZE=SUM([nominal]), COLOR=[sumber_dana]"
        />

        {/* Visualization Area */}
        {viewMode === 'treemap' ? (
          <div className="space-y-2">
            {/* Interactive Treemap Container */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 h-64 sm:h-72">
              {/* Block 1: PNBP (64.1% - takes 7 of 12 cols) */}
              <div
                onClick={() => onExplainKpi?.('sumber_pendanaan')}
                onMouseEnter={() => setHoveredId('pnbp')}
                onMouseLeave={() => setHoveredId(null)}
                className={`md:col-span-7 rounded-xl p-3.5 sm:p-4 text-white flex flex-col justify-between cursor-pointer transition-all shadow-xs relative overflow-hidden group ${
                  hoveredId === 'pnbp' ? 'ring-2 ring-blue-300 scale-[1.01]' : ''
                }`}
                style={{ backgroundColor: '#002B49' }}
                title="Klik untuk membuka formula PNBP Layanan BLU"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                      <Coins className="w-4 h-4 text-sky-300" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-sky-200 block uppercase tracking-wider">
                        Porsi Terbesar (64,1%)
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-white">
                        PNBP Layanan BLU
                      </h4>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/15 text-[10px] font-mono font-bold text-white">
                    Rp 681,0 M
                  </span>
                </div>

                <div className="space-y-1.5 my-auto py-2">
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                    64,1%
                  </div>
                  <p className="text-[11px] text-slate-200/90 leading-snug line-clamp-2">
                    {fundingSources[0].description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-sky-200/80 font-mono">
                  <span>Pagu DIPA: Rp 980,0 M</span>
                  <span className="text-emerald-300 font-semibold">Capaian: 69,5%</span>
                </div>
              </div>

              {/* Right Side: Stack of APBN (21.1%) and Hibah (14.8%) - takes 5 of 12 cols */}
              <div className="md:col-span-5 flex flex-col gap-2">
                {/* Block 2: APBN (21.1%) */}
                <div
                  onClick={() => onExplainKpi?.('sumber_pendanaan')}
                  onMouseEnter={() => setHoveredId('apbn')}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`flex-1 rounded-xl p-3 text-white flex flex-col justify-between cursor-pointer transition-all shadow-xs relative overflow-hidden group ${
                    hoveredId === 'apbn' ? 'ring-2 ring-sky-300 scale-[1.01]' : ''
                  }`}
                  style={{ backgroundColor: '#0284C7' }}
                  title="Klik untuk membuka formula Alokasi APBN"
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Landmark className="w-3.5 h-3.5 text-sky-100 shrink-0" />
                      <span className="text-xs font-bold text-white truncate">
                        Rupiah Murni (APBN)
                      </span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-white/20 text-[9px] font-mono font-bold text-white shrink-0">
                      21,1%
                    </span>
                  </div>

                  <div className="my-auto py-1">
                    <div className="text-lg sm:text-xl font-black font-mono text-white">
                      Rp 224,0 M
                    </div>
                    <p className="text-[10px] text-sky-100/90 leading-tight truncate">
                      {fundingSources[1].role}
                    </p>
                  </div>

                  <div className="text-[9.5px] text-sky-100/80 font-mono flex items-center justify-between">
                    <span>Pagu: Rp 250,0 M</span>
                    <span className="text-sky-200 font-bold">89,6%</span>
                  </div>
                </div>

                {/* Block 3: Hibah & Treasury (14.8%) */}
                <div
                  onClick={() => onExplainKpi?.('sumber_pendanaan')}
                  onMouseEnter={() => setHoveredId('hibah')}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`flex-1 rounded-xl p-3 text-white flex flex-col justify-between cursor-pointer transition-all shadow-xs relative overflow-hidden group ${
                    hoveredId === 'hibah' ? 'ring-2 ring-emerald-300 scale-[1.01]' : ''
                  }`}
                  style={{ backgroundColor: '#059669' }}
                  title="Klik untuk membuka formula Hibah & Treasury"
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Building2 className="w-3.5 h-3.5 text-emerald-100 shrink-0" />
                      <span className="text-xs font-bold text-white truncate">
                        Hibah &amp; Treasury
                      </span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-white/20 text-[9px] font-mono font-bold text-white shrink-0">
                      14,8%
                    </span>
                  </div>

                  <div className="my-auto py-1">
                    <div className="text-lg sm:text-xl font-black font-mono text-white">
                      Rp 157,2 M
                    </div>
                    <p className="text-[10px] text-emerald-100/90 leading-tight truncate">
                      {fundingSources[2].role}
                    </p>
                  </div>

                  <div className="text-[9.5px] text-emerald-100/80 font-mono flex items-center justify-between">
                    <span>Pagu: Rp 160,0 M</span>
                    <span className="text-emerald-200 font-bold">98,3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#002B49] text-white text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Sumber Dana</th>
                  <th className="py-2.5 px-3 text-right">Realisasi (M)</th>
                  <th className="py-2.5 px-3 text-right">Pagu (M)</th>
                  <th className="py-2.5 px-3 text-right">Porsi (%)</th>
                  <th className="py-2.5 px-3">Peruntukan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                {fundingSources.map((source) => (
                  <tr key={source.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-3 font-sans font-bold text-slate-800 flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: source.color }}
                      />
                      <span>{source.label}</span>
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-slate-900">
                      Rp {source.nominal.toFixed(1)} M
                    </td>
                    <td className="py-2 px-3 text-right text-slate-500">
                      Rp {source.pagu.toFixed(1)} M
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-blue-700">
                      {source.percentage.toFixed(1)}%
                    </td>
                    <td className="py-2 px-3 font-sans text-slate-600 text-[10.5px]">
                      {source.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer info tag */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-400 font-mono">
        <span>Rekapitulasi Realisasi Penerimaan Berdasarkan Sumber Dana</span>
        <span className="text-blue-700 font-medium">Katalog Item #14</span>
      </div>
    </div>
  );
};

// Also export as FiscalIndependenceDonutCards for backwards compatibility
export const FiscalIndependenceDonutCards = FundingSourcesTreemapCard;
