import React, { useState } from 'react';
import { HELPDESK_TICKETS_DATA } from '../../data/pdsiData';
import {
  Headphones,
  HelpCircle,
  BarChart3,
  Table as TableIcon,
} from 'lucide-react';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PdsiHelpdeskSectionProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PdsiHelpdeskSection: React.FC<PdsiHelpdeskSectionProps> = ({ onOpenFormulaModal }) => {
  const [viewModel, setViewModel] = useState<'visual' | 'table'>('visual');

  const totalSubLayanan = HELPDESK_TICKETS_DATA.length;
  const overallSla = 98.4;
  const totalTiketTepatWaktu = HELPDESK_TICKETS_DATA.reduce((acc, t) => acc + t.tiketTepatWaktu, 0);
  const totalTiketMasuk = HELPDESK_TICKETS_DATA.reduce((acc, t) => acc + t.tiketMasuk, 0);

  // Group tickets by priority for analytics
  const p1Count = HELPDESK_TICKETS_DATA.filter((t) => t.kategoriPrioritas.includes('P1')).reduce((acc, t) => acc + t.tiketMasuk, 0);
  const p2Count = HELPDESK_TICKETS_DATA.filter((t) => t.kategoriPrioritas.includes('P2')).reduce((acc, t) => acc + t.tiketMasuk, 0);
  const p3Count = HELPDESK_TICKETS_DATA.filter((t) => t.kategoriPrioritas.includes('P3')).reduce((acc, t) => acc + t.tiketMasuk, 0);
  const p4Count = HELPDESK_TICKETS_DATA.filter((t) => t.kategoriPrioritas.includes('P4')).reduce((acc, t) => acc + t.tiketMasuk, 0);

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-xl shadow-xs overflow-hidden flex flex-col font-sans select-none transition-all">
      {/* Tableau Worksheet Title Bar */}
      <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-xs" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Kinerja Layanan IT Helpdesk &amp; Kepatuhan SLA
              </h3>
              {onOpenFormulaModal && (
                <button
                  onClick={() => onOpenFormulaModal('kpi_helpdesk_sla')}
                  className="px-2 py-0.5 text-[10px] font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-normal">
              Monitoring Norma Waktu Respon dan Penyelesaian Tiket Permintaan Pengguna (Katalog Item #17 &amp; #21)
            </p>
          </div>
        </div>

        {/* View Model Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setViewModel('visual')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                viewModel === 'visual'
                  ? 'bg-white text-[#1F4E79] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilkan Diagram Analisis SLA Layanan"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="text-[11px]">Visual Grafis</span>
            </button>
            <button
              onClick={() => setViewModel('table')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                viewModel === 'table'
                  ? 'bg-white text-[#1F4E79] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilkan Tabel Rincian Sub Layanan TI"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="text-[11px]">Tabel Detail</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-[#1F4E79] font-bold border border-blue-200 text-xs font-mono">
            <span>{totalSubLayanan} Sub-Layanan TI</span>
          </div>
        </div>
      </div>

      {/* Tableau BAN (Big Numbers) Strip - SLA + Tiket Masuk + Prioritas 1-4 */}
      <div className="p-3.5 border-b border-[#E2E8F0] bg-slate-50/50 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-left">
        <div
          onClick={() => onOpenFormulaModal && onOpenFormulaModal('kpi_helpdesk_sla')}
          className="p-2.5 bg-white hover:bg-blue-50/60 border border-[#E2E8F0] hover:border-blue-300 rounded-lg cursor-pointer transition-all hover:shadow-2xs group"
          title="Klik untuk melihat Formula & Insight Capaian SLA (Tiket Sesuai Norma / Total Tiket × 100%)"
        >
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Capaian SLA</span>
            <span className="text-[9px] font-normal text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Formula &gt;</span>
          </div>
          <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5 group-hover:text-blue-900">
            {overallSla}%
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">Target &ge; 90,0%</span>
        </div>

        <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-lg">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Total Tiket Masuk
          </div>
          <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
            {totalTiketMasuk} Tiket
          </div>
          <span className="text-[10px] text-slate-500">Portal &amp; Hotline</span>
        </div>

        <div className="p-2.5 bg-white border border-rose-200 bg-rose-50/30 rounded-lg">
          <div className="flex items-center justify-between text-[10px] font-bold text-rose-800 uppercase">
            <span>Prioritas 1: Kritis</span>
            <span className="w-2 h-2 rounded-full bg-rose-600" />
          </div>
          <div className="text-xl font-black text-rose-700 font-mono mt-0.5">
            {p1Count} Tiket
          </div>
          <span className="text-[10px] text-rose-600 font-medium">SIMKEU &amp; Billing</span>
        </div>

        <div className="p-2.5 bg-white border border-amber-200 bg-amber-50/30 rounded-lg">
          <div className="flex items-center justify-between text-[10px] font-bold text-amber-800 uppercase">
            <span>Prioritas 2: Tinggi</span>
            <span className="w-2 h-2 rounded-full bg-amber-600" />
          </div>
          <div className="text-xl font-black text-amber-700 font-mono mt-0.5">
            {p2Count} Tiket
          </div>
          <span className="text-[10px] text-amber-600 font-medium">Jaringan &amp; FO</span>
        </div>

        <div className="p-2.5 bg-white border border-blue-200 bg-blue-50/30 rounded-lg">
          <div className="flex items-center justify-between text-[10px] font-bold text-blue-800 uppercase">
            <span>Prioritas 3: Sedang</span>
            <span className="w-2 h-2 rounded-full bg-blue-600" />
          </div>
          <div className="text-xl font-black text-blue-700 font-mono mt-0.5">
            {p3Count} Tiket
          </div>
          <span className="text-[10px] text-blue-600 font-medium">SSO &amp; TTE BSrE</span>
        </div>

        <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 uppercase">
            <span>Prioritas 4: Rutin</span>
            <span className="w-2 h-2 rounded-full bg-slate-500" />
          </div>
          <div className="text-xl font-black text-slate-800 font-mono mt-0.5">
            {p4Count} Tiket
          </div>
          <span className="text-[10px] text-slate-500 font-medium">PC &amp; End-Point</span>
        </div>
      </div>

      {/* Tableau Shelves Specification Badge */}
      <div className="px-4 pt-3">
        <TableauShelvesBadge
          showMe="Show Me #6 (Bullet Graph dengan Reference Line 90%) & #1 (Crosstab Detail)"
          rows="[nama_layanan], [nama_sub_layanan], [kategori_prioritas]"
          columns="SUM([tiket_masuk]), SUM([tiket_tepat_waktu]), [% Capaian SLA]"
          color="IF [% Capaian SLA] >= 90 THEN '#059669' ELSE '#E11D48' END"
          referenceLine="Constant Line Target Minimal SLA = 90,0%"
          filters="[tahun] = '2026', [bulan] = 'April'"
        />
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1">
        {viewModel === 'visual' ? (
          /* ================= MODEL VISUALISASI GRAFIS ================= */
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-[#0B2545] uppercase tracking-wide">
                  Tingkat Kepatuhan SLA per Sub-Layanan TI (Standar Minimal 90,0%)
                </span>
                <div className="flex items-center gap-3 text-[10.5px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span className="text-slate-700 font-medium">SLA &ge; 98% (Sangat Baik)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1F4E79]" />
                    <span className="text-slate-700 font-medium">SLA 90 - 97% (Baik)</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                {HELPDESK_TICKETS_DATA.map((item) => {
                  const isExcellent = item.capaianSla >= 98;

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-blue-50/30 hover:border-blue-300 transition-all shadow-2xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[11px] text-[#1F4E79] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                              {item.kode}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900">
                              {item.namaSubLayanan}
                            </h4>
                          </div>
                          <div className="text-[10.5px] text-slate-500 mt-0.5">
                            {item.namaLayanan} &bull; {item.pengelolaLayanan}
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 text-xs font-mono">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.kategoriPrioritas.includes('P1')
                                ? 'bg-rose-50 text-rose-800 border border-rose-300'
                                : item.kategoriPrioritas.includes('P2')
                                ? 'bg-amber-50 text-amber-800 border border-amber-300'
                                : 'bg-blue-50 text-blue-800 border border-blue-200'
                            }`}
                          >
                            {item.kategoriPrioritas}
                          </span>

                          <div className="text-right">
                            <span className="font-bold text-slate-700 text-xs">
                              {item.tiketTepatWaktu}/{item.tiketMasuk} Tiket
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Visual Progress Bar with Embedded Percentage Value */}
                      <div className="relative w-full bg-slate-100 h-5 rounded-md overflow-hidden border border-slate-200/80 flex items-center">
                        <div
                          className={`h-full rounded-md transition-all flex items-center justify-end px-2.5 shadow-2xs ${
                            isExcellent ? 'bg-emerald-600' : 'bg-[#1F4E79]'
                          }`}
                          style={{ width: `${item.capaianSla}%` }}
                        >
                          <span className="text-[10px] font-bold text-white font-mono whitespace-nowrap drop-shadow-2xs">
                            {item.capaianSla}%
                          </span>
                        </div>
                        {/* Target Reference Line at 90% */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10"
                          style={{ left: '90%' }}
                          title="Standar Minimal SLA: 90%"
                        />
                      </div>

                      {/* Operational Service Norms Footer */}
                      <div className="flex flex-wrap items-center justify-between text-[10.5px] text-slate-600 mt-2 font-mono">
                        <div className="flex items-center gap-3">
                          <span>Norma Respon: <strong className="text-slate-800">{item.normaWaktuRespon}</strong></span>
                          <span>Norma Selesai: <strong className="text-slate-800">{item.normaWaktuSelesai}</strong></span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ================= MODEL TABEL DETAIL ================= */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[880px]">
              <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
                <tr>
                  <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[9%]">
                    Kode
                  </th>
                  <th className="py-2.5 px-3 border-r border-blue-900/60 w-[18%]">
                    Nama Layanan
                  </th>
                  <th className="py-2.5 px-3 border-r border-blue-900/60 w-[20%]">
                    Nama Sub Layanan
                  </th>
                  <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[11%]">
                    Prioritas
                  </th>
                  <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[9%]">
                    Norma Respon
                  </th>
                  <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[9%]">
                    Norma Selesai
                  </th>
                  <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[7%]">
                    Tiket
                  </th>
                  <th className="py-2.5 px-3 border-r border-blue-900/60 text-right w-[8%]">
                    Tepat Waktu
                  </th>
                  <th className="py-2.5 px-3 text-center w-[9%]">
                    Capaian SLA
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
                        <div>{item.namaSubLayanan}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.pengelolaLayanan}</div>
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
                      <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-medium text-slate-800 align-middle">
                        {item.tiketMasuk}
                      </td>
                      <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-right font-mono font-bold text-emerald-700 align-middle">
                        {item.tiketTepatWaktu}
                      </td>
                      <td className="py-2.5 px-3 text-center align-middle">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                          {item.capaianSla}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-[#E2E8F0] font-bold text-xs border-t-2 border-slate-300">
                <tr>
                  <td colSpan={6} className="py-2.5 px-3 border-r border-slate-300 text-slate-900 uppercase">
                    KONSOLIDASI LAYANAN HELPDESK TI (ITEM #17 &amp; #21)
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-300 text-right font-mono font-bold text-slate-900">
                    {totalTiketMasuk}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-300 text-right font-mono font-bold text-emerald-700">
                    {totalTiketTepatWaktu}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-[#1F4E79] text-sm">
                    {overallSla}%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Tableau Caption Footer */}
      <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Headphones className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>Sistem Tiket: Helpdesk PDSI BP Batam (Integrasi WhatsApp Gateway &amp; Portal SPBE)</span>
        </div>
        <span className="font-mono">Standar Layanan: ISO 20000-1 IT Service Management</span>
      </div>
    </div>
  );
};
