import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { TOTAL_KARGO_TON } from './bandaraData';
import { BandaraVisualHeader } from './BandaraVisualHeader';

interface Dataset5EmpuKargoCardProps {
  onOpenFormula: () => void;
}

// Data Tren Bulanan Muatan EMPU Hang Nadim (Kargo, Bagasi, Pos)
const MONTHLY_EMPU_DATA = [
  { bulan: 'Jan', kargoInboundTon: 1980, kargoOutboundTon: 1640, totalKargoTon: 3620, posKg: 84000, bagasiTon: 3140 },
  { bulan: 'Feb', kargoInboundTon: 1870, kargoOutboundTon: 1540, totalKargoTon: 3410, posKg: 79000, bagasiTon: 2890 },
  { bulan: 'Mar', kargoInboundTon: 2060, kargoOutboundTon: 1730, totalKargoTon: 3790, posKg: 85000, bagasiTon: 3080 },
  { bulan: 'Apr (Mudik)', kargoInboundTon: 2280, kargoOutboundTon: 1900, totalKargoTon: 4180, posKg: 98000, bagasiTon: 4210 },
  { bulan: 'Mei', kargoInboundTon: 2090, kargoOutboundTon: 1730, totalKargoTon: 3820, posKg: 86000, bagasiTon: 3260 },
  { bulan: 'Jun (Libur)', kargoInboundTon: 2170, kargoOutboundTon: 1810, totalKargoTon: 3980, posKg: 91000, bagasiTon: 3840 },
  { bulan: 'Jul', kargoInboundTon: 2210, kargoOutboundTon: 1840, totalKargoTon: 4050, posKg: 93000, bagasiTon: 3990 },
  { bulan: 'Agu', kargoInboundTon: 2130, kargoOutboundTon: 1780, totalKargoTon: 3910, posKg: 88000, bagasiTon: 3410 },
  { bulan: 'Sep', kargoInboundTon: 2050, kargoOutboundTon: 1700, totalKargoTon: 3750, posKg: 85000, bagasiTon: 3120 },
  { bulan: 'Okt', kargoInboundTon: 2120, kargoOutboundTon: 1770, totalKargoTon: 3890, posKg: 87000, bagasiTon: 3250 },
  { bulan: 'Nov', kargoInboundTon: 2140, kargoOutboundTon: 1780, totalKargoTon: 3920, posKg: 88000, bagasiTon: 3200 },
  { bulan: 'Des (Nataru)', kargoInboundTon: 2430, kargoOutboundTon: 2020, totalKargoTon: 4450, posKg: 104000, bagasiTon: 4540 },
];

export const Dataset5EmpuKargoCard: React.FC<Dataset5EmpuKargoCardProps> = ({ onOpenFormula }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs font-sans">
      {/* Visual Header sesuai Standar Dashboard Pembangunan Infrastruktur */}
      <BandaraVisualHeader
        datasetNumber={5}
        pdfPages="Hal. 12"
        title="EKSPEDISI MUATAN PESAWAT UDARA (EMPU) DI BATAM"
        visualName="Sheet 1: Grafik Tren Muatan Logistik Udara (Kargo Inbound/Outbound, Bagasi, Pos) Bulanan"
        classification="TERBUKA"
        periode="PERTRIWULAN"
        attributes={[
          'TANGGAL PENERBANGAN',
          'WAKTU',
          'ASL',
          'TJN',
          'OPERATOR',
          'NOMOR PENERBANGAN',
          'TYPE PESAWAT',
          'A/D',
          'BAGASI',
          'KARGO',
          'POS',
        ]}
        onOpenFormula={onOpenFormula}
      />

      {/* Mini Executive Strip Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gradient-to-r from-amber-50/70 via-sky-50/40 to-slate-50 rounded-xl border border-amber-200/70 my-4 text-xs">
        <div>
          <span className="text-slate-500 block text-[10.5px]">Total Kargo Udara (EMPU)</span>
          <span className="text-base font-mono font-black text-amber-950 block">{TOTAL_KARGO_TON.toLocaleString('id-ID')} Ton</span>
          <span className="text-[10px] text-amber-800 block mt-0.5 font-mono">54% Inbound | 46% Outbound</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Total Pos Udara Tercatat</span>
          <span className="text-base font-mono font-black text-slate-800 block">1.061 Ton</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Surat, Kilat Khusus &amp; Dokumen</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Kapasitas Terminal Kargo</span>
          <span className="text-base font-mono font-black text-sky-900 block">60.000 Ton/Tahun</span>
          <span className="text-[10px] text-emerald-700 block mt-0.5 font-semibold">Tingkat Utilisasi 77,1%</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Regulated Agent Terdaftar</span>
          <span className="text-sm font-mono font-bold text-slate-900 block">7 Badan Usaha EMPU</span>
          <span className="text-[10px] text-emerald-800 block mt-0.5 font-semibold">Tersertifikasi Ditjen Hubud</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SHEET 1: GRAFIK TREN MUATAN EMPU BULANAN                                  */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-800">
                Tren Muatan Kargo EMPU Masuk (Inbound) vs Keluar (Outbound) per Bulan
              </span>
              <p className="text-[10.5px] text-slate-500">
                Aliran logistik suku cadang manufaktur, e-commerce, kargo segar (perishable), dan pos udara di Hang Nadim
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-amber-800 font-bold">
                <span className="w-3 h-3 rounded-xs bg-amber-500 inline-block" />
                <span>Kargo Inbound (Ton)</span>
              </span>
              <span className="flex items-center gap-1.5 text-sky-800 font-bold">
                <span className="w-3 h-3 rounded-xs bg-sky-600 inline-block" />
                <span>Kargo Outbound (Ton)</span>
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_EMPU_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Ton" />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `${Number(val).toLocaleString('id-ID')} Ton`,
                    name === 'kargoInboundTon' ? 'Kargo Masuk (Inbound)' : 'Kargo Keluar (Outbound)',
                  ]}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="kargoInboundTon" name="Kargo Inbound (Masuk)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="kargoOutboundTon" name="Kargo Outbound (Keluar)" fill="#0284C7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
