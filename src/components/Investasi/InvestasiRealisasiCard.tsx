import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  BarChart3,
  Table as TableIcon,
  Download,
  Filter,
  DollarSign,
  Briefcase,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';
import {
  REALISASI_INVESTASI_DATA,
  RealisasiInvestasiItem,
} from '../../data/investasiData';
import { InvestasiVisualHeader } from './InvestasiVisualHeader';

interface InvestasiRealisasiCardProps {
  onOpenFormulaModal: (formulaId: string) => void;
  filterTahun?: number | 'ALL';
  filterJenis?: 'ALL' | 'PMA' | 'PMDN';
  filterSektor?: string;
}

export const InvestasiRealisasiCard: React.FC<InvestasiRealisasiCardProps> = ({
  onOpenFormulaModal,
  filterTahun = 'ALL',
  filterJenis = 'ALL',
  filterSektor = 'ALL',
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [chartGrouping, setChartGrouping] = useState<'triwulan' | 'sektor'>('triwulan');

  // Format Rupiah
  const formatTriliun = (val: number): string => {
    return `Rp ${(val / 1e12).toLocaleString('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} T`;
  };

  const formatMiliar = (val: number): string => {
    return `Rp ${(val / 1e9).toLocaleString('id-ID', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} M`;
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    return REALISASI_INVESTASI_DATA.filter((item) => {
      const matchTahun = filterTahun === 'ALL' || item.tahun === Number(filterTahun);
      const matchJenis = filterJenis === 'ALL' || item.jenis === filterJenis;
      const matchSektor = filterSektor === 'ALL' || item.sektor === filterSektor;
      return matchTahun && matchJenis && matchSektor;
    });
  }, [filterTahun, filterJenis, filterSektor]);

  // Aggregated totals
  const totalRealisasi = useMemo(
    () => filteredData.reduce((acc, curr) => acc + curr.realisasiInvestasi, 0),
    [filteredData]
  );
  const totalTarget = useMemo(
    () => filteredData.reduce((acc, curr) => acc + curr.targetInvestasi, 0),
    [filteredData]
  );
  const capaianPersen = totalTarget > 0 ? (totalRealisasi / totalTarget) * 100 : 0;

  const totalPma = useMemo(
    () =>
      filteredData
        .filter((d) => d.jenis === 'PMA')
        .reduce((acc, curr) => acc + curr.realisasiInvestasi, 0),
    [filteredData]
  );

  const totalPmdn = useMemo(
    () =>
      filteredData
        .filter((d) => d.jenis === 'PMDN')
        .reduce((acc, curr) => acc + curr.realisasiInvestasi, 0),
    [filteredData]
  );

  // Grouped Bar Data for Triwulan
  const triwulanChartData = useMemo(() => {
    const quarters = [1, 2, 3, 4];
    return quarters.map((q) => {
      const qItems = filteredData.filter((d) => d.triwulan === q);
      const pma = qItems
        .filter((d) => d.jenis === 'PMA')
        .reduce((sum, d) => sum + d.realisasiInvestasi, 0);
      const pmdn = qItems
        .filter((d) => d.jenis === 'PMDN')
        .reduce((sum, d) => sum + d.realisasiInvestasi, 0);
      const target = qItems.reduce((sum, d) => sum + d.targetInvestasi, 0);
      const total = pma + pmdn;

      return {
        label: `Triwulan ${q}`,
        shortLabel: `Q${q}`,
        pmaT: pma / 1e12,
        pmdnT: pmdn / 1e12,
        totalT: total / 1e12,
        targetT: target / 1e12,
        capaianPct: target > 0 ? ((total / target) * 100).toFixed(1) : '0',
      };
    });
  }, [filteredData]);

  // Grouped Bar Data for Sektor
  const sektorChartData = useMemo(() => {
    const sektorMap: Record<string, { target: number; realisasi: number; pma: number; pmdn: number }> = {};
    filteredData.forEach((d) => {
      if (!sektorMap[d.sektor]) {
        sektorMap[d.sektor] = { target: 0, realisasi: 0, pma: 0, pmdn: 0 };
      }
      sektorMap[d.sektor].target += d.targetInvestasi;
      sektorMap[d.sektor].realisasi += d.realisasiInvestasi;
      if (d.jenis === 'PMA') sektorMap[d.sektor].pma += d.realisasiInvestasi;
      else sektorMap[d.sektor].pmdn += d.realisasiInvestasi;
    });

    return Object.entries(sektorMap)
      .map(([sektor, val]) => ({
        sektor: sektor.length > 25 ? `${sektor.substring(0, 23)}...` : sektor,
        fullName: sektor,
        targetT: val.target / 1e12,
        realisasiT: val.realisasi / 1e12,
        pmaT: val.pma / 1e12,
        pmdnT: val.pmdn / 1e12,
        capaianPct: val.target > 0 ? ((val.realisasi / val.target) * 100).toFixed(1) : '0',
      }))
      .sort((a, b) => b.realisasiT - a.realisasiT);
  }, [filteredData]);

  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Tahun,Triwulan,Jenis Investasi,Sektor,Negara Asal,Target (IDR),Realisasi (IDR),Jumlah Proyek,Penyerapan Naker\n';
    filteredData.forEach((d) => {
      csvContent += `${d.tahun},Q${d.triwulan},"${d.jenis}","${d.sektor}","${d.negaraAsal}",${d.targetInvestasi},${d.realisasiInvestasi},${d.jumlahProyek},${d.penyerapanNaker}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `realisasi_investasi_bp_batam_dataset13.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id="investasi-realisasi-card"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden font-sans p-3.5 sm:p-4"
    >
      {/* 1. Header Visualisasi Standar Pembangunan Infrastruktur */}
      <InvestasiVisualHeader
        datasetNumber={13}
        pdfPages="Hal. 48"
        classification="TERBUKA"
        periode="PERTRIWULAN"
        title="LAPORAN REALISASI INVESTASI DI KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS (KPBPBB)"
        visualName="Grafik Batang Komparatif Realisasi vs Target Investasi (Grouped Bar Chart PMA & PMDN)"
        attributes={[
          'TRIWULAN',
          'TAHUN',
          'LAPORAN REALISASI INVESTASI',
          'JENIS INVESTASI (PMA/PMDN)',
          'SEKTOR',
          'TARGET INVESTASI',
          'REALISASI INVESTASI',
        ]}
        onOpenFormula={() => onOpenFormulaModal('kpi_investasi_realisasi')}
        rightControls={
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Grouping switch */}
            <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs flex items-center">
              <button
                onClick={() => setChartGrouping('triwulan')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  chartGrouping === 'triwulan'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Per Triwulan
              </button>
              <button
                onClick={() => setChartGrouping('sektor')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  chartGrouping === 'sektor'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Per Sektor
              </button>
            </div>

            {/* View switcher */}
            <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs flex items-center">
              <button
                onClick={() => setViewMode('chart')}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'chart'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Grafik</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tabel</span>
              </button>
            </div>

            {/* CSV Download */}
            <button
              onClick={handleExportCsv}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
              title="Unduh Data CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">CSV</span>
            </button>
          </div>
        }
      />

      {/* 2. Ringkasan Mini Metrik */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
            Total Realisasi
          </span>
          <span className="text-base font-bold text-emerald-700 font-mono">
            {formatTriliun(totalRealisasi)}
          </span>
          <span className="text-[10.5px] text-emerald-600 block font-semibold">
            {capaianPersen.toFixed(1)}% dari Target
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
            Target Investasi
          </span>
          <span className="text-base font-bold text-slate-800 font-mono">
            {formatTriliun(totalTarget)}
          </span>
          <span className="text-[10.5px] text-slate-500 block">Kompilasi APBN/BLU</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
            PMA (Modal Asing)
          </span>
          <span className="text-base font-bold text-indigo-700 font-mono">
            {formatTriliun(totalPma)}
          </span>
          <span className="text-[10.5px] text-indigo-600 block">
            {totalRealisasi > 0 ? ((totalPma / totalRealisasi) * 100).toFixed(1) : 0}% Porsi
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
            PMDN (Dalam Negeri)
          </span>
          <span className="text-base font-bold text-teal-700 font-mono">
            {formatTriliun(totalPmdn)}
          </span>
          <span className="text-[10.5px] text-teal-600 block">
            {totalRealisasi > 0 ? ((totalPmdn / totalRealisasi) * 100).toFixed(1) : 0}% Porsi
          </span>
        </div>
      </div>

      {/* 3. Visual Content: Chart or Table */}
      {viewMode === 'chart' ? (
        <div className="h-[300px] w-full bg-slate-50/60 border border-slate-200 rounded-xl p-2.5">
          <ResponsiveContainer width="100%" height="100%">
            {chartGrouping === 'triwulan' ? (
              <BarChart
                data={triwulanChartData}
                margin={{ top: 25, right: 15, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="label"
                  tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
                />
                <YAxis
                  tick={{ fill: '#64748B', fontSize: 10.5 }}
                  label={{
                    value: 'Nilai (Rp Triliun)',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#64748B',
                    fontSize: 10,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#CBD5E1',
                    borderRadius: '8px',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(val: any, name: any) => [
                    `Rp ${Number(val).toFixed(2)} Triliun`,
                    name,
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                <Bar
                  dataKey="targetT"
                  name="Target Investasi"
                  fill="#94A3B8"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
                <Bar
                  dataKey="pmaT"
                  name="Realisasi PMA"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
                <Bar
                  dataKey="pmdnT"
                  name="Realisasi PMDN"
                  fill="#0D9488"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                >
                  <LabelList
                    dataKey="totalT"
                    position="top"
                    formatter={(val: any) => `Rp ${Number(val).toFixed(1)}T`}
                    style={{ fontSize: '10px', fill: '#0F172A', fontWeight: 'bold' }}
                  />
                </Bar>
              </BarChart>
            ) : (
              <BarChart
                data={sektorChartData}
                margin={{ top: 25, right: 15, left: 10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="sektor"
                  tick={{ fill: '#334155', fontSize: 10, fontWeight: 500 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fill: '#64748B', fontSize: 10.5 }}
                  label={{
                    value: 'Nilai (Rp Triliun)',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#64748B',
                    fontSize: 10,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#CBD5E1',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                  formatter={(val: any, name: any) => [
                    `Rp ${Number(val).toFixed(2)} Triliun`,
                    name,
                  ]}
                  labelFormatter={(_label, payload) =>
                    payload?.[0]?.payload?.fullName || _label
                  }
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                <Bar
                  dataKey="targetT"
                  name="Target"
                  fill="#94A3B8"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
                <Bar
                  dataKey="realisasiT"
                  name="Total Realisasi"
                  fill="#059669"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                >
                  <LabelList
                    dataKey="capaianPct"
                    position="top"
                    formatter={(val: any) => `${val}%`}
                    style={{ fontSize: '10px', fill: '#059669', fontWeight: 'bold' }}
                  />
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : (
        /* Table View */
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white max-h-[340px] overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Tahun &amp; Triwulan</th>
                <th className="py-2.5 px-3">Jenis</th>
                <th className="py-2.5 px-3">Sektor Industri</th>
                <th className="py-2.5 px-3">Negara Asal</th>
                <th className="py-2.5 px-3 text-right">Target Investasi</th>
                <th className="py-2.5 px-3 text-right">Realisasi Investasi</th>
                <th className="py-2.5 px-3 text-center">% Capaian</th>
                <th className="py-2.5 px-3 text-center">Proyek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11.5px]">
              {filteredData.map((row) => {
                const pct =
                  row.targetInvestasi > 0
                    ? ((row.realisasiInvestasi / row.targetInvestasi) * 100).toFixed(1)
                    : '0';
                return (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-sans font-medium text-slate-900">
                      {row.tahun} - Q{row.triwulan}
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          row.jenis === 'PMA'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-teal-100 text-teal-800'
                        }`}
                      >
                        {row.jenis}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-sans text-slate-800">{row.sektor}</td>
                    <td className="py-2 px-3 font-sans text-slate-600">{row.negaraAsal}</td>
                    <td className="py-2 px-3 text-right text-slate-600">
                      {formatMiliar(row.targetInvestasi)}
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-emerald-700">
                      {formatMiliar(row.realisasiInvestasi)}
                    </td>
                    <td className="py-2 px-3 text-center font-bold text-slate-800">
                      {pct}%
                    </td>
                    <td className="py-2 px-3 text-center text-slate-600">
                      {row.jumlahProyek}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
