import React from 'react';
import {
  Table as TableIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
  Bar,
  ComposedChart,
} from 'recharts';
import {
  TREN_BULANAN_PENUMPANG,
} from './bandaraData';
import { BandaraFilterState } from './types';
import { BandaraVisualHeader } from './BandaraVisualHeader';

interface Dataset2ArusLaluLintasUdaraCardProps {
  filters?: BandaraFilterState;
  onOpenFormula: () => void;
}

export const Dataset2ArusLaluLintasUdaraCard: React.FC<Dataset2ArusLaluLintasUdaraCardProps> = ({
  onOpenFormula,
}) => {
  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  // Flight monthly trends (Domestic vs Intl breakdown)
  const flightMonthlyData = TREN_BULANAN_PENUMPANG.map((item) => {
    const intl = Math.round(item.totalPenerbangan * 0.042);
    const dom = item.totalPenerbangan - intl;
    const arrival = Math.round(item.totalPenerbangan / 2);
    const departure = item.totalPenerbangan - arrival;
    return {
      bulan: item.kodeBulan,
      namaBulan: item.bulan,
      totalPenerbangan: item.totalPenerbangan,
      domestik: dom,
      internasional: intl,
      arrival: arrival,
      departure: departure,
      penumpangTotal: item.totalPenumpang,
      seatLoadFactor: item.seatLoadFactor,
    };
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs font-sans">
      {/* Visual Header sesuai Standar Dashboard Pembangunan Infrastruktur */}
      <BandaraVisualHeader
        datasetNumber={2}
        pdfPages="Hal. 11"
        title="DAFTAR ARUS LALU LINTAS UDARA (BANDARA HANG NADIM BATAM)"
        visualName="Sheet 1: Visualisasi Tren Jumlah Penerbangan & Tabel Pergerakan (Domestik vs Internasional & A/D)"
        classification="TERBUKA"
        periode="PERTRIWULAN"
        attributes={[
          'TANGGAL PENERBANGAN',
          'WAKTU',
          'ASL',
          'TJN',
          'OPERATOR',
          'ICAO',
          'BTB',
          'JENIS PENERBANGAN',
          'NOMOR PENERBANGAN',
          'REGISTRASI PESAWAT',
          'TYPE PESAWAT',
          'KAPASITAS KURSI',
          'A/D',
          'PENUMPANG DEWASA',
          'PENUMPANG ANAK',
          'PENUMPANG BAYI',
          'PNP TRANSIT DEWASA/ANAK/BAYI',
          'BAGASI',
          'KARGO',
        ]}
        onOpenFormula={onOpenFormula}
      />

      {/* ========================================================================= */}
      {/* SHEET 1: TREN JUMLAH PENERBANGAN SETIAP BULAN & TABEL KEDATANGAN / KEBERANGKATAN */}
      {/* ========================================================================= */}
      <div className="space-y-4 mt-4">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-800">
                Tren Pergerakan Pesawat (Penerbangan) Setiap Bulan: Domestik vs Internasional
              </span>
              <p className="text-[10.5px] text-slate-500">
                Data pemantauan frekuensi penerbangan terjadwal dan charter di Bandara Hang Nadim Batam (BTH)
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-sky-800 font-bold">
                <span className="w-3 h-3 rounded-xs bg-sky-600 inline-block" />
                <span>Domestik</span>
              </span>
              <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
                <span className="w-3 h-3 rounded-xs bg-indigo-500 inline-block" />
                <span>Internasional</span>
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={flightMonthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Flts" domain={[0, 4200]} />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `${formatNumber(val)} Penerbangan`,
                    name === 'domestik' ? 'Penerbangan Domestik' : name === 'internasional' ? 'Penerbangan Internasional' : 'Total Pergerakan',
                  ]}
                  labelFormatter={(label) => `Bulan: ${label}`}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="domestik" name="Penerbangan Domestik" fill="#0284C7" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="internasional" name="Penerbangan Internasional" fill="#6366F1" stackId="a" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="totalPenerbangan" name="Total Pergerakan Pesawat" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3.5, fill: '#F59E0B' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABEL INFORMASI JUMLAH PENERBANGAN DOMESTIK & INTERNASIONAL (KEDATANGAN & KEBERANGKATAN) */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <TableIcon className="w-4 h-4 text-sky-700" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  Tabel Rincian Jumlah Penerbangan Domestik &amp; Internasional (Kedatangan &amp; Keberangkatan)
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">
                  Buku Satu Data BP Batam &bull; Distribusi Arus Pergerakan Lalu Lintas Udara (A/D)
                </span>
              </div>
            </div>
            <span className="text-[10.5px] font-mono text-sky-900 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Total 38.450 Penerbangan
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200 font-mono">
                <tr>
                  <th className="py-2.5 px-3 text-center w-10">No</th>
                  <th className="py-2.5 px-3">Kategori Penerbangan</th>
                  <th className="py-2.5 px-3">Arah Pergerakan (A/D)</th>
                  <th className="py-2.5 px-3 text-right">Jumlah Penerbangan</th>
                  <th className="py-2.5 px-3 text-right">Porsi (%)</th>
                  <th className="py-2.5 px-3 text-right">Rata-rata Harian</th>
                  <th className="py-2.5 px-3 text-center">Status Operasional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {/* 1. Domestik Kedatangan */}
                <tr className="hover:bg-sky-50/40 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-400 font-bold">1</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    Penerbangan Domestik
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      Kedatangan (Arrival)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900">
                    18.390 Flights
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-sky-700">
                    47,83%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                    ~50 penerbangan/hari
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Normal &bull; On Schedule
                    </span>
                  </td>
                </tr>

                {/* 2. Domestik Keberangkatan */}
                <tr className="hover:bg-sky-50/40 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-400 font-bold">2</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    Penerbangan Domestik
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                      Keberangkatan (Departure)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900">
                    18.460 Flights
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-sky-700">
                    48,01%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                    ~51 penerbangan/hari
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Normal &bull; On Schedule
                    </span>
                  </td>
                </tr>

                {/* Subtotal Domestik */}
                <tr className="bg-sky-50/60 font-bold text-sky-950 border-t border-b border-sky-100 font-mono text-[11px]">
                  <td colSpan={3} className="py-2 px-3 text-right font-bold uppercase">
                    Subtotal Penerbangan Domestik:
                  </td>
                  <td className="py-2 px-3 text-right font-black text-sky-950">
                    36.850 Flights
                  </td>
                  <td className="py-2 px-3 text-right font-black text-sky-800">
                    95,84%
                  </td>
                  <td className="py-2 px-3 text-right text-slate-700">
                    ~101 flights/hari
                  </td>
                  <td className="py-2 px-3 text-center font-sans">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-sky-200/70 text-sky-900">
                      Pangsa Utama (95,8%)
                    </span>
                  </td>
                </tr>

                {/* 3. Internasional Kedatangan */}
                <tr className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-400 font-bold">3</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    Penerbangan Internasional
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
                      Kedatangan (Arrival)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-black text-purple-950">
                    790 Flights
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-purple-800">
                    2,05%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                    ~2-3 penerbangan/hari
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-purple-100 text-purple-800">
                      KUL, XMN, ICN
                    </span>
                  </td>
                </tr>

                {/* 4. Internasional Keberangkatan */}
                <tr className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-400 font-bold">4</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    Penerbangan Internasional
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-fuchsia-50 text-fuchsia-800 border border-fuchsia-200">
                      Keberangkatan (Departure)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-black text-purple-950">
                    810 Flights
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-purple-800">
                    2,11%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                    ~2-3 penerbangan/hari
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-purple-100 text-purple-800">
                      KUL, XMN, ICN
                    </span>
                  </td>
                </tr>

                {/* Subtotal Internasional */}
                <tr className="bg-purple-50/60 font-bold text-purple-950 border-t border-b border-purple-100 font-mono text-[11px]">
                  <td colSpan={3} className="py-2 px-3 text-right font-bold uppercase">
                    Subtotal Penerbangan Internasional:
                  </td>
                  <td className="py-2 px-3 text-right font-black text-purple-950">
                    1.600 Flights
                  </td>
                  <td className="py-2 px-3 text-right font-black text-purple-800">
                    4,16%
                  </td>
                  <td className="py-2 px-3 text-right text-slate-700">
                    ~4-5 flights/hari
                  </td>
                  <td className="py-2 px-3 text-center font-sans">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-200/70 text-purple-900">
                      Rute Internasional
                    </span>
                  </td>
                </tr>

                {/* Total Konsolidasi Grand Total */}
                <tr className="bg-slate-100/90 font-bold text-slate-900 border-t-2 border-slate-300 text-xs font-mono">
                  <td colSpan={3} className="py-3 px-3 uppercase text-slate-950 font-black text-right">
                    Total Seluruh Pergerakan Pesawat (Grand Total):
                  </td>
                  <td className="py-3 px-3 text-right font-black text-sky-950 text-sm">
                    38.450 Flights
                  </td>
                  <td className="py-3 px-3 text-right font-black text-emerald-800 text-sm">
                    100,0%
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-800">
                    ~106 flights/hari
                  </td>
                  <td className="py-3 px-3 text-center font-sans">
                    <span className="px-2.5 py-0.5 rounded text-[9.5px] font-bold bg-emerald-600 text-white shadow-2xs">
                      100% Tercapai
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
