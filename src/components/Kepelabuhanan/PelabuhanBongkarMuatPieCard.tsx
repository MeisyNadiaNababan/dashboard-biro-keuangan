import React, { useState } from 'react';
import {
  PieChart as PieChartIcon,
  Box,
  Droplets,
  Layers,
  TrendingUp,
  Clock,
  CheckCircle2,
  BarChart3,
  HelpCircle,
} from 'lucide-react';
import {
  PELAYANAN_BONGKAR_MUAT_PIE_DATA,
  TOTAL_BONGKAR_MUAT_TAHUN,
} from '../../data/kepelabuhananData';
import { PelabuhanVisualHeader } from './PelabuhanVisualHeader';

interface PelabuhanBongkarMuatPieCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const PelabuhanBongkarMuatPieCard: React.FC<PelabuhanBongkarMuatPieCardProps> = ({
  onOpenFormulaModal,
}) => {
  // Active Terminal View: 'peti-kemas' | 'curah' | 'kargo-umum' | 'semua'
  const [activeTerminal, setActiveTerminal] = useState<'peti-kemas' | 'curah' | 'kargo-umum' | 'semua'>('peti-kemas');

  const { petiKemas, curahCair, generalCargo } = PELAYANAN_BONGKAR_MUAT_PIE_DATA;

  // Helper to render an SVG donut / pie chart
  const renderSvgPie = (
    data: { name: string; value: number; persen: number; color: string }[],
    totalLabel: string,
    satuan: string
  ) => {
    // Total calculation
    const totalVal = data.reduce((acc, d) => acc + d.value, 0);

    // Calculate angles
    let cumulativeAngle = 0;
    const slices = data.map((item) => {
      const startAngle = cumulativeAngle;
      const angle = (item.value / totalVal) * 360;
      cumulativeAngle += angle;
      return {
        ...item,
        startAngle,
        endAngle: cumulativeAngle,
      };
    });

    const getCoordinatesForPercent = (angleInDegrees: number, radius: number) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: 100 + radius * Math.cos(angleInRadians),
        y: 100 + radius * Math.sin(angleInRadians),
      };
    };

    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-2">
        {/* SVG Donut Chart */}
        <div className="relative w-44 h-44 shrink-0">
          <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-0">
            {slices.map((slice, i) => {
              const start = getCoordinatesForPercent(slice.startAngle, 80);
              const end = getCoordinatesForPercent(slice.endAngle, 80);
              const largeArcFlag = slice.endAngle - slice.startAngle > 180 ? 1 : 0;

              const pathData = [
                `M 100 100`,
                `L ${start.x} ${start.y}`,
                `A 80 80 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
                `Z`,
              ].join(' ');

              return (
                <path
                  key={i}
                  d={pathData}
                  fill={slice.color}
                  className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                />
              );
            })}
            {/* Donut Hole */}
            <circle cx="100" cy="100" r="52" fill="white" />
          </svg>

          {/* Centered Total Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Total
            </span>
            <span className="text-sm font-black text-slate-900 font-mono leading-tight">
              {totalLabel}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 font-mono">
              {satuan}
            </span>
          </div>
        </div>

        {/* Legend & Numbers */}
        <div className="space-y-3 w-full max-w-xs">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/60 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <span className="font-bold text-xs text-slate-800 block">
                    {item.name}
                  </span>
                  <span className="text-[10.5px] text-slate-500 font-mono">
                    {item.value.toLocaleString('id-ID')} {satuan}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-black font-mono" style={{ color: item.color }}>
                  {item.persen}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs font-sans">
      {/* 1. STANDARDIZED VISUAL HEADER (REQ 9) */}
      <PelabuhanVisualHeader
        datasetNumber={23}
        pdfPages="Hal. 17 (No. 23 & 24)"
        title="Pelayanan Bongkar Muat Terminal Peti Kemas Batu Ampar & Terminal Curah"
        visualName="Bagan Lingkar Donat & Pie Chart (Donut & Pie Chart Perbandingan Bongkar vs Muat)"
        classification="TERBUKA"
        attributes={[
          'VOLUME BONGKAR KEMAS BATU AMPAR (TEUS)',
          'VOLUME MUAT PETI KEMAS BATU AMPAR (TEUS)',
          'VOLUME BONGKAR CURAH CAIR (TON)',
          'VOLUME MUAT CURAH CAIR (TON)',
          'TAHUN',
        ]}
        rightControls={
          /* TERMINAL SELECTOR TABS */
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveTerminal('peti-kemas')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTerminal === 'peti-kemas'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Peti Kemas</span>
            </button>
            <button
              onClick={() => setActiveTerminal('curah')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTerminal === 'curah'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Curah Cair</span>
            </button>
            <button
              onClick={() => setActiveTerminal('kargo-umum')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTerminal === 'kargo-umum'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Kargo</span>
            </button>
            <button
              onClick={() => setActiveTerminal('semua')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTerminal === 'semua'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PieChartIcon className="w-3.5 h-3.5" />
              <span>Multi-Pie</span>
            </button>
          </div>
        }
        onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('kpi-bongkar-muat')}
      />

      {/* 2. OPERATIONAL SUMMARY KPI STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Throughput Peti Kemas (YTD)
          </span>
          <span className="text-base sm:text-lg font-black text-sky-800 font-mono">
            {TOTAL_BONGKAR_MUAT_TAHUN.totalTeusYtd.toLocaleString('id-ID')} TEUs
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Throughput Curah Cair (YTD)
          </span>
          <span className="text-base sm:text-lg font-black text-amber-700 font-mono">
            {(TOTAL_BONGKAR_MUAT_TAHUN.curahCairTonYtd / 1e6).toFixed(2)} Juta Ton
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Throughput General Cargo
          </span>
          <span className="text-base sm:text-lg font-black text-emerald-700 font-mono">
            {(TOTAL_BONGKAR_MUAT_TAHUN.generalCargoTonYtd / 1e6).toFixed(2)} Juta Ton
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
            Dwell Time Pelabuhan
          </span>
          <span className="text-base sm:text-lg font-black text-indigo-700 font-mono flex items-center gap-1">
            <Clock className="w-4 h-4 text-indigo-600" />
            {TOTAL_BONGKAR_MUAT_TAHUN.dwellTimeHari} Hari
          </span>
        </div>
      </div>

      {/* 3. VISUAL DISPLAY */}
      {activeTerminal === 'peti-kemas' && (
        <div className="p-3 border border-slate-200/90 rounded-xl bg-white">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                DATASET NO. 23 (Hal. 17)
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                Komposisi Bongkar vs Muat Peti Kemas Terminal Batu Ampar (TEUs)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2 py-1 rounded border border-sky-200">
              Total 210.000 TEUs
            </span>
          </div>

          {renderSvgPie(petiKemas.pieData, '210.000', 'TEUs')}
        </div>
      )}

      {activeTerminal === 'curah' && (
        <div className="p-3 border border-slate-200/90 rounded-xl bg-white">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
                DATASET NO. 24 (Hal. 17)
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                Komposisi Bongkar vs Muat Terminal Curah Cair (Ton)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
              Total 1.607.000 Ton
            </span>
          </div>

          {renderSvgPie(curahCair.pieData, '1.607.000', 'Ton')}
        </div>
      )}

      {activeTerminal === 'kargo-umum' && (
        <div className="p-3 border border-slate-200/90 rounded-xl bg-white">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                DATASET NO. 22 (Hal. 17)
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                Komposisi Bongkar vs Muat General Cargo Batu Ampar (Ton)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
              Total 1.003.000 Ton
            </span>
          </div>

          {renderSvgPie(generalCargo.pieData, '1.003.000', 'Ton')}
        </div>
      )}

      {activeTerminal === 'semua' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: Peti Kemas */}
          <div className="p-3 rounded-lg border border-sky-200 bg-sky-50/20">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono block w-max mb-1">
              Dataset #23: Peti Kemas
            </span>
            <span className="font-bold text-xs text-slate-900 block mb-2">
              Terminal Peti Kemas (TEUs)
            </span>
            {renderSvgPie(petiKemas.pieData, '210.000', 'TEUs')}
          </div>

          {/* Card 2: Curah */}
          <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/20">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono block w-max mb-1">
              Dataset #24: Curah Cair
            </span>
            <span className="font-bold text-xs text-slate-900 block mb-2">
              Terminal Curah (Ton)
            </span>
            {renderSvgPie(curahCair.pieData, '1.607.000', 'Ton')}
          </div>

          {/* Card 3: General Cargo */}
          <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/20">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono block w-max mb-1">
              Dataset #22: General Cargo
            </span>
            <span className="font-bold text-xs text-slate-900 block mb-2">
              General Cargo (Ton)
            </span>
            {renderSvgPie(generalCargo.pieData, '1.003.000', 'Ton')}
          </div>
        </div>
      )}
    </div>
  );
};
