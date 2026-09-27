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
import { MinatInvestasiItem, MINAT_INVESTASI_DATA } from '../../data/investasiData';
import { InvestasiVisualHeader } from './InvestasiVisualHeader';

interface InvestasiSektorMinatCardProps {
  minatList?: MinatInvestasiItem[];
  onOpenFormulaModal: (formulaId: string) => void;
}

export const InvestasiSektorMinatCard: React.FC<InvestasiSektorMinatCardProps> = ({
  minatList = MINAT_INVESTASI_DATA,
  onOpenFormulaModal,
}) => {
  // 1. Agregasi Sektor: Nama Sektor & Jumlah yang Minat Investasi
  const safeMinatList = minatList || [];

  const sektorRanking = useMemo(() => {
    const counts: Record<string, number> = {};

    safeMinatList.forEach((item) => {
      counts[item.sektor] = (counts[item.sektor] || 0) + 1;
    });

    const entries = Object.entries(counts).map(([sektor, count]) => ({
      sektor,
      jumlahMinat: count,
    }));

    // Urutkan dari jumlah minat terbanyak
    entries.sort((a, b) => b.jumlahMinat - a.jumlahMinat || a.sektor.localeCompare(b.sektor));
    return entries;
  }, [safeMinatList]);

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
    (sektorRanking || []).forEach((r, idx) => {
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
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden p-3.5 sm:p-4 font-sans"
    >
      {/* 1. Header Visualisasi Standar Pembangunan Infrastruktur */}
      <InvestasiVisualHeader
        datasetNumber={14}
        pdfPages="Hal. 48"
        classification="TERTUTUP"
        periode="PERSEMESTER"
        title="DATA MINAT INVESTASI DARI KUNJUNGAN DAN PAMERAN DALAM DAN LUAR NEGERI"
        visualName="Grafik Batang Vertikal Distribusi Minat per Sektor Industri (Vertical Column Chart)"
        attributes={[
          'SEMESTER',
          'TAHUN',
          'NAMA PERUSAHAAN',
          'SEKTOR',
          'MINAT INVESTASI',
        ]}
        onOpenFormula={() => onOpenFormulaModal('kpi_investasi_minat')}
        rightControls={
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={handleExportCsv}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
              title="Unduh Data CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">CSV</span>
            </button>
          </div>
        }
      />

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
