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
  PieChart as PieIcon,
  BarChart3,
  FileSpreadsheet,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
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

  // Masterplan visual data
  const masterplanChartData = PUSREN_MASTERPLANS.map((mp) => ({
    name: mp.kode.replace('MP-', ''),
    fullName: mp.nama,
    progres: mp.progresPersen,
    anggaranM: Number((mp.anggaran / 1e9).toFixed(2)),
  }));

  // Renstra visual data
  const renstraChartData = PUSREN_RENSTRA_TARGETS.map((r) => ({
    program: r.indikatorKinerja.length > 20 ? r.indikatorKinerja.slice(0, 18) + '...' : r.indikatorKinerja,
    target: r.target,
    realisasi: r.realisasi,
    fullName: r.indikatorKinerja,
  }));

  // Monev DIPA visual data
  const monevChartData = PUSREN_MONEV_PROGRAMS.map((m) => ({
    kode: m.kodeMa,
    nama: m.kegiatanOutput.length > 22 ? m.kegiatanOutput.slice(0, 20) + '...' : m.kegiatanOutput,
    paguM: Number((m.paguDipa / 1e9).toFixed(2)),
    realisasiM: Number((m.realisasi / 1e9).toFixed(2)),
    progres: m.progresPaket,
  }));

  // Road Chart data
  const roadChartData = PUSREN_ROAD_DATA.map((r) => ({
    wilayah: r.wilayah.length > 15 ? r.wilayah.slice(0, 13) + '...' : r.wilayah,
    panjangKm: r.panjangKm,
    status: r.statusKonstruksi,
  }));

  // Study docs chart data
  const studyChartData = PUSREN_STUDY_DOCS.map((d) => ({
    nama: d.namaKegiatan.length > 22 ? d.namaKegiatan.slice(0, 20) + '...' : d.namaKegiatan,
    progres: d.progres,
    status: d.status,
  }));

  return (
    <div className="space-y-4 font-sans select-none pb-12">
      {/* 4 KPI Summary Cards for Pusren with Official Satu Data Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          onClick={() => onOpenFormulaModal && onOpenFormulaModal('ikp-1-perencanaan')}
          className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1 hover:border-amber-400 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Indeks Perencanaan (IPP)</span>
            <span className="text-[9px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-bold">
              Data P3S No. 3 &amp; 17
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-amber-700">96.10 / 100</div>
          <span className="text-[10.5px] font-semibold text-emerald-600 block">Capaian Target Renstra (Sangat Baik)</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">5 Dokumen Masterplan</span>
            <span className="text-[9px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-bold">
              Data P3S No. 6
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">91.9% Avg</div>
          <span className="text-[10.5px] font-semibold text-sky-600 block">Drainase, Box, Jalan, BND, PLB</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Ketercapaian RO Renstra</span>
            <span className="text-[9px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-bold">
              Data P3S No. 3
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700">28 / 29 RO</div>
          <span className="text-[10.5px] font-semibold text-slate-500 block">96.5% Target KRO Selesai</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Alokasi Pagu DIPA 2026</span>
            <span className="text-[9px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-bold">
              Data P3S No. 2
            </span>
          </div>
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
          <span>5 Masterplan Strategis (DS 6)</span>
        </button>
        <button
          onClick={() => setCurrentTab('renstra')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'renstra' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Renstra 2025-2029 &amp; Bappenas (DS 3)</span>
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
          <span>Masterplan Jalan &amp; Spasial (DS 12)</span>
        </button>
        <button
          onClick={() => setCurrentTab('kajian')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'kajian' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Dokumen Kajian &amp; FS (DS 1)</span>
        </button>
      </div>

      {/* Tab 1: 5 Masterplan Explorer + Compact Visual Chart */}
      {currentTab === 'masterplan' && (
        <div className="space-y-4">
          {/* Visual Compact Chart Card: Masterplan Progress & Pagu */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs sm:text-sm font-black uppercase text-slate-900">
                  Visualisasi Progres &amp; Alokasi 5 Dokumen Masterplan
                </h3>
              </div>
              <span className="text-[9.5px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Data P3S No. 6 (Satu Data)
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-3">
              {/* Compact Bar Chart (Height 170px for neat presentation) */}
              <div className="lg:col-span-8 h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={masterplanChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
                    <Tooltip
                      formatter={(val: any, name: any) => [
                        name === 'progres' ? `${val}% Selesai` : `Rp ${val} Miliar`,
                        name === 'progres' ? 'Kemajuan Fisik' : 'Pagu Anggaran',
                      ]}
                      labelFormatter={(label) => {
                        const it = masterplanChartData.find((x) => x.name === label);
                        return it ? it.fullName : label;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                    <Bar dataKey="progres" fill="#D97706" name="Kemajuan Progres (%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="anggaranM" fill="#0D9488" name="Anggaran (Rp M)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Summary Metrics */}
              <div className="lg:col-span-4 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                  Ringkasan Masterplan Kawasan:
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Rerata Progres:</span>
                  <span className="font-mono font-black text-amber-700">91.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total Komitmen Pagu:</span>
                  <span className="font-mono font-black text-slate-900">Rp 15,55 Miliar</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Status Legal:</span>
                  <span className="font-bold text-emerald-700">3 Selesai, 2 Harmonisasi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Masterplans List & Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase text-slate-900">Pilih Dokumen Masterplan</h4>
                <span className="text-[10px] text-slate-500 font-mono">Klik kartu untuk inspeksi detail</span>
              </div>

              {filteredMasterplans.map((mp) => (
                <div
                  key={mp.id}
                  onClick={() => setSelectedMasterplan(mp)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    selectedMasterplan.id === mp.id
                      ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-400'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">{mp.nama}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{mp.kode} · {mp.tahunAnggaran}</span>
                    </div>
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
                      {mp.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10.5px] font-mono">
                      <span className="text-slate-500">Tingkat Kemajuan</span>
                      <span className="font-bold text-amber-800">{mp.progresPersen}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-amber-600" style={{ width: `${mp.progresPersen}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Inspector */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 sticky top-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-black uppercase bg-amber-100 text-amber-900">
                    {selectedMasterplan.kode}
                  </span>
                  <span className="font-mono text-xs font-black text-slate-900">
                    Alokasi: Rp {(selectedMasterplan.anggaran / 1e9).toFixed(2)} Miliar
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-snug">{selectedMasterplan.nama}</h4>
                  <p className="text-xs text-amber-700 font-semibold mt-0.5">Kategori: {selectedMasterplan.kategori}</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Rujukan Dokumen:</span>
                    <span className="font-semibold text-slate-800">{selectedMasterplan.babRujukan}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Detail Lingkup Pekerjaan:</span>
                    <p className="text-slate-700 leading-relaxed text-[11px]">{selectedMasterplan.detail}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Unit Kerja Terkait:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedMasterplan.unitTerkait.map((u, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 text-[10px] font-medium">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Renstra 2025-2029 Target vs Realisasi + Compact Chart */}
      {currentTab === 'renstra' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
                Penyelarasan Renstra 2025-2029 terhadap KRO &amp; RO Bappenas
              </h3>
            </div>
            <span className="text-[9.5px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Data P3S No. 3 (Satu Data)
            </span>
          </div>

          {/* Compact Visual Chart for Renstra Target vs Realisasi */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <div className="lg:col-span-8 h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={renstraChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="program" tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      `${val}`,
                      name === 'target' ? 'Target Renstra' : 'Realisasi Capaian',
                    ]}
                    labelFormatter={(label) => {
                      const it = renstraChartData.find((x) => x.program === label);
                      return it ? it.fullName : label;
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                  <Bar dataKey="target" fill="#94A3B8" name="Target Renstra" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="realisasi" fill="#10B981" name="Realisasi Bappenas" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="lg:col-span-4 space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Kepatuhan Target Bappenas:</span>
                <span className="text-base font-black font-mono">100% On-Track</span>
                <p className="text-[10px] text-emerald-800 mt-0.5">Seluruh KRO telah terpetakan pada DIPA 2025.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Rincian Rincian Output:</span>
                <span className="font-bold text-slate-800">28 Selesai / 29 Total RO (96.5%)</span>
              </div>
            </div>
          </div>

          {/* Table */}
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
                      <span className="font-bold text-amber-800">{t.indikatorKinerja}</span>
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

      {/* Tab 3: Monev Paket & DIPA RKA + Compact Chart */}
      {currentTab === 'monev' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
                Monitoring &amp; Evaluasi Paket Program DIPA RKA (Pagu Rp 13,66 Miliar)
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">Realisasi Berjalan Triwulan I 2026</span>
            </div>
            <span className="text-[9.5px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Data P3S No. 2 &amp; 5 (Satu Data)
            </span>
          </div>

          {/* Compact Chart for Pagu vs Realisasi Belanja */}
          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monevChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="kode" tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      `Rp ${val} Miliar`,
                      name === 'paguM' ? 'Pagu DIPA' : 'Realisasi Belanja',
                    ]}
                    labelFormatter={(label) => {
                      const it = monevChartData.find((x) => x.kode === label);
                      return it ? `${label}: ${it.nama}` : label;
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                  <Bar dataKey="paguM" fill="#94A3B8" name="Pagu DIPA (Rp M)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="realisasiM" fill="#0284C7" name="Realisasi Belanja (Rp M)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
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
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-800">{m.kodeMa}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{m.kegiatanOutput}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      Rp {(m.paguDipa / 1e9).toFixed(2)} M
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-bold">
                      Rp {(m.realisasi / 1e9).toFixed(2)} M
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-black text-amber-700">
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

      {/* Tab 4: Masterplan Jalan & Spasial + Compact Chart */}
      {currentTab === 'jalan' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
              Masterplan Jaringan Jalan Strategis Kota Batam
            </h3>
            <span className="text-[9.5px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Data P3S No. 12 &amp; 13 (Satu Data)
            </span>
          </div>

          {/* Compact Chart: Panjang Koridor Jalan */}
          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roadChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="wilayah" tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                  <Tooltip formatter={(val: any) => [`${val} Km`, 'Panjang Koridor']} />
                  <Bar dataKey="panjangKm" fill="#0D9488" name="Panjang Koridor (Km)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
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

      {/* Tab 5: Kajian Kelayakan & FS + Compact Chart */}
      {currentTab === 'kajian' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
              Dokumen Perencanaan Strategis &amp; Feasibility Study (FS)
            </h3>
            <span className="text-[9.5px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Data P3S No. 1 &amp; 14 (Satu Data)
            </span>
          </div>

          {/* Compact Chart: Progres Kajian */}
          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="nama" tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
                  <Tooltip formatter={(val: any) => [`${val}%`, 'Progres Kajian']} />
                  <Bar dataKey="progres" fill="#6366F1" name="Progres Penyusunan (%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
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
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-amber-800">{doc.progres}%</td>
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
