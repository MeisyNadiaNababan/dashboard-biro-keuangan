import React from 'react';
import {
  HardHat,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle2,
  HelpCircle,
  Percent,
  Layers,
  Zap,
  Trees,
  Route,
  Mountain,
  AlertTriangle,
  Info,
} from 'lucide-react';
import {
  REKAP_JENIS_PEMBANGUNAN,
  DATASET_4_PROGRES_KONSTRUKSI,
  SUMMARY_ROW_UTILITAS,
  SUMMARY_ROW_PENGHIJAUAN,
  SUMMARY_RUAS_JARINGAN_JALAN,
  SUMMARY_PEMATANGAN_TANAH,
} from './infrastrukturData';

interface InfrastrukturKpisProps {
  totalProyek: number;
  activeDatasetTab?: string;
  onSelectDatasetTab?: (tab: string) => void;
  onOpenFormula: (kpiType: 'kpi-pembangunan' | 'kpi-progres-fisik' | 'kpi-progres-keuangan' | 'kpi-row-utilitas' | 'kpi-row-penghijauan' | 'kpi-ruas-jalan') => void;
}

export const InfrastrukturKpis: React.FC<InfrastrukturKpisProps> = ({
  totalProyek,
  activeDatasetTab,
  onSelectDatasetTab,
  onOpenFormula,
}) => {
  // Aggregate calculations
  const totalPaguInfrastruktur = REKAP_JENIS_PEMBANGUNAN.reduce((sum, item) => sum + item.totalPagu, 0);
  const totalPaguTriliun = (totalPaguInfrastruktur / 1000000000000).toFixed(2);

  const avgRealisasiFisik = (
    DATASET_4_PROGRES_KONSTRUKSI.reduce((sum, item) => sum + item.realisasiFisikPersen, 0) /
    DATASET_4_PROGRES_KONSTRUKSI.length
  ).toFixed(1);

  const avgRealisasiKeuangan = (
    DATASET_4_PROGRES_KONSTRUKSI.reduce((sum, item) => sum + item.realisasiKeuanganPersen, 0) /
    DATASET_4_PROGRES_KONSTRUKSI.length
  ).toFixed(1);

  const kritisCount = DATASET_4_PROGRES_KONSTRUKSI.filter(p => p.statusKurvaS === 'Kritis (SCM)').length;

  return (
    <div className="space-y-2 mb-4 font-sans">
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <h2 className="text-[11px] font-bold tracking-wider uppercase text-slate-700">
            INDIKATOR KINERJA 6 DATASET PEMBANGUNAN INFRASTRUKTUR (SATU DATA HAL. 48-51)
          </h2>
        </div>
        <span className="text-[10.5px] text-slate-500 hidden sm:inline">
          Klik kartu untuk beralih ke data rinci
        </span>
      </div>

      {/* Grid of 6 Compact Dataset KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {/* KPI 1: Dataset #6 - Pembangunan Infrastruktur */}
        <div
          onClick={() => onSelectDatasetTab ? onSelectDatasetTab('dataset-6') : onOpenFormula('kpi-pembangunan')}
          className={`bg-white border rounded-xl p-2.5 shadow-2xs hover:border-sky-400 transition-all cursor-pointer flex flex-col justify-between ${
            activeDatasetTab === 'dataset-6' ? 'ring-2 ring-sky-500 border-sky-400 bg-sky-50/20' : 'border-slate-200/90'
          }`}
          title="Dataset No. 6: Pembangunan Infrastruktur BP Batam (Hal. 50-51)"
        >
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded bg-sky-50 text-sky-700 flex items-center justify-center">
                  <HardHat className="w-3 h-3" />
                </div>
                <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  DATASET #6
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenFormula('kpi-pembangunan');
                }}
                className="text-slate-400 hover:text-sky-600 p-0.5"
                title="Lihat rumus"
              >
                <HelpCircle className="w-3 h-3" />
              </button>
            </div>

            <h4 className="text-[11px] font-bold text-slate-800 leading-tight line-clamp-1">
              Paket Proyek Fisik
            </h4>
            <div className="my-1">
              <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight leading-none">
                {totalProyek || 58} <span className="text-[10px] font-normal text-slate-500">Paket</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                Pagu: Rp {totalPaguTriliun} T
              </div>
            </div>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[9.5px]">
            <span className="text-emerald-700 font-medium">88% On-Track</span>
            <span className="text-slate-400 font-mono">JNS_PEK</span>
          </div>
        </div>

        {/* KPI 2: Dataset #4 - Laporan Progres Konstruksi */}
        <div
          onClick={() => onSelectDatasetTab ? onSelectDatasetTab('dataset-4') : onOpenFormula('kpi-progres-fisik')}
          className={`bg-white border rounded-xl p-2.5 shadow-2xs hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-between ${
            activeDatasetTab === 'dataset-4' ? 'ring-2 ring-emerald-500 border-emerald-400 bg-emerald-50/20' : 'border-slate-200/90'
          }`}
          title="Dataset No. 4: Laporan Progres Pekerjaan Konstruksi (Hal. 49-50)"
        >
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Activity className="w-3 h-3" />
                </div>
                <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  DATASET #4
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenFormula('kpi-progres-fisik');
                }}
                className="text-slate-400 hover:text-emerald-600 p-0.5"
                title="Lihat rumus"
              >
                <HelpCircle className="w-3 h-3" />
              </button>
            </div>

            <h4 className="text-[11px] font-bold text-slate-800 leading-tight line-clamp-1">
              Realisasi Fisik (PRGRS)
            </h4>
            <div className="my-1">
              <div className="text-lg sm:text-xl font-black text-emerald-800 font-mono tracking-tight leading-none">
                {avgRealisasiFisik}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                Keuangan: {avgRealisasiKeuangan}%
              </div>
            </div>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[9.5px]">
            <span className={kritisCount > 0 ? "text-amber-700 font-medium" : "text-emerald-700 font-medium"}>
              {kritisCount} Paket SCM
            </span>
            <span className="text-slate-400 font-mono">KURVA S</span>
          </div>
        </div>

        {/* KPI 3: Dataset #5 - Pematangan Tanah BSW */}
        <div
          onClick={() => onSelectDatasetTab ? onSelectDatasetTab('dataset-5') : null}
          className={`bg-white border rounded-xl p-2.5 shadow-2xs hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between ${
            activeDatasetTab === 'dataset-5' ? 'ring-2 ring-amber-500 border-amber-400 bg-amber-50/20' : 'border-slate-200/90'
          }`}
          title="Dataset No. 5: Pematangan Tanah BSW (Hal. 50)"
        >
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Mountain className="w-3 h-3" />
                </div>
                <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  DATASET #5
                </span>
              </div>
              <span className="text-[9px] font-mono text-amber-700 font-semibold">
                5 BSW
              </span>
            </div>

            <h4 className="text-[11px] font-bold text-slate-800 leading-tight line-clamp-1">
              Pematangan Tanah (BSW)
            </h4>
            <div className="my-1">
              <div className="text-lg sm:text-xl font-black text-amber-800 font-mono tracking-tight leading-none">
                {SUMMARY_PEMATANGAN_TANAH.totalLuasHektar} <span className="text-[10px] font-normal text-slate-500">Ha</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                Volume: 4,27 Juta m³
              </div>
            </div>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[9.5px]">
            <span className="text-amber-700 font-medium">Progres: {SUMMARY_PEMATANGAN_TANAH.rataRataProgres}%</span>
            <span className="text-slate-400 font-mono">CUT/FILL</span>
          </div>
        </div>

        {/* KPI 4: Dataset #1 - Perizinan ROW Utilitas */}
        <div
          onClick={() => onSelectDatasetTab ? onSelectDatasetTab('dataset-1') : onOpenFormula('kpi-row-utilitas')}
          className={`bg-white border rounded-xl p-2.5 shadow-2xs hover:border-sky-400 transition-all cursor-pointer flex flex-col justify-between ${
            activeDatasetTab === 'dataset-1' ? 'ring-2 ring-sky-500 border-sky-400 bg-sky-50/20' : 'border-slate-200/90'
          }`}
          title="Dataset No. 1: Rekapitulasi Izin Pemanfaatan ROW Utilitas (Hal. 48)"
        >
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Zap className="w-3 h-3" />
                </div>
                <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  DATASET #1
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenFormula('kpi-row-utilitas');
                }}
                className="text-slate-400 hover:text-sky-600 p-0.5"
                title="Lihat rumus"
              >
                <HelpCircle className="w-3 h-3" />
              </button>
            </div>

            <h4 className="text-[11px] font-bold text-slate-800 leading-tight line-clamp-1">
              Izin ROW Utilitas
            </h4>
            <div className="my-1">
              <div className="text-lg sm:text-xl font-black text-sky-900 font-mono tracking-tight leading-none">
                {SUMMARY_ROW_UTILITAS.totalIzinTerbit} <span className="text-[10px] font-normal text-slate-500">Izin</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                Galian: {SUMMARY_ROW_UTILITAS.totalPanjangGalianKm} Km
              </div>
            </div>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[9.5px]">
            <span className="text-sky-700 font-medium">Rekondisi: 98%</span>
            <span className="text-slate-400 font-mono">CROSSING</span>
          </div>
        </div>

        {/* KPI 5: Dataset #2 - Perizinan ROW Penghijauan */}
        <div
          onClick={() => onSelectDatasetTab ? onSelectDatasetTab('dataset-2') : onOpenFormula('kpi-row-penghijauan')}
          className={`bg-white border rounded-xl p-2.5 shadow-2xs hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-between ${
            activeDatasetTab === 'dataset-2' ? 'ring-2 ring-emerald-500 border-emerald-400 bg-emerald-50/20' : 'border-slate-200/90'
          }`}
          title="Dataset No. 2: Rekapitulasi Izin Pemanfaatan ROW Penghijauan (Hal. 48)"
        >
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Trees className="w-3 h-3" />
                </div>
                <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  DATASET #2
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenFormula('kpi-row-penghijauan');
                }}
                className="text-slate-400 hover:text-emerald-600 p-0.5"
                title="Lihat rumus"
              >
                <HelpCircle className="w-3 h-3" />
              </button>
            </div>

            <h4 className="text-[11px] font-bold text-slate-800 leading-tight line-clamp-1">
              Izin ROW Penghijauan
            </h4>
            <div className="my-1">
              <div className="text-lg sm:text-xl font-black text-emerald-800 font-mono tracking-tight leading-none">
                {SUMMARY_ROW_PENGHIJAUAN.totalIzinTerbit} <span className="text-[10px] font-normal text-slate-500">Izin</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                Luas: {SUMMARY_ROW_PENGHIJAUAN.totalLuasPenghijauanHa} Ha
              </div>
            </div>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[9.5px]">
            <span className="text-emerald-700 font-medium">14.850 Pohon</span>
            <span className="text-slate-400 font-mono">MEDIAN</span>
          </div>
        </div>

        {/* KPI 6: Dataset #3 - Ruas Jaringan Jalan Eksisting */}
        <div
          onClick={() => onSelectDatasetTab ? onSelectDatasetTab('dataset-3') : onOpenFormula('kpi-ruas-jalan')}
          className={`bg-white border rounded-xl p-2.5 shadow-2xs hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between ${
            activeDatasetTab === 'dataset-3' ? 'ring-2 ring-indigo-500 border-indigo-400 bg-indigo-50/20' : 'border-slate-200/90'
          }`}
          title="Dataset No. 3: Jaringan Jalan Eksisting (Hal. 48-49)"
        >
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Route className="w-3 h-3" />
                </div>
                <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  DATASET #3
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenFormula('kpi-ruas-jalan');
                }}
                className="text-slate-400 hover:text-indigo-600 p-0.5"
                title="Lihat rumus"
              >
                <HelpCircle className="w-3 h-3" />
              </button>
            </div>

            <h4 className="text-[11px] font-bold text-slate-800 leading-tight line-clamp-1">
              Jaringan Jalan BP
            </h4>
            <div className="my-1">
              <div className="text-lg sm:text-xl font-black text-indigo-900 font-mono tracking-tight leading-none">
                {SUMMARY_RUAS_JARINGAN_JALAN.totalPanjangJalanKm} <span className="text-[10px] font-normal text-slate-500">Km</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                {SUMMARY_RUAS_JARINGAN_JALAN.totalRuasJalan} Ruas Jalan
              </div>
            </div>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[9.5px]">
            <span className="text-indigo-700 font-medium">{SUMMARY_RUAS_JARINGAN_JALAN.kondisiJalan.persentaseMantap}% Mantap</span>
            <span className="text-slate-400 font-mono">LKONOF</span>
          </div>
        </div>
      </div>
    </div>
  );
};
