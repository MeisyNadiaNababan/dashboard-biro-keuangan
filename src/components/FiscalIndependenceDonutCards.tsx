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
        <div>
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#002B49]/10 border border-[#002B49]/20 flex items-center justify-center text-[#002B49]">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-black text-[#002B49] uppercase tracking-wider">
                    Rasio Kemandirian Fiskal BLU
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Mandiri (0,86)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  Daya Tutup Penerimaan PNBP Berjalan Terhadap Belanja Rutin Operasional
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Formula & Insight Button */}
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

          {/* VISUALISASI DIAGRAM DONAT & DESKRIPSI LENGKAP */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 pt-3.5 items-center">
              {/* Donut Visual Center */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
                    {/* Background Track */}
                    <circle
                      cx="55"
                      cy="55"
                      r={radius1}
                      fill="transparent"
                      stroke="#F1F5F9"
                      strokeWidth={strokeWidth1}
                    />
                    {/* Progress Circle */}
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

                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-[#002B49] font-mono tracking-tight leading-none">
                      {rasioKemandirian.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      RATIO BLU
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <div className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Ambang Batas &ge; {targetThreshold.toFixed(2)} (Terpenuhi)</span>
                  </div>
                </div>
              </div>

              {/* Deskripsi & Rincian Parameter */}
              <div className="sm:col-span-7 space-y-2 text-xs">
                <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="flex items-start justify-between gap-2 text-[11px]">
                    <div>
                      <span className="font-bold text-slate-800 block">Penerimaan PNBP Berjalan:</span>
                      <span className="text-[10px] text-slate-500">
                        Kas masuk riil jasa layanan BLU yang telah disetor
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[#002B49] text-sm shrink-0">
                      Rp {pnbpBerjalan.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2 text-[11px] pt-1.5 border-t border-slate-200/60">
                    <div>
                      <span className="font-bold text-slate-800 block">Belanja Operasional Rutin:</span>
                      <span className="text-[10px] text-slate-500">
                        Beban belanja pegawai, barang &amp; pemeliharaan kantor
                      </span>
                    </div>
                    <span className="font-mono font-bold text-slate-800 text-sm shrink-0">
                      Rp {belanjaOperasional.toLocaleString('id-ID', { minimumFractionDigits: 1 })} M
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-semibold">Daya Tutup Mandiri:</span>
                    <span className="font-mono font-black text-emerald-700">
                      {(rasioKemandirian * 100).toFixed(1)}% Operasional
                    </span>
                  </div>
                </div>

                {/* Deskripsi Analisis Naratif */}
                <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-200/70 text-[11px] text-slate-700 leading-relaxed">
                  <strong className="text-blue-900 font-bold block mb-0.5">
                    Deskripsi &amp; Analisis Kemandirian:
                  </strong>
                  Realisasi kas masuk PNBP berjalan telah mampu menutup 86% beban operasional rutin BP Batam.
                  Sisa 14% dialokasikan dari saldo kas BLU tanpa pinjaman luar, mencerminkan otonomi fiskal yang tangguh.
                </div>
              </div>
            </div>
        </div>

        {/* Footer info tag */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-400 font-mono">
          <span>Katalog Item #8 &amp; Item #3 SIMKEU</span>
          <span className="text-slate-600 font-medium">Standar Evaluasi Kemenkeu RI</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: STRUKTUR KOMPOSISI SUMBER PENDANAAN */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all p-4 sm:p-5 flex flex-col justify-between">
        <div>
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#002B49]/10 border border-[#002B49]/20 flex items-center justify-center text-[#002B49]">
                <Share2 className="w-4 h-4" />
              </div>
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

              {/* Formula & Insight Button */}
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

          {/* VIEW MODE 1: DIAGRAM DONAT & DESKRIPSI LENGKAP */}
          {card2View === 'donut' ? (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 pt-3.5 items-center">
              {/* Multi-segment Donut Chart */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
                    {/* Background Track */}
                    <circle
                      cx="55"
                      cy="55"
                      r={radius2}
                      fill="transparent"
                      stroke="#F1F5F9"
                      strokeWidth={strokeWidth2}
                    />
                    {/* Slices */}
                    {segments.map((seg) => (
                      <circle
                        key={seg.id}
                        cx="55"
                        cy="55"
                        r={radius2}
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth={strokeWidth2}
                        strokeDasharray={seg.strokeDasharray}
                        strokeDashoffset={seg.strokeDashoffset}
                        strokeLinecap="butt"
                        className="cursor-pointer transition-all duration-300 hover:opacity-85"
                        onClick={() => setActiveSegment(seg.id)}
                      />
                    ))}
                  </svg>

                  {/* Center Tooltip Info */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tight">
                      {selectedSource.id.toUpperCase()}
                    </span>
                    <span className="text-sm font-black text-slate-900 font-mono leading-tight">
                      Rp {selectedSource.nominal.toLocaleString('id-ID', { minimumFractionDigits: 1 })}M
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 font-mono">
                      {selectedSource.percentage}%
                    </span>
                  </div>
                </div>

                {/* Selected Segment Tag matching user's requested style */}
                <div className="mt-1 px-2.5 py-1 bg-white border border-slate-300 rounded shadow-xs text-center cursor-pointer">
                  <span className="text-[11px] font-mono font-bold text-slate-800">
                    {selectedSource.id.toUpperCase()} : Rp {selectedSource.nominal.toLocaleString('id-ID', { minimumFractionDigits: 1 })}M ({selectedSource.percentage}%)
                  </span>
                </div>
              </div>

              {/* Segments Cards with Descriptions */}
              <div className="sm:col-span-7 space-y-2 text-xs">
                <div className="space-y-1.5">
                  {fundingSources.map((item) => {
                    const isSelected = item.id === activeSegment;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveSegment(item.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-400 shadow-2xs ring-1 ring-blue-400/30'
                            : 'bg-slate-50/70 border-slate-200/70 hover:bg-slate-100/60'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <div>
                            <div className="font-bold text-slate-800 text-[11px] leading-tight">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-slate-500 font-normal leading-tight mt-0.5">
                              {item.role}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0 pl-2">
                          <div className="font-mono font-black text-slate-900 text-[11px]">
                            Rp {item.nominal.toFixed(1)} M
                          </div>
                          <div className="text-[10px] font-mono font-bold text-blue-700">
                            {item.percentage}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Deskripsi Analisis Naratif */}
                <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-200/70 text-[11px] text-slate-700 leading-relaxed">
                  <strong className="text-blue-900 font-bold block mb-0.5">
                    Deskripsi &amp; Analisis Struktur Pendanaan:
                  </strong>
                  Penerimaan kas masuk didominasi oleh PNBP Layanan BLU (64,1%) sebagai penopang utama kemandirian rutin,
                  didukung alokasi belanja modal APBN (21,1%) untuk infrastruktur pulau Batam, serta 14,8% dari treasury &amp; hibah.
                </div>
              </div>
            </div>
          ) : (
            /* VIEW MODE 2: TABEL INFORMASI STRUKTUR SUMBER PENDANAAN */
            <div className="pt-3 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[580px]">
                <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
                  <tr>
                    <th className="py-2 px-2.5 border-r border-blue-900/60 w-[30%]">
                      SUMBER DANA
                    </th>
                    <th className="py-2 px-2.5 border-r border-blue-900/60 w-[26%]">
                      UNIT KERJA
                    </th>
                    <th className="py-2 px-2.5 border-r border-blue-900/60 text-center w-[15%]">
                      TANGGAL REKAP AWAL
                    </th>
                    <th className="py-2 px-2.5 border-r border-blue-900/60 text-center w-[15%]">
                      TANGGAL REKAP AKHIR
                    </th>
                    <th className="py-2 px-2.5 text-right w-[14%]">
                      NILAI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  {fundingSources.map((source, idx) => (
                    <tr
                      key={source.id}
                      className={`hover:bg-blue-50/50 ${idx % 2 === 1 ? 'bg-slate-50/50' : ''}`}
                    >
                      <td className="py-2 px-2.5 border-r border-slate-200 font-semibold text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: source.color }}
                          />
                          <span>{source.sumberDana}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2.5 border-r border-slate-200 text-slate-700">
                        {source.unitKerja}
                      </td>
                      <td className="py-2 px-2.5 border-r border-slate-200 text-center font-mono text-slate-600">
                        {source.tglAwal}
                      </td>
                      <td className="py-2 px-2.5 border-r border-slate-200 text-center font-mono text-slate-600">
                        {source.tglAkhir}
                      </td>
                      <td className="py-2 px-2.5 text-right font-mono font-bold text-[#002B49]">
                        {source.nilaiFormatted}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100/90 font-bold border-t-2 border-slate-200 font-mono text-xs">
                  <tr>
                    <td className="py-2 px-2.5 font-sans text-slate-900">
                      TOTAL PENERIMAAN KONSOLIDASI
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700 font-normal">
                      Seluruh Satker BP Batam
                    </td>
                    <td className="py-2 px-2.5 text-center text-slate-600">
                      01/01/2026
                    </td>
                    <td className="py-2 px-2.5 text-center text-slate-600">
                      30/04/2026
                    </td>
                    <td className="py-2 px-2.5 text-right text-[#002B49] font-black">
                      Rp 1.062.200.000.000
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Footer info tag */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-400 font-mono">
          <span>Katalog Item #14: Penerimaan Sumber Dana</span>
          <span className="text-slate-600 font-medium">keu_penerimaan_sumber_dana</span>
        </div>
      </div>
    </div>
  );
};
