import React from 'react';
import {
  Table as TableIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  PNBP_BANDARA_ITEMS,
  TOTAL_ANGGARAN_PNBP,
  TOTAL_REALISASI_PNBP,
  CAPAIAN_TOTAL_PNBP_PERSEN,
} from './bandaraData';
import { BandaraVisualHeader } from './BandaraVisualHeader';

interface Dataset1PnbpBandaraCardProps {
  onOpenFormula: () => void;
}

export const Dataset1PnbpBandaraCard: React.FC<Dataset1PnbpBandaraCardProps> = ({ onOpenFormula }) => {
  const formatMilyar = (val: number) => {
    return `Rp ${(val / 1000000000).toFixed(2)} M`;
  };

  // Prepare data for Recharts (in Billion IDR)
  const chartData = PNBP_BANDARA_ITEMS.map((item) => ({
    name: item.jenisPenerimaan.length > 28 ? item.jenisPenerimaan.slice(0, 26) + '...' : item.jenisPenerimaan,
    fullName: item.jenisPenerimaan,
    anggaranM: item.anggaranPnbp / 1000000000,
    realisasiM: item.realisasiTotalIdr / 1000000000,
    capaianPersen: item.persentaseCapaian,
    surplusM: (item.realisasiTotalIdr - item.anggaranPnbp) / 1000000000,
    value: item.realisasiTotalIdr,
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs font-sans">
      {/* Visual Header sesuai Standar Dashboard Pembangunan Infrastruktur */}
      <BandaraVisualHeader
        datasetNumber={1}
        pdfPages="Hal. 11"
        title="DATA REALISASI PENERIMAAN NEGARA BUKAN PAJAK (PNBP)"
        visualName="Sheet 1: Grafik Komparasi Anggaran vs Realisasi Total IDR & Tabel Rincian Realisasi PNBP (3 Atribut)"
        classification="TERTUTUP"
        periode="PERTAHUN"
        attributes={['1. JENIS ANGGARAN (PENERIMAAN)', '2. ANGGARAN PNBP (IDR)', '3. TOTAL IDR (REALISASI)']}
        onOpenFormula={onOpenFormula}
      />

      {/* SISI KIRI (GRAFIK BATANG KOMPARASI) & SISI KANAN (TABEL RINCIAN SCROLLABLE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch mt-3">
        {/* Sisi Kiri: Grafik Batang Komparasi */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-800">
                Grafik Komparasi: Realisasi Total IDR vs Anggaran PNBP
              </span>
              <p className="text-[10px] text-slate-500">
                Perbandingan target DIPA vs perolehan realisasi kebandarudaraan
              </p>
            </div>
            <div className="flex items-center gap-2.5 text-[10.5px] font-mono">
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-400 inline-block" />
                <span>Anggaran</span>
              </span>
              <span className="flex items-center gap-1 text-sky-800 font-bold">
                <span className="w-2.5 h-2.5 rounded-xs bg-sky-600 inline-block" />
                <span>Realisasi</span>
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 130, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  unit=" M"
                  domain={[0, 165]}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                  width={125}
                />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `Rp ${Number(val).toFixed(2)} Miliar`,
                    name === 'anggaranM' ? 'Target Anggaran PNBP' : 'Realisasi Total IDR',
                  ]}
                  labelFormatter={(label) => `Pos: ${label}`}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="anggaranM" name="Anggaran PNBP (IDR)" fill="#94A3B8" radius={[0, 3, 3, 0]} barSize={10} />
                <Bar dataKey="realisasiM" name="Realisasi Total IDR" fill="#0284C7" radius={[0, 3, 3, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sisi Kanan: Tabel Rincian Realisasi PNBP (Kecil, Ramping & Bisa Di-scroll) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <TableIcon className="w-3.5 h-3.5 text-sky-700" />
                <span>Tabel Rincian Realisasi PNBP (3 Atribut)</span>
              </span>
              <p className="text-[10px] text-slate-500">
                Dokumen Satu Data Hal. 11 &bull; 5 Pos Penerimaan Resmi (Scrollable)
              </p>
            </div>
            <span className="text-[9.5px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              109.63% Capaian
            </span>
          </div>

          {/* Container Tabel dengan Scrollable Vertikal & Horizontal */}
          <div className="border border-slate-200 rounded-lg overflow-hidden flex-1 max-h-[290px] overflow-y-auto">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead className="bg-slate-100/95 sticky top-0 z-10 border-b border-slate-200 text-slate-700 font-bold text-[9.5px] uppercase font-mono tracking-wider">
                <tr>
                  <th className="py-2 px-2 text-center w-8">No</th>
                  <th className="py-2 px-2.5">1. Jenis Anggaran (Penerimaan)</th>
                  <th className="py-2 px-2 text-right">2. Anggaran</th>
                  <th className="py-2 px-2 text-right text-sky-950 bg-sky-50/60">3. Realisasi</th>
                  <th className="py-2 px-2 text-right">Capaian</th>
                  <th className="py-2 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {PNBP_BANDARA_ITEMS.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-2 px-2 text-center font-mono text-slate-400 text-[10px]">
                      {idx + 1}
                    </td>
                    <td className="py-2 px-2.5">
                      <div className="font-bold text-slate-900 leading-snug line-clamp-1" title={item.jenisPenerimaan}>
                        {item.jenisPenerimaan}
                      </div>
                      <div className="text-[9.5px] text-slate-400 font-mono">{item.kodeAkun}</div>
                    </td>
                    <td className="py-2 px-2 text-right font-mono text-slate-600 whitespace-nowrap">
                      {formatMilyar(item.anggaranPnbp)}
                    </td>
                    <td className="py-2 px-2 text-right font-mono font-black text-sky-950 bg-sky-50/30 whitespace-nowrap">
                      {formatMilyar(item.realisasiTotalIdr)}
                    </td>
                    <td className="py-2 px-2 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                      {item.persentaseCapaian}%
                    </td>
                    <td className="py-2 px-2 text-center font-mono">
                      <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Surplus
                      </span>
                    </td>
                  </tr>
                ))}
                {/* Total Row Sticky di bawah */}
                <tr className="bg-slate-100/90 font-bold border-t-2 border-slate-300 text-[10.5px]">
                  <td colSpan={2} className="py-2 px-2.5 uppercase text-slate-900 font-black font-mono">
                    Total Realisasi PNBP
                  </td>
                  <td className="py-2 px-2 text-right font-mono font-bold text-slate-700 whitespace-nowrap">
                    {formatMilyar(TOTAL_ANGGARAN_PNBP)}
                  </td>
                  <td className="py-2 px-2 text-right font-mono font-black text-sky-950 bg-sky-100/50 whitespace-nowrap">
                    {formatMilyar(TOTAL_REALISASI_PNBP)}
                  </td>
                  <td className="py-2 px-2 text-right font-mono font-black text-emerald-800 whitespace-nowrap">
                    {CAPAIAN_TOTAL_PNBP_PERSEN}%
                  </td>
                  <td className="py-2 px-2 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-emerald-600 text-white">
                      Tercapai
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
