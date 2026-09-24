import React, { useState } from 'react';
import {
  Package,
  TrendingUp,
  BarChart3,
  Table as TableIcon,
  Search,
  ArrowRight,
  Warehouse,
  Boxes,
  Truck,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Plane,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ComposedChart,
  Area,
} from 'recharts';
import { TOTAL_KARGO_TON } from './bandaraData';
import { BandaraVisualHeader } from './BandaraVisualHeader';

interface Dataset5EmpuKargoCardProps {
  onOpenFormula: () => void;
}

// Data Tren Bulanan Muatan EMPU Hang Nadim (Kargo, Bagasi, Pos)
const MONTHLY_EMPU_DATA = [
  { bulan: 'Jan', kargoInboundTon: 1980, kargoOutboundTon: 1640, totalKargoTon: 3620, posKg: 84000, bagasiTon: 3140 },
  { bulan: 'Feb', kargoInboundTon: 1870, kargoOutboundTon: 1540, totalKargoTon: 3410, posKg: 79000, bagasiTon: 2890 },
  { bulan: 'Mar', kargoInboundTon: 2060, kargoOutboundTon: 1730, totalKargoTon: 3790, posKg: 85000, bagasiTon: 3080 },
  { bulan: 'Apr (Mudik)', kargoInboundTon: 2280, kargoOutboundTon: 1900, totalKargoTon: 4180, posKg: 98000, bagasiTon: 4210 },
  { bulan: 'Mei', kargoInboundTon: 2090, kargoOutboundTon: 1730, totalKargoTon: 3820, posKg: 86000, bagasiTon: 3260 },
  { bulan: 'Jun (Libur)', kargoInboundTon: 2170, kargoOutboundTon: 1810, totalKargoTon: 3980, posKg: 91000, bagasiTon: 3840 },
  { bulan: 'Jul', kargoInboundTon: 2210, kargoOutboundTon: 1840, totalKargoTon: 4050, posKg: 93000, bagasiTon: 3990 },
  { bulan: 'Agu', kargoInboundTon: 2130, kargoOutboundTon: 1780, totalKargoTon: 3910, posKg: 88000, bagasiTon: 3410 },
  { bulan: 'Sep', kargoInboundTon: 2050, kargoOutboundTon: 1700, totalKargoTon: 3750, posKg: 85000, bagasiTon: 3120 },
  { bulan: 'Okt', kargoInboundTon: 2120, kargoOutboundTon: 1770, totalKargoTon: 3890, posKg: 87000, bagasiTon: 3250 },
  { bulan: 'Nov', kargoInboundTon: 2140, kargoOutboundTon: 1780, totalKargoTon: 3920, posKg: 88000, bagasiTon: 3200 },
  { bulan: 'Des (Nataru)', kargoInboundTon: 2430, kargoOutboundTon: 2020, totalKargoTon: 4450, posKg: 104000, bagasiTon: 4540 },
];

// Data Operator EMPU & Regulated Agent Resmi di Batam
const EMPU_OPERATOR_DATA = [
  { nama: 'PT Pos Logistik Indonesia (Pos Udara)', tonase: 9480, sharePersen: 20.48, armada: 'Freighter & Belly Cargo', jenisLayanan: 'Express Mail & General Cargo', utilisasiGudang: '84%' },
  { nama: 'PT JNE Cargo Batam (Jalur Nugraha Ekakurir)', tonase: 8620, sharePersen: 18.63, armada: 'Belly Cargo LCC/FSC', jenisLayanan: 'E-commerce & Parcel Logistik', utilisasiGudang: '88%' },
  { nama: 'PT Tri-M.G Intra Asia Airlines', tonase: 7150, sharePersen: 15.45, armada: 'Boeing 737-400F Dedicated', jenisLayanan: 'Heavy Freight & Industrial Spares', utilisasiGudang: '76%' },
  { nama: 'PT Cardig Air / Cardig Express', tonase: 6240, sharePersen: 13.48, armada: 'Freighter B737-300F', jenisLayanan: 'Cross-Border Batam-SG / Kargo Industri', utilisasiGudang: '72%' },
  { nama: 'PT Lion Parcel / Lion Cargo', tonase: 5890, sharePersen: 12.73, armada: 'Lion Group Belly Cargo', jenisLayanan: 'Domestik High Density Cargo', utilisasiGudang: '81%' },
  { nama: 'PT InJourney Aviation Services (Angkasa Pura Kargo)', tonase: 4720, sharePersen: 10.20, armada: 'Garuda & Citilink Belly', jenisLayanan: 'Regulated Agent & Cool Room Fresh', utilisasiGudang: '70%' },
  { nama: 'PT Asialink Kargo Mandiri & My Indo Airlines', tonase: 4180, sharePersen: 9.03, armada: 'Dedicated Cargo Charter', jenisLayanan: 'Dangerous Goods & Project Cargo', utilisasiGudang: '68%' },
];

