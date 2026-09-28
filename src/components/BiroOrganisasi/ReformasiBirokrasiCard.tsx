import React, { useState } from 'react';
import {
  Award,
  Radar as RadarIcon,
  Table as TableIcon,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  Info,
  ShieldCheck,
  Scale,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

export interface RbComponent {
  id: string;
  no: number;
  nama: string;
  singkatan: string;
  bobot: number; // in percent / points
  target: number;
  nilai: number;
  capaianPersen: number;
  indeksAspek: number; // 0.0 - 1.0 ratio
  status: string;
  statusColor: string;
  deskripsi: string;
  subKomponen: { nama: string; bobot: number; nilai: number }[];
  rekomendasi: string;
}

export const REFORMASI_BIROKRASI_8_KOMPONEN: RbComponent[] = [
  {
    id: 'rb-1-perubahan',
    no: 1,
    nama: 'Manajemen Perubahan',
    singkatan: 'Manajemen Perubahan',
    bobot: 5.0,
    target: 4.0,
    nilai: 4.15,
    capaianPersen: 83.0,
    indeksAspek: 0.83,
    status: 'Sangat Baik',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    deskripsi: 'Pembangunan Zona Integritas (WBK/WBBM), pembentukan Tim Reformasi Birokrasi terpadu, Road Map RB BP Batam, dan internalisasi Core Values ASN BerAKHLAK.',
    subKomponen: [
      { nama: 'Tim RB & Pengawalan Road Map', bobot: 2.0, nilai: 1.70 },
      { nama: 'Pembangunan Zona Integritas Menuju WBK/WBBM', bobot: 1.5, nilai: 1.25 },
      { nama: 'Internalisasi Budaya Kerja BerAKHLAK', bobot: 1.5, nilai: 1.20 },
    ],
    rekomendasi: 'Perluas unit kerja berpredikat WBK ke sektor logistik pelabuhan dan bandara.',
  },
  {
    id: 'rb-2-deregulasi',
    no: 2,
    nama: 'Deregulasi & Simplifikasi Kebijakan',
    singkatan: 'Deregulasi Kebijakan',
    bobot: 5.0,
    target: 3.8,
    nilai: 4.10,
    capaianPersen: 82.0,
    indeksAspek: 0.82,
    status: 'Sangat Baik',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    deskripsi: 'Penataan regulasi internal, harmonisasi peraturan perundang-undangan (Perka/Kepka), debirokratisasi perizinan investasi, dan kemudahan berusaha di Kawasan Perdagangan Bebas.',
    subKomponen: [
      { nama: 'Harmonisasi & Simplifikasi Perka BP Batam', bobot: 2.5, nilai: 2.10 },
      { nama: 'Deregulasi Perizinan Investasi KPBPBB/KEK', bobot: 2.5, nilai: 2.00 },
    ],
    rekomendasi: 'Lakukan deregulasi berkala terhadap SOP layanan lahan dan kepelabuhanan.',
  },
  {
    id: 'rb-3-kelembagaan',
    no: 3,
    nama: 'Penataan dan Penguatan Organisasi (Kelembagaan)',
    singkatan: 'Kelembagaan Organisasi',
    bobot: 6.0,
    target: 4.6,
    nilai: 4.95,
    capaianPersen: 82.5,
    indeksAspek: 0.825,
    status: 'Sangat Baik',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    deskripsi: 'Evaluasi kelembagaan mandiri & MenPAN-RB, penataan struktur organisasi yang agile, efisien, dan proporsional, serta penguatan tata kelola 4 badan usaha komersial.',
    subKomponen: [
      { nama: 'Evaluasi Kelembagaan (Kematangan Struktur)', bobot: 3.0, nilai: 2.50 },
      { nama: 'Penataan SOTK Proporsional & Unit Bisnis BLU', bobot: 3.0, nilai: 2.45 },
    ],
    rekomendasi: 'Finalisasi restrukturisasi tata laksana unit usaha guna mempercepat kemandirian BLU.',
  },
  {
    id: 'rb-4-tatalaksana',
    no: 4,
    nama: 'Penataan Tata Laksana (Proses Bisnis & SPBE)',
    singkatan: 'Tata Laksana & SPBE',
    bobot: 7.0,
    target: 5.5,
    nilai: 5.82,
    capaianPersen: 83.14,
    indeksAspek: 0.8314,
    status: 'Sangat Baik',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    deskripsi: 'Penyusunan Peta Proses Bisnis terintegrasi, digitalisasi SOP administrasi perkantoran, dan implementasi Arsitektur Sistem Pemerintahan Berbasis Elektronik (SPBE).',
    subKomponen: [
      { nama: 'Peta Proses Bisnis & SOP Digital Terintegrasi', bobot: 3.5, nilai: 2.92 },
      { nama: 'Arsitektur SPBE & Integrasi Aplikasi Layanan', bobot: 3.5, nilai: 2.90 },
    ],
    rekomendasi: 'Tingkatkan integrasi antar aplikasi perizinan ibm.bpbatam.go.id dengan OSS RBA.',
  },
  {
    id: 'rb-5-sdm',
    no: 5,
    nama: 'Penataan Sistem Manajemen SDM Aparatur',
    singkatan: 'Manajemen SDM Merit',
    bobot: 10.0,
    target: 8.0,
    nilai: 8.56,
    capaianPersen: 85.6,
    indeksAspek: 0.856,
    status: 'Sangat Baik',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    deskripsi: 'Penerapan Sistem Merit Kategori IV (342.5 Poin), manajemen talenta pegawai berbasis merit, penilaian kinerja SKP terukur, dan program pengembangan kompetensi berkelanjutan BidaLearn.',
    subKomponen: [
      { nama: 'Penerapan Sistem Merit & Talent Pool', bobot: 5.0, nilai: 4.35 },
      { nama: 'Manajemen Kinerja SKP & Kompetensi Diklat Pegawai', bobot: 5.0, nilai: 4.21 },
    ],
    rekomendasi: 'Pertahankan raihan Sistem Merit Kategori IV dan perluas sertifikasi keahlian teknis.',
  },
  {
    id: 'rb-6-akuntabilitas',
    no: 6,
    nama: 'Penguatan Akuntabilitas Kinerja',
    singkatan: 'Akuntabilitas SAKIP',
    bobot: 10.0,
    target: 8.0,
    nilai: 8.27,
    capaianPersen: 82.7,
    indeksAspek: 0.827,
    status: 'Sangat Baik',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    deskripsi: 'Penerapan SAKIP menyeluruh (Nilai SAKIP 82.68 Predikat A), cascading sasaran Perkin hingga level individu, serta efektivitas dan efisiensi alokasi anggaran berbasis hasil (result-oriented).',
    subKomponen: [
      { nama: 'Kualitas Dokumen Perencanaan & Perjanjian Kinerja', bobot: 5.0, nilai: 4.15 },
      { nama: 'Pengukuran, Evaluasi & Pelaporan Kinerja (LAKIP)', bobot: 5.0, nilai: 4.12 },
    ],
    rekomendasi: 'Tingkatkan kualitas evaluasi internal SAKIP di tingkat direktorat teknis dan biro.',
  },
  {
    id: 'rb-7-pengawasan',
    no: 7,
    nama: 'Penguatan Pengawasan',
    singkatan: 'Pengawasan & SPIP',
    bobot: 10.0,
    target: 8.0,
    nilai: 8.42,
    capaianPersen: 84.2,
    indeksAspek: 0.842,
    status: 'Sangat Baik',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    deskripsi: 'Maturitas SPIP Terintegrasi (3.42 Level 3), tingkat kepatuhan LHKPN 100%, Whistleblowing System (WBS), pengendalian gratifikasi, dan Manajemen Risiko Indeks (MRI 3.35).',
    subKomponen: [
      { nama: 'Maturitas SPIP Terintegrasi & Manajemen Risiko', bobot: 5.0, nilai: 4.22 },
      { nama: 'Kepatuhan LHKPN, Pengendalian Gratifikasi & WBS', bobot: 5.0, nilai: 4.20 },
    ],
    rekomendasi: 'Dorong pemutakhiran piagam register risiko unit usaha secara kuartalan.',
  },
  {
    id: 'rb-8-pelayanan',
    no: 8,
    nama: 'Peningkatan Kualitas Pelayanan Publik',
    singkatan: 'Pelayanan Publik & PEKPPP',
    bobot: 10.0,
    target: 8.5,
    nilai: 8.87,
    capaianPersen: 88.7,
    indeksAspek: 0.887,
    status: 'Sangat Baik',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    deskripsi: 'Evaluasi PEKPPP Nasional (4.38 Kategori A-), Survei Kepuasan Masyarakat SKM (88.62 Mutu A), inovasi pelayanan PTSP, RSBP & SPAM, serta penyelesaian pengaduan SP4N-LAPOR! 96.15%.',
    subKomponen: [
      { nama: 'Standar Pelayanan Publik & Hasil Evaluasi PEKPPP', bobot: 5.0, nilai: 4.45 },
      { nama: 'Indeks Kepuasan Masyarakat (SKM) & Penanganan Aduan', bobot: 5.0, nilai: 4.42 },
    ],
    rekomendasi: 'Perluas kanal self-service online untuk percepatan SLA penerbitan izin investasi.',
  },
];

export const STANDAR_MENPANRB_RB = [
  { predikat: 'A', rentang: '80.00 - 90.00', keterangan: 'Memuaskan / Sangat Baik', mutu: 'Tata kelola pemerintahan yang baik telah terwujud pada sebagian besar unit kerja.' },
  { predikat: 'BB', rentang: '70.00 - 79.99', keterangan: 'Sangat Baik', mutu: 'Implementasi reformasi birokrasi telah berjalan dengan baik di sebagian besar unit kerja.' },
  { predikat: 'B', rentang: '60.00 - 69.99', keterangan: 'Baik', mutu: 'Implementasi reformasi birokrasi telah mulai terwujud di sebagian unit kerja.' },
  { predikat: 'CC', rentang: '50.00 - 59.99', keterangan: 'Cukup', mutu: 'Implementasi reformasi birokrasi masih terbatas pada pemenuhan dokumen formal.' },
  { predikat: 'C', rentang: '30.00 - 49.99', keterangan: 'Kurang', mutu: 'Implementasi reformasi birokrasi masih dalam tahap awal rintisan.' },
  { predikat: 'D', rentang: '0.00 - 29.99', keterangan: 'Sangat Kurang', mutu: 'Belum ada upaya reformasi birokrasi yang terstruktur dan terukur.' },
];

interface ReformasiBirokrasiCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const ReformasiBirokrasiCard: React.FC<ReformasiBirokrasiCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeTab, setActiveTab] = useState<'radar' | 'cards' | 'dataset' | 'kategori'>('radar');
  const [selectedAspek, setSelectedAspek] = useState<RbComponent>(REFORMASI_BIROKRASI_8_KOMPONEN[0]);

  // Aggregate stats
  const totalBobotPengungkit = REFORMASI_BIROKRASI_8_KOMPONEN.reduce((acc, curr) => acc + curr.bobot, 0); // 63.0
  const totalNilaiPengungkit = REFORMASI_BIROKRASI_8_KOMPONEN.reduce((acc, curr) => acc + curr.nilai, 0); // 53.14
  const nilaiKomponenHasil = 28.00; // Komponen Hasil RB Tematik / Pelayanan (skala 37)
  const totalIndeksRb = Number((totalNilaiPengungkit + nilaiKomponenHasil).toFixed(2)); // 81.14

  // Radar Chart coordinates math (8 vertices)
  const size = 320;
  const center = size / 2;
  const maxRadius = 115;
  const numAspects = REFORMASI_BIROKRASI_8_KOMPONEN.length;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI * 2 / numAspects) * index - Math.PI / 2;
    const r = maxRadius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Polygon for actual index values (0.0 - 1.0)
  const polygonPoints = REFORMASI_BIROKRASI_8_KOMPONEN
    .map((item, idx) => {
      const { x, y } = getCoordinates(idx, item.indeksAspek);
      return `${x},${y}`;
    })
    .join(' ');

  // Outer reference ring polygon (target = 1.0)
  const targetPoints = REFORMASI_BIROKRASI_8_KOMPONEN
    .map((_, idx) => {
      const { x, y } = getCoordinates(idx, 1.0);
      return `${x},${y}`;
    })
    .join(' ');

  // Mid reference ring polygon (baseline = 0.75)
  const midPoints = REFORMASI_BIROKRASI_8_KOMPONEN
    .map((_, idx) => {
      const { x, y } = getCoordinates(idx, 0.75);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* HEADER WITH AGGREGATE EXECUTIVE STATUS */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 via-cyan-50/20 to-slate-50/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Penilaian Indeks Reformasi Birokrasi BP Batam (8 Area Perubahan MenPAN-RB)
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              PermenPAN-RB No. 25 &amp; 26 · Agregasi 8 Area Perubahan: Manajemen Perubahan, Deregulasi Kebijakan, Kelembagaan, Tata Laksana, Manajemen SDM, Akuntabilitas Kinerja, Pengawasan, dan Pelayanan Publik.
            </p>
          </div>

          {/* TOTAL SCORE SUMMARY BADGE */}
          <div className="flex items-center gap-3 bg-white p-2.5 sm:p-3 rounded-xl border border-cyan-200/80 shadow-2xs">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Total Skor Indeks RB
              </span>
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className="text-xl sm:text-2xl font-black font-mono text-cyan-800 tabular-nums">
                  {totalIndeksRb.toFixed(2)}
                </span>
                <span className="text-xs font-mono text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Predikat RB Nasional
              </span>
              <span className="text-xs sm:text-sm font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Predikat A (Sangat Baik)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Target Perkin: BB (80.00)
              </span>
            </div>
          </div>
        </div>

        {/* VIEW TABS */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-200/70">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'radar'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RadarIcon className="w-3.5 h-3.5 text-cyan-600" />
              <span>Radar Chart (8 Area)</span>
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'cards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kartu Rincian Komponen</span>
            </button>
            <button
              onClick={() => setActiveTab('dataset')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'dataset'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
              <span>Tabel Master Dataset (8 Area)</span>
            </button>
            <button
              onClick={() => setActiveTab('kategori')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'kategori'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Tabel Kategori Indeks RB MenPAN-RB</span>
            </button>
          </div>

          <button
            onClick={() => onOpenFormulaModal?.('ikp-1-rb')}
            className="flex items-center gap-1 text-xs text-cyan-800 hover:text-cyan-950 font-medium transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Kamus Rumus &amp; Metodologi RB</span>
          </button>
        </div>
      </div>

      {/* TAB 1: RADAR SPIDER CHART + DETAIL PANEL */}
      {activeTab === 'radar' && (
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG RADAR CHART (8 ASPEK) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
                  {/* Circular & polygon guidelines */}
                  <polygon
                    points={targetPoints}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <polygon
                    points={midPoints}
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="0.8"
                  />

                  {/* Axes lines */}
                  {REFORMASI_BIROKRASI_8_KOMPONEN.map((_, idx) => {
                    const { x, y } = getCoordinates(idx, 1.0);
                    return (
                      <line
                        key={`axis-${idx}`}
                        x1={center}
                        y1={center}
                        x2={x}
                        y2={y}
                        stroke="#E2E8F0"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Actual Achieved Polygon */}
                  <polygon
                    points={polygonPoints}
                    fill="rgba(2, 132, 199, 0.22)"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />

                  {/* Vertices Interactive Points */}
                  {REFORMASI_BIROKRASI_8_KOMPONEN.map((aspek, idx) => {
                    const { x, y } = getCoordinates(idx, aspek.indeksAspek);
                    const isSelected = selectedAspek.id === aspek.id;

                    return (
                      <g key={aspek.id} className="cursor-pointer">
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 6 : 4}
                          fill={isSelected ? '#0369A1' : '#0284C7'}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          className="transition-all duration-200 hover:scale-125"
                          onClick={() => setSelectedAspek(aspek)}
                        />
                      </g>
                    );
                  })}

                  {/* Labels on outer edge */}
                  {REFORMASI_BIROKRASI_8_KOMPONEN.map((aspek, idx) => {
                    const { x, y } = getCoordinates(idx, 1.18);
                    const isSelected = selectedAspek.id === aspek.id;

                    return (
                      <text
                        key={`label-${aspek.id}`}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className={`text-[9px] cursor-pointer transition-colors ${
                          isSelected ? 'fill-cyan-800 font-bold' : 'fill-slate-500 hover:fill-slate-800'
                        }`}
                        onClick={() => setSelectedAspek(aspek)}
                      >
                        {aspek.no}. {aspek.singkatan}
                      </text>
                    );
                  })}
                </svg>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-slate-500 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-cyan-600 rounded-full inline-block" />
                  Capaian Realisasi (81.14 / Predikat A)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-slate-300 border-dashed inline-block" />
                  Target Perkin (100% Pemenuhan)
                </span>
              </div>
            </div>

            {/* DETAIL PANEL FOR SELECTED ASPEK */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl border border-cyan-100 bg-cyan-50/30 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 uppercase">
                      AREA PERUBAHAN #{selectedAspek.no}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {selectedAspek.nama}
                    </h3>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${selectedAspek.statusColor}`}>
                    {selectedAspek.status} ({selectedAspek.capaianPersen.toFixed(1)}%)
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedAspek.deskripsi}
                </p>

                {/* Score breakdown metrics */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-cyan-100">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Bobot Evaluasi</span>
                    <span className="text-sm font-black font-mono text-slate-800">
                      {selectedAspek.bobot.toFixed(1)}%
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Target Poin</span>
                    <span className="text-sm font-black font-mono text-slate-800">
                      {selectedAspek.target.toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-emerald-700 font-bold block">Realisasi Nilai</span>
                    <span className="text-sm font-black font-mono text-emerald-700">
                      {selectedAspek.nilai.toFixed(2)} Poin
                    </span>
                  </div>
                </div>

                {/* Sub-komponen Breakdown */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10.5px] font-bold text-slate-700 uppercase font-mono block">
                    Rincian Sub-Komponen Penilaian:
                  </span>
                  <div className="space-y-1.5">
                    {selectedAspek.subKomponen.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-white p-2 rounded-lg border border-slate-200 text-xs flex items-center justify-between"
                      >
                        <span className="text-slate-700 text-[11px] font-medium">
                          {sub.nama}
                        </span>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-slate-400">Bobot {sub.bobot}%</span>
                          <span className="font-bold text-cyan-800 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-200">
                            {sub.nilai.toFixed(2)} Poin
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rekomendasi Perbaikan */}
                <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Rekomendasi Tindak Lanjut:</span>
                    <p className="text-[11px] text-amber-800 leading-snug">{selectedAspek.rekomendasi}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GRID OF 8 COMPONENT CARDS */}
      {activeTab === 'cards' && (
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {REFORMASI_BIROKRASI_8_KOMPONEN.map((aspek) => (
              <div
                key={aspek.id}
                onClick={() => setSelectedAspek(aspek)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  selectedAspek.id === aspek.id
                    ? 'border-cyan-500 bg-cyan-50/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      Area #{aspek.no}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${aspek.statusColor}`}>
                      {aspek.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {aspek.nama}
                  </h4>
                  <p className="text-[10.5px] text-slate-500 leading-snug line-clamp-2">
                    {aspek.deskripsi}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-[10.5px] text-slate-500 font-mono">Nilai Realisasi</span>
                    <span className="text-sm font-black text-cyan-800 font-mono">
                      {aspek.nilai.toFixed(2)}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">/ {aspek.bobot}%</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-600 rounded-full"
                      style={{ width: `${Math.min(aspek.capaianPersen, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Target: {aspek.target.toFixed(2)}</span>
                    <span className="text-emerald-700 font-bold">{aspek.capaianPersen.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DATASET TABLE (8 AREA) */}
      {activeTab === 'dataset' && (
        <div className="p-4 sm:p-5 overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase border-b border-slate-200">
              <tr>
                <th className="p-2.5 text-center w-12">No</th>
                <th className="p-2.5">Area Perubahan Reformasi Birokrasi</th>
                <th className="p-2.5 text-center">Bobot (%)</th>
                <th className="p-2.5 text-center">Target Poin</th>
                <th className="p-2.5 text-center">Realisasi Nilai</th>
                <th className="p-2.5 text-center">Capaian (%)</th>
                <th className="p-2.5 text-center">Status</th>
                <th className="p-2.5">Sub-Komponen Kunci</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {REFORMASI_BIROKRASI_8_KOMPONEN.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-2.5 text-center font-mono font-bold text-slate-500">
                    {row.no}
                  </td>
                  <td className="p-2.5 font-bold text-slate-800">
                    {row.nama}
                  </td>
                  <td className="p-2.5 text-center font-mono font-bold text-slate-700">
                    {row.bobot.toFixed(1)}%
                  </td>
                  <td className="p-2.5 text-center font-mono text-slate-600">
                    {row.target.toFixed(2)}
                  </td>
                  <td className="p-2.5 text-center font-mono font-black text-cyan-800">
                    {row.nilai.toFixed(2)}
                  </td>
                  <td className="p-2.5 text-center font-mono font-bold text-emerald-700">
                    {row.capaianPersen.toFixed(1)}%
                  </td>
                  <td className="p-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-[11px] text-slate-600 max-w-xs">
                    {row.subKomponen.map((s) => s.nama).join(' • ')}
                  </td>
                </tr>
              ))}
              {/* Summary Row */}
              <tr className="bg-slate-100/90 font-bold border-t-2 border-slate-300">
                <td colSpan={2} className="p-2.5 text-slate-900 font-mono">
                  TOTAL KOMPONEN PENGUNGKIT (8 AREA)
                </td>
                <td className="p-2.5 text-center font-mono">{totalBobotPengungkit.toFixed(1)}%</td>
                <td className="p-2.5 text-center font-mono">50.40</td>
                <td className="p-2.5 text-center font-mono text-cyan-900">{totalNilaiPengungkit.toFixed(2)}</td>
                <td className="p-2.5 text-center font-mono text-emerald-800">
                  {((totalNilaiPengungkit / totalBobotPengungkit) * 100).toFixed(1)}%
                </td>
                <td className="p-2.5 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-cyan-100 text-cyan-900 border border-cyan-300">
                    SANGAT BAIK
                  </span>
                </td>
                <td className="p-2.5 text-[11px] text-slate-500 font-mono">
                  + Komponen Hasil: 28.00 Poin = Total 81.14 (Predikat A)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: STANDAR KATEGORI MENPAN-RB */}
      {activeTab === 'kategori' && (
        <div className="p-4 sm:p-5 space-y-3">
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3 text-center w-24">Predikat</th>
                  <th className="p-3 text-center w-36">Rentang Nilai</th>
                  <th className="p-3 w-48">Keterangan Tingkat</th>
                  <th className="p-3">Makna &amp; Mutu Tata Kelola Instansi</th>
                  <th className="p-3 text-center w-36">Status BP Batam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {STANDAR_MENPANRB_RB.map((kat) => {
                  const isCurrent = kat.predikat === 'A';
                  return (
                    <tr
                      key={kat.predikat}
                      className={
                        isCurrent
                          ? 'bg-cyan-50/70 font-semibold border-l-4 border-l-cyan-600'
                          : 'hover:bg-slate-50/50'
                      }
                    >
                      <td className="p-3 text-center font-mono font-bold text-sm">
                        <span
                          className={`inline-block px-2.5 py-1 rounded ${
                            isCurrent
                              ? 'bg-cyan-700 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {kat.predikat}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-slate-800">
                        {kat.rentang}
                      </td>
                      <td className="p-3 font-bold text-slate-800">
                        {kat.keterangan}
                      </td>
                      <td className="p-3 text-slate-600 leading-relaxed text-[11.5px]">
                        {kat.mutu}
                      </td>
                      <td className="p-3 text-center">
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            81.14 (Aktif)
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono text-[11px]">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>Rujukan Regulasi: Peraturan Menteri PAN-RB No. 25 &amp; 26 Tahun 2020 tentang Petunjuk Pelaksanaan Evaluasi Reformasi Birokrasi</span>
            <span className="font-mono text-cyan-800 font-bold">Evaluasi KemenPAN-RB RI</span>
          </div>
        </div>
      )}

      {/* TABLEAU SHELVES SPECIFICATION */}
      <TableauShelvesBadge
        showMe="KPI Banner / Spider Radar & Multi-Area Scorecards"
        columns="[Area Perubahan RB], [Komponen Pengungkit & Hasil]"
        rows="SUM([Bobot]), AGG([Nilai Capaian]), AGG([Indeks RB])"
        color="[Predikat RB MenPAN-RB] / [Status Capaian]"
        detail="[Tahun], [Sub-Komponen], [Rekomendasi]"
        text="SUM([Nilai]) & AVG([Capaian Persen])"
        calculatedField="[Indeks RB] = SUM([Nilai Pengungkit 8 Area]) + [Nilai Hasil RB Tematik]"
        compact={true}
      />
    </div>
  );
};
