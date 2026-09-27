import React from 'react';
import {
  Building2,
  Layers,
  Award,
  ShieldCheck,
  Compass,
  Target,
  ArrowRight,
  Database,
  CheckCircle2,
  FileSpreadsheet,
  Briefcase,
} from 'lucide-react';
import { KEBIJAKAN_STRATEGIS_UNITS, PERKIN_METADATA } from './kebijakanStrategisData';

interface KebijakanStrategisExecutiveMatrixProps {
  onSelectUnitDeepDive: (unitId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
}

export const KebijakanStrategisExecutiveMatrix: React.FC<KebijakanStrategisExecutiveMatrixProps> = ({
  onSelectUnitDeepDive,
}) => {
  const getUnitIcon = (unitId: string) => {
    switch (unitId) {
      case 'ptsp':
        return <Layers className="w-4 h-4 text-sky-600" />;
      case 'pdsi':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'pusat-perencanaan-program':
        return <Target className="w-4 h-4 text-amber-600" />;
      case 'pusat-harmonisasi':
        return <Compass className="w-4 h-4 text-indigo-600" />;
      default:
        return <Building2 className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </span>
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight uppercase">
              Ringkasan Matriks Eksekutif 4 Unit Kerja Pelaksana
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Komparasi terpadu pagu anggaran DIPA, realisasi belanja, capaian IKP, dan portofolio 64 dataset lintas satker.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
            Perkin A2 (DEP A2) · 4 Satker Pelaksana
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-[10.5px] uppercase font-bold text-slate-500 tracking-wider">
              <th className="py-3 px-4">Satuan Kerja &amp; Kode</th>
              <th className="py-3 px-3">Pimpinan Satker</th>
              <th className="py-3 px-3 text-right">Pagu DIPA 2025</th>
              <th className="py-3 px-3 text-right">Realisasi &amp; Serapan</th>
              <th className="py-3 px-3">Indikator Kinerja Utama (IKP)</th>
              <th className="py-3 px-3 text-center">Dataset PDF</th>
              <th className="py-3 px-3">Highlight Kinerja Strategis</th>
              <th className="py-3 px-4 text-center">Aksi Deep Dive</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {KEBIJAKAN_STRATEGIS_UNITS.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
                      {getUnitIcon(u.id)}
                    </span>
                    <div>
                      <div className="font-mono text-[10px] text-sky-700 font-black uppercase">
                        {u.code} · SATKER PELAKSANA
                      </div>
                      <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {u.shortName}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">
                        {u.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-3">
                  <div className="text-slate-900 font-bold text-xs">{u.pimpinan}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Briefcase className="w-3 h-3 text-slate-400" />
                    <span>Unit Operasional BP</span>
                  </div>
                </td>

                <td className="py-3.5 px-3 text-right">
                  <div className="font-mono font-black text-slate-900 text-xs sm:text-sm">
                    Rp {(u.paguAnggaran / 1e9).toFixed(2)} M
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">DIPA 2025</div>
                </td>

                <td className="py-3.5 px-3 text-right">
                  <div className="font-mono font-black text-emerald-700 text-xs sm:text-sm">
                    Rp {(u.realisasiAnggaran / 1e9).toFixed(2)} M
                  </div>
                  <div className="flex items-center justify-end gap-1.5 mt-1">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min(100, u.serapanPersen)}%` }}
                      />
                    </div>
                    <span className="text-[10.5px] font-mono font-bold text-slate-600">
                      {u.serapanPersen.toFixed(1)}%
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-3">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 font-bold text-[11px]">
                    <Award className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span className="truncate max-w-[180px]">{u.ikpTerhubung}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-2">
                    <span>Realisasi: <strong className="font-mono text-emerald-700">{u.realisasiIkp}</strong></span>
                    <span>·</span>
                    <span>Target: <strong className="font-mono text-slate-700">{u.targetIkp}</strong></span>
                  </div>
                </td>

                <td className="py-3.5 px-3 text-center">
                  <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {u.datasetCount} DS
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">{u.pdfPages}</div>
                </td>

                <td className="py-3.5 px-3">
                  <div className="space-y-1 text-[11px] text-slate-600 max-w-xs">
                    {u.keyHighlights.slice(0, 2).map((kh, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-slate-800">{kh.label}:</span>
                        <span className="text-slate-600 font-mono">{kh.value}</span>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => onSelectUnitDeepDive(u.id)}
                    className="w-full px-3 py-2 rounded-lg bg-[#002B49] hover:bg-blue-900 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group"
                  >
                    <span>Buka Deep Dive</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-sky-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50/90 border-t-2 border-slate-200 font-bold text-slate-900 text-xs">
              <td className="py-3 px-4" colSpan={2}>
                <div className="flex items-center gap-2 font-extrabold uppercase text-[11px] text-slate-700">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <span>Total Agregat Deputi Bidang Kebijakan Strategis (4 Satker)</span>
                </div>
              </td>
              <td className="py-3 px-3 text-right font-mono font-black text-slate-900">
                Rp {(PERKIN_METADATA.totalAnggaran / 1e9).toFixed(2)} M
              </td>
              <td className="py-3 px-3 text-right font-mono font-black text-emerald-700">
                Rp {(PERKIN_METADATA.realisasiAnggaran / 1e9).toFixed(2)} M ({((PERKIN_METADATA.realisasiAnggaran / PERKIN_METADATA.totalAnggaran) * 100).toFixed(1)}%)
              </td>
              <td className="py-3 px-3 text-slate-600 text-[11px] font-mono">
                4/4 IKP Melampaui Target
              </td>
              <td className="py-3 px-3 text-center font-mono font-black text-indigo-700">
                64 Dataset
              </td>
              <td className="py-3 px-3 text-[11px] text-slate-500" colSpan={2}>
                Penyelenggaraan Terintegrasi Satu Data BP Batam
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
