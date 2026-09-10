import React from 'react';
import { HELPDESK_TICKETS_DATA } from '../../data/pdsiData';
import { Headphones, Clock, CheckCircle2 } from 'lucide-react';

export const PdsiHelpdeskSection: React.FC = () => {
  const totalSubLayanan = HELPDESK_TICKETS_DATA.length;
  const overallSla = 98.4;
  const totalTiketTepatWaktu = 432;
  const totalTiketMasuk = 439;

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-2xs overflow-hidden flex flex-col font-sans select-none">
      {/* Tableau Worksheet Title Bar */}
      <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-2xs" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Kinerja Layanan IT Helpdesk &amp; Kepatuhan SLA
            </h3>
            <p className="text-[11px] text-slate-500 font-normal">
              Monitoring Norma Waktu Respon dan Penyelesaian Tiket Permintaan Pengguna
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Kategori Layanan:</span>
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200">
            {totalSubLayanan} Sub-Layanan TI
          </span>
        </div>
      </div>

      {/* Tableau BAN (Big Numbers) Strip */}
      <div className="p-4 border-b border-[#E2E8F0] bg-white grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Capaian SLA
          </span>
          <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5">
            {overallSla}%
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">Target Standar: ≥ 90,0%</span>
        </div>

        <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Tiket Tepat Waktu
          </span>
          <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
            {totalTiketTepatWaktu} Tiket
          </div>
          <span className="text-[10px] text-slate-500">Dari {totalTiketMasuk} Tiket Masuk</span>
        </div>

        <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            First Response Time
          </span>
          <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
            8,4 Mnt
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Norma Waktu ≤ 15 Mnt</span>
        </div>

        <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Indeks Kepuasan (CSAT)
          </span>
          <div className="text-xl font-black text-[#0B2545] font-mono mt-0.5">
            4,72 / 5,00
          </div>
          <span className="text-[10px] text-blue-700 font-semibold">Sangat Memuaskan</span>
        </div>
      </div>

      {/* Tableau Crosstab Table */}
      <div className="p-4 flex-1 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[760px]">
          <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
            <tr>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[10%]">
                Kode
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 w-[18%]">
                Nama Layanan
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 w-[22%]">
                Nama Sub Layanan
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[15%]">
                Kategori Prioritas Penanganan Layanan
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[11%]">
                Norma Waktu Respon
              </th>
              <th className="py-2 px-3 border-r border-blue-900/60 text-center w-[11%]">
                Norma Waktu Penyelesaian Penanganan
              </th>
              <th className="py-2 px-3 w-[13%]">
                Pengelola Layanan
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
            {HELPDESK_TICKETS_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <tr
                  key={item.id}
                  className={`hover:bg-blue-50/60 transition-colors ${
                    isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                  }`}
                >
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-[#1F4E79] align-middle">
                    {item.kode}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] font-semibold text-slate-900 align-middle">
                    {item.namaLayanan}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-700 align-middle">
                    {item.namaSubLayanan}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center align-middle">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.kategoriPrioritas.includes('P1')
                          ? 'bg-rose-50 text-rose-800 border border-rose-300'
                          : item.kategoriPrioritas.includes('P2')
                          ? 'bg-amber-50 text-amber-800 border border-amber-300'
                          : item.kategoriPrioritas.includes('P3')
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {item.kategoriPrioritas}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-medium text-slate-800 align-middle">
                    {item.normaWaktuRespon}
                  </td>
                  <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-semibold text-slate-800 align-middle">
                    {item.normaWaktuSelesai}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 align-middle">
                    {item.pengelolaLayanan}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tableau Caption Footer */}
      <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Headphones className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>Sistem: Portal Layanan &amp; Helpdesk TI Terintegrasi PDSI BP Batam</span>
        </div>
        <span className="font-mono">Standar: Service Level Agreement (SLA)</span>
      </div>
    </div>
  );
};
