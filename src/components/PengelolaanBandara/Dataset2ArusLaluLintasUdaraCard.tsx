import React, { useState, useMemo } from 'react';
import {
  Plane,
  Users,
  Calendar,
  TrendingUp,
  BarChart3,
  LineChart as LineIcon,
  Table as TableIcon,
  Search,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
  Luggage,
  Package,
  Layers,
  Sparkles,
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
  AreaChart,
  Area,
  ComposedChart,
} from 'recharts';
import {
  TREN_BULANAN_PENUMPANG,
  SAMPLE_FLIGHT_MOVEMENTS,
  TOTAL_PENERBANGAN_TAHUNAN,
  TOTAL_PENUMPANG_TAHUNAN,
  AVERAGE_SEAT_LOAD_FACTOR,
} from './bandaraData';
import { BandaraFilterState, FlightMovementRecord } from './types';
import { BandaraVisualHeader } from './BandaraVisualHeader';

interface Dataset2ArusLaluLintasUdaraCardProps {
  filters: BandaraFilterState;
  onOpenFormula: () => void;
}

// Data Portal Arus Lalu Lintas Udara Sesuai Screenshot PDF Halaman 1
const PORTAL_ARUS_KATEGORI_DATA = [
  { kategori: 'Pesawat', subjenis: 'Domestik', pergerakan: 'Arrival', jumlah: 18425, satuan: 'Pergerakan' },
  { kategori: 'Pesawat', subjenis: 'Domestik', pergerakan: 'Departure', jumlah: 18425, satuan: 'Pergerakan' },
  { kategori: 'Pesawat', subjenis: 'Internasional', pergerakan: 'Arrival', jumlah: 800, satuan: 'Pergerakan' },
  { kategori: 'Pesawat', subjenis: 'Internasional', pergerakan: 'Departure', jumlah: 800, satuan: 'Pergerakan' },
  { kategori: 'Penumpang', subjenis: 'Domestik', pergerakan: 'Arrival', jumlah: 2385790, satuan: 'Orang' },
  { kategori: 'Penumpang', subjenis: 'Domestik', pergerakan: 'Departure', jumlah: 2409890, satuan: 'Orang' },
  { kategori: 'Penumpang', subjenis: 'Domestik', pergerakan: 'Transit', jumlah: 50258, satuan: 'Orang' },
  { kategori: 'Penumpang', subjenis: 'Internasional', pergerakan: 'Arrival', jumlah: 130620, satuan: 'Orang' },
  { kategori: 'Penumpang', subjenis: 'Internasional', pergerakan: 'Departure', jumlah: 133740, satuan: 'Orang' },
  { kategori: 'Bagasi', subjenis: 'Domestik', pergerakan: 'Arrival', jumlah: 17860610, satuan: 'Kg' },
  { kategori: 'Bagasi', subjenis: 'Domestik', pergerakan: 'Departure', jumlah: 14420720, satuan: 'Kg' },
  { kategori: 'Bagasi', subjenis: 'Internasional', pergerakan: 'Arrival', jumlah: 179120, satuan: 'Kg' },
  { kategori: 'Bagasi', subjenis: 'Internasional', pergerakan: 'Departure', jumlah: 1727760, satuan: 'Kg' },
  { kategori: 'Barang / Kargo', subjenis: 'Domestik', pergerakan: 'Arrival', jumlah: 23101700, satuan: 'Kg' },
  { kategori: 'Barang / Kargo', subjenis: 'Domestik', pergerakan: 'Departure', jumlah: 14420720, satuan: 'Kg' },
  { kategori: 'Barang / Kargo', subjenis: 'Internasional', pergerakan: 'Arrival', jumlah: 1075820, satuan: 'Kg' },
  { kategori: 'Barang / Kargo', subjenis: 'Internasional', pergerakan: 'Departure', jumlah: 1727760, satuan: 'Kg' },
  { kategori: 'Mail / Pos', subjenis: 'Domestik', pergerakan: 'Arrival', jumlah: 520400, satuan: 'Kg' },
  { kategori: 'Mail / Pos', subjenis: 'Domestik', pergerakan: 'Departure', jumlah: 540600, satuan: 'Kg' },
];

