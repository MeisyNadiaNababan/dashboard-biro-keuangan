import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  X,
  ExternalLink,
  DollarSign,
  Maximize2,
  Minimize2,
  Search,
} from 'lucide-react';
import { DATASET_6_PEMBANGUNAN_INFRASTRUKTUR } from './infrastrukturData';
import { ProyekInfrastrukturItem } from './types';

interface PetaInfrastrukturCardProps {
  selectedWilayah: string;
  selectedJenisPekerjaan: string;
  onSelectWilayah: (wilayah: string) => void;
}

export const PetaInfrastrukturCard: React.FC<PetaInfrastrukturCardProps> = ({
  selectedWilayah,
  selectedJenisPekerjaan,
  onSelectWilayah,
}) => {
  const [activeProject, setActiveProject] = useState<ProyekInfrastrukturItem | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('Semua');

  // Filter projects for the map
  const projects = DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.filter((p) => {
    const matchWilayah = selectedWilayah === 'Semua' || p.wilayah === selectedWilayah;
    const matchJenis =
      selectedJenisPekerjaan === 'Semua' ||
      p.jenisPekerjaan.toLowerCase().includes(selectedJenisPekerjaan.toLowerCase());
    const matchStatus = statusFilter === 'Semua' || p.statusProgres === statusFilter;
    return matchWilayah && matchJenis && matchStatus;
  });

  const getStatusColor = (status: ProyekInfrastrukturItem['statusProgres']) => {
    switch (status) {
      case 'Ahead':
        return '#10b981'; // emerald
      case 'On Schedule':
        return '#0284c7'; // sky
      case 'Waspada':
        return '#f59e0b'; // amber
      case 'Kritis (SCM)':
        return '#ef4444'; // rose
      case 'Selesai':
        return '#6366f1'; // indigo
      default:
        return '#64748b';
    }
  };

  const wilayahBadges = [
    { name: 'Semua', count: DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.length },
    { name: 'Batam Centre', count: DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.filter(p => p.wilayah === 'Batam Centre').length },
    { name: 'Batu Ampar', count: DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.filter(p => p.wilayah === 'Batu Ampar').length },
    { name: 'Sekupang', count: DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.filter(p => p.wilayah === 'Sekupang').length },
    { name: 'Nongsa', count: DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.filter(p => p.wilayah === 'Nongsa').length },
    { name: 'Mukakuning', count: DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.filter(p => p.wilayah === 'Mukakuning').length },
    { name: 'Rempang', count: DATASET_6_PEMBANGUNAN_INFRASTRUKTUR.filter(p => p.wilayah === 'Rempang').length },
  ];

  return (
    <div className={`bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 mb-4 font-sans transition-all ${isExpanded ? 'ring-2 ring-sky-500' : ''}`}>
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                DATASET NO. 6
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                Peta Spasial Sebaran Proyek Fisik BP Batam
              </h3>
            </div>
            <p className="text-[10.5px] text-slate-500">
              Sebaran titik lokasi proyek infrastruktur strategis di Pulau Batam, Nongsa &amp; Rempang
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[10.5px] text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 px-2 py-1 rounded-md flex items-center gap-1 transition-colors"
          >
            {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            <span>{isExpanded ? 'Kecilkan' : 'Perbesar'}</span>
          </button>
        </div>
      </div>

      {/* Quick Wilayah Selector Pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1.5 mb-2 text-[10.5px]">
        <span className="text-slate-400 font-medium shrink-0 mr-1 flex items-center gap-0.5 text-[10px]">
          <MapPin className="w-3 h-3 text-sky-600" /> Wilayah:
        </span>
        {wilayahBadges.map((badge) => (
          <button
            key={badge.name}
            onClick={() => onSelectWilayah(badge.name)}
            className={`px-2 py-0.5 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedWilayah === badge.name
                ? 'bg-sky-600 text-white shadow-2xs font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>{badge.name}</span>
            <span
              className={`text-[9px] px-1 py-0.1 rounded-full ${
                selectedWilayah === badge.name ? 'bg-sky-700 text-sky-100' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {badge.count}
            </span>
          </button>
        ))}
      </div>

      {/* Main Map Visualization Area */}
      <div className="relative w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-inner">
        {/* Map Header / Floating Legend */}
        <div className="absolute top-2 left-2 z-20 bg-slate-900/85 backdrop-blur-md border border-slate-700/80 p-2 rounded-lg text-white text-[10px] max-w-xs shadow-md">
          <div className="font-semibold text-slate-200 mb-1 flex items-center justify-between gap-2">
            <span>Legenda Status Proyek</span>
            <span className="text-[9px] text-sky-400 font-mono font-bold">{projects.length} Titik</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-300">Ahead</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-slate-300">On Schedule</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-slate-300">Waspada</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-slate-300">SCM Kritis</span>
            </div>
          </div>
        </div>

        {/* Compass Rose */}
        <div className="absolute top-2 right-2 z-20 bg-slate-900/80 backdrop-blur-sm border border-slate-700 w-7 h-7 rounded-full flex flex-col items-center justify-center text-[9px] text-slate-300 shadow">
          <span className="font-bold text-rose-400 leading-none">U</span>
          <span className="text-[7px] text-slate-400">▲</span>
        </div>

        {/* SVG Map of Batam */}
        <div className={`relative w-full ${isExpanded ? 'h-[400px]' : 'h-[230px] sm:h-[260px]'}`}>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Water Background / Straits */}
            <defs>
              <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#334155" strokeWidth="0.2" opacity="0.3" />
              </pattern>
            </defs>

            <rect width="100" height="100" fill="url(#oceanGradient)" />
            <rect width="100" height="100" fill="url(#gridPattern)" />

            {/* Singapore Strait Label */}
            <text x="50" y="8" fill="#475569" fontSize="2.2" textAnchor="middle" letterSpacing="0.3" fontWeight="bold">
              SELAT SINGAPURA (SINGAPORE STRAIT)
            </text>

            {/* Batam Island Vector Mainland Path */}
            <path
              d="M 38 28
                 C 42 22, 50 25, 60 26
                 C 70 27, 78 30, 78 38
                 C 77 48, 72 52, 68 55
                 C 64 58, 62 64, 58 68
                 C 52 70, 44 68, 40 62
                 C 34 56, 26 54, 25 45
                 C 24 38, 30 32, 38 28 Z"
              fill="#1e293b"
              stroke="#0284c7"
              strokeWidth="0.6"
              strokeOpacity="0.7"
              className="transition-all hover:fill-slate-800"
            />

            {/* Pulau Rempang & Galang Vector Path */}
            <path
              d="M 70 70
                 C 76 68, 85 72, 84 82
                 C 83 90, 76 96, 72 94
                 C 66 92, 68 80, 70 70 Z"
              fill="#1e293b"
              stroke="#0284c7"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />

            {/* Jembatan Barelang Connection Arc */}
            <path
              d="M 60 67 Q 66 68 70 72"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="0.5"
              strokeDasharray="1,1"
            />
            <text x="66" y="70" fill="#cbd5e1" fontSize="1.6" textAnchor="middle">
              Trans Barelang
            </text>

            {/* Region Labels */}
            <text x="43" y="32" fill="#94a3b8" fontSize="2.0" fontWeight="bold">
              Batu Ampar
            </text>
            <text x="55" y="42" fill="#38bdf8" fontSize="2.2" fontWeight="bold">
              Batam Centre
            </text>
            <text x="26" y="44" fill="#94a3b8" fontSize="2.0" fontWeight="bold">
              Sekupang
            </text>
            <text x="70" y="36" fill="#94a3b8" fontSize="2.0" fontWeight="bold">
              Nongsa / KEK
            </text>
            <text x="47" y="59" fill="#94a3b8" fontSize="2.0" fontWeight="bold">
              Mukakuning
            </text>
            <text x="76" y="84" fill="#fbbf24" fontSize="2.0" fontWeight="bold">
              Rempang Eco-City
            </text>

            {/* Key Road Arteries (Simplified Overlay lines) */}
            <path
              d="M 43 35 L 53 43 L 50 56 L 68 70"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.4"
              strokeOpacity="0.5"
            />
            <path
              d="M 28 46 L 42 45 L 53 43 L 68 36 L 73 40"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.4"
              strokeOpacity="0.5"
            />

            {/* Plotted Project Pins */}
            {projects.map((proj) => {
              const color = getStatusColor(proj.statusProgres);
              const isHoveredOrActive = activeProject?.id === proj.id;

              return (
                <g
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className="cursor-pointer group"
                >
                  {/* Pulse ring for critical/highlighted items */}
                  {proj.statusProgres === 'Kritis (SCM)' && (
                    <circle
                      cx={proj.koordinat.x}
                      cy={proj.koordinat.y}
                      r="3.5"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="0.4"
                      className="animate-ping"
                      opacity="0.75"
                    />
                  )}

                  {/* Outer Pin Halo */}
                  <circle
                    cx={proj.koordinat.x}
                    cy={proj.koordinat.y}
                    r={isHoveredOrActive ? "3.2" : "2.2"}
                    fill={color}
                    fillOpacity="0.25"
                    className="transition-all duration-300"
                  />

                  {/* Core Pin Dot */}
                  <circle
                    cx={proj.koordinat.x}
                    cy={proj.koordinat.y}
                    r={isHoveredOrActive ? "1.8" : "1.2"}
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth="0.4"
                    className="transition-all duration-300 shadow-md"
                  />

                  {/* Mini Text Label */}
                  <text
                    x={proj.koordinat.x}
                    y={proj.koordinat.y - 2.5}
                    fill="#f1f5f9"
                    fontSize="1.6"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="opacity-90 pointer-events-none drop-shadow-md"
                  >
                    {proj.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Project Quick Drawer/Modal */}
        {activeProject && (
          <div className="absolute bottom-3 left-3 right-3 z-30 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-4 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${getStatusColor(activeProject.statusProgres)}30`,
                      color: getStatusColor(activeProject.statusProgres),
                      border: `1px solid ${getStatusColor(activeProject.statusProgres)}80`,
                    }}
                  >
                    {activeProject.statusProgres} • Deviasi: {activeProject.deviasi > 0 ? `+${activeProject.deviasi}` : activeProject.deviasi}%
                  </span>
                  <span className="text-xs text-slate-400">
                    {activeProject.kodePaket}
                  </span>
                  <span className="text-xs bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono">
                    {activeProject.wilayah}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-100">
                  {activeProject.namaPekerjaan}
                </h4>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Metric Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 mb-2">
              <div>
                <span className="text-slate-400 block text-[10px]">Nilai Kontrak</span>
                <span className="font-bold text-sky-400">
                  Rp {(activeProject.nilaiKontrak / 1000000000).toFixed(2)} Miliar
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Progres Fisik</span>
                <span className="font-bold text-emerald-400">
                  {activeProject.progresRealisasi}%{' '}
                  <span className="text-slate-400 text-[10px]">
                    (Rencana {activeProject.progresRencana}%)
                  </span>
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Realisasi Keuangan</span>
                <span className="font-bold text-slate-200">
                  {activeProject.progresKeuangan}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Penyedia Jasa (Kontraktor)</span>
                <span className="font-medium text-slate-300 truncate block">
                  {activeProject.kontraktor}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 line-clamp-2">
              <strong className="text-sky-300">Catatan Lapangan:</strong> {activeProject.keterangan}
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <span className="flex items-center gap-1 text-[11px]">
          <MapPin className="w-3.5 h-3.5 text-sky-600" /> Klik pada pin proyek di peta untuk melihat ringkasan kontrak, kurva S, dan catatan teknis.
        </span>
        <span className="text-[11px] text-slate-400 font-mono">
          Koordinat WGS84 • Batam Infrastructure Spatial Layer
        </span>
      </div>
    </div>
  );
};
