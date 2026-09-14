import React, { useState } from 'react';
import {
  CreditCard,
  Share2,
  HelpCircle,
  CheckCircle2,
  PieChart as PieChartIcon,
  Table as TableIcon,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Building2,
  Wallet
} from 'lucide-react';

interface FiscalIndependenceDonutCardsProps {
  onExplainKpi?: (kpiId: string) => void;
}

export const FiscalIndependenceDonutCards: React.FC<FiscalIndependenceDonutCardsProps> = ({
  onExplainKpi,
}) => {
  // Tab view state for Card 2: 'donut' | 'table'
  const [card2View, setCard2View] = useState<'donut' | 'table'>('donut');
  const [activeSegment, setActiveSegment] = useState<'pnbp' | 'apbn' | 'hibah'>('pnbp');

  // Data for Kemandirian Fiskal
  const rasioKemandirian = 0.86;
  const pnbpBerjalan = 681.0; // Miliar Rupiah
  const belanjaOperasional = 791.8; // Miliar Rupiah
  const targetThreshold = 0.80;

  // Donut SVG Math for Kemandirian Fiskal
  const radius1 = 44;
  const strokeWidth1 = 14;
  const circumference1 = 2 * Math.PI * radius1;
  const strokeDashoffset1 = circumference1 * (1 - rasioKemandirian);

  // Data for Sumber Pendanaan (Item #14: Rekapitulasi Realisasi Penerimaan Berdasarkan Sumber Dana)
  const fundingSources = [
    {
      id: 'pnbp' as const,
      label: 'PNBP Layanan BLU',
      sumberDana: 'PNBP (Pendapatan Negara Bukan Pajak)',
      unitKerja: 'Seluruh Satker BLU BP Batam',
      tglAwal: '01/01/2026',
      tglAkhir: '30/04/2026',
      nominal: 681.0,
      nilaiFormatted: 'Rp 681.000.000.000',
      pagu: 980.0,
      percentage: 64.1,
      color: '#002B49', // Dark Navy
      highlightColor: '#1F4E79',
      role: 'Pendanaan Utama Operasional & Layanan',
      description: 'Penerimaan jasa pelabuhan, bandara, sewa lahan UWT & pengelolaan air bersih',
    },
    {
      id: 'apbn' as const,
      label: 'APBN (Rupiah Murni)',
      sumberDana: 'Rupiah Murni (APBN)',
      unitKerja: 'Biro Perencanaan & Keuangan',
      tglAwal: '01/01/2026',
      tglAkhir: '30/04/2026',
      nominal: 224.0,
      nilaiFormatted: 'Rp 224.000.000.000',
      pagu: 250.0,
      percentage: 21.1,
      color: '#38BDF8', // Sky Blue
      highlightColor: '#0EA5E9',
      role: 'Dukungan Proyek Strategis & Infrastruktur',
      description: 'Alokasi DIPA APBN untuk belanja modal jalan arteri, jembatan & fasilitas umum',
    },
    {
      id: 'hibah' as const,
      label: 'Hibah, BLU Lain & Bunga',
      sumberDana: 'Hibah & Kerjasama Treasury BLU',
      unitKerja: 'Biro Keuangan',
      tglAwal: '01/01/2026',
      tglAkhir: '30/04/2026',
      nominal: 157.2,
      nilaiFormatted: 'Rp 157.200.000.000',
      pagu: 160.0,
      percentage: 14.8,
      color: '#10B981', // Emerald
      highlightColor: '#059669',
      role: 'Optimalisasi Treasury & Bunga Deposito',
      description: 'Pendapatan jasa giro perbankan mitra, bunga penempatan deposito & kerja sama',
    },
  ];

  const totalFunding = fundingSources.reduce((acc, f) => acc + f.nominal, 0); // 1.062,2 M
  const totalPagu = fundingSources.reduce((acc, f) => acc + f.pagu, 0); // 1.390,0 M

  // Donut Segments Math for Sumber Pendanaan
  const radius2 = 44;
  const strokeWidth2 = 14;
  const circumference2 = 2 * Math.PI * radius2;

  // Cumulative offsets
  let cumulativePercent = 0;
  const segments = fundingSources.map((source) => {
    const strokeDasharray = `${(source.percentage / 100) * circumference2} ${circumference2}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference2);
    cumulativePercent += source.percentage;
    return {
      ...source,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  const selectedSource = fundingSources.find((s) => s.id === activeSegment) || fundingSources[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-sans select-none">
      {/* ========================================================================= */}
      {/* CARD 1: RASIO KEMANDIRIAN FISKAL BLU */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all p-4 sm:p-5 flex flex-col justify-between">
        <div className="space-y-3.5">
          {/* Header Bar matching Image 2 style */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#002B49] rounded-2xs" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-black text-[#002B49] uppercase tracking-wider">
                    Rasio Kemandirian Fiskal BLU
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Mandiri (0,86x)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  Daya Tutup Penerimaan PNBP Berjalan Terhadap Belanja Rutin Operasional
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {onExplainKpi && (
                <button
                  onClick={() => onExplainKpi('otonomi_fiskal')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
          </div>

          {/* Top 3 Executive Metric Tiles (Matching Image 3 Top Tiles) */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-slate-50/90 border border-slate-200/80 rounded-xl">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider block">
                Realisasi PNBP
              </span>
              <div className="text-sm sm:text-base font-black text-slate-900 font-mono mt-0.5">
                Rp {pnbpBerjalan.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
              </div>
              <span className="text-[9px] text-slate-400 font-medium block truncate">
                Kas Masuk Jasa BLU
              </span>
            </div>

            <div className="p-2.5 bg-slate-50/90 border border-slate-200/80 rounded-xl">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider block">
                Belanja Operasional
              </span>
              <div className="text-sm sm:text-base font-black text-slate-900 font-mono mt-0.5">
                Rp {belanjaOperasional.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
              </div>
              <span className="text-[9px] text-slate-400 font-medium block truncate">
                Beban Rutin Satker
              </span>
            </div>

            <div className="p-2.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
              <span className="text-[9.5px] font-bold text-emerald-800 uppercase tracking-wider block">
                Coverage Ratio
              </span>
              <div className="text-sm sm:text-base font-black text-emerald-700 font-mono mt-0.5">
                {rasioKemandirian.toFixed(2)}x
              </div>
              <span className="text-[9px] text-emerald-600 font-bold block truncate">
                Ambang Batas &ge; 0,80x
              </span>
            </div>
          </div>

          {/* VISUALISASI MODEL BARU: DONUT SCORE + RANKED PROGRESS BARS (MATCHING IMAGE 2 CARD 1) */}
          <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/80 space-y-3">
            {/* Top Score Banner: Donut + Predikat Header */}
            <div className="flex items-center gap-3.5 pb-2.5 border-b border-slate-200/70">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
                  <circle
                    cx="55"
                    cy="55"
                    r={radius1}
                    fill="transparent"
                    stroke="#E2E8F0"
                    strokeWidth={strokeWidth1}
                  />
                  <circle
                    cx="55"
                    cy="55"
                    r={radius1}
                    fill="transparent"
                    stroke="#002B49"
                    strokeWidth={strokeWidth1}
                    strokeDasharray={circumference1}
                    strokeDashoffset={strokeDashoffset1}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#002B49] font-mono leading-none">
                    {rasioKemandirian.toFixed(2)}
                  </span>
                  <span className="text-[7.5px] font-bold text-slate-400 font-mono">/ 1.00</span>
                </div>
              </div>

              <div className="min-w-0">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mb-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Predikat: Mandiri Fiskal Prima</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Realisasi kas masuk PNBP berjalan menutup <strong className="text-slate-900 font-mono">86,0%</strong> beban operasional rutin. Target Kemenkeu: <strong className="text-slate-900 font-mono">0,80x</strong>.
                </p>
              </div>
            </div>

            {/* 4 Ranked Horizontal Progress Bars (Matching Image 2 Card 1) */}
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-800">1. Daya Tutup Belanja Operasional (PNBP / Belanja Rutin)</span>
                  <span className="font-mono font-bold text-slate-900">0,86x <span className="text-slate-400 font-normal">/ 0,80x</span></span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '86%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-800">2. Kemandirian Total DIPA (PNBP / Pagu DIPA Total)</span>
                  <span className="font-mono font-bold text-slate-900">0,74x <span className="text-slate-400 font-normal">/ 0,70x</span></span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1F4E79] rounded-full" style={{ width: '74%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-800">3. Tingkat Likuiditas Kas Operasional</span>
                  <span className="font-mono font-bold text-slate-900">3,89 Bln <span className="text-slate-400 font-normal">/ 3,00 Bln</span></span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-800">4. Efisiensi Beban Pegawai terhadap PNBP</span>
                  <span className="font-mono font-bold text-slate-900">42,3% <span className="text-slate-400 font-normal">/ Maks 50%</span></span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '84.6%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info tag matching Image 2 */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-400 font-mono">
          <span>Standar Indikator Kemandirian BLU Kemenkeu RI</span>
          <span className="text-blue-700 font-medium">Katalog Item #8 &amp; Item #3</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: STRUKTUR KOMPOSISI SUMBER PENDANAAN */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all p-4 sm:p-5 flex flex-col justify-between">
        <div className="space-y-3.5">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#1F4E79] rounded-2xs" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-black text-[#002B49] uppercase tracking-wider">
                    Struktur Komposisi Sumber Pendanaan
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    Total: Rp {totalFunding.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  Komposisi Kas Masuk: PNBP Layanan BLU, Alokasi APBN &amp; Optimalisasi Treasury
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* View Switcher: Donut vs Table */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  onClick={() => setCard2View('donut')}
                  className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 font-medium ${
                    card2View === 'donut'
                      ? 'bg-white text-[#002B49] font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Tampilan Visualisasi Diagram Donat"
                >
                  <PieChartIcon className="w-3 h-3" />
                  <span>Donat</span>
                </button>
                <button
                  onClick={() => setCard2View('table')}
                  className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 font-medium ${
                    card2View === 'table'
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
                  className="px-2.5 py-1 text-[11px] font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
          </div>

          {/* Top 3 Executive Metric Tiles (Matching Image 3 Top Tiles) */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-slate-50/90 border border-slate-200/80 rounded-xl">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider block">
                PNBP Layanan BLU
              </span>
              <div className="text-sm sm:text-base font-black text-slate-900 font-mono mt-0.5">
                Rp 681,0 M
              </div>
              <span className="text-[9px] text-blue-700 font-bold block truncate">
                64,1% Porsi Terbesar
              </span>
            </div>

            <div className="p-2.5 bg-slate-50/90 border border-slate-200/80 rounded-xl">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider block">
                Rupiah Murni (APBN)
              </span>
              <div className="text-sm sm:text-base font-black text-slate-900 font-mono mt-0.5">
                Rp 224,0 M
              </div>
              <span className="text-[9px] text-sky-600 font-bold block truncate">
                21,1% Alokasi Proyek
              </span>
            </div>

            <div className="p-2.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
              <span className="text-[9.5px] font-bold text-emerald-800 uppercase tracking-wider block">
                Hibah &amp; Lainnya
              </span>
              <div className="text-sm sm:text-base font-black text-emerald-700 font-mono mt-0.5">
                Rp 157,2 M
              </div>
              <span className="text-[9px] text-emerald-600 font-bold block truncate">
                14,8% Kas Deposito
              </span>
            </div>
          </div>

          {/* VIEW MODE 1: VISUAL MODEL BARU (MATCHING IMAGE 2 & IMAGE 3) */}
          {card2View === 'donut' ? (
            <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/80 space-y-2.5">
              {fundingSources.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setActiveSegment(item.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    activeSegment === item.id
                      ? 'bg-white border-blue-400 shadow-2xs ring-1 ring-blue-300'
                      : 'bg-white/80 border-slate-200/80 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-bold text-slate-800 text-[11px] truncate">
                        {idx + 1}. {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
                      <strong className="text-slate-900 font-black">Rp {item.nominal.toFixed(1)} M</strong>
                      <span className="text-blue-700 font-bold text-[10.5px]">({item.percentage}%)</span>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden my-1">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-normal">
                    <span className="truncate">{item.description}</span>
                    <span className="font-mono text-slate-400 shrink-0 ml-1">Pagu: Rp {item.pagu.toFixed(1)} M</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* VIEW MODE 2: TABEL INFORMASI STRUKTUR SUMBER PENDANAAN */
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse min-w-[500px]">
                <thead className="bg-[#0B2545] text-white font-bold text-[10.5px]">
                  <tr>
                    <th className="py-2 px-2.5">SUMBER DANA</th>
                    <th className="py-2 px-2.5">UNIT KERJA</th>
                    <th className="py-2 px-2.5 text-right">PAGU</th>
                    <th className="py-2 px-2.5 text-right">REALISASI</th>
                    <th className="py-2 px-2.5 text-center">PORSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {fundingSources.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-2.5 font-sans font-semibold text-slate-900">
                        {item.label}
                      </td>
                      <td className="py-2 px-2.5 font-sans text-slate-600 text-[10.5px]">
                        {item.unitKerja}
                      </td>
                      <td className="py-2 px-2.5 text-right text-slate-500">
                        Rp {item.pagu.toFixed(1)} M
                      </td>
                      <td className="py-2 px-2.5 text-right font-bold text-slate-900">
                        Rp {item.nominal.toFixed(1)} M
                      </td>
                      <td className="py-2 px-2.5 text-center font-bold text-blue-700">
                        {item.percentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info tag matching Image 2 */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-400 font-mono">
          <span>Rekapitulasi Penerimaan Kas Berdasarkan Sumber Dana</span>
          <span className="text-blue-700 font-medium">Katalog Item #14</span>
        </div>
      </div>
    </div>
  );
};
