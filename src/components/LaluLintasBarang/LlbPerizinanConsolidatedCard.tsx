import React, { useState, useMemo } from 'react';
import {
  PieChart as PieChartIcon,
  BarChart3,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  KOMPOSISI_PERIZINAN_DATA,
  TREN_VOLUME_BULANAN,
} from '../../data/laluLintasBarangData';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface LlbPerizinanConsolidatedCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const LlbPerizinanConsolidatedCard: React.FC<LlbPerizinanConsolidatedCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  const totalPenerbitan = useMemo(
    () => KOMPOSISI_PERIZINAN_DATA.reduce((acc, curr) => acc + curr.volume, 0),
    []
  );

  const rataRataBulan = useMemo(() => {
    const total = TREN_VOLUME_BULANAN.reduce((acc, curr) => acc + curr.total, 0);
    return Math.round((total / TREN_VOLUME_BULANAN.length) * 10) / 10;
  }, []);

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 mb-4 shadow-2xs font-sans">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F4E79]" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>Komposisi &amp; Tren Penerbitan Layanan Perizinan LLB</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                Volume Pelayanan Terpadu
              </span>
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Konsolidasi Izin Usaha Kawasan, Izin Pemasukan &amp; Pengeluaran Industri, serta Alokasi Perdagangan KPBPBB
          </p>
        </div>

        {/* Formula Button */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowFormulaDetails(!showFormulaDetails)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
              showFormulaDetails
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Tampilkan Rumus & Calculated Field Tableau"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Formula</span>
            {showFormulaDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* 2. Tableau Shelves Badge (Compact) */}
      <div className="my-2">
        <TableauShelvesBadge
          showMe="Show Me #3 (Bars Tren Bulanan) + Show Me #11 (Donut Chart Komposisi)"
          columns="[Bulan], SUM([Volume Penerbitan SK])"
          rows="[Kategori Layanan Perizinan]"
          filters="[Tahun]=2026, [Status]='Disetujui', [Kode Satker]='DLLB'"
          detail="Visualisasi Komposisi & Tren Volume Pelayanan Perizinan Satu Data BP Batam (Hal 8-9)"
        />
      </div>

      {/* 3. Collapsible Formula & Mathematical Logic Box */}
      {showFormulaDetails && (
        <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-lg my-2 text-xs text-slate-800 animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-amber-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              Rumus &amp; Calculated Field Tableau (Volume Pelayanan Perizinan)
            </span>
            {onOpenFormulaModal && (
              <button
                onClick={() => onOpenFormulaModal('llb-pnbp')}
                className="text-[#1F4E79] hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <span>Buka Modal Kamus Lengkap</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[10.5px]">
            <div className="bg-white p-2 rounded border border-amber-200">
              <span className="text-slate-500 block mb-0.5">// 1. Volume Perizinan Total (Bulanan)</span>
              <code className="text-[#1F4E79] font-bold">
                [Total SK] = SUM([Izin Pemasukan]) + SUM([Izin Pengeluaran]) + SUM([IUK]) + SUM([Dagang])
              </code>
            </div>
            <div className="bg-white p-2 rounded border border-amber-200">
              <span className="text-slate-500 block mb-0.5">// 2. Proporsi Pangsa Layanan (%)</span>
              <code className="text-emerald-700 font-bold">
                [% Pangsa] = (SUM([Volume Kategori]) / TOTAL(SUM([Volume SK]))) * 100
              </code>
            </div>
          </div>
        </div>
      )}

      {/* 4. VISUALISASI GABUNGAN: TREN BULANAN (KIRI) & KOMPOSISI DONUT (KANAN) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3">
        {/* SISI KIRI (7 KOLOM): TREN VOLUME BULANAN (STACKED BARS) */}
        <div className="lg:col-span-7 p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-[#1F4E79]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Tren Volume Penerbitan Perizinan per Bulan
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
              Rata-rata: {rataRataBulan} SK/Bulan
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={TREN_VOLUME_BULANAN}
                margin={{ top: 15, right: 15, left: -15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="bulanSingkat"
                  tick={{ fontSize: 11, fill: '#64748B' }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  unit=" SK"
                  domain={[0, 600]}
                />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} SK`, name]}
                  labelFormatter={(label) => `Bulan: ${label}`}
                  contentStyle={{
                    backgroundColor: '#0F1E36',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '10.5px', paddingTop: '6px' }}
                />
                <Bar
                  dataKey="izinPemasukan"
                  name="Pemasukan"
                  stackId="a"
                  fill="#1F4E79"
                />
                <Bar
                  dataKey="izinPengeluaran"
                  name="Pengeluaran"
                  stackId="a"
                  fill="#2E75B6"
                />
                <Bar
                  dataKey="izinUsahaKawasan"
                  name="Kawasan (IUK)"
                  stackId="a"
                  fill="#0D9488"
                />
                <Bar
                  dataKey="izinPerdagangan"
                  name="Perdagangan"
                  stackId="a"
                  fill="#F59E0B"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-center">
            {TREN_VOLUME_BULANAN.map((item) => (
              <div key={item.bulan} className="p-1.5 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block">{item.bulanSingkat}</span>
                <span className="text-xs font-mono font-black text-slate-900">{item.total} SK</span>
              </div>
            ))}
          </div>
        </div>

        {/* SISI KANAN (5 KOLOM): DONUT CHART GABUNGAN KOMPOSISI PERIZINAN LLB */}
        <div className="lg:col-span-5 p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
            <div className="flex items-center gap-1.5">
              <PieChartIcon className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Donut Chart Komposisi Perizinan LLB
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
              Total {totalPenerbitan.toLocaleString('id-ID')} SK
            </span>
          </div>

          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={KOMPOSISI_PERIZINAN_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="volume"
                >
                  {KOMPOSISI_PERIZINAN_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, _name: any, item: any) => [
                    `${value} SK (${item.payload.persentase}%)`,
                    item.payload.kategori,
                  ]}
                  contentStyle={{
                    backgroundColor: '#0F1E36',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Central Score Callout (Persis Model Donut Tindak Lanjut) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total SK</span>
              <span className="text-xl font-black font-mono text-slate-900 leading-tight">
                {totalPenerbitan.toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] font-bold text-emerald-700">4 Sektor Izin</span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-1.5 text-xs pt-1 border-t border-slate-200">
            {KOMPOSISI_PERIZINAN_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-700 font-medium truncate max-w-[170px]" title={item.kategori}>
                    {item.kategori}
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-900">
                  {item.volume} SK ({item.persentase}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. STRATEGIC EXECUTIVE INSIGHT */}
      <div className="mt-3.5 p-2.5 rounded-lg bg-blue-50/70 border-l-4 border-blue-600 border border-blue-200/80">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed text-slate-800">
            <span className="font-bold text-blue-950 block">
              Insight Strategis Pelayanan Perizinan Lalu Lintas Barang:
            </span>
            <p className="mt-0.5 text-slate-700">
              Layanan Pemasukan Barang Industri mendominasi volume perizinan sebesar <strong>45,9%</strong> (<strong>845 SK</strong>), sejalan dengan percepatan rantai pasok manufaktur dan elektronik di Batam. Sinergi digitalisasi pengajuan dan verifikasi otomatis berhasil menekan antrean serta menjaga tren penerbitan tumbuh stabil rata-rata <strong>{rataRataBulan} SK</strong> setiap bulannya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
