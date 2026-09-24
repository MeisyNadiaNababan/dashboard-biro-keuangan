import React from 'react';
import { Award, Users, UserCheck, TrendingUp, HelpCircle, CheckCircle2 } from 'lucide-react';
import { SdmYearData } from './types';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface SdmKpiCardsProps {
  data: SdmYearData;
  onOpenFormulaModal: (formulaType: string) => void;
}

export const SdmKpiCards: React.FC<SdmKpiCardsProps> = ({ data, onOpenFormulaModal }) => {
  const { sistemMerit, gender, totalPegawai } = data;
  const meritRow = sistemMerit.datasetRow;

  return (
    <div className="space-y-3">
      {/* 3 TOP EXECUTIVE KPIS + TOTAL PEGAWAI ANCHOR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* KPI 1: INDEKS SISTEM MERIT */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600" />
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span>Indeks Sistem Merit</span>
              </div>
              <button
                onClick={() => onOpenFormulaModal('merit')}
                className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                title="Lihat rumus agregasi 8 aspek sistem merit"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 tracking-tight tabular-nums">
                {meritRow.TOTAL_NILAI_MERIT.toFixed(1)}
              </span>
              <span className="text-xs font-medium text-slate-500 font-mono">/ 400.0</span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-emerald-700 font-mono tabular-nums">
                Indeks: {meritRow.INDEKS_SISTEM_MERIT.toFixed(4)}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {meritRow.STATUS_PEMENUHAN}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate">Standar KASN: Kategori IV (325 – 400 · Mutu 0.81 – 1)</span>
            <span className="font-mono text-emerald-600 font-bold">Tercapai</span>
          </div>
        </div>

        {/* KPI 2: JUMLAH PEGAWAI PEREMPUAN */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs hover:border-pink-300 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500" />
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <div className="w-6 h-6 rounded-md bg-pink-50 text-pink-600 flex items-center justify-center">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <span>Pegawai Perempuan</span>
              </div>
              <span className="text-xs font-bold text-pink-600 font-mono tabular-nums">
                {gender.perempuan.persentase.toFixed(1)}%
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 tracking-tight tabular-nums">
                {gender.perempuan.jumlah.toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-slate-500 font-medium">Orang</span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <span>Rata-rata usia: {gender.perempuan.rataRataUsia} th</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Dataset #7 Terbuka</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Proporsi Gender ASN</span>
            <span className="font-mono font-medium text-slate-700 tabular-nums">
              {gender.perempuan.jumlah} / {totalPegawai}
            </span>
          </div>
        </div>

        {/* KPI 3: JUMLAH PEGAWAI LAKI-LAKI */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span>Pegawai Laki-Laki</span>
              </div>
              <span className="text-xs font-bold text-blue-600 font-mono tabular-nums">
                {gender.lakiLaki.persentase.toFixed(1)}%
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 tracking-tight tabular-nums">
                {gender.lakiLaki.jumlah.toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-slate-500 font-medium">Orang</span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <span>Rata-rata usia: {gender.lakiLaki.rataRataUsia} th</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Dataset #7 Terbuka</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Proporsi Gender ASN</span>
            <span className="font-mono font-medium text-slate-700 tabular-nums">
              {gender.lakiLaki.jumlah} / {totalPegawai}
            </span>
          </div>
        </div>

        {/* KPI 4: TOTAL PEGAWAI BP BATAM & STRUKTUR TAHUN */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs hover:border-slate-400 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-600 to-slate-800" />
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span>Total SDM BP Batam</span>
              </div>
              <span className="text-xs text-slate-500 font-mono font-medium">Tahun {data.tahun}</span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 tracking-tight tabular-nums">
                {totalPegawai.toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-slate-500 font-medium">Pegawai</span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <span>PNS: 35.0%</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Non-PNS/PPPK: 65.0%</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Rasio L/P: 1.52 : 1</span>
            <span className="text-indigo-600 font-medium font-mono">100% Tercatat</span>
          </div>
        </div>
      </div>

      {/* TABLEAU SHELVES SPECIFICATION FOR KPIS */}
      <TableauShelvesBadge
        showMe="KPI Banner / Text Scorecards"
        columns="[Jenis Kelamin], [Komponen Penilaian Sistem Merit]"
        rows="SUM([Jumlah Pegawai]), AGG([Indeks Sistem Merit])"
        color="[Jenis Kelamin] / [Predikat Sistem Merit]"
        detail="[Tahun], [Status Pegawai], [Bobot Aspek]"
        text="SUM([Jumlah]) & AVG([Nilai Aspek])"
        calculatedField="[Indeks Sistem Merit] = SUM([Nilai Aspek]) / 400.0"
        compact={true}
      />
    </div>
  );
};
