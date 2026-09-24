import React, { useState } from 'react';
import {
  Smile,
  BarChart3,
  Award,
  CheckCircle2,
  HelpCircle,
  Info,
  MapPin,
  Building2,
  Users,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  LOKUS_IKM_DATA,
  STANDAR_IKM_PERMENPAN,
  EMPAT_IKS_KEPALA_BP
} from './kepalaBpData';

interface IkmPelayananCardProps {
  onOpenManualModal?: () => void;
}

export const IkmPelayananCard: React.FC<IkmPelayananCardProps> = ({
  onOpenManualModal,
}) => {
  const [selectedLokusNo, setSelectedLokusNo] = useState<number>(1);
  const iks2 = EMPAT_IKS_KEPALA_BP[1];

  const selectedLokus =
    LOKUS_IKM_DATA.find((l) => l.no === selectedLokusNo) || LOKUS_IKM_DATA[0];

  const rerataIkm = (
    LOKUS_IKM_DATA.reduce((acc, cur) => acc + cur.skorIkm, 0) /
    LOKUS_IKM_DATA.length
  ).toFixed(2);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* HEADER */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-emerald-50/50 via-slate-50 to-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shrink-0">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                  IKS-02 KEPALA BP BATAM
                </span>
                <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                  Sumber: Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Indeks Kepuasan Masyarakat (IKM) Pengguna Layanan Umum &amp; Kawasan
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10.5px] uppercase font-bold text-slate-500 block">
                Target: 88,00 | Capaian Konsolidasi
              </span>
              <span className="text-base font-black font-mono text-emerald-700">
                {rerataIkm}{' '}
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Mutu A (Sangat Baik)
                </span>
              </span>
            </div>
            {onOpenManualModal && (
              <button
                onClick={onOpenManualModal}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Manual PermenPAN</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* 5 LOKUS BAR CHART */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900">
              Skor IKM 5 Lokus Survei Kepuasan Masyarakat (Halaman 4 Perkin):
            </h4>
            <span className="text-xs font-mono text-slate-500">
              Target Seluruh Lokus: <strong>88,00</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {LOKUS_IKM_DATA.map((lokus) => {
              const isSelected = lokus.no === selectedLokusNo;
              const isAboveTarget = lokus.skorIkm >= lokus.target;

              return (
                <div
                  key={lokus.no}
                  onClick={() => setSelectedLokusNo(lokus.no)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-400/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-slate-500 font-mono">
                      LOKUS #{lokus.no}
                    </span>
                    <span
                      className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                        lokus.mutuPelayanan === 'A'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      Mutu {lokus.mutuPelayanan}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 min-h-[32px] mb-2">
                    {lokus.namaLokus}
                  </h5>

                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xl font-black font-mono text-slate-900">
                      {lokus.skorIkm.toFixed(2)}
                    </span>
                    <span
                      className={`text-[11px] font-bold ${
                        isAboveTarget ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {isAboveTarget ? 'Tercapai' : 'On Track'}
                    </span>
                  </div>

                  {/* Micro progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      style={{ width: `${(lokus.skorIkm / 100) * 100}%` }}
                      className="bg-emerald-600 h-full rounded-full"
                    />
                  </div>

                  <div className="mt-2 text-[10.5px] text-slate-500 truncate">
                    {lokus.jumlahResponden.toLocaleString('id-ID')} Responden
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DETAIL SELECTED LOKUS */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                Evaluasi Lokus Terpilih
              </span>
              <h5 className="text-sm font-bold text-slate-900">
                {selectedLokus.namaLokus}
              </h5>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-700">
                Skor: <strong className="text-emerald-700 text-sm">{selectedLokus.skorIkm.toFixed(2)}</strong> (Predikat {selectedLokus.predikat})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-0.5">Tingkat Kepuasan Publik:</span>
              <div className="text-base font-black font-mono text-emerald-700">
                {selectedLokus.persenResponSangatPuas}%
              </div>
              <span className="text-[10px] text-slate-500">Responden Sangat Puas</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-0.5">Unsur Terkuat (Keunggulan):</span>
              <div className="text-xs font-bold text-slate-900">
                {selectedLokus.unsurTerkuat}
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-0.5">Area Perbaikan Prioritas:</span>
              <div className="text-xs font-bold text-amber-800">
                {selectedLokus.unsurTerlemah}
              </div>
            </div>
          </div>
        </div>

        {/* STANDAR PERMENPAN-RB 14/2017 TABLE (HALAMAN 4 PERKIN) */}
        <div>
          <span className="text-xs font-bold text-slate-800 block mb-2">
            Pedoman Standar Nilai &amp; Mutu Pelayanan PermenPAN-RB Nomor 14 Tahun 2017:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            {STANDAR_IKM_PERMENPAN.map((std) => (
              <div
                key={std.mutu}
                className={`p-2.5 rounded-lg border flex items-center justify-between ${std.bg} ${
                  std.mutu === 'A' ? 'ring-2 ring-emerald-500/40' : ''
                }`}
              >
                <div>
                  <div className="font-bold flex items-center gap-1.5">
                    <span>Mutu {std.mutu}</span>
                    <span>({std.predikat})</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-600 mt-0.5">
                    Skala: {std.rentang}
                  </div>
                </div>
                {std.mutu === 'A' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="truncate">
          Survei dilaksanakan bersama lembaga penelitian/independen yang kredibel.
        </span>
        <span className="font-mono text-[11px] text-emerald-800 font-bold">
          Target IKS-2: 88,00 (Tercapai)
        </span>
      </div>
    </div>
  );
};
