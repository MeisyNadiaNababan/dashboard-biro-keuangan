import React from 'react';
import {
  Globe,
  TrendingUp,
  Download,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  WEBSITE_VISIT_YEARLY_DATA,
  WebsiteVisitYearlyItem,
} from '../../data/investasiData';

interface InvestasiWebsiteTrafficCardProps {
  onOpenFormulaModal: (formulaId: string) => void;
}

export const InvestasiWebsiteTrafficCard: React.FC<InvestasiWebsiteTrafficCardProps> = ({
  onOpenFormulaModal,
}) => {
  // Export CSV
  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Tahun,Total Kunjungan Website,Pertumbuhan YoY (%),Status\n';
    WEBSITE_VISIT_YEARLY_DATA.forEach((d) => {
      csvContent += `${d.tahun},${d.totalKunjungan},"${d.pertumbuhanYoYPersen}%","${d.status}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `traffic_website_invest_in_batam_tahunan.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Custom Tooltip for Recharts Line/Area (Hanya Total Kunjungan)
  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: WebsiteVisitYearlyItem = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-700/80 pb-1.5 mb-1.5">
            <span className="font-bold text-sm text-teal-300">Tahun {data.tahun}</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                data.status.includes('Target')
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
              }`}
            >
              {data.status}
            </span>
          </div>

          <div className="space-y-1 font-mono">
            <div className="flex items-center justify-between gap-4 text-slate-300">
              <span className="font-sans text-teal-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                Total Kunjungan:
              </span>
              <span className="font-bold text-white text-xs">
                {data.totalKunjungan.toLocaleString('id-ID')}
              </span>
            </div>

            {data.pertumbuhanYoYPersen > 0 && (
              <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-emerald-400 font-sans font-semibold text-[11px]">
                <span>Pertumbuhan YoY:</span>
                <span className="font-mono font-bold">+{data.pertumbuhanYoYPersen}%</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="investasi-website-traffic-card"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
    >
      {/* 1. Header Visualisasi */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-100/70 border border-teal-300/60 flex items-center justify-center text-teal-800 shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                JUMLAH KUNJUNGAN WEBSITE INVEST IN-BATAM DARI TAHUN KE TAHUN
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200 font-mono">
                Dataset No. 10 • Satu Data
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Grafik garis tren total volume kunjungan portal resmi Invest In-Batam (2021 – 2026 Target)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => onOpenFormulaModal('kpi_investasi_website')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Lihat Metadata Dataset 10"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
            <span>Katalog</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Ekspor data traffic ke CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor</span>
          </button>
        </div>
      </div>

      {/* 2. VISUALISASI UTAMA: GRAFIK GARIS TOTAL KUNJUNGAN TAHUN KE TAHUN (LINE / AREA CHART 2021 - 2026) */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              <span>Grafik Garis Total Kunjungan Website (Tahun 2021 – 2026)</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Perkembangan jumlah kunjungan calon investor dari tahun ke tahun
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <span>Total Kunjungan</span>
          </div>
        </div>

        {/* Recharts Area/Line Chart */}
        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={WEBSITE_VISIT_YEARLY_DATA}
              margin={{ top: 20, right: 24, left: 10, bottom: 12 }}
            >
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="tahun"
                tick={{ fontSize: 12, fill: '#334155', fontWeight: 600 }}
                tickLine={false}
                axisLine={{ stroke: '#CBD5E1' }}
                tickFormatter={(val) => `Tahun ${val}`}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${(val / 1000).toLocaleString('id-ID')}K`}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Area
                type="monotone"
                dataKey="totalKunjungan"
                name="Total Kunjungan"
                stroke="#0D9488"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVisits)"
                activeDot={{ r: 6, stroke: '#0F766E', strokeWidth: 2, fill: '#FFFFFF' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Footer Info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 font-mono gap-1">
        <span>
          Dataset No. 10: [Tahun], [Jumlah Kunjungan Website]
        </span>
        <span className="text-[11px] text-slate-400 font-sans">
          URL Portal: https://investinbatam.bpbatam.go.id
        </span>
      </div>
    </div>
  );
};
