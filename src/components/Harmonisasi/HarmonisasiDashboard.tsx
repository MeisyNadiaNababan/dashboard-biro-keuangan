import React, { useState } from 'react';
import {
  Compass,
  FileCheck,
  Scale,
  Award,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Clock,
  Briefcase,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import {
  PHKS_IKK_POLICIES,
  PHKS_TARIF_LAYANAN,
  PHKS_SINKRONISASI_REGULASI,
  PHKS_SURVEI_KEWAJARAN,
  PHKS_RAPIM_LIST,
  PhksTarifLayananDetail,
} from '../../data/harmonisasiData';

interface HarmonisasiDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
}

export const HarmonisasiDashboard: React.FC<HarmonisasiDashboardProps> = ({
  activeSubTab = 'ikk',
  onOpenFormulaModal,
  onOpenExportModal,
}) => {
  const [currentTab, setCurrentTab] = useState<'ikk' | 'tarif' | 'regulasi' | 'rapim' | 'survei'>(
    (activeSubTab as any) || 'ikk'
  );
  const [selectedTarifUnit, setSelectedTarifUnit] = useState<string>('ALL');
  const [tarifSearch, setTarifSearch] = useState('');

  const filteredTarif = PHKS_TARIF_LAYANAN.filter((t) => {
    const matchesUnit = selectedTarifUnit === 'ALL' || t.unit.toLowerCase().includes(selectedTarifUnit.toLowerCase());
    const matchesSearch =
      tarifSearch === '' ||
      t.layanan.toLowerCase().includes(tarifSearch.toLowerCase()) ||
      t.level3.toLowerCase().includes(tarifSearch.toLowerCase());
    return matchesUnit && matchesSearch;
  });

  return (
    <div className="space-y-4 font-sans select-none pb-12">
      {/* Top Header Banner */}
      <div className="bg-[#002B49] text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-700/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded font-mono text-[10.5px] font-black uppercase bg-sky-500/20 text-sky-300 border border-sky-400/40">
              UNIT KERJA PHKS · HALAMAN 12 - 13 PDF (7 DATASET)
            </span>
            <span className="text-xs text-slate-300">
              Perkin A2 (DEP A2): Kebijakan Strategis &amp; Perizinan
            </span>
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight">
            Pusat Harmonisasi Kebijakan Strategis (PHKS BP Batam)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Pengendalian Mutu Kebijakan Melalui Indeks Kualitas Kebijakan (IKK 4 Dimensi), Pengujian Kewajaran 7 Level Tarif Layanan Badan Usaha, Sinkronisasi Regulasi Vertikal/Horizontal, dan Risalah Rapim Pimpinan.
          </p>
          <div className="text-[11px] text-slate-300 flex flex-wrap items-center gap-2 pt-1 font-medium">
            <span>Pimpinan: <strong className="text-white">Kepala Pusat Harmonisasi Kebijakan Strategis</strong></span>
            <span>·</span>
            <span>Pagu DIPA: <strong className="text-sky-300 font-mono">Rp 4.550.000.000,-</strong></span>
            <span>·</span>
            <span>IKP Terhubung: <strong className="text-amber-300">IKP-2 Indeks Kualitas Kebijakan (71.80)</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenFormulaModal && (
            <button
              onClick={() => onOpenFormulaModal('ikp-2-kebijakan')}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Manual IKP-2 (71.80)</span>
            </button>
          )}
          {onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              className="px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Ekspor 7 Dataset</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Summary Cards for PHKS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Indeks Kualitas Kebijakan</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-sky-700">71.80 / 100</div>
          <span className="text-[10.5px] font-semibold text-emerald-600 block">Cukup Baik (LAN RI Standard)</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Regulasi Disinkronisasi</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">42 Produk Hukum</div>
          <span className="text-[10.5px] font-semibold text-teal-600 block">Perka, Kepka, &amp; PP 41/2021</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Kewajaran 7 Level Tarif</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700">89.5% Tingkat Valid</div>
          <span className="text-[10.5px] font-semibold text-slate-500 block">Cost-Recovery 100% Layanan</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Tindak Lanjut Rapim</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">76 Nota Dinas</div>
          <span className="text-[10.5px] font-semibold text-emerald-600 block">94.5% Rekomendasi Tuntas</span>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setCurrentTab('ikk')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'ikk' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>4 Dimensi IKK &amp; Evaluasi Kebijakan (DS 1)</span>
        </button>
        <button
          onClick={() => setCurrentTab('tarif')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'tarif' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Daftar 7 Level Tarif Layanan (DS 3)</span>
        </button>
        <button
          onClick={() => setCurrentTab('regulasi')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'regulasi' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Sinkronisasi Regulasi Internal/Eksternal (DS 2, 4)</span>
        </button>
        <button
          onClick={() => setCurrentTab('rapim')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'rapim' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Risalah RDP &amp; Tindak Lanjut Rapim (DS 6, 7)</span>
        </button>
        <button
          onClick={() => setCurrentTab('survei')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'survei' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Survei Kewajaran &amp; Evaluasi Tarif (DS 5)</span>
        </button>
      </div>

      {/* Tab 1: IKK 4 Dimensi Policy Evaluation */}
      {currentTab === 'ikk' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
              Evaluasi 5 Sampel Kebijakan Utama BP Batam (Dataset #1 - IKK 71.80)
            </h3>
            <span className="text-[10px] font-mono text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Standar LAN RI
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Nomor Perka / Kepka</th>
                  <th className="py-2.5 px-3">Nama Kebijakan Strategis</th>
                  <th className="py-2.5 px-2">Penetapan</th>
                  <th className="py-2.5 px-2">MAK</th>
                  <th className="py-2.5 px-3">Analis Instansi</th>
                  <th className="py-2.5 px-2 text-right">Skor IKK</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {PHKS_IKK_POLICIES.map((p) => (
                  <tr key={p.nomor} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-sky-800">{p.nomor}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block">{p.namaKebijakan}</span>
                      <span className="text-[10px] text-slate-500">Dimensi Unggul: {p.dimensiUnggul}</span>
                    </td>
                    <td className="py-2.5 px-2 font-mono text-slate-500">{p.tahunPenetapan}</td>
                    <td className="py-2.5 px-2 font-mono text-slate-600">{p.mak}</td>
                    <td className="py-2.5 px-3 text-slate-700">{p.analisInstansi}</td>
                    <td className="py-2.5 px-2 text-right font-mono font-black text-sky-700">{p.skorIkk}</td>
                    <td className="py-2.5 px-2 text-center">
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded border ${
                          p.status === 'Efektif'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: 7 Level Tarif Layanan */}
      {currentTab === 'tarif' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
                Daftar Tarif Layanan 7 Level Hierarki BP Batam (Dataset #3)
              </h3>
              <p className="text-[11px] text-slate-500">
                Meliputi Kepelabuhanan, RSBP, SPAM &amp; KPLI, Lahan Industri, dan Kebandaraan.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedTarifUnit}
                onChange={(e) => setSelectedTarifUnit(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800"
              >
                <option value="ALL">Semua Unit Layanan</option>
                <option value="Pelabuhan">Badan Usaha Pelabuhan</option>
                <option value="Rumah Sakit">Rumah Sakit (RSBP)</option>
                <option value="SPAM">BU SPAM &amp; Lingkungan (KPLI)</option>
                <option value="Lahan">Direktorat Lahan</option>
                <option value="Bandara">Badan Usaha Bandara</option>
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari layanan tarif..."
                  value={tarifSearch}
                  onChange={(e) => setTarifSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Unit Pelaksana</th>
                  <th className="py-2.5 px-3">Nama Layanan &amp; Hierarki Level 1-7</th>
                  <th className="py-2.5 px-2">Satuan</th>
                  <th className="py-2.5 px-3 text-right">Unit Cost Riil</th>
                  <th className="py-2.5 px-3 text-right">Tarif Berlaku</th>
                  <th className="py-2.5 px-3 text-right">Plafon Maksimal</th>
                  <th className="py-2.5 px-3">Dasar Regulasi</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredTarif.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block">{t.unit}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Tahun: {t.tahun}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block">{t.layanan}</span>
                      <span className="text-[10px] text-slate-500 block">
                        Level: {t.level1} → {t.level2} → {t.level3} → {t.level7}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 font-mono">{t.satuanLayanan}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                      Rp {t.unitCost.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-sky-800">
                      Rp {t.tarifBerlaku.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                      Rp {t.tarifBerlakuMaksimal.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-[10.5px] text-slate-600">{t.dasarHukum}</td>
                    <td className="py-2.5 px-2 text-center">
                      <span className="text-[9.5px] font-bold px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200">
                        {t.statusTarif}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Sinkronisasi Regulasi Internal/Eksternal */}
      {currentTab === 'regulasi' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
              Pipeline Regulasi &amp; Sinkronisasi Kebijakan (Dataset #2 &amp; #4)
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Harmonisasi Vertikal UU Ciptaker / PP 41</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Nomor Regulasi</th>
                  <th className="py-2.5 px-3">Tentang Regulasi</th>
                  <th className="py-2.5 px-2">Kategori</th>
                  <th className="py-2.5 px-2">Jenis</th>
                  <th className="py-2.5 px-3">Catatan Harmonisasi</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {PHKS_SINKRONISASI_REGULASI.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-sky-800">{r.nomor}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{r.tentang}</td>
                    <td className="py-2.5 px-2 text-slate-600">{r.kategori}</td>
                    <td className="py-2.5 px-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                        {r.jenis}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[10.5px] text-slate-600">{r.catatanHarmonisasi}</td>
                    <td className="py-2.5 px-2 text-center">
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded border ${
                          r.status === 'Harmonis'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Risalah RDP & Tindak Lanjut Rapim */}
      {currentTab === 'rapim' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
              Monitoring Tindak Lanjut Rapim Pimpinan BP Batam (Dataset #6 &amp; #7)
            </h3>
            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              94.5% Rekomendasi Tuntas
            </span>
          </div>

          <div className="space-y-3">
            {PHKS_RAPIM_LIST.map((rp) => (
              <div key={rp.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{rp.judulRapat}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {rp.tanggalRapat} ({rp.waktu}) · Lokasi: {rp.tempat}
                    </span>
                  </div>
                  <span
                    className={`text-[9.5px] font-bold px-2 py-0.5 rounded border shrink-0 ${
                      rp.statusTindakLanjut === 'Selesai 100%'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {rp.statusTindakLanjut}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-mono text-[10.5px]">
                    <span className="text-slate-400 font-bold">Nota Dinas:</span>
                    <strong className="text-slate-800">{rp.notaDinasPengantar}</strong>
                    <span>·</span>
                    <span className="text-slate-400 font-bold">Pelaksana:</span>
                    <strong className="text-sky-700">{rp.unitPelaksana}</strong>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    <strong className="font-semibold">Matriks Tindak Lanjut:</strong> {rp.matrikTindakLanjut}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Survei Kewajaran Tarif */}
      {currentTab === 'survei' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
              Hasil Survei Kewajaran Tarif Layanan Badan Usaha (Dataset #5)
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Skor Validitas: 89.5%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PHKS_SURVEI_KEWAJARAN.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{s.lokasi}</h4>
                    <span className="text-[10px] text-slate-500">Kriteria: {s.kriteria}</span>
                  </div>
                  <span className="font-mono text-sm font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    {s.persentaseWajar}% Wajar
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div>Metodologi: <span className="font-medium text-slate-800">{s.instrumentPenelitian}</span></div>
                  <div>Sampel Responden: <span className="font-mono font-bold text-slate-900">{s.jumlahResponden} Orang/Badan Usaha</span></div>
                  <p className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <strong>Rekomendasi:</strong> {s.rekomendasi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