// Manifest Detail Sampel Transaksi EMPU Kargo Sesuai Atribut Satu Data Hal. 12
const EMPU_DETAIL_MANIFEST = [
  {
    id: 'empu-01',
    tanggal: '2026-04-18',
    waktu: '04:30 WIB',
    noFlight: 'CRG-810',
    operator: 'Cardig Air / PT Cardig Express',
    asl: 'Jakarta (HLP)',
    tjn: 'Batam (BTH)',
    arah: 'Arrival (Inbound)',
    jenis: 'Domestik',
    typePesawat: 'Boeing 737-400F',
    registrasi: 'PK-CLG',
    kursi: 0,
    kargoKg: 14800,
    bagasiKg: 0,
    posKg: 1200,
    komoditi: 'Komponen Elektronik & Suku Cadang Mesin Industri',
    status: 'Clearance Selesai',
  },
  {
    id: 'empu-02',
    tanggal: '2026-04-18',
    waktu: '08:15 WIB',
    noFlight: 'JT-378',
    operator: 'Lion Air / Lion Parcel',
    asl: 'Batam (BTH)',
    tjn: 'Jakarta (CGK)',
    arah: 'Departure (Outbound)',
    jenis: 'Domestik',
    typePesawat: 'Boeing 737-900ER',
    registrasi: 'PK-LKP',
    kursi: 215,
    kargoKg: 1450,
    bagasiKg: 2840,
    posKg: 45,
    komoditi: 'Paket E-Commerce & Hasil Konveksi Batam',
    status: 'Muat Pesawat',
  },
  {
    id: 'empu-03',
    tanggal: '2026-04-18',
    waktu: '09:30 WIB',
    noFlight: 'GA-152',
    operator: 'Garuda Indonesia / InJourney Cargo',
    asl: 'Jakarta (CGK)',
    tjn: 'Batam (BTH)',
    arah: 'Arrival (Inbound)',
    jenis: 'Domestik',
    typePesawat: 'Boeing 737-800 NG',
    registrasi: 'PK-GFD',
    kursi: 162,
    kargoKg: 1890,
    bagasiKg: 2210,
    posKg: 110,
    komoditi: 'Vaksin, Farmasi & Dokumen Perbankan',
    status: 'Cold Storage Handling',
  },
  {
    id: 'empu-04',
    tanggal: '2026-04-18',
    waktu: '11:20 WIB',
    noFlight: 'AK-412',
    operator: 'AirAsia Berhad / Teleport',
    asl: 'Kuala Lumpur (KUL)',
    tjn: 'Batam (BTH)',
    arah: 'Arrival (Inbound)',
    jenis: 'Internasional',
    typePesawat: 'Airbus A320-200',
    registrasi: '9M-AGH',
    kursi: 180,
    kargoKg: 640,
    bagasiKg: 2310,
    posKg: 0,
    komoditi: 'Barang Kiriman Impor & Sparepart Maritim',
    status: 'Pemeriksaan Bea Cukai',
  },
  {
    id: 'empu-05',
    tanggal: '2026-04-18',
    waktu: '13:45 WIB',
    noFlight: 'TMG-201',
    operator: 'Tri-M.G Intra Asia Airlines',
    asl: 'Batam (BTH)',
    tjn: 'Singapura (SIN)',
    arah: 'Departure (Outbound)',
    jenis: 'Internasional',
    typePesawat: 'Boeing 737-300F',
    registrasi: 'PK-TMA',
    kursi: 0,
    kargoKg: 12600,
    bagasiKg: 0,
    posKg: 850,
    komoditi: 'Produk Semikonduktor & Komponen PCB Batam',
    status: 'Clearance Ekspor',
  },
  {
    id: 'empu-06',
    tanggal: '2026-04-18',
    waktu: '16:00 WIB',
    noFlight: 'POS-104',
    operator: 'PT Pos Logistik Indonesia',
    asl: 'Surabaya (SUB)',
    tjn: 'Batam (BTH)',
    arah: 'Arrival (Inbound)',
    jenis: 'Domestik',
    typePesawat: 'Boeing 737-300F Cargo',
    registrasi: 'PK-POS',
    kursi: 0,
    kargoKg: 11200,
    bagasiKg: 0,
    posKg: 3400,
    komoditi: 'Kiriman Pos Kilat Khusus & Logistik UMKM',
    status: 'Bongkar Terminal',
  },
];

