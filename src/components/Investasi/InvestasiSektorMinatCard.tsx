import React, { useMemo } from 'react';
import {
  Briefcase,
  BarChart3,
  ExternalLink,
  Download,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
} from 'recharts';
import { MinatInvestasiItem } from '../../data/investasiData';

interface InvestasiSektorMinatCardProps {
  minatList: MinatInvestasiItem[];
  onOpenFormulaModal: (formulaId: string) => void;
}

export const InvestasiSektorMinatCard: React.FC<InvestasiSektorMinatCardProps> = ({
  minatList,
  onOpenFormulaModal,
}) => {
  // 1. Agregasi Sektor: Nama Sektor & Jumlah yang Minat Investasi
  const sektorRanking = useMemo(() => {
    const counts: Record<string, number> = {};

    minatList.forEach((item) => {
      counts[item.sektor] = (counts[item.sektor] || 0) + 1;
    });

    const entries = Object.entries(counts).map(([sektor, count]) => ({
      sektor,
      jumlahMinat: count,
    }));

    // Urutkan dari jumlah minat terbanyak
    entries.sort((a, b) => b.jumlahMinat - a.jumlahMinat || a.sektor.localeCompare(b.sektor));
    return entries;
  }, [minatList]);

  // Palet Warna Bar Vertikal
  const BAR_COLORS = [
    '#4F46E5', // Indigo
    '#2563EB', // Blue
    '#0D9488', // Teal
    '#059669', // Emerald
    '#0284C7', // Sky
    '#7C3AED', // Violet
    '#D97706', // Amber
    '#E11D48', // Rose
  ];

  // Ekspor CSV
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'No,Nama Sektor Industri,Jumlah Minat Investasi\n';
    sektorRanking.forEach((r, idx) => {
      csvContent += `${idx + 1},"${r.sektor}",${r.jumlahMinat}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `minat_investasi_berdasarkan_sektor.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Custom Tooltip Recharts Bar (HANYA Nama Sektor dan Jumlah Minat)
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs backdrop-blur-sm">
          <div className="font-bold text-xs text-indigo-300 border-b border-slate-700/80 pb-1.5 mb-1.5">
            {data.sektor}
          </div>

          <div className="flex items-center justify-between gap-4 font-mono">
            <span className="font-sans text-slate-300">Jumlah Minat:</span>
            <span className="font-bold text-white text-xs">
              {data.jumlahMinat} Minat
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="investasi-sektor-minat-card"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
    >
      {/* 1. Header Visualisasi */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100/70 border border-indigo-300/60 flex items-center justify-center text-indigo-800 shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                DATA MINAT INVESTASI BERDASARKAN SEKTOR
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 font-mono">
                Dataset No. 14 • Satu Data
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Visualisasi grafik batang vertikal jumlah minat investasi berdasarkan sektor industri
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => onOpenFormulaModal('kpi_investasi_minat')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Lihat Metadata Dataset 14"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
            <span>Katalog</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Ekspor data minat sektor ke CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* 2. VISUALISASI UTAMA: GRAFIK BATANG KE ATAS (VERTICAL COLUMN/BAR CHART) */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <span>Grafik Batang Jumlah Minat Investasi Berdasarkan Sektor</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Tinggi batang menunjukkan jumlah minat calon investor per nama sektor industri
            </p>
          </div>

          <div className="text-xs font-medium text-slate-500 font-mono">
            {sektorRanking.length} Sektor Industri
          </div>
        </div>

        {/* Recharts Vertical Bar Chart (Batang ke Atas) */}
        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sektorRanking}
              margin={{ top: 28, right: 16, left: -10, bottom: 65 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="sektor"
                interval={0}
                angle={-20}
                textAnchor="end"
                height={75}
                tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                axisLine={{ stroke: '#CBD5E1' }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
                unit=" Minat"
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="jumlahMinat" name="Jumlah Minat" radius={[6, 6, 0, 0]}>
                {sektorRanking.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                    className="hover:opacity-85 transition-opacity cursor-pointer"
                  />
                ))}
                <LabelList
                  dataKey="jumlahMinat"
                  position="top"
                  formatter={(val: any) => `${val} Minat`}
                  style={{ fontSize: 11, fontWeight: 'bold', fill: '#1E293B' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Footer Info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 font-mono gap-1">
        <span>
          Dataset No. 14: [Nama Sektor Industri], [Jumlah Minat Investasi]
        </span>
        <span className="text-[11px] text-slate-400 font-sans">
          Sumber Data: Direktorat Pelayanan Lalu Lintas Barang &amp; Penanaman Modal BP Batam
        </span>
      </div>
    </div>
  );
};
