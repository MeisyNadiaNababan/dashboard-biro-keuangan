import React from 'react';
import {
  HardHat,
  Coins,
  CheckCircle2,
  HelpCircle,
  ArrowUpRight,
  TrendingUp,
  Database,
  Tag,
} from 'lucide-react';
import { PERKIN_A7_KPIS, PERKIN_A7_METADATA } from './perkinA7Data';

interface InfrastrukturPerkinA7KpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedQuarter?: string;
}

export const InfrastrukturPerkinA7KpiRow: React.FC<InfrastrukturPerkinA7KpiRowProps> = ({
  onOpenFormulaModal,
  selectedQuarter = 'ALL',
}) => {
  return (
    <div className="space-y-2.5 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-0.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-xs sm:text-xs font-black tracking-wider uppercase text-slate-800">
            2 INDIKATOR KINERJA PROGRAM (IKP) RESMI PERKIN A.7 TAHUN 2025
          </h2>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
            {PERKIN_A7_METADATA.nomorPerkin}
          </span>
        </div>
        <div className="text-[10.5px] text-slate-500 font-medium">
          Ditetapkan Kepala BP Batam &bull; Evaluasi:{' '}
          <strong className="text-slate-800 font-mono">
            {selectedQuarter === 'ALL' ? 'Akumulatif s.d. Triwulan III' : `Triwulan ${selectedQuarter}`}
          </strong>
        </div>
      </div>

      {/* Grid of 2 Compact, Informative KPI Cards with Satu Data Attribute Mapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PERKIN_A7_KPIS.map((kpi) => {
          const isKpi1 = kpi.code === 'IKP-1';
          const isMelampaui = kpi.status === 'Melampaui Target';

          return (
            <div
              key={kpi.id}
              onClick={() => onOpenFormulaModal(kpi.id)}
              className="bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm transition-all duration-150 cursor-pointer flex flex-col justify-between relative group overflow-hidden"
              title="Klik untuk membuka Kamus Rumus & Dasar Regulasi Perkin"
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isKpi1 ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                }`}
              />

              <div className="space-y-2.5">
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isKpi1
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {isKpi1 ? <HardHat className="w-4 h-4" /> : <Coins className="w-4 h-4" />}
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded bg-slate-900 text-white">
                        {kpi.code}
                      </span>
                      <span className="text-[10.5px] font-medium text-slate-500 truncate">
                        {kpi.halamanPdf}
                      </span>
                    </div>
                  </div>

                  {/* Status Pill & Formula Help */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        isMelampaui
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-sky-50 text-sky-700 border-sky-300'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{kpi.status}</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenFormulaModal(kpi.id);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                      title="Lihat Detail Rumus Perhitungan"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* KPI Title & Subtitle */}
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                    {kpi.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {kpi.deskripsi}
                  </p>
                </div>

                {/* Satu Data Source & Attribute Mapping Pill */}
                <div className="p-2 rounded-lg bg-slate-100/80 border border-slate-200 text-[10.5px] space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <Database className="w-3 h-3 text-blue-600" />
                      Sumber:
                    </span>
                    <span className="font-mono text-blue-800 font-semibold">
                      {isKpi1
                        ? 'Dit. Pembangunan Infrastruktur (Data No. 4 & No. 6 Hal. 49-51)'
                        : 'Dit. Pembangunan (Data No. 1 & 2 Hal. 48) & Biro Keuangan (Data No. 8 Hal. 4)'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="font-bold text-slate-600 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-emerald-600" />
                      Atribut:
                    </span>
                    {isKpi1 ? (
                      <>
                        <span className="px-1 rounded bg-white text-emerald-800 font-mono font-black border border-emerald-300">PRGRS_PEK</span>
                        <span className="px-1 rounded bg-white text-slate-700 font-mono border border-slate-200">VOL_PEK</span>
                        <span className="px-1 rounded bg-white text-slate-700 font-mono border border-slate-200">KTGR_PEK</span>
                        <span className="px-1 rounded bg-white text-slate-700 font-mono border border-slate-200">NAMOBJ</span>
                        <span className="px-1 rounded bg-white text-slate-700 font-mono border border-slate-200">NM_PPK</span>
                      </>
                    ) : (
                      <>
                        <span className="px-1 rounded bg-white text-emerald-800 font-mono font-black border border-emerald-300">KODE TRANSAKSI</span>
                        <span className="px-1 rounded bg-white text-slate-700 font-mono border border-slate-200">TOTAL GALIAN</span>
                        <span className="px-1 rounded bg-white text-slate-700 font-mono border border-slate-200">LUAS PENGHIJAUAN</span>
                        <span className="px-1 rounded bg-white text-slate-700 font-mono border border-slate-200">JUMLAH</span>
                        <span className="px-1 rounded bg-white text-slate-700 font-mono border border-slate-200">TARIF</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Compact 3-Column Metrics Display */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-50/90 border border-slate-200/80 text-center">
                  {/* Col 1: Realisasi */}
                  <div className="text-left pl-1">
                    <div className="text-[9.5px] font-mono uppercase text-slate-500 tracking-wider">
                      Realisasi ({isKpi1 ? 'PRGRS_PEK' : 'JUMLAH'})
                    </div>
                    <div className="text-lg sm:text-xl font-black font-mono text-slate-900 mt-0.5">
                      {isKpi1 ? '92,40%' : '109,22%'}
                    </div>
                    <div className="text-[9.5px] font-mono text-slate-500 truncate">
                      {isKpi1 ? 'Fisik Lapangan' : 'Rp 7,450 Miliar'}
                    </div>
                  </div>

                  {/* Col 2: Target */}
                  <div className="border-x border-slate-200 px-1 text-center">
                    <div className="text-[9.5px] font-mono uppercase text-slate-500 tracking-wider">
                      Target Perkin ({isKpi1 ? 'VOL_PEK' : 'DIPA'})
                    </div>
                    <div className="text-base sm:text-lg font-bold font-mono text-slate-700 mt-0.5">
                      100%
                    </div>
                    <div className="text-[9.5px] font-mono text-slate-500 truncate">
                      {isKpi1 ? 'Rencana Kerja' : 'Rp 6,821 M (DIPA)'}
                    </div>
                  </div>

                  {/* Col 3: Capaian */}
                  <div className="text-right pr-1">
                    <div className="text-[9.5px] font-mono uppercase text-slate-500 tracking-wider">
                      Capaian
                    </div>
                    <div className="text-base sm:text-lg font-black font-mono text-emerald-600 mt-0.5 flex items-center justify-end gap-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>{kpi.achievement.toFixed(2)}%</span>
                    </div>
                    <div className="text-[9.5px] font-mono text-emerald-700 font-bold truncate">
                      {isKpi1 ? 'On Schedule' : '+Rp 629 Juta (Surplus)'}
                    </div>
                  </div>
                </div>

                {/* Sleek Triwulan Progress Bar */}
                {kpi.triwulanTrend && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Progres Q1 - Q4:</span>
                      <span className="font-semibold text-slate-700">
                        Q1: {kpi.triwulanTrend.q1}% &bull; Q2: {kpi.triwulanTrend.q2}% &bull; Q3: {kpi.triwulanTrend.q3}% &bull; Q4: {kpi.triwulanTrend.q4}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${Math.min(kpi.achievement, 100)}%` }}
                        className={`h-full transition-all duration-500 rounded-full ${
                          isMelampaui ? 'bg-emerald-500' : 'bg-blue-600'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Footer Info */}
              <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500">
                <span className="truncate max-w-[260px] sm:max-w-[340px]">
                  <strong>Pengampu:</strong> {kpi.unitPengampu}
                </span>
                <span className="text-blue-700 font-bold group-hover:underline shrink-0 flex items-center gap-0.5">
                  Kamus Rumus &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
