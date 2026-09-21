import React, { useState } from 'react';
import {
  Activity,
  BedDouble,
  Clock,
  RotateCw,
  Percent,
  HeartCrack,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  TrendingUp,
  BarChart2,
  Layers,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { RS_INDIKATOR_EFISIENSI, RsIndikatorEfisiensi } from '../../data/rumahSakitData';

interface RumahSakitEfisiensiCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const RumahSakitEfisiensiCard: React.FC<RumahSakitEfisiensiCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeTab, setActiveTab] = useState<'indikator' | 'grafik' | 'tabel'>('indikator');
  const [selectedIndikator, setSelectedIndikator] = useState<RsIndikatorEfisiensi>(
    RS_INDIKATOR_EFISIENSI[0]
  );

  // Normalized chart data for comparison against Kemenkes midpoint
  const chartData = [
    { name: 'BOR (%)', nilai: 74.2, target: 75, min: 60, max: 85, satuan: '%' },
    { name: 'ALOS (Hari)', nilai: 4.2, target: 4.0, min: 3, max: 5, satuan: 'Hari' },
    { name: 'TOI (Hari)', nilai: 1.5, target: 2.0, min: 1, max: 3, satuan: 'Hari' },
    { name: 'BTO (Kali/Thn)', nilai: 48.6, target: 45, min: 40, max: 50, satuan: 'Kali' },
    { name: 'NDR (‰)', nilai: 14.8, target: 20, min: 0, max: 25, satuan: '‰' },
    { name: 'GDR (‰)', nilai: 28.5, target: 35, min: 0, max: 45, satuan: '‰' },
  ];

  return (
    <div
      id="card-rsbp-indikator-efisiensi"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 font-sans flex flex-col justify-between"
    >
      {/* 1. Header with Title & Tab Switcher (Matching Kunjungan Pasien Card Style) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Dataset #9
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                  Terbuka • Per Bulan
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                Nilai Indikator Efisiensi Rumah Sakit (Grafik Barber Johnson)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-center">
            {/* View Switcher Matching Kunjungan Pasien */}
            <div className="bg-slate-100 p-0.5 rounded-lg flex items-center text-xs">
              <button
                onClick={() => setActiveTab('indikator')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTab === 'indikator'
                    ? 'bg-white text-emerald-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                6 Indikator
              </button>
              <button
                onClick={() => setActiveTab('grafik')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTab === 'grafik'
                    ? 'bg-white text-sky-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Grafik Visual
              </button>
              <button
                onClick={() => setActiveTab('tabel')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTab === 'tabel'
                    ? 'bg-white text-purple-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tabel Standar
              </button>
            </div>

            <button
              onClick={() => onOpenFormulaModal && onOpenFormulaModal('rsbp_efisiensi_bor')}
              className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
              title="Lihat Formula & Kamus Satu Data"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Top Metric Banner (Matching Kunjungan Pasien Style) */}
        <div className="my-2.5 p-2.5 bg-gradient-to-r from-emerald-50 via-slate-50 to-teal-50 rounded-lg border border-emerald-100/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
              Utilisasi Tempat Tidur (BOR Aktual)
            </span>
            <div className="text-xl font-black text-emerald-800 leading-tight">
              74.2% <span className="text-xs font-semibold text-slate-500">(212 Tempat Tidur Aktif)</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-semibold block">
              Standar Kemenkes RI (60% - 85%)
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
              Kategori: Prima / Efisien
            </span>
          </div>
        </div>

        {/* 3. TAB 1: 6 INDIKATOR LIST + DRILLDOWN BOX */}
        {activeTab === 'indikator' && (
          <div>
            <div className="text-[11px] text-slate-500 font-medium mb-2 flex items-center justify-between">
              <span>Pilih Indikator untuk Rincian Formula &amp; Definisi:</span>
              <span className="text-emerald-700 font-semibold">Atribut: Nilai Aktual &amp; Standar Ideal</span>
            </div>

            {/* List of 6 indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2.5">
              {RS_INDIKATOR_EFISIENSI.map((item) => {
                const isSelected = selectedIndikator.kode === item.kode;
                return (
                  <div
                    key={item.kode}
                    onClick={() => setSelectedIndikator(item)}
                    className={`p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-200/60 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-slate-700 bg-white px-1.5 py-0.2 rounded border border-slate-200 text-[10px]">
                        {item.kode}
                      </span>
                      <span className="text-[9px] font-bold text-emerald-700 flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Ideal
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                      {item.nilai}{' '}
                      <span className="text-[10px] font-normal text-slate-500">{item.satuan}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.indikator}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Drilldown Box for Selected Indicator */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 mb-2">
                <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  Rincian Parameter: {selectedIndikator.indikator}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Standar: {selectedIndikator.standarIdealKemenkes}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mb-2">
                {selectedIndikator.definisi}
              </p>
              <div className="bg-white border border-slate-200 rounded p-2 text-[10.5px]">
                <div className="text-slate-400 uppercase font-semibold text-[9.5px]">Rumus Perhitungan:</div>
                <div className="font-mono text-emerald-800 font-bold mt-0.5">
                  {selectedIndikator.rumusTeks}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GRAFIK VISUAL (RECHARTS BAR CHART) */}
        {activeTab === 'grafik' && (
          <div className="space-y-2">
            <div className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Perbandingan Realisasi Nilai Indikator Terhadap Standar:</span>
              <span className="text-sky-700 font-semibold font-mono text-[10.5px]">Grafik Batang Horisontal</span>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tick={{ fill: '#64748B', fontSize: 10 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: '#1E293B', fontSize: 10, fontWeight: 600 }}
                    width={75}
                  />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${val} ${item.payload.satuan} (Standar: ${item.payload.min} - ${item.payload.max} ${item.payload.satuan})`,
                      'Nilai Realisasi',
                    ]}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Bar dataKey="nilai" fill="#059669" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? '#059669' : index === 1 ? '#0284C7' : '#0D9488'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[10px] text-slate-500 flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-200">
              <span>Seluruh parameter memenuhi daerah efisiensi Barber Johnson Kemenkes RI.</span>
              <span className="font-bold text-emerald-700">Status 100% Memenuhi</span>
            </div>
          </div>
        )}

        {/* TAB 3: TABEL STANDAR LENGKAP */}
        {activeTab === 'tabel' && (
          <div className="border border-slate-200 rounded-lg overflow-hidden max-h-[220px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold text-[10.5px] uppercase">
                <tr>
                  <th className="py-2 px-2.5">Kode</th>
                  <th className="py-2 px-2.5">Indikator</th>
                  <th className="py-2 px-2.5 text-right">Nilai Aktual</th>
                  <th className="py-2 px-2.5 text-center">Standar Ideal</th>
                  <th className="py-2 px-2.5 text-center">Evaluasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {RS_INDIKATOR_EFISIENSI.map((item) => (
                  <tr key={item.kode} className="hover:bg-slate-50">
                    <td className="py-2 px-2.5 font-mono font-bold text-slate-700">{item.kode}</td>
                    <td className="py-2 px-2.5 font-medium text-slate-800">{item.indikator}</td>
                    <td className="py-2 px-2.5 text-right font-mono font-black text-emerald-800">
                      {item.nilai} {item.satuan}
                    </td>
                    <td className="py-2 px-2.5 text-center font-mono text-slate-600 text-[11px]">
                      {item.standarIdealKemenkes}
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.statusKinerja}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Footer Matching Kunjungan Layanan Card */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Evaluasi Manajemen Mutu Pelayanan Rawat Inap RSBP</span>
        <span className="font-mono text-[10px] text-slate-400">DS 9 Satu Data</span>
      </div>
    </div>
  );
};
