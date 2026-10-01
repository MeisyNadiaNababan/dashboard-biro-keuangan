import React, { useMemo } from 'react';
import {
  Plane,
  MapPin,
  Globe2,
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
import { AIRPORT_TOP_ROUTES } from './bandaraData';
import { BandaraFilterState } from './types';
import { BandaraVisualHeader } from './BandaraVisualHeader';

interface Dataset9RuteLangsungCardProps {
  filters?: BandaraFilterState;
  onOpenFormula: () => void;
}

export const Dataset9RuteLangsungCard: React.FC<Dataset9RuteLangsungCardProps> = ({
  filters,
  onOpenFormula,
}) => {
  const filteredRoutes = useMemo(() => {
    return AIRPORT_TOP_ROUTES;
  }, []);

  const totalFrekuensiMingguan = filteredRoutes.reduce((sum, r) => sum + r.frekuensiMingguan, 0);
  const totalPaxTahunan = filteredRoutes.reduce((sum, r) => sum + r.totalPenumpangTahunan, 0);
  const avgSlf = Number((filteredRoutes.reduce((sum, r) => sum + r.seatLoadFactor, 0) / (filteredRoutes.length || 1)).toFixed(1));

  // Chart data sorted by frequency
  const chartFrequencyData = useMemo(() => {
    return [...filteredRoutes]
      .sort((a, b) => b.frekuensiMingguan - a.frekuensiMingguan)
      .map((r) => ({
        name: r.kotaTujuan.split('(')[0].trim(),
        fullDest: r.kotaTujuan,
        kodeRute: r.kodeRute,
        frekuensi: r.frekuensiMingguan,
        penumpangRibu: Number((r.totalPenumpangTahunan / 1000).toFixed(0)),
        penumpangAsli: r.totalPenumpangTahunan,
        slf: r.seatLoadFactor,
        kategori: r.kategori,
      }));
  }, [filteredRoutes]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs font-sans">
      {/* Visual Header Sesuai Standar Dashboard Pembangunan Infrastruktur */}
      <BandaraVisualHeader
        datasetNumber={9}
        pdfPages="Hal. 12"
        title="RUTE PENERBANGAN LANGSUNG DARI BATAM (BANDARA HANG NADIM)"
        visualName="Sheet 1: Visualisasi Peta Konektivitas Jaringan & Frekuensi Mingguan Rute Langsung"
        classification="TERBUKA"
        periode="JIKA UPDATE"
        attributes={[
          'RINCIAN RUTE PENERBANGAN LANGSUNG DARI BATAM',
          'KODE RUTE',
          'KOTA ASAL / TUJUAN',
          'FREKUENSI MINGGUAN',
          'TOTAL PENUMPANG TAHUNAN',
          'SEAT LOAD FACTOR (%)',
          'MASKAPAI MELAYANI',
        ]}
        onOpenFormula={onOpenFormula}
      />

      {/* Mini Executive Banner Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gradient-to-r from-sky-50/70 via-blue-50/40 to-slate-50 rounded-xl border border-sky-100 my-4 text-xs">
        <div>
          <span className="text-slate-500 block text-[10.5px]">Total Rute Langsung Aktif</span>
          <span className="text-base font-mono font-black text-sky-950 block">{filteredRoutes.length} Destinasi</span>
          <span className="text-[10px] text-sky-700 block mt-0.5">Domestik &amp; Internasional</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Frekuensi Penerbangan Mingguan</span>
          <span className="text-base font-mono font-black text-slate-800 block">{totalFrekuensiMingguan} Frekuensi / Minggu</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Rata-rata 54 flights/hari</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Estimasi Penumpang Dilayani</span>
          <span className="text-base font-mono font-black text-emerald-700 block">{(totalPaxTahunan / 1000000).toFixed(2)} Juta Pax</span>
          <span className="text-[10px] text-emerald-800 block mt-0.5 font-semibold">Trafik Koridor Strategis</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Rata-rata Okupansi Rute (SLF)</span>
          <span className="text-base font-mono font-black text-indigo-700 block">{avgSlf}%</span>
          <span className="text-[10px] text-indigo-800 block mt-0.5 font-mono">Tingkat Isian Kursi Tinggi</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SHEET 1: VISUALISASI PETA KONEKTIVITAS JARINGAN & FREKUENSI MINGGUAN     */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-800">
                Ranking Frekuensi Penerbangan Mingguan Rute Langsung dari Bandara Hang Nadim (BTH)
              </span>
              <p className="text-[10.5px] text-slate-500">
                Koridor penerbangan terpadat menghubungkan Batam dengan pusat ekonomi nasional &amp; regional
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-sky-800 font-bold">
                <span className="w-3 h-3 rounded-xs bg-sky-600 inline-block" />
                <span>Rute Domestik</span>
              </span>
              <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
                <span className="w-3 h-3 rounded-xs bg-indigo-500 inline-block" />
                <span>Rute Internasional</span>
              </span>
            </div>
          </div>

          <div className="h-80 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartFrequencyData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 130, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} unit=" Flts" />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10.5, fill: '#1E293B', fontWeight: 600 }}
                  width={125}
                />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => [
                    `${val} Penerbangan / Minggu (${item.payload.kategori})`,
                    'Frekuensi Mingguan',
                  ]}
                  labelFormatter={(label) => `Destinasi: ${label}`}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="frekuensi" name="Frekuensi Mingguan" radius={[0, 4, 4, 0]} barSize={14}>
                  {chartFrequencyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.kategori === 'Internasional' ? '#6366F1' : '#0284C7'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hub & Spoke Connectivity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-sky-950 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-700" />
                Koridor Utama Sumatera - Jawa
              </span>
              <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded font-bold">
                Trunk Route
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Rute BTH &harr; CGK (148x/minggu), BTH &harr; KNO (56x), dan BTH &harr; SUB (42x) menyumbang &gt; 65% total pergerakan penumpang Hang Nadim.
            </p>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-emerald-700" />
                Konektivitas Kepulauan Riau
              </span>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                Perintis &amp; ATR
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Menghubungkan Batam dengan pulau terdepan: Natuna Ranai (14x/minggu), Letung Anambas (7x/minggu), dan Dabo Singkep (7x/minggu).
            </p>
          </div>

          <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-purple-950 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-purple-700" />
                Rute Internasional &amp; Regional
              </span>
              <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded font-bold">
                Cross-Border
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Layanan langsung ke Kuala Lumpur (KUL, 14x/minggu), Subang (SZB, 7x/minggu), serta penerbangan carter turis Korea Seoul (ICN, 4x/minggu).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
