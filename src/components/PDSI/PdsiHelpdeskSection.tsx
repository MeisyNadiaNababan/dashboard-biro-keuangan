import React from 'react';
import { HELPDESK_TICKETS_DATA } from '../../data/pdsiData';
import { Headphones, Clock, CheckCircle2, AlertCircle, ArrowUpRight, BarChart3, Users } from 'lucide-react';

export const PdsiHelpdeskSection: React.FC = () => {
  const totalTiket = HELPDESK_TICKETS_DATA.reduce((acc, t) => acc + t.jumlahTiket, 0);
  const totalTepatWaktu = HELPDESK_TICKETS_DATA.reduce((acc, t) => acc + t.selesaiTepatWaktu, 0);
  const overallSla = Math.round((totalTepatWaktu / totalTiket) * 1000) / 10;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                LAYANAN IT HELPDESK &amp; MONITORING SLA
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                Item #17 &amp; #21 di PDF
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Evaluasi kepatuhan SLA tiket insiden, norma waktu respon &amp; penyelesaian tiket layanan
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block font-mono">Total Tiket Periode Ini</span>
          <span className="text-sm font-extrabold text-blue-700 font-mono">
            {totalTiket} Tiket Masuk
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 flex-1">
        {/* Metric Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg">
            <span className="text-[10px] font-semibold text-blue-700 block">
              SLA Capaian Penyelesaian Tepat Waktu
            </span>
            <div className="text-xl font-extrabold text-blue-900 font-mono mt-0.5">
              {overallSla}%
            </div>
            <span className="text-[10px] text-blue-600 font-semibold">
              Target Standar SOP: ≥ 90,0%
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[10px] font-semibold text-slate-600 block">
              First Response Time (FRT)
            </span>
            <div className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">
              8,4 Menit
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">
              Lebih cepat dari norma (15 Menit)
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[10px] font-semibold text-slate-600 block">
              Indeks Kepuasan Pemohon Layanan
            </span>
            <div className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">
              4,72 / 5,0
            </div>
            <span className="text-[10px] text-slate-500">
              Kategori: Sangat Memuaskan (Item #11)
            </span>
          </div>
        </div>

        {/* Table of Tickets (Item #21 PDF) */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 border-r border-slate-200">Kategori &amp; Nama Layanan TI</th>
                <th className="py-2.5 px-3 border-r border-slate-200 text-center">Norma Respon</th>
                <th className="py-2.5 px-3 border-r border-slate-200 text-center">Norma Selesai</th>
                <th className="py-2.5 px-3 border-r border-slate-200 text-center">Total Tiket</th>
                <th className="py-2.5 px-3 border-r border-slate-200 text-center">Tepat Waktu</th>
                <th className="py-2.5 px-3 text-center">Capaian SLA (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-[11px]">
              {HELPDESK_TICKETS_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 border-r border-slate-200">
                    <div className="font-bold text-slate-900">{item.namaLayanan}</div>
                    <span className="text-[10px] text-slate-500 font-mono">{item.kategori}</span>
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-center font-mono text-slate-600">
                    {item.normaWaktuRespon}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-center font-mono text-slate-600">
                    {item.normaWaktuSelesai}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-center font-bold font-mono text-slate-800">
                    {item.jumlahTiket}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-center font-mono text-emerald-700 font-bold">
                    {item.selesaiTepatWaktu}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                        item.slaPercent >= 95
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : item.slaPercent >= 90
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-300'
                      }`}
                    >
                      {item.slaPercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
        <span className="font-mono">Formula: (Tiket Selesai ≤ Norma / Total Tiket) * 100</span>
        <span>Aplikasi Helpdesk PDSI BP Batam</span>
      </div>
    </div>
  );
};