export const Dataset2ArusLaluLintasUdaraCard: React.FC<Dataset2ArusLaluLintasUdaraCardProps> = ({
  filters,
  onOpenFormula,
}) => {
  // 5 SHEET SWAP OPTIONS FOR EXECUTIVE SUPERVISOR:
  // 'penerbangan' (Sheet 1: Tren Penerbangan Bulanan)
  // 'penumpang'   (Sheet 2: Tren Penumpang & SLF)
  // 'dom_intl'    (Sheet 3: Penumpang Domestik vs Internasional)
  // 'kategori'    (Sheet 4: Arus Multi-Kategori Satu Data Portal)
  // 'log_tabel'   (Sheet 5: Log Detail Penerbangan - 20 Atribut)
  const [activeSheet, setActiveSheet] = useState<'penerbangan' | 'penumpang' | 'dom_intl' | 'kategori' | 'log_tabel'>('penerbangan');

  const [filterArahLog, setFilterArahLog] = useState<string>('Semua');
  const [filterJenisLog, setFilterJenisLog] = useState<string>('Semua');
  const [searchLog, setSearchLog] = useState<string>('');

  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  // Flight monthly trends (Domestic vs Intl breakdown)
  const flightMonthlyData = TREN_BULANAN_PENUMPANG.map((item) => {
    // Estimasi pergerakan pesawat dari total penerbangan
    const intl = Math.round(item.totalPenerbangan * 0.042);
    const dom = item.totalPenerbangan - intl;
    const arrival = Math.round(item.totalPenerbangan / 2);
    const departure = item.totalPenerbangan - arrival;
    return {
      bulan: item.kodeBulan,
      namaBulan: item.bulan,
      totalPenerbangan: item.totalPenerbangan,
      domestik: dom,
      internasional: intl,
      arrival: arrival,
      departure: departure,
      penumpangTotal: item.totalPenumpang,
      seatLoadFactor: item.seatLoadFactor,
    };
  });

  // Filtered log records
  const filteredFlights = useMemo(() => {
    return SAMPLE_FLIGHT_MOVEMENTS.filter((flight) => {
      if (filterArahLog !== 'Semua' && flight.arah !== filterArahLog) return false;
      if (filterJenisLog !== 'Semua' && flight.jenisPenerbangan !== filterJenisLog) return false;
      if (searchLog.trim() !== '') {
        const q = searchLog.toLowerCase();
        return (
          flight.nomorPenerbangan.toLowerCase().includes(q) ||
          flight.operator.toLowerCase().includes(q) ||
          flight.asal.toLowerCase().includes(q) ||
          flight.tujuan.toLowerCase().includes(q) ||
          flight.typePesawat.toLowerCase().includes(q) ||
          flight.registrasiPesawat.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filterArahLog, filterJenisLog, searchLog]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs font-sans">
      {/* Visual Header sesuai Standar Dashboard Pembangunan Infrastruktur */}
      <BandaraVisualHeader
        datasetNumber={2}
        pdfPages="Hal. 11"
        title="DAFTAR ARUS LALU LINTAS UDARA (BANDARA HANG NADIM BATAM)"
        visualName={
          activeSheet === 'penerbangan'
            ? 'Sheet 1: Visualisasi Tren Jumlah Penerbangan Setiap Bulan (Domestik vs Internasional & A/D)'
            : activeSheet === 'penumpang'
            ? 'Sheet 2: Visualisasi Tren Jumlah Penumpang Setiap Bulan & Seat Load Factor (SLF)'
            : activeSheet === 'dom_intl'
            ? 'Sheet 3: Visualisasi Komparasi Penumpang Domestik dan Internasional (A/D & Demografi Dewasa/Anak/Bayi)'
            : activeSheet === 'kategori'
            ? 'Sheet 4: Arus Lalu Lintas Udara Multi-Kategori (Pesawat, Penumpang, Bagasi, Kargo, Mail)'
            : 'Sheet 5: Log Detail Pergerakan Penerbangan (20 Atribut Dokumen Satu Data Hal. 11)'
        }
        classification="TERBUKA"
        periode="PERTRIWULAN"
        attributes={[
          'TANGGAL PENERBANGAN',
          'WAKTU',
          'ASL',
          'TJN',
          'OPERATOR',
          'ICAO',
          'BTB',
          'JENIS PENERBANGAN',
          'NOMOR PENERBANGAN',
          'REGISTRASI PESAWAT',
          'TYPE PESAWAT',
          'KAPASITAS KURSI',
          'A/D',
          'PENUMPANG DEWASA',
          'PENUMPANG ANAK',
          'PENUMPANG BAYI',
          'PNP TRANSIT DEWASA/ANAK/BAYI',
          'BAGASI',
          'KARGO',
        ]}
        rightControls={
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex-wrap">
            <button
              onClick={() => setActiveSheet('penerbangan')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'penerbangan'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Sheet 1: Penerbangan</span>
            </button>
            <button
              onClick={() => setActiveSheet('penumpang')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'penumpang'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Sheet 2: Tren Pax</span>
            </button>
            <button
              onClick={() => setActiveSheet('dom_intl')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'dom_intl'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Sheet 3: Domestik vs Intl</span>
            </button>
            <button
              onClick={() => setActiveSheet('kategori')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'kategori'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sheet 4: 5 Kategori</span>
            </button>
            <button
              onClick={() => setActiveSheet('log_tabel')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'log_tabel'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Sheet 5: Log (20 Atribut)</span>
            </button>
          </div>
        }
        onOpenFormula={onOpenFormula}
      />

      {/* Mini Executive Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gradient-to-r from-sky-50/70 via-indigo-50/40 to-slate-50 rounded-xl border border-sky-100 mb-4 text-xs">
        <div>
          <span className="text-slate-500 block text-[10.5px]">Total Pergerakan Pesawat (A/D)</span>
          <span className="text-base font-mono font-black text-sky-950 block">{formatNumber(TOTAL_PENERBANGAN_TAHUNAN)} Flights</span>
          <span className="text-[10px] text-sky-700 block mt-0.5 font-mono">36.850 Domestik | 1.600 Internasional</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Total Penumpang (Pax)</span>
          <span className="text-base font-mono font-black text-slate-800 block">4,86 Juta Orang</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">2,38M Arrival | 2,41M Departure</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Rata-rata Seat Load Factor</span>
          <span className="text-base font-mono font-black text-emerald-700 block">{AVERAGE_SEAT_LOAD_FACTOR}%</span>
          <span className="text-[10px] text-emerald-800 block mt-0.5 font-semibold">Tingkat Okupansi Kursi Sehat</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10.5px]">Bulan Puncak (Peak Traffic)</span>
          <span className="text-sm font-mono font-bold text-slate-900 block">Desember &amp; April</span>
          <span className="text-[10px] text-purple-700 block mt-0.5 font-mono">&gt; 3.700 Pergerakan Pesawat</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SHEET 1: TREN JUMLAH PENERBANGAN SETIAP BULAN                            */}
      {/* ========================================================================= */}
      {activeSheet === 'penerbangan' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Tren Pergerakan Pesawat (Penerbangan) Setiap Bulan: Domestik vs Internasional
                </span>
                <p className="text-[10.5px] text-slate-500">
                  Data pemantauan frekuensi penerbangan terjadwal dan charter di Bandara Hang Nadim Batam (BTH)
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-sky-800 font-bold">
                  <span className="w-3 h-3 rounded-xs bg-sky-600 inline-block" />
                  <span>Domestik</span>
                </span>
                <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
                  <span className="w-3 h-3 rounded-xs bg-indigo-500 inline-block" />
                  <span>Internasional</span>
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={flightMonthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Flts" domain={[0, 4200]} />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      `${formatNumber(val)} Penerbangan`,
                      name === 'domestik' ? 'Penerbangan Domestik' : name === 'internasional' ? 'Penerbangan Internasional' : 'Total Pergerakan',
                    ]}
                    labelFormatter={(label) => `Bulan: ${label}`}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="domestik" name="Penerbangan Domestik" fill="#0284C7" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="internasional" name="Penerbangan Internasional" fill="#6366F1" stackId="a" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="totalPenerbangan" name="Total Pergerakan Pesawat" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3.5, fill: '#F59E0B' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Metrics: Arrival vs Departure */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10.5px] text-slate-500 block">Penerbangan Kedatangan (Arrival)</span>
              <span className="text-sm font-mono font-bold text-slate-800">19.180 Flights (49,9%)</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Rata-rata 52 penerbangan/hari</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10.5px] text-slate-500 block">Penerbangan Keberangkatan (Departure)</span>
              <span className="text-sm font-mono font-bold text-slate-800">19.270 Flights (50,1%)</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Rata-rata 53 penerbangan/hari</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10.5px] text-slate-500 block">Maskapai Beroperasi Terbanyak</span>
              <span className="text-sm font-mono font-bold text-sky-900">Lion Air (12.450 Flts)</span>
              <span className="text-[10px] text-sky-700 block mt-0.5 font-mono">Market Share 32,4%</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10.5px] text-slate-500 block">Rute Terpadat</span>
              <span className="text-sm font-mono font-bold text-slate-900">BTH &harr; CGK (Jakarta)</span>
              <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">148 frekuensi mingguan</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHEET 2: TREN JUMLAH PENUMPANG & SEAT LOAD FACTOR (SLF)                  */}
      {/* ========================================================================= */}
      {activeSheet === 'penumpang' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Tren Penumpang Bulanan (Kedatangan, Keberangkatan, Transit) &amp; Seat Load Factor (SLF)
                </span>
                <p className="text-[10.5px] text-slate-500">
                  Pemantauan keterisian kursi pesawat udara dan mobilitas penumpang Bandara Hang Nadim
                </p>
              </div>
              <span className="text-[10.5px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                Rata-rata SLF: {AVERAGE_SEAT_LOAD_FACTOR}%
              </span>
            </div>

            <div className="h-72 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={TREN_BULANAN_PENUMPANG} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="kodeBulan" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748B' }} unit=" Pax" />
                  <YAxis yAxisId="right" orientation="right" domain={[70, 100]} tick={{ fontSize: 11, fill: '#10B981' }} unit="%" />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      name === 'seatLoadFactor' ? `${val}%` : `${formatNumber(val)} Orang`,
                      name === 'penumpangDomestikArrival'
                        ? 'Kedatangan Domestik'
                        : name === 'penumpangDomestikDeparture'
                        ? 'Keberangkatan Domestik'
                        : name === 'totalPenumpang'
                        ? 'Total Penumpang'
                        : 'Seat Load Factor (Okupansi)',
                    ]}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area yAxisId="left" type="monotone" dataKey="penumpangDomestikArrival" name="Kedatangan Domestik" fill="#BAE6FD" stroke="#0284C7" />
                  <Area yAxisId="left" type="monotone" dataKey="penumpangDomestikDeparture" name="Keberangkatan Domestik" fill="#DDD6FE" stroke="#7C3AED" />
                  <Line yAxisId="right" type="monotone" dataKey="seatLoadFactor" name="Seat Load Factor (%)" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHEET 3: KOMPARASI JUMLAH PENUMPANG DOMESTIK DAN INTERNASIONAL            */}
      {/* ========================================================================= */}
      {activeSheet === 'dom_intl' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Komparasi Arus Penumpang Domestik vs Internasional per Bulan (Kedatangan &amp; Keberangkatan)
                </span>
                <p className="text-[10.5px] text-slate-500">
                  Pergerakan penumpang domestik (Jawa, Sumatera, Kepri) dan penerbangan internasional (Kuala Lumpur, Subang, Seoul)
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-sky-800 font-bold">
                  <span className="w-2.5 h-2.5 rounded-xs bg-sky-400 inline-block" />
                  <span>Dom Arrival</span>
                </span>
                <span className="flex items-center gap-1 text-blue-900 font-bold">
                  <span className="w-2.5 h-2.5 rounded-xs bg-blue-600 inline-block" />
                  <span>Dom Departure</span>
                </span>
                <span className="flex items-center gap-1 text-purple-700 font-bold">
                  <span className="w-2.5 h-2.5 rounded-xs bg-purple-500 inline-block" />
                  <span>Intl (A/D)</span>
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TREN_BULANAN_PENUMPANG} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="kodeBulan" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Pax" />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      `${formatNumber(val)} Pax`,
                      name === 'penumpangDomestikArrival'
                        ? 'Domestik Arrival (Datang)'
                        : name === 'penumpangDomestikDeparture'
                        ? 'Domestik Departure (Berangkat)'
                        : name === 'penumpangInternasionalArrival'
                        ? 'Internasional Arrival'
                        : 'Internasional Departure',
                    ]}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="penumpangDomestikArrival" name="Domestik Datang" fill="#38BDF8" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="penumpangDomestikDeparture" name="Domestik Berangkat" fill="#0284C7" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="penumpangInternasionalArrival" name="Internasional Datang" fill="#C084FC" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="penumpangInternasionalDeparture" name="Internasional Berangkat" fill="#7C3AED" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Demografi Penumpang Dewasa, Anak, Bayi, dan Transit Sesuai Atribut Dokumen Satu Data Hal. 11 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600" />
                  Arus Penumpang Domestik (4.795.680 Pax / 94.7%)
                </span>
                <span className="text-[10px] font-mono font-bold bg-sky-50 text-sky-800 px-2 py-0.5 rounded">
                  Status: Terbuka
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-sky-50/50 rounded-lg border border-sky-100">
                  <span className="text-[10.5px] text-slate-500 block">Penumpang Dewasa</span>
                  <span className="font-mono font-black text-sky-950 text-sm">4.244.170</span>
                  <span className="text-[10px] text-sky-700 block font-semibold">88.5%</span>
                </div>
                <div className="p-2.5 bg-sky-50/50 rounded-lg border border-sky-100">
                  <span className="text-[10.5px] text-slate-500 block">Penumpang Anak</span>
                  <span className="font-mono font-black text-slate-800 text-sm">469.970</span>
                  <span className="text-[10px] text-slate-500 block">9.8%</span>
                </div>
                <div className="p-2.5 bg-sky-50/50 rounded-lg border border-sky-100">
                  <span className="text-[10.5px] text-slate-500 block">Penumpang Bayi</span>
                  <span className="font-mono font-black text-slate-800 text-sm">81.540</span>
                  <span className="text-[10px] text-slate-500 block">1.7%</span>
                </div>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-slate-600 flex justify-between items-center">
                <span>Penumpang Transit Domestik:</span>
                <span className="font-mono font-bold text-slate-900">66.620 Pax (Dewasa: 58.900 | Anak: 6.500 | Bayi: 1.220)</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  Arus Penumpang Internasional (264.360 Pax / 5.3%)
                </span>
                <span className="text-[10px] font-mono font-bold bg-purple-50 text-purple-800 px-2 py-0.5 rounded">
                  Status: Terbuka
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-purple-50/50 rounded-lg border border-purple-100">
                  <span className="text-[10.5px] text-slate-500 block">Penumpang Dewasa</span>
                  <span className="font-mono font-black text-purple-950 text-sm">237.920</span>
                  <span className="text-[10px] text-purple-700 block font-semibold">90.0%</span>
                </div>
                <div className="p-2.5 bg-purple-50/50 rounded-lg border border-purple-100">
                  <span className="text-[10.5px] text-slate-500 block">Penumpang Anak</span>
                  <span className="font-mono font-black text-slate-800 text-sm">22.470</span>
                  <span className="text-[10px] text-slate-500 block">8.5%</span>
                </div>
                <div className="p-2.5 bg-purple-50/50 rounded-lg border border-purple-100">
                  <span className="text-[10.5px] text-slate-500 block">Penumpang Bayi</span>
                  <span className="font-mono font-black text-slate-800 text-sm">3.970</span>
                  <span className="text-[10px] text-slate-500 block">1.5%</span>
                </div>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-slate-600 flex justify-between items-center">
                <span>Rute Internasional Reguler:</span>
                <span className="font-mono font-bold text-slate-900">Kuala Lumpur (KUL), Subang (SZB), &amp; Carter Incheon (ICN)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHEET 4: ARUS LALU LINTAS UDARA 5 KATEGORI (SESUAI SCREENSHOT PDF HALAMAN 1) */}
      {/* ========================================================================= */}
      {activeSheet === 'kategori' && (
        <div className="space-y-4">
          <div className="bg-amber-50/40 p-3 rounded-xl border border-amber-200/80 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950">
              <span className="font-bold">Format Portal Arus Lalu Lintas Udara Bandara Hang Nadim:</span>
              <p className="text-[11px] text-amber-900 mt-0.5">
                Struktur data di bawah ini mencerminkan tabel resmi portal Satu Data Hang Nadim (seperti pada tangkapan layar PDF <em>arus-lalu-lintas-udara-bandara-hang-nadim</em>) yang mengklasifikasikan arus ke dalam 5 Kategori: <strong>Pesawat</strong>, <strong>Penumpang</strong>, <strong>Bagasi</strong>, <strong>Barang (Kargo)</strong>, dan <strong>Mail</strong>.
              </p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3 font-mono">_ID</th>
                    <th className="py-2.5 px-4 font-bold text-sky-950 bg-sky-50/70">KATEGORI</th>
                    <th className="py-2.5 px-4 font-bold text-sky-950 bg-sky-50/70">SUBJENISPENERBANGAN</th>
                    <th className="py-2.5 px-3 font-mono text-center">TGLAWAL</th>
                    <th className="py-2.5 px-3 font-mono text-center">TGLAKHIR</th>
                    <th className="py-2.5 px-4 font-bold text-sky-950 bg-sky-50/70">ARRIVALDEPARTURE</th>
                    <th className="py-2.5 px-4 text-right font-bold text-sky-950 bg-sky-50/70">JUMLAH</th>
                    <th className="py-2.5 px-3 text-center">SATUAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white font-mono text-xs">
                  {PORTAL_ARUS_KATEGORI_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2 px-3 text-slate-400 font-mono text-[11px]">{5888 + idx}</td>
                      <td className="py-2 px-4 font-sans font-bold text-slate-900">
                        <span className={`px-2 py-0.5 rounded text-[10.5px] font-bold ${
                          row.kategori === 'Pesawat'
                            ? 'bg-sky-100 text-sky-800'
                            : row.kategori === 'Penumpang'
                            ? 'bg-purple-100 text-purple-800'
                            : row.kategori === 'Bagasi'
                            ? 'bg-emerald-100 text-emerald-800'
                            : row.kategori.includes('Barang')
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {row.kategori}
                        </span>
                      </td>
                      <td className="py-2 px-4 font-sans font-medium text-slate-800">{row.subjenis}</td>
                      <td className="py-2 px-3 text-center text-slate-500 text-[11px]">2026-08-01</td>
                      <td className="py-2 px-3 text-center text-slate-500 text-[11px]">2026-08-31</td>
                      <td className="py-2 px-4 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.pergerakan === 'Arrival'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : row.pergerakan === 'Departure'
                            ? 'bg-teal-50 text-teal-700 border border-teal-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {row.pergerakan}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-right font-black text-slate-900 text-xs">
                        {formatNumber(row.jumlah)}
                      </td>
                      <td className="py-2 px-3 text-center font-sans text-slate-500 text-[11px]">{row.satuan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHEET 4: LOG DETAIL PENERBANGAN (20 ATRIBUT RESMI SATU DATA HALAMAN 11)   */}
      {/* ========================================================================= */}
      {activeSheet === 'log_tabel' && (
        <div className="space-y-3">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari No. Penerbangan, Operator, Asal, Tujuan, Registrasi..."
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded text-xs focus:outline-hidden focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterArahLog}
                onChange={(e) => setFilterArahLog(e.target.value)}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
              >
                <option value="Semua">Semua A/D</option>
                <option value="Arrival">Arrival (Kedatangan)</option>
                <option value="Departure">Departure (Keberangkatan)</option>
              </select>

              <select
                value={filterJenisLog}
                onChange={(e) => setFilterJenisLog(e.target.value)}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
              >
                <option value="Semua">Semua Jenis</option>
                <option value="Domestik">Domestik</option>
                <option value="Internasional">Internasional</option>
              </select>

              <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 bg-white border border-slate-200 rounded">
                {filteredFlights.length} Data
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2 px-3 font-mono">NO</th>
                    <th className="py-2 px-3 text-sky-950 font-bold bg-sky-50/70">NO. FLIGHT</th>
                    <th className="py-2 px-3 text-sky-950 font-bold bg-sky-50/70">OPERATOR</th>
                    <th className="py-2 px-3 text-sky-950 font-bold bg-sky-50/70">ASL &rarr; TJN</th>
                    <th className="py-2 px-2 text-center text-sky-950 font-bold bg-sky-50/70">A/D</th>
                    <th className="py-2 px-3">JENIS</th>
                    <th className="py-2 px-3">TYPE / REG</th>
                    <th className="py-2 px-3 text-right">KURSI</th>
                    <th className="py-2 px-3 text-right">PAX (D/A/B)</th>
                    <th className="py-2 px-2 text-right">TRANSIT</th>
                    <th className="py-2 px-3 text-right">BAGASI (KG)</th>
                    <th className="py-2 px-3 text-right">KARGO (KG)</th>
                    <th className="py-2 px-2 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredFlights.map((flight, idx) => (
                    <tr key={flight.id} className="hover:bg-sky-50/30 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-sky-900">{flight.nomorPenerbangan}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{flight.operator}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] font-medium text-slate-800">{flight.ruteLabel}</td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${
                          flight.arah === 'Arrival' ? 'bg-blue-100 text-blue-800' : 'bg-teal-100 text-teal-800'
                        }`}>
                          {flight.arah === 'Arrival' ? 'ARR' : 'DEP'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 text-[11px]">{flight.jenisPenerbangan}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px]">
                        <div className="font-semibold text-slate-800">{flight.typePesawat}</div>
                        <div className="text-[9.5px] text-slate-400">{flight.registrasiPesawat}</div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-700">
                        {flight.kapasitasKursi}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        {flight.totalPenumpang}
                        <span className="text-[9.5px] text-slate-400 block font-normal">
                          {flight.penumpangDewasa}/{flight.penumpangAnak}/{flight.penumpangBayi}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-right font-mono text-slate-600">{flight.transit}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-800">
                        {formatNumber(flight.bagasiKg)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-900">
                        {formatNumber(flight.kargoKg)}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {flight.statusPenerbangan}
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
