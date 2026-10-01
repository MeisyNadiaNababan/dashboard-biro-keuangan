import React, { useState, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  RotateCcw,
  MapPin,
} from 'lucide-react';
import { OperatorFlightData, BandaraFilterState } from './types';
import { OPERATOR_FLIGHT_DATA } from './bandaraData';
import { BandaraVisualHeader } from './BandaraVisualHeader';

const DEFAULT_FILTERS: BandaraFilterState = {
  tahun: '2025',
  jenisPenerbangan: 'Semua',
  arahPergerakan: 'Semua',
  kategoriOperator: 'Semua',
  jenisPnbp: 'Semua',
  searchQuery: '',
};

interface OperatorFlightChartProps {
  filters?: BandaraFilterState;
  onOpenFormulaModal?: (key: string | number) => void;
  onOpenFormula?: () => void;
}

export const OperatorFlightChart: React.FC<OperatorFlightChartProps> = ({
  filters = DEFAULT_FILTERS,
  onOpenFormulaModal,
  onOpenFormula,
}) => {
  const [selectedOperator, setSelectedOperator] = useState<OperatorFlightData | null>(null);

  const activeFilters = filters || DEFAULT_FILTERS;

  // Filtered operators
  const filteredOperators = useMemo(() => {
    const f = activeFilters;
    return OPERATOR_FLIGHT_DATA.filter((op) => {
      if (f.kategoriOperator && f.kategoriOperator !== 'Semua' && op.kategori !== f.kategoriOperator) {
        return false;
      }
      if (f.jenisPenerbangan && f.jenisPenerbangan !== 'Semua') {
        if (f.jenisPenerbangan === 'Domestik' && !op.jenisPenerbangan.includes('DOMESTIK')) {
          return false;
        }
        if (f.jenisPenerbangan === 'Internasional' && !op.jenisPenerbangan.includes('INTERNASIONAL')) {
          return false;
        }
      }
      if (f.searchQuery && f.searchQuery.trim() !== '') {
        const query = f.searchQuery.toLowerCase();
        const matchName = op.namaMaskapai.toLowerCase().includes(query);
        const matchCode = op.kodeIata.toLowerCase().includes(query) || op.kodeIcao.toLowerCase().includes(query);
        const matchRoute = op.ruteUtama.some((r) => r.toLowerCase().includes(query));
        if (!matchName && !matchCode && !matchRoute) {
          return false;
        }
      }
      return true;
    });
  }, [activeFilters]);

  const totalFilteredFlights = filteredOperators.reduce((sum, item) => sum + item.jumlahPenerbangan, 0);

  // Palette warna maskapai penerbangan
  const COLORS = [
    '#0284c7', // Sky blue (Lion Air)
    '#059669', // Emerald (Citilink)
    '#d97706', // Amber (Super Air Jet)
    '#7c3aed', // Purple (Batik Air)
    '#0369a1', // Deep Navy (Garuda Indonesia)
    '#dc2626', // Red (Wings Air)
    '#0891b2', // Cyan (Pelita Air)
    '#475569', // Slate (Susi Air)
    '#334155', // Dark Slate (Cargo)
  ];

  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  // Custom White Tooltip (Bersih, Kontras Tinggi, Tanpa Tampilan Hitam Gelap)
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as OperatorFlightData;
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-lg text-xs font-sans max-w-[250px] z-50">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5 mb-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
              <span>{data.namaMaskapai}</span>
            </div>
            <span className="text-[10px] font-mono bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded font-bold border border-sky-200">
              {data.kodeIata}
            </span>
          </div>
          <div className="space-y-1 text-slate-600 text-[11px]">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Jumlah Penerbangan:</span>
              <span className="font-bold text-slate-900 font-mono">
                {formatNumber(data.jumlahPenerbangan)} Flights
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Pangsa Pasar:</span>
              <span className="font-bold text-sky-700 font-mono">
                {data.sharePersen}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Total Penumpang:</span>
              <span className="font-semibold text-slate-800 font-mono">
                {formatNumber(data.totalPenumpang)} Pax
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Armada Dominan:</span>
              <span className="font-medium text-slate-800 truncate max-w-[120px]" title={data.armadaDominan}>
                {data.armadaDominan}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Load Factor:</span>
              <span className="font-bold text-emerald-700 font-mono">
                {data.loadFactorPersen}% SLF
              </span>
            </div>
          </div>
          <div className="mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-sky-700 font-medium text-center">
            Klik untuk melihat detail lengkap
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="operator-flight-section" className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs font-sans">
      {/* Visual Header sesuai Standar Dashboard Pembangunan Infrastruktur */}
      <BandaraVisualHeader
        datasetNumber={10}
        pdfPages="Hal. 12"
        title="JUMLAH PENERBANGAN BERDASARKAN OPERATOR (MASKAPAI)"
        visualName="Sheet 1: Donut Chart Distribusi Pangsa Pasar (%) Operator Penerbangan"
        classification="TERBUKA"
        periode="PERTAHUN"
        attributes={[
          'OPERATOR (MASKAPAI)',
          'KODE IATA / ICAO',
          'JUMLAH PENERBANGAN',
          'PANGSA PASAR (%)',
          'PENUMPANG',
          'SEAT LOAD FACTOR',
        ]}
        onOpenFormula={onOpenFormula ? onOpenFormula : (onOpenFormulaModal ? () => onOpenFormulaModal('operator_share') : undefined)}
      />

      {/* METRIC SUMMARY STRIP (RINGKAS & MUDAH DIPAHAMI) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">Total Penerbangan</span>
          <div className="text-base sm:text-lg font-black text-slate-800 font-mono mt-0.5">
            {formatNumber(totalFilteredFlights)}
          </div>
          <span className="text-[10px] text-sky-600 font-medium">{filteredOperators.length} Maskapai Aktif</span>
        </div>

        <div className="bg-sky-50/50 rounded-xl p-3 border border-sky-100">
          <span className="text-[11px] text-sky-700 font-medium">Maskapai Terbesar</span>
          <div className="text-base sm:text-lg font-black text-sky-900 font-mono mt-0.5">
            Lion Air (32,48%)
          </div>
          <span className="text-[10px] text-sky-700 font-medium">12.450 Penerbangan/Thn</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">Armada Terbanyak</span>
          <div className="text-base sm:text-lg font-black text-slate-800 font-mono mt-0.5">
            B737-800 / A320
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">180 - 189 Kursi Penumpang</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">Rata-rata Load Factor</span>
          <div className="text-base sm:text-lg font-black text-emerald-700 font-mono mt-0.5">
            80,7% SLF
          </div>
          <span className="text-[10px] text-slate-500">Tingkat Keterisian Kursi</span>
        </div>
      </div>

      {/* PETUNJUK INTERAKSI JELAS UNTUK ATASAN */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
        <span className="flex items-center gap-1.5 text-[11px]">
          <span className="inline-block w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span>Tips: <strong>Klik nama maskapai atau irisan grafik</strong> untuk melihat profil rute dan performa detail.</span>
        </span>
        {selectedOperator && (
          <button
            onClick={() => setSelectedOperator(null)}
            className="text-[11px] text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1 cursor-pointer bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded-md transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Pilihan</span>
          </button>
        )}
      </div>

      {/* DONUT SHARE CHART (DENGAN WHITE TOOLTIP) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredOperators}
                dataKey="jumlahPenerbangan"
                nameKey="namaMaskapai"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                onClick={(entry: any) => {
                  const item = entry && (entry.payload || entry);
                  if (item && item.id) {
                    setSelectedOperator((prev) => (prev?.id === item.id ? null : item));
                  }
                }}
                className="cursor-pointer"
              >
                {filteredOperators.map((entry, index) => {
                  const isSelected = selectedOperator?.id === entry.id;
                  const isAnySelected = selectedOperator !== null;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      opacity={isAnySelected ? (isSelected ? 1 : 0.35) : 1}
                      stroke={isSelected ? '#0f172a' : 'none'}
                      strokeWidth={isSelected ? 2 : 0}
                    />
                  );
                })}
              </Pie>
              <Tooltip content={<CustomBarTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="md:col-span-6 space-y-1.5 max-h-64 overflow-y-auto pr-1 text-xs">
          {filteredOperators.map((op, idx) => {
            const isSelected = selectedOperator?.id === op.id;
            return (
              <div
                key={op.id}
                onClick={() => setSelectedOperator(isSelected ? null : op)}
                className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-50 border-sky-400 shadow-2xs'
                    : 'bg-slate-50 hover:bg-sky-50/50 border-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <div>
                    <span className="font-semibold text-slate-800">{op.namaMaskapai}</span>
                    <span className="text-[10px] text-slate-400 ml-1 font-mono">({op.kodeIata})</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900">{formatNumber(op.jumlahPenerbangan)}</span>
                  <span className="text-[11px] text-sky-700 font-semibold ml-1.5">({op.sharePersen}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KARTU DETAIL MASKAPAI TERPILIH */}
      {selectedOperator && (
        <div className="mt-4 p-4 bg-sky-50/70 border border-sky-200 rounded-xl shadow-xs animate-fadeIn text-xs">
          <div className="flex flex-wrap items-start justify-between gap-2 pb-2.5 border-b border-sky-200/80 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold font-mono text-sm shadow-2xs">
                {selectedOperator.kodeIata}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{selectedOperator.namaMaskapai}</h4>
                  <span className="px-2 py-0.5 bg-sky-100 text-sky-800 font-bold text-[10px] rounded-full">
                    Pangsa Pasar: {selectedOperator.sharePersen}%
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Kode ICAO: <strong className="font-mono text-slate-700">{selectedOperator.kodeIcao}</strong> • Kategori: <strong>{selectedOperator.kategori}</strong> ({selectedOperator.jenisPenerbangan})
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedOperator(null)}
              className="px-2.5 py-1 text-slate-500 hover:text-slate-800 hover:bg-sky-100 rounded-lg font-medium text-xs cursor-pointer transition-colors"
            >
              ✕ Tutup Detail
            </button>
          </div>

          {/* 4 STAT KUNCI MASKAPAI */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <div className="bg-white rounded-lg p-2.5 border border-sky-200/70">
              <div className="text-[10.5px] text-slate-500">Volume Penerbangan</div>
              <div className="text-sm font-bold text-sky-900 font-mono mt-0.5">
                {formatNumber(selectedOperator.jumlahPenerbangan)} Flights
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                ~{Math.round(selectedOperator.jumlahPenerbangan / 365)} penerbangan/hari
              </div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-sky-200/70">
              <div className="text-[10.5px] text-slate-500">Total Penumpang</div>
              <div className="text-sm font-bold text-emerald-800 font-mono mt-0.5">
                {formatNumber(selectedOperator.totalPenumpang)} Pax
              </div>
              <div className="text-[10px] text-emerald-600 mt-0.5">
                Keterisian SLF: {selectedOperator.loadFactorPersen}%
              </div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-sky-200/70">
              <div className="text-[10.5px] text-slate-500">Armada Dominan</div>
              <div className="text-sm font-bold text-slate-900 truncate mt-0.5" title={selectedOperator.armadaDominan}>
                {selectedOperator.armadaDominan}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Narrow Body Jet</div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-sky-200/70">
              <div className="text-[10.5px] text-slate-500">Legalitas Operasional</div>
              <div className="text-sm font-bold text-indigo-900 mt-0.5">AOC 121 Niaga</div>
              <div className="text-[10px] text-indigo-600 mt-0.5">Izin Rute Berjadwal</div>
            </div>
          </div>

          {/* RUTE UTAMA YANG DILAYANI */}
          <div className="bg-white rounded-lg p-2.5 border border-sky-200/70 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong className="text-slate-800">Rute Utama Terhubung:</strong>{' '}
              <span className="text-slate-600">
                {selectedOperator.ruteUtama.join(' • ')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
