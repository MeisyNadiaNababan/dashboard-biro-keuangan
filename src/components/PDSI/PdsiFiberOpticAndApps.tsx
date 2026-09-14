import React, { useState } from 'react';
import { FIBER_OPTIC_ROUTES, SPBE_INDEX_INFO_DATA } from '../../data/pdsiData';
import {
  Network,
  MapPin,
  HelpCircle,
  BarChart3,
  Table as TableIcon,
  Award,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PdsiFiberOpticAndAppsProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PdsiFiberOpticAndApps: React.FC<PdsiFiberOpticAndAppsProps> = ({ onOpenFormulaModal }) => {
  const [activeTab, setActiveTab] = useState<'fo' | 'apps'>('fo');
  const [viewModel, setViewModel] = useState<'visual' | 'table'>('visual');

  const totalCore = FIBER_OPTIC_ROUTES.reduce((acc, r) => acc + r.jmlhcore, 0);
  const totalKm = FIBER_OPTIC_ROUTES.reduce((acc, r) => acc + r.panjang, 0);

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-xl shadow-xs overflow-hidden flex flex-col font-sans select-none transition-all">
      {/* Tableau Worksheet Title Bar */}
      <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-xs" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                {activeTab === 'fo' ? 'Jaringan Backbone Fiber Optik' : 'Informasi Evaluasi & Indeks SPBE'}
              </h3>
              {onOpenFormulaModal && (
                <button
                  onClick={() => onOpenFormulaModal(activeTab === 'apps' ? 'indeks_spbe' : 'kpi_panjang_fo')}
                  className="px-2 py-0.5 text-[10px] font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-normal">
              {activeTab === 'fo'
                ? 'Pemantauan Koridor Jaringan Kabel Bawah Tanah & Kapasitas Core FO BP Batam'
                : 'Pencapaian Indeks SPBE, Bukti Dukung (Evidence) & Status Pemenuhan Kriteria Perkin 1-5'}
            </p>
          </div>
        </div>

        {/* View Model Controls & Tab Switcher */}
        <div className="flex items-center gap-2">
          {activeTab === 'fo' && (
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setViewModel('visual')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewModel === 'visual'
                    ? 'bg-white text-[#1F4E79] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tampilkan Model Visual Grafis / Peta Koridor"
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
                title="Tampilkan Model Tabel Detail / Crosstab View"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="text-[11px]">Tabel Detail</span>
              </button>
            </div>
          )}

          {/* Tab Selection */}
          <div className="flex items-center bg-[#E2E8F0] p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('fo')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === 'fo'
                  ? 'bg-[#1F4E79] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Backbone FO
            </button>
            <button
              onClick={() => setActiveTab('apps')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === 'apps'
                  ? 'bg-[#1F4E79] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Indeks SPBE
            </button>
          </div>
        </div>
      </div>

      {/* Tableau BAN (Big Numbers) Strip */}
      <div className={`p-3.5 border-b border-[#E2E8F0] bg-slate-50/50 grid grid-cols-1 ${activeTab === 'fo' ? 'sm:grid-cols-2' : 'sm:grid-cols-1'} gap-2.5 text-left`}>
        {activeTab === 'fo' ? (
          <>
            <div
              onClick={() => onOpenFormulaModal && onOpenFormulaModal('kpi_panjang_fo')}
              className="p-2.5 bg-white hover:bg-blue-50/60 border border-[#E2E8F0] hover:border-blue-300 rounded-lg cursor-pointer transition-all hover:shadow-2xs group"
              title="Klik untuk melihat Formula & Insight Total Panjang Jaringan FO (284,5 KM)"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Panjang Jaringan FO</span>
                <span className="text-[9px] font-normal text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Formula &gt;</span>
              </div>
              <div className="text-xl font-black text-[#1F4E79] font-mono mt-0.5 group-hover:text-blue-900">
                284,5 KM
              </div>
              <span className="text-[10px] text-blue-700 font-semibold">8 Koridor Ruas Utama Batam</span>
            </div>

            <div className="p-2.5 bg-white border border-[#E2E8F0] rounded-lg">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Kapasitas Core FO
              </div>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                {totalCore} Core
              </div>
              <span className="text-[10px] text-slate-500">Corning, Prysmian &amp; Furukawa</span>
            </div>
          </>
        ) : (
          <div
            onClick={() => onOpenFormulaModal && onOpenFormulaModal('indeks_spbe')}
            className="p-3 bg-white hover:bg-blue-50/60 border border-[#E2E8F0] hover:border-blue-300 rounded-lg cursor-pointer transition-all hover:shadow-2xs group flex flex-wrap items-center justify-between gap-3"
            title="Klik untuk melihat Formula & Insight Indeks SPBE BP Batam"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-[#1F4E79] rounded-lg border border-blue-200">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">KPI Indeks SPBE BP Batam</span>
                  <span className="text-[9px] font-normal text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Formula &gt;</span>
                </div>
                <div className="text-2xl font-black text-[#1F4E79] font-mono mt-0.5">
                  3.72 <span className="text-sm font-sans font-bold text-emerald-700">(Sangat Baik)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block uppercase">Target Perkin 2026</span>
                <span className="font-mono font-bold text-slate-900 text-sm">3.50</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Status Capaian</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">Terlampaui (+0.22)</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Skala Pengukuran</span>
                <span className="font-mono font-bold text-slate-700 text-sm">0.00 - 5.00</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tableau Shelves Specification Badge */}
      <div className="px-4 pt-3">
        {activeTab === 'fo' ? (
          <TableauShelvesBadge
            showMe="Show Me #6 (Horizontal Bar Panjang & Core) & #14 (GIS Corridor Line)"
            rows="[ruas], [jalur], [klasifikasi]"
            columns="SUM([panjang]), SUM([jmlhcore])"
            color="[klasifikasi] (Biru Tua = Backbone Utama, Hijau = Interkoneksi Kawasan)"
            filters="[tahun] = '2026', [status] = 'Operasional'"
          />
        ) : (
          <TableauShelvesBadge
            showMe="Show Me #1 (Crosstab Detail Evaluasi KemenPAN-RB & Perkin)"
            rows="[domain_spbe], [aspek_spbe]"
            columns="[level_nilai] (0-5), [bobot], [tahun], [status_pemenuhan_kriteria_1_5]"
            color="IF [level_nilai] >= 3.5 THEN 'Sangat Baik' ELSE 'Baik' END"
            filters="[tahun] = '2026', [skala] = '0.00 - 5.00'"
          />
        )}
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1">
        {activeTab === 'fo' ? (
          viewModel === 'visual' ? (
            /* ================= MODEL VISUALISASI FO ================= */
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0B2545] uppercase tracking-wide">
                    Distribusi Koridor Jaringan Fiber Optik BP Batam (Item #2)
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    Total: {totalKm.toFixed(1)} KM Jalur Tergelar
                  </span>
                </div>

                <div className="space-y-2.5">
                  {FIBER_OPTIC_ROUTES.map((route) => {
                    const isBackbone = route.klasifikasi === 'Backbone Utama';

                    return (
                      <div
                        key={route.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-blue-50/30 hover:border-blue-300 transition-all shadow-2xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-[11px] text-[#1F4E79] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                {route.ruas}
                              </span>
                              <h4 className="text-xs font-bold text-slate-900">
                                {route.jalur}
                              </h4>
                            </div>
                            <div className="text-[10.5px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{route.jln}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isBackbone
                                  ? 'bg-blue-50 text-[#1F4E79] border border-blue-200'
                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                              }`}
                            >
                              {route.klasifikasi}
                            </span>
                            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {route.panjang} KM
                            </span>
                            <span className="font-bold text-[#1F4E79] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {route.jmlhcore} Core
                            </span>
                          </div>
                        </div>

                        {/* Interactive Visual Bar: Distance */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10.5px]">
                            <span className="text-slate-600 font-mono">
                              Kabel: <strong className="text-slate-800">{route.brandfo}</strong>
                            </span>
                            <span className="text-emerald-700 font-semibold font-mono text-[10px]">
                              {route.remark}
                            </span>
                          </div>

                          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                            <div
                              className="bg-[#1F4E79] h-full rounded-full transition-all"
                              style={{ width: `${(route.panjang / 45) * 100}%` }}
                              title={`Panjang Ruas: ${route.panjang} KM`}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 font-mono border-t border-slate-200/80 pt-1.5">
                          <span>Titik Awal: <strong>{route.startpoint}</strong></span>
                          <span>Titik Akhir: <strong>{route.endpoint}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* ================= MODEL TABEL FO ================= */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[760px]">
                <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[12%]">
                      Ruas
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[24%]">
                      Jalur &amp; Nama Koridor
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[20%]">
                      Alamat Jalan
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[10%]">
                      Panjang
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[10%]">
                      Jmlh Core
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[14%]">
                      Brand &amp; Tipe FO
                    </th>
                    <th className="py-2.5 px-3 text-center w-[10%]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
                  {FIBER_OPTIC_ROUTES.map((route, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                      <tr
                        key={route.id}
                        className={`hover:bg-blue-50/60 transition-colors ${
                          isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                        }`}
                      >
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-[#1F4E79] align-middle">
                          {route.ruas}
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] align-middle">
                          <div className="font-semibold text-slate-900">{route.jalur}</div>
                          <div className="text-[10px] text-slate-500">{route.namobj}</div>
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-700 align-middle">
                          {route.jln}
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-slate-900 align-middle">
                          {route.panjang} KM
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-[#1F4E79] align-middle">
                          {route.jmlhcore} Core
                        </td>
                        <td className="py-2.5 px-3 border-r border-[#E2E8F0] text-slate-600 align-middle font-mono text-[10px]">
                          {route.brandfo}
                        </td>
                        <td className="py-2.5 px-3 text-center align-middle">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                            Normal
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-[#E2E8F0] font-bold text-xs border-t-2 border-slate-300">
                  <tr>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-300 text-slate-900 uppercase">
                      TOTAL KONSOLIDASI KAPASITAS JARINGAN FO (ITEM #2 &amp; #5)
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono font-bold text-[#1F4E79] text-sm">
                      {totalKm.toFixed(1)} KM
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono font-bold text-[#1F4E79] text-sm">
                      {totalCore} Core
                    </td>
                    <td colSpan={2} className="py-2.5 px-3 text-slate-700 font-mono text-[11px]">
                      Jalur Mandiri BP Batam (8 Koridor)
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )
        ) : (
          /* ================= MODEL TABEL INFORMASI INDEKS SPBE ================= */
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#1F4E79]" />
                <span className="font-bold text-[#0B2545] uppercase tracking-wide">
                  Tabel Informasi Evaluasi Indeks SPBE (Formula Perkin &amp; KemenPAN-RB)
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Tahun Evaluasi: 2026 &bull; Skala Penilaian: 0,00 - 5,00
              </span>
            </div>

            <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl shadow-2xs">
              <table className="w-full text-left text-xs border-collapse min-w-[860px]">
                <thead className="bg-[#0B2545] text-white font-bold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[20%]">
                      Domain &amp; Aspek SPBE
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[11%]">
                      Level / Nilai (0-5)
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[8%]">
                      Bobot
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[8%]">
                      Tahun
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 w-[27%]">
                      Evidence / Dokumen Pendukung
                    </th>
                    <th className="py-2.5 px-3 border-r border-blue-900/60 text-center w-[16%]">
                      Status Pemenuhan Kriteria (1-5)
                    </th>
                    <th className="py-2.5 px-3 text-center w-[10%]">
                      Predikat
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[11px]">
                  {SPBE_INDEX_INFO_DATA.map((item, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-blue-50/60 transition-colors ${
                          isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                        }`}
                      >
                        <td className="py-3 px-3 border-r border-[#E2E8F0] align-middle">
                          <div className="font-bold text-slate-900">{item.domain}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{item.aspek}</div>
                        </td>
                        <td className="py-3 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-slate-900 text-sm align-middle">
                          <span className="bg-blue-50 text-[#1F4E79] px-2 py-1 rounded border border-blue-200">
                            {item.levelNilai.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3 px-3 border-r border-[#E2E8F0] text-center font-mono font-medium text-slate-700 align-middle">
                          {item.bobot}
                        </td>
                        <td className="py-3 px-3 border-r border-[#E2E8F0] text-center font-mono font-bold text-slate-800 align-middle">
                          {item.tahun}
                        </td>
                        <td className="py-3 px-3 border-r border-[#E2E8F0] text-slate-700 align-middle leading-relaxed text-[10.5px]">
                          {item.evidence}
                        </td>
                        <td className="py-3 px-3 border-r border-[#E2E8F0] text-center align-middle">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Level {item.levelKriteria} / 5</span>
                          </span>
                          <div className="text-[9.5px] text-slate-500 mt-1">{item.statusPemenuhan}</div>
                        </td>
                        <td className="py-3 px-3 text-center align-middle">
                          <span className="inline-block px-2.5 py-1 rounded text-[10px] font-bold bg-[#1F4E79] text-white">
                            {item.predikat}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-[#E2E8F0] font-bold text-xs border-t-2 border-slate-300">
                  <tr>
                    <td className="py-3 px-3 border-r border-slate-300 text-slate-900 uppercase font-mono">
                      INDEKS KOMPOSIT SPBE BP BATAM (FORMULA PERKIN)
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300 text-center font-mono font-black text-[#1F4E79] text-base">
                      3.72
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300 text-center font-mono text-slate-800">
                      100%
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300 text-center font-mono text-slate-800">
                      2026
                    </td>
                    <td colSpan={2} className="py-3 px-3 border-r border-slate-300 text-emerald-800 text-[11px] font-semibold">
                      Target Perkin 3.50 Terlampaui (+0.22) &bull; Predikat Sangat Baik
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-block px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-700 text-white">
                        Sangat Baik
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Tableau Caption Footer */}
      <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5 text-[#1F4E79]" />
          <span>
            {activeTab === 'fo'
              ? 'Infrastruktur: Jaringan Kabel Bawah Tanah & Tiang Udara BP Batam (Live GIS Layer)'
              : 'Tata Kelola: Pemantauan Evaluasi Mandiri SPBE Berdasarkan PermenPAN-RB No. 59/2020'}
          </span>
        </div>
        <span className="font-mono">Extract: Tim Koordinasi SPBE BP Batam</span>
      </div>
    </div>
  );
};
