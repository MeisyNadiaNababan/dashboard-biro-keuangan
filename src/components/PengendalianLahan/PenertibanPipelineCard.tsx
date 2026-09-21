import React, { useState } from 'react';
import {
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Info,
  CheckCircle2,
  FileX,
  RefreshCw,
  Landmark,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { KPI_EVALUASI_PEMBATALAN_DATA, KASUS_PENERTIBAN_DATA } from './pengendalianData';

interface PenertibanPipelineCardProps {
  onOpenFormulaModal: (id: string) => void;
}

export const PenertibanPipelineCard: React.FC<PenertibanPipelineCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [selectedTahap, setSelectedTahap] = useState<string>('BATAL');
  const data = KPI_EVALUASI_PEMBATALAN_DATA;

  const activePipeline =
    data.pipelineEskalasi.find((p) => p.kode === selectedTahap) || data.pipelineEskalasi[3];

  const filteredKasus = KASUS_PENERTIBAN_DATA.filter((k) => {
    if (selectedTahap === 'BATAL') return k.tahapPeringatan === 'Pembatalan SK';
    if (selectedTahap === 'RE-KOMIT') return k.tahapPeringatan === 'Pemulihan Komitmen';
    return k.tahapPeringatan === selectedTahap;
  });

  const chartData = data.pipelineEskalasi.map((p) => ({
    name: p.kode,
    label: p.tahap,
    kasus: p.jumlahKasus,
    luas: p.luasHa,
    color: p.color,
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-3.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Pipeline Penertiban Lahan Terlantar &amp; Rekuperasi Aset BP Batam
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                PEMANTAUAN DIREKTUR (DATASET #2)
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Eskalasi surat peringatan (SP 1–3), rekuperasi lahan mangkrak ke kas daerah, &amp; pemulihan investasi
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenFormulaModal('kpi_evaluasi_pembatalan')}
          className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
          title="Penjelasan Formula & Atribut Dataset #2"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Impact Executive KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-200 text-xs">
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Lahan Terlantar Diselamatkan</div>
          <div className="text-lg font-black text-purple-700">
            {data.luasLahanDiselamatkanHa} Hektar
          </div>
          <div className="text-[10.5px] text-purple-600 font-medium mt-0.5">
            32 Alokasi Resmi Dicabut (Kepka)
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Lahan Berhasil Dire-komitmen</div>
          <div className="text-lg font-black text-emerald-700">
            {data.luasLahanReKomitmenHa} Hektar
          </div>
          <div className="text-[10.5px] text-emerald-600 font-medium mt-0.5">
            58 Investor Lanjut Konstruksi
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Total Kasus Dalam Eskalasi SP</div>
          <div className="text-lg font-black text-amber-700">
            {74 + 46 + 28} Kasus
          </div>
          <div className="text-[10.5px] text-amber-600 font-medium mt-0.5">
            Total Luas: {(312.4 + 188.7 + 115.2).toFixed(1)} Ha Terpantau
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500">Tingkat Penyelesaian Kasus</div>
          <div className="text-lg font-black text-slate-900">
            {data.persentase.toFixed(1)}%
          </div>
          <div className="text-[10.5px] text-sky-700 font-medium mt-0.5">
            162 dari 185 Usulan Tuntas
          </div>
        </div>
      </div>

      {/* Main Content: Pipeline Visual Steps + Chart + Drilldown Case List */}
      <div className="p-3.5 space-y-3.5">
        {/* Step Indicator Selector */}
        <div>
          <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
            <span>Tahapan Penindakan &amp; Rekuperasi Lahan:</span>
            <span className="text-[11px] text-slate-500">Klik tahapan untuk melihat detail</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {data.pipelineEskalasi.map((p) => {
              const isSelected = selectedTahap === p.kode;
              return (
                <button
                  key={p.kode}
                  onClick={() => setSelectedTahap(p.kode)}
                  className={`p-2.5 rounded-lg text-left transition-all border text-xs cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-xs ring-1 ring-slate-900'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      {p.kode}
                    </span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs truncate">{p.tahap}</div>
                  <div className="flex items-baseline justify-between mt-2 pt-1 border-t border-slate-100 text-[11px]">
                    <span className="font-black text-slate-800">{p.jumlahKasus} Kasus</span>
                    <span className="font-mono text-slate-500">{p.luasHa} Ha</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 mt-0.5"
              style={{ backgroundColor: activePipeline.color }}
            >
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  {activePipeline.tahap}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${activePipeline.badgeClass}`}>
                  {activePipeline.jumlahKasus} Objek ({activePipeline.luasHa} Ha)
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                {activePipeline.deskripsi}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-500 block">Status Pengendalian</span>
            <span className="text-xs font-bold text-slate-800">
              {selectedTahap === 'BATAL'
                ? '✅ Aset Kembali ke BP Batam'
                : selectedTahap === 'RE-KOMIT'
                ? '🤝 Komitmen Terpulihkan'
                : '⏳ Dalam Pantauan Ketat'}
            </span>
          </div>
        </div>

        {/* Chart + Selected Cases List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Chart View (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">
                Distribusi Kasus per Tahapan
              </span>
              <span className="text-[10.5px] text-slate-500 font-mono">Satuan: Kasus</span>
            </div>

            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      color: '#0F172A',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(val: any, name: any) => [
                      name === 'kasus' ? `${val} Kasus` : `${val} Ha`,
                      name === 'kasus' ? 'Jumlah Kasus' : 'Luas Hektar',
                    ]}
                  />
                  <Bar
                    dataKey="kasus"
                    radius={[4, 4, 0, 0]}
                    onClick={(entry) => setSelectedTahap(entry.name)}
                    className="cursor-pointer"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.name === selectedTahap ? entry.color : '#94a3b8'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <span className="text-[10px] text-slate-400 text-center mt-1">
              Grafik menunjukkan tahapan eskalasi dari SP-1 hingga pembatalan alokasi
            </span>
          </div>

          {/* Sample Cases Drilldown (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">
                Daftar Kasus Aktif ({selectedTahap})
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {filteredKasus.length > 0 ? `${filteredKasus.length} Kasus Terpilih` : 'Semua Sampel'}
              </span>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[190px] pr-1 text-xs">
              {(filteredKasus.length > 0 ? filteredKasus : KASUS_PENERTIBAN_DATA.slice(0, 3)).map(
                (kasus) => (
                  <div
                    key={kasus.id}
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-500">
                          {kasus.noKasus}
                        </span>
                        <h5 className="font-bold text-slate-900 text-xs mt-0.5">
                          {kasus.pemegangAlokasi}
                        </h5>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          kasus.tahapPeringatan === 'Pembatalan SK'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : kasus.tahapPeringatan === 'Pemulihan Komitmen'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {kasus.tahapPeringatan}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600 mt-1">
                      <span>
                        Wilayah: <strong>{kasus.swp}</strong> ({kasus.luasHa} Ha / {kasus.luasM2.toLocaleString('id-ID')} m²)
                      </span>
                      <span className="text-slate-500 italic truncate max-w-[280px]">
                        ⚠️ {kasus.alasanEvaluasi}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Kewenangan Regulasi:</strong> Merujuk pada Perka BP Batam tentang Penertiban dan Pembatalan Hak Alokasi Lahan Mangkrak.
        </span>
        <span className="text-slate-600 font-medium">Satu Data Hal. 11 Item 2</span>
      </div>
    </div>
  );
};