export const Dataset5EmpuKargoCard: React.FC<Dataset5EmpuKargoCardProps> = ({ onOpenFormula }) => {
  const [activeSheet, setActiveSheet] = useState<'grafik' | 'operator' | 'tabel'>('grafik');
  const [searchManifest, setSearchManifest] = useState('');
  const [filterArah, setFilterArah] = useState<string>('Semua');

  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  const filteredManifest = EMPU_DETAIL_MANIFEST.filter((item) => {
    if (filterArah !== 'Semua' && !item.arah.includes(filterArah)) return false;
    if (searchManifest.trim() !== '') {
      const q = searchManifest.toLowerCase();
      return (
        item.operator.toLowerCase().includes(q) ||
        item.noFlight.toLowerCase().includes(q) ||
        item.komoditi.toLowerCase().includes(q) ||
        item.asl.toLowerCase().includes(q) ||
        item.tjn.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs font-sans">
      {/* Visual Header sesuai Standar Dashboard Pembangunan Infrastruktur */}
      <BandaraVisualHeader
        datasetNumber={5}
        pdfPages="Hal. 12"
        title="EKSPEDISI MUATAN PESAWAT UDARA (EMPU) DI BATAM"
        visualName={
          activeSheet === 'grafik'
            ? 'Sheet 1: Grafik Tren Muatan Logistik Udara (Kargo Inbound/Outbound, Bagasi, Pos) Bulanan'
            : activeSheet === 'operator'
            ? 'Sheet 2: Kinerja Operator EMPU & Utilisasi Gudang Terminal Logistik Kargo'
            : 'Sheet 3: Tabel Detail Manifest Transaksi EMPU Logistik (Atribut Dokumen Satu Data Hal. 12)'
        }
        classification="TERBUKA"
        periode="PERTRIWULAN"
        attributes={[
          'TANGGAL PENERBANGAN',
          'WAKTU',
          'ASL',
          'TJN',
          'OPERATOR',
          'NOMOR PENERBANGAN',
          'TYPE PESAWAT',
          'A/D',
          'BAGASI',
          'KARGO',
          'POS',
        ]}
        rightControls={
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveSheet('grafik')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'grafik'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Sheet 1: Tren Muatan Kargo</span>
            </button>
            <button
              onClick={() => setActiveSheet('operator')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'operator'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Sheet 2: Operator EMPU &amp; Gudang</span>
            </button>
            <button
              onClick={() => setActiveSheet('tabel')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'tabel'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Sheet 3: Tabel Manifest EMPU</span>
            </button>
          </div>
        }
        onOpenFormula={onOpenFormula}
      />

      {/* Mini Executive Strip Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gradient-to-r from-amber-50/70 via-sky-50/40 to-slate-50 rounded-xl border border-amber-200/70 mb-4 text-xs">
        <div>
          <span className="text-slate-500 block text-[10.5px]">Total Kargo Udara (EMPU)</span>
          <span className="text-base font-mono font-black text-amber-950 block">{TOTAL_KARGO_TON.toLocaleString('id-ID')} Ton</span>
          <span className="text-[10px] text-amber-800 block mt-0.5">54% Inbound | 46% Outbound</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Total Pos Udara Tercatat</span>
          <span className="text-base font-mono font-black text-slate-800 block">1.061 Ton</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Surat, Kilat Khusus &amp; Dokumen</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Kapasitas Terminal Kargo</span>
          <span className="text-base font-mono font-black text-sky-900 block">60.000 Ton/Tahun</span>
          <span className="text-[10px] text-emerald-700 block mt-0.5 font-semibold">Tingkat Utilisasi 77,1%</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Regulated Agent Terdaftar</span>
          <span className="text-sm font-mono font-bold text-slate-900 block">7 Badan Usaha EMPU</span>
          <span className="text-[10px] text-emerald-800 block mt-0.5 font-semibold">Tersertifikasi Ditjen Hubud</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SHEET 1: GRAFIK TREN MUATAN EMPU BULANAN                                  */}
      {/* ========================================================================= */}
      {activeSheet === 'grafik' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Tren Muatan Kargo EMPU Masuk (Inbound) vs Keluar (Outbound) per Bulan
                </span>
                <p className="text-[10.5px] text-slate-500">
                  Aliran logistik suku cadang manufaktur, e-commerce, kargo segar (perishable), dan pos udara di Hang Nadim
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-amber-800 font-bold">
                  <span className="w-3 h-3 rounded-xs bg-amber-500 inline-block" />
                  <span>Kargo Inbound (Ton)</span>
                </span>
                <span className="flex items-center gap-1.5 text-sky-800 font-bold">
                  <span className="w-3 h-3 rounded-xs bg-sky-600 inline-block" />
                  <span>Kargo Outbound (Ton)</span>
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_EMPU_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Ton" />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      `${Number(val).toLocaleString('id-ID')} Ton`,
                      name === 'kargoInboundTon' ? 'Kargo Masuk (Inbound)' : 'Kargo Keluar (Outbound)',
                    ]}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="kargoInboundTon" name="Kargo Inbound (Masuk)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="kargoOutboundTon" name="Kargo Outbound (Keluar)" fill="#0284C7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHEET 2: KINERJA OPERATOR EMPU & UTILISASI GUDANG LOGISTIK KARGO          */}
      {/* ========================================================================= */}
      {activeSheet === 'operator' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Operator Ranking */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-3.5">
              <span className="text-xs font-bold text-slate-800 block">
                Pangsa Pasar Ekspedisi Muatan Pesawat Udara (EMPU) Terdaftar
              </span>
              <p className="text-[10.5px] text-slate-500 mb-3">
                Volume tonase kargo ditangani per perusahaan ekspedisi udara dan regulated agent
              </p>

              <div className="space-y-2.5">
                {EMPU_OPERATOR_DATA.map((op, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/90 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 truncate max-w-[320px]">
                        <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 font-bold font-mono text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-slate-900 truncate">{op.nama}</span>
                      </div>
                      <span className="font-mono font-black text-amber-900 shrink-0">
                        {op.tonase.toLocaleString('id-ID')} Ton ({op.sharePersen}%)
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="bg-sky-600 h-full rounded-full"
                        style={{ width: `${op.sharePersen * 4.5}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10.5px] text-slate-500">
                      <span>Layanan: {op.jenisLayanan}</span>
                      <span className="font-mono">Utilisasi Gudang: <strong>{op.utilisasiGudang}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spesifikasi Terminal Kargo Hang Nadim */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3.5 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">
                Fasilitas &amp; Gudang Kargo Bandara Hang Nadim
              </span>

              <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200 text-xs space-y-2">
                <div className="flex items-center gap-2 text-sky-900 font-bold">
                  <Warehouse className="w-4 h-4 text-sky-700" />
                  <span>Gudang Kargo Domestik</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Luas area 12.000 m² terbagi dalam area staging outbound, inbound break-bulk, cold storage sayur &amp; ikan segar, serta dedicated regulated agent conveyor.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-sky-200/80 text-[10.5px] font-mono text-sky-800">
                  <span>Kapasitas: 45.000 Ton/Thn</span>
                  <span>Utilisasi: 78%</span>
                </div>
              </div>

              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 text-xs space-y-2">
                <div className="flex items-center gap-2 text-purple-900 font-bold">
                  <Plane className="w-4 h-4 text-purple-700" />
                  <span>Gudang Kargo Internasional &amp; Bonded</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Luas area 4.500 m² dengan status Kawasan Berikat TPS, sistem dual-view X-Ray security scanner, dan integrasi EDI Bea Cukai Batam (CEISA).
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-purple-200/80 text-[10.5px] font-mono text-purple-800">
                  <span>Kapasitas: 15.000 Ton/Thn</span>
                  <span>Utilisasi: 74%</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-950 block">Target Pengembangan KSO</span>
                  <span className="text-[11px] text-emerald-800">Kargo Village Hang Nadim Kapasitas 100.000 Ton</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  On Progress
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHEET 3: TABEL DETAIL MANIFEST TRANSAKSI EMPU (ATRIBUT SATU DATA HAL. 12)  */}
      {/* ========================================================================= */}
      {activeSheet === 'tabel' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari Agen EMPU, Nomor Penerbangan, Komoditi..."
                value={searchManifest}
                onChange={(e) => setSearchManifest(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded text-xs focus:outline-hidden focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterArah}
                onChange={(e) => setFilterArah(e.target.value)}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
              >
                <option value="Semua">Semua Aliran (In/Out)</option>
                <option value="Arrival">Inbound (Masuk Batam)</option>
                <option value="Departure">Outbound (Keluar Batam)</option>
              </select>

              <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 bg-white border border-slate-200 rounded">
                {filteredManifest.length} Manifest Kargo
              </span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3 font-mono">NO</th>
                    <th className="py-2.5 px-3 font-mono text-amber-950 font-bold bg-amber-50/70">TGL / WAKTU</th>
                    <th className="py-2.5 px-3 font-mono text-amber-950 font-bold bg-amber-50/70">NO. FLIGHT</th>
                    <th className="py-2.5 px-4 font-bold text-amber-950 bg-amber-50/70">OPERATOR EMPU</th>
                    <th className="py-2.5 px-3 font-mono text-amber-950 font-bold bg-amber-50/70">RUTE (ASL &rarr; TJN)</th>
                    <th className="py-2.5 px-3 font-bold text-amber-950 bg-amber-50/70">ARAH (A/D)</th>
                    <th className="py-2.5 px-3 text-right font-mono font-bold text-amber-950 bg-amber-50/70">KARGO (KG)</th>
                    <th className="py-2.5 px-3 text-right font-mono">BAGASI (KG)</th>
                    <th className="py-2.5 px-3 text-right font-mono">POS (KG)</th>
                    <th className="py-2.5 px-4">DESKRIPSI KOMODITI</th>
                    <th className="py-2.5 px-3 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredManifest.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">
                        <div>{item.tanggal}</div>
                        <div className="text-[10px] text-slate-400">{item.waktu}</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-sky-900">{item.noFlight}</td>
                      <td className="py-2.5 px-4">
                        <div className="font-bold text-slate-900">{item.operator}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{item.typePesawat} ({item.registrasi})</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-xs font-semibold text-slate-800">
                        {item.asl} &rarr; {item.tjn}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.arah.includes('Arrival') ? 'bg-blue-100 text-blue-800' : 'bg-teal-100 text-teal-800'
                        }`}>
                          {item.arah}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-black text-amber-900 text-xs">
                        {formatNumber(item.kargoKg)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                        {formatNumber(item.bagasiKg)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-800">
                        {formatNumber(item.posKg)}
                      </td>
                      <td className="py-2.5 px-4 text-slate-700 text-[11px]">
                        {item.komoditi}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
