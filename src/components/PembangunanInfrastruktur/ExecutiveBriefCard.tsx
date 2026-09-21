import React from 'react';
import {
  TrendingUp,
  AlertOctagon,
  CheckCircle2,
  Clock,
  HardHat,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  FileCheck,
} from 'lucide-react';
import {
  KURVA_S_AGREGAT_TAHUN_BERJALAN,
  DATASET_4_PROGRES_KONSTRUKSI,
  REKAP_JENIS_PEMBANGUNAN,
} from './infrastrukturData';

interface ExecutiveBriefCardProps {
  onSelectTab?: (tab: string) => void;
  onSelectPaketKritis?: () => void;
  onOpenFormula: (kpi: 'kpi-kurva-s' | 'kpi-progres-fisik') => void;
}

export const ExecutiveBriefCard: React.FC<ExecutiveBriefCardProps> = ({
  onSelectTab,
  onSelectPaketKritis,
  onOpenFormula,
}) => {
  const handleNavKritis = () => {
    if (onSelectPaketKritis) onSelectPaketKritis();
    else if (onSelectTab) onSelectTab('progres');
  };

  const kritisProjects = DATASET_4_PROGRES_KONSTRUKSI.filter(
    (p) => p.statusKurvaS === 'Kritis (SCM)' || (p.tingkatKritis && p.tingkatKritis.includes('SCM'))
  );

  return (
    <div className="space-y-3 font-sans">
      {/* Top Row: Compact Kurva S (Left) + SCM Warning (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Compact Kurva S (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-sky-50 text-sky-700 flex items-center justify-center">
                  <TrendingUp className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 leading-tight">
                    Kurva S Agregat TA 2025 (Target vs Realisasi Fisik & Keuangan)
                  </h3>
                  <span className="text-[10px] text-slate-500">
                    Akumulasi seluruh paket konstruksi aktif BP Batam (Dataset No. 4)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Deviasi Kumulatif: -1.5% (Terkendali)
                </span>
                <button
                  onClick={() => onOpenFormula('kpi-kurva-s')}
                  className="text-slate-400 hover:text-sky-600 p-0.5"
                  title="Rumus Kurva S"
                >
                  <HelpCircle className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Compact Kurva S SVG Chart */}
            <div className="h-36 relative w-full pt-1">
              <svg viewBox="0 0 500 140" className="w-full h-full overflow-visible">
                {/* Horizontal Guide Lines */}
                {[0, 35, 70, 105, 140].map((y) => (
                  <line
                    key={y}
                    x1="35"
                    y1={y}
                    x2="490"
                    y2={y}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                ))}

                {/* Y Axis Labels */}
                <text x="28" y="140" fill="#94a3b8" fontSize="8.5" textAnchor="end">0%</text>
                <text x="28" y="105" fill="#94a3b8" fontSize="8.5" textAnchor="end">25%</text>
                <text x="28" y="70" fill="#94a3b8" fontSize="8.5" textAnchor="end">50%</text>
                <text x="28" y="35" fill="#94a3b8" fontSize="8.5" textAnchor="end">75%</text>
                <text x="28" y="10" fill="#94a3b8" fontSize="8.5" textAnchor="end">100%</text>

                {/* Target Line (Dotted Slate) */}
                <path
                  d="M 45 133 Q 180 110, 260 55 T 485 5"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />

                {/* Realisasi Fisik Curve (Solid Sky Blue) */}
                <path
                  d="M 45 132 Q 175 106, 255 58 T 355 22"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                />

                {/* Realisasi Keuangan Curve (Solid Emerald) */}
                <path
                  d="M 45 135 Q 180 112, 258 65 T 355 30"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />

                {/* Dots for Realized Months */}
                {KURVA_S_AGREGAT_TAHUN_BERJALAN.slice(0, 9).map((pt, idx) => {
                  const x = 45 + idx * 38.7;
                  const yFisik = 140 - (pt.realisasi! / 100) * 135;
                  return (
                    <g key={pt.bulan}>
                      <circle cx={x} cy={yFisik} r="3" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
                      <text x={x} y="152" fill="#64748b" fontSize="8" textAnchor="middle">
                        {pt.bulan}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Compact Legend */}
          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-600">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-slate-400 border-b border-dashed" />
                <span>Target: 88.0%</span>
              </div>
              <div className="flex items-center gap-1 font-semibold text-sky-800">
                <span className="w-2.5 h-1 bg-sky-600 rounded" />
                <span>Fisik: 86.5%</span>
              </div>
              <div className="flex items-center gap-1 font-semibold text-emerald-800">
                <span className="w-2.5 h-1 bg-emerald-600 rounded" />
                <span>Keuangan: 81.0%</span>
              </div>
            </div>
            <button
              onClick={() => onSelectTab('dataset-4')}
              className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-0.5"
            >
              <span>Detail Proyek</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Compact Early Warning SCM (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-rose-50 text-rose-700 flex items-center justify-center">
                  <ShieldAlert className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 leading-tight">
                    Peringatan Dini SCM (Show Cause Meeting)
                  </h3>
                  <span className="text-[10px] text-slate-500">
                    Perlu intervensi pimpinan (Deviasi minus melampaui toleransi)
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                {kritisProjects.length} Paket Atensi
              </span>
            </div>

            {/* List of SCM Projects */}
            <div className="space-y-2 mb-2">
              {kritisProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-2 rounded-lg bg-rose-50/60 border border-rose-200/80 text-[10.5px]"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-rose-900 truncate max-w-[210px]">
                      {p.namaPaket}
                    </span>
                    <span className="text-[9.5px] font-bold px-1 py-0.2 rounded bg-rose-600 text-white shrink-0">
                      {p.tingkatKritis} (Dev: {p.deviasiFisikPersen}%)
                    </span>
                  </div>
                  <div className="text-slate-600 text-[10px] line-clamp-1 mb-1">
                    Kendala: {p.isuKendala}
                  </div>
                  <div className="text-[10px] font-medium text-rose-800 bg-white/70 px-1.5 py-0.5 rounded border border-rose-100 line-clamp-1">
                    Instruksi: {p.tindakLanjut}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-500">Standar Bina Marga: SCM 1 (-5%), SCM 2 (-10%)</span>
            <button
              onClick={handleNavKritis}
              className="text-rose-700 hover:text-rose-900 font-bold flex items-center gap-0.5"
            >
              <span>Daftar Lengkap</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Jenis Pembangunan (JNS_PEK) Distribution + Satu Data Compliance Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Compact JNS_PEK Mini Bar List (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-sky-50 text-sky-700 flex items-center justify-center">
                <HardHat className="w-3 h-3" />
              </div>
              <h3 className="text-xs font-bold text-slate-800">
                Alokasi Pagu Menurut Jenis Pekerjaan (JNS_PEK)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              5 Kategori Utama
            </span>
          </div>

          <div className="space-y-2">
            {REKAP_JENIS_PEMBANGUNAN.map((item) => {
              const paguMiliar = (item.totalPagu / 1000000000).toFixed(0);
              const maxPagu = 1450000000000;
              const barWidth = Math.min(100, Math.round((item.totalPagu / maxPagu) * 100));

              return (
                <div key={item.jenisPekerjaan} className="text-[11px]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-slate-800 truncate max-w-[260px]">
                      {item.jenisPekerjaan}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0 text-[10.5px]">
                      <span className="font-mono font-bold text-slate-900">
                        Rp {paguMiliar} M
                      </span>
                      <span className="text-slate-500 font-mono">
                        ({item.jumlahProyek} Paket)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-600 h-full rounded-full"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Satu Data Compliance Table (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <FileCheck className="w-3 h-3" />
              </div>
              <h3 className="text-xs font-bold text-slate-800">
                Matriks Kepatuhan 6 Dataset Satu Data BP Batam
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              100% Terpetakan
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-[10.5px]">
            <div
              onClick={() => onSelectTab && onSelectTab('dataset-1')}
              className="py-1.5 flex items-center justify-between hover:bg-slate-50 px-1 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9.5px] font-bold px-1 rounded bg-slate-100 text-slate-700">#1</span>
                <span className="font-medium text-slate-800">ROW Utilitas (Kabel, Pipa, Gas)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-600">142 Izin • 381,1 Km</span>
                <span className="text-emerald-700 font-bold text-[10px]">Aktif</span>
              </div>
            </div>

            <div
              onClick={() => onSelectTab && onSelectTab('dataset-2')}
              className="py-1.5 flex items-center justify-between hover:bg-slate-50 px-1 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9.5px] font-bold px-1 rounded bg-slate-100 text-slate-700">#2</span>
                <span className="font-medium text-slate-800">ROW Penghijauan (Taman & Median)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-600">86 Izin • 34,2 Ha</span>
                <span className="text-emerald-700 font-bold text-[10px]">Aktif</span>
              </div>
            </div>

            <div
              onClick={() => onSelectTab && onSelectTab('dataset-3')}
              className="py-1.5 flex items-center justify-between hover:bg-slate-50 px-1 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9.5px] font-bold px-1 rounded bg-slate-100 text-slate-700">#3</span>
                <span className="font-medium text-slate-800">Jaringan Jalan Eksisting (LKONOF)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-600">542,8 Km • 89.4% Mantap</span>
                <span className="text-emerald-700 font-bold text-[10px]">Aktif</span>
              </div>
            </div>

            <div
              onClick={() => onSelectTab && onSelectTab('dataset-4')}
              className="py-1.5 flex items-center justify-between hover:bg-slate-50 px-1 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9.5px] font-bold px-1 rounded bg-slate-100 text-slate-700">#4</span>
                <span className="font-medium text-slate-800">Progres Pekerjaan Konstruksi (Kurva S)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-600">Fisik 78.8% • Uang 73.4%</span>
                <span className="text-emerald-700 font-bold text-[10px]">Aktif</span>
              </div>
            </div>

            <div
              onClick={() => onSelectTab && onSelectTab('dataset-5')}
              className="py-1.5 flex items-center justify-between hover:bg-slate-50 px-1 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9.5px] font-bold px-1 rounded bg-slate-100 text-slate-700">#5</span>
                <span className="font-medium text-slate-800">Pematangan Tanah BSW (Cut & Fill)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-600">280 Ha • 4,27 Juta m³</span>
                <span className="text-emerald-700 font-bold text-[10px]">Aktif</span>
              </div>
            </div>

            <div
              onClick={() => onSelectTab && onSelectTab('dataset-6')}
              className="py-1.5 flex items-center justify-between hover:bg-slate-50 px-1 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9.5px] font-bold px-1 rounded bg-slate-100 text-slate-700">#6</span>
                <span className="font-medium text-slate-800">Pembangunan Infrastruktur (Paket Fisik)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-600">58 Paket • Rp 2,84 T</span>
                <span className="text-emerald-700 font-bold text-[10px]">Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
