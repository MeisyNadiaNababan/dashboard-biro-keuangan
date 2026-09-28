import React, { useState } from 'react';
import {
  Target,
  Layers,
  Award,
  TrendingUp,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  ExternalLink,
  Briefcase,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import {
  PUSREN_MASTERPLANS,
  PUSREN_MONEV_PROGRAMS,
  PUSREN_RENSTRA_TARGETS,
  PUSREN_ROAD_DATA,
  PUSREN_STUDY_DOCS,
  PusrenMasterplanItem,
} from '../../data/pusrenData';

interface PusrenDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
}

export const PusrenDashboard: React.FC<PusrenDashboardProps> = ({
  activeSubTab = 'masterplan',
  onOpenFormulaModal,
  onOpenExportModal,
}) => {
  const [currentTab, setCurrentTab] = useState<'masterplan' | 'renstra' | 'monev' | 'jalan' | 'kajian'>(
    (activeSubTab as any) || 'masterplan'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMasterplan, setSelectedMasterplan] = useState<PusrenMasterplanItem>(PUSREN_MASTERPLANS[0]);

  const filteredMasterplans = PUSREN_MASTERPLANS.filter(
    (mp) =>
      mp.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mp.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 font-sans select-none pb-12">
      {/* 4 KPI Summary Cards for Pusren */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          onClick={() => onOpenFormulaModal && onOpenFormulaModal('ikp-1-perencanaan')}
          className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1 hover:border-teal-400 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Indeks Perencanaan (IPPN)</span>
            <span className="text-[9px] font-mono text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 font-bold">Manual IKP-1</span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-teal-700">94.20 / 100</div>
          <span className="text-[10.5px] font-semibold text-emerald-600 block">Sangat Baik (Bappenas SE 3/2023)</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">5 Dokumen Masterplan</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">91.9% Avg</div>
          <span className="text-[10.5px] font-semibold text-sky-600 block">Drainase, Box, Jalan, BND, PLB</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Ketercapaian RO Renstra</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700">28 / 29 RO</div>
          <span className="text-[10.5px] font-semibold text-slate-500 block">96.5% Target KRO Selesai</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Alokasi Pagu DIPA 2026</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">Rp 13,66 M</div>
          <span className="text-[10.5px] font-semibold text-emerald-600 block">Serapan Q1: 42.8% (Rp 5,84 M)</span>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setCurrentTab('masterplan')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'masterplan' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>5 Masterplan Strategis (DS 6, 7, 10, 11, 12)</span>
        </button>
        <button
          onClick={() => setCurrentTab('renstra')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'renstra' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Renstra 2025-2029 &amp; KRO Bappenas (DS 3, 4, 15, 17)</span>
        </button>
        <button
          onClick={() => setCurrentTab('monev')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'monev' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Monev Paket &amp; DIPA RKA (DS 2, 5)</span>
        </button>
        <button
          onClick={() => setCurrentTab('jalan')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'jalan' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Masterplan Jalan &amp; Kontur Spasial (DS 12, 13, 19)</span>
        </button>
        <button
          onClick={() => setCurrentTab('kajian')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'kajian' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Dokumen Kajian Kelayakan &amp; FS (DS 1, 14, 18)</span>
        </button>
      </div>

      {/* Tab 1: 5 Masterplan Explorer */}
      {currentTab === 'masterplan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Masterplans List */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-tight text-slate-900">
                Daftar 5 Dokumen Masterplan Resmi BP Batam
              </h3>
              <span className="text-[10.5px] font-mono text-slate-500">Pagu Total: Rp 15,55 M</span>
            </div>

            <div className="space-y-2.5">
              {filteredMasterplans.map((mp) => (
                <div
                  key={mp.id}
                  onClick={() => setSelectedMasterplan(mp)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    selectedMasterplan.id === mp.id
                      ? 'bg-teal-50/70 border-teal-300 ring-1 ring-teal-400'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">{mp.nama}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Kode: {mp.kode} · {mp.tahunAnggaran}</span>
                    </div>
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded border shrink-0 ${
                        mp.status === 'Selesai Ditetapkan'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-teal-50 text-teal-700 border-teal-200'
                      }`}
                    >
                      {mp.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-500">Tingkat Kemajuan Penyusunan</span>
                      <span className="font-bold text-teal-800">{mp.progresPersen}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-teal-600" style={{ width: `${mp.progresPersen}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Masterplan Detail Drawer / Inspector */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 sticky top-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-black uppercase bg-teal-100 text-teal-900">
                  {selectedMasterplan.kode}
                </span>
                <span className="font-mono text-xs font-black text-slate-900">
                  Alokasi: Rp {(selectedMasterplan.anggaran / 1e9).toFixed(2)} Miliar
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900 leading-snug">
                  {selectedMasterplan.nama}
                </h4>
                <p className="text-xs text-teal-700 font-semibold mt-0.5">
                  Kategori: {selectedMasterplan.kategori}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Rujukan Dokumen:</span>
                  <span className="font-semibold text-slate-800">{selectedMasterplan.babRujukan}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Detail Lingkup Pekerjaan:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedMasterplan.detail}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Rincian &amp; Capaian Output:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedMasterplan.rincian}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Unit Kerja Terkait:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMasterplan.unitTerkait.map((u, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 text-[10.5px] font-medium">
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Renstra 2025-2029 Target vs Realisasi */}
      {currentTab === 'renstra' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
                Penyelarasan Renstra 2025-2029 terhadap KRO &amp; RO Bappenas
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Evaluasi SE MenPPN No. 3/2023
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Tahun</th>
                  <th className="py-2.5 px-3">Program &amp; Sasaran Strategis</th>
                  <th className="py-2.5 px-3">Indikator Kinerja</th>
                  <th className="py-2.5 px-2 text-right">Target</th>
                  <th className="py-2.5 px-2 text-right">Realisasi</th>
                  <th className="py-2.5 px-3">KRO / RO Terhubung</th>
                  <th className="py-2.5 px-3">Unit Pelaksana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {PUSREN_RENSTRA_TARGETS.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{t.tahun}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block">{t.program}</span>
                      <span className="text-[10.5px] text-slate-500">{t.sasaranProgram}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-teal-800">{t.indikatorKinerja}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">Satuan: {t.satuan}</span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-800">{t.target}</td>
                    <td className="py-2.5 px-2 text-right font-mono font-black text-emerald-700">{t.realisasi}</td>
                    <td className="py-2.5 px-3 text-[10.5px] text-slate-600 font-mono">{t.kroRo}</td>
                    <td className="py-2.5 px-3 text-slate-800 font-semibold">{t.unitPelaksana}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Monev Paket & DIPA RKA */}
      {currentTab === 'monev' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
              Monitoring &amp; Evaluasi Paket Program DIPA RKA (Dataset #2 &amp; #5)
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Realisasi Berjalan Triwulan I 2026</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Kode MA</th>
                  <th className="py-2.5 px-3">Kegiatan / Output / Sub Komponen</th>
                  <th className="py-2.5 px-3 text-right">Pagu DIPA</th>
                  <th className="py-2.5 px-3 text-right">Realisasi</th>
                  <th className="py-2.5 px-2 text-right">Progres</th>
                  <th className="py-2.5 px-3 text-right">Sisa Pagu</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {PUSREN_MONEV_PROGRAMS.map((m) => (
                  <tr key={m.kodeMa} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-teal-800">{m.kodeMa}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{m.kegiatanOutput}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      Rp {(m.paguDipa / 1e9).toFixed(2)} M
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-bold">
                      Rp {(m.realisasi / 1e9).toFixed(2)} M
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-black text-teal-700">
                      {m.progresPaket}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                      Rp {(m.sisaPagu / 1e9).toFixed(2)} M
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded border ${
                          m.status === 'On-Track'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : m.status === 'Selesai'
                            ? 'bg-teal-50 text-teal-700 border-teal-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Masterplan Jalan & Spasial */}
      {currentTab === 'jalan' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
              Masterplan Jaringan Jalan Strategis Kota Batam (Dataset #12, #13, #19)
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Data Spasial Delineasi KPBPB</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PUSREN_ROAD_DATA.map((r, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <span className="px-2 py-0.5 rounded font-mono text-[9.5px] font-black uppercase bg-teal-100 text-teal-800">
                  {r.klasifikasiJalan}
                </span>
                <h4 className="font-black text-xs text-slate-900">{r.wilayah}</h4>
                <p className="text-[11px] text-slate-500">{r.subWilayah}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-xs font-mono">
                  <span>Panjang: <strong>{r.panjangKm} Km</strong></span>
                  <span>Lebar: <strong>{r.lebarMeter} m</strong></span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 block">
                  Status: {r.statusKonstruksi}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Kajian Kelayakan & FS */}
      {currentTab === 'kajian' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
              Dokumen Perencanaan Strategis &amp; Feasibility Study (Dataset #1, #14, #18)
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Kajian Prioritas Investasi</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Nama Kegiatan Kajian</th>
                  <th className="py-2.5 px-3">Lokasi / Wilayah</th>
                  <th className="py-2.5 px-2">Tahun</th>
                  <th className="py-2.5 px-3">Sumber Dana</th>
                  <th className="py-2.5 px-2 text-right">Progres</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {PUSREN_STUDY_DOCS.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{doc.namaKegiatan}</td>
                    <td className="py-2.5 px-3 text-slate-600">{doc.lokasi}</td>
                    <td className="py-2.5 px-2 font-mono text-slate-500">{doc.tahun}</td>
                    <td className="py-2.5 px-3 text-slate-700">{doc.sumberDana}</td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-teal-800">{doc.progres}%</td>
                    <td className="py-2.5 px-2 text-center">
                      <span className="text-[9.5px] font-bold px-2 py-0.5 rounded border bg-teal-50 text-teal-700 border-teal-200">
                        {doc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
