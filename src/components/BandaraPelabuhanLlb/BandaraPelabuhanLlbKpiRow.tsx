import React from 'react';
import {
  TrendingUp,
  Award,
  Info,
  CheckCircle2,
  DollarSign,
  Users,
  Plane,
  Anchor,
  Truck,
  Package,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';

interface BandaraPelabuhanLlbKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedQuarter?: string;
  onNavigateToUnit?: (unitId: string) => void;
}

export const BandaraPelabuhanLlbKpiRow: React.FC<BandaraPelabuhanLlbKpiRowProps> = ({
  onOpenFormulaModal,
  selectedQuarter = 'ALL',
  onNavigateToUnit,
}) => {
  // 2 KPI UTAMA (PNBP LALU LINTAS BARANG SUDAH DIGABUNG KE PNBP BANDARA & PELABUHAN)
  const DUA_KPI_UTAMA = [
    {
      id: 'ikp-1-ikm-gabungan',
      code: 'IKP-1',
      number: 1,
      name: 'Rata-rata Nilai IKM Pelayanan di Kawasan Bandara, Pelabuhan, dan Lalu Lintas Barang',
      programTarget: '86,30',
      realization: '88,45',
      achievement: 102.49,
      unit: 'Indeks (Skala 1-100)',
      predikat: 'Mutu A (Sangat Baik)',
      status: 'Melampaui Target',
      responsibleUnit: 'Konsolidasi 3 Satker: Dit. Bandara, Dit. Pelabuhan, Dit. LLB',
      dataSource: 'Biro Organisasi, Kepatuhan & Manajemen Risiko (BOKMR) & 3 Unit Layanan',
      baseline: '84,10 (Mutu B)',
      accentGradient: 'from-blue-600 via-indigo-600 to-blue-700',
      borderAccent: 'border-blue-200 hover:border-blue-400',
      icon: <Users className="w-5 h-5 text-white" />,
      // Rincian Nilai IKM 3 Lokus
      breakdown: [
        { entity: 'Bandara Hang Nadim', target: '86,00', realization: '88,50', percentage: 102.91, mutu: 'Mutu A' },
        { entity: 'Pelabuhan Laut Batam', target: '86,30', realization: '88,40', percentage: 102.43, mutu: 'Mutu A' },
        { entity: 'Lalu Lintas Barang', target: '86,50', realization: '88,45', percentage: 102.25, mutu: 'Mutu A' },
      ],
      // Indikator Operasional dari 3 Unit Kerja Pengampu yang ditaruh di bawah KPI Utama
      satkerMetrics: [
        {
          unit: 'Dit. Kawasan Bandara',
          icon: <Plane className="w-3.5 h-3.5 text-emerald-600" />,
          items: [
            { label: 'Arus Penumpang Udara', val: '4,86 Juta Pax', note: '108,0% keterisian' },
            { label: 'Throughput Penerbangan', val: '38.450 Flight', note: '102,5% target' },
            { label: 'Kargo Udara (EMPU)', val: '42.150 Ton', note: '105,4% kapasitas' },
          ],
        },
        {
          unit: 'Dit. Kepelabuhanan',
          icon: <Anchor className="w-3.5 h-3.5 text-blue-600" />,
          items: [
            { label: 'Kunjungan Kapal (Call)', val: '18.240 Call', note: '104,2% traffic laut' },
            { label: 'Peti Kemas Batu Ampar', val: '620.000 TEUs', note: 'STS Crane elektrik' },
            { label: 'Volume Kargo & Curah', val: '45,20 Jt Ton', note: '106,4% throughput' },
          ],
        },
        {
          unit: 'Dit. Lalu Lintas Barang',
          icon: <Truck className="w-3.5 h-3.5 text-amber-600" />,
          items: [
            { label: 'Dokumen Izin Terbit', val: '14.850 Dok', note: 'Inbound & outbound' },
            { label: 'Kepatuhan SLA Waktu', val: '96,8% Tepat', note: 'Target SLA: 95,0%' },
            { label: 'Kuota Barang Konsumsi', val: '100% Realisasi', note: 'Pengendalian pasokan' },
          ],
        },
      ],
    },
    {
      id: 'ikp-2-pnbp-bandara-pelabuhan',
      code: 'IKP-2',
      number: 2,
      name: 'Realisasi PNBP Gabungan Kawasan Bandara, Pelabuhan, dan Lalu Lintas Barang',
      programTarget: 'Rp 520,41 M',
      realization: 'Rp 565,33 M',
      achievement: 108.63,
      unit: 'Miliar Rupiah',
      predikat: 'Melampaui (+Rp 44,92 M)',
      status: 'Melampaui Target',
      responsibleUnit: 'Konsolidasi 3 Satker Pengampu: Dit. Bandara, Dit. Pelabuhan, Dit. LLB',
      dataSource: 'Biro Keuangan BP Batam & SIMP Billing System 3 Satker (Hal. 8, 11 & 15)',
      baseline: 'Rp 488,55 M',
      accentGradient: 'from-emerald-600 via-teal-600 to-cyan-600',
      borderAccent: 'border-emerald-200 hover:border-emerald-400',
      icon: <DollarSign className="w-5 h-5 text-white" />,
      // Rincian Realisasi PNBP 3 Satker Pengampu
      breakdown: [
        { entity: 'Dit. Kawasan Bandara', target: 'Rp 285,00 M', realization: 'Rp 312,45 M', percentage: 109.63, share: '55,3%' },
        { entity: 'Dit. Pengelolaan Kepelabuhanan', target: 'Rp 233,21 M', realization: 'Rp 250,40 M', percentage: 107.37, share: '44,3%' },
        { entity: 'Dit. Lalu Lintas Barang', target: 'Rp 2,20 M', realization: 'Rp 2,48 M', percentage: 112.73, share: '0,4%' },
      ],
      // Indikator Finansial & Penerimaan dari 3 Unit Kerja Pengampu
      satkerMetrics: [
        {
          unit: 'Dit. Kawasan Bandara',
          icon: <Plane className="w-3.5 h-3.5 text-emerald-600" />,
          items: [
            { label: 'Realisasi PNBP Bandara', val: 'Rp 312,45 M', note: '109,6% dari Target Rp 285,00 M' },
            { label: 'Kontribusi Porsi PNBP', val: '55,27%', note: 'Satker penerima terbesar' },
            { label: 'Surplus PNBP Bersih', val: '+Rp 27,45 M', note: 'PJP4U, Aviobridge & Konsesi' },
          ],
        },
        {
          unit: 'Dit. Kepelabuhanan',
          icon: <Anchor className="w-3.5 h-3.5 text-blue-600" />,
          items: [
            { label: 'Realisasi PNBP Pelabuhan', val: 'Rp 250,40 M', note: '107,4% dari Target Rp 233,21 M' },
            { label: 'Kontribusi Porsi PNBP', val: '44,29%', note: 'Satker pilar maritim' },
            { label: 'Surplus PNBP Bersih', val: '+Rp 17,19 M', note: 'Jasa Labuh, Tambat & Dermaga' },
          ],
        },
        {
          unit: 'Dit. Lalu Lintas Barang',
          icon: <Truck className="w-3.5 h-3.5 text-amber-600" />,
          items: [
            { label: 'Realisasi PNBP LLB', val: 'Rp 2,48 M', note: '112,7% dari Target Rp 2,20 M' },
            { label: 'Kontribusi Porsi PNBP', val: '0,44%', note: 'Layanan logistik regulasi' },
            { label: 'Surplus PNBP Bersih', val: '+Rp 0,28 M', note: 'Izin Kawasan & Konsumsi' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="space-y-4 font-sans">
      {/* ============================================================== */}
      {/* SECTION 2 INDIKATOR KINERJA PROGRAM UTAMA (PERKIN A.5)          */}
      {/* DENGAN BEBERAPA KPI 3 SATKER PENGAMPU DILETAKKAN DI BAWAHNYA   */}
      {/* SEPERTI CONTOH KPI PADA DASHBOARD KEPALA BP BATAM              */}
      {/* ============================================================== */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#002B49] text-white flex items-center justify-center text-xs shadow-2xs font-mono font-bold">
              2
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
                <span>2 INDIKATOR KINERJA PROGRAM UTAMA (PERKIN A.5 TAHUN 2025)</span>
                <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  100% HIJAU &bull; RATA-RATA CAPAIAN 105,56%
                </span>
              </h2>
            </div>
          </div>

          <span className="text-[11px] text-slate-500 font-sans">
            Klik tombol <Info className="w-3 h-3 inline text-blue-600" /> untuk melihat kamus rumus perhitungan &amp; regulasi resmi
          </span>
        </div>

        {/* 2 Compact KPI Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-7xl">
          {DUA_KPI_UTAMA.map((kpi) => (
            <div
              key={kpi.id}
              className={`bg-white rounded-xl border ${kpi.borderAccent} shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between overflow-hidden relative group`}
            >
              {/* Top Accent Strip */}
              <div className={`h-1 w-full bg-linear-to-r ${kpi.accentGradient}`} />

              <div className="p-3 sm:p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                {/* Badge Header & Info Button */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg bg-linear-to-br ${kpi.accentGradient} flex items-center justify-center shadow-2xs shrink-0`}
                    >
                      {React.cloneElement(kpi.icon as React.ReactElement<{ className?: string }>, { className: 'w-4 h-4 text-white' })}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9.5px] font-mono font-black px-1.5 py-0.2 rounded bg-slate-100 text-slate-800 border border-slate-200">
                          {kpi.code}
                        </span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {kpi.status}
                        </span>
                      </div>
                      <span className="text-[9.5px] text-slate-400 font-mono block mt-0.5 truncate max-w-[280px]">
                        {kpi.responsibleUnit}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenFormulaModal(kpi.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Buka Kamus Rumus & Definisi Operasional"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* KPI Title */}
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug line-clamp-1" title={kpi.name}>
                    {kpi.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    Sumber: {kpi.dataSource}
                  </p>
                </div>

                {/* Realization & Target Display */}
                <div className="p-2 sm:p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div>
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                        Realisasi 2025
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
                          {kpi.realization}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {kpi.unit}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                        Target Penetapan
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-slate-700">
                        {kpi.programTarget}
                      </div>
                      <span className="text-[9.5px] text-emerald-700 font-bold font-mono block">
                        Capaian: {kpi.achievement.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 bg-linear-to-r ${kpi.accentGradient}`}
                      style={{ width: `${Math.min(kpi.achievement, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Breakdown 3 Satker Layanan */}
                <div className="space-y-1">
                  <div className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Breakdown 3 Satker Pengampu:</span>
                    <span className="text-emerald-700 font-semibold">{kpi.predikat}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {kpi.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-1.5 rounded-md bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between"
                      >
                        <span className="text-[9px] font-bold text-slate-800 truncate" title={item.entity}>
                          {item.entity.replace('Direktorat ', 'Dit. ').replace('Pengelolaan ', '')}
                        </span>
                        <div className="flex items-baseline justify-between mt-0.5">
                          <span className="text-[11px] font-black font-mono text-slate-900 truncate">
                            {item.realization}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-emerald-700 ml-1">
                            {item.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-KPI 3 Satker Pengampu (Compact Single Row Strip) */}
                <div className="pt-1.5 border-t border-slate-100 space-y-1">
                  <div className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3 text-blue-600" />
                      <span>Kinerja Operasional 3 Satker Terkait:</span>
                    </span>
                    <span className="text-[8.5px] font-sans text-slate-400">
                      Satu Data BP Batam
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {kpi.satkerMetrics.map((sat, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-0.5"
                      >
                        <div className="flex items-center gap-1 pb-0.5 border-b border-slate-200/50">
                          {sat.icon}
                          <span className="text-[9.5px] font-bold text-slate-900 truncate">
                            {sat.unit.replace('Dit. Pengelolaan ', 'Dit. ').replace('Dit. Kawasan ', 'Dit. ')}
                          </span>
                        </div>

                        <div className="space-y-0.5">
                          {sat.items.slice(0, 2).map((m, mIdx) => (
                            <div key={mIdx} className="text-[8.5px] flex items-baseline justify-between font-mono leading-tight">
                              <span className="text-slate-500 truncate max-w-[70px]" title={m.label}>
                                {m.label}:
                              </span>
                              <span className="font-extrabold text-slate-900 ml-1">
                                {m.val}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[9.5px] font-mono text-slate-500">
                <span>Baseline 2024: <strong>{kpi.baseline}</strong></span>
                <span className="text-emerald-700 font-bold uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  100% MELAMPAUI
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
