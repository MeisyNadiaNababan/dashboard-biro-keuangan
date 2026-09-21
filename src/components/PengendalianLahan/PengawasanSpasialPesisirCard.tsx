import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Waves,
  Building,
  Anchor,
  Info,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { KPI_PENGAWASAN_DATA, SWP_PENGAWASAN_DATA } from './pengendalianData';

interface PengawasanSpasialPesisirCardProps {
  onOpenFormulaModal: (id: string) => void;
}

export const PengawasanSpasialPesisirCard: React.FC<PengawasanSpasialPesisirCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [selectedSwp, setSelectedSwp] = useState<string>('Batam Kota');
  const pengawasan = KPI_PENGAWASAN_DATA;
  const swpList = SWP_PENGAWASAN_DATA;

  const activeSwpData = swpList.find((s) => s.swp === selectedSwp) || swpList[0];

  const chartData = swpList.map((s) => ({
    name: s.swp.split(' ')[0],
    fullName: s.namaWilayah,
    Patuh: s.patuh,
    Teguran: s.teguran,
    Pelanggaran: s.pelanggaran,
    total: s.totalObjek,
    kepatuhanPersen: s.persentaseKepatuhan,
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-3.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Pengawasan Spasial 5 SWP &amp; Kepatuhan Pesisir-Reklamasi
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                DATASET #1
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Pemantauan lapangan kepatuhan peruntukan lahan, sempadan pantai, dan legalitas izin reklamasi
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenFormulaModal('kpi_pengawasan')}
          className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
          title="Penjelasan Formula Pengawasan Lahan & Pesisir"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Category Pills Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-200 text-xs">
        {pengawasan.breakdownKategori.map((k, idx) => (
          <div
            key={idx}
            className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                {idx === 0 ? (
                  <Building className="w-3.5 h-3.5 text-blue-600" />
                ) : idx === 1 ? (
                  <Waves className="w-3.5 h-3.5 text-sky-600" />
                ) : (
                  <Anchor className="w-3.5 h-3.5 text-amber-600" />
                )}
                {k.singkat}
              </span>
              <span className="text-[10.5px] font-bold text-emerald-700 font-mono">
                {k.persen}% Tuntas
              </span>
            </div>
            <div className="text-[11px] text-slate-600">
              Realisasi: <strong className="text-slate-900 font-mono">{k.realisasi}</strong> dari {k.target} Objek ({k.luasHa} Ha)
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1.5 pt-1 border-t border-slate-100">
              <span className="text-emerald-700 font-medium">Patuh: {k.patuh}</span>
              <span>•</span>
              <span className="text-amber-700 font-medium">Teguran: {k.teguran}</span>
              <span>•</span>
              <span className="text-rose-700 font-medium">Pelanggaran: {k.pelanggaran}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Chart + Selected SWP Detail */}
      <div className="p-3.5 grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* SWP Comparison Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-800">
              Status Kepatuhan Pengawasan per Sub Wilayah (SWP)
            </span>
            <span className="text-[10.5px] text-slate-500">Satuan: Objek Terperiksa</span>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                onClick={(entry: any) => {
                  if (entry && entry.activePayload && entry.activePayload[0]) {
                    const matched = swpList.find(
                      (s) => s.swp.split(' ')[0] === entry.activePayload[0].payload.name
                    );
                    if (matched) setSelectedSwp(matched.swp);
                  }
                }}
              >
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
                  formatter={(val: any, name: any) => [`${val} Objek`, name]}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
                  iconSize={8}
                />
                <Bar dataKey="Patuh" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Teguran" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Pelanggaran" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Klik batang grafik untuk melihat rincian pengawasan wilayah terkait
          </span>
        </div>

        {/* Selected SWP Info Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{activeSwpData.swp}</h4>
                  <p className="text-[10.5px] text-slate-500">{activeSwpData.namaWilayah}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {activeSwpData.persentaseKepatuhan}% Patuh
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-2.5">
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Total Objek Diawasi</span>
                <span className="text-base font-black text-slate-900">
                  {activeSwpData.totalObjek} Objek
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  Luas: {activeSwpData.luasPengawasanHa} Ha
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Sesuai Peruntukan</span>
                <span className="text-base font-black text-emerald-700">
                  {activeSwpData.patuh} Objek
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Teguran/Sanksi: {activeSwpData.teguran + activeSwpData.pelanggaran}
                </span>
              </div>
            </div>

            {/* Early Warning Focus for Leader */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>Atensi Pimpinan (Early Warning):</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                {activeSwpData.pelanggaran > 0
                  ? `Ditemukan ${activeSwpData.pelanggaran} indikasi pelanggaran batas sempadan pantai & penimbunan tanpa izin di wilayah ${activeSwpData.swp}. Berkas diarahkan untuk terbit Surat Peringatan (SP-1).`
                  : `Tingkat kepatuhan tinggi di wilayah ${activeSwpData.swp}. Tetap lakukan patroli rutin pengamanan aset cadangan.`}
              </p>
            </div>
          </div>

          {/* Quick SWP Switcher Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 mt-2 border-t border-slate-200">
            {swpList.map((s) => (
              <button
                key={s.swp}
                onClick={() => setSelectedSwp(s.swp)}
                className={`px-2 py-1 rounded text-[10.5px] font-medium transition-all cursor-pointer ${
                  s.swp === selectedSwp
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {s.swp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          💡 <strong>Ketentuan Sempadan Pantai:</strong> Merujuk UU Pengelolaan Wilayah Pesisir &amp; Perpres Zonasi KPBPBB Batam.
        </span>
        <span className="text-slate-600 font-medium">Satu Data Hal. 11 Item 1</span>
      </div>
    </div>
  );
};
