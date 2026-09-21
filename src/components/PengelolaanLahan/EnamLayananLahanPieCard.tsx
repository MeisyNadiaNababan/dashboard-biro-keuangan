import React, { useState, useMemo } from 'react';
import {
  PieChart as PieChartIcon,
  Layers,
  MapPin,
  RefreshCw,
  ShieldCheck,
  FileText,
  Gavel,
  Award,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Info,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ENAM_LAYANAN_LAHAN_DATA } from './lahanData';
import { LayananPertanahanSummary } from './types';

interface EnamLayananLahanPieCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  MapPin,
  RefreshCw,
  ShieldCheck,
  FileText,
  Gavel,
  Award,
};

export const EnamLayananLahanPieCard: React.FC<EnamLayananLahanPieCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [selectedKode, setSelectedKode] = useState<string>('DPL-07'); // Default to Hak Tanggungan (largest volume)

  const totalPermohonan = useMemo(
    () => ENAM_LAYANAN_LAHAN_DATA.reduce((acc, item) => acc + item.jumlahPermohonan, 0),
    []
  );

  const activeLayanan = useMemo(
    () => ENAM_LAYANAN_LAHAN_DATA.find((item) => item.kodeTag === selectedKode) || ENAM_LAYANAN_LAHAN_DATA[0],
    [selectedKode]
  );

  const pieData = useMemo(() => {
    return ENAM_LAYANAN_LAHAN_DATA.map((item) => ({
      name: item.namaLayanan,
      value: item.jumlahPermohonan,
      kodeTag: item.kodeTag,
      color: item.color,
      noDataset: item.noDataset,
      disetujui: item.disetujui,
      ditolak: item.ditolak,
      rasio: item.rasioDisetujui,
    }));
  }, []);

  const ActiveIcon = ICON_MAP[activeLayanan.iconName] || FileText;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-3.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-700">
            <PieChartIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Proporsi 6 Layanan Pengelolaan Lahan
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Pie Chart Analitik
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Pengalokasian, Faktur Perubahan Peruntukan, Hak Tanggungan, Dokumen Pengganti, Lelang &amp; Rekomendasi
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenFormulaModal && onOpenFormulaModal('lahan_6_layanan')}
          className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
          title="Penjelasan Formula & Atribut 6 Layanan"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid: Left is Donut Chart, Right is Selected Service Card & Legend */}
      <div className="p-3.5 grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Donut Chart View (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50/70 border border-slate-200 rounded-xl p-3 relative">
          <div className="text-xs font-semibold text-slate-700 mb-1 text-center">
            Distribusi Volume 6 Layanan Lahan
          </div>
          <div className="h-[210px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  onClick={(entry: any) => {
                    if (entry && entry.kodeTag) setSelectedKode(entry.kodeTag);
                  }}
                  cursor="pointer"
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={`cell-${entry.kodeTag}`}
                      fill={entry.color}
                      stroke={entry.kodeTag === selectedKode ? '#0F172A' : '#FFFFFF'}
                      strokeWidth={entry.kodeTag === selectedKode ? 2 : 1}
                      className="transition-all hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    color: '#0F172A',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value: any, name: any) => [
                    `${value.toLocaleString('id-ID')} berkas (${((Number(value) / totalPermohonan) * 100).toFixed(1)}%)`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Centered Donut Stat */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-500 font-medium">Total Berkas</span>
              <span className="text-base font-black text-slate-900">{totalPermohonan.toLocaleString('id-ID')}</span>
              <span className="text-[10px] text-pink-700 font-semibold">6 Layanan</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-500 mt-1">
            Klik juring donat untuk melihat rincian permohonan
          </span>
        </div>

        {/* Detail Panel of Selected Service + Interactive Legend (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5">
          {/* Active Service Card */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3">
            <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: activeLayanan.color }}
                >
                  <ActiveIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-mono">
                      Dataset #{activeLayanan.noDataset}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 font-mono">
                      {activeLayanan.kodeTag}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5">{activeLayanan.namaLayanan}</h4>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Pangsa Layanan</span>
                <span className="text-sm font-black text-slate-900">
                  {((activeLayanan.jumlahPermohonan / totalPermohonan) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 mb-2.5">{activeLayanan.deskripsi}</p>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Total Masuk</span>
                <span className="text-sm font-bold text-slate-900">
                  {activeLayanan.jumlahPermohonan.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-emerald-700 block">Disetujui</span>
                <span className="text-sm font-bold text-emerald-700">
                  {activeLayanan.disetujui.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-rose-700 block">Ditolak</span>
                <span className="text-sm font-bold text-rose-700">
                  {activeLayanan.ditolak.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Legend Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {ENAM_LAYANAN_LAHAN_DATA.map((item) => {
              const isSelected = item.kodeTag === selectedKode;
              return (
                <button
                  key={item.kodeTag}
                  onClick={() => setSelectedKode(item.kodeTag)}
                  className={`p-2 rounded-lg text-left transition-all border text-xs cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-xs ring-1 ring-slate-900'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className={`text-[11px] font-semibold truncate ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                      {item.namaLayanan}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono text-slate-500">#{item.noDataset}</span>
                    <span className="font-bold text-slate-900">{item.jumlahPermohonan.toLocaleString('id-ID')}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Ketentuan Pelayanan:</strong> Hak Tanggungan (#7) menyumbang volume tertinggi perbankan, disusul Rekomendasi Pertanahan (#11) dan Faktur Perubahan Peruntukan (#6).
        </span>
        <span className="text-slate-600 font-medium">Satu Data Hal. 6-7 Item 6, 7, 8, 10, 11, 14</span>
      </div>
    </div>
  );
};
