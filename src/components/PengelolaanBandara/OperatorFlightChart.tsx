import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { Plane, Award, BarChart3, PieChart as PieIcon, Info, Users, CheckCircle2, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { OperatorFlightData, BandaraFilterState } from './types';
import { OPERATOR_FLIGHT_DATA } from './bandaraData';

interface OperatorFlightChartProps {
  filters: BandaraFilterState;
  onOpenFormulaModal?: (key: string | number) => void;
}

export const OperatorFlightChart: React.FC<OperatorFlightChartProps> = ({ filters, onOpenFormulaModal }) => {
  const [viewMode, setViewMode] = useState<'bar' | 'donut' | 'cards'>('bar');
  const [selectedOperator, setSelectedOperator] = useState<OperatorFlightData | null>(null);

  // Filtered operators
  const filteredOperators = useMemo(() => {
    return OPERATOR_FLIGHT_DATA.filter((op) => {
      // Filter Kategori
      if (filters.kategoriOperator !== 'Semua' && op.kategori !== filters.kategoriOperator) {
        return false;
      }
      // Filter Jenis Penerbangan
      if (filters.jenisPenerbangan !== 'Semua') {
        if (filters.jenisPenerbangan === 'Domestik' && !op.jenisPenerbangan.includes('DOMESTIK')) {
          return false;
        }
        if (filters.jenisPenerbangan === 'Internasional' && !op.jenisPenerbangan.includes('INTERNASIONAL')) {
          return false;
        }
      }
      // Filter Search
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchName = op.namaMaskapai.toLowerCase().includes(query);
        const matchCode = op.kodeIata.toLowerCase().includes(query) || op.kodeIcao.toLowerCase().includes(query);
        const matchRoute = op.ruteUtama.some((r) => r.toLowerCase().includes(query));
        if (!matchName && !matchCode && !matchRoute) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  const totalFilteredFlights = filteredOperators.reduce((sum, item) => sum + item.jumlahPenerbangan, 0);
  const maxFlightCount = Math.max(...filteredOperators.map((o) => o.jumlahPenerbangan), 1);

  // Palette warna elegan maskapai penerbangan
  const COLORS = [
    '#0284c7', // Sky blue (Lion)
    '#059669', // Emerald (Citilink)
    '#f59e0b', // Amber (Super Air Jet)
    '#8b5cf6', // Purple (Batik)
    '#0369a1', // Deep Navy (Garuda)
    '#ef4444', // Red (AirAsia / Wings)
    '#06b6d4', // Cyan (Pelita)
    '#64748b', // Slate (Susi Air)
    '#475569', // Cargo
  ];

  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  return (
    <div id="operator-flight-section" className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-5 bg-sky-600 rounded-full inline-block" />
            <h3 className="text-sm font-bold text-slate-900">
              Jumlah Penerbangan Berdasarkan Operator (Maskapai)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Dataset Satu Data No. 10 (PDF Hal. 12): Pergerakan Pesawat Udara &amp; Legalitas SIUP Maskapai
          </p>
        </div>

        {/* View mode toggle (Sheet Swap) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('bar')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'bar'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Ranking Bar</span>
          </button>
          <button
            onClick={() => setViewMode('donut')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'donut'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Pangsa Pasar (%)</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Matrix Armada &amp; SIUP</span>
          </button>
          {onOpenFormulaModal && (
            <button
              onClick={() => onOpenFormulaModal('operator_share')}
              className="p-1 text-slate-400 hover:text-sky-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
              title="Lihat Formula Operator & Pangsa Pasar di Tableau"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* METRIC SUMMARY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">Total Pergerakan Maskapai</span>
          <div className="text-lg font-black text-slate-800">{formatNumber(totalFilteredFlights)} Flights</div>
          <span className="text-[10px] text-sky-600 font-medium">{filteredOperators.length} Operator Terdaftar</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">Operator Terbesar</span>
          <div className="text-lg font-black text-sky-700">Lion Air (32,48%)</div>
          <span className="text-[10px] text-slate-500">12.450 Pergerakan/Tahun</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">Tipe Armada Terbanyak</span>
          <div className="text-lg font-black text-slate-800">B737-800 / A320</div>
          <span className="text-[10px] text-emerald-600 font-medium">Kapasitas 180-189 Seats</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">Rata-rata Load Factor</span>
          <div className="text-lg font-black text-emerald-700">80,7% SLF</div>
          <span className="text-[10px] text-slate-500">Keterisian Penumpang</span>
        </div>
      </div>

      {/* VIEW 1: HORIZONTAL RANKING BAR CHART (TABLEAU-STYLE) */}
      {viewMode === 'bar' && (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={filteredOperators}
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis
                type="number"
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickFormatter={(val) => `${val / 1000}k`}
              />
              <YAxis
                dataKey="namaMaskapai"
                type="category"
                tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
                width={75}
              />
              <Tooltip
                formatter={(value: any, name: any, item: any) => [
                  `${formatNumber(Number(value))} Flights (${item.payload.sharePersen}%)`,
                  'Jumlah Penerbangan',
                ]}
                contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
              />
              <Bar dataKey="jumlahPenerbangan" radius={[0, 6, 6, 0]}>
                {filteredOperators.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* VIEW 2: DONUT SHARE CHART */}
      {viewMode === 'donut' && (
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
                >
                  {filteredOperators.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${formatNumber(Number(val))} flights`, 'Penerbangan']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="md:col-span-6 space-y-1.5 max-h-64 overflow-y-auto pr-1 text-xs">
            {filteredOperators.map((op, idx) => (
              <div
                key={op.id}
                className="flex items-center justify-between p-2 bg-slate-50 hover:bg-sky-50 rounded-lg border border-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <div>
                    <span className="font-semibold text-slate-800">{op.namaMaskapai}</span>
                    <span className="text-[10px] text-slate-400 ml-1">({op.kodeIata})</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900">{formatNumber(op.jumlahPenerbangan)}</span>
                  <span className="text-[11px] text-sky-700 font-semibold ml-1.5">({op.sharePersen}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: TABLEAU-STYLE VISUAL CROSSTAB (MATRIX ARMADA & SIUP) */}
      {viewMode === 'cards' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <span>Visual Crosstab Tableau: Tabel Data dengan In-Cell Micro Bar &amp; Status Izin Terbang.</span>
            <span className="text-[11px] text-sky-700 font-medium">Klik baris untuk info rute</span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Maskapai / Operator</th>
                    <th className="py-2.5 px-3">SIUP / Kategori</th>
                    <th className="py-2.5 px-3">Armada Dominan</th>
                    <th className="py-2.5 px-3 w-48">Volume Penerbangan</th>
                    <th className="py-2.5 px-3 text-right">Penumpang (Pax)</th>
                    <th className="py-2.5 px-3 text-center">Load Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredOperators.map((op, idx) => {
                    const barPercent = Math.round((op.jumlahPenerbangan / maxFlightCount) * 100);
                    return (
                      <tr
                        key={op.id}
                        onClick={() => setSelectedOperator(op)}
                        className={`hover:bg-sky-50/60 cursor-pointer transition-colors ${
                          selectedOperator?.id === op.id ? 'bg-sky-50/90' : ''
                        }`}
                      >
                        {/* MASKAPAI */}
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                            />
                            <div>
                              <div className="font-bold text-slate-900">{op.namaMaskapai}</div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                IATA: {op.kodeIata} | ICAO: {op.kodeIcao}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* SIUP */}
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 bg-sky-50 text-sky-800 border border-sky-200 rounded font-semibold text-[10px] whitespace-nowrap">
                            AOC 121 Niaga
                          </span>
                          <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[130px] font-mono">
                            SIUP/AU-0{idx + 1}/BPB
                          </div>
                        </td>

                        {/* ARMADA */}
                        <td className="py-2.5 px-3">
                          <span className="font-medium text-slate-800">{op.armadaDominan}</span>
                          <div className="text-[10px] text-slate-400">{op.jenisPenerbangan.join(', ')}</div>
                        </td>

                        {/* IN-CELL HORIZONTAL MICRO BAR (TABLEAU STYLE) */}
                        <td className="py-2.5 px-3">
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-bold text-slate-900">{formatNumber(op.jumlahPenerbangan)}</span>
                            <span className="text-[10px] text-sky-700 font-semibold">{op.sharePersen}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${barPercent}%`,
                                backgroundColor: COLORS[idx % COLORS.length],
                              }}
                            />
                          </div>
                        </td>

                        {/* PENUMPANG */}
                        <td className="py-2.5 px-3 text-right">
                          <span className="font-bold text-slate-800">{formatNumber(op.totalPenumpang)}</span>
                          <div className="text-[10px] text-slate-400">pax/thn</div>
                        </td>

                        {/* LOAD FACTOR */}
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                              op.loadFactorPersen >= 80
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {op.loadFactorPersen}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL/STRIP IF OPERATOR IS CLICKED */}
      {selectedOperator && (
        <div className="mt-4 p-3 bg-sky-50 border border-sky-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-700" />
            <div>
              <span className="font-bold text-sky-950">{selectedOperator.namaMaskapai}</span>
              <span className="text-slate-600 ml-2">
                — {formatNumber(selectedOperator.jumlahPenerbangan)} penerbangan ({selectedOperator.sharePersen}%) | Armada: {selectedOperator.armadaDominan}
              </span>
              <span className="text-slate-500 ml-2">
                | Rute: {selectedOperator.ruteUtama.join(', ')}
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedOperator(null)}
            className="text-[11px] text-sky-700 hover:text-sky-900 font-semibold cursor-pointer underline"
          >
            Tutup
          </button>
        </div>
      )}
    </div>
  );
};
