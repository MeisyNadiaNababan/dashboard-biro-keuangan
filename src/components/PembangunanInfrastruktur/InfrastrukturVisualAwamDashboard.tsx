import React, { useState } from 'react';
import {
  HardHat,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Route,
  Trees,
  Zap,
  Mountain,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Building2,
  Anchor,
  Droplets,
  Layers,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import {
  DATASET_4_PROGRES_KONSTRUKSI,
  REKAP_JENIS_PEMBANGUNAN,
  SUMMARY_RUAS_JARINGAN_JALAN,
  SUMMARY_ROW_UTILITAS,
  SUMMARY_ROW_PENGHIJAUAN,
  SUMMARY_PEMATANGAN_TANAH,
  KURVA_S_AGREGAT_TAHUN_BERJALAN,
} from './infrastrukturData';

interface InfrastrukturVisualAwamDashboardProps {
  onOpenFormula?: (kpiType: any) => void;
  onViewDetailPaket?: (paketId: string) => void;
}

export const InfrastrukturVisualAwamDashboard: React.FC<InfrastrukturVisualAwamDashboardProps> = ({
  onOpenFormula,
  onViewDetailPaket,
}) => {
  const [filterStatus, setFilterStatus] = useState<'Semua' | 'Lancar' | 'Waspada' | 'Kritis'>('Semua');
  const [selectedProyekId, setSelectedProyekId] = useState<string>('PRG-002'); // Default Flyover Sei Ladi
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sederhanakan data untuk orang awam
  const totalPaket = 58;
  const paketLancar = 51; // 87.9%
  const paketWaspada = 5; // 8.6%
  const paketKritis = 2; // 3.5%

  const avgProgresFisik = 81.6;
  const targetProgresFisik = 83.0;
  const deviasiFisik = (avgProgresFisik - targetProgresFisik).toFixed(1); // -1.4%

  const totalPaguMiliar = 2840; // Rp 2,84 Triliun
  const totalKontrakMiliar = 2697.5; // Rp 2,70 Triliun
  const totalHematMiliar = (totalPaguMiliar - totalKontrakMiliar).toFixed(1); // Rp 142.5 Miliar
  const persenHemat = (((totalPaguMiliar - totalKontrakMiliar) / totalPaguMiliar) * 100).toFixed(1);

  // Filter 6 proyek utama untuk visual kartu
  const proyekList = DATASET_4_PROGRES_KONSTRUKSI.filter((p) => {
    const matchStatus =
      filterStatus === 'Semua'
        ? true
        : filterStatus === 'Lancar'
        ? p.statusKurvaS === 'Ahead' || p.statusKurvaS === 'On Schedule' || p.statusKurvaS === 'Selesai'
        : filterStatus === 'Waspada'
        ? p.statusKurvaS === 'Waspada'
        : p.statusKurvaS === 'Kritis (SCM)';

    const matchSearch =
      searchQuery === '' ||
      p.namaPaket.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.satkerPPK.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchSearch;
  });

  const selectedProyek = DATASET_4_PROGRES_KONSTRUKSI.find((p) => p.id === selectedProyekId) || DATASET_4_PROGRES_KONSTRUKSI[0];

  return (
    <div className="space-y-4 font-sans">
      {/* ========================================================================= */}
      {/* 1. RINGKASAN LAMPU LALU LINTAS & 4 ANGKA UTAMA (INSTANT GRASP) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* KPI 1: Lampu Status Proyek */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Status 58 Proyek BP Batam
            </span>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="51 Lancar" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" title="5 Waspada" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" title="2 Butuh Percepatan" />
            </div>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                88%
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Lancar &amp; Tepat Waktu
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              51 proyek aman sesuai jadwal, 5 waspada, 2 perlu percepatan.
            </p>
          </div>

          {/* Mini Visual Bar Traffic Light */}
          <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-100 mt-1">
            <div className="h-full bg-emerald-500" style={{ width: '88%' }} title="51 Proyek Lancar (88%)" />
            <div className="h-full bg-amber-400" style={{ width: '9%' }} title="5 Proyek Waspada (9%)" />
            <div className="h-full bg-rose-500" style={{ width: '3%' }} title="2 Proyek Terlambat (3%)" />
          </div>
        </div>

        {/* KPI 2: Kemajuan Pembangunan Fisik */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Kemajuan Pekerjaan Fisik
            </span>
            <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
              Rata-rata Kota
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-sky-700 font-mono tracking-tight">
                {avgProgresFisik}%
              </span>
              <span className="text-xs text-slate-500 font-medium">
                dari target {targetProgresFisik}%
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
              <span className="text-slate-500">Selisih waktu:</span>
              <span className="font-mono font-bold text-slate-800">{deviasiFisik}%</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 rounded font-semibold">Terkendali</span>
            </p>
          </div>

          {/* Progress Bar Sederhana */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden relative">
            <div
              className="h-full bg-sky-600 rounded-full transition-all"
              style={{ width: `${avgProgresFisik}%` }}
            />
          </div>
        </div>

        {/* KPI 3: Penghematan Uang Rakyat (Tender) */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Uang Dihemat dari Tender
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Efisiensi {persenHemat}%
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono tracking-tight">
                Rp {totalHematMiliar}
              </span>
              <span className="text-xs font-bold text-slate-600">Miliar</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Total Pagu Rp 2,84 Triliun terkontrak menjadi Rp 2,70 Triliun.
            </p>
          </div>

          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>Pagu: Rp 2,84 T</span>
            <span className="text-emerald-700 font-bold">Hemat 5,0%</span>
          </div>
        </div>

        {/* KPI 4: Jalan Mulus Kota Batam */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Kondisi Jalan Raya Batam
            </span>
            <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
              Total 542,8 Km
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-indigo-700 font-mono tracking-tight">
                88,2%
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Mulus (Mantap)
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              478,8 km jalan mulus, 45,6 km rusak ringan, 18,4 km proses perbaikan.
            </p>
          </div>

          {/* Mini Visual Bar Jalan */}
          <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-100 mt-1">
            <div className="h-full bg-indigo-600" style={{ width: '88.2%' }} title="Mulus 88.2%" />
            <div className="h-full bg-amber-400" style={{ width: '8.4%' }} title="Rusak Ringan 8.4%" />
            <div className="h-full bg-rose-500" style={{ width: '3.4%' }} title="Rusak Berat 3.4%" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. VISUAL UTAMA: 6 SEKTOR PEMBANGUNAN KOTA (GRAFIK BATANG INTUITIF) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3.5 border-b border-slate-100">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
              Kemajuan 6 Bidang Pembangunan Batam (Apa Saja yang Sedang Dibangun?)
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Lihat langsung bidang mana yang sudah hampir selesai dan mana yang sedang dikebut.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[10.5px]">
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Lancar (On-Track)
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Terlambat (Kritis)
            </span>
          </div>
        </div>

        {/* 6 Sektor Horizontal Visual Bars */}
        <div className="space-y-3">
          {REKAP_JENIS_PEMBANGUNAN.map((sektor, idx) => {
            // Est. progres per sektor
            const progresEst = [84, 76, 92, 83, 65, 96][idx] || 80;
            const targetEst = [86, 78, 90, 80, 78, 95][idx] || 82;
            const isAhead = progresEst >= targetEst;
            const diff = progresEst - targetEst;

            return (
              <div
                key={sektor.singkatan}
                className="p-3 rounded-xl border border-slate-100 hover:border-sky-200 bg-slate-50/50 hover:bg-white transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: sektor.warna }}
                    >
                      {idx === 0 && <Route className="w-4 h-4" />}
                      {idx === 1 && <Droplets className="w-4 h-4" />}
                      {idx === 2 && <Building2 className="w-4 h-4" />}
                      {idx === 3 && <Mountain className="w-4 h-4" />}
                      {idx === 4 && <Anchor className="w-4 h-4" />}
                      {idx === 5 && <Zap className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-xs sm:text-[13px] text-slate-900">
                          {sektor.singkatan}
                        </strong>
                        <span className="text-[10px] font-mono text-slate-500 bg-white px-1.5 py-0.2 rounded border border-slate-200 font-semibold">
                          {sektor.jumlahProyek} Proyek
                        </span>
                      </div>
                      <span className="text-[10.5px] text-slate-500">
                        {sektor.panjangVolume} • Anggaran Rp {(sektor.totalPagu / 1000000000).toFixed(0)} Miliar
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="text-base sm:text-lg font-black font-mono text-slate-900">
                          {progresEst}%
                        </span>
                        <span className="text-[10px] text-slate-400">/ {targetEst}% target</span>
                      </div>
                      <div className="text-[9.5px]">
                        {diff >= 0 ? (
                          <span className="text-emerald-700 font-bold">▲ Lebih cepat +{diff}%</span>
                        ) : (
                          <span className="text-rose-600 font-bold">▼ Tertinggal {diff}%</span>
                        )}
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col gap-0.5 text-[9.5px]">
                      <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        {sektor.statusOnTrack + sektor.statusSelesai} Lancar
                      </span>
                      {sektor.statusKritis > 0 && (
                        <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200">
                          {sektor.statusKritis} Perlu Tindakan
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Bar Dual Layer (Target Ghost + Realisasi Fill) */}
                <div className="relative w-full bg-slate-200/80 rounded-full h-3 overflow-hidden">
                  {/* Target line indicator */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-600 z-10"
                    style={{ left: `${targetEst}%` }}
                    title={`Garis Target: ${targetEst}%`}
                  />
                  {/* Realisasi fill */}
                  <div
                    className={`h-full rounded-full transition-all ${
                      diff >= 0 ? 'bg-emerald-500' : diff >= -5 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${progresEst}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PROYEK UNGGULAN & STATUS REAL-TIME (VISUAL CARD GRID, BUKAN TABEL) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        {/* Header & Filter Sederhana */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 mb-3.5 border-b border-slate-100">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              Progres Proyek Pembangunan Fisik (Lihat Mana yang Sedang Dikerjakan)
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Klik proyek untuk melihat rincian kemajuan, kontraktor pelaksana, dan waktu penyelesaian.
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-500 font-medium mr-1">Filter:</span>
            {[
              { id: 'Semua', label: 'Semua Proyek' },
              { id: 'Lancar', label: '🟢 Lancar (Sesuai Target)' },
              { id: 'Waspada', label: '🟡 Waspada' },
              { id: 'Kritis', label: '🔴 Terlambat (Butuh Percepatan)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id as any)}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-semibold transition-all ${
                  filterStatus === f.id
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Kartu Proyek Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {proyekList.map((proyek) => {
            const isSelected = selectedProyekId === proyek.id;
            const isAhead = proyek.deviasiFisikPersen >= 0;
            const isCritical = proyek.deviasiFisikPersen < -10;
            const isWarning = proyek.deviasiFisikPersen < 0 && proyek.deviasiFisikPersen >= -10;

            let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            let badgeText = '🟢 Lancar (Lebih Cepat)';
            let barColor = 'bg-emerald-500';

            if (isCritical) {
              badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
              badgeText = '🔴 Terlambat (Rapat SCM)';
              barColor = 'bg-rose-500';
            } else if (isWarning) {
              badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
              badgeText = '🟡 Waspada (Sedikit Lambat)';
              barColor = 'bg-amber-500';
            }

            return (
              <div
                key={proyek.id}
                onClick={() => setSelectedProyekId(proyek.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-2xs'
                }`}
              >
                <div>
                  {/* Top: Status Badge + Sisa Waktu */}
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badgeColor}`}>
                      {badgeText}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      Sisa {proyek.sisaHari} Hari
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mb-1">
                    {proyek.namaPaket}
                  </h4>
                  <div className="text-[10.5px] text-slate-500 mb-3 line-clamp-1">
                    Pelaksana: <strong className="text-slate-700">{proyek.kontraktor}</strong>
                  </div>

                  {/* Big Number Progress */}
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div>
                      <span className="text-2xl font-black font-mono text-slate-900 tracking-tight">
                        {proyek.realisasiFisikPersen}%
                      </span>
                      <span className="text-[10.5px] text-slate-500 ml-1">
                        selesai
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400">Target: {proyek.rencanaFisikPersen}%</span>
                      <div className="text-[10.5px] font-bold font-mono">
                        {isAhead ? (
                          <span className="text-emerald-700">+{proyek.deviasiFisikPersen}%</span>
                        ) : (
                          <span className="text-rose-600">{proyek.deviasiFisikPersen}%</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar Visual */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative mb-2">
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-500 z-10"
                      style={{ left: `${proyek.rencanaFisikPersen}%` }}
                      title={`Target: ${proyek.rencanaFisikPersen}%`}
                    />
                    <div
                      className={`h-full rounded-full transition-all ${barColor}`}
                      style={{ width: `${proyek.realisasiFisikPersen}%` }}
                    />
                  </div>
                </div>

                {/* Bottom Footer Info */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Kontrak: Rp {proyek.nilaiKontrakMiliar} M</span>
                  <span className="font-semibold text-sky-700 hover:underline">
                    {isSelected ? 'Sedang Dipilih ✓' : 'Klik Rincian ➔'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Panel Detail Proyek Terpilih (Singkat & Mudah Dipahami) */}
        {selectedProyek && (
          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[10px]">
                  Rincian Proyek Terpilih
                </span>
                <strong className="text-xs text-slate-900">{selectedProyek.namaPaket}</strong>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Kontrak: {selectedProyek.nomorKontrak}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Kontraktor &amp; Pengawas</span>
                <strong className="text-slate-800 block leading-tight mt-0.5">{selectedProyek.kontraktor}</strong>
                <span className="text-slate-500 text-[10px]">{selectedProyek.konsultanSupervisi}</span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Nilai Kontrak Proyek</span>
                <strong className="text-emerald-700 text-sm font-mono font-bold block mt-0.5">
                  Rp {selectedProyek.nilaiKontrakMiliar} Miliar
                </strong>
                <span className="text-slate-500 text-[10px]">Realisasi Keuangan: {selectedProyek.realisasiKeuanganPersen}%</span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Batas Waktu Selesai</span>
                <strong className="text-slate-800 block mt-0.5">{selectedProyek.targetSelesai}</strong>
                <span className="text-slate-500 text-[10px]">Sisa {selectedProyek.sisaHari} hari kerja</span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Kondisi Lapangan</span>
                <p className="text-slate-700 text-[10.5px] leading-snug mt-0.5 line-clamp-2">
                  {selectedProyek.isuKendala}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. VISUAL PENDUKUNG: JALAN MULUS, UTILITAS PIPA/KABEL & PENGHIJAUAN (ROW) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
        {/* Visual 1: Kondisi Jalan Kota Batam */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Route className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-slate-900">Kondisi Jalan Raya Kota Batam</h4>
              </div>
              <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200 font-semibold">
                542,8 Km
              </span>
            </div>

            {/* Status Kondisi & Visual Bar Wilayah */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Mulus Siap Pakai:
                </span>
                <strong className="font-mono text-emerald-700">478,8 Km (88,2%)</strong>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Rusak Ringan:
                </span>
                <strong className="font-mono text-amber-800">45,6 Km (8,4%)</strong>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Rusak Berat / Perbaikan:
                </span>
                <strong className="font-mono text-rose-700">18,4 Km (3,4%)</strong>
              </div>
            </div>

            {/* Visual Bar Breakdown per Wilayah */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[10px]">
              <span className="font-semibold text-slate-500 block mb-1">Tingkat Kemantapan per Wilayah:</span>
              {[
                { wilayah: 'Batam Centre', persen: 93.8 },
                { wilayah: 'Batu Ampar & Bengkong', persen: 91.5 },
                { wilayah: 'Sekupang', persen: 90.4 },
                { wilayah: 'Mukakuning & Batu Aji', persen: 88.2 },
                { wilayah: 'Nongsa & Kabil', persen: 86.7 },
              ].map((w) => (
                <div key={w.wilayah} className="flex items-center justify-between gap-2">
                  <span className="text-slate-600 truncate">{w.wilayah}</span>
                  <div className="flex items-center gap-1.5 w-28">
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${w.persen}%` }} />
                    </div>
                    <span className="font-mono font-bold text-slate-700 text-[9.5px] w-9 text-right">{w.persen}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 text-center">
            Target Nasional Kemantapan Jalan: ≥ 85% (Batam tercapai 88,2%)
          </div>
        </div>

        {/* Visual 2: Pemanfaatan Pinggir Jalan (Kabel & Pipa Utilitas) */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold text-slate-900">Izin Kabel &amp; Pipa Bawah Tanah (ROW)</h4>
              </div>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 font-semibold">
                142 Izin
              </span>
            </div>

            <p className="text-[10.5px] text-slate-500 mb-3">
              Penataan jaringan kabel dan pipa di bahu jalan agar jalan tidak semrawut dan tidak sering dibongkar.
            </p>

            {/* Visual Kategori Utilitas */}
            <div className="space-y-2.5">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    🌐 Kabel Internet Fiber Optik
                  </span>
                  <strong className="font-mono text-slate-900">52 Izin (36,6%)</strong>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: '36.6%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    💧 Pipa Air Bersih (SPAM BP Batam)
                  </span>
                  <strong className="font-mono text-slate-900">48 Izin (33,8%)</strong>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '33.8%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    ⚡ Kabel Listrik Tegangan Tinggi (PLN)
                  </span>
                  <strong className="font-mono text-slate-900">42 Izin (29,6%)</strong>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '29.6%' }} />
                </div>
              </div>
            </div>

            {/* Izin Box Culvert Terpadu */}
            <div className="mt-3.5 p-2 rounded-lg bg-amber-50/60 border border-amber-100 flex items-center justify-between text-[10px]">
              <span className="text-amber-900 font-medium">Wajib Galian Box Culvert Terpadu:</span>
              <span className="font-bold text-amber-950">100% Bebas Kabel Menggantung</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 text-center">
            Seluruh izin terdaftar resmi dalam Sistem Satu Data BP Batam
          </div>
        </div>

        {/* Visual 3: Penghijauan & Taman Pinggir Jalan */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold text-slate-900">Penghijauan &amp; Taman Median Jalan</h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-semibold">
                34,2 Hektar
              </span>
            </div>

            <p className="text-[10.5px] text-slate-500 mb-3">
              Penanaman pohon peneduh dan penataan taman di jalur pembatas jalan agar kota Batam sejuk dan asri.
            </p>

            {/* Statistik Ringkas Pohon */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-center">
                <span className="text-[10px] text-emerald-800 block">Pohon Ditanam</span>
                <strong className="text-base font-black font-mono text-emerald-900">14.850</strong>
                <span className="text-[9px] text-emerald-700 block">Pohon Peneduh</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-center">
                <span className="text-[10px] text-emerald-800 block">Titik Taman Aktif</span>
                <strong className="text-base font-black font-mono text-emerald-900">86</strong>
                <span className="text-[9px] text-emerald-700 block">Lokasi Terawat</span>
              </div>
            </div>

            {/* Jenis Tanaman Populer */}
            <div className="space-y-1 text-[10.5px]">
              <span className="font-semibold text-slate-500 block mb-1">Jenis Tanaman Utama:</span>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">
                  🌳 Ketapang Kencana
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">
                  🌸 Bungur Sakura
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">
                  🌴 Palem Ekor Tupai
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">
                  🌿 Pucuk Merah
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 text-center">
            80% Dirawat bersama mitra CSR Perusahaan di Kota Batam
          </div>
        </div>
      </div>
    </div>
  );
};
